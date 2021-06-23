//
// Copyright (c) Microsoft Corporation.  All rights reserved.
//
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";

            

            

            

            

            

            var Automation = (function () {
                function Automation(logger) {
                    this._postFilters = {};
                    this._preFilters = {};
                    this._alertFilters = {};
                    this._confirmationFilters = {};
                    this._logger = logger;
                }
                Automation.prototype.getAutomationPromise = function (key, promiseFunc, oncancel, args) {
                    var postFilter = this._postFilters[key];
                    var preFilter = this._preFilters[key];
                    this._logger.debug("getting automation promise for key '" + key + "'");
                    var currentPromise = null;

                    if (preFilter) {
                        currentPromise = this.getPreFilterPromise(preFilter, args);
                        if (postFilter) {
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
                        if (postFilter) {
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
                    if (!alertFilter) {
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
                    if (!confirmationFilter) {
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
                    if (preFilter) {
                        return preFilter.onFilter(args);
                    }

                    throw "preFilter is null or undefined";
                };

                Automation.prototype.removeAutomationFilter = function (filterStore, key, automationFilterType) {
                    if (!key) {
                        throw new Error("key is null, undefined or evaluates to false");
                    }

                    if (!filterStore) {
                        throw new Error("key is null, undefined or evaluates to false");
                    }

                    if (!automationFilterType) {
                        throw new Error("automationFilterType is null, undefined or evaluates to false");
                    }

                    delete filterStore[key];
                    this._logger.debug(automationFilterType + " with key '" + key + "' has been removed");
                };

                Automation.prototype.addAutomationFilter = function (filterStore, key, automationFilterType, filter) {
                    if (!filterStore) {
                        throw new Error("filterStore is null or undefined");
                    }

                    if (!filter) {
                        throw new Error("filter is null or undefined");
                    }

                    if (!key) {
                        throw new Error("key is null, undefined or evaluates to false");
                    }

                    if (!automationFilterType) {
                        throw new Error("automationFilterType is null, undefined or evaluates to false");
                    }

                    if (filterStore[key]) {
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
                if (automationManager === null) {
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
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            

            var Logger = (function () {
                function Logger() {
                    this._loggerProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.LoggerPortMarshaler", {}, true);

                    /*
                    The code that follows allows us to dynamically inject our test loader code. In order for this to happen
                    we need a way of ensuring this javascript code is always executed. Seeing that the logger is always present,
                    this is the best location for this code. In the case we are not under test, the portmarshaler will not be found
                    and execution will continue as normal.
                    */
                    var that = this;
                    try  {
                        var apex = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.Test.Apex.DiagnosticsHub.ApexJSExtension", {}, true);
                        if (apex !== null) {
                            apex._call("getApexJavaScript").done(function (result) {
                                if (result) {
                                    that.debug("got apex javascript files");
                                    var scriptObj = document.createElement("script");
                                    scriptObj.setAttribute("type", "text/javascript");
                                    scriptObj.setAttribute("src", result);
                                    var head = document.getElementsByTagName("head");
                                    if (!head) {
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
                if (_logger === null) {
                    _logger = new Logger();
                }

                return _logger;
            }
            DiagnosticsHub.getLogger = getLogger;

            // Initialization step
            Plugin.addEventListener("pluginready", function () {
                getLogger();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="Logger.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            var DiagnosticsHubNativeHost = (function () {
                function DiagnosticsHubNativeHost(logger) {
                    this._externalObject = null;
                    this._logger = logger;

                    // Determine where the scriptedsandbox is being hosted (F12 or VS).
                    var hostObj = Plugin.F12 || Plugin.VS;
                    if (!hostObj) {
                        this._logger.error("External object creator does not exist");
                        throw "Unable to determine the ScriptedSandbox host";
                    }

                    this._externalObject = hostObj.Utilities.createExternalObject("DiagnosticsHub.DataWarehouseHost", "{339B3787-FC17-4BF5-A0DC-CBEF24DB2EDE}");
                    this._automationManager = DiagnosticsHub.getAutomationManager(this._logger);
                }
                DiagnosticsHubNativeHost.prototype.requestSync = function (controllerId, actionId, sessionId, request) {
                    if (this._externalObject) {
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
                    };

                    var result = null;
                    var response = null;
                    var oncancel = function () {
                        if (_this._externalObject && _this._externalObject.cancel && response && response.requestId) {
                            _this._externalObject.cancel(response.requestId);
                        }
                    };

                    var dispatchCallback = function (promiseHandler, jsonResponse, promiseType) {
                        if (promiseHandler !== null) {
                            var result = null;

                            if (jsonResponse !== null) {
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
                        if (_this._externalObject) {
                            result = _this._externalObject.request(controllerId, actionId, sessionId, (typeof request === "string") ? request : (request !== null && (typeof request !== "undefined")) ? JSON.stringify(request) : "", function (jsonResponse) {
                                dispatchCallback(completePromise, jsonResponse, "completePromise");
                            }, function (jsonResponse) {
                                dispatchCallback(errorPromise, jsonResponse, "errorPromise");
                            }, function (jsonResponse) {
                                dispatchCallback(progressPromise, jsonResponse, "progressPromise");
                            });
                        } else {
                            that._logger.warning("External object is null. Verify that DiagnosticsHub.ScriptedSandboxPlugin.dll was loaded into ScriptedSandbox.");
                        }

                        if (result === null || typeof result !== "string") {
                            response = { hresult: 1 }; /* S_FALSE */
                        } else {
                            response = JSON.parse(result);
                        }

                        if (response.hresult !== 0) {
                            _this._logger.error("Could not invoke request method of native host: " + result);

                            var error = new Error();
                            error.message = error.name = response.hresult.toString(16);
                            errorPromise(error);
                        }
                    };

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
                if (_host === null) {
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
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="Logger.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            

            // ---------------------------------------------------
            // Session states enumeration
            // ---------------------------------------------------
            // this enum should be in sync with enum in managed code
            (function (SessionState) {
                /// Unknown state
                SessionState[SessionState["Unknown"] = 0] = "Unknown";

                /// The session created and initialized.
                SessionState[SessionState["Created"] = 100] = "Created";

                /// Collection starting.
                SessionState[SessionState["SetupTargets"] = 150] = "SetupTargets";

                /// Collection starting.
                SessionState[SessionState["CollectionStarting"] = 200] = "CollectionStarting";

                /// Collection started.
                SessionState[SessionState["CollectionStarted"] = 300] = "CollectionStarted";

                /// Collection is going to be paused.
                SessionState[SessionState["CollectionPausing"] = 325] = "CollectionPausing";

                /// Termination of pause task.
                SessionState[SessionState["CollectionPauseCanceling"] = 330] = "CollectionPauseCanceling";

                /// Collection is paused.
                SessionState[SessionState["CollectionPaused"] = 350] = "CollectionPaused";

                /// Collection is going to be un paused.
                SessionState[SessionState["CollectionResuming"] = 375] = "CollectionResuming";

                /// Termination of resuming task.
                SessionState[SessionState["CollectionResumeCanceling"] = 380] = "CollectionResumeCanceling";

                /// Collection finishing.
                SessionState[SessionState["CollectionFinishing"] = 400] = "CollectionFinishing";

                /// Collection finished.
                SessionState[SessionState["CollectionFinished"] = 500] = "CollectionFinished";

                /// Diagnostics Hub analyzing data.
                SessionState[SessionState["Analyzing"] = 530] = "Analyzing";

                /// Data analyzing is finished.
                SessionState[SessionState["AnalyzingFinished"] = 560] = "AnalyzingFinished";

                /// The collection terminating.
                SessionState[SessionState["CollectionTerminating"] = 600] = "CollectionTerminating";

                /// The collection terminated.
                SessionState[SessionState["CollectionTerminated"] = 700] = "CollectionTerminated";

                /// Cannot start collection (one of the targets).
                SessionState[SessionState["CollectionStartFailed"] = 10000] = "CollectionStartFailed";

                /// Start collection terminated.
                SessionState[SessionState["CollectionStartCanceling"] = 10100] = "CollectionStartCanceling";

                /// Cannot stop collection (one of the targets).
                SessionState[SessionState["CollectionFinishFailed"] = 20000] = "CollectionFinishFailed";

                /// Stop collection canceled (one of the targets).
                SessionState[SessionState["CollectionFinishCanceling"] = 20100] = "CollectionFinishCanceling";
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
                function StateChangedEventArgs(eventArgs /* from managed code */ , onHandlerCompleted) {
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
                    if (this._eventDeferral === null) {
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
                    this._sessionProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.SessionPortMarshaler", {}, true);

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
                        if (callback !== null) {
                            callback(result);
                        }
                    }, function (error) {
                        that._logger.error("Cannot get state, error name: '" + error.name + "', error message: '" + error.message + "'");
                        if (onError !== null) {
                            onError(error);
                        }
                    });
                };

                Session.prototype.addStateChangedEventListener = function (listener) {
                    this._eventsListeners.push(listener);
                    this._logger.debug("State changed event handler added.");
                };

                Session.prototype.removeStateChangedEventListener = function (listener) {
                    for (var i = 0; i < this._eventsListeners.length; i++) {
                        if (this._eventsListeners[i] === listener) {
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
                        if (handlersCount <= 0) {
                            that._sessionProxy._call("sessionStateChangedCompleted", eventArgs.Token);
                        } else {
                            that._logger.debug("Still waiting when all event state change handlers will complete their work. Handlers count: " + handlersCount);
                        }
                    };

                    for (var propertyName in this._eventsListeners) {
                        var handler = this._eventsListeners[propertyName];

                        if (this._eventsListeners.hasOwnProperty(propertyName)) {
                            if (typeof handler === "function") {
                                try  {
                                    var jsEventArgs = new StateChangedEventArgs(eventArgs, onCompleted);
                                    handler(jsEventArgs);
                                    if (jsEventArgs.waitHandler) {
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

                    if (handlersCount === 0) {
                        onCompleted();
                    }
                };
                return Session;
            })();

            var _currentSession = null;

            function getCurrentSession() {
                if (_currentSession === null) {
                    _currentSession = new Session(DiagnosticsHub.getLogger());
                }

                return _currentSession;
            }
            DiagnosticsHub.getCurrentSession = getCurrentSession;

            // Initialization step. To start get notifications from the managed code we need to be sure
            // that the session instance will be created and it will initialize communication between JS code
            // and managed marhsaler.
            Plugin.addEventListener("pluginready", function () {
                getCurrentSession();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="Logger.ts" />
/// <reference path="DiagnosticsHubNativeHost.ts" />
/// <reference path="Session.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            //
            // Copyright (c) Microsoft Corporation.  All rights reserved.
            //
            (function (DataWarehouse) {
                "use strict";

                /// <disable code="SA1301" justification="Keeping in sync with managed code" />
                // ---------------------------------------------------
                // Data Source Info (Part of Data Warehouse)
                // ---------------------------------------------------
                // this enum should be in sync with enum in managed code
                (function (DataSourceInfoType) {
                    // Unknown state
                    DataSourceInfoType[DataSourceInfoType["Unknown"] = 0] = "Unknown";

                    // File Data Source Info
                    DataSourceInfoType[DataSourceInfoType["File"] = 1] = "File";

                    // Directory Data Source Info
                    DataSourceInfoType[DataSourceInfoType["Directory"] = 2] = "Directory";

                    // Package Data Source Info
                    DataSourceInfoType[DataSourceInfoType["Package"] = 3] = "Package";
                })(DataWarehouse.DataSourceInfoType || (DataWarehouse.DataSourceInfoType = {}));
                var DataSourceInfoType = DataWarehouse.DataSourceInfoType;

                

                // ---------------------------------------------------
                // Data Source Info (Part of Data Warehouse)
                // ---------------------------------------------------
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
                        this._serviceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.DataWarehouseServiceMarshaler", {}, true);
                        this._logger = DiagnosticsHub.getLogger();
                    }
                    DataWarehouseService.prototype.getAllDataSourceInfos = function (callback) {
                        var that = this;

                        this._serviceProxy._call("getAllDataSourceInfos").done(function (result) {
                            var infos = new Array();

                            for (var i = 0; i < result.length; i++) {
                                var dataSource = result[i];
                                if (dataSource.Type === 1 /* File */ || dataSource.Type === 2 /* Directory */ || dataSource.Type === 3 /* Package */) {
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
                    if (_service === null) {
                        _service = new DataWarehouseService();
                    }

                    return _service;
                }
                DataWarehouse.getDataWarehouseService = getDataWarehouseService;

                // Initialization step
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
                /**
                * @param {string[]} events - List of supported events.
                */
                function Publisher(events) {
                    if (typeof events === "undefined") { events = null; }
                    /** Event publisher */
                    // List of supported events.
                    this._events = {};
                    // List of all registered events.
                    this._listeners = {};
                    if (events && events.length > 0) {
                        for (var i = 0; i < events.length; i++) {
                            var type = events[i];
                            if (type) {
                                this._events[type] = type;
                            }
                        }
                    } else {
                        // We do not restrict event types in this case
                        this._events = null;
                    }
                }
                /**
                * Add event listener.
                * @param {string} eventType - Event type.
                * @param {(any) => void} func - Callback function.
                */
                Publisher.prototype.addEventListener = function (eventType, func) {
                    if (eventType && func) {
                        if (this._events === null || this._events[eventType]) {
                            var callbacks = this._listeners[eventType] ? this._listeners[eventType] : this._listeners[eventType] = [];
                            callbacks.push(func);
                        }
                    }
                };

                /**
                * Remove event listener.
                * @param {string} eventType - Event type.
                * @param {(any) => void} func - Callback function.
                */
                Publisher.prototype.removeEventListener = function (eventType, func) {
                    if (eventType && func) {
                        if (this._events === null || this._events[eventType]) {
                            var callbacks = this._listeners[eventType];
                            if (callbacks) {
                                for (var i = 0; i < callbacks.length; i++) {
                                    if (func === callbacks[i]) {
                                        callbacks.splice(i, 1);
                                        break;
                                    }
                                }

                                if (callbacks.length === 0) {
                                    delete this._listeners[eventType];
                                }
                            }
                        }
                    }
                };

                /**
                * Invoke event listener.
                * @param {string} eventType - Event type.
                * @param {any} args - Event argument.
                */
                Publisher.prototype.invokeListener = function (eventType, args) {
                    if (eventType) {
                        if (this._events === null || this._events[eventType]) {
                            var callbacks = this._listeners[eventType];
                            if (callbacks) {
                                for (var i = 0; i < callbacks.length; i++) {
                                    var func = callbacks[i];
                                    if (func) {
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
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="Logger.ts" />
/// <reference path="Publisher.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            

            var EventAggregator = (function () {
                function EventAggregator(logger) {
                    this._eventsListeners = {};
                    this._publisher = new DiagnosticsHub.Publisher();

                    this._logger = logger;
                    this._eventAggregatorProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.EventAggregatorMarshaler", {}, true);
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

                EventAggregator.prototype.globalEventHandler = function (eventArgs /* : Microsoft.DiagnosticsHub.GlobalHubEventArgs */ ) {
                    var eventType = eventArgs.EventType;

                    this._logger.debug("EventAggregator:: Handling event type " + eventType + ".");

                    var dataString = eventArgs.HubEventArgs.Data;
                    this._logger.debug("EventAggregator:: Raise handler for event type " + eventType + " with data " + dataString + ".");

                    try  {
                        var data = null;
                        if (dataString !== null && typeof dataString === "string") {
                            data = JSON.parse(dataString);
                        }

                        this._publisher.invokeListener(eventType, data);
                    } catch (e) {
                        this._logger.error(e.toString());
                    }
                };

                EventAggregator.prototype.raiseEvent = function (eventType, data) {
                    var dataString = null;
                    if (data !== null && typeof data !== "undefined") {
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
                if (_eventAggregator === null) {
                    // For F12, use a local event aggregator
                    if (Plugin.F12) {
                        _eventAggregator = new LocalEventAggregator();
                    } else {
                        _eventAggregator = new EventAggregator(DiagnosticsHub.getLogger());
                    }
                }

                return _eventAggregator;
            }
            DiagnosticsHub.getEventAggregator = getEventAggregator;

            // Initialization step
            Plugin.addEventListener("pluginready", function () {
                getEventAggregator();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="Logger.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            

            var GraphDataUpdateService = (function () {
                function GraphDataUpdateService(logger) {
                    this._logger = logger;
                    this._serviceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.GraphDataUpdateServiceMarshaler", {}, true);
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
                if (_graphDataUpdateService === null) {
                    _graphDataUpdateService = new GraphDataUpdateService(DiagnosticsHub.getLogger());
                }

                return _graphDataUpdateService;
            }
            DiagnosticsHub.getGraphDataUpdateService = getGraphDataUpdateService;

            // Initialization step
            Plugin.addEventListener("pluginready", function () {
                getGraphDataUpdateService();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            

            var OutputWindowsService = (function () {
                function OutputWindowsService() {
                    this._loggerProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.OutputWindowServiceMarshaler", {}, true);
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
                if (_outputWindowService === null) {
                    _outputWindowService = new OutputWindowsService();
                }

                return _outputWindowService;
            }
            DiagnosticsHub.getOutputWindowsService = getOutputWindowsService;

            // Initialization step
            Plugin.addEventListener("pluginready", function () {
                getOutputWindowsService();
            });
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="Logger.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            //
            // Copyright (c) Microsoft Corporation.  All rights reserved.
            //
            (function (Collectors) {
                "use strict";

                

                var StandardTransportService = (function () {
                    function StandardTransportService(logger) {
                        var that = this;

                        this._messageListeners = {};
                        this._logger = logger;
                        this._proxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.StandardTransportServicePortMarshaller", {}, true);

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

                        if (typeof listenerGuid !== "string" || (listenerGuid.length !== 38 && listenerGuid.length !== 36)) {
                            throw new Error("'listenerGuid' must be a Guid string");
                        }

                        // NOTE: we need to reformat listenerGuid to match the format from System.Guid.ToString()
                        if (listenerGuid.length === 38 && listenerGuid[0] === "{" && listenerGuid[37] === "}") {
                            listenerGuid = listenerGuid.substr(1, 36);
                        }

                        listenerGuid = listenerGuid.toLowerCase();

                        var lowerCaseGuidRegEx = new RegExp("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$");
                        if (!lowerCaseGuidRegEx.test(listenerGuid)) {
                            throw new Error("'listenerGuid' must be a Guid string");
                        }

                        if (this._messageListeners[listenerGuid]) {
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

                        if (this._messageListeners[listenerGuid]) {
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
                    if (_standardTransportService === null) {
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
//
// Copyright (c) Microsoft Corporation.  All rights reserved.
//
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            // ******************************************************************************
            // NOTE: This file should be kept in sync with its managed and native copies
            // ******************************************************************************
            (function (DataWarehouse) {
                "use strict";

                /// <disable code="SA1301" justification="Keeping in sync with non-TypeScript code" />
                // ---------------------------------------------------
                // Data Source Identity (Part of Data Warehouse)
                // ---------------------------------------------------
                var ResourceIdentity = (function () {
                    function ResourceIdentity() {
                    }
                    ResourceIdentity.DiagnosticsPackage = "DiagnosticsHub.Resource.DiagnosticsPackage";

                    ResourceIdentity.EtlFile = "DiagnosticsHub.Resource.EtlFile";

                    ResourceIdentity.JavaScriptSource = "DiagnosticsHub.Resource.JavaScript.SourceDirectory";

                    ResourceIdentity.SymbolCache = "DiagnosticsHub.Resource.SymbolCache";

                    ResourceIdentity.UserNativeImageDirectory = "DiagnosticsHub.Resource.UserNativeImageDirectory";

                    ResourceIdentity.PlatformNativeImage = "DiagnosticsHub.Resource.PlatformNativeImage";

                    ResourceIdentity.PlatformWinmd = "DiagnosticsHub.Resource.PlatformWinmd";

                    ResourceIdentity.DWJsonFile = "DiagnosticsHub.Resource.DWJsonFile";

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
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            var BigNumber = (function () {
                function BigNumber(high, low) {
                    this._isHighNegative = false;
                    this._isLowNegative = false;
                    if (!Microsoft.VisualStudio.DiagnosticsHub.BigNumber.validate(high) || !Microsoft.VisualStudio.DiagnosticsHub.BigNumber.validate(low)) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }

                    if (high < 0) {
                        high = (high >>> 0);
                        this._isHighNegative = true;
                    }

                    if (low < 0) {
                        low = (low >>> 0);
                        this._isLowNegative = true;
                    }

                    this._value = {
                        h: high,
                        l: low
                    };
                }
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
                        if (!Microsoft.VisualStudio.DiagnosticsHub.BigNumber.Zero) {
                            Microsoft.VisualStudio.DiagnosticsHub.BigNumber.Zero = new Microsoft.VisualStudio.DiagnosticsHub.BigNumber(0, 0);
                        }

                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.Zero;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(BigNumber, "one", {
                    get: function () {
                        if (!Microsoft.VisualStudio.DiagnosticsHub.BigNumber.One) {
                            Microsoft.VisualStudio.DiagnosticsHub.BigNumber.One = new Microsoft.VisualStudio.DiagnosticsHub.BigNumber(0, 1);
                        }

                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.One;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(BigNumber.prototype, "jsonValue", {
                    get: function () {
                        if (!this._jsonValue) {
                            var high = this._value.h;
                            if (this._isHighNegative || high > 0x7fffffff) {
                                high = high << 0;
                            }

                            var low = this._value.l;
                            if (this._isLowNegative || low > 0x7fffffff) {
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
                        if (!this._stringValue) {
                            if (this._value.h > 0) {
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

                BigNumber.max = function (first, second) {
                    return first.greaterOrEqual(second) ? first : second;
                };

                BigNumber.min = function (first, second) {
                    return first.greaterOrEqual(second) ? second : first;
                };

                BigNumber.add = function (first, second) {
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(first, second);
                };

                BigNumber.subtract = function (first, second) {
                    if (second.greater(first)) {
                        return BigNumber.zero;
                    }

                    // Convert 2nd number to 2's complement and add it to first number.
                    var otherTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(second.jsonValue);
                    var negateHigh = ~(otherTime.h);
                    var negateLow = ~(otherTime.l);
                    var twosComplement = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(new Microsoft.VisualStudio.DiagnosticsHub.BigNumber(negateHigh, negateLow), Microsoft.VisualStudio.DiagnosticsHub.BigNumber.one, true);

                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(first, twosComplement, true);
                };

                BigNumber.multiply = function (first, second) {
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.multiplication(first, second);
                };

                BigNumber.divide = function (first, second) {
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.division(first, second, false);
                };

                BigNumber.modulo = function (first, second) {
                    return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.division(first, second, true);
                };

                BigNumber.addNumber = function (first, second) {
                    if (second < 0) {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.subtract(first, BigNumber.convertFromNumber(-second));
                    } else {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(first, BigNumber.convertFromNumber(second));
                    }

                    return null;
                };

                BigNumber.subtractNumber = function (first, second) {
                    if (second < 0) {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.addition(first, BigNumber.convertFromNumber(-second));
                    } else {
                        return Microsoft.VisualStudio.DiagnosticsHub.BigNumber.subtract(first, BigNumber.convertFromNumber(second));
                    }

                    return null;
                };

                BigNumber.multiplyNumber = function (first, second) {
                    if (second < 0) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }

                    return BigNumber.multiply(first, BigNumber.convertFromNumber(second));
                };

                BigNumber.divideNumber = function (first, second) {
                    if (second < 0) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }

                    return BigNumber.divide(first, BigNumber.convertFromNumber(second));
                };

                BigNumber.moduloNumber = function (first, second) {
                    if (second < 0) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }

                    return BigNumber.modulo(first, BigNumber.convertFromNumber(second));
                };

                // Convert a number to the BigNumber format. Numbers are rounded down to the nearest
                // integer. The number cannot exceed 2^53 - 1.
                BigNumber.convertFromNumber = function (num) {
                    if ((num < 0) || !(num < 0x20000000000000)) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }

                    num = Math.floor(num);
                    var low = num & 0xFFFFFFFF;
                    if (num <= 0xFFFFFFFF) {
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
                    if (this._value.h > otherTime.h) {
                        isGreater = true;
                    } else if (this._value.h === otherTime.h) {
                        if (this._value.l > otherTime.l) {
                            isGreater = true;
                        }
                    }

                    return isGreater;
                };

                BigNumber.prototype.greaterOrEqual = function (other) {
                    var isGreaterOrEqual = false;
                    var otherTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(other.jsonValue);
                    if (this._value.h > otherTime.h) {
                        isGreaterOrEqual = true;
                    } else if (this._value.h === otherTime.h) {
                        if (this._value.l >= otherTime.l) {
                            isGreaterOrEqual = true;
                        }
                    }

                    return isGreaterOrEqual;
                };

                BigNumber.prototype.compareTo = function (other) {
                    if (this.greater(other)) {
                        return 1;
                    } else if (this.equals(other)) {
                        return 0;
                    } else {
                        return -1;
                    }
                };

                // Convert a binary string (up to 64 bits) to the BigNumber format.
                BigNumber.convertFromBinaryString = function (bits) {
                    // Validate string
                    if (!bits || bits.match("[^10]") || bits.length > 64) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000" + " " + bits));
                    }

                    var high = 0;
                    var low = 0;

                    if (bits.length <= 32) {
                        low = parseInt(bits, 2);
                    } else {
                        low = parseInt(bits.slice(bits.length - 32), 2);
                        high = parseInt(bits.slice(0, bits.length - 32), 2);
                    }

                    return new BigNumber(high, low);
                };

                // Convert a timestamp to a string of bits
                BigNumber.getBinaryString = function (timestamp) {
                    var lowPart = timestamp._value.l.toString(2);
                    if (timestamp._value.h > 0) {
                        return timestamp._value.h.toString(2) + Microsoft.VisualStudio.DiagnosticsHub.BigNumber.padLeadingZeros(lowPart, 32);
                    } else {
                        return lowPart;
                    }
                };

                BigNumber.convertToManagedTimeFormat = function (time) {
                    var high = time.h < 0 ? time.h >>> 0 : time.h;
                    var low = time.l < 0 ? time.l >>> 0 : time.l;
                    return {
                        h: high,
                        l: low
                    };
                };

                BigNumber.addition = function (first, second, ignoreOverflow) {
                    if (typeof ignoreOverflow === "undefined") { ignoreOverflow = false; }
                    var firstTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(first.jsonValue);
                    var secondTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(second.jsonValue);

                    // Split each high and low into 8-bits and perform addition. this is done for adding
                    // 2 unsigned numbers.
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

                    if (!ignoreOverflow && (high24 >>> 8) > 0) {
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

                BigNumber.multiplication = function (first, second) {
                    var firstTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(first.jsonValue);
                    var secondTime = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertToManagedTimeFormat(second.jsonValue);

                    // If both numbers are <= 2^26 (0x4000000) we know that the product will be strictly below the max value
                    // representable by the JavaScript Number type.
                    if (firstTime.h === 0 && secondTime.h === 0 && 0 < firstTime.l && firstTime.l <= 0x4000000 && 0 < secondTime.l && secondTime.l <= 0x4000000) {
                        var product = firstTime.l * secondTime.l;
                        return BigNumber.convertFromNumber(product);
                    }

                    // Split timestamps into four 16-bit chunks
                    var a1 = firstTime.l & 0xFFFF;
                    var a2 = firstTime.l >>> 0x10;
                    var a3 = firstTime.h & 0xFFFF;
                    var a4 = firstTime.h >>> 0x10;

                    var b1 = secondTime.l & 0xFFFF;
                    var b2 = secondTime.l >>> 0x10;
                    var b3 = secondTime.h & 0xFFFF;
                    var b4 = secondTime.h >>> 0x10;

                    // c1: a1b1
                    var c1 = a1 * b1;
                    var c2 = c1 >>> 0x10;
                    c1 &= 0xFFFF;

                    // c2: a2b1 + a1b2
                    c2 += a2 * b1;
                    var c3 = c2 >>> 0x10;
                    c2 &= 0xFFFF;

                    c2 += a1 * b2;
                    c3 += c2 >>> 0x10;
                    c2 &= 0xFFFF;

                    // c3: a3b1 + a2b2 + a1b3
                    c3 += a3 * b1;
                    var c4 = c3 >>> 0x10;
                    c3 &= 0xFFFF;

                    c3 += a2 * b2;
                    c4 += c3 >>> 0x10;
                    c3 &= 0xFFFF;

                    c3 += a1 * b3;
                    c4 += c3 >>> 0x10;
                    c3 &= 0xFFFF;

                    // c4: a4b1 + a3b2 + a2b3 + a1b4
                    // No carry for c4. Anything beyond 16 bits is lost.
                    c4 += a4 * b1 + a3 * b2 + a2 * b3 + a1 * b4;
                    if (c4 > 0xFFFF) {
                        Microsoft.VisualStudio.DiagnosticsHub.getLogger().error("Multiplication overflow. Lost upper 16-bits from: 0x" + c4.toString(16));
                    }

                    c4 &= 0xFFFF;

                    var productHigh = (c4 << 0x10) | c3;
                    var productLow = (c2 << 0x10) | c1;
                    return new BigNumber(productHigh, productLow);
                };

                // Divide timestamps. If wantRemainder is true, returns the remainder instead of the quotient.
                BigNumber.division = function (dividend, divisor, wantRemainder) {
                    if (divisor.greater(dividend)) {
                        return wantRemainder ? dividend : Microsoft.VisualStudio.DiagnosticsHub.BigNumber.zero;
                    }

                    if (divisor.equals(Microsoft.VisualStudio.DiagnosticsHub.BigNumber.zero)) {
                        if (wantRemainder) {
                            return dividend;
                        }

                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }

                    var dividendBits = BigNumber.getBinaryString(dividend);
                    var divisorBits = BigNumber.getBinaryString(divisor);

                    var divisorLength = divisorBits.length;
                    var dividendLength = dividendBits.length;

                    // If dividend < 2^53 (0x20000000000000) we know that the product will be strictly below the max value
                    // representable by the JavaScript Number type.
                    var timeStamp2toThe53 = new BigNumber(0x200000, 0);
                    if (timeStamp2toThe53.greater(dividend)) {
                        var dividendNum = parseInt(dividend.value);
                        var divisorNum = parseInt(divisor.value);
                        return wantRemainder ? BigNumber.convertFromNumber(dividendNum % divisorNum) : BigNumber.convertFromNumber(dividendNum / divisorNum);
                    }

                    var quotientString = "";
                    var nextIndex = divisorLength;
                    var currDividend = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromBinaryString(dividendBits.substr(0, divisorLength));

                    while (nextIndex <= dividendLength) {
                        if (currDividend.greater(divisor) || currDividend.equals(divisor)) {
                            quotientString += "1";
                            currDividend = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.subtract(currDividend, divisor);
                        } else {
                            quotientString += "0";
                        }

                        if (nextIndex !== dividendLength) {
                            currDividend = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromBinaryString(BigNumber.getBinaryString(currDividend) + dividendBits[nextIndex]);
                        }

                        nextIndex++;
                    }

                    return wantRemainder ? currDividend : Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromBinaryString(quotientString);
                };

                BigNumber.padLeadingZeros = function (value, totalLength) {
                    var padded = value;
                    var zeros = "00000000";

                    if (padded && totalLength && totalLength > 0) {
                        while (totalLength - padded.length >= 8) {
                            padded = zeros + padded;
                        }

                        padded = zeros.substr(0, totalLength - padded.length) + padded;
                    }

                    return padded;
                };

                BigNumber.validate = function (value) {
                    // Ensure value is a 32-bit number: between -(2^31) and 2^32
                    return typeof value === "number" && value < 0x100000000 && value > -1 * 0x80000000;
                };
                BigNumber.OldestTimestampFormat = {
                    h: 0,
                    l: 0
                };

                BigNumber.LatestTimestampFormat = {
                    h: 0xffffffff,
                    l: 0xffffffff
                };
                return BigNumber;
            })();
            DiagnosticsHub.BigNumber = BigNumber;

            var JsonTimespan = (function () {
                function JsonTimespan(begin, end) {
                    if (begin.greater(end)) {
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
                        if (!this._elapsed) {
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
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="Logger.ts" />
/// <reference path="JsonTimespan.ts" />
/// <reference path="DiagnosticsHubNativeHost.ts" />
/// <reference path="DataWarehouseService.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            // -----------------------------------------------------------------------------
            // Copyright (c) Microsoft Corporation.  All rights reserved.
            // -----------------------------------------------------------------------------
            (function (DataWarehouse) {
                "use strict";

                

                

                var DhContextData = (function () {
                    function DhContextData() {
                    }
                    return DhContextData;
                })();
                DataWarehouse.DhContextData = DhContextData;

                

                

                

                // See DiagnosticsHub.SDK\DataWarehouse\AnalyzerConfigurationType.cs for details
                (function (AnalyzerConfigurationType) {
                    AnalyzerConfigurationType[AnalyzerConfigurationType["Standard"] = 1] = "Standard";
                    AnalyzerConfigurationType[AnalyzerConfigurationType["Custom"] = 2] = "Custom";
                })(DataWarehouse.AnalyzerConfigurationType || (DataWarehouse.AnalyzerConfigurationType = {}));
                var AnalyzerConfigurationType = DataWarehouse.AnalyzerConfigurationType;

                

                

                // Private data ids
                (function (PrivateDataId) {
                    PrivateDataId[PrivateDataId["JmcJavaScript"] = 1] = "JmcJavaScript";
                    PrivateDataId[PrivateDataId["SolutionExecutableCodeOutputs"] = 2] = "SolutionExecutableCodeOutputs";
                })(DataWarehouse.PrivateDataId || (DataWarehouse.PrivateDataId = {}));
                var PrivateDataId = DataWarehouse.PrivateDataId;

                var Constants = (function () {
                    function Constants() {
                    }
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

                        if (customData !== null) {
                            requestObject = { resultId: that._resultId, customData: JSON.stringify(customData) };
                        } else {
                            requestObject = { resultId: that._resultId };
                        }

                        return that._controller.request(Constants.ACTION_DATAWAREHOUSE_GETRESULT, requestObject);
                    };

                    DhJsonResult.prototype.dispose = function () {
                        var that = this;

                        return that._controller.request(Constants.ACTION_DATAWAREHOUSE_DISPOSERESULT, { resultId: that._resultId });
                    };
                    return DhJsonResult;
                })();

                var DataWarehouseFactory = (function () {
                    function DataWarehouseFactory() {
                        this._getConfigurationPromise = null;
                        this._serviceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.DataWarehouseServiceMarshaler", {}, true);
                        this._logger = DiagnosticsHub.getLogger();
                    }
                    DataWarehouseFactory.prototype.getDataWarehouse = function (configuration) {
                        if (typeof configuration === "undefined") { configuration = null; }
                        // If somebody gives us new configuration - we always create new datawarehouse for this configuration
                        // In other case we use previous configuration.
                        if (this._getConfigurationPromise === null || configuration) {
                            if (configuration === null) {
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

                        if (!contextId) {
                            jsonRequest = { analyzerId: analyzerId };
                        } else {
                            jsonRequest = { contextId: contextId, analyzerId: analyzerId };
                        }

                        return this.getDataFromAnalyzer(jsonRequest);
                    };

                    DataWarehouseInstance.prototype.getFilteredData = function (filter, analyzerId) {
                        return this.getDataFromAnalyzer({ filter: serializeDhContextData(null, filter), analyzerId: analyzerId });
                    };

                    DataWarehouseInstance.prototype.getContextService = function () {
                        if (!this._contextService) {
                            this._contextService = new DhContextService(this._dwConfiguration.sessionId);
                        }

                        return this._contextService;
                    };

                    DataWarehouseInstance.prototype.getJmcService = function () {
                        if (!this._jmcService) {
                            this._jmcService = new JmcService(this._dwConfiguration.sessionId);
                        }

                        return this._jmcService;
                    };

                    DataWarehouseInstance.prototype.close = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_CLOSE);
                    };

                    DataWarehouseInstance.prototype.closeSynchronous = function () {
                        if (Plugin.F12) {
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
                        var privateDataRequest = { id: dataId, dataArg: privateDataArg };
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_GETPRIVATEDATA, privateDataRequest);
                    };

                    DataWarehouseInstance.prototype.setPrivateData = function (dataId, privateData) {
                        this._logger.debug("Setting private data in DataWarehouse...");
                        var privateDataRequest = { id: dataId, data: privateData };
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSE_SETPRIVATEDATA, privateDataRequest);
                    };

                    DataWarehouseInstance.prototype.getDataFromAnalyzer = function (jsonRequest) {
                        var _this = this;
                        // In case if we use .then(...) for Promises we break progress notifications, so we want to handle callback
                        // and also propagate progress notifications, this is why we keep our own wrapper.
                        var completePromise;
                        var errorPromise;
                        var progressPromise;

                        var promiseInitialization = function (completed, error, progress) {
                            completePromise = completed;
                            errorPromise = error;
                            progressPromise = progress;
                        };

                        var requestPromise = this._controller.request(Constants.ACTION_DATAWAREHOUSE_GETDATA, jsonRequest).then(function (result) {
                            if (completePromise) {
                                var val = null;

                                if (result !== null && typeof result !== "undefined" && typeof result.dh_r_id === "string" && result.dh_r_id.length === 36) {
                                    // If this is GUID this is our result Id (see DataWarehouseController.cpp file, where we construct it)
                                    val = new DhJsonResult(result.dh_r_id, _this._dwConfiguration.sessionId, _this._controller);
                                } else {
                                    val = result;
                                }

                                completePromise(val);
                            }
                        }, function (error) {
                            if (errorPromise) {
                                errorPromise(error);
                            }
                        }, function (progress) {
                            if (progress) {
                                progressPromise(progress);
                            }
                        });

                        var oncancel = function () {
                            requestPromise.cancel();
                        };

                        return new Plugin.Promise(promiseInitialization, oncancel);
                    };
                    return DataWarehouseInstance;
                })();

                function serializeDhContextData(contextId, data) {
                    var result = {};

                    if (contextId) {
                        result["contextId"] = contextId;
                    }

                    if (data.timeDomain) {
                        result["timeDomain"] = {
                            begin: data.timeDomain.begin.jsonValue,
                            end: data.timeDomain.end.jsonValue
                        };
                    }

                    if (data.machineDomain) {
                        result["machineDomain"] = data.machineDomain;
                    }

                    if (data.processDomain) {
                        result["processDomain"] = data.processDomain;
                    }

                    if (data.threadDomain) {
                        result["threadDomain"] = data.threadDomain;
                    }

                    if (data.customDomain) {
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

                        var request = {};

                        if (data !== null && typeof data !== "undefined") {
                            request["data"] = serializeDhContextData(null, data);
                        }

                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_CREATECONTEXT, request).then(function (contextInfo) {
                            return new DhContext(contextInfo, that._sessionId);
                        });
                    };

                    DhContextService.prototype.deleteContext = function (contextId) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_DELETECONTEXT, { contextId: contextId });
                    };

                    DhContextService.prototype.copyContext = function (contextId) {
                        var that = this;

                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_COPYCONTEXT, { contextId: contextId }).then(function (contextInfo) {
                            return new DhContext(contextInfo, that._sessionId);
                        });
                    };

                    DhContextService.prototype.getContext = function (contextId) {
                        var that = this;

                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXTSERVICE_GETCONTEXT, { contextId: contextId }).then(function (contextInfo) {
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
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETDATA, { contextId: this._info.contextId }).then(function (result) {
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
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETTIMEDOMAIN, { contextId: this._info.contextId }).then(function (result) {
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
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETMACHINEDOMAIN, { contextId: this._info.contextId });
                    };

                    DhContext.prototype.addToMachineDomain = function (machineName) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOMACHINEDOMAIN, { contextId: this._info.contextId, machineName: machineName });
                    };

                    DhContext.prototype.clearMachineDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARMACHINEDOMAIN, { contextId: this._info.contextId });
                    };

                    DhContext.prototype.getProcessDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETPROCESSDOMAIN, { contextId: this._info.contextId });
                    };

                    DhContext.prototype.addToProcessDomain = function (processId) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOPROCESSDOMAIN, { contextId: this._info.contextId, processId: processId });
                    };

                    DhContext.prototype.clearProcessDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARPROCESSDOMAIN, { contextId: this._info.contextId });
                    };

                    DhContext.prototype.getThreadDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETTHREADDOMAIN, { contextId: this._info.contextId });
                    };

                    DhContext.prototype.addToThreadDomain = function (threadId) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_ADDTOTHREADDOMAIN, { contextId: this._info.contextId, threadId: threadId });
                    };

                    DhContext.prototype.clearThreadDomain = function () {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_CLEARTHREADDOMAIN, { contextId: this._info.contextId });
                    };

                    DhContext.prototype.getCustomDomain = function (name) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_GETCUSTOMDOMAIN, { contextId: this._info.contextId, name: name }).then(function (result) {
                            return result.value;
                        });
                    };

                    DhContext.prototype.setCustomDomain = function (name, value) {
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSECONTEXT_SETCUSTOMDOMAIN, { contextId: this._info.contextId, name: name, value: value });
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
                        return this._controller.request(Constants.ACTION_DATAWAREHOUSEJMCSERVICE_SETJMCENABLED, { jmcOn: enabledState }).then(this.processSetJmcEnabledStateResult.bind(this));
                    };

                    JmcService.prototype.processGetJmcEnabledStateResult = function (result) {
                        if (typeof result.jmcOn === "undefined") {
                            this._logger.error("getJmcEnabledState() result is ill-formed");
                            throw new Error(Plugin.Resources.getErrorString("JSProfiler.9999"));
                        }

                        return result.jmcOn;
                    };

                    JmcService.prototype.processSetJmcEnabledStateResult = function (result) {
                        if (typeof result.prevEnabledState === "undefined" || typeof result.currEnabledState === "undefined") {
                            this._logger.error("setJmcEnabledState() result is ill-formed");
                            throw new Error(Plugin.Resources.getErrorString("JSProfiler.9999"));
                        }

                        // Check if the value changed and if it has fire the event
                        if (result.prevEnabledState !== result.currEnabledState) {
                            this._viewEventManager.jmcEnabledStateChanged.raiseEvent(result);
                        }
                    };
                    return JmcService;
                })();

                var _dwFactory = null;

                // Return promise with IDataWarehouse as a result in complete callback
                function loadDataWarehouse(configuration) {
                    if (typeof configuration === "undefined") { configuration = null; }
                    if (_dwFactory === null) {
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
/// <reference path="Logger.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            // -----------------------------------------------------------------------------
            // Copyright (c) Microsoft Corporation.  All rights reserved.
            // -----------------------------------------------------------------------------
            (function (Controllers) {
                "use strict";

                // Private definition of the F12 JMC types
                // taken from bpt\diagnostics\PluginHost\plugin.f12.d.ts
                var F12_JMCType;
                (function (F12_JMCType) {
                    F12_JMCType[F12_JMCType["UserCode"] = 0] = "UserCode";
                    F12_JMCType[F12_JMCType["Library"] = 1] = "Library";
                    F12_JMCType[F12_JMCType["Unrelated"] = 2] = "Unrelated";
                    F12_JMCType[F12_JMCType["Unsure"] = 3] = "Unsure";
                })(F12_JMCType || (F12_JMCType = {}));

                // Class used to handle the JavaScript Just-My-Code logic
                var JavaScriptJmc = (function () {
                    function JavaScriptJmc() {
                        this._serviceProxy = getVisualStudioService();
                    }
                    JavaScriptJmc.prototype.getJmcTypeForUrls = function (urls) {
                        // For F12, use a the local JMC service
                        if (Plugin.F12) {
                            return Plugin.F12.JMC.getJMCTypeForUrls(urls).then(function (jmcTypes) {
                                if (!jmcTypes) {
                                    return [];
                                }

                                for (var i = 0; i < jmcTypes.length; ++i) {
                                    switch (jmcTypes[i]) {
                                        case 0 /* UserCode */:
                                            jmcTypes[i] = 0;
                                            break;
                                        case 1 /* Library */:
                                            jmcTypes[i] = 1;
                                            break;
                                        case 2 /* Unrelated */:
                                            jmcTypes[i] = 2;
                                            break;
                                        case 3 /* Unsure */:
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

                // Class used to handle interacting with the Visual Studio Project system
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

                // Class used to handle locating and viewing sources
                var SourceService = (function () {
                    function SourceService() {
                        this._serviceProxy = getVisualStudioService();
                    }
                    SourceService.prototype.showDocument = function (filename, linenumber) {
                        return this._serviceProxy._call("showDocument", filename, linenumber);
                    };

                    SourceService.prototype.getAccessiblePathToFile = function (filename) {
                        return this._serviceProxy._call("getAccessiblePathToFile", filename);
                    };
                    return SourceService;
                })();
                Controllers.SourceService = SourceService;

                var _visualStudioServiceProxy = null;

                function getVisualStudioService() {
                    if (_visualStudioServiceProxy === null) {
                        _visualStudioServiceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.VisualStudioServiceMarshaler", {}, true);
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
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="Logger.ts" />
/// <reference path="DataWarehouse.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            // ---------------------------------------------------
            // Alternate format enumeration
            // ---------------------------------------------------
            (function (AlternateFormat) {
                /// Open document as a Vspx
                AlternateFormat[AlternateFormat["Vspx"] = 1] = "Vspx";
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
                    if (this._eventDeferral === null) {
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
                    this._documentProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.DocumentPortMarshaler", {}, true);
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
                    if (format === 1 /* Vspx */) {
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
                        if (handlersCount <= 0) {
                            this._documentProxy._call("onClosingCompleted", finalResult);
                        } else {
                            this._logger.debug("Still waiting when all on closing handlers will complete their work. Handlers count: " + handlersCount);
                        }
                    }.bind(this);

                    for (var propertyName in this._onCloseHandlers) {
                        if (this._onCloseHandlers.hasOwnProperty(propertyName)) {
                            var handler = this._onCloseHandlers[propertyName];

                            if (typeof handler === "function") {
                                try  {
                                    var jsEventArgs = new DocumentClosingEventArgs(onCompleted);
                                    handler(jsEventArgs);
                                    if (jsEventArgs.waitHandler) {
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

                    if (handlersCount === 0) {
                        onCompleted(finalResult);
                    }
                };
                return Document;
            })();

            var _currentDocument = null;

            function getCurrentDocument() {
                if (_currentDocument === null) {
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
            // -----------------------------------------------------------------------------
            // Copyright (c) Microsoft Corporation.  All rights reserved.
            // -----------------------------------------------------------------------------
            (function (Sqm) {
                "use strict";

                // Class used to handle the SQM reports for CPU Usage tool
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
                        if (!this._isSetCreateDetailedReport) {
                            this._isSetCreateDetailedReport = true;
                            this._serviceProxy._call("cpuUsageSetCreateDetailedReport");
                        }
                    };

                    CpuUsage.prototype.searchIsUsed = function () {
                        if (!this._isSetSearchIsUsed) {
                            this._isSetSearchIsUsed = true;
                            this._serviceProxy._call("cpuUsageSetSearchIsUsed");
                        }
                    };

                    CpuUsage.prototype.searchOptionsChanged = function () {
                        if (!this._isSetSearchOptionsChanged) {
                            this._isSetSearchOptionsChanged = true;
                            this._serviceProxy._call("cpuUsageSetSearchOptionsChanged");
                        }
                    };

                    CpuUsage.prototype.jmcToggle = function (state) {
                        this._serviceProxy._call("countJmcToggle", state);
                    };

                    CpuUsage.prototype.failOpenSourceFile = function () {
                        this._serviceProxy._call("cpuUsageCountFailOpenSourceFile");
                    };
                    return CpuUsage;
                })();
                Sqm.CpuUsage = CpuUsage;

                // Source of selection change
                // This enumerator is synchronised with
                // - SelectionChangeSource in DiagnosticsHub.Internal.d.ts
                // - SelectionChangeSource in IVisualStudioSqmAnalysisService.cs
                (function (SelectionChangeSource) {
                    SelectionChangeSource[SelectionChangeSource["SwimLane"] = 0] = "SwimLane";
                    SelectionChangeSource[SelectionChangeSource["DoubleSlider"] = 1] = "DoubleSlider";
                    SelectionChangeSource[SelectionChangeSource["DoubleSliderHandles"] = 2] = "DoubleSliderHandles";
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
                    if (_sqmServiceProxy === null) {
                        _sqmServiceProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.SqmServiceMarshaler", {}, true);
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
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

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

                TimeStamp.fromNanoseconds = function (nsec) {
                    return new TimeStamp(nsec);
                };

                TimeStamp.fromMilliseconds = function (msec) {
                    return new TimeStamp(msec * TimeStamp.NanosecInMillisec);
                };

                TimeStamp.fromSeconds = function (sec) {
                    return new TimeStamp(sec * TimeStamp.NanosecInSec);
                };

                TimeStamp.prototype.equals = function (other) {
                    return this._nsec === other.nsec;
                };
                TimeStamp.NanosecInMillisec = 1000 * 1000;
                TimeStamp.NanosecInSec = 1000 * 1000 * 1000;
                return TimeStamp;
            })();
            DiagnosticsHub.TimeStamp = TimeStamp;

            var TimeSpan = (function () {
                function TimeSpan(begin, end) {
                    if (typeof begin === "undefined") { begin = new TimeStamp(); }
                    if (typeof end === "undefined") { end = new TimeStamp(); }
                    this._begin = begin;
                    this._end = end;

                    if (this._begin.nsec > this._end.nsec) {
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
/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
/// <reference path="EventAggregator.ts" />
/// <reference path="Publisher.ts" />
/// <reference path="JsonTimespan.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        //
        // Copyright (c) Microsoft Corporation.  All rights reserved.
        //
        (function (DiagnosticsHub) {
            "use strict";

            var SelectionTimeRangeChangedEvent = (function () {
                function SelectionTimeRangeChangedEvent() {
                    this._publisher = new DiagnosticsHub.Publisher([SelectionTimeRangeChangedEvent.EventName]);
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._eventAggregator.addEventListener(SelectionTimeRangeChangedEvent.EventGlobalName, this.forwardSelectionTimeRangeEvent.bind(this));
                    this._timeRangeMarshaler = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.SwimlaneDataServiceMarshaler", {}, true);
                    if (!this._timeRangeMarshaler) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1007"));
                    }
                }
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
                        if (time && time.begin && time.end) {
                            currentTimeRange = new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(time.begin._value.h, time.begin._value.l), new DiagnosticsHub.BigNumber(time.end._value.h, time.end._value.l));
                            if (func) {
                                func(currentTimeRange);
                            }
                        }
                    });
                };

                SelectionTimeRangeChangedEvent.prototype.setTimeRange = function (time) {
                    this._timeRangeMarshaler._call("setCurrentTimeRange", time);
                };

                SelectionTimeRangeChangedEvent.prototype.forwardSelectionTimeRangeEvent = function (dto) {
                    // the event is raised from the aggregator using marshaled JSON objects and we need to add the type information back
                    var selectionTimeRange = new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(dto.beginH, dto.beginL), new DiagnosticsHub.BigNumber(dto.endH, dto.endL));

                    var args = {
                        position: selectionTimeRange,
                        isIntermittent: dto.isIntermittent,
                        invoker: dto.invoker
                    };

                    this._publisher.invokeListener(SelectionTimeRangeChangedEvent.EventName, args);
                };
                SelectionTimeRangeChangedEvent.EventGlobalName = "DiagnosticsHub.EventAggregator.SelectionTimeRangeChanged";
                SelectionTimeRangeChangedEvent.EventName = "DiagnosticsHub.SelectionTimeRangeChanged";
                return SelectionTimeRangeChangedEvent;
            })();

            var JmcEnabledStateChangedEvent = (function () {
                function JmcEnabledStateChangedEvent() {
                    this._publisher = new DiagnosticsHub.Publisher([JmcEnabledStateChangedEvent.EventName]);
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._eventAggregator.addEventListener(JmcEnabledStateChangedEvent.EventGlobalName, this.forwardJmcEnabledStateChangedEvent.bind(this));
                }
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
                    // the event is raised from the aggregator using marshaled JSON objects
                    this._publisher.invokeListener(JmcEnabledStateChangedEvent.EventName, args);
                };
                JmcEnabledStateChangedEvent.EventGlobalName = "DiagnosticsHub.EventAggregator.JmcEnabledStateChanged";
                JmcEnabledStateChangedEvent.EventName = "DiagnosticsHub.JmcEnabledStateChanged";
                return JmcEnabledStateChangedEvent;
            })();

            var DetailsViewSelectionChangedEvent = (function () {
                function DetailsViewSelectionChangedEvent() {
                    this._publisher = new DiagnosticsHub.Publisher([DetailsViewSelectionChangedEvent.EventName]);
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._eventAggregator.addEventListener(DetailsViewSelectionChangedEvent.EventGlobalName, this.forwardDetailsViewSelectionChangedEvent.bind(this));
                }
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
                    // the event is raised from the aggregator using marshaled JSON objects
                    this._publisher.invokeListener(DetailsViewSelectionChangedEvent.EventName, args);
                };
                DetailsViewSelectionChangedEvent.EventGlobalName = "DiagnosticsHub.EventAggregator.DetailsViewSelectionChangedEvent";
                DetailsViewSelectionChangedEvent.EventName = "DiagnosticsHub.DetailsViewSelectionChangedEvent";
                return DetailsViewSelectionChangedEvent;
            })();

            var DetailsViewReadyEvent = (function () {
                function DetailsViewReadyEvent() {
                    this._publisher = new DiagnosticsHub.Publisher([DetailsViewReadyEvent.EventName]);
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._eventAggregator.addEventListener(DetailsViewReadyEvent.EventGlobalName, this.forwardDetailsViewSelectionChangedEvent.bind(this));
                }
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
                    // the event is raised from the aggregator using marshaled JSON objects
                    this._publisher.invokeListener(DetailsViewReadyEvent.EventName, args);
                };
                DetailsViewReadyEvent.EventGlobalName = "DiagnosticsHub.EventAggregator.DetailsViewReadyEvent";
                DetailsViewReadyEvent.EventName = "DiagnosticsHub.DetailsViewReadyEvent";
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
                if (_viewEventManager === null) {
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
//
// Copyright (c) Microsoft Corporation.  All rights reserved.
//
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";

            // Diagnostics Hub error codes
            // These values should be kept in sync with those from 'edev\DiagnosticsHub\sources\Core\DiagnosticsHub.Message\DiagnosticsHub.Messages.mc'
            var ErrorCodes = (function () {
                function ErrorCodes() {
                }
                ErrorCodes.VSHUB_E_INVALID_REGEX = 0xE111E001;
                return ErrorCodes;
            })();
            DiagnosticsHub.ErrorCodes = ErrorCodes;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
//# sourceMappingURL=DiagnosticsHub.js.map

// SIG // Begin signature block
// SIG // MIIaqwYJKoZIhvcNAQcCoIIanDCCGpgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFOE9N0zOxuS7
// SIG // F2VdA/jed4QDpNSkoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTLGpmWjg4F
// SIG // ahoK6gs9uN1iN39AVTBOBgorBgEEAYI3AgEMMUAwPqAk
// SIG // gCIARABpAGEAZwBuAG8AcwB0AGkAYwBzAEgAdQBiAC4A
// SIG // agBzoRaAFGh0dHA6Ly9taWNyb3NvZnQuY29tMA0GCSqG
// SIG // SIb3DQEBAQUABIIBAHxIUkeK4ybEDRniVFq1temNSw0h
// SIG // ePcm3mbIP3B4FRhOOiFaagauaCvMEqV9Xj0qtnZPwnPa
// SIG // plkRt9t13dCVEHzF9zM1Sp8PP+MEbblCAGhD2JVDp1hG
// SIG // y3zhuDRFWqaqXC/E4PlgJs0z+UIyKcQzGkWejL0rmCzT
// SIG // cdt3E81AqV4iAywBTvK8buOFvplexSQ7awIgfCQSvIpK
// SIG // Oft6VQqpzkNdFRVtFkI2B2ambhIn3i953Zk2YKxYxSGs
// SIG // frLY+zZvBUMdDMftD5QZeIINLnpBJrGbGQUmTSYTGhfd
// SIG // hSu6wAa7AkJbcvJvCauZ2pvC2Tg5HpchaU/ZyF0LjeST
// SIG // PBOXGHuhggIoMIICJAYJKoZIhvcNAQkGMYICFTCCAhEC
// SIG // AQEwgY4wdzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
// SIG // c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
// SIG // BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UE
// SIG // AxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBAhMzAAAA
// SIG // TKHoTcy0dHs7AAAAAABMMAkGBSsOAwIaBQCgXTAYBgkq
// SIG // hkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJ
// SIG // BTEPFw0xNDExMDEwNzI0MTZaMCMGCSqGSIb3DQEJBDEW
// SIG // BBQ5smT7sWmfpfP5CeXJLIJgge/qCDANBgkqhkiG9w0B
// SIG // AQUFAASCAQAKiDOnnn3vkLWW8L4L4oKObrh2QHHfe0Y2
// SIG // pRXLrZjnU1mPnf1sxRFZp02/365j46E4m9wqsyAbUOjO
// SIG // gErG0QLgd6hO+6qemf7OKt6fzArecXtSp4qFRdYzw38N
// SIG // DyKAvB0SYiVsZ+wdOMwZ417zFKgk1CpT80L4lG850oss
// SIG // T3XXXDa411V1q+0UVHnwK2MesLBXCU+hvZ9pVma8QVbe
// SIG // zMph8nLTsFUJg3043gAfguknLiZ8cj17Yz2iOGTWLHXN
// SIG // 2SZ/wc2HrT/qPkn6RF9FefxMEovsBHJWwV5Lmfv8hHUE
// SIG // VZAo/w9696FND6IeEzhWYIKAbrShCTIPwpV62j32jz2o
// SIG // End signature block
