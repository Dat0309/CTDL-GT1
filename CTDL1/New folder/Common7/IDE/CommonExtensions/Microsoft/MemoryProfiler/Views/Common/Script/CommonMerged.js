//
// Copyright (C) Microsoft. All rights reserved.
//
// ComponentModel.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Controls) {
            "use strict";

            var ObservableViewModel = (function () {
                function ObservableViewModel() {
                    this._propertyChangedObservers = [];
                }
                ObservableViewModel.prototype.registerPropertyChanged = function (observer) {
                    this._propertyChangedObservers.push(observer);
                };

                ObservableViewModel.prototype.removePropertyChanged = function (observer) {
                    var index = this._propertyChangedObservers.indexOf(observer);
                    if (index >= 0) {
                        this._propertyChangedObservers = this._propertyChangedObservers.splice(index, 1);
                    }
                };

                ObservableViewModel.prototype.raisePropertyChanged = function (propertyName) {
                    for (var i = 0; i < this._propertyChangedObservers.length; i++) {
                        this._propertyChangedObservers[i].onPropertyChanged(propertyName);
                    }
                };
                return ObservableViewModel;
            })();
            Controls.ObservableViewModel = ObservableViewModel;

            (function (NotifyCollectionChangedAction) {
                NotifyCollectionChangedAction[NotifyCollectionChangedAction["Add"] = 0] = "Add";
                NotifyCollectionChangedAction[NotifyCollectionChangedAction["Reset"] = 1] = "Reset";
                NotifyCollectionChangedAction[NotifyCollectionChangedAction["Replace"] = 2] = "Replace";
            })(Controls.NotifyCollectionChangedAction || (Controls.NotifyCollectionChangedAction = {}));
            var NotifyCollectionChangedAction = Controls.NotifyCollectionChangedAction;

            var NotifyCollectionChangedEventArgs = (function () {
                function NotifyCollectionChangedEventArgs(action, newItems, newStartingIndex, oldItems, oldStartingIndex) {
                    this._action = action;
                    this._newItems = newItems;
                    this._newStartingIndex = newStartingIndex;
                    this._oldItems = oldItems;
                    this._oldStartingIndex = oldStartingIndex;
                }
                Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "action", {
                    get: function () {
                        return this._action;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "newItems", {
                    get: function () {
                        return this._newItems;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "newStartingIndex", {
                    get: function () {
                        return this._newStartingIndex;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "oldItems", {
                    get: function () {
                        return this._oldItems;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "oldStartingIndex", {
                    get: function () {
                        return this._oldStartingIndex;
                    },
                    enumerable: true,
                    configurable: true
                });
                return NotifyCollectionChangedEventArgs;
            })();
            Controls.NotifyCollectionChangedEventArgs = NotifyCollectionChangedEventArgs;

            var ObservableCollection = (function () {
                function ObservableCollection() {
                    this._items = [];
                    this._collectionChangedObservers = [];
                }
                ObservableCollection.prototype.registerCollectionChanged = function (observer) {
                    this._collectionChangedObservers.push(observer);
                };

                ObservableCollection.prototype.removeCollectionChanged = function (observer) {
                    var index = this._collectionChangedObservers.indexOf(observer);
                    if (index >= 0) {
                        this._collectionChangedObservers = this._collectionChangedObservers.splice(index, 1);
                    }
                };

                ObservableCollection.prototype.add = function (item) {
                    this._items.push(item);

                    var args = new NotifyCollectionChangedEventArgs(0 /* Add */, [item], this._items.length - 1, [], 0);
                    this.onCollectionChanged(args);
                };

                ObservableCollection.prototype.replace = function (index, newItem) {
                    if (index >= 0 && index < this._items.length) {
                        var oldItem = this._items[index];
                        this._items[index] = newItem;
                        var args = new NotifyCollectionChangedEventArgs(2 /* Replace */, [newItem], index, [oldItem], index);
                        this.onCollectionChanged(args);
                    }
                };

                ObservableCollection.prototype.clear = function () {
                    var oldItems = this._items;
                    this._items = [];
                    var args = new NotifyCollectionChangedEventArgs(1 /* Reset */, [], 0, oldItems, oldItems.length - 1);
                    this.onCollectionChanged(args);
                };

                ObservableCollection.prototype.getItem = function (index) {
                    return this._items[index];
                };

                Object.defineProperty(ObservableCollection.prototype, "length", {
                    get: function () {
                        return this._items.length;
                    },
                    enumerable: true,
                    configurable: true
                });

                ObservableCollection.prototype.onCollectionChanged = function (eventArgs) {
                    for (var i = 0; i < this._collectionChangedObservers.length; i++) {
                        this._collectionChangedObservers[i].onCollectionChanged(eventArgs);
                    }
                };
                return ObservableCollection;
            })();
            Controls.ObservableCollection = ObservableCollection;
        })(Common.Controls || (Common.Controls = {}));
        var Controls = Common.Controls;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ComponentModel.js.map

// Control.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Controls) {
            "use strict";

            var Control = (function () {
                function Control(root) {
                    this._rootElement = root;

                    if (typeof this._rootElement === "undefined") {
                        this._rootElement = document.createElement("div");
                        this._rootElement.style.width = this._rootElement.style.height = "100%";
                    } else if (this._rootElement === null) {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1017"));
                    }
                }
                Control.prototype.appendChild = function (child) {
                    this._rootElement.appendChild(child.rootElement);
                    child.parent = this;
                };

                Control.prototype.removeChild = function (child) {
                    this._rootElement.removeChild(child.rootElement);
                    child.parent = null;
                };

                Object.defineProperty(Control.prototype, "rootElement", {
                    get: function () {
                        return this._rootElement;
                    },
                    set: function (newRoot) {
                        if (!newRoot) {
                            throw new Error(Plugin.Resources.getErrorString("JSPerf.1018"));
                        }

                        var oldRoot = this._rootElement;
                        this._rootElement = newRoot;

                        if (oldRoot && oldRoot.parentNode) {
                            oldRoot.parentNode.replaceChild(newRoot, oldRoot);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Control.prototype, "parent", {
                    get: function () {
                        return this._parent;
                    },
                    set: function (newParent) {
                        if (this._parent !== newParent) {
                            this._parent = newParent;
                            if (this._parent && !this._parent.rootElement.contains(this._rootElement)) {
                                this._parent.appendChild(this);
                            }

                            this.onParentChanged();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Control.prototype.onParentChanged = function () {
                };
                return Control;
            })();
            Controls.Control = Control;
        })(Common.Controls || (Common.Controls = {}));
        var Controls = Common.Controls;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=Control.js.map

// ContentControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Controls) {
            "use strict";

            var ContentControl = (function (_super) {
                __extends(ContentControl, _super);
                function ContentControl() {
                    _super.call(this);
                }
                Object.defineProperty(ContentControl.prototype, "content", {
                    get: function () {
                        return this._content;
                    },
                    set: function (newContent) {
                        if (this._content !== newContent) {
                            if (this._content) {
                                this.removeChild(this._content);
                            }

                            this._content = newContent;
                            this.appendChild(this._content);

                            this.onContentChanged();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                ContentControl.prototype.appendChild = function (child) {
                    if (this.rootElement.children.length != 0) {
                        throw new Error(Plugin.Resources.getErrorString("MemProf.1016"));
                    }
                    _super.prototype.appendChild.call(this, child);
                };

                ContentControl.prototype.onContentChanged = function () {
                };
                return ContentControl;
            })(MemoryProfiler.Common.Controls.Control);
            Controls.ContentControl = ContentControl;
        })(Common.Controls || (Common.Controls = {}));
        var Controls = Common.Controls;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ContentControl.js.map

// TemplateControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Controls) {
            "use strict";

            var TemplateControl = (function (_super) {
                __extends(TemplateControl, _super);
                function TemplateControl(templateName) {
                    _super.call(this);

                    this._idPostfix = TemplateControl._globalIdPostfix++;

                    if (templateName) {
                        this.setTemplateFromName(templateName);
                    }
                }
                TemplateControl.prototype.setTemplateFromName = function (templateName) {
                    var root = this.getTemplateElementCopy(templateName);
                    this.adjustElementIds(root);
                    this.rootElement = root;
                };

                TemplateControl.prototype.setTemplateFromHTML = function (htmlContent) {
                    var root = this.getTemplateElementFromHTML(htmlContent);
                    this.adjustElementIds(root);
                    this.rootElement = root;
                };

                TemplateControl.prototype.findElement = function (id) {
                    var fullId = id + this._idPostfix;
                    return this.forAllSelfAndDescendants(this.rootElement, function (elem) {
                        if (elem.id && elem.id === fullId) {
                            return false;
                        }
                        return true;
                    });
                };

                TemplateControl.prototype.findElementsByClassName = function (className) {
                    var elements = [];

                    this.forAllSelfAndDescendants(this.rootElement, function (elem) {
                        if (elem.classList && elem.classList.contains(className)) {
                            elements.push(elem);
                        }

                        return true;
                    });

                    return elements;
                };

                TemplateControl.prototype.getTemplateElementCopy = function (templateName) {
                    var templateElement = document.getElementById(templateName);
                    if (!templateElement) {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1023"));
                    }

                    if (templateElement.tagName.toLowerCase() !== "script") {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1024"));
                    }

                    return this.getTemplateElementFromHTML(templateElement.innerHTML);
                };

                TemplateControl.prototype.getTemplateElementFromHTML = function (htmlContent) {
                    var root = this.getTemplateRootElement();
                    root.innerHTML = htmlContent;

                    if (root.childElementCount === 1) {
                        root = root.firstElementChild;
                    }

                    return root;
                };

                TemplateControl.prototype.getTemplateRootElement = function () {
                    var div = document.createElement("div");
                    div.style.width = div.style.height = "100%";
                    return div;
                };

                TemplateControl.prototype.adjustElementIds = function (root) {
                    var idPostfix = this._idPostfix;
                    this.forAllSelfAndDescendants(root, function (elem) {
                        if (elem.id) {
                            elem.id = elem.id + idPostfix;
                        }
                        return true;
                    });
                };

                TemplateControl.prototype.forAllSelfAndDescendants = function (root, func) {
                    var brokeAtElement = null;

                    if (!func(root)) {
                        brokeAtElement = root;
                    } else {
                        if (root.children) {
                            var children = root.children;
                            var childrenLength = children.length;
                            for (var i = 0; i < childrenLength; i++) {
                                brokeAtElement = this.forAllSelfAndDescendants(children[i], func);
                                if (brokeAtElement) {
                                    break;
                                }
                            }
                        }
                    }

                    return brokeAtElement;
                };
                TemplateControl._globalIdPostfix = 1;
                return TemplateControl;
            })(MemoryProfiler.Common.Controls.Control);
            Controls.TemplateControl = TemplateControl;
        })(Common.Controls || (Common.Controls = {}));
        var Controls = Common.Controls;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=TemplateControl.js.map

// MenuControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Controls) {
            "use strict";

            var MenuItem = (function () {
                function MenuItem(itemText, ownerControl, canToggle, initialState) {
                    if (typeof canToggle === "undefined") { canToggle = false; }
                    if (typeof initialState === "undefined") { initialState = false; }
                    this.element = document.createElement("li");

                    if (canToggle) {
                        this._toggleIcon = document.createElement("img");
                        this.element.appendChild(this._toggleIcon);
                        this._toggleIcon.className = "menuToggleIcon";
                        this._toggleIcon.src = Plugin.Theme.getValue("image-checkmark");
                        this.toggled = initialState;
                        this.element.addEventListener("DOMAttrModified", this.onAriaCheckedModified.bind(this));
                    }

                    var span = document.createElement("span");
                    this.element.appendChild(span);
                    span.innerText = itemText;
                }
                Object.defineProperty(MenuItem.prototype, "toggled", {
                    get: function () {
                        return this._toggled;
                    },
                    set: function (v) {
                        this._toggled = v;
                        if (this._toggled) {
                            this._toggleIcon.classList.remove("hiddenCheckMark");
                            this.element.setAttribute("aria-checked", "true");
                        } else {
                            this._toggleIcon.classList.add("hiddenCheckMark");
                            this.element.setAttribute("aria-checked", "false");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                MenuItem.prototype.onAriaCheckedModified = function (event) {
                    if (event.attrName === "aria-checked") {
                        var checked = event.newValue === "true";
                        if (this.toggled !== checked)
                            this.toggled = checked;
                    }
                };
                return MenuItem;
            })();
            Controls.MenuItem = MenuItem;

            var MenuControl = (function (_super) {
                __extends(MenuControl, _super);
                function MenuControl(target) {
                    var _this = this;
                    _super.call(this);

                    this._target = target;
                    this._isVisible = false;

                    this.setTemplateFromHTML("<ul id=\"menuControl\" class=\"menuControl\" role=\"menu\"></ul>");

                    this._listElement = this.findElement("menuControl");
                    this._listElement.setAttribute("aria-hidden", "true");

                    this._closeMenuFunction = this.closeMenu.bind(this);
                    document.body.addEventListener("keydown", function (e) {
                        if (e.keyCode === 27 /* ESCAPE */) {
                            _this.closeMenu();
                        }
                    });

                    target.onclick = this.showMenu.bind(this);
                    target.onkeydown = function (e) {
                        if (e.keyCode === 13 /* ENTER */ || e.keyCode === 32 /* SPACE */) {
                            if (!_this._isVisible)
                                _this.showMenu();
                            else
                                _this.closeMenu();
                        }
                    };
                    target.appendChild(this._listElement);
                    target.setAttribute("role", "button");
                    target.setAttribute("aria-haspopup", "true");
                    target.setAttribute("aria-owns", this._listElement.id.toString());
                    target.addEventListener("keydown", function (e) {
                        if ((e.keyCode === 40 /* ARROW_DOWN */) && (_this._isVisible)) {
                            _this._listElement.firstElementChild.focus();
                        }
                    });
                }
                MenuControl.prototype.getMenuItem = function (index) {
                    if (index >= 0 && index < this._listElement.children.length) {
                        return this._listElement.children[index];
                    }

                    return null;
                };

                MenuControl.prototype.addToggleItem = function (itemText, itemCallback, initialState, tabIndex) {
                    if (typeof initialState === "undefined") { initialState = false; }
                    if (typeof tabIndex === "undefined") { tabIndex = 0; }
                    var menuItem = new MenuItem(itemText, this, true, initialState);
                    this._listElement.appendChild(menuItem.element);

                    menuItem.element.tabIndex = tabIndex;
                    menuItem.element.setAttribute("role", "menuitemcheckbox");

                    menuItem.element.onclick = (function (e) {
                        menuItem.toggled = itemCallback(e);
                        e.stopImmediatePropagation();
                    });

                    menuItem.element.onkeydown = function (e) {
                        if (e.keyCode === 13 /* ENTER */ || e.keyCode === 32 /* SPACE */) {
                            menuItem.toggled = itemCallback(e);
                            e.stopImmediatePropagation();
                        } else if (e.keyCode === 38 /* ARROW_UP */) {
                            if (menuItem.element.previousElementSibling) {
                                menuItem.element.previousElementSibling.focus();
                            }
                            e.stopImmediatePropagation();
                        } else if (e.keyCode === 40 /* ARROW_DOWN */) {
                            if (menuItem.element.nextElementSibling) {
                                menuItem.element.nextElementSibling.focus();
                            }
                            e.stopImmediatePropagation();
                        }
                    };

                    this._target.disabled = false;
                };

                MenuControl.totalOffsetLeft = function (elem) {
                    var offsetLeft = 0;
                    do {
                        if (!isNaN(elem.offsetLeft)) {
                            offsetLeft += elem.offsetLeft;
                        }
                    } while(elem = elem.offsetParent);
                    return offsetLeft;
                };

                MenuControl.totalOffsetTop = function (elem) {
                    var offsetTop = 0;
                    do {
                        if (!isNaN(elem.offsetTop)) {
                            offsetTop += elem.offsetTop;
                        }
                    } while(elem = elem.offsetParent);
                    return offsetTop;
                };

                MenuControl.prototype.showMenu = function (e) {
                    var _this = this;
                    if (!this._isVisible) {
                        this._listElement.style.display = "block";
                        this._listElement.setAttribute("aria-hidden", "false");

                        this.setMenuPosition();

                        this._target.classList.add("menuControlActive");
                        window.setImmediate(function () {
                            document.body.addEventListener("click", _this._closeMenuFunction);
                            window.addEventListener("resize", _this._closeMenuFunction);
                        });
                        this._isVisible = true;
                    }
                };

                MenuControl.prototype.closeMenu = function () {
                    if (this._isVisible) {
                        this._listElement.style.display = "none";
                        this._listElement.setAttribute("aria-hidden", "true");
                        this._target.classList.remove("menuControlActive");
                        document.body.removeEventListener("click", this._closeMenuFunction);
                        window.removeEventListener("resize", this._closeMenuFunction);
                        this._isVisible = false;
                    }
                };

                MenuControl.prototype.setMenuPosition = function () {
                    this._listElement.style.left = "0px";
                    this._listElement.style.top = "0px";

                    var targetTotalOffsetLeft = MenuControl.totalOffsetLeft(this._target);
                    var targetTotalOffsetTop = MenuControl.totalOffsetTop(this._target);

                    var listElementZeroOffsetLeft = MenuControl.totalOffsetLeft(this._listElement);
                    var listElementZeroOffsetTop = MenuControl.totalOffsetTop(this._listElement);

                    var left = targetTotalOffsetLeft;
                    var right = left + this._listElement.offsetWidth;
                    if (right > window.innerWidth) {
                        var newRight = targetTotalOffsetLeft + this._target.offsetWidth;
                        var newLeft = newRight - this._listElement.offsetWidth;
                        if (newLeft >= 0) {
                            left = newLeft;
                            right = newRight;
                        }
                    }

                    this._listElement.style.left = left - listElementZeroOffsetLeft + "px";

                    var top = targetTotalOffsetTop + this._target.offsetHeight;
                    var bottom = top + this._listElement.offsetHeight;
                    if (bottom > window.innerHeight) {
                        var newBottom = targetTotalOffsetTop;
                        var newTop = bottom - this._listElement.offsetHeight;
                        if (newTop >= 0) {
                            top = newTop;
                            bottom = newBottom;
                        }
                    }

                    this._listElement.style.top = top - listElementZeroOffsetTop + "px";
                };
                return MenuControl;
            })(MemoryProfiler.Common.Controls.TemplateControl);
            Controls.MenuControl = MenuControl;
        })(Common.Controls || (Common.Controls = {}));
        var Controls = Common.Controls;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=MenuControl.js.map

// TabControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Controls) {
            "use strict";

            var TabControl = (function (_super) {
                __extends(TabControl, _super);
                function TabControl() {
                    _super.call(this);
                    this._items = [];

                    this.setTemplateFromHTML('<div class="tabControl">' + '   <div class="tabHeader">' + '       <div id="beforeBarContainer" class="beforeBarContainer"></div>' + '       <nav id="tabBarContainer" class="tabBarContainer">' + '        <ul class="tabBar" role="tablist"></ul>' + '       </nav>' + '       <div id="afterBarContainer" class="afterBarContainer"></div>' + '   </div>' + '   <div class="tabContentPane"></div>' + '</div>');

                    this._barPanel = new MemoryProfiler.Common.Controls.Control(this.rootElement.getElementsByClassName("tabBar")[0]);
                    this._contentPane = new MemoryProfiler.Common.Controls.Control(this.rootElement.getElementsByClassName("tabContentPane")[0]);

                    this.beforeBarContainer = new MemoryProfiler.Common.Controls.Control(this.rootElement.getElementsByClassName("beforeBarContainer")[0]);
                    this.afterBarContainer = new MemoryProfiler.Common.Controls.Control(this.rootElement.getElementsByClassName("afterBarContainer")[0]);

                    this._tabBarContainer = this.findElement("tabBarContainer");
                }
                Object.defineProperty(TabControl.prototype, "tabsLeftAligned", {
                    get: function () {
                        return this._tabBarContainer.classList.contains("tabBarContainerLeftAlign");
                    },
                    set: function (v) {
                        if (v) {
                            this._tabBarContainer.classList.add("tabBarContainerLeftAlign");
                        } else {
                            this._tabBarContainer.classList.remove("tabBarContainerLeftAlign");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                TabControl.prototype.addTab = function (tabItem) {
                    this._items.push(tabItem);

                    tabItem.ownerTabControl = this;

                    this._barPanel.appendChild(tabItem.header);
                    this._contentPane.appendChild(tabItem);

                    if (!this._selectedItem) {
                        this.selectedItem = tabItem;
                    }
                };

                TabControl.prototype.removeTab = function (tabItem) {
                    var indexOfItem = this._items.indexOf(tabItem);
                    if (indexOfItem < 0) {
                        return;
                    }

                    if (this.selectedItem === tabItem) {
                        this.selectedItem = null;
                    }

                    this._items.splice(indexOfItem, 1);

                    var newSelectedItemIndex = Math.min(this._items.length - 1, indexOfItem);
                    if (newSelectedItemIndex >= 0) {
                        this.selectedItem = this._items[newSelectedItemIndex];
                    }

                    this._barPanel.removeChild(tabItem.header);
                    this._contentPane.removeChild(tabItem);
                    tabItem.ownerTabControl = null;
                };

                TabControl.prototype.containsTab = function (tabItem) {
                    return this._items.indexOf(tabItem) >= 0;
                };

                TabControl.prototype.getTab = function (index) {
                    return this._items[index];
                };

                TabControl.prototype.length = function () {
                    return this._items.length;
                };

                Object.defineProperty(TabControl.prototype, "selectedItem", {
                    get: function () {
                        return this._selectedItem;
                    },
                    set: function (tabItem) {
                        if (this._selectedItem !== tabItem) {
                            if (!this.containsTab(tabItem)) {
                                return;
                            }

                            if (this._selectedItem) {
                                this._selectedItem.active = false;
                            }

                            this._selectedItem = tabItem;
                            if (this._selectedItem) {
                                this._selectedItem.active = true;
                            }

                            if (this.selectedItemChanged) {
                                this.selectedItemChanged();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                TabControl.prototype.onTabItemSelected = function (item) {
                    this.selectedItem = item;
                };
                return TabControl;
            })(MemoryProfiler.Common.Controls.TemplateControl);
            Controls.TabControl = TabControl;
        })(Common.Controls || (Common.Controls = {}));
        var Controls = Common.Controls;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=TabControl.js.map

// TabItem.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Controls) {
            "use strict";

            var TabItem = (function (_super) {
                __extends(TabItem, _super);
                function TabItem() {
                    _super.call(this);

                    var elem = document.createElement("li");
                    elem.setAttribute("role", "tab");
                    elem.setAttribute("aria-selected", "false");

                    this.header = new MemoryProfiler.Common.Controls.Control(elem);
                    this.header.rootElement.onclick = this.onHeaderClicked.bind(this);
                    this.header.rootElement.setAttribute("tabindex", "2");
                    this.header.rootElement.addEventListener("keydown", this.onKeyDown.bind(this));
                    this.rootElement.className = "tabItemContent";
                }
                Object.defineProperty(TabItem.prototype, "ownerTabControl", {
                    get: function () {
                        return this._ownerTabControl;
                    },
                    set: function (v) {
                        if (this._ownerTabControl !== v) {
                            if (this._ownerTabControl && v) {
                                throw new Error(Plugin.Resources.getErrorString("MemProf.1022"));
                            }
                            this._ownerTabControl = v;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(TabItem.prototype, "active", {
                    get: function () {
                        return this._active;
                    },
                    set: function (v) {
                        if (this._active !== v) {
                            this._active = v;
                            this.header.rootElement.classList.toggle("active");
                            this.rootElement.classList.toggle("active");
                            this.header.rootElement.setAttribute("aria-selected", this._active ? "true" : "false");
                            this.onActiveChanged();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(TabItem.prototype, "title", {
                    get: function () {
                        return this.header.rootElement.innerText;
                    },
                    set: function (v) {
                        this.header.rootElement.innerText = v;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(TabItem.prototype, "tooltipString", {
                    get: function () {
                        return this.header.rootElement.getAttribute("data-plugin-vs-tooltip");
                    },
                    set: function (v) {
                        var tooltip = { content: v };
                        this.header.rootElement.setAttribute("data-plugin-vs-tooltip", JSON.stringify(tooltip));
                    },
                    enumerable: true,
                    configurable: true
                });

                TabItem.prototype.onActiveChanged = function () {
                };

                TabItem.prototype.onHeaderClicked = function () {
                    if (this.ownerTabControl) {
                        this.ownerTabControl.selectedItem = this;
                    }

                    MemoryProfiler.Common.MemoryProfilerViewHost.onIdle();
                };

                TabItem.prototype.onKeyDown = function (e) {
                    if (e.keyCode === 13 /* ENTER */ || e.keyCode === 32 /* SPACE */) {
                        this.onHeaderClicked();
                    }
                };
                return TabItem;
            })(MemoryProfiler.Common.Controls.ContentControl);
            Controls.TabItem = TabItem;
        })(Common.Controls || (Common.Controls = {}));
        var Controls = Common.Controls;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=TabItem.js.map

// View.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Controls) {
            var View = (function (_super) {
                __extends(View, _super);
                function View(containerId) {
                    _super.call(this, containerId);
                }
                View.prototype.render = function () {
                };

                View.prototype.onResize = function () {
                };
                return View;
            })(MemoryProfiler.Common.Controls.TemplateControl);
            Controls.View = View;
        })(Common.Controls || (Common.Controls = {}));
        var Controls = Common.Controls;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=View.js.map

// Session.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Extensions) {
            "use strict";

            (function (SessionType) {
                SessionType[SessionType["session"] = 0] = "session";
                SessionType[SessionType["snapshot"] = 1] = "snapshot";
                SessionType[SessionType["snapshotDiff"] = 2] = "snapshotDiff";
            })(Extensions.SessionType || (Extensions.SessionType = {}));
            var SessionType = Extensions.SessionType;

            (function (TargetRuntime) {
                TargetRuntime[TargetRuntime["none"] = 0] = "none";
                TargetRuntime[TargetRuntime["native"] = 1] = "native";
                TargetRuntime[TargetRuntime["managed"] = 2] = "managed";
                TargetRuntime[TargetRuntime["mixed"] = 3] = "mixed";
            })(Extensions.TargetRuntime || (Extensions.TargetRuntime = {}));
            var TargetRuntime = Extensions.TargetRuntime;

            var HostSessionProxy = (function () {
                function HostSessionProxy() {
                    this._sessionProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("MemoryProfiler.Session", {}, true);
                }
                HostSessionProxy.prototype.addViewTypeEventListener = function (callback) {
                    this._sessionProxy.addEventListener("viewtypechange", callback);
                };

                HostSessionProxy.prototype.getSessionInfo = function () {
                    return this._sessionProxy._call("getSessionInfo");
                };

                HostSessionProxy.prototype.openSnapshotDetails = function (snapshotIndex, targetView, sortProperty, shouldAddLeaksTab) {
                    return this._sessionProxy._call("openSnapshotDetails", snapshotIndex, targetView, sortProperty, shouldAddLeaksTab);
                };

                HostSessionProxy.prototype.openSnapshotDiff = function (snapshotIndex1, snapshotIndex2, targetView, sortProperty) {
                    return this._sessionProxy._call("openSnapshotDiff", snapshotIndex1, snapshotIndex2, targetView, sortProperty);
                };

                HostSessionProxy.prototype.addSnapshot = function (snapshot) {
                    var dataFiles = [];

                    snapshot.dataFiles.forEach(function (dataFile) {
                        dataFiles.push(dataFile.agent + ";" + dataFile.tag + ";" + dataFile.fileName + ";" + dataFile.originalFileName);
                    });

                    return this._sessionProxy._call("addSnapshot", snapshot.processId, snapshot.timestamp, snapshot.startTime, snapshot.endTime, snapshot.collectionJsonData, dataFiles);
                };

                HostSessionProxy.prototype.getTempFilename = function (baseName) {
                    return this._sessionProxy._call("getTempFilename", baseName);
                };

                HostSessionProxy.prototype.save = function () {
                    return this._sessionProxy._call("save");
                };

                HostSessionProxy.prototype.addSnapshotProcessingEventListener = function (callback) {
                    this._sessionProxy.addEventListener("snapshotProcessingComplete", callback);
                };

                HostSessionProxy.prototype.getSnapshotProcessingResults = function () {
                    return this._sessionProxy._call("getSnapshotProcessingResults");
                };

                HostSessionProxy.prototype.getManagedSummaryData = function (snapshotIndex) {
                    return this._sessionProxy._call("getManagedSummaryData", snapshotIndex);
                };

                HostSessionProxy.prototype.getSessionStartupTime = function () {
                    return this._sessionProxy._call("getSessionStartupTime");
                };

                HostSessionProxy.prototype.logCommandUsage = function (commandName, invokeMethod, source) {
                    return this._sessionProxy._call("logCommandUsage", commandName, invokeMethod, source);
                };

                HostSessionProxy.prototype.logBeginLoadSnapshots = function () {
                    return this._sessionProxy._call("logBeginLoadSnapshots");
                };

                HostSessionProxy.prototype.logEndLoadSnapshots = function () {
                    return this._sessionProxy._call("logEndLoadSnapshots");
                };

                HostSessionProxy.prototype.navigateToType = function (typeName) {
                    return this._sessionProxy._call("navigateToType", typeName);
                };

                HostSessionProxy.prototype.updateTargetRuntime = function (targetRuntime) {
                    return this._sessionProxy._call("updateTargetRuntime", targetRuntime);
                };

                HostSessionProxy.prototype.navigateToSource = function (fileName, lineNumber) {
                    return this._sessionProxy._call("navigateToSource", fileName, lineNumber);
                };

                HostSessionProxy.prototype.setScriptedContextId = function (scriptedContextId) {
                    return this._sessionProxy._call("setScriptedContextId", scriptedContextId);
                };

                HostSessionProxy.prototype.updateDetailsViewSetting = function (settingName, newValue) {
                    return this._sessionProxy._call("updateDetailsViewSetting", settingName, newValue);
                };
                return HostSessionProxy;
            })();
            Extensions.HostSessionProxy = HostSessionProxy;
        })(Common.Extensions || (Common.Extensions = {}));
        var Extensions = Common.Extensions;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=Session.js.map

// UserSettings.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        (function (Extensions) {
            "use strict";

            var UserSettingsProxy = (function () {
                function UserSettingsProxy() {
                }
                UserSettingsProxy.prototype.getUserSettings = function () {
                    return new Plugin.Promise(function (completed) {
                        Plugin.Settings.get("MemoryProfiler").done(function (result) {
                            completed(result);
                        }, function (error) {
                            completed({});
                        });
                    }, null);
                };
                return UserSettingsProxy;
            })();
            Extensions.UserSettingsProxy = UserSettingsProxy;
        })(Common.Extensions || (Common.Extensions = {}));
        var Extensions = Common.Extensions;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=UserSettings.js.map

// Constants.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.MinGranularitySupportedInNs = 1;
        Constants.MEMORY_ANALYZER_CLASS_ID = "B821D548-5BA4-4C0E-8D23-CD46CE0C8E23";
        return Constants;
    })();
    MemoryProfiler.Constants = Constants;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=Constants.js.map

// ErrorFormatter.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var ErrorFormatter = (function () {
            function ErrorFormatter() {
            }
            ErrorFormatter.format = function (error) {
                if (MemoryProfiler.Common.MemoryProfilerViewHost.userSettings.showDetailedErrors) {
                    var message = "Error description:  " + (error.message || error.description);

                    if (error.number) {
                        message += "\r\nError number:  " + error.number;
                    }

                    if (error.stack) {
                        message += "\r\nError stack:  " + error.stack;
                    }

                    return message;
                } else {
                    return (error.message || error.description);
                }
            };
            return ErrorFormatter;
        })();
        Common.ErrorFormatter = ErrorFormatter;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ErrorFormatter.js.map

// EventHelper.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var Publisher = (function () {
            function Publisher(events) {
                this._events = {};
                this._listeners = {};
                if (events && events.length > 0) {
                    for (var i = 0; i < events.length; i++) {
                        var type = events[i];
                        if (type) {
                            this._events[type] = type;
                        }
                    }
                } else {
                    throw Error("Events are null or empty.");
                }
            }
            Publisher.prototype.addEventListener = function (eventType, func) {
                if (eventType && func) {
                    var type = this._events[eventType];
                    if (type) {
                        var callbacks = this._listeners[type] ? this._listeners[type] : this._listeners[type] = [];
                        callbacks.push(func);
                    }
                }
            };

            Publisher.prototype.removeEventListener = function (eventType, func) {
                if (eventType && func) {
                    var callbacks = this._listeners[eventType];
                    if (callbacks) {
                        for (var i = 0; i < callbacks.length; i++) {
                            if (func === callbacks[i]) {
                                callbacks.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            };

            Publisher.prototype.invokeListener = function (args) {
                if (args.type) {
                    var callbacks = this._listeners[args.type];
                    if (callbacks) {
                        for (var i = 0; i < callbacks.length; i++) {
                            var func = callbacks[i];
                            if (func) {
                                func(args);
                            }
                        }
                    }
                }
            };
            return Publisher;
        })();
        Common.Publisher = Publisher;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=EventHelper.js.map

// FormattingHelpers.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var FormattingHelpers = (function () {
            function FormattingHelpers() {
            }
            FormattingHelpers.getPrettyPrintSize = function (bytes, includeSign) {
                if (typeof includeSign === "undefined") { includeSign = false; }
                var size = 0;
                var unitAbbreviation;

                if (Math.abs(bytes) > (1024 * 1024 * 1024)) {
                    size = bytes / (1024 * 1024 * 1024);
                    unitAbbreviation = Plugin.Resources.getString("GigabyteUnits");
                } else if (Math.abs(bytes) > (1024 * 1024)) {
                    size = bytes / (1024 * 1024);
                    unitAbbreviation = Plugin.Resources.getString("MegabyteUnits");
                } else if (Math.abs(bytes) > 1024) {
                    size = bytes / 1024;
                    unitAbbreviation = Plugin.Resources.getString("KilobyteUnits");
                } else {
                    size = bytes;
                    unitAbbreviation = Plugin.Resources.getString("ByteUnits");
                }

                return FormattingHelpers.getDecimalLocaleString(parseFloat(size.toFixed(2)), true, includeSign) + " " + unitAbbreviation;
            };

            FormattingHelpers.zeroPad = function (stringToPad, newLength, padLeft) {
                for (var i = stringToPad.length; i < newLength; i++) {
                    stringToPad = (padLeft ? ("0" + stringToPad) : (stringToPad + "0"));
                }
                return stringToPad;
            };

            FormattingHelpers.forceNumberSign = function (numberToConvert, positive) {
                var nf = Plugin.Culture.NumberFormat;
                if (!nf) {
                    nf = {
                        positiveSign: "+",
                        negativeSign: "-"
                    };
                }

                if (positive === true) {
                    return nf.positiveSign + numberToConvert;
                }
                return nf.negativeSign + numberToConvert;
            };

            FormattingHelpers.trimLongString = function (stringToConvert) {
                var substitutedString = stringToConvert;

                var maxStringLength = 38;

                if (stringToConvert.length > maxStringLength) {
                    var substrLength = (maxStringLength / 2) - 2;

                    substitutedString = stringToConvert.substr(0, substrLength) + "\u2026" + stringToConvert.substr(-(substrLength));
                }

                return substitutedString;
            };

            FormattingHelpers.getDecimalLocaleString = function (numberToConvert, includeGroupSeparators, includeSign) {
                if (typeof includeSign === "undefined") { includeSign = false; }
                var wasPositive = true;

                if (numberToConvert < 0) {
                    wasPositive = false;
                    numberToConvert = numberToConvert * -1;
                }
                var numberString = numberToConvert.toString();

                var split = numberString.split(/e/i);
                numberString = split[0];
                var exponent = (split.length > 1 ? parseInt(split[1], 10) : 0);

                split = numberString.split('.');
                numberString = split[0];

                var right = split.length > 1 ? split[1] : "";

                if (exponent > 0) {
                    right = FormattingHelpers.zeroPad(right, exponent, false);
                    numberString += right.slice(0, exponent);
                    right = right.substr(exponent);
                } else if (exponent < 0) {
                    exponent = -exponent;
                    numberString = FormattingHelpers.zeroPad(numberString, exponent + 1, true);
                    right = numberString.slice(-exponent, numberString.length) + right;
                    numberString = numberString.slice(0, -exponent);
                }

                var nf = Plugin.Culture.NumberFormat;
                if (!nf) {
                    nf = { numberDecimalSeparator: ".", numberGroupSizes: [3], numberGroupSeparator: "," };
                }
                if (right.length > 0) {
                    right = nf.numberDecimalSeparator + right;
                }

                if (includeGroupSeparators === true) {
                    var groupSizes = nf.numberGroupSizes, sep = nf.numberGroupSeparator, curSize = groupSizes[0], curGroupIndex = 1, stringIndex = numberString.length - 1, ret = "";

                    while (stringIndex >= 0) {
                        if (curSize === 0 || curSize > stringIndex) {
                            if (ret.length > 0) {
                                numberString = numberString.slice(0, stringIndex + 1) + sep + ret + right;
                            } else {
                                numberString = numberString.slice(0, stringIndex + 1) + right;
                            }

                            if (includeSign) {
                                numberString = FormattingHelpers.forceNumberSign(numberString, wasPositive);
                            }

                            return numberString;
                        }
                        if (ret.length > 0) {
                            ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + sep + ret;
                        } else {
                            ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1);
                        }
                        stringIndex -= curSize;
                        if (curGroupIndex < groupSizes.length) {
                            curSize = groupSizes[curGroupIndex];
                            curGroupIndex++;
                        }
                    }

                    numberString = numberString.slice(0, stringIndex + 1) + sep + ret + right;

                    if (includeSign) {
                        numberString = FormattingHelpers.forceNumberSign(numberString, wasPositive);
                    }

                    return numberString;
                } else {
                    numberString = numberString + right;

                    if (includeSign) {
                        numberString = FormattingHelpers.forceNumberSign(numberString, wasPositive);
                    }

                    return numberString;
                }
            };

            FormattingHelpers.forceNonBreakingSpaces = function (stringToConvert) {
                var substitutedString = stringToConvert.replace(/\s/g, function (match, pos, originalText) {
                    return "\u00a0";
                });
                return substitutedString;
            };

            FormattingHelpers.getNativeDigitLocaleString = function (stringToConvert) {
                var nf = Plugin.Culture.NumberFormat;
                if (!nf) {
                    nf = {
                        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
                    };
                }

                var substitutedString = stringToConvert.replace(/\d/g, function (match, pos, originalText) {
                    return (nf.nativeDigits[parseInt(match)]);
                });

                return substitutedString;
            };

            FormattingHelpers.stringFormat = function (formatString, values) {
                var formattedString = formatString;

                for (var i = 0; i < values.length; i++) {
                    var formatToken = "{" + i + '}';
                    formattedString = formattedString.replace(formatToken, values[i]);
                }

                return formattedString;
            };
            return FormattingHelpers;
        })();
        Common.FormattingHelpers = FormattingHelpers;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=FormattingHelpers.js.map

// EnumHelper.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var Enum = (function () {
            function Enum() {
            }
            Enum.GetName = function (enumType, value) {
                var result;

                if (enumType) {
                    for (var enumKey in enumType) {
                        if (enumType.hasOwnProperty(enumKey)) {
                            var enumValue = enumType[enumKey];
                            if (enumValue === value) {
                                result = enumKey;
                                break;
                            }
                        }
                    }
                }

                if (!result) {
                    result = value.toString();
                }

                return result;
            };

            Enum.Parse = function (enumType, name, ignoreCase) {
                if (typeof ignoreCase === "undefined") { ignoreCase = true; }
                var result;

                if (enumType) {
                    if (ignoreCase) {
                        name = name.toLowerCase();
                    }

                    for (var enumKey in enumType) {
                        if (enumType.hasOwnProperty(enumKey)) {
                            var compareAginst = enumKey.toString();
                            if (ignoreCase) {
                                compareAginst = compareAginst.toLowerCase();
                            }
                            if (name === compareAginst) {
                                result = enumType[enumKey];
                                break;
                            }
                        }
                    }
                }

                return result;
            };

            Enum.GetValues = function (enumType) {
                var result = [];

                if (enumType) {
                    for (var enumKey in enumType) {
                        if (enumType.hasOwnProperty(enumKey)) {
                            var enumValue = enumType[enumKey];
                            if (typeof enumValue === "number") {
                                result.push(enumValue);
                            }
                        }
                    }
                }

                return result;
            };
            return Enum;
        })();
        Common.Enum = Enum;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=EnumHelper.js.map

// Notifications.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var Notifications = (function () {
            function Notifications() {
            }
            Object.defineProperty(Notifications, "isTestMode", {
                get: function () {
                    return window["TestMode"];
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Notifications, "notifications", {
                get: function () {
                    if (!Notifications._notifications) {
                        Notifications._notifications = new Plugin.Utilities.EventManager();
                    }

                    return Notifications._notifications;
                },
                enumerable: true,
                configurable: true
            });

            Notifications.subscribe = function (type, listener) {
                if (Notifications.isTestMode) {
                    Notifications.notifications.addEventListener(type, listener);
                }
            };

            Notifications.unsubscribe = function (type, listener) {
                if (Notifications.isTestMode) {
                    Notifications.notifications.removeEventListener(type, listener);
                }
            };

            Notifications.subscribeOnce = function (type, listener) {
                if (Notifications.isTestMode) {
                    function onNotify() {
                        Notifications.unsubscribe(type, onNotify);
                        listener.apply(this, arguments);
                    }

                    Notifications.subscribe(type, onNotify);
                }
            };

            Notifications.notify = function (type, details) {
                if (Notifications.isTestMode) {
                    Notifications.notifications.dispatchEvent(type, details);
                }
            };
            return Notifications;
        })();
        Common.Notifications = Notifications;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=Notifications.js.map

// KeyCodes.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var Keys = (function () {
            function Keys() {
            }
            Keys.c = "c";
            Keys.DEL = "Del";
            Keys.DOWN = "Down";
            Keys.END = "End";
            Keys.ENTER = "Enter";
            Keys.F10 = "F10";
            Keys.HOME = "Home";
            Keys.LEFT = "Left";
            Keys.RIGHT = "Right";
            Keys.SPACEBAR = "Spacebar";
            Keys.UP = "Up";
            return Keys;
        })();
        Common.Keys = Keys;

        (function (KeyCodes) {
            KeyCodes[KeyCodes["BACKSPACE"] = 8] = "BACKSPACE";
            KeyCodes[KeyCodes["TAB"] = 9] = "TAB";
            KeyCodes[KeyCodes["ENTER"] = 13] = "ENTER";
            KeyCodes[KeyCodes["SHIFT"] = 16] = "SHIFT";
            KeyCodes[KeyCodes["CONTROL"] = 17] = "CONTROL";
            KeyCodes[KeyCodes["ALT"] = 18] = "ALT";
            KeyCodes[KeyCodes["CAPS_LOCK"] = 20] = "CAPS_LOCK";
            KeyCodes[KeyCodes["ESCAPE"] = 27] = "ESCAPE";
            KeyCodes[KeyCodes["SPACE"] = 32] = "SPACE";
            KeyCodes[KeyCodes["PAGE_UP"] = 33] = "PAGE_UP";
            KeyCodes[KeyCodes["PAGE_DOWN"] = 34] = "PAGE_DOWN";
            KeyCodes[KeyCodes["END"] = 35] = "END";
            KeyCodes[KeyCodes["HOME"] = 36] = "HOME";
            KeyCodes[KeyCodes["ARROW_LEFT"] = 37] = "ARROW_LEFT";
            KeyCodes[KeyCodes["ARROW_FIRST"] = 37] = "ARROW_FIRST";
            KeyCodes[KeyCodes["ARROW_UP"] = 38] = "ARROW_UP";
            KeyCodes[KeyCodes["ARROW_RIGHT"] = 39] = "ARROW_RIGHT";
            KeyCodes[KeyCodes["ARROW_DOWN"] = 40] = "ARROW_DOWN";
            KeyCodes[KeyCodes["ARROW_LAST"] = 40] = "ARROW_LAST";
            KeyCodes[KeyCodes["INSERT"] = 45] = "INSERT";
            KeyCodes[KeyCodes["DELETE"] = 46] = "DELETE";
            KeyCodes[KeyCodes["A"] = 65] = "A";
            KeyCodes[KeyCodes["B"] = 66] = "B";
            KeyCodes[KeyCodes["C"] = 67] = "C";
            KeyCodes[KeyCodes["D"] = 68] = "D";
            KeyCodes[KeyCodes["E"] = 69] = "E";
            KeyCodes[KeyCodes["F"] = 70] = "F";
            KeyCodes[KeyCodes["G"] = 71] = "G";
            KeyCodes[KeyCodes["H"] = 72] = "H";
            KeyCodes[KeyCodes["I"] = 73] = "I";
            KeyCodes[KeyCodes["J"] = 74] = "J";
            KeyCodes[KeyCodes["K"] = 75] = "K";
            KeyCodes[KeyCodes["L"] = 76] = "L";
            KeyCodes[KeyCodes["M"] = 77] = "M";
            KeyCodes[KeyCodes["N"] = 78] = "N";
            KeyCodes[KeyCodes["O"] = 79] = "O";
            KeyCodes[KeyCodes["P"] = 80] = "P";
            KeyCodes[KeyCodes["Q"] = 81] = "Q";
            KeyCodes[KeyCodes["R"] = 82] = "R";
            KeyCodes[KeyCodes["S"] = 83] = "S";
            KeyCodes[KeyCodes["T"] = 84] = "T";
            KeyCodes[KeyCodes["U"] = 85] = "U";
            KeyCodes[KeyCodes["V"] = 86] = "V";
            KeyCodes[KeyCodes["W"] = 87] = "W";
            KeyCodes[KeyCodes["X"] = 88] = "X";
            KeyCodes[KeyCodes["Y"] = 89] = "Y";
            KeyCodes[KeyCodes["Z"] = 90] = "Z";
            KeyCodes[KeyCodes["CONTEXTMENU"] = 93] = "CONTEXTMENU";
            KeyCodes[KeyCodes["MULTIPLY"] = 106] = "MULTIPLY";
            KeyCodes[KeyCodes["PLUS"] = 107] = "PLUS";
            KeyCodes[KeyCodes["MINUS"] = 109] = "MINUS";
            KeyCodes[KeyCodes["F1"] = 112] = "F1";
            KeyCodes[KeyCodes["F2"] = 113] = "F2";
            KeyCodes[KeyCodes["F3"] = 114] = "F3";
            KeyCodes[KeyCodes["F4"] = 115] = "F4";
            KeyCodes[KeyCodes["F5"] = 116] = "F5";
            KeyCodes[KeyCodes["F6"] = 117] = "F6";
            KeyCodes[KeyCodes["F7"] = 118] = "F7";
            KeyCodes[KeyCodes["F8"] = 119] = "F8";
            KeyCodes[KeyCodes["F9"] = 120] = "F9";
            KeyCodes[KeyCodes["F10"] = 121] = "F10";
            KeyCodes[KeyCodes["F11"] = 122] = "F11";
            KeyCodes[KeyCodes["F12"] = 123] = "F12";
            KeyCodes[KeyCodes["COMMA"] = 188] = "COMMA";
            KeyCodes[KeyCodes["PERIOD"] = 190] = "PERIOD";
        })(Common.KeyCodes || (Common.KeyCodes = {}));
        var KeyCodes = Common.KeyCodes;

        (function (MouseButtons) {
            MouseButtons[MouseButtons["LEFT_BUTTON"] = 0] = "LEFT_BUTTON";
            MouseButtons[MouseButtons["MIDDLE_BUTTON"] = 1] = "MIDDLE_BUTTON";
            MouseButtons[MouseButtons["RIGHT_BUTTON"] = 2] = "RIGHT_BUTTON";
        })(Common.MouseButtons || (Common.MouseButtons = {}));
        var MouseButtons = Common.MouseButtons;

        (function (KeyFlags) {
            KeyFlags[KeyFlags["KeyFlags_None"] = 0x0] = "KeyFlags_None";
            KeyFlags[KeyFlags["KeyFlags_Shift"] = 0x1] = "KeyFlags_Shift";
            KeyFlags[KeyFlags["KeyFlags_Ctrl"] = 0x2] = "KeyFlags_Ctrl";
            KeyFlags[KeyFlags["KeyFlags_Alt"] = 0x4] = "KeyFlags_Alt";
        })(Common.KeyFlags || (Common.KeyFlags = {}));
        var KeyFlags = Common.KeyFlags;

        function blockBrowserAccelerators() {
            document.addEventListener("keydown", function (e) {
                return preventIEKeys(e);
            });

            document.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            window.addEventListener("mousewheel", function (e) {
                if (e.ctrlKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        }
        Common.blockBrowserAccelerators = blockBrowserAccelerators;

        function HasAnyOfAltCtrlShiftKeyFlags(e) {
            return e.shiftKey || e.ctrlKey || e.altKey;
        }
        Common.HasAnyOfAltCtrlShiftKeyFlags = HasAnyOfAltCtrlShiftKeyFlags;

        function preventIEKeys(e) {
            if (e.keyCode === 116 /* F5 */ || e.keyCode === 117 /* F6 */ || (e.keyCode === 121 /* F10 */ && e.shiftKey) || (e.keyCode === 70 /* F */ && e.ctrlKey)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            return true;
        }
        Common.preventIEKeys = preventIEKeys;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=KeyCodes.js.map

// Utilities.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var Utilities = (function () {
            function Utilities() {
            }
            Utilities.htmlEncode = function (value) {
                Utilities.HtmlEncodeDiv.innerText = value;
                return Utilities.HtmlEncodeDiv.innerHTML;
            };
            Utilities.HtmlEncodeDiv = document.createElement("div");
            return Utilities;
        })();
        Common.Utilities = Utilities;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=Utilities.js.map

// CodeMarkerValues.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        (function (CodeMarkerValues) {
            CodeMarkerValues[CodeMarkerValues["perfMP_TakeSnapshotStart"] = 27200] = "perfMP_TakeSnapshotStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_TakeSnapshotEnd"] = 27201] = "perfMP_TakeSnapshotEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewLoadStart"] = 27202] = "perfMP_ViewLoadStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewLoadEnd"] = 27203] = "perfMP_ViewLoadEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_SelectedSnapshotTileChangedStart"] = 27204] = "perfMP_SelectedSnapshotTileChangedStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_SelectedSnapshotTileChangedEnd"] = 27205] = "perfMP_SelectedSnapshotTileChangedEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_ToggleManagedNativeSelectionStart"] = 27206] = "perfMP_ToggleManagedNativeSelectionStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_ToggleManagedNativeSelectionEnd"] = 27207] = "perfMP_ToggleManagedNativeSelectionEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_ManagedDetailsViewLoadStart"] = 27208] = "perfMP_ManagedDetailsViewLoadStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_ManagedDetailsViewLoadEnd"] = 27209] = "perfMP_ManagedDetailsViewLoadEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_NativeDetailsViewLoadStart"] = 27210] = "perfMP_NativeDetailsViewLoadStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_NativeDetailsViewLoadEnd"] = 27211] = "perfMP_NativeDetailsViewLoadEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_MasterNodeSelectionChangeStart"] = 27212] = "perfMP_MasterNodeSelectionChangeStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_MasterNodeSelectionChangeEnd"] = 27213] = "perfMP_MasterNodeSelectionChangeEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_TypeNodeExpansionStart"] = 27214] = "perfMP_TypeNodeExpansionStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_TypeNodeExpansionEnd"] = 27215] = "perfMP_TypeNodeExpansionEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewIdentifierCallersColdStart"] = 27216] = "perfMP_ViewIdentifierCallersColdStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewIdentifierCallersColdEnd"] = 27217] = "perfMP_ViewIdentifierCallersColdEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewIdentifierCallersWarmStart"] = 27218] = "perfMP_ViewIdentifierCallersWarmStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewIdentifierCallersWarmEnd"] = 27219] = "perfMP_ViewIdentifierCallersWarmEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewIdentifierCalleesColdStart"] = 27220] = "perfMP_ViewIdentifierCalleesColdStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewIdentifierCalleesColdEnd"] = 27221] = "perfMP_ViewIdentifierCalleesColdEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewIdentifierCalleesWarmStart"] = 27222] = "perfMP_ViewIdentifierCalleesWarmStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_ViewIdentifierCalleesWarmEnd"] = 27223] = "perfMP_ViewIdentifierCalleesWarmEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_SetSearchFilterStart"] = 27224] = "perfMP_SetSearchFilterStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_SetSearchFilterEnd"] = 27225] = "perfMP_SetSearchFilterEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_SetJMCValueWarmStart"] = 27226] = "perfMP_SetJMCValueWarmStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_SetJMCValueWarmEnd"] = 27227] = "perfMP_SetJMCValueWarmEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_SetJMCValueColdStart"] = 27228] = "perfMP_SetJMCValueColdStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_SetJMCValueColdEnd"] = 27229] = "perfMP_SetJMCValueColdEnd";
            CodeMarkerValues[CodeMarkerValues["perfMP_SnapshotRestoreStart"] = 27230] = "perfMP_SnapshotRestoreStart";
            CodeMarkerValues[CodeMarkerValues["perfMP_SnapshotRestoreEnd"] = 27231] = "perfMP_SnapshotRestoreEnd";
            CodeMarkerValues[CodeMarkerValues["prefMP_ForceGarbageCollectionStart"] = 27232] = "prefMP_ForceGarbageCollectionStart";
            CodeMarkerValues[CodeMarkerValues["prefMP_ForceGarbageCollectionEnd"] = 27233] = "prefMP_ForceGarbageCollectionEnd";
        })(Common.CodeMarkerValues || (Common.CodeMarkerValues = {}));
        var CodeMarkerValues = Common.CodeMarkerValues;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=CodeMarkerValues.js.map

