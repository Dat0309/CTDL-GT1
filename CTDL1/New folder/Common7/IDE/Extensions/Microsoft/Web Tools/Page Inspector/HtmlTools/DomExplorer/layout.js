// Expected global variables:
/*global clipboardData domExplorerCode jQuery */

(function ($) {
    /// <summary>
    ///     TabItem - JQuery extension for constructing a tab item, 
    ///     The tabItem object can be initialized by calling tabItem on a jQuery object.
    ///     Requires:
    ///     - layout.css
    /// </summary>
    
    var methods = {
    
        // Default constructor
        init: function (selectedCallback) {
            /// <summary>
            ///     Creates a new TabItem
            /// </summary>
            /// <param name="selectedCallback" type="Function">
            ///     The callback to fire when the tab is changed
            /// </param>
            /// <returns type="Object">
            ///     The jquery object for the new TabItem
            /// </returns>
            
            this.addClass("BPT-Tab-Item");
            
            // Add the click and focus handlers
            this.bind("click focus", function () {
            
                // Ensure we aren't currently editing a textbox
                if (document.activeElement && document.activeElement.type !== "text") {
                    var item = $(this);
                    
                    // Get the currently selected tab from the siblings of the one clicked (or focused)
                    var currentElement = item.siblings(".BPT-Tab-Item.BPT-Tab-Item-Active");

                    // Ensure the tab has changed
                    if (currentElement[0]) {
                        currentElement.removeClass("BPT-Tab-Item-Active");
                        currentElement.addClass("BPT-Tab-Item-Inactive");
                        currentElement.removeAttr("tabindex");
                        
                        item.attr("tabindex", "1");
                        item.removeClass("BPT-Tab-Item-Inactive");
                        item.addClass("BPT-Tab-Item-Active");
                        if (selectedCallback) {
                            selectedCallback();
                        }
                    }
                }
            });
        },
        
        isActive: function () {
            /// <summary>
            ///     Gets a value indicating if this TabItem is the currently selected one
            /// </summary>  
            /// <returns type="Boolean">
            ///     True if this item is active, false otherwise
            /// </returns>
            
            return this.hasClass("BPT-Tab-Item-Active");
        }
    };

    $.fn.tabItem = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method !== "object" || !method) {
            return methods.init.apply(this, arguments);
        }
    };
}(jQuery));


(function ($) {
    /// <summary>
    ///     HorizontalPane - JQuery extension for constructing a horizontal resizable pane, 
    ///     The horizontalPane object can be initialized by calling horizontalPane on a jQuery object.
    ///     Requires:
    ///     - layout.css
    /// </summary>   

    var methods = {
    
        // Default constructor
        init: function () {
            /// <summary>
            ///     Creates a new HorizontalPane
            /// </summary>
            /// <returns type="Object">
            ///     The jquery object for the new HorizontalPane
            /// </returns>
            
            var item = this;
            var rightPane = item.children(".BPT-HorizontalPane-Right");
            item.children().addClass("BPT-Pane");

            var windowWidth = $(window).width();
            
            var curWidth = (windowWidth > 0 ? (windowWidth / 100) * 40 : 300);

//+VWD
            if (vwdCode.external && vwdCode.external.LastRightPaneWidth >= 0) {
                curWidth = vwdCode.external.LastRightPaneWidth;
            }
//-VWD
            var minPaneSize = 200;
            var setPaneWidth = function (newWidth) {
                if (newWidth <= 0) {
                    return;
                }
                curWidth = newWidth = Math.max(minPaneSize, newWidth);
                curWidth = newWidth = Math.round(curWidth); // Clamp to nearest pixel
                var paneSize = item.outerWidth();
                if (paneSize < minPaneSize * 2) {
                    newWidth = paneSize >> 1;
                } else if (paneSize - newWidth < minPaneSize) {
                    newWidth = paneSize - minPaneSize;
                }
//+VWD
                if (vwdCode.external) {
                    vwdCode.external.LastRightPaneWidth = newWidth;
                }
//-VWD                
                item.css("paddingRight", newWidth + "px");
                rightPane.css("marginRight", "-" + newWidth + "px");
                rightPane.css("width", newWidth + "px");
            };
            
            $(window).resize(function () {
                setPaneWidth(curWidth);
            });
            
            setPaneWidth(curWidth);

            var divider = $("<div class='BPT-Pane-Divider'></div>");
            rightPane.prepend(divider);
            divider.mousedown(function (evt) {
                var prevCursor = document.body.style.cursor;
                document.body.style.cursor = "w-resize";

                // Create mouse handlers for resizing
                var mouseMoveHandler, mouseUpHandler;
                mouseMoveHandler = function (evt) {
                    // If the user triggered the 'mouseup' event outside the tool window
                    if (!window.event.button && !window.event.buttons) {
                        mouseUpHandler();
                    }
                    var dividerLoc = divider.offset().left;
                    setPaneWidth(rightPane.width() - evt.pageX + dividerLoc);
                };
                mouseUpHandler = function () {
                    $(document).unbind("mousemove", mouseMoveHandler);
                    $(document).unbind("mouseup", mouseUpHandler);
                    document.body.style.cursor = prevCursor;
                };
                $(document).bind("mousemove", mouseMoveHandler);
                $(document).bind("mouseup", mouseUpHandler);
                
                // Prevent highlighting text while resizing
                // This also stops resizing while the cursor is outside our window.
                evt.stopImmediatePropagation();
                evt.preventDefault();
            });

        }
    };
    
    $.fn.horizontalPane = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method !== "object" || !method) {
            return methods.init.apply(this, arguments);
        }
    };    
        
}(jQuery));


