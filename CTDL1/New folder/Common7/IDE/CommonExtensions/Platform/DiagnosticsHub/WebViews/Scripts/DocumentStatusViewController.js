/// <reference path="..\..\TempTypeScriptDeclarations\plugin.d.ts" />
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            // -----------------------------------------------------------------------------
            // Copyright (c) Microsoft Corporation.  All rights reserved.
            // -----------------------------------------------------------------------------
            (function (Controllers) {
                "use strict";

                var ViewController = (function () {
                    function ViewController() {
                        // We use 0.3 for DataWarehouse initialization and 0.7 for analyzers initialization
                        this._initialProgressConst = 0.3;
                        this._maxProgressConst = 1.0;
                        var progressMain = document.querySelector(".progress-main");
                        this._progressControl = progressMain.querySelector(".progress-bar");
                        this._progressText = progressMain.querySelector(".progress-text");
                        this._progressText.innerText = Plugin.Resources.getString("/DiagnosticsHubResources/DocumentStatusView_ProcessingData");
                        this._toolsContainer = document.querySelector(".progress-tools");
                        this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                        this._document = Microsoft.VisualStudio.DiagnosticsHub.getCurrentDocument();
                        this._javaScriptJmcHelper = new Controllers.JavaScriptJmc();
                        this._solutionService = new Controllers.SolutionService();
                        this._analyzersProgressScale = this._maxProgressConst - this._initialProgressConst;

                        this._marshaler = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.DocumentStatusViewMarshaler", {}, true);

                        var that = this;
                        this._document.addOnClosingHandler(function (eventArgs) {
                            that.onClosingHandler(eventArgs);
                        });
                    }
                    ViewController.prototype.initialize = function () {
                        // Progress bars for tools
                        var progressTools = [];

                        // Analyzers which should be called on first initialization
                        var analyzerIdsToInitialize = [];

                        // Load datawarehouse, analyzers, populate with data source, and initialize JMC.
                        Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse().then(this.processDataWarehouseConfiguration.bind(this, analyzerIdsToInitialize)).then(this.getToolInformation.bind(this)).then(this.processToolInformation.bind(this, progressTools, analyzerIdsToInitialize)).then(this.beginDataWarehouseInitialization.bind(this)).then(this.addAllExecutableCodeOutputsToJmc.bind(this), this.onError.bind(this), this.onProgress.bind(this, progressTools)).then(this.addJavaScriptToJmc.bind(this)).then(this.initializeDataWarehouseComplete.bind(this)).done(this.initializeAnalyzers.bind(this, analyzerIdsToInitialize, progressTools));
                    };

                    ViewController.prototype.processDataWarehouseConfiguration = function (analyzerIdsToInitialize, dw) {
                        this._dataWarehouse = dw;

                        // Find all analyzers which should be preloaded
                        var configuration = this._dataWarehouse.getConfiguration();
                        if (configuration.analyzers) {
                            for (var i = 0; i < configuration.analyzers.length; i++) {
                                var analyzer = configuration.analyzers[i];
                                if (analyzer.initialize) {
                                    analyzerIdsToInitialize.push(analyzer.clsid);
                                }
                            }
                        }

                        return Plugin.Promise.wrap(null);
                    };

                    ViewController.prototype.getToolInformation = function () {
                        // Get information about all tools in current document
                        return this._document.getTools();
                    };

                    ViewController.prototype.processToolInformation = function (progressTools, analyzerIdsToInitialize, tools) {
                        // Sort tools by name
                        tools.sort(function (a, b) {
                            return a.name.toLocaleUpperCase().localeCompare(b.name.toLocaleUpperCase());
                        });

                        var ulElement = document.createElement("ul");
                        this._toolsContainer.appendChild(ulElement);

                        for (var i = 0; i < tools.length; i++) {
                            var currTool = tools[i];
                            var requireInitialization = analyzerIdsToInitialize.some(function (analyzerId) {
                                return this.toolContainsAnalyzer(currTool, analyzerId);
                            }, this);

                            var liElement = document.createElement("li");
                            liElement.className = "progress-line";

                            ulElement.appendChild(liElement);

                            var spanElement = document.createElement("span");
                            spanElement.className = "progress-text";
                            spanElement.innerText = currTool.name;

                            liElement.appendChild(spanElement);

                            var progressBarElement = document.createElement("progress");
                            progressBarElement.className = "progress-bar";
                            progressBarElement.max = this._maxProgressConst;
                            progressBarElement.value = 0.0;

                            liElement.appendChild(progressBarElement);

                            progressTools.push({
                                tool: currTool,
                                progressBar: progressBarElement,
                                span: spanElement,
                                requireInitialization: requireInitialization
                            });
                        }

                        return Plugin.Promise.wrap(null);
                    };

                    ViewController.prototype.beginDataWarehouseInitialization = function () {
                        this._logger.debug("Requesting data warehouse initialization");
                        return this._dataWarehouse.beginInitialization();
                    };

                    ViewController.prototype.initializeDataWarehouseComplete = function () {
                        this._logger.debug("Indicating data warehouse initialization complete");
                        return this._dataWarehouse.endInitialization();
                    };

                    ViewController.prototype.initializeAnalyzers = function (analyzerIdsToInitialize, progressTools) {
                        var _this = this;
                        var inProgress = analyzerIdsToInitialize.length;
                        var errors = [];

                        var verifyProgress = function () {
                            // All analyzers are done
                            if (inProgress === 0) {
                                if (errors.length === 0) {
                                    _this._logger.debug("Got DataWarehouse. Analyzing finished.");
                                    _this._marshaler._call("analyzingFinished");
                                } else {
                                    _this._logger.error(JSON.stringify(errors[0]));
                                    _this._marshaler._call("analyzingFailed");
                                }
                            }
                        };

                        if (inProgress > 0) {
                            var updateProgress = function (clsid, progress) {
                                for (var i = 0; i < progressTools.length; i++) {
                                    if (progressTools[i].requireInitialization) {
                                        if (_this.toolContainsAnalyzer(progressTools[i].tool, clsid)) {
                                            if (progress.finished) {
                                                progressTools[i].progressBar.value = progressTools[i].progressBar.max;
                                            } else {
                                                var currentProgress = Math.min(progressTools[i].progressBar.max, _this._initialProgressConst + (_this._analyzersProgressScale * (progress.progressValue / progress.maxValue)));
                                                progressTools[i].progressBar.value = Math.max(progressTools[i].progressBar.value, currentProgress);
                                            }
                                        }
                                    }
                                }
                            };

                            var toolIds = progressTools.map(function (progressTool) {
                                return progressTool.tool.id;
                            });

                            var dhContextData = {
                                customDomain: {
                                    DiagnosticsHub_Initialization: "true",
                                    DiagnosticsHub_Tools: JSON.stringify(toolIds)
                                }
                            };

                            var preloadAnalyzer = function (clsid) {
                                _this._dataWarehouse.getFilteredData(dhContextData, clsid).then(function () {
                                    inProgress--;
                                    verifyProgress();
                                }, function (error) {
                                    inProgress--;
                                    errors.push(error);
                                    verifyProgress();
                                }, function (progress) {
                                    updateProgress(clsid, progress);
                                });
                            };

                            for (var i = 0; i < analyzerIdsToInitialize.length; i++) {
                                preloadAnalyzer(analyzerIdsToInitialize[i]);
                            }
                        } else {
                            verifyProgress();
                        }
                    };

                    ViewController.prototype.toolContainsAnalyzer = function (tool, analyzerId) {
                        if (tool && tool.dataWarehouse && tool.dataWarehouse.analyzers) {
                            return tool.dataWarehouse.analyzers.some(function (analyzer) {
                                return analyzer.id === analyzerId;
                            });
                        }

                        return false;
                    };

                    ViewController.prototype.addAllExecutableCodeOutputsToJmc = function () {
                        var _this = this;
                        this._logger.debug("Get all executable Solution outputs");
                        return this._solutionService.getAllExecutableCodeOutputs().then(function (executableOutputs) {
                            if (!executableOutputs || executableOutputs.length === 0) {
                                return Plugin.Promise.wrap(null);
                            }

                            // Supply the solution executable code outputs to the data warehouse
                            return _this._dataWarehouse.setPrivateData(2 /* SolutionExecutableCodeOutputs */, executableOutputs);
                        });
                    };

                    ViewController.prototype.addJavaScriptToJmc = function () {
                        var _this = this;
                        this._logger.debug("Get JavaScript JMC information");
                        return this._dataWarehouse.getPrivateData(1 /* JmcJavaScript */).then(function (jsUrls) {
                            return _this._javaScriptJmcHelper.getJmcTypeForUrls(jsUrls).then(function (jmcTypes) {
                                if (jsUrls.length !== jmcTypes.length) {
                                    _this._logger.error("Returned jmcType array did not match url length");
                                    return Plugin.Promise.wrap(null);
                                }

                                var urlsWithJmcType = {};
                                for (var i = 0; i < jmcTypes.length; i++) {
                                    urlsWithJmcType[jsUrls[i]] = jmcTypes[i];
                                }

                                // Set url jmc in datawarehouse
                                return _this._dataWarehouse.setPrivateData(1 /* JmcJavaScript */, urlsWithJmcType);
                            });
                        });
                    };

                    ViewController.prototype.onError = function (error) {
                        this._logger.error(JSON.stringify(error));
                        this._marshaler._call("analyzingFailed");
                    };

                    ViewController.prototype.onProgress = function (progressTools, progress) {
                        this._progressControl.max = progress.maxValue;
                        this._progressControl.value = progress.finished ? progress.maxValue : progress.progressValue;

                        for (var i = 0; i < progressTools.length; i++) {
                            if (progressTools[i].requireInitialization) {
                                progressTools[i].progressBar.value = this._initialProgressConst * (this._progressControl.value / this._progressControl.max);
                            } else {
                                progressTools[i].progressBar.value = (this._progressControl.value / this._progressControl.max);
                            }
                        }
                    };

                    ViewController.prototype.onClosingHandler = function (eventArgs) {
                        if (this._dataWarehouse !== null) {
                            // When we will fix the DataWarehouse closing experience
                            // we will need to do close async (using commented code)
                            /* var deferral = eventArgs.getDeferral(); */
                            this._dataWarehouse.close();
                            /* .then(function () {
                            deferral.complete(true);
                            }, function (error: Error) {
                            deferral.complete(false);
                            }); */
                        }
                    };
                    return ViewController;
                })();

                var viewController;

                Plugin.addEventListener("pluginready", function () {
                    this.viewController = new ViewController();
                    this.viewController.initialize();
                });
            })(DiagnosticsHub.Controllers || (DiagnosticsHub.Controllers = {}));
            var Controllers = DiagnosticsHub.Controllers;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
