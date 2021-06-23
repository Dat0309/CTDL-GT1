var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var __BROWSERTOOLS_FileReaderReadyState;
    (function (__BROWSERTOOLS_FileReaderReadyState) {
        __BROWSERTOOLS_FileReaderReadyState[__BROWSERTOOLS_FileReaderReadyState["Empty"] = 0] = "Empty";
        __BROWSERTOOLS_FileReaderReadyState[__BROWSERTOOLS_FileReaderReadyState["Loading"] = 1] = "Loading";
        __BROWSERTOOLS_FileReaderReadyState[__BROWSERTOOLS_FileReaderReadyState["Done"] = 2] = "Done";
    })(__BROWSERTOOLS_FileReaderReadyState || (__BROWSERTOOLS_FileReaderReadyState = {}));

    var __BROWSERTOOLS_RemoteCode = (function () {
        function __BROWSERTOOLS_RemoteCode() {
            expectedWindowProperty = "__BROWSERTOOLS_MEMORYANALYZER_ADDED";
        }
        __BROWSERTOOLS_RemoteCode.prototype.initialize = function () {
            browser.addEventListener("beforeScriptExecute", this.onBeforeScriptExecute.bind(this));

            this.consoleNotificationQueue = [];
            var messageHandlers = [];

            messageHandlers["takeSnapshot"] = this.takeSnapshot.bind(this);
            messageHandlers["registerConsoleCallbacks"] = this.registerConsoleCallbacks.bind(this);

            this._remoteHelper = new Common.PerfTools.__BROWSERTOOLS_RemoteHelper(messageHandlers);

            this._remoteHelper.initialize("MemoryAnalyzerPort", this.initializePage.bind(this), this.onDetach.bind(this));
        };

        __BROWSERTOOLS_RemoteCode.appendSnapshotPart = function (record, snapshot) {
            if (!record) {
                return;
            }

            var part = JSON.parse(record);

            if (!snapshot.version && part.version) {
                snapshot.version = part.version;
            }

            if (part.data) {
                if (!snapshot.data) {
                    snapshot.data = [];
                }

                for (var i = 0; i < part.data.length; ++i) {
                    snapshot.data.push(part.data[i]);
                }
            }

            if (!snapshot.privateBytes && part.privateBytes) {
                snapshot.privateBytes = part.privateBytes;
            }

            if (!snapshot.pointerSize && part.pointerSize) {
                snapshot.pointerSize = part.pointerSize;
            }

            if (!snapshot.base64Image && part.base64Image) {
                snapshot.base64Image = part.base64Image;
            }
        };

        __BROWSERTOOLS_RemoteCode.readAndChunk = function (blob, chunkSize, callback) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
                if (reader.readyState === 2 /* Done */) {
                    try  {
                        if (!reader.result) {
                            throw new Error();
                        }

                        var partCount = Math.ceil(blob.size / chunkSize);

                        for (var partId = 0; partId < partCount; ++partId) {
                            var start = partId * chunkSize;
                            var end = Math.min(start + chunkSize, blob.size);
                            var data = reader.result.substring(start, end);
                            var response = { partId: partId, data: data };

                            callback(response);
                        }
                    } catch (ex) {
                        var errorResponse = { partId: -1, data: ex.message };

                        callback(errorResponse);
                    } finally {
                        blob.msClose();
                        resources.memory.triggerGarbageCollection();
                    }
                }
            };

            reader.readAsText(blob);
        };

        __BROWSERTOOLS_RemoteCode.prototype.addRemotePageFunctions = function (realWindow) {
            realWindow[expectedWindowProperty] = browser.createSafeFunction(realWindow, function () {
            });
        };

        __BROWSERTOOLS_RemoteCode.prototype.initializeConsole = function (realWindow) {
            var _this = this;
            if (realWindow.Console && realWindow.Console.prototype) {
                if (!realWindow.Console.prototype.takeHeapSnapshot) {
                    realWindow.Console.prototype.takeHeapSnapshot = browser.createSafeFunction(realWindow, function (message) {
                        _this.onConsoleExecute("takeHeapSnapshot", message);
                    });
                }
            }

            var __BROWSERTOOLS_detachHandler = function () {
                _this.onDetach();
                toolUI.removeEventListener("detach", __BROWSERTOOLS_detachHandler);
            };

            var __BROWSERTOOLS_unloadHandlerSafe = browser.createSafeFunction(realWindow, function () {
                toolUI.removeEventListener("detach", __BROWSERTOOLS_detachHandler);
            });

            if (realWindow.addEventListener) {
                realWindow.addEventListener("unload", __BROWSERTOOLS_unloadHandlerSafe);
            } else {
                realWindow.attachEvent("onunload", __BROWSERTOOLS_unloadHandlerSafe);
            }

            toolUI.addEventListener("detach", __BROWSERTOOLS_detachHandler);
        };

        __BROWSERTOOLS_RemoteCode.prototype.initializeConsoles = function (windowToAttach) {
            var realWindow = null;

            try  {
                realWindow = windowToAttach.document.parentWindow;
            } catch (ex) {
                return;
            }

            this.initializeConsole(realWindow);

            if (realWindow.frames) {
                for (var i = 0; i < realWindow.frames.length; i++) {
                    var frame = realWindow.frames[i];

                    if (frame) {
                        var iframe = dom.getCrossSiteWindow(realWindow, frame);

                        if (iframe) {
                            this.initializeConsoles(iframe);
                        }
                    }
                }
            }
        };

        __BROWSERTOOLS_RemoteCode.prototype.initializePage = function () {
            try  {
                if (browser.document.documentMode >= 10) {
                    this.addRemotePageFunctions(browser.document.parentWindow);
                    this.initializeConsoles(browser);
                }

                var connectionInfo = { docMode: browser.document.documentMode, contextInfo: browser.document.parentWindow.location.href };
                this._remoteHelper.port.postMessage("Handshake:" + JSON.stringify(connectionInfo));

                this._remoteHelper.initializeDocumentTries = 0;
            } catch (ex) {
                this.onDocumentNotReady();
            }
        };

        __BROWSERTOOLS_RemoteCode.prototype.onBeforeScriptExecute = function (dispatchWindow) {
            if (dispatchWindow && dispatchWindow.browserOrWindow) {
                dispatchWindow = dispatchWindow.browserOrWindow;
            }

            var realWindow = null;

            try  {
                realWindow = dispatchWindow.document.parentWindow;
            } catch (ex) {
                return;
            }

            if (realWindow === browser.document.parentWindow && this._remoteHelper.port) {
                this._remoteHelper.postAllMessages();
                this.initializePage();
            }
        };

        __BROWSERTOOLS_RemoteCode.prototype.onConsoleExecute = function (functionId, data) {
            if (!this.notifyCallback) {
                this.consoleNotificationQueue.push({ notifyType: functionId, message: data });
            } else {
                this.notifyCallback({ notifyType: functionId, message: data });
            }
        };

        __BROWSERTOOLS_RemoteCode.prototype.onDetach = function () {
            this._remoteHelper.initializeDocumentTries = 0;

            try  {
                var realWindow = browser.document.parentWindow;

                if (realWindow[expectedWindowProperty]) {
                    delete realWindow[expectedWindowProperty];
                }
            } catch (ex) {
            }
        };

        __BROWSERTOOLS_RemoteCode.prototype.onDocumentNotReady = function () {
            if (this._remoteHelper.initializeDocumentTries < this._remoteHelper.initializeDocumentMaxTries) {
                ++this._remoteHelper.initializeDocumentTries;
                this._remoteHelper.port.postMessage("DocumentNotYetReady");
            } else {
                this._remoteHelper.errorHandler.handleError("Document timed out", "Remote.js", 0);
            }
        };

        __BROWSERTOOLS_RemoteCode.prototype.registerConsoleCallbacks = function (notifyCallback) {
            this.notifyCallback = notifyCallback;

            for (var i = 0; i < this.consoleNotificationQueue.length; i++) {
                var notification = this.consoleNotificationQueue[i];
                this.onConsoleExecute(notification.notifyType, notification.message);
            }
        };

        __BROWSERTOOLS_RemoteCode.prototype.takeSnapshot = function (chunkSize, targetWidth, targetHeight, keepAspectRatio, callback) {
            try  {
                var snapshot = resources.memory.getMemoryProfile();
                var screenshot;

                try  {
                    screenshot = browser.takeVisualSnapshot(targetWidth, targetHeight, keepAspectRatio);
                } catch (e) {
                }

                var pointerSize = resources.memory.processPointerSize;
                var privateBytes = resources.memory.processPrivateBytes.toString();
                var snapshotPartCount = Math.ceil(snapshot.size / chunkSize);
                var screenshotPartCount = screenshot ? Math.ceil(screenshot.size / chunkSize) : 0;
                var totalPartCount = snapshotPartCount + screenshotPartCount + 1;
                var newline = "\r\n";

                __BROWSERTOOLS_RemoteCode.readAndChunk(snapshot, chunkSize, callback);

                if (screenshot) {
                    var screenshotPartStartId = snapshotPartCount;
                    var screenshotReader = new FileReader();

                    screenshotReader.onloadend = function (e) {
                        if (screenshotReader.readyState === 2 /* Done */) {
                            try  {
                                var object = { base64Image: screenshotReader.result };

                                var data = newline + JSON.stringify(object) + newline;
                                var response;

                                for (var chunkId = 0; chunkId < screenshotPartCount; ++chunkId) {
                                    var start = chunkId * chunkSize;
                                    var end;

                                    if (chunkId === screenshotPartCount - 1) {
                                        end = data.length;
                                    } else {
                                        end = (chunkId + 1) * chunkSize;
                                    }

                                    response = { partId: chunkId + screenshotPartStartId, data: data.substring(start, end) };
                                    callback(response);
                                }
                            } catch (ex) {
                                var errorResponse = { partId: -1, data: ex.message };

                                callback(errorResponse);
                            } finally {
                                screenshot.msClose();
                            }
                        }
                    };

                    screenshotReader.readAsText(screenshot);
                }

                var clientName = browser.document.parentWindow.navigator.appName;
                var clientVersion = browser.document.parentWindow.navigator.appVersion;
                var docMode = browser.documentMode / 10000;

                var object = { pointerSize: pointerSize, privateBytes: privateBytes, clientName: clientName, clientVersion: clientVersion, docMode: docMode };
                var data = JSON.stringify(object) + newline;

                if (!screenshot) {
                    data = newline + data;
                }

                var response = { partId: totalPartCount - 1, data: data };

                callback(response);

                return totalPartCount;
            } catch (ex) {
                var errorResponse = { partId: -1, data: ex.message };

                callback(errorResponse);
            }
        };
        return __BROWSERTOOLS_RemoteCode;
    })();
    MemoryAnalyzer.__BROWSERTOOLS_RemoteCode = __BROWSERTOOLS_RemoteCode;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));

