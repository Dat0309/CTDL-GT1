var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var Logger = (function () {
                function Logger() {
                    this._loggerProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.LoggerPortMarshaler", {
                    }, true);
                    var that = this;
                    try  {
                        var apex = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.Test.Apex.DiagnosticsHub.ApexJSExtension", {
                        }, true);
                        if(apex !== null) {
                            apex._call("getApexJavaScript").done(function (result) {
                                if(result) {
                                    that.debug("got apex javascript files");
                                    var scriptObj = document.createElement("script");
                                    scriptObj.setAttribute("type", "text/javascript");
                                    scriptObj.setAttribute("src", result);
                                    var head = document.getElementsByTagName("head");
                                    if(!head) {
                                        that.debug("Unable to add apex script to document");
                                    } else {
                                        head[0].appendChild(scriptObj);
                                        that.debug("Added ApexJSExtension '" + result + "' to document");
                                    }
                                } else {
                                    that.debug("no file was returned by getApexJavaScript, cannot inject TestExtension.ts for ApexJS framework");
                                }
                            }, function (error) {
                                that.debug("Error when calling getApexJavaScript function:" + String(error));
                            });
                        } else {
                            that.debug("Unable to connect to port marshaler 'Microsoft.Test.Apex.DiagnosticsHub.ApexJSExtension'");
                        }
                    } catch (e) {
                        that.error(e.toString());
                    }
                }
                Logger.prototype.info = function (message) {
                    this._loggerProxy._call("logInfo", message);
                };
                Logger.prototype.debug = function (message) {
                    this._loggerProxy._call("logDebug", message);
                };
                Logger.prototype.warning = function (message) {
                    this._loggerProxy._call("logWarning", message);
                };
                Logger.prototype.error = function (message) {
                    this._loggerProxy._call("logError", message);
                };
                return Logger;
            })();            
            var _logger = null;
            function getLogger() {
                if(_logger === null) {
                    _logger = new Logger();
                }
                return _logger;
            }
            DiagnosticsHub.getLogger = getLogger;
            Plugin.addEventListener("pluginready", function () {
                getLogger();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var DiagnosticsHubNativeHost = (function () {
                function DiagnosticsHubNativeHost(logger) {
                    this._externalObject = null;
                    this._logger = logger;
                    var hostObj = (Plugin).F12 || (Plugin).VS;
                    if(!hostObj) {
                        this._logger.error("External object creator does not exist");
                        throw "Unable to determine the ScriptedSandbox host";
                    }
                    this._externalObject = hostObj.Utilities.createExternalObject("DiagnosticsHub.DataWarehouseHost", "{339B3787-FC17-4BF5-A0DC-CBEF24DB2EDE}");
                    this._automationManager = DiagnosticsHub.getAutomationManager(this._logger);
                }
                DiagnosticsHubNativeHost.prototype.requestSync = function (controllerId, actionId, sessionId, request) {
                    if(this._externalObject) {
                        this._externalObject.requestSync(controllerId, actionId, sessionId, (typeof request === "string") ? request : (request !== null && (typeof request !== "undefined")) ? JSON.stringify(request) : "");
                    } else {
                        this._logger.warning("External object is null. Verify that DiagnosticsHub.ScriptedSandboxPlugin.dll was loaded into ScriptedSandbox.");
                    }
                };
                DiagnosticsHubNativeHost.prototype.request = function (controllerId, actionId, sessionId, request) {
                    var _this = this;
                    var that = this;
                    var requestArgs = {
                        controllerId: controllerId,
                        actionId: actionId,
                        sessionId: sessionId,
                        request: request
                    };
                    var safeInvoke = function (callback, response) {
                        try  {
                            callback(response);
                        } catch (e) {
                            _this._logger.error(JSON.stringify(e));
                        }
                    }.bind(this);
                    var result = null;
                    var response = null;
                    var oncancel = function () {
                        if(_this._externalObject && _this._externalObject.cancel && response && response.requestId) {
                            _this._externalObject.cancel(response.requestId);
                        }
                    }.bind(this);
                    var dispatchCallback = function (promiseHandler, jsonResponse, promiseType) {
                        if(promiseHandler !== null) {
                            var result = null;
                            if(jsonResponse !== null) {
                                try  {
                                    result = (jsonResponse === null || jsonResponse === "" || (typeof jsonResponse !== "string")) ? jsonResponse : JSON.parse(jsonResponse);
                                } catch (e) {
                                    this._logger.error("Could not parse " + promiseType + " response: " + jsonResponse);
                                    this._logger.error(e.Message);
                                }
                            }
                            safeInvoke(promiseHandler, result);
                        } else {
                            this._logger.warning("DiagnosticsHubNativeHost: " + promiseType + " callback is null.");
                        }
                    }.bind(this);
                    var promiseInitialization = function (completePromise, errorPromise, progressPromise) {
                        if(_this._externalObject) {
                            result = _this._externalObject.request(controllerId, actionId, sessionId, (typeof request === "string") ? request : (request !== null && (typeof request !== "undefined")) ? JSON.stringify(request) : "", function (jsonResponse) {
                                dispatchCallback(completePromise, jsonResponse, "completePromise");
                            }.bind(_this), function (jsonResponse) {
                                dispatchCallback(errorPromise, jsonResponse, "errorPromise");
                            }.bind(_this), function (jsonResponse) {
                                dispatchCallback(progressPromise, jsonResponse, "progressPromise");
                            }.bind(_this));
                        } else {
                            that._logger.warning("External object is null. Verify that DiagnosticsHub.ScriptedSandboxPlugin.dll was loaded into ScriptedSandbox.");
                        }
                        if(result === null || typeof result !== "string") {
                            response = {
                                hresult: 1
                            };
                        } else {
                            response = JSON.parse(result);
                        }
                        if(response.hresult !== 0) {
                            _this._logger.error("Could not invoke request method of native host: " + result);
                            var error = new Error();
                            error.message = error.name = response.hresult.toString(16);
                            errorPromise(error);
                        }
                    }.bind(this);
                    var resultPromise = this._automationManager.getAutomationPromise("Microsoft.VisualStudio.DiagnosticsHub.DiagnosticsHubNativeHost.request", promiseInitialization, oncancel, requestArgs);
                    return resultPromise;
                };
                return DiagnosticsHubNativeHost;
            })();
            DiagnosticsHub.DiagnosticsHubNativeHost = DiagnosticsHubNativeHost;            
            var NativeHostController = (function () {
                function NativeHostController(sessionId, controllerId) {
                    this._sessionId = sessionId;
                    this._controllerId = controllerId;
                    this._nativeHost = getNativeHost();
                }
                NativeHostController.prototype.request = function (actionId, requestData) {
                    return this._nativeHost.request(this._controllerId, actionId, this._sessionId, requestData);
                };
                NativeHostController.prototype.requestSync = function (actionId, requestData) {
                    return this._nativeHost.requestSync(this._controllerId, actionId, this._sessionId, requestData);
                };
                return NativeHostController;
            })();
            DiagnosticsHub.NativeHostController = NativeHostController;            
            var _host = null;
            function getNativeHost() {
                if(_host === null) {
                    _host = new DiagnosticsHubNativeHost(DiagnosticsHub.getLogger());
                }
                return _host;
            }
            DiagnosticsHub.getNativeHost = getNativeHost;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            (function (SessionState) {
                SessionState._map = [];
                SessionState.Unknown = 0;
                SessionState.Created = 100;
                SessionState.SetupTargets = 150;
                SessionState.CollectionStarting = 200;
                SessionState.CollectionStarted = 300;
                SessionState.CollectionPausing = 325;
                SessionState.CollectionPauseCanceling = 330;
                SessionState.CollectionPaused = 350;
                SessionState.CollectionResuming = 375;
                SessionState.CollectionResumeCanceling = 380;
                SessionState.CollectionFinishing = 400;
                SessionState.CollectionFinished = 500;
                SessionState.Analyzing = 530;
                SessionState.AnalyzingFinished = 560;
                SessionState.CollectionTerminating = 600;
                SessionState.CollectionTerminated = 700;
                SessionState.CollectionStartFailed = 10000;
                SessionState.CollectionStartCanceling = 10100;
                SessionState.CollectionFinishFailed = 20000;
                SessionState.CollectionFinishCanceling = 20100;
            })(DiagnosticsHub.SessionState || (DiagnosticsHub.SessionState = {}));
            var SessionState = DiagnosticsHub.SessionState;
            var EventDeferral = (function () {
                function EventDeferral(onHandlerCompleted) {
                    this._onHandlerCompleted = onHandlerCompleted;
                }
                EventDeferral.prototype.complete = function () {
                    this._onHandlerCompleted();
                };
                return EventDeferral;
            })();            
            var StateChangedEventArgs = (function () {
                function StateChangedEventArgs(eventArgs, onHandlerCompleted) {
                    this._eventArgs = eventArgs;
                    this._waitHandler = false;
                    this._onHandlerCompleted = onHandlerCompleted;
                    this._eventDeferral = null;
                }
                Object.defineProperty(StateChangedEventArgs.prototype, "currentState", {
                    get: function () {
                        return this._eventArgs.CurrentState;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StateChangedEventArgs.prototype, "previousState", {
                    get: function () {
                        return this._eventArgs.PreviousState;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StateChangedEventArgs.prototype, "waitHandler", {
                    get: function () {
                        return this._eventDeferral !== null;
                    },
                    enumerable: true,
                    configurable: true
                });
                StateChangedEventArgs.prototype.getDeferral = function () {
                    if(this._eventDeferral === null) {
                        this._eventDeferral = new EventDeferral(this._onHandlerCompleted);
                    }
                    return this._eventDeferral;
                };
                return StateChangedEventArgs;
            })();            
            var Session = (function () {
                function Session(logger) {
                    var that = this;
                    this._eventsListeners = new Array();
                    this._logger = logger;
                    this._sessionProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.SessionPortMarshaler", {
                    }, true);
                    this._sessionProxy._call("initialize").done(function () {
                        that._logger.debug("JavaScript session object connected to host. Ready to get session state notification events.");
                    }, function (error) {
                        that._logger.error("Cannot initialize session, error name: '" + error.name + "', error message: '" + error.message + "'");
                    });
                    this._sessionProxy.addEventListener("sessionStateChanged", function (eventArgs) {
                        that.stateChangedHandler(eventArgs);
                    });
                }
                Session.prototype.getState = function (callback, onError) {
                    var that = this;
                    this._logger.debug("Calling get state");
                    return this._sessionProxy._call("getState").done(function (result) {
                        that._logger.debug("On getstate done, state value: " + result);
                        if(callback !== null) {
                            callback(result);
                        }
                    }, function (error) {
                        that._logger.error("Cannot get state, error name: '" + error.name + "', error message: '" + error.message + "'");
                        if(onError !== null) {
                            onError(error);
                        }
                    });
                };
                Session.prototype.addStateChangedEventListener = function (listener) {
                    this._eventsListeners.push(listener);
                    this._logger.debug("State changed event handler added.");
                };
                Session.prototype.removeStateChangedEventListener = function (listener) {
                    for(var i = 0; i < this._eventsListeners.length; i++) {
                        if(this._eventsListeners[i] === listener) {
                            this._logger.debug("State changed event handler removed.");
                            this._eventsListeners.splice(i, 1);
                            break;
                        }
                    }
                };
                Session.prototype.stateChangedHandler = function (eventArgs) {
                    var that = this;
                    this._logger.debug("Invoking JavaScript handlers for State Change Event.");
                    var handlersCount = 0;
                    var onCompleted = function () {
                        handlersCount--;
                        if(handlersCount <= 0) {
                            that._sessionProxy._call("sessionStateChangedCompleted", eventArgs.Token);
                        } else {
                            that._logger.debug("Still waiting when all event state change handlers will complete their work. Handlers count: " + handlersCount);
                        }
                    };
                    for(var propertyName in this._eventsListeners) {
                        var handler = this._eventsListeners[propertyName];
                        if(this._eventsListeners.hasOwnProperty(propertyName)) {
                            if(typeof handler === "function") {
                                try  {
                                    var jsEventArgs = new StateChangedEventArgs(eventArgs, onCompleted);
                                    handler(jsEventArgs);
                                    if(jsEventArgs.waitHandler) {
                                        handlersCount++;
                                        that._logger.debug("JavaScipt handlers for event state changed asked to wait while they will finish. Handlers count: " + handlersCount);
                                    }
                                } catch (e) {
                                    this._logger.error(e.toString());
                                }
                            } else {
                                this._logger.warning("One of the listeners not a 'function', it has type " + (typeof handler));
                            }
                        }
                    }
                    if(handlersCount === 0) {
                        onCompleted();
                    }
                };
                return Session;
            })();            
            var _currentSession = null;
            function getCurrentSession() {
                if(_currentSession === null) {
                    _currentSession = new Session(DiagnosticsHub.getLogger());
                }
                return _currentSession;
            }
            DiagnosticsHub.getCurrentSession = getCurrentSession;
            Plugin.addEventListener("pluginready", function () {
                getCurrentSession();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (DataWarehouse) {
                "use strict";
                (function (DataSourceInfoType) {
                    DataSourceInfoType._map = [];
                    DataSourceInfoType.Unknown = 0;
                    DataSourceInfoType.File = 1;
                    DataSourceInfoType.Directory = 2;
                    DataSourceInfoType.Package = 3;
                })(DataWarehouse.DataSourceInfoType || (DataWarehouse.DataSourceInfoType = {}));
                var DataSourceInfoType = DataWarehouse.DataSourceInfoType;
                var DataSourceInfo = (function () {
                    function DataSourceInfo(id, type, identity, path) {
                        this.id = id;
                        this.type = type;
                        this.identity = identity;
                        this.path = path;
                    }
                    return DataSourceInfo;
                })();
                DataWarehouse.DataSourceInfo = DataSourceInfo;                
                var DataWarehouseService = (function () {
                    function DataWarehouseService() {
                        this._serviceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.DataWarehouseServiceMarshaler", {
                        }, true);
                        this._logger = DiagnosticsHub.getLogger();
                    }
                    DataWarehouseService.prototype.getAllDataSourceInfos = function (callback) {
                        var that = this;
                        this._serviceProxy._call("getAllDataSourceInfos").done(function (result) {
                            var infos = new Array();
                            for(var i = 0; i < result.length; i++) {
                                var dataSource = result[i];
                                if(dataSource.Type === DataSourceInfoType.File || dataSource.Type === DataSourceInfoType.Directory || dataSource.Type === DataSourceInfoType.Package) {
                                    infos.push(new DataSourceInfo(dataSource.Id, dataSource.Type, dataSource.Identity, dataSource.Path));
                                } else {
                                    that._logger.error("Unknown type of data source info type: " + dataSource.Type);
                                }
                            }
                            callback(infos);
                        });
                    };
                    return DataWarehouseService;
                })();                
                var _service = null;
                function getDataWarehouseService() {
                    if(_service === null) {
                        _service = new DataWarehouseService();
                    }
                    return _service;
                }
                DataWarehouse.getDataWarehouseService = getDataWarehouseService;
                Plugin.addEventListener("pluginready", function () {
                    getDataWarehouseService();
                });
            })(DiagnosticsHub.DataWarehouse || (DiagnosticsHub.DataWarehouse = {}));
            var DataWarehouse = DiagnosticsHub.DataWarehouse;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var Publisher = (function () {
                function Publisher(events) {
                    if (typeof events === "undefined") { events = null; }
                    this._events = {
                    };
                    this._listeners = {
                    };
                    if(events && events.length > 0) {
                        for(var i = 0; i < events.length; i++) {
                            var type = events[i];
                            if(type) {
                                this._events[type] = type;
                            }
                        }
                    } else {
                        this._events = null;
                    }
                }
                Publisher.prototype.addEventListener = function (eventType, func) {
                    if(eventType && func) {
                        if(this._events === null || this._events[eventType]) {
                            var callbacks = this._listeners[eventType] ? this._listeners[eventType] : this._listeners[eventType] = [];
                            callbacks.push(func);
                        }
                    }
                };
                Publisher.prototype.removeEventListener = function (eventType, func) {
                    if(eventType && func) {
                        if(this._events === null || this._events[eventType]) {
                            var callbacks = this._listeners[eventType];
                            if(callbacks) {
                                for(var i = 0; i < callbacks.length; i++) {
                                    if(func === callbacks[i]) {
                                        callbacks.splice(i, 1);
                                        break;
                                    }
                                }
                                if(callbacks.length === 0) {
                                    delete this._listeners[eventType];
                                }
                            }
                        }
                    }
                };
                Publisher.prototype.invokeListener = function (eventType, args) {
                    if(eventType) {
                        if(this._events === null || this._events[eventType]) {
                            var callbacks = this._listeners[eventType];
                            if(callbacks) {
                                for(var i = 0; i < callbacks.length; i++) {
                                    var func = callbacks[i];
                                    if(func) {
                                        func(args);
                                    }
                                }
                            }
                        }
                    }
                };
                return Publisher;
            })();
            DiagnosticsHub.Publisher = Publisher;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var EventAggregator = (function () {
                function EventAggregator(logger) {
                    this._eventsListeners = {
                    };
                    this._publisher = new DiagnosticsHub.Publisher();
                    this._logger = logger;
                    this._eventAggregatorProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.EventAggregatorMarshaler", {
                    }, true);
                    this._eventAggregatorProxy.addEventListener("globalEventHandler", function (eventArgs) {
                        this.globalEventHandler(eventArgs);
                    }.bind(this));
                }
                EventAggregator.prototype.addEventListener = function (eventType, listener) {
                    this._publisher.addEventListener(eventType, listener);
                    this._logger.debug("EventAggregator:: Event listener added for event type '" + eventType + "'");
                };
                EventAggregator.prototype.removeEventListener = function (eventType, listener) {
                    this._publisher.removeEventListener(eventType, listener);
                    this._logger.debug("EventAggregator:: Event listener removed for event type '" + eventType + "'");
                };
                EventAggregator.prototype.globalEventHandler = function (eventArgs) {
                    var eventType = eventArgs.EventType;
                    this._logger.debug("EventAggregator:: Handling event type " + eventType + ".");
                    var dataString = eventArgs.HubEventArgs.Data;
                    this._logger.debug("EventAggregator:: Raise handler for event type " + eventType + " with data " + dataString + ".");
                    try  {
                        var data = null;
                        if(dataString !== null && typeof dataString === "string") {
                            data = JSON.parse(dataString);
                        }
                        this._publisher.invokeListener(eventType, data);
                    } catch (e) {
                        this._logger.error(e.toString());
                    }
                };
                EventAggregator.prototype.raiseEvent = function (eventType, data) {
                    var dataString = null;
                    if(data !== null && typeof data !== "undefined") {
                        dataString = JSON.stringify(data);
                    }
                    this._logger.debug("EventAggregator:: Raising event type " + eventType + " with data " + dataString + ".");
                    this._eventAggregatorProxy._call("raiseEvent", eventType, dataString);
                };
                return EventAggregator;
            })();            
            var LocalEventAggregator = (function () {
                function LocalEventAggregator() {
                    this._publisher = new DiagnosticsHub.Publisher();
                }
                LocalEventAggregator.prototype.addEventListener = function (eventType, listener) {
                    this._publisher.addEventListener(eventType, listener);
                };
                LocalEventAggregator.prototype.removeEventListener = function (eventType, listener) {
                    this._publisher.removeEventListener(eventType, listener);
                };
                LocalEventAggregator.prototype.raiseEvent = function (eventType, data) {
                    this._publisher.invokeListener(eventType, data);
                };
                return LocalEventAggregator;
            })();
            DiagnosticsHub.LocalEventAggregator = LocalEventAggregator;            
            var _eventAggregator = null;
            function getEventAggregator() {
                if(_eventAggregator === null) {
                    if((Plugin).F12) {
                        _eventAggregator = new LocalEventAggregator();
                    } else {
                        _eventAggregator = new EventAggregator(DiagnosticsHub.getLogger());
                    }
                }
                return _eventAggregator;
            }
            DiagnosticsHub.getEventAggregator = getEventAggregator;
            Plugin.addEventListener("pluginready", function () {
                getEventAggregator();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var GraphDataUpdateService = (function () {
                function GraphDataUpdateService(logger) {
                    this._logger = logger;
                    this._serviceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.GraphDataUpdateServiceMarshaler", {
                    }, true);
                }
                GraphDataUpdateService.prototype.addNewPoints = function (counterId, points) {
                    var that = this;
                    this._serviceProxy._call("addNewPoints", counterId, points).done(function () {
                    }, function (error) {
                        that._logger.error(error.message);
                    });
                };
                return GraphDataUpdateService;
            })();            
            var _graphDataUpdateService = null;
            function getGraphDataUpdateService() {
                if(_graphDataUpdateService === null) {
                    _graphDataUpdateService = new GraphDataUpdateService(DiagnosticsHub.getLogger());
                }
                return _graphDataUpdateService;
            }
            DiagnosticsHub.getGraphDataUpdateService = getGraphDataUpdateService;
            Plugin.addEventListener("pluginready", function () {
                getGraphDataUpdateService();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var OutputWindowsService = (function () {
                function OutputWindowsService() {
                    this._loggerProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.OutputWindowServiceMarshaler", {
                    }, true);
                }
                OutputWindowsService.prototype.outputLine = function (message) {
                    this._loggerProxy._call("outputLine", message);
                };
                OutputWindowsService.prototype.outputLineAndShow = function (message) {
                    this._loggerProxy._call("outputLineAndShow", message);
                };
                OutputWindowsService.prototype.outputString = function (message) {
                    this._loggerProxy._call("outputString", message);
                };
                OutputWindowsService.prototype.outputStringAndShow = function (message) {
                    this._loggerProxy._call("outputStringAndShow", message);
                };
                return OutputWindowsService;
            })();            
            var _outputWindowService = null;
            function getOutputWindowsService() {
                if(_outputWindowService === null) {
                    _outputWindowService = new OutputWindowsService();
                }
                return _outputWindowService;
            }
            DiagnosticsHub.getOutputWindowsService = getOutputWindowsService;
            Plugin.addEventListener("pluginready", function () {
                getOutputWindowsService();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (Collectors) {
                "use strict";
                var StandardTransportService = (function () {
                    function StandardTransportService(logger) {
                        var that = this;
                        this._messageListeners = {
                        };
                        this._logger = logger;
                        this._proxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.StandardTransportServicePortMarshaller", {
                        }, true);
                        this._proxy.addEventListener("stringMessageReceived", function (eventArgs) {
                            that._logger.debug("StandardTransportService.stringMessageReceived");
                            that.onStringMessageReceived(eventArgs);
                        });
                    }
                    StandardTransportService.prototype.getIsRemoteConnection = function () {
                        return this._proxy._call("getIsRemoteConnection");
                    };
                    StandardTransportService.prototype.sendStringToCollectionAgent = function (agentClassId, request) {
                        this._logger.debug("StandardTransportService.sendStringToCollectionAgent");
                        return this._proxy._call("sendStringToCollectionAgent", agentClassId, request);
                    };
                    StandardTransportService.prototype.downloadFile = function (targetFilePath, localFilePath) {
                        this._logger.debug("StandardTransportService.downloadFile");
                        return this._proxy._call("downloadFile", targetFilePath, localFilePath);
                    };
                    StandardTransportService.prototype.addMessageListener = function (listenerGuid, listener) {
                        var _this = this;
                        this._logger.debug("StandardTransportService.addMessageListener(" + listenerGuid + ")");
                        if(typeof listenerGuid !== "string" || (listenerGuid.length !== 38 && listenerGuid.length !== 36)) {
                            throw new Error("'listenerGuid' must be a Guid string");
                        }
                        if(listenerGuid.length === 38 && listenerGuid[0] === "{" && listenerGuid[37] === "}") {
                            listenerGuid = listenerGuid.substr(1, 36);
                        }
                        listenerGuid = listenerGuid.toLowerCase();
                        var lowerCaseGuidRegEx = new RegExp("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$");
                        if(!lowerCaseGuidRegEx.test(listenerGuid)) {
                            throw new Error("'listenerGuid' must be a Guid string");
                        }
                        if(this._messageListeners[listenerGuid]) {
                            throw new Error("Listener already exists with guid = " + listenerGuid);
                        }
                        this._messageListeners[listenerGuid] = listener;
                        return this._proxy._call("enableEventsForListenerId", listenerGuid).then(null, function (value) {
                            _this._messageListeners[listenerGuid] = null;
                        });
                    };
                    StandardTransportService.prototype.onStringMessageReceived = function (eventArgs) {
                        this._logger.debug("StandardTransportService.onStringMessageReceived");
                        var listenerGuid = eventArgs.ListenerId;
                        var message = eventArgs.Message;
                        if(this._messageListeners[listenerGuid]) {
                            var listener = this._messageListeners[listenerGuid];
                            listener(message);
                        } else {
                            this._logger.warning("Unexpected message received without a message listener. listenerGuid=" + listenerGuid);
                        }
                    };
                    return StandardTransportService;
                })();                
                var _standardTransportService = null;
                function getStandardTransportService() {
                    if(_standardTransportService === null) {
                        _standardTransportService = new StandardTransportService(DiagnosticsHub.getLogger());
                    }
                    return _standardTransportService;
                }
                Collectors.getStandardTransportService = getStandardTransportService;
            })(DiagnosticsHub.Collectors || (DiagnosticsHub.Collectors = {}));
            var Collectors = DiagnosticsHub.Collectors;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (DataWarehouse) {
                "use strict";
                var ResourceIdentity = (function () {
                    function ResourceIdentity() { }
                    ResourceIdentity.DiagnosticsPackage = "DiagnosticsHub.Resource.DiagnosticsPackage";
                    ResourceIdentity.EtlFile = "DiagnosticsHub.Resource.EtlFile";
                    ResourceIdentity.JavaScriptSource = "DiagnosticsHub.Resource.JavaScript.SourceDirectory";
                    ResourceIdentity.SymbolCache = "DiagnosticsHub.Resource.SymbolCache";
                    ResourceIdentity.UserNativeImageDirectory = "DiagnosticsHub.Resource.UserNativeImageDirectory";
                    ResourceIdentity.PlatformNativeImage = "DiagnosticsHub.Resource.PlatformNativeImage";
                    ResourceIdentity.PlatformWinmd = "DiagnosticsHub.Resource.PlatformWinmd";
                    ResourceIdentity.UnknownFile = "DiagnosticsHub.Resource.File";
                    ResourceIdentity.UnknownDirectory = "DiagnosticsHub.Resource.Directory";
                    return ResourceIdentity;
                })();
                DataWarehouse.ResourceIdentity = ResourceIdentity;                
            })(DiagnosticsHub.DataWarehouse || (DiagnosticsHub.DataWarehouse = {}));
            var DataWarehouse = DiagnosticsHub.DataWarehouse;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var BigNumber = (function () {
                function BigNumber(high, low) {
                    this._isHighNegative = false;
                    this._isLowNegative = false;
                    if(!Microsoft.VisualStudio.DiagnosticsHub.BigNumber.validate(high) || !Microsoft.VisualStudio.DiagnosticsHub.BigNumber.validate(low)) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                    if(high < 0) {
                        high = (high >>> 0);
                        this._isHighNegative = true;
                    }
                    if(low < 0) {
                        low = (low >>> 0);
                        this._isLowNegative = true;
                    }
                    this._value = {
                        h: high,
                        l: low
                    };
                }
                BigNumber.OldestTimestampFormat = {
                    h: 0,
                    l: 0
                };
                BigNumber.LatestTimestampFormat = {
                    h: 0xffffffff,
                    l: 0xffffffff
                };
                Object.defineProperty(BigNumber, "oldest", {
                    get: function () {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.OldestTimestampFormat;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BigNumber, "latest", {
                    get: function () {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.LatestTimestampFormat;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BigNumber, "zero", {
                    get: function () {
                        if(!Microsoft.VisualStudio.DiagnosticsHub.BigNumber.Zero) {
                            Microsoft.VisualStudio.DiagnosticsHub.BigNumber.Zero = new Microsoft.VisualStudio.DiagnosticsHub.BigNumber(0, 0);
                        }
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.Zero;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BigNumber, "one", {
                    get: function () {
                        if(!Microsoft.VisualStudio.DiagnosticsHub.BigNumber.One) {
                            Microsoft.VisualStudio.DiagnosticsHub.BigNumber.One = new Microsoft.VisualStudio.DiagnosticsHub.BigNumber(0, 1);
                        }
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.One;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BigNumber.prototype, "jsonValue", {
                    get: function () {
                        if(!this._jsonValue) {
                            var high = this._value.h;
                            if(this._isHighNegative || high > 0x7fffffff) {
                                high = high << 0;
                            }
                            var low = this._value.l;
                            if(this._isLowNegative || low > 0x7fffffff) {
                                low = low << 0;
                            }
                            this._jsonValue = {
                                h: high,
                                l: low
                            };
                        }
                        return this._jsonValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BigNumber.prototype, "value", {
                    get: function () {
                        if(!this._stringValue) {
                            if(this._value.h > 0) {
                                this._stringValue = "0x" + this._value.h.toString(16) + Microsoft.VisualStudio.DiagnosticsHub.BigNumber.padLeadingZeros(this._value.l.toString(16), 8);
                            } else {
                                this._stringValue = "0x" + this._value.l.toString(16);
                            }
                        }
                        return this._stringValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                BigNumber.max = function max(first, second) {
                    return first.greaterOrEqual(second) ? first : second;
                };
                BigNumber.min = function min(first, second) {
                    return first.greaterOrEqual(second) ? second : first;
                };
                BigNumber.add = function add(first, second) {
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(first, second);
                };
                BigNumber.subtract = function subtract(first, second) {
                    if(second.greater(first)) {
                        return BigNumber.zero;
                    }
                    var otherTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(second.jsonValue);
                    var negateHigh = ~(otherTime.h);
                    var negateLow = ~(otherTime.l);
                    var twosComplement = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(new Microsoft.VisualStudio.DiagnosticsHub.BigNumber(negateHigh, negateLow), Microsoft.VisualStudio.DiagnosticsHub.BigNumber.one, true);
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(first, twosComplement, true);
                };
                BigNumber.multiply = function multiply(first, second) {
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.multiplication(first, second);
                };
                BigNumber.divide = function divide(first, second) {
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.division(first, second, false);
                };
                BigNumber.modulo = function modulo(first, second) {
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.division(first, second, true);
                };
                BigNumber.addNumber = function addNumber(first, second) {
                    if(second < 0) {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.subtract(first, BigNumber.convertFromNumber(-second));
                    } else {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(first, BigNumber.convertFromNumber(second));
                    }
                    return null;
                };
                BigNumber.subtractNumber = function subtractNumber(first, second) {
                    if(second < 0) {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(first, BigNumber.convertFromNumber(-second));
                    } else {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.subtract(first, BigNumber.convertFromNumber(second));
                    }
                    return null;
                };
                BigNumber.multiplyNumber = function multiplyNumber(first, second) {
                    if(second < 0) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                    return BigNumber.multiply(first, BigNumber.convertFromNumber(second));
                };
                BigNumber.divideNumber = function divideNumber(first, second) {
                    if(second < 0) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                    return BigNumber.divide(first, BigNumber.convertFromNumber(second));
                };
                BigNumber.moduloNumber = function moduloNumber(first, second) {
                    if(second < 0) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                    return BigNumber.modulo(first, BigNumber.convertFromNumber(second));
                };
                BigNumber.convertFromNumber = function convertFromNumber(num) {
                    if((num < 0) || !(num < 0x20000000000000)) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                    num = Math.floor(num);
                    var low = num & 0xFFFFFFFF;
                    if(num <= 0xFFFFFFFF) {
                        return new BigNumber(0, low);
                    }
                    var highStr = num.toString(16);
                    highStr = highStr.substring(0, highStr.length - 8);
                    var high = Number("0x" + highStr);
                    return new BigNumber(high, low);
                };
                BigNumber.prototype.equals = function (other) {
                    var isEqual = false;
                    var otherTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(other.jsonValue);
                    isEqual = (this._value.h === otherTime.h && this._value.l === otherTime.l);
                    return isEqual;
                };
                BigNumber.prototype.greater = function (other) {
                    var isGreater = false;
                    var otherTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(other.jsonValue);
                    if(this._value.h > otherTime.h) {
                        isGreater = true;
                    } else if(this._value.h === otherTime.h) {
                        if(this._value.l > otherTime.l) {
                            isGreater = true;
                        }
                    }
                    return isGreater;
                };
                BigNumber.prototype.greaterOrEqual = function (other) {
                    var isGreaterOrEqual = false;
                    var otherTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(other.jsonValue);
                    if(this._value.h > otherTime.h) {
                        isGreaterOrEqual = true;
                    } else if(this._value.h === otherTime.h) {
                        if(this._value.l >= otherTime.l) {
                            isGreaterOrEqual = true;
                        }
                    }
                    return isGreaterOrEqual;
                };
                BigNumber.prototype.compareTo = function (other) {
                    if(this.greater(other)) {
                        return 1;
                    } else if(this.equals(other)) {
                        return 0;
                    } else {
                        return -1;
                    }
                };
                BigNumber.convertFromBinaryString = function convertFromBinaryString(bits) {
                    if(!bits || bits.match("[^10]") || bits.length > 64) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000" + " " + bits));
                    }
                    var high = 0;
                    var low = 0;
                    if(bits.length <= 32) {
                        low = parseInt(bits, 2);
                    } else {
                        low = parseInt(bits.slice(bits.length - 32), 2);
                        high = parseInt(bits.slice(0, bits.length - 32), 2);
                    }
                    return new BigNumber(high, low);
                };
                BigNumber.getBinaryString = function getBinaryString(timestamp) {
                    var lowPart = timestamp._value.l.toString(2);
                    if(timestamp._value.h > 0) {
                        return timestamp._value.h.toString(2) + Microsoft.VisualStudio.DiagnosticsHub.BigNumber.padLeadingZeros(lowPart, 32);
                    } else {
                        return lowPart;
                    }
                };
                BigNumber.convertToManagedTimeFormat = function convertToManagedTimeFormat(time) {
                    var high = time.h < 0 ? time.h >>> 0 : time.h;
                    var low = time.l < 0 ? time.l >>> 0 : time.l;
                    return {
                        h: high,
                        l: low
                    };
                };
                BigNumber.addition = function addition(first, second, ignoreOverflow) {
                    if (typeof ignoreOverflow === "undefined") { ignoreOverflow = false; }
                    var firstTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(first.jsonValue);
                    var secondTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(second.jsonValue);
                    var low = 0;
                    var high = 0;
                    var low0 = (firstTime.l & 0xff) + (secondTime.l & 0xff);
                    var low8 = (low0 >>> 8) + ((firstTime.l >>> 8) & 0xff) + ((secondTime.l >>> 8) & 0xff);
                    low0 = low0 & 0xff;
                    var low16 = (low8 >>> 8) + ((firstTime.l >>> 16) & 0xff) + ((secondTime.l >>> 16) & 0xff);
                    low8 = low8 & 0xff;
                    var low24 = (low16 >>> 8) + ((firstTime.l >>> 24) & 0xff) + ((secondTime.l >>> 24) & 0xff);
                    low16 = low16 & 0xff;
                    var high0 = (low24 >>> 8) + (firstTime.h & 0xff) + (secondTime.h & 0xff);
                    low24 = low24 & 0xff;
                    var high8 = (high0 >>> 8) + ((firstTime.h >>> 8) & 0xff) + ((secondTime.h >>> 8) & 0xff);
                    high0 = high0 & 0xff;
                    var high16 = (high8 >>> 8) + ((firstTime.h >>> 16) & 0xff) + ((secondTime.h >>> 16) & 0xff);
                    high8 = high8 & 0xff;
                    var high24 = (high16 >>> 8) + ((firstTime.h >>> 24) & 0xff) + ((secondTime.h >>> 24) & 0xff);
                    high16 = high16 & 0xff;
                    if(!ignoreOverflow && (high24 >>> 8) > 0) {
                        Microsoft.VisualStudio.DiagnosticsHub.getLogger().error("Addition overflow. Lost upper bits from: 0x" + high24.toString(16));
                        return new BigNumber(0xffffffff, 0xffffffff);
                    }
                    high24 = high24 & 0xff;
                    var finalLow16 = low24 << 8 | low16;
                    var finalLow0 = low8 << 8 | low0;
                    var finalHigh16 = high24 << 8 | high16;
                    var finalHigh0 = high8 << 8 | high0;
                    low = Number("0x" + Microsoft.VisualStudio.DiagnosticsHub.BigNumber.padLeadingZeros(finalLow16.toString(16), 4) + Microsoft.VisualStudio.DiagnosticsHub.BigNumber.padLeadingZeros(finalLow0.toString(16), 4));
                    high = Number("0x" + Microsoft.VisualStudio.DiagnosticsHub.BigNumber.padLeadingZeros(finalHigh16.toString(16), 4) + Microsoft.VisualStudio.DiagnosticsHub.BigNumber.padLeadingZeros(finalHigh0.toString(16), 4));
                    return new BigNumber(high, low);
                };
                BigNumber.multiplication = function multiplication(first, second) {
                    var firstTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(first.jsonValue);
                    var secondTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(second.jsonValue);
                    if(firstTime.h === 0 && secondTime.h === 0 && 0 < firstTime.l && firstTime.l <= 0x4000000 && 0 < secondTime.l && secondTime.l <= 0x4000000) {
                        var product = firstTime.l * secondTime.l;
                        return BigNumber.convertFromNumber(product);
                    }
                    var a1 = firstTime.l & 0xFFFF;
                    var a2 = firstTime.l >>> 0x10;
                    var a3 = firstTime.h & 0xFFFF;
                    var a4 = firstTime.h >>> 0x10;
                    var b1 = secondTime.l & 0xFFFF;
                    var b2 = secondTime.l >>> 0x10;
                    var b3 = secondTime.h & 0xFFFF;
                    var b4 = secondTime.h >>> 0x10;
                    var c1 = a1 * b1;
                    var c2 = c1 >>> 0x10;
                    c1 &= 0xFFFF;
                    c2 += a2 * b1;
                    var c3 = c2 >>> 0x10;
                    c2 &= 0xFFFF;
                    c2 += a1 * b2;
                    c3 += c2 >>> 0x10;
                    c2 &= 0xFFFF;
                    c3 += a3 * b1;
                    var c4 = c3 >>> 0x10;
                    c3 &= 0xFFFF;
                    c3 += a2 * b2;
                    c4 += c3 >>> 0x10;
                    c3 &= 0xFFFF;
                    c3 += a1 * b3;
                    c4 += c3 >>> 0x10;
                    c3 &= 0xFFFF;
                    c4 += a4 * b1 + a3 * b2 + a2 * b3 + a1 * b4;
                    if(c4 > 0xFFFF) {
                        Microsoft.VisualStudio.DiagnosticsHub.getLogger().error("Multiplication overflow. Lost upper 16-bits from: 0x" + c4.toString(16));
                    }
                    c4 &= 0xFFFF;
                    var productHigh = (c4 << 0x10) | c3;
                    var productLow = (c2 << 0x10) | c1;
                    return new BigNumber(productHigh, productLow);
                };
                BigNumber.division = function division(dividend, divisor, wantRemainder) {
                    if(divisor.greater(dividend)) {
                        return wantRemainder ? dividend : Microsoft.VisualStudio.DiagnosticsHub.BigNumber.zero;
                    }
                    if(divisor.equals(Microsoft.VisualStudio.DiagnosticsHub.BigNumber.zero)) {
                        if(wantRemainder) {
                            return dividend;
                        }
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                    var dividendBits = BigNumber.getBinaryString(dividend);
                    var divisorBits = BigNumber.getBinaryString(divisor);
                    var divisorLength = divisorBits.length;
                    var dividendLength = dividendBits.length;
                    var timeStamp2toThe53 = new BigNumber(0x200000, 0);
                    if(timeStamp2toThe53.greater(dividend)) {
                        var dividendNum = parseInt(dividend.value);
                        var divisorNum = parseInt(divisor.value);
                        return wantRemainder ? BigNumber.convertFromNumber(dividendNum % divisorNum) : BigNumber.convertFromNumber(dividendNum / divisorNum);
                    }
                    var quotientString = "";
                    var nextIndex = divisorLength;
                    var currDividend = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromBinaryString(dividendBits.substr(0, divisorLength));
                    while(nextIndex <= dividendLength) {
                        if(currDividend.greater(divisor) || currDividend.equals(divisor)) {
                            quotientString += "1";
                            currDividend = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.subtract(currDividend, divisor);
                        } else {
                            quotientString += "0";
                        }
                        if(nextIndex !== dividendLength) {
                            currDividend = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromBinaryString(BigNumber.getBinaryString(currDividend) + dividendBits[nextIndex]);
                        }
                        nextIndex++;
                    }
                    return wantRemainder ? currDividend : Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromBinaryString(quotientString);
                };
                BigNumber.padLeadingZeros = function padLeadingZeros(value, totalLength) {
                    var padded = value;
                    var zeros = "00000000";
                    if(padded && totalLength && totalLength > 0) {
                        while(totalLength - padded.length >= 8) {
                            padded = zeros + padded;
                        }
                        padded = zeros.substr(0, totalLength - padded.length) + padded;
                    }
                    return padded;
                };
                BigNumber.validate = function validate(value) {
                    return typeof value === "number" && value < 0x100000000 && value > -1 * 0x80000000;
                };
                return BigNumber;
            })();
            DiagnosticsHub.BigNumber = BigNumber;            
            var JsonTimespan = (function () {
                function JsonTimespan(begin, end) {
                    if(begin.greater(end)) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                    this._begin = begin;
                    this._end = end;
                }
                Object.defineProperty(JsonTimespan.prototype, "begin", {
                    get: function () {
                        return this._begin;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(JsonTimespan.prototype, "end", {
                    get: function () {
                        return this._end;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(JsonTimespan.prototype, "elapsed", {
                    get: function () {
                        if(!this._elapsed) {
                            this._elapsed = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.subtract(this.end, this.begin);
                        }
                        return this._elapsed;
                    },
                    enumerable: true,
                    configurable: true
                });
                JsonTimespan.prototype.equals = function (other) {
                    return this.begin.equals(other.begin) && this.end.equals(other.end);
                };
                JsonTimespan.prototype.contains = function (time) {
                    return time.greaterOrEqual(this.begin) && this.end.greaterOrEqual(time);
                };
                return JsonTimespan;
            })();
            DiagnosticsHub.JsonTimespan = JsonTimespan;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (DataWarehouse) {
                "use strict";
                var DhContextData = (function () {
                    function DhContextData() { }
                    return DhContextData;
                })();
                DataWarehouse.DhContextData = DhContextData;                
                (function (AnalyzerConfigurationType) {
                    AnalyzerConfigurationType._map = [];
                    AnalyzerConfigurationType.Standard = 1;
                    AnalyzerConfigurationType.Custom = 2;
                })(DataWarehouse.AnalyzerConfigurationType || (DataWarehouse.AnalyzerConfigurationType = {}));
                var AnalyzerConfigurationType = DataWarehouse.AnalyzerConfigurationType;
                (function (PrivateDataId) {
                    PrivateDataId._map = [];
                    PrivateDataId.JmcJavaScript = 1;
                    PrivateDataId.SolutionExecutableCodeOutputs = 2;
                })(DataWarehouse.PrivateDataId || (DataWarehouse.PrivateDataId = {}));
                var PrivateDataId = DataWarehouse.PrivateDataId;
                var Constants = (function () {
                    function Constants() { }
                    Constants.CONTROLLER_ID_DATAWAREHOUSE = 1;
                    Constants.CONTROLLER_ID_DATAWAREHOUSECONTEXTSERVICE = 2;
                    Constants.CONTROLLER_ID_DATAWAREHOUSECONTEXT = 3;
                    Constants.CONTROLLER_ID_DATAWAREHOUSEJMCSERVICE = 4;
                    Constants.ACTION_DATAWAREHOUSE_BEGININITIALIZATION = 1;
                    Constants.ACTION_DATAWAREHOUSE_ENDINITIALIZATION = 2;
                    Constants.ACTION_DATAWAREHOUSE_GETDATA = 3;
                    Constants.ACTION_DATAWAREHOUSE_GETRESULT = 4;
                    Constants.ACTION_DATAWAREHOUSE_DISPOSERESULT = 5;
                    Constants.ACTION_DATAWAREHOUSE_INITIALIZATION_DEPRECATED = 100;
                    Constants.ACTION_DATAWAREHOUSE_CLOSE = 400;
                    Constants.ACTION_DATAWAREHOUSE_GETPRIVATEDATA = 401;
                    Constants.ACTION_DATAWAREHOUSE_SETPRIVATEDATA = 402;
                    Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_CREATECONTEXT = 1;
                    Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_DELETECONTEXT = 2;
                    Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_COPYCONTEXT = 3;
                    Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_GETCONTEXT = 4;
                    Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_GETGLOBALCONTEXT = 5;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_GETTIMEDOMAIN = 1;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_SETTIMEDOMAIN = 2;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_GETMACHINEDOMAIN = 3;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOMACHINEDOMAIN = 4;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARMACHINEDOMAIN = 5;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_GETPROCESSDOMAIN = 6;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOPROCESSDOMAIN = 7;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARPROCESSDOMAIN = 8;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_GETTHREADDOMAIN = 9;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOTHREADDOMAIN = 10;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARTHREADDOMAIN = 11;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_GETCUSTOMDOMAIN = 12;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_SETCUSTOMDOMAIN = 13;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_SETDATA = 14;
                    Constants.ACTION_DATAWAREHOUSECONTEXT_GETDATA = 15;
                    Constants.ACTION_DATAWAREHOUSEJMCSERVICE_GETJMCENABLED = 1;
                    Constants.ACTION_DATAWAREHOUSEJMCSERVICE_SETJMCENABLED = 2;
                    return Constants;
                })();                
                var DhJsonResult = (function () {
                    function DhJsonResult(resultId, sessionId, controller) {
                        this._resultId = resultId;
                        this._sessionId = sessionId;
                        this._controller = controller;
                    }
                    DhJsonResult.prototype.getResult = function (customData) {
                        var that = this;
                        var requestObject = null;
                        if(customData !== null) {
                            requestObject = {
                                resultId: that._resultId,
                                customData: JSON.stringify(customData)
                            };
                        } else {
                            requestObject = {
                                resultId: that._resultId
                            };
                        }
                        return that._controller.request(Constants.ACTION_DATAWAREHOUSE_GETRESULT, requestObject);
                    };
                    DhJsonResult.prototype.dispose = function () {
                        var that = this;
                        return that._controller.request(Constants.ACTION_DATAWAREHOUSE_DISPOSERESULT, {
                            resultId: that._resultId
                        });
                    };
                    return DhJsonResult;
                })();                
                var DataWarehouseFactory = (function () {
                    function DataWarehouseFactory() {
                        this._getConfigurationPromise = null;
                        this._serviceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.DataWarehouseServiceMarshaler", {
                        }, true);
                        this._logger = DiagnosticsHub.getLogger();
                    }
                    DataWarehouseFactory.prototype.getDataWarehouse = function (configuration) {
                        if (typeof configuration === "undefined") { configuration = null; }
                        if(this._getConfigurationPromise === null || configuration) {
                            if(configuration === null) {
                                this._getConfigurationPromise = this._serviceProxy._call("getDataWarehouseConfiguration");
                            } else {
                                this._getConfigurationPromise = Plugin.Promise.wrap(configuration);
                            }
                        }
                        return this._getConfigurationPromise.then(function (configuration) {
                            this._logger.debug("Got the sessionId '" + configuration.sessionId + "'. Creating datawarehouse...");
                            return new DataWarehouseInstance(configuration);
                        }.bind(this));
                    };
                    return DataWarehouseFactory;
                })();                
                var DataWarehouseInstance = (function () {
                    function DataWarehouseInstance(dwConfiguration) {
                        this._logger = null;
                        this._dwConfiguration = null;
                        this._controller = null;
                        this._contextService = null;
                        this._jmcService = null;
                        this._logger = DiagnosticsHub.getLogger();
                        this._dwConfiguration = dwConfiguration;
                        this._controller = new DiagnosticsHub.NativeHostController(this._dwConfiguration.sessionId, Constants.CONTROLLER_ID_DATAWAREHOUSE);
                    }
                    DataWarehouseInstance.prototype.getConfiguration = function () {
                        return this._dwConfiguration;
                    };
                    DataWarehouseInstance.prototype.getData = function (contextId, analyzerId) {
                        var jsonRequest = null;
                        if(!contextId) {
                            jsonRequest = {
                                analyzerId: analyzerId
                            };
                        } else {
                            jsonRequest = {
                                contextId: contextId,
                                analyzerId: analyzerId
                            };
                        }
                        return this.getDataFromAnalyzer(jsonRequest);
                    };
                    DataWarehouseInstance.prototype.getFilteredData = function (filter, analyzerId) {
                        return this.getDataFromAnalyzer({
                            filter: serializeDhContextData(null, filter),
                            analyzerId: analyzerId
                        });
                    };
                    DataWarehouseInstance.prototype.getContextService = function () {
                        if(!this._contextService) {
                            this._contextService = new DhContextService(this._dwConfiguration.sessionId);
                        }
                        return this._contextService;
                    };
                    DataWarehouseInstance.prototype.getJmcService = function () {
                        if(!this._jmcService) {
                            this._jmcService = new JmcService(this._dwConfiguration.sessionId);
                        }
                        return this._jmcService;
                    };
                    DataWarehouseInstance.prototype.close = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_CLOSE);
                    };
                    DataWarehouseInstance.prototype.closeSynchronous = function () {
                        if((Plugin).F12) {
                            this._controller.requestSync(Constants.ACTION_DATAWAREHOUSE_CLOSE);
                        } else {
                            throw new Error(Plugin.Resources.getErrorString("JSProfiler.1009"));
                        }
                    };
                    DataWarehouseInstance.prototype.initialize = function () {
                        this._logger.debug("Initializing DataWarehouse...");
                        var jsonConfiguration = {
                            analyzers: this._dwConfiguration.analyzers,
                            dataSources: this._dwConfiguration.dataSources,
                            symbolStorePath: this._dwConfiguration.symbolStorePath || "",
                            symbolCachePath: this._dwConfiguration.symbolCachePath || "",
                            isJmcEnabled: (typeof this._dwConfiguration.isJmcEnabled === "undefined") ? true : this._dwConfiguration.isJmcEnabled
                        };
                        this._logger.debug("DataWarehouse configuration: " + JSON.stringify(jsonConfiguration));
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_INITIALIZATION_DEPRECATED, jsonConfiguration);
                    };
                    DataWarehouseInstance.prototype.beginInitialization = function () {
                        this._logger.debug("Begin initializing DataWarehouse");
                        var jsonConfiguration = {
                            analyzers: this._dwConfiguration.analyzers,
                            dataSources: this._dwConfiguration.dataSources,
                            symbolStorePath: this._dwConfiguration.symbolStorePath || "",
                            symbolCachePath: this._dwConfiguration.symbolCachePath || "",
                            isJmcEnabled: (typeof this._dwConfiguration.isJmcEnabled === "undefined") ? true : this._dwConfiguration.isJmcEnabled
                        };
                        this._logger.debug("DataWarehouse configuration: " + JSON.stringify(jsonConfiguration));
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_BEGININITIALIZATION, jsonConfiguration);
                    };
                    DataWarehouseInstance.prototype.endInitialization = function () {
                        this._logger.debug("End initializing DataWarehouse");
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_ENDINITIALIZATION);
                    };
                    DataWarehouseInstance.prototype.getPrivateData = function (dataId, privateDataArg) {
                        this._logger.debug("Getting private data from DataWarehouse...");
                        var privateDataRequest = {
                            id: dataId,
                            dataArg: privateDataArg
                        };
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_GETPRIVATEDATA, privateDataRequest);
                    };
                    DataWarehouseInstance.prototype.setPrivateData = function (dataId, privateData) {
                        this._logger.debug("Setting private data in DataWarehouse...");
                        var privateDataRequest = {
                            id: dataId,
                            data: privateData
                        };
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_SETPRIVATEDATA, privateDataRequest);
                    };
                    DataWarehouseInstance.prototype.getDataFromAnalyzer = function (jsonRequest) {
                        var _this = this;
                        var completePromise;
                        var errorPromise;
                        var progressPromise;
                        var promiseInitialization = function (completed, error, progress) {
                            completePromise = completed;
                            errorPromise = error;
                            progressPromise = progress;
                        };
                        var requestPromise = this._controller.request(Constants.ACTION_DATAWAREHOUSE_GETDATA, jsonRequest).then(function (result) {
                            if(completePromise) {
                                var val = null;
                                if(result !== null && typeof result !== "undefined" && typeof result.dh_r_id === "string" && result.dh_r_id.length === 36) {
                                    val = new DhJsonResult(result.dh_r_id, _this._dwConfiguration.sessionId, _this._controller);
                                } else {
                                    val = result;
                                }
                                completePromise(val);
                            }
                        }.bind(this), function (error) {
                            if(errorPromise) {
                                errorPromise(error);
                            }
                        }.bind(this), function (progress) {
                            if(progress) {
                                progressPromise(progress);
                            }
                        }.bind(this));
                        var oncancel = function () {
                            requestPromise.cancel();
                        };
                        return new Plugin.Promise(promiseInitialization, oncancel);
                    };
                    return DataWarehouseInstance;
                })();                
                function serializeDhContextData(contextId, data) {
                    var result = {
                    };
                    if(contextId) {
                        result["contextId"] = contextId;
                    }
                    if(data.timeDomain) {
                        result["timeDomain"] = {
                            begin: data.timeDomain.begin.jsonValue,
                            end: data.timeDomain.end.jsonValue
                        };
                    }
                    if(data.machineDomain) {
                        result["machineDomain"] = data.machineDomain;
                    }
                    if(data.processDomain) {
                        result["processDomain"] = data.processDomain;
                    }
                    if(data.threadDomain) {
                        result["threadDomain"] = data.threadDomain;
                    }
                    if(data.customDomain) {
                        result["customDomain"] = data.customDomain;
                    }
                    return result;
                }
                var DhContextService = (function () {
                    function DhContextService(sessionId) {
                        this._controller = new DiagnosticsHub.NativeHostController(sessionId, Constants.CONTROLLER_ID_DATAWAREHOUSECONTEXTSERVICE);
                        this._sessionId = sessionId;
                    }
                    DhContextService.prototype.createContext = function (data) {
                        var that = this;
                        var request = {
                        };
                        if(data !== null && typeof data !== "undefined") {
                            request["data"] = serializeDhContextData(null, data);
                        }
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_CREATECONTEXT, request).then(function (contextInfo) {
                            return new DhContext(contextInfo, that._sessionId);
                        });
                    };
                    DhContextService.prototype.deleteContext = function (contextId) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_DELETECONTEXT, {
                            contextId: contextId
                        });
                    };
                    DhContextService.prototype.copyContext = function (contextId) {
                        var that = this;
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_COPYCONTEXT, {
                            contextId: contextId
                        }).then(function (contextInfo) {
                            return new DhContext(contextInfo, that._sessionId);
                        });
                    };
                    DhContextService.prototype.getContext = function (contextId) {
                        var that = this;
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_GETCONTEXT, {
                            contextId: contextId
                        }).then(function (contextInfo) {
                            return new DhContext(contextInfo, that._sessionId);
                        });
                    };
                    DhContextService.prototype.getGlobalContext = function () {
                        var that = this;
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_GETGLOBALCONTEXT).then(function (contextInfo) {
                            return new DhContext(contextInfo, that._sessionId);
                        });
                    };
                    return DhContextService;
                })();                
                var DhContext = (function () {
                    function DhContext(contextInfo, sessionId) {
                        this._info = contextInfo;
                        this._sessionId = sessionId;
                        this._controller = new DiagnosticsHub.NativeHostController(this._sessionId, Constants.CONTROLLER_ID_DATAWAREHOUSECONTEXT);
                    }
                    DhContext.prototype.getContextId = function () {
                        return this._info.contextId;
                    };
                    DhContext.prototype.getParentContextId = function () {
                        return this._info.parentContextId;
                    };
                    DhContext.prototype.setData = function (data) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_SETDATA, serializeDhContextData(this._info.contextId, data));
                    };
                    DhContext.prototype.getData = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETDATA, {
                            contextId: this._info.contextId
                        }).then(function (result) {
                            return {
                                timeDomain: new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(result.timeDomain.begin.h, result.timeDomain.begin.l), new DiagnosticsHub.BigNumber(result.timeDomain.end.h, result.timeDomain.end.l)),
                                machineDomain: result.machineDomain,
                                processDomain: result.processDomain,
                                threadDomain: result.threadDomain,
                                customDomain: result.customDomain
                            };
                        });
                    };
                    DhContext.prototype.getTimeDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETTIMEDOMAIN, {
                            contextId: this._info.contextId
                        }).then(function (result) {
                            return new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(result.begin.h, result.begin.l), new DiagnosticsHub.BigNumber(result.end.h, result.end.l));
                        });
                    };
                    DhContext.prototype.setTimeDomain = function (timeDomain) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_SETTIMEDOMAIN, {
                            contextId: this._info.contextId,
                            timeDomain: {
                                begin: timeDomain.begin.jsonValue,
                                end: timeDomain.end.jsonValue
                            }
                        });
                    };
                    DhContext.prototype.getMachineDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETMACHINEDOMAIN, {
                            contextId: this._info.contextId
                        });
                    };
                    DhContext.prototype.addToMachineDomain = function (machineName) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOMACHINEDOMAIN, {
                            contextId: this._info.contextId,
                            machineName: machineName
                        });
                    };
                    DhContext.prototype.clearMachineDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARMACHINEDOMAIN, {
                            contextId: this._info.contextId
                        });
                    };
                    DhContext.prototype.getProcessDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETPROCESSDOMAIN, {
                            contextId: this._info.contextId
                        });
                    };
                    DhContext.prototype.addToProcessDomain = function (processId) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOPROCESSDOMAIN, {
                            contextId: this._info.contextId,
                            processId: processId
                        });
                    };
                    DhContext.prototype.clearProcessDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARPROCESSDOMAIN, {
                            contextId: this._info.contextId
                        });
                    };
                    DhContext.prototype.getThreadDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETTHREADDOMAIN, {
                            contextId: this._info.contextId
                        });
                    };
                    DhContext.prototype.addToThreadDomain = function (threadId) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOTHREADDOMAIN, {
                            contextId: this._info.contextId,
                            threadId: threadId
                        });
                    };
                    DhContext.prototype.clearThreadDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARTHREADDOMAIN, {
                            contextId: this._info.contextId
                        });
                    };
                    DhContext.prototype.getCustomDomain = function (name) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETCUSTOMDOMAIN, {
                            contextId: this._info.contextId,
                            name: name
                        }).then(function (result) {
                            return result.value;
                        });
                    };
                    DhContext.prototype.setCustomDomain = function (name, value) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_SETCUSTOMDOMAIN, {
                            contextId: this._info.contextId,
                            name: name,
                            value: value
                        });
                    };
                    return DhContext;
                })();                
                var JmcService = (function () {
                    function JmcService(sessionId) {
                        this._controller = new DiagnosticsHub.NativeHostController(sessionId, Constants.CONTROLLER_ID_DATAWAREHOUSEJMCSERVICE);
                        this._logger = DiagnosticsHub.getLogger();
                        this._viewEventManager = Microsoft.VisualStudio.DiagnosticsHub.getViewEventManager();
                    }
                    JmcService.prototype.getJmcEnabledState = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSEJMCSERVICE_GETJMCENABLED).then(this.processGetJmcEnabledStateResult.bind(this));
                    };
                    JmcService.prototype.setJmcEnabledState = function (enabledState) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSEJMCSERVICE_SETJMCENABLED, {
                            jmcOn: enabledState
                        }).then(this.processSetJmcEnabledStateResult.bind(this));
                    };
                    JmcService.prototype.processGetJmcEnabledStateResult = function (result) {
                        if(typeof result.jmcOn === "undefined") {
                            this._logger.error("getJmcEnabledState() result is ill-formed");
                            throw new Error(Plugin.Resources.getErrorString("JSProfiler.9999"));
                        }
                        return result.jmcOn;
                    };
                    JmcService.prototype.processSetJmcEnabledStateResult = function (result) {
                        if(typeof result.prevEnabledState === "undefined" || typeof result.currEnabledState === "undefined") {
                            this._logger.error("setJmcEnabledState() result is ill-formed");
                            throw new Error(Plugin.Resources.getErrorString("JSProfiler.9999"));
                        }
                        if(result.prevEnabledState !== result.currEnabledState) {
                            this._viewEventManager.jmcEnabledStateChanged.raiseEvent(result);
                        }
                    };
                    return JmcService;
                })();                
                var _dwFactory = null;
                function loadDataWarehouse(configuration) {
                    if (typeof configuration === "undefined") { configuration = null; }
                    if(_dwFactory === null) {
                        _dwFactory = new DataWarehouseFactory();
                    }
                    return _dwFactory.getDataWarehouse(configuration);
                }
                DataWarehouse.loadDataWarehouse = loadDataWarehouse;
            })(DiagnosticsHub.DataWarehouse || (DiagnosticsHub.DataWarehouse = {}));
            var DataWarehouse = DiagnosticsHub.DataWarehouse;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (Controllers) {
                "use strict";
                var F12_JMCType;
                (function (F12_JMCType) {
                    F12_JMCType._map = [];
                    F12_JMCType._map[0] = "UserCode";
                    F12_JMCType.UserCode = 0;
                    F12_JMCType._map[1] = "Library";
                    F12_JMCType.Library = 1;
                    F12_JMCType._map[2] = "Unrelated";
                    F12_JMCType.Unrelated = 2;
                    F12_JMCType._map[3] = "Unsure";
                    F12_JMCType.Unsure = 3;
                })(F12_JMCType || (F12_JMCType = {}));
                var JavaScriptJmc = (function () {
                    function JavaScriptJmc() {
                        this._serviceProxy = getVisualStudioService();
                    }
                    JavaScriptJmc.prototype.getJmcTypeForUrls = function (urls) {
                        if((Plugin).F12) {
                            return (Plugin).F12.JMC.getJMCTypeForUrls(urls).then(function (jmcTypes) {
                                if(!jmcTypes) {
                                    return [];
                                }
                                for(var i = 0; i < jmcTypes.length; ++i) {
                                    switch(jmcTypes[i]) {
                                        case F12_JMCType.UserCode:
                                            jmcTypes[i] = 0;
                                            break;
                                        case F12_JMCType.Library:
                                            jmcTypes[i] = 1;
                                            break;
                                        case F12_JMCType.Unrelated:
                                            jmcTypes[i] = 2;
                                            break;
                                        case F12_JMCType.Unsure:
                                        default:
                                            jmcTypes[i] = -1;
                                    }
                                }
                                return jmcTypes;
                            });
                        } else {
                            return this._serviceProxy._call("getJMCTypeForUrls", urls);
                        }
                    };
                    return JavaScriptJmc;
                })();
                Controllers.JavaScriptJmc = JavaScriptJmc;                
                var SolutionService = (function () {
                    function SolutionService() {
                        this._serviceProxy = getVisualStudioService();
                    }
                    SolutionService.prototype.getAllExecutableCodeOutputs = function () {
                        return this._serviceProxy._call("getSolutionExecutableCodeOutputs");
                    };
                    return SolutionService;
                })();
                Controllers.SolutionService = SolutionService;                
                var SourceService = (function () {
                    function SourceService() {
                        this._serviceProxy = getVisualStudioService();
                    }
                    SourceService.prototype.showDocument = function (filename, linenumber) {
                        return this._serviceProxy._call("showDocument", filename, linenumber);
                    };
                    return SourceService;
                })();
                Controllers.SourceService = SourceService;                
                var _visualStudioServiceProxy = null;
                function getVisualStudioService() {
                    if(_visualStudioServiceProxy === null) {
                        _visualStudioServiceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.VisualStudioServiceMarshaler", {
                        }, true);
                    }
                    return _visualStudioServiceProxy;
                }
            })(DiagnosticsHub.Controllers || (DiagnosticsHub.Controllers = {}));
            var Controllers = DiagnosticsHub.Controllers;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            (function (AlternateFormat) {
                AlternateFormat._map = [];
                AlternateFormat.Vspx = 1;
            })(DiagnosticsHub.AlternateFormat || (DiagnosticsHub.AlternateFormat = {}));
            var AlternateFormat = DiagnosticsHub.AlternateFormat;
            var DocumentClosingEventDeferral = (function () {
                function DocumentClosingEventDeferral(onHandlerCompleted) {
                    this._onHandlerCompleted = onHandlerCompleted;
                }
                DocumentClosingEventDeferral.prototype.complete = function (result) {
                    this._onHandlerCompleted(result);
                };
                return DocumentClosingEventDeferral;
            })();
            DiagnosticsHub.DocumentClosingEventDeferral = DocumentClosingEventDeferral;            
            var DocumentClosingEventArgs = (function () {
                function DocumentClosingEventArgs(onHandlerCompleted) {
                    this._waitHandler = false;
                    this._onHandlerCompleted = onHandlerCompleted;
                    this._eventDeferral = null;
                }
                Object.defineProperty(DocumentClosingEventArgs.prototype, "waitHandler", {
                    get: function () {
                        return this._eventDeferral !== null;
                    },
                    enumerable: true,
                    configurable: true
                });
                DocumentClosingEventArgs.prototype.getDeferral = function () {
                    if(this._eventDeferral === null) {
                        this._eventDeferral = new DocumentClosingEventDeferral(this._onHandlerCompleted);
                    }
                    return this._eventDeferral;
                };
                return DocumentClosingEventArgs;
            })();
            DiagnosticsHub.DocumentClosingEventArgs = DocumentClosingEventArgs;            
            var Document = (function () {
                function Document() {
                    this._onCloseHandlers = [];
                    this._documentProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.DocumentPortMarshaler", {
                    }, true);
                    this._logger = DiagnosticsHub.getLogger();
                    this._documentProxy._call("connected").then(function () {
                        this._logger.debug("JavaScript Document object connected to host. Ready to get onClosingEvent.");
                    }.bind(this), function (error) {
                        this._logger.error("Cannot connect DocumentPortMarshaler, error name: '" + error.name + "', error message: '" + error.message + "'");
                    }.bind(this)).then(function () {
                        this._documentProxy.addEventListener("onClosing", function (eventArgs) {
                            this.onClosingHandler();
                        }.bind(this));
                    }.bind(this));
                }
                Document.prototype.getTools = function () {
                    return this._documentProxy._call("getTools");
                };
                Document.prototype.openInAlternateFormat = function (format) {
                    if(format === AlternateFormat.Vspx) {
                        this._logger.debug("Opening current document as a Vspx");
                        return this._documentProxy._call("openAsVspx");
                    }
                    throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                };
                Document.prototype.addOnClosingHandler = function (handler) {
                    this._onCloseHandlers.push(handler);
                    this._logger.debug("New on closing handler was added.");
                };
                Document.prototype.onClosingHandler = function () {
                    this._logger.debug("Invoking JavaScript handlers for document on closing event.");
                    var finalResult = true;
                    var handlersCount = 0;
                    var onCompleted = function (handlerResult) {
                        finalResult = finalResult && handlerResult;
                        handlersCount--;
                        if(handlersCount <= 0) {
                            this._documentProxy._call("onClosingCompleted", finalResult);
                        } else {
                            this._logger.debug("Still waiting when all on closing handlers will complete their work. Handlers count: " + handlersCount);
                        }
                    }.bind(this);
                    for(var propertyName in this._onCloseHandlers) {
                        if(this._onCloseHandlers.hasOwnProperty(propertyName)) {
                            var handler = this._onCloseHandlers[propertyName];
                            if(typeof handler === "function") {
                                try  {
                                    var jsEventArgs = new DocumentClosingEventArgs(onCompleted);
                                    handler(jsEventArgs);
                                    if(jsEventArgs.waitHandler) {
                                        handlersCount++;
                                        this._logger.debug("JavaScipt handlers for on closing asked to wait while they will finish. Handlers count: " + handlersCount);
                                    }
                                } catch (e) {
                                    this._logger.error(e.toString());
                                }
                            } else {
                                this._logger.warning("One of the listeners not a 'function', it has type " + (typeof handler));
                            }
                        }
                    }
                    if(handlersCount === 0) {
                        onCompleted(finalResult);
                    }
                };
                return Document;
            })();            
            var _currentDocument = null;
            function getCurrentDocument() {
                if(_currentDocument === null) {
                    _currentDocument = new Document();
                }
                return _currentDocument;
            }
            DiagnosticsHub.getCurrentDocument = getCurrentDocument;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (Sqm) {
                "use strict";
                var CpuUsage = (function () {
                    function CpuUsage() {
                        this._isSetCreateDetailedReport = false;
                        this._isSetSearchIsUsed = false;
                        this._isSetSearchOptionsChanged = false;
                        this._serviceProxy = getSqmService();
                    }
                    CpuUsage.prototype.filterViewOpen = function () {
                        this._serviceProxy._call("cpuUsageCountFilterViewOpen");
                    };
                    CpuUsage.prototype.createDetailedReport = function () {
                        if(!this._isSetCreateDetailedReport) {
                            this._isSetCreateDetailedReport = true;
                            this._serviceProxy._call("cpuUsageSetCreateDetailedReport");
                        }
                    };
                    CpuUsage.prototype.searchIsUsed = function () {
                        if(!this._isSetSearchIsUsed) {
                            this._isSetSearchIsUsed = true;
                            this._serviceProxy._call("cpuUsageSetSearchIsUsed");
                        }
                    };
                    CpuUsage.prototype.searchOptionsChanged = function () {
                        if(!this._isSetSearchOptionsChanged) {
                            this._isSetSearchOptionsChanged = true;
                            this._serviceProxy._call("cpuUsageSetSearchOptionsChanged");
                        }
                    };
                    CpuUsage.prototype.jmcToggle = function (state) {
                        this._serviceProxy._call("countJmcToggle", state);
                    };
                    return CpuUsage;
                })();
                Sqm.CpuUsage = CpuUsage;                
                (function (SelectionChangeSource) {
                    SelectionChangeSource._map = [];
                    SelectionChangeSource.SwimLane = 0;
                    SelectionChangeSource.DoubleSlider = 1;
                    SelectionChangeSource.DoubleSliderHandles = 2;
                })(Sqm.SelectionChangeSource || (Sqm.SelectionChangeSource = {}));
                var SelectionChangeSource = Sqm.SelectionChangeSource;
                var Ruler = (function () {
                    function Ruler() {
                        this._serviceProxy = getSqmService();
                    }
                    Ruler.prototype.zoomIn = function () {
                        this._serviceProxy._call("rulerCountZoomIn");
                    };
                    Ruler.prototype.resetZoom = function () {
                        this._serviceProxy._call("rulerCountResetZoom");
                    };
                    Ruler.prototype.clearSelection = function () {
                        this._serviceProxy._call("rulerCountClearSelection");
                    };
                    Ruler.prototype.selectionChanged = function (source, isMinSize) {
                        this._serviceProxy._call("rulerCountSelectionChanged", source, isMinSize);
                    };
                    return Ruler;
                })();
                Sqm.Ruler = Ruler;                
                var CollectedData = (function () {
                    function CollectedData() {
                        this._serviceProxy = getSqmService();
                    }
                    CollectedData.prototype.lostEvents = function (counter) {
                        this._serviceProxy._call("countLostEvents", counter);
                    };
                    return CollectedData;
                })();
                Sqm.CollectedData = CollectedData;                
                var _sqmServiceProxy = null;
                function getSqmService() {
                    if(_sqmServiceProxy === null) {
                        _sqmServiceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.SqmServiceMarshaler", {
                        }, true);
                    }
                    return _sqmServiceProxy;
                }
            })(DiagnosticsHub.Sqm || (DiagnosticsHub.Sqm = {}));
            var Sqm = DiagnosticsHub.Sqm;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var TimeStamp = (function () {
                function TimeStamp(nsec) {
                    if (typeof nsec === "undefined") { nsec = 0; }
                    this._nsec = nsec;
                }
                TimeStamp.NanosecInMillisec = 1000 * 1000;
                TimeStamp.NanosecInSec = 1000 * 1000 * 1000;
                Object.defineProperty(TimeStamp.prototype, "nsec", {
                    get: function () {
                        return this._nsec;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeStamp.prototype, "msec", {
                    get: function () {
                        return this._nsec / TimeStamp.NanosecInMillisec;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeStamp.prototype, "sec", {
                    get: function () {
                        return this._nsec / TimeStamp.NanosecInSec;
                    },
                    enumerable: true,
                    configurable: true
                });
                TimeStamp.fromNanoseconds = function fromNanoseconds(nsec) {
                    return new TimeStamp(nsec);
                };
                TimeStamp.fromMilliseconds = function fromMilliseconds(msec) {
                    return new TimeStamp(msec * TimeStamp.NanosecInMillisec);
                };
                TimeStamp.fromSeconds = function fromSeconds(sec) {
                    return new TimeStamp(sec * TimeStamp.NanosecInSec);
                };
                TimeStamp.prototype.equals = function (other) {
                    return this._nsec === other.nsec;
                };
                return TimeStamp;
            })();
            DiagnosticsHub.TimeStamp = TimeStamp;            
            var TimeSpan = (function () {
                function TimeSpan(begin, end) {
                    if (typeof begin === "undefined") { begin = new TimeStamp(); }
                    if (typeof end === "undefined") { end = new TimeStamp(); }
                    this._begin = begin;
                    this._end = end;
                    if(this._begin.nsec > this._end.nsec) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
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
            DiagnosticsHub.TimeSpan = TimeSpan;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var SelectionTimeRangeChangedEvent = (function () {
                function SelectionTimeRangeChangedEvent() {
                    this._publisher = new DiagnosticsHub.Publisher([
                        SelectionTimeRangeChangedEvent.EventName
                    ]);
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._eventAggregator.addEventListener(SelectionTimeRangeChangedEvent.EventGlobalName, this.forwardSelectionTimeRangeEvent.bind(this));
                    this._timeRangeMarshaler = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.SwimlaneDataServiceMarshaler", {
                    }, true);
                    if(!this._timeRangeMarshaler) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1007"));
                    }
                }
                SelectionTimeRangeChangedEvent.EventGlobalName = "DiagnosticsHub.EventAggregator.SelectionTimeRangeChanged";
                SelectionTimeRangeChangedEvent.EventName = "DiagnosticsHub.SelectionTimeRangeChanged";
                SelectionTimeRangeChangedEvent.prototype.addEventListener = function (listener) {
                    this._publisher.addEventListener(SelectionTimeRangeChangedEvent.EventName, listener);
                };
                SelectionTimeRangeChangedEvent.prototype.removeEventListener = function (listener) {
                    this._publisher.removeEventListener(SelectionTimeRangeChangedEvent.EventName, listener);
                };
                SelectionTimeRangeChangedEvent.prototype.raiseEvent = function (eventArgs) {
                    this.setTimeRange(eventArgs.position);
                    var dto = {
                        isIntermittent: eventArgs.isIntermittent,
                        invoker: eventArgs.invoker,
                        beginH: eventArgs.position.begin.jsonValue.h,
                        beginL: eventArgs.position.begin.jsonValue.l,
                        endH: eventArgs.position.end.jsonValue.h,
                        endL: eventArgs.position.end.jsonValue.l
                    };
                    this._eventAggregator.raiseEvent(SelectionTimeRangeChangedEvent.EventGlobalName, dto);
                };
                SelectionTimeRangeChangedEvent.prototype.getTimeRange = function (func) {
                    var currentTimeRange;
                    this._timeRangeMarshaler._call("getCurrentTimeRange").done(function (time) {
                        if(time && time.begin && time.end) {
                            currentTimeRange = new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(time.begin._value.h, time.begin._value.l), new DiagnosticsHub.BigNumber(time.end._value.h, time.end._value.l));
                            if(func) {
                                func(currentTimeRange);
                            }
                        }
                    });
                };
                SelectionTimeRangeChangedEvent.prototype.setTimeRange = function (time) {
                    this._timeRangeMarshaler._call("setCurrentTimeRange", time);
                };
                SelectionTimeRangeChangedEvent.prototype.forwardSelectionTimeRangeEvent = function (dto) {
                    var selectionTimeRange = new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(dto.beginH, dto.beginL), new DiagnosticsHub.BigNumber(dto.endH, dto.endL));
                    var args = {
                        position: selectionTimeRange,
                        isIntermittent: dto.isIntermittent,
                        invoker: dto.invoker
                    };
                    this._publisher.invokeListener(SelectionTimeRangeChangedEvent.EventName, args);
                };
                return SelectionTimeRangeChangedEvent;
            })();            
            var JmcEnabledStateChangedEvent = (function () {
                function JmcEnabledStateChangedEvent() {
                    this._publisher = new DiagnosticsHub.Publisher([
                        JmcEnabledStateChangedEvent.EventName
                    ]);
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._eventAggregator.addEventListener(JmcEnabledStateChangedEvent.EventGlobalName, this.forwardJmcEnabledStateChangedEvent.bind(this));
                }
                JmcEnabledStateChangedEvent.EventGlobalName = "DiagnosticsHub.EventAggregator.JmcEnabledStateChanged";
                JmcEnabledStateChangedEvent.EventName = "DiagnosticsHub.JmcEnabledStateChanged";
                JmcEnabledStateChangedEvent.prototype.addEventListener = function (listener) {
                    this._publisher.addEventListener(JmcEnabledStateChangedEvent.EventName, listener);
                };
                JmcEnabledStateChangedEvent.prototype.removeEventListener = function (listener) {
                    this._publisher.removeEventListener(JmcEnabledStateChangedEvent.EventName, listener);
                };
                JmcEnabledStateChangedEvent.prototype.raiseEvent = function (args) {
                    this._eventAggregator.raiseEvent(JmcEnabledStateChangedEvent.EventGlobalName, args);
                };
                JmcEnabledStateChangedEvent.prototype.forwardJmcEnabledStateChangedEvent = function (args) {
                    this._publisher.invokeListener(JmcEnabledStateChangedEvent.EventName, args);
                };
                return JmcEnabledStateChangedEvent;
            })();            
            var DetailsViewSelectionChangedEvent = (function () {
                function DetailsViewSelectionChangedEvent() {
                    this._publisher = new DiagnosticsHub.Publisher([
                        DetailsViewSelectionChangedEvent.EventName
                    ]);
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._eventAggregator.addEventListener(DetailsViewSelectionChangedEvent.EventGlobalName, this.forwardDetailsViewSelectionChangedEvent.bind(this));
                }
                DetailsViewSelectionChangedEvent.EventGlobalName = "DiagnosticsHub.EventAggregator.DetailsViewSelectionChangedEvent";
                DetailsViewSelectionChangedEvent.EventName = "DiagnosticsHub.DetailsViewSelectionChangedEvent";
                DetailsViewSelectionChangedEvent.prototype.addEventListener = function (listener) {
                    this._publisher.addEventListener(DetailsViewSelectionChangedEvent.EventName, listener);
                };
                DetailsViewSelectionChangedEvent.prototype.removeEventListener = function (listener) {
                    this._publisher.removeEventListener(DetailsViewSelectionChangedEvent.EventName, listener);
                };
                DetailsViewSelectionChangedEvent.prototype.raiseEvent = function (args) {
                    this._eventAggregator.raiseEvent(DetailsViewSelectionChangedEvent.EventGlobalName, args);
                };
                DetailsViewSelectionChangedEvent.prototype.forwardDetailsViewSelectionChangedEvent = function (args) {
                    this._publisher.invokeListener(DetailsViewSelectionChangedEvent.EventName, args);
                };
                return DetailsViewSelectionChangedEvent;
            })();            
            var DetailsViewReadyEvent = (function () {
                function DetailsViewReadyEvent() {
                    this._publisher = new DiagnosticsHub.Publisher([
                        DetailsViewReadyEvent.EventName
                    ]);
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._eventAggregator.addEventListener(DetailsViewReadyEvent.EventGlobalName, this.forwardDetailsViewSelectionChangedEvent.bind(this));
                }
                DetailsViewReadyEvent.EventGlobalName = "DiagnosticsHub.EventAggregator.DetailsViewReadyEvent";
                DetailsViewReadyEvent.EventName = "DiagnosticsHub.DetailsViewReadyEvent";
                DetailsViewReadyEvent.prototype.addEventListener = function (listener) {
                    this._publisher.addEventListener(DetailsViewReadyEvent.EventName, listener);
                };
                DetailsViewReadyEvent.prototype.removeEventListener = function (listener) {
                    this._publisher.removeEventListener(DetailsViewReadyEvent.EventName, listener);
                };
                DetailsViewReadyEvent.prototype.raiseEvent = function (args) {
                    this._eventAggregator.raiseEvent(DetailsViewReadyEvent.EventGlobalName, args);
                };
                DetailsViewReadyEvent.prototype.forwardDetailsViewSelectionChangedEvent = function (args) {
                    this._publisher.invokeListener(DetailsViewReadyEvent.EventName, args);
                };
                return DetailsViewReadyEvent;
            })();            
            var ViewEventManager = (function () {
                function ViewEventManager() {
                    this._selectionChanged = new SelectionTimeRangeChangedEvent();
                    this._jmcEnabledStateChanged = new JmcEnabledStateChangedEvent();
                    this._detailsViewSelectionChangedEvent = new DetailsViewSelectionChangedEvent();
                    this._detailsViewReady = new DetailsViewReadyEvent();
                }
                Object.defineProperty(ViewEventManager.prototype, "selectionChanged", {
                    get: function () {
                        return this._selectionChanged;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewEventManager.prototype, "jmcEnabledStateChanged", {
                    get: function () {
                        return this._jmcEnabledStateChanged;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewEventManager.prototype, "detailsViewSelectionChanged", {
                    get: function () {
                        return this._detailsViewSelectionChangedEvent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewEventManager.prototype, "detailsViewReady", {
                    get: function () {
                        return this._detailsViewReady;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ViewEventManager;
            })();            
            var _viewEventManager = null;
            function getViewEventManager() {
                if(_viewEventManager === null) {
                    _viewEventManager = new ViewEventManager();
                }
                return _viewEventManager;
            }
            DiagnosticsHub.getViewEventManager = getViewEventManager;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var ErrorCodes = (function () {
                function ErrorCodes() { }
                ErrorCodes.VSHUB_E_INVALID_REGEX = 0xE111E001;
                return ErrorCodes;
            })();
            DiagnosticsHub.ErrorCodes = ErrorCodes;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var Automation = (function () {
                function Automation(logger) {
                    this._postFilters = {
                    };
                    this._preFilters = {
                    };
                    this._alertFilters = {
                    };
                    this._confirmationFilters = {
                    };
                    this._logger = logger;
                }
                Automation.prototype.getAutomationPromise = function (key, promiseFunc, oncancel, args) {
                    var postFilter = this._postFilters[key];
                    var preFilter = this._preFilters[key];
                    this._logger.debug("getting automation promise for key '" + key + "'");
                    var currentPromise = null;
                    if(preFilter) {
                        currentPromise = this.getPreFilterPromise(preFilter, args);
                        if(postFilter) {
                            currentPromise = currentPromise.then(function () {
                                return this.getPostFilterPromise(postFilter, promiseFunc, oncancel, args);
                            }.bind(this), function (error) {
                                this._logger.debug("Error '" + JSON.stringify(error) + "' while executing prefiler'");
                            }.bind(this));
                        } else {
                            currentPromise = currentPromise.then(function () {
                                return new Plugin.Promise(function (comp, err, prog) {
                                    promiseFunc(comp, err, prog, args);
                                }, oncancel);
                            }, function (error) {
                                this._logger.debug("Error '" + JSON.stringify(error) + "' while executing prefiler'");
                            }.bind(this));
                        }
                    } else {
                        if(postFilter) {
                            this._logger.debug("only injecting postFilter");
                            currentPromise = this.getPostFilterPromise(postFilter, promiseFunc, oncancel, args);
                        } else {
                            this._logger.debug("not injecting any filters");
                            currentPromise = new Plugin.Promise(function (comp, err, prog) {
                                promiseFunc(comp, err, prog, args);
                            }.bind(this), oncancel);
                        }
                    }
                    return currentPromise;
                };
                Automation.prototype.getAlertPromise = function (key, message) {
                    var alertFilter = this._alertFilters[key];
                    if(!alertFilter) {
                        return new Plugin.Promise(function (comp, err, prog) {
                            window.alert(message);
                            comp(true);
                        });
                    } else {
                        return alertFilter.bypass(message);
                    }
                };
                Automation.prototype.getConfirmationPromise = function (key, message) {
                    var confirmationFilter = this._confirmationFilters[key];
                    if(!confirmationFilter) {
                        return new Plugin.Promise(function (comp, err, prog) {
                            comp(window.confirm(message));
                        });
                    } else {
                        return confirmationFilter.bypass(message);
                    }
                };
                Automation.prototype.addAutomationPostFilter = function (key, filter) {
                    this.addAutomationFilter(this._postFilters, key, "IAutomationPostFilter", filter);
                };
                Automation.prototype.removeAutomationPostFilter = function (key) {
                    this.removeAutomationFilter(this._postFilters, key, "IAutomationPostFilter");
                };
                Automation.prototype.addAutomationPreFilter = function (key, filter) {
                    this.addAutomationFilter(this._preFilters, key, "IAutomationPreFilter", filter);
                };
                Automation.prototype.removeAutomationPreFilter = function (key) {
                    this.removeAutomationFilter(this._preFilters, key, "IAutomationPreFilter");
                };
                Automation.prototype.addAutomationAlertBypassFilter = function (key, filter) {
                    this.addAutomationFilter(this._alertFilters, key, "IAutomationAlertBypassFilter", filter);
                };
                Automation.prototype.removeIAutomationAlertBypassFilter = function (key) {
                    this.removeAutomationFilter(this._alertFilters, key, "IAutomationAlertBypassFilter");
                };
                Automation.prototype.addAutomationConfirmationBypassFilter = function (key, filter) {
                    this.addAutomationFilter(this._confirmationFilters, key, "IAutomationConfirmationBypassFilter", filter);
                };
                Automation.prototype.removeAutomationConfirmationBypassFilter = function (key) {
                    this.removeAutomationFilter(this._confirmationFilters, key, "IAutomationConfirmationBypassFilter");
                };
                Automation.prototype.getPreFilterPromise = function (preFilter, args) {
                    if(preFilter) {
                        return preFilter.onFilter(args);
                    }
                    throw "preFilter is null or undefined";
                };
                Automation.prototype.removeAutomationFilter = function (filterStore, key, automationFilterType) {
                    if(!key) {
                        throw new Error("key is null, undefined or evaluates to false");
                    }
                    if(!filterStore) {
                        throw new Error("key is null, undefined or evaluates to false");
                    }
                    if(!automationFilterType) {
                        throw new Error("automationFilterType is null, undefined or evaluates to false");
                    }
                    delete filterStore[key];
                    this._logger.debug(automationFilterType + " with key '" + key + "' has been removed");
                };
                Automation.prototype.addAutomationFilter = function (filterStore, key, automationFilterType, filter) {
                    if(!filterStore) {
                        throw new Error("filterStore is null or undefined");
                    }
                    if(!filter) {
                        throw new Error("filter is null or undefined");
                    }
                    if(!key) {
                        throw new Error("key is null, undefined or evaluates to false");
                    }
                    if(!automationFilterType) {
                        throw new Error("automationFilterType is null, undefined or evaluates to false");
                    }
                    if(filterStore[key]) {
                        this._logger.debug("Replacing existing " + automationFilterType + " with key '" + key + "'");
                    }
                    filterStore[key] = filter;
                    this._logger.debug(automationFilterType + " with key '" + key + "' has been added");
                };
                Automation.prototype.getPostFilterPromise = function (filter, promiseFunc, oncancel, args) {
                    var that = this;
                    return new Plugin.Promise(function (complete, err, prog) {
                        var filterComplete = function (value) {
                            that._logger.debug("filterComplete called");
                            return filter.onComplete(value, args).then(function () {
                                complete(value);
                            }, function () {
                                that._logger.error("error occured during exection of postfilter onComplete handler");
                            });
                        };
                        var filterError = function (value) {
                            return filter.onError(value, args).then(function () {
                                err(value);
                            }, function () {
                                that._logger.error("error occured during exection of postfilter onError handler");
                            });
                        };
                        var filterProgress = function (value) {
                            return filter.onProgress(value, args).then(function () {
                                prog(value);
                            }, function () {
                                that._logger.error("error occured during exection of postfilter onProgess handler");
                            });
                        };
                        promiseFunc(filterComplete, filterError, filterProgress, args);
                    }, oncancel);
                };
                return Automation;
            })();            
            var automationManager = null;
            function getAutomationManager(logger) {
                if(automationManager === null) {
                    automationManager = new Automation(logger);
                }
                return automationManager;
            }
            DiagnosticsHub.getAutomationManager = getAutomationManager;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));

// SIG // Begin signature block
// SIG // MIIapwYJKoZIhvcNAQcCoIIamDCCGpQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFCdaDpN9uo/e
// SIG // 0ndewcDKOMFEI9YkoIIVejCCBLswggOjoAMCAQICEzMA
// SIG // AABa7S/05CCZPzoAAAAAAFowDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE0MDUyMzE3
// SIG // MTMxNVoXDTE1MDgyMzE3MTMxNVowgasxCzAJBgNVBAYT
// SIG // AlVTMQswCQYDVQQIEwJXQTEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MQ0wCwYDVQQLEwRNT1BSMScwJQYDVQQLEx5uQ2lwaGVy
// SIG // IERTRSBFU046QjhFQy0zMEE0LTcxNDQxJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2UwggEi
// SIG // MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzISLf
// SIG // atC/+ynJ1Wx6iamNE7yUtel9KWXaf/Qfqwx5YWZUYZYH
// SIG // 8NRgSzGbCa99KG3QpXuHX3ah0sYpx5Y6o18XjHbgt5YH
// SIG // D8diYbS2qvZGFCkDLiawHUoI4H3TXDASppv2uQ49UxZp
// SIG // nbtlJ0LB6DI1Dvcp/95bIEy7L2iEJA+rkcTzzipeWEbt
// SIG // qUW0abZUJpESYv1vDuTP+dw/2ilpH0qu7sCCQuuCc+lR
// SIG // UxG/3asdb7IKUHgLg+8bCLMbZ2/TBX2hCZ/Cd4igo1jB
// SIG // T/9n897sx/Uz3IpFDpZGFCiHHGC39apaQExwtWnARsjU
// SIG // 6OLFkN4LZTXUVIDS6Z0gVq/U3825AgMBAAGjggEJMIIB
// SIG // BTAdBgNVHQ4EFgQUvmfgLgIbrwpyDTodf4ydayJmEfcw
// SIG // HwYDVR0jBBgwFoAUIzT42VJGcArtQPt2+7MrsMM1sw8w
// SIG // VAYDVR0fBE0wSzBJoEegRYZDaHR0cDovL2NybC5taWNy
// SIG // b3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljcm9z
// SIG // b2Z0VGltZVN0YW1wUENBLmNybDBYBggrBgEFBQcBAQRM
// SIG // MEowSAYIKwYBBQUHMAKGPGh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljcm9zb2Z0VGltZVN0
// SIG // YW1wUENBLmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDAN
// SIG // BgkqhkiG9w0BAQUFAAOCAQEAIFOCkK6mTU5+M0nIs63E
// SIG // w34V0BLyDyeKf1u/PlTqQelUAysput1UiLu599nOU+0Q
// SIG // Fj3JRnC0ANHyNF2noyIsqiLha6G/Dw2H0B4CG+94tokg
// SIG // 0CyrC3Q4LqYQ/9qRqyxAPCYVqqzews9KkwPNa+Kkspka
// SIG // XUdE8dyCH+ZItKZpmcEu6Ycj6gjSaeZi33Hx6yO/IWX5
// SIG // pFfEky3bFngVqj6i5IX8F77ATxXbqvCouhErrPorNRZu
// SIG // W3P+MND7q5Og3s1C2jY/kffgN4zZB607J7v/VCB3xv0R
// SIG // 6RrmabIzJ6sFrliPpql/XRIRaAwsozEWDb4hq5zwrhp8
// SIG // QNXWgxYV2Cj75TCCBOwwggPUoAMCAQICEzMAAADKbNUy
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
// SIG // E6P9MYIEmTCCBJUCAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBsjAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUHr1oA17qI5cmG/Luk7dt
// SIG // 5oYhSMcwUgYKKwYBBAGCNwIBDDFEMEKgKIAmAEQAaQBh
// SIG // AGcAbgBvAHMAdABpAGMAcwBIAHUAYgBfADYALgBqAHOh
// SIG // FoAUaHR0cDovL21pY3Jvc29mdC5jb20wDQYJKoZIhvcN
// SIG // AQEBBQAEggEAbcqjd/senHVvmGuAsWPiqdispE51yCzB
// SIG // EAZVPP5R3w/7k5NNHRuFFzWWYJpzDFPnzW9op0Ikf2cF
// SIG // DcELVf73H7aOF5M9KC0OxSAqZsPau/GkL+DIUHq0Rakk
// SIG // J45DFvPPNPmVUA8HbG1WZyvmEdlmWmrtUTKY5jcGKnNg
// SIG // poVXpb0cld2+aQx3SHG2bbtDcGj6duYIvOT71sTaBaGG
// SIG // GpelXAvXOt/0+6OTVKg5W8TSwy67EGYABNFrnJKtbmYK
// SIG // btINinIykliOrvsYD/snCxwl+PhEiXi94NLlQFY3HbLb
// SIG // gIaj41CxcQGepLReqJIm6FE9cgTdJx9WY74FUDgiwQl4
// SIG // GKGCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIBATCB
// SIG // jjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQDExhN
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABa7S/0
// SIG // 5CCZPzoAAAAAAFowCQYFKw4DAhoFAKBdMBgGCSqGSIb3
// SIG // DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8X
// SIG // DTE0MTEwMTA3MjU0OFowIwYJKoZIhvcNAQkEMRYEFKRY
// SIG // L5xIqZuY0fPrsfFG78tLXC1FMA0GCSqGSIb3DQEBBQUA
// SIG // BIIBAKlSWqt2mg5I+Mgql1rfVE/eu86zv5Yfslsv/Fmt
// SIG // F8mCfZn7m8OS2fn8H//uwfY2RyNaTsCunWu8Vzn8UJ5x
// SIG // Ev/xd/emsrqGNMvB3z2nBokK0OS9LMt4qBTnfoAg3Yx8
// SIG // 3l0YrJwD4DIGyMUuTkRJUBBQ9V+7F73Uzcmk7WB8V4Y1
// SIG // +1S8vQtBiqq4myUIp9wUohXHmLcceC16uz9xnFT/l8Mq
// SIG // h0Ib2abQcuFFZYTL09xWW9YB/fHXksVUBTjjO+e3j/Ev
// SIG // m4EfjjLTPEwekR7lWCFyylFuNpOiPVXkSqJ0h9x4F3yc
// SIG // p3fUiecoTEQVoag0jhWjcG2S51DEgh142fRVc0Y=
// SIG // End signature block
