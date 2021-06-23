var __n = window.__n || function () { };

var $$modules = $$modules || {};

function registerModule(name, factory) {
    $$modules[name] = $$modules[name] || factory;
}

function loadModule(name) {
    var res = $$modules[name];
    if (typeof res === 'function') {
        $$modules[name] = res = res();
    }
    return res;
}

// Put an implementation of setImmediate and msSetImmediate in place for browsers < IE10
window.setImmediate = window.setImmediate || function (callback) {
    window.setTimeout(callback, 0);
};

window.msSetImmediate = window.msSetImmediate || window.setImmediate;

// Provide a replacement for classList if we are < IE10
if (!("classList" in document.documentElement)) {
    var ClassListObject = function (element) {
        var classNameString = element.className.trim();
        var classNameArray = classNameString ? classNameString.split(/\s+/) : [];
        for (var i = 0; i < classNameArray.length; i++) {
            this.push(classNameArray[i]);
        }
        this._update = function () {
            element.className = this.toString();
        };
    };
    var classListPrototype = ClassListObject["prototype"] = [];

    // classList is a DOMTokenList, which supports item, contains, add, remove, toggle methods and a length property, 
    // we'll add a toString just for convienence.
    classListPrototype.item = function (index) {
        return this[index] || null;
    };
    classListPrototype.contains = function (toCheck) {
        return this.indexOf(toCheck + "") !== -1;
    };
    classListPrototype.add = function (className) {
        className += "";
        if (className.match(/\s+/)) {
            var err = new Error();
            err.code = DOMException.INVALID_CHARACTER_ERR;
            throw err;
        }

        var alreadyPresent = this.contains(className);
        if (!alreadyPresent) {
            this.push(className);
            this._update();
        }
    };
    classListPrototype.remove = function (className) {
        className += "";
        var itemIndex = this.indexOf(className);
        var present = (itemIndex !== -1);
        if (present) {
            this.splice(itemIndex, 1);
            this._update();
        }
    };
    classListPrototype.toggle = function (className) {
        className += "";
        this.contains(className) ? this.remove(className) : this.add(className);
    }
    classListPrototype.toString = function () {
        return this.join(" ");
    };

    var classListFactory = function () {
        return new ClassListObject(this);
    };

    var classListPropertyDescriptor = { get: classListFactory, enumerable: true, configurable: true };
    Object.defineProperty(self.HTMLElement["prototype"], "classList", classListPropertyDescriptor);
}var CoreImpl = (function () {
    function CoreImpl() {
        var _this = this;
        (window).__hostMessageReceived = function (message) {
            if(_this.messageReceived) {
                _this.messageReceived(message);
            }
        };
    }
    CoreImpl.prototype.hostDescription = function () {
        return (window.external).getHostDescription();
    };
    CoreImpl.prototype.postMessage = function (message) {
        (window.external).postMessage(message);
    };
    return CoreImpl;
})();
registerModule("plugin.host.core", function () {
    return new CoreImpl();
});
var DiagnosticsImpl = (function () {
    function DiagnosticsImpl() { }
    DiagnosticsImpl.prototype.reportError = function (message, url, lineNumber, additionalInfo, columnNumber) {
        return (window).external.reportError(message, url, lineNumber, additionalInfo, columnNumber);
    };
    DiagnosticsImpl.prototype.terminate = function () {
        (window).external.terminate();
    };
    return DiagnosticsImpl;
})();
registerModule("plugin.host.diagnostics", function () {
    return new DiagnosticsImpl();
});
var OutputImpl = (function () {
    function OutputImpl() {
        this.outputObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.Output");
    }
    OutputImpl.prototype.log = function (message) {
        this.outputObject._post("log", message);
    };
    return OutputImpl;
})();
registerModule("plugin.host.output", function () {
    return new OutputImpl();
});
var ResourcesImpl = (function () {
    function ResourcesImpl() {
        this.resourcesObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.Resources");
        this.addEventListener = this.resourcesObject.addEventListener.bind(this.resourcesObject);
        this.removeEventListener = this.resourcesObject.removeEventListener.bind(this.resourcesObject);
    }
    return ResourcesImpl;
})();
registerModule("plugin.host.resources", function () {
    return new ResourcesImpl();
});
var StorageImpl = (function () {
    function StorageImpl() {
        this.storageObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.Storage");
    }
    StorageImpl.prototype.closeFile = function (streamId) {
        return this.storageObject._call("close", streamId);
    };
    StorageImpl.prototype.fileDialog = function (mode, dialogOptions, fileOptions) {
        return this.storageObject._call("fileDialog", mode, dialogOptions, fileOptions);
    };
    StorageImpl.prototype.getFileList = function (path, persistence, index, count) {
        persistence = (persistence === null || typeof persistence === "undefined") ? Plugin.Storage.FilePersistence.temporary : persistence;
        index = index || 0;
        count = count || 0;
        return this.storageObject._call("getFileList", path, persistence, index, count);
    };
    StorageImpl.prototype.openFile = function (path, options) {
        return this.storageObject._call("openFile", path, options);
    };
    StorageImpl.prototype.read = function (streamId, count, type) {
        switch(type) {
            case Plugin.Storage.FileType.binary:
                return this.storageObject._call("readBinary", streamId, count);
            case Plugin.Storage.FileType.text:
                return this.storageObject._call("readText", streamId, count);
            default:
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.7004"));
        }
    };
    StorageImpl.prototype.seek = function (streamId, offset, origin) {
        return this.storageObject._call("seek", streamId, offset, origin);
    };
    StorageImpl.prototype.write = function (streamId, data, offset, count, type) {
        switch(type) {
            case Plugin.Storage.FileType.binary:
                return this.storageObject._call("writeBinary", streamId, data, offset, count);
            case Plugin.Storage.FileType.text:
                return this.storageObject._call("writeText", streamId, data, offset, count);
            default:
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.7004"));
        }
    };
    return StorageImpl;
})();
registerModule("plugin.host.storage", function () {
    return new StorageImpl();
});
var ThemeImpl = (function () {
    function ThemeImpl() {
        this.themeObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.Theme");
    }
    ThemeImpl.prototype.addEventListener = function (name, callback) {
        this.themeObject.addEventListener(name, callback);
    };
    ThemeImpl.prototype.fireThemeReady = function () {
        this.themeObject._post("fireThemeReady");
    };
    ThemeImpl.prototype.getCssFile = function (name) {
        return this.themeObject._call("getCssFile", name);
    };
    return ThemeImpl;
})();
registerModule("plugin.host.theme", function () {
    return new ThemeImpl();
});
var CodeMarkersImpl = (function () {
    function CodeMarkersImpl() {
        this.codeMarkerObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.VS.Internal.CodeMarkers", {
        }, true);
    }
    CodeMarkersImpl.prototype.fireCodeMarker = function (marker) {
        (window.external).fireCodeMarker(marker);
        this.codeMarkerObject._post("fireVSCodeMarker", marker);
    };
    return CodeMarkersImpl;
})();
registerModule("plugin.host.codemarkers", function () {
    return new CodeMarkersImpl();
});
var CommandsImpl = (function () {
    function CommandsImpl() {
        this.commandsObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.VS.Commands");
    }
    CommandsImpl.prototype.showContextMenu = function (menuName, xPosition, yPosition) {
        return this.commandsObject._call("showContextMenu", menuName, xPosition, yPosition);
    };
    CommandsImpl.prototype.setCommandsStates = function (states) {
        return this.commandsObject._call("setCommandsStates", states);
    };
    CommandsImpl.prototype.addEventListener = function (eventType, listener) {
        this.commandsObject.addEventListener(eventType, listener);
    };
    return CommandsImpl;
})();
registerModule("plugin.host.commands", function () {
    return new CommandsImpl();
});
var CultureImpl = (function () {
    function CultureImpl() {
        this.cultureObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.Culture");
    }
    CultureImpl.prototype.addEventListener = function (eventType, listener) {
        this.cultureObject.addEventListener(eventType, listener);
    };
    return CultureImpl;
})();
registerModule("plugin.host.culture", function () {
    return new CultureImpl();
});
var TooltipImpl = (function () {
    function TooltipImpl() {
        this.tooltipObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.Tooltip");
    }
    TooltipImpl.prototype.canCreatePopup = function () {
        return true;
    };
    TooltipImpl.prototype.getScreenSizeForXY = function (screenX, screenY) {
        var JSONBounds = (window.external).getScreenBounds(screenX, screenY);
        if(typeof JSONBounds != 'undefined') {
            return JSON.parse(JSONBounds);
        } else {
            return null;
        }
    };
    TooltipImpl.prototype.hostContentInPopup = function (popupDisplayParameters) {
        this.tooltipObject._post("hostContentInPopup", popupDisplayParameters);
    };
    TooltipImpl.prototype.dismissPopup = function () {
        this.tooltipObject._post("dismissPopup");
    };
    TooltipImpl.prototype.getDblClickTime = function () {
        return (window.external).getDblClickTime();
    };
    return TooltipImpl;
})();
registerModule("plugin.host.tooltip", function () {
    return new TooltipImpl();
});
var SettingsImpl = (function () {
    function SettingsImpl() {
        this.settingsObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.Settings");
    }
    SettingsImpl.prototype.get = function (collection, requestedProperties) {
        return this.settingsObject._call("get", collection, requestedProperties);
    };
    SettingsImpl.prototype.set = function (collection, toSet) {
        this.settingsObject._post("set", collection, toSet);
    };
    return SettingsImpl;
})();
registerModule("plugin.host.settings", function () {
    return new SettingsImpl();
});
var ActivityLogImpl = (function () {
    function ActivityLogImpl() {
        this.proxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.VS.ActivityLog", {
        }, true);
    }
    ActivityLogImpl.prototype.logEntry = function (entryType, message) {
        this.proxy._post("logEntry", entryType, message);
    };
    return ActivityLogImpl;
})();
registerModule("plugin.host.activitylog", function () {
    return new ActivityLogImpl();
});
var ContextMenuImpl = (function () {
    function ContextMenuImpl() {
        this.contextMenuObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.ContextMenu");
    }
    ContextMenuImpl.prototype.addEventListener = function (name, callback) {
        this.contextMenuObject.addEventListener(name, callback);
    };
    ContextMenuImpl.prototype.adjustShowCoordinates = function (coordinates) {
        var selection = document.selection;
        if(selection && coordinates.X === 0 && coordinates.Y === 0) {
            if(selection) {
                var xScaleFactor = screen.deviceXDPI / screen.logicalXDPI;
                var yScaleFactor = screen.deviceYDPI / screen.logicalYDPI;
                var range = selection.createRange();
                var height = range.boundingHeight;
                range.collapse(true);
                coordinates.X = range.boundingLeft / xScaleFactor;
                coordinates.Y = (range.boundingTop + height) / yScaleFactor;
            }
        }
        return coordinates;
    };
    ContextMenuImpl.prototype.callback = function (id) {
        return this.contextMenuObject._call("callback", id);
    };
    ContextMenuImpl.prototype.canCreatePopup = function () {
        return true;
    };
    ContextMenuImpl.prototype.disableZoom = function () {
        Plugin.VS.Keyboard.setZoomState(false);
    };
    ContextMenuImpl.prototype.dismiss = function () {
        return this.contextMenuObject._call("dismissAll");
    };
    ContextMenuImpl.prototype.dismissCurrent = function (ignoreDismissForRoot) {
        return this.contextMenuObject._call("dismissCurrent", ignoreDismissForRoot);
    };
    ContextMenuImpl.prototype.dismissSubmenus = function (currentCoordinates) {
        return this.contextMenuObject._call("dismissSubmenus", currentCoordinates);
    };
    ContextMenuImpl.prototype.fireContentReady = function () {
        return this.contextMenuObject._call("contentready");
    };
    ContextMenuImpl.prototype.show = function (menuId, ariaLabel, contextMenus, positionInfo) {
        return this.contextMenuObject._call("show", menuId, ariaLabel, contextMenus.innerHTML, positionInfo);
    };
    return ContextMenuImpl;
})();
registerModule("plugin.host.contextmenu", function () {
    return new ContextMenuImpl();
});
var SQMAnalyticsImpl = (function () {
    function SQMAnalyticsImpl() {
        this.sqmObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.SQMAnalytics");
    }
    SQMAnalyticsImpl.prototype.addDataToStream = function (streamId, data) {
        this.sqmObject._post("addDataToStream", streamId, data);
    };
    SQMAnalyticsImpl.prototype.logBooleanData = function (dataPointId, data) {
        this.sqmObject._post("logBooleanData", dataPointId, data);
    };
    SQMAnalyticsImpl.prototype.logNumericData = function (dataPointId, data) {
        this.sqmObject._post("logNumericData", dataPointId, data);
    };
    SQMAnalyticsImpl.prototype.logStringData = function (dataPointId, data) {
        this.sqmObject._post("logStringData", dataPointId, data);
    };
    return SQMAnalyticsImpl;
})();
registerModule("plugin.host.sqmanalytics", function () {
    return new SQMAnalyticsImpl();
});
var HostImpl = (function () {
    function HostImpl(external) {
        this.external = external;
        this.hostObject = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Plugin.Host", {
        }, true);
    }
    HostImpl.prototype.showDocument = function (documentPath, line, col) {
        return this.hostObject._call("showDocument", documentPath, line, col);
    };
    HostImpl.prototype.getDocumentLocation = function (documentPath) {
        return this.hostObject._call("getDocumentLocation", documentPath);
    };
    HostImpl.prototype.supportsAllowSetForeground = function () {
        return true;
    };
    HostImpl.prototype.allowSetForeground = function (processId) {
        if(this.external) {
            return this.external.allowSetForeground(processId);
        }
        return false;
    };
    return HostImpl;
})();
registerModule("plugin.host", function () {
    return new HostImpl(window.external);
});
var Plugin;
(function (Plugin) {
    "use strict";
        var host = loadModule("plugin.host.core");
    var controlCommands;
    (function (controlCommands) {
        controlCommands._map = [];
        controlCommands.none = 0;
        controlCommands.portCreated = 1;
        controlCommands.portClosed = 2;
        controlCommands.portConnected = 3;
        controlCommands.controlInitialized = 4;
        controlCommands.hostReady = 5;
        controlCommands.event = 6;
        controlCommands.error = 7;
        controlCommands.initiateShutdown = 8;
        controlCommands.shutdownComplete = 9;
    })(controlCommands || (controlCommands = {}));
    ;
    (function (Utilities) {
        var EventImpl = (function () {
            function EventImpl(type, additionalProperties, target) {
                this.type = type;
                this.timeStamp = Date.now();
                this.target = target;
                var eventObject = this;
                if(additionalProperties && typeof additionalProperties === "object") {
                    Object.getOwnPropertyNames(additionalProperties).forEach(function (name) {
                        var pd = Object.getOwnPropertyDescriptor(additionalProperties, name);
                        Object.defineProperty(eventObject, name, pd);
                    });
                }
            }
            Object.defineProperty(EventImpl.prototype, "bubbles", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventImpl.prototype, "cancelable", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventImpl.prototype, "currentTarget", {
                get: function () {
                    return this.target;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventImpl.prototype, "defaultPrevented", {
                get: function () {
                    return !!this._preventDefaultsCalled;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventImpl.prototype, "trusted", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventImpl.prototype, "isTrusted", {
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventImpl.prototype, "CAPTURING_PHASE", {
                get: function () {
                    return EventImpl.CAPTURING_PHASE;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventImpl.prototype, "AT_TARGET", {
                get: function () {
                    return EventImpl.AT_TARGET;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventImpl.prototype, "BUBBLING_PHASE", {
                get: function () {
                    return EventImpl.BUBBLING_PHASE;
                },
                enumerable: true,
                configurable: true
            });
            EventImpl.prototype.preventDefault = function () {
                this._preventDefaultsCalled = true;
            };
            EventImpl.prototype.stopImmediatePropagation = function () {
                this._stopImmediatePropagationCalled = true;
            };
            EventImpl.prototype.stopPropagation = function () {
            };
            EventImpl.prototype.initEvent = function (eventTypeArg, canBubbleArg, cancelableArg) {
            };
            EventImpl.supportForProcessing = false;
            EventImpl.NONE = 0;
            EventImpl.CAPTURING_PHASE = 1;
            EventImpl.AT_TARGET = 2;
            EventImpl.BUBBLING_PHASE = 3;
            return EventImpl;
        })();        
        EventImpl.prototype.eventPhase = 0;
        EventImpl.prototype.detail = null;
        var EventManager = (function () {
            function EventManager() { }
            EventManager.prototype.addEventListener = function (type, listener) {
                this.listeners = this.listeners || {
                };
                var eventListeners = (this.listeners[type] = this.listeners[type] || []);
                for(var i = 0, len = eventListeners.length; i < len; i++) {
                    var l = eventListeners[i];
                    if(l.listener === listener) {
                        return;
                    }
                }
                eventListeners.push({
                    listener: listener
                });
            };
            EventManager.prototype.dispatchEvent = function (type, eventArg) {
                var listeners = this.listeners && this.listeners[type];
                var oneventAttribute = this.target && this.target["on" + type];
                if(listeners || typeof oneventAttribute === "function") {
                    var eventValue = new EventImpl(type, eventArg, this.target);
                    if(listeners) {
                        listeners = listeners.slice(0, listeners.length);
                        for(var i = 0, len = listeners.length; i < len && !eventValue._stopImmediatePropagationCalled; i++) {
                            listeners[i].listener(eventValue);
                        }
                    }
                    if(typeof oneventAttribute === "function") {
                        oneventAttribute(eventValue);
                    }
                    return eventValue.defaultPrevented || false;
                }
                return false;
            };
            EventManager.prototype.removeEventListener = function (type, listener) {
                var listeners = this.listeners && this.listeners[type];
                if(listeners) {
                    for(var i = 0, len = listeners.length; i < len; i++) {
                        var l = listeners[i];
                        if(l.listener === listener) {
                            listeners.splice(i, 1);
                            if(listeners.length === 0) {
                                delete this.listeners[type];
                            }
                            break;
                        }
                    }
                }
            };
            EventManager.prototype.setTarget = function (value) {
                this.target = value;
            };
            return EventManager;
        })();
        Utilities.EventManager = EventManager;        
        function marshalHostError(hostErrorObject) {
            var error = new Error(hostErrorObject.message + "\r\n" + hostErrorObject.stack);
            error.innerError = hostErrorObject.innerError;
            error.source = hostErrorObject.source;
            error.helpLink = hostErrorObject.helpLink;
            return error;
        }
        Utilities.marshalHostError = marshalHostError;
        function formatString(message, optionalParams) {
            var currentParameterIndex = 0;
            var currentSubstringIndex = 0;
            var result = "";
            message = "" + message;
            while(currentSubstringIndex < message.length) {
                var replacementIndex = message.indexOf("%", currentSubstringIndex);
                if(replacementIndex === -1 || replacementIndex === message.length - 1) {
                    result += message.substring(currentSubstringIndex);
                    currentSubstringIndex = message.length;
                } else {
                    result += message.substring(currentSubstringIndex, replacementIndex);
                    currentSubstringIndex = replacementIndex + 1;
                    var argumentValue = optionalParams[currentParameterIndex];
                    switch(message[currentSubstringIndex]) {
                        case "d":
                        case "i":
                            if(typeof argumentValue !== "undefined") {
                                if(typeof argumentValue === "number") {
                                    argumentValue = argumentValue >= 0 ? Math.floor(argumentValue) : Math.ceil(argumentValue);
                                } else {
                                    argumentValue = parseInt(argumentValue);
                                }
                                if(argumentValue !== ~~argumentValue) {
                                    argumentValue = 0;
                                }
                            }
                            result += argumentValue;
                            currentParameterIndex++;
                            currentSubstringIndex++;
                            break;
                        case "f":
                            if(argumentValue === null) {
                                argumentValue = 0;
                            } else if(typeof argumentValue !== "undefined") {
                                argumentValue = parseFloat(argumentValue);
                            }
                            result += argumentValue;
                            currentParameterIndex++;
                            currentSubstringIndex++;
                            break;
                        case "s":
                        case "o":
                            if(typeof argumentValue !== "undefined") {
                                argumentValue = "" + argumentValue;
                            }
                            result += argumentValue;
                            currentParameterIndex++;
                            currentSubstringIndex++;
                            break;
                        case "%":
                            result += "%";
                            currentSubstringIndex++;
                            break;
                        default:
                            result += "%";
                            break;
                    }
                }
            }
            for(var i = currentParameterIndex; i < optionalParams.length; i++) {
                result += optionalParams[i];
            }
            return result;
        }
        Utilities.formatString = formatString;
    })(Plugin.Utilities || (Plugin.Utilities = {}));
    var Utilities = Plugin.Utilities;
    
    var defaultPort = 0;
    var headerDelimiter = "$";
    var lastMessageId = 0;
    var awaitingResultList = [];
    var globalEventManager = new Utilities.EventManager();
    var logger;
    (function (logger) {
        var messages = [];
        var domInitialized = false;
        function logMessageLocally(message) {
            if(!domInitialized) {
                messages.push(message);
                return;
            } else {
                var messagesDiv = document.getElementById("pluginMessages");
                if(messagesDiv) {
                    messagesDiv.innerHTML += "</br>" + message;
                }
            }
        }
        if(document.body) {
            domInitialized = true;
        } else {
            globalEventManager.addEventListener("load", function () {
                domInitialized = true;
                if(messages) {
                    for(var i = 0; i < messages.length; i++) {
                        logMessageLocally(messages[i]);
                    }
                    messages = null;
                }
                ;
            });
        }
        function log(message) {
            logMessageLocally(message);
        }
        logger.log = log;
        function logError(message) {
            log("Error: " + message);
        }
        logger.logError = logError;
    })(logger || (logger = {}));
    (function (PortState) {
        PortState._map = [];
        PortState._map[0] = "connected";
        PortState.connected = 0;
        PortState._map[1] = "disconnected";
        PortState.disconnected = 1;
        PortState._map[2] = "closed";
        PortState.closed = 2;
    })(Plugin.PortState || (Plugin.PortState = {}));
    var PortState = Plugin.PortState;
    var PortImpl = (function () {
        function PortImpl(name) {
            this.name = name;
            this.eventManager = new Utilities.EventManager();
            this.eventManager.setTarget(this);
            this._state = PortState.disconnected;
        }
        Object.defineProperty(PortImpl.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        PortImpl.prototype.removeEventListener = function (type, listener, useCapture) {
            this.eventManager.removeEventListener(type, listener);
        };
        PortImpl.prototype.addEventListener = function (type, listener, useCapture) {
            this.eventManager.addEventListener(type, listener);
        };
        PortImpl.prototype.dispatchEvent = function (evt) {
            return this.eventManager.dispatchEvent(evt);
        };
        PortImpl.prototype.connect = function () {
            if(this._state !== PortState.disconnected) {
                return false;
            }
            var port = this;
            var cookie = portManager.registerPort(this.name, function onConnect() {
                if(port._state !== PortState.disconnected) {
                    return;
                }
                port._state = PortState.connected;
                var eventArgs = {
                    port: port
                };
                port.eventManager.dispatchEvent("connect", eventArgs);
            }, function onDisconnect() {
                if(port._state !== PortState.connected) {
                    return;
                }
                port._state = PortState.disconnected;
            }, function onMessage(message) {
                if(port._state !== PortState.connected) {
                    return;
                }
                var eventArgs = {
                    data: message
                };
                port.eventManager.dispatchEvent("message", eventArgs);
            });
            this._cookie = cookie;
            return true;
        };
        PortImpl.prototype.postMessage = function (message) {
            if(this._state !== PortState.connected) {
                return;
            }
            portManager.postMessage(this._cookie, message);
        };
        PortImpl.prototype.sendMessage = function (message) {
            if(this._state !== PortState.connected) {
                return;
            }
            return portManager.sendMessage(this._cookie, message);
        };
        PortImpl.prototype.close = function () {
            if(this._state === PortState.closed) {
                return;
            }
            this._state = PortState.closed;
            portManager.unregisterPort(this._cookie);
            var eventArgs = {
            };
            this.eventManager.dispatchEvent("close", eventArgs);
        };
        return PortImpl;
    })();    
    var portManager;
    (function (portManager) {
        var registeredPorts = {
        };
        var portNameLookupList = {
        };
        var portIdLookupList = {
        };
        var lastPortIndex = 1;
        function createPort(name) {
            if(typeof name !== "string" || name.length <= 0) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1001"));
            }
            if(portNameLookupList[name]) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1002") + "\r\n" + name);
            }
            return new PortImpl(name);
        }
        portManager.createPort = createPort;
        function registerPort(name, onConnect, onDisconnect, onMessage) {
            if(typeof name !== "string" || name.length <= 0) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1001"));
            }
            if(portNameLookupList[name]) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1002") + "\r\n" + name);
            }
            if(typeof onConnect !== "function") {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1003"));
            }
            if(typeof onDisconnect !== "function") {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1004"));
            }
            if(typeof onMessage !== "function") {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1005"));
            }
            var cookie = ++lastPortIndex;
            registeredPorts[cookie] = portNameLookupList[name] = {
                id: null,
                name: name,
                onConnect: onConnect,
                onDisconnect: onDisconnect,
                onMessage: onMessage
            };
            postMessageInternal(defaultPort, controlCommands.portCreated, [
                name
            ]);
            return cookie;
        }
        portManager.registerPort = registerPort;
        function unregisterPort(cookie) {
            var entry = registeredPorts[cookie];
            if(entry) {
                delete registeredPorts[cookie];
                if(entry.name) {
                    delete portNameLookupList[entry.name];
                }
                if(entry.id) {
                    delete portIdLookupList[entry.id];
                }
                postMessageInternal(defaultPort, controlCommands.portClosed, [
                    entry.name
                ]);
            }
        }
        portManager.unregisterPort = unregisterPort;
        function postMessage(cookie, message) {
            if(!registeredPorts[cookie] || registeredPorts[cookie].id === null) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1006"));
            }
            postMessageInternal(registeredPorts[cookie].id, controlCommands.none, null, message);
        }
        portManager.postMessage = postMessage;
        function sendMessage(cookie, message) {
            if(!registeredPorts[cookie] || registeredPorts[cookie].id === null) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.1006"));
            }
            return sendMessageInternal(registeredPorts[cookie].id, controlCommands.none, null, message);
        }
        portManager.sendMessage = sendMessage;
        function processPortConnectedMessage(id, name) {
            var entry = portNameLookupList[name];
            if(entry) {
                entry.id = id;
                portIdLookupList[id] = entry;
                entry.onConnect();
            } else {
                logger.logError("JSPlugin.1010\r\n" + name);
            }
        }
        portManager.processPortConnectedMessage = processPortConnectedMessage;
        function processPortClosedMessage(id) {
            var entry = portIdLookupList[id];
            if(entry) {
                entry.onDisconnect();
            } else {
                logger.logError("JSPlugin.1011\r\n" + id);
            }
        }
        portManager.processPortClosedMessage = processPortClosedMessage;
        function processMessage(id, message) {
            var entry = portIdLookupList[id];
            if(entry) {
                entry.onMessage(message);
            } else {
                logger.logError("JSPlugin.1012\r\n" + id);
            }
        }
        portManager.processMessage = processMessage;
    })(portManager || (portManager = {}));
    function postMessageInternal(portId, command, args, payload, expectResult) {
        if(lastMessageId >= Infinity) {
            lastMessageId = 0;
        }
        var header = {
            msgId: ++lastMessageId,
            portId: portId
        };
        if(command) {
            header.command = command;
        }
        if(args) {
            header.args = args;
        }
        if(expectResult) {
            header.replyRequested = true;
        }
        var message = JSON.stringify(header);
        if(payload) {
            message += headerDelimiter + payload;
        }
        var result;
        if(expectResult) {
            result = new Plugin.Promise(function (complete, error) {
                awaitingResultList[header.msgId] = {
                    onComplete: complete,
                    onError: error
                };
            });
        }
        host.postMessage(message);
        return result;
    }
    function sendMessageInternal(portId, command, args, payload) {
        return postMessageInternal(portId, command, args, payload, true);
    }
    function marshalHostError(hostErrorObject) {
        var error = new Error(hostErrorObject.message + "\r\n" + hostErrorObject.stack);
        error.innerError = hostErrorObject.innerError;
        error.source = hostErrorObject.source;
        error.helpLink = hostErrorObject.helpLink;
        return error;
    }
    var InitializationState;
    (function (InitializationState) {
        var isHostReady = false;
        var isDOMLoaded = false;
        function checkAndFirePluginReady() {
            if(isHostReady && isDOMLoaded) {
                globalEventManager.dispatchEvent("pluginready", {
                });
            }
        }
        window.addEventListener("DOMContentLoaded", function () {
            isDOMLoaded = true;
            checkAndFirePluginReady();
        });
        function setHostReady() {
            globalEventManager.dispatchEvent("hostready", {
            });
            isHostReady = true;
            checkAndFirePluginReady();
        }
        InitializationState.setHostReady = setHostReady;
    })(InitializationState || (InitializationState = {}));
    host.messageReceived = function (message) {
        if(typeof message === "string") {
            var separatorIndex = message.indexOf(headerDelimiter);
            if(separatorIndex === -1) {
                separatorIndex = message.length;
            }
            var headerText = message.substr(0, separatorIndex);
            var header;
            try  {
                header = JSON.parse(headerText);
            } catch (e) {
                logger.logError("JSPlugin.1013");
            }
            var payload = message.substr(separatorIndex + 1);
            var eventArgs;
            var i;
            var port;
            var portList;
            var portListItem;
            if(header.replyId > 0) {
                var entry = awaitingResultList[header.replyId];
                if(entry) {
                    delete awaitingResultList[header.replyId];
                    switch(header.command) {
                        case controlCommands.none:
                            entry.onComplete(payload);
                            break;
                        case controlCommands.error:
                            if(!header.args || !header.args.length) {
                                logger.logError("JSPlugin.1014");
                            }
                            entry.onError(header.args[0]);
                            break;
                        default:
                            logger.logError("JSPlugin.1015");
                            entry.onError(new Error(Plugin.Resources.getErrorString("JSPlugin.1015")));
                            break;
                    }
                } else if(header.command === controlCommands.error) {
                    if(header.args && header.args[0]) {
                        throw marshalHostError(header.args[0]);
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.1007"));
                    }
                }
            } else if(header.portId > defaultPort && header.command === controlCommands.none) {
                portManager.processMessage(header.portId, payload);
            } else {
                switch(header.command) {
                    case controlCommands.hostReady:
                        InitializationState.setHostReady();
                        break;
                    case controlCommands.portClosed:
                        if(!header.args || !header.args.length) {
                            logger.logError("JSPlugin.1016");
                        }
                        var closedPortId = header.args[0];
                        if(typeof closedPortId !== "number") {
                            logger.logError("JSPlugin.1016");
                            return;
                        }
                        portManager.processPortClosedMessage(closedPortId);
                        break;
                    case controlCommands.portConnected:
                        if(!header.args || !header.args.length) {
                            logger.logError("JSPlugin.1017");
                        }
                        var connectedPortId = header.args[0];
                        var connectedPortName = header.args[1];
                        if(typeof connectedPortId !== "number" || typeof connectedPortName !== "string") {
                            logger.logError("JSPlugin.1017");
                            return;
                        }
                        portManager.processPortConnectedMessage(connectedPortId, connectedPortName);
                        break;
                    case controlCommands.event:
                        if(!header.args || !header.args.length) {
                            logger.logError("JSPlugin.1018");
                        }
                        var eventName = header.args[0];
                        eventArgs = header.args[1];
                        if(typeof eventName !== "string") {
                            logger.logError("JSPlugin.1018");
                        }
                        globalEventManager.dispatchEvent(eventName, eventArgs);
                        break;
                    case controlCommands.initiateShutdown:
                        globalEventManager.dispatchEvent("close", eventArgs);
                        postMessageInternal(defaultPort, controlCommands.shutdownComplete);
                        break;
                    default:
                        var error;
                        if(header.args && header.args.length) {
                            error = marshalHostError(header.args[0]);
                        } else {
                            error = new Error(Plugin.Resources.getErrorString("JSPlugin.1007"));
                        }
                        throw error;
                }
            }
        }
    };
    function attachToPublishedObject(name, objectDefinition, messageHandler, closeHandler, createOnFirstUse) {
        if(typeof name !== "string") {
            throw new Error(Plugin.Resources.getErrorString("JSPlugin.1008"));
        }
        if(typeof messageHandler !== "function") {
            throw new Error(Plugin.Resources.getErrorString("JSPlugin.1009"));
        }
        var interfacePortName = name;
        var interfaceObject = objectDefinition || {
        };
        var pendingMessages = [];
        var portConnectInitiated = false;
        interfaceObject._forceConnect = function () {
            if(!portConnectInitiated) {
                port.connect();
                portConnectInitiated = true;
            }
        };
        interfaceObject._postMessage = function (message) {
            pendingMessages.push({
                message: message
            });
            interfaceObject._forceConnect();
        };
        interfaceObject._sendMessage = function (message) {
            var result = new Plugin.Promise(function (complete, error) {
                pendingMessages.push({
                    message: message,
                    onComplete: complete,
                    onError: error
                });
            });
            interfaceObject._forceConnect();
            return result;
        };
        var port = portManager.createPort(interfacePortName);
        port.addEventListener("connect", function onConnect(e) {
            port.removeEventListener("connect", onConnect);
            port.addEventListener("message", function (eventArg) {
                var serializedMessage = eventArg.data;
                messageHandler(serializedMessage);
            });
            if(typeof closeHandler === "function") {
                port.addEventListener("close", closeHandler);
            }
            interfaceObject._postMessage = function (message) {
                return port.postMessage(message);
            };
            interfaceObject._sendMessage = function (message) {
                return port.sendMessage(message);
            };
            pendingMessages.forEach(function (m) {
                if(m.onComplete) {
                    port.sendMessage(m.message).done(function (callbackMessage) {
                        m.onComplete(callbackMessage);
                    }, function (error) {
                        m.onError(error);
                    });
                } else {
                    port.postMessage(m.message);
                }
            });
            pendingMessages = null;
        });
        if(!createOnFirstUse) {
            interfaceObject._forceConnect();
        }
        return interfaceObject;
    }
    Plugin.attachToPublishedObject = attachToPublishedObject;
    function _logError(message) {
        logger.logError(message);
    }
    Plugin._logError = _logError;
    function addEventListener(type, listener) {
        globalEventManager.addEventListener(type, listener);
    }
    Plugin.addEventListener = addEventListener;
    function removeEventListener(type, listener) {
        globalEventManager.removeEventListener(type, listener);
    }
    Plugin.removeEventListener = removeEventListener;
    function createPort(name) {
        return portManager.createPort(name);
    }
    Plugin.createPort = createPort;
    globalEventManager.setTarget(Plugin);
    window.addEventListener("load", function () {
        globalEventManager.dispatchEvent("load", {
        });
    });
    globalEventManager.addEventListener("load", function () {
        var elements = document.getElementsByTagName("*");
        for(var i = 0; i < elements.length; i++) {
            if(elements[i].nodeName === "INPUT" || elements[i].nodeName === "TEXTAREA") {
                (elements[i]).className += " selectElement";
            } else {
                (elements[i]).className += " selectNone";
            }
        }
    });
    document.oncontextmenu = function () {
        return false;
    };
    document.ondragstart = function () {
        return false;
    };
    postMessageInternal(defaultPort, controlCommands.controlInitialized);
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Utilities) {
        (function (JSONMarshaler) {
            "use strict";
            function attachToPublishedObject(name, objectDefinition, createOnFirstUse) {
                var eventManager = new Plugin.Utilities.EventManager();
                var interfaceObject = Plugin.attachToPublishedObject(name, objectDefinition, function onMessage(serializedMessage) {
                    if(typeof serializedMessage === "string") {
                        var message = JSON.parse(serializedMessage);
                        if(typeof message.eventName === "string") {
                            eventManager.dispatchEvent(message.eventName, message.arg);
                        } else {
                            Plugin._logError("JSPlugin.2000");
                        }
                    } else {
                        Plugin._logError("JSPlugin.2001");
                    }
                }, function onClose(error) {
                    Plugin._logError("JSPlugin.2002\r\n" + name);
                }, createOnFirstUse);
                eventManager.setTarget(interfaceObject);
                interfaceObject._post = function (name) {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 1); _i++) {
                        args[_i] = arguments[_i + 1];
                    }
                    var message = {
                        method: name,
                        args: args.length ? args : undefined
                    };
                    this._postMessage(JSON.stringify(message));
                };
                interfaceObject._call = function (name) {
                    var message = {
                        method: name,
                        args: arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined
                    };
                    return this._sendMessage(JSON.stringify(message)).then(function (responseText) {
                        var response = JSON.parse(responseText);
                        return response.result;
                    });
                };
                if(createOnFirstUse) {
                    interfaceObject.addEventListener = function (type, listener) {
                        interfaceObject._forceConnect();
                        eventManager.addEventListener(type, listener);
                        interfaceObject.addEventListener = eventManager.addEventListener.bind(eventManager);
                    };
                } else {
                    interfaceObject.addEventListener = eventManager.addEventListener.bind(eventManager);
                }
                interfaceObject.removeEventListener = eventManager.removeEventListener.bind(eventManager);
                return interfaceObject;
            }
            JSONMarshaler.attachToPublishedObject = attachToPublishedObject;
        })(Utilities.JSONMarshaler || (Utilities.JSONMarshaler = {}));
        var JSONMarshaler = Utilities.JSONMarshaler;
    })(Plugin.Utilities || (Plugin.Utilities = {}));
    var Utilities = Plugin.Utilities;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Diagnostics) {
        "use strict";
                var host = loadModule("plugin.host.diagnostics");
        function onerror(message, uri, lineNumber, columnNumber, error) {
            if(error) {
                message = error;
            }
            reportError(message, uri, lineNumber, [], columnNumber);
            terminate();
            return true;
        }
        Diagnostics.onerror = onerror;
        window.onerror = onerror;
                        function reportError(error, uri, lineNumber, additionalInfo, columnNumber) {
            var message;
            var lineNumberText;
            var columnNumberText;
            if(error instanceof Error) {
                message = error.message ? error.message.toString() : null;
                var originalAdditionalInfo = additionalInfo;
                if(error && error.number && (typeof error.number === "number")) {
                    additionalInfo = "Error number: 0x" + (error.number >>> 0).toString(16) + "\r\n";
                }
                additionalInfo += "Stack: " + (error).stack;
                if(originalAdditionalInfo) {
                    var additionalInfoString = originalAdditionalInfo.toString();
                    if(additionalInfoString && additionalInfoString.length > 0) {
                        additionalInfo += "\r\n\r\nAdditional Info: " + additionalInfoString;
                    }
                }
            } else {
                message = error ? error.toString() : null;
                additionalInfo = additionalInfo ? additionalInfo.toString() : null;
            }
            uri = uri ? uri.toString() : null;
            lineNumberText = lineNumber ? lineNumber.toString() : null;
            columnNumberText = columnNumber ? columnNumber.toString() : null;
            return host.reportError(message, uri, lineNumberText, additionalInfo, columnNumberText);
        }
        Diagnostics.reportError = reportError;
        function terminate() {
            host.terminate();
        }
        Diagnostics.terminate = terminate;
    })(Plugin.Diagnostics || (Plugin.Diagnostics = {}));
    var Diagnostics = Plugin.Diagnostics;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Culture) {
        "use strict";
                var host = loadModule("plugin.host.culture");
        Culture.dir = "";
        Culture.lang = "";
        Culture.formatRegion = "";
        Culture.DateTimeFormat = {
        };
        Culture.NumberFormat = {
        };
        var domInitialized = false;
        var eventManager = new Plugin.Utilities.EventManager();
        eventManager.setTarget({
        });
        host.addEventListener("cultureinitialize", function (eventArgs) {
            if(!setCultureInfoAndAttributes(eventArgs.language, eventArgs.direction, eventArgs.formatRegion, eventArgs.dateTimeFormat, eventArgs.numberFormat)) {
                Plugin.addEventListener("load", function () {
                    return setCultureInfoAndAttributes(eventArgs.language, eventArgs.direction, eventArgs.formatRegion, eventArgs.dateTimeFormat, eventArgs.numberFormat);
                });
            }
        });
        host.addEventListener("culturechanged", function (eventArgs) {
            setCultureInfoAndAttributes(eventArgs.language, eventArgs.direction, eventArgs.formatRegion, eventArgs.dateTimeFormat, eventArgs.numberFormat);
            eventManager.dispatchEvent("culturechanged");
        });
        function setCultureInfoAndAttributes(language, direction, _formatRegion, dateTimeFormat, numberFormat) {
            Culture.lang = language;
            Culture.dir = direction;
            Culture.formatRegion = _formatRegion;
            Culture.DateTimeFormat = dateTimeFormat;
            Culture.NumberFormat = numberFormat;
            if(!domInitialized) {
                var htmlTags = document.getElementsByTagName("html");
                if(htmlTags.length > 0) {
                    domInitialized = true;
                    htmlTags[0].dir = Culture.dir;
                    htmlTags[0].lang = Culture.lang;
                    eventManager.dispatchEvent("cultureinitialize");
                } else {
                    return false;
                }
            }
            return true;
        }
        function addEventListener(type, listener) {
            eventManager.addEventListener(type, listener);
        }
        Culture.addEventListener = addEventListener;
        function removeEventListener(type, listener) {
            eventManager.removeEventListener(type, listener);
        }
        Culture.removeEventListener = removeEventListener;
    })(Plugin.Culture || (Plugin.Culture = {}));
    var Culture = Plugin.Culture;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    "use strict";
        var host = loadModule("plugin.host.output");
    function log(message) {
        var optionalParams = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            optionalParams[_i] = arguments[_i + 1];
        }
        host.log(Plugin.Utilities.formatString(message, optionalParams));
    }
    Plugin.log = log;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Resources) {
        "use strict";
                var host = loadModule("plugin.host.resources");
        var defaultAlias = "Resources";
        var error = "An error has occurred.  Please try the operation again.  You can search for the error online: ";
        var resourceMap = {
        };
        var formatRegEx = /\{{2}|\{(\d+)\}|\}{2}|\{|\}/g;
        function processResourceChangeEvent(eventArgs) {
            if(typeof eventArgs.GenericError !== "string" || eventArgs.GenericError === "") {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.3000"));
            }
            error = eventArgs.GenericError;
            var resources = eventArgs.ResourceMap;
            if(!resources) {
                Plugin._logError("JSPlugin.3001");
                return;
            }
            resourceMap = resources;
            var defaultResource = eventArgs.DefaultAlias;
            if(defaultResource) {
                defaultAlias = defaultResource;
            }
        }
        host.addEventListener("resourcesinitialized", processResourceChangeEvent);
        host.addEventListener("resourceschanged", processResourceChangeEvent);
        function format(resourceId, format, args) {
            return format.replace(formatRegEx, function (match, index) {
                var replacer;
                switch(match) {
                    case "{{":
                        replacer = "{";
                        break;
                    case "}}":
                        replacer = "}";
                        break;
                    case "{":
                    case "}":
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.3002"));
                    default:
                        var argsIndex = parseInt(index);
                        if(args && args.length - 1 >= argsIndex) {
                            replacer = args[argsIndex];
                        } else {
                            throw new Error(Plugin.Resources.getErrorString("JSPlugin.3003") + " (resourceId = " + resourceId + ")");
                        }
                        break;
                }
                if(typeof replacer === "undefined" || replacer === null) {
                    replacer = "";
                }
                if(typeof replacer !== "string") {
                    replacer = replacer.toString();
                }
                return replacer;
            });
        }
        function getString(resourceId) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            if(typeof resourceId !== "string" || resourceId === "") {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.3004"));
            }
            var fileName = defaultAlias;
            var key = "";
            var value = "";
            var idParts = resourceId.split("/");
            switch(idParts.length) {
                case 1:
                    key = idParts[0];
                    break;
                case 3:
                    fileName = idParts[1];
                    key = idParts[2];
                    break;
                default:
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.3004"));
            }
            if(!resourceMap[fileName] || !resourceMap[fileName][key]) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.3005"));
            }
            value = resourceMap[fileName][key];
            if(args.length > 0) {
                value = format(resourceId, value, args);
            }
            return value;
        }
        Resources.getString = getString;
        function getErrorString(errorId) {
            if(typeof errorId !== "string" || errorId === "") {
                throw new Error(error + "JSPlugin.3006");
            }
            return error + errorId;
        }
        Resources.getErrorString = getErrorString;
        function addEventListener(name, callback) {
            host.addEventListener(name, callback);
        }
        Resources.addEventListener = addEventListener;
        function removeEventListener(name, callback) {
            host.removeEventListener(name, callback);
        }
        Resources.removeEventListener = removeEventListener;
    })(Plugin.Resources || (Plugin.Resources = {}));
    var Resources = Plugin.Resources;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Storage) {
        "use strict";
                var host = loadModule("plugin.host.storage");
        var TypeScriptFix;
        (function (FileAccess) {
            FileAccess._map = [];
            FileAccess.read = 1;
            FileAccess.write = 2;
            FileAccess.readWrite = 3;
        })(Storage.FileAccess || (Storage.FileAccess = {}));
        var FileAccess = Storage.FileAccess;
        (function (FileDialogMode) {
            FileDialogMode._map = [];
            FileDialogMode.open = 0;
            FileDialogMode.save = 1;
        })(Storage.FileDialogMode || (Storage.FileDialogMode = {}));
        var FileDialogMode = Storage.FileDialogMode;
        (function (FileMode) {
            FileMode._map = [];
            FileMode.createNew = 1;
            FileMode.create = 2;
            FileMode.open = 3;
            FileMode.openOrCreate = 4;
            FileMode.truncate = 5;
            FileMode.append = 6;
        })(Storage.FileMode || (Storage.FileMode = {}));
        var FileMode = Storage.FileMode;
        (function (FileShare) {
            FileShare._map = [];
            FileShare.none = 0;
            FileShare.read = 1;
            FileShare.write = 2;
            FileShare.readWrite = 3;
            FileShare.delete = 4;
        })(Storage.FileShare || (Storage.FileShare = {}));
        var FileShare = Storage.FileShare;
        (function (FileType) {
            FileType._map = [];
            FileType.binary = 0;
            FileType.text = 1;
        })(Storage.FileType || (Storage.FileType = {}));
        var FileType = Storage.FileType;
        (function (FilePersistence) {
            FilePersistence._map = [];
            FilePersistence.permanent = 0;
            FilePersistence.temporary = 1;
        })(Storage.FilePersistence || (Storage.FilePersistence = {}));
        var FilePersistence = Storage.FilePersistence;
        (function (SeekOrigin) {
            SeekOrigin._map = [];
            SeekOrigin.begin = 0;
            SeekOrigin.current = 1;
            SeekOrigin.end = 2;
        })(Storage.SeekOrigin || (Storage.SeekOrigin = {}));
        var SeekOrigin = Storage.SeekOrigin;
        var HostFile = (function () {
            function HostFile(streamId, options) {
                this.maxBuffer = 32 * 1024;
                this.id = streamId;
                this.options = options;
            }
            Object.defineProperty(HostFile.prototype, "streamId", {
                get: function () {
                    return this.id;
                },
                enumerable: true,
                configurable: true
            });
            HostFile.prototype.close = function () {
                return host.closeFile(this.streamId);
            };
            HostFile.prototype.read = function (count) {
                if(!isNullOrUndefined(count) && !isInteger(count)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.7005"));
                }
                if(isNullOrUndefined(count)) {
                    var concatStart;
                    if(this.options.type === FileType.binary) {
                        concatStart = [];
                    } else {
                        concatStart = "";
                    }
                    return this.readAllHelper(concatStart);
                } else {
                    return host.read(this.streamId, count, this.options.type);
                }
            };
            HostFile.prototype.seek = function (offset, origin) {
                if(!isInteger(offset)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.7000"));
                }
                if(isNullOrUndefined(origin)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.7001"));
                }
                return host.seek(this.streamId, offset, origin);
            };
            HostFile.prototype.write = function (data, offset, count) {
                if(typeof data !== "string" && !(data instanceof Array)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.7002"));
                }
                if(!isNullOrUndefined(offset) && !isInteger(offset)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.7000"));
                }
                offset = offset || 0;
                if(!isNullOrUndefined(count) && !isInteger(count)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.7007"));
                }
                count = count || data.length;
                return host.write(this.streamId, data, offset, count, this.options.type);
            };
            HostFile.prototype.readAllHelper = function (content) {
                var _this = this;
                return host.read(this.streamId, this.maxBuffer, this.options.type).then(function (result) {
                    if(result === null || result.length === 0) {
                        return content;
                    } else {
                        return _this.readAllHelper(content.concat(result));
                    }
                });
            };
            return HostFile;
        })();        
        function getFileList(path, persistence, index, count) {
            if(!isNullOrUndefined(path) && typeof path !== "string") {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.7003"));
            }
            if(!isNullOrUndefined(index) && !isInteger(index)) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.7008"));
            }
            if(!isNullOrUndefined(count) && !isInteger(count)) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.7005"));
            }
            return host.getFileList(path, persistence, index, count);
        }
        Storage.getFileList = getFileList;
        function createFile(path, options) {
            if(!isNullOrUndefined(path) && typeof path !== "string") {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.7006"));
            }
            var fileOptions = getDefaultFileOptions(options);
            fileOptions.mode = FileMode.createNew;
            return host.openFile(path, fileOptions).then(function (streamId) {
                return new HostFile(streamId, fileOptions);
            });
        }
        Storage.createFile = createFile;
        function openFile(path, options) {
            if(typeof path !== "string" || path === "") {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.7003"));
            }
            var fileOptions = getDefaultFileOptions(options);
            return host.openFile(path, fileOptions).then(function (streamId) {
                return new HostFile(streamId, fileOptions);
            });
        }
        Storage.openFile = openFile;
        function openFileDialog(dialogOptions, fileOptions) {
            var openDialogOptions = getDefaultFileDialogOptions(dialogOptions);
            var openFileOptions = getDefaultFileOptions(fileOptions);
            return host.fileDialog(Plugin.Storage.FileDialogMode.open, openDialogOptions, openFileOptions).then(function (streamId) {
                if(streamId !== null && streamId !== "") {
                    return new HostFile(streamId, openFileOptions);
                }
            });
        }
        Storage.openFileDialog = openFileDialog;
        function saveFileDialog(dialogOptions, fileOptions) {
            var saveDialogOptions = getDefaultFileDialogOptions(dialogOptions);
            var saveFileOptions = getDefaultFileOptions(fileOptions);
            saveFileOptions.mode = FileMode.openOrCreate;
            return host.fileDialog(Plugin.Storage.FileDialogMode.save, saveDialogOptions, saveFileOptions).then(function (streamId) {
                if(streamId !== null && streamId !== "") {
                    return new HostFile(streamId, saveFileOptions);
                }
            });
        }
        Storage.saveFileDialog = saveFileDialog;
        function getDefaultFileOptions(options) {
            var fileOptions = {
                access: FileAccess.readWrite,
                encoding: "UTF-8",
                mode: FileMode.open,
                persistence: FilePersistence.temporary,
                share: FileShare.none,
                type: FileType.text
            };
            if(options) {
                fileOptions.access = isNullOrUndefined(options.access) ? fileOptions.access : options.access;
                fileOptions.encoding = options.encoding || fileOptions.encoding;
                fileOptions.mode = isNullOrUndefined(options.mode) ? fileOptions.mode : options.mode;
                fileOptions.persistence = isNullOrUndefined(options.persistence) ? fileOptions.persistence : options.persistence;
                fileOptions.share = isNullOrUndefined(options.share) ? fileOptions.share : options.share;
                fileOptions.type = isNullOrUndefined(options.type) ? fileOptions.type : options.type;
            }
            return fileOptions;
        }
        function getDefaultFileDialogOptions(options) {
            var dialogOptions = {
                name: "",
                extensions: [],
                extensionsIndex: 0,
                initialDirectory: "",
                title: ""
            };
            if(options) {
                dialogOptions.name = options.name || dialogOptions.name;
                dialogOptions.extensions = options.extensions || dialogOptions.extensions;
                dialogOptions.extensionsIndex = options.extensionsIndex || dialogOptions.extensionsIndex;
                dialogOptions.initialDirectory = options.initialDirectory || dialogOptions.initialDirectory;
                dialogOptions.title = options.title || dialogOptions.title;
            }
            return dialogOptions;
        }
        function isInteger(value) {
            return ((parseFloat(value) === parseInt(value)) && !isNaN(value));
        }
        function isNullOrUndefined(value) {
            return (value === null || typeof value === "undefined");
        }
    })(Plugin.Storage || (Plugin.Storage = {}));
    var Storage = Plugin.Storage;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Theme) {
        "use strict";
                var host = loadModule("plugin.host.theme");
        var domInitialized = false;
        var isInitial = false;
        var tokenMap = {
        };
        var pluginCss;
        var tempElement;
        var rgbaRegEx = /[^0-9]+/g;
        var declarationRegEx = /^(\s*)([\w\-]+)\s*:\s*([^;^\{\*]+|url\([^\)]+\));\s*\/\*\s*\[([^\[\]]+)\]\s*\*\/(.*)$/gm;
        var rgbaValueRegex = /\(([^\)]+)\)/;
        var tokenNameRegex = /\s*([\{\}\w\-]*)/;
        var rgbaOrHCOnlyFragmentRegex = /(?:\s+((?:rgba\s*\([^\)]+\))|(?:\!HCOnly)))?/;
        var tokenRegEx = new RegExp("\\{" + tokenNameRegex.source + rgbaOrHCOnlyFragmentRegex.source + rgbaOrHCOnlyFragmentRegex.source + "\\s*\\}", "igm");
        var undefinedRegEx = /undefined|null/;
        var eventManager = new Plugin.Utilities.EventManager();
        eventManager.setTarget(host);
        host.addEventListener("themeinitialize", function (eventArgs) {
            pluginCss = eventArgs.PluginCss;
            if(!pluginCss) {
                Plugin._logError("JSPlugin.4000");
                return;
            }
            updateTheme(eventArgs.themeMap, true, eventArgs.isHighContrastTheme);
            eventManager.dispatchEvent("themeinitialize");
        });
        host.addEventListener("themechanged", function (eventArgs) {
            updateTheme(eventArgs.themeMap, false, eventArgs.isHighContrastTheme);
            eventManager.dispatchEvent("themechanged");
        });
        function updateTheme(themeMap, isFirst, isHighContrast) {
            tokenMap = themeMap;
            if(!tokenMap) {
                Plugin._logError("JSPlugin.4001");
                return;
            }
            isInitial = isFirst;
            processCssFiles(isHighContrast);
            _cssHelpers.processImages(document);
        }
        function getValue(key) {
            if(!tokenMap[key]) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.4002"));
            }
            return tokenMap[key];
        }
        Theme.getValue = getValue;
        function processCssFiles(isHighContrast) {
            if(!pluginCss) {
                return;
            }
            var pluginStyle = document.createElement("style");
            pluginStyle.type = "text/css";
            pluginStyle.innerHTML = tokenReplaceContents(pluginCss, isHighContrast);
            var firstNode = document.head.firstChild;
            if(firstNode) {
                document.head.insertBefore(pluginStyle, firstNode);
                if((firstNode).id === "pluginCss") {
                    document.head.removeChild(firstNode);
                }
            } else {
                document.head.firstChild = pluginStyle;
            }
            pluginStyle.id = "pluginCss";
            var cssThemeFiles = (document.querySelectorAll("[data-plugin-theme='true']"));
            if(isInitial && cssThemeFiles.length === 0) {
                host.fireThemeReady();
                return;
            }
            for(var i = 0; i < cssThemeFiles.length; i++) {
                var styleNode = cssThemeFiles[i];
                var href = (!styleNode.href ? styleNode.getAttribute("data-plugin-theme-href") : styleNode.href);
                var fireThemeReady = (isInitial && (i === cssThemeFiles.length - 1));
                _cssHelpers.processCssFileContents(href, document, styleNode, fireThemeReady, isHighContrast);
            }
        }
        (function (_cssHelpers) {
            function processCssFileContents(href, targetDoc, refNode, fireThemeReady, isHighContrast) {
                return host.getCssFile(href).done(function (contents) {
                    if(contents) {
                        contents = tokenReplaceContents(contents, isHighContrast);
                        var newStyle = targetDoc.createElement("style");
                        newStyle.setAttribute("data-plugin-theme", "true");
                        newStyle.setAttribute("data-plugin-theme-href", href);
                        newStyle.type = "text/css";
                        newStyle.innerHTML = contents;
                        if(refNode) {
                            if(!refNode.parentNode) {
                                return;
                            }
                            targetDoc.head.insertBefore(newStyle, refNode);
                            targetDoc.head.removeChild(refNode);
                            newStyle.id = refNode.id;
                        } else {
                            targetDoc.head.appendChild(newStyle);
                        }
                    }
                    if(fireThemeReady) {
                        host.fireThemeReady();
                    }
                }, function (e) {
                    if(fireThemeReady) {
                        host.fireThemeReady();
                    }
                    Plugin._logError("JSPlugin.4003\r\n" + e.message + "\r\n" + (e).stack);
                });
            }
            _cssHelpers.processCssFileContents = processCssFileContents;
            function processImages(targetDoc) {
                var images = targetDoc.querySelectorAll("[data-plugin-theme-src]");
                for(var i = 0; i < images.length; i++) {
                    images[i].src = getValue(images[i].getAttribute("data-plugin-theme-src"));
                }
            }
            _cssHelpers.processImages = processImages;
        })(Theme._cssHelpers || (Theme._cssHelpers = {}));
        var _cssHelpers = Theme._cssHelpers;
        function getRGBACandidate(candidate1, candidate2) {
            if(candidate1 && (candidate1.match(/rgba/i) !== null)) {
                return candidate1;
            } else if(candidate2 && (candidate2.match(/rgba/i) !== null)) {
                return candidate2;
            }
            return null;
        }
        function tokenReplaceContents(contents, isHighContrast) {
            return contents.replace(declarationRegEx, function (declaration, indent, property, defaultValue, replacer, suffix) {
                var replaceCount = 0;
                var newValue = replacer.replace(tokenRegEx, function (tokenMatch, token, rgbaOrHCOnlyMatch1, rgbaOrHCOnlyMatch2) {
                    var isHCOnly = false;
                    if(rgbaOrHCOnlyMatch1 && (rgbaOrHCOnlyMatch1.toUpperCase() === "!HCONLY")) {
                        isHCOnly = true;
                    } else if(rgbaOrHCOnlyMatch2 && (rgbaOrHCOnlyMatch2.toUpperCase() === "!HCONLY")) {
                        isHCOnly = true;
                    }
                    if(isHCOnly && ((typeof isHighContrast !== "undefined") && !isHighContrast)) {
                        return null;
                    }
                    replaceCount++;
                    var colorValue = tokenMap[token];
                    var rgbaMatch = getRGBACandidate(rgbaOrHCOnlyMatch1, rgbaOrHCOnlyMatch2);
                    if(rgbaMatch) {
                        var rgbaValArr = rgbaMatch.match(rgbaValueRegex);
                        var rgba = "1.0";
                        if(rgbaValArr && rgbaValArr.length >= 1) {
                            rgba = rgbaValArr[0].replace(/\(|\)|\s/g, "");
                        }
                        tempElement = tempElement || document.createElement("div");
                        tempElement.style.backgroundColor = colorValue;
                        var parts = tempElement.style.backgroundColor.split(",");
                        if(parts.length === 3) {
                            var rgbParts = [];
                            for(var i = 0; i < 3; i++) {
                                rgbParts.push(parseInt(parts[i].replace(rgbaRegEx, ''), 10));
                            }
                            tempElement.style.backgroundColor = "rgba(" + rgbParts.join(", ") + ", " + rgba + ")";
                            colorValue = tempElement.style.backgroundColor;
                        }
                    }
                    return colorValue;
                });
                if(replaceCount === 0 || newValue.match(undefinedRegEx)) {
                    newValue = defaultValue;
                }
                return indent + property + ": " + newValue + ";" + suffix;
            });
        }
        function addEventListener(type, listener) {
            return eventManager.addEventListener(type, listener);
        }
        Theme.addEventListener = addEventListener;
        function removeEventListener(type, listener) {
            return eventManager.removeEventListener(type, listener);
        }
        Theme.removeEventListener = removeEventListener;
    })(Plugin.Theme || (Plugin.Theme = {}));
    var Theme = Plugin.Theme;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (VS) {
        (function (Commands) {
            "use strict";
                        var host = loadModule("plugin.host.commands");
            var ContextMenuBinding = (function () {
                function ContextMenuBinding(name) {
                    this.name = name;
                }
                ContextMenuBinding.prototype.show = function (xPosition, yPosition) {
                    return host.showContextMenu(this.name, xPosition, yPosition);
                };
                return ContextMenuBinding;
            })();
            Commands.ContextMenuBinding = ContextMenuBinding;            
            var CommandStateMarshaler = (function () {
                function CommandStateMarshaler(name) {
                    this.name = name;
                    this.enabled = null;
                    this.visible = null;
                }
                return CommandStateMarshaler;
            })();            
            var CommandBinding = (function () {
                function CommandBinding(name, onexecute, enabled, visible) {
                    this._name = name;
                    this._onexecute = onexecute;
                    this._enabled = enabled;
                    this._visible = visible;
                }
                CommandBinding.prototype.setState = function (state) {
                    var needToSetCommandStates = false;
                    var commandStateMarshaler = new CommandStateMarshaler(this._name);
                    if(state.hasOwnProperty("enabled") && state.enabled !== undefined) {
                        this._enabled = state.enabled;
                        commandStateMarshaler.enabled = state.enabled;
                        needToSetCommandStates = true;
                    }
                    if(state.hasOwnProperty("visible") && state.visible !== undefined) {
                        this._visible = state.visible;
                        commandStateMarshaler.visible = state.visible;
                        needToSetCommandStates = true;
                    }
                    if(needToSetCommandStates) {
                        host.setCommandsStates([
                            commandStateMarshaler
                        ]);
                    }
                };
                return CommandBinding;
            })();
            Commands.CommandBinding = CommandBinding;            
            var menuAliases, commandAliases;
            host.addEventListener("commandsinitialized", function (e) {
                menuAliases = e.menuAliases;
                commandAliases = e.commandAliases;
            });
            function bindContextMenu(name) {
                if(!menuAliases || menuAliases.indexOf(name) === -1) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5000"));
                }
                return new ContextMenuBinding(name);
            }
            Commands.bindContextMenu = bindContextMenu;
            var commandBindings = {
            };
            host.addEventListener("commandexec", function (eventArgs) {
                var commandName = eventArgs.CommandName;
                if(commandBindings.hasOwnProperty(commandName)) {
                    commandBindings[commandName]._onexecute();
                }
            });
            function bindCommand(command) {
                var isEnabled;
                var isVisible;
                var needToSetCommandState = false;
                if(!command.hasOwnProperty("name")) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5001"));
                }
                if(!commandAliases || commandAliases.indexOf(command.name) === -1) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5002"));
                }
                if(!command.hasOwnProperty("onexecute") || typeof command.onexecute !== "function") {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5003"));
                }
                if(command.hasOwnProperty("enabled")) {
                    isEnabled = !!command.enabled;
                    needToSetCommandState = true;
                }
                if(command.hasOwnProperty("visible")) {
                    isVisible = !!command.visible;
                    needToSetCommandState = true;
                }
                if(commandBindings.hasOwnProperty(command.name)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5004"));
                }
                var newBinding = new CommandBinding(command.name, command.onexecute, isEnabled, isVisible);
                commandBindings[command.name] = newBinding;
                if(needToSetCommandState) {
                    newBinding.setState({
                        enabled: isEnabled,
                        visible: isVisible
                    });
                }
                return newBinding;
            }
            Commands.bindCommand = bindCommand;
            function setStates() {
                var states = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    states[_i] = arguments[_i + 0];
                }
                var commandStateMarshalers = [];
                for(var i = 0; i < states.length; i++) {
                    var commandInstance = states[i];
                    if(commandInstance.hasOwnProperty("command") && !!commandInstance.command && (commandInstance.command instanceof CommandBinding)) {
                        var commandStateMarshaler = new CommandStateMarshaler(commandInstance.command._name);
                        if(commandInstance.hasOwnProperty("enabled") && commandInstance.enabled !== undefined) {
                            commandStateMarshaler.enabled = commandInstance.enabled;
                        }
                        if(commandInstance.hasOwnProperty("visible") && commandInstance.visible !== undefined) {
                            commandStateMarshaler.visible = commandInstance.visible;
                        }
                        commandStateMarshalers.push(commandStateMarshaler);
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5005"));
                    }
                }
                if(commandStateMarshalers.length > 0) {
                    host.setCommandsStates(commandStateMarshalers);
                    for(i = 0; i < states.length; i++) {
                        commandInstance = states[i];
                        if(commandInstance.hasOwnProperty("enabled") && commandInstance.enabled !== undefined) {
                            commandInstance.command._enabled = commandInstance.enabled;
                        }
                        if(commandInstance.hasOwnProperty("visible") && commandInstance.visible !== undefined) {
                            commandInstance.command._visible = commandInstance.visible;
                        }
                    }
                }
            }
            Commands.setStates = setStates;
        })(VS.Commands || (VS.Commands = {}));
        var Commands = VS.Commands;
    })(Plugin.VS || (Plugin.VS = {}));
    var VS = Plugin.VS;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (VS) {
        (function (Internal) {
            (function (CodeMarkers) {
                "use strict";
                                var host = loadModule("plugin.host.codemarkers");
                function verifyMarker(marker) {
                    if(typeof marker !== 'number' || !isFinite(marker)) {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.6000"));
                    }
                    return marker;
                }
                function fire(marker) {
                    host.fireCodeMarker(verifyMarker(marker));
                }
                CodeMarkers.fire = fire;
            })(Internal.CodeMarkers || (Internal.CodeMarkers = {}));
            var CodeMarkers = Internal.CodeMarkers;
        })(VS.Internal || (VS.Internal = {}));
        var Internal = VS.Internal;
    })(Plugin.VS || (Plugin.VS = {}));
    var VS = Plugin.VS;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Host) {
        "use strict";
        var host = loadModule("plugin.host");
        function showDocument(documentPath, line, col) {
            return host.showDocument("" + documentPath, +line, +col);
        }
        Host.showDocument = showDocument;
        ;
        function getDocumentLocation(documentPath) {
            return host.getDocumentLocation("" + documentPath);
        }
        Host.getDocumentLocation = getDocumentLocation;
        ;
        function supportsAllowSetForeground() {
            return host.supportsAllowSetForeground();
        }
        Host.supportsAllowSetForeground = supportsAllowSetForeground;
        function allowSetForeground(processId) {
            return host.allowSetForeground(processId);
        }
        Host.allowSetForeground = allowSetForeground;
        ;
    })(Plugin.Host || (Plugin.Host = {}));
    var Host = Plugin.Host;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (VS) {
        (function (Keyboard) {
            "use strict";
            var clipboardGroup = 0;
            var zoomGroup = 1;
            var zoomState = true;
            function disableMouseWheelZoom(e) {
                if(e.ctrlKey) {
                    e.preventDefault();
                }
            }
            function setClipboardState(state) {
                (window.external).setHotKeysState(clipboardGroup, !!state);
            }
            Keyboard.setClipboardState = setClipboardState;
            function setZoomState(state) {
                state = !!state;
                if(zoomState !== state) {
                    (window.external).setHotKeysState(zoomGroup, state);
                    if(!state) {
                        window.addEventListener("mousewheel", disableMouseWheelZoom, false);
                    } else {
                        window.removeEventListener("mousewheel", disableMouseWheelZoom);
                    }
                    zoomState = state;
                }
            }
            Keyboard.setZoomState = setZoomState;
        })(VS.Keyboard || (VS.Keyboard = {}));
        var Keyboard = VS.Keyboard;
    })(Plugin.VS || (Plugin.VS = {}));
    var VS = Plugin.VS;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Tooltip) {
        "use strict";
        ;
        ;
        ;
                Tooltip.defaultTooltipContentToHTML = true;
        var host = loadModule("plugin.host.tooltip");
        var tooltipOffsetY = 15;
        var defaultDelay;
        var hasShownTooltipPopup = false;
        var tooltipObject = null;
        var tooltipReset = true;
        var scheduledShow;
        var scheduledDismiss;
        var mousePosition = {
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0
        };
        var popupMeasureContainer;
        function canCreatePopup() {
            return host.canCreatePopup();
        }
        function invalidatePopupTooltipDocumentCache() {
            hasShownTooltipPopup = false;
        }
        Tooltip.invalidatePopupTooltipDocumentCache = invalidatePopupTooltipDocumentCache;
        function hostContentInPopup(displayParameters) {
            var useCachedDocument = (hasShownTooltipPopup && ((typeof displayParameters.useCachedDocument === 'undefined') || (typeof displayParameters.useCachedDocument === 'boolean' && displayParameters.useCachedDocument)));
            if(!useCachedDocument) {
                var dir = Plugin.Culture.dir;
                var lang = Plugin.Culture.lang;
                var docTypeTag = "<!DOCTYPE html>";
                var htmlAttributes = "xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"" + lang + "\" dir=\"" + dir + "\" style=\"overflow: hidden\"";
                var htmlOpenTag = "<html " + htmlAttributes + ">";
                var headOpenTag = "<head>";
                var modeTag = "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\"/>";
                var charSetTag = "<meta charset=\"UTF-16\">";
                var headCloseTag = "</head>";
                var preContentHTML = docTypeTag + htmlOpenTag + headOpenTag + modeTag + charSetTag;
                var styles = document.head.querySelectorAll("style, link[type='text/css']");
                for(var i = 0; i < styles.length; i++) {
                    var styleElement = styles[i];
                    var node = document.createElement(styleElement.nodeName);
                    var attributes = styleElement.attributes;
                    for(var j = 0; j < attributes.length; j++) {
                        if(attributes[j].specified) {
                            node.setAttribute(attributes[j].nodeName, attributes[j].nodeValue);
                        }
                    }
                    node.innerHTML = styleElement.innerHTML;
                    preContentHTML += node.outerHTML;
                }
                var bodyOpenTag = "<body style=\"margin: 0px\">";
                preContentHTML += headCloseTag + bodyOpenTag;
                var bodyCloseTag = "</body>";
                var finalHTML = preContentHTML + displayParameters.content + bodyCloseTag;
                displayParameters.content = finalHTML;
            }
            if(!hasShownTooltipPopup) {
                hasShownTooltipPopup = true;
            }
            host.hostContentInPopup(displayParameters);
        }
        ;
        function dismissPopup() {
            host.dismissPopup();
        }
        ;
        function resetTooltip(tooltip) {
            if(tooltip) {
                var contentDiv = tooltip["contentDiv"];
                contentDiv.innerHTML = "";
                tooltip["parent"] = null;
                tooltipReset = true;
            }
        }
        function dismissTooltip(reset) {
            var parent = null;
            if(scheduledShow) {
                clearTimeout(scheduledShow);
                scheduledShow = null;
            }
            if(scheduledDismiss) {
                clearTimeout(scheduledDismiss);
                scheduledDismiss = null;
            }
            if(tooltipObject) {
                parent = tooltipObject.parent;
                var usingPopup = canCreatePopup();
                if(usingPopup) {
                    dismissPopup();
                } else {
                    if(document.body.contains(tooltipObject)) {
                        document.body.removeChild(tooltipObject);
                    }
                    tooltipObject.style.display = "none";
                }
                if(typeof reset === "undefined" || reset) {
                    resetTooltip(tooltipObject);
                }
            }
            __n("TooltipDismiss", tooltipObject, parent, (typeof reset === "undefined" || reset));
        }
        function dismissTooltipOfParent(element, reset) {
            if(tooltipObject && tooltipObject.parent === element) {
                dismissTooltip(reset);
            }
        }
        function createOuterTooltipDiv() {
            var tooltip = document.createElement("div");
            tooltip.setAttribute("id", "plugin-vs-tooltip");
            return tooltip;
        }
        function createNestedCellDiv() {
            var nestedCellDiv = document.createElement("div");
            nestedCellDiv.setAttribute("id", "plugin-vs-tooltip-nested-cell");
            return nestedCellDiv;
        }
        function createContentDiv() {
            var contentDiv = document.createElement("div");
            contentDiv.setAttribute("id", "plugin-vs-tooltip-content");
            return contentDiv;
        }
        function createPopupMeasureContainer() {
            var measureContainer = document.createElement("div");
            measureContainer["style"]["position"] = "absolute";
            measureContainer["style"]["display"] = "none";
            document.body.appendChild(measureContainer);
            return measureContainer;
        }
        function createTooltip() {
            var outerMostDiv = createOuterTooltipDiv();
            var nestedCellDiv = createNestedCellDiv();
            outerMostDiv.appendChild(nestedCellDiv);
            var contentDiv = createContentDiv();
            nestedCellDiv.appendChild(contentDiv);
            outerMostDiv["contentDiv"] = contentDiv;
            return outerMostDiv;
        }
        function createBlankTooltip() {
            if(!tooltipReset) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.4004"));
            }
            var tooltip = tooltipObject;
            if(tooltip === null) {
                tooltip = tooltipObject = createTooltip();
                tooltip.contentDiv.addEventListener("mouseover", function () {
                    tooltip.style.display = "none";
                    __n("TooltipDismiss", tooltip, tooltip.parent, false);
                });
            }
            return tooltip;
        }
        var htmlEncodingDiv = null;
        function htmlEncode(content) {
            if(!htmlEncodingDiv) {
                htmlEncodingDiv = document.createElement("div");
            }
            htmlEncodingDiv.innerText = content;
            return htmlEncodingDiv.innerHTML;
        }
        function createNewTooltipFromContent(config) {
            var tooltip = createBlankTooltip();
            var pContent = tooltip["contentDiv"];
            if(pContent) {
                var hasValidContainsHTMLProperty = typeof config.contentContainsHTML === 'boolean';
                var containsHTML = hasValidContainsHTMLProperty ? config.contentContainsHTML : Plugin.Tooltip.defaultTooltipContentToHTML;
                if(typeof config.content === "string") {
                    pContent.innerHTML = containsHTML ? config.content : htmlEncode(config.content);
                    Plugin.Theme._cssHelpers.processImages(pContent);
                } else if(config.content) {
                    pContent.innerText = config.content;
                }
            }
            return tooltip;
        }
        function createNewTooltipFromString(contentString) {
            var tooltip = createBlankTooltip();
            if(tooltip && contentString) {
                var pContent = tooltip["contentDiv"];
                if(pContent) {
                    pContent.innerText = contentString;
                }
            }
            return tooltip;
        }
        function adjustXPosForClientRight(x, width) {
            var distToClientRight = document.documentElement.clientWidth - (x + width);
            if(distToClientRight < 0) {
                x = document.documentElement.clientWidth - (width + 1);
            }
            return x;
        }
        function adjustYPosForClientBottom(y, height, yOffset) {
            var distToClientBottom = document.documentElement.clientHeight - (y + height);
            if(distToClientBottom < 0) {
                y -= (height + 2 * yOffset + 1);
                if(y < 0) {
                    y = 0;
                }
            }
            return y;
        }
        function styleBoxSizingIsBorderBox(style) {
            var boxSizingMode = style["box-sizing"];
            return ((typeof boxSizingMode === "string") && (boxSizingMode.toLowerCase() === "border-box"));
        }
        function convertOffsetHeightToHeight(offsetHeight, style) {
            if(styleBoxSizingIsBorderBox(style)) {
                return offsetHeight;
            }
            var topBorderWidth = parseInt(style["border-top-width"], 10);
            var bottomBorderWidth = parseInt(style["border-bottom-width"], 10);
            var topPadding = parseInt(style["padding-top"], 10);
            var bottomPadding = parseInt(style["padding-bottom"], 10);
            return (offsetHeight - (topBorderWidth + bottomBorderWidth + topPadding + bottomPadding));
        }
        function convertOffsetWidthToWidth(offsetWidth, style) {
            if(styleBoxSizingIsBorderBox(style)) {
                return offsetWidth;
            }
            var leftBorderWidth = parseInt(style["border-right-width"], 10);
            var rightBorderWidth = parseInt(style["border-left-width"], 10);
            var leftPadding = parseInt(style["padding-left"], 10);
            var rightPadding = parseInt(style["padding-right"], 10);
            return (offsetWidth - (leftBorderWidth + rightBorderWidth + leftPadding + rightPadding));
        }
        function setLeftTopWidthHeight(element, settings) {
            if(settings.width) {
                element.style.width = settings.width;
            }
            if(settings.height) {
                element.style.height = settings.height;
            }
            if(settings.left) {
                element.style.left = settings.left;
            }
            if(settings.top) {
                element.style.top = settings.top;
            }
        }
        function propertyIsFiniteNumber(obj, propName) {
            return (typeof obj[propName] === 'number' && isFinite(obj[propName]));
        }
        function areValidScreenBounds(bounds) {
            return bounds != null && propertyIsFiniteNumber(bounds, "Width") && propertyIsFiniteNumber(bounds, "Height");
        }
        function showTooltipImmediate(args) {
            if(args.tooltip) {
                var useMousePosX = (typeof args.position === 'undefined') || (typeof args.position.clientX !== 'number');
                var clientX = useMousePosX ? mousePosition.clientX : args.position.clientX;
                var offsetFactor = 0;
                var useMousePosY = (typeof args.position === 'undefined') || (typeof args.position.clientY !== 'number');
                var clientY = useMousePosY ? mousePosition.clientY : args.position.clientY;
                if(useMousePosY) {
                    offsetFactor = 1;
                }
                args.duration = (typeof args.duration === "number") ? args.duration : ((defaultDelay || (defaultDelay = host.getDblClickTime())) * 10);
                var layoutScreenX = -500;
                var layoutScreenY = -500;
                var usingPopup = canCreatePopup();
                if(usingPopup) {
                    if(!popupMeasureContainer) {
                        popupMeasureContainer = createPopupMeasureContainer();
                    }
                    var currentScreenBounds = host.getScreenSizeForXY(window.screenX + clientX, window.screenY + clientY);
                    if(areValidScreenBounds(currentScreenBounds)) {
                        layoutScreenX = -currentScreenBounds.Width;
                        layoutScreenY = -currentScreenBounds.Height;
                        popupMeasureContainer.style.display = "inline";
                        popupMeasureContainer.style.top = layoutScreenY + "px";
                        popupMeasureContainer.style.left = layoutScreenX + "px";
                        popupMeasureContainer.style["min-width"] = currentScreenBounds.Width + "px";
                        popupMeasureContainer.style["min-height"] = currentScreenBounds.Height + "px";
                    }
                }
                setLeftTopWidthHeight(args.tooltip, {
                    left: layoutScreenX + "px",
                    top: layoutScreenY + "px",
                    width: "auto",
                    height: "auto"
                });
                if(usingPopup) {
                    popupMeasureContainer.appendChild(args.tooltip);
                } else {
                    document.body.appendChild(args.tooltip);
                }
                args.tooltip.style.display = "table";
                var width = args.tooltip.offsetWidth;
                var height = args.tooltip.offsetHeight;
                if(usingPopup) {
                    popupMeasureContainer.style.display = "none";
                }
                var yOffset = (offsetFactor * tooltipOffsetY);
                if(!usingPopup) {
                    clientY += yOffset;
                }
                var style = window.getComputedStyle(args.tooltip);
                if(usingPopup) {
                    setLeftTopWidthHeight(args.tooltip, {
                        left: "0px",
                        top: "0px",
                        width: (convertOffsetWidthToWidth(width, style) + 1) + "px",
                        height: (convertOffsetHeightToHeight(height, style) + 1) + "px"
                    });
                    width += 1;
                    height += 1;
                    var popupArgs = {
                        content: args.tooltip.outerHTML,
                        clientCoordinates: {
                            X: clientX,
                            Y: clientY
                        },
                        contentSize: {
                            Width: width,
                            Height: height
                        },
                        ensureNotUnderMouseCursor: true,
                        placementTargetIsMouseRect: useMousePosY,
                        useCachedDocument: args.useCachedDocument
                    };
                    hostContentInPopup(popupArgs);
                    args.tooltip.style.display = "none";
                    popupMeasureContainer.removeChild(args.tooltip);
                } else {
                    clientX = adjustXPosForClientRight(clientX, width);
                    clientY = adjustYPosForClientBottom(clientY, height, yOffset);
                    clientX += window.pageXOffset;
                    clientY += window.pageYOffset;
                    setLeftTopWidthHeight(args.tooltip, {
                        left: clientX + "px",
                        top: clientY + "px",
                        width: (convertOffsetWidthToWidth(width, style) + 1) + "px",
                        height: (convertOffsetHeightToHeight(height, style) + 1) + "px"
                    });
                }
            }
            scheduledShow = null;
            if(args.duration > 0) {
                scheduledDismiss = setTimeout(function () {
                    dismissTooltip(false);
                    scheduledDismiss = null;
                }, args.duration);
            }
            if(!usingPopup) {
                __n("TooltipShow", args.tooltip, clientX, clientY, width, height, args.duration, scheduledDismiss);
            }
        }
        function scheduleShowTooltip(tooltip, delay, duration, position, useCachedDocument) {
            if(!tooltip) {
                return null;
            }
            delay = (typeof delay === "number") ? delay : (defaultDelay || (defaultDelay = host.getDblClickTime()));
            useCachedDocument = (typeof useCachedDocument !== 'undefined' ? useCachedDocument : hasShownTooltipPopup);
            if(delay <= 0) {
                showTooltipImmediate({
                    tooltip: tooltip,
                    duration: duration,
                    position: position,
                    useCachedDocument: useCachedDocument
                });
                return null;
            }
            var timeout = setTimeout(function () {
                showTooltipImmediate({
                    tooltip: tooltip,
                    duration: duration,
                    position: position,
                    useCachedDocument: useCachedDocument
                });
            }, delay);
            __n("TooltipShowScheduled", tooltip, delay);
            return timeout;
        }
        function showTooltip(config, parent) {
            dismissTooltip();
            var useCachedDocument = hasShownTooltipPopup;
            var tooltip = null;
            var options = {
            };
            if(config && typeof config === "object") {
                var tooltipContent;
                if(useCachedDocument && (typeof config.useCachedDocument === 'boolean')) {
                    useCachedDocument = config.useCachedDocument;
                }
                if(config.resource) {
                    if(config.content || config.content === "") {
                        try  {
                            tooltip = createNewTooltipFromString(Plugin.Resources.getString(config.resource));
                        } catch (e) {
                        }
                    } else {
                        tooltip = createNewTooltipFromString(Plugin.Resources.getString(config.resource));
                    }
                }
                if(!tooltip && (config.content || config.content === "")) {
                    tooltip = createNewTooltipFromContent(config);
                }
                if(!tooltip) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.4005"));
                }
                options = config;
            } else {
                tooltip = createNewTooltipFromString(config);
            }
            if(!tooltip) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.4006"));
            }
            tooltip.parent = parent;
            tooltipObject = tooltip;
            tooltipReset = false;
            scheduledShow = scheduleShowTooltip(tooltip, options.delay, options.duration, {
                clientX: options.x,
                clientY: options.y
            }, useCachedDocument);
        }
        function initializeElementTooltip(element) {
            if(!element || !element.addEventListener) {
                Plugin._logError("JSPlugin.4007");
                return;
            }
            function hasChild(element, childCandidate) {
                var currentParent = childCandidate ? childCandidate.parentNode : null;
                while(currentParent && currentParent !== document.body) {
                    if(currentParent === element) {
                        return true;
                    }
                    currentParent = currentParent.parentNode;
                }
                return false;
            }
            function onMouseOver(e) {
                var currentTarget = e.currentTarget;
                if(!currentTarget.hasAttribute("data-plugin-vs-tooltip")) {
                    currentTarget.removeEventListener("mouseover", onMouseOver);
                    currentTarget.removeEventListener("mouseout", onMouseOut);
                    currentTarget.removeEventListener("mousedown", onMouseDown);
                    currentTarget.__plugin_tooltip_initialized = false;
                    return;
                }
                if(tooltipObject && !tooltipReset && tooltipObject.parent && ((tooltipObject.parent === e.currentTarget) || (tooltipObject.parent === e.target) || (hasChild(tooltipObject.parent, e.target) && hasChild(e.currentTarget, tooltipObject.parent)))) {
                    return;
                }
                var tooltipConfigStr = currentTarget.getAttribute("data-plugin-vs-tooltip");
                var config;
                if((typeof tooltipConfigStr === "string") && (tooltipConfigStr.length > 0) && (tooltipConfigStr[0] === "{")) {
                    config = JSON.parse(tooltipConfigStr);
                } else {
                    config = tooltipConfigStr;
                }
                showTooltip(config, e.currentTarget);
            }
            ;
            element.addEventListener("mouseover", onMouseOver, true);
            function onMouseOut(e) {
                if(e.relatedTarget && (e.currentTarget !== e.relatedTarget) && !hasChild(e.currentTarget, e.relatedTarget)) {
                    dismissTooltipOfParent(e.currentTarget);
                }
            }
            ;
            element.addEventListener("mouseout", onMouseOut);
            function onMouseDown(e) {
                dismissTooltipOfParent(e.currentTarget, false);
            }
            ;
            element.addEventListener("mousedown", onMouseDown);
            (element).__plugin_tooltip_initialized = true;
        }
        Tooltip.initializeElementTooltip = initializeElementTooltip;
        document.addEventListener("DOMContentLoaded", function () {
            var withTooltipData = document.querySelectorAll("[data-plugin-vs-tooltip]");
            for(var i = 0; i < withTooltipData.length; i++) {
                initializeElementTooltip(withTooltipData[i]);
            }
        }, false);
        document.addEventListener("mouseout", function (e) {
            if(!e.relatedTarget || (e.relatedTarget).nodeName === "HTML") {
                dismissTooltip();
            }
        }, false);
        document.addEventListener("mouseover", function (e) {
            var tooltipConfig;
            if(!(e.target).__plugin_tooltip_initialized && (e.target).hasAttribute("data-plugin-vs-tooltip")) {
                initializeElementTooltip(e.target);
            }
        }, true);
        document.addEventListener("mousemove", function (e) {
            mousePosition.screenX = e.screenX;
            mousePosition.screenY = e.screenY;
            mousePosition.clientX = e.clientX;
            mousePosition.clientY = e.clientY;
        }, false);
        function show(config) {
            showTooltip(config, null);
        }
        Tooltip.show = show;
        function dismiss(reset) {
            dismissTooltip(reset);
        }
        Tooltip.dismiss = dismiss;
    })(Plugin.Tooltip || (Plugin.Tooltip = {}));
    var Tooltip = Plugin.Tooltip;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (Settings) {
        "use strict";
                var host = loadModule("plugin.host.settings");
        function get(collection, requestedProperties) {
            return host.get(collection, requestedProperties);
        }
        Settings.get = get;
        ;
        function set(collection, toSet) {
            return host.set(collection, toSet);
        }
        Settings.set = set;
        ;
    })(Plugin.Settings || (Plugin.Settings = {}));
    var Settings = Plugin.Settings;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (VS) {
        (function (ActivityLog) {
            "use strict";
                        var host = loadModule("plugin.host.activitylog");
            var EntryType;
            (function (EntryType) {
                EntryType._map = [];
                EntryType.ALE_ERROR = 1;
                EntryType.ALE_WARNING = 2;
                EntryType.ALE_INFORMATION = 3;
            })(EntryType || (EntryType = {}));
            function doLog(entryType, message, args) {
                host.logEntry(entryType, Plugin.Utilities.formatString(message, args));
            }
            function info(message) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                doLog(EntryType.ALE_INFORMATION, message, args);
            }
            ActivityLog.info = info;
            function warn(message) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                doLog(EntryType.ALE_WARNING, message, args);
            }
            ActivityLog.warn = warn;
            function error(message) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                doLog(EntryType.ALE_ERROR, message, args);
            }
            ActivityLog.error = error;
        })(VS.ActivityLog || (VS.ActivityLog = {}));
        var ActivityLog = VS.ActivityLog;
    })(Plugin.VS || (Plugin.VS = {}));
    var VS = Plugin.VS;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (ContextMenu) {
        "use strict";
                var host = loadModule("plugin.host.contextmenu");
        var TypeScriptFix;
        var urlRegEx = /url\(['"]?([^'"]*)['"]?\)/gm;
        var iconIsTokenRegEx = /^[^\:\.]*$/;
        (function (MenuItemType) {
            MenuItemType._map = [];
            MenuItemType.checkbox = 0;
            MenuItemType.command = 1;
            MenuItemType.radio = 2;
            MenuItemType.separator = 3;
        })(ContextMenu.MenuItemType || (ContextMenu.MenuItemType = {}));
        var MenuItemType = ContextMenu.MenuItemType;
        var contextMenuStorage = new Object();
        var contextMenuContainer = document.createElement("div");
        contextMenuContainer.id = "plugin-contextmenu-container";
        Plugin.addEventListener("load", function () {
            return document.body.appendChild(contextMenuContainer);
        });
        var currentTargetId;
        var activeElement;
        var shouldShowInline = false;
        function dismissAll() {
            var promise;
            if(!Plugin.ContextMenu.canCreatePopup()) {
                var promises = [];
                for(var key in contextMenuStorage) {
                    if(contextMenuStorage.hasOwnProperty(key)) {
                        promises.push(contextMenuStorage[key].dismiss());
                    }
                }
                promise = Plugin.Promise.join(promises);
            } else {
                promise = host.dismiss();
            }
            shouldShowInline = false;
            return promise;
        }
        ContextMenu.dismissAll = dismissAll;
        function getAbsoluteOffset(target) {
            var aggregateOffsetTop = target.offsetTop;
            var aggregateOffsetLeft = target.offsetLeft;
            while(target = target.offsetParent) {
                aggregateOffsetTop += target.offsetTop;
                aggregateOffsetLeft += target.offsetLeft;
            }
            return {
                left: aggregateOffsetLeft,
                top: aggregateOffsetTop
            };
        }
        function coordinatesAreOutsideOfVisibleClientArea(x, y) {
            return (x < 0 || y < 0 || x > document.documentElement.clientWidth || y > document.documentElement.clientHeight);
        }
        function determineVisibleTargetWidth(target, absoluteCoordinates) {
            var targetRight = absoluteCoordinates.left + target.offsetWidth;
            var visibleWindowAbsolute = {
                left: window.pageXOffset,
                top: window.pageYOffset,
                right: window.pageXOffset + window.document.documentElement.clientWidth,
                bottom: window.pageYOffset + window.document.documentElement.clientHeight
            };
            var isEntirelyOnScreen = ((absoluteCoordinates.left >= visibleWindowAbsolute.left) && (targetRight <= visibleWindowAbsolute.right));
            if(isEntirelyOnScreen) {
                return target.offsetWidth;
            }
            if((targetRight < visibleWindowAbsolute.left) || (absoluteCoordinates.left > visibleWindowAbsolute.right)) {
                return 0;
            }
            if((absoluteCoordinates.left < visibleWindowAbsolute.left) && (targetRight <= visibleWindowAbsolute.right)) {
                return (target.offsetWidth - (visibleWindowAbsolute.left - absoluteCoordinates.left));
            }
            if((targetRight > visibleWindowAbsolute.right) && (absoluteCoordinates.left >= visibleWindowAbsolute.left)) {
                return (target.offsetWidth - (targetRight - visibleWindowAbsolute.right));
            }
            return window.document.documentElement.clientWidth;
        }
        function determineVisibleTargetHeight(target, absoluteCoordinates) {
            var targetBottom = absoluteCoordinates.top + target.offsetHeight;
            var visibleWindowAbsolute = {
                left: window.pageXOffset,
                top: window.pageYOffset,
                right: window.pageXOffset + window.document.documentElement.clientWidth,
                bottom: window.pageYOffset + window.document.documentElement.clientHeight
            };
            var isEntirelyOnScreen = ((absoluteCoordinates.top >= visibleWindowAbsolute.top) && (targetBottom <= visibleWindowAbsolute.bottom));
            if(isEntirelyOnScreen) {
                return target.offsetHeight;
            }
            if((targetBottom < visibleWindowAbsolute.top) || (absoluteCoordinates.top > visibleWindowAbsolute.bottom)) {
                return 0;
            }
            if((absoluteCoordinates.top < visibleWindowAbsolute.top) && (targetBottom <= visibleWindowAbsolute.bottom)) {
                return (target.offsetHeight - (visibleWindowAbsolute.top - absoluteCoordinates.top));
            }
            if((targetBottom > visibleWindowAbsolute.bottom) && (absoluteCoordinates.top >= visibleWindowAbsolute.top)) {
                return (target.offsetHeight - (targetBottom - visibleWindowAbsolute.bottom));
            }
            return window.document.documentElement.clientHeight;
        }
        function handleContextMenuShow(target, clientX, clientY) {
            var id;
            if(!target) {
                return false;
            }
            var originalTarget = target;
            while(target.parentElement) {
                id = target.getAttribute("data-plugin-contextmenu");
                if(id !== null) {
                    var contextMenu = contextMenuStorage[id];
                    var coordinates = {
                        X: clientX,
                        Y: clientY
                    };
                    if(typeof (host.adjustShowCoordinates) === "function") {
                        coordinates = host.adjustShowCoordinates(coordinates);
                    }
                    if(coordinates.X === 0 && coordinates.Y === 0) {
                        var absoluteOffset = getAbsoluteOffset(originalTarget);
                        var onscreenWidth = determineVisibleTargetWidth(originalTarget, absoluteOffset);
                        var onscreenHeight = determineVisibleTargetHeight(originalTarget, absoluteOffset);
                        if(onscreenWidth === 0 || onscreenHeight === 0) {
                            coordinates.X = coordinates.Y = 0;
                        } else {
                            var midPointX = onscreenWidth / 2;
                            var midPointY = onscreenHeight / 2;
                            if(absoluteOffset.left < window.pageXOffset || originalTarget.offsetWidth > window.document.documentElement.clientWidth) {
                                coordinates.X = midPointX;
                            } else {
                                coordinates.X = ((absoluteOffset.left - window.pageXOffset) + midPointX);
                            }
                            if(absoluteOffset.top < window.pageYOffset || originalTarget.offsetHeight > window.document.documentElement.clientHeight) {
                                coordinates.Y = midPointY;
                            } else {
                                coordinates.Y = ((absoluteOffset.top - window.pageYOffset) + midPointY);
                            }
                        }
                    }
                    if(coordinatesAreOutsideOfVisibleClientArea(coordinates.X, coordinates.Y)) {
                        coordinates.X = coordinates.Y = 0;
                    }
                    contextMenu.show(coordinates.X, coordinates.Y, 0, target.id);
                    return true;
                }
                target = target.parentElement;
                if(!target) {
                    return false;
                }
            }
            return false;
        }
        document.addEventListener("keydown", function (event) {
            if(event.key === "F10" && event.shiftKey && !event.altKey && !event.ctrlKey) {
                var element = document.activeElement;
                if(handleContextMenuShow(element, 0, 0)) {
                    event.preventDefault();
                }
            }
        }, false);
        document.addEventListener("contextmenu", function (event) {
            handleContextMenuShow(event.target, event.clientX, event.clientY);
            event.preventDefault();
        }, false);
        document.addEventListener("click", function (event) {
            var currentElement = event.target;
            while(currentElement) {
                if(currentElement.hasAttribute("data-plugin-is-contextmenu")) {
                    return;
                }
                currentElement = currentElement.parentElement;
            }
            dismissAll();
        }, true);
        window.addEventListener("resize", function (event) {
            if(!Plugin.ContextMenu.canCreatePopup()) {
                dismissAll();
            }
        }, false);
        function stopPropagation(event) {
            event.stopPropagation();
            event.preventDefault();
        }
        ;
        var DisposableEventListener = (function () {
            function DisposableEventListener(target, type, listener, useCapture) {
                this.target = target;
                this.type = type;
                this.listener = listener;
                this.useCapture = useCapture;
            }
            DisposableEventListener.prototype.install = function () {
                this.target.addEventListener(this.type, this.listener, this.useCapture);
            };
            DisposableEventListener.prototype.uninstall = function () {
                this.target.removeEventListener(this.type, this.listener, this.useCapture);
            };
            return DisposableEventListener;
        })();        
        var HostContextMenu = (function () {
            function HostContextMenu(menuItems, id, ariaLabel, cssClass, callback, parentMenu, parentMenuId) {
                this.disposableEventListeners = [];
                if(menuItems === null || typeof (menuItems) === "undefined" || menuItems.length === 0) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5006"));
                }
                if(typeof (id) !== "string" && !isNullOrEmpty(id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5015"));
                }
                this.id = !isNullOrEmpty(id) ? id : generateId("plugin-contextmenu");
                this.ariaLabel = ariaLabel;
                if(!isNullOrEmpty(contextMenuStorage[this.id])) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5007"));
                }
                if(typeof (cssClass) !== "string" && !isNullOrEmpty(cssClass)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5016"));
                }
                this.callback = callback;
                this.eventManager = new Plugin.Utilities.EventManager();
                this.eventManager.setTarget(this);
                var contextMenu = document.createElement("ul");
                contextMenu.id = this.id;
                if(!isNullOrEmpty(parentMenu)) {
                    var fireShowEvent = function (eventManager) {
                        return function (event) {
                            eventManager.dispatchEvent("show");
                        };
                    };
                    this.addDisposableEventListener(parentMenu, "show", fireShowEvent(this.eventManager));
                    contextMenu.setAttribute("plugin-contextmenu-parent", parentMenuId);
                }
                contextMenu.className = "plugin-contextmenu";
                if(!isNullOrEmpty(cssClass)) {
                    contextMenu.classList.add(cssClass);
                }
                contextMenu.setAttribute("data-plugin-is-contextmenu", "true");
                var tabIndex = 1;
                for(var item in menuItems) {
                    if(!menuItems.hasOwnProperty(item)) {
                        continue;
                    }
                    var contextMenuItem = document.createElement("li");
                    contextMenuItem.className = "menuitem";
                    if(menuItems[item].type !== MenuItemType.separator) {
                        contextMenuItem.setAttribute("tabIndex", tabIndex.toString());
                        tabIndex++;
                    }
                    var role = "";
                    switch(menuItems[item].type) {
                        case MenuItemType.checkbox:
                            role = "menuitemcheckbox";
                            break;
                        case MenuItemType.command:
                            role = "menuitem";
                            break;
                        case MenuItemType.separator:
                            role = "separator";
                            break;
                        case MenuItemType.radio:
                            role = "menuitemradio";
                            break;
                    }
                    contextMenuItem.setAttribute("role", role);
                    var itemId = menuItems[item].id;
                    contextMenuItem.id = !isNullOrEmpty(itemId) ? itemId : generateId("plugin-contextmenuitem");
                    var mainDiv = document.createElement("div");
                    mainDiv.className = "main";
                    var label = menuItems[item].label;
                    var isEmpty = isNullOrEmpty(label);
                    if((isEmpty && (menuItems[item].type !== MenuItemType.separator)) || ((typeof (label) !== "string") && !isEmpty)) {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5018"));
                    }
                    if(!isEmpty) {
                        mainDiv.innerText = label;
                    }
                    contextMenuItem.appendChild(mainDiv);
                    var enabledIcon = menuItems[item].iconEnabled;
                    if(!isNullOrEmpty(enabledIcon) && typeof (enabledIcon) !== "string") {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5019"));
                    }
                    var disabledIcon = menuItems[item].iconDisabled;
                    if(!isNullOrEmpty(disabledIcon) && typeof (disabledIcon) !== "string") {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5020"));
                    }
                    var iconImg = document.createElement("img");
                    iconImg.className = "icon";
                    iconImg.style.display = "none";
                    contextMenuItem.appendChild(iconImg);
                    var shortcut = menuItems[item].accessKey;
                    if(!isNullOrEmpty(shortcut) && typeof (shortcut) !== "string") {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5021"));
                    }
                    var shortcutDiv = document.createElement("div");
                    shortcutDiv.className = "shortcut";
                    if(!isNullOrEmpty(shortcut)) {
                        shortcutDiv.innerText = shortcut;
                    }
                    contextMenuItem.appendChild(shortcutDiv);
                    var menuItemCallback = menuItems[item].callback;
                    if(isNullOrEmpty(menuItemCallback)) {
                        menuItemCallback = this.callback;
                    }
                    if((typeof (menuItemCallback) !== "function") && (menuItems[item].type !== MenuItemType.separator)) {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5017"));
                    }
                    var passCallbackToClickEvent = function (callback) {
                        return function (event) {
                            var item = event.currentTarget;
                            if(callback && !item.classList.contains("disabled") && isNullOrEmpty(item.getAttribute("data-plugin-contextmenu"))) {
                                var type;
                                switch(item.getAttribute("data-plugin-contextmenu-item-type")) {
                                    case "checkbox":
                                        type = MenuItemType.checkbox;
                                        break;
                                    case "command":
                                        type = MenuItemType.command;
                                        break;
                                    case "separator":
                                        type = MenuItemType.separator;
                                        break;
                                    case "radio":
                                        type = MenuItemType.radio;
                                        break;
                                    default:
                                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5008"));
                                }
                                var contextMenuItem = {
                                    id: item.id,
                                    callback: callback,
                                    label: (item.getElementsByClassName("main")[0]).innerText,
                                    type: type,
                                    iconEnabled: (item.getElementsByClassName("icon")[0]).src,
                                    iconDisabled: "",
                                    accessKey: (item.getElementsByClassName("shortcut")[0]).innerText,
                                    hidden: function () {
                                        return false;
                                    },
                                    disabled: function () {
                                        return false;
                                    },
                                    checked: function () {
                                        return item.getAttribute("aria-checked") === "true";
                                    },
                                    cssClass: item.className,
                                    submenu: null
                                };
                                dismissAll().done(function () {
                                    callback((item.parentNode).id, contextMenuItem, currentTargetId);
                                });
                            } else {
                                stopPropagation(event);
                            }
                        };
                    };
                    this.addDisposableEventListener(contextMenuItem, "click", passCallbackToClickEvent(menuItemCallback), false);
                    this.addDisposableEventListener(contextMenuItem, "contextmenu", passCallbackToClickEvent(menuItemCallback), false);
                    var passMenuItemCallbacksToShowEvent = function (isHidden, isDisabled, isChecked, iconEnabled, iconDisabled, type, item) {
                        return function (event) {
                            if(typeof (isHidden) === "function" && isHidden()) {
                                item.classList.add("hidden");
                            } else {
                                item.classList.remove("hidden");
                            }
                            var icon;
                            if(typeof (isDisabled) === "function" && isDisabled()) {
                                item.classList.add("disabled");
                                item.setAttribute("aria-disabled", "true");
                                icon = iconDisabled;
                            } else {
                                item.classList.remove("disabled");
                                item.removeAttribute("aria-disabled");
                                icon = iconEnabled;
                            }
                            var iconImg = item.getElementsByClassName("icon")[0];
                            switch(type) {
                                case MenuItemType.checkbox:
                                    item.removeAttribute("aria-checked");
                                    if(typeof (isChecked) === "function" && isChecked()) {
                                        var backgroundSrc = getComputedStyle(iconImg).getPropertyValue("background-image");
                                        backgroundSrc = backgroundSrc.replace(urlRegEx, function (urlMatch, src) {
                                            return src;
                                        });
                                        iconImg.src = backgroundSrc;
                                        item.setAttribute("aria-checked", "true");
                                        iconImg.style.display = "block";
                                    } else {
                                        item.setAttribute("aria-checked", "false");
                                        iconImg.style.display = "none";
                                    }
                                    break;
                                case MenuItemType.command:
                                    if(!isNullOrEmpty(icon)) {
                                        if(iconIsTokenRegEx.test(icon)) {
                                            iconImg.setAttribute("data-plugin-theme-src", icon);
                                        } else {
                                            iconImg.src = icon;
                                            iconImg.removeAttribute("data-plugin-theme-src");
                                        }
                                        iconImg.style.display = "block";
                                    } else {
                                        iconImg.style.display = "none";
                                    }
                                    break;
                            }
                        };
                    };
                    var isHidden = menuItems[item].hidden;
                    if(!isNullOrEmpty(isHidden) && typeof (isHidden) !== "function") {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5023"));
                    }
                    var isDisabled = menuItems[item].disabled;
                    if(!isNullOrEmpty(isDisabled) && typeof (isDisabled) !== "function") {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5024"));
                    }
                    var isChecked = menuItems[item].checked;
                    if(!isNullOrEmpty(isChecked) && typeof (isChecked) !== "function") {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5025"));
                    }
                    this.addDisposableEventListener(this, "show", passMenuItemCallbacksToShowEvent(isHidden, isDisabled, isChecked, menuItems[item].iconEnabled, menuItems[item].iconDisabled, menuItems[item].type, contextMenuItem));
                    var itemCssClass = menuItems[item].cssClass;
                    if(!isNullOrEmpty(itemCssClass) && typeof (itemCssClass) !== "string") {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5022"));
                    }
                    if(!isNullOrEmpty(itemCssClass)) {
                        contextMenuItem.classList.add(itemCssClass);
                    }
                    var submenu = menuItems[item].submenu;
                    var isSubmenuNullOrUndefined = (typeof (submenu) === "undefined" || submenu === null);
                    if(!isSubmenuNullOrUndefined && !Array.isArray(submenu)) {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.5026"));
                    }
                    if(!isSubmenuNullOrUndefined) {
                        var submenuId = generateId("plugin-contextsubmenu");
                        var menu = new HostContextMenu(submenu, submenuId, null, cssClass, menuItemCallback, this, this.id);
                        var arrowDiv = document.createElement("div");
                        arrowDiv.className = "arrow";
                        contextMenuItem.setAttribute("data-plugin-contextmenu", submenuId);
                        contextMenuItem.appendChild(arrowDiv);
                    }
                    var deactivateSiblingSubmenus = function (currentTarget) {
                        if(getComputedStyle(currentTarget.parentElement).getPropertyValue("display") !== "none") {
                            var siblings = currentTarget.parentElement.querySelectorAll("[data-plugin-contextmenu]");
                            for(var i = 0; i < siblings.length; i++) {
                                var sibling = siblings[i];
                                if(sibling !== currentTarget) {
                                    if(typeof (sibling.className) !== "undefined") {
                                        sibling.classList.remove("active");
                                        submenuId = sibling.getAttribute("data-plugin-contextmenu");
                                        submenu = document.getElementById(submenuId);
                                        submenu.style.display = "none";
                                    }
                                }
                            }
                        }
                    };
                    this.addDisposableEventListener(contextMenuItem, "mouseover", function (event) {
                        var currentTarget = event.currentTarget;
                        if(shouldFocusMenuItem(currentTarget)) {
                            currentTarget.focus();
                        } else {
                            deactivateSiblingSubmenus(event.currentTarget);
                        }
                        showSubmenu(currentTarget);
                    }, false);
                    this.addDisposableEventListener(contextMenuItem, "mouseout", handleContextMenuItemMouseOut, false);
                    this.addDisposableEventListener(contextMenuItem, "focus", function (event) {
                        deactivateSiblingSubmenus(event.currentTarget);
                    }, false);
                    this.addDisposableEventListener(contextMenuItem, "keydown", onMenuItemKeyDown, false);
                    switch(menuItems[item].type) {
                        case MenuItemType.checkbox:
                            iconImg.classList.add("checkbox");
                            contextMenuItem.setAttribute("data-plugin-contextmenu-item-type", "checkbox");
                            break;
                        case MenuItemType.command:
                            contextMenuItem.setAttribute("data-plugin-contextmenu-item-type", "command");
                            break;
                        case MenuItemType.radio:
                            throw new Error("Not implemented");
                            break;
                        case MenuItemType.separator:
                            mainDiv.classList.add("hr");
                            contextMenuItem.setAttribute("data-plugin-contextmenu-item-type", "separator");
                            break;
                        default:
                            throw new Error(Plugin.Resources.getErrorString("JSPlugin.5008"));
                    }
                    contextMenu.appendChild(contextMenuItem);
                }
                this.addDisposableEventListener(contextMenu, "click", stopPropagation, false);
                this.addDisposableEventListener(contextMenu, "contextmenu", stopPropagation, false);
                var fireDismiss = function (contextMenu, id) {
                    return function (event) {
                        if(id === event.id) {
                            if(activeElement) {
                                activeElement.focus();
                                activeElement = null;
                            }
                            contextMenu.eventManager.dispatchEvent("dismiss");
                        }
                    };
                };
                host.addEventListener("contextmenudismissed", fireDismiss(this, this.id));
                contextMenuContainer.appendChild(contextMenu);
                contextMenuStorage[contextMenu.id] = this;
                this.addDisposableEventListener(contextMenu, "keydown", onContextMenuKeyDown, false);
            }
            HostContextMenu.prototype.attach = function (element) {
                if(isNullOrEmpty(this.id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5010"));
                }
                element.setAttribute("data-plugin-contextmenu", this.id);
            };
            HostContextMenu.prototype.detach = function (element) {
                if(isNullOrEmpty(this.id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5010"));
                }
                if(element.getAttribute("data-plugin-contextmenu") === this.id) {
                    element.removeAttribute("data-plugin-contextmenu");
                }
            };
            HostContextMenu.prototype.dismiss = function () {
                if(isNullOrEmpty(this.id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5010"));
                }
                if(!Plugin.ContextMenu.canCreatePopup()) {
                    var contextMenu = document.getElementById(this.id);
                    if(contextMenu.style.display !== "none") {
                        document.getElementById(this.id).style.display = "none";
                        if(activeElement) {
                            activeElement.focus();
                            activeElement = null;
                        }
                        this.eventManager.dispatchEvent("dismiss");
                    }
                } else {
                    host.dismiss();
                }
            };
            HostContextMenu.prototype.dispose = function () {
                if(isNullOrEmpty(this.id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5010"));
                }
                this.disposableEventListeners.forEach(function (listener) {
                    listener.uninstall();
                });
                this.disposableEventListeners = [];
                var nodeList = (document.querySelectorAll("[data-plugin-contextmenu=" + this.id + "]"));
                for(var i = 0; i < nodeList.length; i++) {
                    nodeList[i].removeAttribute("data-plugin-contextmenu");
                }
                removeContextMenuFromStorage(this.id);
                this.id = null;
                this.callback = null;
            };
            HostContextMenu.prototype.show = function (xPosition, yPosition, widthOffset, targetId) {
                if(isNullOrEmpty(this.id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5010"));
                }
                if(!isFiniteNumber(xPosition) || !isFiniteNumber(yPosition)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5012"));
                }
                if(!isFiniteNumber(widthOffset) && !isNullOrEmpty(widthOffset)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5013"));
                }
                if(typeof (targetId) !== "string" && !isNullOrEmpty(targetId)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5014"));
                }
                dismissAll();
                currentTargetId = targetId;
                activeElement = document.activeElement;
                var offset = widthOffset || 0;
                var element = document.getElementById(this.id);
                for(var i = 0; i < element.children.length; i++) {
                    (element.children[i]).classList.remove("active");
                }
                this.eventManager.dispatchEvent("show");
                adjustMenuItemWidth(element);
                _positionHelpers.show(element, this.ariaLabel, xPosition, yPosition, 0, offset, null, positionContextMenuInsideAirspace, host.show.bind(host));
            };
            HostContextMenu.prototype.addEventListener = function (type, listener) {
                if(isNullOrEmpty(this.id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5010"));
                }
                this.eventManager.addEventListener(type, listener);
            };
            HostContextMenu.prototype.removeEventListener = function (type, listener) {
                if(isNullOrEmpty(this.id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5010"));
                }
                this.eventManager.removeEventListener(type, listener);
            };
            HostContextMenu.prototype.dispatchEvent = function (evt) {
                if(isNullOrEmpty(this.id)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPlugin.5010"));
                }
                return this.eventManager.dispatchEvent(evt.type);
            };
            HostContextMenu.prototype.addDisposableEventListener = function (target, type, listener, useCapture) {
                var disposableListener = new DisposableEventListener(target, type, listener, useCapture);
                disposableListener.install();
                this.disposableEventListeners.push(disposableListener);
            };
            return HostContextMenu;
        })();        
        function adjustMenuItemWidth(element) {
            var maxWidth = 0;
            var shortcuts = element.querySelectorAll(".shortcut");
            for(var i = 0; i < shortcuts.length; i++) {
                var shortcut = shortcuts[i];
                element.style.display = "block";
                var width = parseInt(getComputedStyle(shortcut).getPropertyValue("width"));
                element.style.display = "none";
                maxWidth = (width > maxWidth) ? width : maxWidth;
            }
            var menuItemMainDivs = element.querySelectorAll(".main");
            maxWidth += 50;
            for(var i = 0; i < menuItemMainDivs.length; i++) {
                (menuItemMainDivs[i]).style.paddingRight = maxWidth + "px";
            }
        }
        function removeContextMenuFromStorage(id) {
            var menu = document.getElementById(id);
            contextMenuContainer.removeChild(menu);
            delete contextMenuStorage[id];
            var submenuItems = menu.querySelectorAll("[data-plugin-contextmenu]");
            for(var i = 0; i < submenuItems.length; i++) {
                removeContextMenuFromStorage((submenuItems[i]).getAttribute("data-plugin-contextmenu"));
            }
        }
        function create(menuItems, id, ariaLabel, cssClass, callback) {
            return new HostContextMenu(menuItems, id, ariaLabel, cssClass, callback);
        }
        ContextMenu.create = create;
        function canCreatePopup() {
            return host.canCreatePopup() && !shouldShowInline;
        }
        ContextMenu.canCreatePopup = canCreatePopup;
        ;
        (function (_positionHelpers) {
            function show(element, ariaLabel, xPosition, yPosition, elementOffsetTop, widthOffset, displayType, tryAdjustCoordinates, showOutsideOfAirspace) {
                var nodeList = element.querySelectorAll("[data-plugin-contextmenu]");
                shouldShowInline = shouldShowInline || (nodeList.length > 0 && !host.canCreatePopup(true));
                Plugin.Theme._cssHelpers.processImages(element);
                var display = displayType || "block";
                element.style.display = display;
                var height = element.offsetHeight;
                var width = element.offsetWidth;
                element.style.display = "none";
                var scrollOffsetTop = window.pageYOffset;
                var scrollOffsetLeft = window.pageXOffset;
                var viewPortHeight = document.documentElement.clientHeight;
                var viewPortWidth = document.documentElement.clientWidth;
                var positionInfo = {
                    clientCoordinates: {
                        X: xPosition,
                        Y: yPosition
                    },
                    width: width,
                    height: height,
                    viewPortWidth: viewPortWidth,
                    viewPortHeight: viewPortHeight,
                    scrollOffsetLeft: scrollOffsetLeft,
                    scrollOffsetTop: scrollOffsetTop,
                    elementOffsetTop: elementOffsetTop,
                    widthOffset: widthOffset
                };
                if(Plugin.ContextMenu.canCreatePopup()) {
                    showOutsideOfAirspace(element.id, ariaLabel, contextMenuContainer, positionInfo);
                    return;
                }
                var adjustedPositionInfo = positionInfo;
                if(yPosition + height > viewPortHeight || xPosition + width > viewPortWidth) {
                    if(typeof (tryAdjustCoordinates) === "function") {
                        adjustedPositionInfo = tryAdjustCoordinates(positionInfo);
                    }
                }
                element.style.left = adjustedPositionInfo.clientCoordinates.X + scrollOffsetLeft + "px";
                element.style.top = adjustedPositionInfo.clientCoordinates.Y + scrollOffsetTop + "px";
                element.style.display = display;
                element.setAttribute("tabindex", "0");
                element.focus();
                __n("ContextMenuShow", adjustedPositionInfo.clientCoordinates.X + scrollOffsetLeft, adjustedPositionInfo.clientCoordinates.Y + scrollOffsetTop, adjustedPositionInfo.width, adjustedPositionInfo.height);
            }
            _positionHelpers.show = show;
        })(ContextMenu._positionHelpers || (ContextMenu._positionHelpers = {}));
        var _positionHelpers = ContextMenu._positionHelpers;
        function positionContextMenuInsideAirspace(positionInfo) {
            var y = positionInfo.clientCoordinates.Y;
            var yMirror = positionInfo.clientCoordinates.Y - positionInfo.height;
            if(positionInfo.clientCoordinates.Y + positionInfo.height > positionInfo.viewPortHeight && yMirror >= 0) {
                y = yMirror;
            }
            var x = positionInfo.clientCoordinates.X;
            var xMirror = positionInfo.clientCoordinates.X - (positionInfo.width + positionInfo.widthOffset);
            if(positionInfo.clientCoordinates.X + positionInfo.width > positionInfo.viewPortWidth && xMirror >= 0) {
                x = xMirror;
            }
            positionInfo.clientCoordinates.Y = y;
            positionInfo.clientCoordinates.X = x;
            return positionInfo;
        }
        function generateId(prefix) {
            if(isNullOrEmpty(prefix)) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.5009"));
            }
            function getHexDigits(count) {
                var random = "";
                while(random.length < count) {
                    random += Math.floor(Math.random() * 65536).toString(16);
                }
                return random.substr(0, count);
            }
            return prefix + "-" + getHexDigits(8) + "-" + getHexDigits(4) + "-" + getHexDigits(4) + "-" + getHexDigits(4) + "-" + getHexDigits(12);
        }
        function isNullOrEmpty(value) {
            return (value === null || typeof (value) === "undefined" || value === "");
        }
        function isFiniteNumber(value) {
            return (isFinite(value) && (typeof (value) === "number"));
        }
        function handlePopupMenuItemClick(event) {
            var target = event.currentTarget;
            if(!target.classList.contains("disabled") && isNullOrEmpty(target.getAttribute("data-plugin-contextmenu"))) {
                host.callback(target.id);
            } else if(target.classList.contains("disabled")) {
                target.focus();
            }
            stopPropagation(event);
        }
        function popupDeactivateSiblingSubmenus(currentTarget) {
            if(!currentTarget.classList.contains("active")) {
                var coordinates = {
                    X: 1,
                    Y: currentTarget.offsetTop + 1
                };
                host.dismissSubmenus(coordinates);
                var siblings = (currentTarget.parentNode).querySelectorAll("[data-plugin-contextmenu]");
                for(var i = 0; i < siblings.length; i++) {
                    var sibling = siblings[i];
                    if(sibling !== this) {
                        sibling.classList.remove("active");
                    }
                }
            }
        }
        function popupShowSubmenu(currentTarget) {
            if(!currentTarget.classList.contains("active")) {
                var submenuId = currentTarget.getAttribute("data-plugin-contextmenu");
                if(submenuId !== null && typeof (submenuId) !== "undefined") {
                    var submenu = document.getElementById(submenuId);
                    currentTarget.classList.add("active");
                    adjustMenuItemWidth(submenu);
                    _positionHelpers.show(submenu, null, 0, 0, currentTarget.offsetTop, 0, null, null, host.show.bind(host));
                }
            }
        }
        function handlePopupMenuItemMouseOver(event) {
            var currentTarget = event.currentTarget;
            if(shouldFocusMenuItem(currentTarget)) {
                currentTarget.focus();
            } else {
                popupDeactivateSiblingSubmenus(event.currentTarget);
            }
            popupShowSubmenu(currentTarget);
        }
        function handleContextMenuItemMouseOut(event) {
            var currentTarget = event.currentTarget;
            currentTarget.classList.remove("active");
            currentTarget.blur();
        }
        function handlePopupMenuItemFocus(event) {
            popupDeactivateSiblingSubmenus(event.currentTarget);
        }
        host.addEventListener("contextmenufocused", function (event) {
            focusActiveMenuItem("contextmenu");
        });
        host.addEventListener("contextmenuinitialized", function (event) {
            var contextmenu = document.getElementById("contextmenu");
            if(isNullOrEmpty(event.id)) {
                contextmenu.innerHTML = "";
                contextmenu.removeAttribute("aria-label");
                contextMenuContainer.innerHTML = "";
            } else {
                contextMenuContainer.innerHTML = event.contextMenus;
                contextmenu.innerHTML = document.getElementById(event.id).innerHTML;
                if(event.ariaLabel && event.ariaLabel.length !== 0) {
                    contextmenu.setAttribute("aria-label", event.ariaLabel);
                }
                contextmenu.addEventListener("click", stopPropagation, false);
                contextmenu.addEventListener("contextmenu", stopPropagation, false);
                contextmenu.addEventListener("keydown", onContextMenuKeyDown, false);
                var menuItems = contextmenu.getElementsByClassName("menuitem");
                for(var i = 0; i < menuItems.length; i++) {
                    menuItems[i].addEventListener("mouseover", handlePopupMenuItemMouseOver, false);
                    menuItems[i].addEventListener("mouseout", handleContextMenuItemMouseOut, false);
                    menuItems[i].addEventListener("focus", handlePopupMenuItemFocus, false);
                    menuItems[i].addEventListener("click", handlePopupMenuItemClick, false);
                    menuItems[i].addEventListener("contextmenu", handlePopupMenuItemClick, false);
                    menuItems[i].addEventListener("keydown", onMenuItemKeyDown, false);
                    menuItems[i].addEventListener("DOMAttrModified", onAttrModified, false);
                }
                contextmenu.style.display = "block";
                contextmenu.setAttribute("tabindex", "0");
                host.disableZoom();
                host.fireContentReady();
            }
        });
        host.addEventListener("contextmenuclicked", function (event) {
            var contextmenuItem = document.getElementById(event.Id);
            if(contextmenuItem) {
                contextmenuItem.click();
            }
        });
        host.addEventListener("contextmenuopened", function (event) {
            __n("ContextMenuShow", event.x, event.y, event.width, event.height);
        });
        function shouldFocusMenuItem(element) {
            var allowDisabledItemNavigation = element.parentElement.classList.contains("allowDisabledItemNavigation");
            var isDisabled = element.classList.contains("disabled");
            var isHidden = element.classList.contains("hidden");
            return ((allowDisabledItemNavigation || !isDisabled) && !isHidden && element.hasAttribute("tabindex"));
        }
        ;
        function getMenuItemStartIndex(target, currentTarget, menuItems) {
            var startIndex = 0;
            if(target !== currentTarget) {
                for(var i = 0; i < menuItems.length; i++) {
                    var element = menuItems[i];
                    if(element === target) {
                        startIndex = i + 1;
                        break;
                    }
                }
            }
            return startIndex;
        }
        function getPreviousMenuItem(startIndex, menuItems) {
            var elementToFocus;
            for(var i = startIndex - 2; i >= 0; i--) {
                var element = menuItems[i];
                if(shouldFocusMenuItem(element)) {
                    elementToFocus = element;
                    break;
                }
            }
            if(!elementToFocus) {
                for(var i = menuItems.length - 1; i > startIndex - 1; i--) {
                    var element = menuItems[i];
                    if(shouldFocusMenuItem(element)) {
                        elementToFocus = element;
                        break;
                    }
                }
            }
            return elementToFocus;
        }
        ;
        function getNextMenuItem(startIndex, menuItems) {
            var elementToFocus;
            for(var i = startIndex; i < menuItems.length; i++) {
                var element = menuItems[i];
                if(shouldFocusMenuItem(element)) {
                    elementToFocus = element;
                    break;
                }
            }
            if(!elementToFocus) {
                for(var i = 0; i < startIndex - 1; i++) {
                    var element = menuItems[i];
                    if(shouldFocusMenuItem(element)) {
                        elementToFocus = element;
                        break;
                    }
                }
            }
            return elementToFocus;
        }
        ;
        function handleDismissCurrent(currentTarget, ignoreDismissForRoot) {
            if(Plugin.ContextMenu.canCreatePopup()) {
                host.dismissCurrent(ignoreDismissForRoot);
                return;
            }
            var isRoot = !currentTarget.hasAttribute("plugin-contextmenu-parent");
            if(ignoreDismissForRoot && isRoot) {
                return;
            }
            contextMenuStorage[currentTarget.id].dismiss();
            if(!isRoot) {
                focusActiveMenuItem(currentTarget.getAttribute("plugin-contextmenu-parent"));
            }
        }
        ;
        function focusActiveMenuItem(menuId) {
            var menu = document.getElementById(menuId);
            menu.focus();
            var menuItems = menu.getElementsByClassName("menuitem");
            for(var i = 0; i < menuItems.length; i++) {
                var element = menuItems[i];
                if(element.classList.contains("active")) {
                    element.classList.remove("active");
                    element.focus();
                }
            }
        }
        ;
        function showSubmenu(currentTarget) {
            if(!currentTarget.classList.contains("active")) {
                var submenuId = currentTarget.getAttribute("data-plugin-contextmenu");
                if(submenuId !== null && typeof (submenuId) !== "undefined") {
                    currentTarget.classList.add("active");
                    var submenu = document.getElementById(submenuId);
                    submenu.style.zIndex = (parseInt(getComputedStyle(currentTarget.parentElement).getPropertyValue("z-index")) + 1).toString();
                    var parentWidth = parseInt(getComputedStyle(currentTarget.parentElement).getPropertyValue("width"));
                    var xPosition = parentWidth + parseInt(getComputedStyle(currentTarget.parentElement).getPropertyValue("left")) - window.pageXOffset;
                    var yPosition = currentTarget.offsetTop + parseInt(getComputedStyle(currentTarget.parentElement).getPropertyValue("top")) - window.pageYOffset;
                    var parentWidthOffset = parentWidth - 3;
                    adjustMenuItemWidth(submenu);
                    _positionHelpers.show(submenu, null, xPosition, yPosition, currentTarget.offsetTop, parentWidthOffset, null, positionContextMenuInsideAirspace, host.show.bind(host));
                }
            }
        }
        ;
        function onMenuItemKeyDown(event) {
            var target = event.target;
            switch(event.keyCode) {
                case 13:
                    showSubmenu(target);
                    target.click();
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    break;
                case 39:
                    showSubmenu(target);
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    break;
            }
        }
        ;
        function onContextMenuKeyDown(event) {
            var elementToFocus;
            var target = event.target;
            var currentTarget = event.currentTarget;
            var menuItems = currentTarget.getElementsByClassName("menuitem");
            var startIndex = getMenuItemStartIndex(target, currentTarget, menuItems);
            switch(event.keyCode) {
                case 9:
                    if(!event.shiftKey) {
                        elementToFocus = getNextMenuItem(startIndex, menuItems);
                    } else {
                        elementToFocus = getPreviousMenuItem(startIndex, menuItems);
                    }
                    event.preventDefault();
                    break;
                case 18:
                    dismissAll();
                    break;
                case 27:
                    handleDismissCurrent(currentTarget, false);
                    event.preventDefault();
                    break;
                case 35:
                    elementToFocus = getPreviousMenuItem(0, menuItems);
                    event.preventDefault();
                    break;
                case 36:
                    elementToFocus = getNextMenuItem(0, menuItems);
                    event.preventDefault();
                    break;
                case 37:
                    handleDismissCurrent(currentTarget, true);
                    event.preventDefault();
                    break;
                case 38:
                    elementToFocus = getPreviousMenuItem(startIndex, menuItems);
                    event.preventDefault();
                    break;
                case 40:
                    elementToFocus = getNextMenuItem(startIndex, menuItems);
                    event.preventDefault();
                    break;
                case 93:
                    dismissAll();
                    event.preventDefault();
                    break;
            }
            if(elementToFocus) {
                elementToFocus.focus();
            }
        }
        ;
        function onAttrModified(event) {
            if(event.attrName === "aria-checked" && event.attrChange === 1) {
                handlePopupMenuItemClick(event);
            }
        }
        ;
    })(Plugin.ContextMenu || (Plugin.ContextMenu = {}));
    var ContextMenu = Plugin.ContextMenu;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (VS) {
        (function (Utilities) {
            function createExternalObject(fileAlias, clsid) {
                return (window.external).createExternalObject(fileAlias, clsid);
            }
            Utilities.createExternalObject = createExternalObject;
        })(VS.Utilities || (VS.Utilities = {}));
        var Utilities = VS.Utilities;
    })(Plugin.VS || (Plugin.VS = {}));
    var VS = Plugin.VS;
})(Plugin || (Plugin = {}));
var Plugin;
(function (Plugin) {
    (function (SQMAnalytics) {
        "use strict";
                var host = loadModule("plugin.host.sqmanalytics");
        function isNumberIntegral(num) {
            return ((num % 1) === 0);
        }
        function isNumberSQMDataSizeCompatible(num) {
            return (num >= 0 && num <= 0x7FFFFFFF);
        }
        function validateArrayContainsAcceptableTypes(data) {
            for(var i = 0; i < data.length; i++) {
                var type = typeof data[i];
                if(type !== "string" && type !== "boolean") {
                    if(type !== "number") {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.8000"));
                    } else if(!isNumberIntegral(data[i])) {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.8001"));
                    } else if(!isNumberSQMDataSizeCompatible(data[i])) {
                        throw new Error(Plugin.Resources.getErrorString("JSPlugin.8002"));
                    }
                }
            }
        }
        function addDataToStream(dataPointId, data) {
            if(!data) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.8003"));
            }
            if(data.length === 0) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.8004"));
            }
            validateArrayContainsAcceptableTypes(data);
            host.addDataToStream(dataPointId, data);
        }
        SQMAnalytics.addDataToStream = addDataToStream;
        function logBooleanData(dataPointId, data) {
            host.logBooleanData(dataPointId, data);
        }
        SQMAnalytics.logBooleanData = logBooleanData;
        function logNumericData(dataPointId, data) {
            if(!isNumberIntegral(data)) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.8005"));
            }
            if(!isNumberSQMDataSizeCompatible(data)) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.8006"));
            }
            host.logNumericData(dataPointId, data);
        }
        SQMAnalytics.logNumericData = logNumericData;
        function logStringData(dataPointId, data) {
            if(!data) {
                throw new Error(Plugin.Resources.getErrorString("JSPlugin.8007"));
            }
            host.logStringData(dataPointId, data);
        }
        SQMAnalytics.logStringData = logStringData;
    })(Plugin.SQMAnalytics || (Plugin.SQMAnalytics = {}));
    var SQMAnalytics = Plugin.SQMAnalytics;
})(Plugin || (Plugin = {}));
(function baseInit(global, undefined) {
    "use strict";

    function initializeProperties(target, members) {
        var keys = Object.keys(members);
        var properties;
        var i, len;
        for (i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var enumerable = key.charCodeAt(0) !== /*_*/95;
            var member = members[key];
            if (member && typeof member === 'object') {
                if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
                    if (member.enumerable === undefined) {
                        member.enumerable = enumerable;
                    }
                    properties = properties || {};
                    properties[key] = member;
                    continue;
                }
            }
            if (!enumerable) {
                properties = properties || {};
                properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true }
                continue;
            }
            target[key] = member;
        }
        if (properties) {
            Object.defineProperties(target, properties);
        }
    }

    (function (rootNamespace) {

        // Create the rootNamespace in the global namespace
        if (!global[rootNamespace]) {
            global[rootNamespace] = Object.create(Object.prototype);
        }

        // Cache the rootNamespace we just created in a local variable
        var _rootNamespace = global[rootNamespace];
        if (!_rootNamespace.Namespace) {
            _rootNamespace.Namespace = Object.create(Object.prototype);
        }

        function defineWithParent(parentNamespace, name, members) {
            /// <signature helpKeyword="PluginUtilities.Namespace.defineWithParent">
            /// <summary locid="PluginUtilities.Namespace.defineWithParent">
            /// Defines a new namespace with the specified name under the specified parent namespace.
            /// </summary>
            /// <param name="parentNamespace" type="Object" locid="PluginUtilities.Namespace.defineWithParent_p:parentNamespace">
            /// The parent namespace.
            /// </param>
            /// <param name="name" type="String" locid="PluginUtilities.Namespace.defineWithParent_p:name">
            /// The name of the new namespace.
            /// </param>
            /// <param name="members" type="Object" locid="PluginUtilities.Namespace.defineWithParent_p:members">
            /// The members of the new namespace.
            /// </param>
            /// <returns locid="PluginUtilities.Namespace.defineWithParent_returnValue">
            /// The newly-defined namespace.
            /// </returns>
            /// </signature>
            var currentNamespace = parentNamespace,
                namespaceFragments = name.split(".");

            for (var i = 0, len = namespaceFragments.length; i < len; i++) {
                var namespaceName = namespaceFragments[i];
                if (!currentNamespace[namespaceName]) {
                    Object.defineProperty(currentNamespace, namespaceName,
                        { value: {}, writable: false, enumerable: true, configurable: true }
                    );
                }
                currentNamespace = currentNamespace[namespaceName];
            }

            if (members) {
                initializeProperties(currentNamespace, members);
            }

            return currentNamespace;
        }

        function define(name, members) {
            /// <signature helpKeyword="PluginUtilities.Namespace.define">
            /// <summary locid="PluginUtilities.Namespace.define">
            /// Defines a new namespace with the specified name.
            /// </summary>
            /// <param name="name" type="String" locid="PluginUtilities.Namespace.define_p:name">
            /// The name of the namespace. This could be a dot-separated name for nested namespaces.
            /// </param>
            /// <param name="members" type="Object" locid="PluginUtilities.Namespace.define_p:members">
            /// The members of the new namespace.
            /// </param>
            /// <returns locid="PluginUtilities.Namespace.define_returnValue">
            /// The newly-defined namespace.
            /// </returns>
            /// </signature>
            return defineWithParent(global, name, members);
        }

        // Establish members of the "PluginUtilities.Namespace" namespace
        Object.defineProperties(_rootNamespace.Namespace, {

            defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

            define: { value: define, writable: true, enumerable: true, configurable: true }

        });

    })("PluginUtilities");

    (function (PluginUtilities) {

        function define(constructor, instanceMembers, staticMembers) {
            /// <signature helpKeyword="PluginUtilities.Class.define">
            /// <summary locid="PluginUtilities.Class.define">
            /// Defines a class using the given constructor and the specified instance members.
            /// </summary>
            /// <param name="constructor" type="Function" locid="PluginUtilities.Class.define_p:constructor">
            /// A constructor function that is used to instantiate this class.
            /// </param>
            /// <param name="instanceMembers" type="Object" locid="PluginUtilities.Class.define_p:instanceMembers">
            /// The set of instance fields, properties, and methods made available on the class.
            /// </param>
            /// <param name="staticMembers" type="Object" locid="PluginUtilities.Class.define_p:staticMembers">
            /// The set of static fields, properties, and methods made available on the class.
            /// </param>
            /// <returns type="Function" locid="PluginUtilities.Class.define_returnValue">
            /// The newly-defined class.
            /// </returns>
            /// </signature>
            constructor = constructor || function () { };
            PluginUtilities.Utilities.markSupportedForProcessing(constructor);
            if (instanceMembers) {
                initializeProperties(constructor.prototype, instanceMembers);
            }
            if (staticMembers) {
                initializeProperties(constructor, staticMembers);
            }
            return constructor;
        }

        function derive(baseClass, constructor, instanceMembers, staticMembers) {
            /// <signature helpKeyword="PluginUtilities.Class.derive">
            /// <summary locid="PluginUtilities.Class.derive">
            /// Creates a sub-class based on the supplied baseClass parameter, using prototypal inheritance.
            /// </summary>
            /// <param name="baseClass" type="Function" locid="PluginUtilities.Class.derive_p:baseClass">
            /// The class to inherit from.
            /// </param>
            /// <param name="constructor" type="Function" locid="PluginUtilities.Class.derive_p:constructor">
            /// A constructor function that is used to instantiate this class.
            /// </param>
            /// <param name="instanceMembers" type="Object" locid="PluginUtilities.Class.derive_p:instanceMembers">
            /// The set of instance fields, properties, and methods to be made available on the class.
            /// </param>
            /// <param name="staticMembers" type="Object" locid="PluginUtilities.Class.derive_p:staticMembers">
            /// The set of static fields, properties, and methods to be made available on the class.
            /// </param>
            /// <returns type="Function" locid="PluginUtilities.Class.derive_returnValue">
            /// The newly-defined class.
            /// </returns>
            /// </signature>
            if (baseClass) {
                constructor = constructor || function () { };
                var basePrototype = baseClass.prototype;
                constructor.prototype = Object.create(basePrototype);
                PluginUtilities.Utilities.markSupportedForProcessing(constructor);
                Object.defineProperty(constructor.prototype, "constructor", { value: constructor, writable: true, configurable: true, enumerable: true });
                if (instanceMembers) {
                    initializeProperties(constructor.prototype, instanceMembers);
                }
                if (staticMembers) {
                    initializeProperties(constructor, staticMembers);
                }
                return constructor;
            } else {
                return define(constructor, instanceMembers, staticMembers);
            }
        }

        function mix(constructor) {
            /// <signature helpKeyword="PluginUtilities.Class.mix">
            /// <summary locid="PluginUtilities.Class.mix">
            /// Defines a class using the given constructor and the union of the set of instance members
            /// specified by all the mixin objects. The mixin parameter list is of variable length.
            /// </summary>
            /// <param name="constructor" locid="PluginUtilities.Class.mix_p:constructor">
            /// A constructor function that is used to instantiate this class.
            /// </param>
            /// <returns locid="PluginUtilities.Class.mix_returnValue">
            /// The newly-defined class.
            /// </returns>
            /// </signature>
            constructor = constructor || function () { };
            var i, len;
            for (i = 1, len = arguments.length; i < len; i++) {
                initializeProperties(constructor.prototype, arguments[i]);
            }
            return constructor;
        }

        // Establish members of "PluginUtilities.Class" namespace
        PluginUtilities.Namespace.define("PluginUtilities.Class", {
            define: define,
            derive: derive,
            mix: mix
        });

    })(PluginUtilities);

})(this);

