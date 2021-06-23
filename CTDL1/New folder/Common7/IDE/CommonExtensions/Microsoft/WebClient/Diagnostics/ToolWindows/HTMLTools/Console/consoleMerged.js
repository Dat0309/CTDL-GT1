//
// Copyright (C) Microsoft. All rights reserved.
//
// <!-- saved from url=(0016)http://localhost -->
// bridge.ts
var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            var VSBridge = (function () {
                function VSBridge(vs, traceWriter) {
                    this._vs = vs;
                    this._traceWriter = traceWriter;
                    this._proxy = (Plugin).Utilities.JSONMarshaler.attachToPublishedObject("F12.Console.Bridge.IConsoleBridge", {
                    }, true);
                    this._breakpointState = new Console.VSBreakpointState(this._proxy);
                    this._breakpointState.initialize();
                    this._channel = new Console.VSConsoleChannel(this._proxy, this._breakpointState, this._traceWriter);
                }
                Object.defineProperty(VSBridge.prototype, "channel", {
                    get: function () {
                        return this._channel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(VSBridge.prototype, "breakpointState", {
                    get: function () {
                        return this._breakpointState;
                    },
                    enumerable: true,
                    configurable: true
                });
                VSBridge.prototype.start = function () {
                    this._proxy._post("start");
                };
                VSBridge.prototype.fireCodeMarker = function (codeMarker) {
                    this._vs.Internal.CodeMarkers.fire(codeMarker);
                };
                VSBridge.prototype.openF1HelpLink = function (keyword) {
                    this._proxy._post("openF1HelpLink", keyword);
                };
                VSBridge.prototype.getScriptEngines = function () {
                    return this._proxy._call("getScriptEngines");
                };
                VSBridge.prototype.addEventListener = function (eventName, callback) {
                    switch(eventName) {
                        case "connect":
                        case "attach":
                        case "detach":
                        case "break":
                        case "run":
                        case "scriptError":
                        case "toggleFilter":
                            break;
                        default:
                            throw new Error("Invalid eventName.");
                    }
                    this._proxy.addEventListener(eventName, callback);
                };
                VSBridge.prototype.removeEventListener = function (eventName, callback) {
                    this._proxy.removeEventListener(eventName, callback);
                };
                return VSBridge;
            })();
            Console.VSBridge = VSBridge;            
            var IEBridge = (function () {
                function IEBridge(f12, external, traceWriter) {
                    this._f12 = f12;
                    this._external = external;
                    this._traceWriter = traceWriter;
                    this._breakpointState = new Console.IEBreakpointState(f12, this._external);
                    this._breakpointState.initialize();
                    this._channel = new Console.IEConsoleChannel(f12, this._external, this._breakpointState, this._traceWriter);
                }
                Object.defineProperty(IEBridge.prototype, "breakpointState", {
                    get: function () {
                        return this._breakpointState;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(IEBridge.prototype, "channel", {
                    get: function () {
                        return this._channel;
                    },
                    enumerable: true,
                    configurable: true
                });
                IEBridge.prototype.start = function () {
                };
                IEBridge.prototype.fireCodeMarker = function (codeMarker) {
                    (Plugin).VS.Internal.CodeMarkers.fire(codeMarker);
                };
                IEBridge.prototype.openF1HelpLink = function (keyword) {
                    var f1OnlineBaseUrl = "http://msdn.microsoft.com/query/dev12.query?appId=Dev12IDEF1&l=";
                    var webClientF1KeywordPrefix = "VS.WebClient.Help.";
                    var url = f1OnlineBaseUrl + (Plugin).Culture.lang.toUpperCase() + "&k=k(" + webClientF1KeywordPrefix + keyword + ")";
                    this._external.openBrowser(url);
                };
                IEBridge.prototype.getScriptEngines = function () {
                    return (Plugin).Promise.wrap([
                        0
                    ]);
                };
                IEBridge.prototype.addEventListener = function (eventName, callback) {
                    switch(eventName) {
                        case "connect":
                        case "attach":
                        case "detach":
                        case "break":
                        case "run":
                        case "scriptError":
                        case "toggleFilter":
                            break;
                        default:
                            throw new Error("Invalid eventName." + eventName);
                    }
                    this._external.addEventListener(eventName, callback);
                };
                IEBridge.prototype.removeEventListener = function (eventName, callback) {
                    this._external.removeEventListener(eventName, callback);
                };
                return IEBridge;
            })();
            Console.IEBridge = IEBridge;            
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/bridge.js.map

// consoleChannel.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            var ConsoleChannel = (function (_super) {
                __extends(ConsoleChannel, _super);
                function ConsoleChannel(breakpointState, traceWriter) {
                                _super.call(this, traceWriter);
                    this._breakpointState = breakpointState;
                }
                ConsoleChannel.prototype.runExecuteBreakModeCommand = function (command) {
                    throw new Error("Not implemented");
                };
                ConsoleChannel.prototype.executeBreakModeCommand = function (engine, remoteFunction, id, input, callback, createInvoker) {
                    var _this = this;
                    var uid = this.getUid();
                    this.addCallback(uid, {
                        synced: true,
                        callback: callback || function () {
                        }
                    });
                    var invoker = createInvoker || ConsoleChannel.defaultInvoker;
                    var command = invoker(remoteFunction + ":" + id + ":" + uid, input, this._breakpointState.atBreakpointInWorker);
                    var sendBreakCommand = function () {
                        if(_this._breakpointState.atBreakpoint) {
                            _this.runExecuteBreakModeCommand(command).done(function (result) {
                                if(!result) {
                                    var jsonObj = {
                                        uid: uid,
                                        command: remoteFunction,
                                        args: [
                                            id, 
                                            input
                                        ]
                                    };
                                    var message = JSON.stringify([
                                        jsonObj
                                    ]);
                                    try  {
                                        _this.post(engine, message);
                                    } catch (e) {
                                        return;
                                    }
                                }
                            });
                        }
                    };
                    setTimeout(sendBreakCommand, 0);
                };
                ConsoleChannel.workerBreakpointInvokerString = function workerBreakpointInvokerString() {
                    var workerBreakpointInvokerFunction = function (id_SUBSTITUTION_MARKER, command_SUBSTITUTION_MARKER, __BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC) {
                        try  {
                            var result = eval(command_SUBSTITUTION_MARKER);
                            __BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC.INVOKER = {
                                returnValue: {
                                    isError: false,
                                    result: result
                                }
                            };
                        } catch (e) {
                            __BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC.INVOKER = {
                                returnValue: {
                                    isError: true,
                                    result: e
                                }
                            };
                        }
                        __BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC(id_SUBSTITUTION_MARKER, __BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC.INVOKER.returnValue);
                    };
                    return workerBreakpointInvokerFunction.toString();
                };
                ConsoleChannel.breakpointInvokerString = function breakpointInvokerString() {
                    var breakpointInvokerFunction = function (window, id_SUBSTITUTION_MARKER, command_SUBSTITUTION_MARKER) {
                        window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER = {
                            inline: [],
                            result: undefined,
                            isError: false
                        };
                        try  {
                            if((typeof window.cd) === "undefined") {
                                window.cd = window.console.cd;
                                window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline.push({
                                    name: "cd",
                                    func: window.console.cd
                                });
                            }
                            if((typeof window.dir) === "undefined") {
                                window.dir = window.console.dir;
                                window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline.push({
                                    name: "dir",
                                    func: window.console.dir
                                });
                            }
                            if((typeof window.select) === "undefined") {
                                window.select = window.console.select;
                                window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline.push({
                                    name: "select",
                                    func: window.console.select
                                });
                            }
                            if((typeof window.$) === "undefined") {
                                window.$ = window.__BROWSERTOOLS_CONSOLE.$;
                                window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline.push({
                                    name: "$",
                                    func: window.$
                                });
                            }
                            if((typeof window.$$) === "undefined") {
                                window.$$ = window.__BROWSERTOOLS_CONSOLE.$$;
                                window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline.push({
                                    name: "$$",
                                    func: window.$$
                                });
                            }
                            if(window.__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS) {
                                (function () {
                                    for(var i = 0; i <= 4; i++) {
                                        if((typeof window["$" + i]) === "undefined") {
                                            window["$" + i] = window.__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS[i];
                                            window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline.push({
                                                name: "$" + i,
                                                func: window["$" + i]
                                            });
                                        }
                                    }
                                })();
                            }
                            window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.result = eval(command_SUBSTITUTION_MARKER);
                            if(window.$_ === window.__BROWSERTOOLS_CONSOLE.$_ || (isNaN(window.$_) && isNaN(window.__BROWSERTOOLS_CONSOLE.$_))) {
                                window.__BROWSERTOOLS_CONSOLE.$_ = window.$_ = window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.result;
                            } else {
                                delete window.__BROWSERTOOLS_CONSOLE.$_;
                            }
                        } catch (e) {
                            window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.result = e;
                            window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.isError = true;
                        }
                        ;
                        window.__BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC(id_SUBSTITUTION_MARKER, window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER);
                        (function () {
                            for(var i = 0; i < window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline.length; i++) {
                                if(window[window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline[i].name] === window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline[i].func) {
                                    delete window[window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER.inline[i].name];
                                }
                            }
                        })();
                        delete window.__BROWSERTOOLS_CONSOLE_BREAKMODE_INVOKER;
                    };
                    return breakpointInvokerFunction.toString();
                };
                ConsoleChannel.defaultInvoker = function defaultInvoker(id, command, isWorker) {
                    var invokerString;
                    var escapedCommand = JSON.stringify(command).slice(1, -1);
                    if(id && isWorker) {
                        invokerString = ConsoleChannel.workerBreakpointInvokerString();
                    } else if(id && !isWorker) {
                        invokerString = ConsoleChannel.breakpointInvokerString();
                    }
                    if(invokerString) {
                        invokerString = invokerString.substring(invokerString.indexOf("{") + 1, invokerString.lastIndexOf("}"));
                        invokerString = invokerString.split("id_SUBSTITUTION_MARKER").join("\"" + id + "\"");
                        invokerString = invokerString.split("command_SUBSTITUTION_MARKER").join("\"" + escapedCommand + "\"");
                    } else {
                        invokerString = "__BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC(\"\"," + "\"" + escapedCommand + "\");";
                    }
                    return invokerString;
                };
                return ConsoleChannel;
            })(Common.Channel);
            Console.ConsoleChannel = ConsoleChannel;            
            var VSConsoleChannel = (function (_super) {
                __extends(VSConsoleChannel, _super);
                function VSConsoleChannel(proxy, breakpointState, traceWriter) {
                    this._proxy = proxy;
                    this._proxy.addEventListener("message", this.onmessage.bind(this));
                                _super.call(this, breakpointState, traceWriter);
                }
                VSConsoleChannel.prototype.runExecuteBreakModeCommand = function (command) {
                    return this._proxy._call("executeBreakModeCommand", command);
                };
                VSConsoleChannel.prototype.runSendMessage = function (engineId, portName, message) {
                    return this._proxy._post("sendMessage", engineId, portName, message);
                };
                VSConsoleChannel.prototype.loadScript = function (engineId, fileName) {
                    this._proxy._post("loadScript", engineId, fileName);
                };
                return VSConsoleChannel;
            })(ConsoleChannel);
            Console.VSConsoleChannel = VSConsoleChannel;            
            var IEConsoleChannel = (function (_super) {
                __extends(IEConsoleChannel, _super);
                function IEConsoleChannel(f12, external, breakpointState, traceWriter) {
                                _super.call(this, breakpointState, traceWriter);
                    this._f12 = f12;
                    this._external = external;
                    this._external.addEventListener("connect", this.onConnect.bind(this));
                }
                IEConsoleChannel.prototype.runExecuteBreakModeCommand = function (command) {
                    return this._f12.Debugger.executeBreakModeCommand(command);
                };
                IEConsoleChannel.prototype.runSendMessage = function (engineId, portName, message) {
                    this._port.postMessage(message);
                };
                IEConsoleChannel.prototype.loadScript = function (engineId, fileName) {
                    this._external.loadScriptInProc(fileName);
                };
                IEConsoleChannel.prototype.onConnect = function (port) {
                    this._port = port;
                    this._port.addEventListener("message", this.onmessage.bind(this));
                };
                return IEConsoleChannel;
            })(ConsoleChannel);
            Console.IEConsoleChannel = IEConsoleChannel;            
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/consoleChannel.js.map

// breakpointState.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            var BreakpointState = (function () {
                function BreakpointState(proxy) {
                    this._breakpointLocals = null;
                    proxy.addEventListener("break", this.onbreak.bind(this));
                    proxy.addEventListener("run", this.onrun.bind(this));
                }
                Object.defineProperty(BreakpointState.prototype, "atBreakpoint", {
                    get: function () {
                        return this._atBreakpoint;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BreakpointState.prototype, "atBreakpointInWorker", {
                    get: function () {
                        return this._atBreakpointInWorker;
                    },
                    enumerable: true,
                    configurable: true
                });
                BreakpointState.prototype.initialize = function () {
                    var _this = this;
                    this.getIsAtBreakpoint().done(function (data) {
                        _this._atBreakpoint = data;
                    });
                    this.getIsAtBreakpointInWorker().done(function (data) {
                        _this._atBreakpointInWorker = data;
                    });
                };
                BreakpointState.prototype.getIsAtBreakpoint = function () {
                    throw new Error("Not implemented");
                };
                BreakpointState.prototype.getIsAtBreakpointInWorker = function () {
                    throw new Error("Not implemented");
                };
                BreakpointState.prototype.getLocalsForCurrentStackFrame = function () {
                    throw new Error("Not implemented");
                };
                BreakpointState.prototype.getBreakpointLocals = function () {
                    var _this = this;
                    if(this._breakpointLocals) {
                        return (Plugin).Promise.wrap(this._breakpointLocals);
                    } else {
                        return this.getLocalsForCurrentStackFrame().then(function (data) {
                            _this._breakpointLocals = data;
                            return data;
                        });
                    }
                };
                BreakpointState.prototype.onbreak = function () {
                    var _this = this;
                    this._breakpointLocals = null;
                    this._atBreakpoint = true;
                    this.getIsAtBreakpointInWorker().done(function (data) {
                        _this._atBreakpointInWorker = data;
                    });
                };
                BreakpointState.prototype.onrun = function () {
                    this._breakpointLocals = null;
                    this._atBreakpoint = false;
                    this._atBreakpointInWorker = false;
                };
                return BreakpointState;
            })();
            Console.BreakpointState = BreakpointState;            
            var VSBreakpointState = (function (_super) {
                __extends(VSBreakpointState, _super);
                function VSBreakpointState(proxy) {
                                _super.call(this, proxy);
                    this._proxy = proxy;
                }
                VSBreakpointState.prototype.getIsAtBreakpoint = function () {
                    return this._proxy._call("getIsAtBreakpoint");
                };
                VSBreakpointState.prototype.getIsAtBreakpointInWorker = function () {
                    return this._proxy._call("getIsAtBreakpointInWorker");
                };
                VSBreakpointState.prototype.getLocalsForCurrentStackFrame = function () {
                    return this._proxy._call("getLocalsForCurrentStackFrame");
                };
                return VSBreakpointState;
            })(BreakpointState);
            Console.VSBreakpointState = VSBreakpointState;            
            var IEBreakpointState = (function (_super) {
                __extends(IEBreakpointState, _super);
                function IEBreakpointState(f12, external) {
                                _super.call(this, external);
                    this._f12 = f12;
                }
                IEBreakpointState.prototype.getIsAtBreakpoint = function () {
                    return Plugin.Promise.wrap(this._f12.Debugger.getIsAtBreakpoint());
                };
                IEBreakpointState.prototype.getIsAtBreakpointInWorker = function () {
                    return Plugin.Promise.wrap(this._f12.Debugger.getIsAtBreakpointInWorker());
                };
                IEBreakpointState.prototype.getLocalsForCurrentStackFrame = function () {
                    return this._f12.Debugger.getLocalsForCurrentStackFrame();
                };
                return IEBreakpointState;
            })(BreakpointState);
            Console.IEBreakpointState = IEBreakpointState;            
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/breakpointState.js.map

// consoleIntellisenseProvider.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            var ConsoleIntellisenseProvider = (function (_super) {
                __extends(ConsoleIntellisenseProvider, _super);
                function ConsoleIntellisenseProvider(bridge, engine, breakpointState, toolTraceWriter) {
                                _super.call(this);
                    this._bridge = bridge;
                    this._engine = engine;
                    this._breakpointState = breakpointState;
                    this._traceWriter = toolTraceWriter.traceWriter;
                }
                ConsoleIntellisenseProvider._nextId = 0;
                Object.defineProperty(ConsoleIntellisenseProvider.prototype, "traceWriter", {
                    get: function () {
                        return this._traceWriter;
                    },
                    enumerable: true,
                    configurable: true
                });
                ConsoleIntellisenseProvider.prototype.getIntellisenseChoices = function (searchExpression, completeCallback, cancelToken, etwKey) {
                    var _this = this;
                    if(!this._breakpointState.atBreakpointInWorker) {
                        var remoteCallback = function (results) {
                            _this.fireGetIntellisenseItemsEndEvent(etwKey);
                            if(!cancelToken.isCanceled) {
                                var choices = [];
                                if(results && results.choices) {
                                    for(var i = 0; i < results.choices.length; ++i) {
                                        choices.push(new Common.Intellisense.IntellisenseChoice(results.choices[i].name, results.choices[i].info));
                                    }
                                }
                                completeCallback(choices);
                            } else {
                                completeCallback([]);
                            }
                        };
                        this.fireGetIntellisenseItemsStartEvent(etwKey);
                        if(this._breakpointState.atBreakpoint) {
                            this._breakpointState.getBreakpointLocals().done(function (breakpointLocals) {
                                if(!cancelToken.isCanceled) {
                                    var context = {
                                        searchExpression: searchExpression,
                                        searchContext: "window",
                                        locals: breakpointLocals.map(function (value, index, array) {
                                            return value.name;
                                        })
                                    };
                                    var expressionTerms = context.searchExpression.split(".");
                                    if(expressionTerms.length > 0 && context.locals.indexOf(expressionTerms[0]) >= 0) {
                                        context.searchContext = expressionTerms[0];
                                        context.searchExpression = expressionTerms.slice(1).join(".");
                                    }
                                    _this._bridge.channel.executeBreakModeCommand(_this._engine(), "performBreakmodeIntellisense", ConsoleIntellisenseProvider.getNextId(), JSON.stringify(context), remoteCallback, ConsoleIntellisenseProvider.createInvoker);
                                } else {
                                    remoteCallback(null);
                                }
                            });
                        } else {
                            this._bridge.channel.call(this._engine(), "getIntellisenseItemsForExpression", [
                                searchExpression
                            ], remoteCallback);
                        }
                    }
                };
                ConsoleIntellisenseProvider.prototype.fireGetCurrentExpressionStartEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Provider_Get_Expression_Start, etwKey);
                };
                ConsoleIntellisenseProvider.prototype.fireGetCurrentExpressionEndEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Provider_Get_Expression_Stop, etwKey);
                };
                ConsoleIntellisenseProvider.prototype.fireUpdateIntellisenseStartEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Provider_Update_Start, etwKey);
                };
                ConsoleIntellisenseProvider.prototype.fireUpdateIntellisenseEndEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Provider_Update_Stop, etwKey);
                };
                ConsoleIntellisenseProvider.createInvoker = function createInvoker(id, searchContextString, isWorker) {
                    var context = JSON.parse(searchContextString);
                    var invoker = "__BROWSERTOOLS_CONSOLE.performBreakmodeIntellisense(\"" + id + "\", \"" + context.searchExpression + "\", window, " + context.searchContext + ", " + JSON.stringify(context.locals) + ")";
                    return invoker;
                };
                ConsoleIntellisenseProvider.getNextId = function getNextId() {
                    return ConsoleIntellisenseProvider._nextId++;
                };
                ConsoleIntellisenseProvider.prototype.fireGetIntellisenseItemsStartEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Provider_Get_Items_Start, etwKey);
                };
                ConsoleIntellisenseProvider.prototype.fireGetIntellisenseItemsEndEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Provider_Get_Items_Stop, etwKey);
                };
                return ConsoleIntellisenseProvider;
            })(Common.Intellisense.IntellisenseProviderBase);
            Console.ConsoleIntellisenseProvider = ConsoleIntellisenseProvider;            
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/consoleIntellisenseProvider.js.map