// FeedbackConstants.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var FeedbackCommandNames = (function () {
            function FeedbackCommandNames() {
            }
            FeedbackCommandNames.Unknown = "Unknown";

            FeedbackCommandNames.CancelSession = "CancelSession";
            FeedbackCommandNames.StopSession = "StopSession";

            FeedbackCommandNames.TakeSnapshot = "TakeSnapshot";
            FeedbackCommandNames.ForceGarbageCollection = "ForceGarbageCollection";

            FeedbackCommandNames.EnableCollapseSmallObjects = "EnableCollapseSmallObjects";
            FeedbackCommandNames.DisableCollapseSmallObjects = "DisableCollapseSmallObjects";
            FeedbackCommandNames.EnableJustMyCode = "EnableJustMyCode";
            FeedbackCommandNames.DisableJustMyCode = "DisableJustMyCode";
            FeedbackCommandNames.EnableTransientBytes = "EnableTransientBytes";
            FeedbackCommandNames.DisableTransientBytes = "DisableTransientBytes";
            FeedbackCommandNames.SelectTopAggregation = "SelectTopAggregation";
            FeedbackCommandNames.SelectBottomAggregation = "SelectBottomAggregation";

            FeedbackCommandNames.SearchHeapView = "SearchHeapView";
            FeedbackCommandNames.ViewPathsToRoot = "ViewPathsToRoot";
            FeedbackCommandNames.ViewReferencedTypes = "ViewReferencedTypes";
            FeedbackCommandNames.ViewReferencedObjects = "ViewReferencedObjects";
            FeedbackCommandNames.ViewNativeAllocations = "ViewNativeAllocations";
            FeedbackCommandNames.OpenManagedHeapViewBySize = "OpenManagedHeapViewBySize";
            FeedbackCommandNames.OpenManagedHeapViewByCount = "OpenManagedHeapViewByCount";
            FeedbackCommandNames.OpenDiffManagedHeapViewBySize = "OpenDiffManagedHeapViewBySize";
            FeedbackCommandNames.OpenDiffManagedHeapViewByCount = "OpenDiffManagedHeapViewByCount";
            FeedbackCommandNames.OpenNativeHeapViewBySize = "OpenNativeHeapViewBySize";
            FeedbackCommandNames.OpenNativeHeapViewByCount = "OpenNativeHeapViewByCount";
            FeedbackCommandNames.OpenDiffNativeHeapViewBySize = "OpenDiffNativeHeapViewBySize";
            FeedbackCommandNames.OpenDiffNativeHeapViewByCount = "OpenDiffNativeHeapViewByCount";
            FeedbackCommandNames.OpenDiffManagedHeapView = "OpenDiffManagedHeapView";
            FeedbackCommandNames.OpenDiffNativeHeapView = "OpenDiffNativeHeapView";
            FeedbackCommandNames.SelectManagedHeapSnapshotView = "SelectManagedHeapSnapshotView";
            FeedbackCommandNames.SelectNativeHeapSnapshotView = "SelectNativeHeapSnapshotView";
            FeedbackCommandNames.OpenMemoryLeaksView = "OpenMemoryLeaksView";
            return FeedbackCommandNames;
        })();
        Common.FeedbackCommandNames = FeedbackCommandNames;

        var FeedbackCommandInvokeMethodNames = (function () {
            function FeedbackCommandInvokeMethodNames() {
            }
            FeedbackCommandInvokeMethodNames.Unknown = "Unknown";
            FeedbackCommandInvokeMethodNames.Default = "Default";
            FeedbackCommandInvokeMethodNames.Control = "Control";
            FeedbackCommandInvokeMethodNames.Menu = "Menu";
            FeedbackCommandInvokeMethodNames.Command = "Command";
            return FeedbackCommandInvokeMethodNames;
        })();
        Common.FeedbackCommandInvokeMethodNames = FeedbackCommandInvokeMethodNames;

        var FeedbackCommandSourceNames = (function () {
            function FeedbackCommandSourceNames() {
            }
            FeedbackCommandSourceNames.Unknown = "Unknown";
            FeedbackCommandSourceNames.Hub = "Hub";
            FeedbackCommandSourceNames.CollectionView = "CollectionView";
            FeedbackCommandSourceNames.DetailsView = "DetailsView";
            FeedbackCommandSourceNames.ManagedHeapView = "ManagedHeapView";
            FeedbackCommandSourceNames.NativeHeapView = "NativeHeapView";
            FeedbackCommandSourceNames.MemoryLeaksView = "MemoryLeaksView";
            FeedbackCommandSourceNames.SummaryView = "SummaryView";
            return FeedbackCommandSourceNames;
        })();
        Common.FeedbackCommandSourceNames = FeedbackCommandSourceNames;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=FeedbackConstants.js.map

