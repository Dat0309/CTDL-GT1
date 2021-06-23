//
// Copyright (C) Microsoft. All rights reserved.
//
// <!-- saved from url=(0016)http://localhost -->
// remoteChunker.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        "use strict";
        var Chunker = (function () {
            function Chunker() {
            }
            Chunker.prototype.sendChildren = function (mappedNode, children, showAll, callback) {
                var count = children.length;
                if(mappedNode.isLimited && mappedNode.ele.childNodes) {
                    count = 0;
                    var childNodes = mappedNode.ele.childNodes;
                    for(var index = 0; index < childNodes.length; index++) {
                        var element = childNodes.item(index);
                        if(!htmlTreeHelpers.isEmptyTextElement(element)) {
                            count++;
                        }
                    }
                }
                if(count <= remoteHelpers.childrenElementLimit) {
                    callback({
                        children: children,
                        chunkNumber: 0,
                        chunkCount: 1,
                        totalChildCount: count
                    });
                } else if(!showAll) {
                    children = children.slice(0, remoteHelpers.childrenElementLimit);
                    callback({
                        children: children,
                        chunkNumber: 0,
                        chunkCount: 1,
                        totalChildCount: count
                    });
                } else {
                    if(mappedNode.isLimited) {
                        htmlTreeHelpers.getChildrenForMappedNode(mappedNode.ele.uniqueID, false, true);
                    }
                    var chunkNumber = 0;
                    var chunkCount = Math.ceil(count / remoteHelpers.childrenElementLimit);
                    while(chunkNumber * remoteHelpers.childrenElementLimit < count) {
                        var chunk = children.slice(chunkNumber * remoteHelpers.childrenElementLimit, (chunkNumber + 1) * remoteHelpers.childrenElementLimit);
                        callback({
                            children: chunk,
                            chunkNumber: chunkNumber++,
                            chunkCount: chunkCount,
                            totalChildCount: count
                        });
                    }
                }
            };
            return Chunker;
        })();
        RemoteDom.Chunker = Chunker;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/remoteChunker.js.map

// cssInformationExtractor.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var CssInformationExtractor = (function () {
            function CssInformationExtractor() { }
            CssInformationExtractor.getCssClassesUsedInCurrentDocument = function getCssClassesUsedInCurrentDocument(elementSource) {
                var selectors = [];
                CssInformationExtractor.collectSelectors(elementSource.styleSheets, selectors);
                var cssClassSet = {
                };
                CssInformationExtractor.extractClassNamesFromSelectorText(selectors, cssClassSet);
                CssInformationExtractor.extractClassNamesFromClassAttributes(elementSource, cssClassSet);
                return CssInformationExtractor.createArrayFromClassSet(cssClassSet);
            };
            CssInformationExtractor.collectSelectors = function collectSelectors(styleSheets, selectors) {
                for(var i = 0; i < styleSheets.length; i++) {
                    var styleSheet = styleSheets[i];
                    if(styleSheet.imports && styleSheet.imports.length) {
                        CssInformationExtractor.collectSelectors(styleSheet.imports, selectors);
                    }
                    try  {
                        for(var j = 0; j < styleSheet.rules.length; j++) {
                            var rule = styleSheet.rules[j];
                            selectors.push(rule.selectorText);
                        }
                    } catch (e) {
                        Common.RemoteHelpers.encounteredException(e);
                    }
                }
            };
            CssInformationExtractor.createArrayFromClassSet = function createArrayFromClassSet(cssClassSet) {
                var cssClasses = [];
                for(var cssClass in cssClassSet) {
                    if(cssClass !== "BPT-DomExplorer-Ignore") {
                        cssClasses.push(cssClass);
                    }
                }
                cssClasses.sort();
                return cssClasses;
            };
            CssInformationExtractor.extractClassNamesFromSelectorText = function extractClassNamesFromSelectorText(selectors, cssClassSet) {
                var newCssClass;
                for(var i = 0; i < selectors.length; i++) {
                    var selectorText = selectors[i];
                    var selectorParts = String.prototype.split.call(selectorText, /([~+>,]|\s)+/);
                    for(var l = 0; l < selectorParts.length; l++) {
                        var selectorPart = selectorParts[l];
                        var dotIndex = selectorPart.indexOf(".");
                        while(dotIndex !== -1) {
                            var endOfClassIndex = CssInformationExtractor.findEndOfClass(selectorPart, dotIndex);
                            if(endOfClassIndex === -1) {
                                newCssClass = selectorPart.substring(dotIndex + 1);
                                if(newCssClass !== "") {
                                    cssClassSet[newCssClass] = true;
                                }
                                dotIndex = -1;
                            } else {
                                newCssClass = selectorPart.substring(dotIndex + 1, endOfClassIndex + 1);
                                if(newCssClass) {
                                    cssClassSet[newCssClass] = true;
                                }
                                dotIndex = selectorPart.indexOf(".", dotIndex + 1);
                            }
                        }
                    }
                }
            };
            CssInformationExtractor.extractClassNamesFromClassAttributes = function extractClassNamesFromClassAttributes(elementSource, cssClassSet) {
                var nodes = elementSource.querySelectorAll("[class]");
                for(var i = 0; i < nodes.length; i++) {
                    var htmlElement = nodes.item(i);
                    var classList = htmlElement.classList;
                    if(!classList) {
                        var className = htmlElement.className;
                        if(className) {
                            var view = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                            if(view && view.SVGAnimatedString && className instanceof view.SVGAnimatedString) {
                                var animatedValue = className;
                                className = animatedValue.baseVal;
                                if(animatedValue.baseVal != animatedValue.animVal) {
                                    className += " " + animatedValue.animVal;
                                }
                            }
                            if(className && className.split) {
                                var classNames = String.prototype.split.call(className, /\s+/);
                                for(var classNameIndex = 0; classNameIndex < classNames.length; classNameIndex++) {
                                    var className = classNames[classNameIndex];
                                    cssClassSet[className] = true;
                                }
                            }
                        }
                    } else {
                        for(var j = 0; j < classList.length; j++) {
                            var cssClass = classList.item(j);
                            cssClassSet[cssClass] = true;
                        }
                    }
                }
            };
            CssInformationExtractor.findEndOfClass = function findEndOfClass(selectorPart, dotIndex) {
                var sub = selectorPart.substring(dotIndex + 1);
                var endIndex = String.prototype.search.call(sub, /[.#\[:>~)]/);
                if(endIndex === -1) {
                    return -1;
                }
                return endIndex + dotIndex;
            };
            return CssInformationExtractor;
        })();
        RemoteDom.CssInformationExtractor = CssInformationExtractor;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/cssInformationExtractor.js.map

// remoteMutationManager.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var MutationManager = (function () {
            function MutationManager(_timerService, _useTimeoutCheck) {
                this._timerService = _timerService;
                this._useTimeoutCheck = _useTimeoutCheck;
                this._treeModifiedCallback = null;
                this._attributeModifiedCallback = null;
                this._treeModifiedMap = {
                };
                this._attributeModifiedMap = {
                };
                this._treeModifiedTimeoutWaiting = false;
                this._attributeModifiedTimeoutWaiting = false;
            }
            Object.defineProperty(MutationManager.prototype, "treeModifiedCallback", {
                set: function (f) {
                    this._treeModifiedCallback = f;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MutationManager.prototype, "attributeModifiedCallback", {
                set: function (f) {
                    this._attributeModifiedCallback = f;
                },
                enumerable: true,
                configurable: true
            });
            MutationManager.limitChildListSize = function limitChildListSize(modifications, uidToMappedNodeMap) {
                modifications.forEach(function (modification) {
                    if(modification.children && modification.children.length > remoteHelpers.childrenElementLimit) {
                        var mappedNode = uidToMappedNodeMap[modification.uid];
                        modification.children = modification.children.slice(0, remoteHelpers.childrenElementLimit);
                    }
                });
            };
            MutationManager.prototype.fireTreeModified = function (mappedNode, uid) {
                var _this = this;
                if(mappedNode.listenForTreeModified) {
                    this._treeModifiedMap[uid] = mappedNode;
                    if(this._useTimeoutCheck.useTimeout()) {
                        if(!this._treeModifiedTimeoutWaiting) {
                            this._timerService.setTimeout(function () {
                                _this.treeModificationTimeoutCallback();
                            }, 200);
                            this._treeModifiedTimeoutWaiting = true;
                        }
                    } else {
                        this.treeModificationTimeoutCallback();
                    }
                }
            };
            MutationManager.prototype.fireAttributeModified = function (element, attrName, newValue, changeType, callback) {
                var _this = this;
                var mappedNode = this.lookupMappedNode(element);
                if(mappedNode) {
                    if(attrName === "value") {
                        changeType = (mappedNode.hasValueAttribute ? 1 : 2);
                        mappedNode.hasValueAttribute = true;
                    }
                    if(changeType === 1 || changeType === 3) {
                        for(var i = 0; i < mappedNode.mapped.attributes.length; i++) {
                            if(mappedNode.mapped.attributes[i].name === attrName) {
                                if(changeType === 1) {
                                    mappedNode.mapped.attributes[i].value = newValue;
                                } else {
                                    mappedNode.mapped.attributes.splice(i, 1);
                                }
                                break;
                            }
                        }
                    } else if(changeType === 2) {
                        mappedNode.mapped.attributes.push({
                            name: attrName,
                            value: newValue
                        });
                    }
                    if(!mappedNode.pendingAttrModified) {
                        mappedNode.pendingAttrModified = {
                        };
                    }
                    var uid = element["uniqueID"] || element["bpt-uid"];
                    mappedNode.pendingAttrModified[attrName] = {
                        event: "attrModified",
                        uid: uid,
                        attrName: attrName,
                        newValue: newValue,
                        attrChange: changeType
                    };
                    this._attributeModifiedMap[uid] = mappedNode;
                    if(this._useTimeoutCheck.useTimeout()) {
                        if(!this._attributeModifiedTimeoutWaiting) {
                            this._timerService.setTimeout(function () {
                                _this.attributeModificationTimeoutCallback();
                            }, 200);
                            this._attributeModifiedTimeoutWaiting = true;
                        }
                    } else {
                        this.attributeModificationTimeoutCallback();
                    }
                    if(callback) {
                        callback(element);
                    }
                }
            };
            MutationManager.prototype.treeModificationTimeoutCallback = function () {
                var _this = this;
                var uids = Object.keys(this._treeModifiedMap);
                var modifications = [];
                uids.forEach(function (uidToAppend) {
                    var mappedNodeToAppend = _this._treeModifiedMap[uidToAppend];
                    modifications.push({
                        uid: uidToAppend,
                        event: "treeModified",
                        children: mappedNodeToAppend.childrenNodes,
                        childCount: mappedNodeToAppend.childrenNodes ? mappedNodeToAppend.childrenNodes.length : 0
                    });
                });
                MutationManager.limitChildListSize(modifications, this._treeModifiedMap);
                this._treeModifiedMap = {
                };
                this._treeModifiedCallback(modifications);
                this._treeModifiedTimeoutWaiting = false;
            };
            MutationManager.prototype.attributeModificationTimeoutCallback = function () {
                var _this = this;
                var attributeModificationList = [];
                var uids = Object.keys(this._attributeModifiedMap);
                uids.forEach(function (uid) {
                    var mappedNode = _this._attributeModifiedMap[uid];
                    if(mappedNode.pendingAttrModified) {
                        var attributeNames = Object.keys(mappedNode.pendingAttrModified);
                        attributeNames.forEach(function (attributeName) {
                            var attributeModification = mappedNode.pendingAttrModified[attributeName];
                            attributeModificationList.push({
                                uid: uid,
                                attrName: attributeName,
                                newValue: attributeModification.newValue,
                                attrChange: attributeModification.attrChange
                            });
                        });
                    }
                    mappedNode.pendingAttrModified = {
                    };
                });
                this._attributeModifiedMap = {
                };
                this._attributeModifiedCallback(attributeModificationList);
                this._attributeModifiedTimeoutWaiting = false;
            };
            MutationManager.prototype.lookupMappedNode = function (element) {
                var mappedNode = null;
                var uid = element["uniqueID"] || element["bpt-uid"];
                if(uid) {
                    if(htmlTreeHelpers.mapping[uid] && htmlTreeHelpers.mapping[uid].ele === element) {
                        mappedNode = htmlTreeHelpers.mapping[uid];
                    }
                } else {
                    for(uid in htmlTreeHelpers.mapping) {
                        if(htmlTreeHelpers.mapping[uid].ele === element) {
                            mappedNode = htmlTreeHelpers.mapping[uid];
                            break;
                        }
                    }
                }
                return mappedNode;
            };
            return MutationManager;
        })();
        RemoteDom.MutationManager = MutationManager;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/remoteMutationManager.js.map

// remoteElementCopier.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var RemoteElementCopier = (function () {
            function RemoteElementCopier(_diagOmStyles) {
                this._diagOmStyles = _diagOmStyles;
            }
            RemoteElementCopier.constructDoctypeString = function constructDoctypeString(node) {
                var doctype = "<!DOCTYPE html>";
                if(node) {
                    doctype = "<!DOCTYPE " + node.name + (node.publicId ? " PUBLIC \"" + node.publicId + "\"" : "") + (!node.publicId && node.systemId ? " SYSTEM" : "") + (node.systemId ? " \"" + node.systemId + "\"" : "") + ">";
                }
                return doctype;
            };
            RemoteElementCopier.prototype.computeHtmlForAncestorsAndDescendants = function (elementToCopy) {
                var root = this.copyElementPlusAncestors(elementToCopy);
                var doctype = RemoteElementCopier.constructDoctypeString(elementToCopy.ownerDocument.doctype);
                var htmlTag = this.constructHtmlTagString(elementToCopy);
                var elementsToSearchForStyles = this.findElementsToSearchForStyles(elementToCopy);
                var elementToStyleRulesMap = this.makeElementToStyleRulesMap(elementsToSearchForStyles);
                var orderedStyleRules = this.putRulesInTheRightOrder(elementToStyleRulesMap);
                var result = doctype + "\r\n" + htmlTag + "\r\n<head>\r\n<title></title>\r\n<style>\r\n";
                var cssText = this.getTextForRules(orderedStyleRules);
                result += cssText;
                result += "</style>\r\n</head>\r\n";
                result += root.outerHTML;
                result += "\r\n</html>\r\n";
                return result;
            };
            RemoteElementCopier.prototype.copyElementPlusAncestors = function (elementToCopy) {
                var ancestorElements = [];
                var ancestorElement = elementToCopy.parentElement;
                if(elementToCopy.tagName !== "BODY") {
                    while(ancestorElement) {
                        ancestorElements.push(ancestorElement);
                        ancestorElement = ancestorElement.parentElement;
                        if(ancestorElement && !ancestorElement.parentElement) {
                            ancestorElement = null;
                        }
                    }
                }
                var container = null;
                var root = null;
                var styleSet = {
                };
                for(var i = ancestorElements.length - 1; i >= 0; i--) {
                    var createdAncestor = this.copyElementWithAttributes(ancestorElements[i]);
                    if(container) {
                        container.appendChild(createdAncestor);
                    } else {
                        root = createdAncestor;
                    }
                    container = createdAncestor;
                }
                var copy = this.copyElementWithAttributes(elementToCopy);
                copy.innerHTML = elementToCopy.innerHTML;
                if(container) {
                    container.appendChild(copy);
                    return root;
                }
                return copy;
            };
            RemoteElementCopier.prototype.findElementsToSearchForStyles = function (element) {
                var ancestorsAndDescendants = [];
                var nextElement = element;
                while(nextElement) {
                    ancestorsAndDescendants.push(nextElement);
                    nextElement = nextElement.parentElement;
                }
                var elementsToSearchForChildren = [
                    element
                ];
                while(elementsToSearchForChildren.length > 0) {
                    var elementToProcess = elementsToSearchForChildren.pop();
                    var currentChildren = elementToProcess.children;
                    if(currentChildren) {
                        for(var i = 0; i < currentChildren.length; i++) {
                            elementsToSearchForChildren.push(currentChildren[i]);
                            ancestorsAndDescendants.push(currentChildren[i]);
                        }
                    }
                }
                return ancestorsAndDescendants;
            };
            RemoteElementCopier.prototype.getTextForRules = function (styleRules) {
                var cssText = "";
                styleRules.forEach(function (rule) {
                    if(rule.parentRule && rule.parentRule) {
                        var mediaRule = rule.parentRule;
                        if(mediaRule.media && mediaRule.media.mediaText) {
                            cssText += "/* @media " + mediaRule.media.mediaText + " */\r\n";
                        } else if(rule.parentStyleSheet) {
                            var linkElement = rule.parentStyleSheet.owningElement;
                            if(linkElement.tagName === "LINK" && linkElement.media) {
                                cssText += "/* media " + linkElement.media + "*/\r\n";
                            }
                        }
                    }
                    cssText += rule.selectorText;
                    cssText += " {\r\n";
                    var styleDeclaration = rule.style;
                    var stylePropertyList = styles.getParsedPropertyList(styleDeclaration);
                    for(var i = 0; i < stylePropertyList.length; i++) {
                        try  {
                            var styleProperty = stylePropertyList[i];
                            var name = styleProperty.propertyName;
                            var value = styleProperty.value;
                            var importance = styleProperty.important;
                            if(name) {
                                cssText += "\t" + name + ": ";
                                if(value) {
                                    cssText += value;
                                }
                                if(importance) {
                                    cssText += " !important";
                                }
                                cssText += ";\r\n";
                            }
                        } catch (e) {
                            Common.RemoteHelpers.encounteredException(e);
                        }
                    }
                    cssText += "}\r\n";
                });
                return cssText;
            };
            RemoteElementCopier.prototype.makeElementToStyleRulesMap = function (elements) {
                var result = [];
                for(var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    var styleRules = this.getStyleRules(element);
                    if(styleRules.length > 0) {
                        result.push({
                            element: element,
                            styleRules: styleRules
                        });
                    }
                }
                return result;
            };
            RemoteElementCopier.prototype.getStyleRules = function (element) {
                var styleRules = [];
                this._diagOmStyles.calculateTracedStyles(element);
                try  {
                    var appliedStyles = this._diagOmStyles.getTracedStyles(element).getAppliedStyles();
                } catch (ex) {
                    return styleRules;
                }
                for(var i = appliedStyles.length - 1; i >= 0; i--) {
                    var styleRule = Common.RemoteHelpers.getRuleForStyleObject(appliedStyles[i], element);
                    if(styleRule) {
                        styleRules.push(styleRule);
                    }
                }
                return styleRules;
            };
            RemoteElementCopier.prototype.copyElementWithAttributes = function (source) {
                var copy = source.ownerDocument.createElement(source.tagName);
                for(var i = 0; i < source.attributes.length; i++) {
                    copy.setAttribute(source.attributes[i].name, source.attributes[i].value);
                }
                return copy;
            };
            RemoteElementCopier.prototype.constructHtmlTagString = function (elementToCopy) {
                var node = elementToCopy.ownerDocument.documentElement;
                var htmlTag = "<html>";
                if(node && node.attributes) {
                    htmlTag = "<html";
                    for(var i = 0; i < node.attributes.length; i++) {
                        htmlTag += " " + node.attributes[i].name + "=\"" + node.attributes[i].value + "\"";
                    }
                    htmlTag += ">";
                }
                return htmlTag;
            };
            RemoteElementCopier.prototype.putRulesInTheRightOrder = function (elementToStyleRulesMap) {
                var orderedRules = [];
                for(var pairNumber = 0; pairNumber < elementToStyleRulesMap.length; pairNumber++) {
                    var pair = elementToStyleRulesMap[pairNumber];
                    var precedingRule = null;
                    for(var ruleNumber = 0; ruleNumber < pair.styleRules.length; ruleNumber++) {
                        var rule = pair.styleRules[ruleNumber];
                        var indexOfRule = orderedRules.indexOf(rule);
                        if(indexOfRule < 0) {
                            orderedRules.push(rule);
                        } else if(precedingRule) {
                            var indexOfPrecedingRule = orderedRules.indexOf(precedingRule);
                            if(indexOfPrecedingRule > indexOfRule) {
                                orderedRules.splice(indexOfPrecedingRule, 1);
                                orderedRules.splice(indexOfRule, 0, precedingRule);
                            }
                        }
                        precedingRule = rule;
                    }
                }
                return orderedRules;
            };
            return RemoteElementCopier;
        })();
        RemoteDom.RemoteElementCopier = RemoteElementCopier;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/remoteElementCopier.js.map

// appliedStyleRule.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var AppliedStyleRule = (function () {
            function AppliedStyleRule(targetElement, cachedStyle, wasCreatedInSession) {
                if (typeof wasCreatedInSession === "undefined") { wasCreatedInSession = false; }
                this.wasCreatedInSession = wasCreatedInSession;
                this.properties = [];
                this.uid = cachedStyle.uid;
                this.isInlined = targetElement.style === cachedStyle.style;
                var cssRule = cachedStyle.rule;
                this.selector = cssRule ? cssRule.selectorText : undefined;
                this.parent = this.computeParentMediaRule(cssRule);
                this.declarationLocation = cachedStyle.source;
                if(cssRule && cssRule.parentStyleSheet) {
                    this.styleHref = cssRule.parentStyleSheet.href;
                }
                if(!wasCreatedInSession) {
                    this.originalSelector = this.selector;
                }
            }
            Object.defineProperty(AppliedStyleRule.prototype, "hasChanged", {
                get: function () {
                    if(!this.properties.length || (this.wasCreatedInSession && this.isDeleted)) {
                        return false;
                    }
                    if(!this.wasCreatedInSession && !this.isInlined && this.selector !== this.originalSelector) {
                        return true;
                    }
                    for(var i = 0; i < this.properties.length; i++) {
                        if(this.properties[i].hasChanged) {
                            return true;
                        }
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            AppliedStyleRule.prototype.setIsInheritedAndTarget = function (isInherited, messageHandlers, targetElement) {
                this.isInherited = isInherited;
                this.target = new RemoteDom.AppliedStyleTarget(this.isInherited ? messageHandlers.getElementUid(targetElement) : this.uid, targetElement);
            };
            AppliedStyleRule.prototype.addProperty = function (property, position) {
                this.properties.splice(position, 0, property);
            };
            AppliedStyleRule.prototype.removeProperty = function (property) {
                for(var i = 0; i < this.properties.length; i++) {
                    if(this.properties[i] === property) {
                        this.properties.splice(i, 1);
                        return;
                    }
                }
            };
            AppliedStyleRule.prototype.clearProperties = function () {
                this.properties = [];
            };
            AppliedStyleRule.prototype.forEachProperty = function (func) {
                for(var i = 0; i < this.properties.length; i++) {
                    func(this.properties[i]);
                }
            };
            AppliedStyleRule.prototype.computeParentMediaRule = function (ruleApplied) {
                var parentRule = null;
                if(ruleApplied) {
                    var mediaParentRule = ruleApplied.parentRule;
                    if(mediaParentRule && mediaParentRule.media) {
                        parentRule = "@media " + mediaParentRule.media.mediaText;
                    } else if(ruleApplied.parentStyleSheet) {
                        var linkElement = ruleApplied.parentStyleSheet.owningElement;
                        if(linkElement.tagName === "LINK" && linkElement.media) {
                            parentRule = "media " + linkElement.media;
                        }
                    }
                }
                return parentRule;
            };
            return AppliedStyleRule;
        })();
        RemoteDom.AppliedStyleRule = AppliedStyleRule;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/appliedStyleRule.js.map

// appliedStyleTarget.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var AppliedStyleTarget = (function () {
            function AppliedStyleTarget(uid, element) {
                this.uid = uid;
                this.description = element.tagName.toLowerCase();
                var id = element.getAttribute("id");
                if(id) {
                    this.description += "#" + id;
                } else {
                    var className = element.className;
                    if(className && typeof className === "string" && className.trim().length > 0) {
                        this.description += "." + className.trim().split(" ")[0];
                    }
                }
            }
            return AppliedStyleTarget;
        })();
        RemoteDom.AppliedStyleTarget = AppliedStyleTarget;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/appliedStyleTarget.js.map

