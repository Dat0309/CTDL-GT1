// Expected global variables:
/*global jQuery toolwindowHelpers */

(function ($) {
    /// <summary>
    ///     DataTreeView - JQuery extension for constructing a tree view consisting of name value pairs, 
    ///     The data tree view object can be initialized by calling dataTreeView on a jQuery object.
    ///     Requires:
    ///     - datatree.css
    ///     - itemCollapsedIcon.png
    ///     - itemExpandedIcon.png
    ///     - itemCollapsedDarkThemeIcon.png
    ///     - itemExpandedDarkThemeIcon.png    
    /// </summary>
    
    // Styling information
    var dataTreeIndent = 10;
    var dataTreeInitialWidth = 170;
    var dataTreeMinWidth = 80;


    var methods = {
    
        // Default constructor
        init: function (properties) {
            /// <summary>
            ///     Creates a new DataTreeView for a BPT-DataTree-Container
            /// </summary>  
            /// <param name="properties" type="Object">
            ///     The properties for this DataTree in the following format:
            ///     {initialWidth: Number}
            /// </param>             
            /// <returns type="Object">
            ///     The jquery object for the new DataTreeView
            /// </returns>
            
            // Calculate the initial width of the tree
            var initialWidth = dataTreeInitialWidth;
            if (properties && properties.initialWidth) {
                initialWidth = properties.initialWidth;
            }
            
            var rootElement = $("<div class='BPT-DataTree' data-treeWidth='" + initialWidth + "'></div>");
            this.append(rootElement);

            var useDarkTheme = toolwindowHelpers.isDarkThemeBackground(rootElement);
            if (useDarkTheme) {
                rootElement.addClass("BPT-Tree-DarkTheme");
            } else {
                rootElement.removeClass("BPT-Tree-DarkTheme");
            }
            
            // Attach the event handlers if we need to
            if (!rootElement.data("attachedHandlers")) {
                var container = rootElement.parent(".BPT-DataTree-Container");
                
                container.bind("mousedown.dataTreeView", function (event) {
                    $(this).data("mouseActivate", true);
                });
                
                container.bind("click.dataTreeView", function (event) {
                    var element = $(event.target);
                    if (!element.is(".BPT-DataTreeItem-ChildCollection")) {
                        var row = element.closest(".BPT-DataTreeItem");
                        
                        if (row.length > 0) {
                            // If they clicked the expand icon, toggle the row
                            if (element.hasClass("BPT-DataTreeItem-ExpandIcon")) {
                                methods.toggle.call(row);
                            }
                            methods.select.call(row);
                        }
                    }
                });
                
                container.bind("dblclick.dataTreeView", function (event) {
                    var element = $(event.target);
                    var item = element.closest(".BPT-DataTreeItem, .BPT-DataTreeItem-EditableSection");
                    
                    if (item.length > 0) {
                        if (item.hasClass("BPT-DataTreeItem")) {
                            // Double clicking the row will expand/collapse it
                            if (item.hasClass("BPT-DataTreeItem-Collapsed") || item.hasClass("BPT-DataTreeItem-Expanded")) {
                                if (!element.hasClass("BPT-DataTreeItem-ExpandIcon")) {
                                    methods.toggle.call(item);
                                }
                            }
                        } else if (item.hasClass("BPT-DataTreeItem-EditableSection")) {
                            // Double clicking an attribute will edit it
                            var row = item.parents(".BPT-DataTreeItem:first");
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
     
                container.bind("focus.dataTreeView", function (event) {
                    if (!$(this).data("mouseActivate")) {
                        var element = $(this);
                        var selected = element.children(".BPT-DataTree").dataTreeView("getSelected");
                        if (selected.length === 0) {
                            selected = element.find(".BPT-DataTreeItem:first").dataTreeView("select");
                        }
                        
                        if (selected && selected.length > 0) {
                            var wasScrolled = toolwindowHelpers.scrollIntoView(selected.children(".BPT-DataTreeItem-Header")[0], selected.closest(".BPT-DataTree-ScrollContainer")[0]);
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
                
                container.bind("focusin.dataTreeView", function (event) {
                    $(this).addClass("BPT-DataTree-Container-CurrentFocus");
                });
                
                container.bind("focusout.dataTreeView", function (event) {
                    $(this).removeClass("BPT-DataTree-Container-CurrentFocus");
                });

                container.bind("keydown.dataTreeView", function (event) {
                    var selected;

                    if (event.keyCode >= 37 && event.keyCode <= 40) { // Arrow Keys
                    
                        // Don't do anything if we are inside a text input box
                        if ($(document.activeElement).is(":text")) {
                            return;
                        }

                        selected = methods.getSelected.call($(this).children(":first"));
                        
                        var moveUp = function (toParent) {
                            /// <summary>
                            ///     Moves the selection up to the previous node
                            /// </summary>
                            /// <param name="toParent" type="Boolean" optional="true">
                            ///     Optional parameter specifying if the jumps to parent nodes are allowed (default false)
                            /// </param>  

                            var newElement = null;
                            var sibling = selected.prev(".BPT-DataTreeItem:last");
                            if (sibling.length > 0 && !toParent) {
                                // Find the last child
                                newElement = sibling.find(".BPT-DataTreeItem:last");
                                
                                if (newElement.length === 0) {
                                    // Use the sibling instead
                                    newElement = sibling;
                                }
                            } else {
                                newElement = selected.parents(".BPT-DataTreeItem:first");
                            }
                            
                            if (newElement && newElement.length > 0) {
                                methods.select.call(newElement);
                                toolwindowHelpers.scrollIntoView(newElement.children(".BPT-DataTreeItem-Header")[0], newElement.closest(".BPT-DataTree-ScrollContainer")[0]);
                                event.preventDefault();
                                return false;
                            }
                        };
                        
                        var moveDown = function () {
                            /// <summary>
                            ///     Moves the selection down to the next node
                            /// </summary>

                            var newElement = selected.find(".BPT-DataTreeItem:first");
                            newElement = (newElement.length > 0 ? newElement : selected.next(".BPT-DataTreeItem:first"));
                            
                            var searchedParent = selected;
                            while (newElement.length === 0) {
                                searchedParent = searchedParent.parents(".BPT-DataTreeItem");
                                if (searchedParent.length === 0) {
                                    break;
                                }
                                newElement = searchedParent.next(".BPT-DataTreeItem:first");
                            }
                            
                            if (newElement && newElement.length > 0) {
                                methods.select.call(newElement);
                                toolwindowHelpers.scrollIntoView(newElement.children(".BPT-DataTreeItem-Header")[0], newElement.closest(".BPT-DataTree-ScrollContainer")[0]);
                                event.preventDefault();
                                return false;
                            }
                        };
                        
                        if (selected.length > 0) {
                            switch (event.keyCode) {
                                case 37: // Left(37)
                                    if (selected.hasClass("BPT-DataTreeItem-Expanded")) {
                                        methods.toggle.call(selected);
                                    } else {
                                        moveUp(true);
                                    }
                                    break;
                                    
                                case 38: // Up(38)
                                    moveUp();
                                    break;
                                    
                                case 39: // Right(39)
                                    if (selected.hasClass("BPT-DataTreeItem-Collapsed")) {
                                        methods.toggle.call(selected);
                                    } else if (selected.hasClass("BPT-DataTreeItem-Expanded")) {    
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
                        var element = $(this).children(".BPT-DataTree");
                        selected = element.dataTreeView("getSelected").children(".BPT-DataTreeItem-Header");
                        if (selected.length > 0) {
                            // Ensure we aren't currently editing a textbox, nor on an active link
                            if (document.activeElement && document.activeElement.type !== "text" && (document.activeElement.className && document.activeElement.className.indexOf("BPT-FileLink") === -1)) {
                                if (event.keyCode === 13) { // Enter(13)
                                
                                    // Find a double click edit control
                                    var valueNode = selected.find(".BPT-DataTreeItem-Value");
                                    var eventData = valueNode.data("events");
                                    if (eventData && eventData.dblclick) {
                                        valueNode.triggerHandler("dblclick");
                                        return false;
                                    }
                                }

                                // Find a checkbox or link
                                var clickable = selected.find("input[type='checkbox']");
                                clickable = (clickable.length > 0 ? clickable : selected.find("a"));

                                if (clickable.length === 0) {
                                    // Check for a file link
                                    var src = $(event.srcElement);
                                    if (src.hasClass("BPT-FileLink")) {
                                        clickable = src;
                                    } else {
                                        // Check for a file link in the header
                                        clickable = selected.find(".BPT-FileLink");
                                        
                                        if (clickable.length === 0) {
                                            // Check for a file link in the item itself
                                            clickable = element.dataTreeView("getSelected").children(".BPT-FileLink");
                                        }
                                    }
                                }
                                
                                if (clickable.length > 0) {
                                    // Activate the item
                                    clickable[0].click();
                                    return false;
                                } else if (event.keyCode === 32) { // Space(32)
                                
                                    // We didn't have an item to click and they were pressing space
                                    // so stop the scroll container from scrolling.
                                    return false;
                                }
                            }
                        }
                    } else if (event.keyCode === 9 && !event.shiftKey) { // Tab(9)
                        var tree = $(this).children(".BPT-DataTree");
                        var link = tree.dataTreeView("getSelected").children(".BPT-DataTreeItem-Header").find(".BPT-FileLink");
                        
                        if (link.length > 0 && document.activeElement !== link[0]) {
                            $(document.body).addClass("showFocus");
                            link[0].setActive();
                            link.focus();
                            return false;
                        }
                    }
                });
                container = null;
                rootElement.data("attachedHandlers", true);
            }
            
            
            var divider = $("<div class='BPT-DataTree-Divider' style='left:" + initialWidth + "px'></div>");
            divider.mousedown(function (e) {
                var prevCursor = document.body.style.cursor;
                document.body.style.cursor = "w-resize";
                    
                var offsetX = divider.offset().left;
                var startX = divider.position().left;
                
                divider.addClass("BPT-DataTree-DividerVisible");
                
                // Create mouse handlers for resizing
                var mouseMoveHandler, mouseUpHandler;
                mouseMoveHandler = function (e) {
                    // If the user triggered the 'mouseup' event outside the tool window
                    if (!window.event.button) {
                        mouseUpHandler();
                    }

                    var newWidth = startX + (e.pageX - offsetX);
                    if (newWidth < dataTreeMinWidth) {
                        newWidth = dataTreeMinWidth;
                    }

                    divider.css("left", newWidth);
                };
                mouseUpHandler = function () {
                    $(document).unbind("mousemove", mouseMoveHandler);
                    $(document).unbind("mouseup", mouseUpHandler);
                    document.body.style.cursor = prevCursor;
                    
                    divider.removeClass("BPT-DataTree-DividerVisible");
                    
                    var rootElement = divider.parent();
                    var treeWidth = parseInt(rootElement.children(":first").css("left"), 10);
                    rootElement.find(".BPT-DataTreeItem:not(.BPT-DataTreeItem-CollapsibleBlock)").each(function () {
                        var element = $(this);
                        var indent = parseInt(element.attr("data-indent"), 10);
                        element.find(".BPT-DataTreeItem-Header:first .BPT-DataTreeItem-Name").width(treeWidth - indent);
                    });
                    rootElement.attr("data-treeWidth", treeWidth);
                };
                $(document).bind("mousemove", mouseMoveHandler);
                $(document).bind("mouseup", mouseUpHandler);
                
                // Prevent highlighting text while resizing
                // This also stops resizing while the cursor is outside our window.
                e.stopImmediatePropagation();
                e.preventDefault();
            });
            rootElement.append(divider);

            
            return this;
        },
        
        destroy : function () {
            /// <summary>
            ///     Disposes of a DataTreeView and removes all data and event handlers
            /// </summary> 
            
            // Remove event handlers
            if (this.data("attachedHandlers")) {
                this.parent(".BPT-DataTree-Container").unbind(".dataTreeView");
                this.data("attachedHandlers", false);
            }
        },
        
        addSingleItem: function (id, name, value) {
            /// <summary>
            ///     Adds a single item to the DataTreeItem
            /// </summary>
            /// <param name="id" type="String">
            ///     An identifier to use for this item
            /// </param>  
            /// <param name="name" type="String">
            ///     The name column
            /// </param>  
            /// <param name="value" type="String">
            ///     The value column
            /// </param>                      
            /// <returns type="Object">
            ///     The jquery object that was created
            /// </returns> 
            
            var item = {uid: id, name: name, value: value, hasChildren: false};
            var childrenCollection = methods.addItems.call(this, [item]);
            return childrenCollection.children(":last");
        },
        
        addItems: function (items, toggleCallback, editCallback, selectCallback, stopAutoScroll) {
            /// <summary>
            ///     Adds an array of items to the DataTreeItem
            /// </summary>
            /// <param name="items" type="Array">
            ///     An array of objects that describe the children items, in the following format:
            ///     [{uid: String, name: String, value: String, hasChildren: Boolean}]
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
            /// <param name="stopAutoScroll" type="Boolean">
            ///     An optional parameter that specifies if we should not auto scroll the new items into view
            /// </param>             
            /// <returns type="Object">
            ///     A jquery object that was created that contains all the new elements wrapped in a span
            /// </returns> 
            
            var newItemsString = "<span class='BPT-DataTreeItem-ChildCollection'>";
            
            var isDataTree = !(this.hasClass("BPT-DataTreeItem"));
            var indent = isDataTree ? 0 : (this.parents(".BPT-DataTreeItem").length + 1) * dataTreeIndent;
            var initialWidth = (isDataTree ? this.children(".BPT-DataTree").attr("data-treeWidth") : this.closest(".BPT-DataTree").attr("data-treeWidth")) - indent;
            
            for (var i = 0; i < items.length; i++) {
            
                // Get the properties of this new element
                var id = items[i].uid;
                var name = items[i].name;
                var value = items[i].value;
                var isExpandable = items[i].hasChildren;
                var link = items[i].link;
                var blockOpenText = items[i].blockOpenText;
                var blockCloseText = items[i].blockCloseText;
                var blockIsInline = items[i].blockIsInline;
                var tooltip = items[i].alreadyEncodedTooltip;

                var tooltipPart = (tooltip ? " title='" + tooltip + "'" : "");
                
                var nameElement = "";
                var valueElement = "";
                var collapsibleBlockFooter = "";
                
                if (blockIsInline) {
                    // Inline blocks do not need a header and footer
                    nameElement = "<span class='BPT-DataTreeItem-Name' style='width:" + initialWidth + "px'>" + name + (blockOpenText ? "<span>" + blockOpenText + "</span>" : "") + "</span>";
                    valueElement = "<span class='BPT-DataTreeItem-Value'>" + value + (blockCloseText ? "<span>" + blockCloseText + "</span>" : "") + "</span>";
                } else {
                    // Blocks
                    var nameStyle = "";

                    // Block's might require a header that collapses
                    var collapsibleBlockHeader = "";
                    if (blockOpenText && blockCloseText) {
                        collapsibleBlockHeader = "<span> " + blockOpenText + "</span><span class='BPT-DataTreeItem-CollapsedBlockFooter'>..." + blockCloseText + "</span>";
                        collapsibleBlockFooter = "<span class='BPT-DataTreeItem-BlockFooter'>" + blockCloseText + "</span>";
                    } else {
                        // Non-collapsible requires that we set the width
                        nameStyle = "width: " + initialWidth + "px";
                    }

                    nameElement = "<span class='BPT-DataTreeItem-Name' style='" + nameStyle + "'>" + name + collapsibleBlockHeader + "</span>";
                    valueElement = "<span class='BPT-DataTreeItem-Value'>" + value + "</span>";
                }

                var expandIcon = (isExpandable ? "<div class='BPT-DataTreeItem-ExpandIcon' />" : "");
                var expandClass = (isExpandable ? " BPT-DataTreeItem-Collapsed" : "");
                var blockClass = (collapsibleBlockFooter ? " BPT-DataTreeItem-CollapsibleBlock" : "");
                
                // Generate the link and select its location
                var linkElement = toolwindowHelpers.createLinkDivText(link, "BPT-DataTreeItem-FileLink-Right");
                var linkElementInline = (collapsibleBlockFooter ? "" : linkElement);
                var linkElementCollapsible = (collapsibleBlockFooter ? linkElement : "");
                
                newItemsString += "<div class='BPT-DataTreeItem" + expandClass + blockClass + "' data-id='" + id + "' data-indent='" + indent + "'" + tooltipPart + ">" + expandIcon + linkElementCollapsible + "<div class='BPT-DataTreeItem-Header'>" + nameElement + valueElement + linkElementInline + "</div>" + collapsibleBlockFooter + "</div>";
            }
            
            newItemsString += "</span>";
            
            // Create the new children
            var childrenCollection = $(newItemsString);
            if (toggleCallback || editCallback || selectCallback) {
                childrenCollection.data({
                    toggleCallback: toggleCallback,
                    editCallback: editCallback,
                    selectCallback: selectCallback
                });
            }
            
            // Get the header that will contain the new children
            var header = (isDataTree ? this.children(".BPT-DataTree") : this.children(".BPT-DataTreeItem-Header"));
            
            var childHolder = (isDataTree ? header.children(".BPT-DataTreeItem-ChildCollection") : header.siblings(".BPT-DataTreeItem-ChildCollection"));
            if (childHolder.length > 0) {
                // We already have some children, so append to the existing ones
                childrenCollection.children().appendTo(childHolder);
                childrenCollection = childHolder;
            } else {
                // New children
                if (isDataTree) {
                    header.append(childrenCollection);
                } else {
                    header.after(childrenCollection);
                }
            }
            
            // Calculate the width to use before wrapping any collapsible blocks with links
            var links = childrenCollection.find(".BPT-DataTreeItem-FileLink-Right");
            for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
                var width = links[linkIndex].clientWidth + 10;
                if (links[linkIndex].parentNode.className.indexOf("BPT-DataTreeItem-CollapsibleBlock") >= 0) {
                    links[linkIndex].nextSibling.style.maxWidth = "calc(100% - " + width + "px)";
                } else {
                    links[linkIndex].parentNode.style.minWidth = "calc(100% - 10px)";
                }
            }

            if (!stopAutoScroll) {
                // Scroll the element to the top if the last child is out of view
                window.setTimeout(function () {
                    var child = childrenCollection.children().last();
                    var scrollContainer = child.closest(".BPT-DataTree-ScrollContainer")[0];
                    
                    // Don't move horizontally
                    if (scrollContainer) {
                        var x = scrollContainer.scrollLeft;
                        if (toolwindowHelpers.scrollIntoView(child.children(".BPT-DataTreeItem-Header")[0], scrollContainer)) {
                            childrenCollection[0].scrollIntoView(true);
                            scrollContainer.scrollLeft = x;
                        }
                    }
                }, 0);
            }
            
            return childrenCollection;
        },
        
        showLoading: function (text) {
            /// <summary>
            ///     Shows a loading message if the item does not already have one
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object
            /// </returns>
            
            if (!this.hasClass("BPT-DataTreeItem-ShowingLoader")) {
                var newRowHtml = "<div class='BPT-DataTreeItem BPT-DataTreeItem-Loading'>" + text + "</div>";
                this.append($(newRowHtml));
                this.addClass("BPT-DataTreeItem-ShowingLoader");
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

            if (this.hasClass("BPT-DataTreeItem-ShowingLoader")) {
                this.removeClass("BPT-DataTreeItem-ShowingLoader");
                this.children(".BPT-DataTreeItem-Loading").remove();
            }
            return this;
        },
        
        getChildren: function () {
            /// <summary>
            ///     Gets a jquery object of the children of this DataTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object of the children
            /// </returns>
            
            if (this.hasClass("BPT-DataTree-Container")) {
                return this.children(":first").children(".BPT-DataTreeItem-ChildCollection").children(".BPT-DataTreeItem");
            } else {
                return this.children(".BPT-DataTreeItem-ChildCollection").children(".BPT-DataTreeItem");
            }
        },
        
        getName: function () {
            /// <summary>
            ///     Gets a jquery object of the name side of the DataTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object of the name
            /// </returns>
            
            var nameNode = this.find("span.BPT-DataTreeItem-Name:first");
            var cssName = nameNode.children("span.BPT-HTML-CSS-Name");
            return (cssName.length === 1 ? cssName : nameNode);
        },
        
        getValue: function () {
            /// <summary>
            ///     Gets a jquery object of the value side of the DataTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object of the value
            /// </returns>

            var valueNode = this.find("span.BPT-DataTreeItem-Value:first");
            var cssValue = valueNode.children("span.BPT-HTML-CSS-Value");
            return (cssValue.length === 1 ? cssValue : valueNode);
        },        
        
        isCollapsed: function () {
            /// <summary>
            ///     Gets the collasped state of the DataTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     True if the DataTreeItem is collapsed, false if it is expanded
            /// </returns>
            
            return this.hasClass("BPT-DataTreeItem-Collapsed");
        },
        
        isExpanded: function () {
            /// <summary>
            ///     Gets the expanded state of the DataTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     True if the DataTreeItem is expanded, false if it is collapsed
            /// </returns>
            
            return this.hasClass("BPT-DataTreeItem-Expanded");
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
                toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsDataTreeToggleBegin);
            
                if (this.hasClass("BPT-DataTreeItem-Collapsed")) {
                    // Expand
                    this.removeClass("BPT-DataTreeItem-Collapsed");
                    toggleCallback(true, this, this.attr("data-id"), onExpandComplete);
                    this.addClass("BPT-DataTreeItem-Expanded");
                } else {
                    // Collapse
                    this.removeClass("BPT-DataTreeItem-Expanded");
                    toggleCallback(false, this, this.attr("data-id"));
                    this.children(".BPT-DataTreeItem-ChildCollection").remove();
                    this.addClass("BPT-DataTreeItem-Collapsed");
                
                    // Fire the End code marker
                    toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsDataTreeToggleEnd);
                }
                
            }
            return this;
        },
        
        getSelected: function () {
            /// <summary>
            ///     Gets the currently selected DataTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object that is selected
            /// </returns> 
            
            if (this.hasClass("BPT-DataTreeItem-Selected")) {
                return this;
            }
            
            var rootElement = this.closest(".BPT-DataTree");
            rootElement = (rootElement.length > 0 ? rootElement : this);
            return rootElement.find(".BPT-DataTreeItem-Selected:first");
        },
        
        select: function () {
            /// <summary>
            ///     Selects the DataTreeItem
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object that was selected
            /// </returns> 
            
            var rootElement = this.closest(".BPT-DataTree");
            rootElement.find(".BPT-DataTreeItem-Selected").removeClass("BPT-DataTreeItem-Selected");

            this.addClass("BPT-DataTreeItem-Selected");
            
            // Remove focus from a link if there is one
            if (document.activeElement && document.activeElement.className && document.activeElement.className.indexOf("BPT-FileLink") >= 0) {
                var container = rootElement.parent(".BPT-DataTree-Container");
                container[0].setActive();
                container.focus();
            }
            
            var selectCallback = this.data("selectCallback");
            selectCallback = (selectCallback ? selectCallback : this.parent().data("selectCallback"));
            if (selectCallback) {
                selectCallback(this, this.attr("data-id"), this.attr("data-tag"));
            }
            this.trigger("itemSelected");
            return this;
        },        
        
        clear: function () {
            /// <summary>
            ///     Removes all children
            /// </summary>  
            /// <returns type="Object">
            ///     The jquery object that was cleared
            /// </returns> 
            
            this.children(".BPT-DataTreeItem-ChildCollection").remove();
            if (this.hasClass("BPT-DataTree-Container")) {
                this.children(":first").children(".BPT-DataTreeItem-ChildCollection").remove();
            }
            return this;
        },
        
        removeAndSelect: function () {
            /// <summary>
            ///     Removes all children and the node itself, and selects the next nearest item
            /// </summary>  
            
            var select = this.prev(".BPT-DataTreeItem");
            select = (select.length > 0 ? select : this.next(".BPT-DataTreeItem"));
            
            this.remove();
            
            if (select.length > 0) {
                methods.select.call(select);
            }
        }
        
    };

    $.fn.dataTreeView = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        }
        return this;
    };
}(jQuery));

// SIG // Begin signature block
// SIG // MIIaywYJKoZIhvcNAQcCoIIavDCCGrgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFKeKwhvBVd1c
// SIG // 7F4CXI2puY532nvKoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTV47Caz7Oi
// SIG // R2N4KDT37x/y4cwd7zBuBgorBgEEAYI3AgEMMWAwXqBE
// SIG // gEIATQBpAGMAcgBvAHMAbwBmAHQAIABWAGkAcwB1AGEA
// SIG // bAAgAFMAdAB1AGQAaQBvACAAVwBlAGIAIABUAG8AbwBs
// SIG // AHOhFoAUaHR0cDovL3d3dy5hc3AubmV0LyAwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAD+1JekQUYCWeg6vaiPf9wga86Al8
// SIG // dPXp4WLTgdtijlutKpWDgCMDwfvWE4ZHl4HF1gbG3bdd
// SIG // 5Sp7tt8eq8c8pS1Ywp0KYzrVgsC2E3r/ctma3QhM0+Mu
// SIG // U+SrFESYCOK82uY6032sf/oDi9/51G56wNw/5zY9cb2I
// SIG // bu1a4+HTKqcDj+QEmNjqtKcMlM2kY6ijcSqURnlUk0i1
// SIG // nlDCGhvoDqfuUZztr4gX8tAbhWDNBS8n+Y2FIXDJe7jC
// SIG // g4dYQQRLx8mJJLV+m4S0zlvQYfAZ9LMZm2SbeDDZT1fs
// SIG // X9keSedcMjNRXMwwMyulIs7tvElkLhDLiBxfFYXayzXh
// SIG // DJE9RqGCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIB
// SIG // ATCBjjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQD
// SIG // ExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABw
// SIG // 9Bi/IyH8UJ0AAAAAAHAwCQYFKw4DAhoFAKBdMBgGCSqG
// SIG // SIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkF
// SIG // MQ8XDTE1MDYxMzAxMzcxMlowIwYJKoZIhvcNAQkEMRYE
// SIG // FCaIuhQX1pbB3jY2TtbU6sCjb1WkMA0GCSqGSIb3DQEB
// SIG // BQUABIIBAJ+sP9eaMhnFgFNn7Pwj2Nd0VaaFhaQLncAQ
// SIG // lRKuRZaqdFHEuBJzD4Vnhi3J7xyY42wmVszA83CkrlHq
// SIG // G7GZ9agOudseJtmVNSjp+c4o9vczkvKlfphpq1aVMVwZ
// SIG // YAndgO5OC6VNOzVGoanVYoITGymqEE9rw35oTeK+4di9
// SIG // Hs2VVDu8cwxe7duxrPXNdcXI0S2Z8DU3bOobichdYVE8
// SIG // WiQoXoB9w1gd43Dcra8sqiiaeZ805Z8tFAECDZucY+TO
// SIG // ic5iPVNue3otmR2Xnp+5w9blGh1e4ba74bTkaJ1kQSDZ
// SIG // NCZn6Ei4BHJxuM7MsCQwaI3cv/6Aqh5lXoklRdv0Voc=
// SIG // End signature block