(function baseUtilsInit(global, PluginUtilities) {
    "use strict";

    var hasWinRT = !!global.Windows;

    var strings = {
        get notSupportedForProcessing() { return PluginUtilities.Resources._getPluginUtilitiesString("base/notSupportedForProcessing").value; }
    };

    function nop(v) {
        return v;
    }

    function getMemberFiltered(name, root, filter) {
        return name.split(".").reduce(function (currentNamespace, name) {
            if (currentNamespace) {
                return filter(currentNamespace[name]);
            }
            return null;
        }, root);
    }

    // Establish members of "PluginUtilities.Utilities" namespace
    PluginUtilities.Namespace.define("PluginUtilities.Utilities", {
        // Used for mocking in tests
        _setHasWinRT: {
            value: function (value) {
                hasWinRT = value;
            },
            configurable: false,
            writable: false,
            enumerable: false
        },

        /// <field type="Boolean" locid="PluginUtilities.Utilities.hasWinRT" helpKeyword="PluginUtilities.Utilities.hasWinRT">Determine if WinRT is accessible in this script context.</field>
        hasWinRT: {
            get: function () { return hasWinRT; },
            configurable: false,
            enumerable: true
        },

        _getMemberFiltered: getMemberFiltered,

        getMember: function (name, root) {
            /// <signature helpKeyword="PluginUtilities.Utilities.getMember">
            /// <summary locid="PluginUtilities.Utilities.getMember">
            /// Gets the leaf-level type or namespace specified by the name parameter.
            /// </summary>
            /// <param name="name" locid="PluginUtilities.Utilities.getMember_p:name">
            /// The name of the member.
            /// </param>
            /// <param name="root" locid="PluginUtilities.Utilities.getMember_p:root">
            /// The root to start in. Defaults to the global object.
            /// </param>
            /// <returns locid="PluginUtilities.Utilities.getMember_returnValue">
            /// The leaf-level type or namespace in the specified parent namespace.
            /// </returns>
            /// </signature>
            if (!name) {
                return null;
            }
            return getMemberFiltered(name, root || global, nop);
        },

        ready: function (callback, async) {
            /// <signature helpKeyword="PluginUtilities.Utilities.ready">
            /// <summary locid="PluginUtilities.Utilities.ready">
            /// Ensures that the specified function executes only after the DOMContentLoaded event has fired
            /// for the current page.
            /// </summary>
            /// <returns locid="PluginUtilities.Utilities.ready_returnValue">A promise that completes after DOMContentLoaded has occurred.</returns>
            /// <param name="callback" optional="true" locid="PluginUtilities.Utilities.ready_p:callback">
            /// A function that executes after DOMContentLoaded has occurred.
            /// </param>
            /// <param name="async" optional="true" locid="PluginUtilities.Utilities.ready_p:async">
            /// If true, the callback should be executed asynchronously.
            /// </param>
            /// </signature>
            return new PluginUtilities.Promise(function (c, e) {
                function complete() {
                    if (callback) {
                        try {
                            callback();
                            c();
                        }
                        catch (err) {
                            e(err);
                        }
                    }
                    else {
                        c();
                    }
                }

                var readyState = PluginUtilities.Utilities.testReadyState;
                if (!readyState) {
                    if (global.document) {
                        readyState = document.readyState;
                    }
                    else {
                        readyState = "complete";
                    }
                }
                if (readyState === "complete" || (global.document && document.body !== null)) {
                    if (async) {
                        msSetImmediate(complete);
                    }
                    else {
                        complete();
                    }
                }
                else {
                    global.addEventListener("DOMContentLoaded", complete, false);
                }
            });
        },

        /// <field type="Boolean" locid="PluginUtilities.Utilities.strictProcessing" helpKeyword="PluginUtilities.Utilities.strictProcessing">Determines if strict declarative processing is enabled in this script context.</field>
        strictProcessing: {
            get: function () { return true; },
            configurable: false,
            enumerable: true,
        },

        markSupportedForProcessing: {
            value: function (func) {
                /// <signature helpKeyword="PluginUtilities.Utilities.markSupportedForProcessing">
                /// <summary locid="PluginUtilities.Utilities.markSupportedForProcessing">
                /// Marks a function as being compatible with declarative processing, such as PluginUtilities.UI.processAll
                /// or PluginUtilities.Binding.processAll.
                /// </summary>
                /// <param name="func" type="Function" locid="PluginUtilities.Utilities.markSupportedForProcessing_p:func">
                /// The function to be marked as compatible with declarative processing.
                /// </param>
                /// <returns locid="PluginUtilities.Utilities.markSupportedForProcessing_returnValue">
                /// The input function.
                /// </returns>
                /// </signature>
                func.supportedForProcessing = true;
                return func;
            },
            configurable: false,
            writable: false,
            enumerable: true
        },

        requireSupportedForProcessing: {
            value: function (value) {
                /// <signature helpKeyword="PluginUtilities.Utilities.requireSupportedForProcessing">
                /// <summary locid="PluginUtilities.Utilities.requireSupportedForProcessing">
                /// Asserts that the value is compatible with declarative processing, such as PluginUtilities.UI.processAll
                /// or PluginUtilities.Binding.processAll. If it is not compatible an exception will be thrown.
                /// </summary>
                /// <param name="value" type="Object" locid="PluginUtilities.Utilities.requireSupportedForProcessing_p:value">
                /// The value to be tested for compatibility with declarative processing. If the
                /// value is a function it must be marked with a property 'supportedForProcessing'
                /// with a value of true.
                /// </param>
                /// <returns locid="PluginUtilities.Utilities.requireSupportedForProcessing_returnValue">
                /// The input value.
                /// </returns>
                /// </signature>
                var supportedForProcessing = true;
                if (value === global) {
                    supportedForProcessing = false;
                } else if (value instanceof Function && !value.supportedForProcessing) {
                    supportedForProcessing = false;
                }

                if (supportedForProcessing) {
                    return value;
                }

                throw new PluginUtilities.ErrorFromName("PluginUtilities.Utilities.requireSupportedForProcessing", PluginUtilities.Resources._formatString(strings.notSupportedForProcessing, value));
            },
            configurable: false,
            writable: false,
            enumerable: true
        },

    });

    PluginUtilities.Namespace.define("PluginUtilities", {
        validation: false,

        strictProcessing: {
            value: function () {
                /// <signature helpKeyword="PluginUtilities.strictProcessing">
                /// <summary locid="PluginUtilities.strictProcessing">
                /// Strict processing is always enforced, this method has no effect.
                /// </summary>
                /// </signature>
            },
            configurable: false,
            writable: false,
            enumerable: false
        },
    });
})(this, PluginUtilities);