(function ($) {
    /// <summary>
    ///     EditTextbox - JQuery extension for constructing a double click editbox,
    ///     Takes a span element and replaces it with a textbox that has the same contents as the original span.  
    ///     Triggers a callback function when the changes are being submitted.    
    ///     The EditTextbox object can be initialized by calling editTextbox on a jQuery object.
    ///
    ///     Requires:
    ///     - layout.css
    /// </summary>
    
    var textBox = $("<input type='text' class='BPT-EditBox'></input>");
    var replacedObj = null;
    var editChangeCallback = null;
    var editClosedCallback = null;
    var originalValue = null;
    var originalOverflow = "";
    var lastCommitedValue = null;
    var arrowKeysUsed = false;
    
    var methods = {
    
        // Default constructor
        init: function (changeCallback, closedCallback) {
            /// <summary>
            ///     Creates a new EditTextbox
            /// </summary>
            /// <param name="changeCallback" type="Function" optional="true">
            ///     Optional parameter specifying a callback for when the edit box has changed text
            /// </param> 
            /// <param name="closedCallback" type="Function" optional="true">
            ///     Optional parameter specifying a callback for when the edit box has closed
            /// </param>                           
            /// <returns type="Object">
            ///     The jquery object for the new EditTextbox
            /// </returns>
            
            var removeAndFocusParentContainer, removeTextbox;
            removeAndFocusParentContainer = function (evt, wasCancelled) {
                var container = textBox.parents(".BPT-DataTree-Container");
                container = (container.length > 0 ? container : textBox.parents(".BPT-HtmlTree-Container"));
                container = (container.length > 0 ? container : textBox.parents(".BPT-EditContainer:first"));
                
                removeTextbox(wasCancelled);

                if (container.length > 0) {
                    container.data("mouseActivate", true); // Stop the default 'scroll into view' behavior
                    container.focus();
                    try {
                        container.data("mouseActivate", true); // Stop the default 'scroll into view' behavior
                        container[0].setActive();
                    } catch (ex) {
                        // Setting the active element can sometimes cause an 'Incorrect Function' exception in IE9/10,
                        // We should fail gracefully in this situation.
                    }
                }
            };
            
            removeTextbox = function (wasCancelled) {
                $(document).unbind("mousedown", removeAndFocusParentContainer);
                
                var newValue = textBox.attr("value");
                
                if (wasCancelled) {
                    // We need to reset the value because it was cancelled
                    newValue = originalValue;
                    
                    // We need to fire another change, if the arrow keys were used to change the value dynamically
                    if (arrowKeysUsed && lastCommitedValue !== originalValue) {
                        if (editChangeCallback) {
                            editChangeCallback(originalValue);
                        }
                    }
                } else if (arrowKeysUsed && lastCommitedValue !== newValue) {
                    // Fire a change because the arrow keys changed the value dynamically, but then the user changed the text manually
                    if (editChangeCallback) {
                        editChangeCallback(newValue);
                    }
                } else if (newValue !== originalValue) {
                    // Fire a change because the user changed the text manually
                    if (editChangeCallback) {
                        editChangeCallback(newValue);
                    }
                } 
                
                // Update the real value
                if (replacedObj) {
                    // Restore the parent's style
                    textBox.parent().css("overflow", originalOverflow);
            
                    textBox.replaceWith(replacedObj);
                    replacedObj.text(newValue);
                    replacedObj = null;

                    // Fire the closed callback
                    if (editClosedCallback) {
                        editClosedCallback(newValue, wasCancelled);
                    }
                }
            };
           
            var stopPropagationHandler = function (evt) {
                evt.stopPropagation();
            };
            
            var keyPressHandler = function (evt) {
                if (evt.keyCode === 9 || evt.keyCode === 13 || evt.keyCode === 27) { // Tab(9), Enter(13), Escape(27)
                
                    removeAndFocusParentContainer(evt, evt.keyCode === 27);   // Escape(27) means the commit was cancelled
                    evt.stopImmediatePropagation();
                    return false;
                } else if (event.keyCode === 38 || event.keyCode === 40) { // Up(38) or Down(40)
                
                    // Get the value and check for a single number
                    var text = textBox.val();
                    var number = parseInt(text, 10);
                    if (!isNaN(number)) {

                        // Change the number
                        var changeAmount = (evt.shiftKey ? 10 : 1);
                        var newNumber = number + (event.keyCode === 38 ? (1 * changeAmount) : (-1 * changeAmount));
                        var newText = text.replace("" + number, newNumber);
                        textBox.val(newText);
                        
                        // Fire the callback
                        if (editChangeCallback) {
                            // Mark the usage of arrow keys to change the value
                            arrowKeysUsed = true;
                            lastCommitedValue = newText;
                            editChangeCallback(newText);
                        }
                    }            
                }
            };
    
            // If we are trying to create an edit box for a non-existent element, then quit early
            if (this.length === 0) {
                return;
            }
            
            // Remove any existing textbox
            if (replacedObj) {
                // Inform caller that the commit was cancelled
                removeTextbox(true);
            }

            // Set the variables and create the textbox
            editChangeCallback = changeCallback;
            editClosedCallback = closedCallback;
            originalValue = this.text();
            lastCommitedValue = null;
            arrowKeysUsed = false;
            
            // Try to have the textbox at around the same size as the thing we are replacing
            textBox.attr("size", Math.max(originalValue.length, 8));
            
            // Save the parent's original style and change it to always allow the textbox to be seen
            originalOverflow = this.parent().css("overflow");
            this.parent().css("overflow", "visible");
            
            replacedObj = this.replaceWith(textBox.attr("value", originalValue));
            
            // Add event handlers
            $(document).bind("mousedown", removeAndFocusParentContainer, true);
            textBox.keydown(keyPressHandler);
            textBox.bind("mousedown mouseup click dblclick", stopPropagationHandler);
            
            textBox.bind("contextmenu", function (e) {
                var x = e.clientX;
                var y = e.clientY;
                if (e.clientX <= 0 || e.clientY <= 0) {
                    // Keyboard activation
                    x = textBox.offset().left;
                    y = textBox.offset().top;
                }
                
                // Get the context menu parameters
                var selectedText = document.selection.createRange().text;
                var pasteText = clipboardData.getData("Text");
                var canCut = (selectedText !== "");
                var canCopy = canCut;
                var canPaste = (pasteText && pasteText !== "" ? true : false);
                var menuParams = [
                    canCut,
                    canCopy,
                    canPaste
                ];
                
                var callback = function (id, selectedMenuItem) {
                    if (id === "menuTextControl") {
                        switch (selectedMenuItem) {
                            case "menuTextControlCut":
                                document.selection.createRange().execCommand("Cut");
                                break;
                                
                            case "menuTextControlCopy":
                                clipboardData.setData("Text", selectedText);
                                break;
                                
                            case "menuTextControlPaste":
                                var textElement = textBox[0];
                                var startPos = textElement.selectionStart;
                                var endPos = textElement.selectionEnd;

                                textElement.value = textElement.value.substring(0, startPos) + pasteText + textElement.value.substring(endPos, textElement.value.length);
                                break;
                        }
                    }
                };
//                domExplorerCode.externalApis.vsBridge.showContextMenu("menuTextControl", x, y, callback, menuParams);
                domExplorerCode.externalApis.resources.showContextMenu("menuTextControl", x, y, callback, menuParams);

                // Stop the real context menu
                stopPropagationHandler(e);
                return false;
            });

            // Now select and focus the new textbox
            textBox.select().focus();
        }
    };
    
    $.fn.editTextbox = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method !== "object" || !method) {
            return methods.init.apply(this, arguments);
        }
    };      
}(jQuery));

