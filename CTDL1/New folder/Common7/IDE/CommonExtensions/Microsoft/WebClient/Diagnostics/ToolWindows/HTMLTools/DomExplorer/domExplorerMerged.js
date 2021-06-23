//
// Copyright (C) Microsoft. All rights reserved.
//
// <!-- saved from url=(0016)http://localhost -->
// bridge.ts
var F12;
(function (F12) {
    "use strict";
    (function (DomExplorer) {
        var VSBridge = (function () {
            function VSBridge(vs, traceWriter) {
                this._vs = vs;
                this._proxy = (Plugin).Utilities.JSONMarshaler.attachToPublishedObject("F12.Common.Bridge.IDomBridge", {
                }, true);
                this._engine = {
                    engineId: 0,
                    portName: ""
                };
                this._proxy.addEventListener("connect", this.onConnect.bind(this));
                this._channel = new Common.VSChannel(this._proxy, traceWriter);
            }
            Object.defineProperty(VSBridge.prototype, "channel", {
                get: function () {
                    return this._channel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VSBridge.prototype, "engine", {
                get: function () {
                    return this._engine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VSBridge.prototype, "inspectElementId", {
                get: function () {
                    return "";
                },
                enumerable: true,
                configurable: true
            });
            VSBridge.prototype.setForeground = function (hwnd) {
                var _this = this;
                return this._proxy._call("getHostProcessId").then(function (pid) {
                    (Plugin).Host.allowSetForeground(pid);
                    return _this._proxy._call("setForeground", hwnd);
                });
            };
            VSBridge.prototype.takeForeground = function () {
                this._proxy._post("takeForeground");
            };
            VSBridge.prototype.allowRemoteToTakeForeground = function () {
                return this._proxy._call("getRemoteProcessId").then(function (pid) {
                    (Plugin).Host.allowSetForeground(pid);
                });
            };
            VSBridge.prototype.fireAttachedEvent = function () {
            };
            VSBridge.prototype.fireDetachedEvent = function () {
            };
            VSBridge.prototype.addEventListener = function (eventName, callback) {
                switch(eventName) {
                    case "attach":
                    case "detach":
                    case "connect":
                    case "switchTab":
                    case "activated":
                    case "deactivated":
                    case "break":
                    case "run":
                        break;
                    default:
                        throw new Error("Invalid eventName: " + eventName);
                }
                this._proxy.addEventListener(eventName, callback);
            };
            VSBridge.prototype.removeEventListener = function (eventName, callback) {
                this._proxy.removeEventListener(eventName, callback);
            };
            VSBridge.prototype.onConnect = function (e) {
                this._engine.engineId = e.engineId;
                this._engine.portName = e.portName;
            };
            return VSBridge;
        })();
        DomExplorer.VSBridge = VSBridge;        
        var IEBridge = (function () {
            function IEBridge(f12, external, traceWriter) {
                this._f12 = f12;
                this._external = external;
                this._engine = {
                    engineId: 0,
                    portName: ""
                };
                this._channel = new Common.IEChannel(external, traceWriter);
            }
            Object.defineProperty(IEBridge.prototype, "channel", {
                get: function () {
                    return this._channel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(IEBridge.prototype, "engine", {
                get: function () {
                    return this._engine;
                },
                enumerable: true,
                configurable: true
            });
            IEBridge.prototype.setForeground = function (hwnd) {
                var success = this._f12.setForeground(hwnd);
                return (Plugin).Promise.wrap(success);
            };
            IEBridge.prototype.takeForeground = function () {
                this._f12.takeForeground();
            };
            IEBridge.prototype.allowRemoteToTakeForeground = function () {
                var pid = this._f12.getRemoteProcessId();
                var allow = this._f12.allowSetForeground(pid);
                return (Plugin).Promise.wrap(allow);
            };
            IEBridge.prototype.fireAttachedEvent = function () {
                this._external.fireAttachedEvent();
            };
            IEBridge.prototype.fireDetachedEvent = function () {
                this._external.fireDetachedEvent();
            };
            IEBridge.prototype.addEventListener = function (eventName, callback) {
                switch(eventName) {
                    case "attach":
                    case "detach":
                    case "connect":
                    case "switchTab":
                    case "activated":
                    case "deactivated":
                    case "break":
                    case "run":
                        break;
                    default:
                        throw new Error("Invalid eventName: " + eventName);
                }
                this._external.addEventListener(eventName, callback);
            };
            IEBridge.prototype.removeEventListener = function (eventName, callback) {
                this._external.removeEventListener(eventName, callback);
            };
            return IEBridge;
        })();
        DomExplorer.IEBridge = IEBridge;        
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/bridge.js.map

// cssPropertyMetadata.ts
var F12;
(function (F12) {
    (function (DomExplorer) {
        DomExplorer.cssPropertyMetadata = {
            "animation": {
                "name": "animation",
                "enumValueListName": "",
                "shorthand": true
            },
            "animation-direction": {
                "name": "animation-direction",
                "enumValueListName": "AnimationDirection"
            },
            "animation-iteration-count": {
                "name": "animation-iteration-count",
                "enumValueListName": "Infinite"
            },
            "animation-play-state": {
                "name": "animation-play-state",
                "enumValueListName": "PlayState"
            },
            "animation-timing-function": {
                "name": "animation-timing-function",
                "enumValueListName": "TimingFunctionKeyword"
            },
            "animation-fill-mode": {
                "name": "animation-fill-mode",
                "enumValueListName": "AnimationFillMode"
            },
            "background-repeat": {
                "name": "background-repeat",
                "enumValueListName": "BackgroundRepeatStyle"
            },
            "background-position-x": {
                "name": "background-position-x",
                "enumValueListName": "HorizontalAlignment"
            },
            "background-position-y": {
                "name": "background-position-y",
                "enumValueListName": "VerticalAlignment"
            },
            "background-attachment": {
                "name": "background-attachment",
                "enumValueListName": "BackgroundAttachment"
            },
            "background-clip": {
                "name": "background-clip",
                "enumValueListName": "Box"
            },
            "background-size": {
                "name": "background-size",
                "enumValueListName": "BackgroundSizeScaling"
            },
            "border-radius": {
                "name": "border-radius",
                "enumValueListName": "",
                "shorthand": true
            },
            "border-top-width": {
                "name": "border-top-width",
                "enumValueListName": "BorderWidthType"
            },
            "border-top-style": {
                "name": "border-top-style",
                "enumValueListName": "BorderStyle"
            },
            "border-right-width": {
                "name": "border-right-width",
                "enumValueListName": "BorderWidthType"
            },
            "border-right-style": {
                "name": "border-right-style",
                "enumValueListName": "BorderStyle"
            },
            "border-bottom-width": {
                "name": "border-bottom-width",
                "enumValueListName": "BorderWidthType"
            },
            "border-bottom-style": {
                "name": "border-bottom-style",
                "enumValueListName": "BorderStyle"
            },
            "border-left-width": {
                "name": "border-left-width",
                "enumValueListName": "BorderWidthType"
            },
            "border-left-style": {
                "name": "border-left-style",
                "enumValueListName": "BorderStyle"
            },
            "border-collapse": {
                "name": "border-collapse",
                "enumValueListName": "BorderCollapse"
            },
            "flex": {
                "name": "flex",
                "enumValueListName": "",
                "shorthand": true
            },
            "-ms-flex": {
                "name": "-ms-flex",
                "enumValueListName": "",
                "shorthand": true
            },
            "flex-direction": {
                "name": "flex-direction",
                "enumValueListName": "FlexDirection"
            },
            "flex-wrap": {
                "name": "flex-wrap",
                "enumValueListName": "FlexWrap"
            },
            "justify-content": {
                "name": "justify-content",
                "enumValueListName": "JustifyContent"
            },
            "align-items": {
                "name": "align-items",
                "enumValueListName": "AlignItems"
            },
            "align-self": {
                "name": "align-self",
                "enumValueListName": "AlignSelf"
            },
            "align-content": {
                "name": "align-content",
                "enumValueListName": "AlignContent"
            },
            "-ms-flex-preferred-size": {
                "name": "-ms-flex-preferred-size",
                "enumValueListName": "Auto"
            },
            "font": {
                "name": "font",
                "enumValueListName": "",
                "shorthand": true
            },
            "font-size": {
                "name": "font-size",
                "enumValueListName": "FontSizes"
            },
            "font-style": {
                "name": "font-style",
                "enumValueListName": "FontStyle"
            },
            "font-variant": {
                "name": "font-variant",
                "enumValueListName": "FontVariant"
            },
            "font-weight": {
                "name": "font-weight",
                "enumValueListName": "FontWeight"
            },
            "line-height": {
                "name": "line-height",
                "enumValueListName": "Normal"
            },
            "font-stretch": {
                "name": "font-stretch",
                "enumValueListName": "FontStretch"
            },
            "font-size-adjust": {
                "name": "font-size-adjust",
                "enumValueListName": "None"
            },
            "text-transform": {
                "name": "text-transform",
                "enumValueListName": "TextTransform"
            },
            "text-underline-position": {
                "name": "text-underline-position",
                "enumValueListName": "TextUnderlinePosition"
            },
            "-ms-grid-column-align": {
                "name": "-ms-grid-column-align",
                "enumValueListName": "GridAlign"
            },
            "-ms-grid-row-align": {
                "name": "-ms-grid-row-align",
                "enumValueListName": "GridAlign"
            },
            "display": {
                "name": "display",
                "enumValueListName": "Display"
            },
            "position": {
                "name": "position",
                "enumValueListName": "Position"
            },
            "top": {
                "name": "top",
                "enumValueListName": "Auto"
            },
            "right": {
                "name": "right",
                "enumValueListName": "Auto"
            },
            "bottom": {
                "name": "bottom",
                "enumValueListName": "Auto"
            },
            "left": {
                "name": "left",
                "enumValueListName": "Auto"
            },
            "float": {
                "name": "float",
                "enumValueListName": "FloatPosition"
            },
            "clear": {
                "name": "clear",
                "enumValueListName": "Clear"
            },
            "margin": {
                "name": "margin",
                "enumValueListName": "",
                "shorthand": true
            },
            "margin-top": {
                "name": "margin-top",
                "enumValueListName": "Auto"
            },
            "margin-right": {
                "name": "margin-right",
                "enumValueListName": "Auto"
            },
            "margin-bottom": {
                "name": "margin-bottom",
                "enumValueListName": "Auto"
            },
            "margin-left": {
                "name": "margin-left",
                "enumValueListName": "Auto"
            },
            "padding": {
                "name": "padding",
                "enumValueListName": "",
                "shorthand": true
            },
            "padding-top": {
                "name": "padding-top",
                "enumValueListName": "Empty"
            },
            "padding-right": {
                "name": "padding-right",
                "enumValueListName": "Empty"
            },
            "padding-bottom": {
                "name": "padding-bottom",
                "enumValueListName": "Empty"
            },
            "padding-left": {
                "name": "padding-left",
                "enumValueListName": "Empty"
            },
            "visibility": {
                "name": "visibility",
                "enumValueListName": "Visibility"
            },
            "z-index": {
                "name": "z-index",
                "enumValueListName": "Auto"
            },
            "layout-flow": {
                "name": "layout-flow",
                "enumValueListName": "LayoutFlow"
            },
            "layout-grid-char": {
                "name": "layout-grid-char",
                "enumValueListName": "AutoNone"
            },
            "layout-grid-line": {
                "name": "layout-grid-line",
                "enumValueListName": "AutoNone"
            },
            "layout-grid-mode": {
                "name": "layout-grid-mode",
                "enumValueListName": "LayoutGridMode"
            },
            "layout-grid-type": {
                "name": "layout-grid-type",
                "enumValueListName": "LayoutGridType"
            },
            "-ms-wrap-flow": {
                "name": "-ms-wrap-flow",
                "enumValueListName": "WrapFlow"
            },
            "-ms-wrap-margin": {
                "name": "-ms-wrap-margin",
                "enumValueListName": "Empty"
            },
            "-ms-wrap-through": {
                "name": "-ms-wrap-through",
                "enumValueListName": "WrapThrough"
            },
            "list-style": {
                "name": "list-style",
                "enumValueListName": "",
                "shorthand": true
            },
            "list-style-type": {
                "name": "list-style-type",
                "enumValueListName": "ListStyleType"
            },
            "list-style-position": {
                "name": "list-style-position",
                "enumValueListName": "ListStylePosition"
            },
            "zoom": {
                "name": "zoom",
                "enumValueListName": "Normal"
            },
            "-ms-ime-align": {
                "name": "-ms-ime-align",
                "enumValueListName": "MsImeAlign"
            },
            "ime-mode": {
                "name": "ime-mode",
                "enumValueListName": "ImeMode"
            },
            "page-break-before": {
                "name": "page-break-before",
                "enumValueListName": "PageBreak"
            },
            "page-break-after": {
                "name": "page-break-after",
                "enumValueListName": "PageBreak"
            },
            "page-break-inside": {
                "name": "page-break-inside",
                "enumValueListName": "PageBreakInside"
            },
            "table-layout": {
                "name": "table-layout",
                "enumValueListName": "TableLayout"
            },
            "caption-side": {
                "name": "caption-side",
                "enumValueListName": "CaptionSide"
            },
            "empty-cells": {
                "name": "empty-cells",
                "enumValueListName": "EmptyCells"
            },
            "column-count": {
                "name": "column-count",
                "enumValueListName": "Auto"
            },
            "column-width": {
                "name": "column-width",
                "enumValueListName": "Auto"
            },
            "column-gap": {
                "name": "column-gap",
                "enumValueListName": "Normal"
            },
            "column-rule-width": {
                "name": "column-rule-width",
                "enumValueListName": "BorderWidthType"
            },
            "column-rule-style": {
                "name": "column-rule-style",
                "enumValueListName": "BorderStyle"
            },
            "break-before": {
                "name": "break-before",
                "enumValueListName": "Break"
            },
            "break-after": {
                "name": "break-after",
                "enumValueListName": "Break"
            },
            "break-inside": {
                "name": "break-inside",
                "enumValueListName": "BreakInside"
            },
            "column-span": {
                "name": "column-span",
                "enumValueListName": "ColumnSpan"
            },
            "column-fill": {
                "name": "column-fill",
                "enumValueListName": "ColumnFill"
            },
            "width": {
                "name": "width",
                "enumValueListName": "Auto"
            },
            "height": {
                "name": "height",
                "enumValueListName": "Auto"
            },
            "min-width": {
                "name": "min-width",
                "enumValueListName": "Auto"
            },
            "max-width": {
                "name": "max-width",
                "enumValueListName": "None"
            },
            "min-height": {
                "name": "min-height",
                "enumValueListName": "Auto"
            },
            "max-height": {
                "name": "max-height",
                "enumValueListName": "None"
            },
            "box-sizing": {
                "name": "box-sizing",
                "enumValueListName": "BoxSizing"
            },
            "overflow": {
                "name": "overflow",
                "enumValueListName": "Overflow"
            },
            "overflow-x": {
                "name": "overflow-x",
                "enumValueListName": "Overflow"
            },
            "overflow-y": {
                "name": "overflow-y",
                "enumValueListName": "Overflow"
            },
            "-ms-overflow-style": {
                "name": "-ms-overflow-style",
                "enumValueListName": "OverflowStyle"
            },
            "clip-rule": {
                "name": "clip-rule",
                "enumValueListName": "ClipRule"
            },
            "color-interpolation-filters": {
                "name": "color-interpolation-filters",
                "enumValueListName": "ColorInterpolationFilters"
            },
            "fill-rule": {
                "name": "fill-rule",
                "enumValueListName": "ClipRule"
            },
            "stroke-dashoffset": {
                "name": "stroke-dashoffset",
                "enumValueListName": "Empty"
            },
            "stroke-linecap": {
                "name": "stroke-linecap",
                "enumValueListName": "StrokeLineCap"
            },
            "stroke-linejoin": {
                "name": "stroke-linejoin",
                "enumValueListName": "StrokeLineJoin"
            },
            "stroke-width": {
                "name": "stroke-width",
                "enumValueListName": "Empty"
            },
            "enable-background": {
                "name": "enable-background",
                "enumValueListName": "EnableBackground"
            },
            "glyph-orientation-horizontal": {
                "name": "glyph-orientation-horizontal",
                "enumValueListName": "Empty"
            },
            "glyph-orientation-vertical": {
                "name": "glyph-orientation-vertical",
                "enumValueListName": "Auto"
            },
            "kerning": {
                "name": "kerning",
                "enumValueListName": "Auto"
            },
            "pointer-events": {
                "name": "pointer-events",
                "enumValueListName": "PointerEvents"
            },
            "white-space": {
                "name": "white-space",
                "enumValueListName": "WhiteSpace"
            },
            "text-indent": {
                "name": "text-indent",
                "enumValueListName": "Empty"
            },
            "vertical-align": {
                "name": "vertical-align",
                "enumValueListName": "VerticalAlign"
            },
            "text-align": {
                "name": "text-align",
                "enumValueListName": "TextAlign"
            },
            "text-align-last": {
                "name": "text-align-last",
                "enumValueListName": "TextAlignLast"
            },
            "text-justify": {
                "name": "text-justify",
                "enumValueListName": "TextJustify"
            },
            "direction": {
                "name": "direction",
                "enumValueListName": "Direction"
            },
            "alignment-baseline": {
                "name": "alignment-baseline",
                "enumValueListName": "AlignmentBaseline"
            },
            "baseline-shift": {
                "name": "baseline-shift",
                "enumValueListName": "BaselineShiftType"
            },
            "-ms-block-progression": {
                "name": "-ms-block-progression",
                "enumValueListName": "BlockProgression"
            },
            "dominant-baseline": {
                "name": "dominant-baseline",
                "enumValueListName": "DominantBaseline"
            },
            "-ms-hyphenate-limit-lines": {
                "name": "-ms-hyphenate-limit-lines",
                "enumValueListName": "NoLimit"
            },
            "-ms-hyphenate-limit-zone": {
                "name": "-ms-hyphenate-limit-zone",
                "enumValueListName": "Empty"
            },
            "-ms-hyphens": {
                "name": "-ms-hyphens",
                "enumValueListName": "Hyphens"
            },
            "line-break": {
                "name": "line-break",
                "enumValueListName": "LineBreak"
            },
            "ruby-align": {
                "name": "ruby-align",
                "enumValueListName": "RubyAlign"
            },
            "ruby-overhang": {
                "name": "ruby-overhang",
                "enumValueListName": "RubyOverhang"
            },
            "ruby-position": {
                "name": "ruby-position",
                "enumValueListName": "RubyPosition"
            },
            "text-anchor": {
                "name": "text-anchor",
                "enumValueListName": "TextAnchor"
            },
            "text-justify-trim": {
                "name": "text-justify-trim",
                "enumValueListName": "TextJustifyTrim"
            },
            "text-kashida": {
                "name": "text-kashida",
                "enumValueListName": "Empty"
            },
            "text-kashida-space": {
                "name": "text-kashida-space",
                "enumValueListName": "Empty"
            },
            "text-overflow": {
                "name": "text-overflow",
                "enumValueListName": "TextOverflow"
            },
            "unicode-bidi": {
                "name": "unicode-bidi",
                "enumValueListName": "UnicodeBidi"
            },
            "word-break": {
                "name": "word-break",
                "enumValueListName": "WordBreak"
            },
            "letter-spacing": {
                "name": "letter-spacing",
                "enumValueListName": "Normal"
            },
            "word-spacing": {
                "name": "word-spacing",
                "enumValueListName": "Normal"
            },
            "word-wrap": {
                "name": "word-wrap",
                "enumValueListName": "WordWrap"
            },
            "writing-mode": {
                "name": "writing-mode",
                "enumValueListName": "WritingMode"
            },
            "-ms-text-combine-horizontal": {
                "name": "-ms-text-combine-horizontal",
                "enumValueListName": "MsTextCombineHorizontal"
            },
            "-ms-text-size-adjust": {
                "name": "-ms-text-size-adjust",
                "enumValueListName": "AutoNone"
            },
            "-ms-scroll-rails": {
                "name": "-ms-scroll-rails",
                "enumValueListName": "ScrollRailed"
            },
            "-ms-scroll-snap-type": {
                "name": "-ms-scroll-snap-type",
                "enumValueListName": "SnapType"
            },
            "-ms-scroll-chaining": {
                "name": "-ms-scroll-chaining",
                "enumValueListName": "ScrollChained"
            },
            "-ms-scroll-limit": {
                "name": "-ms-scroll-limit",
                "enumValueListName": "",
                "shorthand": true
            },
            "-ms-scroll-limit-x-min": {
                "name": "-ms-scroll-limit-x-min",
                "enumValueListName": "Empty"
            },
            "-ms-scroll-limit-y-min": {
                "name": "-ms-scroll-limit-y-min",
                "enumValueListName": "Auto"
            },
            "-ms-scroll-limit-x-max": {
                "name": "-ms-scroll-limit-x-max",
                "enumValueListName": "Auto"
            },
            "-ms-scroll-limit-y-max": {
                "name": "-ms-scroll-limit-y-max",
                "enumValueListName": "Empty"
            },
            "-ms-scroll-translation": {
                "name": "-ms-scroll-translation",
                "enumValueListName": "ScrollTranslation"
            },
            "-ms-content-zooming": {
                "name": "-ms-content-zooming",
                "enumValueListName": "ContentZooming"
            },
            "-ms-content-zoom-limit-min": {
                "name": "-ms-content-zoom-limit-min",
                "enumValueListName": "Empty"
            },
            "-ms-content-zoom-limit-max": {
                "name": "-ms-content-zoom-limit-max",
                "enumValueListName": "Empty"
            },
            "-ms-content-zoom-snap-type": {
                "name": "-ms-content-zoom-snap-type",
                "enumValueListName": "SnapType"
            },
            "-ms-content-zoom-chaining": {
                "name": "-ms-content-zoom-chaining",
                "enumValueListName": "ScrollChained"
            },
            "-ms-touch-action": {
                "name": "-ms-touch-action",
                "enumValueListName": "TouchAction"
            },
            "touch-action": {
                "name": "touch-action",
                "enumValueListName": "TouchAction"
            },
            "-ms-touch-select": {
                "name": "-ms-touch-select",
                "enumValueListName": "Grippers"
            },
            "transform-style": {
                "name": "transform-style",
                "enumValueListName": "TransformStyle"
            },
            "backface-visibility": {
                "name": "backface-visibility",
                "enumValueListName": "BackfaceVisibility"
            },
            "-ms-interpolation-mode": {
                "name": "-ms-interpolation-mode",
                "enumValueListName": "InterpolationMode"
            },
            "cursor": {
                "name": "cursor",
                "enumValueListName": "Cursor"
            },
            "outline": {
                "name": "outline",
                "enumValueListName": "",
                "shorthand": true
            },
            "outline-width": {
                "name": "outline-width",
                "enumValueListName": "BorderWidthType"
            },
            "outline-style": {
                "name": "outline-style",
                "enumValueListName": "OutlineStyle"
            },
            "-ms-user-select": {
                "name": "-ms-user-select",
                "enumValueListName": "UserSelect"
            },
            "-ms-high-contrast-adjust": {
                "name": "-ms-high-contrast-adjust",
                "enumValueListName": "AutoNone"
            },
            "background": {
                "name": "background",
                "enumValueListName": "",
                "shorthand": true
            },
            "background-color": {
                "name": "background-color",
                "enumValueListName": "ColorName"
            },
            "border": {
                "name": "border",
                "enumValueListName": "",
                "shorthand": true
            },
            "border-image-repeat": {
                "name": "border-image-repeat",
                "enumValueListName": "BorderImageRepeat"
            },
            "border-width": {
                "name": "border-width",
                "enumValueListName": "",
                "shorthand": true
            },
            "border-style": {
                "name": "border-style",
                "enumValueListName": "",
                "shorthand": true
            },
            "border-color": {
                "name": "border-color",
                "enumValueListName": "",
                "shorthand": true
            },
            "border-bottom-color": {
                "name": "border-bottom-color",
                "enumValueListName": "ColorName"
            },
            "border-left-color": {
                "name": "border-left-color",
                "enumValueListName": "ColorName"
            },
            "border-right-color": {
                "name": "border-right-color",
                "enumValueListName": "ColorName"
            },
            "border-top-color": {
                "name": "border-top-color",
                "enumValueListName": "ColorName"
            },
            "color": {
                "name": "color",
                "enumValueListName": "ColorName"
            },
            "column-rule": {
                "name": "column-rule",
                "enumValueListName": "",
                "shorthand": true
            },
            "column-rule-color": {
                "name": "column-rule-color",
                "enumValueListName": "ColorName"
            },
            "flood-color": {
                "name": "flood-color",
                "enumValueListName": "ColorName"
            },
            "lighting-color": {
                "name": "lighting-color",
                "enumValueListName": "ColorName"
            },
            "outline-color": {
                "name": "outline-color",
                "enumValueListName": "ColorName"
            },
            "scrollbar-3dlight-color": {
                "name": "scrollbar-3dlight-color",
                "enumValueListName": "ColorName"
            },
            "scrollbar-arrow-color": {
                "name": "scrollbar-arrow-color",
                "enumValueListName": "ColorName"
            },
            "scrollbar-base-color": {
                "name": "scrollbar-base-color",
                "enumValueListName": "ColorName"
            },
            "scrollbar-darkshadow-color": {
                "name": "scrollbar-darkshadow-color",
                "enumValueListName": "ColorName"
            },
            "scrollbar-face-color": {
                "name": "scrollbar-face-color",
                "enumValueListName": "ColorName"
            },
            "scrollbar-highlight-color": {
                "name": "scrollbar-highlight-color",
                "enumValueListName": "ColorName"
            },
            "scrollbar-shadow-color": {
                "name": "scrollbar-shadow-color",
                "enumValueListName": "ColorName"
            },
            "scrollbar-track-color": {
                "name": "scrollbar-track-color",
                "enumValueListName": "ColorName"
            },
            "transition": {
                "name": "transition",
                "enumValueListName": "",
                "shorthand": true
            },
            "stop-color": {
                "name": "stop-color",
                "enumValueListName": "ColorName"
            }
        };
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/cssPropertyMetadata.js.map

// enumMetadata.ts
var F12;
(function (F12) {
    (function (DomExplorer) {
        DomExplorer.enumMetadata = {
            "AlignmentBaseline": {
                "name": "AlignmentBaseline",
                "values": [
                    "baseline", 
                    "before-edge", 
                    "text-before-edge", 
                    "after-edge", 
                    "text-after-edge", 
                    "central", 
                    "middle", 
                    "ideographic", 
                    "alphabetic", 
                    "hanging", 
                    "mathematical", 
                    "auto"
                ]
            },
            "AllNone": {
                "name": "AllNone",
                "values": [
                    "all", 
                    "none"
                ]
            },
            "AnimationDirection": {
                "name": "AnimationDirection",
                "values": [
                    "normal", 
                    "alternate", 
                    "reverse", 
                    "alternate-reverse"
                ]
            },
            "AnimationFillMode": {
                "name": "AnimationFillMode",
                "values": [
                    "none", 
                    "forwards", 
                    "backwards", 
                    "both"
                ]
            },
            "Any": {
                "name": "Any",
                "values": [
                    "any"
                ]
            },
            "Auto": {
                "name": "Auto",
                "values": [
                    "auto"
                ]
            },
            "AutoNone": {
                "name": "AutoNone",
                "values": [
                    "auto", 
                    "none"
                ]
            },
            "BackfaceVisibility": {
                "name": "BackfaceVisibility",
                "values": [
                    "visible", 
                    "hidden"
                ]
            },
            "BackgroundAttachment": {
                "name": "BackgroundAttachment",
                "values": [
                    "scroll", 
                    "fixed", 
                    "local"
                ]
            },
            "BackgroundRepeatStyle": {
                "name": "BackgroundRepeatStyle",
                "values": [
                    "repeat-x", 
                    "repeat-y", 
                    "repeat", 
                    "space", 
                    "round", 
                    "no-repeat"
                ]
            },
            "BackgroundSizeScaling": {
                "name": "BackgroundSizeScaling",
                "values": [
                    "contain", 
                    "cover"
                ]
            },
            "BaselineShiftType": {
                "name": "BaselineShiftType",
                "values": [
                    "baseline", 
                    "sub", 
                    "super"
                ]
            },
            "BlockProgression": {
                "name": "BlockProgression",
                "values": [
                    "tb", 
                    "rl", 
                    "bt", 
                    "lr"
                ]
            },
            "BorderCollapse": {
                "name": "BorderCollapse",
                "values": [
                    "collapse", 
                    "separate"
                ]
            },
            "BorderImageRepeat": {
                "name": "BorderImageRepeat",
                "values": [
                    "stretch", 
                    "repeat", 
                    "round", 
                    "space"
                ]
            },
            "BorderStyle": {
                "name": "BorderStyle",
                "values": [
                    "none", 
                    "solid", 
                    "dashed", 
                    "dotted", 
                    "double", 
                    "groove", 
                    "hidden", 
                    "inset", 
                    "outset", 
                    "ridge", 
                    "window-inset"
                ]
            },
            "BorderWidthType": {
                "name": "BorderWidthType",
                "values": [
                    "thin", 
                    "medium", 
                    "thick"
                ]
            },
            "Box": {
                "name": "Box",
                "values": [
                    "border-box", 
                    "padding-box", 
                    "content-box"
                ]
            },
            "AlignItems": {
                "name": "AlignItems",
                "values": [
                    "flex-start", 
                    "center", 
                    "flex-end", 
                    "baseline", 
                    "stretch"
                ]
            },
            "FlexDirection": {
                "name": "FlexDirection",
                "values": [
                    "row", 
                    "row-reverse", 
                    "column", 
                    "column-reverse"
                ]
            },
            "AlignSelf": {
                "name": "AlignSelf",
                "values": [
                    "auto", 
                    "flex-start", 
                    "center", 
                    "flex-end", 
                    "baseline", 
                    "stretch"
                ]
            },
            "AlignContent": {
                "name": "AlignContent",
                "values": [
                    "flex-start", 
                    "center", 
                    "flex-end", 
                    "space-between", 
                    "space-around", 
                    "stretch"
                ]
            },
            "FlexWrap": {
                "name": "FlexWrap",
                "values": [
                    "nowrap", 
                    "wrap", 
                    "wrap-reverse"
                ]
            },
            "JustifyContent": {
                "name": "JustifyContent",
                "values": [
                    "flex-start", 
                    "center", 
                    "flex-end", 
                    "space-between", 
                    "space-around"
                ]
            },
            "BoxSizing": {
                "name": "BoxSizing",
                "values": [
                    "content-box", 
                    "border-box"
                ]
            },
            "Break": {
                "name": "Break",
                "values": [
                    "auto", 
                    "always", 
                    "avoid", 
                    "left", 
                    "right", 
                    "page", 
                    "column", 
                    "avoid-page", 
                    "avoid-column"
                ]
            },
            "BreakInside": {
                "name": "BreakInside",
                "values": [
                    "auto", 
                    "avoid", 
                    "avoid-page", 
                    "avoid-column"
                ]
            },
            "Buffering": {
                "name": "Buffering",
                "values": [
                    "none", 
                    "metadata", 
                    "auto"
                ]
            },
            "Button": {
                "name": "Button",
                "values": [
                    "submit", 
                    "reset", 
                    "button"
                ]
            },
            "CaptionSide": {
                "name": "CaptionSide",
                "values": [
                    "top", 
                    "bottom", 
                    "left", 
                    "right"
                ]
            },
            "Clear": {
                "name": "Clear",
                "values": [
                    "none", 
                    "left", 
                    "right", 
                    "both"
                ]
            },
            "ClipRule": {
                "name": "ClipRule",
                "values": [
                    "nonzero", 
                    "evenodd"
                ]
            },
            "ColorInterpolationFilters": {
                "name": "ColorInterpolationFilters",
                "values": [
                    "auto", 
                    "sRGB", 
                    "linearRGB"
                ]
            },
            "ColumnFill": {
                "name": "ColumnFill",
                "values": [
                    "auto", 
                    "balance"
                ]
            },
            "ColumnSpan": {
                "name": "ColumnSpan",
                "values": [
                    "1", 
                    "all"
                ]
            },
            "Command": {
                "name": "Command",
                "values": [
                    "command", 
                    "checkbox", 
                    "radio"
                ]
            },
            "ContentZooming": {
                "name": "ContentZooming",
                "values": [
                    "none", 
                    "zoom"
                ]
            },
            "ContentZoomStyle": {
                "name": "ContentZoomStyle",
                "values": [
                    "immutable", 
                    "mutable"
                ]
            },
            "ContentZoomSnapStyle": {
                "name": "ContentZoomSnapStyle",
                "values": [
                    "flat", 
                    "well"
                ]
            },
            "Cursor": {
                "name": "Cursor",
                "values": [
                    "auto", 
                    "pointer", 
                    "default", 
                    "context-menu", 
                    "help", 
                    "none", 
                    "progress", 
                    "wait", 
                    "cell", 
                    "crosshair", 
                    "text", 
                    "vertical-text", 
                    "alias", 
                    "copy", 
                    "move", 
                    "no-drop", 
                    "not-allowed", 
                    "e-resize", 
                    "n-resize", 
                    "ne-resize", 
                    "nw-resize", 
                    "s-resize", 
                    "se-resize", 
                    "sw-resize", 
                    "w-resize", 
                    "ew-resize", 
                    "ns-resize", 
                    "nesw-resize", 
                    "nwse-resize", 
                    "col-resize", 
                    "row-resize", 
                    "all-scroll"
                ]
            },
            "Direction": {
                "name": "Direction",
                "values": [
                    "ltr", 
                    "rtl"
                ]
            },
            "Display": {
                "name": "Display",
                "values": [
                    "inline", 
                    "block", 
                    "none", 
                    "inline-block", 
                    "table", 
                    "inline-table", 
                    "table-row-group", 
                    "table-header-group", 
                    "table-footer-group", 
                    "table-row", 
                    "table-column-group", 
                    "table-column", 
                    "table-cell", 
                    "table-caption", 
                    "-ms-flexbox", 
                    "-ms-grid", 
                    "-ms-inline-grid", 
                    "-ms-inline-flexbox", 
                    "run-in", 
                    "ruby", 
                    "ruby-base", 
                    "ruby-text", 
                    "list-item", 
                    "ruby-base-container", 
                    "ruby-text-container", 
                    "flex", 
                    "inline-flex", 
                    
                ]
            },
            "DominantBaseline": {
                "name": "DominantBaseline",
                "values": [
                    "auto", 
                    "use-script", 
                    "no-change", 
                    "reset-size", 
                    "alphabetic", 
                    "hanging", 
                    "ideographic", 
                    "mathematical", 
                    "central", 
                    "middle", 
                    "text-after-edge", 
                    "text-before-edge"
                ]
            },
            "Empty": {
                "name": "Empty",
                "values": [
                    "empty"
                ]
            },
            "EmptyCells": {
                "name": "EmptyCells",
                "values": [
                    "show", 
                    "hide"
                ]
            },
            "EnableBackground": {
                "name": "EnableBackground",
                "values": [
                    "accumulate", 
                    "new"
                ]
            },
            "Enctype": {
                "name": "Enctype",
                "values": [
                    "application/x-www-form-urlencoded", 
                    "multipart/form-data", 
                    "text/plain"
                ]
            },
            "Fit": {
                "name": "Fit",
                "values": [
                    "fill", 
                    "hidden", 
                    "meet", 
                    "slice"
                ]
            },
            "FloatPosition": {
                "name": "FloatPosition",
                "values": [
                    "none", 
                    "left", 
                    "right"
                ]
            },
            "FontFamilyGenericType": {
                "name": "FontFamilyGenericType",
                "values": [
                    "serif", 
                    "sans-serif", 
                    "cursive", 
                    "fantasy", 
                    "monospace"
                ]
            },
            "FontSizes": {
                "name": "FontSizes",
                "values": [
                    "xx-small", 
                    "x-small", 
                    "small", 
                    "medium", 
                    "large", 
                    "x-large", 
                    "xx-large", 
                    "larger", 
                    "smaller"
                ]
            },
            "FontStretch": {
                "name": "FontStretch",
                "values": [
                    "normal", 
                    "ultra-condensed", 
                    "extra-condensed", 
                    "condensed", 
                    "semi-condensed", 
                    "semi-expanded", 
                    "expanded", 
                    "extra-expanded", 
                    "ultra-expanded", 
                    "wider", 
                    "narrower"
                ]
            },
            "FontStyle": {
                "name": "FontStyle",
                "values": [
                    "normal", 
                    "italic", 
                    "oblique"
                ]
            },
            "FontType": {
                "name": "FontType",
                "values": [
                    "caption", 
                    "icon", 
                    "menu", 
                    "message-box", 
                    "small-caption", 
                    "status-bar"
                ]
            },
            "FontVariant": {
                "name": "FontVariant",
                "values": [
                    "normal", 
                    "small-caps"
                ]
            },
            "FontWeight": {
                "name": "FontWeight",
                "values": [
                    "normal", 
                    "bold", 
                    "bolder", 
                    "lighter", 
                    "100", 
                    "200", 
                    "300", 
                    "400", 
                    "500", 
                    "600", 
                    "700", 
                    "800", 
                    "900"
                ]
            },
            "FormMethod": {
                "name": "FormMethod",
                "values": [
                    "get", 
                    "post"
                ]
            },
            "GridAlign": {
                "name": "GridAlign",
                "values": [
                    "start", 
                    "center", 
                    "end", 
                    "stretch"
                ]
            },
            "GridLength": {
                "name": "GridLength",
                "values": [
                    "auto", 
                    "none", 
                    "min-content", 
                    "max-content"
                ]
            },
            "Grippers": {
                "name": "Grippers",
                "values": [
                    "none", 
                    "grippers"
                ]
            },
            "HorizontalAlignment": {
                "name": "HorizontalAlignment",
                "values": [
                    "left", 
                    "center", 
                    "right"
                ]
            },
            "HyphenateLimitLast": {
                "name": "HyphenateLimitLast",
                "values": [
                    "none", 
                    "always", 
                    "column", 
                    "page", 
                    "spread"
                ]
            },
            "Hyphens": {
                "name": "Hyphens",
                "values": [
                    "none", 
                    "manual", 
                    "auto"
                ]
            },
            "MsImeAlign": {
                "name": "MsImeAlign",
                "values": [
                    "auto", 
                    "after"
                ]
            },
            "ImeMode": {
                "name": "ImeMode",
                "values": [
                    "auto", 
                    "active", 
                    "inactive", 
                    "disabled"
                ]
            },
            "Infinite": {
                "name": "Infinite",
                "values": [
                    "infinite"
                ]
            },
            "Input": {
                "name": "Input",
                "values": [
                    "hidden", 
                    "text", 
                    "search", 
                    "tel", 
                    "url", 
                    "email", 
                    "password", 
                    "datetime", 
                    "date", 
                    "month", 
                    "week", 
                    "time", 
                    "datetime-local", 
                    "number", 
                    "range", 
                    "color", 
                    "checkbox", 
                    "radio", 
                    "file", 
                    "submit", 
                    "image", 
                    "reset", 
                    "button"
                ]
            },
            "Inset": {
                "name": "Inset",
                "values": [
                    "inset"
                ]
            },
            "InteractionChaining": {
                "name": "InteractionChaining",
                "values": [
                    "none", 
                    "parent"
                ]
            },
            "InterpolationMode": {
                "name": "InterpolationMode",
                "values": [
                    "nearest-neighbor", 
                    "bicubic"
                ]
            },
            "LayoutFlow": {
                "name": "LayoutFlow",
                "values": [
                    "horizontal", 
                    "vertical-ideographic"
                ]
            },
            "LayoutGridMode": {
                "name": "LayoutGridMode",
                "values": [
                    "both", 
                    "none", 
                    "line", 
                    "char"
                ]
            },
            "LayoutGridType": {
                "name": "LayoutGridType",
                "values": [
                    "loose", 
                    "strict", 
                    "fixed"
                ]
            },
            "LinearGradientHorizontalAlignment": {
                "name": "LinearGradientHorizontalAlignment",
                "values": [
                    "left", 
                    "right"
                ]
            },
            "LinearGradientVerticalAlignment": {
                "name": "LinearGradientVerticalAlignment",
                "values": [
                    "top", 
                    "bottom"
                ]
            },
            "LineBreak": {
                "name": "LineBreak",
                "values": [
                    "normal", 
                    "strict"
                ]
            },
            "ListStylePosition": {
                "name": "ListStylePosition",
                "values": [
                    "inside", 
                    "outside"
                ]
            },
            "ListStyleType": {
                "name": "ListStyleType",
                "values": [
                    "disc", 
                    "none", 
                    "decimal", 
                    "square", 
                    "decimal-leading-zero", 
                    "lower-roman", 
                    "upper-roman", 
                    "lower-greek", 
                    "lower-latin", 
                    "upper-latin", 
                    "armenian", 
                    "georgian", 
                    "lower-alpha", 
                    "upper-alpha", 
                    "circle", 
                    "upper-greek"
                ]
            },
            "Marks": {
                "name": "Marks",
                "values": [
                    "crop", 
                    "cross", 
                    "none"
                ]
            },
            "Menu": {
                "name": "Menu",
                "values": [
                    "context", 
                    "toolbar"
                ]
            },
            "MsTextCombineHorizontal": {
                "name": "MsTextCombineHorizontal",
                "values": [
                    "none", 
                    "all", 
                    "digits"
                ]
            },
            "NoLimit": {
                "name": "NoLimit",
                "values": [
                    "no-limit"
                ]
            },
            "None": {
                "name": "None",
                "values": [
                    "none"
                ]
            },
            "NoneNormal": {
                "name": "NoneNormal",
                "values": [
                    "none", 
                    "normal"
                ]
            },
            "Normal": {
                "name": "Normal",
                "values": [
                    "normal"
                ]
            },
            "OnOff": {
                "name": "OnOff",
                "values": [
                    "on", 
                    "off"
                ]
            },
            "OpenQuote": {
                "name": "OpenQuote",
                "values": [
                    "open-quote", 
                    "close-quote", 
                    "no-open-quote", 
                    "no-close-quote"
                ]
            },
            "OutlineStyle": {
                "name": "OutlineStyle",
                "values": [
                    "none", 
                    "dotted", 
                    "dashed", 
                    "solid", 
                    "double", 
                    "groove", 
                    "ridge", 
                    "inset", 
                    "outset", 
                    "window-inset"
                ]
            },
            "Overflow": {
                "name": "Overflow",
                "values": [
                    "visible", 
                    "hidden", 
                    "scroll", 
                    "auto"
                ]
            },
            "OverflowStyle": {
                "name": "OverflowStyle",
                "values": [
                    "scrollbar", 
                    "-ms-autohiding-scrollbar", 
                    "none", 
                    "auto"
                ]
            },
            "PageBreak": {
                "name": "PageBreak",
                "values": [
                    "auto", 
                    "always", 
                    "avoid", 
                    "left", 
                    "right"
                ]
            },
            "PageBreakInside": {
                "name": "PageBreakInside",
                "values": [
                    "auto", 
                    "avoid"
                ]
            },
            "PlayState": {
                "name": "PlayState",
                "values": [
                    "running", 
                    "paused"
                ]
            },
            "PointerEvents": {
                "name": "PointerEvents",
                "values": [
                    "visiblePainted", 
                    "visibleFill", 
                    "visibleStroke", 
                    "visible", 
                    "painted", 
                    "fill", 
                    "stroke", 
                    "all", 
                    "none", 
                    "auto"
                ]
            },
            "Position": {
                "name": "Position",
                "values": [
                    "static", 
                    "relative", 
                    "absolute", 
                    "fixed", 
                    "-ms-page", 
                    "-ms-device-fixed"
                ]
            },
            "RadialGradientExtent": {
                "name": "RadialGradientExtent",
                "values": [
                    "closest-side", 
                    "closest-corner", 
                    "farthest-side", 
                    "farthest-corner"
                ]
            },
            "RadialGradientShape": {
                "name": "RadialGradientShape",
                "values": [
                    "circle", 
                    "ellipse"
                ]
            },
            "RubyAlign": {
                "name": "RubyAlign",
                "values": [
                    "auto", 
                    "left", 
                    "center", 
                    "right", 
                    "distribute-letter", 
                    "distribute-space", 
                    "line-edge"
                ]
            },
            "RubyOverhang": {
                "name": "RubyOverhang",
                "values": [
                    "auto", 
                    "whitespace", 
                    "none"
                ]
            },
            "RubyPosition": {
                "name": "RubyPosition",
                "values": [
                    "above", 
                    "inline"
                ]
            },
            "Sandbox": {
                "name": "Sandbox",
                "values": [
                    "allow-same-origin", 
                    "allow-forms", 
                    "allow-scripts"
                ]
            },
            "Scope": {
                "name": "Scope",
                "values": [
                    "row", 
                    "col", 
                    "rowgroup", 
                    "colgroup"
                ]
            },
            "ScrollChained": {
                "name": "ScrollChained",
                "values": [
                    "none", 
                    "chained"
                ]
            },
            "ScrollTranslation": {
                "name": "ScrollTranslation",
                "values": [
                    "vertical-to-horizontal", 
                    "none", 
                    "inherit"
                ]
            },
            "ScrollRailed": {
                "name": "ScrollRailed",
                "values": [
                    "none", 
                    "railed"
                ]
            },
            "Shape": {
                "name": "Shape",
                "values": [
                    "circle", 
                    "default", 
                    "poly", 
                    "rect"
                ]
            },
            "SnapType": {
                "name": "SnapType",
                "values": [
                    "none", 
                    "proximity", 
                    "mandatory"
                ]
            },
            "StartEnd": {
                "name": "StartEnd",
                "values": [
                    "start", 
                    "end"
                ]
            },
            "StrokeLineCap": {
                "name": "StrokeLineCap",
                "values": [
                    "butt", 
                    "round", 
                    "square"
                ]
            },
            "StrokeLineJoin": {
                "name": "StrokeLineJoin",
                "values": [
                    "miter", 
                    "round", 
                    "bevel"
                ]
            },
            "TableLayout": {
                "name": "TableLayout",
                "values": [
                    "auto", 
                    "fixed"
                ]
            },
            "TextAlign": {
                "name": "TextAlign",
                "values": [
                    "left", 
                    "right", 
                    "center", 
                    "justify"
                ]
            },
            "TextAlignLast": {
                "name": "TextAlignLast",
                "values": [
                    "auto", 
                    "left", 
                    "right", 
                    "center", 
                    "justify"
                ]
            },
            "TextAnchor": {
                "name": "TextAnchor",
                "values": [
                    "start", 
                    "middle", 
                    "end"
                ]
            },
            "TextAutoSpace": {
                "name": "TextAutoSpace",
                "values": [
                    "ideograph-alpha", 
                    "ideograph-numeric", 
                    "ideograph-parenthesis", 
                    "ideograph-space"
                ]
            },
            "TextDecoration": {
                "name": "TextDecoration",
                "values": [
                    "none", 
                    "underline", 
                    "overline", 
                    "line-through", 
                    "blink"
                ]
            },
            "TextJustify": {
                "name": "TextJustify",
                "values": [
                    "auto", 
                    "distribute", 
                    "distribute-all-lines", 
                    "inter-cluster", 
                    "inter-ideograph", 
                    "inter-word", 
                    "kashida", 
                    "newspaper"
                ]
            },
            "TextJustifyTrim": {
                "name": "TextJustifyTrim",
                "values": [
                    "none", 
                    "punctuation", 
                    "punct-and-kana"
                ]
            },
            "TextOverflow": {
                "name": "TextOverflow",
                "values": [
                    "ellipsis", 
                    "clip"
                ]
            },
            "TextTransform": {
                "name": "TextTransform",
                "values": [
                    "capitalize", 
                    "uppercase", 
                    "lowercase", 
                    "none"
                ]
            },
            "TextUnderlinePosition": {
                "name": "TextUnderlinePosition",
                "values": [
                    "above", 
                    "below", 
                    "auto"
                ]
            },
            "TimingFunctionKeyword": {
                "name": "TimingFunctionKeyword",
                "values": [
                    "ease", 
                    "linear", 
                    "ease-in", 
                    "ease-out", 
                    "ease-in-out", 
                    "step-start", 
                    "step-end"
                ]
            },
            "TouchAction": {
                "name": "TouchAction",
                "values": [
                    "pan-x", 
                    "pan-y", 
                    "pinch-zoom", 
                    "manipulation", 
                    "double-tap-zoom", 
                    "none", 
                    "auto", 
                    "cross-slide-x", 
                    "cross-slide-y"
                ]
            },
            "TransformStyle": {
                "name": "TransformStyle",
                "values": [
                    "flat"
                ]
            },
            "TrueFalse": {
                "name": "TrueFalse",
                "values": [
                    "true", 
                    "false"
                ]
            },
            "UnicodeBidi": {
                "name": "UnicodeBidi",
                "values": [
                    "normal", 
                    "embed", 
                    "bidi-override"
                ]
            },
            "UserSelect": {
                "name": "UserSelect",
                "values": [
                    "none", 
                    "text", 
                    "element", 
                    "auto"
                ]
            },
            "VerticalAlign": {
                "name": "VerticalAlign",
                "values": [
                    "top", 
                    "middle", 
                    "bottom", 
                    "super", 
                    "auto", 
                    "baseline", 
                    "sub", 
                    "text-top", 
                    "text-bottom"
                ]
            },
            "VerticalAlignment": {
                "name": "VerticalAlignment",
                "values": [
                    "top", 
                    "center", 
                    "bottom"
                ]
            },
            "Visibility": {
                "name": "Visibility",
                "values": [
                    "visible", 
                    "hidden", 
                    "collapse"
                ]
            },
            "WhiteSpace": {
                "name": "WhiteSpace",
                "values": [
                    "normal", 
                    "pre", 
                    "nowrap", 
                    "pre-wrap", 
                    "pre-line"
                ]
            },
            "WordBreak": {
                "name": "WordBreak",
                "values": [
                    "normal", 
                    "break-all", 
                    "keep-all"
                ]
            },
            "WordWrap": {
                "name": "WordWrap",
                "values": [
                    "normal", 
                    "break-word"
                ]
            },
            "Wrap": {
                "name": "Wrap",
                "values": [
                    "soft", 
                    "hard"
                ]
            },
            "WrapFlow": {
                "name": "WrapFlow",
                "values": [
                    "auto", 
                    "both", 
                    "start", 
                    "end", 
                    "clear", 
                    "minimum", 
                    "maximum"
                ]
            },
            "WrapThrough": {
                "name": "WrapThrough",
                "values": [
                    "wrap", 
                    "none"
                ]
            },
            "WritingMode": {
                "name": "WritingMode",
                "values": [
                    "lr-tb", 
                    "rl-tb", 
                    "tb-rl", 
                    "bt-rl", 
                    "tb-lr", 
                    "bt-lr", 
                    "lr-bt", 
                    "rl-bt", 
                    "lr", 
                    "rl", 
                    "tb"
                ]
            },
            "YesNoAuto": {
                "name": "YesNoAuto",
                "values": [
                    "yes", 
                    "no", 
                    "auto"
                ]
            },
            "ColorName": {
                "name": "ColorName",
                "values": [
                    "aliceBlue", 
                    "antiqueWhite", 
                    "aqua", 
                    "aquamarine", 
                    "azure", 
                    "beige", 
                    "bisque", 
                    "black", 
                    "blanchedAlmond", 
                    "blue", 
                    "blueViolet", 
                    "brown", 
                    "burlyWood", 
                    "cadetBlue", 
                    "chartreuse", 
                    "chocolate", 
                    "coral", 
                    "cornflowerBlue", 
                    "cornsilk", 
                    "crimson", 
                    "cyan", 
                    "darkBlue", 
                    "darkCyan", 
                    "darkGoldenrod", 
                    "darkGray", 
                    "darkGrey", 
                    "darkGreen", 
                    "darkKhaki", 
                    "darkMagenta", 
                    "darkOliveGreen", 
                    "darkOrange", 
                    "darkOrchid", 
                    "darkRed", 
                    "darkSalmon", 
                    "darkSeaGreen", 
                    "darkSlateBlue", 
                    "darkSlateGray", 
                    "darkSlateGrey", 
                    "darkTurquoise", 
                    "darkViolet", 
                    "deepPink", 
                    "deepSkyBlue", 
                    "dimGray", 
                    "dimGrey", 
                    "dodgerBlue", 
                    "fireBrick", 
                    "floralWhite", 
                    "forestGreen", 
                    "fuchsia", 
                    "gainsboro", 
                    "ghostWhite", 
                    "gold", 
                    "goldenrod", 
                    "gray", 
                    "green", 
                    "greenYellow", 
                    "grey", 
                    "honeydew", 
                    "hotPink", 
                    "indianRed", 
                    "indigo", 
                    "ivory", 
                    "khaki", 
                    "lavender", 
                    "lavenderBlush", 
                    "lawnGreen", 
                    "lemonChiffon", 
                    "lightBlue", 
                    "lightCoral", 
                    "lightCyan", 
                    "lightGoldenrodYellow", 
                    "lightGreen", 
                    "lightGray", 
                    "lightGrey", 
                    "lightPink", 
                    "lightSalmon", 
                    "lightSeaGreen", 
                    "lightSkyBlue", 
                    "lightSlateGray", 
                    "lightSlateGrey", 
                    "lightSteelBlue", 
                    "lightYellow", 
                    "lime", 
                    "limeGreen", 
                    "linen", 
                    "magenta", 
                    "maroon", 
                    "mediumAquamarine", 
                    "mediumBlue", 
                    "mediumOrchid", 
                    "mediumPurple", 
                    "mediumSeaGreen", 
                    "mediumSlateBlue", 
                    "mediumSpringGreen", 
                    "mediumTurquoise", 
                    "mediumVioletRed", 
                    "midnightBlue", 
                    "mintCream", 
                    "mistyRose", 
                    "moccasin", 
                    "navajoWhite", 
                    "navy", 
                    "oldLace", 
                    "olive", 
                    "oliveDrab", 
                    "orange", 
                    "orangeRed", 
                    "orchid", 
                    "paleGoldenrod", 
                    "paleGreen", 
                    "paleTurquoise", 
                    "paleVioletRed", 
                    "papayaWhip", 
                    "peachPuff", 
                    "peru", 
                    "pink", 
                    "plum", 
                    "powderBlue", 
                    "purple", 
                    "red", 
                    "rosyBrown", 
                    "royalBlue", 
                    "saddleBrown", 
                    "salmon", 
                    "sandyBrown", 
                    "seaGreen", 
                    "seashell", 
                    "sienna", 
                    "silver", 
                    "skyBlue", 
                    "slateBlue", 
                    "slateGray", 
                    "slateGrey", 
                    "snow", 
                    "springGreen", 
                    "steelBlue", 
                    "tan", 
                    "teal", 
                    "thistle", 
                    "tomato", 
                    "transparent", 
                    "turquoise", 
                    "violet", 
                    "wheat", 
                    "white", 
                    "whiteSmoke", 
                    "yellow", 
                    "yellowGreen"
                ]
            }
        };
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/enumMetadata.js.map

// htmlMetadata.ts
var F12;
(function (F12) {
    (function (DomExplorer) {
        DomExplorer.htmlMetadata = {
            "a": {
                "tagName": "a",
                "attributes": {
                    "href": {
                        "name": "href"
                    },
                    "target": {
                        "name": "target"
                    },
                    "rel": {
                        "name": "rel"
                    },
                    "media": {
                        "name": "media"
                    },
                    "hreflang": {
                        "name": "hreflang"
                    },
                    "type": {
                        "name": "type"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "abbr": {
                "tagName": "abbr",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "address": {
                "tagName": "address",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "area": {
                "tagName": "area",
                "attributes": {
                    "alt": {
                        "name": "alt"
                    },
                    "coords": {
                        "name": "coords"
                    },
                    "shape": {
                        "name": "shape",
                        "enumValueListName": "Shape"
                    },
                    "href": {
                        "name": "href"
                    },
                    "target": {
                        "name": "target"
                    },
                    "rel": {
                        "name": "rel"
                    },
                    "media": {
                        "name": "media"
                    },
                    "hreflang": {
                        "name": "hreflang"
                    },
                    "type": {
                        "name": "type"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "article": {
                "tagName": "article",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "aside": {
                "tagName": "aside",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "audio": {
                "tagName": "audio",
                "attributes": {
                    "src": {
                        "name": "src"
                    },
                    "preload": {
                        "name": "preload",
                        "enumValueListName": "Buffering"
                    },
                    "autoplay": {
                        "name": "autoplay"
                    },
                    "loop": {
                        "name": "loop"
                    },
                    "controls": {
                        "name": "controls"
                    },
                    "muted": {
                        "name": "muted"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "b": {
                "tagName": "b",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "base": {
                "tagName": "base",
                "attributes": {
                    "href": {
                        "name": "href"
                    },
                    "target": {
                        "name": "target"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "basefont": {
                "tagName": "basefont",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "bdo": {
                "tagName": "bdo",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "bgsound": {
                "tagName": "bgsound",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "big": {
                "tagName": "big",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "blockquote": {
                "tagName": "blockquote",
                "attributes": {
                    "cite": {
                        "name": "cite"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "body": {
                "tagName": "body",
                "attributes": {
                    "onafterprint": {
                        "name": "onafterprint"
                    },
                    "onbeforeprint": {
                        "name": "onbeforeprint"
                    },
                    "onbeforeunload": {
                        "name": "onbeforeunload"
                    },
                    "onblur": {
                        "name": "onblur"
                    },
                    "onerror": {
                        "name": "onerror"
                    },
                    "onfocus": {
                        "name": "onfocus"
                    },
                    "onhashchange": {
                        "name": "onhashchange"
                    },
                    "onload": {
                        "name": "onload"
                    },
                    "onmessage": {
                        "name": "onmessage"
                    },
                    "onoffline": {
                        "name": "onoffline"
                    },
                    "ononline": {
                        "name": "ononline"
                    },
                    "onpagehide": {
                        "name": "onpagehide"
                    },
                    "onpageshow": {
                        "name": "onpageshow"
                    },
                    "onpopstate": {
                        "name": "onpopstate"
                    },
                    "onredo": {
                        "name": "onredo"
                    },
                    "onresize": {
                        "name": "onresize"
                    },
                    "onstorage": {
                        "name": "onstorage"
                    },
                    "onundo": {
                        "name": "onundo"
                    },
                    "onunload": {
                        "name": "onunload"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "br": {
                "tagName": "br",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "button": {
                "tagName": "button",
                "attributes": {
                    "autofocus": {
                        "name": "autofocus"
                    },
                    "disabled": {
                        "name": "disabled"
                    },
                    "form": {
                        "name": "form"
                    },
                    "formaction": {
                        "name": "formaction"
                    },
                    "formenctype": {
                        "name": "formenctype",
                        "enumValueListName": "Enctype"
                    },
                    "formmethod": {
                        "name": "formmethod",
                        "enumValueListName": "FormMethod"
                    },
                    "formnovalidate": {
                        "name": "formnovalidate"
                    },
                    "formtarget": {
                        "name": "formtarget"
                    },
                    "name": {
                        "name": "name"
                    },
                    "type": {
                        "name": "type",
                        "enumValueListName": "Input"
                    },
                    "value": {
                        "name": "value"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "canvas": {
                "tagName": "canvas",
                "attributes": {
                    "width": {
                        "name": "width"
                    },
                    "height": {
                        "name": "height"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "caption": {
                "tagName": "caption",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "cite": {
                "tagName": "cite",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "code": {
                "tagName": "code",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "col": {
                "tagName": "col",
                "attributes": {
                    "span": {
                        "name": "span"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "colgroup": {
                "tagName": "colgroup",
                "attributes": {
                    "span": {
                        "name": "span"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "command": {
                "tagName": "command",
                "attributes": {
                    "checked": {
                        "name": "checked"
                    },
                    "command": {
                        "name": "command"
                    },
                    "disabled": {
                        "name": "disabled"
                    },
                    "icon": {
                        "name": "icon"
                    },
                    "label": {
                        "name": "label"
                    },
                    "radiogroup": {
                        "name": "radiogroup"
                    },
                    "type": {
                        "name": "type",
                        "enumValueListName": "Command"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "datalist": {
                "tagName": "datalist",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "dd": {
                "tagName": "dd",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "del": {
                "tagName": "del",
                "attributes": {
                    "cite": {
                        "name": "cite"
                    },
                    "datetime": {
                        "name": "datetime"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "dfn": {
                "tagName": "dfn",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "dir": {
                "tagName": "dir",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "div": {
                "tagName": "div",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "dl": {
                "tagName": "dl",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "dt": {
                "tagName": "dt",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "em": {
                "tagName": "em",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "embed": {
                "tagName": "embed",
                "attributes": {
                    "src": {
                        "name": "src"
                    },
                    "type": {
                        "name": "type"
                    },
                    "width": {
                        "name": "width"
                    },
                    "height": {
                        "name": "height"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "fieldset": {
                "tagName": "fieldset",
                "attributes": {
                    "disabled": {
                        "name": "disabled"
                    },
                    "form": {
                        "name": "form"
                    },
                    "name": {
                        "name": "name"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "figcaption": {
                "tagName": "figcaption",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "figure": {
                "tagName": "figure",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "footer": {
                "tagName": "footer",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "form": {
                "tagName": "form",
                "attributes": {
                    "accept-charset": {
                        "name": "accept-charset"
                    },
                    "action": {
                        "name": "action"
                    },
                    "autocomplete": {
                        "name": "autocomplete",
                        "enumValueListName": "OnOff"
                    },
                    "enctype": {
                        "name": "enctype",
                        "enumValueListName": "Enctype"
                    },
                    "method": {
                        "name": "method",
                        "enumValueListName": "FormMethod"
                    },
                    "name": {
                        "name": "name"
                    },
                    "novalidate": {
                        "name": "novalidate"
                    },
                    "target": {
                        "name": "target"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "h1": {
                "tagName": "h1",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "h2": {
                "tagName": "h2",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "h3": {
                "tagName": "h3",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "h4": {
                "tagName": "h4",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "h5": {
                "tagName": "h5",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "h6": {
                "tagName": "h6",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "head": {
                "tagName": "head",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "header": {
                "tagName": "header",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "hgroup": {
                "tagName": "hgroup",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "hr": {
                "tagName": "hr",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "html": {
                "tagName": "html",
                "attributes": {
                    "manifest": {
                        "name": "manifest"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "i": {
                "tagName": "i",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "iframe": {
                "tagName": "iframe",
                "attributes": {
                    "src": {
                        "name": "src"
                    },
                    "srcdoc": {
                        "name": "srcdoc"
                    },
                    "name": {
                        "name": "name"
                    },
                    "sandbox": {
                        "name": "sandbox",
                        "enumValueListName": "Sandbox"
                    },
                    "seamless": {
                        "name": "seamless"
                    },
                    "width": {
                        "name": "width"
                    },
                    "height": {
                        "name": "height"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "img": {
                "tagName": "img",
                "attributes": {
                    "alt": {
                        "name": "alt"
                    },
                    "src": {
                        "name": "src"
                    },
                    "usemap": {
                        "name": "usemap"
                    },
                    "ismap": {
                        "name": "ismap"
                    },
                    "width": {
                        "name": "width"
                    },
                    "height": {
                        "name": "height"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "input": {
                "tagName": "input",
                "attributes": {
                    "accept": {
                        "name": "accept"
                    },
                    "alt": {
                        "name": "alt"
                    },
                    "autocomplete": {
                        "name": "autocomplete",
                        "enumValueListName": "OnOff"
                    },
                    "autofocus": {
                        "name": "autofocus"
                    },
                    "checked": {
                        "name": "checked"
                    },
                    "disabled": {
                        "name": "disabled"
                    },
                    "form": {
                        "name": "form"
                    },
                    "formaction": {
                        "name": "formaction"
                    },
                    "formenctype": {
                        "name": "formenctype",
                        "enumValueListName": "Enctype"
                    },
                    "formmethod": {
                        "name": "formmethod",
                        "enumValueListName": "FormMethod"
                    },
                    "formnovalidate": {
                        "name": "formnovalidate"
                    },
                    "formtarget": {
                        "name": "formtarget"
                    },
                    "height": {
                        "name": "height"
                    },
                    "list": {
                        "name": "list"
                    },
                    "max": {
                        "name": "max"
                    },
                    "maxlength": {
                        "name": "maxlength"
                    },
                    "min": {
                        "name": "min"
                    },
                    "multiple": {
                        "name": "multiple"
                    },
                    "name": {
                        "name": "name"
                    },
                    "pattern": {
                        "name": "pattern"
                    },
                    "placeholder": {
                        "name": "placeholder"
                    },
                    "readonly": {
                        "name": "readonly"
                    },
                    "required": {
                        "name": "required"
                    },
                    "size": {
                        "name": "size"
                    },
                    "src": {
                        "name": "src"
                    },
                    "step": {
                        "name": "step",
                        "enumValueListName": "Any"
                    },
                    "type": {
                        "name": "type",
                        "enumValueListName": "Input"
                    },
                    "value": {
                        "name": "value"
                    },
                    "width": {
                        "name": "width"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "ins": {
                "tagName": "ins",
                "attributes": {
                    "cite": {
                        "name": "cite"
                    },
                    "datetime": {
                        "name": "datetime"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "kbd": {
                "tagName": "kbd",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "keygen": {
                "tagName": "keygen",
                "attributes": {
                    "autofocus": {
                        "name": "autofocus"
                    },
                    "challenge": {
                        "name": "challenge"
                    },
                    "disabled": {
                        "name": "disabled"
                    },
                    "form": {
                        "name": "form"
                    },
                    "keytype": {
                        "name": "keytype"
                    },
                    "name": {
                        "name": "name"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "label": {
                "tagName": "label",
                "attributes": {
                    "form": {
                        "name": "form"
                    },
                    "for": {
                        "name": "for"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "legend": {
                "tagName": "legend",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "li": {
                "tagName": "li",
                "attributes": {
                    "value": {
                        "name": "value"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "link": {
                "tagName": "link",
                "attributes": {
                    "href": {
                        "name": "href"
                    },
                    "rel": {
                        "name": "rel"
                    },
                    "media": {
                        "name": "media"
                    },
                    "hreflang": {
                        "name": "hreflang"
                    },
                    "type": {
                        "name": "type"
                    },
                    "sizes": {
                        "name": "sizes"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "map": {
                "tagName": "map",
                "attributes": {
                    "name": {
                        "name": "name"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "mark": {
                "tagName": "mark",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "menu": {
                "tagName": "menu",
                "attributes": {
                    "type": {
                        "name": "type",
                        "enumValueListName": "Menu"
                    },
                    "label": {
                        "name": "label"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "meta": {
                "tagName": "meta",
                "attributes": {
                    "name": {
                        "name": "name"
                    },
                    "http-equiv": {
                        "name": "http-equiv"
                    },
                    "content": {
                        "name": "content"
                    },
                    "charset": {
                        "name": "charset"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "nav": {
                "tagName": "nav",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "noframes": {
                "tagName": "noframes",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "noscript": {
                "tagName": "noscript",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "object": {
                "tagName": "object",
                "attributes": {
                    "data": {
                        "name": "data"
                    },
                    "type": {
                        "name": "type"
                    },
                    "name": {
                        "name": "name"
                    },
                    "usemap": {
                        "name": "usemap"
                    },
                    "form": {
                        "name": "form"
                    },
                    "width": {
                        "name": "width"
                    },
                    "height": {
                        "name": "height"
                    },
                    "typemustmatch": {
                        "name": "typemustmatch"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "ol": {
                "tagName": "ol",
                "attributes": {
                    "reversed": {
                        "name": "reversed"
                    },
                    "start": {
                        "name": "start"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "optgroup": {
                "tagName": "optgroup",
                "attributes": {
                    "disabled": {
                        "name": "disabled"
                    },
                    "label": {
                        "name": "label"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "option": {
                "tagName": "option",
                "attributes": {
                    "disabled": {
                        "name": "disabled"
                    },
                    "label": {
                        "name": "label"
                    },
                    "selected": {
                        "name": "selected"
                    },
                    "value": {
                        "name": "value"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "output": {
                "tagName": "output",
                "attributes": {
                    "for": {
                        "name": "for"
                    },
                    "form": {
                        "name": "form"
                    },
                    "name": {
                        "name": "name"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "p": {
                "tagName": "p",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "param": {
                "tagName": "param",
                "attributes": {
                    "name": {
                        "name": "name"
                    },
                    "value": {
                        "name": "value"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "pre": {
                "tagName": "pre",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "progress": {
                "tagName": "progress",
                "attributes": {
                    "value": {
                        "name": "value"
                    },
                    "max": {
                        "name": "max"
                    },
                    "form": {
                        "name": "form"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "q": {
                "tagName": "q",
                "attributes": {
                    "cite": {
                        "name": "cite"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "rp": {
                "tagName": "rp",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "rt": {
                "tagName": "rt",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "ruby": {
                "tagName": "ruby",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "s": {
                "tagName": "s",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "samp": {
                "tagName": "samp",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "script": {
                "tagName": "script",
                "attributes": {
                    "src": {
                        "name": "src"
                    },
                    "async": {
                        "name": "async"
                    },
                    "defer": {
                        "name": "defer"
                    },
                    "type": {
                        "name": "type"
                    },
                    "charset": {
                        "name": "charset"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "section": {
                "tagName": "section",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "select": {
                "tagName": "select",
                "attributes": {
                    "autofocus": {
                        "name": "autofocus"
                    },
                    "disabled": {
                        "name": "disabled"
                    },
                    "form": {
                        "name": "form"
                    },
                    "multiple": {
                        "name": "multiple"
                    },
                    "name": {
                        "name": "name"
                    },
                    "required": {
                        "name": "required"
                    },
                    "size": {
                        "name": "size"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "small": {
                "tagName": "small",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "source": {
                "tagName": "source",
                "attributes": {
                    "src": {
                        "name": "src"
                    },
                    "type": {
                        "name": "type"
                    },
                    "media": {
                        "name": "media"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "span": {
                "tagName": "span",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "strike": {
                "tagName": "strike",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "strong": {
                "tagName": "strong",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "style": {
                "tagName": "style",
                "attributes": {
                    "media": {
                        "name": "media"
                    },
                    "type": {
                        "name": "type"
                    },
                    "scoped": {
                        "name": "scoped"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "sub": {
                "tagName": "sub",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "sup": {
                "tagName": "sup",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "table": {
                "tagName": "table",
                "attributes": {
                    "summary": {
                        "name": "summary"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "tbody": {
                "tagName": "tbody",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "td": {
                "tagName": "td",
                "attributes": {
                    "colspan": {
                        "name": "colspan"
                    },
                    "rowspan": {
                        "name": "rowspan"
                    },
                    "headers": {
                        "name": "headers"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "textarea": {
                "tagName": "textarea",
                "attributes": {
                    "autofocus": {
                        "name": "autofocus"
                    },
                    "cols": {
                        "name": "cols"
                    },
                    "disabled": {
                        "name": "disabled"
                    },
                    "form": {
                        "name": "form"
                    },
                    "maxlength": {
                        "name": "maxlength"
                    },
                    "name": {
                        "name": "name"
                    },
                    "placeholder": {
                        "name": "placeholder"
                    },
                    "readonly": {
                        "name": "readonly"
                    },
                    "required": {
                        "name": "required"
                    },
                    "rows": {
                        "name": "rows"
                    },
                    "wrap": {
                        "name": "wrap",
                        "enumValueListName": "Wrap"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "tfoot": {
                "tagName": "tfoot",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "th": {
                "tagName": "th",
                "attributes": {
                    "colspan": {
                        "name": "colspan"
                    },
                    "rowspan": {
                        "name": "rowspan"
                    },
                    "headers": {
                        "name": "headers"
                    },
                    "scope": {
                        "name": "scope",
                        "enumValueListName": "Scope"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "thead": {
                "tagName": "thead",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "title": {
                "tagName": "title",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "tr": {
                "tagName": "tr",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "track": {
                "tagName": "track",
                "attributes": {
                    "src": {
                        "name": "src"
                    },
                    "srclang": {
                        "name": "srclang"
                    },
                    "kind": {
                        "name": "kind"
                    },
                    "label": {
                        "name": "label"
                    },
                    "default": {
                        "name": "default"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "tt": {
                "tagName": "tt",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "u": {
                "tagName": "u",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "ul": {
                "tagName": "ul",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "var": {
                "tagName": "var",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "video": {
                "tagName": "video",
                "attributes": {
                    "src": {
                        "name": "src"
                    },
                    "poster": {
                        "name": "poster"
                    },
                    "preload": {
                        "name": "preload",
                        "enumValueListName": "Buffering"
                    },
                    "autoplay": {
                        "name": "autoplay"
                    },
                    "loop": {
                        "name": "loop"
                    },
                    "controls": {
                        "name": "controls"
                    },
                    "width": {
                        "name": "width"
                    },
                    "height": {
                        "name": "height"
                    },
                    "muted": {
                        "name": "muted"
                    },
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            },
            "wbr": {
                "tagName": "wbr",
                "attributes": {
                    "accesskey": {
                        "name": "accesskey"
                    },
                    "class": {
                        "name": "class"
                    },
                    "contenteditable": {
                        "name": "contenteditable",
                        "enumValueListName": "TrueFalse"
                    },
                    "contextmenu": {
                        "name": "contextmenu"
                    },
                    "dir": {
                        "name": "dir",
                        "enumValueListName": "Direction"
                    },
                    "draggable": {
                        "name": "draggable",
                        "enumValueListName": "TrueFalse"
                    },
                    "dropzone": {
                        "name": "dropzone"
                    },
                    "hidden": {
                        "name": "hidden"
                    },
                    "id": {
                        "name": "id"
                    },
                    "inert": {
                        "name": "inert"
                    },
                    "spellcheck": {
                        "name": "spellcheck",
                        "enumValueListName": "TrueFalse"
                    },
                    "style": {
                        "name": "style"
                    },
                    "tabindex": {
                        "name": "tabindex"
                    },
                    "title": {
                        "name": "title"
                    },
                    "translate": {
                        "name": "translate"
                    }
                }
            }
        };
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/htmlMetadata.js.map

// cssAndHtmlMetadataSource.ts
var F12;
(function (F12) {
    (function (DomExplorer) {
        var CssAndHtmlMetadataSource = (function () {
            function CssAndHtmlMetadataSource() {
                this._cssMetadata = F12.DomExplorer.cssPropertyMetadata;
                this._enumValueLists = F12.DomExplorer.enumMetadata;
                this._htmlMetadata = F12.DomExplorer.htmlMetadata;
                this._htmlTagNames = [];
                var htmlTagName;
                for(htmlTagName in this._htmlMetadata) {
                    this._htmlTagNames.push(htmlTagName);
                }
                this.sortEnumValueListContents();
            }
            CssAndHtmlMetadataSource.prototype.getCssShorthandList = function () {
                var shorthandList = [];
                for(var property in this._cssMetadata) {
                    if(this._cssMetadata[property].shorthand) {
                        shorthandList.push(this._cssMetadata[property].name);
                    }
                }
                shorthandList.sort();
                return shorthandList;
            };
            CssAndHtmlMetadataSource.prototype.getCssValueList = function (cssPropertyName) {
                var propertyMetadata = this._cssMetadata[cssPropertyName];
                if(!propertyMetadata || !propertyMetadata.enumValueListName) {
                    return null;
                }
                var list = this._enumValueLists[propertyMetadata.enumValueListName].values;
                list.sort();
                return list;
            };
            CssAndHtmlMetadataSource.prototype.getHtmlValueList = function (htmlTagName, htmlAttributeName) {
                var htmlElementMetadata = this._htmlMetadata[htmlTagName];
                if(!htmlElementMetadata) {
                    return null;
                }
                var htmlAttributeMetadata = htmlElementMetadata[htmlAttributeName];
                if(!htmlAttributeMetadata) {
                    return null;
                }
                var list = this._enumValueLists[htmlAttributeMetadata.enumValueListName].values;
                list.sort();
                return list;
            };
            CssAndHtmlMetadataSource.prototype.getHtmlTagNames = function () {
                return this._htmlTagNames;
            };
            CssAndHtmlMetadataSource.prototype.getHtmlAttributeNames = function (htmlTagName) {
                var htmlAttributeNamesForGivenTagName = [];
                var htmlElementMetadata = this._htmlMetadata[htmlTagName];
                if(!htmlElementMetadata) {
                    return null;
                }
                var htmlAttributeName;
                for(htmlAttributeName in htmlElementMetadata) {
                    htmlAttributeNamesForGivenTagName.push(htmlAttributeName);
                }
                htmlAttributeNamesForGivenTagName.sort();
                return htmlAttributeNamesForGivenTagName;
            };
            CssAndHtmlMetadataSource.prototype.sortEnumValueListContents = function () {
                for(var listName in this._enumValueLists) {
                    var listContainer = this._enumValueLists[listName];
                    listContainer.values.sort();
                }
            };
            return CssAndHtmlMetadataSource;
        })();
        DomExplorer.CssAndHtmlMetadataSource = CssAndHtmlMetadataSource;        
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/cssAndHtmlMetadataSource.js.map

// stylePropertyValueIntellisenseProvider.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var F12;
(function (F12) {
    (function (DomExplorer) {
        var StylePropertyValueIntellisenseProvider = (function (_super) {
            __extends(StylePropertyValueIntellisenseProvider, _super);
            function StylePropertyValueIntellisenseProvider(cssPropertyName, cssAndHtmlMetadataSource) {
                        _super.call(this, false);
                this._metadataSource = cssAndHtmlMetadataSource;
                this.updateChoices(cssPropertyName);
                this._traceWriter = new Common.TraceWriter();
            }
            Object.defineProperty(StylePropertyValueIntellisenseProvider.prototype, "hasChoices", {
                get: function () {
                    return this._hasChoices;
                },
                enumerable: true,
                configurable: true
            });
            StylePropertyValueIntellisenseProvider.prototype.updateChoices = function (cssPropertyName) {
                var choices = [];
                var stringChoices = this._metadataSource.getCssValueList(cssPropertyName);
                if(stringChoices) {
                    this._hasChoices = true;
                    for(var i = 0; i < stringChoices.length; i++) {
                        choices.push(new Common.Intellisense.IntellisenseChoice(stringChoices[i], ""));
                    }
                } else {
                    this._hasChoices = false;
                }
                this.choices = choices;
            };
            StylePropertyValueIntellisenseProvider.prototype.clearChoices = function () {
                this.choices = [];
                this._hasChoices = false;
            };
            StylePropertyValueIntellisenseProvider.prototype.fireSetFilterStartEvent = function () {
            };
            StylePropertyValueIntellisenseProvider.prototype.fireSetFilterEndEvent = function () {
            };
            StylePropertyValueIntellisenseProvider.prototype.fireUpdateLayoutStartEvent = function () {
                this._traceWriter.raiseEvent(Common.TraceEvents.Dom_StylesTab_Intellisense_Start);
            };
            StylePropertyValueIntellisenseProvider.prototype.fireUpdateLayoutEndEvent = function () {
                this._traceWriter.raiseEvent(Common.TraceEvents.Dom_StylesTab_Intellisense_Stop);
            };
            return StylePropertyValueIntellisenseProvider;
        })(Common.Intellisense.StaticContentProvider);
        DomExplorer.StylePropertyValueIntellisenseProvider = StylePropertyValueIntellisenseProvider;        
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/stylePropertyValueIntellisenseProvider.js.map

// styleModel.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    (function (StyleEditMode) {
        StyleEditMode._map = [];
        StyleEditMode._map[0] = "none";
        StyleEditMode.none = 0;
        StyleEditMode._map[1] = "name";
        StyleEditMode.name = 1;
        StyleEditMode._map[2] = "value";
        StyleEditMode.value = 2;
        StyleEditMode._map[3] = "add";
        StyleEditMode.add = 3;
        StyleEditMode._map[4] = "selector";
        StyleEditMode.selector = 4;
    })(Dom.StyleEditMode || (Dom.StyleEditMode = {}));
    var StyleEditMode = Dom.StyleEditMode;
    ;
    var StyleEditLocation = (function () {
        function StyleEditLocation(selection, editMode) {
            this.selection = selection;
            this.editMode = editMode;
        }
        return StyleEditLocation;
    })();
    Dom.StyleEditLocation = StyleEditLocation;    
    var StyleModel = (function (_super) {
        __extends(StyleModel, _super);
        function StyleModel(_bridge, _domExplorer, _styleCache) {
            var _this = this;
                _super.call(this);
            this._bridge = _bridge;
            this._domExplorer = _domExplorer;
            this._styleCache = _styleCache;
            this._collapsedProperties = {
            };
            this._styleProperties = [];
            this.listSource = function (callback, args) {
                var uid = args[0];
                _this._styleCache.updateView(uid, function (styles) {
                    _this._styles = styles;
                    callback(_this._styles.rules);
                    _this._collapsedProperties = {
                    };
                    _this.currentSelection = null;
                    _this._styles.rules.forEach(function (rule) {
                        rule.properties.forEach(function (property) {
                            _this._collapsedProperties[property.uid] = true;
                        });
                    });
                });
                if(_this._styleProperties.length === 0) {
                    _this._bridge.channel.call(_this._bridge.engine, "getComputedStyles", [
                        uid
                    ], function (computedStylesResultArray) {
                        if(!computedStylesResultArray) {
                            return;
                        }
                        var computedStyle = computedStylesResultArray[0];
                        for(var propertyName in computedStyle) {
                            _this._styleProperties.push(propertyName);
                        }
                        var shorthandList = _this.cssAndHtmlMetadataSource.getCssShorthandList();
                        for(var propertyName in shorthandList) {
                            _this._styleProperties.push(shorthandList[propertyName]);
                        }
                        _this._styleProperties.sort();
                    });
                }
            };
            this.cssAndHtmlMetadataSource = new F12.DomExplorer.CssAndHtmlMetadataSource();
        }
        StyleModel._collapsedRules = {
        };
        StyleModel.newUidTag = "new-";
        StyleModel.newUidTagLength = StyleModel.newUidTag.length;
        StyleModel.nextUid = 0;
        StyleModel.clearCollapsedRules = function clearCollapsedRules() {
            StyleModel._collapsedRules = {
            };
        };
        StyleModel.prototype.forEachRule = function (func) {
            this._styles.rules.forEach(func);
        };
        StyleModel.prototype.addUpdateListeners = function (listener) {
            this._styles.addUpdateListener(listener);
        };
        StyleModel.prototype.select = function (selection) {
            this.currentSelection = selection;
        };
        StyleModel.prototype.previousSelection = function (selection, navigateRulesOnly, allowSubProperties) {
            if (typeof allowSubProperties === "undefined") { allowSubProperties = true; }
            if(navigateRulesOnly) {
                if(selection.container) {
                    return selection.container.container || selection.container;
                }
                return this.previousRule(selection);
            }
            var rule;
            var property;
            if(selection.isRule) {
                rule = this.previousRule(selection);
                if(rule && this.isExpanded(rule) && !this.isEmpty(rule)) {
                    property = this.lastProperty(rule);
                    if(allowSubProperties && this.isExpanded(property) && !this.isEmpty(property)) {
                        return this.lastProperty(property);
                    }
                    return property;
                }
                return rule;
            }
            if(selection.isProperty) {
                property = this.previousProperty(selection);
                if(!property) {
                    return selection.container;
                }
                if(allowSubProperties && this.isExpanded(property) && !this.isEmpty(property)) {
                    return this.lastProperty(property);
                }
                return property;
            }
            property = this.previousProperty(selection);
            return allowSubProperties ? (property || selection.container) : selection.container;
        };
        StyleModel.prototype.nextSelection = function (selection, navigateRulesOnly, allowSubProperties) {
            if (typeof allowSubProperties === "undefined") { allowSubProperties = true; }
            if(navigateRulesOnly) {
                var rule = selection.isRule ? selection : (selection.isProperty ? selection.container : selection.container.container);
                return this.nextRule(rule);
            }
            if(this.isExpanded(selection) && !this.isEmpty(selection)) {
                if(allowSubProperties || selection.isRule) {
                    return this.firstProperty(selection);
                }
            }
            if(selection.isRule) {
                return this.nextRule(selection);
            }
            var next = this.nextProperty(selection);
            if(next && (allowSubProperties || next.isProperty)) {
                return next;
            }
            if(selection.isSubProperty && allowSubProperties) {
                next = this.nextProperty(selection.container);
                return next || this.nextRule(selection.container.container);
            }
            return this.nextRule(selection.container);
        };
        StyleModel.prototype.outSelection = function () {
            var selection = this.currentSelection;
            return selection.container;
        };
        StyleModel.prototype.inSelection = function () {
            var selection = this.currentSelection;
            return this.firstProperty(selection);
        };
        StyleModel.prototype.firstRule = function () {
            return this._styles.rules[0];
        };
        StyleModel.prototype.lastRule = function () {
            return this._styles.rules[this._styles.rules.length - 1];
        };
        StyleModel.prototype.lastSelection = function (allowSubProperties) {
            if (typeof allowSubProperties === "undefined") { allowSubProperties = true; }
            var selection = this.lastRule();
            if(this.isExpanded(selection) && !this.isEmpty(selection)) {
                selection = this.lastProperty(selection);
                if(this.isExpanded(selection) && !this.isEmpty(selection)) {
                    selection = this.lastProperty(selection);
                }
            }
            return selection;
        };
        StyleModel.prototype.nextRule = function (selection) {
            var rules = this._styles.rules;
            for(var i = 0; i < rules.length; i++) {
                if(rules[i] === selection) {
                    return i < rules.length - 1 ? rules[i + 1] : null;
                }
            }
        };
        StyleModel.prototype.previousRule = function (selection) {
            var rules = this._styles.rules;
            for(var i = 0; i < rules.length; i++) {
                if(rules[i] === selection) {
                    return i > 0 ? rules[i - 1] : null;
                }
            }
        };
        StyleModel.prototype.firstProperty = function (selection) {
            for(var i = 0; i < selection.properties.length; i++) {
                var property = selection.properties[i];
                if(property.isApplied) {
                    return property;
                }
            }
        };
        StyleModel.prototype.lastProperty = function (selection) {
            for(var i = selection.properties.length - 1; i >= 0; i--) {
                var property = selection.properties[i];
                if(property.isApplied) {
                    return property;
                }
            }
        };
        StyleModel.prototype.nextProperty = function (selection) {
            var properties = selection.container.properties;
            var found = false;
            for(var i = 0; i < properties.length; i++) {
                var property = properties[i];
                if(found && property.isApplied) {
                    return property;
                } else if(property === selection) {
                    found = true;
                }
            }
        };
        StyleModel.prototype.previousProperty = function (selection) {
            var properties = selection.container.properties;
            var previous;
            for(var i = 0; i < properties.length; i++) {
                var property = properties[i];
                if(property === selection) {
                    return previous;
                }
                if(property.isApplied) {
                    previous = property;
                }
            }
        };
        StyleModel.prototype.isExpanded = function (selection) {
            return !selection || (selection.isRule ? !StyleModel._collapsedRules[selection.uid] : (selection.properties.length > 0 && !this._collapsedProperties[selection.uid]));
        };
        StyleModel.prototype.isEmpty = function (selection) {
            for(var i = 0; i < selection.properties.length; i++) {
                if(selection.properties[i].isApplied) {
                    return false;
                }
            }
            return true;
        };
        StyleModel.prototype.setExpanded = function (selection, isExpanded) {
            if(selection.isRule || (selection.isProperty && selection.properties.length)) {
                var list = selection.isRule ? StyleModel._collapsedRules : this._collapsedProperties;
                if(isExpanded) {
                    delete list[selection.uid];
                } else {
                    list[selection.uid] = true;
                }
            }
        };
        StyleModel.prototype.getStyleProperties = function () {
            return this._styleProperties;
        };
        StyleModel.prototype.getPropertyById = function (propertyId) {
            return this._styles.getPropertyById(propertyId);
        };
        StyleModel.prototype.getRuleById = function (ruleId) {
            return this._styles.getRuleById(ruleId);
        };
        StyleModel.prototype.createNewRule = function (selector) {
            return this._styles.createNewRule(selector);
        };
        StyleModel.prototype.getNextEdit = function (previousSelection, previousEditMode, isAbandonedNewProperty, moveUp) {
            var first;
            var current;
            var takeNext = false;
            var takeLast = false;
            if(!isAbandonedNewProperty && !previousSelection.isDeleted) {
                if(!moveUp && previousEditMode === StyleEditMode.name) {
                    return new StyleEditLocation(previousSelection, StyleEditMode.value);
                }
                if(moveUp && previousEditMode === StyleEditMode.value) {
                    return new StyleEditLocation(previousSelection, StyleEditMode.name);
                }
            }
            var rules = this._styles.rules;
            for(var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                if(rule === previousSelection && moveUp) {
                    if(current) {
                        return current;
                    }
                    takeLast = true;
                }
                if(!rule.isInlined && !rule.isDeleted) {
                    current = new StyleEditLocation(rule, StyleEditMode.selector);
                    if(takeNext) {
                        return current;
                    }
                    if(!first) {
                        first = current;
                    }
                }
                if(rule === previousSelection && !moveUp) {
                    takeNext = true;
                }
                if(!rule.isDeleted && this.isExpanded(rule)) {
                    var properties = rule.properties;
                    var length = rule.properties.length;
                    for(var j = 0; j < length; j++) {
                        var property = properties[j];
                        if(property === previousSelection) {
                            if(moveUp) {
                                if(current) {
                                    return current;
                                }
                                takeLast = true;
                            } else {
                                takeNext = true;
                            }
                        } else if(!property.isDeleted) {
                            current = new StyleEditLocation(property, StyleEditMode.name);
                            if(takeNext) {
                                return current;
                            }
                            if(!first) {
                                first = current;
                            }
                            current = new StyleEditLocation(property, StyleEditMode.value);
                        }
                    }
                    var lastProperty = rule.properties[length - 1];
                    if(previousSelection !== lastProperty || !isAbandonedNewProperty) {
                        current = new StyleEditLocation(length ? lastProperty : rule, StyleEditMode.add);
                        if(takeNext) {
                            return current;
                        }
                        if(!first) {
                            first = current;
                        }
                    }
                }
            }
            if(takeLast && current) {
                return current;
            }
            if(takeNext && first) {
                return first;
            }
            return new StyleEditLocation(rules[0], StyleEditMode.add);
        };
        StyleModel.prototype.hoverElement = function (uid, show) {
            if(show) {
                this._domExplorer.temporaryShowElementHighlight(uid);
            } else {
                this._domExplorer.restoreElementHighlight();
            }
        };
        StyleModel.prototype.enableEditChaining = function () {
            this._bridge.channel.call(this._bridge.engine, "enableEditChaining");
        };
        StyleModel.prototype.disableEditChaining = function () {
            this._bridge.channel.call(this._bridge.engine, "disableEditChaining");
        };
        StyleModel.prototype.startSingleEdit = function () {
            this._bridge.channel.call(this._bridge.engine, "startSingleEdit");
        };
        StyleModel.prototype.endSingleEdit = function () {
            this._bridge.channel.call(this._bridge.engine, "endSingleEdit");
        };
        StyleModel.prototype.handleFileLinkClick = function (originalUrl, line, column) {
            try  {
                var url = decodeURI(originalUrl);
                (Plugin).Host.showDocument(url, line || 1, column || 1);
            } catch (ex) {
            }
        };
        return StyleModel;
    })(Common.ModelView.ListModel);
    Dom.StyleModel = StyleModel;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/StyleView/styleModel.js.map

// stylePropertyIntellisenseProvider.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var F12;
(function (F12) {
    (function (DomExplorer) {
        var StylePropertyIntellisenseProvider = (function (_super) {
            __extends(StylePropertyIntellisenseProvider, _super);
            function StylePropertyIntellisenseProvider(stylePropertySource) {
                        _super.call(this, false);
                var choices = [];
                var styleProperties = stylePropertySource.getStyleProperties();
                for(var i = 0; i < styleProperties.length; i++) {
                    choices.push(new Common.Intellisense.IntellisenseChoice(styleProperties[i], ""));
                }
                this.choices = choices;
                this._traceWriter = new Common.TraceWriter();
            }
            StylePropertyIntellisenseProvider.prototype.fireSetFilterStartEvent = function () {
            };
            StylePropertyIntellisenseProvider.prototype.fireSetFilterEndEvent = function () {
            };
            StylePropertyIntellisenseProvider.prototype.fireUpdateLayoutStartEvent = function () {
                this._traceWriter.raiseEvent(Common.TraceEvents.Dom_StylesTab_Intellisense_Start);
            };
            StylePropertyIntellisenseProvider.prototype.fireUpdateLayoutEndEvent = function () {
                this._traceWriter.raiseEvent(Common.TraceEvents.Dom_StylesTab_Intellisense_Stop);
            };
            return StylePropertyIntellisenseProvider;
        })(Common.Intellisense.StaticContentProvider);
        DomExplorer.StylePropertyIntellisenseProvider = StylePropertyIntellisenseProvider;        
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/stylePropertyIntellisenseProvider.js.map

// styleView.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var StyleView = (function (_super) {
        __extends(StyleView, _super);
        function StyleView(domExplorer, bridge, htmlElementSource, styleViewDivId, defaultItemTemplateId, model, localizer, alternateTemplates) {
                _super.call(this, htmlElementSource, styleViewDivId, defaultItemTemplateId, model, alternateTemplates, localizer);
            this._domExplorer = domExplorer;
            this._htmlElementSource = htmlElementSource;
            this._rightPaneElement = htmlElementSource.getElementById("paneRight");
            this._bridge = bridge;
            this._stylesListElement = this.htmlElementSource.getElementById(this.listViewDivId);
            this._model = model;
            this._domExplorer.horizontalPane.addResizeListener(this);
            this._scrollContainer = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(this._stylesListElement, StyleView._cssScrollContainer);
            this._hotElement = undefined;
            this._hotElementTimeoutToken = 0;
            this._styleViewMenuController = new StyleViewMenuController(this, this.htmlElementSource.getElementById("paneRight"), this._stylesListElement);
            this.addEventHandlers();
        }
        StyleView._maxPropertyNameRows = 2;
        StyleView._maxPropertyValueRows = 5;
        StyleView._maxSelectorRows = 10;
        StyleView._attrUid = "data-uid";
        StyleView._cssItem = "BPT-Style-Item";
        StyleView._cssRule = "BPT-Style-Rule";
        StyleView._cssParentRule = "BPT-Style-ParentRule";
        StyleView._cssPropertyContainer = "BPT-Style-Property-Container";
        StyleView._cssProperty = "BPT-Style-Property";
        StyleView._cssChangeBar = "BPT-Style-ChangeBar";
        StyleView._cssSubProperty = "BPT-Style-SubProperty";
        StyleView._cssPropertyName = "BPT-Style-PropertyName";
        StyleView._cssSubPropertyName = "BPT-Style-SubPropertyName";
        StyleView._cssPropertyNameContainer = "BPT-Style-PropertyName-Container";
        StyleView._cssPropertyValue = "BPT-Style-PropertyValue";
        StyleView._cssSubPropertyValue = "BPT-Style-SubPropertyValue";
        StyleView._cssPropertyValueContainer = "BPT-Style-PropertyValue-Container";
        StyleView._cssPropertyColor = "BPT-Style-Color";
        StyleView._cssPropertyColorHidden = "BPT-Style-Color-Hidden";
        StyleView._cssPropertiesCollection = "BPT-Style-Properties";
        StyleView._cssPropertyLonghand = "BPT-Style-Property-LongHand";
        StyleView._cssExpandRuleIcon = "BPT-Style-ExpandIcon";
        StyleView._cssExpandShorthandIcon = "BPT-Style-PropertyValue-ExpandIcon";
        StyleView._cssCheckbox = "BPT-Style-Property-Checkbox";
        StyleView._cssBlockFooter = "BPT-Style-BlockFooter";
        StyleView._cssEmptyRuleSpace = "BPT-Style-EmptyRuleSpace";
        StyleView._cssInvalidProperty = "BPT-Style-InvalidProperty";
        StyleView._cssInheritedFromTarget = "BPT-Style-InheritedFromTarget";
        StyleView._cssSelector = "BPT-Style-Selector";
        StyleView._cssSelectorContainer = "BPT-Style-Selector-Container";
        StyleView._cssNotWinning = "BPT-Style-NotWinning";
        StyleView._cssNotApplied = "BPT-Style-Property-NotApplied";
        StyleView._cssFileLink = "BPT-FileLink";
        StyleView._cssScrollContainer = "BPT-DataTree-ScrollContainer";
        StyleView._cssPropertyAriaOverridden = "BPT-Style-PropertyAriaOverridden";
        StyleView._cssPropertyNameAriaInvalid = "BPT-Style-PropertyNameAriaInvalid";
        StyleView._cssPropertyValueAriaInvalid = "BPT-Style-PropertyValueAriaInvalid";
        StyleView._cssPropertyAriaChangeState = "BPT-Style-PropertyAriaChangeState";
        Object.defineProperty(StyleView.prototype, "currentSelection", {
            get: function () {
                var selection = this._model.currentSelection;
                if(!selection) {
                    var selectedElement = this.currentElementSelection;
                    if(selectedElement) {
                        selection = this.findClosestItem(selectedElement);
                        this._model.select(selection);
                    }
                }
                return selection;
            },
            set: function (selection) {
                this._model.currentSelection = selection;
                var element = this.findElementForSelection(selection);
                if(element) {
                    this.setFocus(element);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleView.prototype, "currentElementSelection", {
            get: function () {
                return this._stylesListElement.querySelector(":focus");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleView.prototype, "ruleCount", {
            get: function () {
                return this._stylesListElement.children.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleView.prototype, "isFocusWithinInlineStyle", {
            get: function () {
                var selectedElement = this.currentElementSelection;
                if(!selectedElement) {
                    return false;
                }
                var selection = this.findClosestItem(selectedElement);
                if(!selection) {
                    return false;
                }
                var rule = (selection.isRule ? selection : selection.container);
                return rule && rule.isInlined;
            },
            enumerable: true,
            configurable: true
        });
        StyleView.isRuleExpanded = function isRuleExpanded(element) {
            element = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssRule);
            return element.getAttribute("aria-expanded") === "true";
        };
        StyleView.isPropertyExpanded = function isPropertyExpanded(element) {
            element = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssProperty);
            return element.getAttribute("aria-expanded") === "true";
        };
        StyleView.prototype.onPropertyChange = function (event, property, arg) {
            switch(event) {
                case Dom.StylePropertyChangeEvent.isWinning:
                    this.onPropertyWinningRuleChange(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.isEnabled:
                    this.onPropertyEnableChange(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.isApplied:
                    this.onPropertyAppliedChange(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.status:
                    this.onPropertyStatusChange(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.uid:
                    this.onPropertyUidChange(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.name:
                    this.onPropertyNameChange(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.value:
                    this.onPropertyValueChange(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.clearSubproperties:
                    this.onPropertyClearSubproperties(property);
                    break;
                case Dom.StylePropertyChangeEvent.addSubproperty:
                    this.onPropertyAddSubproperty(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.select:
                    this.onPropertySelectChange(property);
                    break;
                case Dom.StylePropertyChangeEvent.remove:
                    this.onPropertyRemoveChange(property, arg);
                    break;
                case Dom.StylePropertyChangeEvent.change:
                    this.setPropertyChangeBar(property);
                    break;
            }
            this.checkPropertyColorUpdate(property);
        };
        StyleView.prototype.onRuleChange = function (event, rule, args) {
            switch(event) {
                case Dom.StyleRuleChangeEvent.uid:
                    this.onRuleUidChange(rule, args);
                    break;
                case Dom.StyleRuleChangeEvent.selector:
                    this.onRuleSelectorChange(rule, args);
                    break;
                case Dom.StyleRuleChangeEvent.addProperty:
                    this.onRuleAddPropertyChange(rule, args);
                    break;
                case Dom.StyleRuleChangeEvent.select:
                    this.onRuleSelectChange(rule);
                    break;
                case Dom.StyleRuleChangeEvent.change:
                    this.setRuleChangeBar(rule);
                    break;
                case Dom.StyleRuleChangeEvent.fileLinkTooltip:
                    this.setRuleFileLinkTooltipChange(rule, args);
                    break;
                case Dom.StyleRuleChangeEvent.addRule:
                    this.onRuleAddRuleChange(rule);
                    break;
                case Dom.StyleRuleChangeEvent.remove:
                    this.onRuleRemoveChange(rule);
                    break;
            }
        };
        StyleView.prototype.postViewProcessing = function () {
            var _this = this;
            _super.prototype.postViewProcessing.call(this);
            this._model.forEachRule(function (rule) {
                if(!_this._model.isExpanded(rule)) {
                    var element = _this.findElementForSelection(rule);
                    _this.toggleExpander(element, StyleView._cssRule);
                }
            });
            this._model.addUpdateListeners(this);
            this.adjustToPaneSize();
            var ruleElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(this._stylesListElement, StyleView._cssRule);
            if(ruleElement) {
                ruleElement.tabIndex = 1;
            }
            this._model.forEachRule(function (rule) {
                rule.properties.forEach(function (property) {
                    if(property.isEnabledIndeterminate) {
                        _this.onPropertyChange(Dom.StylePropertyChangeEvent.isEnabled, property, undefined);
                        _this.setPropertyChangeBar(property);
                    }
                });
            });
            if(this._htmlElementSource.querySelector(":focus") === this._rightPaneElement) {
                var selection;
                if(this._selectionBeforeRefresh) {
                    selection = this._model.getRuleById(this._selectionBeforeRefresh) || this._model.getPropertyById(this._selectionBeforeRefresh);
                    this._selectionBeforeRefresh = null;
                }
                if(!selection) {
                    selection = this._model.firstRule();
                }
                if(selection) {
                    this.currentSelection = selection.isSubProperty ? selection.container : selection;
                }
            }
            if(this._refreshCallback) {
                this._refreshCallback();
                this._refreshCallback = null;
            }
        };
        StyleView.prototype.addEventHandlers = function () {
            this.addMouseEventHandlers();
            this.addKeyboardEventHandlers();
            this.addMutationEventHandlers();
        };
        StyleView.prototype.toggleExpander = function (element, className) {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                element = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, className);
                if(element) {
                    var nowExpanded = element.getAttribute("aria-expanded") !== "true";
                    element.setAttribute("aria-expanded", nowExpanded ? "true" : "false");
                    var selection = _this.findClosestItem(element);
                    if(selection.isRule) {
                        _this.setRuleChangeBar(selection, false);
                    }
                    completed();
                } else {
                    error(new Error("Expander not found in view"));
                }
            });
        };
        StyleView.prototype.togglePropertyCheckbox = function (property) {
            return property.toggleEnable();
        };
        StyleView.prototype.refresh = function (value) {
            this._refreshCallback = value;
            this._rightPaneElement.focus();
            var selection = this.currentSelection;
            if(selection) {
                this._selectionBeforeRefresh = selection.uid;
            }
            this._domExplorer.refreshCSSView();
        };
        StyleView.prototype.revertSelection = function (selection) {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                selection.revert().then(function () {
                    if(selection.isRule && !_this._model.isExpanded(selection)) {
                        _this.toggleExpander(_this.findElementForSelection(selection), StyleView._cssRule);
                    }
                    completed();
                });
            });
        };
        StyleView.prototype.removeRuleOrProperty = function (selection, callback) {
            var element = this.findElementForSelection(selection);
            if(selection.isProperty) {
                var property = selection;
                property.commitDelete(true).then(function () {
                    if(callback) {
                        callback(true);
                    }
                });
            } else {
                var rule = selection;
                if(!rule.isInlined) {
                    rule.commitDelete().done(function () {
                        if(callback) {
                            callback(true);
                        }
                    });
                }
            }
        };
        StyleView.prototype.addProperty = function (rule, after, propertyName, useEditor) {
            if (typeof useEditor === "undefined") { useEditor = true; }
            var _this = this;
            var ruleElement = this.findElementForSelection(rule);
            var itemElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(ruleElement, StyleView._cssItem);
            if(!this._model.isExpanded(rule)) {
                this.toggleExpander(ruleElement, StyleView._cssRule);
            }
            var before = this._model.nextSelection(after, false, false);
            var property = rule.addProperty(null, false, !before || before.isRule ? null : before);
            this._model.setExpanded(property, false);
            var completeAdd = function (mode, completed) {
                var newElement = _this.insertNewPropertyIntoView(ruleElement, property);
                if(newElement) {
                    toolwindowHelpers.scrollIntoView(newElement, _this._scrollContainer);
                    if(useEditor) {
                        _this.prepareEditBox(property, mode);
                    }
                }
                completed(property);
            };
            return new Plugin.Promise(function (completed) {
                if(propertyName) {
                    property.commitName(propertyName).then(function () {
                        return completeAdd(Dom.StyleEditMode.value, completed);
                    });
                } else {
                    completeAdd(Dom.StyleEditMode.name, completed);
                }
            });
        };
        StyleView.prototype.addRule = function (selector, propertyName) {
            var _this = this;
            var defaultSelector = "";
            var selected = HtmlTreeView.getSelected($m("#tree"));
            if(selected.length > 0) {
                var header = selected.children(".BPT-HtmlTreeItem-Header");
                defaultSelector = header.find(".BPT-HTML-Attribute-Section[data-attrName='id'] .BPT-HTML-Value").text();
                if(defaultSelector) {
                    defaultSelector = "#" + defaultSelector.trim();
                } else {
                    defaultSelector = header.find(".BPT-HTML-Attribute-Section[data-attrName='class'] .BPT-HTML-Value").text();
                    if(defaultSelector) {
                        defaultSelector = "." + defaultSelector.trim().split(" ")[0];
                    } else {
                        defaultSelector = selected.attr("data-tag");
                    }
                }
            }
            var rule = this._model.createNewRule(selector || defaultSelector);
            var newElement = this.insertNewRuleIntoView(rule);
            this.adjustToPaneSize();
            toolwindowHelpers.scrollIntoView(newElement, this._scrollContainer);
            return new Plugin.Promise(function (completed, error) {
                if(selector) {
                    _this.addProperty(rule, rule, propertyName, false).then(function (property) {
                        completed(rule.properties[0]);
                    }, error);
                } else {
                    var selectorElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(newElement, StyleView._cssSelector);
                    _this._isInEditMode = true;
                    _this.editSelector(rule, function (isSuccess) {
                        if(isSuccess) {
                            completed(rule.properties[0]);
                        } else {
                            rule.commitDelete();
                            error();
                        }
                    });
                }
            });
        };
        StyleView.prototype.findClosestItem = function (element) {
            var selection;
            var selectedElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssSubProperty);
            if(selectedElement) {
                selection = this._model.getPropertyById(StyleView.getSubpropertyId(selectedElement));
            }
            if(!selection) {
                selectedElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssProperty);
                if(selectedElement) {
                    selection = this._model.getPropertyById(StyleView.getPropertyId(selectedElement));
                }
            }
            if(!selection) {
                var selectedElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssRule);
                if(selectedElement) {
                    selection = this._model.getRuleById(StyleView.getRuleId(selectedElement));
                }
            }
            if(!selection) {
                var selectedElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssItem);
                if(selectedElement) {
                    selectedElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(selectedElement, StyleView._cssRule);
                    if(selectedElement) {
                        selection = this._model.getRuleById(StyleView.getRuleId(selectedElement));
                    }
                }
            }
            return selection;
        };
        StyleView.prototype.select = function (selectedElement) {
            var selection = this.findClosestItem(selectedElement);
            if(selection) {
                this.currentSelection = selection;
                return true;
            }
            return false;
        };
        StyleView.prototype.findRuleElement = function (index) {
            if(index >= 0 && index < this._stylesListElement.children.length) {
                return this._stylesListElement.children[index];
            }
            return null;
        };
        StyleView.prototype.findPropertyElementForRule = function (ruleElement, name) {
            var nameElements = F12.DomExplorer.DomExplorerWindow.findAllDescendentsByClass(ruleElement, StyleView._cssPropertyName);
            for(var i = 0; i < nameElements.length; i++) {
                var nameElement = nameElements[i];
                if(nameElement.textContent === name) {
                    return F12.DomExplorer.DomExplorerWindow.findAncestorByClass(nameElement, StyleView._cssProperty);
                }
            }
            return null;
        };
        StyleView.prototype.findSubPropertyElementForProperty = function (ruleElement, name) {
            var nameElements = F12.DomExplorer.DomExplorerWindow.findAllDescendentsByClass(ruleElement, StyleView._cssSubPropertyName);
            for(var i = 0; i < nameElements.length; i++) {
                var nameElement = nameElements[i];
                if(nameElement.textContent === name) {
                    return F12.DomExplorer.DomExplorerWindow.findAncestorByClass(nameElement, StyleView._cssSubProperty);
                }
            }
            return null;
        };
        StyleView.prototype.setPropertyValue = function (propertyElement, value) {
            var propertyId = StyleView.getPropertyId(propertyElement);
            var property = this._model.getPropertyById(propertyId);
            return property.commitValue(value);
        };
        StyleView.prototype.setPropertyName = function (propertyElement, name) {
            var propertyId = StyleView.getPropertyId(propertyElement);
            var property = this._model.getPropertyById(propertyId);
            return property.commitName(name);
        };
        StyleView.prototype.setPropertyRevert = function (propertyElement) {
            var propertyId = StyleView.getPropertyId(propertyElement);
            var property = this._model.getPropertyById(propertyId);
            return this.revertSelection(property);
        };
        StyleView.prototype.setRuleSelector = function (ruleElement, selector) {
            var ruleId = StyleView.getRuleId(ruleElement);
            var rule = this._model.getRuleById(ruleId);
            return rule.commitSelector(selector);
        };
        StyleView.prototype.setRuleRevert = function (ruleElement) {
            var ruleId = StyleView.getRuleId(ruleElement);
            var rule = this._model.getRuleById(ruleId);
            return this.revertSelection(rule);
        };
        StyleView.isSubProperty = function isSubProperty(element) {
            return element.classList.contains(StyleView._cssSubProperty);
        };
        StyleView.isProperty = function isProperty(element) {
            return element.classList.contains(StyleView._cssProperty);
        };
        StyleView.isRule = function isRule(element) {
            return element.classList.contains(StyleView._cssRule);
        };
        StyleView.getSubpropertyId = function getSubpropertyId(element) {
            element = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssSubProperty);
            return element ? element.getAttribute(StyleView._attrUid) : null;
        };
        StyleView.getPropertyId = function getPropertyId(element) {
            element = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssProperty);
            return element.getAttribute(StyleView._attrUid);
        };
        StyleView.getRuleId = function getRuleId(element) {
            element = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssRule);
            return element.getAttribute(StyleView._attrUid);
        };
        StyleView.findAncestorRuleOrProperty = function findAncestorRuleOrProperty(element) {
            var subpropertyElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssSubProperty);
            if(subpropertyElement) {
                return subpropertyElement;
            }
            var propertyElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssProperty);
            if(propertyElement) {
                return propertyElement;
            }
            var ruleElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssRule);
            if(ruleElement) {
                return ruleElement;
            }
            return null;
        };
        StyleView.prototype.onPropertyWinningRuleChange = function (property, isWinning) {
            var propertyElement = this.findPropertyElement(property);
            if(propertyElement) {
                if(property.isStrikeThrough) {
                    propertyElement.classList.add(StyleView._cssNotWinning);
                } else {
                    propertyElement.classList.remove(StyleView._cssNotWinning);
                }
                var propertyOverriddenElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(propertyElement, StyleView._cssPropertyAriaOverridden);
                if(propertyOverriddenElement) {
                    propertyOverriddenElement.innerText = property.ariaOverriddenString;
                }
            }
        };
        StyleView.prototype.onPaneResize = function (leftWidth, rightWidth) {
            this._stylesListElement.style.maxWidth = rightWidth + "px";
        };
        StyleView.prototype.adjustToPaneSize = function () {
            var pane = this._domExplorer.horizontalPane;
            this.onPaneResize(pane.leftWidth, pane.rightWidth);
        };
        StyleView.prototype.validateHotElement = function () {
            var e = this._hotElement;
            while(e) {
                if(e === this._stylesListElement) {
                    return true;
                }
                e = e.parentNode;
            }
            if(this._hotElementTimeoutToken) {
                window.clearTimeout(this._hotElementTimeoutToken);
            }
            this._hotElement = undefined;
            return false;
        };
        StyleView.prototype.addMouseEventHandlers = function () {
            var _this = this;
            this.addHandler(this.listRoot, "mousedown", null, function (evt) {
                _this._isInEditModeOnMouseDown = _this._isInEditMode;
                if(_this._hotElementTimeoutToken) {
                    window.clearTimeout(_this._hotElementTimeoutToken);
                    _this._hotElementTimeoutToken = 0;
                }
                _this._hotElement = evt.target;
                _this._hotElementTimeoutToken = window.setTimeout(function () {
                    _this._hotElement = undefined;
                    _this._hotElementTimeoutToken = 0;
                }, 250);
                return true;
            });
            this.addHandler(this.listRoot, "click", null, function (evt) {
                _this.validateHotElement();
                var element = _this._hotElement || evt.target;
                var wasInEditMode = _this._isInEditModeOnMouseDown;
                _this._isInEditModeOnMouseDown = false;
                if(element.classList.contains(StyleView._cssInheritedFromTarget)) {
                    var uid = (evt.target).getAttribute("data-id");
                    var selector = "div.BPT-HtmlTreeItem[data-id='" + uid + "']";
                    var selectedItem = _this.htmlElementSource.querySelector(selector);
                    if(selectedItem) {
                        HtmlTreeView.select($m(selectedItem));
                    }
                    return false;
                }
                var selection = _this.findClosestItem(element);
                if(selection) {
                    if(element.classList.contains(StyleView._cssExpandRuleIcon)) {
                        _this.toggleExpander(element, StyleView._cssRule);
                        _this.currentSelection = selection;
                        return false;
                    }
                    if(element.classList.contains(StyleView._cssExpandShorthandIcon)) {
                        _this.toggleExpander(element, StyleView._cssProperty);
                        _this.currentSelection = selection;
                        return false;
                    }
                    if(element.classList.contains(StyleView._cssCheckbox) && (selection).status === Dom.StylePropertyStatus.valid) {
                        _this.togglePropertyCheckbox(selection);
                        _this.currentSelection = selection;
                        return false;
                    }
                    if(element.classList.contains(StyleView._cssPropertyName)) {
                        _this.prepareEditBox(selection, Dom.StyleEditMode.name);
                        return false;
                    }
                    if(element.classList.contains(StyleView._cssPropertyValue)) {
                        _this.prepareEditBox(selection, Dom.StyleEditMode.value);
                        return false;
                    }
                    if(element.classList.contains(StyleView._cssSubPropertyValue)) {
                        _this.editSubproperty(selection);
                        return false;
                    }
                    if(element.classList.contains(StyleView._cssPropertyValueContainer) || element.classList.contains(StyleView._cssEmptyRuleSpace) || element.classList.contains(StyleView._cssBlockFooter) || element.classList.contains(StyleView._cssSelectorContainer)) {
                        if(!wasInEditMode) {
                            if(element.classList.contains(StyleView._cssBlockFooter)) {
                                selection = _this._model.lastProperty(selection) || selection;
                            }
                            _this.prepareEditBox(selection, Dom.StyleEditMode.add);
                        }
                        return false;
                    }
                    if(element.classList.contains(StyleView._cssSelector)) {
                        if(selection.isEditable) {
                            _this.prepareEditBox(selection, Dom.StyleEditMode.selector);
                            return false;
                        }
                    }
                    if(element.classList.contains(StyleView._cssFileLink)) {
                        _this.openTargetElementFileLink(selection);
                        return false;
                    }
                    _this.currentSelection = selection;
                }
                return !selection;
            });
            this.addHandler(this.listRoot, "mouseover", [
                StyleView._cssInheritedFromTarget
            ], function (evt) {
                _this.hoverRuleTarget(evt, true);
                return true;
            });
            this.addHandler(this.listRoot, "mouseout", [
                StyleView._cssInheritedFromTarget
            ], function (evt) {
                _this.hoverRuleTarget(evt, false);
                return true;
            });
        };
        StyleView.prototype.openTargetElementFileLink = function (rule) {
            var url = rule.styleHref;
            if(!url) {
                url = rule.fileUrl;
            }
            this._model.handleFileLinkClick(url, rule.fileLine, rule.fileColumn);
        };
        StyleView.prototype.addKeyboardEventHandlers = function () {
            var _this = this;
            this.addHandler(this.listRoot, "keydown", null, function (event) {
                if(_this._isInEditMode) {
                    return true;
                }
                var selection = _this.currentSelection;
                var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
                var ctrlKey = event.ctrlKey && !event.shiftKey && !event.altKey;
                var noKeys = !event.shiftKey && !event.ctrlKey && !event.altKey;
                if(event.keyCode === Common.KeyCodes.C && ctrlKey) {
                    return !_this.copySelectionToClipboard(selection);
                }
                if(selection) {
                    if(event.keyCode === Common.KeyCodes.ArrowUp && (noKeys || shiftKey)) {
                        _this.moveSelection(_this._model.previousSelection(selection, shiftKey));
                        return false;
                    }
                    if(event.keyCode === Common.KeyCodes.ArrowDown && (noKeys || shiftKey)) {
                        _this.moveSelection(_this._model.nextSelection(selection, shiftKey));
                        return false;
                    }
                    var element = _this.findElementForSelection(selection);
                    if(event.keyCode === Common.KeyCodes.ArrowLeft && noKeys) {
                        if(!selection.isSubProperty && _this._model.isExpanded(selection)) {
                            _this.toggleExpander(element, selection.isRule ? StyleView._cssRule : StyleView._cssProperty);
                        } else {
                            _this.moveSelection(_this._model.outSelection());
                        }
                        return false;
                    }
                    if(event.keyCode === Common.KeyCodes.ArrowRight && noKeys) {
                        if(!selection.isSubProperty) {
                            if(_this._model.isExpanded(selection)) {
                                _this.moveSelection(_this._model.inSelection());
                            } else {
                                _this.toggleExpander(element, selection.isRule ? StyleView._cssRule : StyleView._cssProperty);
                            }
                        }
                        return false;
                    }
                    if(event.keyCode === Common.KeyCodes.Home && noKeys) {
                        _this.moveSelection(_this._model.firstRule());
                        return false;
                    }
                    if(event.keyCode === Common.KeyCodes.End && noKeys) {
                        _this.moveSelection(_this._model.lastRule());
                        return false;
                    }
                    if(event.keyCode === Common.KeyCodes.Delete && noKeys) {
                        if((selection.isRule || selection.isProperty) && !selection.isDeleted) {
                            _this.removeRuleOrProperty(selection);
                        }
                        return false;
                    }
                    if(selection.isProperty || selection.isSubProperty) {
                        var property = selection;
                        if(event.keyCode === Common.KeyCodes.Space && noKeys && property.status === Dom.StylePropertyStatus.valid) {
                            _this.togglePropertyCheckbox(property);
                            return false;
                        }
                        if(event.keyCode === Common.KeyCodes.Enter && noKeys) {
                            if(selection.isProperty) {
                                _this.prepareEditBox(selection, Dom.StyleEditMode.value);
                            } else {
                                _this.editSubproperty(selection);
                            }
                            return false;
                        }
                        if(event.keyCode === Common.KeyCodes.F2 && noKeys && selection.isProperty) {
                            _this.prepareEditBox(selection, Dom.StyleEditMode.name);
                            return false;
                        }
                    } else {
                        if(event.keyCode === Common.KeyCodes.Enter && noKeys) {
                            var rule = selection;
                            if(rule.isEditable) {
                                _this.prepareEditBox(selection, Dom.StyleEditMode.selector);
                                return false;
                            }
                        }
                    }
                    if(event.keyCode === Common.KeyCodes.Space && (noKeys || ctrlKey)) {
                        return false;
                    }
                }
                return true;
            });
        };
        StyleView.prototype.addMutationEventHandlers = function () {
            var _this = this;
            this.addHandler(this.listRoot, "DOMAttrModified", [
                StyleView._cssRule, 
                StyleView._cssProperty, 
                StyleView._cssSubProperty
            ], function (evt) {
                var targetElement = evt.target;
                var selection = _this.findClosestItem(targetElement);
                if(selection) {
                    if(evt.attrName === "aria-expanded") {
                        _this._model.setExpanded(selection, evt.newValue === "true");
                    }
                    if(evt.attrName === "aria-checked" && (selection.isProperty || selection.isSubProperty) && evt.newValue !== "mixed") {
                        var property = selection;
                        var isEnabled = evt.newValue === "true";
                        if(property.isEnabled !== isEnabled) {
                            _this.togglePropertyCheckbox(property);
                        }
                    }
                }
                return true;
            });
        };
        StyleView.prototype.editSubproperty = function (subproperty) {
            var ourProperty = subproperty.container;
            for(var i = subproperty.rule.properties.length - 1; i >= 0; i--) {
                var otherProperty = subproperty.rule.properties[i];
                if(otherProperty === ourProperty) {
                    break;
                }
                if(otherProperty.name === subproperty.name) {
                    this.prepareEditBox(otherProperty, Dom.StyleEditMode.value);
                    return;
                }
            }
            this.addProperty(subproperty.rule, subproperty.container, subproperty.name);
        };
        StyleView.prototype.enterEditMode = function (selection, editMode) {
            var _this = this;
            var run = function (func, isInEditMode) {
                if (typeof isInEditMode === "undefined") { isInEditMode = true; }
                _this._isInEditMode = isInEditMode;
                setTimeout(func, 0);
            };
            if(selection.isSubProperty) {
                selection = selection.container;
            }
            if(selection.isProperty && !selection.isDeleted) {
                var property = selection;
                switch(editMode) {
                    case Dom.StyleEditMode.name:
                        run(function () {
                            _this.editPropertyName(property);
                        });
                        return true;
                    case Dom.StyleEditMode.value:
                        run(function () {
                            _this.editPropertyValue(property);
                        });
                        return true;
                }
            }
            var rule = (selection.isRule ? selection : selection.container);
            if(!rule.isDeleted) {
                switch(editMode) {
                    case Dom.StyleEditMode.add:
                        run(function () {
                            _this.addProperty(rule, selection);
                        }, false);
                        return true;
                    case Dom.StyleEditMode.selector:
                        run(function () {
                            _this.editSelector(rule);
                        });
                        return true;
                }
            }
            this._isInEditMode = false;
            return false;
        };
        StyleView.prototype.moveEditBox = function (selection, wasCancelled, exitKey, previousEditMode, newPropertyToRemove) {
            var stopEditing = wasCancelled || !exitKey || exitKey.equalTo(Dom.ValueEditorKey.EnterKey);
            var moveUp = exitKey && exitKey.equalTo(Dom.ValueEditorKey.ShiftTabKey);
            var newLocation;
            if(stopEditing) {
                var newSelection = !!newPropertyToRemove ? this._model.previousSelection(selection, false, false) : selection;
                newLocation = new Dom.StyleEditLocation(newSelection, Dom.StyleEditMode.none);
            } else {
                newLocation = this._model.getNextEdit(selection, previousEditMode, !!newPropertyToRemove, moveUp);
            }
            if(newPropertyToRemove) {
                newPropertyToRemove.remove(false);
            }
            this.prepareEditBox(newLocation.selection, newLocation.editMode);
        };
        StyleView.prototype.prepareEditBox = function (selection, editMode) {
            if(!this.enterEditMode(selection, editMode)) {
                this.currentSelection = selection;
            }
        };
        StyleView.prototype.hoverRuleTarget = function (evt, show) {
            var uid = $m(evt.target).attr("data-id");
            var model = this.model;
            this._model.hoverElement(uid, show);
        };
        StyleView.prototype.findPropertyElement = function (property, subClass) {
            var selector = "." + (property.isSubProperty ? StyleView._cssSubProperty : StyleView._cssProperty) + "[data-uid='" + property.uid + "']";
            if(subClass) {
                selector += " ." + subClass;
            }
            return this._stylesListElement.querySelector(selector);
        };
        StyleView.prototype.findRuleElementById = function (uid, subClass) {
            var selector = "." + StyleView._cssRule + "[data-uid='" + uid + "']";
            if(subClass) {
                selector += " ." + subClass;
            }
            return this._stylesListElement.querySelector(selector);
        };
        StyleView.prototype.moveSelection = function (selection) {
            if(selection) {
                this.currentSelection = selection;
                return true;
            }
        };
        StyleView.prototype.onPropertyEnableChange = function (property, isEnabled) {
            var element = this.findPropertyElement(property, StyleView._cssCheckbox);
            if(element) {
                element.checked = isEnabled !== false;
                element.indeterminate = isEnabled === undefined;
                var propertyElement = element.parentElement;
                var ariaChecked = element.indeterminate ? "mixed" : ("" + isEnabled);
                propertyElement.setAttribute("aria-checked", ariaChecked);
            }
        };
        StyleView.prototype.onPropertyAppliedChange = function (property, isApplied) {
            var element = this.findPropertyElement(property);
            if(element) {
                element = element.parentElement;
                if(isApplied && element.classList.contains(StyleView._cssNotApplied)) {
                    element.classList.remove(StyleView._cssNotApplied);
                } else if(!isApplied && !element.classList.contains(StyleView._cssNotApplied)) {
                    element.classList.add(StyleView._cssNotApplied);
                }
            }
        };
        StyleView.prototype.onPropertyUidChange = function (property, newUid) {
            var element = this.findPropertyElement(property);
            if(element) {
                element.setAttribute(StyleView._attrUid, newUid);
            }
        };
        StyleView.prototype.onPropertySelectChange = function (property) {
            var container = property.container;
            if(!this._model.isExpanded(container)) {
                var containerProperty = property.isSubProperty ? this.findPropertyElement(container) : this.findRuleElementById(container.uid);
                this.toggleExpander(containerProperty, property.isSubProperty ? StyleView._cssProperty : StyleView._cssRule);
            }
            this.currentSelection = property;
        };
        StyleView.prototype.onPropertyRemoveChange = function (property, nextSelection) {
            var element = this.findPropertyElement(property);
            if(element) {
                var container = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssPropertyContainer);
                container.parentElement.removeChild(container);
            }
            if(nextSelection) {
                this.currentSelection = nextSelection;
            }
        };
        StyleView.prototype.setPropertyChangeBar = function (property) {
            var element = this.findPropertyElement(property);
            if(element) {
                var isExpanded = this._model.isExpanded(property);
                var changeBar = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element, StyleView._cssChangeBar);
                var changeState = isExpanded ? property.changeState : property.extendedChangeState;
                changeBar.setAttribute("data-change", changeState);
                var propertyChangeStateElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element, StyleView._cssPropertyAriaChangeState);
                if(propertyChangeStateElement) {
                    propertyChangeStateElement.innerText = property.ariaChangeStateString;
                }
                var removed = changeState === Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE;
                element.setAttribute("data-removed", removed);
                if(removed && !property.isSubProperty && isExpanded) {
                    this.toggleExpander(element, StyleView._cssProperty);
                }
            }
        };
        StyleView.prototype.setRuleChangeBar = function (rule, collapseOnRemove) {
            if (typeof collapseOnRemove === "undefined") { collapseOnRemove = true; }
            var element = this.findRuleElementById(rule.uid);
            if(element) {
                var isExpanded = this._model.isExpanded(rule);
                var changeBar = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element.parentElement, StyleView._cssChangeBar);
                var changeState = isExpanded ? rule.changeState : rule.extendedChangeState;
                changeBar.setAttribute("data-change", changeState);
                var styleRule = rule;
                if(styleRule) {
                    element.setAttribute("aria-label", styleRule.ariaLabel);
                }
                var removed = changeState === Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE;
                element.setAttribute("data-removed", removed);
                var sibling = element.previousElementSibling;
                if(sibling && sibling.classList.contains(StyleView._cssParentRule)) {
                    sibling.setAttribute("data-removed", removed);
                }
                if(removed && collapseOnRemove && this._model.isExpanded(rule)) {
                    this.toggleExpander(element, StyleView._cssRule);
                }
            }
        };
        StyleView.prototype.setRuleFileLinkTooltipChange = function (rule, tooltip) {
            var element = this.findRuleElementById(rule.uid, StyleView._cssFileLink);
            if(element) {
                var styleRule = rule;
                if(styleRule) {
                    element.setAttribute("data-tooltip", tooltip);
                }
            }
        };
        StyleView.prototype.onRuleUidChange = function (rule, newUid) {
            var element = this.findRuleElementById(rule.uid);
            if(element) {
                element.setAttribute(StyleView._attrUid, newUid);
            }
        };
        StyleView.prototype.onRuleSelectorChange = function (rule, selector) {
            var element = this.findRuleElementById(rule.uid, StyleView._cssSelector);
            if(element) {
                element.textContent = selector;
                element.setAttribute("data-tooltip", selector);
            }
        };
        StyleView.prototype.onRuleAddPropertyChange = function (rule, property) {
            var element = this.findRuleElementById(rule.uid);
            if(element) {
                this.insertNewPropertyIntoView(element, property);
                this._model.setExpanded(property, false);
            }
        };
        StyleView.prototype.onRuleAddRuleChange = function (rule) {
            var element = this.insertNewRuleIntoView(rule);
            this._model.setExpanded(rule, true);
        };
        StyleView.prototype.onRuleRemoveChange = function (rule) {
            var element = this.findRuleElementById(rule.uid);
            if(element) {
                var container = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssItem);
                container.parentElement.removeChild(container);
            }
        };
        StyleView.prototype.onRuleSelectChange = function (rule) {
            if(!this._model.isExpanded(rule)) {
                var element = this.findRuleElementById(rule.uid);
                this.toggleExpander(element, StyleView._cssRule);
            }
            this.currentSelection = rule;
        };
        StyleView.prototype.onPropertyStatusChange = function (property, status) {
            var element = this.findPropertyElement(property);
            if(element) {
                var nameElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element, StyleView._cssPropertyName);
                var valueElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element, StyleView._cssPropertyValue);
                var nameInvalidElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element, StyleView._cssPropertyNameAriaInvalid);
                var valueInvalidElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element, StyleView._cssPropertyValueAriaInvalid);
                nameElement && nameElement.classList.remove(StyleView._cssInvalidProperty);
                valueElement && valueElement.classList.remove(StyleView._cssInvalidProperty);
                element.setAttribute("aria-invalid", "" + (status !== Dom.StylePropertyStatus.valid));
                switch(status) {
                    case Dom.StylePropertyStatus.invalidName:
                        if(nameElement && property.isNameDisplayedAsInvalid) {
                            nameElement.classList.add(StyleView._cssInvalidProperty);
                        }
                        break;
                    case Dom.StylePropertyStatus.invalidValue:
                        valueElement && valueElement.classList.add(StyleView._cssInvalidProperty);
                        break;
                    case Dom.StylePropertyStatus.unknown:
                        nameElement && nameElement.classList.add(StyleView._cssInvalidProperty);
                        valueElement && valueElement.classList.add(StyleView._cssInvalidProperty);
                        break;
                }
                if(nameInvalidElement) {
                    nameInvalidElement.innerText = property.ariaInvalidNameString;
                }
                if(valueInvalidElement) {
                    valueInvalidElement.innerText = property.ariaInvalidValueString;
                }
            }
        };
        StyleView.prototype.onPropertyNameChange = function (property, name) {
            var element = this.findPropertyElement(property, property.isSubProperty ? StyleView._cssSubPropertyName : StyleView._cssPropertyName);
            if(element) {
                element.textContent = name;
            }
        };
        StyleView.prototype.onPropertyValueChange = function (property, value) {
            var element = this.findPropertyElement(property, property.isSubProperty ? StyleView._cssSubPropertyValue : StyleView._cssPropertyValue);
            if(element) {
                element.textContent = value;
            }
        };
        StyleView.prototype.onPropertyClearSubproperties = function (property) {
            var propertyElement = this.findPropertyElement(property);
            if(propertyElement) {
                if(!propertyElement.classList.contains(StyleView._cssPropertyLonghand)) {
                    propertyElement.classList.add(StyleView._cssPropertyLonghand);
                    propertyElement.setAttribute("aria-expanded", "false");
                    propertyElement.removeAttribute("aria-setsize");
                }
                if(this._model.isExpanded(property)) {
                    this._model.setExpanded(property, false);
                    this.toggleExpander(propertyElement, StyleView._cssProperty);
                }
                var subListElement = propertyElement.nextElementSibling;
                subListElement.innerHTML = "";
            }
            this._model.setExpanded(property, false);
        };
        StyleView.prototype.onPropertyAddSubproperty = function (property, subproperty) {
            var propertyElement = this.findPropertyElement(property);
            if(propertyElement) {
                if(propertyElement.classList.contains(StyleView._cssPropertyLonghand)) {
                    propertyElement.classList.remove(StyleView._cssPropertyLonghand);
                    propertyElement.setAttribute("aria-expanded", "false");
                }
                var subListElement = propertyElement.nextElementSibling;
                var newElement = this.instantiateTemplate("styleSubPropertyTemplate", subproperty);
                subListElement.appendChild(newElement);
                propertyElement.setAttribute("aria-setsize", property.properties.length);
            }
        };
        StyleView.prototype.checkPropertyColorUpdate = function (property) {
            var element = this.findPropertyElement(property, StyleView._cssPropertyColor);
            if(element) {
                if(property.isDisplayableColor) {
                    element.style.backgroundColor = property.colorForDisplay;
                    element.classList.remove(StyleView._cssPropertyColorHidden);
                } else {
                    element.style.backgroundColor = "";
                    element.classList.add(StyleView._cssPropertyColorHidden);
                }
            }
            if(property.isSubProperty) {
                this.checkPropertyColorUpdate(property.owner);
            }
        };
        StyleView.prototype.instantiateTemplate = function (templateId, obj) {
            var template = new T.Template({
                htmlElementSource: document,
                templateId: templateId
            });
            var newElement = this.htmlElementSource.createElement("div");
            newElement.innerHTML = template.createTemplateText(obj);
            return newElement.firstElementChild;
        };
        StyleView.prototype.editPropertyName = function (property) {
            var _this = this;
            this.currentSelection = property;
            var element = this.findElementForSelection(property, StyleView._cssPropertyName);
            if(!element) {
                return;
            }
            var colonKey = new Dom.ValueEditorKey(":", true);
            var propertyNameEditor;
            var intellisenseContext;
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_Intellisense_Start);
            var stylePropertyIntellisenseProvider = new F12.DomExplorer.StylePropertyIntellisenseProvider(this._model);
            var intellisenseMenu = new Common.Intellisense.IntellisenseMenu("intellisenseListBox", null, null, 500, true, stylePropertyIntellisenseProvider);
            intellisenseContext = new Common.Intellisense.IntellisenseContext(new Common.Intellisense.InputElementTextEditorBridge(), intellisenseMenu, stylePropertyIntellisenseProvider, this._bridge);
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_Intellisense_Stop);
            propertyNameEditor = new Dom.ValueEditor(document, this._domExplorer, this._bridge, window, StyleView._maxPropertyNameRows, intellisenseContext);
            propertyNameEditor.addExitKeys(colonKey);
            var isAddingNewProperty = property.isNew;
            propertyNameEditor.show(element, Math.max((element && element.offsetWidth || 0) + 2, 100), function (newName, oldName) {
                if(newName) {
                    property.commitName(newName);
                }
            }, function (newName, oldName, exitKey, wasCancelled) {
                property.isDeleted = !wasCancelled && !newName;
                _this.moveEditBox(property, wasCancelled, exitKey, Dom.StyleEditMode.name, property.isNew && (wasCancelled || !newName) ? property : null);
                if(!wasCancelled && !newName && !property.isNew) {
                    property.commitDelete(false).done(function () {
                        property.refreshNameDisplay();
                    });
                }
            });
        };
        StyleView.prototype.editPropertyValue = function (property) {
            var _this = this;
            this.currentSelection = property;
            var element = this.findElementForSelection(property, StyleView._cssPropertyValue);
            if(!element) {
                return;
            }
            var propertyElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssProperty);
            var provider;
            var intellisenseContext;
            var valueEditor;
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_Intellisense_Start);
            provider = new F12.DomExplorer.StylePropertyValueIntellisenseProvider(property.name, this._model.cssAndHtmlMetadataSource);
            provider.onShouldOpenOnTextChange = function (text) {
                return !text.match(/^-?\d/);
            };
            intellisenseContext = new Common.Intellisense.IntellisenseContext(new Common.Intellisense.InputElementTextEditorBridge(), new Common.Intellisense.IntellisenseMenu("intellisenseListBox", null, null, 500, true, provider), provider, this._bridge);
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_Intellisense_Stop);
            var semicolonKey = new Dom.ValueEditorKey(";");
            valueEditor = new Dom.ValueEditor(document, this._domExplorer, this._bridge, window, StyleView._maxPropertyValueRows, intellisenseContext);
            valueEditor.addExitKeys(semicolonKey);
            valueEditor.enableCommitOnChange();
            valueEditor.enableNumericChanges();
            var isAddingNewProperty = property.isNew;
            this._model.enableEditChaining();
            var isSingleEditStarted = false;
            var width = (propertyElement && propertyElement.offsetWidth || 0) - element.offsetLeft;
            var colorElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(propertyElement, StyleView._cssPropertyColor);
            var expanderElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(propertyElement, StyleView._cssExpandShorthandIcon);
            var colorStyle = window.getComputedStyle(colorElement);
            var expanderStyle = window.getComputedStyle(expanderElement);
            width += (colorElement && colorElement.offsetWidth || 0) + parseInt(colorStyle.marginLeft, 10) + parseInt(colorStyle.marginRight, 10) + (expanderElement && expanderElement.offsetWidth || 0) + parseInt(expanderStyle.marginLeft, 10) + parseInt(expanderStyle.marginRight, 10);
            element.textContent = element.textContent.trim();
            valueEditor.show(element, width, function (newValue, oldValue) {
                if(!property.isNew && !isSingleEditStarted) {
                    _this._model.startSingleEdit();
                    isSingleEditStarted = true;
                }
                property.commitValue(newValue);
            }, function (newValue, oldValue, exitKey, wasCancelled) {
                if(isSingleEditStarted) {
                    _this._model.endSingleEdit();
                }
                _this._model.disableEditChaining();
                property.refreshValueDisplay();
                _this.moveEditBox(property, wasCancelled, exitKey, Dom.StyleEditMode.value, wasCancelled && property.isNew ? property : null);
                var stopEditing = wasCancelled || !exitKey || exitKey.equalTo(Dom.ValueEditorKey.EnterKey);
                if(_this._domExplorer.documentMode < 9 && (!_this.isFocusWithinInlineStyle || stopEditing)) {
                    var selected = HtmlTreeView.getSelected($m("#tree"));
                    _this._domExplorer.refreshElementForLowDocModes(selected, false);
                }
            });
        };
        StyleView.prototype.editSelector = function (rule, completionCallback) {
            var _this = this;
            this.currentSelection = rule;
            var element = this.findElementForSelection(rule, StyleView._cssSelector);
            if(!element) {
                return;
            }
            var ruleElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(element, StyleView._cssRule);
            var editor = new Dom.ValueEditor(document, this._domExplorer, this._bridge, window, StyleView._maxSelectorRows);
            editor.addExitKeys(new Dom.ValueEditorKey("{", true), new Dom.ValueEditorKey("{"));
            editor.show(element, (ruleElement && ruleElement.offsetWidth || 0) - element.offsetLeft, function (newSelector, oldSelector) {
                if(newSelector) {
                    rule.commitSelector(newSelector);
                }
            }, function (newSelector, oldSelector, exitKey, wasCancelled) {
                var isSuccess = newSelector && !wasCancelled;
                if(!isSuccess) {
                    element.textContent = oldSelector;
                }
                if(completionCallback) {
                    completionCallback(isSuccess);
                }
                _this.moveEditBox(rule, wasCancelled, exitKey, Dom.StyleEditMode.selector);
            });
        };
        StyleView.prototype.insertNewRuleIntoView = function (rule) {
            var newElement = this.instantiateTemplate("styleRuleTemplate", rule);
            var nextRule = this._model.nextRule(rule);
            var nextRuleElement;
            if(nextRule) {
                nextRuleElement = this.findElementForSelection(nextRule);
            }
            if(nextRule && nextRuleElement) {
                this._stylesListElement.insertBefore(newElement, nextRuleElement.parentElement);
            } else {
                this._stylesListElement.appendChild(newElement);
            }
            return newElement;
        };
        StyleView.prototype.insertNewPropertyIntoView = function (ruleElement, property) {
            var newElement = this.instantiateTemplate("stylePropertyTemplate", property);
            var itemElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(ruleElement, StyleView._cssItem);
            var propertyList = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(itemElement, StyleView._cssPropertiesCollection);
            if(propertyList) {
                var nextProperty = this._model.nextProperty(property);
                var nextElement;
                if(nextProperty) {
                    nextElement = this.findElementForSelection(nextProperty).parentElement;
                } else {
                    var blockFooter = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(propertyList, StyleView._cssBlockFooter);
                    nextElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(propertyList, StyleView._cssBlockFooter);
                }
                propertyList.insertBefore(newElement, blockFooter);
                propertyList.insertBefore(newElement, nextElement);
                return newElement;
            }
        };
        StyleView.prototype.findElementForSelection = function (selection, className) {
            return this._stylesListElement.querySelector("[data-uid='" + selection.uid + "']" + (className ? " ." + className : ""));
        };
        StyleView.prototype.copySelectionToClipboard = function (selection) {
            if(toolwindowHelpers.hasSelectedText()) {
                return toolwindowHelpers.copySelectedTextToClipboard();
            }
            if(selection) {
                var text = null;
                if(selection.isProperty || selection.isSubProperty) {
                    var property = selection;
                    text = property.formatForCopy;
                } else {
                    var rule = selection;
                    text = rule.formatForCopy;
                }
                if(text) {
                    clipboardData.setData("Text", text);
                    return true;
                }
            }
            return false;
        };
        return StyleView;
    })(Common.ModelView.ListView);
    Dom.StyleView = StyleView;    
    var menuStyleViewItems;
    (function (menuStyleViewItems) {
        menuStyleViewItems._map = [];
        menuStyleViewItems.addRule = 0;
        menuStyleViewItems.addProperty = 1;
        menuStyleViewItems.remove = 3;
        menuStyleViewItems.revert = 4;
        menuStyleViewItems.copyRule = 6;
        menuStyleViewItems.copyProperty = 7;
        menuStyleViewItems.refreshStyles = 9;
        menuStyleViewItems.viewSource = 10;
    })(menuStyleViewItems || (menuStyleViewItems = {}));
    var StyleViewMenuController = (function () {
        function StyleViewMenuController(_styleView, _elementListener, _stylesListElement) {
            this._styleView = _styleView;
            this._elementListener = _elementListener;
            this._stylesListElement = _stylesListElement;
            this._menuId = "StyleViewContextMenu";
            this._menuItems = [
                {
                    id: "addRule",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString("AddRuleMenuText")
                }, 
                {
                    id: "addProperty",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString("AddPropertyMenuText")
                }, 
                {
                    id: "separator",
                    type: Plugin.ContextMenu.MenuItemType.separator
                }, 
                {
                    id: "remove",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString("RemoveStyleMenuText")
                }, 
                {
                    id: "revert",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString("RevertStyleMenuText")
                }, 
                {
                    id: "separator",
                    type: Plugin.ContextMenu.MenuItemType.separator
                }, 
                {
                    id: "copyRule",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString("CopyRuleMenuText")
                }, 
                {
                    id: "copyProperty",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString("CopyPropertyMenuText")
                }, 
                {
                    id: "separator",
                    type: Plugin.ContextMenu.MenuItemType.separator
                }, 
                {
                    id: "refreshStyles",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString("RefreshStyleMenuText")
                }, 
                {
                    id: "viewSource",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString("ViewSourceMenuText")
                }
            ];
            this.initialize();
        }
        StyleViewMenuController.prototype.initialize = function () {
            var _this = this;
            this._elementListener.addEventListener("contextmenu", function (e) {
                return _this.onContextMenu(e);
            });
            this._elementListener.addEventListener("keydown", function (e) {
                return _this.onKeydown(e);
            });
        };
        StyleViewMenuController.prototype.eventIsForThisPane = function (event) {
            if(this._stylesListElement.clientHeight) {
                var element = event.target;
                if(element === this._elementListener) {
                    return true;
                }
                do {
                    if(element === this._stylesListElement) {
                        return true;
                    }
                    element = element.parentElement;
                }while(element);
            }
            return false;
        };
        StyleViewMenuController.prototype.onKeydown = function (event) {
            if(!this.eventIsForThisPane(event)) {
                return true;
            }
            var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
            if(event.keyCode === Common.KeyCodes.F10 && shiftKey) {
                var element = this._styleView.findElementForSelection(this._styleView.currentSelection);
                var rect = element.getBoundingClientRect();
                this.showContextMenu(element, rect.left, rect.top);
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            return true;
        };
        StyleViewMenuController.prototype.onContextMenu = function (evt) {
            if(!this.eventIsForThisPane(evt)) {
                return true;
            }
            var selectedItem = null;
            var x = evt.clientX;
            var y = evt.clientY;
            if(x <= 0 || y <= 0) {
                selectedItem = this._styleView.currentElementSelection;
                if(selectedItem) {
                    var offset = selectedItem.getBoundingClientRect();
                    x = offset.left;
                    y = offset.top;
                }
            } else {
                selectedItem = this._styleView.htmlElementSource.elementFromPoint(x, y);
                if(selectedItem) {
                    this._styleView.select(selectedItem);
                }
            }
            this.showContextMenu(selectedItem, x, y);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            return false;
        };
        StyleViewMenuController.prototype.onMenuItemClicked = function (menuId, itemId, selection, rule) {
            if(menuId === this._menuId) {
                var uid;
                var textToCopy;
                switch(itemId) {
                    case this._menuItems[menuStyleViewItems.addRule].id:
                        this._styleView.addRule();
                        break;
                    case this._menuItems[menuStyleViewItems.addProperty].id:
                        this._styleView.enterEditMode(selection, Dom.StyleEditMode.add);
                        break;
                    case this._menuItems[menuStyleViewItems.remove].id:
                        this._styleView.removeRuleOrProperty(selection);
                        break;
                    case this._menuItems[menuStyleViewItems.revert].id:
                        this._styleView.revertSelection(selection);
                        break;
                    case this._menuItems[menuStyleViewItems.copyRule].id:
                        clipboardData.setData("Text", rule.formatForCopy);
                        break;
                    case this._menuItems[menuStyleViewItems.copyProperty].id:
                        var property = selection;
                        clipboardData.setData("Text", property.formatForCopy);
                        break;
                    case this._menuItems[menuStyleViewItems.refreshStyles].id:
                        this._styleView.refresh();
                        break;
                    case this._menuItems[menuStyleViewItems.viewSource].id:
                        this._styleView.openTargetElementFileLink(rule);
                        break;
                }
                this.dismiss();
            }
        };
        StyleViewMenuController.prototype.showContextMenu = function (selectedItem, x, y) {
            var _this = this;
            this.dismiss();
            var selection;
            if(selectedItem != null) {
                selection = this._styleView.findClosestItem(selectedItem);
            }
            this._selection = selection;
            this._hasSelectedItem = !!selection;
            this._hasNonDeletedSelection = this._hasSelectedItem && !selection.isDeleted;
            this._isProperty = this._hasSelectedItem && selection.isProperty;
            this._isSubProperty = this._hasSelectedItem && selection.isSubProperty;
            this._isRule = this._hasSelectedItem && selection.isRule;
            this._hasSelectedText = toolwindowHelpers.hasSelectedText();
            this._rule = this._hasSelectedItem && (this._isRule ? selection : (selection).rule);
            this._hasChanged = selection ? !!selection.extendedChangeState : false;
            if(!this._contextMenu) {
                this._menuItems[menuStyleViewItems.addRule].disabled = function () {
                    return false;
                };
                this._menuItems[menuStyleViewItems.addProperty].disabled = function () {
                    return !_this._hasSelectedItem;
                };
                this._menuItems[menuStyleViewItems.remove].disabled = function () {
                    return !(_this._hasNonDeletedSelection && (_this._isProperty || (_this._isRule && !_this._rule.isInlined)));
                };
                this._menuItems[menuStyleViewItems.revert].disabled = function () {
                    return !_this._hasChanged || (_this._rule.isDeleted && _this._isProperty) || _this._isSubProperty;
                };
                this._menuItems[menuStyleViewItems.copyRule].disabled = function () {
                    return !_this._rule || _this._rule.isDeleted;
                };
                this._menuItems[menuStyleViewItems.copyProperty].disabled = function () {
                    return !_this._hasNonDeletedSelection || !(_this._isProperty || _this._isSubProperty);
                };
                this._menuItems[menuStyleViewItems.refreshStyles].disabled = function () {
                    return false;
                };
                this._menuItems[menuStyleViewItems.viewSource].disabled = function () {
                    return !(!!(_this._rule && _this._rule.fileUrl));
                };
                this._contextMenu = Plugin.ContextMenu.create(this._menuItems, this._menuId, null, null, function (menuId, menuItem) {
                    return _this.onMenuItemClicked(menuId, menuItem.id, _this._selection, _this._rule);
                });
                this._dismissHandler = function (e) {
                    _this.dismiss();
                };
            }
            if(this._elementListener) {
                this._contextMenu.attach(this._elementListener);
            }
            this._contextMenu.addEventListener("dismiss", this._dismissHandler);
            this._contextMenu.show(parseInt(x.toFixed(0)), parseInt(y.toFixed(0)));
            toolwindowHelpers.contextMenuUp(true);
            return false;
        };
        StyleViewMenuController.prototype.dismiss = function () {
            if(this._contextMenu) {
                this._contextMenu.removeEventListener("dismiss", this._dismissHandler);
                this._contextMenu.dismiss();
                this._contextMenu.dispose();
                this._contextMenu = null;
            }
            toolwindowHelpers.contextMenuUp(false);
        };
        return StyleViewMenuController;
    })();
    Dom.StyleViewMenuController = StyleViewMenuController;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/StyleView/styleView.js.map

// breadcrumbItem.ts
var Dom;
(function (Dom) {
    var BreadcrumbItem = (function () {
        function BreadcrumbItem(_element, _uid) {
            this._element = _element;
            this._uid = _uid;
        }
        Object.defineProperty(BreadcrumbItem.prototype, "elementName", {
            get: function () {
                var tagElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(this._element, "BPT-HTML-Tag");
                if(tagElement) {
                    return HtmlTreeView.getTextContent(tagElement);
                }
                var docElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(this._element, "BPT-HTML-DocType");
                if(docElement) {
                    return "(DOCTYPE)";
                }
                var commentElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(this._element, "BPT-HTML-Comment");
                if(commentElement) {
                    return toolwindowHelpers.loadString("CommentElement");
                }
                var textElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(this._element, "BPT-HTML-Text");
                if(textElement) {
                    return toolwindowHelpers.loadString("TextElement");
                }
                if(this._element.classList.contains("BPT-HtmlTree-ChildCollection-ShowAll")) {
                    return toolwindowHelpers.loadString("ShowAll");
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BreadcrumbItem.prototype, "breadcrumbName", {
            get: function () {
                var name = this.elementName;
                if(name) {
                    if(this.id) {
                        name += "#" + this.id;
                    } else if(this.classNames) {
                        var classNames = this.classNames.trim().split(" ");
                        if(classNames.length > 0) {
                            name += "." + classNames[0];
                        }
                    }
                }
                return name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BreadcrumbItem.prototype, "selected", {
            get: function () {
                return this._element.classList.contains("BPT-HtmlTreeItem-Selected");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BreadcrumbItem.prototype, "elementUID", {
            get: function () {
                return this._uid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BreadcrumbItem.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BreadcrumbItem.prototype, "id", {
            get: function () {
                return this.getAttribute("id");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BreadcrumbItem.prototype, "classNames", {
            get: function () {
                var retStr = this.getAttribute("class");
                if(retStr) {
                    return retStr;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        BreadcrumbItem.prototype.getAttribute = function (attrName) {
            var htmlElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(this._element, "BPT-HTML");
            if(htmlElement) {
                var attrElements = F12.DomExplorer.DomExplorerWindow.findAllDescendentsByClass(htmlElement, "BPT-HTML-Attribute-Section");
                for(var i = 0; (i < attrElements.length); i++) {
                    var node = attrElements.item(i);
                    if(node.nodeType === Node.ELEMENT_NODE) {
                        var attrElement = node;
                        var attrNameElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(attrElement, "BPT-HTML-Attribute");
                        if(attrNameElement && HtmlTreeView.getTextContent(attrNameElement) === attrName) {
                            var attrValueElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(attrElement, "BPT-HTML-Value");
                            if(attrValueElement) {
                                return HtmlTreeView.getTextContent(attrValueElement);
                            }
                        }
                    }
                }
            }
            return null;
        };
        return BreadcrumbItem;
    })();
    Dom.BreadcrumbItem = BreadcrumbItem;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/breadcrumbItem.js.map

// breadcrumbsModel.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var BreadcrumbsModel = (function (_super) {
        __extends(BreadcrumbsModel, _super);
        function BreadcrumbsModel(_selectedElement) {
            var _this = this;
                _super.call(this);
            this._selectedElement = _selectedElement;
            this.skipNextLoad = false;
            this.listSource = function (callback, args) {
                if(!_this.skipNextLoad) {
                    _this.buildBreadcrumbs();
                } else {
                    _this.verifyTrail();
                }
                _this.skipNextLoad = false;
                callback(_this._breadcrumbs);
            };
        }
        Object.defineProperty(BreadcrumbsModel.prototype, "numberOfBreadcrumbs", {
            get: function () {
                return this._breadcrumbs.length;
            },
            enumerable: true,
            configurable: true
        });
        BreadcrumbsModel.prototype.findBreadcrumbByTagName = function (tagName, nodeIndex) {
            for(var i = 0; i < this.numberOfBreadcrumbs; i++) {
                var bci = this.breadcrumb(i);
                if(tagName === bci.elementName) {
                    if(nodeIndex === 0) {
                        return bci;
                    }
                    nodeIndex--;
                }
            }
            return null;
        };
        BreadcrumbsModel.prototype.findBreadcrumbByClass = function (className, nodeIndex) {
            for(var i = 0; i < this.numberOfBreadcrumbs; i++) {
                var bci = this.breadcrumb(i);
                var classNames = bci.classNames.split(" ");
                for(var j = 0; j < classNames.length; j++) {
                    if(classNames[j] === className) {
                        if(nodeIndex === 0) {
                            return bci;
                        }
                        nodeIndex--;
                    }
                }
            }
            return null;
        };
        BreadcrumbsModel.prototype.findBreadcrumbById = function (id) {
            for(var i = 0; i < this.numberOfBreadcrumbs; i++) {
                var bci = this.breadcrumb(i);
                if(id === bci.id) {
                    return bci;
                }
            }
            return null;
        };
        BreadcrumbsModel.prototype.breadcrumb = function (index) {
            return this._breadcrumbs[index];
        };
        BreadcrumbsModel.prototype.clearSelection = function () {
            this._selectedElement = undefined;
        };
        BreadcrumbsModel.prototype.setSelectedElement = function (element) {
            var elementUid = (element.get(0)).getAttribute("data-id");
            for(var i = 0; i < this._breadcrumbs.length; i++) {
                if(this._breadcrumbs[i].elementUID === elementUid) {
                    this.skipNextLoad = true;
                }
            }
            if(element.get(0) instanceof HTMLElement) {
                this._selectedElement = element.get(0);
            }
        };
        BreadcrumbsModel.prototype.findPreviousBreadcrumb = function (uid) {
            for(var i = 0; i < this.numberOfBreadcrumbs; i++) {
                var bc = this._breadcrumbs[i];
                if(bc.elementUID === uid) {
                    if(i > 0) {
                        return this._breadcrumbs[i - 1];
                    }
                    return null;
                }
            }
            return null;
        };
        BreadcrumbsModel.prototype.findNextBreadcrumb = function (uid) {
            for(var i = 0; i < this.numberOfBreadcrumbs; i++) {
                var bc = this._breadcrumbs[i];
                if(bc.elementUID === uid) {
                    if(i < this.numberOfBreadcrumbs - 1) {
                        return this._breadcrumbs[i + 1];
                    }
                    return null;
                }
            }
            return null;
        };
        BreadcrumbsModel.prototype.verifyTrail = function () {
            var bcIndex = this.numberOfBreadcrumbs - 1;
            while(bcIndex >= 0) {
                var bc = this.breadcrumb(bcIndex);
                var uid = bc.elementUID;
                var elementInTree = $m("#tree").find(".BPT-HtmlTreeItem[data-id='" + uid + "']");
                if(elementInTree.length === 0) {
                    this._breadcrumbs.splice(bcIndex, this.numberOfBreadcrumbs - bcIndex);
                }
                bcIndex--;
                if(bcIndex >= this.numberOfBreadcrumbs) {
                    bcIndex = this.numberOfBreadcrumbs - 1;
                }
            }
        };
        BreadcrumbsModel.prototype.buildBreadcrumbs = function () {
            this._breadcrumbs = [];
            var currentElement = this._selectedElement;
            while(currentElement && currentElement instanceof HTMLElement) {
                if(!currentElement.classList.contains("BPT-HtmlTreeItem-HiddenRoot")) {
                    var bc = new Dom.BreadcrumbItem(currentElement, currentElement.getAttribute("data-id"));
                    this._breadcrumbs.unshift(bc);
                }
                currentElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(currentElement.parentElement, "BPT-HtmlTreeItem");
            }
            this.newBreadcrumbs = true;
            return this._breadcrumbs;
        };
        return BreadcrumbsModel;
    })(Common.ModelView.ListModel);
    Dom.BreadcrumbsModel = BreadcrumbsModel;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/breadcrumbsModel.js.map

// breadcrumbsView.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var BreadcrumbsView = (function (_super) {
        __extends(BreadcrumbsView, _super);
        function BreadcrumbsView(_domExplorerWindow, model, _htmlElementSource, BreadcrumbsViewDivId, defaultItemTemplateId, alternateTemplates) {
                _super.call(this, _htmlElementSource, BreadcrumbsViewDivId, defaultItemTemplateId, model, alternateTemplates);
            this._domExplorerWindow = _domExplorerWindow;
            this.model = model;
            this._htmlElementSource = _htmlElementSource;
            this._forceSelectedIntoView = true;
            this._grabKeyFocus = false;
            this._disableKeyBoardTooltip = false;
            this._listElement = this._htmlElementSource.getElementById(this.listViewDivId);
            this._tooltipTemplate = new T.Template({
                htmlElementSource: this._htmlElementSource,
                templateId: "breadcrumbTooltip"
            });
            this.init();
            _domExplorerWindow.horizontalPane.addResizeListener(this);
            this.setWidth(_domExplorerWindow.horizontalPane.leftWidth);
            this.addEventHandlers();
            this.updateView();
        }
        BreadcrumbsView.ARROW_WIDTH = 16;
        BreadcrumbsView.prototype.updateView = function () {
            if(!this._grabKeyFocus && document.activeElement && !toolwindowHelpers.isContextMenuUp() && (F12.DomExplorer.DomExplorerWindow.findAncestorByClass(document.activeElement, "BPT-HorizontalPane-BreadcrumbBar") != null)) {
                this._grabKeyFocus = true;
            }
            if(!this._breadcrumbModel) {
                this._breadcrumbModel = this.model;
            }
            _super.prototype.updateView.call(this);
        };
        BreadcrumbsView.prototype.skipNextLoad = function () {
            this._breadcrumbModel.skipNextLoad = true;
        };
        BreadcrumbsView.prototype.preViewProcessing = function () {
            $m("#BreadcrumbsView").show();
        };
        BreadcrumbsView.prototype.checkToPullDownTooltip = function () {
            var _this = this;
            window.setTimeout(function () {
                if(document.activeElement && (F12.DomExplorer.DomExplorerWindow.findAncestorByClass(document.activeElement, "BPT-HorizontalPane-BreadcrumbBar") == null)) {
                    _this.closeTooltip();
                }
            }, 0);
        };
        BreadcrumbsView.prototype.postViewProcessing = function () {
            var _this = this;
            _super.prototype.postViewProcessing.call(this);
            this._disableKeyBoardTooltip = false;
            if(((this._firstBreadcrumbToShow === undefined) && (this._lastBreadcrumbToShow === undefined)) || this._breadcrumbModel.newBreadcrumbs) {
                this._firstBreadcrumbToShow = 0;
                this._lastBreadcrumbToShow = undefined;
                this._breadcrumbModel.newBreadcrumbs = false;
            } else {
                if(this._lastBreadcrumbToShow && this._lastBreadcrumbToShow >= this._breadcrumbModel.numberOfBreadcrumbs) {
                    this._lastBreadcrumbToShow = this._breadcrumbModel.numberOfBreadcrumbs - 1;
                }
                if(this._firstBreadcrumbToShow && this._firstBreadcrumbToShow >= this._breadcrumbModel.numberOfBreadcrumbs) {
                    this._firstBreadcrumbToShow = 0;
                    this._lastBreadcrumbToShow = undefined;
                    this._breadcrumbModel.newBreadcrumbs = false;
                }
            }
            var bar = $m(".BPT-HorizontalPane-BreadcrumbBar");
            var breadcrumbElements = bar.find(".BPT-Breadcrumb, .BPT-Breadcrumb-Selected");
            var chevronElements = bar.find(".BPT-HorizontalPane-BreadcrumbChevron");
            var positoningLastElement = (this._lastBreadcrumbToShow === undefined);
            var selectedIndex;
            do {
                var doItAgain = false;
                var selectedIndex = this.calculateFirstOrLastElementToDisplay(bar, breadcrumbElements);
                if(this._forceSelectedIntoView && ((selectedIndex < this._firstBreadcrumbToShow) || (selectedIndex > this._lastBreadcrumbToShow))) {
                    doItAgain = true;
                    if(positoningLastElement) {
                        if(selectedIndex < this._firstBreadcrumbToShow) {
                            this._firstBreadcrumbToShow--;
                        } else {
                            this._firstBreadcrumbToShow++;
                        }
                        this._lastBreadcrumbToShow = undefined;
                    } else {
                        if(selectedIndex > this._lastBreadcrumbToShow) {
                            this._lastBreadcrumbToShow++;
                        } else {
                            this._lastBreadcrumbToShow--;
                        }
                        this._firstBreadcrumbToShow = undefined;
                    }
                } else if((this._firstBreadcrumbToShow !== 0) || (this._lastBreadcrumbToShow !== this._breadcrumbModel.numberOfBreadcrumbs - 1)) {
                    if(!positoningLastElement && this._firstBreadcrumbToShow === 0) {
                        doItAgain = true;
                        positoningLastElement = true;
                        this._lastBreadcrumbToShow = undefined;
                    } else if(positoningLastElement && this._lastBreadcrumbToShow === this._breadcrumbModel.numberOfBreadcrumbs - 1) {
                        doItAgain = true;
                        positoningLastElement = false;
                        this._firstBreadcrumbToShow = undefined;
                    }
                }
            }while(doItAgain);
            for(var i = 0; i < this._breadcrumbModel.numberOfBreadcrumbs; i++) {
                if(i == selectedIndex) {
                    this._selectedElement = $m(breadcrumbElements.get(i)).get(0);
                }
                if(i >= this._firstBreadcrumbToShow && i <= this._lastBreadcrumbToShow) {
                    $m(breadcrumbElements.get(i)).show();
                    $m(chevronElements.get(i)).show();
                    var parentElement = breadcrumbElements.get(i).parentNode;
                    parentElement.setAttribute("bcIndex", i);
                    var self = this;
                    parentElement.onmouseenter = function (ev) {
                        if(toolwindowHelpers.isContextMenuUp()) {
                            return;
                        }
                        var element = ev.target;
                        var span = element.children[0];
                        var svg = element.children[1];
                        var path = svg.querySelector("path");
                        var uid = span.getAttribute("bc-data-uid");
                        _this._domExplorerWindow.temporaryShowElementHighlight(uid);
                        element["savebackgroundColor"] = path.className.baseVal;
                        span.classList.add("BPT-Breadcrumb-Hover");
                        path.className.baseVal = "BPT-BreadcrumbChevron-Hover";
                        if(!_this._tooltipComingId) {
                            _this.closeTooltip();
                            _this.showTooltipOnBreadcrumb(false, element);
                        }
                        _this._disableKeyBoardTooltip = true;
                    };
                    parentElement.onmouseleave = function (ev) {
                        var element = ev.target;
                        var span = element.children[0];
                        var svg = element.children[1];
                        var path = svg.querySelector("path");
                        _this._domExplorerWindow.restoreElementHighlight();
                        _this.closeTooltip();
                        if(element["savebackgroundColor"] !== undefined) {
                            _this._disableKeyBoardTooltip = false;
                            span.classList.remove("BPT-Breadcrumb-Hover");
                            path.className.baseVal = element["savebackgroundColor"];
                            element["savebackgroundColor"] = undefined;
                        }
                    };
                } else {
                    $m(breadcrumbElements.get(i)).hide();
                    $m(chevronElements.get(i)).hide();
                }
            }
            if(this._firstBreadcrumbToShow > 0) {
                $m("#breadcrumbLeftArrow").show();
            } else {
                $m("#breadcrumbLeftArrow").hide();
            }
            if(this._lastBreadcrumbToShow < this._breadcrumbModel.numberOfBreadcrumbs - 1) {
                $m("#breadcrumbRightArrow").show();
            } else {
                $m("#breadcrumbRightArrow").hide();
            }
            if(this._grabKeyFocus) {
                var selectedElement = bar.find(".BPT-Breadcrumb-Selected");
                if(selectedElement) {
                    selectedElement.focus();
                }
                this._grabKeyFocus = false;
                if(!this._disableKeyBoardTooltip) {
                    this.showTooltipOnBreadcrumb(true);
                }
            }
            this._forceSelectedIntoView = true;
        };
        BreadcrumbsView.prototype.selectBreadcrumbNodeByTagName = function (tagName, nodeIndex) {
            if(!nodeIndex) {
                nodeIndex = 0;
            }
            var bci = this._breadcrumbModel.findBreadcrumbByTagName(tagName, nodeIndex);
            this.selectElementByUid(bci.elementUID);
        };
        BreadcrumbsView.prototype.selectBreadcrumbNodeByClass = function (className, nodeIndex) {
            if(!nodeIndex) {
                nodeIndex = 0;
            }
            var bci = this._breadcrumbModel.findBreadcrumbByClass(className, nodeIndex);
            this.selectElementByUid(bci.elementUID);
        };
        BreadcrumbsView.prototype.selectBreadcrumbNodeById = function (id) {
            var bci = this._breadcrumbModel.findBreadcrumbById(id);
            this.selectElementByUid(bci.elementUID);
        };
        BreadcrumbsView.prototype.showTooltipOnBreadcrumb = function (focus, elementOverWhichToDisplay) {
            if(!elementOverWhichToDisplay) {
                var bar = $m(".BPT-HorizontalPane-BreadcrumbBar");
                var selectedElement = bar.find(".BPT-Breadcrumb-Selected").get(0);
                if(!selectedElement) {
                    return;
                }
                var element = selectedElement.parentNode;
                var spanRect = selectedElement.getBoundingClientRect();
                var imgRect = selectedElement.nextElementSibling.getBoundingClientRect();
            } else {
                var spanRect = elementOverWhichToDisplay.children[0].getBoundingClientRect();
                var imgRect = elementOverWhichToDisplay.children[1].getBoundingClientRect();
                var element = elementOverWhichToDisplay;
            }
            var displayRect = spanRect;
            var width = displayRect.width;
            var left = displayRect.left;
            var rightArrow = $m("#breadcrumbLeftArrow").get(0);
            if(rightArrow.style.display !== "none") {
                var rightArrowRect = rightArrow.getBoundingClientRect();
                left -= rightArrowRect.width;
            }
            this.popupTooltip(element, left + width / 2, displayRect.top + displayRect.height / 2, false, focus);
        };
        BreadcrumbsView.prototype.addEventHandlers = function () {
            var _this = this;
            this.addHandler(this._listElement, "click", [
                "BPT-Breadcrumb", 
                "BPT-Breadcrumb-Selected"
            ], function (evt) {
                _this.takeDownContextMenu();
                _this._grabKeyFocus = true;
                var element = evt.target;
                _this.selectBreadcrumb(element);
                _this.updateView();
            });
            this._htmlElementSource.addEventListener("mousedown", function (evt) {
                _this.checkToPullDownTooltip();
            });
        };
        BreadcrumbsView.prototype.lastKey = function (key) {
            this._lastKey = key;
        };
        BreadcrumbsView.prototype.onPaneResize = function (leftWidth, rightWidth) {
            this.setWidth(leftWidth);
            this.skipNextLoad();
            this.updateView();
        };
        BreadcrumbsView.prototype.setWidth = function (width) {
            $m("#BreadcrumbsView").parent(".BPT-HorizontalPane-BreadcrumbBar").css("width", width + "px");
        };
        BreadcrumbsView.prototype.calculateFirstOrLastElementToDisplay = function (bar, breadcrumbElements) {
            var _this = this;
            var barRect = (bar.get(0)).getBoundingClientRect();
            var spaceLeft = barRect.width - BreadcrumbsView.ARROW_WIDTH * 2 - 40;
            var selectedIndex = -1;
            if(this._lastBreadcrumbToShow === undefined) {
                breadcrumbElements.each(function (index, element) {
                    if(element.getAttribute("class").indexOf("BPT-Breadcrumb-Selected") >= 0) {
                        selectedIndex = index;
                    }
                    if(index >= _this._firstBreadcrumbToShow && (spaceLeft > 0)) {
                        var elementRect = element.getBoundingClientRect();
                        if(spaceLeft > elementRect.width) {
                            spaceLeft -= elementRect.width;
                            _this._lastBreadcrumbToShow = index;
                        } else {
                            spaceLeft = 0;
                        }
                    }
                });
            } else {
                var indexArray = [];
                breadcrumbElements.each(function (index, element) {
                    if(element.getAttribute("class").indexOf("BPT-Breadcrumb-Selected") >= 0) {
                        selectedIndex = index;
                    }
                    indexArray[index] = element;
                });
                for(var index = indexArray.length - 1; (index >= 0) && (spaceLeft > 0); index--) {
                    if(index <= this._lastBreadcrumbToShow) {
                        var element = indexArray[index];
                        var elementRect = element.getBoundingClientRect();
                        if(spaceLeft > elementRect.width) {
                            spaceLeft -= elementRect.width;
                            this._firstBreadcrumbToShow = index;
                        } else {
                            spaceLeft = 0;
                        }
                    }
                }
            }
            return selectedIndex;
        };
        BreadcrumbsView.prototype.selectBreadcrumb = function (element) {
            this._selectedElement = element;
            var uid = element.getAttribute("bc-data-uid");
            this.selectElementByUid(uid);
        };
        BreadcrumbsView.prototype.selectElementByUid = function (uid) {
            var elementInTree = $m("#tree").find(".BPT-HtmlTreeItem[data-id='" + uid + "']");
            this.skipNextLoad();
            HtmlTreeView.select(elementInTree);
            var scrollContainer = elementInTree.closest(".BPT-HtmlTree-ScrollContainer").get(0);
            var elementHeader = elementInTree.find(".BPT-HtmlTreeItem-Header");
            toolwindowHelpers.scrollIntoView(elementHeader.get(0), scrollContainer);
        };
        BreadcrumbsView.prototype.takeDownContextMenu = function () {
            this._domExplorerWindow.takeDownContextMenu();
        };
        BreadcrumbsView.prototype.popupTooltip = function (element, x, y, now, focus) {
            var _this = this;
            if(toolwindowHelpers.isContextMenuUp()) {
                return;
            }
            if(!now) {
                if(this._tooltipComingId) {
                    window.clearTimeout(this._tooltipComingId);
                }
                this._tooltipComingId = window.setTimeout(function () {
                    _this._tooltipComingId = null;
                    _this.popupTooltip(element, x, y, true, focus);
                }, 500);
                return;
            }
            var bcRect = element.getBoundingClientRect();
            var bcIndex = element.getAttribute("bcIndex");
            if(bcIndex) {
                var index = parseInt(bcIndex);
                var obj = this._breadcrumbModel.breadcrumb(index);
                this._tooltip = this._tooltipTemplate.createTemplateElement(obj);
                $m("#BreadcrumbsView").get(0).appendChild(this._tooltip);
                var ttRect = this._tooltip.getBoundingClientRect();
                $m("#BreadcrumbsView").get(0).removeChild(this._tooltip);
                this._tooltip.style.left = Math.max(1, x - (ttRect.width / 2)) + "px";
                this._tooltip.style.top = (0 - (ttRect.height + 2)) + "px";
                this._tooltipConfig = {
                    content: this._tooltip.innerHTML,
                    contentContainsHTML: true,
                    x: Math.max(1, bcRect.left + bcRect.width / 2 - (ttRect.width / 2)),
                    y: bcRect.top - (ttRect.height + 9)
                };
                Plugin.Tooltip.show(this._tooltipConfig);
                var bar = $m(".BPT-HorizontalPane-BreadcrumbBar");
                var selectedElement = bar.find(".BPT-Breadcrumb-Selected");
                if(selectedElement && focus) {
                    selectedElement.focus();
                }
            }
            this._tooltipComingId = undefined;
        };
        BreadcrumbsView.prototype.isActiveElementInBreadcrumb = function (bar) {
            var element = document.activeElement;
            if(!element) {
                return false;
            }
            var barElement = bar.get(0);
            while(element.parentNode) {
                if(element === barElement) {
                    return true;
                }
                element = element.parentNode;
            }
            return false;
        };
        BreadcrumbsView.prototype.closeTooltip = function () {
            if(this._tooltipComingId) {
                window.clearTimeout(this._tooltipComingId);
                this._tooltipComingId = undefined;
                return;
            }
            if(this._tooltipConfig) {
                var bar = $m(".BPT-HorizontalPane-BreadcrumbBar");
                var doFocus = this.isActiveElementInBreadcrumb(bar);
                Plugin.Tooltip.dismiss(true);
                var selectedElement = bar.find(".BPT-Breadcrumb-Selected");
                if(selectedElement && doFocus) {
                    selectedElement.focus();
                }
            }
        };
        BreadcrumbsView.prototype.handleKeyPress = function (event) {
            if(event.ctrlKey || event.shiftKey || event.altKey) {
                return true;
            }
            var selected = $m(".BPT-Breadcrumb-Selected");
            var uid = selected.attr("bc-data-uid");
            var keyEvent = event;
            this.lastKey(keyEvent.keyCode);
            switch(keyEvent.keyCode) {
                case Common.KeyCodes.ArrowLeft:
                case Common.KeyCodes.ArrowUp:
                    var bc = this._breadcrumbModel.findPreviousBreadcrumb(uid);
                    if(bc) {
                        this.closeTooltip();
                        var selectUid = bc.elementUID;
                        this.selectElementByUid(selectUid);
                        this._grabKeyFocus = true;
                        this.updateView();
                    }
                    return false;
                    break;
                case Common.KeyCodes.ArrowRight:
                case Common.KeyCodes.ArrowDown:
                    var bc = this._breadcrumbModel.findNextBreadcrumb(uid);
                    if(bc) {
                        this.closeTooltip();
                        var selectUid = bc.elementUID;
                        this.selectElementByUid(selectUid);
                        this._grabKeyFocus = true;
                        this.updateView();
                    }
                    return false;
                    break;
                case Common.KeyCodes.PageDown:
                    this.shiftPage(true);
                    return false;
                    break;
                case Common.KeyCodes.PageUp:
                    this.shiftPage(false);
                    return false;
                    break;
                case Common.KeyCodes.Escape:
                    this.closeTooltip();
                    return false;
                case Common.KeyCodes.Tab:
                    this.closeTooltip();
                    return true;
            }
            return true;
        };
        BreadcrumbsView.prototype.init = function () {
            var _this = this;
            var bar = $m(".BPT-HorizontalPane-BreadcrumbBar");
            bar.bind("contextmenu", function (ev) {
                _this.takeDownContextMenu();
                _this.closeTooltip();
                var element = ev.target;
                var x = ev.clientX;
                var y = ev.clientY;
                if((x <= 0) || (y <= 0) || (_this._lastKey == Common.KeyCodes.ContextMenu)) {
                    if(_this._lastKey != Common.KeyCodes.ContextMenu) {
                        _this.selectBreadcrumb(element);
                    }
                    _this._lastKey = undefined;
                    var offset = (_this._selectedElement).getBoundingClientRect();
                    x = offset.left;
                    y = offset.top;
                    element = _this._selectedElement;
                } else {
                    _this.selectBreadcrumb(element);
                }
                var uid = element.getAttribute("bc-data-uid");
                var elementInTree = $m("#tree").find(".BPT-HtmlTreeItem[data-id='" + uid + "']");
                _this._grabKeyFocus = false;
                window.setTimeout(function () {
                    bar.focus();
                    _this._domExplorerWindow.htmlContextMenu(elementInTree, x, y);
                    _this.skipNextLoad();
                    _this.updateView();
                }, 1);
            });
            bar.bind("keydown", function (event) {
                _this.takeDownContextMenu();
                if(!(_this.handleKeyPress(event))) {
                    event.preventDefault();
                    return false;
                }
                return true;
            }, true);
            $m(".BPT-HorizontalPane-BreadcrumbBar-Arrow").bind("click", function (evt) {
                var element = evt.target;
                _this.shiftPage((element.getAttribute("id") === "breadcrumbRightArrow"));
                return false;
            });
        };
        BreadcrumbsView.prototype.shiftPage = function (right) {
            this.takeDownContextMenu();
            if(right) {
                if(this._lastBreadcrumbToShow < this._breadcrumbModel.numberOfBreadcrumbs - 1) {
                    this._lastBreadcrumbToShow++;
                    this._firstBreadcrumbToShow = undefined;
                } else {
                    return;
                }
            } else {
                if(this._firstBreadcrumbToShow > 0) {
                    this._firstBreadcrumbToShow--;
                    this._lastBreadcrumbToShow = undefined;
                } else {
                    return;
                }
            }
            this.skipNextLoad();
            this._forceSelectedIntoView = false;
            this._grabKeyFocus = true;
            this.updateView();
        };
        return BreadcrumbsView;
    })(Common.ModelView.ListView);
    Dom.BreadcrumbsView = BreadcrumbsView;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/breadcrumbsView.js.map

// winningStyleModel.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    (function (Wsp) {
        var Source = (function () {
            function Source(selector, value, fileUrl, fileLine, fileColumn, fileLinkText, tooltip, isWinning, isImportant, isEnabled, status, isColor, propertyId) {
                this.selector = selector;
                this.value = value;
                this.fileUrl = fileUrl;
                this.fileLine = fileLine;
                this.fileColumn = fileColumn;
                this.fileLinkText = fileLinkText;
                this.tooltip = tooltip;
                this.isWinning = isWinning;
                this.isImportant = isImportant;
                this.isEnabled = isEnabled;
                this.status = status;
                this.isColor = isColor;
                this.propertyId = propertyId;
            }
            Object.defineProperty(Source.prototype, "isWinningAndEnabled", {
                get: function () {
                    return this.isWinning && this.isEnabled;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "valueForDisplay", {
                get: function () {
                    var value = this.valueWithPriority;
                    return value.length ? value : "\u2003";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "valueWithPriority", {
                get: function () {
                    return this.value + (this.isImportant ? " !important" : "");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "isDisplayableColor", {
                get: function () {
                    return this.isValid && this.isColor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "isValid", {
                get: function () {
                    return this.status === Dom.StylePropertyStatus.valid;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "isInvalid", {
                get: function () {
                    return this.status !== Dom.StylePropertyStatus.valid;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Source.prototype, "arialInvalidString", {
                get: function () {
                    return this.isValid ? "" : Dom.StyleProperty._ariaInvalidString;
                },
                enumerable: true,
                configurable: true
            });
            return Source;
        })();
        Wsp.Source = Source;        
        var Style = (function () {
            function Style(_model, propertyName, propertyValue) {
                this._model = _model;
                this.propertyName = propertyName;
                this.propertyValue = propertyValue;
                this.sources = [];
                this.enabledCount = 0;
            }
            Style.prototype.isColor = function () {
                return this.propertyName.indexOf("color") > -1 ? true : false;
            };
            Style.prototype.hasChildren = function () {
                return !!this.sources && this.sources.length > 0;
            };
            Style.prototype.addSource = function (source) {
                this.sources.unshift(source);
                if(source.isEnabled) {
                    this.enabledCount++;
                }
            };
            Object.defineProperty(Style.prototype, "children", {
                get: function () {
                    return this.sources;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Style.prototype, "uniqueId", {
                get: function () {
                    return "Dom_Wsp_Style" + this.propertyName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Style.prototype, "expanded", {
                get: function () {
                    return this._model.isExpanded(this.uniqueId);
                },
                set: function (expanded) {
                    this._model.setExpansionState(this.uniqueId, expanded);
                },
                enumerable: true,
                configurable: true
            });
            Style.prototype.equals = function (other) {
                if(!other) {
                    return false;
                }
                if(this.propertyName !== other.propertyName || this.propertyValue !== other.propertyValue || this.sources.length !== other.sources.length) {
                    return false;
                }
                for(var i = 0; i < this.sources.length; i++) {
                    if(this.sources[i].selector !== other.sources[i].selector || this.sources[i].value !== other.sources[i].value || this.sources[i].isWinning !== other.sources[i].isWinning || this.sources[i].fileLinkText !== other.sources[i].fileLinkText || this.sources[i].fileUrl !== other.sources[i].fileUrl) {
                        return false;
                    }
                }
                return true;
            };
            Object.defineProperty(Style.prototype, "isEnabled", {
                get: function () {
                    return this.enabledCount > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Style.prototype, "isEnabledIndeterminate", {
                get: function () {
                    return 0 < this.enabledCount && this.enabledCount < this.sources.length;
                },
                enumerable: true,
                configurable: true
            });
            Style.prototype.recalculateEnabledCount = function () {
                var count = 0;
                for(var i = 0; i < this.sources.length; i++) {
                    if(this.sources[i].isEnabled) {
                        count++;
                    }
                }
                this.enabledCount = count;
            };
            return Style;
        })();
        Wsp.Style = Style;        
        var Model = (function (_super) {
            __extends(Model, _super);
            function Model(_bridge, styleCache, createShortenedUrlText) {
                var _this = this;
                        _super.call(this);
                this._bridge = _bridge;
                this._getStyleResults = {
                };
                this._listenerArray = [];
                this._showAllStyles = false;
                this._styleList = [];
                this.allStylesChanged = new Common.EventSource();
                this.listSource = function (callback, args) {
                    styleCache.updateView(args[0], function (elementStyleModel) {
                        _this._elementStyleModel = elementStyleModel;
                        _this._getStyleRuleResults = elementStyleModel.rules;
                        _this._elementStyleModel.addUpdateListener(_this);
                    });
                    _this._bridge.channel.call(_this._bridge.engine, "getComputedStyles", args, function (stylesResultArray) {
                        if(!stylesResultArray) {
                            return;
                        }
                        _this._getStyleResults = stylesResultArray[0];
                        _this._styleList = _this.determineWinningStyles(_this._getStyleResults, _this._getStyleRuleResults);
                        callback(_this._styleList);
                    });
                };
                this._uniqueIdsOfExpandedStyles = {
                };
                this._createShortenedUrlText = function (s) {
                    if(!s) {
                        return undefined;
                    }
                    var shortened = createShortenedUrlText(s);
                    return shortened.replace(/\\"/g, "\"");
                };
            }
            Model.prototype.clearModel = function () {
                this._getStyleResults = {
                };
                this._getStyleRuleResults = [];
                this._styleList = [];
                this.cache = this._styleList;
            };
            Model.prototype.isExpanded = function (uniqueId) {
                return this._uniqueIdsOfExpandedStyles[uniqueId] === true;
            };
            Model.prototype.setExpansionState = function (uniqueId, expanded) {
                if(this.isExpanded(uniqueId) === expanded) {
                    return;
                }
                if(expanded) {
                    this._uniqueIdsOfExpandedStyles[uniqueId] = true;
                } else {
                    delete this._uniqueIdsOfExpandedStyles[uniqueId];
                }
            };
            Object.defineProperty(Model.prototype, "showAllStyles", {
                get: function () {
                    return this._showAllStyles;
                },
                set: function (value) {
                    if(this._showAllStyles !== value) {
                        this._showAllStyles = value;
                        if(this._getStyleResults && this._getStyleRuleResults) {
                            this._styleList = this.determineWinningStyles(this._getStyleResults, this._getStyleRuleResults);
                            this.cache = this._styleList;
                        }
                        this.allStylesChanged.invoke(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Model.prototype, "nameFilter", {
                get: function () {
                    return this._nameFilter;
                },
                set: function (value) {
                    if(this._nameFilter !== value) {
                        this._nameFilter = value;
                        if(this._getStyleResults && this._getStyleRuleResults) {
                            this._styleList = this.determineWinningStyles(this._getStyleResults, this._getStyleRuleResults);
                            this.cache = this._styleList;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Model.prototype.determineWinningStyles = function (getStyleResults, getStyleRuleResults) {
                var styleList = [];
                var propertyName;
                var styleGroups = {
                };
                var propertyNames = [];
                var addProperty = function (property) {
                    if(!property.isDeleted && property.isApplied && property.isValidName) {
                        if(!styleGroups[property.name]) {
                            styleGroups[property.name] = [];
                            propertyNames.push(property.name);
                        }
                        styleGroups[property.name].unshift(property);
                    }
                };
                for(var i = 0; i < getStyleRuleResults.length; i++) {
                    var rule = getStyleRuleResults[i];
                    for(var j = rule.properties.length - 1; j >= 0; j--) {
                        var property = rule.properties[j];
                        if(property.isShorthand) {
                            property.properties.forEach(addProperty);
                        } else {
                            addProperty(property);
                        }
                    }
                }
                if(this.showAllStyles) {
                    propertyNames = [];
                    for(propertyName in getStyleResults) {
                        if(getStyleResults.hasOwnProperty(propertyName)) {
                            propertyNames.push(propertyName);
                        }
                    }
                }
                propertyNames = this.applyPropertyNameFilter(propertyNames);
                propertyNames.sort();
                for(i = 0; i < propertyNames.length; i++) {
                    propertyName = propertyNames[i];
                    var styleGroup = styleGroups[propertyName];
                    var style = new Style(this, propertyName, getStyleResults[propertyName]);
                    if(styleGroup) {
                        for(var j = 0; j < styleGroup.length; j++) {
                            var styleGroupItem = styleGroup[j];
                            var source = new Source(styleGroupItem.rule.selectorText, styleGroupItem.value, styleGroupItem.rule.fileUrl, styleGroupItem.rule.fileLine, styleGroupItem.rule.fileColumn, styleGroupItem.rule.fileLinkText, styleGroupItem.rule.tooltip, styleGroupItem.isWinning, styleGroupItem.isImportant, styleGroupItem.isEnabled, styleGroupItem.status, style.isColor(), styleGroupItem.uid);
                            style.addSource(source);
                        }
                    }
                    styleList.push(style);
                }
                return styleList;
            };
            Model.prototype.applyPropertyNameFilter = function (propertyNames) {
                if(!this._nameFilter || this._nameFilter.trim().length == 0) {
                    return propertyNames;
                }
                var filteredPropertyNames = [];
                if(this._nameFilter && this._nameFilter.length > 0) {
                    for(var i = 0; i < propertyNames.length; i++) {
                        var propertyName = propertyNames[i];
                        if(propertyName.indexOf(this._nameFilter) > -1) {
                            filteredPropertyNames.push(propertyName);
                        }
                    }
                }
                return filteredPropertyNames;
            };
            Model.prototype.toggleEnabled = function (propertyId, isEnabled) {
                var _this = this;
                return new Plugin.Promise(function (completed, error) {
                    var property = _this._elementStyleModel.getPropertyById(propertyId);
                    if(property) {
                        if(isEnabled === undefined || isEnabled !== property.isEnabled) {
                            property.toggleEnable().then(completed);
                        } else {
                            completed();
                        }
                    } else {
                        error("Property not found");
                    }
                });
            };
            Model.prototype.forEachStyle = function (func) {
                this._styleList.forEach(func);
            };
            Model.prototype.addUpdateListener = function (listener) {
                if(this._listenerArray.indexOf(listener) < 0) {
                    this._listenerArray.push(listener);
                }
            };
            Model.prototype.removeUpdateListener = function (listener) {
                var index = this._listenerArray.indexOf(listener);
                if(index >= 0) {
                    this._listenerArray.splice(index, 1);
                }
            };
            Model.prototype.onRuleChange = function (evt, rule, args) {
                this.fireRuleChange(evt, rule, args);
            };
            Model.prototype.onPropertyChange = function (evt, property, args) {
                if(evt === Dom.StylePropertyChangeEvent.isWinning) {
                    this.onPropertyWinningRuleChange(property, args);
                } else if(evt === Dom.StylePropertyChangeEvent.isEnabled) {
                    this.onPropertyEnableChange(property, args);
                } else if(evt === Dom.StylePropertyChangeEvent.value) {
                    this.onPropertyValueChange(property, args);
                } else if(evt === Dom.StylePropertyChangeEvent.status) {
                    this.onPropertyStatusChange(property, args);
                } else {
                    this.firePropertyChange(evt, property, args);
                }
            };
            Model.prototype.fireRuleChange = function (evt, rule, args) {
                var array = this._listenerArray.slice(0);
                for(var i = 0, end = array.length; i < end; i++) {
                    var listener = array[i];
                    listener.onRuleChange(evt, rule, args);
                }
            };
            Model.prototype.firePropertyChange = function (evt, property, args) {
                var array = this._listenerArray.slice(0);
                for(var i = 0, end = array.length; i < end; i++) {
                    var listener = array[i];
                    listener.onPropertyChange(evt, property, args);
                }
            };
            Model.prototype.onPropertyStatusChange = function (property, newStatus) {
                var source = this.findSourceByUid(property.uid);
                if(!source) {
                    return;
                }
                if(source.status !== newStatus) {
                    var oldStatus = source.status;
                    source.status = newStatus;
                    this.firePropertyChange(Dom.StylePropertyChangeEvent.status, property, newStatus);
                }
            };
            Model.prototype.onPropertyValueChange = function (property, newValueForDisplay) {
                var source = this.findSourceByUid(property.uid);
                if(!source) {
                    return;
                }
                if(source.valueForDisplay !== newValueForDisplay) {
                    var oldValue = source.value;
                    source.value = property.value;
                    source.isImportant = property.isImportant;
                    this.firePropertyChange(Dom.StylePropertyChangeEvent.value, property, newValueForDisplay);
                }
            };
            Model.prototype.onPropertyEnableChange = function (property, isEnabled) {
                var source = this.findSourceByUid(property.uid);
                if(!source) {
                    return;
                }
                if(source.isEnabled !== isEnabled) {
                    var oldEnabled = source.isEnabled;
                    source.isEnabled = isEnabled;
                    this.firePropertyChange(Dom.StylePropertyChangeEvent.isEnabled, property, isEnabled);
                }
            };
            Model.prototype.onPropertyWinningRuleChange = function (property, isWinning) {
                var source = this.findSourceByUid(property.uid);
                if(!source) {
                    return;
                }
                if(source.isWinning !== isWinning) {
                    var oldWinning = source.isWinning;
                    source.isWinning = isWinning;
                    this.firePropertyChange(Dom.StylePropertyChangeEvent.isWinning, property, isWinning);
                }
            };
            Model.prototype.findSourceByUid = function (propertyId) {
                for(var i = 0, end = this._styleList.length; i < end; i++) {
                    var style = this._styleList[i];
                    var children = style.children;
                    for(var j = 0, jend = children.length; j < jend; j++) {
                        var source = children[j];
                        if(source.propertyId == propertyId) {
                            return source;
                        }
                    }
                }
                return null;
            };
            Model.prototype.findStyleByName = function (name) {
                for(var i = 0, end = this._styleList.length; i < end; i++) {
                    var style = this._styleList[i];
                    if(style.propertyName === name) {
                        return style;
                    }
                }
            };
            Model.prototype.getPropertyById = function (propertyId) {
                if(!propertyId) {
                    return null;
                }
                return this._elementStyleModel.getPropertyById(propertyId);
            };
            Model.prototype.handleFileLinkClick = function (encodedUrl, line, column) {
                try  {
                    var url = decodeURI(encodedUrl);
                    (Plugin).Host.showDocument(url, line || 1, column || 1);
                } catch (ex) {
                }
            };
            Model.prototype.startSingleEdit = function () {
                this._bridge.channel.call(this._bridge.engine, "startSingleEdit");
            };
            Model.prototype.endSingleEdit = function () {
                this._bridge.channel.call(this._bridge.engine, "endSingleEdit");
            };
            Model.prototype.toggleEnableForStyle = function (style, isEnabled) {
                var _this = this;
                var promiseList = [];
                if(isEnabled === undefined || isEnabled !== style.isEnabled) {
                    var newIsEnabled = !style.isEnabled;
                    style.sources.forEach(function (source) {
                        var property = _this.getPropertyById(source.propertyId);
                        if(property && property.isEnabled !== newIsEnabled) {
                            promiseList.push(property.toggleEnable());
                            style.enabledCount += newIsEnabled ? 1 : -1;
                        }
                    });
                }
                return Plugin.Promise.join(promiseList).then(function () {
                    return style.recalculateEnabledCount();
                });
            };
            Model.prototype.insertNewSource = function (newProperty, insertBeforeProperty) {
                for(var i = 0, end = this._styleList.length; i < end; i++) {
                    var style = this._styleList[i];
                    var children = style.children;
                    for(var j = 0, jend = children.length; j < jend; j++) {
                        var source = children[j];
                        if(source.propertyId == insertBeforeProperty.uid) {
                            var source = new Source(newProperty.rule.selectorText, newProperty.value, newProperty.rule.fileUrl, newProperty.rule.fileLine, newProperty.rule.fileColumn, newProperty.rule.fileLinkText, newProperty.rule.tooltip, newProperty.isWinning, newProperty.isImportant, newProperty.isEnabled, newProperty.status, style.isColor(), newProperty.uid);
                            children.splice(j, 0, source);
                            return source;
                        }
                    }
                }
            };
            Model.prototype.tcGetStyleList = function () {
                return this._styleList;
            };
            return Model;
        })(Common.ModelView.ListModel);
        Wsp.Model = Model;        
    })(Dom.Wsp || (Dom.Wsp = {}));
    var Wsp = Dom.Wsp;
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/WinningView/winningStyleModel.js.map

// changesModel.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var ChangesModel = (function (_super) {
        __extends(ChangesModel, _super);
        function ChangesModel(_bridge, _domExplorer) {
            var _this = this;
                _super.call(this);
            this._bridge = _bridge;
            this._domExplorer = _domExplorer;
            this._changedSources = [];
            this._ruleMap = {
            };
            this._collapsedStyles = {
            };
            this.listSource = function (callback) {
                Dom.ElementStyleModel.create(_this._bridge.engine, _this._bridge.channel, null, function (styles) {
                    _this._changedSources = [];
                    _this._ruleMap = {
                    };
                    _this._styles = styles;
                    styles.addUpdateListener(_this);
                    styles.rules.forEach(function (rule) {
                        if(_this.changesInRuleAreSignificant(rule)) {
                            var url = rule.styleHref || rule.fileUrl;
                            if(rule.isInlined) {
                                url = _this._inlineStyleString || (_this._inlineStyleString = toolwindowHelpers.loadString("InlineStyleSelector"));
                            } else if(rule.wasCreatedInSession) {
                                url = _this._newRuleString || (_this._newRuleString = toolwindowHelpers.loadString("ChangesViewNewInSessionCSSSource"));
                            } else if(!url) {
                                url = _this._unknownSourceString || (_this._unknownSourceString = toolwindowHelpers.loadString("ChangesViewUnknownCSSSource"));
                            }
                            var changedSource = _this.findSource(url);
                            if(!changedSource) {
                                changedSource = new Dom.ChangedSource(url, _this, rule.isInlined);
                                _this._changedSources.push(changedSource);
                            }
                            var changedRule = new Dom.ChangedRule(changedSource, rule, url);
                            _this._ruleMap[rule.uid] = changedRule;
                            changedSource.add(changedRule);
                        }
                    });
                    _this._changedSources.forEach(function (changedSource) {
                        changedSource.sort();
                    });
                    callback(_this._changedSources);
                    styles.addUpdateListener(_this);
                });
            };
        }
        Object.defineProperty(ChangesModel.prototype, "changes", {
            get: function () {
                return this._changedSources;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangesModel.prototype, "textForCopy", {
            get: function () {
                var first = true;
                var text = "";
                this._changedSources.forEach(function (source) {
                    if(!first) {
                        text += "\r\n";
                    }
                    text += source.textForCopy;
                    first = false;
                });
                return text;
            },
            enumerable: true,
            configurable: true
        });
        ChangesModel.prototype.isCollapsed = function (id) {
            return !!this._collapsedStyles[id];
        };
        ChangesModel.prototype.setCollapsedState = function (id, isCollapsed) {
            if(this.isCollapsed(id) === isCollapsed) {
                return;
            }
            if(isCollapsed) {
                this._collapsedStyles[id] = true;
            } else {
                delete this._collapsedStyles[id];
            }
        };
        ChangesModel.prototype.lookupSource = function (uid) {
            for(var i = 0; i < this._changedSources.length; i++) {
                var source = this._changedSources[i];
                if(source.uniqueId === uid) {
                    return source;
                }
            }
        };
        ChangesModel.prototype.lookupRule = function (uid) {
            return this._ruleMap[uid];
        };
        ChangesModel.prototype.selectElement = function (uid) {
            var _this = this;
            this._bridge.channel.call(this._bridge.engine, "getParentChainForStyle", [
                uid
            ], function (chain) {
                if(chain) {
                    _this._domExplorer.domTree.expandElementChain(chain, false);
                }
            });
        };
        ChangesModel.prototype.navigateFileLink = function (originalUrl, line, column) {
            try  {
                var url = decodeURI(originalUrl);
                (Plugin).Host.showDocument(url, line || 1, column || 1);
            } catch (ex) {
            }
        };
        ChangesModel.prototype.addUpdateListener = function (listener) {
            this._styles.addUpdateListener(listener);
        };
        ChangesModel.prototype.onRuleChange = function (event, rule, args) {
            if(event === Dom.StyleRuleChangeEvent.fileLinkTooltip) {
                this._changedSources.forEach(function (source) {
                    source.updateTooltip(rule, args);
                });
            }
        };
        ChangesModel.prototype.onPropertyChange = function (event, property, arg) {
        };
        ChangesModel.prototype.findSource = function (source) {
            for(var i = 0; i < this._changedSources.length; i++) {
                var changedSource = this._changedSources[i];
                if(changedSource.source === source) {
                    return changedSource;
                }
            }
        };
        ChangesModel.prototype.changesInRuleAreSignificant = function (rule) {
            if(!rule.isOriginal) {
                return true;
            }
            for(var i = 0; i < rule.properties.length; i++) {
                var property = rule.properties[i];
                if(!property.isOriginal && !(property.wasCreatedInSession && !property.isEnabled && property.status === Dom.StylePropertyStatus.valid)) {
                    return true;
                }
            }
            return false;
        };
        return ChangesModel;
    })(Common.ModelView.ListModel);
    Dom.ChangesModel = ChangesModel;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/ChangesView/changesModel.js.map

// eventsModel.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var EventHandler = (function () {
        function EventHandler(column, cookie, documentUrl, functionName, line, text, tooltip) {
            this.column = column;
            this.cookie = cookie;
            this.documentUrl = documentUrl;
            this.functionName = functionName;
            this.line = line;
            this.text = text;
            this.tooltip = tooltip;
        }
        return EventHandler;
    })();
    Dom.EventHandler = EventHandler;    
    var EventAndHandlers = (function () {
        function EventAndHandlers(_model, eventName, children) {
            this._model = _model;
            this.eventName = eventName;
            this.children = children;
            this.isDirty = false;
        }
        Object.defineProperty(EventAndHandlers.prototype, "uniqueId", {
            get: function () {
                return this.eventName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventAndHandlers.prototype, "expanded", {
            get: function () {
                return !this._model.isCollapsed(this.uniqueId);
            },
            set: function (expanded) {
                this._model.setCollapsedState(this.uniqueId, !expanded);
            },
            enumerable: true,
            configurable: true
        });
        EventAndHandlers.prototype.hasChildren = function () {
            return !!this.children && this.children.length > 0;
        };
        return EventAndHandlers;
    })();
    Dom.EventAndHandlers = EventAndHandlers;    
    var EventsModel = (function (_super) {
        __extends(EventsModel, _super);
        function EventsModel(channel, engine, styleCache, createShortenedUrlText) {
            var _this = this;
                _super.call(this);
            this._uniqueIdsOfCollapsedStyles = {
            };
            this.listSource = function (callback, args) {
                channel.call(engine, "collectEvents", [
                    args[0], 
                    function (e) {
                        _this.onEventHandlersRetrieved(e, callback);
                    }, 
                    function (e) {
                        _this.onEventHandlerAdded(e);
                    }, 
                    function (e) {
                        _this.onEventHandlerRemoved(e);
                    }                ]);
            };
        }
        Object.defineProperty(EventsModel.prototype, "updateCallback", {
            set: function (callback) {
                this._updateCallback = callback;
            },
            enumerable: true,
            configurable: true
        });
        EventsModel.prototype.isCollapsed = function (uniqueId) {
            return this._uniqueIdsOfCollapsedStyles[uniqueId] === true;
        };
        EventsModel.prototype.setCollapsedState = function (uniqueId, collapsed) {
            if(this.isCollapsed(uniqueId) === collapsed) {
                return;
            }
            if(collapsed) {
                this._uniqueIdsOfCollapsedStyles[uniqueId] = true;
            } else {
                delete this._uniqueIdsOfCollapsedStyles[uniqueId];
            }
        };
        EventsModel.prototype.onEventHandlerAdded = function (handler) {
            if(!handler) {
                return;
            }
            this.processAddedEventHandler(this.cache, handler);
            if(this._updateCallback) {
                this._updateCallback();
            }
        };
        EventsModel.prototype.onEventHandlerRemoved = function (handler) {
            if(!handler) {
                return;
            }
            this.processRemovedEventHandler(this.cache, handler);
            if(this._updateCallback) {
                this._updateCallback();
            }
        };
        EventsModel.prototype.onEventHandlersRetrieved = function (events, callback) {
            var eventList = [];
            for(var i = 0; i < events.length; i++) {
                this.processAddedEventHandler(eventList, events[i]);
            }
            callback(eventList);
        };
        EventsModel.prototype.processAddedEventHandler = function (eventList, e) {
            var match = this.findMatchingEventAndHandlers(e.eventName, eventList);
            if(!match) {
                match = new EventAndHandlers(this, e.eventName, []);
                eventList.push(match);
            } else {
                for(var i = 0; i < match.children.length; i++) {
                    if(match.children[i].cookie === e.cookie) {
                        return;
                    }
                }
            }
            var line = e.line + 1;
            var column = e.column + 1;
            var text = null;
            var tooltip = null;
            text = toolwindowHelpers.createFileLinkText(e.document, line);
            if(e.document !== undefined) {
                if(e.document.indexOf("eval code") === 0) {
                    tooltip = toolwindowHelpers.loadString("EvalCodeEventHandlerToolTip");
                } else if(e.document.indexOf("Function code") === 0) {
                    tooltip = toolwindowHelpers.loadString("FunctionCodeEventHandlerToolTip");
                } else if(e.document.indexOf("script block") === 0) {
                    tooltip = toolwindowHelpers.loadString("DynamicScriptBlockEventHandlerToolTip");
                } else {
                    tooltip = toolwindowHelpers.loadString("EventHandlerTooltip", [
                        toolwindowHelpers.htmlEscape(e.eventName), 
                        e.usesCapture, 
                        toolwindowHelpers.htmlEscape(e.document), 
                        line, 
                        column
                    ]);
                }
            } else {
                text = e.document;
                tooltip = toolwindowHelpers.loadString("ExternalEventHandlerTooltip", [
                    toolwindowHelpers.htmlEscape(e.eventName), 
                    e.usesCapture
                ]);
            }
            match.children.push(new EventHandler(column, e.cookie, toolwindowHelpers.htmlEscape(e.document), e.functionName, line, text, tooltip));
            match.isDirty = true;
            return;
        };
        EventsModel.prototype.processRemovedEventHandler = function (eventList, e) {
            var match = this.findMatchingEventAndHandlers(e.eventName, eventList);
            if(!match) {
                return;
            }
            for(var i = 0; i < match.children.length; i++) {
                if(match.children[i].cookie === e.cookie) {
                    match.children.splice(i, 1);
                    return;
                }
            }
        };
        EventsModel.prototype.findMatchingEventAndHandlers = function (eventName, eventList) {
            var match = null;
            for(var i = 0; i < eventList.length; i++) {
                if(eventList[i].eventName === eventName) {
                    return eventList[i];
                }
            }
            return null;
        };
        return EventsModel;
    })(Common.ModelView.ListModel);
    Dom.EventsModel = EventsModel;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/eventsModel.js.map

// expandingListView.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var ExpandingListView = (function (_super) {
        __extends(ExpandingListView, _super);
        function ExpandingListView(htmlElementSource, viewDivId, defaultItemTemplateId, model, _expansionChangeCallback, alternateTemplates, localizer, idPropertyName, sortPropertyName, isChanged, clearDirtyFlag) {
                _super.call(this, htmlElementSource, viewDivId, defaultItemTemplateId, model, alternateTemplates, localizer, idPropertyName, sortPropertyName, isChanged, clearDirtyFlag);
            this._expansionChangeCallback = _expansionChangeCallback;
            this.addClickHandlerThatExpandsAndCollapsesChildren();
            this.addKeyboardNavigationHandlers();
            this.addFocusSettingDivClickHandler();
        }
        ExpandingListView.LIST_ITEM_CLASS = "BPT-ExpandingList-Item";
        ExpandingListView.EXPAND_ICON_CLASS = "BPT-ExpandingList-ExpandIcon";
        ExpandingListView.HEADER_CLASS = "BPT-ExpandingList-Header";
        ExpandingListView.CHILD_VALUE_CONTAINER_CLASS = "BPT-ExpandingList-Child-Value-Container";
        ExpandingListView.prototype.postViewProcessing = function () {
            _super.prototype.postViewProcessing.call(this);
            var menuConfig = this.getMenuConfig();
            if(menuConfig) {
                this._contextMenuController = new ExpandingContextMenuController(this, this.listRoot, menuConfig);
            }
            var headerElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(this.listRoot, ExpandingListView.HEADER_CLASS);
            if(headerElement) {
                headerElement.tabIndex = 1;
            }
        };
        ExpandingListView.prototype.findHeaderOrChild = function (element) {
            while(element.parentElement && !(element.classList.contains(ExpandingListView.HEADER_CLASS) || element.classList.contains(ExpandingListView.CHILD_VALUE_CONTAINER_CLASS))) {
                element = element.parentElement;
            }
            return element;
        };
        ExpandingListView.prototype.getMenuConfig = function () {
            return null;
        };
        ExpandingListView.prototype.beforeUpdate = function (newThing, oldThing, updatedElement) {
            this._lastItemHadFocus = false;
            this._subItemWithFocus = null;
            if(this.idPropertyName) {
                var activeElement = this.htmlElementSource.activeElement;
                if(activeElement) {
                    var updatedHeaderElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(updatedElement, ExpandingListView.HEADER_CLASS);
                    var activeItemElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(activeElement, ExpandingListView.LIST_ITEM_CLASS);
                    var activeHeaderElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(activeItemElement, ExpandingListView.HEADER_CLASS);
                    this._lastItemHadFocus = updatedHeaderElement === activeHeaderElement;
                    if(activeElement.classList.contains(ExpandingListView.CHILD_VALUE_CONTAINER_CLASS)) {
                        this._subItemWithFocus = activeElement.getAttribute("data-listsubid");
                    }
                }
            }
        };
        ExpandingListView.prototype.afterUpdate = function (newThing, oldThing) {
            if(this._lastItemHadFocus) {
                var elementToGainFocus;
                if(this._subItemWithFocus) {
                    elementToGainFocus = this.listRoot.querySelector("[data-listsubid='" + this._subItemWithFocus + "']");
                }
                if(!elementToGainFocus) {
                    elementToGainFocus = this.listRoot.querySelector("[data-listid='" + oldThing[this.idPropertyName] + "'] > ." + ExpandingListView.HEADER_CLASS);
                }
                if(elementToGainFocus) {
                    this.setFocus(elementToGainFocus);
                }
            }
        };
        ExpandingListView.prototype.beforeDelete = function (oldThing, deletedElement) {
            var activeElement = this.htmlElementSource.activeElement;
            var itemElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(activeElement, ExpandingListView.LIST_ITEM_CLASS);
            this._lastItemHadFocus = itemElement === deletedElement;
        };
        ExpandingListView.prototype.afterDelete = function () {
            if(this._lastItemHadFocus) {
                var elementToGainFocus = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(this.listRoot, ExpandingListView.HEADER_CLASS);
                if(elementToGainFocus) {
                    this.setFocus(elementToGainFocus);
                }
            }
        };
        ExpandingListView.prototype.toggleExpander = function (element) {
            var collapsibleSection = element.parentElement;
            var wasExpanded = collapsibleSection.getAttribute("aria-expanded") === "true";
            collapsibleSection.setAttribute("aria-expanded", wasExpanded ? "false" : "true");
            if(this._expansionChangeCallback) {
                this._expansionChangeCallback(element.parentElement.parentElement.getAttribute("data-listid"), !wasExpanded);
            }
        };
        ExpandingListView.prototype.addClickHandlerThatExpandsAndCollapsesChildren = function () {
            var _this = this;
            this.addHandler(this.listRoot, "click", [
                ExpandingListView.EXPAND_ICON_CLASS
            ], function (evt) {
                _this.toggleExpander(evt.target);
                return false;
            });
        };
        ExpandingListView.prototype.addKeyboardNavigationHandlers = function () {
            var _this = this;
            this.addHandler(this.listRoot, "keydown", null, function (keyDownEvent) {
                if(keyDownEvent.ctrlKey || keyDownEvent.shiftKey || keyDownEvent.altKey) {
                    return true;
                }
                if(toolwindowHelpers.isContextMenuUp()) {
                    return true;
                }
                if(HtmlTreeView.currentFocusOnInput()) {
                    return true;
                }
                var element = keyDownEvent.target;
                var srcElement = keyDownEvent.srcElement;
                if(keyDownEvent.key === Common.Keys.DOWN) {
                    _this.moveFocusDown(srcElement);
                } else if(keyDownEvent.key === Common.Keys.UP) {
                    _this.moveFocusUp(srcElement);
                } else if(keyDownEvent.key === Common.Keys.LEFT) {
                    _this.focusParentOrCollapse(srcElement);
                } else if(keyDownEvent.key === Common.Keys.RIGHT) {
                    _this.expandOrFocusChild(srcElement);
                } else if(keyDownEvent.key === Common.Keys.HOME) {
                    _this.moveFocusToFirst(srcElement);
                } else if(keyDownEvent.key === Common.Keys.END) {
                    _this.moveFocusToLast(srcElement);
                } else {
                    return true;
                }
                return false;
            });
        };
        ExpandingListView.prototype.focusParentOrCollapse = function (htmlElement) {
            var listItemDiv;
            if(this.isChild(htmlElement)) {
                listItemDiv = htmlElement.parentElement.parentElement;
                var computedValueDiv = listItemDiv.children[0];
                this.setFocus(computedValueDiv);
                return;
            }
            htmlElement.setAttribute("aria-expanded", "false");
            if(this._expansionChangeCallback) {
                this._expansionChangeCallback(htmlElement.parentElement.getAttribute("data-listid"), false);
            }
        };
        ExpandingListView.prototype.expandOrFocusChild = function (htmlElement) {
            if(this.isChild(htmlElement)) {
                return;
            }
            if(htmlElement.getAttribute("aria-expanded") !== "true") {
                htmlElement.setAttribute("aria-expanded", "true");
                if(this._expansionChangeCallback) {
                    this._expansionChangeCallback(htmlElement.parentElement.getAttribute("data-listid"), true);
                }
                return;
            }
            var collapsedSectionDiv = htmlElement.nextElementSibling;
            if(collapsedSectionDiv && collapsedSectionDiv.children && collapsedSectionDiv.children.length) {
                var valueContainer = collapsedSectionDiv.children[0];
                this.setFocus(valueContainer);
            }
        };
        ExpandingListView.prototype.findFocusableUp = function (htmlElement) {
            var previousHtmlElement = htmlElement.previousElementSibling;
            if(previousHtmlElement) {
                return previousHtmlElement;
            }
            var listItemDiv;
            if(this.isChild(htmlElement)) {
                listItemDiv = htmlElement.parentElement.parentElement;
                return F12.DomExplorer.DomExplorerWindow.findDescendentByClass(listItemDiv, ExpandingListView.HEADER_CLASS);
            }
            listItemDiv = htmlElement.parentElement;
            var previousListItemDiv = listItemDiv.previousElementSibling;
            if(!previousListItemDiv) {
                return null;
            }
            var previousListItemDivsHeader = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(previousListItemDiv, ExpandingListView.HEADER_CLASS);
            if(previousListItemDivsHeader.getAttribute("aria-expanded") === "true") {
                if(previousListItemDiv.children && previousListItemDiv.children.length >= 2) {
                    var previousCollapsedSectionDiv = previousListItemDiv.children[1];
                    return previousCollapsedSectionDiv.lastElementChild;
                }
            }
            return previousListItemDivsHeader;
        };
        ExpandingListView.prototype.moveFocusUp = function (htmlElement) {
            var elementToFocus = this.findFocusableUp(htmlElement);
            if(elementToFocus) {
                this.setFocus(elementToFocus);
            }
        };
        ExpandingListView.prototype.moveFocusToFirst = function (element) {
            var moveTo = element;
            var prev;
            while(prev = this.findFocusableUp(moveTo)) {
                moveTo = prev;
            }
            if(moveTo) {
                this.setFocus(moveTo);
            }
        };
        ExpandingListView.prototype.findFocusableDown = function (htmlElement) {
            var nextHtmlElement = htmlElement.nextElementSibling;
            if(nextHtmlElement && this.isChild(htmlElement)) {
                return nextHtmlElement;
            }
            var listItemDiv;
            if(this.isChild(htmlElement)) {
                listItemDiv = htmlElement.parentElement.parentElement;
            } else {
                if(htmlElement.getAttribute("aria-expanded") === "true") {
                    var collapsedSectionDiv = htmlElement.nextElementSibling;
                    if(collapsedSectionDiv && collapsedSectionDiv.children.length) {
                        var valueContainer = collapsedSectionDiv.children[0];
                        return valueContainer;
                    }
                }
                listItemDiv = htmlElement.parentElement;
            }
            var nextListItemDiv = listItemDiv.nextElementSibling;
            if(nextListItemDiv) {
                return F12.DomExplorer.DomExplorerWindow.findDescendentByClass(nextListItemDiv, ExpandingListView.HEADER_CLASS);
            }
            return null;
        };
        ExpandingListView.prototype.moveFocusDown = function (htmlElement) {
            var elementToFocus = this.findFocusableDown(htmlElement);
            if(elementToFocus) {
                this.setFocus(elementToFocus);
            }
        };
        ExpandingListView.prototype.moveFocusToLast = function (element) {
            var moveTo = element;
            var next;
            while(next = this.findFocusableDown(moveTo)) {
                moveTo = next;
            }
            if(moveTo) {
                this.setFocus(moveTo);
            }
        };
        ExpandingListView.prototype.isChild = function (htmlElement) {
            return htmlElement.classList.contains(ExpandingListView.CHILD_VALUE_CONTAINER_CLASS);
        };
        ExpandingListView.prototype.addFocusSettingDivClickHandler = function () {
            var _this = this;
            this.addHandler(this.listRoot, "click", null, function (evt) {
                var element = _this.findHeaderOrChild(evt.target);
                if(element.focus) {
                    _this.setFocus(element);
                }
                return true;
            });
        };
        return ExpandingListView;
    })(Common.ModelView.ReconcilingListView);
    Dom.ExpandingListView = ExpandingListView;    
    var contextMenuItems;
    (function (contextMenuItems) {
        contextMenuItems._map = [];
        contextMenuItems.copyObject = 0;
    })(contextMenuItems || (contextMenuItems = {}));
    var ExpandingContextMenuController = (function () {
        function ExpandingContextMenuController(_expandingView, _elementListener, _config) {
            this._expandingView = _expandingView;
            this._elementListener = _elementListener;
            this._config = _config;
            var _this = this;
            this._menuId = "ExpandingViewContextMenu" + ExpandingContextMenuController.uid++;
            this.initialize();
            this._menuItems = [];
            this._config.menuItems.forEach(function (item) {
                _this._menuItems.push({
                    id: item.name,
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: toolwindowHelpers.loadString(item.textIdentifier)
                });
            });
        }
        ExpandingContextMenuController.uid = 0;
        ExpandingContextMenuController.prototype.initialize = function () {
            var _this = this;
            this._contextMenuListener = function (e) {
                return _this.onContextMenu(e);
            };
            this._keydownListener = function (e) {
                return _this.onKeydown(e);
            };
            this._elementListener.addEventListener("contextmenu", this._contextMenuListener);
            this._elementListener.addEventListener("keydown", this._keydownListener);
        };
        ExpandingContextMenuController.prototype.uninitialize = function () {
            this._elementListener.removeEventListener("contextmenu", this._contextMenuListener);
            this._elementListener.removeEventListener("keydown", this._keydownListener);
        };
        ExpandingContextMenuController.prototype.onKeydown = function (event) {
            var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
            if(event.keyCode === Common.KeyCodes.F10 && shiftKey) {
                var selectedItem = document.querySelector("#" + this._expandingView.listViewDivId + " :focus") || this._elementListener;
                var rect = selectedItem.getBoundingClientRect();
                this.showContextMenu(selectedItem, rect.left, rect.top);
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            return true;
        };
        ExpandingContextMenuController.prototype.onContextMenu = function (evt) {
            var selectedItem = null;
            var x = evt.clientX;
            var y = evt.clientY;
            if(this._config.getSelectedItem) {
                selectedItem = this._config.getSelectedItem(x, y);
            } else if(this._expandingView) {
                if(x <= 0 || y <= 0) {
                    selectedItem = document.querySelector("#" + this._expandingView.listViewDivId + " :focus");
                    if(selectedItem) {
                        var offset = selectedItem.getBoundingClientRect();
                        x = offset.left;
                        y = offset.top;
                    }
                } else {
                    selectedItem = this._expandingView.findHeaderOrChild(document.elementFromPoint(x, y));
                    if(selectedItem) {
                        this._expandingView.setFocus(selectedItem);
                    }
                }
            }
            this.showContextMenu(selectedItem, x, y);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            return false;
        };
        ExpandingContextMenuController.prototype.onMenuItemClicked = function (menuId, itemId, selection) {
            for(var i = 0; i < this._menuItems.length; i++) {
                if(this._menuItems[i].id === itemId) {
                    this._config.menuItems[i].execute(selection);
                    break;
                }
            }
            this.dismiss();
        };
        ExpandingContextMenuController.prototype.showContextMenu = function (selectedItem, x, y) {
            var _this = this;
            this.dismiss();
            this._selection = selectedItem;
            if(!this._contextMenu) {
                for(var i = 0; i < this._menuItems.length; i++) {
                    this._menuItems[i].disabled = this.createIsDisabledFunction(this._config.menuItems[i].isDisabled);
                }
                this._contextMenu = Plugin.ContextMenu.create(this._menuItems, this._menuId, null, null, function (menuId, menuItem) {
                    return _this.onMenuItemClicked(menuId, menuItem.id, _this._selection);
                });
                this._dismissHandler = function (e) {
                    _this.dismiss();
                };
            }
            if(this._elementListener) {
                this._contextMenu.attach(this._elementListener);
            }
            this._contextMenu.addEventListener("dismiss", this._dismissHandler);
            this._contextMenu.show(parseInt(x.toFixed(0)), parseInt(y.toFixed(0)));
            toolwindowHelpers.contextMenuUp(true);
            return false;
        };
        ExpandingContextMenuController.prototype.createIsDisabledFunction = function (func) {
            var _this = this;
            return func ? function () {
                return func(_this._selection);
            } : function () {
                return false;
            };
        };
        ExpandingContextMenuController.prototype.dismiss = function () {
            if(this._contextMenu) {
                this._contextMenu.removeEventListener("dismiss", this._dismissHandler);
                this._contextMenu.dismiss();
                this._contextMenu.dispose();
                this._contextMenu = null;
            }
            toolwindowHelpers.contextMenuUp(false);
        };
        return ExpandingContextMenuController;
    })();
    Dom.ExpandingContextMenuController = ExpandingContextMenuController;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/expandingListView.js.map

// winningStyleView.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    (function (Wsp) {
        var Static = (function () {
            function Static() { }
            Static.ALL_STYLES_BUTTON_ID = "allWinningStylesButton";
            Static.CSS_ARIA_INVALID = "BPT-Style-PropertyValueAriaInvalid";
            Static.CSS_BPT_TOOLBAR_TOGGLE_BUTTON_STATE_ON = "BPT-ToolbarToggleButton-StateOn";
            Static.CSS_FILE_LINK = "BPT-FileLink";
            Static.CSS_HEADER = "BPT-ExpandingList-Header";
            Static.CSS_HEADER_CHECKBOX = "BPT-WinningStyle-HeaderCheckBox";
            Static.CSS_HEADER_COLOR = "BPT-WinningStyle-Color";
            Static.CSS_HEADER_COLOR_HIDDEN = "BPT-WinningStyle-Color-Hidden";
            Static.CSS_HEADER_VALUE = "BPT-WinningStyle-PropertyValue-Grid";
            Static.CSS_INVALID_PROPERTY = "BPT-Style-InvalidProperty";
            Static.CSS_NOT_WINNING = "BPT-WinningStyle-NotWinning";
            Static.CSS_PROPERTY_NAME = "BPT-WinningStyle-PropertyName";
            Static.CSS_PROPERTY_VALUE = "BPT-Style-PropertyValue";
            Static.CSS_SCROLL_CONTAINER = "BPT-DataTree-ScrollContainer";
            Static.CSS_SOURCE = "BPT-ExpandingList-Child-Value-Container";
            Static.CSS_SOURCE_CHECKBOX = "BPT-WinningStyle-SourceCheckBox";
            Static.CSS_SOURCE_COLOR = "BPT-WinningStyle-SourceColor";
            Static.FILTER_TEXT_BOX_ID = "winningStylesFilterTextBox";
            Static.MAX_PROPERTY_VALUE_ROWS = 5;
            Static.NO_RESULTS_MESSAGE_ID = "winningStylesNoResultsMessage";
            Static.getPropertyId = function getPropertyId(e) {
                var parent = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(e, Static.CSS_SOURCE);
                var propertyId = (parent ? parent.getAttribute("data-uid") : "") || "";
                return propertyId;
            };
            Static.isHeader = function isHeader(e) {
                return e.classList.contains(Static.CSS_HEADER);
            };
            Static.isSource = function isSource(e) {
                return e.classList.contains(Static.CSS_SOURCE);
            };
            Static.findHeaderOrSourceAncestor = function findHeaderOrSourceAncestor(e) {
                while(e) {
                    if(Static.isHeader(e) || Static.isSource(e)) {
                        return e;
                    }
                    e = e.parentElement;
                }
                return null;
            };
            Static.isCurrentFocusOnInput = function isCurrentFocusOnInput() {
                var e = document.activeElement;
                if(!e) {
                    return false;
                }
                var s = e.tagName;
                var isInputText = s === "INPUT" && e.getAttribute("type") === "text";
                var isTextArea = s === "TEXTAREA";
                return isInputText || isTextArea;
            };
            return Static;
        })();        
        var View = (function (_super) {
            __extends(View, _super);
            function View(_domExplorer, _bridge, htmlElementSource, viewDivId, defaultItemTemplateId, _model, alternateTemplates) {
                var _this = this;
                        _super.call(this, htmlElementSource, viewDivId, defaultItemTemplateId, _model, function (uniqueId, expanded) {
            return _model.setExpansionState(uniqueId, expanded);
        }, alternateTemplates, null, "uniqueId", "propertyName", function (a, b) {
            return !a.equals(b);
        });
                this._domExplorer = _domExplorer;
                this._bridge = _bridge;
                this._model = _model;
                this._tcPropertyEnableCallback = null;
                this._listElement = this.htmlElementSource.getElementById(this.listViewDivId);
                this.initializeAllStylesButton();
                this._model.allStylesChanged.addHandler(function (newValue) {
                    if(!_this._allStylesButton) {
                        return;
                    }
                    var newValueStr = "" + !newValue;
                    if(_this._allStylesButton.getAttribute("aria-pressed") !== newValueStr) {
                        _this._allStylesButton.setAttribute("aria-pressed", newValueStr);
                    }
                    if(newValue) {
                        _this._allStylesButton.classList.remove(Static.CSS_BPT_TOOLBAR_TOGGLE_BUTTON_STATE_ON);
                    } else {
                        _this._allStylesButton.classList.add(Static.CSS_BPT_TOOLBAR_TOGGLE_BUTTON_STATE_ON);
                    }
                    _this.renderView();
                });
                this.menuItems = [
                    {
                        name: "copyProperty",
                        textIdentifier: "CopyPropertyMenuText",
                        execute: function (selectedElement) {
                            return _this.copyObject(selectedElement);
                        }
                    }, 
                    {
                        name: "viewSource",
                        textIdentifier: "ViewSourceMenuText",
                        execute: function (selectedElement) {
                            return _this.viewSource(selectedElement);
                        },
                        isDisabled: function (selectedElement) {
                            return !_this.canViewSource(selectedElement);
                        }
                    }
                ];
                this._model.addUpdateListener(this);
                this.registerClickHandler();
                this.registerKeydownHandler();
                this.registerDOMAttrModifiedHandler();
                this.initializeAllStylesButton();
                this.addNameFilterHandlers();
            }
            View.prototype.clearView = function () {
                _super.prototype.clearView.call(this);
                this._model.clearModel();
                this.initializeAllStylesButton();
                this.synchronizeNoResultsMessage();
            };
            View.prototype.registerClickHandler = function () {
                var _this = this;
                this.addHandler(this._listElement, "click", [
                    Static.CSS_SOURCE_CHECKBOX, 
                    Static.CSS_FILE_LINK, 
                    Static.CSS_HEADER_CHECKBOX, 
                    Static.CSS_PROPERTY_VALUE
                ], function (evt) {
                    var e = evt.target;
                    if(e.classList.contains(Static.CSS_SOURCE_CHECKBOX)) {
                        _this.togglePropertyCheckBox(e);
                        _this.select(e.parentElement);
                        return false;
                    }
                    if(e.classList.contains(Static.CSS_FILE_LINK)) {
                        _this.viewSource(e);
                        return false;
                    }
                    if(e.classList.contains(Static.CSS_HEADER_CHECKBOX)) {
                        _this.toggleHeaderCheckBox(e);
                        _this.select(e.parentElement);
                        return false;
                    }
                    if(e.classList.contains(Static.CSS_PROPERTY_VALUE)) {
                        var sourceElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(e, Static.CSS_SOURCE);
                        if(sourceElement) {
                            _this.select(sourceElement);
                            var property = _this.findClosestProperty(e);
                            _this.editProperty(property);
                            return false;
                        }
                    }
                    return true;
                });
            };
            View.prototype.viewSource = function (e) {
                var property = this.findClosestProperty(e);
                if(property) {
                    this.openTargetElementFileLink(property);
                }
            };
            View.prototype.canViewSource = function (e) {
                var property = this.findClosestProperty(e);
                return !!property;
            };
            View.prototype.editProperty = function (property) {
                if(property) {
                    if(property.isProperty) {
                        this.prepareEditBox(property);
                    } else {
                        this.editSubproperty(property);
                    }
                }
            };
            View.prototype.registerKeydownHandler = function () {
                var _this = this;
                this.addHandler(this._listElement, "keydown", null, function (keyEvent) {
                    if(_this._isInEditMode) {
                        return true;
                    }
                    var e = (keyEvent.target);
                    var noKeys = !keyEvent.ctrlKey && !keyEvent.shiftKey && !keyEvent.altKey;
                    var ctrlKey = keyEvent.ctrlKey && !keyEvent.shiftKey && !keyEvent.altKey;
                    if(keyEvent.key === Common.Keys.SPACEBAR && noKeys) {
                        var headerSourceElement = Static.findHeaderOrSourceAncestor(e);
                        if(headerSourceElement) {
                            var checkBox = e.firstElementChild;
                            if(Static.isHeader(headerSourceElement)) {
                                _this.toggleHeaderCheckBox(checkBox);
                            } else {
                                _this.togglePropertyCheckBox(checkBox);
                            }
                            return false;
                        }
                    }
                    if(keyEvent.key === Common.Keys.ENTER && noKeys) {
                        var property = _this.findClosestProperty(e);
                        _this.editProperty(property);
                        return false;
                    }
                    if(keyEvent.key === Common.Keys.C && ctrlKey) {
                        _this.copyObject(e);
                        return false;
                    }
                    return true;
                });
            };
            View.prototype.prepareEditBox = function (property) {
                if(!this.enterEditValue(property)) {
                    this.setCurrentSelection(property);
                }
            };
            View.prototype.editSubproperty = function (subproperty) {
                var ourProperty = subproperty.container;
                for(var i = subproperty.rule.properties.length - 1; i >= 0; i--) {
                    var otherProperty = subproperty.rule.properties[i];
                    if(otherProperty === ourProperty) {
                        break;
                    }
                    if(otherProperty.name === subproperty.name) {
                        this.prepareEditBox(otherProperty);
                        return;
                    }
                }
                this.editAddedLonghandPropertyFromShorthandSubproperty(subproperty);
            };
            View.prototype.editAddedLonghandPropertyFromShorthandSubproperty = function (subproperty) {
                var _this = this;
                var propertyName = subproperty.name;
                var scrollContainer = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(this._listElement, Static.CSS_SCROLL_CONTAINER);
                var subpropertyElement = this.findElementForProperty(subproperty);
                var property = subproperty.rule.addProperty();
                var completeAdd = function (completed) {
                    var obj = _this._model.insertNewSource(property, subproperty);
                    var newElement = _this.insertNewPropertyIntoView(subpropertyElement, obj);
                    toolwindowHelpers.scrollIntoView(newElement, scrollContainer);
                    _this.prepareEditBox(property);
                    completed(property);
                };
                return new Plugin.Promise(function (completed) {
                    property.commitName(propertyName).then(function () {
                        return completeAdd(completed);
                    });
                });
            };
            View.prototype.insertNewPropertyIntoView = function (insertBeforeElement, obj) {
                var newElement = this.instantiateTemplate("winningStylesPropertyTemplate", obj);
                insertBeforeElement.parentElement.insertBefore(newElement, insertBeforeElement);
                return newElement;
            };
            View.prototype.instantiateTemplate = function (templateId, obj) {
                var template = new T.Template({
                    htmlElementSource: document,
                    templateId: templateId
                });
                var newElement = this.htmlElementSource.createElement("div");
                newElement.innerHTML = template.createTemplateText(obj);
                return newElement.firstElementChild;
            };
            View.prototype.setCurrentSelection = function (property) {
                var e = this.findElementForProperty(property);
                if(e) {
                    this.setFocus(e);
                }
            };
            View.prototype.findElementForProperty = function (property, className) {
                var selector = "." + Static.CSS_SOURCE + "[data-uid='" + property.uid + "']" + (className ? " ." + className : "");
                var element = this._listElement.querySelector(selector);
                return element;
            };
            View.prototype.enterEditValue = function (property) {
                var _this = this;
                var runEdit = function (func) {
                    _this._isInEditMode = true;
                    setTimeout(func, 0);
                };
                runEdit(function () {
                    return _this.editPropertyValue(property);
                });
                return true;
            };
            View.prototype.editPropertyValue = function (property) {
                var _this = this;
                var e = this.findElementForProperty(property, Static.CSS_PROPERTY_VALUE);
                if(!e) {
                    return;
                }
                var sourceElement = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(e, Static.CSS_SOURCE);
                if(!sourceElement) {
                    return;
                }
                this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_Intellisense_Start);
                var cssAndHtmlMetadataSource = new F12.DomExplorer.CssAndHtmlMetadataSource();
                var provider = new F12.DomExplorer.StylePropertyValueIntellisenseProvider(property.name, cssAndHtmlMetadataSource);
                provider.onShouldOpenOnTextChange = function (text) {
                    return !text.match(/^-?\d/);
                };
                var intellisenseContext = new Common.Intellisense.IntellisenseContext(new Common.Intellisense.InputElementTextEditorBridge(), new Common.Intellisense.IntellisenseMenu("intellisenseListBox", null, null, 500, true, provider), provider, this._bridge);
                this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_Intellisense_Stop);
                var semicolonKey = new Dom.ValueEditorKey(";");
                var valueEditor = new Dom.ValueEditor(document, this._domExplorer, this._bridge, window, Static.MAX_PROPERTY_VALUE_ROWS, intellisenseContext);
                valueEditor.addExitKeys(semicolonKey);
                valueEditor.enableCommitOnChange();
                valueEditor.enableNumericChanges();
                var isSingleEditStarted = false;
                var textareaBorderLeftWidth = 1;
                var textareaBorderRightWidth = 1;
                var sourceElementPaddingRight = 1;
                var width = sourceElement.offsetWidth + sourceElement.offsetLeft - e.offsetLeft - textareaBorderLeftWidth - textareaBorderRightWidth - sourceElementPaddingRight;
                var colorElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(sourceElement, Static.CSS_SOURCE_COLOR);
                if(colorElement) {
                    var colorStyle = window.getComputedStyle(colorElement);
                    if(colorStyle && colorStyle.display !== "none") {
                        width += colorElement.offsetWidth;
                        width += parseInt(colorStyle.marginLeft, 10) + parseInt(colorStyle.marginRight, 10);
                    }
                }
                e.textContent = e.textContent.trim();
                valueEditor.show(e, width, function (newValue, oldValue) {
                    if(!isSingleEditStarted) {
                        _this._model.startSingleEdit();
                        isSingleEditStarted = true;
                    }
                    property.commitValue(newValue);
                }, function (newValue, oldValue, exitKey, wasCancelled) {
                    if(isSingleEditStarted) {
                        _this._model.endSingleEdit();
                    }
                    _this._isInEditMode = false;
                    property.refreshValueDisplay();
                    _this.updateViewSetFocus(property);
                    var sourceElement = _this.findElementForProperty(property);
                    if(sourceElement) {
                        _this.updateStatus(property, sourceElement);
                    }
                    if(_this._domExplorer.documentMode < 9) {
                        var selected = HtmlTreeView.getSelected($m("#tree"));
                        _this._domExplorer.refreshElementForLowDocModes(selected, false);
                    }
                });
            };
            View.prototype.updateViewSetFocus = function (property) {
                if(!this._isInEditMode) {
                    this._oneShotPropertyFocus = property;
                    this.updateView();
                }
            };
            View.prototype.registerDOMAttrModifiedHandler = function () {
                var _this = this;
                this.addHandler(this._listElement, "DOMAttrModified", null, function (evt) {
                    if(evt.attrName === "aria-checked") {
                        var e = Static.findHeaderOrSourceAncestor(evt.target);
                        if(e) {
                            var newIsEnabled = evt.newValue === "true";
                            var checkBox = e.firstElementChild;
                            if(Static.isHeader(e)) {
                                _this.toggleHeaderCheckBox(checkBox, newIsEnabled);
                            } else {
                                _this.togglePropertyCheckBox(checkBox, newIsEnabled);
                            }
                        }
                    }
                    return true;
                });
            };
            View.prototype.postViewProcessing = function () {
                _super.prototype.postViewProcessing.call(this);
                this.synchronizeCheckBoxState();
                if(this._oneShotPropertyFocus) {
                    if(!Static.isCurrentFocusOnInput()) {
                        var propertyElement = this.findElementForProperty(this._oneShotPropertyFocus);
                        if(propertyElement) {
                            this.select(propertyElement);
                        }
                    }
                    this._oneShotPropertyFocus = null;
                }
            };
            View.prototype.synchronizeCheckBoxState = function () {
                var _this = this;
                this._model.forEachStyle(function (style) {
                    return _this.setCheckBoxState(style);
                });
            };
            View.prototype.openTargetElementFileLink = function (property) {
                var rule = property.rule;
                var url = rule.styleHref || rule.fileUrl;
                this._model.handleFileLinkClick(url, rule.fileLine, rule.fileColumn);
            };
            View.prototype.findFocus = function () {
                return this._listElement.querySelector(":focus");
            };
            View.prototype.findClosestProperty = function (e) {
                if(!e) {
                    return;
                }
                var propertyId = Static.getPropertyId(e);
                if(!propertyId) {
                    return;
                }
                var property = this._model.getPropertyById(propertyId);
                return property;
            };
            View.prototype.getMenuConfig = function () {
                return this;
            };
            View.prototype.preViewProcessing = function () {
                _super.prototype.preViewProcessing.call(this);
                this.synchronizeViewAndModel();
            };
            View.prototype.synchronizeViewAndModel = function () {
                this._model.showAllStyles = this.getAllStylesButtonState();
                this._model.nameFilter = (this.htmlElementSource.getElementById(Static.FILTER_TEXT_BOX_ID)).value;
                this.synchronizeNoResultsMessage();
            };
            View.prototype.synchronizeNoResultsMessage = function () {
                var noResultsMessageDiv = this.htmlElementSource.getElementById(Static.NO_RESULTS_MESSAGE_ID);
                if(this._model.length === 0) {
                    noResultsMessageDiv.style.display = "block";
                } else {
                    noResultsMessageDiv.style.display = "none";
                }
            };
            View.prototype.copyObject = function (selectedElement) {
                var property = this.findClosestProperty(selectedElement);
                if(property) {
                    clipboardData.setData("Text", property.formatForCopy);
                    return;
                }
                var style = this._model.findStyleByName(selectedElement.getAttribute("data-name"));
                if(style) {
                    clipboardData.setData("Text", style.propertyName + ": " + style.propertyValue + ";");
                    return;
                }
                clipboardData.clearData("Text");
            };
            View.prototype.initializeAllStylesButton = function () {
                var _this = this;
                this._allStylesButton = this.htmlElementSource.getElementById(Static.ALL_STYLES_BUTTON_ID);
                if(!this._allStylesButton) {
                    return;
                }
                if(!this._allStylesButtonInitialized) {
                    this._allStylesButton.classList.add(Static.CSS_BPT_TOOLBAR_TOGGLE_BUTTON_STATE_ON);
                    this._allStylesButton.setAttribute("aria-pressed", "true");
                    this._allStylesButtonInitialized = true;
                }
                this.addHandler(this._allStylesButton, "mouseover", null, function (mouseEvent) {
                    Plugin.Tooltip.show({
                        content: _this.getAllStylesButtonToolTip()
                    });
                    return true;
                });
                this._allStylesButton.setAttribute("aria-label", this.getAllStylesButtonToolTip());
                this.addHandler(this._allStylesButton, "click", null, function (mouseEvent) {
                    _this.synchronizeAllStylesModelStateWithButtonState();
                    return false;
                });
                this.addHandler(this._allStylesButton, "keydown", null, function (keyEvent) {
                    if(_this._isInEditMode) {
                        return true;
                    }
                    var noKeys = !keyEvent.ctrlKey && !keyEvent.shiftKey && !keyEvent.altKey;
                    if((keyEvent.key === Common.Keys.SPACEBAR || keyEvent.key === Common.Keys.ENTER) && noKeys) {
                        _this.synchronizeAllStylesModelStateWithButtonState();
                        return false;
                    }
                    return true;
                });
                this.addHandler(this._allStylesButton, "DOMAttrModified", null, function (mutationEvent) {
                    if(mutationEvent.attrName === "aria-pressed") {
                        if(mutationEvent.target === _this._allStylesButton) {
                            var pressed = mutationEvent.newValue === "true";
                            if(pressed === _this._model.showAllStyles) {
                                _this._model.showAllStyles = !_this._model.showAllStyles;
                            }
                        }
                    }
                    return true;
                });
            };
            View.prototype.synchronizeAllStylesModelStateWithButtonState = function () {
                this._model.showAllStyles = this.getAllStylesButtonState();
            };
            View.prototype.getAllStylesButtonState = function () {
                if(!this._allStylesButton) {
                    this._allStylesButton = this.htmlElementSource.getElementById(Static.ALL_STYLES_BUTTON_ID);
                }
                return !this._allStylesButton.classList.contains(Static.CSS_BPT_TOOLBAR_TOGGLE_BUTTON_STATE_ON);
            };
            View.prototype.getAllStylesButtonToolTip = function () {
                if(this.getAllStylesButtonState()) {
                    return Plugin.Resources.getString("UserStylesDomExplorerButtonTooltipOff");
                } else {
                    return Plugin.Resources.getString("UserStylesDomExplorerButtonTooltipOn");
                }
            };
            View.prototype.addNameFilterHandlers = function () {
                var _this = this;
                var filterTextBox = this.htmlElementSource.getElementById(Static.FILTER_TEXT_BOX_ID);
                if(filterTextBox) {
                    this.addHandler(filterTextBox, "input", null, function (evt) {
                        var e = evt.target;
                        if(_this._model.nameFilter !== e.value) {
                            _this._model.nameFilter = e.value;
                            _this.renderView();
                        }
                        return true;
                    });
                    this._filterTextBoxContextMenu = new Dom.TextControlMenuController(filterTextBox);
                }
            };
            View.prototype.select = function (e) {
                if(e) {
                    this.setFocus(e);
                    return true;
                }
                return false;
            };
            View.prototype.togglePropertyCheckBox = function (e, isEnabled) {
                this._model.toggleEnabled(Static.getPropertyId(e), isEnabled);
            };
            View.prototype.toggleHeaderCheckBox = function (e, isEnabled) {
                var headerElement = e.parentElement;
                var propertyName = headerElement.getAttribute("data-name");
                var style = this._model.findStyleByName(propertyName);
                if(style) {
                    this._model.toggleEnableForStyle(style, isEnabled);
                }
            };
            View.prototype.onRuleChange = function (evt, rule, args) {
                if(evt === Dom.StyleRuleChangeEvent.addProperty) {
                    this.updateViewSetFocus(this.findClosestProperty(this.findFocus()));
                }
            };
            View.prototype.onPropertyChange = function (evt, property, args) {
                if(evt === Dom.StylePropertyChangeEvent.isWinning) {
                    this.onPropertyWinningRuleChange(property, args);
                } else if(evt === Dom.StylePropertyChangeEvent.isEnabled) {
                    this.onPropertyEnableChange(property, args);
                } else if(evt === Dom.StylePropertyChangeEvent.value) {
                    this.onPropertyValueChange(property, args);
                } else if(evt === Dom.StylePropertyChangeEvent.status) {
                    this.onPropertyStatusChange(property, args);
                } else if(evt === Dom.StylePropertyChangeEvent.change) {
                } else {
                    this.updateViewSetFocus(this.findClosestProperty(this.findFocus()));
                }
                this.synchronizeStyle(property);
                var style = this._model.findStyleByName(property.name);
                if(style) {
                    this.setCheckBoxState(style);
                }
            };
            View.prototype.synchronizeStyle = function (property) {
                var name = property.name;
                var selector = "." + Static.CSS_HEADER + "[data-name='" + name + "']";
                var headerElement = this._listElement.querySelector(selector);
                if(!headerElement) {
                    return;
                }
                var dom = F12.DomExplorer.DomExplorerWindow;
                var style = this._model.findStyleByName(name);
                if(!style) {
                    return;
                }
                if(property.isWinning) {
                    headerElement.setAttribute("data-uid", property.uid);
                    this.updateViewSetFocus(this.findClosestProperty(this.findFocus()));
                } else if(headerElement.getAttribute("data-uid") === property.uid) {
                    headerElement.setAttribute("data-uid", "");
                    this.updateViewSetFocus(this.findClosestProperty(this.findFocus()));
                }
            };
            View.prototype.onPropertyStatusChange = function (property, status) {
                var sourceElement = this.findElementForProperty(property);
                if(!sourceElement) {
                    return;
                }
                this.updateStatus(property, sourceElement);
                this.updateColorDisplay(property, sourceElement);
            };
            View.prototype.onPropertyWinningRuleChange = function (property, isWinning) {
                var uid = property.uid;
                var selector = "." + Static.CSS_SOURCE + "[data-uid='" + uid + "']";
                var sourceElement = this._listElement.querySelector(selector);
                if(!sourceElement) {
                    return;
                }
                if(isWinning) {
                    sourceElement.classList.remove(Static.CSS_NOT_WINNING);
                } else {
                    sourceElement.classList.add(Static.CSS_NOT_WINNING);
                }
            };
            View.prototype.onPropertyEnableChange = function (property, isEnabled) {
                var selector = "." + Static.CSS_SOURCE + "[data-uid='" + property.uid + "'] > ." + Static.CSS_SOURCE_CHECKBOX;
                var checkBoxElement = this._listElement.querySelector(selector);
                if(checkBoxElement) {
                    checkBoxElement.checked = isEnabled;
                    var style = this._model.findStyleByName(property.name);
                    style.enabledCount += isEnabled ? 1 : -1;
                    checkBoxElement.parentElement.setAttribute("aria-checked", isEnabled);
                }
                if(this._tcPropertyEnableCallback) {
                    this._tcPropertyEnableCallback(isEnabled);
                    this._tcPropertyEnableCallback = null;
                }
            };
            View.prototype.onPropertyValueChange = function (property, newValueForDisplay) {
                var selector = "." + Static.CSS_SOURCE + "[data-uid='" + property.uid + "']";
                var sourceElement = this._listElement.querySelector(selector);
                if(!sourceElement) {
                    return;
                }
                var valueElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(sourceElement, Static.CSS_PROPERTY_VALUE);
                if(valueElement) {
                    valueElement.textContent = property.valueForDisplay;
                }
                this.updateColorDisplay(property, sourceElement);
            };
            View.prototype.updateStatus = function (property, sourceElement) {
                var valid = property.status === Dom.StylePropertyStatus.valid;
                sourceElement.setAttribute("aria-invalid", "" + (!valid));
                var valueElement = this.findElementForProperty(property, Static.CSS_PROPERTY_VALUE);
                if(valueElement) {
                    if(valid) {
                        valueElement.classList.remove(Static.CSS_INVALID_PROPERTY);
                    } else {
                        valueElement.classList.add(Static.CSS_INVALID_PROPERTY);
                    }
                }
                var ariaInvalidElement = this.findElementForProperty(property, Static.CSS_ARIA_INVALID);
                if(ariaInvalidElement) {
                    ariaInvalidElement.innerText = valid ? "" : Dom.StyleProperty._ariaInvalidString;
                }
            };
            View.prototype.updateColorDisplay = function (property, sourceElement) {
                var colorElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(sourceElement, Static.CSS_SOURCE_COLOR);
                if(colorElement) {
                    if(property.isDisplayableColor) {
                        colorElement.style.backgroundColor = property.value;
                        colorElement.classList.remove(Static.CSS_HEADER_COLOR_HIDDEN);
                    } else {
                        colorElement.classList.add(Static.CSS_HEADER_COLOR_HIDDEN);
                    }
                }
            };
            View.prototype.setCheckBoxState = function (style) {
                var selector = "." + Static.CSS_HEADER + "[data-name='" + style.propertyName + "'] > ." + Static.CSS_HEADER_CHECKBOX;
                var checkBoxElement = this._listElement.querySelector(selector);
                if(checkBoxElement) {
                    checkBoxElement.checked = style.isEnabled;
                    checkBoxElement.indeterminate = style.isEnabledIndeterminate;
                    checkBoxElement.parentElement.setAttribute("aria-checked", style.isEnabled);
                }
            };
            Object.defineProperty(View.prototype, "tcPropertyEnableCallback", {
                set: function (value) {
                    this._tcPropertyEnableCallback = value;
                },
                enumerable: true,
                configurable: true
            });
            View.prototype.tcQuery = function (selector) {
                return this._listElement.querySelector(selector);
            };
            return View;
        })(Dom.ExpandingListView);
        Wsp.View = View;        
    })(Dom.Wsp || (Dom.Wsp = {}));
    var Wsp = Dom.Wsp;
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/WinningView/winningStyleView.js.map

// changesView.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var ChangesView = (function (_super) {
        __extends(ChangesView, _super);
        function ChangesView(domExplorer, bridge, htmlElementSource, changesViewDivId, defaultItemTemplateId, model, styleCache, localizer, alternateTemplates) {
            var _this = this;
                _super.call(this, htmlElementSource, changesViewDivId, defaultItemTemplateId, model, function (uniqueId, expanded) {
        model.setCollapsedState(uniqueId, !expanded);
    }, alternateTemplates, localizer, "uniqueId", "source");
            this._domExplorer = domExplorer;
            this._bridge = bridge;
            this._changesListElement = this.htmlElementSource.getElementById(this.listViewDivId);
            this._emptyMessageElement = this.htmlElementSource.getElementById("changesEmptyMessage");
            this._emptyMessageElement.textContent = toolwindowHelpers.loadString("ChangesViewEmptyMessage");
            this._model = model;
            this._styleCache = styleCache;
            this.setupEventHandlers();
            this.menuItems = [
                {
                    name: "copy",
                    textIdentifier: "CopyMenuText",
                    execute: function (selectedElement) {
                        return _this.copyObject(selectedElement);
                    },
                    isDisabled: function (selectedElement) {
                        return _this.isCopyDisabled(selectedElement);
                    }
                }, 
                {
                    name: "copyAll",
                    textIdentifier: "CopyAllMenuText",
                    execute: function (selectedElement) {
                        return _this.copyAll();
                    }
                }, 
                {
                    name: "revert",
                    textIdentifier: "RevertStyleMenuText",
                    execute: function (selectedElement) {
                        return _this.revert(selectedElement);
                    },
                    isDisabled: function (selectedElement) {
                        return _this.isRevertDisabled(selectedElement);
                    }
                }, 
                {
                    name: "viewSource",
                    textIdentifier: "ViewSourceMenuText",
                    execute: function (selectedElement) {
                        return _this.viewSource(selectedElement);
                    },
                    isDisabled: function (selectedElement) {
                        return !_this.canViewSource(selectedElement);
                    }
                }
            ];
        }
        ChangesView.SOURCE_CLASS = "BPT-Changes-Source";
        ChangesView.RULE_CLASS = "BPT-Changes-Rule";
        ChangesView.LINK_CLASS = "BPT-Changes-Link";
        ChangesView.prototype.postViewProcessing = function () {
            this._model.addUpdateListener(this);
            _super.prototype.postViewProcessing.call(this);
            this._emptyMessageElement.style.display = this._model.changes.length ? "none" : "block";
        };
        ChangesView.prototype.navigateLink = function (rule) {
            if(rule.isInline) {
                this._model.selectElement(rule.uid);
            } else {
                this._model.navigateFileLink(rule.url, rule.line, rule.column);
            }
        };
        ChangesView.prototype.getMenuConfig = function () {
            return this;
        };
        ChangesView.prototype.isCopyDisabled = function (selectedElement) {
            var isSource = selectedElement.classList.contains(Dom.ExpandingListView.HEADER_CLASS);
            if(isSource) {
                return false;
            }
            var ruleElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(selectedElement, ChangesView.RULE_CLASS);
            var rule = this.getRuleForElement(ruleElement);
            return rule.isDeleted;
        };
        ChangesView.prototype.copyObject = function (selectedElement) {
            var isSource = selectedElement.classList.contains(Dom.ExpandingListView.HEADER_CLASS);
            var copier;
            if(isSource) {
                var uniqueId = selectedElement.parentElement.getAttribute("data-listid");
                copier = this._model.lookupSource(uniqueId);
            } else {
                var ruleElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(selectedElement, ChangesView.RULE_CLASS);
                copier = this.getRuleForElement(ruleElement);
            }
            this.setClipboard(copier);
        };
        ChangesView.prototype.copyAll = function () {
            this.setClipboard(this._model);
        };
        ChangesView.prototype.isRevertDisabled = function (selectedElement) {
            var ruleElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(selectedElement, ChangesView.RULE_CLASS);
            return !ruleElement;
        };
        ChangesView.prototype.revert = function (selectedElement) {
            var _this = this;
            var ruleElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(selectedElement, ChangesView.RULE_CLASS);
            var rule = this.getRuleForElement(ruleElement);
            var uid = rule.uid;
            rule.revert().done(function (result) {
                _this._styleCache.applyChanges([
                    {
                        event: "revertRule",
                        uid: uid,
                        obj: result
                    }
                ]);
                _this.updateView();
            });
        };
        ChangesView.prototype.viewQuery = function (source, rule, className) {
            var query = "." + Dom.ExpandingListView.LIST_ITEM_CLASS + "[data-listid='" + source.uniqueId + "']";
            if(rule) {
                query += " [data-listsubid='" + rule.uid + "']";
            }
            if(className) {
                query += " ." + className;
            }
            return this.listRoot.querySelector(query);
        };
        ChangesView.prototype.onRuleChange = function (event, modelRule, args) {
            if(event === Dom.StyleRuleChangeEvent.fileLinkTooltip) {
                var rule = this._model.lookupRule(modelRule.uid);
                if(rule) {
                    var element = this.viewQuery(rule.source, rule, ChangesView.LINK_CLASS);
                    if(element) {
                        element.setAttribute("data-tooltip", args);
                        element = this.viewQuery(rule.source, null, ChangesView.SOURCE_CLASS);
                        if(element) {
                            element.setAttribute("data-tooltip", args);
                        }
                    }
                }
            }
        };
        ChangesView.prototype.onPropertyChange = function (event, property, arg) {
        };
        ChangesView.prototype.getRuleForElement = function (element) {
            if(element && element.classList.contains(ChangesView.RULE_CLASS)) {
                var uid = element.getAttribute("data-uid");
                return this._model.lookupRule(uid);
            }
        };
        ChangesView.prototype.setClipboard = function (copier) {
            var text = copier ? copier.textForCopy : null;
            if(text) {
                clipboardData.setData("Text", text);
            } else {
                clipboardData.clearData("Text");
            }
        };
        ChangesView.prototype.viewSource = function (element) {
            var ruleElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element, ChangesView.RULE_CLASS);
            if(!ruleElement) {
                return;
            }
            var rule = this.getRuleForElement(ruleElement);
            if(rule && rule.hasFileLink) {
                this.navigateLink(rule);
            }
        };
        ChangesView.prototype.canViewSource = function (element) {
            var ruleElement = F12.DomExplorer.DomExplorerWindow.findDescendentByClass(element, ChangesView.RULE_CLASS);
            if(!ruleElement) {
                return false;
            }
            var rule = this.getRuleForElement(ruleElement);
            return rule ? rule.hasFileLink : false;
        };
        ChangesView.prototype.setupEventHandlers = function () {
            var _this = this;
            this.addHandler(this.listRoot, "click", [
                ChangesView.LINK_CLASS
            ], function (e) {
                var ruleElement = (e.target).nextElementSibling;
                _this.navigateLink(_this.getRuleForElement(ruleElement));
                return false;
            });
            this.addHandler(this.listRoot, "keydown", [
                Dom.ExpandingListView.HEADER_CLASS, 
                Dom.ExpandingListView.CHILD_VALUE_CONTAINER_CLASS
            ], function (e) {
                var element = e.target;
                var ctrlKey = e.ctrlKey && !e.shiftKey && !e.altKey;
                if(event.keyCode === Common.KeyCodes.C && ctrlKey) {
                    _this.copyObject(element);
                    return false;
                }
                var noKeys = !e.ctrlKey && !e.shiftKey && !e.altKey;
                if(_this.canViewSource(element) && (event.keyCode === Common.KeyCodes.Space || event.keyCode === Common.KeyCodes.Enter) && noKeys) {
                    _this.viewSource(element);
                    return false;
                }
                return true;
            });
        };
        return ChangesView;
    })(Dom.ExpandingListView);
    Dom.ChangesView = ChangesView;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/ChangesView/changesView.js.map

// eventsView.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var EventsView = (function (_super) {
        __extends(EventsView, _super);
        function EventsView(htmlElementSource, eventsViewDivId, defaultItemTemplateId, model, _documentOpener, alternateTemplates) {
                _super.call(this, htmlElementSource, eventsViewDivId, defaultItemTemplateId, model, function (uniqueId, expanded) {
        model.setCollapsedState(uniqueId, !expanded);
    }, alternateTemplates, null, "uniqueId", "eventName", function (newThing, oldThing) {
        return newThing.isDirty;
    }, function (newThing) {
        newThing.isDirty = false;
    });
            this._documentOpener = _documentOpener;
            this._focusSettingDivClickHandlerApplied = false;
            this._addKeyboardNavigationHandlersApplied = false;
            this.addEventHandlers();
        }
        EventsView._expandIconClass = ".BPT-ComputedStyle-ExpandIcon";
        EventsView._headerClass = "BPT-ExpandingList-Header";
        EventsView._propertyNameClass = "BPT-ComputedStyle-PropertyName";
        EventsView._propertyValueClass = "BPT-ComputedStyle-PropertyValue";
        EventsView._sourceValueContainerClass = "BPT-ComputedStyle-Source-Value-Container";
        EventsView.noResultsMessageId = "computedStylesNoResultsMessage";
        EventsView.prototype.collapseChange = function (uniqueId, expanded) {
            (this.model).setCollapsedState(uniqueId, expanded);
        };
        EventsView.prototype.addEventHandlers = function () {
            var _this = this;
            this.addHandler(this.listRoot, "click", [
                "BPT-Events-Handler-Link"
            ], function (e) {
                _this._documentOpener.openDocumentLinkFromEvent(e);
                return false;
            });
            this.addHandler(this.listRoot, "keydown", null, function (keyDownEvent) {
                var element = keyDownEvent.target;
                if((keyDownEvent.key === "Enter" || keyDownEvent.key == "Spacebar") && !keyDownEvent.ctrlKey && !keyDownEvent.shiftKey && !keyDownEvent.altKey) {
                    _this.openDocument(keyDownEvent);
                    return false;
                }
                return true;
            });
        };
        EventsView.prototype.openDocument = function (keyDownEvent) {
            if(keyDownEvent.target) {
                var linkElement = $m(keyDownEvent.target).children(".BPT-FileLink").get(0);
                this._documentOpener.openDocumentLinkFromElement(linkElement);
            }
        };
        return EventsView;
    })(Dom.ExpandingListView);
    Dom.EventsView = EventsView;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/eventsView.js.map

// tabItem.ts
var TabItem = (function () {
    function TabItem() { }
    TabItem.init = function init(item, selectedCallback) {
        item.addClass("BPT-Tab-Item");
        F12.Tools.Utility.Assert.areEqual(item.attr("role"), "tab", "Missing tab role");
        F12.Tools.Utility.Assert.areEqual(item.parent().attr("role"), "tablist", "Missing tablist role");
        item.bind("click focus", function () {
            var currentElement = item.parent().find(".BPT-Tab-Item[aria-selected='true']");
            if(currentElement.length > 0 && currentElement.get(0) !== item.get(0)) {
                currentElement.attr("aria-selected", "false");
            }
            if(item.attr("aria-selected") !== "true") {
                item.attr("aria-selected", "true");
            }
        });
        item.get(0).addEventListener("DOMAttrModified", function (evt) {
            if(evt.attrName === "aria-selected") {
                var isSelected = evt.newValue === "true";
                if(isSelected) {
                    item.attr("tabindex", "1");
                    selectedCallback();
                } else {
                    item.removeAttr("tabindex");
                }
            }
        });
    };
    TabItem.isActive = function isActive(query) {
        return query.attr("aria-selected") === "true";
    };
    return TabItem;
})();
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/tabItem.js.map

// horizontalPane.ts
var Dom;
(function (Dom) {
    var HorizontalPane = (function () {
        function HorizontalPane(container) {
            var _this = this;
            this._listeners = [];
            this._minPaneSize = 240;
            this._container = container;
            this._leftPane = this._container.children(".BPT-HorizontalPane-Left");
            this._rightPane = this._container.children(".BPT-HorizontalPane-Right");
            this._leftPane.addClass("BPT-Pane");
            this._rightPane.addClass("BPT-Pane");
            var windowWidth = window.outerWidth;
            this._curWidth = (windowWidth > 0 ? Math.max(300, (windowWidth / 100) * 30) : 300);
            this._divider = $m("<div>");
            this._divider.addClass("BPT-Pane-Divider");
            this._rightPane.parent().get(0).insertBefore(this._divider.get(0), this._rightPane.get(0));
            window.onresize = function () {
                _this.refreshPaneWidth();
            };
            this.refreshPaneWidth();
            this._divider.bind("mousedown", function (evt) {
                var prevCursor = document.body.style.cursor;
                document.body.style.cursor = "w-resize";
                var mouseMoveHandler, mouseUpHandler;
                mouseMoveHandler = function (evt) {
                    var dividerLoc = (_this._divider.get(0)).getBoundingClientRect().left;
                    _this.setPaneWidth(_this._rightPane.width() - evt.pageX + dividerLoc);
                };
                mouseUpHandler = function () {
                    $m(document).unbind("mousemove", mouseMoveHandler);
                    $m(document).unbind("mouseup", mouseUpHandler);
                    document.body.style.cursor = prevCursor;
                };
                $m(document).bind("mousemove", mouseMoveHandler);
                $m(document).bind("mouseup", mouseUpHandler);
                evt.stopImmediatePropagation();
                evt.preventDefault();
            });
        }
        Object.defineProperty(HorizontalPane.prototype, "leftWidth", {
            get: function () {
                return this._leftWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HorizontalPane.prototype, "rightWidth", {
            get: function () {
                return this._rightWidth;
            },
            enumerable: true,
            configurable: true
        });
        HorizontalPane.prototype.addResizeListener = function (listener) {
            if(this._listeners.indexOf(listener) < 0) {
                this._listeners.push(listener);
            }
        };
        HorizontalPane.prototype.refreshPaneWidth = function () {
            this.setPaneWidth(this._curWidth);
        };
        HorizontalPane.prototype.removeResizeListener = function (listener) {
            var index = this._listeners.indexOf(listener);
            if(index >= 0) {
                this._listeners.splice(index, 1);
            }
        };
        HorizontalPane.prototype.setPaneWidth = function (newWidth) {
            var _this = this;
            if(newWidth <= 0) {
                return;
            }
            this._curWidth = newWidth = Math.max(this._minPaneSize, newWidth);
            this._curWidth = newWidth = Math.round(this._curWidth);
            var paneSize = this._container.outerWidth(true);
            if(paneSize < this._minPaneSize * 2) {
                newWidth = paneSize >> 1;
            } else if(paneSize - newWidth < this._minPaneSize) {
                newWidth = paneSize - this._minPaneSize;
            }
            this._leftPane.css("width", "calc(100% - " + (newWidth + this._divider.width()) + "px)");
            this._rightPane.css("width", newWidth + "px");
            this._leftWidth = this._leftPane.outerWidth(false);
            this._rightWidth = this._rightPane.outerWidth(false);
            this._listeners.forEach(function (listener) {
                listener.onPaneResize(_this._leftWidth, _this._rightWidth);
            });
        };
        return HorizontalPane;
    })();
    Dom.HorizontalPane = HorizontalPane;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/horizontalPane.js.map

// valueEditor.ts
var Dom;
(function (Dom) {
    var ValueEditorKey = (function () {
        function ValueEditorKey(key, shiftKey, ctrlKey, altKey, metaKey) {
            if (typeof shiftKey === "undefined") { shiftKey = false; }
            if (typeof ctrlKey === "undefined") { ctrlKey = false; }
            if (typeof altKey === "undefined") { altKey = false; }
            if (typeof metaKey === "undefined") { metaKey = false; }
            this.key = key;
            this.shiftKey = shiftKey;
            this.ctrlKey = ctrlKey;
            this.altKey = altKey;
            this.metaKey = metaKey;
        }
        ValueEditorKey.EnterKey = new ValueEditorKey("Enter");
        ValueEditorKey.CtrlEnterKey = new ValueEditorKey("Enter", false, true);
        ValueEditorKey.TabKey = new ValueEditorKey("Tab");
        ValueEditorKey.ShiftTabKey = new ValueEditorKey("Tab", true);
        ValueEditorKey.EscapeKey = new ValueEditorKey("Esc");
        ValueEditorKey.UpKey = new ValueEditorKey("Up");
        ValueEditorKey.DownKey = new ValueEditorKey("Down");
        ValueEditorKey.ShiftUpKey = new ValueEditorKey("Up", true);
        ValueEditorKey.ShiftDownKey = new ValueEditorKey("Down", true);
        ValueEditorKey.ShiftF10Key = new ValueEditorKey("F10", true);
        ValueEditorKey.prototype.equalTo = function (other) {
            return this.key === other.key && this.shiftKey === other.shiftKey && this.ctrlKey === other.ctrlKey && this.altKey === other.altKey && this.metaKey === other.metaKey;
        };
        return ValueEditorKey;
    })();
    Dom.ValueEditorKey = ValueEditorKey;    
    var ValueEditor = (function () {
        function ValueEditor(_htmlElementSource, _domExplorer, _bridge, _view, _maxRows, _intellisenseContext, _oldValue) {
            if (typeof _maxRows === "undefined") { _maxRows = 1; }
            this._htmlElementSource = _htmlElementSource;
            this._domExplorer = _domExplorer;
            this._bridge = _bridge;
            this._view = _view;
            this._maxRows = _maxRows;
            this._intellisenseContext = _intellisenseContext;
            this._oldValue = _oldValue;
            this._exitKeys = [
                ValueEditorKey.EnterKey, 
                ValueEditorKey.TabKey, 
                ValueEditorKey.ShiftTabKey
            ];
            this._cancelKey = ValueEditorKey.EscapeKey;
            this._arrowKeys = [
                ValueEditorKey.UpKey, 
                ValueEditorKey.DownKey, 
                ValueEditorKey.ShiftUpKey, 
                ValueEditorKey.ShiftDownKey
            ];
            this.doTrim = true;
        }
        ValueEditor.prototype.addExitKeys = function () {
            var exitKeys = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                exitKeys[_i] = arguments[_i + 0];
            }
            this._exitKeys = this._exitKeys.concat(exitKeys);
        };
        ValueEditor.prototype.removeExitKeys = function () {
            var _this = this;
            var exitKeys = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                exitKeys[_i] = arguments[_i + 0];
            }
            exitKeys.forEach(function (key, index, exitKeys) {
                for(var i = 0; i < _this._exitKeys.length; i++) {
                    if(_this._exitKeys[i] === key) {
                        _this._exitKeys.splice(i, 1);
                        break;
                    }
                }
            });
        };
        ValueEditor.prototype.enableNumericChanges = function () {
            this._isNumericArrowsEnabled = true;
        };
        ValueEditor.prototype.enableTabsInData = function () {
            this.removeExitKeys(Dom.ValueEditorKey.TabKey, Dom.ValueEditorKey.ShiftTabKey);
            this._allowTabs = true;
        };
        ValueEditor.prototype.enableCommitOnChange = function () {
            this._isCommitOnChangeEnabled = true;
        };
        ValueEditor.prototype.show = function (element, width, onCommit, onExit) {
            var _this = this;
            this._element = element;
            this._onCommit = onCommit;
            this._onExit = onExit;
            this._dragElements = [];
            this._textBox = this._htmlElementSource.createElement("textarea");
            this._textBox.type = "text";
            this._textBox.classList.add("BPT-EditBox");
            this._textBox.setAttribute("role", "textbox");
            this._textBox.setAttribute("spellcheck", "false");
            this._textBox.setAttribute("aria-label", element.getAttribute("aria-label"));
            if(this._maxRows === 1) {
                this._textBox.rows = 1;
            }
            var parent = element.parentNode;
            while(parent) {
                if(parent.draggable) {
                    this._dragElements.push(parent);
                    parent.draggable = false;
                }
                parent = parent.parentNode;
            }
            var style = this._view.getComputedStyle(element);
            this._textBox.style.fontFamily = style.fontFamily;
            this._textBox.style.fontSize = style.fontSize;
            this._textBox.style.fontWeight = style.fontWeight;
            this._textBox.style.fontStyle = style.fontStyle;
            this._textBox.style.lineHeight = style.lineHeight;
            this._textBox.style.width = (width || element.offsetWidth + 10) + "px";
            this._textBox.style.overflowX = "hidden";
            this._markActiveElements = F12.DomExplorer.DomExplorerWindow.findAllAncestorsByClass(element, "BPT-EditBox-MarkActive");
            this._markActiveElements.forEach(function (element) {
                element.classList.add("BPT-EditBox-Active");
            });
            var parent = this._element.parentElement;
            this._originalOverflow = parent.style.overflow;
            parent.style.overflow = "visible";
            this._originalMaxHeight = parent.style.maxHeight;
            this._textBox.rows = 1;
            ValueEditor.replace(this._element, this._textBox);
            var range = this._textBox.createTextRange();
            var lineHeight = range.boundingHeight;
            this._textBox.value = this._lastCommitValue = this._originalValue = this._oldValue || this._element.textContent;
            this._updateHandler = function (evt) {
                if(_this._maxRows > 1) {
                    _this._textBox.rows = Math.max(Math.min(Math.ceil(_this._textBox.scrollHeight / lineHeight), _this._maxRows), 1);
                }
                _this._textBox.style.height = _this._textBox.rows * lineHeight + "px";
                if(_this._isCommitOnChangeEnabled) {
                    _this.checkForValueCommit(false);
                }
            };
            this._updateHandler();
            if(parent.classList.contains("BPT-EditBox-MaxHeightOverride")) {
                parent.style.maxHeight = this._maxRows * lineHeight + "px";
            }
            this._textBox.addEventListener("input", this._updateHandler);
            if(this._intellisenseContext) {
                this._intellisenseContext.initialize(this._textBox);
            }
            this._keyDownHandler = function (evt) {
                if(!_this.onKeyPress(evt)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            };
            this._textBox.addEventListener("keydown", this._keyDownHandler);
            this._textBox.addEventListener("mousedown", this.stopPropagationHandler);
            this._textBox.addEventListener("mouseup", this.stopPropagationHandler);
            this._textBox.addEventListener("click", this.stopPropagationHandler);
            this._textBox.addEventListener("dblclick", this.stopPropagationHandler);
            this._bridge.addEventListener("deactivated", (this._deactivatedHandler = this.deactivated.bind(this)));
            this._textBoxContextMenu = new Dom.TextControlMenuController(this._textBox);
            this._mouseWheelHandler = function (evt) {
                if(_this._isNumericArrowsEnabled) {
                    var changeAmount = evt.wheelDelta / 120;
                    if(evt.shiftKey) {
                        changeAmount *= 10;
                    }
                    _this.numericValueChange(changeAmount);
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            };
            this._textBox.addEventListener("mousewheel", this._mouseWheelHandler);
            if(this._intellisenseContext && this._isCommitOnChangeEnabled) {
                this._intellisenseContext.intellisenseMenu.onSelectionChanged = function (value) {
                    _this.checkForValueCommit(false, value.text);
                };
                this._intellisenseContext.intellisenseMenu.onClosing = function () {
                    _this.checkForValueCommit(false);
                };
            }
            this._mouseDownHandler = function (evt) {
                if(evt.target !== _this._textBox) {
                    if(toolwindowHelpers.isContextMenuUp()) {
                        return;
                    }
                    var htmlElementTarget = evt.target;
                    var htmlElementTargetParent = htmlElementTarget.parentElement;
                    if(htmlElementTarget.className === "intellisenseListBox" || (htmlElementTargetParent && htmlElementTargetParent.className === "intellisenseListBox")) {
                        return;
                    }
                    if(_this.shouldContinueEdit && _this.shouldContinueEdit(evt.target)) {
                        return;
                    }
                    _this.completeEdit(false);
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            };
            this._htmlElementSource.addEventListener("mousedown", this._mouseDownHandler);
            this._doubleClickHandler = function (evt) {
                var htmlElementTarget = evt.target;
                _this.completeEdit(false);
            };
            this._htmlElementSource.addEventListener("dblclick", this._doubleClickHandler);
            this._textBox.select();
            this._textBox.focus();
        };
        ValueEditor.replace = function replace(element, replaceWith) {
            var parent = element.parentElement;
            if(parent) {
                var nextSibling = element.nextSibling;
                parent.removeChild(element);
                if(nextSibling) {
                    parent.insertBefore(replaceWith, nextSibling);
                } else {
                    parent.appendChild(replaceWith);
                }
            }
        };
        ValueEditor.prototype.stopPropagationHandler = function (evt) {
            evt.stopPropagation();
            Plugin.ContextMenu.dismissAll();
        };
        ValueEditor.prototype.setValue = function (text, start, end) {
            var range = this._textBox.createTextRange();
            var useUndo = range.queryCommandSupported("ms-beginUndoUnit");
            if(useUndo) {
                range.execCommand("ms-beginUndoUnit");
            }
            range.moveStart("character", start);
            range.moveEnd("character", end - this._textBox.value.length);
            range.text = text;
            if(useUndo) {
                range.execCommand("ms-endUndoUnit");
            }
        };
        ValueEditor.prototype.checkForValueCommit = function (isCancel, newValue) {
            if(newValue === undefined) {
                newValue = isCancel ? this._originalValue : this._textBox.value;
                if(this.doTrim) {
                    newValue = newValue.trim();
                }
            }
            if(this._lastCommitValue !== newValue) {
                this._lastCommitValue = newValue;
                if(this._onCommit) {
                    this._onCommit(newValue, this._originalValue);
                }
                if(!this._oldValue) {
                    this._element.textContent = newValue;
                }
            }
        };
        ValueEditor.prototype.deactivated = function () {
            this.completeEdit(true);
        };
        ValueEditor.prototype.completeEdit = function (isCancel, exitKey) {
            if(this._element) {
                this.checkForValueCommit(isCancel);
                if(this._intellisenseContext) {
                    this._intellisenseContext.uninitialize();
                }
                var parent = this._textBox.parentElement;
                if(parent && parent.style) {
                    parent.style.overflow = this._originalOverflow;
                    if(parent.classList.contains("BPT-EditBox-MaxHeightOverride")) {
                        parent.style.maxHeight = this._originalMaxHeight;
                    }
                }
                ValueEditor.replace(this._textBox, this._element);
                this._element = null;
                this._markActiveElements.forEach(function (element) {
                    element.classList.remove("BPT-EditBox-Active");
                });
                this._textBox.removeEventListener("keydown", this._keyDownHandler);
                this._textBox.removeEventListener("input", this._updateHandler);
                this._textBox.removeEventListener("mousedown", this.stopPropagationHandler);
                this._textBox.removeEventListener("mouseup", this.stopPropagationHandler);
                this._textBox.removeEventListener("click", this.stopPropagationHandler);
                this._textBox.removeEventListener("dblclick", this.stopPropagationHandler);
                this._textBox.removeEventListener("mousewheel", this._mouseWheelHandler);
                this._htmlElementSource.removeEventListener("mousedown", this._mouseDownHandler);
                this._htmlElementSource.removeEventListener("dblclick", this._doubleClickHandler);
                this._bridge.removeEventListener("deactivated", this._deactivatedHandler);
                this._textBoxContextMenu.uninitialize();
                var dragElements = this._dragElements;
                this._dragElements = [];
                for(var i = 0, end = dragElements.length; i < end; i++) {
                    dragElements[i].draggable = true;
                }
                if(this._onExit) {
                    this._onExit(this._lastCommitValue, this._originalValue, exitKey, isCancel);
                }
            }
        };
        ValueEditor.prototype.onKeyPress = function (evt) {
            if(this._element) {
                var key = new ValueEditorKey(evt.key, evt.shiftKey, evt.ctrlKey, evt.altKey, evt.metaKey);
                if(key.equalTo(ValueEditorKey.EscapeKey)) {
                    this.completeEdit(true, key);
                    return false;
                }
                for(var i = 0; i < this._exitKeys.length; i++) {
                    if(key.equalTo(this._exitKeys[i])) {
                        this.completeEdit(false, key);
                        return false;
                    }
                }
                if(this._allowTabs && (key.equalTo(Dom.ValueEditorKey.TabKey) || key.equalTo(Dom.ValueEditorKey.ShiftTabKey))) {
                    if(key.equalTo(Dom.ValueEditorKey.TabKey)) {
                        var start = this._textBox.selectionStart;
                        var end = this._textBox.selectionEnd;
                        this.setValue("\t", start, end);
                    }
                    return false;
                }
                if(this._isNumericArrowsEnabled && (!this._intellisenseContext || !this._intellisenseContext.intellisenseMenu.isOpen)) {
                    for(var i = 0; i < this._arrowKeys.length; i++) {
                        if(key.equalTo(this._arrowKeys[i])) {
                            var changeAmount = (key.shiftKey ? 10 : 1) * (key.key === "Up" ? 1 : -1);
                            if(this.numericValueChange(changeAmount)) {
                                return false;
                            }
                            break;
                        }
                    }
                }
            }
            return true;
        };
        ValueEditor.prototype.numericValueChange = function (changeAmount) {
            var caret = this._textBox.selectionStart;
            var match = this.findNumberAtCaret();
            if(match) {
                var length = match.length - match.extraLength;
                var num = length ? parseInt(this._textBox.value.substr(match.start, length)) : 0;
                var newNum = (num + changeAmount).toString();
                this.setValue(newNum, match.start, match.start + length);
                this._textBox.selectionStart = match.start;
                this._textBox.selectionEnd = match.start + newNum.length + match.extraLength;
                this.checkForValueCommit(false);
            }
            return !!match;
        };
        ValueEditor.prototype.findNumberAtCaret = function () {
            var start = this._textBox.selectionStart;
            var value = this._textBox.value;
            var match;
            var matchStart;
            var matchLength;
            var extraLength;
            var matched;
            var numberRegex = /^-?\d*(\.?\d*(%|[a-zA-Z]+)?)/;
            var digitRegex = /\d/;
            do {
                match = value.substr(start).match(numberRegex);
                matched = match && digitRegex.test(value.substr(start, match[0].length));
                if(matched) {
                    matchStart = start;
                    matchLength = match[0].length;
                    extraLength = match[1].length;
                }
                start--;
            }while(start >= 0 && (match && match[0].length || start === this._textBox.selectionStart - 1));
            if(matchLength) {
                return {
                    start: matchStart,
                    length: matchLength,
                    extraLength: extraLength
                };
            }
            ;
        };
        return ValueEditor;
    })();
    Dom.ValueEditor = ValueEditor;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/valueEditor.js.map

// tabPanes.ts
var TabPanes = (function () {
    function TabPanes(_bridge, _styleCache, _domExplorer) {
        this._bridge = _bridge;
        this._styleCache = _styleCache;
        this._domExplorer = _domExplorer;
        var _this = this;
        this.activeTab = null;
        this._scrollPositions = {
        };
        this._pseudoStatesToggle = document.getElementById("pseudoStatesToggle");
        this._pseudoStatesPanel = document.getElementById("pseudoStatesPanel");
        this._rightPane = document.getElementById("pane-right");
        this.installPseudoStateEvents();
        if(!TabPanes._pseudoStatesToggleTooltipOn) {
            TabPanes._pseudoStatesToggleTooltipOn = toolwindowHelpers.loadString("PseudoClassesButtonTooltipOn");
            TabPanes._pseudoStatesToggleTooltipOff = toolwindowHelpers.loadString("PseudoClassesButtonTooltipOff");
        }
        $m(this._pseudoStatesToggle).bind("click keydown", function (event) {
            if(event.type === "click" || event.keyCode === Common.KeyCodes.Enter || event.keyCode === Common.KeyCodes.Space) {
                _this.displayPseudoState(!_this._pseudoStatesToggle.classList.contains(TabPanes._toggleButtonOn));
                return false;
            }
            return true;
        });
        this._pseudoStatesToggleTooltip = TabPanes._pseudoStatesToggleTooltipOff;
        $m(this._pseudoStatesToggle).bind("mouseover", function (mouseEvent) {
            if(toolwindowHelpers.isContextMenuUp()) {
                return true;
            }
            Plugin.Tooltip.show({
                content: _this._pseudoStatesToggleTooltip
            });
            return false;
        });
        window.addEventListener("resize", function (event) {
            _this.setScrollHeight();
        });
    }
    TabPanes.pseudoStateList = [
        "hover", 
        "visited"
    ];
    TabPanes._styleListId = "styleList";
    TabPanes._styleRuleTemplateId = "styleRuleTemplate";
    TabPanes._winningStyleListId = "winningStylesList";
    TabPanes._winningStyleItemTemplateId = "winningStylesItemTemplate";
    TabPanes._eventsTemplateId = "eventsTemplate";
    TabPanes._eventsListId = "eventsList";
    TabPanes._eventsItemTemplateId = "eventsTemplate";
    TabPanes._changesListId = "changesList";
    TabPanes._changesItemTemplateId = "changesTemplate";
    TabPanes._toggleButtonOn = "BPT-ToolbarToggleButton-StateOn";
    Object.defineProperty(TabPanes.prototype, "tabLoadedCallback", {
        set: function (callback) {
            this._tabLoadedCallback = callback;
        },
        enumerable: true,
        configurable: true
    });
    TabPanes.prototype.executeCleanup = function () {
        this.storeScrollPosition();
        $m(".BPT-HorizontalPane-Right-Tab").hide().addClass("BPT-Tab-Inactive");
        if(this._cleanup) {
            this._cleanup();
            this._cleanup = null;
        }
    };
    TabPanes.prototype.onDetach = function () {
        this.displayPseudoState(false);
        this.executeCleanup();
    };
    TabPanes.prototype.clearLayoutAndStylesState = function () {
        $m(".BPT-HorizontalPane-Right-Content > .BPT-DataTree-Container").data("previousUid", "");
        this._styleCache.clearState();
        this._styleView && this._styleView.clearView();
        this.clearLayoutView();
    };
    TabPanes.prototype.clearState = function () {
        this.clearLayoutAndStylesState();
        this._winningStyleView && this._winningStyleView.clearView();
    };
    TabPanes.prototype.storeScrollPosition = function () {
        var scrollContainer = $m("#pane-right");
        this._scrollPositions[this.activeTab] = {
            left: scrollContainer.scrollLeft(),
            top: scrollContainer.scrollTop()
        };
    };
    TabPanes.prototype.restoreScrollPosition = function () {
        var scrollPosition = this._scrollPositions[this.activeTab];
        if(!scrollPosition) {
            scrollPosition = {
                left: 0,
                top: 0
            };
            this._scrollPositions[this.activeTab] = scrollPosition;
        }
        var scrollContainer = $m("#pane-right");
        scrollContainer.scrollLeft(scrollPosition.left);
        scrollContainer.scrollTop(scrollPosition.top);
    };
    TabPanes.prototype.applyRemoteStyleChanges = function (changes) {
        this._styleCache.applyChanges(changes);
        if(this.activeTab === "changesView" && this._changesView) {
            this._changesView.updateView();
        }
    };
    TabPanes.prototype.setHorizontalPane = function (horizontalPane) {
        horizontalPane.addResizeListener(this);
    };
    TabPanes.prototype.onPaneResize = function (leftWidth, rightWidth) {
        var tabItems = $m(".BPT-Tabbar > .BPT-Tab-Item");
        var itemCount = tabItems.length;
        var width = $m(".BPT-Tabbar").width();
        var element;
        if(!this._tabTextTotalWidth) {
            this._tabTextTotalWidth = 0;
            for(var i = 0; i < itemCount; i++) {
                element = tabItems.get(i);
                this._tabTextTotalWidth += element.scrollWidth + 1;
            }
        }
        var minPadding = itemCount * 6;
        var totalPadding = Math.max(width - this._tabTextTotalWidth, minPadding);
        var itemPadding = (Math.min((totalPadding / itemCount), 28) / 2);
        var labelWidth = ((width - itemPadding) / itemCount) + "px";
        for(var i = 0; i < itemCount; i++) {
            element = tabItems.get(i);
            element.style.maxWidth = labelWidth;
            element.style.paddingLeft = element.style.paddingRight = itemPadding + "px";
        }
    };
    TabPanes.prototype.showStyles = function (uid, tagName) {
        var _this = this;
        this.setActiveTab("stylesView", uid, tagName, {
            pseudo: true,
            allStyles: false
        }, function () {
            if(_this._styleView) {
                _this._styleView.clearView();
            }
        }, Common.TraceEvents.Dom_StylesTabLoad_Start);
        if(!uid || !tagName || (/^#/).test(tagName)) {
            if(this._styleView) {
                this._styleView.clearView();
            }
            this.onTabLoadComplete(Common.TraceEvents.Dom_StylesTabLoad_Stop);
            return;
        }
        if(!this._styleModel) {
            this._styleModel = new Dom.StyleModel(this._bridge, this._domExplorer, this._styleCache);
            this._styleModel.setLoadArgs([
                uid
            ]);
            this._styleView = new Dom.StyleView(this._domExplorer, this._bridge, document, TabPanes._styleListId, TabPanes._styleRuleTemplateId, this._styleModel, Plugin.Resources);
            this._styleView.renderViewCallback = function () {
                return _this.onTabLoadComplete(Common.TraceEvents.Dom_StylesTabLoad_Stop);
            };
        } else {
            this._styleModel.setLoadArgs([
                uid
            ]);
        }
        this._styleView.updateView();
    };
    TabPanes.prototype.getStyleModel = function () {
        return this._styleModel;
    };
    TabPanes.prototype.getStyleView = function () {
        return this._styleView;
    };
    TabPanes.prototype.showWinningStyles = function (uid, tagName) {
        var _this = this;
        if(!this._winningStyleModel) {
            this._winningStyleModel = new Dom.Wsp.Model(this._bridge, this._styleCache, toolwindowHelpers.createShortenedUrlText);
            this._winningStyleView = new Dom.Wsp.View(this._domExplorer, this._bridge, document, TabPanes._winningStyleListId, TabPanes._winningStyleItemTemplateId, this._winningStyleModel);
            this._winningStyleView.renderViewCallback = function () {
                return _this.onTabLoadComplete(Common.TraceEvents.Dom_ComputedTabLoad_Stop);
            };
        }
        this.setActiveTab("winningStylesView", uid, tagName, {
            pseudo: true,
            allStyles: true
        }, function () {
            if(_this._winningStyleView) {
                _this._winningStyleView.clearView();
            }
        }, Common.TraceEvents.Dom_ComputedTabLoad_Start);
        if(!uid || !tagName || (/^#/).test(tagName)) {
            this._winningStyleView.clearView();
            this.onTabLoadComplete(Common.TraceEvents.Dom_ComputedTabLoad_Stop);
            return;
        }
        this._winningStyleModel.setLoadArgs([
            uid
        ]);
        this._winningStyleView.updateView();
    };
    TabPanes.prototype.getWinningStyleModel = function () {
        return this._winningStyleModel;
    };
    TabPanes.prototype.getWinningStyleView = function () {
        return this._winningStyleView;
    };
    TabPanes.prototype.showLayout = function (uid, tagName) {
        var _this = this;
        var layoutView = $m("#layoutView");
        this.setActiveTab("layoutView", uid, tagName, {
            pseudo: true,
            allStyles: false
        }, function () {
            layoutView.attr("data-uid", "");
            layoutView.attr("data-tag", "");
        }, Common.TraceEvents.Dom_LayoutTabLoad_Start);
        if(!uid || !tagName || (/^#/).test(tagName)) {
            this.clearLayoutView();
            this.onTabLoadComplete(Common.TraceEvents.Dom_LayoutTabLoad_Stop);
            return;
        }
        $m("#layout-offset-layer").show();
        var previousUid = layoutView.attr("data-uid");
        var gleamRequired = uid === previousUid;
        layoutView.attr("data-uid", uid);
        layoutView.attr("data-tag", tagName);
        var gleamLayoutChange = F12.DomExplorer.gleamChange;
        this._bridge.channel.call(this._bridge.engine, "getComputedBox", [
            uid
        ], function (obj) {
            if(obj) {
                layoutView.find("[data-layoutProperty]").each(function (index) {
                    var element = $m(this);
                    var prop = element.attr("data-layoutProperty");
                    var value = obj[prop] == undefined ? "" : obj[prop] + "";
                    value = value.replace(/px$/, "");
                    if(gleamRequired && element.text() !== value) {
                        gleamLayoutChange(element);
                    }
                    element.text(value);
                });
            }
            _this.onTabLoadComplete(Common.TraceEvents.Dom_LayoutTabLoad_Stop);
        });
    };
    TabPanes.prototype.showEvents = function (uid, tagName) {
        var _this = this;
        this.setActiveTab("eventsView", uid, tagName, {
            pseudo: false,
            allStyles: false
        }, function () {
            if(_this._eventsView) {
                _this._eventsView.clearView();
            }
            _this._bridge.channel.call(_this._bridge.engine, "clearCurrentEventProxy", []);
        }, Common.TraceEvents.Dom_EventsTabLoad_Start);
        if(!uid || !tagName || (/^#/).test(tagName)) {
            if(this._eventsView) {
                this._eventsView.clearView();
            }
            this.onTabLoadComplete(Common.TraceEvents.Dom_EventsTabLoad_Stop);
            return;
        }
        if(!this._eventsModel) {
            this._eventsModel = new Dom.EventsModel(this._bridge.channel, this._bridge.engine, this._styleCache, toolwindowHelpers.createShortenedUrlText);
            this._eventsModel.setLoadArgs([
                uid
            ]);
            this._eventsView = new Dom.EventsView(document, TabPanes._eventsListId, TabPanes._eventsTemplateId, this._eventsModel, this._domExplorer);
            this._eventsModel.updateCallback = this._eventsView.renderView.bind(this._eventsView);
            this._eventsView.renderViewCallback = function () {
                return _this.onTabLoadComplete(Common.TraceEvents.Dom_EventsTabLoad_Stop);
            };
        } else {
            this._eventsModel.setLoadArgs([
                uid
            ]);
        }
        this._eventsView.updateView();
    };
    TabPanes.prototype.showChanges = function () {
        var _this = this;
        this.setActiveTab("changesView", null, null, {
            pseudo: false,
            allStyles: false
        }, function () {
            if(_this._changesView) {
                _this._changesView.clearView();
            }
        }, Common.TraceEvents.Dom_ChangesTabLoad_Start);
        if(!this._changesModel) {
            this._changesModel = new Dom.ChangesModel(this._bridge, this._domExplorer);
            this._changesView = new Dom.ChangesView(this._domExplorer, this._bridge, document, TabPanes._changesListId, TabPanes._changesItemTemplateId, this._changesModel, this._styleCache);
            this._changesView.renderViewCallback = function () {
                return _this.onTabLoadComplete(Common.TraceEvents.Dom_ChangesTabLoad_Stop);
            };
        }
        this._changesView.updateView();
    };
    TabPanes.prototype.getChangesModel = function () {
        return this._changesModel;
    };
    TabPanes.prototype.getChangesView = function () {
        return this._changesView;
    };
    TabPanes.prototype.isPseudoStatePanelAvailable = function () {
        return this._pseudoStatesToggle.getAttribute("data-show") === "true";
    };
    TabPanes.prototype.isPseudoStatePanelOpen = function () {
        return this._pseudoStatesPanel.getAttribute("data-show") === "true";
    };
    TabPanes.prototype.togglePseudoStatePanel = function () {
        if(this.isPseudoStatePanelAvailable()) {
            var oldState = this._pseudoStatesToggle.classList.contains(TabPanes._toggleButtonOn);
            if(oldState) {
                this._pseudoStatesToggle.classList.remove(TabPanes._toggleButtonOn);
            } else {
                this._pseudoStatesToggle.classList.add(TabPanes._toggleButtonOn);
            }
            var newState = !oldState;
            this.displayPseudoState(newState);
            return newState;
        }
    };
    TabPanes.prototype.isPseudoClassEnabled = function (pseudoClass) {
        var pseudoSelector = this._pseudoStatesPanel.querySelector(".BPT-PseudoSelector[data-name='" + pseudoClass + "']");
        if(pseudoSelector) {
            var checkbox = pseudoSelector.firstElementChild;
            return !checkbox.disabled;
        }
    };
    TabPanes.prototype.getPseudoClassState = function (pseudoClass) {
        if(this.isPseudoStatePanelAvailable() && !!this.isPseudoClassEnabled(pseudoClass)) {
            var pseudoSelector = this._pseudoStatesPanel.querySelector(".BPT-PseudoSelector[data-name='" + pseudoClass + "']");
            var checkbox = pseudoSelector.firstElementChild;
            return checkbox.checked;
        }
    };
    TabPanes.prototype.setPseudoClassState = function (pseudoClass, forceOn) {
        var _this = this;
        return new Plugin.Promise(function (completed, error) {
            if(!_this.isPseudoStatePanelAvailable()) {
                error(new Error("Pseudo state panel not available"));
            } else if(!_this.isPseudoClassEnabled(pseudoClass)) {
                error(new Error(pseudoClass + " state is unavailable for the current element"));
            } else {
                var pseudoSelector = _this._pseudoStatesPanel.querySelector(".BPT-PseudoSelector[data-name='" + pseudoClass + "']");
                var checkbox = pseudoSelector.firstElementChild;
                _this.tabLoadedCallback = completed;
                checkbox.click();
            }
        });
    };
    TabPanes.prototype.setActiveTab = function (tab, uid, tagName, show, cleanup, traceEvent) {
        var _this = this;
        if(traceEvent) {
            this.raiseTraceEvents(traceEvent);
        }
        this._currentUid = uid;
        this.executeCleanup();
        this.activeTab = tab;
        var container = $m("#" + tab).show().removeClass("BPT-Tab-Inactive");
        var showPseudo = show.pseudo && this._domExplorer.documentMode >= 7;
        var showOptions = showPseudo || show.allStyles;
        var optionsPanel = $m("#optionalButtonsPanel");
        if(showOptions) {
            optionsPanel.removeClass("BPT-OptionsPanel-Hidden");
        } else {
            optionsPanel.addClass("BPT-OptionsPanel-Hidden");
        }
        this.updatePseudoStates(showPseudo, tagName ? tagName.toLowerCase() : tagName);
        var allStylesButton = $m("#allWinningStylesButton");
        if(show.allStyles) {
            allStylesButton.show();
        } else {
            allStylesButton.hide();
        }
        this.restoreScrollPosition();
        this.setPaneLeftJustification();
        this._cleanup = function () {
            TabPanes.pseudoStateList.forEach(function (state) {
                var pseudoSelector = _this._pseudoStatesPanel.querySelector(".BPT-PseudoSelector[data-name='" + state + "']");
                var checkbox = pseudoSelector.firstElementChild;
                checkbox.checked = false;
            });
            cleanup();
        };
    };
    TabPanes.prototype.onTabLoadComplete = function (traceEvent) {
        toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsDomExplorerTabChanged);
        if(traceEvent) {
            this.raiseTraceEvents(traceEvent);
        }
        if(this._tabLoadedCallback) {
            this._tabLoadedCallback();
            this._tabLoadedCallback = null;
        }
    };
    TabPanes.prototype.setPaneLeftJustification = function () {
        var containerLeftEdge = (document.getElementsByClassName("BPT-Tab-Container")[0]).getBoundingClientRect().left;
        var dividerLocation = (document.getElementsByClassName("BPT-Pane-Divider")[0]).getBoundingClientRect().left;
        var offset = dividerLocation - containerLeftEdge + 3;
        $m(document.getElementById("pane-right")).css("left", offset + "px");
    };
    TabPanes.prototype.clearLayoutView = function () {
        var layoutView = $m("#layoutView");
        layoutView.find("[data-layoutProperty]").text("");
        $m("#layout-offset-layer").hide();
    };
    TabPanes.prototype.installPseudoStateEvents = function () {
        var _this = this;
        if(this._pseudoStatesPanel) {
            var list = this._pseudoStatesPanel.querySelectorAll(".BPT-PseudoCheckbox");
            for(var i = 0; i < list.length; i++) {
                list[i].addEventListener("change", function (evt) {
                    var element = evt.target;
                    var state = element.parentElement.getAttribute("data-name");
                    _this._bridge.channel.call(_this._bridge.engine, "setPseudoStyling", [
                        _this._currentUid, 
                        state, 
                        element.checked
                    ], function () {
                        _this._domExplorer.refreshCSSView();
                    });
                });
            }
        }
    };
    TabPanes.prototype.updatePseudoStates = function (show, tagName) {
        var _this = this;
        this._pseudoStatesToggle.setAttribute("data-show", show);
        if(show) {
            this.displayPseudoState(this._pseudoStatesToggle.classList.contains(TabPanes._toggleButtonOn));
            TabPanes.pseudoStateList.forEach(function (state) {
                var pseudoSelector = _this._pseudoStatesPanel.querySelector(".BPT-PseudoSelector[data-name='" + state + "']");
                var checkbox = pseudoSelector.firstElementChild;
                if(state === "visited" && tagName !== "a") {
                    checkbox.checked = false;
                    checkbox.disabled = true;
                    pseudoSelector.classList.add("BPT-PseudoSelector-Disabled");
                } else {
                    checkbox.disabled = false;
                    pseudoSelector.classList.remove("BPT-PseudoSelector-Disabled");
                    _this._bridge.channel.call(_this._bridge.engine, "getPseudoStyling", [
                        _this._currentUid, 
                        state
                    ], function (isSet) {
                        checkbox.checked = isSet;
                    });
                }
            });
        } else {
            this.displayPseudoState(false);
        }
    };
    TabPanes.prototype.displayPseudoState = function (showPanel) {
        this._pseudoStatesPanel.setAttribute("data-show", showPanel);
        this._pseudoStatesToggleTooltip = showPanel ? TabPanes._pseudoStatesToggleTooltipOff : TabPanes._pseudoStatesToggleTooltipOn;
        this._pseudoStatesToggle.setAttribute("aria-label", this._pseudoStatesToggleTooltip);
        this.setScrollHeight();
    };
    TabPanes.prototype.setScrollHeight = function () {
        this._rightPane.style.maxHeight = (this._rightPane.parentElement.clientHeight - this._rightPane.offsetTop) + "px";
    };
    TabPanes.prototype.raiseTraceEvents = function (traceEvents) {
        if(this._domExplorer) {
            this._domExplorer.raiseTraceEvents(traceEvents);
        }
    };
    return TabPanes;
})();
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/tabPanes.js.map

// domTree.ts
var Dom;
(function (Dom) {
    (function (EditMode) {
        EditMode._map = [];
        EditMode._map[0] = "none";
        EditMode.none = 0;
        EditMode._map[1] = "name";
        EditMode.name = 1;
        EditMode._map[2] = "value";
        EditMode.value = 2;
        EditMode._map[3] = "add";
        EditMode.add = 3;
    })(Dom.EditMode || (Dom.EditMode = {}));
    var EditMode = Dom.EditMode;
    ;
    var DomTree = (function () {
        function DomTree(_domExplorer, _bridge) {
            this._domExplorer = _domExplorer;
            this._bridge = _bridge;
            this._forceRefreshAttributes = [
                "style", 
                "class", 
                "id", 
                "checked", 
                "color", 
                "type", 
                "align", 
                "valign"
            ];
        }
        DomTree.prototype.expandToRemoteSelectedElement = function (adjustFocus) {
            if (typeof adjustFocus === "undefined") { adjustFocus = false; }
            var _this = this;
            this._bridge.channel.call(this._bridge.engine, "getParentChainForSelectedElement", [], function (chain) {
                _this.expandElementChain(chain, adjustFocus);
            });
        };
        DomTree.prototype.createHtmlTreeItems = function (parentElement, children, skipHandlers, virtualElementCount) {
            var _this = this;
            if(!children) {
                return;
            }
            var existingIdMap = {
            };
            var existingElements = parentElement.children(".BPT-HtmlTree-ChildCollection").children();
            for(var elementIndex = 0; elementIndex < existingElements.length; elementIndex++) {
                var uid = $m(existingElements.get(elementIndex)).attr("data-id");
                existingIdMap[uid] = true;
            }
            this.initializeIntellisenseProvider();
            for(var i = 0; i < children.length; i++) {
                children[i].text = children[i].text || "";
                if(!skipHandlers) {
                    this.addEventHandlers(parentElement, children[i].uid);
                }
                var id = children[i].uid;
                if(existingIdMap[id]) {
                    existingIdMap[id] = false;
                }
            }
            for(var removed in existingIdMap) {
                if(existingIdMap[removed]) {
                    this._bridge.channel.call(this._bridge.engine, "removeChildMappings", [
                        removed
                    ]);
                }
            }
            if(skipHandlers) {
                parentElement.data("forceShowAll", true);
            }
            return HtmlTreeView.addElements(parentElement, children, function (a, b, c, d) {
                return _this.expandCallback(a, b, c, d);
            }, function (a, b, c) {
                return _this.valueEditCallback(a, b, c);
            }, function (a, b, c) {
                return _this.selectCallback(a, b, c);
            }, true, true, virtualElementCount);
        };
        DomTree.prototype.addEventHandlers = function (parentElement, childUid) {
            this._bridge.channel.call(this._bridge.engine, "addTreeModifiedEvent", [
                childUid
            ]);
            this._bridge.channel.call(this._bridge.engine, "addAttrModifiedEvent", [
                childUid
            ]);
        };
        DomTree.prototype.initializeAttributeModifiedEvent = function () {
            var _this = this;
            var treeRoot = $m("#tree");
            this._bridge.channel.call(this._bridge.engine, "setupAttributeModifiedEvent", [
                function (modifications) {
                    var selected = HtmlTreeView.getSelected(treeRoot);
                    var parents = selected.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot");
                    var doRefresh = false;
                    var attrForcingRefresh;
                    modifications.forEach(function (attributeModification) {
                        var gleamAttributeChange = F12.DomExplorer.gleamChange;
                        var directParentElement = document.querySelector("div[data-id='" + attributeModification.uid + "']");
                        doRefresh = doRefresh || selected.attr("data-id") === attributeModification.uid;
                        if(!doRefresh) {
                            for(var i = 0; i < parents.length; i++) {
                                if((parents.get(i)).getAttribute("data-id") === attributeModification.uid) {
                                    doRefresh = true;
                                    break;
                                }
                            }
                        }
                        if(!attrForcingRefresh && doRefresh) {
                            if(_this._forceRefreshAttributes.indexOf(attributeModification.attrName) >= 0) {
                                attrForcingRefresh = attributeModification.attrName;
                            }
                        }
                        if(directParentElement) {
                            var directParent = $m(directParentElement);
                            var header = directParent.children(".BPT-HtmlTreeItem-Header");
                            var editbox = header.find(".BPT-EditBox[data-attrName='" + attributeModification.attrName + "']");
                            var attrNode;
                            if(attributeModification.attrChange === 3) {
                                if(editbox.length > 0) {
                                    editbox.trigger("valueRemoved");
                                } else {
                                    attrNode = header.find(".BPT-HTML-Attribute-Section[data-attrName='" + attributeModification.attrName + "']");
                                    attrNode.remove();
                                }
                            } else {
                                if(editbox.length > 0) {
                                    editbox.trigger("valueChanged", attributeModification.newValue);
                                } else {
                                    attrNode = header.find(".BPT-HTML-Attribute-Section[data-attrName='" + attributeModification.attrName + "']");
                                    var gleamChange = false;
                                    if(attrNode.length > 0) {
                                        attrNode = attrNode.find(".BPT-HTML-Value");
                                        if(attrNode.length) {
                                            var oldValue = attrNode.text();
                                            if(oldValue !== attributeModification.newValue) {
                                                attrNode.text(attributeModification.newValue);
                                                gleamChange = true;
                                            }
                                        }
                                    } else {
                                        var newAttribute = HtmlTreeView.addAttribute(directParent, attributeModification.attrName, attributeModification.newValue);
                                        attrNode = newAttribute.find(".BPT-HTML-Value");
                                        gleamChange = true;
                                    }
                                    if(gleamChange) {
                                        gleamAttributeChange(attrNode);
                                    }
                                }
                                if(TabItem.isActive($m("#layoutTabButton"))) {
                                    var activeElement = document.activeElement;
                                    if(activeElement && activeElement.classList && activeElement.classList.contains("BPT-EditBox")) {
                                        if($m("#layoutView .BPT-EditBox").length > 0) {
                                            doRefresh = false;
                                        }
                                    }
                                }
                            }
                        }
                    });
                    if(doRefresh) {
                        _this.refreshAfterAttributeChange(attrForcingRefresh || "", null);
                    }
                    toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsDomExplorerAttributeChanged);
                }            ]);
        };
        DomTree.prototype.initializeTreeModifiedEvent = function () {
            var _this = this;
            var treeRoot = $m("#tree");
            this._bridge.channel.call(this._bridge.engine, "setupTreeModifiedEvent", [
                function (modifiedNodes) {
                    modifiedNodes.forEach(function (obj) {
                        var treeHadFocus = !!document.querySelector("#tree :focus") && document.hasFocus();
                        var focusInTreeInput = treeHadFocus && HtmlTreeView.currentFocusOnInput() && document.activeElement;
                        var gleamTextChange = F12.DomExplorer.gleamChange;
                        var directParent = treeRoot.find(".BPT-HtmlTreeItem[data-id='" + obj.uid + "']");
                        function appendChildElement(newText) {
                            newText = newText || "";
                            var headerTextElement = directParent.find(".BPT-HTML-Text");
                            if(headerTextElement.length === 1) {
                                headerTextElement.text(newText);
                            } else {
                                headerTextElement.remove();
                                headerTextElement = $m("<span>").addClass("BPT-HTML-Text").text(newText);
                                directParent.find(".BPT-HtmlTreeItem-Header").children().first().append(headerTextElement);
                            }
                            gleamTextChange(headerTextElement);
                        }
                        var newText;
                        if(directParent.length > 0) {
                            if(HtmlTreeView.isExpanded(directParent)) {
                                if(obj.children) {
                                    var selectedParentOrChild = directParent.find(".BPT-HtmlTreeItem-Selected").length > 0;
                                    if(obj.children.length === 1 && !obj.children[0].tag && obj.children[0].text && obj.children[0].text.length < _this._domExplorer.maxInlineLength && !obj.children[0].text.match(/\n/g)) {
                                        newText = obj.children[0].text;
                                        obj.children = null;
                                        appendChildElement(newText);
                                        HtmlTreeView.toggle(directParent);
                                        HtmlTreeView.changeExpandableState(directParent, false);
                                        if(selectedParentOrChild) {
                                            HtmlTreeView.select(directParent);
                                        }
                                    } else {
                                        directParent.data("forceShowAll", false);
                                        _this.createHtmlTreeItems(directParent, obj.children, null, obj.childCount);
                                    }
                                } else {
                                    HtmlTreeView.toggle(directParent);
                                    HtmlTreeView.changeExpandableState(directParent, false);
                                    if(selectedParentOrChild) {
                                        HtmlTreeView.select(directParent);
                                    }
                                }
                            } else if(HtmlTreeView.isCollapsed(directParent)) {
                                if(!obj.children || obj.children.length === 0) {
                                    HtmlTreeView.changeExpandableState(directParent, false);
                                }
                            } else {
                                newText = obj.text;
                                var autoexpand = false;
                                if(obj.children && obj.children.length === 1 && !obj.children[0].tag && obj.children[0].text) {
                                    if(obj.children[0].text.length < _this._domExplorer.maxInlineLength && !obj.children[0].text.match(/\n/g)) {
                                        newText = obj.children[0].text;
                                        obj.children = null;
                                    } else {
                                        autoexpand = true;
                                    }
                                }
                                if(obj.children && obj.children.length === 0) {
                                    obj.children = null;
                                }
                                appendChildElement(newText);
                                HtmlTreeView.changeExpandableState(directParent, !!obj.children);
                                if(autoexpand) {
                                    HtmlTreeView.toggle(directParent);
                                }
                            }
                            _this._domExplorer.updateBreadcrumbs();
                        }
                        if(focusInTreeInput) {
                            HtmlTreeView.adjustTabindex();
                            (focusInTreeInput).focus();
                        } else if(treeHadFocus) {
                            HtmlTreeView.focusSelected();
                        } else {
                            HtmlTreeView.adjustTabindex();
                        }
                    });
                }            ]);
        };
        DomTree.prototype.isUnderEditableItem = function (element) {
            var badTags = [
                "#doctype", 
                "script", 
                "noscript", 
                "style"
            ];
            if(this._domExplorer.documentMode < 9) {
                badTags.push("#comment");
            }
            if(badTags.indexOf(element.attr("data-tag")) >= 0) {
                return false;
            }
            var parents = element.parents(".BPT-HtmlTreeItem");
            for(var i = 0; i < parents.length; i++) {
                var parentElement = parents.get(0);
                if(badTags.indexOf(parentElement.getAttribute("data-tag")) >= 0) {
                    return false;
                }
            }
            return true;
        };
        DomTree.prototype.editAttribute = function (uid, name, value, callback) {
            var _this = this;
            if(this._domExplorer.traceWriter) {
                this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_CommitEditAttribute_Start);
            }
            this._bridge.channel.call(this._bridge.engine, "editAttribute", [
                uid, 
                name, 
                value
            ], function (succeeded) {
                if(callback) {
                    callback(succeeded);
                }
                if(_this._domExplorer.traceWriter) {
                    _this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_CommitEditAttribute_Stop);
                }
            });
        };
        DomTree.prototype.removeAttribute = function (uid, name, callback) {
            this._bridge.channel.call(this._bridge.engine, "removeAttribute", [
                uid, 
                name
            ], callback);
        };
        DomTree.prototype.editTextRemote = function (uid, newText, callback) {
            this._bridge.channel.call(this._bridge.engine, "editText", [
                uid, 
                newText
            ], callback);
        };
        DomTree.prototype.editAttributeName = function (uid, nameElement, newAttributeElement) {
            var _this = this;
            var attributeSectionElement = this.findOwnerAttributeSection(nameElement);
            var parentElement = attributeSectionElement.closest(".BPT-HTML");
            var nextEditable = this.findNextEditableElement(attributeSectionElement, false);
            var previousEditable = this.findPreviousEditableElement(attributeSectionElement);
            var valueElement = nameElement.next(".BPT-HTML-Value");
            var value = valueElement.text();
            var valueEditor = new Dom.ValueEditor(document, this._domExplorer, this._bridge, window);
            valueEditor.shouldContinueEdit = this.shouldContinueEdit;
            var equalsKey = new Dom.ValueEditorKey("=");
            valueEditor.addExitKeys(equalsKey);
            var width = Math.min(Math.max(nameElement.width() + 30, 70), this.findWidthForTreeItem(nameElement));
            var editElement = $m("<span>").text(nameElement.text());
            editElement.attr("aria-label", Plugin.Resources.getString("/Common/EditAttributeNameAriaLabel"));
            nameElement.text("");
            nameElement.append(editElement);
            valueEditor.show(editElement.get(0), width, null, function (newName, oldName, exitKey, wasCancelled) {
                nameElement.text(wasCancelled ? oldName : newName);
                var isAttributeRemoved;
                if(!wasCancelled && !newName && !newAttributeElement) {
                    isAttributeRemoved = true;
                    _this.removeAttribute(uid, oldName, function (succeeded) {
                        if(succeeded || !value) {
                            attributeSectionElement.remove();
                            _this.refreshAfterAttributeChange(oldName, newName);
                        }
                    });
                } else if(!wasCancelled && newName.toLowerCase() !== oldName.toLowerCase()) {
                    newName = newName.toLowerCase();
                    var currentAttributes = attributeSectionElement.closest(".BPT-HTML").find(".BPT-HTML-Attribute");
                    var editValueElement = valueElement;
                    for(var i = 0; i < currentAttributes.length; i++) {
                        var otherElement = $m(currentAttributes.get(i));
                        if(otherElement.get(0) !== nameElement.get(0) && otherElement.text().toLowerCase() === newName) {
                            nameElement.text(oldName);
                            if(newAttributeElement) {
                                newAttributeElement.remove();
                            }
                            _this.editAttributeValue(uid, _this.findOwnerAttributeSection(otherElement));
                            return;
                        }
                    }
                    attributeSectionElement.attr("data-attrName", newName);
                    nameElement.text(newName);
                    _this._bridge.channel.call(_this._bridge.engine, "enableEditChaining");
                    _this.editAttribute(uid, newName, value, function (succeeded) {
                        if(succeeded) {
                            if(!newAttributeElement) {
                                _this.removeAttribute(uid, oldName);
                            }
                            _this.refreshAfterAttributeChange(oldName, newName);
                        } else {
                            if(oldName) {
                                attributeSectionElement.attr("data-attrName", oldName);
                                nameElement.text(oldName);
                            }
                        }
                        _this._bridge.channel.call(_this._bridge.engine, "disableEditChaining");
                    });
                } else if(newAttributeElement) {
                    isAttributeRemoved = true;
                    newAttributeElement.remove();
                } else {
                    nameElement.text(oldName);
                }
                var moveTo;
                var mode = EditMode.none;
                if(!wasCancelled && exitKey && !exitKey.equalTo(Dom.ValueEditorKey.EnterKey)) {
                    if(exitKey.equalTo(Dom.ValueEditorKey.ShiftTabKey)) {
                        moveTo = previousEditable;
                        mode = EditMode.value;
                    } else if(isAttributeRemoved) {
                        moveTo = nextEditable;
                        mode = EditMode.name;
                    } else {
                        moveTo = attributeSectionElement;
                        mode = EditMode.value;
                    }
                }
                if(moveTo && moveTo.length) {
                    _this.moveEditor(moveTo, mode);
                } else if(parentElement.closest(".BPT-HtmlTreeItem").hasClass("BPT-HtmlTreeItem-Selected")) {
                    _this.resetFocusToContainerItem(parentElement);
                }
            });
        };
        DomTree.prototype.getCssClassesUsedInCurrentDocument = function (callback) {
            this._bridge.channel.call(this._bridge.engine, "getCssClassesUsedInCurrentDocument", [
                this._domExplorer.currentSelectedId
            ], function (args) {
                var cssClasses = args;
                var choices = [];
                for(var i = 0; i < cssClasses.length; i++) {
                    var cssClass = cssClasses[i];
                    choices.push(new Common.Intellisense.IntellisenseChoice(cssClass, cssClass));
                }
                callback(choices);
            });
        };
        DomTree.prototype.getEditAsHtmlText = function (uid, callback) {
            this._bridge.channel.call(this._bridge.engine, "getHTMLString", [
                uid, 
                false
            ], callback);
        };
        DomTree.prototype.setEditAsHtmlText = function (uid, text, callback) {
            var _this = this;
            if(this._domExplorer.traceWriter) {
                this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_CommitEditAsHtml_Start);
            }
            this._bridge.channel.call(this._bridge.engine, "replaceElement", [
                uid, 
                text
            ], function (succeeded) {
                if(callback) {
                    callback(succeeded);
                }
                if(_this._domExplorer.traceWriter) {
                    _this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_CommitEditAsHtml_Stop);
                }
            });
        };
        DomTree.prototype.editAsHtml = function (uid, editingElement, width) {
            var _this = this;
            if(this._domExplorer.traceWriter) {
                this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_EnterEditAsHtml_Start);
            }
            this.getEditAsHtmlText(uid, function (textToEdit) {
                var valueEditor = new Dom.ValueEditor(document, _this._domExplorer, _this._bridge, window, Number.MAX_VALUE, null, textToEdit);
                var extraExitKey = new Dom.ValueEditorKey("Enter", false, true);
                valueEditor.addExitKeys(extraExitKey);
                valueEditor.enableTabsInData();
                valueEditor.removeExitKeys(Dom.ValueEditorKey.EnterKey);
                valueEditor.shouldContinueEdit = _this.shouldContinueEdit;
                var element = editingElement.get(0);
                if(_this._domExplorer.traceWriter) {
                    _this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_EnterEditAsHtml_Stop);
                }
                valueEditor.show(element, width, null, function (newValue, oldValue, exitKey, wasCancelled) {
                    if(!wasCancelled && (oldValue !== newValue)) {
                        _this.resetFocusToContainerItem(editingElement.parent());
                        _this.setEditAsHtmlText(uid, newValue);
                    } else {
                        _this.resetFocusToContainerItem(editingElement);
                    }
                });
            });
        };
        DomTree.prototype.editAttributeValue = function (uid, attributeSection) {
            var _this = this;
            var valueContext = attributeSection.children(".BPT-HTML-Value");
            var attrName = attributeSection.attr("data-attrName");
            if(attrName === "class") {
                this.updateClassIntellisenseProvider();
                var intellisenseContext = new Common.Intellisense.IntellisenseContext(new Common.Intellisense.InputElementTextEditorBridge(), new Common.Intellisense.IntellisenseMenu("intellisenseListBox", null, null, 500, true), this._classIntellisenseProvider, this._bridge);
            }
            var itemWidth = this.findWidthForTreeItem(valueContext);
            var width = Math.min(Math.max(valueContext.width() + 30, 120), itemWidth);
            var valueEditor = new Dom.ValueEditor(document, this._domExplorer, this._bridge, window, width === itemWidth ? 3 : 1, intellisenseContext);
            valueEditor.shouldContinueEdit = this.shouldContinueEdit;
            var editElement = $m("<span>").text(valueContext.text());
            editElement.attr("aria-label", Plugin.Resources.getString("/Common/EditAttributeValueAriaLabel"));
            valueContext.text("");
            valueContext.append(editElement);
            valueEditor.show(editElement.get(0), width, function (newValue, oldValue) {
                _this.editAttribute(uid, attrName, newValue, function (succeeded) {
                    if(succeeded) {
                        _this.refreshAfterAttributeChange(_this.findNameForAttribute(attributeSection).text(), null);
                    }
                });
            }, function (newValue, oldValue, exitKey, wasCancelled) {
                valueContext.text(wasCancelled ? oldValue : newValue);
                var moveTo;
                var mode = EditMode.name;
                if(!wasCancelled && exitKey && !exitKey.equalTo(Dom.ValueEditorKey.EnterKey)) {
                    if(exitKey.equalTo(Dom.ValueEditorKey.TabKey)) {
                        moveTo = _this.findNextEditableElement(attributeSection, true);
                        if(!moveTo.length) {
                            moveTo = attributeSection;
                            mode = EditMode.add;
                        }
                    } else {
                        moveTo = attributeSection;
                    }
                }
                if(moveTo && moveTo.length) {
                    _this.moveEditor(moveTo, mode);
                } else if(valueContext.closest(".BPT-HtmlTreeItem").hasClass("BPT-HtmlTreeItem-Selected")) {
                    _this.resetFocusToContainerItem(valueContext);
                }
            });
        };
        DomTree.prototype.editNewAttribute = function (uid, element) {
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_AddAttribute_Start);
            var newAttribute = HtmlTreeView.addAttribute(element, "", "");
            this.editAttributeName(uid, this.findNameForAttribute(newAttribute), newAttribute);
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_AddAttribute_Stop);
        };
        DomTree.prototype.editFirstAttribute = function (uid, element) {
            var firstAttribute = this.findFirstAttribute(element);
            if(firstAttribute.length) {
                this.editAttributeName(uid, this.findNameForAttribute(firstAttribute));
            } else {
                this.editNewAttribute(uid, element);
            }
        };
        DomTree.prototype.resetFocusToContainerItem = function (element) {
            var elementInQuestion = element.get(0);
            var scrollContainer = F12.DomExplorer.DomExplorerWindow.findAncestorByClass(elementInQuestion, "BPT-HtmlTree-ScrollContainer");
            if(scrollContainer != null) {
                var saveScrollTop = scrollContainer.scrollTop;
                HtmlTreeView.select(element.closest(".BPT-HtmlTreeItem"));
                element.closest(".BPT-HtmlTree-Container").focus();
                scrollContainer.scrollTop = saveScrollTop;
                HtmlTreeView.focusSelected();
            }
        };
        DomTree.prototype.editText = function (uid, editingElement) {
            var _this = this;
            if(this.isUnderEditableItem(editingElement)) {
                var editor = new Dom.ValueEditor(document, this._domExplorer, this._bridge, window, 20);
                editor.shouldContinueEdit = this.shouldContinueEdit;
                editor.doTrim = false;
                editor.show(editingElement.get(0), this.findWidthForTreeItem(editingElement), function (newText, oldText) {
                    _this.editTextRemote(uid, newText);
                }, function (newText, oldText, exitKey, wasCancelled) {
                    var moveTo;
                    var mode = EditMode.none;
                    if(!wasCancelled && exitKey && !exitKey.equalTo(Dom.ValueEditorKey.EnterKey)) {
                        if(exitKey.equalTo(Dom.ValueEditorKey.TabKey)) {
                            moveTo = _this.findNextEditableElement(editingElement, false);
                            mode = EditMode.name;
                        } else {
                            moveTo = _this.findPreviousEditableElement(editingElement);
                            mode = EditMode.value;
                        }
                    }
                    if(moveTo && moveTo.length) {
                        _this.moveEditor(moveTo, mode);
                    } else {
                        _this.resetFocusToContainerItem(editingElement);
                    }
                });
            } else {
                this.resetFocusToContainerItem(editingElement);
            }
        };
        DomTree.prototype.valueEditCallback = function (parentElement, editingElement, ctrl) {
            var valueContext = null;
            var uid = parentElement.attr("data-id");
            if(ctrl) {
                var element = editingElement || parentElement;
                if(this._domExplorer.canDeleteItem(element)) {
                    var uid = parentElement.attr("data-id");
                    this.editAsHtml(uid, element, this._domExplorer.horizontalPane.leftWidth * .80);
                }
            } else {
                if(this.isUnderEditableItem(parentElement)) {
                    if(editingElement) {
                        if(editingElement.hasClass("BPT-HTML-Attribute")) {
                            this.editAttributeName(uid, editingElement);
                        } else if(editingElement.hasClass("BPT-HTML-Attribute-Section")) {
                            this.editAttributeValue(uid, editingElement);
                        } else if(editingElement.hasClass("BPT-HTML-Text")) {
                            this.editText(uid, editingElement);
                        }
                    } else {
                        var tag = parentElement.attr("data-tag");
                        if(tag === "#text") {
                            this.editText(uid, parentElement.find(".BPT-HTML-Text"));
                        } else if(tag !== "#comment" && tag !== "#doctype") {
                            this.editFirstAttribute(uid, parentElement);
                        }
                    }
                }
            }
        };
        DomTree.prototype.selectCallback = function (parentElement, id, tag) {
            var _this = this;
            if(this._domExplorer.currentSelectedId !== id) {
                if(this.tabRefreshTimeout) {
                    window.clearTimeout(this.tabRefreshTimeout);
                }
                var refreshTab = function () {
                    _this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_SelectElement_Start);
                    _this._domExplorer.tabPanes.clearState();
                    var parentId;
                    if(TabItem.isActive($m("#stylesTabButton"))) {
                        var doShowStyles = true;
                        if(tag === "#text") {
                            var selected = $m("div[data-id=" + id + "]");
                            var parentOfSelected = selected.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
                            if(parentOfSelected.length) {
                                parentId = parentOfSelected.attr("data-id");
                                _this._domExplorer.tabPanes.showStyles(parentId, parentOfSelected.attr("data-tag"));
                                doShowStyles = false;
                            }
                        }
                        if(doShowStyles) {
                            _this._domExplorer.tabPanes.showStyles(id, tag);
                        }
                    } else if(TabItem.isActive($m("#winningStylesTabButton"))) {
                        _this._domExplorer.tabPanes.showWinningStyles(id, tag);
                    } else if(TabItem.isActive($m("#layoutTabButton"))) {
                        _this._domExplorer.tabPanes.showLayout(id, tag);
                    } else if(TabItem.isActive($m("#eventsTabButton"))) {
                        _this._domExplorer.tabPanes.showEvents(id, tag);
                    }
                    _this._domExplorer.updateBreadcrumbs();
                    _this._domExplorer.showElementHighlight(parentId || id);
                    _this._bridge.channel.call(_this._bridge.engine, "storeElementForConsole", [
                        id
                    ]);
                    _this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_SelectElement_Stop);
                };
                this._domExplorer.currentSelectedId = id;
                if(!this.immediateTabRefresh) {
                    this.tabRefreshTimeout = window.setTimeout(refreshTab, 100);
                } else {
                    refreshTab();
                    this.immediateTabRefresh = false;
                }
            }
        };
        DomTree.prototype.expandElementChain = function (chain, adjustFocus) {
            if (typeof adjustFocus === "undefined") { adjustFocus = false; }
            var elements = [];
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_ExpandNode_Start);
            var end = Math.min(chain.length, HtmlTreeView.DOM_TREE_DEPTH_LIMIT);
            for(var i = 0; i < end; i++) {
                if(chain[i].children) {
                    var element = $m("div[data-id=" + chain[i].uid + "]");
                    this.createHtmlTreeItems(element, chain[i].children, true);
                    element.removeClass("BPT-HtmlTreeItem-Collapsed").addClass("BPT-HtmlTreeItem-Expanded");
                    element.attr("aria-expanded", "true");
                    elements.push({
                        element: element,
                        children: chain[i].children
                    });
                }
            }
            for(var index = 0; index < elements.length; index++) {
                for(var j = 0; j < elements[index].children.length; j++) {
                    this.addEventHandlers(elements[index].element, elements[index].children[j].uid);
                }
            }
            this.immediateTabRefresh = true;
            var selectUID = chain.pop().uid;
            var selectedElement = null;
            if(selectUID === "uid-selectchild") {
                selectUID = chain.pop().uid;
                selectedElement = $m("div[data-id=" + selectUID + "]");
                selectedElement = selectedElement.find(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
            } else {
                selectedElement = $m("div[data-id='" + selectUID + "']");
            }
            HtmlTreeView.select(selectedElement.closest(".BPT-HtmlTreeItem"), adjustFocus);
            toolwindowHelpers.scrollIntoView(selectedElement.get(0), selectedElement.closest(".BPT-HtmlTree-ScrollContainer").get(0));
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_ExpandNode_Stop);
        };
        DomTree.prototype.expandCallback = function (isExpanding, parentElement, id, onExpandComplete) {
            var _this = this;
            if(isExpanding) {
                var showAll = parentElement.data("forceShowAll");
                var result = [];
                if(showAll) {
                    var loadingDiv = $m("<span>").addClass("BPT-HtmlTree-ChildCollection-ShowAll").addClass("BPT-HtmlTreeItem");
                    loadingDiv.text(toolwindowHelpers.loadString("LoadingText", null));
                    parentElement.children(".BPT-HtmlTreeItem-Footer").prepend(loadingDiv);
                }
                this._bridge.channel.call(this._bridge.engine, "getChildren", [
                    id, 
                    showAll, 
                    function (chunk) {
                        result.push.apply(result, chunk.children);
                        if(chunk.chunkNumber + 1 === chunk.chunkCount) {
                            _this.renderChildren(result, chunk.totalChildCount, parentElement, onExpandComplete);
                            result = [];
                            if(loadingDiv) {
                                loadingDiv.remove();
                            }
                        }
                    }                ]);
            } else {
                this._domExplorer.raiseTraceEvents(Common.TraceEvents.Dom_CollapseElement_Start);
                this._bridge.channel.call(this._bridge.engine, "removeChildMappings", [
                    id
                ], function () {
                    if(_this._domExplorer.expandCallback) {
                        _this._domExplorer.expandCallback(parentElement.get(0), false);
                    }
                    _this._domExplorer.raiseTraceEvents(Common.TraceEvents.Dom_CollapseElement_Stop);
                });
            }
        };
        DomTree.prototype.initializeIntellisenseProvider = function () {
            this._classIntellisenseProvider = new Common.Intellisense.StaticContentProvider();
            this.updateClassIntellisenseProvider();
        };
        DomTree.prototype.updateClassIntellisenseProvider = function () {
            var _this = this;
            this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_Intellisense_Start);
            this.getCssClassesUsedInCurrentDocument(function (choices) {
                _this._classIntellisenseProvider.choices = choices;
                _this._domExplorer.traceWriter.raiseEvent(Common.TraceEvents.Dom_Intellisense_Stop);
            });
        };
        DomTree.prototype.findFirstAttribute = function (element) {
            return element.children(".BPT-HtmlTreeItem-Header").find(".BPT-HTML-Attribute-Section").first();
        };
        DomTree.prototype.findEmbeddedText = function (element) {
            return element.children(".BPT-HtmlTreeItem-Header").find(".BPT-HTML > .BPT-HTML-Text");
        };
        DomTree.prototype.findNextAttribute = function (element) {
            return element.next(".BPT-HTML-Attribute-Section");
        };
        DomTree.prototype.findPreviousAttribute = function (element) {
            return element.prev(".BPT-HTML-Attribute-Section");
        };
        DomTree.prototype.areAttributesEditable = function (element) {
            return this.isUnderEditableItem(element) && !/^#/.test(element.attr("data-tag"));
        };
        DomTree.prototype.findNextEditableElement = function (element, onlyAttributes) {
            var newElement = this.findNextAttribute(element);
            if(!onlyAttributes && !newElement.length) {
                var emptyElement = newElement;
                newElement = element;
                var startElement = this.findOwnerItem(element).get(0);
                do {
                    if(!newElement.hasClass("BPT-HTML-Text") && this.isUnderEditableItem(newElement)) {
                        var textElement = this.findEmbeddedText(this.findOwnerItem(newElement));
                        if(textElement.length) {
                            return textElement;
                        }
                    }
                    newElement = HtmlTreeView.findNextElementDown(newElement.closest(".BPT-HtmlTreeItem"));
                    if(newElement.length && newElement.get(0) === startElement) {
                        return emptyElement;
                    }
                    if(!newElement.length) {
                        newElement = HtmlTreeView.first;
                    }
                }while(newElement.length && !this.areAttributesEditable(newElement));
            }
            return newElement;
        };
        DomTree.prototype.findPreviousEditableElement = function (element) {
            var newElement = this.findPreviousAttribute(element);
            if(!newElement.length) {
                var emptyElement = newElement;
                var owner = this.findOwnerItem(element);
                newElement = owner.attr("data-tag") === "#text" ? owner : element;
                var startElement = this.findOwnerItem(element).get(0);
                do {
                    if(newElement.hasClass("BPT-HTML-Text")) {
                        newElement = this.findOwnerItem(element);
                    } else {
                        newElement = HtmlTreeView.findNextElementUp(newElement.closest(".BPT-HtmlTreeItem"));
                        if(newElement.length && newElement.get(0) === startElement) {
                            return emptyElement;
                        }
                        if(newElement.length && this.isUnderEditableItem(newElement)) {
                            var textElement = this.findEmbeddedText(newElement);
                            if(textElement.length) {
                                return textElement;
                            }
                        }
                    }
                    if(!newElement.length) {
                        newElement = HtmlTreeView.last;
                    }
                }while(newElement.length && !this.areAttributesEditable(newElement));
            }
            return newElement;
        };
        DomTree.prototype.findOwnerAttributeSection = function (element) {
            return element.closest(".BPT-HTML-Attribute-Section");
        };
        DomTree.prototype.findOwnerItem = function (element) {
            return element.closest(".BPT-HtmlTreeItem");
        };
        DomTree.prototype.findNameForAttribute = function (element) {
            return element.find(".BPT-HTML-Attribute");
        };
        DomTree.prototype.findValueForAttribute = function (element) {
            return element.find(".BPT-HTML-Value");
        };
        DomTree.prototype.moveEditor = function (element, mode) {
            var _this = this;
            window.setTimeout(function () {
                var item = _this.findOwnerItem(element);
                HtmlTreeView.select(item);
                var uid = item.attr("data-id");
                if(element.hasClass("BPT-HTML-Attribute-Section")) {
                    if(mode === EditMode.value) {
                        _this.editAttributeValue(uid, element);
                    } else if(mode === EditMode.add) {
                        _this.editNewAttribute(uid, _this.findOwnerItem(element));
                    } else {
                        _this.editAttributeName(uid, _this.findNameForAttribute(element));
                    }
                } else if(element.hasClass("BPT-HTML-Text")) {
                    _this.editText(uid, element);
                } else {
                    var tag = element.attr("data-tag");
                    if(tag === "#text") {
                        _this.editText(uid, element.find(".BPT-HTML-Text"));
                    } else if(mode === EditMode.name) {
                        _this.editFirstAttribute(uid, element);
                    } else {
                        _this.editNewAttribute(uid, element);
                    }
                }
            }, 0);
        };
        DomTree.prototype.findWidthForTreeItem = function (element) {
            var item = element.closest(".BPT-HtmlTreeItem-Header");
            var compStyle = window.getComputedStyle(item.get(0), null);
            var borderWidth = parseInt(compStyle.borderLeftWidth, 10) + parseInt(compStyle.borderRightWidth, 10);
            return item.width() - borderWidth;
        };
        DomTree.prototype.refreshAfterAttributeChange = function (oldName, newName) {
            if(this._forceRefreshAttributes.indexOf(newName) >= 0 || this._forceRefreshAttributes.indexOf(oldName) >= 0) {
                this._domExplorer.refreshCSSView(newName === "style" || oldName === "style");
            } else {
                if((oldName && oldName.indexOf("on") === 0) || (newName && newName.indexOf("on") === 0)) {
                    this._domExplorer.refreshEventsView();
                }
                this._domExplorer.updateBreadcrumbs(true);
            }
        };
        DomTree.prototype.shouldContinueEdit = function (htmlElementTarget) {
            var htmlElementTargetParent = htmlElementTarget.parentElement;
            if(((htmlElementTarget.className.indexOf("BPT-HorizontalPane-Left") > -1) && (htmlElementTarget.className.indexOf("BPT-HtmlTree-ScrollContainer") > -1)) || (htmlElementTargetParent && (htmlElementTargetParent.className.indexOf("BPT-HorizontalPane-Left") > -1) && (htmlElementTargetParent.className.indexOf("BPT-HtmlTree-ScrollContainer") > -1))) {
                return true;
            }
            return false;
        };
        DomTree.prototype.renderChildren = function (children, totalCount, parentElement, onExpandComplete) {
            if(!children) {
                return;
            }
            var childGroup = this.createHtmlTreeItems(parentElement, children, false, totalCount);
            toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsTreeViewToggleEnd);
            if(onExpandComplete) {
                onExpandComplete(childGroup);
            }
            if(this._domExplorer.expandCallback) {
                this._domExplorer.expandCallback(parentElement.get(0), true);
            }
        };
        return DomTree;
    })();
    Dom.DomTree = DomTree;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/domTree.js.map

// styleChangeNotifier.ts
var Dom;
(function (Dom) {
    (function (StyleRuleChangeEvent) {
        StyleRuleChangeEvent._map = [];
        StyleRuleChangeEvent._map[0] = "uid";
        StyleRuleChangeEvent.uid = 0;
        StyleRuleChangeEvent._map[1] = "selector";
        StyleRuleChangeEvent.selector = 1;
        StyleRuleChangeEvent._map[2] = "addProperty";
        StyleRuleChangeEvent.addProperty = 2;
        StyleRuleChangeEvent._map[3] = "addRule";
        StyleRuleChangeEvent.addRule = 3;
        StyleRuleChangeEvent._map[4] = "remove";
        StyleRuleChangeEvent.remove = 4;
        StyleRuleChangeEvent._map[5] = "select";
        StyleRuleChangeEvent.select = 5;
        StyleRuleChangeEvent._map[6] = "change";
        StyleRuleChangeEvent.change = 6;
        StyleRuleChangeEvent._map[7] = "fileLinkTooltip";
        StyleRuleChangeEvent.fileLinkTooltip = 7;
    })(Dom.StyleRuleChangeEvent || (Dom.StyleRuleChangeEvent = {}));
    var StyleRuleChangeEvent = Dom.StyleRuleChangeEvent;
    (function (StylePropertyChangeEvent) {
        StylePropertyChangeEvent._map = [];
        StylePropertyChangeEvent._map[0] = "uid";
        StylePropertyChangeEvent.uid = 0;
        StylePropertyChangeEvent._map[1] = "name";
        StylePropertyChangeEvent.name = 1;
        StylePropertyChangeEvent._map[2] = "value";
        StylePropertyChangeEvent.value = 2;
        StylePropertyChangeEvent._map[3] = "isWinning";
        StylePropertyChangeEvent.isWinning = 3;
        StylePropertyChangeEvent._map[4] = "isEnabled";
        StylePropertyChangeEvent.isEnabled = 4;
        StylePropertyChangeEvent._map[5] = "isApplied";
        StylePropertyChangeEvent.isApplied = 5;
        StylePropertyChangeEvent._map[6] = "status";
        StylePropertyChangeEvent.status = 6;
        StylePropertyChangeEvent._map[7] = "clearSubproperties";
        StylePropertyChangeEvent.clearSubproperties = 7;
        StylePropertyChangeEvent._map[8] = "addSubproperty";
        StylePropertyChangeEvent.addSubproperty = 8;
        StylePropertyChangeEvent._map[9] = "select";
        StylePropertyChangeEvent.select = 9;
        StylePropertyChangeEvent._map[10] = "remove";
        StylePropertyChangeEvent.remove = 10;
        StylePropertyChangeEvent._map[11] = "change";
        StylePropertyChangeEvent.change = 11;
    })(Dom.StylePropertyChangeEvent || (Dom.StylePropertyChangeEvent = {}));
    var StylePropertyChangeEvent = Dom.StylePropertyChangeEvent;
    var StyleChangeNotifier = (function () {
        function StyleChangeNotifier(_listeners) {
            this._listeners = _listeners;
        }
        StyleChangeNotifier.CHANGE_BAR_ADD = "add";
        StyleChangeNotifier.CHANGE_BAR_REMOVE = "remove";
        StyleChangeNotifier.CHANGE_BAR_UPDATE = "update";
        StyleChangeNotifier.CHANGE_BAR_NONE = "";
        StyleChangeNotifier.prototype.notifyRuleChange = function (event, rule, arg) {
            this._listeners.forEach(function (listener) {
                listener.onRuleChange(event, rule, arg);
            });
        };
        StyleChangeNotifier.prototype.notifyPropertyChange = function (event, property, arg) {
            this._listeners.forEach(function (listener) {
                listener.onPropertyChange(event, property, arg);
            });
        };
        return StyleChangeNotifier;
    })();
    Dom.StyleChangeNotifier = StyleChangeNotifier;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/styleChangeNotifier.js.map

// styleRule.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var StyleRule = (function (_super) {
        __extends(StyleRule, _super);
        function StyleRule(_model, _listeners, _uid, wasCreatedInSession, isDeleted, _selectorText) {
                _super.call(this, _listeners);
            this._model = _model;
            this._listeners = _listeners;
            this._uid = _uid;
            this.wasCreatedInSession = wasCreatedInSession;
            this.isDeleted = isDeleted;
            this._selectorText = _selectorText;
            this.properties = [];
            if(!StyleRule._inheritedFromString) {
                StyleRule._inheritedFromString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("DOMExplorerInheritedFromText", "") : "";
            }
            if(!StyleRule._ariaChangeStateRemoveString) {
                StyleRule._ariaChangeStateRemoveString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateRemove") : "";
            }
            if(!StyleRule._ariaChangeStateAddString) {
                StyleRule._ariaChangeStateAddString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateAdd") : "";
            }
            if(!StyleRule._ariaChangeStateUpdateString) {
                StyleRule._ariaChangeStateUpdateString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateUpdate") : "";
            }
            this.updateChangeState();
        }
        Object.defineProperty(StyleRule.prototype, "ariaLabel", {
            get: function () {
                var result = "";
                result += this.ariaChangeStateString;
                if(this.isInherited) {
                    result += StyleRule._inheritedFromString + " ";
                    result += this.displayInheritedFrom + " : ";
                }
                if(this.parent) {
                    result += this.parent + " : ";
                }
                if(this.selectorText) {
                    result += this.selectorText + " ";
                }
                if(this.fileLinkText) {
                    result += " : " + this.fileLinkText;
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "isRule", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "isProperty", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "isSubProperty", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "container", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "uid", {
            get: function () {
                return this._uid;
            },
            set: function (value) {
                if(value != this._uid) {
                    var oldUid = this._uid;
                    this._model.remapRuleId(this, oldUid, value);
                    this.notifyRuleChange(Dom.StyleRuleChangeEvent.uid, this, value);
                    this._uid = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "selectorText", {
            get: function () {
                return this._selectorText;
            },
            set: function (value) {
                if(value != this._selectorText) {
                    this._selectorText = value;
                    this.notifyRuleChange(Dom.StyleRuleChangeEvent.selector, this, value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "formatForCopy", {
            get: function () {
                var text = (!this.isInlined ? this._selectorText + " " : "") + "{\r\n";
                if(this.parent) {
                    text = "/*" + this.parent + "*/\r\n" + text;
                }
                for(var i = 0; i < this.properties.length; i++) {
                    var property = this.properties[i];
                    if((property.isEnabled || property.status !== Dom.StylePropertyStatus.valid) && !property.isDeleted) {
                        if(property.isShorthand && property.isEnabledIndeterminate) {
                            property.properties.forEach(function (subproperty) {
                                if(subproperty.isEnabled) {
                                    text += "    " + subproperty.formatForCopy + "\r\n";
                                }
                            });
                        } else {
                            text += "    " + property.formatForCopy + "\r\n";
                        }
                    }
                }
                return text + "}\r\n";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "isNew", {
            get: function () {
                return Dom.ElementStyleModel.isNew(this._uid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "isEditable", {
            get: function () {
                return !this.isInlined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "isOriginal", {
            get: function () {
                return !this.isDeleted && (this.isInlined || this._selectorText === this.originalSelectorText);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "displayInheritedFrom", {
            get: function () {
                return this.target.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "ariaChangeStateString", {
            get: function () {
                switch(this.changeState) {
                    case Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE:
                        return Dom.StyleProperty._ariaChangeStateRemoveString;
                    case Dom.StyleChangeNotifier.CHANGE_BAR_ADD:
                        return Dom.StyleProperty._ariaChangeStateAddString;
                    case Dom.StyleChangeNotifier.CHANGE_BAR_UPDATE:
                        return Dom.StyleProperty._ariaChangeStateUpdateString;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "changeState", {
            get: function () {
                return this._changeState;
            },
            set: function (value) {
                if(this._changeState !== value) {
                    this._changeState = value;
                    this.notifyRuleChange(Dom.StyleRuleChangeEvent.change, this, value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleRule.prototype, "extendedChangeState", {
            get: function () {
                return this._extendedChangeState;
            },
            set: function (value) {
                if(this._extendedChangeState !== value) {
                    this._extendedChangeState = value;
                    this.notifyRuleChange(Dom.StyleRuleChangeEvent.change, this, value);
                }
            },
            enumerable: true,
            configurable: true
        });
        StyleRule.prototype.setOriginal = function (selectorText) {
            this.originalSelectorText = selectorText;
            this.updateChangeState();
        };
        StyleRule.prototype.addProperty = function (remoteProperty, doNotify, before) {
            if (typeof doNotify === "undefined") { doNotify = false; }
            var _this = this;
            var property;
            if(remoteProperty) {
                property = new Dom.StyleProperty(this._model, this._listeners, remoteProperty.wasCreatedInSession, remoteProperty.current, remoteProperty.original, remoteProperty.originalLonghand, remoteProperty.isApplied, remoteProperty.isWinning, remoteProperty.isDeleted, remoteProperty.status, remoteProperty.uid, this);
            } else {
                property = new Dom.StyleProperty(this._model, this._listeners, true, {
                    name: "",
                    value: "",
                    isImportant: false,
                    isEnabled: true
                }, null, null, true, true, false, "Valid", Dom.ElementStyleModel.createNewId(), this);
            }
            this._model.remapPropertyId(property, null, property.uid);
            var position = this.getPositionForRule(before);
            this.properties.splice(position, 0, property);
            if(doNotify) {
                this.notifyRuleChange(Dom.StyleRuleChangeEvent.addProperty, this, property);
            }
            if(remoteProperty) {
                remoteProperty.longhand.forEach(function (longhand) {
                    var subProperty = new Dom.StyleProperty(_this._model, _this._listeners, false, longhand.current, null, null, longhand.isApplied, longhand.isWinning, false, longhand.status, longhand.uid, _this);
                    property.addSubproperty(subProperty, doNotify);
                });
                property.lookupLonghandOriginals();
            }
            this.updateChangeState();
            return property;
        };
        StyleRule.prototype.recalculateWinning = function () {
            this.properties.forEach(function (property) {
                property.recalculateWinning();
            });
        };
        StyleRule.prototype.remove = function () {
            this.recalculateWinning();
            this._model.removeRule(this);
            this.notifyRuleChange(Dom.StyleRuleChangeEvent.remove, this);
        };
        StyleRule.prototype.removeProperty = function (property) {
            var properties = this.properties;
            property.clearSubproperties();
            for(var i = 0; i < properties.length; i++) {
                if(properties[i] == property) {
                    properties.splice(i, 1);
                    this._model.removeProperty(property);
                    this.updateChangeState();
                    return i;
                }
            }
            return -1;
        };
        StyleRule.prototype.revert = function () {
            var _this = this;
            if(this.wasCreatedInSession) {
                return this.commitDelete();
            } else {
                return new Plugin.Promise(function (completed, error) {
                    _this._model.editRuleRevert(_this._uid, function (result) {
                        if(result) {
                            _this.removeNewProperties();
                            _this.updateFromRemote(result);
                            completed(result);
                        } else {
                            error();
                        }
                    });
                });
            }
        };
        StyleRule.prototype.updateWinningProperty = function (propertyName, winningPropertyId) {
            this.properties.forEach(function (property) {
                property.updateWinning(propertyName, winningPropertyId);
            });
        };
        StyleRule.prototype.commitDelete = function () {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                if(_this.isNew) {
                    _this.remove();
                    completed();
                } else {
                    _this._model.editRuleDelete(_this._uid, function (remoteRule) {
                        if(remoteRule) {
                            _this.updateFromRemote(remoteRule);
                        } else {
                            _this.remove();
                        }
                        completed();
                    });
                }
            });
        };
        StyleRule.prototype.select = function () {
            this.notifyRuleChange(Dom.StyleRuleChangeEvent.select, this);
        };
        StyleRule.prototype.updateFromRemote = function (remoteRule) {
            this.uid = remoteRule.uid;
            this.isDeleted = remoteRule.isDeleted;
            if(!this.isInlined) {
                this.selectorText = remoteRule.selector;
                this.originalSelectorText = remoteRule.originalSelector;
            }
            for(var i = 0; i < this.properties.length; i++) {
                this.properties[i].updateFromRemote(remoteRule.properties[i]);
            }
            this.updateChangeState();
        };
        StyleRule.prototype.removeNewProperties = function () {
            var toRemove = [];
            this.properties.forEach(function (property) {
                if(property.wasCreatedInSession) {
                    toRemove.push(property);
                }
            });
            toRemove.forEach(function (property) {
                property.remove(false);
            });
        };
        StyleRule.prototype.commitSelector = function (selectorText) {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                if(selectorText != _this._selectorText) {
                    var self = _this;
                    if(_this.isNew) {
                        _this._selectorText = selectorText;
                        completed();
                    } else {
                        _this._model.editRuleSelector(_this._uid, selectorText, function (remoteRule) {
                            if(remoteRule) {
                                self.updateFromRemote(remoteRule);
                                completed();
                            } else {
                                self.notifyRuleChange(Dom.StyleRuleChangeEvent.selector, _this, _this._selectorText);
                                error();
                            }
                        });
                    }
                } else {
                    completed();
                }
            });
        };
        StyleRule.prototype.commitNewRule = function (property) {
            var _this = this;
            var position = this.getPositionForRule(this);
            return new Plugin.Promise(function (completed, error) {
                _this._model.addRule(_this._selectorText, property.name, property.value, property.isImportant, position, function (result) {
                    if(result && result.properties.length) {
                        _this.updateFromRemote(result);
                        completed();
                    } else {
                        error();
                    }
                });
            });
        };
        StyleRule.prototype.addRemoteProperty = function (name, value, isImportant) {
            var _this = this;
            this._model.addProperty(this.uid, name, value, isImportant, null, function (result) {
                if(result) {
                    var property = _this.addProperty(result, true);
                    property.recalculateWinning();
                }
            });
        };
        StyleRule.prototype.setExistingOrAddNewProperty = function (name, value, isImportant) {
            var property;
            for(var i = this.properties.length - 1; i >= 0; i--) {
                if(this.properties[i].name === name) {
                    property = this.properties[i];
                    break;
                }
            }
            if(property) {
                property.commitValue(value + (isImportant ? " !important" : ""));
            } else {
                this.addRemoteProperty(name, value, isImportant);
            }
        };
        StyleRule.prototype.updateChangeState = function () {
            if(this.isDeleted) {
                this.changeState = this.extendedChangeState = Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE;
            } else if(this.wasCreatedInSession) {
                this.changeState = this.extendedChangeState = Dom.StyleChangeNotifier.CHANGE_BAR_ADD;
            } else if(!this.isOriginal) {
                this.changeState = this.extendedChangeState = Dom.StyleChangeNotifier.CHANGE_BAR_UPDATE;
            } else {
                this.changeState = this.extendedChangeState = Dom.StyleChangeNotifier.CHANGE_BAR_NONE;
                for(var i = 0; i < this.properties.length; i++) {
                    var property = this.properties[i];
                    if(property.isApplied && property.changeState) {
                        this.extendedChangeState = Dom.StyleChangeNotifier.CHANGE_BAR_UPDATE;
                    }
                }
            }
        };
        StyleRule.prototype.getPositionForRule = function (selection) {
            var position = this.properties.length;
            if(selection) {
                for(var i = 0; i < this.properties.length; i++) {
                    if(this.properties[i].uid === selection.uid) {
                        position = i;
                        break;
                    }
                }
            }
            return position;
        };
        return StyleRule;
    })(Dom.StyleChangeNotifier);
    Dom.StyleRule = StyleRule;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/styleRule.js.map

// styleCache.ts
var Dom;
(function (Dom) {
    var StyleCache = (function () {
        function StyleCache(_bridge) {
            this._bridge = _bridge;
        }
        StyleCache.prototype.clearState = function () {
            this._cache = null;
        };
        StyleCache.prototype.updateView = function (uid, updateTabCallback) {
            var _this = this;
            if(!this._cache) {
                Dom.ElementStyleModel.create(this._bridge.engine, this._bridge.channel, uid, function (result) {
                    _this._cache = result;
                    updateTabCallback(result);
                });
            } else {
                updateTabCallback(this._cache);
            }
        };
        StyleCache.prototype.applyChanges = function (changes) {
            if(this._cache) {
                this._cache.applyChanges(changes);
            }
        };
        return StyleCache;
    })();
    Dom.StyleCache = StyleCache;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/styleCache.js.map

// app.ts
var F12;
(function (F12) {
    "use strict";
    (function (DomExplorer) {
        var DomExplorerApp = (function () {
            function DomExplorerApp() { }
            DomExplorerApp.prototype.main = function () {
                var _this = this;
                (Plugin).addEventListener("pluginready", function () {
                    try  {
                        if(Plugin) {
                            if(Plugin.Tooltip) {
                                Plugin.Tooltip.defaultTooltipContentToHTML = false;
                            }
                            var traceWriter = new Common.TraceWriter();
                            if((Plugin).F12) {
                                _this.bridge = new DomExplorer.IEBridge((Plugin).F12, window.external, traceWriter);
                            } else if((Plugin).VS) {
                                _this.bridge = new DomExplorer.VSBridge((Plugin).VS, traceWriter);
                            }
                        }
                        var traceWriter = new Common.TraceWriter();
                        _this.domExplorer = new DomExplorer.DomExplorerWindow(_this.bridge, traceWriter);
                        _this.domExplorer.initialize();
                        if(_this.onDomExplorerAppLoaded) {
                            _this.onDomExplorerAppLoaded();
                        }
                    } catch (ex) {
                        diagnosticOutput("Exception in window.onload: " + ex.toString(), ex.stack);
                    }
                });
            };
            return DomExplorerApp;
        })();
        DomExplorer.DomExplorerApp = DomExplorerApp;        
        DomExplorer.App = new DomExplorerApp();
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/app.js.map

// domExplorer.ts
function diagnosticOutput(s, stackTrace) {
    try  {
        var element = document.querySelector("#diagnostic-output");
        if(!element) {
            element = document.createElement("div");
            element.setAttribute("id", "diagnostic-output");
            element.innerHTML = "Diagnostic:";
            document.body.insertBefore(element, document.body.firstChild);
            element = document.querySelector("#diagnostic-output");
        }
        if(element) {
            var br = document.createElement("br");
            element.appendChild(br);
            var text = document.createTextNode(s);
            element.appendChild(text);
        }
        if(stackTrace) {
            var traceElement = document.querySelector("#diagnostic-trace");
            if(!traceElement) {
                traceElement = document.createElement("div");
                traceElement.setAttribute("id", "diagnostic-trace");
                traceElement.innerHTML = "StackTrace:";
                element.appendChild(traceElement);
                traceElement = document.querySelector("#diagnostic-trace");
            }
            if(traceElement) {
                element.innerHTML += "<br>" + stackTrace;
            }
        }
    } catch (ex) {
    }
}
var F12;
(function (F12) {
    (function (DomExplorer) {
        var Assert = F12.Tools.Utility.Assert;
        (function (SearchDirection) {
            SearchDirection._map = [];
            SearchDirection.next = 1;
            SearchDirection.previous = -1;
        })(DomExplorer.SearchDirection || (DomExplorer.SearchDirection = {}));
        var SearchDirection = DomExplorer.SearchDirection;
        var DomExplorerWindow = (function () {
            function DomExplorerWindow(bridge, traceWriter) {
                var _this = this;
                this._activatedFocusToken = Number.NaN;
                this._initializationErrorMessage = null;
                this._currentElementHighlightUid = "";
                this._temporaryElementHighlightUid = "";
                this._events = {
                };
                this.maxInlineLength = 70;
                this.currentSelectedId = "";
                this._bridge = bridge;
                this._traceWriter = traceWriter;
                this.traceWriter.raiseEvent(Common.TraceEvents.Dom_Window_Create_Start);
                this._state = "initializing";
                this._throttle = new Common.MessageThrottle();
                this.domTree = new Dom.DomTree(this, bridge);
                this._styleCache = new Dom.StyleCache(this._bridge);
                this.tabPanes = new TabPanes(this._bridge, this._styleCache, this);
                this._bridge.addEventListener("switchTab", function (e) {
                    return _this.switchTab(e.tabIndex);
                });
                if(Plugin.F12) {
                    var hostInfoChanged = function (info) {
                        var controls = (document.querySelector(".BPT-SearchBox-Border"));
                        if(controls) {
                            var scaledControlAreaWidth = info.controlAreaWidth * (screen.logicalXDPI / screen.deviceXDPI);
                            controls.style.marginRight = scaledControlAreaWidth + "px";
                        }
                    };
                    Plugin.F12.addEventListener("hostinfochanged", function (e) {
                        return hostInfoChanged(e);
                    });
                    hostInfoChanged(Plugin.F12.getHostInfo());
                }
            }
            DomExplorerWindow._breadcrumbsListId = "BreadcrumbsView";
            DomExplorerWindow._breadcrumbsTemplateId = "breadcrumbsTemplate";
            DomExplorerWindow._hiddenRootSelector = ".BPT-HtmlTreeItem-HiddenRoot";
            DomExplorerWindow._itemSelector = ".BPT-HtmlTreeItem";
            DomExplorerWindow.prototype.addEventListener = function (type, listener) {
                if(!this._events[type]) {
                    this._events[type] = [];
                }
                this._events[type].push(listener);
            };
            DomExplorerWindow.prototype.removeEventListener = function (type, listener) {
                var listeners = this._events[type];
                if(listeners) {
                    var i = listeners.indexOf(listener);
                    listeners.splice(i, 1);
                }
            };
            DomExplorerWindow.prototype.fireEventListener = function (type) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                var listeners = this._events[type];
                if(listeners) {
                    for(var i = 0, n = listeners.length; i < n; i++) {
                        var listener = listeners[i];
                        listener(args);
                    }
                }
            };
            DomExplorerWindow.prototype.onDomExplorerBeforeMenuLoaded = function () {
            };
            DomExplorerWindow.prototype.onDomExplorerMenuLoaded = function () {
            };
            Object.defineProperty(DomExplorerWindow.prototype, "traceWriter", {
                get: function () {
                    return this._traceWriter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DomExplorerWindow.prototype, "documentMode", {
                get: function () {
                    return this._currentDocMode;
                },
                enumerable: true,
                configurable: true
            });
            DomExplorerWindow.prototype.getPageUri = function () {
                return this._pageUri;
            };
            Object.defineProperty(DomExplorerWindow.prototype, "state", {
                get: function () {
                    return this._state;
                },
                enumerable: true,
                configurable: true
            });
            DomExplorerWindow.findAncestorByClass = function findAncestorByClass(element, className) {
                while(element) {
                    if(element.classList.contains(className)) {
                        return element;
                    }
                    element = element.parentElement;
                }
                return null;
            };
            DomExplorerWindow.findAllAncestorsByClass = function findAllAncestorsByClass(element, className) {
                var list = [];
                while(element) {
                    if(element.classList.contains(className)) {
                        list.push(element);
                    }
                    element = element.parentElement;
                }
                return list;
            };
            DomExplorerWindow.findDescendentByClass = function findDescendentByClass(element, className) {
                return element ? element.querySelector("." + className) : null;
            };
            DomExplorerWindow.findAllDescendentsByClass = function findAllDescendentsByClass(element, className) {
                return element ? element.querySelectorAll("." + className) : null;
            };
            DomExplorerWindow.detabify = function detabify(text, spacesPerTab) {
                if(spacesPerTab === undefined) {
                    spacesPerTab = 8;
                }
                var buffer = "";
                var nonTabChars = 0;
                var originalCharCount = text.length;
                for(var i = 0; i < originalCharCount; i++) {
                    var c = text.charAt(i);
                    if(c == "\t") {
                        buffer += Array(spacesPerTab - nonTabChars + 1).join(" ");
                    } else {
                        buffer += c;
                    }
                    nonTabChars = (c == "\n" || c == "\t") ? 0 : (nonTabChars + 1) % spacesPerTab;
                }
                return buffer;
            };
            DomExplorerWindow.prototype.temporaryShowElementHighlight = function (uid) {
                if(!uid) {
                    return;
                }
                this._temporaryElementHighlightUid = uid === this._currentElementHighlightUid ? "" : uid;
                this._bridge.channel.call(this._bridge.engine, "hoverItem", [
                    uid
                ]);
            };
            DomExplorerWindow.prototype.showElementHighlight = function (uid) {
                if(!uid) {
                    return;
                }
                this._currentElementHighlightUid = uid;
                this._temporaryElementHighlightUid = "";
                if(this._showlayoutButton.selected) {
                    this._bridge.channel.call(this._bridge.engine, "hoverItem", [
                        uid
                    ]);
                }
            };
            DomExplorerWindow.prototype.hideElementHighlight = function () {
                this._temporaryElementHighlightUid = "";
                if(this._state === "ready") {
                    this._bridge.channel.call(this._bridge.engine, "hideHoverItem", []);
                }
            };
            DomExplorerWindow.prototype.refreshElementHighlight = function () {
                if(this._currentElementHighlightUid && !this._temporaryElementHighlightUid) {
                    this.restoreElementHighlight();
                }
            };
            DomExplorerWindow.prototype.restoreElementHighlight = function () {
                this._temporaryElementHighlightUid = "";
                if(this._state === "ready") {
                    this._bridge.channel.call(this._bridge.engine, "hideHoverItem", []);
                    this.showElementHighlight(this._currentElementHighlightUid);
                }
            };
            DomExplorerWindow.prototype.initialize = function () {
                var _this = this;
                this._initializationErrorMessage = "";
                var loc = function (resourceId, params) {
                    return toolwindowHelpers.loadString(resourceId, params);
                };
                var logFn = function (x) {
                    diagnosticOutput("Issue in DomExplorer.initialize with selector: " + x.selector);
                };
                try  {
                    this._bridge.channel.addMessageProcessor("Throttle Messages", Common.MessageThrottle.splitMessage);
                    this._bridge.channel.addMessageHandler("Combine Messages", this._throttle.combineMessages.bind(this._throttle));
                    this._bridge.channel.addMessageHandler("Refresh Tree", this.handleRefreshTree.bind(this));
                    this._bridge.addEventListener("attach", this.onAttach.bind(this));
                    this._bridge.addEventListener("detach", this.onDetach.bind(this));
                    this._bridge.addEventListener("break", this.onBreak.bind(this));
                    this._bridge.addEventListener("run", this.onRun.bind(this));
                    this.onAttach();
                    toolwindowHelpers.registerErrorComponent("DomExplorerWindow", this.onError);
                    toolwindowHelpers.initializeToolWindow();
                    this.initializeTabs();
                    this.initializeToolbarButtons();
                    this.initializeGlobalCommands();
                    this.initializeLayoutButtons();
                    this.initializeContextMenus();
                    $m("#domToolLabel").text(loc("DomToolLabelText"));
                    $m("#selectElementByClick").bind("mouseover", function (e) {
                        return _this.showToolTip(loc("SelectElementButtonTooltip"));
                    });
                    $m("#showlayoutButton").bind("mouseover", function (e) {
                        return _this.showToolTip(loc("ShowLayoutBoxesButtonTooltipWithShortcut"));
                    });
                    $m("#refreshButton").bind("mouseover", function (e) {
                        return _this.showToolTip(loc("RefreshDomExplorerButtonTooltipWithShortcut"));
                    });
                    $m("#attributeNodeLabel > div > span:first-child").text(loc("AttributeNodeLabel"));
                    $m("#stylesTabButton").text(loc("StylesTabButtonText")).bind("mouseover", function (e) {
                        return _this.showToolTip(loc("StylesTabButtonTooltip"));
                    });
                    $m("#layoutTabButton").text(loc("LayoutTabButtonText")).bind("mouseover", function (e) {
                        return _this.showToolTip(loc("LayoutTabButtonTooltip"));
                    });
                    $m("#eventsTabButton").text(loc("EventsTabButtonText")).bind("mouseover", function (e) {
                        return _this.showToolTip(loc("EventsTabButtonTooltip"));
                    });
                    $m("#changesTabButton").text(loc("ChangesTabButtonText")).bind("mouseover", function (e) {
                        return _this.showToolTip(loc("ChangesTabButtonTooltip"));
                    });
                    $m("#findbox").placeholder(loc("DOMExplorerFindBoxHinting")).bind("mouseover", function (e) {
                        return _this.showToolTip(loc("DOMSearchBoxToolTip"));
                    });
                    $m("#searchNextResult").bind("mouseover", function (e) {
                        return _this.showToolTip(loc("DOMSearchNextButtonToolTip"));
                    });
                    $m("#searchNextResult").attr("aria-label", loc("DOMSearchNextButtonToolTip"));
                    $m("#searchPreviousResult").bind("mouseover", function (e) {
                        return _this.showToolTip(loc("DOMSearchPreviousButtonToolTip"));
                    });
                    $m("#searchPreviousResult").attr("aria-label", loc("DOMSearchPreviousButtonToolTip"));
                    $m("#pseudoStatesPanel [data-name='hover']").bind("mouseover", function (e) {
                        return _this.showToolTip(loc("PseudoClassHoverTooltip"));
                    });
                    $m("#pseudoStatesPanel [data-name='visited']").bind("mouseover", function (e) {
                        return _this.showToolTip(loc("PseudoClassVisitedTooltip"));
                    });
                    $m("#pseudoHoverLabel").text(loc("PseudoClassHover"));
                    $m("#pseudoVisitedLabel").text(loc("PseudoClassVisited"));
                    $m("#winningStylesTabButton").text(loc("ComputedStylesTabButtonText")).bind("mouseover", function (e) {
                        return _this.showToolTip(loc("ComputedStylesTabButtonTooltip"));
                    });
                    $m("#winningStylesFilterTextBox").placeholder(loc("DOMExplorerComputedStylesFilterTextBoxPlaceholder"));
                    $m("#winningStylesFilterTextBox").bind("mouseover", function (e) {
                        return _this.showToolTip(loc("DOMExplorerComputedStylesFilterTextBoxPlaceholder"));
                    });
                    $m("#winningStylesNoResultsMessage").text(loc("DOMExplorerComputedStylesNoResultsMessage"));
                    $m("*.BPT-HorizontalPane-Right-Tab").hide();
                    $m("#breadcrumbRightArrow").hide();
                    $m("#breadcrumbLeftArrow").hide();
                    $m("#searchPreviousResult").attr("disabled", "");
                    $m("#searchNextResult").attr("disabled", "");
                    if(window["lastScriptError"]) {
                        this.onError(window["lastScriptError"].message, window["lastScriptError"].file, window["lastScriptError"].line, window["lastScriptError"].additionalInfo);
                    }
                    this._bridge.addEventListener("activated", this.onActivated.bind(this));
                    this._bridge.addEventListener("deactivated", this.onDeactivated.bind(this));
                    if(Plugin.F12) {
                        Plugin.F12.addEventListener("profilingstarted", function (e) {
                            _this.onProfilingStateChange(true);
                        });
                        Plugin.F12.addEventListener("profilingstopped", function (e) {
                            _this.onProfilingStateChange(false);
                        });
                    }
                    if(Plugin.F12) {
                        Plugin.F12.TraceWriter.markToolReady();
                    }
                    this.traceWriter.raiseEvent(Common.TraceEvents.Dom_Window_Create_Stop);
                } catch (ex) {
                    diagnosticOutput("Exception during DomExplorer.initialize: " + ex.toString(), ex.stack);
                }
            };
            DomExplorerWindow.prototype.showToolTip = function (text) {
                var tooltipConfig = {
                    content: text
                };
                Plugin.Tooltip.show(tooltipConfig);
            };
            DomExplorerWindow.prototype.onAttach = function () {
                if(Plugin.F12 && Plugin.F12.Profiler.getIsProfiling()) {
                    this.onProfilingStateChange(true);
                    return;
                }
                this.traceWriter.raiseEvent(Common.TraceEvents.Dom_RemoteInjection_Start);
                try  {
                    var engineId = this._bridge.engine.engineId;
                    this._bridge.channel.loadScript(engineId, "../Common/messageThrottle.js");
                    this._bridge.channel.loadScript(engineId, "../common/isDebugBuild.js");
                    this._bridge.channel.loadScript(engineId, "../Common/assert.js");
                    this._bridge.channel.loadScript(engineId, "../Common/remoteHelpers.js");
                    this._bridge.channel.loadScript(engineId, "../Common/remoteEditStack.js");
                    this._bridge.channel.loadScript(engineId, "DomExplorerRemote.js");
                } catch (ex) {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Dom_RemoteInjection_Stop);
                    return;
                }
                this.traceWriter.raiseEvent(Common.TraceEvents.Dom_RemoteInjection_Stop);
            };
            DomExplorerWindow.prototype.onDetach = function () {
                this._currentDocMode = undefined;
                $m("#tree > :first-child > *").remove();
                $m(".BPT-DataTree-Container").each(function (index, item) {
                    DataTreeView.clear($m(item));
                });
                $m("#pane").hide();
                this.tabPanes.onDetach();
                $m("#layoutView[data-layoutProperty]").text("");
                $m(".BPT-ToolbarToggleButton:not(.BPT-BypassDisableReset)").removeClass("BPT-ToolbarToggleButton-StateOn");
                if(this._selectElementByClick) {
                    this._selectElementByClick.selected = false;
                    $m(".BPT-ToolbarButton").addClass("BPT-ToolbarButton-StateDisabled");
                    this._showlayoutButton.disabled = true;
                    this._selectElementByClick.disabled = true;
                }
                this._state = "detached";
            };
            DomExplorerWindow.prototype.onBreak = function () {
                this.stopSelectElementByClick();
                $m(".BPT-ToolbarButton").addClass("BPT-ToolbarButton-StateDisabled");
                this._showlayoutButton.disabled = true;
                this._selectElementByClick.disabled = true;
            };
            DomExplorerWindow.prototype.onRun = function () {
                if(this._currentDocMode >= 9) {
                    $m(".BPT-ToolbarButton").removeClass("BPT-ToolbarButton-StateDisabled");
                    this._showlayoutButton.disabled = false;
                    this._selectElementByClick.disabled = false;
                }
            };
            DomExplorerWindow.prototype.handleRefreshTree = function (message) {
                var refreshTreeMessage = "RefreshTree:";
                if(message.data.substr(0, refreshTreeMessage.length) === refreshTreeMessage) {
                    var connectionInfo = JSON.parse(message.data.substring(refreshTreeMessage.length));
                    var docMode = parseFloat(connectionInfo.docMode);
                    this._pageUri = connectionInfo.contextInfo;
                    this.populateTree(docMode);
                    toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsDomExplorerReady);
                    message.handled = true;
                }
            };
            DomExplorerWindow.prototype.onError = function (message, file, line, additionalInfo) {
                try  {
                    if(file) {
                        var parts = file.split("/");
                        if(parts.length > 0) {
                            file = parts[parts.length - 1];
                        }
                    }
                    var errorMessage = toolwindowHelpers.htmlEscape(toolwindowHelpers.loadString("DomExplorerScriptError")) + "<br/>" + toolwindowHelpers.htmlEscape(toolwindowHelpers.loadString("ScriptErrorMessage", [
                        message
                    ])) + "<br/>" + toolwindowHelpers.htmlEscape(toolwindowHelpers.loadString("ScriptErrorFile", [
                        file
                    ])) + "<br/>" + toolwindowHelpers.htmlEscape(toolwindowHelpers.loadString("ScriptErrorLine", [
                        line
                    ])) + "\r\n" + additionalInfo;
                    $m("#scriptErrorMessageText").html(errorMessage);
                    $m("#scriptErrorSection").show();
                    if(typeof this._initializationErrorMessage === "string") {
                        this._initializationErrorMessage += errorMessage;
                    }
                } catch (ex) {
                }
            };
            DomExplorerWindow.prototype.populateTree = function (docMode) {
                var refreshButton = $m("#refreshButton");
                this._currentDocMode = docMode;
                var eventsTabButton = document.getElementById("eventsTabButton");
                if(docMode < 9) {
                    refreshButton.removeClass("BPT-ToolbarButton-StateHidden");
                    eventsTabButton.style.display = "none";
                    if(eventsTabButton.classList.contains("BPT-TabCycle-Item")) {
                        eventsTabButton.classList.remove("BPT-TabCycle-Item");
                    }
                    document.getElementById("eventsView").style.display = "none";
                } else {
                    refreshButton.addClass("BPT-ToolbarButton-StateHidden");
                    eventsTabButton.style.display = "";
                    if(!eventsTabButton.classList.contains("BPT-TabCycle-Item")) {
                        eventsTabButton.classList.add("BPT-TabCycle-Item");
                    }
                    document.getElementById("eventsView").style.display = "";
                }
                this.refreshTree(this.domExplorerLoaded.bind(this));
            };
            DomExplorerWindow.prototype.refreshElementForLowDocModes = function (selectedElement, selectParent, refreshAll) {
                if (typeof refreshAll === "undefined") { refreshAll = false; }
                if(this._currentDocMode < 9) {
                    var targetParents = selectedElement.parents(DomExplorerWindow._itemSelector).not(DomExplorerWindow._hiddenRootSelector);
                    targetParents = targetParents.length > 0 ? targetParents : selectedElement;
                    var targetParentChain = [];
                    targetParents.each(function (i, e) {
                        targetParentChain[(targetParents.length - 1) - i] = e.getAttribute("data-id");
                    });
                    var isTextNode = selectedElement.attr("data-tag") == "#text";
                    var parentUid = targetParentChain[targetParentChain.length - 1];
                    var toggleUid = isTextNode ? targetParentChain[targetParentChain.length - 2] : parentUid;
                    if(refreshAll) {
                        toggleUid = targetParentChain[0];
                    }
                    var toggle = $m("[data-id=" + toggleUid + "]");
                    HtmlTreeView.toggle(toggle);
                    selectParent = selectParent || isTextNode;
                    HtmlTreeView.expandElementChains([
                        targetParentChain
                    ], function () {
                        var reselect = selectParent ? $m("[data-id=" + parentUid + "]") : $m("[data-id=" + selectedElement.attr("data-id") + "]");
                        if(reselect && reselect.length) {
                            HtmlTreeView.select(reselect);
                        }
                    });
                }
            };
            DomExplorerWindow.prototype.refreshTree = function (complete) {
                var _this = this;
                this._state = "refreshing";
                if(this._initializationErrorMessage) {
                    $m("#scriptErrorMessageText").html(this._initializationErrorMessage);
                    $m("#scriptErrorSection").show();
                } else {
                    $m("#scriptErrorMessagetext").html("");
                    $m("#scriptErrorSection").hide();
                }
                this._initializationErrorMessage = null;
                var tree = $m("#tree");
                $m("#tree > :first-child > *").remove();
                tree.attr("tabindex", "1");
                this.currentSelectedId = "";
                this._currentElementHighlightUid = "";
                this._temporaryElementHighlightUid = "";
                this.hideElementHighlight();
                this._bridge.channel.clearCallbacks();
                $m("*.BPT-HorizontalPane").show();
                $m("*.BPT-Toolbar").show();
                $m("#pane").show();
                this.horizontalPane.refreshPaneWidth();
                this._bridge.channel.call(this._bridge.engine, "clearStyleCache");
                $m(".BPT-DataTree-Container").each(function (index, item) {
                    DataTreeView.clear($m(item));
                });
                this.tabPanes.clearState();
                this.tabPanes.executeCleanup();
                Dom.StyleModel.clearCollapsedRules();
                $m("#layoutView[data-layoutProperty]").text("");
                $m(".BPT-ToolbarToggleButton:not(.BPT-BypassDisableReset)").removeClass("BPT-ToolbarToggleButton-StateOn");
                this._selectElementByClick.selected = false;
                $m(".BPT-ToolbarButton").addClass("BPT-ToolbarButton-StateDisabled");
                $m(".BPT-ToolbarButton").removeClass("BPT-ToolbarButton-StateDisabled");
                this._showlayoutButton.disabled = false;
                this._selectElementByClick.disabled = false;
                var hostId = typeof Plugin["F12"] === "undefined" ? "vs" : "f12";
                this._bridge.channel.call(this._bridge.engine, "initializeHost", [
                    hostId
                ]);
                this._bridge.channel.call(this._bridge.engine, "setKeyBindCallbacks", [
                    function () {
                        _this.giveHostForeground();
                    }, 
                    function () {
                        _this.startSelectElementByClick();
                    }, 
                    function () {
                        _this.stopSelectElementByClick();
                    }, 
                    function () {
                        _this.domTree.expandToRemoteSelectedElement(true);
                    }                ]);
                this._bridge.channel.call(this._bridge.engine, "getRootElement", [], function (domObj) {
                    if(domObj) {
                        _this.createExpandableHtmlTree(tree, domObj, complete);
                    }
                });
                if(this.tabPanes.activeTab) {
                    $m("#" + this.tabPanes.activeTab).show();
                }
            };
            DomExplorerWindow.prototype.giveHostForeground = function () {
                var _this = this;
                this._bridge.channel.call(this._bridge.engine, "allowProcessToTakeForeground", [], function () {
                    return _this._bridge.takeForeground();
                });
            };
            DomExplorerWindow.prototype.tcSearchNext = function (complete, error) {
                this.searchDomTree(SearchDirection.next, complete, error);
            };
            DomExplorerWindow.prototype.tcSearchPrevious = function (complete, error) {
                this.searchDomTree(SearchDirection.previous, complete, error);
            };
            DomExplorerWindow.prototype.tcSetSearchText = function (text) {
                if(typeof text === "string") {
                    var e = document.getElementById("findbox");
                    if(e) {
                        e.value = text;
                        return true;
                    }
                }
                return false;
            };
            DomExplorerWindow.prototype.performUndo = function () {
                var _this = this;
                this.traceWriter.raiseEvent(Common.TraceEvents.Dom_UndoRedo_Start);
                this._bridge.channel.call(this._bridge.engine, "undoLastEdit", [], function () {
                    return _this.traceWriter.raiseEvent(Common.TraceEvents.Dom_UndoRedo_Stop);
                });
            };
            DomExplorerWindow.prototype.performNextEdit = function () {
                var _this = this;
                this.traceWriter.raiseEvent(Common.TraceEvents.Dom_UndoRedo_Start);
                this._bridge.channel.call(this._bridge.engine, "performNextEdit", [], function () {
                    return _this.traceWriter.raiseEvent(Common.TraceEvents.Dom_UndoRedo_Stop);
                });
            };
            DomExplorerWindow.prototype.setTestEditCallbacks = function (testEditCallback, testUndoCallback) {
                this._bridge.channel.call(this._bridge.engine, "setTestEditCallbacks", [
                    testEditCallback, 
                    testUndoCallback
                ]);
            };
            DomExplorerWindow.prototype.deleteElement = function (uid, selectedItem, callback) {
                var _this = this;
                this._bridge.channel.call(this._bridge.engine, "deleteElement", [
                    uid
                ], function (success) {
                    _this.refreshElementForLowDocModes(selectedItem, true);
                    _this.updateBreadcrumbs();
                    if(callback) {
                        callback(success);
                    }
                });
            };
            DomExplorerWindow.prototype.isEditableElement = function (tagName) {
                if(typeof tagName !== "string") {
                    return false;
                }
                return [
                    "html", 
                    "head", 
                    "body", 
                    "script", 
                    "#doctype"
                ].indexOf(tagName.toLowerCase()) < 0;
            };
            DomExplorerWindow.prototype.raiseTraceEvents = function (traceEvents) {
                if(this.traceWriter) {
                    this.traceWriter.raiseEvent(traceEvents);
                }
            };
            DomExplorerWindow.prototype.canDeleteItem = function (selectedItem) {
                var hasItemSelected = selectedItem != null && selectedItem.length > 0;
                var parentOfSelected = hasItemSelected ? selectedItem.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first() : null;
                var hasParent = parentOfSelected != null && parentOfSelected.length > 0;
                var isChildOfEditableItem = hasParent && this.domTree.isUnderEditableItem(selectedItem);
                var tagName = hasItemSelected ? selectedItem.attr("data-tag") : null;
                tagName = tagName || "";
                var isTextNode = hasItemSelected && (tagName === "#text");
                return hasItemSelected && (isTextNode || this.isEditableElement(tagName)) && isChildOfEditableItem;
            };
            DomExplorerWindow.prototype.htmlContextMenu = function (selectedItem, x, y) {
                this._domTreeContextMenuController.showContextMenu(selectedItem, x, y);
            };
            DomExplorerWindow.prototype.takeDownContextMenu = function () {
                this._domTreeContextMenuController.dismiss();
            };
            DomExplorerWindow.prototype.openDocumentLinkFromEvent = function (event) {
                if(event.type === "click" || event.keyCode === Common.KeyCodes.Enter || event.keyCode === Common.KeyCodes.Space) {
                    var query = $m(event.target);
                    var element = query.get(0);
                    this.openDocumentLinkFromElement(element);
                }
            };
            DomExplorerWindow.prototype.openDocumentLinkFromElement = function (element) {
                if(!element) {
                    return;
                }
                var url = element.getAttribute("data-linkUrl");
                var line = element.getAttribute("data-linkLine");
                var col = element.getAttribute("data-linkCol");
                var lineNumber = 0;
                if(line) {
                    lineNumber = parseInt(line, 10);
                }
                var colNumber = 0;
                if(col) {
                    colNumber = parseInt(col, 10);
                }
                try  {
                    url = decodeURI(url);
                    (Plugin).Host.showDocument(url, lineNumber || 1, colNumber || 1);
                } catch (ex) {
                }
            };
            DomExplorerWindow.prototype.startSelectElementByClick = function () {
                this._selectElementByClick.selected = true;
            };
            DomExplorerWindow.prototype.stopSelectElementByClick = function () {
                this._selectElementByClick.selected = false;
            };
            DomExplorerWindow.prototype.getAttributeCopyText = function (selectedItem) {
                if(selectedItem.length === 1) {
                    var name = DataTreeView.getName(selectedItem).text();
                    var value = DataTreeView.getValue(selectedItem).text();
                    return name + "=\"" + value + "\"";
                }
                return "";
            };
            DomExplorerWindow.prototype.getEventCopyText = function (selectedItem) {
                var textToCopy = "";
                if(selectedItem.length === 1) {
                    textToCopy = DataTreeView.getName(selectedItem).text();
                    var children = DataTreeView.getChildren(selectedItem);
                    if(children.length > 0) {
                        textToCopy += "\r\n";
                        for(var i = 0; i < children.length; i++) {
                            var childRow = $m(children.get(i));
                            textToCopy += DataTreeView.getName(childRow).text() + " " + DataTreeView.getValue(childRow).text() + "\r\n" + DomExplorerWindow.detabify(childRow.attr("title")) + (i < children.length - 2 ? "\r\n\r\n" : "");
                        }
                    } else {
                        textToCopy += " " + DataTreeView.getValue(selectedItem).text().replace(/\t+/g, "\t") + "\r\n" + DomExplorerWindow.detabify(selectedItem.attr("title"));
                    }
                }
                return textToCopy;
            };
            DomExplorerWindow.prototype.createExpandableHtmlTree = function (htmlTree, domObject, complete) {
                var _this = this;
                this._bridge.channel.call(this._bridge.engine, "attachMediaQueryEvents", [
                    function (changes) {
                        if(changes) {
                            _this.tabPanes.applyRemoteStyleChanges(changes);
                        } else {
                            _this.refreshCSSView();
                        }
                    }                ]);
                this.domTree.initializeTreeModifiedEvent();
                this.domTree.initializeAttributeModifiedEvent();
                htmlTree.children().first().children().remove();
                var root = HtmlTreeView.addRootElement(htmlTree, domObject.uid, domObject.tag, null, function (a, b, c, d) {
                    return _this.domTree.expandCallback(a, b, c, d);
                });
                var autoOpenCount = 0;
                var autoExpand = function (childGroup) {
                    if(autoOpenCount === 0) {
                        HtmlTreeView.toggle(childGroup.children(".BPT-HtmlTreeItem").matchAttr("data-tag", "html"), autoExpand);
                        autoOpenCount++;
                    } else if(autoOpenCount === 1) {
                        var body = childGroup.children(".BPT-HtmlTreeItem").matchAttr("data-tag", "body");
                        if(body.length === 0) {
                            var htmlUid = childGroup.parent().attr("data-id");
                            _this._bridge.channel.call(_this._bridge.engine, "attachDOMContentLoadedEvent", [
                                htmlUid, 
                                function (elementInfo) {
                                    _this.onDOMContentLoaded(elementInfo);
                                }                            ]);
                        } else {
                            if(body.hasClass("BPT-HtmlTreeItem-Collapsed")) {
                                HtmlTreeView.toggle(body, function () {
                                    window.setTimeout(function () {
                                        (htmlTree.closest(".BPT-HtmlTree-ScrollContainer").get(0)).scrollTop = 0;
                                    }, 0);
                                    toolwindowHelpers.codeMarker(toolwindowHelpers.codeMarkers.perfBrowserTools_DiagnosticsToolWindowsDomExplorerRefreshEnd);
                                    if(complete) {
                                        complete();
                                    }
                                });
                            } else if(complete) {
                                complete();
                            }
                        }
                    } else {
                        if(complete) {
                            complete();
                        }
                    }
                };
                if(root.hasClass("BPT-HtmlTreeItem-Collapsed")) {
                    HtmlTreeView.toggle(root, autoExpand);
                }
                root.bind("mouseover", function (event) {
                    if(!toolwindowHelpers.atBreakpoint) {
                        var element = $m(event.target).closest(".BPT-HtmlTreeItem-Header");
                        if(element.length > 0) {
                            var element = element.parent();
                            if(!element.hasClass("BPT-HtmlTreeItem-HiddenRoot")) {
                                var uid = element.attr("data-id");
                                var tag = element.attr("data-tag");
                                var parentUid;
                                if(tag === "#text" || tag === "") {
                                    var parentOfElement = element.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
                                    if(parentOfElement.length) {
                                        parentUid = parentOfElement.attr("data-id");
                                    }
                                }
                                _this.temporaryShowElementHighlight(parentUid || uid);
                            }
                        }
                    }
                    return false;
                });
                root.bind("mouseout", function (event) {
                    if(!toolwindowHelpers.atBreakpoint) {
                        var element = $m(event.target).closest(".BPT-HtmlTreeItem-Header");
                        if(element.length > 0 && !element.parent().hasClass("BPT-HtmlTreeItem-HiddenRoot")) {
                            _this.restoreElementHighlight();
                        }
                    }
                    return false;
                });
                root = null;
            };
            DomExplorerWindow.prototype.onDOMContentLoaded = function (elementInfo) {
                if(elementInfo && elementInfo.uid && elementInfo.children) {
                    var element = $m("#tree").find(".BPT-HtmlTreeItem[data-id='" + elementInfo.uid + "']");
                    this.domTree.createHtmlTreeItems(element, elementInfo.children);
                    this.updateBreadcrumbs();
                }
            };
            DomExplorerWindow.prototype.encodeTextForHtmlEditing = function (input) {
                if(typeof input !== "string") {
                    return "";
                }
                var htmlEscaped = $m("<div>").text(input).html();
                var unicodeHex = "";
                for(var i = 0; i < htmlEscaped.length; i++) {
                    var character = htmlEscaped.charAt(i);
                    if(character < " " || character > "~") {
                        unicodeHex += "&#x" + character.charCodeAt(0).toString(16).toUpperCase() + ";";
                    } else {
                        unicodeHex += htmlEscaped[i];
                    }
                }
                return unicodeHex;
            };
            DomExplorerWindow.prototype.decodeTextFromHtmlEditing = function (input) {
                if(typeof input !== "string") {
                    return "";
                }
                var safeValue = input.replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                var decoded = $m("<div>").html(safeValue).text();
                return decoded;
            };
            DomExplorerWindow.prototype.updateBreadcrumbs = function (skipLoad) {
                var selected = HtmlTreeView.getSelected($m("#tree"));
                if(selected.get(0) instanceof HTMLElement) {
                    var element = selected.get(0);
                    if(!this._breadcrumbsModel) {
                        this._breadcrumbsModel = new Dom.BreadcrumbsModel(element);
                        this.breadcrumbsView = new Dom.BreadcrumbsView(this, this._breadcrumbsModel, document, DomExplorerWindow._breadcrumbsListId, DomExplorerWindow._breadcrumbsTemplateId);
                    } else {
                        this._breadcrumbsModel.setSelectedElement(selected);
                    }
                    if(skipLoad) {
                        this.breadcrumbsView.skipNextLoad();
                    }
                    this.breadcrumbsView.updateView();
                    this.refreshElementHighlight();
                } else {
                    if(this._breadcrumbsModel) {
                        this._breadcrumbsModel.clearSelection();
                        this.breadcrumbsView.updateView();
                    }
                }
            };
            DomExplorerWindow.prototype.selectBreadcrumbNodeByTagName = function (tagName, nodeIndex) {
                this.breadcrumbsView.selectBreadcrumbNodeByTagName(tagName, nodeIndex);
            };
            DomExplorerWindow.prototype.selectBreadcrumbNodeByClass = function (className, nodeIndex) {
                this.breadcrumbsView.selectBreadcrumbNodeByClass(className, nodeIndex);
            };
            DomExplorerWindow.prototype.selectBreadcrumbNodeById = function (id, callback) {
                this.breadcrumbsView.selectBreadcrumbNodeById(id);
            };
            DomExplorerWindow.prototype.showTooltipOnSelectedBreadcrumb = function () {
                this.breadcrumbsView.showTooltipOnBreadcrumb(true);
            };
            DomExplorerWindow.prototype.registerExpandCallback = function (callback) {
                this.expandCallback = callback;
            };
            DomExplorerWindow.prototype.refreshCSSView = function (isInlineStyleUpdate) {
                if (typeof isInlineStyleUpdate === "undefined") { isInlineStyleUpdate = false; }
                var isStylesActive = TabItem.isActive($m("#stylesTabButton"));
                var isWinningActive = TabItem.isActive($m("#winningStylesTabButton"));
                var isLayoutActive = TabItem.isActive($m("#layoutTabButton"));
                var selected = HtmlTreeView.getSelected($m("#tree"));
                var uid = selected.attr("data-id");
                var tag = selected.attr("data-tag");
                if(isWinningActive && !isInlineStyleUpdate) {
                    var winningStyleView = this.tabPanes.getWinningStyleView();
                    if(selected.length > 0 && winningStyleView) {
                        this.tabPanes.clearLayoutAndStylesState();
                        winningStyleView.updateView();
                    } else {
                        this.tabPanes.clearState();
                    }
                } else if(isStylesActive && !isInlineStyleUpdate) {
                    this.tabPanes.clearState();
                    if(selected.length > 0) {
                        if(isStylesActive) {
                            var doClearStyles = true;
                            if(tag === "#text") {
                                var parentOfSelected = selected.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
                                if(parentOfSelected.length) {
                                    this.tabPanes.showStyles(parentOfSelected.attr("data-id"), parentOfSelected.attr("data-tag"));
                                    doClearStyles = false;
                                }
                            } else {
                                this.tabPanes.showStyles(uid, tag);
                                doClearStyles = false;
                            }
                            if(doClearStyles) {
                                this.tabPanes.showStyles();
                            }
                        }
                    }
                } else if(isLayoutActive) {
                    this.tabPanes.showLayout(uid, tag);
                }
                this.updateBreadcrumbs();
            };
            DomExplorerWindow.prototype.refreshEventsView = function () {
                var isEventsActive = TabItem.isActive($m("#eventsTabButton"));
                if(!isEventsActive) {
                    return;
                }
                var selected = HtmlTreeView.getSelected($m("#tree"));
                var uid = selected.attr("data-id");
                var tag = selected.attr("data-tag");
                this.tabPanes.clearState();
                if(selected.length > 0) {
                    this.tabPanes.showEvents(uid, tag);
                } else {
                    this.tabPanes.showEvents();
                }
            };
            DomExplorerWindow.prototype.isColorProperty = function (propertyName) {
                switch(propertyName.toLowerCase()) {
                    case "background-color":
                    case "border-bottom-color":
                    case "border-left-color":
                    case "border-right-color":
                    case "border-top-color":
                    case "color":
                    case "column-rule-color":
                    case "layout-border-bottom-color":
                    case "layout-border-left-color":
                    case "layout-border-right-color":
                    case "layout-border-top-color":
                    case "outline-color":
                    case "stop-color":
                    case "flood-color":
                    case "lighting-color":
                    case "scrollbar-3dlight-color":
                    case "scrollbar-arrow-color":
                    case "scrollbar-base-color":
                    case "scrollbar-darkshadow-color":
                    case "scrollbar-face-color":
                    case "scrollbar-highlight-color":
                    case "scrollbar-shadow-color":
                    case "scrollbar-track-color":
                        return true;
                }
                return false;
            };
            DomExplorerWindow.prototype.selectElementFromConsole = function (completed) {
                this._bridge.channel.call(this._bridge.engine, "selectElementFromConsole", [], completed);
            };
            DomExplorerWindow.hasDataTag = function hasDataTag(itemSet, dataTag) {
                if(!itemSet) {
                    return false;
                }
                if(!dataTag) {
                    return false;
                }
                for(var i = 0, end = itemSet.length; i < end; i++) {
                    var node = itemSet.get(i);
                    if(node && typeof node["getAttribute"] === "function" && (node).getAttribute("data-tag").toLowerCase() === dataTag) {
                        return true;
                    }
                }
                return false;
            };
            DomExplorerWindow.prototype.onActivated = function () {
                var _this = this;
                this.restoreElementHighlight();
                if(this._activatedFocusToken) {
                    window.clearTimeout(this._activatedFocusToken);
                    this._activatedFocusToken = Number.NaN;
                }
                this._activatedFocusToken = window.setTimeout(function () {
                    document.getElementById("tree").focus();
                    HtmlTreeView.focusSelected(true);
                    _this._activatedFocusToken = Number.NaN;
                }, 0);
            };
            DomExplorerWindow.prototype.onDeactivated = function () {
                if(this._activatedFocusToken) {
                    window.clearTimeout(this._activatedFocusToken);
                    this._activatedFocusToken = Number.NaN;
                }
                if(this._selectElementByClick.selected) {
                    this._selectElementByClick.selected = false;
                }
                this.hideElementHighlight();
            };
            DomExplorerWindow.prototype.onProfilingStateChange = function (started) {
                if(started) {
                    Plugin.F12.ErrorDisplay.show(Plugin.Resources.getString("DOMExplorerDisabledWhileProfiling"));
                    this._bridge.fireDetachedEvent();
                } else {
                    Plugin.F12.ErrorDisplay.close();
                    this._bridge.fireAttachedEvent();
                }
            };
            DomExplorerWindow.prototype.initializeTabs = function () {
                var _this = this;
                HtmlTreeView.init($m("#tree"), function () {
                    return _this.updateBreadcrumbs();
                }, this.traceWriter);
                HtmlTreeViewDragDrop.init(this._bridge.channel, function () {
                    return _this._bridge.engine;
                }, document, function () {
                    return _this._currentDocMode >= 9;
                }, this.traceWriter);
                this.horizontalPane = new Dom.HorizontalPane($m("#pane"));
                this.tabPanes.setHorizontalPane(this.horizontalPane);
                TabItem.init($m("#stylesTabButton"), function () {
                    var selected = HtmlTreeView.getSelected($m("#tree"));
                    var doClearStyles = true;
                    if(selected.length > 0) {
                        var tag = selected.attr("data-tag");
                        if(tag === "#text") {
                            var parentOfSelected = selected.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
                            if(parentOfSelected.length) {
                                _this.tabPanes.showStyles(parentOfSelected.attr("data-id"), parentOfSelected.attr("data-tag"));
                                doClearStyles = false;
                            }
                        } else {
                            _this.tabPanes.showStyles(selected.attr("data-id"), selected.attr("data-tag"));
                            doClearStyles = false;
                        }
                    }
                    if(doClearStyles) {
                        _this.tabPanes.showStyles();
                    }
                });
                TabItem.init($m("#winningStylesTabButton"), function () {
                    var selected = HtmlTreeView.getSelected($m("#tree"));
                    if(selected.length > 0) {
                        _this.tabPanes.showWinningStyles(selected.attr("data-id"), selected.attr("data-tag"));
                    } else {
                        _this.tabPanes.showWinningStyles();
                    }
                });
                TabItem.init($m("#layoutTabButton"), function () {
                    var selected = HtmlTreeView.getSelected($m("#tree"));
                    if(selected.length > 0) {
                        _this.tabPanes.showLayout(selected.attr("data-id"), selected.attr("data-tag"));
                    } else {
                        _this.tabPanes.showLayout();
                    }
                });
                TabItem.init($m("#eventsTabButton"), function () {
                    var selected = HtmlTreeView.getSelected($m("#tree"));
                    if(selected.length > 0) {
                        _this.tabPanes.showEvents(selected.attr("data-id"), selected.attr("data-tag"));
                    } else {
                        _this.tabPanes.showEvents();
                    }
                });
                TabItem.init($m("#changesTabButton"), function () {
                    _this.tabPanes.showChanges();
                });
            };
            DomExplorerWindow.prototype.searchDomTree = function (searchDirection, complete, error) {
                var _this = this;
                var searchterm = $m("#findbox").val();
                if(searchterm) {
                    this.traceWriter.raiseEvent(Common.TraceEvents.Dom_Search_Start);
                    this._bridge.channel.call(this._bridge.engine, "findTerm", [
                        this.currentSelectedId, 
                        searchterm, 
                        searchDirection
                    ], function (chain) {
                        var found = chain.length !== 0;
                        if(found) {
                            $m("#searchBoxBorder").removeClass("BPT-SearchBox-NoResult");
                            $m("#searchPreviousResult").removeAttr("disabled");
                            $m("#searchNextResult").removeAttr("disabled");
                            _this.domTree.expandElementChain(chain);
                        } else {
                            $m("#searchBoxBorder").addClass("BPT-SearchBox-NoResult");
                            $m("#searchPreviousResult").attr("disabled", "");
                            $m("#searchNextResult").attr("disabled", "");
                        }
                        if(complete) {
                            complete(found);
                        }
                        _this.traceWriter.raiseEvent(Common.TraceEvents.Dom_Search_Stop);
                    });
                } else if(error) {
                    error("Invalid searchterm");
                }
            };
            DomExplorerWindow.prototype.initializeGlobalCommands = function () {
                var _this = this;
                if(Plugin.F12) {
                    var onKeyDown = function (keyEvent) {
                        var ctrlShiftKey = keyEvent.shiftKey && keyEvent.ctrlKey && !keyEvent.altKey;
                        var shiftKey = keyEvent.shiftKey && !keyEvent.ctrlKey && !keyEvent.altKey;
                        var ctrlKey = keyEvent.ctrlKey && !keyEvent.shiftKey && !keyEvent.altKey;
                        var noKeys = !keyEvent.shiftKey && !keyEvent.ctrlKey && !keyEvent.altKey;
                        if(keyEvent.keyCode === Common.KeyCodes.B && ctrlKey) {
                            _this._selectElementByClick.selected = !_this._selectElementByClick.selected;
                            return false;
                        } else if(keyEvent.keyCode === Common.KeyCodes.I && ctrlShiftKey) {
                            _this._showlayoutButton.selected = !_this._showlayoutButton.selected;
                            return false;
                        } else if(keyEvent.keyCode === Common.KeyCodes.F && ctrlKey) {
                            document.getElementById("findbox").focus();
                            return false;
                        } else if(keyEvent.keyCode === Common.KeyCodes.F3 && noKeys) {
                            _this.searchDomTree(SearchDirection.next);
                            return false;
                        } else if(keyEvent.keyCode === Common.KeyCodes.F5 && noKeys && _this._currentDocMode < 9) {
                            var selected = HtmlTreeView.getSelected($m("#tree"));
                            _this.refreshElementForLowDocModes(selected, false, true);
                            return false;
                        } else if(keyEvent.keyCode === Common.KeyCodes.F3 && shiftKey) {
                            _this.searchDomTree(SearchDirection.previous);
                            return false;
                        } else if(keyEvent.keyCode === Common.KeyCodes.Z && ctrlKey && !_this.isInTextControl()) {
                            _this.performUndo();
                            return false;
                        } else if(keyEvent.keyCode === Common.KeyCodes.Y && ctrlKey && !_this.isInTextControl()) {
                            _this.performNextEdit();
                            return false;
                        }
                        return true;
                    };
                    document.addEventListener("keydown", function (e) {
                        return onKeyDown(e);
                    });
                    Plugin.F12.addEventListener("keydown", function (e) {
                        return onKeyDown(e);
                    });
                } else {
                    this._findCommandBinding = Plugin.VS.Commands.bindCommand({
                        name: "find",
                        onexecute: function () {
                            document.getElementById("findbox").focus();
                        }
                    });
                    this._findNextCommandBinding = Plugin.VS.Commands.bindCommand({
                        name: "findnext",
                        onexecute: function () {
                            _this.searchDomTree(SearchDirection.next);
                        }
                    });
                    this._findPrevCommandBinding = Plugin.VS.Commands.bindCommand({
                        name: "findprev",
                        onexecute: function () {
                            _this.searchDomTree(SearchDirection.previous);
                        }
                    });
                    this._redoCommandBinding = Plugin.VS.Commands.bindCommand({
                        name: "redo",
                        onexecute: function () {
                            if(!_this.isInTextControl()) {
                                _this.performNextEdit();
                            }
                        }
                    });
                    this._refreshCommandBinding = Plugin.VS.Commands.bindCommand({
                        name: "refresh",
                        onexecute: function () {
                            if(_this._currentDocMode < 9) {
                                var selected = HtmlTreeView.getSelected($m("#tree"));
                                _this.refreshElementForLowDocModes(selected, false, true);
                            }
                        }
                    });
                    this._selectElementCommandBinding = Plugin.VS.Commands.bindCommand({
                        name: "selectelement",
                        onexecute: function () {
                            _this._selectElementByClick.selected = !_this._selectElementByClick.selected;
                        }
                    });
                    this._showLayoutCommandBinding = Plugin.VS.Commands.bindCommand({
                        name: "showlayout",
                        onexecute: function () {
                            _this._showlayoutButton.selected = !_this._showlayoutButton.selected;
                        }
                    });
                    this._undoCommandBinding = Plugin.VS.Commands.bindCommand({
                        name: "undo",
                        onexecute: function () {
                            if(!_this.isInTextControl()) {
                                _this.performUndo();
                            }
                        }
                    });
                }
            };
            DomExplorerWindow.prototype.initializeToolbarButtons = function () {
                var _this = this;
                var selectElementByClick = document.getElementById("selectElementByClick");
                selectElementByClick.setAttribute("aria-label", toolwindowHelpers.loadString("SelectElementButtonTooltip"));
                this._selectElementByClick = new Common.Controls.Legacy.ToggleButton(selectElementByClick);
                this._selectElementByClick.selectedChanged = function (newSelectValue) {
                    if(newSelectValue) {
                        _this._bridge.allowRemoteToTakeForeground().done(function () {
                            _this._bridge.channel.call(_this._bridge.engine, "takeForeground", [], function (result) {
                                if(!result) {
                                    _this._bridge.channel.call(_this._bridge.engine, "getHWND", [], function (hwnd) {
                                        _this._bridge.setForeground(hwnd).done();
                                    });
                                }
                            });
                        });
                        _this._bridge.channel.call(_this._bridge.engine, "selectElementByClick", [
                            function () {
                                _this._selectElementByClick.selected = false;
                                _this.giveHostForeground();
                                _this.domTree.expandToRemoteSelectedElement();
                                _this.focusToTree();
                            }                        ]);
                    } else {
                        _this._bridge.channel.call(_this._bridge.engine, "cancelSelectElementByClick");
                    }
                };
                var showlayoutButton = document.getElementById("showlayoutButton");
                showlayoutButton.setAttribute("aria-label", toolwindowHelpers.loadString("ShowLayoutBoxesButtonTooltipWithShortcut"));
                this._showlayoutButton = new Common.Controls.Legacy.ToggleButton(showlayoutButton);
                this._showlayoutButton.selectedChanged = function (newSelectValue) {
                    if(newSelectValue) {
                        _this.restoreElementHighlight();
                    } else {
                        _this.hideElementHighlight();
                    }
                };
                $m("#refreshButton").bind("click keydown", function (event) {
                    if(event.type === "click" || event.keyCode === Common.KeyCodes.Enter || event.keyCode === Common.KeyCodes.Space) {
                        var selected = HtmlTreeView.getSelected($m("#tree"));
                        var element = selected.length > 0 ? selected : $m("[data-tag=\"html\"]");
                        _this.refreshElementForLowDocModes(element, false, true);
                        return false;
                    }
                    return true;
                });
                this._domTreeContextMenuController = new Dom.DomTreeContextMenuController(this, this._bridge, "tree");
                this._findBoxContextMenu = new Dom.TextControlMenuController(document.getElementById("findbox"));
                $m("#findbox").bind("keydown", function (event) {
                    var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
                    var noKeys = !event.shiftKey && !event.ctrlKey && !event.altKey;
                    if(event.keyCode === Common.KeyCodes.Enter && noKeys) {
                        _this.searchDomTree(SearchDirection.next);
                        return false;
                    }
                    return true;
                });
                document.getElementById("findbox").addEventListener("input", function (event) {
                    $m("#searchBoxBorder").removeClass("BPT-SearchBox-NoResult");
                    $m("#searchPreviousResult").attr("disabled", "");
                    $m("#searchNextResult").attr("disabled", "");
                });
                $m("#findbox").bind("click keydown", function (event) {
                    $m("#findbox").focus();
                    return true;
                });
                $m("#searchNextResult").bind("click keydown", function (event) {
                    if(event.type === "click" || event.keyCode === Common.KeyCodes.Enter || event.keyCode === Common.KeyCodes.Space) {
                        _this.searchDomTree(SearchDirection.next);
                        return false;
                    }
                    return true;
                });
                $m("#searchPreviousResult").bind("click keydown", function (event) {
                    var keyEvent = event;
                    if(event.type === "click" || keyEvent.keyCode === Common.KeyCodes.Enter || keyEvent.keyCode === Common.KeyCodes.Space) {
                        _this.searchDomTree(SearchDirection.previous);
                        return false;
                    }
                    return true;
                });
                if(Plugin.F12) {
                    document.getElementById("tabStartMarker").setAttribute("tabindex", "-1");
                    document.getElementById("tabEndMarker").setAttribute("tabindex", "-1");
                } else {
                    $m("#tabStartMarker,#tabEndMarker").bind("focus", function (event) {
                        var tabstops = $m("[tabindex='1']");
                        if(tabstops.length > 2) {
                            var validStops = [];
                            for(var i = 1; i < tabstops.length - 1; i++) {
                                var element = tabstops.get(i);
                                var inactiveTab = $m(element).closest(".BPT-Tab-Inactive");
                                if(!inactiveTab.length) {
                                    validStops.push(element);
                                }
                            }
                            var selectElement = (event.target).id === "tabStartMarker" ? validStops[validStops.length - 1] : validStops[0];
                            selectElement.focus();
                        }
                    });
                }
            };
            DomExplorerWindow.prototype.isInTextControl = function () {
                return ((document.activeElement instanceof HTMLTextAreaElement) || (document.activeElement instanceof HTMLInputElement && (document.activeElement).type.toLowerCase() === "text"));
            };
            DomExplorerWindow.prototype.editLayoutValue = function (uid, propertyName, newValue) {
                if(propertyName === "offsetLeft") {
                    propertyName = "left";
                } else if(propertyName === "offsetTop") {
                    propertyName = "top";
                } else if(propertyName === "clientWidth") {
                    propertyName = "width";
                } else if(propertyName === "clientHeight") {
                    propertyName = "height";
                }
                this._styleCache.updateView(uid, function (styles) {
                    styles.setInlineProperty(propertyName, newValue, false);
                });
            };
            DomExplorerWindow.prototype.initializeLayoutButtons = function () {
                var _this = this;
                var layoutView = $m("#layoutView");
                var layoutEditContainer = document.getElementById("Layout-EditContainer");
                var editElement = layoutEditContainer.firstElementChild;
                var valueEditHandler = function (event) {
                    if(document.activeElement && document.activeElement["type"] !== "text") {
                        if(event.type === "click" || (event.type === "keydown" && (event.keyCode === Common.KeyCodes.Enter || event.keyCode === Common.KeyCodes.Space) && !event.ctrlKey && !event.shiftKey && !event.altKey)) {
                            var valueContext = event.target;
                            var uid = layoutView.attr("data-uid");
                            var tagName = layoutView.attr("data-tag");
                            var prop = valueContext.getAttribute("data-layoutProperty");
                            if(uid && tagName) {
                                var contextRect = valueContext.getBoundingClientRect();
                                var viewRect = (layoutView.get(0)).getBoundingClientRect();
                                var offsetRect = document.getElementById("layout-offset-layer").getBoundingClientRect();
                                var style = window.getComputedStyle(valueContext);
                                var height = style.transform === "none" ? contextRect.height : contextRect.width;
                                var width = 60;
                                var top = contextRect.top + contextRect.height / 2 - height / 2 - viewRect.top;
                                var left = offsetRect.left - viewRect.left - viewRect.left;
                                if(prop === "height" || valueContext.classList.contains("BPT-Layout-Left")) {
                                    left += contextRect.left;
                                } else if(prop === "width" || valueContext.classList.contains("BPT-Layout-Right")) {
                                    left += contextRect.right - width;
                                } else {
                                    left += contextRect.left + contextRect.width / 2 - width / 2;
                                }
                                layoutEditContainer.style.left = left + "px";
                                layoutEditContainer.style.top = top + "px";
                                layoutEditContainer.style.display = "block";
                                editElement.textContent = valueContext.textContent;
                                var contextColor = valueContext.style.color;
                                valueContext.style.color = "transparent";
                                var valueEditor = new Dom.ValueEditor(document, _this, _this._bridge, window);
                                valueEditor.enableCommitOnChange();
                                valueEditor.enableNumericChanges();
                                _this._bridge.channel.call(_this._bridge.engine, "enableEditChaining");
                                valueEditor.show(editElement, width, function (newValue, oldValue) {
                                    if(newValue) {
                                        if(/^\d*(\.\d+)?$/.test(newValue)) {
                                            newValue += "px";
                                        }
                                        _this.editLayoutValue(uid, prop, newValue);
                                    }
                                }, function (newValue, oldValue, exitKey, wasCancelled) {
                                    _this._bridge.channel.call(_this._bridge.engine, "disableEditChaining");
                                    layoutEditContainer.style.display = "none";
                                    valueContext.style.color = contextColor;
                                    if(!wasCancelled) {
                                        valueContext.textContent = newValue;
                                        _this.tabPanes.showLayout(uid, tagName);
                                    }
                                });
                            }
                            return false;
                        }
                    }
                };
                layoutView.find("[data-layoutProperty]").bind("click keydown", valueEditHandler);
            };
            DomExplorerWindow.prototype.addElements = function (parentUid, beforeUid, htmlText, callback) {
                var _this = this;
                this._bridge.channel.call(this._bridge.engine, "addElement", [
                    parentUid, 
                    beforeUid, 
                    htmlText
                ], function (success) {
                    if(success) {
                        var selected = HtmlTreeView.getSelected($m("#tree"));
                        _this.refreshElementForLowDocModes(selected, false);
                        _this.updateBreadcrumbs();
                        if(callback) {
                            callback(success);
                        }
                    }
                });
            };
            DomExplorerWindow.prototype.replaceElements = function (parentUid, htmlText) {
                var _this = this;
                this._bridge.channel.call(this._bridge.engine, "replaceElement", [
                    parentUid, 
                    htmlText
                ], function (success) {
                    if(success) {
                        var selected = HtmlTreeView.getSelected($m("#tree"));
                        _this.refreshElementForLowDocModes(selected, false);
                        _this.updateBreadcrumbs();
                    }
                });
            };
            DomExplorerWindow.prototype.isPasteAsChildCapableElement = function (tagNameLowerCase) {
                return [
                    "html", 
                    "script", 
                    "noscript", 
                    "style", 
                    "#doctype", 
                    "#comment", 
                    "iframe", 
                    "frame", 
                    "#text"
                ].indexOf(tagNameLowerCase) < 0;
            };
            DomExplorerWindow.prototype.canPasteAsChild = function (selectedItem) {
                var hasItemSelected = selectedItem != null && selectedItem.length > 0;
                var dataTag = hasItemSelected ? selectedItem.attr("data-tag") : null;
                dataTag = dataTag || "";
                var tagName = dataTag.toLowerCase();
                var canPasteAsChildOfSelected = hasItemSelected && !!tagName && this.isPasteAsChildCapableElement(tagName);
                var clipboardText = clipboardData.getData("Text");
                var parentOfSelected = selectedItem ? selectedItem.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first() : null;
                var hasParent = parentOfSelected != null && parentOfSelected.length > 0;
                var isChildOfEditableItem = hasParent && this.domTree.isUnderEditableItem(selectedItem);
                var canPaste = hasItemSelected && isChildOfEditableItem && canPasteAsChildOfSelected && clipboardText != "";
                return canPaste;
            };
            DomExplorerWindow.prototype.doCut = function (item) {
                var _this = this;
                Assert.isTrue(item != null, "doCut item parameter cannot be null/undefined");
                Assert.areEqual(item.length, 1, "doCut item parameter must have one-and-only-one node");
                Assert.isTrue(item.hasClass("BPT-HtmlTreeItem"), "doCut item parameter must be a BPT-HtmlTreeItem");
                Assert.areEqual(item.parents(".BPT-HtmlTree-Container").length, 1, "doCut item parameter must reside in the #tree");
                this.raiseTraceEvents(Common.TraceEvents.Dom_CutElement_Start);
                this.copyOuterHtmlToClipboard(item);
                var uid = item.attr("data-id");
                var postOpCallback = function (success) {
                    _this.focusToTree();
                    _this.raiseTraceEvents(Common.TraceEvents.Dom_CutElement_Stop);
                };
                this.deleteElement(uid, item, postOpCallback);
            };
            DomExplorerWindow.prototype.getContextMenuTarget = function (e, isDataTree) {
                var treeItem, offset;
                var treeClass = (isDataTree ? ".BPT-DataTreeItem" : ".BPT-HtmlTreeItem");
                var selectedItem = null;
                var x = e instanceof MouseEvent ? (e).clientX : 0;
                var y = e instanceof MouseEvent ? (e).clientY : 0;
                if(x <= 0 || x <= 0) {
                    if(e.eventPhase === e.BUBBLING_PHASE && e.srcElement) {
                        treeItem = $m(e.srcElement).closest(treeClass).not(treeClass + "-HiddenRoot").first();
                    } else {
                        treeItem = $m(e.currentTarget).find(treeClass + "-Selected").first();
                    }
                    if(treeItem.length > 0) {
                        selectedItem = treeItem;
                        offset = (treeItem.get(0)).getBoundingClientRect();
                        x = offset.left;
                        y = offset.top;
                    }
                } else {
                    selectedItem = $m(document.elementFromPoint(x, y)).closest(treeClass);
                    selectedItem = (selectedItem.length > 0 ? selectedItem : null);
                }
                if(selectedItem !== null && selectedItem.length > 0) {
                    selectedItem.trigger("click");
                }
                return {
                    target: selectedItem,
                    x: x,
                    y: y
                };
            };
            DomExplorerWindow.prototype.initializeContextMenus = function () {
                var _this = this;
                $m("#tree").bind("keydown", function (event) {
                    var wasHandled = false;
                    var htmlTree = $m("#tree");
                    var element = $m(event.target);
                    if(element.hasClass("BPT-HtmlTree-ChildCollection-ShowAll")) {
                        return;
                    }
                    if(_this.isInTextControl()) {
                        return true;
                    }
                    if(!toolwindowHelpers.hasSelectedText()) {
                        var selectedElement = HtmlTreeView.getSelected(htmlTree);
                        if(selectedElement.length > 0) {
                            var uid = selectedElement.attr("data-id");
                            var canDelete = _this.canDeleteItem(selectedElement);
                            var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
                            var ctrlKey = event.ctrlKey && !event.shiftKey && !event.altKey;
                            var noKeys = !event.shiftKey && !event.ctrlKey && !event.altKey;
                            if(canDelete && event.keyCode === Common.KeyCodes.X && ctrlKey) {
                                wasHandled = true;
                                _this.doCut(selectedElement);
                            } else if(event.keyCode === Common.KeyCodes.C && ctrlKey) {
                                wasHandled = true;
                                var element = selectedElement;
                                var dataTag = element.attr("data-tag") || "";
                                if(dataTag === "#text") {
                                    element = element.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first();
                                    if(element && element.length) {
                                        _this.copyOuterHtmlToClipboard(element);
                                    }
                                } else {
                                    _this.copyOuterHtmlToClipboard(element);
                                }
                            } else if(canDelete && event.keyCode === Common.KeyCodes.Delete && noKeys) {
                                wasHandled = true;
                                var focusToTreeCallback = function (success) {
                                    _this.focusToTree();
                                };
                                _this.deleteElement(uid, selectedElement, focusToTreeCallback);
                            } else if(event.keyCode === Common.KeyCodes.V && ctrlKey) {
                                wasHandled = true;
                                if(_this.canPasteAsChild(selectedElement)) {
                                    _this.pasteClipboardToHtml(selectedElement, null);
                                }
                            }
                        }
                    }
                    return !wasHandled;
                });
                $m(document).bind("copy", function (e) {
                    toolwindowHelpers.copySelectedTextToClipboard();
                    e.stopImmediatePropagation();
                    return false;
                }, true);
            };
            DomExplorerWindow.prototype.copyOuterHtmlToClipboard = function (selectedElement) {
                var uid = selectedElement.attr("data-id");
                this._bridge.channel.call(this._bridge.engine, "getHTMLString", [
                    uid, 
                    false
                ], function (textToCopy) {
                    if(textToCopy) {
                        clipboardData.setData("Text", textToCopy);
                    }
                });
            };
            DomExplorerWindow.prototype.pasteClipboardToHtml = function (parentElement, beforeChild) {
                var _this = this;
                this.raiseTraceEvents(Common.TraceEvents.Dom_PasteElement_Start);
                var text = clipboardData.getData("Text");
                if(text) {
                    var parentUid = parentElement.attr("data-id");
                    var beforeChildUid = beforeChild && beforeChild.length > 0 ? beforeChild.attr("data-id") : null;
                    this.addElements(parentUid, beforeChildUid, text, function (success) {
                        if(!HtmlTreeView.isExpandable(parentElement)) {
                            HtmlTreeView.changeExpandableState(parentElement, true);
                        }
                        if(HtmlTreeView.isCollapsed(parentElement)) {
                            HtmlTreeView.toggle(parentElement);
                        }
                        _this.raiseTraceEvents(Common.TraceEvents.Dom_PasteElement_Stop);
                    });
                } else {
                    this.raiseTraceEvents(Common.TraceEvents.Dom_PasteElement_Stop);
                }
            };
            DomExplorerWindow.prototype.focusToTree = function () {
                HtmlTreeView.focusSelected();
            };
            DomExplorerWindow.prototype.domExplorerLoaded = function () {
                if(Plugin.F12 && Plugin.F12.getInspectElementId) {
                    var inspectElementId = (Plugin).F12.getInspectElementId();
                    if(inspectElementId) {
                        this._bridge.channel.call(this._bridge.engine, "inspectElementById", [
                            inspectElementId
                        ]);
                    }
                }
                this._state = "ready";
                this.fireEventListener("domExplorerLoaded");
            };
            DomExplorerWindow.prototype.switchTab = function (tabIndex) {
                switch(tabIndex) {
                    case 0:
                        $m("#stylesTabButton").click();
                        break;
                    case 1:
                        $m("#winningStylesTabButton").click();
                        break;
                    case 2:
                        $m("#layoutTabButton").click();
                        break;
                    case 3:
                        $m("#eventsTabButton").click();
                        break;
                    case 4:
                        $m("#changesTabButton").click();
                        break;
                }
            };
            return DomExplorerWindow;
        })();
        DomExplorer.DomExplorerWindow = DomExplorerWindow;        
        function gleamChange(node) {
            var n = node && node.get && node.get(0);
            if(!n) {
                return;
            }
            if(n["gleamToken"]) {
                window.clearTimeout(n["gleamToken"]);
                delete n["gleamToken"];
            } else {
                node.addClass("BPT-HTML-Attribute-Changed");
            }
            n["gleamToken"] = window.setTimeout(function () {
                node.removeClass("BPT-HTML-Attribute-Changed");
                delete n["gleamToken"];
            }, 1000);
        }
        DomExplorer.gleamChange = gleamChange;
    })(F12.DomExplorer || (F12.DomExplorer = {}));
    var DomExplorer = F12.DomExplorer;
})(F12 || (F12 = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/domExplorer.js.map

// menus.ts
var Dom;
(function (Dom) {
    "use strict";
    var menuTextControlItems;
    (function (menuTextControlItems) {
        menuTextControlItems._map = [];
        menuTextControlItems.menuTreeCut = 0;
        menuTextControlItems.menuTreeCopy = 1;
        menuTextControlItems.menuTreePaste = 2;
    })(menuTextControlItems || (menuTextControlItems = {}));
    var TextControlMenuController = (function () {
        function TextControlMenuController(_textArea) {
            this._textArea = _textArea;
            this._menuId = "TextControlContextMenu" + TextControlMenuController.menuUid++;
            this._menuItems = [
                {
                    id: "menuTextControlCut",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/CutMenuText"),
                    accessKey: Plugin.Resources.getString("AccessKeyCtrlX")
                }, 
                {
                    id: "menuTextControlCopy",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/CopyMenuText"),
                    accessKey: Plugin.Resources.getString("AccessKeyCtrlC")
                }, 
                {
                    id: "menuTextControlPaste",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/PasteMenuText"),
                    accessKey: Plugin.Resources.getString("AccessKeyCtrlV")
                }
            ];
            this.initialize();
        }
        TextControlMenuController.menuUid = 0;
        TextControlMenuController.prototype.initialize = function () {
            var _this = this;
            this._contextMenuListener = function (e) {
                return _this.onContextMenu(e);
            };
            this._keydownListener = function (e) {
                return _this.onKeydown(e);
            };
            this._textArea.addEventListener("contextmenu", this._contextMenuListener);
            this._textArea.addEventListener("keydown", this._keydownListener);
        };
        TextControlMenuController.prototype.uninitialize = function () {
            this._textArea.removeEventListener("contextmenu", this._contextMenuListener);
            this._textArea.removeEventListener("keydown", this._keydownListener);
        };
        TextControlMenuController.prototype.onKeydown = function (event) {
            var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
            if(event.keyCode === Common.KeyCodes.F10 && shiftKey) {
                this._textArea = event.target;
                var offset = this._textArea.getBoundingClientRect();
                this.showContextMenu(this._textArea, offset.left, offset.top);
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            return true;
        };
        TextControlMenuController.prototype.onContextMenu = function (e) {
            this.showContextMenu(e.target, e.clientX, e.clientY);
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        };
        TextControlMenuController.prototype.onMenuItemClicked = function (menuId, itemId, selectedText, pasteText) {
            if(menuId === this._menuId) {
                var uid;
                var textToCopy;
                switch(itemId) {
                    case this._menuItems[menuTextControlItems.menuTreeCut].id:
                        clipboardData.setData("text", selectedText);
                        this.replaceText("");
                        break;
                    case this._menuItems[menuTextControlItems.menuTreeCopy].id:
                        clipboardData.setData("text", selectedText);
                        break;
                    case this._menuItems[menuTextControlItems.menuTreePaste].id:
                        this.replaceText(pasteText);
                        break;
                }
                this.dismiss();
            }
        };
        TextControlMenuController.prototype.replaceText = function (newText) {
            var range = this._textArea.createTextRange();
            var useundo = range.queryCommandSupported("ms-beginundounit");
            if(useundo) {
                range.execCommand("ms-beginundounit");
            }
            range.moveStart("character", this._start);
            range.moveEnd("character", this._end - this._textArea.value.length);
            range.text = newText;
            if(useundo) {
                range.execCommand("ms-endundounit");
            }
        };
        TextControlMenuController.prototype.showContextMenu = function (textArea, x, y) {
            var _this = this;
            this.dismiss();
            if(x <= 0 || y <= 0) {
                var offset = textArea.getBoundingClientRect();
                x = offset.left;
                y = offset.top;
            }
            if(!textArea || (textArea.tagName !== "TEXTAREA" && (textArea.tagName !== "INPUT" || !textArea.hasAttribute("type") || textArea.getAttribute("type") !== "text"))) {
                return true;
            }
            this._start = textArea.selectionStart;
            this._end = textArea.selectionEnd;
            var selectedText = textArea.value.substring(this._start, this._end);
            var pasteText = clipboardData.getData("text");
            this._canCut = (selectedText !== "");
            this._canCopy = (selectedText !== "");
            this._canPaste = !!pasteText;
            if(!this._contextMenu) {
                this._menuItems[menuTextControlItems.menuTreeCut].disabled = function () {
                    return !_this._canCut;
                };
                this._menuItems[menuTextControlItems.menuTreeCopy].disabled = function () {
                    return !_this._canCopy;
                };
                this._menuItems[menuTextControlItems.menuTreePaste].disabled = function () {
                    return !_this._canPaste;
                };
                this._contextMenu = Plugin.ContextMenu.create(this._menuItems, this._menuId, null, null, function (menuId, menuItem) {
                    return _this.onMenuItemClicked(menuId, menuItem.id, selectedText, pasteText);
                });
                this._dismissHandler = function (e) {
                    _this.dismiss();
                };
            }
            if(textArea) {
                this._contextMenu.attach(textArea);
            }
            this._contextMenu.addEventListener("dismiss", this._dismissHandler);
            this._contextMenu.show(parseInt(x.toFixed(0)), parseInt(y.toFixed(0)));
            toolwindowHelpers.contextMenuUp(true);
            return false;
        };
        TextControlMenuController.prototype.dismiss = function () {
            if(this._contextMenu) {
                this._contextMenu.removeEventListener("dismiss", this._dismissHandler);
                this._contextMenu.dismiss();
                this._contextMenu.dispose();
                this._contextMenu = null;
            }
            toolwindowHelpers.contextMenuUp(false);
        };
        return TextControlMenuController;
    })();
    Dom.TextControlMenuController = TextControlMenuController;    
    var menuHtmlTreeItems;
    (function (menuHtmlTreeItems) {
        menuHtmlTreeItems._map = [];
        menuHtmlTreeItems.menuTreeAddAttribute = 0;
        menuHtmlTreeItems.menuTreeDelete = 1;
        menuHtmlTreeItems.menuTreeEditAsHtml = 3;
        menuHtmlTreeItems.menuTreeCut = 4;
        menuHtmlTreeItems.menuTreeCopy = 5;
        menuHtmlTreeItems.menuTreePasteAsChild = 6;
        menuHtmlTreeItems.menuTreePasteBefore = 7;
        menuHtmlTreeItems.menuTreeCopyElementWithStyles = 8;
    })(menuHtmlTreeItems || (menuHtmlTreeItems = {}));
    var DomTreeContextMenuController = (function () {
        function DomTreeContextMenuController(_domExplorer, _bridge, _htmlID) {
            this._domExplorer = _domExplorer;
            this._bridge = _bridge;
            this._htmlID = _htmlID;
            this._menuId = "DomExplorerMenuTreeView";
            this._menuItems = [
                {
                    id: "menuTreeAddAttribute",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/AddAttributeMenuText")
                }, 
                {
                    id: "menuTreeDelete",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/DeleteElement"),
                    accessKey: Plugin.Resources.getString("AccessKeyDel")
                }, 
                {
                    id: "separator",
                    type: Plugin.ContextMenu.MenuItemType.separator
                }, 
                {
                    id: "menuTreeEditAsHtml",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/EditAsHtmlMenuText")
                }, 
                {
                    id: "menuTreeCut",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/CutMenuText"),
                    accessKey: Plugin.Resources.getString("AccessKeyCtrlX")
                }, 
                {
                    id: "menuTreeCopy",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/CopyMenuText"),
                    accessKey: Plugin.Resources.getString("AccessKeyCtrlC")
                }, 
                {
                    id: "menuTreePasteAsChild",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/PasteAsChildMenuText"),
                    accessKey: Plugin.Resources.getString("AccessKeyCtrlV")
                }, 
                {
                    id: "menuTreePasteBefore",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/PasteBeforeMenuText")
                }, 
                {
                    id: "menuTreeCopyElementWithStyles",
                    type: Plugin.ContextMenu.MenuItemType.command,
                    label: Plugin.Resources.getString("/Common/CopyElementWithStylesMenuText")
                }
            ];
            this.initialize();
        }
        DomTreeContextMenuController.prototype.initialize = function () {
            var _this = this;
            this._contextMenuListener = document.getElementById(this._htmlID);
            this._contextMenuListener.addEventListener("contextmenu", function (e) {
                return _this.onContextMenu(e);
            });
            this._contextMenuListener.addEventListener("keydown", function (e) {
                return _this.onKeydown(e);
            });
        };
        DomTreeContextMenuController.prototype.onKeydown = function (event) {
            this._domExplorer.onDomExplorerBeforeMenuLoaded();
            var shiftKey = event.shiftKey && !event.ctrlKey && !event.altKey;
            if(event.keyCode === Common.KeyCodes.F10 && shiftKey) {
                var targetInfo = this._domExplorer.getContextMenuTarget(event, false);
                this._selectedItem = targetInfo.target;
                this.showContextMenu(this._selectedItem, targetInfo.x, targetInfo.y);
                event.preventDefault();
                event.stopPropagation();
            }
            this._domExplorer.onDomExplorerMenuLoaded();
            return true;
        };
        DomTreeContextMenuController.prototype.onContextMenu = function (e) {
            this._domExplorer.onDomExplorerBeforeMenuLoaded();
            var element = $m(e.target);
            if(element.hasClass("BPT-HtmlTree-ChildCollection-ShowAll")) {
                return;
            }
            var targetInfo = this._domExplorer.getContextMenuTarget(e, false);
            this._selectedItem = targetInfo.target;
            this.showContextMenu(this._selectedItem, targetInfo.x, targetInfo.y);
            e.preventDefault();
            e.stopPropagation();
            this._domExplorer.onDomExplorerMenuLoaded();
            return false;
        };
        DomTreeContextMenuController.prototype.onMenuItemClicked = function (menuId, itemId, selectedItem) {
            var _this = this;
            if(menuId === this._menuId) {
                var uid;
                var textToCopy;
                var focusToTreeCallback = function (success) {
                    _this._domExplorer.focusToTree();
                };
                switch(itemId) {
                    case this._menuItems[menuHtmlTreeItems.menuTreeAddAttribute].id:
                        uid = selectedItem.attr("data-id");
                        this._domExplorer.domTree.editNewAttribute(uid, selectedItem);
                        break;
                    case this._menuItems[menuHtmlTreeItems.menuTreeDelete].id:
                        uid = selectedItem.attr("data-id");
                        this._domExplorer.deleteElement(uid, selectedItem, focusToTreeCallback);
                        break;
                    case this._menuItems[menuHtmlTreeItems.menuTreeCut].id:
                        this._domExplorer.doCut(selectedItem);
                        break;
                    case this._menuItems[menuHtmlTreeItems.menuTreeCopy].id:
                        if(toolwindowHelpers.hasSelectedText()) {
                            toolwindowHelpers.copySelectedTextToClipboard();
                        } else if(this._isTextNode) {
                            this._domExplorer.copyOuterHtmlToClipboard(this._parentOfSelected);
                        } else {
                            this._domExplorer.copyOuterHtmlToClipboard(selectedItem);
                        }
                        this._domExplorer.focusToTree();
                        break;
                    case this._menuItems[menuHtmlTreeItems.menuTreeEditAsHtml].id:
                        uid = selectedItem.attr("data-id");
                        this._domExplorer.domTree.editAsHtml(uid, selectedItem, this._domExplorer.horizontalPane.leftWidth * .80);
                        this._domExplorer.focusToTree();
                        break;
                    case this._menuItems[menuHtmlTreeItems.menuTreePasteAsChild].id:
                        this._domExplorer.pasteClipboardToHtml(selectedItem, null);
                        this._domExplorer.focusToTree();
                        break;
                    case this._menuItems[menuHtmlTreeItems.menuTreePasteBefore].id:
                        this._domExplorer.pasteClipboardToHtml(this._parentOfSelected, selectedItem);
                        this._domExplorer.focusToTree();
                        break;
                    case this._menuItems[menuHtmlTreeItems.menuTreeCopyElementWithStyles].id:
                        uid = selectedItem.attr("data-id");
                        this.copySelectedElementWithStyles(uid);
                        break;
                    default:
                        this._domExplorer.focusToTree();
                        break;
                }
                this.dismiss();
            } else {
                this._domExplorer.focusToTree();
            }
        };
        DomTreeContextMenuController.prototype.dismiss = function () {
            if(this._contextMenu) {
                this._contextMenu.removeEventListener("dismiss", this._dismissHandler);
                this._contextMenu.dismiss();
                this._contextMenu.dispose();
                this._contextMenu = null;
            }
            toolwindowHelpers.contextMenuUp(false);
        };
        DomTreeContextMenuController.prototype.copySelectedElementWithStyles = function (uid) {
            this._bridge.channel.call(this._bridge.engine, "copyElementWithStyle", [
                uid
            ], function (copy) {
                if(copy) {
                    clipboardData.setData("Text", copy);
                }
            });
        };
        DomTreeContextMenuController.prototype.showContextMenu = function (selectedItem, x, y) {
            var _this = this;
            this.dismiss();
            this._selectedItem = selectedItem;
            var hasItemSelected = this._selectedItem != null && this._selectedItem.length > 0;
            var dataTag = hasItemSelected ? this._selectedItem.attr("data-tag") : null;
            dataTag = dataTag || "";
            var tagName = dataTag.toLowerCase();
            this._isTextNode = tagName === "#text";
            var isComment = tagName === "#comment";
            var isDocType = tagName === "#doctype";
            var isWithinBody = tagName === "body" || (hasItemSelected && F12.DomExplorer.DomExplorerWindow.hasDataTag(this._selectedItem.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot"), "body"));
            var hasSelectedText = toolwindowHelpers.hasSelectedText();
            var clipboardText = clipboardData.getData("Text");
            this._parentOfSelected = hasItemSelected ? this._selectedItem.parents(".BPT-HtmlTreeItem").not(".BPT-HtmlTreeItem-HiddenRoot").first() : null;
            var hasParent = this._parentOfSelected != null && this._parentOfSelected.length > 0;
            var isChildOfEditableItem = hasParent && this._domExplorer.domTree.isUnderEditableItem(this._selectedItem);
            this._canAddAttribute = hasItemSelected && !this._isTextNode && !isComment && !isDocType;
            this._canDelete = this._domExplorer.canDeleteItem(this._selectedItem);
            this._canEditAsHtml = this._canDelete;
            this._canCut = this._canDelete;
            this._canCopy = toolwindowHelpers.hasSelectedText() || hasItemSelected;
            this._canCopyWithStyles = hasItemSelected && !this._isTextNode && !isComment && isWithinBody;
            this._canPaste = hasItemSelected && isChildOfEditableItem && clipboardText != "" && this._domExplorer.canPasteAsChild(this._selectedItem);
            this._canPasteBefore = hasItemSelected && isChildOfEditableItem && clipboardText != "" && (this._isTextNode || this._domExplorer.isEditableElement(tagName)) && !isDocType;
            if(!this._contextMenu) {
                this._menuItems[menuHtmlTreeItems.menuTreeAddAttribute].disabled = function () {
                    return !_this._canAddAttribute;
                };
                this._menuItems[menuHtmlTreeItems.menuTreeDelete].disabled = function () {
                    return !_this._canDelete;
                };
                this._menuItems[menuHtmlTreeItems.menuTreeEditAsHtml].disabled = function () {
                    return !_this._canEditAsHtml;
                };
                this._menuItems[menuHtmlTreeItems.menuTreeCut].disabled = function () {
                    return !_this._canCut;
                };
                this._menuItems[menuHtmlTreeItems.menuTreeCopy].disabled = function () {
                    return !_this._canCopy;
                };
                this._menuItems[menuHtmlTreeItems.menuTreePasteAsChild].disabled = function () {
                    return !_this._canPaste;
                };
                this._menuItems[menuHtmlTreeItems.menuTreePasteBefore].disabled = function () {
                    return !_this._canPasteBefore;
                };
                this._menuItems[menuHtmlTreeItems.menuTreeCopyElementWithStyles].disabled = function () {
                    return !_this._canCopyWithStyles;
                };
                this._contextMenu = Plugin.ContextMenu.create(this._menuItems, this._menuId, null, null, function (menuId, menuItem) {
                    return _this.onMenuItemClicked(menuId, menuItem.id, _this._selectedItem);
                });
                this._dismissHandler = function (e) {
                    _this.dismiss();
                };
            }
            if(hasItemSelected) {
                this._contextMenu.attach(this._selectedItem.get(0));
            }
            this._contextMenu.addEventListener("dismiss", this._dismissHandler);
            this._contextMenu.show(parseInt(x.toFixed(0)), parseInt(y.toFixed(0)));
            toolwindowHelpers.contextMenuUp(true);
        };
        return DomTreeContextMenuController;
    })();
    Dom.DomTreeContextMenuController = DomTreeContextMenuController;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/menus.js.map

// changedSelector.ts
var Dom;
(function (Dom) {
    var ChangedSelector = (function () {
        function ChangedSelector(selectorText, changeState, isSelectorChanged) {
            this.selectorText = selectorText;
            this.changeState = changeState;
            this.isSelectorChanged = isSelectorChanged;
            if(!ChangedSelector._ariaChangeStateRemoveString) {
                ChangedSelector._ariaChangeStateRemoveString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateRemove") : "";
            }
            if(!ChangedSelector._ariaChangeStateAddString) {
                ChangedSelector._ariaChangeStateAddString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateAdd") : "";
            }
        }
        Object.defineProperty(ChangedSelector.prototype, "ariaChangeStateString", {
            get: function () {
                switch(this.changeState) {
                    case Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE:
                        return ChangedSelector._ariaChangeStateRemoveString;
                    case Dom.StyleChangeNotifier.CHANGE_BAR_ADD:
                        return ChangedSelector._ariaChangeStateAddString;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        return ChangedSelector;
    })();
    Dom.ChangedSelector = ChangedSelector;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/ChangesView/changedSelector.js.map

// changedProperty.ts
var Dom;
(function (Dom) {
    var ChangedProperty = (function () {
        function ChangedProperty(name, value, isImportant, changeState, isNameChanged, isValueChanged, isPriorityChanged) {
            if (typeof isNameChanged === "undefined") { isNameChanged = false; }
            if (typeof isValueChanged === "undefined") { isValueChanged = false; }
            if (typeof isPriorityChanged === "undefined") { isPriorityChanged = false; }
            this.name = name;
            this.value = value;
            this.isImportant = isImportant;
            this.changeState = changeState;
            this.isNameChanged = isNameChanged;
            this.isValueChanged = isValueChanged;
            this.isPriorityChanged = isPriorityChanged;
            if(!ChangedProperty._ariaChangeStateRemoveString) {
                ChangedProperty._ariaChangeStateRemoveString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateRemove") : "";
            }
            if(!ChangedProperty._ariaChangeStateAddString) {
                ChangedProperty._ariaChangeStateAddString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateAdd") : "";
            }
        }
        Object.defineProperty(ChangedProperty.prototype, "priority", {
            get: function () {
                return this.isImportant ? " !important" : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedProperty.prototype, "ariaChangeStateString", {
            get: function () {
                switch(this.changeState) {
                    case Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE:
                        return ChangedProperty._ariaChangeStateRemoveString;
                    case Dom.StyleChangeNotifier.CHANGE_BAR_ADD:
                        return ChangedProperty._ariaChangeStateAddString;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        return ChangedProperty;
    })();
    Dom.ChangedProperty = ChangedProperty;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/ChangesView/changedProperty.js.map

// changedRule.ts
var Dom;
(function (Dom) {
    var ChangedRule = (function () {
        function ChangedRule(source, _rule, _url) {
            this.source = source;
            this._rule = _rule;
            this._url = _url;
            var _this = this;
            this._selectors = [];
            this._properties = [];
            var isSelectorChanged = this._rule.changeState === Dom.StyleChangeNotifier.CHANGE_BAR_UPDATE;
            if(isSelectorChanged) {
                this._selectors.push(new Dom.ChangedSelector(this._rule.originalSelectorText, Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE, isSelectorChanged));
                this._selectors.push(new Dom.ChangedSelector(this._rule.selectorText, Dom.StyleChangeNotifier.CHANGE_BAR_ADD, isSelectorChanged));
            } else {
                var selector = this._rule.isDeleted ? this._rule.originalSelectorText : this._rule.selectorText;
                this._selectors.push(new Dom.ChangedSelector(selector, this._rule.changeState, isSelectorChanged));
            }
            var groupedUpdates = [];
            this._rule.properties.forEach(function (property) {
                if(!(property.wasCreatedInSession && !property.isEnabled && property.status === Dom.StylePropertyStatus.valid)) {
                    if(property.isDeleted || (!property.isEnabled && property.status === Dom.StylePropertyStatus.valid)) {
                        _this._properties.push(new Dom.ChangedProperty(property.originalName, property.originalValue, property.originalIsImportant, Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE, isNameChanged, isValueChanged, isPriorityChanged));
                    } else if(property.changeState === Dom.StyleChangeNotifier.CHANGE_BAR_UPDATE) {
                        if(property.isShorthand && property.isEnabledIndeterminate) {
                            _this._properties.push(new Dom.ChangedProperty(property.originalName, property.originalValue, property.originalIsImportant, Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE));
                            property.properties.forEach(function (subproperty) {
                                if(subproperty.isEnabled) {
                                    groupedUpdates.push(new Dom.ChangedProperty(subproperty.name, subproperty.value, subproperty.isImportant, Dom.StyleChangeNotifier.CHANGE_BAR_ADD));
                                }
                            });
                        } else {
                            var isNameChanged = property.name !== property.originalName;
                            var isValueChanged = property.value !== property.originalValue;
                            var isPriorityChanged = property.isImportant !== property.originalIsImportant;
                            _this._properties.push(new Dom.ChangedProperty(property.originalName, property.originalValue, property.originalIsImportant, Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE, isNameChanged, isValueChanged, isPriorityChanged));
                            groupedUpdates.push(new Dom.ChangedProperty(property.name, property.value, property.isImportant, Dom.StyleChangeNotifier.CHANGE_BAR_ADD, isNameChanged, isValueChanged, isPriorityChanged));
                        }
                    } else {
                        var change = new Dom.ChangedProperty(property.name, property.value, property.isImportant, property.changeState);
                        if(property.changeState === Dom.StyleChangeNotifier.CHANGE_BAR_NONE) {
                            if(groupedUpdates.length) {
                                _this._properties = _this._properties.concat(groupedUpdates);
                                groupedUpdates = [];
                            }
                            _this._properties.push(change);
                        } else if(property.changeState === Dom.StyleChangeNotifier.CHANGE_BAR_ADD && property.isShorthand && property.isEnabledIndeterminate) {
                            property.properties.forEach(function (subproperty) {
                                if(subproperty.isEnabled) {
                                    groupedUpdates.push(new Dom.ChangedProperty(subproperty.name, subproperty.value, subproperty.isImportant, Dom.StyleChangeNotifier.CHANGE_BAR_ADD));
                                }
                            });
                        } else {
                            groupedUpdates.push(change);
                        }
                    }
                }
            });
            if(groupedUpdates.length) {
                this._properties = this._properties.concat(groupedUpdates);
            }
        }
        Object.defineProperty(ChangedRule.prototype, "uid", {
            get: function () {
                return this._rule.uid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "url", {
            get: function () {
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "isInline", {
            get: function () {
                return this._rule.isInlined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "isDeleted", {
            get: function () {
                return this._rule.isDeleted;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "line", {
            get: function () {
                return this._rule.fileLine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "column", {
            get: function () {
                return this._rule.fileColumn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "hasFileLink", {
            get: function () {
                return this._rule.isInlined || (!this._rule.wasCreatedInSession && this._rule.fileLine > 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "fileLink", {
            get: function () {
                if(this._rule.isInlined) {
                    return this._rule.target.description;
                }
                return toolwindowHelpers.createFileLinkText(null, this._rule.fileLine, this._rule.fileColumn);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "selectors", {
            get: function () {
                return this._selectors;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "properties", {
            get: function () {
                return this._properties;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "parent", {
            get: function () {
                return this._rule.parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "tooltip", {
            get: function () {
                return this.source.displaySourceTooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "footerState", {
            get: function () {
                var state = this._rule.changeState;
                if(state === Dom.StyleChangeNotifier.CHANGE_BAR_ADD || state === Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE) {
                    return state;
                }
                return Dom.StyleChangeNotifier.CHANGE_BAR_NONE;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedRule.prototype, "textForCopy", {
            get: function () {
                return this._rule.formatForCopy;
            },
            enumerable: true,
            configurable: true
        });
        ChangedRule.prototype.revert = function () {
            return this._rule.revert();
        };
        ChangedRule.prototype.matches = function (rule) {
            return this._rule === rule;
        };
        ChangedRule.compare = function compare(a, b) {
            if(a._rule.isInlined) {
                if(b._rule.isInlined) {
                    var aDesc = a._rule.target.description;
                    var bDesc = b._rule.target.description;
                    return aDesc === bDesc ? 0 : (aDesc > bDesc ? 1 : -1);
                }
                return -1;
            }
            if(b._rule.isInlined) {
                return 1;
            }
            if(a.line === b.line) {
                return a.column - b.column;
            }
            return a.line - b.line;
        };
        return ChangedRule;
    })();
    Dom.ChangedRule = ChangedRule;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/ChangesView/changedRule.js.map

// changedSource.ts
var Dom;
(function (Dom) {
    var ChangedSource = (function () {
        function ChangedSource(source, _model, isInline) {
            this.source = source;
            this._model = _model;
            this.children = [];
            var id = ChangedSource.ID_MAP[this.source];
            if(!id) {
                id = "changeId" + ChangedSource.NEXT_UNIQUE_ID++;
                ChangedSource.ID_MAP[this.source] = id;
            }
            this.uniqueId = id;
            this._tooltip = source;
        }
        ChangedSource.NEXT_UNIQUE_ID = 0;
        ChangedSource.ID_MAP = {
        };
        Object.defineProperty(ChangedSource.prototype, "displaySource", {
            get: function () {
                return toolwindowHelpers.getTruncatedFileName(this.source, 50);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedSource.prototype, "displaySourceTooltip", {
            get: function () {
                return this._tooltip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedSource.prototype, "expanded", {
            get: function () {
                return !this._model.isCollapsed(this.source);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangedSource.prototype, "textForCopy", {
            get: function () {
                var first = true;
                var text = "";
                this.children.forEach(function (rule) {
                    if(!first) {
                        text += "\r\n";
                    }
                    text += "/* ";
                    if(rule.isDeleted) {
                        text += toolwindowHelpers.loadString("RemoveStyleMenuText") + " ";
                    }
                    if(rule.hasFileLink) {
                        if(rule.isInline) {
                            text += rule.url + " " + rule.fileLink;
                        } else {
                            text += toolwindowHelpers.createFileLinkText(rule.url, rule.line, rule.column, Number.MAX_VALUE);
                        }
                    } else {
                        text += rule.url;
                    }
                    text += " */\r\n";
                    if(!rule.isDeleted) {
                        text += rule.textForCopy;
                    }
                    first = false;
                });
                return text;
            },
            enumerable: true,
            configurable: true
        });
        ChangedSource.prototype.add = function (change) {
            this.children.push(change);
        };
        ChangedSource.prototype.sort = function () {
            this.children.sort(Dom.ChangedRule.compare);
        };
        ChangedSource.prototype.updateTooltip = function (rule, tooltip) {
            for(var i = 0; i < this.children.length; i++) {
                if(this.children[i].matches(rule)) {
                    this._tooltip = tooltip;
                    break;
                }
            }
        };
        return ChangedSource;
    })();
    Dom.ChangedSource = ChangedSource;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/ChangesView/changedSource.js.map

// elementStyleModel.ts
var Dom;
(function (Dom) {
    var ElementStyleModel = (function () {
        function ElementStyleModel(_engine, _channel) {
            this._engine = _engine;
            this._channel = _channel;
            this._ruleMap = {
            };
            this._propertyMap = {
            };
            this._inheritedTargets = {
            };
            this._inlinedStyleName = toolwindowHelpers.loadString("InlineStyleSelector");
            this._listeners = [];
            this.rules = [];
        }
        ElementStyleModel.newUidTag = "new-";
        ElementStyleModel.newUidTagLength = ElementStyleModel.newUidTag.length;
        ElementStyleModel.nextUid = 0;
        ElementStyleModel.create = function create(engine, channel, elementUid, callback) {
            var model = new ElementStyleModel(engine, channel);
            var command;
            var args;
            if(elementUid) {
                command = "getStyles";
                args = [
                    elementUid
                ];
            } else {
                command = "getChangedStyles";
                args = [];
            }
            channel.call(engine, command, args, function (allStyles) {
                if(allStyles) {
                    for(var i = 0; i < allStyles.length; i++) {
                        model.processRawStyle(allStyles[i], i);
                    }
                    callback(model);
                }
            });
        };
        ElementStyleModel.createNewId = function createNewId() {
            return ElementStyleModel.newUidTag + ElementStyleModel.nextUid++;
        };
        ElementStyleModel.prototype.addUpdateListener = function (listener) {
            if(this._listeners.indexOf(listener) < 0) {
                this._listeners.push(listener);
            }
        };
        ElementStyleModel.prototype.removeUpdateListener = function (listener) {
            var index = this._listeners.indexOf(listener);
            if(index >= 0) {
                this._listeners.splice(index, 1);
            }
        };
        ElementStyleModel.prototype.updateWinningRule = function (propertyName) {
            var _this = this;
            this._channel.call(this._engine, "getWinningProperty", [
                propertyName
            ], function (winningPropertyId) {
                _this.rules.forEach(function (rule) {
                    rule.updateWinningProperty(propertyName, winningPropertyId);
                });
            });
        };
        ElementStyleModel.prototype.togglePropertyEnable = function (property, isEnabled, callback) {
            this._channel.call(this._engine, "EditStylePropertyEnable", [
                property.uid, 
                isEnabled
            ], callback);
        };
        ElementStyleModel.prototype.editRuleSelector = function (ruleId, newSelector, callback) {
            this._channel.call(this._engine, "EditStyleRuleSelector", [
                ruleId, 
                newSelector
            ], callback);
        };
        ElementStyleModel.prototype.editRuleDelete = function (ruleId, callback) {
            this._channel.call(this._engine, "editStyleRuleRemove", [
                ruleId
            ], callback);
        };
        ElementStyleModel.prototype.editRuleRevert = function (uid, callback) {
            this._channel.call(this._engine, "revertRule", [
                uid
            ], callback);
        };
        ElementStyleModel.prototype.addRule = function (selector, name, value, isImportant, position, callback) {
            this._channel.call(this._engine, "editStyleRuleAdd", [
                selector, 
                name, 
                value, 
                isImportant, 
                position
            ], callback);
        };
        ElementStyleModel.prototype.addProperty = function (uid, name, value, isImportant, beforeUid, callback) {
            this._channel.call(this._engine, "editStylePropertyAdd", [
                uid, 
                name, 
                value, 
                isImportant, 
                beforeUid
            ], callback);
        };
        ElementStyleModel.prototype.editPropertyName = function (uid, name, callback) {
            this._channel.call(this._engine, "editStylePropertyName", [
                uid, 
                name
            ], callback);
        };
        ElementStyleModel.prototype.editPropertyValue = function (uid, value, isImportant, callback) {
            this._channel.call(this._engine, "editStylePropertyValue", [
                uid, 
                value, 
                isImportant
            ], callback);
        };
        ElementStyleModel.prototype.editPropertyRevert = function (uid, callback) {
            this._channel.call(this._engine, "revertProperty", [
                uid
            ], callback);
        };
        ElementStyleModel.prototype.editPropertyDelete = function (uid, callback) {
            var _this = this;
            this._channel.call(this._engine, "removeStyleProperty", [
                uid
            ], function (result) {
                if(!result) {
                    delete _this._propertyMap[uid];
                }
                callback(result);
            });
        };
        ElementStyleModel.prototype.applyChanges = function (changes) {
            var _this = this;
            var property;
            var rule;
            changes.forEach(function (change) {
                switch(change.event) {
                    case "updateProperty":
                        property = _this.getPropertyById(change.uid);
                        if(property) {
                            property.updateFromRemote(change.obj);
                            if(!change.isDynamic) {
                                property.select();
                            }
                        }
                        break;
                    case "removeProperty":
                        property = _this.getPropertyById(change.uid);
                        if(property) {
                            property.remove(!change.isDynamic);
                        }
                        break;
                    case "addProperty":
                        rule = _this.getRuleById(change.uid);
                        if(rule) {
                            var property = rule.addProperty(change.obj, true, _this.getPropertyById(change.beforeUid));
                            property.recalculateWinning();
                            if(!change.isDynamic) {
                                property.select();
                            }
                        }
                        break;
                    case "updateRule":
                        rule = _this.getRuleById(change.uid);
                        if(rule) {
                            rule.updateFromRemote(change.obj);
                            if(!change.isDynamic) {
                                rule.select();
                            }
                        }
                        break;
                    case "revertRule":
                        rule = _this.getRuleById(change.uid);
                        if(rule) {
                            if(change.obj) {
                                rule.removeNewProperties();
                                rule.updateFromRemote(change.obj);
                            } else {
                                rule.remove();
                            }
                        }
                        break;
                    case "removeRule":
                        rule = _this.getRuleById(change.uid);
                        if(rule) {
                            rule.remove();
                        }
                        break;
                    case "addRule":
                        var position = _this.rules.length;
                        if(change.beforeUid) {
                            for(var i = 0; i < _this.rules.length; i++) {
                                if(_this.rules[i].uid === change.beforeUid) {
                                    position = i;
                                    break;
                                }
                            }
                        }
                        rule = _this.processRawStyle(change.obj, position, true);
                        if(!change.isDynamic) {
                            rule.select();
                        }
                        break;
                }
            });
        };
        ElementStyleModel.prototype.getRuleById = function (ruleUid) {
            return this._ruleMap[ruleUid];
        };
        ElementStyleModel.prototype.getPropertyById = function (uid) {
            return this._propertyMap[uid];
        };
        ElementStyleModel.prototype.remapPropertyId = function (property, oldUid, newUid) {
            if(oldUid) {
                delete this._propertyMap[oldUid];
            }
            if(newUid) {
                this._propertyMap[newUid] = property;
            }
        };
        ElementStyleModel.prototype.remapRuleId = function (rule, oldUid, newUid) {
            delete this._ruleMap[oldUid];
            this._ruleMap[newUid] = rule;
        };
        ElementStyleModel.prototype.removeProperty = function (property) {
            delete this._propertyMap[property.uid];
        };
        ElementStyleModel.prototype.createNewRule = function (selector) {
            var rule = new Dom.StyleRule(this, this._listeners, ElementStyleModel.createNewId(), true, false, selector);
            this._ruleMap[rule.uid] = rule;
            this.rules.splice(1, 0, rule);
            return rule;
        };
        ElementStyleModel.prototype.removeRule = function (rule) {
            if(rule.isInlined) {
                return false;
            }
            delete this._ruleMap[rule.uid];
            var rules = this.rules;
            for(var i = 0; i < rules.length; i++) {
                if(rules[i] == rule) {
                    rules.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        ElementStyleModel.prototype.setInlineProperty = function (propertyName, value, isImportant) {
            for(var i = 0; i < this.rules.length; i++) {
                var rule = this.rules[i];
                if(rule.isInlined && !rule.isInherited) {
                    rule.setExistingOrAddNewProperty(propertyName, value, isImportant);
                    return true;
                }
            }
            return false;
        };
        ElementStyleModel.isNew = function isNew(id) {
            return id.substr(0, ElementStyleModel.newUidTagLength) === ElementStyleModel.newUidTag;
        };
        ElementStyleModel.prototype.processRawStyle = function (remoteRule, index, isRemoteChange) {
            if (typeof isRemoteChange === "undefined") { isRemoteChange = false; }
            var uid = remoteRule.uid;
            var rule = new Dom.StyleRule(this, this._listeners, uid, remoteRule.wasCreatedInSession, remoteRule.isDeleted, remoteRule.isInlined ? this._inlinedStyleName : remoteRule.selector);
            if(remoteRule.declarationLocation) {
                rule.fileUrl = remoteRule.declarationLocation.uri;
                rule.fileLine = remoteRule.declarationLocation.line + 1;
                rule.fileColumn = remoteRule.declarationLocation.column + 1;
            } else {
                rule.fileUrl = remoteRule.styleHref;
            }
            if(rule.fileUrl) {
                rule.fileLinkText = toolwindowHelpers.createFileLinkText(rule.fileUrl, rule.fileLine);
                (Plugin).Host.getDocumentLocation(rule.fileUrl).done(function (loc) {
                    rule.tooltip = toolwindowHelpers.loadString("StyleRuleFileTooltip", [
                        toolwindowHelpers.htmlEscape(loc), 
                        rule.fileLine, 
                        rule.fileColumn
                    ]);
                    rule.notifyRuleChange(Dom.StyleRuleChangeEvent.fileLinkTooltip, rule, rule.tooltip);
                });
            }
            rule.styleHref = remoteRule.styleHref;
            rule.target = remoteRule.target;
            rule.isInherited = remoteRule.isInherited;
            rule.isInlined = remoteRule.isInlined;
            rule.parent = remoteRule.parent;
            rule.isFirstRuleInTargetGroup = remoteRule.isInherited && remoteRule.target && !this._inheritedTargets[remoteRule.target.uid];
            rule.setOriginal(remoteRule.originalSelector);
            this.rules.splice(index, 0, rule);
            this._ruleMap[uid] = rule;
            if(remoteRule.properties) {
                for(var i = 0; i < remoteRule.properties.length; i++) {
                    var property = rule.addProperty(remoteRule.properties[i]);
                }
            }
            if(rule.isFirstRuleInTargetGroup && rule.target) {
                this._inheritedTargets[rule.target.uid] = rule.target;
            }
            if(isRemoteChange) {
                rule.notifyRuleChange(Dom.StyleRuleChangeEvent.addRule, rule);
                rule.recalculateWinning();
            }
            return rule;
        };
        return ElementStyleModel;
    })();
    Dom.ElementStyleModel = ElementStyleModel;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/elementStyleModel.js.map

// stylePropertyStatus.ts
var Dom;
(function (Dom) {
    (function (StylePropertyStatus) {
        StylePropertyStatus._map = [];
        StylePropertyStatus._map[0] = "unknown";
        StylePropertyStatus.unknown = 0;
        StylePropertyStatus._map[1] = "valid";
        StylePropertyStatus.valid = 1;
        StylePropertyStatus._map[2] = "invalidName";
        StylePropertyStatus.invalidName = 2;
        StylePropertyStatus._map[3] = "invalidValue";
        StylePropertyStatus.invalidValue = 3;
    })(Dom.StylePropertyStatus || (Dom.StylePropertyStatus = {}));
    var StylePropertyStatus = Dom.StylePropertyStatus;
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/stylePropertyStatus.js.map

// styleProperty.ts
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Dom;
(function (Dom) {
    var StyleProperty = (function (_super) {
        __extends(StyleProperty, _super);
        function StyleProperty(_model, _listeners, wasCreatedInSession, current, original, originalLonghand, _isApplied, _isWinning, isDeleted, status, _uid, rule) {
                _super.call(this, _listeners);
            this._model = _model;
            this._listeners = _listeners;
            this.wasCreatedInSession = wasCreatedInSession;
            this.original = original;
            this.originalLonghand = originalLonghand;
            this._isApplied = _isApplied;
            this._isWinning = _isWinning;
            this.isDeleted = isDeleted;
            this._uid = _uid;
            this.rule = rule;
            this.properties = [];
            this._status = StyleProperty.convertStatusStringToStatus(status);
            this.owner = this;
            this._name = current.name;
            this._value = current.value;
            this._isImportant = current.isImportant;
            this._isEnabled = current.isEnabled;
            if(!StyleProperty._ariaOverriddenString) {
                StyleProperty._ariaOverriddenString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaOverridden") : "";
            }
            if(!StyleProperty._ariaInvalidString) {
                StyleProperty._ariaInvalidString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("SingleError", "") + ":" : "";
            }
            if(!StyleProperty._ariaChangeStateRemoveString) {
                StyleProperty._ariaChangeStateRemoveString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateRemove") : "";
            }
            if(!StyleProperty._ariaChangeStateAddString) {
                StyleProperty._ariaChangeStateAddString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateAdd") : "";
            }
            if(!StyleProperty._ariaChangeStateUpdateString) {
                StyleProperty._ariaChangeStateUpdateString = typeof (Plugin) != "undefined" && typeof (Plugin.Resources) != "undefined" ? toolwindowHelpers.loadString("AriaChangeStateUpdate") : "";
            }
            this.updateChangeState();
        }
        Object.defineProperty(StyleProperty.prototype, "isApplied", {
            get: function () {
                return this._isApplied;
            },
            set: function (value) {
                if(value !== this._isApplied) {
                    this._isApplied = value;
                    this.notifyPropertyChange(Dom.StylePropertyChangeEvent.isApplied, this, value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isEnabled", {
            get: function () {
                return this._isEnabled;
            },
            set: function (value) {
                var _this = this;
                if(value !== this._isEnabled) {
                    this._isEnabled = value;
                    this.notifyPropertyChange(Dom.StylePropertyChangeEvent.isEnabled, this, value);
                    if(this.isSubProperty) {
                        var shorthand = this.owner;
                        shorthand._isEnabled = shorthand._isEnabled || this.isEnabledIndeterminate;
                        var notifyValue = this.isEnabledIndeterminate ? undefined : this._isEnabled;
                        this.notifyPropertyChange(Dom.StylePropertyChangeEvent.isEnabled, shorthand, notifyValue);
                    } else if(this.isShorthand) {
                        this.properties.forEach(function (subproperty) {
                            subproperty._isEnabled = value;
                            _this.notifyPropertyChange(Dom.StylePropertyChangeEvent.isEnabled, subproperty, value);
                        });
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isWinning", {
            get: function () {
                return this._isWinning;
            },
            set: function (value) {
                this._isWinning = value;
                this.notifyPropertyChange(Dom.StylePropertyChangeEvent.isWinning, this, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                if(value !== this._name) {
                    this._name = value;
                    this.notifyPropertyChange(Dom.StylePropertyChangeEvent.name, this, value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "originalName", {
            get: function () {
                return this.original ? this.original.name : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "originalValue", {
            get: function () {
                return this.original ? this.original.value : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isImportant", {
            get: function () {
                return this._isImportant;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "originalIsImportant", {
            get: function () {
                return this.original ? this.original.isImportant : false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "uid", {
            get: function () {
                return this._uid;
            },
            set: function (value) {
                if(value !== this._uid) {
                    var ownerUid = this.owner.uid;
                    var oldUid = this._uid;
                    this._model.remapPropertyId(this, oldUid, value);
                    this.notifyPropertyChange(Dom.StylePropertyChangeEvent.uid, this, value);
                    this._uid = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "status", {
            get: function () {
                return this._status;
            },
            set: function (value) {
                if(value !== this._status) {
                    this._status = value;
                    this.notifyPropertyChange(Dom.StylePropertyChangeEvent.status, this, value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isRule", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isProperty", {
            get: function () {
                return this.owner === this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isSubProperty", {
            get: function () {
                return this.owner !== this;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isEditable", {
            get: function () {
                return this.isProperty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "container", {
            get: function () {
                return this.owner === this ? this.rule : this.owner;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isNew", {
            get: function () {
                return Dom.ElementStyleModel.isNew(this._uid);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isDisplayableColor", {
            get: function () {
                return (this.isColor && this._status === Dom.StylePropertyStatus.valid && !StyleProperty.isNonDisplayableColorValue(this._value)) || this.isSupPropertyDisplayableColor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "colorForDisplay", {
            get: function () {
                if(this.isDisplayableColor) {
                    if(this.isShorthand) {
                        for(var i = 0; i < this.properties.length; i++) {
                            var subproperty = this.properties[i];
                            if(subproperty.isDisplayableColor) {
                                return subproperty.value;
                            }
                        }
                    } else {
                        return this._value;
                    }
                    return "";
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "valueForDisplay", {
            get: function () {
                var value = this.valueWithPriority;
                return value.length ? value : "\u2003";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isEnabledIndeterminate", {
            get: function () {
                var subproperties = this.isSubProperty ? this.owner.properties : this.properties;
                var countEnabled = 0;
                for(var i = 0; i < subproperties.length; i++) {
                    var subproperty = subproperties[i];
                    if(subproperty.isEnabled) {
                        countEnabled++;
                    }
                }
                return !!countEnabled && countEnabled !== subproperties.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "enabledMixedState", {
            get: function () {
                return this.isEnabledIndeterminate ? "mixed" : ("" + this._isEnabled);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isShorthand", {
            get: function () {
                return this.properties.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isNameDisplayedAsInvalid", {
            get: function () {
                return !this.isValidName && /^([^-]|-ms)/.test(this.name);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isValidName", {
            get: function () {
                return this._status === Dom.StylePropertyStatus.valid || this._status === Dom.StylePropertyStatus.invalidValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isValidValue", {
            get: function () {
                return this._status === Dom.StylePropertyStatus.valid || this._status === Dom.StylePropertyStatus.invalidName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isInvalid", {
            get: function () {
                return this._status !== Dom.StylePropertyStatus.valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isStrikeThrough", {
            get: function () {
                return !this._isWinning && this._status === Dom.StylePropertyStatus.valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isOriginal", {
            get: function () {
                if(this.isDeleted || !this.original || this._name !== this.original.name || this._value !== this.original.value || this._isImportant !== this.original.isImportant || this._isEnabled !== this.original.isEnabled) {
                    return false;
                }
                if(this.isShorthand) {
                    for(var i = 0; i < this.properties.length; i++) {
                        if(!this.properties[i].isOriginal) {
                            return false;
                        }
                    }
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "formatForCopy", {
            get: function () {
                return this.name + ": " + this.valueWithPriority + ";";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "ariaOverriddenString", {
            get: function () {
                return this.isStrikeThrough ? StyleProperty._ariaOverriddenString : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "ariaInvalidNameString", {
            get: function () {
                return !this.isValidName ? StyleProperty._ariaInvalidString : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "ariaInvalidValueString", {
            get: function () {
                return !this.isValidValue ? StyleProperty._ariaInvalidString : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "ariaChangeStateString", {
            get: function () {
                switch(this.changeState) {
                    case Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE:
                        return StyleProperty._ariaChangeStateRemoveString;
                    case Dom.StyleChangeNotifier.CHANGE_BAR_ADD:
                        return StyleProperty._ariaChangeStateAddString;
                    case Dom.StyleChangeNotifier.CHANGE_BAR_UPDATE:
                        return StyleProperty._ariaChangeStateUpdateString;
                }
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isColor", {
            get: function () {
                return this.name.indexOf("color") > -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "isSupPropertyDisplayableColor", {
            get: function () {
                if(this.isShorthand) {
                    for(var i = 0; i < this.properties.length; i++) {
                        var subproperty = this.properties[i];
                        if(subproperty.isDisplayableColor) {
                            return true;
                        }
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "valueWithPriority", {
            get: function () {
                return this._value + (this._isImportant ? " !important" : "");
            },
            enumerable: true,
            configurable: true
        });
        StyleProperty.isNonDisplayableColorValue = function isNonDisplayableColorValue(value) {
            return value === "" || value === "inherit" || value === "currentColor" || value === "flavor" || value === "invert" || value === "transparent";
        };
        Object.defineProperty(StyleProperty.prototype, "changeState", {
            get: function () {
                return this._changeState;
            },
            set: function (value) {
                if(this._changeState !== value) {
                    this._changeState = value;
                    this.container.updateChangeState();
                    this.notifyPropertyChange(Dom.StylePropertyChangeEvent.change, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StyleProperty.prototype, "extendedChangeState", {
            get: function () {
                return this._extendedChangeState;
            },
            set: function (value) {
                if(this._extendedChangeState !== value) {
                    this._extendedChangeState = value;
                    this.container.updateChangeState();
                    this.notifyPropertyChange(Dom.StylePropertyChangeEvent.change, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        StyleProperty.prototype.addSubproperty = function (subproperty, doNotify) {
            subproperty.original = this.getLonghandOriginal(this.properties.length);
            subproperty.updateChangeState();
            this.properties.push(subproperty);
            subproperty.owner = this;
            this._model.remapPropertyId(subproperty, null, subproperty.uid);
            if(doNotify) {
                this.notifyPropertyChange(Dom.StylePropertyChangeEvent.addSubproperty, this, subproperty);
            }
        };
        StyleProperty.prototype.clearSubproperties = function () {
            var _this = this;
            this.properties.forEach(function (subproperty) {
                _this._model.remapPropertyId(subproperty, subproperty.uid, null);
            });
            this.properties = [];
            this.notifyPropertyChange(Dom.StylePropertyChangeEvent.clearSubproperties, this);
        };
        StyleProperty.prototype.select = function () {
            this.notifyPropertyChange(Dom.StylePropertyChangeEvent.select, this);
        };
        StyleProperty.prototype.updateWinning = function (propertyName, winningPropertyId) {
            var foundInSubproperty = false;
            var winningCount = 0;
            this.properties.forEach(function (subproperty) {
                if(subproperty.uid === winningPropertyId) {
                    subproperty.isWinning = true;
                    foundInSubproperty = true;
                } else if(subproperty.name === propertyName) {
                    subproperty.isWinning = false;
                    foundInSubproperty = true;
                }
                if(subproperty._isWinning) {
                    winningCount++;
                }
            });
            if(foundInSubproperty) {
                this.isWinning = winningCount > 0;
            } else if(this.uid === winningPropertyId) {
                this.isWinning = true;
            } else if(this.name === propertyName && !this.isShorthand) {
                this.isWinning = false;
            }
        };
        StyleProperty.prototype.recalculateWinning = function () {
            var _this = this;
            if(this.isShorthand) {
                this.properties.forEach(function (subproperty) {
                    _this._model.updateWinningRule(subproperty.name);
                });
            } else {
                this._model.updateWinningRule(this.name);
            }
        };
        StyleProperty.prototype.toggleEnable = function () {
            var _this = this;
            return new Plugin.Promise(function (completed) {
                var value = !_this._isEnabled;
                _this._model.togglePropertyEnable(_this, value, function () {
                    _this.isEnabled = value;
                    _this.recalculateWinning();
                    _this.updateChangeState();
                    if(_this.isShorthand) {
                        _this.properties.forEach(function (subproperty) {
                            subproperty.updateChangeState();
                        });
                    }
                    completed();
                });
            });
        };
        StyleProperty.prototype.commitName = function (newName) {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                if(_this._name !== newName) {
                    var oldName = _this._name;
                    _this._name = newName;
                    if(_this.isNew) {
                        _this.commitNewProperty().then(completed, error);
                    } else {
                        _this._model.editPropertyName(_this._uid, _this._name, function (result) {
                            _this._name = oldName;
                            if(result) {
                                _this.recalculateWinning();
                                _this.updateFromRemote(result);
                                completed();
                            } else {
                                _this.refreshNameDisplay();
                                error();
                            }
                        });
                    }
                } else {
                    completed();
                }
            });
        };
        StyleProperty.prototype.commitValue = function (newValue) {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                var newImportant = false;
                if(newValue.match(/!important$/)) {
                    newValue = newValue.substring(0, newValue.length - 10).trim();
                    newImportant = true;
                }
                if(_this._value !== newValue || _this._isImportant !== newImportant) {
                    var oldValue = _this._value;
                    var oldImportant = _this._isImportant;
                    _this._value = newValue;
                    _this._isImportant = newImportant;
                    if(_this.isNew) {
                        _this.commitNewProperty().then(completed, error);
                    } else {
                        _this._model.editPropertyValue(_this._uid, _this._value, _this._isImportant, function (result) {
                            if(result) {
                                _this.updateFromRemote(result);
                                completed();
                            } else {
                                _this._value = oldValue;
                                _this._isImportant = oldImportant;
                                _this.refreshValueDisplay();
                                error();
                            }
                        });
                    }
                } else {
                    completed();
                }
            });
        };
        StyleProperty.prototype.revert = function () {
            var _this = this;
            if(this.wasCreatedInSession) {
                return this.commitDelete(true);
            } else {
                return new Plugin.Promise(function (completed, error) {
                    _this._model.editPropertyRevert(_this._uid, function (result) {
                        if(result) {
                            _this.recalculateWinning();
                            _this.updateFromRemote(result);
                            completed();
                        } else {
                            error();
                        }
                    });
                });
            }
        };
        StyleProperty.prototype.lookupLonghandOriginals = function () {
            for(var i = 0; i < this.properties.length; i++) {
                var property = this.properties[i];
                property.original = this.getLonghandOriginal(i);
                property.updateChangeState();
            }
        };
        StyleProperty.prototype.updateFromRemote = function (remoteProperty) {
            var _this = this;
            this.remoteUpdateProperty(remoteProperty);
            var i;
            var property;
            if(this.properties.length == remoteProperty.longhand.length) {
                for(i = 0; i < this.properties.length; i++) {
                    property = this.properties[i];
                    var longhand = remoteProperty.longhand[i];
                    longhand.original = this.getLonghandOriginal(i);
                    property.remoteUpdateProperty(longhand);
                }
            } else {
                this.clearSubproperties();
                remoteProperty.longhand.forEach(function (longhand) {
                    property = new StyleProperty(_this._model, _this._listeners, false, longhand.current, null, null, longhand.isApplied, true, false, longhand.status, longhand.uid, _this.rule);
                    _this.addSubproperty(property, true);
                });
                this.lookupLonghandOriginals();
            }
            this.recalculateWinning();
        };
        StyleProperty.prototype.remove = function (changeSelection) {
            this.recalculateWinning();
            var index = this.rule.removeProperty(this);
            var nextSelection;
            if(changeSelection) {
                nextSelection = index < this.rule.properties.length ? this.rule.properties[index] : (index > 0 ? this.rule.properties[index - 1] : this.rule);
            }
            this.notifyPropertyChange(Dom.StylePropertyChangeEvent.remove, this, nextSelection);
        };
        StyleProperty.prototype.commitDelete = function (changeSelection) {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                _this._model.editPropertyDelete(_this.uid, function (result) {
                    if(result) {
                        _this.recalculateWinning();
                        _this.updateFromRemote(result);
                    } else {
                        _this.remove(changeSelection);
                    }
                    completed();
                });
            });
        };
        StyleProperty.prototype.refreshNameDisplay = function () {
            this.notifyPropertyChange(Dom.StylePropertyChangeEvent.name, this, this._name);
            this.notifyPropertyChange(Dom.StylePropertyChangeEvent.status, this, this._status);
        };
        StyleProperty.prototype.setValue = function (value, isImportant) {
            this._value = value;
            this._isImportant = isImportant;
            this.notifyPropertyChange(Dom.StylePropertyChangeEvent.value, this, this.valueForDisplay);
        };
        StyleProperty.prototype.refreshValueDisplay = function () {
            this.notifyPropertyChange(Dom.StylePropertyChangeEvent.value, this, this.valueForDisplay);
            this.notifyPropertyChange(Dom.StylePropertyChangeEvent.status, this, this._status);
        };
        StyleProperty.prototype.updateChangeState = function () {
            if(this.isDeleted || this.container.isDeleted) {
                this.changeState = Dom.StyleChangeNotifier.CHANGE_BAR_REMOVE;
            } else if(this.wasCreatedInSession || this.container.wasCreatedInSession) {
                this.changeState = Dom.StyleChangeNotifier.CHANGE_BAR_ADD;
            } else if(!this.isOriginal) {
                this.changeState = Dom.StyleChangeNotifier.CHANGE_BAR_UPDATE;
            } else {
                this.changeState = Dom.StyleChangeNotifier.CHANGE_BAR_NONE;
                for(var i = 0; i < this.properties.length; i++) {
                    if(this.properties[i].changeState) {
                        this.changeState = Dom.StyleChangeNotifier.CHANGE_BAR_UPDATE;
                    }
                }
            }
            this.extendedChangeState = this.changeState;
        };
        StyleProperty.convertStatusStringToStatus = function convertStatusStringToStatus(status) {
            switch(status) {
                case "Valid":
                    return Dom.StylePropertyStatus.valid;
                case "UnrecognizedProperty":
                    return Dom.StylePropertyStatus.invalidName;
                case "InvalidValue":
                    return Dom.StylePropertyStatus.invalidValue;
            }
            return Dom.StylePropertyStatus.unknown;
        };
        StyleProperty.prototype.getLonghandOriginal = function (index) {
            if(this.originalLonghand && this.originalLonghand.length === this.properties.length) {
                return this.originalLonghand[index];
            }
            return {
                name: "",
                value: "",
                isImportant: false,
                isEnabled: false
            };
        };
        StyleProperty.prototype.commitNewProperty = function () {
            var _this = this;
            if(this.rule.isNew) {
                return this.rule.commitNewRule(this);
            } else {
                var position = -1;
                for(var i = 0; i < this.rule.properties.length; i++) {
                    if(this.rule.properties[i] === this) {
                        position = i;
                        break;
                    }
                }
                var nextUid = position < this.rule.properties.length - 1 ? this.rule.properties[position + 1].uid : null;
                return new Plugin.Promise(function (completed, error) {
                    _this._model.addProperty(_this.rule.uid, _this._name, _this._value, _this._isImportant, nextUid, function (result) {
                        if(result) {
                            _this.updateFromRemote(result);
                            completed();
                        } else {
                            error();
                        }
                    });
                });
            }
        };
        StyleProperty.prototype.remoteUpdateProperty = function (remoteProperty) {
            var current = remoteProperty.current;
            this.uid = remoteProperty.uid;
            this.wasCreatedInSession = remoteProperty.wasCreatedInSession;
            this.original = remoteProperty.original;
            this.originalLonghand = remoteProperty.originalLonghand;
            this.name = current.name;
            this.status = StyleProperty.convertStatusStringToStatus(remoteProperty.status);
            this.isEnabled = current.isEnabled;
            this.isApplied = remoteProperty.isApplied;
            this.isDeleted = remoteProperty.isDeleted;
            this.setValue(current.value, current.isImportant);
            this.updateChangeState();
        };
        return StyleProperty;
    })(Dom.StyleChangeNotifier);
    Dom.StyleProperty = StyleProperty;    
})(Dom || (Dom = {}));
//@ sourceMappingURL=file:///f:/binaries/Intermediate/bpt/domexplorer.csproj__1112973576/objr/x86/DomExplorer/Styles/styleProperty.js.map


// SIG // Begin signature block
// SIG // MIIasQYJKoZIhvcNAQcCoIIaojCCGp4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFHnavW+s7YSp
// SIG // g88olUvX7v3QsOjroIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AAA0JDFAyaDBeY0AAAAAADQwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTEzMDMyNzIw
// SIG // MDgyNVoXDTE0MDYyNzIwMDgyNVowgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpCOEVDLTMwQTQtNzE0NDEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAOUaB60KlizUtjRkyzQg8rwEWIKLtQncUtRwn+Jc
// SIG // LOf1aqT1ti6xgYZZAexJbCkEHvU4i1cY9cAyDe00kOzG
// SIG // ReW7igolqu+he4fY8XBnSs1q3OavBZE97QVw60HPq7El
// SIG // ZrurorcY+XgTeHXNizNcfe1nxO0D/SisWGDBe72AjTOT
// SIG // YWIIsY9REmWPQX7E1SXpLWZB00M0+peB+PyHoe05Uh/4
// SIG // 6T7/XoDJBjYH29u5asc3z4a1GktK1CXyx8iNr2FnitpT
// SIG // L/NMHoMsY8qgEFIRuoFYc0KE4zSy7uqTvkyC0H2WC09/
// SIG // L88QXRpFZqsC8V8kAEbBwVXSg3JCIoY6pL6TUAECAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBRfS0LeDLk4oNRmNo1W
// SIG // +3RZSWaBKzAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAPQlCg1R6t
// SIG // Fz8fCqYrN4pnWC2xME8778JXaexl00zFUHLycyX25IQC
// SIG // xXUccVhDq/HJqo7fym9YPInnL816Nexm19Veuo6fV4aU
// SIG // EKDrUTetV/YneyNPGdjgbXYEJTBhEq2ljqMmtkjlU/JF
// SIG // TsW4iScQnanjzyPpeWyuk2g6GvMTxBS2ejqeQdqZVp7Q
// SIG // 0+AWlpByTK8B9yQG+xkrmLJVzHqf6JI6azF7gPMOnleL
// SIG // t+YFtjklmpeCKTaLOK6uixqs7ufsLr9LLqUHNYHzEyDq
// SIG // tEqTnr+cg1Z/rRUvXClxC5RnOPwwv2Xn9Tne6iLth4yr
// SIG // sju1AcKt4PyOJRUMIr6fDO0dMIIE7DCCA9SgAwIBAgIT
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSjQgpOHISo
// SIG // gH0Yr7maSa5k9+NSXDBUBgorBgEEAYI3AgEMMUYwRKAq
// SIG // gCgARABvAG0ARQB4AHAAbABvAHIAZQByAE0AZQByAGcA
// SIG // ZQBkAC4AagBzoRaAFGh0dHA6Ly9taWNyb3NvZnQuY29t
// SIG // MA0GCSqGSIb3DQEBAQUABIIBAJIQA8aXGRYaUJ17MarN
// SIG // R9pRnor0k7+ryVpqvESjvRCPQsXl1KWfG15n4LXlvMqc
// SIG // kfrgwKOO1XnvTnsbsCsUj3LwsZxHpDUDuJjTyDs8WKtB
// SIG // AnhCMY/DEAraHx6x4XmgttCO0zfI1ArUaSIaUp7JbYH/
// SIG // yYG78ccT/+uJp2f3oE3s1F9rGMG+zB7YPLCwNui0KAvC
// SIG // LYlpTNr7GwPol6SKThXtuKTPkzlVKEECyaA4gfu3Jtba
// SIG // a/Co8Rg6zeVWNAyf/FOdPo2YtMWvtZrXLHnzwT6V/rx2
// SIG // M8AUqHcx3M2rjKQWIcjM1lrmA7MCz5KwPExu6yGQCJOL
// SIG // 6e+3GiNHdVo70fuhggIoMIICJAYJKoZIhvcNAQkGMYIC
// SIG // FTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEh
// SIG // MB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // AhMzAAAANCQxQMmgwXmNAAAAAAA0MAkGBSsOAwIaBQCg
// SIG // XTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqG
// SIG // SIb3DQEJBTEPFw0xNDA1MDEwNzUzMDlaMCMGCSqGSIb3
// SIG // DQEJBDEWBBQOtvKWlUX7KWo+v0oivuUiqaTtHTANBgkq
// SIG // hkiG9w0BAQUFAASCAQBj2juh+OJs5753J+YCI8gH3c4z
// SIG // RaKsqthwpB875YBd2r76G/1e41Kje9lljOuQNCy9Fzmz
// SIG // v02pBWYBCcfXf/1AAailDTnPIaVd+nj7cMNNw3nHj6eH
// SIG // ++zs90mDgBVvVJHg8uAfvQWcbKRoo3Jnpxpw0wAEY4cZ
// SIG // NTuUXwaLRofOCFm8VTLKGWdD48t3eleNp0y2bzigtUnR
// SIG // fU9wehiCKdniJULcItovAq5uL03NmLw6V+UutgaxMS40
// SIG // f+e9OAXBogV2pBa1FjqtNuDZcB9pNXX0q+O7r4H2T9Gm
// SIG // f8R6g87u1M3vucxkxoV1iTd9CokUv7f/g9Nz+BSRDeGM
// SIG // i0at/EYa
// SIG // End signature block
