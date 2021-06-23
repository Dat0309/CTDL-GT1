var Common;
(function (Common) {
    (function (ObjectView) {
        var TreeViewRemoteObjectExplorer = (function () {
            function TreeViewRemoteObjectExplorer(context) {
                this._context = context;
            }
            TreeViewRemoteObjectExplorer.prototype.getAllPropertyNames = function (obj) {
                var propertyNames = [];
                if(obj) {
                    var objectPropertyNames = this._context.currentWindowContext.Object.getOwnPropertyNames(obj);
                    if(objectPropertyNames) {
                        propertyNames = Array.prototype.concat.call(propertyNames, objectPropertyNames);
                    }
                    var prototype = this._context.currentWindowContext.Object.getPrototypeOf(obj);
                    while(prototype) {
                        objectPropertyNames = this._context.currentWindowContext.Object.getOwnPropertyNames(prototype);
                        propertyNames = Array.prototype.concat.call(propertyNames, objectPropertyNames);
                        prototype = this._context.currentWindowContext.Object.getPrototypeOf(prototype);
                    }
                }
                propertyNames = Array.prototype.sort.call(propertyNames, ObjectView.TreeViewUtils.propertyNameCompare);
                return propertyNames;
            };
            TreeViewRemoteObjectExplorer.prototype.hasMembers = function (obj) {
                var objectToCheck = obj;
                while(objectToCheck && objectToCheck !== "undefined") {
                    var currentPropertyNames = this._context.currentWindowContext.Object.getOwnPropertyNames(objectToCheck);
                    if(currentPropertyNames && currentPropertyNames !== "undefined" && currentPropertyNames.length > 0) {
                        return true;
                    }
                    objectToCheck = this._context.currentWindowContext.Object.getPrototypeOf(objectToCheck);
                }
                return false;
            };
            return TreeViewRemoteObjectExplorer;
        })();
        ObjectView.TreeViewRemoteObjectExplorer = TreeViewRemoteObjectExplorer;        
        var TreeViewDirectObjectExplorer = (function () {
            function TreeViewDirectObjectExplorer() { }
            TreeViewDirectObjectExplorer.prototype.getAllPropertyNames = function (obj) {
                var propertyNames = [];
                for(var prop in obj) {
                    propertyNames.push(prop.toString());
                }
                propertyNames = propertyNames.sort(ObjectView.TreeViewUtils.propertyNameCompare);
                return propertyNames;
            };
            TreeViewDirectObjectExplorer.prototype.hasMembers = function (obj) {
                var objectToCheck = obj;
                for(var prop in obj) {
                    return true;
                }
                return false;
            };
            return TreeViewDirectObjectExplorer;
        })();
        ObjectView.TreeViewDirectObjectExplorer = TreeViewDirectObjectExplorer;        
        var TreeViewRemoteHelpers = (function () {
            function TreeViewRemoteHelpers(context, treeViewObjectExplorer) {
                this._maxItemTraverseCount = 500;
                this._maxUngroupArraySize = 50;
                this._arrayGroupSize = 10;
                this._context = context;
                this._treeViewObjectExplorer = treeViewObjectExplorer;
            }
            TreeViewRemoteHelpers.EmptyOrHeadingTrailingWhiteSpaceRegEx = /^$|^\s|\s$/;
            TreeViewRemoteHelpers.prototype.createOutputObject = function (inputId, obj, propertyName, isInternal) {
                var detailedType = Common.ObjectView.TreeViewUtils.getDetailedTypeOf(obj, this._context.constructors);
                var name;
                if(propertyName !== undefined && !isInternal) {
                    obj = obj[propertyName];
                    if(obj) {
                        detailedType = Common.ObjectView.TreeViewUtils.getDetailedTypeOf(obj, this._context.constructors);
                    } else {
                        return null;
                    }
                }
                var isExpandable = !this.isEmpty(obj);
                var value;
                var uid;
                if(isExpandable) {
                    name = this.createName(obj, detailedType);
                    if(name === "[object Window]" && Common.RemoteHelpers.isCrossSiteWindow(this._context.currentWindowContext, obj)) {
                        try  {
                            var iframe = dom.getCrossSiteWindow(this._context.currentWindowContext, obj);
                            if(iframe) {
                                obj = iframe;
                            }
                        } catch (e) {
                            value = {
                                0: this.createExceptionValue(e)
                            };
                        }
                    }
                    if(!value) {
                        uid = remoteHelpers.getUid();
                        this._context.resultMap[uid] = obj;
                        if(detailedType === "array") {
                            value = this.createArrayObject(uid, obj, propertyName, isInternal);
                        } else {
                            value = this.createValue(obj, uid, isInternal);
                        }
                    }
                } else {
                    name = null;
                    value = this.createValue(obj);
                }
                var htmlTypeName = this._context.getHtmlViewableTypeName(obj);
                var isHtmlViewableType = (htmlTypeName !== null && htmlTypeName !== "AttributeNode");
                var valueString;
                if(obj) {
                    var hasToString = false;
                    try  {
                        hasToString = obj.toString && obj.toString() !== "[object]" && obj.toString.toString().indexOf("[native code]") === -1;
                    } catch (e) {
                    }
                    if(hasToString) {
                        valueString = Common.RemoteHelpers.htmlEscapeRemote(obj.toString());
                    } else {
                        if(detailedType === "array" && obj.length > this._maxUngroupArraySize) {
                            var reducedArray = obj.slice(0, this._maxUngroupArraySize);
                            var reducedValue = this.createArrayObject("fakeId", reducedArray, propertyName);
                            valueString = ObjectView.TreeViewValueStringBuilder.createValueString(reducedValue, detailedType, true);
                        } else {
                            valueString = ObjectView.TreeViewValueStringBuilder.createValueString(value, detailedType);
                        }
                    }
                }
                return {
                    inputId: inputId,
                    consoleType: "consoleItemOutput",
                    detailedType: detailedType,
                    isExpandable: isExpandable,
                    isHtmlViewableType: isHtmlViewableType,
                    name: name,
                    value: value,
                    valueString: valueString,
                    uid: uid
                };
            };
            TreeViewRemoteHelpers.prototype.createArrayObject = function (inputId, obj, range, hasValidRange) {
                var reassignIndices = false;
                var arrayLength;
                var outputObject;
                var startRange;
                var endRange;
                if(hasValidRange && range && range.indexOf(":") !== -1) {
                    var rangeArray = range.split(":", 2);
                    startRange = parseInt(rangeArray[0], 10);
                    endRange = parseInt(rangeArray[1], 10) + 1;
                    arrayLength = endRange - startRange;
                    reassignIndices = true;
                } else {
                    arrayLength = obj.length;
                    startRange = 0;
                    endRange = arrayLength;
                    range = null;
                }
                if(arrayLength <= this._maxUngroupArraySize) {
                    outputObject = this.createValue(obj.slice(startRange, endRange), inputId, false);
                    outputObject = outputObject.filter(function (element, index, array) {
                        return !isNaN(parseInt(element.propertyName, 10));
                    });
                    if(reassignIndices || (endRange - startRange) !== outputObject.length) {
                        var index = 0;
                        while(startRange < endRange) {
                            var arrayElementType = typeof obj[startRange];
                            if(arrayElementType === "object") {
                                outputObject[index].propertyValue.value = inputId + ":" + startRange.toString();
                            } else if(arrayElementType === "undefined") {
                                outputObject.splice(index, 0, {
                                    propertyName: String(index),
                                    propertyValue: {
                                        detailedType: "undefined",
                                        isExpandable: false,
                                        isHtmlViewableType: false,
                                        name: String(index),
                                        value: undefined
                                    }
                                });
                            }
                            outputObject[index++].propertyName = String(startRange++);
                        }
                    }
                } else {
                    var groupSize = this._arrayGroupSize;
                    while((groupSize * groupSize) < arrayLength) {
                        groupSize *= groupSize;
                    }
                    outputObject = [];
                    var groupStart = startRange, groupEnd = startRange;
                    while(groupEnd < endRange) {
                        groupEnd += groupSize;
                        groupEnd = groupEnd < endRange ? groupEnd : endRange;
                        outputObject.push({
                            propertyName: "[" + groupStart + "..." + (groupEnd - 1) + "]",
                            propertyValue: {
                                detailedType: "array",
                                isExpandable: true,
                                isHtmlViewableType: false,
                                name: null,
                                value: inputId + "#internal:" + groupStart + ":" + (groupEnd - 1)
                            }
                        });
                        groupStart = groupEnd;
                    }
                }
                if(!range) {
                    outputObject.push({
                        propertyName: "length",
                        propertyValue: {
                            detailedType: "string",
                            isExpandable: false,
                            isHtmlViewableType: false,
                            name: "length",
                            value: String(obj.length)
                        }
                    });
                }
                return outputObject;
            };
            TreeViewRemoteHelpers.prototype.createValue = function (obj, parentUid, onlyFunctions) {
                if(obj === null) {
                    return null;
                }
                var detailedType = Common.ObjectView.TreeViewUtils.getDetailedTypeOf(obj, this._context.constructors);
                var isEmpty = this.isEmpty(obj);
                if(isEmpty) {
                    return this.createName(obj, detailedType);
                }
                var outputObj = [];
                var hasFunctions = false;
                try  {
                    var methods = this._treeViewObjectExplorer.getAllPropertyNames(obj);
                    var methodName;
                    var methodsLength = methods.length;
                    var methodEvaluationFunction = Common.PropertyEvaluationIgnoreList.propertyEvaluationFunction(this._context.currentWindowContext, obj);
                    for(var i = 0; i < methodsLength; i++) {
                        try  {
                            if(i > 0 && methods[i] === methods[i - 1]) {
                                continue;
                            }
                            methodName = "" + methods[i];
                            var child = methodEvaluationFunction(obj, methods[i]);
                            var childDetailedType = Common.ObjectView.TreeViewUtils.getDetailedTypeOf(child, this._context.constructors);
                            var childName = null;
                            hasFunctions = hasFunctions || (childDetailedType === "function");
                            var childIsExpandable = !this.isEmpty(child);
                            if(childIsExpandable) {
                                childName = this.createName(obj[methodName], childDetailedType);
                                if(childName === "null") {
                                    childIsExpandable = false;
                                }
                            }
                            var htmlTypeName = this._context.getHtmlViewableTypeName(child);
                            var isHtmlViewableType = (htmlTypeName !== null && htmlTypeName !== "AttributeNode");
                            var addToList = (onlyFunctions && childDetailedType === "function") || (!onlyFunctions && childDetailedType !== "function") || (detailedType === "array");
                            if(addToList) {
                                var propertyValue;
                                propertyValue = {
                                    detailedType: childDetailedType,
                                    isExpandable: childIsExpandable,
                                    isHtmlViewableType: isHtmlViewableType,
                                    name: childName,
                                    value: (!childIsExpandable ? this.createValue(child, undefined, false) : parentUid + ":" + methodName),
                                    valueString: null
                                };
                                propertyValue.valueString = propertyValue.isExpandable ? ObjectView.TreeViewValueStringBuilder.createPropertyValueString(propertyValue, child) : ObjectView.TreeViewValueStringBuilder.formatPropertyValueString(propertyValue.value);
                                if(TreeViewRemoteHelpers.EmptyOrHeadingTrailingWhiteSpaceRegEx.test(methodName)) {
                                    methodName = "\"" + methodName + "\"";
                                }
                                outputObj.push({
                                    propertyName: methodName,
                                    propertyValue: propertyValue
                                });
                            }
                        } catch (childAccessEx) {
                            outputObj.push({
                                propertyName: methodName,
                                propertyValue: this.createExceptionValue(childAccessEx)
                            });
                            continue;
                        }
                    }
                    if(!onlyFunctions && hasFunctions) {
                        outputObj.push({
                            propertyName: "[functions]",
                            propertyValue: {
                                detailedType: "internal",
                                isExpandable: true,
                                isHtmlViewableType: false,
                                name: " ",
                                isInternalProperty: true,
                                value: parentUid + "#internal" + ":" + "[functions]"
                            }
                        });
                    }
                } catch (objectAccessEx) {
                    outputObj.push({
                        propertyName: "0",
                        propertyValue: this.createExceptionValue(objectAccessEx)
                    });
                }
                return outputObj;
            };
            TreeViewRemoteHelpers.prototype.isEmpty = function (obj) {
                if(obj === null) {
                    return true;
                }
                var pageTypeOf = typeof obj;
                if(pageTypeOf === "object" || pageTypeOf === "function") {
                    try  {
                        if(this._treeViewObjectExplorer.hasMembers(obj)) {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                }
                return true;
            };
            TreeViewRemoteHelpers.prototype.createName = function (obj, detailedType) {
                if(!detailedType) {
                    detailedType = Common.ObjectView.TreeViewUtils.getDetailedTypeOf(obj, this._context.constructors);
                }
                switch(detailedType) {
                    case "boolean":
                        return "" + obj;
                    case "date":
                        return "[date] " + obj;
                    case "function":
                        return "" + obj;
                    case "null":
                        return "null";
                    case "number":
                        return "" + obj;
                    case "regex":
                        return "[regex] " + obj;
                    case "string":
                        return "\"" + obj + "\"";
                    case "undefined":
                        return "undefined";
                    case "array":
                        if(this.isEmpty(obj)) {
                            return Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.arrayName;
                        }
                        return this.getPrototypeName(obj);
                    case "object":
                    case "htmlElement":
                        if(this.isEmpty(obj)) {
                            return Common.ObjectView.TreeViewUtils.ConsoleUITypeStrings.objectName;
                        }
                        return this.getPrototypeName(obj);
                    default:
                        return "" + obj;
                }
            };
            TreeViewRemoteHelpers.prototype.getPrototypeName = function (obj) {
                var prototypeName;
                try  {
                    prototypeName = Object.prototype.toString.call(obj);
                } catch (ex) {
                    prototypeName = null;
                }
                return prototypeName;
            };
            TreeViewRemoteHelpers.prototype.createExceptionValue = function (exception) {
                var information = (exception.message || exception.description);
                var msg = "<" + information.trim() + ">";
                if(msg === "<>") {
                    msg = "<Access denied.>";
                }
                return {
                    detailedType: "exception",
                    isExpandable: false,
                    value: msg
                };
            };
            return TreeViewRemoteHelpers;
        })();
        ObjectView.TreeViewRemoteHelpers = TreeViewRemoteHelpers;        
    })(Common.ObjectView || (Common.ObjectView = {}));
    var ObjectView = Common.ObjectView;
})(Common || (Common = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/Common/ObjectView/treeViewRemoteHelpers.js.map

// SIG // Begin signature block
// SIG // MIIauQYJKoZIhvcNAQcCoIIaqjCCGqYCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFBCp6fWM+P+q
// SIG // lPkOudmPFJgG0dznoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSjMIIEnwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIG8MBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRlJwRF2efG
// SIG // Gh3q++anULIpvHRUbzBcBgorBgEEAYI3AgEMMU4wTKAy
// SIG // gDAAdAByAGUAZQBWAGkAZQB3AFIAZQBtAG8AdABlAEgA
// SIG // ZQBsAHAAZQByAHMALgBqAHOhFoAUaHR0cDovL21pY3Jv
// SIG // c29mdC5jb20wDQYJKoZIhvcNAQEBBQAEggEAAUojekbw
// SIG // 1F5IsKnl+GXauM5+5SyGaHrwS+82DjF30is/GFjWVkga
// SIG // ksZUfDnFakPzHdUOjgMd8w2HRHK09zfNGguE4tMDTmTh
// SIG // 2dehZjKGz+Xg6agQXcTvlOb9sD68//5e2CajEtffM76f
// SIG // xEYvit+kurro0JNuxF2AkowB2A5wu5jJA7OU5FruPXqS
// SIG // j4hL3LATqQ5zCOdZ4Zo1lVCSU2isg7Ic5wTlnkhkQgFl
// SIG // yspN/tVZpuRjQGa6XKyMXvbTkRk1F78VlgMmHzM/h1WX
// SIG // csszhGCJygdPHfIsFR5Ctv8terSLZRzhBWgVOwePQYrT
// SIG // 1f1/7axAC8EKoChM1XoABmPdaqGCAigwggIkBgkqhkiG
// SIG // 9w0BCQYxggIVMIICEQIBATCBjjB3MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSEwHwYDVQQDExhNaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0ECEzMAAABMoehNzLR0ezsAAAAAAEwwCQYF
// SIG // Kw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0B
// SIG // BwEwHAYJKoZIhvcNAQkFMQ8XDTE0MDUwMTA3NTIzNFow
// SIG // IwYJKoZIhvcNAQkEMRYEFJzpnO69kQNLOPKVpe/ezdcV
// SIG // 1G0fMA0GCSqGSIb3DQEBBQUABIIBAGvCGzCdiXbNTSYX
// SIG // 05hox4KjYm8SOqaQPStQXbBvZHn4yA13pn+nla0RGSoq
// SIG // l25l5nyNhIdLHErx3Du6o10yPKg7UvqH8gv6CGkc7uQu
// SIG // VPPGJYhZmODx0brw5Ku9au6lrXdB6zr9c4YPyhttzpGW
// SIG // hItKkuzqk8DsZVCNqEImJBiLkms9TS+a1PQBYEtghGal
// SIG // FW8F21x0aBYNBT1MifqfskA/UUgSzO1e2YOYLRb0rxEA
// SIG // GUD0B/+ghHkoPIF1wsbZtQcKVHGuMzkiKHPwZJp8Amm7
// SIG // aI+nCw9orcyKkCWMgDWD8FQLeMwVKgmEiCamYU1pOJ7V
// SIG // V5V2Rtvp+hZtbrzZWQU=
// SIG // End signature block