// appliedStyleProperty.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var AppliedStyleProperty = (function () {
            function AppliedStyleProperty(current, status, wasCreatedInSession) {
                if (typeof wasCreatedInSession === "undefined") { wasCreatedInSession = false; }
                this.current = current;
                this.status = status;
                this.wasCreatedInSession = wasCreatedInSession;
                this.longhand = [];
                this.isApplied = true;
                this.uid = remoteHelpers.getUid();
                if(!wasCreatedInSession) {
                    this.original = new RemoteDom.AppliedPropertyValue(current.name, current.value, current.isImportant, current.isEnabled);
                    this.isSettingOriginalLonghands = true;
                }
            }
            Object.defineProperty(AppliedStyleProperty.prototype, "hasChanged", {
                get: function () {
                    var original = this.original;
                    var current = this.current;
                    if(this.wasCreatedInSession && (this.status !== RemoteDom.DiagnosticProperty.VALID_STATUS || this.current.isEnabled)) {
                        return true;
                    }
                    if(!this.wasCreatedInSession && this.isDeleted) {
                        return true;
                    }
                    if(original && (original.name !== current.name || original.value !== current.value || original.isImportant !== current.isImportant || original.isEnabled !== current.isEnabled)) {
                        return true;
                    }
                    if(this.longhand.length && (!this.originalLonghand || this.originalLonghand.length === this.longhand.length)) {
                        for(var i = 0; i < this.longhand.length; i++) {
                            var subproperty = this.longhand[i];
                            original = this.originalLonghand ? this.originalLonghand[i] : null;
                            current = subproperty.current;
                            if(original && (original.name !== current.name || original.value !== current.value || original.isImportant !== current.isImportant || original.isEnabled !== current.isEnabled)) {
                                return true;
                            }
                            if(!original && !current.isEnabled) {
                                return true;
                            }
                        }
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            AppliedStyleProperty.prototype.addLonghandProperty = function (property, position) {
                this.longhand.splice(position, 0, property);
                if(this.isSettingOriginalLonghands) {
                    if(!this.originalLonghand) {
                        this.originalLonghand = [];
                    }
                    var current = property.current;
                    this.originalLonghand.push(new RemoteDom.AppliedPropertyValue(current.name, current.value, current.isImportant, current.isEnabled));
                }
            };
            AppliedStyleProperty.prototype.clearLonghandProperties = function () {
                this.longhand = [];
                this.isSettingOriginalLonghands = false;
            };
            return AppliedStyleProperty;
        })();
        RemoteDom.AppliedStyleProperty = AppliedStyleProperty;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/appliedStyleProperty.js.map

// mappedStylePropertyCollection.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var MappedStylePropertyCollection = (function () {
            function MappedStylePropertyCollection() {
                this._mappedProperties = [];
            }
            Object.defineProperty(MappedStylePropertyCollection.prototype, "propertyNames", {
                get: function () {
                    var names = "";
                    this._mappedProperties.forEach(function (mappedProperty) {
                        names += "." + mappedProperty.appliedProperty.current.name;
                    });
                    return names;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MappedStylePropertyCollection.prototype, "isEmpty", {
                get: function () {
                    return !this._mappedProperties.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MappedStylePropertyCollection.prototype, "hasAppliedProperties", {
                get: function () {
                    for(var i = 0; i < this._mappedProperties.length; i++) {
                        if(this._mappedProperties[i].appliedProperty.isApplied) {
                            return true;
                        }
                    }
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MappedStylePropertyCollection.prototype, "length", {
                get: function () {
                    return this._mappedProperties.length;
                },
                enumerable: true,
                configurable: true
            });
            MappedStylePropertyCollection.prototype.addProperty = function (mappedProperty, position) {
                if (typeof position === "undefined") { position = -1; }
                if(position < 0 || position >= this._mappedProperties.length) {
                    this._mappedProperties.push(mappedProperty);
                    this._mappedProperties.length - 1;
                    position = this._mappedProperties.length;
                } else {
                    this._mappedProperties.splice(position, 0, mappedProperty);
                }
                this.addAppliedProperty(mappedProperty.appliedProperty, position);
            };
            MappedStylePropertyCollection.prototype.addAppliedProperty = function (appliedProperty, position) {
            };
            MappedStylePropertyCollection.prototype.removeProperty = function (removeMappedProperty) {
                for(var i = 0; i < this._mappedProperties.length; i++) {
                    var mappedProperty = this._mappedProperties[i];
                    if(mappedProperty === removeMappedProperty) {
                        this._mappedProperties.splice(i, 1);
                        this.removeAppliedProperty(mappedProperty.appliedProperty);
                    }
                }
            };
            MappedStylePropertyCollection.prototype.removeAppliedProperty = function (appliedProperty) {
            };
            MappedStylePropertyCollection.prototype.forEachProperty = function (func) {
                for(var i = 0; i < this._mappedProperties.length; i++) {
                    if(func(this._mappedProperties[i], i)) {
                        return i;
                    }
                }
                return -1;
            };
            MappedStylePropertyCollection.prototype.clearProperties = function () {
                this._mappedProperties = [];
                this.clearAppliedProperties();
            };
            MappedStylePropertyCollection.prototype.clearAppliedProperties = function () {
            };
            MappedStylePropertyCollection.prototype.lookupMappedProperty = function (matches) {
                for(var i = 0; i < this._mappedProperties.length; i++) {
                    var mappedProperty = this._mappedProperties[i];
                    var matched = matches(mappedProperty);
                    if(matched) {
                        return matched;
                    }
                }
            };
            MappedStylePropertyCollection.prototype.lookupMappedPropertyPosition = function (mappedProperty) {
                for(var i = 0; i < this._mappedProperties.length; i++) {
                    if(mappedProperty === this._mappedProperties[i]) {
                        return i;
                    }
                }
                return -1;
            };
            return MappedStylePropertyCollection;
        })();
        RemoteDom.MappedStylePropertyCollection = MappedStylePropertyCollection;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/mappedStylePropertyCollection.js.map

// mappedStyleProperty.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var F12;
(function (F12) {
    (function (RemoteDom) {
        var MappedStyleProperty = (function (_super) {
            __extends(MappedStyleProperty, _super);
            function MappedStyleProperty(appliedProperty, mappedRule, diagProperty, _owner) {
                        _super.call(this);
                this.appliedProperty = appliedProperty;
                this.mappedRule = mappedRule;
                this.diagProperty = diagProperty;
                this._owner = _owner;
            }
            MappedStyleProperty.prototype.setEnabled = function (isEnabled) {
                this.forEachProperty(function (mappedProperty) {
                    mappedProperty.setEnabled(isEnabled);
                });
                this.diagProperty.enabled = isEnabled;
                this.appliedProperty.current.isEnabled = isEnabled;
                if(this._owner && isEnabled) {
                    this._owner.appliedProperty.current.isEnabled = true;
                }
            };
            MappedStyleProperty.prototype.setValue = function (value, isImportant, wasEnabledOrInvalid) {
                var current = this.appliedProperty.current;
                var oldValue = current.value;
                var oldImportant = current.isImportant;
                var setFunc = function () {
                    current.value = value;
                    current.isImportant = isImportant;
                };
                var resetFunc = function () {
                    current.value = oldValue;
                    current.isImportant = oldImportant;
                };
                var succeeded = this.mappedRule.commitChanges(setFunc, resetFunc, this.mappedRule.lookupMappedPropertyPosition(this));
                if(succeeded) {
                    this.diagProperty.enabled = !this.diagProperty.isEmptyInvalid && wasEnabledOrInvalid && this.diagProperty.isValid;
                    current.isEnabled = this.diagProperty.enabled;
                }
                return succeeded;
            };
            MappedStyleProperty.prototype.setName = function (name, longhandEnabledStates) {
                var current = this.appliedProperty.current;
                var oldName = current.name;
                var setFunc = function () {
                    current.name = name;
                };
                var resetFunc = function () {
                    current.name = oldName;
                };
                var succeeded = this.mappedRule.commitChanges(setFunc, resetFunc, this.mappedRule.lookupMappedPropertyPosition(this));
                if(succeeded) {
                    this.mappedRule.setAppliedState(this);
                    if(longhandEnabledStates) {
                        this.resetLonghandEnabledStates(longhandEnabledStates);
                    }
                }
                return succeeded;
            };
            MappedStyleProperty.prototype.setAll = function (name, value, isImportant, isEnabled, longhandEnabledStates) {
                var current = this.appliedProperty.current;
                var oldName = current.name;
                var oldValue = current.value;
                var oldImportant = current.isImportant;
                var setFunc = function () {
                    current.name = name;
                    current.value = value;
                    current.isImportant = isImportant;
                };
                var resetFunc = function () {
                    current.value = oldValue;
                    current.isImportant = oldImportant;
                };
                var succeeded = this.mappedRule.commitChanges(setFunc, resetFunc, this.mappedRule.lookupMappedPropertyPosition(this));
                if(succeeded) {
                    this.diagProperty.enabled = isEnabled;
                    current.isEnabled = this.diagProperty.enabled;
                    this.mappedRule.setAppliedState(this);
                    if(longhandEnabledStates) {
                        this.resetLonghandEnabledStates(longhandEnabledStates);
                    }
                }
                return succeeded;
            };
            MappedStyleProperty.prototype.addAppliedProperty = function (appliedProperty, position) {
                this.appliedProperty.addLonghandProperty(appliedProperty, position);
            };
            MappedStyleProperty.prototype.clearAppliedProperties = function () {
                this.appliedProperty.clearLonghandProperties();
            };
            MappedStyleProperty.prototype.getLonghandEnabledStates = function () {
                var enabledStates;
                var longhand = this.appliedProperty.longhand;
                if(longhand) {
                    enabledStates = [];
                    longhand.forEach(function (property) {
                        enabledStates.push(property.current.isEnabled);
                    });
                }
                return enabledStates;
            };
            MappedStyleProperty.prototype.resetLonghandEnabledStates = function (enabledStates) {
                var longhand = this.diagProperty.longhands;
                if(longhand && enabledStates && longhand.length === enabledStates.length) {
                    var appliedLonghand = this.appliedProperty.longhand;
                    for(var i = 0; i < longhand.length; i++) {
                        longhand[i].enabled = enabledStates[i];
                        appliedLonghand[i].current.isEnabled = longhand[i].enabled;
                    }
                }
            };
            return MappedStyleProperty;
        })(RemoteDom.MappedStylePropertyCollection);
        RemoteDom.MappedStyleProperty = MappedStyleProperty;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/mappedStyleProperty.js.map

// stylePropertyMap.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var StylePropertyMap = (function () {
            function StylePropertyMap() {
                this._properties = {
                };
            }
            StylePropertyMap.prototype.add = function (uid, property) {
                this._properties[uid] = property;
            };
            StylePropertyMap.prototype.remove = function (uid) {
                delete this._properties[uid];
            };
            StylePropertyMap.prototype.lookupByUid = function (uid) {
                return this._properties[uid];
            };
            StylePropertyMap.prototype.clear = function () {
                this._properties = {
                };
            };
            StylePropertyMap.prototype.forEach = function (func) {
                for(var uid in this._properties) {
                    func(this._properties[uid]);
                }
            };
            return StylePropertyMap;
        })();
        RemoteDom.StylePropertyMap = StylePropertyMap;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/stylePropertyMap.js.map

// styleRuleMap.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var StyleRuleMap = (function () {
            function StyleRuleMap() {
                this._rules = {
                };
            }
            StyleRuleMap.prototype.add = function (uid, rule) {
                this._rules[uid] = rule;
            };
            StyleRuleMap.prototype.remove = function (uid) {
                delete this._rules[uid];
            };
            StyleRuleMap.prototype.lookupByUid = function (uid) {
                return this._rules[uid];
            };
            StyleRuleMap.prototype.clear = function () {
                this._rules = {
                };
            };
            return StyleRuleMap;
        })();
        RemoteDom.StyleRuleMap = StyleRuleMap;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/styleRuleMap.js.map

// mappedStyleRule.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var F12;
(function (F12) {
    (function (RemoteDom) {
        var MappedStyleRule = (function (_super) {
            __extends(MappedStyleRule, _super);
            function MappedStyleRule(_styleUtilities, appliedRule, cachedStyle, element) {
                        _super.call(this);
                this._styleUtilities = _styleUtilities;
                this.appliedRule = appliedRule;
                this.cachedStyle = cachedStyle;
                this.element = element;
            }
            Object.defineProperty(MappedStyleRule.prototype, "cssText", {
                get: function () {
                    var text = "";
                    this.forEachProperty(function (mappedProperty) {
                        var current = mappedProperty.appliedProperty.current;
                        text += MappedStyleRule.preparePropertyName(current.name) + ": ";
                        text += MappedStyleRule.preparePropertyValue(current.value + (current.isImportant ? " !important" : "")) + "; ";
                    });
                    return text;
                },
                enumerable: true,
                configurable: true
            });
            MappedStyleRule.prepareSelector = function prepareSelector(selector) {
                return selector;
            };
            MappedStyleRule.preparePropertyName = function preparePropertyName(name) {
                return name;
            };
            MappedStyleRule.preparePropertyValue = function preparePropertyValue(value) {
                return value;
            };
            MappedStyleRule.prototype.addAppliedProperty = function (appliedProperty, position) {
                this.appliedRule.addProperty(appliedProperty, position);
            };
            MappedStyleRule.prototype.removeAppliedProperty = function (appliedProperty) {
                this.appliedRule.removeProperty(appliedProperty);
            };
            MappedStyleRule.prototype.clearAppliedProperties = function () {
                this.appliedRule.clearProperties();
            };
            MappedStyleRule.prototype.lookupActiveMappedProperty = function (propertyName) {
                return this.lookupMappedProperty(function (mappedProperty) {
                    if(mappedProperty.diagProperty.enabled && mappedProperty.diagProperty.activeInBlock && mappedProperty.appliedProperty.current.name === propertyName) {
                        return mappedProperty;
                    }
                    return mappedProperty.lookupMappedProperty(function (mappedProperty) {
                        if(mappedProperty.diagProperty.enabled && mappedProperty.diagProperty.activeInBlock && mappedProperty.appliedProperty.current.name === propertyName) {
                            return mappedProperty;
                        }
                    });
                });
            };
            MappedStyleRule.prototype.setAppliedState = function (mappedProperty) {
                mappedProperty.appliedProperty.isApplied = this._styleUtilities.getAppliedState(mappedProperty);
            };
            MappedStyleRule.prototype.propertyAdd = function (name, value, isImportant, isEnabled, mappedProperty, beforeUid, longhandEnabledStates) {
                var _this = this;
                var appliedProperty;
                if(mappedProperty) {
                    appliedProperty = mappedProperty.appliedProperty;
                    appliedProperty.current.name = name;
                    appliedProperty.current.value = value;
                    appliedProperty.current.isImportant = isImportant;
                    appliedProperty.current.isEnabled = isEnabled;
                    mappedProperty.diagProperty = null;
                    mappedProperty.mappedRule = this;
                } else {
                    appliedProperty = new RemoteDom.AppliedStyleProperty(new RemoteDom.AppliedPropertyValue(name, value, isImportant, isEnabled), RemoteDom.DiagnosticProperty.VALID_STATUS, true);
                    mappedProperty = new RemoteDom.MappedStyleProperty(appliedProperty, this, null);
                }
                var beforeProperty = beforeUid ? this.lookupMappedProperty(function (afterProperty) {
                    if(afterProperty.appliedProperty.uid === beforeUid) {
                        return afterProperty;
                    }
                }) : null;
                var position = beforeProperty ? this.lookupMappedPropertyPosition(beforeProperty) : this.length;
                var setFunc = function () {
                    _this.addProperty(mappedProperty, position);
                };
                var resetFunc = function () {
                    _this.removeProperty(mappedProperty);
                };
                if(this.commitChanges(setFunc, resetFunc, position)) {
                    this._styleUtilities.mapProperty(mappedProperty);
                    this.setAppliedState(mappedProperty);
                    if(longhandEnabledStates) {
                        mappedProperty.resetLonghandEnabledStates(longhandEnabledStates);
                    }
                    return mappedProperty;
                }
            };
            MappedStyleRule.prototype.propertyHardRemove = function (mappedProperty) {
                var _this = this;
                var position = this.lookupMappedPropertyPosition(mappedProperty);
                var setFunc = function () {
                    _this.removeProperty(mappedProperty);
                };
                var resetFunc = function () {
                    _this.addProperty(mappedProperty, position);
                };
                if(this.commitChanges(setFunc, resetFunc)) {
                    this._styleUtilities.unmapProperty(mappedProperty);
                    return true;
                }
                return false;
            };
            MappedStyleRule.prototype.remove = function () {
                var _this = this;
                var deleteStates = [];
                var setFunc = function () {
                    _this.forEachProperty(function (mappedProperty) {
                        deleteStates.push(mappedProperty.isDeleted);
                        mappedProperty.isDeleted = true;
                    });
                };
                var resetFunc = function () {
                    var next = 0;
                    _this.forEachProperty(function (mappedProperty) {
                        mappedProperty.isDeleted = deleteStates[next++];
                    });
                };
                var isSuccess = this.commitChanges(setFunc, resetFunc);
                if(isSuccess) {
                    this.appliedRule.isDeleted = true;
                    this.forEachProperty(function (mappedProperty) {
                        mappedProperty.appliedProperty.isDeleted = true;
                    });
                }
                return isSuccess ? deleteStates : null;
            };
            MappedStyleRule.prototype.unremove = function (deleteStates, enableStates, enabledLonghandStates) {
                var _this = this;
                if(deleteStates.length !== this.length || enableStates.length !== this.length || enabledLonghandStates.length !== this.length) {
                    return false;
                }
                var next;
                var setFunc = function () {
                    next = 0;
                    _this.forEachProperty(function (mappedProperty) {
                        mappedProperty.isDeleted = deleteStates ? deleteStates[next++] : false;
                    });
                };
                var resetFunc = function () {
                    _this.forEachProperty(function (mappedProperty) {
                        mappedProperty.isDeleted = true;
                    });
                };
                var isSuccess = this.commitChanges(setFunc, resetFunc);
                if(isSuccess) {
                    this.appliedRule.isDeleted = false;
                    if(enableStates) {
                        next = 0;
                        this.forEachProperty(function (mappedProperty) {
                            mappedProperty.appliedProperty.isDeleted = mappedProperty.isDeleted;
                            mappedProperty.diagProperty.enabled = enableStates[next];
                            mappedProperty.appliedProperty.current.isEnabled = mappedProperty.diagProperty.enabled;
                            mappedProperty.resetLonghandEnabledStates(enabledLonghandStates[next]);
                            next++;
                        });
                    }
                }
                return isSuccess;
            };
            MappedStyleRule.prototype.propertyRemove = function (mappedProperty) {
                mappedProperty.diagProperty.enabled = false;
                mappedProperty.isDeleted = true;
                mappedProperty.appliedProperty.isDeleted = true;
                return true;
            };
            MappedStyleRule.prototype.propertyUnremove = function (mappedProperty, isEnabled, longhandEnabledStates) {
                mappedProperty.isDeleted = false;
                mappedProperty.appliedProperty.isDeleted = false;
                mappedProperty.diagProperty.enabled = isEnabled;
                mappedProperty.appliedProperty.current.isEnabled = mappedProperty.diagProperty.enabled;
                if(longhandEnabledStates) {
                    mappedProperty.resetLonghandEnabledStates(longhandEnabledStates);
                }
                return true;
            };
            MappedStyleRule.prototype.RemoveAllProperties = function () {
                var _this = this;
                var properties = [];
                this.forEachProperty(function (mappedProperty) {
                    properties.push(mappedProperty);
                });
                var setFunc = function () {
                    _this.clearProperties();
                };
                var resetFunc = function () {
                    properties.forEach(function (mappedProperty) {
                        _this.addProperty(mappedProperty);
                    });
                };
                return this.commitChanges(setFunc, resetFunc);
            };
            MappedStyleRule.prototype.movePropertiesFromRule = function (otherRule) {
                var _this = this;
                var newProperties = [];
                var longhandEnabledStates = [];
                var setFunc = function () {
                    otherRule.forEachProperty(function (mappedProperty) {
                        newProperties.push(mappedProperty);
                        longhandEnabledStates.push(mappedProperty.getLonghandEnabledStates());
                        _this.addProperty(mappedProperty);
                        mappedProperty.mappedRule = _this;
                        mappedProperty.forEachProperty(function (subproperty) {
                            subproperty.mappedRule = _this;
                        });
                    });
                };
                var resetFunc = function () {
                    otherRule.forEachProperty(function (mappedProperty) {
                        _this.removeProperty(mappedProperty);
                        mappedProperty.mappedRule = otherRule;
                        mappedProperty.forEachProperty(function (subproperty) {
                            subproperty.mappedRule = otherRule;
                        });
                    });
                };
                if(this.commitChanges(setFunc, resetFunc) && otherRule.RemoveAllProperties()) {
                    newProperties.forEach(function (mappedProperty, index) {
                        mappedProperty.resetLonghandEnabledStates(longhandEnabledStates[index]);
                    });
                    return true;
                }
                return false;
            };
            MappedStyleRule.prototype.reconcileProperty = function (updateApplied, mappedProperty, diagProperty, isDynamicUpdate) {
                var _this = this;
                var appliedProperty = mappedProperty.appliedProperty;
                mappedProperty.diagProperty = diagProperty;
                var changed = false;
                try  {
                    var current = appliedProperty.current;
                    var wasEnabled = current.isEnabled;
                    if(isDynamicUpdate && mappedProperty.isDeleted) {
                        current.isEnabled = true;
                        mappedProperty.isDeleted = false;
                        if(updateApplied) {
                            appliedProperty.isDeleted = false;
                        }
                    }
                    if(diagProperty.isValid) {
                        if(appliedProperty.status !== RemoteDom.DiagnosticProperty.VALID_STATUS) {
                            diagProperty.enabled = true;
                        } else if(!current.isEnabled) {
                            diagProperty.enabled = false;
                        }
                        current.isEnabled = diagProperty.enabled;
                    } else {
                        current.isEnabled = false;
                    }
                    if(wasEnabled !== current.isEnabled || mappedProperty.isDeleted != appliedProperty.isDeleted) {
                        changed = true;
                    }
                    if(updateApplied) {
                        if(current.name !== diagProperty.propertyName || current.value !== diagProperty.value || appliedProperty.status !== diagProperty.status || current.isImportant !== diagProperty.important) {
                            changed = true;
                            current.name = diagProperty.propertyName;
                            current.value = diagProperty.value;
                            appliedProperty.status = diagProperty.status;
                            current.isImportant = diagProperty.important;
                            if(isDynamicUpdate) {
                                appliedProperty.wasCreatedInSession = false;
                                appliedProperty.original = new RemoteDom.AppliedPropertyValue(current.name, current.value, current.isImportant, current.isEnabled);
                            }
                        }
                        var originalLonghand = [];
                        var subPropertyNames = mappedProperty.propertyNames;
                        if(subPropertyNames.length && subPropertyNames === diagProperty.longhandNames) {
                            mappedProperty.forEachProperty(function (mappedLonghand, index) {
                                var longhandDiag = diagProperty.longhands[index];
                                var longhandApplied = mappedLonghand.appliedProperty;
                                mappedLonghand.diagProperty = diagProperty.longhands[index];
                                longhandApplied.current.value = longhandDiag.value;
                                longhandApplied.current.isImportant = longhandDiag.important;
                                longhandApplied.current.isEnabled = longhandDiag.enabled;
                                originalLonghand.push(new RemoteDom.AppliedPropertyValue(longhandDiag.propertyName, longhandDiag.value, longhandDiag.important, longhandDiag.enabled));
                            });
                        } else {
                            mappedProperty.forEachProperty(function (mappedSubProperty) {
                                _this._styleUtilities.unmapProperty(mappedSubProperty);
                            });
                            mappedProperty.clearProperties();
                            appliedProperty.longhand = [];
                            if(diagProperty.isShorthand) {
                                for(var i = 0; i < diagProperty.longhands.length; i++) {
                                    var diagLonghand = diagProperty.longhands[i];
                                    try  {
                                        var appliedLonghand = new RemoteDom.AppliedStyleProperty(new RemoteDom.AppliedPropertyValue(diagLonghand.propertyName, diagLonghand.value, diagLonghand.important, diagLonghand.enabled), diagLonghand.status);
                                        var mappedLonghand = new RemoteDom.MappedStyleProperty(appliedLonghand, this, diagLonghand, mappedProperty);
                                        mappedProperty.addProperty(mappedLonghand);
                                        originalLonghand.push(new RemoteDom.AppliedPropertyValue(diagLonghand.propertyName, diagLonghand.value, diagLonghand.important, diagLonghand.enabled));
                                        this._styleUtilities.mapProperty(mappedLonghand);
                                    } catch (ex) {
                                        Common.RemoteHelpers.encounteredException(ex);
                                    }
                                }
                            }
                            if(isDynamicUpdate) {
                                appliedProperty.originalLonghand = originalLonghand;
                            }
                        }
                    } else {
                        mappedProperty.forEachProperty(function (mappedLonghand, index) {
                            mappedLonghand.diagProperty = diagProperty.longhands[index];
                        });
                    }
                } catch (ex) {
                    Common.RemoteHelpers.encounteredException(ex);
                }
                return changed;
            };
            MappedStyleRule.prototype.commitChanges = function (setFunc, resetFunc, index) {
                if (typeof index === "undefined") { index = -1; }
                var _this = this;
                var oldLength = this.length;
                setFunc();
                var expectedLength = this.length;
                var isRemove = oldLength > expectedLength;
                if(!this.cachedStyle.update(this.cssText)) {
                    resetFunc();
                    return false;
                }
                var propertyList = this.cachedStyle.propertyList;
                var updateSucceeded = propertyList.length === expectedLength;
                if(!updateSucceeded) {
                    resetFunc();
                    this.cachedStyle.update(this.cssText);
                    propertyList = this.cachedStyle.propertyList;
                }
                this.forEachProperty(function (mappedProperty, nextIndex) {
                    var diagProperty = propertyList[nextIndex];
                    if(mappedProperty.isDeleted) {
                        diagProperty.enabled = false;
                    }
                    var needAppliedUpdate = updateSucceeded && !isRemove && (index < 0 || nextIndex === index);
                    _this.reconcileProperty(needAppliedUpdate, mappedProperty, diagProperty, false);
                });
                this._lastCssText = this.cachedStyle.style.cssText;
                return updateSucceeded;
            };
            MappedStyleRule.prototype.refresh = function (isDynamicUpdate) {
                var _this = this;
                var changes = [];
                if(this._lastCssText !== this.cachedStyle.style.cssText) {
                    var listCopy = [];
                    this.forEachProperty(function (mappedProperty, index) {
                        listCopy.push(mappedProperty);
                    });
                    var propertyList = this.cachedStyle.propertyList;
                    propertyList.forEach(function (diagProperty) {
                        for(var i = 0; i < listCopy.length; i++) {
                            var mappedProperty = listCopy[i];
                            if(mappedProperty.diagProperty.propertyName === diagProperty.propertyName) {
                                listCopy.splice(i, 1);
                                if(_this.reconcileProperty(true, mappedProperty, diagProperty, isDynamicUpdate)) {
                                    changes.push({
                                        event: "updateProperty",
                                        uid: mappedProperty.appliedProperty.uid,
                                        obj: mappedProperty.appliedProperty,
                                        isDynamic: isDynamicUpdate
                                    });
                                }
                                return;
                            }
                        }
                        var mappedProperty = _this._styleUtilities.processPropertyFromAppliedStyle(_this, _this, _this.cachedStyle, diagProperty, null, !isDynamicUpdate);
                        if(mappedProperty) {
                            _this.addProperty(mappedProperty);
                            _this._styleUtilities.mapProperty(mappedProperty);
                            mappedProperty.appliedProperty.isApplied = _this._styleUtilities.getAppliedState(mappedProperty);
                            changes.push({
                                event: "addProperty",
                                uid: mappedProperty.mappedRule.appliedRule.uid,
                                obj: mappedProperty.appliedProperty,
                                isDynamic: isDynamicUpdate
                            });
                        }
                    });
                    listCopy.forEach(function (mappedProperty) {
                        _this.removeProperty(mappedProperty);
                        _this._styleUtilities.unmapProperty(mappedProperty);
                        changes.push({
                            event: "removeProperty",
                            uid: mappedProperty.appliedProperty.uid,
                            isDynamic: isDynamicUpdate
                        });
                    });
                    this._lastCssText = this.cachedStyle.style.cssText;
                }
                return changes;
            };
            return MappedStyleRule;
        })(RemoteDom.MappedStylePropertyCollection);
        RemoteDom.MappedStyleRule = MappedStyleRule;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/mappedStyleRule.js.map

// diagnosticProperty.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var DiagnosticProperty = (function () {
            function DiagnosticProperty(diagProperty, isParsed, _cachedStyle) {
                this.isParsed = isParsed;
                this._cachedStyle = _cachedStyle;
                this.update(diagProperty);
                if(this.isEmptyInvalid) {
                    this.enabled = false;
                }
            }
            DiagnosticProperty.VALID_STATUS = "Valid";
            DiagnosticProperty.UNRECOGNIZED_STATUS = "UnrecognizedProperty";
            DiagnosticProperty.INVALID_VALUE_STATUS = "InvalidValue";
            DiagnosticProperty.InvalidEmptyProperties = [
                "background", 
                "background-image", 
                "background-attachment", 
                "background-repeat", 
                "background-position-x", 
                "background-position-y", 
                "background-size", 
                "background-origin", 
                "background-clip", 
                "background-color", 
                "border-image", 
                "content", 
                "font-family", 
                "quotes", 
                
            ];
            Object.defineProperty(DiagnosticProperty.prototype, "longhandNames", {
                get: function () {
                    var names = "";
                    if(this.isShorthand) {
                        this.longhands.forEach(function (longhandDiagProperty) {
                            names += "." + longhandDiagProperty.propertyName;
                        });
                    }
                    return names;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "activeInBlock", {
                get: function () {
                    return this._diagProperty.activeInBlock;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "enabled", {
                get: function () {
                    return this._diagProperty.enabled;
                },
                set: function (value) {
                    var wasAllowed = this._cachedStyle.allowMutations;
                    this._cachedStyle.allowMutations = false;
                    this._diagProperty.enabled = value;
                    this._cachedStyle.allowMutations = wasAllowed;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "important", {
                get: function () {
                    return this._diagProperty.important;
                },
                set: function (newImportant) {
                    this._diagProperty.important = newImportant;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "isShorthand", {
                get: function () {
                    return this.isValid && this._diagProperty.longhands.length > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "propertyName", {
                get: function () {
                    return this._diagProperty.propertyName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "value", {
                get: function () {
                    return this._diagProperty.value;
                },
                set: function (newValue) {
                    this._diagProperty.value = newValue;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "status", {
                get: function () {
                    return this.isEmptyInvalid ? "InvalidValue" : this._diagProperty.status;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "isValid", {
                get: function () {
                    return this.status === DiagnosticProperty.VALID_STATUS;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DiagnosticProperty.prototype, "isEmptyInvalid", {
                get: function () {
                    return this._diagProperty.value.length === 0 && DiagnosticProperty.InvalidEmptyProperties.indexOf(this._diagProperty.propertyName) >= 0;
                },
                enumerable: true,
                configurable: true
            });
            DiagnosticProperty.prototype.update = function (diagProperty) {
                if(this._diagProperty && this.isParsed) {
                    this._diagProperty.enabled = false;
                }
                this._diagProperty = diagProperty;
                this.longhands = [];
                if(diagProperty.longhands && diagProperty.longhands.length) {
                    for(var i = 0; i < diagProperty.longhands.length; i++) {
                        try  {
                            var longhandDiag = diagProperty.longhands[i];
                            if(longhandDiag.status) {
                                this.longhands.push(new DiagnosticProperty(longhandDiag, false, this._cachedStyle));
                            }
                        } catch (ex) {
                            Common.RemoteHelpers.encounteredException(ex);
                        }
                    }
                }
            };
            return DiagnosticProperty;
        })();
        RemoteDom.DiagnosticProperty = DiagnosticProperty;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/diagnosticProperty.js.map

// cachedStyle.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var CachedStyle = (function () {
            function CachedStyle(style, rule) {
                this.style = style;
                this.rule = rule;
                this.allowMutations = true;
                this.uid = remoteHelpers.getUid();
                if(this.rule) {
                    try  {
                        var location = styles.getSourceLocation(this.style);
                        if(location && location.fileURI) {
                            this.source = {
                                uri: location.fileURI,
                                line: location.line,
                                column: location.column
                            };
                        }
                    } catch (e) {
                        Common.RemoteHelpers.encounteredException(e);
                    }
                }
            }
            Object.defineProperty(CachedStyle.prototype, "propertyList", {
                get: function () {
                    this.refresh(false);
                    return this._propertyList;
                },
                enumerable: true,
                configurable: true
            });
            CachedStyle.prototype.update = function (cssText) {
                try  {
                    this.allowMutations = false;
                    this.style.cssText = cssText;
                    this.refresh(true);
                    this.allowMutations = true;
                    return true;
                } catch (e) {
                    this.allowMutations = true;
                    return false;
                }
            };
            CachedStyle.prototype.refresh = function (force) {
                if(force || !this._propertyList || this._lastCssText !== this.style.cssText) {
                    var parsedList = styles.getParsedPropertyList(this.style);
                    var mergedList = [];
                    for(var i = 0; i < parsedList.length; i++) {
                        this.addProperty(parsedList[i], true, mergedList);
                    }
                    var dynamicList = styles.getDynamicPropertyList(this.style);
                    for(i = 0; i < dynamicList.length; i++) {
                        var dynamicProperty = dynamicList[i];
                        var found = false;
                        for(var j = mergedList.length - 1; !found && j >= 0; j--) {
                            var parsedProperty = mergedList[j];
                            try  {
                                if(parsedProperty.propertyName === dynamicProperty.propertyName) {
                                    parsedProperty.update(dynamicProperty);
                                    parsedProperty.isParsed = false;
                                    found = true;
                                }
                            } catch (e) {
                                Common.RemoteHelpers.encounteredException(e);
                            }
                        }
                        if(!found) {
                            this.addProperty(dynamicProperty, false, mergedList);
                        }
                    }
                    this._propertyList = mergedList;
                    this._lastCssText = this.style.cssText;
                }
            };
            CachedStyle.prototype.addProperty = function (diagProperty, isParsed, mergedList) {
                var prop;
                try  {
                    prop = new RemoteDom.DiagnosticProperty(diagProperty, isParsed, this);
                } catch (ex) {
                    Common.RemoteHelpers.encounteredException(ex);
                }
                if(prop) {
                    mergedList.push(prop);
                }
            };
            return CachedStyle;
        })();
        RemoteDom.CachedStyle = CachedStyle;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/cachedStyle.js.map

// remoteStyleCache.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var RemoteStyleCache = (function () {
            function RemoteStyleCache(_styleUtilities, _messageHandlers) {
                this._styleUtilities = _styleUtilities;
                this._messageHandlers = _messageHandlers;
                this._cache = [];
            }
            RemoteStyleCache.prototype.lookup = function (style, element) {
                var cachedStyle;
                for(var i = 0; i < this._cache.length; i++) {
                    if(this._cache[i].style === style) {
                        cachedStyle = this._cache[i];
                        break;
                    }
                }
                if(!cachedStyle) {
                    var rule = Common.RemoteHelpers.getRuleForStyleObject(style, element);
                    cachedStyle = new RemoteDom.CachedStyle(style, rule);
                    this._cache.push(cachedStyle);
                }
                return cachedStyle;
            };
            RemoteStyleCache.prototype.clear = function () {
                this._cache = [];
            };
            RemoteStyleCache.prototype.forEach = function (func) {
                for(var i = 0; i < this._cache.length; i++) {
                    func(this._cache[i]);
                }
            };
            return RemoteStyleCache;
        })();
        RemoteDom.RemoteStyleCache = RemoteStyleCache;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/remoteStyleCache.js.map

// styleUtilities.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var StyleUtilities = (function () {
            function StyleUtilities(_messageHandlers, _domUtilities) {
                this._messageHandlers = _messageHandlers;
                this._domUtilities = _domUtilities;
                this._propertyMap = new RemoteDom.StylePropertyMap();
                this._ruleMap = new RemoteDom.StyleRuleMap();
                this._currentRules = [];
                this._forcedPseudoStyling = {
                };
                this._dummyTracedStyles = {
                    getAppliedProperties: function () {
                        return [];
                    },
                    getAppliedStyles: function (filter) {
                        return [];
                    },
                    getInheritanceChain: function (filter) {
                        return [];
                    },
                    isInheritable: function (property) {
                        return false;
                    }
                };
                this.styleProperties = [
                    "margin-top", 
                    "margin-right", 
                    "margin-left", 
                    "margin-bottom", 
                    "padding-top", 
                    "padding-right", 
                    "padding-left", 
                    "padding-bottom", 
                    "border-top-width", 
                    "border-right-width", 
                    "border-left-width", 
                    "border-bottom-width", 
                    "width", 
                    "height", 
                    "left", 
                    "top"
                ];
                this.elementProperties = [
                    "clientHeight", 
                    "clientWidth", 
                    "clientTop", 
                    "clientLeft", 
                    "offsetLeft", 
                    "offsetTop"
                ];
                this._styleCache = new RemoteDom.RemoteStyleCache(this, this._messageHandlers);
            }
            StyleUtilities.prototype.getComputedStyle = function (element) {
                var doc = element.ownerDocument;
                var win = Common.RemoteHelpers.getDefaultView(doc);
                return Common.RemoteHelpers.getComputedStyle(win, element);
            };
            StyleUtilities.prototype.standardizeLayoutUnits = function (value) {
                if(value === undefined || value === null) {
                    return;
                }
                var groups = String.prototype.match.call(value.toString(), /^(-?[0-9]+(?:\.[0-9]*)?)\s*([a-z]*)$/);
                if(groups && groups.length > 1) {
                    if(groups[1] === 0) {
                        value = "0";
                    } else {
                        var decIndex = groups[1].indexOf(".");
                        if(decIndex > -1 && (groups[1].length - decIndex) > 3) {
                            value = "" + parseFloat(groups[1]).toFixed(2) + groups[2];
                        }
                        if(!groups[2]) {
                            value += "px";
                        }
                    }
                }
                return value;
            };
            StyleUtilities.prototype.stylechange = function (changes) {
                this._domUtilities.mediaStyleChangeCallback(changes);
            };
            StyleUtilities.prototype.styleAttrModified = function (element) {
                try  {
                    for(var i = 0; i < this._currentRules.length; i++) {
                        var mappedRule = this._currentRules[i];
                        if(mappedRule.cachedStyle.style === element.style) {
                            if(mappedRule.cachedStyle.allowMutations) {
                                var changes = mappedRule.refresh(element !== this.editingElement);
                                if(changes.length) {
                                    this.stylechange(changes);
                                }
                            }
                            break;
                        }
                    }
                } catch (e) {
                }
            };
            StyleUtilities.prototype.refreshCurrentRules = function (element) {
                this._currentElement = element;
                this._currentRules = this.getCurrentRules();
                var retVal = [];
                for(var i = 0; i < this._currentRules.length; i++) {
                    var rule = this._currentRules[i].appliedRule;
                    if(!rule.wasCreatedInSession || !rule.isDeleted) {
                        retVal.push(rule);
                    }
                }
                return retVal;
            };
            StyleUtilities.prototype.getChangedRules = function () {
                var _this = this;
                var rules = [];
                this._styleCache.forEach(function (cachedStyle) {
                    var mappedRule = _this.lookupMappedRule(cachedStyle.uid);
                    if(mappedRule && mappedRule.appliedRule.hasChanged) {
                        rules.push(mappedRule.appliedRule);
                    }
                });
                return rules;
            };
            StyleUtilities.prototype.lookupMappedRule = function (ruleUid) {
                return this._ruleMap.lookupByUid(ruleUid);
            };
            StyleUtilities.prototype.lookupMappedProperty = function (propertyUid) {
                return this._propertyMap.lookupByUid(propertyUid);
            };
            StyleUtilities.prototype.mapRule = function (mappedRule) {
                var _this = this;
                this._ruleMap.add(mappedRule.appliedRule.uid, mappedRule);
                mappedRule.forEachProperty(function (mappedProperty) {
                    _this.mapProperty(mappedProperty);
                    mappedProperty.forEachProperty(function (mappedSubProperty) {
                        _this.mapProperty(mappedSubProperty);
                    });
                });
            };
            StyleUtilities.prototype.unmapRule = function (mappedRule) {
                var _this = this;
                this._ruleMap.remove(mappedRule.appliedRule.uid);
                mappedRule.forEachProperty(function (mappedProperty) {
                    _this.unmapProperty(mappedProperty);
                    mappedProperty.forEachProperty(function (mappedSubProperty) {
                        _this.unmapProperty(mappedSubProperty);
                    });
                });
            };
            StyleUtilities.prototype.mapProperty = function (mappedProperty) {
                this._propertyMap.add(mappedProperty.appliedProperty.uid, mappedProperty);
            };
            StyleUtilities.prototype.unmapProperty = function (mappedProperty) {
                this._propertyMap.remove(mappedProperty.appliedProperty.uid);
            };
            StyleUtilities.prototype.addNewRule = function (selector, position, oldMappedRule) {
                var mappedRule = this.addRule(selector, position, oldMappedRule);
                if(mappedRule) {
                    this.mapRule(mappedRule);
                }
                return mappedRule;
            };
            StyleUtilities.prototype.getRulePosition = function (mappedRule) {
                var position = this._currentRules.length;
                for(var i = 0; i < this._currentRules.length; i++) {
                    if(this._currentRules[i].appliedRule.uid === mappedRule.appliedRule.uid) {
                        position = i;
                        break;
                    }
                }
                return position;
            };
            StyleUtilities.prototype.getRuleByPosition = function (position) {
                if(position >= 0 && position < this._currentRules.length) {
                    return this._currentRules[position];
                }
            };
            StyleUtilities.prototype.getCurrentRules = function () {
                var _this = this;
                styles.calculateTracedStyles(this._currentElement);
                var rules = [];
                var haveInlineStyle;
                this._tracedStyles = this.getSafeTracedStyles(this._currentElement);
                var styleObjectsEncountered = [];
                var mappedRule;
                this._tracedStyles.getInheritanceChain().forEach(function (traceElement) {
                    var isInherited = traceElement !== _this._currentElement;
                    var appliedStyles = _this.getSafeTracedStyles(traceElement).getAppliedStyles();
                    appliedStyles.forEach(function (style) {
                        if(styleObjectsEncountered.indexOf(style) < 0) {
                            styleObjectsEncountered.push(style);
                            try  {
                                var isInline = style === traceElement.style;
                                if(isInline && traceElement === _this._currentElement) {
                                    haveInlineStyle = true;
                                }
                                rules.push(_this.processRuleFromAppliedStyle(traceElement, _this._styleCache.lookup(style, traceElement), isInherited));
                            } catch (ex) {
                            }
                        }
                    });
                });
                if(!haveInlineStyle) {
                    var inlineStyle = this._styleCache.lookup(this._currentElement.style, this._currentElement);
                    mappedRule = this.processRuleFromAppliedStyle(this._currentElement, inlineStyle, false);
                    rules.unshift(mappedRule);
                }
                var winningRuleMap = {
                };
                var appliedRules = [];
                rules.forEach(function (mappedRule) {
                    _this.determineAppliedAndWinningState(mappedRule, winningRuleMap);
                    if((mappedRule.appliedRule.isInlined && !mappedRule.appliedRule.isInherited) || mappedRule.hasAppliedProperties) {
                        appliedRules.push(mappedRule);
                    }
                });
                return appliedRules;
            };
            StyleUtilities.prototype.getAppliedState = function (mappedProperty) {
                return !mappedProperty.mappedRule.appliedRule.isInherited || mappedProperty.diagProperty.status === RemoteDom.DiagnosticProperty.UNRECOGNIZED_STATUS || this._tracedStyles.isInheritable(mappedProperty.diagProperty.propertyName);
            };
            StyleUtilities.prototype.processPropertyFromAppliedStyle = function (mappedPropertyCollection, mappedRule, cachedStyle, diagProperty, owner, wasCreatedInSession) {
                if (typeof wasCreatedInSession === "undefined") { wasCreatedInSession = false; }
                var propertyName = diagProperty.propertyName;
                var isEnabled = diagProperty.enabled && diagProperty.isValid;
                var property = new RemoteDom.AppliedStyleProperty(new RemoteDom.AppliedPropertyValue(propertyName, diagProperty.value, diagProperty.important, isEnabled), diagProperty.status, wasCreatedInSession);
                var mappedProperty = new RemoteDom.MappedStyleProperty(property, mappedRule, diagProperty, owner);
                if(diagProperty.isShorthand) {
                    this.processPropertyListFromAppliedStyle(mappedProperty, mappedRule, cachedStyle, diagProperty.longhands, mappedProperty);
                }
                return mappedProperty;
            };
            StyleUtilities.prototype.getWinningProperty = function (propertyName) {
                var winningStyleUid = this.calculateWinningStyle(propertyName);
                for(var i = 0; i < this._currentRules.length; i++) {
                    var currentRule = this._currentRules[i];
                    if(currentRule.cachedStyle.uid === winningStyleUid) {
                        var mappedProperty = currentRule.lookupActiveMappedProperty(propertyName);
                        if(mappedProperty) {
                            return mappedProperty;
                        }
                    }
                }
            };
            StyleUtilities.prototype.copyElementWithStyle = function (element) {
                var elementCopier = new F12.RemoteDom.RemoteElementCopier(styles);
                return elementCopier.computeHtmlForAncestorsAndDescendants(element);
            };
            StyleUtilities.prototype.getElementForStyle = function (uid) {
                var mappedRule = this.lookupMappedRule(uid);
                if(mappedRule && mappedRule.appliedRule.isInlined) {
                    return mappedRule.element;
                }
            };
            StyleUtilities.prototype.clearCache = function (unsetPseudoStyling) {
                this._styleCache.clear();
                this._ruleMap.clear();
                this._propertyMap.clear();
                this.clearForcedPseudoStyling(unsetPseudoStyling);
            };
            StyleUtilities.prototype.setPseudoStyling = function (element, state, isSet) {
                var list = this._forcedPseudoStyling[state];
                if(!list) {
                    list = this._forcedPseudoStyling[state] = [];
                }
                if(isSet) {
                    list.push(element);
                } else {
                    var index = list.indexOf(element);
                    if(index >= 0) {
                        list.splice(list.indexOf(element), 1);
                    }
                }
                switch(state.toLowerCase()) {
                    case "active":
                        emulation.setActiveStyling(element, isSet);
                        break;
                    case "focus":
                        emulation.setFocusStyling(element, isSet);
                        break;
                    case "hover":
                        emulation.setHoverStyling(element, isSet);
                        break;
                    case "visited":
                        emulation.setVisitedStyling(element, isSet);
                        break;
                    case "link":
                        emulation.setLinkStyling(element, isSet);
                        break;
                }
            };
            StyleUtilities.prototype.getPseudoStyling = function (element, state) {
                var list = this._forcedPseudoStyling[state];
                return list ? list.indexOf(element) >= 0 : false;
            };
            StyleUtilities.prototype.addCurrentRule = function (newMappedRule, position) {
                this._currentRules.splice(position, 0, newMappedRule);
            };
            StyleUtilities.prototype.replaceCurrentRule = function (newMappedRule, replacedMappedRule) {
                for(var i = 0; i < this._currentRules.length; i++) {
                    if(this._currentRules[i] === replacedMappedRule) {
                        this._currentRules[i] = newMappedRule;
                        break;
                    }
                }
            };
            StyleUtilities.prototype.clearForcedPseudoStyling = function (doSetFalse) {
                var _this = this;
                if(doSetFalse) {
                    for(var state in this._forcedPseudoStyling) {
                        var list = this._forcedPseudoStyling[state];
                        if(list) {
                            list.forEach(function (element) {
                                _this.setPseudoStyling(element, state, false);
                            });
                        }
                    }
                }
                this._forcedPseudoStyling = {
                };
            };
            StyleUtilities.prototype.findStyleSheetByTitle = function (title) {
                for(var i = 0; i < mainBrowser.document.styleSheets.length; i++) {
                    var sheet = mainBrowser.document.styleSheets[i];
                    if(sheet.title === title) {
                        return sheet;
                    }
                }
            };
            StyleUtilities.prototype.addRule = function (selector, position, oldMappedRule) {
                var mappedRule;
                try  {
                    var sheet;
                    var oldRule;
                    var oldMediaRuleSelector;
                    if(oldMappedRule) {
                        oldRule = oldMappedRule.cachedStyle.rule;
                        if(oldRule) {
                            sheet = oldRule.parentStyleSheet;
                            var parentRule = oldRule.parentRule;
                            if(parentRule && parentRule.media) {
                                oldMediaRuleSelector = parentRule.media.mediaText;
                            }
                        }
                    }
                    if(!sheet) {
                        if(!this._newRuleStyleSheet) {
                            var styleElement = mainBrowser.document.createElement("style");
                            mainBrowser.document.getElementsByTagName("head")[0].appendChild(styleElement);
                            styleElement.title = "__BROWSERTOOLS_DOMEXPLORER_DYNAMIC_STYLES";
                            this._newRuleStyleSheet = this.findStyleSheetByTitle(styleElement.title);
                            styleElement.title = "";
                        }
                        sheet = this._newRuleStyleSheet;
                    }
                    var index;
                    if(sheet.insertRule) {
                        var ruleText = RemoteDom.MappedStyleRule.prepareSelector(selector) + " { }";
                        if(oldMediaRuleSelector) {
                            ruleText = "@media " + oldMediaRuleSelector + " { " + ruleText + " }";
                        }
                        index = 0;
                        sheet.insertRule(ruleText, index);
                    } else {
                        index = sheet.rules.length;
                        sheet.addRule(selector, "cursor: inherit;", index);
                    }
                    var rule = sheet.rules[index];
                    rule.style.cssText = "";
                    styles.calculateTracedStyles(this._currentElement);
                    var tracedStyles = this.getSafeTracedStyles(this._currentElement);
                    var wasCreatedInSession = oldMappedRule ? oldMappedRule.appliedRule.wasCreatedInSession : true;
                    mappedRule = this.processRuleFromAppliedStyle(this._currentElement, this._styleCache.lookup(rule.style, this._currentElement), false, wasCreatedInSession);
                    this.determineAppliedAndWinningState(mappedRule, tracedStyles);
                    if(oldMappedRule) {
                        this.replaceCurrentRule(mappedRule, oldMappedRule);
                        var appliedRule = oldMappedRule.appliedRule;
                        mappedRule.appliedRule.styleHref = appliedRule.styleHref;
                        mappedRule.appliedRule.declarationLocation = appliedRule.declarationLocation;
                        mappedRule.appliedRule.isInherited = appliedRule.isInherited;
                    } else {
                        this.addCurrentRule(mappedRule, position);
                    }
                } catch (ex) {
                }
                return mappedRule;
            };
            StyleUtilities.prototype.determineAppliedAndWinningState = function (mappedRule, winningRuleMap) {
                var _this = this;
                mappedRule.forEachProperty(function (mappedProperty) {
                    var isApplied = _this.getAppliedState(mappedProperty);
                    mappedProperty.appliedProperty.isApplied = isApplied;
                    mappedProperty.appliedProperty.isWinning = isApplied && _this.getWinningState(mappedProperty, winningRuleMap);
                });
            };
            StyleUtilities.prototype.getWinningState = function (mappedProperty, winningRuleMap) {
                var _this = this;
                var diagProperty = mappedProperty.diagProperty;
                try  {
                    var styleUid = mappedProperty.mappedRule.cachedStyle.uid;
                    if(mappedProperty.isEmpty) {
                        return diagProperty.activeInBlock && diagProperty.enabled && diagProperty.isValid && this.calculateWinningStyle(diagProperty.propertyName, winningRuleMap) === styleUid;
                    }
                    var winningCount = 0;
                    if(diagProperty.activeInBlock) {
                        mappedProperty.forEachProperty(function (longhandMappedProperty) {
                            longhandMappedProperty.appliedProperty.isWinning = _this.getWinningState(longhandMappedProperty, winningRuleMap);
                            if(longhandMappedProperty.appliedProperty.isWinning) {
                                winningCount++;
                            }
                        });
                    }
                    return winningCount > 0;
                } catch (ex) {
                    Common.RemoteHelpers.encounteredException(ex);
                }
                return false;
            };
            StyleUtilities.prototype.processRuleFromAppliedStyle = function (element, cachedStyle, isInherited, wasCreatedInSession) {
                if (typeof wasCreatedInSession === "undefined") { wasCreatedInSession = false; }
                var mappedRule = this.lookupMappedRule(cachedStyle.uid);
                if(!mappedRule) {
                    var appliedRule = new RemoteDom.AppliedStyleRule(element, cachedStyle, wasCreatedInSession);
                    var mappedRule = new RemoteDom.MappedStyleRule(this, appliedRule, cachedStyle, element);
                    this.processPropertyListFromAppliedStyle(mappedRule, mappedRule, cachedStyle, cachedStyle.propertyList);
                    this.mapRule(mappedRule);
                }
                mappedRule.refresh(!wasCreatedInSession);
                mappedRule.appliedRule.setIsInheritedAndTarget(isInherited, this._messageHandlers, element);
                return mappedRule;
            };
            StyleUtilities.prototype.processPropertyListFromAppliedStyle = function (mappedPropertyCollection, mappedRule, cachedStyle, propertyList, owner) {
                if(propertyList) {
                    for(var propertyIndex = 0; propertyIndex < propertyList.length; propertyIndex++) {
                        var diagProperty = propertyList[propertyIndex];
                        try  {
                            var mappedProperty = this.processPropertyFromAppliedStyle(mappedPropertyCollection, mappedRule, cachedStyle, diagProperty, owner);
                            if(mappedProperty) {
                                mappedPropertyCollection.addProperty(mappedProperty);
                            }
                        } catch (e) {
                            Common.RemoteHelpers.encounteredException(e);
                        }
                    }
                }
            };
            StyleUtilities.prototype.checkPropertyListForWinningProperty = function (propertyName, propertyList) {
                if(propertyList) {
                    for(var p = 0; p < propertyList.length; p++) {
                        var diagProperty = propertyList[p];
                        try  {
                            if(diagProperty.enabled && diagProperty.activeInBlock) {
                                if(diagProperty.longhands && diagProperty.longhands.length) {
                                    for(var l = 0; l < diagProperty.longhands.length; l++) {
                                        try  {
                                            var longhand = diagProperty.longhands[l];
                                            if(longhand.activeInBlock && longhand.enabled && longhand.propertyName === propertyName) {
                                                return true;
                                            }
                                        } catch (e) {
                                            Common.RemoteHelpers.encounteredException(e);
                                        }
                                    }
                                } else if(diagProperty.propertyName === propertyName) {
                                    return true;
                                }
                            }
                        } catch (e) {
                            Common.RemoteHelpers.encounteredException(e);
                        }
                    }
                }
            };
            StyleUtilities.prototype.checkInheritanceChainForWinningStyle = function (propertyName) {
                styles.calculateTracedStyles(this._currentElement);
                var tracedStyles = this.getSafeTracedStyles(this._currentElement);
                try  {
                    var inheritanceChain = tracedStyles.getInheritanceChain(propertyName);
                    var styleObjectsEncountered = [];
                    for(var i = 0; i < inheritanceChain.length; i++) {
                        var traceElement = inheritanceChain[i];
                        var appliedStyles = this.getSafeTracedStyles(traceElement).getAppliedStyles(propertyName);
                        for(var j = 0; j < appliedStyles.length; j++) {
                            var style = this._styleCache.lookup(appliedStyles[j], traceElement);
                            var property = this.checkPropertyListForWinningProperty(propertyName, style.propertyList);
                            if(property) {
                                return style.uid;
                            }
                        }
                    }
                } catch (e) {
                    Common.RemoteHelpers.encounteredException(e);
                }
            };
            StyleUtilities.prototype.calculateWinningStyle = function (propertyName, winningRuleMap) {
                var winningStyle;
                if(winningRuleMap && winningRuleMap.hasOwnProperty(propertyName)) {
                    winningStyle = winningRuleMap[propertyName];
                } else {
                    winningStyle = this.checkInheritanceChainForWinningStyle(propertyName);
                    if(winningRuleMap) {
                        winningRuleMap[propertyName] = winningStyle;
                    }
                }
                return winningStyle;
            };
            StyleUtilities.prototype.getSafeTracedStyles = function (element) {
                try  {
                    if(element) {
                        return styles.getTracedStyles(element);
                    }
                } catch (ex) {
                    Common.RemoteHelpers.encounteredException(ex);
                }
                return this._dummyTracedStyles;
            };
            return StyleUtilities;
        })();
        RemoteDom.StyleUtilities = StyleUtilities;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/styleUtilities.js.map

// addElement.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var AddElement = (function () {
            function AddElement(_element, _beforeElement, _htmlText) {
                this._element = _element;
                this._beforeElement = _beforeElement;
                this._htmlText = _htmlText;
                this._newElements = [];
                this.type = "AddElement";
            }
            AddElement.createElements = function createElements(document, htmlText, parentTag) {
                if (typeof parentTag === "undefined") { parentTag = "div"; }
                var div = document.createElement(parentTag);
                var view = Common.RemoteHelpers.getDefaultView(document);
                if(view.WinJS) {
                    view.WinJS.Utilities.setInnerHTMLUnsafe(div, htmlText);
                } else {
                    div.innerHTML = htmlText;
                }
                var newElements = [];
                for(var i = 0; i < div.childNodes.length; i++) {
                    var element = div.childNodes.item(i);
                    newElements.push(element);
                }
                return newElements;
            };
            AddElement.prototype.description = function () {
                return this.type;
            };
            AddElement.prototype.performUndo = function () {
                for(var i = 0; i < this._newElements.length; i++) {
                    this._element.removeChild(this._newElements[i]);
                }
                return true;
            };
            AddElement.prototype.performEdit = function () {
                this._newElements = AddElement.createElements(this._element.ownerDocument, this._htmlText, this._element.tagName);
                for(var i = 0; i < this._newElements.length; i++) {
                    if(!this._beforeElement) {
                        this._element.appendChild(this._newElements[i]);
                    } else {
                        this._element.insertBefore(this._newElements[i], this._beforeElement);
                    }
                }
                return true;
            };
            return AddElement;
        })();
        RemoteDom.AddElement = AddElement;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/addElement.js.map

// deleteElement.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var DeleteElement = (function () {
            function DeleteElement(_element, _isStyle) {
                this._element = _element;
                this._isStyle = _isStyle;
                this.type = "DeleteElement";
            }
            DeleteElement.prototype.description = function () {
                return this.type;
            };
            DeleteElement.prototype.performUndo = function () {
                if(this._isStyle) {
                    this._element.innerHTML = this._oldStyle;
                    return true;
                } else {
                    if(this._nextSibling) {
                        this._oldParent.insertBefore(this._element, this._nextSibling);
                    } else {
                        this._oldParent.appendChild(this._element);
                    }
                    return true;
                }
            };
            DeleteElement.prototype.performEdit = function () {
                if(this._isStyle) {
                    this._oldStyle = this._element.innerHTML;
                    this._element.innerHTML = "";
                    return true;
                } else {
                    this._nextSibling = (this._element.nextElementSibling ? this._element.nextElementSibling : this._element.nextSibling);
                    this._oldParent = this._element.parentNode;
                    this._element.parentNode.removeChild(this._element);
                    if(Common.RemoteHelpers.getDocumentMode() >= 9) {
                        this._element.parentNode = null;
                    }
                    return true;
                }
            };
            return DeleteElement;
        })();
        RemoteDom.DeleteElement = DeleteElement;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/deleteElement.js.map

// editAttribute.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditAttribute = (function () {
            function EditAttribute(_styleUtilities, htmlTreeHelpers, _element, _name, _newValue) {
                this._styleUtilities = _styleUtilities;
                this._element = _element;
                this._name = _name;
                this._newValue = _newValue;
                this._htmlTreeHelpers = htmlTreeHelpers;
                this.type = "EditAttribute";
                if(this._name === "value" && htmlTreeHelpers.hasSpecialValueAttribute(this._element)) {
                    this._valueElement = this._element;
                    this._oldValue = this._valueElement.value;
                } else {
                    this._oldValue = this._element.getAttribute(this._name);
                }
            }
            EditAttribute.prototype.description = function () {
                return this.type;
            };
            EditAttribute.prototype.performUndo = function () {
                if(this._name === "style") {
                    this._styleUtilities.editingElement = this._element;
                }
                if(this._valueElement) {
                    this._valueElement.value = this._oldValue;
                } else {
                    if(!this._oldValue) {
                        if(this._name === "style") {
                            this._element.setAttribute(this._name, "color:inherit");
                            if(Common.RemoteHelpers.getDocumentMode() < 9) {
                                this._styleUtilities.styleAttrModified(this._element);
                            }
                        }
                        this._element.removeAttribute(this._name);
                    } else {
                        this._element.setAttribute(this._name, this._oldValue);
                    }
                }
                this._styleUtilities.editingElement = null;
                return true;
            };
            EditAttribute.prototype.performEdit = function () {
                var isSuccess = true;
                if(this._name === "style") {
                    this._styleUtilities.editingElement = this._element;
                }
                if(this._valueElement) {
                    this._valueElement.value = this._newValue;
                    RemoteDom.domUtilities.getMutationManager().fireAttributeModified(this._element, this._name, this._newValue, 1);
                } else {
                    try  {
                        this._element.setAttribute(this._name, this._newValue);
                        if(this._name === "style" && Common.RemoteHelpers.getDocumentMode() < 9) {
                            this._styleUtilities.styleAttrModified(this._element);
                        }
                    } catch (ex) {
                        isSuccess = false;
                    }
                }
                this._styleUtilities.editingElement = null;
                return isSuccess;
            };
            return EditAttribute;
        })();
        RemoteDom.EditAttribute = EditAttribute;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editAttribute.js.map

// editStylePropertyAdd.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditStylePropertyAdd = (function () {
            function EditStylePropertyAdd(_styleUtilities, _mappedRule, _newName, _newValue, _newIsImportant, _beforeUid) {
                this._styleUtilities = _styleUtilities;
                this._mappedRule = _mappedRule;
                this._newName = _newName;
                this._newValue = _newValue;
                this._newIsImportant = _newIsImportant;
                this._beforeUid = _beforeUid;
                this.type = "EditStylePropertyAdd";
            }
            EditStylePropertyAdd.prototype.description = function () {
                return this.type;
            };
            EditStylePropertyAdd.prototype.performEdit = function (isRedo) {
                this._mappedProperty = this._mappedRule.propertyAdd(this._newName, this._newValue, this._newIsImportant, true, this._mappedProperty, this._beforeUid);
                if(this._mappedProperty) {
                    var appliedProperty = this._mappedProperty.appliedProperty;
                    if(isRedo) {
                        this._styleUtilities.stylechange([
                            {
                                event: "addProperty",
                                uid: this._mappedRule.appliedRule.uid,
                                obj: appliedProperty,
                                beforeUid: this._beforeUid
                            }
                        ]);
                    } else {
                        appliedProperty.isApplied = true;
                    }
                    this.result = appliedProperty;
                    return true;
                }
                return false;
            };
            EditStylePropertyAdd.prototype.performUndo = function () {
                this._mappedRule.propertyHardRemove(this._mappedProperty);
                this._styleUtilities.stylechange([
                    {
                        event: "removeProperty",
                        uid: this._mappedProperty.appliedProperty.uid
                    }
                ]);
                return true;
            };
            return EditStylePropertyAdd;
        })();
        RemoteDom.EditStylePropertyAdd = EditStylePropertyAdd;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editStylePropertyAdd.js.map

// editStylePropertyEnable.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditStylePropertyEnable = (function () {
            function EditStylePropertyEnable(_styleUtilities, _mappedProperty, _newValue) {
                this._styleUtilities = _styleUtilities;
                this._mappedProperty = _mappedProperty;
                this._newValue = _newValue;
                this._oldValue = this._mappedProperty.appliedProperty.current.isEnabled;
                this.type = "EditStylePropertyEnable";
            }
            EditStylePropertyEnable.prototype.description = function () {
                return this.type;
            };
            EditStylePropertyEnable.prototype.performUndo = function () {
                if(this._newValue !== this._oldValue) {
                    this._mappedProperty.setEnabled(this._oldValue);
                    var appliedProperty = this._mappedProperty.appliedProperty;
                    this._styleUtilities.stylechange([
                        {
                            event: "updateProperty",
                            uid: appliedProperty.uid,
                            obj: appliedProperty
                        }
                    ]);
                    return true;
                }
                return false;
            };
            EditStylePropertyEnable.prototype.performEdit = function (isRedo) {
                if(this._newValue !== this._oldValue) {
                    this._mappedProperty.setEnabled(this._newValue);
                    if(isRedo) {
                        var appliedProperty = this._mappedProperty.appliedProperty;
                        this._styleUtilities.stylechange([
                            {
                                event: "updateProperty",
                                uid: appliedProperty.uid,
                                obj: appliedProperty
                            }
                        ]);
                    }
                    return true;
                }
                return false;
            };
            return EditStylePropertyEnable;
        })();
        RemoteDom.EditStylePropertyEnable = EditStylePropertyEnable;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editStylePropertyEnable.js.map

// editStylePropertyName.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditStylePropertyName = (function () {
            function EditStylePropertyName(_styleUtilities, _mappedProperty, _newName) {
                this._styleUtilities = _styleUtilities;
                this._mappedProperty = _mappedProperty;
                this._newName = _newName;
                this.type = "EditStylePropertyName";
                var appliedProperty = this._mappedProperty.appliedProperty;
                this._oldName = appliedProperty.current.name;
                this._oldEnabledLonghands = this._mappedProperty.getLonghandEnabledStates();
            }
            EditStylePropertyName.prototype.description = function () {
                return this.type + " " + this._oldName + "=" + this._newName + " chainingid=" + this.chainingUid;
            };
            EditStylePropertyName.prototype.performUndo = function () {
                this._mappedProperty.setName(this._oldName, this._oldEnabledLonghands);
                var appliedProperty = this._mappedProperty.appliedProperty;
                this._styleUtilities.stylechange([
                    {
                        event: "updateProperty",
                        uid: appliedProperty.uid,
                        obj: appliedProperty
                    }
                ]);
                return true;
            };
            EditStylePropertyName.prototype.performEdit = function (isRedo) {
                var isSuccess = this._mappedProperty.setName(this._newName);
                if(isSuccess) {
                    this.result = this._mappedProperty.appliedProperty;
                    if(isRedo) {
                        var appliedProperty = this._mappedProperty.appliedProperty;
                        this._styleUtilities.stylechange([
                            {
                                event: "updateProperty",
                                uid: appliedProperty.uid,
                                obj: appliedProperty
                            }
                        ]);
                    }
                }
                return isSuccess;
            };
            return EditStylePropertyName;
        })();
        RemoteDom.EditStylePropertyName = EditStylePropertyName;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editStylePropertyName.js.map

// editStylePropertyRemove.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditStylePropertyRemove = (function () {
            function EditStylePropertyRemove(_styleUtilities, _mappedProperty) {
                this._styleUtilities = _styleUtilities;
                this._mappedProperty = _mappedProperty;
                this.type = "EditStylePropertyRemove";
                this._mappedRule = this._mappedProperty.mappedRule;
                var appliedProperty = this._mappedProperty.appliedProperty;
                var current = appliedProperty.current;
                this._oldName = current.name;
                this._oldValue = current.value;
                this._oldIsImportant = current.isImportant;
                this._oldEnabled = current.isEnabled;
                this._isHardDelete = appliedProperty.wasCreatedInSession;
                this._oldEnabledLonghands = this._mappedProperty.getLonghandEnabledStates();
            }
            EditStylePropertyRemove.prototype.description = function () {
                return this.type + " " + this._oldName + " chainingid=" + this.chainingUid;
            };
            EditStylePropertyRemove.prototype.performUndo = function () {
                var appliedProperty = this._mappedProperty.appliedProperty;
                if(this._isHardDelete) {
                    this._mappedRule.propertyAdd(this._oldName, this._oldValue, this._oldIsImportant, this._oldEnabled, this._mappedProperty, this._oldBeforeUid, this._oldEnabledLonghands);
                    this._styleUtilities.stylechange([
                        {
                            event: "addProperty",
                            uid: this._mappedRule.appliedRule.uid,
                            obj: appliedProperty,
                            beforeUid: this._oldBeforeUid
                        }
                    ]);
                } else {
                    this._mappedRule.propertyUnremove(this._mappedProperty, this._oldEnabled, this._oldEnabledLonghands);
                    this._styleUtilities.stylechange([
                        {
                            event: "updateProperty",
                            uid: appliedProperty.uid,
                            obj: appliedProperty
                        }
                    ]);
                }
                return true;
            };
            EditStylePropertyRemove.prototype.performEdit = function (isRedo) {
                var _this = this;
                if(this._isHardDelete && !isRedo) {
                    var found = false;
                    this._mappedRule.forEachProperty(function (mappedProperty) {
                        if(found) {
                            _this._oldBeforeUid = mappedProperty.appliedProperty.uid;
                            return true;
                        } else if(mappedProperty === _this._mappedProperty) {
                            found = true;
                        }
                    });
                }
                var isSuccess = this._isHardDelete ? this._mappedRule.propertyHardRemove(this._mappedProperty) : this._mappedRule.propertyRemove(this._mappedProperty);
                if(isSuccess) {
                    this.result = this._isHardDelete ? null : this._mappedProperty.appliedProperty;
                    if(isRedo) {
                        var appliedProperty = this._mappedProperty.appliedProperty;
                        if(this._isHardDelete) {
                            this._styleUtilities.stylechange([
                                {
                                    event: "removeProperty",
                                    uid: appliedProperty.uid
                                }
                            ]);
                        } else {
                            this._styleUtilities.stylechange([
                                {
                                    event: "updateProperty",
                                    uid: appliedProperty.uid,
                                    obj: appliedProperty
                                }
                            ]);
                        }
                    }
                }
                return isSuccess;
            };
            return EditStylePropertyRemove;
        })();
        RemoteDom.EditStylePropertyRemove = EditStylePropertyRemove;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editStylePropertyRemove.js.map

// editStylePropertyValue.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        ;
        var EditStylePropertyValue = (function () {
            function EditStylePropertyValue(_styleUtilities, _mappedProperty, _newValue, _newIsImportant) {
                this._styleUtilities = _styleUtilities;
                this._mappedProperty = _mappedProperty;
                this._newValue = _newValue;
                this._newIsImportant = _newIsImportant;
                this.type = "EditStylePropertyValue";
                var current = this._mappedProperty.appliedProperty.current;
                this._oldValue = current.value;
                this._oldIsImportant = current.isImportant;
                this._oldIsEnabled = current.isEnabled;
                try  {
                    this._oldIsInvalid = !this._mappedProperty.diagProperty.isValid;
                } catch (ex) {
                    Common.RemoteHelpers.encounteredException(ex);
                    this._oldIsInvalid = true;
                }
            }
            EditStylePropertyValue.prototype.getOldValue = function () {
                return {
                    value: this._oldValue,
                    isImportant: this._oldIsImportant,
                    isEnabled: this._oldIsEnabled,
                    isInvalid: this._oldIsInvalid
                };
            };
            EditStylePropertyValue.prototype.setOldValue = function (newOldValue) {
                this._oldValue = newOldValue.value;
                this._oldIsImportant = newOldValue.isImportant;
                this._oldIsEnabled = newOldValue.isEnabled;
                this._oldIsInvalid = newOldValue.isInvalid;
            };
            EditStylePropertyValue.prototype.hasValueChanged = function () {
                return this._oldValue != this._newValue || this._oldIsImportant != this._newIsImportant;
            };
            EditStylePropertyValue.prototype.description = function () {
                return this.type + " " + this._mappedProperty.appliedProperty.current.name + "=" + this._newValue + " oldValue =" + this._oldValue + " chainingid=" + this.chainingUid;
            };
            EditStylePropertyValue.prototype.performUndo = function () {
                this._mappedProperty.setValue(this._oldValue, this._oldIsImportant, this._oldIsEnabled);
                var appliedProperty = this._mappedProperty.appliedProperty;
                this._styleUtilities.stylechange([
                    {
                        event: "updateProperty",
                        uid: appliedProperty.uid,
                        obj: appliedProperty
                    }
                ]);
                return true;
            };
            EditStylePropertyValue.prototype.performEdit = function (isRedo) {
                var isSuccess = this._mappedProperty.setValue(this._newValue, this._newIsImportant, isRedo ? this._newIsEnabled : this._oldIsEnabled || this._oldIsInvalid);
                if(isSuccess) {
                    var appliedProperty = this._mappedProperty.appliedProperty;
                    this._newIsEnabled = appliedProperty.current.isEnabled;
                    this.result = appliedProperty;
                    if(isRedo) {
                        this._styleUtilities.stylechange([
                            {
                                event: "updateProperty",
                                uid: appliedProperty.uid,
                                obj: appliedProperty
                            }
                        ]);
                    }
                }
                return isSuccess;
            };
            return EditStylePropertyValue;
        })();
        RemoteDom.EditStylePropertyValue = EditStylePropertyValue;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editStylePropertyValue.js.map

// editStyleRuleAdd.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditStyleRuleAdd = (function () {
            function EditStyleRuleAdd(_styleUtilities, _selector, _newName, _newValue, _newIsImportant, _newPosition) {
                this._styleUtilities = _styleUtilities;
                this._selector = _selector;
                this._newName = _newName;
                this._newValue = _newValue;
                this._newIsImportant = _newIsImportant;
                this._newPosition = _newPosition;
                this.type = "EditStyleRuleAdd";
            }
            EditStyleRuleAdd.prototype.description = function () {
                return this.type;
            };
            EditStyleRuleAdd.prototype.performEdit = function (isRedo) {
                if(!isRedo) {
                    this._mappedRule = this._styleUtilities.addNewRule(this._selector, this._newPosition);
                }
                if(this._mappedRule) {
                    this._mappedProperty = this._mappedRule.propertyAdd(this._newName, this._newValue, this._newIsImportant, true, this._mappedProperty);
                    if(isRedo) {
                        var appliedRule = this._mappedRule.appliedRule;
                        var beforeRule = this._styleUtilities.getRuleByPosition(this._styleUtilities.getRulePosition(this._mappedRule) + 1);
                        var beforeUid = beforeRule ? beforeRule.appliedRule.uid : null;
                        this._styleUtilities.stylechange([
                            {
                                event: "addRule",
                                uid: appliedRule.uid,
                                obj: appliedRule,
                                beforeUid: beforeUid
                            }
                        ]);
                    }
                    this.result = this._mappedRule.appliedRule;
                    return true;
                }
                return false;
            };
            EditStyleRuleAdd.prototype.performUndo = function () {
                this._mappedRule.RemoveAllProperties();
                this._styleUtilities.stylechange([
                    {
                        event: "removeRule",
                        uid: this._mappedRule.appliedRule.uid
                    }
                ]);
                return true;
            };
            return EditStyleRuleAdd;
        })();
        RemoteDom.EditStyleRuleAdd = EditStyleRuleAdd;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editStyleRuleAdd.js.map

// editStyleRuleRemove.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditStyleRuleRemove = (function () {
            function EditStyleRuleRemove(_styleUtilities, _mappedRule) {
                this._styleUtilities = _styleUtilities;
                this._mappedRule = _mappedRule;
                var _this = this;
                this._oldDeleteStates = [];
                this._oldEnabledStates = [];
                this._oldEnabledLonghands = [];
                this.type = "EditStyleRuleRemove";
                this._mappedRule.forEachProperty(function (mappedProperty) {
                    _this._oldEnabledStates.push(mappedProperty.appliedProperty.current.isEnabled);
                    _this._oldEnabledLonghands.push(mappedProperty.getLonghandEnabledStates());
                });
            }
            EditStyleRuleRemove.prototype.description = function () {
                return this.type;
            };
            EditStyleRuleRemove.prototype.performEdit = function (isRedo) {
                this._oldDeleteStates = this._mappedRule.remove();
                if(this._oldDeleteStates) {
                    var appliedRule = this._mappedRule.appliedRule;
                    this.result = appliedRule.wasCreatedInSession ? null : appliedRule;
                    if(isRedo) {
                        if(appliedRule.wasCreatedInSession) {
                            this._styleUtilities.stylechange([
                                {
                                    event: "removeRule",
                                    uid: appliedRule.uid
                                }
                            ]);
                        } else {
                            this._styleUtilities.stylechange([
                                {
                                    event: "updateRule",
                                    uid: appliedRule.uid,
                                    obj: appliedRule
                                }
                            ]);
                        }
                    }
                    return true;
                }
                this.result = null;
                return false;
            };
            EditStyleRuleRemove.prototype.performUndo = function () {
                var isSuccess = this._mappedRule.unremove(this._oldDeleteStates, this._oldEnabledStates, this._oldEnabledLonghands);
                var appliedRule = this._mappedRule.appliedRule;
                if(appliedRule.wasCreatedInSession) {
                    var beforeRule = this._styleUtilities.getRuleByPosition(this._styleUtilities.getRulePosition(this._mappedRule) + 1);
                    var beforeUid = beforeRule ? beforeRule.appliedRule.uid : null;
                    this._styleUtilities.stylechange([
                        {
                            event: "addRule",
                            uid: appliedRule.uid,
                            obj: appliedRule,
                            beforeUid: beforeUid
                        }
                    ]);
                } else {
                    this._styleUtilities.stylechange([
                        {
                            event: "updateRule",
                            uid: appliedRule.uid,
                            obj: appliedRule
                        }
                    ]);
                }
                return isSuccess;
            };
            return EditStyleRuleRemove;
        })();
        RemoteDom.EditStyleRuleRemove = EditStyleRuleRemove;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editStyleRuleRemove.js.map

// editStyleRuleSelector.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditStyleRuleSelector = (function () {
            function EditStyleRuleSelector(_styleUtilities, _oldMappedRule, _newSelector) {
                this._styleUtilities = _styleUtilities;
                this._oldMappedRule = _oldMappedRule;
                this._newSelector = _newSelector;
                var _this = this;
                this.type = "EditStyleRuleSelector";
                this._oldSelector = this._oldMappedRule.appliedRule.selector;
                this._oldOriginalSelector = this._oldMappedRule.appliedRule.originalSelector;
                this._oldProperties = [];
                this._oldMappedRule.forEachProperty(function (mappedProperty) {
                    _this._oldProperties.push(mappedProperty);
                });
            }
            EditStyleRuleSelector.prototype.description = function () {
                return this.type;
            };
            EditStyleRuleSelector.prototype.performEdit = function (isRedo) {
                if(!isRedo) {
                    var position = this._styleUtilities.getRulePosition(this._oldMappedRule);
                    this._newMappedRule = this._styleUtilities.addNewRule(this._newSelector, position, this._oldMappedRule);
                    this._newMappedRule.appliedRule.originalSelector = this._oldOriginalSelector;
                }
                if(this._newMappedRule && this._newMappedRule.movePropertiesFromRule(this._oldMappedRule)) {
                    if(isRedo) {
                        this._styleUtilities.stylechange([
                            {
                                event: "updateRule",
                                uid: this._oldMappedRule.appliedRule.uid,
                                obj: this._newMappedRule.appliedRule
                            }
                        ]);
                    }
                    this.result = this._newMappedRule.appliedRule;
                    return true;
                }
                return false;
            };
            EditStyleRuleSelector.prototype.performUndo = function () {
                if(this._oldMappedRule.movePropertiesFromRule(this._newMappedRule)) {
                    this._styleUtilities.replaceCurrentRule(this._oldMappedRule, this._newMappedRule);
                    this._styleUtilities.stylechange([
                        {
                            event: "updateRule",
                            uid: this._newMappedRule.appliedRule.uid,
                            obj: this._oldMappedRule.appliedRule
                        }
                    ]);
                    return true;
                }
                return false;
            };
            return EditStyleRuleSelector;
        })();
        RemoteDom.EditStyleRuleSelector = EditStyleRuleSelector;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editStyleRuleSelector.js.map

