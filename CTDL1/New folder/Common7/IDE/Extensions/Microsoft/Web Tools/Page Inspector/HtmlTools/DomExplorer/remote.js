// Expected global variables:
/*global domHelper htmlTreeHelpers mainBrowser onErrorHandler remoteHelpers styleHelper toolUI */

// Allow 'eval' for debugging code execution and leading underscores for invoke functions
/*jshint evil: true, nomen: false*/

//+VWD
function RemoteHost() {
    return mainBrowser.document.parentWindow.RADJJScriptObject;
}
//-VWD

var domUtilities, messageHandlers;
var remoteCode = {

    initialize: function domExplorer$remoteCode$initialize() {
        /// <summary>
        ///     Gets the remote script code ready for use. 
        ///     Sets up communication with the VS side dom explorer
        /// </summary>
       
        // Listen for the navigate events
        mainBrowser.addEventListener("BeforeScriptExecute", remoteCode.onBeforeScriptExecute);

        if (remoteCode.port) {
            // Remove the previous port
            remoteCode.port.removeEventListener("message");
            remoteCode.portReady = false;
        }

        // Create a port
        remoteHelpers.initialize("DomExplorer", remoteCode.initializePage, "__VISUALSTUDIO_DOMEXPLORER_ADDED", remoteCode.onDetach);
    },

    initializePage: function domExplorer$remoteCode$initializePage() {
        /// <summary>
        ///     This method initializes the Dom Explorer by injecting the F12 handler
        ///     and informing the VS side that it needs to repopulate the tree view
        ///     It sends the message over the communication port
        /// </summary>
        
        try {
            remoteCode.addRemotePageFunctions(mainBrowser.document.parentWindow);
            remoteHelpers.port.postMessage("RefreshTree:" + mainBrowser.document.documentMode);

            // Reset the document timeout
            remoteHelpers.initializeDocumentTries = 0;

//+VWD
            try {
                // Let the host know that the script is running
                RemoteHost().NotifyScriptExecuting();
            }
            catch (e) {
            }
//-VWD
        } catch (e) { 
            remoteCode.onDocumentNotReady();
        } 
    },
    
    onDocumentNotReady: function domExplorer$remoteCode$onDocumentNotReady() {
        /// <summary>
        ///     This method should be called when the document is not yet ready for diagnostics to attach and populate.
        ///     It will increment the timeout counter and post back to the VS side asking for it to re-try the initialize call.
        /// </summary>
        
        if (remoteHelpers.initializeDocumentTries < remoteHelpers.initializeDocumentMaxTries) {
            remoteHelpers.initializeDocumentTries++;
            remoteHelpers.port.postMessage("DocumentNotYetReady");
        } else {
            onErrorHandler("Document timed out", "remote.js", 0);
        }
    },
    
    onDetach: function domExplorer$remoteCode$onDetach() {
        /// <summary>
        ///     This method is called when debugging is detached, so we can perform clean up
        /// </summary>
        /// <disable>JS2078.DoNotDeleteObjectProperties</disable>
        
        // Remove the select by click events and elements
        messageHandlers.cancelSelectElementByClick();
        
        // Reset the document timeout
        remoteHelpers.initializeDocumentTries = 0;
        
        // Remove event handlers
        domUtilities.reset();
        
        try {
            if (mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_ADDED) {
                // Remove the "we've attached" notification.
                delete mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_ADDED;
            }
            
            if (mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_STORED_ELEMENTS) {
                // Remove the stored elements
                delete mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_STORED_ELEMENTS;
            }
            
            mainBrowser.document.removeEventListener("keydown", remoteCode.onKeyDown, true);  
        } catch (ex) {
            // We should fail gracefully if there are access issues
        }
    },

    onBeforeScriptExecute: function domExplorer$remoteCode$onBeforeScriptExecute(dispatchWindow) {
        /// <summary>
        ///     This method is called back when the main browser is about to execute script, 
        ///     so we should refresh the dom explorer
        /// </summary>
        /// <param name="dispatchWindow" type="Object">
        ///     The IDispatch window that triggered the BeforeScriptExecute event
        /// </param>  
        
        var realWindow = null;
        
        try {
            // Try to get the window object that javascript expects
            realWindow = dispatchWindow.document.parentWindow;
        } catch (ex) {
            // Ignore this beforeScriptExecute, as the window is not valid and cannot be the root frame
            return;
        }

        // Since a frame has changed we should remove all the existing overlays
        domUtilities.removeOverlays();

        // Ensure the new window is the top level one and not a sub frame
        if (realWindow === mainBrowser.document.parentWindow) {
        
            // Finish posting any messages from the previous page
            if (remoteHelpers.port) {
                remoteHelpers.postAllMessages();
            }

            remoteCode.initializePage();
        } else {

            // Refresh this iframe if it has been mapped in the dom tree
            domUtilities.reloadFrame(realWindow);
        }
    },
    
    addRemotePageFunctions: function domExplorer$remoteCode$addRemotePageFunctions(realWindow) {
        if (mainBrowser.document.documentMode >= 9) {
            // addEventListener is only valid in 9 mode and up.  I couldn't find a way 
            // to override F12 with attachEvent, so only adding this in 9 mode+.
            mainBrowser.document.addEventListener("keydown", remoteCode.onKeyDown, true);
        }
        
        realWindow.__VISUALSTUDIO_DOMEXPLORER_ADDED = true;
    },
    
    onKeyDown: function domExplorer$remoteCode$onKeyDown(e) {
        
        var stopEventPropagation = function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        };
    
        if (e.keyCode === 123 && remoteCode.vsFocusCallback) { // F12 (123)
            remoteCode.vsFocusCallback();
            return stopEventPropagation(e);
        } else if (e.keyCode === 66 && e.ctrlKey) { // B (66)
            if (!domUtilities.isSelectingElement && remoteCode.startSelectElementByClickCallback) {
                remoteCode.startSelectElementByClickCallback();
                return stopEventPropagation(e);
            } else if (domUtilities.isSelectingElement && remoteCode.stopSelectElementByClickCallback) {
                remoteCode.stopSelectElementByClickCallback();
                return stopEventPropagation(e);
            }
        }
    }
};

vwdRemoteCode = {
    lastCssAutoSyncChanges: null,
    lastCssAutoSyncStyleSheet: null,
    nextCssAutoSyncChanges: null,
    nextCssAutoSyncStyleSheet: null,
    cssAutoSyncRefreshCallback: null
};

