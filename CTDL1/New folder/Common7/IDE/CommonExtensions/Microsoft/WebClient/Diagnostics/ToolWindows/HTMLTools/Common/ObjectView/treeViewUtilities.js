var Common;
(function (Common) {
    (function (ObjectView) {
        "use strict";
        var TreeViewUtils = (function () {
            function TreeViewUtils() { }
            TreeViewUtils.ConsoleNotifyType = {
                assert: "consoleItemError",
                error: "consoleItemError",
                info: "consoleItemInfo",
                log: "consoleItemLog",
                warn: "consoleItemWarn",
                internalMessage: "internalMessage"
            };
            TreeViewUtils.ConsoleInternalMessage = {
                startGroup: "startGroup",
                startGroupCollapsed: "startGroupCollapsed",
                endGroup: "endGroup",
                displayTraceStyles: "displayTraceStyles"
            };
            TreeViewUtils.ConsoleUITypeStrings = {
                functionName: "[function]",
                objectName: "[object]",
                arrayName: "[array]",
                emptyArray: " [ ]",
                emptyObject: " { }",
                expandableArray: " [...]",
                expandableObject: " {...}"
            };
            TreeViewUtils.ConsoleFilterId = {
                all: -1,
                error: 0,
                warning: 1,
                message: 2,
                log: 3
            };
            TreeViewUtils.getDetailedTypeOf = function getDetailedTypeOf(value, constructors) {
                if(value === undefined) {
                    return "undefined";
                }
                var type = (typeof value);
                if(type === "object" && constructors) {
                    if(value) {
                        for(var i = 0; i < constructors.length; i++) {
                            var arrayCon = (constructors[i] && constructors[i].array ? constructors[i].array : (new Array()).constructor);
                            var dateCon = (constructors[i] && constructors[i].date ? constructors[i].date : (new Date()).constructor);
                            var regexCon = (constructors[i] && constructors[i].regex ? constructors[i].regex : (new RegExp("")).constructor);
                            try  {
                                if(value.constructor === arrayCon) {
                                    return "array";
                                } else if(value.constructor === dateCon) {
                                    return "date";
                                } else if(value.constructor === regexCon) {
                                    return "regex";
                                }
                            } catch (e) {
                            }
                        }
                    } else {
                        return "null";
                    }
                    return "object";
                }
                return type;
            };
            TreeViewUtils.wrapInQuotes = function wrapInQuotes(stringToWrap) {
                return "\"" + stringToWrap.replace(/\\"/g, "\"") + "\"";
            };
            TreeViewUtils.restoreEscapedString = function restoreEscapedString(htmlString) {
                if((typeof htmlString) !== "string") {
                    if(htmlString === null || htmlString === undefined) {
                        return "";
                    }
                    htmlString = "" + htmlString;
                }
                htmlString = String.prototype.replace.call(htmlString, /&nbsp;/g, " ");
                htmlString = String.prototype.replace.call(htmlString, /&amp;/g, "&");
                htmlString = String.prototype.replace.call(htmlString, /&gt;/g, ">");
                htmlString = String.prototype.replace.call(htmlString, /&lt;/g, "<");
                htmlString = String.prototype.replace.call(htmlString, /&quot;/g, "\"");
                htmlString = String.prototype.replace.call(htmlString, /&#39;/g, "'");
                return htmlString;
            };
            TreeViewUtils.getVisibleHtmlElementText = function getVisibleHtmlElementText(element) {
                if($m(element).is(":visible")) {
                    if(element.nodeType === 3) {
                        return element.nodeValue;
                    }
                    var visibleText = "", i = 0;
                    while(element.childNodes[i]) {
                        visibleText += TreeViewUtils.getVisibleHtmlElementText(element.childNodes[i]);
                        i++;
                    }
                    return visibleText;
                }
                return "";
            };
            TreeViewUtils.createPadding = function createPadding(levels, singleLevelPadding) {
                if(levels === 0) {
                    return "";
                }
                var padding = "";
                for(var i = 0; i < levels; i++) {
                    padding += singleLevelPadding;
                }
                return padding;
            };
            TreeViewUtils.getIndentedObjectString = function getIndentedObjectString(obj, detailedType, stringPadding, indentString, newLineString, useEncodeHtml, useTrim) {
                var text = "";
                var objectString = "" + obj;
                if((/\S/).test(objectString)) {
                    var indentCount = 0;
                    var finalLines = [];
                    if(detailedType === "string") {
                        if(useEncodeHtml) {
                            objectString = toolwindowHelpers.htmlEscape(objectString);
                        }
                        text = objectString.replace(/(\r\n|\n\r|\r|\n)/g, newLineString);
                    } else {
                        var lines = objectString.replace(/^\s+|\s+$/g, "").split(/[\r\n]+/);
                        for(var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                            if(lines[lineIndex] !== "") {
                                var indent = "";
                                var lineText = lines[lineIndex];
                                if(useEncodeHtml) {
                                    lineText = toolwindowHelpers.htmlEscape(lineText);
                                }
                                lineText = lineText.replace(/^\s+|\s+$/g, "");
                                if(detailedType === "function") {
                                    if((/^\}/).test(lineText)) {
                                        indentCount--;
                                    }
                                    for(var i = 0; i < indentCount; i++) {
                                        indent += indentString;
                                    }
                                    if((/\{$/).test(lineText)) {
                                        indentCount++;
                                    }
                                }
                                finalLines.push(indent + lineText);
                            }
                        }
                        var lineBreaks = newLineString;
                        if(detailedType === "function" && finalLines.length === 3) {
                            finalLines[1] = finalLines[1].replace(/^(&nbsp;)+/, "").replace(/^\s+|\s+$/g, "");
                            finalLines[2] = finalLines[2].replace(/^\s+|\s+$/g, "");
                            lineBreaks = " ";
                        }
                        text = finalLines.join(lineBreaks);
                    }
                }
                return text;
            };
            TreeViewUtils.propertyNameCompare = function propertyNameCompare(a, b) {
                var aValue;
                var bValue;
                if(!isNaN(aValue = parseInt(a, 10)) && !isNaN(bValue = parseInt(b, 10))) {
                    return aValue - bValue;
                } else {
                    var al = a.toLowerCase();
                    var bl = b.toLowerCase();
                    if(al === bl) {
                        return TreeViewUtils.stringValueCompare(a, b);
                    } else {
                        return TreeViewUtils.stringValueCompare(al, bl);
                    }
                }
            };
            TreeViewUtils.stringValueCompare = function stringValueCompare(a, b) {
                if(a < b) {
                    return -1;
                } else if(a > b) {
                    return 1;
                } else {
                    return 0;
                }
            };
            return TreeViewUtils;
        })();
        ObjectView.TreeViewUtils = TreeViewUtils;        
        var TreeViewValueStringBuilder = (function () {
            function TreeViewValueStringBuilder() { }
            TreeViewValueStringBuilder.createValueString = function createValueString(properties, detailedType, incomplete) {
                if (typeof incomplete === "undefined") { incomplete = false; }
                if(!properties || typeof (properties) !== "object") {
                    return;
                }
                var valueString;
                var isFirstProperty = true;
                var headToken = "<span>";
                var appendPropertyName;
                var tailToken = "</span>";
                switch(detailedType) {
                    case "object":
                        headToken = headToken + "{";
                        appendPropertyName = true;
                        tailToken = "}" + tailToken;
                        break;
                    case "array":
                        headToken = headToken + "[";
                        appendPropertyName = false;
                        tailToken = "]" + tailToken;
                        properties = properties.filter(function (element, index, array) {
                            return !isNaN(parseInt(element.propertyName, 10));
                        });
                        break;
                    default:
                        return;
                }
                valueString = headToken;
                for(var i = 0; i < properties.length; i++) {
                    if(properties[i].propertyName.substr(0, 2) === "__" || properties[i].propertyName === "[functions]") {
                        continue;
                    }
                    if(!isFirstProperty) {
                        valueString += ", ";
                    }
                    isFirstProperty = false;
                    if(appendPropertyName) {
                        valueString += TreeViewValueStringBuilder.createPropertyNameToken(properties[i]);
                        valueString += ": ";
                    }
                    valueString += TreeViewValueStringBuilder.createPropertyValueToken(properties[i]);
                    if(i > 20) {
                        incomplete = true;
                        break;
                    }
                }
                if(incomplete) {
                    tailToken = " ..." + tailToken;
                }
                valueString = valueString + tailToken;
                return valueString;
            };
            TreeViewValueStringBuilder.createPropertyValueString = function createPropertyValueString(propertyValue, obj) {
                try  {
                    switch(propertyValue.detailedType) {
                        case "array":
                            var delimiterIndex = (propertyValue.value).indexOf(":");
                            if(delimiterIndex !== -1) {
                                return "Array[" + Common.RemoteHelpers.htmlEscapeRemote(obj.length) + "]";
                                break;
                            }
                        case "object":
                            var delimiterIndex = propertyValue.name.indexOf(" ");
                            if(delimiterIndex !== -1) {
                                return (propertyValue.name.substr(delimiterIndex + 1, propertyValue.name.length - delimiterIndex - 2)) + " {...}";
                                break;
                            }
                    }
                } catch (ex) {
                }
                return propertyValue.detailedType;
            };
            TreeViewValueStringBuilder.formatPropertyValueString = function formatPropertyValueString(valueString) {
                if(valueString && typeof (valueString) === "string") {
                    var newValueString = valueString.length > 15 ? valueString.substr(0, 12) + "...\"" : valueString;
                    newValueString = String.prototype.replace.call(newValueString, /(\r\n|\n\r|\r|\n)/g, "  ");
                    newValueString = Common.RemoteHelpers.htmlEscapeRemote(newValueString);
                    return newValueString;
                }
                return valueString;
            };
            TreeViewValueStringBuilder.createPropertyValueToken = function createPropertyValueToken(property) {
                var className;
                switch(property.propertyValue.detailedType) {
                    case "undefined":
                        className = "valueStringToken-Undefined";
                        break;
                    case "null":
                        className = "valueStringToken-Null";
                        break;
                    case "boolean":
                        className = "valueStringToken-Bool";
                        break;
                    case "number":
                        className = "valueStringToken-Number";
                        break;
                    case "string":
                        className = "valueStringToken-String";
                        break;
                    case "function":
                        className = "valueStringToken-Function";
                        break;
                    case "array":
                        className = "valueStringToken-Array";
                        break;
                    case "object":
                        className = "valueStringToken-Object";
                        break;
                    default:
                        className = "valueStringToken-Default";
                }
                return "<span class ='" + className + "'>" + property.propertyValue.valueString + "</span>";
            };
            TreeViewValueStringBuilder.createPropertyNameToken = function createPropertyNameToken(property) {
                var className = "valueStringToken-PropertyName";
                var escapedPropertyName = Common.RemoteHelpers.htmlEscapeRemote(property.propertyName);
                return "<span class ='" + className + "'>" + escapedPropertyName + "</span>";
            };
            return TreeViewValueStringBuilder;
        })();
        ObjectView.TreeViewValueStringBuilder = TreeViewValueStringBuilder;        
        var TreeViewStringFormatter = (function () {
            function TreeViewStringFormatter() { }
            TreeViewStringFormatter.formatConsoleMessage = function formatConsoleMessage() {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    args[_i] = arguments[_i + 0];
                }
                var regex = /%%|%([sbxXideEfF])/g;
                var argumentIndex = 0;
                var formatString = TreeViewStringFormatter.convertToString(args[argumentIndex++]);
                var getReplacementString = function (matchedValue) {
                    if(argumentIndex >= args.length) {
                        return matchedValue;
                    }
                    switch(matchedValue) {
                        case "%%":
                            return "%";
                            break;
                        case "%d":
                        case "%i":
                            return TreeViewStringFormatter.convertToInteger(args[argumentIndex++]);
                            break;
                        case "%f":
                            return TreeViewStringFormatter.convertToNumber(args[argumentIndex++]);
                            break;
                        case "%s":
                            return TreeViewStringFormatter.convertToString(args[argumentIndex++]);
                            break;
                        case "%b":
                            return TreeViewStringFormatter.convertToBase(args[argumentIndex++], 2);
                            break;
                        case "%x":
                        case "%X":
                            return TreeViewStringFormatter.convertToBase(args[argumentIndex++], 16);
                            break;
                        case "%E":
                        case "%e":
                            return TreeViewStringFormatter.convertToExponential(args[argumentIndex++]);
                            break;
                        default:
                            return matchedValue;
                    }
                };
                var result = formatString.replace(regex, getReplacementString);
                for(var i = argumentIndex; i < args.length; i++) {
                    result = (result.length > 0) ? (result + " " + TreeViewStringFormatter.convertToString(args[i])) : (TreeViewStringFormatter.convertToString(args[i]));
                }
                return result;
            };
            TreeViewStringFormatter.convertToString = function convertToString(value) {
                var result;
                try  {
                    if(value === undefined || value === null) {
                        result = String(value);
                    } else {
                        result = value.toString();
                        if(typeof (result) !== "string") {
                            result = "[object Object]";
                        }
                    }
                } catch (e) {
                    result = "[object Object]";
                }
                return result;
            };
            TreeViewStringFormatter.convertToInteger = function convertToInteger(value) {
                var numericValue = TreeViewStringFormatter.convertToNumber(value);
                if(isNaN(numericValue)) {
                    return numericValue.toString();
                }
                return Math.round(numericValue - numericValue % 1).toString();
            };
            TreeViewStringFormatter.convertToBase = function convertToBase(value, base) {
                var numericValue = TreeViewStringFormatter.convertToNumber(value);
                if(isNaN(numericValue)) {
                    return numericValue.toString();
                }
                var prefix = {
                    "2": "0b",
                    "8": "0",
                    "16": "0x"
                }[base] || "";
                return prefix.toString() + ((numericValue < 0) ? (numericValue >>> 0).toString(base) : numericValue.toString(base));
            };
            TreeViewStringFormatter.convertToExponential = function convertToExponential(value) {
                var numericValue = TreeViewStringFormatter.convertToNumber(value);
                if(isNaN(numericValue)) {
                    return numericValue.toString();
                }
                return numericValue.toExponential();
            };
            TreeViewStringFormatter.convertToNumber = function convertToNumber(value) {
                return (isNaN(value) || value === null) ? Number(TreeViewStringFormatter.convertToString(value)) : Number(value);
            };
            return TreeViewStringFormatter;
        })();
        ObjectView.TreeViewStringFormatter = TreeViewStringFormatter;        
    })(Common.ObjectView || (Common.ObjectView = {}));
    var ObjectView = Common.ObjectView;
})(Common || (Common = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/common.csproj_75347851/objr/x86/Common/ObjectView/treeViewUtilities.js.map

// SIG // Begin signature block
// SIG // MIIasQYJKoZIhvcNAQcCoIIaojCCGp4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFDhBUUif1fXh
// SIG // 5G2Kg2Uoh3ndSLoLoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSbMIIElwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIG0MBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBT+IL0hkYEN
// SIG // ZoQWpEwYGSwyAZGYVzBUBgorBgEEAYI3AgEMMUYwRKAq
// SIG // gCgAdAByAGUAZQBWAGkAZQB3AFUAdABpAGwAaQB0AGkA
// SIG // ZQBzAC4AagBzoRaAFGh0dHA6Ly9taWNyb3NvZnQuY29t
// SIG // MA0GCSqGSIb3DQEBAQUABIIBACBkPhm/RlGX+k9PHXZm
// SIG // fMGCt4V2GotU8gZr5Ra/x0IaYDuFGKhZnclDJp3f7jCp
// SIG // SR2aPbdHKZN95pbfPez48W+6MNRyohMGSJJRkgPLaDlO
// SIG // SG8gq88gFDlgivPJ5Ynw4P1vn6jEVwrX1pAUzN9LMILx
// SIG // W01NXfs1ny8Ehe4I8RlmsYd/x3mnuTR2L+hqeu4tmrte
// SIG // h851ooDLlfMkl+wHJin7hV7MGpuUxvjxDJfFbRu8QhlL
// SIG // 6MtdUOhcGvK2Blc+uWCOOpaZ+WNdQFMr+96NC5wwuDj1
// SIG // Qgwwc7l9DhH9RKKahcNd9OMgY7jSY+Cv091htqTo8roV
// SIG // rG18vZwWs0sNi/GhggIoMIICJAYJKoZIhvcNAQkGMYIC
// SIG // FTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEh
// SIG // MB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // AhMzAAAATKHoTcy0dHs7AAAAAABMMAkGBSsOAwIaBQCg
// SIG // XTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqG
// SIG // SIb3DQEJBTEPFw0xNDA1MDEwNzUyMzRaMCMGCSqGSIb3
// SIG // DQEJBDEWBBTA+9x8shIlAsILSG73ipmMnNkkVTANBgkq
// SIG // hkiG9w0BAQUFAASCAQCmkFz5s+YHha0wFWrylgKFIjL5
// SIG // uMCx/EdAl3LMD8eICGwAW5bM52uSjsgneJaS59cK7XJQ
// SIG // eEswoQWfYIu1zVfJaVhUm68yUcY0g5C+j/7Uo7Y3Dkjm
// SIG // kjRcqHB0KHzsprcZR676r7ISbjy7yj2/0aeNi6cq4sDU
// SIG // FSxYSZu+JFEjDg/7shp1vaD5F/9VRP/pIv2PrRBbomQT
// SIG // +vf3FHpY1+wrnxnoeB9afsQvsJ7pGQ5V0zHKraK7MQ+O
// SIG // uK7+4Gavzy4abI5ivwSKbq2dFAl4Tb03ufIh7Kipn0xS
// SIG // W+yCN0tFf4GEMqOGY+DUPHh8u17feiQkS/URxzgCQXGF
// SIG // jLqjW/Fn
// SIG // End signature block