(function logInit() {
    "use strict";

    var spaceR = /\s+/g;
    var typeR = /^(error|warn|info|log)$/;

    function format(message, tag, type) {
        /// <signature helpKeyword="PluginUtilities.Utilities.formatLog">
        /// <summary locid="PluginUtilities.Utilities.formatLog">
        /// Adds tags and type to a logging message.
        /// </summary>
        /// <param name="message" type="String" locid="PluginUtilities.Utilities.startLog_p:message">The message to be formatted.</param>
        /// <param name="tag" type="String" locid="PluginUtilities.Utilities.startLog_p:tag">The tag(s) to be applied to the message. Multiple tags should be separated by spaces.</param>
        /// <param name="type" type="String" locid="PluginUtilities.Utilities.startLog_p:type">The type of the message.</param>
        /// <returns type="String" locid="PluginUtilities.Utilities.startLog_returnValue">The formatted message.</returns>
        /// </signature>
        var m = message;
        if (typeof (m) === "function") { m = m(); }

        return ((type && typeR.test(type)) ? ("") : (type ? (type + ": ") : "")) +
            (tag ? tag.replace(spaceR, ":") + ": " : "") +
            m;
    }
    function defAction(message, tag, type) {
        var m = PluginUtilities.Utilities.formatLog(message, tag, type);
        console[(type && typeR.test(type)) ? type : "log"](m);
    }
    function escape(s) {
        // \s (whitespace) is used as separator, so don't escape it
        return s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
    }
    PluginUtilities.Namespace.define("PluginUtilities.Utilities", {
        startLog: function (options) {
            /// <signature helpKeyword="PluginUtilities.Utilities.startLog">
            /// <summary locid="PluginUtilities.Utilities.startLog">
            /// Configures a logger that writes messages containing the specified tags from PluginUtilities.log to console.log.
            /// </summary>
            /// <param name="options" type="String" locid="PluginUtilities.Utilities.startLog_p:options">The tags for messages to log. Multiple tags should be separated by spaces.</param>
            /// </signature>
            /// <signature>
            /// <summary locid="PluginUtilities.Utilities.startLog2">
            /// Configure a logger to write PluginUtilities.log output.
            /// </summary>
            /// <param name="options" type="Object" locid="PluginUtilities.Utilities.startLog_p:options2">
            /// May contain .type, .tags, .excludeTags and .action properties.
            /// - .type is a required tag.
            /// - .excludeTags is a space-separated list of tags, any of which will result in a message not being logged.
            /// - .tags is a space-separated list of tags, any of which will result in a message being logged.
            /// - .action is a function that, if present, will be called with the log message, tags and type. The default is to log to the console.
            /// </param>
            /// </signature>
            options = options || {};
            if (typeof options === "string") {
                options = { tags: options };
            }
            var el = options.type && new RegExp("^(" + escape(options.type).replace(spaceR, " ").split(" ").join("|") + ")$");
            var not = options.excludeTags && new RegExp("(^|\\s)(" + escape(options.excludeTags).replace(spaceR, " ").split(" ").join("|") + ")(\\s|$)", "i");
            var has = options.tags && new RegExp("(^|\\s)(" + escape(options.tags).replace(spaceR, " ").split(" ").join("|") + ")(\\s|$)", "i");
            var action = options.action || defAction;

            if (!el && !not && !has && !PluginUtilities.log) {
                PluginUtilities.log = action;
                return;
            }

            var result = function (message, tag, type) {
                if (!((el && !el.test(type))          // if the expected log level is not satisfied
                    || (not && not.test(tag))         // if any of the excluded categories exist
                    || (has && !has.test(tag)))) {    // if at least one of the included categories doesn't exist
                    action(message, tag, type);
                }

                result.next && result.next(message, tag, type);
            };
            result.next = PluginUtilities.log;
            PluginUtilities.log = result;
        },
        stopLog: function () {
            /// <signature helpKeyword="PluginUtilities.Utilities.stopLog">
            /// <summary locid="PluginUtilities.Utilities.stopLog">
            /// Removes the previously set up logger.
            /// </summary>
            /// </signature>
            delete PluginUtilities.log;
        },
        formatLog: format
    });
})();