domUtilities = {
    /// <summary>
    ///     Object that provides functions for manipulating the DOM of the document
    ///     Also contains the mapping for the dom explorer to the document under diagnostics
    /// </summary>
   
    // Stores the current blue outline for highlight element on hover
    hoverOutline: null,
    hoverOutlineInner: null,
    hoverOutlineInfo: null,
    
    selectElementOverlay: null,
    selectElementHighlight: null,
    selectElementHighlights: [],
    
    // Stores information for the selectElementByClick functionality
    isSelectingElement: false,
    selectElementLastSelected: null,
    selectElementClickCallback: null,
    selectElementHoverCallback: null,

    // Allows us to call wrapped native apis and listen to events on an
    // elements event listeners.
    currentEventProxy: null,
    
    // CSS Styles for highlight element by hovering
    elementHoverStyle: "position:absolute; z-index: 9999999999; background-color: transparent; font-size: 9pt; font-family: Consolas;",
    elementHoverOuterStyle: "position:absolute; background-color: #AAAAEE; opacity: 0.4; border: 1px solid #0000FF; box-sizing: border-box;",
    elementHoverInnerStyle: "position:absolute; background-color: #AAAAEE; opacity: 0.7; border: 1px solid #0000FF; box-sizing: border-box;",
    elementHoverInfoStyle: "position:absolute; background-color: #000000; color: #FFFFFF; white-space: nowrap; border: 0px solid #0000FF; padding: 0 2px 1px 2px;",
    
    // CSS Styles for selectElementByClick overlays
    elementOverlayStyle: "position:fixed; cursor: crosshair; box-sizing: border-box; top: 0; left: 0; bottom: 0; right: 0; background-color: transparent; overflow: visible; z-index: 9999999999;",
    elementOverlayScrollHiderStyle: "position:fixed; cursor: crosshair; box-sizing: border-box; top: 0; left: 0; bottom: 0; right: 0; background-color: #FFF; opacity: 0; overflow: visible;",
    elementHighlightStyle: "position:absolute; cursor: crosshair; border: 1px solid #00f; z-index: 9999999999; opacity: 100",
    
    // Dom Mutation events
    attachedDomModifiedDocs: [],
    attachedAttrModifiedDocs: [],
    
    reset: function domExplorer$domUtilities$reset() {
        /// <summary>
        ///     Reset settings back to their original values
        /// </summary>
       
        remoteHelpers.uid = 0;
       
        // Remove any select or hover elements
        domUtilities.removeOverlays();

        // Clear the callbacks        
        domUtilities.isSelectingElement = false;
        domUtilities.selectElementLastSelected = null;
        domUtilities.selectElementClickCallback = null;
        domUtilities.selectElementHoverCallback = null;
        
        // Remove any tree modified dom mutation events
        for (var j = 0; j < domUtilities.attachedDomModifiedDocs.length; j++) {
            try {
                var treeModified = domUtilities.attachedDomModifiedDocs[j];
                if (treeModified.doc && treeModified.handler) {
                    treeModified.doc.removeEventListener("DOMNodeInserted", treeModified.handler, true);
                    treeModified.doc.removeEventListener("DOMNodeRemoved", treeModified.handler, true);
                    treeModified.doc.removeEventListener("DOMCharacterDataModified", treeModified.handler, true);
                }
            } catch (ex3) {
                // If we can't access the document, then it was navigated, so no need to remove events
            }
        }
        domUtilities.attachedDomModifiedDocs = [];
        
        // Remove any attribute modified dom mutation events
        for (var k = 0; k < domUtilities.attachedAttrModifiedDocs.length; k++) {
            try {
                var attrModified = domUtilities.attachedAttrModifiedDocs[k];
                if (attrModified.doc && attrModified.handler) {
                    attrModified.doc.removeEventListener("DOMAttrModified", attrModified.handler, true);
                }
            } catch (ex4) {
                // If we can't access the document, then it was navigated, so no need to remove events
            }
        }
        domUtilities.attachedAttrModifiedDocs = [];

        if (domUtilities.currentEventProxy) {
            domUtilities.currentEventProxy.removeAllEventListeners();
            domUtilities.currentEventProxy = null;
        }
        
        if (mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_STORED_ELEMENTS) {
            // Remove the stored elements
            mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_STORED_ELEMENTS = [];
        }

        htmlTreeHelpers.reset();
    },
    
    removeOverlays: function domExplorer$domUtilities$removeOverlays() {
        /// <summary>
        ///     Remove any hover or select overlays that were added to the DOM
        /// </summary>
        
        // Remove any existing hover element
        try {
            var hoverOutline = domUtilities.hoverOutline;
            if (hoverOutline && hoverOutline.parentNode) {
                hoverOutline.parentNode.removeChild(hoverOutline);
            }
        } catch (ex) {
            // If we can't access the element, then the container document was navigated, so no need to remove it
        }

        domUtilities.hoverOutline = null;
        domUtilities.hoverOutlineOuter = null;
        domUtilities.hoverOutlineInner = null;
        domUtilities.hoverOutlineInfo = null;
/*+VWD
        // Remove any existing select element highlights
        for (var i = 0; i < domUtilities.selectElementHighlights.length; i++) {
            try {
                var selectOutline = domUtilities.selectElementHighlights[i].element;
                if (selectOutline && selectOutline.parentNode) {
                    selectOutline.parentNode.removeChild(selectOutline);
                }
            } catch (ex2) {
                // If we can't access the element, then the container document was navigated, so no need to remove it
            }
        }
-VWD*/
        domUtilities.selectElementHighlights = [];
        domUtilities.selectElementOverlay = null;
        domUtilities.selectElementHighlight = null;        
    },

    createHoverElement: function domExplorer$domUtilities$createHoverElement(doc) {
        /// <summary>
        ///     Constructs a element used to highlight a DOM element on the main document
        /// </summary>
        /// <param name="doc" type="Object">
        ///     The javascript document to use to create the hover item
        /// </param>        
       
        var hover = doc.createElement("div"), hoverOuter = doc.createElement("div"), hoverInner = doc.createElement("div"), hoverInfo = doc.createElement("div");
        hover.setAttribute("id", "BPT-HoverOutline");
        hover.setAttribute("class", htmlTreeHelpers.ignoreStyleClass);
        hover.setAttribute("style", domUtilities.elementHoverStyle);

        hoverOuter.setAttribute("id", "BPT-HoverOutlineOuter");
        hoverOuter.setAttribute("class", htmlTreeHelpers.ignoreStyleClass);
        hoverOuter.setAttribute("style", domUtilities.elementHoverOuterStyle);
        hover.appendChild(hoverOuter);
        
        hoverInner.setAttribute("id", "BPT-HoverOutlineInner");
        hoverInner.setAttribute("class", htmlTreeHelpers.ignoreStyleClass);
        hoverInner.setAttribute("style", domUtilities.elementHoverInnerStyle);
        hover.appendChild(hoverInner);
        
        hoverInfo.setAttribute("id", "BPT-HoverOutlineInfo");
        hoverInfo.setAttribute("class", htmlTreeHelpers.ignoreStyleClass);
        hoverInfo.setAttribute("style", domUtilities.elementHoverInfoStyle);
        hover.appendChild(hoverInfo);
        
        domUtilities.hoverOutline = hover;
        domUtilities.hoverOutlineOuter = hoverOuter;
        domUtilities.hoverOutlineInner = hoverInner;
        domUtilities.hoverOutlineInfo = hoverInfo;
    },
    
    createSelectElement: function domExplorer$domUtilities$createSelectElement(doc, createOverlay) {
        /// <summary>
        ///     Constructs a element used to highlight a DOM element on the main document for selecting by click
        /// </summary>
        /// <param name="doc" type="Object">
        ///     The javascript document to use to create the highlight item
        /// </param>   
        /// <param name="createOverlay" type="Boolean" optional="true">
        ///     Should we create the overlay element on this document
        /// </param>   
        /// <returns type="Object">
        ///     The highlight element for the document
        /// </returns> 
        
        if (createOverlay) {
            // Overlay
            var overlay = doc.createElement("div");
            overlay.setAttribute("class", htmlTreeHelpers.ignoreStyleClass);
            overlay.setAttribute("style", domUtilities.elementOverlayStyle);
            
            // Add an overlay that will hide the scrollbar cursor
            var scrollbarHider = doc.createElement("div");
            scrollbarHider.setAttribute("class", htmlTreeHelpers.ignoreStyleClass);
            scrollbarHider.setAttribute("style", domUtilities.elementOverlayScrollHiderStyle);
            overlay.appendChild(scrollbarHider);
            
            domUtilities.selectElementOverlay = overlay;
            
        } else {
            // Highlight
            var highlight = null, obj = domUtilities.findSelectElementHighlight(doc);
            if (!obj || !(obj.element)) {
                highlight = doc.createElement("div");
                highlight.setAttribute("class", htmlTreeHelpers.ignoreStyleClass);
                highlight.setAttribute("style", domUtilities.elementHighlightStyle);   
                
                if (!obj) {
                    domUtilities.selectElementHighlights.push({document: doc, element: highlight});
                } else {
                    domUtilities.selectElementHighlights.element = highlight;
                }
            } else {
                highlight = obj.element;
            }
            
            if (doc.body === domUtilities.selectElementOverlay.parentElement){
                domUtilities.selectElementOverlay.appendChild(highlight);
            } else {
                doc.body.appendChild(highlight);       
            }
            return highlight;
        }
    },
    
    findSelectElementHighlight: function domExplorer$domUtilities$findSelectElementHighlight(doc) {
        /// <summary>
        ///     Searches for a highlight element used by the SelectElementByClick functionality which 
        ///     has already been created for the specified document
        /// </summary>
        /// <param name="doc" type="Object">
        ///     The document that the highlight element belongs to
        /// </param>   
        /// <returns type="Object">
        ///     An object that represents the search result
        /// </returns> 
                
        var highlights = domUtilities.selectElementHighlights, i;
        
        for (i = 0; i < highlights.length; i++) {
            if (highlights[i].document === doc) {
                return highlights[i];
            }
        }
        
        return null;
    },
    
    getElementAtCoords: function domExplorer$domUtilities$getElementAtCoords(doc, x, y) {
        /// <summary>
        ///     Returns the element at the given coordinates by recursing into iframes
        /// </summary>
        /// <param name="doc" type="Object">
        ///     The document object to search through
        /// </param>   
        /// <param name="x" type="Number">
        ///     The x coordinate to search at
        /// </param>  
        /// <param name="y" type="Number">
        ///     The y coordinate to search at
        /// </param>  
        /// <returns type="Object">
        ///     The DOM element that is located at the given coordinates, or null if one wasn't found
        /// </returns> 
        
        var checkForValidElement = function (element) {
            // Ensure the element isn't an ignorable item (such as a select element highlight)
            if (typeof element.className !== "string" || 
                (element.className.indexOf(htmlTreeHelpers.ignoreStyleClass) === -1 &&
                 element.className.indexOf("win-appbarclickeater") === -1)) {
                
                if (element.tagName === "IFRAME") {
                    // Use recursion to find the element in the IFRAME
                    var rect = domUtilities.getClientRect(element);
                    var currentWindow = element.ownerDocument.parentWindow;
                    var iframe = domHelper.getCrossSiteWindow(currentWindow, element.contentWindow);                
                    return domUtilities.getElementAtCoords(
                        iframe.document, 
                        x - rect.left + doc.parentWindow.pageXOffset, 
                        y - rect.top + doc.parentWindow.pageYOffset);
                    
                } else {
                    // Not an IFRAME element, so no further work is needed
                    return element;
                }
            }
            
            // Return false (not null) to indicate that this was not a valid element
            return false;
        };
        
        var validElement;
        if ((typeof doc.msElementsFromPoint) === "function") {
            // Use the msElementsFromPoint function to get the top most valid element
            var elements = doc.msElementsFromPoint(x, y);
            
            for (var i = 0; i < elements.length; i++) {
                validElement = checkForValidElement(elements[i]);
                if (typeof validElement !== "boolean") {
                    // Element found, so just return it
                    return validElement;
                }
            }
            
        } else {
            // Use the standard elementFromPoint function to get the top most valid element
            var element = doc.elementFromPoint(x, y);
            if (element) {            
                validElement = checkForValidElement(element);
                if (typeof validElement !== "boolean") {
                    // Element found, so just return it
                    return validElement;
                } else {
                    // We should ignore this element so set to "visibility: hidden" (this won't change the layout but will hide from elementFromPoint)
                    var previousVisibility = element.style.visibility;
                    element.style.visibility = "hidden";
                    
                    // Retry the 'getElementAtCoords' call
                    var realElement = domUtilities.getElementAtCoords(doc, x, y);
                    
                    // Restore the visibility style and return the real result
                    element.style.visibility = previousVisibility;
                    return realElement;
                }
            }
        }
        
        // No element found
        return null;
    },
    
    getClientRect: function domExplorer$domUtilities$getClientRect(element) {
        /// <summary>
        ///     Get an element's rectangle size and position from the document body
        /// </summary>
        /// <param name="element" type="Object">
        ///     The DOM element to find the offset of
        /// </param>
        /// <returns type="Object">
        ///     An object representing the offset in the form:
        ///     { top: number, left: number, width: number, height: number }
        /// </returns> 
        
        // SVG elements have a function to get the data we are after
        if (element && element.getBoundingClientRect) {
            var rect = element.getBoundingClientRect();
            // Ensure all the data is there
            if (rect.top !== undefined && rect.left !== undefined && rect.width !== undefined && rect.height !== undefined) {
                // Add on the scroll values of the parent window
                var win = element.ownerDocument.parentWindow;
                return {left: rect.left + win.pageXOffset, top: rect.top + win.pageYOffset, width: rect.width, height: rect.height};
            }
        }
        
        // Calculate the position by walking the tree
        var top = 0;
        var left = 0;
        var curEle = element;
        while (curEle &&
              curEle !== mainBrowser.document.body &&
              curEle !== mainBrowser.document) {
            top += curEle.offsetTop;
            left += curEle.offsetLeft;
            curEle = curEle.offsetParent;
        }
        return {left: left, top: top, width: element.offsetWidth, height: element.offsetHeight};
    },
    
    reloadFrame: function (realWindow) {
        /// <summary>
        ///     Refreshes the contents of an 'IFrame' element from its new window object.
        ///     This function will search for an existing mapped iframe, and force it to reload in the dom explorer by emulating a mutation event.
        /// </summary>
        /// <param name="realWindow" type="Object">
        ///     The window object that needs to be reloaded
        /// </param>
        
        // Find the iframe element that had its document loaded        
        var iframeChain = messageHandlers.getIFrameChain(mainBrowser.document, realWindow.document);
        if (iframeChain.length > 0) {
            var targetElement = iframeChain[0];
            var uidIndex = "";
        
            // Search for a mapped node that represents the 'iframe' element
            var mappedNode = null;
            for (uidIndex in htmlTreeHelpers.mapping) {
                if (htmlTreeHelpers.mapping[uidIndex].ele === targetElement) {
                    mappedNode = htmlTreeHelpers.mapping[uidIndex];
                    break;
                }
            }
            
            if (!mappedNode) {
                // The 'iframe' is not mapped, so we need to add it now
                var targetParent = targetElement.parentNode;

                // Loop through and find the mapped node for the iframe's container
                mappedNode = null;
                for (uidIndex in htmlTreeHelpers.mapping) {
                    if (htmlTreeHelpers.mapping[uidIndex].ele === targetParent) {
                        mappedNode = htmlTreeHelpers.mapping[uidIndex];
                        break;
                    }
                }
            
                // Ensure that we find the container, it may have already been removed due to a collapse on its parent
                if (mappedNode) {
                    // Find the mapped document that we need to fire the mutation event on
                    var root = targetParent.ownerDocument;
                    for (var docIndex = 0; docIndex < domUtilities.attachedDomModifiedDocs.length; docIndex++) {
                        if (domUtilities.attachedDomModifiedDocs[docIndex].doc === root) {
                            // Fire the mutation event
                            var domMutationEvent = {type: "DOMNodeInserted", target: targetElement};
                            domUtilities.attachedDomModifiedDocs[docIndex].handler(domMutationEvent);
                            break;
                        }
                    }
                }
            }
        }

        // Since the frame has changed we need to reset the stored elements as they could point to invalid elements
        mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_STORED_ELEMENTS = [];
    }
};

var styleUtilities = {
    /// <summary>
    ///     Object that provides functions for using the element styles API
    /// </summary>
    
    // Maps uid's to CSS style sheets
    styleMapping: {},
    
    // The style properties used for computing the layout box
    styleProperties: [
        "margin-top", "margin-right", "margin-left", "margin-bottom",
        "padding-top", "padding-right", "padding-left", "padding-bottom",
        "border-top-width", "border-right-width", "border-left-width", "border-bottom-width",
        "width", "height", "left", "top"
    ],
    
    // The element properties used for computing the layout box
    elementProperties: ["clientHeight", "clientWidth", "clientTop", "clientLeft", "offsetLeft", "offsetTop"],
    
//+VWD
    // Maps UIDs to CSS rules
    ruleMapping: {},

    gatherStylesheetImports: function (styleSheet, imports) {

        for (var j = 0; j < styleSheet.imports.length; j++) {

            var stylesheetImport = styleSheet.imports[j];

            if (!imports[stylesheetImport.href]) {

                imports[stylesheetImport.href] = stylesheetImport;

                styleUtilities.gatherStylesheetImports(stylesheetImport, imports);
            }
        }
    },

    gatherStylesheets: function () {
        var styleSheets = new Array();
        var imports = new Array();

        for (var i = 0; i < mainBrowser.document.styleSheets.length; i++) {

            var styleSheet = mainBrowser.document.styleSheets[i];

            styleSheets.push(styleSheet);

            styleUtilities.gatherStylesheetImports(styleSheet, imports);
        }

        var objAllStyleSheets = new Array();

        for (var i = 0; i < styleSheets.length; i++) {
            objAllStyleSheets.push(styleSheets[i]);
        }

        for (var href in imports) {
            objAllStyleSheets.push(imports[href]);
        }

        return objAllStyleSheets;
    },

    getStylesheetOfRule: function (ruleToMatch) {

        var styleSheets = styleUtilities.gatherStylesheets();

        for (var nSheet = 0; nSheet < styleSheets.length; nSheet++) {
            var styleSheet = styleSheets[nSheet];

            for (var nRule = 0; nRule < styleSheet.rules.length; nRule++) {
                var rule = styleSheet.rules[nRule];

                if (rule == ruleToMatch) {
                    return styleSheet;
                }
            }
        }

        return null;
    },

    getSourceStyleSheetOfRule: function (styleSheet, rule) {
        return RemoteHost().GetDisplayHyperlinkName(styleSheet, rule);
    },
    
    getRelativeUrlFromAbsolute: function (url) {
        if (!url) {
            return "";
        }

        var baseUrl = mainBrowser.document.parentWindow.location.href;

        baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/') + 1);

        if (url.indexOf(baseUrl) == 0) {
            return url.substr(baseUrl.length);
        }

        return url;
    },

    getShortUrlName: function (url) {
        if (url.length > 20) {
            shortUrlName = url.substr(0, 5);
            shortUrlName += "...";
            shortUrlName += url.substr(url.length - 10);

            return shortUrlName;
        }

        return url;
    },
//-VWD
    cssToJavascriptName: function (cssName) {
        /// <summary>
        ///     Converts css names (ie: border-top-width) to javascript names (borderTopWidth)
        /// </summary>
        /// <param name="cssName" type="String">
        ///     The css name to convert
        /// </param>
        /// <returns type="String">
        ///     The JavaScript name equivilent of the css name
        /// </returns> 
        
        // Float is a reserved word, and has a special case dom name
        if (cssName === "float") {
            return "styleFloat";
        }
        
        // Remove any leading hyphens
        if (/^-/.test(cssName)) {
            cssName = cssName.substring(1);
        }
        
        var domName = cssName.replace(/-\w/g, function (match) { 
            return match.substring(1).toUpperCase(); 
        });
        return domName;
    },
    
    getRulesApplied: function domExplorer$styleUtilities$getRulesApplied(element) {
        /// <summary>
        ///     Get the style rules applied to an element,
        ///     Uses either the msGetRulesApplied function if it exists, 
        ///     else the GetAppliedStyles function from the native helper
        /// </summary>
        /// <param name="element" type="Object">
        ///     The DOM object to get the styles for
        /// </param>         
        /// <returns type="Object">
        ///     The object representing the applied styles
        /// </returns> 
        
        if (element.msGetRulesApplied) {
            return element.msGetRulesApplied();
        } 
        return styleHelper.GetAppliedStyles(element);
    },
    
    getPropertyEnabled: function domExplorer$styleUtilities$getPropertyEnabled(curStyle, property) {
        /// <summary>
        ///     Get whether a propert is enabled on an element,
        ///     Uses either the msGetPropertyEnabled function if it exists, 
        ///     else the GetPropertyEnabled function from the native helper
        /// </summary>
        /// <param name="curStyle" type="Object">
        ///     The current style object that contains the property
        /// </param>   
        /// <param name="propApplied" type="Object">
        ///     The property object to get the enabled state for
        /// </param>   
        /// <returns type="Boolean">
        ///     True if it is enabled, False otherwise
        /// </returns> 
        
        if (curStyle.msGetPropertyEnabled) {
            return curStyle.msGetPropertyEnabled(property);
        } 
        return styleHelper.GetPropertyEnabled(curStyle, property);
    },
    
    setPropertyEnabled: function domExplorer$styleUtilities$setPropertyEnabled(curStyle, propertyName, enable) {
        /// <summary>
        ///     Sets whether a property is enabled on an element,
        ///     Uses either the msPutPropertyEnabled function if it exists, 
        ///     else the SetPropertyEnabled function from the native helper
        /// </summary>
        /// <param name="curStyle" type="Object">
        ///     The current style object that contains the property
        /// </param>   
        /// <param name="propertyName" type="String">
        ///     The name of the property to enable or disable
        /// </param>   
        /// <param name="enable" type="Boolean">
        ///     True to enable the property, False to disable it
        /// </param>   
        
        if (curStyle.msPutPropertyEnabled) {
            curStyle.msPutPropertyEnabled(propertyName, enable);
        } else {
            styleHelper.SetPropertyEnabled(curStyle, propertyName, enable);
        }
    },

    standardizeLayoutUnits: function domExplorer$styleUtilities$standardizeLayoutUnits(value) {
        /// <summary>
        ///     Ensures that a number value has a units string, and that zero never has units
        ///     Any value that is a non-zero number will have px appended to it unless it already has a unit specified
        ///     A zero number will be converted to "0" without units regardless of if it had units originally
        ///     Any non-number will be left as-is
        /// </summary>
        /// <param name="value" type="Object">
        ///     The value to check for units
        /// </param>   
        /// <returns type="String">
        ///     The number string that has units or no units if the value is zero
        /// </returns> 
        if (value === undefined || value === null) {
            return;
        }
        
        var groups = value.toString().match(/^(-?[0-9]+(?:\.[0-9]*)?)\s*([a-z]*)$/);
        if (groups && groups.length > 1) {
            // Zeros should have no units, everything else is in pixels (if it has no units yet)
            if (groups[1] === 0) {
                value = "0";
            } else {
                // Limit decimal places to 2
                var decIndex = groups[1].indexOf(".");
                if (decIndex > -1 && (groups[1].length - decIndex) > 3) {
                    value = "" + parseFloat(groups[1]).toFixed(2) + groups[2];
                }

                // Ensure it has units
                if (!groups[2]) {
                    value += "px";
                }
            }
        } 
        return value;
    }
};

