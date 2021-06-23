// Expected global variables:
/*global domHelper mainBrowser messageHandlers toolUI */

// Allow 'eval' for debugging code execution 
/*jshint evil: true*/

var htmlTreeHelpers;
var remoteHelpers = {
    // The queue of messages ready for sending to the VS side
    pendingMessages: [],
    
    // The map of messages ready for sending to the VS side, which is used by messages
    // that can quickly become stale and can be replaced.
    pendingMessagesMap: {},
    
    // The timeout for batching up messages to send to the VS side
    pendingTimeout: null,

    useTimeout: function remoteHelpers$useTimeout() {
/*+VWD
        return (toolUI.getBreakFlags() === 0);
-VWD*/
//+VWD
        return true;
//-VWD
    },
    
    // The communication port that is talking to the console
    port: null,
    portId: 0,
    portReady: false,
    onDetachCallback: null,
    
    // Initialization counters
    initializeDocumentMaxTries: 15,
    initializeDocumentTries: 0,
    
    // The number of elements to retrieve for GetChildren before the 'show all' link is shown
    childrenElementLimit: 200,
    
    // Current unique id, we increment this so we can uniquely identify items
    uid: 0,
    
    initialize: function remoteHelpers$initialize(portName, handshakeCallback, windowShouldHave, onDetachCallback) {
        /// <summary>
        ///     This method initializes the communication port for the remote side
        /// </summary>
        /// <param name="portName" type="String">
        ///     An identifying name to give to the port
        /// </param>    
        /// <param name="handshakeCallback" type="Function">
        ///     A function to call when the port is created successfully so that it can post 
        ///     initial information to the VS side
        /// </param>     
        /// <param name="windowShouldHave" type="String">
        ///     A property which should be defined on the window object of a page if 
        ///     BeforeScriptExecute was called.  If the window does not have this property
        ///     during DocumentComplete, execScript("void(0);"); will be called to 
        ///     cause a script engine to be created and BeforeScriptExecute to be fired.
        /// </param>
        /// <param name="onDetachCallback" type="Function" optional="true">
        ///     The function to call when the diagnostics detach from a process
        /// </param>        
        remoteHelpers.windowShouldHave = windowShouldHave;

        // Listen for the DocumentComplete event
        mainBrowser.addEventListener("DocumentComplete", remoteHelpers.onDocumentComplete);

        remoteHelpers.onDetachCallback = onDetachCallback;
        
        // Listen for the detach event
        toolUI.addEventListener("detach", remoteHelpers.onDetach);
        toolUI.addEventListener("breakpointhit", remoteHelpers.onBreak);
        
        remoteHelpers.portId++;
        remoteHelpers.port = toolUI.createPort(portName + remoteHelpers.portId);
        if (remoteHelpers.port) {
            remoteHelpers.port.addEventListener("message", remoteHelpers.processMessages);
            toolUI.connect(remoteHelpers.port);
            handshakeCallback();
        }
        remoteHelpers.handshakeCallback = handshakeCallback;
    },

    initializeScriptEngines: function remoteHelpers$initializeScriptEngines(window) {
        /// <summary>
        ///    This method is called on initial attach and runs "void(0);" on each 
        ///    window in the page recursively to make sure they have a script engine 
        ///    available for use. This is necessary so that our tooling can work 
        ///    against pages with no script and therefore no engine for us to talk
        ///    to.
        /// </summary>
        /// <param name="window" type="Object">
        ///     The window to start initializing engines from.
        /// </param>

        if (window) {
            // Ideally, we'd only call execScript in cases where no script had been executed.  Since
            // there's not a straightforward way of checking that, instead check the document for 
            // script blocks.  This will still result in some unnecessary execScript's, but will 
            // ensure that we do in fact call it in all necessary situations.  
            if (window.document && window.document.scripts && window.document.scripts.length === 0) {
                window.execScript("void(0);");
            }

            // Use recursion to ensure we have a script engine for each page
            if (window.frames) {
                for (var i = 0; i < window.frames.length; i++) {
                    var frame = window.frames[i];
                    if (frame) {
                        var iframe = domHelper.getCrossSiteWindow(window, frame);
                        remoteHelpers.initializeScriptEngines(iframe);
                    }
                }        
            }
        }
    },

    onDocumentComplete: function remoteHelpers$onDocumentComplete(dispatchWindow) {
        /// <summary>
        ///     This method is called whenever the page is ready.  Most of the time 
        ///     we rely on onBeforeScriptExecute, but on pages without script we don't 
        ///     receive that event.
        /// </summary>   
        /// <param name="dispatchWindow" type="Object">
        ///     The IDispatch window that triggered the DocumentComplete event
        /// </param>
        if (remoteHelpers.windowShouldHave) {
            // Grab the document - IWebBrowser2 uses "Document" while 
            // IWebApplicationHost actually passes us the window which uses "document".
            var doc = null;
            if (dispatchWindow) {
                if (dispatchWindow.document) {
                    doc = dispatchWindow.document;
                } else if (dispatchWindow.Document) { 
                    doc = dispatchWindow.Document;
                }

                // No need to do anything if BeforeScriptExecute was fired                
                if (!doc || doc.parentWindow[remoteHelpers.windowShouldHave]) {
                    return;
                }
            
                try {
                    doc.parentWindow.execScript("void(0);");
                } catch (ex) {
                    // Ignore this document complete if the window is invalid.
                }
            }
        }
    },
    
    onDetach: function remoteHelpers$onDetach() {
        /// <summary>
        ///     This method is called when debugging is detached, so we can perform clean up
        /// </summary>
        
        remoteHelpers.uid = 0;
        remoteHelpers.pendingMessages = [];
        remoteHelpers.pendingMessagesMap = {};
        remoteHelpers.pendingTimeout = null;
        
        htmlTreeHelpers.reset();
        
        if (remoteHelpers.onDetachCallback) {
            remoteHelpers.onDetachCallback();
        }
    },    

    onBreak: function remoteHelpers$onBreak() {
        // If we've hit a breakpoint, our 'setTimeouts' from this chain of execution won't be processed until after
        // we resume or finish executing the current event, so post messages now to make sure they make it over
        // to VS.  This means, for instance, we'll post over messages that occur when the page logs and the user
        // hits F10 (step over).
        remoteHelpers.postAllMessages();
    },
    
    getUid: function remoteHelpers$getUid() {
        /// <summary>
        ///     Get a unique identifier that can be used in the remote script
        /// </summary>
        /// <returns type="String">
        ///     The unique id
        /// </returns>
        
        // Convert the 'uid' into a string using radix 36 (0-9, a-z)
        return "uid" + (remoteHelpers.uid++).toString(36);    
    },    

    processMessages: function remoteHelpers$processMessages(msg) {
        /// <summary>
        ///     This method is called back when the VS console has posted a message to the remote side
        /// </summary>
        /// <param name="msg" type="String">
        ///     The message string that was sent.
        ///     This function expects the string to be in the form of a JSON stringified object with the following format:
        ///     { type: int, id: "string", data: { object } };
        /// </param>

        if (msg.data === "InitializeDocument") {
            remoteHelpers.handshakeCallback();
            return;
        }
        
        var createVSPostFunction = function remoteHelpers$processMessages$createVSPostFunction(uid) {
            // If this function is used on this remote side it will post over to the VS side
            return function remoteHelpers$processMessages$createVSPostFunction$createdFunction(arg, hash) {
                remoteHelpers.postObject({
                    uid: uid,
                    args: [arg]
                }, hash, true);
            };
        };
        
        var messages = JSON.parse(msg.data);
        
        for (var i = 0; i < messages.length; i++) {
            var obj = messages[i];
            
            // Check that our generic handler has a corresponding function for this message
            if (messageHandlers[obj.command]) {
            
                // Check the arguments for any callback functions
                var args = obj.args;
                for (var j = 0; j < args.length; j++) {
                    if (args[j] && args[j].type === "callback") {
                        // This argument is a callback function on the VS side, so we need to wrap it into
                        // a function that we can use on this remote side (which will just post the result to the VS side).
                        args[j] = createVSPostFunction(args[j].uid);
                    }
                }

                // Call the method that the VS side requested with the arguments that were passed in
                var returnValue = messageHandlers[obj.command].apply(this, args);
                
                // Post the return result back to the VS side
                remoteHelpers.postObject({
                    uid: obj.uid,
                    args: (returnValue !== undefined ? [returnValue] : undefined)
                });
            }
        }
    },
    
    postObject: function remoteHelpers$postObject(obj, hash, isFromCallBack) {
        /// <summary>
        ///     This method packages up an object ready to be sent to the VS side code
        ///     It uses a 2 queues to batch up postmessages instead of sending every message instantly to improve performance
        ///     by not sending redundant messages that may quickly get out of date
        /// </summary>
        /// <param name="obj" type="Object">
        ///     The message object to send to the VS side
        /// </param>        
        /// <param name="hash" type="String" optional="true">
        ///     Optional string that specifies an id used in the mapped queue
        ///     Any message already in the map with the same hash will be overwritten with this new obj value
        ///     This is used for messages that are not critical and can quickly become stale so we only send the freshest one
        /// </param>
        /// <param name="isFromCallBack" type="Boolean" optional="true">
        ///     Optional parameter that specifies if the posting is being done from a callback,
        ///     True if the post is called from a callback function which will apply a 50ms batch timer, False if the post
        ///     is called as a return from a remote function call, which will avoid the batch timer.    
        /// </param>

        // If it contains a hash then it can be superceded by a later message
        if (hash) {
            // Replace any existing message with the new object
            remoteHelpers.pendingMessagesMap[hash] = obj;
        } else {
            // Just add this message to our queue
            remoteHelpers.pendingMessages.push(obj);
        }

        // If we don't have a pending timeout to dispatch the queued up messages, create it now
        if (remoteHelpers.useTimeout() && isFromCallBack) {
            if (!remoteHelpers.pendingTimeout) {
//                remoteHelpers.pendingTimeout = mainBrowser.setTimeout(remoteHelpers.postAllMessages, 50);
		remoteHelpers.pendingTimeout = mainBrowser.document.parentWindow.setTimeout(remoteHelpers.postAllMessages, 50);
            }
        } else {
            // Call the post directly
            remoteHelpers.postAllMessages();
        }
    },
    
    postAllMessages: function remoteHelpers$postAllMessages() {
        /// <summary>
        ///     Sends all queued messages to the VS side
        /// </summary>
        
        // Add all the messages in our dictionary to our pending messages.
        for (var key in remoteHelpers.pendingMessagesMap) {
            remoteHelpers.pendingMessages.push(remoteHelpers.pendingMessagesMap[key]);
        }
        
        // Only send messages if we have some
        if (remoteHelpers.pendingMessages.length > 0) {
            // Generate the message that we will post
            var messageString = JSON.stringify(remoteHelpers.pendingMessages);
            
            // Clear the message queues
            remoteHelpers.pendingMessages = [];
            remoteHelpers.pendingMessagesMap = {};
            remoteHelpers.pendingTimeout = null;
            
            // Send the message to the VS side
            remoteHelpers.port.postMessage(messageString);
    }
    }
};

