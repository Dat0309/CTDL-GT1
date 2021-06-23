var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;
var Common;
(function (Common) {
    var ProgramEvents = (function () {
        function ProgramEvents() {
        }
        ProgramEvents.Resize = "resize";
        return ProgramEvents;
    })();
    Common.ProgramEvents = ProgramEvents;

    var ProgramMain = (function () {
        function ProgramMain() {
            this._eventManager = new Plugin.Utilities.EventManager();
            window.addEventListener("resize", this.triggerResize.bind(this));
        }
        ProgramMain.prototype.addEventListener = function (eventType, func) {
            if (eventType == ProgramEvents.Resize) {
                this._eventManager.addEventListener(eventType, func);
            }
        };

        ProgramMain.prototype.removeEventListener = function (eventType, func) {
            this._eventManager.removeEventListener(eventType, func);
        };

        ProgramMain.prototype.triggerResize = function () {
            this._eventManager.dispatchEvent(ProgramEvents.Resize);
        };
        return ProgramMain;
    })();
    Common.ProgramMain = ProgramMain;

    Common.Program = new ProgramMain();
})(Common || (Common = {}));
var Common;
(function (Common) {
    var PromiseHelper = (function () {
        function PromiseHelper() {
        }
        Object.defineProperty(PromiseHelper, "promiseWrapper", {
            get: function () {
                var promiseWrapper = {
                    completeHandler: null,
                    errorHandler: null,
                    promise: null
                };

                var promiseInitialization = function (completed, error) {
                    promiseWrapper.completeHandler = completed;
                    promiseWrapper.errorHandler = error;
                };
                promiseWrapper.promise = new Plugin.Promise(promiseInitialization);

                return promiseWrapper;
            },
            enumerable: true,
            configurable: true
        });

        PromiseHelper.getPromiseSuccess = function (result) {
            var promiseWrapper = PromiseHelper.promiseWrapper;
            PromiseHelper.safeInvokePromise(promiseWrapper.completeHandler, result);
            return promiseWrapper.promise;
        };

        PromiseHelper.getPromiseError = function (result) {
            var promiseWrapper = PromiseHelper.promiseWrapper;
            PromiseHelper.safeInvokePromise(promiseWrapper.errorHandler, result);
            return promiseWrapper.promise;
        };

        PromiseHelper.safeInvokePromise = function (callback, response) {
            try  {
                callback(response);
            } catch (e) {
                this.logError(e.toString());
            }
        };

        Object.defineProperty(PromiseHelper, "logger", {
            get: function () {
                if (!PromiseHelper._logger) {
                    PromiseHelper._logger = DiagnosticsHub.getLogger();
                }
                return PromiseHelper._logger;
            },
            enumerable: true,
            configurable: true
        });

        PromiseHelper.logError = function (error) {
            PromiseHelper.logger.error(PromiseHelper.LoggerPrefixText + error);
        };
        PromiseHelper.LoggerPrefixText = "R2LControl: ";
        return PromiseHelper;
    })();
    Common.PromiseHelper = PromiseHelper;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var TimeStamp = (function () {
        function TimeStamp(nsec) {
            if (typeof nsec === "undefined") { nsec = 0; }
            this._nsec = nsec;
        }
        Object.defineProperty(TimeStamp.prototype, "nsec", {
            get: function () {
                return this._nsec;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeStamp.prototype, "msec", {
            get: function () {
                return this._nsec / TimeStamp.nanoSecInMillSec;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeStamp.prototype, "sec", {
            get: function () {
                return this._nsec / TimeStamp.nanoSecInSec;
            },
            enumerable: true,
            configurable: true
        });

        TimeStamp.fromNanoseconds = function (nsec) {
            return new TimeStamp(nsec);
        };

        TimeStamp.fromMilliseconds = function (msec) {
            return new TimeStamp(msec * TimeStamp.nanoSecInMillSec);
        };

        TimeStamp.fromSeconds = function (sec) {
            return new TimeStamp(sec * TimeStamp.nanoSecInSec);
        };

        TimeStamp.prototype.equals = function (other) {
            return this._nsec === other.nsec;
        };
        TimeStamp.nanoSecInMillSec = 1000 * 1000;
        TimeStamp.nanoSecInSec = 1000 * 1000 * 1000;
        return TimeStamp;
    })();
    Common.TimeStamp = TimeStamp;

    var TimeSpan = (function () {
        function TimeSpan(begin, end) {
            if (typeof begin === "undefined") { begin = new TimeStamp(); }
            if (typeof end === "undefined") { end = new TimeStamp(); }
            this._begin = begin;
            this._end = end;

            if (this._begin.nsec > this._end.nsec) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1024"));
            }
        }
        Object.defineProperty(TimeSpan.prototype, "begin", {
            get: function () {
                return this._begin;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "end", {
            get: function () {
                return this._end;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "elapsed", {
            get: function () {
                return new TimeStamp(this._end.nsec - this.begin.nsec);
            },
            enumerable: true,
            configurable: true
        });

        TimeSpan.prototype.equals = function (other) {
            return this.begin.equals(other.begin) && this.end.equals(other.end);
        };
        return TimeSpan;
    })();
    Common.TimeSpan = TimeSpan;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var TimestampConvertor = (function () {
        function TimestampConvertor() {
        }
        TimestampConvertor.jsonToTimeStamp = function (bigNumber) {
            var l = bigNumber.l;
            var h = bigNumber.h;

            if (l < 0) {
                l = l >>> 0;
            }

            if (h < 0) {
                h = h >>> 0;
            }

            var nsec = h * 0x100000000 + l;
            return Common.TimeStamp.fromNanoseconds(nsec);
        };

        TimestampConvertor.timestampToJson = function (timeStamp) {
            return DiagnosticsHub.BigNumber.convertFromNumber(timeStamp.nsec);
        };
        return TimestampConvertor;
    })();
    Common.TimestampConvertor = TimestampConvertor;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var Utilities = (function () {
        function Utilities() {
        }
        Utilities.htmlEncode = function (value) {
            Utilities.HtmlEncoderElement.innerText = value;
            return Utilities.HtmlEncoderElement.innerHTML;
        };
        Utilities.HtmlEncoderElement = document.createElement("div");
        return Utilities;
    })();
    Common.Utilities = Utilities;
})(Common || (Common = {}));
var Common;
(function (Common) {
    (function (CodeMarkerValues) {
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerSwimLaneViewSelectionChanged"] = 26200] = "perfR2L_AllProfilerSwimLaneViewSelectionChanged";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerToolbarZoomStarted"] = 26201] = "perfR2L_AllProfilerToolbarZoomStarted";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerDetailsViewRowSelected"] = 26202] = "perfR2L_AllProfilerDetailsViewRowSelected";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerDetailsViewRowExpansionToggledStart"] = 26203] = "perfR2L_AllProfilerDetailsViewRowExpansionToggledStart";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerDetailsViewRowDetailsLoadComplete"] = 26204] = "perfR2L_AllProfilerDetailsViewRowDetailsLoadComplete";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerDetailsViewRowDetailsLoadFailedOrCancelled"] = 26207] = "perfR2L_AllProfilerDetailsViewRowDetailsLoadFailedOrCancelled";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerDetailsViewLoadComplete"] = 26205] = "perfR2L_AllProfilerDetailsViewLoadComplete";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerDetailsViewLoadFailedOrCancelled"] = 26208] = "perfR2L_AllProfilerDetailsViewLoadFailedOrCancelled";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerDetailsViewRowExpansionToggledComplete"] = 26206] = "perfR2L_AllProfilerDetailsViewRowExpansionToggledComplete";
        CodeMarkerValues[CodeMarkerValues["perfR2L_AllProfilerDetailsViewRowExpansionToggledFailed"] = 26209] = "perfR2L_AllProfilerDetailsViewRowExpansionToggledFailed";

        CodeMarkerValues[CodeMarkerValues["perfR2L_XAMLProfilerStarted"] = 26300] = "perfR2L_XAMLProfilerStarted";
        CodeMarkerValues[CodeMarkerValues["perfR2L_XAMLProfilerDetailsViewParseTabbed"] = 26301] = "perfR2L_XAMLProfilerDetailsViewParseTabbed";
        CodeMarkerValues[CodeMarkerValues["perfR2L_XAMLProfilerUIThreadActivityViewLoaded"] = 26302] = "perfR2L_XAMLProfilerUIThreadActivityViewLoaded";
        CodeMarkerValues[CodeMarkerValues["perfR2L_XAMLProfilerDetailsViewHotElementsTabbed"] = 26303] = "perfR2L_XAMLProfilerDetailsViewHotElementsTabbed";

        CodeMarkerValues[CodeMarkerValues["perfR2L_PowerProfilerStarted"] = 26400] = "perfR2L_PowerProfilerStarted";
        CodeMarkerValues[CodeMarkerValues["perfR2L_PowerProfilerSummaryViewLoaded"] = 26401] = "perfR2L_PowerProfilerSummaryViewLoaded";
        CodeMarkerValues[CodeMarkerValues["perfR2L_PowerProfilerGraphViewLoaded"] = 26402] = "perfR2L_PowerProfilerGraphViewLoaded";
    })(Common.CodeMarkerValues || (Common.CodeMarkerValues = {}));
    var CodeMarkerValues = Common.CodeMarkerValues;

    var ProfilerCodeMarker = (function () {
        function ProfilerCodeMarker() {
        }
        ProfilerCodeMarker.fire = function (marker) {
            Plugin.VS.Internal.CodeMarkers.fire(marker);
        };
        return ProfilerCodeMarker;
    })();
    Common.ProfilerCodeMarker = ProfilerCodeMarker;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var CssHelper = (function () {
        function CssHelper() {
        }
        CssHelper.getCssRule = function (styleSheetName, selectorName) {
            var styleSheet = document.styleSheets[styleSheetName];
            var styleSheetLength = styleSheet.rules.length;
            if (styleSheet) {
                for (var i = 0; i < styleSheetLength; ++i) {
                    var rule = styleSheet.rules[i];

                    if (rule && rule.selectorText === selectorName) {
                        return rule;
                    }
                }
            }

            return null;
        };
        return CssHelper;
    })();
    Common.CssHelper = CssHelper;
})(Common || (Common = {}));
var Common;
(function (Common) {
    (function (Controls) {
        var Control = (function () {
            function Control(root) {
                this._rootElement = root;

                if (typeof this._rootElement === "undefined") {
                    this._rootElement = document.createElement("div");
                    this._rootElement.style.width = this._rootElement.style.height = "100%";
                } else if (this._rootElement === null) {
                    throw new Error(Plugin.Resources.getErrorString("R2LControl.1001"));
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
                        throw new Error(Plugin.Resources.getErrorString("R2LControl.1002"));
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
})(Common || (Common = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
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
                    throw new Error(Plugin.Resources.getErrorString("R2LControl.1000"));
                }
                _super.prototype.appendChild.call(this, child);
            };

            ContentControl.prototype.onContentChanged = function () {
            };
            return ContentControl;
        })(Common.Controls.Control);
        Controls.ContentControl = ContentControl;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
var Common;
(function (Common) {
    (function (Controls) {
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
                    if (elem.classList.contains(className)) {
                        elements.push(elem);
                    }

                    return true;
                });

                return elements;
            };

            TemplateControl.prototype.getTemplateElementCopy = function (templateName) {
                var templateElement = document.getElementById(templateName);
                if (!templateElement) {
                    throw new Error(Plugin.Resources.getErrorString("R2LControl.1022"));
                }

                if (templateElement.tagName.toLowerCase() !== "script") {
                    throw new Error(Plugin.Resources.getErrorString("R2LControl.1023"));
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
        })(Common.Controls.Control);
        Controls.TemplateControl = TemplateControl;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
var Common;
(function (Common) {
    (function (Controls) {
        var TabItem = (function (_super) {
            __extends(TabItem, _super);
            function TabItem() {
                _super.call(this);
                this.header = new Common.Controls.Control(document.createElement("li"));
                this.header.rootElement.onclick = this.onHeaderClicked.bind(this);
                this.header.rootElement.setAttribute("tabindex", "0");
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
                            throw new Error(Plugin.Resources.getErrorString("R2LControl.1021"));
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
            };

            TabItem.prototype.onKeyDown = function (e) {
                if (e.keyCode === 13 /* Enter */ || e.keyCode === 32 /* Space */) {
                    this.onHeaderClicked();
                }
            };
            return TabItem;
        })(Common.Controls.ContentControl);
        Controls.TabItem = TabItem;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
var Common;
(function (Common) {
    (function (Controls) {
        var TabControl = (function (_super) {
            __extends(TabControl, _super);
            function TabControl() {
                _super.call(this);
                this._items = [];

                this.setTemplateFromHTML("<div class=\"tabControl\">" + "   <nav class=\"tabBarContainer\">" + "      <ul class=\"tabBar\"></ul>" + "   </nav>" + "   <div class=\"tabContentPane\"></div>" + "</div>");

                this._barPanel = new Common.Controls.Control(this.rootElement.getElementsByClassName("tabBar")[0]);
                this._contentPane = new Common.Controls.Control(this.rootElement.getElementsByClassName("tabContentPane")[0]);
            }
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
                    }
                },
                enumerable: true,
                configurable: true
            });

            TabControl.prototype.onTabItemSelected = function (item) {
                this.selectedItem = item;
            };
            return TabControl;
        })(Common.Controls.TemplateControl);
        Controls.TabControl = TabControl;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var FormattingHelpers = (function () {
        function FormattingHelpers() {
        }
        FormattingHelpers.getPrettyPrintTime = function (time) {
            var value;
            var unitAbbreviation;

            if (time.nsec === 0) {
                value = 0;
                unitAbbreviation = Plugin.Resources.getString("SecondsAbbreviation");
            } else if (time.nsec < FormattingHelpers.OneMillisecInNanoSec) {
                value = time.msec.toPrecision(2);
                unitAbbreviation = Plugin.Resources.getString("MillisecondsAbbreviation");
            } else if (time.nsec < FormattingHelpers.OneSecInNanoSec) {
                value = time.msec;
                value = Math.floor(value * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("MillisecondsAbbreviation");
            } else if (time.nsec < FormattingHelpers.OneMinInNanoSec) {
                value = time.sec;
                value = Math.floor(value * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("SecondsAbbreviation");
            } else if (time.nsec < FormattingHelpers.OneHrInNanoSec) {
                value = time.sec / 60;
                value = Math.floor(value * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("MinutesAbbreviation");
            } else {
                value = time.sec / 3600;
                value = Math.floor(value * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("HoursAbbreviation");
            }

            return FormattingHelpers.getDecimalLocaleString(value, true) + " " + unitAbbreviation;
        };

        FormattingHelpers.zeroPad = function (stringToPad, newLength, padLeft) {
            var zeros = [];
            for (var i = stringToPad.length; i < newLength; i++) {
                zeros.push("0");
            }

            return (padLeft ? (zeros.join("") + stringToPad) : (stringToPad + zeros.join("")));
        };

        FormattingHelpers.getDecimalLocaleString = function (numberToConvert, includeGroupSeparators) {
            var numberString = Math.abs(numberToConvert).toString();

            var split = numberString.split(/e/i);
            numberString = split[0];
            var exponent = (split.length > 1 ? parseInt(split[1], 10) : 0);

            split = numberString.split('.');
            numberString = (numberToConvert < 0 ? "-" : "") + split[0];

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
            if (!nf || nf.length === 0) {
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
                            return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                        } else {
                            return numberString.slice(0, stringIndex + 1) + right;
                        }
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
                return numberString.slice(0, stringIndex + 1) + sep + ret + right;
            } else {
                return numberString + right;
            }
        };
        FormattingHelpers.OneMillisecInNanoSec = 1000 * 1000;
        FormattingHelpers.OneSecInNanoSec = FormattingHelpers.OneMillisecInNanoSec * 1000;
        FormattingHelpers.OneMinInNanoSec = FormattingHelpers.OneSecInNanoSec * 60;
        FormattingHelpers.OneHrInNanoSec = FormattingHelpers.OneMinInNanoSec * 60;
        return FormattingHelpers;
    })();
    Common.FormattingHelpers = FormattingHelpers;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var DonutChart = (function () {
        function DonutChart(container, tooltipCallback, addSectorAriaLabelCallback, donutViewConfig) {
            this._totalValue = 0;
            this._container = container;
            this._sectBaseData = [];

            this._labelOffset = 8;
            this._pathOpacity = 1;

            this._renderTooltipCallback = tooltipCallback;
            this._addSectorAriaLabelCallback = addSectorAriaLabelCallback;
            this.resetSvgTextStyleProperties();
            this._config = donutViewConfig || { explosionFactor: 2, radius: 55, strokeWidth: 25, minDonutArcAngle: 10, containerWidth: 200, containerHeight: 200, clockwiseRotation: true };

            if (typeof this._config.containerWidth === "undefined" || typeof this._config.containerHeight === "undefined") {
                if ((container.style.width !== "" || container.getAttribute("width") !== null) && (container.style.height !== "" || container.getAttribute("height") !== null)) {
                    this._containerWidth = parseInt(container.getAttribute("width") !== null ? container.getAttribute("width") : container.style.width);
                    this._containerHeight = parseInt(container.getAttribute("height") !== null ? container.getAttribute("height") : container.style.height);
                } else {
                    this._containerWidth = 200;
                    this._containerHeight = 200;
                }
            } else {
                this._containerWidth = this._config.containerWidth;
                this._containerHeight = this._config.containerHeight;
            }
            this._centerX = this._config.containerWidth / 2;
            this._centerY = this._config.containerHeight / 2;
            this._div = this.createDivContainer();
            this._container.appendChild(this._div);

            Plugin.Theme.addEventListener("themechanged", this.onThemeChanged.bind(this));
        }
        Object.defineProperty(DonutChart.prototype, "centerX", {
            get: function () {
                return this._centerX;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "centerY", {
            get: function () {
                return this._centerY;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "containerHeight", {
            get: function () {
                return this._config.containerHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "containerWidth", {
            get: function () {
                return this._config.containerWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "clockwiseRotation", {
            get: function () {
                return this._config.clockwiseRotation;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "explosionFactor", {
            get: function () {
                return this._config.explosionFactor;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "radius", {
            get: function () {
                return this._config.radius;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "strokeWidth", {
            get: function () {
                return this._config.strokeWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "sectors", {
            get: function () {
                return this._sectBaseData;
            },
            enumerable: true,
            configurable: true
        });

        DonutChart.prototype.addSector = function (sectorInfo) {
            this.addSectorToBaseSeries(sectorInfo);
        };

        DonutChart.prototype.addSectors = function (sectors) {
            for (var i = 0; i < sectors.length; i++) {
                this.addSector(sectors[i]);
            }
        };

        DonutChart.prototype.removeSector = function (sectorInfo) {
            var index = this.getSectorIndex(sectorInfo);
            if (index === -1) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1003"));
            } else {
                this._totalValue -= sectorInfo.value;
                this._sectBaseData.splice(index, 1);
            }
        };

        DonutChart.prototype.removeSectors = function (sectors) {
            for (var i = 0; i < sectors.length; i++) {
                this.removeSector(sectors[i]);
            }
        };

        DonutChart.prototype.removeAllSectors = function () {
            this._sectBaseData = [];
            this._totalValue = 0;
        };

        DonutChart.prototype.render = function () {
            var donutSectorInfo = this.buildChartData(this._sectBaseData);
            var donutSectorPoints = this.calculatePoints(donutSectorInfo);
            this.draw(donutSectorPoints);
        };

        DonutChart.prototype.resetDonutChart = function () {
            this._totalValue = 0;
            this._sectBaseData = [];
            this._container.removeChild(this._svg);
            this._svg = this.createSVG();
            this._container.appendChild(this._svg);
        };

        DonutChart.prototype.addSectorToBaseSeries = function (sector) {
            this._totalValue += sector.value;
            this._sectBaseData.push(sector);
        };

        DonutChart.prototype.buildChartData = function (sectBaseData) {
            var sectDonutData = [];
            if (sectBaseData.length === 1) {
                sectDonutData.push({
                    startAngle: 0, endAngle: 360, percentValue: 100,
                    info: { name: sectBaseData[0].name, cssClass: sectBaseData[0].cssClass, value: sectBaseData[0].value }
                });
            } else {
                var currAngle = 0;
                var currValue = 0;
                var i = 0;
                var angleReductionFactor = this.getReductionFactor(sectBaseData);
                for (i = 0; i < sectBaseData.length - 1; i++) {
                    currValue = sectBaseData[i].value;
                    var arcAngle = Math.round(360 * currValue / this._totalValue);
                    var percentValue = parseFloat((100 * currValue / this._totalValue).toFixed(2));
                    arcAngle = (arcAngle < this._config.minDonutArcAngle) ? this._config.minDonutArcAngle : Math.round(angleReductionFactor * arcAngle);
                    sectDonutData.push({
                        startAngle: currAngle, endAngle: currAngle + arcAngle - this._config.explosionFactor, percentValue: percentValue,
                        info: { name: sectBaseData[i].name, cssClass: sectBaseData[i].cssClass, value: sectBaseData[i].value }
                    });
                    currAngle += arcAngle;
                    if (currAngle >= 360)
                        break;
                }
                if (i === sectBaseData.length - 1 && currAngle < 360) {
                    currValue = sectBaseData[i].value;
                    var arcAngle = 360 - currAngle;
                    var percentValue = parseFloat((100 * currValue / this._totalValue).toFixed(2));
                    sectDonutData.push({
                        startAngle: currAngle, endAngle: currAngle + arcAngle - this._config.explosionFactor, percentValue: percentValue,
                        info: { name: sectBaseData[i].name, cssClass: sectBaseData[i].cssClass, value: sectBaseData[i].value }
                    });
                    currAngle += arcAngle;
                }
            }
            return sectDonutData;
        };

        DonutChart.prototype.calculatePoints = function (sectDonutData) {
            var radius = this._config.radius;
            var labelRadius = this._config.radius + (this._config.strokeWidth / 2) + this._labelOffset;
            var sectDonutPoints = [];
            var anchor;
            for (var i = 0; i < sectDonutData.length; i++) {
                var sAngle = sectDonutData[i].startAngle;
                var eAngle = sectDonutData[i].endAngle;
                var midAngle = (sectDonutData.length === 1) ? 0 : (sAngle + eAngle) / 2;
                var sx = radius * Math.sin(sAngle * Math.PI / 180);
                var sy = radius * Math.cos(sAngle * Math.PI / 180) * -1;
                var ex = radius * Math.sin(eAngle * Math.PI / 180);
                var ey = radius * Math.cos(eAngle * Math.PI / 180) * -1;
                if (midAngle < 180 && midAngle > 0) {
                    labelRadius = (sectDonutData[i].percentValue > 9) ? labelRadius + (this._textFontPx / 2) : labelRadius;
                    anchor = "start";
                } else if (midAngle > 180) {
                    anchor = "end";
                } else {
                    anchor = "middle";
                }
                var tx = labelRadius * Math.sin(midAngle * Math.PI / 180);
                var ty = labelRadius * Math.cos(midAngle * Math.PI / 180) * -1;
                var largeArcFlag = (eAngle - sAngle) > 180 ? 1 : 0;
                var sweepFlag = (this._config.clockwiseRotation) ? 1 : 0;
                sectDonutPoints.push({ startPoint: { x: sx, y: sy }, endPoint: { x: ex, y: ey }, label: { point: { x: tx, y: ty }, anchor: anchor }, percentValue: sectDonutData[i].percentValue, largeArc: largeArcFlag, sweepFlag: sweepFlag, info: sectDonutData[i].info });
            }
            return sectDonutPoints;
        };

        DonutChart.prototype.createDivContainer = function () {
            var div = document.createElement('div');
            div.style.width = "100%";
            div.style.height = "100%";
            return div;
        };

        DonutChart.prototype.createSVG = function () {
            var svg = document.createElementNS(DonutChart.SvgNS, "svg");
            svg.setAttribute("version", "1.1");
            svg.setAttribute("width", this._config.containerWidth + "px");
            svg.setAttribute("height", this._config.containerHeight + "px");
            svg.setAttribute("focusable", "false");
            return svg;
        };

        DonutChart.prototype.createSVGPath = function (cssClass, dAttribute, strokeWidth, sectorDonutPoint) {
            var _this = this;
            var path = document.createElementNS(DonutChart.SvgNS, "path");
            path.setAttribute("class", cssClass);
            path.setAttribute("d", dAttribute);
            path.setAttribute("stroke-width", strokeWidth.toString());
            if (this._renderTooltipCallback) {
                path.onmouseover = function () {
                    return _this.showToolTip(sectorDonutPoint.info, sectorDonutPoint.percentValue);
                };
                path.onmouseout = function () {
                    return Plugin.Tooltip.dismiss();
                };
            }
            if (this._addSectorAriaLabelCallback) {
                this._addSectorAriaLabelCallback(sectorDonutPoint.info, sectorDonutPoint.percentValue);
            }
            return path;
        };

        DonutChart.prototype.applyStyleForSvgText = function (text) {
            text.setAttribute("style", "fill:" + this._svgTextColor + "; font: " + this._svgTextFontSize + " " + this._svgTextFont + ";");
        };

        DonutChart.prototype.createSVGText = function (xPosition, yPosition, anchor, percentValue) {
            var text = document.createElementNS(DonutChart.SvgNS, "text");
            text.setAttribute("x", xPosition.toString());
            text.setAttribute("y", yPosition.toString());
            text.setAttribute("text-anchor", anchor);
            this.applyStyleForSvgText(text);
            text.textContent = Plugin.Resources.getString("InclusiveTimeSVGLabelString", Math.round(percentValue));
            return text;
        };

        DonutChart.prototype.draw = function (sectDonutPoints) {
            if (typeof this._svg !== "undefined")
                this._div.removeChild(this._svg);
            this._svg = this.createSVG();

            if (sectDonutPoints.length === 1) {
                var i = 0;
                var dPath = "M " + this._centerX + "," + this._centerY + " M " + (this._centerX + sectDonutPoints[i].startPoint.x) + ", " + (this._centerY + sectDonutPoints[i].startPoint.y) + " A " + this._config.radius + "," + this._config.radius + " 1 " + sectDonutPoints[i].largeArc + ", " + sectDonutPoints[i].sweepFlag + " " + (this._centerX + sectDonutPoints[i].startPoint.x) + "," + (this._centerY + sectDonutPoints[i].startPoint.y + this._config.radius * 2) + " A " + this._config.radius + "," + this._config.radius + " 1 " + sectDonutPoints[i].largeArc + ", " + sectDonutPoints[i].sweepFlag + " " + (this._centerX + sectDonutPoints[i].endPoint.x) + "," + (this._centerY + sectDonutPoints[i].endPoint.y);
                var arc = this.createSVGPath(sectDonutPoints[i].info.cssClass, dPath, this._config.strokeWidth, sectDonutPoints[i]);
                this._svg.appendChild(arc);
                var text = this.createSVGText(this._centerX + sectDonutPoints[i].label.point.x, this._centerY + sectDonutPoints[i].label.point.y, sectDonutPoints[i].label.anchor, sectDonutPoints[i].percentValue);
                this._svg.appendChild(text);
            } else if (sectDonutPoints.length > 1) {
                for (var i = 0; i < sectDonutPoints.length; i++) {
                    var dPath = "M " + this._centerX + "," + this._centerY + " M " + (this._centerX + sectDonutPoints[i].startPoint.x) + ", " + (this._centerY + sectDonutPoints[i].startPoint.y) + " A " + this._config.radius + "," + this._config.radius + " 1 " + sectDonutPoints[i].largeArc + ", " + sectDonutPoints[i].sweepFlag + " " + (this._centerX + sectDonutPoints[i].endPoint.x) + "," + (this._centerY + sectDonutPoints[i].endPoint.y);
                    var arc = this.createSVGPath(sectDonutPoints[i].info.cssClass, dPath, this._config.strokeWidth, sectDonutPoints[i]);
                    this._svg.appendChild(arc);
                    if (sectDonutPoints[i].percentValue > Math.round(this._config.minDonutArcAngle * 100 / 360)) {
                        var text = this.createSVGText(this._centerX + sectDonutPoints[i].label.point.x, this._centerY + sectDonutPoints[i].label.point.y, sectDonutPoints[i].label.anchor, sectDonutPoints[i].percentValue);
                        this._svg.appendChild(text);
                    }
                }
            }
            this._div.appendChild(this._svg);
        };

        DonutChart.prototype.getReductionFactor = function (sectBaseData) {
            var currAngle = 0;
            var i = 0;
            var angleDifference = 0;
            for (i = 0; i < sectBaseData.length; i++) {
                currAngle = Math.round(360 * sectBaseData[i].value / this._totalValue);
                angleDifference += (currAngle < this._config.minDonutArcAngle) ? this._config.minDonutArcAngle - currAngle : 0;
            }
            return (1 - angleDifference / 360);
        };

        DonutChart.prototype.getResizedRadius = function (dimension) {
            return dimension / DonutChart.RadiusResizeFactor;
        };

        DonutChart.prototype.getResizedWidth = function (dimension) {
            return dimension / DonutChart.WidthResizeFactor;
        };

        DonutChart.prototype.getSectorIndex = function (sector) {
            for (var i = 0; i < this._sectBaseData.length; i++) {
                if (this._sectBaseData[i] === sector || (this._sectBaseData[i].name === sector.name && this._sectBaseData[i].cssClass === sector.cssClass && this._sectBaseData[i].value === sector.value)) {
                    return i;
                }
            }
            return -1;
        };

        DonutChart.prototype.resizeDimensions = function () {
            var smallDimension = (this._config.containerHeight > this._config.containerWidth) ? this._config.containerWidth : this._config.containerHeight;
            this._config.radius = this.getResizedRadius(smallDimension);
            this._config.strokeWidth = this.getResizedWidth(this._config.radius);
        };

        DonutChart.prototype.showToolTip = function (sector, percentValue) {
            var toolTipContent = this._renderTooltipCallback(sector, percentValue);
            if (toolTipContent !== "" && toolTipContent !== null && typeof toolTipContent !== "undefined") {
                var config = {
                    content: toolTipContent
                };
                Plugin.Tooltip.show(config);
            }
        };

        DonutChart.prototype.resetSvgTextStyleProperties = function () {
            this._svgTextFontSize = Plugin.Theme.getValue("plugin-font-size");
            this._svgTextFont = Plugin.Theme.getValue("plugin-font-family");
            this._svgTextColor = Plugin.Theme.getValue("plugin-color");
            if (this._svgTextFontSize.indexOf("px") !== -1) {
                this._textFontPx = parseInt(this._svgTextFontSize.substring(0, this._svgTextFontSize.indexOf("px")));
            } else if (this._svgTextFontSize.indexOf("pt") !== -1) {
                this._textFontPx = Math.round(parseInt(this._svgTextFontSize.substring(0, this._svgTextFontSize.indexOf("pt"))) / 0.75);
            } else {
                this._textFontPx = 0;
            }
        };

        DonutChart.prototype.onThemeChanged = function (args) {
            this.resetSvgTextStyleProperties();
            if (this._svg) {
                var textNodes = this._svg.getElementsByTagName("text");
                var textNodesLength = textNodes.length;
                for (var i = 0; i < textNodesLength; i++) {
                    this.applyStyleForSvgText(textNodes[i]);
                }
            }
        };
        DonutChart.SvgNS = "http://www.w3.org/2000/svg";
        DonutChart.RadiusResizeFactor = 4;
        DonutChart.WidthResizeFactor = 2.5;
        return DonutChart;
    })();
    Common.DonutChart = DonutChart;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var ElementRecyclerFactory = (function () {
        function ElementRecyclerFactory(container, elementCreator) {
            this._container = container;
            this._elementCreator = elementCreator;
            this._index = null;

            this._elements = [];
            this._recycledElements = [];
        }
        ElementRecyclerFactory.forDivWithClass = function (container, className) {
            return new ElementRecyclerFactory(container, function () {
                var element = document.createElement("div");
                element.className = className;
                return element;
            });
        };

        ElementRecyclerFactory.prototype.start = function () {
            this._index = 0;
        };

        ElementRecyclerFactory.prototype.getNext = function () {
            if (this._index === null) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1004"));
            }

            var element = this._elements[this._index];
            if (!element) {
                if (this._recycledElements.length > 0) {
                    element = this._recycledElements.pop();
                } else {
                    element = this._elementCreator();
                }

                this._elements.push(element);
                this._container.appendChild(element);
            }

            this._index++;
            return element;
        };

        ElementRecyclerFactory.prototype.stop = function () {
            if (this._index === null) {
                return;
            }

            for (var i = this._elements.length - 1; i >= this._index; --i) {
                var element = this._elements.pop();
                this._recycledElements.push(element);
                this._container.removeChild(element);
            }

            this._index = null;
        };

        ElementRecyclerFactory.prototype.recycleAll = function () {
            for (var i = this._elements.length - 1; i >= 0; --i) {
                var element = this._elements.pop();
                this._recycledElements.push(element);
                this._container.removeChild(element);
            }
        };

        ElementRecyclerFactory.prototype.removeAll = function () {
            for (var i = this._elements.length - 1; i >= 0; --i) {
                var element = this._elements.pop();
                this._container.removeChild(element);
            }

            this._elements = [];
            this._recycledElements = [];
        };
        return ElementRecyclerFactory;
    })();
    Common.ElementRecyclerFactory = ElementRecyclerFactory;
})(Common || (Common = {}));
var Common;
(function (Common) {
    (function (Data) {
        (function (MarkerResourceID) {
            MarkerResourceID[MarkerResourceID["UserMarker"] = 0] = "UserMarker";
            MarkerResourceID[MarkerResourceID["AppLifeCycle_ActivationStart"] = 1] = "AppLifeCycle_ActivationStart";
            MarkerResourceID[MarkerResourceID["AppLifeCycle_ActivationEnd"] = 2] = "AppLifeCycle_ActivationEnd";
        })(Data.MarkerResourceID || (Data.MarkerResourceID = {}));
        var MarkerResourceID = Data.MarkerResourceID;
    })(Common.Data || (Common.Data = {}));
    var Data = Common.Data;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var ButtonHelpers = (function () {
        function ButtonHelpers() {
        }
        ButtonHelpers.setupButton = function (buttonDiv, tooltipResourceName, clickHandler) {
            if (tooltipResourceName !== null) {
                buttonDiv.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString(tooltipResourceName));
                buttonDiv.setAttribute("aria-label", Plugin.Resources.getString(tooltipResourceName));
            }

            buttonDiv.addEventListener("click", clickHandler);
            buttonDiv.addEventListener("keydown", clickHandler);

            buttonDiv.addEventListener("mousedown", ButtonHelpers.onButtonMouseDown);
            buttonDiv.addEventListener("mouseenter", ButtonHelpers.onButtonMouseEnter);
            buttonDiv.addEventListener("mouseleave", ButtonHelpers.onButtonMouseLeave);
            buttonDiv.addEventListener("mouseup", ButtonHelpers.onButtonMouseUp);
            buttonDiv.addEventListener("click", ButtonHelpers.onButtonPress);
            buttonDiv.addEventListener("keydown", ButtonHelpers.onButtonPress);
        };

        ButtonHelpers.changeButtonStatus = function (buttonDiv, enabled) {
            if (enabled) {
                buttonDiv.classList.remove("toolbarButtonStateDisabled");
                buttonDiv.setAttribute("aria-disabled", "false");
            } else {
                buttonDiv.classList.add("toolbarButtonStateDisabled");
                buttonDiv.setAttribute("aria-disabled", "true");
            }
        };

        ButtonHelpers.onButtonMouseDown = function (event) {
            var buttonDiv = event.currentTarget;

            if (!buttonDiv.classList.contains("toolbarButtonStateDisabled"))
                buttonDiv.classList.add("toolbarButtonMouseDown");
            else
                event.stopImmediatePropagation();
        };

        ButtonHelpers.onButtonMouseEnter = function (event) {
            var buttonDiv = event.currentTarget;

            if (!buttonDiv.classList.contains("toolbarButtonStateDisabled"))
                buttonDiv.classList.add("toolbarButtonMouseHover");
            else {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };

        ButtonHelpers.onButtonMouseLeave = function (event) {
            var buttonDiv = event.currentTarget;

            buttonDiv.classList.remove("toolbarButtonMouseHover");
            buttonDiv.classList.remove("toolbarButtonMouseDown");
        };

        ButtonHelpers.onButtonPress = function (event) {
            var buttonDiv = event.currentTarget;

            if (event.type === "click" || event.keyCode === 13 /* Enter */ || event.keyCode === 32 /* Space */) {
                if (buttonDiv.classList.contains("toolbarButtonStateDisabled")) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            }
        };

        ButtonHelpers.onButtonMouseUp = function (event) {
            var buttonDiv = event.currentTarget;

            buttonDiv.classList.remove("toolbarButtonMouseDown");
        };
        return ButtonHelpers;
    })();
    Common.ButtonHelpers = ButtonHelpers;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var Divider = (function (_super) {
        __extends(Divider, _super);
        function Divider(container, initialOffsetX) {
            _super.call(this);
            this._callbacks = [];
            this.setTemplateFromHTML("<div id=\"dividerBackdrop\" class=\"dividerBackdrop\"></div>" + "<div id=\"divider\" class=\"divider\"></div>");

            this._container = container;

            this._backdrop = this.findElement("dividerBackdrop");
            this._divider = this.findElement("divider");

            this._divider.addEventListener("mousedown", this.onMouseDown.bind(this), true);

            this._container.appendChild(this._backdrop);
            this._container.appendChild(this._divider);

            this._minX = initialOffsetX;
            this.offsetX = initialOffsetX;
            this._onMouseMoveHandler = this.onMouseMove.bind(this);
            this._onMouseUpHandler = this.onMouseUp.bind(this);
        }
        Object.defineProperty(Divider.prototype, "height", {
            set: function (value) {
                this._divider.style.height = value + "px";
                this._backdrop.style.height = value + "px";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Divider.prototype, "offsetX", {
            get: function () {
                return this._divider.offsetLeft;
            },
            set: function (value) {
                this._divider.style.left = value + "px";
            },
            enumerable: true,
            configurable: true
        });


        Divider.prototype.onMouseDown = function (e) {
            this._backdrop.style.zIndex = "1000";
            this._backdrop.appendChild(this._divider);
            this._backdrop.setCapture();

            this._mouseDownOffset = e.offsetX;
            this._maxX = Math.floor(this._container.offsetWidth / 2);

            this._backdrop.addEventListener("mousemove", this._onMouseMoveHandler, true);
            this._backdrop.addEventListener("mouseup", this._onMouseUpHandler, true);
        };

        Divider.prototype.onMouseMove = function (e) {
            this.updateOffsetX(e.pageX);

            if (this.onMoved) {
                this.onMoved(this._divider.offsetLeft);
            }

            e.stopImmediatePropagation();
            e.preventDefault();
        };

        Divider.prototype.onMouseUp = function (e) {
            if (this._container.firstChild) {
                this._container.insertBefore(this._divider, this._container.firstChild);
            } else {
                this._container.appendChild(this._divider);
            }

            this._backdrop.releaseCapture();
            this._backdrop.style.zIndex = "-1";

            this._backdrop.removeEventListener("mousemove", this._onMouseMoveHandler, true);
            this._backdrop.removeEventListener("mouseup", this._onMouseUpHandler, true);

            this.updateOffsetX(e.pageX);

            if (this.onMoved) {
                this.onMoved(this._divider.offsetLeft);
            }
        };

        Divider.prototype.updateOffsetX = function (pageX) {
            var x = pageX - this._container.offsetLeft - this._mouseDownOffset;

            if (x < this._minX) {
                x = this._minX;
            } else if (x > this._maxX) {
                x = this._maxX;
            }

            this.offsetX = x;
        };
        return Divider;
    })(Common.Controls.TemplateControl);
    Common.Divider = Divider;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var MarkerDataModel = (function () {
        function MarkerDataModel() {
            this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
        }
        MarkerDataModel.prototype.getMarks = function (markType) {
            var _this = this;
            if (!this._loadDwTask) {
                this._loadDwTask = DiagnosticsHub.DataWarehouse.loadDataWarehouse().then(function (dw) {
                    _this._datawareHouse = dw;
                }, function (error) {
                    _this._logger.error(error.toString());
                    throw error;
                });
            }

            return this._loadDwTask.then(function () {
                var customData = {
                    CounterId: markType.toString()
                };

                var contextData = {
                    customDomain: customData
                };

                return _this._datawareHouse.getFilteredData(contextData, MarkerDataModel.MarkerAnalyzerClsId);
            }).then(function (markerData) {
                var marks = [];
                var marksLength = markerData.p.length;

                for (var pos = 0; pos < marksLength; pos++) {
                    marks.push({
                        time: new DiagnosticsHub.BigNumber(markerData.p[pos].t.h, markerData.p[pos].t.l),
                        tooltip: markerData.p[pos].tt
                    });
                }
                return marks;
            }, function (error) {
                _this._logger.error(error.toString());
                throw error;
            });
        };
        MarkerDataModel.MarkerAnalyzerClsId = "212E4115-6EF3-4D06-9305-E336173C9DC9";
        return MarkerDataModel;
    })();
    Common.MarkerDataModel = MarkerDataModel;
})(Common || (Common = {}));
var Common;
(function (Common) {
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
})(Common || (Common = {}));
var Common;
(function (Common) {
    var ItemContainer = (function (_super) {
        __extends(ItemContainer, _super);
        function ItemContainer() {
            var _this = this;
            _super.call(this, document.createElement("div"));

            this.rootElement.id = "itemContainer" + (ItemContainer._idCount++);
            this.rootElement.className = "itemContainer";
            this.rootElement.tabIndex = -1;

            this.rootElement.addEventListener("focus", this.onFocus.bind(this));
            this.rootElement.addEventListener("blur", this.onBlur.bind(this));
            this.rootElement.addEventListener("click", this.onClick.bind(this));

            this.rootElement.addEventListener("mouseover", function () {
                _this.rootElement.classList.add("itemContainerHover");
            });

            this.rootElement.addEventListener("mouseleave", function () {
                _this.rootElement.classList.remove("itemContainerHover");
            });
        }
        Object.defineProperty(ItemContainer.prototype, "id", {
            get: function () {
                if (this.item) {
                    return this.item.id;
                } else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ItemContainer.prototype, "isSelected", {
            get: function () {
                return this._isSelected;
            },
            set: function (value) {
                if (this._isSelected !== value) {
                    this._isSelected = value;
                    this.updateStyle();
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ItemContainer.prototype, "item", {
            get: function () {
                return this._item;
            },
            set: function (value) {
                this._item = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ItemContainer.prototype, "template", {
            get: function () {
                return this._template;
            },
            set: function (value) {
                this._template = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ItemContainer.prototype, "hasFocus", {
            get: function () {
                return this.id !== null && this.id === ItemContainer._focusedContainerId;
            },
            set: function (value) {
                if (value) {
                    ItemContainer._focusedContainerId = this.id;
                } else {
                    ItemContainer._focusedContainerId = null;
                }
            },
            enumerable: true,
            configurable: true
        });


        ItemContainer.prototype.empty = function () {
            this.item = null;

            this._isSelected = null;

            this.rootElement.classList.remove("itemContainerHover");
        };

        ItemContainer.prototype.focus = function () {
            this._isSelected = true;
            this.hasFocus = true;
            this.updateStyle();
            this.rootElement.focus();
        };

        ItemContainer.prototype.updateStyle = function () {
            if (this._isSelected) {
                if (this.hasFocus) {
                    this.rootElement.classList.add(ItemContainer._selectedActiveCssClass);
                } else {
                    this.rootElement.classList.add(ItemContainer._selectedCssClass);
                    this.rootElement.classList.remove(ItemContainer._selectedActiveCssClass);
                }
            } else {
                this.rootElement.classList.remove(ItemContainer._selectedCssClass);
                this.rootElement.classList.remove(ItemContainer._selectedActiveCssClass);
            }
        };

        ItemContainer.prototype.onBlur = function () {
            this.hasFocus = false;
            this.updateStyle();
        };

        ItemContainer.prototype.onClick = function (e) {
            if (this.clicked) {
                this.clicked();

                e.stopImmediatePropagation();
            }
        };

        ItemContainer.prototype.onFocus = function () {
            this.hasFocus = true;
            this.updateStyle();
        };
        ItemContainer._selectedCssClass = "itemSelected";
        ItemContainer._selectedActiveCssClass = "itemSelectedActive";
        ItemContainer._idCount = 0;
        return ItemContainer;
    })(Common.Controls.Control);
    Common.ItemContainer = ItemContainer;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var ItemContainerGenerator = (function () {
        function ItemContainerGenerator() {
            this._itemContainers = {};
            this._unusedItemContainers = [];
        }
        Object.defineProperty(ItemContainerGenerator.prototype, "count", {
            get: function () {
                if (!this._dataSource) {
                    return 0;
                }

                return this._dataSource.count;
            },
            enumerable: true,
            configurable: true
        });

        ItemContainerGenerator.prototype.setDataSource = function (dataSource) {
            if (this._dataSource !== dataSource) {
                this._dataSource = dataSource;
                this._currentIndex = null;
                this.recycleAll();
            }
        };

        ItemContainerGenerator.prototype.startAt = function (index) {
            if (!this._dataSource) {
                return;
            }

            if (isNaN(index) || index < 0 || index >= this._dataSource.count) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1007"));
            }

            this._currentIndex = index;
            this._dataSource.startAt(this._currentIndex);
        };

        ItemContainerGenerator.prototype.stop = function () {
            if (!this._dataSource) {
                return;
            }

            this._currentIndex = null;
            this._dataSource.stop();
        };

        ItemContainerGenerator.prototype.ensureDataAvailable = function (startIndex, endIndex) {
            var promise;
            if (!this._dataSource) {
                promise = Common.PromiseHelper.getPromiseSuccess();
            } else {
                promise = this._dataSource.ensureDataAvailable(startIndex, endIndex);
            }
            return promise;
        };

        ItemContainerGenerator.prototype.getNext = function () {
            if (!this._dataSource) {
                return null;
            }

            if (this._currentIndex === null) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1005"));
            }

            var itemContainer = null;

            if (this._currentIndex < this._dataSource.count) {
                var item = this._dataSource.getNext();
                if (item) {
                    itemContainer = this._itemContainers[this._currentIndex];
                    if (!itemContainer) {
                        itemContainer = this.getItemContainer(this._currentIndex, item);
                        this._itemContainers[this._currentIndex] = itemContainer;
                    }

                    this._currentIndex += 1;
                }
            }

            return itemContainer;
        };

        ItemContainerGenerator.prototype.getItemContainerFromItemId = function (itemId) {
            for (var key in this._itemContainers) {
                var itemContainer = this._itemContainers[key];
                if (itemContainer.id === itemId) {
                    return itemContainer;
                }
            }

            return null;
        };

        ItemContainerGenerator.prototype.getItemContainerFromIndex = function (index) {
            return this._itemContainers[index];
        };

        ItemContainerGenerator.prototype.recycle = function (index) {
            var itemContainer = this._itemContainers[index];

            if (itemContainer) {
                delete this._itemContainers[index];
                itemContainer.empty();
                this._unusedItemContainers.push(itemContainer);
            }
        };

        ItemContainerGenerator.prototype.recycleAll = function () {
            for (var key in this._itemContainers) {
                var itemContainer = this._itemContainers[key];
                if (itemContainer) {
                    itemContainer.empty();
                    this._unusedItemContainers.push(itemContainer);
                }
            }
            this._itemContainers = {};
        };

        ItemContainerGenerator.prototype.getItemContainer = function (itemIndex, item) {
            var itemContainer;

            if (this._unusedItemContainers.length > 0) {
                itemContainer = this._unusedItemContainers.pop();
            } else {
                itemContainer = new Common.ItemContainer();
            }

            itemContainer.item = item;

            return itemContainer;
        };
        return ItemContainerGenerator;
    })();
    Common.ItemContainerGenerator = ItemContainerGenerator;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var StackPanel = (function (_super) {
        __extends(StackPanel, _super);
        function StackPanel(parentContainer) {
            _super.call(this);
            this.setTemplateFromHTML("<div id=\"stackPanelTemplate\" class=\"stackPanel\">" + "<div id=\"contentSizer\" class=\"contentSizer\"></div>" + "<div id=\"content\"></div>" + "</div>");

            this._parentContainer = parentContainer;
            this._parentContainer.appendChild(this.rootElement);
            this._content = this.findElement("content");

            this.children = {};

            this._requestScrollToOffset = null;

            this.rootElement.addEventListener("scroll", this.onScroll.bind(this), true);
            this.rootElement.onresize = this.invalidateSizeCache.bind(this);

            this._scrollTopCached = null;
        }
        Object.defineProperty(StackPanel.prototype, "content", {
            get: function () {
                return this._content;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(StackPanel.prototype, "parentContainer", {
            get: function () {
                return this._parentContainer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(StackPanel.prototype, "rowHeight", {
            get: function () {
                if (!this._rowHeight) {
                    var itemContainer = new Common.ItemContainer();

                    this.content.appendChild(itemContainer.rootElement);
                    this._rowHeight = itemContainer.rootElement.offsetHeight;
                    this.content.removeChild(itemContainer.rootElement);
                }

                return this._rowHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(StackPanel.prototype, "viewportHeight", {
            get: function () {
                if (!this._viewportHeight) {
                    this._viewportHeight = this._parentContainer.offsetHeight;
                }
                return this._viewportHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(StackPanel.prototype, "viewportItemsCount", {
            get: function () {
                if (this.rowHeight === 0 || isNaN(this.rowHeight))
                    return 0;
                return Math.floor(this.viewportHeight / this.rowHeight);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(StackPanel.prototype, "scrollHeight", {
            get: function () {
                return this.rootElement.scrollHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(StackPanel.prototype, "scrollTop", {
            get: function () {
                if (this._requestScrollToOffset !== null) {
                    var offset = Math.min(this._requestScrollToOffset, this.scrollHeight - this.viewportHeight);
                    offset = Math.max(0, offset);

                    return offset;
                }

                return this.scrollTopCached;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(StackPanel.prototype, "scrollTopCached", {
            get: function () {
                if (this._scrollTopCached === null) {
                    this._scrollTopCached = this.rootElement.scrollTop;
                }
                return this._scrollTopCached;
            },
            enumerable: true,
            configurable: true
        });

        StackPanel.prototype.ensureVisible = function (visibleIndex) {
            var itemTop = visibleIndex * this.rowHeight;
            var itemBottom = itemTop + this.rowHeight;

            var viewportTop = this.scrollTop;
            var viewportBottom = viewportTop + this.viewportHeight;

            if (itemTop < viewportTop || itemBottom > viewportBottom) {
                var scrollToPos;
                if (itemTop < viewportTop) {
                    scrollToPos = itemTop;
                } else {
                    scrollToPos = itemBottom - this.viewportHeight;
                }

                return this.scrollToOffset(scrollToPos);
            }
            return Common.PromiseHelper.getPromiseSuccess();
        };

        StackPanel.prototype.getItemContainerFromItem = function (item) {
            return this.itemContainerGenerator.getItemContainerFromItemId(item.id);
        };

        StackPanel.prototype.getItemContainerFromIndex = function (index) {
            return this.itemContainerGenerator.getItemContainerFromIndex(index);
        };

        StackPanel.prototype.recycleItem = function (index) {
            this.itemContainerGenerator.recycle(index);
        };
        StackPanel.prototype.setDataSource = function (datasource) {
            this.itemContainerGenerator.setDataSource(datasource);
        };
        Object.defineProperty(StackPanel.prototype, "itemsCount", {
            get: function () {
                return this.itemContainerGenerator.count;
            },
            enumerable: true,
            configurable: true
        });

        StackPanel.prototype.getScrollViewportOffset = function (itemContainer) {
            var top = parseInt(itemContainer.rootElement.style.top);
            var scrollTop = this.scrollTop;
            var viewportHeight = this.viewportHeight;
            var viewportOffset = top - scrollTop;
            if (viewportOffset > 0 && viewportOffset <= viewportHeight - this.rowHeight) {
                return viewportOffset;
            }

            return 0;
        };

        StackPanel.prototype.invalidate = function () {
            for (var key in this.children) {
                var itemContainer = this.children[key];

                if (itemContainer) {
                    this.templateBinder.unbind(itemContainer);
                }
            }

            this.itemContainerGenerator.recycleAll();

            this.children = {};
        };

        StackPanel.prototype.invalidateSizeCache = function () {
            this._viewportHeight = null;
            this._rowHeight = 0;
        };

        StackPanel.prototype.render = function () {
            var _this = this;
            var promise;

            if (this._isRendering || !this.templateBinder) {
                promise = Common.PromiseHelper.getPromiseSuccess();
            } else {
                this._isRendering = true;
                try  {
                    promise = this.renderCoreOverride().then(function () {
                        if (_this._requestScrollToOffset !== null) {
                            if (_this.scrollTopCached !== _this._requestScrollToOffset) {
                                _this._scrollTopCached = null;
                                _this.rootElement.scrollTop = _this._requestScrollToOffset;
                            }
                        }
                        _this._requestScrollToOffset = null;
                        _this._isRendering = false;
                    }, function (error) {
                        _this._isRendering = false;
                        throw error;
                    });
                } catch (e) {
                    this._isRendering = false;
                    throw e;
                }
            }

            return promise;
        };

        StackPanel.prototype.renderCoreOverride = function () {
            var _this = this;
            var index = 0;

            this.itemContainerGenerator.startAt(0);

            return this.itemContainerGenerator.ensureDataAvailable(0, this.itemContainerGenerator.count).then(function () {
                var itemContainer = _this.itemContainerGenerator.getNext();

                while (itemContainer) {
                    _this.templateBinder.bind(itemContainer, index++);
                    _this.rootElement.appendChild(itemContainer.rootElement);

                    itemContainer = _this.itemContainerGenerator.getNext();
                }
                _this.itemContainerGenerator.stop();
            });
        };

        StackPanel.prototype.scrollToIndex = function (visibleIndex, scrollOffset, postponeUntilRender) {
            if (typeof scrollOffset === "undefined") { scrollOffset = 0; }
            if (!this._lockView) {
                var position = visibleIndex * this.rowHeight + scrollOffset;
                return this.scrollToOffset(position, postponeUntilRender);
            }

            return Common.PromiseHelper.getPromiseError();
        };

        StackPanel.prototype.scrollToOffset = function (offset, postponeUntilRender) {
            if (postponeUntilRender) {
                this._requestScrollToOffset = offset;
            } else {
                this._requestScrollToOffset = null;
                this._scrollTopCached = null;
                this.rootElement.scrollTop = offset;

                this._skipNextOnScroll = true;
                return this.render();
            }
            return Common.PromiseHelper.getPromiseSuccess();
        };

        StackPanel.prototype.scrollToOffsetForVisibility = function (offset, postponeUntilRender) {
            if (postponeUntilRender) {
                this._requestScrollToOffset = offset;
            } else {
                this._requestScrollToOffset = null;
                this._scrollTopCached = null;
                this.rootElement.scrollTop = offset;

                this._skipNextOnScroll = true;
                return this.render();
            }
            return Common.PromiseHelper.getPromiseSuccess();
        };

        StackPanel.prototype.onScroll = function (e) {
            this._scrollTopCached = null;

            if (this._skipNextOnScroll) {
                this._skipNextOnScroll = false;
                return;
            }

            this.render();
        };
        return StackPanel;
    })(Common.Controls.TemplateControl);
    Common.StackPanel = StackPanel;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var VirtualizingStackPanel = (function (_super) {
        __extends(VirtualizingStackPanel, _super);
        function VirtualizingStackPanel(parentContainer) {
            _super.call(this, parentContainer);
            this._contentSizer = this.findElement("contentSizer");
            this._firstVisibleItemIndex = 0;
        }
        Object.defineProperty(VirtualizingStackPanel.prototype, "actualHeight", {
            get: function () {
                return this.viewportHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(VirtualizingStackPanel.prototype, "scrollHeight", {
            get: function () {
                return this.virtualHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(VirtualizingStackPanel.prototype, "virtualHeight", {
            get: function () {
                return this.rowHeight * this.itemContainerGenerator.count;
            },
            enumerable: true,
            configurable: true
        });

        VirtualizingStackPanel.prototype.renderCoreOverride = function () {
            var _this = this;
            var promise;

            this.updateVirtualHeight();

            var visibleItemsCount = Math.ceil(this.getVisibleItemsScrollFraction());
            var firstVisibleItemIndexFractional = this.getFirstVisibleItemScrollFraction();

            if (this.rootElement.scrollTop == 0 && firstVisibleItemIndexFractional > 0) {
                this.rootElement.scrollTop = firstVisibleItemIndexFractional * this.rowHeight;
                return Common.PromiseHelper.getPromiseSuccess();
            }
            if (firstVisibleItemIndexFractional < this.itemContainerGenerator.count) {
                var overflowItemsCount = Math.ceil(visibleItemsCount / 4);
                var newFirstVisibleItemIndexFloor = Math.max(0, Math.floor(firstVisibleItemIndexFractional) - overflowItemsCount);
                var newFirstVisibleItemIndexCeiling = Math.max(0, Math.ceil(firstVisibleItemIndexFractional) - overflowItemsCount);
                var newLastVisibleItemIndex = Math.min(this.itemContainerGenerator.count - 1, Math.ceil(this.getFirstVisibleItemScrollFraction()) + visibleItemsCount + overflowItemsCount);

                this.itemContainerGenerator.startAt(newFirstVisibleItemIndexFloor);

                var firstChild = this.content.firstChild;

                promise = this.itemContainerGenerator.ensureDataAvailable(newFirstVisibleItemIndexFloor, newLastVisibleItemIndex).then(function () {
                    for (var i = _this._firstVisibleItemIndex; i < newFirstVisibleItemIndexFloor; ++i) {
                        _this.removeItemContainerByIndex(i);
                    }

                    for (var i = newLastVisibleItemIndex + 1; i <= _this._lastVisibleItemIndex; ++i) {
                        _this.removeItemContainerByIndex(i);
                    }

                    for (var i = newFirstVisibleItemIndexFloor; i <= newLastVisibleItemIndex; ++i) {
                        var itemContainer = _this.itemContainerGenerator.getNext();
                        if (!itemContainer)
                            break;

                        _this.templateBinder.bind(itemContainer, i);
                        itemContainer.rootElement.style.top = (i * _this.rowHeight) + "px";

                        if (_this.children[i.toString()] !== itemContainer) {
                            if (!_this.content.contains(itemContainer.rootElement)) {
                                _this.content.appendChild(itemContainer.rootElement);
                            }

                            _this.children[i.toString()] = itemContainer;
                        }
                    }

                    _this.itemContainerGenerator.stop();

                    _this._firstVisibleItemIndex = newFirstVisibleItemIndexFloor;
                    _this._lastVisibleItemIndex = newLastVisibleItemIndex;
                    _this.removeOrphanElements();
                }, function (error) {
                    _this.itemContainerGenerator.stop();
                    throw error;
                });
            } else {
                this.removeOrphanElements();
                promise = Common.PromiseHelper.getPromiseSuccess();
            }
            return promise;
        };

        VirtualizingStackPanel.prototype.getFirstVisibleItemScrollFraction = function () {
            return this.scrollTop / this.rowHeight;
        };

        VirtualizingStackPanel.prototype.getVisibleItemsScrollFraction = function () {
            return this.viewportHeight / this.rowHeight;
        };

        VirtualizingStackPanel.prototype.removeItemContainerByIndex = function (index) {
            var itemContainer = this.children[index.toString()];

            delete this.children[index.toString()];

            if (itemContainer) {
                this.templateBinder.unbind(itemContainer);
            }

            this.itemContainerGenerator.recycle(index);
        };

        VirtualizingStackPanel.prototype.removeOrphanElements = function () {
            var map = {};
            for (var key in this.children) {
                var child = this.children[key];
                map[child.rootElement.id] = true;
            }

            for (var elementIndex = this.content.children.length - 1; elementIndex >= 0; --elementIndex) {
                var element = this.content.children[elementIndex];
                if (!map[element.id]) {
                    this.content.removeChild(element);
                }
            }
        };

        VirtualizingStackPanel.prototype.updateVirtualHeight = function () {
            this._contentSizer.style.top = this.virtualHeight + "px";
        };
        return VirtualizingStackPanel;
    })(Common.StackPanel);
    Common.VirtualizingStackPanel = VirtualizingStackPanel;
})(Common || (Common = {}));
var Common;
(function (Common) {
    (function (Data) {
        (function (TreeViewQueryResultTaskType) {
            TreeViewQueryResultTaskType[TreeViewQueryResultTaskType["GET_EVENTS_COUNT"] = 1] = "GET_EVENTS_COUNT";
            TreeViewQueryResultTaskType[TreeViewQueryResultTaskType["GET_EVENTS"] = 2] = "GET_EVENTS";
            TreeViewQueryResultTaskType[TreeViewQueryResultTaskType["INDEX_OF_EVENT"] = 3] = "INDEX_OF_EVENT";
            TreeViewQueryResultTaskType[TreeViewQueryResultTaskType["COLLAPSE_EVENT_BRANCH"] = 4] = "COLLAPSE_EVENT_BRANCH";
            TreeViewQueryResultTaskType[TreeViewQueryResultTaskType["EXPAND_EVENT_BRANCH"] = 5] = "EXPAND_EVENT_BRANCH";
            TreeViewQueryResultTaskType[TreeViewQueryResultTaskType["GET_EXPANDED_EVENT_IDS"] = 6] = "GET_EXPANDED_EVENT_IDS";
            TreeViewQueryResultTaskType[TreeViewQueryResultTaskType["MAX"] = 7] = "MAX";
        })(Data.TreeViewQueryResultTaskType || (Data.TreeViewQueryResultTaskType = {}));
        var TreeViewQueryResultTaskType = Data.TreeViewQueryResultTaskType;

        var EventQueryResult = (function () {
            function EventQueryResult(resultObject) {
                this._resultObj = resultObject;
                this._requests = [];
            }
            EventQueryResult.prototype.collapseEventBranch = function (index) {
                var requestObject = {
                    task: 4 /* COLLAPSE_EVENT_BRANCH */,
                    index: index
                };

                return this.submitRequest(requestObject);
            };

            EventQueryResult.prototype.expandEventBranch = function (index) {
                var requestObject = {
                    task: 5 /* EXPAND_EVENT_BRANCH */,
                    index: index
                };

                return this.submitRequest(requestObject);
            };

            EventQueryResult.prototype.getEventsCount = function () {
                var requestObject = {
                    task: 1 /* GET_EVENTS_COUNT */
                };

                return this.submitRequest(requestObject).then(function (respose) {
                    return respose.eventsCount;
                });
            };

            EventQueryResult.prototype.getEvents = function (startIndex, endIndex) {
                var requestObject = {
                    task: 2 /* GET_EVENTS */,
                    startIndex: startIndex,
                    endIndex: endIndex
                };

                return this.submitRequest(requestObject);
            };

            EventQueryResult.prototype.getExpandedEventIds = function () {
                var requestObject = {
                    task: 6 /* GET_EXPANDED_EVENT_IDS */
                };

                return this.submitRequest(requestObject).then(function (eventIds) {
                    return eventIds;
                });
            };

            EventQueryResult.prototype.indexOfEvent = function (id) {
                var requestObject = {
                    task: 3 /* INDEX_OF_EVENT */,
                    id: id
                };

                return this.submitRequest(requestObject).then(function (response) {
                    return response.index;
                });
            };

            EventQueryResult.prototype.dispose = function () {
                return this.submitRequest(null, true);
            };

            EventQueryResult.prototype.submitRequest = function (request, isDisposeRequest) {
                var queryRequest = {
                    requestData: request,
                    promise: Common.PromiseHelper.promiseWrapper,
                    isDispose: isDisposeRequest
                };

                if (!this._disposed) {
                    this._requests.push(queryRequest);

                    if (this._requests.length == 1) {
                        this.processRequest();
                    }
                }

                return queryRequest.promise.promise;
            };

            EventQueryResult.prototype.processRequest = function () {
                var _this = this;
                if (this._requests.length > 0) {
                    var request = this._requests[0];
                    if (request.isDispose) {
                        this._requests = [];
                        this._disposed = true;
                        this._resultObj.dispose().then(function () {
                            Common.PromiseHelper.safeInvokePromise(request.promise.completeHandler, null);
                        }, function (error) {
                            Common.PromiseHelper.safeInvokePromise(request.promise.errorHandler, error);
                        });
                    } else {
                        this._resultObj.getResult(request.requestData).then(function (data) {
                            Common.PromiseHelper.safeInvokePromise(request.promise.completeHandler, data);
                            _this._requests.shift();
                            _this.processRequest();
                        }, function (error) {
                            Common.PromiseHelper.safeInvokePromise(request.promise.errorHandler, error);
                            _this._requests.shift();
                            _this.processRequest();
                        });
                    }
                }
            };
            return EventQueryResult;
        })();
        Data.EventQueryResult = EventQueryResult;
    })(Common.Data || (Common.Data = {}));
    var Data = Common.Data;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var EventInterval = (function () {
        function EventInterval(eventIntervalData) {
            this.timespan = new Common.TimeSpan(Common.TimestampConvertor.jsonToTimeStamp(eventIntervalData.StartTime), Common.TimestampConvertor.jsonToTimeStamp(eventIntervalData.EndTime));
        }
        return EventInterval;
    })();
    Common.EventInterval = EventInterval;

    var BaseEvent = (function () {
        function BaseEvent(eventData, intervals) {
            this.details = [];
            this._eventData = eventData;
            this._intervals = intervals;
        }
        Object.defineProperty(BaseEvent.prototype, "category", {
            get: function () {
                return this._eventData.category;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseEvent.prototype, "childrenCount", {
            get: function () {
                return this._eventData.childrenCount;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseEvent.prototype, "level", {
            get: function () {
                return this._eventData.level;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseEvent.prototype, "id", {
            get: function () {
                return this._eventData.id;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseEvent.prototype, "isExpanded", {
            get: function () {
                return this._eventData.isExpanded;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseEvent.prototype, "name", {
            get: function () {
                return this._eventData.name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseEvent.prototype, "hasChildren", {
            get: function () {
                return this.childrenCount > 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseEvent.prototype, "nameAndContext", {
            get: function () {
                return this.name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(BaseEvent.prototype, "intervals", {
            get: function () {
                return this._intervals;
            },
            enumerable: true,
            configurable: true
        });

        BaseEvent.prototype.createDetailInfo = function (name, value, nameLocalizationKey, valueLocalizationKey, tooltipName, tooltipValue) {
            if (typeof tooltipName === "undefined") { tooltipName = null; }
            if (typeof tooltipValue === "undefined") { tooltipValue = null; }
            var additionalInfo = {
                propertyName: name,
                propertyValue: value,
                localizedName: nameLocalizationKey ? Plugin.Resources.getString(nameLocalizationKey) : name,
                localizedValue: valueLocalizationKey ? Plugin.Resources.getString(valueLocalizationKey) : value,
                tooltipName: tooltipName,
                tooltipValue: tooltipValue
            };

            return additionalInfo;
        };
        BaseEvent.prototype.getCssClass = function () {
            return "eventBarColor";
        };
        BaseEvent.prototype.getDescription = function () {
            return "";
        };
        BaseEvent.prototype.getDetails = function () {
            return [];
        };

        BaseEvent.prototype.getTooltip = function (intervalPosition) {
            return null;
        };
        return BaseEvent;
    })();
    Common.BaseEvent = BaseEvent;

    var EventsTimelineDataSource = (function () {
        function EventsTimelineDataSource(eventsFactory) {
            this._data = [];
            this._dataPrevious = [];
            this._eventsFactory = eventsFactory;
            this._currentIndex = null;
        }
        EventsTimelineDataSource.prototype.initialize = function (queryResult) {
            var _this = this;
            if (this._initializePromise) {
                this._initializePromise.cancel();
            }

            this._queryResult = queryResult;
            this._initializePromise = this._queryResult.getEventsCount().then(function (eventsCount) {
                _this._count = eventsCount;
            });

            return this._initializePromise;
        };

        Object.defineProperty(EventsTimelineDataSource.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });

        EventsTimelineDataSource.prototype.collapseIntervalBranch = function (index) {
            var _this = this;
            return this._queryResult.collapseEventBranch(index).then(function () {
                return _this.resetData();
            });
        };

        EventsTimelineDataSource.prototype.expandIntervalBranch = function (index) {
            var _this = this;
            return this._queryResult.expandEventBranch(index).then(function () {
                return _this.resetData();
            });
        };

        EventsTimelineDataSource.prototype.ensureDataAvailable = function (startIndex, endIndex) {
            if (!(this._data[startIndex] && this._data[endIndex])) {
                this.fetchFromPrevious(startIndex, endIndex);
                if (!(this._data[startIndex] && this._data[endIndex])) {
                    return this.fetchData(startIndex, Math.max(endIndex, EventsTimelineDataSource.PrefetchSize));
                }
            }

            return Common.PromiseHelper.getPromiseSuccess();
        };

        EventsTimelineDataSource.prototype.getNext = function (skip) {
            if (this._currentIndex === null) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1005"));
            }

            if (this._currentIndex >= this.count)
                return null;

            var event = this._data[this._currentIndex];

            this._currentIndex++;

            if (!isNaN(skip)) {
                this._currentIndex += skip;
            }

            return event;
        };

        EventsTimelineDataSource.prototype.indexOfInterval = function (eventId) {
            return this._queryResult.indexOfEvent(eventId);
        };

        EventsTimelineDataSource.prototype.startAt = function (index) {
            if (this._currentIndex !== null) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1006"));
            }
            if (isNaN(index) || index < 0 || index >= this.count) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1007"));
            }

            this._currentIndex = index;
            this._data = [];
        };

        EventsTimelineDataSource.prototype.stop = function () {
            this._currentIndex = null;

            this._dataPrevious = this._data;
            this._data = null;
        };

        EventsTimelineDataSource.prototype.fetchData = function (index, max) {
            var _this = this;
            var fromIndex = Math.max(0, index - max);
            var toIndex = Math.min(this._count, index + max) - 1;

            return this._queryResult.getEvents(fromIndex, toIndex).then(function (events) {
                var dataIndex = fromIndex;
                for (var i = 0; i < events.length; i++, dataIndex++) {
                    if (!_this._data[dataIndex]) {
                        var event = events[i];
                        _this._data[dataIndex] = _this._eventsFactory.createEvent(event);
                    }
                }
            });
        };

        EventsTimelineDataSource.prototype.fetchFromPrevious = function (index, max) {
            if (this._dataPrevious[index]) {
                var fromIndex = Math.max(0, index - max);
                var toIndex = Math.min(this._dataPrevious.length, index + max) - 1;
                for (var i = fromIndex; i <= toIndex; i++) {
                    var item = this._dataPrevious[i];
                    if (item) {
                        this._data[i] = item;
                    }
                }
                return true;
            }
            return false;
        };

        EventsTimelineDataSource.prototype.resetData = function () {
            var _this = this;
            this._dataPrevious = [];
            this._data = [];
            return this._queryResult.getEventsCount().then(function (eventsCount) {
                _this._count = eventsCount;
            });
        };
        EventsTimelineDataSource.PrefetchSize = 30;
        return EventsTimelineDataSource;
    })();
    Common.EventsTimelineDataSource = EventsTimelineDataSource;

    var EventsTimelineModel = (function () {
        function EventsTimelineModel(session, eventFactory) {
            this._eventFactory = eventFactory;
            this._session = session;
        }
        EventsTimelineModel.prototype.getEvents = function (timeSpan, granularity, sort) {
            var _this = this;
            var data = [];
            var getExpandedIdsPromise;
            var newQueryResult;

            if (this._currentQueryResult) {
                getExpandedIdsPromise = this._currentQueryResult.getExpandedEventIds();
            } else {
                getExpandedIdsPromise = Common.PromiseHelper.getPromiseSuccess([]);
            }

            return getExpandedIdsPromise.then(function (eventIds) {
                return _this._session.queryEvents(timeSpan.begin.nsec, timeSpan.end.nsec, granularity.nsec, sort, eventIds);
            }).then(function (queryResult) {
                newQueryResult = queryResult;
                return _this.getDataSource(queryResult, _this._eventFactory);
            }).then(function (dataSource) {
                if (_this._currentQueryResult) {
                    _this._currentQueryResult.dispose();
                }
                _this._currentQueryResult = newQueryResult;
                return dataSource;
            }, function (error) {
                if (newQueryResult) {
                    newQueryResult.dispose();
                }
                throw error;
            });
        };

        EventsTimelineModel.prototype.getDataSource = function (queryResult, eventFactory) {
            var dataSource = new EventsTimelineDataSource(eventFactory);

            return dataSource.initialize(queryResult).then(function () {
                return dataSource;
            });
        };
        return EventsTimelineModel;
    })();
    Common.EventsTimelineModel = EventsTimelineModel;

    var EventsTimelineViewModel = (function () {
        function EventsTimelineViewModel(model, sessionDuration, markerDataModel, fetchDataOnGranularityChange) {
            if (typeof fetchDataOnGranularityChange === "undefined") { fetchDataOnGranularityChange = false; }
            this._model = model;
            this._markerDataModel = markerDataModel;
            this._fetchDataOnGranularityChange = fetchDataOnGranularityChange;
            this._viewEventManager = DiagnosticsHub.getViewEventManager();
            this._timeSpan = sessionDuration;
            this._viewEventManager.selectionChanged.addEventListener(this.onRulerSelectionChanged.bind(this));
        }
        Object.defineProperty(EventsTimelineViewModel.prototype, "selectedEvent", {
            get: function () {
                return this._selectedEvent;
            },
            set: function (event) {
                if (this._selectedEvent !== event) {
                    this._selectedEvent = event;

                    if (this.selectedEventChanged) {
                        this.selectedEventChanged(this._selectedEvent);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineViewModel.prototype, "sort", {
            set: function (value) {
                if (this._sort !== value) {
                    this._sort = value;
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineViewModel.prototype, "timeSpan", {
            get: function () {
                return this._timeSpan;
            },
            set: function (value) {
                if ((value === undefined && this._timeSpan !== undefined) || (value !== undefined && this._timeSpan === undefined) || (value !== undefined && this._timeSpan !== undefined && !value.equals(this._timeSpan))) {
                    this._timeSpan = value;
                    if (this.timeSpanChanged) {
                        this.timeSpanChanged();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineViewModel.prototype, "fetchDataOnGranularityChange", {
            get: function () {
                return this._fetchDataOnGranularityChange;
            },
            enumerable: true,
            configurable: true
        });

        EventsTimelineViewModel.prototype.getEventDetails = function (event) {
            return event.getDetails();
        };

        EventsTimelineViewModel.prototype.getEvents = function (granularity) {
            var _this = this;
            if (this._getEventsPromise) {
                this._getEventsPromise.cancel();
            }

            var isDataSourceInvalid = true;

            if (this._timeSpanForLastFetch && this._timeSpanForLastFetch.equals(this._timeSpan) && (!this.fetchDataOnGranularityChange || (this._granularityForLastFetch && this._granularityForLastFetch.equals(granularity))) && this._sortForLastFetch === this._sort) {
                isDataSourceInvalid = false;
            }

            if (isDataSourceInvalid) {
                this._getEventsPromise = this._model.getEvents(this._timeSpan, granularity, this._sort).then(function (dataSource) {
                    _this._dataSource = dataSource;

                    _this._timeSpanForLastFetch = new Common.TimeSpan(_this._timeSpan.begin, _this._timeSpan.end);
                    _this._granularityForLastFetch = Common.TimeStamp.fromNanoseconds(granularity.nsec);
                    _this._sortForLastFetch = _this._sort;

                    return _this._dataSource;
                });
            } else {
                this._getEventsPromise = Common.PromiseHelper.getPromiseSuccess(this._dataSource);
            }

            return this._getEventsPromise;
        };

        EventsTimelineViewModel.prototype.getMarks = function (markType) {
            if (this._markerDataModel) {
                return this._markerDataModel.getMarks(markType);
            } else {
                return Plugin.Promise.wrap([]);
            }
        };

        EventsTimelineViewModel.prototype.getVerticalRulerLinePositions = function (viewWidth) {
            return DiagnosticsHub.RulerUtilities.getVerticalLinePositions(new DiagnosticsHub.JsonTimespan(Common.TimestampConvertor.timestampToJson(this._timeSpan.begin), Common.TimestampConvertor.timestampToJson(this._timeSpan.end)), viewWidth);
        };

        EventsTimelineViewModel.prototype.onRulerSelectionChanged = function (args) {
            if (!args.isIntermittent) {
                this.timeSpan = new Common.TimeSpan(new Common.TimeStamp(parseInt(args.position.begin.value)), new Common.TimeStamp(parseInt(args.position.end.value)));
            }
        };
        return EventsTimelineViewModel;
    })();
    Common.EventsTimelineViewModel = EventsTimelineViewModel;

    var EventDataTemplate = (function (_super) {
        __extends(EventDataTemplate, _super);
        function EventDataTemplate(baseCssName, showDurationText) {
            _super.call(this);
            this._showDurationText = showDurationText;
            this.setTemplateFromHTML("<div>" + "<div id=\"eventDataTemplateNameCell\" class=\"eventDataTemplateNameCell\">" + "<div id=\"expander\"></div>" + "<div id=\"eventName\" class=\"eventDataTemplateName\"></div>" + "</div>" + "<div id=\"eventData\" class=\"eventDataTemplateDataCell\">" + "</div>" + "</div>");
            this.rootElement.className = baseCssName;

            this._eventDataTemplateNameCell = this.findElement("eventDataTemplateNameCell");
            this._eventDataContainer = this.findElement("eventData");
            this._eventName = this.findElement("eventName");
            this._expander = this.findElement("expander");

            this._expander.addEventListener("click", this.onExpansionClicked.bind(this));
            this._expander.addEventListener("dblclick", this.onExpanderDoubleClicked.bind(this));

            this._showEventIntervalTooltip = this.showBarTooltip.bind(this);

            this._eventName.addEventListener("mouseover", this.showEventNameTooltip.bind(this));
            this._eventName.addEventListener("mouseout", function (mouseEvent) {
                return Plugin.Tooltip.dismiss();
            });

            this.rootElement.addEventListener("dblclick", this.onExpansionClicked.bind(this));
            this._eventDataRecycler = Common.ElementRecyclerFactory.forDivWithClass(this._eventDataContainer, EventDataTemplate.BarCssClass);
        }
        EventDataTemplate.prototype.updateEvent = function (event, parentTimeSpan, dataColumnWidth) {
            if (this._event !== event || !this._parentTimeSpan || !this._parentTimeSpan.equals(parentTimeSpan)) {
                this._event = event;
                this._parentTimeSpan = parentTimeSpan;
                this._dataColumnWidth = dataColumnWidth;
                this.updateUi();
            }
        };

        EventDataTemplate.prototype.collapse = function () {
            if (this._event && this._event.hasChildren) {
                if (!this._expander.classList.contains(EventDataTemplate.CollapsedCssClass)) {
                    this.onExpansionClicked(null);
                    return true;
                }
            }
            return false;
        };

        EventDataTemplate.prototype.expand = function () {
            if (this._event && this._event.hasChildren) {
                if (!this._expander.classList.contains(EventDataTemplate.ExpandedCssClass)) {
                    this.onExpansionClicked(null);
                    return true;
                }
            }
            return false;
        };

        EventDataTemplate.prototype.onExpansionClicked = function (e) {
            if (e) {
                e.stopImmediatePropagation();
            }

            if (this.expansionToggledCallback) {
                this.expansionToggledCallback();
            }
        };

        EventDataTemplate.prototype.onExpanderDoubleClicked = function (e) {
            if (e) {
                e.stopImmediatePropagation();
            }
        };
        EventDataTemplate.prototype.showBarTooltip = function (mouseEvent) {
            var bar = mouseEvent.currentTarget;
            if (this._event) {
                var toolTipControl = this._event.getTooltip(Number(bar.getAttribute(EventDataTemplate.BarIntervalPositionAttribute)));
                if (toolTipControl) {
                    var config = {
                        content: toolTipControl.rootElement.innerHTML
                    };
                    Plugin.Tooltip.show(config);
                }
            }
        };

        EventDataTemplate.prototype.showEventNameTooltip = function (mouseEvent) {
            if (this._event) {
                var eventDiv = mouseEvent.currentTarget;

                if (eventDiv.offsetWidth < eventDiv.scrollWidth) {
                    var config = {
                        content: this._event.nameAndContext
                    };
                    Plugin.Tooltip.show(config);
                }
            }
        };

        EventDataTemplate.prototype.updateEventDataContent = function (event) {
            var intervals = event.intervals;
            var intervalsCount = intervals.length;

            var granularity = this._parentTimeSpan.elapsed.nsec / 100;
            var previousIntervalEndTime = this._parentTimeSpan.begin.nsec;
            this._eventDataRecycler.start();
            for (var i = 0; i < intervalsCount; i++) {
                var bar = this._eventDataRecycler.getNext();
                var left = (intervals[i].timespan.begin.nsec - previousIntervalEndTime) / granularity;
                var width = intervals[i].timespan.elapsed.nsec / granularity;
                bar.style.marginLeft = left + "%";
                bar.style.width = width + "%";

                bar.style.minWidth = EventDataTemplate.MinBarWidth + "px";
                bar.addEventListener("mouseover", this._showEventIntervalTooltip);
                bar.addEventListener("mouseout", function (mouseEvent) {
                    return Plugin.Tooltip.dismiss();
                });
                bar.setAttribute(EventDataTemplate.BarIntervalPositionAttribute, i.toString());

                EventDataTemplate.setBarCss(bar, event);

                previousIntervalEndTime = intervals[i].timespan.end.nsec;
            }
            if (this._showDurationText) {
                if (intervals.length != 1) {
                    throw new Error(Plugin.Resources.getErrorString("R2LControl.1008"));
                }
                var durationText = this._eventDataRecycler.getNext();

                durationText.style.left = "0px";
                durationText.innerText = Common.FormattingHelpers.getPrettyPrintTime(intervals[0].timespan.elapsed);
                durationText.className = "durationText";
            }
            this._eventDataRecycler.stop();
        };
        EventDataTemplate.prototype.updateUi = function () {
            var event = this._event;
            this._eventDataTemplateNameCell.style.marginLeft = (event.level * EventDataTemplate.IndentationInPixels) + "px";
            EventDataTemplate.setExpanderCss(this._expander, event);
            this._eventName.innerText = event.nameAndContext;
            this.updateEventDataContent(event);
        };

        EventDataTemplate.setBarCss = function (bar, event) {
            bar.className = "eventBar " + event.getCssClass();
        };

        EventDataTemplate.setExpanderCss = function (expander, event) {
            if (event.hasChildren) {
                if (!event.isExpanded) {
                    expander.classList.remove(EventDataTemplate.ExpandedCssClass);
                    expander.classList.add(EventDataTemplate.CollapsedCssClass);
                } else {
                    expander.classList.remove(EventDataTemplate.CollapsedCssClass);
                    expander.classList.add(EventDataTemplate.ExpandedCssClass);
                }
            } else {
                expander.classList.remove(EventDataTemplate.ExpandedCssClass);
                expander.classList.remove(EventDataTemplate.CollapsedCssClass);
            }
        };
        EventDataTemplate.IndentationInPixels = 20;
        EventDataTemplate.CollapsedCssClass = "itemCollapsed";
        EventDataTemplate.ExpandedCssClass = "itemExpanded";
        EventDataTemplate.BarIntervalPositionAttribute = "intervalPosition";
        EventDataTemplate.BarCssClass = "eventBar";
        EventDataTemplate.DurationTextCssClass = "durationText";

        EventDataTemplate.MinBarWidth = 3;
        return EventDataTemplate;
    })(Common.Controls.TemplateControl);
    Common.EventDataTemplate = EventDataTemplate;

    var EventDetailsView = (function (_super) {
        __extends(EventDetailsView, _super);
        function EventDetailsView(event, details) {
            _super.call(this);
            this.setTemplateFromHTML("<div id=\"eventDetails\" class=\"eventDetails\">" + "<div id=\"eventDetailsHead\" class =\"eventDetailsHead\">" + "<span id=\"eventDetailsTitle\" class=\"eventDetailsTitle\"></span>" + "</div>" + "<div id=\"additionalDetails\" class=\"eventDetailsTable\"></div>" + "<div id=\"eventDetailsDescription\" class=\"eventDetailsDescription\"></div>" + "</div>");

            if (event === null) {
                var eventDetailsHead = this.findElement("eventDetailsHead");
                var description = this.findElement("eventDetailsDescription");

                eventDetailsHead.classList.add("emptyHeader");
                description.innerText = Plugin.Resources.getString("SelectAnEventDescription");
            } else {
                this._details = details;
                this._event = event;

                this.displayCommonFields();
                this.displayEventSpecificFields();

                var cells = this.findElementsByClassName("eventCell");
                for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                    var cell = cells[cellIndex];
                    (function (value) {
                        cell.addEventListener("mouseover", function (mouseEvent) {
                            return EventDetailsView.showCellTooltip(mouseEvent, value);
                        });
                        cell.addEventListener("mouseout", function (mouseEvent) {
                            return Plugin.Tooltip.dismiss();
                        });
                    })(cell.innerText);
                }
            }
        }
        EventDetailsView.showCellTooltip = function (mouseEvent, text) {
            var div = mouseEvent.currentTarget;
            var tooltipContent = div.getAttribute(EventDetailsView.TooltipContentAttribute);

            if (tooltipContent && tooltipContent !== "") {
                Plugin.Tooltip.show(tooltipContent);
            } else if (div.offsetWidth < div.scrollWidth) {
                Plugin.Tooltip.show(text);
            }
        };

        EventDetailsView.prototype.createDiv = function (value, classNames, tooltipContent) {
            if (typeof tooltipContent === "undefined") { tooltipContent = null; }
            var div = document.createElement("div");
            div.innerText = value;
            var classLength = classNames.length;
            for (var i = 0; i < classLength; i++) {
                div.classList.add(classNames[i]);
            }
            if (tooltipContent) {
                div.setAttribute(EventDetailsView.TooltipContentAttribute, tooltipContent);
            }
            return div;
        };

        EventDetailsView.prototype.displayCommonFields = function () {
            var eventDetailsHead = this.findElement("eventDetailsHead");
            var eventDetailsTitle = this.findElement("eventDetailsTitle");
            var description = this.findElement("eventDetailsDescription");

            eventDetailsHead.classList.add(this._event.getCssClass());
            eventDetailsTitle.innerText = this._event.name;
            description.innerText = this._event.getDescription();
        };

        EventDetailsView.prototype.displayEventSpecificFields = function () {
            if (!this._details) {
                return;
            }
            var additionalDetailsContainer = this.findElement("additionalDetails");

            for (var i = 0; i < this._details.length; i++) {
                var detail = this._details[i];
                var nameDiv = this.createDiv(detail.localizedName + ":", ["eventCell"], detail.tooltipName);
                var valueDiv = this.createDiv(detail.localizedValue, ["eventCell", "eventCellValue"], detail.tooltipValue);
                var additionalDetailsLabelValuePair = this.createDiv("", ["eventRow"]);
                additionalDetailsLabelValuePair.appendChild(nameDiv);
                additionalDetailsLabelValuePair.appendChild(valueDiv);
                additionalDetailsContainer.appendChild(additionalDetailsLabelValuePair);
            }
        };
        EventDetailsView.TooltipContentAttribute = "tooltipContent";
        return EventDetailsView;
    })(Common.Controls.TemplateControl);
    Common.EventDetailsView = EventDetailsView;

    var EventsTimelineListControl = (function (_super) {
        __extends(EventsTimelineListControl, _super);
        function EventsTimelineListControl(config, rootElement) {
            _super.call(this, rootElement);
            this._config = config;
            this._selectedItemVisibleIndex = -1;

            this.rootElement.tabIndex = 0;
            this.rootElement.addEventListener("keydown", this.onKeyDown.bind(this));

            this._panel = new Common.VirtualizingStackPanel(this.rootElement);
            this._panel.templateBinder = this;

            this._panel.itemContainerGenerator = new Common.ItemContainerGenerator();

            this.createEventDataTemplateCssRule();
            this._columnsCssRule = this.getColumnsCssRule();

            this._divider = new Common.Divider(this._panel.rootElement, this.eventNameColumnWidth);
            this._divider.onMoved = this.onResizeColumns.bind(this);

            this._verticalRulerLineElementsFactory = Common.ElementRecyclerFactory.forDivWithClass(this.rootElement, "verticalRulerLine");

            this.rootElement.setAttribute("aria-label", Plugin.Resources.getString("EventsTimelineAriaLabel"));

            this.invalidateSizeCache();
        }
        Object.defineProperty(EventsTimelineListControl.prototype, "dataColumnLeft", {
            get: function () {
                var columns = this._columnsCssRule.style.msGridColumns.split(' ');
                return parseInt(columns[0]) + parseInt(columns[1]);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "dataColumnWidth", {
            get: function () {
                if (this._dataColumnWidth === null) {
                    var panelScrollBarWidth = this._panel.rootElement.offsetWidth - this._panel.rootElement.clientWidth;
                    this._dataColumnWidth = this.rootElement.offsetWidth - this.dataColumnLeft - panelScrollBarWidth;
                }
                return this._dataColumnWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "dataSource", {
            get: function () {
                return this._dataSource;
            },
            enumerable: true,
            configurable: true
        });

        EventsTimelineListControl.prototype.setDataSource = function (value) {
            var _this = this;
            this.cancelPromise(this._setDatasourcePromise);

            if (this._dataSource !== value) {
                var selectionViewportOffset = 0;

                if (this._selectedItem && this._panel.itemContainerGenerator) {
                    var selectedItemContainer = this._panel.getItemContainerFromItem(this._selectedItem);
                    if (selectedItemContainer) {
                        selectionViewportOffset = this._panel.getScrollViewportOffset(selectedItemContainer);
                    }
                }

                this._dataSource = value;

                if (this._selectedItem) {
                    this._setDatasourcePromise = this.getVisibleIndexOfItem(this._selectedItem).then(function (selectedItemVisibleIndex) {
                        _this._selectedItemVisibleIndex = selectedItemVisibleIndex;
                        if (_this._selectedItemVisibleIndex < 0) {
                            return _this.setSelectedItem(null);
                        }
                        return Common.PromiseHelper.getPromiseSuccess();
                    }).then(function () {
                        if (!_this.selectedItem) {
                            return _this._panel.scrollToOffset(0, true);
                        } else {
                            return _this._panel.scrollToIndex(_this._selectedItemVisibleIndex, -selectionViewportOffset, true);
                        }
                    }).then(function () {
                        _this._panel.setDataSource(value);
                        _this._panel.invalidate();
                    });
                } else {
                    this._setDatasourcePromise = this._panel.scrollToOffset(0, true).then(function () {
                        _this._panel.setDataSource(value);
                        _this._panel.invalidate();
                    });
                }
            } else {
                this._setDatasourcePromise = Common.PromiseHelper.getPromiseSuccess();
            }
            return this._setDatasourcePromise;
        };

        Object.defineProperty(EventsTimelineListControl.prototype, "eventNameColumnWidth", {
            get: function () {
                var columns = this._columnsCssRule.style.msGridColumns.split(' ');
                return parseInt(columns[0]);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "offsetLeft", {
            get: function () {
                if (this._offsetLeft === null) {
                    this._offsetLeft = this.rootElement.offsetLeft;
                }
                return this._offsetLeft;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "offsetTop", {
            get: function () {
                if (this._offsetTop === null) {
                    this._offsetTop = this.rootElement.offsetTop;
                }
                return this._offsetTop;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "selectedItem", {
            get: function () {
                return this._selectedItem;
            },
            enumerable: true,
            configurable: true
        });

        EventsTimelineListControl.prototype.setSelectedItem = function (value) {
            var _this = this;
            if (this._setSelectedItemProcessing) {
                return Common.PromiseHelper.getPromiseError("cancelled");
            }

            Common.ProfilerCodeMarker.fire(26202 /* perfR2L_AllProfilerDetailsViewRowSelected */);

            if (this._selectedItem !== value || (this._selectedItem && value && this._selectedItem.id !== value.id)) {
                this._setSelectedItemProcessing = true;

                return this.getSelectedItemContainer().then(function (itemContainer) {
                    if (itemContainer)
                        itemContainer.isSelected = false;

                    _this._selectedItem = value;

                    if (_this._selectedItem) {
                        return _this.getVisibleIndexOfItem(_this._selectedItem);
                    } else {
                        _this._selectedItemVisibleIndex = -1;
                        return Common.PromiseHelper.getPromiseSuccess();
                    }
                }).then(function (selectedItemVisibleIndex) {
                    _this._selectedItemVisibleIndex = selectedItemVisibleIndex;

                    return _this.getSelectedItemContainer(true);
                }).then(function (itemContainer) {
                    if (itemContainer) {
                        _this.setItemContainerAreaLabel(itemContainer);
                        itemContainer.focus();
                    }

                    if (_this._selectedItemVisibleIndex >= 0) {
                        return _this._panel.ensureVisible(_this._selectedItemVisibleIndex);
                    }
                    return Common.PromiseHelper.getPromiseSuccess();
                }).then(function () {
                    if (_this.selectedItemChanged) {
                        _this.selectedItemChanged(_this._selectedItem);
                    }
                    _this._setSelectedItemProcessing = false;

                    Common.ProfilerCodeMarker.fire(26204 /* perfR2L_AllProfilerDetailsViewRowDetailsLoadComplete */);
                }, function (error) {
                    _this._setSelectedItemProcessing = false;
                    Common.ProfilerCodeMarker.fire(26207 /* perfR2L_AllProfilerDetailsViewRowDetailsLoadFailedOrCancelled */);
                    throw error;
                });
            }

            return Common.PromiseHelper.getPromiseSuccess();
        };

        Object.defineProperty(EventsTimelineListControl.prototype, "timeSpan", {
            set: function (value) {
                this._timeSpan = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "viewModel", {
            set: function (value) {
                this._viewModel = value;
            },
            enumerable: true,
            configurable: true
        });

        EventsTimelineListControl.prototype.bind = function (itemContainer, itemIndex) {
            var event = itemContainer.item;

            if (!itemContainer.template) {
                itemContainer.template = new EventDataTemplate(this._eventDataTemplateClassName, this._config.showDurationText);
                itemContainer.rootElement.tabIndex = -1;
                itemContainer.rootElement.appendChild(itemContainer.template.rootElement);
            }

            itemContainer.template.updateEvent(event, this._timeSpan, this.dataColumnWidth);

            if (event.hasChildren) {
                itemContainer.template.expansionToggledCallback = this.onExpansionToggled.bind(this, itemContainer, itemIndex);
            }

            itemContainer.clicked = this.onItemSelected.bind(this, itemContainer);

            itemContainer.isSelected = this._selectedItem && itemContainer.id === this._selectedItem.id;
        };

        EventsTimelineListControl.prototype.invalidateSizeCache = function () {
            this._dataColumnWidth = null;
            this._offsetLeft = null;
            this._offsetTop = null;

            this._panel.invalidateSizeCache();
        };

        EventsTimelineListControl.prototype.render = function () {
            return this.invalidate();
        };

        EventsTimelineListControl.prototype.renderVerticalRulerLines = function () {
            var positions = this._viewModel.getVerticalRulerLinePositions(this.dataColumnWidth);

            this._verticalRulerLineElementsFactory.start();

            for (var i = 0; i < positions.length; ++i) {
                var line = this._verticalRulerLineElementsFactory.getNext();

                var x = this.dataColumnWidth * positions[i] / 100 + this.dataColumnLeft;
                this.positionVerticalRulerLine(line, x);
            }

            this._verticalRulerLineElementsFactory.stop();
        };

        EventsTimelineListControl.prototype.unbind = function (itemContainer) {
            var template = itemContainer.template;
            if (template) {
                template.expansionToggledCallback = null;
            }

            itemContainer.clicked = null;
            itemContainer.rootElement.removeAttribute("aria-label");
        };

        EventsTimelineListControl.prototype.positionVerticalRulerLine = function (line, x) {
            line.style.left = x + "px";
        };

        EventsTimelineListControl.prototype.cancelPromise = function (promise) {
            if (promise) {
                promise.cancel();
            }
        };
        EventsTimelineListControl.prototype.getColumnsCssRule = function () {
            return EventsTimelineView.getCssRule(this._eventDataTemplateStyleSheetName, "." + this._eventDataTemplateClassName);
        };

        EventsTimelineListControl.prototype.createEventDataTemplateCssRule = function () {
            var baseTemplate = EventsTimelineView.getCssRule(EventsTimelineView.BaseStyleSheetName, ".eventDataTemplate");

            this._eventDataTemplateClassName = (baseTemplate.selectorText + this.rootElement.id).slice(1);

            var styleElement = document.createElement("style");
            this._eventDataTemplateStyleSheetName = this._eventDataTemplateClassName + "Css";
            styleElement.id = this._eventDataTemplateStyleSheetName;
            document.body.appendChild(styleElement);

            EventsTimelineView.addCssRule(this._eventDataTemplateStyleSheetName, this._eventDataTemplateClassName, baseTemplate.style.cssText);
        };

        EventsTimelineListControl.prototype.getItemContainerFromItem = function (item, scrollIfNeeded) {
            var _this = this;
            var itemContainer = this._panel.getItemContainerFromItem(item);
            var promise;
            if (!itemContainer && scrollIfNeeded) {
                promise = this.scrollToItem(item).then(function () {
                    itemContainer = _this._panel.getItemContainerFromItem(item);
                    if (itemContainer) {
                        return _this._panel.getItemContainerFromItem(item);
                    } else {
                        return null;
                    }
                });
            } else {
                promise = Common.PromiseHelper.getPromiseSuccess(itemContainer);
            }
            return promise;
        };

        EventsTimelineListControl.prototype.getSelectedItemContainer = function (scrollIfNeeded) {
            var promise;

            if (this.selectedItem) {
                promise = this.getItemContainerFromItem(this.selectedItem, scrollIfNeeded);
            } else {
                promise = Common.PromiseHelper.getPromiseSuccess(null);
            }

            return promise;
        };

        EventsTimelineListControl.prototype.getVisibleIndexOfItem = function (item) {
            return this._dataSource.indexOfInterval(item.id);
        };

        EventsTimelineListControl.prototype.invalidate = function () {
            var _this = this;
            this._panel.invalidate();
            return this._panel.render().then(function () {
                _this.updateDividerHeight();
            });
        };

        EventsTimelineListControl.prototype.onKeyDown = function (event) {
            var _this = this;
            var toBeHandled = false;

            switch (event.keyCode) {
                case 38 /* ArrowUp */:
                case 40 /* ArrowDown */:
                case 33 /* PageUp */:
                case 34 /* PageDown */:
                case 36 /* Home */:
                case 35 /* End */:
                case 39 /* ArrowRight */:
                case 37 /* ArrowLeft */:
                case 107 /* Plus */:
                case 109 /* Minus */: {
                    toBeHandled = true;
                    event.preventDefault();
                    event.stopPropagation();
                }
            }

            if (this._keyDownEventProcessing || !toBeHandled) {
                return;
            }

            this._keyDownEventProcessing = true;

            this.keyDownHandler(event).then(function () {
                _this._keyDownEventProcessing = false;
            }), (function () {
                _this._keyDownEventProcessing = false;
            });
        };
        EventsTimelineListControl.prototype.keyDownHandler = function (event) {
            var _this = this;
            switch (event.keyCode) {
                case 38 /* ArrowUp */:
                    if (this._selectedItemVisibleIndex < 0) {
                        return this.setSelectedItemVisibleIndex(0);
                    } else {
                        return this.selectPreviousItem();
                    }
                    break;

                case 40 /* ArrowDown */:
                    if (this._selectedItemVisibleIndex < 0) {
                        return this.setSelectedItemVisibleIndex(0);
                    } else {
                        return this.selectNextItem();
                    }
                    break;

                case 33 /* PageUp */:
                    return this.selectPageUp();
                    break;

                case 34 /* PageDown */:
                    return this.selectPageDown();
                    break;

                case 36 /* Home */:
                    return this.selectHome();
                    break;

                case 35 /* End */:
                    return this.selectEnd();
                    break;

                case 39 /* ArrowRight */:
                    return this.getSelectedItemContainer().then(function (selectedItemContainer) {
                        if (selectedItemContainer) {
                            if (!selectedItemContainer.template.expand() && selectedItemContainer.item.hasChildren) {
                                _this.selectNextItem();
                            }
                        }
                    });
                    break;

                case 37 /* ArrowLeft */:
                    return this.getSelectedItemContainer().then(function (selectedItemContainer) {
                        if (selectedItemContainer) {
                            if (!selectedItemContainer.template.collapse() && selectedItemContainer.item.level > 0) {
                                _this.selectPreviousItem();
                            }
                        }
                    });
                    break;

                case 107 /* Plus */:
                    return this.getSelectedItemContainer().then(function (selectedItemContainer) {
                        if (selectedItemContainer) {
                            selectedItemContainer.template.expand();
                        }
                    });
                    break;

                case 109 /* Minus */:
                    return this.getSelectedItemContainer().then(function (selectedItemContainer) {
                        if (selectedItemContainer) {
                            selectedItemContainer.template.collapse();
                        }
                    });
                    break;
            }
            return Common.PromiseHelper.getPromiseSuccess();
        };

        EventsTimelineListControl.prototype.onItemSelected = function (itemContainer) {
            var _this = this;
            if (this._itemClickProcessing) {
                return;
            }

            this._itemClickProcessing = true;
            this.setSelectedItem(itemContainer.item).then(function () {
                _this._itemClickProcessing = false;
                itemContainer.focus();
            }, function (error) {
                _this._itemClickProcessing = false;
            });
        };

        EventsTimelineListControl.prototype.onResizeColumns = function (offsetX) {
            this._dataColumnWidth = null;
            this.updateColumnWidth(offsetX);

            if (this.dataColumnWidthChanged) {
                this.dataColumnWidthChanged();
            }
        };

        EventsTimelineListControl.prototype.onExpansionToggled = function (itemContainer, itemIndex) {
            var _this = this;
            if (this._onExpansionToggledProcessing) {
                return Common.PromiseHelper.getPromiseSuccess();
            }

            Common.ProfilerCodeMarker.fire(26203 /* perfR2L_AllProfilerDetailsViewRowExpansionToggledStart */);
            var event = itemContainer.item;
            var expansionToggledHandler;

            this._onExpansionToggledProcessing = true;

            if (event.isExpanded)
                expansionToggledHandler = this._dataSource.collapseIntervalBranch(itemIndex);
            else
                expansionToggledHandler = this._dataSource.expandIntervalBranch(itemIndex);

            return expansionToggledHandler.then(function () {
                return _this.setSelectedItem(event);
            }).then(function () {
                return _this.invalidate();
            }).then(function () {
                return _this.getSelectedItemContainer();
            }).then(function (selectedItemContainer) {
                if (selectedItemContainer) {
                    selectedItemContainer.focus();
                }
                _this._onExpansionToggledProcessing = false;

                Common.ProfilerCodeMarker.fire(26206 /* perfR2L_AllProfilerDetailsViewRowExpansionToggledComplete */);
            }, function (error) {
                _this._onExpansionToggledProcessing = false;

                Common.ProfilerCodeMarker.fire(26209 /* perfR2L_AllProfilerDetailsViewRowExpansionToggledFailed */);
                throw error;
            });
        };

        EventsTimelineListControl.prototype.scrollToItem = function (item) {
            var _this = this;
            return this.getVisibleIndexOfItem(item).then(function (visibleIndex) {
                if (visibleIndex >= 0) {
                    return _this._panel.ensureVisible(visibleIndex);
                }
                return Common.PromiseHelper.getPromiseSuccess();
            });
        };

        EventsTimelineListControl.prototype.selectEnd = function () {
            if (this._selectedItemVisibleIndex < 0) {
                return Common.PromiseHelper.getPromiseSuccess();
            }
            return this.setSelectedItemVisibleIndex(this._panel.itemsCount - 1);
        };

        EventsTimelineListControl.prototype.selectHome = function () {
            if (this._selectedItemVisibleIndex < 0) {
                return Common.PromiseHelper.getPromiseSuccess();
            }
            return this.setSelectedItemVisibleIndex(0);
        };

        EventsTimelineListControl.prototype.selectPreviousItem = function () {
            if (this._selectedItemVisibleIndex < 0) {
                return Common.PromiseHelper.getPromiseSuccess();
            }
            return this.setSelectedItemVisibleIndex(this._selectedItemVisibleIndex - 1);
        };

        EventsTimelineListControl.prototype.selectPageDown = function () {
            if (this._selectedItemVisibleIndex < 0) {
                return Common.PromiseHelper.getPromiseSuccess();
            }
            return this.setSelectedItemVisibleIndex(this._selectedItemVisibleIndex + this._panel.viewportItemsCount);
        };

        EventsTimelineListControl.prototype.selectPageUp = function () {
            if (this._selectedItemVisibleIndex < 0) {
                return Common.PromiseHelper.getPromiseSuccess();
            }
            return this.setSelectedItemVisibleIndex(this._selectedItemVisibleIndex - this._panel.viewportItemsCount);
        };

        EventsTimelineListControl.prototype.selectNextItem = function () {
            if (this._selectedItemVisibleIndex < 0) {
                return Common.PromiseHelper.getPromiseSuccess();
            }
            return this.setSelectedItemVisibleIndex(this._selectedItemVisibleIndex + 1);
        };

        EventsTimelineListControl.prototype.setItemContainerAreaLabel = function (itemContainer) {
            if (itemContainer) {
                var event = itemContainer.item;

                if (event) {
                    var ariaLabel = event.name;
                    ariaLabel += " , " + Plugin.Resources.getString("DescriptionLabel") + ": " + event.getDescription();

                    var additionalInfo = this._viewModel.getEventDetails(event);
                    for (var i = 0; i < additionalInfo.length; i++) {
                        ariaLabel += " , " + additionalInfo[i].localizedName + ": " + additionalInfo[i].localizedValue;
                    }

                    itemContainer.rootElement.setAttribute("aria-label", ariaLabel);
                } else {
                    itemContainer.rootElement.removeAttribute("aria-label");
                }
            }
        };

        EventsTimelineListControl.prototype.setSelectedItemVisibleIndex = function (newVisibleIndex) {
            var _this = this;
            if (this._setSelectedItemVisibleIndexProcessing) {
                return Common.PromiseHelper.getPromiseSuccess();
            }

            var totalVisibleCount;
            var itemContainer;

            this._setSelectedItemVisibleIndexProcessing = true;

            totalVisibleCount = this._panel.itemsCount;
            if (newVisibleIndex < 0)
                newVisibleIndex = 0;
            if (newVisibleIndex >= totalVisibleCount)
                newVisibleIndex = totalVisibleCount - 1;
            if (this._selectedItemVisibleIndex >= 0 && this._selectedItemVisibleIndex === newVisibleIndex) {
                return this.getSelectedItemContainer().then(function (itemContainer) {
                    _this._setSelectedItemVisibleIndexProcessing = false;
                    return itemContainer;
                }, function (error) {
                    _this._setSelectedItemVisibleIndexProcessing = false;
                    throw error;
                });
            } else {
                itemContainer = this._panel.getItemContainerFromIndex(newVisibleIndex);

                if (itemContainer) {
                    if (!itemContainer.rootElement.parentElement) {
                        this._panel.recycleItem(newVisibleIndex);
                    }

                    return this.setSelectedItem(itemContainer.item).then(function () {
                        _this._setSelectedItemVisibleIndexProcessing = false;
                    }, function (error) {
                        _this._setSelectedItemVisibleIndexProcessing = false;
                        throw error;
                    });
                } else {
                    return this._panel.ensureVisible(newVisibleIndex).then(function () {
                        var promise;
                        itemContainer = _this._panel.getItemContainerFromIndex(newVisibleIndex);
                        if (itemContainer) {
                            var item = itemContainer.item;

                            if (!itemContainer.rootElement.parentElement) {
                                _this._panel.recycleItem(newVisibleIndex);
                            }

                            promise = _this.setSelectedItem(item);
                        } else {
                            promise = Common.PromiseHelper.getPromiseSuccess();
                        }
                        return promise;
                    }).then(function () {
                        _this._setSelectedItemVisibleIndexProcessing = false;
                        return itemContainer;
                    }, function (error) {
                        _this._setSelectedItemVisibleIndexProcessing = false;
                        throw error;
                    });
                }
            }
        };

        EventsTimelineListControl.prototype.updateColumnWidth = function (offsetX) {
            if (offsetX === null || typeof offsetX === "undefined") {
                offsetX = this._divider.offsetX;
            }

            var columns = this._columnsCssRule.style.msGridColumns.split(' ');
            columns[0] = offsetX + "px";
            this._columnsCssRule.style.msGridColumns = columns.join(' ');
        };

        EventsTimelineListControl.prototype.updateDividerHeight = function () {
            var height = Math.max(this._panel.virtualHeight, this._panel.actualHeight);

            this._divider.height = height;
        };
        return EventsTimelineListControl;
    })(Common.Controls.Control);
    Common.EventsTimelineListControl = EventsTimelineListControl;

    var EventsTimelineViewConfig = (function () {
        function EventsTimelineViewConfig() {
            this.showEventDetails = true;
            this.showRuler = true;
            this.showDurationText = true;
            this.isSortable = false;
            this.eventHeaderLabel = "";
        }
        return EventsTimelineViewConfig;
    })();
    Common.EventsTimelineViewConfig = EventsTimelineViewConfig;

    var EventsTimelineView = (function (_super) {
        __extends(EventsTimelineView, _super);
        function EventsTimelineView(parentContainer, config) {
            _super.call(this);

            this.setTemplateFromHTML("<div id=\"timelineViewGroup\" class=\"timelineViewGroup\">" + "<div id=\"timelineSort\" class=\"timelineSort\">" + "<span id=\"timelineSortLabel\" class=\"timelineSortLabel\"></span>" + "<select id=\"timelineSortSelector\" class=\"timelineSortSelector\">" + "<option id=\"timelineSortStartTime\" value=\"0\"></option>" + "<option id=\"timelineSortDuration\" value=\"1\"></option>" + "</select>" + "</div>" + "<div id =\"timelineViewAndDetails\" class=\"timelineViewAndDetails\">" + "<div id =\"timelineEventHeaderLabel\" class=\"timelineEventHeaderLabel\"></div>" + "<div id =\"timelineEventHeaderDivider\" class=\"timelineEventHeaderDivider\"></div>" + "<div id =\"timelineRuler\" class=\"timelineRuler\"></div>" + "<div id =\"timelineView\" class=\"timelineView\"></div>" + "<div id =\"timelineDetailsPaneContainer\" class=\"timelineDetailsPaneContainer\"></div>" + "</div>" + "</div>");

            this._parentContainer = parentContainer;
            this._config = config;
            this._requestCount = 0;
            if (!this._parentContainer) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1009"));
            }
            this._timelineDetailsPaneContainer = this.findElement("timelineDetailsPaneContainer");
            if (!this._config.showEventDetails) {
                this._timelineDetailsPaneContainer.parentElement.removeChild(this._timelineDetailsPaneContainer);
                this._timelineDetailsPaneContainer = null;
            }

            if (this._config.isSortable) {
                this._timelineSortSelector = this.findElement("timelineSortSelector");
                var timelineSortLabel = this.findElement("timelineSortLabel");
                var timelineSortDuration = this.findElement("timelineSortDuration");
                var timelineSortStartTime = this.findElement("timelineSortStartTime");

                timelineSortLabel.innerText = "";
                timelineSortDuration.innerText = "";
                timelineSortStartTime.innerText = "";
                this._timelineSortSelector.addEventListener("change", this.onSortChanged.bind(this));
            } else {
                this._timelineSortSelector = null;
                var timelineSortControlContainer = this.findElement("timelineSort");
                timelineSortControlContainer.parentElement.removeChild(timelineSortControlContainer);
            }

            var timelineView = this.findElement("timelineView");
            this._listControl = new EventsTimelineListControl(this._config, timelineView);
            this._listControl.dataColumnWidthChanged = this.onListControlDataColumnWidthChanged.bind(this);

            this._parentContainer.appendChild(this.rootElement);

            this._onResizeHandler = this.onResize.bind(this);

            this.registerResizeEvent();

            this._eventHeaderDivider = this.findElement("timelineEventHeaderDivider");
            this._eventHeaderDivider.style.left = this._listControl.eventNameColumnWidth + "px";

            this._eventHeaderLabel = this.findElement("timelineEventHeaderLabel");
            this._eventHeaderLabel.innerText = this._config.eventHeaderLabel;
            this._eventHeaderLabel.style.width = this._listControl.eventNameColumnWidth + "px";

            if (this._config.showRuler) {
                this._rulerContainer = this.findElement("timelineRuler");
            } else {
                this._rulerContainer.parentElement.removeChild(this._rulerContainer);
                this._rulerContainer = null;
            }
        }
        Object.defineProperty(EventsTimelineView.prototype, "viewModel", {
            set: function (value) {
                this.unregisterViewModelEvents();
                this._viewModel = value;
                this.createRuler();

                if (this._listControl && this._listControl.selectedItem) {
                    this.updateDetailsPane(this._listControl.selectedItem);
                } else {
                    this.updateDetailsPane(null);
                }
                this.registerViewModelEvents();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineView.prototype, "timeSpan", {
            get: function () {
                if (this._viewModel) {
                    return this._viewModel.timeSpan;
                }
                return new Common.TimeSpan(new Common.TimeStamp(0), new Common.TimeStamp(0));
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineView.prototype, "granularity", {
            get: function () {
                if (this._listControl.dataColumnWidth > 0) {
                    var totalUnits = (this._listControl.dataColumnWidth / EventDataTemplate.MinBarWidth);
                    return Common.TimeStamp.fromNanoseconds(this.timeSpan.elapsed.nsec / totalUnits);
                } else {
                    return Common.TimeStamp.fromNanoseconds(this.timeSpan.elapsed.nsec);
                }
            },
            enumerable: true,
            configurable: true
        });

        EventsTimelineView.prototype.render = function () {
            var _this = this;
            if (this._viewModel) {
                this._viewModel.sort = this._config.isSortable ? parseInt(this._timelineSortSelector.value) : 0;

                if (this._requestCount > 0) {
                    clearTimeout(this._timerIdForRenderingListControl);
                    this._timerIdForRenderingListControl = setTimeout(function () {
                        _this._requestCount++;
                        _this.renderAsync();
                    }, EventsTimelineView._renderDelay);
                } else {
                    clearTimeout(this._timerIdForRenderingListControl);
                    this._requestCount++;
                    this.renderAsync();
                }
            }
        };

        EventsTimelineView.prototype.renderAsync = function () {
            var _this = this;
            if (this._renderPromise) {
                this._renderPromise.cancel();
            }

            this._renderPromise = this._viewModel.getEvents(this.granularity).then(function (dataSource) {
                _this._requestCount--;

                _this._listControl.invalidateSizeCache();

                _this._listControl.timeSpan = _this.timeSpan;
                _this._listControl.viewModel = _this._viewModel;
                _this.renderRuler();
                return _this._listControl.setDataSource(dataSource);
            }, function (error) {
                _this._requestCount--;
                throw error;
            }).then(function () {
                _this._listControl.selectedItemChanged = _this.onSelectedEventChanged.bind(_this);
                return _this._listControl.render();
            }).then(function () {
                Common.ProfilerCodeMarker.fire(26205 /* perfR2L_AllProfilerDetailsViewLoadComplete */);
            }, function (error) {
                Common.ProfilerCodeMarker.fire(26208 /* perfR2L_AllProfilerDetailsViewLoadFailedOrCancelled */);
                throw error;
            });
        };

        EventsTimelineView.prototype.onResize = function () {
            if (this._viewModel) {
                if (this._viewModel.fetchDataOnGranularityChange) {
                    if (this._listControl) {
                        this._listControl.invalidateSizeCache();
                    }

                    if (!this._listControl.viewModel) {
                        this._listControl.viewModel = this._viewModel;
                    }
                    this.renderRuler();
                }

                this.render();
            }
        };
        EventsTimelineView.prototype.renderRuler = function () {
            if (!this._config.showRuler) {
                return;
            }

            this.setRulerRect();
            this.updateRulerTimeRange(this.timeSpan);
            this._rulerScale.render();

            this._listControl.renderVerticalRulerLines();
        };

        EventsTimelineView.prototype.updateRulerTimeRange = function (timeSpan) {
            if (!this._config.showRuler) {
                return;
            }
            this._rulerScale.setTimeRange(new DiagnosticsHub.JsonTimespan(Common.TimestampConvertor.timestampToJson(timeSpan.begin), Common.TimestampConvertor.timestampToJson(timeSpan.end)));
        };

        EventsTimelineView.prototype.createRuler = function () {
            var _this = this;
            if (!this._config.showRuler) {
                return;
            }
            if (this._gettingMarksPromise) {
                this._gettingMarksPromise.cancel();
                this._gettingMarksPromise = null;
            }

            var lifecycleData = [];
            var userMarkData = [];

            if (this._rulerScale) {
                this._rulerScale.deinitialize();
            }

            this._rulerScale = new DiagnosticsHub.RulerScale({
                containerId: this._rulerContainer.id,
                timeRange: new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.convertFromNumber(this._viewModel.timeSpan.begin.nsec), DiagnosticsHub.BigNumber.convertFromNumber(this._viewModel.timeSpan.end.nsec)),
                series: []
            });

            var lifecycleMarksPromise = this._viewModel.getMarks(1 /* LifeCycleEvent */).then(function (lifecycleMarks) {
                lifecycleData = lifecycleMarks;
            });

            var userMarksPromise = this._viewModel.getMarks(2 /* UserMark */).then(function (userMarks) {
                userMarkData = userMarks;
            });

            var imageTokenList = [];
            imageTokenList[1 /* LifeCycleEvent */] = "vs-image-graph-app-event";
            imageTokenList[2 /* UserMark */] = "vs-image-graph-user-mark";

            this._gettingMarksPromise = Plugin.Promise.join([lifecycleMarksPromise, userMarksPromise]).then(function () {
                _this._rulerScale = new DiagnosticsHub.RulerScale({
                    id: "",
                    className: "",
                    containerId: _this._rulerContainer.id,
                    timeRange: new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.convertFromNumber(_this._viewModel.timeSpan.begin.nsec), DiagnosticsHub.BigNumber.convertFromNumber(_this._viewModel.timeSpan.end.nsec)),
                    series: [
                        { index: 1 /* LifeCycleEvent */, id: 1 /* LifeCycleEvent */, label: Plugin.Resources.getString("RulerLifecycleMarkLabel"), data: lifecycleData },
                        { index: 2 /* UserMark */, id: 2 /* UserMark */, label: Plugin.Resources.getString("RulerUserMarkLabel"), data: userMarkData }
                    ],
                    aggregatedImageToken: "vs-image-graph-aggregated-event",
                    imageTokenList: imageTokenList
                });

                _this.setRulerRect();
                _this._rulerScale.render();
            });

            this._gettingMarksPromise.done(function () {
                _this._gettingMarksPromise = null;
            });
        };

        EventsTimelineView.prototype.onSelectedEventChanged = function (event) {
            this._viewModel.selectedEvent = event;
        };

        EventsTimelineView.prototype.onListControlDataColumnWidthChanged = function () {
            this._eventHeaderDivider.style.left = this._listControl.eventNameColumnWidth + "px";
            this._eventHeaderLabel.style.width = this._listControl.eventNameColumnWidth + "px";

            if (this._viewModel && this._viewModel.fetchDataOnGranularityChange) {
                this.renderRuler();
                this.render();
            } else {
                this.renderRuler();
            }
        };

        EventsTimelineView.prototype.onSortChanged = function (e) {
            this.render();
        };

        EventsTimelineView.prototype.onTimeSpanChanged = function () {
            this.render();
        };

        EventsTimelineView.prototype.registerResizeEvent = function () {
            Common.Program.addEventListener(Common.ProgramEvents.Resize, this._onResizeHandler);
        };

        EventsTimelineView.prototype.registerViewModelEvents = function () {
            if (this._viewModel) {
                this._viewModel.timeSpanChanged = this.onTimeSpanChanged.bind(this);
                this._viewModel.selectedEventChanged = this.updateDetailsPane.bind(this);
            }
        };

        EventsTimelineView.prototype.setRulerRect = function () {
            if (!this._config.showRuler) {
                return;
            }
            this._rulerContainer.style.marginLeft = this._listControl.dataColumnLeft + "px";
            this._rulerContainer.style.width = this._listControl.dataColumnWidth + "px";

            this._rulerScale.invalidateSizeCache();
        };

        EventsTimelineView.prototype.updateDetailsPane = function (event) {
            if (!this._config.showEventDetails) {
                return;
            }
            var detailsView;

            if (event === null) {
                detailsView = new EventDetailsView(null, null);
            } else {
                var details = this._viewModel.getEventDetails(event);
                detailsView = new EventDetailsView(event, details);
            }

            this._timelineDetailsPaneContainer.innerHTML = "";
            this._timelineDetailsPaneContainer.appendChild(detailsView.rootElement);
        };

        EventsTimelineView.prototype.unregisterViewModelEvents = function () {
            if (this._viewModel) {
                this._viewModel.timeSpanChanged = null;
                this._viewModel.selectedEventChanged = null;
            }
        };

        EventsTimelineView.getCssRule = function (styleSheetName, selectorName) {
            var styleSheet = document.styleSheets[styleSheetName];

            if (styleSheet) {
                var styleSheetRulesLength = styleSheet.rules.length;
                for (var i = 0; i < styleSheetRulesLength; ++i) {
                    var rule = styleSheet.rules[i];

                    if (rule && rule.selectorText === selectorName) {
                        return rule;
                    }
                }
            }

            return null;
        };

        EventsTimelineView.addCssRule = function (StyleSheetName, cssName, style) {
            var styleSheet = document.styleSheets[StyleSheetName];
            styleSheet.addRule("." + cssName, style);
        };
        EventsTimelineView.showTooltip = function (resourceId) {
            var config = {
                content: Plugin.Resources.getString(resourceId)
            };
            Plugin.Tooltip.show(config);
        };
        EventsTimelineView._renderDelay = 20;

        EventsTimelineView.BaseStyleSheetName = "GanttChart.css";
        return EventsTimelineView;
    })(Common.Controls.TemplateControl);
    Common.EventsTimelineView = EventsTimelineView;
})(Common || (Common = {}));
var Common;
(function (Common) {
    (function (Data) {
        (function (CostQueryResultType) {
            CostQueryResultType[CostQueryResultType["GET_TIME_RANGE"] = 7] = "GET_TIME_RANGE";
        })(Data.CostQueryResultType || (Data.CostQueryResultType = {}));
        var CostQueryResultType = Data.CostQueryResultType;

        var EventCostQueryResult = (function (_super) {
            __extends(EventCostQueryResult, _super);
            function EventCostQueryResult(resultObject) {
                _super.call(this, resultObject);
                this._timeRange = new Common.TimeSpan(new Common.TimeStamp(0), new Common.TimeStamp(0));
            }
            EventCostQueryResult.prototype.getTimeRange = function () {
                var requestObject = {
                    task: 7 /* GET_TIME_RANGE */
                };

                return this.submitRequest(requestObject);
            };
            return EventCostQueryResult;
        })(Common.Data.EventQueryResult);
        Data.EventCostQueryResult = EventCostQueryResult;
    })(Common.Data || (Common.Data = {}));
    var Data = Common.Data;
})(Common || (Common = {}));
var Common;
(function (Common) {
    var EventsCostDataSource = (function (_super) {
        __extends(EventsCostDataSource, _super);
        function EventsCostDataSource(eventsFactory) {
            _super.call(this, eventsFactory);
        }
        EventsCostDataSource.prototype.initialize = function (queryResult) {
            var _this = this;
            return _super.prototype.initialize.call(this, queryResult).then((function () {
                return queryResult.getTimeRange();
            }).bind(this)).then((function (timeRange) {
                _this._timeRange = new Common.TimeSpan(Common.TimestampConvertor.jsonToTimeStamp(timeRange.StartTime), Common.TimestampConvertor.jsonToTimeStamp(timeRange.EndTime));
            }).bind(this));
        };

        Object.defineProperty(EventsCostDataSource.prototype, "costTimeSpan", {
            get: function () {
                var timeRangeConsidered = new Common.TimeSpan(this._timeRange.begin, new Common.TimeStamp(this._timeRange.end.nsec * 1.75));
                return timeRangeConsidered;
            },
            enumerable: true,
            configurable: true
        });
        return EventsCostDataSource;
    })(Common.EventsTimelineDataSource);
    Common.EventsCostDataSource = EventsCostDataSource;

    var EventsCostComparisonModel = (function (_super) {
        __extends(EventsCostComparisonModel, _super);
        function EventsCostComparisonModel(session, eventFactory) {
            _super.call(this, session, eventFactory);
        }
        EventsCostComparisonModel.prototype.getDataSource = function (queryResult, eventFactory) {
            var _this = this;
            var dataSource = new EventsCostDataSource(eventFactory);
            return dataSource.initialize(queryResult).then((function () {
                _this._dataSource = dataSource;
                return _this._dataSource;
            }).bind(this));
        };

        Object.defineProperty(EventsCostComparisonModel.prototype, "costTimeSpan", {
            get: function () {
                if (this._dataSource) {
                    return this._dataSource.costTimeSpan;
                }
                return new Common.TimeSpan(new Common.TimeStamp(0), new Common.TimeStamp(0));
            },
            enumerable: true,
            configurable: true
        });
        return EventsCostComparisonModel;
    })(Common.EventsTimelineModel);
    Common.EventsCostComparisonModel = EventsCostComparisonModel;

    var EventsCostComparisonViewModel = (function (_super) {
        __extends(EventsCostComparisonViewModel, _super);
        function EventsCostComparisonViewModel(model, sessionDuration) {
            _super.call(this, model, sessionDuration, null);
            this._model = model;
        }
        Object.defineProperty(EventsCostComparisonViewModel.prototype, "costTimeSpan", {
            get: function () {
                return this._model.costTimeSpan;
            },
            enumerable: true,
            configurable: true
        });

        EventsCostComparisonViewModel.prototype.getVerticalRulerLinePositions = function (viewWidth) {
            return [];
        };
        return EventsCostComparisonViewModel;
    })(Common.EventsTimelineViewModel);
    Common.EventsCostComparisonViewModel = EventsCostComparisonViewModel;

    var EventsCostComparisonView = (function (_super) {
        __extends(EventsCostComparisonView, _super);
        function EventsCostComparisonView(parentContainer, config) {
            _super.call(this, parentContainer, config);
        }
        Object.defineProperty(EventsCostComparisonView.prototype, "eventsCostComparisonViewModel", {
            set: function (value) {
                this._viewModel = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsCostComparisonView.prototype, "timeSpan", {
            get: function () {
                if (this._viewModel) {
                    return this._viewModel.costTimeSpan;
                }
                return new Common.TimeSpan(new Common.TimeStamp(0), new Common.TimeStamp(0));
            },
            enumerable: true,
            configurable: true
        });
        return EventsCostComparisonView;
    })(Common.EventsTimelineView);
    Common.EventsCostComparisonView = EventsCostComparisonView;
})(Common || (Common = {}));
//# sourceMappingURL=UIControls.js.map

// SIG // Begin signature block
// SIG // MIIamwYJKoZIhvcNAQcCoIIajDCCGogCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFMkd8qYGYhIH
// SIG // pwHbIhqtEnL4xqUEoIIVejCCBLswggOjoAMCAQICEzMA
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
// SIG // E6P9MYIEjTCCBIkCAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBpjAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUafmcg8L4Y1ZDhXZkRi6d
// SIG // JknRlygwRgYKKwYBBAGCNwIBDDE4MDagHIAaAFUASQBD
// SIG // AG8AbgB0AHIAbwBsAHMALgBqAHOhFoAUaHR0cDovL21p
// SIG // Y3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAEggEAG+A/
// SIG // 9ISxKLDsM1W7usRLCn6ibuvG0Ug2YQHI3+pqLto/KFLo
// SIG // MBvEApra0GgmnVrSzsZ4ECd1uPj+VD7SkfX9kHVGQZYP
// SIG // vLza2JVpVngxEu/txCx+nMeRR8Tz/IpQbngQmdPK8ZrH
// SIG // wuxHpw7ly9LMNMWw4cjH4E7bpDyhJsMxzB0q4mjb7nwT
// SIG // R8lywCOhlU7dHgdBnXAIK2PmwUZzgBJa/P9ghuMv4rUC
// SIG // qAMU/knPvsJfch5DbpsRs6ijEg81aT/tmJdQMqo/eYKA
// SIG // rqZNTu0qwHX5hzluMNtSbEHDTqDZqewoQIpMT9wPgoOk
// SIG // vRxzNbknNpzOULluDLS1dY0XCBZL46GCAigwggIkBgkq
// SIG // hkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQswCQYDVQQG
// SIG // EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
// SIG // BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
// SIG // cnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGlt
// SIG // ZS1TdGFtcCBQQ0ECEzMAAABZ1nPNUY7wIsUAAAAAAFkw
// SIG // CQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG
// SIG // 9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0MDcyMzA5MDc1
// SIG // MlowIwYJKoZIhvcNAQkEMRYEFM25vyDG2YeEqqCQtqaL
// SIG // qqYG8Q7EMA0GCSqGSIb3DQEBBQUABIIBACFDqJv8f86h
// SIG // vtriUt92TAvu1rf1GER5EXVFY6x2OFDpKNK3o2ESKTHv
// SIG // M5n1bqZcnmoW5MAcmM24nHz5y8OBsmBsr24v7LZ+Uld4
// SIG // cRdaw7Dib5eij+LBCa4MsiE3xCu3w1CEADCOmQtTJsq5
// SIG // hTbkF6UkXqZI/9HqHlnEiU2+a6Q58GxkCEzgWQ45dW1t
// SIG // jXOIjvmsS7l209fNU36fO+GLli7Ap9AsarRrqEo7Gq8i
// SIG // VuEt1IX4+D/yx/imDT8eqy5Yg8qD/BUo0k3B46BcPgUI
// SIG // GzLCT7BHZQMvGZ4uHzOjlgRfoqXR92xdyFMv96OtJC6J
// SIG // Xs2W7SwNAsRC5b/fJ8pOpRk=
// SIG // End signature block