// inputcontrol.ts
var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            (function (Controls) {
                var InputControl = (function () {
                    function InputControl(executeCallback, intellisenseContext, resizeListViewCommand) {
                        this._executeCallback = executeCallback;
                        this._intellisenseContext = intellisenseContext;
                        this._resizeListView = resizeListViewCommand;
                        this._commandItems = [];
                        this._commandIndex = -1;
                        this._isSingleLineMode = true;
                        this._savedSelectionValid = false;
                        this.initialize();
                    }
                    InputControl._minMultiLineConsolePaneSize = 30;
                    InputControl._defaultMultiLineConsolePaneSize = 80;
                    InputControl._minPaneSize = 25;
                    InputControl._consoleAreaOffset = 10;
                    InputControl._minOutputHeightToLeaveWhenMultiLine = 36;
                    Object.defineProperty(InputControl.prototype, "commandItems", {
                        get: function () {
                            return this._commandItems;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(InputControl.prototype, "isSingleLineMode", {
                        get: function () {
                            return this._isSingleLineMode;
                        },
                        set: function (value) {
                            if(value) {
                                this.switchToSingleLineConsole();
                            } else {
                                this.switchToMultiLineConsole();
                            }
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(InputControl.prototype, "inputText", {
                        get: function () {
                            if(this._isSingleLineMode) {
                                return this._singleInputElement.value;
                            } else {
                                return this._multiInputElement.value;
                            }
                        },
                        set: function (text) {
                            if(this._isSingleLineMode) {
                                this._singleInputElement.value = text;
                            } else {
                                this._multiInputElement.value = text;
                            }
                        },
                        enumerable: true,
                        configurable: true
                    });
                    InputControl.prototype.enable = function () {
                        this._inputPanelElement.style.display = "block";
                    };
                    InputControl.prototype.disable = function () {
                        this._inputPanelElement.style.display = "none";
                    };
                    InputControl.prototype.executeCommandApi = function (command) {
                        if(this._isSingleLineMode) {
                            this._singleInputElement.value = command;
                        } else {
                            this._multiInputElement.value = command;
                        }
                        this.executeCommand();
                        return this._inputId;
                    };
                    InputControl.prototype.onInputKeyDownApi = function (e) {
                        if(this._isSingleLineMode) {
                            e.target = this._singleInputElement;
                        } else {
                            e.target = this._multiInputElement;
                        }
                        return this.onInputKeyDown(e);
                    };
                    InputControl.prototype.focusOnInput = function () {
                        if(this._isSingleLineMode) {
                            this._singleInputElement.focus();
                        } else {
                            this._multiInputElement.focus();
                        }
                    };
                    InputControl.prototype.setSelectionRange = function (start, end) {
                        if(this._isSingleLineMode) {
                            this._singleInputElement.setSelectionRange(start, end);
                        } else {
                            this._multiInputElement.setSelectionRange(start, end);
                        }
                    };
                    InputControl.prototype.handleContextMenu = function (e) {
                        this.showContextMenu(e.clientX, e.clientY);
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        return false;
                    };
                    InputControl.prototype.invokeContextMenu = function (menuId, menuItem) {
                        var element;
                        if(this.isSingleLineMode) {
                            element = this._singleInputElement;
                        } else {
                            element = this._multiInputElement;
                        }
                        var selectedText = element.value.substring(this._copyStart, this._copyEnd);
                        var pasteText = clipboardData.getData("Text");
                        switch(menuItem.id) {
                            case "menuConsoleInputCut":
                                clipboardData.setData("Text", selectedText);
                                this.updateInputElementTextRange(this._copyStart, this._copyEnd, "");
                                element.focus();
                                break;
                            case "menuConsoleInputCopy":
                                clipboardData.setData("Text", selectedText);
                                element.focus();
                                element.setSelectionRange(this._copyStart, this._copyEnd);
                                break;
                            case "menuConsoleInputPaste":
                                if(pasteText) {
                                    if(pasteText.indexOf("\n") >= 0) {
                                        this.switchToMultiLineConsole();
                                        element = this._multiInputElement;
                                    }
                                    this._intellisenseContext.uninitialize();
                                    this.updateInputElementTextRange(this._copyStart, this._copyEnd, pasteText);
                                    element.focus();
                                    this._intellisenseContext.initialize(element);
                                }
                                break;
                        }
                    };
                    InputControl.prototype.initialize = function () {
                        var _this = this;
                        this._mainContainer = document.getElementById("mainContainer");
                        this._toolbar = document.getElementById("toolbar");
                        this._outputPanelElement = document.getElementById("outputArea");
                        this._inputPanelElement = document.getElementById("inputArea");
                        this._dividerElement = document.getElementById("inputSplitter");
                        this._singleInputElement = document.getElementById("input-singleLine");
                        this._multiInputElement = document.getElementById("input-multiLine");
                        this._multiInputContainerElement = document.getElementById("inputMultilineContainer");
                        this._executeButton = document.getElementById("executeButton");
                        this._toggleButton = document.getElementById("toggleButton");
                        this._clearInputButton = document.getElementById("clearInputButton");
                        this.attachButtonEvents(this._executeButton, function () {
                            return _this.executeButtonPressed();
                        });
                        this.attachButtonEvents(this._toggleButton, function () {
                            return _this.toggleLineMode();
                        });
                        this.attachButtonEvents(this._clearInputButton, function () {
                            return _this.clearInput();
                        });
                        this._singleInputElement.addEventListener("keydown", function (e) {
                            return _this.onInputKeyDown(e);
                        });
                        this._multiInputElement.addEventListener("keydown", function (e) {
                            return _this.onInputKeyDown(e);
                        });
                        this._multiInputElement.addEventListener("blur", function (e) {
                            return _this.multiOnBlur(e);
                        });
                        this._multiInputElement.addEventListener("focus", function (e) {
                            return _this.multiOnFocus(e);
                        });
                        this._dividerElement.addEventListener("mousedown", function (e) {
                            return _this.onDividerMouseDown(e);
                        });
                        this._clearInputButton.onmouseover = function () {
                            Plugin.Tooltip.show({
                                content: toolwindowHelpers.loadString("ConsoleClearInputButtonTooltip")
                            });
                            return true;
                        };
                        this._singleInputElement.onmouseover = function () {
                            Plugin.Tooltip.show({
                                content: toolwindowHelpers.loadString("ConsoleInputTooltip")
                            });
                            return true;
                        };
                        this._multiInputElement.onmouseover = function () {
                            Plugin.Tooltip.show({
                                content: toolwindowHelpers.loadString("ConsoleInputTooltip")
                            });
                            return true;
                        };
                        this._singleInputElement.setAttribute("aria-label", toolwindowHelpers.loadString("ConsoleInputTooltip"));
                        this._multiInputElement.setAttribute("aria-label", toolwindowHelpers.loadString("ConsoleInputTooltip"));
                        this._clearInputButton.setAttribute("aria-label", toolwindowHelpers.loadString("ConsoleClearInputButtonTooltip"));
                        this._isSingleLineMode = !this._isSingleLineMode;
                        this.toggleLineMode();
                        this._multiInputElement.addEventListener("contextmenu", function (e) {
                            return _this.handleContextMenu(e);
                        });
                        this._singleInputElement.addEventListener("contextmenu", function (e) {
                            return _this.handleContextMenu(e);
                        });
                        if(Plugin.F12) {
                            Plugin.F12.addEventListener("keydown", function (e) {
                                if(e.keyCode === Common.KeyCodes.I && e.ctrlKey && e.altKey && !e.shiftKey) {
                                    if(_this._isSingleLineMode) {
                                        _this._singleInputElement.focus();
                                    } else {
                                        _this._multiInputElement.focus();
                                    }
                                }
                            });
                        }
                    };
                    InputControl.prototype.attachButtonEvents = function (button, callback) {
                        button.addEventListener("click", function (e) {
                            callback();
                        });
                        button.addEventListener("keydown", function (e) {
                            if(e.keyCode === Common.KeyCodes.Enter || e.keyCode === Common.KeyCodes.Space) {
                                callback();
                                e.preventDefault();
                            }
                        });
                    };
                    InputControl.prototype.onDividerMouseDown = function (e) {
                        var _this = this;
                        var startY = e.clientY;
                        var startHeight = this._inputPanelElement.clientHeight;
                        var maxHeight = this._mainContainer.clientHeight - this._toolbar.clientHeight;
                        var mouseMoveHandler = function (e) {
                            _this.setPaneHeight(Math.min(maxHeight, startHeight + startY - e.clientY));
                        };
                        var mouseUpHandler = function (e) {
                            document.removeEventListener("mousemove", mouseMoveHandler);
                            document.removeEventListener("mouseup", mouseUpHandler);
                        };
                        document.addEventListener("mousemove", mouseMoveHandler);
                        document.addEventListener("mouseup", mouseUpHandler);
                    };
                    InputControl.prototype.onInputKeyDown = function (e) {
                        if(this._intellisenseContext.intellisenseMenu.isOpen && (this._intellisenseContext.intellisenseMenu.hasSelection || e.keyCode !== Common.KeyCodes.Enter)) {
                            return true;
                        }
                        var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
                        if(event.keyCode === Common.KeyCodes.F10 && shiftKey) {
                            this.showContextMenu(0, 0);
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            return false;
                        }
                        if(e.target === this._singleInputElement) {
                            var inputText = this._singleInputElement.value;
                            if(this._commandItems.length > 0 && e.keyCode === Common.KeyCodes.ArrowUp) {
                                this._commandIndex = this._commandIndex < (this._commandItems.length - 1) ? this._commandIndex : this._commandItems.length - 1;
                                while(this._commandIndex >= 0 && this._commandItems[this._commandIndex] === inputText) {
                                    this._commandIndex--;
                                }
                                this._intellisenseContext.uninitialize();
                                this.setSingleLineInputElementText(this._commandItems[this._commandIndex >= 0 ? this._commandIndex : 0]);
                                this._singleInputElement.focus();
                                if(this._commandIndex < 0) {
                                    this._singleInputElement.setSelectionRange(0, 0);
                                }
                                this._intellisenseContext.initialize(this._singleInputElement);
                            } else if(this._commandItems.length > 0 && e.keyCode === Common.KeyCodes.ArrowDown) {
                                var navigateToNextCommand = this._commandIndex >= 0;
                                this._commandIndex = this._commandIndex < 0 ? 0 : this._commandIndex;
                                while(this._commandIndex < this._commandItems.length && this._commandItems[this._commandIndex] === inputText && navigateToNextCommand) {
                                    this._commandIndex++;
                                }
                                this._intellisenseContext.uninitialize();
                                inputText = this._commandIndex < this._commandItems.length ? this._commandItems[this._commandIndex] : "";
                                this.setSingleLineInputElementText(inputText);
                                this._singleInputElement.focus();
                                this._intellisenseContext.initialize(this._singleInputElement);
                            } else if(e.keyCode === Common.KeyCodes.M && !e.shiftKey && e.ctrlKey && e.altKey) {
                                this.toggleLineMode();
                                e.preventDefault();
                                return false;
                            } else if(e.keyCode === Common.KeyCodes.Enter && !e.shiftKey && !e.ctrlKey && !e.altKey) {
                                this._intellisenseContext.uninitialize();
                                this.executeCommand();
                                this._intellisenseContext.initialize(this._singleInputElement);
                            } else if(e.keyCode === Common.KeyCodes.Enter && e.shiftKey && !e.ctrlKey && !e.altKey) {
                                var start = this._singleInputElement.selectionStart;
                                var end = this._singleInputElement.selectionEnd;
                                this.toggleLineMode();
                                this._multiInputElement.setSelectionRange(start, end);
                            } else if(!this._intellisenseContext.intellisenseMenu.isOpen && e.keyCode === Common.KeyCodes.Escape) {
                                this.setSingleLineInputElementText("");
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                            } else if(e.keyCode === Common.KeyCodes.V && e.ctrlKey && !e.shiftKey && !e.altKey) {
                                var pasteText = clipboardData.getData("Text");
                                if(pasteText && pasteText.indexOf("\n") >= 0) {
                                    var start = this._singleInputElement.selectionStart;
                                    var end = this._singleInputElement.selectionEnd;
                                    this.switchToMultiLineConsole();
                                    this._intellisenseContext.uninitialize();
                                    this.updateInputElementTextRange(start, end, pasteText);
                                    this._intellisenseContext.initialize(this._multiInputElement);
                                    e.preventDefault();
                                    e.stopPropagation();
                                    return false;
                                }
                                return true;
                            }
                        } else {
                            var inputText = this._multiInputElement.value;
                            if(e.keyCode === Common.KeyCodes.Tab && !e.shiftKey && !e.altKey && !e.ctrlKey) {
                                this._intellisenseContext.uninitialize();
                                var start = this._multiInputElement.selectionStart;
                                var end = this._multiInputElement.selectionEnd;
                                this.updateInputElementTextRange(start, end, "\t");
                                this._multiInputElement.setSelectionRange(start + 1, start + 1);
                                this._intellisenseContext.initialize(this._multiInputElement);
                                e.preventDefault();
                                return false;
                            } else if(e.keyCode === Common.KeyCodes.Enter && e.ctrlKey && !e.shiftKey && !e.altKey) {
                                this._intellisenseContext.intellisenseMenu.isOpen = false;
                                this.executeCommand();
                            } else if(e.keyCode === Common.KeyCodes.M && e.ctrlKey && !e.shiftKey && e.altKey) {
                                this.toggleLineMode();
                                e.preventDefault();
                                return false;
                            } else if(!this._intellisenseContext.intellisenseMenu.isOpen && e.keyCode === Common.KeyCodes.Escape) {
                                this.setMultiLineInputElementText("");
                                e.preventDefault();
                                e.stopPropagation();
                                return false;
                            }
                        }
                        return true;
                    };
                    InputControl.prototype.multiOnBlur = function (e) {
                        this._savedSelectionEnd = this._multiInputElement.selectionEnd;
                        this._savedSelectionValid = true;
                        return true;
                    };
                    InputControl.prototype.multiOnFocus = function (e) {
                        if(this._savedSelectionValid && this._multiInputElement.selectionEnd >= this._multiInputElement.value.length) {
                            this._multiInputElement.setSelectionRange(this._savedSelectionEnd, this._savedSelectionEnd);
                        }
                        return true;
                    };
                    InputControl.prototype.setPaneHeight = function (newHeight) {
                        newHeight = Math.round(newHeight);
                        if(newHeight < InputControl._minPaneSize) {
                            return;
                        }
                        this._inputPanelElement.style.height = newHeight + "px";
                        var inputHeight = (newHeight - InputControl._consoleAreaOffset);
                        this._singleInputElement.style.height = inputHeight + "px";
                        this._multiInputElement.style.height = inputHeight + "px";
                        this._outputPanelElement.style.bottom = (newHeight - this._dividerElement.offsetTop) + "px";
                        this._resizeListView();
                        if(newHeight < InputControl._minMultiLineConsolePaneSize) {
                            this.switchToSingleLineConsole(newHeight);
                        } else if(this._isSingleLineMode && newHeight >= InputControl._minMultiLineConsolePaneSize) {
                            this.switchToMultiLineConsole(newHeight);
                        }
                    };
                    InputControl.prototype.switchToSingleLineConsole = function (paneHeight) {
                        if(!this._isSingleLineMode) {
                            this._isSingleLineMode = true;
                            var text = this._multiInputElement.value;
                            text = (text ? text.replace(/[\r\n]/g, " ") : "");
                            this._multiInputContainerElement.style.display = "none";
                            this._singleInputElement.style.display = "inline-block";
                            this.setSingleLineInputElementText(text);
                            this._toggleButton.classList.remove("BPT-Toggle-SingleIcon");
                            this._toggleButton.classList.add("BPT-Toggle-MultiIcon");
                            this._toggleButton.onmouseover = function () {
                                Plugin.Tooltip.show({
                                    content: toolwindowHelpers.loadString("ToggleToMultiLineTooltip")
                                });
                            };
                            this._toggleButton.setAttribute("aria-label", toolwindowHelpers.loadString("ToggleToMultiLineTooltip"));
                            this._executeButton.onmouseover = function () {
                                Plugin.Tooltip.show({
                                    content: toolwindowHelpers.loadString("RunScriptButtonText")
                                });
                            };
                            this._executeButton.setAttribute("aria-label", toolwindowHelpers.loadString("RunScriptButtonText"));
                            this._intellisenseContext.uninitialize();
                            this._intellisenseContext.initialize(this._singleInputElement);
                            this.setPaneHeight(paneHeight || InputControl._minPaneSize);
                            this._singleInputElement.focus();
                        }
                    };
                    InputControl.prototype.switchToMultiLineConsole = function (paneHeight) {
                        if(this._isSingleLineMode) {
                            this._isSingleLineMode = false;
                            var text = this._singleInputElement.value;
                            this._multiInputContainerElement.style.display = "inline-block";
                            this._singleInputElement.style.display = "none";
                            this.setMultiLineInputElementText(text);
                            this._toggleButton.classList.remove("BPT-Toggle-MultiIcon");
                            this._toggleButton.classList.add("BPT-Toggle-SingleIcon");
                            this._toggleButton.onmouseover = function () {
                                Plugin.Tooltip.show({
                                    content: toolwindowHelpers.loadString("ToggleToSingleLineTooltip")
                                });
                            };
                            this._toggleButton.setAttribute("aria-label", toolwindowHelpers.loadString("ToggleToSingleLineTooltip"));
                            this._executeButton.onmouseover = function () {
                                Plugin.Tooltip.show({
                                    content: toolwindowHelpers.loadString("RunScriptButtonTextMultiLine")
                                });
                            };
                            this._executeButton.setAttribute("aria-label", toolwindowHelpers.loadString("RunScriptButtonTextMultiLine"));
                            this._intellisenseContext.uninitialize();
                            this._intellisenseContext.initialize(this._multiInputElement);
                            var inputContainer = document.getElementById("inputBoxContainer");
                            if(inputContainer.clientHeight < InputControl._minMultiLineConsolePaneSize) {
                                this.setPaneHeight(paneHeight || Math.max(InputControl._minMultiLineConsolePaneSize, Math.min(InputControl._defaultMultiLineConsolePaneSize, this._outputPanelElement.clientHeight + this._inputPanelElement.clientHeight - InputControl._minOutputHeightToLeaveWhenMultiLine)));
                            }
                            this._multiInputElement.focus();
                        }
                    };
                    InputControl.prototype.executeButtonPressed = function () {
                        this.executeCommand();
                        if(this._isSingleLineMode) {
                            this._singleInputElement.focus();
                        } else {
                            this._multiInputElement.focus();
                        }
                    };
                    InputControl.prototype.executeCommand = function () {
                        var inputText = "";
                        if(this._isSingleLineMode) {
                            inputText = this._singleInputElement.value;
                            this._singleInputElement.value = "";
                        } else {
                            inputText = this._multiInputElement.value;
                        }
                        inputText = inputText.trim();
                        var inputId = this._executeCallback(inputText);
                        this._inputId = inputId;
                        if(inputId >= 0 && this._isSingleLineMode) {
                            if(this._commandItems[this._commandItems.length - 1] !== inputText) {
                                this._commandItems.push(inputText);
                            }
                            this._commandIndex = this._commandItems.length - 1;
                        }
                    };
                    InputControl.prototype.toggleLineMode = function () {
                        if(this._isSingleLineMode) {
                            this.switchToMultiLineConsole();
                        } else {
                            this.switchToSingleLineConsole();
                        }
                    };
                    InputControl.prototype.clearInput = function () {
                        if(this._isSingleLineMode) {
                            this.setSingleLineInputElementText("");
                            this._singleInputElement.focus();
                        } else {
                            this.setMultiLineInputElementText("");
                            this._multiInputElement.focus();
                        }
                    };
                    InputControl.prototype.setSingleLineInputElementText = function (text) {
                        var range = this._singleInputElement.createTextRange();
                        var useUndo = range.queryCommandSupported("ms-beginUndoUnit");
                        if(useUndo) {
                            range.execCommand("ms-beginUndoUnit");
                        }
                        range.text = text;
                        if(useUndo) {
                            range.execCommand("ms-endUndoUnit");
                        }
                    };
                    InputControl.prototype.setMultiLineInputElementText = function (text) {
                        var range = this._multiInputElement.createTextRange();
                        var useUndo = range.queryCommandSupported("ms-beginUndoUnit");
                        if(useUndo) {
                            range.execCommand("ms-beginUndoUnit");
                        }
                        range.text = text;
                        if(useUndo) {
                            range.execCommand("ms-endUndoUnit");
                        }
                        this._savedSelectionValid = false;
                    };
                    InputControl.prototype.updateInputElementTextRange = function (start, end, text) {
                        var element;
                        if(this._isSingleLineMode) {
                            element = this._singleInputElement;
                        } else {
                            element = this._multiInputElement;
                        }
                        var range = element.createTextRange();
                        var useUndo = range.queryCommandSupported("ms-beginUndoUnit");
                        if(useUndo) {
                            range.execCommand("ms-beginUndoUnit");
                        }
                        range.move("character", start);
                        range.moveEnd("character", end - start);
                        range.text = text;
                        if(useUndo) {
                            range.execCommand("ms-endUndoUnit");
                        }
                    };
                    InputControl.prototype.showContextMenu = function (clientX, clientY) {
                        var _this = this;
                        var x = clientX;
                        var y = clientY;
                        var element;
                        if(this.isSingleLineMode) {
                            element = this._singleInputElement;
                        } else {
                            element = this._multiInputElement;
                        }
                        if(clientX <= 0 || clientY <= 0) {
                            var offset = element.getBoundingClientRect();
                            x = offset.left;
                            y = offset.top;
                        }
                        try  {
                            this._copyStart = element.selectionStart;
                            this._copyEnd = element.selectionEnd;
                        } catch (e) {
                            return;
                        }
                        var _menuItems = [
                            {
                                id: "menuConsoleInputCut",
                                type: Plugin.ContextMenu.MenuItemType.command,
                                label: Plugin.Resources.getString("/Common/CutMenuText"),
                                accessKey: Plugin.Resources.getString("AccessKeyCtrlX")
                            }, 
                            {
                                id: "menuConsoleInputCopy",
                                type: Plugin.ContextMenu.MenuItemType.command,
                                label: Plugin.Resources.getString("/Common/CopyMenuText"),
                                accessKey: Plugin.Resources.getString("AccessKeyCtrlC")
                            }, 
                            {
                                id: "menuConsoleInputPaste",
                                type: Plugin.ContextMenu.MenuItemType.command,
                                label: Plugin.Resources.getString("/Common/PasteMenuText"),
                                accessKey: Plugin.Resources.getString("AccessKeyCtrlV")
                            }
                        ];
                        var contextMenu = Plugin.ContextMenu.create(_menuItems, null, null, null, function (menuId, menuItem) {
                            return _this.invokeContextMenu(menuId, menuItem);
                        });
                        contextMenu.addEventListener("dismiss", function () {
                            contextMenu.dispose();
                        });
                        contextMenu.attach(element);
                        contextMenu.show(parseInt(x.toFixed(0)), parseInt(y.toFixed(0)));
                    };
                    return InputControl;
                })();
                Controls.InputControl = InputControl;                
            })(Console.Controls || (Console.Controls = {}));
            var Controls = Console.Controls;
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/inputcontrol.js.map

// menus.ts
var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            var menuOutputAreaItems;
            (function (menuOutputAreaItems) {
                menuOutputAreaItems._map = [];
                menuOutputAreaItems.menuConsoleViewAsHtml = 0;
                menuOutputAreaItems.menuConsoleViewAsObject = 1;
                menuOutputAreaItems.menuConsoleAddToWatch = 2;
                menuOutputAreaItems.menuConsoleCopy = 4;
                menuOutputAreaItems.menuConsoleCopyItem = 5;
                menuOutputAreaItems.menuConsoleCopyAll = 6;
                menuOutputAreaItems.menuConsoleClear = 8;
                menuOutputAreaItems.menuConsoleFilterErrors = 10;
                menuOutputAreaItems.menuConsoleFilterWarnings = 11;
                menuOutputAreaItems.menuConsoleFilterMessages = 12;
                menuOutputAreaItems.menuConsoleFilterLog = 13;
                menuOutputAreaItems.menuConsoleFilterAll = 14;
            })(menuOutputAreaItems || (menuOutputAreaItems = {}));
            var ContextMenuController = (function () {
                function ContextMenuController(console, listview) {
                    this._menuId = "ConsoleOutputContextMenu";
                    this._selectedItem = null;
                    this._menuItems = [
                        {
                            id: "menuConsoleViewAsHtml",
                            type: Plugin.ContextMenu.MenuItemType.command,
                            label: Plugin.Resources.getString("/Common/ViewAsHtmlMenuText")
                        }, 
                        {
                            id: "menuConsoleViewAsObject",
                            type: Plugin.ContextMenu.MenuItemType.command,
                            label: Plugin.Resources.getString("/Common/ViewAsObjectMenuText")
                        }, 
                        {
                            id: "menuConsoleAddToWatch",
                            type: Plugin.ContextMenu.MenuItemType.command,
                            label: Plugin.Resources.getString("/Common/AddToWatch")
                        }, 
                        {
                            id: "separator",
                            type: Plugin.ContextMenu.MenuItemType.separator
                        }, 
                        {
                            id: "menuConsoleCopy",
                            type: Plugin.ContextMenu.MenuItemType.command,
                            label: Plugin.Resources.getString("/Common/CopyMenuText")
                        }, 
                        {
                            id: "menuConsoleCopyItem",
                            type: Plugin.ContextMenu.MenuItemType.command,
                            label: Plugin.Resources.getString("/Common/CopyItemMenuText")
                        }, 
                        {
                            id: "menuConsoleCopyAll",
                            type: Plugin.ContextMenu.MenuItemType.command,
                            label: Plugin.Resources.getString("/Common/CopyAllMenuText")
                        }, 
                        {
                            id: "separator",
                            type: Plugin.ContextMenu.MenuItemType.separator
                        }, 
                        {
                            id: "menuConsoleClear",
                            type: Plugin.ContextMenu.MenuItemType.command,
                            label: Plugin.Resources.getString("/Common/ClearMenuText")
                        }, 
                        {
                            id: "separator",
                            type: Plugin.ContextMenu.MenuItemType.separator
                        }, 
                        {
                            id: "menuConsoleFilterErrors",
                            type: Plugin.ContextMenu.MenuItemType.checkbox,
                            label: Plugin.Resources.getString("/Common/FilterErrorsMenuText")
                        }, 
                        {
                            id: "menuConsoleFilterWarnings",
                            type: Plugin.ContextMenu.MenuItemType.checkbox,
                            label: Plugin.Resources.getString("/Common/FilterWarningsMenuText")
                        }, 
                        {
                            id: "menuConsoleFilterMessages",
                            type: Plugin.ContextMenu.MenuItemType.checkbox,
                            label: Plugin.Resources.getString("/Common/FilterMessagesMenuText")
                        }, 
                        {
                            id: "menuConsoleFilterLog",
                            type: Plugin.ContextMenu.MenuItemType.checkbox,
                            label: Plugin.Resources.getString("/Common/FilterLogMenuText")
                        }, 
                        {
                            id: "menuConsoleFilterAll",
                            type: Plugin.ContextMenu.MenuItemType.checkbox,
                            label: Plugin.Resources.getString("/Common/FilterDisplayAllMenuText")
                        }
                    ];
                    this._console = console;
                    this._listview = listview;
                    this.initialize();
                }
                ContextMenuController.prototype.CanViewAsHtml = function () {
                    if(this._selectedItem && this._selectedItem instanceof Common.ObjectView.TreeViewOutputItem) {
                        var item = (this._selectedItem);
                        return (item.viewableTypeFlags & Common.ObjectView.ViewableTypeFlags.Html) === Common.ObjectView.ViewableTypeFlags.Html;
                    }
                    return false;
                };
                ContextMenuController.prototype.CanViewAsObject = function () {
                    if(this._selectedItem && this._selectedItem instanceof Common.ObjectView.TreeViewOutputItem) {
                        var item = (this._selectedItem);
                        return (item.viewableTypeFlags & Common.ObjectView.ViewableTypeFlags.Object) === Common.ObjectView.ViewableTypeFlags.Object;
                    }
                    return false;
                };
                ContextMenuController.prototype.CanAddToWatch = function () {
                    return this._selectedItem && this._selectedItem.getWatchExpression() != undefined;
                };
                ContextMenuController.prototype.setSelectedItem = function (item) {
                    this._selectedItem = item;
                };
                ContextMenuController.prototype.initialize = function () {
                    var _this = this;
                    this._outputArea = document.getElementById("outputArea");
                    this._outputArea.addEventListener("contextmenu", function (e) {
                        return _this.onOutputAreaContextMenu(e);
                    });
                    this._outputArea.addEventListener("keydown", function (e) {
                        return _this.onOutputAreaContextMenuByKey(e);
                    });
                };
                ContextMenuController.prototype.onOutputAreaContextMenuByKey = function (event) {
                    this._console.onConsoleBeforeMenuLoaded();
                    var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
                    if(event.keyCode === Common.KeyCodes.F10 && shiftKey) {
                        this.showContextMenu(0, 0);
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                    this._console.onConsoleMenuLoaded();
                    return true;
                };
                ContextMenuController.prototype.onOutputAreaContextMenu = function (e) {
                    this._console.onConsoleBeforeMenuLoaded();
                    this.showContextMenu(e.clientX, e.clientY);
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    this._console.onConsoleMenuLoaded();
                    return false;
                };
                ContextMenuController.prototype.showContextMenu = function (x, y) {
                    var _this = this;
                    var selectedRow = null;
                    this._selectedItem = null;
                    this._selectedText = toolwindowHelpers.getSelectedText();
                    if(x <= 0 || y <= 0) {
                        x = 0;
                        y = 0;
                        if(document.activeElement) {
                            this._selectedItem = this._listview.getSelectedItem();
                            if(this._selectedItem) {
                                selectedRow = this._listview.getSelectedRow();
                                if(selectedRow) {
                                    var rect = selectedRow.getBoundingClientRect();
                                    x = rect.left + 20;
                                    y = rect.top + rect.height / 2;
                                }
                            }
                        }
                    } else {
                        this._selectedItem = this._listview.getSelectedItem();
                        selectedRow = this._listview.getSelectedRow();
                    }
                    if(!this._contextMenu) {
                        this._menuItems[menuOutputAreaItems.menuConsoleViewAsHtml].disabled = function () {
                            return !_this.CanViewAsHtml();
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleViewAsObject].disabled = function () {
                            return !_this.CanViewAsObject();
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleAddToWatch].disabled = function () {
                            return !_this.CanAddToWatch();
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleAddToWatch].hidden = function () {
                            return !_this.HasAddToWatch();
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleCopy].disabled = function () {
                            return !(_this._selectedText);
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleCopyItem].disabled = function () {
                            return !(_this._selectedItem !== null);
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleCopyAll].disabled = function () {
                            return !(_this._listview.getItemCount() > 0);
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleClear].disabled = function () {
                            return !(_this._listview.getUnfilteredItemCount() > 0);
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleFilterErrors].checked = function () {
                            return _this._console.notificationFilters.errors;
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleFilterWarnings].checked = function () {
                            return _this._console.notificationFilters.warnings;
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleFilterMessages].checked = function () {
                            return _this._console.notificationFilters.messages;
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleFilterLog].checked = function () {
                            return _this._console.notificationFilters.log;
                        };
                        this._menuItems[menuOutputAreaItems.menuConsoleFilterAll].checked = function () {
                            return (_this._console.notificationFilters.errors && _this._console.notificationFilters.warnings && _this._console.notificationFilters.messages && _this._console.notificationFilters.log);
                        };
                        this._contextMenu = Plugin.ContextMenu.create(this._menuItems, this._menuId, null, null, function (menuId, menuItem) {
                            return _this.onMenuItemClicked(menuId, menuItem.id, _this._selectedItem, selectedRow, _this._selectedText);
                        });
                    }
                    if(selectedRow) {
                        this._contextMenu.attach(selectedRow);
                    }
                    this._contextMenu.show(parseInt(x.toFixed(0)), parseInt(y.toFixed(0)));
                };
                ContextMenuController.prototype.HasAddToWatch = function () {
                    return this._console.hasAddToWatch();
                };
                ContextMenuController.prototype.onMenuItemClicked = function (menuId, itemId, selectedItem, selectedRow, selectedText) {
                    if(menuId === this._menuId) {
                        var menuItems = this._menuItems;
                        switch(itemId) {
                            case menuItems[menuOutputAreaItems.menuConsoleViewAsHtml].id:
                                if(selectedItem && selectedItem instanceof Common.ObjectView.TreeViewOutputItem) {
                                    this._console.evaluateItemAsType(selectedItem, Common.ObjectView.ViewableTypeFlags.Html);
                                }
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleViewAsObject].id:
                                if(selectedItem && selectedItem instanceof Common.ObjectView.TreeViewOutputItem) {
                                    this._console.evaluateItemAsType(selectedItem, Common.ObjectView.ViewableTypeFlags.Object);
                                }
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleAddToWatch].id:
                                this._console.addToWatch(selectedItem);
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleCopy].id:
                                this._console.copySelectedTextToClipboard(selectedText);
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleCopyItem].id:
                                this._console.copyItemToClipboard(selectedItem);
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleCopyAll].id:
                                this._console.copyAll();
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleClear].id:
                                this._console.clear();
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleFilterErrors].id:
                                this._console.toggleFilter(Common.ObjectView.TreeViewUtils.ConsoleFilterId.error);
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleFilterWarnings].id:
                                this._console.toggleFilter(Common.ObjectView.TreeViewUtils.ConsoleFilterId.warning);
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleFilterMessages].id:
                                this._console.toggleFilter(Common.ObjectView.TreeViewUtils.ConsoleFilterId.message);
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleFilterLog].id:
                                this._console.toggleFilter(Common.ObjectView.TreeViewUtils.ConsoleFilterId.log);
                                break;
                            case menuItems[menuOutputAreaItems.menuConsoleFilterAll].id:
                                this._console.toggleFilter(Common.ObjectView.TreeViewUtils.ConsoleFilterId.all, true);
                                break;
                            default:
                                break;
                        }
                    }
                };
                return ContextMenuController;
            })();
            Console.ContextMenuController = ContextMenuController;            
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/menus.js.map

