
intellisense.enableMicrosoftAjaxLog = function (logLevel) { 
/// <summary>Enables Microsoft Ajax VSIntellisense extension logging</summary>
/// <param name="logLevel" type="String">Acceptable values are "info", "warning", and "error"</param>

    intellisense.logMessage("Passed in log level is " + logLevel);
    if(logLevel) {
        switch(logLevel.trim().toLowerCase())
        {
            case "info":
                intellisense["MicrosoftAjaxLogLevelInfo"] = true;
                intellisense.logMessage("Setting log level info.");
                // Intentional fallthrough
            case "warning":
                intellisense["MicrosoftAjaxLogLevelWarning"] = true;
                intellisense.logMessage("Setting log level warning.");
                // Intentional fallthrough
            case "error":
                intellisense["MicrosoftAjaxLogLevelError"] = true;
                intellisense.logMessage("Setting log level error.");
        }
    }
};


(function () {


    function logError(message) {
        intellisense.logMessage("MicrosoftAjax.intellisense error: " + message);
    }

    function logWarning(message) {
        intellisense.logMessage("MicrosoftAjax.intellisense warning: " + message);
    }

    function logInfo(message) {
        intellisense.logMessage("MicrosoftAjax.intellisense info: " + message);
    }

    // Override runtime validation functions to improve perf and avoid unnecessary errors
    Function._validateParams = function Function$_validateParams(params, expectedParams, validateParameterCount) {
        return null;
    }

    String._toFormattedString = function String$_toFormattedString(useLocale, args) {
        return "";
    }


    function getMetaFieldNames(functionObject) {
        /// <summary>Returns the names of the doc-comment fields defined in the passed in function</summary>
        /// <param name="functionObject" type="Function">Function to search for doc-comment field definitions</param>
        /// <returns type="Object">Map of meta-field names to "MetaField" marker string.</returns>

        if(!functionObject) {
            return null;
        }

        var functionDocComments = getFunctionDocComments(functionObject);
        if (!functionDocComments) {
            return null;
        }

        var fieldSet = {};

        var fieldNamesRegExp = /<field\s+[^>]*name=[\'\"]{1}([^\'\"]*)[\'\"]{1}/g;
        var fieldNameCaptureIndex = 1;
        var results;
        while (results = fieldNamesRegExp.exec(functionDocComments)) {
            var metaField = results[fieldNameCaptureIndex];
            if (logInfos) logInfo("Found meta-field: " + metaField); 
            fieldSet[metaField] = "MetaField";
        }

        return fieldSet;
    }

    function getFunctionDocComments(functionObject) {
        /// <summary>Returns XML doc-comment text of function</summary>
        /// <param name="functionObject" type="Function">Function to search for doc-comments</param>
        /// <returns type="String">Doc-comment content after stripping the leading ///</returns>

        var functionCode = functionObject.toString();
        var functionDocComments = "";

        var line;
        var nextLineStartPos = functionCode.indexOf('{');

        if (nextLineStartPos < 0)
            return null;
        else
            nextLineStartPos++;

        while ((line = getLine(nextLineStartPos, functionCode)) && (line.length > 0)) {
            var docCommentLine = getDocCommentLine(line);
            if (docCommentLine == null)
                break;
            else if (docCommentLine.length > 0)
                functionDocComments += docCommentLine;

            nextLineStartPos += line.length;
        }

        if (logInfos) logInfo("Got function doc-comments: " + functionDocComments);

        return functionDocComments;
    }

    function getLine(startPosition, multiLineText) {
        /// <summary>First line starting at the specified position within passed in text</summary>
        /// <param name="startPosition" type="Number">Search start position</param>
        /// <param name="multiLineText" type="String">Multi-line text to search for the next line</param>
        /// <returns type="String">Single line starting at the specified position or null at the end of the text.</returns>
   
        if (startPosition === undefined || multiLineText === undefined)
            return null;

        if(startPosition >= multiLineText.length)
            return null;

        for(var position = startPosition; position < multiLineText.length; position++) {
            if(multiLineText[position] == '\r' || multiLineText[position] == '\n') {
                if (multiLineText[position] == '\r' && position + 1 < multiLineText.length && multiLineText[position + 1] == '\n')
                    position++;
                return multiLineText.substring(startPosition, position + 1);
            }
        }

        return multiLineText.substring(startPosition);
    }

    function getDocCommentLine(line) {
        /// <summary>Returns text of the XML doc-comment one the line</summary>
        /// <param name="line" type="String"></param>
        /// <returns type="String">Doc-comment line content stripping leading ///, or null if the line is not a doc-comment line</returns>

        var docComment = "///";

        line = line.trim();

        // Blank lines are fine
        if (line.length == 0)
            return "";

        // Non-blank line that doesn't start with "///" is not considered a doc-comment line
        if (!line.startsWith(docComment))
            return null;
        
        // Don't allow more than three slashes at the start
        if (line.length > docComment.length && line[docComment.length + 1] == '/')
            return null;

        // Empty doc-comment lines are fine
        if (line.length == docComment.length)
            return "";

        return line.substring(docComment.length);
    }


    intellisense.addEventListener('statementcompletion', function (e) {

        function addInheritedItems() {
            
            if(intellisense["MicrosoftAjaxLogLevelInfo"]) logInfo("In addInheritedItems");

            if (contextMsAjaxType == "class") {
                if (e.target.resolveInheritance) {
                    var childMemberCache = new Object();
                    for (var member in e.target) {
                        childMemberCache[member] = member;
                    }
             
                    e.target.resolveInheritance();
             
                    for (var member in e.target) {
                        if (!childMemberCache[member]) {
                            var kind = isFunction(e.target[member]) ? "method" : "field";
                            e.items.push({ name: member, kind: kind, value: e.target[member], parentObject: e.target }); 
                        }
                    }
                }
            }

            if (logInfos) logInfo("Exiting addInheritedItems");
        }


        function isFunction(obj) {
            return Object.prototype.toString.call(obj) === "[object Function]";
        }

        function filterItems() {

            if (logInfos) logInfo("Entering filterItems for " + e.items.length + " items");

            e.items = e.items.filter(filterItem);

            if (logInfos) logInfo("Exiting filterItems");

        }

        function filterItem(item) {

            if (logInfos) logInfo("");
            if (logInfos) logInfo("Filtering item: " + item.name);

            var hidden = false;
            var msAjaxType = null;
        
            hidden = item.name[0] == "_";
            hidden |= item.name.indexOf("$") > 0;

            if (hidden) {
                var contextIsThis = false;
                if (e.targetName && e.targetName == "this") { 
                    contextIsThis = true;
                }
                if (logInfos) logInfo("Context is this: " + contextIsThis + " (it is " + e.targetName + ")");
                if (contextIsThis && !isGlobalScope) {
                    // Don"t hide any members when completion is invoked on "this."
                    // and "this" is not global scope
                    hidden = false;
                }
                else if (isGlobalScope) {
                    if (logInfos) logInfo("In global scope item value for item " + item.name + " is " + item.value);
                    msAjaxType = getMicrosoftAjaxTypeForObject(item.value);
                    if (msAjaxType == null) {
                        hidden = false;
                    }
                }
            }

            // For Enums and Flags, we show fields only
            if (!hidden && isEnumContext) {

                if (item.kind != "field") {
                    hidden = true;
                    if (logInfos) logInfo("Filtering out non-field member " + item.name + " on a " + contextMsAjaxType);
                }
                else if (enumMetaFields && (enumMetaFields[item.name] != "MetaField")) {
                    hidden = true;
                    if (logInfos) logInfo("Filtering out non-meta-field member " + item.name + " on a " + contextMsAjaxType);
                }
            }

            return !hidden;
        }

        function setItemsGlyphs() {
            e.items.forEach(setItemGlyph);
        }

        function setItemGlyph(item) {

            if (logInfos) logInfo("Setting item glyph for: " + item.name);

            if (isEnumContext) {
                item.glyph = "vs:GlyphGroupEnumMember";
            }
            else if (item.name.indexOf("set_") == 0 || item.name.indexOf("get_") == 0) {
                if (item.kind == "method") {
                    item.kind = "property";
                }
            }
            else if (item.name.indexOf("add_") == 0 || item.name.indexOf("remove_") == 0) {
                if (item.kind == "method") {
                    item.glyph = "vs:GlyphGroupEvent";
                }
            }
            else {
                var itemValue = item.value;
                if(itemValue) {
                    var ajaxType = getMicrosoftAjaxType(itemValue);
                    if (ajaxType != null) {
                        switch (ajaxType) {
                            case "class":
                                item.glyph = "vs:GlyphGroupClass";
                                break;
                            case "namespace":
                                item.glyph = "vs:GlyphGroupNamespace";
                                break;
                            case "interface":
                                item.glyph = "vs:GlyphGroupInterface";
                                break;
                            case "enum":
                            case "flags":
                                item.glyph = "vs:GlyphGroupEnum";
                            default:
                                if (logErrors) logError("Unknown Microsoft Ajax type: " + ajaxType);
                        }
                    }
                }
            }
        }

        function isFlagsOrEnumItem(item) {
            if (logInfos) logInfo("Entering isFlagsOrEnumItem for: " + item.name);
            var microsoftAjaxType = getMicrosoftAjaxTypeForObject(item.value);
            return isFlagsOrEnumType(microsoftAjaxType);
        }

        function isFlagsOrEnumType(microsoftAjaxType) {
            return microsoftAjaxType == "enum" || microsoftAjaxType == "flags";
        }

        function getMicrosoftAjaxTypeForObject(object) {
            
            var ajaxType = null;

            if (object) {
                ajaxType = getMicrosoftAjaxType(object);

                if (ajaxType == null) {
                    var objectConstructor = object.constructor;
                    if (objectConstructor) {
                        ajaxType = getMicrosoftAjaxType(objectConstructor);
                        if (ajaxType != null) { 
                            if (logInfos) logInfo("Got MS Ajax type for object constructor: " + ajaxType);
                        }
                    }
                }
                else {
                    if (logInfos) logInfo("Got MS Ajax type for object itself: " + ajaxType);
                }
            }

            return ajaxType;
        }

        function getMicrosoftAjaxType(obj) {

            var ajaxType = null;

            if (obj.__class)
                ajaxType = "class";
            else if (obj.__interface)
                ajaxType = "interface";
            else if (obj.__namespace)
                ajaxType = "namespace";
            else if (obj.__flags)
                ajaxType = "flags";
            else if (obj.__enum)
                ajaxType = "enum";

            return ajaxType;
        }

        function isGlobalScopeCompletionList() {

            var result = false;

            for (var i = 0; i < e.items.length; i++) {
                if (e.items[i].name == "break") {
                    result = true;
                    break;
                }
            }

            return result;
        }

        var logErrors = !!intellisense["MicrosoftAjaxLogLevelError"];
        var logWarnings = !!intellisense["MicrosoftAjaxLogLevelWarning"];
        var logInfos = !!intellisense["MicrosoftAjaxLogLevelInfo"];
        
        if (logInfos) logInfo("In addCompletionHandler\n");
//        if (logInfos) logInfo("e.target is " + e.target);
        if (logInfos) logInfo("e.targetName is " + e.targetName);
        if (logInfos) logInfo("e.offset is " + e.offset);

        var isGlobalScope = isGlobalScopeCompletionList();
        var contextMsAjaxType = isGlobalScope ? null : getMicrosoftAjaxTypeForObject(e.target);
        var isEnumContext = contextMsAjaxType != null ? isFlagsOrEnumType(contextMsAjaxType) : false;
        var enumMetaFields = isEnumContext ? getMetaFieldNames(e.target) : {};

        if (logInfos) logInfo("isGlobalScope is " + isGlobalScope);
        if (logInfos) logInfo("contextMsAjaxType is " + contextMsAjaxType + "\n");
        if (logInfos) logInfo("isEnumContext is " + isEnumContext + "\n");

        addInheritedItems();
        filterItems();
        setItemsGlyphs();
    });
    

    intellisense.addEventListener('signaturehelp', function (e) {

        function getPropertyType(comments) {
            /// <param name="comments" type="String" />

            var propertyType = "";

            var docCommentStart = comments.indexOf("<value");
            if (docCommentStart == -1) {
                if (logWarnings) logWarning("<value> doc comment is not found.");
                return "";
            }

            var docCommentEnd = comments.indexOf("</value>", docCommentStart);
            if (docCommentEnd == -1) {
                docCommentEnd = comments.indexOf("/>", docCommentStart);
                if (docCommentEnd == -1) {
                    if (logWarnings) logWarning("End of <value> doc comment is not found.");
                    return "";
                }
            }

            var typeStart = comments.indexOf("type", docCommentStart);
            if (typeStart == -1 || typeStart > docCommentEnd)
                return "";

            var typeValueStart = comments.indexOf("\"", typeStart);
            if (typeValueStart == -1 || typeValueStart > docCommentEnd)
                return "";

            var typeValueEnd = comments.indexOf("\"", typeValueStart + 1);
            if (typeValueEnd == -1 || typeValueEnd > docCommentEnd)
                return "";

            propertyType = comments.substring(typeValueStart + 1, typeValueEnd);

            return propertyType;
        }

        function fixupSetterSignature(signature) {
            if (logInfos) logInfo("Fixing signature for type " + getterType);
            if (getterType) {                
                if (signature.params.length > 0) {
                    signature.params[0].type = getterType;
                }
            }
            else {
                if(intellisense["MicrosoftAjaxLogLevelError"]) logError("No getter.");
            }
        }

        function fixupSetter() {

            var baseName = e.functionHelp.functionName.substring("set_".length);
            var getterName = "get_" + baseName;

            if (e.parentObject) {
                var getterFunction = e.parentObject[getterName];
                if (getterFunction) {
                    var comments = intellisense.getFunctionComments(getterFunction);
                    if (comments && comments.inside) { 
                        if (logInfos) logInfo("Comments is " + comments.inside);
                        getterType = getPropertyType(comments.inside);
                        if (logInfos) logInfo("Matching getter type is " + getterType);
                        if (e.functionHelp.signatures) {
                            e.functionHelp.signatures.forEach(fixupSetterSignature);
                        }
                    }
                    else { 
                        if (logWarnings) logWarning("No doc-comments in matching getter " + getterName);
                    }
                }
                else {
                    if (logWarnings) logWarning("No matching getter for seter " + e.functionHelp.functionName);
                }
            }
        }

        var logErrors = !!intellisense["MicrosoftAjaxLogLevelError"];
        var logWarnings = !!intellisense["MicrosoftAjaxLogLevelWarning"];
        var logInfos = !!intellisense["MicrosoftAjaxLogLevelInfo"];

        if (logInfos) logInfo("In addEventListener(functionHelp)");

        var getterType = null;

        if (e.functionHelp.functionName.indexOf("set_") == 0 && e.functionHelp.functionName.length > "set_".length) {
            fixupSetter();
        }
    });

})();



// SIG // Begin signature block
// SIG // MIIawwYJKoZIhvcNAQcCoIIatDCCGrACAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFPGYDTpJfBfR
// SIG // iQoQ/FjJVFoUdD+5oIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // MwAAALARrwqL0Duf3QABAAAAsDANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xMzAx
// SIG // MjQyMjMzMzlaFw0xNDA0MjQyMjMzMzlaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDor1yiIA34
// SIG // KHy8BXt/re7rdqwoUz8620B9s44z5lc/pVEVNFSlz7SL
// SIG // qT+oN+EtUO01Fk7vTXrbE3aIsCzwWVyp6+HXKXXkG4Un
// SIG // m/P4LZ5BNisLQPu+O7q5XHWTFlJLyjPFN7Dz636o9UEV
// SIG // XAhlHSE38Cy6IgsQsRCddyKFhHxPuRuQsPWj/ov0DJpO
// SIG // oPXJCiHiquMBNkf9L4JqgQP1qTXclFed+0vUDoLbOI8S
// SIG // /uPWenSIZOFixCUuKq6dGB8OHrbCryS0DlC83hyTXEmm
// SIG // ebW22875cHsoAYS4KinPv6kFBeHgD3FN/a1cI4Mp68fF
// SIG // SsjoJ4TTfsZDC5UABbFPZXHFAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUWXGm
// SIG // WjNN2pgHgP+EHr6H+XIyQfIwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1KzRm
// SIG // YWYwYjcxLWFkMzctNGFhMy1hNjcxLTc2YmMwNTIzNDRh
// SIG // ZDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEAMdduKhJXM4HVncbr+TrURE0Inu5e32pbt3nPApy8
// SIG // dmiekKGcC8N/oozxTbqVOfsN4OGb9F0kDxuNiBU6fNut
// SIG // zrPJbLo5LEV9JBFUJjANDf9H6gMH5eRmXSx7nR2pEPoc
// SIG // sHTyT2lrnqkkhNrtlqDfc6TvahqsS2Ke8XzAFH9IzU2y
// SIG // RPnwPJNtQtjofOYXoJtoaAko+QKX7xEDumdSrcHps3Om
// SIG // 0mPNSuI+5PNO/f+h4LsCEztdIN5VP6OukEAxOHUoXgSp
// SIG // Rm3m9Xp5QL0fzehF1a7iXT71dcfmZmNgzNWahIeNJDD3
// SIG // 7zTQYx2xQmdKDku/Og7vtpU6pzjkJZIIpohmgjCCBbww
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
// SIG // L54/LlUWa8kTo/0xggStMIIEqQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAALARrwqL0Duf3QAB
// SIG // AAAAsDAJBgUrDgMCGgUAoIHGMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRLtTnOPNHS
// SIG // mL6g7A9Y3WXPUdylNTBmBgorBgEEAYI3AgEMMVgwVqA8
// SIG // gDoATQBpAGMAcgBvAHMAbwBmAHQAQQBqAGEAeAAuAGkA
// SIG // bgB0AGUAbABsAGkAcwBlAG4AcwBlAC4AagBzoRaAFGh0
// SIG // dHA6Ly9taWNyb3NvZnQuY29tMA0GCSqGSIb3DQEBAQUA
// SIG // BIIBAJxbvlx6/waDoptq237EBFVX+wWhS9dXeWTLOW5Y
// SIG // a6n3SXrulLYbV10IP6QFBrerTpStYFEh9cjq5RFzM5Qg
// SIG // J3u1x/1clEaqQbeMi2iGF0R4Ri0WRjMQQQXWbFw0Yt3p
// SIG // i4Csq6BHW3YQ9c1OraDwJk4ytCTlr7UqTNuCyCzZIL2P
// SIG // eaWXRw8/HXVRvltoIIQQG5RrCvjU4K9wU2E1y87tf0Jd
// SIG // n+JUqRhZE+VHYKxBxVTpSGG9jnCXymi/eX/40XEX2oFd
// SIG // 8wydOYlz7gWNwoOaOzfOSmvTG+knc9h1TbR5HSfOHQaZ
// SIG // 8DBRqk7NdZF/2KWqsuDNcZ4CGK0IPCwF7WMJyYKhggIo
// SIG // MIICJAYJKoZIhvcNAQkGMYICFTCCAhECAQEwgY4wdzEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgUENBAhMzAAAAM+UnhqMOSiqA
// SIG // AAAAAAAzMAkGBSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMx
// SIG // CwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xMzEw
// SIG // MDUwODUxMTZaMCMGCSqGSIb3DQEJBDEWBBS3LI8EN9tc
// SIG // WwJkcuCQCkC/JIRwODANBgkqhkiG9w0BAQUFAASCAQBi
// SIG // VV6dfRjJcKRasPhhewby0yBgCLWPRY8Roe8DN83eV5nL
// SIG // 3dLFwO0OxHf9e4wj43uvp59QoUSNrpZC+VEDeVTy1ZYa
// SIG // TZ6GCg2Zm+udOlX2eVieIwEdqdDphi3nGUdLhpP55/JW
// SIG // mGU+JXMvvyOVbfbOlwDA3xOrtl3tjuDUYZDytt5cMADc
// SIG // 9GxPFj5K5BWKjcqidRqWd+ePyinTRth+6edfAlNRsvyd
// SIG // wE/gaqsyLealFIPhEXStWAHxol4qbbc7+eWJw90OA/fg
// SIG // oteeYHHtfZoAAS2S3sWmLMRubJ4SxhvHW1rRqi52b2TW
// SIG // nuZaPZ+UkZx8DPa7scA3dxk9LhqEeba7
// SIG // End signature block