// editText.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var EditText = (function () {
            function EditText(_element, _newValue) {
                this._element = _element;
                this._newValue = _newValue;
                this.type = "EditText";
                this._oldValue = this._element.textContent;
                this._textNodeCase = (this._element.nodeName === "#text");
                this._parentNode = this._element.parentNode;
            }
            EditText.prototype.description = function () {
                return this.type;
            };
            EditText.prototype.performUndo = function () {
                if(this._textNodeCase) {
                    this._parentNode.replaceChild(this._element, this._newElement);
                }
                this._element.textContent = this._oldValue;
                return true;
            };
            EditText.prototype.performEdit = function () {
                if(this._textNodeCase) {
                    var doc = this._element.ownerDocument;
                    if(!this._newElement) {
                        this._newElement = doc.createTextNode("");
                    }
                    this._parentNode.replaceChild(this._newElement, this._element);
                    if(Common.RemoteHelpers.getDocumentMode() < 9) {
                        this._newElement.nodeValue = this._newValue;
                    } else {
                        this._newElement.textContent = this._newValue;
                    }
                    return true;
                } else {
                    this._element.textContent = this._newValue;
                    return true;
                }
            };
            return EditText;
        })();
        RemoteDom.EditText = EditText;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/editText.js.map

// appliedPropertyValue.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var AppliedPropertyValue = (function () {
            function AppliedPropertyValue(name, value, isImportant, isEnabled) {
                this.name = name;
                this.value = value;
                this.isImportant = isImportant;
                this.isEnabled = isEnabled;
            }
            return AppliedPropertyValue;
        })();
        RemoteDom.AppliedPropertyValue = AppliedPropertyValue;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Styles/appliedPropertyValue.js.map

