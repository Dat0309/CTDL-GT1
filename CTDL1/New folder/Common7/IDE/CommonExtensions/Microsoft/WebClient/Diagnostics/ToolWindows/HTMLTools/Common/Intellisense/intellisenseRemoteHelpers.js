var Common;
(function (Common) {
    (function (Intellisense) {
        var IntellisenseRemoteHelpers = (function () {
            function IntellisenseRemoteHelpers(context) {
                this._context = context;
            }
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
                "select"
            ];
            IntellisenseRemoteHelpers.evaluateProperty = function evaluateProperty(object, propertyName, currentWindowContext, retrieveProperty) {
                var getPropertyDescriptor = function (object, propertyName) {
                    if(object) {
                        try  {
                            var descriptor = currentWindowContext.Object.getOwnPropertyDescriptor(object, propertyName);
                            if(descriptor) {
                                return descriptor;
                            } else {
                                return getPropertyDescriptor(currentWindowContext.Object.getPrototypeOf(object), propertyName);
                            }
                        } catch (e) {
                            if(e.name === "TypeError") {
                                return {
                                };
                            } else {
                                return;
                            }
                        }
                    }
                    return object;
                };
                var getValueProperty = function (object, propertyName, descriptor) {
                    if(descriptor) {
                        if(typeof descriptor.value !== "undefined" && descriptor.value !== null) {
                            return descriptor.value;
                        } else {
                            var currentType = typeof object;
                            if(currentType !== "object" && currentType !== "function") {
                                object = new currentWindowContext.Object(object);
                            }
                            if(descriptor.get && /\[native code\]/.test(descriptor.get.toString())) {
                                return retrieveProperty(object, propertyName);
                            } else if(typeof descriptor.get === "undefined") {
                                return retrieveProperty(object, propertyName);
                            }
                        }
                    }
                    return;
                };
                return object && getValueProperty(object, propertyName, getPropertyDescriptor(object, propertyName));
            };
            IntellisenseRemoteHelpers.getObjectContextPropertiesNames = function getObjectContextPropertiesNames(context) {
                var propertyNames = [];
                if(context.object !== null && context.object !== undefined) {
                    var currentType = typeof context.object;
                    if(currentType !== "object" || currentType !== "function") {
                        context.object = new context.windowContext.Object(context.object);
                    }
                    var result = Common.RemoteHelpers.getValidWindow(context.windowContext, context.object);
                    if(result.isValid) {
                        context.object = context.windowContext = result.window;
                    }
                    var currentPropertyNames = context.windowContext.Object.getOwnPropertyNames(context.object);
                    if(currentPropertyNames) {
                        propertyNames = currentPropertyNames;
                    }
                    var prototype = context.windowContext.Object.getPrototypeOf(context.object);
                    while(prototype) {
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
                for(var i = 0; i < items.length && items[i].length > 0; ++i) {
                    var retrievePropertyFunc = Common.PropertyEvaluationIgnoreList.propertyEvaluationFunction(currentWindowContext, currentObject);
                    currentObject = evaluator(currentObject, items[i], currentWindowContext, retrievePropertyFunc);
                    var result = Common.RemoteHelpers.getValidWindow(currentWindowContext, currentObject);
                    if(result.isValid) {
                        currentObject = currentWindowContext = result.window;
                    }
                }
                return {
                    object: currentObject,
                    windowContext: currentWindowContext
                };
            };
            IntellisenseRemoteHelpers.prototype.getIntellisenseItemsForObjectContext = function (context, propertyNameCallback, includeKeywordsAndLocals, locals) {
                var propertyNames = propertyNameCallback(context);
                if(includeKeywordsAndLocals) {
                    propertyNames = Array.prototype.concat.call(propertyNames, IntellisenseRemoteHelpers.JSKeywords);
                    propertyNames = Array.prototype.concat.call(propertyNames, locals);
                }
                var choices = [];
                for(var i = 0, len = propertyNames.length; i < len; i++) {
                    if(!String.prototype.match.call(propertyNames[i], /^\d/)) {
                        choices.push({
                            name: propertyNames[i],
                            info: ""
                        });
                    }
                }
                var simpleCompare = function (a, b) {
                    if(a < b) {
                        return -1;
                    } else if(a > b) {
                        return 1;
                    } else {
                        return 0;
                    }
                };
                choices = Array.prototype.sort.call(choices, function (a, b) {
                    var result = simpleCompare(a.name.toLowerCase(), b.name.toLowerCase());
                    if(result === 0) {
                        return simpleCompare(b.name, a.name);
                    } else {
                        return result;
                    }
                });
                for(var i = 1; i < choices.length; ) {
                    if(choices[i - 1].name === choices[i].name) {
                        choices.splice(i, 1);
                    } else {
                        i++;
                    }
                }
                return {
                    choices: choices
                };
            };
            return IntellisenseRemoteHelpers;
        })();
        Intellisense.IntellisenseRemoteHelpers = IntellisenseRemoteHelpers;        
    })(Common.Intellisense || (Common.Intellisense = {}));
    var Intellisense = Common.Intellisense;
})(Common || (Common = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/Common/Intellisense/intellisenseRemoteHelpers.js.map

// SIG // Begin signature block
// SIG // MIIawQYJKoZIhvcNAQcCoIIasjCCGq4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFOr1xoQe7inH
// SIG // 0pJH3sLk8S/EeRzXoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSrMIIEpwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIHEMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBS5EiIE5ewt
// SIG // g5yclsv2nRz9qZibqzBkBgorBgEEAYI3AgEMMVYwVKA6
// SIG // gDgAaQBuAHQAZQBsAGwAaQBzAGUAbgBzAGUAUgBlAG0A
// SIG // bwB0AGUASABlAGwAcABlAHIAcwAuAGoAc6EWgBRodHRw
// SIG // Oi8vbWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASC
// SIG // AQAyp+yFA110FELzT+pHVBpOOaugFLChzFj9SSXy65K9
// SIG // wiR7Fy0hRVV9/Gfi/kAPfdD25Vjd2pzL2ojLpuj7cSAj
// SIG // y00rB5WoTeHDh6esCYyqwwzHgbinMhm1zdA6s/En+Q0D
// SIG // oImVs67Og2Rq/zLLijhJw50Tm0qAzZMFh0roVRKvBcs8
// SIG // GArBBlzqFyLj6gQsvDXthKGC+8MHs69qbNroz4G/HIId
// SIG // IO06/D3SrjgNyLJqp7cb3WVODYFA+tC1OAoLk/2IpkEy
// SIG // uxeVaI5wRDnwT+hTP1eaXpVJA4wF1bSBxUTeKJ9j77oc
// SIG // 4bfSbX59WmaYaWXN2dNy1nOZPBWpbBChLCxAoYICKDCC
// SIG // AiQGCSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQQITMwAAAEyh6E3MtHR7OwAA
// SIG // AAAATDAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsG
// SIG // CSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTQwNTAx
// SIG // MDc1MjMzWjAjBgkqhkiG9w0BCQQxFgQU7xiq1weWlg3b
// SIG // Cr4Et7df5mNj2gQwDQYJKoZIhvcNAQEFBQAEggEAdAyK
// SIG // NghOE4Xj0d0ZbczAjgjkP/VCzwYaUNbTx5QQXgYPwywn
// SIG // HfSV7A1GnQajuzJ1tnH1Yyq2G1aSH1kVLlc1OjfRKYJ5
// SIG // qlumH2bcA/qEwMgkQkmZeVyLBQnvZXK3SMHengFhLdG3
// SIG // /B5eflqI1YBJ9cSu4FEavmW84cTvwushXProfCW21b61
// SIG // PLusQQkKTdHi3jXkFaXI1fiYIHD0hvb+Bj6qWjdyHMj9
// SIG // BJc79QMqxDOzvx+VjC4DVvOnFXwWUmC0ftYkYTaWoSZN
// SIG // SCYFKG6PAph6I4slXULbhsVPKJ6wmi+P9fSDt+RSTkdl
// SIG // thhmWb9yXXF/YvQIg+PzpVSjpSIfZg==
// SIG // End signature block