// console.ts
var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            var ConsoleWindow = (function () {
                function ConsoleWindow(bridge, traceWriter) {
                    var _this = this;
                    this._targetEngineItems = [];
                    this._bridge = bridge;
                    this._breakpointState = this._bridge.breakpointState;
                    this._throttle = new Common.MessageThrottle();
                    this._traceWriter = traceWriter;
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Window_Create_Start);
                    toolwindowHelpers.registerErrorComponent("Console", this.onError.bind(this));
                    this._intellisenseContext = new Common.Intellisense.IntellisenseContext(new Common.Intellisense.InputElementTextEditorBridge(), new Common.Intellisense.IntellisenseMenu("intellisenseListBox", null, null, null, null, this, this), new Console.ConsoleIntellisenseProvider(this._bridge, function () {
                        return _this._currentEngine;
                    }, this._breakpointState, this));
                    this._outputList = document.getElementById("outputList");
                    this._listview = new Common.ObjectView.ObjectTreeView(this._outputList, function (item) {
                        return _this.onListViewToggle(item);
                    }, null, null, function (item, row, cell) {
                        return _this.onListViewClick(item, row, cell);
                    });
                    this._inputControl = new Console.Controls.InputControl(function (command) {
                        return _this.processInput(command);
                    }, this._intellisenseContext, function () {
                        return _this._listview.resize();
                    });
                    this._contextMenuController = new Console.ContextMenuController(this, this._listview);
                    this._isInitialHandshake = true;
                    this._contextInfo = null;
                    this._notificationCounts = {
                        errors: 0,
                        warnings: 0,
                        messages: 0
                    };
                    this._notificationFilters = {
                        errors: true,
                        warnings: true,
                        messages: true,
                        log: true
                    };
                    this._isShowingLog = this._notificationFilters.log;
                    this._inputItemsMap = {
                    };
                    this._countItemsMap = {
                    };
                    this._groupStack = [
                        new Common.ObjectView.TreeViewGroupItem()
                    ];
                    this._consoleOutputCallback = function (outputObj, engine) {
                        return _this.onConsoleOutput(outputObj, engine);
                    };
                    this._targetSelector = new Common.Controls.Legacy.ComboBox(document.getElementById("targetListRoot"));
                    this._targetSelector.valueChanged = function (value) {
                        return _this.onTargetEngineChanged(value);
                    };
                    this._bridge.getScriptEngines().done(function (data) {
                        for(var i = 0; i < data.length; i++) {
                            _this.onAttach({
                                engineId: data[i]
                            });
                        }
                    });
                    var targetLabel = "targetLabel";
                    document.getElementById(targetLabel).innerText = toolwindowHelpers.loadString("TargetSelectorLabel");
                    this._targetSelector.focusableElement.setAttribute("aria-labelledby", targetLabel);
                    this._targetSelector.focusableElement.setAttribute("tabindex", "1");
                    this.updateTargetView();
                    this.initialize();
                    if(Plugin.F12) {
                        Plugin.F12.Communications.addEventListener("onUnhandledException", function (e) {
                            var info = e.customData;
                            _this.writeError({
                                messageId: info.messageId,
                                messageText: info.messageText,
                                fileUrl: info.fileName,
                                lineNumber: info.lineNumber,
                                columnNumber: info.columnNumber
                            }, null);
                        });
                    } else {
                        this._bridge.addEventListener("scriptError", function (e) {
                            _this.writeError({
                                messageId: e.messageId,
                                messageText: e.messageText,
                                fileUrl: e.fileName,
                                lineNumber: e.lineNumber,
                                columnNumber: e.columnNumber
                            }, null);
                        });
                    }
                    this._bridge.addEventListener("toggleFilter", function (e) {
                        return _this.toggleFilter(e.filterIndex);
                    });
                    this._bridge.channel.addMessageProcessor("Throttle Messages", Common.MessageThrottle.splitMessage);
                    this._bridge.channel.addMessageHandler("CreateTargetDefaults", this.createTargetDefaults.bind(this));
                    this._bridge.channel.addMessageHandler("Combine Messages", this._throttle.combineMessages.bind(this._throttle));
                    this._bridge.channel.addMessageHandler("Handshake", this.handleHandshake.bind(this));
                    this._bridge.channel.addMessageHandler("TargetCreated", this.targetCreated.bind(this));
                    this._bridge.channel.addMessageHandler("TargetClosed", this.targetClosed.bind(this));
                    this._bridge.channel.addMessageHandler("TargetChanged", this.targetChanged.bind(this));
                    this._bridge.channel.addMessageHandler("TargetUpdated", this.targetUpdated.bind(this));
                    this._bridge.channel.addMessageHandler("ClearTargets", this.targetsCleared.bind(this));
                    this._bridge.channel.addMessageHandler("ClearOnNavigate", this.clearOnNavigate.bind(this));
                    this._bridge.addEventListener("attach", this.onAttach.bind(this));
                    this._bridge.addEventListener("connect", this.onConnect.bind(this));
                    this._bridge.addEventListener("detach", this.onDetach.bind(this));
                    this._bridge.addEventListener("break", this.onBreak.bind(this));
                    this._bridge.addEventListener("run", this.onRun.bind(this));
                    toolwindowHelpers.initializeToolWindow();
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Window_Create_Stop);
                }
                Object.defineProperty(ConsoleWindow.prototype, "onConsoleUpdated", {
                    get: function () {
                        return this._onConsoleUpdated;
                    },
                    set: function (callback) {
                        this._onConsoleUpdated = callback;
                        this._listview.onUpdated = callback;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "onConsoleBeforeRendering", {
                    get: function () {
                        return this._onConsoleBeforeRendering;
                    },
                    set: function (callback) {
                        this._onConsoleBeforeRendering = callback;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "onConsoleRendered", {
                    get: function () {
                        return this._onConsoleRendered;
                    },
                    set: function (callback) {
                        this._onConsoleRendered = callback;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "onConsoleReady", {
                    get: function () {
                        return this._onConsoleReady;
                    },
                    set: function (callback) {
                        this._onConsoleReady = callback;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "onConsoleBreak", {
                    get: function () {
                        return this._onConsoleBreak;
                    },
                    set: function (callback) {
                        this._onConsoleBreak = callback;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "traceWriter", {
                    get: function () {
                        return this._traceWriter;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "contextMenuController", {
                    get: function () {
                        return this._contextMenuController;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "notificationFilters", {
                    get: function () {
                        return this._notificationFilters;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "listView", {
                    get: function () {
                        return this._listview;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "inputControl", {
                    get: function () {
                        return this._inputControl;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "intellisenseContext", {
                    get: function () {
                        return this._intellisenseContext;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ConsoleWindow.prototype, "atBreakpoint", {
                    get: function () {
                        return this._breakpointState.atBreakpoint;
                    },
                    enumerable: true,
                    configurable: true
                });
                ConsoleWindow.prototype.getTargets = function () {
                    var targets = [];
                    for(var i = 0; i < this._targetEngineItems.length; i++) {
                        targets.push(this._targetEngineItems[i].value);
                    }
                    return targets;
                };
                ConsoleWindow.prototype.getCurrentTarget = function () {
                    return this._targetSelector.value;
                };
                ConsoleWindow.prototype.setCurrentTarget = function (target) {
                    this.onTargetEngineChanged(target);
                };
                ConsoleWindow.prototype.onError = function (message, file, line, additionalInfo, engine) {
                    try  {
                        if(file) {
                            var parts = file.split("/");
                            if(parts.length > 0) {
                                file = parts[parts.length - 1];
                            }
                        }
                        var errorMessage = toolwindowHelpers.loadString("ConsoleScriptError") + "\r\n" + toolwindowHelpers.loadString("ScriptErrorMessage", [
                            message
                        ]) + "\r\n" + toolwindowHelpers.loadString("ScriptErrorFile", [
                            file
                        ]) + "\r\n" + toolwindowHelpers.loadString("ScriptErrorLine", [
                            line
                        ]) + "\r\n" + additionalInfo;
                        this.showNotification(Common.ObjectView.TreeViewNotifyType.Error, errorMessage, engine);
                    } catch (ex) {
                    }
                };
                ConsoleWindow.prototype.onListViewToggle = function (item) {
                    var _this = this;
                    var objectItem = item;
                    if(objectItem.isExpandable) {
                        objectItem.getChildren(function (command, args, callback, preMessageCallback) {
                            return _this._bridge.channel.call(objectItem.engine, command, args, callback, preMessageCallback);
                        }, function (children) {
                            _this._listview.addItems(children, item);
                            if(_this._onConsoleUpdated) {
                                _this._onConsoleUpdated(children, item);
                            }
                        });
                    }
                };
                ConsoleWindow.prototype.copySelectedTextToClipboard = function (selectedText) {
                    var selectedText = selectedText || toolwindowHelpers.getSelectedText();
                    if(selectedText) {
                        var compactText = selectedText.replace(/[\r\n]+/g, "\r\n");
                        clipboardData.setData("Text", compactText);
                    }
                };
                ConsoleWindow.prototype.copyItemToClipboard = function (item) {
                    var text = item.getCopyText();
                    clipboardData.setData("Text", text);
                };
                ConsoleWindow.prototype.copyAll = function () {
                    var _this = this;
                    var text = this._groupStack[0].getCopyText("", function (item) {
                        return _this.notificationFilter(item);
                    }, true);
                    clipboardData.setData("Text", text);
                };
                ConsoleWindow.prototype.evaluateItemAsType = function (item, viewType) {
                    var _this = this;
                    return item.evaluateAsType(function (command, args, callback, preMessageCallback) {
                        return _this._bridge.channel.call(item.engine, command, args, callback, preMessageCallback);
                    }, viewType, this.onConsoleOutput.bind(this));
                };
                ConsoleWindow.prototype.addToWatch = function (consoleItem) {
                    if(consoleItem) {
                        var watchExpression = consoleItem.getWatchExpression();
                        if(watchExpression != undefined) {
                            return Plugin.F12.Debugger.addToWatch(watchExpression);
                        }
                    }
                };
                ConsoleWindow.prototype.hasAddToWatch = function () {
                    return (typeof ((Plugin).F12) != "undefined" && typeof ((Plugin).F12.Debugger) != "undefined" && typeof ((Plugin).F12.Debugger.addToWatch) != "undefined");
                };
                ConsoleWindow.prototype.processInput = function (command, onCompleteCallback) {
                    toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsConsoleEvalBegin);
                    return this.onInput(command, onCompleteCallback);
                };
                ConsoleWindow.prototype.writeError = function (e, engine) {
                    e.lineNumber += 1;
                    e.columnNumber += 1;
                    if(e.messageId) {
                        e.messageText = e.messageId + ": " + e.messageText;
                    }
                    var notifyObject = {
                        inputId: "-1",
                        engine: engine,
                        notifyType: Common.ObjectView.TreeViewNotifyItem.getNotifyTypeString(Common.ObjectView.TreeViewNotifyType.Error),
                        message: {
                            messageId: e.messageId,
                            message: e.messageText,
                            fileUrl: e.fileUrl,
                            lineNumber: e.lineNumber,
                            columnNumber: e.columnNumber
                        }
                    };
                    this.onConsoleNotification(notifyObject, engine);
                };
                ConsoleWindow.prototype.toggleFilter = function (filterIndex, displayAllShouldDefaultToOn) {
                    if((typeof displayAllShouldDefaultToOn) !== "boolean") {
                        displayAllShouldDefaultToOn = false;
                    }
                    if(filterIndex === Common.ObjectView.TreeViewUtils.ConsoleFilterId.all) {
                        var onCount = (this._notificationFilters.errors ? 1 : 0) + (this._notificationFilters.warnings ? 1 : 0) + (this._notificationFilters.messages ? 1 : 0) + (this._notificationFilters.log ? 1 : 0);
                        if(onCount === 4 || (onCount > 0 && !displayAllShouldDefaultToOn)) {
                            this._errorsButton.selected = false;
                            this._warningsButton.selected = false;
                            this._messagesButton.selected = false;
                            this._isShowingLog = false;
                            this._notificationFilters = {
                                errors: false,
                                warnings: false,
                                messages: false,
                                log: false
                            };
                        } else {
                            this._errorsButton.selected = true;
                            this._warningsButton.selected = true;
                            this._messagesButton.selected = true;
                            this._isShowingLog = true;
                            this._notificationFilters = {
                                errors: true,
                                warnings: true,
                                messages: true,
                                log: true
                            };
                        }
                        this.resetFilter();
                    } else {
                        switch(filterIndex) {
                            case Common.ObjectView.TreeViewUtils.ConsoleFilterId.error:
                                this._errorsButton.selected = !this._errorsButton.selected;
                                break;
                            case Common.ObjectView.TreeViewUtils.ConsoleFilterId.warning:
                                this._warningsButton.selected = !this._warningsButton.selected;
                                break;
                            case Common.ObjectView.TreeViewUtils.ConsoleFilterId.message:
                                this._messagesButton.selected = !this._messagesButton.selected;
                                break;
                            case Common.ObjectView.TreeViewUtils.ConsoleFilterId.log:
                                this._isShowingLog = !this._isShowingLog;
                                break;
                            default:
                                return;
                        }
                        this.updateNotificationFilter();
                    }
                };
                ConsoleWindow.prototype.clear = function () {
                    this.onClearHost();
                    this._inputControl.focusOnInput();
                };
                ConsoleWindow.prototype.onConsoleBeforeMenuLoaded = function () {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Context_Menu_Loading_Start);
                };
                ConsoleWindow.prototype.onConsoleMenuLoaded = function () {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Context_Menu_Loading_Stop);
                };
                ConsoleWindow.prototype.fireBuildListBoxStartEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_ListBox_Build_Start, etwKey);
                };
                ConsoleWindow.prototype.fireBuildListBoxEndEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_ListBox_Build_Stop, etwKey);
                };
                ConsoleWindow.prototype.fireResetListBoxStartEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_ListBox_Reset_Start, etwKey);
                };
                ConsoleWindow.prototype.fireResetListBoxEndEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_ListBox_Reset_Stop, etwKey);
                };
                ConsoleWindow.prototype.fireSetFilterStartEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Menu_Filter_Start, etwKey);
                };
                ConsoleWindow.prototype.fireSetFilterEndEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Menu_Filter_Stop, etwKey);
                };
                ConsoleWindow.prototype.fireUpdateLayoutStartEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Menu_Layout_Start, etwKey);
                };
                ConsoleWindow.prototype.fireUpdateLayoutEndEvent = function (etwKey) {
                    this.traceWriter.raiseEventWithKey(Common.TraceEvents.Console_Intellisense_Menu_Layout_Stop, etwKey);
                };
                ConsoleWindow.prototype.expandMultiLineItem = function (item) {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_HtmlLines_Expand_Start);
                    if(item instanceof Common.ObjectView.TreeViewItem) {
                        var expanded = (item).expandLines();
                        if(expanded) {
                            this._listview.updateItemLines(item, 1);
                        }
                    }
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_HtmlLines_Expand_Stop);
                };
                ConsoleWindow.prototype.enableClearOnNavigate = function (enabled) {
                    this._clearOnNavigateButton.selected = enabled;
                };
                ConsoleWindow.prototype.invokeInputBoxContextMenu = function (menuId) {
                    this._inputControl.invokeContextMenu(menuId, {
                        id: menuId
                    });
                };
                ConsoleWindow.prototype.initialize = function () {
                    var _this = this;
                    this._warningSection = document.getElementById("warningSection");
                    this._clearButton = new Common.Controls.Legacy.Button(document.getElementById("clearButton"));
                    this._errorsButton = new Common.Controls.Legacy.ToggleButton(document.getElementById("errorsButton"));
                    this._errorsButton.selected = this._notificationFilters.errors;
                    this._warningsButton = new Common.Controls.Legacy.ToggleButton(document.getElementById("warningsButton"));
                    this._warningsButton.selected = this._notificationFilters.warnings;
                    this._messagesButton = new Common.Controls.Legacy.ToggleButton(document.getElementById("messagesButton"));
                    this._messagesButton.selected = this._notificationFilters.messages;
                    this._clearOnNavigateButton = new Common.Controls.Legacy.ToggleButton(document.getElementById("clearOnNavigateButton"));
                    this._clearButton.click = function () {
                        return _this.clear();
                    };
                    this._errorsButton.selectedChanged = function (selected) {
                        return _this.updateNotificationFilter();
                    };
                    this._warningsButton.selectedChanged = function (selected) {
                        return _this.updateNotificationFilter();
                    };
                    this._messagesButton.selectedChanged = function (selected) {
                        return _this.updateNotificationFilter();
                    };
                    this._clearOnNavigateButton.selectedChanged = function (selected) {
                        var label;
                        label = toolwindowHelpers.loadString(selected ? "ClearOnNavigateEnabled" : "ClearOnNavigateDisabled");
                        _this._clearOnNavigateButton.tooltip = label;
                        _this._clearOnNavigateButton.rootElement.setAttribute("aria-label", label);
                    };
                    this._clearOnNavigateButton.selected = true;
                    this._isInitialHandshake = true;
                    if(!Plugin.F12) {
                        var toggleButton = document.getElementById("toggleButton");
                        toggleButton.addEventListener("keydown", function (e) {
                            if(e.keyCode === Common.KeyCodes.Tab && !e.altKey && !e.ctrlKey && !e.shiftKey) {
                                _this._errorsButton.rootElement.focus();
                                e.preventDefault();
                                return false;
                            }
                        });
                        this._errorsButton.rootElement.addEventListener("keydown", function (e) {
                            if(e.keyCode === Common.KeyCodes.Tab && !e.altKey && !e.ctrlKey && e.shiftKey) {
                                toggleButton.focus();
                                e.preventDefault();
                                return false;
                            }
                        });
                    }
                    document.addEventListener("click", function (e) {
                        if(e.target instanceof HTMLElement) {
                            var target = (e.target);
                            if(target.classList.contains("BPT-FileLink")) {
                                _this.openTargetElementFileLink(target);
                            } else if(target.classList.contains("BPT-HelpLink")) {
                                _this.openTargetElementHelpLink(target);
                            }
                        }
                    }, true);
                    document.addEventListener("keydown", function (e) {
                        var handled = false;
                        var target = document.activeElement;
                        if(target) {
                            if(e.keyCode === Common.KeyCodes.F1) {
                                if(_this.handleHelpLinkRequest(target)) {
                                    e.preventDefault();
                                }
                                handled = true;
                            } else if(e.keyCode === Common.KeyCodes.Enter) {
                                var fileLink = target.querySelector(".BPT-FileLink");
                                if(!fileLink && target.nextElementSibling) {
                                    fileLink = target.nextElementSibling.querySelector(".BPT-FileLink");
                                }
                                if(fileLink) {
                                    _this.openTargetElementFileLink(fileLink);
                                    e.preventDefault();
                                }
                                handled = true;
                            }
                        }
                        if(!handled && Plugin.F12) {
                            _this.notifyOnKeydown(e);
                        }
                    }, true);
                    if(Plugin.F12) {
                        var hostInfoChanged = function (info) {
                            var spacer = document.querySelector(".shellButtonSpacer");
                            var scaledControlAreaWidth = info.controlAreaWidth * (screen.logicalXDPI / screen.deviceXDPI);
                            spacer.style.width = scaledControlAreaWidth + "px";
                        };
                        Plugin.F12.addEventListener("hostinfochanged", function (e) {
                            return hostInfoChanged(e);
                        });
                        hostInfoChanged(Plugin.F12.getHostInfo());
                        Plugin.F12.addEventListener("browsershortcut", function (e) {
                            if((e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode === Common.KeyCodes.O) || (e.ctrlKey && e.shiftKey && !e.altKey && e.keyCode === Common.KeyCodes.P)) {
                                _this.notifyOnKeydown(e);
                            } else if(!e.ctrlKey && !e.altKey && !e.shiftKey && e.keyCode === Common.KeyCodes.F1) {
                                var target = document.activeElement;
                                if(target) {
                                    return _this.handleHelpLinkRequest(target);
                                }
                            }
                            return false;
                        });
                    }
                    var clearLabel = toolwindowHelpers.loadString("ClearButtonText");
                    this._clearButton.rootElement.setAttribute("aria-label", clearLabel);
                    this._clearButton.rootElement.onmouseover = function () {
                        Plugin.Tooltip.show({
                            content: clearLabel
                        });
                        return true;
                    };
                    this._clearButton.disabled = true;
                    var toolLabelText = toolwindowHelpers.loadString("ConsoleToolLabelText");
                    (document.getElementById("toolLabel")).innerText = toolLabelText;
                    (document.getElementById("warningMessageText")).innerText = toolLabelText;
                    this.updateAllNotificationCounts();
                    this.resetFilter();
                    this._listview.onBeforeRendering = function () {
                        _this.onConsoleBeforeRenderingHandler();
                    };
                    this._listview.onRendered = function () {
                        _this.onConsoleRenderedHandler();
                    };
                    this._listview.onBeforeItemToggle = function () {
                        _this.onConsoleBeforeItemToggled();
                    };
                    this._listview.onItemToggled = function () {
                        _this.onConsoleItemToggled();
                    };
                    this._listview.onBeforeScroll = function () {
                        _this.onConsoleBeforeScroll();
                    };
                    this._listview.onScrollCompleted = function () {
                        _this.onConsoleScrolled();
                    };
                    this._bridge.start();
                };
                ConsoleWindow.prototype.notifyOnKeydown = function (e) {
                    if(Plugin.F12) {
                        Plugin.F12.notifyOnKeydown(e.keyCode, (e.altKey ? Common.KeyFlags.Alt : Common.KeyFlags.None) | (e.ctrlKey ? Common.KeyFlags.Ctrl : Common.KeyFlags.None) | (e.shiftKey ? Common.KeyFlags.Shift : Common.KeyFlags.None));
                    }
                };
                ConsoleWindow.prototype.openTargetElementFileLink = function (target) {
                    var url = target.getAttribute("data-linkUrl");
                    var line = target.getAttribute("data-linkLine");
                    var col = target.getAttribute("data-linkCol");
                    var lineNumber = 0;
                    if(line) {
                        lineNumber = parseInt(line, 10);
                    }
                    var colNumber = 0;
                    if(col) {
                        colNumber = parseInt(col, 10);
                    }
                    try  {
                        url = decodeURI(url);
                        Plugin.Host.showDocument(url, lineNumber || 1, colNumber || 1);
                    } catch (ex) {
                    }
                };
                ConsoleWindow.prototype.handleHelpLinkRequest = function (target) {
                    var helpLink = target.querySelector(".BPT-HelpLink");
                    if(helpLink) {
                        this.openTargetElementHelpLink(helpLink);
                        return true;
                    }
                    return false;
                };
                ConsoleWindow.prototype.openTargetElementHelpLink = function (target) {
                    var keyword = target.getAttribute("data-linkKeyword");
                    this._bridge.openF1HelpLink(keyword);
                };
                ConsoleWindow.prototype.attachButtonEvents = function (button, callback) {
                    button.addEventListener("click", function (e) {
                        callback(e);
                    });
                    button.addEventListener("keydown", function (e) {
                        if(e.keyCode === Common.KeyCodes.Enter || e.keyCode === Common.KeyCodes.Space) {
                            callback(e);
                            e.preventDefault();
                        }
                    });
                };
                ConsoleWindow.prototype.onAttach = function (e) {
                    if(!e) {
                        e = {
                            engineId: 0
                        };
                    }
                    this.removeTarget(e.engineId);
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Attach_Start);
                    try  {
                        this._bridge.channel.loadScript(e.engineId, "../Common/messageThrottle.js");
                        this._bridge.channel.loadScript(e.engineId, "../common/isDebugBuild.js");
                        this._bridge.channel.loadScript(e.engineId, "../Common/assert.js");
                        this._bridge.channel.loadScript(e.engineId, "../Common/remoteHelpers.js");
                        this._bridge.channel.loadScript(e.engineId, "../Common/ObjectView/treeViewUtilities.js");
                        this._bridge.channel.loadScript(e.engineId, "../Common/ObjectView/treeViewRemoteHelpers.js");
                        this._bridge.channel.loadScript(e.engineId, "../Common/Intellisense/intellisenseRemoteHelpers.js");
                        this._bridge.channel.loadScript(e.engineId, "remote.js");
                        this._bridge.channel.loadScript(e.engineId, "remoteMain.js");
                    } catch (e) {
                    }
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Attach_Stop);
                };
                ConsoleWindow.prototype.onConnect = function (e) {
                    this.addTarget(e.engineId ? e.engineId : 0, e.portName || (e).name, {
                        targetId: undefined,
                        targetType: "_top",
                        href: ""
                    });
                };
                ConsoleWindow.prototype.onDetach = function (e) {
                    if(e) {
                        this.removeTarget(e.engineId ? e.engineId : 0);
                    }
                };
                ConsoleWindow.prototype.onBreak = function () {
                    this.updateTargetView();
                    if(this.onConsoleBreak) {
                        this.onConsoleBreak();
                    }
                };
                ConsoleWindow.prototype.onRun = function () {
                    this.updateTargetView();
                };
                ConsoleWindow.prototype.handleHandshake = function (message) {
                    if(message.data.substr(0, 10) === "Handshake:") {
                        var connectionInfo = JSON.parse(message.data.substring(10));
                        this.updateTarget(message.engine.engineId, {
                            targetId: undefined,
                            targetType: "_top",
                            href: connectionInfo.contextInfo
                        });
                        this.onHandshake(message.engine, connectionInfo);
                        if(Plugin.F12) {
                            Plugin.F12.TraceWriter.markToolReady();
                        }
                        toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsConsoleReady);
                        if(this._onConsoleReady) {
                            this._onConsoleReady();
                        }
                        message.handled = true;
                    }
                };
                ConsoleWindow.prototype.createTargetDefaults = function (message) {
                    message.engine.engineId = message.engine.engineId || 0;
                };
                ConsoleWindow.prototype.targetCreated = function (message) {
                    if(message.data.substr(0, 14) === "TargetCreated:") {
                        var targetInfo = JSON.parse(message.data.substring(14));
                        this.addTarget(message.engine.engineId, message.engine.portName, targetInfo);
                        message.handled = true;
                    }
                };
                ConsoleWindow.prototype.targetUpdated = function (message) {
                    if(message.data.substr(0, 14) === "TargetUpdated:") {
                        var targetInfo = JSON.parse(message.data.substring(14));
                        this.updateTarget(message.engine.engineId, targetInfo);
                        message.handled = true;
                    }
                };
                ConsoleWindow.prototype.targetClosed = function (message) {
                    if(message.data.substr(0, 13) === "TargetClosed:") {
                        var targetInfo = JSON.parse(message.data.substring(13));
                        this.removeTarget(message.engine.engineId, message.engine.portName, targetInfo.targetId);
                        message.handled = true;
                    }
                };
                ConsoleWindow.prototype.addTarget = function (engineId, portName, targetInfo) {
                    var target = {
                        engineId: engineId,
                        portName: portName,
                        targetType: targetInfo.targetType,
                        targetId: targetInfo.targetId,
                        href: targetInfo.href
                    };
                    var targetText = target.targetType + ": " + toolwindowHelpers.createShortenedUrlText(target.href);
                    this._targetEngineItems.push({
                        text: targetText,
                        value: JSON.stringify(target),
                        tooltip: target.href,
                        label: targetText + ": " + target.href
                    });
                    if(this._targetEngineItems.length === 1) {
                        this._currentEngine = target;
                    }
                    var engineSort = function (a, b) {
                        var a1 = JSON.parse(a.value);
                        var b1 = JSON.parse(b.value);
                        if(a1.engineId < b1.engineId) {
                            return -1;
                        } else if(a1.engineId > b1.engineId) {
                            return 1;
                        } else {
                            if(a1.targetType === "_top") {
                                return -1;
                            }
                            if(a1.targetId < b1.targetId) {
                                return -1;
                            } else if(a1.targetId > b1.targetId) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    };
                    this._targetEngineItems.sort(engineSort);
                    this.updateTargetView();
                };
                ConsoleWindow.prototype.updateTarget = function (engineId, targetInfo) {
                    for(var i = 0; i < this._targetEngineItems.length; i++) {
                        var engineTarget = JSON.parse(this._targetEngineItems[i].value);
                        if(engineTarget.engineId === engineId && engineTarget.targetType === targetInfo.targetType && engineTarget.targetId === targetInfo.targetId) {
                            engineTarget.href = targetInfo.href;
                            this._targetEngineItems[i].text = engineTarget.targetType + ": " + toolwindowHelpers.createShortenedUrlText(targetInfo.href);
                            this._targetEngineItems[i].value = JSON.stringify(engineTarget);
                            this._targetEngineItems[i].tooltip = targetInfo.href;
                            this._targetEngineItems[i].label = this._targetEngineItems[i].text + ": " + targetInfo.href;
                            if(this._currentEngine.engineId === engineTarget.engineId && this._currentEngine.targetId === engineTarget.targetId) {
                                this._currentEngine = engineTarget;
                            }
                            break;
                        }
                    }
                    this.updateTargetView();
                };
                ConsoleWindow.prototype.removeTarget = function (engineId, portName, targetId, clearTop) {
                    if (typeof clearTop === "undefined") { clearTop = true; }
                    for(var i = 0; i < this._targetEngineItems.length; ) {
                        var engine = JSON.parse(this._targetEngineItems[i].value);
                        if(engine.engineId === engineId && (!portName || portName === engine.portName) && (!targetId || targetId === engine.targetId) && (clearTop || engine.targetType !== "_top")) {
                            this._targetEngineItems.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    if(this._targetEngineItems.length === 0) {
                        this._currentEngine = null;
                    } else if(this._currentEngine.engineId === engineId && (!portName || this._currentEngine.targetId === targetId)) {
                        this._currentEngine = JSON.parse(this._targetEngineItems[0].value);
                    }
                    this.updateTargetView();
                };
                ConsoleWindow.prototype.targetChanged = function (message) {
                    if(message.data.substr(0, 14) === "TargetChanged:") {
                        var targetInfo = JSON.parse(message.data.substring(14));
                        for(var i = 0; i < this._targetEngineItems.length; i++) {
                            var engine = JSON.parse(this._targetEngineItems[i].value);
                            if(engine.engineId === message.engine.engineId && (targetInfo.targetId === engine.targetId)) {
                                this._currentEngine = engine;
                                break;
                            }
                        }
                        this.updateTargetView();
                        message.handled = true;
                    }
                };
                ConsoleWindow.prototype.targetsCleared = function (message) {
                    if(message.data === "ClearTargets") {
                        this.removeTarget(message.engine.engineId, null, null, false);
                        message.handled = true;
                    }
                };
                ConsoleWindow.prototype.onHandshake = function (engine, connectionInfo) {
                    var _this = this;
                    if(this._isInitialHandshake) {
                        this._isInitialHandshake = false;
                    }
                    this._bridge.channel.call(engine, "registerConsoleCallbacks", [
                        function (outputObj, engine) {
                            return _this.onConsoleOutput(outputObj, engine);
                        }, 
                        function (notifyObject, engine) {
                            return _this.onConsoleNotification(notifyObject, engine);
                        }, 
                        function (engine) {
                            return _this.onRemoteCleared();
                        }                    ]);
                    this._inputControl.enable();
                    this._warningSection.style.display = "none";
                    this._outputList.style.height = "100%";
                    if(connectionInfo.docMode < 9) {
                        (document.getElementById("warningMessageText")).innerText = toolwindowHelpers.loadString("ConsoleUnsupportedDocumentModeError", connectionInfo.docMode);
                        this._warningSection.style.display = "block";
                        this._outputList.style.height = "calc(100% - " + this._warningSection.clientHeight + "px)";
                    }
                    this._contextInfo = connectionInfo.contextInfo;
                };
                ConsoleWindow.prototype.addItemToListView = function (item, linkedTo, linkAsSibling) {
                    var currentGroup = this._groupStack[this._groupStack.length - 1];
                    if(this._groupStack.length === 1 || this._listview.isItemExpanded(currentGroup) || currentGroup.isFirstUIChildNeeded()) {
                        if(linkedTo && currentGroup.isItemInGroup(linkedTo)) {
                            this._listview.addItems([
                                item
                            ], linkedTo, linkAsSibling);
                        } else {
                            this._listview.addItems([
                                item
                            ], currentGroup, false, true);
                        }
                        if(this._listview.isAutoScrollToItemEnabled(item)) {
                            this._listview.selectItem(item, false);
                            this._listview.scrollToBottom();
                        }
                    }
                    if(linkAsSibling && linkedTo) {
                        currentGroup.addChild(item, linkedTo);
                    } else {
                        currentGroup.addChild(item);
                    }
                    if(this._onConsoleUpdated) {
                        this._onConsoleUpdated([
                            item
                        ], linkedTo);
                    }
                };
                ConsoleWindow.prototype.updateTargetView = function () {
                    if(this.atBreakpoint) {
                        var breakpointMessage = {
                            value: "breakpoint",
                            text: toolwindowHelpers.loadString("PausedAtABreakpoint")
                        };
                        this._targetSelector.items = [
                            breakpointMessage
                        ];
                        this._targetSelector.value = this._targetSelector.items[0].value;
                        this._targetSelector.disabled = true;
                    } else {
                        this._targetSelector.items = this._targetEngineItems;
                        this._targetSelector.value = this._currentEngine ? JSON.stringify(this._currentEngine) : "";
                        if(this._targetEngineItems.length > 0) {
                            this._targetSelector.disabled = false;
                            this._inputControl.enable();
                        } else {
                            this._targetSelector.disabled = true;
                            this._inputControl.disable();
                        }
                    }
                };
                ConsoleWindow.prototype.onInput = function (command, onCompleteCallback) {
                    if(!this._currentEngine) {
                        this.showNotification(Common.ObjectView.TreeViewNotifyType.Warn, toolwindowHelpers.loadString("NotAttached"), null);
                        return -1;
                    }
                    if((typeof command) !== "string") {
                        return -1;
                    }
                    if(command && (/\S/).test(command)) {
                        if(command === "console.test_exception") {
                            throw "Test Exception";
                        }
                        this.traceWriter.raiseEvent(Common.TraceEvents.Console_Input_Start);
                        var inputItem = new Common.ObjectView.TreeViewInputItem(command, onCompleteCallback);
                        this._inputItemsMap[inputItem.id] = inputItem;
                        this.addItemToListView(inputItem);
                        window.msWriteProfilerMark("ConsoleWindow:BeginPostInput");
                        if(this._breakpointState.atBreakpoint) {
                            this._bridge.channel.executeBreakModeCommand(this._currentEngine, "processInput", inputItem.consoleItemId, command, this._consoleOutputCallback);
                        } else {
                            this._bridge.channel.call(this._currentEngine, "processInput", [
                                inputItem.id, 
                                command
                            ], this._consoleOutputCallback);
                        }
                        window.msWriteProfilerMark("ConsoleWindow:EndPostInput");
                        this.traceWriter.raiseEvent(Common.TraceEvents.Console_Input_Stop);
                        this._clearButton.disabled = false;
                        return inputItem.consoleItemId;
                    }
                    return -1;
                };
                ConsoleWindow.prototype.onOutput = function (item) {
                    if(!item) {
                        return;
                    }
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Output_Start);
                    var matchingInputItem = null;
                    if(this._inputItemsMap.hasOwnProperty(item.matchingInputId)) {
                        matchingInputItem = this._inputItemsMap[item.matchingInputId];
                    }
                    this.addItemToListView(item, matchingInputItem, true);
                    this._clearButton.disabled = false;
                    if(matchingInputItem) {
                        matchingInputItem.executeCallback(item);
                    }
                    toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsConsoleEvalEnd);
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Output_Stop);
                };
                ConsoleWindow.prototype.onConsoleOutput = function (outputObject, engine) {
                    if(!outputObject) {
                        this.showNotification(Common.ObjectView.TreeViewNotifyType.Error, toolwindowHelpers.loadString("ConsoleObjectNotFoundError"), engine);
                        return;
                    }
                    if(Plugin.F12) {
                        Plugin.F12.Communications.fireEvent("consoleOutput", Plugin.F12.PluginId.Debugger);
                    }
                    var outputItem;
                    if(outputObject.detailedType !== "htmlElement") {
                        var matchingInputItem;
                        var watchExpression;
                        if(outputObject.inputId && this._inputItemsMap.hasOwnProperty(outputObject.inputId)) {
                            matchingInputItem = this._inputItemsMap[outputObject.inputId];
                            watchExpression = "(" + matchingInputItem.getWatchExpression() + ")";
                        }
                        outputItem = new Common.ObjectView.TreeViewObjectItem(outputObject, engine, null, watchExpression);
                    } else {
                        outputItem = new Common.ObjectView.TreeViewHtmlItem(outputObject, engine);
                    }
                    this.onOutput(outputItem);
                };
                ConsoleWindow.prototype.onConsoleNotification = function (notifyObject, engine) {
                    notifyObject.engine = engine;
                    if(notifyObject.notifyType === Common.ObjectView.TreeViewUtils.ConsoleNotifyType.internalMessage) {
                        switch(notifyObject.message.key) {
                            case Common.ObjectView.TreeViewUtils.ConsoleInternalMessage.startGroup:
                                this.startGroup(notifyObject.message.name);
                                break;
                            case Common.ObjectView.TreeViewUtils.ConsoleInternalMessage.startGroupCollapsed:
                                this.startGroup(notifyObject.message.name, true);
                                break;
                            case Common.ObjectView.TreeViewUtils.ConsoleInternalMessage.endGroup:
                                this.endGroup();
                                break;
                            case Common.ObjectView.TreeViewUtils.ConsoleInternalMessage.displayTraceStyles:
                                this.displayTraceStyles(notifyObject.message.viewableObject);
                                break;
                        }
                    } else if(notifyObject.notifyType === "count") {
                        this.addOrUpdateCountItem(notifyObject);
                    } else {
                        var notifyItem;
                        if(notifyObject && notifyObject.message && notifyObject.message.viewableObject && notifyObject.message.viewableObject.length === 1 && notifyObject.message.viewableObject[0].detailedType === "htmlElement") {
                            var notifyType = Common.ObjectView.TreeViewNotifyItem.parseNotifyTypeString(notifyObject.notifyType);
                            notifyItem = new Common.ObjectView.TreeViewHtmlItem(notifyObject.message.viewableObject[0], engine, null, null, notifyType, true);
                        } else {
                            notifyItem = new Common.ObjectView.TreeViewNotifyItem(notifyObject);
                        }
                        switch(notifyItem.notifyType) {
                            case Common.ObjectView.TreeViewNotifyType.Assert:
                            case Common.ObjectView.TreeViewNotifyType.Error:
                                this._notificationCounts.errors++;
                                break;
                            case Common.ObjectView.TreeViewNotifyType.Info:
                                this._notificationCounts.messages++;
                                break;
                            case Common.ObjectView.TreeViewNotifyType.Warn:
                                this._notificationCounts.warnings++;
                                break;
                        }
                        this.updateNotificationCounts(notifyItem.notifyType);
                        this.onOutput(notifyItem);
                    }
                };
                ConsoleWindow.prototype.addOrUpdateCountItem = function (notifyObject) {
                    var newCountItem = new Common.ObjectView.TreeViewCountItem(notifyObject);
                    var targetId;
                    if(notifyObject.engine && notifyObject.engine) {
                        targetId = notifyObject.engine.engineId.toString();
                    } else {
                        targetId = "__DefaultTarget__";
                    }
                    var name = notifyObject.message.name;
                    if(name === undefined || name === null) {
                        name = "__DefaultCounterIndex__";
                    }
                    var targetCountItemMap;
                    if(!this._countItemsMap) {
                        this._countItemsMap = {
                        };
                    }
                    if(this._countItemsMap.hasOwnProperty(targetId)) {
                        targetCountItemMap = this._countItemsMap[targetId];
                    } else {
                        targetCountItemMap = this._countItemsMap[targetId] = {
                        };
                    }
                    if(targetCountItemMap.hasOwnProperty(name)) {
                        targetCountItemMap[name].value = newCountItem.value;
                        this._listview.refresh();
                        if(this._onConsoleUpdated) {
                            this._onConsoleUpdated([
                                targetCountItemMap[name]
                            ]);
                        }
                    } else {
                        targetCountItemMap[name] = newCountItem;
                        this.onOutput(newCountItem);
                    }
                };
                ConsoleWindow.prototype.onClearHost = function (clearOutput, engine) {
                    if (typeof clearOutput === "undefined") { clearOutput = true; }
                    if (typeof engine === "undefined") { engine = null; }
                    if(clearOutput) {
                        this._listview.clear();
                        this._inputItemsMap = {
                        };
                        this._groupStack = [
                            new Common.ObjectView.TreeViewGroupItem()
                        ];
                        this._countItemsMap = {
                        };
                        this._clearButton.disabled = true;
                        this._notificationCounts = {
                            errors: 0,
                            warnings: 0,
                            messages: 0
                        };
                        this.updateAllNotificationCounts();
                    }
                    if(engine && !clearOutput) {
                        this._bridge.channel.call(engine, "clearConsoleData");
                        delete this._countItemsMap[engine.engineId.toString()];
                    } else {
                        var engineId = -1;
                        for(var i = 0; i < this._targetEngineItems.length; i++) {
                            var engineCurrent = JSON.parse(this._targetEngineItems[i].value);
                            if(engineCurrent.engineId != engineId) {
                                this._bridge.channel.call(engineCurrent, "clearConsoleData");
                                engineId = engineCurrent.engineId;
                            }
                        }
                    }
                };
                ConsoleWindow.prototype.onRemoteCleared = function () {
                    this.onClearHost();
                };
                ConsoleWindow.prototype.clearOnNavigate = function (message) {
                    if(message.data === "ClearOnNavigate") {
                        var ignoreClearRequestFromEmptyTarget = false;
                        if(this._currentEngine.engineId !== message.engine.engineId) {
                            var isTargetEmpty = function (item) {
                                var currentTarget = JSON.parse(item.value);
                                return message.engine.engineId === currentTarget.engineId && currentTarget.href === "about:blank" && currentTarget.targetType === "_top";
                            };
                            var emptyTargets = this._targetEngineItems.filter(isTargetEmpty);
                            ignoreClearRequestFromEmptyTarget = emptyTargets && emptyTargets.length === 1;
                        }
                        this.onClearHost(this._clearOnNavigateButton.selected && !ignoreClearRequestFromEmptyTarget, message.engine);
                        message.handled = true;
                    }
                };
                ConsoleWindow.prototype.onListViewClick = function (item, row, cell) {
                    if(cell.classList.contains("Console-ExpandableLines") || cell.classList.contains("Console-ExpandableString")) {
                        this.expandMultiLineItem(item);
                    }
                };
                ConsoleWindow.prototype.startGroup = function (title, isCollapsed) {
                    var currentGroup = this._groupStack[this._groupStack.length - 1];
                    if(this._groupStack.length > 1 && !this._listview.isItemExpanded(currentGroup)) {
                        isCollapsed = true;
                    }
                    var newGroup = new Common.ObjectView.TreeViewGroupItem(title, isCollapsed);
                    this.addItemToListView(newGroup, currentGroup);
                    this._groupStack.push(newGroup);
                };
                ConsoleWindow.prototype.endGroup = function () {
                    if(this._groupStack.length > 1) {
                        this._groupStack.pop();
                    }
                };
                ConsoleWindow.prototype.displayTraceStyles = function (styles) {
                    var outputItem = new Common.ObjectView.TreeViewTraceStylesItem({
                        inputId: "-1",
                        isExpandable: (styles && styles.length > 0),
                        consoleType: "consoleItemOutput",
                        detailedType: "object",
                        isHtmlViewableType: false,
                        name: "",
                        value: styles,
                        uid: "0"
                    });
                    this.onOutput(outputItem);
                };
                ConsoleWindow.prototype.showNotification = function (type, message, engine) {
                    var notifyObject = {
                        inputId: "-1",
                        engine: null,
                        notifyType: Common.ObjectView.TreeViewNotifyItem.getNotifyTypeString(type),
                        message: message
                    };
                    this.onConsoleNotification(notifyObject, engine);
                };
                ConsoleWindow.prototype.updateAllNotificationCounts = function () {
                    this.updateNotificationCounts(Common.ObjectView.TreeViewNotifyType.Error);
                    this.updateNotificationCounts(Common.ObjectView.TreeViewNotifyType.Info);
                    this.updateNotificationCounts(Common.ObjectView.TreeViewNotifyType.Warn);
                };
                ConsoleWindow.prototype.updateNotificationCounts = function (type) {
                    var label;
                    switch(type) {
                        case Common.ObjectView.TreeViewNotifyType.Assert:
                        case Common.ObjectView.TreeViewNotifyType.Error:
                            (this._errorsButton.rootElement.lastElementChild).innerText = this._notificationCounts.errors.toString();
                            label = toolwindowHelpers.loadString((this._notificationCounts.errors === 1 ? "SingleError" : "MultiError"), this._notificationCounts.errors);
                            this._errorsButton.tooltip = label;
                            this._errorsButton.rootElement.setAttribute("aria-label", label);
                            break;
                        case Common.ObjectView.TreeViewNotifyType.Info:
                            (this._messagesButton.rootElement.lastElementChild).innerText = this._notificationCounts.messages.toString();
                            label = toolwindowHelpers.loadString((this._notificationCounts.messages === 1 ? "SingleMessage" : "MultiMessage"), this._notificationCounts.messages);
                            this._messagesButton.tooltip = label;
                            this._messagesButton.rootElement.setAttribute("aria-label", label);
                            break;
                        case Common.ObjectView.TreeViewNotifyType.Warn:
                            (this._warningsButton.rootElement.lastElementChild).innerText = this._notificationCounts.warnings.toString();
                            label = toolwindowHelpers.loadString((this._notificationCounts.warnings === 1 ? "SingleWarning" : "MultiWarning"), this._notificationCounts.warnings);
                            this._warningsButton.tooltip = label;
                            this._warningsButton.rootElement.setAttribute("aria-label", label);
                            break;
                        default:
                            break;
                    }
                };
                ConsoleWindow.prototype.updateNotificationFilter = function () {
                    var resetFilter = false;
                    var showingErrors = this._errorsButton.selected;
                    if(this._notificationFilters.errors !== showingErrors) {
                        this._notificationFilters.errors = showingErrors;
                        resetFilter = true;
                    }
                    var showingWarnings = this._warningsButton.selected;
                    if(this._notificationFilters.warnings !== showingWarnings) {
                        this._notificationFilters.warnings = showingWarnings;
                        resetFilter = true;
                    }
                    var showingMessages = this._messagesButton.selected;
                    if(this._notificationFilters.messages !== showingMessages) {
                        this._notificationFilters.messages = showingMessages;
                        resetFilter = true;
                    }
                    var showingLog = this._isShowingLog;
                    if(this._notificationFilters.log !== showingLog) {
                        this._notificationFilters.log = showingLog;
                        resetFilter = true;
                    }
                    if(resetFilter) {
                        this.resetFilter();
                    }
                };
                ConsoleWindow.prototype.resetFilter = function () {
                    var _this = this;
                    this._listview.setFilter(function (item) {
                        return _this.notificationFilter(item);
                    });
                };
                ConsoleWindow.prototype.onTargetEngineChanged = function (engine, doneCallback) {
                    var engineValue = JSON.parse(engine);
                    if(this._currentEngine.engineId !== engineValue.engineId || this._currentEngine.targetId !== engineValue.targetId || this._currentEngine.targetType !== engineValue.targetType) {
                        this._currentEngine = engineValue;
                        this.updateTargetView();
                        this._bridge.channel.call(this._currentEngine, "switchTarget", [
                            this._currentEngine.targetId, 
                            this._currentEngine.targetType
                        ]);
                    }
                    if(doneCallback) {
                        doneCallback();
                    }
                };
                ConsoleWindow.prototype.notificationFilter = function (item) {
                    if(item instanceof Common.ObjectView.TreeViewItem) {
                        var consoleItem = item;
                        if((consoleItem.notifyType === Common.ObjectView.TreeViewNotifyType.Error && !this._notificationFilters.errors) || (consoleItem.notifyType === Common.ObjectView.TreeViewNotifyType.Assert && !this._notificationFilters.errors) || (consoleItem.notifyType === Common.ObjectView.TreeViewNotifyType.Warn && !this._notificationFilters.warnings) || (consoleItem.notifyType === Common.ObjectView.TreeViewNotifyType.Info && !this._notificationFilters.messages) || (consoleItem.notifyType === Common.ObjectView.TreeViewNotifyType.Log && !this._notificationFilters.log)) {
                            return false;
                        }
                    }
                    return true;
                };
                ConsoleWindow.prototype.onConsoleBeforeRenderingHandler = function () {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Output_Render_Start);
                    if(this._onConsoleBeforeRendering) {
                        this._onConsoleBeforeRendering();
                    }
                };
                ConsoleWindow.prototype.onConsoleRenderedHandler = function () {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Output_Render_Stop);
                    if(this._onConsoleRendered) {
                        this._onConsoleRendered();
                    }
                };
                ConsoleWindow.prototype.onConsoleBeforeItemToggled = function () {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Item_Toggle_Start);
                };
                ConsoleWindow.prototype.onConsoleItemToggled = function () {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Item_Toggle_Stop);
                };
                ConsoleWindow.prototype.onConsoleBeforeScroll = function () {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Scroll_Start);
                };
                ConsoleWindow.prototype.onConsoleScrolled = function () {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Console_Scroll_Stop);
                };
                return ConsoleWindow;
            })();
            Console.ConsoleWindow = ConsoleWindow;            
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/console.js.map