// MemoryNotifications.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var MemoryNotifications = (function () {
            function MemoryNotifications() {
            }
            MemoryNotifications.Idle = "MemoryNotifications.Idle";
            MemoryNotifications.WindowClose = "MemoryNotifications.WindowClose";
            MemoryNotifications.SessionEnd = "MemoryNotifications.SessionEnd";
            MemoryNotifications.DetailsViewRowSelected = "MemoryNotifications.DetailsViewRowSelected";
            MemoryNotifications.OnSnapshotProcessingCompleted = "MemoryNotifications.OnSnapshotProcessingCompleted";
            MemoryNotifications.SnapshotDataViewReady = "MemoryNotifications.SnapshotDataViewReady";
            return MemoryNotifications;
        })();
        Common.MemoryNotifications = MemoryNotifications;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=MemoryNotifications.js.map

// MemoryProfilerViewHost.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var MemoryProfilerViewHostBase = (function () {
            function MemoryProfilerViewHostBase() {
                this._openCodeMarkers = {};
                Common.MemoryProfilerViewHost = this;
            }
            Object.defineProperty(MemoryProfilerViewHostBase.prototype, "userSettings", {
                get: function () {
                    return this._userSettings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MemoryProfilerViewHostBase.prototype, "session", {
                get: function () {
                    return this._session;
                },
                enumerable: true,
                configurable: true
            });

            MemoryProfilerViewHostBase.prototype.startCodeMarker = function (startCodeMarker, endCodeMarker) {
                Plugin.VS.Internal.CodeMarkers.fire(startCodeMarker);
                this._openCodeMarkers[startCodeMarker] = endCodeMarker;
            };

            MemoryProfilerViewHostBase.prototype.endCodeMarker = function (startCodeMarker) {
                if (this._openCodeMarkers[startCodeMarker]) {
                    Plugin.VS.Internal.CodeMarkers.fire(this._openCodeMarkers[startCodeMarker]);
                }

                this._openCodeMarkers[startCodeMarker] = undefined;
            };

            MemoryProfilerViewHostBase.prototype.endCodeMarkers = function () {
                var _this = this;
                var startCodeMarkers = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    startCodeMarkers[_i] = arguments[_i + 0];
                }
                startCodeMarkers.forEach(function (marker) {
                    _this.endCodeMarker(marker);
                });
            };

            MemoryProfilerViewHostBase.prototype.loadView = function () {
                var _this = this;
                Plugin.addEventListener("pluginready", function () {
                    var session;

                    Plugin.Tooltip.defaultTooltipContentToHTML = false;

                    session = new MemoryProfiler.Common.Extensions.HostSessionProxy();

                    var userSettingsProxy = new MemoryProfiler.Common.Extensions.UserSettingsProxy();
                    userSettingsProxy.getUserSettings().then(function (userSettings) {
                        _this._userSettings = userSettings;
                        _this._session = session;

                        _this.initializeErrorReporting();

                        Plugin.addEventListener("close", _this.onClose);

                        session.getSessionInfo().done(function (sessionInfo) {
                            _this.initializeView(sessionInfo);
                            _this.onIdle();
                        });
                    });
                });
            };

            MemoryProfilerViewHostBase.prototype.initializeErrorReporting = function () {
                var _this = this;
                window.onerror = function (e, url, line) {
                    var column;
                    if (arguments && arguments[3] && typeof arguments[3] === 'number') {
                        column = arguments[3];
                    }

                    _this.reportError(new Error(e), "Unhandled Error", url, line, column);
                    return true;
                };
            };

            MemoryProfilerViewHostBase.prototype.onIdle = function () {
                MemoryProfiler.Common.Notifications.notify(MemoryProfiler.Common.MemoryNotifications.Idle);
            };

            MemoryProfilerViewHostBase.prototype.reportError = function (error, additionalInfo, source, line, column) {
                if (!this.userSettings.disableWER) {
                    var message = (error.message || error.description);
                    var url = source || "MemoryProfiler";
                    var lineNumber = line || 0;
                    var columnNumber = column || 0;

                    var errorInfo = "Error description:  " + message;

                    if (error.number) {
                        errorInfo += "\r\nError number:  " + error.number;
                    }

                    if (source) {
                        errorInfo += "\r\nSource:  " + source;
                    }

                    if (error.stack) {
                        var stack = error.stack;
                        errorInfo += "\r\nError stack:  " + stack;

                        if (!message) {
                            var index = stack.indexOf("\n");
                            if (index > 0) {
                                index = Math.min(index, 50);
                                message = stack.substring(0, index);
                            }
                        }

                        if (typeof source === "undefined") {
                            var matchInfo = stack.match(/(file|res):?([^)]+)\)/);
                            if (matchInfo && matchInfo.length > 2) {
                                url = matchInfo[2];
                            }
                        }

                        if (typeof line === "undefined") {
                            matchInfo = stack.match(/line ?(\d+)/);
                            if (!matchInfo || matchInfo.length <= 1) {
                                matchInfo = stack.match(/js:?(\d+):/);
                            }
                            if (matchInfo && matchInfo.length > 1) {
                                lineNumber = parseInt(matchInfo[1]);
                            }
                        }
                    }

                    if (additionalInfo) {
                        errorInfo += "\r\nAdditional Info:  " + additionalInfo;
                    }

                    Plugin.Diagnostics.reportError(message, url, lineNumber, errorInfo, columnNumber);
                }
            };

            MemoryProfilerViewHostBase.prototype.onClose = function () {
                MemoryProfiler.Common.Notifications.notify(MemoryProfiler.Common.MemoryNotifications.WindowClose);
            };

            MemoryProfilerViewHostBase.prototype.initializeView = function (sessionInfo) {
            };
            return MemoryProfilerViewHostBase;
        })();
        Common.MemoryProfilerViewHostBase = MemoryProfilerViewHostBase;
        Common.MemoryProfilerViewHost;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=MemoryProfilerViewHost.js.map