// SIG // Begin signature block
// SIG // MIIaywYJKoZIhvcNAQcCoIIavDCCGrgCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFJHblWEyhomx
// SIG // AvFOwfKV9lDWfTEDoIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AABvZS1YbQcRRigAAAAAAG8wDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE1MDMyMDE3
// SIG // MzIwMloXDTE2MDYyMDE3MzIwMlowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpDMEY0LTMwODYtREVGODEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAM/mbc3BKs2uqF7YlU8tA0NHczu4QtLQV5rd9lM2
// SIG // d9WIRSRqyKvQZumLxaoPnvKDRrYqydg2xvSg/xFvZvBe
// SIG // FBmysWf48V6UhqqOJa/4NRP9gi/HOF5TwHYcxdN5O7Bj
// SIG // 60+TmgXwohdx3MYMltMABS5MbVizf7QsJHB7lmksbIp4
// SIG // CW1JmY46PmaVj09/eBtge1fJUfRLbVHDNLf4OgrWEd/D
// SIG // OqUeoDjc662q+EPEg5qNlzQDNAQa761UNqTUGiz9w27w
// SIG // eOcp8blEwHG0L8QQiwz3NmJ5/QdXfeoFfEyfTjA/J1A4
// SIG // Zga7Xag+xZDb3zx2Vq2VIDRTcu1pWW7wVB9A1TkCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBTypkkpeHxXcFJiz+2s
// SIG // t3sgNEfc/TAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQCNs0y22OwN
// SIG // h4YZXuQA55e41c9MCjy991XT9PCgr1VynCOXuYIqxxYK
// SIG // xScTWdDaMCuIQrpSA+ZeySVoJyeNZKdt+beaaqs+rELQ
// SIG // HiQmzFSv9pCBax6tQ58bexBXajI2MaJEaAGYWisStIkx
// SIG // 9kwMrhU8tyQkXbv/fFNMhMQNzUZ3finKn7JGYoK0NMf1
// SIG // EmlcrXnNMe7pR474/FPz5AKQUWvO+p3jhb9ZgFkQ1Wej
// SIG // TKby5KC02ME6oWpIpojOcPapnN7zU5M9cHEA/77rfPz/
// SIG // CGMPS1FZqxUZkHQe/7u9qjWbPZ7zEBTVevYf1uJ185J0
// SIG // Da0W2RLPoZut0hLqADsjFQzPMIIE7DCCA9SgAwIBAgIT
// SIG // MwAAAQosea7XeXumrAABAAABCjANBgkqhkiG9w0BAQUF
// SIG // ADB5MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSMwIQYDVQQDExpN
// SIG // aWNyb3NvZnQgQ29kZSBTaWduaW5nIFBDQTAeFw0xNTA2
// SIG // MDQxNzQyNDVaFw0xNjA5MDQxNzQyNDVaMIGDMQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMQ0wCwYDVQQLEwRNT1BSMR4wHAYD
// SIG // VQQDExVNaWNyb3NvZnQgQ29ycG9yYXRpb24wggEiMA0G
// SIG // CSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCS/G82u+ED
// SIG // uSjWRtGiYbqlRvtjFj4u+UfSx+ztx5mxJlF1vdrMDwYU
// SIG // EaRsGZ7AX01UieRNUNiNzaFhpXcTmhyn7Q1096dWeego
// SIG // 91PSsXpj4PWUl7fs2Uf4bD3zJYizvArFBKeOfIVIdhxh
// SIG // RqoZxHpii8HCNar7WG/FYwuTSTCBG3vff3xPtEdtX3gc
// SIG // r7b3lhNS77nRTTnlc95ITjwUqpcNOcyLUeFc0Tvwjmfq
// SIG // MGCpTVqdQ73bI7rAD9dLEJ2cTfBRooSq5JynPdaj7woY
// SIG // SKj6sU6lmA5Lv/AU8wDIsEjWW/4414kRLQW6QwJPIgCW
// SIG // Ja19NW6EaKsgGDgo/hyiELGlAgMBAAGjggFgMIIBXDAT
// SIG // BgNVHSUEDDAKBggrBgEFBQcDAzAdBgNVHQ4EFgQUif4K
// SIG // MeomzeZtx5GRuZSMohhhNzQwUQYDVR0RBEowSKRGMEQx
// SIG // DTALBgNVBAsTBE1PUFIxMzAxBgNVBAUTKjMxNTk1KzA0
// SIG // MDc5MzUwLTE2ZmEtNGM2MC1iNmJmLTlkMmIxY2QwNTk4
// SIG // NDAfBgNVHSMEGDAWgBTLEejK0rQWWAHJNy4zFha5TJoK
// SIG // HzBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWND
// SIG // b2RTaWdQQ0FfMDgtMzEtMjAxMC5jcmwwWgYIKwYBBQUH
// SIG // AQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1p
// SIG // Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY0NvZFNpZ1BD
// SIG // QV8wOC0zMS0yMDEwLmNydDANBgkqhkiG9w0BAQUFAAOC
// SIG // AQEApqhTkd87Af5hXQZa62bwDNj32YTTAFEOENGk0Rco
// SIG // 54wzOCvYQ8YDi3XrM5L0qeJn/QLbpR1OQ0VdG0nj4E8W
// SIG // 8H6P8IgRyoKtpPumqV/1l2DIe8S/fJtp7R+CwfHNjnhL
// SIG // YvXXDRzXUxLWllLvNb0ZjqBAk6EKpS0WnMJGdAjr2/TY
// SIG // pUk2VBIRVQOzexb7R/77aPzARVziPxJ5M6LvgsXeQBkH
// SIG // 7hXFCptZBUGp0JeegZ4DW/xK4xouBaxQRy+M+nnYHiD4
// SIG // BfspaxgU+nIEtwunmmTsEV1PRUmNKRot+9C2CVNfNJTg
// SIG // FsS56nM16Ffv4esWwxjHBrM7z2GE4rZEiZSjhjCCBbww
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
// SIG // L54/LlUWa8kTo/0xggS1MIIEsQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAQosea7XeXumrAAB
// SIG // AAABCjAJBgUrDgMCGgUAoIHOMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBT/2Psexgcw
// SIG // z22qvX+IHQpfE4ApuDBuBgorBgEEAYI3AgEMMWAwXqBE
// SIG // gEIATQBpAGMAcgBvAHMAbwBmAHQAIABWAGkAcwB1AGEA
// SIG // bAAgAFMAdAB1AGQAaQBvACAAVwBlAGIAIABUAG8AbwBs
// SIG // AHOhFoAUaHR0cDovL3d3dy5hc3AubmV0LyAwDQYJKoZI
// SIG // hvcNAQEBBQAEggEAXLUTAruOOVgsjHhUYZyTOiDFM2qx
// SIG // GkKide52u2UB/xPgB4IXLSWkAdRsVuqRwy0oOBBVErqI
// SIG // wuAKA+Jo3BNIEua++FXd+bM4ZKJAUL7P2o926l6OiXYw
// SIG // MYerIUoztIVhoAc/WCnJ86ybr2+qwR8eB3VsZA00advd
// SIG // 8ItfLww0ltxkEJJ8qvZF8JO93o+r55IJENHm+2wblIfm
// SIG // 879lXZdYmBnrqSrDCX8DoMYTvwq2d6Vu2rutoqA+79qw
// SIG // 4Rt5svB0nL9xCQsddQweCZvj4KawmZDsUb0jtuwk28IL
// SIG // 5yygtbe3MMUfLdhFnAcbVHupdp/vUtWZ2Vgc/F2F+q4u
// SIG // gRrDFaGCAigwggIkBgkqhkiG9w0BCQYxggIVMIICEQIB
// SIG // ATCBjjB3MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQD
// SIG // ExhNaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABv
// SIG // ZS1YbQcRRigAAAAAAG8wCQYFKw4DAhoFAKBdMBgGCSqG
// SIG // SIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkF
// SIG // MQ8XDTE1MDYxMzAxMzcxMlowIwYJKoZIhvcNAQkEMRYE
// SIG // FBT91qF0PNMUFMETi5l0Pc93tugiMA0GCSqGSIb3DQEB
// SIG // BQUABIIBAG2DCRTs71H52QwwswCg1i9DKr65I4olth3K
// SIG // twh3VLgfYv5Exj8KryxD4djnJCV0AIhFem0QkNXdJtze
// SIG // jHQsVNK9p/USj/iOkIggBJEStgDCUHQy0kO2zbbnlaWC
// SIG // AJsWwzXDmfTgGVWZxuKMpZIxFiwiuqNhQzxmtUqqKBPt
// SIG // 5o3KW442bB/f2FooZEV8/GJ1tKsECbZebdYMrTs+uvR+
// SIG // tEKDvc3LIXFU1OoUtiq3JOMlvGyBav6wVTcwes1mtH+s
// SIG // zXohdVWIbOwLTCbajdNQ01/1ASsbkApH//XW1v+XRTMT
// SIG // z9xII0Jrx/eoahsx5eHFy8NFbfzqv1XH/G89ecao8qQ=
// SIG // End signature block