messageHandlers = {
    /// <summary>
    ///     Object that acts as the message handler for messages that get sent from the VS side
    ///     The messages contain a command property that corrisponds to a function on this 
    ///     object that processes that message
    /// </summary>
    
    //+VWD
    selectCssRule: function (uid, uidRule, selectedCallback) {

        var rule = null;

        if (uidRule) {
            rule = styleUtilities.ruleMapping[uidRule];
        }

        if (rule) {
            var styleSheet = styleUtilities.getStylesheetOfRule(rule);

            RemoteHost().SelectRule(styleSheet, rule);
        }
        else {
            if (htmlTreeHelpers.mapping[uid]) {
                var elem = htmlTreeHelpers.mapping[uid].ele;

                RemoteHost().SelectElement(elem);
            }
            else {
                RemoteHost().SelectElement(null);
            }
        }
    },

    updateSelection: function (uid, updatedCallback) {
        if (!htmlTreeHelpers.mapping[uid]) {
            return;
        }

        RemoteHost().DomExplorerSelectedElem = null;

        var ele = htmlTreeHelpers.mapping[uid].ele;

        if (!ele.tagName) { // if it's a textNode, then we can't get the bounding box for this
            return;
        }

        RemoteHost().DomExplorerSelectedElem = ele;

        updatedCallback();
    },

    getLastCssAutoSyncChanges: function () {
        var actualChanges = [];

        if (vwdRemoteCode.lastCssAutoSyncStyleSheet && vwdRemoteCode.lastCssAutoSyncChanges) {

            var styleSheet = vwdRemoteCode.lastCssAutoSyncStyleSheet;
            var changesToHighlight = vwdRemoteCode.lastCssAutoSyncChanges;

            vwdRemoteCode.lastCssAutoSyncChanges = vwdRemoteCode.nextCssAutoSyncChanges;
            vwdRemoteCode.lastCssAutoSyncStyleSheet = vwdRemoteCode.nextCssAutoSyncStyleSheet;

            vwdRemoteCode.nextCssAutoSyncChanges = null;
            vwdRemoteCode.nextCssAutoSyncStyleSheet = null;

            if (vwdRemoteCode.lastCssAutoSyncChanges) {
                // Limit refreshes to one per 500ms
                mainBrowser.document.parentWindow.setTimeout(vwdRemoteCode.cssAutoSyncRefreshCallback, 500);
            }

            for (var index = 0; index < changesToHighlight.length; index++) {
                var change = changesToHighlight[index];

                if (change.ruleIndex >= 0 && change.ruleIndex < styleSheet.rules.length) {
                    var rule = styleSheet.rules.item(change.ruleIndex);

                    if (rule) {
                        for (var uidIndex in styleUtilities.ruleMapping) {
                            if (styleUtilities.ruleMapping[uidIndex] == rule) {
                                change.ruleUID = uidIndex;

                                actualChanges.push(change);
                            }
                        }
                    }
                }
            }
        }
        else {
            vwdRemoteCode.lastCssAutoSyncChanges = null;
            vwdRemoteCode.lastCssAutoSyncStyleSheet = null;
        }

        return actualChanges;
    },

    attachCssAutoSyncChangeHandlers: function (refreshCallback) {
        vwdRemoteCode.cssAutoSyncRefreshCallback = refreshCallback;

        RemoteHost().CssAutoSyncChangeCallback = function (styleSheetIndex, changesToHighlight) {

            if (vwdRemoteCode.lastCssAutoSyncChanges) {
                // There is already a refresh in progress, so delay this one
                vwdRemoteCode.nextCssAutoSyncStyleSheet = mainBrowser.document.styleSheets.item(styleSheetIndex);
                vwdRemoteCode.nextCssAutoSyncChanges = changesToHighlight;
            }
            else {
                vwdRemoteCode.lastCssAutoSyncStyleSheet = mainBrowser.document.styleSheets.item(styleSheetIndex);
                vwdRemoteCode.lastCssAutoSyncChanges = changesToHighlight;

                vwdRemoteCode.cssAutoSyncRefreshCallback();
            }
        };
    },
//-VWD
    getRootElement: function () {
        /// <summary>
        ///     Get the first root element of the document we are inspecting
        /// </summary>
        /// <returns type="Object">
        ///     The constructed javscript object representing the root element of the document
        /// </returns> 
        
        domUtilities.reset();
        
        // If the document has already been navigated away from, 'typeof' will return "unknown"
        if ((typeof mainBrowser.document) === "object") {
            var rootElement = mainBrowser.document;
            
            if (rootElement.all && rootElement.all.length > 0) {
                return htmlTreeHelpers.createMappedNode(rootElement);
            } else {
                try {
                    mainBrowser.document.addEventListener("DOMContentLoaded", remoteCode.initializePage, true);
                } catch (ex) {
                    // If the addEventListener fails, it was because the document is in the process of navigating away,
                    // so we need to fail gracefully.
                }
            }
        }
    },
    
    getChildren: function domExplorer$messageHandlers$getChildren(uid) {
        /// <summary>
        ///     Get all the child elements from a particular mapped DOM element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to get the children of
        /// </param>        
        /// <returns type="Array">
        ///     An array of mapped nodes that represent the children of the DOM element
        /// </returns> 
        
        return htmlTreeHelpers.getChildrenForMappedNode(uid);
    },
    
    attachDOMContentLoadedEvent: function domExplorer$attachDOMContentLoadedEvent (uid, callback) {
        /// <summary>
        ///     Add the specifed callback to the DOMContentLoaded event which will be given the children of the specifed element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to get the children of when DOMContentLoaded fires
        /// </param> 
        /// <param name="callback" type="Function">
        ///     The callback that will be sent the children when DOMContentLoaded fires
        /// </param> 
        
        mainBrowser.document.addEventListener("DOMContentLoaded", function () {
            // Get the children for this element
            var newChildren = messageHandlers.getChildren(uid);
    
            // Inform the vs side
            callback({uid: uid, children: newChildren});
            
            // We no longer need this callback
            callback = null;
        }, true);
    },
    
    removeChildMappings: function domExplorer$messageHandlers$removeChildMappings(uid) {
        /// <summary>
        ///     Removes the children of a mapped node for a given uid
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to remove the children of
        /// </param> 
    
        htmlTreeHelpers.deleteMappedNode(uid, true);
    },
    
    editAttribute: function domExplorer$messageHandlers$editAttribute(uid, name, value) {
        /// <summary>
        ///     Sets the HTML attribute on the specified element to the contents of value
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to edit the attribute of
        /// </param>  
        /// <param name="name" type="String">
        ///     The name of the attribute to edit
        /// </param>  
        /// <param name="value" type="String">
        ///     The new value
        /// </param>          
        /// <returns type="Boolean">
        ///     True if the attribute was edited, False if it couldn't be found
        /// </returns> 
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }

        var element = mappedNode.ele;
        if (name === "value" && htmlTreeHelpers.hasSpecialValueAttribute(element)) {
            // Value should be set directly
            element.value = value;
        } else {
            try {
                element.setAttribute(name, value);
            } catch (ex) {
                // Invalid names will throw an exception, so fail gracefully
                return false;
            }
        }
        
        return true;
    },
    
    removeAttribute: function domExplorer$messageHandlers$removeAttribute(uid, name) {
        /// <summary>
        ///     Removes the HTML attribute from the specified element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to remove the attribute from
        /// </param>  
        /// <param name="name" type="String">
        ///     The name of the attribute to remove
        /// </param>  
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }
        
        var element = mappedNode.ele;
        if (name === "value" && htmlTreeHelpers.hasSpecialValueAttribute(element)) {
            // Value attributes cannot be removed once set, so just clear it
            element.value = "";
        } else {
            // We cannot remove empty style nodes, so first give it a value
            if (name === "style" && element.getAttribute() === null) {
                element.setAttribute(name, "color:inherit");
            }
            element.removeAttribute(name);
        }
    },

    editText: function domExplorer$messageHandlers$editText(uid, newText) {
        /// <summary>
        ///     Sets the innerText on the specified element to the contents of newText
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to edit the text of
        /// </param>  
        /// <param name="newText" type="String">
        ///     The new text
        /// </param>  
     
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }

        var element = mappedNode.ele;
        if (element.textContent !== newText) {
            if (element.nodeName === "#text") {
                // Text nodes need to be replaced
                var doc = element.ownerDocument;
                var newNode = doc.createTextNode("");
                
                element.parentNode.replaceChild(newNode, element);
                element = newNode;
            }
            
            element.textContent = newText;
        }
    },    
    
    hoverItem: function domExplorer$messageHandlers$hoverItem(uid) {
        /// <summary>
        ///     Show a transparent blue box around the specified element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to hihglight
        /// </param>
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }
        
        var element = mappedNode.ele;
        if (!element.tagName) { 
            // If it's a textNode, then we can't get the bounding box
            return;
        }
        
        var originalRect = domUtilities.getClientRect(element);
        if (originalRect.width === 0 && originalRect.height === 0) {
            // We shouldn't display nodes that have no size, because we cannot highlight them
            return;
        }

        
        // Get the padding for the highlight box
        var doc = element.ownerDocument;
        
        var compStyle = doc.defaultView.getComputedStyle(element, null);
        var paddingLeft = parseInt(compStyle.paddingLeft, 10);
        var paddingRight = parseInt(compStyle.paddingRight, 10);
        var paddingTop = parseInt(compStyle.paddingTop, 10);
        var paddingBottom = parseInt(compStyle.paddingBottom, 10);
        
        var marginLeft = parseInt(compStyle.marginLeft, 10);
        var marginRight = parseInt(compStyle.marginRight, 10);
        var marginTop = parseInt(compStyle.marginTop, 10);
        var marginBottom = parseInt(compStyle.marginBottom, 10);

        // Create a hover element, if we don't have one yet
        if (!domUtilities.hoverOutline) {
            domUtilities.createHoverElement(doc);
        } else {
            if (doc !== domUtilities.hoverOutline.ownerDocument) {
                domUtilities.hoverOutline = doc.importNode(domUtilities.hoverOutline, true);
                domUtilities.hoverOutlineOuter = domUtilities.hoverOutline.childNodes[0];
                domUtilities.hoverOutlineInner = domUtilities.hoverOutline.childNodes[1];
                domUtilities.hoverOutlineInfo = domUtilities.hoverOutline.childNodes[2];
            }
        }
        
        var rect = {width: originalRect.width + marginLeft + marginRight,
                    height: originalRect.height + marginTop + marginBottom,
                    left: originalRect.left - marginLeft,
                    top: originalRect.top - marginTop};
        
        var hoverOutline = domUtilities.hoverOutline;
        hoverOutline.style.left = rect.left + "px";
        hoverOutline.style.top = rect.top + "px";
        
        var hoverOuter = domUtilities.hoverOutlineOuter;
        hoverOuter.style.width = rect.width + "px";
        hoverOuter.style.height = rect.height + "px";
        
        var hoverInner = domUtilities.hoverOutlineInner;
        hoverInner.style.left = element.clientLeft + marginLeft + paddingLeft + "px";
        hoverInner.style.top = element.clientTop + marginTop + paddingTop + "px";
        hoverInner.style.width = (element.clientWidth - (paddingLeft + paddingRight)) + "px";
        hoverInner.style.height = (element.clientHeight - (paddingTop + paddingBottom)) + "px";
        
        // Add the tag
        var hoverInfo = domUtilities.hoverOutlineInfo;
        hoverInfo.innerText = element.tagName.toLowerCase();
        
        // Add the id or class info
        if (element.id) {
            // Element has an id
            hoverInfo.innerText += "#" + element.id;
        } else if (element.className && (typeof element.className === "string")) {
            // Element has one or more classes
            hoverInfo.innerText += "." + element.className.split(" ").join(".");
        } else if (element.className && element.className.baseVal) {
            // Element has one or more classes on 'svg'
            hoverInfo.innerText += "." + element.className.baseVal.split(" ").join(".");
        }

        // Add the dimensions
        hoverInfo.innerText += " [" + Math.round(originalRect.width) + "x" + Math.round(originalRect.height) + "]";

        // Position the info to keep it on screen
        var top, left = 0;
        if (rect.top - 15 > doc.parentWindow.pageYOffset) {
            // Draw above element
            top = Math.min((doc.parentWindow.pageYOffset + doc.documentElement.clientHeight) - rect.top, 0);
            hoverInfo.style.top = (top - 15) + "px";
        } else if (rect.top + rect.height + 15 < doc.parentWindow.pageYOffset + doc.documentElement.clientHeight){
            // Draw below element
            top = Math.max(doc.parentWindow.pageYOffset - rect.top, rect.height);
            hoverInfo.style.top = top + "px";
        } else {
            // Draw at top of window
            top = (doc.parentWindow.pageYOffset) - rect.top;
            hoverInfo.style.top = top + "px";
        }
        
        if (rect.left >= doc.parentWindow.pageXOffset) {
            // Draw at 0 offset
            left = Math.min((doc.parentWindow.pageXOffset + doc.documentElement.clientWidth) - rect.left, 0);
            hoverInfo.style.left = left + "px";
        } else if (rect.left + rect.width < doc.parentWindow.pageXOffset + doc.documentElement.clientWidth){
            // Draw at screen offset
            left = Math.max(doc.parentWindow.pageXOffset - rect.left, rect.width);
            hoverInfo.style.left = left + "px";
        } else {
            // Draw at side of window
            left = (doc.parentWindow.pageXOffset) - rect.left;
            hoverInfo.style.left = left + "px";
        }
        
        if (!hoverOutline.parentNode) {
            doc.body.appendChild(hoverOutline);
        }
        
        hoverOutline.style.display = "block";
    },
    
    hideHoverItem: function domExplorer$messageHandlers$hideHoverItem() {
        /// <summary>
        ///     Remove the transparent highlighting box
        /// </summary>
        
        var hoverOutline = domUtilities.hoverOutline;
        if (hoverOutline && htmlTreeHelpers.isElementAccessible(hoverOutline) && 
            hoverOutline.parentNode && htmlTreeHelpers.isElementAccessible(hoverOutline.parentNode)) {
            hoverOutline.style.display = "none";
        }
    },
   
    selectElementByClick: function domExplorer$messageHandlers$selectElementByClick(selectCallback, mouseoverCallback) {
        /// <summary>
        ///     Starts the select element by click functionality on the main document
        ///     Hovering over elements on the document will cause them to highlight and clicking one
        ///     will post back to the VS side with information about which was clicked
        /// </summary>
        /// <param name="selectCallback" type="Function">
        ///     The function that will be called when an element on the main document is clicked
        /// </param>   
        /// <param name="mouseoverCallback" type="Function">
        ///     The function that will be called when an element on the main document is hovered
        /// </param>   
/*+VWD        
        if (domUtilities.isSelectingElement || !mainBrowser.document.body) {
            return;
        }
-VWD*/
        domUtilities.isSelectingElement = true;
        
        domUtilities.selectElementClickCallback = selectCallback;
        domUtilities.selectElementHoverCallback = mouseoverCallback;
        
//+VWD
        domUtilities.selectElementLastSelected = RemoteHost().BrowserSelectedElem;

        selectCallback();
//-VWD
/*        
        // Event handler when the user clicks on an element
        var mouseDownHandler = function domExplorer$messageHandlers$selectElementByClick$mouseDownHandler(event) {
                
            if (event.button === 0) { // Left mouse button(0)
                var mainDoc = mainBrowser.document;
                
                // Remove the overlay so we can get the real element under the click
                var overlay = domUtilities.selectElementOverlay;
                mainDoc.body.removeChild(overlay);
                
                // Remove the highlight
                var removed = false;
                var previousHighlight = domUtilities.selectElementHighlight;
                if (previousHighlight && previousHighlight.parentNode && previousHighlight.ownerDocument) {
                    previousHighlight.parentNode.removeChild(previousHighlight);
                    removed = true;
                }
                
                // Get the element from the 'getElementAtCoords' function
                var element = domUtilities.getElementAtCoords(mainDoc, event.clientX, event.clientY);
                if (element) {
                    messageHandlers.cancelSelectElementByClick();
                    domUtilities.selectElementLastSelected = element;
                    
                    if (domUtilities.selectElementClickCallback) {
                        domUtilities.selectElementClickCallback();
                }
                    
                    // Stop this click from propagating through to the page
                    event.stopPropagation();
                    event.preventDefault();
                    return false;
                } else {
                    // An invalid element has been clicked, we are still in selection mode so add the overlay back
                    mainDoc.body.appendChild(overlay);
                    
                    // Add the highlight back if we removed it
                    if (removed) {
                        previousHighlight.ownerDocument.body.appendChild(previousHighlight);
            }
                }
            }
        };
        
        // Event handler when the user hovers over an element
        var mouseMoveHandler = function domExplorer$messageHandlers$selectElementByClick$mouseMoveHandler(event) {
            var mainDoc = mainBrowser.document;
            
            var element = domUtilities.getElementAtCoords(mainDoc, event.clientX, event.clientY);
            if (element) {
                var previousHighlight = domUtilities.selectElementHighlight;
                if (previousHighlight && previousHighlight.parentNode && previousHighlight.ownerDocument !== element.ownerDocument) {
                    previousHighlight.parentNode.removeChild(previousHighlight);
                }
            
                // The two documents objects will never match, so check their window objects instead
                var isOnMainDoc = (element.ownerDocument.parentWindow === mainDoc.parentWindow);
                var rect = domUtilities.getClientRect(element);
                
                var highlight = domUtilities.createSelectElement(element.ownerDocument);
                highlight.style.top = rect.top + (isOnMainDoc ? -mainDoc.parentWindow.pageYOffset : 0) + "px";
                highlight.style.left = rect.left + (isOnMainDoc ? -mainDoc.parentWindow.pageXOffset : 0) + "px";
                highlight.style.width = rect.width + "px";
                highlight.style.height = rect.height + "px";
                
                domUtilities.selectElementHighlight = highlight;
            }
        };
        
        // Create a select overlay element
        if (!domUtilities.selectElementOverlay) {
            domUtilities.createSelectElement(mainBrowser.document, true);
        
            // Add the event listeners
            domUtilities.selectElementOverlay.addEventListener("mousedown", mouseDownHandler, true);
            domUtilities.selectElementOverlay.addEventListener("mousemove", mouseMoveHandler, true);
        }
        
        // Append the overlay
        mainBrowser.document.body.appendChild(domUtilities.selectElementOverlay);
*/
    },
    
    cancelSelectElementByClick: function domExplorer$messageHandlers$cancelSelectElementByClick() {
        /// <summary>
        ///     Stops the select element by click functionality on the main document and removes the highlighting
        /// </summary>


//+VWD DELETED
//-VWD
        domUtilities.isSelectingElement = false;
    },
    
    getIFrameChain: function domExplorer$messageHandlers$getIFrameChain(rootDocument, findDocument) {
        /// <summary>
        ///     Creates an array of iframe elements that lead from the root document to the target
        /// </summary>
        /// <param name="rootDocument" type="Object">
        ///     The root document that is used to find the iframe chain
        /// </param> 
        /// <param name="findDocument" type="Object">
        ///     The document of the iframe we are searching for
        /// </param> 
        /// <returns type="Array">
        ///     A javascript array representing the list of iframe elements that lead from the root to the target
        /// </returns> 
    
        // Find all the iframe children for this element
        var tags = rootDocument.getElementsByTagName("IFRAME");
        for (var i = 0; i < tags.length; i++) {
        
            // Get a safe window
            var iframe = domHelper.getCrossSiteWindow(rootDocument.parentWindow, tags[i].contentWindow);
        
            // Compare the documents
            if (iframe.document === findDocument) {
                // Found the iframe, so return the result
                return [tags[i]];
            }
            
            // No match, so 'recurse' into the children 'iframes'
            var chain = messageHandlers.getIFrameChain(iframe.document, findDocument);
            if (chain && chain.length > 0) {
                // As we unwind the stack, append each iframe element to the chain
                chain.push(tags[i]);
                return chain;
            }
        }
        
        // Nothing found
        return [];
    },
    
    getParentChainForSelectedElement: function domExplorer$messageHandlers$getParentChainForSelectedElement() {
        /// <summary>
        ///     Calculates the chain of elements that need to be expanded in order to show the selected element
        /// </summary>
        /// <returns type="Array">
        ///     A javascript array representing the list of parent element uid's that should be expanded
        /// </returns> 


        var parentChain = [];
        var iframeChain = null;
        var iframePosition = 0;
        var currentNode = domUtilities.selectElementLastSelected;

        while (currentNode) {
        
            // Add this node to the parent chain
            parentChain.splice(0, 0, currentNode);
            
            if (currentNode.parentNode) {
                // Move to the next parent
                currentNode = currentNode.parentNode;
            } else {
                // No parent indicates we reached the top of a frame
                if (currentNode.parentWindow === mainBrowser.document.parentWindow) {
                    // This is the root document, so we have finished building the chain
                    break;
                } else {
                    // Move up from this document element to the iframe element in the parent document
                    if (!iframeChain) {
                        // Build the iframe chain for the first time
                        iframeChain = messageHandlers.getIFrameChain(mainBrowser.document, currentNode);
                    }
                    
                    if (iframeChain) {
                        currentNode = iframeChain[iframePosition];
                        iframePosition++;
                    } else {
                        // No iframe chain indicates we have reached the root document
                        break;
                    }
                }
            }
        }

        domUtilities.expandChain = [];
        
        // Now that we have the chain of parent elements, we should get the uid's
        var parentUidChain = [{uid: "uid0"}];
        var children;
        var lastNotFoundIndex = -1;
        for (var i = 1; i < parentChain.length; i++) {
            
            var found = false;
            for (var uid in htmlTreeHelpers.mapping) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if (mappedNode.ele === parentChain[i] || (mappedNode.isIframeElement && htmlTreeHelpers.getIframeRootForMappedNode(uid) === parentChain[i])) {
                    // Found the correct mapped node, so add the uid to our array
                    parentUidChain.push({uid: uid});

                    // Check to see if we should add the children because they are not all displayed
                    if (mappedNode.isLimited) {
                        parentUidChain[i].children = mappedNode.childrenNodes;
                    }
                    
                    // Exit the loop
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                if (lastNotFoundIndex === i) {
                    // Could not finish the uid chain so just select as far as we got.
                    break;
                }
                lastNotFoundIndex = i;
                
                // Create the new object
                children = htmlTreeHelpers.getChildrenForMappedNode(parentUidChain[i - 1].uid);
                parentUidChain[i - 1].children = children; 
                i--;
            }
        }

        return parentUidChain;
    },

    getComputedBox: function domExplorer$messageHandlers$getComputedBox(uid) {
        /// <summary>
        ///     Gets the bounding box and positioning relative to the document of the currently 
        ///     inspected element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to get the computed box for
        /// </param>        
        /// <returns type="Object">
        ///     A javascript object with a number of attributes related to the positioning and dimensions 
        ///     of the currently inspected element
        /// </returns> 
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }

        var element = mappedNode.ele;
        if (!element.tagName) { 
            // If it's a textNode, then we can't get the bounding box
            return;
        }

        var computedBox = {};

        var compStyle = mainBrowser.document.defaultView.getComputedStyle(element, null);

        // Add the style properties
        var i;
        var styleProperties = styleUtilities.styleProperties;
        for (i = 0; i < styleProperties.length; i++) {
            computedBox[styleProperties[i]] = compStyle[styleProperties[i]];
        }
        
        // Add the element properties
        var elementProperties = styleUtilities.elementProperties;
        for (i = 0; i < elementProperties.length; i++) {
            computedBox[elementProperties[i]] = element[elementProperties[i]];
        }
        
        // Check for an SVG element
        if (element && element.getBoundingClientRect) {
            var rect = element.getBoundingClientRect();
            // Ensure all the data is there
            if (rect.top !== undefined && rect.left !== undefined && rect.width !== undefined && rect.height !== undefined) {
                computedBox.offsetTop = rect.top;
                computedBox.offsetLeft = rect.left;
                computedBox.clientWidth = rect.width;
                computedBox.clientHeight = rect.height;
                computedBox.isSVG = true;
            }
        }
        
        // Standardize the units
        for (var prop in computedBox) {
            if (computedBox[prop]) {
                computedBox[prop] = styleUtilities.standardizeLayoutUnits(computedBox[prop]);
            }
        }

        return computedBox;
    },
    
    getComputedBoxValue: function domExplorer$messageHandlers$getComputedBoxValue(uid, property) {
        /// <summary>
        ///     Gets the value of a computed bounding box property
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to get the computed value for
        /// </param>  
        /// <param name="property" type="String">
        ///     The name of the property to get the value of
        /// </param>            
        /// <returns type="String">
        ///     A string representing the value with standardized units
        /// </returns> 
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }

        var element = mappedNode.ele;
        if (!element.tagName) { 
            // If it's a textNode, then we can't set the bounding box
            return;
        }
        
        var value;
        
        // Check the styles first
        var i;
        var styleProperties = styleUtilities.styleProperties;
        for (i = 0; i < styleProperties.length; i++) {
            if (styleProperties[i] === property) {
                // This comes from the computed box
                var compStyle = mainBrowser.document.defaultView.getComputedStyle(element, null);
                value = compStyle.getPropertyValue(property);
                break;
            }
        }

        // If we didn't find it yet, check the elements
        var elementProperties = styleUtilities.elementProperties;
        for (i = 0; i < elementProperties.length; i++) {
            if (elementProperties[i] === property) {
                // This comes from the element
                value = element[property];
                break;
            }        
        }
                
        return styleUtilities.standardizeLayoutUnits(value);
    },
    
    setComputedBoxValue: function domExplorer$messageHandlers$setComputedBoxValue(uid, property, value) {
        /// <summary>
        ///     Sets a property of the computed box for the specified DOM element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to set the computed box value for
        /// </param>        
        /// <param name="property" type="String">
        ///     The name of the property to change
        /// </param>        
        /// <param name="value" type="String">
        ///     The new value for the specified property
        /// </param>        
        /// <returns type="Object">
        ///     A javascript object with a number of attributes related to the positioning and dimensions 
        ///     of the currently inspected element
        /// </returns> 
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }

        var element = mappedNode.ele;
        if (!element.tagName) { 
            // If it's a textNode, then we can't set the bounding box
            return;
        }
        
        // Get the style property we need to set
        var setterProperty = property;
        if (property === "offsetLeft") {
            setterProperty = "left";
        } else if (property === "offsetTop") {
            setterProperty = "top";
        } else if (property === "clientWidth") {
            setterProperty = "width";
        } else if (property === "clientHeight") {
            setterProperty = "height";
        }
        
        // Set it
        element.style[setterProperty] = styleUtilities.standardizeLayoutUnits(value);
        
        // Return the new value
        return messageHandlers.getComputedBoxValue(uid, property);
    },
    
    addAttrModifiedEvent: function domExplorer$messageHandlers$addAttrModifiedEvent(uid, callback) {
        /// <summary>
        ///     Adds a callback for dom attribute mutation events to the specified element,
        ///     The DOMAttrModified event will be hooked to the element's document if they have not been attached already.
        ///     The element will also have the onpropertychange event hooked if it requires special value handling
        /// </summary>
        /// <param name="callback" type="Function">
        ///     The callback to run when the element's attributes change
        /// </param>  

        // Ensure we have already mapped the requested DOM element
        var nodeToAddCallbackTo = htmlTreeHelpers.mapping[uid];
        if (!nodeToAddCallbackTo || !htmlTreeHelpers.isElementAccessible(nodeToAddCallbackTo.ele)) {
            return;
        }
        
        // Store the callback
        nodeToAddCallbackTo.onAttributeModified = callback;
        
        
        var fireMutationCallback = function (mappedNode) {
            // Fire the callback for this element                    
            for (var i in mappedNode.pendingAttrModified) {
                mappedNode.onAttributeModified(mappedNode.pendingAttrModified[i]);
            }
            mappedNode.pendingAttrModified = null;
            mappedNode.onAttrModifiedTimeout = null;
        }; 
        
        var fireAttributeCallback = function (element, attrName, newValue, changeType) {
            // Loop through and find the mapped node that this event occurred on
            var mappedNode = null;
            for (var uidIndex in htmlTreeHelpers.mapping) {
                if (htmlTreeHelpers.mapping[uidIndex].ele === element) {
                    mappedNode = htmlTreeHelpers.mapping[uidIndex];
                    break;
                }
            }
            
            if (mappedNode) {
            
                // Value attributes need to have the changeType set now
                if (attrName === "value") {
                    changeType = (mappedNode.hasValueAttribute ? 1 : 2); // 1 == Edit, 2 == Add
                    mappedNode.hasValueAttribute = true;                
                }
                
                // Update the stored node
                if (changeType === 1 || changeType === 3) {  // 1 == Edit, 3 == Delete

                    for (var i = 0; i < mappedNode.mapped.attributes.length; i++) {
                        if (mappedNode.mapped.attributes[i].name === attrName) {
                            if (changeType === 1) {
                                // Edit the value
                                mappedNode.mapped.attributes[i].value = newValue;
                            } else {
                                // Remove the attribute
                                mappedNode.mapped.attributes.splice(i, 1);
                            }
                            break;
                        }
                    }
                    
                } else if (changeType === 2) { // 2 == Add
                
                    // Just add the attribute
                    mappedNode.mapped.attributes.push({name: attrName, value: newValue});
                }
            
                // Add this mutation to our pending list
                if (!mappedNode.pendingAttrModified) {
                    mappedNode.pendingAttrModified = {};
                }
                mappedNode.pendingAttrModified[attrName] = {
                    event: "attrModified",
                    attrName: attrName,
                    newValue: newValue,
                    attrChange: changeType
                };
                    
                if (mappedNode.onAttributeModified) {
                    // Stop any previous queued mutations because we have this new one ready to fire
                    if (mappedNode.onAttrModifiedTimeout) {
                        mainBrowser.document.parentWindow.clearTimeout(mappedNode.onAttrModifiedTimeout);
                    }

                    if (remoteHelpers.useTimeout()) {
                        // We can batch up a mutations in quick succession to lower the postMessage usage
                        mappedNode.onAttrModifiedTimeout = mainBrowser.document.parentWindow.setTimeout(function () {
                            fireMutationCallback(mappedNode);
                        }, 100); 
                    } else {
                        // We are not using timeouts (probably due to being in break mode), so fire it now
                        fireMutationCallback(mappedNode);
                    }
                        
                }
                
            }           
        };
        
        // Check for a pending mutation event for this node
        if (nodeToAddCallbackTo.pendingAttrModified) {
            // We have one, so fire it now
            fireMutationCallback(nodeToAddCallbackTo);
        }
        
        // The value property is not supported in 'DOMAttrModified', so we must attach a different event to catch it
        // We only need to hook this for certain element types, that have the special value attribute.
        if (htmlTreeHelpers.hasSpecialValueAttribute(nodeToAddCallbackTo.ele)) {
            if (nodeToAddCallbackTo.ele.attachEvent) {
                // Remove any existing handler
                if (nodeToAddCallbackTo.onValueModified) {
                    nodeToAddCallbackTo.ele.detachEvent("onpropertychange", nodeToAddCallbackTo.onValueModified);
                }
                
                var onPropertyChanged = function (e) {
                    // We only need to special case the value change
                    if (e.propertyName === "value") {
                        fireAttributeCallback(e.srcElement, "value", e.srcElement.value, 0); 
                    }
                };
    
                // Attach the listener
                nodeToAddCallbackTo.ele.attachEvent("onpropertychange", onPropertyChanged);
            }
        }        
        
        // Check to see if we have already attached mutation handlers to this document
        if (!htmlTreeHelpers.isElementAccessible(nodeToAddCallbackTo.ele.ownerDocument)) {
            // An exception is caused by the page already having navigated away, so just exit the function
            return;
        }

        var root =  nodeToAddCallbackTo.ele.ownerDocument;
        for (var docIndex = 0; docIndex < domUtilities.attachedAttrModifiedDocs.length; docIndex++) {
            if (domUtilities.attachedAttrModifiedDocs[docIndex].doc === root) {
                // Already added so just return
                return;
            }
        }
        
        var onModified = function (e) {
            // Ignore mutations caused by elements that are not in the document
            var parentElement = e.target.parentNode;
            if (!parentElement) {
                return;
            }
            
            // Ignore mutations caused by hovering
            if ((e.target.className && (typeof e.target.className === "string") && e.target.className.indexOf(htmlTreeHelpers.ignoreStyleClass) !== -1) ||
                (parentElement.className && (typeof parentElement.className === "string") && parentElement.className.indexOf(htmlTreeHelpers.ignoreStyleClass) !== -1)) {
                return;
            }

            fireAttributeCallback(e.target, e.attrName, e.newValue, e.attrChange); 
        };
        
        // Attach the handlers
        root.addEventListener("DOMAttrModified", onModified, true);
        
        // Store the document
        domUtilities.attachedAttrModifiedDocs.push({doc: root, handler: onModified});    

    },
    
    addTreeModifiedEvent: function domExplorer$messageHandlers$addTreeModifiedEvent(uid, callback) {
        /// <summary>
        ///     Adds a callback for dom tree mutation events to the specified element,
        ///     The DOMNodeInserted, DOMNodeRemoved and DOMCharacterDataModified events will be hooked to the
        ///     element's document if they have not been attached already.
        /// </summary>
        /// <param name="callback" type="Function">
        ///     The callback to run when the element's dom tree is modified
        /// </param>  
        /// <disable>JS2078.DoNotDeleteObjectProperties</disable>
        
        // Ensure we have already mapped the requested DOM element
        var nodeToAddCallbackTo = htmlTreeHelpers.mapping[uid];
        if (!nodeToAddCallbackTo || !htmlTreeHelpers.isElementAccessible(nodeToAddCallbackTo.ele)) {
            return;
        }

        // Store the callback
        nodeToAddCallbackTo.onTreeModified = callback;

        // Check for a pending mutation event for this node
        if (nodeToAddCallbackTo.pendingTreeModified) {
            // We have one, so fire it now
            nodeToAddCallbackTo.onTreeModified(nodeToAddCallbackTo.pendingTreeModified);
            nodeToAddCallbackTo.pendingTreeModified = null;
            return;
        }
        
        // Check to see if we have already attached mutation handlers to this document
        if (!htmlTreeHelpers.isElementAccessible(nodeToAddCallbackTo.ele.ownerDocument)) {
            // An exception is caused by the page already having navigated away, so just exit the function
            return;
        }
        
        var root = nodeToAddCallbackTo.ele.ownerDocument;
        for (var docIndex = 0; docIndex < domUtilities.attachedDomModifiedDocs.length; docIndex++) {
            if (domUtilities.attachedDomModifiedDocs[docIndex].doc === root) {
                // Already added so just return
                return;
            }
        }
        
        var onModified = function domExplorer$messageHandlers$addTreeModifiedEvent$onModified(e) {
            
            // Ignore mutations caused by elements that are not in the document
            var parentElement = e.target.parentNode;
            if (!parentElement) {
                return;
            }
            
            // Ignore mutations caused by hovering
            if ((e.target.className && (typeof e.target.className === "string") && e.target.className.indexOf(htmlTreeHelpers.ignoreStyleClass) !== -1) ||
                (parentElement.className && (typeof parentElement.className === "string") && parentElement.className.indexOf(htmlTreeHelpers.ignoreStyleClass) !== -1)) {
                return;
            }
        
            // Loop through and find the mapped node that this event occurred on
            var mappedNode = null;
            for (var uidIndex in htmlTreeHelpers.mapping) {
                if (htmlTreeHelpers.mapping[uidIndex].ele === parentElement) {
                    mappedNode = htmlTreeHelpers.mapping[uidIndex];
                    break;
                }
            }
            
            if (mappedNode) {
                if (e.type === "DOMNodeInserted" || e.type === "DOMCharacterDataModified") {
                
                    if (mappedNode.isExpanded) {
                        // Add this new child
                        var mappedChild = htmlTreeHelpers.createMappedNode(e.target);
                       
                        if (mappedChild) {
                            if (!mappedNode.childrenNodes || mappedNode.childrenNodes.length === 0) {
                                // Add the new first child
                                mappedNode.childrenNodes = [mappedChild];
                                if (e.target.nodeName === "#text") {
                                    // This is text element, so we need to check for inline text
                                    if (!e.target.textContent.match(/\n/g) && e.target.textContent.length < htmlTreeHelpers.maxInlineLength) {
                                        mappedNode.mapped.hasChildren = false;
                                        mappedNode.mapped.text = e.target.textContent;
                                    } else {
                                        mappedNode.mapped.hasChildren = true;
                                    }
                                }
                            } else {
                                // We have existing children, so we need to find where the new item was added
                                var found = false;
                                var existingChildren = mappedNode.ele.childNodes;
                                
                                var insertIndex = 0;
                                
                                for (var nodeIndex = 0; nodeIndex < existingChildren.length; nodeIndex++, insertIndex++) {
                                    var existingChild = existingChildren[nodeIndex];

                                    if (existingChild === e.target) {
                                        // Splice the new child into the correct position
                                        mappedNode.childrenNodes.splice(insertIndex, 0, mappedChild);
                                        found = true;
                                        break;
                                    } else if (existingChild.nodeName === "#text" && (typeof existingChild.textContent === "string") && /^\s*$/.test(existingChild.textContent)) {
                                        // This is an empty text node that we don't show in the UI, so ignore it for the insert position
                                        insertIndex--;
                                    }
                                }
                                
                                if (!found) {
                                    // Just append the child onto the end
                                    mappedNode.childrenNodes.push(mappedChild);
                                }
                            }
                        }
                    } else {
                        mappedNode.childrenNodes = [{uid: "expandMe"}];
                        mappedNode.mapped.hasChildren = true;
                    }
                    
                } else if (e.type === "DOMNodeRemoved"){
                    if (mappedNode.childrenNodes) {
                        // If this node has not been expanded, we can set the length to 0 if there are no more children
                        if (mappedNode.childrenNodes.length === 1 && mappedNode.childrenNodes[0].uid === "expandMe") {
                            if (mappedNode.ele.childNodes.length === 0) {
                                // Remove the temp node
                                mappedNode.childrenNodes = [];
                            }
                        } else {
                            // Find and remove the existing child
                            for (var i = 0; i < mappedNode.childrenNodes.length; i++) {
                                if (htmlTreeHelpers.mapping[mappedNode.childrenNodes[i].uid].ele === e.target) {
                                    htmlTreeHelpers.deleteMappedNode(mappedNode.childrenNodes[i].uid);
                                    mappedNode.childrenNodes.splice(i, 1);
                                    break;
                                }
                            }
                        }
                        mappedNode.mapped.hasChildren = (mappedNode.childrenNodes && mappedNode.childrenNodes.length > 0);
                        
                    } else if (e.target.nodeName === "#text") {
                        // This was an inline text element, so remove the text information
                        delete mappedNode.mapped.text;
                    }
                }
                
                if (mappedNode.onTreeModified) {
                    // Fire the callback for this element                    
                    var fireMutationCallback = function () {
                        mappedNode.onTreeModified({
                            event: "treeModified",
                            children: mappedNode.childrenNodes
                        });
                        mappedNode.onTreeModifiedTimeout = null;
                    };

                    // Stop any previous queued mutations because we have this new one ready to fire
                    if (mappedNode.onTreeModifiedTimeout) {
                        mainBrowser.document.parentWindow.clearTimeout(mappedNode.onTreeModifiedTimeout);
                    }
                        
                    if (remoteHelpers.useTimeout()) {
                        // We can batch up a mutations in quick succession to lower the postMessage usage
                        mappedNode.onTreeModifiedTimeout = mainBrowser.document.parentWindow.setTimeout(fireMutationCallback, 100); 
                    } else {
                        // We are not using timeouts (probably due to being in break mode), so fire it now
                        fireMutationCallback();
                    }
                        
                } else {
                    // We haven't got a callback for this element yet, probably because a 
                    // mutation occurred before the async mutation callback was added.
                    // Store the event, so we can fire it when the callback is hooked up.
                    mappedNode.pendingTreeModified = {
                        event: "treeModified",
                        children: mappedNode.childrenNodes
                    };
                }
            }
            
        };
        
        var onUnload = function domExplorer$messageHandlers$addTreeModifiedEvent$onUnload(e) {
            /// <summary>
            ///     Function called when a document is unloaded, we then find the mapped node
            ///     and simulate a DOMNodeRemoved mutation event in order to remove it from the display
            ///     in the client side DomExplorer.
            /// </summary>
            /// <param name="e" type="Object">
            ///     The event object
            /// </param>    
                        
            // Find the iframe element that had its document unloaded        
            var iframeChain = messageHandlers.getIFrameChain(mainBrowser.document, e.target.document);
            if (iframeChain.length > 0) {
                var targetElement = iframeChain[0];
            
                // Loop through and find the mapped node that this event occurred on
                var mappedNode = null;
                for (var uidIndex in htmlTreeHelpers.mapping) {
                    if (htmlTreeHelpers.mapping[uidIndex].ele === targetElement) {
                        mappedNode = htmlTreeHelpers.mapping[uidIndex];
                        break;
                    }
                }
                
                if (mappedNode) {
                    // Fire a mutation event that will remove this unloaded iframe from the dom tree
                    var removeEvent = {type: "DOMNodeRemoved", target: mappedNode.ele};
                    onModified(removeEvent);
                }
            }
        };
        
        // Attach the handlers
        root.addEventListener("DOMNodeInserted", onModified, true);
        root.addEventListener("DOMNodeRemoved", onModified, true);
        root.addEventListener("DOMCharacterDataModified", onModified, true);
        root.parentWindow.addEventListener("unload", onUnload, true);
        
        // Store the document
        domUtilities.attachedDomModifiedDocs.push({doc: root, handler: onModified});       
    },    
