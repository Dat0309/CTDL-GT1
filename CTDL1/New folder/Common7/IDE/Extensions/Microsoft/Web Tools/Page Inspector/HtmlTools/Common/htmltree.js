// Expected global variables:
/*global jQuery toolwindowHelpers */

(function ($) {
    /// <summary>
    ///     HtmlTreeView - JQuery extension for constructing a tree view consisting of tags and attributes, 
    ///     The html tree view object can be initialized by calling htmlTreeView on a jQuery object.
    ///     Requires:
    ///     - htmltree.css
    ///     - itemCollapsedIcon.png
    ///     - itemExpandedIcon.png
    ///     - itemCollapsedDarkThemeIcon.png
    ///     - itemExpandedDarkThemeIcon.png
    /// </summary>
    
    // The number of elements to display before the 'show all' link is shown
    var initialElementLimit = 200;
    
    var methods = {

        // Default constructor
        init: function () {
            /// <summary>
            ///     Creates a new HtmlTreeView for a BPT-HtmlTree-Container
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object for the new HtmlTreeView
            /// </returns>
            
            var rootElement = $("<div class='BPT-HtmlTree'></div>");
            this.append(rootElement);
            
            var useDarkTheme = toolwindowHelpers.isDarkThemeBackground(rootElement);
            if (useDarkTheme) {
                rootElement.addClass("BPT-Tree-DarkTheme");
            } else {
                rootElement.removeClass("BPT-Tree-DarkTheme");
            }
            
            // Attach the event handlers if we need to
            if (!rootElement.data("attachedHandlers")) {
                var container = rootElement.parent(".BPT-HtmlTree-Container");
                
                container.bind("mousedown.htmlTreeView", function (event) {
                    $(this).data("mouseActivate", true);
                });
                
                container.bind("click.htmlTreeView", function (event) {
                    var element = $(event.target);
                    if (!element.is(".BPT-HtmlTree-ChildCollection")) {
                        var row = element.closest(".BPT-HtmlTreeItem");
                        
                        if (row.length > 0) {
                            // If they clicked the expand icon, toggle the row
                            if (element.hasClass("BPT-HtmlTreeItem-ExpandIcon")) {
                                methods.toggle.call(row);
                            }
                            methods.select.call(row);
                        }
                    }
                });
                
                container.bind("dblclick.htmlTreeView", function (event) {
                    var element = $(event.target);
                    var item = element.closest(".BPT-HtmlTreeItem, .BPT-HTML-Attribute-Section, .BPT-HTML-Text, .BPT-HtmlTree-ChildCollection-Pager");
                    
                    if (item.length > 0) {
                        if (item.hasClass("BPT-HtmlTreeItem")) {
                            // Double clicking the row will expand/collapse it
                            if (item.hasClass("BPT-HtmlTreeItem-Collapsed") || item.hasClass("BPT-HtmlTreeItem-Expanded")) {
                                if (!element.hasClass("BPT-HtmlTreeItem-ExpandIcon")) {
                                    methods.toggle.call(item);
                                }
                            }
                        } else if (item.hasClass("BPT-HTML-Attribute-Section") || item.hasClass("BPT-HTML-Text")) {
                            // Double clicking an attribute or inline text will edit it
                            var row = item.parents(".BPT-HtmlTreeItem:first");
                            if (row.length > 0) {
                                var editCallback = row.data("editCallback");
                                editCallback = (editCallback ? editCallback : row.parent().data("editCallback"));
                                
                                if (editCallback) {
                                    editCallback(row, item);
                                    event.stopPropagation();
                                }
                            }
                        }
                    }             
                });                
                
                container.bind("focus.htmlTreeView", function (event) {
                    if (!$(this).data("mouseActivate")) {
                        var element = $(this);
                        var selected = element.children(".BPT-HtmlTree").htmlTreeView("getSelected");
                        if (selected.length === 0) {
                            selected = element.find(".BPT-HtmlTreeItem:not(.BPT-HtmlTreeItem-HiddenRoot):first").htmlTreeView("select");
                        }
                        
                        if (selected && selected.length > 0) {
                            var wasScrolled = toolwindowHelpers.scrollIntoView(selected.children(".BPT-HtmlTreeItem-Header")[0], selected.closest(".BPT-HtmlTree-ScrollContainer")[0]);
                            if (wasScrolled) {
                                event.preventDefault();
                                return false;
                            }
                        }
                    }
                    // Always prevent the default scrolling behavior on focus as it jumps to the top
                    event.preventDefault();
                    $(this).data("mouseActivate", false);
                });
                
                container.bind("keydown.htmlTreeView", function (event) {
                    if (event.keyCode >= 37 && event.keyCode <= 40) { // Arrow Keys
                    
                        // Don't do anything if we are inside an input
                        if ($(document.activeElement).is(":input")) {
                            return;
                        }
                        
                        var selected = methods.getSelected.call($(this).children(":first"));
                        
                        var moveUp = function (toParent) {
                            /// <summary>
                            ///     Moves the selection up to the previous node
                            /// </summary>
                            /// <param name="toParent" type="Boolean" optional="true">
                            ///     Optional parameter specifying if the jumps to parent nodes are allowed (default false)
                            /// </param>  
                            
                            var newElement = null;
                            var sibling = selected.prev(".BPT-HtmlTreeItem:not(.BPT-HtmlTreeItem-HiddenRoot):last");
                            if (sibling.length > 0 && !toParent) {
                                // Find the last child
                                newElement = sibling.find(".BPT-HtmlTreeItem:not(.BPT-HtmlTreeItem-HiddenRoot):last");
                                
                                if (newElement.length === 0) {
                                    // Use the sibling instead
                                    newElement = sibling;
                                }
                            } else {
                                newElement = selected.parents(".BPT-HtmlTreeItem:not(.BPT-HtmlTreeItem-HiddenRoot):first");
                            }
                            
                            if (newElement && newElement.length > 0) {
                                methods.select.call(newElement);
                                toolwindowHelpers.scrollIntoView(newElement.children(".BPT-HtmlTreeItem-Header")[0], newElement.closest(".BPT-HtmlTree-ScrollContainer")[0]);
                                event.preventDefault();
                                return false;
                            }
                        };
                        
                        var moveDown = function () {
                            /// <summary>
                            ///     Moves the selection down to the next node
                            /// </summary>
                            
                            var newElement = selected.find(".BPT-HtmlTreeItem:not(.BPT-HtmlTreeItem-HiddenRoot):first");
                            newElement = (newElement.length > 0 ? newElement : selected.next(".BPT-HtmlTreeItem:first"));
                            
                            var searchedParent = selected;
                            while (newElement.length === 0) {
                                searchedParent = searchedParent.parents(".BPT-HtmlTreeItem:not(.BPT-HtmlTreeItem-HiddenRoot)");
                                if (searchedParent.length === 0) {
                                    break;
                                }
                                newElement = searchedParent.next(".BPT-HtmlTreeItem:not(.BPT-HtmlTreeItem-HiddenRoot):first");
                            }
                            
                            if (newElement && newElement.length > 0) {
                                methods.select.call(newElement);
                                toolwindowHelpers.scrollIntoView(newElement.children(".BPT-HtmlTreeItem-Header")[0], newElement.closest(".BPT-HtmlTree-ScrollContainer")[0]);
                                event.preventDefault();
                                return false;
                            }
                        };
                        
                        if (selected.length > 0) {
                            switch (event.keyCode) {
                                case 37: // Left(37)
                                    if (selected.hasClass("BPT-HtmlTreeItem-Expanded")) {
                                        methods.toggle.call(selected);
                                    } else {
                                        moveUp(true);
                                    }
                                    break;
                                    
                                case 38: // Up(38)
                                    moveUp();
                                    break;
                                    
                                case 39: // Right(39)
                                    if (selected.hasClass("BPT-HtmlTreeItem-Collapsed")) {
                                        methods.toggle.call(selected);
                                    } else if (selected.hasClass("BPT-HtmlTreeItem-Expanded")) {    
                                        moveDown();
                                    }  
                                    break;
                                    
                                case 40: // Down(40)
                                    moveDown();
                                    break;
                            }                        
                        }
                        
                        // Prevent the tree from scrolling with the arrows (matches solution explorer behavior)
                        event.preventDefault();
                        return false;  
                        
                    } else if (event.keyCode === 13 || event.keyCode === 32) { // Enter(13) or Space(32) 
                    
                        // Ensure we are not currently editing
                        if (document.activeElement && document.activeElement.type !== "text") {
                        
                            if (event.keyCode === 32) { // Space(32)
                                // We didn't have an item to click and they were pressing space,
                                // so stop the scroll container from scrolling.
                                return false;
                            }
                            
                            // Find out if this is an editable text node
                            var selectedNode = methods.getSelected.call($(this).children(":first"));
                            
                            // Find out if this is a 'show all' link
                            var isShowAllLink = selectedNode.hasClass("BPT-HtmlTree-ChildCollection-ShowAll");
                            if (isShowAllLink) {
                                selectedNode.click();
                                return;
                            }
                            
                            // Find out if this is an editable text node
                            var text = selectedNode.find(".BPT-HtmlTreeItem-Header:first > .BPT-HTML > .BPT-HTML-Text:last");
                            if (text.length === 1) {
                                // Found a text node, so emulate a double click
                                event.preventDefault();
                                event.stopImmediatePropagation();
                                text.trigger("dblclick");
                            }
                        }
                    }
                });
                container = null;
                rootElement.data("attachedHandlers", true);
            }
            
            return this;
        },
        
        destroy : function () {
            /// <summary>
            ///     Disposes of an HtmlTreeView and removes all data and event handlers
            /// </summary>  
            
            // Remove event handlers
            if (this.data("attachedHandlers")) {
                this.children(".BPT-HtmlTree-Container").unbind(".htmlTreeView");
                this.data("attachedHandlers", false);
            }
        },
        
        addRootElement: function (uid, tag, rootTagToShow, toggleCallback, editCallback, selectCallback) {
            /// <summary>
            ///     Adds a single element that will act as the root for this HtmlTreeView
            /// </summary>
            /// <param name="uid" type="String">
            ///     A unique id to assign to this element
            /// </param>  
            /// <param name="tag" type="String">
            ///     The tag to use in the display (#document tags will be hidden)
            /// </param>  
            /// <param name="rootTagToShow" type="String">
            ///     The text to use for the root element's tag.
            ///     If this is null or an empty string, no root node will be shown.
            /// </param>  
            /// <param name="toggleCallback" type="Function">
            ///     An optional callback that will be triggered when the element is toggled
            /// </param>  
            /// <param name="editCallback" type="Function">
            ///     An optional callback that will be triggered when an attribute is double clicked
            /// </param>              
            /// <param name="selectCallback" type="Function">
            ///     An optional callback that will be triggered when the element is selected
            /// </param>            
            /// <returns type="Object">
            ///     The jquery object that was created
            /// </returns> 
            
            if (toggleCallback) {
                this.data({
                    toggleCallback: toggleCallback
                });
            }
            
            var newElements = [{uid: uid, tag: tag, text: "", hasChildren: (toggleCallback ? true : false), attributes: null, rootTagToShow: rootTagToShow}];
            
            var rootElement = methods.addElements.call(this, newElements, toggleCallback, editCallback, selectCallback).children(":first");
            return rootElement;
        },
        
        addElements: function (elements, toggleCallback, editCallback, selectCallback, keepExistingElements, stopAutoScroll) {
            /// <summary>
            ///     Adds an array of elements to the HtmlTreeItem
            /// </summary>
            /// <param name="elements" type="Array">
            ///     An array of objects that describe the children elements, in the following format:
            ///     [{uid: String, tag: String, text: String, hasChildren: Boolean, attributes: [{name:String, value: String}]}]
            /// </param>  
            /// <param name="toggleCallback" type="Function">
            ///     An optional callback that will be triggered when a child element is toggled
            /// </param>  
            /// <param name="editCallback" type="Function">
            ///     An optional callback that will be triggered when an attribute is double clicked
            /// </param>              
            /// <param name="selectCallback" type="Function">
            ///     An optional callback that will be triggered when a child element is selected
            /// </param>   
            /// <param name="keepExistingElements" type="Boolean" optional="true">
            ///     An optional parameter that specifies if we should keep any existing children
            ///     If false (or not specified) all children elements will be replaced with the new ones
            /// </param> 
            /// <param name="stopAutoScroll" type="Boolean" optional="true">
            ///     An optional parameter that specifies if we should not auto scroll the new items into view
            /// </param> 
            /// <returns type="Object">
            ///     A jquery object that was created that contains all the new elements wrapped in a span
            /// </returns> 
            
            var newElementsString = "<span class='BPT-HtmlTree-ChildCollection'>";
            
            var isShowingAll = true;
            var elementCount = elements.length;
            
            if (!this.data("forceShowAll")) {
                // Set the limit of nodes to display
                if (elementCount > initialElementLimit) {
                    elementCount = initialElementLimit;
                    isShowingAll = false;
                }
            }
            
            var existingIdMap = {};
            if (keepExistingElements) {
                // Generate a map of the existing element id's, so we don't overwrite ones that haven't changed
                var existingElements = this.children(".BPT-HtmlTree-ChildCollection").children();
                for (var elementIndex = 0; elementIndex < existingElements.length; elementIndex++) {
                    var uid = $(existingElements[elementIndex]).attr("data-id");
                    existingIdMap[uid] = true;
                }
            }
            
            for (var i = 0; i < elementCount; i++) {
            
                // Get the properties of this new element
                var id = elements[i].uid;
                var tag = elements[i].tag;
                var text = elements[i].text;
                var isExpandable = elements[i].hasChildren;
                var attributes = elements[i].attributes;
//+VWD
                var isDynamic = elements[i].isDynamic;
//-VWD
                var rootTagToShow = elements[i].rootTagToShow;
                
                if (!tag && (!text || !$.trim(text))) {
                    // Ignore empty text nodes
                    continue;
                }
                
                if (keepExistingElements && existingIdMap[id]) {
                    // Add a fake element as this id already exists and so we will just replace it with the original one
                    newElementsString += "<div class='replaceMe' data-id='" + id + "'></div>";
                    continue;
                }
                
                if (text) {
                    // Escape the < > for the text
                    text = toolwindowHelpers.htmlEscape(text);
                }
                
                // Create the header and footer
                var header;
                var footer;
                if (tag === "#document") {
                    // Document nodes
                    var rootHeader = "";
                    var rootFooter = "";
                    if (rootTagToShow) {
                        // Show a tag name for this document
                        var safeRootTag = toolwindowHelpers.htmlEscape(rootTagToShow);
                        rootHeader = "<span class='BPT-HTML'>&lt;</span><span class='BPT-HTML-Tag'>" + safeRootTag + "</span><span class='BPT-HTML'>&gt;</span>";
                        rootFooter = "<span class='BPT-HTML'>&lt;/</span><span class='BPT-HTML-Tag'>" + safeRootTag + "</span><span class='BPT-HTML'>&gt;</span>";
                    }
                    header = "<span class='BPT-HTML-Document'>" + rootHeader + "</span>";
                    footer = "<span class='BPT-HTML-Document'>" + rootFooter + "</span>";
                } else if (tag === "#doctype") {
                    // DocType nodes
                    header = "<span class='BPT-HTML-DocType'></span>";
                    footer = "<span class='BPT-HTML-DocType'></span>";
                } else if (tag === "#comment") {
                    // Comment nodes
                    header = "<span class='BPT-HTML-Comment'>&lt;!--</span>";
                    footer = "<span class='BPT-HTML-Comment'>--&gt;</span>";
                } else if (tag === null || tag === undefined) {
                    // Text nodes
                    header = "<span class='BPT-HTML-Text'></span>";
                    footer = "<span class='BPT-HTML-Text'></span>";
                } else {
                    // For All other nodes - Create the attributes if we have any
                    var attributesString = "";
                    if (attributes && attributes.length > 0) {
                        for (var j = 0; j < attributes.length; j++) {
//+VWD
                            if (vwdCode &&
                                attributes[j].name == vwdCode.dynamicKey) {
                                continue;
                            }

                            var attrValue = attributes[j].value;

                            if (attributes[j].name.length > 2 &&
                                (attributes[j].name[0] == 'o' || attributes[j].name[0] == 'O') &&
                                (attributes[j].name[1] == 'n' || attributes[j].name[1] == 'N')) {

                                // Remove instrumentation from event attributes.
                                var regexPush = /try\{__vwd[0-9a-z]+\.pu\([a-zA-Z0-9_\.\(\)]+,[^,]*,[^,]*,[0-9]*,[0-9]*\);/g;
                                var regexPop = /\}finally\{__vwd[0-9a-z\(\)]+\.po\(\);\}/g;
                                var regexPreamble = /var __vwd[0-9a-z]+=window\.__vwd\?window\.__vwd\:\{pu\:function\(\)\{\},po\:function\(\)\{\},sid\:function\(\)\{\}\};/g;

                                attrValue = attrValue.replace(regexPreamble, "").replace(regexPush, "").replace(regexPop, "");
                            }
//-VWD
                            attributesString += "<span class='BPT-HTML-Attribute-Section'> <span class='BPT-HTML-Attribute'>" + attributes[j].name + "</span><span class='BPT-HTML-Operator'>=</span>\"" +
                                                "<span class='BPT-HTML-Value' data-attrName='" + attributes[j].name + "'>" + toolwindowHelpers.htmlEscape(attrValue) + "</span>\"</span>";
                        }
                    }
                    
                    header = "&lt;<span class='BPT-HTML-Tag'>" + tag + "</span>" + attributesString + "<span class='BPT-HTML'>&gt;</span>";
                    footer = "&lt;/<span class='BPT-HTML-Tag'>" + tag + "</span><span class='BPT-HTML'>&gt;</span>";
                }

                var textContent = (text ? "<span class='BPT-HTML-Text'>" + text + "</span>" : "");
                
                var collapsedFooter = "<span class='BPT-HtmlTreeItem-CollapsedFooter'>" + (isExpandable ? "..." : "") + "<span class='BPT-HTML'>" + footer + "</span></span>";
                var expandIcon = (isExpandable ? "<div class='BPT-HtmlTreeItem-ExpandIcon' />" : "");
                var expandClass = (isExpandable ? " BPT-HtmlTreeItem-Collapsed" : "");
                
                // Document nodes should be hidden
                if (tag === "#document" && !rootTagToShow) {
                    textContent = "";
                    collapsedFooter = "";
                    expandIcon = "";
                    expandClass = " BPT-HtmlTreeItem-HiddenRoot BPT-HtmlTreeItem-Collapsed";
                }
                
                // Check for node numbering
                var nodeIndex = "";
                if (this.attr("data-tag") === "NodeList" || this.attr("data-tag") === "HtmlCollection") {
                    nodeIndex = "<span class='BPT-HTML BPT-HTML-Text BPT-HTML-Numbering'>" + i + "</span>";
                }
//+VWD
                var dynamicText = isDynamic ? " data-is-dynamic='true'" : "";

                newElementsString += "<div class='BPT-HtmlTreeItem" + expandClass + "' data-id='" + id + "' data-tag='" + (tag ? tag : "") + "'" + dynamicText + ">" + expandIcon + "<div class='BPT-HtmlTreeItem-Header'>" + nodeIndex + "<span class='BPT-HTML'>" + header + textContent + "</span>" + collapsedFooter + "</div><div class='BPT-HtmlTreeItem-Footer'><span class='BPT-HTML'>" + footer + "</span></div></div>";
//-VWD
            }

            if (!isShowingAll) {
                // Add the 'show all' link
                newElementsString += "<span class='BPT-HtmlTree-ChildCollection-ShowAll BPT-HtmlTreeItem'>" + "Showing " + elementCount + " of " + elements.length + ". Click to show all" + "</span>";
            }
            
            newElementsString += "</span>";

            // Create the new children
            var childrenCollection = $(newElementsString);
            if (toggleCallback || editCallback || selectCallback) {
                childrenCollection.data({
                    toggleCallback: toggleCallback,
                    editCallback: editCallback,
                    selectCallback: selectCallback
                });
            }
            
            var isFirstRow = !(this.hasClass("BPT-HtmlTreeItem"));
            if (isFirstRow) {
                // Append a new children collection span to the tree
                this.children(".BPT-HtmlTree").append(childrenCollection);
            } else {
                // Check to see if we need to replace nodes before appending them
                if (keepExistingElements) {
                    var existingChildrenCollection = this.children(".BPT-HtmlTree-ChildCollection");
                    if (existingChildrenCollection.length > 0) {
                        // Go through the new children and replace any fake nodes
                        var replaceableChildren = childrenCollection.children("div.replaceMe");
                        for (var index = 0; index < replaceableChildren.length; index++) {
                            // Get the id
                            var replaceableChild = $(replaceableChildren[index]);
                            var idToReplace = replaceableChild.attr("data-id");
                            
                            // Replace the node
                            var existingElement = existingChildrenCollection.children("div.BPT-HtmlTreeItem[data-id='" + idToReplace + "']");
                            replaceableChild.replaceWith(existingElement);
                        }
                        
                        // Check if the selected item is being removed, if so select another row
                        var selectedId = methods.getSelected.call(this).attr("data-id");
                        if (selectedId && existingIdMap[selectedId]) {
                            var found = childrenCollection.children("[data-id='" + selectedId + "'");
                            if (found.length === 0) {
                                // Select the closest available row
                                methods.select.call(this.closest(".BPT-HtmlTreeItem"));
                            }
                        }
                        
                        // Remove the existing collection, so we can replace it with the new one
                        existingChildrenCollection.remove();
                    }
                }
                
                // Append a new children collection span after the item's header
                this.children(".BPT-HtmlTreeItem-Header").after(childrenCollection);
            }

            if (!isShowingAll) {
                // We need to add the link handler
                var row = this;
                var showAll = childrenCollection.children(".BPT-HtmlTree-ChildCollection-ShowAll");
                if (showAll.length > 0) {
                
                    // Add the handler for clicking the link
                    showAll.bind("click", function (event) {
                        if (event.type === "click") {
                            row.data("forceShowAll", true);
                            methods.toggle.call(row);
                            methods.toggle.call(row);
                            row = null;
                        }
                    });
                }
            }
            
            if (!stopAutoScroll) {
                // Scroll the element to the top if the last child is out of view
                window.setTimeout(function () {
                    var child = childrenCollection.children().last();
                    var scrollContainer = child.closest(".BPT-HtmlTree-ScrollContainer")[0];
                    
                    // Don't move horizontally
                    if (scrollContainer) {
                        var x = scrollContainer.scrollLeft;
                        if (toolwindowHelpers.scrollIntoView(child.children(".BPT-HtmlTreeItem-Header")[0], scrollContainer)) {
                            childrenCollection.parent()[0].scrollIntoView(true);
                            scrollContainer.scrollLeft = x;
                        }
                    }
                }, 0);
            }

            return childrenCollection;
        },
//+VWD
        markAsDynamic: function () {
            /// <summary>
            ///     Mark this tree item as dynamically generated. 
            /// </summary>  

            this.attr("data-is-dynamic", "true");
        },
//-VWD        
        addAttribute: function (name, value) {
            /// <summary>
            ///     Adds an attribute to an HtmlTreeItem in the correct position
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object that the attribute was added to
            /// </returns>

            var attributesString = "<span class='BPT-HTML-Attribute-Section'> <span class='BPT-HTML-Attribute'>" + name + "</span><span class='BPT-HTML-Operator'>=</span>\"" +
                                   "<span class='BPT-HTML-Value' data-attrName='" + name + "'>" + value + "</span>\"</span>";

            // Add the new attribute after the existing ones
            var existingAttributes = this.find(".BPT-HtmlTreeItem-Header .BPT-HTML:first").children(".BPT-HTML-Attribute-Section");
            if (existingAttributes.length === 0) {
                this.find(".BPT-HtmlTreeItem-Header .BPT-HTML-Tag:first").after($(attributesString));
            } else {
                $(existingAttributes[existingAttributes.length - 1]).after($(attributesString));
            }
            
            return this;
        },
        
        showLoading: function (text) {
            /// <summary>
            ///     Shows a loading message if the item does not already have one
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object
            /// </returns>
            
            if (!this.hasClass("BPT-HtmlTreeItem-ShowingLoader")) {
                var newRowHtml = "<div class='BPT-HtmlTreeItem BPT-HtmlTreeItem-Loading'>" + text + "</div>";
                this.children(".BPT-HtmlTreeItem-Header").append($(newRowHtml));
                this.addClass("BPT-HtmlTreeItem-ShowingLoader");
            }
            return this;
        },
        
        hideLoading: function () {
            /// <summary>
            ///     Removes an existing loading message
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object
            /// </returns>        

            if (this.hasClass("BPT-HtmlTreeItem-ShowingLoader")) {
                this.removeClass("BPT-HtmlTreeItem-ShowingLoader");
                this.children(".BPT-HtmlTreeItem-Header").children(".BPT-HtmlTreeItem-Loading").remove();
            }
            return this;
        },        
        
        getChildren: function () {
            /// <summary>
            ///     Gets a jquery object of the children of this HtmlTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object of the children
            /// </returns>
            
            return this.children(".BPT-HtmlTree-ChildCollection").children(".BPT-HtmlTreeItem");
        },
        
        isCollapsed: function () {
            /// <summary>
            ///     Gets the collasped state of the HtmlTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     True if the HtmlTreeItem is collapsed, false if it is expanded
            /// </returns>
            
            return this.hasClass("BPT-HtmlTreeItem-Collapsed");
        },
        
        isExpanded: function () {
            /// <summary>
            ///     Gets the expanded state of the HtmlTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     True if the HtmlTreeItem is expanded, false if it is collapsed
            /// </returns>
            
            return this.hasClass("BPT-HtmlTreeItem-Expanded");
        },
        
        changeExpandableState: function (nowExpandable) {
            /// <summary>
            ///     Changes the state of an HtmlTreeItem element to be expandable or not
            /// </summary>  
            /// <param name="nowExpandable" type="Boolean">
            ///     True if the element should now be expandable, False otherwise
            /// </param>              
            /// <returns type="Object">
            ///     The jquery object that was changed
            /// </returns> 
            
            if (nowExpandable) {
                // Now expandable
                var expandIcon = $("<div class='BPT-HtmlTreeItem-ExpandIcon' />");
                this.prepend(expandIcon);
                
                this.find(".BPT-HtmlTreeItem-CollapsedFooter").prepend($("<span>...</span>"));
                this.find(".BPT-HTML-Text").remove();

                // Starts off collapsed if we have children
                this.addClass("BPT-HtmlTreeItem-Collapsed");
            } else {
                // No longer expandable
                this.remove(".BPT-HtmlTreeItem-ExpandIcon");
                this.find(".BPT-HtmlTreeItem-CollapsedFooter").remove(":first-child");
            }
            
            return this;
        },
        
        toggle: function (onExpandComplete) {
            /// <summary>
            ///     Toggles a row between collapsed and expanded views
            /// </summary>
            /// <param name="onExpandComplete" type="Function">
            ///     An optional callback that will be triggered when the toggle expansion has finished
            /// </param>            
            /// <returns type="Object">
            ///     The jquery object that was toggled
            /// </returns> 
        
            // Get the callback
            var toggleCallback = this.data("toggleCallback");
            toggleCallback = (toggleCallback ? toggleCallback : this.parent().data("toggleCallback"));
            
            // If it has a callback then it can be expanded
            if (toggleCallback) {
                // Fire the Begin code marker
                toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsTreeViewToggleBegin);
            
                if (this.hasClass("BPT-HtmlTreeItem-Collapsed")) {
                    // Expand
                    this.removeClass("BPT-HtmlTreeItem-Collapsed");
                    toggleCallback(true, this, this.attr("data-id"), onExpandComplete);
                    this.addClass("BPT-HtmlTreeItem-Expanded");
                } else {
                
                    if (this.hasClass("BPT-HtmlTreeItem-HiddenRoot")) {
                        return this;
                    }
                
                    // Collapse
                    this.removeClass("BPT-HtmlTreeItem-Expanded");
                    toggleCallback(false, this, this.attr("data-id"));
                    this.children(".BPT-HtmlTree-ChildCollection").remove();
                    this.addClass("BPT-HtmlTreeItem-Collapsed");
                    
// +VWD
                    if (onExpandComplete) {
                        onExpandComplete();
                    }
// -VWD

                    // Fire the End code marker
                    toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsTreeViewToggleEnd);
                }
            }
            return this;
        },
        
        getSelected: function () {
            /// <summary>
            ///     Gets the currently selected HtmlTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object that is selected
            /// </returns> 
            
            if (this.hasClass("BPT-HtmlTreeItem-Selected")) {
                return this;
            }
            
            var rootElement = this.closest(".BPT-HtmlTree");
            rootElement = (rootElement.length > 0 ? rootElement : this);
            return rootElement.find(".BPT-HtmlTreeItem-Selected:first");
        },
        
        select: function () {
            /// <summary>
            ///     Selects the HtmlTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object that was selected
            /// </returns> 
            
            var rootElement = this.closest(".BPT-HtmlTree");
            rootElement.find(".BPT-HtmlTreeItem-Selected").removeClass("BPT-HtmlTreeItem-Selected");

            this.addClass("BPT-HtmlTreeItem-Selected");
            
            var selectCallback = this.data("selectCallback");
            selectCallback = (selectCallback ? selectCallback : this.parent().data("selectCallback"));
            if (selectCallback) {
                selectCallback(this, this.attr("data-id"), this.attr("data-tag"));
            }
            return this;
        },
        
        clear: function () {
            /// <summary>
            ///     Removes all children
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object that was cleared
            /// </returns> 
            
            // We are removing all our children, so select ourselves instead (the parent node)
            var selectedChild = this.children().find(".BPT-HtmlTreeItem-Selected");
            if (selectedChild.length > 0) {
                methods.select.call(this);
            }
            
            this.children(".BPT-HtmlTree-ChildCollection").remove();
            if (this.hasClass("BPT-HtmlTree-Container")) {
                this.removeAttr("tabindex");
            }
            return this;
        }
    };

    $.fn.htmlTreeView = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        }
    };
}(jQuery));


