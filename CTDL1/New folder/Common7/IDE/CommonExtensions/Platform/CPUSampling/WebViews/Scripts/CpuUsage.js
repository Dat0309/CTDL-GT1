var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";

            var DropDownItemType = (function () {
                function DropDownItemType() {
                }
                Object.defineProperty(DropDownItemType, "checkbox", {
                    get: function () {
                        return "Checkbox";
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(DropDownItemType, "listbox", {
                    get: function () {
                        return "Listbox";
                    },
                    enumerable: true,
                    configurable: true
                });
                return DropDownItemType;
            })();
            DiagnosticsHub.DropDownItemType = DropDownItemType;

            var DropDownOptions = (function () {
                function DropDownOptions(config) {
                    this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                    // other variables
                    this._isHeaderFocused = false;
                    this._isCheckboxFocused = false;
                    this._itemDictionary = {};
                    this._selectAllPostfix = "selectall";
                    this._delay = 0;
                    this._isTimerSet = false;
                    this._iconList = [];
                    this._windowHeightBuffer = 20;
                    if (config) {
                        this._config = config;
                        this.initialize();
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSCpuUsage.1002"));
                    }

                    this._sqmCpuUsage = new DiagnosticsHub.Sqm.CpuUsage();
                }
                DropDownOptions.prototype.unload = function () {
                    if (this._header) {
                        this._header.removeEventListener("click", this._headerOnClickHandler);
                        this._header.removeEventListener("focus", this._headerOnFocusHandler);
                        this._header.removeEventListener("blur", this._headerOnBlurHandler);
                        this._header.removeEventListener("keypress", this._headerOnKeyPressHandler);
                    }

                    document.removeEventListener("keypress", this._documentClickHandler);
                    window.removeEventListener("resize", this._windowResizeHandler);
                    Plugin.Theme.removeEventListener("themechanged", this._themeChangedHandler);

                    this.removeFlyoutEvents();

                    this._headerOnClickHandler = null;
                    this._headerOnFocusHandler = null;
                    this._headerOnBlurHandler = null;
                    this._headerOnKeyPressHandler = null;
                    this._checkboxOnFocusHandler = null;
                    this._checkboxOnBlurHandler = null;
                    this._checkboxOnKeyDownHandler = null;
                    this._checkboxOnKeyPressHandler = null;
                    this._checkboxOnChangeHandler = null;
                    this._documentClickHandler = null;
                    this._flyoutClickHandler = null;
                    this._applyClickHandler = null;
                    this._cancelClickHandler = null;
                    this._documentClickHandler = null;
                    this._windowResizeHandler = null;
                    this._flyoutMouseOverHandler = null;
                    this._flyoutMouseOutHandler = null;
                    this._themeChangedHandler = null;

                    this._container = null;
                    this._parent = null;
                    this._header = null;
                    this._body = null;
                    this._footer = null;
                    this._flyout = null;
                    this._headerIcon = null;
                    this._applyButton = null;
                    this._cancelButton = null;
                    this._config = null;
                    this._logger = null;
                    this._sqmCpuUsage = null;

                    this._selectAllPostfix = null;
                    this._isHeaderFocused = null;
                    this._isCheckboxFocused = null;
                    this._isTimerSet = null;
                    this._applyFilterImmediately = null;
                    this._delay = null;
                    this._windowHeightBuffer = null;
                    this._cachedFlyoutHeight = null;
                    this._iconList = null;
                    this._itemDictionary = null;
                };

                DropDownOptions.prototype.render = function () {
                    while (this._container.hasChildNodes()) {
                        this._container.removeChild(this._container.firstChild);
                    }

                    // add main div
                    this._parent = this.createElementWithClassList("div", ["dropdownoptions"]);
                    this._container.appendChild(this._parent);

                    this._headerOnClickHandler = this.headerOnClick.bind(this);
                    this._headerOnFocusHandler = this.headerOnFocus.bind(this);
                    this._headerOnBlurHandler = this.headerOnBlur.bind(this);
                    this._headerOnKeyPressHandler = this.headerOnKeyPress.bind(this);
                    this._checkboxOnFocusHandler = this.checkboxOnFocus.bind(this);
                    this._checkboxOnBlurHandler = this.checkboxOnBlur.bind(this);
                    this._checkboxOnKeyDownHandler = this.checkboxOnKeyDown.bind(this);
                    this._checkboxOnKeyPressHandler = this.checkboxOnKeyPress.bind(this);
                    this._checkboxOnChangeHandler = this.checkboxOnChange.bind(this);
                    this._documentClickHandler = this.hideFlyout.bind(this);
                    this._flyoutClickHandler = this.onFlyoutClick.bind(this);
                    this._applyClickHandler = this.onApplyClick.bind(this);
                    this._cancelClickHandler = this.onCancelClick.bind(this);
                    this._documentClickHandler = this.onCancel.bind(this);
                    this._windowResizeHandler = this.onResize.bind(this);
                    this._flyoutMouseOverHandler = this.onFlyoutMouseOver.bind(this);
                    this._flyoutMouseOutHandler = this.onFlyoutMouseOut.bind(this);

                    this.createHeader(this._parent, this._config.header);
                    this.createFlyout(this._parent, this._config.body, this._config.footer);

                    document.addEventListener("keypress", this._documentClickHandler);
                    window.addEventListener("resize", this._windowResizeHandler);
                };

                DropDownOptions.prototype.getConfiguration = function () {
                    return this._config;
                };

                DropDownOptions.prototype.setHighlight = function (shouldHighlight) {
                    if (shouldHighlight) {
                        this._header.classList.add("dropdownoptions-header-highlight");
                    } else {
                        this._header.classList.remove("dropdownoptions-header-highlight");
                    }
                };

                DropDownOptions.prototype.onResize = function (evt) {
                    if (typeof this._windowHeight === "number" && this._windowHeight === window.innerHeight) {
                        return;
                    }

                    this._windowHeight = window.innerHeight;
                    if (this._header && this._flyout) {
                        if (this._windowHeight < this._header.clientTop + this._header.clientHeight + this._cachedFlyoutHeight) {
                            this._flyout.style.height = (this._windowHeight - this._windowHeightBuffer > 0 ? this._windowHeight - this._windowHeightBuffer : this._windowHeight) + "px";
                        } else {
                            // By doing this we can allow flyout to take height
                            // equal to its children height.
                            this._flyout.style.height = "";
                        }
                    }
                };

                DropDownOptions.prototype.onCancel = function (evt) {
                    if (evt.keyCode === 27 /* ESCAPE */ && this.isFlyoutVisible()) {
                        this.onCancelClick(evt);
                    }
                };

                DropDownOptions.prototype.onFlyoutClick = function (evt) {
                    evt.stopPropagation();
                };

                DropDownOptions.prototype.hideFlyout = function (evt) {
                    if (this._applyFilterImmediately) {
                        this.removeDocumentEvent();
                    }

                    if (this.isFlyoutVisible()) {
                        this.onApplyClick(evt);
                    }
                };

                DropDownOptions.prototype.initialize = function () {
                    // get container
                    this._container = document.getElementById(this._config.containerId);

                    // throw if container not found.
                    if (!this._container) {
                        throw new Error(Plugin.Resources.getErrorString("JSCpuUsage.1000"));
                    }

                    this._themeChangedHandler = this.themeChange.bind(this);
                    Plugin.Theme.addEventListener("themechanged", this._themeChangedHandler);
                };

                DropDownOptions.prototype.themeChange = function () {
                    if (this._iconList) {
                        for (var i = 0; i < this._iconList.length; i++) {
                            if (this._iconList[i].token && this._iconList[i].element) {
                                this._iconList[i].element.style.backgroundImage = "url(" + Plugin.Theme.getValue(this._iconList[i].token) + ")";
                            }
                        }
                    }
                };

                DropDownOptions.prototype.createHeader = function (parent, config) {
                    // create header and append to parent
                    if (!config) {
                        throw new Error(Plugin.Resources.getErrorString("JSCpuUsage.1003"));
                    }

                    var headerCss = ["dropdownoptions-header", "dropdownoptions-header-custom"];
                    if (config.className) {
                        headerCss.push(config.className);
                    }

                    this._header = this.createElementWithClassList("div", headerCss);
                    this._header.tabIndex = 0;
                    this._header.addEventListener("click", this._headerOnClickHandler);
                    this._header.addEventListener("focus", this._headerOnFocusHandler);
                    this._header.addEventListener("blur", this._headerOnBlurHandler);
                    this._header.addEventListener("keypress", this._headerOnKeyPressHandler);
                    this._header.setAttribute("data-plugin-vs-tooltip", JSON.stringify({
                        content: config.ariaText,
                        delay: 0
                    }));
                    this._header.setAttribute("aria-label", config.ariaText);
                    this._header.setAttribute("role", "menu");
                    this._header.setAttribute("aria-expanded", "false");

                    // create text and icon div.
                    if (config.iconToken) {
                        var headerExternalIcon = this.createElementWithClassList("div", ["dropdownoptions-header-external-icon"]);
                        headerExternalIcon.style.height = "1.250em";
                        headerExternalIcon.style.width = "1.250em";
                        headerExternalIcon.style.backgroundImage = "url(" + Plugin.Theme.getValue(config.iconToken) + ")";
                        this._header.appendChild(headerExternalIcon);
                        this._iconList.push({
                            token: config.iconToken,
                            element: headerExternalIcon
                        });
                    }

                    var headerText = this.createElementWithClassList("div", ["dropdownoptions-header-text"]);
                    headerText.innerHTML = config.text || "";

                    this._headerIcon = this.createElementWithClassList("div", ["dropdownoptions-header-dropdown-icon"]);
                    this._headerIcon.innerHTML = "6"; // 6 in marlett font is down arrow
                    this._header.appendChild(headerText);
                    this._header.appendChild(this._headerIcon);

                    parent.appendChild(this._header);
                };

                DropDownOptions.prototype.createFlyout = function (parent, bodyConfig, footerConfig) {
                    this._flyout = this.createElementWithClassList("div", ["dropdownoptions-flyout"]);
                    this._flyout.addEventListener("mouseover", this._flyoutMouseOverHandler);
                    this._flyout.addEventListener("mouseout", this._flyoutMouseOutHandler);
                    parent.appendChild(this._flyout);

                    this.createBody(this._flyout, bodyConfig);
                    if (footerConfig) {
                        this.createFooter(this._flyout, footerConfig);
                    }

                    this._applyFilterImmediately = bodyConfig.applyFilterImmediately || false;
                    this._delay = bodyConfig.delay || 0;
                    this._cachedFlyoutHeight = this._flyout.clientHeight;
                    this._flyout.style.display = "none";
                };

                DropDownOptions.prototype.onFlyoutMouseOver = function (evt) {
                    if (this._header) {
                        this._header.classList.add("dropdownoptions-header-keyboard-focus");
                    }
                };

                DropDownOptions.prototype.onFlyoutMouseOut = function (evt) {
                    if (this._header) {
                        this._header.classList.remove("dropdownoptions-header-keyboard-focus");
                    }
                };

                DropDownOptions.prototype.attachDocumentEvent = function () {
                    if (this._flyout) {
                        this._flyout.addEventListener("click", this._flyoutClickHandler);
                    }

                    document.addEventListener("click", this._documentClickHandler);
                };

                DropDownOptions.prototype.removeDocumentEvent = function () {
                    if (this._flyout) {
                        this._flyout.removeEventListener("click", this._flyoutClickHandler);
                    }

                    document.removeEventListener("click", this._documentClickHandler);
                };

                DropDownOptions.prototype.createBody = function (parent, config) {
                    // create body and append to parent
                    if (!config) {
                        throw new Error(Plugin.Resources.getErrorString("JSCpuUsage.1004"));
                    }

                    if (!this._body) {
                        this._body = this.createElementWithClassList("div", ["dropdownoptions-body"]);
                        parent.appendChild(this._body);
                    } else {
                        this.removeBodyEvents();
                        while (this._body.hasChildNodes()) {
                            this._body.removeChild(this._body.firstChild);
                        }
                    }

                    if (config.title) {
                        var title = this.createElementWithClassList("div", ["dropdownoptions-body-title"]);
                        title.innerHTML = config.title;
                        this._body.appendChild(title);
                    }

                    if (config.items) {
                        for (var i = 0; i < config.items.length; i++) {
                            var child = null;
                            if (config.items[i].type === DropDownItemType.checkbox) {
                                child = this.createDropDownOptionsCheckboxItem(this._config.containerId + "-" + i, config.items[i]);
                            } else if (config.items[i].type === DropDownItemType.listbox) {
                                child = this.createDropDownOptionsListbox(this._config.containerId + "-" + i, config.items[i]);
                            }

                            if (child) {
                                this._itemDictionary[i.toString()] = config.items[i];
                                this._body.appendChild(child);
                            }
                        }
                    }
                };

                DropDownOptions.prototype.createDropDownOptionsCheckboxItem = function (id, config) {
                    config.id = id;
                    var item = this.createElementWithClassList("div", ["dropdownoptions-item"]);

                    var checkboxContainer = this.createElementWithClassList("label", ["dropdownoptions-checkboxcontainer"]);
                    checkboxContainer.addEventListener("focus", this._checkboxOnFocusHandler);
                    checkboxContainer.addEventListener("blur", this._checkboxOnBlurHandler);
                    checkboxContainer.addEventListener("keydown", this._checkboxOnKeyDownHandler);
                    checkboxContainer.addEventListener("keypress", this._checkboxOnKeyPressHandler);
                    checkboxContainer.setAttribute("aria-label", (config.ariaText || config.label));
                    checkboxContainer.setAttribute("aria-labelledby", (config.ariaText || config.label));
                    checkboxContainer.setAttribute("aria-describedby", (config.ariaText || config.label));
                    checkboxContainer.setAttribute("role", "checkbox");
                    checkboxContainer.setAttribute("aria-checked", config.checked ? "true" : "false");
                    checkboxContainer.tabIndex = 0;
                    checkboxContainer.setAttribute("for", config.id);
                    item.appendChild(checkboxContainer);
                    checkboxContainer.setAttribute("data-plugin-vs-tooltip", JSON.stringify({
                        content: config.tooltip,
                        delay: 0
                    }));

                    var checkboxDiv = this.createElementWithClassList("div", ["checkbox"]);
                    checkboxContainer.appendChild(checkboxDiv);

                    var checkbox = this.createElementWithClassList("input", ["checkbox-change"]);
                    checkbox.type = "checkbox";
                    checkbox.id = config.id;
                    checkbox.checked = config.checked;
                    checkbox.addEventListener("change", this._checkboxOnChangeHandler);

                    var checkboxLabel = this.createElementWithClassList("label", ["checkboxLabel"]);
                    checkboxLabel.setAttribute("for", checkbox.id);

                    checkboxDiv.appendChild(checkbox);
                    checkboxDiv.appendChild(checkboxLabel);

                    var checkboxIcon = this.createElementWithClassList("div", ["checkboxicon"]);
                    checkboxContainer.appendChild(checkboxIcon);

                    if (config.iconToken) {
                        var icon = this.createElementWithClassList("div", ["icon"]);
                        icon.style.backgroundImage = "url(" + Plugin.Theme.getValue(config.iconToken) + ")";
                        checkboxIcon.appendChild(icon);
                        this._iconList.push({
                            token: config.iconToken,
                            element: icon
                        });
                    }

                    var checkboxTextDiv = this.createElementWithClassList("div", ["checkboxtext"]);
                    if (config.iconToken) {
                        checkboxTextDiv.style.paddingLeft = "3px";
                    }

                    checkboxContainer.appendChild(checkboxTextDiv);
                    var checkboxTextLabel = this.createElementWithClassList("label", ["checkboxtextlabel"]);
                    checkboxTextLabel.setAttribute("for", checkbox.id);
                    checkboxTextLabel.innerHTML = config.label;

                    checkboxTextDiv.appendChild(checkboxTextLabel);

                    return item;
                };

                DropDownOptions.prototype.createDropDownOptionsListbox = function (id, config) {
                    var item = this.createElementWithClassList("div", ["dropdownoptions-item"]);

                    var listboxContainer = this.createElementWithClassList("div", ["dropdownoptions-listboxcontainer"]);
                    item.appendChild(listboxContainer);

                    var listboxLabel = this.createElementWithClassList("div", ["listboxlabel"]);
                    listboxLabel.innerHTML = config.label;
                    listboxContainer.appendChild(listboxLabel);
                    listboxLabel.setAttribute("data-plugin-vs-tooltip", JSON.stringify({
                        content: config.tooltip,
                        delay: 0
                    }));

                    var listbox = this.createElementWithClassList("div", ["listbox"]);
                    listbox.id = id;
                    listboxContainer.appendChild(listbox);

                    if (config.areAllSelected === null || typeof config.areAllSelected === "undefined") {
                        config.areAllSelected = true;
                    }

                    if (config.checkboxItems) {
                        if (config.checkboxItems.length > 0) {
                            var selectAll = this.createDropDownOptionsCheckboxItem(id + "-" + this._selectAllPostfix, {
                                type: DropDownItemType.checkbox,
                                checked: config.areAllSelected,
                                ariaText: Plugin.Resources.getString("CPUViewSelectAllAriaText"),
                                label: Plugin.Resources.getString("CPUViewSelectAll"),
                                tooltip: Plugin.Resources.getString("CPUViewSelectAllAriaText")
                            });

                            listbox.appendChild(selectAll);
                        }

                        for (var i = 0; i < config.checkboxItems.length; i++) {
                            if (config.areAllSelected) {
                                config.checkboxItems[i].checked = true;
                            }

                            listbox.appendChild(this.createDropDownOptionsCheckboxItem(id + "-" + i, config.checkboxItems[i]));
                        }
                    }

                    return item;
                };

                DropDownOptions.prototype.createFooter = function (parent, config) {
                    // create body and append to parent
                    if (!config) {
                        throw new Error(Plugin.Resources.getErrorString("JSCpuUsage.1004"));
                    }

                    this._footer = this.createElementWithClassList("div", ["dropdownoptions-footer"]);
                    parent.appendChild(this._footer);

                    var buttonArea = this.createElementWithClassList("div", ["dropdownoptions-buttonarea"]);
                    this._footer.appendChild(buttonArea);

                    var element = this.createElementWithClassList("div", ["dropdownoptions-okbutton"]);
                    this._applyButton = this.createFooterButton(config.applyButton, ["dropdownoptions-button"], this._applyClickHandler);
                    element.appendChild(this._applyButton);
                    buttonArea.appendChild(element);

                    element = this.createElementWithClassList("div", ["dropdownoptions-cancelbutton"]);
                    this._cancelButton = this.createFooterButton(config.cancelButton, ["dropdownoptions-button"], this._cancelClickHandler);
                    element.appendChild(this._cancelButton);
                    buttonArea.appendChild(element);

                    var seperator = this.createElementWithClassList("div", ["dropdownoptions-buttonseperator"]);
                    this._footer.appendChild(seperator);
                };

                DropDownOptions.prototype.createFooterButton = function (config, classList, clickHandler) {
                    var button = this.createElementWithClassList("button", classList);
                    button.type = "button";
                    button.textContent = config.text;
                    button.setAttribute("aria-label", config.ariaText);
                    button.setAttribute("role", "button");
                    button.tabIndex = 0;
                    button.addEventListener("click", clickHandler);
                    button.setAttribute("data-plugin-vs-tooltip", JSON.stringify({
                        content: config.ariaText,
                        delay: 0
                    }));
                    return button;
                };

                DropDownOptions.prototype.disableScrolling = function (evt) {
                    if (evt && evt.keyCode === 32 /* SPACE */) {
                        evt.preventDefault();
                    }
                };

                DropDownOptions.prototype.headerOnClick = function (evt) {
                    if (!this.isFlyoutVisible()) {
                        if (this._applyFilterImmediately) {
                            this.attachDocumentEvent();
                        }

                        if (this._config.containerId === "filterContainer") {
                            this._sqmCpuUsage.filterViewOpen();
                        }

                        this.toggleHeaderState();
                        if (evt) {
                            evt.stopPropagation();
                        }
                    } else {
                        this.onCancelClick(null);
                    }
                };

                DropDownOptions.prototype.isFlyoutVisible = function () {
                    if (!this._flyout) {
                        return false;
                    }

                    if (!this._flyout.style.display || this._flyout.style.display === "none") {
                        return false;
                    }

                    return true;
                };

                DropDownOptions.prototype.toggleHeaderState = function () {
                    if (this._flyout) {
                        if (!this._flyout.style.display || this._flyout.style.display === "none") {
                            this._flyout.style.top = this._header.clientTop + this._header.clientHeight + "px";
                            this._flyout.style.display = "-ms-grid";
                            this._header.setAttribute("aria-expanded", "true");

                            // onResize function is handler to window resize event.
                            // Passing null as we do not need event argument.
                            this.onResize(null);
                        } else {
                            this._flyout.style.display = "none";
                            this._header.setAttribute("aria-expanded", "false");
                        }
                    }
                };

                DropDownOptions.prototype.headerOnFocus = function (evt) {
                    this._isHeaderFocused = true;
                    if (this._header) {
                        this._header.classList.add("dropdownoptions-header-keyboard-focus");
                    }

                    if (this._config.toggleParentStyle) {
                        this._config.toggleParentStyle(true);
                    }
                };

                DropDownOptions.prototype.headerOnBlur = function (evt) {
                    this._isHeaderFocused = false;
                    if (this._header) {
                        this._header.classList.remove("dropdownoptions-header-keyboard-focus");
                    }

                    if (this._config.toggleParentStyle) {
                        this._config.toggleParentStyle(false);
                    }
                };

                DropDownOptions.prototype.headerOnKeyPress = function (evt) {
                    if (this._isHeaderFocused && 13 /* ENTER */ === evt.keyCode && this._headerOnClickHandler) {
                        this._headerOnClickHandler(null);
                    }
                };

                DropDownOptions.prototype.setCheckboxAriaText = function (input) {
                    if (input && input.parentElement && input.parentElement.parentElement) {
                        var parent = input.parentElement.parentElement;
                        parent.setAttribute("aria-checked", input.checked + "");
                    }
                };

                DropDownOptions.prototype.checkboxOnChange = function (evt) {
                    var _this = this;
                    var input = evt.currentTarget;
                    this.setCheckboxAriaText(input);
                    this.setCheckboxState(input);
                    if (!this._isTimerSet && this._applyFilterImmediately) {
                        if (this._delay) {
                            this._isTimerSet = true;
                            window.setTimeout(function () {
                                _this._isTimerSet = false;
                                _this.hideFlyout(null);
                            }, this._delay);
                        } else {
                            this.hideFlyout(null);
                        }
                    }
                };

                DropDownOptions.prototype.setCheckboxState = function (checkBox) {
                    if (checkBox) {
                        var id = checkBox.id;
                        if (id) {
                            var splitedId = id.split("-");
                            if (splitedId && splitedId.length > 2) {
                                var isInputSelectAll = false;
                                if (splitedId[splitedId.length - 1] === this._selectAllPostfix) {
                                    isInputSelectAll = true;
                                }

                                while (splitedId.length > 2) {
                                    splitedId.pop();
                                }

                                var parentId = splitedId.join("-");
                                var parent = document.getElementById(parentId);
                                if (parent) {
                                    if (isInputSelectAll) {
                                        this.toggleListboxState(parent, checkBox.checked);
                                    } else {
                                        this.setSelectAllState(parent);
                                    }
                                }
                            }
                        }
                    }
                };

                DropDownOptions.prototype.setSelectAllState = function (parent) {
                    var inputs = parent.getElementsByTagName("input");
                    var areAllSelected = true;
                    var selectAll = null;
                    if (inputs) {
                        for (var i = 0; i < inputs.length; i++) {
                            var input = inputs[i];
                            if (input.id === parent.id + "-" + this._selectAllPostfix) {
                                selectAll = input;
                                continue;
                            }

                            areAllSelected = input.checked ? true : false;
                            if (!input.checked && selectAll) {
                                break;
                            }
                        }
                    }

                    if (selectAll) {
                        selectAll.removeEventListener("change", this._checkboxOnChangeHandler);
                        selectAll.checked = areAllSelected;
                        this.setCheckboxAriaText(selectAll);
                        selectAll.addEventListener("change", this._checkboxOnChangeHandler);
                    }
                };

                DropDownOptions.prototype.checkboxOnFocus = function (evt) {
                    this._isCheckboxFocused = true;
                    if (this._header) {
                        this._header.classList.add("dropdownoptions-header-keyboard-focus");
                    }

                    if (this._config.toggleParentStyle) {
                        this._config.toggleParentStyle(true);
                    }
                };

                DropDownOptions.prototype.checkboxOnBlur = function (evt) {
                    this._isCheckboxFocused = false;
                    if (this._header) {
                        this._header.classList.remove("dropdownoptions-header-keyboard-focus");
                    }

                    if (this._config.toggleParentStyle) {
                        this._config.toggleParentStyle(false);
                    }
                };

                DropDownOptions.prototype.checkboxOnKeyDown = function (evt) {
                    if (this._isCheckboxFocused) {
                        // Allow up and down arrow keys to change selection instead of scrolling
                        if (40 /* ARROW_DOWN */ === evt.keyCode || 38 /* ARROW_UP */ === evt.keyCode) {
                            var element = evt.currentTarget;
                            if (element && element.parentElement) {
                                var elementSibling;
                                if (40 /* ARROW_DOWN */ === evt.keyCode) {
                                    elementSibling = element.parentElement.nextElementSibling;
                                } else if (38 /* ARROW_UP */ === evt.keyCode) {
                                    elementSibling = element.parentElement.previousElementSibling;
                                }

                                if (elementSibling) {
                                    var checkboxContainers = elementSibling.getElementsByClassName("dropdownoptions-checkboxcontainer");
                                    if (checkboxContainers) {
                                        var checkboxContainer = checkboxContainers[0];
                                        if (checkboxContainer) {
                                            checkboxContainer.focus();
                                        }
                                    }
                                }
                            }

                            if (evt) {
                                evt.preventDefault();
                            }
                        }
                    }
                };

                DropDownOptions.prototype.checkboxOnKeyPress = function (evt) {
                    if (this._isCheckboxFocused && 32 /* SPACE */ === evt.keyCode && this._headerOnClickHandler) {
                        var element = evt.currentTarget;
                        if (element) {
                            var inputList = element.getElementsByTagName("input");
                            if (inputList) {
                                var input = inputList[0];
                                if (input) {
                                    input.checked = !input.checked;
                                    this.setCheckboxAriaText(input);

                                    // we need to generate fake event as on change for checkbox is not fired when changed its value changes.
                                    var fakeEvent = document.createEvent("HTMLEvents");
                                    fakeEvent.initEvent("change", true, true);
                                    input.dispatchEvent(fakeEvent);
                                }
                            }
                        }

                        if (evt) {
                            evt.preventDefault();
                        }
                    }
                };

                DropDownOptions.prototype.createElementWithClassList = function (type, classList) {
                    var element = document.createElement(type);

                    if (classList) {
                        for (var i = 0; i < classList.length; i++) {
                            element.classList.add(classList[i]);
                        }
                    }

                    return element;
                };

                DropDownOptions.prototype.removeFlyoutEvents = function () {
                    if (this._flyout) {
                        this._flyout.removeEventListener("mouseover", this._flyoutMouseOverHandler);
                        this._flyout.removeEventListener("mouseout", this._flyoutMouseOutHandler);
                        this.removeBodyEvents();
                    }
                };

                DropDownOptions.prototype.removeBodyEvents = function () {
                    var checkboxList = this._flyout.getElementsByClassName("dropdownoptions-checkboxcontainer");
                    if (checkboxList) {
                        for (var i = 0; i < checkboxList.length; i++) {
                            checkboxList[i].removeEventListener("focus", this._checkboxOnFocusHandler);
                            checkboxList[i].removeEventListener("blur", this._checkboxOnBlurHandler);
                            checkboxList[i].removeEventListener("keypress", this._checkboxOnKeyPressHandler);
                            checkboxList[i].removeEventListener("keydown", this._checkboxOnKeyDownHandler);
                        }
                    }

                    var inputs = this._flyout.getElementsByTagName("input");
                    if (inputs) {
                        for (var i = 0; i < inputs.length; i++) {
                            inputs[i].removeEventListener("change", this._checkboxOnChangeHandler);
                        }
                    }

                    if (this._applyButton) {
                        this._applyButton.removeEventListener("click", this._applyClickHandler);
                    }

                    if (this._cancelButton) {
                        this._cancelButton.removeEventListener("click", this._cancelClickHandler);
                    }
                };

                DropDownOptions.prototype.applyChanges = function (evt, cancel) {
                    if (!this._body) {
                        return;
                    }

                    var callbackList = {};
                    var inputList = this._body.getElementsByTagName("input");
                    if (inputList) {
                        for (var i = 0; i < inputList.length; i++) {
                            var input = inputList[i];
                            var idList = input.id.split("-");
                            if (idList[1] !== null && typeof idList[1] !== "undefined" && this._itemDictionary && this._itemDictionary[idList[1]]) {
                                var config = this._itemDictionary[idList[1]];
                                if (config.type === DropDownItemType.checkbox) {
                                    var checkbox = config;
                                    if (cancel) {
                                        input.checked = checkbox.checked; // revert its value
                                        this.setCheckboxAriaText(input);
                                    }

                                    var hasChanged = checkbox.checked !== input.checked;
                                    if (hasChanged) {
                                        checkbox.checked = input.checked; // save it's new value
                                    }

                                    if (checkbox.onChangeHandler && !callbackList[input.id]) {
                                        callbackList[input.id] = {
                                            handler: checkbox.onChangeHandler,
                                            args: {
                                                data: checkbox.data,
                                                checked: checkbox.checked,
                                                hasChanged: hasChanged
                                            }
                                        };
                                    }
                                } else if (config.type === DropDownItemType.listbox) {
                                    var listbox = config;
                                    var items = listbox.checkboxItems;
                                    var isSelectAll = true;
                                    if (items) {
                                        for (var j = 0; j < items.length; j++) {
                                            var item = items[j];
                                            if (item.id === input.id) {
                                                isSelectAll = false;
                                                if (cancel) {
                                                    input.checked = item.checked; // revert its value
                                                    this.setCheckboxAriaText(input);
                                                }

                                                var hasChanged = item.checked !== input.checked;
                                                if (hasChanged) {
                                                    item.checked = input.checked; // save it's new value
                                                }

                                                if (listbox.onChangeHandler) {
                                                    if (!callbackList[listbox.id]) {
                                                        callbackList[listbox.id] = {
                                                            handler: listbox.onChangeHandler,
                                                            args: {
                                                                data: listbox.data,
                                                                itemsData: [],
                                                                hasChanged: false
                                                            }
                                                        };

                                                        // Reset the state for the 'SelectAll' checkbox state. Needed
                                                        // to keep the configuration in sync if and when it is requested.
                                                        if (!cancel) {
                                                            listbox.areAllSelected = true;
                                                        }
                                                    }

                                                    if (hasChanged) {
                                                        callbackList[listbox.id].args.hasChanged = hasChanged;
                                                    }

                                                    callbackList[listbox.id].args.itemsData.push({
                                                        data: item.data,
                                                        checked: item.checked
                                                    });

                                                    if (!cancel) {
                                                        listbox.areAllSelected = listbox.areAllSelected && item.checked;
                                                    }
                                                }

                                                break;
                                            }
                                        }
                                    }

                                    // if it is cancel operation and item is select all checkbox
                                    // revert it's value.
                                    if (cancel && isSelectAll) {
                                        input.checked = listbox.areAllSelected;
                                        this.setCheckboxAriaText(input);
                                    }
                                }
                            }
                        }

                        if (!cancel) {
                            for (var callback in callbackList) {
                                if (callbackList.hasOwnProperty(callback)) {
                                    var handler = callbackList[callback].handler;
                                    var args = callbackList[callback].args;
                                    if (handler && args && args.hasChanged) {
                                        handler(args);
                                    }
                                }
                            }
                        }
                    }

                    if (!cancel) {
                        if (this._config.callback) {
                            this._config.callback(evt);
                        }
                    }

                    this.toggleHeaderState();
                };

                DropDownOptions.prototype.onApplyClick = function (evt) {
                    this.applyChanges(evt, false);
                    if (this._config.footer && this._config.footer.applyButton && this._config.footer.applyButton.clickHandler) {
                        this._config.footer.applyButton.clickHandler(evt);
                    }
                };

                DropDownOptions.prototype.onCancelClick = function (evt) {
                    this.applyChanges(evt, true);
                    if (this._config.footer && this._config.footer.cancelButton && this._config.footer.cancelButton.clickHandler) {
                        this._config.footer.cancelButton.clickHandler(evt);
                    }
                };

                DropDownOptions.prototype.toggleListboxState = function (parent, checked) {
                    var inputs = parent.getElementsByTagName("input");
                    if (inputs) {
                        for (var i = 0; i < inputs.length; i++) {
                            var input = inputs[i];
                            if (input.id !== parent.id + "-" + this._selectAllPostfix && input.checked !== checked) {
                                input.removeEventListener("change", this._checkboxOnChangeHandler);
                                input.checked = checked;
                                this.setCheckboxAriaText(input);
                                input.addEventListener("change", this._checkboxOnChangeHandler);
                            }
                        }
                    }
                };
                return DropDownOptions;
            })();
            DiagnosticsHub.DropDownOptions = DropDownOptions;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DropDownOptions.ts" />
/// <reference path="..\..\..\TempTypeScriptDeclarations\Plugin.d.ts" />
// These aliases are used so that we don't have a collision with Microsoft.VisualStudio.DiagnosticsHub.Common
var CommonControls = Common.Controls;
var CommonKeyCodes = Common.KeyCodes;

var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";

            // This key enables additional column with unique ids.
            var debug = false;

            (function (AggregateType) {
                AggregateType[AggregateType["SystemCode"] = 1] = "SystemCode";
                AggregateType[AggregateType["JmcRejected"] = 2] = "JmcRejected";
            })(DiagnosticsHub.AggregateType || (DiagnosticsHub.AggregateType = {}));
            var AggregateType = DiagnosticsHub.AggregateType;

            (function (SortColumn) {
                SortColumn[SortColumn["Id"] = 1] = "Id";
                SortColumn[SortColumn["FunctionName"] = 2] = "FunctionName";
                SortColumn[SortColumn["InclusiveSamples"] = 3] = "InclusiveSamples";
                SortColumn[SortColumn["ExclusiveSamples"] = 4] = "ExclusiveSamples";
                SortColumn[SortColumn["InclusivePercent"] = 5] = "InclusivePercent";
                SortColumn[SortColumn["ExclusivePercent"] = 6] = "ExclusivePercent";
                SortColumn[SortColumn["Module"] = 7] = "Module";
            })(DiagnosticsHub.SortColumn || (DiagnosticsHub.SortColumn = {}));
            var SortColumn = DiagnosticsHub.SortColumn;

            (function (SortDirection) {
                SortDirection[SortDirection["Asc"] = 1] = "Asc";
                SortDirection[SortDirection["Desc"] = 2] = "Desc";
            })(DiagnosticsHub.SortDirection || (DiagnosticsHub.SortDirection = {}));
            var SortDirection = DiagnosticsHub.SortDirection;

            (function (ResultTaskType) {
                ResultTaskType[ResultTaskType["Expand"] = 1] = "Expand";
                ResultTaskType[ResultTaskType["Search"] = 2] = "Search";
            })(DiagnosticsHub.ResultTaskType || (DiagnosticsHub.ResultTaskType = {}));
            var ResultTaskType = DiagnosticsHub.ResultTaskType;

            /// <disable code="SA9016" justification="UI and GC are acronyms" />
            (function (ThreadRoles) {
                ThreadRoles[ThreadRoles["Unknown"] = 0] = "Unknown";
                ThreadRoles[ThreadRoles["UIThread"] = 0x1] = "UIThread";
                ThreadRoles[ThreadRoles["GCThread"] = 0x100] = "GCThread";
            })(DiagnosticsHub.ThreadRoles || (DiagnosticsHub.ThreadRoles = {}));
            var ThreadRoles = DiagnosticsHub.ThreadRoles;

            

            (function (SearchType) {
                SearchType[SearchType["RegEx"] = 0] = "RegEx";
                SearchType[SearchType["CaseSensitive"] = 1] = "CaseSensitive";
            })(DiagnosticsHub.SearchType || (DiagnosticsHub.SearchType = {}));
            var SearchType = DiagnosticsHub.SearchType;

            

            // Returns the path to current item [currentItemID,parentId,...,rootId]
            var getPathToItem = function (item) {
                var path = [];

                var currentNode = item;
                while (currentNode && currentNode.id !== null && typeof currentNode.id !== "undefined") {
                    path.push(currentNode.id);
                    currentNode = currentNode.parent;
                }

                return path;
            };

            // For the getResult request we want to prepare parameters.
            // Grid control put elements in rows based on sortDirection, so
            // when we just ask for children we ask always with SortDirection.Asc
            // but when we search we need to send current sortDirection of tree grid.
            var getSortParameters = function (info, sortDirection) {
                if (typeof sortDirection === "undefined") { sortDirection = null; }
                if (!sortDirection) {
                    sortDirection = (info.sortOrder.order === "desc") ? 2 /* Desc */ : 1 /* Asc */;
                }

                var sortColumn = null;
                switch (info.column.index) {
                    case "name":
                        sortColumn = 2 /* FunctionName */;
                        break;
                    case "iSamples":
                        sortColumn = 3 /* InclusiveSamples */;
                        break;
                    case "eSamples":
                        sortColumn = 4 /* ExclusiveSamples */;
                        break;
                    case "iPercent":
                        sortColumn = 5 /* InclusivePercent */;
                        break;
                    case "ePercent":
                        sortColumn = 6 /* ExclusivePercent */;
                        break;
                    case "module":
                        sortColumn = 7 /* Module */;
                        break;
                    case "id":
                        sortColumn = 1 /* Id */;
                        break;
                    default:
                        throw new Error(Plugin.Resources.getErrorString("JSCpuUsage.1001"));
                }

                return { column: sortColumn, direction: sortDirection };
            };

            // default comparer for all rows (can compare by all used columns)
            // keep in sync with CpuSamplingCallTreeViewJsonResult::Sort
            var defaultComparer = function (column, order, rowA, rowB) {
                var compare = 0;

                var v1 = rowA[column.index], v2 = rowB[column.index];
                if (typeof v1 === "undefined" || v1 === null) {
                    if (typeof v2 === "undefined" || v2 === null) {
                        return 0;
                    } else {
                        return -1;
                    }
                }

                if (column.index === "name") {
                    v1 = v1.toUpperCase();
                    v2 = v2.toUpperCase();
                    compare = (v1 === v2) ? 0 : ((v1 > v2) ? 1 : -1);
                } else {
                    compare = v1 - v2;
                }

                // If rows are the same - we want to sync the order with native side
                if (compare === 0) {
                    compare = rowA.id - rowB.id;
                }

                return compare;
            };

            // Derived class that adds on a dynamicTooltip method. This allows us
            // to generate tooltips based on what data is in the grid control
            var CpuTreeGridColumnInfo = (function (_super) {
                __extends(CpuTreeGridColumnInfo, _super);
                function CpuTreeGridColumnInfo(index, headerResource, tooltipResource, width, indent, canSortBy, ascendingOrder, format, columnCSSClass, headerCellContentsFunction, dynamicTooltipFunction) {
                    _super.call(this, index, Plugin.Resources.getString(headerResource), Plugin.Resources.getString(tooltipResource), width, canSortBy);

                    this.defaultSortOrder = ascendingOrder ? "asc" : "desc";
                    this.indent = indent;
                    this.comparer = defaultComparer;
                    this.format = format;
                    this.cssClass = columnCSSClass;
                    this.getDynamicTooltip = dynamicTooltipFunction;

                    // Only override if we are passed a function. Otherwise take the base class implementation
                    if (headerCellContentsFunction) {
                        this.getHeaderCellContents = headerCellContentsFunction;
                    }
                }
                return CpuTreeGridColumnInfo;
            })(CommonControls.Grid.ColumnInfo);
            DiagnosticsHub.CpuTreeGridColumnInfo = CpuTreeGridColumnInfo;

            // Derived class which implements context menu for the grid,
            // including Ctrl-C handling for clipboard copy
            var CpuUsageGridControl = (function (_super) {
                __extends(CpuUsageGridControl, _super);
                function CpuUsageGridControl(root, options) {
                    _super.call(this, root, options);
                    this._columnHeaderText = null;
                    this.initializeContextMenuCommands(); // setup the context menu commands
                    this._showTooltipHandler = this.showTooltip.bind(this);
                    this._hideTooltipHandler = this.hideTooltip.bind(this);
                    this._sqmCpuUsage = new DiagnosticsHub.Sqm.CpuUsage();
                }
                CpuUsageGridControl.prototype._onDismissContextMenu = function () {
                    this._contextMenuActive = false;
                    this._onBlur(null);
                };

                // Displays the Context Menu
                CpuUsageGridControl.prototype._onContextMenu = function (e) {
                    var _this = this;
                    if (!this.contextMenu)
                        return;

                    // Try to get the closest row
                    var rowInfo;
                    var xPos = 0;
                    var yPos = 0;

                    if (e.type === "contextmenu") {
                        rowInfo = this.getRowInfoFromEvent(e, ".grid-row");
                        xPos = e.clientX;
                        yPos = e.clientY;
                    } else if (e.type === "keydown" && this.isActive()) {
                        var selectedRowIndex = this.getSelectedRowIndex();
                        var visibleIndices = this.getVisibleRowIndices();

                        // If the row is not in the visible area, just scroll it into view
                        if (selectedRowIndex < visibleIndices.first || selectedRowIndex > visibleIndices.last) {
                            this.getSelectedRowIntoView();
                            return;
                        }

                        var selectedDataIndex = this.getSelectedDataIndex();
                        rowInfo = this.getRowInfo(selectedDataIndex);
                        if (!rowInfo) {
                            return;
                        }

                        xPos = rowInfo.row.clientLeft;
                        yPos = this.getElement().offsetTop + this.getHeaderHeight() + this.getRowTop(rowInfo.rowIndex) - this.getCanvas().scrollTop + this.getMeasurements().rowHeight;
                    }

                    if (!rowInfo) {
                        return;
                    }

                    this._cachedSourceFilename = null;
                    var selectedRow = this.getRowData(this.getSelectedDataIndex());
                    if (this.getSelectionCount() === 1 && selectedRow && selectedRow.fileName) {
                        var sourceService = new DiagnosticsHub.Controllers.SourceService();
                        sourceService.getAccessiblePathToFile(selectedRow.fileName).then(function (openablePath) {
                            if (openablePath) {
                                _this._cachedSourceFilename = openablePath;
                                _this._cachedSourceLineNumber = selectedRow.lineNumber;
                            } else if (selectedRow.fileName) {
                                // If the symbol has a source file but the source service doesn't give us
                                // an openable path, we report this as a failure to open the source file.
                                _this._sqmCpuUsage.failOpenSourceFile();
                            }

                            if (_this.cacheSelectedRows()) {
                                _this._contextMenuActive = true;
                                _this.contextMenu.show(xPos, yPos);
                            }
                        });
                    } else {
                        // Only the show the context menu if the selected rows were cached
                        if (this.cacheSelectedRows()) {
                            this._contextMenuActive = true;
                            this.contextMenu.show(xPos, yPos);
                        }
                    }
                };

                // override _onKeyDown for context menu keys
                CpuUsageGridControl.prototype._onKeyDown = function (e) {
                    switch (e.keyCode) {
                        case 121 /* F10 */:
                            // Shift + F10 should show the Context Menu
                            if (e.shiftKey) {
                                this._onContextMenu(e);

                                // return false to stop propagation of this keyboard event
                                return false;
                            }

                            break;
                        case 93 /* MENU */:
                            this._onContextMenu(e);

                            // return false to stop propagation of this keyboard event
                            return false;
                        case 9 /* TAB */:
                            // Do not process a tab key press - allow default behaviour to occur
                            // such that tab navigation works properly
                            return true;
                    }

                    return _super.prototype._onKeyDown.call(this, e);
                };

                CpuUsageGridControl.prototype._onBlur = function (e) {
                    // So that the current selection does not lose focus
                    if (!this._contextMenuActive) {
                        _super.prototype._onBlur.call(this, e);
                    }
                };

                // Place cached selection on the clipboard (as text)
                CpuUsageGridControl.prototype.copySelectedRowsToClipboard = function (menuId, menuItem, targetId) {
                    if (this._dataForClipboard) {
                        window.clipboardData.setData("Text", this._dataForClipboard);
                    }
                };

                // Handle ctrl-c by first caching any selected row, then copying the selected rows to the clipboard
                // if a selection was found
                CpuUsageGridControl.prototype.onCtrlC = function () {
                    if (this.cacheSelectedRows()) {
                        this.copySelectedRowsToClipboard(null, null, null);
                    }
                };

                // Handle ctrl-g by first caching any source file info for the selected row, then navigate to the file
                CpuUsageGridControl.prototype.onCtrlG = function () {
                    var _this = this;
                    this._cachedSourceFilename = null;
                    var selectedRow = this.getRowData(this.getSelectedDataIndex());
                    if (this.getSelectionCount() === 1 && selectedRow && selectedRow.fileName) {
                        var sourceService = new DiagnosticsHub.Controllers.SourceService();
                        sourceService.getAccessiblePathToFile(selectedRow.fileName).then(function (openablePath) {
                            if (openablePath) {
                                _this._cachedSourceFilename = openablePath;
                                _this._cachedSourceLineNumber = selectedRow.lineNumber;
                            } else if (selectedRow.fileName) {
                                // If the symbol has a source file but the source service doesn't give us
                                // an openable path, we report this as a failure to open the source file.
                                _this._sqmCpuUsage.failOpenSourceFile();
                            }
                        }).then(function () {
                            _this.navigateToCachedSource();
                        });
                    }
                };

                CpuUsageGridControl.prototype.getClipboardFormattedRowString = function (dataIndex, shallowestDepth) {
                    var rowText = "";
                    var rowData = this.getRowData(dataIndex);
                    if (rowData) {
                        var columns = this.getColumns();
                        for (var idx = 0; idx < columns.length; idx++) {
                            var column = columns[idx];
                            if (idx > 0) {
                                rowText += "\t";
                            }

                            if (column.format) {
                                rowText += rowData[column.index].localeFormat(column.format);
                            } else {
                                rowText += rowData[column.index];
                            }
                        }

                        // Check the expansion state, prepending " + " (collapsed), " - " (expanded), or "   " (not expandable)
                        // It's important for a space to be before the + or - because in Excel the + or - in the first character position
                        // is interpreted as an Excel formula resulting in a #NAME error.
                        // It's important for a space to be after the + or - for readability
                        var expandState = this._getExpandState(dataIndex);
                        if (expandState < 0) {
                            // collapsed
                            rowText = " + " + rowText;
                        } else if (expandState > 0) {
                            // expanded
                            rowText = " - " + rowText;
                        } else {
                            // neither expandable, nor collapsible
                            rowText = "   " + rowText;
                        }

                        // Prepend two spaces for each level (tree depth) of the selected row
                        // beyond the shallowest depth
                        var parent = rowData.parent;
                        var depthSkipped = 0;
                        while (parent) {
                            if (depthSkipped++ >= shallowestDepth) {
                                rowText = "  " + rowText;
                            }

                            parent = parent.parent;
                        }
                    }

                    return rowText;
                };

                CpuUsageGridControl.prototype.getShallowestDepthOfSelection = function () {
                    var shallowestDepth = 0;
                    var dataIndices = this.getSelectedRows();
                    if (dataIndices) {
                        // Find the shallowest depth of a selected row
                        shallowestDepth = Number.MAX_VALUE; // initial value is maximum possible
                        for (var index in dataIndices) {
                            if (dataIndices[index] !== null && typeof dataIndices[index] !== "undefined") {
                                var rowData = this.getRowData(dataIndices[index]);
                                var parent = rowData.parent;
                                var currentDepth = 0;
                                while (parent) {
                                    currentDepth++;
                                    if (currentDepth > shallowestDepth) {
                                        break;
                                    }

                                    parent = parent.parent;
                                }

                                // Update shallowest if this one is less than the previous
                                if (currentDepth < shallowestDepth) {
                                    shallowestDepth = currentDepth;
                                }
                            }
                        }
                    }

                    return shallowestDepth;
                };

                CpuUsageGridControl.prototype.expandNodesWhile = function (continueExpand) {
                    var currentDataIndex = this.getSelectedDataIndex();
                    if (currentDataIndex === -1) {
                        currentDataIndex = 0;
                    }

                    var currItem = this.getRowData(currentDataIndex);
                    while (currItem && !currItem.isPlaceholder && this._getExpandState(currentDataIndex) !== 0) {
                        this.expandNode(currentDataIndex);
                        if (!continueExpand(currItem)) {
                            break;
                        }

                        currentDataIndex++;
                        currItem = this.getRowData(currentDataIndex);
                    }
                };

                CpuUsageGridControl.prototype.getColumnPixelIndent = function (level) {
                    return level * 12;
                };

                CpuUsageGridControl.prototype._drawCell = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
                    var width = column.width || 20;

                    var cellElement = this.createElementWithClass("div", this.options().cellClass);
                    cellElement.style.width = isNaN(width) ? String(width) : width + "px";

                    var value = this.getColumnText(dataIndex, column, columnOrder);
                    cellElement.removeEventListener("mouseenter", this._showTooltipHandler.bind(this, value));
                    cellElement.removeEventListener("mouseleave", this._hideTooltipHandler.bind(this, value));

                    // Set the tooltip. No tooltip in case it is HTML as it can be set from the HTML itself
                    if (!column.hasHTMLContent) {
                        CommonControls.Grid.GridControl._setTooltip(cellElement, value, 65);
                    }

                    if (column.getDynamicTooltip) {
                        cellElement.addEventListener("mouseenter", this._showTooltipHandler.bind(this, column.getDynamicTooltip(this.getRowData(dataIndex))));
                        cellElement.addEventListener("mouseleave", this._hideTooltipHandler.bind(this));
                        this.populateCell(cellElement, dataIndex, column, value);
                    } else if (columnOrder === indentIndex && level > 0) {
                        var textIndent = this.getColumnPixelIndent(level);
                        if (textIndent < width) {
                            this.populateCell(cellElement, dataIndex, column, value);
                            this.addTreeIconWithIndent(cellElement, expandedState, level, column);
                        } else {
                            var ellipsis = document.createElement("div");
                            ellipsis.innerHTML = "[...]";
                            ellipsis.style.left = width - 18 + "px";
                            ellipsis.style.position = "absolute";
                            ellipsis.addEventListener("click", this.expandColumn.bind(this, ellipsis, column, textIndent, value));
                            cellElement.appendChild(ellipsis);
                            cellElement.addEventListener("mouseenter", this._showTooltipHandler.bind(this, value));
                            cellElement.addEventListener("mouseleave", this._hideTooltipHandler.bind(this, value));
                        }
                    } else {
                        this.populateCell(cellElement, dataIndex, column, value);
                    }

                    if (column.cssClass) {
                        var styles = column.cssClass.trim().split(" ");
                        for (var index = 0; index < styles.length; index++) {
                            cellElement.classList.add(styles[index]);
                        }
                    }

                    if (column.rowCss) {
                        cellElement.classList.add(column.rowCss);
                    }

                    return cellElement;
                };

                CpuUsageGridControl.prototype.expandColumn = function (ellipsis, column, textIndent, value) {
                    var tempDiv = document.createElement("div");
                    tempDiv.innerHTML = value;
                    tempDiv.style.position = "absolute";
                    tempDiv.style.left = "10000px";
                    ellipsis.appendChild(tempDiv);
                    var newColumnWidth = textIndent + tempDiv.scrollWidth;
                    ellipsis.removeChild(tempDiv);
                    column.width = newColumnWidth + 10;
                    this._applyColumnSizing(0, -1, true);
                };

                CpuUsageGridControl.prototype.showTooltip = function (value) {
                    Plugin.Tooltip.show({
                        content: value,
                        delay: 0
                    });
                };

                CpuUsageGridControl.prototype.hideTooltip = function () {
                    Plugin.Tooltip.dismiss();
                };

                CpuUsageGridControl.prototype.populateCell = function (cellElement, dataIndex, column, value) {
                    var href;
                    if (typeof column.hrefIndex !== "undefined") {
                        href = this.getColumnValue(dataIndex, column.hrefIndex, -1);
                    }

                    if (href) {
                        var link = document.createElement("a");
                        link.setAttribute("href", href);
                        link.innerText = value;
                        cellElement.appendChild(link);
                    } else {
                        if (value) {
                            if (column.hasHTMLContent) {
                                cellElement.innerHTML = value;
                            } else {
                                cellElement.innerText = value;
                            }
                        } else {
                            // add non-breaking whitespace to ensure the cell has the same height as non-empty cells
                            cellElement.innerHTML = "&nbsp;";
                        }
                    }
                };

                // Sets up the context menu commands
                CpuUsageGridControl.prototype.initializeContextMenuCommands = function () {
                    var _this = this;
                    var commands = new Array();

                    // Copy command
                    commands[0] = {
                        id: "copy",
                        callback: function () {
                            _this.copySelectedRowsToClipboard(null, null, null);
                        },
                        label: Plugin.Resources.getString("CpuUsageTreeGrid_ContextMenu_Copy"),
                        type: 1 /* command */,
                        iconEnabled: null,
                        iconDisabled: null,
                        accessKey: "Ctrl+C",
                        hidden: function () {
                            return false;
                        },
                        disabled: function () {
                            return false;
                        },
                        checked: function () {
                            return false;
                        },
                        cssClass: null,
                        submenu: null
                    };

                    commands[1] = {
                        id: "gotosource",
                        callback: function () {
                            _this.navigateToCachedSource();
                        },
                        label: Plugin.Resources.getString("CpuUsageTreeGrid_ContextMenu_ViewSource"),
                        type: 1 /* command */,
                        iconEnabled: null,
                        iconDisabled: null,
                        accessKey: "Ctrl+G",
                        hidden: function () {
                            return _this.getSelectionCount() !== 1;
                        },
                        disabled: function () {
                            return !_this._cachedSourceFilename;
                        },
                        checked: function () {
                            return false;
                        },
                        cssClass: null,
                        submenu: null
                    };

                    this._contextMenuCommands = commands;

                    // Wrap around the callbacks of each context menu item, to allow focus on the grid once the user clicks on a context menu item.
                    this._contextMenuCommands.forEach(function (contextMenuItem) {
                        if (contextMenuItem.callback) {
                            var oldContextMenuItemCallback = contextMenuItem.callback;
                            contextMenuItem.callback = function (menuId, menuItem) {
                                oldContextMenuItemCallback(menuId, menuItem);

                                // Simulate the action of _onContainerMouseDown
                                // 10 is the timeout used in _onContainerMouseDown in gridControl.ts
                                _this.focus(10);
                            };
                        }
                    });

                    this.contextMenu = Plugin.ContextMenu.create(this._contextMenuCommands, null, null, null, function () {
                    });
                    this._contextMenuActive = false;
                    this._onDismissContextMenu = this._onDismissContextMenu.bind(this);

                    this.addEventListenerToCanvas("contextmenu", this, this._onContextMenu);
                    this.contextMenu.addEventListener("dismiss", this._onDismissContextMenu);
                };

                // Get the column header text (localized) for the clipboard
                CpuUsageGridControl.prototype.getColumnHeaderText = function () {
                    // initialize column header text
                    if (!this._columnHeaderText) {
                        this._columnHeaderText = "";
                        var columns = this.getColumns();
                        for (var idx = 0; idx < columns.length; idx++) {
                            if (idx > 0) {
                                this._columnHeaderText += "\t";
                            }

                            var column = columns[idx];
                            this._columnHeaderText += column.text;
                        }
                    }

                    return this._columnHeaderText;
                };

                // Navigate to the source file and line # cached for the selected row
                CpuUsageGridControl.prototype.navigateToCachedSource = function () {
                    if (this._cachedSourceFilename) {
                        var sourceService = new DiagnosticsHub.Controllers.SourceService();
                        sourceService.showDocument(this._cachedSourceFilename, this._cachedSourceLineNumber);
                    }
                };

                // Caches selected rows, if any, clearing the cache first
                // Returns true to indicate that a selection was found and cached was populated
                // Returns false indicating that no selection was found and cache was cleared
                CpuUsageGridControl.prototype.cacheSelectedRows = function () {
                    // clear out any previously cached selected item text
                    this._dataForClipboard = null;

                    // determine if there are selected items
                    var dataIndices = this.getSelectedRows();
                    if (dataIndices === null) {
                        return false;
                    }

                    // determine the shallowest tree depth of any selected row
                    var shallowestDepth = this.getShallowestDepthOfSelection();

                    // Build the selected text by first prepending the column headers as the first line,
                    // then add each row's text in seperate lines
                    var clipboardText = this.getColumnHeaderText();

                    var prevIndex = -1;
                    for (var index in dataIndices) {
                        var idx = parseInt(index.toString());
                        if (dataIndices[index] !== null && typeof dataIndices[index] !== "undefined") {
                            var rowText = this.getClipboardFormattedRowString(dataIndices[index], shallowestDepth);

                            // If this row is discontiguous, prepend [...]\r\n (an entire line) to indicate the selection break
                            if (prevIndex !== -1) {
                                if (prevIndex !== (idx - 1)) {
                                    rowText = "[...]\r\n" + rowText;
                                }
                            }

                            clipboardText = clipboardText + "\r\n" + rowText;
                        }

                        prevIndex = idx;
                    }

                    // Update the cached text
                    this._dataForClipboard = clipboardText;

                    // return true to indicate that context menu can be shown
                    return true;
                };
                return CpuUsageGridControl;
            })(CommonControls.Grid.GridControl);
            DiagnosticsHub.CpuUsageGridControl = CpuUsageGridControl;

            // Custom collection to get information about a thread state quickly
            var ThreadCheckedDictionary = (function () {
                function ThreadCheckedDictionary() {
                    this._dictionary = {};
                }
                ThreadCheckedDictionary.prototype.setThreadChecked = function (tid, isChecked) {
                    this._dictionary[tid] = isChecked;
                };

                // Function to determine if a thread has been checked.
                // If the thread is not present in the dictionary, it is assumed to be.
                ThreadCheckedDictionary.prototype.isThreadChecked = function (tid) {
                    var isChecked = this._dictionary[tid];
                    return (typeof isChecked === "undefined") ? true : isChecked;
                };
                return ThreadCheckedDictionary;
            })();
            DiagnosticsHub.ThreadCheckedDictionary = ThreadCheckedDictionary;

            // Enumeration for loading data
            (function (LoadDataFor) {
                LoadDataFor[LoadDataFor["CallTree"] = 1] = "CallTree";
                LoadDataFor[LoadDataFor["Filter"] = 2] = "Filter";
                LoadDataFor[LoadDataFor["All"] = 3] = "All";
            })(DiagnosticsHub.LoadDataFor || (DiagnosticsHub.LoadDataFor = {}));
            var LoadDataFor = DiagnosticsHub.LoadDataFor;

            var CpuUsageTreeGrid = (function () {
                function CpuUsageTreeGrid(config) {
                    this._analyzerId = "DCA8B3EF-28C5-4B08-BAFC-B072F8AA9277";
                    this._detailViewId = "DCA8B3EF-17B4-4B08-BAFC-B072F8AA9277";
                    this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                    this._currentContextData = { customDomain: {} };
                    this._callTreeResult = null;
                    this._grid = null;
                    this._config = null;
                    this._dataWarehouse = null;
                    this._columns = null;
                    this._searchInput = null;
                    this._progressBar = null;
                    this._progressMessage = null;
                    this._isCaseSensitive = false;
                    this._isRegex = false;
                    this._disableTreeGrid = null;
                    this._lastSearchPromise = null;
                    this._buttonCreateDetailedReport = null;
                    this._timeRangeChanged = false;
                    this._inputIsFocused = false;
                    this._isReportButtonFocused = false;
                    this._jmcOn = true;
                    this._isSearching = false;
                    this._isVisible = false;
                    this._threadDropDownDefaultState = true;
                    if (config && config.containerId) {
                        this._config = config;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSCpuUsage.1000"));
                    }

                    this._threadSelectionChangedHandler = this.threadSelectionChanged.bind(this);
                    this._timeRangeChangedHandler = this.timeRangeChanged.bind(this);
                    this._cacheTimeRangeChangedHandler = this.cacheTimeRangeChanged.bind(this);
                    this._jmcEnabledStateChangedHandler = this.jmcEnabledStateChangedHandler.bind(this);
                    this._cacheJmcEnabledStateChangedHandler = this.cacheJmcEnabledStateChangedHandler.bind(this);

                    this._viewEventManager = DiagnosticsHub.getViewEventManager();
                    this.addExternalEvents(this._cacheTimeRangeChangedHandler, this._cacheJmcEnabledStateChangedHandler);
                    this._container = document.getElementById(this._config.containerId);
                    this._reportButtonFocusHandler = this.onReportButtonFocus.bind(this);
                    this._reportButtonBlurHandler = this.onReportButtonBlur.bind(this);
                    this._reportButtonKeyPressHandler = this.onReportButtonKeyPress.bind(this);
                    this._reportButtonClickHandler = this.onReportButtonClick.bind(this);
                    this._automation = DiagnosticsHub.getAutomationManager(this._logger);

                    while (this._container.firstChild) {
                        this._container.removeChild(this._container.firstChild);
                    }

                    this._viewEventManager.detailsViewSelectionChanged.addEventListener(this.detailsViewChanged.bind(this));
                    this._viewEventManager.detailsViewReady.raiseEvent({
                        Id: this._detailViewId
                    });

                    // Add our event listeners
                    var gridMain = document.getElementById("mainContainer");
                    gridMain.addEventListener("keydown", this.onKeyDown.bind(this));

                    this._sqmCpuUsage = new DiagnosticsHub.Sqm.CpuUsage();
                }
                CpuUsageTreeGrid.prototype.render = function () {
                    this._disableTreeGrid = document.getElementsByClassName("cpu-usage-container-overlay")[0];
                    this.createToolbar();

                    // Create our progress indicators
                    this._progressBar = document.getElementById("progressBar");
                    this._progressMessage = document.getElementById("progressMessage");

                    // Promise is cached so that, if the initial loading of data is ongoing and details view change
                    // event occurs, we can queue it with this promise to make it a sync call.
                    this._initialLoad = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse().then(this.initializeGrid.bind(this)).then(this.loadData.bind(this, 2 /* Filter */));
                };

                CpuUsageTreeGrid.prototype.drawHeaderCellValue = function (column, columnOrder, columnHeaderCSSClass) {
                    // Create the element
                    var cellElement = document.createElement("div");
                    cellElement.classList.add("title");
                    if (column.hasHTMLContent) {
                        cellElement.innerHTML = column.text || "&nbsp;";
                    } else {
                        cellElement.innerText = column.text || "";
                    }

                    if (columnHeaderCSSClass) {
                        cellElement.classList.add(columnHeaderCSSClass);
                    }

                    return cellElement;
                };

                CpuUsageTreeGrid.prototype.detailsViewChanged = function (args) {
                    var _this = this;
                    if (!args) {
                        this._logger.debug("detailsViewChanged - args is null or undefined.");
                        return;
                    }

                    this._cachedDetailsViewSelectionChangedEventArgs = args;
                    if (this._initialLoad) {
                        this._initialLoad.then(function () {
                            _this.switchDetailsView(_this._cachedDetailsViewSelectionChangedEventArgs);
                        });
                        this._initialLoad = null;
                    } else {
                        this.switchDetailsView(args);
                    }
                };

                CpuUsageTreeGrid.prototype.switchDetailsView = function (args) {
                    if (args.Id.toLowerCase() === this._detailViewId.toLowerCase() && !this._isVisible) {
                        this._isVisible = true;
                        this.addExternalEvents(this._timeRangeChangedHandler, this._jmcEnabledStateChangedHandler);
                        this.removeExternalEvents(this._cacheTimeRangeChangedHandler, this._cacheJmcEnabledStateChangedHandler);
                        this.timeRangeChanged({
                            isIntermittent: false,
                            position: this._inactiveTimeRange
                        });
                        this.jmcEnabledStateChangedHandler({
                            currEnabledState: this._cachedJmcOn,
                            prevEnabledState: this._jmcOn
                        });
                    } else if (args.Id.toLowerCase() !== this._detailViewId.toLowerCase() && this._isVisible) {
                        this._isVisible = false;
                        this._cachedJmcOn = this._jmcOn;
                        this._inactiveTimeRange = this._currentContextData.timeDomain;
                        this.removeExternalEvents(this._timeRangeChangedHandler, this._jmcEnabledStateChangedHandler);
                        this.addExternalEvents(this._cacheTimeRangeChangedHandler, this._cacheJmcEnabledStateChangedHandler);
                    }
                };

                CpuUsageTreeGrid.prototype.cacheTimeRangeChanged = function (evt) {
                    this._inactiveTimeRange = evt.position;
                    if (evt.isIntermittent) {
                        return;
                    }

                    var timeRange = evt.position;
                    if (timeRange) {
                        this._inactiveTimeRange = timeRange;
                    }
                };

                CpuUsageTreeGrid.prototype.cacheJmcEnabledStateChangedHandler = function (args) {
                    if (args.currEnabledState !== args.prevEnabledState) {
                        this._cachedJmcOn = args.currEnabledState;
                    }
                };

                CpuUsageTreeGrid.prototype.addExternalEvents = function (selectionChangedListener, jmcStateChangedlistener) {
                    if (this._viewEventManager) {
                        this._viewEventManager.selectionChanged.addEventListener(selectionChangedListener);
                        this._viewEventManager.jmcEnabledStateChanged.addEventListener(jmcStateChangedlistener);
                    }
                };

                CpuUsageTreeGrid.prototype.removeExternalEvents = function (selectionChangedListener, jmcStateChangedlistener) {
                    if (this._viewEventManager) {
                        this._viewEventManager.selectionChanged.removeEventListener(selectionChangedListener);
                        this._viewEventManager.jmcEnabledStateChanged.removeEventListener(jmcStateChangedlistener);
                    }
                };

                CpuUsageTreeGrid.prototype.initializeGrid = function (dw) {
                    this._dataWarehouse = dw;
                };

                CpuUsageTreeGrid.prototype.enableInProgressState = function () {
                    this._disableTreeGrid.classList.add("cpu-usage-container-disable");
                    this._progressBar.classList.remove("progress-hidden");
                    this._progressMessage.classList.remove("progress-hidden");
                };

                CpuUsageTreeGrid.prototype.disableInProgressState = function () {
                    this._progressBar.classList.add("progress-hidden");
                    this._progressMessage.classList.add("progress-hidden");
                    this._disableTreeGrid.classList.remove("cpu-usage-container-disable");
                };

                CpuUsageTreeGrid.prototype.setProgressMessage = function (message) {
                    this._progressMessage.innerText = message;
                };

                CpuUsageTreeGrid.prototype.createToolbar = function () {
                    this._searchContainer = document.getElementsByClassName("search-container")[0];
                    this._searchInput = document.getElementById("inputSearch");
                    this._searchInput.placeholder = Plugin.Resources.getString("CPUViewSearchWatermark");
                    this._searchInput.addEventListener("focus", this.onFocus.bind(this));
                    this._searchInput.addEventListener("blur", this.onBlur.bind(this));
                    this._searchInput.addEventListener("keydown", this.searchInputOnKeyDown.bind(this));

                    this._submit = document.getElementsByClassName("search-submit")[0];
                    this._submit.addEventListener("click", this.onSearchClick.bind(this));
                    this._searchOption = document.getElementById("searchOptions");

                    this._buttonCreateDetailedReport = document.getElementById("buttonCreateDetailedReport");
                    this._buttonCreateDetailedReport.innerHTML = Plugin.Resources.getString("Button_CreateDetailedReport");
                    this._buttonCreateDetailedReport.setAttribute("role", "button");
                    this._buttonCreateDetailedReport.setAttribute("aria-label", Plugin.Resources.getString("Button_CreateDetailedReport"));
                    this.enableReportButton();
                    this.createSearchOptions();
                };

                CpuUsageTreeGrid.prototype.onSearchClick = function (evt) {
                    this.search();
                };

                CpuUsageTreeGrid.prototype.enableReportButton = function () {
                    this._buttonCreateDetailedReport.addEventListener("click", this._reportButtonClickHandler);
                    this._buttonCreateDetailedReport.addEventListener("focus", this._reportButtonFocusHandler);
                    this._buttonCreateDetailedReport.addEventListener("blur", this._reportButtonBlurHandler);
                    this._buttonCreateDetailedReport.addEventListener("keypress", this._reportButtonKeyPressHandler);
                    this._buttonCreateDetailedReport.classList.add("create-report-button-enabled");
                    this._buttonCreateDetailedReport.classList.remove("create-report-button-disabled");
                    this._buttonCreateDetailedReport.tabIndex = 0;
                };

                CpuUsageTreeGrid.prototype.disableReportButton = function () {
                    this._buttonCreateDetailedReport.removeEventListener("click", this._reportButtonClickHandler);
                    this._buttonCreateDetailedReport.removeEventListener("focus", this._reportButtonFocusHandler);
                    this._buttonCreateDetailedReport.removeEventListener("blur", this._reportButtonBlurHandler);
                    this._buttonCreateDetailedReport.removeEventListener("keypress", this._reportButtonKeyPressHandler);
                    this._buttonCreateDetailedReport.classList.remove("create-report-button-enabled");
                    this._buttonCreateDetailedReport.classList.add("create-report-button-disabled");
                    this._buttonCreateDetailedReport.tabIndex = -1;
                };

                CpuUsageTreeGrid.prototype.onReportButtonClick = function (evt) {
                    this.createDetailedReport();
                };

                CpuUsageTreeGrid.prototype.onReportButtonFocus = function (evt) {
                    this._isReportButtonFocused = true;
                };

                CpuUsageTreeGrid.prototype.onReportButtonBlur = function (evt) {
                    this._isReportButtonFocused = false;
                };

                CpuUsageTreeGrid.prototype.onReportButtonKeyPress = function (evt) {
                    if (this._isReportButtonFocused && 13 /* ENTER */ === evt.keyCode) {
                        this.createDetailedReport();
                    }
                };

                CpuUsageTreeGrid.prototype.onFocus = function (evt) {
                    if (this._focusString !== null && typeof this._focusString !== "undefined") {
                        this._searchInput.value = this._focusString;
                        this._focusString = null;
                    }

                    this.toggleSearchStyle(true);
                    this._inputIsFocused = true;
                    this._searchInput.select();
                };

                CpuUsageTreeGrid.prototype.onBlur = function (evt) {
                    this.toggleSearchStyle(false);
                    this._inputIsFocused = false;
                };

                CpuUsageTreeGrid.prototype.onKeyDown = function (evt) {
                    switch (evt.keyCode) {
                        case 114 /* F3 */:
                            this.search();
                            evt.stopPropagation();
                            evt.preventDefault();
                            break;
                    }
                };

                CpuUsageTreeGrid.prototype.searchInputOnKeyDown = function (evt) {
                    // if input is focused and key pressed is 'ENTER' or 'F3' perform search.
                    if (this._inputIsFocused && 13 /* ENTER */ === evt.keyCode) {
                        this.search();
                    } else if (114 /* F3 */ === evt.keyCode) {
                        this.search();
                        evt.preventDefault();
                    } else if (this._inputIsFocused && 27 /* ESCAPE */ === evt.keyCode) {
                        this._searchInput.value = "";
                    }

                    evt.stopPropagation();
                };

                CpuUsageTreeGrid.prototype.focusSearchInput = function () {
                    if (this._searchInput) {
                        this._focusString = this._searchInput.value;
                        this._searchInput.focus();
                    }
                };

                CpuUsageTreeGrid.prototype.toggleSearchStyle = function (value) {
                    if (value) {
                        this._searchContainer.classList.add("search-container-keyboard");
                        this._submit.classList.add("search-submit-keyboard");
                        this._searchOption.classList.add("search-option-keyboard");
                    } else {
                        this._searchContainer.classList.remove("search-container-keyboard");
                        this._submit.classList.remove("search-submit-keyboard");
                        this._searchOption.classList.remove("search-option-keyboard");
                    }
                };

                CpuUsageTreeGrid.prototype.createSearchOptions = function () {
                    var text = Plugin.Resources.getString("CPUViewRegularExpression");
                    var regexItem = {
                        ariaText: text,
                        data: 0 /* RegEx */,
                        label: text,
                        tooltip: text,
                        checked: false,
                        type: DiagnosticsHub.DropDownItemType.checkbox,
                        onChangeHandler: this.onSearchOptionSelected.bind(this)
                    };

                    text = Plugin.Resources.getString("CPUViewCaseSensitive");
                    var caseSensitiveItem = {
                        ariaText: text,
                        data: 1 /* CaseSensitive */,
                        label: text,
                        tooltip: text,
                        checked: false,
                        type: DiagnosticsHub.DropDownItemType.checkbox,
                        onChangeHandler: this.onSearchOptionSelected.bind(this)
                    };

                    var searchAriaText = Plugin.Resources.getString("CPUViewSearchOptionsTitle");
                    var searchDropDownConfig = {
                        containerId: "searchOptions",
                        header: {
                            text: "",
                            ariaText: searchAriaText,
                            className: "search-options-custom"
                        },
                        body: {
                            items: [regexItem, caseSensitiveItem],
                            title: Plugin.Resources.getString("CPUViewSearchOptionsTitle"),
                            applyFilterImmediately: true,
                            delay: 2000
                        },
                        footer: null,
                        toggleParentStyle: this.toggleSearchStyle.bind(this)
                    };

                    var search = new Microsoft.VisualStudio.DiagnosticsHub.DropDownOptions(searchDropDownConfig);
                    search.render();
                };

                CpuUsageTreeGrid.prototype.onSearchOptionSelected = function (args) {
                    this._sqmCpuUsage.searchOptionsChanged();

                    if (args && args.data !== null && typeof args.data !== "undefined" && args.checked !== null && typeof args.checked !== "undefined") {
                        var hasChanged = false;
                        if (args.data === 1 /* CaseSensitive */ && this._isCaseSensitive !== args.checked) {
                            this._isCaseSensitive = args.checked;
                            hasChanged = true;
                        } else if (args.data === 0 /* RegEx */ && this._isRegex !== args.checked) {
                            this._isRegex = args.checked;
                            hasChanged = true;
                        }

                        if (hasChanged) {
                            this.focusSearchInput();
                        }
                    }
                };

                CpuUsageTreeGrid.prototype.createDetailedReport = function () {
                    var _this = this;
                    this._sqmCpuUsage.createDetailedReport();

                    this.disableReportButton();
                    DiagnosticsHub.getCurrentDocument().openInAlternateFormat(1 /* Vspx */).then(function (path) {
                        _this.enableReportButton();
                    }, function (err) {
                        _this._logger.debug("Create detailed report failure: " + JSON.stringify(err));
                        alert(Plugin.Resources.getString("ErrMsg_FailedToCreateDetailedReport"));
                        _this.enableReportButton();
                    });
                };

                CpuUsageTreeGrid.prototype.getThreadInfo = function (targetControl) {
                    var contextData = {
                        customDomain: { task: "get-threads" }
                    };

                    if (this._currentContextData.timeDomain) {
                        contextData.timeDomain = this._currentContextData.timeDomain;
                    }

                    // Set the targeted control for the thread info if supplied.
                    if (targetControl) {
                        contextData.customDomain.control = targetControl;
                    }

                    return this.queryDataWarehouse(contextData, this._analyzerId);
                };

                CpuUsageTreeGrid.prototype.onShowExternalCodeChangedHandler = function (args) {
                    if (args && args.hasChanged) {
                        this._jmcOn = !args.checked;
                        this.threadDropDownStateChange();
                        this._sqmCpuUsage.jmcToggle(this._jmcOn);

                        if (this._dataWarehouse) {
                            this._dataWarehouse.getJmcService().setJmcEnabledState(this._jmcOn);
                        }
                    }
                };

                CpuUsageTreeGrid.prototype.populateThreadFilter = function (threads) {
                    var newThreadCheckboxItems = [];

                    // Sort the threads by role then by stack count in descending order
                    threads.sort(function (thread1, thread2) {
                        if (thread1.roles === 0 /* Unknown */ && thread2.roles !== 0 /* Unknown */) {
                            return 1;
                        } else if (thread1.roles !== 0 /* Unknown */ && thread2.roles === 0 /* Unknown */) {
                            return -1;
                        } else {
                            return thread2.sampleCount - thread1.sampleCount;
                        }
                    });

                    // Get the current thread checked state of the dropdown
                    var threadCheckedState = this.getCurrentThreadFilterConfig();

                    var newThreadDomain = [];
                    for (var i = 0; i < threads.length; i++) {
                        var thread = threads[i];
                        var text = Plugin.Resources.getString("ThreadsSelection_Thread") + thread.tid;
                        var toolTipParts = [text];
                        var roles = thread.roles;

                        // The 'pN' format specifies a percentage with N decimal places
                        var threadSamplesThreshold = 0.001;
                        var samplePercent;
                        if (thread.sampleCount === 0) {
                            samplePercent = thread.sampleFractionOfProcess.localeFormat("p0");
                        } else if (thread.sampleFractionOfProcess < threadSamplesThreshold) {
                            // Threads accounting for < 0.1% of the samples in the context will be
                            // marked "< 0.1%" rather than showing an accurate percentage.
                            samplePercent = "< " + threadSamplesThreshold.localeFormat("p1");
                        } else {
                            samplePercent = thread.sampleFractionOfProcess.localeFormat("p1");
                        }

                        text += " : " + samplePercent;

                        // Append the role to the label
                        if ((roles & 1 /* UIThread */) !== 0) {
                            var uiRole = Plugin.Resources.getString("ThreadsSelection_UIThread");
                            text += " (" + uiRole + ")";
                            toolTipParts.push(Plugin.Resources.getString("ThreadRoleLabel") + uiRole);
                        }

                        toolTipParts.push(Plugin.Resources.getString("SamplePercentOfProcessLabel") + samplePercent);
                        toolTipParts.push(Plugin.Resources.getString("SampleCountLabel") + thread.sampleCount);

                        var isChecked = threadCheckedState.isThreadChecked(thread.tid);
                        var newItemConfig = {
                            ariaText: text,
                            data: thread,
                            label: text,
                            tooltip: toolTipParts.join("\r\n"),
                            checked: isChecked,
                            type: DiagnosticsHub.DropDownItemType.checkbox
                        };

                        if (isChecked) {
                            newThreadDomain.push(thread.tid);
                        }

                        newThreadCheckboxItems.push(newItemConfig);
                    }

                    var showAllText = Plugin.Resources.getString("CPUViewShowExternalCodeLabel");
                    var showExternalCode = {
                        ariaText: showAllText,
                        checked: !this._jmcOn,
                        data: null,
                        label: showAllText,
                        onChangeHandler: this.onShowExternalCodeChangedHandler.bind(this),
                        iconToken: "diagnosticsHub-justmycode",
                        tooltip: showAllText,
                        type: DiagnosticsHub.DropDownItemType.checkbox
                    };

                    var listboxText = Plugin.Resources.getString("CPUViewThreadListboxLabel");
                    var listboxItem = {
                        areAllSelected: newThreadCheckboxItems.length === newThreadDomain.length,
                        checkboxItems: newThreadCheckboxItems,
                        ariaText: Plugin.Resources.getString("CPUViewThreadListboxTooltip"),
                        data: threads,
                        label: listboxText,
                        onChangeHandler: this._threadSelectionChangedHandler.bind(this),
                        tooltip: Plugin.Resources.getString("CPUViewThreadListboxTooltip"),
                        type: DiagnosticsHub.DropDownItemType.listbox
                    };

                    var dropDownText = Plugin.Resources.getString("CPUViewFilterView");
                    var applyButtonText = Plugin.Resources.getString("Button_CPUViewApply");
                    var cancelButtonText = Plugin.Resources.getString("Button_CPUViewCancel");
                    var threadDropDownConfig = {
                        containerId: "filterContainer",
                        header: {
                            text: dropDownText,
                            ariaText: dropDownText,
                            iconToken: "diagnosticsHub-filter"
                        },
                        body: {
                            items: [showExternalCode, listboxItem],
                            applyFilterImmediately: false
                        },
                        footer: {
                            applyButton: {
                                text: applyButtonText,
                                ariaText: applyButtonText
                            },
                            cancelButton: {
                                text: cancelButtonText,
                                ariaText: cancelButtonText
                            }
                        }
                    };

                    this._currentContextData.threadDomain = newThreadDomain;

                    if (this._threadDropDown) {
                        this._threadDropDown.unload();
                        this._threadDropDown = null;
                    }

                    this._threadDropDown = new Microsoft.VisualStudio.DiagnosticsHub.DropDownOptions(threadDropDownConfig);
                    this._threadDropDown.render();
                    this.threadDropDownStateChange();
                };

                CpuUsageTreeGrid.prototype.getCurrentThreadFilterConfig = function () {
                    var threadCheckedState = new ThreadCheckedDictionary();
                    if (!this._threadDropDown) {
                        return threadCheckedState;
                    }

                    var currConfig = this._threadDropDown.getConfiguration();
                    if (!currConfig) {
                        this._logger.debug("Drop down exists but does not have configuration");
                        return threadCheckedState;
                    }

                    if (currConfig.body.items.length !== 2) {
                        this._logger.debug("Current body configuration count should be '2'");
                        return threadCheckedState;
                    }

                    // Populate the dictionary with the current thread filter state
                    var currThreadListboxItem = currConfig.body.items[1];
                    var currThreadCheckboxItems = currThreadListboxItem.checkboxItems;
                    for (var j = 0; j < currThreadCheckboxItems.length; j++) {
                        var currItemConfig = currThreadCheckboxItems[j];
                        var currThreadInfo = currItemConfig.data;

                        threadCheckedState.setThreadChecked(currThreadInfo.tid, currItemConfig.checked);
                    }

                    return threadCheckedState;
                };

                CpuUsageTreeGrid.prototype.threadDropDownStateChange = function () {
                    // Check and make sure our drop down is in the default state. If it is not
                    // then we need to set a highlight to indicate it is not.
                    if (this._threadDropDown) {
                        this._threadDropDown.setHighlight(!this._threadDropDownDefaultState || !this._jmcOn);
                    }
                };

                CpuUsageTreeGrid.prototype.threadSelectionChanged = function (args) {
                    var isDefaultSelectionState = false;
                    var threadList = [];
                    if (args && args.itemsData) {
                        for (var i = 0; i < args.itemsData.length; i++) {
                            var item = args.itemsData[i];
                            if (item.checked) {
                                var thread = item.data;
                                if (thread) {
                                    threadList.push(thread.tid);
                                }
                            }
                        }

                        // If the length of threadList and args.itemsData is the same, then all the
                        // threads are selected and we are in the default state for threads.
                        this._threadDropDownDefaultState = args.itemsData.length === threadList.length;
                    }

                    // Notify of the state change
                    this.threadDropDownStateChange();

                    this._currentContextData.threadDomain = threadList;

                    // Only query for data if threads are selected, else just set the tree grid as empty.
                    if (threadList.length > 0) {
                        if (this._loadDataPromise) {
                            this._loadDataPromise.cancel();
                        }

                        this._loadDataPromise = this.loadData(1 /* CallTree */);
                    } else {
                        this.populateTreeGrid([]);
                    }
                };

                CpuUsageTreeGrid.prototype.timeRangeChanged = function (evt) {
                    if (evt.isIntermittent) {
                        return;
                    }

                    var timeRange = evt.position;
                    if (!timeRange) {
                        return;
                    }

                    if (!this._currentContextData.timeDomain || !this._currentContextData.timeDomain.equals(timeRange)) {
                        this._currentContextData.timeDomain = timeRange;
                        this._timeRangeChanged = true;

                        if (this._currentContextData.threadDomain && this._currentContextData.threadDomain.length > 0) {
                            if (this._loadDataPromise) {
                                this._loadDataPromise.cancel();
                            }

                            this._loadDataPromise = this.loadData();
                        }
                    }
                };

                CpuUsageTreeGrid.prototype.loadData = function (dataToLoad) {
                    if (typeof dataToLoad === "undefined") { dataToLoad = 3 /* All */; }
                    this.setProgressMessage(Plugin.Resources.getString("LoadDataProgressMessage"));
                    this.enableInProgressState();

                    switch (dataToLoad) {
                        case 1 /* CallTree */:
                            return this.loadCallTree().then(this.getShowExternalCodeState.bind(this)).then(this.populateShowExternalCodeState.bind(this)).then(this.loadDataComplete.bind(this), this.errorHandler.bind(this));

                        case 2 /* Filter */:
                            return this.getShowExternalCodeState().then(this.populateShowExternalCodeState.bind(this)).then(this.getThreadInfo.bind(this, "filter")).then(this.populateThreadFilter.bind(this)).then(this.loadDataComplete.bind(this), this.errorHandler.bind(this));

                        case 3 /* All */:
                        default:
                            return this.loadCallTree().then(this.getShowExternalCodeState.bind(this)).then(this.populateShowExternalCodeState.bind(this)).then(this.getThreadInfo.bind(this, "filter")).then(this.populateThreadFilter.bind(this)).then(this.loadDataComplete.bind(this), this.errorHandler.bind(this));
                    }
                };

                CpuUsageTreeGrid.prototype.getShowExternalCodeState = function () {
                    if (this._dataWarehouse) {
                        return this._dataWarehouse.getJmcService().getJmcEnabledState();
                    }
                };

                CpuUsageTreeGrid.prototype.populateShowExternalCodeState = function (data) {
                    if (typeof data === "boolean") {
                        this._jmcOn = data;
                    }
                };

                CpuUsageTreeGrid.prototype.jmcEnabledStateChangedHandler = function (args) {
                    if (args.currEnabledState !== args.prevEnabledState) {
                        this._jmcOn = args.currEnabledState;
                        if (this._loadDataPromise) {
                            this._loadDataPromise.cancel();
                        }

                        this._loadDataPromise = this.loadData();
                    }
                };

                CpuUsageTreeGrid.prototype.loadDataComplete = function () {
                    this._initialLoad = null;
                    this._timeRangeChanged = false;
                    this.disableInProgressState();
                };

                CpuUsageTreeGrid.prototype.loadCallTree = function () {
                    // cancel search if it is active
                    if (this._lastSearchPromise) {
                        this._lastSearchPromise.cancel();
                        this._lastSearchPromise = null;
                    }

                    var promise;

                    // dispose previous result if it is active
                    if (this._callTreeResult) {
                        var oldResult = this._callTreeResult;
                        this._callTreeResult = null;
                        promise = oldResult.dispose();
                    } else {
                        promise = Plugin.Promise.wrap(null);
                    }

                    this._currentContextData.customDomain.task = "get-call-tree-view";

                    return promise.then(this.queryDataWarehouse.bind(this, this._currentContextData, this._analyzerId)).then(this.getResultData.bind(this)).then(this.setCreateDetailedReportButtonState.bind(this)).then(this.populateTreeGrid.bind(this), this.errorHandler.bind(this));
                };

                CpuUsageTreeGrid.prototype.queryDataWarehouse = function (contextData, analyzerId) {
                    return this._dataWarehouse.getFilteredData(contextData, analyzerId);
                };

                CpuUsageTreeGrid.prototype.getResultData = function (result) {
                    this._callTreeResult = result;
                    var request = {
                        type: 1 /* Expand */,
                        sort: getSortParameters(this.getCurrentSortInfo(), 1 /* Asc */),
                        path: []
                    };

                    return this._callTreeResult.getResult(request);
                };

                CpuUsageTreeGrid.prototype.setCreateDetailedReportButtonState = function (result) {
                    var enableIceCap = result.enableIceCap;
                    if (enableIceCap) {
                        this._buttonCreateDetailedReport.style.display = "block";
                    }

                    return result.callTreeData;
                };

                CpuUsageTreeGrid.prototype.populateTreeGrid = function (result) {
                    if (!this._grid) {
                        // initialize tree grid with data
                        var gridOptions = new CommonControls.Grid.GridOptions(this.getChildrenDataCallback.bind(this), this.getColumns(), [this.getDefaultSortInfo()], null);

                        gridOptions.asyncInit = false;
                        gridOptions.allowMultiSelect = true;
                        this._grid = new CpuUsageGridControl(this._container, gridOptions);
                    }

                    var initialRows = this.constructRows(null, result);

                    // Reset the row selection
                    this._grid.setSelectedRowIndex(-1);

                    this._timeRangeChanged = false;

                    // Setting data source on the grid triggers a layout and redraw
                    return this._grid.setDataSource(initialRows.itemsWithPlaceholders, initialRows.expandStates, this.getColumns(), [this.getDefaultSortInfo()]).then(this.autoExpand.bind(this));
                };

                CpuUsageTreeGrid.prototype.errorHandler = function (error) {
                    if (this._loadDataPromise) {
                        this._loadDataPromise.cancel();
                    }

                    this._isSearching = false;
                    this.disableInProgressState();
                    this._logger.error(JSON.stringify(error));

                    if (parseInt(error.name, 16) === DiagnosticsHub.ErrorCodes.VSHUB_E_INVALID_REGEX) {
                        alert(Plugin.Resources.getString("ErrMsg_InvalidRegularExpression"));
                    }
                };

                CpuUsageTreeGrid.prototype.getChildrenDataCallback = function (parentTreeItem, complete) {
                    var parent = parentTreeItem;
                    if (!this._timeRangeChanged) {
                        // caching the promise so that in case another load data event happens, we can cancel the current executing request.
                        this._loadDataPromise = this._callTreeResult.getResult({ type: 1 /* Expand */, sort: getSortParameters(this.getCurrentSortInfo(), 1 /* Asc */), path: getPathToItem(parent) });

                        // Do not auto expand if seach is being performed.
                        var updateGridWithResultPromise = this._loadDataPromise.then(this.updateGridWithResult.bind(this, parent, complete));
                        if (!this._isSearching) {
                            updateGridWithResultPromise.done(this.autoExpand.bind(this), this.errorHandler.bind(this));
                        }
                    }
                };

                CpuUsageTreeGrid.prototype.updateGridWithResult = function (parent, complete, result) {
                    // The complete callback triggers a layout on the tree grid. The expand/collapse handler
                    // of the tree grid triggers a redraw
                    complete(this.constructRows(parent, result.callTreeData));
                    if (this._result && this._result.length > 0) {
                        this.searchChildNode(this._result);
                    }

                    return Plugin.Promise.wrap(null);
                };

                CpuUsageTreeGrid.prototype.autoExpand = function () {
                    if (this._grid) {
                        // Auto expand while the item has only 1 child.
                        this._grid.expandNodesWhile(function (currItem) {
                            if (!currItem || this._timeRangeChanged) {
                                return false;
                            }

                            return currItem.childCount === 1;
                        }.bind(this));
                    }
                };

                // Prepare rows to be shown in tree grid (with special placeholders for child elements)
                CpuUsageTreeGrid.prototype.constructRows = function (parent, result) {
                    var items = [];
                    var expandedStates = [];
                    if (result) {
                        while (result.length > 0) {
                            var item = result.pop();

                            // Convert name of node if node is aggregate
                            if (item.aggType) {
                                switch (item.aggType) {
                                    case 1 /* SystemCode */:
                                        item.name = Plugin.Resources.getString("SystemCodeLabel");
                                        break;

                                    case 2 /* JmcRejected */:
                                        item.name = Plugin.Resources.getString("ExternalCodeLabel");
                                        break;
                                }
                            }

                            switch (item.moduleCount) {
                                case 0:
                                    item.module = "";
                                    break;

                                case 1:
                                    break;

                                default:
                                    item.module = Plugin.Resources.getString("MultipleModuleLabel", item.moduleCount);
                            }

                            this._logger.debug(JSON.stringify(item));
                            item.parent = parent;
                            items.push(item);
                            if (item.childCount > 0) {
                                expandedStates.push(-1);
                                items.push({
                                    isPlaceholder: true,
                                    name: "",
                                    iSamples: 0,
                                    eSamples: 0,
                                    iPercent: 0,
                                    ePercent: 0,
                                    childCount: 0,
                                    lineNumber: 0,
                                    id: 0,
                                    module: "",
                                    moduleCount: 0,
                                    parent: null,
                                    fileName: ""
                                });
                                expandedStates.push(0);
                            } else {
                                expandedStates.push(0);
                            }
                        }
                    }

                    return {
                        itemsWithPlaceholders: items,
                        expandStates: expandedStates
                    };
                };

                // Get array of columns
                CpuUsageTreeGrid.prototype.getColumns = function () {
                    var _this = this;
                    if (this._columns === null) {
                        // The "p2" format string indicates a percentage with 2 decimal places.
                        var defaultColumnWidth = 150;
                        this._columns = [
                            new CpuTreeGridColumnInfo("name", "CpuUsageTreeGrid_FunctionNameHeader", "CpuUsageTreeGrid_FunctionNameTooltip", 400, true, true, true),
                            new CpuTreeGridColumnInfo("iPercent", "CpuUsageTreeGrid_TotalSamplesPercentHeader", "CpuUsageTreeGrid_TotalSamplesPercentHeaderTooltip", defaultColumnWidth, false, true, false, "p2", "grid-cell-numeric", /*columnHeaderCSSClass*/ function (column, columnOrder) {
                                return _this.drawHeaderCellValue(column, columnOrder, "grid-header-cell-numeric");
                            }, /*dynamicTooltipFunction*/ function (rowData) {
                                return !rowData.isPlaceholder ? Plugin.Resources.getString("CpuUsageTreeGrid_PercentageTooltip", rowData.iPercent.localeFormat("p2"), rowData.iSamples, _this._grid.getRowData(0).iSamples) : "";
                            }),
                            new CpuTreeGridColumnInfo("ePercent", "CpuUsageTreeGrid_SelfSamplesPercentHeader", "CpuUsageTreeGrid_SelfSamplesPercentHeaderTooltip", defaultColumnWidth, false, true, false, "p2", "grid-cell-numeric", /*columnHeaderCSSClass*/ function (column, columnOrder) {
                                return _this.drawHeaderCellValue(column, columnOrder, "grid-header-cell-numeric");
                            }, /*dynamicTooltipFunction*/ function (rowData) {
                                return !rowData.isPlaceholder ? Plugin.Resources.getString("CpuUsageTreeGrid_PercentageTooltip", rowData.ePercent.localeFormat("p2"), rowData.eSamples, _this._grid.getRowData(0).iSamples) : "";
                            }),
                            new CpuTreeGridColumnInfo("iSamples", "CpuUsageTreeGrid_TotalSamplesHeader", "CpuUsageTreeGrid_TotalSamplesHeaderTooltip", defaultColumnWidth, false, true, false, null, "grid-cell-numeric", /*columnHeaderCSSClass*/ function (column, columnOrder) {
                                return _this.drawHeaderCellValue(column, columnOrder, "grid-header-cell-numeric");
                            }, /*dynamicTooltipFunction*/ function (rowData) {
                                return !rowData.isPlaceholder ? Plugin.Resources.getString("CpuUsageTreeGrid_SamplesTooltip", rowData.iSamples, rowData.iSamples) : "";
                            }),
                            new CpuTreeGridColumnInfo("eSamples", "CpuUsageTreeGrid_SelfSamplesHeader", "CpuUsageTreeGrid_SelfSamplesHeaderTooltip", defaultColumnWidth, false, true, false, null, "grid-cell-numeric", /*columnHeaderCSSClass*/ function (column, columnOrder) {
                                return _this.drawHeaderCellValue(column, columnOrder, "grid-header-cell-numeric");
                            }, /*dynamicTooltipFunction*/ function (rowData) {
                                return !rowData.isPlaceholder ? Plugin.Resources.getString("CpuUsageTreeGrid_SamplesTooltip", rowData.eSamples, rowData.eSamples) : "";
                            }),
                            new CpuTreeGridColumnInfo("module", "CpuUsageTreeGrid_ModuleHeader", "CpuUsageTreeGrid_ModuleTooltip", defaultColumnWidth, false, true, false)
                        ];

                        // In debug mode we also want to show unique id as last column
                        if (debug) {
                            this._columns.push(new CpuTreeGridColumnInfo("id", "CpuUsageTreeGrid_FunctionNameHeader", "CpuUsageTreeGrid_FunctionNameTooltip", defaultColumnWidth, false, true, false, null, "grid-cell-numeric", /*columnHeaderCSSClass*/ function (column, columnOrder) {
                                return _this.drawHeaderCellValue(column, columnOrder, "grid-header-cell-numeric");
                            }));
                        }
                    }

                    return this._columns;
                };

                CpuUsageTreeGrid.prototype.getDefaultSortInfo = function () {
                    var columns = this.getColumns();
                    var iSamplesColumn = columns[1];
                    return new CommonControls.Grid.SortOrderInfo(iSamplesColumn.index, iSamplesColumn.defaultSortOrder);
                };

                // Get current selected sort information
                // If grid is not initialized yet we use default sort info
                CpuUsageTreeGrid.prototype.getCurrentSortInfo = function () {
                    var column = null;
                    var sortOrder = null;

                    // If grid already has sort order use it
                    if (this._grid) {
                        var sortOrderArray = this._grid.getSortOrder();
                        if (sortOrderArray && sortOrderArray.length > 0) {
                            sortOrder = sortOrderArray[0];
                        }
                    }

                    // Other case - get default sort order (the same as we use for initialization)
                    if (!sortOrder) {
                        sortOrder = this.getDefaultSortInfo();
                    }

                    // Looking for column for current sort order
                    var columns = this.getColumns();
                    for (var i = 0; i < columns.length; i++) {
                        if (columns[i].index === sortOrder.index) {
                            column = columns[i];
                            break;
                        }
                    }

                    return {
                        column: column,
                        sortOrder: sortOrder
                    };
                };

                // handler for search (when user hit Enter or Click search button)
                CpuUsageTreeGrid.prototype.submitForm_onsubmit = function () {
                    this.toggleSearchStyle(false);
                    this.search();

                    // make sure that form will not send post event (refresh page)
                    return false;
                };

                CpuUsageTreeGrid.prototype.search = function () {
                    this._sqmCpuUsage.searchIsUsed();

                    // If previous search is still running - we need to kill it
                    if (this._lastSearchPromise) {
                        this._lastSearchPromise.cancel();
                    }

                    // Search pattern
                    this._searchString = this._searchInput.value;

                    if (this._searchString.length > 0) {
                        // Show progress bar (continues)
                        this.setProgressMessage(Plugin.Resources.getString("SearchProgressMessage"));
                        this.enableInProgressState();

                        // We always need to start from selected row
                        var selectedRow = this._grid.getRowData(this._grid.getSelectedDataIndex());

                        this._request = {
                            type: 2 /* Search */,
                            selectedPath: getPathToItem(selectedRow),
                            sort: getSortParameters(this.getCurrentSortInfo()),
                            str: this._searchString,
                            caseSensitive: this._isCaseSensitive,
                            isRegex: this._isRegex
                        };

                        this._isSearching = true;
                        this._lastSearchPromise = this._callTreeResult.getResult(this._request).then(this.searchChildNode.bind(this), this.errorHandler.bind(this));
                    }
                };

                CpuUsageTreeGrid.prototype.searchChildNode = function (result) {
                    this._result = result;

                    // If we are still in the context of searching current element.
                    if (this._searchInput.value === this._searchString) {
                        // hide progress bar
                        this.disableInProgressState();

                        // If we could not find any matches
                        if (this._result.length === 0) {
                            // If we did not select any rows in tree before - this means that we could not
                            // find any matches in whole Tree
                            var resultPromise;
                            if (this._request.selectedPath.length === 0) {
                                resultPromise = this._automation.getAlertPromise("Microsoft.VisualStudio.DiagnosticsHub.CpuUsageTreeGrid.Search", Plugin.Resources.getString("Message_SearchNoMatches"));
                            } else {
                                resultPromise = this._automation.getConfirmationPromise("Microsoft.VisualStudio.DiagnosticsHub.CpuUsageTreeGrid.Search", Plugin.Resources.getString("Message_SearchStartFromTop")).then(function (confirmationResult) {
                                    if (confirmationResult) {
                                        // In other case we could not find any matches after selected item
                                        this._grid.setSelectedRowIndex(-1);
                                        this.search();
                                    }

                                    // the function prototype for the then parameter has a return type of any so we return null
                                    return null;
                                }.bind(this));
                            }

                            resultPromise.then(function (result) {
                                this._isSearching = false;
                                this.focusSearchInput();

                                // the function prototype for the then parameter has a return type of any so we return null
                                return null;
                            }.bind(this));
                        } else {
                            // Expand all nodes before the one which we found
                            var i = 0;
                            var isPlaceholder = false;
                            while (true) {
                                var item = this._grid.getRowData(i);
                                if (!item) {
                                    break;
                                }

                                if (!item.isPlaceholder && item.id === this._result[0].nodeId) {
                                    if (this._result.length > 1) {
                                        this._result.shift();
                                        var nextItem = this._grid.getRowData(i + 1);
                                        if (nextItem && nextItem.isPlaceholder) {
                                            isPlaceholder = true;
                                            break;
                                        }

                                        this._grid.expandNode(i);
                                    } else {
                                        // item we searched for.
                                        this._result.shift();
                                        this._grid.setSelectedDataIndex(i);

                                        // Scrolling the tree grid triggers a redraw. Explicitly redraw
                                        // only if scrolling did not occur
                                        if (!this._grid.getSelectedRowIntoViewCenter()) {
                                            this._grid.redraw();
                                        }

                                        this._result = null;
                                        this._searchString = null;
                                        this._request = null;
                                        this._isSearching = false;

                                        // This is done to queue focus event for search input
                                        // after all tree events are fired.
                                        setTimeout(this.focusSearchInput.bind(this), 1);
                                        break;
                                    }
                                }

                                i++;
                            }

                            if (isPlaceholder) {
                                this._grid.expandNode(i);
                            }
                        }
                    }
                };
                return CpuUsageTreeGrid;
            })();
            DiagnosticsHub.CpuUsageTreeGrid = CpuUsageTreeGrid;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
//# sourceMappingURL=CpuUsage.js.map

// SIG // Begin signature block
// SIG // MIIalwYJKoZIhvcNAQcCoIIaiDCCGoQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFFopwIZDAWQG
// SIG // +HDob1Iyq4Cdc5EjoIIVejCCBLswggOjoAMCAQICEzMA
// SIG // AABZ1nPNUY7wIsUAAAAAAFkwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE0MDUyMzE3
// SIG // MTMxNVoXDTE1MDgyMzE3MTMxNVowgasxCzAJBgNVBAYT
// SIG // AlVTMQswCQYDVQQIEwJXQTEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MQ0wCwYDVQQLEwRNT1BSMScwJQYDVQQLEx5uQ2lwaGVy
// SIG // IERTRSBFU046RjUyOC0zNzc3LThBNzYxJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2UwggEi
// SIG // MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGbE7P
// SIG // aFP974De6IvEsfB+B84ePOwMjDWHTOlROry2sJZ3Qvr/
// SIG // PM/h2uKJ+m5CAJlbFt0JZDjiUvvfjvqToz27h49uuIfJ
// SIG // 0GBPz5yCkW2RG3IQs9hDfFlKYF3GsFXQJ9vy9r3yIMYi
// SIG // LJ5riy1s6ngEyUvBcAnnth2vmowGP3hw+nbu0iQUdrKu
// SIG // ICiDHKnwSJI/ooX3g8rFUdCVIAN50le8E7VOuLRsVh9T
// SIG // HhW7zzA//TsBzV9yaPfK85lmM6hdIo8dbsraZdIrHCSs
// SIG // n3ypEIqF4m0uXEr9Sbl7QLFTxt9HubMjTiJHHNPBuUl2
// SIG // QnLOkIYOJPXCPLkJNj+oU1xW/l9hAgMBAAGjggEJMIIB
// SIG // BTAdBgNVHQ4EFgQUWygas811DWM9/Zn1mxUCSBrLpqww
// SIG // HwYDVR0jBBgwFoAUIzT42VJGcArtQPt2+7MrsMM1sw8w
// SIG // VAYDVR0fBE0wSzBJoEegRYZDaHR0cDovL2NybC5taWNy
// SIG // b3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljcm9z
// SIG // b2Z0VGltZVN0YW1wUENBLmNybDBYBggrBgEFBQcBAQRM
// SIG // MEowSAYIKwYBBQUHMAKGPGh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljcm9zb2Z0VGltZVN0
// SIG // YW1wUENBLmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDAN
// SIG // BgkqhkiG9w0BAQUFAAOCAQEAevAN9EVsNJYOd/DiwEIF
// SIG // YfeI03r9iNWn9fd/8gj21f3LynR82wmp39YVB5m/0D6H
// SIG // hGJ7wgaOyoto4j3fnlrFjLKpXP5ZYib11/l4tm60CpBl
// SIG // ZulRCPF8yaO3BDdGxeeCPihc709xpOexJVrlQ1QzCH+k
// SIG // sFUt0YJwSBEgDSaBDu8GJXSrhcPDjOIUX+gFVI+6homq
// SIG // lq6UYiX5r2mICgyxUcQJ77iAfFOQebvpj9BI8GLImfFl
// SIG // NDv3zrX7Zpi5olmZXT6VnxS/NbT7mHIkKQzzugR6gjn7
// SIG // Rs3x4LIWvH0g+Jw5FSWhJi3Wi4G9xr2wnVT+RwtfLU4q
// SIG // 9IfqtQ+1t+2SKTCCBOwwggPUoAMCAQICEzMAAADKbNUy
// SIG // EjXE4VUAAQAAAMowDQYJKoZIhvcNAQEFBQAweTELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EwHhcNMTQwNDIyMTczOTAw
// SIG // WhcNMTUwNzIyMTczOTAwWjCBgzELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjENMAsGA1UECxMETU9QUjEeMBwGA1UEAxMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMIIBIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAQ8AMIIBCgKCAQEAlnFd7QZG+oTLnVu3Rsew
// SIG // 4bQROQOtsRVzYJzrp7ZuGjw//2XjNPGmpSFeVplsWOSS
// SIG // oQpcwtPcUi8MZZogYUBTMZxsjyF9uvn+E1BSYJU6W7lY
// SIG // pXRhQamU4K0mTkyhl3BJJ158Z8pPHnGERrwdS7biD8XG
// SIG // J8kH5noKpRcAGUxwRTgtgbRQqsVn0fp5vMXMoXKb9CU0
// SIG // mPhU3xI5OBIvpGulmn7HYtHcz+09NPi53zUwuux5Mqnh
// SIG // qaxVTUx/TFbDEwt28Qf5zEes+4jVUqUeKPo9Lc/PhJiG
// SIG // cWURz4XJCUSG4W/nsfysQESlqYsjP4JJndWWWVATWRhz
// SIG // /0MMrSvUfzBAZwIDAQABo4IBYDCCAVwwEwYDVR0lBAww
// SIG // CgYIKwYBBQUHAwMwHQYDVR0OBBYEFB9e4l1QjVaGvko8
// SIG // zwTop4e1y7+DMFEGA1UdEQRKMEikRjBEMQ0wCwYDVQQL
// SIG // EwRNT1BSMTMwMQYDVQQFEyozMTU5NStiNDIxOGYxMy02
// SIG // ZmNhLTQ5MGYtOWM0Ny0zZmM1NTdkZmM0NDAwHwYDVR0j
// SIG // BBgwFoAUyxHoytK0FlgByTcuMxYWuUyaCh8wVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljQ29kU2lnUENB
// SIG // XzA4LTMxLTIwMTAuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNDb2RTaWdQQ0FfMDgtMzEt
// SIG // MjAxMC5jcnQwDQYJKoZIhvcNAQEFBQADggEBAHdc69eR
// SIG // Pc29e4PZhamwQ51zfBfJD+0228e1LBte+1QFOoNxQIEJ
// SIG // ordxJl7WfbZsO8mqX10DGCodJ34H6cVlH7XPDbdUxyg4
// SIG // Wojne8EZtlYyuuLMy5Pbr24PXUT11LDvG9VOwa8O7yCb
// SIG // 8uH+J13oxf9h9hnSKAoind/NcIKeGHLYI8x6LEPu/+rA
// SIG // 4OYdqp6XMwBSbwe404hs3qQGNafCU4ZlEXcJjzVZudiG
// SIG // qAD++DF9LPSMBZ3AwdV3cmzpTVkmg/HCsohXkzUAfFAr
// SIG // vFn8/hwpOILT3lKXRSkYTpZbnbpfG6PxJ1DqB5XobTQN
// SIG // OFfcNyg1lTo4nNTtaoVdDiIRXnswggW8MIIDpKADAgEC
// SIG // AgphMyYaAAAAAAAxMA0GCSqGSIb3DQEBBQUAMF8xEzAR
// SIG // BgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJk/IsZAEZ
// SIG // FgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jvc29mdCBS
// SIG // b290IENlcnRpZmljYXRlIEF1dGhvcml0eTAeFw0xMDA4
// SIG // MzEyMjE5MzJaFw0yMDA4MzEyMjI5MzJaMHkxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xIzAhBgNVBAMTGk1pY3Jvc29mdCBD
// SIG // b2RlIFNpZ25pbmcgUENBMIIBIjANBgkqhkiG9w0BAQEF
// SIG // AAOCAQ8AMIIBCgKCAQEAsnJZXBkwZL8dmmAgIEKZdlNs
// SIG // PhvWb8zL8epr/pcWEODfOnSDGrcvoDLs/97CQk4j1XIA
// SIG // 2zVXConKriBJ9PBorE1LjaW9eUtxm0cH2v0l3511iM+q
// SIG // c0R/14Hb873yNqTJXEXcr6094CholxqnpXJzVvEXlOT9
// SIG // NZRyoNZ2Xx53RYOFOBbQc1sFumdSjaWyaS/aGQv+knQp
// SIG // 4nYvVN0UMFn40o1i/cvJX0YxULknE+RAMM9yKRAoIsc3
// SIG // Tj2gMj2QzaE4BoVcTlaCKCoFMrdL109j59ItYvFFPees
// SIG // CAD2RqGe0VuMJlPoeqpK8kbPNzw4nrR3XKUXno3LEY9W
// SIG // PMGsCV8D0wIDAQABo4IBXjCCAVowDwYDVR0TAQH/BAUw
// SIG // AwEB/zAdBgNVHQ4EFgQUyxHoytK0FlgByTcuMxYWuUya
// SIG // Ch8wCwYDVR0PBAQDAgGGMBIGCSsGAQQBgjcVAQQFAgMB
// SIG // AAEwIwYJKwYBBAGCNxUCBBYEFP3RMU7TJoqV4ZhgO6gx
// SIG // b6Y8vNgtMBkGCSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBB
// SIG // MB8GA1UdIwQYMBaAFA6sgmBAVieX5SUT/CrhClOVWeSk
// SIG // MFAGA1UdHwRJMEcwRaBDoEGGP2h0dHA6Ly9jcmwubWlj
// SIG // cm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL21pY3Jv
// SIG // c29mdHJvb3RjZXJ0LmNybDBUBggrBgEFBQcBAQRIMEYw
// SIG // RAYIKwYBBQUHMAKGOGh0dHA6Ly93d3cubWljcm9zb2Z0
// SIG // LmNvbS9wa2kvY2VydHMvTWljcm9zb2Z0Um9vdENlcnQu
// SIG // Y3J0MA0GCSqGSIb3DQEBBQUAA4ICAQBZOT5/Jkav629A
// SIG // sTK1ausOL26oSffrX3XtTDst10OtC/7L6S0xoyPMfFCY
// SIG // gCFdrD0vTLqiqFac43C7uLT4ebVJcvc+6kF/yuEMF2nL
// SIG // pZwgLfoLUMRWzS3jStK8cOeoDaIDpVbguIpLV/KVQpzx
// SIG // 8+/u44YfNDy4VprwUyOFKqSCHJPilAcd8uJO+IyhyugT
// SIG // pZFOyBvSj3KVKnFtmxr4HPBT1mfMIv9cHc2ijL0nsnlj
// SIG // VkSiUc356aNYVt2bAkVEL1/02q7UgjJu/KSVE+Traeep
// SIG // oiy+yCsQDmWOmdv1ovoSJgllOJTxeh9Ku9HhVujQeJYY
// SIG // XMk1Fl/dkx1Jji2+rTREHO4QFRoAXd01WyHOmMcJ7oUO
// SIG // jE9tDhNOPXwpSJxy0fNsysHscKNXkld9lI2gG0gDWvfP
// SIG // o2cKdKU27S0vF8jmcjcS9G+xPGeC+VKyjTMWZR4Oit0Q
// SIG // 3mT0b85G1NMX6XnEBLTT+yzfH4qerAr7EydAreT54al/
// SIG // RrsHYEdlYEBOsELsTu2zdnnYCjQJbRyAMR/iDlTd5aH7
// SIG // 5UcQrWSY/1AWLny/BSF64pVBJ2nDk4+VyY3YmyGuDVyc
// SIG // 8KKuhmiDDGotu3ZrAB2WrfIWe/YWgyS5iM9qqEcxL5rc
// SIG // 43E91wB+YkfRzojJuBj6DnKNwaM9rwJAav9pm5biEKgQ
// SIG // tDdQCNbDPTCCBgcwggPvoAMCAQICCmEWaDQAAAAAABww
// SIG // DQYJKoZIhvcNAQEFBQAwXzETMBEGCgmSJomT8ixkARkW
// SIG // A2NvbTEZMBcGCgmSJomT8ixkARkWCW1pY3Jvc29mdDEt
// SIG // MCsGA1UEAxMkTWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNh
// SIG // dGUgQXV0aG9yaXR5MB4XDTA3MDQwMzEyNTMwOVoXDTIx
// SIG // MDQwMzEzMDMwOVowdzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEh
// SIG // MB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // n6Fssd/bSJIqfGsuGeG94uPFmVEjUK3O3RhOJA/u0afR
// SIG // TK10MCAR6wfVVJUVSZQbQpKumFwwJtoAa+h7veyJBw/3
// SIG // DgSY8InMH8szJIed8vRnHCz8e+eIHernTqOhwSNTyo36
// SIG // Rc8J0F6v0LBCBKL5pmyTZ9co3EZTsIbQ5ShGLieshk9V
// SIG // UgzkAyz7apCQMG6H81kwnfp+1pez6CGXfvjSE/MIt1Nt
// SIG // UrRFkJ9IAEpHZhEnKWaol+TTBoFKovmEpxFHFAmCn4Tt
// SIG // VXj+AZodUAiFABAwRu233iNGu8QtVJ+vHnhBMXfMm987
// SIG // g5OhYQK1HQ2x/PebsgHOIktU//kFw8IgCwIDAQABo4IB
// SIG // qzCCAacwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU
// SIG // IzT42VJGcArtQPt2+7MrsMM1sw8wCwYDVR0PBAQDAgGG
// SIG // MBAGCSsGAQQBgjcVAQQDAgEAMIGYBgNVHSMEgZAwgY2A
// SIG // FA6sgmBAVieX5SUT/CrhClOVWeSkoWOkYTBfMRMwEQYK
// SIG // CZImiZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJ
// SIG // bWljcm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9v
// SIG // dCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHmCEHmtFqFKoKWt
// SIG // THNY9AcTLmUwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwEwYDVR0lBAwwCgYIKwYBBQUHAwgw
// SIG // DQYJKoZIhvcNAQEFBQADggIBABCXisNcA0Q23em0rXfb
// SIG // znlRTQGxLnRxW20ME6vOvnuPuC7UEqKMbWK4VwLLTiAT
// SIG // UJndekDiV7uvWJoc4R0Bhqy7ePKL0Ow7Ae7ivo8KBciN
// SIG // SOLwUxXdT6uS5OeNatWAweaU8gYvhQPpkSokInD79vzk
// SIG // eJkuDfcH4nC8GE6djmsKcpW4oTmcZy3FUQ7qYlw/FpiL
// SIG // ID/iBxoy+cwxSnYxPStyC8jqcD3/hQoT38IKYY7w17gX
// SIG // 606Lf8U1K16jv+u8fQtCe9RTciHuMMq7eGVcWwEXChQO
// SIG // 0toUmPU8uWZYsy0v5/mFhsxRVuidcJRsrDlM1PZ5v6oY
// SIG // emIp76KbKTQGdxpiyT0ebR+C8AvHLLvPQ7Pl+ex9teOk
// SIG // qHQ1uE7FcSMSJnYLPFKMcVpGQxS8s7OwTWfIn0L/gHkh
// SIG // gJ4VMGboQhJeGsieIiHQQ+kr6bv0SMws1NgygEwmKkgk
// SIG // X1rqVu+m3pmdyjpvvYEndAYR7nYhv5uCwSdUtrFqPYmh
// SIG // dmG0bqETpr+qR/ASb/2KMmyy/t9RyIwjyWa9nR2HEmQC
// SIG // PS2vWY+45CHltbDKY7R4VAXUQS5QrJSwpXirs6CWdRrZ
// SIG // kocTdSIvMqgIbqBbjCW/oO+EyiHW6x5PyZruSeD3AWVv
// SIG // iQt9yGnI5m7qp5fOMSn/DsVbXNhNG6HY+i+ePy5VFmvJ
// SIG // E6P9MYIEiTCCBIUCAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBojAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUfzgrzOoJEB7MDvzGlHqb
// SIG // EzxMoQwwQgYKKwYBBAGCNwIBDDE0MDKgGIAWAEMAcAB1
// SIG // AFUAcwBhAGcAZQAuAGoAc6EWgBRodHRwOi8vbWljcm9z
// SIG // b2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQBJjpi0QBia
// SIG // peBLx74AtCKRpALcLInLfWw4fv5gJW+Arpite+EJXR9Z
// SIG // 7V0EwNpg3hgy6Z0uBxdCdLMWR15YFSCVR21AWfCFtK5J
// SIG // LZtbI50B6HZL0ceRpzcQ6i4tEVctzhVEzc19VHcqFYnj
// SIG // 02hzdyd4a+tjclAJ17Jzi8zuzaobtceHOVjMmFGSf0+Q
// SIG // IjdUfdNM9WSvdixY7HYNWn2XhOrDXHTyR41FJ2njzNtX
// SIG // DWXq7gIF56N0QN0EautPSWLfGHY+EHKiAkB6G+nDYqxc
// SIG // wJfhc+I6wOAgqoezGXzaBLK+Y2LXfKCwOt0ZRUw3qQZj
// SIG // vljsyKDPt3AKgIyk/st4D5oooYICKDCCAiQGCSqGSIb3
// SIG // DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQQITMwAAAFnWc81RjvAixQAAAAAAWTAJBgUr
// SIG // DgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEH
// SIG // ATAcBgkqhkiG9w0BCQUxDxcNMTQxMTAxMDcyNDE2WjAj
// SIG // BgkqhkiG9w0BCQQxFgQUp0N7fxxahdYDDWEHgjetLJZC
// SIG // itEwDQYJKoZIhvcNAQEFBQAEggEAFAbulKxoyi24l8jr
// SIG // kT9fpXsx58wIhIQZGNgVlsrx30SJBluf0rkSR/oJhkrd
// SIG // UxG9+bz0kAq57t99BQ7oMekBe++DKGqog2oGMLpwyljy
// SIG // qx7xn2msXD3njrzj0YVeGFqwLv386wy0dSimHMOFZyeC
// SIG // 9mAv3bQIjCXw1HXri6Qo1AK6v6Q9mqVkbCjw9R3LJAQ8
// SIG // fH1bK17MVRAO3/Y+5SefUu69L/RohulGH2x7qOrCq3Jh
// SIG // VhBzJlPlL4E3HB1a1KYHnXU/LcHgCbK7LW9lWLdZN5ez
// SIG // fcBSIqYvZ+Z+Whw3ufs+CBJZ/ZHb6hRFbiHVqxNgXzop
// SIG // iJOE01iXhMrVyI4JKQ==
// SIG // End signature block