htmlTreeHelpers = {
    // Max text length of 'inlined' text elements before they need to be expanded to show the text element child
    maxInlineLength: 70,
      
    // Maps uid's to DOM elements
    mapping: {},
    
    // CSS Class that the DOM Explorer ignores (for things like overlays and highlights)
    ignoreStyleClass: "BPT-DomExplorer-Ignore",

//+VWD
    annotationKey: "__id",
    dynamicKey: "vwd-js-key",

    // Returns true if the given attribute name should be ignored by the DOM explorer
    ignoreAttributeName: function (attrName) {
        if (attrName == htmlTreeHelpers.annotationKey || 
            attrName == htmlTreeHelpers.dynamicKey) {
            return true;
        }
        return false;
    },

    isDynamic: function (elem) {
        if (elem &&
            elem.getAttribute &&
            elem.getAttribute(htmlTreeHelpers.dynamicKey) != null) {
            return true;
        }

        return false;
    },

    filterStylesheet: function (styleSheet) {
        // Remove mapping id.
        return styleSheet.replace(/__id:\s+[0-9]+;/g, "");        
    },
//-VWD
    reset: function htmlTreeHelpers$reset() {
        /// <summary>
        ///     Reset settings back to their original values
        /// </summary>  

        // Remove any existing event handlers
        for (var uid in htmlTreeHelpers.mapping) {
            htmlTreeHelpers.deleteMappedNode(uid);
        }

        htmlTreeHelpers.mapping = {};
    },
    
    createMappedNode: function htmlTreeHelpers$createMappedNode(element, showEmptyTextElements) {
        /// <summary>
        ///     Constructs a js object we can serialize and send over to the VS side
        /// </summary>
        /// <param name="element" type="Object">
        ///     The javascript string that is to be evaled on the associated script engine
        /// </param>
        /// <param name="showEmptyTextElements" type="Boolean" optional="true">
        ///     Optional parameter that specifies if we should map empty text nodes
        /// </param>
        /// <returns type="Object">
        ///     The constructed javscript object that is ready to be stringified and sent over to VS
        /// </returns>
       
        // Shortcut empty text elements because we never show them in the DOM
        if (!element.tagName && (typeof element.textContent === "string") && !element.textContent.replace(/^\s+|\s+$/g, "") && !showEmptyTextElements) {
            // We return null because this node should never be shown in the UI, so there is no need to map it
            return null;
        }
            
        // Create the uid for this element
        var uidString = remoteHelpers.getUid();
        var obj, isIframeElement;
        
        // Document elements must be special cased
        if (element.nodeType === element.DOCUMENT_NODE || element.nodeType === element.DOCUMENT_FRAGMENT_NODE) {

            // Create the viewable object
            obj = {
                uid: uidString,
                tag: "#document",
                hasChildren: true,
                text: null,
                rootTag: element.nodeName
            };
        } else {
        
            // Create a normal node
            if (element.tagName) {
                // This is a non-text node
                var textContent = null;
                var hasChildren = (element.childNodes.length > 0);
                     
                if (element.nodeName === "STYLE") {
                    // Style nodes should use the styleSheet as a child
                    hasChildren = true;
//+VWD
                    var text = htmlTreeHelpers.filterStylesheet(element.styleSheet ? element.styleSheet.cssText : element.textContent);
//-VWD                    
                    if (!text.replace(/^\s+|\s+$/g, "")) {
                        hasChildren = false;
                    } else if (!text.match(/\n/g) && text.length < htmlTreeHelpers.maxInlineLength) {

                        hasChildren = false;
                        textContent = text;
                    }
                    
                } else if (element.childNodes.length === 1) {
                    // Since we only have a single child element, we need to process it further
                    var child = element.childNodes[0];
                    
                    // Check to see if it is a text node
                    if (!child.tagName && child.textContent) {

                        // Remove white space and see if it is an empty text node, which we never display
                        if (!child.textContent.replace(/^\s+|\s+$/g, "")) {
                            hasChildren = false;
                        } else if (!child.textContent.match(/\n/g) && child.textContent.length < htmlTreeHelpers.maxInlineLength) {
                            hasChildren = false;
                            textContent = child.textContent;
                        }
                        
                    }
                }
               
                // Check to see if this is an IFRAME element
                if (element.tagName === "IFRAME") {
                    isIframeElement = true;
                    hasChildren = true; // IFRAME elements always have a document child
                }

                // Non-text nodes need to have attributes
                var attributes = [];
                if (element.attributes) {
                    // Create a name/value pair for each attribute and add it to the array
                    for (var i = 0; i < element.attributes.length; i++) {
//+VWD
                        if (htmlTreeHelpers.ignoreAttributeName(element.attributes[i].name)) {
                            continue;
                        }
//-VWD
                        attributes.push({
                            name: element.attributes[i].name,
                            value: element.attributes[i].value
                        });
                    }
                }
                
                // Create the viewable object
                obj = {
                    uid: uidString,
                    tag: element.tagName.toLowerCase(),
                    hasChildren: hasChildren,
                    text: textContent,
                    attributes: attributes,
//+VWD
                    isDynamic: htmlTreeHelpers.isDynamic(element)
//-VWD
                };
                
            } else {
                // This is a text node
                
                // Check for comment nodes
                var tagName = null;

/*+VWD
                var elementText = element.textContent;
-VWD*/
//+VWD
                var elementText = "";

                // Needed for IE conditional comments.
                try {
                    elementText = element.textContent;
                }
                catch(e) {
                }
//-VWD                
                if (element.nodeType === element.DOCUMENT_TYPE_NODE) {
                    tagName = "#doctype";
                    
                    // Build the DOCTYPE text
                    var docTypeText = "<!DOCTYPE " + element.nodeName;
                    if (element.publicId) {
                        docTypeText += " PUBLIC \"" + element.publicId + "\"";
                        if (element.systemId) {
                            docTypeText += " \"" + element.systemId + "\"";
                        }
                    } else if (element.systemId) {
                        docTypeText += " SYSTEM \"" + element.systemId + "\"";
                    }
                    if (element.internalSubset) {
                        docTypeText += " [" + element.internalSubset + "]";
                    }
                    docTypeText += ">";
                    elementText = docTypeText;
                    
                } else if (element.nodeType === element.COMMENT_NODE) {
                    tagName = "#comment";
                }
                
                // Create the viewable object
                obj = {
                    uid: uidString,
                    tag: tagName,
                    hasChildren: false,
                    text: elementText,
                    parentUid: element.parentNode.uniqueID // Text nodes need to remember their parent
                };
            }
        }
        
        
        // Store this element in the map
        htmlTreeHelpers.mapping[uidString] = {
            ele: element,
            isIframeElement: isIframeElement,
            mapped: obj
        };
        
        // Check to see if this need special value handling
        if (htmlTreeHelpers.hasSpecialValueAttribute(element)) {
            htmlTreeHelpers.mapping[uidString].hasValueAttribute = element.hasAttribute("value");
        }
        
        // Return the created object
        return obj;
    },
    
    getChildrenForMappedNode: function htmlTreeHelpers$getChildrenForMappedNode(uid, showEmptyTextElements) {
        /// <summary>
        ///     Get all the child elements from a particular mapped DOM element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The mapped unique id of the DOM element we want to get the children of
        /// </param>    
        /// <param name="showEmptyTextElements" type="Boolean" optional="true">
        ///     Optional parameter that specifies if we should map empty text nodes
        /// </param>        
        /// <returns type="Array">
        ///     An array of mapped nodes that represent the children of the DOM element
        /// </returns> 
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return;
        }
        
        // Style nodes should emulate a text node child
        if (mappedNode.ele.nodeName === "STYLE") {
            return [{
                uid: "style" + uid,
                parentUid: uid,
                tag: null,
                hasChildren: false,
//+VWD
                text: htmlTreeHelpers.filterStylesheet(mappedNode.ele.styleSheet ? mappedNode.ele.styleSheet.cssText : mappedNode.ele.textContent)
//-VWD                    
            }];
        }

        // Get the actual element
        var element = (mappedNode.isIframeElement ? htmlTreeHelpers.getIframeRootForMappedNode(uid) : mappedNode.ele);
        var childNodes = (mappedNode.listType ? element : element.childNodes);

        var newlyMappedChildren = [];
        for (var i = 0; i < childNodes.length; i++) {
            // Ignore the hover class
            if (childNodes[i].className && 
                (typeof childNodes[i].className === "string") && 
                childNodes[i].className.indexOf(htmlTreeHelpers.ignoreStyleClass) !== -1) { 
                continue;
            }
            
            // Create the mapped child node
            var mappedChild = htmlTreeHelpers.createMappedNode(childNodes[i], showEmptyTextElements);
            if (mappedChild) {
                newlyMappedChildren.push(mappedChild);
            }
        }

        mappedNode.isLimited = (newlyMappedChildren.length > remoteHelpers.childrenElementLimit);

        // If we have gotten the children before, we need to go through it and remove the old mutation events
        if (mappedNode.childrenNodes) {
            for (var j = 0; j < mappedNode.childrenNodes.length; j++) {
                htmlTreeHelpers.deleteMappedNode(mappedNode.childrenNodes[j].uid);
            }
        }
        
        // Store the children in the mapping for this DOM element
        mappedNode.childrenNodes = newlyMappedChildren;
        
        // Since we have requested the children, the node is expanded
        mappedNode.isExpanded = true;
        
        // Return the children array
        return newlyMappedChildren;    
    },
    
    deleteMappedNode: function htmlTreeHelpers$deleteMappedNode(uid, onlyChildren) {
        /// <summary>
        ///     Detaches any DOM Manipulation events and removes it from the mapping (along with any children nodes)
        /// </summary>
        /// <param name="uid" type="String">
        ///     The unique identifier of the DOM element to delete
        /// </param>
        /// <param name="onlyChildren" type="Boolean" optional="true">
        ///     Optional parameter that specifies if we should only remove the children, and not the element itself
        /// </param>
        
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (mappedNode) {

            // Remove the children
            if (mappedNode.childrenNodes) {
                for (var i = 0; i < mappedNode.childrenNodes.length; i++) {
                    htmlTreeHelpers.deleteMappedNode(mappedNode.childrenNodes[i].uid, false);
                }
                mappedNode.childrenNodes = null;
            }
            
            // Remove the node itself
            if (!onlyChildren) {
                try {
                    // Remove the onPropertyChange event listeners
                    if (mappedNode.onValueModified) {
                        mappedNode.ele.detachEvent("onpropertychange", mappedNode.onValueModified);
                    }
                } catch (ex) {
                    // This will fail if we are trying to remove event listeners from the previous page after a navigate
                    // So fail gracefully.
                }
                delete htmlTreeHelpers.mapping[uid];
            } else {
                mappedNode.isExpanded = false;
            }
        }
    },
    
    getIframeRootForMappedNode: function htmlTreeHelpers$getIframeRootForMappedNode(uid) {
        /// <summary>
        ///     Gets a cross domain safe iframe document from a mapped DOM element
        /// </summary>
        /// <param name="uid" type="String">
        ///     The unique identifier of the DOM element to get the iframe root for
        /// </param>
        /// <returns type="Object">
        ///     The iframe document element or null if there isn't one
        /// </returns> 
        
        // Ensure we have already mapped the requested DOM element
        var mappedNode = htmlTreeHelpers.mapping[uid];
        if (!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
            return null;
        }
        
        if (mappedNode.iframeRoot) {
            // Return the stored iframe root
            return mappedNode.iframeRoot;
        }
        
        // Check to see if this is an IFRAME element
        if (mappedNode.ele.tagName === "IFRAME") {
            var element = mappedNode.ele;
            var currentWindow = element.parentNode.ownerDocument.parentWindow;
            var iframe = domHelper.getCrossSiteWindow(currentWindow, element.contentWindow);
            mappedNode.iframeRoot = iframe.document;
            
            return mappedNode.iframeRoot;
        }
        
        // Not an iframe
        return null;
    },
    
    hasSpecialValueAttribute: function htmlTreeHelpers$hasSpecialValueAttribute(element) {
        /// <summary>
        ///     Gets whether the element uses the value attribute differently to other attributes
        /// </summary>
        /// <param name="element" type="Object">
        ///     The DOM element to check
        /// </param>
        /// <returns type="Boolean">
        ///     True if the element requires special value attribute handling, False otherwise
        /// </returns> 
        
        switch (element.nodeName) {
            case "INPUT":
            case "FORM":
            case "SELECT":
            case "OPTION":
            case "TEXTAREA":
            return true;
        }
        
        return false;
    },

    isElementAccessible: function htmlTreeHelpers$isElementAccessible(element) {
        /// <summary>
        ///     Gets whether the element throws an exception when attempting to access it
        /// </summary>
        /// <param name="element" type="Object">
        ///     The DOM element to check
        /// </param>
        /// <returns type="Boolean">
        ///     True if the element does not throw an exception, False otherwise
        /// </returns> 
        
        var elementType = null;
        var elementName = null;
        try {
            elementName = element.nodeName;
            elementType = (typeof element);
        } catch (ex) {
            // An exception is caused by the page already having navigated away, so return false
            return false;
        }

        return (elementType === "object");
    }
};

