//
// Copyright (C) Microsoft. All rights reserved.
//
// <!-- saved from url=(0016)http://localhost -->
// assert.ts
var F12;
(function (F12) {
    (function (Tools) {
        (function (Utility) {
            "use strict";

            var Assert = (function () {
                function Assert() {
                }
                Assert.isTrue = function (condition, message) {
                    if (!condition) {
                        message = message ? "Internal error. " + message : "Internal error. Unexpectedly false.";
                        Assert.fail(message);
                    }
                };

                Assert.isFalse = function (condition, message) {
                    if (condition) {
                        message = message ? "Internal error. " + message : "Internal error. Unexpectedly true.";
                        Assert.fail(message);
                    }
                };

                Assert.isNull = function (value, message) {
                    if (value !== null) {
                        message = message ? "Internal error. " + message : "Internal error. Unexpectedly not null.";
                        message += " '" + value + "'";
                        Assert.fail(message);
                    }
                };

                Assert.isUndefined = function (value, message) {
                    if (undefined !== void 0) {
                        message = "Internal error. Unexpectedly undefined has been redefined.";
                        message += " '" + undefined + "'";
                        Assert.fail(message);
                    }

                    if (value !== undefined) {
                        message = message ? "Internal error. " + message : "Internal error. Unexpectedly not undefined.";
                        message += " '" + value + "'";
                        Assert.fail(message);
                    }
                };

                Assert.hasValue = function (value, message) {
                    if (undefined !== void 0) {
                        message = "Internal error. Unexpectedly undefined has been redefined.";
                        message += " '" + undefined + "'";
                        Assert.fail(message);
                    }

                    if (value === null || value === undefined) {
                        message = message ? "Internal error. " + message : ("Internal error. Unexpectedly " + (value === null ? "null" : "undefined") + ".");
                        Assert.fail(message);
                    }
                };

                Assert.areEqual = function (value1, value2, message) {
                    if (value1 !== value2) {
                        message = message ? "Internal error. " + message : "Internal error. Unexpectedly not equal.";
                        message += " '" + value1 + "' !== '" + value2 + "'.";
                        Assert.fail(message);
                    }
                };

                Assert.areNotEqual = function (value1, value2, message) {
                    if (value1 === value2) {
                        message = message ? "Internal error. " + message : "Internal error. Unexpectedly equal.";
                        message += " '" + value1 + "' === '" + value2 + "'.";
                        Assert.fail(message);
                    }
                };

                Assert.fail = function (message) {
                    var error = new Error((message || "Assert failed.") + "\n");

                    try  {
                        throw error;
                    } catch (ex) {
                        if (Common && Common.ErrorHandling) {
                            Common.ErrorHandling.reportErrorGivenStack(ex);
                        }

                        throw ex;
                    }
                };

                Assert.failDebugOnly = function (message) {
                    if (isDebugBuild) {
                        Assert.fail(message);
                    }
                };
                return Assert;
            })();
            Utility.Assert = Assert;
        })(Tools.Utility || (Tools.Utility = {}));
        var Utility = Tools.Utility;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/assert.js.map

// IControl.ts
var Common;
(function (Common) {
    "use strict";

    

    
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/IControl.js.map

// EventSource.ts
var Common;
(function (Common) {
    "use strict";

    var EventSource = (function () {
        function EventSource() {
            this._handlers = null;
            this._eventsRunning = 0;
        }
        EventSource.prototype.addHandler = function (handler) {
            var _this = this;
            F12.Tools.Utility.Assert.isTrue(typeof handler === "function", "handler must be function");

            if (!this._handlers) {
                this._handlers = [];
            }

            this._handlers.push(handler);
            return { unregister: function () {
                    return _this.removeHandler(handler);
                } };
        };

        EventSource.prototype.addOne = function (handler) {
            var registration = this.addHandler(function (args) {
                registration.unregister();
                handler(args);
            });
            return registration;
        };

        EventSource.prototype.removeHandler = function (handler) {
            F12.Tools.Utility.Assert.hasValue(this._handlers && this._handlers.length, "Shouldn't call remove before add");
            var i = this._handlers.length;
            while (i--) {
                if (this._handlers[i] === handler) {
                    if (this._eventsRunning > 0) {
                        this._handlers[i] = null;
                    } else {
                        this._handlers.splice(i, 1);
                    }

                    return;
                }
            }

            F12.Tools.Utility.Assert.fail("Called remove on a handler which wasn't added");
        };

        EventSource.prototype.invoke = function (args) {
            if (this._handlers) {
                this._eventsRunning++;

                for (var i = 0; i < this._handlers.length; i++) {
                    this._handlers[i] && this._handlers[i](args);
                }

                this._eventsRunning--;
                if (this._eventsRunning === 0) {
                    this.cleanupNullHandlers();
                }
            }
        };

        EventSource.prototype.invokeAsync = function (args) {
            if (this._handlers) {
                this._eventsRunning++;
                var promises = [];

                for (var i = 0; i < this._handlers.length; i++) {
                    var promise = this._handlers[i] && this._handlers[i](args);
                    if (promise && promise.then) {
                        promises.push(promise);
                    }
                }

                this._eventsRunning--;
                if (this._eventsRunning === 0) {
                    this.cleanupNullHandlers();
                }

                return Plugin.Promise.join(promises);
            }

            return Plugin.Promise.wrap(null);
        };

        EventSource.prototype.cleanupNullHandlers = function () {
            for (var i = this._handlers.length - 1; i >= 0; i--) {
                if (!this._handlers[i]) {
                    this._handlers.splice(i, 1);
                }
            }
        };
        return EventSource;
    })();
    Common.EventSource = EventSource;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/EventSource.js.map

// IEventRegistration.ts
var Common;
(function (Common) {
    "use strict";

    
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/IEventRegistration.js.map

// IEventHandler.ts
var Common;
(function (Common) {
    "use strict";

    
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/IEventHandler.js.map

// ObservableCollection.ts
var Common;
(function (Common) {
    "use strict";

    var ObservableCollection = (function () {
        function ObservableCollection(list) {
            if (typeof list === "undefined") { list = []; }
            this._list = list.slice(0);
            this.propertyChanged = new Common.EventSource();
            this.collectionChanged = new Common.EventSource();
        }
        Object.defineProperty(ObservableCollection.prototype, "length", {
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });

        ObservableCollection.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                items[_i] = arguments[_i + 0];
            }
            var insertionIndex = this._list.length;
            var newLength = Array.prototype.push.apply(this._list, items);

            this.propertyChanged.invoke(ObservableCollection.LengthProperty);
            this.invokeCollectionChanged(0 /* Add */, items, insertionIndex);
            return newLength;
        };

        ObservableCollection.prototype.pop = function () {
            var oldItem = this._list.pop();

            this.propertyChanged.invoke(ObservableCollection.LengthProperty);
            this.invokeCollectionChanged(1 /* Remove */, null, null, [oldItem], this._list.length);
            return oldItem;
        };

        ObservableCollection.prototype.splice = function (index, removeCount) {
            var items = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                items[_i] = arguments[_i + 2];
            }
            var args = [index, removeCount];
            if (items) {
                Array.prototype.push.apply(args, items);
            }

            var removedItems = Array.prototype.splice.apply(this._list, args);

            var itemsRemoved = removedItems.length > 0;
            var itemsAdded = items && items.length > 0;

            if (itemsRemoved || itemsAdded) {
                this.propertyChanged.invoke(ObservableCollection.LengthProperty);

                if (itemsRemoved) {
                    this.invokeCollectionChanged(1 /* Remove */, null, null, removedItems, index);
                }

                if (itemsAdded) {
                    this.invokeCollectionChanged(0 /* Add */, items, index, null, null);
                }
            }

            return removedItems;
        };

        ObservableCollection.prototype.indexOf = function (searchElement, fromIndex) {
            return this._list.indexOf(searchElement, fromIndex);
        };

        ObservableCollection.prototype.lastIndexOf = function (searchElement, fromIndex) {
            if (typeof fromIndex === "undefined") { fromIndex = -1; }
            return this._list.lastIndexOf(searchElement, fromIndex);
        };

        ObservableCollection.prototype.clear = function () {
            this._list = [];

            this.propertyChanged.invoke(ObservableCollection.LengthProperty);
            this.invokeCollectionChanged(3 /* Clear */);
        };

        ObservableCollection.prototype.filter = function (callbackfn, thisArg) {
            return this._list.filter(callbackfn, thisArg);
        };

        ObservableCollection.prototype.map = function (callbackfn, thisArg) {
            return this._list.map(callbackfn, thisArg);
        };

        ObservableCollection.prototype.getItem = function (index) {
            return this._list[index];
        };

        ObservableCollection.prototype.resetItems = function (items) {
            this._list = [];
            var newLength = Array.prototype.push.apply(this._list, items);

            this.propertyChanged.invoke(ObservableCollection.LengthProperty);
            this.invokeCollectionChanged(2 /* Reset */);
            return newLength;
        };

        ObservableCollection.prototype.invokeCollectionChanged = function (action, newItems, newStartingIndex, oldItems, oldStartingIndex) {
            var event = {
                action: action,
                newItems: newItems,
                newStartingIndex: newStartingIndex,
                oldItems: oldItems,
                oldStartingIndex: oldStartingIndex
            };
            this.collectionChanged.invoke(event);
        };
        ObservableCollection.LengthProperty = "length";
        return ObservableCollection;
    })();
    Common.ObservableCollection = ObservableCollection;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Model/ObservableCollection.js.map

// Observable.ts
var Common;
(function (Common) {
    "use strict";

    var Observable = (function () {
        function Observable() {
            this.propertyChanged = new Common.EventSource();
        }
        Observable.fromObject = function (obj) {
            if (typeof obj.propertyChanged !== "undefined") {
                return obj;
            }

            var returnValue = new Observable();
            var backingData = {};
            Object.defineProperties(returnValue, ObservableHelpers.expandProperties(obj, backingData, returnValue));
            returnValue["_backingData"] = backingData;
            return returnValue;
        };
        return Observable;
    })();
    Common.Observable = Observable;

    var ObservableHelpers = (function () {
        function ObservableHelpers() {
        }
        ObservableHelpers.defineProperty = function (classToExtend, propertyName, defaultValue, onChanged, onChanging) {
            var backingFieldName = "_" + propertyName;

            Object.defineProperty(classToExtend.prototype, propertyName, {
                get: function () {
                    if (typeof this[backingFieldName] === "undefined") {
                        this[backingFieldName] = defaultValue;
                    }

                    return this[backingFieldName];
                },
                set: function (newValue) {
                    var oldValue = this[backingFieldName];
                    if (newValue !== oldValue) {
                        if (onChanging) {
                            onChanging(this, oldValue, newValue);
                        }

                        this[backingFieldName] = newValue;

                        var observable = this;
                        observable.propertyChanged.invoke(propertyName);

                        if (onChanged) {
                            onChanged(this, oldValue, newValue);
                        }
                    }
                }
            });
        };

        ObservableHelpers.describePropertyForObjectShape = function (propertyName, objectShape, backingDataStore, invokableObserver) {
            var returnValue = {
                get: function () {
                    return backingDataStore[propertyName];
                },
                enumerable: true
            };

            var propertyValue = objectShape[propertyName];
            if (typeof propertyValue === "object") {
                backingDataStore[propertyName] = Observable.fromObject(propertyValue);

                returnValue.set = function (value) {
                    if (value !== backingDataStore[propertyName]) {
                        backingDataStore[propertyName] = Observable.fromObject(value);
                        invokableObserver.propertyChanged.invoke(propertyName);
                    }
                };
            } else {
                backingDataStore[propertyName] = propertyValue;

                returnValue.set = function (value) {
                    if (value !== backingDataStore[propertyName]) {
                        backingDataStore[propertyName] = value;
                        invokableObserver.propertyChanged.invoke(propertyName);
                    }
                };
            }

            return returnValue;
        };

        ObservableHelpers.expandProperties = function (objectShape, backingDataStore, invokableObserver) {
            var properties = {};

            for (var propertyName in objectShape) {
                properties[propertyName] = ObservableHelpers.describePropertyForObjectShape(propertyName, objectShape, backingDataStore, invokableObserver);
            }

            return properties;
        };
        return ObservableHelpers;
    })();
    Common.ObservableHelpers = ObservableHelpers;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Model/Observable.js.map

// IObservable.ts
var Common;
(function (Common) {
    "use strict";

    

    

    
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Model/IObservable.js.map

// CollectionChangedAction.ts
var Common;
(function (Common) {
    "use strict";

    (function (CollectionChangedAction) {
        CollectionChangedAction[CollectionChangedAction["Add"] = 0] = "Add";
        CollectionChangedAction[CollectionChangedAction["Remove"] = 1] = "Remove";
        CollectionChangedAction[CollectionChangedAction["Reset"] = 2] = "Reset";
        CollectionChangedAction[CollectionChangedAction["Clear"] = 3] = "Clear";
    })(Common.CollectionChangedAction || (Common.CollectionChangedAction = {}));
    var CollectionChangedAction = Common.CollectionChangedAction;
    ;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Model/CollectionChangedAction.js.map

// Binding.ts
var Common;
(function (Common) {
    "use strict";

    

    Common.targetAccessViaProperty = {
        getValue: function (target, prop) {
            return target[prop];
        },
        isValueSupported: function (value, isConverter) {
            return value !== undefined && (isConverter || value !== null);
        },
        setValue: function (target, prop, value) {
            target[prop] = value;
        }
    };

    Common.targetAccessViaAttribute = {
        getValue: function (target, prop) {
            return target.getAttribute(prop);
        },
        isValueSupported: function (value, isConverter) {
            return true;
        },
        setValue: function (target, prop, value) {
            if (value === null || value === undefined) {
                target.removeAttribute(prop);
            } else {
                target.setAttribute(prop, value);
            }
        }
    };

    var Binding = (function () {
        function Binding(source, sourceExpression, destination, destinationProperty, converter, mode, targetAccess) {
            var _this = this;
            F12.Tools.Utility.Assert.hasValue(sourceExpression, "sourceExpression");
            F12.Tools.Utility.Assert.hasValue(destination, "destination");
            F12.Tools.Utility.Assert.hasValue(destinationProperty, "destinationProperty");

            mode = mode || Binding.ONE_WAY_MODE;
            var expressionParts = sourceExpression.split(".");

            this._source = null;
            this._sourceChangedRegistration = null;
            this._destChangedRegistration = null;
            this._sourceProperty = expressionParts[0];
            this._childBinding = null;
            this._paused = false;
            this._twoWay = false;
            this._converter = converter;
            this._destination = destination;
            this._destinationProperty = destinationProperty;
            this._targetAccess = targetAccess || Common.targetAccessViaProperty;

            if (expressionParts.length > 1) {
                expressionParts.splice(0, 1);
                this._childBinding = new Binding(null, expressionParts.join("."), destination, destinationProperty, converter, mode, this._targetAccess);
            } else if (mode.toLowerCase() === Binding.TWO_WAY_MODE) {
                this._twoWay = true;
                this._destChangedRegistration = this.attachChangeHandler(destination, function (e) {
                    var propertyName = e;
                    if (typeof propertyName !== "string" || propertyName === null || propertyName === _this._destinationProperty) {
                        _this.updateSourceFromDest();
                    }
                });
            }

            this.setSource(source);
        }
        Binding.prototype.isForDestination = function (destination, destinationProperty) {
            return destination === this._destination && destinationProperty === this._destinationProperty;
        };

        Binding.prototype.unbind = function () {
            this._source = null;
            if (this._sourceChangedRegistration) {
                this._sourceChangedRegistration.unregister();
                this._sourceChangedRegistration = null;
            }

            if (this._childBinding) {
                this._childBinding.unbind();
                this._childBinding = null;
            }

            if (this._destChangedRegistration) {
                this._destChangedRegistration.unregister();
                this._destChangedRegistration = null;
            }
        };

        Binding.prototype.updateSourceFromDest = function () {
            if (this._source && this._twoWay) {
                this._paused = true;
                var destValue = this._targetAccess.getValue(this._destination, this._destinationProperty);
                if (this._converter) {
                    destValue = this._converter.convertFrom(destValue);
                }

                this._source[this._sourceProperty] = destValue;
                this._paused = false;
            }
        };

        Binding.prototype.updateDestination = function () {
            if (this._paused) {
                return;
            }

            this._paused = true;
            var value = this.getValue();
            if (this._childBinding) {
                this._childBinding.setSource(value);
            } else {
                var hasConverter = !!this._source && !!this._converter;
                if (hasConverter) {
                    value = this._converter.convertTo(value);
                }

                if (this._targetAccess.isValueSupported(value, !!hasConverter)) {
                    this._targetAccess.setValue(this._destination, this._destinationProperty, value);
                }
            }

            this._paused = false;
        };

        Binding.prototype.setSource = function (source) {
            var _this = this;
            if (this._sourceChangedRegistration) {
                this._sourceChangedRegistration.unregister();
                this._sourceChangedRegistration = null;
            }

            this._source = source;

            if (this._source) {
                this._sourceChangedRegistration = this.attachChangeHandler(this._source, function (propertyName) {
                    if (typeof propertyName !== "string" || propertyName === null || propertyName === _this._sourceProperty) {
                        _this.updateDestination();
                    }
                });
            }

            this.updateDestination();
            this.updateSourceFromDest();
        };

        Binding.prototype.attachChangeHandler = function (obj, handler) {
            if (obj.propertyChanged) {
                return obj.propertyChanged.addHandler(handler);
            } else {
                var element = obj;
                if ((element.tagName === "INPUT" || element.tagName === "SELECT") && element.addEventListener && element.removeEventListener) {
                    element.addEventListener("change", handler);
                    return { unregister: function () {
                            return element.removeEventListener("change", handler);
                        } };
                }
            }
        };

        Binding.prototype.getValue = function () {
            return this._source && this._source[this._sourceProperty];
        };
        Binding.ONE_WAY_MODE = "oneway";

        Binding.TWO_WAY_MODE = "twoway";
        return Binding;
    })();
    Common.Binding = Binding;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Binding/Binding.js.map

// CommonConverters.ts
var Common;
(function (Common) {
    "use strict";

    var CommonConverters = (function () {
        function CommonConverters() {
        }
        CommonConverters.initialize = function () {
            CommonConverters.AriaConverterElement = document.createElement("span");

            CommonConverters.HtmlTooltipFromResourceConverter = CommonConverters.getHtmlTooltipFromResourceConverter();
            CommonConverters.IntToStringConverter = CommonConverters.getIntToStringConverter();
            CommonConverters.InvertBool = CommonConverters.invertBoolConverter();
            CommonConverters.JsonHtmlTooltipToInnerTextConverter = CommonConverters.getJsonHtmlTooltipToInnerTextConverter();
            CommonConverters.NullPermittedConverter = CommonConverters.getNullPermittedConverter();
            CommonConverters.ResourceConverter = CommonConverters.getResourceConverter();
            CommonConverters.StringToBooleanConverter = CommonConverters.getStringToBooleanConverter();
            CommonConverters.StringToIntConverter = CommonConverters.getStringToIntConverter();
            CommonConverters.ThemedImageConverter = CommonConverters.getThemedImageConverter();
        };

        CommonConverters.getResourceConverter = function () {
            return {
                convertTo: function (from) {
                    return Plugin.Resources.getString(from);
                },
                convertFrom: null
            };
        };

        CommonConverters.getThemedImageConverter = function () {
            return {
                convertTo: function (from) {
                    return Plugin.Theme.getValue(from);
                },
                convertFrom: null
            };
        };

        CommonConverters.getStringToBooleanConverter = function () {
            return {
                convertTo: function (from) {
                    return from === "true" ? true : false;
                },
                convertFrom: function (from) {
                    return from ? "true" : "false";
                }
            };
        };

        CommonConverters.getStringToIntConverter = function () {
            return {
                convertTo: function (from) {
                    return from >> 0;
                },
                convertFrom: function (from) {
                    return from.toString();
                }
            };
        };

        CommonConverters.getIntToStringConverter = function () {
            return {
                convertTo: function (from) {
                    return from.toString();
                },
                convertFrom: function (from) {
                    return from >> 0;
                }
            };
        };

        CommonConverters.invertBoolConverter = function () {
            return {
                convertTo: function (from) {
                    return !from;
                },
                convertFrom: function (to) {
                    return !to;
                }
            };
        };

        CommonConverters.getHtmlTooltipFromResourceConverter = function () {
            return {
                convertTo: function (from) {
                    return JSON.stringify({ content: Plugin.Resources.getString(from), contentContainsHTML: true });
                },
                convertFrom: null
            };
        };

        CommonConverters.getJsonHtmlTooltipToInnerTextConverter = function () {
            return {
                convertTo: function (from) {
                    if (from.match(CommonConverters.JSONRegex)) {
                        try  {
                            var options = JSON.parse(from);
                            if (options.contentContainsHTML) {
                                CommonConverters.AriaConverterElement.innerHTML = options.content;
                                var text = CommonConverters.AriaConverterElement.innerText;
                                CommonConverters.AriaConverterElement.innerHTML = "";
                                return text;
                            } else {
                                return options.content;
                            }
                        } catch (ex) {
                        }
                    }

                    return from;
                },
                convertFrom: null
            };
        };

        CommonConverters.getNullPermittedConverter = function () {
            return {
                convertTo: function (from) {
                    return from;
                },
                convertFrom: function (to) {
                    return to;
                }
            };
        };
        CommonConverters.JSONRegex = /^\{.*\}$/;
        return CommonConverters;
    })();
    Common.CommonConverters = CommonConverters;

    CommonConverters.initialize();
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Binding/CommonConverters.js.map

// IConverter.ts
var Common;
(function (Common) {
    "use strict";

    
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Binding/IConverter.js.map

// ITemplateRepository.ts
var Common;
(function (Common) {
    "use strict";

    
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Templating/ITemplateRepository.js.map

// ScriptTemplateRepository.ts
var ControlTemplates;
(function (ControlTemplates) {
    var PlaceHolder = (function () {
        function PlaceHolder() {
        }
        return PlaceHolder;
    })();
})(ControlTemplates || (ControlTemplates = {}));

var Common;
(function (Common) {
    "use strict";

    

    var ScriptTemplateRepository = (function () {
        function ScriptTemplateRepository(container) {
            F12.Tools.Utility.Assert.hasValue(container, "Invalid template container.");

            this._container = container;
            this._registeredTemplates = {};
        }
        ScriptTemplateRepository.prototype.getTemplateString = function (templateId) {
            F12.Tools.Utility.Assert.isTrue(!!templateId, "Invalid template ID.");

            var template;

            template = this._registeredTemplates[templateId];
            if (!template) {
                var container = this._container;
                var templateParts = templateId.split(".");

                for (var i = 0; i < templateParts.length; i++) {
                    var part = templateParts[i];
                    container = container[part];
                    F12.Tools.Utility.Assert.isTrue(!!container, "Couldn't find the template with the given ID '" + templateId + "'.");
                }

                template = container;
            }

            F12.Tools.Utility.Assert.areEqual(typeof template, "string", "The given template name doesn't point to a template.");

            return template;
        };

        ScriptTemplateRepository.prototype.registerTemplateString = function (templateId, html) {
            F12.Tools.Utility.Assert.isTrue(!!templateId, "Invalid template ID.");
            F12.Tools.Utility.Assert.isUndefined(this._registeredTemplates[templateId], "Template with id '" + templateId + "' already registered.");

            this._registeredTemplates[templateId] = html;
        };
        return ScriptTemplateRepository;
    })();
    Common.ScriptTemplateRepository = ScriptTemplateRepository;

    Common.templateRepository = new ScriptTemplateRepository(ControlTemplates);
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Templating/ScriptTemplateRepository.js.map

// TemplateDataAttributes.ts
var Common;
(function (Common) {
    "use strict";

    var TemplateDataAttributes = (function () {
        function TemplateDataAttributes() {
        }
        TemplateDataAttributes.BINDING = "data-binding";
        TemplateDataAttributes.CONTROL = "data-control";
        TemplateDataAttributes.NAME = "data-name";
        TemplateDataAttributes.CONTROL_TEMPLATE_ID = TemplateDataAttributes.CONTROL + "-templateId";
        TemplateDataAttributes.CONTROL_BINDING = "data-controlbinding";
        TemplateDataAttributes.OPTIONS = "data-options";
        TemplateDataAttributes.TEMPLATE_ID_OPTION = TemplateDataAttributes.OPTIONS + "-templateId";
        return TemplateDataAttributes;
    })();
    Common.TemplateDataAttributes = TemplateDataAttributes;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Templating/TemplateDataAttributes.js.map

// TemplateLoader.ts
var Common;
(function (Common) {
    "use strict";

    

    

    var TemplateLoader = (function () {
        function TemplateLoader(repository) {
            F12.Tools.Utility.Assert.hasValue(repository, "Invalid template repository.");

            this._parsingNode = document.createElement("div");
            this._repository = repository;
            this._templateCache = {};
            this._visitedControls = {};
            this._visitedTemplates = {};
        }
        Object.defineProperty(TemplateLoader.prototype, "repository", {
            get: function () {
                return this._repository;
            },
            enumerable: true,
            configurable: true
        });

        TemplateLoader.getControlType = function (controlName) {
            F12.Tools.Utility.Assert.isTrue(!!controlName, "Invalid control name.");

            var controlType = window;
            var nameParts = controlName.split(".");

            for (var i = 0; i < nameParts.length; i++) {
                var part = nameParts[i];
                controlType = controlType[part];
                F12.Tools.Utility.Assert.hasValue(controlType, "Couldn't find the control with the given name '" + controlName + "'.");
            }

            F12.Tools.Utility.Assert.areEqual(typeof controlType, "function", "The given control '" + controlName + "' doesn't represent a control type which implements IControl.");

            return controlType;
        };

        TemplateLoader.prototype.loadTemplate = function (templateId) {
            var cachedElement = this._templateCache[templateId];
            if (!cachedElement) {
                var template = this._repository.getTemplateString(templateId);

                F12.Tools.Utility.Assert.isFalse(this._visitedTemplates[templateId], "Detected a recursive template. TemplateId '" + templateId + "' is part of the parents hierarchy.");

                this._visitedTemplates[templateId] = true;
                try  {
                    cachedElement = this.loadTemplateUsingHtml(template);
                } finally {
                    this._visitedTemplates[templateId] = false;
                }

                this._templateCache[templateId] = cachedElement;
            }

            var rootElement = cachedElement.cloneNode(true);
            rootElement = this.resolvePlaceholders(rootElement);
            return rootElement;
        };

        TemplateLoader.prototype.loadTemplateUsingHtml = function (templateHtml) {
            this._parsingNode.innerHTML = templateHtml;
            F12.Tools.Utility.Assert.areEqual(this._parsingNode.childElementCount, 1, "Template should have only one root element.");

            var rootElement = this._parsingNode.children[0];

            this._parsingNode.removeChild(rootElement);

            return rootElement;
        };

        TemplateLoader.prototype.getControlInstance = function (controlName, templateId) {
            F12.Tools.Utility.Assert.isTrue(!!controlName, "Invalid control name.");

            var controlType = TemplateLoader.getControlType(controlName);
            var control;

            if (Common.TemplateControl.prototype.isPrototypeOf(controlType.prototype) || Common.TemplateControl.prototype === controlType.prototype) {
                control = new controlType(templateId);
            } else {
                control = new controlType();
            }

            F12.Tools.Utility.Assert.hasValue(control.rootElement, "The given control '" + controlName + "' doesn't represent a control type which implements IControl.");

            if (control.rootElement.control !== control) {
                control.rootElement.control = control;
            }

            return control;
        };

        TemplateLoader.prototype.resolvePlaceholders = function (root) {
            if (root.hasAttribute(Common.TemplateDataAttributes.CONTROL)) {
                root = this.resolvePlaceholder(root);
            } else {
                var placeholders = root.querySelectorAll("div[" + Common.TemplateDataAttributes.CONTROL + "]");
                var placeholdersCount = placeholders.length;
                for (var i = 0; i < placeholdersCount; i++) {
                    var node = placeholders[i];
                    this.resolvePlaceholder(node);
                }
            }

            return root;
        };

        TemplateLoader.prototype.resolvePlaceholder = function (node) {
            F12.Tools.Utility.Assert.isFalse(node.hasChildNodes(), "Control placeholders cannot have children.");

            var controlName = node.getAttribute(Common.TemplateDataAttributes.CONTROL);
            var templateId = node.getAttribute(Common.TemplateDataAttributes.CONTROL_TEMPLATE_ID);

            var controlVisistedKey = controlName + (templateId ? "," + templateId : "");

            F12.Tools.Utility.Assert.isFalse(this._visitedControls[controlVisistedKey], "Detected a recursive control. Control '" + controlVisistedKey + "' is part of the parents hierarchy.");

            this._visitedControls[controlVisistedKey] = true;
            try  {
                var controlInstance = this.getControlInstance(controlName, templateId);
            } finally {
                this._visitedControls[controlVisistedKey] = false;
            }

            var controlNode = controlInstance.rootElement;

            for (var i = 0; i < node.attributes.length; i++) {
                var sourceAttribute = node.attributes[i];
                controlNode.setAttribute(sourceAttribute.name, sourceAttribute.value);
            }

            if (node.parentElement) {
                node.parentElement.replaceChild(controlNode, node);
            }

            return controlNode;
        };
        return TemplateLoader;
    })();
    Common.TemplateLoader = TemplateLoader;

    Common.templateLoader = new TemplateLoader(Common.templateRepository);
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Templating/TemplateLoader.js.map

// TemplateControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    "use strict";

    var TemplateControl = (function (_super) {
        __extends(TemplateControl, _super);
        function TemplateControl(templateId) {
            _super.call(this);

            this.onInitializeOverride();

            this._templateId = templateId;
            this.setRootElementFromTemplate();
        }
        Object.defineProperty(TemplateControl.prototype, "model", {
            get: function () {
                return this._model;
            },
            set: function (value) {
                if (this._model !== value) {
                    this._model = value;
                    this.propertyChanged.invoke(TemplateControl.ModelPropertyName);
                    this.onModelChanged();
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TemplateControl.prototype, "tabIndex", {
            get: function () {
                if (this._tabIndex) {
                    return this._tabIndex;
                }

                return 0;
            },
            set: function (value) {
                if (this._tabIndex !== value) {
                    var oldValue = this._tabIndex;
                    this._tabIndex = value >> 0;
                    this.propertyChanged.invoke(TemplateControl.TabIndexPropertyName);
                    this.onTabIndexChanged(oldValue, this._tabIndex);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(TemplateControl.prototype, "templateId", {
            get: function () {
                return this._templateId;
            },
            set: function (value) {
                if (this._templateId !== value) {
                    this._templateId = value;
                    this._binding.unbind();
                    this.setRootElementFromTemplate();
                    this.propertyChanged.invoke(TemplateControl.TemplateIdPropertyName);
                }
            },
            enumerable: true,
            configurable: true
        });


        TemplateControl.initialize = function () {
            Common.ObservableHelpers.defineProperty(TemplateControl, TemplateControl.ClassNamePropertyName, null, function (obj, oldValue, newValue) {
                return obj.onClassNameChanged(oldValue, newValue);
            });
            Common.ObservableHelpers.defineProperty(TemplateControl, TemplateControl.IsEnabledPropertyName, true, function (obj) {
                return obj.onIsEnabledChanged();
            });
            Common.ObservableHelpers.defineProperty(TemplateControl, TemplateControl.IsVisiblePropertyName, true, function (obj) {
                return obj.onIsVisibleChanged();
            });
            Common.ObservableHelpers.defineProperty(TemplateControl, TemplateControl.TooltipPropertyName, null, function (obj) {
                return obj.onTooltipChanged();
            });
        };

        TemplateControl.prototype.getBinding = function (destination, destinationProperty) {
            var binding;

            if (this._binding) {
                binding = this._binding.findBinding(destination, destinationProperty);
            }

            return binding;
        };

        TemplateControl.prototype.onApplyTemplate = function () {
            this.onClassNameChanged(null, this.className);
            this.onIsVisibleChanged();
            this.onTabIndexChanged(null, this._tabIndex);
            this.onTooltipChanged();
        };

        TemplateControl.prototype.onInitializeOverride = function () {
        };

        TemplateControl.prototype.onModelChanged = function () {
        };

        TemplateControl.prototype.onTemplateChanging = function () {
        };

        TemplateControl.prototype.getNamedControl = function (name) {
            var element = this.getNamedElement(name);
            if (!element) {
                return null;
            }

            return element.control;
        };

        TemplateControl.prototype.getNamedElement = function (name) {
            var elements = [];
            elements.push(this.rootElement);

            while (elements.length > 0) {
                var element = elements.pop();

                if (element.getAttribute(Common.TemplateDataAttributes.NAME) === name) {
                    return element;
                }

                if (element.children && (!element.hasAttribute(Common.TemplateDataAttributes.CONTROL) || element === this.rootElement)) {
                    var childrenCount = element.children.length;
                    for (var i = 0; i < childrenCount; i++) {
                        elements.push(element.children[i]);
                    }
                }
            }

            return null;
        };

        TemplateControl.prototype.onIsEnabledChangedOverride = function () {
        };

        TemplateControl.prototype.onIsVisibleChangedOverride = function () {
        };

        TemplateControl.prototype.onTabIndexChangedOverride = function () {
        };

        TemplateControl.prototype.onTooltipChangedOverride = function () {
        };

        TemplateControl.prototype.onClassNameChanged = function (oldValue, newValue) {
            if (this.rootElement) {
                if (oldValue) {
                    var oldClasses = oldValue.split(" ");
                    for (var i = 0; i < oldClasses.length; i++) {
                        this.rootElement.classList.remove(oldClasses[i]);
                    }
                }

                if (newValue) {
                    var newClasses = newValue.split(" ");
                    for (var i = 0; i < newClasses.length; i++) {
                        this.rootElement.classList.add(newClasses[i]);
                    }
                }
            }
        };

        TemplateControl.prototype.onIsEnabledChanged = function () {
            if (this.rootElement) {
                if (this.isEnabled) {
                    this.rootElement.classList.remove(TemplateControl.CLASS_DISABLED);
                    this.rootElement.removeAttribute("aria-disabled");
                    this.onTabIndexChanged(this._tabIndex, this._tabIndex);
                } else {
                    this.rootElement.classList.add(TemplateControl.CLASS_DISABLED);
                    this.rootElement.setAttribute("aria-disabled", true);
                    this.rootElement.tabIndex = -1;
                }

                this.onIsEnabledChangedOverride();
            }
        };

        TemplateControl.prototype.onIsVisibleChanged = function () {
            if (this.rootElement) {
                if (this.isVisible) {
                    this.rootElement.classList.remove(TemplateControl.CLASS_HIDDEN);
                    this.rootElement.removeAttribute("aria-hidden");
                    this.onTabIndexChanged(this._tabIndex, this._tabIndex);
                } else {
                    this.rootElement.classList.add(TemplateControl.CLASS_HIDDEN);
                    this.rootElement.setAttribute("aria-hidden", "true");
                    this.rootElement.tabIndex = -1;
                }

                this.onIsVisibleChangedOverride();
            }
        };

        TemplateControl.prototype.onTabIndexChanged = function (oldValue, newValue) {
            if (this.rootElement) {
                if (this.isEnabled && this.isVisible) {
                    if (oldValue || newValue || newValue === 0) {
                        this.rootElement.tabIndex = newValue;
                    }
                }

                if (oldValue !== newValue) {
                    this.onTabIndexChangedOverride();
                }
            }
        };

        TemplateControl.prototype.onTooltipChanged = function () {
            if (this.rootElement) {
                this.onTooltipChangedOverride();
            }
        };

        TemplateControl.prototype.setRootElementFromTemplate = function () {
            var previousRoot;

            this.onTemplateChanging();

            if (this.rootElement) {
                previousRoot = this.rootElement;
                this.rootElement.control = null;
            }

            if (this._templateId) {
                this.rootElement = Common.templateLoader.loadTemplate(this._templateId);
            } else {
                this.rootElement = document.createElement("div");
            }

            if (previousRoot) {
                var attr = previousRoot.attributes.getNamedItem(Common.TemplateDataAttributes.NAME);
                if (attr) {
                    this.rootElement.setAttribute(attr.name, attr.value);
                }
            }

            this.rootElement.control = this;

            this._binding = new Common.TemplateDataBinding(this);

            if (previousRoot && previousRoot.parentElement) {
                previousRoot.parentElement.replaceChild(this.rootElement, previousRoot);
            }

            this.onApplyTemplate();
        };
        TemplateControl.CLASS_DISABLED = "disabled";

        TemplateControl.CLASS_HIDDEN = "BPT-hidden";
        TemplateControl.ClassNamePropertyName = "className";
        TemplateControl.IsEnabledPropertyName = "isEnabled";
        TemplateControl.IsVisiblePropertyName = "isVisible";
        TemplateControl.ModelPropertyName = "model";
        TemplateControl.TabIndexPropertyName = "tabIndex";
        TemplateControl.TemplateIdPropertyName = "templateId";
        TemplateControl.TooltipPropertyName = "tooltip";
        return TemplateControl;
    })(Common.Observable);
    Common.TemplateControl = TemplateControl;

    TemplateControl.initialize();
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Templating/TemplateControl.js.map

// TemplateDataBinding.ts
var Common;
(function (Common) {
    "use strict";

    

    

    var TemplateDataBinding = (function () {
        function TemplateDataBinding(control) {
            this._bindings = TemplateDataBinding.bind(control);
        }
        TemplateDataBinding.prototype.findBinding = function (destination, destinationProperty) {
            var binding;

            if (this._bindings) {
                for (var i = 0; i < this._bindings.length; i++) {
                    var currBinding = this._bindings[i];
                    if (currBinding.isForDestination(destination, destinationProperty)) {
                        binding = currBinding;
                        break;
                    }
                }
            }

            return binding;
        };

        TemplateDataBinding.prototype.unbind = function () {
            if (this._bindings) {
                for (var i = 0; i < this._bindings.length; i++) {
                    this._bindings[i].unbind();
                }
            }

            this._bindings = null;
        };

        TemplateDataBinding.buildBindingCommand = function (target, element, targetName, bindingSource, value) {
            var targetAccess = Common.targetAccessViaProperty;

            if (target === element) {
                if (targetName.substr(0, TemplateDataBinding.STYLE_PREFIX.length) === TemplateDataBinding.STYLE_PREFIX) {
                    target = element.style;
                    targetName = targetName.substr(TemplateDataBinding.STYLE_PREFIX.length);
                } else if (targetName.substr(0, TemplateDataBinding.ATTRIBUTE_PREFIX.length) === TemplateDataBinding.ATTRIBUTE_PREFIX) {
                    targetName = targetName.substr(TemplateDataBinding.ATTRIBUTE_PREFIX.length);
                    targetAccess = Common.targetAccessViaAttribute;
                } else if (targetName.substr(0, TemplateDataBinding.CONTROL_PREFIX.length) === TemplateDataBinding.CONTROL_PREFIX) {
                    var elementControlLink = element;
                    target = elementControlLink.control;
                    targetName = targetName.substr(TemplateDataBinding.CONTROL_PREFIX.length);
                }
            }

            var bindingCommand = {
                target: target,
                targetAccess: targetAccess,
                targetName: targetName,
                source: bindingSource,
                value: value
            };

            return bindingCommand;
        };

        TemplateDataBinding.extractBindingCommandsForBinding = function (commands, target, element, allBindings, isControlBinding) {
            var bindings = allBindings.split(",");
            var bindingsCount = bindings.length;

            for (var i = 0; i < bindingsCount; i++) {
                var binding = bindings[i];

                var keyValue = binding.split(":", 2);
                F12.Tools.Utility.Assert.areEqual(keyValue.length, 2, "Invalid binding syntax, the keyvalue pair should have the syntax target:source '" + binding + "'.");

                var targetName = keyValue[0].trim();
                var sourceSyntax = keyValue[1].trim();

                var bindingSource = TemplateDataBinding.parseSourceSyntax(sourceSyntax);

                if (!isControlBinding) {
                    bindingSource.name = TemplateDataBinding.MODEL_PREFIX + bindingSource.name;
                }

                var bindingCommand = TemplateDataBinding.buildBindingCommand(target, element, targetName, bindingSource, null);

                F12.Tools.Utility.Assert.isTrue(!!bindingCommand.targetName, "Invalid binding syntax. Target name is missing '" + binding + "'.");

                commands.push(bindingCommand);
            }
        };

        TemplateDataBinding.extractBindingCommandsForOptions = function (commands, target, element, allOptions) {
            var options = allOptions.split(",");
            var optionsCount = options.length;

            for (var i = 0; i < optionsCount; i++) {
                var option = options[i];

                var keyValue = option.split(":", 2);
                F12.Tools.Utility.Assert.areEqual(keyValue.length, 2, "Invalid options syntax, the keyvalue pair should have the syntax target:source '" + option + "'.");

                var targetName = keyValue[0].trim();
                var valueSyntax = keyValue[1].trim();

                var valueSource = TemplateDataBinding.parseSourceSyntax(valueSyntax);
                var value = valueSource.name;
                if (valueSource.converter && valueSource.converter.convertTo) {
                    value = valueSource.converter.convertTo(value);
                }

                var bindingCommand = TemplateDataBinding.buildBindingCommand(target, element, targetName, null, value);

                F12.Tools.Utility.Assert.isTrue(!!bindingCommand.targetName, "Invalid option syntax. Target name is missing '" + option + "'.");

                commands.push(bindingCommand);
            }
        };

        TemplateDataBinding.getBindingCommands = function (control) {
            var bindingCommands;

            var elements = [];
            elements.push(control.rootElement);

            while (elements.length > 0) {
                var element = elements.pop();
                var childControl = element.control;

                var target = element;
                if (childControl && childControl !== control) {
                    target = childControl;
                }

                if (target) {
                    var attr;

                    attr = element.getAttributeNode(Common.TemplateDataAttributes.BINDING);
                    if (attr) {
                        bindingCommands = bindingCommands || [];
                        TemplateDataBinding.extractBindingCommandsForBinding(bindingCommands, target, element, attr.value, false);
                        element.removeAttributeNode(attr);
                    }

                    attr = element.getAttributeNode(Common.TemplateDataAttributes.CONTROL_BINDING);
                    if (attr) {
                        bindingCommands = bindingCommands || [];
                        TemplateDataBinding.extractBindingCommandsForBinding(bindingCommands, target, element, attr.value, true);
                        element.removeAttributeNode(attr);
                    }

                    attr = element.getAttributeNode(Common.TemplateDataAttributes.OPTIONS);
                    if (attr) {
                        bindingCommands = bindingCommands || [];

                        var optionsTarget = childControl || element;
                        TemplateDataBinding.extractBindingCommandsForOptions(bindingCommands, optionsTarget, element, attr.value);
                        element.removeAttributeNode(attr);
                    }
                }

                if (element.children && (!element.hasAttribute(Common.TemplateDataAttributes.CONTROL) || element === control.rootElement)) {
                    var childrenCount = element.children.length;
                    for (var i = 0; i < childrenCount; i++) {
                        elements.push(element.children[i]);
                    }
                }
            }

            return bindingCommands;
        };

        TemplateDataBinding.bind = function (control) {
            var bindings;

            var bindingCommands = TemplateDataBinding.getBindingCommands(control);
            if (bindingCommands) {
                bindings = [];

                var bindingCommandsCount = bindingCommands.length;
                for (var i = 0; i < bindingCommandsCount; i++) {
                    var bindingCommand = bindingCommands[i];

                    if (bindingCommand.source) {
                        var binding = new Common.Binding(control, bindingCommand.source.name, bindingCommand.target, bindingCommand.targetName, bindingCommand.source.converter, bindingCommand.source.mode, bindingCommand.targetAccess);
                        bindings.push(binding);
                    } else if (bindingCommand.value !== undefined) {
                        bindingCommand.targetAccess.setValue(bindingCommand.target, bindingCommand.targetName, bindingCommand.value);
                    }
                }
            }

            return bindings && bindings.length > 0 ? bindings : null;
        };

        TemplateDataBinding.getConverterInstance = function (identifier) {
            var obj = window;
            var parts = identifier.split(".");

            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                obj = obj[part];
                F12.Tools.Utility.Assert.hasValue(obj, "Couldn't find the converter instance with the given name '" + identifier + "'.");
            }

            F12.Tools.Utility.Assert.hasValue(obj.convertFrom || obj.convertTo, "The converter instance with the given name '" + identifier + "' doesn't point to a valid converter instance.");

            return obj;
        };

        TemplateDataBinding.parseSourceSyntax = function (syntax) {
            F12.Tools.Utility.Assert.isTrue(!!syntax, "Invalid binding syntax.");

            var parts = syntax.split(";");

            var bindingSource = {
                name: parts[0].trim()
            };

            for (var i = 1; i < parts.length; i++) {
                var keyValue = parts[i].split("=", 2);
                F12.Tools.Utility.Assert.areEqual(keyValue.length, 2, "Invalid binding syntax, the keyvalue pair should have the syntax key=value.");

                switch (keyValue[0].trim().toLowerCase()) {
                    case "mode":
                        bindingSource.mode = keyValue[1].trim().toLowerCase();
                        break;

                    case "converter":
                        bindingSource.converter = TemplateDataBinding.getConverterInstance(keyValue[1].trim());
                        break;
                }
            }

            return bindingSource;
        };
        TemplateDataBinding.ATTRIBUTE_PREFIX = "attr-";
        TemplateDataBinding.MODEL_PREFIX = "model.";
        TemplateDataBinding.STYLE_PREFIX = "style.";
        TemplateDataBinding.CONTROL_PREFIX = "control.";
        return TemplateDataBinding;
    })();
    Common.TemplateDataBinding = TemplateDataBinding;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Framework/Templating/TemplateDataBinding.js.map

// ControlUtilities.ts
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        (function (NavigationDirection) {
            NavigationDirection[NavigationDirection["Next"] = 0] = "Next";
            NavigationDirection[NavigationDirection["Previous"] = 1] = "Previous";
        })(Controls.NavigationDirection || (Controls.NavigationDirection = {}));
        var NavigationDirection = Controls.NavigationDirection;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ControlUtilities.js.map

// ContentControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var ContentControl = (function (_super) {
            __extends(ContentControl, _super);
            function ContentControl(templateId) {
                _super.call(this, templateId);
            }
            ContentControl.initialize = function () {
                Common.ObservableHelpers.defineProperty(ContentControl, "content", null);
            };
            return ContentControl;
        })(Common.TemplateControl);
        Controls.ContentControl = ContentControl;

        ContentControl.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ContentControl.js.map

// PopupControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        (function (TabPressKind) {
            TabPressKind[TabPressKind["None"] = 0] = "None";
            TabPressKind[TabPressKind["Tab"] = 1] = "Tab";
            TabPressKind[TabPressKind["ShiftTab"] = 2] = "ShiftTab";
        })(Controls.TabPressKind || (Controls.TabPressKind = {}));
        var TabPressKind = Controls.TabPressKind;

        var PopupControl = (function (_super) {
            __extends(PopupControl, _super);
            function PopupControl(templateId) {
                var _this = this;
                this._blurHandler = function (e) {
                    return _this.onBlur(e);
                };
                this._focusOutHandler = function (e) {
                    return _this.onFocusOut(e);
                };
                this._keyHandler = function (e) {
                    return _this.onKeyEvent(e);
                };
                this._mouseHandler = function (e) {
                    return _this.onDocumentMouseHandler(e);
                };
                this._targetButtonClickHandler = function () {
                    return _this.onTargetButtonClick();
                };
                this._targetButtonKeyHandler = function (e) {
                    return _this.onTargetButtonKeyUp(e);
                };
                this._windowResizeHandler = function (e) {
                    return _this.onWindowResize(e);
                };

                _super.call(this, templateId);
            }
            PopupControl.initialize = function () {
                Common.ObservableHelpers.defineProperty(PopupControl, "targetButtonElement", null, function (obj, oldValue, newValue) {
                    return obj.onTargetButtonElementChanged(oldValue, newValue);
                });
            };

            PopupControl.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                if (this.rootElement) {
                    this.rootElement.classList.add(PopupControl.CLASS_POPUP);
                }

                this.onTargetButtonElementChanged(null, this.targetButtonElement);
            };

            PopupControl.prototype.onInitializeOverride = function () {
                _super.prototype.onInitializeOverride.call(this);

                this.isVisible = false;
            };

            PopupControl.prototype.onTemplateChanging = function () {
                if (this.rootElement) {
                    this.rootElement.classList.remove(PopupControl.CLASS_POPUP);
                }
            };

            PopupControl.prototype.onIsVisibleChangedOverride = function () {
                var _this = this;
                _super.prototype.onIsVisibleChangedOverride.call(this);

                if (this.isVisible) {
                    window.setImmediate(function () {
                        _this.rootElement.focus();
                    });

                    this._tabLastPressed = 0 /* None */;

                    if (this.targetButtonElement && !this.disablePopupActiveIndicator) {
                        this.targetButtonElement.classList.add(PopupControl.CLASS_POPUP_ACTIVE_ONTARGET);
                    }

                    this.setPopupPosition();

                    window.addEventListener("resize", this._windowResizeHandler);
                    document.addEventListener("focusout", this._focusOutHandler, true);
                    document.addEventListener("mousedown", this._mouseHandler, true);
                    document.addEventListener("mouseup", this._mouseHandler, true);
                    document.addEventListener("mousewheel", this._mouseHandler, true);
                    document.addEventListener("click", this._mouseHandler, true);
                    this.rootElement.addEventListener("blur", this._blurHandler, true);
                    this.rootElement.addEventListener("keydown", this._keyHandler);
                    this.rootElement.addEventListener("keyup", this._keyHandler);
                } else {
                    if (this.targetButtonElement) {
                        this.targetButtonElement.classList.remove(PopupControl.CLASS_POPUP_ACTIVE_ONTARGET);
                        if (!this._skipTargetButtonFocus) {
                            window.setImmediate(function () {
                                if (_this.targetButtonElement) {
                                    _this.targetButtonElement.focus();
                                }
                            });
                        }
                    }

                    window.removeEventListener("resize", this._windowResizeHandler);
                    document.removeEventListener("focusout", this._focusOutHandler, true);
                    document.removeEventListener("mousedown", this._mouseHandler, true);
                    document.removeEventListener("mouseup", this._mouseHandler, true);
                    document.removeEventListener("mousewheel", this._mouseHandler, true);
                    document.removeEventListener("click", this._mouseHandler, true);
                    this.rootElement.removeEventListener("blur", this._blurHandler, true);
                    this.rootElement.removeEventListener("keydown", this._keyHandler);
                    this.rootElement.removeEventListener("keyup", this._keyHandler);
                }
            };

            PopupControl.prototype.onKeyUpOverride = function (e) {
                return false;
            };

            PopupControl.prototype.show = function (x, y) {
                this.isVisible = true;

                if (x !== undefined && y !== undefined) {
                    this.rootElement.style.left = (x - this.rootElement.offsetWidth) + "px";
                    this.rootElement.style.top = y + "px";
                }
            };

            PopupControl.prototype.updatePopupPosition = function () {
                this.setPopupPosition();
            };

            PopupControl.totalOffsetLeft = function (elem) {
                var offsetLeft = 0;
                do {
                    if (!isNaN(elem.offsetLeft)) {
                        offsetLeft += elem.offsetLeft;
                    }
                } while(elem = elem.offsetParent);

                return offsetLeft;
            };

            PopupControl.totalOffsetTop = function (elem) {
                var offsetTop = 0;
                do {
                    if (!isNaN(elem.offsetTop)) {
                        offsetTop += elem.offsetTop;
                    }
                } while(elem = elem.offsetParent);

                return offsetTop;
            };

            PopupControl.prototype.setPopupPosition = function () {
                this.rootElement.style.left = "0px";
                this.rootElement.style.top = "0px";

                if (!this.targetButtonElement) {
                    return;
                }

                var viewportTop = this.viewportMargin ? (this.viewportMargin.top || 0) : 0;
                var viewportBottom = window.innerHeight - (this.viewportMargin ? (this.viewportMargin.bottom || 0) : 0);
                var viewportLeft = this.viewportMargin ? (this.viewportMargin.left || 0) : 0;
                var viewportRight = window.innerWidth - (this.viewportMargin ? (this.viewportMargin.right || 0) : 0);

                var targetRect = this.targetButtonElement.getBoundingClientRect();
                var targetViewportLeft = Math.round(targetRect.left);
                var targetViewportTop = Math.round(targetRect.top);

                var scrollTopTotal = 0;
                var scrollLeftTotal = 0;
                var elem = this.rootElement.offsetParent;
                while (elem) {
                    scrollLeftTotal += elem.scrollLeft;
                    scrollTopTotal += elem.scrollTop;
                    elem = elem.offsetParent;
                }

                var zeroOffsetLeft = PopupControl.totalOffsetLeft(this.rootElement);
                var zeroOffsetTop = PopupControl.totalOffsetTop(this.rootElement);

                var left = targetViewportLeft;
                var right = left + this.rootElement.offsetWidth;
                if (right > viewportRight) {
                    var newRight = targetViewportLeft + this.targetButtonElement.offsetWidth;
                    var newLeft = newRight - this.rootElement.offsetWidth;
                    if (newLeft >= viewportLeft) {
                        left = newLeft;
                        right = newRight;
                    }
                }

                this.rootElement.style.left = scrollLeftTotal + left - zeroOffsetLeft + "px";

                var top = targetViewportTop + this.targetButtonElement.offsetHeight;
                var bottom = top + this.rootElement.offsetHeight;
                if (bottom > viewportBottom) {
                    var newBottom = targetViewportTop;
                    var newTop = newBottom - this.rootElement.offsetHeight;
                    if (newTop >= viewportTop) {
                        top = newTop;
                        bottom = newBottom;
                    }
                }

                if (parseInt(window.getComputedStyle(this.rootElement).borderTopWidth) > 0 && parseInt(window.getComputedStyle(this.targetButtonElement).borderBottomWidth) > 0) {
                    top--;
                }

                this.rootElement.style.top = scrollTopTotal + top - zeroOffsetTop + "px";
            };

            PopupControl.prototype.onBlur = function (e) {
                if (!this.keepVisibleOnBlur && !document.hasFocus()) {
                    this.isVisible = false;
                }
            };

            PopupControl.prototype.onTargetButtonElementChanged = function (oldValue, newValue) {
                if (oldValue) {
                    oldValue.removeAttribute("aria-haspopup");
                    oldValue.removeAttribute("aria-owns");

                    if (this._targetButtonClickEvtReg) {
                        this._targetButtonClickEvtReg.unregister();
                        this._targetButtonClickEvtReg = null;
                    }

                    oldValue.removeEventListener("click", this._targetButtonClickHandler);
                    oldValue.removeEventListener("keyup", this._targetButtonKeyHandler);
                }

                if (newValue) {
                    newValue.setAttribute("aria-haspopup", "true");
                    newValue.setAttribute("aria-owns", this.rootElement.id);

                    var targetControl = newValue.control;
                    if (targetControl && targetControl instanceof Controls.Button) {
                        var targetButton = targetControl;
                        this._targetButtonClickEvtReg = targetButton.click.addHandler(this._targetButtonClickHandler);
                    } else {
                        newValue.addEventListener("click", this._targetButtonClickHandler);
                        newValue.addEventListener("keyup", this._targetButtonKeyHandler);
                    }
                }
            };

            PopupControl.prototype.onTargetButtonClick = function () {
                this.show();
            };

            PopupControl.prototype.onTargetButtonKeyUp = function (e) {
                if (e.keyCode === 32 /* Space */ || e.keyCode === 13 /* Enter */) {
                    this.show();

                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            };

            PopupControl.prototype.onWindowResize = function (e) {
                this.isVisible = false;
            };

            PopupControl.prototype.onFocusOut = function (e) {
                if (e.relatedTarget && e.relatedTarget !== this.rootElement && !this.rootElement.contains(e.relatedTarget)) {
                    if (this._tabLastPressed !== 0 /* None */) {
                        var tabbableChildren = this.rootElement.querySelectorAll("[tabindex]");
                        var tabbableElement = this.rootElement;

                        if (this._tabLastPressed === 1 /* Tab */) {
                            for (var i = 0; i < tabbableChildren.length; i++) {
                                var element = tabbableChildren.item(i);

                                if (element.tabIndex >= 0 && element.offsetParent) {
                                    tabbableElement = element;
                                    break;
                                }
                            }
                        } else {
                            for (var i = tabbableChildren.length - 1; i >= 0; i--) {
                                var element = tabbableChildren.item(i);

                                if (element.tabIndex >= 0 && element.offsetParent) {
                                    tabbableElement = element;
                                    break;
                                }
                            }
                        }

                        window.setImmediate(function () {
                            tabbableElement.focus();
                        });
                    } else {
                        this.isVisible = false;

                        window.setImmediate(function () {
                            if (e.target) {
                                e.target.focus();
                            }
                        });
                    }
                }

                return false;
            };

            PopupControl.prototype.onDocumentMouseHandler = function (e) {
                var withinPopup = this.rootElement.contains(e.target);
                if (!withinPopup) {
                    var withinTargetButton = this.targetButtonElement && this.targetButtonElement.contains(e.target);

                    if (!withinTargetButton) {
                        var elementUnderPoint = document.elementFromPoint(e.x, e.y);
                        withinPopup = this.rootElement.contains(elementUnderPoint);
                        if (!withinPopup) {
                            this._skipTargetButtonFocus = true;
                            try  {
                                this.isVisible = false;
                            } finally {
                                this._skipTargetButtonFocus = false;
                            }
                        }
                    } else {
                        if (e.type === "click" && this.dismissOnTargetButtonClick) {
                            this.isVisible = false;
                        }

                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                }
            };

            PopupControl.prototype.onKeyEvent = function (e) {
                e.stopImmediatePropagation();

                this._tabLastPressed = e.keyCode === 9 /* Tab */ ? (e.shiftKey ? 2 /* ShiftTab */ : 1 /* Tab */) : 0 /* None */;

                if (e.type === "keyup") {
                    var handled = this.onKeyUpOverride(e);
                    if (!handled) {
                        switch (e.keyCode) {
                            case 27 /* Escape */:
                                this.isVisible = false;
                                break;
                        }
                    }
                }

                return false;
            };
            PopupControl.CLASS_POPUP = "BPT-popup";

            PopupControl.CLASS_POPUP_ACTIVE_ONTARGET = "BPT-popupActive";
            return PopupControl;
        })(Common.TemplateControl);
        Controls.PopupControl = PopupControl;

        PopupControl.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/PopupControl.js.map

// Button.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(templateId) {
                var _this = this;
                this._mouseHandler = function (e) {
                    return _this.onMouseEvent(e);
                };
                this._keyHandler = function (e) {
                    return _this.onKeyboardEvent(e);
                };

                this.click = new Common.EventSource();

                _super.call(this, templateId || "Common.defaultButtonTemplate");
            }
            Button.initialize = function () {
                Common.ObservableHelpers.defineProperty(Button, Button.IsPressedPropertyName, false, function (obj, oldValue, newValue) {
                    return obj.onIsPressedChanged(oldValue, newValue);
                });
            };

            Button.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                if (this.rootElement) {
                    if (!this.rootElement.hasAttribute("role")) {
                        this.rootElement.setAttribute("role", "button");
                    }

                    this.rootElement.addEventListener("click", this._mouseHandler);
                    this.rootElement.addEventListener("mousedown", this._mouseHandler);
                    this.rootElement.addEventListener("mouseup", this._mouseHandler);
                    this.rootElement.addEventListener("mouseleave", this._mouseHandler);
                    this.rootElement.addEventListener("keydown", this._keyHandler);
                    this.rootElement.addEventListener("keyup", this._keyHandler);

                    this.onIsPressedChanged(null, this.isPressed);
                }
            };

            Button.prototype.onTemplateChanging = function () {
                _super.prototype.onTemplateChanging.call(this);

                if (this.rootElement) {
                    this.rootElement.removeEventListener("click", this._mouseHandler);
                    this.rootElement.removeEventListener("mousedown", this._mouseHandler);
                    this.rootElement.removeEventListener("mouseup", this._mouseHandler);
                    this.rootElement.removeEventListener("mouseleave", this._mouseHandler);
                    this.rootElement.removeEventListener("keydown", this._keyHandler);
                    this.rootElement.removeEventListener("keyup", this._keyHandler);
                }
            };

            Button.prototype.onTooltipChangedOverride = function () {
                _super.prototype.onTooltipChangedOverride.call(this);

                if (this.tooltip) {
                    this.rootElement.setAttribute("data-plugin-vs-tooltip", this.tooltip);
                    this.rootElement.setAttribute("aria-label", Common.CommonConverters.JsonHtmlTooltipToInnerTextConverter.convertTo(this.tooltip));
                } else {
                    this.rootElement.removeAttribute("data-plugin-vs-tooltip");
                    this.rootElement.removeAttribute("aria-label");
                }
            };

            Button.prototype.press = function (e) {
                if (this.isEnabled) {
                    this.click.invoke(e);
                }
            };

            Button.prototype.onIsPressedChanged = function (oldValue, newValue) {
                if (this.rootElement) {
                    if (newValue) {
                        this.rootElement.classList.add(Button.CLASS_PRESSED);
                    } else {
                        this.rootElement.classList.remove(Button.CLASS_PRESSED);
                    }
                }
            };

            Button.prototype.onMouseEvent = function (e) {
                if (this.isEnabled) {
                    var stopPropagation = false;
                    switch (e.type) {
                        case "click":
                            this.rootElement.focus();
                            this.click.invoke(e);
                            stopPropagation = true;
                            break;
                        case "mousedown":
                            this.isPressed = true;
                            break;
                        case "mouseup":
                        case "mouseleave":
                            this.isPressed = false;
                            break;
                        default:
                            F12.Tools.Utility.Assert.fail("Unexpected");
                    }

                    if (stopPropagation) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                }
            };

            Button.prototype.onKeyboardEvent = function (e) {
                if (this.isEnabled && (e.keyCode === 13 /* Enter */ || e.keyCode === 32 /* Space */)) {
                    switch (e.type) {
                        case "keydown":
                            this.isPressed = true;
                            break;
                        case "keyup":
                            if (this.isPressed) {
                                this.isPressed = false;
                                this.click.invoke(e);
                            }

                            break;
                        default:
                            F12.Tools.Utility.Assert.fail("Unexpected");
                    }
                }
            };
            Button.CLASS_PRESSED = "pressed";

            Button.IsPressedPropertyName = "isPressed";
            return Button;
        })(Controls.ContentControl);
        Controls.Button = Button;

        Button.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/Button.js.map

// MenuControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var MenuControl = (function (_super) {
            __extends(MenuControl, _super);
            function MenuControl(templateId) {
                var _this = this;
                this._focusInHandler = function (e) {
                    return _this.onFocusIn(e);
                };
                this._selectedIndex = -1;
                this._menuItemsClickRegistration = [];
                this._menuItemsPropChangedRegistration = [];
                this.menuItems = [];

                _super.call(this, templateId || "Common.menuControlTemplate");
            }
            MenuControl.initialize = function () {
                Common.ObservableHelpers.defineProperty(MenuControl, MenuControl.MenuItemsTemplateIdPropertyName, null, function (obj, oldValue, newValue) {
                    return obj.onMenuTemplateIdChanged(oldValue, newValue);
                });
                Common.ObservableHelpers.defineProperty(MenuControl, MenuControl.SelectedItemPropertyName, null, function (obj) {
                    return obj.onSelectedItemChanged();
                });
            };

            MenuControl.prototype.addClickHandlerToMenuItem = function (menuItemName, clickHandler) {
                var element = this.getNamedElement(menuItemName);
                if (element && element.control) {
                    element.control.click.addHandler(clickHandler);
                }
            };

            MenuControl.prototype.onIsVisibleChangedOverride = function () {
                _super.prototype.onIsVisibleChangedOverride.call(this);

                if (this.isVisible) {
                    this.rootElement.addEventListener("focusin", this._focusInHandler);

                    this.selectedItem = null;
                    for (var i = 0; i < this.menuItems.length; i++) {
                        this.menuItems[i].rootElement.classList.remove(MenuControl.CLASS_SELECTED);
                    }
                } else {
                    this.rootElement.removeEventListener("focusin", this._focusInHandler);
                }
            };

            MenuControl.prototype.onKeyUpOverride = function (e) {
                var handled = false;

                switch (e.keyCode) {
                    case 40 /* ArrowDown */:
                        this.changeSelection(0 /* Next */);
                        handled = true;
                        break;
                    case 38 /* ArrowUp */:
                        this.changeSelection(1 /* Previous */);
                        handled = true;
                        break;
                    case 32 /* Space */:
                    case 13 /* Enter */:
                        this.pressSelectedItem();
                        handled = true;
                        break;
                }

                if (!handled) {
                    handled = _super.prototype.onKeyUpOverride.call(this, e);
                }

                return handled;
            };

            MenuControl.prototype.onMenuItemClick = function () {
                if (this.dismissOnMenuItemClick) {
                    this.isVisible = false;
                }
            };

            MenuControl.prototype.onMenuItemPropertyChanged = function (menuItem, propertyName) {
                if (propertyName === "isChecked" || propertyName === "groupName") {
                    if (menuItem.groupName && menuItem.isChecked) {
                        for (var index = 0; index < this.menuItems.length; index++) {
                            var item = this.menuItems[index];

                            if (item !== menuItem && item.groupName === menuItem.groupName && item.isChecked) {
                                item.isChecked = false;
                            }
                        }
                    }
                }
            };

            MenuControl.prototype.onMenuTemplateIdChanged = function (oldValue, newValue) {
                while (this._menuItemsPropChangedRegistration.length > 0) {
                    this._menuItemsPropChangedRegistration.pop().unregister();
                }

                while (this._menuItemsClickRegistration.length > 0) {
                    this._menuItemsClickRegistration.pop().unregister();
                }

                if (newValue) {
                    this.menuItems = [];
                    this.selectedItem = null;
                    this._menuItemsPropChangedRegistration = [];
                    this._menuItemsClickRegistration = [];

                    var menuItemElements = this.rootElement.querySelectorAll("li[" + Common.TemplateDataAttributes.CONTROL + "]");
                    for (var index = 0; index < menuItemElements.length; index++) {
                        var menuItemElement = menuItemElements[index];
                        F12.Tools.Utility.Assert.isTrue(!!menuItemElement.control, "All menuItemElements must have a control");

                        var menuItem = menuItemElement.control;
                        this.menuItems.push(menuItem);

                        this._menuItemsPropChangedRegistration.push(menuItem.propertyChanged.addHandler(this.onMenuItemPropertyChanged.bind(this, menuItem)));
                        this._menuItemsClickRegistration.push(menuItem.click.addHandler(this.onMenuItemClick.bind(this)));
                    }
                }
            };

            MenuControl.prototype.onSelectedItemChanged = function () {
                if (!this.selectedItem) {
                    this.setSelectedIndex(-1, false);
                } else {
                    var itemIndex = this.menuItems.indexOf(this.selectedItem);
                    if (itemIndex !== this._selectedIndex) {
                        this.setSelectedIndex(itemIndex, false);
                    }
                }
            };

            MenuControl.prototype.onFocusIn = function (e) {
                var menuItemIndex = 0;
                for (; menuItemIndex < this.menuItems.length; menuItemIndex++) {
                    var menuItem = this.menuItems[menuItemIndex];
                    if (menuItem.rootElement.contains(e.target)) {
                        break;
                    }
                }

                if (menuItemIndex < this.menuItems.length) {
                    this.setSelectedIndex(menuItemIndex, false);
                }
            };

            MenuControl.prototype.changeSelection = function (direction) {
                if (this.menuItems.length === 0) {
                    return;
                }

                var step = (direction === 0 /* Next */) ? 1 : -1;

                var startingMenuItem = this.menuItems[this._selectedIndex];
                var newMenuItem;
                var newIndex = this._selectedIndex;

                do {
                    newIndex = (newIndex + step) % this.menuItems.length;
                    if (newIndex < 0) {
                        newIndex = this.menuItems.length - 1;
                    }

                    newMenuItem = this.menuItems[newIndex];
                    if (!startingMenuItem) {
                        startingMenuItem = newMenuItem;
                    } else if (newMenuItem === startingMenuItem) {
                        break;
                    }
                } while(!(newMenuItem.isVisible && newMenuItem.isEnabled));

                if (newMenuItem.isVisible && newMenuItem.isEnabled) {
                    this.setSelectedIndex(newIndex, true);
                }
            };

            MenuControl.prototype.pressSelectedItem = function () {
                var selectedItem = this.menuItems[this._selectedIndex];

                if (selectedItem) {
                    selectedItem.press();
                }
            };

            MenuControl.prototype.setSelectedIndex = function (newIndex, setFocus) {
                if (this._selectedIndex >= 0 && this._selectedIndex < this.menuItems.length) {
                    this.menuItems[this._selectedIndex].rootElement.classList.remove(MenuControl.CLASS_SELECTED);
                }

                this._selectedIndex = newIndex;

                var menuItem = this.menuItems[this._selectedIndex];
                if (menuItem) {
                    menuItem.rootElement.classList.add(MenuControl.CLASS_SELECTED);

                    if (setFocus) {
                        menuItem.rootElement.focus();
                    }

                    this.selectedItem = menuItem;
                }
            };
            MenuControl.CLASS_SELECTED = "selected";

            MenuControl.MenuItemsTemplateIdPropertyName = "menuItemsTemplateId";
            MenuControl.SelectedItemPropertyName = "selectedItem";
            return MenuControl;
        })(Controls.PopupControl);
        Controls.MenuControl = MenuControl;

        MenuControl.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/MenuControl.js.map

// MenuItem.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var MenuItem = (function (_super) {
            __extends(MenuItem, _super);
            function MenuItem(templateId) {
                var _this = this;
                this._mouseHandler = function (e) {
                    return _this.onMouseEvent(e);
                };
                this._keyUpHandler = function (e) {
                    return _this.onKeyUp(e);
                };
                this._domEventHanlder = function (e) {
                    return _this.onDomAttributeModified(e);
                };

                _super.call(this, templateId || "Common.menuItemTemplate");

                this.click = new Common.EventSource();
            }
            MenuItem.initialize = function () {
                Common.ObservableHelpers.defineProperty(MenuItem, MenuItem.GroupNamePropertyName, null);
                Common.ObservableHelpers.defineProperty(MenuItem, MenuItem.IsChecked, false, function (obj, oldValue, newValue) {
                    return obj.onIsCheckedChanged(oldValue, newValue);
                });
            };

            MenuItem.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                if (this.rootElement) {
                    this.rootElement.addEventListener("click", this._mouseHandler);
                    this.rootElement.addEventListener("mousedown", this._mouseHandler);
                    this.rootElement.addEventListener("mouseup", this._mouseHandler);
                    this.rootElement.addEventListener("mouseleave", this._mouseHandler);
                    this.rootElement.addEventListener("keyup", this._keyUpHandler);
                    this.rootElement.addEventListener("DOMAttrModified", this._domEventHanlder);
                }

                this.onIsCheckedChanged(null, this.isChecked);
            };

            MenuItem.prototype.onIsEnabledChangedOverride = function () {
                _super.prototype.onIsEnabledChangedOverride.call(this);

                if (this.isEnabled) {
                    this.rootElement.removeAttribute("disabled");
                } else {
                    this.rootElement.setAttribute("disabled");
                }
            };

            MenuItem.prototype.onKeyUpOverride = function (e) {
                return false;
            };

            MenuItem.prototype.onMouseClickOverride = function (e) {
                return false;
            };

            MenuItem.prototype.onTemplateChanging = function () {
                _super.prototype.onTemplateChanging.call(this);

                if (this.rootElement) {
                    this.rootElement.removeEventListener("click", this._mouseHandler);
                    this.rootElement.removeEventListener("mousedown", this._mouseHandler);
                    this.rootElement.removeEventListener("mouseup", this._mouseHandler);
                    this.rootElement.removeEventListener("mouseleave", this._mouseHandler);
                    this.rootElement.removeEventListener("keyup", this._keyUpHandler);
                    this.rootElement.removeEventListener("DOMAttrModified", this._domEventHanlder);
                }
            };

            MenuItem.prototype.press = function (e) {
                if (this.isEnabled) {
                    this.click.invoke(e);
                }
            };

            MenuItem.prototype.onDomAttributeModified = function (e) {
                if (e.attrName === "aria-checked") {
                    var checked = e.newValue === "true";
                    if (this.isChecked !== checked) {
                        this.isChecked = checked;
                    }
                }
            };

            MenuItem.prototype.onIsCheckedChanged = function (oldValue, newValue) {
                if (this.rootElement) {
                    if (newValue) {
                        this.rootElement.classList.remove(MenuItem.CLASS_HIDDEN_CHECK_MARK);
                    } else {
                        this.rootElement.classList.add(MenuItem.CLASS_HIDDEN_CHECK_MARK);
                    }

                    this.rootElement.setAttribute("aria-checked", "" + newValue);
                    this.rootElement.focus();
                }
            };

            MenuItem.prototype.onKeyUp = function (e) {
                if (this.isEnabled) {
                    var handled = this.onKeyUpOverride(e);
                    if (!handled) {
                        if (e.keyCode === 13 /* Enter */ || e.keyCode === 32 /* Space */) {
                            this.press(e);
                            handled = true;
                        }
                    }

                    if (handled) {
                        e.stopImmediatePropagation();
                    }
                }
            };

            MenuItem.prototype.onMouseEvent = function (e) {
                if (this.isEnabled) {
                    switch (e.type) {
                        case "click":
                            var handled = this.onMouseClickOverride(e);
                            if (!handled) {
                                this.press(e);
                            }

                            break;
                        case "mousedown":
                        case "mouseup":
                        case "mouseleave":
                            break;
                        default:
                            F12.Tools.Utility.Assert.fail("Unexpected");
                    }

                    e.stopImmediatePropagation();
                }
            };
            MenuItem.CLASS_HIDDEN_CHECK_MARK = "hiddenCheckMark";

            MenuItem.GroupNamePropertyName = "groupName";
            MenuItem.IsChecked = "isChecked";
            return MenuItem;
        })(Controls.ContentControl);
        Controls.MenuItem = MenuItem;

        MenuItem.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/MenuItem.js.map

// CheckBoxMenuItem.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var CheckBoxMenuItem = (function (_super) {
            __extends(CheckBoxMenuItem, _super);
            function CheckBoxMenuItem(templateId) {
                _super.call(this, templateId || "Common.menuItemCheckBoxTemplate");
            }
            CheckBoxMenuItem.prototype.onKeyUpOverride = function (e) {
                var handled = false;

                if (e.key === Common.Keys.SPACEBAR) {
                    this.isChecked = !this.isChecked;
                    handled = true;
                }

                if (!handled) {
                    handled = _super.prototype.onKeyUpOverride.call(this, e);
                }

                return handled;
            };

            CheckBoxMenuItem.prototype.press = function (e) {
                var checkBox = this.getNamedElement("BPT-menuItemCheckBox");
                if (!e || e.srcElement !== checkBox) {
                    this.isChecked = !this.isChecked;
                    _super.prototype.press.call(this, e);
                }
            };
            return CheckBoxMenuItem;
        })(Common.Controls.MenuItem);
        Controls.CheckBoxMenuItem = CheckBoxMenuItem;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/CheckBoxMenuItem.js.map

// TextBoxMenuItem.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var TextBoxMenuItem = (function (_super) {
            __extends(TextBoxMenuItem, _super);
            function TextBoxMenuItem(templateId) {
                var _this = this;
                this._focusInHandler = function (e) {
                    return _this.onFocusIn(e);
                };

                _super.call(this, templateId || "Common.menuItemTextBoxTemplate");
            }
            TextBoxMenuItem.initialize = function () {
                Common.ObservableHelpers.defineProperty(TextBoxMenuItem, TextBoxMenuItem.PlaceholderPropertyName, null);
            };

            TextBoxMenuItem.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                this._textBox = this.getNamedElement("BPT-menuItemTextBox");
                F12.Tools.Utility.Assert.isTrue(!!this._textBox, "Expecting a textbox with the name BPT-menuItemTextBox");

                this.rootElement.addEventListener("focusin", this._focusInHandler);
            };

            TextBoxMenuItem.prototype.onKeyUpOverride = function (e) {
                var handled = false;

                if (e.srcElement === this._textBox && e.keyCode === 27 /* Escape */) {
                    e.stopImmediatePropagation();
                    handled = true;
                }

                if (!handled) {
                    handled = _super.prototype.onKeyUpOverride.call(this, e);
                }

                return handled;
            };

            TextBoxMenuItem.prototype.onTemplateChanging = function () {
                _super.prototype.onTemplateChanging.call(this);

                if (this.rootElement) {
                    this.rootElement.removeEventListener("focusin", this._focusInHandler);
                }
            };

            TextBoxMenuItem.prototype.press = function (e) {
            };

            TextBoxMenuItem.prototype.onFocusIn = function (e) {
                this._textBox.focus();
            };
            TextBoxMenuItem.PlaceholderPropertyName = "placeholder";
            return TextBoxMenuItem;
        })(Common.Controls.MenuItem);
        Controls.TextBoxMenuItem = TextBoxMenuItem;

        TextBoxMenuItem.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/TextBoxMenuItem.js.map

// ComboBoxMenuItem.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var ComboBoxMenuItem = (function (_super) {
            __extends(ComboBoxMenuItem, _super);
            function ComboBoxMenuItem(templateId) {
                var _this = this;
                this._focusInHandler = function (e) {
                    return _this.onFocusIn(e);
                };

                _super.call(this, templateId || "Common.menuItemComboBoxTemplate");
            }
            ComboBoxMenuItem.initialize = function () {
                Common.ObservableHelpers.defineProperty(ComboBoxMenuItem, "items", null);
                Common.ObservableHelpers.defineProperty(ComboBoxMenuItem, "selectedValue", null);
            };

            ComboBoxMenuItem.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                this._selectElement = this.getNamedElement("BPT-menuItemComboBox");
                F12.Tools.Utility.Assert.isTrue(!!this._selectElement, "Expecting a combobox with the name BPT-menuItemComboBox");

                this.rootElement.addEventListener("focusin", this._focusInHandler);
            };

            ComboBoxMenuItem.prototype.onKeyUpOverride = function (e) {
                var handled = false;

                if (e.srcElement === this._selectElement && e.key === Common.Keys.SPACEBAR || e.key === Common.Keys.ENTER || e.key === Common.Keys.DOWN || e.key === Common.Keys.UP) {
                    handled = true;
                }

                if (!handled) {
                    handled = _super.prototype.onKeyUpOverride.call(this, e);
                }

                return handled;
            };

            ComboBoxMenuItem.prototype.onTemplateChanging = function () {
                _super.prototype.onTemplateChanging.call(this);

                if (this.rootElement) {
                    this.rootElement.removeEventListener("focusin", this._focusInHandler);
                }
            };

            ComboBoxMenuItem.prototype.press = function (e) {
            };

            ComboBoxMenuItem.prototype.onFocusIn = function (e) {
                this._selectElement.focus();
            };
            return ComboBoxMenuItem;
        })(Common.Controls.MenuItem);
        Controls.ComboBoxMenuItem = ComboBoxMenuItem;

        ComboBoxMenuItem.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ComboBoxMenuItem.js.map

// Panel.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var Panel = (function (_super) {
            __extends(Panel, _super);
            function Panel(templateId) {
                _super.call(this, templateId);
            }
            Panel.initialize = function () {
            };

            Panel.prototype.addClickHandlerToButton = function (buttonName, clickHandler) {
                var element = this.getNamedElement(buttonName);

                if (element && element.control) {
                    element.control.click.addHandler(clickHandler);
                }
            };
            return Panel;
        })(Common.TemplateControl);
        Controls.Panel = Panel;

        Panel.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/Panel.js.map

// TextBox.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var TextBox = (function (_super) {
            __extends(TextBox, _super);
            function TextBox(templateId) {
                var _this = this;
                this._keyboardHandler = function (e) {
                    return _this.onKeyboardEvent(e);
                };

                _super.call(this, templateId || "Common.defaultTextBoxTemplate");
            }
            Object.defineProperty(TextBox.prototype, "focusableElement", {
                get: function () {
                    return this.rootElement;
                },
                enumerable: true,
                configurable: true
            });

            TextBox.initialize = function () {
                Common.ObservableHelpers.defineProperty(TextBox, TextBox.PlaceholderPropertyName, "");
                Common.ObservableHelpers.defineProperty(TextBox, TextBox.ReadonlyPropertyName, false, function (obj) {
                    return obj.onReadonlyChanged();
                });
                Common.ObservableHelpers.defineProperty(TextBox, TextBox.TextPropertyName, "");
            };

            TextBox.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                this._inputRootElement = (this.getNamedElement(TextBox.InputElementName) || this.rootElement);
                F12.Tools.Utility.Assert.isTrue(!!this._inputRootElement, "Expecting a root element for the input element in TextBox.");

                this._textBinding = this.getBinding(this._inputRootElement, "value");

                this._inputRootElement.addEventListener("keydown", this._keyboardHandler);
                this._inputRootElement.addEventListener("keypress", this._keyboardHandler);
                this._inputRootElement.addEventListener("input", this._keyboardHandler);
            };

            TextBox.prototype.onIsEnabledChangedOverride = function () {
                _super.prototype.onIsEnabledChangedOverride.call(this);

                if (this.isEnabled) {
                    this.rootElement.removeAttribute("disabled");
                } else {
                    this.rootElement.setAttribute("disabled");
                }
            };

            TextBox.prototype.onTemplateChanging = function () {
                _super.prototype.onTemplateChanging.call(this);

                if (this._inputRootElement) {
                    this._inputRootElement.removeEventListener("keypress", this._keyboardHandler);
                    this._inputRootElement.removeEventListener("keydown", this._keyboardHandler);
                    this._inputRootElement.removeEventListener("input", this._keyboardHandler);
                }
            };

            TextBox.prototype.onKeyboardEvent = function (e) {
                if (this.isEnabled) {
                    switch (e.type) {
                        case "keydown":
                            if (e.key === Common.Keys.ENTER) {
                                if (this._textBinding) {
                                    this._textBinding.updateSourceFromDest();
                                }
                            }

                            break;
                        case "keypress":
                            if (this.clearOnEscape && e.keyCode === 27 /* Escape */) {
                                this._inputRootElement.value = "";

                                if (this._textBinding) {
                                    this._textBinding.updateSourceFromDest();
                                }

                                e.stopImmediatePropagation();
                                e.preventDefault();
                            }

                            break;
                        case "input":
                            if (this.updateOnInput) {
                                if (this._textBinding) {
                                    this._textBinding.updateSourceFromDest();
                                }
                            }

                            break;
                        default:
                            F12.Tools.Utility.Assert.fail("Unexpected");
                    }
                }
            };

            TextBox.prototype.onReadonlyChanged = function () {
                if (this._inputRootElement) {
                    this._inputRootElement.readOnly = this.readonly;
                }
            };
            TextBox.PlaceholderPropertyName = "placeholder";
            TextBox.ReadonlyPropertyName = "readonly";
            TextBox.TextPropertyName = "text";

            TextBox.InputElementName = "_textBoxRoot";
            return TextBox;
        })(Common.TemplateControl);
        Controls.TextBox = TextBox;

        TextBox.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/TextBox.js.map

// ToggleButton.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var ToggleButton = (function (_super) {
            __extends(ToggleButton, _super);
            function ToggleButton(templateId) {
                var _this = this;
                this._modificationHandler = function (e) {
                    return _this.onModificationEvent(e);
                };

                _super.call(this, templateId);

                this.toggleIsCheckedOnClick = true;

                this.click.addHandler(function (e) {
                    if (_this.toggleIsCheckedOnClick) {
                        _this.isChecked = !_this.isChecked;
                    }
                });
            }
            ToggleButton.initialize = function () {
                Common.ObservableHelpers.defineProperty(Controls.Button, "isChecked", false, function (obj, oldValue, newValue) {
                    return obj.onIsCheckedChanged(oldValue, newValue);
                });
            };

            ToggleButton.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                if (this.rootElement) {
                    this.rootElement.addEventListener("DOMAttrModified", this._modificationHandler);

                    this.onIsCheckedChanged(null, this.isChecked);
                }
            };

            ToggleButton.prototype.onTemplateChanging = function () {
                _super.prototype.onTemplateChanging.call(this);

                if (this.rootElement) {
                    this.rootElement.removeEventListener("DOMAttrModified", this._modificationHandler);
                }
            };

            ToggleButton.prototype.onIsCheckedChanged = function (oldValue, newValue) {
                if (this.rootElement) {
                    if (!this._isChangingAriaPressed) {
                        this._isChangingAriaPressed = true;
                        this.rootElement.setAttribute("aria-pressed", newValue + "");
                        this._isChangingAriaPressed = false;
                    }

                    if (newValue) {
                        this.rootElement.classList.add(ToggleButton.CLASS_CHECKED);
                    } else {
                        this.rootElement.classList.remove(ToggleButton.CLASS_CHECKED);
                    }
                }
            };

            ToggleButton.prototype.onModificationEvent = function (e) {
                if (!this._isChangingAriaPressed && this.isEnabled && e.attrName === "aria-pressed" && e.attrChange === e.MODIFICATION) {
                    this._isChangingAriaPressed = true;
                    this.isChecked = e.newValue === "true";
                    this._isChangingAriaPressed = false;
                }
            };
            ToggleButton.CLASS_CHECKED = "checked";
            return ToggleButton;
        })(Controls.Button);
        Controls.ToggleButton = ToggleButton;

        ToggleButton.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ToggleButton.js.map

// ToolbarControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var ToolbarControl = (function (_super) {
            __extends(ToolbarControl, _super);
            function ToolbarControl(templateId) {
                var _this = this;
                this._activeIndex = -1;
                this._controls = [];
                this._controlsPropChangedRegistration = [];
                this._focusInHandler = function (e) {
                    return _this.onFocusIn(e);
                };
                this._toolbarKeyHandler = function (e) {
                    return _this.onToolbarKeyboardEvent(e);
                };
                this._toolbarPanel = null;

                _super.call(this, templateId || "Common.defaultToolbarTemplate");

                if (Plugin.F12) {
                    Plugin.F12.addEventListener("hostinfochanged", function (e) {
                        return _this.onHostInfoChanged(e);
                    });
                    this.onHostInfoChanged(Plugin.F12.getHostInfo());
                }
            }
            ToolbarControl.initialize = function () {
                Common.ObservableHelpers.defineProperty(ToolbarControl, ToolbarControl.PanelTemplateIdPropertyName, "", function (obj, oldValue, newValue) {
                    return obj.onPanelTemplateIdChanged(oldValue, newValue);
                });
                Common.ObservableHelpers.defineProperty(ToolbarControl, ToolbarControl.TitlePropertyName, "");
            };

            ToolbarControl.prototype.getActiveElement = function () {
                if (this._activeIndex >= 0 && this._activeIndex < this._controls.length) {
                    return this._controls[this._activeIndex].rootElement;
                }

                return null;
            };

            ToolbarControl.prototype.moveToControl = function (direction) {
                var step = (direction === 0 /* Next */) ? 1 : this._controls.length - 1;

                var focusedElement = document.activeElement;

                if (this._controls.length === 0 || this._activeIndex === -1 || !focusedElement) {
                    return;
                }

                var startIndex = this._activeIndex;

                for (var i = 0; i < this._controls.length; i++) {
                    if (this._controls[i].rootElement === focusedElement) {
                        startIndex = i;
                        break;
                    }
                }

                var currentIndex = startIndex;

                while (startIndex !== (currentIndex = (currentIndex + step) % this._controls.length)) {
                    var control = this._controls[currentIndex];
                    if (control.isVisible && control.isEnabled) {
                        this.setActiveIndex(currentIndex, true);
                        break;
                    }
                }
            };

            ToolbarControl.prototype.onFocusIn = function (e) {
                var controlIndex = 0;
                for (; controlIndex < this._controls.length; controlIndex++) {
                    var control = this._controls[controlIndex];
                    if (control.rootElement.contains(e.target)) {
                        break;
                    }
                }

                if (controlIndex < this._controls.length) {
                    this.setActiveIndex(controlIndex);
                }
            };

            ToolbarControl.prototype.onPanelTemplateIdChanged = function (oldValue, newValue) {
                if (this._toolbarPanel) {
                    this._toolbarPanel.removeEventListener("focusin", this._focusInHandler);
                    this._toolbarPanel.removeEventListener("keydown", this._toolbarKeyHandler);
                    this._toolbarPanel = null;
                }

                while (this._controlsPropChangedRegistration.length > 0) {
                    this._controlsPropChangedRegistration.pop().unregister();
                }

                if (newValue) {
                    this._controls = [];
                    this.setActiveIndex(-1);

                    this._toolbarPanel = this.getNamedElement(ToolbarControl.TOOLBAR_PANEL_ELEMENT_NAME);
                    F12.Tools.Utility.Assert.hasValue(this._toolbarPanel, "Expecting a toolbar panel with the name: " + ToolbarControl.TOOLBAR_PANEL_ELEMENT_NAME);

                    this._toolbarPanel.addEventListener("focusin", this._focusInHandler);
                    this._toolbarPanel.addEventListener("keydown", this._toolbarKeyHandler);

                    for (var elementIndex = 0; elementIndex < this._toolbarPanel.children.length; elementIndex++) {
                        var element = this._toolbarPanel.children[elementIndex];

                        if (element.control) {
                            F12.Tools.Utility.Assert.isTrue(element.control instanceof Common.TemplateControl, "We only support controls of type TemplateControl in the Toolbar");

                            var control = element.control;
                            this._controls.push(control);
                            this._controlsPropChangedRegistration.push(control.propertyChanged.addHandler(this.onChildControlPropertyChanged.bind(this, control)));
                        }
                    }
                }

                this.setTabStop();
            };

            ToolbarControl.prototype.onHostInfoChanged = function (e) {
                var scaledControlAreaWidth = e.controlAreaWidth * (screen.logicalXDPI / screen.deviceXDPI);

                var toolbarContents = this.rootElement.querySelector(".BPT-ToolbarContents");
                F12.Tools.Utility.Assert.hasValue(toolbarContents, "Unable to find an element with selector .BPT-ToolbarContents in the toolbar on hostInfoChanged");

                if (toolbarContents) {
                    toolbarContents.style.marginRight = scaledControlAreaWidth + "px";
                }
            };

            ToolbarControl.prototype.onToolbarKeyboardEvent = function (e) {
                if (e.keyCode === 37 /* ArrowLeft */) {
                    this.moveToControl(1 /* Previous */);
                    e.stopPropagation();
                } else if (e.keyCode === 39 /* ArrowRight */) {
                    this.moveToControl(0 /* Next */);
                    e.stopPropagation();
                }
            };

            ToolbarControl.prototype.onChildControlPropertyChanged = function (childControl, propertyName) {
                if (propertyName === Common.TemplateControl.IsEnabledPropertyName || propertyName === Common.TemplateControl.IsVisiblePropertyName) {
                    if (this._activeIndex === -1) {
                        this.setTabStop();
                    } else {
                        var currentActiveControl = this._controls[this._activeIndex];
                        if (childControl === currentActiveControl) {
                            if (!(childControl.isEnabled && childControl.isVisible)) {
                                this.setTabStop(this._activeIndex);
                            }
                        }
                    }
                }
            };

            ToolbarControl.prototype.setTabStop = function (startAt) {
                this.setActiveIndex(-1);

                startAt = startAt || 0;
                if (startAt < 0 || startAt >= this._controls.length) {
                    return;
                }

                var currentIndex = startAt;
                var foundTabStop = false;

                do {
                    var control = this._controls[currentIndex];
                    if (!foundTabStop && control.isVisible && control.isEnabled) {
                        this.setActiveIndex(currentIndex);
                        foundTabStop = true;
                    } else {
                        control.tabIndex = -1;
                    }
                } while(startAt !== (currentIndex = (currentIndex + 1) % this._controls.length));
            };

            ToolbarControl.prototype.setActiveIndex = function (newIndex, setFocus) {
                if (this._activeIndex >= 0 && this._activeIndex < this._controls.length) {
                    this._controls[this._activeIndex].tabIndex = -1;
                }

                this._activeIndex = newIndex;

                var control = this._controls[this._activeIndex];
                if (control) {
                    control.tabIndex = 1;

                    if (setFocus) {
                        control.rootElement.focus();
                    }
                }
            };
            ToolbarControl.TOOLBAR_PANEL_ELEMENT_NAME = "_toolbarPanel";

            ToolbarControl.PanelTemplateIdPropertyName = "panelTemplateId";
            ToolbarControl.TitlePropertyName = "title";
            return ToolbarControl;
        })(Controls.Panel);
        Controls.ToolbarControl = ToolbarControl;

        ToolbarControl.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ToolbarControl.js.map

// ItemsControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var ItemsControl = (function (_super) {
            __extends(ItemsControl, _super);
            function ItemsControl(templateId) {
                _super.call(this, templateId);
            }
            ItemsControl.initialize = function () {
                Common.ObservableHelpers.defineProperty(ItemsControl, "items", "", function (obj, oldValue, newValue) {
                    return obj.onItemsChange(oldValue, newValue);
                });
                Common.ObservableHelpers.defineProperty(ItemsControl, "itemContainerControl", "", function (obj, oldValue, newValue) {
                    return obj.onItemContainerControlChange(oldValue, newValue);
                });
            };

            ItemsControl.prototype.getIndex = function (item) {
                F12.Tools.Utility.Assert.isTrue(!!this._collection, "Expecting a non-null collection in the ItemsControl");
                var index = this._collection.indexOf(item);
                if (index !== -1) {
                    return index;
                }
            };

            ItemsControl.prototype.getItem = function (index) {
                F12.Tools.Utility.Assert.isTrue(!!this._collection, "Expecting a non-null collection in the ItemsControl");
                return this._collection.getItem(index);
            };

            ItemsControl.prototype.getItemCount = function () {
                if (!this._collection) {
                    return 0;
                }

                return this._collection.length;
            };

            ItemsControl.prototype.onTooltipChangedOverride = function () {
                _super.prototype.onTooltipChangedOverride.call(this);
                this.updateTooltip(this.tooltip);
            };

            ItemsControl.prototype.disposeItemContainerOverride = function (control) {
            };

            ItemsControl.prototype.prepareItemContainerOverride = function (control, item) {
            };

            ItemsControl.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                this.panelRootElement = this.getNamedElement(ItemsControl.PanelRootElementName) || this.rootElement;
                F12.Tools.Utility.Assert.isTrue(!!this.panelRootElement, "Expecting a root element for the panel in ItemsControl.");
                this.updateTooltip(this.tooltip);

                this.regenerateItemControls();
            };

            ItemsControl.prototype.onTemplateChanging = function () {
                this.updateTooltip(null);
                this.removeAllItemControls();

                _super.prototype.onTemplateChanging.call(this);
            };

            ItemsControl.prototype.onItemsChangedOverride = function () {
            };

            ItemsControl.prototype.onItemContainerControlChangedOverride = function () {
            };

            ItemsControl.prototype.onCollectionChangedOverride = function (args) {
            };

            ItemsControl.prototype.onItemsChange = function (oldValue, newValue) {
                if (this._collectionChangedRegistration) {
                    this._collectionChangedRegistration.unregister();
                    this._collectionChangedRegistration = null;
                }

                this._collection = null;

                if (this.items) {
                    if (this.items.collectionChanged) {
                        this._collectionChangedRegistration = this.items.collectionChanged.addHandler(this.onCollectionChanged.bind(this));
                        this._collection = this.items;
                    } else {
                        this._collection = new Common.ObservableCollection(this.items);
                    }
                }

                this.regenerateItemControls();
                this.onItemsChangedOverride();
            };

            ItemsControl.prototype.onItemContainerControlChange = function (oldValue, newValue) {
                this._itemContainerClassType = null;
                this._itemContainerTemplateId = null;
                this._itemContainerIsTemplateControl = false;

                if (this.itemContainerControl) {
                    var parts = this.itemContainerControl.split(/[()]/, 2);
                    if (parts && parts.length > 0) {
                        var className = parts[0];
                        if (className) {
                            className = className.trim();
                        }

                        F12.Tools.Utility.Assert.isTrue(!!className, "Invalid itemContainerControl value. The control class name is required.");

                        var templateId = parts[1];
                        if (templateId) {
                            templateId = templateId.trim();
                        }

                        this._itemContainerClassType = Common.TemplateLoader.getControlType(className);
                        this._itemContainerTemplateId = templateId;
                        this._itemContainerIsTemplateControl = this._itemContainerClassType === Common.TemplateControl || this._itemContainerClassType.prototype instanceof Common.TemplateControl;
                    }
                }

                this.regenerateItemControls();
                this.onItemContainerControlChangedOverride();
            };

            ItemsControl.prototype.onCollectionChanged = function (args) {
                switch (args.action) {
                    case 0 /* Add */:
                        this.insertItemControls(args.newStartingIndex, args.newItems.length);
                        break;
                    case 3 /* Clear */:
                        this.removeAllItemControls();
                        break;
                    case 1 /* Remove */:
                        this.removeItemControls(args.oldStartingIndex, args.oldItems.length);
                        break;
                    case 2 /* Reset */:
                        this.regenerateItemControls();
                        break;
                }

                this.onCollectionChangedOverride(args);
            };

            ItemsControl.prototype.createItemControl = function (item) {
                var control = new this._itemContainerClassType(this._itemContainerTemplateId);

                this.prepareItemContainer(control, item);

                return control;
            };

            ItemsControl.prototype.disposeItemContainer = function (control) {
                this.disposeItemContainerOverride(control);

                if (control && control.model) {
                    control.model = null;
                }
            };

            ItemsControl.prototype.prepareItemContainer = function (control, item) {
                if (this._itemContainerIsTemplateControl) {
                    control.model = item;
                }

                this.prepareItemContainerOverride(control, item);
            };

            ItemsControl.prototype.regenerateItemControls = function () {
                this.removeAllItemControls();

                if (!this._collection) {
                    return;
                }

                this.insertItemControls(0, this._collection.length);
            };

            ItemsControl.prototype.insertItemControls = function (itemIndex, count) {
                if (!this._itemContainerClassType) {
                    return;
                }

                var end = itemIndex + count;
                F12.Tools.Utility.Assert.isTrue(end <= this._collection.length, "Unexpected range after inserting into items.");
                F12.Tools.Utility.Assert.isTrue(itemIndex <= this.panelRootElement.childElementCount, "Collection and child elements mismatch.");

                if (itemIndex === this.panelRootElement.childElementCount) {
                    for (var i = itemIndex; i < end; i++) {
                        var item = this._collection.getItem(i);
                        var control = this.createItemControl(item);
                        this.panelRootElement.appendChild(control.rootElement);
                    }
                } else {
                    var endNode = this.panelRootElement.childNodes.item(itemIndex);

                    for (var i = itemIndex; i < end; i++) {
                        var item = this._collection.getItem(i);
                        var control = this.createItemControl(item);
                        this.panelRootElement.insertBefore(control.rootElement, endNode);
                    }
                }
            };

            ItemsControl.prototype.removeAllItemControls = function () {
                if (this.panelRootElement) {
                    var children = this.panelRootElement.children;
                    var childrenLength = children.length;
                    for (var i = 0; i < childrenLength; i++) {
                        var control = children[i].control;
                        this.disposeItemContainer(control);
                    }

                    this.panelRootElement.innerHTML = "";
                }
            };

            ItemsControl.prototype.removeItemControls = function (itemIndex, count) {
                for (var i = itemIndex + count - 1; i >= itemIndex; i--) {
                    var element = this.panelRootElement.children[i];
                    if (element) {
                        var control = element.control;
                        this.disposeItemContainer(control);
                        this.panelRootElement.removeChild(element);
                    }
                }
            };

            ItemsControl.prototype.updateTooltip = function (tooltip) {
                if (this.panelRootElement) {
                    if (tooltip) {
                        this.panelRootElement.setAttribute("data-plugin-vs-tooltip", tooltip);
                        this.panelRootElement.setAttribute("aria-label", tooltip);
                    } else {
                        this.panelRootElement.removeAttribute("data-plugin-vs-tooltip");
                        this.panelRootElement.removeAttribute("aria-label");
                    }
                }
            };
            ItemsControl.PanelRootElementName = "_panel";
            return ItemsControl;
        })(Common.TemplateControl);
        Controls.ItemsControl = ItemsControl;

        ItemsControl.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ItemsControl.js.map

// RibbonControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var RibbonControl = (function (_super) {
            __extends(RibbonControl, _super);
            function RibbonControl(templateId) {
                var _this = this;
                this._currentOffset = 0;
                this._backwardScrollHandler = function () {
                    return _this.scrollBackward();
                };
                this._forwardScrollHandler = function () {
                    return _this.scrollForward();
                };
                this._onFocusInHandler = function (e) {
                    return _this.onFocusIn(e);
                };
                this._onFocusOutHandler = function (e) {
                    return _this.onFocusOut(e);
                };
                this._onKeyDownhandler = function (e) {
                    return _this.onKeyDown(e);
                };

                _super.call(this, templateId);

                this.selectedItem = null;
            }
            Object.defineProperty(RibbonControl.prototype, "selectedItem", {
                get: function () {
                    return this._selectedItem;
                },
                set: function (value) {
                    if (value !== this._selectedItem) {
                        var itemIndex = this.getItemCount() === 0 ? undefined : this.getIndex(value);
                        if (itemIndex !== undefined) {
                            this._selectedItem = value;
                            this.selectedIndex = itemIndex;
                        } else {
                            this._selectedItem = null;
                            this.selectedIndex = null;
                        }

                        this.propertyChanged.invoke(RibbonControl.SelectedItemPropertyName);
                    }
                },
                enumerable: true,
                configurable: true
            });

            RibbonControl.initialize = function () {
                Common.ObservableHelpers.defineProperty(RibbonControl, RibbonControl.IsVerticalPropertyName, false, function (obj) {
                    return obj.onIsVerticalChanged();
                });
                Common.ObservableHelpers.defineProperty(RibbonControl, RibbonControl.ScrollIncrementPropertyName, 1, function (obj) {
                    return obj.updateButtons();
                });
                Common.ObservableHelpers.defineProperty(RibbonControl, RibbonControl.ScrollPositionPropertyName, 0, function (obj) {
                    return obj.onScrollPositionChanged();
                });
                Common.ObservableHelpers.defineProperty(RibbonControl, RibbonControl.SelectedIndexPropertyName, null, function (obj, oldValue, newValue) {
                    return obj.onSelectedIndexChanged(oldValue, newValue);
                });
            };

            RibbonControl.prototype.scrollBackward = function () {
                this.scrollPosition = Math.max(this.scrollPosition - this.scrollIncrement, 0);
            };

            RibbonControl.prototype.scrollForward = function () {
                if (this.scrollPosition + this.scrollIncrement < this.getItemCount()) {
                    this.scrollPosition += this.scrollIncrement;
                }
            };

            RibbonControl.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                this._panelTabIndex = this.panelRootElement.tabIndex;
                this.panelRootElement.classList.add(RibbonControl.PANEL_CLASS);
                this.onIsVerticalChanged();

                this.initializeButtons();
                this.initializeKeyboard();
                this.refresh();
            };

            RibbonControl.prototype.onTemplateChanging = function () {
                if (this.panelRootElement) {
                    this.cleanupKeyboard();
                    this.cleanupButtons();

                    this.selectedIndex = null;
                    this.scrollPosition = 0;
                    this.panelRootElement.classList.remove(RibbonControl.HORIZONTAL_PANEL_CLASS);
                    this.panelRootElement.classList.remove(RibbonControl.PANEL_CLASS);
                    this._panelTabIndex = null;
                }

                _super.prototype.onTemplateChanging.call(this);
            };

            RibbonControl.prototype.onItemsChangedOverride = function () {
                _super.prototype.onItemsChangedOverride.call(this);
                this.resetState();
            };

            RibbonControl.prototype.onCollectionChangedOverride = function (args) {
                _super.prototype.onCollectionChangedOverride.call(this, args);
                this.resetState();
            };

            RibbonControl.prototype.refresh = function () {
                this.onScrollPositionChanged();
                this.displaySelected();
                this.updateButtons();
            };

            RibbonControl.prototype.onIsVerticalChanged = function () {
                this.setOffset(0);

                if (!this.isVertical) {
                    this._lengthProperty = "offsetWidth";
                    this._offsetProperty = "offsetLeft";
                    this._positioningProperty = "left";
                    this.panelRootElement.classList.add(RibbonControl.HORIZONTAL_PANEL_CLASS);
                } else {
                    this._lengthProperty = "offsetHeight";
                    this._offsetProperty = "offsetTop";
                    this._positioningProperty = "top";
                    this.panelRootElement.classList.remove(RibbonControl.HORIZONTAL_PANEL_CLASS);
                }

                this.refresh();
            };

            RibbonControl.prototype.onScrollPositionChanged = function () {
                this.updateButtons();

                if (this.getItemCount() === 0) {
                    F12.Tools.Utility.Assert.areEqual(0, this.scrollPosition);
                    this.setOffset(0);
                    return;
                }

                F12.Tools.Utility.Assert.isTrue(this.scrollPosition >= 0 && this.scrollPosition < this.getItemCount(), "Scrolled to invalid position");

                var displayChild = (this.panelRootElement.children[this.scrollPosition]);

                this.setOffset(this._currentOffset + displayChild[this._offsetProperty]);
            };

            RibbonControl.prototype.onSelectedIndexChanged = function (oldValue, newValue) {
                if (oldValue !== null && oldValue < this.getItemCount()) {
                    F12.Tools.Utility.Assert.isTrue(oldValue >= 0 && oldValue < this.getItemCount(), "Invalid existing index " + oldValue);
                    this.panelRootElement.children[oldValue].classList.remove(RibbonControl.SELECTED_ITEM_CLASS);
                }

                if (newValue === null) {
                    this.selectedItem = null;
                } else {
                    F12.Tools.Utility.Assert.isTrue(this.selectedIndex >= 0 && this.selectedIndex < this.getItemCount(), "Invalid new index " + this.selectedIndex);
                    this.selectedItem = this.getItem(newValue);
                }

                this.displaySelected();
            };

            RibbonControl.prototype.displaySelected = function () {
                if (this.selectedIndex !== null) {
                    var selectedElement = this.panelRootElement.children[this.selectedIndex];
                    F12.Tools.Utility.Assert.isTrue(!!selectedElement, "No HTML element for selected index: " + this.selectedIndex);

                    this.scrollIntoView(selectedElement);
                    selectedElement.classList.add(RibbonControl.SELECTED_ITEM_CLASS);
                }
            };

            RibbonControl.prototype.onFocusIn = function (e) {
                var itemIndex = 0;
                var numItems = this.panelRootElement.children.length;
                for (; itemIndex < numItems; itemIndex++) {
                    var itemElement = this.panelRootElement.children[itemIndex];
                    if (itemElement.contains(e.target)) {
                        this.makeTabbable(itemElement);
                        if (this.selectedIndex === itemIndex) {
                            this.displaySelected();
                        } else {
                            this.selectedIndex = itemIndex;
                        }

                        return;
                    }
                }

                if (this.selectedIndex !== null) {
                    e.preventDefault();
                    this.setFocus(this.panelRootElement.children[this.selectedIndex]);
                }
            };

            RibbonControl.prototype.onFocusOut = function (e) {
                if (!e.relatedTarget || (e.relatedTarget !== this.panelRootElement && !this.panelRootElement.contains(e.relatedTarget))) {
                    this.makeTabbable(this.panelRootElement);
                }
            };

            RibbonControl.prototype.onKeyDown = function (e) {
                var handled = false;
                var backwardKey = this.isVertical ? 38 /* ArrowUp */ : 37 /* ArrowLeft */;
                var forwardKey = this.isVertical ? 40 /* ArrowDown */ : 39 /* ArrowRight */;

                switch (e.keyCode) {
                    case forwardKey:
                        this.focusNext();
                        handled = true;
                        break;
                    case backwardKey:
                        this.focusPrevious();
                        handled = true;
                        break;
                }

                if (handled) {
                    e.stopImmediatePropagation();
                }

                return handled;
            };

            RibbonControl.prototype.focusPrevious = function () {
                var newIndex;

                if (this.getItemCount() > 0) {
                    if (this.selectedIndex === null) {
                        newIndex = this.getItemCount() - 1;
                    } else {
                        F12.Tools.Utility.Assert.isTrue((this.selectedIndex >= 0) && (this.selectedIndex < this.getItemCount()), "Invalid selected index");
                        newIndex = Math.max(this.selectedIndex - 1, 0);
                    }

                    this.setFocus(this.panelRootElement.children[newIndex]);
                }
            };

            RibbonControl.prototype.focusNext = function () {
                var newIndex;

                if (this.getItemCount() > 0) {
                    if (this.selectedIndex === null) {
                        newIndex = 0;
                    } else {
                        F12.Tools.Utility.Assert.isTrue((this.selectedIndex >= 0) && (this.selectedIndex < this.getItemCount()), "Invalid selected index");
                        newIndex = Math.min(this.selectedIndex + 1, this.getItemCount() - 1);
                    }

                    this.setFocus(this.panelRootElement.children[newIndex]);
                }
            };

            RibbonControl.prototype.scrollIntoView = function (element) {
                if (this.isForwardEdgeOutOfView(element)) {
                    for (var position = this.scrollPosition; position < this.getItemCount(); position += this.scrollIncrement) {
                        if (this.isInView(element, position)) {
                            this.scrollPosition = position;
                            return;
                        }
                    }

                    F12.Tools.Utility.Assert.fail("Could not find a scroll setting that brings element fully into view - is your scrollIncrement too big or your panel incorrectly sized?");
                } else if (this.isBackwardEdgeOutOfView(element)) {
                    for (var position = this.scrollPosition; position >= 0; position -= this.scrollIncrement) {
                        if (this.isInView(element, position)) {
                            this.scrollPosition = position;
                            return;
                        }
                    }

                    F12.Tools.Utility.Assert.fail("Could not find a scroll setting that brings element fully into view - is your scrollIncrement too big or your panel incorrectly sized?");
                }
            };

            RibbonControl.prototype.isInView = function (element, position) {
                return (!this.isForwardEdgeOutOfView(element, position) && !this.isBackwardEdgeOutOfView(element, position));
            };

            RibbonControl.prototype.isBackwardEdgeOutOfView = function (element, position) {
                if ((position === undefined) || (position === null)) {
                    position = this.scrollPosition;
                }

                var relativeOffset = element[this._offsetProperty] - this.panelRootElement.children[position][this._offsetProperty];

                return (relativeOffset < 0);
            };

            RibbonControl.prototype.isForwardEdgeOutOfView = function (element, position) {
                if ((position === undefined) || (position === null)) {
                    position = this.scrollPosition;
                }

                var positionedChild = this.panelRootElement.children[position];

                var elementEnd = element[this._offsetProperty] + element[this._lengthProperty];
                var relativeEndOffset = positionedChild[this._offsetProperty] + this.panelRootElement[this._lengthProperty] - elementEnd;

                return (relativeEndOffset < 0);
            };

            RibbonControl.prototype.updateButtons = function () {
                if (this._backwardScrollButton) {
                    F12.Tools.Utility.Assert.hasValue(this._forwardScrollButton);
                    this._backwardScrollButton.isEnabled = (this.scrollPosition > 0);
                    this._forwardScrollButton.isEnabled = (this.scrollPosition + this.scrollIncrement < this.getItemCount());
                }
            };

            RibbonControl.prototype.makeTabbable = function (element) {
                this.panelRootElement.removeAttribute("tabIndex");
                if (this.selectedIndex !== null) {
                    this.panelRootElement.children[this.selectedIndex].removeAttribute("tabIndex");
                }

                F12.Tools.Utility.Assert.hasValue(this._panelTabIndex);
                element.tabIndex = this._panelTabIndex;
            };

            RibbonControl.prototype.setOffset = function (offset) {
                this._currentOffset = offset;
                var children = this.panelRootElement.children;

                for (var i = 0; i < children.length; i++) {
                    children[i].style[this._positioningProperty] = (-offset) + "px";
                }
            };

            RibbonControl.prototype.setFocus = function (element) {
                if (!element.contains(document.activeElement)) {
                    element.focus();

                    this.panelRootElement.scrollLeft = 0;
                    this.panelRootElement.scrollTop = 0;
                }
            };

            RibbonControl.prototype.resetState = function () {
                this.selectedIndex = null;
                this.scrollPosition = 0;
                this.refresh();
            };

            RibbonControl.prototype.initializeButtons = function () {
                this._backwardScrollButton = this.getNamedControl(RibbonControl.BackwardScrollButtonName);
                F12.Tools.Utility.Assert.hasValue(this._backwardScrollButton, "RibbonControl template must have a backward button control named " + RibbonControl.BackwardScrollButtonName + " as a direct child");
                this._forwardScrollButton = this.getNamedControl(RibbonControl.ForwardScrollButtonName);
                F12.Tools.Utility.Assert.hasValue(this._backwardScrollButton, "RibbonControl template must have a forward button control named " + RibbonControl.ForwardScrollButtonName + " as a direct child");

                this._backwardScrollButton.click.addHandler(this._backwardScrollHandler);
                this._forwardScrollButton.click.addHandler(this._forwardScrollHandler);

                this.updateButtons();
            };

            RibbonControl.prototype.cleanupButtons = function () {
                if (this._backwardScrollButton) {
                    F12.Tools.Utility.Assert.hasValue(this._forwardScrollButton);
                    this._backwardScrollButton.isEnabled = false;
                    this._forwardScrollButton.isEnabled = false;
                    this._backwardScrollButton.click.removeHandler(this._backwardScrollHandler);
                    this._forwardScrollButton.click.removeHandler(this._forwardScrollHandler);
                    this._backwardScrollButton = null;
                    this._forwardScrollButton = null;
                }
            };

            RibbonControl.prototype.initializeKeyboard = function () {
                this.rootElement.removeAttribute("tabIndex");
                this._backwardScrollButton.rootElement.removeAttribute("tabIndex");
                this._forwardScrollButton.rootElement.removeAttribute("tabIndex");

                this.getNamedElement(Controls.ItemsControl.PanelRootElementName).addEventListener("focusin", this._onFocusInHandler);
                this.getNamedElement(Controls.ItemsControl.PanelRootElementName).addEventListener("focusout", this._onFocusOutHandler);
                this.getNamedElement(Controls.ItemsControl.PanelRootElementName).addEventListener("keydown", this._onKeyDownhandler);
            };

            RibbonControl.prototype.cleanupKeyboard = function () {
                this.getNamedElement(Controls.ItemsControl.PanelRootElementName).removeEventListener("focusin", this._onFocusInHandler);
                this.getNamedElement(Controls.ItemsControl.PanelRootElementName).removeEventListener("focusout", this._onFocusOutHandler);
                this.getNamedElement(Controls.ItemsControl.PanelRootElementName).removeEventListener("keydown", this._onKeyDownhandler);
            };
            RibbonControl.HORIZONTAL_PANEL_CLASS = "BPT-horizontalRibbonPanel";
            RibbonControl.PANEL_CLASS = "BPT-ribbonPanel";
            RibbonControl.SELECTED_ITEM_CLASS = "BPT-selected";

            RibbonControl.BackwardScrollButtonName = "_backwardScrollButton";
            RibbonControl.ForwardScrollButtonName = "_forwardScrollButton";
            RibbonControl.IsVerticalPropertyName = "isVertical";
            RibbonControl.ScrollIncrementPropertyName = "scrollIncrement";
            RibbonControl.ScrollPositionPropertyName = "scrollPosition";
            RibbonControl.SelectedIndexPropertyName = "selectedIndex";
            RibbonControl.SelectedItemPropertyName = "selectedItem";
            return RibbonControl;
        })(Controls.ItemsControl);
        Controls.RibbonControl = RibbonControl;

        RibbonControl.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/RibbonControl.js.map

// ColorUtilities.ts
var Common;
(function (Common) {
    "use strict";

    var RgbaColor = (function () {
        function RgbaColor(red, green, blue, alpha) {
            this.red = red;
            this.green = green;
            this.blue = blue;
            this.alpha = alpha;
            this.assertValid();
        }
        RgbaColor.getString = function (color) {
            var rgba = new RgbaColor(0, 0, 0, 0);
            rgba.setFromString(color);

            var normalizedString = RgbaColor.DUMMY_ELEMENT.style.color;
            if ((!normalizedString) || (normalizedString === "inherit") || (normalizedString === "currentColor") || (normalizedString === "invert")) {
                return "";
            }

            return rgba.toString();
        };

        RgbaColor.prototype.setFromString = function (color) {
            RgbaColor.DUMMY_ELEMENT.style.color = "";
            RgbaColor.DUMMY_ELEMENT.style.color = color;
            var normalizedString = RgbaColor.DUMMY_ELEMENT.style.color;
            if ((!normalizedString) || (normalizedString === "inherit") || (normalizedString === "currentColor") || (normalizedString === "invert")) {
                return false;
            } else if (normalizedString === "transparent") {
                return this.setFromRgba(this.red, this.green, this.blue, 0);
            }

            var computedString = document.parentWindow.getComputedStyle(RgbaColor.DUMMY_ELEMENT).color;
            for (var i = 0; i < RgbaColor.RGBA_REGEXPS.length; i++) {
                var result = RgbaColor.RGBA_REGEXPS[i].exec(computedString);
                if (result !== null) {
                    return this.setFromRgba(this.toNumber(RegExp["$1"]), this.toNumber(RegExp["$2"]), this.toNumber(RegExp["$3"]), RegExp["$4"] ? this.toNumber(RegExp["$4"]) : 1);
                }
            }

            F12.Tools.Utility.Assert.fail("Unexpected computed color string format");
            return false;
        };

        RgbaColor.prototype.setFromHsla = function (hsla) {
            hsla.assertValid();

            var m1;
            var m2;

            var h = hsla.hue / 360;
            var s = hsla.saturation / 100;
            var l = hsla.lightness / 100;

            if (l <= 0.5) {
                m2 = l * (s + 1);
            } else {
                m2 = l + s - l * s;
            }

            m1 = l * 2 - m2;

            return this.setFromRgba(Math.round(this.hslToRgbHelper(m1, m2, h + 1 / 3) * 255), Math.round(this.hslToRgbHelper(m1, m2, h) * 255), Math.round(this.hslToRgbHelper(m1, m2, h - 1 / 3) * 255), hsla.alpha);
        };

        RgbaColor.prototype.setFromRgba = function (red, green, blue, alpha) {
            if ((this.red !== red) || (this.green !== green) || (this.blue !== blue) || (this.alpha !== alpha)) {
                this.red = red;
                this.green = green;
                this.blue = blue;
                this.alpha = alpha;
                this.assertValid();
                return true;
            }

            return false;
        };

        RgbaColor.prototype.toString = function () {
            if (this.alpha === 0) {
                return RgbaColor.TRANSPARENT_STRING;
            }

            return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
        };

        RgbaColor.prototype.assertValid = function () {
            F12.Tools.Utility.Assert.isTrue((this.red >= 0) && (this.red <= 255), "Invalid red channel");
            F12.Tools.Utility.Assert.isTrue((this.green >= 0) && (this.green <= 255), "Invalid green channel");
            F12.Tools.Utility.Assert.isTrue((this.blue >= 0) && (this.blue <= 255), "Invalid blue channel");
            F12.Tools.Utility.Assert.isTrue((this.alpha >= 0) && (this.alpha <= 1), "Invalid alpha");
        };

        RgbaColor.prototype.hslToRgbHelper = function (m1, m2, h) {
            if (h < 0) {
                h = h + 1;
            }
            if (h > 1) {
                h = h - 1;
            }
            if (h * 6 < 1) {
                return m1 + (m2 - m1) * h * 6;
            }
            if (h * 2 < 1) {
                return m2;
            }
            if (h * 3 < 2) {
                return m1 + (m2 - m1) * (2 / 3 - h) * 6;
            }
            return m1;
        };

        RgbaColor.prototype.toNumber = function (value) {
            return +value;
        };
        RgbaColor.DUMMY_ELEMENT = document.createElement("div");
        RgbaColor.RGBA_REGEXPS = [
            /^ *rgba\(([0-9]+), *([0-9]+), *([0-9]+), *([0-9.]+)\) *$/,
            /^ *rgb\(([0-9]+), *([0-9]+), *([0-9]+)\) *$/
        ];
        RgbaColor.TRANSPARENT_STRING = "rgba(0, 0, 0, 0)";
        return RgbaColor;
    })();
    Common.RgbaColor = RgbaColor;

    var HslaColor = (function () {
        function HslaColor(hue, saturation, lightness, alpha) {
            this.hue = hue;
            this.saturation = saturation;
            this.lightness = lightness;
            this.alpha = alpha;
            this.assertValid();
        }
        HslaColor.prototype.setFromRgba = function (rgba) {
            rgba.assertValid();

            var red = rgba.red / 255;
            var green = rgba.green / 255;
            var blue = rgba.blue / 255;

            var hue;
            var saturation;
            var lightness;
            var alpha = rgba.alpha;

            var max = Math.max(red, green, blue);
            var min = Math.min(red, green, blue);
            var chroma = max - min;

            lightness = Math.round(0.5 * (max + min) * 100);

            if (chroma === 0) {
                saturation = 0;
                hue = this.hue;
            } else {
                var hueProportion;
                if (red === max) {
                    hueProportion = ((green - blue) / chroma) % 6;
                } else if (green === max) {
                    hueProportion = ((blue - red) / chroma) + 2;
                } else {
                    F12.Tools.Utility.Assert.areEqual(blue, max);
                    hueProportion = ((red - green) / chroma) + 4;
                }

                hue = Math.round((hueProportion * 60) + 360) % 360;
                saturation = Math.round(chroma / (1 - Math.abs(max + min - 1)) * 100);
            }

            return this.setFromHsla(hue, saturation, lightness, alpha);
        };

        HslaColor.prototype.setFromHsla = function (hue, saturation, lightness, alpha) {
            if ((this.hue !== hue) || (this.saturation !== saturation) || (this.lightness !== lightness) || (this.alpha !== alpha)) {
                this.hue = hue;
                this.saturation = saturation;
                this.lightness = lightness;
                this.alpha = alpha;
                this.assertValid();
                return true;
            }

            return false;
        };

        HslaColor.prototype.assertValid = function () {
            F12.Tools.Utility.Assert.isTrue((this.hue >= 0) && (this.hue < 360), "Invalid hue");
            F12.Tools.Utility.Assert.isTrue((this.saturation >= 0) && (this.saturation <= 100), "Invalid saturation");
            F12.Tools.Utility.Assert.isTrue((this.lightness >= 0) && (this.lightness <= 100), "Invalid lightness");
            F12.Tools.Utility.Assert.isTrue((this.alpha >= 0) && (this.alpha <= 1), "Invalid alpha");
        };
        return HslaColor;
    })();
    Common.HslaColor = HslaColor;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ColorPicker/ColorUtilities.js.map

// ColorSlidersControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    "use strict";

    var ColorSlidersConverters = (function () {
        function ColorSlidersConverters() {
        }
        ColorSlidersConverters.initialize = function () {
            ColorSlidersConverters.AlphaConverter = ColorSlidersConverters.getAlphaConverter();
        };

        ColorSlidersConverters.getAlphaConverter = function () {
            return {
                convertTo: function (from) {
                    return (from * 100).toString();
                },
                convertFrom: function (from) {
                    return from / 100;
                }
            };
        };
        return ColorSlidersConverters;
    })();
    Common.ColorSlidersConverters = ColorSlidersConverters;

    ColorSlidersConverters.initialize();
})(Common || (Common = {}));

var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var ColorPickerSlidersControl = (function (_super) {
            __extends(ColorPickerSlidersControl, _super);
            function ColorPickerSlidersControl(templateId) {
                this._rgba = new Common.RgbaColor(0, 0, 0, 1.00);
                this._hsla = new Common.HslaColor(180, 0, 0, 1.00);
                this._color = "rgba(0, 0, 0, 1)";
                _super.call(this, templateId || "Common.slidersPaneTemplate");
            }
            Object.defineProperty(ColorPickerSlidersControl.prototype, "color", {
                get: function () {
                    return this._color;
                },
                set: function (value) {
                    if ((value) && (value !== this._color)) {
                        this._color = value;

                        if (this._rgba.setFromString(value)) {
                            if (this._hsla.setFromRgba(this._rgba)) {
                                this.propertyChanged.invoke(ColorPickerSlidersControl.HuePropertyName);
                                this.propertyChanged.invoke(ColorPickerSlidersControl.SaturationPropertyName);
                                this.propertyChanged.invoke(ColorPickerSlidersControl.LightnessPropertyName);
                                this.propertyChanged.invoke(ColorPickerSlidersControl.AlphaPropertyName);
                            }
                        }

                        this.propertyChanged.invoke(ColorPickerSlidersControl.ColorPropertyName);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ColorPickerSlidersControl.prototype, "hue", {
                get: function () {
                    return this._hsla.hue;
                },
                set: function (value) {
                    if (value !== this._hsla.hue) {
                        this._hsla.hue = value;

                        if (this._rgba.setFromHsla(this._hsla)) {
                            this._color = this._rgba.toString();
                            this.propertyChanged.invoke(ColorPickerSlidersControl.ColorPropertyName);
                        }

                        this.propertyChanged.invoke(ColorPickerSlidersControl.HuePropertyName);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ColorPickerSlidersControl.prototype, "saturation", {
                get: function () {
                    return this._hsla.saturation;
                },
                set: function (value) {
                    if (value !== this._hsla.saturation) {
                        this._hsla.saturation = value;

                        if (this._rgba.setFromHsla(this._hsla)) {
                            this._color = this._rgba.toString();
                            this.propertyChanged.invoke(ColorPickerSlidersControl.ColorPropertyName);
                        }

                        this.propertyChanged.invoke(ColorPickerSlidersControl.SaturationPropertyName);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ColorPickerSlidersControl.prototype, "lightness", {
                get: function () {
                    return this._hsla.lightness;
                },
                set: function (value) {
                    if (value !== this._hsla.lightness) {
                        this._hsla.lightness = value;

                        if (this._rgba.setFromHsla(this._hsla)) {
                            this._color = this._rgba.toString();
                            this.propertyChanged.invoke(ColorPickerSlidersControl.ColorPropertyName);
                        }

                        this.propertyChanged.invoke(ColorPickerSlidersControl.LightnessPropertyName);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ColorPickerSlidersControl.prototype, "alpha", {
                get: function () {
                    return this._hsla.alpha;
                },
                set: function (value) {
                    if (value !== this._hsla.alpha) {
                        this._hsla.alpha = value;

                        if (this._rgba.setFromHsla(this._hsla)) {
                            this._color = this._rgba.toString();
                            this.propertyChanged.invoke(ColorPickerSlidersControl.ColorPropertyName);
                        }

                        this.propertyChanged.invoke(ColorPickerSlidersControl.AlphaPropertyName);
                    }
                },
                enumerable: true,
                configurable: true
            });
            ColorPickerSlidersControl.DUMMY_ELEMENT = document.createElement("div");
            ColorPickerSlidersControl.RGBA_REGEXPS = [
                /^ *rgba\(([0-9]+), *([0-9]+), *([0-9]+), *([0-9.]+)\) *$/,
                /^ *rgb\(([0-9]+), *([0-9]+), *([0-9]+)\) *$/
            ];

            ColorPickerSlidersControl.AlphaPropertyName = "alpha";
            ColorPickerSlidersControl.ColorPropertyName = "color";
            ColorPickerSlidersControl.HuePropertyName = "hue";
            ColorPickerSlidersControl.LightnessPropertyName = "lightness";
            ColorPickerSlidersControl.SaturationPropertyName = "saturation";
            return ColorPickerSlidersControl;
        })(Common.TemplateControl);
        Controls.ColorPickerSlidersControl = ColorPickerSlidersControl;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ColorPicker/ColorSlidersControl.js.map

// ColorPickerControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var ColorPickerControl = (function (_super) {
            __extends(ColorPickerControl, _super);
            function ColorPickerControl(templateId) {
                _super.call(this, templateId || "Common.defaultColorPickerTemplate");

                this.color = "rgba(0, 0, 0, 1)";
                this.paletteColors = new Common.ObservableCollection();
                this.dismissOnTargetButtonClick = true;
            }
            Object.defineProperty(ColorPickerControl.prototype, "color", {
                get: function () {
                    return this._color;
                },
                set: function (value) {
                    if (value && value !== this._color) {
                        this._color = value;
                        this.propertyChanged.invoke(ColorPickerControl.ColorPropertyName);
                    }
                },
                enumerable: true,
                configurable: true
            });

            ColorPickerControl.initialize = function () {
                Common.ObservableHelpers.defineProperty(ColorPickerControl, ColorPickerControl.CancellationColorPropertyName, null);
                Common.ObservableHelpers.defineProperty(ColorPickerControl, ColorPickerControl.IsCompactViewPropertyName, false, function (obj) {
                    return obj.onIsCompactViewChanged();
                });
                Common.ObservableHelpers.defineProperty(ColorPickerControl, ColorPickerControl.IsEyedropperActivePropertyName, false, function (obj) {
                    return obj.onIsEyedropperActiveChanged();
                });
                Common.ObservableHelpers.defineProperty(ColorPickerControl, ColorPickerControl.IsPaletteLoadingPropertyName, false);
                Common.ObservableHelpers.defineProperty(ColorPickerControl, ColorPickerControl.IsSlidersShownPropertyName, false, function (obj) {
                    return obj.onIsSlidersShownChanged();
                });
                Common.ObservableHelpers.defineProperty(ColorPickerControl, ColorPickerControl.PaletteColorsPropertyName, null);
            };

            ColorPickerControl.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                this._palette = this.getNamedControl(ColorPickerControl.PALETTE_NAME);
                F12.Tools.Utility.Assert.hasValue(this._palette, "Color picker template must have a ribbon control named " + ColorPickerControl.PALETTE_NAME);
            };

            ColorPickerControl.prototype.onTemplateChanging = function () {
                if (this._palette) {
                    this._palette = null;
                }

                _super.prototype.onTemplateChanging.call(this);
            };

            ColorPickerControl.prototype.onIsVisibleChangedOverride = function () {
                _super.prototype.onIsVisibleChangedOverride.call(this);
                if (this.isVisible) {
                    this.cancellationColor = this.color;
                    this._palette.refresh();
                } else {
                    this.cancellationColor = null;
                }
            };

            ColorPickerControl.prototype.onKeyUpOverride = function (e) {
                _super.prototype.onKeyUpOverride.call(this, e);

                var handled = this.onCustomKeyUp ? this.onCustomKeyUp(e) : false;
                if (!handled) {
                    switch (e.keyCode) {
                        case 27 /* Escape */:
                            this.color = this.cancellationColor;
                            this.isVisible = false;
                            return true;
                        case 13 /* Enter */:
                            this.isVisible = false;
                            return true;
                    }
                }

                return false;
            };

            ColorPickerControl.prototype.onIsCompactViewChanged = function () {
                var colorPane = this.getNamedElement("selectedColorPane");
                if (colorPane) {
                    if (this.isCompactView) {
                        colorPane.classList.add(Common.TemplateControl.CLASS_HIDDEN);
                        colorPane.setAttribute("aria-hidden", "true");
                    } else {
                        colorPane.classList.remove(Common.TemplateControl.CLASS_HIDDEN);
                        colorPane.removeAttribute("aria-hidden");
                    }
                }
            };

            ColorPickerControl.prototype.onIsEyedropperActiveChanged = function () {
                this.keepVisibleOnBlur = this.isEyedropperActive;
            };

            ColorPickerControl.prototype.onIsSlidersShownChanged = function () {
                this.updateSlidersMaxHeight();
            };

            ColorPickerControl.prototype.updateSlidersMaxHeight = function () {
                var slidersPane = this.getNamedElement(ColorPickerControl.SLIDERS_CONTROL_NAME);
                if (!slidersPane) {
                    return;
                }

                var viewportTop = this.viewportMargin ? (this.viewportMargin.top || 0) : 0;
                var viewportBottom = window.innerHeight - (this.viewportMargin ? (this.viewportMargin.bottom || 0) : 0);

                slidersPane.style.maxHeight = "";
                this.updatePopupPosition();

                var slidersPaneRect = slidersPane.getBoundingClientRect();
                var overflowDelta = Math.floor(slidersPaneRect.bottom) - viewportBottom;
                if (overflowDelta > 0) {
                    if (this.targetButtonElement) {
                        var targetRect = this.targetButtonElement.getBoundingClientRect();

                        var aboveSpace = Math.abs(targetRect.top - viewportTop);
                        var belowSpace = Math.abs(targetRect.bottom - viewportBottom);

                        if (aboveSpace > belowSpace) {
                            var colorPickerRect = this.rootElement.getBoundingClientRect();
                            overflowDelta = Math.max(0, Math.floor(viewportTop + colorPickerRect.height - targetRect.top));
                        }
                    }

                    var proposedSlidersPaneHeight = slidersPane.scrollHeight - overflowDelta;
                    slidersPane.style.maxHeight = Math.max(30, proposedSlidersPaneHeight) + "px";
                } else {
                    slidersPane.style.maxHeight = "";
                }

                this.updatePopupPosition();
            };
            ColorPickerControl.PALETTE_NAME = "_colorPalette";
            ColorPickerControl.SLIDERS_CONTROL_NAME = "slidersPane";

            ColorPickerControl.CancellationColorPropertyName = "cancellationColor";
            ColorPickerControl.ColorPropertyName = "color";
            ColorPickerControl.IsCompactViewPropertyName = "isCompactView";
            ColorPickerControl.IsEyedropperActivePropertyName = "isEyedropperActive";
            ColorPickerControl.IsPaletteLoadingPropertyName = "isPaletteLoading";
            ColorPickerControl.IsSlidersShownPropertyName = "isSlidersShown";
            ColorPickerControl.PaletteColorsPropertyName = "paletteColors";
            return ColorPickerControl;
        })(Controls.PopupControl);
        Controls.ColorPickerControl = ColorPickerControl;

        ColorPickerControl.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ColorPicker/ColorPickerControl.js.map

// channel.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    "use strict";
    var Channel = (function () {
        function Channel(traceWriter) {
            this._uid = 0;
            this._handlers = [];
            this._processors = [];
            this._callbacks = {};
            this._pendingMessages = [];
            this._pendingTimeout = null;
            this._traceWriter = traceWriter;
        }
        Channel.prototype.post = function (engine, message) {
            var messages = [message];
            var i, n;
            for (i = 0, n = this._processors.length; i < n; i++) {
                var p = this._processors[i];
                var generated = [];
                var j, o;
                for (j = 0, o = messages.length; j < o; j++) {
                    var m = messages[j];
                    var result = p.processor(m);
                    generated = generated.concat(result);
                }

                messages = generated;
            }

            for (i = 0, n = messages.length; i < n; i++) {
                var m = messages[i];
                this.runSendMessage(engine.engineId, engine.portName, m);
            }
        };

        Channel.prototype.loadScript = function (engineId, fileName) {
            throw new Error("Not implemented");
        };

        Channel.prototype.runSendMessage = function (engineId, portName, message) {
            throw new Error("Not implemented");
        };

        Channel.prototype.call = function (engine, command, args, callback, preMessageCallback) {
            var _this = this;
            var uidString = this.getUid();

            if (callback) {
                this._callbacks[uidString] = { synced: true, callback: callback || null };
            }

            var callbackUids = [];
            var newArgs = [];
            if (args) {
                for (var i = 0; i < args.length; i++) {
                    if (typeof (args[i]) === "function") {
                        var callbackuid = this.getUid();
                        callbackUids.push(callbackuid);
                        this._callbacks[callbackuid] = { synced: false, callback: args[i] };

                        newArgs[i] = {
                            uid: callbackuid,
                            type: "callback"
                        };
                    } else {
                        newArgs[i] = args[i];
                    }
                }
            }

            var jsonObj = {
                uid: uidString,
                command: command,
                args: newArgs
            };

            var sendMessageToRemote = function (engine, message, preMessageCallback) {
                if (preMessageCallback) {
                    preMessageCallback(message, args[0]);
                }

                try  {
                    _this.post(engine, message);
                } catch (e) {
                    return;
                }
            };

            if (!this._pendingMessages[engine.engineId]) {
                this._pendingMessages[engine.engineId] = {};
            }

            var engineMessages = this._pendingMessages[engine.engineId];
            if (!engineMessages[engine.portName]) {
                engineMessages[engine.portName] = [];
            }

            engineMessages[engine.portName].push(jsonObj);
            if (!this._pendingTimeout) {
                this._pendingTimeout = setTimeout(function () {
                    for (var engineId in _this._pendingMessages) {
                        var portName;
                        var engineMessages = _this._pendingMessages[engineId];
                        for (portName in engineMessages) {
                            var messages = engineMessages[portName];
                            if (messages.length > 0) {
                                var json = JSON.stringify(messages);
                                engineMessages[portName] = [];
                                _this._pendingTimeout = null;
                                sendMessageToRemote({ engineId: +engineId, portName: portName }, json, preMessageCallback);
                            }
                        }
                    }
                }, 0);
            }

            return callbackUids;
        };

        Channel.prototype.onmessage = function (data) {
            this._traceWriter.raiseEvent(405 /* Console_Message_Start */);
            window.msWriteProfilerMark("ConsoleWindow:BeginOnMessage");

            var m = {
                engine: { engineId: data.engineId, portName: data.portName },
                data: data.data,
                handled: false
            };

            try  {
                var i, n;
                for (i = 0, n = this._handlers.length; i < n; i++) {
                    var h = this._handlers[i];
                    h.handler(m);
                    if (m.handled) {
                        return;
                    }
                }

                this.fireCallbacks(m);
            } finally {
                window.msWriteProfilerMark("ConsoleWindow:EndOnMessage");
                this._traceWriter.raiseEvent(406 /* Console_Message_Stop */);
            }
        };

        Channel.prototype.getUid = function () {
            return "uid" + (this._uid++).toString(36);
        };

        Channel.prototype.addCallback = function (uid, callback) {
            this._callbacks[uid] = callback;
        };

        Channel.prototype.addMessageProcessor = function (stepName, processor) {
            this._processors.push({
                stepName: stepName,
                processor: processor
            });
        };

        Channel.prototype.addMessageHandler = function (stepName, handler) {
            this._handlers.push({
                stepName: stepName,
                handler: handler
            });
        };

        Channel.prototype.clearCallbacks = function () {
            this._callbacks = {};
        };

        Channel.prototype.fireCallbacks = function (message) {
            var msgs = JSON.parse(message.data);
            for (var i = 0; i < msgs.length; i++) {
                var obj = msgs[i];
                if (obj && obj.args) {
                    obj.args.push(message.engine);
                }

                if (this._callbacks[obj.uid]) {
                    this._callbacks[obj.uid].callback.apply(this, obj.args);

                    if (this._callbacks[obj.uid] && this._callbacks[obj.uid].synced) {
                        delete this._callbacks[obj.uid];
                    }
                } else if (obj.uid === "scriptError") {
                    Common.ErrorHandling.reportErrorDetails(obj.args[0]);
                }
            }

            return message;
        };
        return Channel;
    })();
    Common.Channel = Channel;

    var VSChannel = (function (_super) {
        __extends(VSChannel, _super);
        function VSChannel(proxy, traceWriter) {
            _super.call(this, traceWriter);
            this._proxy = proxy;
            this._proxy.addEventListener("message", this.onmessage.bind(this));
        }
        VSChannel.prototype.runSendMessage = function (engineId, portName, message) {
            return this._proxy._post("sendMessage", engineId, portName, message);
        };

        VSChannel.prototype.loadScript = function (engineId, fileName) {
            this._proxy._post("loadScript", engineId, fileName);
        };
        return VSChannel;
    })(Channel);
    Common.VSChannel = VSChannel;

    var IEChannel = (function (_super) {
        __extends(IEChannel, _super);
        function IEChannel(external, traceWriter) {
            _super.call(this, traceWriter);
            this._external = external;
            this._external.addEventListener("connect", this.onConnect.bind(this));
        }
        IEChannel.prototype.runSendMessage = function (engineId, portName, message) {
            this._port.postMessage(message);
        };

        IEChannel.prototype.loadScript = function (engineId, fileName) {
            this._external.loadScriptInProc(fileName);
        };

        IEChannel.prototype.onConnect = function (port) {
            this._port = port;
            this._port.addEventListener("message", this.onmessage.bind(this));
        };
        return IEChannel;
    })(Channel);
    Common.IEChannel = IEChannel;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/channel.js.map

// Common.templates.ts
var ControlTemplates;
(function (ControlTemplates) {
    var Common = (function () {
        function Common() {
        }
        Common.defaultButtonTemplate = "\
<div class=\"BPT-button\" tabindex=\"1\"></div>\
";
        Common.iconButton24x24 = "\
<div class=\"BPT-button iconButton24x24\" tabindex=\"1\">\
  <span class=\"buttonIcon\"></span>\
</div>\
";
        Common.menuButton33x24 = "\
<div class=\"BPT-button menuButton33x24\" tabindex=\"1\">\
  <span class=\"buttonIcon\"></span>\
</div>\
";
        Common.menuButton33x24x5 = "\
<div class=\"BPT-button menuButton33x24 imageStates5\" tabindex=\"1\">\
  <span class=\"buttonIcon\"></span>\
</div>\
";
        Common.iconButton = "\
<div class=\"BPT-button iconButton\" tabindex=\"1\">\
  <span class=\"buttonIcon\"></span>\
</div>\
";
        Common.labeledIconButton = "\
<div class=\"BPT-button labeledIconButton\" tabindex=\"1\">\
  <span class=\"buttonIcon\"></span>\
  <span class=\"buttonText\" data-controlbinding=\"innerText:content\"></span>\
</div>\
";
        Common.defaultToolbarTemplate = "\
<div class=\"BPT-Toolbar\" role=\"toolbar\">\
  <div class=\"BPT-ToolbarContents\">\
    <span class=\"BPT-ToolTitle\" data-controlbinding=\"innerText:title,                                            attr-aria-label:title\"></span>\
    <div data-name=\"_toolbarPanel\" data-control=\"Common.TemplateControl\" data-controlbinding=\"model:model,                                           templateId:panelTemplateId\" data-options=\"className:buttons\"></div>\
  </div>\
</div>\
";
        Common.toolbarTemplateWithSearchBox = "\
<div class=\"BPT-Toolbar\" role=\"toolbar\">\
  <div class=\"BPT-ToolbarContents\">\
    <span class=\"BPT-ToolTitle\" data-controlbinding=\"innerText:title,                                            attr-aria-label:title\"></span>\
    <div data-name=\"_toolbarPanel\" data-control=\"Common.TemplateControl\" data-controlbinding=\"model:model,                                           templateId:panelTemplateId\" data-options=\"className:buttons\"></div>\
    <div id=\"searchBoxBorder\" class=\"BPT-SearchBox-Border\">\
      <input type=\"text\" id=\"searchbox\" class=\"BPT-SearchBox\" tabindex=\"1\" role=\"search\" />\
      <div id=\"searchPreviousResult\" class=\"BPT-Search-Button\" role=\"button\" tabindex=\"1\">\
        <div class=\"BPT-Search-Previous\"></div>\
      </div>\
      <div id=\"searchNextResult\" class=\"BPT-Search-Button\" role=\"button\" tabindex=\"1\">\
        <div class=\"BPT-Search-Next\"></div>\
      </div>\
    </div>\
  </div>\
</div>\
";
        Common.menuControlTemplate = "\
<div class=\"BPT-menuControl\" role=\"menu\">\
  <div data-control=\"Common.TemplateControl\" data-controlbinding=\"model:model,                                       templateId:menuItemsTemplateId\" data-options=\"className:BPT-menuContent\"></div>\
</div>\
";
        Common.menuItemTemplate = "\
<li class=\"menuItem\" role=\"menuitem\" tabindex=\"0\" data-controlbinding=\"attr-aria-label:tooltip,                                   attr-data-plugin-vs-tooltip:tooltip\">\
  <div class=\"gutter\"></div>\
  <span data-controlbinding=\"innerText:content,                                        attr-aria-label:content\"></span>\
</li>\
";
        Common.menuItemCheckMarkTemplate = "\
<li class=\"menuItem\" role=\"menuitemcheckbox\" tabindex=\"0\" data-controlbinding=\"attr-aria-label:tooltip,                                   attr-data-plugin-vs-tooltip:tooltip\">\
  <img class=\"menuToggleItem gutter\" data-options=\"src:plugin-menu-item-checkmark; converter=Common.CommonConverters.ThemedImageConverter\" />\
  <span data-controlbinding=\"innerText:content,                                        attr-aria-label:content\"></span>\
</li>\
";
        Common.menuItemCheckBoxTemplate = "\
<li class=\"menuItem\" role=\"menuitemcheckbox\" tabindex=\"0\" data-controlbinding=\"attr-aria-label:tooltip,                                   attr-data-plugin-vs-tooltip:tooltip\">\
  <input type=\"checkbox\" tabindex=\"-1\" data-name=\"BPT-menuItemCheckBox\" data-controlbinding=\"checked:isChecked; mode=twoway\" />\
  <span data-controlbinding=\"innerText:content,                                        attr-aria-label:content\"></span>\
</li>\
";
        Common.menuItemComboBoxTemplate = "\
<li class=\"menuItem comboBoxMenuItem\" role=\"menuitem\" tabindex=\"-1\">\
  <div data-control=\"Common.Controls.ComboBox\" data-name=\"BPT-menuItemComboBox\" data-controlbinding=\"items:items,                                      selectedValue:selectedValue; mode=twoway,                                      tooltip:tooltip\" data-options=\"tabIndex:0\"></div>\
</li>\
";
        Common.menuItemTextBoxTemplate = "\
<li class=\"menuItem textBoxMenuItem\" role=\"menuitem\" tabindex=\"-1\">\
  <div data-control=\"Common.Controls.TextBox\" data-name=\"BPT-menuItemTextBox\" data-controlbinding=\"isEnabled:isEnabled,                                      placeholder:placeholder,                                      text:content; mode=twoway,                                      tooltip:tooltip\" data-options=\"clearOnEscape:1,                               tabIndex:0,                               updateOnInput:1\"></div>\
</li>\
";
        Common.defaultComboBoxTemplate = "\
<select data-controlbinding=\"value:selectedValue; mode=twoway\" data-options=\"tabIndex:0\"></select>\
";
        Common.defaultComboBoxItemTemplate = "\
<option data-binding=\"attr-aria-label:label,                               attr-data-plugin-vs-tooltip:tooltip,                               title:tooltip,                               text:text,                               value:value\"></option>\
";
        Common.defaultTextBoxTemplate = "\
<input type=\"text\" class=\"BPT-TextBox\" data-controlbinding=\"attr-data-plugin-vs-tooltip:tooltip,                                     value:text; mode=twoway,                                     placeholder:placeholder\" />\
";
        Common.stackPanelTemplate = "\
<div class=\"BPT-stackPanel\">\
  <div id=\"contentSizer\" class=\"BPT-contentSizer\"></div>\
  <div id=\"content\"></div>\
</div>\
";
        Common.defaultColorPickerTemplate = "\
<div class=\"colorPicker\">\
  <div data-name=\"selectedColorPane\" class=\"selectedColorPane\">\
    <div data-name=\"selectedColorSquare\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.selectedColorTemplate\" data-controlbinding=\"content:color,                                           tooltip:color\"></div>\
    <div data-name=\"selectedColorText\" data-control=\"Common.Controls.TextBox\" data-controlbinding=\"text:color\" data-options=\"className:selectedColorValue,                                    readonly:1\" tabindex=\"1\"></div>\
  </div>\
  <div class=\"colorToolsPane\">\
    <div data-name=\"eyedropperButton\" data-control=\"Common.Controls.ToggleButton\" data-control-templateid=\"Common.iconButton24x24\" data-controlbinding=\"isChecked:isEyedropperActive; mode=twoway\" data-options=\"className:eyedropperButton,                                    tooltip:/Common/EyedropperButtonTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
    <div data-name=\"slidersButton\" data-control=\"Common.Controls.ToggleButton\" data-control-templateid=\"Common.iconButton24x24\" data-controlbinding=\"isChecked:isSlidersShown; mode=twoway\" data-options=\"className:slidersButton,                                    tooltip:/Common/SlidersButtonTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
    <div data-name=\"paletteProgress\" data-control=\"Common.TemplateControl\" data-control-templateid=\"Common.paletteProgressTemplate\" data-controlbinding=\"isVisible:isPaletteLoading\"></div>\
    <div data-name=\"_colorPalette\" data-control=\"Common.Controls.RibbonControl\" data-control-templateid=\"Common.paletteItemsControlTemplate\" data-controlbinding=\"items:paletteColors,                                           selectedItem:color; mode=twoway,                                           isEnabled:isPaletteLoading; converter=Common.CommonConverters.InvertBool\" data-options=\"itemContainerControl:Common.Controls.Button(Common.paletteColorTemplate),                                    scrollIncrement:4; converter=Common.CommonConverters.StringToIntConverter,                                    tooltip:/Common/ColorPickerPaletteTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  </div>\
  <div class=\"slidersPane\" data-name=\"slidersPane\" data-control=\"Common.Controls.ColorPickerSlidersControl\" data-control-templateid=\"Common.slidersPaneTemplate\" data-controlbinding=\"isVisible:isSlidersShown,                                       color:color; mode=twoway\"></div>\
</div>\
";
        Common.paletteItemsControlTemplate = "\
<div class=\"colorPalette\">\
  <div data-name=\"_backwardScrollButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.arrowButton\" data-options=\"className:arrowLeft,                                tooltip:/Common/RibbonControlPreviousButtonTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"_panel\" data-options=\"className:colorPalettePanel\" tabindex=\"1\"></div>\
  <div data-name=\"_forwardScrollButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.arrowButton\" data-options=\"className:arrowRight,                                tooltip:/Common/RibbonControlNextButtonTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
</div>\
";
        Common.slidersPaneTemplate = "\
<div>\
  <label data-options=\"textContent:/Common/Hue; converter=Common.CommonConverters.ResourceConverter\">Hue</label>\
  <div data-name=\"hueText\" data-control=\"Common.Controls.TextBox\" data-controlbinding=\"text:hue\" data-options=\"className:hslText,                                readonly:1\" tabindex=\"-1\"></div>\
  <input class=\"colorSlider hueSlider\" type=\"range\" min=\"0\" max=\"359\" step=\"1\" data-controlbinding=\"value:hue; mode=twoway; converter=Common.CommonConverters.IntToStringConverter\" data-options=\"attr-data-plugin-vs-tooltip:/Common/Hue; converter=Common.CommonConverters.ResourceConverter,                                  attr-aria-label:/Common/Hue; converter=Common.CommonConverters.ResourceConverter\" tabindex=\"1\" />\
  <label data-options=\"textContent:/Common/Saturation; converter=Common.CommonConverters.ResourceConverter\">Saturation</label>\
  <div data-name=\"saturationText\" data-control=\"Common.Controls.TextBox\" data-controlbinding=\"text:saturation\" data-options=\"className:hslText,                                readonly:1\" tabindex=\"-1\"></div>\
  <input class=\"colorSlider saturationSlider\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" data-controlbinding=\"value:saturation; mode=twoway; converter=Common.CommonConverters.IntToStringConverter\" data-options=\"attr-data-plugin-vs-tooltip:/Common/Saturation; converter=Common.CommonConverters.ResourceConverter,                                  attr-aria-label:/Common/Saturation; converter=Common.CommonConverters.ResourceConverter\" tabindex=\"1\" />\
  <label data-options=\"textContent:/Common/Lightness; converter=Common.CommonConverters.ResourceConverter\">Lightness</label>\
  <div data-name=\"lightnessText\" data-control=\"Common.Controls.TextBox\" data-controlbinding=\"text:lightness\" data-options=\"className:hslText,                                readonly:1\" tabindex=\"-1\"></div>\
  <input class=\"colorSlider lightnessSlider\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" data-controlbinding=\"value:lightness; mode=twoway; converter=Common.CommonConverters.IntToStringConverter\" data-options=\"attr-data-plugin-vs-tooltip:/Common/Lightness; converter=Common.CommonConverters.ResourceConverter,                                  attr-aria-label:/Common/Lightness; converter=Common.CommonConverters.ResourceConverter\" tabindex=\"1\" />\
  <label data-options=\"textContent:/Common/Alpha; converter=Common.CommonConverters.ResourceConverter\">Alpha</label>\
  <div data-name=\"alphaText\" data-control=\"Common.Controls.TextBox\" data-controlbinding=\"text:alpha\" data-options=\"className:hslText,                                readonly:1\" tabindex=\"-1\"></div>\
  <input class=\"colorSlider alphaSlider\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" data-controlbinding=\"value:alpha; mode=twoway; converter=Common.ColorSlidersConverters.AlphaConverter\" data-options=\"attr-data-plugin-vs-tooltip:/Common/Alpha; converter=Common.CommonConverters.ResourceConverter,                                  attr-aria-label:/Common/Alpha; converter=Common.CommonConverters.ResourceConverter\" tabindex=\"1\" />\
</div>\
";
        Common.selectedColorTemplate = "\
<div class=\"BPT-button colorSquare\">\
  <span class=\"buttonIcon\" data-controlbinding=\"style.backgroundColor:content\"></span>\
</div>\
";
        Common.paletteColorTemplate = "\
<div class=\"BPT-button colorSquare\" data-controlbinding=\"attr-data-plugin-vs-tooltip:model,                                   attr-aria-label:model\">\
  <span class=\"buttonIcon\" data-controlbinding=\"style.backgroundColor:model\"></span>\
</div>\
";
        Common.arrowButton = "\
<div class=\"arrowButton\"></div>\
";
        Common.paletteProgressTemplate = "\
<progress class=\"colorPaletteProgress colorPalettePanel\"></progress>\
";
        return Common;
    })();
    ControlTemplates.Common = Common;
})(ControlTemplates || (ControlTemplates = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Common.templates.js.map

// ComboBox.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        "use strict";

        var ComboBox = (function (_super) {
            __extends(ComboBox, _super);
            function ComboBox(templateId) {
                var _this = this;
                this._mouseHandler = function (e) {
                    return _this.onMouseEvent(e);
                };

                _super.call(this, templateId || "Common.defaultComboBoxTemplate");
                this.itemContainerControl = "Common.TemplateControl(Common.defaultComboBoxItemTemplate)";
            }
            Object.defineProperty(ComboBox.prototype, "focusableElement", {
                get: function () {
                    return this.rootElement;
                },
                enumerable: true,
                configurable: true
            });

            ComboBox.initialize = function () {
                Common.ObservableHelpers.defineProperty(ComboBox, ComboBox.SelectedValuePropertyName, "");
            };

            ComboBox.prototype.onApplyTemplate = function () {
                _super.prototype.onApplyTemplate.call(this);

                if (this.rootElement) {
                    this.rootElement.addEventListener("mouseover", this._mouseHandler);
                }
            };

            ComboBox.prototype.onTemplateChanging = function () {
                _super.prototype.onTemplateChanging.call(this);

                if (this.rootElement) {
                    this.rootElement.removeEventListener("mouseover", this._mouseHandler);
                }
            };

            ComboBox.prototype.onItemsChangedOverride = function () {
                this.propertyChanged.invoke(ComboBox.SelectedValuePropertyName);
            };

            ComboBox.prototype.onItemContainerControlChangedOverride = function () {
                this.propertyChanged.invoke(ComboBox.SelectedValuePropertyName);
            };

            ComboBox.prototype.onCollectionChangedOverride = function (args) {
                this.propertyChanged.invoke(ComboBox.SelectedValuePropertyName);
            };

            ComboBox.prototype.onIsEnabledChangedOverride = function () {
                _super.prototype.onIsEnabledChangedOverride.call(this);

                if (this.isEnabled) {
                    this.rootElement.removeAttribute("disabled");
                } else {
                    this.rootElement.setAttribute("disabled");
                }
            };

            ComboBox.prototype.onMouseEvent = function (e) {
                if (this.isEnabled) {
                    switch (e.type) {
                        case "mouseover":
                            var currentValue = this.selectedValue;

                            var itemCount = this.getItemCount();
                            for (var i = 0; i < itemCount; i++) {
                                var item = this.getItem(i);

                                if (item.value === currentValue) {
                                    if (item.tooltip) {
                                        Plugin.Tooltip.show({ content: item.tooltip });
                                    }
                                }
                            }

                            break;
                        default:
                            F12.Tools.Utility.Assert.fail("Unexpected");
                    }

                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            };
            ComboBox.SelectedValuePropertyName = "selectedValue";
            return ComboBox;
        })(Controls.ItemsControl);
        Controls.ComboBox = ComboBox;

        ComboBox.initialize();
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Controls/ComboBox.js.map

// NavigationUtilities.ts
var Common;
(function (Common) {
    "use strict";

    

    var NavigationUtilities = (function () {
        function NavigationUtilities() {
        }
        NavigationUtilities.registerFocusHandlers = function (pluginId) {
            if (Plugin.F12) {
                NavigationUtilities.LastActiveElement = document.head.parentElement;
                NavigationUtilities.LastActiveElement.setActive();

                Plugin.F12.Communications.registerMethodHandler("showfocus", function (show) {
                    return NavigationUtilities.showFocus(show, pluginId);
                });
            }
        };

        NavigationUtilities.registerNavigationFrames = function (navigationFrames) {
            NavigationUtilities.NavigationFrames = navigationFrames;

            if (Plugin.F12 && !NavigationUtilities.Registered) {
                Plugin.F12.addEventListener("navigatesubframes", function (e) {
                    return NavigationUtilities.navigateFrames(e.isForward, e.useActiveElement);
                });

                NavigationUtilities.Registered = true;
            }
        };

        NavigationUtilities.enableNavigation = function () {
            NavigationUtilities.Enabled = true;
        };

        NavigationUtilities.disableNavigation = function () {
            NavigationUtilities.Enabled = false;
        };

        NavigationUtilities.makeNavigationFrameFromTarget = function (container, navigationTarget) {
            return NavigationUtilities.makeNavigationFrameFromCallback(container, function () {
                return navigationTarget;
            });
        };

        NavigationUtilities.makeNavigationFrameFromCallback = function (container, getTargetCallback) {
            return {
                container: container,
                getNavigationTarget: getTargetCallback
            };
        };

        NavigationUtilities.navigateFrames = function (forward, useActiveElement) {
            var containers = [];
            var targets = [];
            var targetIndex = -1;
            var step = (forward ? 1 : -1);

            if (!NavigationUtilities.Enabled) {
                return false;
            }

            if (!NavigationUtilities.navigateFrames || NavigationUtilities.navigateFrames.length === 0) {
                return true;
            }

            for (var frameIndex = 0; frameIndex < NavigationUtilities.NavigationFrames.length; frameIndex++) {
                var frame = NavigationUtilities.NavigationFrames[frameIndex];
                containers.push(frame.container);
                targets.push(frame.getNavigationTarget());
            }

            if (useActiveElement) {
                var activeElement = document.activeElement;
                var closestContainer;

                for (var containerIndex = 0; containerIndex < containers.length; containerIndex++) {
                    var currentContainer = containers[containerIndex];

                    if (currentContainer.contains(activeElement)) {
                        if (closestContainer) {
                            if (closestContainer.contains(currentContainer)) {
                                closestContainer = currentContainer;
                            }
                        } else {
                            closestContainer = currentContainer;
                        }
                    }
                }

                if (closestContainer) {
                    targetIndex = containers.indexOf(closestContainer) + step;
                }
            } else {
                targetIndex = forward ? 0 : NavigationUtilities.NavigationFrames.length - 1;
            }

            while (targetIndex >= 0 && targetIndex < targets.length) {
                var target = targets[targetIndex];

                if (target) {
                    target.focus();

                    return false;
                }

                targetIndex += step;
            }

            return true;
        };

        NavigationUtilities.showFocus = function (show, pluginId) {
            var rootElement = document.head.parentElement;
            var activeElement = document.activeElement;
            var lastActiveElement = NavigationUtilities.LastActiveElement;

            if (show) {
                if (activeElement && activeElement !== rootElement) {
                    activeElement.focus();
                } else if (NavigationUtilities.shouldFocus(lastActiveElement) && lastActiveElement !== rootElement) {
                    lastActiveElement.focus();
                } else {
                    var forward = true;

                    if (pluginId === Plugin.F12.PluginId.Console) {
                        forward = false;
                    }

                    NavigationUtilities.navigateFrames(forward, false);
                }
            } else {
                if (activeElement && activeElement !== rootElement) {
                    NavigationUtilities.LastActiveElement = activeElement;
                }

                rootElement.setActive();
            }

            return false;
        };

        NavigationUtilities.shouldFocus = function (element) {
            return (element && document.body.contains(element) && element.style.display !== "none" && element.style.visibility !== "hidden" && !element.disabled && element.tabIndex >= 0);
        };
        NavigationUtilities.Enabled = true;

        NavigationUtilities.Registered = false;
        return NavigationUtilities;
    })();
    Common.NavigationUtilities = NavigationUtilities;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/NavigationUtilities.js.map

// errorHandling.ts
var Common;
(function (Common) {
    "use strict";

    var ErrorHandling = (function () {
        function ErrorHandling() {
        }
        ErrorHandling.reportErrorGivenStack = function (error) {
            var message = error.message;
            var stack = error.stack;

            var firstCloseParen = stack.indexOf(")");
            if (firstCloseParen > 0) {
                stack = stack.substr(0, firstCloseParen + 1);
            }

            var result = ErrorHandling.StackRegex.exec(stack);

            if (result) {
                var file = result[3];
                var line = parseInt(result[4], 10);
                var column = parseInt(result[5], 10);

                window.reportError(message, file, line, error.stack, column);
            }
        };

        ErrorHandling.reportErrorDetails = function (errorDetails) {
            window.reportError(errorDetails.message, errorDetails.file, errorDetails.line, errorDetails.additionalInfo, errorDetails.column);
        };
        ErrorHandling.StackRegex = new RegExp(".* at ([^(]+) \(.*/23/([^:]+):([0-9]+):([0-9]+)\)", "gim");
        return ErrorHandling;
    })();
    Common.ErrorHandling = ErrorHandling;
})(Common || (Common = {}));

if (typeof window !== "undefined") {
    window.reportError = function (message, file, line, additionalInfo, column) {
        message = message || "";
        file = file || "";
        line = line || 0;
        additionalInfo = additionalInfo || "";
        column = column || 0;

        if (isDebugBuild) {
            var externalObj;
            if (window.parent.getExternalObj) {
                externalObj = window.parent.getExternalObj();
            } else if (window.external) {
                externalObj = window.external;
            }

            if (externalObj) {
                var component = (window.errorComponent ? window.errorComponent : "Common");
                console.error([component, message, file, line, column].join("\r\n"));

                if (window.errorDisplayHandler) {
                    window.errorDisplayHandler(message, file, line, additionalInfo, column);
                }
            }
        }

        if (Plugin && Plugin.Diagnostics && Plugin.Diagnostics.reportError) {
            Plugin.Diagnostics.reportError(message, file, line, additionalInfo, column);
        }
    };

    window.onerror = function (message, file, line, columnNumber) {
        var column = 0;
        var additionalInfo = "";
        if (arguments) {
            if (arguments[3] && typeof arguments[3] === "number") {
                column = arguments[3];
            }

            if (arguments[4] && arguments[4] instanceof Error) {
                additionalInfo = "Error number: " + arguments[4].number;
                additionalInfo += "\r\nStack: " + arguments[4].stack;
            }
        }

        window.reportError(message, file, line, additionalInfo, column);

        return true;
    };
}
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/errorHandling.js.map

// KeyCodes.ts
var Common;
(function (Common) {
    "use strict";

    var Keys = (function () {
        function Keys() {
        }
        Keys.C = "c";
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
        KeyCodes[KeyCodes["Backspace"] = 8] = "Backspace";
        KeyCodes[KeyCodes["Tab"] = 9] = "Tab";
        KeyCodes[KeyCodes["Enter"] = 13] = "Enter";
        KeyCodes[KeyCodes["Shift"] = 16] = "Shift";
        KeyCodes[KeyCodes["Control"] = 17] = "Control";
        KeyCodes[KeyCodes["Alt"] = 18] = "Alt";
        KeyCodes[KeyCodes["CapsLock"] = 20] = "CapsLock";
        KeyCodes[KeyCodes["Escape"] = 27] = "Escape";
        KeyCodes[KeyCodes["Space"] = 32] = "Space";
        KeyCodes[KeyCodes["PageUp"] = 33] = "PageUp";
        KeyCodes[KeyCodes["PageDown"] = 34] = "PageDown";
        KeyCodes[KeyCodes["End"] = 35] = "End";
        KeyCodes[KeyCodes["Home"] = 36] = "Home";
        KeyCodes[KeyCodes["ArrowLeft"] = 37] = "ArrowLeft";
        KeyCodes[KeyCodes["ArrowFirst"] = 37] = "ArrowFirst";
        KeyCodes[KeyCodes["ArrowUp"] = 38] = "ArrowUp";
        KeyCodes[KeyCodes["ArrowRight"] = 39] = "ArrowRight";
        KeyCodes[KeyCodes["ArrowDown"] = 40] = "ArrowDown";
        KeyCodes[KeyCodes["ArrowLast"] = 40] = "ArrowLast";
        KeyCodes[KeyCodes["Insert"] = 45] = "Insert";
        KeyCodes[KeyCodes["Delete"] = 46] = "Delete";
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
        KeyCodes[KeyCodes["ContextMenu"] = 93] = "ContextMenu";
        KeyCodes[KeyCodes["Multiply"] = 106] = "Multiply";
        KeyCodes[KeyCodes["Plus"] = 107] = "Plus";
        KeyCodes[KeyCodes["Minus"] = 109] = "Minus";
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
        KeyCodes[KeyCodes["Comma"] = 188] = "Comma";
        KeyCodes[KeyCodes["Period"] = 190] = "Period";
    })(Common.KeyCodes || (Common.KeyCodes = {}));
    var KeyCodes = Common.KeyCodes;

    (function (MouseButtons) {
        MouseButtons[MouseButtons["LeftButton"] = 0] = "LeftButton";
        MouseButtons[MouseButtons["MiddleButton"] = 1] = "MiddleButton";
        MouseButtons[MouseButtons["RightButton"] = 2] = "RightButton";
    })(Common.MouseButtons || (Common.MouseButtons = {}));
    var MouseButtons = Common.MouseButtons;

    (function (KeyFlags) {
        KeyFlags[KeyFlags["None"] = 0x0] = "None";
        KeyFlags[KeyFlags["Shift"] = 0x1] = "Shift";
        KeyFlags[KeyFlags["Ctrl"] = 0x2] = "Ctrl";
        KeyFlags[KeyFlags["Alt"] = 0x4] = "Alt";
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

    function HasOnlyCtrlKeyFlags(e) {
        return e.ctrlKey && !e.shiftKey && !e.altKey;
    }
    Common.HasOnlyCtrlKeyFlags = HasOnlyCtrlKeyFlags;

    function preventIEKeys(e) {
        if (e.keyCode === 116 /* F5 */ || e.keyCode === 117 /* F6 */ || (e.keyCode === 121 /* F10 */ && e.shiftKey) || (e.keyCode === 70 /* F */ && e.ctrlKey)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        return true;
    }
    Common.preventIEKeys = preventIEKeys;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/KeyCodes.js.map

// ButtonHelpers.ts
var Common;
(function (Common) {
    "use strict";

    var ButtonHelpers = (function () {
        function ButtonHelpers() {
        }
        ButtonHelpers.changeButtonStatus = function (buttonDiv, enabled, pressed) {
            var wasEnabled = ButtonHelpers.isEnabled(buttonDiv);
            if (enabled && !wasEnabled) {
                buttonDiv.classList.remove("toolbarButtonStateDisabled");
                buttonDiv.setAttribute("aria-disabled", "false");
            } else if (!enabled && wasEnabled) {
                buttonDiv.classList.add("toolbarButtonStateDisabled");
                buttonDiv.setAttribute("aria-disabled", "true");
            }

            if (typeof pressed === "boolean") {
                ButtonHelpers.IsChangingAriaPressed = true;
                if (pressed) {
                    buttonDiv.setAttribute("aria-pressed", "true");
                    buttonDiv.classList.add("toolbarButtonStateActive");
                } else {
                    buttonDiv.setAttribute("aria-pressed", "false");
                    buttonDiv.classList.remove("toolbarButtonStateActive");
                }

                ButtonHelpers.IsChangingAriaPressed = false;
            }
        };

        ButtonHelpers.isEnabled = function (buttonDiv) {
            return !buttonDiv.classList.contains("toolbarButtonStateDisabled");
        };

        ButtonHelpers.isValidEvent = function (event) {
            return (event.type === "click" || event.keyCode === 13 /* Enter */ || event.keyCode === 32 /* Space */) && ButtonHelpers.isEnabled(event.currentTarget);
        };

        ButtonHelpers.setButtonTooltip = function (buttonDiv, tooltipResourceName) {
            var tooltip = Plugin.Resources.getString(tooltipResourceName);

            buttonDiv.setAttribute("data-plugin-vs-tooltip", tooltip);
            buttonDiv.setAttribute("aria-label", tooltip);
        };

        ButtonHelpers.setupButton = function (buttonDiv, tooltipResourceName, clickHandler, isEnabled) {
            if (typeof isEnabled === "undefined") { isEnabled = true; }
            if (typeof tooltipResourceName === "string") {
                ButtonHelpers.setButtonTooltip(buttonDiv, tooltipResourceName);
                buttonDiv.setAttribute("role", "button");
            }

            if (clickHandler) {
                buttonDiv.addEventListener("click", function (event) {
                    return ButtonHelpers.onButtonPress(event, clickHandler);
                });
                buttonDiv.addEventListener("keydown", function (event) {
                    return ButtonHelpers.onButtonPress(event, clickHandler);
                });
                buttonDiv.addEventListener("DOMAttrModified", function (event) {
                    if (!ButtonHelpers.IsChangingAriaPressed && ButtonHelpers.isEnabled(buttonDiv) && event.attrName === "aria-pressed" && event.attrChange === event.MODIFICATION) {
                        clickHandler(event);
                    }
                });
            }

            buttonDiv.addEventListener("mousedown", ButtonHelpers.onButtonMouseDown);
            buttonDiv.addEventListener("mouseenter", ButtonHelpers.onButtonMouseEnter);
            buttonDiv.addEventListener("mouseleave", ButtonHelpers.onButtonMouseLeave);
            buttonDiv.addEventListener("mouseup", ButtonHelpers.onButtonMouseUp);

            if (!isEnabled) {
                ButtonHelpers.changeButtonStatus(buttonDiv, false);
            }
        };

        ButtonHelpers.onButtonMouseDown = function (event) {
            var buttonDiv = event.currentTarget;

            if (ButtonHelpers.isEnabled(buttonDiv)) {
                buttonDiv.classList.add("toolbarButtonMouseDown");
            } else {
                event.stopImmediatePropagation();
            }
        };

        ButtonHelpers.onButtonMouseEnter = function (event) {
            var buttonDiv = event.currentTarget;

            if (ButtonHelpers.isEnabled(buttonDiv)) {
                buttonDiv.classList.add("toolbarButtonMouseHover");
            } else {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };

        ButtonHelpers.onButtonMouseLeave = function (event) {
            var buttonDiv = event.currentTarget;

            buttonDiv.classList.remove("toolbarButtonMouseHover");
            buttonDiv.classList.remove("toolbarButtonMouseDown");
        };

        ButtonHelpers.onButtonMouseUp = function (event) {
            var buttonDiv = event.currentTarget;

            buttonDiv.classList.remove("toolbarButtonMouseDown");
        };

        ButtonHelpers.onButtonPress = function (event, clickHandler) {
            if (ButtonHelpers.isValidEvent(event)) {
                clickHandler(event);
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };
        return ButtonHelpers;
    })();
    Common.ButtonHelpers = ButtonHelpers;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ButtonHelpers.js.map

// CssUtilities.ts
var Common;
(function (Common) {
    "use strict";

    var CssUtilities = (function () {
        function CssUtilities() {
        }
        CssUtilities.addClasses = function (originalClasses, addClasses) {
            var newClasses = originalClasses ? originalClasses.split(" ") : [];
            var addList = addClasses ? addClasses.split(" ") : [];

            for (var i = 0; i < addList.length; i++) {
                if (newClasses.indexOf(addList[i]) === -1) {
                    newClasses.push(addList[i]);
                }
            }

            return newClasses.join(" ");
        };

        CssUtilities.removeClasses = function (originalClasses, removeClasses) {
            var classes = originalClasses ? originalClasses.split(" ") : [];
            var removeList = removeClasses ? removeClasses.split(" ") : [];
            var newClasses = [];

            for (var i = 0; i < classes.length; i++) {
                if (removeList.indexOf(classes[i]) === -1) {
                    newClasses.push(classes[i]);
                }
            }

            return newClasses.join(" ");
        };
        return CssUtilities;
    })();
    Common.CssUtilities = CssUtilities;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/CssUtilities.js.map

// Diagnostics.ts

var Common;
(function (Common) {
    "use strict";
})(Common || (Common = {}));

var Diagnostics;
(function (Diagnostics) {
    "use strict";
})(Diagnostics || (Diagnostics = {}));

//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Diagnostics.js.map

// DiagnosticsOM.ts
var DiagnosticsOM;
(function (DiagnosticsOM) {
    "use strict";
})(DiagnosticsOM || (DiagnosticsOM = {}));

//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/DiagnosticsOM.js.map

// encodingUtilities.ts
var Common;
(function (Common) {
    "use strict";

    var EncodingUtilities = (function () {
        function EncodingUtilities() {
        }
        EncodingUtilities.escapeRegExp = function (value) {
            return String.prototype.replace.call(value, EncodingUtilities.ESCAPE_USER_INPUT_REGEX, "\\$&");
        };

        EncodingUtilities.escapeRegExpWithWildCard = function (value) {
            return String.prototype.replace.call(value, EncodingUtilities.ESCAPE_USER_INPUT_REGEX, function (match) {
                var newValue;
                if (match === "\*") {
                    newValue = ".*";
                } else {
                    newValue = "\\" + match;
                }

                return newValue;
            });
        };

        EncodingUtilities.wrapInQuotes = function (stringToWrap) {
            return "\"" + String.prototype.replace.call(stringToWrap, /\\"/g, "\"") + "\"";
        };

        EncodingUtilities.unescapeHtml = function (htmlString) {
            if ((typeof htmlString) !== "string") {
                if (htmlString === null || htmlString === undefined) {
                    return "";
                }

                htmlString = "" + htmlString;
            }

            return (String.prototype.replace.call(String.prototype.replace.call(String.prototype.replace.call(String.prototype.replace.call(String.prototype.replace.call(htmlString, /&gt;/g, ">"), /&lt;/g, "<"), /&apos;/g, "'"), /&quot;/g, "\""), /&amp;/g, "&"));
        };

        EncodingUtilities.escapeHtml = function (htmlString) {
            if ((typeof htmlString) !== "string") {
                if (htmlString === null || htmlString === undefined) {
                    return "";
                }

                htmlString = "" + htmlString;
            }

            return (String.prototype.replace.call(String.prototype.replace.call(String.prototype.replace.call(String.prototype.replace.call(String.prototype.replace.call(htmlString, /&/g, "&amp;"), /"/g, "&quot;"), /'/g, "&apos;"), /</g, "&lt;"), />/g, "&gt;"));
        };
        EncodingUtilities.ESCAPE_USER_INPUT_REGEX = /([.+?^=!:${}()|\[\]\/\\])|(\*)/g;
        return EncodingUtilities;
    })();
    Common.EncodingUtilities = EncodingUtilities;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/encodingUtilities.js.map

// DiagnosticsBridge.ts
var Common;
(function (Common) {
    "use strict";

    

    var DiagnosticsPort = (function () {
        function DiagnosticsPort(proxy, portName) {
            this._proxy = proxy;
            this._portName = portName;
        }
        Object.defineProperty(DiagnosticsPort.prototype, "name", {
            get: function () {
                return this._portName;
            },
            enumerable: true,
            configurable: true
        });

        DiagnosticsPort.prototype.postMessage = function (data) {
            this._proxy._post("sendMessage", this._portName, data);
            return true;
        };

        DiagnosticsPort.prototype.addEventListener = function (type, listener) {
            if (type === "message") {
                this._proxy.addEventListener(type, listener);
            }
        };

        DiagnosticsPort.prototype.removeEventListener = function (type, listener) {
            if (type === "message") {
                this._proxy.removeEventListener(type, listener);
            }
        };
        return DiagnosticsPort;
    })();

    var IEDiagnosticsBridge = (function () {
        function IEDiagnosticsBridge(externalObj) {
            this._externalObj = externalObj;
        }
        IEDiagnosticsBridge.prototype.loadScriptInProc = function (fileName) {
            this._externalObj.loadScriptInProc(fileName);
        };

        IEDiagnosticsBridge.prototype.createPort = function (port) {
            return port;
        };

        IEDiagnosticsBridge.prototype.addEventListener = function (type, listener) {
            this._externalObj.addEventListener(type, listener);
        };

        IEDiagnosticsBridge.prototype.removeEventListener = function (type, listener) {
            this._externalObj.removeEventListener(type, listener);
        };

        IEDiagnosticsBridge.prototype.fireAttachedEvent = function () {
            this._externalObj.fireAttachedEvent();
        };

        IEDiagnosticsBridge.prototype.fireDetachedEvent = function () {
            this._externalObj.fireDetachedEvent();
        };
        return IEDiagnosticsBridge;
    })();
    Common.IEDiagnosticsBridge = IEDiagnosticsBridge;

    var DiagnosticsBridge = (function () {
        function DiagnosticsBridge(proxy) {
            this._proxy = proxy;
        }
        DiagnosticsBridge.prototype.loadScriptInProc = function (fileName) {
            this._proxy._post("loadScript", fileName);
        };

        DiagnosticsBridge.prototype.createPort = function (port) {
            return new DiagnosticsPort(this._proxy, port.portName);
        };

        DiagnosticsBridge.prototype.addEventListener = function (type, listener) {
            this._proxy.addEventListener(type, listener);
        };

        DiagnosticsBridge.prototype.removeEventListener = function (type, listener) {
            this._proxy.removeEventListener(type, listener);
        };

        DiagnosticsBridge.prototype.fireAttachedEvent = function () {
        };

        DiagnosticsBridge.prototype.fireDetachedEvent = function () {
        };
        return DiagnosticsBridge;
    })();
    Common.DiagnosticsBridge = DiagnosticsBridge;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/DiagnosticsBridge.js.map

// toolwindow.ts
var Common;
(function (Common) {
    "use strict";
    var ToolWindowHelpers = (function () {
        function ToolWindowHelpers() {
        }
        ToolWindowHelpers.initializeToolWindow = function () {
            document.addEventListener("mousedown", function () {
                $m(document.body).removeClass("showFocus");
            }, true);

            $m(document).bind("contextmenu", function () {
                return false;
            });

            $m(document).bind("keydown", function (event) {
                if (event.keyCode === 116 /* F5 */ || (event.keyCode === 121 /* F10 */ && event.shiftKey)) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                } else if (event.keyCode === 9 /* Tab */) {
                    $m(document.body).addClass("showFocus");
                }
            });

            $m(".BPT-ToolbarButton").bind("mousedown", function (event) {
                var element = $m(this);
                if (!element.hasClass("BPT-ToolbarButton-StateDisabled")) {
                    element.addClass("BPT-ToolbarButton-MouseDown");
                } else {
                    event.stopImmediatePropagation();
                }
            });
            $m(".BPT-ToolbarButton").bind("mouseup", function () {
                $m(this).removeClass("BPT-ToolbarButton-MouseDown");
            });
            $m(".BPT-ToolbarButton").bind("mouseleave", function () {
                $m(this).removeClass("BPT-ToolbarButton-MouseDown BPT-ToolbarButton-MouseHover");
            });
            $m(".BPT-ToolbarButton").bind("mouseenter", function (event) {
                var element = $m(this);
                if (!element.hasClass("BPT-ToolbarButton-StateDisabled")) {
                    element.addClass("BPT-ToolbarButton-MouseHover");
                } else {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            });
            $m(".BPT-ToolbarButton").bind("click keydown", function (event) {
                if (event.type === "click" || event.keyCode === 13 /* Enter */ || event.keyCode === 32 /* Space */) {
                    var element = $m(this);
                    if (!element.hasClass("BPT-ToolbarButton-StateDisabled")) {
                        var thisElement = element.get(0);
                        if (document.activeElement !== thisElement) {
                            thisElement.focus();
                        }
                    } else {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                }
            });
            $m(".BPT-ToolbarToggleButton").bind("click keydown", function (event) {
                if (event.type === "click" || event.keyCode === 13 /* Enter */ || event.keyCode === 32 /* Space */) {
                    var element = $m(this);
                    if (!element.hasClass("BPT-ToolbarButton-StateDisabled")) {
                        var thisElement = element.get(0);
                        if (document.activeElement !== thisElement) {
                            thisElement.focus();
                        }

                        if (element.hasClass("BPT-ToolbarToggleButton-StateOn")) {
                            element.removeClass("BPT-ToolbarToggleButton-StateOn");
                            element.attr("aria-pressed", false);
                        } else {
                            element.addClass("BPT-ToolbarToggleButton-StateOn");
                            element.attr("aria-pressed", true);
                        }
                    } else {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                }
            });

            $m(".BPT-TabCycle-Horizontal, .BPT-TabCycle-Vertical").children(".BPT-TabCycle-Item").bind("keydown", function (event) {
                if (($m(this).parent().hasClass("BPT-TabCycle-Horizontal") && (event.keyCode === 37 /* ArrowLeft */ || event.keyCode === 39 /* ArrowRight */)) || ($m(this).parent().hasClass("BPT-TabCycle-Vertical") && (event.keyCode === 38 /* ArrowUp */ || event.keyCode === 40 /* ArrowDown */))) {
                    var currentElement = $m(this);
                    var newElement = ((event.keyCode === 37 /* ArrowLeft */ || event.keyCode === 38 /* ArrowUp */) ? currentElement.prev(".BPT-TabCycle-Item").first() : currentElement.next(".BPT-TabCycle-Item").first());

                    if (newElement.length > 0) {
                        newElement.attr("tabindex", "1");
                        newElement.trigger("focus");
                        newElement.trigger("click");
                        currentElement.removeAttr("tabindex");
                    }
                }
            });
            $m(".BPT-TabCycle-Horizontal, .BPT-TabCycle-Vertical").children(".BPT-TabCycle-Item").bind("mousedown", function (event) {
                var oldElement = $m(this).siblings(".BPT-TabCycle-Item").matchAttr("tabindex", "1");
                var newElement = $m(this);

                if (newElement.length > 0) {
                    newElement.attr("tabindex", "1");
                    newElement.trigger("focus");
                    oldElement.removeAttr("tabindex");
                }
            });
        };

        ToolWindowHelpers.registerErrorComponent = function (component, errorDisplayHandler) {
            window.errorComponent = component;
            window.errorDisplayHandler = errorDisplayHandler;
        };

        ToolWindowHelpers.loadString = function (resourceId) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                params[_i] = arguments[_i + 1];
            }
            if (params.length === 1 && Array.isArray(params[0])) {
                params = params[0];
            }

            return Plugin.Resources.getString.apply(this, ["/Common/" + resourceId].concat(params));
        };

        ToolWindowHelpers.codeMarker = function (codeMarker) {
            Plugin.VS.Internal.CodeMarkers.fire(codeMarker);
        };

        ToolWindowHelpers.scrollIntoView = function (element, scrollContainer) {
            if (element && element.getBoundingClientRect) {
                var elementRect = element.getBoundingClientRect();
                var containerRect = scrollContainer.getBoundingClientRect();
                var elementTopIsAboveViewport = elementRect.top < containerRect.top;
                var elementBottomIsBelowViewport = elementRect.bottom > containerRect.bottom;

                if (elementTopIsAboveViewport || elementBottomIsBelowViewport) {
                    element.scrollIntoView(true);
                    return true;
                }
            }

            return false;
        };

        ToolWindowHelpers.getSortedObjectProperties = function (objectToSort) {
            var sortedPropNames = [];
            for (var propName in objectToSort) {
                sortedPropNames.push(propName);
            }

            sortedPropNames.sort(Common.ToolWindowHelpers.naturalSort);

            return sortedPropNames;
        };

        ToolWindowHelpers.getSortedArrayProperties = function (arrayToSort, key, highPriorityValue) {
            var i;
            var sortedProps = [];
            for (i = 0; i < arrayToSort.length; i++) {
                sortedProps.push({ property: arrayToSort[i][key], realIndex: i });
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

                return Common.ToolWindowHelpers.naturalSort(a.property, b.property);
            });

            var sortedList = [];
            for (i = 0; i < sortedProps.length; i++) {
                sortedList.push(sortedProps[i].realIndex);
            }

            return sortedList;
        };

        ToolWindowHelpers.naturalSort = function (a, b) {
            var regexSortGroup = /(\d+)|(\D+)/g;

            var aGroups = String(a).toLocaleLowerCase().match(regexSortGroup);
            var bGroups = String(b).toLocaleLowerCase().match(regexSortGroup);

            if (!aGroups && bGroups) {
                return -1;
            } else if (aGroups && !bGroups) {
                return 1;
            } else if (!aGroups && !bGroups) {
                return 0;
            }

            while (aGroups.length > 0 && bGroups.length > 0) {
                var aFront = aGroups.shift();
                var bFront = bGroups.shift();

                var aAsDigit = parseInt(aFront, 10);
                var bAsDigit = parseInt(bFront, 10);

                if (isNaN(aAsDigit) && isNaN(bAsDigit)) {
                    if (aFront !== bFront) {
                        return aFront.localeCompare(bFront);
                    }
                } else if (isNaN(aAsDigit)) {
                    return 1;
                } else if (isNaN(bAsDigit)) {
                    return -1;
                } else {
                    if (aAsDigit !== bAsDigit) {
                        return (aAsDigit - bAsDigit);
                    }
                }
            }

            return aGroups.length - bGroups.length;
        };

        ToolWindowHelpers.createShortenedUrlText = function (url) {
            if (!url) {
                return url;
            }

            var shortenedText = url;

            var javascriptPrefix = "javascript:";
            if (shortenedText.toLowerCase().substr(0, javascriptPrefix.length) === javascriptPrefix) {
                return "javascript:<URI>";
            }

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

            index = Math.max(shortenedText.lastIndexOf("/"), shortenedText.lastIndexOf("\\"));

            while (index !== -1 && index === (shortenedText.length - 1)) {
                shortenedText = shortenedText.substring(0, shortenedText.length - 1);
                index = Math.max(shortenedText.lastIndexOf("/"), shortenedText.lastIndexOf("\\"));
            }

            if (index > -1) {
                shortenedText = shortenedText.substring(index + 1);
            }

            return shortenedText;
        };

        ToolWindowHelpers.getTruncatedFileName = function (filePath, maxLength) {
            if (typeof maxLength === "undefined") { maxLength = 20; }
            if (!filePath) {
                return filePath;
            }

            var fileName = Common.ToolWindowHelpers.createShortenedUrlText(filePath);

            if (fileName.length > maxLength) {
                var index = maxLength / 2 - 2;
                fileName = fileName.substr(0, index) + this.loadString("Ellipsis") + fileName.substr(fileName.length - index);
            }

            return fileName;
        };

        ToolWindowHelpers.createFileLinkText = function (fileUrl, line, column, maxLength) {
            var linkText = fileUrl ? this.getTruncatedFileName(fileUrl, maxLength) : "";

            if (line) {
                if (fileUrl) {
                    linkText += " ";
                }

                linkText += "(" + line;
                if (column) {
                    linkText += ", " + column;
                }

                linkText += ")";
            }

            return linkText;
        };

        ToolWindowHelpers.pathCombine = function (firstPart, secondPart) {
            var separators = /[\/\\]/;

            if (!secondPart) {
                return firstPart;
            } else if (this.isAbsoluteUrl(secondPart) || !firstPart) {
                return secondPart;
            } else if (secondPart.charAt(0) === "/" && this.isAbsoluteUrl(firstPart)) {
                return this.getRoot(firstPart) + secondPart;
            } else if (firstPart.charAt(firstPart.length - 1).match(separators) || secondPart.charAt(0).match(separators)) {
                return firstPart + secondPart;
            } else {
                var separator = ((firstPart + secondPart).lastIndexOf("\\") >= 0 ? "\\" : "/");
                return firstPart + separator + secondPart;
            }
        };

        ToolWindowHelpers.getRoot = function (url) {
            return url.substring(0, url.indexOf("/", url.indexOf("://") + 3));
        };

        ToolWindowHelpers.isAbsoluteUrl = function (url) {
            if (this.isUncPath(url) || this.pathStartsWithDriveLetter(url)) {
                return true;
            }

            if (!!url.match(/^file:\/{2,3}\./i)) {
                return false;
            }

            return !!url.match(/^[a-zA-Z][\w\+\-\.]*:/) || this.isDataURI(url);
        };

        ToolWindowHelpers.isUncPath = function (url) {
            return !!url.match(/^\\\\/);
        };

        ToolWindowHelpers.pathStartsWithDriveLetter = function (url) {
            return !!url.match(/^[A-Za-z]:/);
        };

        ToolWindowHelpers.isFileURI = function (url) {
            return url.length > 5 && url.substr(0, 5).toLocaleLowerCase() === "file:";
        };

        ToolWindowHelpers.isDataURI = function (url) {
            return url.length > 5 && url.substr(0, 5).toLocaleLowerCase() === "data:";
        };

        ToolWindowHelpers.addFileProtocolIfNeeded = function (url) {
            if ((Common.ToolWindowHelpers.pathStartsWithDriveLetter(url) || Common.ToolWindowHelpers.isUncPath(url)) && !Common.ToolWindowHelpers.isFileURI(url)) {
                url = "file:///" + url;
            }

            return url;
        };

        ToolWindowHelpers.truncateProtocolFromUrl = function (url) {
            return url.replace(/^[a-zAZ][\w\+\-\.]*:(\/\/)?/g, "");
        };

        ToolWindowHelpers.parseBase64DataUriContent = function (url) {
            if (!ToolWindowHelpers.isDataURI(url) || url.indexOf("base64,") === -1) {
                return null;
            }

            try  {
                return window.atob(url.substr(url.indexOf("base64,") + 7));
            } catch (ex) {
                return null;
            }
        };

        ToolWindowHelpers.parseDataUriMimeType = function (url) {
            if (!ToolWindowHelpers.isDataURI(url) || url.indexOf(";") === -1) {
                return null;
            }

            return url.substring(5, url.indexOf(";"));
        };

        ToolWindowHelpers.hasSelectedText = function () {
            var selectedText = window.getSelection().toString();
            return !!selectedText;
        };

        ToolWindowHelpers.getSelectedText = function () {
            var selectedText = window.getSelection().toString();
            return selectedText;
        };

        ToolWindowHelpers.copySelectedTextToClipboard = function () {
            var selectedText = window.getSelection().toString();
            if (selectedText) {
                var compactText = selectedText.replace(/[\r\n]+/g, "\r\n");

                clipboardData.setData("Text", compactText);
                return true;
            }

            return false;
        };

        ToolWindowHelpers.isDarkThemeBackground = function (element) {
            if (element) {
                var backgroundColor;
                while ((!backgroundColor || backgroundColor === "transparent") && element && element.length > 0) {
                    backgroundColor = element.css("background-color");

                    element = element.parent();
                }

                if (backgroundColor) {
                    var rgbParts = backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                    if (rgbParts && rgbParts.length === 4) {
                        var brightness = ((parseInt(rgbParts[1], 10) * 299) + (parseInt(rgbParts[2], 10) * 587) + (parseInt(rgbParts[3], 10) * 114)) / 1000;

                        return (brightness < 127);
                    }
                }
            }

            return false;
        };

        ToolWindowHelpers.isContextMenuUp = function () {
            return Common.ToolWindowHelpers.ContextMenuIsUp;
        };

        ToolWindowHelpers.contextMenuUp = function (flag) {
            Common.ToolWindowHelpers.ContextMenuIsUp = flag;
        };

        ToolWindowHelpers.nodeInDocument = function (node) {
            if (node) {
                while (node = node.parentNode) {
                    if (node === document) {
                        return true;
                    }
                }
            }

            return false;
        };

        ToolWindowHelpers.isFocusGood = function () {
            var nowFocus = document.querySelector(":focus");
            return nowFocus && nowFocus.tagName !== "BODY";
        };

        ToolWindowHelpers.fireCustomEvent = function (element, eventName) {
            var customEvent = document.createEvent("CustomEvent");

            customEvent.initEvent(eventName, true, true);

            element.dispatchEvent(customEvent);
        };

        ToolWindowHelpers.getExtension = function (url) {
            if (!url) {
                return "";
            }

            url = this.createShortenedUrlText(url);
            var indexOfDot = url.lastIndexOf(".");
            var extension;
            if (indexOfDot < 0) {
                return "";
            } else {
                return url.substr(indexOfDot).toLowerCase();
            }
        };

        ToolWindowHelpers.guessMimeTypeFromUrlExtension = function (url) {
            switch (this.getExtension(url)) {
                case ".html":
                case ".htm":
                    return "text/html";
                case ".xml":
                case ".svg":
                    return "text/xml";
                case ".ts":
                    return "text/typescript";
                case ".js":
                    return "text/javascript";
                case ".css":
                    return "text/css";
                case ".coffee":
                    return "text/coffeescript";
                case ".cs":
                    return "text/x-csharp";
                default:
                    return "text/plain";
            }
        };
        ToolWindowHelpers.ContextMenuIsUp = false;

        ToolWindowHelpers.CodeMarkers = {
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
            perfBrowserTools_DiagnosticsToolWindowsDomExplorerTabChanged: 23623,
            perfBrowserTools_DiagnosticsToolWindowsNetworkExplorerReady: 23624
        };

        ToolWindowHelpers.AreCodeMarkersEnabled = false;
        return ToolWindowHelpers;
    })();
    Common.ToolWindowHelpers = ToolWindowHelpers;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/toolwindow.js.map

// Proxy.ts
"use strict";
var Proxy = (function () {
    function Proxy(diagnosticsBridge) {
        this._uid = 0;
        this._callbacks = {};
        this._pendingTimeout = null;
        this.remotePort = null;
        this._diagnosticsBridge = diagnosticsBridge;
    }
    Proxy.prototype.callRemote = function (command, args, callback, preMessageCallback) {
        var _this = this;
        var uidString = this.getUid();

        if (callback) {
            this._callbacks[uidString] = { synced: true, callback: callback || null };
        }

        var callbackUids = [];
        var newArgs = [];
        if (args) {
            for (var i = 0; i < args.length; i++) {
                if (typeof (args[i]) === "function") {
                    var callbackuid = this.getUid();
                    callbackUids.push(callbackuid);
                    this._callbacks[callbackuid] = { synced: false, callback: args[i] };

                    newArgs[i] = {
                        uid: callbackuid,
                        type: "callback"
                    };
                } else {
                    newArgs[i] = args[i];
                }
            }
        }

        var jsonObj = {
            uid: uidString,
            command: command,
            args: newArgs
        };

        var sendMessageToRemote = function (message, preMessageCallback) {
            if (_this.remotePort) {
                if (preMessageCallback) {
                    preMessageCallback(message, args[0]);
                }

                try  {
                    _this.remotePort.postMessage(message);
                } catch (e) {
                    return;
                }
            }
        };

        this._pendingMessages.push(jsonObj);
        if (!this._pendingTimeout) {
            this._pendingTimeout = setTimeout(function () {
                var message = JSON.stringify(_this._pendingMessages);
                _this._pendingMessages = [];
                _this._pendingTimeout = null;
                sendMessageToRemote(message, preMessageCallback);
            }, 0);
        }

        return callbackUids;
    };

    Proxy.prototype.clearCallBacks = function (uids) {
        var _this = this;
        if (uids) {
            uids.forEach(function (uid) {
                delete _this._callbacks[uid];
            });
        } else {
            this._callbacks = {};
        }
    };

    Proxy.prototype.fireCallbacks = function (data) {
        var msgs = JSON.parse(data);
        for (var i = 0; i < msgs.length; i++) {
            var obj = msgs[i];
            if (this._callbacks[obj.uid]) {
                this._callbacks[obj.uid].callback.apply(this, obj.args);

                if (this._callbacks[obj.uid] && this._callbacks[obj.uid].synced) {
                    delete this._callbacks[obj.uid];
                }
            } else if (obj.uid === "scriptError") {
                window.reportError(obj.args[0].message, obj.args[0].file, obj.args[0].line, obj.args[0].additionalInfo);
            }
        }
    };

    Proxy.prototype.initializeProxy = function (onMessageCallback, onAttachCallback, onDetachCallback, onBreakCallback, onRunCallback) {
        var _this = this;
        this._pendingMessages = [];
        this._onMessageCallback = onMessageCallback;
        this._onAttachCallback = onAttachCallback;
        this._onDetachCallback = onDetachCallback || (function () {
            return false;
        });
        this._onBreakCallback = onBreakCallback || (function () {
            return false;
        });
        this._onRunCallback = onRunCallback || (function () {
            return false;
        });

        this._diagnosticsBridge.addEventListener("attach", function () {
            return _this.onAttach();
        });
        this._diagnosticsBridge.addEventListener("break", function () {
            return _this.onBreak();
        });
        this._diagnosticsBridge.addEventListener("connect", function (p) {
            return _this.onConnect(p);
        });
        this._diagnosticsBridge.addEventListener("detach", function () {
            return _this.onDetach();
        });
        this._diagnosticsBridge.addEventListener("run", function () {
            return _this.onRun();
        });
        this.onAttach();
    };

    Proxy.prototype.onAttach = function () {
        this.hideWarningSection();
        this._onAttachCallback();
    };

    Proxy.prototype.onDetach = function () {
        if (this.remotePort) {
            this.remotePort.removeEventListener("message", this._onMessageCallback);
            this.remotePort = null;
        }

        this._callbacks = {};
        this._pendingMessages = [];
        this._pendingTimeout = null;

        this._onDetachCallback();

        this.postWarning("DiagnosticsDisabled");
    };

    Proxy.prototype.onBreak = function () {
        if (this._onBreakCallback) {
            this._onBreakCallback();
        }
    };

    Proxy.prototype.onRun = function () {
        if (this._onRunCallback) {
            this._onRunCallback();
        }
    };

    Proxy.prototype.onConnect = function (port) {
        var createdPort = this._diagnosticsBridge.createPort(port);
        var throttle = new Common.PortThrottler(createdPort);
        throttle.initialize();

        this.remotePort = throttle;
        this.remotePort.addEventListener("message", this._onMessageCallback);
    };

    Proxy.prototype.getUid = function () {
        return "uid" + (this._uid++).toString(36);
    };

    Proxy.prototype.hideWarningSection = function () {
        $m("#warningSection").hide();
    };

    Proxy.prototype.postWarning = function (msg) {
        $m("#warningMessageText").text(Common.ToolWindowHelpers.loadString(msg));
        $m("#warningSection").show();
    };
    return Proxy;
})();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Proxy.js.map

// trace.ts
var Common;
(function (Common) {
    "use strict";

    (function (TraceEvents) {
        TraceEvents[TraceEvents["Timeline_Zoom_Start"] = 0x65] = "Timeline_Zoom_Start";
        TraceEvents[TraceEvents["Timeline_Zoom_Stop"] = 0x66] = "Timeline_Zoom_Stop";
        TraceEvents[TraceEvents["Timeline_GridSort_Start"] = 0x67] = "Timeline_GridSort_Start";
        TraceEvents[TraceEvents["Timeline_GridSort_Stop"] = 0x68] = "Timeline_GridSort_Stop";
        TraceEvents[TraceEvents["Timeline_LoadGraphs_Start"] = 0x69] = "Timeline_LoadGraphs_Start";
        TraceEvents[TraceEvents["Timeline_LoadGraphs_Stop"] = 0x6a] = "Timeline_LoadGraphs_Stop";
        TraceEvents[TraceEvents["Timeline_GridScrolled"] = 0x6b] = "Timeline_GridScrolled";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForTimeSelection"] = 0x6c] = "Timeline_GridUpdatedForTimeSelection";
        TraceEvents[TraceEvents["Timeline_UserSelectedTimeSlice_Start"] = 0x6d] = "Timeline_UserSelectedTimeSlice_Start";
        TraceEvents[TraceEvents["Timeline_UserSelectedTimeSlice_Stop"] = 0x6e] = "Timeline_UserSelectedTimeSlice_Stop";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterBackground_Start"] = 0x6f] = "Timeline_GridUpdatedForFilterBackground_Start";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterBackground_Stop"] = 0x70] = "Timeline_GridUpdatedForFilterBackground_Stop";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterNetwork_Start"] = 0x71] = "Timeline_GridUpdatedForFilterNetwork_Start";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterNetwork_Stop"] = 0x72] = "Timeline_GridUpdatedForFilterNetwork_Stop";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterMeasures_Start"] = 0x73] = "Timeline_GridUpdatedForFilterMeasures_Start";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterMeasures_Stop"] = 0x74] = "Timeline_GridUpdatedForFilterMeasures_Stop";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterFrames_Start"] = 0x75] = "Timeline_GridUpdatedForFilterFrames_Start";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterFrames_Stop"] = 0x76] = "Timeline_GridUpdatedForFilterFrames_Stop";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterName_Start"] = 0x77] = "Timeline_GridUpdatedForFilterName_Start";
        TraceEvents[TraceEvents["Timeline_GridUpdatedForFilterName_Stop"] = 0x78] = "Timeline_GridUpdatedForFilterName_Stop";
        TraceEvents[TraceEvents["Memory_TakeSnapshot_Start"] = 0xc9] = "Memory_TakeSnapshot_Start";
        TraceEvents[TraceEvents["Memory_TakeSnapshot_Stop"] = 0xca] = "Memory_TakeSnapshot_Stop";
        TraceEvents[TraceEvents["Memory_CompareSnapshot_Start"] = 0xcb] = "Memory_CompareSnapshot_Start";
        TraceEvents[TraceEvents["Memory_CompareSnapshot_Stop"] = 0xcc] = "Memory_CompareSnapshot_Stop";
        TraceEvents[TraceEvents["Memory_ViewSnapshot_Start"] = 0xcd] = "Memory_ViewSnapshot_Start";
        TraceEvents[TraceEvents["Memory_ViewSnapshot_Stop"] = 0xce] = "Memory_ViewSnapshot_Stop";
        TraceEvents[TraceEvents["Memory_GridSort_Start"] = 0xcf] = "Memory_GridSort_Start";
        TraceEvents[TraceEvents["Memory_GridSort_Stop"] = 0xd0] = "Memory_GridSort_Stop";
        TraceEvents[TraceEvents["Memory_DisplayFirstLevelSnapshotData_Start"] = 0xd1] = "Memory_DisplayFirstLevelSnapshotData_Start";
        TraceEvents[TraceEvents["Memory_DisplayFirstLevelSnapshotData_Stop"] = 0xd2] = "Memory_DisplayFirstLevelSnapshotData_Stop";
        TraceEvents[TraceEvents["Memory_ToolReady_Start"] = 0xd3] = "Memory_ToolReady_Start";
        TraceEvents[TraceEvents["Memory_ToolReady_Stop"] = 0xd4] = "Memory_ToolReady_Stop";
        TraceEvents[TraceEvents["Memory_GridFilterResponse_Start"] = 0xd5] = "Memory_GridFilterResponse_Start";
        TraceEvents[TraceEvents["Memory_GridFilterResponse_Stop"] = 0xd6] = "Memory_GridFilterResponse_Stop";
        TraceEvents[TraceEvents["Memory_UpdateObjectReferenceGraph_Start"] = 0xd7] = "Memory_UpdateObjectReferenceGraph_Start";
        TraceEvents[TraceEvents["Memory_UpdateObjectReferenceGraph_Stop"] = 0xd8] = "Memory_UpdateObjectReferenceGraph_Stop";
        TraceEvents[TraceEvents["Memory_ProcessingSnapshot_Start"] = 0xd9] = "Memory_ProcessingSnapshot_Start";
        TraceEvents[TraceEvents["Memory_ProcessingSnapshot_Stop"] = 0xda] = "Memory_ProcessingSnapshot_Stop";
        TraceEvents[TraceEvents["Memory_ProcessingDiffSnapshot_Start"] = 0xdb] = "Memory_ProcessingDiffSnapshot_Start";
        TraceEvents[TraceEvents["Memory_ProcessingDiffSnapshot_Stop"] = 0xdc] = "Memory_ProcessingDiffSnapshot_Stop";
        TraceEvents[TraceEvents["Debugger_StepOver_Start"] = 0x12d] = "Debugger_StepOver_Start";
        TraceEvents[TraceEvents["Debugger_StepInto_Start"] = 0x12e] = "Debugger_StepInto_Start";
        TraceEvents[TraceEvents["Debugger_StepOut_Start"] = 0x12f] = "Debugger_StepOut_Start";
        TraceEvents[TraceEvents["Debugger_OnBreak_Start"] = 0x130] = "Debugger_OnBreak_Start";
        TraceEvents[TraceEvents["Debugger_OnBreak_Stop"] = 0x131] = "Debugger_OnBreak_Stop";
        TraceEvents[TraceEvents["Debugger_PrettyPrint_Start"] = 0x132] = "Debugger_PrettyPrint_Start";
        TraceEvents[TraceEvents["Debugger_PrettyPrint_Stop"] = 0x133] = "Debugger_PrettyPrint_Stop";

        TraceEvents[TraceEvents["Debugger_CloseDocument_Start"] = 0x136] = "Debugger_CloseDocument_Start";
        TraceEvents[TraceEvents["Debugger_CloseDocument_Stop"] = 0x137] = "Debugger_CloseDocument_Stop";

        TraceEvents[TraceEvents["Debugger_RevealRange_Start"] = 0x13a] = "Debugger_RevealRange_Start";
        TraceEvents[TraceEvents["Debugger_RevealRange_Stop"] = 0x13b] = "Debugger_RevealRange_Stop";
        TraceEvents[TraceEvents["Debugger_CallstackController_GoTo_Start"] = 0x13c] = "Debugger_CallstackController_GoTo_Start";
        TraceEvents[TraceEvents["Debugger_CallstackController_GoTo_Stop"] = 0x13d] = "Debugger_CallstackController_GoTo_Stop";
        TraceEvents[TraceEvents["Debugger_BreakpointController_SetAllEnabledStates_Start"] = 0x13e] = "Debugger_BreakpointController_SetAllEnabledStates_Start";
        TraceEvents[TraceEvents["Debugger_BreakpointController_SetAllEnabledStates_Stop"] = 0x13f] = "Debugger_BreakpointController_SetAllEnabledStates_Stop";
        TraceEvents[TraceEvents["Debugger_EditorWindow_NavigateTo_Start"] = 0x140] = "Debugger_EditorWindow_NavigateTo_Start";
        TraceEvents[TraceEvents["Debugger_EditorWindow_NavigateTo_Stop"] = 0x141] = "Debugger_EditorWindow_NavigateTo_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_SetModel_Start"] = 0x142] = "Debugger_Editor_SetModel_Start";
        TraceEvents[TraceEvents["Debugger_Editor_SetModel_Stop"] = 0x143] = "Debugger_Editor_SetModel_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_CreateModel_Start"] = 0x144] = "Debugger_Editor_CreateModel_Start";
        TraceEvents[TraceEvents["Debugger_Editor_CreateModel_Stop"] = 0x145] = "Debugger_Editor_CreateModel_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_Create_Start"] = 0x146] = "Debugger_Editor_Create_Start";
        TraceEvents[TraceEvents["Debugger_Editor_Create_Stop"] = 0x147] = "Debugger_Editor_Create_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_Layout_Start"] = 0x148] = "Debugger_Editor_Layout_Start";
        TraceEvents[TraceEvents["Debugger_Editor_Layout_Stop"] = 0x149] = "Debugger_Editor_Layout_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_ChangeViewZones_Start"] = 0x14a] = "Debugger_Editor_ChangeViewZones_Start";
        TraceEvents[TraceEvents["Debugger_Editor_ChangeViewZones_Stop"] = 0x14b] = "Debugger_Editor_ChangeViewZones_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_RevealPosition_Start"] = 0x14c] = "Debugger_Editor_RevealPosition_Start";
        TraceEvents[TraceEvents["Debugger_Editor_RevealPosition_Stop"] = 0x14d] = "Debugger_Editor_RevealPosition_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_SaveViewState_Start"] = 0x14e] = "Debugger_Editor_SaveViewState_Start";
        TraceEvents[TraceEvents["Debugger_Editor_SaveViewState_Stop"] = 0x14f] = "Debugger_Editor_SaveViewState_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_RestoreViewState_Start"] = 0x150] = "Debugger_Editor_RestoreViewState_Start";
        TraceEvents[TraceEvents["Debugger_Editor_RestoreViewState_Stop"] = 0x151] = "Debugger_Editor_RestoreViewState_Stop";
        TraceEvents[TraceEvents["Debugger_EditorWindow_CreateDataTipFromPosition_Start"] = 0x152] = "Debugger_EditorWindow_CreateDataTipFromPosition_Start";
        TraceEvents[TraceEvents["Debugger_EditorWindow_CreateDataTipFromPosition_Stop"] = 0x153] = "Debugger_EditorWindow_CreateDataTipFromPosition_Stop";
        TraceEvents[TraceEvents["Debugger_BreakpointController_SetEnabledState_Start"] = 0x154] = "Debugger_BreakpointController_SetEnabledState_Start";
        TraceEvents[TraceEvents["Debugger_BreakpointController_SetEnabledState_Stop"] = 0x155] = "Debugger_BreakpointController_SetEnabledState_Stop";
        TraceEvents[TraceEvents["Debugger_BreakpointController_BreakpointChanged_Start"] = 0x156] = "Debugger_BreakpointController_BreakpointChanged_Start";
        TraceEvents[TraceEvents["Debugger_BreakpointController_BreakpointChanged_Stop"] = 0x157] = "Debugger_BreakpointController_BreakpointChanged_Stop";
        TraceEvents[TraceEvents["Debugger_BreakpointWindow_BreakpointChanged_Start"] = 0x158] = "Debugger_BreakpointWindow_BreakpointChanged_Start";
        TraceEvents[TraceEvents["Debugger_BreakpointWindow_BreakpointChanged_Stop"] = 0x159] = "Debugger_BreakpointWindow_BreakpointChanged_Stop";
        TraceEvents[TraceEvents["Debugger_WatchWindowView_RefreshView_Start"] = 0x15a] = "Debugger_WatchWindowView_RefreshView_Start";
        TraceEvents[TraceEvents["Debugger_WatchWindowView_RefreshView_Stop"] = 0x15b] = "Debugger_WatchWindowView_RefreshView_Stop";
        TraceEvents[TraceEvents["Debugger_StepDocument_Start"] = 0x15c] = "Debugger_StepDocument_Start";
        TraceEvents[TraceEvents["Debugger_ToggleJMC_Start"] = 0x15d] = "Debugger_ToggleJMC_Start";
        TraceEvents[TraceEvents["Debugger_ToggleJMC_Stop"] = 0x15e] = "Debugger_ToggleJMC_Stop";
        TraceEvents[TraceEvents["Debugger_ToggleCallstackLibraryFrames_Start"] = 0x15f] = "Debugger_ToggleCallstackLibraryFrames_Start";
        TraceEvents[TraceEvents["Debugger_ToggleCallstackLibraryFrames_Stop"] = 0x160] = "Debugger_ToggleCallstackLibraryFrames_Stop";
        TraceEvents[TraceEvents["Debugger_SpecifyUrlAsJMCType_Start"] = 0x161] = "Debugger_SpecifyUrlAsJMCType_Start";
        TraceEvents[TraceEvents["Debugger_SpecifyUrlAsJMCType_Stop"] = 0x162] = "Debugger_SpecifyUrlAsJMCType_Stop";
        TraceEvents[TraceEvents["Debugger_Persistence_DataLoad_Start"] = 0x163] = "Debugger_Persistence_DataLoad_Start";
        TraceEvents[TraceEvents["Debugger_Persistence_DataLoad_Stop"] = 0x164] = "Debugger_Persistence_DataLoad_Stop";
        TraceEvents[TraceEvents["Debugger_Persistence_AddBreakpoints_Start"] = 0x165] = "Debugger_Persistence_AddBreakpoints_Start";
        TraceEvents[TraceEvents["Debugger_Persistence_AddBreakpoints_Stop"] = 0x166] = "Debugger_Persistence_AddBreakpoints_Stop";
        TraceEvents[TraceEvents["Debugger_Persistence_AddWatches_Start"] = 0x167] = "Debugger_Persistence_AddWatches_Start";
        TraceEvents[TraceEvents["Debugger_Persistence_AddWatches_Stop"] = 0x168] = "Debugger_Persistence_AddWatches_Stop";
        TraceEvents[TraceEvents["Debugger_Persistence_TabOpen_Start"] = 0x169] = "Debugger_Persistence_TabOpen_Start";
        TraceEvents[TraceEvents["Debugger_Persistence_TabOpen_Stop"] = 0x16a] = "Debugger_Persistence_TabOpen_Stop";
        TraceEvents[TraceEvents["Debugger_Persistence_SaveState_Start"] = 0x16b] = "Debugger_Persistence_SaveState_Start";
        TraceEvents[TraceEvents["Debugger_Persistence_SaveState_Stop"] = 0x16c] = "Debugger_Persistence_SaveState_Stop";
        TraceEvents[TraceEvents["Debugger_SourceMap_ToggleSourceMap_Start"] = 0x16d] = "Debugger_SourceMap_ToggleSourceMap_Start";
        TraceEvents[TraceEvents["Debugger_SourceMap_ToggleSourceMap_Stop"] = 0x16e] = "Debugger_SourceMap_ToggleSourceMap_Stop";
        TraceEvents[TraceEvents["Debugger_SourceMap_ParseSourceMapAsync_Start"] = 0x16f] = "Debugger_SourceMap_ParseSourceMapAsync_Start";
        TraceEvents[TraceEvents["Debugger_SourceMap_ParseSourceMapAsync_Stop"] = 0x170] = "Debugger_SourceMap_ParseSourceMapAsync_Stop";
        TraceEvents[TraceEvents["Debugger_Editor_GetOrCreateMode_Start"] = 0x171] = "Debugger_Editor_GetOrCreateMode_Start";
        TraceEvents[TraceEvents["Debugger_Editor_GetOrCreateMode_Stop"] = 0x172] = "Debugger_Editor_GetOrCreateMode_Stop";
        TraceEvents[TraceEvents["Debugger_OnAddDocuments_Info"] = 0x173] = "Debugger_OnAddDocuments_Info";
        TraceEvents[TraceEvents["Debugger_Intellisense_ListBox_Build_Start"] = 0x174] = "Debugger_Intellisense_ListBox_Build_Start";
        TraceEvents[TraceEvents["Debugger_Intellisense_ListBox_Build_Stop"] = 0x175] = "Debugger_Intellisense_ListBox_Build_Stop";
        TraceEvents[TraceEvents["Debugger_Intellisense_ListBox_Reset_Start"] = 0x176] = "Debugger_Intellisense_ListBox_Reset_Start";
        TraceEvents[TraceEvents["Debugger_Intellisense_ListBox_Reset_Stop"] = 0x177] = "Debugger_Intellisense_ListBox_Reset_Stop";
        TraceEvents[TraceEvents["Debugger_Intellisense_Menu_Filter_Start"] = 0x178] = "Debugger_Intellisense_Menu_Filter_Start";
        TraceEvents[TraceEvents["Debugger_Intellisense_Menu_Filter_Stop"] = 0x179] = "Debugger_Intellisense_Menu_Filter_Stop";
        TraceEvents[TraceEvents["Debugger_Intellisense_Menu_Layout_Start"] = 0x17a] = "Debugger_Intellisense_Menu_Layout_Start";
        TraceEvents[TraceEvents["Debugger_Intellisense_Menu_Layout_Stop"] = 0x17b] = "Debugger_Intellisense_Menu_Layout_Stop";
        TraceEvents[TraceEvents["Debugger_Intellisense_Provider_Get_Expression_Start"] = 0x17c] = "Debugger_Intellisense_Provider_Get_Expression_Start";
        TraceEvents[TraceEvents["Debugger_Intellisense_Provider_Get_Expression_Stop"] = 0x17d] = "Debugger_Intellisense_Provider_Get_Expression_Stop";
        TraceEvents[TraceEvents["Debugger_Intellisense_Provider_Update_Start"] = 0x17e] = "Debugger_Intellisense_Provider_Update_Start";
        TraceEvents[TraceEvents["Debugger_Intellisense_Provider_Update_Stop"] = 0x17f] = "Debugger_Intellisense_Provider_Update_Stop";
        TraceEvents[TraceEvents["Debugger_Intellisense_Provider_Get_Items_Start"] = 0x180] = "Debugger_Intellisense_Provider_Get_Items_Start";
        TraceEvents[TraceEvents["Debugger_Intellisense_Provider_Get_Items_Stop"] = 0x181] = "Debugger_Intellisense_Provider_Get_Items_Stop";
        TraceEvents[TraceEvents["Debugger_AsyncStackProvider_GetFrames_Start"] = 0x182] = "Debugger_AsyncStackProvider_GetFrames_Start";
        TraceEvents[TraceEvents["Debugger_AsyncStackProvider_GetFrames_Stop"] = 0x183] = "Debugger_AsyncStackProvider_GetFrames_Stop";
        TraceEvents[TraceEvents["Debugger_AsyncStackProvider_GetFrames_Timeout"] = 0x184] = "Debugger_AsyncStackProvider_GetFrames_Timeout";
        TraceEvents[TraceEvents["Console_Window_Create_Start"] = 0x191] = "Console_Window_Create_Start";
        TraceEvents[TraceEvents["Console_Window_Create_Stop"] = 0x192] = "Console_Window_Create_Stop";
        TraceEvents[TraceEvents["Console_Attach_Start"] = 0x193] = "Console_Attach_Start";
        TraceEvents[TraceEvents["Console_Attach_Stop"] = 0x194] = "Console_Attach_Stop";
        TraceEvents[TraceEvents["Console_Message_Start"] = 0x195] = "Console_Message_Start";
        TraceEvents[TraceEvents["Console_Message_Stop"] = 0x196] = "Console_Message_Stop";
        TraceEvents[TraceEvents["Console_Input_Start"] = 0x197] = "Console_Input_Start";
        TraceEvents[TraceEvents["Console_Input_Stop"] = 0x198] = "Console_Input_Stop";
        TraceEvents[TraceEvents["Console_Output_Start"] = 0x199] = "Console_Output_Start";
        TraceEvents[TraceEvents["Console_Output_Stop"] = 0x19a] = "Console_Output_Stop";
        TraceEvents[TraceEvents["Console_Output_Render_Start"] = 0x19b] = "Console_Output_Render_Start";
        TraceEvents[TraceEvents["Console_Output_Render_Stop"] = 0x19c] = "Console_Output_Render_Stop";
        TraceEvents[TraceEvents["Console_Item_Toggle_Start"] = 0x19d] = "Console_Item_Toggle_Start";
        TraceEvents[TraceEvents["Console_Item_Toggle_Stop"] = 0x19e] = "Console_Item_Toggle_Stop";
        TraceEvents[TraceEvents["Console_HtmlLines_Expand_Start"] = 0x19f] = "Console_HtmlLines_Expand_Start";
        TraceEvents[TraceEvents["Console_HtmlLines_Expand_Stop"] = 0x1a0] = "Console_HtmlLines_Expand_Stop";
        TraceEvents[TraceEvents["Console_Context_Menu_Loading_Start"] = 0x1a1] = "Console_Context_Menu_Loading_Start";
        TraceEvents[TraceEvents["Console_Context_Menu_Loading_Stop"] = 0x1a2] = "Console_Context_Menu_Loading_Stop";
        TraceEvents[TraceEvents["Console_Scroll_Start"] = 0x1a3] = "Console_Scroll_Start";
        TraceEvents[TraceEvents["Console_Scroll_Stop"] = 0x1a4] = "Console_Scroll_Stop";
        TraceEvents[TraceEvents["Console_Intellisense_ListBox_Build_Start"] = 0x1a5] = "Console_Intellisense_ListBox_Build_Start";
        TraceEvents[TraceEvents["Console_Intellisense_ListBox_Build_Stop"] = 0x1a6] = "Console_Intellisense_ListBox_Build_Stop";
        TraceEvents[TraceEvents["Console_Intellisense_ListBox_Reset_Start"] = 0x1a7] = "Console_Intellisense_ListBox_Reset_Start";
        TraceEvents[TraceEvents["Console_Intellisense_ListBox_Reset_Stop"] = 0x1a8] = "Console_Intellisense_ListBox_Reset_Stop";
        TraceEvents[TraceEvents["Console_Intellisense_Menu_Filter_Start"] = 0x1a9] = "Console_Intellisense_Menu_Filter_Start";
        TraceEvents[TraceEvents["Console_Intellisense_Menu_Filter_Stop"] = 0x1aa] = "Console_Intellisense_Menu_Filter_Stop";
        TraceEvents[TraceEvents["Console_Intellisense_Menu_Layout_Start"] = 0x1ab] = "Console_Intellisense_Menu_Layout_Start";
        TraceEvents[TraceEvents["Console_Intellisense_Menu_Layout_Stop"] = 0x1ac] = "Console_Intellisense_Menu_Layout_Stop";
        TraceEvents[TraceEvents["Console_Intellisense_Provider_Get_Expression_Start"] = 0x1ad] = "Console_Intellisense_Provider_Get_Expression_Start";
        TraceEvents[TraceEvents["Console_Intellisense_Provider_Get_Expression_Stop"] = 0x1ae] = "Console_Intellisense_Provider_Get_Expression_Stop";
        TraceEvents[TraceEvents["Console_Intellisense_Provider_Update_Start"] = 0x1af] = "Console_Intellisense_Provider_Update_Start";
        TraceEvents[TraceEvents["Console_Intellisense_Provider_Update_Stop"] = 0x1b0] = "Console_Intellisense_Provider_Update_Stop";
        TraceEvents[TraceEvents["Console_Intellisense_Provider_Get_Items_Start"] = 0x1b1] = "Console_Intellisense_Provider_Get_Items_Start";
        TraceEvents[TraceEvents["Console_Intellisense_Provider_Get_Items_Stop"] = 0x1b2] = "Console_Intellisense_Provider_Get_Items_Stop";
        TraceEvents[TraceEvents["Dom_Window_Create_Start"] = 501] = "Dom_Window_Create_Start";
        TraceEvents[TraceEvents["Dom_Window_Create_Stop"] = 502] = "Dom_Window_Create_Stop";
        TraceEvents[TraceEvents["Dom_ExpandNode_Start"] = 503] = "Dom_ExpandNode_Start";
        TraceEvents[TraceEvents["Dom_ExpandNode_Stop"] = 504] = "Dom_ExpandNode_Stop";
        TraceEvents[TraceEvents["Dom_UndoRedo_Start"] = 505] = "Dom_UndoRedo_Start";
        TraceEvents[TraceEvents["Dom_UndoRedo_Stop"] = 506] = "Dom_UndoRedo_Stop";
        TraceEvents[TraceEvents["Dom_DragDrop_Start"] = 507] = "Dom_DragDrop_Start";
        TraceEvents[TraceEvents["Dom_DragDrop_Stop"] = 508] = "Dom_DragDrop_Stop";
        TraceEvents[TraceEvents["Dom_AddAttribute_Start"] = 509] = "Dom_AddAttribute_Start";
        TraceEvents[TraceEvents["Dom_AddAttribute_Stop"] = 510] = "Dom_AddAttribute_Stop";
        TraceEvents[TraceEvents["Dom_Intellisense_Start"] = 511] = "Dom_Intellisense_Start";
        TraceEvents[TraceEvents["Dom_Intellisense_Stop"] = 512] = "Dom_Intellisense_Stop";
        TraceEvents[TraceEvents["Dom_SelectElement_Start"] = 513] = "Dom_SelectElement_Start";
        TraceEvents[TraceEvents["Dom_SelectElement_Stop"] = 514] = "Dom_SelectElement_Stop";
        TraceEvents[TraceEvents["Dom_CutElement_Start"] = 515] = "Dom_CutElement_Start";
        TraceEvents[TraceEvents["Dom_CutElement_Stop"] = 516] = "Dom_CutElement_Stop";
        TraceEvents[TraceEvents["Dom_PasteElement_Start"] = 517] = "Dom_PasteElement_Start";
        TraceEvents[TraceEvents["Dom_PasteElement_Stop"] = 518] = "Dom_PasteElement_Stop";
        TraceEvents[TraceEvents["Dom_CollapseElement_Start"] = 519] = "Dom_CollapseElement_Start";
        TraceEvents[TraceEvents["Dom_CollapseElement_Stop"] = 520] = "Dom_CollapseElement_Stop";
        TraceEvents[TraceEvents["Dom_StylesTabLoad_Start"] = 521] = "Dom_StylesTabLoad_Start";
        TraceEvents[TraceEvents["Dom_StylesTabLoad_Stop"] = 522] = "Dom_StylesTabLoad_Stop";
        TraceEvents[TraceEvents["Dom_StylesTab_Intellisense_Start"] = 523] = "Dom_StylesTab_Intellisense_Start";
        TraceEvents[TraceEvents["Dom_StylesTab_Intellisense_Stop"] = 524] = "Dom_StylesTab_Intellisense_Stop";
        TraceEvents[TraceEvents["Dom_TreeItemExpand_Start"] = 525] = "Dom_TreeItemExpand_Start";
        TraceEvents[TraceEvents["Dom_TreeItemExpand_Stop"] = 526] = "Dom_TreeItemExpand_Stop";
        TraceEvents[TraceEvents["Dom_ComputedTabLoad_Start"] = 527] = "Dom_ComputedTabLoad_Start";
        TraceEvents[TraceEvents["Dom_ComputedTabLoad_Stop"] = 528] = "Dom_ComputedTabLoad_Stop";
        TraceEvents[TraceEvents["Dom_ChangesTabLoad_Start"] = 529] = "Dom_ChangesTabLoad_Start";
        TraceEvents[TraceEvents["Dom_ChangesTabLoad_Stop"] = 530] = "Dom_ChangesTabLoad_Stop";
        TraceEvents[TraceEvents["Dom_LayoutTabLoad_Start"] = 531] = "Dom_LayoutTabLoad_Start";
        TraceEvents[TraceEvents["Dom_LayoutTabLoad_Stop"] = 532] = "Dom_LayoutTabLoad_Stop";
        TraceEvents[TraceEvents["Dom_EventsTabLoad_Start"] = 533] = "Dom_EventsTabLoad_Start";
        TraceEvents[TraceEvents["Dom_EventsTabLoad_Stop"] = 534] = "Dom_EventsTabLoad_Stop";
        TraceEvents[TraceEvents["Dom_TreeItemCollapse_Start"] = 535] = "Dom_TreeItemCollapse_Start";
        TraceEvents[TraceEvents["Dom_TreeItemCollapse_Stop"] = 536] = "Dom_TreeItemCollapse_Stop";
        TraceEvents[TraceEvents["Dom_Search_Start"] = 537] = "Dom_Search_Start";
        TraceEvents[TraceEvents["Dom_Search_Stop"] = 538] = "Dom_Search_Stop";
        TraceEvents[TraceEvents["Dom_RemoteInjection_Start"] = 539] = "Dom_RemoteInjection_Start";
        TraceEvents[TraceEvents["Dom_RemoteInjection_Stop"] = 540] = "Dom_RemoteInjection_Stop";
        TraceEvents[TraceEvents["Dom_EnterEditAsHtml_Start"] = 541] = "Dom_EnterEditAsHtml_Start";
        TraceEvents[TraceEvents["Dom_EnterEditAsHtml_Stop"] = 542] = "Dom_EnterEditAsHtml_Stop";
        TraceEvents[TraceEvents["Dom_CommitEditAsHtml_Start"] = 543] = "Dom_CommitEditAsHtml_Start";
        TraceEvents[TraceEvents["Dom_CommitEditAsHtml_Stop"] = 544] = "Dom_CommitEditAsHtml_Stop";
        TraceEvents[TraceEvents["Dom_CommitEditAttribute_Start"] = 545] = "Dom_CommitEditAttribute_Start";
        TraceEvents[TraceEvents["Dom_CommitEditAttribute_Stop"] = 546] = "Dom_CommitEditAttribute_Stop";
        TraceEvents[TraceEvents["Dom_ShowColorPicker_Start"] = 547] = "Dom_ShowColorPicker_Start";
        TraceEvents[TraceEvents["Dom_ShowColorPicker_Stop"] = 548] = "Dom_ShowColorPicker_Stop";
        TraceEvents[TraceEvents["Dom_HideColorPicker_Start"] = 549] = "Dom_HideColorPicker_Start";
        TraceEvents[TraceEvents["Dom_HideColorPicker_Stop"] = 550] = "Dom_HideColorPicker_Stop";
        TraceEvents[TraceEvents["Dom_SetColorUsingColorPicker_Start"] = 551] = "Dom_SetColorUsingColorPicker_Start";
        TraceEvents[TraceEvents["Dom_SetColorUsingColorPicker_Stop"] = 552] = "Dom_SetColorUsingColorPicker_Stop";

        TraceEvents[TraceEvents["Emulation_Window_Create_Start"] = 0x259] = "Emulation_Window_Create_Start";
        TraceEvents[TraceEvents["Emulation_Window_Create_Stop"] = 0x25a] = "Emulation_Window_Create_Stop";
        TraceEvents[TraceEvents["Generic_Debug_1_Start"] = 0x2bd] = "Generic_Debug_1_Start";
        TraceEvents[TraceEvents["Generic_Debug_1_Stop"] = 0x2be] = "Generic_Debug_1_Stop";
        TraceEvents[TraceEvents["Generic_Debug_2_Start"] = 0x2bf] = "Generic_Debug_2_Start";
        TraceEvents[TraceEvents["Generic_Debug_2_Stop"] = 0x2c0] = "Generic_Debug_2_Stop";
        TraceEvents[TraceEvents["Generic_Debug_3_Start"] = 0x2c1] = "Generic_Debug_3_Start";
        TraceEvents[TraceEvents["Generic_Debug_3_Stop"] = 0x2c2] = "Generic_Debug_3_Stop";
        TraceEvents[TraceEvents["Generic_Debug_4_Start"] = 0x2c3] = "Generic_Debug_4_Start";
        TraceEvents[TraceEvents["Generic_Debug_4_Stop"] = 0x2c4] = "Generic_Debug_4_Stop";
        TraceEvents[TraceEvents["Generic_Debug_5_Start"] = 0x2c5] = "Generic_Debug_5_Start";
        TraceEvents[TraceEvents["Generic_Debug_5_Stop"] = 0x2c6] = "Generic_Debug_5_Stop";
        TraceEvents[TraceEvents["Generic_Debug_6_Start"] = 0x2c7] = "Generic_Debug_6_Start";
        TraceEvents[TraceEvents["Generic_Debug_6_Stop"] = 0x2c8] = "Generic_Debug_6_Stop";
        TraceEvents[TraceEvents["Generic_Debug_7_Start"] = 0x2c9] = "Generic_Debug_7_Start";
        TraceEvents[TraceEvents["Generic_Debug_7_Stop"] = 0x2ca] = "Generic_Debug_7_Stop";
        TraceEvents[TraceEvents["Generic_Debug_8_Start"] = 0x2cb] = "Generic_Debug_8_Start";
        TraceEvents[TraceEvents["Generic_Debug_8_Stop"] = 0x2cc] = "Generic_Debug_8_Stop";
        TraceEvents[TraceEvents["Generic_Debug_9_Start"] = 0x2cd] = "Generic_Debug_9_Start";
        TraceEvents[TraceEvents["Generic_Debug_9_Stop"] = 0x2ce] = "Generic_Debug_9_Stop";
        TraceEvents[TraceEvents["Header_InitializeTabs_Start"] = 0x321] = "Header_InitializeTabs_Start";
        TraceEvents[TraceEvents["Header_InitializeTabs_Stop"] = 0x322] = "Header_InitializeTabs_Stop";
    })(Common.TraceEvents || (Common.TraceEvents = {}));
    var TraceEvents = Common.TraceEvents;

    (function (TraceEventsWithKey) {
        TraceEventsWithKey[TraceEventsWithKey["Debugger_OpenDocument_Start"] = 0x134] = "Debugger_OpenDocument_Start";
        TraceEventsWithKey[TraceEventsWithKey["Debugger_OpenDocument_Stop"] = 0x135] = "Debugger_OpenDocument_Stop";
        TraceEventsWithKey[TraceEventsWithKey["Debugger_SwitchDocument_Start"] = 0x138] = "Debugger_SwitchDocument_Start";
        TraceEventsWithKey[TraceEventsWithKey["Debugger_SwitchDocument_Stop"] = 0x139] = "Debugger_SwitchDocument_Stop";
    })(Common.TraceEventsWithKey || (Common.TraceEventsWithKey = {}));
    var TraceEventsWithKey = Common.TraceEventsWithKey;

    var DefaultTraceWriter = (function () {
        function DefaultTraceWriter() {
        }
        DefaultTraceWriter.prototype.raiseEvent = function (eventId) {
        };
        DefaultTraceWriter.prototype.raiseEventWithMessage = function (eventId, traceMessage) {
        };
        DefaultTraceWriter.prototype.raiseEventWithKey = function (eventId, key, traceMessage) {
        };
        return DefaultTraceWriter;
    })();
    Common.DefaultTraceWriter = DefaultTraceWriter;

    var TraceWriter = (function () {
        function TraceWriter(performanceTracer) {
            if (!performanceTracer && Plugin) {
                if (Plugin.F12) {
                    performanceTracer = Plugin.F12.TraceWriter;
                } else if (Plugin.VS) {
                    performanceTracer = Plugin.VS.Utilities.createExternalObject("PerformanceTraceExtension", "{D76A409F-7234-4B71-9BFD-DEF3DC4CCCA6}");
                }
            }

            this._performanceTracer = performanceTracer;
        }
        TraceWriter.prototype.raiseEventWithKey = function (eventId, key, traceMessage) {
            if (this._performanceTracer) {
                this._performanceTracer.raiseEventWithKey(eventId, key, traceMessage);
            }
        };

        TraceWriter.prototype.raiseEventWithMessage = function (eventId, traceMessage) {
            if (this._performanceTracer) {
                this._performanceTracer.raiseEvent(eventId, traceMessage);
            }
        };

        TraceWriter.prototype.raiseEvent = function (eventId) {
            this.raiseEventWithMessage(eventId, "");
        };
        return TraceWriter;
    })();
    Common.TraceWriter = TraceWriter;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/trace.js.map

// htmlTreeView.ts
"use strict";
var HtmlTreeView = (function () {
    function HtmlTreeView() {
    }
    Object.defineProperty(HtmlTreeView, "first", {
        get: function () {
            return $m("#tree").find(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(HtmlTreeView, "last", {
        get: function () {
            return $m("#tree").find(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").last();
        },
        enumerable: true,
        configurable: true
    });

    HtmlTreeView.init = function (item, treeChangeCallBack, traceWriter) {
        HtmlTreeView.TreeChangeCallBack = treeChangeCallBack;
        HtmlTreeView.TraceWriter = traceWriter;

        var rootElement = $m("<div>").addClass("BPT-HtmlTree");
        item.append(rootElement);

        var useDarkTheme = Common.ToolWindowHelpers.isDarkThemeBackground(rootElement);
        if (useDarkTheme) {
            rootElement.addClass("BPT-Tree-DarkTheme");
        } else {
            rootElement.removeClass("BPT-Tree-DarkTheme");
        }

        if (!rootElement.data("attachedHandlers")) {
            var container = rootElement.parent(".BPT-HtmlTree-Container");

            container.bind("mousedown", function HtmlTreeView$mousedown(event) {
                $m(this).data("mouseActivate", true);

                var element = $m(event.target);
                if (element.hasClass("BPT-HtmlTree-ChildCollection-ShowAll")) {
                    return;
                }

                var row = element.closest(".BPT-HtmlTreeItem");

                if (row.length > 0) {
                    row = HtmlTreeView.findChildByClickProximity(row, event);
                    var selectedElement = HtmlTreeView.getSelected(row);
                    var focusAndScrollIntoView = row.get(0) !== selectedElement.get(0);
                    HtmlTreeView.select(row, focusAndScrollIntoView);
                }
            });

            container.bind("click", function HtmlTreeView$click(event) {
                var element = $m(event.target);
                if (element.hasClass("BPT-HtmlTree-ChildCollection-ShowAll")) {
                    return;
                }
            });

            container.bind("mousedown", function HtmlTreeView$click(event) {
                var element = $m(event.target);
                if (element.hasClass("BPT-HtmlTreeItem-ExpandIcon")) {
                    var row = element.closest(".BPT-HtmlTreeItem");
                    if (row.length > 0) {
                        HtmlTreeView.toggle(row);
                    }
                }
            });

            container.bind("dblclick", function HtmlTreeView$dblclick(event) {
                var element = $m(event.target);
                var item = element.closest(".BPT-HtmlTreeItem, .BPT-HTML-Attribute-Section, .BPT-HTML-Attribute, .BPT-HTML-Text, .BPT-HtmlTree-ChildCollection-Pager");

                if (item.length > 0) {
                    if (item.hasClass("BPT-HtmlTreeItem")) {
                        if (item.hasClass("BPT-HtmlTreeItem-Collapsed") || item.hasClass("BPT-HtmlTreeItem-Expanded")) {
                            if (!element.hasClass("BPT-HtmlTreeItem-ExpandIcon")) {
                                HtmlTreeView.toggle(item);
                            }
                        }
                    } else if (item.hasClass("BPT-HTML-Attribute-Section") || item.hasClass("BPT-HTML-Attribute") || item.hasClass("BPT-HTML-Text")) {
                        var row = item.parents(".BPT-HtmlTreeItem").first();
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

            container.bind("focus", function HtmlTreeView$focus(event) {
                var element = $m(this);

                if (!element.data("mouseActivate")) {
                    var selected = HtmlTreeView.getSelected(element.children(".BPT-HtmlTree"));

                    if (selected.length === 0) {
                        selected = HtmlTreeView.select(element.find(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first());
                    }

                    HtmlTreeView.focusSelected();
                    var wasScrolled = HtmlTreeView.scrollItemIntoView(selected);

                    if (wasScrolled) {
                        event.preventDefault();
                        return false;
                    }
                }

                event.preventDefault();
                element.data("mouseActivate", false);
            });

            container.bind("keydown", function HtmlTreeView$keydown(event) {
                if ($m("#tree").find(".BPT-EditBox").length > 0) {
                    return true;
                }

                var noKeys = !event.shiftKey && !event.ctrlKey && !event.altKey;
                var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
                var ctrlKey = event.ctrlKey && !event.shiftKey && !event.altKey;

                if (event.keyCode >= 37 /* ArrowFirst */ && event.keyCode <= 40 /* ArrowLast */ && noKeys) {
                    var activeElement = document.activeElement;
                    if (activeElement && activeElement.type === "text") {
                        return;
                    }

                    var selected = HtmlTreeView.getSelected($m(this).children().first());

                    var moveUp = function HtmlTreeView$keydown$moveUp(toParent) {
                        var newElement = HtmlTreeView.findNextElementUp(selected, toParent);
                        if (newElement && newElement.length > 0) {
                            HtmlTreeView.select(newElement);
                            event.preventDefault();
                            return false;
                        }
                    };

                    var moveDown = function HtmlTreeView$keydown$moveDown() {
                        var newElement = HtmlTreeView.findNextElementDown(selected);
                        if (newElement && newElement.length > 0) {
                            HtmlTreeView.select(newElement);
                            event.preventDefault();
                            return false;
                        }
                    };

                    if (selected.length > 0) {
                        switch (event.keyCode) {
                            case 37 /* ArrowLeft */:
                                if (selected.hasClass("BPT-HtmlTreeItem-Expanded")) {
                                    HtmlTreeView.toggle(selected);
                                } else {
                                    moveUp(true);
                                }

                                break;

                            case 38 /* ArrowUp */:
                                moveUp();
                                break;

                            case 39 /* ArrowRight */:
                                if (selected.hasClass("BPT-HtmlTreeItem-Collapsed")) {
                                    HtmlTreeView.toggle(selected);
                                } else if (selected.hasClass("BPT-HtmlTreeItem-Expanded")) {
                                    moveDown();
                                }

                                break;

                            case 40 /* ArrowDown */:
                                moveDown();
                                break;
                        }
                    } else {
                        selected = $m("#tree");
                        moveDown();
                    }

                    event.preventDefault();
                    return false;
                } else if (event.keyCode === 32 /* Space */ && noKeys) {
                    var selectedNode = HtmlTreeView.getSelected($m(this).children().first());
                    var isShowAllLink = selectedNode.hasClass("BPT-HtmlTree-ChildCollection-ShowAll");

                    if (isShowAllLink) {
                        selectedNode.click();
                        event.stopPropagation();
                        return false;
                    }

                    if (document.activeElement && document.activeElement.type !== "text") {
                        event.preventDefault();
                        return false;
                    }
                } else if (event.keyCode === 13 /* Enter */ && (noKeys || ctrlKey)) {
                    var editAsHtml = ctrlKey;

                    if (document.activeElement && document.activeElement.type !== "text") {
                        var selectedNode = HtmlTreeView.getSelected($m(this).children().first());
                        var isShowAllLink = selectedNode.hasClass("BPT-HtmlTree-ChildCollection-ShowAll");

                        if (isShowAllLink) {
                            selectedNode.click();
                            event.stopPropagation();
                            return false;
                        }

                        var editCallback = selectedNode.data("editCallback");
                        editCallback = (editCallback ? editCallback : selectedNode.parent().data("editCallback"));
                        if (editCallback) {
                            editCallback(selectedNode, null, editAsHtml);
                            event.stopPropagation();
                            return false;
                        }
                    }
                } else if ((event.keyCode === 36 /* Home */ || event.keyCode === 35 /* End */) && (noKeys || ctrlKey)) {
                    var newElement = event.keyCode === 36 /* Home */ ? HtmlTreeView.first : HtmlTreeView.last;
                    if (newElement && newElement.length > 0) {
                        HtmlTreeView.select(newElement);
                        event.preventDefault();
                        return false;
                    }
                }
            });
            container = null;
            rootElement.data("attachedHandlers", true);
        }

        return this;
    };

    HtmlTreeView.scrollItemIntoView = function (item) {
        if (!item || !item.length) {
            return false;
        }

        var isShowAllLink = item.hasClass("BPT-HtmlTree-ChildCollection-ShowAll");

        if (isShowAllLink) {
            return Common.ToolWindowHelpers.scrollIntoView(item.get(0), item.closest(".BPT-HtmlTree-ScrollContainer").get(0));
        } else {
            return Common.ToolWindowHelpers.scrollIntoView(item.children(".BPT-HtmlTreeItem-Header").get(0), item.closest(".BPT-HtmlTree-ScrollContainer").get(0));
        }
    };

    HtmlTreeView.findNextElementUp = function (item, toParent) {
        var newElement = null;
        var sibling = item.prev(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").last();
        if (sibling.length > 0 && !toParent) {
            newElement = sibling.find(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").last();

            if (newElement.length === 0) {
                newElement = sibling;
            }
        } else {
            newElement = item.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
        }

        return newElement;
    };

    HtmlTreeView.findNextElementDown = function (item) {
        var newElement = item.find(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
        newElement = (newElement.length > 0 ? newElement : item.next(".BPT-HtmlTreeItem").first());

        var searchedParent = item;
        while (newElement.length === 0) {
            searchedParent = searchedParent.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
            if (searchedParent.length === 0) {
                break;
            }

            newElement = searchedParent.next(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
        }

        return newElement;
    };

    HtmlTreeView.destroy = function (item) {
        if (item.data("attachedHandlers")) {
            item.children(".BPT-HtmlTree-Container").unbind(".htmlTreeView");
            item.data("attachedHandlers", false);
        }
    };

    HtmlTreeView.addRootElement = function (item, uid, tag, rootTagToShow, toggleCallback, editCallback, selectCallback) {
        if (toggleCallback) {
            item.data("toggleCallback", toggleCallback);
        }

        var newElements = [{ uid: uid, tag: tag, text: "", hasChildren: (toggleCallback ? true : false), attributes: null, rootTagToShow: rootTagToShow }];

        return HtmlTreeView.addElements(item, newElements, toggleCallback, editCallback, selectCallback).children().first();
    };

    HtmlTreeView.addElements = function (item, elements, toggleCallback, editCallback, selectCallback, keepExistingElements, stopAutoScroll, virtualElementCount) {
        if (typeof keepExistingElements === "undefined") { keepExistingElements = false; }
        if (typeof stopAutoScroll === "undefined") { stopAutoScroll = false; }
        var childrenCollection = document.createElement("div");
        childrenCollection.classList.add("BPT-HtmlTree-ChildCollection");

        var isShowingAll = true;
        var elementCount = virtualElementCount || elements.length;

        if (!item.data("forceShowAll")) {
            if (elementCount > HtmlTreeView.InitialElementLimit) {
                elementCount = HtmlTreeView.InitialElementLimit;
                isShowingAll = false;
            }
        }

        var existingIdMap = {};
        if (keepExistingElements) {
            var existingElements = item.children(".BPT-HtmlTree-ChildCollection").children();
            for (var elementIndex = 0; elementIndex < existingElements.length; elementIndex++) {
                var uid = $m(existingElements.get(elementIndex)).attr("data-id");
                existingIdMap[uid] = true;
            }
        }

        var whitespaceRegex = /^\s+|\s+$/;
        for (var i = 0, len = elements.length; i < len; i++) {
            var id = elements[i].uid;
            var tag = elements[i].tag;
            var text = elements[i].text;
            var isExpandable = elements[i].hasChildren;
            var attributes = elements[i].attributes;
            var rootTagToShow = elements[i].rootTagToShow;

            if (!tag && (!text || !text.replace(whitespaceRegex, ""))) {
                continue;
            }

            if (keepExistingElements && existingIdMap[id]) {
                var replaceMe = document.createElement("div");
                replaceMe.classList.add("replaceMe");
                replaceMe.setAttribute("data-id", id);
                childrenCollection.appendChild(replaceMe);
                continue;
            }

            var header = document.createElement("span");
            var footer = document.createElement("span");
            var collapsedFooter = document.createElement("span");
            if (tag === "#document") {
                header.classList.add("BPT-HTML-Document");
                footer.classList.add("BPT-HTML-Document");
                collapsedFooter.classList.add("BPT-HTML-Document");
                if (rootTagToShow) {
                    var tagName = document.createElement("span");
                    tagName.classList.add("BPT-HTML-Tag");
                    tagName.appendChild(document.createTextNode(rootTagToShow));

                    header.appendChild(tagName);

                    var endTagName = document.createElement("span");
                    endTagName.classList.add("BPT-HTML-Tag");
                    endTagName.appendChild(document.createTextNode(rootTagToShow));

                    footer.appendChild(endTagName);

                    var collapsedEndTagName = document.createElement("span");
                    collapsedEndTagName.classList.add("BPT-HTML-Tag");
                    collapsedEndTagName.appendChild(document.createTextNode(rootTagToShow));

                    collapsedFooter.appendChild(collapsedEndTagName);
                }
            } else if (tag === "#doctype") {
                header.classList.add("BPT-HTML-DocType");
                footer.classList.add("BPT-HTML-DocType");
                collapsedFooter.classList.add("BPT-HTML-DocType");
            } else if (tag === "#comment") {
                header.classList.add("BPT-HTML-Comment");
                header.appendChild(document.createTextNode("<!--"));
                footer.classList.add("BPT-HTML-Comment");
                footer.appendChild(document.createTextNode("-->"));
                collapsedFooter.classList.add("BPT-HTML-Comment");
                collapsedFooter.appendChild(document.createTextNode("-->"));
            } else if (tag === null || tag === undefined) {
                footer.classList.add("BPT-HTML-Text");
                collapsedFooter.classList.add("BPT-HTML-Text");
            } else {
                var openTagName = document.createElement("span");
                openTagName.classList.add("BPT-HTML-Tag");
                openTagName.appendChild(document.createTextNode(tag));

                header.appendChild(openTagName);

                if (attributes && attributes.length > 0) {
                    for (var j = 0; j < attributes.length; j++) {
                        var attrName = attributes[j].name;
                        var attributeSection = document.createElement("span");
                        attributeSection.classList.add("BPT-HTML-Attribute-Section");
                        attributeSection.setAttribute("data-attrName", attrName);

                        var attributeNode = document.createElement("span");
                        attributeNode.classList.add("BPT-HTML-Attribute");
                        attributeNode.appendChild(document.createTextNode(attrName));
                        attributeSection.appendChild(attributeNode);

                        var attrValue = HtmlTreeView.prepareAttributeValueForDisplay(attributes[j].value);
                        var attributeValue = document.createElement("span");
                        attributeValue.classList.add("BPT-HTML-Value");
                        attributeValue.appendChild(document.createTextNode(attrValue));
                        attributeSection.appendChild(attributeValue);

                        header.appendChild(attributeSection);
                    }
                }

                var endTagName = document.createElement("span");
                endTagName.classList.add("BPT-HTML-Tag");
                endTagName.appendChild(document.createTextNode(tag));
                footer.appendChild(endTagName);

                var collapsedEndTagName = document.createElement("span");
                collapsedEndTagName.classList.add("BPT-HTML-Tag");
                collapsedEndTagName.appendChild(document.createTextNode(tag));
                collapsedFooter.appendChild(collapsedEndTagName);
            }

            var textContent = undefined;
            if (text) {
                textContent = document.createElement("span");
                textContent.classList.add("BPT-HTML-Text");
                textContent.appendChild(document.createTextNode(text));
            }

            var collapsedFooterElement = document.createElement("span");
            collapsedFooterElement.classList.add("BPT-HtmlTreeItem-CollapsedFooter");
            if (isExpandable) {
                var ellipsesElement = document.createElement("span");
                ellipsesElement.classList.add("BPT-HtmlTreeItem-Ellipsis");
                ellipsesElement.appendChild(document.createTextNode("..."));
                collapsedFooterElement.appendChild(ellipsesElement);
            }

            var collapsedFooterContainer = document.createElement("span");
            collapsedFooterContainer.classList.add("BPT-HTML");
            collapsedFooterContainer.appendChild(collapsedFooter);
            collapsedFooterElement.appendChild(collapsedFooterContainer);

            var newElement = document.createElement("div");
            newElement.classList.add("BPT-HtmlTreeItem");
            newElement.setAttribute("data-id", id);
            newElement.setAttribute("data-tag", tag ? tag : "#text");
            var headerElement = document.createElement("div");
            headerElement.classList.add("BPT-HtmlTreeItem-Header");

            if (tag === "#document" && !rootTagToShow) {
                textContent = undefined;
                collapsedFooterElement = undefined;
                newElement.classList.add("BPT-HtmlTreeItem-HiddenRoot");
                newElement.classList.add("BPT-HtmlTreeItem-Collapsed");
            } else if (isExpandable) {
                newElement.classList.add("BPT-HtmlTreeItem-Collapsed");
                var expandIcon = document.createElement("div");
                expandIcon.classList.add("BPT-HtmlTreeItem-ExpandIcon");
                newElement.appendChild(expandIcon);
                headerElement.setAttribute("role", "group");
                headerElement.setAttribute("aria-expanded", "false");
                HtmlTreeView.addDOMAttrModifiedHandler(headerElement);
            } else {
                headerElement.setAttribute("role", "treeitem");
            }

            if (item.attr("data-tag") === "NodeList" || item.attr("data-tag") === "HtmlCollection") {
                var textElement = document.createElement("span");
                textElement.classList.add("BPT-HTML");
                textElement.classList.add("BPT-HTML-Text");
                textElement.classList.add("BPT-HTML-Numbering");
                textElement.appendChild(document.createTextNode(i + ""));
                headerElement.appendChild(textElement);
            }

            var headerSub = document.createElement("span");
            headerSub.classList.add("BPT-HTML");
            headerSub.appendChild(header);

            if (textContent) {
                headerSub.appendChild(textContent);
            }

            headerElement.appendChild(headerSub);
            if (collapsedFooterElement) {
                headerElement.appendChild(collapsedFooterElement);
            }

            newElement.appendChild(headerElement);

            var footerElement = document.createElement("div");
            footerElement.classList.add("BPT-HtmlTreeItem-Footer");

            var footerWrapper = document.createElement("span");
            footerWrapper.classList.add("BPT-HTML");

            footerWrapper.appendChild(footer);
            footerElement.appendChild(footerWrapper);
            newElement.appendChild(footerElement);
            childrenCollection.appendChild(newElement);
        }

        var children = $m(childrenCollection);

        if (!isShowingAll) {
            var fullNumber = virtualElementCount;
            if (!fullNumber) {
                fullNumber = elements.length;
            }

            children.append($m("<div>").attr("role", "button").addClass("BPT-HtmlTree-ChildCollection-ShowAll").addClass("BPT-HtmlTreeItem").appendText(elementCount + " ... " + fullNumber));
        }

        if (toggleCallback || editCallback || selectCallback) {
            children.data("toggleCallback", toggleCallback);
            children.data("editCallback", editCallback);
            children.data("selectCallback", selectCallback);
        }

        var isFirstRow = !(item.hasClass("BPT-HtmlTreeItem"));
        if (isFirstRow) {
            item.children(".BPT-HtmlTree").append(children);
        } else {
            if (keepExistingElements) {
                var existingChildrenCollection = item.children(".BPT-HtmlTree-ChildCollection");
                if (existingChildrenCollection.length > 0) {
                    var replaceableChildren = children.children(".replaceMe");
                    for (var index = 0; index < replaceableChildren.length; index++) {
                        var replaceableChild = $m(replaceableChildren.get(index));
                        var idToReplace = replaceableChild.attr("data-id");

                        var existingElement = existingChildrenCollection.children(".BPT-HtmlTreeItem").matchAttr("data-id", idToReplace);
                        replaceableChild.replaceWith(existingElement);
                    }

                    var selectedId = HtmlTreeView.getSelected(item).attr("data-id");
                    if (selectedId && existingIdMap[selectedId]) {
                        var found = children.children().matchAttr("data-id", selectedId);
                        if (found.length === 0) {
                            HtmlTreeView.select(item.closest(".BPT-HtmlTreeItem"));
                        }
                    }

                    existingChildrenCollection.remove();
                }
            }

            item.children(".BPT-HtmlTreeItem-Header").after(children);
        }

        if (!isShowingAll) {
            var row = item;
            var showAll = children.children(".BPT-HtmlTree-ChildCollection-ShowAll");
            if (showAll.length > 0) {
                showAll.bind("click", function HtmlTreeView$addElements$showAll$click(event) {
                    if (event.type === "click") {
                        row.data("forceShowAll", true);
                        HtmlTreeView.toggle(row);
                        HtmlTreeView.toggle(row);
                        row = null;
                        HtmlTreeView.focusSelected();
                    }
                });
            }
        }

        if (!stopAutoScroll) {
            window.setTimeout(function HtmlTreeView$addElement$conditionalScroll() {
                var child = children.children().last();
                var scrollContainer = child.closest(".BPT-HtmlTree-ScrollContainer").get(0);

                if (scrollContainer) {
                    var x = scrollContainer.scrollLeft;
                    if (Common.ToolWindowHelpers.scrollIntoView(child.children(".BPT-HtmlTreeItem-Header").get(0), scrollContainer)) {
                        children.parent().get(0).scrollIntoView(true);
                        scrollContainer.scrollLeft = x;
                    }
                }
            }, 0);
        }

        return children;
    };

    HtmlTreeView.prepareAttributeValueForDisplay = function (value) {
        if (value && value.length > 50) {
            var prefix = value.substring(0, 5).toLowerCase();
            if (prefix === "data:") {
                var prefixEndIndex = 25;
                var commaIndex = value.indexOf(",");
                if (commaIndex > 0) {
                    prefixEndIndex = commaIndex;
                }

                value = value.substring(0, prefixEndIndex + 2) + "..." + value.substring(value.length - 10);
            }
        }

        return value;
    };

    HtmlTreeView.addAttribute = function (item, name, value) {
        var attributes = $m("<span>").addClass("BPT-HTML-Attribute-Section").attr("data-attrName", name).appendText(" ");
        attributes.append($m("<span>").addClass("BPT-HTML-Attribute").appendText(name));
        attributes.append($m("<span>").addClass("BPT-HTML-Value").appendText(value));

        var existingAttributes = item.find(".BPT-HtmlTreeItem-Header .BPT-HTML").children().first().children(".BPT-HTML-Attribute-Section");
        if (existingAttributes.length === 0) {
            item.find(".BPT-HtmlTreeItem-Header .BPT-HTML-Tag").first().after(attributes);
        } else {
            $m(existingAttributes.get(existingAttributes.length - 1)).after(attributes);
        }

        return attributes;
    };

    HtmlTreeView.showLoading = function (item, text) {
        if (!item.hasClass("BPT-HtmlTreeItem-ShowingLoader")) {
            var newRow = $m("<div>").addClass("BPT-HtmlTreeItem").addClass("BPT-HtmlTreeItem-Loading").appendText(text);
            item.children(".BPT-HtmlTreeItem-Header").append(newRow);
            item.addClass("BPT-HtmlTreeItem-ShowingLoader");
        }

        return item;
    };

    HtmlTreeView.hideLoading = function (item) {
        if (item.hasClass("BPT-HtmlTreeItem-ShowingLoader")) {
            item.removeClass("BPT-HtmlTreeItem-ShowingLoader");
            item.children(".BPT-HtmlTreeItem-Header").children(".BPT-HtmlTreeItem-Loading").remove();
        }

        return item;
    };

    HtmlTreeView.getChildren = function (item) {
        return item.children(".BPT-HtmlTree-ChildCollection").children(".BPT-HtmlTreeItem");
    };

    HtmlTreeView.isCollapsed = function (item) {
        return item.hasClass("BPT-HtmlTreeItem-Collapsed");
    };

    HtmlTreeView.isExpanded = function (item) {
        return item.hasClass("BPT-HtmlTreeItem-Expanded");
    };

    HtmlTreeView.isExpandable = function (item) {
        return item.hasClass("BPT-HtmlTreeItem-Collapsed") || item.hasClass("BPT-HtmlTreeItem-Expanded");
    };

    HtmlTreeView.changeExpandableState = function (item, nowExpandable) {
        var header = item.children(".BPT-HtmlTreeItem-Header");
        if (nowExpandable) {
            var expandIcon = $m("<div>").addClass("BPT-HtmlTreeItem-ExpandIcon");
            item.prepend(expandIcon);

            item.find(".BPT-HtmlTreeItem-CollapsedFooter").prepend($m("<span>").addClass("BPT-HtmlTreeItem-Ellipsis").appendText("..."));
            item.find(".BPT-HTML-Text").remove();

            item.addClass("BPT-HtmlTreeItem-Collapsed");
            header.attr("aria-expanded", "false");
            header.attr("role", "group");
            HtmlTreeView.addDOMAttrModifiedHandler(header.get(0));
        } else {
            item.find(".BPT-HtmlTreeItem-ExpandIcon").remove();
            HtmlTreeView.removeDOMAttrModifiedHandler(header.get(0));
            header.removeAttr("aria-expanded");
            item.find(".BPT-HtmlTreeItem-CollapsedFooter").find(".BPT-HtmlTreeItem-Ellipsis").remove();
            item.removeClass("BPT-HtmlTreeItem-Collapsed");
            header.attr("role", "treeitem");
        }

        return item;
    };

    HtmlTreeView.toggle = function (item, onExpandComplete) {
        var toggleCallback = item.data("toggleCallback");
        toggleCallback = (toggleCallback ? toggleCallback : item.parent().data("toggleCallback"));

        if (toggleCallback) {
            Common.ToolWindowHelpers.codeMarker(Common.ToolWindowHelpers.CodeMarkers.perfBrowserTools_DiagnosticsToolWindowsTreeViewToggleBegin);
            var header = item.children(".BPT-HtmlTreeItem-Header").get(0);
            HtmlTreeView.removeDOMAttrModifiedHandler(header);

            if (item.hasClass("BPT-HtmlTreeItem-Collapsed")) {
                if (item.parents(".BPT-HtmlTreeItem").length < HtmlTreeView.DOM_TREE_DEPTH_LIMIT) {
                    var expandCompleteCallback = onExpandComplete;

                    if (HtmlTreeView.TraceWriter) {
                        HtmlTreeView.TraceWriter.raiseEvent(525 /* Dom_TreeItemExpand_Start */);

                        expandCompleteCallback = function (a) {
                            if (onExpandComplete) {
                                onExpandComplete(a);
                            }

                            HtmlTreeView.TraceWriter.raiseEvent(526 /* Dom_TreeItemExpand_Stop */);
                        };
                    }

                    item.removeClass("BPT-HtmlTreeItem-Collapsed");
                    toggleCallback(true, item, item.attr("data-id"), expandCompleteCallback);
                    item.addClass("BPT-HtmlTreeItem-Expanded");
                    header.setAttribute("aria-expanded", "true");
                }
            } else {
                if (item.hasClass("BPT-HtmlTreeItem-HiddenRoot")) {
                    return item;
                }

                if (HtmlTreeView.TraceWriter) {
                    HtmlTreeView.TraceWriter.raiseEvent(535 /* Dom_TreeItemCollapse_Start */);
                }

                item.removeClass("BPT-HtmlTreeItem-Expanded");
                toggleCallback(false, item, item.attr("data-id"));
                item.children(".BPT-HtmlTree-ChildCollection").remove();
                item.addClass("BPT-HtmlTreeItem-Collapsed");
                header.setAttribute("aria-expanded", "false");

                if (HtmlTreeView.TraceWriter) {
                    HtmlTreeView.TraceWriter.raiseEvent(536 /* Dom_TreeItemCollapse_Stop */);
                }

                Common.ToolWindowHelpers.codeMarker(Common.ToolWindowHelpers.CodeMarkers.perfBrowserTools_DiagnosticsToolWindowsTreeViewToggleEnd);
            }

            HtmlTreeView.addDOMAttrModifiedHandler(header);

            if (HtmlTreeView.TreeChangeCallBack) {
                HtmlTreeView.TreeChangeCallBack();
            }
        }

        return item;
    };

    HtmlTreeView.expandElementChains = function (chains, complete) {
        HtmlTreeView.expandElementChain(chains[0], function () {
            if (chains.length > 1) {
                HtmlTreeView.expandElementChains(chains.slice(1, chains.length), complete);
            } else if (complete) {
                complete();
            }
        });
    };

    HtmlTreeView.expandElementChain = function (chain, complete) {
        var root = $m("[data-id=\"" + chain[0] + "\"]");
        var expandNext = function () {
            if (chain.length > 1) {
                HtmlTreeView.expandElementChain(chain.slice(1, chain.length), complete);
            } else if (complete) {
                complete();
            }
        };

        if (HtmlTreeView.isCollapsed(root)) {
            HtmlTreeView.toggle(root, expandNext);
        } else {
            expandNext();
        }
    };

    HtmlTreeView.getSelected = function (item) {
        if (item.hasClass("BPT-HtmlTreeItem-Selected")) {
            return item;
        }

        var rootElement = item.closest(".BPT-HtmlTree");
        rootElement = (rootElement.length > 0 ? rootElement : item);
        return rootElement.find(".BPT-HtmlTreeItem-Selected").first();
    };

    HtmlTreeView.focusSelected = function (adjustFocus) {
        if (typeof adjustFocus === "undefined") { adjustFocus = true; }
        var element;
        var selected = document.querySelectorAll(".BPT-HtmlTreeItem-Selected");

        if (selected.length > 1) {
            for (var i = 1; i < selected.length; i++) {
                element = selected[i];
                element.classList.remove("BPT-HtmlTreeItem-Selected");
            }
        }

        element = HtmlTreeView.adjustTabindex();

        adjustFocus = adjustFocus && !HtmlTreeView.currentFocusOnInput();

        if (!adjustFocus) {
            return;
        }

        if (selected.length > 0 && selected[0].classList.contains("BPT-HtmlTree-ChildCollection-ShowAll")) {
            selected[0].focus();
            Common.ToolWindowHelpers.scrollIntoView(selected[0], $m(selected[0]).closest(".BPT-HtmlTree-ScrollContainer").get(0));
        } else if (element) {
            element.focus();

            var scrollContainer = $m(element).closest(".BPT-HtmlTree-ScrollContainer").get(0);
            var left = scrollContainer.scrollLeft;

            if (left) {
                var negativeXOffset = $m(element).closest(".BPT-HtmlTreeItem").get(0).getBoundingClientRect().left;

                if (negativeXOffset < 0) {
                    left = Math.max(left + negativeXOffset, 0);
                    scrollContainer.scrollLeft = left;
                }
            }
        }
    };

    HtmlTreeView.adjustTabindex = function () {
        var tree = document.querySelector("#tree");
        var element;

        if (!tree) {
            return element;
        }

        tree.removeAttribute("tabindex");
        var nodeList = tree.querySelectorAll("[tabindex='1']");
        for (var i = 0; i < nodeList.length; i++) {
            nodeList[i].removeAttribute("tabindex");
        }

        element = tree.querySelector(".BPT-HtmlTreeItem-Selected > .BPT-HtmlTreeItem-Header, .BPT-HtmlTreeItem-Selected.BPT-HtmlTree-ChildCollection-ShowAll") || tree;
        element.setAttribute("tabindex", "1");
        return element;
    };

    HtmlTreeView.findChildByClickProximity = function (item, event) {
        var children = item.find(".BPT-HtmlTreeItem");
        var x = event.clientX;
        var y = event.clientY;

        for (var i = 0; i < children.length; i++) {
            var child = children.get(i);
            var offset = child.getBoundingClientRect();

            if (offset.top <= y && y <= offset.bottom) {
                item = $m(child);
            }
        }

        return item;
    };

    HtmlTreeView.select = function (item, adjustFocus) {
        if (typeof adjustFocus === "undefined") { adjustFocus = true; }
        var rootItem = item.closest(".BPT-HtmlTree");
        var selectedElement = rootItem.find(".BPT-HtmlTreeItem-Selected");
        HtmlTreeViewDragDrop.removeDraggable(rootItem, selectedElement);
        HtmlTreeViewDragDrop.removeDroppable(rootItem);
        selectedElement.removeClass("BPT-HtmlTreeItem-Selected");
        var isShowAllLink = selectedElement.hasClass("BPT-HtmlTree-ChildCollection-ShowAll");

        if (isShowAllLink) {
            selectedElement.removeAttr("tabindex");
        } else {
            selectedElement.children(".BPT-HtmlTreeItem-Header").removeAttr("tabindex");
        }

        item.addClass("BPT-HtmlTreeItem-Selected");
        HtmlTreeView.focusSelected(adjustFocus);
        isShowAllLink = item.hasClass("BPT-HtmlTree-ChildCollection-ShowAll");

        var selectCallback = item.data("selectCallback") || item.parent().data("selectCallback");
        if (selectCallback) {
            selectCallback(item, item.attr("data-id"), item.attr("data-tag"));
        }

        if (!isShowAllLink && HtmlTreeViewDragDrop.canDrag(item.attr("data-tag"))) {
            HtmlTreeViewDragDrop.addDraggable(rootItem, item);
        }

        return item;
    };

    HtmlTreeView.clear = function (item) {
        var selectedChild = item.children().find(".BPT-HtmlTreeItem-Selected");
        if (selectedChild.length > 0) {
            HtmlTreeView.select(item);
        }

        item.children(".BPT-HtmlTree-ChildCollection").remove();
        if (item.hasClass("BPT-HtmlTree-Container")) {
            item.removeAttr("tabindex");
        }

        return item;
    };

    HtmlTreeView.getTextContent = function (element) {
        if (element && element.firstChild) {
            return element.firstChild.nodeValue;
        }

        return "";
    };

    HtmlTreeView.onDOMAttrModified = function (evt) {
        if (evt.attrName === "aria-expanded") {
            var element = evt.target;
            var parent = element.parentNode;
            var toExpand = evt.newValue === "true";
            var currentExpanded = parent.classList.contains("BPT-HtmlTreeItem-Expanded");
            var currentCollapsed = parent.classList.contains("BPT-HtmlTreeItem-Collapsed");
            if ((toExpand && currentCollapsed) || (!toExpand && currentExpanded)) {
                HtmlTreeView.toggle($m(element.parentNode));
            }
        }
    };

    HtmlTreeView.addDOMAttrModifiedHandler = function (e) {
        e.addEventListener("DOMAttrModified", HtmlTreeView.onDOMAttrModified);
    };

    HtmlTreeView.removeDOMAttrModifiedHandler = function (e) {
        e.removeEventListener("DOMAttrModified", HtmlTreeView.onDOMAttrModified);
    };

    HtmlTreeView.isTextArea = function (e) {
        if (!e) {
            return false;
        }

        var s = e.tagName;

        if (typeof s !== "string") {
            return false;
        }

        return s.toUpperCase() === "TEXTAREA";
    };

    HtmlTreeView.isInputText = function (e) {
        if (!e) {
            return false;
        }

        var s = e.tagName;

        if (typeof s !== "string") {
            return false;
        }

        return s.toUpperCase() === "INPUT" && e.hasAttribute("type") && e.getAttribute("type") === "text";
    };

    HtmlTreeView.currentFocusOnInput = function () {
        var e = document.activeElement;
        return HtmlTreeView.isTextArea(e) || HtmlTreeView.isInputText(e);
    };
    HtmlTreeView.InitialElementLimit = 200;

    HtmlTreeView.TraceWriter = null;

    HtmlTreeView.DOM_TREE_DEPTH_LIMIT = 64;
    return HtmlTreeView;
})();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/htmlTreeView.js.map

// htmlTreeViewDragDrop.ts
var HtmlTreeViewDragDrop = (function () {
    function HtmlTreeViewDragDrop() {
    }
    HtmlTreeViewDragDrop.init = function (channel, engine, doc, supportsMutation, traceWriter) {
        HtmlTreeViewDragDrop.Channel = channel;
        HtmlTreeViewDragDrop.Engine = engine;
        HtmlTreeViewDragDrop.Document = doc;
        HtmlTreeViewDragDrop.SupportsMutation = supportsMutation;
        HtmlTreeViewDragDrop.TraceWriter = traceWriter;
    };

    HtmlTreeViewDragDrop.proxyReparent = function (dragFromDataId, dropTargetDataId, dropAction, postOpCallback) {
        HtmlTreeViewDragDrop.Channel.call(HtmlTreeViewDragDrop.Engine(), "reparent", [dragFromDataId, dropTargetDataId, dropAction], postOpCallback);
    };

    HtmlTreeViewDragDrop.registerEventCallback = function (event, callback, mark) {
        if (!HtmlTreeViewDragDrop.EventCallback.hasOwnProperty(event)) {
            HtmlTreeViewDragDrop.EventCallback[event] = [];
        }

        HtmlTreeViewDragDrop.EventCallback[event].push({ callback: callback, mark: mark });
        return true;
    };

    HtmlTreeViewDragDrop.unregisterEventCallback = function (event, callback) {
        if (!HtmlTreeViewDragDrop.EventCallback.hasOwnProperty(event)) {
            return false;
        }

        var arr = HtmlTreeViewDragDrop.EventCallback[event];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i].callback === callback) {
                arr.splice(i, 1);

                if (HtmlTreeViewDragDrop.EventCallback[event].length === 0) {
                    delete HtmlTreeViewDragDrop.EventCallback[event];
                }

                return true;
            }
        }

        return false;
    };

    HtmlTreeViewDragDrop.canDrag = function (tagLowerCase) {
        return ["html", "head", "body", "script", "noscript", "#doctype"].indexOf(tagLowerCase) < 0;
    };

    HtmlTreeViewDragDrop.addDraggable = function (rootItem, item) {
        var children = item.children(".BPT-HtmlTreeItem-Header");
        children.attr("draggable", "true");
        for (var i = 0, len = item.length; i < len; i++) {
            var element = item.get(i);
            if (element) {
                if (element.classList) {
                    element.classList.add(HtmlTreeViewDragDrop.DraggableClass);
                }

                if (element.addEventListener) {
                    element.addEventListener("dragstart", HtmlTreeViewDragDrop.doDragStart, false);
                    element.addEventListener("drag", HtmlTreeViewDragDrop.doDrag, false);
                    element.addEventListener("dragend", HtmlTreeViewDragDrop.doDragEnd, false);
                }
            }
        }

        var rootTarget = rootItem.get(0);
        if (rootTarget) {
            rootTarget.addEventListener("dragenter", HtmlTreeViewDragDrop.doDropTargetEnter, false);
            rootTarget.addEventListener("dragover", HtmlTreeViewDragDrop.doDropTargetOver, false);
            rootTarget.addEventListener("dragleave", HtmlTreeViewDragDrop.doDropTargetLeave, false);
            rootTarget.addEventListener("drop", HtmlTreeViewDragDrop.doDropTargetDrop, false);
        }
    };

    HtmlTreeViewDragDrop.removeDraggable = function (rootItem, item) {
        var children = item.children(".BPT-HtmlTreeItem-Header");
        children.attr("draggable", "false");
        for (var i = 0, len = item.length; i < len; i++) {
            var element = item.get(i);
            if (element) {
                if (element.classList) {
                    element.classList.remove(HtmlTreeViewDragDrop.DraggableClass);
                }

                if (element.removeEventListener) {
                    element.removeEventListener("dragstart", HtmlTreeViewDragDrop.doDragStart, false);
                    element.removeEventListener("drag", HtmlTreeViewDragDrop.doDrag, false);
                    element.removeEventListener("dragend", HtmlTreeViewDragDrop.doDragEnd, false);
                }
            }
        }

        if (rootItem.length > 0) {
            var rootTarget = rootItem.get(0);
            rootTarget.removeEventListener("dragenter", HtmlTreeViewDragDrop.doDropTargetEnter, false);
            rootTarget.removeEventListener("dragover", HtmlTreeViewDragDrop.doDropTargetOver, false);
            rootTarget.removeEventListener("dragleave", HtmlTreeViewDragDrop.doDropTargetLeave, false);
            rootTarget.removeEventListener("drop", HtmlTreeViewDragDrop.doDropTargetDrop, false);
        }
    };

    HtmlTreeViewDragDrop.doDragStart = function (event) {
        event.stopPropagation();

        if (event.srcElement.tagName === "TEXTAREA" || event.srcElement.tagName === "INPUT") {
            event.preventDefault();
            return;
        }

        event.dataTransfer.effectAllowed = "move";

        event.dataTransfer.setData("Text", "");

        var item = $m(this);
        if (HtmlTreeViewDragDrop.AutoCollapseOnDragStart) {
            if (HtmlTreeView.isExpanded(item)) {
                HtmlTreeView.toggle(item);
            }
        }

        var rootItem = item.closest(HtmlTreeViewDragDrop.TreeSelector);
        HtmlTreeViewDragDrop.addDroppable(rootItem, item);

        var dragItem = rootItem.find(HtmlTreeViewDragDrop.DragSelector);
        if (dragItem.get(0) !== item.get(0)) {
            throw "Bad invariance in doDragStart: dragItem.get(0) !== item.get(0)";
        }

        HtmlTreeViewDragDrop.LastTimeStamp = event.timeStamp;
    };

    HtmlTreeViewDragDrop.doDrag = function (event) {
        var scrollContainerItem = $m(this).closest(HtmlTreeViewDragDrop.ScrollContainerSelector);
        if (scrollContainerItem.length !== 1) {
            return;
        }

        var millisecondDelta = event.timeStamp - HtmlTreeViewDragDrop.LastTimeStamp;

        var scrollContainer = scrollContainerItem.get(0);
        var above = HtmlTreeViewDragDrop.calcAbove(event, scrollContainer);
        var below = HtmlTreeViewDragDrop.calcBelow(event, scrollContainer);
        var step = HtmlTreeViewDragDrop.AutoscrollPixelsPerSecond;
        var landing = 10;
        if (above) {
            if (above > landing) {
                step += (above - landing) * HtmlTreeViewDragDrop.AutoscrollAcceleration;
            }

            step = Math.ceil(step * millisecondDelta / 1000);

            if (step > scrollContainer.scrollTop) {
                step = scrollContainer.scrollTop;
            }

            if (step) {
                scrollContainer.scrollTop -= step;
            }
        } else if (below) {
            if (below > landing) {
                step += (below - landing) * HtmlTreeViewDragDrop.AutoscrollAcceleration;
            }

            step = Math.ceil(step * millisecondDelta / 1000);

            if ((step + scrollContainer.scrollTop + scrollContainer.offsetHeight) > scrollContainer.scrollHeight) {
                step = scrollContainer.scrollHeight - scrollContainer.scrollTop - scrollContainer.offsetHeight;
            }

            if (step) {
                scrollContainer.scrollTop += step;
            }
        }

        HtmlTreeViewDragDrop.LastTimeStamp = event.timeStamp;
    };

    HtmlTreeViewDragDrop.calcAbove = function (event, element) {
        if (!event || !element) {
            return NaN;
        }

        var delta = element.offsetTop - event.clientY;

        if (delta < 0) {
            delta = 0;
        }

        return delta;
    };

    HtmlTreeViewDragDrop.calcBelow = function (event, element) {
        if (!event || !element) {
            return NaN;
        }

        var delta = event.clientY - element.offsetHeight;

        if (delta < 0) {
            delta = 0;
        }

        return delta;
    };

    HtmlTreeViewDragDrop.raise = function (event, arg) {
        var count = 0;
        if (!HtmlTreeViewDragDrop.EventCallback.hasOwnProperty(event)) {
            return count;
        }

        var arr = HtmlTreeViewDragDrop.EventCallback[event].slice(0);
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            arr[i].callback(event, arr[i].mark, arg);
        }

        return count;
    };

    HtmlTreeViewDragDrop.doDragEnd = function (event) {
        var dragFromItem = $m(this);
        var rootItem = dragFromItem.closest(HtmlTreeViewDragDrop.TreeSelector);

        if (event.dataTransfer.dropEffect === "none") {
            HtmlTreeViewDragDrop.raise("drag", "cancel");
            HtmlTreeViewDragDrop.removeDroppable(rootItem);
            return;
        }

        if (HtmlTreeViewDragDrop.TraceWriter) {
            HtmlTreeViewDragDrop.TraceWriter.raiseEvent(507 /* Dom_DragDrop_Start */);
        }

        var before = rootItem.find(HtmlTreeViewDragDrop.DropHereBeforeSelector);
        var after = rootItem.find(HtmlTreeViewDragDrop.DropHereAfterSelector);
        var dropTargetItem;
        var dropAction = HtmlTreeViewDragDrop.DropAction.Unknown;

        if (before.length === 1) {
            dropTargetItem = before.parent();
            if (before.hasClass(HtmlTreeViewDragDrop.HeaderClass)) {
                dropAction = HtmlTreeViewDragDrop.DropAction.BeforeSibling;
            } else {
                if (HtmlTreeView.isExpanded(dropTargetItem)) {
                    dropAction = HtmlTreeViewDragDrop.DropAction.LastChild;
                } else {
                    dropAction = HtmlTreeViewDragDrop.DropAction.BeforeSibling;
                }
            }
        } else if (after.length === 1) {
            dropTargetItem = after.parent();
            if (after.hasClass(HtmlTreeViewDragDrop.FooterClass)) {
                dropAction = HtmlTreeViewDragDrop.DropAction.AfterSibling;
            } else if (HtmlTreeView.isExpanded(dropTargetItem)) {
                dropAction = HtmlTreeViewDragDrop.DropAction.FirstChild;
            } else {
                dropAction = HtmlTreeViewDragDrop.DropAction.AfterSibling;
            }
        } else {
            HtmlTreeViewDragDrop.raise("drag", "cancel");
            HtmlTreeViewDragDrop.removeDroppable(rootItem);
            return;
        }

        HtmlTreeViewDragDrop.removeDroppable(rootItem);

        if (dropAction && dropTargetItem && dropTargetItem.length === 1) {
            var dragFromId = dragFromItem.attr("data-id");
            var dropTargetId = dropTargetItem.attr("data-id");

            if (dragFromId && dropTargetId) {
                if (HtmlTreeView.isExpanded(dragFromItem)) {
                    HtmlTreeView.toggle(dragFromItem);
                }

                HtmlTreeViewDragDrop.proxyReparent(dragFromId, dropTargetId, dropAction, function () {
                    if (HtmlTreeViewDragDrop.SupportsMutation()) {
                        var millisecondDelay = 1000 / 4;
                        window.setTimeout(function () {
                            HtmlTreeViewDragDrop.selectBy(dropTargetId, dropAction);
                        }, millisecondDelay);
                    } else {
                        var targetParents = dropTargetItem.parents(HtmlTreeViewDragDrop.ItemSelector).not(HtmlTreeViewDragDrop.HiddenRootSelector);

                        var fromParents = dragFromItem.parents(HtmlTreeViewDragDrop.ItemSelector).not(HtmlTreeViewDragDrop.HiddenRootSelector);

                        var targetParentChain = [];
                        var fromParentChain = [];
                        targetParents.each(function (i, e) {
                            targetParentChain[(targetParents.length - 1) - i] = e.getAttribute("data-id");
                        });
                        fromParents.each(function (i, e) {
                            fromParentChain[(fromParents.length - 1) - i] = e.getAttribute("data-id");
                        });

                        if (dropAction !== HtmlTreeViewDragDrop.DropAction.BeforeSibling && dropAction !== HtmlTreeViewDragDrop.DropAction.AfterSibling) {
                            targetParentChain.push(dropTargetItem.attr("data-id"));
                        }

                        var closestCommonAncestor;
                        for (var i = 0; i < targetParentChain.length && i < fromParentChain.length; i++) {
                            if (targetParentChain[i] !== fromParentChain[i]) {
                                break;
                            }

                            closestCommonAncestor = targetParentChain[i];
                        }

                        var root = $m("[data-id=" + closestCommonAncestor + "]");
                        HtmlTreeView.toggle(root);

                        HtmlTreeView.expandElementChains([targetParentChain, fromParentChain], function () {
                            HtmlTreeViewDragDrop.selectBy(dropTargetId, dropAction);
                        });
                    }
                });
            }
        }

        HtmlTreeViewDragDrop.LastExpandIcon = undefined;

        HtmlTreeViewDragDrop.raise("drag", "complete");
        if (HtmlTreeViewDragDrop.TraceWriter) {
            HtmlTreeViewDragDrop.TraceWriter.raiseEvent(508 /* Dom_DragDrop_Stop */);
        }
    };

    HtmlTreeViewDragDrop.selectBy = function (nearId, dropAction) {
        var item;
        if (dropAction === HtmlTreeViewDragDrop.DropAction.FirstChild) {
            item = $m("div.BPT-HtmlTreeItem[data-id=\"" + nearId + "\"] > div.BPT-HtmlTree-ChildCollection > div.BPT-HtmlTreeItem:first-child");
        } else if (dropAction === HtmlTreeViewDragDrop.DropAction.LastChild) {
            item = $m("div.BPT-HtmlTreeItem[data-id=\"" + nearId + "\"] > div.BPT-HtmlTree-ChildCollection > div.BPT-HtmlTreeItem:last-child");
        } else if (dropAction === HtmlTreeViewDragDrop.DropAction.BeforeSibling) {
            var nearElement = $m(HtmlTreeViewDragDrop.ItemSelector + "[data-id=\"" + nearId + "\"]").get(0);
            if (nearElement && nearElement.previousSibling) {
                item = $m(nearElement.previousSibling);
            }
        } else if (dropAction === HtmlTreeViewDragDrop.DropAction.AfterSibling) {
            item = $m(HtmlTreeViewDragDrop.ItemSelector + "[data-id=\"" + nearId + "\"] + div.BPT-HtmlTreeItem");
        }

        if (item && item.length === 1) {
            HtmlTreeView.select(item);
        }
    };

    HtmlTreeViewDragDrop.getHoverElement = function (x, y) {
        if (typeof x === "number" && typeof y === "number") {
            return (document.elementFromPoint(x, y));
        }
    };

    HtmlTreeViewDragDrop.getHoverHeaderFooterElement = function (x, y) {
        if (typeof x === "number" && typeof y === "number") {
            var headerFooter = $m(document.elementFromPoint(x, y)).closest(HtmlTreeViewDragDrop.HeaderFooterSelector);
            var element = headerFooter.get(0);
            if (element) {
                var parent = element.parentNode;
                if (parent && !parent.classList.contains(HtmlTreeViewDragDrop.HiddenRootClass)) {
                    return element;
                }
            }
        }
    };

    HtmlTreeViewDragDrop.markHover = function (lastHoverItem, currentHoverElement) {
        if (currentHoverElement) {
            currentHoverElement.classList.add(HtmlTreeViewDragDrop.HoverClass);
        }

        for (var i = 0, len = lastHoverItem.length; i < len; i++) {
            var hoverElement = lastHoverItem.get(i);
            if (hoverElement !== currentHoverElement) {
                hoverElement.classList.remove(HtmlTreeViewDragDrop.HoverClass);
            }
        }

        return currentHoverElement ? true : false;
    };

    HtmlTreeViewDragDrop.nearby = function (a, b, drift) {
        if (b + drift < a || b - drift > a) {
            return false;
        }

        return true;
    };

    HtmlTreeViewDragDrop.autoExpand = function (event) {
        HtmlTreeViewDragDrop.autoExpandUpdate(event) || HtmlTreeViewDragDrop.autoExpandIcon(event) || HtmlTreeViewDragDrop.autoExpandNonExpandable(event);
    };

    HtmlTreeViewDragDrop.autoExpandUpdate = function (event) {
        var nearby = HtmlTreeViewDragDrop.nearby;
        var element = HtmlTreeViewDragDrop.getHoverElement(event.clientX, event.clientY);

        if (!HtmlTreeViewDragDrop.LastExpandIcon || HtmlTreeViewDragDrop.LastExpandIcon.element !== element) {
            HtmlTreeViewDragDrop.LastExpandIcon = {
                element: element,
                timeStamp: event.timeStamp,
                clientX: event.clientX,
                clientY: event.clientY };
            return true;
        }

        if (!nearby(event.clientX, HtmlTreeViewDragDrop.LastExpandIcon.clientX, HtmlTreeViewDragDrop.AutoexpandPixelDrift) || !nearby(event.clientY, HtmlTreeViewDragDrop.LastExpandIcon.clientY, HtmlTreeViewDragDrop.AutoexpandPixelDrift)) {
            HtmlTreeViewDragDrop.LastExpandIcon = {
                element: element,
                timeStamp: event.timeStamp,
                clientX: event.clientX,
                clientY: event.clientY };
            return true;
        }

        return false;
    };

    HtmlTreeViewDragDrop.autoExpandIcon = function (event) {
        if ((event.timeStamp - HtmlTreeViewDragDrop.LastExpandIcon.timeStamp) < HtmlTreeViewDragDrop.AutoexpandDisclosureTriangleMillisecondDelay) {
            return false;
        }

        var element = HtmlTreeViewDragDrop.getHoverElement(event.clientX, event.clientY);

        if (!element || !element.classList.contains(HtmlTreeViewDragDrop.ExpandIconClass)) {
            return false;
        }

        var htmlTreeElement = element.parentNode;

        if (htmlTreeElement && htmlTreeElement.classList.contains(HtmlTreeViewDragDrop.CollapsedClass) && ($m(htmlTreeElement).children(HtmlTreeViewDragDrop.HeaderSelector).hasClass(HtmlTreeViewDragDrop.DropBeforeClass) || $m(htmlTreeElement).children(HtmlTreeViewDragDrop.HeaderSelector).hasClass(HtmlTreeViewDragDrop.DropAfterClass))) {
            HtmlTreeViewDragDrop.LastExpandIcon = undefined;
            var rootItem = $m(htmlTreeElement).closest(HtmlTreeViewDragDrop.TreeSelector);
            var dragItem = rootItem.find(HtmlTreeViewDragDrop.DragSelector);
            HtmlTreeViewDragDrop.removeDroppable(rootItem);
            HtmlTreeView.toggle($m(htmlTreeElement), function () {
                HtmlTreeViewDragDrop.addDroppable(rootItem, dragItem);
            });
            return true;
        }

        return false;
    };

    HtmlTreeViewDragDrop.autoExpandNonExpandable = function (event) {
        if ((event.timeStamp - HtmlTreeViewDragDrop.LastExpandIcon.timeStamp) < HtmlTreeViewDragDrop.AutoexpandNonExpandableMillisecondDelay) {
            return false;
        }

        var element = HtmlTreeViewDragDrop.getHoverElement(event.clientX, event.clientY);

        if (!element) {
            return false;
        }

        var htmlTreeItem = $m(element).closest(HtmlTreeViewDragDrop.ItemSelector);

        if (htmlTreeItem.length !== 1 || htmlTreeItem.hasClass(HtmlTreeViewDragDrop.CollapsedClass) || htmlTreeItem.hasClass(HtmlTreeViewDragDrop.ExpandedClass) || !htmlTreeItem.attr("data-tag") || htmlTreeItem.attr("data-tag") === "#text") {
            return false;
        }

        if (htmlTreeItem.children(HtmlTreeViewDragDrop.HeaderSelector).hasClass(HtmlTreeViewDragDrop.DropBeforeClass) || htmlTreeItem.children(HtmlTreeViewDragDrop.HeaderSelector).hasClass(HtmlTreeViewDragDrop.DropAfterClass)) {
            HtmlTreeViewDragDrop.LastExpandIcon = undefined;
            var rootItem = htmlTreeItem.closest(HtmlTreeViewDragDrop.TreeSelector);
            var dragItem = rootItem.find(HtmlTreeViewDragDrop.DragSelector);
            HtmlTreeViewDragDrop.removeDroppable(rootItem);

            HtmlTreeView.changeExpandableState(htmlTreeItem, true);
            HtmlTreeView.toggle(htmlTreeItem, function () {
                HtmlTreeViewDragDrop.addDroppable(rootItem, dragItem);
            });
            return true;
        }

        return false;
    };

    HtmlTreeViewDragDrop.doDropTargetEnter = function (event) {
        var rootElement = event.currentTarget;
        var rootItem = $m(rootElement);
        var lastHoverItem = rootItem.find(HtmlTreeViewDragDrop.HoverSelector);
        var nowHoverItem = HtmlTreeViewDragDrop.getHoverHeaderFooterElement(event.clientX, event.clientY);
        HtmlTreeViewDragDrop.markHover(lastHoverItem, nowHoverItem);
        event.dataTransfer.dropEffect = "move";
        event.preventDefault();
        event.stopPropagation();
    };

    HtmlTreeViewDragDrop.doDropTargetOver = function (event) {
        var rootElement = event.currentTarget;
        var lastHoverItem = $m(rootElement).find(HtmlTreeViewDragDrop.HoverSelector);
        var nowHoverItem = HtmlTreeViewDragDrop.getHoverHeaderFooterElement(event.clientX, event.clientY);
        HtmlTreeViewDragDrop.markHover(lastHoverItem, nowHoverItem);
        event.dataTransfer.dropEffect = "move";

        HtmlTreeViewDragDrop.autoExpand(event);

        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    HtmlTreeViewDragDrop.doDropTargetLeave = function (event) {
        var rootElement = event.currentTarget;
        var lastHoverItem = $m(rootElement).find(HtmlTreeViewDragDrop.HoverSelector);
        HtmlTreeViewDragDrop.markHover(lastHoverItem);
        event.preventDefault();
        event.stopPropagation();
    };

    HtmlTreeViewDragDrop.doDropTargetDrop = function (event) {
        var rootElement = event.currentTarget;
        var hoverElement = $m(rootElement).find(HtmlTreeViewDragDrop.HoverSelector);
        if (hoverElement.hasClass(HtmlTreeViewDragDrop.DropAfterClass)) {
            hoverElement.addClass(HtmlTreeViewDragDrop.DropHereAfterClass);
        } else if (hoverElement.hasClass(HtmlTreeViewDragDrop.DropBeforeClass)) {
            hoverElement.addClass(HtmlTreeViewDragDrop.DropHereBeforeClass);
        }

        event.preventDefault();
        event.stopPropagation();
    };

    HtmlTreeViewDragDrop.isParent = function (parent, child) {
        if (!child) {
            return false;
        }

        var node = child.parentNode;
        while (node) {
            if (node === parent) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    };

    HtmlTreeViewDragDrop.isScopeItem = function (element) {
        var tagLowerCase = element.getAttribute("data-tag");
        return ["html", "head", "body", "frame", "iframe", "script", "noscript"].indexOf(tagLowerCase) >= 0;
    };

    HtmlTreeViewDragDrop.findDragScope = function (chain) {
        for (var i = 0; i < chain.length; i++) {
            var element = chain.get(i);
            if (HtmlTreeViewDragDrop.isScopeItem(element)) {
                return $m(element);
            }
        }

        return null;
    };

    HtmlTreeViewDragDrop.filterSubDragScope = function (dropTargets, dragItem) {
        var result = [];
        if (dropTargets.length > 0) {
            var element = dropTargets.get(0);
            var isScopeItem = HtmlTreeViewDragDrop.isScopeItem(element);
            result.push({ element: element, open: !isScopeItem });
        }

        var i = 1;
        var len = dropTargets.length;
        while (i < len) {
            var element = dropTargets.get(i);
            if (HtmlTreeViewDragDrop.isScopeItem(element)) {
                result.push({ element: element, open: false });
                i++;
                var skipChildren = $m(element).find(HtmlTreeViewDragDrop.ItemSelector);
                var j = 0;
                while (j < skipChildren.length && skipChildren.get(j) === dropTargets.get(i)) {
                    j++;
                    i++;
                }
            } else {
                result.push({ element: element, open: true });
                i++;
            }
        }

        return result;
    };

    HtmlTreeViewDragDrop.addDroppable = function (rootItem, dragItem) {
        if (!rootItem) {
            throw "Bad parameter in addDroppable: !rootItem";
        }

        if (!dragItem) {
            throw "Bad parameter in addDroppable: !dragItem";
        }

        if (dragItem.length !== 1) {
            throw "Bad parameter in addDroppable: dragItem.length !== 1";
        }

        var dragParentChain = dragItem.parents(HtmlTreeViewDragDrop.ItemSelector).not(HtmlTreeViewDragDrop.HiddenRootSelector);
        var dragScopeItem = HtmlTreeViewDragDrop.findDragScope(dragParentChain);
        var potentialDropTargets = dragScopeItem ? dragScopeItem.find(HtmlTreeViewDragDrop.ItemSelector).not(HtmlTreeViewDragDrop.HiddenRootSelector) : rootItem.find(HtmlTreeViewDragDrop.ItemSelector).not(HtmlTreeViewDragDrop.HiddenRootSelector);
        var dropTargets = HtmlTreeViewDragDrop.filterSubDragScope(potentialDropTargets, dragItem);
        var dropBefore = true;
        var dragElement = dragItem.get(0);
        for (var i = 0, len = dropTargets.length; i < len; i++) {
            var possibleDropTarget = dropTargets[i].element;
            var isOpen = dropTargets[i].open;
            var isParentOfDrag = HtmlTreeViewDragDrop.isParent(possibleDropTarget, dragElement);
            var isChildOfDrag = HtmlTreeViewDragDrop.isParent(dragElement, possibleDropTarget);
            var possibleDropTargetItem = $m(possibleDropTarget);
            if (possibleDropTarget === dragElement) {
                dropBefore = false;
                possibleDropTargetItem.addClass(HtmlTreeViewDragDrop.DragClass);
            } else if (isChildOfDrag) {
            } else if (!possibleDropTargetItem.attr("data-id")) {
            } else if (dropBefore) {
                possibleDropTargetItem.children(HtmlTreeViewDragDrop.HeaderSelector).addClass(HtmlTreeViewDragDrop.DropBeforeClass);
                if (isParentOfDrag) {
                    possibleDropTargetItem.children(HtmlTreeViewDragDrop.FooterSelector).addClass(HtmlTreeViewDragDrop.DropAfterClass);
                } else if (isOpen) {
                    possibleDropTargetItem.children(HtmlTreeViewDragDrop.FooterSelector).addClass(HtmlTreeViewDragDrop.DropBeforeClass);
                }
            } else {
                if (isOpen || possibleDropTargetItem.hasClass(HtmlTreeViewDragDrop.CollapsedClass)) {
                    possibleDropTargetItem.children(HtmlTreeViewDragDrop.HeaderSelector).addClass(HtmlTreeViewDragDrop.DropAfterClass);
                }

                possibleDropTargetItem.children(HtmlTreeViewDragDrop.FooterSelector).addClass(HtmlTreeViewDragDrop.DropAfterClass);
            }
        }
    };

    HtmlTreeViewDragDrop.removeDroppable = function (rootItem) {
        if (!rootItem) {
            throw "Bad parameter in removeDroppable: !rootItem";
        }

        rootItem.find(HtmlTreeViewDragDrop.DragSelector).removeClass(HtmlTreeViewDragDrop.DragClass);
        rootItem.find(HtmlTreeViewDragDrop.DropBeforeSelector).removeClass(HtmlTreeViewDragDrop.DropBeforeClass);
        rootItem.find(HtmlTreeViewDragDrop.DropAfterSelector).removeClass(HtmlTreeViewDragDrop.DropAfterClass);
        rootItem.find(HtmlTreeViewDragDrop.DropHereBeforeSelector).removeClass(HtmlTreeViewDragDrop.DropHereBeforeClass);
        rootItem.find(HtmlTreeViewDragDrop.DropHereAfterSelector).removeClass(HtmlTreeViewDragDrop.DropHereAfterClass);
        rootItem.find(HtmlTreeViewDragDrop.HoverSelector).removeClass(HtmlTreeViewDragDrop.HoverClass);
    };
    HtmlTreeViewDragDrop.DropAction = {
        Unknown: "",
        BeforeSibling: "before sibling",
        AfterSibling: "after sibling",
        FirstChild: "first child",
        LastChild: "last child"
    };

    HtmlTreeViewDragDrop.AutoCollapseOnDragStart = false;

    HtmlTreeViewDragDrop.CollapsedClass = "BPT-HtmlTreeItem-Collapsed";
    HtmlTreeViewDragDrop.DragClass = "BPT-HtmlTreeItem-Drag";
    HtmlTreeViewDragDrop.DraggableClass = "BPT-HtmlTreeItem-Draggable";
    HtmlTreeViewDragDrop.DropAfterClass = "BPT-HtmlTreeItem-DropAfter";
    HtmlTreeViewDragDrop.DropBeforeClass = "BPT-HtmlTreeItem-DropBefore";
    HtmlTreeViewDragDrop.DropHereAfterClass = "BPT-HtmlTreeItem-DoDropHereAfter";
    HtmlTreeViewDragDrop.DropHereBeforeClass = "BPT-HtmlTreeItem-DoDropHereBefore";
    HtmlTreeViewDragDrop.ExpandedClass = "BPT-HtmlTreeItem-Expanded";
    HtmlTreeViewDragDrop.ExpandIconClass = "BPT-HtmlTreeItem-ExpandIcon";
    HtmlTreeViewDragDrop.FooterClass = "BPT-HtmlTreeItem-Footer";
    HtmlTreeViewDragDrop.HeaderClass = "BPT-HtmlTreeItem-Header";
    HtmlTreeViewDragDrop.HiddenRootClass = "BPT-HtmlTreeItem-HiddenRoot";
    HtmlTreeViewDragDrop.HoverClass = "BPT-HtmlTreeItem-Hover";

    HtmlTreeViewDragDrop.DragSelector = ".BPT-HtmlTreeItem-Drag";
    HtmlTreeViewDragDrop.DropAfterSelector = ".BPT-HtmlTreeItem-DropAfter";
    HtmlTreeViewDragDrop.DropBeforeSelector = ".BPT-HtmlTreeItem-DropBefore";
    HtmlTreeViewDragDrop.DropHereAfterSelector = ".BPT-HtmlTreeItem-DoDropHereAfter";
    HtmlTreeViewDragDrop.DropHereBeforeSelector = ".BPT-HtmlTreeItem-DoDropHereBefore";
    HtmlTreeViewDragDrop.FooterSelector = ".BPT-HtmlTreeItem-Footer";
    HtmlTreeViewDragDrop.HeaderFooterSelector = ".BPT-HtmlTreeItem-Footer,.BPT-HtmlTreeItem-Header";
    HtmlTreeViewDragDrop.HeaderSelector = ".BPT-HtmlTreeItem-Header";
    HtmlTreeViewDragDrop.HiddenRootSelector = ".BPT-HtmlTreeItem-HiddenRoot";
    HtmlTreeViewDragDrop.HoverSelector = ".BPT-HtmlTreeItem-Hover";
    HtmlTreeViewDragDrop.ItemSelector = ".BPT-HtmlTreeItem";
    HtmlTreeViewDragDrop.ScrollContainerSelector = ".BPT-HtmlTree-ScrollContainer";
    HtmlTreeViewDragDrop.TreeSelector = ".BPT-HtmlTree";

    HtmlTreeViewDragDrop.AutoscrollPixelsPerSecond = 30;

    HtmlTreeViewDragDrop.AutoscrollAcceleration = 5;

    HtmlTreeViewDragDrop.LastTimeStamp = 0;

    HtmlTreeViewDragDrop.AutoexpandDisclosureTriangleMillisecondDelay = 500;
    HtmlTreeViewDragDrop.AutoexpandNonExpandableMillisecondDelay = 1000;
    HtmlTreeViewDragDrop.AutoexpandPixelDrift = 2;

    HtmlTreeViewDragDrop.LastExpandIcon = undefined;

    HtmlTreeViewDragDrop.EventCallback = {};
    return HtmlTreeViewDragDrop;
})();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/htmlTreeViewDragDrop.js.map

// m.ts

function $m(arg) {
    if (typeof arg === "string") {
        var matches = arg.match(/<(\w+?)>/);
        if (matches) {
            return new $mList("", document.createElement(matches[1]));
        } else {
            var list;
            list = document.querySelectorAll(arg);
            return new $mList(arg, list);
        }
    }

    return new $mList("", arg);
}
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/m.js.map

// mList.ts
"use strict";
var $mList = (function () {
    function $mList(selector, nodeListOrNode) {
        this.selector = selector;
        if (nodeListOrNode === null) {
            this._array = [];
        } else if (nodeListOrNode.length !== undefined) {
            this._array = [];
            var nodeList = nodeListOrNode;
            var len = nodeList.length;
            for (var i = 0; i < len; i++) {
                this._array.push(new $mNode(nodeList[i]));
            }
        } else {
            this._array = [new $mNode(nodeListOrNode)];
        }
    }
    Object.defineProperty($mList.prototype, "length", {
        get: function () {
            return this._array.length;
        },
        enumerable: true,
        configurable: true
    });

    $mList.prototype.is = function (s) {
        if (s === ":hidden") {
            for (var i = 0; i < this.length; i++) {
                if (!this._array[i].is(":hidden")) {
                    return false;
                }
            }

            return true;
        }

        if (s === ":visible") {
            return !this.is(":hidden");
        }

        throw "$mNode.is(s: string) : boolean - can only be called with :hidden or :visible";
    };

    $mList.prototype.scrollTop = function (value) {
        if (this.length === 0) {
            return;
        }

        return this._array[0].scrollTop();
    };

    $mList.prototype.scrollLeft = function (value) {
        if (this.length === 0) {
            return;
        }

        return this._array[0].scrollLeft();
    };

    $mList.prototype.data = function (key, value) {
        if (this.length === 0) {
            return;
        }

        return this._array[0].data(key, value);
    };

    $mList.prototype.attr = function (attributeName, setValue) {
        if (this.length === 0) {
            return;
        }

        if (setValue !== undefined) {
            for (var i = 0; i < this.length; i++) {
                this._array[i].setAttr(attributeName, setValue);
            }

            return this;
        } else {
            return this._array[0].attr(attributeName);
        }
    };

    $mList.prototype.removeAttr = function (attributeName) {
        for (var i = 0; i < this.length; i++) {
            this._array[i].removeAttr(attributeName);
        }

        return this;
    };

    $mList.prototype.matchAttr = function (attributeName, value) {
        var result = new $mList(this.selector + " → matchAttr", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var node = this._array[i];
            if (node.matchAttr(attributeName, value)) {
                result.push(node);
            }
        }

        return result;
    };

    $mList.prototype.addClass = function (className) {
        for (var i = 0; i < this.length; i++) {
            this._array[i].addClass(className);
        }

        return this;
    };

    $mList.prototype.removeClass = function (s) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].removeClass(s);
        }

        return this;
    };

    $mList.prototype.hasClass = function (className) {
        for (var i = 0; i < this.length; i++) {
            if (this._array[i].hasClass(className)) {
                return true;
            }
        }

        return false;
    };

    $mList.prototype.hide = function () {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].hide();
        }

        return this;
    };

    $mList.prototype.show = function () {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].show();
        }

        return this;
    };

    $mList.prototype.placeholder = function (s) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].placeholder(s);
        }

        return this;
    };

    $mList.prototype.focus = function () {
        if (this.length >= 1) {
            this._array[0].focus();
        }

        return this;
    };

    $mList.prototype.text = function (s) {
        if (s === undefined) {
            if (this.length > 0) {
                return this._array[0].text();
            }

            return;
        }

        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].text(s);
        }

        return this;
    };

    $mList.prototype.html = function (htmlString) {
        if (htmlString === undefined) {
            if (this.length > 0) {
                return this._array[0].html();
            }

            return;
        }

        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].html(htmlString);
        }

        return this;
    };

    $mList.prototype.each = function (fn) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            fn.call(this._array[i].get(), i, this._array[i].get());
        }
    };

    $mList.prototype.parent = function (s) {
        if (s !== undefined) {
            if (!$mList.isClassSelector(s)) {
                return;
            }

            s = s.substr(1);
        }

        var result = new $mList(this.selector + " → parent", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var parent = this._array[i].parent(s);
            if (parent) {
                result.push(parent);
            }
        }

        return result;
    };

    $mList.prototype.parents = function (s) {
        if (!$mList.isClassSelector(s)) {
            return;
        }

        s = s.substr(1);
        var result = new $mList(this.selector + " → parents", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var subResult = this._array[i].parents(s);
            if (subResult && subResult.length) {
                for (var j = 0; j < subResult.length; j++) {
                    result.push(subResult[j]);
                }
            }
        }

        return result;
    };

    $mList.prototype.children = function (s) {
        if (s !== undefined) {
            if (!$mList.isClassSelector(s)) {
                return;
            }

            s = s.substr(1);
        }

        var result = new $mList(this.selector + " → children", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var element = this._array[i].get();
            var sibling = element.firstChild;
            while (sibling) {
                if (sibling.nodeType === 1) {
                    var node = new $mNode(sibling);
                    if (s === undefined || node.hasClass(s)) {
                        result.push(node);
                    }
                }

                sibling = sibling.nextSibling;
            }
        }

        return result;
    };

    $mList.prototype.siblings = function (s) {
        if (s !== undefined) {
            if (!$mList.isClassSelector(s)) {
                return;
            }

            s = s.substr(1);
        }

        var result = new $mList(this.selector + " → siblings", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var thisChild = this._array[i].get();
            var element = this._array[i].get().parentNode;
            var sibling = element.firstChild;
            while (sibling) {
                if (sibling.nodeType === 1 && sibling !== thisChild) {
                    var node = new $mNode(sibling);
                    if (s === undefined || node.hasClass(s)) {
                        result.push(node);
                    }
                }

                sibling = sibling.nextSibling;
            }
        }

        return result;
    };

    $mList.prototype.next = function (s) {
        if (s !== undefined) {
            if (!$mList.isClassSelector(s)) {
                return;
            }

            s = s.substr(1);
        }

        var result = new $mList(this.selector + " → next", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var child = this._array[i].get().nextSibling;
            while (child) {
                var node = new $mNode(child);
                if (s === undefined || node.hasClass(s)) {
                    result.push(node);
                    return result;
                }

                child = child.nextSibling;
            }
        }

        return result;
    };

    $mList.prototype.prev = function (s) {
        if (s !== undefined) {
            if (!$mList.isClassSelector(s)) {
                return;
            }

            s = s.substr(1);
        }

        var result = new $mList(this.selector + " → prev", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var child = this._array[i].get().previousSibling;
            while (child) {
                var node = new $mNode(child);
                if (s === undefined || node.hasClass(s)) {
                    result.push(node);
                    return result;
                }

                child = child.previousSibling;
            }
        }

        return result;
    };

    $mList.prototype.appendTo = function (item) {
        if (item.length === 1) {
            var len = this.length;
            var parent = item.get(0);
            for (var i = 0; i < len; i++) {
                parent.appendChild(this.get(i));
            }
        }

        return this;
    };

    $mList.prototype.after = function (item) {
        if (item.length > 0) {
            var len = this.length;
            for (var i = 0; i < len; i++) {
                var child = this.get(i);
                var parent = child.parentNode;
                if (child.nextSibling) {
                    for (var j = 0; j < item.length; j++) {
                        parent.insertBefore(item.get(j), child.nextSibling);
                    }
                } else {
                    for (var j = 0; j < item.length; j++) {
                        parent.appendChild(item.get(j));
                    }
                }
            }
        }

        return this;
    };

    $mList.prototype.not = function (s) {
        if (!$mList.isClassSelector(s)) {
            return;
        }

        s = s.substr(1);
        var result = new $mList(this.selector + " → not", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var node = this._array[i];
            if (!node.hasClass(s)) {
                result.push(node);
            }
        }

        return result;
    };

    $mList.prototype.slice = function (start, end) {
        var result = new $mList(this.selector + " → slice", null);
        var len = this.length;
        if (typeof end === "undefined" || end > len) {
            end = len;
        }

        for (var i = start; i < end; i++) {
            var node = this._array[i];
            result.push(node);
        }

        return result;
    };

    $mList.prototype.closest = function (s) {
        var classes = s.split(/[ ,]+/);
        for (var classIndex = 0; classIndex < classes.length; classIndex++) {
            if (!$mList.isClassSelector(classes[classIndex])) {
                return;
            }

            classes[classIndex] = classes[classIndex].substr(1);
        }

        var result = new $mList(this.selector + " → closest", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var element = this._array[i].closest(classes);
            if (element) {
                result.push(element);
            }
        }

        return result;
    };

    $mList.prototype.find = function (subselector) {
        var result = new $mList(this.selector + " → find", null);
        var len = this.length;

        for (var i = 0; i < len; i++) {
            var element = this._array[i].get();
            var nodeList = element.querySelectorAll(subselector);

            if (nodeList) {
                for (var j = 0, nodeListLen = nodeList.length; j < nodeListLen; j++) {
                    result.push(new $mNode(nodeList[j]));
                }
            }
        }

        return result;
    };

    $mList.prototype.remove = function () {
        var result = new $mList(this.selector + " → remove", null);
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].remove();
        }

        return result;
    };

    $mList.prototype.prepend = function (item) {
        if (item.length > 0) {
            var len = this.length;
            for (var i = 0; i < len; i++) {
                for (var j = item.length - 1; j >= 0; j--) {
                    this._array[i].prepend(item._array[j].get());
                }
            }
        }

        return this;
    };

    $mList.prototype.append = function (item) {
        if (item.length > 0) {
            var len = this.length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < item.length; j++) {
                    this._array[i].append(item._array[j].get());
                }
            }
        }

        return this;
    };

    $mList.prototype.appendText = function (s) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            var child = this._array[i];
            child.append(document.createTextNode(s));
        }

        return this;
    };

    $mList.prototype.replaceWith = function (item) {
        var len = this.length;
        if (len > 0 && item.length === 1) {
            for (var i = 0; i < len; i++) {
                this._array[i].replaceWith(item._array[0]);
            }
        }

        return this;
    };

    $mList.prototype.select = function () {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].select();
        }

        return this;
    };

    $mList.prototype.val = function (s) {
        var len = this.length;
        if (s !== undefined) {
            for (var i = 0; i < len; i++) {
                this._array[i].val(s);
            }

            return this;
        }

        if (len === 0) {
            return;
        }

        return this._array[0].val(s);
    };

    $mList.prototype.css = function (keyOrMap, value) {
        var len = this.length;
        if (value !== undefined) {
            for (var i = 0; i < len; i++) {
                this._array[i].css(keyOrMap, value);
            }

            return this;
        }

        if (len === 0) {
            return;
        }

        return this._array[0].css(keyOrMap);
    };

    $mList.prototype.click = function () {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].click();
        }

        return this;
    };

    $mList.prototype.dblclick = function () {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            this._array[i].dblclick();
        }

        return this;
    };

    $mList.prototype.bindTarget = function (target, events, fn, arg) {
        return this.changeBinding(target, true, events, fn, arg);
    };

    $mList.prototype.bind = function (events, fn, arg) {
        return this.changeBinding(undefined, true, events, fn, arg);
    };

    $mList.prototype.unbind = function (events, fn) {
        return this.changeBinding(undefined, false, events, fn);
    };

    $mList.prototype.trigger = function (events, extra) {
        var eventList = events.split(" ");
        var len = this.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < eventList.length; j++) {
                var event = eventList[j];
                if ($mList.DomEvents.indexOf(event) >= 0) {
                    this._array[i].triggerEvent(event, extra);
                } else {
                    this._array[i].triggerSpecial(event, extra);
                }
            }
        }

        return this;
    };

    $mList.prototype.get = function (n) {
        if (n < 0) {
            n = n + this.length;
        }

        if (n >= this.length || n < 0) {
            return null;
        }

        return this._array[n].get();
    };

    $mList.prototype.first = function () {
        var result = new $mList(this.selector + " → first", null);
        if (this.length > 0) {
            result.push(this._array[0]);
        }

        return result;
    };

    $mList.prototype.last = function () {
        var result = new $mList(this.selector + " → last", null);
        if (this.length > 0) {
            result.push(this._array[this.length - 1]);
        }

        return result;
    };

    $mList.prototype.position = function () {
        var len = this.length;
        if (len > 0) {
            return this._array[0].position();
        }

        return;
    };

    $mList.prototype.height = function () {
        var len = this.length;
        if (len > 0) {
            return this._array[0].height();
        }

        return;
    };

    $mList.prototype.outerHeight = function (includeMargin) {
        var len = this.length;
        if (len > 0) {
            return this._array[0].outerHeight(includeMargin);
        }

        return;
    };

    $mList.prototype.width = function () {
        var len = this.length;
        if (len > 0) {
            return this._array[0].width();
        }

        return;
    };

    $mList.prototype.outerWidth = function (includeMargin) {
        var len = this.length;
        if (len > 0) {
            return this._array[0].outerWidth(includeMargin);
        }

        return;
    };

    $mList.isClassSelector = function (selector) {
        if (selector[0] !== ".") {
            return false;
        }

        if (selector.indexOf(",") !== -1) {
            return false;
        }

        if (selector.indexOf("#") !== -1) {
            return false;
        }

        if (selector.indexOf(">") !== -1) {
            return false;
        }

        if (selector.indexOf(" ") !== -1) {
            return false;
        }

        if (selector.indexOf("[") !== -1) {
            return false;
        }

        return true;
    };

    $mList.prototype.push = function (mNode) {
        this._array.push(mNode);
    };

    $mList.prototype.changeBinding = function (target, isBind, events, fn, arg) {
        var eventList = events.split(" ");
        var len = this.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < eventList.length; j++) {
                var event = eventList[j];
                if ($mList.DomEvents.indexOf(event) >= 0) {
                    this._array[i].changeEventBinding(isBind, target, event, fn, arg);
                } else {
                    this._array[i].changeSpecialBinding(isBind, target, event, fn, arg);
                }
            }
        }

        return this;
    };
    $mList.DomEvents = [
        "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "contextmenu",
        "focus", "blur", "focusin", "focusout",
        "keydown", "keyup", "keypress",
        "change", "reset", "select", "submit"
    ];
    return $mList;
})();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/mList.js.map

// mNode.ts

var $mNode = (function () {
    function $mNode(node) {
        this.length = 1;
        this._node = node;
    }
    $mNode.prototype.get = function () {
        return this._node;
    };

    $mNode.prototype.is = function (s) {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.is(s: string) : boolean - can only be called on HTML elements";
        }

        var element = this._node;
        if (s === ":hidden") {
            return element.style.display === "none";
        } else if (s === ":visible") {
            return element.style.display !== "none";
        }

        throw "$mNode.is(s: string) : boolean - can only be called with :hidden or :visible";
    };

    $mNode.prototype.hide = function () {
        if (!(this._node instanceof HTMLElement) && !(this._node instanceof SVGElement)) {
            throw "$mNode.hide(): IQueryNode - can only be called on HTML or SVG elements";
        }

        var element = this._node;
        element.style.display = "none";
        return this;
    };

    $mNode.prototype.show = function () {
        if (!(this._node instanceof HTMLElement) && !(this._node instanceof SVGElement)) {
            throw "$mNode.show(): IQueryNode - can only be called on HTML or SVG elements";
        }

        var element = this._node;
        element.style.display = "";

        var style = element.ownerDocument.parentWindow.getComputedStyle(element);
        var display = style.display;
        if (display === "none") {
            element.style.display = "block";
        }

        return this;
    };

    $mNode.prototype.placeholder = function (s) {
        if (!(this._node instanceof HTMLInputElement)) {
            throw "$mNode.placeholder(s: string): IQueryNode - can only be called on HTMLInput elements";
        }

        var element = this._node;
        element.placeholder = s;
        return this;
    };

    $mNode.prototype.focus = function () {
        var element = this._node;
        element.focus();
        return this;
    };

    $mNode.prototype.scrollTop = function (value) {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.scrollTop(value?: number): number - can only be called on HTML elements";
        }

        var element = this._node;
        if (value !== undefined) {
            return element.scrollTop;
        }

        element.scrollTop = value;
        return value;
    };

    $mNode.prototype.addClass = function (className) {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.addClass(className: string) - can only be called on HTML elements";
        }

        var element = this._node;
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    };

    $mNode.prototype.removeClass = function (className) {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.removeClass(className: string) - can only be called on HTML elements";
        }

        var element = this._node;
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    };

    $mNode.prototype.hasClass = function (className) {
        if (!(this._node instanceof HTMLElement)) {
            return false;
        }

        var element = this._node;
        return element.classList && element.classList.contains(className);
    };

    $mNode.prototype.scrollLeft = function (value) {
        if (!(this._node instanceof Element)) {
            throw "$mNode.scrollLeft(value?: number): number - can only be called on Elements";
        }

        var element = this._node;
        if (value !== undefined) {
            return element.scrollLeft;
        }

        element.scrollLeft = value;
        return value;
    };

    $mNode.prototype.data = function (key, value) {
        var data = this._node[$mNode.DATA_KEY];
        if (!data) {
            this._node[$mNode.DATA_KEY] = data = {};
        }

        if (key === undefined) {
            return data;
        }

        if (value !== undefined) {
            data[key] = value;
        } else {
            return data[key];
        }

        return data;
    };

    $mNode.prototype.attr = function (attributeName) {
        if (!(this._node instanceof Element)) {
            throw "$mNode.attr(attributeName: string): string - can only be called on Elements";
        }

        var element = this._node;
        var result = element[attributeName];
        if (result === undefined) {
            result = element.getAttribute(attributeName);
        }

        return result === null ? undefined : result;
    };

    $mNode.prototype.removeAttr = function (attributeName) {
        if (!(this._node instanceof Element)) {
            throw "$mNode.removeAttr(attributeName: string): string - can only be called on Elements";
        }

        var element = this._node;
        element.removeAttribute(attributeName);
    };

    $mNode.prototype.matchAttr = function (attributeName, value) {
        if (!(this._node instanceof Element)) {
            throw "$mNode.matchAttr(attributeName: string, value: string) - can only be called on Elements";
        }

        var element = this._node;
        return element.getAttribute(attributeName) === value;
    };

    $mNode.prototype.setAttr = function (attributeName, setValue) {
        if (!(this._node instanceof Element)) {
            throw "$mNode.setAttr(attributeName: string, setValue: any): void - can only be called on Elements";
        }

        var element = this._node;
        element.setAttribute(attributeName, setValue);
    };

    $mNode.prototype.parent = function (s) {
        if (!(this._node instanceof HTMLElement)) {
            return;
        }

        var parentNode = this._node.parentNode;
        return s === undefined || parentNode.classList.contains(s) ? new $mNode(parentNode) : undefined;
    };

    $mNode.prototype.parents = function (s) {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.parents(s: string): IQueryNode - can only be called on HTML elements";
        }

        var node = this._node;
        var results = [];
        while (node.parentNode instanceof HTMLElement) {
            var node = node.parentNode;
            if (node.classList.contains(s)) {
                results.push(new $mNode(node));
            }
        }

        return results;
    };

    $mNode.prototype.text = function (s) {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.text(s?: string): string - can only be called on HTML elements";
        }

        var element = this._node;
        if (s === undefined) {
            return element.innerText;
        }

        element.innerText = s;
        return s;
    };

    $mNode.prototype.html = function (htmlString) {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.html(htmlString?: string): string - can only be called on HTML elements";
        }

        var element = this._node;
        if (htmlString === undefined) {
            return element.innerHTML;
        }

        element.innerHTML = htmlString;
        return htmlString;
    };

    $mNode.prototype.remove = function () {
        if (this._node.parentNode) {
            this._node.parentNode.removeChild(this._node);
        }
    };

    $mNode.prototype.prepend = function (node) {
        this._node.insertBefore(node, this._node.firstChild);
    };

    $mNode.prototype.append = function (node) {
        this._node.appendChild(node);
    };

    $mNode.prototype.replaceWith = function (node) {
        var parent = this._node.parentNode;
        if (parent) {
            var nextSibling = this._node.nextSibling;
            parent.removeChild(this._node);
            var replacement = node._node;
            if (nextSibling) {
                parent.insertBefore(replacement, nextSibling);
            } else {
                parent.appendChild(replacement);
            }
        }
    };

    $mNode.prototype.select = function () {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.select() - can only be called on HTML elements";
        }

        var element = this._node;
        element.select();
    };

    $mNode.prototype.val = function (s) {
        if (!(this._node instanceof HTMLInputElement)) {
            throw "$mNode.val(): string - can only be called on HTMLInput elements";
        }

        var element = this._node;
        if (s === undefined) {
            var value = element.value;
            if (typeof value === "string") {
                return value.replace(/\r/g, "");
            }

            if (value === undefined || value === null) {
                return "";
            }

            return value;
        }

        element.value = s;
    };

    $mNode.prototype.closest = function (classes) {
        var element = this._node;

        while (element) {
            if (element.classList) {
                for (var i = 0; i < classes.length; i++) {
                    if (element.classList.contains(classes[i])) {
                        return new $mNode(element);
                    }
                }
            }

            element = element.parentNode;
        }
    };

    $mNode.prototype.css = function (keyOrMap, value) {
        if (keyOrMap && typeof keyOrMap === "object") {
            var map = keyOrMap;
            for (var key in map) {
                this.css(key, map[key]);
            }
        } else {
            var key = keyOrMap;
            var element = this._node;
            if (value !== undefined) {
                element.style[key] = value;
            }

            return element.style ? element.style[key] : undefined;
        }
    };

    $mNode.prototype.click = function () {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.click(): IQueryNode - can only be called on HTML elements";
        }

        var element = this._node;
        element.click();
        return this;
    };

    $mNode.prototype.dblclick = function () {
        if (!(this._node instanceof HTMLElement)) {
            throw "$mNode.dblclick(): IQueryNode - can only be called on HTML elements";
        }

        var element = this._node;
        element.fireEvent("ondblclick");
    };

    $mNode.prototype.changeEventBinding = function (isBind, target, event, fn, arg) {
        var element = this._node;
        var name = "on" + event;
        var oldBinding = element[name];
        var newBinding;
        var currentFuncs = oldBinding && oldBinding.boundFuncList ? oldBinding.boundFuncList : [];
        var index;
        if (isBind) {
            currentFuncs.push(fn);
        } else if (fn) {
            index = currentFuncs.indexOf(fn);
            if (index >= 0) {
                currentFuncs.splice(index, 1);
            }
        } else {
            currentFuncs = [];
        }

        if (currentFuncs.length) {
            if (target === undefined) {
                target = element;
            }

            newBinding = function (e) {
                var i;
                var bubble = true;
                e.target = target;
                for (i = 0; i < currentFuncs.length; i++) {
                    var result = currentFuncs[i].call(target, e, arg);
                    if (!result && typeof result === "boolean") {
                        e.preventDefault();
                        e.stopPropagation();
                        bubble = false;
                    }
                }

                return bubble;
            };
            newBinding.boundFuncList = currentFuncs;
        }

        element[name] = newBinding;
        return this;
    };

    $mNode.prototype.triggerEvent = function (event, extra) {
        var element = this._node;
        var trigger = element[event];
        if (trigger) {
            trigger.call(element, {}, extra);
        }

        return this;
    };

    $mNode.prototype.changeSpecialBinding = function (isBind, target, event, fn, arg) {
        var element = this._node;
        var key = $mNode.BINDING_KEY + event;
        element[key] = isBind ? fn : undefined;

        return this;
    };

    $mNode.prototype.triggerSpecial = function (event, extra) {
        var element = this._node;
        var key = $mNode.BINDING_KEY + event;
        var trigger = element[key];
        if (trigger) {
            trigger.call(element, {}, extra);
        }

        return this;
    };

    $mNode.prototype.position = function () {
        var element = this._node;
        var position = {
            top: element.offsetTop,
            left: element.offsetLeft
        };
        return position;
    };

    $mNode.prototype.height = function () {
        var element = this._node;

        var height = element.getBoundingClientRect().height;
        var compStyle = window.getComputedStyle(element, null);
        height -= parseInt(compStyle.paddingTop, 10);
        height -= parseInt(compStyle.paddingBottom, 10);
        height -= parseInt(compStyle.borderTopWidth, 10);
        height -= parseInt(compStyle.borderBottomWidth, 10);
        return height;
    };

    $mNode.prototype.outerHeight = function (includeMargin) {
        var element = this._node;

        var outerHeight = element.getBoundingClientRect().height;
        if (includeMargin) {
            var compStyle = window.getComputedStyle(element, null);
            outerHeight += parseInt(compStyle.marginTop, 10);
            outerHeight += parseInt(compStyle.marginBottom, 10);
        }

        return outerHeight;
    };

    $mNode.prototype.width = function () {
        var element = this._node;

        var width = element.getBoundingClientRect().width;
        var compStyle = window.getComputedStyle(element, null);
        width -= parseInt(compStyle.paddingLeft, 10);
        width -= parseInt(compStyle.paddingRight, 10);
        width -= parseInt(compStyle.borderLeftWidth, 10);
        width -= parseInt(compStyle.borderRightWidth, 10);
        return width;
    };

    $mNode.prototype.outerWidth = function (includeMargin) {
        var element = this._node;

        var outerWidth = element.getBoundingClientRect().width;
        if (includeMargin) {
            var compStyle = window.getComputedStyle(element, null);
            outerWidth += parseInt(compStyle.marginLeft, 10);
            outerWidth += parseInt(compStyle.marginRight, 10);
        }

        return outerWidth;
    };
    $mNode.BINDING_KEY = "$BPT$Binding$";
    $mNode.DATA_KEY = "$BPT$QueryData$";
    return $mNode;
})();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/mNode.js.map

// dataTreeView.ts
"use strict";
var DataTreeView = (function () {
    function DataTreeView() {
    }
    DataTreeView.getChildren = function (item) {
        if (item.hasClass("BPT-DataTree-Container")) {
            return item.children().first().children(".BPT-DataTreeItem-ChildCollection").children(".BPT-DataTreeItem");
        }

        return item.children(".BPT-DataTreeItem-ChildCollection").children(".BPT-DataTreeItem");
    };

    DataTreeView.getName = function (item) {
        var nameNode = item.find("span.BPT-DataTreeItem-Name").first();
        var cssName = nameNode.children(".BPT-HTML-CSS-Name");
        return (cssName.length === 1 ? cssName : nameNode);
    };

    DataTreeView.getValue = function (item) {
        var valueNode = item.find("span.BPT-DataTreeItem-Value").first();
        var cssValue = valueNode.children(".BPT-HTML-CSS-Value");
        return (cssValue.length === 1 ? cssValue : valueNode);
    };

    DataTreeView.clear = function (item) {
        item.children(".BPT-DataTreeItem-ChildCollection").remove();
        if (item.hasClass("BPT-DataTree-Container")) {
            item.children().first().children(".BPT-DataTreeItem-ChildCollection").remove();
        }

        return item;
    };
    return DataTreeView;
})();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/dataTreeView.js.map

// App.ts
var Common;
(function (Common) {
    "use strict";

    var App = (function () {
        function App() {
        }
        Object.defineProperty(App.prototype, "diagnosticsBridge", {
            get: function () {
                return this._diagnosticsBridge;
            },
            enumerable: true,
            configurable: true
        });

        App.prototype.main = function () {
            var externalObj;
            if (window.parent.getExternalObj) {
                externalObj = window.parent.getExternalObj();
            } else if (window.external) {
                externalObj = window.external;
            }

            if (Plugin && Plugin.F12) {
                this._diagnosticsBridge = new Common.IEDiagnosticsBridge(externalObj);
            } else {
                var proxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("F12.Common.Bridge.IDomBridge", this, true);
                this._diagnosticsBridge = new Common.DiagnosticsBridge(proxy);
            }

            if (document.documentMode < 10) {
                window.navigate("about:blank");
                return;
            }

            this.onStartup();
        };

        App.prototype.onStartup = function () {
        };
        return App;
    })();
    Common.App = App;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/App.js.map

// range.ts
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        var Range = (function () {
            function Range(firstIndex, lastIndex, content, isFromComplexBlock, isStart, rangeType) {
                this.firstIndex = firstIndex;
                this.lastIndex = lastIndex;
                this.content = content;
                this.isFromComplexBlock = isFromComplexBlock;
                this.isStart = isStart;
                this.rangeType = rangeType;
            }
            return Range;
        })();
        Templating.Range = Range;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/range.js.map

// rangeFinder.ts
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        var RangeFinder = (function () {
            function RangeFinder() {
            }
            RangeFinder.prototype.findRanges = function (text) {
                var result = [];

                if (!text || text.length === 0) {
                    return result;
                }

                result = result.concat(this.internalFindRanges("##forEach(", ")##", text, "forEach", true));
                result = result.concat(this.internalFindRanges("##endForEach##", null, text, "forEach", false));
                result = result.concat(this.internalFindRanges("##if(", ")##", text, "if", true));
                result = result.concat(this.internalFindRanges("##endIf##", null, text, "if", false));
                result = result.concat(this.internalFindRanges("##include(", ")##", text, "include", false));
                result.sort(this.compareRanges);
                result = result.concat(this.findRemainingRanges(text, result));
                result.sort(this.compareRanges);

                return result;
            };

            RangeFinder.prototype.compareRanges = function (a, b) {
                if (a.firstIndex === b.firstIndex) {
                    return 0;
                }

                return a.firstIndex < b.firstIndex ? -1 : 1;
            };

            RangeFinder.prototype.internalFindRanges = function (startsWith, endsWith, textToSearch, rangeType, isStart) {
                var indexStartsWith;
                var minimumIndex = 0;
                var indexEndsWith;
                var results = [];
                var content;
                var lastIndex;

                while (minimumIndex < textToSearch.length) {
                    indexStartsWith = textToSearch.indexOf(startsWith, minimumIndex);
                    indexEndsWith = null;
                    content = null;
                    lastIndex = null;

                    if (indexStartsWith === -1) {
                        return results;
                    }

                    if (endsWith) {
                        minimumIndex = indexStartsWith + startsWith.length + 1;
                        if (minimumIndex >= textToSearch.length) {
                            return results;
                        }

                        indexEndsWith = textToSearch.indexOf(endsWith, minimumIndex);

                        if (indexEndsWith === -1) {
                            return results;
                        }

                        content = textToSearch.substring(indexStartsWith + startsWith.length, indexEndsWith);
                        lastIndex = indexEndsWith + endsWith.length - 1;
                    } else {
                        lastIndex = indexStartsWith + startsWith.length - 1;
                    }

                    results.push(new Templating.Range(indexStartsWith, lastIndex, content, true, isStart, rangeType));
                    minimumIndex = results[results.length - 1].lastIndex + 1;
                }

                return results;
            };

            RangeFinder.prototype.findRemainingRanges = function (text, rangesFound) {
                var result = [];

                if (rangesFound.length === 0) {
                    result.push(new Templating.Range(0, text.length - 1, text, false, false, "text"));
                    return result;
                }

                var startIndex = 0;
                var precedingGapLength;
                for (var i = 0; i < rangesFound.length; i++) {
                    precedingGapLength = rangesFound[i].firstIndex - startIndex;
                    if (precedingGapLength > 0) {
                        result.push(new Templating.Range(startIndex, startIndex + precedingGapLength - 1, text.substring(startIndex, startIndex + precedingGapLength), false, false, "text"));
                    }

                    startIndex = rangesFound[i].lastIndex + 1;
                }

                if (startIndex < text.length - 1) {
                    result.push(new Templating.Range(startIndex, text.length - 1, text.substring(startIndex, text.length), false, false, "text"));
                }

                return result;
            };
            return RangeFinder;
        })();
        Templating.RangeFinder = RangeFinder;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/rangeFinder.js.map

// block.ts
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        var Block = (function () {
            function Block() {
                this.blocks = [];
            }
            Block.prototype.addBlock = function (block) {
                this.blocks.push(block);
            };

            Block.prototype.process = function (obj) {
                return "";
            };
            return Block;
        })();
        Templating.Block = Block;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/block.js.map

// ifBlock.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        var IfBlock = (function (_super) {
            __extends(IfBlock, _super);
            function IfBlock(range, text) {
                _super.call(this);
                this._negate = false;
                this._decisionVariable = range.content;
                if (this._decisionVariable[0] === "!") {
                    this._negate = true;
                    this._decisionVariable = this._decisionVariable.substr(1);
                }

                this.containerType = "if";
            }
            IfBlock.prototype.process = function (obj) {
                var result = "";
                var decisionValue = obj[this._decisionVariable];
                if (typeof decisionValue === "function") {
                    var decisionFunction = decisionValue;
                    decisionValue = decisionFunction.call(obj);
                }

                if (this._negate) {
                    decisionValue = !decisionValue;
                }

                if (decisionValue) {
                    for (var i = 0; i < this.blocks.length; i++) {
                        result = result + this.blocks[i].process(obj);
                    }
                }

                return result;
            };
            return IfBlock;
        })(Templating.Block);
        Templating.IfBlock = IfBlock;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/ifBlock.js.map

// forEachBlock.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        var ForEachBlock = (function (_super) {
            __extends(ForEachBlock, _super);
            function ForEachBlock(range, text) {
                _super.call(this);
                this._iterationVariable = range.content;
                this.containerType = "forEach";
            }
            ForEachBlock.prototype.process = function (obj) {
                var result = "";
                var collection = obj[this._iterationVariable];
                var i, j;
                for (i = 0; i < collection.length; i++) {
                    var item = collection[i];
                    for (j = 0; j < this.blocks.length; j++) {
                        result = result + this.blocks[j].process(item);
                    }
                }

                return result;
            };
            return ForEachBlock;
        })(Templating.Block);
        Templating.ForEachBlock = ForEachBlock;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/forEachBlock.js.map

// textBlock.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        var TextBlock = (function (_super) {
            __extends(TextBlock, _super);
            function TextBlock(range) {
                _super.call(this);
                this._text = range.content;
                this.containerType = "text";
            }
            TextBlock.prototype.process = function (model) {
                var replaceWhat;
                var text = this._text;
                while (replaceWhat = this.findNextDelimitedString(text)) {
                    var propertyPath = replaceWhat.substring(TextBlock.DelimiterLength, replaceWhat.length - TextBlock.DelimiterLength);
                    var replaceWith = "";
                    var subModel = model;
                    propertyPath.split(".").forEach(function (value, index, array) {
                        if (!subModel) {
                            return;
                        }

                        subModel = subModel[value];
                    });

                    if (typeof subModel !== "undefined" && subModel !== null) {
                        if (typeof subModel === "string") {
                            replaceWith = subModel;
                        } else {
                            replaceWith = subModel.toString();
                        }
                    }

                    replaceWith = replaceWith.replace(TextBlock.GTRegex, "&gt;").replace(TextBlock.LTRegex, "&lt;").replace(TextBlock.DoubleQuoteRegex, "&quot;").replace(TextBlock.SingleQuoteRegex, "&apos;").replace(TextBlock.DollarRegex, "$$$$");
                    text = text.replace(replaceWhat, replaceWith);
                }

                return text;
            };

            TextBlock.prototype.findNextDelimitedString = function (s) {
                var allResults = TextBlock.DelimiterRegex.exec(s);
                if (!allResults) {
                    return null;
                }

                return allResults[0];
            };
            TextBlock.DelimiterRegex = /%%[$a-zA-Z_][$a-zA-Z0-9_]*(\.[$a-zA-Z_][$a-zA-Z0-9_]*)*%%/;
            TextBlock.GTRegex = />/g;
            TextBlock.LTRegex = /</g;
            TextBlock.DoubleQuoteRegex = /"/g;
            TextBlock.SingleQuoteRegex = /'/g;
            TextBlock.DollarRegex = /[$]/g;
            TextBlock.DelimiterLength = 2;
            return TextBlock;
        })(Templating.Block);
        Templating.TextBlock = TextBlock;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/textBlock.js.map

// includeBlock.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        var IncludeBlock = (function (_super) {
            __extends(IncludeBlock, _super);
            function IncludeBlock(range) {
                _super.call(this);
                this._template = range.content;
                this.containerType = "include";
            }
            IncludeBlock.prototype.process = function (obj) {
                var template = new Templating.Template({ htmlElementSource: document, templateId: this._template });
                return template.createTemplateText(obj);
            };
            return IncludeBlock;
        })(Templating.Block);
        Templating.IncludeBlock = IncludeBlock;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/includeBlock.js.map

// blockFactory.ts
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        var BlockFactory = (function () {
            function BlockFactory() {
            }
            BlockFactory.prototype.loadBlocks = function (container, text) {
                var rangeFinder = new Templating.RangeFinder();
                var ranges = rangeFinder.findRanges(text);

                var stack = [container];
                var range;
                var complexBlock;
                var containerType;
                var rangeType;

                for (var i = 0; i < ranges.length; i++) {
                    range = ranges[i];
                    if (range.rangeType === "text") {
                        stack[stack.length - 1].addBlock(new Templating.TextBlock(range));
                    } else if (range.rangeType === "include") {
                        stack[stack.length - 1].addBlock(new Templating.IncludeBlock(range));
                    } else if (range.isStart) {
                        if (range.rangeType === "if") {
                            complexBlock = new Templating.IfBlock(range, text);
                        } else if (range.rangeType === "forEach") {
                            complexBlock = new Templating.ForEachBlock(range, text);
                        }

                        if (!complexBlock) {
                            throw new Error("unrecognized block type " + range.rangeType);
                        }

                        stack[stack.length - 1].addBlock(complexBlock);
                        stack.push(complexBlock);
                        complexBlock = null;
                    } else {
                        rangeType = range.rangeType;
                        containerType = stack[stack.length - 1].containerType;
                        if (rangeType !== containerType) {
                            throw new Error("the current container (" + containerType + ") is missing an end tag. Found a (" + rangeType + ") end tag instead");
                        }

                        stack.pop();
                    }
                }
            };
            return BlockFactory;
        })();
        Templating.BlockFactory = BlockFactory;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/blockFactory.js.map

// template.ts
var Common;
(function (Common) {
    (function (Templating) {
        "use strict";

        ;

        var Template = (function () {
            function Template(documentSource, htmlText, localizer) {
                this._templateId = "";
                this._blocks = [];
                this.containerType = "template";
                if (documentSource) {
                    this._htmlElementSource = documentSource.htmlElementSource;
                    this._templateId = documentSource.templateId;
                    var templateContainerElement = this._htmlElementSource.getElementById(this._templateId);
                    if (!templateContainerElement) {
                        throw new Error("Template with id " + this._templateId + " is not valid.");
                    }

                    var templateText = templateContainerElement.innerHTML;
                    var localizedTemplateText = this.localize(templateText, localizer);
                    this.initialize(localizedTemplateText);
                } else {
                    this.initialize(htmlText);
                }
            }
            Template.prototype.addBlock = function (block) {
                this._blocks.push(block);
            };

            Template.prototype.createTemplateText = function (obj) {
                return this.processBlocks(obj);
            };

            Template.prototype.createTemplateElement = function (obj) {
                var templateInstance = this._htmlElementSource.createElement("div");
                templateInstance.innerHTML = this.createTemplateText(obj);
                var elementNode;
                for (var i = 0; i < templateInstance.childNodes.length; i++) {
                    if (templateInstance.childNodes[i].nodeType === Node.TEXT_NODE) {
                        if (!templateInstance.childNodes[i].textContent.match(/^\s+$/)) {
                            return templateInstance;
                        }
                    }

                    if (templateInstance.childNodes[i].nodeType === Node.ELEMENT_NODE) {
                        if (elementNode) {
                            return templateInstance;
                        }

                        elementNode = templateInstance.childNodes[i];
                    }
                }

                return elementNode;
            };

            Template.prototype.appendChild = function (parent, obj, className) {
                var child = this.createTemplateElement(obj);
                if (className) {
                    child.classList.add(className);
                }

                parent.appendChild(child);
            };

            Template.prototype.replaceChildren = function (parent, obj, className) {
                parent.innerHTML = "";
                this.appendChild(parent, obj, className);
            };

            Template.prototype.localize = function (text, localizer) {
                if (!localizer) {
                    return text;
                }

                var replaceWhat;
                var thingsToReplace = Template.LocalizationRegex.exec(text);
                if (!thingsToReplace || thingsToReplace.length === 0) {
                    return text;
                }

                for (var i = 0; i < thingsToReplace.length; i++) {
                    replaceWhat = thingsToReplace[i];
                    var localizationKey = replaceWhat.substring(Template.DelimiterLength, replaceWhat.length - Template.DelimiterLength);
                    var replaceWith = localizer.getString(localizationKey);
                    text = text.replace(replaceWhat, replaceWith);
                }

                return text;
            };

            Template.prototype.initialize = function (text) {
                var blockFactory = new Templating.BlockFactory();
                blockFactory.loadBlocks(this, text);
            };

            Template.prototype.processBlocks = function (model) {
                var result = "";
                for (var i = 0; i < this._blocks.length; i++) {
                    result = result + this._blocks[i].process(model);
                }

                return result;
            };
            Template.LocalizationRegex = /%L%[a-zA-Z]+%L%/;
            Template.DelimiterLength = 3;
            return Template;
        })();
        Templating.Template = Template;
    })(Common.Templating || (Common.Templating = {}));
    var Templating = Common.Templating;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Templating/template.js.map

// listModel.ts
var Common;
(function (Common) {
    (function (ModelView) {
        "use strict";
        var ListModel = (function () {
            function ListModel(listSource) {
                this.listSource = listSource;
            }
            Object.defineProperty(ListModel.prototype, "length", {
                get: function () {
                    if (!this.cache) {
                        return;
                    }

                    return this.cache.length;
                },
                enumerable: true,
                configurable: true
            });

            ListModel.prototype.load = function (loadCompleteCallback) {
                var _this = this;
                this.listSource(function (results) {
                    _this.cache = results;
                    loadCompleteCallback();
                }, this._loadArgs);
            };

            ListModel.prototype.setLoadArgs = function (loadArgs) {
                this._loadArgs = loadArgs;
            };

            ListModel.prototype.item = function (index) {
                if (!this.cache) {
                    return;
                }

                return this.cache[index];
            };
            return ListModel;
        })();
        ModelView.ListModel = ListModel;
    })(Common.ModelView || (Common.ModelView = {}));
    var ModelView = Common.ModelView;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ModelView/listModel.js.map

// listView.ts
var Common;
(function (Common) {
    (function (ModelView) {
        "use strict";
        var T = Common.Templating;

        ;

        var ListView = (function () {
            function ListView(htmlElementSource, listViewDivId, defaultItemTemplateId, model, alternateTemplates, localizer) {
                var _this = this;
                this._alternateTemplates = [];
                this._handlersAdded = [];
                this.htmlElementSource = htmlElementSource;
                this.listViewDivId = listViewDivId;
                this.listRoot = htmlElementSource.getElementById(listViewDivId);
                if (!this.listRoot) {
                    throw new Error("Can't find list root element with id '" + listViewDivId + "'.");
                }

                this._defaultTemplate = this.createTemplate(defaultItemTemplateId, localizer);
                if (!this.listRoot) {
                    throw new Error("Can't find default template element with id '" + defaultItemTemplateId + "'.");
                }

                this.model = model;
                if (alternateTemplates) {
                    alternateTemplates.forEach(function (value, index, array) {
                        var template = _this.createTemplate(value.templateId);
                        _this._alternateTemplates.push({ selectionFunction: value.templateMatchFunction, template: template });
                    });
                }
            }
            ListView.prototype.createTemplate = function (id, localizer) {
                return new T.Template({ htmlElementSource: this.htmlElementSource, templateId: id }, null, localizer);
            };

            ListView.prototype.addAutoRemoveHandlers = function (baseElement, event, classes, func) {
                var _this = this;
                var handler = function (evt) {
                    return _this.eventHandler(func, evt);
                };
                classes.forEach(function (className) {
                    var elements = [];
                    var childElements = baseElement.querySelectorAll("." + className);
                    for (var i = 0; i < childElements.length; i++) {
                        elements.push(childElements[i]);
                    }

                    if (baseElement.classList.contains(className)) {
                        elements.push(baseElement);
                    }

                    elements.forEach(function (element) {
                        element.addEventListener(event, handler);
                        _this._handlersAdded.push({ element: element, event: event, handler: handler });
                    });
                });
            };

            ListView.prototype.addHandler = function (element, event, classes, func) {
                var _this = this;
                element.addEventListener(event, function (evt) {
                    return _this.eventHandler(func, evt, classes);
                });
            };

            ListView.prototype.updateView = function () {
                var _this = this;
                this.model.load(function () {
                    _this.renderView();
                });
            };

            ListView.prototype.renderView = function () {
                this.clearView();
                this.preViewProcessing();
                for (var i = 0; i < this.model.length; i++) {
                    this.preItemViewProcessing(i);
                    this.listRoot.appendChild(this.renderItem(this.model.item(i), "BPT-List-Item"));
                    this.postItemViewProcessing(i);
                }

                this.postViewProcessing();
                if (this.renderViewCallback) {
                    this.renderViewCallback();
                }
            };

            ListView.prototype.renderItem = function (item, className) {
                var selectedTemplate = this.chooseTemplate(item);
                var element = selectedTemplate.createTemplateElement(item);
                if (className) {
                    element.classList.add(className);
                }

                return element;
            };

            ListView.prototype.renderItemText = function (item) {
                var selectedTemplate = this.chooseTemplate(item);
                return selectedTemplate.createTemplateText(item);
            };

            ListView.prototype.clearView = function () {
                this.removeAllHandlers();
                $m(this.listRoot).children().remove();
            };

            ListView.prototype.removeAllHandlers = function () {
                this._handlersAdded.forEach(function (handler) {
                    handler.element.removeEventListener(handler.event, handler.handler);
                });
                this._handlersAdded = [];
            };

            ListView.prototype.setFocus = function (element) {
                this.setTabIndex(element);
                element.focus();
            };

            ListView.prototype.setTabIndex = function (element) {
                var tabElements = this.listRoot.querySelectorAll("[tabIndex='1']");
                for (var i = 0; i < tabElements.length; i++) {
                    tabElements[i].removeAttribute("tabIndex");
                }

                element.setAttribute("tabIndex", "1");
            };

            ListView.prototype.postViewProcessing = function () {
                this.addAutoRemoveHandlers(this.listRoot, "mouseenter", [ListView.TOOLTIP_ITEM], function (evt) {
                    var tip = evt.target.getAttribute("data-tooltip");
                    if (tip) {
                        Plugin.Tooltip.show({ content: tip });
                    }

                    return true;
                });

                this.addAutoRemoveHandlers(this.listRoot, "mouseleave", [ListView.TOOLTIP_ITEM], function (evt) {
                    Plugin.Tooltip.dismiss();
                    return true;
                });
            };

            ListView.prototype.preViewProcessing = function () {
            };

            ListView.prototype.preItemViewProcessing = function (index) {
            };

            ListView.prototype.postItemViewProcessing = function (index) {
            };

            ListView.prototype.chooseTemplate = function (item) {
                var selectedTemplate = null;
                this._alternateTemplates.forEach(function (value, index, array) {
                    if (value.selectionFunction(item)) {
                        selectedTemplate = value.template;
                        return;
                    }
                });
                if (!selectedTemplate) {
                    selectedTemplate = this._defaultTemplate;
                }

                return selectedTemplate;
            };

            ListView.prototype.eventHandler = function (func, evt, classes) {
                if (Common.ToolWindowHelpers.isContextMenuUp()) {
                    return;
                }

                var element = evt.target;
                if (!element) {
                    return;
                }

                var classMatches;
                if (classes && classes.length && element.classList) {
                    classMatches = false;
                    for (var i = 0; i < classes.length; i++) {
                        if (element.classList.contains(classes[i])) {
                            classMatches = true;
                            break;
                        }
                    }
                } else {
                    classMatches = true;
                }

                if (classMatches && !func(evt)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            };
            ListView.TOOLTIP_ITEM = "BPT-Tooltip-Item";
            return ListView;
        })();
        ModelView.ListView = ListView;
    })(Common.ModelView || (Common.ModelView = {}));
    var ModelView = Common.ModelView;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ModelView/listView.js.map

// listReconciler.ts
var Common;
(function (Common) {
    (function (ModelView) {
        "use strict";
        var ListReconciler = (function () {
            function ListReconciler(idPropertyName, sortPropertyName, insertBeforeCallback, updateCallback, deleteCallback, isChanged, clearDirtyFlag) {
                this._idPropertyName = idPropertyName;
                this._sortPropertyName = sortPropertyName;
                this._insertBeforeCallback = insertBeforeCallback;
                this._updateCallback = updateCallback;
                this._deleteCallback = deleteCallback;
                this._isChanged = isChanged;
                this._clearDirtyFlag = clearDirtyFlag;
                if (!this._isChanged) {
                    this._isChanged = function (newThing, oldThing) {
                        return newThing !== oldThing;
                    };
                }
            }
            ListReconciler.prototype.reconcile = function (oldList, newList) {
                var _this = this;
                if (oldList === null || oldList === undefined) {
                    oldList = [];
                }

                if (newList === null || newList === undefined) {
                    newList = [];
                }

                if (this._sortPropertyName) {
                    newList.sort(function (a, b) {
                        var aValue = a[_this._sortPropertyName];
                        var bValue = b[_this._sortPropertyName];
                        if (aValue === bValue) {
                            return 0;
                        } else if (aValue < bValue) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                }

                var oldIndex = 0;
                var newIndex = 0;
                while (oldIndex < oldList.length || newIndex < newList.length) {
                    if (newIndex >= newList.length) {
                        this._deleteCallback(oldList[oldIndex++]);
                    } else if (oldIndex >= oldList.length) {
                        this._insertBeforeCallback(newList[newIndex++], oldIndex < oldList.length ? oldList[oldIndex] : null);
                    } else if (newList[newIndex][this._idPropertyName] === oldList[oldIndex][this._idPropertyName]) {
                        if (this._isChanged(newList[newIndex], oldList[oldIndex])) {
                            this._updateCallback(newList[newIndex], oldList[oldIndex]);
                            if (this._clearDirtyFlag) {
                                this._clearDirtyFlag(newList[newIndex]);
                            }
                        }

                        newIndex++;
                        oldIndex++;
                    } else if (newList[newIndex][this._sortPropertyName] > oldList[oldIndex][this._sortPropertyName]) {
                        this._deleteCallback(oldList[oldIndex++]);
                    } else {
                        this._insertBeforeCallback(newList[newIndex++], oldList[oldIndex]);
                    }
                }
            };
            return ListReconciler;
        })();
        ModelView.ListReconciler = ListReconciler;
    })(Common.ModelView || (Common.ModelView = {}));
    var ModelView = Common.ModelView;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ModelView/listReconciler.js.map

// reconcilingListView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (ModelView) {
        "use strict";
        var ReconcilingListView = (function (_super) {
            __extends(ReconcilingListView, _super);
            function ReconcilingListView(htmlElementSource, listViewDivId, defaultItemTemplateId, model, alternateTemplates, localizer, idPropertyName, sortPropertyName, isChanged, clearDirtyFlag) {
                _super.call(this, htmlElementSource, listViewDivId, defaultItemTemplateId, model, alternateTemplates, localizer);
                this.objectsPreviouslyRendered = [];
                this.htmlElementSource = htmlElementSource;
                this.listViewDivId = listViewDivId;
                this.idPropertyName = idPropertyName;
                this._sortPropertyName = sortPropertyName;
                if (this.idPropertyName && this._sortPropertyName) {
                    this.listReconciler = new ModelView.ListReconciler(idPropertyName, sortPropertyName, this.insertBefore.bind(this), this.update.bind(this), this.deleteItem.bind(this), isChanged, clearDirtyFlag);
                }
            }
            ReconcilingListView.prototype.renderView = function () {
                if (!this.listReconciler) {
                    _super.prototype.renderView.call(this);
                    return;
                }

                this.preViewProcessing();
                this.listReconciler.reconcile(this.objectsPreviouslyRendered, this.model.cache);
                this.objectsPreviouslyRendered = this.model.cache.slice(0);
                this.postViewProcessing();
                if (this.renderViewCallback) {
                    this.renderViewCallback();
                }
            };

            ReconcilingListView.prototype.beforeUpdate = function (newThing, oldThing, updatedElement) {
            };

            ReconcilingListView.prototype.afterUpdate = function (newThing, oldThing, updatedElement) {
            };

            ReconcilingListView.prototype.beforeDelete = function (oldThing, deletedElement) {
            };

            ReconcilingListView.prototype.afterDelete = function () {
            };

            ReconcilingListView.prototype.clearView = function () {
                _super.prototype.clearView.call(this);
                this.objectsPreviouslyRendered = [];
            };

            ReconcilingListView.prototype.insertBefore = function (newThing, insertBefore) {
                var newElement = this.renderItem(newThing, ReconcilingListView.ListItemClassName);

                if (!insertBefore) {
                    this.listRoot.appendChild(newElement);
                    return;
                }

                var insertBeforeElement = this.listRoot.querySelector("[data-listid='" + insertBefore[this.idPropertyName] + "']");
                if (insertBeforeElement) {
                    this.listRoot.insertBefore(newElement, insertBeforeElement);
                } else {
                    this.listRoot.appendChild(newElement);
                }
            };

            ReconcilingListView.prototype.update = function (newThing, oldThing) {
                var oldElement = this.listRoot.querySelector("[data-listid='" + oldThing[this.idPropertyName] + "']");
                if (oldElement) {
                    this.beforeUpdate(newThing, oldThing, oldElement);
                    var newElementText = this.renderItemText(newThing);
                    oldElement.outerHTML = newElementText;
                    oldElement.classList.add(ReconcilingListView.ListItemClassName);
                    this.afterUpdate(newThing, oldThing, oldElement);
                }
            };

            ReconcilingListView.prototype.deleteItem = function (thingToDelete) {
                var oldElement = this.listRoot.querySelector("[data-listid='" + thingToDelete[this.idPropertyName] + "']");
                if (oldElement) {
                    this.beforeDelete(thingToDelete, oldElement);
                    oldElement.removeNode(true);
                    this.afterDelete();
                }
            };
            ReconcilingListView.ListItemClassName = "BPT-List-Item";
            return ReconcilingListView;
        })(ModelView.ListView);
        ModelView.ReconcilingListView = ReconcilingListView;
    })(Common.ModelView || (Common.ModelView = {}));
    var ModelView = Common.ModelView;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ModelView/reconcilingListView.js.map

// control.ts
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var Control = (function () {
                function Control(root) {
                    this._rootElement = root;

                    if (typeof this._rootElement === "undefined") {
                        this._rootElement = document.createElement("div");
                        this._rootElement.style.width = this._rootElement.style.height = "100%";
                    } else if (this._rootElement === null) {
                        throw new Error("Invalid root element for Control.");
                    }
                }
                Object.defineProperty(Control.prototype, "rootElement", {
                    get: function () {
                        return this._rootElement;
                    },
                    set: function (newRoot) {
                        if (!newRoot) {
                            throw new Error("Invalid root");
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

                Control.prototype.appendChild = function (child) {
                    this._rootElement.appendChild(child.rootElement);
                    child.parent = this;
                };

                Control.prototype.removeChild = function (child) {
                    if (child.rootElement.parentElement) {
                        this._rootElement.removeChild(child.rootElement);
                        child.parent = null;
                    }
                };

                Control.prototype.onParentChanged = function () {
                };
                return Control;
            })();
            Legacy.Control = Control;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/control.js.map

// contentControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
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
                    if (this.rootElement.children.length !== 0) {
                        throw new Error("Only one child is allowed in a content control.");
                    }

                    _super.prototype.appendChild.call(this, child);
                };

                ContentControl.prototype.onContentChanged = function () {
                };
                return ContentControl;
            })(Legacy.Control);
            Legacy.ContentControl = ContentControl;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/contentControl.js.map

// templateControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var TemplateControl = (function (_super) {
                __extends(TemplateControl, _super);
                function TemplateControl(templateName, templateRepository) {
                    _super.call(this);

                    this._idPostfix = TemplateControl.GlobalIdPostfix++;

                    if (templateName) {
                        this.setTemplateFromName(templateName, templateRepository);
                    }
                }
                TemplateControl.prototype.setTemplateFromName = function (templateName, templateRepository) {
                    if (templateRepository) {
                        var htmlContent = templateRepository.getTemplateString(templateName);
                        this.setTemplateFromHTML(htmlContent);
                    } else {
                        var root = this.getTemplateElementCopy(templateName);
                        this.adjustElementIds(root);
                        this.rootElement = root;
                    }
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
                        throw new Error("Couldn't find the template with name: " + templateName);
                    }

                    if (templateElement.tagName.toLowerCase() !== "script") {
                        throw new Error("Expecting the template container to be a script element.");
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
                TemplateControl.GlobalIdPostfix = 1;
                return TemplateControl;
            })(Common.Controls.Legacy.Control);
            Legacy.TemplateControl = TemplateControl;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/templateControl.js.map

// CutCopyPasteContextMenu.ts
var F12;
(function (F12) {
    (function (Tools) {
        (function (Debugger) {
            "use strict";

            var CutCopyPasteContextMenu = (function () {
                function CutCopyPasteContextMenu(element, onModifyCallback) {
                    var _this = this;
                    this._element = element;
                    this._onModifyCallback = onModifyCallback;
                    this._isActive = false;

                    this._element.addEventListener("contextmenu", function (e) {
                        return _this.handleContextMenu(e);
                    });
                    if (this._element instanceof HTMLInputElement) {
                        this._element.addEventListener("keyup", function (e) {
                            return _this.handleKeyUp(e);
                        });
                    }
                }
                Object.defineProperty(CutCopyPasteContextMenu.prototype, "isActive", {
                    get: function () {
                        return this._isActive;
                    },
                    enumerable: true,
                    configurable: true
                });

                CutCopyPasteContextMenu.prototype.show = function (clientX, clientY) {
                    var _this = this;
                    var x = clientX;
                    var y = clientY;

                    var selectedText = "";

                    if (this._element instanceof HTMLInputElement) {
                        var inputElement = this._element;

                        var copyStart = inputElement.selectionStart;
                        var copyEnd = inputElement.selectionEnd;
                        selectedText = inputElement.value.substring(copyStart, copyEnd);

                        if (x <= 0 || y <= 0) {
                            var range = inputElement.createTextRange();
                            range.move("character", copyStart);
                            x = range.offsetLeft;
                            y = range.offsetTop;
                        }
                    } else {
                        var selections = window.getSelection();
                        if (selections.rangeCount === 1) {
                            var selectionRange = selections.getRangeAt(0);
                            if (selectionRange.startContainer.parentNode === this._element && selectionRange.endContainer.parentNode === this._element) {
                                selectedText = selectionRange.toString();
                            }
                        }
                    }

                    var menuItems = [];
                    if (this._element instanceof HTMLInputElement) {
                        menuItems.push({
                            id: "menuInputBoxCut",
                            type: 1 /* command */,
                            label: Plugin.Resources.getString("/Common/CutMenuText"),
                            accessKey: Plugin.Resources.getString("/Common/AccessKeyCtrlX")
                        });
                    }

                    menuItems.push({
                        id: "menuInputBoxCopy",
                        type: 1 /* command */,
                        label: Plugin.Resources.getString("/Common/CopyMenuText"),
                        accessKey: Plugin.Resources.getString("/Common/AccessKeyCtrlC")
                    });

                    if (this._element instanceof HTMLInputElement) {
                        menuItems.push({
                            id: "menuInputBoxPaste",
                            type: 1 /* command */,
                            label: Plugin.Resources.getString("/Common/PasteMenuText"),
                            accessKey: Plugin.Resources.getString("/Common/AccessKeyCtrlV")
                        });
                    }

                    var callback = function (menuId, menuItem, targetId) {
                        _this.invokeContextMenu(menuId, menuItem, selectedText, copyStart, copyEnd);
                    };
                    var contextMenu = Plugin.ContextMenu.create(menuItems, null, null, null, callback);
                    contextMenu.addEventListener("dismiss", function () {
                        contextMenu.dispose();
                        _this._isActive = false;
                    });
                    contextMenu.attach(this._element);
                    this._isActive = true;
                    contextMenu.show(x, y);
                };

                CutCopyPasteContextMenu.prototype.invokeContextMenu = function (menuId, menuItem, selectedText, copyStart, copyEnd) {
                    if (!selectedText) {
                        selectedText = this._element.textContent || this._element.value;
                    }

                    var pasteText = clipboardData.getData("Text");
                    var inputElement = this._element;
                    switch (menuItem.id) {
                        case "menuInputBoxCut":
                            clipboardData.setData("Text", selectedText);

                            inputElement.value = inputElement.value.substring(0, copyStart) + inputElement.value.substring(copyEnd);

                            if (this._onModifyCallback) {
                                this._onModifyCallback();
                            }

                            this._element.focus();

                            inputElement.setSelectionRange(copyStart, copyStart);
                            break;

                        case "menuInputBoxPaste":
                            if (pasteText) {
                                var range = inputElement.createTextRange();
                                range.move("character", copyStart);
                                range.moveEnd("character", copyEnd - copyStart);
                                range.text = pasteText;
                                if (this._onModifyCallback) {
                                    this._onModifyCallback();
                                }

                                this._element.focus();
                                inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
                            }

                            break;

                        case "menuInputBoxCopy":
                            clipboardData.setData("Text", selectedText);
                            this._element.focus();
                            break;
                    }
                };

                CutCopyPasteContextMenu.prototype.handleContextMenu = function (event) {
                    this.show(event.clientX, event.clientY);
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return false;
                };

                CutCopyPasteContextMenu.prototype.handleKeyUp = function (e) {
                    if (e.keyCode === 121 /* F10 */ && e.shiftKey && !e.ctrlKey && !e.altKey) {
                        this.show(0, 0);
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        return false;
                    }
                };
                return CutCopyPasteContextMenu;
            })();
            Debugger.CutCopyPasteContextMenu = CutCopyPasteContextMenu;
        })(Tools.Debugger || (Tools.Debugger = {}));
        var Debugger = Tools.Debugger;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/CutCopyPasteContextMenu.js.map

// listBox.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var ListBoxItem = (function () {
                function ListBoxItem(value, text, info, itemClass) {
                    this.index = -1;
                    this.value = value;
                    this.text = text;
                    this.info = info || "";
                    this.itemClass = itemClass || "";
                }
                return ListBoxItem;
            })();
            Legacy.ListBoxItem = ListBoxItem;

            var ListBox = (function (_super) {
                __extends(ListBox, _super);
                function ListBox(templateName, listItemElementType, listItemElementClass) {
                    var _this = this;
                    _super.call(this, templateName);

                    if (!templateName) {
                        this.setTemplateFromHTML("<ul class=\"listBox\"></ul>");
                    }

                    this.rootElement.setAttribute("tabindex", "0");
                    this.rootElement.setAttribute("role", "listbox");
                    this.rootElement.onkeydown = function (e) {
                        return _this.onKeyDown(e);
                    };

                    this._listItemElementType = listItemElementType || "li";
                    this._listItemElementClass = listItemElementClass || "";
                    this._listItemContainers = [];
                    this._selectedIndex = -1;

                    if (!this.rootElement.id) {
                        this.rootElement.id = ListBox.getUniqueID();
                    }
                }
                Object.defineProperty(ListBox.prototype, "selectedItemChanged", {
                    get: function () {
                        return this._onSelectedItemChanged;
                    },
                    set: function (value) {
                        this._onSelectedItemChanged = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBox.prototype, "selectedIndexChanged", {
                    get: function () {
                        return this._onSelectedIndexChanged;
                    },
                    set: function (value) {
                        this._onSelectedIndexChanged = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBox.prototype, "itemDoubleClicked", {
                    get: function () {
                        return this._onItemDoubleClicked;
                    },
                    set: function (value) {
                        this._onItemDoubleClicked = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBox.prototype, "listItems", {
                    get: function () {
                        return this._listItems;
                    },
                    set: function (value) {
                        this.fireBuildListBoxStartEvent();
                        this.selectedIndex = -1;
                        this._listItems = [];
                        var itemIdx = 0;
                        if (value) {
                            for (; itemIdx < value.length; ++itemIdx) {
                                var item = value[itemIdx];
                                item.index = itemIdx;
                                this._listItems.push(item);

                                if (itemIdx < this._listItemContainers.length) {
                                    this._listItemContainers[itemIdx].item = item;
                                    this._listItemContainers[itemIdx].rootElement.style.display = "list-item";
                                    this._listItemContainers[itemIdx].rootElement.removeAttribute("aria-hidden");
                                } else {
                                    var itemContainer = this.createListItemContainer(item);
                                    this._listItemContainers.push(itemContainer);
                                    this.appendChild(itemContainer);
                                }
                            }
                        }

                        this.resetUnusedItems(itemIdx);
                        this.fireBuildListBoxEndEvent();
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBox.prototype, "listItemHeight", {
                    get: function () {
                        if (typeof this._listItemHeight === "undefined") {
                            if (this.listItems.length > 0) {
                                this._listItemHeight = this._listItemContainers[0].rootElement.offsetHeight;
                            } else {
                                return ListBox.DEFAULT_LIST_ITEM_HEIGHT;
                            }
                        }

                        return this._listItemHeight;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBox.prototype, "itemContainers", {
                    get: function () {
                        return this._listItemContainers;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBox.prototype, "selectedIndex", {
                    get: function () {
                        return this._selectedIndex;
                    },
                    set: function (value) {
                        if (this._selectedIndex !== value) {
                            var oldIdx = this._selectedIndex;
                            this._selectedIndex = value;
                            if (oldIdx >= 0) {
                                var oldItem = this._listItemContainers[oldIdx];
                                oldItem.selected = false;
                            }

                            if (value >= 0 && value < this._listItemContainers.length) {
                                var newItem = this._listItemContainers[value];
                                newItem.selected = true;
                                if (value !== oldIdx) {
                                    if (this._onSelectedIndexChanged) {
                                        this._onSelectedIndexChanged(value);
                                    }

                                    if (this._onSelectedItemChanged) {
                                        this._onSelectedItemChanged(this._listItems[value]);
                                    }
                                }
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBox.prototype, "selectedItem", {
                    get: function () {
                        var i = this.selectedIndex;
                        if (i >= 0) {
                            return this._listItems[i];
                        }

                        return null;
                    },
                    set: function (value) {
                        var oldIdx = this.selectedIndex;
                        var newIdx = this._listItems.indexOf(value);
                        this.selectedIndex = newIdx;
                    },
                    enumerable: true,
                    configurable: true
                });


                ListBox.prototype.scrollIntoView = function (item, alignToTop) {
                    var index = this._listItems.indexOf(item);
                    if (index >= 0) {
                        var itemElement = this._listItemContainers[index].rootElement;
                        var rect = itemElement.getBoundingClientRect();
                        var topLeftCornerElement = document.elementFromPoint(rect.left + 1, rect.top + 1);
                        var bottomRightCornerElement = document.elementFromPoint(rect.right - 1, rect.bottom - 1);

                        if (topLeftCornerElement !== itemElement || bottomRightCornerElement !== itemElement) {
                            this._listItemContainers[index].rootElement.scrollIntoView(alignToTop);
                        }
                    }
                };

                ListBox.prototype.createListItemContainer = function (item) {
                    return new ListBoxItemContainer(this, item, this._listItemElementType, this._listItemElementClass);
                };

                ListBox.prototype.fireBuildListBoxStartEvent = function () {
                };

                ListBox.prototype.fireBuildListBoxEndEvent = function () {
                };

                ListBox.prototype.fireResetListBoxStartEvent = function () {
                };

                ListBox.prototype.fireResetListBoxEndEvent = function () {
                };

                ListBox.getUniqueID = function () {
                    return "Common-Controls-Legacy-ListBox-" + ListBox.CurrentUniqueID++;
                };

                ListBox.prototype.resetUnusedItems = function (startingIndex) {
                    this.fireResetListBoxStartEvent();
                    for (var i = startingIndex; i < this._listItemContainers.length; ++i) {
                        this._listItemContainers[i].rootElement.style.display = "none";
                        this._listItemContainers[i].rootElement.setAttribute("aria-hidden", "true");
                        this._listItemContainers[i].item = null;
                    }

                    this.fireResetListBoxEndEvent();
                };

                ListBox.prototype.onKeyDown = function (e) {
                    var noKeys = !event.shiftKey && !event.ctrlKey && !event.altKey;

                    if (e.keyCode === 38 /* ArrowUp */ && noKeys) {
                        if (this.selectedIndex > 0) {
                            this.selectedIndex--;
                            this.scrollIntoView(this.selectedItem, true);
                        }
                    } else if (e.keyCode === 40 /* ArrowDown */ && noKeys) {
                        if (this.selectedIndex < (this._listItemContainers.length - 1)) {
                            this.selectedIndex++;
                            this.scrollIntoView(this.selectedItem, false);
                        }
                    }
                };
                ListBox.DEFAULT_LIST_ITEM_HEIGHT = 10;
                ListBox.CurrentUniqueID = 0;
                return ListBox;
            })(Legacy.TemplateControl);
            Legacy.ListBox = ListBox;

            var ListBoxItemContainer = (function (_super) {
                __extends(ListBoxItemContainer, _super);
                function ListBoxItemContainer(owner, item, elementType, elementClass) {
                    var _this = this;
                    _super.call(this, document.createElement(elementType));

                    this._owner = owner;
                    this._item = item;

                    this.rootElement.innerText = item.text;
                    this.rootElement.value = item.value;
                    if (item.itemClass && item.itemClass.length > 0) {
                        this.rootElement.classList.add(item.itemClass);
                    }

                    if (elementClass !== "") {
                        this.rootElement.classList.add(elementClass);
                    }

                    this.rootElement.onmouseover = function () {
                        if (_this._item && _this._item.info) {
                            Plugin.Tooltip.show({ content: _this._item.info });
                        }

                        return true;
                    };
                    this.rootElement.setAttribute("role", "option");

                    this.rootElement.onmousedown = function (e) {
                        return _this.onMouseDown(e);
                    };
                    this.rootElement.onclick = function (e) {
                        return _this.onMouseDown(e);
                    };
                    this.rootElement.ondblclick = function (e) {
                        return _this.onDoubleClicked(e);
                    };

                    if (!this.rootElement.getAttribute("id")) {
                        this.rootElement.setAttribute("id", ListBoxItemContainer.getUniqueID());
                    }
                }
                Object.defineProperty(ListBoxItemContainer.prototype, "selectedChanged", {
                    get: function () {
                        return this._onSelectChanged;
                    },
                    set: function (value) {
                        this._onSelectChanged = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBoxItemContainer.prototype, "selected", {
                    get: function () {
                        return this._selected;
                    },
                    set: function (value) {
                        var selectedChanged = value !== this._selected;
                        this._selected = value;
                        if (selectedChanged) {
                            if (value) {
                                this.rootElement.setAttribute("selected", "selected");
                                this.rootElement.setAttribute("aria-selected", "true");
                                this._owner.selectedItem = this._item;
                            } else {
                                this.rootElement.removeAttribute("selected");
                                this.rootElement.removeAttribute("aria-selected");
                            }
                        }

                        if (this._onSelectChanged && selectedChanged) {
                            this._onSelectChanged(value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListBoxItemContainer.prototype, "item", {
                    get: function () {
                        return this._item;
                    },
                    set: function (value) {
                        if (value && typeof value.text === "string") {
                            this._item = value;
                            if (this.rootElement.firstChild) {
                                this.rootElement.firstChild.nodeValue = this._item.text;
                            } else {
                                this.rootElement.innerText = this._item.text;
                            }

                            this.rootElement.setAttribute("aria-label", this._item.text);
                        } else {
                            this._item = null;
                            if (this.rootElement.firstChild) {
                                this.rootElement.firstChild.nodeValue = "";
                            }

                            this.rootElement.removeAttribute("aria-label");
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                ListBoxItemContainer.getUniqueID = function () {
                    return "Common-Controls-Legacy-ListBoxItemContainer-" + ListBoxItemContainer.CurrentUniqueID++;
                };

                ListBoxItemContainer.prototype.onMouseDown = function (e) {
                    this.selected = true;
                    this._owner.rootElement.focus();
                };

                ListBoxItemContainer.prototype.onDoubleClicked = function (e) {
                    this.selected = true;
                    this._owner.rootElement.focus();
                    if (this._owner.itemDoubleClicked) {
                        this._owner.itemDoubleClicked(this._item);
                    }
                };
                ListBoxItemContainer.CurrentUniqueID = 0;

                ListBoxItemContainer.CONTENT_ELEMENT_ID = "content";
                return ListBoxItemContainer;
            })(Legacy.Control);
            Legacy.ListBoxItemContainer = ListBoxItemContainer;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/listBox.js.map

// choiceCommitSource.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";
        (function (ChoiceCommitSource) {
            ChoiceCommitSource[ChoiceCommitSource["Tab"] = 0] = "Tab";
            ChoiceCommitSource[ChoiceCommitSource["Enter"] = 1] = "Enter";
            ChoiceCommitSource[ChoiceCommitSource["DoubleClick"] = 2] = "DoubleClick";
        })(Intellisense.ChoiceCommitSource || (Intellisense.ChoiceCommitSource = {}));
        var ChoiceCommitSource = Intellisense.ChoiceCommitSource;
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/choiceCommitSource.js.map

// intellisenseListBox.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";

        var IntellisenseChoice = (function (_super) {
            __extends(IntellisenseChoice, _super);
            function IntellisenseChoice(optionName, info) {
                _super.call(this, optionName, optionName, info);
            }
            Object.defineProperty(IntellisenseChoice.prototype, "optionName", {
                get: function () {
                    return this.text;
                },
                enumerable: true,
                configurable: true
            });
            return IntellisenseChoice;
        })(Common.Controls.Legacy.ListBoxItem);
        Intellisense.IntellisenseChoice = IntellisenseChoice;

        var IntellisenseListBox = (function (_super) {
            __extends(IntellisenseListBox, _super);
            function IntellisenseListBox(templateName, listItemElementType, listItemElementClass, traceProvider) {
                var _this = this;
                _super.call(this, templateName, listItemElementType, listItemElementClass || "intellisenseListBoxItem");
                this.itemDoubleClicked = function (item) {
                    return _this.optionDoubleClicked(item);
                };
                this._traceProvider = traceProvider;
                this._currentEtwKey = -1;
            }
            Object.defineProperty(IntellisenseListBox.prototype, "intellisenseChoiceSelected", {
                get: function () {
                    return this._intellisenseChoiceSelected;
                },
                set: function (value) {
                    this._intellisenseChoiceSelected = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseListBox.prototype, "currentEtwKey", {
                get: function () {
                    return this._currentEtwKey;
                },
                set: function (key) {
                    this._currentEtwKey = key;
                },
                enumerable: true,
                configurable: true
            });

            IntellisenseListBox.prototype.optionDoubleClicked = function (intellisenseChoice) {
                if (this._intellisenseChoiceSelected) {
                    this._intellisenseChoiceSelected(intellisenseChoice, 2 /* DoubleClick */);
                }
            };

            IntellisenseListBox.prototype.fireBuildListBoxStartEvent = function () {
                if (this._traceProvider) {
                    this._traceProvider.fireBuildListBoxStartEvent(this.currentEtwKey);
                }
            };

            IntellisenseListBox.prototype.fireBuildListBoxEndEvent = function () {
                if (this._traceProvider) {
                    this._traceProvider.fireBuildListBoxEndEvent(this.currentEtwKey);
                }
            };

            IntellisenseListBox.prototype.fireResetListBoxStartEvent = function () {
                if (this._traceProvider) {
                    this._traceProvider.fireResetListBoxStartEvent(this.currentEtwKey);
                }
            };

            IntellisenseListBox.prototype.fireResetListBoxEndEvent = function () {
                if (this._traceProvider) {
                    this._traceProvider.fireResetListBoxEndEvent(this.currentEtwKey);
                }
            };
            return IntellisenseListBox;
        })(Common.Controls.Legacy.ListBox);
        Intellisense.IntellisenseListBox = IntellisenseListBox;
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/intellisenseListBox.js.map

// IntellisenseContext.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";
        var IntellisenseContext = (function () {
            function IntellisenseContext(textEditorBridge, intellisenseMenu, intellisenseProvider, events) {
                this._textEditorBridge = textEditorBridge;
                this._intellisenseMenu = intellisenseMenu;
                this._intellisenseProvider = intellisenseProvider;
                this._isInitialized = false;
                this._deactivationHandler = this.uninitialize.bind(this);
                this._events = events;

                if (this._events) {
                    this._events.addEventListener("deactivated", this._deactivationHandler);
                }
            }
            Object.defineProperty(IntellisenseContext.prototype, "textEditorBridge", {
                get: function () {
                    return this._textEditorBridge;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IntellisenseContext.prototype, "intellisenseMenu", {
                get: function () {
                    return this._intellisenseMenu;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IntellisenseContext.prototype, "intellisenseProvider", {
                get: function () {
                    return this._intellisenseProvider;
                },
                enumerable: true,
                configurable: true
            });

            IntellisenseContext.prototype.initialize = function (target) {
                if (this._isInitialized) {
                    return;
                }

                this.textEditorBridge.attach(target);
                this.intellisenseMenu.attach(this.textEditorBridge);
                this.intellisenseProvider.attach(this);

                this._isInitialized = true;
            };

            IntellisenseContext.prototype.uninitialize = function () {
                if (!this._isInitialized) {
                    return;
                }

                this._isInitialized = false;
                if (this._events) {
                    this._events.removeEventListener("deactivated", this._deactivationHandler);
                }

                this.intellisenseProvider.detach();
                this.intellisenseMenu.detach();
                this.textEditorBridge.detach();
            };
            return IntellisenseContext;
        })();
        Intellisense.IntellisenseContext = IntellisenseContext;
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/IntellisenseContext.js.map

// inputElementTextEditorBridge.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";

        var InputElementTextEditorBridge = (function () {
            function InputElementTextEditorBridge() {
                var _this = this;
                this._lastSelectionLength = -1;
                this._lastCaretPosition = -1;
                this._timerFunction = function () {
                    return _this.timer_elapsed();
                };
            }
            Object.defineProperty(InputElementTextEditorBridge.prototype, "onTextChanged", {
                get: function () {
                    return this._onTextChanged;
                },
                set: function (value) {
                    this._onTextChanged = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(InputElementTextEditorBridge.prototype, "onCaptureKeyDown", {
                get: function () {
                    return this._onCaptureKeyDown;
                },
                set: function (value) {
                    this._onCaptureKeyDown = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(InputElementTextEditorBridge.prototype, "onBlur", {
                get: function () {
                    return this._onBlur;
                },
                set: function (value) {
                    this._onBlur = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(InputElementTextEditorBridge.prototype, "onCaretPositionChanged", {
                get: function () {
                    return this._onCaretPositionChanged;
                },
                set: function (value) {
                    this._onCaretPositionChanged = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(InputElementTextEditorBridge.prototype, "onSelectionLengthChanged", {
                get: function () {
                    return this._onSelectionLengthChanged;
                },
                set: function (value) {
                    this._onSelectionLengthChanged = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(InputElementTextEditorBridge.prototype, "onMenuRequested", {
                get: function () {
                    return this._onMenuRequested;
                },
                set: function (value) {
                    this._onMenuRequested = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(InputElementTextEditorBridge.prototype, "caretPosition", {
                get: function () {
                    if (this._editor) {
                        try  {
                            return this._editor.selectionEnd;
                        } catch (ex) {
                            return -1;
                        }
                    }

                    return -1;
                },
                set: function (value) {
                    if (this._editor && Common.ToolWindowHelpers.nodeInDocument(this._editor)) {
                        var valueChanged = this.caretPosition !== value;

                        this._editor.setSelectionRange(value, value);

                        if (valueChanged) {
                            this.fireCaretPositionChanged();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(InputElementTextEditorBridge.prototype, "selectionLength", {
                get: function () {
                    if (this._editor) {
                        try  {
                            return this._editor.selectionEnd - this._editor.selectionStart;
                        } catch (ex) {
                            return -1;
                        }
                    }

                    return -1;
                },
                set: function (value) {
                    if (this._editor && Common.ToolWindowHelpers.nodeInDocument(this._editor)) {
                        this._editor.setSelectionRange(this._editor.selectionStart, this._editor.selectionStart + value);

                        var valueChanged = this._lastSelectionLength !== this.selectionLength;
                        this._lastSelectionLength = this.selectionLength;

                        if (valueChanged) {
                            this.fireSelectionLengthChanged();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(InputElementTextEditorBridge.prototype, "text", {
                get: function () {
                    if (this._editor) {
                        return this._editor.value;
                    }

                    return null;
                },
                set: function (value) {
                    if (this._editor) {
                        this._editor.value = value;
                    }
                },
                enumerable: true,
                configurable: true
            });


            InputElementTextEditorBridge.prototype.getPlacementTarget = function (index) {
                if (this._editor) {
                    if (!this._lastPlacementTarget || this._lastPlacementTargetIndex !== index) {
                        var range = this._editor.createTextRange();

                        range.move("textedit", -1);
                        range.move("character", index);
                        this._lastPlacementTarget = range.getBoundingClientRect();
                        this._lastPlacementTargetIndex = index;

                        var editorRect = this._editor.getBoundingClientRect();
                        if (this._lastPlacementTarget.right < editorRect.left || this._lastPlacementTarget.right > editorRect.right || this._lastPlacementTarget.top < editorRect.top || this._lastPlacementTarget.bottom > editorRect.bottom) {
                            var top = Math.max(this._lastPlacementTarget.top, editorRect.top);
                            var bottom = Math.min(this._lastPlacementTarget.bottom, editorRect.bottom);
                            var xPos = Math.max(Math.min(this._lastPlacementTarget.right, editorRect.right), editorRect.left);
                            this._lastPlacementTarget = {
                                top: top,
                                bottom: bottom,
                                right: xPos,
                                left: xPos,
                                height: bottom - top,
                                width: 0
                            };
                        }
                    }

                    return this._lastPlacementTarget;
                }

                return null;
            };

            InputElementTextEditorBridge.prototype.attach = function (textEditor) {
                var _this = this;
                this._editor = InputElementTextEditorBridge.validateTextEditorElement(textEditor);
                if (this._editor) {
                    this._isAttached = true;

                    this._inputHandler = function (event) {
                        _this.editor_input(event);
                    };
                    this._editor.addEventListener("input", this._inputHandler);

                    this._blurHandler = function (focusEvent) {
                        _this.editor_blur(focusEvent);
                    };
                    this._editor.addEventListener("blur", this._blurHandler);

                    this._focusHandler = function (focusEvent) {
                        _this.editor_focus(focusEvent);
                    };
                    this._editor.addEventListener("focus", this._focusHandler);

                    this._captureKeyDownHandler = function (e) {
                        _this.editor_captureKeyDown(e);
                    };
                    this._editor.addEventListener("keydown", this._captureKeyDownHandler, true);

                    this._editor.setAttribute("aria-autocomplete", "list");
                    this._editor.setAttribute("aria-haspopup", "true");

                    if (document.activeElement === this._editor) {
                        this.startTimer();
                    }

                    return true;
                }

                return false;
            };

            InputElementTextEditorBridge.prototype.detach = function () {
                if (!this._isAttached) {
                    return;
                }

                this._isAttached = false;

                if (this._editor) {
                    this._editor.onselect = null;
                    this._editor.removeEventListener("input", this._inputHandler);
                    this._editor.removeEventListener("blur", this._blurHandler);
                    this._editor.removeEventListener("focus", this._focusHandler);
                    this._editor.removeEventListener("keydown", this._captureKeyDownHandler, true);
                    this._inputHandler = null;
                    this._blurHandler = null;
                    this._focusHandler = null;
                    this._captureKeyDownHandler = null;
                    this._editor.removeAttribute("aria-autocomplete");
                    this._editor.removeAttribute("aria-haspopup");
                    this._editor = null;
                }

                this.fireOnBlur();
            };

            InputElementTextEditorBridge.prototype.insertText = function (startPos, endPos, text) {
                var range = this._editor.createTextRange();
                var useUndo = range.queryCommandSupported("ms-beginUndoUnit");
                if (useUndo) {
                    range.execCommand("ms-beginUndoUnit");
                }

                range.move("character", startPos);
                range.moveEnd("character", endPos - startPos);
                range.text = text;

                this.caretPosition = startPos + text.length;

                if (useUndo) {
                    range.execCommand("ms-endUndoUnit");
                }
            };

            InputElementTextEditorBridge.prototype.setActiveDescendant = function (id) {
                if (id) {
                    this._editor.setAttribute("aria-activedescendant", id);
                } else {
                    this._editor.removeAttribute("aria-activedescendant");
                }
            };

            InputElementTextEditorBridge.prototype.setListBox = function (id) {
                if (id) {
                    this._editor.setAttribute("aria-controls", id);
                } else {
                    this._editor.removeAttribute("aria-controls");
                }
            };

            InputElementTextEditorBridge.prototype.focusEditor = function () {
                this._editor.focus();
            };

            InputElementTextEditorBridge.validateTextEditorElement = function (textEditor) {
                var textEditorElement = textEditor;

                var textEditorInterface = textEditorElement;
                if (typeof (textEditorInterface.createTextRange) === "undefined" || typeof (textEditorInterface.selectionStart) === "undefined" || typeof (textEditorInterface.selectionEnd) === "undefined" || typeof (textEditorInterface.setSelectionRange) === "undefined" || typeof (textEditorInterface.value) === "undefined") {
                    return null;
                }

                return textEditorElement;
            };

            InputElementTextEditorBridge.prototype.startTimer = function () {
                if (!this._timerActivated) {
                    this._timerId = window.setInterval(this._timerFunction, InputElementTextEditorBridge.TIMER_INTERVAL);
                    this._timerActivated = true;
                }
            };

            InputElementTextEditorBridge.prototype.resetTimer = function () {
                if (this._timerActivated) {
                    this.stopTimer();
                    this.startTimer();
                }
            };

            InputElementTextEditorBridge.prototype.stopTimer = function () {
                if (this._timerActivated) {
                    this._timerActivated = false;
                    window.clearInterval(this._timerId);
                }
            };

            InputElementTextEditorBridge.prototype.timer_elapsed = function () {
                if (this._lastCaretPosition !== this.caretPosition || this._lastSelectionLength !== this.selectionLength) {
                    this.stopTimer();
                    if (this._isAttached) {
                        if (this._lastCaretPosition !== this.caretPosition) {
                            this.fireCaretPositionChanged();
                            this._lastCaretPosition = this.caretPosition;
                        }

                        if (this._lastSelectionLength !== this.selectionLength) {
                            this.fireSelectionLengthChanged();
                            this._lastSelectionLength = this.selectionLength;
                        }
                    }

                    this.startTimer();
                }
            };

            InputElementTextEditorBridge.prototype.editor_input = function (event) {
                this.fireTextChanged();
            };

            InputElementTextEditorBridge.prototype.editor_captureKeyDown = function (keyEvent) {
                if (keyEvent.keyCode === 32 /* Space */ && keyEvent.ctrlKey) {
                    this.fireMenuRequested();
                    keyEvent.preventDefault();
                    return;
                }

                if (this._onCaptureKeyDown) {
                    this._onCaptureKeyDown(keyEvent);
                }
            };

            InputElementTextEditorBridge.prototype.editor_blur = function (focusEvent) {
                this.fireOnBlur();
            };

            InputElementTextEditorBridge.prototype.editor_focus = function (focusEvent) {
                this.startTimer();
            };

            InputElementTextEditorBridge.prototype.fireOnBlur = function () {
                this.stopTimer();
                this._lastPlacementTarget = null;

                if (this._onBlur) {
                    this._onBlur();
                }
            };

            InputElementTextEditorBridge.prototype.fireTextChanged = function () {
                this._lastCaretPosition = this.caretPosition;
                this._lastPlacementTarget = null;
                if (this._onTextChanged) {
                    this._onTextChanged(this._editor.value);
                }

                this.resetTimer();
            };

            InputElementTextEditorBridge.prototype.fireCaretPositionChanged = function () {
                this._lastPlacementTarget = null;
                if (this._onCaretPositionChanged) {
                    this._onCaretPositionChanged(this.caretPosition);
                }
            };

            InputElementTextEditorBridge.prototype.fireSelectionLengthChanged = function () {
                if (this._onSelectionLengthChanged) {
                    this._onSelectionLengthChanged(this.selectionLength);
                }
            };

            InputElementTextEditorBridge.prototype.fireMenuRequested = function () {
                if (this._onMenuRequested) {
                    this._onMenuRequested();
                }
            };
            InputElementTextEditorBridge.TIMER_INTERVAL = 100;
            return InputElementTextEditorBridge;
        })();
        Intellisense.InputElementTextEditorBridge = InputElementTextEditorBridge;
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/inputElementTextEditorBridge.js.map

// intellisenseMenu.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";

        var IntellisenseMenu = (function () {
            function IntellisenseMenu(listBoxTemplateName, listItemElementType, listItemElementClass, maxMenuItems, autoSuppressMenu, menuTraceProvider, listBoxTraceProvider) {
                var _this = this;
                this._listBox = new Intellisense.IntellisenseListBox(listBoxTemplateName, listItemElementType, listItemElementClass, listBoxTraceProvider);
                this._listBox.rootElement.style.position = "absolute";
                this._listBox.rootElement.style.display = "none";
                this._isAttached = false;
                this._placementTargetIndex = 0;
                this._isDeferringLayout = false;
                this._suppressMenu = false;
                this._alreadyForcedOpen = false;
                this._ignoreCommit = false;
                this._willMenuBeOpen = false;
                if (maxMenuItems) {
                    this._maxMenuItems = maxMenuItems;
                } else {
                    this._maxMenuItems = IntellisenseMenu.MAX_MENU_ITEMS;
                }

                this._resizeListener = function () {
                    _this._resizeListenerHasFired = true;
                    _this._windowInnerHeight = window.innerHeight;
                    _this._windowInnerWidth = window.innerWidth;
                    _this._toolbarOffsetHeight = 0;
                    _this._listBoxOffsetWidthIsStale = true;
                    _this._listBoxOffsetHeightIsStale = true;

                    var toolbarElement = document.getElementById("toolbar");
                    if (toolbarElement) {
                        _this._toolbarOffsetHeight = toolbarElement.offsetHeight;
                    }
                };
                this._resizeListenerHasFired = false;
                window.addEventListener("resize", this._resizeListener);

                this._autoSuppressMenuEnabled = autoSuppressMenu ? true : false;
                this._traceProvider = menuTraceProvider;
                this._currentEtwKey = -1;
            }
            Object.defineProperty(IntellisenseMenu.prototype, "placementTargetIndex", {
                get: function () {
                    return this._placementTargetIndex;
                },
                set: function (value) {
                    this._placementTargetIndex = value;
                    this._lastTextEditorPlacementTarget = null;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(IntellisenseMenu.prototype, "currentEtwKey", {
                get: function () {
                    return this._currentEtwKey;
                },
                set: function (key) {
                    this._currentEtwKey = key;
                    this._listBox.currentEtwKey = key;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "isOpen", {
                get: function () {
                    return this._isAttached;
                },
                set: function (value) {
                    this._willMenuBeOpen = value;
                    if (value !== this.isOpen) {
                        if (value && !this.suppressMenu) {
                            this.show();
                        } else {
                            this.hide();
                            this._alreadyForcedOpen = false;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(IntellisenseMenu.prototype, "hasSelection", {
                get: function () {
                    return this.isOpen && !this.isDeferringLayout && !this._ignoreCommit && !!this._selectedOption;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "currentSelection", {
                get: function () {
                    return this._selectedOption;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "intellisenseChoices", {
                get: function () {
                    if (this._listBox) {
                        return this._options;
                    }

                    return [];
                },
                set: function (value) {
                    this._options = value;
                    this._filteredOptions = value;
                    this._selectedOption = null;
                    this.listBoxListItems = null;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(IntellisenseMenu.prototype, "filteredIntellisenseChoices", {
                get: function () {
                    return this._filteredOptions;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IntellisenseMenu.prototype, "willIntellisenseMenuBeOpen", {
                get: function () {
                    return this._willMenuBeOpen;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "menuListBox", {
                get: function () {
                    return this._listBox;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "onClosing", {
                get: function () {
                    return this._onClosing;
                },
                set: function (value) {
                    this._onClosing = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "onOpened", {
                get: function () {
                    return this._onOpened;
                },
                set: function (value) {
                    this._onOpened = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "onChoiceCommitted", {
                get: function () {
                    return this._onChoiceCommitted;
                },
                set: function (value) {
                    this._onChoiceCommitted = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "onSelectionChanged", {
                get: function () {
                    return this._onSelectionChanged;
                },
                set: function (value) {
                    this._onSelectionChanged = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "forbiddenBottomLeftRect", {
                get: function () {
                    return this._forbiddenBottomLeftRect;
                },
                set: function (value) {
                    this._forbiddenBottomLeftRect = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "suppressMenu", {
                get: function () {
                    return this._suppressMenu && this._autoSuppressMenuEnabled;
                },
                set: function (value) {
                    this._suppressMenu = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(IntellisenseMenu.prototype, "isDeferringLayout", {
                get: function () {
                    return this._isDeferringLayout;
                },
                set: function (value) {
                    if (value) {
                        this.stopDeferredRenderTimer();
                        this.startDeferredRenderTimer();
                    } else {
                        this.stopDeferredRenderTimer();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "listBoxListItems", {
                get: function () {
                    return this._listBox.listItems;
                },
                set: function (items) {
                    this._listBox.listItems = items;

                    this._listBoxOffsetWidthIsStale = true;
                    this._listBoxOffsetHeightIsStale = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(IntellisenseMenu.prototype, "listBoxOffsetWidth", {
                get: function () {
                    if (this._listBoxOffsetWidthIsStale) {
                        this._listBoxOffsetWidth = this._listBox.rootElement.offsetWidth;
                        this._listBoxOffsetWidthIsStale = false;
                    }

                    return this._listBoxOffsetWidth;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseMenu.prototype, "listBoxOffsetHeight", {
                get: function () {
                    if (this._listBoxOffsetHeightIsStale) {
                        this._listBoxOffsetHeight = this._listBox.rootElement.offsetHeight;
                        this._listBoxOffsetHeightIsStale = false;
                    }

                    return this._listBoxOffsetHeight;
                },
                enumerable: true,
                configurable: true
            });

            IntellisenseMenu.prototype.forceOpen = function () {
                if (this._filteredOptions && this._filteredOptions.length > 0) {
                    this.suppressMenu = false;
                    this.isOpen = true;
                    this.listBoxListItems = this._filteredOptions;
                    this.isDeferringLayout = false;
                    this.updateLayout(!this._alreadyForcedOpen);
                    this.updateListBoxSelection();
                    this._alreadyForcedOpen = true;
                }
            };

            IntellisenseMenu.prototype.attach = function (textEditorBridge) {
                var _this = this;
                if (!this._textEditorBridge) {
                    document.body.appendChild(this._listBox.rootElement);
                    this._textEditorBridge = textEditorBridge;
                    this._textEditorBridge.onBlur = function () {
                        return _this.textEditorBridge_blur();
                    };
                }

                this._textEditorBridge.setListBox(this._listBox.rootElement.id);
            };

            IntellisenseMenu.prototype.detach = function () {
                if (this._textEditorBridge) {
                    this.isOpen = false;
                    this._textEditorBridge.onBlur = null;
                    this._textEditorBridge.setListBox(null);
                    this._textEditorBridge = null;
                    document.body.removeChild(this._listBox.rootElement);
                }
            };

            IntellisenseMenu.prototype.setFilter = function (filter) {
                var _this = this;
                this.fireSetFilterStartEvent();
                this._selectedOption = this.setFilterInternal(filter);
                this.fireSetFilterEndEvent();

                if (this._filteredOptions.length > this._maxMenuItems) {
                    this._willMenuBeOpen = true;
                    this.isDeferringLayout = true;
                    return;
                } else if (this._filteredOptions.length === 1 && this._selectedOption && this._selectedOption.text === filter) {
                    this._willMenuBeOpen = false;
                    window.setImmediate(function () {
                        return _this.isOpen = false;
                    });
                    return;
                }

                this._willMenuBeOpen = true;
                this.listBoxListItems = this._filteredOptions;
                this.updateLayout(this.isDeferringLayout);
                this.isDeferringLayout = false;

                this.updateListBoxSelection();
            };

            IntellisenseMenu.prototype.getTextEditorPlacementTarget = function (updateFromEditorBridge) {
                if (!this._lastTextEditorPlacementTarget || updateFromEditorBridge) {
                    this._lastTextEditorPlacementTarget = this._textEditorBridge.getPlacementTarget(this.placementTargetIndex);
                }

                return this._lastTextEditorPlacementTarget;
            };

            IntellisenseMenu.prototype.startDeferredRenderTimer = function () {
                var _this = this;
                if (!this._isDeferringLayout) {
                    var etwKey = this.currentEtwKey;
                    this._deferredRenderTimerId = window.setTimeout(function () {
                        return _this.deferredRenderTimer_elapsed(etwKey);
                    }, IntellisenseMenu.DEFERRED_RENDER_TIMER_INTERVAL);
                    this._ignoreCommit = true;
                    this._isDeferringLayout = true;
                }
            };

            IntellisenseMenu.prototype.stopDeferredRenderTimer = function () {
                if (this._isDeferringLayout) {
                    this._ignoreCommit = false;
                    this._isDeferringLayout = false;
                    window.clearTimeout(this._deferredRenderTimerId);
                }
            };

            IntellisenseMenu.prototype.deferredRenderTimer_elapsed = function (etwKey) {
                var _this = this;
                this._isDeferringLayout = false;
                this.currentEtwKey = etwKey;
                if (this.isOpen) {
                    this.forceOpen();
                    window.setTimeout(function () {
                        return _this._ignoreCommit = false;
                    }, IntellisenseMenu.DEFERRED_RENDER_TIMER_INTERVAL);
                }
            };

            IntellisenseMenu.prototype.updateListBoxSelection = function () {
                if (this._selectedOption) {
                    this._listBox.selectedItem = this._selectedOption;
                    this._listBox.scrollIntoView(this._selectedOption, false);
                } else if (this.listBoxListItems.length > 0) {
                    this._listBox.selectedIndex = -1;
                    this._listBox.scrollIntoView(this.listBoxListItems[0], false);
                }
            };

            IntellisenseMenu.prototype.setFilterInternal = function (filter) {
                if (filter && filter.length > 0 && this._options) {
                    var upperCaseFilter = filter.toUpperCase();
                    var filteredItems = this._options.filter(function (value, index, array) {
                        return value.optionName.toUpperCase().indexOf(upperCaseFilter) !== -1;
                    }, this);

                    if (filteredItems.length === 0) {
                        filteredItems = this._options.filter(function (value, index, array) {
                            var upperCaseOption = value.optionName.toUpperCase();

                            return upperCaseOption.indexOf(upperCaseFilter) !== -1 || upperCaseFilter.indexOf(upperCaseOption) === 0;
                        }, this);
                    }

                    if (filteredItems.length > 0) {
                        this._filteredOptions = filteredItems;

                        var matchingOptionIndex = this.getMatchingOption(filteredItems, filter, true);
                        if (matchingOptionIndex < 0) {
                            matchingOptionIndex = this.getMatchingOption(filteredItems, filter, false);
                            if (matchingOptionIndex < 0) {
                                return null;
                            }
                        }

                        return this._filteredOptions[matchingOptionIndex];
                    }
                } else {
                    this._filteredOptions = this._options;
                }

                return null;
            };

            IntellisenseMenu.prototype.getMatchingOption = function (items, filter, caseSensitive) {
                var testString = caseSensitive ? filter : filter.toUpperCase();
                for (var i = 0; i < items.length; ++i) {
                    var optionName = caseSensitive ? items[i].optionName : items[i].optionName.toUpperCase();
                    if (optionName.indexOf(testString) === 0) {
                        return i;
                    }
                }

                return -1;
            };

            IntellisenseMenu.prototype.textEditorBridge_blur = function () {
                if (document.activeElement !== this._listBox.rootElement) {
                    this.hide();
                } else if (document.activeElement === this._listBox.rootElement) {
                    this._textEditorBridge.focusEditor();
                }
            };

            IntellisenseMenu.prototype.updateLayout = function (setHorizontal) {
                if (!this.isOpen || !this.listBoxListItems || this.listBoxListItems.length === 0) {
                    return;
                }

                this.fireUpdateLayoutStartEvent();
                var oldLeft = this._listBox.rootElement.style.left;

                if (!this._resizeListenerHasFired) {
                    this._resizeListener();
                }

                var target = this.getTextEditorPlacementTarget(setHorizontal);
                var x = target.right;
                var y = target.bottom;

                this._listBox.rootElement.style.display = "block";
                this._listBox.rootElement.style.top = "0";
                this._listBox.rootElement.style.left = "0";
                this._listBox.rootElement.style.width = "";
                this._listBox.rootElement.style.minWidth = IntellisenseMenu.MIN_MENU_WIDTH + "px";
                this._listBox.rootElement.style.maxHeight = IntellisenseMenu.MAX_MENU_HEIGHT + "px";

                var offsetHeight = this.listBoxOffsetHeight;
                var offsetWidth = this.listBoxOffsetWidth;

                var leftLimit = 0;
                if (this._forbiddenBottomLeftRect) {
                    leftLimit = (this._forbiddenBottomLeftRect.top - y) < offsetHeight ? this._forbiddenBottomLeftRect.width : 0;
                }

                var bottomHeight = this._windowInnerHeight - y - 2;
                if (target.top > bottomHeight) {
                    y = target.top - offsetHeight;
                    if (y < this._toolbarOffsetHeight) {
                        y = Math.max(target.top - IntellisenseMenu.MAX_MENU_HEIGHT, this._toolbarOffsetHeight);
                        var maxHeight = target.top - y;
                        this._listBox.rootElement.style.top = y + "px";
                        this._listBox.rootElement.style.maxHeight = maxHeight + "px";
                    } else {
                        this._listBox.rootElement.style.top = y + "px";
                    }
                } else {
                    this._listBox.rootElement.style.top = y + "px";
                    if (bottomHeight < IntellisenseMenu.MAX_MENU_HEIGHT) {
                        this._listBox.rootElement.style.maxHeight = bottomHeight + "px";
                    }
                }

                if (x + offsetWidth < this._windowInnerWidth) {
                    this._listBox.rootElement.style.left = x + "px";
                } else if (x - offsetWidth > leftLimit) {
                    this._listBox.rootElement.style.left = (x - offsetWidth) + "px";
                } else {
                    var left = Math.max(this._windowInnerWidth - offsetWidth, leftLimit);
                    var right = Math.min(left + offsetWidth, this._windowInnerWidth);
                    this._listBox.rootElement.style.left = left + "px";
                    this._listBox.rootElement.style.width = (right - left) + "px";
                    this._listBox.rootElement.style.minWidth = "";
                }

                if (this._listBox.selectedItem) {
                    this._listBox.scrollIntoView(this._listBox.selectedItem, false);
                }

                this.fireUpdateLayoutEndEvent();
            };

            IntellisenseMenu.prototype.show = function () {
                var _this = this;
                if (this._isAttached) {
                    return;
                }

                this._isAttached = true;
                this.suppressMenu = false;

                this.updateLayout(true);

                this._listBox.intellisenseChoiceSelected = function (intellisenseChoice, choiceCommitSource) {
                    return _this.listBox_intellisenseChoiceSelected(intellisenseChoice, choiceCommitSource);
                };
                this._listBox.selectedItemChanged = function (newItem) {
                    return _this.listBox_selectedItemChanged(newItem);
                };
                this._textEditorBridge.onCaptureKeyDown = function (keyEvent) {
                    return _this.editor_captureKeyDown(keyEvent);
                };

                this._listBox.rootElement.setAttribute("aria-expanded", "true");

                if (this._listBox.selectedItem) {
                    this.listBox_selectedItemChanged(this._listBox.selectedItem);
                }

                if (this._onOpened) {
                    this._onOpened();
                }
            };

            IntellisenseMenu.prototype.hide = function () {
                if (!this._isAttached) {
                    return;
                }

                this._isAttached = false;
                this._willMenuBeOpen = false;

                if (this._onClosing) {
                    this._onClosing();
                }

                this._textEditorBridge.setActiveDescendant(null);

                this._listBox.intellisenseChoiceSelected = null;
                this._listBox.selectedItemChanged = null;
                this._textEditorBridge.onCaptureKeyDown = null;

                this._listBox.rootElement.style.display = "none";
                this._listBox.rootElement.removeAttribute("aria-expanded");
            };

            IntellisenseMenu.prototype.listBox_intellisenseChoiceSelected = function (intellisenseChoice, commitSource) {
                this.fireValueCommitted(intellisenseChoice, commitSource);
            };

            IntellisenseMenu.prototype.listBox_selectedItemChanged = function (newItem) {
                if (newItem) {
                    this._selectedOption = newItem;
                    this._textEditorBridge.setActiveDescendant(this._listBox.itemContainers[newItem.index].rootElement.id);
                    if (this._onSelectionChanged) {
                        this._onSelectionChanged(newItem);
                    }
                }
            };

            IntellisenseMenu.prototype.calculateListPageSize = function () {
                return Math.round(this.listBoxOffsetHeight / this._listBox.listItemHeight);
            };

            IntellisenseMenu.prototype.setListBoxSelectedIndex = function (index, alignSelectedItemToTop) {
                index = Math.max(0, Math.min(this.listBoxListItems.length - 1, index));
                this._listBox.selectedIndex = index;
                this._listBox.scrollIntoView(this._listBox.selectedItem, alignSelectedItemToTop);
            };

            IntellisenseMenu.prototype.editor_captureKeyDown = function (keyEvent) {
                if (this.isDeferringLayout) {
                    return;
                }

                if (keyEvent.keyCode === 38 /* ArrowUp */) {
                    this.setListBoxSelectedIndex(this._listBox.selectedIndex - 1, true);
                    keyEvent.stopImmediatePropagation();
                    keyEvent.preventDefault();
                    return;
                } else if (keyEvent.keyCode === 40 /* ArrowDown */) {
                    this.setListBoxSelectedIndex(this._listBox.selectedIndex + 1, false);
                    keyEvent.stopImmediatePropagation();
                    keyEvent.preventDefault();
                    return;
                } else if (keyEvent.keyCode === 33 /* PageUp */) {
                    var indexOffset = this.calculateListPageSize();
                    this.setListBoxSelectedIndex(this._listBox.selectedIndex - indexOffset, true);
                    keyEvent.stopImmediatePropagation();
                    keyEvent.preventDefault();
                    return;
                } else if (keyEvent.keyCode === 34 /* PageDown */) {
                    var indexOffset = this.calculateListPageSize();
                    this.setListBoxSelectedIndex(this._listBox.selectedIndex + indexOffset, false);
                    keyEvent.stopImmediatePropagation();
                    keyEvent.preventDefault();
                    return;
                } else if (keyEvent.keyCode === 13 /* Enter */) {
                    if (this.fireSelectedValueCommitted(1 /* Enter */)) {
                        keyEvent.stopImmediatePropagation();
                        keyEvent.preventDefault();
                    }

                    return;
                } else if (keyEvent.keyCode === 9 /* Tab */) {
                    if (this.fireSelectedValueCommitted(0 /* Tab */)) {
                        keyEvent.stopImmediatePropagation();
                        keyEvent.preventDefault();
                    }

                    return;
                } else if (keyEvent.keyCode === 32 /* Space */) {
                    this.hide();
                    return;
                } else if (keyEvent.keyCode === 27 /* Escape */) {
                    this.hide();
                    keyEvent.preventDefault();
                    keyEvent.stopImmediatePropagation();
                    this.suppressMenu = true;
                    return;
                }
            };

            IntellisenseMenu.prototype.fireValueCommitted = function (intellisenseChoice, commitSource) {
                if (this._onChoiceCommitted && intellisenseChoice) {
                    this._onChoiceCommitted(intellisenseChoice, commitSource);
                    return true;
                }

                return false;
            };

            IntellisenseMenu.prototype.fireSelectedValueCommitted = function (commitSource) {
                if (this._listBox && this._listBox.selectedItem !== null) {
                    return this.fireValueCommitted(this._listBox.selectedItem, commitSource);
                }

                return false;
            };

            IntellisenseMenu.prototype.fireSetFilterStartEvent = function () {
                if (this._traceProvider) {
                    this._traceProvider.fireSetFilterStartEvent(this.currentEtwKey);
                }
            };

            IntellisenseMenu.prototype.fireSetFilterEndEvent = function () {
                if (this._traceProvider) {
                    this._traceProvider.fireSetFilterEndEvent(this.currentEtwKey);
                }
            };

            IntellisenseMenu.prototype.fireUpdateLayoutStartEvent = function () {
                if (this._traceProvider) {
                    this._traceProvider.fireUpdateLayoutStartEvent(this.currentEtwKey);
                }
            };

            IntellisenseMenu.prototype.fireUpdateLayoutEndEvent = function () {
                if (this._traceProvider) {
                    this._traceProvider.fireUpdateLayoutEndEvent(this.currentEtwKey);
                }
            };
            IntellisenseMenu.MAX_MENU_HEIGHT = 300;
            IntellisenseMenu.MIN_MENU_WIDTH = 200;
            IntellisenseMenu.MAX_MENU_ITEMS = 50;
            IntellisenseMenu.DEFERRED_RENDER_TIMER_INTERVAL = 200;
            return IntellisenseMenu;
        })();
        Intellisense.IntellisenseMenu = IntellisenseMenu;
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/intellisenseMenu.js.map

// intellisenseProviderBase.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";

        var GetIntellisenseChoicesCancelToken = (function () {
            function GetIntellisenseChoicesCancelToken() {
                this._isCanceled = false;
            }
            Object.defineProperty(GetIntellisenseChoicesCancelToken.prototype, "isCanceled", {
                get: function () {
                    return this._isCanceled;
                },
                enumerable: true,
                configurable: true
            });

            GetIntellisenseChoicesCancelToken.prototype.cancel = function () {
                this._isCanceled = true;
            };
            return GetIntellisenseChoicesCancelToken;
        })();
        Intellisense.GetIntellisenseChoicesCancelToken = GetIntellisenseChoicesCancelToken;

        var IntellisenseProviderBase = (function () {
            function IntellisenseProviderBase() {
                this._lastTextValue = "";
                this._lastSearchExpression = "";
                this._searchExpressionUpdated = false;
                this._currentSearchToken = "";
                this._currentSearchTokenStart = -1;
                this._currentSearchTokenEnd = -1;
                this._currentIntellisenseChoicesPromise = null;
                this._menuShouldOpenAfterPromiseCompletes = false;
                this._currentIntellisenseChoices = null;
                this._performingCommit = false;
                this._nextETWKey = 0;
            }
            Object.defineProperty(IntellisenseProviderBase.prototype, "textEditorBridge", {
                get: function () {
                    return this._intellisenseContext.textEditorBridge;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IntellisenseProviderBase.prototype, "intellisenseMenu", {
                get: function () {
                    return this._intellisenseContext.intellisenseMenu;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseProviderBase.prototype, "currentSearchToken", {
                get: function () {
                    return this._currentSearchToken;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IntellisenseProviderBase.prototype, "currentSearchTokenStart", {
                get: function () {
                    return this._currentSearchTokenStart;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IntellisenseProviderBase.prototype, "currentSearchTokenEnd", {
                get: function () {
                    return this._currentSearchTokenEnd;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(IntellisenseProviderBase.prototype, "onIntellisenseResultsAvailable", {
                get: function () {
                    return this._onIntellisenseResultsAvailable;
                },
                set: function (value) {
                    this._onIntellisenseResultsAvailable = value;
                },
                enumerable: true,
                configurable: true
            });

            IntellisenseProviderBase.prototype.attach = function (intellisenseContext) {
                var _this = this;
                this._intellisenseContext = intellisenseContext;

                this.textEditorBridge.onTextChanged = function (text) {
                    return _this.textEditorBridge_textChanged(text);
                };
                this.textEditorBridge.onCaretPositionChanged = function (caretPosition) {
                    return _this.textEditorBridge_caretPositionChanged(caretPosition);
                };
                this.textEditorBridge.onSelectionLengthChanged = function (selectionLength) {
                    return _this.textEditorBridge_selectionLengthChanged(selectionLength);
                };
                this.textEditorBridge.onMenuRequested = function () {
                    return _this.textEditorBridge_menuRequested();
                };
                this.intellisenseMenu.onSelectionChanged = function (selection) {
                    return _this.intellisenseMenu_selectionChanged(selection);
                };
                this.intellisenseMenu.onChoiceCommitted = function (choice, commitSource) {
                    return _this.intellisenseMenu_choiceCommitted(choice, commitSource);
                };
                this.intellisenseMenu.onClosing = function () {
                    return _this.intellisenseMenu_closing();
                };

                this._lastTextValue = this.textEditorBridge.text;
            };

            IntellisenseProviderBase.prototype.detach = function () {
                if (this._currentIntellisenseChoicesPromise) {
                    this._currentIntellisenseChoicesPromise.cancel();
                    this._currentIntellisenseChoicesPromise = null;
                    this._menuShouldOpenAfterPromiseCompletes = false;
                }

                this._currentSearchToken = "";
                this._currentSearchTokenStart = -1;
                this._currentSearchTokenEnd = -1;
                this._currentIntellisenseChoices = null;
                this._lastTextValue = "";

                this.textEditorBridge.onTextChanged = null;
                this.textEditorBridge.onCaretPositionChanged = null;
                this.textEditorBridge.onSelectionLengthChanged = null;
                this.textEditorBridge.onMenuRequested = null;
                this.intellisenseMenu.onSelectionChanged = null;
                this.intellisenseMenu.onChoiceCommitted = null;
                this.intellisenseMenu.onClosing = null;

                this._intellisenseContext = null;
            };

            IntellisenseProviderBase.prototype.getCurrentFilteredIntellisenseCompletionList = function () {
                if (this._currentIntellisenseChoices && this._currentIntellisenseChoices.length > 0) {
                    return this.intellisenseMenu.filteredIntellisenseChoices;
                }

                return [];
            };

            IntellisenseProviderBase.prototype.clearLastValues = function () {
                this._currentSearchToken = "";
                this._currentSearchTokenStart = -1;
                this._currentSearchTokenEnd = -1;
                this._currentIntellisenseChoices = null;
                this._lastTextValue = "";
            };

            IntellisenseProviderBase.prototype.getCurrentExpression = function (text, caretPosition, etwKey) {
                if (typeof etwKey === "undefined") { etwKey = -1; }
                this.fireGetCurrentExpressionStartEvent(etwKey);
                var startSubStr = text.substr(0, caretPosition);
                var endSubStr = text.substr(caretPosition);
                var nonResult = {
                    text: "",
                    offset: caretPosition
                };

                var nextCharIsInsideSingleQuoteString = false;
                var nextCharIsInsideDoubleQuoteString = false;
                var nextCharIsEscaped = false;
                if (startSubStr && startSubStr.length > 0) {
                    for (var i = 0; i < startSubStr.length; ++i) {
                        var nextCharIsInsideString = nextCharIsInsideSingleQuoteString || nextCharIsInsideDoubleQuoteString;

                        if (startSubStr[i] === "\\" && nextCharIsInsideString) {
                            nextCharIsEscaped = true;
                        } else {
                            if (startSubStr[i] === "'" && !nextCharIsEscaped) {
                                nextCharIsInsideSingleQuoteString = !nextCharIsInsideSingleQuoteString && !nextCharIsInsideDoubleQuoteString;
                            } else if (startSubStr[i] === "\"" && !nextCharIsEscaped) {
                                nextCharIsInsideDoubleQuoteString = !nextCharIsInsideSingleQuoteString && !nextCharIsInsideDoubleQuoteString;
                            }

                            nextCharIsEscaped = false;
                        }
                    }

                    if (nextCharIsInsideSingleQuoteString || nextCharIsInsideDoubleQuoteString) {
                        this.fireGetCurrentExpressionEndEvent(etwKey);
                        return nonResult;
                    }
                }

                var varMatch = startSubStr.match(/var\s+\S+$/);
                if (varMatch && varMatch.length > 0) {
                    this.fireGetCurrentExpressionEndEvent(etwKey);
                    return nonResult;
                }

                var startMatch = startSubStr.match(IntellisenseProviderBase.JAVASCRIPT_BEGIN_EXPRESSION_REGEX);
                var expressionStart = "";
                if (startMatch) {
                    expressionStart = startMatch[0];
                }

                var endMatch = endSubStr.match(IntellisenseProviderBase.JAVASCRIPT_END_EXPRESSION_REGEX);
                var expressionEnd = "";
                if (endMatch) {
                    expressionEnd = endMatch[0];
                }

                var resultText = expressionStart + expressionEnd;
                if (resultText.match(/^\d/)) {
                    this.fireGetCurrentExpressionEndEvent(etwKey);
                    return nonResult;
                }

                this.fireGetCurrentExpressionEndEvent(etwKey);
                return {
                    text: expressionStart + expressionEnd,
                    offset: startSubStr.length - expressionStart.length
                };
            };

            IntellisenseProviderBase.prototype.getSearchTokenFromFullExpression = function (expression) {
                var result = { text: "", offset: expression.length };
                var match = expression.match(IntellisenseProviderBase.JAVASCRIPT_BEGIN_SEARCH_TOKEN_REGEX);
                if (match && match.length > 0) {
                    result.text = match[0];
                    result.offset = expression.length - result.text.length;
                    return result;
                }

                return result;
            };

            IntellisenseProviderBase.prototype.getIntellisenseChoices = function (searchExpression, completeCallback, cancelToken, etwKey) {
                completeCallback(null);
            };

            IntellisenseProviderBase.prototype.onMenuSelectionChanged = function (value) {
            };

            IntellisenseProviderBase.prototype.onMenuChoiceCommitted = function (value, commitSource) {
                this.textEditorBridge.insertText(this.currentSearchTokenStart, this.currentSearchTokenEnd, value.text);
            };

            IntellisenseProviderBase.prototype.onMenuClosing = function () {
            };

            IntellisenseProviderBase.prototype.fireGetCurrentExpressionStartEvent = function (key) {
            };

            IntellisenseProviderBase.prototype.fireGetCurrentExpressionEndEvent = function (key) {
            };

            IntellisenseProviderBase.prototype.fireUpdateIntellisenseStartEvent = function (key) {
            };

            IntellisenseProviderBase.prototype.fireUpdateIntellisenseEndEvent = function (key) {
            };

            IntellisenseProviderBase.prototype.getIntellisenseChoicesAsync = function (searchExpression, etwKey) {
                var _this = this;
                var cancelToken = new GetIntellisenseChoicesCancelToken();
                return new Plugin.Promise(function (complete) {
                    _this.getIntellisenseChoices(searchExpression, complete, cancelToken, etwKey);
                }, function () {
                    cancelToken.cancel();
                    _this.fireUpdateIntellisenseEndEvent(etwKey);
                });
            };

            IntellisenseProviderBase.prototype.updateIntellisense = function (text, caretPosition, forceMenuOpen) {
                var _this = this;
                if (typeof forceMenuOpen === "undefined") { forceMenuOpen = false; }
                if (this._performingCommit) {
                    return;
                }

                var etwKey = this._nextETWKey++;
                var expression = this.getCurrentExpression(text, caretPosition, etwKey);
                if (expression.text.length > 0 || forceMenuOpen) {
                    this.fireUpdateIntellisenseStartEvent(etwKey);
                    var newSearchToken = this.getSearchTokenFromFullExpression(expression.text);
                    var searchTokenUpdated = newSearchToken.text !== this._currentSearchToken || forceMenuOpen;
                    var searchTokenIsFresh = (!newSearchToken.text.match("^" + this._currentSearchToken) && !this._currentSearchToken.match("^" + newSearchToken.text)) || newSearchToken.text.length === 1;
                    this._currentSearchToken = newSearchToken.text;

                    this._currentSearchTokenEnd = expression.offset + expression.text.length;
                    this._currentSearchTokenStart = this._currentSearchTokenEnd - this._currentSearchToken.length;
                    var searchExpression = expression.text.substr(0, newSearchToken.offset - 1);

                    var searchRequiresNewPromise = (searchTokenUpdated && searchTokenIsFresh) || this._lastSearchExpression !== searchExpression;

                    var newSearchExpression = this._searchExpressionUpdated;
                    this._searchExpressionUpdated = false;
                    var menuWasOpen = this.intellisenseMenu.isOpen;
                    var menuShouldOpenAfterPromiseCompletes = this._menuShouldOpenAfterPromiseCompletes;
                    if (searchRequiresNewPromise || !this._currentIntellisenseChoices) {
                        if (this._currentIntellisenseChoicesPromise) {
                            this._currentIntellisenseChoicesPromise.cancel();
                            this._currentIntellisenseChoicesPromise = null;
                            this._menuShouldOpenAfterPromiseCompletes = false;
                        }

                        this.intellisenseMenu.isOpen = false;
                        this.intellisenseMenu.placementTargetIndex = this.currentSearchTokenStart;

                        if (expression.text.indexOf(".") !== 0 && expression.text.indexOf("..") < 0) {
                            this._currentIntellisenseChoicesPromise = this.getIntellisenseChoicesAsync(searchExpression, etwKey);
                            this._lastSearchExpression = searchExpression;
                            newSearchExpression = true;
                        }
                    }

                    var newCharWasWhitespace = false;
                    if (caretPosition > 0 && text.length >= caretPosition) {
                        var lastChar = text[caretPosition - 1];
                        newCharWasWhitespace = !!lastChar.match(/\s/);
                    }

                    var menuWillBeOpen = this.intellisenseMenu.isOpen || menuWasOpen || menuShouldOpenAfterPromiseCompletes || forceMenuOpen;

                    if (this._lastTextValue.length === (text.length - 1) && !newCharWasWhitespace && (this._currentSearchToken.length === 1 || newSearchExpression)) {
                        menuWillBeOpen = true;
                    } else {
                        this._searchExpressionUpdated = newSearchExpression;
                    }

                    if (this._currentIntellisenseChoicesPromise) {
                        this._menuShouldOpenAfterPromiseCompletes = menuWillBeOpen;
                        this._currentIntellisenseChoicesPromise.done(function (result) {
                            _this._currentIntellisenseChoices = result;

                            _this.updateMenu(text, searchTokenUpdated, menuWillBeOpen, forceMenuOpen, etwKey);

                            _this._currentIntellisenseChoicesPromise = null;
                            _this._menuShouldOpenAfterPromiseCompletes = false;
                        });
                    } else {
                        this.updateMenu(text, searchTokenUpdated, menuWillBeOpen, forceMenuOpen, etwKey);
                    }
                } else {
                    this.intellisenseMenu.isOpen = false;
                    this.intellisenseMenu.intellisenseChoices = null;
                    this._currentSearchToken = "";
                    this._currentSearchTokenStart = -1;
                    this._currentSearchTokenEnd = -1;
                    this._currentIntellisenseChoices = null;
                    this.fireOnIntellisenseResultsAvailable();
                }

                this._lastTextValue = text;
            };

            IntellisenseProviderBase.prototype.updateMenu = function (text, searchTokenUpdated, menuWillBeOpen, forceMenuOpen, etwKey) {
                this.intellisenseMenu.currentEtwKey = etwKey;
                if (this._currentIntellisenseChoices && this._currentIntellisenseChoices.length > 0) {
                    if (menuWillBeOpen) {
                        if (this.intellisenseMenu.intellisenseChoices !== this._currentIntellisenseChoices) {
                            this.intellisenseMenu.intellisenseChoices = this._currentIntellisenseChoices;
                            searchTokenUpdated = true;
                        }

                        if (searchTokenUpdated) {
                            this.intellisenseMenu.setFilter(this._currentSearchToken);
                        }

                        this.fireOnIntellisenseResultsAvailable();
                    }

                    if (forceMenuOpen) {
                        this.intellisenseMenu.forceOpen();
                    } else {
                        this.intellisenseMenu.isOpen = menuWillBeOpen;
                    }
                } else {
                    this.fireOnIntellisenseResultsAvailable();
                }

                this.fireUpdateIntellisenseEndEvent(etwKey);
            };

            IntellisenseProviderBase.prototype.fireOnIntellisenseResultsAvailable = function () {
                if (this._onIntellisenseResultsAvailable) {
                    this._onIntellisenseResultsAvailable();
                }
            };

            IntellisenseProviderBase.prototype.textEditorBridge_textChanged = function (text) {
                this.updateIntellisense(text, this.textEditorBridge.caretPosition);
            };

            IntellisenseProviderBase.prototype.textEditorBridge_caretPositionChanged = function (caretPosition) {
                if (this.textEditorBridge.selectionLength === 0) {
                    this.updateIntellisense(this.textEditorBridge.text, caretPosition);
                }
            };

            IntellisenseProviderBase.prototype.textEditorBridge_selectionLengthChanged = function (selectionLength) {
                if (selectionLength > 0) {
                    this.intellisenseMenu.isOpen = false;
                }
            };

            IntellisenseProviderBase.prototype.textEditorBridge_menuRequested = function () {
                this.updateIntellisense(this.textEditorBridge.text, this.textEditorBridge.caretPosition, true);
            };

            IntellisenseProviderBase.prototype.intellisenseMenu_selectionChanged = function (value) {
                this.onMenuSelectionChanged(value);
            };

            IntellisenseProviderBase.prototype.intellisenseMenu_choiceCommitted = function (value, commitSource) {
                this._performingCommit = true;

                this.onMenuChoiceCommitted(value, commitSource);
                this.intellisenseMenu.isOpen = false;
                this._lastTextValue = this.textEditorBridge.text;
                this.textEditorBridge.focusEditor();

                this._performingCommit = false;
            };

            IntellisenseProviderBase.prototype.intellisenseMenu_closing = function () {
                this.onMenuClosing();
            };
            IntellisenseProviderBase.VALID_JAVASCRIPT_VARIABLE_LETTERS = "$0-9A-Z_a-z\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376-\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7-\u09C8\u09CB-\u09CE\u09D7\u09DC-\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A3C\u0A3E-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47-\u0B48\u0B4B-\u0B4D\u0B56-\u0B57\u0B5C-\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82-\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C58-\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5-\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF2\u0D02-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2-\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18-\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772-\u1773\u1780-\u17D3\u17D7\u17DC-\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C-\u200D\u203F-\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC-\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33-\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA";

            IntellisenseProviderBase.JAVASCRIPT_BEGIN_EXPRESSION_REGEX = new RegExp("[\\." + IntellisenseProviderBase.VALID_JAVASCRIPT_VARIABLE_LETTERS + "]+$");

            IntellisenseProviderBase.JAVASCRIPT_END_EXPRESSION_REGEX = new RegExp("^[" + IntellisenseProviderBase.VALID_JAVASCRIPT_VARIABLE_LETTERS + "]+");

            IntellisenseProviderBase.JAVASCRIPT_BEGIN_SEARCH_TOKEN_REGEX = new RegExp("[" + IntellisenseProviderBase.VALID_JAVASCRIPT_VARIABLE_LETTERS + "]+$");

            IntellisenseProviderBase.JAVASCRIPT_VALID_JS_VARIABLENAME_REGEX = new RegExp("^[" + IntellisenseProviderBase.VALID_JAVASCRIPT_VARIABLE_LETTERS + "]+$");
            return IntellisenseProviderBase;
        })();
        Intellisense.IntellisenseProviderBase = IntellisenseProviderBase;
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/intellisenseProviderBase.js.map

// staticContentProvider.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";
        var StaticContentProvider = (function () {
            function StaticContentProvider(breakUpFilterTextByWhitespace) {
                if (typeof breakUpFilterTextByWhitespace === "undefined") { breakUpFilterTextByWhitespace = true; }
                this._breakUpFilterTextByWhitespace = breakUpFilterTextByWhitespace;
            }

            Object.defineProperty(StaticContentProvider.prototype, "choices", {
                get: function () {
                    return this._choices;
                },
                set: function (theChoices) {
                    this._choices = theChoices;
                    if (this._onIntellisenseResultsAvailable) {
                        this._onIntellisenseResultsAvailable();
                    }

                    if (this._intellisenseContext) {
                        this._intellisenseContext.intellisenseMenu.intellisenseChoices = theChoices;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(StaticContentProvider.prototype, "onIntellisenseResultsAvailable", {
                get: function () {
                    return this._onIntellisenseResultsAvailable;
                },
                set: function (value) {
                    this._onIntellisenseResultsAvailable = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(StaticContentProvider.prototype, "onShouldOpenOnTextChange", {
                get: function () {
                    return this._onShouldOpenOnTextChange;
                },
                set: function (value) {
                    this._onShouldOpenOnTextChange = value;
                },
                enumerable: true,
                configurable: true
            });

            StaticContentProvider.prototype.attach = function (intellisenseContext) {
                var _this = this;
                this._intellisenseContext = intellisenseContext;

                this._intellisenseContext.textEditorBridge.onTextChanged = function (text) {
                    return _this.textEditorBridge_textChanged(text);
                };
                this._intellisenseContext.textEditorBridge.onCaretPositionChanged = function (caretPosition) {
                    return _this.textEditorBridge_caretPositionChanged(caretPosition);
                };
                this._intellisenseContext.textEditorBridge.onSelectionLengthChanged = function (selectionLength) {
                    return _this.textEditorBridge_selectionLengthChanged(selectionLength);
                };
                this._intellisenseContext.textEditorBridge.onMenuRequested = function () {
                    return _this.textEditorBridge_menuRequested();
                };
                this._intellisenseContext.intellisenseMenu.onChoiceCommitted = function (choice, commitSource) {
                    return _this.intellisenseMenu_choiceCommitted(choice, commitSource);
                };
                this._intellisenseContext.intellisenseMenu.intellisenseChoices = this._choices;
            };

            StaticContentProvider.prototype.detach = function () {
                this._intellisenseContext.textEditorBridge.onTextChanged = null;
                this._intellisenseContext.textEditorBridge.onCaretPositionChanged = null;
                this._intellisenseContext.textEditorBridge.onSelectionLengthChanged = null;
                this._intellisenseContext.textEditorBridge.onMenuRequested = null;
                this._intellisenseContext.intellisenseMenu.onSelectionChanged = null;
                this._intellisenseContext.intellisenseMenu.onChoiceCommitted = null;
                this._intellisenseContext.intellisenseMenu.onClosing = null;

                this._intellisenseContext = null;
            };

            StaticContentProvider.prototype.getCurrentFilteredIntellisenseCompletionList = function () {
                return this._intellisenseContext.intellisenseMenu.filteredIntellisenseChoices;
            };

            StaticContentProvider.prototype.clearLastValues = function () {
            };

            StaticContentProvider.prototype.onMenuChoiceCommitted = function (value, commitSource) {
                this.closeMenu();
                this.insertText(this._token.leftIndex, this._token.rightIndex, value.text);
            };

            StaticContentProvider.prototype.insertText = function (leftIndex, rightIndex, text) {
                this._intellisenseContext.textEditorBridge.insertText(leftIndex, rightIndex, text);
            };

            StaticContentProvider.prototype.updateIntellisense = function (text, caretPosition, forceMenuOpen) {
                this._token = this.findTokenWhereCaretResides(text, caretPosition);
                this.setFilter(this._token.text);
                if (forceMenuOpen || (this._choices && this._choices.length > 0 && this._token.text && this._token.text.length > 0) && (!this._onShouldOpenOnTextChange || this._onShouldOpenOnTextChange(text))) {
                    this.openMenu(forceMenuOpen);
                } else {
                    this.closeMenu();
                }
            };

            StaticContentProvider.prototype.setFilter = function (filterText) {
                this._intellisenseContext.intellisenseMenu.setFilter(filterText);
            };

            StaticContentProvider.prototype.openMenu = function (forceMenuOpen) {
                if (forceMenuOpen) {
                    this._intellisenseContext.intellisenseMenu.forceOpen();
                } else {
                    this._intellisenseContext.intellisenseMenu.isOpen = true;
                }
            };

            StaticContentProvider.prototype.closeMenu = function () {
                this._intellisenseContext.intellisenseMenu.isOpen = false;
            };

            StaticContentProvider.isAtLeftEndOrHasWhiteSpaceToTheLeft = function (text, position) {
                if (position < 0) {
                    return true;
                }

                var ch = text.charAt(position);
                return ch === " " || ch === "\t";
            };

            StaticContentProvider.isAtRightEndOrHasWhiteSpaceToTheRight = function (text, position) {
                if (position >= text.length) {
                    return true;
                }

                var ch = text.charAt(position);
                return ch === " " || ch === "\t";
            };

            StaticContentProvider.prototype.findTokenWhereCaretResides = function (text, caretPosition) {
                if (!this._breakUpFilterTextByWhitespace) {
                    return { leftIndex: 0, rightIndex: text.length, text: text };
                }

                var left = caretPosition;
                while (!StaticContentProvider.isAtLeftEndOrHasWhiteSpaceToTheLeft(text, left - 1)) {
                    left--;
                }

                var right = caretPosition;
                while (!StaticContentProvider.isAtRightEndOrHasWhiteSpaceToTheRight(text, right)) {
                    right++;
                }

                return { leftIndex: left, rightIndex: (right), text: text.substring(left, right) };
            };

            StaticContentProvider.prototype.textEditorBridge_textChanged = function (text) {
                this.updateIntellisense(text, this._intellisenseContext.textEditorBridge.caretPosition);
            };

            StaticContentProvider.prototype.textEditorBridge_caretPositionChanged = function (caretPosition) {
                if (this._intellisenseContext.textEditorBridge.selectionLength === 0) {
                    this.updateIntellisense(this._intellisenseContext.textEditorBridge.text, caretPosition);
                }
            };

            StaticContentProvider.prototype.textEditorBridge_selectionLengthChanged = function (selectionLength) {
                if (selectionLength > 0) {
                    this._intellisenseContext.intellisenseMenu.isOpen = false;
                }
            };

            StaticContentProvider.prototype.textEditorBridge_menuRequested = function () {
                this.updateIntellisense(this._intellisenseContext.textEditorBridge.text, this._intellisenseContext.textEditorBridge.caretPosition, true);
            };

            StaticContentProvider.prototype.intellisenseMenu_choiceCommitted = function (value, commitSource) {
                this.onMenuChoiceCommitted(value, commitSource);
            };
            return StaticContentProvider;
        })();
        Intellisense.StaticContentProvider = StaticContentProvider;
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/staticContentProvider.js.map

// IIntellisenseMenu.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/IIntellisenseMenu.js.map

// IIntellisenseProvider.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";

        
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/IIntellisenseProvider.js.map

// ITextEditorBridge.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";

        
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/ITextEditorBridge.js.map

// intellisenseRemoteHelpers.ts
var Common;
(function (Common) {
    (function (Intellisense) {
        "use strict";

        var IntellisenseRemoteHelpers = (function () {
            function IntellisenseRemoteHelpers(context) {
                this._context = context;
            }
            IntellisenseRemoteHelpers.evaluateProperty = function (object, propertyName, currentWindowContext, retrieveProperty) {
                var getPropertyDescriptor = function (object, propertyName) {
                    if (object) {
                        try  {
                            var descriptor = currentWindowContext.Object.getOwnPropertyDescriptor(object, propertyName);
                            if (descriptor) {
                                return descriptor;
                            } else {
                                return getPropertyDescriptor(currentWindowContext.Object.getPrototypeOf(object), propertyName);
                            }
                        } catch (e) {
                            if (e.name === "TypeError") {
                                return {};
                            } else {
                                return;
                            }
                        }
                    }

                    return object;
                };

                var getValueProperty = function (object, propertyName, descriptor) {
                    if (descriptor) {
                        if (typeof descriptor.value !== "undefined" && descriptor.value !== null) {
                            return descriptor.value;
                        } else {
                            var currentType = typeof object;
                            if (currentType !== "object" && currentType !== "function") {
                                object = new currentWindowContext.Object(object);
                            }

                            if (descriptor.get && /\[native code\]/.test(descriptor.get.toString())) {
                                return retrieveProperty(object, propertyName);
                            } else if (typeof descriptor.get === "undefined") {
                                return retrieveProperty(object, propertyName);
                            }
                        }
                    }

                    return;
                };

                return object && getValueProperty(object, propertyName, getPropertyDescriptor(object, propertyName));
            };

            IntellisenseRemoteHelpers.getObjectContextPropertiesNames = function (context) {
                var propertyNames = [];

                if (context.object !== null && context.object !== undefined) {
                    var currentType = typeof context.object;

                    if (currentType !== "object" || currentType !== "function") {
                        context.object = new context.windowContext.Object(context.object);
                    }

                    var result = Common.RemoteHelpers.getValidWindow(context.windowContext, context.object);
                    if (result.isValid) {
                        context.object = context.windowContext = result.window;
                    }

                    var currentPropertyNames = context.windowContext.Object.getOwnPropertyNames(context.object);
                    if (currentPropertyNames) {
                        propertyNames = currentPropertyNames;
                    }

                    var prototype = context.windowContext.Object.getPrototypeOf(context.object);
                    while (prototype) {
                        var prototypeProperties = context.windowContext.Object.getOwnPropertyNames(prototype);
                        propertyNames = Array.prototype.concat.call(propertyNames, prototypeProperties);
                        prototype = context.windowContext.Object.getPrototypeOf(prototype);
                    }
                }

                return propertyNames;
            };

            IntellisenseRemoteHelpers.prototype.getIntellisenseItemsForExpression = function (expression) {
                return this.getIntellisenseItemsForExpressionUsingWindowContext(expression, this._context.currentWindowContext, this._context.currentWindowContext.window, []);
            };

            IntellisenseRemoteHelpers.prototype.getIntellisenseItemsForExpressionUsingWindowContext = function (expression, windowContext, searchObject, locals) {
                var current = this.getObjectContextForExpressionUsingEvaluator(expression, windowContext, searchObject, IntellisenseRemoteHelpers.evaluateProperty);
                var includeKeywordsAndLocals = expression.length === 0 && windowContext === searchObject;
                return this.getIntellisenseItemsForObjectContext(current, IntellisenseRemoteHelpers.getObjectContextPropertiesNames, includeKeywordsAndLocals, locals);
            };

            IntellisenseRemoteHelpers.prototype.getObjectContextForExpressionUsingEvaluator = function (expression, currentWindowContext, currentObject, evaluator) {
                var items = expression.split(".");

                for (var i = 0; i < items.length && items[i].length > 0; ++i) {
                    var retrievePropertyFunc = Common.PropertyEvaluationIgnoreList.propertyEvaluationFunction(currentWindowContext, currentObject);
                    currentObject = evaluator(currentObject, items[i], currentWindowContext, retrievePropertyFunc);
                    var result = Common.RemoteHelpers.getValidWindow(currentWindowContext, currentObject);
                    if (result.isValid) {
                        currentObject = currentWindowContext = result.window;
                    }
                }

                return { object: currentObject, windowContext: currentWindowContext };
            };

            IntellisenseRemoteHelpers.prototype.getIntellisenseItemsForObjectContext = function (context, propertyNameCallback, includeKeywordsAndLocals, locals) {
                var propertyNames = propertyNameCallback(context);

                if (includeKeywordsAndLocals) {
                    propertyNames = Array.prototype.concat.call(propertyNames, IntellisenseRemoteHelpers.JSKeywords);
                    propertyNames = Array.prototype.concat.call(propertyNames, locals);
                }

                var choices = [];
                for (var i = 0, len = propertyNames.length; i < len; i++) {
                    if (!String.prototype.match.call(propertyNames[i], /^\d/)) {
                        choices.push({ name: propertyNames[i], info: "" });
                    }
                }

                var simpleCompare = function (a, b) {
                    if (a < b) {
                        return -1;
                    } else if (a > b) {
                        return 1;
                    } else {
                        return 0;
                    }
                };

                choices = Array.prototype.sort.call(choices, function (a, b) {
                    var result = simpleCompare(a.name.toLowerCase(), b.name.toLowerCase());
                    if (result === 0) {
                        return simpleCompare(b.name, a.name);
                    } else {
                        return result;
                    }
                });

                for (var i = 1; i < choices.length;) {
                    if (choices[i - 1].name === choices[i].name) {
                        choices.splice(i, 1);
                    } else {
                        i++;
                    }
                }

                return { choices: choices };
            };
            IntellisenseRemoteHelpers.JSKeywords = [
                "break",
                "case",
                "catch",
                "const",
                "continue",
                "debugger",
                "default",
                "delete",
                "do",
                "else",
                "finally",
                "for",
                "function",
                "if",
                "in",
                "instanceof",
                "let",
                "new",
                "return",
                "switch",
                "this",
                "throw",
                "try",
                "var",
                "void",
                "while",
                "with",
                "typeof",
                "false",
                "true",
                "cd",
                "dir",
                "select",
                "$",
                "$$"
            ];
            return IntellisenseRemoteHelpers;
        })();
        Intellisense.IntellisenseRemoteHelpers = IntellisenseRemoteHelpers;
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Intellisense/intellisenseRemoteHelpers.js.map

// objectTreeView.ts
var Common;
(function (Common) {
    (function (ObjectView) {
        "use strict";

        var Measurements = (function () {
            function Measurements() {
                this._cellOffset = 0;
                this._rowHeight = 0;
                this._unitEx = 0;
            }
            Object.defineProperty(Measurements.prototype, "cellOffset", {
                get: function () {
                    return this._cellOffset;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Measurements.prototype, "rowHeight", {
                get: function () {
                    return this._rowHeight;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Measurements.prototype, "unitEx", {
                get: function () {
                    return this._unitEx;
                },
                enumerable: true,
                configurable: true
            });

            Measurements.prototype.update = function (container) {
                var measurementContainer = DomHelpers.createElement("div", "listview-grid");
                measurementContainer.style.display = "block";
                measurementContainer.style.position = "absolute";
                measurementContainer.style.left = "-5000px";
                measurementContainer.style.top = "-5000px";
                measurementContainer.style.width = "1000px";
                measurementContainer.style.height = "500px";
                (container || document.body).appendChild(measurementContainer);

                var row = DomHelpers.createElement("div", "listview-grid-row grid-row-normal");
                row.tabIndex = -1;
                row.setAttribute("role", "listitem");
                measurementContainer.appendChild(row);

                var cell = DomHelpers.createElement("div", "listview-grid-cell");
                cell.style.width = "100px";
                cell.innerText = "1";
                row.appendChild(cell);

                this._rowHeight = row.offsetHeight;
                this._cellOffset = cell.offsetWidth - 100;

                var textUnit = DomHelpers.createElement("div");
                textUnit.style.overflow = "hidden";
                textUnit.style.width = "1em";
                textUnit.style.height = "1ex";
                cell.appendChild(textUnit);

                this._unitEx = textUnit.offsetHeight;

                (container || document.body).removeChild(measurementContainer);
            };
            return Measurements;
        })();
        ObjectView.Measurements = Measurements;

        (function (DomHelpers) {
            function createElement(type, className) {
                var element = document.createElement(type);
                if (className) {
                    element.className = className;
                }

                return element;
            }
            DomHelpers.createElement = createElement;

            function findClosestElement(element, selector, within) {
                var stop = within || document.body;

                var closest = element;
                while (closest && closest !== stop) {
                    if (closest.msMatchesSelector(selector)) {
                        return closest;
                    }

                    closest = closest.parentElement;
                }

                return null;
            }
            DomHelpers.findClosestElement = findClosestElement;
        })(ObjectView.DomHelpers || (ObjectView.DomHelpers = {}));
        var DomHelpers = ObjectView.DomHelpers;

        var ObjectTreeView = (function () {
            function ObjectTreeView(container, toggleCallback, selectCallback, editCallback, clickCallback, renderFunction) {
                this._isTabbingOut = false;
                this._delayedRenderRequestCount = 0;
                this._containerElement = container;
                this._toggleCallback = toggleCallback;
                this._selectCallback = selectCallback;
                this._editCallback = editCallback;
                this._clickCallback = clickCallback;
                this._nameColumnWidth = ObjectTreeView.DefaultColumnSize;
                this._isInitialResize = true;
                this._autoScrollEnabled = true;
                this._scrollPadding = 5;
                this._hasIndent = true;

                this._renderFunction = renderFunction;
                if (!this._renderFunction) {
                    this._renderFunction = function (expression, msec, language) {
                        return window.setTimeout(expression, msec, language);
                    };
                }

                this.initialize();
            }
            Object.defineProperty(ObjectTreeView.prototype, "onUpdated", {
                get: function () {
                    return this._onUpdated;
                },
                set: function (callback) {
                    this._onUpdated = callback;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "postRenderCallback", {
                get: function () {
                    return this._postRenderCallback;
                },
                set: function (callback) {
                    this._postRenderCallback = callback;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "notifyToggleCallback", {
                get: function () {
                    return this._notifyToggleCallback;
                },
                set: function (callback) {
                    this._notifyToggleCallback = callback;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "scrollPadding", {
                get: function () {
                    return this._scrollPadding;
                },
                set: function (value) {
                    this._scrollPadding = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "hasIndent", {
                get: function () {
                    return this._hasIndent;
                },
                set: function (value) {
                    this._hasIndent = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "onBeforeRendering", {
                get: function () {
                    return this._onBeforeRendering;
                },
                set: function (callback) {
                    this._onBeforeRendering = callback;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "onRendered", {
                get: function () {
                    return this._onRendered;
                },
                set: function (callback) {
                    this._onRendered = callback;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "onBeforeItemToggle", {
                get: function () {
                    return this._onBeforeItemToggle;
                },
                set: function (callback) {
                    this._onBeforeItemToggle = callback;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "onItemToggled", {
                get: function () {
                    return this._onItemToggled;
                },
                set: function (callback) {
                    this._onItemToggled = callback;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "onBeforeScroll", {
                get: function () {
                    return this._onBeforeScroll;
                },
                set: function (callback) {
                    this._onBeforeScroll = callback;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(ObjectTreeView.prototype, "onScrollCompleted", {
                get: function () {
                    return this._onScrollCompleted;
                },
                set: function (callback) {
                    this._onScrollCompleted = callback;
                },
                enumerable: true,
                configurable: true
            });


            ObjectTreeView.prototype.resize = function () {
                this.onResize(null);
            };

            ObjectTreeView.prototype.addItems = function (items, linkedTo, linkAsSiblings, preventScrollToItem, addBeforeSibling) {
                var _this = this;
                var parentContext = null;
                var linkedContext = null;
                var scrollInfo = null;
                var unfilteredIndexStart = 0;
                var filteredIndexStart = 0;

                F12.Tools.Utility.Assert.isFalse(addBeforeSibling && !linkAsSiblings, "addBeforeSibling (true) can only be used with linkAsSiblings (true) in objectTreeView addItems");

                var unfilteredItems = [];
                var filteredItems = [];
                for (var i = 0; i < items.length; i++) {
                    items[i].isStale = linkedTo && linkedTo.isStale;
                    if (items[i].additionalClass === "consoleItemInput") {
                        this._autoScrollEnabled = true;
                    }

                    var lastItem;
                    if (i > 0) {
                        lastItem = items[i - 1];
                    } else if (this._filteredList && this._filteredList.length > 0) {
                        lastItem = this.getItem(this._filteredList.length - 1);
                    }

                    var isIncluded = (!this._filter || this._filter(items[i])) && this.separatorFilter(items[i], lastItem);
                    var id = items[i].id;

                    if (items[i].htmlLines && items[i].htmlLines.length > 0) {
                        for (var j = 0; j < items[i].htmlLines.length; j++) {
                            unfilteredItems.push(id + "::" + j);
                            if (isIncluded) {
                                filteredItems.push(id + "::" + j);
                            }
                        }
                    } else {
                        unfilteredItems.push(id);
                        if (isIncluded) {
                            filteredItems.push(id);
                        }
                    }
                }

                if (linkedTo) {
                    parentContext = this._dataContextMap[linkedTo.id];
                    linkedContext = parentContext;
                    if (linkAsSiblings) {
                        parentContext = linkedContext.parentContext;
                    }
                }

                if (parentContext || linkedContext) {
                    var attachTo = linkedContext.item;
                    unfilteredIndexStart = this.getIndexOfItem(this._unfilteredList, attachTo) + 1;
                    filteredIndexStart = this.getIndexOfItem(this._filteredList, attachTo) + 1;
                    if (!linkAsSiblings) {
                        unfilteredIndexStart += (parentContext ? parentContext.descendantCount : 0);
                        filteredIndexStart += (parentContext ? parentContext.expandedCount : 0);
                    } else if (addBeforeSibling) {
                        unfilteredIndexStart -= 1;
                        filteredIndexStart -= 1;

                        F12.Tools.Utility.Assert.isTrue(unfilteredIndexStart >= 0);
                        F12.Tools.Utility.Assert.isTrue(filteredIndexStart >= 0);

                        if (unfilteredIndexStart < 0) {
                            unfilteredIndexStart = 0;
                        }

                        if (filteredIndexStart < 0) {
                            filteredIndexStart = 0;
                        }
                    }

                    if (parentContext) {
                        parentContext.children = (parentContext.children || []).concat(items);

                        this.updateContextCounts(parentContext, unfilteredItems.length, filteredItems.length);
                    }

                    var index = filteredIndexStart - 1;
                    if (index + filteredItems.length >= this._currentViewport.last - this._scrollPadding - 1) {
                        if (filteredItems.length + 1 < this._currentViewport.unboundLast - this._currentViewport.unboundFirst - this._scrollPadding * 2) {
                            scrollInfo = { index: index + filteredItems.length, top: false };
                        } else {
                            scrollInfo = { index: index, top: true };
                        }
                    }
                } else {
                    unfilteredIndexStart = this._unfilteredList.length;
                    filteredIndexStart = this._filteredList.length;
                }

                for (var i = 0; i < items.length; i++) {
                    var htmlLinesCount = items[i].htmlLines && items[i].htmlLines.length > 0 ? items[i].htmlLines.length - 1 : 0;
                    this._dataContextMap[items[i].id] = {
                        item: items[i],
                        children: [],
                        parentContext: parentContext,
                        descendantCount: htmlLinesCount,
                        expandedCount: htmlLinesCount
                    };
                }

                if (this._unfilteredList.length === 0 || unfilteredIndexStart === this._unfilteredList.length) {
                    this._unfilteredList = this._unfilteredList.concat(unfilteredItems);
                } else {
                    this.spliceArray(this._unfilteredList, unfilteredItems, unfilteredIndexStart);
                }

                if (this._filteredList.length === 0 || filteredIndexStart === this._filteredList.length) {
                    this._filteredList = this._filteredList.concat(filteredItems);
                } else {
                    this.spliceArray(this._filteredList, filteredItems, filteredIndexStart);
                }

                this.requestRender(true);

                if (!preventScrollToItem && scrollInfo) {
                    this._delayedScrollFunction = function () {
                        _this.scrollIndexIntoView(scrollInfo.index, scrollInfo.top);
                    };
                }
            };

            ObjectTreeView.prototype.updateItemLines = function (item, oldLineCount) {
                var id = item.id;
                var unfilteredIndexStart = this.getIndexOfItem(this._unfilteredList, item);
                var filteredIndexStart = this.getIndexOfItem(this._filteredList, item);

                if (unfilteredIndexStart >= 0) {
                    var unfilteredItems = [];
                    var filteredItems = [];

                    for (var i = 0; i < item.htmlLines.length; i++) {
                        unfilteredItems.push(id + "::" + i);
                        if (filteredIndexStart >= 0) {
                            filteredItems.push(id + "::" + i);
                        }
                    }

                    var args = [unfilteredIndexStart, oldLineCount].concat(unfilteredItems);
                    Array.prototype.splice.apply(this._unfilteredList, args);

                    if (filteredIndexStart >= 0) {
                        args = [filteredIndexStart, oldLineCount].concat(filteredItems);
                        Array.prototype.splice.apply(this._filteredList, args);
                    }

                    this.updateContextCounts(this._dataContextMap[item.id], unfilteredItems.length - oldLineCount, filteredItems.length - oldLineCount);
                }

                this.requestRender(true);
            };

            ObjectTreeView.prototype.selectItem = function (item, forceFocus) {
                var _this = this;
                if (typeof forceFocus === "undefined") { forceFocus = true; }
                if (this._delayedRenderCookie) {
                    this._delayedSelectFunction = function () {
                        return _this.selectItem(item, forceFocus);
                    };
                    return false;
                }

                var rows = this._gridElement.querySelectorAll(".listview-grid-row");
                for (var i = 0; i < rows.length; i++) {
                    var row = rows.item(i);
                    var index = parseInt(row.getAttribute("data-index"), 10);
                    if (this.getItem(index) === item && (!item.htmlLines || this.getLineIndex(this._filteredList[index]) === 0)) {
                        this.selectRow(row, forceFocus, false);
                        return true;
                    }
                }

                var index = this.getIndexOfItem(this._filteredList, item, false);
                if (index > -1) {
                    this.scrollIndexIntoView(index, true);
                    var row = document.getElementById("row_" + index);
                    if (row) {
                        this.selectRow(row, forceFocus, false);
                        return true;
                    }
                }

                return false;
            };

            ObjectTreeView.prototype.markItemsAsStale = function (staleTargetEngine) {
                for (var i = 0, n = this._unfilteredList.length; i < n; i++) {
                    var itemId = this.getItemId(this._unfilteredList[i]);
                    var listItem = this._dataContextMap[itemId].item;
                    var targetEngine = listItem.engine;
                    if (targetEngine && targetEngine.engineId === staleTargetEngine.engineId) {
                        listItem.isStale = !staleTargetEngine.targetId || (targetEngine.targetId === staleTargetEngine.targetId);
                    }
                }

                this.requestRender(true);
            };

            ObjectTreeView.prototype.selectRow = function (row, forceFocus, selectItem) {
                var _this = this;
                if (typeof selectItem === "undefined") { selectItem = true; }
                if (row && row.classList.contains("listview-grid-row")) {
                    var newIndex = parseInt(row.getAttribute("data-index"), 10);
                    if (newIndex !== this._selectedIndex || forceFocus) {
                        this._selectedIndex = newIndex;
                        this._selectedRow = row;

                        var lineIndex = this.getLineIndex(this._filteredList[this._selectedIndex]);
                        if (lineIndex >= 1 && selectItem) {
                            var newIndex = this._selectedIndex - lineIndex;
                            this.selectItem(this.getItem(newIndex));
                            return;
                        }

                        if (this._delayedSelectCookie) {
                            window.clearTimeout(this._delayedSelectCookie);
                        }

                        this._delayedSelectCookie = window.setTimeout(function () {
                            if (_this._selectedRow) {
                                var rows = _this._gridElement.querySelectorAll(".listview-grid-row-selected");
                                for (var i = 0; i < rows.length; i++) {
                                    rows.item(i).classList.remove("listview-grid-row-selected");
                                }

                                var item = _this.getItem(_this._selectedIndex);
                                if (!item) {
                                    _this._delayedSelectCookie = null;
                                    return;
                                }

                                var row = _this._selectedRow;
                                var lineCount = 0;
                                while (lineCount < (item.htmlLines ? item.htmlLines.length : 1) && row) {
                                    row.classList.add("listview-grid-row-selected");
                                    row = row.nextSibling;
                                    lineCount++;
                                }

                                if (forceFocus || _this.isFocusWithin()) {
                                    _this._selectedRow.focus();
                                } else {
                                    _this.scrollIndexIntoView(_this._selectedIndex);
                                }

                                _this.updateGroupLine();

                                if (_this._selectCallback) {
                                    _this._selectCallback(item);
                                }
                            }

                            _this._delayedSelectCookie = null;
                        }, 10);
                    }
                }
            };

            ObjectTreeView.prototype.toggleRow = function (row) {
                var index = parseInt(row.getAttribute("data-index"), 10);
                if (!isNaN(index)) {
                    var treeIcon = row.querySelector(".listview-icon-tree");
                    if (treeIcon) {
                        this.toggleRowAt(index);
                    }
                }
            };

            ObjectTreeView.prototype.setRowState = function (index, newState) {
                var item = this.getItem(index);
                if (!item) {
                    return;
                }

                var context = this._dataContextMap[item.id];
                var isCollapsed = context.descendantCount <= (item.htmlLines ? item.htmlLines.length - 1 : 0);

                if ((newState === ObjectTreeView.EXPAND_ROW && isCollapsed) || (newState === ObjectTreeView.COLLAPSE_ROW && !isCollapsed)) {
                    this.toggleRowAt(index);
                }
            };

            ObjectTreeView.prototype.toggleRowAt = function (index) {
                var _this = this;
                var item = this.getItem(index);
                if (!item) {
                    return;
                }

                if (this._onBeforeItemToggle) {
                    this._onBeforeItemToggle();
                }

                var context = this._dataContextMap[item.id];

                if (context.descendantCount <= (item.htmlLines ? item.htmlLines.length - 1 : 0)) {
                    if (this._toggleCallback) {
                        this._toggleCallback(context.item);
                    }
                } else {
                    var lineCount = (item.htmlLines ? item.htmlLines.length - 1 : 0);
                    var unfilteredRemoveCount = (context.descendantCount - lineCount);
                    var filteredRemoveCount = (context.expandedCount - lineCount);

                    var start = this.getIndexOfItem(this._unfilteredList, item);
                    var removed = this._unfilteredList.splice(start + 1 + lineCount, unfilteredRemoveCount);
                    for (var i = 0; i < removed.length; i++) {
                        var id = this.getItemId(removed[i]);
                        this._dataContextMap[id] = null;
                    }

                    if (this._selectedIndex > index + lineCount && this._selectedIndex < index + 1 + lineCount + filteredRemoveCount) {
                        this._selectedIndex = index;
                    }

                    this._filteredList.splice(index + 1 + lineCount, filteredRemoveCount);

                    this.updateContextCounts(context, -unfilteredRemoveCount, -filteredRemoveCount);

                    this.requestRender(true, index);

                    if (this._onUpdated) {
                        this._onUpdated([item]);
                    }
                }

                setTimeout(function () {
                    if (_this._notifyToggleCallback) {
                        _this._notifyToggleCallback();
                    }
                });

                if (this._onItemToggled) {
                    this._onItemToggled();
                }
            };

            ObjectTreeView.prototype.setButtonState = function (item, buttonIndex, isEnabled, isChecked) {
                if (item.buttonItems) {
                    var rows = this._gridElement.querySelectorAll(".listview-grid-row");
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows.item(i);
                        var index = parseInt(row.getAttribute("data-index"), 10);
                        if (this.getItem(index) === item && this.getLineIndex(this._filteredList[index]) === 0) {
                            var button = row.querySelector("[listview-button-index=\"" + buttonIndex + "\"]");
                            if (button) {
                                Common.ButtonHelpers.changeButtonStatus(button, isEnabled);

                                var buttonItem = item.buttonItems[buttonIndex];
                                buttonItem.isEnabled = isEnabled;
                                if (isEnabled) {
                                    buttonItem.isChecked = isChecked;

                                    var tooltip = isChecked ? buttonItem.checkedTooltip : buttonItem.uncheckedTooltip;
                                    button.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString(tooltip));
                                    button.setAttribute("aria-label", Plugin.Resources.getString(tooltip));

                                    var buttonDiv = button.querySelector(".buttonIcon.icon_16x16");
                                    if (buttonDiv) {
                                        if (isChecked) {
                                            buttonDiv.classList.add("checked");
                                        } else {
                                            buttonDiv.classList.remove("checked");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            ObjectTreeView.prototype.setFilter = function (filter) {
                var _this = this;
                this._filter = filter;

                var map = {};
                for (var i = 0; i < this._filteredList.length; i++) {
                    map[this._filteredList[i]] = true;
                }

                var newList = [];

                var currentSelectedItemIndex = -1;
                if (this._selectedIndex > -1) {
                    var currentSelectedItem = this.getSelectedItem();
                    if (currentSelectedItem) {
                        currentSelectedItemIndex = this.getIndexOfItem(this._unfilteredList, currentSelectedItem);
                    }

                    this._selectedIndex = -1;
                }

                var previousFilteredItem;

                for (var i = 0; i < this._unfilteredList.length; i++) {
                    var fullId = this._unfilteredList[i];
                    var context = this._dataContextMap[this.getItemId(fullId)];

                    var expandChange = 0;
                    var wasInOldView = !!map[fullId];
                    if (filter(context.item) && this.separatorFilter(context.item, previousFilteredItem)) {
                        previousFilteredItem = context.item;
                        newList.push(fullId);
                        if (!wasInOldView) {
                            expandChange = 1;
                        }

                        if (i >= currentSelectedItemIndex && this._selectedIndex === -1) {
                            this._selectedIndex = newList.length - 1;
                        }
                    } else if (wasInOldView) {
                        expandChange = -1;

                        if (i === currentSelectedItemIndex) {
                            if (newList && newList.length > 0) {
                                this._selectedIndex = newList.length - 1;
                            }
                        }
                    }

                    if (expandChange) {
                        var currentContext = context.parentContext;
                        if (currentContext) {
                            while (currentContext) {
                                currentContext.expandedCount += expandChange;
                                currentContext = currentContext.parentContext;
                            }
                        }
                    }
                }

                this._filteredList = newList;

                if (this._selectedIndex === -1) {
                    this._selectedRow = null;
                } else {
                    this._delayedScrollFunction = function () {
                        return _this.scrollIndexIntoView(_this._selectedIndex, true);
                    };
                }

                this.requestRender(true);
            };

            ObjectTreeView.prototype.sortFilteredList = function (getSortString) {
                var _this = this;
                this._filteredList.sort(function (a, b) {
                    var a = getSortString(_this._dataContextMap[_this.getItemId(a)].item);
                    var b = getSortString(_this._dataContextMap[_this.getItemId(b)].item);

                    var result = Common.ToolWindowHelpers.naturalSort(a.toLowerCase(), b.toLowerCase());
                    if (result === 0) {
                        return Common.ToolWindowHelpers.naturalSort(b, a);
                    } else {
                        return result;
                    }
                });
            };

            ObjectTreeView.prototype.getItemCount = function () {
                return this._filteredList.length;
            };

            ObjectTreeView.prototype.getUnfilteredItemCount = function () {
                return this._unfilteredList.length;
            };

            ObjectTreeView.prototype.getItemAt = function (index) {
                if (index >= 0 && index < this._filteredList.length) {
                    return this.getItem(index);
                }

                return null;
            };

            ObjectTreeView.prototype.getSelectedItem = function () {
                if (this._selectedIndex >= 0 && this._selectedIndex < this._filteredList.length) {
                    return this.getItem(this._selectedIndex);
                }

                return null;
            };

            ObjectTreeView.prototype.getSelectedRow = function () {
                if (this._selectedRow) {
                    return this._selectedRow;
                } else if (this._selectedIndex >= 0 && this._selectedIndex < this._filteredList.length) {
                    this.scrollIndexIntoView(this._selectedIndex);
                    return document.getElementById("row_" + this._selectedIndex);
                }

                return null;
            };

            ObjectTreeView.prototype.getItemChildren = function (item) {
                if (this._dataContextMap[item.id]) {
                    return this._dataContextMap[item.id].children;
                }

                return null;
            };

            ObjectTreeView.prototype.isItemExpanded = function (item) {
                return (this._dataContextMap[item.id] && this._dataContextMap[item.id].descendantCount > (item.htmlLines ? item.htmlLines.length - 1 : 0));
            };

            ObjectTreeView.prototype.isItemCollapsed = function (item) {
                return (this._dataContextMap[item.id] && this._dataContextMap[item.id].descendantCount <= (item.htmlLines ? item.htmlLines.length - 1 : 0));
            };

            ObjectTreeView.prototype.removeItem = function (item, preventRedraw) {
                if (!item) {
                    return;
                }

                var context = this._dataContextMap[item.id];
                if (context) {
                    var index = this.getIndexOfItem(this._filteredList, item);
                    if (index !== -1) {
                        this._filteredList.splice(index, context.expandedCount + 1);
                    }

                    var unfilteredIndex = this.getIndexOfItem(this._unfilteredList, item);
                    var removed = this._unfilteredList.splice(unfilteredIndex, context.descendantCount + 1);
                    for (var i = 0; i < removed.length; i++) {
                        var id = this.getItemId(removed[i]);
                        this._dataContextMap[id] = null;
                    }

                    var currentContext = context.parentContext;
                    if (currentContext && currentContext.children) {
                        var i = currentContext.children.indexOf(item);
                        if (i > -1) {
                            currentContext.children.splice(i, 1);
                        }

                        this.updateContextCounts(context, -(context.descendantCount + 1), -(context.expandedCount + 1));
                    }

                    var itemToSelect;
                    if (this._selectedIndex === index) {
                        itemToSelect = this.getItem(Math.min(index, this._filteredList.length - 1));
                    } else if (this._selectedIndex > index) {
                        itemToSelect = this.getItem(Math.min(this._selectedIndex - context.expandedCount, this._filteredList.length - 1));
                    }

                    if (itemToSelect) {
                        this.selectItem(itemToSelect);
                    }

                    this.requestRender(!preventRedraw);
                }
            };

            ObjectTreeView.prototype.scrollToBottom = function () {
                var _this = this;
                if (!this._delayedRenderCookie) {
                    this._rootElement.scrollTop = this._rootElement.scrollHeight;
                } else {
                    this._delayedScrollFunction = function () {
                        _this.scrollToBottom();
                    };
                }
            };

            ObjectTreeView.prototype.remeasure = function () {
                this._measurements.update();
                this.requestRender(true);
            };

            ObjectTreeView.prototype.refresh = function () {
                this.requestRender(true);
            };

            ObjectTreeView.prototype.clear = function () {
                if (this._delayedSelectCookie) {
                    clearTimeout(this._delayedSelectCookie);
                    this._delayedSelectCookie = null;
                }

                if (this._delayedFocusCookie) {
                    clearTimeout(this._delayedFocusCookie);
                    this._delayedFocusCookie = null;
                }

                this._dataContextMap = {};
                this._filteredList = [];
                this._unfilteredList = [];
                this._selectedIndex = -1;
                this._selectedRow = null;
                this._groupLineElement.style.display = "none";

                if (this._onUpdated) {
                    this._onUpdated(null);
                }

                this.executePendingRenderRequest(true);
            };

            ObjectTreeView.prototype.expandAllItems = function (rootIndex, filter) {
                var item = this.getItem(rootIndex);
                if (!item) {
                    return;
                }

                var rootContext = this._dataContextMap[item.id];
                if (rootContext) {
                    this.expandDescendants(rootContext.item, filter);
                }
            };

            ObjectTreeView.prototype.collapseAllItems = function (rootIndex) {
                var item = this.getItem(rootIndex);
                if (!item) {
                    return;
                }

                var rootContext = this._dataContextMap[item.id];
                if (rootContext) {
                    var item = rootContext.item;
                    if (this.isItemExpanded(item)) {
                        this.toggleRowAt(this.getIndexOfItem(this._filteredList, item));
                    }
                }
            };

            ObjectTreeView.prototype.getTreeViewItemIndent = function (index) {
                var indent = (-1);
                var item = this.getItem(index);
                if (item) {
                    indent = 0;
                    if (this._dataContextMap) {
                        var context = this._dataContextMap[item.id];
                        if (context) {
                            indent = this.getIndent(context);
                        }
                    }
                }

                return indent;
            };

            ObjectTreeView.prototype.getIndex = function (item) {
                return this.getIndexOfItem(this._filteredList, item);
            };

            ObjectTreeView.prototype.isAutoScrollToItemEnabled = function (item) {
                var isLastItem = false;

                var htmlLinesCount = 1;
                if (item && item.htmlLines) {
                    htmlLinesCount = item.htmlLines.length;
                }

                isLastItem = this.getIndex(item) === (this.getItemCount() - htmlLinesCount);

                if (this._scrollBottom >= this._measurements.rowHeight * Math.max(0, this._filteredList.length - htmlLinesCount)) {
                    this._autoScrollEnabled = true;
                }

                return this._autoScrollEnabled && isLastItem;
            };

            ObjectTreeView.prototype.onDOMAttrModified = function (evt) {
                if (evt.attrName === "aria-expanded") {
                    var element = evt.target;
                    var toExpand = evt.newValue === "true";
                    var currentExpanded = element.classList.contains("listview-grid-row-expanded");
                    var currentCollapsed = element.classList.contains("listview-grid-row-collapsed");
                    if ((toExpand && currentCollapsed) || (!toExpand && currentExpanded)) {
                        this.toggleRow(element);
                    }
                }
            };

            ObjectTreeView.prototype.addDOMAttrModifiedHandler = function (e) {
                e.addEventListener("DOMAttrModified", this.onDOMAttrModified.bind(this));
            };

            ObjectTreeView.prototype.initialize = function () {
                var _this = this;
                this._rootElement = DomHelpers.createElement("div", "listview");
                this._rootElement.setAttribute("tabindex", "1");
                this._rootElement.setAttribute("role", "tree");
                this._containerElement.appendChild(this._rootElement);

                this._spacerTopElement = DomHelpers.createElement("span", "listview-grid-content-spacer");
                this._rootElement.appendChild(this._spacerTopElement);
                this._rootElement.appendChild(DomHelpers.createElement("div", ""));

                this._gridElement = DomHelpers.createElement("div", "listview-grid");
                this._rootElement.appendChild(this._gridElement);

                this._groupLineElement = DomHelpers.createElement("div", "listview-grid-groupline");
                this._rootElement.appendChild(this._groupLineElement);

                this._separatorElement = DomHelpers.createElement("div", "listview-grid-separator");
                this._separatorElement.style.left = (ObjectTreeView.SeparatorOffset + this._nameColumnWidth) + "px";
                this._rootElement.appendChild(this._separatorElement);

                this._rootElement.appendChild(DomHelpers.createElement("div", ""));
                this._spacerBottomElement = DomHelpers.createElement("span", "listview-grid-content-spacer");
                this._rootElement.appendChild(this._spacerBottomElement);

                window.addEventListener("resize", function (e) {
                    return _this.onResize(e);
                });
                this._rootElement.addEventListener("scroll", function (e) {
                    return _this.onScroll(e);
                });
                this._rootElement.addEventListener("mousedown", function (e) {
                    return _this.onMouseDown(e);
                });
                this._rootElement.addEventListener("dblclick", function (e) {
                    return _this.onMouseDblClick(e);
                });
                this._rootElement.addEventListener("keydown", function (e) {
                    return _this.onKeyDown(e);
                });
                this._rootElement.addEventListener("copy", function (e) {
                    return _this.onCopy(e);
                });
                this._rootElement.addEventListener("focus", function (e) {
                    return _this.onFocus(e);
                }, true);
                this._rootElement.addEventListener("blur", function (e) {
                    return _this.onBlur(e);
                }, true);

                this._measurements = new Measurements();
                window.setTimeout(function () {
                    _this._measurements.update(_this._containerElement);
                }, 10);

                this.resetViewport();
                this._scrollHeight = 0;
                this._scrollBottom = this._rootElement.clientHeight + this._rootElement.scrollTop;

                this._dataContextMap = {};
                this._unfilteredList = [];
                this._filteredList = [];
                this._linesMap = {};

                this._errorLabel = Common.ToolWindowHelpers.loadString("SingleError", [""]);
                this._infoLabel = Common.ToolWindowHelpers.loadString("SingleMessage", [""]);
                this._warningLabel = Common.ToolWindowHelpers.loadString("SingleWarning", [""]);
                this._isStaleLabel = Common.ToolWindowHelpers.loadString("ConsoleStaleMessage");
            };

            ObjectTreeView.prototype.resetViewport = function () {
                this._currentViewport = { first: Number.MAX_VALUE, last: -1, scrollTop: 0, spaceTop: 0, spaceBottom: 0, unboundFirst: Number.MAX_VALUE, unboundLast: -1 };
            };

            ObjectTreeView.prototype.getViewportRowInfo = function () {
                var maxCount = Math.max(0, this._filteredList.length - 1);
                var rh = this._measurements.rowHeight;

                var maxTop = (maxCount + 2) * rh - this._rootElement.clientHeight;
                if (this._rootElement.scrollTop > maxTop) {
                    this._rootElement.scrollTop = maxTop;
                }

                var top = this._rootElement.scrollTop;
                var bottom = top + this._rootElement.clientHeight;

                var unboundFirst = Math.floor(top / rh) - this._scrollPadding;
                var unboundLast = Math.ceil(bottom / rh) + this._scrollPadding;

                var first = Math.min(maxCount, Math.max(0, unboundFirst));
                var last = Math.max(0, Math.min(maxCount, unboundLast));

                var spaceTop = Math.max(0, first * rh);
                var spaceBottom = Math.max(0, (maxCount - last) * rh);

                return {
                    first: first,
                    last: last,
                    scrollTop: top,
                    spaceTop: spaceTop,
                    spaceBottom: spaceBottom,
                    unboundFirst: unboundFirst,
                    unboundLast: unboundLast
                };
            };

            ObjectTreeView.prototype.sizeSpacer = function (spacerElement, height) {
                if (spacerElement.firstChild) {
                    spacerElement.removeChild(spacerElement.firstChild);
                }

                if (height < ObjectTreeView.MaxSpacerSize) {
                    spacerElement.style.height = height + "px";
                    spacerElement.style.display = "block";
                } else {
                    var fragment = document.createDocumentFragment();

                    spacerElement.style.height = "auto";
                    spacerElement.style.display = "inline";

                    var div = document.createElement("div");
                    div.style.height = (height % ObjectTreeView.MaxSpacerSize) + "px";
                    fragment.appendChild(div);

                    var count = Math.floor(height / ObjectTreeView.MaxSpacerSize);
                    for (var i = 0; i < count; i++) {
                        div = document.createElement("div");
                        div.style.height = ObjectTreeView.MaxSpacerSize + "px";
                        fragment.appendChild(div);
                    }

                    var span = document.createElement("span");
                    span.style.display = "inline-block";
                    span.appendChild(fragment);
                    spacerElement.appendChild(span);
                }
            };

            ObjectTreeView.prototype.requestRender = function (forceRedraw, selectNewIndex) {
                var _this = this;
                if (!this._delayedRenderCookie) {
                    this._delayedRenderCookie = this._renderFunction(function () {
                        return _this.executePendingRenderRequest(forceRedraw, selectNewIndex);
                    }, ObjectTreeView.DelayedRenderInterval);
                } else {
                    this._delayedRenderRequestCount++;
                }

                if (this._delayedRenderRequestCount > ObjectTreeView.MaxDelayedRenderRequestCount) {
                    if (this._delayedRenderCookie) {
                        window.clearTimeout(this._delayedRenderCookie);
                    }

                    this.executePendingRenderRequest(forceRedraw, selectNewIndex);
                }
            };

            ObjectTreeView.prototype.executePendingRenderRequest = function (forceRedraw, selectNewIndex) {
                if (this._onBeforeRendering) {
                    this._onBeforeRendering();
                }

                this._delayedRenderCookie = null;

                this._delayedRenderRequestCount = 0;
                this.performRender(forceRedraw, selectNewIndex);

                if (this._delayedScrollFunction) {
                    this._delayedScrollFunction();
                    this._delayedScrollFunction = null;
                }

                if (this._delayedSelectFunction) {
                    this._delayedSelectFunction();
                    this._delayedSelectFunction = null;
                }
            };

            ObjectTreeView.prototype.getLabelForAddedClasses = function (classes) {
                if (!classes) {
                    return "";
                }

                var result;

                if (classes.lastIndexOf("consoleItemError") >= 0) {
                    result = this._errorLabel;
                } else if (classes.lastIndexOf("consoleItemInfo") >= 0) {
                    result = this._infoLabel;
                } else if (classes.lastIndexOf("consoleItemWarn") >= 0) {
                    result = this._warningLabel;
                }

                if (result && classes.lastIndexOf("Stale") >= 0) {
                    result = this._isStaleLabel + " " + result;
                } else if (!result) {
                    result = "";
                }

                return result;
            };

            ObjectTreeView.prototype.performRender = function (forceRedraw, selectNewIndex) {
                var _this = this;
                this._ignoreScroll = true;

                var newViewport = this.getViewportRowInfo();

                this._gridElement.style.height = this._gridElement.clientHeight + "px";

                this.sizeSpacer(this._spacerTopElement, newViewport.spaceTop);
                this.sizeSpacer(this._spacerBottomElement, newViewport.spaceBottom);
                this._separatorElement.style.top = newViewport.scrollTop + "px";

                if (forceRedraw) {
                    while (this._gridElement.hasChildNodes()) {
                        var rowToRemove = this._gridElement.lastChild;

                        if (this._selectedRow === rowToRemove) {
                            if (this.isFocusWithin()) {
                                var scrollY = this._rootElement.scrollTop;
                                this._rootElement.focus();
                                this._rootElement.scrollTop = scrollY;
                            }

                            this._selectedRow = null;
                        }

                        this._gridElement.removeChild(rowToRemove);
                    }

                    this.resetViewport();
                }

                var fragmentTop = document.createDocumentFragment();
                var fragmentBottom = document.createDocumentFragment();

                for (var i = newViewport.first; i <= newViewport.last && i < this._filteredList.length; i++) {
                    if (i < this._currentViewport.first || i > this._currentViewport.last) {
                        var item = this.getItem(i);
                        if (!item) {
                            continue;
                        }

                        var context = this._dataContextMap[item.id];
                        var indent = this.getIndent(context);
                        var isSingleCell = (item.name === null || item.name === undefined);
                        var lineIndex = (item.htmlLines && item.htmlLines.length > 0 ? this.getLineIndex(this._filteredList[i]) : -1);
                        var isExpanded = (context.descendantCount > (item.htmlLines ? item.htmlLines.length - 1 : 0));
                        var isSelected = (this.getSelectedItem() === item);
                        var ariaLabel = "";

                        var itemClasses = "listview-grid-row" + (item.additionalClass ? " " + item.additionalClass : "");
                        var row = DomHelpers.createElement("div", itemClasses);
                        row.tabIndex = -1;
                        row.id = "row_" + i;
                        row.setAttribute("data-index", "" + i);
                        row.setAttribute("role", "treeitem");
                        row.style.height = (this._measurements.rowHeight) + "px";
                        if (isSelected) {
                            row.classList.add("listview-grid-row-selected");
                        }

                        var fragment = (i < this._currentViewport.first ? fragmentTop : fragmentBottom);
                        fragment.appendChild(row);

                        if (item.isSeparator) {
                            ariaLabel = item.value;
                            row.appendChild(DomHelpers.createElement("div", "listview-horizontal-separator"));
                        } else if (!isSingleCell) {
                            if (item.hasIcon) {
                                var iconCell = DomHelpers.createElement("div", "listview-grid-cell " + (lineIndex <= 0 ? "listview-grid-cell-icon" : "listview-grid-cell-icon-space"));
                                iconCell.style.position = "absolute";
                                iconCell.style.left = ((indent - 1) * ObjectTreeView.IndentWidth) + "px";
                                row.appendChild(iconCell);
                                if (lineIndex <= 0 && item.additionalClass) {
                                    ariaLabel = this.getLabelForAddedClasses(item.additionalClass) + " ";
                                }
                            }

                            var nameCell = DomHelpers.createElement("div", "listview-grid-cell listview-grid-cell-resize");
                            nameCell.innerText = (lineIndex <= 0 ? item.name : "");
                            if (lineIndex <= 0 && item.name) {
                                ariaLabel = ariaLabel + item.name + " ";
                            }

                            nameCell.style.textIndent = ((indent + 1) * ObjectTreeView.IndentWidth) + "px";
                            nameCell.style.width = this._nameColumnWidth + "px";
                            row.appendChild(nameCell);

                            if (item.hasChildren && (lineIndex === -1 || lineIndex === 0)) {
                                var treeIcon = DomHelpers.createElement("div", "listview-icon-tree");
                                treeIcon.classList.add(isExpanded ? "listview-icon-tree-expanded" : "listview-icon-tree-collapsed");
                                row.setAttribute("aria-expanded", isExpanded ? "true" : "false");
                                this.addDOMAttrModifiedHandler(row);
                                treeIcon.style.left = (indent * ObjectTreeView.IndentWidth + 3) + "px";
                                row.appendChild(treeIcon);
                            }

                            var valueCell = DomHelpers.createElement("div", "listview-grid-cell listview-grid-cell-value");
                            if (lineIndex === -1) {
                                valueCell.innerText = item.value;
                                ariaLabel = ariaLabel + item.value;
                            } else {
                                valueCell.innerHTML = item.htmlLines[lineIndex];
                                if (lineIndex === 0) {
                                    for (var labelLine = 0; labelLine < item.htmlLines.length; labelLine++) {
                                        ariaLabel = ariaLabel + (item.htmlLines[labelLine]).replace(/<[^>]*>/g, "") + " ";
                                    }
                                }
                            }

                            row.appendChild(valueCell);
                        } else {
                            var cellIndent = this._hasIndent ? (indent + (item.hasIcon ? -1 : 1)) : 0;

                            var indentCell = DomHelpers.createElement("div", "listview-grid-cell listview-grid-cell-indent");
                            indentCell.style.width = (cellIndent * ObjectTreeView.IndentWidth) + "px";
                            row.appendChild(indentCell);

                            if (item.hasIcon) {
                                var iconCell = DomHelpers.createElement("div", "listview-grid-cell " + (lineIndex <= 0 ? "listview-grid-cell-icon" : "listview-grid-cell-icon-space"));
                                if (lineIndex <= 0 && item.additionalClass) {
                                    ariaLabel = this.getLabelForAddedClasses(item.additionalClass) + " ";
                                }

                                row.appendChild(iconCell);
                            }

                            if (item.buttonItems) {
                                for (var index = 0; index < item.buttonItems.length; index++) {
                                    var button = item.buttonItems[index];
                                    var buttonCell = DomHelpers.createElement("div", "listview-grid-cell iconShell_16x16 " + button.buttonClass);
                                    buttonCell.setAttribute("listview-button-index", "" + index);

                                    var buttonDiv = DomHelpers.createElement("div", "buttonIcon icon_16x16" + (button.isChecked ? " checked" : ""));
                                    buttonCell.appendChild(buttonDiv);

                                    Common.ButtonHelpers.setupButton(buttonCell, button.isChecked ? button.checkedTooltip : button.uncheckedTooltip, button.clickHandler);

                                    row.appendChild(buttonCell);
                                }
                            }

                            if (item.hasChildren) {
                                if (item.hasIcon) {
                                    iconCell.style.marginRight = "16px";
                                    cellIndent += 2;
                                }

                                if (lineIndex === -1 || lineIndex === 0) {
                                    var treeIcon = DomHelpers.createElement("div", "listview-icon-tree");
                                    treeIcon.classList.add(isExpanded ? "listview-icon-tree-expanded" : "listview-icon-tree-collapsed");
                                    row.setAttribute("aria-expanded", isExpanded ? "true" : "false");
                                    this.addDOMAttrModifiedHandler(row);
                                    treeIcon.style.left = (cellIndent * ObjectTreeView.IndentWidth - 13) + "px";
                                    row.appendChild(treeIcon);
                                }
                            }

                            var valueCell = DomHelpers.createElement("div", "listview-grid-cell listview-grid-cell-full listview-grid-cell-value");
                            if (lineIndex === -1) {
                                valueCell.innerText = item.value;
                                ariaLabel = ariaLabel + item.value;
                            } else {
                                valueCell.innerHTML = item.htmlLines[lineIndex];
                                if (lineIndex === 0) {
                                    for (var labelLine = 0; labelLine < item.htmlLines.length; labelLine++) {
                                        ariaLabel = ariaLabel + (item.htmlLines[labelLine]).replace(/<[^>]*>/g, "") + " ";
                                    }
                                }

                                if (isSelected) {
                                    row.classList.add("listview-grid-row-selected");
                                }
                            }

                            row.appendChild(valueCell);
                        }

                        var list = row.querySelectorAll(".BPT-Tooltip-Item");
                        for (var j = 0; j < list.length; j++) {
                            var node = list[j];
                            if (node instanceof HTMLElement) {
                                node.addEventListener("mouseover", function (ev) {
                                    var tooltip = node.getAttribute("data-tooltip");
                                    Plugin.Host.getDocumentLocation(tooltip).done(function (loc) {
                                        Plugin.Tooltip.show({ content: loc });
                                    });
                                });
                            }
                        }

                        if (item.hasChildren) {
                            row.classList.add(isExpanded ? "listview-grid-row-expanded" : "listview-grid-row-collapsed");
                        }

                        if ((lineIndex === -1 || lineIndex === item.htmlLines.length - 1)) {
                            var currentContext = context;
                            var drawLine = item.hasSeparator;
                            var nextItemIsSeparator = (i < newViewport.last) && (this.getItem(i + 1).isSeparator);

                            if (!drawLine && context.parentContext) {
                                currentContext = context.parentContext;
                                while (currentContext && i === this.getIndexOfItem(this._filteredList, currentContext.item) + currentContext.expandedCount) {
                                    if (currentContext.item.hasSeparator) {
                                        drawLine = true;
                                        break;
                                    }

                                    currentContext = currentContext.parentContext;
                                }
                            }

                            if (drawLine && !nextItemIsSeparator) {
                                var lineIndent = this.getIndent(currentContext);
                                var underline = DomHelpers.createElement("div", "listview-grid-underline");
                                underline.style.left = ((lineIndent - 1) * ObjectTreeView.IndentWidth) + "px";
                                row.appendChild(underline);
                            }
                        }

                        row.setAttribute("aria-label", ariaLabel);
                    } else if (i === this._currentViewport.first) {
                        i = this._currentViewport.last;
                    }
                }

                for (var i = this._currentViewport.first; i <= this._currentViewport.last; i++) {
                    if (i < newViewport.first || i > newViewport.last) {
                        var row = document.getElementById("row_" + i);
                        if (row) {
                            if (this._selectedRow === row) {
                                if (this.isFocusWithin()) {
                                    var scrollY = this._rootElement.scrollTop;
                                    this._rootElement.focus();
                                    this._rootElement.scrollTop = scrollY;
                                }

                                this._selectedRow = null;
                            }

                            row.parentElement.removeChild(row);
                        }
                    } else if (i === newViewport.first) {
                        i = newViewport.last;
                    }
                }

                this._gridElement.insertBefore(fragmentTop, this._gridElement.firstChild);
                this._gridElement.appendChild(fragmentBottom);

                this._gridElement.style.height = "auto";

                if (!isNaN(selectNewIndex)) {
                    this._selectedIndex = selectNewIndex;
                    this._selectedRow = null;
                }

                var scrolledSelectedOutOfView = (this._selectedIndex >= 0) && (this._selectedIndex < newViewport.unboundFirst || this._selectedIndex > newViewport.unboundLast) && (this._selectedIndex >= this._currentViewport.unboundFirst && this._selectedIndex <= this._currentViewport.unboundLast);

                if (this._selectedIndex >= 0 && !this._selectedRow && !scrolledSelectedOutOfView) {
                    var toSelect = document.getElementById("row_" + this._selectedIndex);
                    if (toSelect) {
                        this._selectedRow = toSelect;
                    }

                    this.updateGroupLine();
                } else if (forceRedraw) {
                    this.updateGroupLine();
                }

                this._currentViewport = newViewport;

                this._ignoreScroll = false;

                setTimeout(function () {
                    if (_this._postRenderCallback) {
                        _this._postRenderCallback();
                        _this._postRenderCallback = null;
                    }
                });

                if (this._onRendered) {
                    this._onRendered();
                }

                this._rootElement.setAttribute("tabindex", this._filteredList.length > 0 ? "1" : "-1");
            };

            ObjectTreeView.prototype.getItemId = function (fullId) {
                var indexStart = fullId.lastIndexOf("::");
                if (indexStart > -1) {
                    fullId = fullId.substring(0, indexStart);
                }

                return fullId;
            };

            ObjectTreeView.prototype.getLineIndex = function (fullId) {
                var lineIndex = -1;
                if (fullId) {
                    var indexStart = fullId.lastIndexOf("::");
                    if (indexStart > -1) {
                        lineIndex = parseInt(fullId.substring(indexStart + 2), 10);
                    }
                }

                return lineIndex;
            };

            ObjectTreeView.prototype.getIndexOfItem = function (list, item, lastLineOfInput) {
                if (typeof lastLineOfInput === "undefined") { lastLineOfInput = true; }
                var rootLineId = this.getItemId(item.id);
                if (item.additionalClass === "consoleItemInput" && lastLineOfInput) {
                    rootLineId = rootLineId + (item.htmlLines && item.htmlLines.length > 0 ? ("::" + (item.htmlLines.length - 1).toString()) : "");
                } else {
                    rootLineId = rootLineId + (item.htmlLines && item.htmlLines.length > 0 ? "::0" : "");
                }

                return list.indexOf(rootLineId);
            };

            ObjectTreeView.prototype.getItem = function (index) {
                if (index >= 0 && index < this._filteredList.length) {
                    var id = this.getItemId(this._filteredList[index]);
                    if (this._dataContextMap[id]) {
                        return this._dataContextMap[id].item;
                    }
                }

                return null;
            };

            ObjectTreeView.prototype.isFocusWithin = function () {
                return (this._rootElement.querySelectorAll(":focus").length > 0);
            };

            ObjectTreeView.prototype.scrollIndexIntoView = function (index, alignToTop) {
                if (!document.getElementById("row_" + index) || alignToTop || index < this._currentViewport.unboundFirst + this._scrollPadding || index >= this._currentViewport.unboundLast - this._scrollPadding - 1) {
                    if (alignToTop) {
                        this._rootElement.scrollTop = Math.min((this._filteredList.length * this._measurements.rowHeight) - this._rootElement.clientHeight, index * this._measurements.rowHeight);
                    } else {
                        var item = this.getItem(index);
                        var htmlLinesCount = 1;
                        if (item && item.htmlLines) {
                            htmlLinesCount = item.htmlLines.length;
                        }

                        this._rootElement.scrollTop = ((index + htmlLinesCount + 1) * this._measurements.rowHeight) - this._rootElement.clientHeight;
                    }

                    this.performRender();
                }
            };

            ObjectTreeView.prototype.getIndent = function (context) {
                if (!this._hasIndent) {
                    return 0;
                }

                var indent = (context.item.hasIcon ? 1 : 0);
                while (context && context.parentContext) {
                    context = context.parentContext;
                    indent += (context.item.hasIcon ? 2 : 1);
                }

                return indent;
            };

            ObjectTreeView.prototype.updateGroupLine = function () {
                var setLineHeight = false;

                if (this._selectedIndex >= 0 && this._selectedIndex < this._filteredList.length) {
                    var item = this.getItem(this._selectedIndex);
                    if (item) {
                        var context = this._dataContextMap[item.id];
                        if (context && context.expandedCount > (item.htmlLines ? item.htmlLines.length - 1 : 0)) {
                            this._groupLineElement.style.display = "inline-block";
                            this._groupLineElement.style.top = (this._selectedIndex * this._measurements.rowHeight + this._measurements.rowHeight) + "px";
                            this._groupLineElement.style.left = ((this.getIndent(context) + 1) * ObjectTreeView.IndentWidth - 4) + "px";
                            this._groupLineElement.style.height = (context.expandedCount * this._measurements.rowHeight + 1) + "px";
                            setLineHeight = true;
                        }
                    }
                }

                if (!setLineHeight) {
                    this._groupLineElement.style.display = "none";
                }
            };

            ObjectTreeView.prototype.updateContextCounts = function (context, descentantCountChange, expandedCountChange) {
                var currentContext = context;
                while (currentContext) {
                    currentContext.descendantCount += descentantCountChange;
                    currentContext.expandedCount += expandedCountChange;
                    currentContext = currentContext.parentContext;
                }
            };

            ObjectTreeView.prototype.spliceArray = function (array, toAdd, insertAt) {
                var args;
                var limit = 200000;
                var parts = ~~(toAdd.length / limit);
                for (var i = 0; i < parts; i++) {
                    var start = (i * limit);
                    args = [insertAt + start, 0].concat(toAdd.slice(start, limit));
                    Array.prototype.splice.apply(array, args);
                }

                var mod = toAdd.length % limit;
                if (mod > 0) {
                    args = [insertAt + (toAdd.length - mod), 0].concat(toAdd.slice((toAdd.length - mod), toAdd.length));
                    Array.prototype.splice.apply(array, args);
                }
            };

            ObjectTreeView.prototype.moveSelectionUp = function (toParent) {
                if (toParent) {
                    var index = parseInt(this._selectedRow.getAttribute("data-index"), 10);
                    var item = this.getItem(index);
                    var context = this._dataContextMap[item.id];
                    if (context.parentContext) {
                        this.selectItem(context.parentContext.item);
                    }
                } else {
                    var up = this._selectedIndex - 1;
                    if (up >= 0 && up < this._filteredList.length) {
                        this.selectItem(this.getItem(up));
                    }
                }
            };

            ObjectTreeView.prototype.moveSelectionDown = function () {
                var item = this.getSelectedItem();
                var down = this._selectedIndex + (item.htmlLines && item.htmlLines.length > 0 ? item.htmlLines.length : 1);
                if (down >= 0 && down < this._filteredList.length) {
                    this.selectItem(this.getItem(down));
                }
            };

            ObjectTreeView.prototype.onDocumentMouseMove = function (e) {
                var diff = e.clientX - this._separatorStartX;
                this._nameColumnWidth = Math.max(ObjectTreeView.MinColumnSize, this._nameColumnWidth + diff);

                this._separatorElement.style.left = (ObjectTreeView.SeparatorOffset + this._nameColumnWidth) + "px";

                this._separatorStartX = Math.max(ObjectTreeView.MinColumnSize, e.clientX);

                return true;
            };

            ObjectTreeView.prototype.onDocumentMouseUp = function (e) {
                this._separatorElement.classList.remove("listview-grid-separator-visible");

                var nameCells = this._gridElement.querySelectorAll(".listview-grid-cell-resize");
                for (var i = 0; i < nameCells.length; i++) {
                    nameCells.item(i).style.width = this._nameColumnWidth + "px";
                }

                var fullSpanningCells = this._gridElement.querySelectorAll(".listview-grid-cell-full-content");
                for (var i = 0; i < fullSpanningCells.length; i++) {
                    fullSpanningCells.item(i).style.left = -this._nameColumnWidth + "px";
                }

                document.removeEventListener("mousemove", this._boundDocMouseMoveCallback);
                document.removeEventListener("mouseup", this._boundDocMouseUpCallback);

                return true;
            };

            ObjectTreeView.prototype.onMouseDown = function (e) {
                var _this = this;
                var target = e.target;
                var clicked = DomHelpers.findClosestElement(target, ".listview-grid-row, .listview-grid-separator");

                if (clicked) {
                    if (clicked.classList.contains("listview-grid-row")) {
                        this.selectRow(clicked, true);
                        if (target.classList.contains("listview-grid-cell-clicksection") && this._clickCallback) {
                            var index = parseInt(clicked.getAttribute("data-index"), 10);
                            var item = this.getItem(index);
                            if (item) {
                                this._clickCallback(item, clicked, target, e.button);
                            }
                        }

                        if (target.classList.contains("listview-icon-tree") && e.which === 1) {
                            clicked.focus();
                            this.toggleRow(clicked);
                        }
                    } else {
                        this._separatorStartX = e.clientX;
                        this._separatorElement.classList.add("listview-grid-separator-visible");
                        this._boundDocMouseMoveCallback = function (e) {
                            return _this.onDocumentMouseMove(e);
                        };
                        this._boundDocMouseUpCallback = function (e) {
                            return _this.onDocumentMouseUp(e);
                        };
                        document.addEventListener("mousemove", this._boundDocMouseMoveCallback);
                        document.addEventListener("mouseup", this._boundDocMouseUpCallback);
                    }
                }
            };

            ObjectTreeView.prototype.onMouseDblClick = function (e) {
                var target = e.target;
                var row = DomHelpers.findClosestElement(target, ".listview-grid-row");

                if (row && e.which === 1) {
                    if (target.classList.contains("listview-grid-cell-editsection") && this._editCallback) {
                        var index = parseInt(row.getAttribute("data-index"), 10);
                        var item = this.getItem(index);
                        this._editCallback(item, row, target);
                    } else if (!target.classList.contains("listview-icon-tree")) {
                        this.toggleRow(row);
                    }
                }
            };

            ObjectTreeView.prototype.onKeyDown = function (e) {
                if ((e.keyCode >= 37 /* ArrowFirst */ && e.keyCode <= 40 /* ArrowLast */) || e.keyCode === 109 /* Minus */ || e.keyCode === 107 /* Plus */) {
                    if (this._selectedIndex >= 0) {
                        if (!this._selectedRow) {
                            this.scrollIndexIntoView(this._selectedIndex, true);
                            var row = document.getElementById("row_" + this._selectedIndex);
                            if (row) {
                                this.selectRow(row, false);
                            }
                        }

                        if (!this._selectedRow) {
                            return true;
                        }

                        var index = parseInt(this._selectedRow.getAttribute("data-index"), 10);
                        var item = this.getItem(index);

                        if (!item) {
                            return true;
                        }

                        var context = this._dataContextMap[item.id];
                        var isExpanded = (context.descendantCount > (item.htmlLines ? item.htmlLines.length - 1 : 0));

                        switch (event.keyCode) {
                            case 109 /* Minus */:

                            case 37 /* ArrowLeft */:
                                if (this._hasIndent) {
                                    if (isExpanded) {
                                        this.toggleRow(this._selectedRow);
                                    } else {
                                        var parent = context.parentContext;
                                        if (parent && parent.item && this.getIndex(parent.item) >= 0) {
                                            this.selectItem(parent.item);
                                        }
                                    }
                                }

                                break;

                            case 38 /* ArrowUp */:
                                this.moveSelectionUp();
                                break;
                            case 107 /* Plus */:

                            case 39 /* ArrowRight */:
                                if (!isExpanded) {
                                    this.toggleRow(this._selectedRow);
                                }

                                break;

                            case 40 /* ArrowDown */:
                                this.moveSelectionDown();
                                break;
                        }
                    }

                    e.preventDefault();
                    return false;
                } else if (e.keyCode === 65 /* A */ && e.ctrlKey) {
                    e.preventDefault();
                    return false;
                } else if (e.keyCode === 32 /* Space */) {
                    e.preventDefault();
                    return false;
                } else if (e.keyCode === 9 /* Tab */) {
                    this._isTabbingOut = true;
                    this._rootElement.focus();
                } else if (e.keyCode === 67 /* C */ && Common.HasOnlyCtrlKeyFlags(e)) {
                    var textToCopy = window.getSelection().toString();
                    if (!textToCopy || textToCopy.length === 0) {
                        var selectedItem = this.getSelectedItem();
                        if (selectedItem && selectedItem.getCopyText) {
                            clipboardData.setData("Text", selectedItem.getCopyText());
                            e.preventDefault();
                            return false;
                        }
                    }
                }
            };

            ObjectTreeView.prototype.onFocus = function (e) {
                var _this = this;
                this._rootElement.classList.add("listview-grid-focus-within");

                if (e.target === this._rootElement && this._selectedRow && !this._isTabbingOut) {
                    if (!this._delayedFocusCookie) {
                        this._delayedFocusCookie = window.setTimeout(function () {
                            var scrollLeftPosition = _this._rootElement.scrollLeft;
                            var scrollTop = _this._rootElement.scrollTop;
                            if (_this._selectedRow) {
                                _this._selectedRow.focus();
                            }

                            _this._rootElement.scrollLeft = scrollLeftPosition;
                            _this._rootElement.scrollTop = scrollTop;
                            clearTimeout(_this._delayedFocusCookie);
                            _this._delayedFocusCookie = null;
                        }, ObjectTreeView.DelayedRenderInterval);
                    }
                }

                this._isTabbingOut = false;
            };

            ObjectTreeView.prototype.onBlur = function (e) {
                this._rootElement.classList.remove("listview-grid-focus-within");
            };

            ObjectTreeView.prototype.onResize = function (e) {
                this.requestRender(this._isInitialResize);
                this._isInitialResize = false;
                this._rootElement.scrollTop = this._scrollBottom - this._rootElement.clientHeight;
            };

            ObjectTreeView.prototype.onScroll = function (e) {
                if (!this._ignoreScroll) {
                    if (this._onBeforeScroll) {
                        this._onBeforeScroll();
                    }

                    var newScrollBottom = this._rootElement.clientHeight + this._rootElement.scrollTop;
                    var totalFilteredListHeight = this._measurements.rowHeight * this._filteredList.length;

                    if (this._filteredList.length > 0 && newScrollBottom > (this._filteredList.length - 1) * this._measurements.rowHeight) {
                        newScrollBottom = totalFilteredListHeight;
                    }

                    if (newScrollBottom < this._scrollBottom) {
                        this._autoScrollEnabled = false;
                    } else if (!this._autoScrollEnabled) {
                        this._autoScrollEnabled = newScrollBottom >= totalFilteredListHeight;
                    }

                    if (newScrollBottom !== this._scrollBottom) {
                        this._scrollBottom = newScrollBottom;
                        if (totalFilteredListHeight > this._rootElement.clientHeight) {
                            this.requestRender();
                        }
                    }

                    if (this._onScrollCompleted) {
                        this._onScrollCompleted();
                    }
                }
            };

            ObjectTreeView.prototype.onCopy = function (e) {
                var selectedText = Common.ToolWindowHelpers.getSelectedText();
                if (selectedText) {
                    var compactText = selectedText.replace(/[\r\n]+/g, "\r\n");

                    clipboardData.setData("Text", compactText);
                }

                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            };

            ObjectTreeView.prototype.expandDescendants = function (item, filter) {
                if (filter && filter(item)) {
                    if (this.isItemExpanded(item)) {
                        this.toggleRowAt(this.getIndexOfItem(this._filteredList, item));
                    }

                    return;
                }

                if (!this.isItemExpanded(item)) {
                    this._toggleCallback(item);
                }

                if (item.hasChildren) {
                    var children = this.getItemChildren(item);
                    for (var i = 0; i < children.length; i++) {
                        this.expandDescendants(children[i], filter);
                    }
                }
            };

            ObjectTreeView.prototype.separatorFilter = function (item, previousItem) {
                if (!item || !previousItem) {
                    return true;
                } else if (item.isSeparator && previousItem.isSeparator) {
                    return false;
                }

                return true;
            };
            ObjectTreeView.DefaultColumnSize = 170;
            ObjectTreeView.IndentWidth = 16;
            ObjectTreeView.MaxSpacerSize = 1500000;
            ObjectTreeView.MinColumnSize = 50;
            ObjectTreeView.SeparatorOffset = 8;

            ObjectTreeView.MaxDelayedRenderRequestCount = 500;
            ObjectTreeView.DelayedRenderInterval = 50;

            ObjectTreeView.EXPAND_ROW = 1;
            ObjectTreeView.COLLAPSE_ROW = -1;
            return ObjectTreeView;
        })();
        ObjectView.ObjectTreeView = ObjectTreeView;
    })(Common.ObjectView || (Common.ObjectView = {}));
    var ObjectView = Common.ObjectView;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ObjectView/objectTreeView.js.map

// treeViewUtilities.ts
var Common;
(function (Common) {
    (function (ObjectView) {
        "use strict";

        var TreeViewUtils = (function () {
            function TreeViewUtils() {
            }
            TreeViewUtils.getDetailedTypeOf = function (value, constructors) {
                if (value === undefined) {
                    return "undefined";
                }

                var type = (typeof value);
                if (type === "object" && constructors) {
                    if (value) {
                        for (var i = 0; i < constructors.length; i++) {
                            var arrayCon = (constructors[i] && constructors[i].array ? constructors[i].array : (new Array()).constructor);
                            var dateCon = (constructors[i] && constructors[i].date ? constructors[i].date : (new Date()).constructor);
                            var regexCon = (constructors[i] && constructors[i].regex ? constructors[i].regex : (new RegExp("")).constructor);

                            try  {
                                if (value.constructor === arrayCon) {
                                    return "array";
                                } else if (value.constructor === dateCon) {
                                    return "date";
                                } else if (value.constructor === regexCon) {
                                    return "regex";
                                }
                            } catch (e) {
                            }
                        }
                    } else {
                        return "null";
                    }

                    return "object";
                }

                return type;
            };

            TreeViewUtils.getVisibleHtmlElementText = function (element) {
                if ($m(element).is(":visible")) {
                    if (element.nodeType === 3) {
                        return element.nodeValue;
                    }

                    var visibleText = "", i = 0;
                    while (element.childNodes[i]) {
                        visibleText += TreeViewUtils.getVisibleHtmlElementText(element.childNodes[i]);
                        i++;
                    }

                    return visibleText;
                }

                return "";
            };

            TreeViewUtils.createPadding = function (levels, singleLevelPadding) {
                if (levels === 0) {
                    return "";
                }

                var padding = "";
                for (var i = 0; i < levels; i++) {
                    padding += singleLevelPadding;
                }

                return padding;
            };

            TreeViewUtils.getIndentedObjectString = function (obj, detailedType, stringPadding, indentString, newLineString, useEncodeHtml, useTrim) {
                var text = "";
                var objectString = "" + obj;
                if ((/\S/).test(objectString)) {
                    var indentCount = 0;

                    var finalLines = [];
                    if (detailedType === "string") {
                        if (useEncodeHtml) {
                            objectString = Common.EncodingUtilities.escapeHtml(objectString);
                        }

                        text = objectString.replace(/(\r\n|\n\r|\r|\n)/g, newLineString);
                    } else {
                        var lines = objectString.replace(/^\s+|\s+$/g, "").split(/[\r\n]+/);
                        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                            if (lines[lineIndex] !== "") {
                                var indent = "";

                                var lineText = lines[lineIndex];
                                if (useEncodeHtml) {
                                    lineText = Common.EncodingUtilities.escapeHtml(lineText);
                                }

                                lineText = lineText.replace(/^\s+|\s+$/g, "");

                                if (detailedType === "function") {
                                    if ((/^\}/).test(lineText)) {
                                        indentCount--;
                                    }

                                    for (var i = 0; i < indentCount; i++) {
                                        indent += indentString;
                                    }

                                    if ((/\{$/).test(lineText)) {
                                        indentCount++;
                                    }
                                }

                                finalLines.push(indent + lineText);
                            }
                        }

                        var lineBreaks = newLineString;

                        if (detailedType === "function" && finalLines.length === 3) {
                            finalLines[1] = finalLines[1].replace(/^(&nbsp;)+/, "").replace(/^\s+|\s+$/g, "");
                            finalLines[2] = finalLines[2].replace(/^\s+|\s+$/g, "");
                            lineBreaks = " ";
                        }

                        text = finalLines.join(lineBreaks);
                    }
                }

                return text;
            };

            TreeViewUtils.propertyNameCompare = function (a, b) {
                var aValue;
                var bValue;
                if (!isNaN(aValue = parseInt(a, 10)) && !isNaN(bValue = parseInt(b, 10))) {
                    return aValue - bValue;
                } else {
                    var al = a.toLowerCase();
                    var bl = b.toLowerCase();
                    if (al === bl) {
                        return TreeViewUtils.stringValueCompare(a, b);
                    } else {
                        return TreeViewUtils.stringValueCompare(al, bl);
                    }
                }
            };

            TreeViewUtils.stringValueCompare = function (a, b) {
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            };
            TreeViewUtils.ConsoleNotifyType = {
                assert: "consoleItemError",
                error: "consoleItemError",
                info: "consoleItemInfo",
                log: "consoleItemLog",
                warn: "consoleItemWarn",
                internalMessage: "internalMessage"
            };

            TreeViewUtils.ConsoleInternalMessage = {
                startGroup: "startGroup",
                startGroupCollapsed: "startGroupCollapsed",
                endGroup: "endGroup",
                displayTraceStyles: "displayTraceStyles"
            };

            TreeViewUtils.ConsoleUITypeStrings = {
                functionName: "[function]",
                objectName: "[object]",
                arrayName: "[array]",
                emptyArray: " [ ]",
                emptyObject: " { }",
                expandableArray: " [...]",
                expandableObject: " {...}"
            };

            TreeViewUtils.ConsoleFilterId = {
                all: -1,
                error: 0,
                warning: 1,
                message: 2,
                log: 3
            };
            return TreeViewUtils;
        })();
        ObjectView.TreeViewUtils = TreeViewUtils;

        var TreeViewValueStringBuilder = (function () {
            function TreeViewValueStringBuilder() {
            }
            TreeViewValueStringBuilder.createValueString = function (properties, detailedType, incomplete) {
                if (typeof incomplete === "undefined") { incomplete = false; }
                if (!properties || typeof (properties) !== "object") {
                    return;
                }

                var valueString;
                var isFirstProperty = true;

                var headToken = "<span>";
                var appendPropertyName;
                var tailToken = "</span>";

                switch (detailedType) {
                    case "object":
                        headToken = headToken + "{";
                        appendPropertyName = true;
                        tailToken = "}" + tailToken;
                        break;
                    case "array":
                        headToken = headToken + "[";
                        appendPropertyName = false;
                        tailToken = "]" + tailToken;
                        properties = properties.filter(function (element, index, array) {
                            return !isNaN(parseInt(element.propertyName, 10));
                        });
                        break;
                    default:
                        return;
                }

                valueString = headToken;

                for (var i = 0; i < properties.length; i++) {
                    if (properties[i].propertyName.substr(0, 2) === "__" || properties[i].propertyName === "[functions]") {
                        continue;
                    }

                    if (!isFirstProperty) {
                        valueString += ", ";
                    }

                    isFirstProperty = false;
                    if (appendPropertyName) {
                        valueString += TreeViewValueStringBuilder.createPropertyNameToken(properties[i]);
                        valueString += ": ";
                    }

                    valueString += TreeViewValueStringBuilder.createPropertyValueToken(properties[i]);

                    if (i > 20) {
                        incomplete = true;
                        break;
                    }
                }

                if (incomplete) {
                    tailToken = " ..." + tailToken;
                }

                valueString = valueString + tailToken;
                return valueString;
            };

            TreeViewValueStringBuilder.createPropertyValueString = function (propertyValue, obj) {
                try  {
                    switch (propertyValue.detailedType) {
                        case "array":
                            var delimiterIndex = propertyValue.value.indexOf(":");

                            if (delimiterIndex !== -1) {
                                return "Array[" + Common.EncodingUtilities.escapeHtml(obj.length) + "]";
                                break;
                            }

                        case "object":
                            var delimiterIndex = propertyValue.name.indexOf(" ");
                            if (delimiterIndex !== -1) {
                                return (propertyValue.name.substr(delimiterIndex + 1, propertyValue.name.length - delimiterIndex - 2)) + " {...}";
                                break;
                            }
                    }
                } catch (ex) {
                }

                return propertyValue.detailedType;
            };

            TreeViewValueStringBuilder.formatPropertyValueString = function (valueString) {
                if (valueString && typeof (valueString) === "string") {
                    var newValueString = valueString.length > 15 ? valueString.substr(0, 12) + "...\"" : valueString;
                    newValueString = String.prototype.replace.call(newValueString, /(\r\n|\n\r|\r|\n)/g, "  ");
                    newValueString = Common.EncodingUtilities.escapeHtml(newValueString);
                    return newValueString;
                }

                return valueString;
            };

            TreeViewValueStringBuilder.createPropertyValueToken = function (property) {
                var className;
                switch (property.propertyValue.detailedType) {
                    case "undefined":
                        className = "valueStringToken-Undefined";
                        break;
                    case "null":
                        className = "valueStringToken-Null";
                        break;
                    case "boolean":
                        className = "valueStringToken-Boolean";
                        break;
                    case "number":
                        className = "valueStringToken-Number";
                        break;
                    case "string":
                        className = "valueStringToken-String";
                        break;
                    case "function":
                        className = "valueStringToken-Function";
                        break;
                    case "array":
                        className = "valueStringToken-Array";
                        break;
                    case "object":
                        className = "valueStringToken-Object";
                        break;
                    default:
                        className = "valueStringToken-Default";
                }

                return "<span class ='" + className + "'>" + property.propertyValue.valueString + "</span>";
            };

            TreeViewValueStringBuilder.createPropertyNameToken = function (property) {
                var className = "valueStringToken-PropertyName";
                var escapedPropertyName = Common.EncodingUtilities.escapeHtml(property.propertyName);
                return "<span class ='" + className + "'>" + escapedPropertyName + "</span>";
            };
            return TreeViewValueStringBuilder;
        })();
        ObjectView.TreeViewValueStringBuilder = TreeViewValueStringBuilder;

        var TreeViewStringFormatter = (function () {
            function TreeViewStringFormatter() {
            }
            TreeViewStringFormatter.formatConsoleMessage = function () {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                var regex = /%%|%([sbxXideEfF])/g;

                var argumentIndex = 0;

                var formatString = TreeViewStringFormatter.convertToString(args[argumentIndex++]);

                var getReplacementString = function (matchedValue) {
                    if (argumentIndex >= args.length) {
                        return matchedValue;
                    }

                    switch (matchedValue) {
                        case "%%":
                            return "%";
                            break;
                        case "%d":
                        case "%i":
                            return TreeViewStringFormatter.convertToInteger(args[argumentIndex++]);
                            break;
                        case "%f":
                            return TreeViewStringFormatter.convertToNumber(args[argumentIndex++]);
                            break;
                        case "%s":
                            return TreeViewStringFormatter.convertToString(args[argumentIndex++]);
                            break;
                        case "%b":
                            return TreeViewStringFormatter.convertToBase(args[argumentIndex++], 2);
                            break;
                        case "%x":
                        case "%X":
                            return TreeViewStringFormatter.convertToBase(args[argumentIndex++], 16);
                            break;
                        case "%E":
                        case "%e":
                            return TreeViewStringFormatter.convertToExponential(args[argumentIndex++]);
                            break;
                        default:
                            return matchedValue;
                    }
                };

                var result = formatString.replace(regex, getReplacementString);

                for (var i = argumentIndex; i < args.length; i++) {
                    result = (result.length > 0) ? (result + " " + TreeViewStringFormatter.convertToString(args[i])) : (TreeViewStringFormatter.convertToString(args[i]));
                }

                return result.slice(0, 1024);
            };

            TreeViewStringFormatter.convertToString = function (value) {
                var result;

                try  {
                    if (value === undefined || value === null) {
                        result = String(value);
                    } else {
                        result = value.toString();
                        if (typeof (result) !== "string") {
                            result = "[object Object]";
                        }
                    }
                } catch (e) {
                    result = "[object Object]";
                }

                return result;
            };

            TreeViewStringFormatter.convertToInteger = function (value) {
                var numericValue = TreeViewStringFormatter.convertToNumber(value);

                if (isNaN(numericValue)) {
                    return numericValue.toString();
                }

                return Math.round(numericValue - numericValue % 1).toString();
            };

            TreeViewStringFormatter.convertToBase = function (value, base) {
                var numericValue = TreeViewStringFormatter.convertToNumber(value);

                if (isNaN(numericValue)) {
                    return numericValue.toString();
                }

                var prefix = {
                    "2": "0b",
                    "8": "0",
                    "16": "0x"
                }[base] || "";

                return prefix.toString() + ((numericValue < 0) ? (numericValue >>> 0).toString(base) : numericValue.toString(base));
            };

            TreeViewStringFormatter.convertToExponential = function (value) {
                var numericValue = TreeViewStringFormatter.convertToNumber(value);

                if (isNaN(numericValue)) {
                    return numericValue.toString();
                }

                return numericValue.toExponential();
            };

            TreeViewStringFormatter.convertToNumber = function (value) {
                return (isNaN(value) || value === null) ? Number(TreeViewStringFormatter.convertToString(value)) : Number(value);
            };
            return TreeViewStringFormatter;
        })();
        ObjectView.TreeViewStringFormatter = TreeViewStringFormatter;
    })(Common.ObjectView || (Common.ObjectView = {}));
    var ObjectView = Common.ObjectView;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ObjectView/treeViewUtilities.js.map

// treeViewItems.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (ObjectView) {
        "use strict";

        (function (TreeViewNotifyType) {
            TreeViewNotifyType[TreeViewNotifyType["None"] = 0] = "None";
            TreeViewNotifyType[TreeViewNotifyType["Assert"] = 1] = "Assert";
            TreeViewNotifyType[TreeViewNotifyType["Error"] = 2] = "Error";
            TreeViewNotifyType[TreeViewNotifyType["Info"] = 3] = "Info";
            TreeViewNotifyType[TreeViewNotifyType["Log"] = 4] = "Log";
            TreeViewNotifyType[TreeViewNotifyType["Warn"] = 5] = "Warn";
        })(ObjectView.TreeViewNotifyType || (ObjectView.TreeViewNotifyType = {}));
        var TreeViewNotifyType = ObjectView.TreeViewNotifyType;

        (function (ViewableTypeFlags) {
            ViewableTypeFlags[ViewableTypeFlags["Object"] = 1] = "Object";
            ViewableTypeFlags[ViewableTypeFlags["Html"] = 2] = "Html";
        })(ObjectView.ViewableTypeFlags || (ObjectView.ViewableTypeFlags = {}));
        var ViewableTypeFlags = ObjectView.ViewableTypeFlags;

        var TreeViewItem = (function () {
            function TreeViewItem(value, hasChildren, hasIcon, hasSeparator, name, additionalClass, htmlLines, fullHtmlLines, notifyType) {
                if (typeof notifyType === "undefined") { notifyType = 0 /* None */; }
                this._id = TreeViewItem.IdCounter++;
                this._name = name;
                this._value = value;
                this._hasChildren = hasChildren;
                this._hasIcon = hasIcon;
                this._hasSeparator = hasSeparator;
                this._additionalClass = additionalClass;
                this._htmlLines = htmlLines;
                this._fullHtmlLines = fullHtmlLines;
                this._buttonItems = null;
                this._notifyType = notifyType;
            }
            Object.defineProperty(TreeViewItem.prototype, "id", {
                get: function () {
                    return "" + this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "engine", {
                get: function () {
                    return this._engine;
                },
                set: function (value) {
                    this._engine = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewItem.prototype, "isStale", {
                get: function () {
                    return this._isStale;
                },
                set: function (value) {
                    if (this._isStale) {
                        return;
                    }

                    this._isStale = value;

                    if (this._isStale) {
                        var additionalClass;
                        switch (this._notifyType) {
                            case 2 /* Error */:
                                additionalClass = " consoleItemErrorStale";
                                break;
                            case 3 /* Info */:
                                additionalClass = " consoleItemInfoStale";
                                break;
                            case 5 /* Warn */:
                                additionalClass = " consoleItemWarnStale";
                                break;
                        }

                        this._additionalClass += additionalClass;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "notifyType", {
                get: function () {
                    return this._notifyType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "value", {
                get: function () {
                    return this._value;
                },
                set: function (val) {
                    this._value = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "hasChildren", {
                get: function () {
                    return this._hasChildren;
                },
                set: function (value) {
                    this._hasChildren = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "hasIcon", {
                get: function () {
                    return this._hasIcon;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "buttonItems", {
                get: function () {
                    return this._buttonItems;
                },
                set: function (value) {
                    this._buttonItems = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "hasSeparator", {
                get: function () {
                    return this._hasSeparator;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "additionalClass", {
                get: function () {
                    return this._additionalClass;
                },
                set: function (value) {
                    this._additionalClass = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "htmlLines", {
                get: function () {
                    return this._htmlLines;
                },
                set: function (lines) {
                    if (this._htmlLines) {
                        if (this._htmlLines.length !== lines.length) {
                            throw new Error("The number of lines cannot be changed for a TreeView item after initialization");
                        }
                    }

                    this._htmlLines = lines;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TreeViewItem.prototype, "consoleItemId", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });

            TreeViewItem.encodeValueForListItem = function (value, detailedType, isExpandable, limitToSingleLine, appendEllipses) {
                if (typeof appendEllipses === "undefined") { appendEllipses = true; }
                var text = "";
                var htmlLines = null;

                if (!detailedType) {
                    detailedType = Common.ObjectView.TreeViewUtils.getDetailedTypeOf(value);
                }

                switch (detailedType) {
                    case "array":
                        text = (value || Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.arrayName);
                        if (appendEllipses) {
                            text += (isExpandable ? Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.expandableArray : Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.emptyArray);
                        }

                        break;

                    case "object":
                        text = (value || Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.objectName);
                        if (appendEllipses) {
                            text += (isExpandable ? Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.expandableObject : Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.emptyObject);
                        }

                        break;

                    case "null":
                        text = "null";
                        break;

                    case "undefined":
                        text = "undefined";
                        break;

                    default:
                        text = "" + value;
                        htmlLines = TreeViewItem.getHtmlTextLines(text, detailedType);

                        if (detailedType !== "string" && htmlLines.length === 1) {
                            text = Common.EncodingUtilities.unescapeHtml(htmlLines[0]);
                            htmlLines = null;
                        } else if (limitToSingleLine && htmlLines.length > 1) {
                            text = TreeViewItem.getFirstLine(value);
                            htmlLines.splice(0, 0, "<span class ='Console-ExpandableString listview-grid-cell-clicksection'>" + htmlLines[0].replace("<pre>", "").replace("</pre>", "") + "<span class='Console-ExpandableLines listview-grid-cell-clicksection'> ...</span></span>");
                            text += " ...";
                        }

                        break;
                }

                return { value: text, htmlLines: htmlLines };
            };

            TreeViewItem.getHtmlTextLines = function (objectString, detailedType) {
                var finalLines = null;

                if (typeof objectString === "string") {
                    objectString = objectString.replace(/(\r\n|\n\r|\r|\n)/g, "\r\n");

                    var lines = objectString.split("\r\n");
                    if (lines.length > 0) {
                        var indentCount = 0;
                        finalLines = [];
                        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                            if (detailedType === "string" || lines[lineIndex] !== "") {
                                var indent = "";

                                var lineText = lines[lineIndex];
                                lineText = Common.EncodingUtilities.escapeHtml(lineText);

                                if (detailedType === "string") {
                                    lineText = "<pre>" + lineText + "</pre>";
                                } else {
                                    lineText = lineText.replace(/^\s+|\s+$/g, "");
                                }

                                if (detailedType === "function") {
                                    if ((/^\}/).test(lineText)) {
                                        indentCount--;
                                    }

                                    for (var i = 0; i < indentCount; i++) {
                                        indent += "&nbsp;&nbsp;&nbsp;";
                                    }

                                    if ((/\{$/).test(lineText)) {
                                        indentCount++;
                                    }
                                }

                                finalLines.push(indent + lineText);
                            }
                        }

                        if (detailedType === "function" && finalLines.length === 3) {
                            finalLines[1] = finalLines[1].replace(/^(&nbsp;)+/, "");
                            finalLines[2] = finalLines[2];
                            finalLines = [finalLines.join(" ")];
                        }
                    }
                }

                return finalLines;
            };

            TreeViewItem.getHtmlTreeLines = function (elementObject, nodeIndex) {
                var id = elementObject.uid;
                var tag = elementObject.tag;
                var safeTag = Common.EncodingUtilities.escapeHtml(tag);
                var text = elementObject.text;
                var isExpandable = elementObject.hasChildren;
                var attributes = elementObject.attributes;
                var rootTagToShow = elementObject.rootTagToShow;

                var header, headerText = "", rowHeader = "";
                var footer, footerText = "", rowFooter = "";
                if (tag === "#document") {
                    var rootHeader = "";
                    var rootFooter = "";
                    if (rootTagToShow) {
                        var safeRootTag = Common.EncodingUtilities.escapeHtml(rootTagToShow);
                        rootHeader = "<span class='Console-Html'>&lt;</span><span class='Console-Html-Tag'>" + safeRootTag + "</span><span class='Console-Html'>&gt;</span>";
                        rootFooter = "<span class='Console-Html'>&lt;/</span><span class='Console-Html-Tag'>" + safeRootTag + "</span><span class='Console-Html'>&gt;</span>";
                        headerText = "<" + safeRootTag + ">";
                        footerText = "</" + safeRootTag + ">";
                    }

                    header = "<span class='Console-Html-Document'>" + rootHeader + "</span>";
                    footer = "<span class='Console-Html-Document'>" + rootFooter + "</span>";
                } else if (tag === "#doctype") {
                    header = "<span class='Console-Html-DocType'></span>";
                    footer = "<span class='Console-Html-DocType'></span>";
                } else if (tag === "#comment") {
                    header = "<span class='Console-Html-Comment'>&lt;!--</span>";
                    footer = "<span class='Console-Html-Comment'>--&gt;</span>";
                    headerText = "<!--";
                    footerText = "-->";
                    rowHeader = "<span class='Console-Html-Comment'></span>";
                    rowFooter = "<span class='Console-Html-Comment'></span>";
                } else if (tag === null || tag === undefined) {
                    header = "<span class='Console-Html-Text'></span>";
                    footer = "<span class='Console-Html-Text'></span>";
                } else {
                    var attributesHtml = "";
                    var attributesText = "";
                    if (attributes && attributes.length > 0) {
                        for (var j = 0; j < attributes.length; j++) {
                            attributesHtml += "<span class='Console-Html-Attribute-Section'> <span class='Console-Html-Attribute'>" + Common.EncodingUtilities.escapeHtml(attributes[j].name) + "</span><span class='Console-Html-Operator'>=</span>\"" + "<span class='Console-Html-Value' data-attrName='" + Common.EncodingUtilities.escapeHtml(attributes[j].name) + "'>" + Common.EncodingUtilities.escapeHtml(attributes[j].value) + "</span>\"</span>";

                            attributesText += " " + Common.EncodingUtilities.escapeHtml(attributes[j].name) + "=\"" + Common.EncodingUtilities.escapeHtml(attributes[j].value) + "\"";
                        }
                    }

                    header = "<span class='Console-Html'>&lt;</span><span class='Console-Html-Tag'>" + safeTag + "</span>" + attributesHtml + "<span class='Console-Html'>&gt;</span>";
                    headerText = "<" + safeTag + attributesText + ">";
                    footer = "<span class='Console-Html'>&lt;/</span><span class='Console-Html-Tag'>" + safeTag + "</span><span class='Console-Html'>&gt;</span>";
                    footerText = "</" + safeTag + ">";
                }

                var elipsis = (isExpandable ? "<span class='Console-Html-Ellipses'>...</span>" : "");
                var collapsedFooter = (isExpandable ? "<span class='Console-Html-CollapsedFooter'>" + elipsis + footer + "</span>" : footer);

                var nodeNumber = "";
                if (nodeIndex !== null && !isNaN(nodeIndex)) {
                    nodeNumber = "<span class='Console-Html Console-Html-Text Console-Html-Numbering'>" + nodeIndex + "</span>";
                }

                var containerStart = "<span class='Console-HtmlItem'>";
                var containerEnd = "</span>";

                var lines = [];
                if (!text) {
                    lines.push(containerStart + nodeNumber + header + collapsedFooter + containerEnd);
                } else {
                    var textLines = TreeViewItem.getHtmlTextLines(text, "string");
                    if (textLines.length <= 1) {
                        headerText += text;
                        var inlineText = "<span class='Console-Html-Text'>" + textLines[0] + "</span>";
                        lines.push(containerStart + nodeNumber + header + inlineText + collapsedFooter + containerEnd);
                    } else {
                        headerText += text;
                        footerText = "";
                        lines.push(containerStart + header + "<span class='Console-Html-Text'>" + textLines[0] + "</span>" + rowFooter + containerEnd);
                        for (var i = 1; i < textLines.length - 1; i++) {
                            lines.push(containerStart + rowHeader + "<span class='Console-Html-Text'>" + textLines[i] + "</span>" + rowFooter + containerEnd);
                        }

                        lines.push(containerStart + rowHeader + "<span class='Console-Html-Text'>" + textLines[textLines.length - 1] + "</span>" + collapsedFooter + containerEnd);
                    }
                }

                if (isExpandable) {
                    lines.push(containerStart + "<span class='Console-Html-Footer'>" + footer + "</span>" + containerEnd);
                }

                return { headerText: headerText, footerText: footerText, htmlLines: lines };
            };

            TreeViewItem.getFirstLine = function (value) {
                var firstLine = value;

                if (firstLine) {
                    var fullText = firstLine.replace(/(\r\n|\n\r|\r|\n)/g, "\r\n");

                    var lines = fullText.split("\r\n");
                    if (lines.length > 0) {
                        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                            var lineText = lines[lineIndex].replace(/^\s+|\s+$/g, "");
                            if (lineText.length > 0) {
                                firstLine = lineText;
                                break;
                            }
                        }
                    }
                }

                return firstLine;
            };

            TreeViewItem.prototype.getCopyText = function (indent) {
                if (typeof indent === "undefined") { indent = ""; }
                return indent + this._value;
            };

            TreeViewItem.prototype.getWatchExpression = function () {
                return;
            };

            TreeViewItem.prototype.expandLines = function () {
                if (this._fullHtmlLines && this._fullHtmlLines.length > 0) {
                    this._htmlLines = this._fullHtmlLines.slice(1);

                    this._value = Common.EncodingUtilities.unescapeHtml(this._htmlLines[0]);
                    for (var i = 1; i < this._htmlLines.length; i++) {
                        this._value += "\r\n";
                        this._value += Common.EncodingUtilities.unescapeHtml(this._htmlLines[i]);
                    }

                    return true;
                }

                return false;
            };

            TreeViewItem.prototype.setButtonCheckState = function (buttonIndex, value) {
                if (this._buttonItems && this._buttonItems.length > buttonIndex) {
                    this._buttonItems[buttonIndex].isChecked = value;
                }
            };
            TreeViewItem.IdCounter = -1;

            TreeViewItem.TextCopyIndent = "   ";
            return TreeViewItem;
        })();
        ObjectView.TreeViewItem = TreeViewItem;

        var TreeViewInputItem = (function (_super) {
            __extends(TreeViewInputItem, _super);
            function TreeViewInputItem(command, onCompleteCallback) {
                var listValue = TreeViewItem.encodeValueForListItem(command, "string");

                _super.call(this, listValue.value, false, true, true, null, "consoleItemInput", listValue.htmlLines);

                this._inputCommand = command;
                this._onCompleteCallback = onCompleteCallback;
                this._outputItem = null;
            }
            TreeViewInputItem.prototype.getCopyText = function (indent) {
                if (typeof indent === "undefined") { indent = ""; }
                return indent + this._inputCommand;
            };

            TreeViewInputItem.prototype.getWatchExpression = function () {
                return this._inputCommand;
            };

            TreeViewInputItem.prototype.executeCallback = function (outputItem) {
                if (this._onCompleteCallback) {
                    this._onCompleteCallback(this.consoleItemId, outputItem.consoleItemId, (outputItem.additionalClass || ""), (outputItem.value || ""));
                }
            };
            return TreeViewInputItem;
        })(TreeViewItem);
        ObjectView.TreeViewInputItem = TreeViewInputItem;

        var TreeViewOutputItem = (function (_super) {
            __extends(TreeViewOutputItem, _super);
            function TreeViewOutputItem(inputId, value, hasChildren, hasIcon, hasSeparator, name, additionalClass, htmlLines, fullHtmlLines, notifyType, watchExpession) {
                if (typeof notifyType === "undefined") { notifyType = 0 /* None */; }
                if (!inputId || parseInt(inputId, 10) === -1) {
                    additionalClass = (additionalClass || "") + " consoleItemOutput-Async";
                }

                this._watchExpression = watchExpession;

                _super.call(this, value, hasChildren, hasIcon, hasSeparator, name, additionalClass, htmlLines, fullHtmlLines, notifyType);

                this._matchingInputId = (typeof inputId !== "undefined" && typeof inputId !== "null" ? inputId : "-1");
            }
            Object.defineProperty(TreeViewOutputItem.prototype, "matchingInputId", {
                get: function () {
                    return this._matchingInputId;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewOutputItem.prototype, "viewableTypeFlags", {
                get: function () {
                    return 0;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewOutputItem.prototype, "typeEvaluationId", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewOutputItem.prototype, "children", {
                get: function () {
                    return this._children;
                },
                set: function (value) {
                    this._children = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(TreeViewOutputItem.prototype, "isExpandable", {
                get: function () {
                    return (this.children && this.children.length > 0);
                },
                enumerable: true,
                configurable: true
            });

            TreeViewOutputItem.prototype.getWatchExpression = function () {
                return this._watchExpression;
            };

            TreeViewOutputItem.prototype.evaluateAsType = function (call, viewType, onOutput) {
                if ((this.viewableTypeFlags & viewType) === viewType) {
                    switch (viewType) {
                        case 2 /* Html */:
                            call("getObjectItemAsHtml", [this.typeEvaluationId], onOutput);
                            break;

                        case 1 /* Object */:
                            call("getHtmlItemAsObject", [this.typeEvaluationId], onOutput);
                            break;

                        default:
                            return false;
                    }

                    return true;
                }

                return false;
            };
            return TreeViewOutputItem;
        })(TreeViewItem);
        ObjectView.TreeViewOutputItem = TreeViewOutputItem;

        var TreeViewObjectItem = (function (_super) {
            __extends(TreeViewObjectItem, _super);
            function TreeViewObjectItem(outputObject, engine, nameOverride, watchExpression, notifyType) {
                this.engine = engine;

                var className = "consoleItemOutput";
                var useValueString = false;
                switch (outputObject.detailedType) {
                    case "exception":
                        className += " consoleItemOutput-Exception";
                        break;
                    case "undefined":
                        className += " consoleItemOutput-Undefined";
                        break;
                    case "null":
                        className += " consoleItemOutput-Null";
                        break;
                    case "boolean":
                        className += " consoleItemOutput-Boolean";
                        break;
                    case "number":
                        className += " consoleItemOutput-Number";
                        break;
                    case "string":
                        className += " consoleItemOutput-String";
                        break;
                    case "function":
                        className += " consoleItemOutput-Function";
                        break;
                    case "array":
                        className += " consoleItemOutput-Array";
                        useValueString = true;
                        break;
                    case "object":
                        className += " consoleItemOutput-Object";
                        useValueString = true;
                        break;
                    case "internal":
                        className += " consoleItemOutput-Internal";
                        break;
                }

                var isChild = (!!nameOverride);
                useValueString = useValueString && !isChild;
                var hasIcon = (!isChild);
                var limitToSingleLine = (isChild || (outputObject.detailedType === "function" && outputObject.isExpandable));

                var listValue = TreeViewItem.encodeValueForListItem(outputObject.value, outputObject.detailedType, outputObject.isExpandable, limitToSingleLine);

                var fullHtmlLines = null;
                if (limitToSingleLine && listValue.htmlLines && listValue.htmlLines.length > 1) {
                    fullHtmlLines = listValue.htmlLines.slice(0);
                    listValue.htmlLines = [listValue.htmlLines.shift()];
                }

                var name = TreeViewItem.getFirstLine(nameOverride || outputObject.name);

                if (outputObject.isExpandable) {
                    var displayValue;
                    if (useValueString) {
                        var valueString = outputObject.valueString;
                        displayValue = valueString || outputObject.name;
                    } else {
                        displayValue = outputObject.name;
                    }

                    var listValue = TreeViewItem.encodeValueForListItem(displayValue, outputObject.detailedType, true, true, !useValueString);
                    if ((!listValue.htmlLines) && useValueString) {
                        listValue.htmlLines = [listValue.value];
                    }

                    if (limitToSingleLine && listValue.htmlLines && listValue.htmlLines.length > 1) {
                        fullHtmlLines = listValue.htmlLines.slice(0);
                        listValue.htmlLines = [listValue.htmlLines.shift()];
                    }

                    switch (outputObject.detailedType) {
                        case "function":
                            if (!isChild) {
                                name = null;
                            } else {
                                name = (name || Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.functionName);
                            }

                            break;

                        case "array":
                            name = (name || Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.arrayName);
                            break;

                        default:
                            name = (name || Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.objectName);
                            break;
                    }
                }

                _super.call(this, outputObject.inputId, listValue.value, outputObject.isExpandable, hasIcon, !isChild, name, className, listValue.htmlLines, fullHtmlLines, notifyType, watchExpression);

                this._originalObject = outputObject;

                if (Array.isArray(outputObject.value)) {
                    this.children = this.createChildren();
                    this._hasLoadedChildren = true;
                } else {
                    this._remoteExpansionId = outputObject.value;
                    this._hasLoadedChildren = false;
                }
            }
            Object.defineProperty(TreeViewObjectItem.prototype, "viewableTypeFlags", {
                get: function () {
                    return (this._originalObject.isHtmlViewableType ? 2 /* Html */ : 0);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewObjectItem.prototype, "typeEvaluationId", {
                get: function () {
                    return (this._remoteExpansionId || this._originalObject.uid);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewObjectItem.prototype, "isExpandable", {
                get: function () {
                    return this._originalObject.isExpandable;
                },
                enumerable: true,
                configurable: true
            });

            TreeViewObjectItem.prototype.getWatchExpression = function () {
                if (this.name === "[functions]" || !this.name || this.name.indexOf("...") >= 0) {
                    return;
                }

                return _super.prototype.getWatchExpression.call(this);
            };

            TreeViewObjectItem.prototype.getChildren = function (call, onComplete) {
                if (this.isExpandable) {
                    Common.ToolWindowHelpers.codeMarker(Common.ToolWindowHelpers.CodeMarkers.perfBrowserTools_DiagnosticsToolWindowsExpandConsoleObjectBegin);

                    var onExpansionComplete = this.createOnExpansionCompleteWrapper(onComplete);

                    if (this._hasLoadedChildren) {
                        onExpansionComplete();
                    } else {
                        this.loadChildren(call, onExpansionComplete);
                    }
                }
            };

            TreeViewObjectItem.prototype.getCopyText = function (indent) {
                if (typeof indent === "undefined") { indent = ""; }
                var text = indent;

                switch (this._originalObject.detailedType) {
                    case "array":
                    case "object":
                        var openSymbol = "{";
                        var closeSymbol = "}";
                        if (this._originalObject.detailedType === "array") {
                            openSymbol = "[";
                            closeSymbol = "]";
                        }

                        if (!this.children || this.children.length === 0) {
                            text += openSymbol + " " + closeSymbol;
                        } else {
                            text += openSymbol + "\r\n";
                            var nextIndent = indent + TreeViewItem.TextCopyIndent;
                            for (var i = 0; i < this.children.length; i++) {
                                var child = this.children[i];
                                if (i !== 0) {
                                    text += ",\r\n";
                                }

                                text += nextIndent + child.name + ": " + child.getCopyText(nextIndent).trim();
                            }

                            text += "\r\n" + indent + closeSymbol;
                        }

                        break;

                    case "string":
                        if (this._originalObject && this._originalObject.value) {
                            text += this._originalObject.value;
                        } else {
                            text += this.value;
                        }

                        break;
                    case "function":
                        text += this.value.replace(/(&nbsp;)/g, " ");
                        break;
                    default:
                        text += this.value;
                        break;
                }

                return text;
            };

            TreeViewObjectItem.prototype.buildWatchExpressionForChild = function (childConsoleItemName, parentWatchExpression) {
                var watchExpression;

                if (!parentWatchExpression) {
                } else if (childConsoleItemName === "[functions]" || childConsoleItemName.indexOf("...") >= 0) {
                    watchExpression = parentWatchExpression;
                } else if (!isNaN(parseInt(childConsoleItemName))) {
                    watchExpression = parentWatchExpression + "[" + childConsoleItemName + "]";
                } else {
                    watchExpression = parentWatchExpression + "." + childConsoleItemName;
                }

                return watchExpression;
            };

            TreeViewObjectItem.prototype.createChildren = function () {
                var obj = this._originalObject;

                if (!this._sortedPropertyNames) {
                    this._sortedPropertyNames = Common.ToolWindowHelpers.getSortedArrayProperties(obj.value, "propertyName");
                }

                var functions;
                var children = [];

                for (var i = 0; i < this._sortedPropertyNames.length; i++) {
                    var propIndex = this._sortedPropertyNames[i];
                    var propName = obj.value[propIndex].propertyName;
                    var childObject = obj.value[propIndex].propertyValue;
                    var childWatchExpression = this.buildWatchExpressionForChild(propName, this.getWatchExpression());

                    if (propName === "[functions]" && childObject.isInternalProperty && typeof childObject.isInternalProperty === "boolean") {
                        functions = new TreeViewObjectItem(childObject, this.engine, propName, childWatchExpression, this.notifyType);
                    } else {
                        var child = new TreeViewObjectItem(childObject, this.engine, propName, childWatchExpression, this.notifyType);
                        children.push(child);
                    }
                }

                if (functions) {
                    children.unshift(functions);
                }

                return children;
            };

            TreeViewObjectItem.prototype.loadChildren = function (call, onExpansionComplete) {
                var _this = this;
                call("getObjectChildren", [this._remoteExpansionId], function (expandedObj) {
                    if (!expandedObj) {
                        _this._originalObject.value = [{
                                propertyName: "undefined",
                                propertyValue: { detailedType: "undefined" }
                            }];
                    } else if (!expandedObj.isExpandable) {
                        _this._originalObject.value = [{
                                propertyName: "undefined",
                                propertyValue: { detailedType: "undefined" }
                            }];
                    } else {
                        _this._originalObject.value = expandedObj.value;
                    }

                    _this.children = _this.createChildren();
                    _this._hasLoadedChildren = true;

                    onExpansionComplete();
                });
            };

            TreeViewObjectItem.prototype.createOnExpansionCompleteWrapper = function (onComplete) {
                var _this = this;
                return function () {
                    onComplete(_this.children);

                    Common.ToolWindowHelpers.codeMarker(Common.ToolWindowHelpers.CodeMarkers.perfBrowserTools_DiagnosticsToolWindowsExpandConsoleObjectEnd);
                };
            };
            return TreeViewObjectItem;
        })(TreeViewOutputItem);
        ObjectView.TreeViewObjectItem = TreeViewObjectItem;

        var TreeViewHtmlItem = (function (_super) {
            __extends(TreeViewHtmlItem, _super);
            function TreeViewHtmlItem(outputObject, engine, htmlValue, nodeIndex, notifyType, showNotifyIcon, watchExpression) {
                if (typeof notifyType === "undefined") { notifyType = 0 /* None */; }
                if (typeof showNotifyIcon === "undefined") { showNotifyIcon = false; }
                var inputId;
                var remoteId;
                var isExpandable;
                var value;
                var hasSeparator;

                this.engine = engine;

                if (htmlValue && htmlValue.localizeId) {
                    try  {
                        htmlValue.text = Common.ToolWindowHelpers.loadString(htmlValue.localizeId);
                    } catch (e) {
                    }
                }

                if (outputObject) {
                    inputId = outputObject.inputId;
                    remoteId = outputObject.value.uid;
                    isExpandable = outputObject.value.hasChildren;
                    value = outputObject.value;
                    hasSeparator = true;
                } else {
                    inputId = "-1";
                    remoteId = htmlValue.uid;
                    isExpandable = htmlValue.hasChildren;
                    value = htmlValue;
                    hasSeparator = false;
                }

                var listValue = TreeViewItem.getHtmlTreeLines(value, nodeIndex);
                if (isExpandable) {
                    this._footerLine = listValue.htmlLines.pop();
                }

                this._headerText = listValue.headerText;
                this._footerText = listValue.footerText;

                var additionalClass = "consoleItemOutput";
                if (showNotifyIcon && notifyType !== 0 /* None */) {
                    var notifyTypeString = TreeViewNotifyItem.getNotifyTypeString(notifyType);
                    additionalClass += " " + notifyTypeString;
                }

                _super.call(this, inputId, listValue.headerText + listValue.footerText, isExpandable, hasSeparator, hasSeparator, null, additionalClass, listValue.htmlLines, null, notifyType, watchExpression);

                this._originalObject = (outputObject || htmlValue);
                this._remoteExpansionId = remoteId;
                this._isExpandable = isExpandable;
            }
            Object.defineProperty(TreeViewHtmlItem.prototype, "viewableTypeFlags", {
                get: function () {
                    return 1 /* Object */;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewHtmlItem.prototype, "typeEvaluationId", {
                get: function () {
                    return (this._originalObject.value ? this._originalObject.value.uid : this._originalObject.uid);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewHtmlItem.prototype, "isExpandable", {
                get: function () {
                    return this._isExpandable;
                },
                enumerable: true,
                configurable: true
            });

            TreeViewHtmlItem.prototype.getChildren = function (call, onComplete) {
                if (this.isExpandable) {
                    Common.ToolWindowHelpers.codeMarker(Common.ToolWindowHelpers.CodeMarkers.perfBrowserTools_DiagnosticsToolWindowsExpandConsoleObjectBegin);

                    var onExpansionComplete = this.createOnExpansionCompleteWrapper(onComplete);

                    if (this._hasLoadedChildren) {
                        onExpansionComplete();
                    } else {
                        this.loadChildren(call, onExpansionComplete);
                    }
                }
            };

            TreeViewHtmlItem.prototype.getCopyText = function (indent) {
                if (typeof indent === "undefined") { indent = ""; }
                var text = indent;

                text += this._headerText;

                if (!this.children || this.children.length === 0) {
                    text += this._footerText;
                } else {
                    var nextIndent = indent + TreeViewItem.TextCopyIndent;
                    for (var i = 0; i < this.children.length; i++) {
                        var child = this.children[i];
                        text += "\r\n" + nextIndent + child.getCopyText(nextIndent);
                    }

                    text += "\r\n" + indent + this._footerText;
                }

                return text;
            };

            TreeViewHtmlItem.prototype.createChildren = function (childValues) {
                var htmlItem = (this._originalObject.value ? this._originalObject.value : this._originalObject);
                var useNodeNumbers = (htmlItem.tag === "NodeList" || htmlItem.tag === "HtmlCollection");

                var children = [];
                for (var i = 0; i < childValues.length; i++) {
                    var htmlValue = childValues[i];
                    if (!htmlValue.tag && (!htmlValue.text || !(/\S/).test(htmlValue.text))) {
                        continue;
                    }

                    var child = new TreeViewHtmlItem(null, this.engine, htmlValue, (useNodeNumbers ? i : undefined), this.notifyType);
                    children.push(child);
                }

                var footer = new TreeViewItem(this._footerText, false, false, false, null, "consoleItemOutput", [this._footerLine], null, this.notifyType);
                children.push(footer);

                return children;
            };

            TreeViewHtmlItem.prototype.loadChildren = function (call, onExpansionComplete) {
                var _this = this;
                call("getHtmlChildren", [this._remoteExpansionId], function (childValues) {
                    if (!childValues) {
                        childValues = [];
                    }

                    _this.children = _this.createChildren(childValues);
                    _this._hasLoadedChildren = true;

                    onExpansionComplete();
                });
            };

            TreeViewHtmlItem.prototype.createOnExpansionCompleteWrapper = function (onComplete) {
                var _this = this;
                return function () {
                    onComplete(_this.children);

                    Common.ToolWindowHelpers.codeMarker(Common.ToolWindowHelpers.CodeMarkers.perfBrowserTools_DiagnosticsToolWindowsExpandConsoleObjectEnd);
                };
            };
            return TreeViewHtmlItem;
        })(TreeViewOutputItem);
        ObjectView.TreeViewHtmlItem = TreeViewHtmlItem;

        var TreeViewTraceStylesItem = (function (_super) {
            __extends(TreeViewTraceStylesItem, _super);
            function TreeViewTraceStylesItem(outputObject) {
                this._originalObject = outputObject;

                var styleRows = {};
                var styleGroups = { inherited: {}, declared: {} };
                var allStyles = outputObject.value;
                var allStylesLength = allStyles.length;

                for (var index = 0; index < allStylesLength; index++) {
                    var currentStyle = allStyles[index];

                    var currentStrikeKey = currentStyle.strikeKey = TreeViewTraceStylesItem.getStrikeKey(currentStyle);

                    if (!styleRows[currentStrikeKey]) {
                        styleRows[currentStrikeKey] = [];
                        styleRows[currentStrikeKey].activeUid = null;
                    }

                    styleRows[currentStrikeKey].push({
                        index: index,
                        uid: currentStyle.uid,
                        style: currentStyle
                    });
                }

                for (var property in styleRows) {
                    styleRows[property] = styleRows[property].sort(function (a, b) {
                        return a.index > b.index;
                    });

                    var styleRowsLength = styleRows[property].length;

                    for (var index = 0; index < styleRowsLength; index++) {
                        var group = styleRows[property];
                        if (group[index].style.enabled) {
                            group.activeUid = group[0].uid;
                            break;
                        }
                    }
                }

                var styleKeys = [];
                for (var styleNames in styleRows) {
                    styleKeys.push({ key: styleNames });
                }

                var sortedStyleKeys = Common.ToolWindowHelpers.getSortedArrayProperties(styleKeys, "key");

                var children = [];
                var sortedStyleKeysLength = sortedStyleKeys.length;
                for (var keyIndex = 0; keyIndex < sortedStyleKeysLength; keyIndex++) {
                    var styleName = styleKeys[sortedStyleKeys[keyIndex]].key;
                    var styleRules = styleRows[styleName];
                    var activeUid = styleRules.activeUid;

                    var rules = [];
                    var activeStyleHtml;
                    var activeStyleValue;
                    var styleRulesLength = styleRules.length;

                    for (var index = 0; index < styleRulesLength; index++) {
                        var cssRuleApplied = styleRules[index];
                        if (cssRuleApplied && cssRuleApplied.style) {
                            var style = cssRuleApplied.style;
                            var rule = new TreeViewStyleItem(style, activeUid === style.uid);
                            if (activeUid === style.uid) {
                                activeStyleHtml = rule.getHtmlContent();
                                activeStyleValue = style.value;
                            }

                            rules.push(rule);
                        }
                    }

                    var propGroup = new TreeViewCssStyleGroup(styleName, activeStyleHtml, activeStyleValue, false);

                    var rulesLength = rules.length;
                    for (var i = 0; i < rulesLength; i++) {
                        propGroup.addChild(rules[i]);
                    }

                    children.push(propGroup);
                }

                this.children = children;

                var groupName = Common.ToolWindowHelpers.loadString("CSSTraceStyles");

                _super.call(this, outputObject.inputId, groupName, outputObject.isExpandable, false);
            }
            Object.defineProperty(TreeViewTraceStylesItem.prototype, "isExpandable", {
                get: function () {
                    return this._originalObject.isExpandable;
                },
                enumerable: true,
                configurable: true
            });

            TreeViewTraceStylesItem.isColorProperty = function (propertyName) {
                if (!propertyName || propertyName.indexOf("color") === -1) {
                    return false;
                }

                switch (propertyName.toLowerCase()) {
                    case "background-color":
                    case "border-bottom-color":
                    case "border-left-color":
                    case "border-right-color":
                    case "border-top-color":
                    case "color":
                    case "column-rule-color":
                    case "layout-border-bottom-color":
                    case "layout-border-left-color":
                    case "layout-border-right-color":
                    case "layout-border-top-color":
                    case "outline-color":
                    case "stop-color":
                    case "flood-color":
                    case "lighting-color":
                    case "scrollbar-3dlight-color":
                    case "scrollbar-arrow-color":
                    case "scrollbar-base-color":
                    case "scrollbar-darkshadow-color":
                    case "scrollbar-face-color":
                    case "scrollbar-highlight-color":
                    case "scrollbar-shadow-color":
                    case "scrollbar-track-color":
                        return true;
                }

                return false;
            };

            TreeViewTraceStylesItem.prototype.getChildren = function (call, onComplete) {
                onComplete(this.children);
            };

            TreeViewTraceStylesItem.prototype.getCopyText = function (indent) {
                if (typeof indent === "undefined") { indent = ""; }
                var text = indent;

                var nextIndent = indent + TreeViewItem.TextCopyIndent;
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    text += "\r\n" + child.getCopyText(nextIndent);
                }

                text += "\r\n";

                return text;
            };

            TreeViewTraceStylesItem.getStrikeKey = function (style) {
                if (style.selector && style.selector.indexOf("::") >= 0) {
                    var pseudoElement = style.selector.match(/::[\w\-]+/);
                    if (pseudoElement && pseudoElement.length === 1) {
                        return pseudoElement[0] + " " + style.property;
                    }
                }

                return style.property;
            };
            return TreeViewTraceStylesItem;
        })(TreeViewOutputItem);
        ObjectView.TreeViewTraceStylesItem = TreeViewTraceStylesItem;

        var TreeViewNotifyItem = (function (_super) {
            __extends(TreeViewNotifyItem, _super);
            function TreeViewNotifyItem(notifyObject) {
                this.engine = notifyObject.engine;

                var type = notifyObject.notifyType;
                var messageObj;

                if (typeof notifyObject.message === "object") {
                    messageObj = notifyObject.message;
                } else {
                    var messageString = "undefined";
                    if (notifyObject.message && notifyObject.message.toString) {
                        messageString = notifyObject.message.toString();
                    }

                    messageObj = { message: messageString };
                }

                if (notifyObject.notifyType === "consoleItemCDContext") {
                    type = TreeViewNotifyItem.getNotifyTypeString(3 /* Info */);
                    try  {
                        messageObj.message = Common.ToolWindowHelpers.loadString("CDContextChanged", [notifyObject.message]);
                    } catch (ex) {
                    }
                }

                if (notifyObject.message && notifyObject.message.localizeId) {
                    try  {
                        if (notifyObject.message.localizeId === "ConsoleTimerDisplay") {
                            notifyObject.message.args[1] = Number(notifyObject.message.args[1]).toLocaleString();
                        }

                        messageObj.message = Common.ToolWindowHelpers.loadString(notifyObject.message.localizeId, notifyObject.message.args || undefined);
                    } catch (e) {
                    }
                }

                var listValue = TreeViewItem.encodeValueForListItem(messageObj.message, "string");

                var fileInfo = "";
                if (typeof notifyObject.message === "object" && (messageObj.messageId || messageObj.fileUrl || messageObj.lineNumber || messageObj.columnNumber)) {
                    listValue.htmlLines = [];

                    if (messageObj.messageId) {
                        var messageId = messageObj.messageId;
                        var startText = messageObj.message.substring(0, messageId.length);
                        if (startText === messageId) {
                            var helpLink = "<span class='BPT-HelpLink' data-linkKeyword='" + messageId + "'>" + messageId + "</span>";
                            listValue.htmlLines.push(helpLink + Common.EncodingUtilities.escapeHtml(messageObj.message.substring(messageId.length)));
                        }
                    }

                    if (messageObj.fileUrl) {
                        var url = Common.EncodingUtilities.wrapInQuotes(Common.EncodingUtilities.escapeHtml(messageObj.fileUrl));
                        var line = "";
                        var col = "";
                        var useLineAndColumn = false;

                        if (messageObj.lineNumber !== null && !isNaN(messageObj.lineNumber)) {
                            if (messageObj.columnNumber === null || isNaN(messageObj.columnNumber)) {
                                messageObj.columnNumber = 1;
                            }

                            line = " data-linkLine='" + messageObj.lineNumber + "'";
                            col = " data-linkCol='" + messageObj.columnNumber + "'";
                            useLineAndColumn = true;
                        }

                        var shortUrl = Common.ToolWindowHelpers.createShortenedUrlText(messageObj.fileUrl);

                        var tooltip = Common.EncodingUtilities.wrapInQuotes(Common.EncodingUtilities.escapeHtml(messageObj.fileUrl));

                        var fileLabel;
                        if (useLineAndColumn) {
                            fileLabel = Common.EncodingUtilities.escapeHtml(Common.ToolWindowHelpers.loadString("EventFullScriptPositionText", [shortUrl, messageObj.lineNumber, messageObj.columnNumber]));
                        } else {
                            fileLabel = Common.EncodingUtilities.escapeHtml(Common.ToolWindowHelpers.loadString("ScriptErrorFile", [shortUrl]));
                        }

                        listValue.htmlLines.push("<span class='BPT-FileLink BPT-Tooltip-Item' role='link' data-linkUrl=" + url + line + col + " data-tooltip=" + tooltip + ">" + fileLabel + "</span>");
                        fileInfo = fileLabel;
                    } else {
                        var useLine = false;
                        var useColumn = false;
                        if (messageObj.lineNumber !== null && !isNaN(messageObj.lineNumber)) {
                            useLine = true;
                            if (messageObj.columnNumber !== null && !isNaN(messageObj.columnNumber)) {
                                useColumn = true;
                            }
                        }

                        var lineLabel = null;
                        if (useLine && useColumn) {
                            lineLabel = Common.EncodingUtilities.escapeHtml(Common.ToolWindowHelpers.loadString("EventScriptPositionText", [messageObj.lineNumber, messageObj.columnNumber]));
                        } else if (useLine) {
                            lineLabel = Common.EncodingUtilities.escapeHtml(Common.ToolWindowHelpers.loadString("ScriptErrorLine", [messageObj.lineNumber]));
                        }

                        if (lineLabel) {
                            listValue.htmlLines[0] += " " + lineLabel;
                            fileInfo = lineLabel;
                        }
                    }
                }

                this._originalObject = notifyObject;
                var notifyType = TreeViewNotifyItem.parseNotifyTypeString(notifyObject.notifyType);
                this._message = listValue.value;
                this._fileInfo = fileInfo;

                var name = null;
                if (notifyObject.message.viewableObject && notifyObject.message.viewableObject.length) {
                    this.children = [];
                    if (notifyObject.message.viewableObject.length === 1) {
                        var objectItem = this.createTreeViewItem(notifyObject.message.viewableObject[0], notifyType);
                        if (objectItem instanceof TreeViewHtmlItem) {
                            this.children.push(objectItem);
                        } else {
                            this._originalTreeViewObjectItem = objectItem;
                            name = objectItem.name;
                            type += " " + type + "Expandable";
                            switch (notifyObject.message.viewableObject[0].detailedType) {
                                case "regex":
                                case "date":
                                    listValue.htmlLines = [Common.EncodingUtilities.escapeHtml(objectItem.value)];
                                    break;
                                default:
                                    listValue.htmlLines = [objectItem.value];
                                    break;
                            }

                            this.children = objectItem.children;
                        }
                    } else {
                        for (var i = 0; i < notifyObject.message.viewableObject.length; i++) {
                            this.children.push(this.createTreeViewItem(notifyObject.message.viewableObject[i], notifyType));
                        }
                    }
                }

                _super.call(this, notifyObject.inputId, listValue.value, this.isExpandable, true, true, name, type, listValue.htmlLines, null, notifyType);
            }
            TreeViewNotifyItem.getNotifyTypeString = function (notifyType) {
                switch (notifyType) {
                    case 1 /* Assert */:
                        return "consoleItemError";
                    case 2 /* Error */:
                        return "consoleItemError";
                    case 3 /* Info */:
                        return "consoleItemInfo";
                    case 4 /* Log */:
                        return "consoleItemLog";
                    case 5 /* Warn */:
                        return "consoleItemWarn";
                    default:
                        return null;
                }
            };

            TreeViewNotifyItem.parseNotifyTypeString = function (notifyType) {
                switch (notifyType) {
                    case "consoleItemError":
                        return 2 /* Error */;
                    case "consoleItemInfo":
                        return 3 /* Info */;
                    case "consoleItemCDContext":
                        return 3 /* Info */;
                    case "consoleItemLog":
                        return 4 /* Log */;
                    case "consoleItemWarn":
                        return 5 /* Warn */;
                    default:
                        return 0 /* None */;
                }
            };

            TreeViewNotifyItem.prototype.getCopyText = function (indent) {
                if (typeof indent === "undefined") { indent = ""; }
                var text = indent;

                text += this._message;
                if (this._fileInfo) {
                    text += "\r\n" + indent + this._fileInfo;
                }

                var nextIndent = indent + TreeViewItem.TextCopyIndent;

                if (this._originalTreeViewObjectItem) {
                    text += "\r\n" + this._originalTreeViewObjectItem.getCopyText(nextIndent) + "\r\n";
                } else if (this.children && this.children.length > 0) {
                    for (var i = 0; i < this.children.length; i++) {
                        text += "\r\n" + this.children[i].getCopyText(nextIndent);
                    }

                    text += "\r\n";
                }

                return text;
            };

            TreeViewNotifyItem.prototype.getChildren = function (call, onComplete) {
                onComplete(this.children);
            };

            TreeViewNotifyItem.prototype.createTreeViewItem = function (outputObject, notifyType) {
                var treeViewItem;
                if (outputObject.detailedType !== "htmlElement") {
                    var matchingInputItem;
                    treeViewItem = new Common.ObjectView.TreeViewObjectItem(outputObject, this.engine, null, null, notifyType);
                } else {
                    treeViewItem = new Common.ObjectView.TreeViewHtmlItem(outputObject, this.engine, null, null, notifyType);
                }

                return treeViewItem;
            };
            return TreeViewNotifyItem;
        })(TreeViewOutputItem);
        ObjectView.TreeViewNotifyItem = TreeViewNotifyItem;

        var TreeViewGroupItem = (function (_super) {
            __extends(TreeViewGroupItem, _super);
            function TreeViewGroupItem(title, isCollapsed, name, html) {
                if (typeof title === "undefined") { title = ""; }
                if (typeof name === "undefined") { name = null; }
                var listValue = TreeViewItem.encodeValueForListItem(title, "string", false, true);
                var listName = name ? TreeViewItem.encodeValueForListItem(name, "string", false, true).value : null;
                _super.call(this, listValue.value, true, false, true, listName, "consoleOutputInput", html || listValue.htmlLines);

                this._title = title;
                this._isInitialCollapsed = !!isCollapsed;
                this._children = [];
            }
            Object.defineProperty(TreeViewGroupItem.prototype, "isExpandable", {
                get: function () {
                    return (this._children && this._children.length > 0);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TreeViewGroupItem.prototype, "hasChildren", {
                get: function () {
                    return (this._children && this._children.length > 0);
                },
                enumerable: true,
                configurable: true
            });

            TreeViewGroupItem.prototype.getChildren = function (call, onComplete) {
                onComplete(this._children);
            };

            TreeViewGroupItem.prototype.addChild = function (item, afterSibling) {
                if (!afterSibling) {
                    this._children.push(item);
                } else {
                    var index = this._children.indexOf(afterSibling);
                    if (index > -1) {
                        this._children.splice(index + 1, 0, item);
                    } else {
                        this._children.push(item);
                    }
                }
            };

            TreeViewGroupItem.prototype.getCopyText = function (indent, filter, isRoot) {
                if (typeof indent === "undefined") { indent = ""; }
                var nextIndent;

                if (isRoot) {
                    nextIndent = indent = "";
                } else {
                    nextIndent = indent + TreeViewItem.TextCopyIndent;
                }

                var text = indent;

                if (this._title && this._title.length > 0) {
                    text += this._title + "\r\n";
                }

                for (var i = 0; i < this._children.length; i++) {
                    var child = this._children[i];
                    if (!filter) {
                        filter = function (item) {
                            return true;
                        };
                    }

                    if (filter(child)) {
                        text += child.getCopyText(nextIndent) + "\r\n";
                    }
                }

                return text;
            };

            TreeViewGroupItem.prototype.isItemInGroup = function (item) {
                return (this._children.indexOf(item) > -1);
            };

            TreeViewGroupItem.prototype.isFirstUIChildNeeded = function () {
                return (this._children.length === 0 && !this._isInitialCollapsed);
            };
            return TreeViewGroupItem;
        })(TreeViewItem);
        ObjectView.TreeViewGroupItem = TreeViewGroupItem;

        var TreeViewCssStyleGroup = (function (_super) {
            __extends(TreeViewCssStyleGroup, _super);
            function TreeViewCssStyleGroup(propertyName, propertyValueHtml, propertyValue, isCollapsed) {
                _super.call(this, null, isCollapsed, propertyName, propertyValueHtml);

                this._propertyName = propertyName;
                this._propertyValueHtml = propertyValueHtml.length > 0 ? propertyValueHtml[0] : "";
                this._propertyValue = propertyValue;
            }
            TreeViewCssStyleGroup.prototype.getCopyText = function (indent) {
                if (typeof indent === "undefined") { indent = ""; }
                return indent + this._propertyName + ": " + this._propertyValue + ";\r\n";
            };
            return TreeViewCssStyleGroup;
        })(TreeViewGroupItem);
        ObjectView.TreeViewCssStyleGroup = TreeViewCssStyleGroup;

        var TreeViewStyleItem = (function (_super) {
            __extends(TreeViewStyleItem, _super);
            function TreeViewStyleItem(style, isActive) {
                var colorThumbnail = (TreeViewTraceStylesItem.isColorProperty(style.property) ? "<span class='Console-ColorThumbnail' style='background-color: " + style.value + "' title='" + style.value + "'></span>" : "");
                var nameColumn = (style.inherited ? "<" + style.inherited.toLowerCase() + "> " : "") + style.selector;
                var html = [colorThumbnail + "<span class='Console-StyleItem-Value Console-Html-CSS-Value' >" + style.value + "</span>"];
                var additionalClass = (isActive ? "" : " Console-Style-Disabled ") + "Console-Html-CSS-Selector";
                _super.call(this, null, false, false, false, nameColumn, additionalClass, html);

                this._html = html;
                this._styleObject = style;
            }
            TreeViewStyleItem.prototype.getHtmlContent = function () {
                return this._html;
            };

            TreeViewStyleItem.prototype.getCopyText = function (indent) {
                if (typeof indent === "undefined") { indent = ""; }
                return indent + this._styleObject.selector + " {\r\n" + "   " + this._styleObject.property.toLowerCase() + ": " + this._styleObject.value + "\r\n" + "}\r\n";
            };
            return TreeViewStyleItem;
        })(TreeViewItem);
        ObjectView.TreeViewStyleItem = TreeViewStyleItem;

        var TreeViewCountItem = (function (_super) {
            __extends(TreeViewCountItem, _super);
            function TreeViewCountItem(notifyObject) {
                var name = notifyObject.message.name;
                if (!name) {
                    name = "";
                }

                _super.call(this, notifyObject.inputId, notifyObject.message.message, false, false, false, name + ":", null, null);
            }
            return TreeViewCountItem;
        })(TreeViewOutputItem);
        ObjectView.TreeViewCountItem = TreeViewCountItem;

        var TreeViewSeparatorItem = (function (_super) {
            __extends(TreeViewSeparatorItem, _super);
            function TreeViewSeparatorItem() {
                var label = Common.ToolWindowHelpers.loadString("ConsoleNavigationSeparatorLabel");
                var htmlLines = [""];
                _super.call(this, label, false, false, false, null, null, htmlLines);
            }
            Object.defineProperty(TreeViewSeparatorItem.prototype, "isSeparator", {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            return TreeViewSeparatorItem;
        })(TreeViewItem);
        ObjectView.TreeViewSeparatorItem = TreeViewSeparatorItem;
    })(Common.ObjectView || (Common.ObjectView = {}));
    var ObjectView = Common.ObjectView;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ObjectView/treeViewItems.js.map

// EtwDataCollector.ts
var Common;
(function (Common) {
    (function (Data) {
        "use strict";

        var F12EtwDataCollector = (function () {
            function F12EtwDataCollector(dataCollectorProxy) {
                this._proxy = dataCollectorProxy;
                if (!this._proxy) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1055"));
                }
            }
            F12EtwDataCollector.prototype.startSession = function (agentFile, agentGuid) {
                var _this = this;
                return new Plugin.Promise(function (completed, error) {
                    _this._proxy.startSession(agentFile, agentGuid, function (sessionProxy) {
                        completed(new F12EtwDataCollectorSession(sessionProxy));
                    }, function (hr) {
                        if (error) {
                            error(new Error(hr.toString()));
                        }
                    });
                });
            };

            F12EtwDataCollector.prototype.stopCollection = function () {
                this._proxy.stopCollection();
            };
            return F12EtwDataCollector;
        })();
        Data.F12EtwDataCollector = F12EtwDataCollector;

        var F12EtwDataCollectorSession = (function () {
            function F12EtwDataCollectorSession(sessionProxy) {
                this._proxy = sessionProxy;
            }
            F12EtwDataCollectorSession.prototype.stop = function () {
                var _this = this;
                return new Plugin.Promise(function (completed, error) {
                    _this._proxy.stop(function (file) {
                        completed(file);
                    }, function (hr) {
                        if (error) {
                            error(new Error("Error: " + hr));
                        }
                    });
                });
            };

            F12EtwDataCollectorSession.prototype.getGraphDataUpdate = function (counterId) {
                var _this = this;
                return new Plugin.Promise(function (completed, error) {
                    _this._proxy.getGraphDataUpdate(counterId, function (points) {
                        completed(points);
                    }, function (hr) {
                        if (error) {
                            error(new Error("Error: " + hr));
                        }
                    });
                });
            };
            return F12EtwDataCollectorSession;
        })();
        Data.F12EtwDataCollectorSession = F12EtwDataCollectorSession;
    })(Common.Data || (Common.Data = {}));
    var Data = Common.Data;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/EtwDataCollector.js.map

// button.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";
            var Button = (function (_super) {
                __extends(Button, _super);
                function Button(element) {
                    var _this = this;
                    _super.call(this, element);

                    this.rootElement.addEventListener("click", function (e) {
                        return _this.onClick(e);
                    });
                    this.rootElement.addEventListener("keydown", function (e) {
                        return _this.onKeydown(e);
                    });
                    this.rootElement.addEventListener("mousedown", function (e) {
                        return _this.onMouseDown(e);
                    });
                    this.rootElement.addEventListener("mouseup", function (e) {
                        return _this.onMouseUpLeave(e);
                    });
                    this.rootElement.addEventListener("mouseleave", function (e) {
                        return _this.onMouseUpLeave(e);
                    });
                }
                Object.defineProperty(Button.prototype, "click", {
                    get: function () {
                        return this._onClick;
                    },
                    set: function (value) {
                        this._onClick = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Button.prototype, "content", {
                    get: function () {
                        return this.rootElement.innerHTML;
                    },
                    set: function (value) {
                        this.rootElement.innerHTML = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Button.prototype, "tooltip", {
                    get: function () {
                        return this._tooltip;
                    },
                    set: function (value) {
                        var _this = this;
                        this._tooltip = value;
                        this.rootElement.onmouseover = function () {
                            Plugin.Tooltip.show({ content: _this._tooltip });
                            return true;
                        };
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Button.prototype, "disabled", {
                    get: function () {
                        return this.rootElement.disabled;
                    },
                    set: function (value) {
                        this.rootElement.disabled = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Button.prototype.onClick = function (ev) {
                    this.rootElement.focus();
                    if (this._onClick) {
                        this._onClick();
                    }
                };

                Button.prototype.onKeydown = function (ev) {
                    if (ev.keyCode === 32 /* Space */ || ev.keyCode === 13 /* Enter */) {
                        if (this._onClick) {
                            this._onClick();
                        }

                        ev.preventDefault();
                    }
                };

                Button.prototype.onMouseDown = function (ev) {
                    if (!this.disabled) {
                        this.rootElement.classList.add("BPT-ToolbarButton-MouseDown");
                    }
                };

                Button.prototype.onMouseUpLeave = function (ev) {
                    this.rootElement.classList.remove("BPT-ToolbarButton-MouseDown");
                };
                return Button;
            })(Legacy.Control);
            Legacy.Button = Button;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/button.js.map

// radioButton.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var RadioButton = (function (_super) {
                __extends(RadioButton, _super);
                function RadioButton(element) {
                    var _this = this;
                    _super.call(this, element);
                    this._radioButtonElement = this.rootElement;

                    RadioButton.RadioButtons.push(this);

                    this.rootElement.addEventListener("click", function (e) {
                        return _this.onCheck(e);
                    });

                    this.updateAriaProperties();
                }
                Object.defineProperty(RadioButton.prototype, "check", {
                    get: function () {
                        return this._onCheck;
                    },
                    set: function (value) {
                        this._onCheck = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(RadioButton.prototype, "checked", {
                    get: function () {
                        return this._radioButtonElement.checked;
                    },
                    set: function (value) {
                        this._radioButtonElement.checked = value;
                        this.updateAriaProperties();
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(RadioButton.prototype, "disabled", {
                    get: function () {
                        return this.rootElement.disabled;
                    },
                    set: function (value) {
                        this.rootElement.disabled = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(RadioButton.prototype, "groupName", {
                    get: function () {
                        return this._radioButtonElement.name;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(RadioButton.prototype, "focusableElement", {
                    get: function () {
                        return this._radioButtonElement;
                    },
                    enumerable: true,
                    configurable: true
                });

                RadioButton.prototype.onCheck = function (ev) {
                    if (this.checked) {
                        this.rootElement.focus();
                        if (this._onCheck) {
                            this._onCheck();
                        }

                        for (var i = 0; i < RadioButton.RadioButtons.length; ++i) {
                            var otherButton = RadioButton.RadioButtons[i];
                            if (otherButton !== this && otherButton.groupName === this.groupName) {
                                otherButton.updateAriaProperties();
                            }
                        }
                    }

                    this.updateAriaProperties();
                };

                RadioButton.prototype.updateAriaProperties = function () {
                    this.rootElement.setAttribute("aria-checked", "" + this.checked);
                };
                RadioButton.RadioButtons = [];
                return RadioButton;
            })(Legacy.Control);
            Legacy.RadioButton = RadioButton;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/radioButton.js.map

// toggleButton.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var ToggleButton = (function (_super) {
                __extends(ToggleButton, _super);
                function ToggleButton(element) {
                    var _this = this;
                    _super.call(this, element);

                    F12.Tools.Utility.Assert.areEqual(this.rootElement.getAttribute("role"), "button", "Missing button role");
                    this.rootElement.addEventListener("DOMAttrModified", function (evt) {
                        if (evt.attrName === "aria-pressed") {
                            var isSelected = evt.newValue === "true";
                            _this.rootElement.setAttribute("selected", "" + isSelected);
                            if (_this._onSelectChanged && evt.newValue !== evt.prevValue) {
                                _this._onSelectChanged(isSelected);
                            }
                        }
                    });

                    this.selected = this.selected;
                }
                Object.defineProperty(ToggleButton.prototype, "selectedChanged", {
                    get: function () {
                        return this._onSelectChanged;
                    },
                    set: function (value) {
                        this._onSelectChanged = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ToggleButton.prototype, "selected", {
                    get: function () {
                        return this.rootElement.getAttribute("aria-pressed") === "true";
                    },
                    set: function (value) {
                        this.rootElement.setAttribute("aria-pressed", "" + value);
                    },
                    enumerable: true,
                    configurable: true
                });

                ToggleButton.prototype.onClick = function (ev) {
                    _super.prototype.onClick.call(this, ev);
                    this.selected = !this.selected;
                };

                ToggleButton.prototype.onKeydown = function (ev) {
                    if (ev.keyCode === 32 /* Space */ || ev.keyCode === 13 /* Enter */) {
                        _super.prototype.onKeydown.call(this, ev);
                        this.selected = !this.selected;
                        ev.preventDefault();
                    }
                };
                return ToggleButton;
            })(Legacy.Button);
            Legacy.ToggleButton = ToggleButton;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/toggleButton.js.map

// dataListTextBox.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var DataListTextBox = (function (_super) {
                __extends(DataListTextBox, _super);
                function DataListTextBox(root) {
                    var _this = this;
                    _super.call(this, root);
                    this._idPostfix = DataListTextBox.GlobalIdPostfix++;
                    var dataListId = "textBoxDataList" + this._idPostfix;

                    this._inputElement = document.createElement("input");
                    this._inputElement.type = "text";
                    this._inputElement.setAttribute("list", dataListId);
                    this._inputElement.addEventListener("input", function (ev) {
                        return _this.onInput(ev);
                    });
                    this._inputElement.addEventListener("keydown", function (ev) {
                        return _this.onKeydown(ev);
                    });
                    this._inputElement.addEventListener("change", function (ev) {
                        return _this.onChange(ev);
                    });

                    this._dataListElement = document.createElement("datalist");
                    this._dataListElement.id = dataListId;
                    this._optionElements = null;

                    this.rootElement.appendChild(this._inputElement);
                    this.rootElement.appendChild(this._dataListElement);
                }
                Object.defineProperty(DataListTextBox.prototype, "items", {
                    get: function () {
                        return this._items;
                    },
                    set: function (value) {
                        this.clearItems();
                        this._optionElements = [];
                        for (var i = 0; i < value.length; ++i) {
                            var option = document.createElement("option");
                            option.text = value[i].text;
                            this._optionElements.push(option);
                            this._dataListElement.appendChild(option);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(DataListTextBox.prototype, "text", {
                    get: function () {
                        return this._inputElement.value;
                    },
                    set: function (value) {
                        this._inputElement.value = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(DataListTextBox.prototype, "textChanged", {
                    get: function () {
                        return this._valueChanged;
                    },
                    set: function (handler) {
                        this._valueChanged = handler;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(DataListTextBox.prototype, "textCommitted", {
                    get: function () {
                        return this._valueCommitted;
                    },
                    set: function (handler) {
                        this._valueCommitted = handler;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(DataListTextBox.prototype, "focusableElement", {
                    get: function () {
                        return this._inputElement;
                    },
                    enumerable: true,
                    configurable: true
                });

                DataListTextBox.prototype.clearItems = function () {
                    if (this._optionElements) {
                        for (var i = 0; i < this._optionElements.length; ++i) {
                            this._dataListElement.removeChild(this._optionElements[i]);
                        }

                        this._optionElements = null;
                    }
                };

                DataListTextBox.prototype.onInput = function (ev) {
                    if (this.textChanged) {
                        this.textChanged(this.text);
                    }
                };

                DataListTextBox.prototype.onKeydown = function (ev) {
                    var _this = this;
                    if (ev.keyCode === 13 /* Enter */) {
                        window.setImmediate(function () {
                            if (_this.textCommitted) {
                                _this.textCommitted(_this.text);
                            }
                        });
                    }
                };

                DataListTextBox.prototype.onChange = function (ev) {
                    if (this.textCommitted) {
                        this.textCommitted(this.text);
                    }
                };
                DataListTextBox.GlobalIdPostfix = 1;
                return DataListTextBox;
            })(Legacy.Control);
            Legacy.DataListTextBox = DataListTextBox;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/dataListTextBox.js.map

// rpc.ts
var F12;
(function (F12) {
    (function (Tools) {
        (function (RPC) {
            "use strict";

            var JsonRPCEndpoint = (function () {
                function JsonRPCEndpoint(identifier, jsonRpcMethodReceive, jsonRpcNotificationReceive, postMessage, onMessageCapture) {
                    var _this = this;
                    this._ourIdentifier = identifier;
                    this._nextId = 0;
                    this._promiseTable = {};
                    this._jsonRpcMethodReceive = jsonRpcMethodReceive;
                    this._jsonRpcNotificationReceive = jsonRpcNotificationReceive;
                    this._postMessage = postMessage;

                    if (!Date.now) {
                        Date.now = function now() {
                            return +(new Date);
                        };
                    }

                    this._startTime = Date.now();

                    onMessageCapture(function (data) {
                        _this.onMessage(data);
                    });
                }
                JsonRPCEndpoint.prototype.jsonRpcMethodCall = function (method, params, completed, error, identification) {
                    var _this = this;
                    var id = this._ourIdentifier + "|" + this._nextId;
                    this._nextId++;
                    this._promiseTable[id] = { completed: completed, error: error };

                    var message = JSON.stringify({ id: id, method: method, params: params });

                    this.logTraffic(message);
                    if (RpcDelayHook.RandomDelay) {
                        RpcDelayHook.queueData(function () {
                            _this._postMessage(message, identification);
                        }, message);
                        return true;
                    } else {
                        return this._postMessage(message, identification);
                    }
                };

                JsonRPCEndpoint.prototype.jsonRpcNotification = function (method, params, identification) {
                    var _this = this;
                    var id = this._ourIdentifier + "|" + "NULL";
                    var message = JSON.stringify({ id: id, method: method, params: params });

                    this.logTraffic(message);

                    if (RpcDelayHook.RandomDelay) {
                        RpcDelayHook.queueData(function () {
                            _this._postMessage(message, identification);
                        }, message);
                    } else {
                        this._postMessage(message, identification);
                    }
                };

                JsonRPCEndpoint.prototype.logTraffic = function (data) {
                    if (isDebugBuild) {
                        var paddedTimestamp = ("  " + (Date.now() - this._startTime) / 1000).slice(-9);
                        __rpcLog.push(paddedTimestamp + " | " + data);

                        if (__rpcLog.length > 100) {
                            __rpcLog.shift();
                        }
                    }
                };

                JsonRPCEndpoint.prototype.onMessage = function (data) {
                    var _this = this;
                    this.logTraffic(data.data);

                    var result = JSON.parse(data.data);
                    var idSplit = (result.id).split("|");

                    Tools.Utility.Assert.areEqual(idSplit.length, 2);

                    if (idSplit[1] === "NULL") {
                        if (idSplit[0] !== this._ourIdentifier) {
                            this._jsonRpcNotificationReceive(result.method, result.params);
                        }
                    } else if (idSplit[0] === this._ourIdentifier) {
                        if (RpcDelayHook.RandomDelay) {
                            RpcDelayHook.queueData(function () {
                                _this.handleReply(result);
                            }, data.data);
                        } else {
                            this.handleReply(result);
                        }
                    } else {
                        if (RpcDelayHook.RandomDelay) {
                            RpcDelayHook.queueData(function () {
                                _this.handleCall(result);
                            }, data.data);
                        } else {
                            this.handleCall(result);
                        }
                    }
                };

                JsonRPCEndpoint.prototype.handleReply = function (result) {
                    Tools.Utility.Assert.hasValue(this._promiseTable[result.id]);

                    if (result.error) {
                        Tools.Utility.Assert.isUndefined(result.data, "Can't have both data and error");
                        this._promiseTable[result.id].error(result.error);
                    } else {
                        this._promiseTable[result.id].completed(result.data);
                    }

                    delete this._promiseTable[result.id];
                };

                JsonRPCEndpoint.prototype.handleCall = function (result) {
                    var _this = this;
                    this._jsonRpcMethodReceive(result.method, result.params, function (data, error) {
                        var message;

                        if (data !== null && data !== undefined) {
                            Tools.Utility.Assert.isUndefined(error, "Can't have both data and error");
                            message = JSON.stringify({ id: result.id, data: data });
                        } else {
                            Tools.Utility.Assert.hasValue(error, "RPC call returned no value, but no error object either");
                            message = JSON.stringify({ id: result.id, error: error });
                        }

                        _this._postMessage(message);
                    });
                };
                return JsonRPCEndpoint;
            })();
            RPC.JsonRPCEndpoint = JsonRPCEndpoint;

            var RpcDelayData = (function () {
                function RpcDelayData(callback, message) {
                    this.callback = callback;
                    this.message = message;
                }
                return RpcDelayData;
            })();
            RPC.RpcDelayData = RpcDelayData;

            var RpcDelayHook = (function () {
                function RpcDelayHook() {
                }
                RpcDelayHook.enableDelay = function (calculateDelayTime, delayedMessage) {
                    RpcDelayHook.RandomDelay = true;
                    RpcDelayHook.CalculateDelayTime = calculateDelayTime;
                    RpcDelayHook.DelayedMessage = delayedMessage;
                };

                RpcDelayHook.disableDelay = function () {
                    RpcDelayHook.RandomDelay = false;

                    if (RpcDelayHook.RandomDelayTimeout) {
                        clearTimeout(RpcDelayHook.RandomDelayTimeout);
                        RpcDelayHook.RandomDelayTimeout = null;
                        RpcDelayHook.clearQueue();
                    }
                };

                RpcDelayHook.queueData = function (callback, message) {
                    var delayData = new RpcDelayData(callback, message);
                    RpcDelayHook.DelayedQueue.push(delayData);

                    if (!RpcDelayHook.RandomDelayTimeout) {
                        var delay = RpcDelayHook.CalculateDelayTime(message);
                        RpcDelayHook.RandomDelayTimeout = setTimeout(RpcDelayHook.fireRandomly, delay);
                    }
                };

                RpcDelayHook.fireRandomly = function () {
                    var delayData = RpcDelayHook.DelayedQueue.shift();

                    RpcDelayHook.DelayedMessage(delayData.message);
                    delayData.callback();

                    if (RpcDelayHook.DelayedQueue.length > 0) {
                        var delay = RpcDelayHook.CalculateDelayTime(RpcDelayHook.DelayedQueue[0].message);
                        RpcDelayHook.RandomDelayTimeout = setTimeout(RpcDelayHook.fireRandomly, delay);
                    } else {
                        RpcDelayHook.RandomDelayTimeout = null;
                    }
                };

                RpcDelayHook.clearQueue = function () {
                    for (var i = 0; i < RpcDelayHook.DelayedQueue.length; i++) {
                        var delayData = RpcDelayHook.DelayedQueue[i];
                        RpcDelayHook.DelayedMessage(delayData.message);
                        delayData.callback();
                    }

                    RpcDelayHook.DelayedQueue = [];
                };
                RpcDelayHook.RandomDelay = false;

                RpcDelayHook.DelayedQueue = [];
                return RpcDelayHook;
            })();
            RPC.RpcDelayHook = RpcDelayHook;
        })(Tools.RPC || (Tools.RPC = {}));
        var RPC = Tools.RPC;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));

if (isDebugBuild) {
    var __rpcLog = [];
}
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/Remote/rpc.js.map

// commonTestContractInterfaces.ts
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/TestContracts/commonTestContractInterfaces.js.map

// commonTestEventHelper.ts
var Common;
(function (Common) {
    "use strict";

    var EventHelperObject = (function () {
        function EventHelperObject() {
            this._eventCallbacks = {};
        }
        EventHelperObject.prototype.addEventListener = function (eventName, callback) {
            var callbacks = this._eventCallbacks[eventName];
            if (!callbacks) {
                this._eventCallbacks[eventName] = new Array();
                callbacks = this._eventCallbacks[eventName];
            }

            callbacks.push(callback);
        };

        EventHelperObject.prototype.addOneTimeListener = function (eventName, callback) {
            var _this = this;
            var eventCallback = function (data) {
                _this.removeEventListener(eventName, eventCallback);
                callback(data);
            };
            this.addEventListener(eventName, eventCallback);
        };

        EventHelperObject.prototype.removeEventListener = function (eventName, callback) {
            var callbacks = this._eventCallbacks[eventName];
            if (callbacks) {
                callbacks.splice(callbacks.indexOf(callback), 1);
            }
        };

        EventHelperObject.prototype.fireEvent = function (eventName, eventArgs) {
            if (this._eventCallbacks[eventName]) {
                var callbacks = this._eventCallbacks[eventName].slice(0);
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i](eventArgs);
                }
            }
        };

        EventHelperObject.prototype.fireEventForFirstListener = function (eventName, eventArgs) {
            if (this._eventCallbacks[eventName]) {
                var callbacks = this._eventCallbacks[eventName].slice(0);
                if (callbacks.length > 0) {
                    callbacks[0](eventArgs);
                }
            }
        };
        return EventHelperObject;
    })();
    Common.EventHelperObject = EventHelperObject;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/TestContracts/commonTestEventHelper.js.map

// ElementRecyclerFactory.ts
var Common;
(function (Common) {
    "use strict";

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
            F12.Tools.Utility.Assert.isTrue(this._index !== null, "Invalid operation. Method 'start' must be called before calling getNext.");

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
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ElementRecyclerFactory.js.map

// DataSource.ts
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/DataSource.js.map

// IItemContainerGenerator.ts
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/IItemContainerGenerator.js.map

// IItemContainerTemplateBinder.ts
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/IItemContainerTemplateBinder.js.map

// ItemContainer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var ItemContainer = (function (_super) {
                __extends(ItemContainer, _super);
                function ItemContainer() {
                    var _this = this;
                    _super.call(this, document.createElement("div"));

                    this.rootElement.id = "listItemContainer" + (ItemContainer.IdCount++);
                    this.rootElement.className = ItemContainer.BASE_CSS_CLASSNAME;
                    this.rootElement.tabIndex = -1;

                    this.rootElement.addEventListener("focus", this.onFocus.bind(this));
                    this.rootElement.addEventListener("blur", this.onBlur.bind(this));
                    this.rootElement.addEventListener("click", this.onClick.bind(this));
                    this.rootElement.addEventListener("contextmenu", this.onContextMenu.bind(this));

                    this.rootElement.addEventListener("mouseover", function () {
                        _this.rootElement.classList.add(ItemContainer.HOVER_CSS_CLASSNAME);
                    });

                    this.rootElement.addEventListener("mouseleave", function () {
                        _this.rootElement.classList.remove(ItemContainer.HOVER_CSS_CLASSNAME);
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
                        return this.id !== null && this.id === ItemContainer.FocusedContainerId;
                    },
                    set: function (value) {
                        if (value) {
                            ItemContainer.FocusedContainerId = this.id;
                        } else {
                            ItemContainer.FocusedContainerId = null;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });


                ItemContainer.prototype.clearHoverState = function () {
                    this.rootElement.classList.remove(ItemContainer.HOVER_CSS_CLASSNAME);
                };

                ItemContainer.prototype.empty = function () {
                    this.item = null;

                    this._isSelected = null;

                    this.rootElement.classList.remove("itemContainerHover");
                };

                ItemContainer.prototype.focus = function () {
                    this.isSelected = true;
                    this.hasFocus = true;
                    this.updateStyle();
                    this.rootElement.focus();
                };

                ItemContainer.prototype.updateStyle = function () {
                    if (this._isSelected) {
                        if (this.hasFocus) {
                            this.rootElement.classList.add(ItemContainer.SELECTED_ACTIVE_CSS_CLASSNAME);
                        } else {
                            this.rootElement.classList.add(ItemContainer.SELECTED_CSS_CLASSNAME);
                            this.rootElement.classList.remove(ItemContainer.SELECTED_ACTIVE_CSS_CLASSNAME);
                        }
                    } else {
                        this.rootElement.classList.remove(ItemContainer.SELECTED_CSS_CLASSNAME);
                        this.rootElement.classList.remove(ItemContainer.SELECTED_ACTIVE_CSS_CLASSNAME);
                    }
                };

                ItemContainer.prototype.onBlur = function () {
                    this.hasFocus = false;
                    this.updateStyle();
                };

                ItemContainer.prototype.onClick = function (e) {
                    if (this.clicked) {
                        this.clicked(e);

                        e.stopImmediatePropagation();
                    }
                };

                ItemContainer.prototype.onContextMenu = function (e) {
                    if (this.contextMenu) {
                        this.contextMenu();
                    }
                };

                ItemContainer.prototype.onFocus = function () {
                    this.hasFocus = true;
                    this.updateStyle();
                };
                ItemContainer.BASE_CSS_CLASSNAME = "BPT-listItemContainer";
                ItemContainer.HOVER_CSS_CLASSNAME = "BPT-listItemContainerHover";
                ItemContainer.SELECTED_CSS_CLASSNAME = "BPT-listItemSelected";
                ItemContainer.SELECTED_ACTIVE_CSS_CLASSNAME = "BPT-listItemSelectedActive";

                ItemContainer.IdCount = 0;
                return ItemContainer;
            })(Common.Controls.Legacy.Control);
            Legacy.ItemContainer = ItemContainer;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/ItemContainer.js.map

// ItemContainerGenerator.ts
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

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

                    F12.Tools.Utility.Assert.isTrue(index >= 0 && index < this._dataSource.count, "Index out of range.");

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

                ItemContainerGenerator.prototype.getNext = function () {
                    if (!this._dataSource) {
                        return null;
                    }

                    F12.Tools.Utility.Assert.isTrue(this._currentIndex !== null, "Invalid operation. startAt must be called before calling getNext.");

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
                        itemContainer = new Legacy.ItemContainer();
                    }

                    itemContainer.item = item;

                    return itemContainer;
                };
                return ItemContainerGenerator;
            })();
            Legacy.ItemContainerGenerator = ItemContainerGenerator;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/ItemContainerGenerator.js.map

// StackPanel.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var StackPanel = (function (_super) {
                __extends(StackPanel, _super);
                function StackPanel(parentContainer) {
                    _super.call(this, "Common.stackPanelTemplate", Common.templateRepository);

                    this._parentContainer = parentContainer;
                    this._parentContainer.appendChild(this.rootElement);
                    this._content = this.findElement("content");

                    this.children = {};

                    this._requestScrollToOffset = null;

                    this.rootElement.addEventListener("scroll", this.onScroll.bind(this), true);

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
                            var itemContainer = new Legacy.ItemContainer();

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
                            this._viewportHeight = Math.floor(this._parentContainer.getBoundingClientRect().height);
                        }

                        return this._viewportHeight;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(StackPanel.prototype, "viewportItemsCount", {
                    get: function () {
                        if (this.rowHeight === 0 || isNaN(this.rowHeight)) {
                            return 0;
                        }

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

                        this.scrollToOffset(scrollToPos);
                    }
                };

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

                StackPanel.prototype.render = function (detachBeforeRender) {
                    if (typeof detachBeforeRender === "undefined") { detachBeforeRender = false; }
                    if (this._isRendering) {
                        return;
                    }

                    if (!this.templateBinder) {
                        return;
                    }

                    this._isRendering = true;
                    try  {
                        this.renderCoreOverride(detachBeforeRender);

                        if (this._requestScrollToOffset !== null) {
                            if (this.scrollTopCached !== this._requestScrollToOffset) {
                                this._scrollTopCached = null;
                                this.rootElement.scrollTop = this._requestScrollToOffset;
                            }

                            this._requestScrollToOffset = null;
                        }
                    } finally {
                        this._isRendering = false;
                    }
                };

                StackPanel.prototype.renderCoreOverride = function (detachBeforeRender) {
                    if (typeof detachBeforeRender === "undefined") { detachBeforeRender = false; }
                    var index = 0;
                    this.itemContainerGenerator.startAt(0);
                    var itemContainer = this.itemContainerGenerator.getNext();

                    while (itemContainer) {
                        this.templateBinder.bind(itemContainer, index++);
                        this.rootElement.appendChild(itemContainer.rootElement);

                        itemContainer = this.itemContainerGenerator.getNext();
                    }

                    this.itemContainerGenerator.stop();
                };

                StackPanel.prototype.scrollToIndex = function (visibleIndex, scrollOffset, postponeUntilRender) {
                    if (typeof scrollOffset === "undefined") { scrollOffset = 0; }
                    var position = visibleIndex * this.rowHeight + scrollOffset;
                    this.scrollToOffset(position, postponeUntilRender);
                };

                StackPanel.prototype.scrollToOffset = function (offset, postponeUntilRender) {
                    if (postponeUntilRender) {
                        this._requestScrollToOffset = offset;
                    } else {
                        this._requestScrollToOffset = null;
                        this._scrollTopCached = null;
                        this.rootElement.scrollTop = offset;

                        this._skipNextOnScroll = true;
                        this.render();
                    }
                };

                StackPanel.prototype.onScroll = function (e) {
                    this._scrollTopCached = null;

                    if (this._skipNextOnScroll) {
                        this._skipNextOnScroll = false;
                        return;
                    }

                    this.render();

                    if (this.onScrolled) {
                        this.onScrolled(e);
                    }
                };
                return StackPanel;
            })(Common.Controls.Legacy.TemplateControl);
            Legacy.StackPanel = StackPanel;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/StackPanel.js.map

// VirtualizingStackPanel.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

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

                VirtualizingStackPanel.prototype.renderCoreOverride = function (detachBeforeRender) {
                    if (typeof detachBeforeRender === "undefined") { detachBeforeRender = false; }
                    this.updateVirtualHeight();

                    var visibleItemsCount = Math.ceil(this.getVisibleItemsScrollFraction());
                    var firstVisibleItemIndexFractional = this.getFirstVisibleItemScrollFraction();

                    if (detachBeforeRender) {
                        var tempContentParent = this.content.parentElement;
                        tempContentParent.removeChild(this.content);
                    }

                    if (firstVisibleItemIndexFractional < this.itemContainerGenerator.count) {
                        var overflowItemsCount = Math.ceil(visibleItemsCount / 4);
                        var newFirstVisibleItemIndexFloor = Math.max(0, Math.floor(firstVisibleItemIndexFractional) - overflowItemsCount);
                        var newFirstVisibleItemIndexCeiling = Math.max(0, Math.ceil(firstVisibleItemIndexFractional) - overflowItemsCount);
                        var newLastVisibleItemIndex = Math.min(this.itemContainerGenerator.count - 1, Math.ceil(this.getFirstVisibleItemScrollFraction()) + visibleItemsCount + overflowItemsCount);

                        for (var i = this._firstVisibleItemIndex; i < newFirstVisibleItemIndexFloor; ++i) {
                            this.removeItemContainerByIndex(i);
                        }

                        for (var i = newLastVisibleItemIndex + 1; i <= this._lastVisibleItemIndex; ++i) {
                            this.removeItemContainerByIndex(i);
                        }

                        this.itemContainerGenerator.startAt(newFirstVisibleItemIndexFloor);

                        var firstChild = this.content.firstChild;

                        for (var i = newFirstVisibleItemIndexFloor; i <= newLastVisibleItemIndex; ++i) {
                            var itemContainer = this.itemContainerGenerator.getNext();
                            if (!itemContainer) {
                                break;
                            }

                            itemContainer.clearHoverState();

                            this.templateBinder.bind(itemContainer, i);
                            itemContainer.rootElement.style.top = (i * this.rowHeight) + "px";

                            if (this.children[i.toString()] !== itemContainer) {
                                if (!this.content.contains(itemContainer.rootElement)) {
                                    this.content.appendChild(itemContainer.rootElement);
                                }

                                this.children[i.toString()] = itemContainer;
                            }
                        }

                        this.itemContainerGenerator.stop();

                        this._firstVisibleItemIndex = newFirstVisibleItemIndexFloor;
                        this._lastVisibleItemIndex = newLastVisibleItemIndex;
                    }

                    this.removeOrphanElements();
                    if (detachBeforeRender) {
                        tempContentParent.appendChild(this.content);
                    }
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
            })(Legacy.StackPanel);
            Legacy.VirtualizingStackPanel = VirtualizingStackPanel;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/VirtualizingStackPanel.js.map

// ListControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            

            

            var ListItemDataTemplate = (function (_super) {
                __extends(ListItemDataTemplate, _super);
                function ListItemDataTemplate(templateId, templateRepository) {
                    _super.call(this, templateId, templateRepository);
                }
                ListItemDataTemplate.prototype.updateData = function (dataItem) {
                    if (this.item !== dataItem) {
                        this.item = dataItem;
                        this.updateUiOverride(dataItem);
                    }
                };

                ListItemDataTemplate.prototype.updateUiOverride = function (item) {
                };
                return ListItemDataTemplate;
            })(Common.Controls.Legacy.TemplateControl);
            Legacy.ListItemDataTemplate = ListItemDataTemplate;

            var ListControl = (function (_super) {
                __extends(ListControl, _super);
                function ListControl(rootElement) {
                    var _this = this;
                    _super.call(this, rootElement);
                    this.dataItemTemplateType = Common.Controls.Legacy.ListItemDataTemplate;

                    this._selectedItemVisibleIndex = -1;

                    this.rootElement.tabIndex = 0;
                    this.rootElement.addEventListener("keydown", this.onKeyDown.bind(this));

                    this.panel = new Legacy.VirtualizingStackPanel(this.rootElement);
                    this.panel.templateBinder = this;
                    this.panel.onScrolled = function (e) {
                        if (_this.onScrolled) {
                            _this.onScrolled(e);
                        }
                    };

                    this._itemContainerGenerator = new Legacy.ItemContainerGenerator();
                    this.panel.itemContainerGenerator = this._itemContainerGenerator;

                    this.invalidateSizeCache();
                }
                Object.defineProperty(ListControl.prototype, "ariaLabel", {
                    get: function () {
                        return this.rootElement.getAttribute("aria-label");
                    },
                    set: function (value) {
                        this.rootElement.setAttribute("aria-label", value);
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListControl.prototype, "dataSource", {
                    get: function () {
                        return this._dataSource;
                    },
                    set: function (value) {
                        if (this._dataSource !== value) {
                            var selectionViewportOffset = 0;

                            if (this._selectedItem && this._itemContainerGenerator) {
                                var selectedItemContainer = this._itemContainerGenerator.getItemContainerFromItemId(this._selectedItem.id);
                                if (selectedItemContainer) {
                                    selectionViewportOffset = this.panel.getScrollViewportOffset(selectedItemContainer);
                                }
                            }

                            this._dataSource = value;

                            if (this._selectedItem && this._dataSource) {
                                this._selectedItemVisibleIndex = this.getVisibleIndexOfItem(this._selectedItem);
                                if (this._selectedItemVisibleIndex < 0) {
                                    this.selectedItem = null;
                                    this.panel.scrollToOffset(0, true);
                                } else {
                                    this.panel.scrollToIndex(this._selectedItemVisibleIndex, -selectionViewportOffset, true);
                                }
                            } else {
                                this.panel.scrollToOffset(0, true);
                            }

                            this._itemContainerGenerator.setDataSource(value);
                            this.panel.invalidate();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListControl.prototype, "itemContainerGenerator", {
                    get: function () {
                        return this._itemContainerGenerator;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListControl.prototype, "selectedIndex", {
                    get: function () {
                        return this._selectedItemVisibleIndex;
                    },
                    set: function (index) {
                        if (index < 0) {
                            this.selectedItem = null;
                        } else {
                            this.setSelectedItemVisibleIndex(index);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListControl.prototype, "selectedItem", {
                    get: function () {
                        return this._selectedItem;
                    },
                    set: function (value) {
                        if (this._selectedItem !== value || (this._selectedItem && value && this._selectedItem.id !== value.id)) {
                            var itemContainer = this.getSelectedItemContainer();
                            if (itemContainer) {
                                itemContainer.isSelected = false;
                            }

                            this._selectedItem = value;

                            if (this._selectedItem) {
                                this._selectedItemVisibleIndex = this.getVisibleIndexOfItem(this._selectedItem);
                            } else {
                                this._selectedItemVisibleIndex = -1;
                            }

                            itemContainer = this.getSelectedItemContainer(true);
                            if (itemContainer) {
                                this.setItemContainerAriaLabel(itemContainer);
                                itemContainer.focus();
                            }

                            if (this._selectedItemVisibleIndex >= 0) {
                                this.panel.ensureVisible(this._selectedItemVisibleIndex);
                            }

                            if (this.selectedItemChanged) {
                                this.selectedItemChanged(this._selectedItem);
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListControl.prototype, "offsetLeft", {
                    get: function () {
                        if (this._offsetLeft === null) {
                            this._offsetLeft = this.rootElement.offsetLeft;
                        }

                        return this._offsetLeft;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ListControl.prototype, "offsetTop", {
                    get: function () {
                        if (this._offsetTop === null) {
                            this._offsetTop = this.rootElement.offsetTop;
                        }

                        return this._offsetTop;
                    },
                    enumerable: true,
                    configurable: true
                });

                ListControl.prototype.bind = function (itemContainer, itemIndex) {
                    var dataItem = itemContainer.item;

                    if (!itemContainer.template) {
                        if (!this.dataItemTemplateType) {
                            throw new Error("Expecting a data item template type.");
                        }

                        itemContainer.template = new this.dataItemTemplateType();
                        itemContainer.rootElement.tabIndex = -1;
                        itemContainer.rootElement.appendChild(itemContainer.template.rootElement);
                    }

                    itemContainer.rootElement.setAttribute("data-id", itemContainer.id.toString());

                    this.updateContainerOverride(itemContainer, itemIndex);

                    itemContainer.clicked = this.onItemSelected.bind(this, itemContainer);
                    itemContainer.contextMenu = this.onItemSelected.bind(this, itemContainer);

                    itemContainer.isSelected = this._selectedItem && itemContainer.id === this._selectedItem.id;
                };

                ListControl.prototype.cleanupContainerOverride = function (container) {
                };

                ListControl.prototype.getItemContainerFromItem = function (item, scrollIfNeeded) {
                    var itemContainer = this._itemContainerGenerator.getItemContainerFromItemId(item.id);
                    if (!itemContainer && scrollIfNeeded) {
                        this.scrollToItem(item);

                        itemContainer = this._itemContainerGenerator.getItemContainerFromItemId(item.id);
                    }

                    return itemContainer;
                };

                ListControl.prototype.getSelectedItemContainer = function (scrollIfNeeded) {
                    if (this.selectedItem) {
                        return this.getItemContainerFromItem(this.selectedItem, scrollIfNeeded);
                    }

                    return null;
                };

                ListControl.prototype.invalidate = function () {
                    this.panel.invalidate();
                    this.panel.render(true);

                    var panelScrollBarShown = this.panel.virtualHeight > this.panel.viewportHeight;
                    if (panelScrollBarShown !== this._panelScrollBarShown) {
                        this._panelScrollBarShown = panelScrollBarShown;
                        this.invalidateSizeCache();
                    }

                    this.onInvalidated();
                };

                ListControl.prototype.invalidateSizeCache = function () {
                    this._offsetLeft = null;
                    this._offsetTop = null;

                    this.panel.invalidateSizeCache();
                };

                ListControl.prototype.onInvalidated = function () {
                };

                ListControl.prototype.onKeyDownOverride = function (event) {
                    return false;
                };

                ListControl.prototype.onShowContextMenu = function () {
                };

                ListControl.prototype.onWindowResize = function () {
                    this.invalidateSizeCache();
                    this.invalidate();
                };

                ListControl.prototype.render = function () {
                    this.invalidate();
                };

                ListControl.prototype.scrollToItem = function (item) {
                    var visibleIndex = this.getVisibleIndexOfItem(item);
                    if (visibleIndex >= 0) {
                        this.panel.ensureVisible(visibleIndex);
                    }
                };

                ListControl.prototype.selectEnd = function () {
                    if (this._selectedItemVisibleIndex < 0) {
                        return;
                    }

                    this.setSelectedItemVisibleIndex(this._itemContainerGenerator.count - 1);
                };

                ListControl.prototype.selectHome = function () {
                    if (this._selectedItemVisibleIndex < 0) {
                        return;
                    }

                    this.setSelectedItemVisibleIndex(0);
                };

                ListControl.prototype.selectPreviousItem = function () {
                    if (this._selectedItemVisibleIndex < 0) {
                        return;
                    }

                    this.setSelectedItemVisibleIndex(this._selectedItemVisibleIndex - 1);
                };

                ListControl.prototype.selectPageDown = function () {
                    if (this._selectedItemVisibleIndex < 0) {
                        return;
                    }

                    this.setSelectedItemVisibleIndex(this._selectedItemVisibleIndex + this.panel.viewportItemsCount);
                };

                ListControl.prototype.selectPageUp = function () {
                    if (this._selectedItemVisibleIndex < 0) {
                        return;
                    }

                    this.setSelectedItemVisibleIndex(this._selectedItemVisibleIndex - this.panel.viewportItemsCount);
                };

                ListControl.prototype.selectNextItem = function () {
                    if (this._selectedItemVisibleIndex < 0) {
                        return;
                    }

                    this.setSelectedItemVisibleIndex(this._selectedItemVisibleIndex + 1);
                };

                ListControl.prototype.unbind = function (itemContainer) {
                    itemContainer.clicked = null;
                    itemContainer.rootElement.removeAttribute("aria-label");

                    this.cleanupContainerOverride(itemContainer);
                };

                ListControl.prototype.updateContainerOverride = function (container, itemIndex) {
                    var data = container.item;
                    var template = container.template;
                    this.updateTemplateData(template, data);
                };

                ListControl.prototype.updateTemplateData = function (template, data) {
                    template.updateData(data);
                };

                ListControl.prototype.getVisibleIndexOfItem = function (item) {
                    if (this.dataSource) {
                        return this.dataSource.indexOfItem(item.id);
                    } else {
                        return -1;
                    }
                };

                ListControl.prototype.onKeyDown = function (event) {
                    var handled = this.onKeyDownOverride(event);

                    if (!handled) {
                        handled = true;

                        switch (event.keyCode) {
                            case 38 /* ArrowUp */:
                                if (this._selectedItemVisibleIndex < 0) {
                                    this.setSelectedItemVisibleIndex(0);
                                } else {
                                    this.selectPreviousItem();
                                }

                                break;

                            case 40 /* ArrowDown */:
                                if (this._selectedItemVisibleIndex < 0) {
                                    this.setSelectedItemVisibleIndex(0);
                                } else {
                                    this.selectNextItem();
                                }

                                break;

                            case 33 /* PageUp */:
                                this.selectPageUp();
                                break;

                            case 34 /* PageDown */:
                                this.selectPageDown();
                                break;

                            case 36 /* Home */:
                                this.selectHome();
                                break;

                            case 35 /* End */:
                                this.selectEnd();
                                break;

                            case 93 /* ContextMenu */:
                                this.onShowContextMenu();
                                break;

                            case 121 /* F10 */:
                                if (event.shiftKey && !event.ctrlKey && !event.altKey) {
                                    this.onShowContextMenu();
                                }

                                break;

                            default:
                                handled = false;
                        }
                    }

                    if (handled) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                };

                ListControl.prototype.onItemSelected = function (itemContainer, e) {
                    var select;

                    if (e && !e.altKey && e.ctrlKey && !e.shiftKey) {
                        select = !itemContainer.isSelected;
                    } else {
                        select = true;
                    }

                    if (select) {
                        this.selectedItem = itemContainer.item;
                        itemContainer.focus();
                    } else {
                        this.selectedItem = null;
                    }
                };

                ListControl.prototype.setItemContainerAriaLabel = function (itemContainer) {
                    if (itemContainer) {
                        var ariaLabel;
                        var dataItem = itemContainer.item;

                        if (dataItem && this.onGetItemContainerAriaLabel) {
                            ariaLabel = this.onGetItemContainerAriaLabel(itemContainer);
                        }

                        if (ariaLabel) {
                            itemContainer.rootElement.setAttribute("aria-label", ariaLabel);
                        } else {
                            itemContainer.rootElement.removeAttribute("aria-label");
                        }
                    }
                };

                ListControl.prototype.setSelectedItemVisibleIndex = function (newVisibleIndex) {
                    var itemContainer = null;

                    var totalVisibleCount = this._itemContainerGenerator.count;

                    if (newVisibleIndex < 0) {
                        newVisibleIndex = 0;
                    }

                    if (newVisibleIndex >= totalVisibleCount) {
                        newVisibleIndex = totalVisibleCount - 1;
                    }

                    if (this._selectedItemVisibleIndex >= 0 && this._selectedItemVisibleIndex === newVisibleIndex) {
                        itemContainer = this.getSelectedItemContainer();
                    } else {
                        if (newVisibleIndex >= 0 && newVisibleIndex < totalVisibleCount) {
                            this._itemContainerGenerator.startAt(newVisibleIndex);
                            itemContainer = this._itemContainerGenerator.getNext();
                            this._itemContainerGenerator.stop();
                            if (itemContainer) {
                                var item = itemContainer.item;

                                if (!itemContainer.rootElement.parentElement) {
                                    this._itemContainerGenerator.recycle(newVisibleIndex);
                                }

                                this.selectedItem = item;
                            }
                        }
                    }

                    return itemContainer;
                };
                return ListControl;
            })(Common.Controls.Legacy.Control);
            Legacy.ListControl = ListControl;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/ListControl.js.map

// TreeListControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            

            

            var TreeItemDataTemplate = (function (_super) {
                __extends(TreeItemDataTemplate, _super);
                function TreeItemDataTemplate(templateId, templateRepository) {
                    _super.call(this, templateId, templateRepository);
                    this.indentationInPixels = TreeItemDataTemplate.INDENTATION_IN_PIXELS_DEFAULT;

                    this._expander = this.findElement("expander");
                    F12.Tools.Utility.Assert.isTrue(!!this._expander, "Expecting an expander element");

                    this._expander.addEventListener("click", this.onExpansionClicked.bind(this));

                    this.rootElement.addEventListener("dblclick", this.onRootElementDblClicked.bind(this));
                }
                TreeItemDataTemplate.prototype.collapse = function () {
                    if (this.item && this.item.hasChildren) {
                        if (!this._expander.classList.contains(TreeItemDataTemplate.COLLAPSED_CSS_CLASS)) {
                            this.onExpansionClicked(null);
                            return true;
                        }
                    }

                    return false;
                };

                TreeItemDataTemplate.prototype.expand = function () {
                    if (this.item && this.item.hasChildren) {
                        if (!this._expander.classList.contains(TreeItemDataTemplate.EXPANDED_CSS_CLASS)) {
                            this.onExpansionClicked(null);
                            return true;
                        }
                    }

                    return false;
                };

                TreeItemDataTemplate.prototype.updateUiOverride = function (dataItem) {
                    _super.prototype.updateUiOverride.call(this, dataItem);

                    if (dataItem) {
                        this._expander.style.marginLeft = (dataItem.level * this.indentationInPixels) + "px";
                        this.setExpanderCss(dataItem);
                    }
                };

                TreeItemDataTemplate.prototype.onExpansionClicked = function (e) {
                    if (e) {
                        e.stopImmediatePropagation();
                    }

                    if (this.expansionToggledCallback) {
                        this.expansionToggledCallback();
                    }
                };

                TreeItemDataTemplate.prototype.onRootElementDblClicked = function (e) {
                    if (e) {
                        if (e.srcElement && e.srcElement === this._expander) {
                            e.stopImmediatePropagation();
                            return;
                        }
                    }

                    this.onExpansionClicked(e);
                };

                TreeItemDataTemplate.prototype.setExpanderCss = function (dataItem) {
                    if (dataItem.hasChildren) {
                        this._expander.classList.remove(TreeItemDataTemplate.NO_EXPANDER_CSS_CLASS);
                        if (!dataItem.isExpanded) {
                            this._expander.classList.remove(TreeItemDataTemplate.EXPANDED_CSS_CLASS);
                            this._expander.classList.add(TreeItemDataTemplate.COLLAPSED_CSS_CLASS);
                        } else {
                            this._expander.classList.remove(TreeItemDataTemplate.COLLAPSED_CSS_CLASS);
                            this._expander.classList.add(TreeItemDataTemplate.EXPANDED_CSS_CLASS);
                        }
                    } else {
                        this._expander.classList.remove(TreeItemDataTemplate.EXPANDED_CSS_CLASS);
                        this._expander.classList.remove(TreeItemDataTemplate.COLLAPSED_CSS_CLASS);
                        this._expander.classList.add(TreeItemDataTemplate.NO_EXPANDER_CSS_CLASS);
                    }
                };
                TreeItemDataTemplate.INDENTATION_IN_PIXELS_DEFAULT = 13;
                TreeItemDataTemplate.COLLAPSED_CSS_CLASS = "BPT-itemCollapsed";
                TreeItemDataTemplate.EXPANDED_CSS_CLASS = "BPT-itemExpanded";
                TreeItemDataTemplate.NO_EXPANDER_CSS_CLASS = "BPT-noExpander";
                return TreeItemDataTemplate;
            })(Legacy.ListItemDataTemplate);
            Legacy.TreeItemDataTemplate = TreeItemDataTemplate;

            var TreeListControl = (function (_super) {
                __extends(TreeListControl, _super);
                function TreeListControl(rootElement) {
                    _super.call(this, rootElement);

                    this.dataItemTemplateType = Common.Controls.Legacy.TreeItemDataTemplate;

                    this._onAriaExpandedModifiedHandler = this.onAriaExpandedModified.bind(this);
                }
                TreeListControl.prototype.updateContainerOverride = function (itemContainer, itemIndex) {
                    _super.prototype.updateContainerOverride.call(this, itemContainer, itemIndex);

                    var dataItem = itemContainer.item;
                    var template = itemContainer.template;

                    if (dataItem) {
                        itemContainer.rootElement.removeEventListener("DOMAttrModified", this._onAriaExpandedModifiedHandler);
                        if (dataItem.hasChildren) {
                            itemContainer.rootElement.setAttribute("aria-expanded", dataItem.isExpanded ? "true" : "false");
                            template.expansionToggledCallback = this.onExpansionToggled.bind(this, itemContainer, itemIndex);
                            itemContainer.rootElement.addEventListener("DOMAttrModified", this._onAriaExpandedModifiedHandler);
                        } else {
                            itemContainer.rootElement.removeAttribute("aria-expanded");
                        }
                    }
                };

                TreeListControl.prototype.onKeyDownOverride = function (event) {
                    var handled = false;

                    var seletedItemTemplate;
                    var selectedItem;

                    switch (event.keyCode) {
                        case 39 /* ArrowRight */:
                            var selectedItemContainer = this.getSelectedItemContainer();
                            if (selectedItemContainer) {
                                seletedItemTemplate = selectedItemContainer.template;
                                selectedItem = selectedItemContainer.item;
                                if (!seletedItemTemplate.expand() && selectedItem.hasChildren) {
                                    this.selectNextItem();
                                    handled = true;
                                }
                            }

                            break;

                        case 37 /* ArrowLeft */:
                            var selectedItemContainer = this.getSelectedItemContainer();
                            if (selectedItemContainer) {
                                seletedItemTemplate = selectedItemContainer.template;
                                selectedItem = selectedItemContainer.item;
                                if (!seletedItemTemplate.collapse() && selectedItem.level > 0) {
                                    var parentIndex = this.dataSource.indexOfParent(selectedItem.id);
                                    if (parentIndex >= 0) {
                                        this.selectedIndex = parentIndex;
                                        handled = true;
                                    }
                                }
                            }

                            break;

                        case 107 /* Plus */:
                            var selectedItemContainer = this.getSelectedItemContainer();
                            if (selectedItemContainer) {
                                selectedItemContainer.template.expand();
                                handled = true;
                            }

                            break;

                        case 109 /* Minus */:
                            var selectedItemContainer = this.getSelectedItemContainer();
                            if (selectedItemContainer) {
                                selectedItemContainer.template.collapse();
                                handled = true;
                            }

                            break;
                    }

                    if (!handled) {
                        handled = _super.prototype.onKeyDownOverride.call(this, event);
                    }

                    return handled;
                };

                TreeListControl.prototype.cleanupContainerOverride = function (itemContainer) {
                    var template = itemContainer.template;
                    if (template) {
                        template.expansionToggledCallback = null;
                    }

                    itemContainer.rootElement.removeEventListener("DOMAttrModified", this._onAriaExpandedModifiedHandler);
                };

                TreeListControl.prototype.onAriaExpandedModified = function (event) {
                    if (event.attrName === "aria-expanded") {
                        var element = event.target;
                        var itemId = parseInt(element.getAttribute("data-id"));
                        var itemContainer = this.itemContainerGenerator.getItemContainerFromItemId(itemId);
                        if (itemContainer) {
                            var itemTemplate = itemContainer.template;
                            if (event.newValue === "true") {
                                itemTemplate.expand();
                            } else {
                                itemTemplate.collapse();
                            }
                        }
                    }
                };

                TreeListControl.prototype.onExpansionToggled = function (itemContainer, itemIndex) {
                    var dataItem = itemContainer.item;

                    if (dataItem.isExpanded) {
                        this.dataSource.collapseBranch(itemIndex);
                    } else {
                        this.dataSource.expandBranch(itemIndex);
                    }

                    this.selectedItem = dataItem;
                    this.invalidate();

                    var selectedItemContainer = this.getSelectedItemContainer();
                    if (selectedItemContainer) {
                        selectedItemContainer.focus();
                    }
                };
                return TreeListControl;
            })(Legacy.ListControl);
            Legacy.TreeListControl = TreeListControl;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/ListControl/TreeListControl.js.map

// messageThrottle.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    "use strict";

    

    var MessageThrottle = (function () {
        function MessageThrottle() {
            this._packetCount = 0;
            this._data = "";
        }
        MessageThrottle.splitMessage = function (data) {
            var length = data.length;
            var count = Math.max(1, Math.ceil(length / MessageThrottle.MAX_MESSAGE_LENGTH));
            var messages = [];
            for (var i = 0; i < count; i++) {
                var start = i * MessageThrottle.MAX_MESSAGE_LENGTH;
                var end = start + Math.min(MessageThrottle.MAX_MESSAGE_LENGTH, length - start);
                var part = data.slice(start, end);
                var msg = {
                    n: count,
                    data: part
                };

                messages.push(JSON.stringify(msg));
            }

            return messages;
        };

        MessageThrottle.prototype.combineMessages = function (message) {
            var packet = JSON.parse(message.data);
            if (packet.n >= 1) {
                this._data += packet.data || "";
                this._packetCount++;
                if (this._packetCount === packet.n) {
                    var data = this._data;
                    this._packetCount = 0;
                    this._data = "";
                    message.data = data;
                    message.handled = false;
                } else {
                    message.handled = true;
                }
            } else {
                message.handled = true;
            }
        };
        MessageThrottle.MAX_MESSAGE_LENGTH = 1024 * 32;
        return MessageThrottle;
    })();
    Common.MessageThrottle = MessageThrottle;

    var PortThrottler = (function (_super) {
        __extends(PortThrottler, _super);
        function PortThrottler(port) {
            _super.call(this);
            this._messageHandlers = [];
            this._port = port;
        }
        Object.defineProperty(PortThrottler.prototype, "name", {
            get: function () {
                return this._port.name;
            },
            enumerable: true,
            configurable: true
        });

        PortThrottler.prototype.initialize = function () {
            this._port.addEventListener("message", this.onmessage.bind(this));
        };

        PortThrottler.prototype.postMessage = function (data) {
            var packets = MessageThrottle.splitMessage(data);
            var x, n;
            for (x = 0, n = packets.length; x < n; x++) {
                var p = packets[x];
                this._port.postMessage(p);
            }

            return true;
        };

        PortThrottler.prototype.addEventListener = function (type, listener) {
            if (type !== "message") {
                throw new Error("Invalid event type");
            }

            this._messageHandlers.push(listener);
        };

        PortThrottler.prototype.removeEventListener = function (type, listener) {
            if (type !== "message") {
                throw new Error("Invalid event type");
            }

            while (true) {
                var i = this._messageHandlers.indexOf(listener);
                if (i === -1) {
                    break;
                }

                this._messageHandlers.splice(i, 1);
            }
        };

        PortThrottler.prototype.onmessage = function (message) {
            this.combineMessages(message);
            if (!message.handled) {
                var x, n;
                for (x = 0, n = this._messageHandlers.length; x < n; x++) {
                    var h = this._messageHandlers[x];
                    h(message);
                }
            }
        };
        return PortThrottler;
    })(MessageThrottle);
    Common.PortThrottler = PortThrottler;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/built/messageThrottle.js.map


// SIG // Begin signature block
// SIG // MIIaqwYJKoZIhvcNAQcCoIIanDCCGpgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFCsIGEg7xCDx
// SIG // lumnHmtFYi514OJNoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AABMoehNzLR0ezsAAAAAAEwwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMTExMTIy
// SIG // MTEzMVoXDTE1MDIxMTIyMTEzMVowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpDMEY0LTMwODYtREVGODEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBALHY+hsGK3eo5JRdfA/meqaS7opUHaT5hHWFl8zL
// SIG // XJbQ13Ut2Qj7W9LuLSXGNz71q34aU+VXvmvov8qWCtxG
// SIG // 8VoePgLSsuAmjgBke748k/hYMnmH0hpdI7ycUcQPEPoE
// SIG // WLUWdm7svMblvvytrMFB26rOefUcsplBp3olK/+reA1Y
// SIG // OrFeUN5kTODKFSrfpun+pGYvWxAJCSYh1D8NL23S+HeQ
// SIG // A2zeFBKljOc2H/SHpbBBF2/jTXRmwv2icUY1UcxrF1Fj
// SIG // +hWUkppfSyi65hZFSekstf6Lh6/8pW1D3KYw+iko75sN
// SIG // LFyD3hKNarTbce9cFFoqIyj/gXBX8YwHmhPYKlMCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBS5Da2zTfTanxqyJyZV
// SIG // DSBE2Jji9DAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAJik4Gr+jt
// SIG // gs8dB37XKqckCy2vmlskf5RxDFWIJBpSFWPikE0FSphK
// SIG // nPvhp21oVYK5KeppqbLV4wza0dZ6JTd4ZxwM+9spWhqX
// SIG // OCo5Vkb7NYG55D1GWo7k/HU3WFlJi07bPBWdc1JL63sM
// SIG // OsItwbObUi3gNcW5wVez6D2hPETyIxYeCqpZNyfQlVJe
// SIG // qH8/VPCB4dyavWXVePb3TDm73eDWNw6RmoeMc+dxZFL3
// SIG // PgPYxs1yuDQ0mFuM0/UIput4xlGgDQ5v9Gs8QBpgFiyp
// SIG // BlKdHBOQzm8CHup7nLP2+Jdg8mXR0R+HOsF18EKNeu2M
// SIG // crJ7+yyKtJFHVOIuacwWVBpZMIIE7DCCA9SgAwIBAgIT
// SIG // MwAAAMps1TISNcThVQABAAAAyjANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xNDA0
// SIG // MjIxNzM5MDBaFw0xNTA3MjIxNzM5MDBaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCWcV3tBkb6
// SIG // hMudW7dGx7DhtBE5A62xFXNgnOuntm4aPD//ZeM08aal
// SIG // IV5WmWxY5JKhClzC09xSLwxlmiBhQFMxnGyPIX26+f4T
// SIG // UFJglTpbuVildGFBqZTgrSZOTKGXcEknXnxnyk8ecYRG
// SIG // vB1LtuIPxcYnyQfmegqlFwAZTHBFOC2BtFCqxWfR+nm8
// SIG // xcyhcpv0JTSY+FTfEjk4Ei+ka6Wafsdi0dzP7T00+Lnf
// SIG // NTC67HkyqeGprFVNTH9MVsMTC3bxB/nMR6z7iNVSpR4o
// SIG // +j0tz8+EmIZxZRHPhckJRIbhb+ex/KxARKWpiyM/gkmd
// SIG // 1ZZZUBNZGHP/QwytK9R/MEBnAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUH17i
// SIG // XVCNVoa+SjzPBOinh7XLv4MwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1K2I0
// SIG // MjE4ZjEzLTZmY2EtNDkwZi05YzQ3LTNmYzU1N2RmYzQ0
// SIG // MDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEAd1zr15E9zb17g9mFqbBDnXN8F8kP7Tbbx7UsG177
// SIG // VAU6g3FAgQmit3EmXtZ9tmw7yapfXQMYKh0nfgfpxWUf
// SIG // tc8Nt1THKDhaiOd7wRm2VjK64szLk9uvbg9dRPXUsO8b
// SIG // 1U7Brw7vIJvy4f4nXejF/2H2GdIoCiKd381wgp4Yctgj
// SIG // zHosQ+7/6sDg5h2qnpczAFJvB7jTiGzepAY1p8JThmUR
// SIG // dwmPNVm52IaoAP74MX0s9IwFncDB1XdybOlNWSaD8cKy
// SIG // iFeTNQB8UCu8Wfz+HCk4gtPeUpdFKRhOlludul8bo/En
// SIG // UOoHlehtNA04V9w3KDWVOjic1O1qhV0OIhFeezCCBbww
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
// SIG // L54/LlUWa8kTo/0xggSVMIIEkQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGuMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBQANCMWg1NN
// SIG // TgGC42LOeu+iJ11/RzBOBgorBgEEAYI3AgEMMUAwPqAk
// SIG // gCIAQwBvAG0AbQBvAG4ATQBlAHIAZwBlAGQAXwAyAC4A
// SIG // agBzoRaAFGh0dHA6Ly9taWNyb3NvZnQuY29tMA0GCSqG
// SIG // SIb3DQEBAQUABIIBABWGaLjZrvUCscpjGY5P1M+R9O6L
// SIG // G2YdS8tvSy50Dy8ov7q/E9sqYyXs7pMT0JVO25NkIaoB
// SIG // Ur/xWiimQC3loPpp2hjQVg2oSUlGkKTSX3P941Pg0y6W
// SIG // IxyGkuh58YHowSl6vqnsy21Cn5rT8s468HgrwCe30tz1
// SIG // 6ip1JVXTotXidDZwzjV52dsHpZIL+eAv/SrfJIlTyiDK
// SIG // oWyKtRv2V1W8viXmVXwx203KDXJsvRg7uxDRAO4AS9oP
// SIG // e5XtLWvC3D7DMAn/fBtxaVQy++vPQHeV2a684CaSYh48
// SIG // rON7eseRWe+F5UmgH5vuYBusNGmNX2l0BEoxyWwPpjJR
// SIG // 7vxj812hggIoMIICJAYJKoZIhvcNAQkGMYICFTCCAhEC
// SIG // AQEwgY4wdzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UE
// SIG // AxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBAhMzAAAA
// SIG // TKHoTcy0dHs7AAAAAABMMAkGBSsOAwIaBQCgXTAYBgkq
// SIG // hkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJ
// SIG // BTEPFw0xNDA3MjMwOTA2MjZaMCMGCSqGSIb3DQEJBDEW
// SIG // BBTul5iUoZKRJtKIoD5Ej8cNtyUHizANBgkqhkiG9w0B
// SIG // AQUFAASCAQAkL6jsxZoMglIqrSWoMvZNEu0x+Z2s8LVh
// SIG // RWHuxt3//Y9CjKI1GzKPyzhl13XBSv0EY9c/OefuLT6m
// SIG // doeTtA4Kjb03KJtyJXa3y4jL9PsfV7uLpTMuFCOS4lYR
// SIG // 0QxkhKjJWf+ZTsXAo40KQX/f/ZCGGJ+VTN4Ex+mCmYbV
// SIG // TMkBpAFLonsKBq5b/+UtqSCWzUCGv3Gk24t5fvYpgdlj
// SIG // G1AYFB2pZf59hLz9NpN3gdM4NznhGiXDgUwqx9t+qfe4
// SIG // fN8MAHPuoOQSnT3g0a5AKbiKV3mWIl81oXqunl7sQ34s
// SIG // pHfZ99zAd7Sw2BnQBZMnijT2a00Uaaiq6d/H5WatmVj6
// SIG // End signature block