// removeAttribute.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var RemoveAttribute = (function () {
            function RemoveAttribute(_styleUtilities, htmlTreeHelpers, uid, _name) {
                this._styleUtilities = _styleUtilities;
                this._name = _name;
                this.type = "RemoveAttribute";
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                this._element = mappedNode.ele;
                if(this._name === "value" && htmlTreeHelpers.hasSpecialValueAttribute(this._element)) {
                    this._oldValue = this._element.value;
                    this._valueSpecialCase = true;
                } else {
                    this._oldValue = this._element.getAttribute(this._name);
                    this._valueSpecialCase = false;
                }
            }
            RemoveAttribute.prototype.description = function () {
                return this.type;
            };
            RemoveAttribute.prototype.performUndo = function () {
                if(this._name === "style") {
                    this._styleUtilities.editingElement = this._element;
                }
                if(this._valueSpecialCase) {
                    this._element.value = this._oldValue;
                } else {
                    this._element.setAttribute(this._name, this._oldValue);
                    if(this._name === "style" && Common.RemoteHelpers.getDocumentMode() < 9) {
                        this._styleUtilities.styleAttrModified(this._element);
                    }
                }
                this._styleUtilities.editingElement = null;
                return true;
            };
            RemoveAttribute.prototype.performEdit = function () {
                if(this._name === "style") {
                    this._styleUtilities.editingElement = this._element;
                }
                if(this._valueSpecialCase) {
                    this._element.value = "";
                } else {
                    if(this._name === "style") {
                        this._element.setAttribute(this._name, "color:inherit");
                        if(Common.RemoteHelpers.getDocumentMode() < 9) {
                            this._styleUtilities.styleAttrModified(this._element);
                        }
                    }
                    this._element.removeAttribute(this._name);
                }
                this._styleUtilities.editingElement = null;
                return true;
            };
            return RemoveAttribute;
        })();
        RemoteDom.RemoveAttribute = RemoveAttribute;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/removeAttribute.js.map

