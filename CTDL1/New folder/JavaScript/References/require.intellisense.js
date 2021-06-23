// require.config.js, require.intellisense.js
// Microsoft grants you the right to use these script files for the sole purpose of either: (i) interacting
// through your browser with the Microsoft website or online service, subject to the applicable licensing or
// use terms; or (ii) using the files as included with a Microsoft product subject to that product’s license
// terms. Microsoft reserves all other rights to the files not expressly granted by Microsoft, whether by implication,
// estoppel or otherwise. The notices and licenses below are for informational purposes only.
// Portions of this code are based on RequireJS 2.1.2 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.

// Provided for Informational Purposes Only
// MIT License
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
// is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
// IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(function () {
    var redirect = intellisense.redirectDefinition;
    var deferredDefines = [];
    var deferredRequires = [];
    var moduleMap = [];
    var relativeToHtml = null;
    var isConfigSet = false;
    var isBaseUrlDefined = false;
    var primaryFilePath = null;
    var jsExt = ".js";

    // RequireJS regular expressions for CommonJS
    var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
    var cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;

    // Ensure RequireJS is defined
    if (typeof requirejs === "undefined") {
        return;
    }

    // Disable RequireJS script loading timeouts
    require.config({ waitSeconds: 0 });

    // Store the original RequireJS functions
    var originalConfig = requirejs.config;
    var originalLoad = requirejs.load;
    var originalRequire = window.require;
    var originalDefine = window.define;
    var originalCreateNode = requirejs.createNode;
    var originalNextTick = requirejs.nextTick;
    var originalVersion = requirejs.version;
    var originalS = requirejs.s;
    var originalJSExtRegExp = requirejs.jsExtRegExp;
    var originalIsBrowser = requirejs.isBrowser;
    var originalDefaultOnError = requirejs.onError;
    var originalExec = requirejs.exec;

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }

    function convertRelativeDepsToAbsolute(deps) {
        if (isArray(deps)) {
            for (var i = 0; i < deps.length; i++) {
                deps[i] = convertRelativeDepToAbsolute(deps[i]);
            }
        }
    }

    function convertRelativeDepToAbsolute(dep) {
        var finalDep = dep;
        var scriptFilePath = intellisense.executingScriptFileName;
        if (typeof scriptFilePath !== "undefined" &&
            typeof _$requirejs_rootPath !== "undefined" &&
            typeof dep === "string" &&
            dep.indexOf("./") === 0) {
            finalDep = (scriptFilePath.substring(_$requirejs_rootPath.length - 1, scriptFilePath.lastIndexOf('\\')) + "/" + dep.substring(2)).replace(/[\\]+/g, '/');
        }
        return finalDep;
    }

    // Determines if the script is being executed from a project type that
    // infers references from markup files. If so paths are relative to html.
    function isRelativeToHtml() {
        intellisense.progress();

        if (relativeToHtml === null) {
            var scripts = document.getElementsByTagName("script");
            if (scripts) {
                for (var i = 0; i < scripts.length; i++) {
                    var script = scripts[i];
                    var fileName = script.src.replace(/^.*(\/|\\)/, '');
                    if (fileName.toLowerCase().indexOf("require") !== -1) {
                        relativeToHtml = true;
                        return relativeToHtml;
                    }
                }
            }
            relativeToHtml = false;
        }
        return relativeToHtml;
    }

    // Used to convert a url path that is relative to the base url to
    // be relative to the file.
    function makeRelativeToFile(url) {
        intellisense.progress();

        var scriptFilePath = intellisense.executingScriptFileName;
        if (typeof scriptFilePath === 'undefined') {
            return url;
        }

        var startPath;
        if (url.indexOf('/') === 0) {
            // If the url is absolute the start path is the 
            // root path of the project or website.
            startPath = _$requirejs_rootPath;
        } else if (isBaseUrlDefined || _$requirejs_dataMain === "") {
            // Else if a baseUrl has been user defined, or no
            // data-main path was specified, the start path will be
            // the location of the HTML page that loads RequireJS.
            startPath = _$requirejs_startPagePath;
        } else {
            // Otherwise the start path is specified
            // in the data main attribute.
            startPath = _$requirejs_dataMainPath;
        }

        // The start path should never be undefined or empty.
        // If it is return the original url.
        if (typeof startPath === "undefined" || startPath === "") {
            return url;
        }

        var i;
        var scriptPath = normalize(startPath.substr(0, startPath.lastIndexOf("/") + 1) + url);
        var scriptParts = scriptPath.split('\\');
        var currentParts = scriptFilePath.toLowerCase().split('\\');

        for (i = 1; i < currentParts.length; i++) {
            if (currentParts[i] !== scriptParts[i]) {
                break;
            }
        }

        var prefix = "";
        var baseUrl = scriptParts.slice(i, scriptPath.length - 1).join('/');
        var dots = currentParts.length - 1 - i;

        if (dots === 0) {
            prefix = "./";
        } else {
            for (i = 0 ; i < dots; i++) {
                prefix += "../";
            }
        }

        return prefix + baseUrl;
    }

    function normalize(url) {
        if (typeof url !== "string" || url.length === 0 || url === '/') {
            return '';
        }

        var originalParts = url.replace(/[\/]+/g, '\\').toLowerCase().split('\\');
        var finalParts = [];

        // Normalize the url by removing '..', '.' and ''
        for (var i = 0; i < originalParts.length; i++) {
            var part = originalParts[i];
            if (part === "..") {
                finalParts.pop();
            } else if (part !== '' && part !== '.') {
                finalParts.push(part);
            }
        }

        // Return the normalized url (ex: a\b\c)
        return finalParts.join('\\');
    }

    function primaryFile() {
        if (primaryFilePath === null &&
            typeof _$requirejs_primaryFilePath !== "undefined") {
            primaryFilePath = _$requirejs_primaryFilePath.replace(/[\/]+/g, '\\').toLowerCase();
        }
        return primaryFilePath;
    }

    function tryDefineModule(filePath, normalizedUrl, moduleName, deps, callback) {
        if (filePath.toLowerCase().indexOf(normalizedUrl, filePath.length - normalizedUrl.length) !== -1) {
            if (isArray(deps)) {
                originalDefine.call(window, moduleName, deps, callback);
            } else {
                originalDefine.call(window, moduleName, callback);
            }

            return true;
        }

        return false;
    }

    function processDeferredRequires(scriptFilePath) {
        // The executing script file name should never be undefined 
        // except for unit tests.
        if (typeof scriptFilePath === 'undefined' ||
           (!isConfigSet && scriptFilePath.toLowerCase() === primaryFile())) {
            isConfigSet = true;
            while (deferredRequires.length > 0) {
                var deferred = deferredRequires.pop();
                originalRequire.call(window, deferred.deps, deferred.callback);
            }
        }
    }

    // Define a module that is used for RequireJS plugins. 
    // Return a string for all RequireJS plugin resource 
    // dependencies to avoid timeouts.
    define("__RequireJSPlugin", function () { return ""; });

    // Redefine: define(name, deps, callback)
    define = function (name, deps, callback) {
        var i;

        // Call progress to avoid timeouts
        intellisense.progress();

        // Anonymous module 
        if (typeof name !== "string") {
            // Shift arguments
            callback = deps;
            deps = name;
            name = null;
        }

        if (isArray(deps)) {
            // Replace RequireJS Plugin! dependencies with our custom plugin module
            for (i = 0; i < deps.length; i++) {
                var dep = deps[i];
                if (typeof dep === "string" && dep.indexOf("!") !== -1) {
                    deps[i] = "__RequireJSPlugin";
                }
            }
        } else {
            // Module has no dependencies
            // Shift arguments
            callback = deps;
            deps = null;
        }

        // Retrieve CommonJS dependencies
        if (!deps && isFunction(callback)) {
            deps = [];
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);

                // Wrap the define callback in a function that transforms relative
                // dependency paths to absolute paths before calling the original callback.
                var originalCallback = callback;
                callback = function (require) {
                    var transformPaths = function (path) {
                        return require(convertRelativeDepToAbsolute(path));
                    };
                    return originalCallback(transformPaths);
                };
            }
        }

        // Transform relative require dependency paths to be absolute.
        convertRelativeDepsToAbsolute(deps);

        // Require the define dependencies
        if (isArray(deps) && deps.length > 0) {
            if (isConfigSet) {
                require(deps, callback);
            } else {
                deferredRequires.push({ deps: deps, callback: callback });
            }
        }

        // Process the deferred required dependencies before defining
        // the module to ensure the dependencies are loaded.
        var scriptFilePath = intellisense.executingScriptFileName;
        processDeferredRequires(scriptFilePath);

        // If this is a named module there is no need to defer the define.
        // Call the original define immediately.
        if (typeof name === "string") {
            if (isArray(deps)) {
                originalDefine.call(window, name, deps, callback);
            } else {
                originalDefine.call(window, name, callback);
            }
            return;
        }

        // Otherwise, defer the define until the mapping has been established
        deferredDefines.push({ path: scriptFilePath, name: name, deps: deps, callback: callback });

        // Check to see if the path has already been mapped to a module name
        for (i = 0 ; i < moduleMap.length; i++) {
            var normalizedUrl = moduleMap[i].url;
            var moduleName = (typeof name === "string") ? name : moduleMap[i].moduleName;

            if (tryDefineModule(scriptFilePath, normalizedUrl, moduleName, deps, callback)) {
                return;
            }
        }
    };

    // Apply the original defines AMD property to
    // ensure jQuery modules are mapped correctly.
    if (originalDefine.amd) {
        define.amd = originalDefine.amd;
    }

    require = function (deps, callback) {
        // Call progress to avoid timeouts
        intellisense.progress();

        var scriptFilePath = intellisense.executingScriptFileName;
        processDeferredRequires(scriptFilePath);

        // Transform relative require dependency paths to be absolute.
        convertRelativeDepsToAbsolute(deps);

        if (!isConfigSet) {
            deferredRequires.push({ deps: deps, callback: callback });
            return;
        }

        originalRequire.call(window, deps, callback);
    };

    // Redefine: config(configObj)
    var isDataMainSet = false;
    require.config = requirejs.config = function (configObj) {
        // Call progress to avoid timeouts
        intellisense.progress();

        var scriptFileName = intellisense.executingScriptFileName;
        if (typeof scriptFileName === "string" &&
            scriptFileName.indexOf("require.config.js") !== -1) {
            // config() called from require.config.js
            // sets data-main and default baseUrl
            // this only needs to be done once to avoid
            // overwriting user defined config() calls
            if (!isDataMainSet) {
                configObj.waitSeconds = 0;
                originalConfig(configObj);
            }
        } else {
            // config() called from user code
            if (typeof configObj.baseUrl !== "undefined") {
                isBaseUrlDefined = true;
            }

            configObj.waitSeconds = 0;
            originalConfig(configObj);
        }

        isDataMainSet = true;
    };

    // Redefine: load(context, moduleName, url)
    require.load = requirejs.load = function (context, moduleName, url) {
        // Call progress to avoid timeouts
        intellisense.progress();

        // Ensure the url ends with a .js extension
        if (url.toLowerCase().indexOf(jsExt, this.length - jsExt.length) === -1) {
            url += jsExt;
        }

        // Add the module name and normalized url mapping to the module map.
        var normalizedUrl = normalize(url);
        moduleMap.push({ url: normalizedUrl, moduleName: moduleName });

        // If there is a deferred define that matches the normalized url, define it using the specified module name.
        for (var i = 0 ; i < deferredDefines.length; i++) {
            var scriptFilePath = deferredDefines[i].path;
            if (tryDefineModule(scriptFilePath, normalizedUrl, moduleName, deferredDefines[i].deps, deferredDefines[i].callback)) {
                break;
            }
        }

        // When the data-main attribute is defined in a /// reference instead of an 
        // HTML page adjust the url to be relative to the referencing file.
        if (!isRelativeToHtml()) {
            url = makeRelativeToFile(url);
        }

        originalLoad.call(window, context, moduleName, url);
    };

    require.nextTick = requirejs.nextTick = originalNextTick;
    require.version = requirejs.version = originalVersion;
    require.s = requirejs.s = originalS;
    require.jsExtRegExp = requirejs.jsExtRegExp = originalJSExtRegExp;
    require.isBrowser = requirejs.isBrowser = originalIsBrowser;
    require.onError = requirejs.onError = originalDefaultOnError;
    require.createNode = requirejs.createNode = originalCreateNode;
    require.exec = requirejs.exec = originalExec;

    // Restore the original require functions
    redirect(define, originalDefine);
    redirect(require, originalRequire);
    redirect(requirejs, originalRequire);
})();