//+VWD
    getCallstack: function domExplorer$messageHandlers$getCallStack(uid) {
        var retVal = [];
  
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return null;
        }
  
        // Ensure the mapping script has been injected.
        if (!mainBrowser.document.parentWindow.__vwd) {
            return null;
        }

        var callStack = mainBrowser.document.parentWindow.__vwd.getCallStackOfNode(mappedNode.ele);

        if (callStack != null) {
            for (var i = 0; i < callStack.length; i++) {
                var frame = callStack[i];

                var displayHref = frame._fileName;
                var tooltipHref = frame._fileName;

                if (displayHref == null || displayHref == "") {
                    displayHref = mainBrowser.document.location.href;
                    tooltipHref = mainBrowser.document.location.href;
                }

                var computeStackFrame = function (frame) {
                    var sourceRange = RemoteHost().FindSourceRangeFromFetched(frame._start, frame._length, frame._fileName);

                    var sourceStart = frame._start;
                    var sourceLength = frame._length;
                    var sourceHref = frame._fileName;

                    if (sourceRange != null) {
                        var list = sourceRange.split("|");

                        sourceStart = parseInt(list[0]);
                        sourceLength = parseInt(list[1]);
                        sourceHref = list[2];
                        displayHref = sourceHref;
                        tooltipHref = sourceHref;
                    }

                    var isJscriptLibrary = RemoteHost().IsJScriptLibrary(sourceHref);

                    return {
                        funcName: frame._funcName,
                        displayHref: displayHref,
                        tooltipHref: tooltipHref,
                        href: sourceHref,
                        start: sourceStart,
                        length: sourceLength,
                        isLibrary: isJscriptLibrary
                    };
                }

                stackFrame = computeStackFrame(frame);

                retVal.push(stackFrame);
            }
        }

        return retVal;
    },