// reparentEdit.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var ReparentEdit = (function () {
            function ReparentEdit(_moveThisNode, _byThisNode, _reparentAction) {
                this._moveThisNode = _moveThisNode;
                this._byThisNode = _byThisNode;
                this._reparentAction = _reparentAction;
                this.type = "reparent";
                this._originalParent = this._moveThisNode.parentNode;
                this._originalNextSibling = this._moveThisNode.nextSibling;
            }
            ReparentEdit.prototype.description = function () {
                return this.type;
            };
            ReparentEdit.prototype.performEdit = function () {
                if(!this._moveThisNode || !this._moveThisNode.parentNode || !this._byThisNode || !this._byThisNode.parentNode) {
                    return false;
                }
                if(!this._moveThisNode.ownerDocument || !this._byThisNode.ownerDocument || this._moveThisNode.ownerDocument !== this._byThisNode.ownerDocument) {
                    return false;
                }
                if(this._reparentAction === "first child") {
                    this._byThisNode.insertBefore(this._moveThisNode, this._byThisNode.firstChild);
                } else if(this._reparentAction === "last child") {
                    this._byThisNode.appendChild(this._moveThisNode);
                } else if(this._reparentAction === "before sibling") {
                    this._byThisNode.parentNode.insertBefore(this._moveThisNode, this._byThisNode);
                } else if(this._reparentAction === "after sibling") {
                    this._byThisNode.parentNode.insertBefore(this._moveThisNode, this._byThisNode.nextSibling);
                }
                return true;
            };
            ReparentEdit.prototype.performUndo = function () {
                if(!this._moveThisNode || !this._moveThisNode.parentNode || !this._originalParent) {
                    return false;
                }
                if(!this._moveThisNode.ownerDocument || !this._originalParent.ownerDocument || this._moveThisNode.ownerDocument !== this._originalParent.ownerDocument) {
                    return false;
                }
                if(this._originalNextSibling) {
                    this._originalParent.insertBefore(this._moveThisNode, this._originalNextSibling);
                } else {
                    this._originalParent.appendChild(this._moveThisNode);
                }
                return true;
            };
            return ReparentEdit;
        })();
        RemoteDom.ReparentEdit = ReparentEdit;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/reparentEdit.js.map

// replaceElement.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var ReplaceElement = (function () {
            function ReplaceElement(_element, _htmlText) {
                this._element = _element;
                this._htmlText = _htmlText;
                this._newElements = [];
                this.type = "ReplaceElement";
                this._parentElement = (_element).parentElement || _element.parentNode;
                this._nextSibling = (this._element).nextElementSibling || this._element.nextSibling;
            }
            ReplaceElement.prototype.description = function () {
                return this.type;
            };
            ReplaceElement.prototype.performUndo = function () {
                for(var i = 0; i < this._newElements.length; i++) {
                    this._parentElement.removeChild(this._newElements[i]);
                }
                if(this._nextSibling) {
                    this._parentElement.insertBefore(this._element, this._nextSibling);
                } else {
                    this._parentElement.appendChild(this._element);
                }
                return true;
            };
            ReplaceElement.prototype.performEdit = function () {
                this._newElements = RemoteDom.AddElement.createElements(this._parentElement.ownerDocument, this._htmlText, (this._parentElement).tagName);
                var fragment = this._parentElement.ownerDocument.createDocumentFragment();
                for(var i = 0; i < this._newElements.length; i++) {
                    fragment.appendChild(this._newElements[i]);
                }
                if(this._nextSibling) {
                    this._parentElement.insertBefore(fragment, this._nextSibling);
                } else {
                    this._parentElement.appendChild(fragment);
                }
                this._parentElement.removeChild(this._element);
                return true;
            };
            return ReplaceElement;
        })();
        RemoteDom.ReplaceElement = ReplaceElement;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/replaceElement.js.map

// revertProperty.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var RevertProperty = (function () {
            function RevertProperty(_styleUtilities, _mappedProperty) {
                this._styleUtilities = _styleUtilities;
                this._mappedProperty = _mappedProperty;
                var _this = this;
                this.type = "RevertProperty";
                var appliedProperty = this._mappedProperty.appliedProperty;
                var current = appliedProperty.current;
                this._oldName = current.name;
                this._oldValue = current.value;
                this._oldIsImportant = current.isImportant;
                this._oldIsEnabled = current.isEnabled;
                this._oldEnabledLonghands = this._mappedProperty.getLonghandEnabledStates();
                if(appliedProperty.originalLonghand) {
                    this._newEnabledLonghands = [];
                    appliedProperty.originalLonghand.forEach(function (value) {
                        _this._newEnabledLonghands.push(value.isEnabled);
                    });
                }
                try  {
                    this._oldIsInvalid = !this._mappedProperty.diagProperty.isValid;
                } catch (ex) {
                    Common.RemoteHelpers.encounteredException(ex);
                    this._oldIsInvalid = true;
                }
            }
            RevertProperty.prototype.description = function () {
                return this.type + " chainingid=" + this.chainingUid;
            };
            RevertProperty.prototype.performUndo = function () {
                this._mappedProperty.setAll(this._oldName, this._oldValue, this._oldIsImportant, this._oldIsEnabled, this._oldEnabledLonghands);
                if(this._oldIsDeleted) {
                    this._mappedProperty.mappedRule.propertyRemove(this._mappedProperty);
                }
                var appliedProperty = this._mappedProperty.appliedProperty;
                this._styleUtilities.stylechange([
                    {
                        event: "updateProperty",
                        uid: appliedProperty.uid,
                        obj: appliedProperty
                    }
                ]);
                return true;
            };
            RevertProperty.prototype.performEdit = function (isRedo) {
                var isSuccess = true;
                this._oldIsDeleted = this._mappedProperty.isDeleted;
                if(this._oldIsDeleted) {
                    isSuccess = this._mappedProperty.mappedRule.propertyUnremove(this._mappedProperty, true, this._newEnabledLonghands);
                }
                if(isSuccess) {
                    var original = this._mappedProperty.appliedProperty.original;
                    isSuccess = !!original && this._mappedProperty.setAll(original.name, original.value, original.isImportant, original.isEnabled, this._newEnabledLonghands);
                    if(isSuccess) {
                        var appliedProperty = this._mappedProperty.appliedProperty;
                        this.result = appliedProperty;
                        if(isRedo) {
                            this._styleUtilities.stylechange([
                                {
                                    event: "updateProperty",
                                    uid: appliedProperty.uid,
                                    obj: appliedProperty
                                }
                            ]);
                        }
                    }
                }
                return isSuccess;
            };
            return RevertProperty;
        })();
        RemoteDom.RevertProperty = RevertProperty;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/revertProperty.js.map

// revertRule.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var RevertRule = (function () {
            function RevertRule(_styleUtilities, _mappedRule) {
                this._styleUtilities = _styleUtilities;
                this._mappedRule = _mappedRule;
                var _this = this;
                this._propertyEdits = [];
                this.type = "RevertRule";
                this._mappedRule.forEachProperty(function (mappedProperty) {
                    var edit = mappedProperty.appliedProperty.wasCreatedInSession ? new RemoteDom.EditStylePropertyRemove(_this._styleUtilities, mappedProperty) : new RemoteDom.RevertProperty(_this._styleUtilities, mappedProperty);
                    _this._propertyEdits.push(edit);
                });
            }
            RevertRule.prototype.description = function () {
                return this.type + " chainingid=" + this.chainingUid;
            };
            RevertRule.prototype.performUndo = function () {
                var isSuccess = true;
                this._propertyEdits.forEach(function (revertProperty) {
                    var reverted = revertProperty.performUndo();
                    isSuccess = isSuccess || reverted;
                    return !reverted;
                });
                if(isSuccess && this._editSelector) {
                    this._editSelector.performUndo();
                }
                var appliedRule = this._mappedRule.appliedRule;
                if(isSuccess && this._wasDeleted) {
                    appliedRule.isDeleted = true;
                }
                this.result = appliedRule;
                this._styleUtilities.stylechange([
                    {
                        event: "updateRule",
                        uid: appliedRule.uid,
                        obj: appliedRule
                    }
                ]);
                return isSuccess;
            };
            RevertRule.prototype.performEdit = function (isRedo) {
                var isSuccess = true;
                this._propertyEdits.forEach(function (edit) {
                    var reverted = edit.performEdit(isRedo);
                    isSuccess = isSuccess || reverted;
                    return !reverted;
                });
                if(isSuccess) {
                    var appliedRule = this._mappedRule.appliedRule;
                    if(appliedRule.selector !== appliedRule.originalSelector) {
                        if(!this._editSelector) {
                            this._editSelector = new RemoteDom.EditStyleRuleSelector(this._styleUtilities, this._mappedRule, appliedRule.originalSelector);
                        }
                        if(this._editSelector.performEdit(isRedo)) {
                            this._newMappedRule = this._editSelector._newMappedRule;
                            if(this._newMappedRule) {
                                appliedRule = this._newMappedRule.appliedRule;
                                appliedRule.originalSelector = appliedRule.selector;
                            }
                        }
                    }
                    this._wasDeleted = appliedRule.isDeleted;
                    appliedRule.isDeleted = false;
                    this.result = appliedRule;
                    if(isRedo) {
                        this._styleUtilities.stylechange([
                            {
                                event: "updateRule",
                                uid: appliedRule.uid,
                                obj: appliedRule
                            }
                        ]);
                    }
                }
                return isSuccess;
            };
            return RevertRule;
        })();
        RemoteDom.RevertRule = RevertRule;        
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/Edit/revertRule.js.map

