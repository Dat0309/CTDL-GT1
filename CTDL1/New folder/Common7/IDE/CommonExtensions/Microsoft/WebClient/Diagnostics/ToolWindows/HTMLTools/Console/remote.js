var F12;
(function (F12) {
    "use strict";
    (function (Tools) {
        (function (Console) {
            var RemoteCode = (function () {
                function RemoteCode() {
                    this.maxItemTraverseCount = 500;
                    this.defaultTimerName = "default";
                    this.consoleNotificationQueue = [];
                    this.currentWindowContext = null;
                    this._frames = {
                    };
                    this.resultMap = {
                    };
                    this.consoleTimers = {
                    };
                    this.consoleCounters = {
                    };
                    this.consoleDefaultCounter = 0;
                }
                Object.defineProperty(RemoteCode.prototype, "suppressPostCode", {
                    get: function () {
                        return "suppressOutput-{9724EC8B-E0A8-4B3B-94CB-AB1F31CB47DB}";
                    },
                    enumerable: true,
                    configurable: true
                });
                RemoteCode.getInstance = function getInstance() {
                    return remoteCode;
                };
                RemoteCode.prototype.initialize = function () {
                    if(typeof browser !== "undefined") {
                        Common.RemoteHelpers.addListener(browser, "beforeScriptExecute", remoteCode.onBeforeScriptExecute);
                        Common.RemoteHelpers.addListener(browser, "consoleMessage", function (e) {
                            remoteCode.onConsoleMessage(e.source, e.level, e.messageId, e.messageText, e.fileUrl, e.line, e.column);
                        });
                    }
                    remoteHelpers.initialize("ConsolePort", remoteCode.initializePage, "__BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC");
                    this.initializeWebWorkers();
                };
                RemoteCode.prototype.addNodeRemovedEventListener = function (documentWindow) {
                    if(Common.RemoteHelpers.getDocumentMode() > 8) {
                        if(!remoteCode.onMainWindowNodeRemovedSafeEventListener) {
                            var safeRemover = Common.RemoteHelpers.addSafeListener(documentWindow, documentWindow.document, "DOMNodeRemoved", remoteCode.onDomNodeRemoved);
                            remoteCode.onMainWindowNodeRemovedSafeEventListener = safeRemover;
                        } else {
                            Common.RemoteHelpers.addListener(documentWindow.document, "DOMNodeRemoved", remoteCode.onMainWindowNodeRemovedSafeEventListener);
                        }
                    }
                };
                RemoteCode.prototype.removeNodeRemovedEventListener = function (unsafeWindow) {
                    if(unsafeWindow) {
                        Common.RemoteHelpers.removeListener(unsafeWindow.document, "DOMNodeRemoved", remoteCode.onMainWindowNodeRemovedSafeEventListener);
                        if(unsafeWindow.frames) {
                            for(var i = 0, len = unsafeWindow.frames.length; i < len; i++) {
                                var frame = unsafeWindow.frames[i];
                                var result = Common.RemoteHelpers.getValidWindow(unsafeWindow, frame);
                                if(result.isValid) {
                                    this.removeNodeRemovedEventListener(result.window);
                                }
                            }
                        }
                    } else if(remoteCode.onMainWindowNodeRemovedSafeEventListener) {
                        this.removeNodeRemovedEventListener(browser.document.parentWindow);
                        remoteCode.onMainWindowNodeRemovedSafeEventListener = null;
                    }
                };
                RemoteCode.prototype.onDomNodeRemoved = function (e) {
                    var searchTargets = (e.target.nodeName === "IFRAME") ? [
                        e.target
                    ] : e.target.getElementsByTagName ? e.target.getElementsByTagName("IFRAME") : [];
                    for(var i = 0, n = searchTargets.length; i < n; i++) {
                        var iframe = searchTargets[i].contentWindow;
                        var result = Common.RemoteHelpers.getValidWindow(browser.document.parentWindow, iframe);
                        if(result.isValid) {
                            iframe = result.window;
                            remoteCode.removeIframeTargets(iframe);
                            if(iframe && remoteCode.anyIFrames(iframe, function (unsafeWindow) {
                                return unsafeWindow === remoteCode.currentWindowContext;
                            })) {
                                remoteCode.onConsoleFunc("cd", {
                                    argsCount: 0
                                }, true);
                                break;
                            }
                        }
                    }
                    remoteCode.constructors = null;
                };
                RemoteCode.prototype.removeIframeTarget = function (frameId) {
                    remoteHelpers.port.postMessage("TargetClosed:" + JSON.stringify({
                        targetType: "Frame",
                        targetId: frameId
                    }));
                    delete remoteCode._frames[frameId];
                };
                RemoteCode.prototype.removeIframeTargets = function (unsafeWindow) {
                    if(unsafeWindow.frames) {
                        for(var i = 0, len = unsafeWindow.frames.length; i < len; i++) {
                            var frame = unsafeWindow.frames[i];
                            var result = Common.RemoteHelpers.getValidWindow(unsafeWindow, frame);
                            if(result.isValid) {
                                var iframe = result.window;
                                remoteCode.removeIframeTargets(iframe);
                            }
                        }
                    }
                    for(var key in remoteCode._frames) {
                        if(unsafeWindow === remoteCode._frames[key]) {
                            remoteHelpers.port.postMessage("TargetClosed:" + JSON.stringify({
                                targetType: "Frame",
                                targetId: key
                            }));
                            delete remoteCode._frames[key];
                            break;
                        }
                    }
                };
                RemoteCode.prototype.clearTargets = function () {
                    remoteCode._frames = {
                    };
                    remoteHelpers.port.postMessage("ClearTargets");
                };
                RemoteCode.prototype.anyIFrames = function (unsafeWindow, func) {
                    var current = func(unsafeWindow);
                    if(current) {
                        return true;
                    }
                    if(unsafeWindow.frames) {
                        for(var i = 0, len = unsafeWindow.frames.length; i < len; i++) {
                            var frame = unsafeWindow.frames[i];
                            var result = Common.RemoteHelpers.getValidWindow(unsafeWindow, frame);
                            if(result.isValid) {
                                var iframe = result.window;
                                if(iframe && this.anyIFrames(iframe, func)) {
                                    return true;
                                }
                            }
                        }
                    }
                    return false;
                };
                RemoteCode.prototype.initializeConsoles = function (realWindow) {
                    var successfulInitialization = false;
                    try  {
                        successfulInitialization = remoteCode.initializeConsole(realWindow);
                    } catch (e) {
                    }
                    try  {
                        if(!browser || !browser.document) {
                            return;
                        }
                        var isRootWindow = realWindow === browser.document.parentWindow;
                    } catch (e) {
                        return;
                    }
                    if(isRootWindow) {
                        remoteCode.removeNodeRemovedEventListener();
                    } else {
                        var result = Common.RemoteHelpers.getValidWindow(browser.document.parentWindow, realWindow);
                        if(!result.isValid) {
                            return;
                        }
                        realWindow = result.window;
                        if(successfulInitialization && Common.RemoteHelpers.getDocumentMode() > 8) {
                            var exists = false;
                            for(var id in remoteCode._frames) {
                                try  {
                                    if(remoteCode._frames[id] === realWindow) {
                                        exists = true;
                                        remoteCode._frames[id] = realWindow;
                                        remoteHelpers.port.postMessage("TargetUpdated:" + JSON.stringify({
                                            targetType: "Frame",
                                            targetId: id,
                                            href: realWindow.location.href
                                        }));
                                    }
                                } catch (e) {
                                    remoteCode.removeIframeTarget(id);
                                }
                            }
                            if(!exists) {
                                var frameId = remoteHelpers.getUid();
                                remoteCode._frames[frameId] = realWindow;
                                remoteHelpers.port.postMessage("TargetCreated:" + JSON.stringify({
                                    targetType: "Frame",
                                    targetId: frameId,
                                    href: realWindow.location.href
                                }));
                            }
                        }
                    }
                    remoteCode.addNodeRemovedEventListener(realWindow);
                    if(realWindow.frames) {
                        for(var i = 0, len = realWindow.frames.length; i < len; i++) {
                            var frame = realWindow.frames[i];
                            var result = Common.RemoteHelpers.getValidWindow(realWindow, frame);
                            if(result.isValid) {
                                remoteCode.initializeConsoles(result.window);
                            }
                        }
                    }
                };
                RemoteCode.prototype.initializeConsole = function (realWindow) {
                    var consoleObj = realWindow.console;
                    var injectedConsole = {
                    };
                    var unloadHandler = function () {
                        Common.RemoteHelpers.removeListener(toolUI, "detach", detachHandler);
                    };
                    var detachHandler = function () {
                        remoteCode.onDetach(realWindow, injectedConsole);
                        Common.RemoteHelpers.removeListener(toolUI, "detach", detachHandler);
                    };
                    Common.RemoteHelpers.addListener(toolUI, "detach", detachHandler);
                    if(!remoteCode.unloadSafe) {
                        remoteCode.unloadSafe = Common.RemoteHelpers.addSafeListener(realWindow, realWindow, "unload", unloadHandler);
                    }
                    realWindow.__BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC = remoteHelpers.createSafeFunction(realWindow, function (id, data) {
                        remoteCode.onBreakModeFunc(id, data);
                    });
                    var $func = function () {
                        return window.document.getElementById.apply(window.document, arguments);
                    };
                    var $$func = function () {
                        return window.document.querySelectorAll.apply(window.document, arguments);
                    };
                    var scriptFor$ = "window.__BROWSERTOOLS_CONSOLE = {};" + "window.__BROWSERTOOLS_CONSOLE.$ = " + $func.toString() + ";" + "window.__BROWSERTOOLS_CONSOLE.$$ = " + $$func.toString() + ";";
                    scriptFor$ = JSON.stringify(scriptFor$).slice(1, -1);
                    browser.executeScript(scriptFor$ + Common.RemoteHelpers.getJMCScriptUrl("console"), realWindow);
                    realWindow.__BROWSERTOOLS_CONSOLE.performBreakmodeIntellisense = browser.createSafeFunction(realWindow, function (id, expression, windowContext, searchObject, locals) {
                        remoteCode.performBreakmodeIntellisense(id, expression, windowContext, searchObject, locals);
                    });
                    if(!consoleObj && typeof (console) !== "undefined") {
                        consoleObj = realWindow.console = console;
                    } else if((!realWindow.console) && (typeof (console) === "undefined")) {
                        if(realWindow["eval"]) {
                            realWindow["eval"]("{ document.parentWindow['console'] = {};}");
                        } else {
                            realWindow["execScript"]("{ document.parentWindow['console'] = {};}");
                        }
                        consoleObj = realWindow.console;
                    }
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "log", function () {
                        var notifyMessage = remoteCode.createOutputNotifyMessageObject.apply(this, arguments);
                        remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.log, notifyMessage);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "info", function () {
                        var notifyMessage = remoteCode.createOutputNotifyMessageObject.apply(this, arguments);
                        remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.info, notifyMessage);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "warn", function () {
                        var notifyMessage = remoteCode.createOutputNotifyMessageObject.apply(this, arguments);
                        remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.warn, notifyMessage);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "error", function () {
                        var notifyMessage = remoteCode.createOutputNotifyMessageObject.apply(this, arguments);
                        remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error, notifyMessage);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "debug", function () {
                        try  {
                            var notifyMessage = remoteCode.createOutputNotifyMessageObject.apply(this, arguments);
                            remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.log, notifyMessage);
                        } catch (e) {
                            remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error, e);
                        }
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "assert", function (test) {
                        if(!test) {
                            var args;
                            for(var i = 1; i < arguments.length; i++) {
                                if(!args) {
                                    args = [];
                                }
                                args.push(arguments[i]);
                            }
                            var notifyMessage = remoteCode.createOutputNotifyMessageObject.apply(this, args);
                            remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.assert, notifyMessage);
                        }
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "time", function (name) {
                        remoteCode.createConsoleTimer(name);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "timeEnd", function (name) {
                        remoteCode.endConsoleTimer(name);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "group", function (name) {
                        remoteCode.startGroup(name, false);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "groupCollapsed", function (name) {
                        remoteCode.startGroup(name, true);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "groupEnd", function () {
                        remoteCode.endGroup();
                    });
                    if(Common.RemoteHelpers.getDocumentMode() >= 10) {
                        var trace = function () {
                            var stackTrace = (function () {
                                try  {
                                    throw new Error("");
                                } catch (ex) {
                                    return ex.stack;
                                }
                            })();
                            var messages = stackTrace ? stackTrace.split("\n") : "";
                            messages.splice(0, 3);
                            console.log("console.trace()\n" + messages.join("\n"));
                        };
                        var scriptForTrace = "console.trace = " + trace.toString();
                        scriptForTrace = JSON.stringify(scriptForTrace).slice(1, -1);
                        browser.executeScript(scriptForTrace + Common.RemoteHelpers.getJMCScriptUrl("console"), realWindow);
                        injectedConsole["trace"] = consoleObj["trace"];
                    } else {
                        this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "trace", function () {
                            remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.warn, {
                                localizeId: "ConsoleUnsupportedDocumentModeAPIError",
                                args: [
                                    String(Common.RemoteHelpers.getDocumentMode()), 
                                    String("console.trace")
                                ]
                            });
                        });
                    }
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "clear", function () {
                        remoteCode.onConsoleFunc("clear");
                        return remoteCode.suppressPostCode;
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "dir", function (obj) {
                        remoteCode.onConsoleFunc("dir", obj);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "dirxml", function (obj) {
                        remoteCode.onConsoleFunc("dirxml", obj);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "count", function (obj) {
                        remoteCode.count(obj);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "countReset", function (obj) {
                        remoteCode.countReset(obj);
                    });
                    this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "cd", function (obj) {
                        remoteCode.onConsoleFunc("cd", {
                            obj: obj,
                            argsCount: arguments.length
                        });
                    });
                    if(consoleObj.select === undefined || (consoleObj.select && consoleObj.select.toString && consoleObj.select.toString() === "\nfunction select() {\n    [native code]\n}\n")) {
                        this.defineInjectedConsoleObjFunction(injectedConsole, consoleObj, realWindow, "select", function (obj) {
                            remoteCode.consoleSelectNotInitialized();
                        });
                    }
                    return true;
                };
                RemoteCode.prototype.initializeWebWorkers = function () {
                    Common.RemoteHelpers.addListener(browser, "webWorkerCreated", remoteCode.onWebWorkerCreated);
                    var workerBreakmodeFunc = function (id, data) {
                        try  {
                            if(!data.isError) {
                                if(data.result) {
                                    if(typeof data.result === "object") {
                                        data.result = data.result.toString();
                                    } else {
                                        data.result = data.result;
                                    }
                                }
                            }
                            (diagnostics).postMessage("breakmode_func", JSON.stringify({
                                id: id,
                                data: data
                            }));
                        } catch (e) {
                            (diagnostics).postMessage("breakmode_func", JSON.stringify({
                                id: id,
                                data: {
                                    isError: true,
                                    result: e
                                }
                            }));
                        }
                    };
                    var breakModeFunction = "worker.worker.__BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC = worker.createSafeFunction(worker.worker, " + workerBreakmodeFunc.toString() + ");";
                    browser.workerStartupScript = breakModeFunction;
                    var workers = browser.workers;
                    for(var id in workers) {
                        workers[id].addEventListener("message", this.onWorkerMessage);
                        workers[id].executeScriptAsync(breakModeFunction, "breakmode_func");
                    }
                };
                RemoteCode.prototype.onWorkerMessage = function (e) {
                    if(e.type && e.type === "breakmode_func" && e.message) {
                        var message = JSON.parse(e.message);
                        remoteCode.onBreakModeFunc(message.id, message.data);
                    }
                };
                RemoteCode.prototype.onWebWorkerCreated = function (e) {
                    var workers = browser.workers;
                    if(e.id && workers[e.id]) {
                        workers[e.id].addEventListener("message", remoteCode.onWorkerMessage);
                    }
                };
                RemoteCode.prototype.onBeforeScriptExecute = function (dispatchWindow) {
                    if(dispatchWindow && dispatchWindow.browserOrWindow) {
                        dispatchWindow = dispatchWindow.browserOrWindow;
                    }
                    var realWindow;
                    try  {
                        realWindow = dispatchWindow.document.parentWindow;
                    } catch (ex) {
                        return;
                    }
                    if(realWindow === mainBrowser.document.parentWindow) {
                        remoteCode.currentWindowContext = realWindow;
                        if(remoteHelpers.port) {
                            remoteHelpers.postAllMessages();
                            remoteCode.initializePage();
                        }
                    } else {
                        try  {
                            var currentWindow = remoteCode.currentWindowContext.document.parentWindow;
                        } catch (e) {
                            remoteCode.cd();
                        }
                        remoteCode.initializeConsoles(realWindow);
                    }
                    remoteCode.ensureConstructorsAreAvailable(true);
                };
                RemoteCode.prototype.onDetach = function (realWindow, injectedConsole) {
                    Common.RemoteHelpers.removeListener(browser, "beforeScriptExecute", remoteCode.onBeforeScriptExecute);
                    remoteCode.removeNodeRemovedEventListener();
                    try  {
                        if(realWindow.console) {
                            var functionsNotRemoved = 0;
                            for(var prop in injectedConsole) {
                                if(realWindow.console[prop] === injectedConsole[prop]) {
                                    if(Common.RemoteHelpers.getDocumentMode() < 9) {
                                        realWindow.console[prop] = null;
                                    } else {
                                        delete realWindow.console[prop];
                                    }
                                } else {
                                    functionsNotRemoved++;
                                }
                            }
                            if(functionsNotRemoved === 0) {
                                var deleteConsole = true;
                                for(var i in realWindow.console) {
                                    if(realWindow.console[i]) {
                                        deleteConsole = false;
                                        break;
                                    }
                                }
                                if(deleteConsole) {
                                    delete realWindow.console;
                                }
                            }
                        }
                        if(realWindow.__BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC) {
                            delete realWindow.__BROWSERTOOLS_CONSOLE_BREAKMODE_FUNC;
                        }
                        if(remoteCode.unloadSafe) {
                            Common.RemoteHelpers.removeListener(realWindow, "unload", remoteCode.unloadSafe);
                            remoteCode.unloadSafe = null;
                        }
                    } catch (ex) {
                    }
                    remoteCode._frames = {
                    };
                    injectedConsole = null;
                };
                RemoteCode.prototype.callInvoker = function (win, input) {
                    if(!win.execScript) {
                        var evalString = win.eval.toString();
                        if(evalString !== "\nfunction eval() {\n    [native code]\n}\n" && remoteCode.notifyCallback) {
                            remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error, {
                                localizeId: "ModifiedEvalFunction"
                            });
                            remoteHelpers.isEvalModified = true;
                        }
                    }
                    var returnValue = {
                        result: undefined,
                        isError: false
                    };
                    var inlineConsole = [];
                    try  {
                        if((typeof win.cd) === "undefined") {
                            win.cd = win.console.cd;
                            inlineConsole.push({
                                name: "cd",
                                func: win.console.cd
                            });
                        }
                        if((typeof win.dir) === "undefined") {
                            win.dir = win.console.dir;
                            inlineConsole.push({
                                name: "dir",
                                func: win.console.dir
                            });
                        }
                        if((typeof win.select) === "undefined") {
                            win.select = win.console.select;
                            inlineConsole.push({
                                name: "select",
                                func: win.console.select
                            });
                        }
                        if((typeof win.$) === "undefined") {
                            win.$ = win.__BROWSERTOOLS_CONSOLE.$;
                            inlineConsole.push({
                                name: "$",
                                func: win.$
                            });
                        }
                        if((typeof win.$$) === "undefined") {
                            win.$$ = win.__BROWSERTOOLS_CONSOLE.$$;
                            inlineConsole.push({
                                name: "$$",
                                func: win.$$
                            });
                        }
                        if(win.__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS) {
                            for(var i = 0; i <= 4; i++) {
                                if((typeof win["$" + i]) === "undefined") {
                                    win["$" + i] = win.__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS[i];
                                    inlineConsole.push({
                                        name: "$" + i,
                                        func: win["$" + i]
                                    });
                                }
                            }
                        }
                        var escapedInput = JSON.stringify(input).slice(1, -1);
                        try  {
                            returnValue.result = browser.executeScript(escapedInput + Common.RemoteHelpers.getJMCScriptUrl("console"), win);
                            if(win.$_ === win.__BROWSERTOOLS_CONSOLE.$_ || (isNaN(win.$_) && isNaN(win.__BROWSERTOOLS_CONSOLE.$_))) {
                                win.__BROWSERTOOLS_CONSOLE.$_ = win.$_ = returnValue.result;
                            } else {
                                delete win.__BROWSERTOOLS_CONSOLE.$_;
                            }
                        } catch (e) {
                            returnValue.result = win.document.__IE_DEVTOOLBAR_CONSOLE_EVAL_RESULT;
                            returnValue.isError = true;
                        }
                    } catch (invokerEx) {
                        returnValue = {
                            result: undefined,
                            isError: false
                        };
                    }
                    for(var i = 0; i < inlineConsole.length; i++) {
                        if(win[inlineConsole[i].name] === inlineConsole[i].func) {
                            if(Common.RemoteHelpers.getDocumentMode() < 9) {
                                win[inlineConsole[i].name] = undefined;
                            } else {
                                delete win[inlineConsole[i].name];
                            }
                        }
                    }
                    return returnValue;
                };
                RemoteCode.prototype.onConsoleMessage = function (source, level, messageId, messageText, fileUrl, lineNumber, columnNumber) {
                    if(source === "HTML" && messageId === 1300) {
                        remoteCode.reset();
                        remoteHelpers.port.postMessage("ClearOnNavigate");
                    }
                    if(messageId === 7002 && fileUrl === "about:blank") {
                        return;
                    }
                    if(source === "CONSOLE") {
                        switch(messageId) {
                            case 6000:
                                remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.log, messageText, true);
                                return;
                            case 6001:
                                remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.warn, messageText, true);
                                return;
                            case 6002:
                                if(messageText === "ConsoleSelectError") {
                                    remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error, {
                                        localizeId: messageText
                                    });
                                } else {
                                    remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error, messageText, true);
                                }
                                return;
                            case 6003:
                                remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.assert, messageText, true);
                                return;
                            case 6004:
                                remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.info, messageText, true);
                                return;
                        }
                    }
                    var messageIdentifier = source + messageId;
                    var data = {
                        messageId: messageIdentifier,
                        message: messageIdentifier + ": " + messageText,
                        fileUrl: fileUrl,
                        lineNumber: lineNumber,
                        columnNumber: columnNumber
                    };
                    switch(level) {
                        case 0:
                            remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.info, data);
                            break;
                        case 1:
                            remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.warn, data);
                            break;
                        case 2:
                            remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error, data);
                            break;
                    }
                };
                RemoteCode.prototype.onConsoleFunc = function (functionId, data, postMessageImmediately) {
                    switch(functionId) {
                        case "cd":
                            remoteCode.cd(data.obj);
                            break;
                        case "clear":
                            if(remoteCode.clearCallback) {
                                remoteCode.reset();
                                remoteCode.clearCallback();
                            }
                            break;
                        case "dir":
                            if(remoteCode.outputCallback) {
                                var returnObj = remoteCode.createOutputObject(-1, data);
                                if(returnObj.detailedType !== "undefined") {
                                    remoteCode.outputCallback(returnObj);
                                }
                            }
                            break;
                        case "dirxml":
                            if(remoteCode.outputCallback) {
                                var htmlTypeName = remoteCode.getHtmlViewableTypeName(data);
                                if(htmlTypeName !== null) {
                                    var returnObj = remoteCode.createOutputHtmlElement(-1, data, htmlTypeName);
                                } else {
                                    var returnObj = remoteCode.createOutputObject(-1, data);
                                }
                                if(returnObj.detailedType !== "undefined") {
                                    remoteCode.outputCallback(returnObj);
                                }
                            }
                            break;
                        default:
                            if(!remoteCode.notifyCallback) {
                                remoteCode.consoleNotificationQueue.push({
                                    functionId: functionId,
                                    data: data
                                });
                            } else {
                                remoteCode.notifyCallback({
                                    notifyType: functionId,
                                    message: data
                                }, null, postMessageImmediately);
                            }
                            break;
                    }
                };
                RemoteCode.prototype.cd = function (targetFrame) {
                    if(remoteCode.notifyCallback) {
                        try  {
                            var iframe;
                            if(!targetFrame) {
                                iframe = browser.document.parentWindow;
                                remoteHelpers.port.postMessage("TargetChanged:" + JSON.stringify({
                                    targetType: "_top"
                                }));
                            } else {
                                var result = Common.RemoteHelpers.getValidWindow(remoteCode.currentWindowContext, targetFrame);
                                if(result.isValid) {
                                    iframe = result.window;
                                    for(var key in remoteCode._frames) {
                                        if(remoteCode._frames[key] === iframe) {
                                            remoteHelpers.port.postMessage("TargetChanged:" + JSON.stringify({
                                                targetType: "Frame",
                                                targetId: key
                                            }));
                                            break;
                                        }
                                    }
                                } else {
                                    iframe = remoteCode.currentWindowContext;
                                }
                            }
                            remoteCode.currentWindowContext = iframe;
                            var newWindowContext = iframe.location.href;
                            var newWindowText = iframe.location.hostname + iframe.location.pathname;
                            newWindowText = String.prototype.replace.call(newWindowText, /\/$/, "");
                            remoteCode.notifyCallback({
                                notifyType: "consoleItemCDContext",
                                message: newWindowText,
                                contextInfo: newWindowContext
                            });
                        } catch (e) {
                            remoteCode.notifyCallback({
                                notifyType: Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error,
                                message: (e.message || e.description)
                            });
                        }
                    }
                };
                RemoteCode.prototype.onBreakModeFunc = function (id, data) {
                    if(id === null || typeof id === "undefined") {
                        return;
                    } else if(id === "" && data) {
                        remoteHelpers.processMessages({
                            data: data
                        });
                    } else {
                        var parts = id.split(":");
                        if(parts.length === 3) {
                            var funcName = parts[0];
                            var inputId = parseInt(parts[1], 10);
                            var uid = parts[2];
                            var returnValue;
                            if(funcName === "processInput") {
                                returnValue = remoteCode.createConsoleResult(inputId, data);
                            }
                            if(returnValue && returnValue.suppressPostObject) {
                                return;
                            }
                            if(returnValue !== undefined) {
                                remoteHelpers.postObject({
                                    uid: uid,
                                    args: [
                                        returnValue
                                    ]
                                });
                            }
                        }
                    }
                };
                RemoteCode.prototype.ensureConstructorsAreAvailable = function (forceCreate) {
                    if(!remoteCode.constructors || forceCreate) {
                        var mainWindow = Common.RemoteHelpers.getDefaultView(browser.document);
                        remoteCode.constructors = remoteCode.getAllConstructors(mainWindow);
                    }
                };
                RemoteCode.prototype.getAllConstructors = function (root) {
                    var constructors = [];
                    constructors.push(remoteCode.getWindowConstructors(root));
                    if(root.frames && root.frames.length > 0) {
                        for(var i = 0; i < root.frames.length; i++) {
                            var frame = root.frames[i];
                            var result = Common.RemoteHelpers.getValidWindow(root, frame);
                            if(result.isValid) {
                                constructors = constructors.concat(remoteCode.getAllConstructors(result.window));
                            }
                        }
                    }
                    return constructors;
                };
                RemoteCode.prototype.getWindowConstructors = function (win) {
                    var windowConstructors = {
                    };
                    try  {
                        windowConstructors.array = (new win.Array()).constructor;
                        windowConstructors.date = (new win.Date()).constructor;
                        windowConstructors.regex = (new win.RegExp()).constructor;
                        windowConstructors.htmlElement = win.HTMLElement;
                        windowConstructors.htmlNode = win.Node;
                        windowConstructors.nodeList = win.NodeList;
                        windowConstructors.htmlCollection = win.HTMLCollection;
                    } catch (e) {
                    }
                    return windowConstructors;
                };
                RemoteCode.prototype.getHtmlViewableTypeName = function (obj) {
                    remoteCode.ensureConstructorsAreAvailable();
                    if(remoteCode.constructors && Common.RemoteHelpers.getDocumentMode() >= 9) {
                        for(var i = 0; i < remoteCode.constructors.length; i++) {
                            try  {
                                if(remoteCode.constructors[i].htmlElement && (obj instanceof remoteCode.constructors[i].htmlElement)) {
                                    try  {
                                        var id = obj.id;
                                    } catch (e) {
                                        return null;
                                    }
                                    return "HtmlElement";
                                } else if(remoteCode.constructors[i].htmlNode && (obj instanceof remoteCode.constructors[i].htmlNode)) {
                                    var nodeType;
                                    try  {
                                        nodeType = obj.nodeType;
                                    } catch (e) {
                                        return null;
                                    }
                                    if(nodeType === obj.DOCUMENT_NODE) {
                                        return "DocumentNode";
                                    } else if(nodeType === obj.ATTRIBUTE_NODE) {
                                        return "AttributeNode";
                                    } else {
                                        return "HtmlNode";
                                    }
                                } else if(remoteCode.constructors[i].nodeList && (obj instanceof remoteCode.constructors[i].nodeList)) {
                                    return "NodeList";
                                } else if(remoteCode.constructors[i].htmlCollection && (obj instanceof remoteCode.constructors[i].htmlCollection)) {
                                    return "HtmlCollection";
                                }
                            } catch (e) {
                            }
                        }
                    }
                    return null;
                };
                RemoteCode.prototype.createConsoleResult = function (inputId, evaluatedReturnValue) {
                    var consoleObject;
                    if(evaluatedReturnValue.isError) {
                        if(remoteCode.notifyCallback) {
                            consoleObject = {
                                inputId: inputId,
                                notifyType: Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error
                            };
                            if(evaluatedReturnValue.result) {
                                if(evaluatedReturnValue.result.message && evaluatedReturnValue.result.name) {
                                    consoleObject.message = {
                                        message: evaluatedReturnValue.result.message,
                                        localizeId: evaluatedReturnValue.result.name
                                    };
                                } else {
                                    consoleObject.message = evaluatedReturnValue.result.message || evaluatedReturnValue.result.description || evaluatedReturnValue.result.toString();
                                }
                                remoteCode.notifyCallback(consoleObject);
                            } else {
                                consoleObject["suppressPostObject"] = true;
                            }
                        }
                    } else {
                        mainBrowser.document.parentWindow.msWriteProfilerMark("ConsoleRemote:BeginCreateResultObject");
                        var htmlTypeName = remoteCode.getHtmlViewableTypeName(evaluatedReturnValue.result);
                        if(htmlTypeName !== null && htmlTypeName !== "DocumentNode") {
                            consoleObject = remoteCode.createOutputHtmlElement(inputId, evaluatedReturnValue.result, htmlTypeName);
                        } else {
                            consoleObject = remoteCode.createOutputObject(inputId, evaluatedReturnValue.result);
                            if(htmlTypeName === "DocumentNode") {
                                consoleObject.isHtmlViewableType = true;
                            }
                        }
                        mainBrowser.document.parentWindow.msWriteProfilerMark("ConsoleRemote:EndCreateResultObject");
                    }
                    if(evaluatedReturnValue && (evaluatedReturnValue.isError || evaluatedReturnValue.result === remoteCode.suppressPostCode)) {
                        consoleObject["suppressPostObject"] = true;
                    }
                    return consoleObject;
                };
                RemoteCode.prototype.createOutputNotifyMessageObject = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    var notifyMessage = {
                    };
                    notifyMessage.message = Common.ObjectView.TreeViewStringFormatter.formatConsoleMessage.apply(this, args);
                    notifyMessage.localizeId = notifyMessage.message;
                    if(args.length > 0) {
                        var createViewableObject = false;
                        var viewableArguments = [];
                        for(var i = 0; i < args.length; i++) {
                            var viewableNotificationObject = remoteCode.createConsoleResult(-1, {
                                result: args[i]
                            });
                            if(typeof args[i] === "object") {
                                createViewableObject = true;
                            }
                            viewableArguments.push(viewableNotificationObject);
                        }
                    }
                    if(createViewableObject) {
                        notifyMessage.viewableObject = viewableArguments;
                    }
                    return notifyMessage;
                };
                RemoteCode.prototype.createOutputHtmlElement = function (inputId, element, htmlTypeName) {
                    var name;
                    try  {
                        name = Object.prototype.toString.call(element);
                    } catch (e) {
                        name = null;
                    }
                    var value = htmlTreeHelpers.createMappedNode(element, true);
                    if(htmlTypeName === "NodeList" || htmlTypeName === "HtmlCollection") {
                        value.tag = htmlTypeName;
                        htmlTreeHelpers.mapping[value.uid].listType = htmlTypeName;
                        value.attributes = [
                            {
                                name: "length",
                                value: element.length
                            }
                        ];
                    }
                    return {
                        inputId: inputId,
                        consoleType: "consoleItemOutput",
                        detailedType: "htmlElement",
                        isExpandable: true,
                        isHtmlViewableType: true,
                        name: name,
                        value: value,
                        uid: 0
                    };
                };
                RemoteCode.prototype.createOutputObject = function (inputID, obj, propertyName, isInternal) {
                    var treeViewObjectExplorer;
                    if(Common.RemoteHelpers.getDocumentMode() >= 9) {
                        treeViewObjectExplorer = new Common.ObjectView.TreeViewRemoteObjectExplorer(this);
                    } else {
                        treeViewObjectExplorer = new Common.ObjectView.TreeViewDirectObjectExplorer();
                    }
                    var treeViewRemoteHelper = new Common.ObjectView.TreeViewRemoteHelpers(this, treeViewObjectExplorer);
                    remoteCode.ensureConstructorsAreAvailable();
                    return treeViewRemoteHelper.createOutputObject(inputID, obj, propertyName, isInternal);
                };
                RemoteCode.prototype.createConsoleTimer = function (name) {
                    if(!name) {
                        name = remoteCode.defaultTimerName;
                    }
                    if(remoteCode.consoleTimers.hasOwnProperty(name) && remoteCode.consoleTimers[name]) {
                        remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.warn, {
                            localizeId: "ConsoleTimerWarning",
                            args: [
                                String(name)
                            ]
                        });
                    } else {
                        remoteCode.consoleTimers[name] = this.getTimeStamp();
                    }
                };
                RemoteCode.prototype.endConsoleTimer = function (name) {
                    var time = this.getTimeStamp();
                    if(!name) {
                        name = remoteCode.defaultTimerName;
                    }
                    if(remoteCode.consoleTimers.hasOwnProperty(name) && remoteCode.consoleTimers[name]) {
                        time = time - remoteCode.consoleTimers[name];
                        delete remoteCode.consoleTimers[name];
                        remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.log, {
                            localizeId: "ConsoleTimerDisplay",
                            args: [
                                String(name), 
                                time.toFixed(4)
                            ]
                        });
                    } else {
                        remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.warn, {
                            localizeId: "NonExistentConsoleTimerWarning",
                            args: [
                                String(name)
                            ]
                        });
                    }
                };
                RemoteCode.prototype.count = function (name) {
                    if(name === undefined || name === null) {
                        remoteCode.consoleDefaultCounter = remoteCode.consoleDefaultCounter + 1;
                        remoteCode.onConsoleFunc("count", {
                            name: null,
                            message: remoteCode.consoleDefaultCounter.toString()
                        });
                    } else {
                        var newCount = 1;
                        if(remoteCode.consoleCounters.hasOwnProperty(name) && remoteCode.consoleCounters[name] !== null) {
                            newCount = remoteCode.consoleCounters[name] + 1;
                        }
                        remoteCode.consoleCounters[name] = newCount;
                        remoteCode.onConsoleFunc("count", {
                            name: String(name),
                            message: newCount.toString()
                        });
                    }
                };
                RemoteCode.prototype.countReset = function (name) {
                    if(name === undefined || name === null) {
                        remoteCode.consoleDefaultCounter = 0;
                        remoteCode.onConsoleFunc("count", {
                            name: null,
                            message: remoteCode.consoleDefaultCounter.toString()
                        });
                    } else {
                        remoteCode.consoleCounters[name] = 0;
                        remoteCode.onConsoleFunc("count", {
                            name: String(name),
                            message: remoteCode.consoleCounters[name].toString()
                        });
                    }
                };
                RemoteCode.prototype.endGroup = function () {
                    remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.internalMessage, {
                        key: Common.ObjectView.TreeViewUtils.ConsoleInternalMessage.endGroup
                    });
                };
                RemoteCode.prototype.startGroup = function (groupName, isCollapsed) {
                    groupName = groupName ? String(groupName) : "";
                    var groupType = isCollapsed ? Common.ObjectView.TreeViewUtils.ConsoleInternalMessage.startGroupCollapsed : Common.ObjectView.TreeViewUtils.ConsoleInternalMessage.startGroup;
                    remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.internalMessage, {
                        key: groupType,
                        name: groupName
                    });
                };
                RemoteCode.prototype.consoleSelectNotInitialized = function () {
                    remoteCode.onConsoleFunc(Common.ObjectView.TreeViewUtils.ConsoleNotifyType.error, {
                        localizeId: "ConsoleSelectNotInitializedError"
                    });
                };
                RemoteCode.prototype.reset = function () {
                    remoteCode.resultMap = {
                    };
                    htmlTreeHelpers.reset();
                };
                RemoteCode.prototype.performBreakmodeIntellisense = function (id, expression, windowContext, searchObject, locals) {
                    if(typeof id !== "string" || typeof expression !== "string") {
                        return;
                    }
                    var sanitizedLocals = Array.prototype.map.call(locals, function (value, index, array) {
                        return "" + value;
                    });
                    var parts = id.split(":");
                    if(parts.length === 3) {
                        var funcName = parts[0];
                        var inputId = parseInt(parts[1], 10);
                        var uid = parts[2];
                        var results = remoteCode.getIntellisenseItemsForExpression(expression, windowContext, searchObject, sanitizedLocals);
                        remoteHelpers.postObject({
                            uid: uid,
                            args: [
                                results
                            ]
                        });
                    }
                };
                RemoteCode.prototype.getIntellisenseItemsForExpression = function (expression, windowContext, searchObject, locals) {
                    var intellisenseSupported = (Common.RemoteHelpers.getDocumentMode() >= 9);
                    if(intellisenseSupported) {
                        var intellisenseRemoteHelper = new Common.Intellisense.IntellisenseRemoteHelpers(remoteCode);
                        var result;
                        if(windowContext) {
                            result = intellisenseRemoteHelper.getIntellisenseItemsForExpressionUsingWindowContext(expression, windowContext, searchObject, locals);
                        } else {
                            result = intellisenseRemoteHelper.getIntellisenseItemsForExpression(expression);
                        }
                        return result;
                    } else {
                        return {
                            choices: []
                        };
                    }
                };
                RemoteCode.prototype.initializePage = function () {
                    var defaultView = remoteCode.currentWindowContext = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                    try  {
                        browser.executeScript("(function () { })();" + Common.RemoteHelpers.getJMCScriptUrl("console"), defaultView);
                    } catch (e) {
                        return;
                    }
                    try  {
                        remoteCode.clearTargets();
                        remoteCode.initializeConsoles(defaultView);
                        var connectionInfo = {
                            docMode: Common.RemoteHelpers.getDocumentMode(),
                            contextInfo: defaultView.location.href
                        };
                        remoteHelpers.port.postMessage("Handshake:" + JSON.stringify(connectionInfo));
                        remoteCode.consoleCounters = {
                        };
                        remoteCode.consoleDefaultCounter = 0;
                    } catch (e) {
                    }
                };
                RemoteCode.prototype.defineInjectedConsoleObjFunction = function (injectedConsole, consoleObj, realWindow, functionName, func) {
                    consoleObj[functionName] = remoteHelpers.createSafeFunction(realWindow, func);
                    injectedConsole[functionName] = consoleObj[functionName];
                };
                RemoteCode.prototype.createNotifyMessageObject = function () {
                    var notifyMessage = {
                    };
                    notifyMessage.message = Common.ObjectView.TreeViewStringFormatter.formatConsoleMessage.apply(this, arguments);
                    notifyMessage.localizeId = notifyMessage.message;
                    if(arguments.length > 0) {
                        notifyMessage.viewableObject = remoteCode.createOutputObject(-1, arguments);
                    }
                    return notifyMessage;
                };
                RemoteCode.prototype.getTimeStamp = function () {
                    var timeStamp;
                    if(mainBrowser.document.parentWindow.performance.now) {
                        timeStamp = mainBrowser.document.parentWindow.performance.now();
                    } else {
                        timeStamp = new Date();
                    }
                    return timeStamp;
                };
                return RemoteCode;
            })();
            Console.RemoteCode = RemoteCode;            
            var StyleUtilities = (function () {
                function StyleUtilities() {
                    this.styleMapping = {
                    };
                }
                StyleUtilities.prototype.getPropertyEnabled = function (curStyle, property) {
                    if(curStyle.msGetPropertyEnabled) {
                        return curStyle.msGetPropertyEnabled(property);
                    }
                    if(remoteHelpers.isDiagnosticsOM()) {
                        return true;
                    }
                    return styleHelper.GetPropertyEnabled(curStyle, property);
                };
                StyleUtilities.prototype.setPropertyEnabled = function (curStyle, propertyName, enable) {
                    if(curStyle.msPutPropertyEnabled) {
                        curStyle.msPutPropertyEnabled(propertyName, enable);
                    } else {
                        if(remoteHelpers.isDiagnosticsOM()) {
                        } else {
                            styleHelper.SetPropertyEnabled(curStyle, propertyName, enable);
                        }
                    }
                };
                return StyleUtilities;
            })();
            Console.StyleUtilities = StyleUtilities;            
            var MessageHandlers = (function () {
                function MessageHandlers() { }
                MessageHandlers.prototype.clearConsoleData = function () {
                    remoteCode.reset();
                };
                MessageHandlers.prototype.registerConsoleCallbacks = function (outputCallback, notifyCallback, clearCallback) {
                    remoteCode.outputCallback = outputCallback;
                    remoteCode.notifyCallback = notifyCallback;
                    remoteCode.clearCallback = clearCallback;
                    for(var i = 0; i < remoteCode.consoleNotificationQueue.length; i++) {
                        var notification = remoteCode.consoleNotificationQueue[i];
                        remoteCode.onConsoleFunc(notification.functionId, notification.data);
                    }
                };
                MessageHandlers.prototype.switchTarget = function (targetId, targetType) {
                    if(targetType === "Frame") {
                        var frame = remoteCode._frames[targetId];
                        remoteCode.cd(frame);
                    } else if(targetType === "_top") {
                        remoteCode.cd();
                    }
                };
                MessageHandlers.prototype.processInput = function (inputId, input) {
                    if(!remoteCode.currentWindowContext) {
                        return;
                    }
                    try  {
                        mainBrowser.document.parentWindow.msWriteProfilerMark("ConsoleRemote:BeginConsoleInvoke");
                        var haveAccessToWindowContext = remoteCode.currentWindowContext.window;
                    } catch (ex) {
                        return;
                    }
                    var returnValue = remoteCode.callInvoker(remoteCode.currentWindowContext, input);
                    mainBrowser.document.parentWindow.msWriteProfilerMark("ConsoleRemote:EndConsoleInvoke");
                    return remoteCode.createConsoleResult(inputId, returnValue);
                };
                MessageHandlers.prototype.getObjectChildren = function (identifier) {
                    var delimiterIndex = identifier.indexOf(":");
                    if(delimiterIndex !== -1) {
                        var parts = [];
                        parts.push(identifier.substr(0, delimiterIndex));
                        parts.push(identifier.substr(delimiterIndex + 1));
                        var uid = parts[0].split("#");
                        var mappedResult = remoteCode.resultMap[uid[0]];
                        if(mappedResult) {
                            return remoteCode.createOutputObject(-1, mappedResult, parts[1], uid.length === 2);
                        }
                    }
                    return null;
                };
                MessageHandlers.prototype.getHtmlChildren = function (uid) {
                    var mappedNode = htmlTreeHelpers.mapping[uid];
                    if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                        return;
                    }
                    var htmlTypeName = remoteCode.getHtmlViewableTypeName(mappedNode.ele);
                    var showEmptyTextNodes = (htmlTypeName === "NodeList");
                    return htmlTreeHelpers.getChildrenForMappedNode(uid, showEmptyTextNodes);
                };
                MessageHandlers.prototype.getHtmlAttributes = function (uid) {
                    var mappedNode = htmlTreeHelpers.mapping[uid];
                    if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                        return;
                    }
                    var allAttributes = [];
                    var element = mappedNode.ele;
                    if(element.attributes) {
                        for(var i = 0; i < element.attributes.length; i++) {
                            allAttributes.push({
                                name: element.attributes[i].name,
                                value: element.attributes[i].value
                            });
                        }
                    }
                    return allAttributes;
                };
                MessageHandlers.prototype.getObjectItemAsHtml = function (identifier) {
                    var mappedItem = null;
                    var parts = identifier.split(":", 2);
                    if(parts.length === 2) {
                        var mappedParent = remoteCode.resultMap[parts[0]];
                        if(mappedParent) {
                            mappedItem = mappedParent[parts[1]];
                        }
                    } else if(parts.length === 1) {
                        mappedItem = remoteCode.resultMap[identifier];
                    }
                    if(mappedItem) {
                        return remoteCode.createOutputHtmlElement(-1, mappedItem, remoteCode.getHtmlViewableTypeName(mappedItem));
                    }
                    return null;
                };
                MessageHandlers.prototype.getHtmlItemAsObject = function (uid) {
                    var mappedNode = htmlTreeHelpers.mapping[uid];
                    if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                        return null;
                    }
                    return remoteCode.createOutputObject(-1, mappedNode.ele);
                };
                MessageHandlers.prototype.getIntellisenseItemsForExpression = function (expression) {
                    try  {
                        return remoteCode.getIntellisenseItemsForExpression(expression);
                    } catch (e) {
                        return {
                            choices: []
                        };
                    }
                };
                return MessageHandlers;
            })();
            Console.MessageHandlers = MessageHandlers;            
            var styleUtilities = new StyleUtilities();
        })(Tools.Console || (Tools.Console = {}));
        var Console = Tools.Console;
    })(F12.Tools || (F12.Tools = {}));
    var Tools = F12.Tools;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/console.csproj__1950422832/objr/x86/Console/remote.js.map