//-VWD
    getStyles: function domExplorer$messageHandlers$getStyles(uid) {
        /// <summary>
        ///     Get all the applied css rules on the DOM element     
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to toggle the styles of
        /// </param>    
        /// <returns type="Object">
        ///     A javascript object with a list of applied CSS Rules
        /// </returns> 
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }
        
        // Check if this is a text node where we need to use the parent styles
        if (mappedNode.parentUid) {
            mappedNode = htmlTreeHelpers.mapping[mappedNode.parentUid];
            
            // Ensure we have mapped it
            if (!mappedNode) {
                return;
            }
        }
        
        // We know when getStyles get called, all the old one gets cleared
        styleUtilities.styleMapping = {};
        //+VWD
        styleUtilities.ruleMapping = {};
        //-VWD
        // Maintain a list of the rules, so if we find any duplicates we can link them.
        var previouslyMappedRules = {};
        var element = mappedNode.ele;
        var retVal = [];
        var rulesApplied = styleUtilities.getRulesApplied(element);
        var uidString, inherited, mappedStyle, curPropApplied;
        
        // Ensure that there is a styles object to iterate through
        if (rulesApplied) {
            for (var ruleIndex = 0; ruleIndex < rulesApplied.length; ruleIndex++) {
                var ruleApplied = rulesApplied[ruleIndex];
                
                var inlineStyleApplied = ruleApplied.inlineStyles;
                for (var styleIndex = 0; styleIndex < inlineStyleApplied.length; styleIndex++) {
                    curPropApplied = inlineStyleApplied[styleIndex];
                    
                    uidString = remoteHelpers.getUid();
                    inherited = (ruleApplied.element !== element ? ruleApplied.element.tagName : false);
                    
                    // Get the uid of the element that this style comes from
                    var elementUid = uid;
                    if (inherited) {
                        for (var uidIndex in htmlTreeHelpers.mapping) {
                            if (htmlTreeHelpers.mapping[uidIndex].ele === ruleApplied.element) {
                                // Found the matching element
                                elementUid = uidIndex;
                                break;
                            }
                        }
                    }
                    
                    var inlinedValue = inlineStyleApplied[styleUtilities.cssToJavascriptName(curPropApplied)];
                    var inlinedEnabled = styleUtilities.getPropertyEnabled(inlineStyleApplied, curPropApplied);
                    
                    if (!inlinedEnabled) {
                        // Disabled styles don't have a value, so to get it we re-enable the style, read its value, then disable it again
                        styleUtilities.setPropertyEnabled(inlineStyleApplied, curPropApplied, true);
                        inlinedValue = inlineStyleApplied[styleUtilities.cssToJavascriptName(curPropApplied)];
                        styleUtilities.setPropertyEnabled(inlineStyleApplied, curPropApplied, false);
                    }
                        
                    mappedStyle = {
                        uid: uidString,
                        inlined: true,
                        property: curPropApplied,
                        inherited: inherited,
                        selector: "inlined",
                        value: inlinedValue,
                        enabled: inlinedEnabled
                    };
                    retVal.push(mappedStyle);
                    styleUtilities.styleMapping[uidString] = {styleObject: inlineStyleApplied, mappedStyle: mappedStyle, elementUid: elementUid};
                }

                for (var appliedRuleIndex = 0; appliedRuleIndex < ruleApplied.appliedRules.length; appliedRuleIndex++) {
//+VWD
                    // WTE bug 579285: Sometimes accessing properties from curRuleApplied will throw
                    // "Permission Denied" exceptions. Fail gracefully by ignoring the rule.
                    try {
//-VWD
                        var curRuleApplied = ruleApplied.appliedRules[appliedRuleIndex];
                        var curStyleApplied = curRuleApplied.style;
//+VWD
                        var ruleUIDString = "UID" + remoteHelpers.getUid();
                        styleUtilities.ruleMapping[ruleUIDString] = curRuleApplied;
//-VWD
                        for (var propertyIndex = 0; propertyIndex < curStyleApplied.length; propertyIndex++) {
                            curPropApplied = curStyleApplied[propertyIndex];
                            inherited = (ruleApplied.element !== element ? ruleApplied.element.tagName : false);

                            // If this is a property that is inherited but isn't inheritable, we don't care
                            if (inherited && !ruleApplied.propertyIsInheritable(curPropApplied)) {
                                continue;
                            }
                            
                            // Generate a key that we can use to store this mapped rule in a hash table
                            var ruleKey = (curRuleApplied.cssText + "|" + curPropApplied);
                            
                            // Check if this style has already been mapped from a parent element
                            if (previouslyMappedRules[ruleKey] &&  previouslyMappedRules[ruleKey].style === curStyleApplied) {
                                if (previouslyMappedRules[ruleKey].inheritedFromTags[inherited]) {
                                    // We already have this style from a previous parent element (example: 2 parent div elements with the same style)
                                    continue;
                                }
                                uidString = previouslyMappedRules[ruleKey].uid;
                            } else {
                                uidString = remoteHelpers.getUid();
                            }
                            
                            var declaredValue = curStyleApplied[styleUtilities.cssToJavascriptName(curPropApplied)];
                            var declaredEnabled = styleUtilities.getPropertyEnabled(curStyleApplied, curPropApplied);
                            
                            if (!declaredEnabled) {
                                // Disabled styles don't have a value, so to get it we re-enable the style, read its value, then disable it again
                                styleUtilities.setPropertyEnabled(curStyleApplied, curPropApplied, true);
                                declaredValue = curStyleApplied[styleUtilities.cssToJavascriptName(curPropApplied)];
                                styleUtilities.setPropertyEnabled(curStyleApplied, curPropApplied, false);
                            }

                            var styleSheet = styleUtilities.getStylesheetOfRule(curRuleApplied);
                            var styleHref = styleUtilities.getSourceStyleSheetOfRule(styleSheet, curRuleApplied);

                            mappedStyle = {
                                uid: uidString,
                                inlined: false,
                                property: curPropApplied,
                                inherited: inherited,
                                selector: curRuleApplied.selectorText,
                                value: declaredValue,
                                enabled: declaredEnabled,
                                styleHref: styleHref,
//+VWD
                                ruleUID: ruleUIDString
//-VWD
                            };
                            retVal.push(mappedStyle);
                            
                            styleUtilities.styleMapping[uidString] = {styleObject: curStyleApplied, mappedStyle: mappedStyle};
                            
                            // Store this style if it is new, or update it if it already exists
                            if (!previouslyMappedRules[ruleKey]) {
                                previouslyMappedRules[ruleKey] = {
                                    uid: uidString, 
                                    style: curStyleApplied,
                                    inheritedFromTags: {}
                                };
                            } else {
                                previouslyMappedRules[ruleKey].style = curStyleApplied;
                            }

                            // If this rule has been inherited from something, store that inherited element's tag
                            if (inherited) {
                                previouslyMappedRules[ruleKey].inheritedFromTags[inherited] = true;
                            }                        
                        }
//+VWD
                    }
                    catch (e)
                    {
                    }
//-VWD
                }
            }
        }
        return retVal;
    },    
    
    toggleStyles: function domExplorer$messageHandlers$toggleStyles(uid, styleUid, propertyName, enable) {
        /// <summary>
        ///     Disables or enables the specified css style rule      
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to toggle the styles of
        /// </param>        
        /// <param name="styleUid" type="String">
        ///     The mapped unique id of the style object we are changing
        /// </param>    
        /// <param name="propertyName" type="String">
        ///     The name of the property to toggle
        /// </param>  
        /// <param name="enable" type="Boolean">
        ///     True to enable the styles, False to disable them
        /// </param>  
        
        var curStyle = styleUtilities.styleMapping[styleUid];
        if (curStyle) {
        
            // Enable or Disable the style
            styleUtilities.setPropertyEnabled(curStyle.styleObject, propertyName, enable);
        
            if (curStyle.mappedStyle.inlined) {
                // Inline styles require a recalculation of the styles to take effect

                // Ensure we have already mapped the requested DOM element
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                
                // Check if this is a text node where we need to use the parent styles
                if (mappedNode.parentUid) {
                    mappedNode = htmlTreeHelpers.mapping[mappedNode.parentUid];
                    
                    // Ensure we have mapped it
                    if (!mappedNode) {
                        return;
                    }
                }
                
                // Force a recalculation
                styleUtilities.getRulesApplied(mappedNode.ele);
            }
        }
    },
    
    editStyles: function domExplorer$messageHandlers$editStyles(uid, propertyName, newValue) {
        /// <summary>
        ///     Replaces the specified css rule to the contents of newValue
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to edit
        /// </param>    
        /// <param name="propertyName" type="String">
        ///     The name of the property to edit
        /// </param>  
        /// <param name="newValue" type="String">
        ///     The new value to set on the property
        /// </param> 
        /// <returns type="Object">
        ///     The new style of the element that changed, if it could not be selected then returns undefined
        /// </returns> 
        
        var curStyle = styleUtilities.styleMapping[uid];
        if (curStyle) {
        
            var mappedElement = null;
            var oldStyleText = "";
            if (curStyle.mappedStyle.inlined) {
                // Setting inline styles to an empty string requires a recalculation of the style attribute
                
                // Ensure we have already mapped the requested DOM element
                mappedElement = htmlTreeHelpers.mapping[curStyle.elementUid];

                // Check if this is a text node where we need to use the parent styles
                if (mappedElement && mappedElement.parentUid) {
                    mappedElement = htmlTreeHelpers.mapping[mappedElement.parentUid];
                }
            
                if (mappedElement) {
                    oldStyleText = mappedElement.ele.getAttribute("style");
                }
            }

            // Check for a pseudo element
            if (propertyName.indexOf("::") >= 0) {
                var pseudoElement = propertyName.match(/::[\w\-]+/);
                if (pseudoElement && pseudoElement.length === 1 && pseudoElement[0].length < propertyName.length) {
                    // Remove the pseudo element part to get the real property name
                    propertyName = propertyName.substring(pseudoElement[0].length + 1);
                }
            }
            
            // Get the real style object
            var actualStyleObject = curStyle.styleObject;

            // Store the enabled/disabled state
            var isEnabled = styleUtilities.getPropertyEnabled(actualStyleObject, propertyName);
            
            // Change the attribute
            actualStyleObject[styleUtilities.cssToJavascriptName(propertyName)] = newValue;
            
            // Get the updated style
            var newStyle = actualStyleObject[styleUtilities.cssToJavascriptName(propertyName)];

            if (curStyle.mappedStyle.inlined && mappedElement) {
            
                var newStyleText = mappedElement.ele.getAttribute("style");

                if (newStyleText !== oldStyleText) {
                    // Force a recalculation
                    var info = {
                        event: "attrModified",
                        attrName: "style",
                        newValue: newStyleText,
                        attrChange: (newStyleText ? 1 : 3) // 3 == Delete, 1 == Edit
                    };
                    mappedElement.onAttributeModified(info);
                }
            }
            
            if (!isEnabled) {
                // Restore the disabled state, as it can be changed by setting a new value
                styleUtilities.setPropertyEnabled(actualStyleObject, propertyName, isEnabled);
            }
            
            return newStyle;
        }
        
        // If we couldn't select it, return with no style
    },

    clearCurrentEventProxy: function domExplorer$messageHandlers$clearCurrentEventProxy() {
        /// <summary>
        ///     Stop listening to event add/remove events because we're no longer on the
        ///     events tab.
        /// </summary>

        if (domUtilities.currentEventProxy) {
            domUtilities.currentEventProxy.removeAllEventListeners();
            domUtilities.currentEventProxy = null;
        }
    },

    collectEvents: function domExplorer$messageHandlers$collectEvents(uid, handlerAddedCallback, handlerRemovedCallback) {
        /// <summary>
        ///     Start listening for eventadded and eventremoved events on the specified element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want listen for event changes on
        /// </param>
        /// <param name="handlerAddedCallback" type="Function">
        ///     A callback to handle the addition of event listeners on an element.  Takes an element as a param.
        /// </param>
        /// <param name="handlerRemovedCallback" type="Function">
        ///     A callback to handle the removal of an event listener from an element.  Takes an event with 
        ///     a cookie and an event name as members.
        /// </param>
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }
        
        var mappedElement = mappedNode.ele;
        if (domUtilities.currentEventProxy) {
            domUtilities.currentEventProxy.removeAllEventListeners();
        }

        domUtilities.currentEventProxy = domHelper.getEventHandlerAPIObjectProxy(mappedElement);

        if (domUtilities.currentEventProxy) {
            domUtilities.currentEventProxy.addEventListener("listeneradded", handlerAddedCallback);
            domUtilities.currentEventProxy.addEventListener("listenerremoved", handlerRemovedCallback);

            var listeners = domUtilities.currentEventProxy.getEventHandlers();

            // TODO: do this more efficiently with a single call passing the whole array.
            for (var i = 0; i < listeners.length; i++) {
                handlerAddedCallback(listeners[i]);
            }
        }
    },
    
    getDocumentMode: function domExplorer$messageHandlers$getDocumentMode() {
        /// <summary>
        ///     Gets the value of the main document mode
        /// </summary>
        /// <returns type="Number">
        ///     The document mode
        /// </returns>
        
        return mainBrowser.document.documentMode;
    },
    
    getHTMLString: function domExplorer$messageHandlers$getHTMLString(uid, getInnerHTML) {
        /// <summary>
        ///     Gets the value of either the inner or outer HTML of a DOM element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to use
        /// </param> 
        /// <param name="getInnerHTML" type="Boolean">
        ///     True to get the innerHTML, False to get the outerHTML
        /// </param>            
        /// <returns type="String">
        ///     The innerHTML
        /// </returns>
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }

        var element = mappedNode.ele;
        if (!element.tagName) { 
            // If it's a textNode, then we can't get the html
            return;
        }
        
        // Use the DOM helper to get the html text so that it works for SVG elements
        if (getInnerHTML) {
            return domHelper.getElementInnerHTML(mappedNode.ele);
        } else {
            return domHelper.getElementOuterHTML(mappedNode.ele);
        }
        
    },
    
    forceLatestDocMode: function domExplorer$messageHandlers$forceLatestDocMode(failedCallback) {
        /// <summary>
        ///     Adds an IE-Edge meta tag to the current 'debuggee' document and reloads it.
        ///     This will force the page to load in the latest document mode.
        /// </summary>
        /// <param name="failedCallback" type="Function">
        ///     The callback to call if the function fails
        /// </param>       
        
        // The meta tag must be applied asynchronously
        mainBrowser.document.parentWindow.setTimeout(function () {
            // Apply the meta tag
            var succeeded = mainBrowser.document.parentWindow.eval(
                "(function (){\n" + 
                "   try {\n" + 
                "      var xhr = (location.protocol === 'file:' ? new ActiveXObject('MSXML2.XMLHTTP') : new XMLHttpRequest()); \n" + 
                "      xhr.open('GET', location.href, false);\n" +
                "      xhr.send(null);\n" + 
                "      document.close();\n" + 
                "      document.write('<!DOCTYPE html> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\" >' + xhr.responseText);\n" + 
                "      document.close();\n" + 
                "      location.reload();\n" + 
                "      return true;\n" + 
                "   } catch (e) {\n" + 
                "      return false;\n" +
                "   }\n" + 
                " })();"
            );
            
            // Check the result
            if (!succeeded) {
                failedCallback();
            }
        }, 0);    
    },
    
    setKeyBindCallbacks: function domExplorer$messageHandlers$setKeyBindCallbacks(onVSFocusCallback, startSelectElementByClickCallback, stopSelectElementByClickCallback) {
        /// <summary>
        ///     Stores the callbacks to use for key bindings in the remote app
        /// </summary>
        /// <param name="onVSFocusCallback" type="Function">
        ///     The callback to call when VS should take focus (Used for F12 key)
        /// </param> 
        /// <param name="startSelectElementByClickCallback" type="Function">
        ///     The callback to call when VS needs to start selecting an element by click (Used for Ctrl+B key)
        /// </param> 
        /// <param name="stopSelectElementByClickCallback" type="Function">
        ///     The callback to call when VS needs to cancel selecting an element by click (Used for Ctrl+B key)
        /// </param> 
        
        remoteCode.vsFocusCallback = onVSFocusCallback;
        remoteCode.startSelectElementByClickCallback = startSelectElementByClickCallback;
        remoteCode.stopSelectElementByClickCallback = stopSelectElementByClickCallback;
    },
   
    allowProcessToTakeForeground: function domExplorer$messageHandlers$allowProcessToTakeForeground(vsProcessId) {
        /// <summary>
        ///     Allow VS to take focus when the remote page is the foreground window
        /// </summary>
        /// <param name="vsProcessId" type="Number">
        ///     The process id of Visual Studio
        /// </param>         
        /// <returns type="Boolean">
        ///     True if the call to AllowSetForegroundWindow succeeded, false otherwise
        /// </returns>
        
        return toolUI.allowProcessToTakeForeground(vsProcessId);
    },

    getBrowserHwnd: function domExplorer$messageHandlers$getBrowserHwnd() {
        /// <summary>
        ///     Gets the hwnd of the remote side page,
        ///     Used for focusing the window from VS
        /// </summary>   
        /// <returns type="Number">
        ///     The window id from the mainBrowser
        /// </returns>
        
        return mainBrowser.HWND;
    },
    
    addCSSRule: function domExplorer$messageHandlers$addCSSRule(selectorText, propertyName, propertyValue) {
        /// <summary>
        ///     Adds a new CSS rule with a single property to a dom explorer style sheet
        /// </summary>
        /// <param name="selectorText" type="String">
        ///     The CSS selector text to use for the rule (E.g. #myDiv)
        /// </param>    
        /// <param name="propertyName" type="String">
        ///     The name of the first property to give the rule (E.g. background-color)
        /// </param>    
        /// <param name="propertyValue" type="String">
        ///     The value of the first property to give the rule (E.g. red)
        /// </param>    
        
        var doc = mainBrowser.document;

        var sheet = doc.getElementById("__VISUALSTUDIO_DOMEXPLORER_DYNAMIC_STYLES");
        if (!sheet) {
            // There wasn't an existing style sheet, so create it now
            sheet = doc.createElement("style");
            sheet.id = "__VISUALSTUDIO_DOMEXPLORER_DYNAMIC_STYLES";
            sheet.type = "text/css";
            sheet.rel = "stylesheet";
            doc.getElementsByTagName("head")[0].appendChild(sheet);
        }
        
        sheet.styleSheet.insertRule(selectorText + " {\r\n   " + propertyName + ": " + propertyValue + "\r\n}", 0);
    },
    
    addCSSProperty: function domExplorer$messageHandlers$addCSSProperty(uid, propertyName, propertyValue) {
        /// <summary>
        ///     Adds a new CSS property to an existing rule
        /// </summary>
        /// <param name="uid" type="String">
        ///     The uid of a mapped style that we are adding the property to
        /// </param>    
        /// <param name="propertyName" type="String">
        ///     The name of the property E.g. background-color)
        /// </param>    
        /// <param name="propertyValue" type="String">
        ///     The value of the property(E.g. red)
        /// </param>    
        
        var curStyle = styleUtilities.styleMapping[uid];
        if (curStyle) {
            // Convert the css name, to a javascript property
            var jsName = styleUtilities.cssToJavascriptName(propertyName);
            
            // Set the new style
            curStyle.styleObject[jsName] = propertyValue;
        }
    },
    
    storeElementForConsole: function domExplorer$messageHandlers$storeElementForConsole(uid) {
        /// <summary>
        ///     Allows an element to be accessed in the Console via $0 - $4
        /// </summary>
        /// <param name="uid" type="String">
        ///     The uid of a mapped element that we are setting to be the accessible via the console
        /// </param>  
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }
        
        var elements = mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_STORED_ELEMENTS;
        if (!elements) {
            // Create the new array
            elements = mainBrowser.document.parentWindow.__VISUALSTUDIO_DOMEXPLORER_STORED_ELEMENTS = [];
        }
        
        // Add the element
        elements.splice(0, 0, mappedNode.ele);
        
        // Keep only latest 5
        if (elements.length > 5) {
            elements.pop();
        }
    },
    
    selectElementFromConsole: function domExplorer$messageHandlers$selectElementFromConsole() {
        /// <summary>
        ///     Gets the remote side ready to select an element that was previously set by console.select()
        /// </summary>
        /// <returns type="Boolean">
        ///     True if the select is successful
        /// </returns>
        
        var win = mainBrowser.document.parentWindow;
        var element = win.__VISUALSTUDIO_CONSOLE_SELECTED_ELEMENT;
        if (element) {
            
            // Check that this is actually an html element
            var isHtmlElement = win.eval(
                "(function (){\n" + 
                "   try {\n" + 
                "      return (window.__VISUALSTUDIO_CONSOLE_SELECTED_ELEMENT instanceof HTMLElement);\n" + 
                "   } catch (e) {\n" + 
                "      return false;\n" + 
                "   }\n" + 
                " })();"
            );
            
            if (isHtmlElement) {
                domUtilities.selectElementLastSelected = element;
                return true;
            }
        }
        
        return false;
    },
    
    getSourceLocation: function domExplorer$messageHandlers$getSourceLocation(uid) {
        /// <summary>
        ///     Gets the source location for an element by walking up the parent chain to find the closest
        ///     msSourceLocation or the first window location.href.
        /// </summary>
        /// <param name="uid" type="String">
        ///     The uid of a mapped element that we want the source location for
        /// </param>          
        /// <returns type="String">
        ///     The value of the msSourceLocation of this element, or its closest parent that has it set.
        ///     If a window object (iframe or root element) is found before an element with msSourceLocation
        ///     the function returns that window's location.href.
        /// </returns>
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }
        
        var element = mappedNode.ele;
        while (element) {
            if (element.msSourceLocation) {
                // Source location found
                return element.msSourceLocation;
            }
            element = element.parentNode;
        }
        
        // We reached an iframe or root element, so return the href
        var currentWindow = mappedNode.ele.ownerDocument.parentWindow;
        return currentWindow.location.href;
    }
};