// remote.ts
var F12;
(function (F12) {
    (function (RemoteDom) {
        var Assert = F12.Tools.Utility.Assert;
        var domUtilities, dom$messageHandlers;
        var inspectElementHandler;
        RemoteDom.remoteCode = {
            editStack: null,
            hostId: null,
            onKeyDownSafe: null,
            unloadSafe: null,
            scriptExecutionSupported: null,
            safeMqlListener: null,
            mediaQueryLists: null,
            getUidOrNull: function domeExplorer$remoteCode$getUidOrNull(element) {
                if(!element) {
                    return null;
                }
                return element["uniqueID"] || element["bpt-uid"] || null;
            },
            initialize: function domExplorer$remoteCode$initialize() {
                RemoteDom.remoteCode.editStack = new Common.EditStack();
                if(typeof browser !== "undefined") {
                    Common.RemoteHelpers.addListener(browser, "beforeScriptExecute", RemoteDom.remoteCode.onBeforeScriptExecute);
                    Common.RemoteHelpers.addListener(browser, "inspectElement", (inspectElementHandler = function (e) {
                        RemoteDom.dom$messageHandlers.inspectElement(e.target);
                    }));
                }
                remoteHelpers.initialize("DomExplorer", RemoteDom.remoteCode.initializePage, "__BROWSERTOOLS_DOMEXPLORER_ADDED", RemoteDom.remoteCode.onDetach);
            },
            initializePage: function domExplorer$remoteCode$initializePage() {
                try  {
                    browser.executeScript("(function(){})();" + Common.RemoteHelpers.getJMCScriptUrl("dom"));
                    RemoteDom.remoteCode.scriptExecutionSupported = true;
                } catch (e) {
                    RemoteDom.remoteCode.scriptExecutionSupported = false;
                }
                try  {
                    var defaultView = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                    RemoteDom.remoteCode.addRemotePageFunctions(defaultView);
                    var connectionInfo = {
                        docMode: Common.RemoteHelpers.getDocumentMode(),
                        contextInfo: defaultView.location.href
                    };
                    remoteHelpers.port.postMessage("RefreshTree:" + JSON.stringify(connectionInfo));
                } catch (ex) {
                    return;
                }
            },
            onDetach: function domExplorer$remoteCode$onDetach() {
                RemoteDom.dom$messageHandlers.cancelSelectElementByClick();
                RemoteDom.remoteCode.editStack = undefined;
                styleUtilities.clearCache(true);
                RemoteDom.domUtilities.reset();
                Common.RemoteHelpers.removeListener(browser, "beforeScriptExecute", RemoteDom.remoteCode.onBeforeScriptExecute);
                Common.RemoteHelpers.removeListener(browser, "inspectElement", inspectElementHandler);
                try  {
                    RemoteDom.remoteCode.detachMediaQueryEvents();
                    if(Common.RemoteHelpers.getDefaultView(mainBrowser.document)["__BROWSERTOOLS_DOMEXPLORER_ADDED"]) {
                        Common.RemoteHelpers.getDefaultView(mainBrowser.document)["__BROWSERTOOLS_DOMEXPLORER_ADDED"] = null;
                    }
                    if(Common.RemoteHelpers.getDefaultView(mainBrowser.document)["__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS"]) {
                        Common.RemoteHelpers.getDefaultView(mainBrowser.document)["__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS"] = null;
                    }
                    if(RemoteDom.remoteCode.onKeyDownSafe) {
                        Common.RemoteHelpers.removeListener(mainBrowser.document, "keydown", RemoteDom.remoteCode.onKeyDownSafe, true);
                    }
                    if(RemoteDom.remoteCode.unloadSafe) {
                        Common.RemoteHelpers.removeListener(Common.RemoteHelpers.getDefaultView(mainBrowser.document), "unload", RemoteDom.remoteCode.unloadSafe, true);
                        RemoteDom.remoteCode.unloadSafe = null;
                    }
                } catch (ex) {
                }
            },
            detachMediaQueryEvents: function () {
                if(RemoteDom.remoteCode.safeMqlListener && RemoteDom.remoteCode.mediaQueryLists) {
                    while(RemoteDom.remoteCode.mediaQueryLists.length > 0) {
                        var mediaQueryList = RemoteDom.remoteCode.mediaQueryLists.pop();
                        mediaQueryList.removeListener(RemoteDom.remoteCode.safeMqlListener);
                    }
                }
            },
            onBeforeScriptExecute: function domExplorer$remoteCode$onBeforeScriptExecute(dispatchWindow) {
                if(dispatchWindow && (dispatchWindow).browserOrWindow) {
                    dispatchWindow = (dispatchWindow).browserOrWindow;
                }
                var realWindow = null;
                try  {
                    realWindow = Common.RemoteHelpers.getDefaultView(dispatchWindow.document);
                } catch (ex) {
                    return;
                }
                RemoteDom.domUtilities.removeHighlight();
                if(realWindow === Common.RemoteHelpers.getDefaultView(mainBrowser.document)) {
                    if(remoteHelpers.port) {
                        remoteHelpers.postAllMessages();
                    }
                    RemoteDom.remoteCode.initializePage();
                } else {
                    RemoteDom.domUtilities.reloadFrame(realWindow);
                }
            },
            addRemotePageFunctions: function domExplorer$remoteCode$addRemotePageFunctions(realWindow) {
                if(RemoteDom.remoteCode.scriptExecutionSupported) {
                    if(!RemoteDom.remoteCode.onKeyDownSafe) {
                        RemoteDom.remoteCode.onKeyDownSafe = Common.RemoteHelpers.addSafeListener(realWindow, mainBrowser.document, "keydown", RemoteDom.remoteCode.onKeyDown, true);
                    }
                    realWindow.console = realWindow.console || new (realWindow).Object();
                    (realWindow.console).select = remoteHelpers.createSafeFunction(realWindow, RemoteDom.dom$messageHandlers.selectElementFromConsole);
                    (realWindow).__BROWSERTOOLS_DOMEXPLORER_ADDED = true;
                }
            },
            onKeyDown: function domExplorer$remoteCode$onKeyDown(e) {
                if(e.keyCode === 123 && RemoteDom.remoteCode.hostId === "vs") {
                    RemoteDom.remoteCode.vsFocusCallback();
                    return Common.RemoteHelpers.eventHandled(e);
                } else if(e.keyCode === 66 && e.ctrlKey && !e.shiftKey && !e.altKey) {
                    if(!RemoteDom.domUtilities.isSelectingElement && RemoteDom.remoteCode.startSelectElementByClickCallback) {
                        RemoteDom.remoteCode.startSelectElementByClickCallback();
                        return Common.RemoteHelpers.eventHandled(e);
                    } else if(RemoteDom.domUtilities.isSelectingElement && RemoteDom.remoteCode.stopSelectElementByClickCallback) {
                        RemoteDom.remoteCode.stopSelectElementByClickCallback();
                        return Common.RemoteHelpers.eventHandled(e);
                    }
                }
            }
        };
        RemoteDom.domUtilities = {
            isSelectingElement: false,
            selectElementLastSelected: null,
            selectElementClickCallback: null,
            mediaStyleChangeCallback: null,
            currentEventProxy: null,
            attachedDomModifiedDocs: [],
            attachedAttrModifiedDocs: [],
            getMutationManager: function () {
                if(!RemoteDom.domUtilities.mutationManager) {
                    RemoteDom.domUtilities.mutationManager = new F12.RemoteDom.MutationManager(diagnostics, remoteHelpers);
                }
                return RemoteDom.domUtilities.mutationManager;
            },
            getChunker: function () {
                if(!RemoteDom.domUtilities.chunker) {
                    RemoteDom.domUtilities.chunker = new F12.RemoteDom.Chunker();
                }
                return RemoteDom.domUtilities.chunker;
            },
            currentEventProxyListeners: [],
            removeAllCurrentEventProxyListeners: function () {
                if(RemoteDom.domUtilities.currentEventProxy) {
                    if(RemoteDom.domUtilities.currentEventProxyListeners) {
                        for(var i = 0; i < RemoteDom.domUtilities.currentEventProxyListeners.length; i++) {
                            var listener = RemoteDom.domUtilities.currentEventProxyListeners[i];
                            RemoteDom.domUtilities.currentEventProxy.removeEventListener(listener.name, listener.callback);
                        }
                    }
                    RemoteDom.domUtilities.currentEventProxyListeners = [];
                }
            },
            reset: function domExplorer$domUtilities$reset() {
                remoteHelpers.uid = 0;
                RemoteDom.domUtilities.removeHighlight();
                RemoteDom.domUtilities.isSelectingElement = false;
                RemoteDom.domUtilities.selectElementLastSelected = null;
                RemoteDom.domUtilities.selectElementClickCallback = null;
                for(var j = 0; j < RemoteDom.domUtilities.attachedDomModifiedDocs.length; j++) {
                    try  {
                        var treeModified = RemoteDom.domUtilities.attachedDomModifiedDocs[j];
                        if(treeModified.doc && treeModified.handler) {
                            Common.RemoteHelpers.removeListener(treeModified.doc, "DOMNodeInserted", treeModified.handler, true);
                            Common.RemoteHelpers.removeListener(treeModified.doc, "DOMNodeRemoved", treeModified.handler, true);
                            Common.RemoteHelpers.removeListener(treeModified.doc, "DOMCharacterDataModified", treeModified.handler, true);
                        }
                    } catch (ex) {
                    }
                }
                RemoteDom.domUtilities.attachedDomModifiedDocs = [];
                for(var k = 0; k < RemoteDom.domUtilities.attachedAttrModifiedDocs.length; k++) {
                    try  {
                        var attrModified = RemoteDom.domUtilities.attachedAttrModifiedDocs[k];
                        if(attrModified.doc && attrModified.handler) {
                            Common.RemoteHelpers.removeListener(attrModified.doc, "DOMAttrModified", attrModified.handler, true);
                        }
                    } catch (ex) {
                    }
                }
                RemoteDom.domUtilities.attachedAttrModifiedDocs = [];
                if(RemoteDom.domUtilities.currentEventProxy) {
                    RemoteDom.domUtilities.removeAllCurrentEventProxyListeners();
                    RemoteDom.domUtilities.currentEventProxy = null;
                }
                if(Common.RemoteHelpers.getDefaultView(mainBrowser.document)["__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS"]) {
                    Common.RemoteHelpers.getDefaultView(mainBrowser.document)["__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS"] = new (mainBrowser.document.parentWindow).Array();
                }
                htmlTreeHelpers.reset();
            },
            basicHighlightColor: {
                margin: "rgba(250, 212, 107, 0.75)",
                border: "rgba(120, 181, 51, 0.75)",
                padding: "rgba(247, 163, 135, 0.75)",
                content: "rgba(168, 221, 246, 0.75)"
            },
            selectElementColor: {
                margin: "rgba(250, 212, 107, 0.50)",
                border: "rgba(120, 181, 51, 0.50)",
                padding: "rgba(247, 163, 135, 0.50)",
                content: "rgba(168, 221, 246, 0.50)"
            },
            hoverElementColor: {
                margin: "rgba(250, 212, 107, 0.50)",
                border: "rgba(120, 181, 51, 0.50)",
                padding: "rgba(247, 163, 135, 0.50)",
                content: "rgba(168, 221, 246, 0.50)"
            },
            highlightElement: function domExplorer$domUtilities$highlightElement(element, color) {
                if(!element || !element.tagName || !color) {
                    return;
                }
                if(typeof browser !== "undefined" && typeof browser.highlightElement === "function") {
                    try  {
                        browser.highlightElement(element, color.margin, color.border, color.padding, color.content);
                    } catch (ex) {
                        Common.RemoteHelpers.encounteredException(ex);
                    }
                }
            },
            removeHighlight: function domExplorer$domUtilities$removeHighlight() {
                if(typeof browser !== "undefined" && typeof browser.highlightElement === "function") {
                    try  {
                        browser.highlightElement(null, "", "", "", "");
                    } catch (ex) {
                        Common.RemoteHelpers.encounteredException(ex);
                    }
                }
            },
            selectElementInLiveDomEnable: function domExplorer$domUtilities$selectElementInLiveDomEnable() {
                if(!RemoteDom.domUtilities.isSelectingElement) {
                    return;
                }
                if(typeof browser !== "undefined" && typeof browser.elementSelectionEventsEnabled !== "undefined") {
                    browser.elementSelectionEventsEnabled = true;
                    browser.addEventListener("selectElement", RemoteDom.domUtilities.selectElementHandler);
                    browser.addEventListener("hoverElement", RemoteDom.domUtilities.hoverElementHandler);
                }
            },
            selectElementInLiveDomDisable: function domExplorer$domUtilities$selectElementInLiveDomDisable() {
                if(!RemoteDom.domUtilities.isSelectingElement) {
                    return;
                }
                if(typeof browser !== "undefined" && typeof browser.elementSelectionEventsEnabled !== "undefined") {
                    browser.elementSelectionEventsEnabled = false;
                    browser.removeEventListener("selectElement", RemoteDom.domUtilities.selectElementHandler);
                    browser.removeEventListener("hoverElement", RemoteDom.domUtilities.hoverElementHandler);
                }
            },
            selectElementHandler: function domExplorer$domUtilities$selectElementHandler(event) {
                if(event.target) {
                    RemoteDom.domUtilities.highlightElement(event.target, RemoteDom.domUtilities.selectElementColor);
                }
                RemoteDom.domUtilities.selectElementLastSelected = event.target;
                if(RemoteDom.domUtilities.selectElementClickCallback) {
                    RemoteDom.domUtilities.selectElementClickCallback();
                }
            },
            hoverElementHandler: function domExplorer$domUtilities$hoverElementHandler(event) {
                if(event.target) {
                    RemoteDom.domUtilities.highlightElement(event.target, RemoteDom.domUtilities.hoverElementColor);
                }
            },
            getElementAtCoords: function domExplorer$domUtilities$getElementAtCoords(doc, x, y) {
                var checkForValidElement = function (element) {
                    if(typeof element.className !== "string" || element.className.indexOf("win-appbarclickeater") === -1) {
                        if(element.tagName === "IFRAME" || element.tagName === "FRAME") {
                            var frame = element;
                            var rect = RemoteDom.domUtilities.getClientRect(element);
                            var currentWindow = Common.RemoteHelpers.getDefaultView(element.ownerDocument);
                            var result = Common.RemoteHelpers.getValidWindow(currentWindow, frame.contentWindow);
                            if(result.isValid) {
                                var offset = Common.RemoteHelpers.getPageOffset(doc);
                                return RemoteDom.domUtilities.getElementAtCoords(result.window.document, x - rect.left + offset.x, y - rect.top + offset.y);
                            }
                        } else {
                            return element;
                        }
                    }
                    return false;
                };
                var validElement;
                if((typeof doc.msElementsFromPoint) === "function") {
                    var elements = doc.msElementsFromPoint(x, y);
                    for(var i = 0; i < elements.length; i++) {
                        validElement = checkForValidElement(elements[i]);
                        if(typeof validElement !== "boolean") {
                            var win = Common.RemoteHelpers.getDefaultView(doc);
                            var computedStyle = Common.RemoteHelpers.getComputedStyle(win, validElement);
                            if(computedStyle.visibility !== "hidden") {
                                return validElement;
                            }
                        }
                    }
                } else {
                    var element = doc.elementFromPoint(x, y);
                    if(element) {
                        validElement = checkForValidElement(element);
                        if(typeof validElement !== "boolean") {
                            return validElement;
                        } else {
                            var previousVisibility = (element).style.visibility;
                            (element).style.visibility = "hidden";
                            var realElement = RemoteDom.domUtilities.getElementAtCoords(doc, x, y);
                            (element).style.visibility = previousVisibility;
                            return realElement;
                        }
                    }
                }
                return null;
            },
            getClientRect: function domExplorer$domUtilities$getClientRect(element) {
                if(element && element.getBoundingClientRect) {
                    var rect = element.getBoundingClientRect();
                    if(rect.top !== undefined && rect.left !== undefined && rect.width !== undefined && rect.height !== undefined) {
                        var offset = Common.RemoteHelpers.getPageOffset(element.ownerDocument);
                        return {
                            left: rect.left + offset.x,
                            top: rect.top + offset.y,
                            width: rect.width,
                            height: rect.height
                        };
                    }
                }
                var top = 0;
                var left = 0;
                var curEle = element;
                while(curEle && curEle !== mainBrowser.document.body && curEle !== mainBrowser.document) {
                    top += (curEle).offsetTop;
                    left += (curEle).offsetLeft;
                    curEle = (curEle).offsetParent;
                }
                return {
                    left: left,
                    top: top,
                    width: (element).offsetWidth,
                    height: (element).offsetHeight
                };
            },
            reloadFrame: function domExplorer$domUtilities$reloadFrame(realWindow) {
                if(!mainBrowser || !realWindow || !mainBrowser.document || !realWindow.document) {
                    RemoteDom.remoteCode.initializePage();
                    return;
                }
                var iframeChain = RemoteDom.dom$messageHandlers.getIFrameChain(mainBrowser.document, realWindow.document);
                if(iframeChain.length > 0) {
                    var targetElement = iframeChain[0];
                    var uid = "";
                    var mappedNode = null;
                    try  {
                        uid = RemoteDom.remoteCode.getUidOrNull(targetElement);
                        if(uid) {
                            if(htmlTreeHelpers.mapping[uid] && htmlTreeHelpers.mapping[uid].ele === targetElement) {
                                mappedNode = htmlTreeHelpers.mapping[uid];
                            }
                        } else {
                            for(uid in htmlTreeHelpers.mapping) {
                                if(htmlTreeHelpers.mapping[uid] && htmlTreeHelpers.mapping[uid].ele === targetElement) {
                                    mappedNode = htmlTreeHelpers.mapping[uid];
                                    break;
                                }
                            }
                        }
                    } catch (ex) {
                        if((ex.number & 0xFFFFFFFF) === (0x800A0046 & 0xFFFFFFFF)) {
                            htmlTreeHelpers.deleteMappedNode(uid);
                            RemoteDom.remoteCode.initializePage();
                            return;
                        } else {
                            throw ex;
                        }
                    }
                    if(!mappedNode) {
                        var targetParent = targetElement.parentNode;
                        mappedNode = null;
                        uid = RemoteDom.remoteCode.getUidOrNull(targetParent);
                        if(uid) {
                            if(htmlTreeHelpers.mapping[uid] && htmlTreeHelpers.mapping[uid].ele === targetParent) {
                                mappedNode = htmlTreeHelpers.mapping[uid];
                            }
                        } else {
                            for(uid in htmlTreeHelpers.mapping) {
                                if(htmlTreeHelpers.mapping[uid].ele === targetParent) {
                                    mappedNode = htmlTreeHelpers.mapping[uid];
                                    break;
                                }
                            }
                        }
                        if(mappedNode) {
                            var root = targetParent.ownerDocument;
                            for(var docIndex = 0; docIndex < RemoteDom.domUtilities.attachedDomModifiedDocs.length; docIndex++) {
                                if(RemoteDom.domUtilities.attachedDomModifiedDocs[docIndex].doc === root) {
                                    var domMutationEvent = {
                                        type: "DOMNodeInserted",
                                        target: targetElement
                                    };
                                    RemoteDom.domUtilities.attachedDomModifiedDocs[docIndex].handler(domMutationEvent);
                                    break;
                                }
                            }
                        }
                    }
                }
            },
            getRootElementOfNode: function domExplorer$domUtilities$getRootElementOfNode(element) {
                if(element && element.parentNode) {
                    var currentParent = element.parentNode;
                    while(currentParent.parentNode) {
                        currentParent = currentParent.parentNode;
                    }
                    return currentParent;
                } else {
                    return element;
                }
            },
            isWhiteSpaceOnlyTextNode: function domExplorer$domUtilities$isWhiteSpaceOnlyTextNode(element) {
                function containsOnlyWhiteSpace(element) {
                    var content = Common.RemoteHelpers.getLeafTextContent(element);
                    if(typeof content === "string") {
                        return !/\S/.test(content);
                    }
                }
                return element !== null && element.nodeType === 3 && containsOnlyWhiteSpace(element);
            },
            getSubsequentNonTextNodeSibling: function domExplorer$domUtilities$getNextNonTextNodeSiblingElement(element, direction) {
                if(element) {
                    var ele = (direction === Common.Direction.Next) ? element.nextSibling : element.previousSibling;
                    while(RemoteDom.domUtilities.isWhiteSpaceOnlyTextNode(ele)) {
                        ele = (direction === Common.Direction.Next) ? ele.nextSibling : ele.previousSibling;
                    }
                    return ele;
                }
                return null;
            },
            lastElementInsideIframe: function domExplorer$domUtilities$lastElementInsideIframe(iframe) {
                var view = Common.RemoteHelpers.getDefaultView(iframe.ownerDocument);
                var result = Common.RemoteHelpers.getValidWindow(view, iframe.contentWindow);
                if(!result.isValid) {
                    return null;
                }
                var element;
                var childElement = result.window.document;
                do {
                    element = childElement;
                    childElement = RemoteDom.searchUtilities.getSubsequentNonWhiteSpacedChild(childElement, Common.Direction.Previous);
                }while(childElement);
                return element.tagName === "IFRAME" || element.tagName === "FRAME" ? RemoteDom.domUtilities.lastElementInsideIframe(element) : element;
            },
            getSubsequentElementAfterIframe: function domExplorer$domUtilities$getSubsequentElementAfterIframe(parentFrame, currentFrame, searchDirection) {
                if(parentFrame) {
                    var tags = parentFrame.querySelectorAll("iframe, frame");
                    for(var i = 0, n = tags.length; i < n; i++) {
                        if(currentFrame === tags[i]) {
                            var ele = RemoteDom.domUtilities.getSubsequentNonTextNodeSibling(currentFrame, searchDirection);
                            if(searchDirection === Common.Direction.Previous) {
                                if(ele) {
                                    if(ele.tagName === "IFRAME" || ele.tagName === "FRAME") {
                                        return RemoteDom.domUtilities.lastElementInsideIframe(ele);
                                    } else if(ele.childNodes && ele.childNodes.length > 0 && RemoteDom.searchUtilities.getSubsequentNonWhiteSpacedChild(ele, searchDirection)) {
                                        return RemoteDom.searchUtilities.getDeepestRightChild(ele);
                                    } else {
                                        return ele;
                                    }
                                } else {
                                    return currentFrame.parentNode;
                                }
                            } else {
                                if(ele) {
                                    return ele;
                                } else {
                                    var element = currentFrame;
                                    while(element.parentNode) {
                                        var nextElement = RemoteDom.domUtilities.getSubsequentNonTextNodeSibling(element.parentNode, Common.Direction.Next);
                                        if(nextElement) {
                                            return nextElement;
                                        } else {
                                            element = element.parentNode;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return null;
            },
            findParentChainForElement: function domExplorer$domUtilities$findParentChainForElement(currentNode) {
                var parentChain = [];
                var staleNodes = false;
                try  {
                    var iframeChain = null;
                    var iframePosition = 0;
                    var startNode = currentNode;
                    while(currentNode) {
                        parentChain.splice(0, 0, currentNode);
                        if(currentNode.parentNode) {
                            currentNode = currentNode.parentNode;
                        } else {
                            if(Common.RemoteHelpers.getDefaultView(currentNode) === Common.RemoteHelpers.getDefaultView(mainBrowser.document)) {
                                break;
                            } else {
                                if(!iframeChain) {
                                    iframeChain = RemoteDom.dom$messageHandlers.getIFrameChain(mainBrowser.document, currentNode);
                                }
                                if(iframeChain) {
                                    currentNode = iframeChain[iframePosition];
                                    iframePosition++;
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                    RemoteDom.domUtilities.expandChain = [];
                    var parentUidChain = [
                        {
                            uid: "uid0",
                            children: null
                        }
                    ];
                    var children;
                    var lastNotFoundIndex = -1;
                    for(var i = 1; i < parentChain.length; i++) {
                        var parentElement = parentChain[i];
                        var found = false;
                        var uid = RemoteDom.remoteCode.getUidOrNull(parentElement);
                        if(uid) {
                            var mappedNode = htmlTreeHelpers.mapping[uid];
                            if(mappedNode && mappedNode.ele === parentElement) {
                                parentUidChain.push({
                                    uid: uid,
                                    children: null
                                });
                                if(mappedNode.isLimited) {
                                    parentUidChain[i].children = mappedNode.childrenNodes;
                                }
                                found = true;
                            }
                        }
                        if(!found) {
                            for(uid in htmlTreeHelpers.mapping) {
                                var mappedNode = htmlTreeHelpers.mapping[uid];
                                if(mappedNode.ele === parentElement || (mappedNode.isIframeElement && htmlTreeHelpers.getIframeRootForMappedNode(uid) === parentElement)) {
                                    parentUidChain.push({
                                        uid: uid,
                                        children: null
                                    });
                                    if(mappedNode.isLimited) {
                                        parentUidChain[i].children = mappedNode.childrenNodes;
                                    }
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if(!found) {
                            if(lastNotFoundIndex === i) {
                                if(startNode.parentNode && (startNode.parentNode).tagName === "STYLE" || (startNode.parentNode).tagName === "SCRIPT") {
                                    parentUidChain.push({
                                        uid: "uid-selectchild",
                                        children: null
                                    });
                                }
                                break;
                            }
                            lastNotFoundIndex = i;
                            children = htmlTreeHelpers.getChildrenForMappedNode(parentUidChain[i - 1].uid, false, true);
                            parentUidChain[i - 1].children = children;
                            i--;
                        } else {
                            children = htmlTreeHelpers.getChildrenForMappedNode(parentUidChain[i - 1].uid, false, true);
                            parentUidChain[i - 1].children = children;
                        }
                    }
                } catch (ex) {
                    if((ex.number & 0xFFFFFFFF) === (0x800A0046 & 0xFFFFFFFF)) {
                        staleNodes = true;
                    } else {
                        throw ex;
                    }
                }
                if(staleNodes) {
                    RemoteDom.remoteCode.initializePage();
                }
                return parentUidChain;
            }
        };
        RemoteDom.searchUtilities = {
            previousDFSElement: null,
            iframeStack: null,
            skipTraversal: false,
            querySelectorResults: [],
            getSubsequentNonWhiteSpacedChild: function domExplorer$searchUtilities$getSubsequentNonWhiteSpacedChild(element, searchDirection) {
                if(element && element.childNodes && element.childNodes.length > 0) {
                    if(element.childNodes.length === 1) {
                        var child = element.childNodes[0];
                        if(element.tagName === "STYLE" && element.styleSheet) {
                            return child;
                        } else if(!child.tagName) {
                            var textContent = Common.RemoteHelpers.getLeafTextContent(child);
                            if(textContent && !String.prototype.match.call(textContent, /\n/g) && textContent.length < htmlTreeHelpers.maxInlineLength) {
                                return null;
                            }
                        }
                    }
                    if(searchDirection === Common.Direction.Next) {
                        for(var index = 0; index < element.childNodes.length; index++) {
                            if(!RemoteDom.domUtilities.isWhiteSpaceOnlyTextNode(element.childNodes[index])) {
                                return element.childNodes[index];
                            }
                        }
                    } else {
                        for(index = element.childNodes.length - 1; index >= 0; index--) {
                            if(!RemoteDom.domUtilities.isWhiteSpaceOnlyTextNode(element.childNodes[index])) {
                                return element.childNodes[index];
                            }
                        }
                    }
                }
                return null;
            },
            getDeepestRightChild: function domExplorer$searchUtilities$getDeepestRightChild(element) {
                var childElement = element;
                while(childElement) {
                    element = childElement;
                    childElement = RemoteDom.searchUtilities.getSubsequentNonWhiteSpacedChild(element, Common.Direction.Previous);
                }
                if(element.tagName === "IFRAME" || element.tagName === "FRAME") {
                    var child = RemoteDom.domUtilities.lastElementInsideIframe(element);
                    RemoteDom.searchUtilities.initializeIframeStack(child, Common.Direction.Previous);
                    return child;
                }
                return element;
            },
            obtainNextDFSElement: function domExplorer$searchUtilities$obtainNextDFSElement(element, checkChild) {
                if(element) {
                    if(element.tagName === "IFRAME" || element.tagName === "FRAME") {
                        var e = element;
                        var view = Common.RemoteHelpers.getDefaultView(element.ownerDocument);
                        var result = Common.RemoteHelpers.getValidWindow(view, e.contentWindow);
                        if(result.isValid) {
                            RemoteDom.searchUtilities.iframeStack.push(RemoteDom.domUtilities.getSubsequentElementAfterIframe(RemoteDom.domUtilities.getRootElementOfNode(element), element, Common.Direction.Next));
                            return result.window.document;
                        }
                    }
                    var firstChild = RemoteDom.searchUtilities.getSubsequentNonWhiteSpacedChild(element, Common.Direction.Next);
                    if(checkChild && firstChild) {
                        return firstChild;
                    } else {
                        var nextSibling = RemoteDom.domUtilities.getSubsequentNonTextNodeSibling(element, Common.Direction.Next);
                        if(nextSibling) {
                            return nextSibling;
                        } else {
                            while(element.parentNode) {
                                var nextElement = RemoteDom.domUtilities.getSubsequentNonTextNodeSibling(element.parentNode, Common.Direction.Next);
                                if(nextElement) {
                                    return nextElement;
                                } else {
                                    element = element.parentNode;
                                }
                            }
                        }
                    }
                }
                return null;
            },
            obtainPreviousDFSElement: function domExplorer$searchUtilities$obtainPreviousDFSElement(element, checkChild) {
                function getSubsequentDFSNode(element) {
                    RemoteDom.searchUtilities.previousDFSElement = element;
                    var prevSibling = RemoteDom.domUtilities.getSubsequentNonTextNodeSibling(element, Common.Direction.Previous);
                    if(prevSibling) {
                        var deepestChild = RemoteDom.searchUtilities.getDeepestRightChild(prevSibling);
                        return deepestChild ? deepestChild : element.parentNode;
                    }
                    return element.parentNode;
                }
                if(element.tagName === "IFRAME" || element.tagName === "FRAME") {
                    RemoteDom.searchUtilities.previousDFSElement = element;
                    var previousElement = RemoteDom.domUtilities.getSubsequentElementAfterIframe(RemoteDom.domUtilities.getRootElementOfNode(element), element, Common.Direction.Previous);
                    RemoteDom.searchUtilities.initializeIframeStack(previousElement, Common.Direction.Previous);
                    return previousElement;
                }
                var firstChild = RemoteDom.searchUtilities.getSubsequentNonWhiteSpacedChild(element, Common.Direction.Next);
                if(checkChild && firstChild) {
                    if(RemoteDom.searchUtilities.previousDFSElement === firstChild) {
                        return getSubsequentDFSNode(element);
                    } else if(firstChild && (firstChild.tagName === "IFRAME" || firstChild.tagName === "FRAME")) {
                        var view = Common.RemoteHelpers.getDefaultView(firstChild.ownerDocument);
                        var result = Common.RemoteHelpers.getValidWindow(view, firstChild.contentWindow);
                        if(result.isValid && RemoteDom.searchUtilities.previousDFSElement === result.window.document) {
                            return getSubsequentDFSNode(element);
                        }
                    } else {
                        return RemoteDom.searchUtilities.getDeepestRightChild(element);
                    }
                } else {
                    return getSubsequentDFSNode(element);
                }
            },
            initializeIframeStack: function domExplorer$searchUtilities$initializeIframeStack(startElement, searchDirection) {
                var iframeChain = RemoteDom.dom$messageHandlers.getIFrameChain(mainBrowser.document, RemoteDom.domUtilities.getRootElementOfNode(startElement));
                RemoteDom.searchUtilities.iframeStack = [];
                RemoteDom.searchUtilities.iframeStack.push(mainBrowser.document);
                if(iframeChain && iframeChain.length > 0) {
                    for(var index = iframeChain.length; index > 0; index--) {
                        var parentDocument = mainBrowser.document;
                        if(index !== iframeChain.length) {
                            var parentWindow = Common.RemoteHelpers.getDefaultView(iframeChain[index].ownerDocument);
                            var result = Common.RemoteHelpers.getValidWindow(parentWindow, iframeChain[index].contentWindow);
                            if(result.isValid) {
                                parentDocument = result.window.document;
                            }
                        }
                        if(searchDirection === Common.Direction.Next) {
                            RemoteDom.searchUtilities.iframeStack.push(RemoteDom.domUtilities.getSubsequentElementAfterIframe(parentDocument, iframeChain[index - 1], Common.Direction.Next));
                        } else {
                            RemoteDom.searchUtilities.iframeStack.push(iframeChain[index - 1]);
                        }
                    }
                }
                if(startElement.parentNode && startElement !== mainBrowser.document.documentElement) {
                    if(startElement.children && startElement.children.length > 0) {
                        RemoteDom.searchUtilities.previousDFSElement = startElement.children[0];
                    }
                }
            },
            listContainsElement: function domExplorer$searchUtilities$listContainsElement(elementList, element) {
                if(elementList && elementList.length > 0) {
                    for(var index = 0; index < elementList.length; index++) {
                        if(element === elementList[index]) {
                            return index;
                        }
                    }
                }
                return -1;
            },
            obtainSubsequentDFSElement: function domExplorer$searchUtilities$obtainSubsequentDFSElement(element, searchDirection, startElement) {
                var checkChild = !(element === startElement && element !== mainBrowser.document && searchDirection === Common.Direction.Previous);
                if(searchDirection === Common.Direction.Next) {
                    return RemoteDom.searchUtilities.obtainNextDFSElement(element, checkChild);
                } else {
                    return RemoteDom.searchUtilities.obtainPreviousDFSElement(element, checkChild);
                }
            },
            popOutOfIframe: function domExplorer$searchUtilities$popOutOfIframe() {
                var element = RemoteDom.searchUtilities.iframeStack.pop();
                if(RemoteDom.searchUtilities.iframeStack.length === 0) {
                    RemoteDom.searchUtilities.iframeStack.push(mainBrowser.document);
                    RemoteDom.searchUtilities.previousDFSElement = null;
                }
                return element;
            },
            queryFrameUsingQuerySelector: function queryframeUsingQuerySelector(element, userQuerySelector) {
                var ownerDocument = mainBrowser.document["__unitTest"] ? mainBrowser.document : element.ownerDocument || element;
                for(var resultIndex = 0; resultIndex < RemoteDom.searchUtilities.querySelectorResults.length; resultIndex++) {
                    if(RemoteDom.searchUtilities.querySelectorResults[resultIndex].doc === ownerDocument) {
                        return RemoteDom.searchUtilities.querySelectorResults[resultIndex].result;
                    }
                }
                var resultsArray = [];
                try  {
                    if(ownerDocument.querySelectorAll) {
                        var results = ownerDocument.querySelectorAll(userQuerySelector);
                        if(results && results.length > 0) {
                            for(var index = 0; index < results.length; index++) {
                                resultsArray.push(results[index]);
                            }
                        }
                        RemoteDom.searchUtilities.querySelectorResults.push({
                            doc: ownerDocument,
                            result: resultsArray
                        });
                    }
                } catch (ex) {
                    Common.RemoteHelpers.encounteredException(ex);
                }
                return resultsArray;
            },
            getSearchResult: function domExplorer$searchUtilities$getSearchResult(startElement, userTextTerm, searchDirection, startFromCurrentElement) {
                RemoteDom.searchUtilities.querySelectorResults = [];
                RemoteDom.searchUtilities.initializeIframeStack(startElement, searchDirection);
                var element = startElement;
                var docTraversalComplete = false;
                var searchProgress = false;
                while(!docTraversalComplete) {
                    if(!startFromCurrentElement) {
                        searchProgress = true;
                        element = RemoteDom.searchUtilities.obtainSubsequentDFSElement(element, searchDirection, startElement);
                    } else {
                        startFromCurrentElement = false;
                    }
                    if(element) {
                        var results = RemoteDom.searchUtilities.queryFrameUsingQuerySelector(element, userTextTerm);
                        if(results && RemoteDom.searchUtilities.listContainsElement(results, element) !== -1) {
                            return element;
                        }
                        var stringifiedNode = htmlTreeHelpers.createStringForElement(element);
                        if(stringifiedNode && stringifiedNode.toLowerCase().indexOf(userTextTerm.toLowerCase()) !== -1) {
                            return element;
                        }
                    }
                    if(element === startElement && searchProgress) {
                        docTraversalComplete = true;
                    }
                    while(!element) {
                        element = RemoteDom.searchUtilities.popOutOfIframe();
                        startFromCurrentElement = true;
                    }
                }
                return null;
            }
        };
        RemoteDom.dom$messageHandlers = {
            initializeHost: function domExplorer$messageHandlers$initializeHost(hostId) {
                RemoteDom.remoteCode.hostId = hostId;
            },
            startSingleEdit: function domExplorer$messageHandlers$startSingleEdit() {
                RemoteDom.remoteCode.editStack.startSingleEdit();
            },
            endSingleEdit: function domExplorer$messageHandlers$endSingleEdit() {
                RemoteDom.remoteCode.editStack.endSingleEdit();
            },
            enableEditChaining: function domExplorer$messageHandlers$enableEditChaining() {
                RemoteDom.remoteCode.editStack.enableChaining();
            },
            disableEditChaining: function domExplorer$messageHandlers$disableEditChaining() {
                RemoteDom.remoteCode.editStack.disableChaining();
            },
            undoLastEdit: function domExplorer$messageHandlers$performUndo() {
                return RemoteDom.remoteCode.editStack.undo();
            },
            performNextEdit: function domExplorer$messageHandlers$performEdit() {
                return RemoteDom.remoteCode.editStack.performNextEdit();
            },
            setTestEditCallbacks: function domExplorer$messageHandlers$performEdit(testEditCallback, testUndoCallback) {
                RemoteDom.remoteCode.editStack.setTestEditCallbacks(testEditCallback, testUndoCallback);
            },
            somethingToUndo: function domExplorer$messageHandlers$somethingToUndo() {
                return RemoteDom.remoteCode.editStack.somethingToUndo();
            },
            somethingToDo: function domExplorer$messageHandlers$somethingToDo() {
                return RemoteDom.remoteCode.editStack.somethingToDo();
            },
            getRootElement: function domExplorer$messageHandlers$getRootElement() {
                RemoteDom.domUtilities.reset();
                if((typeof mainBrowser.document) === "object") {
                    if(Common.RemoteHelpers.getDocumentMode() < 9 && mainBrowser.document.readyState !== "complete") {
                        var defaultView = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                        Common.RemoteHelpers.addSafeListener(defaultView, mainBrowser.document, "readystatechange", function () {
                            if(mainBrowser.document.readyState === "complete") {
                                RemoteDom.remoteCode.initializePage();
                            }
                        }, false);
                    }
                    return htmlTreeHelpers.createMappedNode(mainBrowser.document, false, false);
                }
                return null;
            },
            getChildren: function domExplorer$messageHandlers$getChildren(uid, showAll, callback) {
                try  {
                    var ret = htmlTreeHelpers.getChildrenForMappedNode(uid, false, showAll);
                } catch (ex) {
                    if((ex.number & 0xFFFFFFFF) === (0x800A0046 & 0xFFFFFFFF)) {
                        htmlTreeHelpers.deleteMappedNode(uid);
                        ret = null;
                    } else {
                        throw ex;
                    }
                }
                if(!ret) {
                    RemoteDom.remoteCode.onBeforeScriptExecute(Common.RemoteHelpers.getDefaultView(mainBrowser.document));
                } else {
                    RemoteDom.domUtilities.getChunker().sendChildren(htmlTreeHelpers.mapping[uid], ret, showAll, callback);
                }
            },
            attachDOMContentLoadedEvent: function domExplorer$messageHandlers$attachDOMContentLoadedEvent(uid, callback) {
                if(!mainBrowser.document.addEventListener || !RemoteDom.remoteCode.scriptExecutionSupported) {
                    return;
                }
                var defaultView = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                Common.RemoteHelpers.addSafeListener(defaultView, mainBrowser.document, "DOMContentLoaded", function () {
                    RemoteDom.dom$messageHandlers.getChildren(uid, true, function (chunk) {
                        callback({
                            uid: uid,
                            children: chunk.children
                        });
                    });
                }, true);
            },
            removeChildMappings: function domExplorer$messageHandlers$removeChildMappings(uid) {
                htmlTreeHelpers.deleteMappedNode(uid, true);
            },
            editAttribute: function domExplorer$messageHandlers$editAttribute(uid, name, value) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                var edit = new F12.RemoteDom.EditAttribute(styleUtilities, htmlTreeHelpers, mappedNode.ele, name, value);
                return RemoteDom.remoteCode.editStack.performEdit(edit);
            },
            removeAttribute: function domExplorer$messageHandlers$removeAttribute(uid, name) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                var edit = new F12.RemoteDom.RemoveAttribute(styleUtilities, htmlTreeHelpers, uid, name);
                return RemoteDom.remoteCode.editStack.performEdit(edit);
            },
            editText: function domExplorer$messageHandlers$editText(uid, newText) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                var element = mappedNode.ele;
                if(Common.RemoteHelpers.getLeafTextContent(element) !== newText) {
                    var edit = new F12.RemoteDom.EditText(element, newText);
                    RemoteDom.remoteCode.editStack.performEdit(edit);
                }
                return false;
            },
            hoverItem: function domExplorer$messageHandlers$hoverItem(uid) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    RemoteDom.domUtilities.currentHoverItemUid = null;
                    RemoteDom.domUtilities.removeHighlight();
                    return;
                }
                RemoteDom.domUtilities.currentHoverItemUid = uid;
                var element = mappedNode.ele;
                RemoteDom.domUtilities.highlightElement(element, RemoteDom.domUtilities.basicHighlightColor);
            },
            hideHoverItem: function domExplorer$messageHandlers$hideHoverItem() {
                RemoteDom.domUtilities.removeHighlight();
            },
            attachMediaQueryEvents: function domExplorer$messageHandlers$attachMediaQueryEvents(mediaChangeCallback) {
                RemoteDom.domUtilities.mediaStyleChangeCallback = mediaChangeCallback;
                if(Common.RemoteHelpers.getDocumentMode() <= 9) {
                    return;
                }
                var defaultView = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                if(!defaultView) {
                    return;
                }
                if(RemoteDom.remoteCode.scriptExecutionSupported) {
                    RemoteDom.remoteCode.safeMqlListener = remoteHelpers.createSafeFunction(defaultView, function (mql) {
                        styleUtilities.stylechange();
                    });
                    RemoteDom.remoteCode.mediaQueryLists = [];
                    var numStyleSheets = mainBrowser.document.styleSheets.length;
                    for(var i = 0; i < numStyleSheets; i++) {
                        var styleSheet = mainBrowser.document.styleSheets[i];
                        if(styleSheet.media) {
                            var mediaQueryList = defaultView.matchMedia(styleSheet.media.mediaText);
                            mediaQueryList.addListener(RemoteDom.remoteCode.safeMqlListener);
                            RemoteDom.remoteCode.mediaQueryLists.push(mediaQueryList);
                        }
                        var cssStyleSheet = styleSheet;
                        try  {
                            var numRules = cssStyleSheet.cssRules.length;
                            for(var j = 0; j < numRules; j++) {
                                var rule = (styleSheet).cssRules[j];
                                if(rule.type === defaultView.CSSRule.MEDIA_RULE || rule.type === defaultView.CSSRule.IMPORT_RULE) {
                                    var importRule = rule;
                                    mediaQueryList = defaultView.matchMedia(importRule.media.mediaText);
                                    mediaQueryList.addListener(RemoteDom.remoteCode.safeMqlListener);
                                    RemoteDom.remoteCode.mediaQueryLists.push(mediaQueryList);
                                }
                            }
                        } catch (ex) {
                            Common.RemoteHelpers.encounteredException(ex);
                        }
                    }
                }
            },
            selectElementByClick: function domExplorer$messageHandlers$selectElementByClick(selectCallback) {
                if(RemoteDom.domUtilities.isSelectingElement || !mainBrowser.document.body) {
                    return;
                }
                RemoteDom.domUtilities.isSelectingElement = true;
                RemoteDom.domUtilities.selectElementInLiveDomEnable();
                RemoteDom.domUtilities.selectElementClickCallback = selectCallback;
            },
            cancelSelectElementByClick: function domExplorer$messageHandlers$cancelSelectElementByClick() {
                if(RemoteDom.domUtilities.isSelectingElement) {
                    RemoteDom.domUtilities.removeHighlight();
                    RemoteDom.domUtilities.selectElementInLiveDomDisable();
                    RemoteDom.domUtilities.isSelectingElement = false;
                    RemoteDom.domUtilities.selectElementClickCallback = null;
                }
            },
            getIFrameChain: function domExplorer$messageHandlers$getIFrameChain(rootDocument, findDocument) {
                var tags = rootDocument.querySelectorAll("iframe, frame");
                for(var i = 0, n = tags.length; i < n; i++) {
                    var frame = tags[i];
                    var view = Common.RemoteHelpers.getDefaultView(rootDocument);
                    var result = Common.RemoteHelpers.getValidWindow(view, frame.contentWindow);
                    if(result.isValid) {
                        if(result.window.document === findDocument) {
                            return [
                                tags[i]
                            ];
                        }
                        var chain = RemoteDom.dom$messageHandlers.getIFrameChain(result.window.document, findDocument);
                        if(chain && chain.length > 0) {
                            chain.push(tags[i]);
                            return chain;
                        }
                    }
                }
                return [];
            },
            getParentChainForSelectedElement: function domExplorer$messageHandlers$getParentChainForSelectedElement() {
                return RemoteDom.domUtilities.findParentChainForElement(RemoteDom.domUtilities.selectElementLastSelected);
            },
            inspectElement: function domExplorer$messageHandlers$inspectElement(element) {
                if(!element || !htmlTreeHelpers.isElementAccessible(element)) {
                    return;
                }
                RemoteDom.dom$messageHandlers.selectElementFromConsole(element);
                RemoteDom.remoteCode.vsFocusCallback(true);
            },
            inspectElementById: function domExplorer$messageHandlers$inspectElementById(inspectElementId) {
                try  {
                    var element = dom.getElementByUniqueId(inspectElementId);
                    RemoteDom.dom$messageHandlers.inspectElement(element);
                } catch (ex) {
                }
            },
            findTerm: function domExplorer$messageHandlers$findTerm(currentSelectedUID, searchTerm, searchDirection, isQuerySelectorSearch) {
                RemoteDom.searchUtilities.previousDFSElement = null;
                RemoteDom.searchUtilities.iframeStack = null;
                var startFromCurrent = false;
                var element = null;
                var mappedNode;
                var matches = currentSelectedUID.match(/^(style|script)/);
                if(matches) {
                    mappedNode = htmlTreeHelpers.mapping[currentSelectedUID.replace(matches[0], "")];
                    if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                        element = mainBrowser.document;
                    } else {
                        if(searchDirection === Common.Direction.Next) {
                            element = RemoteDom.searchUtilities.obtainNextDFSElement(mappedNode.ele, false);
                            startFromCurrent = true;
                            if(!element) {
                                RemoteDom.searchUtilities.initializeIframeStack(mappedNode.ele, Common.Direction.Next);
                                if(RemoteDom.searchUtilities.iframeStack && RemoteDom.searchUtilities.iframeStack.length) {
                                    element = RemoteDom.searchUtilities.iframeStack[RemoteDom.searchUtilities.iframeStack.length - 1];
                                    RemoteDom.searchUtilities.iframeStack = null;
                                } else {
                                    element = mainBrowser.document;
                                }
                            }
                        } else {
                            element = mappedNode.ele;
                        }
                    }
                } else {
                    mappedNode = htmlTreeHelpers.mapping[currentSelectedUID];
                    if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                        element = mainBrowser.document;
                    } else {
                        element = mappedNode.ele;
                    }
                }
                var result = RemoteDom.searchUtilities.getSearchResult(element, searchTerm, searchDirection, startFromCurrent);
                return result ? RemoteDom.domUtilities.findParentChainForElement(result) : [];
            },
            getComputedBox: function domExplorer$messageHandlers$getComputedBox(uid) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                var element = mappedNode.ele;
                if(!element.tagName) {
                    return;
                }
                var computedBox = {
                    offsetTop: 0,
                    offsetLeft: 0,
                    clientWidth: 0,
                    clientHeight: 0
                };
                var win = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                var compStyle = Common.RemoteHelpers.getComputedStyle(win, element);
                var i;
                var styleProperties = styleUtilities.styleProperties;
                for(i = 0; i < styleProperties.length; i++) {
                    computedBox[styleProperties[i]] = compStyle[styleProperties[i]];
                }
                var elementProperties = styleUtilities.elementProperties;
                for(i = 0; i < elementProperties.length; i++) {
                    computedBox[elementProperties[i]] = element[elementProperties[i]];
                }
                if(Common.RemoteHelpers.getDocumentMode() >= 9 && typeof computedBox.offsetTop === "undefined" && typeof computedBox.offsetLeft == "undefined") {
                    if(element && element.getBoundingClientRect) {
                        var rect = element.getBoundingClientRect();
                        if(rect.top !== undefined && rect.left !== undefined && rect.width !== undefined && rect.height !== undefined) {
                            var body = mainBrowser.document.body;
                            var docElem = mainBrowser.document.documentElement;
                            var scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop;
                            var scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft;
                            var clientTop = docElem.clientTop || body.clientTop || 0;
                            var clientLeft = docElem.clientLeft || body.clientLeft || 0;
                            computedBox.offsetTop = Math.round(rect.top + scrollTop - clientTop);
                            computedBox.offsetLeft = Math.round(rect.left + scrollLeft - clientLeft);
                            computedBox.clientWidth = rect.width;
                            computedBox.clientHeight = rect.height;
                        }
                    }
                }
                for(var prop in computedBox) {
                    if(computedBox[prop]) {
                        computedBox[prop] = styleUtilities.standardizeLayoutUnits(computedBox[prop]);
                    }
                }
                return computedBox;
            },
            getComputedBoxValueByElement: function domExplorer$messageHandlers$getComputedBoxValueByElement(element, property) {
                var value;
                var i;
                var styleProperties = styleUtilities.styleProperties;
                for(i = 0; i < styleProperties.length; i++) {
                    if(styleProperties[i] === property) {
                        var win = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                        var compStyle = Common.RemoteHelpers.getComputedStyle(win, element);
                        value = compStyle[property];
                        break;
                    }
                }
                var elementProperties = styleUtilities.elementProperties;
                for(i = 0; i < elementProperties.length; i++) {
                    if(elementProperties[i] === property) {
                        value = element[property];
                        break;
                    }
                }
                return styleUtilities.standardizeLayoutUnits(value);
            },
            addAttrModifiedEvent: function domExplorer$messageHandlers$addAttrModifiedEvent(uid) {
                var nodeToAddCallbackTo = htmlTreeHelpers.mapping[uid];
                if(!nodeToAddCallbackTo || !htmlTreeHelpers.isElementAccessible(nodeToAddCallbackTo.ele)) {
                    return false;
                }
                var defaultView = Common.RemoteHelpers.getDefaultView(nodeToAddCallbackTo.ele.ownerDocument);
                if(nodeToAddCallbackTo.pendingAttrModified) {
                    RemoteDom.domUtilities.getMutationManager().fireAttributeModified(nodeToAddCallbackTo);
                }
                if(htmlTreeHelpers.hasSpecialValueAttribute(nodeToAddCallbackTo.ele) && nodeToAddCallbackTo.ele.attachEvent && RemoteDom.remoteCode.scriptExecutionSupported) {
                    if(nodeToAddCallbackTo.onValueModified) {
                        Common.RemoteHelpers.removeListener(nodeToAddCallbackTo.ele, "propertychange", nodeToAddCallbackTo.onValueModified);
                    }
                    var onPropertyChanged = function (e) {
                        if(e.propertyName === "value") {
                            RemoteDom.domUtilities.getMutationManager().fireAttributeModified(e.srcElement, "value", (e.srcElement).value, 0);
                        }
                    };
                    nodeToAddCallbackTo.onValueModified = Common.RemoteHelpers.addSafeListener(defaultView, nodeToAddCallbackTo.ele, "propertychange", onPropertyChanged);
                }
                if(!htmlTreeHelpers.isElementAccessible(nodeToAddCallbackTo.ele.ownerDocument)) {
                    return false;
                }
                var root = nodeToAddCallbackTo.ele.ownerDocument;
                for(var docIndex = 0; docIndex < RemoteDom.domUtilities.attachedAttrModifiedDocs.length; docIndex++) {
                    var docInfo = RemoteDom.domUtilities.attachedAttrModifiedDocs[docIndex];
                    if(docInfo.doc === root) {
                        nodeToAddCallbackTo.onAttributeModified = docInfo.callback;
                        return false;
                    }
                }
                if(RemoteDom.remoteCode.scriptExecutionSupported) {
                    var onModified = function (e) {
                        var parentElement = e.srcElement;
                        if(!parentElement) {
                            return;
                        }
                        RemoteDom.domUtilities.getMutationManager().fireAttributeModified(e.target, e.attrName, e.newValue, e.attrChange, e.attrName === "style" ? styleUtilities.styleAttrModified.bind(styleUtilities) : null);
                    };
                    var onModifiedSafe = Common.RemoteHelpers.addSafeListener(defaultView, root, "DOMAttrModified", onModified, true);
                    RemoteDom.domUtilities.attachedAttrModifiedDocs.push({
                        doc: root,
                        handler: onModifiedSafe
                    });
                }
                return true;
            },
            setupTreeModifiedEvent: function domExplorer$messageHandlers$setupTreeModifiedEvent(callback) {
                RemoteDom.domUtilities.getMutationManager().treeModifiedCallback = callback;
            },
            setupAttributeModifiedEvent: function domExplorer$messageHandlers$setupAttributeModifiedEvent(callback) {
                RemoteDom.domUtilities.getMutationManager().attributeModifiedCallback = callback;
            },
            addTreeModifiedEvent: function domExplorer$messageHandlers$addTreeModifiedEvent(uid) {
                var nodeToAddCallbackTo = htmlTreeHelpers.mapping[uid];
                if(!nodeToAddCallbackTo || !htmlTreeHelpers.isElementAccessible(nodeToAddCallbackTo.ele)) {
                    return false;
                }
                nodeToAddCallbackTo.listenForTreeModified = true;
                if(!htmlTreeHelpers.isElementAccessible(nodeToAddCallbackTo.ele.ownerDocument)) {
                    return false;
                }
                var root = nodeToAddCallbackTo.ele.ownerDocument;
                for(var docIndex = 0; docIndex < RemoteDom.domUtilities.attachedDomModifiedDocs.length; docIndex++) {
                    var docInfo = RemoteDom.domUtilities.attachedDomModifiedDocs[docIndex];
                    if(docInfo.doc === root) {
                        return false;
                    }
                }
                var deferModifiedList = [];
                var deferModifiedTimeoutFlag = false;
                var onModified = function domExplorer$messageHandlers$addTreeModifiedEvent$onModified(e) {
                    function addFirstChild(mappedNode, mappedChild) {
                        mappedNode.childrenNodes = [
                            mappedChild
                        ];
                        var mapping = htmlTreeHelpers.mapping;
                        var entry = mapping[mappedChild.uid];
                        if(entry && entry.ele && entry.ele.nodeName === "#text") {
                            var textContent = Common.RemoteHelpers.getLeafTextContent(entry.ele);
                            if(!String.prototype.match.call(textContent, /\n/g) && textContent.length < htmlTreeHelpers.maxInlineLength) {
                                mappedNode.mapped.hasChildren = false;
                                mappedNode.mapped.text = textContent;
                            } else {
                                mappedNode.mapped.hasChildren = true;
                            }
                        }
                    }
                    function findMappedNodeByElement(element) {
                        var uidString = RemoteDom.remoteCode.getUidOrNull(element);
                        return uidString && htmlTreeHelpers.mapping[uidString];
                    }
                    function removeElementFromMappedNode(mappedNode, element) {
                        if(mappedNode.mapped && mappedNode.mapped.hasChildren && !mappedNode.childrenNodes) {
                            mappedNode.childrenNodes = [
                                {
                                    uid: "expandMe"
                                }
                            ];
                        }
                        if(mappedNode.childrenNodes) {
                            if(mappedNode.childrenNodes.length === 1 && mappedNode.childrenNodes[0].uid === "expandMe") {
                                if(mappedNode.ele.childNodes.length === 0 || mappedNode.ele.children && mappedNode.ele.children.length === 1 && (mappedNode.ele.children[0]).uniqueID === (element).uniqueID) {
                                    mappedNode.childrenNodes = [];
                                }
                            } else {
                                var mapping = htmlTreeHelpers.mapping;
                                for(var i = 0; i < mappedNode.childrenNodes.length; i++) {
                                    var childUid = mappedNode.childrenNodes[i].uid;
                                    var childNode = mapping[childUid];
                                    if(childNode && mapping[childUid].ele === element) {
                                        htmlTreeHelpers.deleteMappedNode(childUid);
                                        mappedNode.childrenNodes.splice(i, 1);
                                        break;
                                    }
                                }
                            }
                            mappedNode.mapped.hasChildren = (mappedNode.childrenNodes && mappedNode.childrenNodes.length > 0);
                        } else if(element.nodeName === "#text") {
                            delete mappedNode.mapped.text;
                        }
                    }
                    function synchronizeMappedNodeChildren(mappedNode) {
                        var e = mappedNode.ele;
                        var children;
                        try  {
                            children = e.childNodes;
                        } catch (ex) {
                            children = undefined;
                        }
                        var i;
                        var end;
                        var mappedNodeChildrenMap = {
                        };
                        if(mappedNode.childrenNodes) {
                            for(i = 0 , end = mappedNode.childrenNodes.length; i < end; i++) {
                                var uid = mappedNode.childrenNodes[i].uid;
                                mappedNodeChildrenMap[uid] = true;
                            }
                        }
                        var newChildren = [];
                        if(children) {
                            for(i = 0 , end = children.length; i < end; i++) {
                                var child = children[i];
                                var childUid = RemoteDom.remoteCode.getUidOrNull(child);
                                var found = childUid && mappedNodeChildrenMap[childUid];
                                if(!found) {
                                    newChildren.push(child);
                                }
                            }
                        }
                        for(i = 0 , end = newChildren.length; i < end; i++) {
                            if(mappedNode.isExpanded) {
                                addElementToMappedNode(mappedNode, newChildren[i]);
                            } else {
                                addElementToNonExpandedMappedNode(mappedNode, newChildren[i]);
                            }
                        }
                        return newChildren.length > 0;
                    }
                    function synchronizeMappedNodeChildrenFn() {
                        deferModifiedTimeoutFlag = false;
                        for(var i = 0, end = deferModifiedList.length; i < end; i++) {
                            var mappedNode = deferModifiedList[i].mappedNode;
                            if(synchronizeMappedNodeChildren(mappedNode)) {
                                var uid = deferModifiedList[i].uid;
                                RemoteDom.domUtilities.getMutationManager().fireTreeModified(mappedNode, uid);
                            }
                        }
                        deferModifiedList = [];
                    }
                    function deferSynchronizeMappedNodeChildren(mappedNode, uid) {
                        deferModifiedList.push({
                            mappedNode: mappedNode,
                            uid: uid
                        });
                        if(!deferModifiedTimeoutFlag) {
                            try  {
                                deferModifiedTimeoutFlag = true;
                                diagnostics.setTimeout(synchronizeMappedNodeChildrenFn, 0);
                            } catch (e) {
                                Common.RemoteHelpers.encounteredException(e);
                            }
                        }
                    }
                    function removeMappedNodeAndDescendants(node) {
                        if(node.hasChildNodes) {
                            for(var i = 0; i < node.childNodes.length; i++) {
                                var childNode = node.childNodes[i];
                                removeMappedNodeAndDescendants(childNode);
                            }
                        }
                        var uid = RemoteDom.remoteCode.getUidOrNull(node);
                        if(uid) {
                            var map = htmlTreeHelpers.mapping;
                            delete map[uid];
                        }
                    }
                    function addElementToMappedNode(mappedNode, element) {
                        var mappedChild = htmlTreeHelpers.createMappedNode(element, false);
                        if(mappedChild) {
                            if(!mappedNode.childrenNodes || mappedNode.childrenNodes.length === 0) {
                                addFirstChild(mappedNode, mappedChild);
                            } else {
                                var found = false;
                                var existingChildren = mappedNode.ele.childNodes;
                                var insertIndex = 0;
                                for(var nodeIndex = 0; nodeIndex < existingChildren.length; nodeIndex++ , insertIndex++) {
                                    var existingChild = existingChildren[nodeIndex];
                                    if(existingChild === element) {
                                        mappedNode.childrenNodes.splice(insertIndex, 0, mappedChild);
                                        found = true;
                                        break;
                                    } else if(existingChild.nodeName === "#text") {
                                        var text = Common.RemoteHelpers.getLeafTextContent(existingChild);
                                        if(typeof text === "string" && !/\S/.test(text)) {
                                            insertIndex--;
                                        }
                                    }
                                }
                                if(!found) {
                                    mappedNode.childrenNodes.push(mappedChild);
                                }
                            }
                        }
                    }
                    function addElementToNonExpandedMappedNode(mappedNode, element) {
                        var mappedChild = htmlTreeHelpers.createMappedNode(element, false);
                        if(mappedChild && (!mappedNode.childrenNodes || mappedNode.childrenNodes.length === 0) && !mappedNode.mapped.hasChildren) {
                            addFirstChild(mappedNode, mappedChild);
                        } else {
                            mappedNode.mapped.hasChildren = true;
                            mappedNode.childrenNodes = [
                                {
                                    uid: "expandMe"
                                }
                            ];
                        }
                    }
                    function removeTextElementIfAlreadyExistsInMapping(element) {
                        if(!element) {
                            return;
                        }
                        if(element.nodeName !== "#text") {
                            return;
                        }
                        var mappedNode = findMappedNodeByElement(element);
                        var parentUid = mappedNode && mappedNode.mapped && mappedNode.mapped.parentUid;
                        if(!parentUid) {
                            return;
                        }
                        var parentMappedNode = htmlTreeHelpers.mapping[parentUid];
                        if(!parentMappedNode) {
                            return;
                        }
                        removeElementFromMappedNode(parentMappedNode, element);
                        RemoteDom.domUtilities.getMutationManager().fireTreeModified(parentMappedNode, parentUid);
                    }
                    function workaroundReconciliation(element) {
                        if(!element || !element.childNodes || element.childNodes.length !== 1 || element.firstChild.nodeType !== element.firstChild.TEXT_NODE) {
                            return;
                        }
                        var mappedNode = findMappedNodeByElement(element);
                        if(!mappedNode.childrenNodes) {
                            return;
                        }
                        var children = mappedNode.childrenNodes.slice(0);
                        for(var i = 0, end = children.length; i < end; i++) {
                            var childUid = children[i].uid;
                            if(typeof childUid !== "string" || !childUid) {
                                continue;
                            }
                            var childMappedNode = htmlTreeHelpers.mapping[childUid];
                            if(childMappedNode && childMappedNode.ele !== element.firstChild) {
                                removeElementFromMappedNode(mappedNode, childMappedNode.ele);
                            }
                        }
                    }
                    var element = e.target;
                    if(!element) {
                        return;
                    }
                    var parentElement = e.target.parentNode;
                    if(!parentElement) {
                        var uid = RemoteDom.remoteCode.getUidOrNull(element);
                        if(uid && htmlTreeHelpers.mapping[uid]) {
                            htmlTreeHelpers.deleteMappedNode(uid);
                        }
                        return;
                    }
                    var parentMappedNode = findMappedNodeByElement(parentElement);
                    if(parentMappedNode) {
                        var parentUid = RemoteDom.remoteCode.getUidOrNull(parentElement);
                        if(e.type === "DOMNodeInserted" || e.type === "DOMCharacterDataModified") {
                            if(e.type === "DOMCharacterDataModified") {
                                workaroundReconciliation(e.target.parentNode);
                            }
                            if(e.target.nodeName === "#text") {
                                removeTextElementIfAlreadyExistsInMapping(e.target);
                            }
                            if(parentMappedNode.isExpanded) {
                                addElementToMappedNode(parentMappedNode, element);
                            } else {
                                addElementToNonExpandedMappedNode(parentMappedNode, element);
                            }
                        } else if(e.type === "DOMNodeRemoved") {
                            removeElementFromMappedNode(parentMappedNode, element);
                            removeMappedNodeAndDescendants(element);
                            deferSynchronizeMappedNodeChildren(parentMappedNode, parentUid);
                        }
                        RemoteDom.domUtilities.getMutationManager().fireTreeModified(parentMappedNode, parentUid);
                    }
                };
                var onUnload = function domExplorer$messageHandlers$addTreeModifiedEvent$onUnload(e) {
                    RemoteDom.remoteCode.editStack.reset();
                    var target = Common.RemoteHelpers.getEventTarget(e);
                    if(!target) {
                        return;
                    }
                    var iframeChain = RemoteDom.dom$messageHandlers.getIFrameChain(mainBrowser.document, target.document);
                    if(iframeChain.length > 0) {
                        var targetElement = iframeChain[0];
                        var mappedNode = null;
                        var uid = RemoteDom.remoteCode.getUidOrNull(targetElement);
                        if(uid) {
                            if(htmlTreeHelpers.mapping[uid] && htmlTreeHelpers.mapping[uid].ele === targetElement) {
                                mappedNode = htmlTreeHelpers.mapping[uid];
                            }
                        } else {
                            for(uid in htmlTreeHelpers.mapping) {
                                if(htmlTreeHelpers.mapping[uid].ele === targetElement) {
                                    mappedNode = htmlTreeHelpers.mapping[uid];
                                    break;
                                }
                            }
                        }
                        if(mappedNode) {
                            var removeEvent = {
                                type: "DOMNodeRemoved",
                                target: mappedNode.ele
                            };
                            onModified(removeEvent);
                        }
                    }
                };
                if(RemoteDom.remoteCode.scriptExecutionSupported) {
                    var root = nodeToAddCallbackTo.ele.ownerDocument;
                    var defaultView = Common.RemoteHelpers.getDefaultView(root);
                    var onModifiedSafe = Common.RemoteHelpers.addSafeListener(defaultView, root, "DOMNodeInserted", onModified, true);
                    Common.RemoteHelpers.addListener(root, "DOMNodeRemoved", onModifiedSafe, true);
                    Common.RemoteHelpers.addListener(root, "DOMCharacterDataModified", onModifiedSafe, true);
                    if(!RemoteDom.remoteCode.unloadSafe) {
                        RemoteDom.remoteCode.unloadSafe = Common.RemoteHelpers.addSafeListener(defaultView, defaultView, "unload", onUnload, true);
                    }
                    RemoteDom.domUtilities.attachedDomModifiedDocs.push({
                        doc: root,
                        handler: onModifiedSafe
                    });
                }
                return true;
            },
            getElementUid: function domExplorer$messageHandlers$getElementUid(element) {
                if(element) {
                    var uid = element["uniqueID"];
                    if(uid && htmlTreeHelpers.mapping[uid]) {
                        return uid;
                    }
                    uid = element["bpt-uid"];
                    if(uid && htmlTreeHelpers.mapping[uid]) {
                        return uid;
                    }
                }
                return null;
            },
            getWinningProperty: function domExplorer$messageHandlers$getWinningRule(propertyName) {
                var mappedProperty = styleUtilities.getWinningProperty(propertyName);
                return mappedProperty ? mappedProperty.appliedProperty.uid : "";
            },
            getCssClassesUsedInCurrentDocument: function domExplorer$messageHandlers$getCssClassesUsedInCurrentDocument(uid) {
                if(Common.RemoteHelpers.getDocumentMode() < 8) {
                    return [];
                }
                var docToSearch = mainBrowser.document;
                if(uid) {
                    var mappedNode = htmlTreeHelpers.mapping[uid];
                    if(mappedNode && mappedNode.ele && mappedNode.ele.ownerDocument) {
                        docToSearch = mappedNode.ele.ownerDocument;
                    }
                }
                return F12.RemoteDom.CssInformationExtractor.getCssClassesUsedInCurrentDocument(docToSearch);
            },
            getComputedStyles: function domExplorer$messageHandlers$getComputedStyles(uid) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                if(mappedNode.parentUid) {
                    mappedNode = htmlTreeHelpers.mapping[mappedNode.parentUid];
                    if(!mappedNode) {
                        return;
                    }
                }
                var element = mappedNode.ele;
                var computedStyles = styleUtilities.getComputedStyle(element);
                return [
                    computedStyles
                ];
            },
            arrayContains: function domExplorer$messageHandlers$arrayContains(array, value) {
                for(var i = 0; i < array.length; i++) {
                    if(array[i] === value) {
                        return true;
                    }
                }
                return false;
            },
            clearStyleCache: function domExplorer$messageHandlers$clearStyleCache() {
                styleUtilities.clearCache(false);
                RemoteDom.remoteCode.editStack.reset();
            },
            getParentChainForStyle: function domExplorer$messageHandlers$getParentChainForStyle(uid) {
                var element = styleUtilities.getElementForStyle(uid);
                if(element) {
                    return RemoteDom.domUtilities.findParentChainForElement(element);
                }
            },
            getStyles: function domExplorer$messageHandlers$getStyles(uid) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                if(mappedNode.parentUid) {
                    mappedNode = htmlTreeHelpers.mapping[mappedNode.parentUid];
                    if(!mappedNode) {
                        return;
                    }
                }
                return styleUtilities.refreshCurrentRules(mappedNode.ele);
            },
            getChangedStyles: function domExplorer$messageHandlers$getChangedStyles() {
                return styleUtilities.getChangedRules();
            },
            EditStylePropertyEnable: function domExplorer$messageHandlers$EditStylePropertyEnable(propertyUid, enable) {
                var mappedProperty = styleUtilities.lookupMappedProperty(propertyUid);
                if(mappedProperty) {
                    var edit = new F12.RemoteDom.EditStylePropertyEnable(styleUtilities, mappedProperty, enable);
                    RemoteDom.remoteCode.editStack.performEdit(edit);
                }
            },
            deleteElement: function domExplorer$messageHandlers$deleteElement(uid) {
                var isStyle = false;
                if(uid.substr(0, 5) === "style") {
                    uid = uid.substr(5);
                    isStyle = true;
                }
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return false;
                }
                var edit = new F12.RemoteDom.DeleteElement(mappedNode.ele, isStyle);
                return RemoteDom.remoteCode.editStack.performEdit(edit);
            },
            addElement: function domExplorer$messageHandlers$addElement(parentUid, beforeUid, htmlText) {
                var parentNode = htmlTreeHelpers.mapping[parentUid];
                if(!parentNode || !htmlTreeHelpers.isElementAccessible(parentNode.ele)) {
                    return false;
                }
                var parentElement = parentNode.ele;
                var beforeElement = null;
                if(beforeUid) {
                    var beforeNode = htmlTreeHelpers.mapping[beforeUid];
                    if(!beforeNode || !htmlTreeHelpers.isElementAccessible(beforeNode.ele)) {
                        return false;
                    }
                    beforeElement = beforeNode.ele;
                }
                var edit = new F12.RemoteDom.AddElement(parentElement, beforeElement, htmlText);
                return RemoteDom.remoteCode.editStack.performEdit(edit);
            },
            replaceElement: function domExplorer$messageHandlers$replaceElement(parentUid, htmlText) {
                var parentNode = htmlTreeHelpers.mapping[parentUid];
                if(!parentNode || !htmlTreeHelpers.isElementAccessible(parentNode.ele)) {
                    return false;
                }
                var edit = new F12.RemoteDom.ReplaceElement(parentNode.ele, htmlText);
                return RemoteDom.remoteCode.editStack.performEdit(edit);
            },
            editStylePropertyValue: function domExplorer$messageHandlers$editStylePropertyValue(propertyUid, newValue, isImportant) {
                var mappedProperty = styleUtilities.lookupMappedProperty(propertyUid);
                if(mappedProperty) {
                    var edit = new F12.RemoteDom.EditStylePropertyValue(styleUtilities, mappedProperty, newValue, isImportant);
                    RemoteDom.remoteCode.editStack.performEdit(edit);
                    return edit.result;
                }
            },
            editStylePropertyName: function domExplorer$messageHandlers$editStylePropertyValue(propertyUid, newName) {
                var mappedProperty = styleUtilities.lookupMappedProperty(propertyUid);
                if(mappedProperty) {
                    var edit = new F12.RemoteDom.EditStylePropertyName(styleUtilities, mappedProperty, newName);
                    RemoteDom.remoteCode.editStack.performEdit(edit);
                    return edit.result;
                }
            },
            revertProperty: function domExplorer$messageHandlers$editStylePropertyValue(propertyUid, newName) {
                var mappedProperty = styleUtilities.lookupMappedProperty(propertyUid);
                if(mappedProperty) {
                    var edit = new F12.RemoteDom.RevertProperty(styleUtilities, mappedProperty);
                    RemoteDom.remoteCode.editStack.performEdit(edit);
                    return edit.result;
                }
            },
            removeStyleProperty: function domExplorer$messageHandlers$removeStyleProperty(propertyUid) {
                var mappedProperty = styleUtilities.lookupMappedProperty(propertyUid);
                if(mappedProperty) {
                    var edit = new F12.RemoteDom.EditStylePropertyRemove(styleUtilities, mappedProperty);
                    RemoteDom.remoteCode.editStack.performEdit(edit);
                    return edit.result;
                }
            },
            clearCurrentEventProxy: function domExplorer$messageHandlers$clearCurrentEventProxy() {
                RemoteDom.domUtilities.removeAllCurrentEventProxyListeners();
                RemoteDom.domUtilities.currentEventProxy = null;
            },
            collectEvents: function domExplorer$messageHandlers$collectEvents(uid, handlersRetrievedCallback, handlerAddedCallback, handlerRemovedCallback) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                var mappedElement = mappedNode.ele;
                RemoteDom.domUtilities.removeAllCurrentEventProxyListeners();
                RemoteDom.domUtilities.currentEventProxy = dom.getElementEventHelper(mappedElement);
                if(!RemoteDom.domUtilities.currentEventProxy) {
                    return;
                }
                RemoteDom.domUtilities.currentEventProxy = dom.getElementEventHelper(mappedElement);
                var addedCallback = function (a) {
                    RemoteDom.dom$messageHandlers.onAdded(handlerAddedCallback, a);
                };
                var removedCallback = function (a) {
                    RemoteDom.dom$messageHandlers.onRemoved(handlerRemovedCallback, a);
                };
                Common.RemoteHelpers.addListener(RemoteDom.domUtilities.currentEventProxy, "listenerAdded", addedCallback);
                Common.RemoteHelpers.addListener(RemoteDom.domUtilities.currentEventProxy, "listenerRemoved", removedCallback);
                if(!RemoteDom.domUtilities.currentEventProxyListeners) {
                    RemoteDom.domUtilities.currentEventProxyListeners = [];
                }
                RemoteDom.domUtilities.currentEventProxyListeners.push({
                    name: "listenerAdded",
                    callback: addedCallback
                });
                RemoteDom.domUtilities.currentEventProxyListeners.push({
                    name: "listenerRemoved",
                    callback: removedCallback
                });
                var listeners = RemoteDom.domUtilities.currentEventProxy.getEventHandlers();
                handlersRetrievedCallback(listeners);
            },
            onAdded: function (handlerAddedCallback, a) {
                handlerAddedCallback(a.listener);
            },
            onRemoved: function (handlerRemovedCallback, a) {
                handlerRemovedCallback(a.listener);
            },
            getDocumentMode: function domExplorer$messageHandlers$getDocumentMode() {
                return Common.RemoteHelpers.getDocumentMode();
            },
            getHTMLString: function domExplorer$messageHandlers$getHTMLString(uid, getInnerHTML) {
                var style = false;
                if(uid.substr(0, 5) === "style") {
                    uid = uid.substr(5);
                    style = true;
                }
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                if(style) {
                    if(mappedNode.ele.nodeName === "STYLE") {
                        return mappedNode.ele.styleSheet ? mappedNode.ele.styleSheet.cssText : Common.RemoteHelpers.getLeafTextContent(mappedNode.ele);
                    }
                }
                var element = mappedNode.ele;
                if(!element.tagName) {
                    if(element.nodeType === element.DOCUMENT_TYPE_NODE) {
                        return Common.RemoteHelpers.getDocumentTypeNodeText(element);
                    }
                    if(element.text) {
                        return element.text;
                    }
                    var textContent = Common.RemoteHelpers.getLeafTextContent(element);
                    if(textContent) {
                        return textContent;
                    }
                    return;
                }
                var resultHtml;
                if(getInnerHTML) {
                    resultHtml = dom.getElementInnerHTML(mappedNode.ele);
                } else {
                    resultHtml = dom.getElementOuterHTML(mappedNode.ele);
                }
                return resultHtml;
            },
            setKeyBindCallbacks: function domExplorer$messageHandlers$setKeyBindCallbacks(onVSFocusCallback, startSelectElementByClickCallback, stopSelectElementByClickCallback, expandToSelectedItemCallback) {
                RemoteDom.remoteCode.vsFocusCallback = onVSFocusCallback;
                RemoteDom.remoteCode.startSelectElementByClickCallback = startSelectElementByClickCallback;
                RemoteDom.remoteCode.stopSelectElementByClickCallback = stopSelectElementByClickCallback;
                RemoteDom.remoteCode.expandToSelectedItemCallback = expandToSelectedItemCallback;
            },
            allowProcessToTakeForeground: function domExplorer$messageHandlers$allowProcessToTakeForeground() {
                try  {
                    (external).allowProcessToTakeForeground();
                } catch (e) {
                }
            },
            getHWND: function domExplorer$messageHandlers$getHWND() {
                return toolUI.getHWND();
            },
            takeForeground: function domExplorer$messageHandlers$takeForeground() {
                try  {
                    (external).takeForeground();
                    return true;
                } catch (e) {
                    return false;
                }
            },
            editStyleRuleAdd: function domExplorer$messageHandlers$editStyleRuleAdd(selectorText, propertyName, propertyValue, isImportant, position) {
                var edit = new F12.RemoteDom.EditStyleRuleAdd(styleUtilities, selectorText, propertyName, propertyValue, isImportant, position);
                RemoteDom.remoteCode.editStack.performEdit(edit);
                return edit.result;
            },
            editStyleRuleRemove: function domExplorer$messageHandlers$EditStyleRuleRemove(ruleUid) {
                var mappedRule = styleUtilities.lookupMappedRule(ruleUid);
                if(mappedRule) {
                    var edit = new F12.RemoteDom.EditStyleRuleRemove(styleUtilities, mappedRule);
                    if(RemoteDom.remoteCode.editStack.performEdit(edit)) {
                        return edit.result;
                    }
                }
            },
            revertRule: function domExplorer$messageHandlers$EditStyleRuleRevert(ruleUid) {
                var mappedRule = styleUtilities.lookupMappedRule(ruleUid);
                if(mappedRule) {
                    var edit = new F12.RemoteDom.RevertRule(styleUtilities, mappedRule);
                    if(RemoteDom.remoteCode.editStack.performEdit(edit)) {
                        return edit.result;
                    }
                }
            },
            editStylePropertyAdd: function domExplorer$messageHandlers$editStylePropertyAdd(ruleUid, propertyName, propertyValue, isImportant, beforeUid) {
                var mappedRule = styleUtilities.lookupMappedRule(ruleUid);
                if(mappedRule) {
                    var edit = new F12.RemoteDom.EditStylePropertyAdd(styleUtilities, mappedRule, propertyName, propertyValue, isImportant, beforeUid);
                    if(RemoteDom.remoteCode.editStack.performEdit(edit)) {
                        return edit.result;
                    }
                }
            },
            EditStyleRuleSelector: function domExplorer$messageHandler$editRuleSelector(ruleUid, selector) {
                var mappedRule = styleUtilities.lookupMappedRule(ruleUid);
                if(mappedRule) {
                    var edit = new F12.RemoteDom.EditStyleRuleSelector(styleUtilities, mappedRule, selector);
                    if(RemoteDom.remoteCode.editStack.performEdit(edit)) {
                        return edit.result;
                    }
                }
            },
            storeElementForConsole: function domExplorer$messageHandlers$storeElementForConsole(uid) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                if(mappedNode.ele.ownerDocument === mainBrowser.document) {
                    var elements = Common.RemoteHelpers.getDefaultView(mainBrowser.document)["__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS"];
                    if(!elements) {
                        elements = Common.RemoteHelpers.getDefaultView(mainBrowser.document)["__BROWSERTOOLS_DOMEXPLORER_STORED_ELEMENTS"] = new (mainBrowser.document.parentWindow).Array();
                    }
                    elements.splice(0, 0, mappedNode.ele);
                    if(elements.length > 5) {
                        elements.pop();
                    }
                }
            },
            selectElementFromConsole: function domExplorer$messageHandlers$selectElementFromConsole(element) {
                if(element && element.ownerDocument) {
                    var view = Common.RemoteHelpers.getDefaultView(element.ownerDocument);
                    if(view && Common.RemoteHelpers.isElement(view, element)) {
                        RemoteDom.domUtilities.selectElementLastSelected = element;
                        RemoteDom.remoteCode.expandToSelectedItemCallback();
                        return;
                    }
                }
                var win = Common.RemoteHelpers.getDefaultView(mainBrowser.document);
                win.console.error("ConsoleSelectError");
            },
            reparent: function domExplorer$messageHandlers$reparent(moveThisUid, byThisUid, reparentAction) {
                var mappedMoveThisNode = htmlTreeHelpers.mapping[moveThisUid];
                if(!mappedMoveThisNode || !htmlTreeHelpers.isElementAccessible(mappedMoveThisNode.ele)) {
                    return;
                }
                var mappedByThisNode = htmlTreeHelpers.mapping[byThisUid];
                if(!mappedByThisNode || !htmlTreeHelpers.isElementAccessible(mappedByThisNode.ele)) {
                    return;
                }
                var moveThisElement = mappedMoveThisNode.ele;
                var byThisElement = mappedByThisNode.ele;
                var edit = new F12.RemoteDom.ReparentEdit(moveThisElement, byThisElement, reparentAction);
                return RemoteDom.remoteCode.editStack.performEdit(edit);
            },
            copyElementWithStyle: function domExplorer$copyElementWithStyle(uid) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                var elementThatMightBeTheBody = mappedNode.ele;
                while(elementThatMightBeTheBody) {
                    if(elementThatMightBeTheBody.tagName === "BODY") {
                        return styleUtilities.copyElementWithStyle(mappedNode.ele);
                    }
                    elementThatMightBeTheBody = elementThatMightBeTheBody.parentElement;
                }
                return;
            },
            setPseudoStyling: function domExplorer$messageHandlers$setPseudoStyling(uid, state, isSet) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return;
                }
                styleUtilities.setPseudoStyling(mappedNode.ele, state, isSet);
            },
            getPseudoStyling: function domExplorer$messageHandlers$getPseudoStyling(uid, state) {
                var mappedNode = htmlTreeHelpers.mapping[uid];
                if(!mappedNode || !htmlTreeHelpers.isElementAccessible(mappedNode.ele)) {
                    return false;
                }
                return styleUtilities.getPseudoStyling(mappedNode.ele, state);
            }
        };
        var styleUtilities = new RemoteDom.StyleUtilities(RemoteDom.dom$messageHandlers, F12.RemoteDom.domUtilities);
    })(F12.RemoteDom || (F12.RemoteDom = {}));
    var RemoteDom = F12.RemoteDom;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/remote.js.map