(function eventsInit(PluginUtilities, undefined) {
    "use strict";


    function createEventProperty(name) {
        var eventPropStateName = "_on" + name + "state";

        return {
            get: function () {
                var state = this[eventPropStateName];
                return state && state.userHandler;
            },
            set: function (handler) {
                var state = this[eventPropStateName];
                if (handler) {
                    if (!state) {
                        state = { wrapper: function (evt) { return state.userHandler(evt); }, userHandler: handler };
                        Object.defineProperty(this, eventPropStateName, { value: state, enumerable: false, writable: true, configurable: true });
                        this.addEventListener(name, state.wrapper, false);
                    }
                    state.userHandler = handler;
                } else if (state) {
                    this.removeEventListener(name, state.wrapper, false);
                    this[eventPropStateName] = null;
                }
            },
            enumerable: true
        }
    }

    function createEventProperties(events) {
        /// <signature helpKeyword="PluginUtilities.Utilities.createEventProperties">
        /// <summary locid="PluginUtilities.Utilities.createEventProperties">
        /// Creates an object that has one property for each name passed to the function.
        /// </summary>
        /// <param name="events" locid="PluginUtilities.Utilities.createEventProperties_p:events">
        /// A variable list of property names.
        /// </param>
        /// <returns locid="PluginUtilities.Utilities.createEventProperties_returnValue">
        /// The object with the specified properties. The names of the properties are prefixed with 'on'.
        /// </returns>
        /// </signature>
        var props = {};
        for (var i = 0, len = arguments.length; i < len; i++) {
            var name = arguments[i];
            props["on" + name] = createEventProperty(name);
        }
        return props;
    }

    var EventMixinEvent = PluginUtilities.Class.define(
        function EventMixinEvent_ctor(type, detail, target) {
            this.detail = detail;
            this.target = target;
            this.timeStamp = Date.now();
            this.type = type;
        },
        {
            bubbles: { value: false, writable: false },
            cancelable: { value: false, writable: false },
            currentTarget: {
                get: function () { return this.target; }
            },
            defaultPrevented: {
                get: function () { return this._preventDefaultCalled; }
            },
            trusted: { value: false, writable: false },
            eventPhase: { value: 0, writable: false },
            target: null,
            timeStamp: null,
            type: null,

            preventDefault: function () {
                this._preventDefaultCalled = true;
            },
            stopImmediatePropagation: function () {
                this._stopImmediatePropagationCalled = true;
            },
            stopPropagation: function () {
            }
        }, {
            supportedForProcessing: false,
        }
    );

    var eventMixin = {
        _listeners: null,

        addEventListener: function (type, listener, useCapture) {
            /// <signature helpKeyword="PluginUtilities.Utilities.eventMixin.addEventListener">
            /// <summary locid="PluginUtilities.Utilities.eventMixin.addEventListener">
            /// Adds an event listener to the control.
            /// </summary>
            /// <param name="type" locid="PluginUtilities.Utilities.eventMixin.addEventListener_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" locid="PluginUtilities.Utilities.eventMixin.addEventListener_p:listener">
            /// The listener to invoke when the event gets raised.
            /// </param>
            /// <param name="useCapture" locid="PluginUtilities.Utilities.eventMixin.addEventListener_p:useCapture">
            /// if true initiates capture, otherwise false.
            /// </param>
            /// </signature>
            useCapture = useCapture || false;
            this._listeners = this._listeners || {};
            var eventListeners = (this._listeners[type] = this._listeners[type] || []);
            for (var i = 0, len = eventListeners.length; i < len; i++) {
                var l = eventListeners[i];
                if (l.useCapture === useCapture && l.listener === listener) {
                    return;
                }
            }
            eventListeners.push({ listener: listener, useCapture: useCapture });
        },
        dispatchEvent: function (type, details) {
            /// <signature helpKeyword="PluginUtilities.Utilities.eventMixin.dispatchEvent">
            /// <summary locid="PluginUtilities.Utilities.eventMixin.dispatchEvent">
            /// Raises an event of the specified type and with the specified additional properties.
            /// </summary>
            /// <param name="type" locid="PluginUtilities.Utilities.eventMixin.dispatchEvent_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="details" locid="PluginUtilities.Utilities.eventMixin.dispatchEvent_p:details">
            /// The set of additional properties to be attached to the event object when the event is raised.
            /// </param>
            /// <returns type="Boolean" locid="PluginUtilities.Utilities.eventMixin.dispatchEvent_returnValue">
            /// true if preventDefault was called on the event.
            /// </returns>
            /// </signature>
            var listeners = this._listeners && this._listeners[type];
            if (listeners) {
                var eventValue = new EventMixinEvent(type, details, this);
                // Need to copy the array to protect against people unregistering while we are dispatching
                listeners = listeners.slice(0, listeners.length);
                for (var i = 0, len = listeners.length; i < len && !eventValue._stopImmediatePropagationCalled; i++) {
                    listeners[i].listener(eventValue);
                }
                return eventValue.defaultPrevented || false;
            }
            return false;
        },
        removeEventListener: function (type, listener, useCapture) {
            /// <signature helpKeyword="PluginUtilities.Utilities.eventMixin.removeEventListener">
            /// <summary locid="PluginUtilities.Utilities.eventMixin.removeEventListener">
            /// Removes an event listener from the control.
            /// </summary>
            /// <param name="type" locid="PluginUtilities.Utilities.eventMixin.removeEventListener_p:type">
            /// The type (name) of the event.
            /// </param>
            /// <param name="listener" locid="PluginUtilities.Utilities.eventMixin.removeEventListener_p:listener">
            /// The listener to remove.
            /// </param>
            /// <param name="useCapture" locid="PluginUtilities.Utilities.eventMixin.removeEventListener_p:useCapture">
            /// Specifies whether to initiate capture.
            /// </param>
            /// </signature>
            useCapture = useCapture || false;
            var listeners = this._listeners && this._listeners[type];
            if (listeners) {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    var l = listeners[i];
                    if (l.listener === listener && l.useCapture === useCapture) {
                        listeners.splice(i, 1);
                        if (listeners.length === 0) {
                            delete this._listeners[type];
                        }
                        // Only want to remove one element for each call to removeEventListener
                        break;
                    }
                }
            }
        }
    };

    PluginUtilities.Namespace.define("PluginUtilities.Utilities", {
        _createEventProperty: createEventProperty,
        createEventProperties: createEventProperties,
        eventMixin: eventMixin
    });

})(PluginUtilities);