remoteCode.initialize();

// SIG // Begin signature block
// SIG // MIIaywYJKoZIhvcNAQcCoIIavDCCGrgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFECquaMm6wR1
// SIG // 5uJnQzd6SqKWknX/oIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AABxsy6Ka4KqH04AAAAAAHEwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE1MDMyMDE3
// SIG // MzIwM1oXDTE2MDYyMDE3MzIwM1owgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpCOEVDLTMwQTQtNzE0NDEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAOqRvbKI/RRvITYoA2YzOmYI+1tLpKugKDRKQzII
// SIG // wIblyT3VJbx7PmKH1n3vD3RTo/GRY4h0f+gkzQNQxfHK
// SIG // ABZ7pTmwBhw8RH7568SygbwXI7r9ZTgZhX/KoCn99jrA
// SIG // Cy9o9OA0Tn1vF8Bumar6f2El0SZw0nR932FzXM5UKjlR
// SIG // AzMJ+FCteMeJCLbUhSo/19gfUerv/GhetcHnB2gyjS9y
// SIG // Uf4DMUdRxdLrcgevIJX42mr4d2fkYJpwTKtFy34Ir+WB
// SIG // 1FfPOswTdZ0mzaCiaVC8OoiU37BUON6JOc2GMqWQD36/
// SIG // 7cyUJaZBhmEmx903flwN6BfKN3/oJLZOtPgbI+sCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBT4/SOHBZSAVs0zpUHC
// SIG // bMwINsiyojAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAtBLTKKQtZ
// SIG // /C7qoK9MTmgE+JLtKcJmzGtwyYfovof8XfTdT6Uab3iX
// SIG // rWsFOFFBcp055Bobw21x/HC208y2kFgEKD/WHu+DsxQY
// SIG // DJUL96URE5jGhVZe7jO0DDe1gOr1EmjZLnuGCHI7FHvU
// SIG // 2dAWT8AvCx8tyuUb0K7phLCPC11zuBaBQCNYLOphqv69
// SIG // f9ONWnD8ec1mlmVjtQUSduIqOyvtgqya7CdBp5cOIxaf
// SIG // QchObVMRQATMYJnamOwrrpf74H31uosA9CUXf2J6u1FX
// SIG // wfDwzZwbYXOtlYwrdiKoq3A4tAEofWZCU96f9Ad8WjAO
// SIG // ggNZ9oSGuRUlYrAL0s/x25ZFMIIE7DCCA9SgAwIBAgIT
// SIG // MwAAAQosea7XeXumrAABAAABCjANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xNTA2
// SIG // MDQxNzQyNDVaFw0xNjA5MDQxNzQyNDVaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCS/G82u+ED
// SIG // uSjWRtGiYbqlRvtjFj4u+UfSx+ztx5mxJlF1vdrMDwYU
// SIG // EaRsGZ7AX01UieRNUNiNzaFhpXcTmhyn7Q1096dWeego
// SIG // 91PSsXpj4PWUl7fs2Uf4bD3zJYizvArFBKeOfIVIdhxh
// SIG // RqoZxHpii8HCNar7WG/FYwuTSTCBG3vff3xPtEdtX3gc
// SIG // r7b3lhNS77nRTTnlc95ITjwUqpcNOcyLUeFc0Tvwjmfq
// SIG // MGCpTVqdQ73bI7rAD9dLEJ2cTfBRooSq5JynPdaj7woY
// SIG // SKj6sU6lmA5Lv/AU8wDIsEjWW/4414kRLQW6QwJPIgCW
// SIG // Ja19NW6EaKsgGDgo/hyiELGlAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUif4K
// SIG // MeomzeZtx5GRuZSMohhhNzQwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1KzA0
// SIG // MDc5MzUwLTE2ZmEtNGM2MC1iNmJmLTlkMmIxY2QwNTk4
// SIG // NDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEApqhTkd87Af5hXQZa62bwDNj32YTTAFEOENGk0Rco
// SIG // 54wzOCvYQ8YDi3XrM5L0qeJn/QLbpR1OQ0VdG0nj4E8W
// SIG // 8H6P8IgRyoKtpPumqV/1l2DIe8S/fJtp7R+CwfHNjnhL
// SIG // YvXXDRzXUxLWllLvNb0ZjqBAk6EKpS0WnMJGdAjr2/TY
// SIG // pUk2VBIRVQOzexb7R/77aPzARVziPxJ5M6LvgsXeQBkH
// SIG // 7hXFCptZBUGp0JeegZ4DW/xK4xouBaxQRy+M+nnYHiD4
// SIG // BfspaxgU+nIEtwunmmTsEV1PRUmNKRot+9C2CVNfNJTg
// SIG // FsS56nM16Ffv4esWwxjHBrM7z2GE4rZEiZSjhjCCBbww
// SIG // ggOkoAMCAQICCmEzJhoAAAAAADEwDQYJKoZIhvcNAQEF
// SIG // BQAwXzETMBEGCgmSJomT8ixkARkWA2NvbTEZMBcGCgmS
// SIG // JomT8ixkARkWCW1pY3Jvc29mdDEtMCsGA1UEAxMkTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // MB4XDTEwMDgzMTIyMTkzMloXDTIwMDgzMTIyMjkzMlow
// SIG // eTELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWlj
// SIG // cm9zb2Z0IENvZGUgU2lnbmluZyBQQ0EwggEiMA0GCSqG
// SIG // SIb3DQEBAQUAA4IBDwAwggEKAoIBAQCycllcGTBkvx2a
// SIG // YCAgQpl2U2w+G9ZvzMvx6mv+lxYQ4N86dIMaty+gMuz/
// SIG // 3sJCTiPVcgDbNVcKicquIEn08GisTUuNpb15S3GbRwfa
// SIG // /SXfnXWIz6pzRH/XgdvzvfI2pMlcRdyvrT3gKGiXGqel
// SIG // cnNW8ReU5P01lHKg1nZfHndFg4U4FtBzWwW6Z1KNpbJp
// SIG // L9oZC/6SdCnidi9U3RQwWfjSjWL9y8lfRjFQuScT5EAw
// SIG // z3IpECgixzdOPaAyPZDNoTgGhVxOVoIoKgUyt0vXT2Pn
// SIG // 0i1i8UU956wIAPZGoZ7RW4wmU+h6qkryRs83PDietHdc
// SIG // pReejcsRj1Y8wawJXwPTAgMBAAGjggFeMIIBWjAPBgNV
// SIG // HRMBAf8EBTADAQH/MB0GA1UdDgQWBBTLEejK0rQWWAHJ
// SIG // Ny4zFha5TJoKHzALBgNVHQ8EBAMCAYYwEgYJKwYBBAGC
// SIG // NxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQU/dExTtMm
// SIG // ipXhmGA7qDFvpjy82C0wGQYJKwYBBAGCNxQCBAweCgBT
// SIG // AHUAYgBDAEEwHwYDVR0jBBgwFoAUDqyCYEBWJ5flJRP8
// SIG // KuEKU5VZ5KQwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwDQYJKoZIhvcNAQEFBQADggIBAFk5
// SIG // Pn8mRq/rb0CxMrVq6w4vbqhJ9+tfde1MOy3XQ60L/svp
// SIG // LTGjI8x8UJiAIV2sPS9MuqKoVpzjcLu4tPh5tUly9z7q
// SIG // QX/K4QwXaculnCAt+gtQxFbNLeNK0rxw56gNogOlVuC4
// SIG // iktX8pVCnPHz7+7jhh80PLhWmvBTI4UqpIIck+KUBx3y
// SIG // 4k74jKHK6BOlkU7IG9KPcpUqcW2bGvgc8FPWZ8wi/1wd
// SIG // zaKMvSeyeWNWRKJRzfnpo1hW3ZsCRUQvX/TartSCMm78
// SIG // pJUT5Otp56miLL7IKxAOZY6Z2/Wi+hImCWU4lPF6H0q7
// SIG // 0eFW6NB4lhhcyTUWX92THUmOLb6tNEQc7hAVGgBd3TVb
// SIG // Ic6YxwnuhQ6MT20OE049fClInHLR82zKwexwo1eSV32U
// SIG // jaAbSANa98+jZwp0pTbtLS8XyOZyNxL0b7E8Z4L5UrKN
// SIG // MxZlHg6K3RDeZPRvzkbU0xfpecQEtNP7LN8fip6sCvsT
// SIG // J0Ct5PnhqX9GuwdgR2VgQE6wQuxO7bN2edgKNAltHIAx
// SIG // H+IOVN3lofvlRxCtZJj/UBYufL8FIXrilUEnacOTj5XJ
// SIG // jdibIa4NXJzwoq6GaIMMai27dmsAHZat8hZ79haDJLmI
// SIG // z2qoRzEvmtzjcT3XAH5iR9HOiMm4GPoOco3Boz2vAkBq
// SIG // /2mbluIQqBC0N1AI1sM9MIIGBzCCA++gAwIBAgIKYRZo
// SIG // NAAAAAAAHDANBgkqhkiG9w0BAQUFADBfMRMwEQYKCZIm
// SIG // iZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJbWlj
// SIG // cm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9vdCBD
// SIG // ZXJ0aWZpY2F0ZSBBdXRob3JpdHkwHhcNMDcwNDAzMTI1
// SIG // MzA5WhcNMjEwNDAzMTMwMzA5WjB3MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw
// SIG // ggEKAoIBAQCfoWyx39tIkip8ay4Z4b3i48WZUSNQrc7d
// SIG // GE4kD+7Rp9FMrXQwIBHrB9VUlRVJlBtCkq6YXDAm2gBr
// SIG // 6Hu97IkHD/cOBJjwicwfyzMkh53y9GccLPx754gd6udO
// SIG // o6HBI1PKjfpFzwnQXq/QsEIEovmmbJNn1yjcRlOwhtDl
// SIG // KEYuJ6yGT1VSDOQDLPtqkJAwbofzWTCd+n7Wl7PoIZd+
// SIG // +NIT8wi3U21StEWQn0gASkdmEScpZqiX5NMGgUqi+YSn
// SIG // EUcUCYKfhO1VeP4Bmh1QCIUAEDBG7bfeI0a7xC1Un68e
// SIG // eEExd8yb3zuDk6FhArUdDbH895uyAc4iS1T/+QXDwiAL
// SIG // AgMBAAGjggGrMIIBpzAPBgNVHRMBAf8EBTADAQH/MB0G
// SIG // A1UdDgQWBBQjNPjZUkZwCu1A+3b7syuwwzWzDzALBgNV
// SIG // HQ8EBAMCAYYwEAYJKwYBBAGCNxUBBAMCAQAwgZgGA1Ud
// SIG // IwSBkDCBjYAUDqyCYEBWJ5flJRP8KuEKU5VZ5KShY6Rh
// SIG // MF8xEzARBgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJ
// SIG // k/IsZAEZFgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eYIQ
// SIG // ea0WoUqgpa1Mc1j0BxMuZTBQBgNVHR8ESTBHMEWgQ6BB
// SIG // hj9odHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
// SIG // bC9wcm9kdWN0cy9taWNyb3NvZnRyb290Y2VydC5jcmww
// SIG // VAYIKwYBBQUHAQEESDBGMEQGCCsGAQUFBzAChjhodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y3Jvc29mdFJvb3RDZXJ0LmNydDATBgNVHSUEDDAKBggr
// SIG // BgEFBQcDCDANBgkqhkiG9w0BAQUFAAOCAgEAEJeKw1wD
// SIG // RDbd6bStd9vOeVFNAbEudHFbbQwTq86+e4+4LtQSooxt
// SIG // YrhXAstOIBNQmd16QOJXu69YmhzhHQGGrLt48ovQ7DsB
// SIG // 7uK+jwoFyI1I4vBTFd1Pq5Lk541q1YDB5pTyBi+FA+mR
// SIG // KiQicPv2/OR4mS4N9wficLwYTp2OawpylbihOZxnLcVR
// SIG // DupiXD8WmIsgP+IHGjL5zDFKdjE9K3ILyOpwPf+FChPf
// SIG // wgphjvDXuBfrTot/xTUrXqO/67x9C0J71FNyIe4wyrt4
// SIG // ZVxbARcKFA7S2hSY9Ty5ZlizLS/n+YWGzFFW6J1wlGys
// SIG // OUzU9nm/qhh6YinvopspNAZ3GmLJPR5tH4LwC8csu89D
// SIG // s+X57H2146SodDW4TsVxIxImdgs8UoxxWkZDFLyzs7BN
// SIG // Z8ifQv+AeSGAnhUwZuhCEl4ayJ4iIdBD6Svpu/RIzCzU
// SIG // 2DKATCYqSCRfWupW76bemZ3KOm+9gSd0BhHudiG/m4LB
// SIG // J1S2sWo9iaF2YbRuoROmv6pH8BJv/YoybLL+31HIjCPJ
// SIG // Zr2dHYcSZAI9La9Zj7jkIeW1sMpjtHhUBdRBLlCslLCl
// SIG // eKuzoJZ1GtmShxN1Ii8yqAhuoFuMJb+g74TKIdbrHk/J
// SIG // mu5J4PcBZW+JC33Iacjmbuqnl84xKf8OxVtc2E0bodj6
// SIG // L54/LlUWa8kTo/0xggS1MIIEsQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAQosea7XeXumrAAB
// SIG // AAABCjAJBgUrDgMCGgUAoIHOMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTOJBEuptCJ
// SIG // XxDpPQFKvqPtgrWDbTBuBgorBgEEAYI3AgEMMWAwXqBE
// SIG // gEIATQBpAGMAcgBvAHMAbwBmAHQAIABWAGkAcwB1AGEA
// SIG // bAAgAFMAdAB1AGQAaQBvACAAVwBlAGIAIABUAG8AbwBs
// SIG // AHOhFoAUaHR0cDovL3d3dy5hc3AubmV0LyAwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAFrJtL8aPU3mYe3aMnmgVXmqA6/1N
// SIG // 5o+izaUolTjLXM/gqgfdeZiFk+b0AGXDO0Rg2z6y9wp9
// SIG // /V7ifWkXC+lM3PyPyyurxc1940/FeTBInJBI1DYFy9x9
// SIG // uqSPHACupd704vx/NDdpyC/ROTOdepiaO+XIr0q9U9NL
// SIG // azj2rjZF6oigy2W9//yym62UH6hYVQxWOnRlHQoiNpSX
// SIG // hvvLvmVmg564qVO4ckMGPDaeO+VkIROCEHVa4Q/haSmS
// SIG // 3Dj17V42gaUYL/T9YqrvDjNZIapBnXrRo3OlC3vcjI7S
// SIG // eK1ZEysybPP51gqQNcCBTYanOs6hZGRnaeMBUWDmqeTm
// SIG // CU+zV6GCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIB
// SIG // ATCBjjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQD
// SIG // ExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABx
// SIG // sy6Ka4KqH04AAAAAAHEwCQYFKw4DAhoFAKBdMBgGCSqG
// SIG // SIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkF
// SIG // MQ8XDTE1MDYxMzAxMzcxMlowIwYJKoZIhvcNAQkEMRYE
// SIG // FBUPy+CvxmJBSCPLVAVPlSIaLEOmMA0GCSqGSIb3DQEB
// SIG // BQUABIIBANcyeEjz6gSupe6CaUuqYFlOHdLmJYzlIkhs
// SIG // WnjDtD2QSuAhOJKCQ54aiHIRHFaS5OtJLjK6lNRzMhSJ
// SIG // tSCKQYdyQGQioF8r9/DExLrzqrISIzoXexjuutfQjTs5
// SIG // Ub7oR5W44CvOs95Vdh5hyXPixMWjXxEiPxwsZ1mk/xI7
// SIG // JUc8rJwI1GGOT8oHDLBT4hTsWxBNaV2uyiierte7OyTA
// SIG // 5G7so8ioZ+E1ZriZ7/fARHlLY/oH4F/lWiZ3WhrSAkMk
// SIG // MkyGnXFbn02C8UyA4qCsRmBf+S4PcKzyQsTAl8rs1yWj
// SIG // TjBso8wklN4djI4QFpKC1VPjNspUJmcAfIoJNnKxw3o=
// SIG // End signature block
