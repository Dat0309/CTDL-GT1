var expectedWindowProperty;

var Common;
(function (Common) {
    (function (PerfTools) {
        "use strict";

        var __BROWSERTOOLS_RemoteHelper = (function () {
            function __BROWSERTOOLS_RemoteHelper(messageHandlers) {
                this._messageHandlers = [];
                this._pendingMessages = [];
                this._pendingMessagesMap = {};
                this._portId = 0;
                this._uid = 0;
                this.childrenElementLimit = 200;
                this.initializeDocumentMaxTries = 15;
                this.initializeDocumentTries = 0;
                this.isEvalModified = false;
                this.isExecScriptModified = false;
                this.onDetachCallback = null;
                this.port = null;
                this.portReady = false;
                this._messageHandlers = messageHandlers;
            }
            Object.defineProperty(__BROWSERTOOLS_RemoteHelper.prototype, "errorHandler", {
                get: function () {
                    return this._errorHandler;
                },
                enumerable: true,
                configurable: true
            });

            __BROWSERTOOLS_RemoteHelper.prototype.getUid = function () {
                return "uid" + (this._uid++).toString(36);
            };

            __BROWSERTOOLS_RemoteHelper.prototype.initialize = function (portName, handshakeCallback, onDetachCallback) {
                this._errorHandler = new __BROWSERTOOLS_ErrorHandler(this);
                this.onDetachCallback = onDetachCallback;

                browser.addEventListener("documentComplete", this.onDocumentComplete.bind(this));
                toolUI.addEventListener("detach", this.onDetach.bind(this));
                toolUI.addEventListener("breakpointhit", this.onBreak.bind(this));

                ++this._portId;
                this.port = toolUI.createPort(portName + this._portId);

                if (this.port) {
                    this.port.addEventListener("message", this.processMessages.bind(this));
                    toolUI.connect(this.port);
                    handshakeCallback();
                }

                this._handshakeCallback = handshakeCallback;
            };

            __BROWSERTOOLS_RemoteHelper.prototype.initializeScriptEngines = function (window) {
                if (window) {
                    if (window.document && window.document.scripts && window.document.scripts.length === 0) {
                        browser.executeScript("void(0);" + __BROWSERTOOLS_RemoteHelper.JMCScriptUrl, window);
                    }

                    if (window.frames) {
                        for (var i = 0; i < window.frames.length; i++) {
                            var frame = window.frames[i];

                            if (frame) {
                                var iframe = dom.getCrossSiteWindow(window, frame);
                                this.initializeScriptEngines(iframe);
                            }
                        }
                    }
                }
            };

            __BROWSERTOOLS_RemoteHelper.prototype.postAllMessages = function () {
                for (var key in this._pendingMessagesMap) {
                    this._pendingMessages.push(this._pendingMessagesMap[key]);
                }

                if (this._pendingMessages.length > 0) {
                    var messageString = JSON.stringify(this._pendingMessages);

                    this._pendingMessages = [];
                    this._pendingMessagesMap = {};

                    try  {
                        this.port.postMessage(messageString);
                    } catch (ex) {
                        return;
                    }
                }
            };

            __BROWSERTOOLS_RemoteHelper.prototype.processMessages = function (args) {
                var _this = this;
                if (args.data === "InitializeDocument") {
                    this._handshakeCallback();
                    return;
                }

                var createVSPostFunction = function (uid) {
                    return function (arg, hash) {
                        _this.postObject({
                            uid: uid,
                            args: [arg]
                        }, hash);
                    };
                };

                var payload = JSON.parse(args.data);

                for (var i = 0; i < payload.length; ++i) {
                    var obj = payload[i];

                    if (this._messageHandlers[obj.command]) {
                        var messageHandlerArgs = obj.args;

                        for (var j = 0; j < messageHandlerArgs.length; ++j) {
                            if (messageHandlerArgs[j] && messageHandlerArgs[j].type === "callback") {
                                messageHandlerArgs[j] = createVSPostFunction(messageHandlerArgs[j].uid);
                            }
                        }

                        var returnValue = this._messageHandlers[obj.command].apply(this, messageHandlerArgs);

                        this.postObject({
                            uid: obj.uid,
                            args: (returnValue !== undefined ? [returnValue] : undefined)
                        });
                    }
                }
            };

            __BROWSERTOOLS_RemoteHelper.prototype.onBreak = function () {
                this.postAllMessages();
            };

            __BROWSERTOOLS_RemoteHelper.prototype.onDetach = function () {
                this._uid = 0;
                this._pendingMessages = [];
                this._pendingMessagesMap = {};
                this.isEvalModified = false;
                this.isExecScriptModified = false;

                if (this.onDetachCallback) {
                    this.onDetachCallback();
                }
            };

            __BROWSERTOOLS_RemoteHelper.prototype.onDocumentComplete = function (dispatchWindow) {
                if (expectedWindowProperty) {
                    var doc = null;
                    if (dispatchWindow) {
                        try  {
                            if (dispatchWindow.browserOrWindow) {
                                dispatchWindow = dispatchWindow.browserOrWindow;
                            }

                            if (dispatchWindow.document) {
                                doc = dispatchWindow.document;
                            } else if (dispatchWindow.Document) {
                                doc = dispatchWindow.Document;
                            }

                            if (!doc || doc.parentWindow[expectedWindowProperty]) {
                                return;
                            }

                            browser.executeScript("void(0);" + __BROWSERTOOLS_RemoteHelper.JMCScriptUrl, doc.parentWindow);
                        } catch (ex) {
                        }
                    }
                }
            };

            __BROWSERTOOLS_RemoteHelper.prototype.postObject = function (obj, hash, postImmediately) {
                if (typeof postImmediately === "undefined") { postImmediately = true; }
                if (hash) {
                    this._pendingMessagesMap[hash] = obj;
                } else {
                    this._pendingMessages.push(obj);
                }

                this.postAllMessages();
            };
            __BROWSERTOOLS_RemoteHelper.JMCScriptUrl = "\\r\\n//# sourceURL=browsertools://browsertools.performance.js";
            return __BROWSERTOOLS_RemoteHelper;
        })();
        PerfTools.__BROWSERTOOLS_RemoteHelper = __BROWSERTOOLS_RemoteHelper;

        var __BROWSERTOOLS_ErrorHandler = (function () {
            function __BROWSERTOOLS_ErrorHandler(remoteHelper) {
                this._remoteHelper = remoteHelper;

                this.initializeListeners();
            }
            __BROWSERTOOLS_ErrorHandler.prototype.handleError = function (message, file, line, column) {
                this.onScriptError({ message: message, file: file, line: line, column: column });
            };

            __BROWSERTOOLS_ErrorHandler.getArgumentString = function (argument) {
                var type = (typeof argument);

                if (argument === undefined) {
                    type = "undefined";
                } else {
                    if (type === "object") {
                        if (argument) {
                            if (typeof argument.length === "number" && typeof argument.propertyIsEnumerable === "function" && !(argument.propertyIsEnumerable("length")) && typeof argument.splice === "function") {
                                type = "array";
                            }

                            try  {
                                if (argument.constructor === Array) {
                                    type = "array";
                                } else if (argument.constructor === Date) {
                                    type = "date";
                                } else if (argument.constructor === RegExp) {
                                    type = "regex";
                                }
                            } catch (ex) {
                            }
                        } else {
                            type = "null";
                        }

                        type = "object";
                    }
                }

                switch (type) {
                    case "boolean":
                        return argument;

                    case "date":
                        return "[date] " + argument;

                    case "function":
                        return "" + argument;

                    case "null":
                        return "null";

                    case "number":
                        return argument;

                    case "regex":
                        return "[regex] " + argument;

                    case "string":
                        return "\"" + argument + "\"";

                    case "undefined":
                        return "undefined";

                    case "htmlElement":
                    case "array":
                    case "object":
                        return JSON.stringify(argument);
                }
            };

            __BROWSERTOOLS_ErrorHandler.prototype.onScriptError = function (errorDetails) {
                if (this._remoteHelper && this._remoteHelper.port) {
                    var info = [];

                    try  {
                        info.push("BreakFlags: " + toolUI.getBreakFlags());
                        info.push("IsEvalModified: " + this._remoteHelper.isEvalModified);
                        info.push("IsExecScriptModified: " + this._remoteHelper.isExecScriptModified);
                        info.push("Url: " + browser.document.parentWindow.location.href);
                    } catch (ex) {
                    }

                    errorDetails.additionalInfo = info.join("\r\n\r\n");
                    var messageString = JSON.stringify([{ uid: "scriptError", args: [errorDetails] }]);

                    try  {
                        this._remoteHelper.port.postMessage(messageString);
                    } catch (ex) {
                    }
                }
            };

            __BROWSERTOOLS_ErrorHandler.prototype.initializeListeners = function () {
                var _this = this;
                this._onErrorHandler = this.onScriptError.bind(this);

                toolUI.addEventListener("scripterror", this._onErrorHandler);

                toolUI.addEventListener("detach", function () {
                    toolUI.removeEventListener("scripterror", _this._onErrorHandler);
                });

                if (browser && browser.document && browser.document.parentWindow) {
                    this._remoteHelper.initializeScriptEngines(browser.document.parentWindow);
                }
            };
            return __BROWSERTOOLS_ErrorHandler;
        })();
        PerfTools.__BROWSERTOOLS_ErrorHandler = __BROWSERTOOLS_ErrorHandler;
    })(Common.PerfTools || (Common.PerfTools = {}));
    var PerfTools = Common.PerfTools;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/PerfRemoteHelpers.js.map

// SIG // Begin signature block
// SIG // MIIaqQYJKoZIhvcNAQcCoIIamjCCGpYCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFDK+lmRPBhJi
// SIG // r9drtmZAJxSxX6IRoIIVejCCBLswggOjoAMCAQICEzMA
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
// SIG // E6P9MYIEmzCCBJcCAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBtDAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUjH548qH5V6OFRT54BGTL
// SIG // ppP/kDYwVAYKKwYBBAGCNwIBDDFGMESgKoAoAFAAZQBy
// SIG // AGYAUgBlAG0AbwB0AGUASABlAGwAcABlAHIAcwAuAGoA
// SIG // c6EWgBRodHRwOi8vbWljcm9zb2Z0LmNvbTANBgkqhkiG
// SIG // 9w0BAQEFAASCAQARszYT3pWozSjzM5iXUl/VGCCSx5u9
// SIG // /oDLp/r/BuOPcNU4DDa85hN+ZOwXuR0ojbF7uK6CsBZx
// SIG // J4v4qx88wQ1cbemYRShIJjgGDF2JDFFeom/3N0yJ/5ry
// SIG // L0kIaGP6l8CPEOqFr7C96GgFGNgTpV2d8dkuusbXV+yx
// SIG // rWP7/XIl2hMvO+kZ4bTSpTX6MB8quCPOM8/X5pOaUwO9
// SIG // ifymRMQpIYtUN7XhomnNvMqtltxcY3GoiQyzJZfjHHk+
// SIG // 4V22elrm5uIB9mSr/GTC7OlGRwDG9ty8yxjeqjvJrypE
// SIG // 3/wjl7d2jZzkHB8jPW9NzkT+veRrpcWn3nqKWjyVWcuV
// SIG // sj+hoYICKDCCAiQGCSqGSIb3DQEJBjGCAhUwggIRAgEB
// SIG // MIGOMHcxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xITAfBgNVBAMT
// SIG // GE1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQQITMwAAAFrt
// SIG // L/TkIJk/OgAAAAAAWjAJBgUrDgMCGgUAoF0wGAYJKoZI
// SIG // hvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUx
// SIG // DxcNMTQxMTAxMDcyNTQ4WjAjBgkqhkiG9w0BCQQxFgQU
// SIG // Ra8u+/J7ZERgnx4N305YAnFL4uswDQYJKoZIhvcNAQEF
// SIG // BQAEggEApA1yKJj1D9Sge+bRsUcty0dtpKRq1AccPbWh
// SIG // fa0ttyF8AtLHPSM30GALHxMQJyChT06kVkXwP6lj2oE+
// SIG // DF/cuY4f2zkZhpmYqZP5IyPnxFvdOX+6B/mPYe2gnOHk
// SIG // +p7zIm6JIpGKNj2O0GqKFmqDKeOTEHkhHUylFVZsPV0o
// SIG // /f9IuU4zA9VOlhFZ/ccwSr+8AaOVJ5pRgSW4pB32ANhe
// SIG // cIkIAvPt2H7eysVdBZzVgP8pfk+Rx1TKXmc4bH4fNmef
// SIG // PuofDmYOk6gkn9q6sBUfraPMMXFaBtmIlTPXRBBI2fnJ
// SIG // fN1vsz33m+vdspWWtoa3IjKuBVyPOkIPJGQwJUnSeQ==
// SIG // End signature block