function onErrorHandler (message, file, line) {
    /// <summary>
    ///     Handles JavaScript errors in the remote code by reporting them as non-fatal errors
    /// </summary>
    /// <param name="message" type="String">
    ///     The error message
    /// </param>
    /// <param name="file" type="String">
    ///     The file in which the error occurred
    /// </param>    
    /// <param name="line" type="Number">
    ///     The line on which the error occurred
    /// </param>
    /// <returns type="Boolean">
    ///     Returns true to mark the error as handled, False to display the default error dialog
    /// </returns>

    if (remoteHelpers && remoteHelpers.port) {
        // The maximum callstack size to collect
        var maxStackSize = 10;

        var getArgumentString = function (argument) {
            /// <summary>
            ///     Gets a string representing the value of the passed in argument.
            ///     This supliments the built in typeof function by calculating the type of certain objects such as
            ///     array, date, and regex
            /// </summary>    
            /// <param name="argument" type="Object">
            ///     The argument to get the value of
            /// </param>
            /// <returns type="String">
            ///     A string representing the value of this argument
            /// </returns>            
            /// <disable>JS3053.IncorrectNumberOfArguments,JS2005.UseShortFormInitializations</disable>
            var type = (typeof argument);

            // Check for undefined
            if (argument === undefined) {
                type = "undefined";
            } else {
                // Check for object type
                if (type === "object") {
                    if (argument) {
                        if (typeof argument.length === "number" && typeof argument.propertyIsEnumerable === "function" && !(argument.propertyIsEnumerable("length")) && typeof argument.splice === "function") {
                            type = "array";
                        }
                        try {
                            if (argument.constructor === (new Array()).constructor) {
                                type = "array";
                            } else if (argument.constructor === (new Date()).constructor) {
                                type = "date";
                            } else if (argument.constructor === (new RegExp()).constructor) {
                                type = "regex";
                            }
                        } catch (e) {
                            // This object is not accessible
                        }
                    } else {
                        type = "null";
                    }
                    type = "object";
                }
            }
            
            switch (type) {
                case "boolean":
                    return argument;

                case "date":
                    return "[date] " + argument;

                case "function":
                    return "" + argument;

                case "null":
                    return "null";

                case "number":
                    return argument;

                case "regex":
                    return "[regex] " + argument;

                case "string":
                    return "\"" + argument + "\"";

                case "undefined":
                    return "undefined";
                    
                case "htmlElement":
                // FALLTHROUGH
                case "array":
                // FALLTHROUGH
                case "object":
                    return JSON.stringify(argument);
            }

        };
    
        // Generate the callstack information
        var callstack = [];
        try {
            var currentFunction = arguments.callee;
            var functionText, functionName, match, args, stringifiedArgs;
            
            // Loop up the caller chain
            while (currentFunction && callstack.length < maxStackSize) {
                
                // Set default values
                functionName = "unknown";
                stringifiedArgs = [];
                
                try {
                    // Get the function name
                    functionText = currentFunction.toString() || "";
                    match = functionText.match(/function\s*([\w\-$]+)?\s*\(/i);
                    functionName = (match.length >= 2 ? match[1] || "anonymous" : "anonymous");

                    // Get the arguments
                    if (currentFunction["arguments"]) {
                        args = currentFunction["arguments"];
                        for (var i = 0; i < args.length; i++) {
                            stringifiedArgs.push(getArgumentString(args[i]));
                        }
                    }                       
                } catch (ex) {
                    // Fail gracefully
                }
                
                // Add this info to the callstack
                callstack.push(functionName + " (" + stringifiedArgs.join(", ") + ")");
                
                // Walk up the stack
                currentFunction = currentFunction.caller;
            }
        } catch (ex2) {
            // Fail gracefully
        }
        
        // Populate the additional information
        var info = [];
        try {
            info.push("Callstack:\r\n" + callstack.join("\r\n"));
            info.push("BreakFlags: " + toolUI.getBreakFlags());
            info.push("TicksSinceLastRefresh: " + toolUI.getTicksSinceLastRefresh());
            info.push("Url: " + mainBrowser.document.parentWindow.location.href);
        } catch (ex3) {
            // Fail gracefully
        }

        // Generate the message that we will post
        var errorObject = [{uid:"scriptError", args:[{message: message, file: file, line: line, additionalInfo: info.join("\r\n\r\n")}]}];
        var messageString = JSON.stringify(errorObject);
        
        // Send the message to the VS side
        remoteHelpers.port.postMessage(messageString);
            
        return true;
    }
    
    return false;
}

// Attach the script error handler
toolUI.addEventListener("scripterror", onErrorHandler);

// Detach the script error handler when we have been detached from the 'debuggee'
toolUI.addEventListener("detach", function remoteHelpers$toolUI$detachHandler() {
    toolUI.removeEventListener("scripterror", onErrorHandler);
});

// Initialize the script engines on all frames in case a frame doesn't have
// any script.
if (mainBrowser && mainBrowser.document && mainBrowser.document.parentWindow){
    remoteHelpers.initializeScriptEngines(mainBrowser.document.parentWindow);
}

// SIG // Begin signature block
// SIG // MIIaywYJKoZIhvcNAQcCoIIavDCCGrgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFFJG4zba+c6H
// SIG // jvwjcM10avT7mgy8oIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AABvZS1YbQcRRigAAAAAAG8wDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE1MDMyMDE3
// SIG // MzIwMloXDTE2MDYyMDE3MzIwMlowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpDMEY0LTMwODYtREVGODEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAM/mbc3BKs2uqF7YlU8tA0NHczu4QtLQV5rd9lM2
// SIG // d9WIRSRqyKvQZumLxaoPnvKDRrYqydg2xvSg/xFvZvBe
// SIG // FBmysWf48V6UhqqOJa/4NRP9gi/HOF5TwHYcxdN5O7Bj
// SIG // 60+TmgXwohdx3MYMltMABS5MbVizf7QsJHB7lmksbIp4
// SIG // CW1JmY46PmaVj09/eBtge1fJUfRLbVHDNLf4OgrWEd/D
// SIG // OqUeoDjc662q+EPEg5qNlzQDNAQa761UNqTUGiz9w27w
// SIG // eOcp8blEwHG0L8QQiwz3NmJ5/QdXfeoFfEyfTjA/J1A4
// SIG // Zga7Xag+xZDb3zx2Vq2VIDRTcu1pWW7wVB9A1TkCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBTypkkpeHxXcFJiz+2s
// SIG // t3sgNEfc/TAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQCNs0y22OwN
// SIG // h4YZXuQA55e41c9MCjy991XT9PCgr1VynCOXuYIqxxYK
// SIG // xScTWdDaMCuIQrpSA+ZeySVoJyeNZKdt+beaaqs+rELQ
// SIG // HiQmzFSv9pCBax6tQ58bexBXajI2MaJEaAGYWisStIkx
// SIG // 9kwMrhU8tyQkXbv/fFNMhMQNzUZ3finKn7JGYoK0NMf1
// SIG // EmlcrXnNMe7pR474/FPz5AKQUWvO+p3jhb9ZgFkQ1Wej
// SIG // TKby5KC02ME6oWpIpojOcPapnN7zU5M9cHEA/77rfPz/
// SIG // CGMPS1FZqxUZkHQe/7u9qjWbPZ7zEBTVevYf1uJ185J0
// SIG // Da0W2RLPoZut0hLqADsjFQzPMIIE7DCCA9SgAwIBAgIT
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBQcON0iDriv
// SIG // QuudspmNMt983SAerTBuBgorBgEEAYI3AgEMMWAwXqBE
// SIG // gEIATQBpAGMAcgBvAHMAbwBmAHQAIABWAGkAcwB1AGEA
// SIG // bAAgAFMAdAB1AGQAaQBvACAAVwBlAGIAIABUAG8AbwBs
// SIG // AHOhFoAUaHR0cDovL3d3dy5hc3AubmV0LyAwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAhEPq9PzZZXY4sykpxCcwkimzXUKi
// SIG // ooBBYs9sEeRUsMKd+IUXTKImj0SVINn/0KyLp99YvjPG
// SIG // vjZ10UGXBLbScJKr1P0EOX4GgdfMKQsEkc7bWgI4cDaa
// SIG // r7iG9c9CtsF3mnIvw53wOeRbT4IvTgAtL2uCwrLfM4EF
// SIG // 94eV4a+6CTddCZNojeGXfyqthvzzFT3Ew8EBhM/Bl/86
// SIG // QexYLQeuHrea2NkH0C+6V/1n8ZMveQcQgYgMLB5EGGSE
// SIG // qJ6j0zdGHcc4J2NNu/3pUe9sxXCF2EvouEKsoPaLjGqM
// SIG // Br2UaLvnXajT923p4ZI4R5n5VpOVi4VmG+rfNpYOUTxJ
// SIG // tlKM3KGCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIB
// SIG // ATCBjjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQD
// SIG // ExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABv
// SIG // ZS1YbQcRRigAAAAAAG8wCQYFKw4DAhoFAKBdMBgGCSqG
// SIG // SIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkF
// SIG // MQ8XDTE1MDYxMzAxMzcxMlowIwYJKoZIhvcNAQkEMRYE
// SIG // FK5xo/MHzb7bjHDzOkwlhafcynk6MA0GCSqGSIb3DQEB
// SIG // BQUABIIBAFR3knGz0enUHGQGUGYbvuNqP/8JLAZTkqd8
// SIG // Pk8Kcn7MDRejC78qOGdekaRx8+PZBuOMwlVFWvn2HmLo
// SIG // R8eMQqkC3JCEiiXo4fe8M+rvWvfa5S6Qj5YAGA4Euj81
// SIG // m43Zm4VFdh26MTwGZGUlKZV/nTyVz0qc/yXtnieIGxdF
// SIG // v/Eqvt1qu2UHQrgHHcuvSHyKAhV5u4i3cxR1VqdB8EyY
// SIG // Mm0vWACOEdkUla3F686LErxnd+onGnurA5kRgDWJB0Fz
// SIG // MRHwwLV4Ll3kUIR8DWT9FYVv7gD1BVSqlIPJUSPVRLzq
// SIG // KjP+qODoHqkpltS+9wd+9ssUZUi5JccJny7v/Vm9OEE=
// SIG // End signature block