// SIG // Begin signature block
// SIG // MIIanwYJKoZIhvcNAQcCoIIakDCCGowCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFG/9DGdEGIj9
// SIG // rmnX4G1AdV54fxOloIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAAz5SeGow5KKoAAAAAAADMwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMDMyNzIw
// SIG // MDgyM1oXDTE0MDYyNzIwMDgyM1owgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpGNTI4LTM3NzctOEE3NjEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAMreyhkPH5ZWgl/YQjLUCG22ncDC7Xw4q1gzrWuB
// SIG // ULiIIQpdr5ctkFrHwy6yTNRjdFj938WJVNALzP2chBF5
// SIG // rKMhIm0z4K7eJUBFkk4NYwgrizfdTwdq3CrPEFqPV12d
// SIG // PfoXYwLGcD67Iu1bsfcyuuRxvHn/+MvpVz90e+byfXxX
// SIG // WC+s0g6o2YjZQB86IkHiCSYCoMzlJc6MZ4PfRviFTcPa
// SIG // Zh7Hc347tHYXpqWgoHRVqOVgGEFiOMdlRqsEFmZW6vmm
// SIG // y0LPXVRkL4H4zzgADxBr4YMujT5I7ElWSuyaafTLDxD7
// SIG // BzRKYmwBjW7HIITKXNFjmR6OXewPpRZIqmveIS8CAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBQAWBs+7cXxBpO+MT02
// SIG // tKwLXTLwgTAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAC/+OMA+rv
// SIG // fji5uXyfO1KDpPojONQDuGpZtergb4gD9G9RapU6dYXo
// SIG // HNwHxU6dG6jOJEcUJE81d7GcvCd7j11P/AaLl5f5KZv3
// SIG // QB1SgY52SAN+8psXt67ZWyKRYzsyXzX7xpE8zO8OmYA+
// SIG // BpE4E3oMTL4z27/trUHGfBskfBPcCvxLiiAFHQmJkTkH
// SIG // TiFO3mx8cLur8SCO+Jh4YNyLlM9lvpaQD6CchO1ctXxB
// SIG // oGEtvUNnZRoqgtSniln3MuOj58WNsiK7kijYsIxTj2hH
// SIG // R6HYAbDxYRXEF6Et4zpsT2+vPe7eKbBEy8OSZ7oAzg+O
// SIG // Ee/RAoIxSZSYnVFIeK0d1kC2MIIE7DCCA9SgAwIBAgIT
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
// SIG // L54/LlUWa8kTo/0xggSJMIIEhQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGiMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBR1ncRHJHrS
// SIG // ORb8XiY7zjBTMYoNFDBCBgorBgEEAYI3AgEMMTQwMqAY
// SIG // gBYAcgBlAG0AbwB0AGUAXwAyAC4AagBzoRaAFGh0dHA6
// SIG // Ly9taWNyb3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIB
// SIG // AI8KgugZyA5tW4faTNAE7OEVS/Fv0YY7uTmnkpE+ip2x
// SIG // xDLMKtyfFHk3zBXaAfODrs0zgqqoMzpiftcSzf6mPHY/
// SIG // u1hhoXECmIdn8Guixg9dP3ArbM9DVUbhlwyHEhgZkSTI
// SIG // 3No8808XwO57heen3EwSQ8RGonZL34E76+Qe7ocbITnz
// SIG // G0DIM285ivjcckrT99KB8kNxBGetX18//a7yVS1SFmzv
// SIG // 2NCe3rHdq8XLT+awpDjUhr6TiSAoaU2Y97KjodddSIXa
// SIG // QgWlQopSi4XhSmrL7kixxR+EQPNOOVnF4H3IKsIB6G9i
// SIG // 0mlUhv2f3IBwfIDaXDW50d6FdFBL3x509OihggIoMIIC
// SIG // JAYJKoZIhvcNAQkGMYICFTCCAhECAQEwgY4wdzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0
// SIG // IFRpbWUtU3RhbXAgUENBAhMzAAAAM+UnhqMOSiqAAAAA
// SIG // AAAzMAkGBSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJ
// SIG // KoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xNDA1MDEw
// SIG // NzUyMzlaMCMGCSqGSIb3DQEJBDEWBBRWPZGWwGaJBjH2
// SIG // LfhcMg+mB+DWRjANBgkqhkiG9w0BAQUFAASCAQAXYcCV
// SIG // w7BRon37NaZSZ48SEGpiQ+/jVV3kq3oqWxdoQ7GCk4wP
// SIG // +jxDax5h51YtXthctWGvnGiuJYHHCIgaS2kjVZ/Y1fXZ
// SIG // FSpJrRvoWhOjH53PoeTOnq0S3uVFq8oViuLzYk81Xdku
// SIG // bIPujR+KxBbE3Z/pV3iVhWnfehZLFmUUUA+6Q9cnPSCs
// SIG // +EPfHEnKXmoYyI3GTfjizipkXQ0C9qxpmkpTswzG7gN2
// SIG // cpZ5vTNOFF19NhiONEhlNatnrDar8CR/lnIT2Rcj5Rfv
// SIG // Ge/GcQcGiRPd0uML44vredTxpo7wIEEzRYlZ4hx3LdHT
// SIG // cceuR+9B3I/uQ6dMh/50bpNERQca
// SIG // End signature block