var remoteCode = new MemoryAnalyzer.__BROWSERTOOLS_RemoteCode();

remoteCode.initialize();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/Remote.js.map

// SIG // Begin signature block
// SIG // MIIalwYJKoZIhvcNAQcCoIIaiDCCGoQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFJ1f5olrHxlQ
// SIG // d5trOJwhiZFWka6FoIIVejCCBLswggOjoAMCAQICEzMA
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
// SIG // E6P9MYIEiTCCBIUCAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBojAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUeQC1faRzV+BgYpIjYzXU
// SIG // bPecuz0wQgYKKwYBBAGCNwIBDDE0MDKgGIAWAFIAZQBt
// SIG // AG8AdABlAF8ANgAuAGoAc6EWgBRodHRwOi8vbWljcm9z
// SIG // b2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQBgiTFF5PpA
// SIG // HBTtz25WnLrhP84EoDwn6b7RsEOM/4VmaluNBvIy6kma
// SIG // DldOTyZY88/hxTAD97mQ91n+heGKybcMYNSYv6eVsjcR
// SIG // FjfHeYSqarALLu4uJyI+xKt8hNEKNosvVAon/6jRsSOc
// SIG // N97c1fXX419cACWEkfGpmQdCGPEXPm8GbkMcD/yeLeJG
// SIG // haPIfDLboQOTLM16dlKN0D9Ic1Hq5WKGuDYdZqT60r2k
// SIG // BcsR6XEfwURnqwDkweyUwkyGug0JGe5QlriHmv34BGrR
// SIG // pGCD0MJAK9j1oL4YobV1ecXNvm33H5OKwUauSW/2Wk4G
// SIG // CHzdiSmk0hbrvjIKECPUlJmxoYICKDCCAiQGCSqGSIb3
// SIG // DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQQITMwAAAFrtL/TkIJk/OgAAAAAAWjAJBgUr
// SIG // DgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEH
// SIG // ATAcBgkqhkiG9w0BCQUxDxcNMTQxMTAxMDcyNjExWjAj
// SIG // BgkqhkiG9w0BCQQxFgQUn5T2h7QA+8vH9+bZVyPRQBYS
// SIG // HWAwDQYJKoZIhvcNAQEFBQAEggEAYm8F7EZYSjMX+TAc
// SIG // sAppv+1k9iOWaGqbRg5u+d1Msgsr6R4bkqhDHkKoF8OW
// SIG // bfADnaRjpqTTAA0xyZgdcrGxMmvmzevJJ1gTAmNZkcgq
// SIG // bI9wSJt/POhIBhRqGiKXcrR9/hE7+YdGBpq1aR+fNP/0
// SIG // DOsBkrkYPMdi0euTivz0S8/caZ2RoXX6u8nyypIfkm+3
// SIG // 7MJMO39qmZO1kf8Mca5p7ii8oo4TNntpcCyNipC27jSZ
// SIG // BkghGW94aYwR3BTj4pAkDttgJOzn5wQK4HEm/8q9aD80
// SIG // lkK/NadRt/GCPkc9tX8AAaCSdEjXj0cSEyhlxMkqdQPQ
// SIG // MWcKI7kp435a1tzVDg==
// SIG // End signature block