//# sourceMappingURL=DocumentStatusViewController.js.map

// SIG // Begin signature block
// SIG // MIIavwYJKoZIhvcNAQcCoIIasDCCGqwCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFNzuixUo3S3Q
// SIG // gQFfpPJ7ciPkWv98oIIVejCCBLswggOjoAMCAQICEzMA
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
// SIG // E6P9MYIEsTCCBK0CAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCByjAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUSlU4CHTgz8HabjwogAb2
// SIG // +Kpw5NIwagYKKwYBBAGCNwIBDDFcMFqgQIA+AEQAbwBj
// SIG // AHUAbQBlAG4AdABTAHQAYQB0AHUAcwBWAGkAZQB3AEMA
// SIG // bwBuAHQAcgBvAGwAbABlAHIALgBqAHOhFoAUaHR0cDov
// SIG // L21pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAEggEA
// SIG // B3wDnA5b9TOKcvFma2Aaf/EO7eW46f6pQ0Te1VSJ3AQh
// SIG // x8HbMgS/i9FN/mbJlbjqHFl5FTQBCjgoalpwaglHhnes
// SIG // UN/F+gE5RxyljA5YDMqQXmVH3Mq/YXWZTrQaunVLJtph
// SIG // VKuW5QwnDimt96DcgfE7mf+bCVcge8I2ENwZd3vW2mNw
// SIG // J2zKBvgQch1+GjHZ5n3EK6aqBeo5qe0EFlH7556dHeG+
// SIG // XSA2qFDrqfkKww22+ClGwhAu8c2hniwWTMCNzYdQnTug
// SIG // OcxWf9wB93P1y3+OdNGu8d29MOdTAEMhKE151+vfMmnN
// SIG // wzSl7+zlcHs5MOa1wMAk/DL0odBfi5KrAaGCAigwggIk
// SIG // BgkqhkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQg
// SIG // VGltZS1TdGFtcCBQQ0ECEzMAAABZ1nPNUY7wIsUAAAAA
// SIG // AFkwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkq
// SIG // hkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0MTEwMTA3
// SIG // MjQxNlowIwYJKoZIhvcNAQkEMRYEFNlH0eWVgP3NCHMz
// SIG // rIgVc4DdiSMfMA0GCSqGSIb3DQEBBQUABIIBAGMpZYfY
// SIG // t8wVYcqIbCEYRBH4qLvRIX8OKF6KElIp/f5njFmDsTlW
// SIG // jzhcKsRA+fqxcD7kFjUEPqO/ijCAcDmsN6mZPA7ok34G
// SIG // m8AT0OEQ46oyAFrmAJrfTGYLdqJciDYO51jC6d8p8asr
// SIG // htDLGY9ecNhYlvfVqsj6/IaphZepi3lHMIP+LeOUHbmT
// SIG // njjLGGLeSVQIBCU2qEIkHmwKOuNBQ6opoOz3kJvcQKBL
// SIG // et8v08qoy4oeJ7THcfILwAyi5ZKJeR21q6kHC8yKuy0B
// SIG // PYUSVNgCpufrWbPMcRS/w5ZSYMBosoUplEEVwRr6dsjd
// SIG // xHBslOju/yVVXUZfUmwRBaXNnEE=
// SIG // End signature block