// SnapshotEngine.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var SnapshotAgentFile = (function () {
            function SnapshotAgentFile(agent, tag, fileName, originalFileName) {
                this.agent = agent;
                this.tag = tag;
                this.fileName = fileName;
                this.originalFileName = originalFileName;
            }
            return SnapshotAgentFile;
        })();
        Common.SnapshotAgentFile = SnapshotAgentFile;

        var SessionSnapshotData = (function () {
            function SessionSnapshotData(timestamp, snapshotResults, agentFiles) {
                var _this = this;
                this._timestamp = timestamp;
                this._processId = snapshotResults.processId;
                this._startTime = snapshotResults.startTime;
                this._endTime = snapshotResults.startTime;
                this._collectionJsonData = JSON.stringify(snapshotResults.data);
                this._dataFiles = [];
                agentFiles.forEach(function (agentFile) {
                    _this._dataFiles.push(agentFile);
                });
            }
            Object.defineProperty(SessionSnapshotData.prototype, "processId", {
                get: function () {
                    return this._processId;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SessionSnapshotData.prototype, "timestamp", {
                get: function () {
                    return this._timestamp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SessionSnapshotData.prototype, "startTime", {
                get: function () {
                    return this._startTime;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SessionSnapshotData.prototype, "endTime", {
                get: function () {
                    return this._endTime;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SessionSnapshotData.prototype, "collectionJsonData", {
                get: function () {
                    return this._collectionJsonData;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SessionSnapshotData.prototype, "dataFiles", {
                get: function () {
                    return this._dataFiles;
                },
                enumerable: true,
                configurable: true
            });
            return SessionSnapshotData;
        })();

        var SnapshotEngine = (function () {
            function SnapshotEngine(id, agents, provider) {
                var _this = this;
                this._agentDataFiles = [];
                this._agents = {};
                this._activeDownloads = {};
                this._downloadCount = 0;
                this._id = id;
                this._snapshot = new MemoryProfiler.Common.Snapshot(id);
                this._provider = provider;

                agents.forEach(function (agent) {
                    _this._agents[agent.name] = agent;
                });
            }
            SnapshotEngine.prototype.processSnapshotResults = function (results, complete, onError) {
                this._snapshot.startTime = results.startTime;
                this._snapshot.timestamp = new Date().getTime();
                this._results = results;
                this._onComplete = complete;
                this._onError = onError;
                this.checkForComplete();
            };

            SnapshotEngine.prototype.checkForComplete = function () {
                if (!this._results || this._downloadCount > 0) {
                    return;
                }

                var data = new SessionSnapshotData(this._snapshot.timestamp, this._results, this._agentDataFiles);
                this._results = null;
                this._onComplete(data);
            };

            Object.defineProperty(SnapshotEngine.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SnapshotEngine.prototype, "snapshot", {
                get: function () {
                    return this._snapshot;
                },
                enumerable: true,
                configurable: true
            });

            SnapshotEngine.prototype.processAgentData = function (agentName, agentData) {
                var agent;
                agent = this._agents[agentName];
                if (agent) {
                    agent.processCollectorMessage(this, agentData);
                }
            };

            SnapshotEngine.prototype.queueFileRetrieval = function (agent, tag, remoteName, complete) {
                var _this = this;
                this._downloadCount++;
                MemoryProfiler.Common.MemoryProfilerViewHost.session.getTempFilename(remoteName).done(function (localName) {
                    _this._activeDownloads[localName] = remoteName;
                    var localFileName = localName;
                    _this._provider.downloadFile(remoteName, localFileName).done(function () {
                        var message = { commandName: "deleteFile", fileName: remoteName };
                        _this._provider.sendStringToCollectionAgent(JSON.stringify(message));

                        var keepFile;
                        if (complete) {
                            keepFile = complete(_this, remoteName, localFileName);
                        } else {
                            keepFile = true;
                        }

                        if (keepFile) {
                            _this._agentDataFiles.push(new SnapshotAgentFile(agent.name, tag, localFileName, remoteName));
                        }

                        if (_this._activeDownloads[localFileName]) {
                            delete _this._activeDownloads[localFileName];
                        }

                        _this._downloadCount--;

                        _this.checkForComplete();
                    });
                });
            };
            return SnapshotEngine;
        })();
        Common.SnapshotEngine = SnapshotEngine;

        var SnapshotRestoreEngine = (function (_super) {
            __extends(SnapshotRestoreEngine, _super);
            function SnapshotRestoreEngine(id, agents, snapshotData) {
                _super.call(this, id, agents);
                this._snapshotData = snapshotData;
            }
            SnapshotRestoreEngine.prototype.restore = function (complete) {
                var snapshotData = JSON.parse(this._snapshotData.collectionJsonData);
                for (var i = 0; i < snapshotData.length; i++) {
                    var agentMessage = snapshotData[i];
                    this.processAgentData(agentMessage.agent, agentMessage.data);
                }

                this.snapshot.startTime = this._snapshotData.startTime;
                this.snapshot.endTime = this._snapshotData.endTime;
                this.snapshot.timestamp = this._snapshotData.timestamp;

                complete(this.snapshot);
            };

            SnapshotRestoreEngine.prototype.queueFileRetrieval = function (agent, tag, remoteName, complete) {
                for (var i = 0; i < this._snapshotData.dataFiles.length; i++) {
                    var fileData = this._snapshotData.dataFiles[i];
                    if (fileData.agent == agent.name && fileData.tag == tag && fileData.originalFileName == remoteName) {
                        if (complete) {
                            complete(this, remoteName, fileData.fileName);
                        }
                    }
                }
            };
            return SnapshotRestoreEngine;
        })(SnapshotEngine);
        Common.SnapshotRestoreEngine = SnapshotRestoreEngine;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=SnapshotEngine.js.map

// Snapshot.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var Snapshot = (function () {
            function Snapshot(id) {
                this._id = id;
            }
            Object.defineProperty(Snapshot.prototype, "id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Snapshot.prototype, "timestamp", {
                get: function () {
                    return this._timestamp;
                },
                set: function (time) {
                    this._timestamp = time;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Snapshot.prototype, "startTime", {
                get: function () {
                    return this._startTime;
                },
                set: function (time) {
                    this._startTime = time;
                    if (time > this._endTime) {
                        this._endTime = time;
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Snapshot.prototype, "endTime", {
                get: function () {
                    return this._endTime;
                },
                set: function (time) {
                    this._endTime = time;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Snapshot.prototype, "screenshotFile", {
                get: function () {
                    return this._screenshotFile;
                },
                set: function (filename) {
                    this._screenshotFile = filename;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Snapshot.prototype, "gcEndTime", {
                get: function () {
                    return this._gcEndTime;
                },
                set: function (time) {
                    this._gcEndTime = time;
                    if (time > this._endTime) {
                        this._endTime = time;
                    }
                },
                enumerable: true,
                configurable: true
            });

            return Snapshot;
        })();
        Common.Snapshot = Snapshot;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=Snapshot.js.map

// SnapshotSummary.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var SnapshotSummary = (function () {
            function SnapshotSummary(snapshot) {
                this._snapshot = snapshot;

                this._nativeTotalSize = 0;
                this._nativeTotalCount = 0;
                this._managedTotalCount = 0;
                this._managedTotalSize = 0;
                this._resourceLeakCount = 0;
            }
            Object.defineProperty(SnapshotSummary.prototype, "id", {
                get: function () {
                    return this._snapshot.id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SnapshotSummary.prototype, "isProcessingCompleted", {
                get: function () {
                    return this._isProcessingCompleted;
                },
                set: function (v) {
                    this._isProcessingCompleted = v;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(SnapshotSummary.prototype, "snapshot", {
                get: function () {
                    return this._snapshot;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SnapshotSummary.prototype, "nativeTotalSize", {
                get: function () {
                    return this._nativeTotalSize;
                },
                set: function (v) {
                    this._nativeTotalSize = v;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(SnapshotSummary.prototype, "nativeTotalCount", {
                get: function () {
                    return this._nativeTotalCount;
                },
                set: function (v) {
                    this._nativeTotalCount = v;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(SnapshotSummary.prototype, "managedTotalCount", {
                get: function () {
                    return this._managedTotalCount;
                },
                set: function (v) {
                    this._managedTotalCount = v;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(SnapshotSummary.prototype, "managedTotalSize", {
                get: function () {
                    return this._managedTotalSize;
                },
                set: function (v) {
                    this._managedTotalSize = v;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(SnapshotSummary.prototype, "resourceLeakCount", {
                get: function () {
                    return this._resourceLeakCount;
                },
                set: function (v) {
                    this._resourceLeakCount = v;
                },
                enumerable: true,
                configurable: true
            });

            return SnapshotSummary;
        })();
        Common.SnapshotSummary = SnapshotSummary;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=SnapshotSummary.js.map

// SnapshotAgent.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var SnapshotAgent = (function () {
            function SnapshotAgent(name) {
                this._name = name;
            }
            Object.defineProperty(SnapshotAgent.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });

            SnapshotAgent.prototype.processCollectorMessage = function (snapshotEngine, agentData) {
                throw new Error("This is an abstract method and must be overridden");
            };
            return SnapshotAgent;
        })();
        Common.SnapshotAgent = SnapshotAgent;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=SnapshotAgent.js.map

// ClrSnapshotAgent.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var ClrSnapshotAgent = (function (_super) {
            __extends(ClrSnapshotAgent, _super);
            function ClrSnapshotAgent() {
                _super.call(this, "Clr");
            }
            ClrSnapshotAgent.prototype.processCollectorMessage = function (snapshotEngine, message) {
                snapshotEngine.snapshot.gcEndTime = message.gcEndTime;
            };
            return ClrSnapshotAgent;
        })(MemoryProfiler.Common.SnapshotAgent);
        Common.ClrSnapshotAgent = ClrSnapshotAgent;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ClrSnapshotAgent.js.map

// ScreenshotSnapshotAgent.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var ScreenshotSnapshotAgent = (function (_super) {
            __extends(ScreenshotSnapshotAgent, _super);
            function ScreenshotSnapshotAgent() {
                _super.call(this, "ScreenShot");
            }
            ScreenshotSnapshotAgent.prototype.processCollectorMessage = function (snapshotEngine, message) {
                var filename;
                filename = message.Screenshot;
                snapshotEngine.queueFileRetrieval(this, "ScreenShot", filename, function (engine, remoteName, localName) {
                    snapshotEngine.snapshot.screenshotFile = localName;
                    return true;
                });
            };
            return ScreenshotSnapshotAgent;
        })(MemoryProfiler.Common.SnapshotAgent);
        Common.ScreenshotSnapshotAgent = ScreenshotSnapshotAgent;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ScreenshotSnapshotAgent.js.map

// SummaryEngine.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var SummaryEngine = (function () {
            function SummaryEngine(snapshot, agents) {
                var _this = this;
                this._agents = [];
                this._pendingPromises = [];
                this._agentsToProcess = 0;
                this._snapshot = snapshot;
                this._summaryData = new MemoryProfiler.Common.SnapshotSummary(snapshot);

                agents.forEach(function (agent) {
                    _this._agents.push(agent);
                });
            }
            Object.defineProperty(SummaryEngine.prototype, "snapshot", {
                get: function () {
                    return this._snapshot;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SummaryEngine.prototype, "summaryData", {
                get: function () {
                    return this._summaryData;
                },
                enumerable: true,
                configurable: true
            });

            SummaryEngine.prototype.processSummary = function () {
                var _this = this;
                return new Plugin.Promise(function (complete, error, progress) {
                    _this._agentsToProcess = _this._agents.length;
                    if (_this._agentsToProcess == 0) {
                        _this._summaryData.isProcessingCompleted = true;
                        complete(_this._summaryData);
                        return;
                    }

                    _this._complete = complete;
                    _this._error = error;
                    _this._progress = progress;

                    _this._agents.forEach(function (agent) {
                        var promise = agent.processSnapshot(_this, _this.snapshot);
                        _this._pendingPromises.push({
                            agentName: agent.name,
                            pendingPromise: promise
                        });
                        _this._agentsToProcess--;
                        promise.done(_this.onSummaryComplete.bind(_this), _this.onError.bind(_this), _this.onProgress.bind(_this));
                    });
                });
            };

            SummaryEngine.prototype.onSummaryComplete = function (agent) {
                for (var i = 0; i < this._pendingPromises.length; i++) {
                    if (this._pendingPromises[i].agentName === agent.name) {
                        this._pendingPromises.splice(i, 1);
                        break;
                    }
                }

                if (this._agentsToProcess > 0 || this._pendingPromises.length > 0) {
                    return;
                }

                if (this._complete) {
                    this._summaryData.isProcessingCompleted = true;
                    this._complete(this._summaryData);
                    this._complete = null;
                }
            };

            SummaryEngine.prototype.onError = function (error) {
                this.cancel();
                if (this._error) {
                    this._error(error);
                    this._error = null;
                }
            };

            SummaryEngine.prototype.onProgress = function (value) {
                if (this._progress) {
                    this._progress(value);
                }
            };

            SummaryEngine.prototype.cancel = function () {
                this._complete = null;
                this._error = null;
                while (this._pendingPromises.length > 0) {
                    this._pendingPromises.pop().pendingPromise.cancel();
                }
            };
            return SummaryEngine;
        })();
        Common.SummaryEngine = SummaryEngine;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=SummaryEngine.js.map

// SummaryAgent.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var SummaryAgent = (function () {
            function SummaryAgent(name) {
                this._name = name;
            }
            Object.defineProperty(SummaryAgent.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });

            SummaryAgent.prototype.initializeAnalyzerData = function (sessionStartTime, snapshots) {
                return Plugin.Promise.wrap(null);
            };

            SummaryAgent.prototype.processSnapshot = function (summaryEngine, snapshot) {
                throw new Error("This is an abstract method and must be overridden");
            };
            return SummaryAgent;
        })();
        Common.SummaryAgent = SummaryAgent;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=SummaryAgent.js.map

// NativeSummaryAgent.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var NativeSummaryAgent = (function (_super) {
            __extends(NativeSummaryAgent, _super);
            function NativeSummaryAgent(loadDataWareHousePromise) {
                _super.call(this, "Native");
                this._loadDataWareHousePromise = loadDataWareHousePromise;
            }
            NativeSummaryAgent.prototype.initializeAnalyzerData = function (sessionStartTime, snapshots) {
                var times = [];
                snapshots.forEach(function (snapshot) {
                    times.push("" + (snapshot.endTime - sessionStartTime));
                });

                var request = {
                    "fn": "initialize",
                    "snapshots": JSON.stringify(times)
                };
                var ctxData = {
                    customDomain: request
                };

                var dwi;

                var symbolResolutionUpdatesRequestPending = false;
                var showOutputWindow = true;

                return this._loadDataWareHousePromise.then(function (_dwi) {
                    dwi = _dwi;
                    return dwi.getFilteredData(ctxData, MemoryProfiler.Constants.MEMORY_ANALYZER_CLASS_ID);
                }).then(function (result) {
                }, function (value) {
                }, MemoryProfiler.Common.SymbolProcessor.Create(this._loadDataWareHousePromise));
            };

            NativeSummaryAgent.prototype.processSnapshot = function (summaryEngine, snapshot) {
                var _this = this;
                return new Plugin.Promise(function (complete, error, progress) {
                    MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionStartupTime().then(function (sessionStartTime) {
                        return _this.getNativeHeapRootData(snapshot.endTime - sessionStartTime);
                    }).then(function (result) {
                        if (result) {
                            summaryEngine.summaryData.nativeTotalCount = result.outstandingCount;
                            summaryEngine.summaryData.nativeTotalSize = result.outstandingSize;
                        }
                        complete(_this);
                    });
                });
            };

            NativeSummaryAgent.prototype.getNativeHeapRootData = function (snapshotEndTime) {
                var stack = [];
                var timeSpan = null;
                var zeroBigNumber = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.zero;
                timeSpan = new Microsoft.VisualStudio.DiagnosticsHub.JsonTimespan(zeroBigNumber, Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromNumber(snapshotEndTime));
                var request = {
                    "fn": "callee",
                    "jmc": "true",
                    "transient": "false",
                    "sort": "OutstandingSize",
                    "sortDirection": "desc",
                    "path": JSON.stringify(stack)
                };
                var ctxData = {
                    timeDomain: timeSpan,
                    customDomain: request
                };
                var result;
                return this._loadDataWareHousePromise.then(function (dwi) {
                    if (dwi) {
                        return dwi.getFilteredData(ctxData, MemoryProfiler.Constants.MEMORY_ANALYZER_CLASS_ID);
                    }
                    return null;
                }).then(function (theResult) {
                    result = theResult;
                    if (result) {
                        return result.getResult({ "startIndex": 0, "cacheLength": 1 });
                    }
                    return null;
                }).then(function (realResult) {
                    if (result) {
                        result.dispose();
                    }
                    if (realResult) {
                        return realResult[0];
                    }
                    return null;
                });
            };
            return NativeSummaryAgent;
        })(MemoryProfiler.Common.SummaryAgent);
        Common.NativeSummaryAgent = NativeSummaryAgent;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=NativeSummaryAgent.js.map

// MemoryLeaksSummaryAgent.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var MemoryLeaksSummaryAgent = (function (_super) {
            __extends(MemoryLeaksSummaryAgent, _super);
            function MemoryLeaksSummaryAgent(loadDataWareHousePromise) {
                _super.call(this, "Leaks");
                this._loadDataWareHousePromise = loadDataWareHousePromise;
            }
            MemoryLeaksSummaryAgent.prototype.processSnapshot = function (summaryEngine, snapshot) {
                var _this = this;
                return new Plugin.Promise(function (complete, error, progress) {
                    MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionStartupTime().then(function (sessionStartTime) {
                        if (snapshot.startTime && sessionStartTime && snapshot.startTime > 0 && sessionStartTime > 0 && snapshot.startTime > sessionStartTime) {
                            return _this.getResourseLeaksData(snapshot.startTime - sessionStartTime);
                        }
                        return null;
                    }).then(function (result) {
                        if (result) {
                            summaryEngine.summaryData.resourceLeakCount = result;
                        }
                        complete(_this);
                    });
                });
            };

            MemoryLeaksSummaryAgent.prototype.getResourseLeaksData = function (snapshotStartTime) {
                return new Plugin.Promise(function (completed) {
                    completed(Math.floor(Math.random() * 10));
                });
            };
            return MemoryLeaksSummaryAgent;
        })(MemoryProfiler.Common.SummaryAgent);
        Common.MemoryLeaksSummaryAgent = MemoryLeaksSummaryAgent;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=MemoryLeaksSummaryAgent.js.map

// ManagedSummaryAgent.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var ManagedSummaryAgent = (function (_super) {
            __extends(ManagedSummaryAgent, _super);
            function ManagedSummaryAgent() {
                _super.call(this, "Managed");
            }
            ManagedSummaryAgent.prototype.processSnapshot = function (summaryEngine, snapshot) {
                var _this = this;
                return new Plugin.Promise(function (complete, error, progress) {
                    if (snapshot.gcEndTime && snapshot.gcEndTime > 0) {
                        MemoryProfiler.Common.MemoryProfilerViewHost.session.getManagedSummaryData(snapshot.id).then(function (result) {
                            if (result) {
                                summaryEngine.summaryData.managedTotalSize = result.totalSize;
                                summaryEngine.summaryData.managedTotalCount = result.totalCount;
                            }
                            complete(_this);
                        });
                    } else {
                        complete(_this);
                    }
                });
            };
            return ManagedSummaryAgent;
        })(MemoryProfiler.Common.SummaryAgent);
        Common.ManagedSummaryAgent = ManagedSummaryAgent;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ManagedSummaryAgent.js.map

// SymbolProcessor.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (Common) {
        "use strict";

        var SymbolProcessor = (function () {
            function SymbolProcessor(dwiPromise) {
                this.requestPending = false;
                this.showOutputWindow = true;
                this.dwiPromise = dwiPromise;
            }
            SymbolProcessor.Create = function (dwiPromise) {
                var proc = new SymbolProcessor(dwiPromise);
                return proc.onProgress.bind(proc);
            };

            SymbolProcessor.getSymbolResolutionMessage = function (status) {
                if (status.resolutionStatus) {
                    return Plugin.Resources.getString("SymbolsLoaded", status.image);
                } else {
                    return Plugin.Resources.getString("SymbolsNotFound", status.image);
                }
            };

            SymbolProcessor.prototype.onProgress = function (value) {
                var _this = this;
                if (this.requestPending) {
                    return;
                }

                var outputWindowService = Microsoft.VisualStudio.DiagnosticsHub.getOutputWindowsService();

                var statusRequest = {
                    "fn": "symbolResolutionUpdates"
                };

                var statusCtxData = {
                    customDomain: statusRequest
                };

                this.requestPending = true;
                this.dwiPromise.then(function (dwi) {
                    return dwi.getFilteredData(statusCtxData, MemoryProfiler.Constants.MEMORY_ANALYZER_CLASS_ID);
                }).done(function (result) {
                    for (var index = 0; index < result.length; index++) {
                        if (_this.showOutputWindow) {
                            outputWindowService.outputLineAndShow(SymbolProcessor.getSymbolResolutionMessage(result[index]));
                            _this.showOutputWindow = false;
                        } else {
                            outputWindowService.outputLine(SymbolProcessor.getSymbolResolutionMessage(result[index]));
                        }
                    }
                    _this.requestPending = false;
                }, function (value) {
                    _this.requestPending = false;
                });
            };
            return SymbolProcessor;
        })();
        Common.SymbolProcessor = SymbolProcessor;
    })(MemoryProfiler.Common || (MemoryProfiler.Common = {}));
    var Common = MemoryProfiler.Common;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=SymbolProcessor.js.map


// SIG // Begin signature block
// SIG // MIIapwYJKoZIhvcNAQcCoIIamDCCGpQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFEZy7zxBhh9x
// SIG // Q7p/i632baPslIAQoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSRMIIEjQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAQosea7XeXumrAAB
// SIG // AAABCjAJBgUrDgMCGgUAoIGqMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTx/ndOdRMS
// SIG // WQRgBILWty4jQnVFqzBKBgorBgEEAYI3AgEMMTwwOqAg
// SIG // gB4AQwBvAG0AbQBvAG4ATQBlAHIAZwBlAGQALgBqAHOh
// SIG // FoAUaHR0cDovL21pY3Jvc29mdC5jb20wDQYJKoZIhvcN
// SIG // AQEBBQAEggEAcqWLgtlLvEymepwF9lrBnw19vgDxZmnL
// SIG // Jt9Yv/LkgpL/gzldtE5xljuPZcUsCcb9zHXJROY61RMR
// SIG // 2PkybZCqdcDmv4uOs5Z1HFmecbHESTTZ8TpATtNIOh0B
// SIG // fy4padQHauPgcWX8zor5ioCp6Nvu7ghNxMQwzUSMucW1
// SIG // +uvn9Q+A/f/pOFFzXqnjXWpHoOgWXglokb6ri7XIf5iK
// SIG // AOKb0H7EuwSs2UJQ4sgvAJ+LAJRYQkU1K/MGrL8neSRG
// SIG // 4qYGQIwL1aZdBa/F1V1DCKPMs0lPLnb0Y/bJttyKPBvi
// SIG // PbqMdHeR2/aZj53sKYS3QHCVHh366/B7aqQ0GTaKm+Cn
// SIG // HaGCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIBATCB
// SIG // jjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQDExhN
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABxsy6K
// SIG // a4KqH04AAAAAAHEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3
// SIG // DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8X
// SIG // DTE1MDYyOTA0MzM1MVowIwYJKoZIhvcNAQkEMRYEFC6D
// SIG // sriPdrS3LAIMIeJo+Cy6STHgMA0GCSqGSIb3DQEBBQUA
// SIG // BIIBAGeu1HUaGabwUsqc4vt4hksKUjMyn3F0o4tidxjC
// SIG // 45o8ohkuVhI68Q6+jxVNvXJEY8hcOT4Y6o1+Mx3WE+7k
// SIG // NOpnnKOrAvbIvs3p45gwKJUirVEU79lrlNu9ZcMUj/Ob
// SIG // xyDWkO8OXoKEXQZoDXoPDWamylcL1opHnW1qyyUzhqTh
// SIG // 2c5jq1Ycq9Pk4GJMnRdDhEc4DMISSiqwRQvjZP3LtonQ
// SIG // 5c1SBM8n9BIHs+QphY/maJBESfmhxUCAjPJTifbfk+jr
// SIG // 11EbehCAylR8nQyipyWbB8DxTIz+KUDhbVjQd7USVJqM
// SIG // WMJcXBQx33H3fXgXKbj77+0xo64DoXzEk6D5OCE=
// SIG // End signature block