(function promiseInit(global, undefined) {
    "use strict";

    global.Debug && (global.Debug.setNonUserCodeExceptions = true);

    var ListenerType = PluginUtilities.Class.mix(PluginUtilities.Class.define(null, { /*empty*/ }, { supportedForProcessing: false }), PluginUtilities.Utilities.eventMixin);
    var promiseEventListeners = new ListenerType();
    // make sure there is a listeners collection so that we can do a more trivial check below
    promiseEventListeners._listeners = {};
    var errorET = "error";
    var canceledName = "Canceled";
    var tagWithStack = false;
    var tag = {
        promise: 0x01,
        thenPromise: 0x02,
        errorPromise: 0x04,
        exceptionPromise: 0x08,
        completePromise: 0x10,
    };
    tag.all = tag.promise | tag.thenPromise | tag.errorPromise | tag.exceptionPromise | tag.completePromise;

    //
    // Global error counter, for each error which enters the system we increment this once and then
    // the error number travels with the error as it traverses the tree of potential handlers.
    //
    // When someone has registered to be told about errors (PluginUtilities.Promise.callonerror) promises
    // which are in error will get tagged with a ._errorId field. This tagged field is the
    // contract by which nested promises with errors will be identified as chaining for the
    // purposes of the callonerror semantics. If a nested promise in error is encountered without
    // a ._errorId it will be assumed to be foreign and treated as an interop boundary and
    // a new error id will be minted.
    //
    var error_number = 1;

    //
    // The state machine has a interesting hiccup in it with regards to notification, in order
    // to flatten out notification and avoid recursion for synchronous completion we have an
    // explicit set of *_notify states which are responsible for notifying their entire tree
    // of children. They can do this because they know that immediate children are always
    // ThenPromise instances and we can therefore reach into their state to access the
    // _listeners collection.
    //
    // So, what happens is that a Promise will be fulfilled through the _completed or _error
    // messages at which point it will enter a *_notify state and be responsible for to move
    // its children into an (as appropriate) success or error state and also notify that child's
    // listeners of the state transition, until leaf notes are reached.
    //

    var state_created,              // -> working
        state_working,              // -> error | error_notify | success | success_notify | canceled | waiting
        state_waiting,              // -> error | error_notify | success | success_notify | waiting_canceled
        state_waiting_canceled,     // -> error | error_notify | success | success_notify | canceling
        state_canceled,             // -> error | error_notify | success | success_notify | canceling
        state_canceling,            // -> error_notify
        state_success_notify,       // -> success
        state_success,              // -> .
        state_error_notify,         // -> error
        state_error;                // -> .

    // Noop function, used in the various states to indicate that they don't support a given
    // message. Named with the somewhat cute name '_' because it reads really well in the states.

    function _() { }

    // Initial state
    //
    state_created = {
        name: "created",
        enter: function (promise) {
            promise._setState(state_working);
        },
        cancel: _,
        done: _,
        then: _,
        _completed: _,
        _error: _,
        _notify: _,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Ready state, waiting for a message (completed/error/progress), able to be canceled
    //
    state_working = {
        name: "working",
        enter: _,
        cancel: function (promise) {
            promise._setState(state_canceled);
        },
        done: done,
        then: then,
        _completed: completed,
        _error: error,
        _notify: _,
        _progress: progress,
        _setCompleteValue: setCompleteValue,
        _setErrorValue: setErrorValue
    };

    // Waiting state, if a promise is completed with a value which is itself a promise
    // (has a then() method) it signs up to be informed when that child promise is
    // fulfilled at which point it will be fulfilled with that value.
    //
    state_waiting = {
        name: "waiting",
        enter: function (promise) {
            var waitedUpon = promise._value;
            var error = function (value) {
                if (waitedUpon._errorId) {
                    promise._chainedError(value, waitedUpon);
                } else {
                    // Because this is an interop boundary we want to indicate that this 
                    //  error has been handled by the promise infrastructure before we
                    //  begin a new handling chain.
                    //
                    callonerror(promise, value, detailsForHandledError, waitedUpon, error);
                    promise._error(value);
                }
            };
            error.handlesOnError = true;
            waitedUpon.then(
                promise._completed.bind(promise),
                error,
                promise._progress.bind(promise)
            );
        },
        cancel: function (promise) {
            promise._setState(state_waiting_canceled);
        },
        done: done,
        then: then,
        _completed: completed,
        _error: error,
        _notify: _,
        _progress: progress,
        _setCompleteValue: setCompleteValue,
        _setErrorValue: setErrorValue
    };

    // Waiting canceled state, when a promise has been in a waiting state and receives a
    // request to cancel its pending work it will forward that request to the child promise
    // and then waits to be informed of the result. This promise moves itself into the
    // canceling state but understands that the child promise may instead push it to a
    // different state.
    //
    state_waiting_canceled = {
        name: "waiting_canceled",
        enter: function (promise) {
            // Initiate a transition to canceling. Triggering a cancel on the promise
            // that we are waiting upon may result in a different state transition
            // before the state machine pump runs again.
            promise._setState(state_canceling);
            var waitedUpon = promise._value;
            if (waitedUpon.cancel) {
                waitedUpon.cancel();
            }
        },
        cancel: _,
        done: done,
        then: then,
        _completed: completed,
        _error: error,
        _notify: _,
        _progress: progress,
        _setCompleteValue: setCompleteValue,
        _setErrorValue: setErrorValue
    };

    // Canceled state, moves to the canceling state and then tells the promise to do
    // whatever it might need to do on cancelation.
    //
    state_canceled = {
        name: "canceled",
        enter: function (promise) {
            // Initiate a transition to canceling. The _cancelAction may change the state
            // before the state machine pump runs again.
            promise._setState(state_canceling);
            promise._cancelAction();
        },
        cancel: _,
        done: done,
        then: then,
        _completed: completed,
        _error: error,
        _notify: _,
        _progress: progress,
        _setCompleteValue: setCompleteValue,
        _setErrorValue: setErrorValue
    };

    // Canceling state, commits to the promise moving to an error state with an error
    // object whose 'name' and 'message' properties contain the string "Canceled"
    //
    state_canceling = {
        name: "canceling",
        enter: function (promise) {
            var error = new Error(canceledName);
            error.name = error.message;
            promise._value = error;
            promise._setState(state_error_notify);
        },
        cancel: _,
        done: _,
        then: _,
        _completed: _,
        _error: _,
        _notify: _,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Success notify state, moves a promise to the success state and notifies all children
    //
    state_success_notify = {
        name: "complete_notify",
        enter: function (promise) {
            promise.done = CompletePromise.prototype.done;
            promise.then = CompletePromise.prototype.then;
            if (promise._listeners) {
                var queue = [promise];
                var p;
                while (queue.length) {
                    p = queue.pop();
                    p._state._notify(p, queue);
                }
            }
            promise._setState(state_success);
        },
        cancel: _,
        done: null, /*error to get here */
        then: null, /*error to get here */
        _completed: _,
        _error: _,
        _notify: notifySuccess,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Success state, moves a promise to the success state and does NOT notify any children.
    // Some upstream promise is owning the notification pass.
    //
    state_success = {
        name: "success",
        enter: function (promise) {
            promise.done = CompletePromise.prototype.done;
            promise.then = CompletePromise.prototype.then;
            promise._cleanupAction();
        },
        cancel: _,
        done: null, /*error to get here */
        then: null, /*error to get here */
        _completed: _,
        _error: _,
        _notify: notifySuccess,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Error notify state, moves a promise to the error state and notifies all children
    //
    state_error_notify = {
        name: "error_notify",
        enter: function (promise) {
            promise.done = ErrorPromise.prototype.done;
            promise.then = ErrorPromise.prototype.then;
            if (promise._listeners) {
                var queue = [promise];
                var p;
                while (queue.length) {
                    p = queue.pop();
                    p._state._notify(p, queue);
                }
            }
            promise._setState(state_error);
        },
        cancel: _,
        done: null, /*error to get here*/
        then: null, /*error to get here*/
        _completed: _,
        _error: _,
        _notify: notifyError,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    // Error state, moves a promise to the error state and does NOT notify any children.
    // Some upstream promise is owning the notification pass.
    //
    state_error = {
        name: "error",
        enter: function (promise) {
            promise.done = ErrorPromise.prototype.done;
            promise.then = ErrorPromise.prototype.then;
            promise._cleanupAction();
        },
        cancel: _,
        done: null, /*error to get here*/
        then: null, /*error to get here*/
        _completed: _,
        _error: _,
        _notify: notifyError,
        _progress: _,
        _setCompleteValue: _,
        _setErrorValue: _
    };

    //
    // The statemachine implementation follows a very particular pattern, the states are specified
    // as static stateless bags of functions which are then indirected through the state machine
    // instance (a Promise). As such all of the functions on each state have the promise instance
    // passed to them explicitly as a parameter and the Promise instance members do a little
    // dance where they indirect through the state and insert themselves in the argument list.
    //
    // We could instead call directly through the promise states however then every caller
    // would have to remember to do things like pumping the state machine to catch state transitions.
    //

    var PromiseStateMachine = PluginUtilities.Class.define(null, {
        _listeners: null,
        _nextState: null,
        _state: null,
        _value: null,

        cancel: function () {
            /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.cancel">
            /// <summary locid="PluginUtilities.PromiseStateMachine.cancel">
            /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
            /// already been fulfilled and cancellation is supported, the promise enters
            /// the error state with a value of Error("Canceled").
            /// </summary>
            /// </signature>
            this._state.cancel(this);
            this._run();
        },
        done: function Promise_done(onComplete, onError, onProgress) {
            /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.done">
            /// <summary locid="PluginUtilities.PromiseStateMachine.done">
            /// Allows you to specify the work to be done on the fulfillment of the promised value,
            /// the error handling to be performed if the promise fails to fulfill
            /// a value, and the handling of progress notifications along the way.
            /// 
            /// After the handlers have finished executing, this function throws any error that would have been returned
            /// from then() as a promise in the error state.
            /// </summary>
            /// <param name="onComplete" type="Function" locid="PluginUtilities.PromiseStateMachine.done_p:onComplete">
            /// The function to be called if the promise is fulfilled successfully with a value.
            /// The fulfilled value is passed as the single argument. If the value is null,
            /// the fulfilled value is returned. The value returned
            /// from the function becomes the fulfilled value of the promise returned by
            /// then(). If an exception is thrown while executing the function, the promise returned
            /// by then() moves into the error state.
            /// </param>
            /// <param name="onError" type="Function" optional="true" locid="PluginUtilities.PromiseStateMachine.done_p:onError">
            /// The function to be called if the promise is fulfilled with an error. The error
            /// is passed as the single argument. If it is null, the error is forwarded.
            /// The value returned from the function is the fulfilled value of the promise returned by then().
            /// </param>
            /// <param name="onProgress" type="Function" optional="true" locid="PluginUtilities.PromiseStateMachine.done_p:onProgress">
            /// the function to be called if the promise reports progress. Data about the progress
            /// is passed as the single argument. Promises are not required to support
            /// progress.
            /// </param>
            /// </signature>
            this._state.done(this, onComplete, onError, onProgress);
        },
        then: function Promise_then(onComplete, onError, onProgress) {
            /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.then">
            /// <summary locid="PluginUtilities.PromiseStateMachine.then">
            /// Allows you to specify the work to be done on the fulfillment of the promised value,
            /// the error handling to be performed if the promise fails to fulfill
            /// a value, and the handling of progress notifications along the way.
            /// </summary>
            /// <param name="onComplete" type="Function" locid="PluginUtilities.PromiseStateMachine.then_p:onComplete">
            /// The function to be called if the promise is fulfilled successfully with a value.
            /// The value is passed as the single argument. If the value is null, the value is returned.
            /// The value returned from the function becomes the fulfilled value of the promise returned by
            /// then(). If an exception is thrown while this function is being executed, the promise returned
            /// by then() moves into the error state.
            /// </param>
            /// <param name="onError" type="Function" optional="true" locid="PluginUtilities.PromiseStateMachine.then_p:onError">
            /// The function to be called if the promise is fulfilled with an error. The error
            /// is passed as the single argument. If it is null, the error is forwarded.
            /// The value returned from the function becomes the fulfilled value of the promise returned by then().
            /// </param>
            /// <param name="onProgress" type="Function" optional="true" locid="PluginUtilities.PromiseStateMachine.then_p:onProgress">
            /// The function to be called if the promise reports progress. Data about the progress
            /// is passed as the single argument. Promises are not required to support
            /// progress.
            /// </param>
            /// <returns locid="PluginUtilities.PromiseStateMachine.then_returnValue">
            /// The promise whose value is the result of executing the complete or
            /// error function.
            /// </returns>
            /// </signature>
            return this._state.then(this, onComplete, onError, onProgress);
        },

        _chainedError: function (value, context) {
            var result = this._state._error(this, value, detailsForChainedError, context);
            this._run();
            return result;
        },
        _completed: function (value) {
            var result = this._state._completed(this, value);
            this._run();
            return result;
        },
        _error: function (value) {
            var result = this._state._error(this, value, detailsForError);
            this._run();
            return result;
        },
        _progress: function (value) {
            this._state._progress(this, value);
        },
        _setState: function (state) {
            this._nextState = state;
        },
        _setCompleteValue: function (value) {
            this._state._setCompleteValue(this, value);
            this._run();
        },
        _setChainedErrorValue: function (value, context) {
            var result = this._state._setErrorValue(this, value, detailsForChainedError, context);
            this._run();
            return result;
        },
        _setExceptionValue: function (value) {
            var result = this._state._setErrorValue(this, value, detailsForException);
            this._run();
            return result;
        },
        _run: function () {
            while (this._nextState) {
                this._state = this._nextState;
                this._nextState = null;
                this._state.enter(this);
            }
        }
    }, {
        supportedForProcessing: false
    });

    //
    // Implementations of shared state machine code.
    //

    function completed(promise, value) {
        var targetState;
        if (value && typeof value === "object" && typeof value.then === "function") {
            targetState = state_waiting;
        } else {
            targetState = state_success_notify;
        }
        promise._value = value;
        promise._setState(targetState);
    }
    function createErrorDetails(exception, error, promise, id, parent, handler) {
        return {
            exception: exception,
            error: error,
            promise: promise,
            handler: handler,
            id: id,
            parent: parent
        };
    }
    function detailsForHandledError(promise, errorValue, context, handler) {
        var exception = context._isException;
        var errorId = context._errorId;
        return createErrorDetails(
            exception ? errorValue : null,
            exception ? null : errorValue,
            promise,
            errorId,
            context,
            handler
        );
    }
    function detailsForChainedError(promise, errorValue, context) {
        var exception = context._isException;
        var errorId = context._errorId;
        setErrorInfo(promise, errorId, exception);
        return createErrorDetails(
            exception ? errorValue : null,
            exception ? null : errorValue,
            promise,
            errorId,
            context
        );
    }
    function detailsForError(promise, errorValue) {
        var errorId = ++error_number;
        setErrorInfo(promise, errorId);
        return createErrorDetails(
            null,
            errorValue,
            promise,
            errorId
        );
    }
    function detailsForException(promise, exceptionValue) {
        var errorId = ++error_number;
        setErrorInfo(promise, errorId, true);
        return createErrorDetails(
            exceptionValue,
            null,
            promise,
            errorId
        );
    }
    function done(promise, onComplete, onError, onProgress) {
        pushListener(promise, { c: onComplete, e: onError, p: onProgress });
    }
    function error(promise, value, onerrorDetails, context) {
        promise._value = value;
        callonerror(promise, value, onerrorDetails, context);
        promise._setState(state_error_notify);
    }
    function notifySuccess(promise, queue) {
        var value = promise._value;
        var listeners = promise._listeners;
        if (!listeners) {
            return;
        }
        promise._listeners = null;
        var i, len;
        for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
            var listener = len === 1 ? listeners : listeners[i];
            var onComplete = listener.c;
            var target = listener.promise;
            if (target) {
                try {
                    target._setCompleteValue(onComplete ? onComplete(value) : value);
                } catch (ex) {
                    target._setExceptionValue(ex);
                }
                if (target._state !== state_waiting && target._listeners) {
                    queue.push(target);
                }
            } else {
                CompletePromise.prototype.done.call(promise, onComplete);
            }
        }
    }
    function notifyError(promise, queue) {
        var value = promise._value;
        var listeners = promise._listeners;
        if (!listeners) {
            return;
        }
        promise._listeners = null;
        var i, len;
        for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
            var listener = len === 1 ? listeners : listeners[i];
            var onError = listener.e;
            var target = listener.promise;
            if (target) {
                try {
                    if (onError) {
                        if (!onError.handlesOnError) {
                            callonerror(target, value, detailsForHandledError, promise, onError);
                        }
                        target._setCompleteValue(onError(value))
                    } else {
                        target._setChainedErrorValue(value, promise);
                    }
                } catch (ex) {
                    target._setExceptionValue(ex);
                }
                if (target._state !== state_waiting && target._listeners) {
                    queue.push(target);
                }
            } else {
                ErrorPromise.prototype.done.call(promise, null, onError);
            }
        }
    }
    function callonerror(promise, value, onerrorDetailsGenerator, context, handler) {
        if (promiseEventListeners._listeners[errorET]) {
            if (value instanceof Error && value.message === canceledName) {
                return;
            }
            promiseEventListeners.dispatchEvent(errorET, onerrorDetailsGenerator(promise, value, context, handler));
        }
    }
    function progress(promise, value) {
        var listeners = promise._listeners;
        if (listeners) {
            var i, len;
            for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
                var listener = len === 1 ? listeners : listeners[i];
                var onProgress = listener.p;
                if (onProgress) {
                    try { onProgress(value); } catch (ex) { }
                }
                if (!(listener.c || listener.e) && listener.promise) {
                    listener.promise._progress(value);
                }
            }
        }
    }
    function pushListener(promise, listener) {
        var listeners = promise._listeners;
        if (listeners) {
            // We may have either a single listener (which will never be wrapped in an array)
            // or 2+ listeners (which will be wrapped). Since we are now adding one more listener
            // we may have to wrap the single listener before adding the second.
            listeners = Array.isArray(listeners) ? listeners : [listeners];
            listeners.push(listener);
        } else {
            listeners = listener;
        }
        promise._listeners = listeners;
    }
    // The difference beween setCompleteValue()/setErrorValue() and complete()/error() is that setXXXValue() moves
    // a promise directly to the success/error state without starting another notification pass (because one
    // is already ongoing).
    function setErrorInfo(promise, errorId, isException) {
        promise._isException = isException || false;
        promise._errorId = errorId;
    }
    function setErrorValue(promise, value, onerrorDetails, context) {
        promise._value = value;
        callonerror(promise, value, onerrorDetails, context);
        promise._setState(state_error);
    }
    function setCompleteValue(promise, value) {
        var targetState;
        if (value && typeof value === "object" && typeof value.then === "function") {
            targetState = state_waiting;
        } else {
            targetState = state_success;
        }
        promise._value = value;
        promise._setState(targetState);
    }
    function then(promise, onComplete, onError, onProgress) {
        var result = new ThenPromise(promise);
        pushListener(promise, { promise: result, c: onComplete, e: onError, p: onProgress });
        return result;
    }

    //
    // Internal implementation detail promise, ThenPromise is created when a promise needs
    // to be returned from a then() method.
    //
    var ThenPromise = PluginUtilities.Class.derive(PromiseStateMachine,
        function (creator) {

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.thenPromise))) {
                this._stack = PluginUtilities.Promise._getStack();
            }

            this._creator = creator;
            this._setState(state_created);
            this._run();
        }, {
            _creator: null,

            _cancelAction: function () { if (this._creator) { this._creator.cancel(); } },
            _cleanupAction: function () { this._creator = null; }
        }, {
            supportedForProcessing: false
        }
    );

    //
    // Slim promise implementations for already completed promises, these are created
    // under the hood on synchronous completion paths as well as by PluginUtilities.Promise.wrap
    // and PluginUtilities.Promise.wrapError.
    //

    var ErrorPromise = PluginUtilities.Class.define(
        function ErrorPromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.errorPromise))) {
                this._stack = PluginUtilities.Promise._getStack();
            }

            this._value = value;
            callonerror(this, value, detailsForError);
        }, {
            cancel: function () {
                /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.cancel">
                /// <summary locid="PluginUtilities.PromiseStateMachine.cancel">
                /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
                /// already been fulfilled and cancellation is supported, the promise enters
                /// the error state with a value of Error("Canceled").
                /// </summary>
                /// </signature>
            },
            done: function ErrorPromise_done(unused, onError) {
                /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.done">
                /// <summary locid="PluginUtilities.PromiseStateMachine.done">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                ///
                /// After the handlers have finished executing, this function throws any error that would have been returned
                /// from then() as a promise in the error state.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="PluginUtilities.PromiseStateMachine.done_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The fulfilled value is passed as the single argument. If the value is null,
                /// the fulfilled value is returned. The value returned
                /// from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while executing the function, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="PluginUtilities.PromiseStateMachine.done_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function is the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="PluginUtilities.PromiseStateMachine.done_p:onProgress">
                /// the function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// </signature>
                var value = this._value;
                if (onError) {
                    try {
                        if (!onError.handlesOnError) {
                            callonerror(null, value, detailsForHandledError, this, onError);
                        }
                        var result = onError(value);
                        if (result && typeof result === "object" && typeof result.done === "function") {
                            // If a promise is returned we need to wait on it.
                            result.done();
                        }
                        return;
                    } catch (ex) {
                        value = ex;
                    }
                }
                if (value instanceof Error && value.message === canceledName) {
                    // suppress cancel
                    return;
                }
                // force the exception to be thrown asyncronously to avoid any try/catch blocks
                //
                msSetImmediate(function () {
                    throw value;
                });
            },
            then: function ErrorPromise_then(unused, onError) {
                /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.then">
                /// <summary locid="PluginUtilities.PromiseStateMachine.then">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="PluginUtilities.PromiseStateMachine.then_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The value is passed as the single argument. If the value is null, the value is returned.
                /// The value returned from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while this function is being executed, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="PluginUtilities.PromiseStateMachine.then_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function becomes the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="PluginUtilities.PromiseStateMachine.then_p:onProgress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns locid="PluginUtilities.PromiseStateMachine.then_returnValue">
                /// The promise whose value is the result of executing the complete or
                /// error function.
                /// </returns>
                /// </signature>

                // If the promise is already in a error state and no error handler is provided
                // we optimize by simply returning the promise instead of creating a new one.
                //
                if (!onError) { return this; }
                var result;
                var value = this._value;
                try {
                    if (!onError.handlesOnError) {
                        callonerror(null, value, detailsForHandledError, this, onError);
                    }
                    result = new CompletePromise(onError(value));
                } catch (ex) {
                    // If the value throw from the error handler is the same as the value
                    // provided to the error handler then there is no need for a new promise.
                    //
                    if (ex === value) {
                        result = this;
                    } else {
                        result = new ExceptionPromise(ex);
                    }
                }
                return result;
            }
        }, {
            supportedForProcessing: false
        }
    );

    var ExceptionPromise = PluginUtilities.Class.derive(ErrorPromise,
        function ExceptionPromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.exceptionPromise))) {
                this._stack = PluginUtilities.Promise._getStack();
            }

            this._value = value;
            callonerror(this, value, detailsForException);
        }, {
            /* empty */
        }, {
            supportedForProcessing: false
        }
    );

    var CompletePromise = PluginUtilities.Class.define(
        function CompletePromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.completePromise))) {
                this._stack = PluginUtilities.Promise._getStack();
            }

            if (value && typeof value === "object" && typeof value.then === "function") {
                var result = new ThenPromise(null);
                result._setCompleteValue(value);
                return result;
            }
            this._value = value;
        }, {
            cancel: function () {
                /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.cancel">
                /// <summary locid="PluginUtilities.PromiseStateMachine.cancel">
                /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
                /// already been fulfilled and cancellation is supported, the promise enters
                /// the error state with a value of Error("Canceled").
                /// </summary>
                /// </signature>
            },
            done: function CompletePromise_done(onComplete) {
                /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.done">
                /// <summary locid="PluginUtilities.PromiseStateMachine.done">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                ///
                /// After the handlers have finished executing, this function throws any error that would have been returned
                /// from then() as a promise in the error state.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="PluginUtilities.PromiseStateMachine.done_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The fulfilled value is passed as the single argument. If the value is null,
                /// the fulfilled value is returned. The value returned
                /// from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while executing the function, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="PluginUtilities.PromiseStateMachine.done_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function is the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="PluginUtilities.PromiseStateMachine.done_p:onProgress">
                /// the function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// </signature>
                if (!onComplete) { return; }
                try {
                    var result = onComplete(this._value);
                    if (result && typeof result === "object" && typeof result.done === "function") {
                        result.done();
                    }
                } catch (ex) {
                    // force the exception to be thrown asynchronously to avoid any try/catch blocks
                    msSetImmediate(function () {
                        throw ex;
                    });
                }
            },
            then: function CompletePromise_then(onComplete) {
                /// <signature helpKeyword="PluginUtilities.PromiseStateMachine.then">
                /// <summary locid="PluginUtilities.PromiseStateMachine.then">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="PluginUtilities.PromiseStateMachine.then_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The value is passed as the single argument. If the value is null, the value is returned.
                /// The value returned from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while this function is being executed, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="PluginUtilities.PromiseStateMachine.then_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function becomes the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="PluginUtilities.PromiseStateMachine.then_p:onProgress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns locid="PluginUtilities.PromiseStateMachine.then_returnValue">
                /// The promise whose value is the result of executing the complete or
                /// error function.
                /// </returns>
                /// </signature>
                try {
                    // If the value returned from the completion handler is the same as the value
                    // provided to the completion handler then there is no need for a new promise.
                    //
                    var newValue = onComplete ? onComplete(this._value) : this._value;
                    return newValue === this._value ? this : new CompletePromise(newValue);
                } catch (ex) {
                    return new ExceptionPromise(ex);
                }
            }
        }, {
            supportedForProcessing: false
        }
    );

    //
    // Promise is the user-creatable PluginUtilities.Promise object.
    //

    function timeout(timeoutMS) {
        var id;
        return new PluginUtilities.Promise(
            function (c) {
                if (timeoutMS) {
                    id = setTimeout(c, timeoutMS);
                } else {
                    msSetImmediate(c);
                }
            },
            function () {
                if (id) {
                    clearTimeout(id);
                }
            }
        );
    }

    function timeoutWithPromise(timeout, promise) {
        var cancelPromise = function () { promise.cancel(); }
        var cancelTimeout = function () { timeout.cancel(); }
        timeout.then(cancelPromise);
        promise.then(cancelTimeout, cancelTimeout);
        return promise;
    }

    var staticCanceledPromise;

    var Promise = PluginUtilities.Class.derive(PromiseStateMachine,
        function Promise_ctor(init, oncancel) {
            /// <signature helpKeyword="PluginUtilities.Promise">
            /// <summary locid="PluginUtilities.Promise">
            /// A promise provides a mechanism to schedule work to be done on a value that
            /// has not yet been computed. It is a convenient abstraction for managing
            /// interactions with asynchronous APIs.
            /// </summary>
            /// <param name="init" type="Function" locid="PluginUtilities.Promise_p:init">
            /// The function that is called during construction of the  promise. The function
            /// is given three arguments (complete, error, progress). Inside this function
            /// you should add event listeners for the notifications supported by this value.
            /// </param>
            /// <param name="oncancel" optional="true" locid="PluginUtilities.Promise_p:oncancel">
            /// The function to call if a consumer of this promise wants
            /// to cancel its undone work. Promises are not required to
            /// support cancellation.
            /// </param>
            /// </signature>

            if (tagWithStack && (tagWithStack === true || (tagWithStack & tag.promise))) {
                this._stack = PluginUtilities.Promise._getStack();
            }

            this._oncancel = oncancel;
            this._setState(state_created);
            this._run();

            try {
                var complete = this._completed.bind(this);
                var error = this._error.bind(this);
                var progress = this._progress.bind(this);
                init(complete, error, progress);
            } catch (ex) {
                this._setExceptionValue(ex);
            }
        }, {
            _oncancel: null,

            _cancelAction: function () {
                if (this._oncancel) {
                    try { this._oncancel(); } catch (ex) { }
                }
            },
            _cleanupAction: function () { this._oncancel = null; }
        }, {

            addEventListener: function Promise_addEventListener(eventType, listener, capture) {
                /// <signature helpKeyword="PluginUtilities.Promise.addEventListener">
                /// <summary locid="PluginUtilities.Promise.addEventListener">
                /// Adds an event listener to the control.
                /// </summary>
                /// <param name="eventType" locid="PluginUtilities.Promise.addEventListener_p:eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name="listener" locid="PluginUtilities.Promise.addEventListener_p:listener">
                /// The listener to invoke when the event is raised.
                /// </param>
                /// <param name="capture" locid="PluginUtilities.Promise.addEventListener_p:capture">
                /// Specifies whether or not to initiate capture.
                /// </param>
                /// </signature>
                promiseEventListeners.addEventListener(eventType, listener, capture);
            },
            any: function Promise_any(values) {
                /// <signature helpKeyword="PluginUtilities.Promise.any">
                /// <summary locid="PluginUtilities.Promise.any">
                /// Returns a promise that is fulfilled when one of the input promises
                /// has been fulfilled.
                /// </summary>
                /// <param name="values" type="Array" locid="PluginUtilities.Promise.any_p:values">
                /// An array that contains promise objects or objects whose property
                /// values include promise objects.
                /// </param>
                /// <returns locid="PluginUtilities.Promise.any_returnValue">
                /// A promise that on fulfillment yields the value of the input (complete or error).
                /// </returns>
                /// </signature>
                return new Promise(
                    function (complete, error, progress) {
                        var keys = Object.keys(values);
                        var errors = Array.isArray(values) ? [] : {};
                        if (keys.length === 0) {
                            complete();
                        }
                        var canceled = 0;
                        keys.forEach(function (key) {
                            Promise.as(values[key]).then(
                                function () { complete({ key: key, value: values[key] }); },
                                function (e) {
                                    if (e instanceof Error && e.name === canceledName) {
                                        if ((++canceled) === keys.length) {
                                            complete(PluginUtilities.Promise.cancel);
                                        }
                                        return;
                                    }
                                    error({ key: key, value: values[key] });
                                }
                            );
                        });
                    },
                    function () {
                        var keys = Object.keys(values);
                        keys.forEach(function (key) {
                            var promise = Promise.as(values[key]);
                            if (typeof promise.cancel === "function") {
                                promise.cancel();
                            }
                        });
                    }
                );
            },
            as: function Promise_as(value) {
                /// <signature helpKeyword="PluginUtilities.Promise.as">
                /// <summary locid="PluginUtilities.Promise.as">
                /// Returns a promise. If the object is already a promise it is returned;
                /// otherwise the object is wrapped in a promise.
                /// </summary>
                /// <param name="value" locid="PluginUtilities.Promise.as_p:value">
                /// The value to be treated as a promise.
                /// </param>
                /// <returns locid="PluginUtilities.Promise.as_returnValue">
                /// A promise.
                /// </returns>
                /// </signature>
                if (value && typeof value === "object" && typeof value.then === "function") {
                    return value;
                }
                return new CompletePromise(value);
            },
            /// <field type="PluginUtilities.Promise" helpKeyword="PluginUtilities.Promise.cancel" locid="PluginUtilities.Promise.cancel">
            /// Canceled promise value, can be returned from a promise completion handler
            /// to indicate cancelation of the promise chain.
            /// </field>
            cancel: {
                get: function () {
                    return (staticCanceledPromise = staticCanceledPromise || new ErrorPromise(new PluginUtilities.ErrorFromName(canceledName)));
                }
            },
            dispatchEvent: function Promise_dispatchEvent(eventType, details) {
                /// <signature helpKeyword="PluginUtilities.Promise.dispatchEvent">
                /// <summary locid="PluginUtilities.Promise.dispatchEvent">
                /// Raises an event of the specified type and properties.
                /// </summary>
                /// <param name="eventType" locid="PluginUtilities.Promise.dispatchEvent_p:eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name="details" locid="PluginUtilities.Promise.dispatchEvent_p:details">
                /// The set of additional properties to be attached to the event object.
                /// </param>
                /// <returns type="Boolean" locid="PluginUtilities.Promise.dispatchEvent_returnValue">
                /// Specifies whether preventDefault was called on the event.
                /// </returns>
                /// </signature>
                return promiseEventListeners.dispatchEvent(eventType, details);
            },
            is: function Promise_is(value) {
                /// <signature helpKeyword="PluginUtilities.Promise.is">
                /// <summary locid="PluginUtilities.Promise.is">
                /// Determines whether a value fulfills the promise contract.
                /// </summary>
                /// <param name="value" locid="PluginUtilities.Promise.is_p:value">
                /// A value that may be a promise.
                /// </param>
                /// <returns type="Boolean" locid="PluginUtilities.Promise.is_returnValue">
                /// true if the specified value is a promise, otherwise false.
                /// </returns>
                /// </signature>
                return value && typeof value === "object" && typeof value.then === "function";
            },
            join: function Promise_join(values) {
                /// <signature helpKeyword="PluginUtilities.Promise.join">
                /// <summary locid="PluginUtilities.Promise.join">
                /// Creates a promise that is fulfilled when all the values are fulfilled.
                /// </summary>
                /// <param name="values" type="Object" locid="PluginUtilities.Promise.join_p:values">
                /// An object whose fields contain values, some of which may be promises.
                /// </param>
                /// <returns locid="PluginUtilities.Promise.join_returnValue">
                /// A promise whose value is an object with the same field names as those of the object in the values parameter, where
                /// each field value is the fulfilled value of a promise.
                /// </returns>
                /// </signature>
                return new Promise(
                    function (complete, error, progress) {
                        var keys = Object.keys(values);
                        var errors = Array.isArray(values) ? [] : {};
                        var results = Array.isArray(values) ? [] : {};
                        var undefineds = 0;
                        var pending = keys.length;
                        var argDone = function (key) {
                            if ((--pending) === 0) {
                                var errorCount = Object.keys(errors).length;
                                if (errorCount === 0) {
                                    complete(results);
                                } else {
                                    var canceledCount = 0;
                                    keys.forEach(function (key) {
                                        var e = errors[key];
                                        if (e instanceof Error && e.name === canceledName) {
                                            canceledCount++;
                                        }
                                    });
                                    if (canceledCount === errorCount) {
                                        complete(PluginUtilities.Promise.cancel);
                                    } else {
                                        error(errors);
                                    }
                                }
                            } else {
                                progress({ Key: key, Done: true });
                            }
                        };
                        keys.forEach(function (key) {
                            var value = values[key];
                            if (value === undefined) {
                                undefineds++;
                            } else {
                                Promise.then(value,
                                    function (value) { results[key] = value; argDone(key); },
                                    function (value) { errors[key] = value; argDone(key); }
                                );
                            }
                        });
                        pending -= undefineds;
                        if (pending === 0) {
                            complete(results);
                            return;
                        }
                    },
                    function () {
                        Object.keys(values).forEach(function (key) {
                            var promise = Promise.as(values[key]);
                            if (typeof promise.cancel === "function") {
                                promise.cancel();
                            }
                        });
                    }
                );
            },
            removeEventListener: function Promise_removeEventListener(eventType, listener, capture) {
                /// <signature helpKeyword="PluginUtilities.Promise.removeEventListener">
                /// <summary locid="PluginUtilities.Promise.removeEventListener">
                /// Removes an event listener from the control.
                /// </summary>
                /// <param name='eventType' locid="PluginUtilities.Promise.removeEventListener_eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name='listener' locid="PluginUtilities.Promise.removeEventListener_listener">
                /// The listener to remove.
                /// </param>
                /// <param name='capture' locid="PluginUtilities.Promise.removeEventListener_capture">
                /// Specifies whether or not to initiate capture.
                /// </param>
                /// </signature>
                promiseEventListeners.removeEventListener(eventType, listener, capture);
            },
            supportedForProcessing: false,
            then: function Promise_then(value, onComplete, onError, onProgress) {
                /// <signature helpKeyword="PluginUtilities.Promise.then">
                /// <summary locid="PluginUtilities.Promise.then">
                /// A static version of the promise instance method then().
                /// </summary>
                /// <param name="value" locid="PluginUtilities.Promise.then_p:value">
                /// the value to be treated as a promise.
                /// </param>
                /// <param name="onComplete" type="Function" locid="PluginUtilities.Promise.then_p:complete">
                /// The function to be called if the promise is fulfilled with a value.
                /// If it is null, the promise simply
                /// returns the value. The value is passed as the single argument.
                /// </param>
                /// <param name="onError" type="Function" optional="true" locid="PluginUtilities.Promise.then_p:error">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument.
                /// </param>
                /// <param name="onProgress" type="Function" optional="true" locid="PluginUtilities.Promise.then_p:progress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns locid="PluginUtilities.Promise.then_returnValue">
                /// A promise whose value is the result of executing the provided complete function.
                /// </returns>
                /// </signature>
                return Promise.as(value).then(onComplete, onError, onProgress);
            },
            thenEach: function Promise_thenEach(values, onComplete, onError, onProgress) {
                /// <signature helpKeyword="PluginUtilities.Promise.thenEach">
                /// <summary locid="PluginUtilities.Promise.thenEach">
                /// Performs an operation on all the input promises and returns a promise
                /// that has the shape of the input and contains the result of the operation
                /// that has been performed on each input.
                /// </summary>
                /// <param name="values" locid="PluginUtilities.Promise.thenEach_p:values">
                /// A set of values (which could be either an array or an object) of which some or all are promises.
                /// </param>
                /// <param name="onComplete" type="Function" locid="PluginUtilities.Promise.thenEach_p:complete">
                /// The function to be called if the promise is fulfilled with a value.
                /// If the value is null, the promise returns the value.
                /// The value is passed as the single argument.
                /// </param>
                /// <param name="onError" type="Function" optional="true" locid="PluginUtilities.Promise.thenEach_p:error">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument.
                /// </param>
                /// <param name="onProgress" type="Function" optional="true" locid="PluginUtilities.Promise.thenEach_p:progress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns locid="PluginUtilities.Promise.thenEach_returnValue">
                /// A promise that is the result of calling Promise.join on the values parameter.
                /// </returns>
                /// </signature>
                var result = Array.isArray(values) ? [] : {};
                Object.keys(values).forEach(function (key) {
                    result[key] = Promise.as(values[key]).then(onComplete, onError, onProgress);
                });
                return Promise.join(result);
            },
            timeout: function Promise_timeout(time, promise) {
                /// <signature helpKeyword="PluginUtilities.Promise.timeout">
                /// <summary locid="PluginUtilities.Promise.timeout">
                /// Creates a promise that is fulfilled after a timeout.
                /// </summary>
                /// <param name="timeout" type="Number" optional="true" locid="PluginUtilities.Promise.timeout_p:timeout">
                /// The timeout period in milliseconds. If this value is zero or not specified
                /// msSetImmediate is called, otherwise setTimeout is called.
                /// </param>
                /// <param name="promise" type="Promise" optional="true" locid="PluginUtilities.Promise.timeout_p:promise">
                /// A promise that will be canceled if it doesn't complete before the
                /// timeout has expired.
                /// </param>
                /// <returns type="PluginUtilities.Promise" locid="PluginUtilities.Promise.timeout_returnValue">
                /// A promise that is completed asynchronously after the specified timeout.
                /// </returns>
                /// </signature>
                var to = timeout(time);
                return promise ? timeoutWithPromise(to, promise) : to;
            },
            wrap: function Promise_wrap(value) {
                /// <signature helpKeyword="PluginUtilities.Promise.wrap">
                /// <summary locid="PluginUtilities.Promise.wrap">
                /// Wraps a non-promise value in a promise. You can use this function if you need
                /// to pass a value to a function that requires a promise.
                /// </summary>
                /// <param name="value" locid="PluginUtilities.Promise.wrap_p:value">
                /// Some non-promise value to be wrapped in a promise.
                /// </param>
                /// <returns type="PluginUtilities.Promise" locid="PluginUtilities.Promise.wrap_returnValue">
                /// A promise that is successfully fulfilled with the specified value
                /// </returns>
                /// </signature>
                return new CompletePromise(value);
            },
            wrapError: function Promise_wrapError(error) {
                /// <signature helpKeyword="PluginUtilities.Promise.wrapError">
                /// <summary locid="PluginUtilities.Promise.wrapError">
                /// Wraps a non-promise error value in a promise. You can use this function if you need
                /// to pass an error to a function that requires a promise.
                /// </summary>
                /// <param name="error" locid="PluginUtilities.Promise.wrapError_p:error">
                /// A non-promise error value to be wrapped in a promise.
                /// </param>
                /// <returns type="PluginUtilities.Promise" locid="PluginUtilities.Promise.wrapError_returnValue">
                /// A promise that is in an error state with the specified value.
                /// </returns>
                /// </signature>
                return new ErrorPromise(error);
            },

            _veryExpensiveTagWithStack: {
                get: function () { return tagWithStack; },
                set: function (value) { tagWithStack = value; }
            },
            _veryExpensiveTagWithStack_tag: tag,
            _getStack: function () {
                if (Debug.debuggerEnabled) {
                    try { throw new Error(); } catch (e) { return e.stack; }
                }
            },

        }
    );
    Object.defineProperties(Promise, PluginUtilities.Utilities.createEventProperties(errorET));

    var SignalPromise = PluginUtilities.Class.derive(PromiseStateMachine,
        function (cancel) {
            this._oncancel = cancel;
            this._setState(state_created);
            this._run();
        }, {
            _cancelAction: function () { this._oncancel && this._oncancel(); },
            _cleanupAction: function () { this._oncancel = null; }
        }, {
            supportedForProcessing: false
        }
    );

    var Signal = PluginUtilities.Class.define(
        function Signal_ctor(oncancel) {
            this._promise = new SignalPromise(oncancel);
        }, {
            promise: {
                get: function () { return this._promise; }
            },

            cancel: function Signal_cancel() {
                this._promise.cancel();
            },
            complete: function Signal_complete(value) {
                this._promise._completed(value);
            },
            error: function Signal_error(value) {
                this._promise._error(value);
            },
            progress: function Signal_progress(value) {
                this._promise._progress(value);
            }
        }, {
            supportedForProcessing: false,
        }
    );

    // Publish PluginUtilities.Promise
    //
    PluginUtilities.Namespace.define("PluginUtilities", {
        Promise: Promise,
        _Signal: Signal
    });

    Plugin.Promise = Promise;
}(this));