// SIG // Begin signature block
// SIG // MIIatwYJKoZIhvcNAQcCoIIaqDCCGqQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFJYHHaGTvYwd
// SIG // oQjAWrJU8fWXWoVzoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggShMIIEnQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIG6MBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTrGrqvUcHg
// SIG // ctbHtqu6fHXtihf7kDBaBgorBgEEAYI3AgEMMUwwSqAw
// SIG // gC4AcgBlAHEAdQBpAHIAZQAuAGkAbgB0AGUAbABsAGkA
// SIG // cwBlAG4AcwBlAC4AagBzoRaAFGh0dHA6Ly9taWNyb3Nv
// SIG // ZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAHCJenuR8rYh
// SIG // +D+rjZngKqxNC18ZI2/EiYAB2RJXqxWHPCslmb90GGJR
// SIG // i4av+TFsznMTL85I5+uSalJxMoGxvcpQ8BwRrdk1Iz/t
// SIG // faEdt/DkW12jVe4llbkKP+Yq9vkhVYpS4mTC90RHJOj4
// SIG // 264FEX1krSsb2GP3acwPntjGyTnbVYmbAHxHdotlZcVg
// SIG // OSpyVBRswjjqb8d4LQ8C0SFGpH+Us6KslV6+wyrPg8ka
// SIG // vmTLI46XfkChiD713YQA1DBEzrBg4tBgzbqvP6g1Bj1T
// SIG // o7kMOqHsPdQzbOVp6aQNzwmNskSM3iT5n3w6fUiZNWcq
// SIG // XwVtZFFasOHLYkNMH8B05RmhggIoMIICJAYJKoZIhvcN
// SIG // AQkGMYICFTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBAhMzAAAATKHoTcy0dHs7AAAAAABMMAkGBSsO
// SIG // AwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcB
// SIG // MBwGCSqGSIb3DQEJBTEPFw0xNDExMDEwNzI0MTVaMCMG
// SIG // CSqGSIb3DQEJBDEWBBRYkSxynlgBBU5Yz9xzxQL9xFpf
// SIG // ljANBgkqhkiG9w0BAQUFAASCAQA/0PrzsPIqmazaBpJS
// SIG // /tB1BH47BmdzxrD7KiHuQg7ijjdatPVoLnhOuufC9nIa
// SIG // QoWjUGUK6K2iEqcFMygVNibljofbvVEJvr4plhEugC/+
// SIG // XxYFlzmYoBebzzZper/Vez4FUgOMWLwU6Bey5LdtMvMJ
// SIG // fIh0zSpzdeo95vOgn+7RHdjXnSxH6ICXZFQzBQb/DYMA
// SIG // BmvP0dq8fa1rBsrenz5hIHDHptpumHWbOo18jcVlY75f
// SIG // K60wp464uvoKFve9kpMFSvLEOKC3N4BWCpqRBYqvACdy
// SIG // AhYWaJ4TOh/p8TXTTBDCRXjO3xB+ju3a1Z/Lqr/FwO5U
// SIG // g7sm8hpIwtCB8rUE
// SIG // End signature block
