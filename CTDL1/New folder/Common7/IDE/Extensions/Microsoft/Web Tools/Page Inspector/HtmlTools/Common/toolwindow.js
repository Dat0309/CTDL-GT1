// Expected global variables:
/*global $ clipboardData*/

var toolwindowHelpers = {
    
    // A set of types used in the console for different output items
    codeMarkers: {
        perfBrowserTools_DiagnosticsToolWindowsConsoleReady: 23609,
        perfBrowserTools_DiagnosticsToolWindowsDomExplorerReady: 23610,
        perfBrowserTools_DiagnosticsToolWindowsExpandConsoleObjectBegin: 23611,
        perfBrowserTools_DiagnosticsToolWindowsExpandConsoleObjectEnd: 23612,
        perfBrowserTools_DiagnosticsToolWindowsExpandConsoleObjectInteractive: 23613,
        perfBrowserTools_DiagnosticsToolWindowsConsoleEvalBegin: 23614,
        perfBrowserTools_DiagnosticsToolWindowsConsoleEvalEnd: 23615,
        perfBrowserTools_DiagnosticsToolWindowsDataTreeToggleBegin: 23616,
        perfBrowserTools_DiagnosticsToolWindowsDataTreeToggleEnd: 23617,
        perfBrowserTools_DiagnosticsToolWindowsTreeViewToggleBegin: 23618,
        perfBrowserTools_DiagnosticsToolWindowsTreeViewToggleEnd: 23619,
        perfBrowserTools_DiagnosticsToolWindowsDomExplorerRefreshBegin: 23620,
        perfBrowserTools_DiagnosticsToolWindowsDomExplorerRefreshEnd: 23621,
        perfBrowserTools_DiagnosticsToolWindowsDomExplorerAttributeChanged: 23622,
        perfBrowserTools_DiagnosticsToolWindowsDomExplorerTabChanged: 23623
    },
    
    // Number of times to re-send a break mode evaluation message
    maxBreakModeRetries: 5,
    
    // The VSBridge apis
    externalApis: null,
    
    // Communication callbacks
    onMessageCallback: null,
    onAttachCallback: null,
    onDetachCallback: null,
    
    // The current unique id used for identifying callbacks
    uid: 0,
    
    // The communication port that is talking to the remote script engine
    remotePort: null,
    
    // A queue of messages waiting to be sent to the remote side for processing
    pendingMessages: [],
    
    // The current timeout used for batching messages to the remote side
    pendingTimeout: null,
    
    // Queued callbacks waiting to be executed
    callbacks: {},
    
    // Should we be firing code markers to the VSBridge
    areCodeMarkersEnabled: false,
    
    // The state of the program in the debugger
    atBreakpoint: false,

    // Whether we should use VS Evaluation to send messages while at a breakpoint
    useBreakpointEval : false,
    
    initializeToolWindow: function (externalApis, useBreakpointEval, onMessageCallback, onAttachCallback, onDetachCallback, onShowCallback, onBreakCallback, onRunCallback) {
        /// <summary>
        ///     Initializes common functionality of the tool windows
        ///     This includes adding event handlers and styling for buttons and togglebuttons, and
        ///     adding common keyboard navigation functionality
        /// </summary>
        /// <param name="externalApis" type="Object">
        ///     The window.external object that will be used to set up the communication channel
        /// </param>
        /// <param name="onMessageCallback" type="Function">
        ///     The function to call when a message returns from the remote side
        /// </param>
        /// <param name="onAttachCallback" type="Function">
        ///     The function to call when the diagnostics attach to a process
        /// </param>
        /// <param name="onDetachCallback" type="Function">
        ///     The function to call when the diagnostics detach from a process
        /// </param>
        /// <param name="onShowCallback" type="Function" optional="true">
        ///     The function to call when the toolwindow is shown
        /// </param>
        /// <param name="onBreakCallback" type="Function" optional="true">
        ///     The function to call when the debugger goes into break mode
        /// </param>
        /// <param name="onRunCallback" type="Function" optional="true">
        ///     The function to call when the debugger resumes from break mode
        /// </param>
        
        toolwindowHelpers.externalApis = externalApis;
        toolwindowHelpers.useBreakpointEval = useBreakpointEval;
        toolwindowHelpers.onMessageCallback = onMessageCallback;
        toolwindowHelpers.onAttachCallback = onAttachCallback;
        toolwindowHelpers.onDetachCallback = onDetachCallback;
        toolwindowHelpers.onShowCallback = onShowCallback;
        toolwindowHelpers.onBreakCallback = onBreakCallback;
        toolwindowHelpers.onRunCallback = onRunCallback;
        
        // Add the handler that will activate our tool window in VS
        document.addEventListener("mousedown", function () { 
/*+VWD
            externalApis.vsBridge.notifyOnBrowserActivate(); 
-VWD*/
            externalApis.resources.notifyOnBrowserActivate();  
            $(document.body).removeClass("showFocus");
        }, true);
        
        // Prevent the default context menu
        $(document).bind("contextmenu", function () { 
            return false; 
        });
        
        // Prevent the default F5 refresh and shift F10 WPF context menu (the jquery 'contextmenu' event will fire when desired)
        $(document).bind("keydown", function (event) { 
            if (event.keyCode === 116 ||                    
                (event.keyCode === 121 && event.shiftKey)) { // F5(116) and F10(121)
                event.preventDefault();
                event.stopPropagation();
                return false;
            } else if (event.keyCode === 9) { // Tab(9)
                $(document.body).addClass("showFocus");
            }
        });

        // Create focus handlers for css changes
        var focusOut = function () {
            $(document.body).addClass("BPT-ToolWindow-NoFocus");
        };
        var focusIn = function () {
            $(document.body).removeClass("BPT-ToolWindow-NoFocus");
        };
//      if (externalApis.vsBridge.getIsToolWindowActive()) {
        if (externalApis.resources.getIsToolWindowActive()) {
            focusIn(); // Default to focused
        } else {
            focusOut(); // Default to no focus
        }
        
        // Add the focus handlers
/*+VWD
        externalApis.vsBridge.addEventListener("toolwindowShow", toolwindowHelpers.onShow);
        externalApis.vsBridge.addEventListener("toolwindowActivate", focusIn);
        externalApis.vsBridge.addEventListener("toolwindowDeactivate", focusOut);
        externalApis.vsBridge.addEventListener("browserDeactivate", function () {
*/
        externalApis.resources.addEventListener("toolwindowShow", toolwindowHelpers.onShow);
        externalApis.resources.addEventListener("toolwindowActivate", focusIn);
        externalApis.resources.addEventListener("toolwindowDeactivate", focusOut);
        externalApis.resources.addEventListener("browserDeactivate", function () {

            // When the user clicks outside the browser but remains in the same tool window
            // we need to remove focus from the current element, so we set it to the
            // body which is tab index -1.
            document.body.setActive();
            $(document.body).removeClass("showFocus");
        });

        // Setup the buttons and toggle buttons
        $(".BPT-ToolbarButton").bind("mousedown", function (event) {
            var element = $(this);
            if (!element.hasClass("BPT-ToolbarButton-StateDisabled")) {
                element.addClass("BPT-ToolbarButton-MouseDown");
            } else {
                event.stopImmediatePropagation();
            }
        });
        $(".BPT-ToolbarButton").bind("mouseup", function () {
            $(this).removeClass("BPT-ToolbarButton-MouseDown");
        });
        $(".BPT-ToolbarButton").bind("mouseleave", function () {
            $(this).removeClass("BPT-ToolbarButton-MouseDown BPT-ToolbarButton-MouseHover");
        });
        $(".BPT-ToolbarButton").bind("mouseenter", function (event) {
            var element = $(this);
            if (!element.hasClass("BPT-ToolbarButton-StateDisabled")) {
                element.addClass("BPT-ToolbarButton-MouseHover");
            } else {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        });
        $(".BPT-ToolbarButton").bind("click keydown", function (event) {
            if (event.type === "click" || event.keyCode === 13 || event.keyCode === 32) { // Enter(13) and Space(32)
                var element = $(this);
                if (!element.hasClass("BPT-ToolbarButton-StateDisabled")) {
                    if (document.activeElement !== element[0]) {
                        element[0].focus();
                    }
                } else {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            }
        });
        $(".BPT-ToolbarToggleButton").bind("click keydown", function (event) {
            if (event.type === "click" || event.keyCode === 13 || event.keyCode === 32) { // Enter(13) and Space(32)
                var element = $(this);
                if (!element.hasClass("BPT-ToolbarButton-StateDisabled")) {
                    if (document.activeElement !== element[0]) {
                        element[0].focus();
                    }
                    element.toggleClass("BPT-ToolbarToggleButton-StateOn");
                } else {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            }
        });
        
        // Setup keyboard navigation
        $(".BPT-TabCycle-Horizontal, .BPT-TabCycle-Vertical").children(".BPT-TabCycle-Item").bind("keydown", function (event) {
            if (($(this).parent().hasClass("BPT-TabCycle-Horizontal") && (event.keyCode === 37 || event.keyCode === 39)) || // Left(37) and Right(39)
                ($(this).parent().hasClass("BPT-TabCycle-Vertical") && (event.keyCode === 38 || event.keyCode === 40))) {   // Up(38) and Down(4)
                var currentElement = $(this);
                var newElement = ((event.keyCode === 37 || event.keyCode === 38) ? // Left(37) or Up(38)
                                    currentElement.prev(".BPT-TabCycle-Item:first") : 
                                    currentElement.next(".BPT-TabCycle-Item:first"));
                
                // Ensure we are moving to a new element
                if (newElement[0]) {
                    newElement.attr("tabindex", "1");
                    newElement.trigger("focus");
                    newElement.trigger("click");
                    currentElement.removeAttr("tabindex");
                }
            }
        });
        $(".BPT-TabCycle-Horizontal, .BPT-TabCycle-Vertical").children(".BPT-TabCycle-Item").bind("mousedown", function (event) {
            var oldElement = $(this).siblings(".BPT-TabCycle-Item[tabindex='1']");
            var newElement = $(this);
            
            // Replace the tab index from the old element, to the new one
            if (newElement[0]) {
                newElement.attr("tabindex", "1");
                newElement.trigger("focus");
                oldElement.removeAttr("tabindex");
            }
        });
        
//        toolwindowHelpers.areCodeMarkersEnabled = toolwindowHelpers.externalApis.vsBridge.getAreCodeMarkersEnabled();
        toolwindowHelpers.areCodeMarkersEnabled = toolwindowHelpers.externalApis.resources.getAreCodeMarkersEnabled();
        
        // Setup communication channel
        toolwindowHelpers.externalApis.addEventListener("break", toolwindowHelpers.onBreak);
        toolwindowHelpers.externalApis.addEventListener("run", toolwindowHelpers.onRun);
        toolwindowHelpers.externalApis.addEventListener("detach", toolwindowHelpers.onDetach);
        toolwindowHelpers.externalApis.addEventListener("connect", toolwindowHelpers.onConnect);

        if (toolwindowHelpers.externalApis.isAttached) {
            toolwindowHelpers.onAttach();
        } else {
            // Show the diagnostics disabled warning
            $("#warningSection").text(toolwindowHelpers.loadString("DiagnosticsDisabled")).show();
        }
        toolwindowHelpers.externalApis.addEventListener("attach", toolwindowHelpers.onAttach);
    },
    
    onAttach: function () {
        /// <summary>
        ///     The onAttach handler that is called when the diagnostics engine has attached to a process 
        ///     and debugging has started
        /// </summary>
        
        // Hide the diagnostics disabled warning
        $("#warningSection").hide();
        
//        toolwindowHelpers.atBreakpoint = toolwindowHelpers.externalApis.vsBridge.getIsAtBreakpoint();
        toolwindowHelpers.atBreakpoint = toolwindowHelpers.externalApis.resources.getIsAtBreakpoint();
        
        toolwindowHelpers.onAttachCallback();
    },

    onDetach: function () {
        /// <summary>
        ///     The onDetach handler that is called when the diagnostics engine has detached from a process
        ///     and debugging has stopped
        /// </summary>

        // Remove un-needed objects
        toolwindowHelpers.remotePort = null;
        toolwindowHelpers.atBreakpoint = false;
        toolwindowHelpers.callbacks = {};
        toolwindowHelpers.pendingMessages = [];
        toolwindowHelpers.pendingTimeout = null;
        
        toolwindowHelpers.onDetachCallback();
        
        // Show the diagnostics disabled warning
        $("#warningSection").text(toolwindowHelpers.loadString("DiagnosticsDisabled")).show();
    }, 

    onShow: function () {
        /// <summary>
        ///     The onShow handler that is called when the toolwindow has been shown
        /// </summary>    
        
        if (toolwindowHelpers.onShowCallback) {
            toolwindowHelpers.onShowCallback();
        }
    },
    
    onBreak: function () {
        /// <summary>
        ///     The onBreak handler that is called when the diagnostics debugging is paused at a breakpoint
        /// </summary>
        
        // We may have detached and then attached to a non diagnostic enabled debug session,
        // So check that we have a active port connection.
        if (toolwindowHelpers.remotePort) {
            toolwindowHelpers.atBreakpoint = true;
        }
        
        if (toolwindowHelpers.onBreakCallback) {
            toolwindowHelpers.onBreakCallback();
        }
    },

    onRun: function () {
        /// <summary>
        ///     The onRun handler that is called when the diagnostics debugging has resumed from a breakpoint
        /// </summary>
        
        // We may have detached and then attached to a non diagnostic enabled debug session,
        // So check that we have a active port connection.
        if (toolwindowHelpers.remotePort) {
            toolwindowHelpers.atBreakpoint = false;
        }
        
        if (toolwindowHelpers.onRunCallback) {
            toolwindowHelpers.onRunCallback();
        }
    },  

    onConnect: function (port) {
        /// <summary>
        ///     This method is called back when the remote side has connected and is ready for use
        /// </summary>
        /// <param name="port" type="Object">
        ///     The communication object that will be used to post messages
        /// </param>

        toolwindowHelpers.remotePort = port;
        toolwindowHelpers.remotePort.addEventListener("message", toolwindowHelpers.onMessageCallback);
//        toolwindowHelpers.atBreakpoint = toolwindowHelpers.externalApis.vsBridge.getIsAtBreakpoint();
        toolwindowHelpers.atBreakpoint = toolwindowHelpers.externalApis.resources.getIsAtBreakpoint();
    },

    registerErrorComponent: function (component, errorDisplayHandler) {
        /// <summary>
        ///     Stores the component name and error handler function for non-fatal
        ///     error reporting    
        /// </summary>
        /// <param name="component" type="String">
        ///     The identifying name of the component
        /// </param>
        /// <param name="errorDisplayHandler" type="Function">
        ///     The function that should be called to display an error message to the
        ///     user
        /// </param>   
        
        window.errorComponent = component;
        window.errorDisplayHandler = errorDisplayHandler;
    },
    
    registerThemeChange: function (externalApis, cssFiles) {
        /// <summary>
        ///     Adds an event listener to the themeChange event in Visual Studio and 
        ///     processes the css files when a theme change occurs    
        /// </summary>
        /// <param name="externalApis" type="Object">
        ///     The window.external object that will be used to set up the communication channel
        /// </param>
        /// <param name="cssFiles" type="Array">
        ///     Array of strings containing the name of the css files required for the toolwindow
        /// </param>
     
        function onThemeChange() {
            var cssThemeFiles = ["toolwindow.css", "datatree.css", "htmltree.css"].concat(cssFiles);
            for (var i = 0; i < cssThemeFiles.length; i++) {

                var id = cssThemeFiles[i];
//                var contents = externalApis.vsBridge.loadCssFile(cssThemeFiles[i], i < 3);
                var contents = externalApis.resources.loadCssFile(cssThemeFiles[i], i < 3);

                // Remove any previous style with this id
                var oldStyle = document.getElementById(id);
                if (oldStyle) {
                    document.head.removeChild(oldStyle);
                }

                // Add the new ones
                var styleNode = document.createElement("style");
                styleNode.id = id;
                styleNode.type = "text/css";
                styleNode.innerHTML = contents;
                document.head.appendChild(styleNode);
            }
            
            // Check the tree expand icons
            var trees = $(".BPT-HtmlTree, .BPT-DataTree");
            for (var j = 0; j < trees.length; j++) {
                var element = $(trees[j]);
                var useDarkTheme = toolwindowHelpers.isDarkThemeBackground(element);
                if (useDarkTheme) {
                    element.addClass("BPT-Tree-DarkTheme");
                } else {
                    element.removeClass("BPT-Tree-DarkTheme");
            }
        }
        }
        
        // Ensure the WebOC version is supported
        if (document.documentMode >= 9) {
/*+VWD
        if (document.documentMode >= 10 || (window.parent.getExternalObj && document.documentMode >= 9)) {
            externalApis.vsBridge.addEventListener("themeChange", onThemeChange);
-VWD*/
            externalApis.resources.addEventListener("themeChange", onThemeChange);
            
            // Fire an initial theme change event
            if (!window.parent.getExternalObj) {
                onThemeChange();
            }
        } else {
            // This browser version is not supported
//            externalApis.vsBridge.notifyUnsupportedBrowser(document.documentMode);
            externalApis.resources.notifyUnsupportedBrowser(document.documentMode);
            window.navigate("about:blank");
        }
    },
    
    loadString: function (resourceId, params) {
        /// <summary>
        ///     Gets a localized string for the resourceId
        /// </summary>
        /// <param name="resourceId" type="String">
        ///     The resource identifier of the string to retrieve
        /// </param>
        /// <param name="params" type="Array" optional="true">
        ///     Optional array of objects to be used in any format specifiers in the string
        /// </param>
        /// <returns type="String">
        ///     The loaded localized string
        /// </returns>    

        if (params !== undefined) {
            // Use the format function
//            return toolwindowHelpers.externalApis.vsBridge.loadFormattedString(resourceId, params);
            return toolwindowHelpers.externalApis.resources.loadFormattedString(resourceId, params);
        } else {
            // Use no formatting
//            return toolwindowHelpers.externalApis.vsBridge.loadString(resourceId);
            return toolwindowHelpers.externalApis.resources.loadString(resourceId);
        }
    },
    
    codeMarker: function (codeMarker) {
        /// <summary>
        ///     Fire a VS perf code marker with a specified identifier
        /// </summary>
        /// <param name="codeMarker" type="Number">
        ///     The value of the code marker
        /// </param>
        
        if (toolwindowHelpers.areCodeMarkersEnabled) {
//            toolwindowHelpers.externalApis.vsBridge.fireCodeMarker(codeMarker);
            toolwindowHelpers.externalApis.resources.fireCodeMarker(codeMarker);
        }
    },

    executeBreakModeCommand: function (remoteFunction, id, input, callback) {
        /// <summary>
        ///     Executes a command at breakmode using VS instead of the remote code,
        ///     This is used by the console to evaluate input in the context of the current breakpoint.
        /// </summary>
        /// <param name="remoteFunction" type="String">
        ///     The function to call on the remote side 
        /// </param>
        /// <param name="id" type="String">
        ///     The id to give to this command so that it can be identifed on the remote side
        /// </param>        
        /// <param name="input" type="String">
        ///     The input to execute
        /// </param>
        /// <param name="callback" type="Function">
        ///     The function to execute when the result is returned from the remote side
        /// </param>
        
        var uidString = toolwindowHelpers.getUid();
        toolwindowHelpers.callbacks[uidString] = { synced: true, callback: callback || $.noop };
    
        var sendBreakCommand = function (remoteFunction, id, uidString, input) {
            if (toolwindowHelpers.atBreakpoint) {
                // Send the message using the break mode command evaluator
//                var succeeded = toolwindowHelpers.externalApis.vsBridge.executeBreakModeCommand(remoteFunction + ":" + id + ":" + uidString, input);
                var succeeded = toolwindowHelpers.externalApis.resources.executeBreakModeCommand(remoteFunction + ":" + id + ":" + uidString, input);
                if (!succeeded) {
                    // We failed to send the break mode command because it is no longer in break mode,
                    // so send the message via the run time remote port.
                    if (toolwindowHelpers.remotePort) {
                        var jsonObj = {
                            uid: uidString,
                            command: remoteFunction,
                            args: [id, input]
                        };
                        var message = JSON.stringify([jsonObj]);
                        toolwindowHelpers.remotePort.postMessage(message);
                    }
                }
            }
        };
        
        setTimeout(function () {
            sendBreakCommand(remoteFunction, id, uidString, input);
        }, 0);
    },
    
    scrollIntoView: function (element, scrollContainer) {
        /// <summary>
        ///     Scrolls an element into view in a scroll container if it is currently outside of the view
        /// </summary>
        /// <param name="element" type="Object">
        ///     The DOM element that should be scrolled into the view
        /// </param>
        /// <param name="scrollContainer" type="Object">
        ///     The DOM element that has scrollbars and has the element being scrolled as a decendant
        /// </param>        
        /// <returns type="Boolean">
        ///     True if the view was scrolled, False if the element was already in the view and did not need scrolling
        /// </returns>
        
        // Ensure we have a valid element to scroll
        if (element) {
            var topOfPage = scrollContainer.scrollTop;
            var heightOfPage = scrollContainer.clientHeight;
            var elementTop = 0;
            var elementHeight = 0;

            var currentElement = element;
            while (currentElement && currentElement !== scrollContainer) {
                elementTop += currentElement.offsetTop;
                currentElement = currentElement.offsetParent;
            }
            elementHeight = element.offsetHeight;
            
            var alignPosition;
            if ((topOfPage + heightOfPage) < (elementTop + elementHeight)) {
                alignPosition = "bottom";
            } else if (elementTop < topOfPage) {
                alignPosition = "top";
            }
            
            if (alignPosition) {
                var temp = $("<div style='position:absolute; top:" + elementTop + "px; left: 0; height:" + elementHeight + "px'></div>");
                $(scrollContainer).append(temp);
                temp[0].scrollIntoView(alignPosition === "top");
                temp.remove();
                return true;           
            }
        }
        
        return false;
    },
    
    getSortedObjectProperties: function (objectToSort) {
        /// <summary>
        ///     Sorts an object's property names alphabetically and returns an array of the sorted names
        /// </summary>
        /// <param name="objectToSort" type="Object">
        ///     The javascript object that contains the properties that need to be sorted
        /// </param>
        /// <returns type="Array">
        ///     An array of the sorted property names that can be used as a list of sorted keys into the real object
        /// </returns>
        
        // Sort the property names for display
        var sortedPropNames = [];
        for (var propName in objectToSort) {
            sortedPropNames.push(propName);
        }

        sortedPropNames.sort(toolwindowHelpers.naturalSort);
        
        return sortedPropNames;
    },
    
    getSortedArrayProperties: function (arrayToSort, key, highPriorityValue) {
        /// <summary>
        ///     Sorts an array of objects on a key property names alphabetically and returns an array of the sorted indicies
        /// </summary>
        /// <param name="arrayToSort" type="Array">
        ///     The javascript array that contains the objects that need to be sorted
        /// </param>
        /// <param name="key" type="String">
        ///     The name of the property to sort the array by
        /// </param>
        /// <param name="highPriorityValue" type="String" optional="true">
        ///     Optional parameter to specify a value that should be treated with highest priority in the sort
        /// </param>           
        /// <returns type="Array">
        ///     An array of the sorted indicies that can be used as a list of sorted keys into the real array
        /// </returns>
        
        // Sort the property names for display
        var i;
        var sortedProps = [];
        for (i = 0; i < arrayToSort.length; i++) {
            sortedProps.push({property: arrayToSort[i][key], realIndex: i});
        }
       
        sortedProps.sort(function (a, b) {
            if (highPriorityValue) {
                if (a.property === highPriorityValue && b.property === highPriorityValue) {
                    return 0;
                } else if (a.property === highPriorityValue) {
                    return -1;
                } else if (b.property === highPriorityValue) {
                    return 1;
                }
            }
            return toolwindowHelpers.naturalSort(a.property, b.property);
        });
        
        var sortedList = [];
        for (i = 0; i < sortedProps.length; i++) {
            sortedList.push(sortedProps[i].realIndex);
        }
        
        return sortedList;
    },  
    
    naturalSort: function (a, b) {
        /// <summary>
        ///     Sorts two objects as strings alphabetically and returns a number representing the order
        /// </summary>
        /// <param name="a" type="Object">
        ///     The first string object to compare
        /// </param>
        /// <param name="b" type="Object">
        ///     The second string object to compare
        /// </param>        
        /// <returns type="Number">
        ///     A number representing the sort order
        ///     a &gt; b = 1
        ///     a &lt; b = -1
        ///     a == b = 0
        /// </returns>
        
        // Regular Expression to pick groups of either digits or non digits (eg. 11bc34 - will return [11, bc, 34])
        var regexSortGroup = /(\d+)|(\D+)/g;
        
        // Convert to case insensitive strings and identify the sort groups
        var aGroups = String(a).toLowerCase().match(regexSortGroup);
        var bGroups = String(b).toLowerCase().match(regexSortGroup);

        // Loop through each group
        while (aGroups.length > 0 && bGroups.length > 0) {
            // Take the first group of each string
            var aFront = aGroups.shift();
            var bFront = bGroups.shift();
            
            // Check for digits
            var aAsDigit = parseInt(aFront, 10);
            var bAsDigit = parseInt(bFront, 10);
            
            if (isNaN(aAsDigit) && isNaN(bAsDigit)) {
                // Compare as string characters
                if (aFront !== bFront) {
                    // Chars not the same, so just return the sort value
                    return (aFront > bFront ? 1 : -1);
                }
            } else if (isNaN(aAsDigit)) {
                // Letters come after numbers
                return 1;
            } else if (isNaN(bAsDigit)) {
                // Numbers come before letters
                return -1;
            } else {
                // Compare as numbers
                if (aAsDigit !== bAsDigit) {
                    // Numbers not the same, so just return the sort value
                    return (aAsDigit - bAsDigit);
                }
            }
        }
        
        // If we get here, we know all the groups checked were identical,
        // So we can return the length difference as the sort value.
        return aGroups.length - bGroups.length;
    },
    
    formatMultilineString: function (multilineString) {
        /// <summary>
        ///     Formats a multiline string by trimming whitespace and removing any empty lines
        /// </summary>
        /// <param name="multilineString" type="String">
        ///     The string to format
        /// </param>
        /// <returns type="String">
        ///     The formatted string
        /// </returns>
        
        if (!multilineString) {
            return "";
        }
        
        var text = "";
        
        var finalLines = [];
        // Split into lines, then process each one
        var lines = multilineString.split(/[\r\n]+/);
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            if ($.trim(lines[lineIndex]) !== "") {
                finalLines.push(lines[lineIndex]);
            }
        }
        
        // Join up the lines into html with line breaks
        text = finalLines.join("\n");
        
        return text;
    },


    createShortenedUrlText: function (url) {
        /// <summary>
        ///     Returns a short form of the URL for use in displaying file links to the user.  Adapted
        ///     from F12 toolbar code, this method removes any trailing query string or anchor location 
        ///     and attempts to get the last file or directory following a '/'.  
        /// </summary>
        /// <param name="url" type="String">
        ///     The url to shorten.
        /// </param>
        /// <returns type="String">
        ///     A shortened version of the string
        /// </returns>

        var shortenedText = url;
        // Remove a query string if any
        var indexOfHash = shortenedText.indexOf("#");
        var indexOfQuestionMark = shortenedText.indexOf("?");
        var index = -1;
        if (indexOfHash > -1 && indexOfQuestionMark > -1) {
            index = Math.min(indexOfHash, indexOfQuestionMark);
        } else if (indexOfHash > -1) {
            index = indexOfHash;
        } else if (indexOfQuestionMark > -1) {
            index = indexOfQuestionMark;
        }
    
        if (index > -1) {
            shortenedText = shortenedText.substring(0, index);
        }
    
        index = shortenedText.lastIndexOf("/");
    
        // While the last character is '/', truncate it and find the next / or the start of the string
        while (index === (shortenedText.length - 1) ) {
            // Remove last '/'
            shortenedText = shortenedText.substring(0, shortenedText.length - 1);
            index = shortenedText.lastIndexOf("/");
        }
    
        if (index > -1) {
            shortenedText = shortenedText.substring(index + 1);
        }
    
        return shortenedText;
    },

    createLinkDivText: function (link, styles, dontGenerateTooltip) {
        /// <summary>
        ///     Creates a DOM div element string for a link that opens a document in VS
        /// </summary>
        /// <param name="link" type="String">
        ///     The href to turn into a link div.
        /// </param>
        /// <param name="styles" type="String" optional="true">
        ///     A ' ' separated list of styles to add to the div.
        /// </param>
        /// <param name="dontGenerateTooltip" type="Boolean" optional="true">
        ///     No tooltip will be added if set to true.
        /// </param>
        /// <returns type="String">
        ///     The link string of the form <div class='[styles string] BPT-FileLink' data-linkUrl="[link.url]" data-linkSearch="[link.search]" data-linkLine='[link.line]' data-linkCol='[link.column]' tabindex='1'>[shortened link.url]</div>
        /// </returns>
        
        var linker = "";
        if (link && link.url) {
            // Create the url and text
            var url = "\"" + link.url.replace(/\\"/g, "\"") + "\"";
            var linkText = toolwindowHelpers.createShortenedUrlText(link.url);
            
            // Create the search term
            var search = "";
            if (link.search) {
                search = "\"" + link.search.replace(/\\"/g, "\"") + "\"";
            }
            
            linkText = linkText.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
            linker = "<div class='" + styles + " BPT-FileLink' data-linkUrl=" + url; 
            if (search) {
               linker += " data-linkSearch=" + search;
            }
            if (link.line) {
                linker += " data-linkLine='" + link.line + "'";
            }
            if (link.column) {
                linker += " data-linkCol='" + link.column + "'";
            }
            if (!dontGenerateTooltip) {
                linker += " title='" + linkText + "'";
            }
            linker += ">" + linkText + "</div>";
        }

        return linker;
    },

    htmlEscape: function (htmlString) {
        /// <summary>
        ///     Escapes a string so that it can be safely displayed in html. 
        /// </summary>
        /// <param name="htmlString" type="String">
        ///     The javascript string that is to be HTML escaped
        /// </param>
        /// <returns type="String">
        ///     The escaped string 
        /// </returns>

        // Ensure we have a string to escape
        if ((typeof htmlString) !== "string") {
            if (htmlString === null || htmlString === undefined) {
                return "";
            }
            htmlString = "" + htmlString;
        }
        
        // Speed up the html escape by using a regular expression to encode html characters
        return htmlString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },
    
    copySelectedTextToClipboard: function () {
        /// <summary>
        ///     Gets the highlighted text in the document, compacts multiline text by converting multiple \r\n's to a single one, and then copies the text to the clipboard
        /// </summary>
        /// <returns type="Boolean">
        ///     True if any text was copied, false otherwise
        /// </returns>
        
        var selectedText = document.selection.createRange().text;
        if (selectedText) {
            // Replace multiple white space lines with a single one
            var compactText = selectedText.replace(/[\r\n]+/g, "\r\n");
            // Copy to the clipboard
            clipboardData.setData("Text", compactText);
            return true;
        }
        
        return false;
    },
    
    isDarkThemeBackground: function (element) {
        /// <summary>
        ///     Checks the element's background color to see if it is being displayed in the dark theme
        /// </summary>
        /// <param name="element" type="Object">
        ///     The JQuery element to check the background for
        /// </param>        
        /// <returns type="Boolean">
        ///     True if the background color indicates the dark theme, False if it is light
        /// </returns>

        if (element) {
            var backgroundColor;
            while ((!backgroundColor || backgroundColor === "transparent") && element && element.length > 0) {
                backgroundColor = element.css("background-color");
                
                element = element.parent();
            }
            
            var rgbParts = backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            if (rgbParts && rgbParts.length === 4) {
                
                // Brightness determined by W3C formula
                var brightness = ((rgbParts[1] * 299) + (rgbParts[2] * 587) + (rgbParts[3] * 114)) / 1000;
                
                return (brightness < 127);
            }
        }
        
        // Default to using light theme
        return false;
    },
    
    getExpandIconSrc : function (element, useExpandedIcon, performThemeCheck) {
        /// <summary>
        ///     Gets the src attribute of an element for either the expanded or collased icon in the current theme
        /// </summary>
        /// <param name="element" type="Object">
        ///     The JQuery element to get the icon for
        /// </param>        
        /// <param name="useExpandedIcon" type="Boolean">
        ///     True to use the expanded icon, False to use the collapsed icon
        /// </param>        
        /// <param name="performThemeCheck" type="Boolean" optional="true">
        ///     True to check the background color of the element to determine the icon theme to use
        /// </param> 

        var useDarkTheme;
        if (performThemeCheck) {
            useDarkTheme = toolwindowHelpers.isDarkThemeBackground(element);
        } else {
            useDarkTheme = (element.attr("src").indexOf("DarkTheme") >= 0);
        }
        
        var newSrc;
        if (useDarkTheme) {
            // Select dark theme icon
            newSrc = (useExpandedIcon ? "../common/itemExpandedDarkThemeIcon.png" : "../common/itemCollapsedDarkThemeIcon.png");
        } else {
            // Select light theme icon
            newSrc = (useExpandedIcon ? "../common/itemExpandedIcon.png" : "../common/itemCollapsedIcon.png") ;   
        }  
        return newSrc;        
    },
    
    getUid: function () {
        /// <summary>
        ///     This function returns a new unique identifier string for the dom explorer window
        /// </summary>
        /// <returns type="String">
        ///     A string representing the unique id
        /// </returns>
        
        return "uid" + (toolwindowHelpers.uid++).toString(36);
    }    
};

// Create the proxy for our communications
window.callProxy = function callProxy(command, args, callback) {
    /// <summary>
    ///     Sends a message to the remote side to execute an async function and optionally
    ///     return a result
    /// </summary>
    /// <param name="command" type="String">
    ///     The remote function command to call
    /// </param>
    /// <param name="args" type="Array" optional="true">
    ///     An optional array of arguments to pass to the remote function
    /// </param>
    /// <param name="callback" type="Function" optional="true">
    ///     An optional callback function to trigger when the async result is recieved
    /// </param>
        
    // Generate a unique id to track this transaction
    var uidString = toolwindowHelpers.getUid();
    
    if (callback) {
        // Only create a callback object if there is something that will be called back
        toolwindowHelpers.callbacks[uidString] = { synced: true, callback: callback || $.noop };
    }
    
    var newArgs = $.map(args || [], function (arg) {
        if (typeof (arg) === "function") {
            var callbackuid = toolwindowHelpers.getUid();
            toolwindowHelpers.callbacks[callbackuid] = { synced: false, callback: arg };

            return { uid: callbackuid,
                type: "callback"
            };

        } else {
            return arg;
        }
    });
    var jsonObj = {
        uid: uidString,
        command: command,
        args: newArgs
    };

    var sendMessageToRemote = function (message) {
        // Ensure that we have a port to send the message to as we may have disconnected
        if (toolwindowHelpers.remotePort) {
            // Send the message via the run time remote port
            toolwindowHelpers.remotePort.postMessage(message);
        }
    };
            
    toolwindowHelpers.pendingMessages.push(jsonObj);
    if (!toolwindowHelpers.pendingTimeout) {
        toolwindowHelpers.pendingTimeout = setTimeout(function () {
            var message = JSON.stringify(toolwindowHelpers.pendingMessages);
            toolwindowHelpers.pendingMessages = [];
            toolwindowHelpers.pendingTimeout = null;
            sendMessageToRemote(message);
        }, 0);
    }
};

window.callProxy.fireCallbacks = function (data) {
    var msgs = JSON.parse(data);
    for (var i = 0; i < msgs.length; i++) {
        var obj = msgs[i];
        if (toolwindowHelpers.callbacks[obj.uid]) {
            if (obj.args !== undefined) {
                toolwindowHelpers.callbacks[obj.uid].callback.apply(this, obj.args);
            }
            if (toolwindowHelpers.callbacks[obj.uid].synced) {
                delete toolwindowHelpers.callbacks[obj.uid];
            }
        } else if (obj.uid === "scriptError") {
            // Fire the script error handler
            window.reportError(obj.args[0].message, obj.args[0].file, obj.args[0].line, obj.args[0].additionalInfo);
        }
    }
};

window.reportError = function (message, file, line, additionalInfo) {
    /// <summary>
    ///     Handles JavaScript errors in the toolwindows by reporting them as non-fatal errors
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
    /// <param name="additionalInfo" type="String">
    ///     Any additional information about the error such as callstack
    /// </param>
    
    var externalObj;
    if (window.parent.getExternalObj) {
        // Hosted in an IFRAME, so get the external object from there
        externalObj = window.parent.getExternalObj();
    } else if (window.external) { 
        // Hosted in Visual Studio
        externalObj = window.external;
    }
//+VWD    
    externalObj = externalObj && externalObj.ExternalDispatch ? externalObj.ExternalDispatch : null;
//-VWD    
    // Add additional vs side information
    var info = [];
    try {
        info.push(additionalInfo);
        info.push("atBreakpoint: " + toolwindowHelpers.atBreakpoint);
        info.push("Stored Callbacks: " + JSON.stringify(toolwindowHelpers.callbacks));
        info.push("Pending Messages: " + JSON.stringify(toolwindowHelpers.pendingMessages));
    } catch (ex3) {
        // Fail gracefully
    }
    var finalInfo = info.join("\r\n\r\n");
    
    if (externalObj) {
        // Code in this function is commented out to stop the error from being displayed to the user for release,
        // If we need this this functionality again, the code can be un-commented.
        
        // Store the script error for later use
        ////window.lastScriptError = {message: message, file: file, line: line};
        
        // Report the NFE to the watson server
        var component = (window.errorComponent ? window.errorComponent : "Common");
/*+VWD
        externalObj.reportNonFatalError(component, message, file, line, finalInfo);
-VWD*/
        externalObj.reportNonFatalError(component, message, file, line);

        // Display a warning message to the user
        ////if (window.errorDisplayHandler) {
        ////    window.errorDisplayHandler(message, file, line, finalInfo);
        ////}
    }
 
};

window.onerror = function (message, file, line) {
    /// <summary>
    ///     Handles JavaScript errors in the toolwindows by reporting them as non-fatal errors
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
    } catch (ex3) {
        // Fail gracefully
    }
    
    window.reportError(message, file, line, info);
    return true;
};


// SIG // Begin signature block
// SIG // MIIaywYJKoZIhvcNAQcCoIIavDCCGrgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFJ8EuPKNWRB6
// SIG // u/zKaKw26M6O/aNIoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AABw9Bi/IyH8UJ0AAAAAAHAwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE1MDMyMDE3
// SIG // MzIwMloXDTE2MDYyMDE3MzIwMlowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpGNTI4LTM3NzctOEE3NjEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAKMU2e8coHkRvS2aBJ0jNIKlQh0rANHSGzEpyCor
// SIG // 8y30bovd4hv4E/TAX3BTr+czD3RKBxRs3CgDuCoKeMRu
// SIG // II4LgG9We5P0cU/C06vG7C2uldBjZ7BkpjQDDOOKrihS
// SIG // Apk1+Txk2ysyd8I07lIeX5cGdAl/8KL31ZHq3GLbU4ZH
// SIG // bowBW+Ile3j8PXKDIntZk6Kvk8kYLuf2ClQOmA1lBld3
// SIG // k5GvlK+EvrhvrYT0+xXik+LYSDZ1WTIBDXF2AJVJaWzU
// SIG // xjY6WjDQwMpzieaU9iMeEmBRAAjB3to/SITtta/U05o4
// SIG // lam6o1i1eGhGvw+MY3G+OkNDWRDwSrp71uUGE90CAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBRtz/O4hK73zHa9uHus
// SIG // PZdhgXQrJzAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQBeOir1Z/QF
// SIG // MCre4bnvZ/wq/25yKZ+efMcTw6PljjwE6SYVTffCZ4Jc
// SIG // ClvFCu5V8KMtjqIdorMsLdAR4poqAdEwJmehpm6JMRxu
// SIG // 3cRxVPAJot3B1jZzwAz/VQhr/KGU/V0sJyHs0SMG3AQs
// SIG // 77kC2wO7R3MYCut9mc1fBuCI94qTxRIRG/NSlaNyoNJY
// SIG // 2cMs4mt/d9RjU+qCuC9HZCiYx4M78WsoYfgKiIJFUpLp
// SIG // gyZJXLfOPJp/r6BRk8W8usvRK7W7kBkKpqdqfvj9FX5G
// SIG // RIelBtT8SnA4xui1SvTbri/sQ8mJoijFVdnBuluqYLul
// SIG // u/nVAo4OD23CNXDAqOwNobK4MIIE7DCCA9SgAwIBAgIT
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBR/0LlqXS+7
// SIG // Cv3UAGHYkXF1VK2J0TBuBgorBgEEAYI3AgEMMWAwXqBE
// SIG // gEIATQBpAGMAcgBvAHMAbwBmAHQAIABWAGkAcwB1AGEA
// SIG // bAAgAFMAdAB1AGQAaQBvACAAVwBlAGIAIABUAG8AbwBs
// SIG // AHOhFoAUaHR0cDovL3d3dy5hc3AubmV0LyAwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAin+FF2sFkcXH2B1g08lNgd8rXrHC
// SIG // Zhgsfu9DjwCXIaqR64S8u2SzpBQJEVEFaVZBWcgzEkf2
// SIG // wWPIp0wlL7NUNIyxozC2ZmkK3WkRvtg49FRb//S332pS
// SIG // XXwruC0zuhukKh2eKQ99b5G9wUNoik27ps5EfP1pNQos
// SIG // eHivMhmhIpu2TeqhVBK28zuUqAsHmOHBIy6aRyo1xN50
// SIG // aN4RRrt2F1ImMN3lDTNQIBM1kxE9dtOmgoZYEW4s6Cqg
// SIG // 0yNxJHEDpaQYa01wzlzzUUVykssDFEkify6MD6LYzRjR
// SIG // 4ab9KiaCW5/VlMTMq7A2zzLMAnSFDWudfz0OYi/W22kF
// SIG // vKU3T6GCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIB
// SIG // ATCBjjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQD
// SIG // ExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABw
// SIG // 9Bi/IyH8UJ0AAAAAAHAwCQYFKw4DAhoFAKBdMBgGCSqG
// SIG // SIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkF
// SIG // MQ8XDTE1MDYxMzAxMzcxMlowIwYJKoZIhvcNAQkEMRYE
// SIG // FKtolDYxS6IGt6A+Ac9pM10Joj7YMA0GCSqGSIb3DQEB
// SIG // BQUABIIBAKKQu4goCZtwNCe4Z8oK+ZPLERTycVxlTkcD
// SIG // flb4YXvAOBYXy/XiTpkg7VtvzGKn9C8/wzlRgyB0DM6/
// SIG // 0HwsYIq8/epS9T3gjRJjz5xYFVFwkuT/WiEOwPM3R2FX
// SIG // BpCniKnzhYRkG5a7wy6vGj6kEoh7aoakSS2Lm9i7fB+C
// SIG // qwE7YP5eVtSMzsi4pt2MJNqXr5iyy16PqIy1rNN6PXDR
// SIG // zx0zzQ+SIkIs4/ggj3mPh+toFOOzYNY44jM7ygwscxBp
// SIG // hILNIgdM5JdklryQOntF+zraKFW2EIR7T+6vHR78Gor5
// SIG // diN3M+0MBy3oc033IJ/KJJhk8dXslSk87dsxaoi9Bdc=
// SIG // End signature block