(function errorsInit(global, undefined) {
    "use strict";
    
    PluginUtilities.Namespace.define("PluginUtilities", {
        // ErrorFromName establishes a simple pattern for returning error codes.
        //
        ErrorFromName: PluginUtilities.Class.derive(Error, function (name, message) {
            /// <signature helpKeyword="PluginUtilities.ErrorFromName">
            /// <summary locid="PluginUtilities.ErrorFromName">
            /// Creates an Error object with the specified name and message properties.
            /// </summary>
            /// <param name="name" type="String" locid="PluginUtilities.ErrorFromName_p:name">The name of this error. The name is meant to be consumed programmatically and should not be localized.</param>
            /// <param name="message" type="String" optional="true" locid="PluginUtilities.ErrorFromName_p:message">The message for this error. The message is meant to be consumed by humans and should be localized.</param>
            /// <returns type="Error" locid="PluginUtilities.ErrorFromName_returnValue">Error instance with .name and .message properties populated</returns>
            /// </signature>
            this.name = name;
            this.message = message || name;
        }, {
            /* empty */
        }, {
            supportedForProcessing: false,
        })
    });
})(this);
// SIG // Begin signature block
// SIG // MIIaoQYJKoZIhvcNAQcCoIIakjCCGo4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFGfYu678/VWa
// SIG // s5AvJn/qLQh+KPLFoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSLMIIEhwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGkMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRU3viCPutz
// SIG // KjEyHfpNtYeVZ/uVczBEBgorBgEEAYI3AgEMMTYwNKAa
// SIG // gBgAcABsAHUAZwBpAG4ALgB2AHMALgBqAHOhFoAUaHR0
// SIG // cDovL21pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAE
// SIG // ggEALeyR1bMgnxxcM7ShOJNpV57Op6Tulbt4IPRjbtTO
// SIG // V3lVPvMzkkLoANfn0JnNfCGvW8xSKQJMh+KTj5IhlH3E
// SIG // cDleAO4Axsz/XWgbSwmMUqctw1dCFab90hsy4RQ8oD0A
// SIG // ZG6WEftfgmn9+ma0L1tqUouQFPIo7qSMds+moHW0iW2t
// SIG // 17vOnVQlN/U4sCSEpWqZAN64o0HZSaDPKFsIrCV2/G3R
// SIG // kBw3tOmDglug0SMm87dijOZkUQdfDF1YhTWZZB4hsL2B
// SIG // aTsKjXG2Tml6hGQlRWoxqnwtxOGDDnfWTkCrd9VhmpcR
// SIG // IZQFvDKxZnGnxU50J/0rxddFJNCH8z3qABk+0aGCAigw
// SIG // ggIkBgkqhkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABMoehNzLR0ezsA
// SIG // AAAAAEwwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzEL
// SIG // BgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0MTEw
// SIG // MTA3MjQxNVowIwYJKoZIhvcNAQkEMRYEFNxEF8q8hlxV
// SIG // kdLJQ90NPedE3+oiMA0GCSqGSIb3DQEBBQUABIIBAHt7
// SIG // YI8omsg0lvGKb44f0x2+uDijduyn5/sY0PquwG/hWiz1
// SIG // 01XooC2wj78S7ZSkzLYmq1KG87FS6f4ATHSHD+GXGvmz
// SIG // Dx9VxHiheEmgTBSNf2xmJ6uBlRoRZ0q50TK/q+l2+sEC
// SIG // GFmnxi8ONaVdbwl3TcB/BHho7+lBc1KCtTozgsUbuQqT
// SIG // QrJZRcfJmFWak/AlricJ44wrY9+I8usy1w6OP4MWwEOO
// SIG // 0IQbDst89p9hLMdPNfqiw6uaD+VXhoS9e32w0eXnC0BT
// SIG // Vup0So6gv9mk6ojl6BLTzv63iwAHKBz1dTf0CQiQgd73
// SIG // MWfC2oq9nab6xrxXGgwNG3u52RU18YA=
// SIG // End signature block