// app.ts
var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            var ConsoleApp = (function () {
                function ConsoleApp() { }
                ConsoleApp.prototype.main = function () {
                    var _this = this;
                    Plugin.addEventListener("pluginready", function () {
                        var traceWriter = new Common.TraceWriter();
                        var bridge;
                        if(Plugin) {
                            if(Plugin.Tooltip) {
                                Plugin.Tooltip.defaultTooltipContentToHTML = false;
                            }
                            if(Plugin.F12) {
                                bridge = new Console.IEBridge(Plugin.F12, window.external, traceWriter);
                            } else if(Plugin.VS) {
                                bridge = new Console.VSBridge(Plugin.VS, traceWriter);
                            }
                        }
                        if(document.documentMode < 10) {
                            window.navigate("about:blank");
                            return;
                        }
                        _this.console = new Console.ConsoleWindow(bridge, traceWriter);
                        if(_this.onConsoleAppLoaded) {
                            _this.onConsoleAppLoaded();
                        }
                    });
                };
                return ConsoleApp;
            })();
            Console.ConsoleApp = ConsoleApp;            
            Console.App = new ConsoleApp();
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/app.js.map


// SIG // Begin signature block
// SIG // MIIaqQYJKoZIhvcNAQcCoIIamjCCGpYCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFEp1P4R8VRWd
// SIG // zMCrPfHg106R06Q3oIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSTMIIEjwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGsMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTTzGCn0rID
// SIG // vX8sHYUyS9LPlaj8QTBMBgorBgEEAYI3AgEMMT4wPKAi
// SIG // gCAAQwBvAG4AcwBvAGwAZQBNAGUAcgBnAGUAZAAuAGoA
// SIG // c6EWgBRodHRwOi8vbWljcm9zb2Z0LmNvbTANBgkqhkiG
// SIG // 9w0BAQEFAASCAQAF+UgRxzjtwqoKnHz254OOztddvc6F
// SIG // NaJEBHT0sLy8z36E2Jd8MzofhNemDBb0RDkCauU2C5cP
// SIG // /kbmHoQuUqi9zUnWibr3PTuI/JWkV2wlSF2CRpX1f4iU
// SIG // TwRP5VziIOrppnPIFUVJ8fXRH9e4T/x+HkrV99eRmpIo
// SIG // WRQ9mWtXdb7PcyMybCiJGaS9UImCWMgpEC7tIdYTs8Lj
// SIG // aBWsXWrQgXUMA8qENX/kvpZmISm6WSq81eFtkFpn+AW/
// SIG // bHHXUyNhjQGD1wHn3vhrCitHGbRtFooO+vxPT5v92AHR
// SIG // Xfyug+ahTH64KRd/CuE0AAXdfzGENUkW+PiYrOTokP+e
// SIG // cekioYICKDCCAiQGCSqGSIb3DQEJBjGCAhUwggIRAgEB
// SIG // MIGOMHcxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xITAfBgNVBAMT
// SIG // GE1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQQITMwAAAEyh
// SIG // 6E3MtHR7OwAAAAAATDAJBgUrDgMCGgUAoF0wGAYJKoZI
// SIG // hvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUx
// SIG // DxcNMTQwNTAxMDc1MjM4WjAjBgkqhkiG9w0BCQQxFgQU
// SIG // 1f8JTozBaHVPNk4FUKoD3h68fwYwDQYJKoZIhvcNAQEF
// SIG // BQAEggEAsLefhVrOqJpuR3lKHnXaXQk2BIu4RMDovmIM
// SIG // n3MgDAC3DrUjWv2RnDb1Bz4oUpHNPLlMMcGjs4sq/Vef
// SIG // jEWSWjsY0hzdMlJ/yl+vT284aOFVeloJ9Vb9vR7SUdt5
// SIG // AyMAdYxk0tmlnISFq2oXbuZRvsts75JxbVsCxMbOpe3/
// SIG // rsWcWyzweNziCKxp0+fFgHMIX1Cmu8gORbfyci+2uY4D
// SIG // w4Fi6dW+l+wF4/FQsDgUPphrmNT3bPKsJpH3tCjvW9AB
// SIG // RZ7qypmhIMXbyoRTY0vhAxfKGzGriy/NqIZvx4ebE5ib
// SIG // XIrrAYjdoBfgS5gGGcpxs1e6SAMY5HuO/jZnAe9nHQ==
// SIG // End signature block