// SIG // Begin signature block
// SIG // MIIaywYJKoZIhvcNAQcCoIIavDCCGrgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFE913KJOW1ON
// SIG // ssO2i+eEyGDuoINvoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBS7kTzL7wYV
// SIG // PRQXj2to2M18oBc9LzBuBgorBgEEAYI3AgEMMWAwXqBE
// SIG // gEIATQBpAGMAcgBvAHMAbwBmAHQAIABWAGkAcwB1AGEA
// SIG // bAAgAFMAdAB1AGQAaQBvACAAVwBlAGIAIABUAG8AbwBs
// SIG // AHOhFoAUaHR0cDovL3d3dy5hc3AubmV0LyAwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAi0+4wBAzsycFLD0R0pouYQ7wNPOr
// SIG // 7UQI9+cZdpD1zuBbHrGikdiwXsV/Qsab3nFFuKYpswyI
// SIG // rg+On218k1ygLem7O3nP3T2U2pSuQp/lvfX9eDJvhc8n
// SIG // Kph7IrwCb2tAl9FqxfKsfHlQujAXb3qMU5CYYLAK6kEZ
// SIG // zR4H3EDjRoC9n/9Nf2l+xP1/MMUkVXcCemM2f0Udi8CE
// SIG // LDORS1YtQAo71TDA2553WSBF17Q9M2dfBX8STvyzm8FP
// SIG // KyT0pPkh/M4TiVGYZuRUHSyHRkbGA1x37q8+A8xQ2inp
// SIG // 9SKjay7hUIW9ZxiZLJg3WHvanVXRGiTTgPzaljJEh0Ko
// SIG // ACQPnaGCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIB
// SIG // ATCBjjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQD
// SIG // ExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABv
// SIG // ZS1YbQcRRigAAAAAAG8wCQYFKw4DAhoFAKBdMBgGCSqG
// SIG // SIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkF
// SIG // MQ8XDTE1MDYxMzAxMzcxMlowIwYJKoZIhvcNAQkEMRYE
// SIG // FNnjROdtbOFpCm4VlPvea2/FTg7TMA0GCSqGSIb3DQEB
// SIG // BQUABIIBADrO5B5MGdrfFu5fQ+WzvgfE5t+dZQ7tsDiJ
// SIG // oP79F6vBuIk9m9AopfjJlEWT4JoUuG+oWt93yCz4A4g3
// SIG // sSiE+LQWQ9u0e7moI5NN4ZankW7yZStmi8Zl+gzBzb43
// SIG // qOgECzYFMIhxQ//9ZPkErQ19N8FRw8shj6LmBPLABjOy
// SIG // gjRKhhYfkgA0kdPZ51bNw/Ly4kYC3HLYXN3PpXOPCB8o
// SIG // ms4f0Q9bzd0uD3PL1n8e/3sN+45mL1eFSmDiAOJqfzLS
// SIG // xuS5yRBnydbIkdIEiHCeJK97LQ5T1VZ29ckztI6PbDvU
// SIG // WrVJX3k6QsN8/p9rStHnBqUCXNTCxWXLajRGhCCVZTo=
// SIG // End signature block