// remoteMain.ts
var remoteHelpers;
(function () {
    remoteHelpers = new Common.RemoteHelpers(F12.RemoteDom.dom$messageHandlers);
    F12.RemoteDom.remoteCode.initialize();
})();
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Remote/remoteMain.js.map


// SIG // Begin signature block
// SIG // MIIasQYJKoZIhvcNAQcCoIIaojCCGp4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFApkI4HS/brW
// SIG // 9ESz/es63BxYEhHXoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBTzZVl1YeU6
// SIG // N2q1AyGuQmL/7GMdbzBUBgorBgEEAYI3AgEMMUYwRKAq
// SIG // gCgARABvAG0ARQB4AHAAbABvAHIAZQByAFIAZQBtAG8A
// SIG // dABlAC4AagBzoRaAFGh0dHA6Ly9taWNyb3NvZnQuY29t
// SIG // MA0GCSqGSIb3DQEBAQUABIIBAAK0+SiDHSz//TwgzjsB
// SIG // L6u55szJK42z6dq8NTTtcyqzLn+4io2I7A8zlkZzdnLP
// SIG // GzpmA8KTnmbUY1Bb2NgiBMpqecI4TcgqQGKZV67JZjLk
// SIG // sG3GShkLwm7o2YmcHNZ717s+JKBb70vzV4vnfKCGe7iY
// SIG // 9VHDgabI0ceD9mZyUHPmS3f1mQeizn07QLzwmied45P8
// SIG // axx7sw5+vSQ/3ySJs+GieNaR+93B1xwwNxSSLZXuiBse
// SIG // xop1odGDzdbEbsiJQSMQtAXrJZnOAXTITOGWIIXsl2u3
// SIG // TlJ3ldG/Cm0o3j4ex6dy/4FY7Liur/YrydVMg7V6PVre
// SIG // A3p10T250EOqTZKhggIoMIICJAYJKoZIhvcNAQkGMYIC
// SIG // FTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEh
// SIG // MB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // AhMzAAAATKHoTcy0dHs7AAAAAABMMAkGBSsOAwIaBQCg
// SIG // XTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqG
// SIG // SIb3DQEJBTEPFw0xNDA1MDEwNzUzMDlaMCMGCSqGSIb3
// SIG // DQEJBDEWBBTLu6I39vlGKJa8mHQiMQPHaZWYpTANBgkq
// SIG // hkiG9w0BAQUFAASCAQA77zvPKtgJ6X9qmZKMDiH3FjC3
// SIG // iDaf3b4BzUnziB6MAS09s6Wk7ykgtjJtp9cdbbQwnnRi
// SIG // CDP+8ECh1C4ircF2wJWguHjaTTXCwx8hmZhgOQDSCoNL
// SIG // LOgIc0v56yXV8Xv6ellG9Q6ZYb9dtMZ/+TtIF+YxXg1z
// SIG // m1mx+F3Uq768FAun/lHh8z9bN0mEcgdQjJgjv3OlW42I
// SIG // vdUIkk4gLcOzXmOdYuX1JseLPX0zsdzfIhGJNYfS00/2
// SIG // 0MKhJspSe5qqocl2tr6U5e75irUr3yGtPfvGnMHHx2c8
// SIG // tCJ0x413SNhRBVqibKpSbPcE81bwRuZOR583ZKu+bPGy
// SIG // 7uQCNLIT
// SIG // End signature block
