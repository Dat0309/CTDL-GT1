//
// Copyright (C) Microsoft. All rights reserved.
//
// <!-- saved from url=(0016)http://localhost -->
// MemoryAnalyzer.templates.ts
var ControlTemplates;
(function (ControlTemplates) {
    var MemoryAnalyzer = (function () {
        function MemoryAnalyzer() {
        }
        MemoryAnalyzer.toolbarButtonsPanel = "\
<div>\
  <div id=\"startToolbarButton\" data-name=\"startToolbarButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:startToolbarButton,                                tooltip:F12StartButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:isStartEnabled\"></div>\
  <div id=\"stopToolbarButton\" data-name=\"stopToolbarButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:stopToolbarButton,                                tooltip:F12StopButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:isStopEnabled\"></div>\
  <div id=\"openSessionButton\" data-name=\"openSessionButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:openSessionButton,                                tooltip:F12OpenSessionButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:isOpenSessionEnabled\"></div>\
  <div id=\"saveSessionButton\" data-name=\"saveSessionButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:saveSessionButton,                                tooltip:F12SaveSessionButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:isSaveSessionEnabled\"></div>\
  <div id=\"takeSnapshotToolbarButton\" data-name=\"takeSnapshotToolbarButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:takeSnapshotToolbarButton,                                tooltip:F12SnapshotButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:isTakeSnapshotEnabled\"></div>\
</div>\
";
        MemoryAnalyzer.scopeFilterTemplate = "\
<div class=\"scopeFilterBox\">\
  <label class=\"scopeFilterLabel\" for=\"BPT-VisualProfiler-scopeFilter\" data-options=\"textContent:ScopeFilterLabel; converter=Common.CommonConverters.ResourceConverter\"></label>\
  <div id=\"BPT-VisualProfiler-scopeFilter\" data-name=\"scopeFilter\" data-control=\"Common.Controls.ComboBox\" data-binding=\"items:scopeFilterOptions,                                   selectedValue:scopeFilter; mode=twoway; converter=Common.CommonConverters.IntToStringConverter\" data-options=\"className:scopeFilter,                                   tabIndex:2,                                   tooltip:ScopeFilterTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
</div>\
";
        MemoryAnalyzer.analysisBarTemplate = "\
<div class=\"analysisContainer\">\
  <div data-name=\"scopeFilterTemplate\" data-binding=\"isVisible:isDiff\" data-control=\"Common.TemplateControl\" data-control-templateid=\"MemoryAnalyzer.scopeFilterTemplate\" data-controlbinding=\"model:model\"></div>\
  <div data-name=\"filterInput\" data-control=\"Common.Controls.TextBox\" data-binding=\"text:dataTabModel.filterString; mode=twoway,                                isVisible:dataTabModel.isTextSearchable\" data-options=\"attr-aria-label:IdentifierFilter; converter=Common.CommonConverters.ResourceConverter,                                className: filterInput,                                tabIndex:2,                                placeholder:IdentifierFilter; converter=Common.CommonConverters.ResourceConverter,                                updateOnInput:1,                                tooltip:IdentifierFilterTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"foldObjectsByDominatorButton\" data-control=\"Common.Controls.ToggleButton\" data-control-templateid=\"Common.iconButton24x24\" data-binding=\"isChecked:foldObjectsByDominator; mode=twoway,                                isVisible:dataTabModel.isDominatorFoldingPossible\" data-options=\"className:foldObjectsByDominatorButton,                                tabIndex:2,                                tooltip:FoldInObjectsByDominatorTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"settingsMenuButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.menuButton33x24\" data-options=\"className:settingsMenuButton,                                tabIndex:2,                                toggleIsCheckedOnClick:false; converter=Common.CommonConverters.StringToBooleanConverter,                                tooltip:SettingsMenuButtonTooltipText; converter=Common.CommonConverters.ResourceConverter\"></div>\
</div>\
";
        MemoryAnalyzer.settingsDropDownMenu = "\
<ul>\
  <div data-name=\"showBuiltinsMenuItem\" data-control=\"Common.Controls.CheckBoxMenuItem\" data-binding=\"isChecked:showBuiltIns; mode=twoway\" data-options=\"content:ShowBuiltIns; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"displayObjectIdsMenuItem\" data-control=\"Common.Controls.CheckBoxMenuItem\" data-binding=\"isChecked:displayObjectIDs; mode=twoway\" data-options=\"content:DisplayObjectIDs; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"showNonMatchingReferencesMenuItem\" data-control=\"Common.Controls.CheckBoxMenuItem\" data-binding=\"isChecked:showNonMatchingReferences; mode=twoway,                                isVisible:isDiff\" data-options=\"content:ShowNonMatchingReferences; converter=Common.CommonConverters.ResourceConverter\"></div>\
</ul>\
";
        return MemoryAnalyzer;
    })();
    ControlTemplates.MemoryAnalyzer = MemoryAnalyzer;
})(ControlTemplates || (ControlTemplates = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/MemoryAnalyzer.templates.js.map

// canvasChartControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (Controls) {
        (function (Charting) {
            (function (ChartViewType) {
                ChartViewType[ChartViewType["Scale"] = 0] = "Scale";
                ChartViewType[ChartViewType["Expand"] = 1] = "Expand";
                ChartViewType[ChartViewType["Roll"] = 2] = "Roll";
                ChartViewType[ChartViewType["Fixed"] = 3] = "Fixed";
            })(Charting.ChartViewType || (Charting.ChartViewType = {}));
            var ChartViewType = Charting.ChartViewType;

            (function (SeriesRenderType) {
                SeriesRenderType[SeriesRenderType["Points"] = 1] = "Points";
                SeriesRenderType[SeriesRenderType["Line"] = 2] = "Line";
                SeriesRenderType[SeriesRenderType["PointsAndLine"] = SeriesRenderType.Points | SeriesRenderType.Line] = "PointsAndLine";
                SeriesRenderType[SeriesRenderType["VerticalLines"] = 4] = "VerticalLines";
                SeriesRenderType[SeriesRenderType["Triangles"] = 8] = "Triangles";
            })(Charting.SeriesRenderType || (Charting.SeriesRenderType = {}));
            var SeriesRenderType = Charting.SeriesRenderType;

            (function (SeriesOrderType) {
                SeriesOrderType[SeriesOrderType["Sort"] = 0] = "Sort";
                SeriesOrderType[SeriesOrderType["Remove"] = 1] = "Remove";
            })(Charting.SeriesOrderType || (Charting.SeriesOrderType = {}));
            var SeriesOrderType = Charting.SeriesOrderType;

            var ChartColorType;
            (function (ChartColorType) {
                ChartColorType[ChartColorType["Background"] = 0] = "Background";
                ChartColorType[ChartColorType["Foreground"] = 1] = "Foreground";
                ChartColorType[ChartColorType["Grid"] = 2] = "Grid";
                ChartColorType[ChartColorType["LegendBackground"] = 3] = "LegendBackground";
                ChartColorType[ChartColorType["ViewSelection"] = 4] = "ViewSelection";
                ChartColorType[ChartColorType["ViewSelectionOutside"] = 5] = "ViewSelectionOutside";
            })(ChartColorType || (ChartColorType = {}));

            var ChartFontType;
            (function (ChartFontType) {
                ChartFontType[ChartFontType["Foreground"] = 0] = "Foreground";
            })(ChartFontType || (ChartFontType = {}));

            var Point2d = (function () {
                function Point2d(x, y) {
                    this.x = x;
                    this.y = y;
                }
                return Point2d;
            })();

            var Point2dWithData = (function (_super) {
                __extends(Point2dWithData, _super);
                function Point2dWithData(x, y, data) {
                    _super.call(this, x, y);

                    this.data = data;
                }
                return Point2dWithData;
            })(Point2d);

            var Point2dRendered = (function (_super) {
                __extends(Point2dRendered, _super);
                function Point2dRendered(x, y, isInView, seriesIndex) {
                    _super.call(this, x, y);

                    this.isInView = isInView;
                    this.seriesIndex = seriesIndex;
                }
                return Point2dRendered;
            })(Point2d);

            var Padding = (function () {
                function Padding(left, top, right, bottom) {
                    this.left = left;
                    this.top = top;
                    this.right = right;
                    this.bottom = bottom;
                }
                return Padding;
            })();

            var Rect = (function (_super) {
                __extends(Rect, _super);
                function Rect(left, top, right, bottom) {
                    _super.call(this, left, top, right, bottom);

                    if (this.left > this.right || this.top > this.bottom) {
                        throw "Invalid rectange size";
                    }
                }
                Object.defineProperty(Rect.prototype, "width", {
                    get: function () {
                        return this.right - this.left;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Rect.prototype, "height", {
                    get: function () {
                        return this.bottom - this.top;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Rect;
            })(Padding);

            var MinMax = (function () {
                function MinMax(min, max) {
                    this.min = min;
                    this.max = max;
                }
                return MinMax;
            })();

            var ChartSeries = (function () {
                function ChartSeries(index, legendText, seriesRenderType) {
                    this._lineColorString = "#FF0000";
                    this._lineFillColorString = "#FF0000";
                    this._pointColorString = "#FF0000";
                    this._pointStrokeColorString = "#FF0000";
                    this.index = index;
                    this.legendText = legendText;
                    this.seriesRenderType = seriesRenderType;
                    this.data = [];

                    switch (index) {
                        case 0:
                            this._lineColorString = "rgb(180, 180, 255)";
                            this._lineFillColorString = "rgba(200, 200, 255, 0.3)";
                            this._pointColorString = "rgb(0, 0, 255)";
                            this._pointStrokeColorString = "rgb(0, 0, 0)";
                            break;

                        case 1:
                            this._lineColorString = "rgb(255, 180, 180)";
                            this._lineFillColorString = "rgba(255, 200, 200, 0.3)";
                            this._pointColorString = "rgb(255, 0, 0)";
                            this._pointStrokeColorString = "rgb(0, 0, 0)";
                            break;

                        case 2:
                            this._lineColorString = "rgb(180, 200, 100)";
                            this._lineFillColorString = "rgba(200, 255, 200, 0.3)";
                            this._pointColorString = "rgb(0, 200, 0)";
                            this._pointStrokeColorString = "rgb(0, 0, 0)";
                            break;

                        case 3:
                            this._lineColorString = "rgb(180, 255, 255)";
                            this._lineFillColorString = "rgba(200, 255, 255, 0.3)";
                            this._pointColorString = "rgb(0, 255, 255)";
                            this._pointStrokeColorString = "rgb(0, 0, 0)";
                            break;

                        case 4:
                            this._lineColorString = "rgb(255, 255, 180)";
                            this._lineFillColorString = "rgba(255, 255, 200, 0.3)";
                            this._pointColorString = "rgb(255, 255, 0)";
                            this._pointStrokeColorString = "rgb(0, 0, 0)";
                            break;

                        default:
                            break;
                    }
                }
                Object.defineProperty(ChartSeries.prototype, "lineColor", {
                    get: function () {
                        return this._lineColorString;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ChartSeries.prototype, "lineFillColor", {
                    get: function () {
                        return this._lineFillColorString;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ChartSeries.prototype, "pointColor", {
                    get: function () {
                        return this._pointColorString;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(ChartSeries.prototype, "pointStrokeColor", {
                    get: function () {
                        return this._pointStrokeColorString;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ChartSeries;
            })();

            var CanvasChartControl = (function (_super) {
                __extends(CanvasChartControl, _super);
                function CanvasChartControl(containerId) {
                    _super.call(this, "CanvasChartTemplate");
                    this._chartInitialStartSet = false;
                    this._chartAxisPadding = new Padding(50, 40, 5, 5);
                    this._chartAxisCount = 5;
                    this._chartAxisIncreaseRatio = 1.5;
                    this._chartDrawFill = true;
                    this._chartOverviewPadding = 4;
                    this._chartViewOverview = false;
                    this._chartViewX = 0;
                    this._chartViewWidth = 60;
                    this._chartViewType = 2 /* Roll */;
                    this._gridX = new MinMax(0, 0);
                    this._gridY = new MinMax(0, 0);
                    this._gridRange = new Point2d(0, 0);
                    this._triangleSize = 7;

                    this._containerId = containerId;
                    this._series = [];
                    this._container = document.getElementById(this._containerId);

                    if (this._container !== null) {
                        this._container.appendChild(this.rootElement);
                        this._canvas = this.findElement("mainCanvas");

                        this._context = this._canvas.getContext("2d");

                        if (!this._container.runtimeStyle.position || this._container.runtimeStyle.position === "static") {
                            this._container.style.position = "relative";
                        }

                        window.addEventListener("resize", this.onResize.bind(this));
                        this.onResize(null);
                    } else {
                        throw "An element with id " + this._containerId + " could not be found";
                    }
                }
                CanvasChartControl.prototype.setViewType = function (viewType, viewStartX, viewWidth, viewHeight) {
                    if (viewStartX < this._gridX.min) {
                        viewStartX = this._gridX.min;
                    }

                    this._chartViewType = viewType;
                    this._chartViewX = viewStartX;
                    this._chartViewWidth = viewWidth;

                    if (typeof viewHeight === "number") {
                        this._gridY.max = viewHeight;
                        this._gridRange.y = viewHeight;
                    }

                    this.drawChart();
                };

                CanvasChartControl.prototype.addSeries = function (legendText, seriesRenderType) {
                    var newSeries = new ChartSeries(this._series.length, legendText, seriesRenderType);
                    this._series.push(newSeries);

                    var filledLines = 0;
                    for (var i = 0; i < this._series.length; i++) {
                        if (this._series[i].seriesRenderType & 2 /* Line */) {
                            filledLines++;
                            if (filledLines >= 2) {
                                this._chartDrawFill = false;
                                break;
                            }
                        }
                    }

                    return this._series.length - 1;
                };

                CanvasChartControl.prototype.addPointToSeries = function (seriesIndex, x, y, tooltip, orderType, skipRender) {
                    if (typeof orderType === "undefined") { orderType = 0 /* Sort */; }
                    if (seriesIndex >= 0 && seriesIndex < this._series.length) {
                        var newPoint = new Point2dWithData(x, y, tooltip);
                        var seriesData = this._series[seriesIndex].data;
                        seriesData.push(newPoint);

                        if (newPoint.x < this._gridX.max) {
                            switch (orderType) {
                                case 1 /* Remove */:
                                    for (var deleteIndex = seriesData.length - 2; deleteIndex >= 0; deleteIndex--) {
                                        if (seriesData[deleteIndex].x < x) {
                                            break;
                                        }
                                    }

                                    deleteIndex++;
                                    seriesData.splice(deleteIndex, seriesData.length - deleteIndex - 1);
                                    this._gridX.max = newPoint.x;
                                    break;

                                case 0 /* Sort */:
                                default:
                                    seriesData.sort(function (a, b) {
                                        return a.x - b.x;
                                    });
                                    break;
                            }
                        }

                        if (!this._chartInitialStartSet) {
                            this._chartInitialStartSet = true;
                            this._gridX.min = newPoint.x;
                            this._chartViewX = newPoint.x;
                        }

                        this.calculateRange(newPoint);

                        if (!skipRender) {
                            this.drawChart();
                        }
                    }
                };

                CanvasChartControl.prototype.onResize = function (event) {
                    if (this._container.clientWidth > 0 && this._container.clientHeight > 0) {
                        this._canvas.width = this._container.clientWidth;
                        this._canvas.height = this._container.clientHeight;

                        this._chartWidth = this._canvas.width - this._chartAxisPadding.right;
                        this._chartHeight = this._canvas.height - this._chartAxisPadding.bottom;

                        this.drawChart();
                    }
                };

                CanvasChartControl.prototype.getColor = function (colorId) {
                    switch (colorId) {
                        case 0 /* Background */:
                            return "rgb(255, 255, 255)";

                        case 1 /* Foreground */:
                            return "rgb(0, 0, 0)";

                        case 2 /* Grid */:
                            return "rgb(200, 200, 200)";

                        case 3 /* LegendBackground */:
                            return "rgba(250, 250, 250, 0.75)";

                        case 4 /* ViewSelection */:
                            return "rgb(120, 120, 120)";

                        case 5 /* ViewSelectionOutside */:
                            return "rgba(255, 255, 255, 0.6)";
                    }

                    return "rgb(255, 0, 0)";
                };

                CanvasChartControl.prototype.getFontString = function (fontId) {
                    switch (fontId) {
                        case 0 /* Foreground */:
                            return "7.5pt \"Segoe UI\", Arial, sans-serif";
                    }

                    return "7.5pt \"Segoe UI\", Arial, sans-serif";
                };

                CanvasChartControl.prototype.getYCoord = function (y, top, height) {
                    return top + ((this._gridY.max - y) / this._gridRange.y) * height;
                };

                CanvasChartControl.prototype.drawXAxesValue = function (value, offsetY) {
                    this._context.save();
                    this._context.fillStyle = this.getColor(1 /* Foreground */);
                    this._context.font = this.getFontString(0 /* Foreground */);
                    this._context.fillText("" + value.toFixed(2), this._chartAxisPadding.left - 5, this._chartAxisPadding.top + offsetY + 1.5);
                    this._context.restore();
                };

                CanvasChartControl.prototype.drawChartBackground = function () {
                    this._context.fillStyle = this.getColor(0 /* Background */);
                    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
                };

                CanvasChartControl.prototype.drawChartAxes = function (chartRect) {
                    this._context.fillStyle = this.getColor(2 /* Grid */);
                    this._context.strokeStyle = this.getColor(2 /* Grid */);
                    this._context.textAlign = "right";

                    var step = (this._gridRange.y / this._chartAxisCount);

                    this.drawXAxesValue(this._gridY.max, 0);

                    for (var i = 1; i < this._chartAxisCount; i++) {
                        var y = ((step * i) / this._gridRange.y) * chartRect.height;
                        var lineY = chartRect.top + Math.floor(y) + 0.5;

                        this._context.beginPath();
                        this._context.moveTo(chartRect.left, lineY);
                        this._context.lineTo(chartRect.left + chartRect.width, lineY);
                        this._context.stroke();

                        this.drawXAxesValue(this._gridY.max - (step * i), y);
                    }

                    this.drawXAxesValue(this._gridY.min, chartRect.height);
                };

                CanvasChartControl.prototype.drawChartBorder = function (chartRect) {
                    this._context.fillStyle = "transparent";
                    this._context.strokeStyle = this.getColor(1 /* Foreground */);
                    this._context.strokeRect(chartRect.left - 0.5, chartRect.top - 0.5, chartRect.width, chartRect.height);
                };

                CanvasChartControl.prototype.drawChartLegend = function (chartRect) {
                    if (!this._legendDiv) {
                        this._legendDiv = document.createElement("div");
                        this._legendDiv.className = "chartLegend";
                        this._legendDiv.style.position = "absolute";
                        this._legendDiv.style.right = "20px";
                        this._legendDiv.style.bottom = (this._canvas.height - chartRect.bottom + 10) + "px";
                        this._legendDiv.style.backgroundColor = this.getColor(3 /* LegendBackground */);
                        this._legendDiv.style.color = this.getColor(1 /* Foreground */);
                        this._legendDiv.style.padding = "2px 5px 2px 5px";
                        this._legendDiv.style.font = this.getFontString(0 /* Foreground */);
                        this._legendDiv.style.borderRadius = "3px";

                        if (this._container !== null) {
                            this._container.appendChild(this._legendDiv);
                        }
                    }

                    if (this._legendDiv.children.length !== this._series.length) {
                        for (var i = 0; i < this._series.length; i++) {
                            var seriesDiv = document.createElement("div");
                            seriesDiv.className = "chartLegendSeries";

                            var colorSpan = document.createElement("span");
                            colorSpan.style.display = "inline-block";
                            colorSpan.style.width = "16px";
                            colorSpan.style.height = "10px";
                            colorSpan.style.margin = "0 4px 2px 0";
                            colorSpan.style.verticalAlign = "middle";
                            colorSpan.style.border = "solid " + this._series[i].lineColor + " 1px";

                            if (this._series[i].seriesRenderType & 2 /* Line */) {
                                colorSpan.style.backgroundColor = this._series[i].lineFillColor;
                            }

                            var innerColorSpan = document.createElement("span");
                            innerColorSpan.style.display = "inline-block";
                            innerColorSpan.style.width = "12px";
                            innerColorSpan.style.height = "8px";
                            innerColorSpan.style.margin = "0 0 10px 1px";
                            innerColorSpan.style.verticalAlign = "middle";
                            innerColorSpan.style.backgroundColor = this._series[i].pointColor;
                            colorSpan.appendChild(innerColorSpan);

                            seriesDiv.appendChild(colorSpan);

                            var textSpan = document.createElement("span");
                            textSpan.innerText = this._series[i].legendText;
                            seriesDiv.appendChild(textSpan);

                            this._legendDiv.appendChild(seriesDiv);
                        }
                    }
                };

                CanvasChartControl.prototype.drawChartType = function (chartViewType, chartRect, isOverview) {
                    var renderedPoints = new Array();
                    for (var seriesIndex = 0; seriesIndex < this._series.length; seriesIndex++) {
                        var series = this._series[seriesIndex];
                        var seriesPoints = series.data;

                        if (seriesPoints.length > 0) {
                            var startIndex = 0;
                            var endIndex = seriesPoints.length - 1;

                            var startX = 0;
                            var rangeX = 0;
                            switch (chartViewType) {
                                case 0 /* Scale */:
                                    startX = this._gridX.min;
                                    rangeX = this._gridRange.x;
                                    break;

                                case 1 /* Expand */:
                                    startX = this._gridX.min;
                                    rangeX = Math.max(this._gridRange.x, this._chartViewWidth);
                                    break;

                                case 3 /* Fixed */:
                                    startX = this._chartViewX;
                                    rangeX = this._chartViewWidth;
                                    break;

                                case 2 /* Roll */:
                                    this._chartViewX = Math.max(this._gridX.max - this._chartViewWidth, this._gridX.min);
                                    startX = this._chartViewX;
                                    rangeX = this._chartViewWidth;
                                    break;
                            }

                            var endX = startX + rangeX;
                            var scaleX = chartRect.width / rangeX;

                            var x = 0;
                            var y = 0;
                            var startPoint = seriesPoints[startIndex];
                            var hasMovedToStart = false;

                            this._context.save();
                            this._context.beginPath();
                            this._context.rect(chartRect.left, chartRect.top, chartRect.width, chartRect.height);
                            this._context.clip();

                            this._context.fillStyle = series.lineFillColor;
                            this._context.strokeStyle = series.lineColor;
                            this._context.beginPath();
                            for (var i = startIndex; i <= endIndex; i++) {
                                var point = seriesPoints[i];

                                var pointInView = (point.x >= startX && point.x <= endX);
                                var requiresDrawing = pointInView;
                                if (!requiresDrawing) {
                                    if ((point.x < startX && i < endIndex && seriesPoints[i + 1].x > startX) || (point.x > endX && i > 0 && seriesPoints[i - 1].x < endX)) {
                                        requiresDrawing = true;
                                    }
                                }

                                if (requiresDrawing) {
                                    x = chartRect.left + (point.x - startX) * scaleX;
                                    y = this.getYCoord(point.y, chartRect.top, chartRect.height);

                                    if (!hasMovedToStart) {
                                        this._context.moveTo(x, this.getYCoord(0, chartRect.top, chartRect.height));
                                        hasMovedToStart = true;
                                    }

                                    if (series.seriesRenderType & 2 /* Line */) {
                                        this._context.lineTo(x, y);
                                    }

                                    renderedPoints.push({ x: x, y: y, isInView: pointInView, seriesIndex: seriesIndex });
                                }
                            }

                            if (series.seriesRenderType & 2 /* Line */) {
                                if (this._chartDrawFill) {
                                    var y = this.getYCoord(0, chartRect.top, chartRect.height);
                                    this._context.lineTo(x, y);
                                    this._context.closePath();
                                    this._context.fill();
                                } else {
                                    this._context.stroke();
                                }

                                if (this._chartDrawFill) {
                                    this._context.lineWidth = (chartRect.height < 100 ? 1 : 2);
                                    this._context.strokeStyle = series.lineColor;
                                    this._context.beginPath();
                                    for (var i = 0; i < renderedPoints.length; i++) {
                                        var rp = renderedPoints[i];
                                        if (i === 0) {
                                            this._context.moveTo(rp.x, Math.round(rp.y) - 0.5);
                                        }

                                        this._context.lineTo(rp.x, Math.round(rp.y) - 0.5);
                                    }

                                    this._context.stroke();
                                }
                            }

                            this._context.restore();
                        }
                    }

                    this.drawChartBorder(chartRect);

                    var overviewStartX = chartRect.left + (this._chartViewX - this._gridX.min) * scaleX;
                    var overviewEndX = overviewStartX + Math.min(this._chartViewWidth * scaleX, chartRect.width);

                    var seriesIndexForColor = -1;
                    for (var i = 0; i < renderedPoints.length; i++) {
                        if (renderedPoints[i].isInView) {
                            var si = renderedPoints[i].seriesIndex;
                            if (seriesIndexForColor !== si) {
                                this._context.fillStyle = this._series[si].pointColor;
                                this._context.strokeStyle = this._series[si].pointStrokeColor;
                                seriesIndexForColor = si;
                            }

                            if (this._series[si].seriesRenderType & 1 /* Points */) {
                                this._context.beginPath();
                                this._context.arc(renderedPoints[i].x - 0.5, renderedPoints[i].y - 0.5, 3, 0, Math.PI * 2);
                                this._context.fill();
                            }

                            if (this._series[si].seriesRenderType & 4 /* VerticalLines */) {
                                this._context.beginPath();
                                this._context.rect(Math.round(renderedPoints[i].x), chartRect.top, 1, chartRect.height);
                                this._context.fill();
                            }

                            if (this._series[si].seriesRenderType & 8 /* Triangles */) {
                                this._context.beginPath();
                                this._context.moveTo(renderedPoints[i].x, chartRect.bottom - 2 * this._triangleSize);
                                this._context.lineTo(renderedPoints[i].x - this._triangleSize, chartRect.bottom);
                                this._context.lineTo(renderedPoints[i].x + this._triangleSize, chartRect.bottom);
                                this._context.lineTo(renderedPoints[i].x, chartRect.bottom - 2 * this._triangleSize);
                                this._context.closePath();
                                this._context.fill();
                            }
                        }
                    }
                };

                CanvasChartControl.prototype.drawChartViewSelection = function (chartRect) {
                    var padding = this._chartOverviewPadding;
                    var doublePadding = padding * 2;

                    var scaleX = (chartRect.width / this._gridRange.x);
                    var x = (this._chartViewX - this._gridX.min) * scaleX;
                    var y = chartRect.top - padding;
                    var w = Math.min(this._chartViewWidth * scaleX, chartRect.width);
                    var h = chartRect.height + doublePadding;

                    this._context.fillStyle = this.getColor(5 /* ViewSelectionOutside */);
                    this._context.fillRect(chartRect.left - padding, y, Math.max(x, 0), h);
                    this._context.fillRect(chartRect.left + x + w + padding, y, Math.max(chartRect.width - (x + w), 0), h);

                    var snappedX = Math.floor(chartRect.left + x - padding) - 0.5;
                    var snappedY = Math.floor(chartRect.top - padding) - 0.5;
                    var snappedW = Math.ceil(w + doublePadding);
                    var snappedH = Math.ceil(chartRect.height + doublePadding);
                    this._context.save();
                    this._context.strokeStyle = this.getColor(4 /* ViewSelection */);
                    this._context.lineWidth = 1;
                    this._context.strokeRect(snappedX, snappedY, snappedW, snappedH);
                    this._context.restore();
                };

                CanvasChartControl.prototype.drawChart = function () {
                    if (this._chartViewType === 0 /* Scale */ || this._chartViewType === 1 /* Expand */) {
                        this._chartViewX = this._gridX.min;
                        this._chartViewWidth = Math.max(this._gridRange.x, this._chartViewWidth);
                    }

                    this.drawChartBackground();

                    var chartRect = new Rect(this._chartAxisPadding.left, this._chartAxisPadding.top, this._chartWidth, this._chartHeight - (this._chartViewOverview ? 40 : 0));
                    this.drawChartAxes(chartRect);
                    this.drawChartType(this._chartViewType, chartRect, false);
                    this.drawChartLegend(chartRect);

                    if (this._chartViewOverview) {
                        chartRect.top += chartRect.height + 10;
                        chartRect.bottom = chartRect.top + 30;
                        this.drawChartType(1 /* Expand */, chartRect, true);
                        this.drawChartViewSelection(chartRect);
                    }
                };

                CanvasChartControl.prototype.calculateRange = function (point) {
                    if (this._gridX.max < point.x) {
                        this._gridX.max = point.x;
                    }

                    if (this._gridX.min > point.x) {
                        this._gridX.min = point.x;
                    }

                    if (this._gridY.min > point.y) {
                        this._gridY.min = Math.floor((point.y * this._chartAxisIncreaseRatio) / this._chartAxisCount) * this._chartAxisCount;
                    }

                    if (this._gridY.max < point.y) {
                        this._gridY.max = Math.ceil((point.y * this._chartAxisIncreaseRatio) / this._chartAxisCount) * this._chartAxisCount;
                    }

                    this._gridRange.x = this._gridX.max - this._gridX.min;
                    this._gridRange.y = this._gridY.max - this._gridY.min;
                };
                return CanvasChartControl;
            })(Common.Controls.Legacy.TemplateControl);
            Charting.CanvasChartControl = CanvasChartControl;
        })(Controls.Charting || (Controls.Charting = {}));
        var Charting = Controls.Charting;
    })(MemoryAnalyzer.Controls || (MemoryAnalyzer.Controls = {}));
    var Controls = MemoryAnalyzer.Controls;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/controls/canvasChartControl.js.map

// componentModel.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (Controls) {
        var ObservableViewModel = (function () {
            function ObservableViewModel() {
                this._propertyChangedObservers = [];
            }
            ObservableViewModel.prototype.registerPropertyChanged = function (observer) {
                this._propertyChangedObservers.push(observer);
            };

            ObservableViewModel.prototype.removePropertyChanged = function (observer) {
                var index = this._propertyChangedObservers.indexOf(observer);
                if (index >= 0) {
                    this._propertyChangedObservers = this._propertyChangedObservers.splice(index, 1);
                }
            };

            ObservableViewModel.prototype.raisePropertyChanged = function (propertyName) {
                for (var i = 0; i < this._propertyChangedObservers.length; i++) {
                    this._propertyChangedObservers[i].onPropertyChanged(propertyName);
                }
            };
            return ObservableViewModel;
        })();
        Controls.ObservableViewModel = ObservableViewModel;

        (function (NotifyCollectionChangedAction) {
            NotifyCollectionChangedAction[NotifyCollectionChangedAction["Add"] = 0] = "Add";
            NotifyCollectionChangedAction[NotifyCollectionChangedAction["Reset"] = 1] = "Reset";
        })(Controls.NotifyCollectionChangedAction || (Controls.NotifyCollectionChangedAction = {}));
        var NotifyCollectionChangedAction = Controls.NotifyCollectionChangedAction;

        var NotifyCollectionChangedEventArgs = (function () {
            function NotifyCollectionChangedEventArgs(action, newItems, newStartingIndex, oldItems, oldStartingIndex) {
                this._action = action;
                this._newItems = newItems;
                this._newStartingIndex = newStartingIndex;
                this._oldItems = oldItems;
                this._oldStartingIndex = oldStartingIndex;
            }
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "action", {
                get: function () {
                    return this._action;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "newItems", {
                get: function () {
                    return this._newItems;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "newStartingIndex", {
                get: function () {
                    return this._newStartingIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "oldItems", {
                get: function () {
                    return this._oldItems;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NotifyCollectionChangedEventArgs.prototype, "oldStartingIndex", {
                get: function () {
                    return this._oldStartingIndex;
                },
                enumerable: true,
                configurable: true
            });
            return NotifyCollectionChangedEventArgs;
        })();
        Controls.NotifyCollectionChangedEventArgs = NotifyCollectionChangedEventArgs;

        var ObservableCollection = (function () {
            function ObservableCollection() {
                this._items = [];
                this._collectionChangedObservers = [];
            }
            Object.defineProperty(ObservableCollection.prototype, "length", {
                get: function () {
                    return this._items.length;
                },
                enumerable: true,
                configurable: true
            });

            ObservableCollection.prototype.registerCollectionChanged = function (observer) {
                this._collectionChangedObservers.push(observer);
            };

            ObservableCollection.prototype.removeCollectionChanged = function (observer) {
                var index = this._collectionChangedObservers.indexOf(observer);
                if (index >= 0) {
                    this._collectionChangedObservers = this._collectionChangedObservers.splice(index, 1);
                }
            };

            ObservableCollection.prototype.add = function (item) {
                this._items.push(item);

                var args = new NotifyCollectionChangedEventArgs(0 /* Add */, [item], this._items.length - 1, [], 0);
                this.onCollectionChanged(args);
            };

            ObservableCollection.prototype.clear = function () {
                var oldItems = this._items;
                this._items = [];
                var args = new NotifyCollectionChangedEventArgs(1 /* Reset */, [], 0, oldItems, oldItems.length - 1);
                this.onCollectionChanged(args);
            };

            ObservableCollection.prototype.getItem = function (index) {
                return this._items[index];
            };

            ObservableCollection.prototype.onCollectionChanged = function (eventArgs) {
                for (var i = 0; i < this._collectionChangedObservers.length; i++) {
                    this._collectionChangedObservers[i].onCollectionChanged(eventArgs);
                }
            };
            return ObservableCollection;
        })();
        Controls.ObservableCollection = ObservableCollection;
    })(MemoryAnalyzer.Controls || (MemoryAnalyzer.Controls = {}));
    var Controls = MemoryAnalyzer.Controls;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/controls/componentModel.js.map

// gridSplitterControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (Controls) {
        (function (GridSplitterDirection) {
            GridSplitterDirection[GridSplitterDirection["Horizontal"] = 0] = "Horizontal";
            GridSplitterDirection[GridSplitterDirection["Vertical"] = 1] = "Vertical";
        })(Controls.GridSplitterDirection || (Controls.GridSplitterDirection = {}));
        var GridSplitterDirection = Controls.GridSplitterDirection;

        var GridSplitterControl = (function (_super) {
            __extends(GridSplitterControl, _super);
            function GridSplitterControl(splitterElement, minSize, scrollableContainer, callback) {
                _super.call(this, splitterElement);

                this._direction = null;
                this._minSize = (typeof minSize === "number" && minSize > 0) ? minSize : GridSplitterControl._gridSplitterDefaultMinSize;
                this._scrollableContainer = scrollableContainer;
                this._callback = callback;

                if (!this.rootElement.contains(GridSplitterControl._gridSplitterClass)) {
                    this.rootElement.classList.add(GridSplitterControl._gridSplitterClass);
                }

                this._resizerDisplay = document.createElement("div");
                this._resizerDisplay.className = GridSplitterControl._gridSplitterClass + " " + GridSplitterControl._gridSplitterResizerClass;
                this._resizerDisplay.style.position = "relative";
                this._resizerDisplay.style.display = "none";
                this.rootElement.appendChild(this._resizerDisplay);

                this.rootElement.addEventListener("mousedown", this.onMouseDown.bind(this));
            }
            Object.defineProperty(GridSplitterControl.prototype, "direction", {
                get: function () {
                    if (this._direction === null) {
                        this._direction = this.getSplitterDirection();
                    }

                    return this._direction;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridSplitterControl.prototype, "gridCSS", {
                get: function () {
                    if (!this._gridCSS) {
                        this._gridCSS = this.getParentGridCSS();
                    }

                    return this._gridCSS;
                },
                enumerable: true,
                configurable: true
            });

            GridSplitterControl.prototype.getSplitterDirection = function () {
                var direction;
                if (this.rootElement.classList.contains(GridSplitterControl._gridSplitterVerticalClass)) {
                    direction = 1 /* Vertical */;
                } else if (this.rootElement.classList.contains(GridSplitterControl._gridSplitterHorizontalClass)) {
                    direction = 0 /* Horizontal */;
                } else {
                    if (this.rootElement.clientWidth > this.rootElement.clientHeight) {
                        direction = 1 /* Vertical */;
                    } else {
                        direction = 0 /* Horizontal */;
                    }
                }

                if (direction == 1 /* Vertical */) {
                    this._gridIndex = parseInt(this.rootElement.currentStyle.msGridRow, 10) - 1;
                    this._resizerDisplay.className += " " + GridSplitterControl._gridSplitterClass + "-Vertical";
                } else {
                    this._gridIndex = parseInt(this.rootElement.currentStyle.msGridColumn, 10) - 1;
                    this._resizerDisplay.className += " " + GridSplitterControl._gridSplitterClass + "-Horizontal";
                }

                return direction;
            };

            GridSplitterControl.prototype.getParentGridCSS = function () {
                if (this.direction === 1 /* Vertical */) {
                    return this.rootElement.parentElement.currentStyle.msGridRows;
                } else {
                    return this.rootElement.parentElement.currentStyle.msGridColumns;
                }
            };

            GridSplitterControl.prototype.calculateGridInfo = function () {
                this._gridCSS = this.getParentGridCSS();
                if (!this._gridCSS) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1019"));
                }

                this._gridCSSParts = this._gridCSS.split(" ");
                if (this._gridCSSParts.length >= this._gridIndex && this._gridIndex > 0) {
                    var previous = this._gridCSSParts[this._gridIndex - 1];
                    var current = this._gridCSSParts[this._gridIndex];

                    if (previous.indexOf("fr") === -1 || current.indexOf("fr") === -1) {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1020"));
                    }

                    this._gridCSSTotal = (parseFloat(previous) + parseFloat(current));
                } else {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1021"));
                }
            };

            GridSplitterControl.prototype.onMouseMove = function (e) {
                var mousePosition = (this.direction === 1 /* Vertical */ ? e.pageY : e.pageX);

                var previous = this.rootElement.previousElementSibling;
                var next = this.rootElement.nextElementSibling;

                var min = 0;
                var max = 0;

                if (this.direction === 1 /* Vertical */) {
                    min = previous.offsetTop + this._minSize;
                    max = next.offsetTop + next.offsetHeight - this._minSize;
                } else {
                    min = previous.offsetLeft + this._minSize;
                    max = next.offsetLeft + next.offsetWidth - this._minSize;
                }

                if (!this._scrollableContainer) {
                    var scrollOffset = this._scrollableContainer.scrollTop;
                    min -= scrollOffset;
                    max -= scrollOffset;
                }

                var newPostion = mousePosition;
                if (mousePosition < min) {
                    newPostion = min;
                } else if (mousePosition > max) {
                    newPostion = max;
                }

                this._endPosition = newPostion;

                var displayPosition = newPostion - this._startPosition;
                if (this.direction === 1 /* Vertical */) {
                    this._resizerDisplay.style.top = displayPosition + "px";
                } else {
                    this._resizerDisplay.style.left = displayPosition + "px";
                }

                e.stopImmediatePropagation();
                e.preventDefault();
            };

            GridSplitterControl.prototype.onMouseUp = function (e) {
                this._resizerDisplay.style.display = "none";
                this.rootElement.style.removeProperty("background-color");

                document.body.style.cursor = this._previousCursor;

                var sizePrevious = 0;
                var sizeCurrent = 0;

                if (this.direction === 1 /* Vertical */) {
                    sizePrevious = this.rootElement.previousElementSibling.clientHeight;
                    sizeCurrent = this.rootElement.nextElementSibling.clientHeight;
                } else {
                    sizePrevious = this.rootElement.previousElementSibling.clientWidth;
                    sizeCurrent = this.rootElement.nextElementSibling.clientWidth;
                }

                var changeInPosition = (this._endPosition - this._startPosition);

                var ratioCurrent = (sizeCurrent - changeInPosition) / (sizePrevious + sizeCurrent);

                if (ratioCurrent > 0 && ratioCurrent < 1) {
                    var newSizePrevious = (1 - ratioCurrent) * this._gridCSSTotal;
                    var newSizeCurrent = ratioCurrent * this._gridCSSTotal;

                    var newGridCSS = "";
                    for (var i = 0; i < this._gridCSSParts.length; i++) {
                        if (i === this._gridIndex - 1) {
                            newGridCSS += newSizePrevious + "fr";
                        } else if (i === this._gridIndex) {
                            newGridCSS += newSizeCurrent + "fr";
                        } else {
                            newGridCSS += this._gridCSSParts[i];
                        }

                        if (i < this._gridCSSParts.length - 1) {
                            newGridCSS += " ";
                        }
                    }

                    if (this.direction === 1 /* Vertical */) {
                        this.rootElement.parentElement.style.msGridRows = newGridCSS;
                    } else {
                        this.rootElement.parentElement.style.msGridColumns = newGridCSS;
                    }

                    this._gridCSS = newGridCSS;
                    if (this._callback && typeof (this._callback) == "function") {
                        this._callback();
                    }
                }

                document.removeEventListener("mousemove", this._mouseMoveListener, true);
                document.removeEventListener("mouseup", this._mouseUpListener, true);

                e.stopImmediatePropagation();
                e.preventDefault();
            };

            GridSplitterControl.prototype.onMouseDown = function (e) {
                this.calculateGridInfo();

                this._previousCursor = document.body.style.cursor;
                document.body.style.cursor = this.rootElement.currentStyle.cursor;

                this._startPosition = (this.direction === 1 /* Vertical */ ? e.pageY : e.pageX);

                this.rootElement.style.backgroundColor = "transparent";
                this._resizerDisplay.style.display = "block";
                this._resizerDisplay.style.top = "0";
                this._resizerDisplay.style.left = "0";

                this._mouseMoveListener = this.onMouseMove.bind(this);
                this._mouseUpListener = this.onMouseUp.bind(this);

                document.addEventListener("mousemove", this._mouseMoveListener, true);
                document.addEventListener("mouseup", this._mouseUpListener, true);

                e.stopImmediatePropagation();
                e.preventDefault();
            };
            GridSplitterControl._gridSplitterClass = "gridSplitter";
            GridSplitterControl._gridSplitterResizerClass = "gridSplitter-Resizer";
            GridSplitterControl._gridSplitterVerticalClass = "gridSplitter-Vertical";
            GridSplitterControl._gridSplitterHorizontalClass = "gridSplitter-Horizontal";
            GridSplitterControl._gridSplitterDefaultMinSize = 100;
            return GridSplitterControl;
        })(Common.Controls.Legacy.Control);
        Controls.GridSplitterControl = GridSplitterControl;
    })(MemoryAnalyzer.Controls || (MemoryAnalyzer.Controls = {}));
    var Controls = MemoryAnalyzer.Controls;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/controls/gridSplitterControl.js.map

// tabControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (Controls) {
        var TabControl = (function (_super) {
            __extends(TabControl, _super);
            function TabControl() {
                _super.call(this);
                this._items = [];

                this.setTemplateFromHTML("<div class=\"tabControl\">" + "   <div class=\"tabHeader\">" + "       <div id=\"beforeBarContainer\" class=\"beforeBarContainer\"></div>" + "       <nav id=\"tabBarContainer\" class=\"tabBarContainer\">" + "        <ul class=\"tabBar\"></ul>" + "       </nav>" + "       <div id=\"afterBarContainer\" class=\"afterBarContainer\"></div>" + "   </div>" + "   <div class=\"tabContentPane\"></div>" + "</div>");

                this._barPanel = new Common.Controls.Legacy.Control(this.rootElement.getElementsByClassName("tabBar")[0]);
                this._barPanel.rootElement.setAttribute("role", "tabList");
                this._barPanel.rootElement.onkeydown = this.onKeyDown.bind(this);
                this._contentPane = new Common.Controls.Legacy.Control(this.rootElement.getElementsByClassName("tabContentPane")[0]);

                this.beforeBarContainer = new Common.Controls.Legacy.Control(this.rootElement.getElementsByClassName("beforeBarContainer")[0]);
                this.afterBarContainer = this.rootElement.getElementsByClassName("afterBarContainer")[0];

                this._tabBarContainer = this.findElement("tabBarContainer");
            }
            Object.defineProperty(TabControl.prototype, "tabsLeftAligned", {
                get: function () {
                    return this._tabBarContainer.classList.contains("tabBarContainerLeftAlign");
                },
                set: function (v) {
                    if (v) {
                        this._tabBarContainer.classList.add("tabBarContainerLeftAlign");
                    } else {
                        this._tabBarContainer.classList.remove("tabBarContainerLeftAlign");
                    }
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(TabControl.prototype, "selectedItem", {
                get: function () {
                    return this._selectedItem;
                },
                set: function (tabItem) {
                    if (this._selectedItem !== tabItem) {
                        if (!this.containsTab(tabItem)) {
                            return;
                        }

                        if (this._selectedItem) {
                            this._selectedItem.active = false;
                        }

                        this._selectedItem = tabItem;
                        if (this._selectedItem) {
                            this._selectedItem.active = true;
                        }

                        if (this.selectedItemChanged) {
                            this.selectedItemChanged();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            TabControl.prototype.addTab = function (tabItem) {
                this._items.push(tabItem);

                tabItem.ownerTabControl = this;

                this._barPanel.appendChild(tabItem.header);
                this._contentPane.appendChild(tabItem);

                if (!this._selectedItem) {
                    this.selectedItem = tabItem;
                }
            };

            TabControl.prototype.removeTab = function (tabItem) {
                var indexOfItem = this._items.indexOf(tabItem);
                if (indexOfItem < 0) {
                    return;
                }

                if (this.selectedItem === tabItem) {
                    this.selectedItem = null;
                }

                this._items.splice(indexOfItem, 1);

                var newSelectedItemIndex = Math.min(this._items.length - 1, indexOfItem);
                if (newSelectedItemIndex >= 0) {
                    this.selectedItem = this._items[newSelectedItemIndex];
                }

                this._barPanel.removeChild(tabItem.header);
                this._contentPane.removeChild(tabItem);
                tabItem.ownerTabControl = null;
            };

            TabControl.prototype.containsTab = function (tabItem) {
                return this._items.indexOf(tabItem) >= 0;
            };

            TabControl.prototype.getTabIndex = function (tabItem) {
                return this._items.indexOf(tabItem);
            };

            TabControl.prototype.getTab = function (index) {
                return this._items[index];
            };

            TabControl.prototype.length = function () {
                return this._items.length;
            };

            TabControl.prototype.onTabItemSelected = function (item) {
                this.selectedItem = item;
            };

            TabControl.prototype.onKeyDown = function (e) {
                var activeTabIndex = this.getTabIndex(this._selectedItem);
                if (activeTabIndex >= 0) {
                    if (e.keyCode === 39 /* ArrowRight */ || e.keyCode === 40 /* ArrowDown */) {
                        this.selectedItem = this.getTab((activeTabIndex + 1) % this.length());
                    } else if (e.keyCode === 37 /* ArrowLeft */ || e.keyCode === 38 /* ArrowUp */) {
                        this.selectedItem = this.getTab(activeTabIndex - 1 < 0 ? this.length() - 1 : activeTabIndex - 1);
                    }
                } else {
                    this.selectedItem = this.getTab(0);
                }

                this._selectedItem.header.rootElement.focus();
            };
            return TabControl;
        })(Common.Controls.Legacy.TemplateControl);
        Controls.TabControl = TabControl;
    })(MemoryAnalyzer.Controls || (MemoryAnalyzer.Controls = {}));
    var Controls = MemoryAnalyzer.Controls;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/controls/tabControl.js.map

// tabItem.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (Controls) {
        var TabItem = (function (_super) {
            __extends(TabItem, _super);
            function TabItem() {
                _super.call(this);
                this.header = new Common.Controls.Legacy.Control(document.createElement("li"));
                this.header.rootElement.onclick = this.onHeaderClicked.bind(this);
                this.header.rootElement.setAttribute("role", "tab");
                this.header.rootElement.addEventListener("keydown", this.onKeyDown.bind(this));
                this.rootElement.className = "tabItemContent";
            }
            Object.defineProperty(TabItem.prototype, "ownerTabControl", {
                get: function () {
                    return this._ownerTabControl;
                },
                set: function (v) {
                    if (this._ownerTabControl !== v) {
                        if (this._ownerTabControl && v) {
                            throw new Error(Plugin.Resources.getErrorString("JSPerf.1022"));
                        }

                        this._ownerTabControl = v;
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TabItem.prototype, "active", {
                get: function () {
                    return this._active;
                },
                set: function (this_active) {
                    if (this._active !== this_active) {
                        this._active = this_active;
                        this.header.rootElement.classList.toggle("active");
                        if (this_active) {
                            this.header.rootElement.setAttribute("tabIndex", "2");
                        } else {
                            this.header.rootElement.removeAttribute("tabIndex");
                        }

                        this.rootElement.classList.toggle("active");
                        this.onActiveChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TabItem.prototype, "title", {
                get: function () {
                    return this.header.rootElement.innerText;
                },
                set: function (v) {
                    this.header.rootElement.innerText = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(TabItem.prototype, "tooltipString", {
                get: function () {
                    return this.header.rootElement.getAttribute("data-plugin-vs-tooltip");
                },
                set: function (v) {
                    var tooltip = { content: v };
                    this.header.rootElement.setAttribute("data-plugin-vs-tooltip", JSON.stringify(tooltip));
                },
                enumerable: true,
                configurable: true
            });

            TabItem.prototype.onActiveChanged = function () {
            };

            TabItem.prototype.onHeaderClicked = function () {
                if (this.ownerTabControl) {
                    this.ownerTabControl.selectedItem = this;
                }

                MemoryAnalyzer.Program.onIdle();
            };

            TabItem.prototype.onKeyDown = function (e) {
                if (e.keyCode === 13 /* Enter */ || e.keyCode === 32 /* Space */) {
                    this.onHeaderClicked();
                }
            };
            return TabItem;
        })(Common.Controls.Legacy.ContentControl);
        Controls.TabItem = TabItem;
    })(MemoryAnalyzer.Controls || (MemoryAnalyzer.Controls = {}));
    var Controls = MemoryAnalyzer.Controls;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/controls/tabItem.js.map

// internalFeedback.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    (function (Extensions) {
        "use strict";

        var InternalFeedbackProxy = (function () {
            function InternalFeedbackProxy() {
                this._proxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.VisualStudio.WebClient.Diagnostics.PerformanceToolHost.Package.Extensions.InternalFeedback", {}, true);
            }
            InternalFeedbackProxy.prototype.isEnabled = function () {
                return this._proxy._call("isEnabled");
            };

            InternalFeedbackProxy.prototype.sendData = function (showDialog, titleText, feedbackText, viewName, trace, sessionFilePath) {
                return this._proxy._call("sendData", showDialog, titleText, feedbackText, viewName, trace, sessionFilePath);
            };
            InternalFeedbackProxy.instance = new InternalFeedbackProxy();
            return InternalFeedbackProxy;
        })();
        Extensions.InternalFeedbackProxy = InternalFeedbackProxy;

        var NoOperationInternalFeedback = (function () {
            function NoOperationInternalFeedback() {
            }
            NoOperationInternalFeedback.prototype.isEnabled = function () {
                return Plugin.Promise.as(false);
            };

            NoOperationInternalFeedback.prototype.sendData = function (showDialog, titleText, feedbackText, viewName, trace, sessionFilePath) {
                return Plugin.Promise.as(null);
            };
            return NoOperationInternalFeedback;
        })();
        Extensions.NoOperationInternalFeedback = NoOperationInternalFeedback;
    })(MemoryAnalyzer.Extensions || (MemoryAnalyzer.Extensions = {}));
    var Extensions = MemoryAnalyzer.Extensions;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/extensions/internalFeedback.js.map

// session.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    (function (Extensions) {
        "use strict";

        (function (SessionType) {
            SessionType[SessionType["session"] = 0] = "session";
            SessionType[SessionType["snapshot"] = 1] = "snapshot";
            SessionType[SessionType["snapshotDiff"] = 2] = "snapshotDiff";
        })(Extensions.SessionType || (Extensions.SessionType = {}));
        var SessionType = Extensions.SessionType;

        var Session = (function () {
            function Session() {
                this._snapshotId = 1;
            }
            Session.prototype.getNewSnapshotRelativePath = function () {
                return "snapshot" + (this._snapshotId++) + ".snapjs";
            };
            return Session;
        })();
        Extensions.Session = Session;

        var HostSessionProxy = (function (_super) {
            __extends(HostSessionProxy, _super);
            function HostSessionProxy() {
                _super.call(this);

                this._sessionProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.VisualStudio.WebClient.Diagnostics.PerformanceToolHost.Package.Extensions.Session", {}, true);
            }
            HostSessionProxy.prototype.addViewTypeEventListener = function (callback) {
                this._sessionProxy.addEventListener("viewtypechange", callback);
            };

            HostSessionProxy.prototype.getSessionInfo = function () {
                return this._sessionProxy._call("getSessionInfo");
            };

            HostSessionProxy.prototype.openSnapshotDetails = function (relativePath, targetView, tabName, sortProperty) {
                return this._sessionProxy._call("openSnapshotDetails", relativePath, targetView, tabName, 0, 0, sortProperty);
            };

            HostSessionProxy.prototype.openSnapshotDiff = function (relativePaths, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty) {
                return this._sessionProxy._call("openSnapshotDiff", relativePaths, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty);
            };

            HostSessionProxy.prototype.save = function (addToProject) {
                return this._sessionProxy._call("save", addToProject);
            };
            return HostSessionProxy;
        })(Session);
        Extensions.HostSessionProxy = HostSessionProxy;

        var LocalSession = (function (_super) {
            __extends(LocalSession, _super);
            function LocalSession(storageId, isOffline) {
                if (typeof isOffline === "undefined") { isOffline = false; }
                _super.call(this);

                this._sessionInfo = {
                    filePaths: [],
                    isOffline: isOffline,
                    sessionType: 0 /* session */,
                    sortProperty: "",
                    storageId: (storageId ? storageId : LocalSession.getUniqueStorageId()),
                    targetView: ""
                };
            }
            LocalSession.prototype.addViewTypeEventListener = function (callback) {
            };

            LocalSession.prototype.getSessionInfo = function () {
                return Plugin.Promise.as(this._sessionInfo);
            };

            LocalSession.prototype.openSnapshotDetails = function (relativePath, targetView, tabName, sortProperty) {
                var _this = this;
                return new Plugin.Promise(function (completed, error) {
                    completed({
                        filePaths: [relativePath],
                        isOffline: true,
                        sessionType: 1 /* snapshot */,
                        sortProperty: sortProperty,
                        storageId: _this._sessionInfo.storageId,
                        targetView: targetView
                    });
                });
            };

            LocalSession.prototype.openSnapshotDiff = function (relativePaths, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty) {
                var _this = this;
                return new Plugin.Promise(function (completed, error) {
                    completed({
                        filePaths: relativePaths,
                        isOffline: true,
                        sessionType: 2 /* snapshotDiff */,
                        sortProperty: sortProperty,
                        storageId: _this._sessionInfo.storageId,
                        targetView: targetView,
                        firstSnapshotId: firstSnapshotId,
                        lastSnapshotId: lastSnapshotId
                    });
                });
            };

            LocalSession.prototype.save = function (addToProject) {
                var _this = this;
                return new Plugin.Promise(function (completed, error) {
                    var snapshotDirectory = Common.Constants.MEMORY_ANALYZER_SNAPSHOT_ROOT_PATH + _this._sessionInfo.storageId;

                    try  {
                        var tempPath = MemoryAnalyzer.Program.packager.createPackage(Common.Constants.MEMORY_ANALYZER_TOOL_GUID);
                        var splitStorageId = _this._sessionInfo.storageId.split("\\");
                        var sessionStorageIdOnly;

                        if (splitStorageId.length > 1) {
                            sessionStorageIdOnly = splitStorageId[splitStorageId.length - 1];
                        } else {
                            sessionStorageIdOnly = _this._sessionInfo.storageId;
                        }

                        MemoryAnalyzer.Program.packager.addResource(Common.Constants.MEMORY_ANALYZER_SNAPSHOT_RESOURCE_TYPE, snapshotDirectory, sessionStorageIdOnly);

                        MemoryAnalyzer.Program.packager.commit();

                        completed(tempPath);
                    } catch (e) {
                        if (error) {
                            error(e);
                        }
                    }
                });
            };

            LocalSession.getUniqueStorageId = function () {
                return Math.floor(Math.random() * 2821109907455).toString(36) + "." + Math.floor(Math.random() * 46655).toString(36);
            };
            return LocalSession;
        })(Session);
        Extensions.LocalSession = LocalSession;
    })(MemoryAnalyzer.Extensions || (MemoryAnalyzer.Extensions = {}));
    var Extensions = MemoryAnalyzer.Extensions;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/extensions/session.js.map

// userSettings.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    (function (Extensions) {
        "use strict";

        var UserSettingsProxy = (function () {
            function UserSettingsProxy() {
            }
            UserSettingsProxy.prototype.getUserSettings = function () {
                return new Plugin.Promise(function (completed) {
                    Plugin.Settings.get("JavaScriptPerfTools").done(function (result) {
                        completed(result);
                    }, function (error) {
                        completed({});
                    });
                }, null);
            };
            return UserSettingsProxy;
        })();
        Extensions.UserSettingsProxy = UserSettingsProxy;
    })(MemoryAnalyzer.Extensions || (MemoryAnalyzer.Extensions = {}));
    var Extensions = MemoryAnalyzer.Extensions;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/extensions/userSettings.js.map

// errorFormatter.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var ErrorFormatter = (function () {
        function ErrorFormatter() {
        }
        ErrorFormatter.format = function (error) {
            if (MemoryAnalyzer.Program.userSettings.showDetailedErrors) {
                var message = "Error description:  " + (error.message || error.description);

                if (error.number) {
                    message += "\r\nError number:  " + error.number;
                }

                if (error.stack) {
                    message += "\r\nError stack:  " + error.stack;
                }

                return message;
            } else {
                return (error.message || error.description);
            }
        };
        return ErrorFormatter;
    })();
    MemoryAnalyzer.ErrorFormatter = ErrorFormatter;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/errorFormatter.js.map

// formattingHelpers.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var FormattingHelpers = (function () {
        function FormattingHelpers() {
        }
        FormattingHelpers.getPrettyPrintSize = function (bytes) {
            var size = 0;
            var unitAbbreviation;

            if (Math.abs(bytes) > (1024 * 1024 * 1024)) {
                size = bytes / (1024 * 1024 * 1024);
                unitAbbreviation = Plugin.Resources.getString("GigabyteUnits");
            } else if (Math.abs(bytes) > (1024 * 1024)) {
                size = bytes / (1024 * 1024);
                unitAbbreviation = Plugin.Resources.getString("MegabyteUnits");
            } else if (Math.abs(bytes) > 1024) {
                size = bytes / 1024;
                unitAbbreviation = Plugin.Resources.getString("KilobyteUnits");
            } else {
                size = bytes;
                unitAbbreviation = Plugin.Resources.getString("ByteUnits");
            }

            return Common.FormattingHelpers.getDecimalLocaleString(parseFloat(size.toFixed(2)), true) + " " + unitAbbreviation;
        };
        return FormattingHelpers;
    })();
    MemoryAnalyzer.FormattingHelpers = FormattingHelpers;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/formattingHelpers.js.map

// heapObject.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (ExternalObjectKind) {
        ExternalObjectKind[ExternalObjectKind["Default"] = 1] = "Default";
        ExternalObjectKind[ExternalObjectKind["Unknown"] = 2] = "Unknown";
        ExternalObjectKind[ExternalObjectKind["Dispatch"] = 3] = "Dispatch";
    })(MemoryAnalyzer.ExternalObjectKind || (MemoryAnalyzer.ExternalObjectKind = {}));
    var ExternalObjectKind = MemoryAnalyzer.ExternalObjectKind;

    (function (WinRTObjectKind) {
        WinRTObjectKind[WinRTObjectKind["Instance"] = 1] = "Instance";
        WinRTObjectKind[WinRTObjectKind["RuntimeClass"] = 2] = "RuntimeClass";
        WinRTObjectKind[WinRTObjectKind["Delegate"] = 3] = "Delegate";
        WinRTObjectKind[WinRTObjectKind["Namespace"] = 4] = "Namespace";
    })(MemoryAnalyzer.WinRTObjectKind || (MemoryAnalyzer.WinRTObjectKind = {}));
    var WinRTObjectKind = MemoryAnalyzer.WinRTObjectKind;

    (function (HeapObjectFlags) {
        HeapObjectFlags[HeapObjectFlags["ExternalOffset"] = 0] = "ExternalOffset";
        HeapObjectFlags[HeapObjectFlags["ExternalMask"] = 7] = "ExternalMask";
        HeapObjectFlags[HeapObjectFlags["WinRtOffset"] = 3] = "WinRtOffset";
        HeapObjectFlags[HeapObjectFlags["WinRtMask"] = 7] = "WinRtMask";
        HeapObjectFlags[HeapObjectFlags["IsNew"] = 1 << 6] = "IsNew";
        HeapObjectFlags[HeapObjectFlags["IsRoot"] = 1 << 7] = "IsRoot";
        HeapObjectFlags[HeapObjectFlags["IsSiteClosed"] = 1 << 8] = "IsSiteClosed";
        HeapObjectFlags[HeapObjectFlags["IsBuiltIn"] = 1 << 9] = "IsBuiltIn";
        HeapObjectFlags[HeapObjectFlags["IsMarkup"] = 1 << 10] = "IsMarkup";
        HeapObjectFlags[HeapObjectFlags["IsSizeApproximate"] = 1 << 11] = "IsSizeApproximate";
        HeapObjectFlags[HeapObjectFlags["IsChanged"] = 1 << 12] = "IsChanged";
        HeapObjectFlags[HeapObjectFlags["IsDetachedDomNode"] = 1 << 13] = "IsDetachedDomNode";
        HeapObjectFlags[HeapObjectFlags["IsWinJsDisposable"] = 1 << 14] = "IsWinJsDisposable";
        HeapObjectFlags[HeapObjectFlags["IsAdded"] = 1 << 15] = "IsAdded";
        HeapObjectFlags[HeapObjectFlags["IsBaseline"] = 1 << 16] = "IsBaseline";
        HeapObjectFlags[HeapObjectFlags["IsRelatedToAddedScopedObject"] = 1 << 17] = "IsRelatedToAddedScopedObject";
        HeapObjectFlags[HeapObjectFlags["IsRelatedToLeftoverScopedObject"] = 1 << 18] = "IsRelatedToLeftoverScopedObject";
        HeapObjectFlags[HeapObjectFlags["IsFabricatedObject"] = 1 << 19] = "IsFabricatedObject";
        HeapObjectFlags[HeapObjectFlags["HasDetachedDomNodeChildren"] = 1 << 20] = "HasDetachedDomNodeChildren";
    })(MemoryAnalyzer.HeapObjectFlags || (MemoryAnalyzer.HeapObjectFlags = {}));
    var HeapObjectFlags = MemoryAnalyzer.HeapObjectFlags;

    var MaskOperations = (function () {
        function MaskOperations() {
        }
        MaskOperations.getValue = function (input, offset, mask) {
            return (input >> offset) & mask;
        };

        MaskOperations.setValue = function (input, newValue, offset, mask) {
            return (~(mask << offset) & input) | ((newValue & mask) << offset);
        };

        MaskOperations.isFlagSet = function (input, flag) {
            return (input & flag) !== 0 ? true : false;
        };

        MaskOperations.setFlag = function (input, newValue, flag) {
            return newValue ? (input | flag) : (input & (~flag));
        };
        return MaskOperations;
    })();
    MemoryAnalyzer.MaskOperations = MaskOperations;

    

    var NamedHeapObject = (function () {
        function NamedHeapObject(node, displayObjectIDs, isCircularReference) {
            this._innerObj = node.object;
            this._isCircularReference = isCircularReference;
            this.name = this.initName(node.name, displayObjectIDs);

            if (!isCircularReference) {
                this._hasChildren = node.hasChildren;
            }

            if (this.isFabricatedObject) {
                this._diffOperation = null;
            } else if (this.isAdded) {
                this._diffOperation = Plugin.Resources.getString("DiffColumnOperationAdded");
            } else if (this.isChanged) {
                this._diffOperation = Plugin.Resources.getString("DiffColumnOperationModified");
                if (this.isBaseline) {
                    this._diffOperation += " (" + Plugin.Resources.getString("Baseline") + ")";
                }
            } else {
                this._diffOperation = Plugin.Resources.getString("DiffColumnOperationUnchanged");
                if (this.isBaseline) {
                    this._diffOperation += " (" + Plugin.Resources.getString("Baseline") + ")";
                }
            }
        }
        Object.defineProperty(NamedHeapObject.prototype, "id", {
            get: function () {
                return this.objectId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "flags", {
            get: function () {
                return this._innerObj.flags;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "kind", {
            get: function () {
                return this._innerObj.kind;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "objectId", {
            get: function () {
                return this._innerObj.objectId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "retainedSize", {
            get: function () {
                return this._innerObj.retainedSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "size", {
            get: function () {
                return this._innerObj.size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "sourceInfo", {
            get: function () {
                return this._innerObj.sourceInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "type", {
            get: function () {
                return this._innerObj.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "value", {
            get: function () {
                return this._innerObj.value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "diffOperation", {
            get: function () {
                return this._diffOperation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "sizeDiff", {
            get: function () {
                return this._innerObj.sizeDiff;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "retainedSizeDiff", {
            get: function () {
                return this._innerObj.retainedSizeDiff;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "hasChildren", {
            get: function () {
                return this._hasChildren;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NamedHeapObject.prototype, "isCircularReference", {
            get: function () {
                return this._isCircularReference;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "containsDetachedDomNode", {
            get: function () {
                return this.isDetachedDomNode || this.hasDetachedDomNodeChildren;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "hasDetachedDomNodeChildren", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.HasDetachedDomNodeChildren);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isDetachedDomNode", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsDetachedDomNode);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isSizeApproximate", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsSizeApproximate);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isNew", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsNew);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isRoot", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsRoot);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isSiteClosed", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsSiteClosed);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isBuiltIn", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsBuiltIn);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "external", {
            get: function () {
                var val = MaskOperations.getValue(this._innerObj.flags, 0 /* ExternalOffset */, 7 /* ExternalMask */);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "winrt", {
            get: function () {
                var val = MaskOperations.getValue(this._innerObj.flags, 3 /* WinRtOffset */, 7 /* WinRtMask */);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isMarkup", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsMarkup);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isAdded", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsAdded);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isBaseline", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsBaseline);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isChanged", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsChanged);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isFabricatedObject", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsFabricatedObject);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isRelatedToAddedScopedObject", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsRelatedToAddedScopedObject);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isRelatedToLeftoverScopedObject", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsRelatedToLeftoverScopedObject);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NamedHeapObject.prototype, "isWinJsDisposable", {
            get: function () {
                var val = MaskOperations.isFlagSet(this._innerObj.flags, HeapObjectFlags.IsWinJsDisposable);
                return val;
            },
            enumerable: true,
            configurable: true
        });

        NamedHeapObject.prototype.initName = function (nameOverride, displayObjectIDs) {
            var name = "";

            if (typeof nameOverride !== "undefined") {
                name += nameOverride;
            }

            if (this.winrt) {
                switch (this.winrt) {
                    case 2:
                        name += "{Runtime Class} ";
                        break;
                    case 3:
                        name += "{Delegate} ";
                        break;
                    case 4:
                        name += "{Namespace} ";
                        break;
                }
            }

            if (this.external) {
                if (name) {
                    name += ": ";
                } else {
                    name = "";
                }

                var externalPostfix = "External";
                switch (this.external) {
                    case 2:
                        externalPostfix += " IUnknown";
                        break;
                    case 3:
                        externalPostfix += " IDispatch";
                        break;
                }

                name += externalPostfix;
            }

            if (typeof this.value !== "undefined") {
                if (name) {
                    name += " = ";
                } else {
                    name = "";
                }

                var isString = typeof (this.value) === "string";
                if (isString) {
                    name += "\"";
                }

                name += this.value;
                if (isString) {
                    name += "\"";
                }
            }

            if (name === "" && this.type) {
                name += "(" + this.type + ") ";
            }

            if (displayObjectIDs && this.objectId && !this.isFabricatedObject) {
                name += " @" + this.objectId;
            }

            return name;
        };
        return NamedHeapObject;
    })();
    MemoryAnalyzer.NamedHeapObject = NamedHeapObject;

    var ReferenceDataObject = (function (_super) {
        __extends(ReferenceDataObject, _super);
        function ReferenceDataObject(innerObj, displayObjectIDs, parentObjectId, nodeId) {
            if (typeof nodeId === "undefined") { nodeId = 0; }
            _super.call(this, innerObj, displayObjectIDs);

            this.nodeId = nodeId;
            this.parentObjectId = parentObjectId;
        }
        return ReferenceDataObject;
    })(NamedHeapObject);
    MemoryAnalyzer.ReferenceDataObject = ReferenceDataObject;

    var TypeDataObject = (function () {
        function TypeDataObject(objectHeapType) {
            this.objectHeapType = objectHeapType;
            this._name = this.objectHeapType.type;
        }
        Object.defineProperty(TypeDataObject.prototype, "isAdded", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TypeDataObject.prototype, "isBaseline", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TypeDataObject.prototype, "isRelatedToAddedScopedObject", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TypeDataObject.prototype, "isRelatedToLeftoverScopedObject", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TypeDataObject.prototype, "isFabricatedObject", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TypeDataObject.prototype, "isChanged", {
            get: function () {
                return this.objectHeapType.hasModifiedChildren;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "id", {
            get: function () {
                return this.objectHeapType.type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "isDetachedDomNode", {
            get: function () {
                return this.objectHeapType.hasDetachedDomNodeChildrenOfSameType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "retainedSize", {
            get: function () {
                return this.objectHeapType.retainedSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "sizeDiff", {
            get: function () {
                return this.objectHeapType.sizeDiff;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "retainedSizeDiff", {
            get: function () {
                return this.objectHeapType.retainedSizeDiff;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "size", {
            get: function () {
                return this.objectHeapType.size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "isSizeApproximate", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "isNew", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "type", {
            get: function () {
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "isBuiltIn", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "childrenCount", {
            get: function () {
                return this.objectHeapType.childrenCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "hasChildren", {
            get: function () {
                return this.objectHeapType.childrenCount > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "hasDetachedDomNodeChildren", {
            get: function () {
                return this.objectHeapType.hasDetachedDomNodeChildren;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "containsDetachedDomNode", {
            get: function () {
                return this.isDetachedDomNode || this.hasDetachedDomNodeChildren;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TypeDataObject.prototype, "diffOperation", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return TypeDataObject;
    })();
    MemoryAnalyzer.TypeDataObject = TypeDataObject;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/heapObject.js.map

// navigationHelpers.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var NavigationHelpers = (function () {
        function NavigationHelpers() {
        }
        NavigationHelpers.getNextId = function () {
            return NavigationHelpers.idCounter++;
        };

        NavigationHelpers.reset = function () {
            NavigationHelpers.frameMap = [];
            NavigationHelpers.currentNavigationId = -1;
        };

        NavigationHelpers.setToolbar = function (toolbar) {
            NavigationHelpers.toolbarFrame = Common.NavigationUtilities.makeNavigationFrameFromCallback(document.body, function () {
                return toolbar.getActiveElement();
            });
            NavigationHelpers.registerNavigation();
        };

        NavigationHelpers.switchNavigationView = function (navigationId) {
            NavigationHelpers.currentNavigationId = navigationId;
            NavigationHelpers.registerNavigation();
        };

        NavigationHelpers.updateAdditionalNavigationFrames = function (navigationId, frames) {
            if (typeof frames === "undefined") { frames = []; }
            NavigationHelpers.frameMap[navigationId] = frames;

            if (navigationId === NavigationHelpers.currentNavigationId) {
                NavigationHelpers.registerNavigation();
            }
        };

        NavigationHelpers.registerNavigation = function () {
            var navigationFrames = [];
            var additionalFrames;

            if (NavigationHelpers.toolbarFrame) {
                navigationFrames = [NavigationHelpers.toolbarFrame];
            }

            if (NavigationHelpers.currentNavigationId >= 0) {
                additionalFrames = NavigationHelpers.frameMap[NavigationHelpers.currentNavigationId];

                if (additionalFrames) {
                    navigationFrames = navigationFrames.concat(additionalFrames);
                }
            }

            Common.NavigationUtilities.registerNavigationFrames(navigationFrames);
        };
        NavigationHelpers.currentNavigationId = -1;
        NavigationHelpers.frameMap = [];
        NavigationHelpers.idCounter = 0;
        return NavigationHelpers;
    })();
    MemoryAnalyzer.NavigationHelpers = NavigationHelpers;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/navigationHelpers.js.map

// snapshot.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var Snapshot = (function () {
        function Snapshot(snapshotData, isDiff, firstSnapshotId, lastSnapshotId) {
            this._snapshotData = snapshotData;
            this._isDiff = isDiff;
            this._firstSnapshotId = firstSnapshotId;
            this._lastSnapshotId = lastSnapshotId;
        }
        Object.defineProperty(Snapshot.prototype, "isDiff", {
            get: function () {
                return this._isDiff;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Snapshot.prototype, "firstSnapshotId", {
            get: function () {
                return this._firstSnapshotId;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Snapshot.prototype, "lastSnapshotId", {
            get: function () {
                return this._lastSnapshotId;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Snapshot.prototype, "hasDetachedDomNodes", {
            get: function () {
                return this._snapshotData.hasDetachedDomNodes();
            },
            enumerable: true,
            configurable: true
        });

        Snapshot.prototype.getAllObjects = function (filter, sorter, startIndex, maxResult, scopeFilter) {
            if (typeof startIndex === "undefined") { startIndex = 0; }
            if (typeof maxResult === "undefined") { maxResult = -1; }
            if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
            return this._snapshotData.getDominators(startIndex, maxResult, filter.filterString, scopeFilter, filter).then(function (dataSet) {
                var objNodes = dataSet.result;

                var ret = [];

                for (var i = 0; i < objNodes.length; i++) {
                    var objNode = objNodes[i];
                    var namedHeapObject = new MemoryAnalyzer.NamedHeapObject(objNode, filter.displayObjectIDs);
                    ret.push(namedHeapObject);
                }

                ret.sort(sorter.sortComparer);
                return {
                    items: ret,
                    totalCount: dataSet.totalCount
                };
            });
        };

        Snapshot.prototype.getAllRootObjects = function (filter, sorter, scopeFilter) {
            var dataSet = this._snapshotData.getRootObjects(scopeFilter, filter);
            var objNodes = dataSet.result;

            var ret = [];

            for (var i = 0; i < objNodes.length; i++) {
                var objNode = objNodes[i];
                var namedHeapObject = new MemoryAnalyzer.NamedHeapObject(objNode, filter.displayObjectIDs);
                ret.push(namedHeapObject);
            }

            ret.sort(sorter.sortComparer);
            return {
                items: ret,
                totalCount: dataSet.totalCount
            };
        };

        Snapshot.prototype.getAllTypes = function (filter, sorter, scopeFilter) {
            return this._snapshotData.getTypes(filter.filterString, scopeFilter, filter).then(function (types) {
                var ret = [];

                for (var i = 0; i < types.length; i++) {
                    var typeNode = types[i];
                    var typeDataObject = new MemoryAnalyzer.TypeDataObject(typeNode);
                    ret.push(typeDataObject);
                }

                ret.sort(sorter.sortComparer);
                return {
                    items: ret,
                    totalCount: ret.length
                };
            });
        };

        Snapshot.prototype.getAllChildrenForObjectOrType = function (id, expansionPath, filter, sorter, startIndex, maxResult, scopeFilter, isScopeRelated) {
            if (typeof startIndex === "undefined") { startIndex = 0; }
            if (typeof maxResult === "undefined") { maxResult = -1; }
            if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
            if (typeof isScopeRelated === "undefined") { isScopeRelated = false; }
            var objectId = parseInt(id);
            if (!isNaN(objectId)) {
                return this.getAllChildrenForObject(objectId, expansionPath, filter, sorter, startIndex, maxResult, scopeFilter, isScopeRelated);
            } else {
                return this.getAllObjectsByType(id, filter, sorter, startIndex, maxResult, scopeFilter);
            }
        };

        Snapshot.prototype.getAllObjectsByType = function (typeName, filter, sorter, startIndex, maxResult, scopeFilter) {
            if (typeof startIndex === "undefined") { startIndex = 0; }
            if (typeof maxResult === "undefined") { maxResult = -1; }
            var dataSet = this._snapshotData.getObjectsByType(typeName, startIndex, maxResult, scopeFilter, filter);
            var objNodes = dataSet.result;

            var ret = [];

            for (var i = 0; i < objNodes.length; i++) {
                var objNode = objNodes[i];
                var namedHeapObject = new MemoryAnalyzer.NamedHeapObject(objNode, filter.displayObjectIDs);
                ret.push(namedHeapObject);
            }

            ret.sort(sorter.sortComparer);
            return {
                items: ret,
                totalCount: dataSet.totalCount
            };
        };

        Snapshot.prototype.getAllChildrenForObject = function (objectId, expansionPath, filter, sorter, startIndex, maxResult, scopeFilter, isScopeRelated) {
            if (typeof startIndex === "undefined") { startIndex = 0; }
            if (typeof maxResult === "undefined") { maxResult = -1; }
            if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
            if (typeof isScopeRelated === "undefined") { isScopeRelated = false; }
            var dataSet = this._snapshotData.getChildrenForObject(objectId, startIndex, maxResult, scopeFilter, isScopeRelated, filter);
            var objNodes = dataSet.result;

            var ret = [];

            var isVisited = new Set();
            for (var i = 0; i < expansionPath.length; i++) {
                isVisited.add(expansionPath[i].id);
            }

            for (var i = 0; i < objNodes.length; i++) {
                var objNode = objNodes[i];
                var namedHeapObject = new MemoryAnalyzer.NamedHeapObject(objNode, filter.displayObjectIDs, isVisited.has(objNode.objectId));
                ret.push(namedHeapObject);
            }

            ret.sort(sorter.sortComparer);
            return {
                items: ret,
                totalCount: dataSet.totalCount
            };
        };

        Snapshot.prototype.getRetainedDescendants = function (objectId, scopeFilter, filter, sorter, startIndex, maxResult) {
            if (typeof startIndex === "undefined") { startIndex = 0; }
            if (typeof maxResult === "undefined") { maxResult = -1; }
            var dataSet = this._snapshotData.getRetainedDescendants(objectId, startIndex, maxResult, scopeFilter, filter);
            var objNodes = dataSet.result;

            var ret = [];

            for (var i = 0; i < objNodes.length; i++) {
                var objNode = objNodes[i];
                var namedHeapObject = new MemoryAnalyzer.NamedHeapObject(objNode, filter.displayObjectIDs);
                ret.push(namedHeapObject);
            }

            ret.sort(sorter.sortComparer);
            return {
                items: ret,
                totalCount: dataSet.totalCount
            };
        };

        Snapshot.prototype.getReferenceTreeItems = function (rootObjectId, objectId, nodeId, sorter, displayObjectIds, includeCircularReferences) {
            var dataSet = this._snapshotData.getReferenceTreeItems(rootObjectId, objectId, nodeId, includeCircularReferences);
            var objNodes = dataSet.result;

            var ret = [];

            for (var i = 0; i < objNodes.length; i++) {
                var objNode = objNodes[i];
                var namedHeapObject = new MemoryAnalyzer.ReferenceDataObject(objNode, displayObjectIds, objNode.parentId, objNode.nodeId);
                ret.push(namedHeapObject);
            }

            ret.sort(sorter.sortComparer);
            return {
                items: ret,
                totalCount: dataSet.totalCount
            };
        };

        Snapshot.prototype.getPathToDominator = function (objectId, scopeFilter, filter) {
            return this._snapshotData.getPathToDominator(objectId, scopeFilter, filter);
        };

        Snapshot.prototype.getPathToRoot = function (objectId, filter, parentObjectId) {
            return this._snapshotData.getPathToRoot(objectId, parentObjectId, filter);
        };

        Snapshot.prototype.getSnapshotDiffStats = function () {
            return this._snapshotData.getSnapshotDiffStats();
        };
        return Snapshot;
    })();
    MemoryAnalyzer.Snapshot = Snapshot;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshot.js.map

// snapshotDataSource.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (DataViewType) {
        DataViewType[DataViewType["types"] = 0] = "types";
        DataViewType[DataViewType["roots"] = 1] = "roots";
        DataViewType[DataViewType["dominators"] = 2] = "dominators";
    })(MemoryAnalyzer.DataViewType || (MemoryAnalyzer.DataViewType = {}));
    var DataViewType = MemoryAnalyzer.DataViewType;

    (function (SortOrderType) {
        SortOrderType[SortOrderType["ascending"] = 0] = "ascending";
        SortOrderType[SortOrderType["descending"] = 1] = "descending";
    })(MemoryAnalyzer.SortOrderType || (MemoryAnalyzer.SortOrderType = {}));
    var SortOrderType = MemoryAnalyzer.SortOrderType;

    var SnapshotDataSource = (function () {
        function SnapshotDataSource() {
        }
        SnapshotDataSource.getDataSource = function (viewType, snapshot) {
            switch (viewType) {
                case 1 /* roots */:
                    return new SnapshotRootDataSource(snapshot);
                case 0 /* types */:
                    return new SnapshotTypeDataSource(snapshot);
                case 2 /* dominators */:
                    return new SnapshotDominatorDataSource(snapshot);
                default: {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1002"));
                }
            }
        };
        return SnapshotDataSource;
    })();
    MemoryAnalyzer.SnapshotDataSource = SnapshotDataSource;

    var SnapshotRootDataSource = (function () {
        function SnapshotRootDataSource(snapshot) {
            this.snapshot = snapshot;
        }
        Object.defineProperty(SnapshotRootDataSource.prototype, "hasDetachedDomNodes", {
            get: function () {
                return this.snapshot.hasDetachedDomNodes;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotRootDataSource.prototype.getRootHeapDataTreeItem = function (filter, sorter, startIndex, maxResult, scopeFilter) {
            return Plugin.Promise.as(this.snapshot.getAllRootObjects(filter, sorter, scopeFilter));
        };

        SnapshotRootDataSource.prototype.getHeapDataTreeItem = function (filter, sorter, parentId, expansionPath, startIndex, maxResult, scopeFilter) {
            return this.snapshot.getAllChildrenForObject(parentId, expansionPath, filter, sorter, startIndex, maxResult, scopeFilter, true);
        };

        SnapshotRootDataSource.prototype.getReferenceTreeItems = function (rootObjectId, objectId, nodeId, sorter, displayObjectIds, includeCircularReferences, startIndex, maxResult) {
            return this.snapshot.getReferenceTreeItems(rootObjectId, objectId, nodeId, sorter, displayObjectIds, includeCircularReferences);
        };

        SnapshotRootDataSource.prototype.getAvailableFields = function (isFoldingEnabled) {
            var fields = [];
            fields.push("name");
            fields.push("type");
            fields.push("size");

            if (isFoldingEnabled) {
                fields.push("containsDetachedDomNode");
            } else {
                fields.push("isDetachedDomNode");
            }

            if (this.snapshot.isDiff) {
                fields.push("sizeDiff");
            }

            fields.push("retainedSize");
            if (this.snapshot.isDiff) {
                fields.push("retainedSizeDiff");
            }

            return fields;
        };

        SnapshotRootDataSource.prototype.getAvailableFieldsForReferenceTree = function (isFoldingEnabled) {
            return this.getAvailableFields(isFoldingEnabled);
        };
        return SnapshotRootDataSource;
    })();

    var SnapshotTypeDataSource = (function () {
        function SnapshotTypeDataSource(snapshot) {
            this.snapshot = snapshot;
        }
        Object.defineProperty(SnapshotTypeDataSource.prototype, "hasDetachedDomNodes", {
            get: function () {
                return this.snapshot.hasDetachedDomNodes;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotTypeDataSource.prototype.getRootHeapDataTreeItem = function (filter, sorter, startIndex, maxResult, scopeFilter) {
            return this.snapshot.getAllTypes(filter, sorter, scopeFilter);
        };

        SnapshotTypeDataSource.prototype.getHeapDataTreeItem = function (filter, sorter, parentId, expansionPath, startIndex, maxResult, scopeFilter) {
            return this.snapshot.getAllChildrenForObjectOrType(parentId, expansionPath, filter, sorter, startIndex, maxResult, scopeFilter, true);
        };

        SnapshotTypeDataSource.prototype.getReferenceTreeItems = function (rootObjectId, objectId, nodeId, sorter, displayObjectIds, includeCircularReferences, startIndex, maxResult) {
            return this.snapshot.getReferenceTreeItems(rootObjectId, objectId, nodeId, sorter, displayObjectIds, includeCircularReferences);
        };

        SnapshotTypeDataSource.prototype.getAvailableFields = function (isFoldingEnabled) {
            var fields = [];
            fields.push("name");
            fields.push("type");
            fields.push("size");

            if (isFoldingEnabled) {
                fields.push("containsDetachedDomNode");
            } else {
                fields.push("isDetachedDomNode");
            }

            if (this.snapshot.isDiff) {
                fields.push("sizeDiff");
            }

            fields.push("retainedSize");
            if (this.snapshot.isDiff) {
                fields.push("retainedSizeDiff");
            }

            fields.push("childrenCount");

            return fields;
        };

        SnapshotTypeDataSource.prototype.getAvailableFieldsForReferenceTree = function (isFoldingEnabled) {
            var fields = [];
            fields.push("name");
            fields.push("type");
            fields.push("size");
            if (this.snapshot.isDiff) {
                fields.push("sizeDiff");
            }

            fields.push("retainedSize");

            return fields;
        };
        return SnapshotTypeDataSource;
    })();

    var SnapshotDominatorDataSource = (function () {
        function SnapshotDominatorDataSource(snapshot) {
            this.snapshot = snapshot;
        }
        Object.defineProperty(SnapshotDominatorDataSource.prototype, "hasDetachedDomNodes", {
            get: function () {
                return this.snapshot.hasDetachedDomNodes;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotDominatorDataSource.prototype.getRootHeapDataTreeItem = function (filter, sorter, startIndex, maxResult, scopeFilter) {
            return this.snapshot.getAllObjects(filter, sorter, startIndex, maxResult, scopeFilter);
        };

        SnapshotDominatorDataSource.prototype.getHeapDataTreeItem = function (filter, sorter, parentId, expansionPath, startIndex, maxResult, scopeFilter) {
            return this.snapshot.getRetainedDescendants(parentId, scopeFilter, filter, sorter, startIndex, maxResult);
        };

        SnapshotDominatorDataSource.prototype.getReferenceTreeItems = function (rootObjectId, objectId, nodeId, sorter, displayObjectIds, includeCircularReferences, startIndex, maxResult) {
            return this.snapshot.getReferenceTreeItems(rootObjectId, objectId, nodeId, sorter, displayObjectIds, includeCircularReferences);
        };

        SnapshotDominatorDataSource.prototype.getAvailableFields = function (isFoldingEnabled) {
            var fields = [];
            fields.push("name");
            fields.push("type");
            fields.push("size");

            if (isFoldingEnabled) {
                fields.push("containsDetachedDomNode");
            } else {
                fields.push("isDetachedDomNode");
            }

            if (this.snapshot.isDiff) {
                fields.push("sizeDiff");
            }

            fields.push("retainedSize");
            if (this.snapshot.isDiff) {
                fields.push("retainedSizeDiff");
            }

            return fields;
        };

        SnapshotDominatorDataSource.prototype.getAvailableFieldsForReferenceTree = function (isFoldingEnabled) {
            return this.getAvailableFields(isFoldingEnabled);
        };
        return SnapshotDominatorDataSource;
    })();
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotDataSource.js.map

// snapshotDataView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var TreeInfo = (function () {
        function TreeInfo(gridData, expandStates, toggleFunction, loadMoreFunction) {
            this.gridData = gridData;
            this.expandStates = expandStates;
            this.toggleFunction = toggleFunction;
            this.loadMoreFunction = loadMoreFunction;
        }
        return TreeInfo;
    })();
    MemoryAnalyzer.TreeInfo = TreeInfo;

    var GridContextMenuData = (function () {
        function GridContextMenuData(view, item) {
            this.view = view;
            this._item = item;
        }
        Object.defineProperty(GridContextMenuData.prototype, "object", {
            get: function () {
                return this._item;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GridContextMenuData.prototype, "objectId", {
            get: function () {
                return this._item.objectId;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GridContextMenuData.prototype, "parentObjectId", {
            get: function () {
                return this._item.parentObjectId;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GridContextMenuData.prototype, "sourceInfo", {
            get: function () {
                return this._item.sourceInfo;
            },
            enumerable: true,
            configurable: true
        });
        return GridContextMenuData;
    })();
    MemoryAnalyzer.GridContextMenuData = GridContextMenuData;

    var SnapshotDataViewController = (function () {
        function SnapshotDataViewController(viewType, model, viewSwitcher) {
            this.viewType = viewType;
            this.snapshotViewModel = model;
            this._dataSource = MemoryAnalyzer.SnapshotDataSource.getDataSource(viewType, this.snapshotViewModel.snapshot);
            this._viewSwitcher = viewSwitcher;
            this.dataViewModel = new SnapshotDataViewModel(this.viewType, this.snapshotViewModel.snapshot.isDiff);
            this.dataViewModel.showUnknownTypes = MemoryAnalyzer.Program.userSettings.showUnknownTypes;
            this.dataViewModel.showUnknownSizes = MemoryAnalyzer.Program.userSettings.showUnknownSizes;

            this.view = new SnapshotDataView(this, this.dataViewModel, this.snapshotViewModel);

            Notifications.notify(MemoryAnalyzer.MemoryNotifications.SnapshotDataViewReady, { viewModel: this.dataViewModel, snapshotDataSource: this._dataSource });
        }
        Object.defineProperty(SnapshotDataViewController.prototype, "currentDataView", {
            get: function () {
                return this._viewSwitcher.currentDataView;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotDataViewController.prototype, "isTextFilterSupported", {
            get: function () {
                return this.viewType !== 1 /* roots */;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotDataViewController.prototype.setFocusOnGrid = function () {
            this.view.setFocusOnGrid();
        };

        SnapshotDataViewController.prototype.setSnapshotDataSource = function () {
            this.dataViewModel.snapshotDataSource = this._dataSource;

            this.view.refreshGrids();
        };

        SnapshotDataViewController.prototype.showPathToDominator = function (objectId, scopeFilter) {
            this._viewSwitcher.switchToDataView(2 /* dominators */);

            this._viewSwitcher.currentDataView.showPathToDominator(objectId, scopeFilter);
        };

        SnapshotDataViewController.prototype.showPathToRoot = function (objectId, parentObjectId) {
            this._viewSwitcher.switchToDataView(1 /* roots */);

            this._viewSwitcher.currentDataView.showPathToRoot(objectId, parentObjectId);
        };
        return SnapshotDataViewController;
    })();
    MemoryAnalyzer.SnapshotDataViewController = SnapshotDataViewController;

    var SnapshotDataViewModel = (function (_super) {
        __extends(SnapshotDataViewModel, _super);
        function SnapshotDataViewModel(viewType, isDiff) {
            if (typeof isDiff === "undefined") { isDiff = false; }
            _super.call(this);
            this.viewType = viewType;
            this.isDiff = isDiff;
            this.isTextSearchable = this.viewType !== 1 /* roots */;
            this.isDominatorFoldingPossible = this.viewType !== 1 /* roots */;
        }
        Object.defineProperty(SnapshotDataViewModel.prototype, "hasDetachedDomNodes", {
            get: function () {
                return this.snapshotDataSource.hasDetachedDomNodes;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotDataViewModel.initialize = function () {
            Common.ObservableHelpers.defineProperty(SnapshotDataViewModel, SnapshotDataViewModel.IsDiffPropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotDataViewModel, SnapshotDataViewModel.IsDominatorFoldingPossiblePropertyname, true);
            Common.ObservableHelpers.defineProperty(SnapshotDataViewModel, SnapshotDataViewModel.IsTextSearchablePropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotDataViewModel, SnapshotDataViewModel.FilterStringPropertyName, "");
            Common.ObservableHelpers.defineProperty(SnapshotDataViewModel, SnapshotDataViewModel.ShowUnknownSizesPropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotDataViewModel, SnapshotDataViewModel.ShowUnknownTypesPropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotDataViewModel, SnapshotDataViewModel.SnapshotDataSourcePropertyName, null);
        };
        SnapshotDataViewModel.FilterStringPropertyName = "filterString";
        SnapshotDataViewModel.IsDiffPropertyName = "isDiff";
        SnapshotDataViewModel.IsDominatorFoldingPossiblePropertyname = "isDominatorFoldingPossible";
        SnapshotDataViewModel.IsTextSearchablePropertyName = "isTextSearchable";
        SnapshotDataViewModel.ShowUnknownSizesPropertyName = "showUnknownSizes";
        SnapshotDataViewModel.ShowUnknownTypesPropertyName = "showUnknownTypes";
        SnapshotDataViewModel.SnapshotDataSourcePropertyName = "snapshotDataSource";
        return SnapshotDataViewModel;
    })(Common.Observable);
    MemoryAnalyzer.SnapshotDataViewModel = SnapshotDataViewModel;

    SnapshotDataViewModel.initialize();

    var SnapshotDataView = (function (_super) {
        __extends(SnapshotDataView, _super);
        function SnapshotDataView(controller, dataModel, snapshotModel, sortProperty) {
            _super.call(this, "SnapshotDataViewTemplate");
            this._fieldNameToColumnMapMainGrid = {};
            this._fieldNameToColumnMapReferenceGrid = {};
            this._controller = controller;
            this._dataViewModel = dataModel;
            this._snapshotViewModel = snapshotModel;

            this._dataViewModel.propertyChanged.addHandler(this.onPropertyChanged.bind(this));
            this._snapshotViewModel.propertyChanged.addHandler(this.onPropertyChanged.bind(this));

            this._referenceViewContainer = this.findElement("referenceViewContainer");
            this._snapshotGridContainer = this.findElement("snapshotGridContainer");

            this._reachedItemsCapMessageContainer = this.findElement("reachedItemsCapMessageContainer");

            this.findElement("referenceGraphTitleLabel").innerText = Plugin.Resources.getString("ReferenceGraph");

            this._snapshotViewGridSplitter = new MemoryAnalyzer.Controls.GridSplitterControl(this.findElement("snapshotViewGridSplitter"), 27, this.findElement("snapshotScrollableContainer"), this.refreshGrids.bind(this));

            if (!SnapshotDataView.GridContextMenu) {
                var showInDominatorsViewMenuItem = {
                    callback: SnapshotDataView.onShowInDominatorsViewCommand,
                    hidden: SnapshotDataView.isShowInDominatorsViewCommandHidden,
                    disabled: this.isShowInDominatorsViewCommandDisabled.bind(this),
                    label: Plugin.Resources.getString("ShowInDominatorsViewLabel"),
                    type: 1 /* command */
                };

                var showInRootsViewMenuItem = {
                    callback: SnapshotDataView.onShowInRootsViewCommand,
                    hidden: SnapshotDataView.isShowInRootsViewCommandHidden,
                    label: Plugin.Resources.getString("ShowInRootsViewLabel"),
                    type: 1 /* command */
                };

                var separatorMenuItem = {
                    type: 3 /* separator */
                };

                var viewSourceMenuItem = {
                    accessKey: Plugin.Resources.getString("EnterKey"),
                    callback: SnapshotDataView.onViewSourceCommand,
                    disabled: SnapshotDataView.isViewSourceCommandDisabled,
                    label: Plugin.Resources.getString("ViewSourceLabel"),
                    type: 1 /* command */
                };

                SnapshotDataView.GridContextMenu = Plugin.ContextMenu.create([showInDominatorsViewMenuItem, showInRootsViewMenuItem, separatorMenuItem, viewSourceMenuItem]);
            }

            if (sortProperty) {
                this._sortOrder = new Common.Controls.Legacy.Grid.SortOrderInfo(sortProperty, "desc");
            } else if (this._dataViewModel.isDiff) {
                if (this._dataViewModel.viewType === 0 /* types */) {
                    this._sortOrder = new Common.Controls.Legacy.Grid.SortOrderInfo("childrenCount", "desc");
                } else {
                    this._sortOrder = new Common.Controls.Legacy.Grid.SortOrderInfo("retainedSizeDiff", "desc");
                }
            } else if (this._dataViewModel.viewType === 0 /* types */) {
                this._sortOrder = new Common.Controls.Legacy.Grid.SortOrderInfo("childrenCount", "desc");
            } else {
                this._sortOrder = new Common.Controls.Legacy.Grid.SortOrderInfo("retainedSize", "desc");
            }

            this._sortOrderForReferences = new Common.Controls.Legacy.Grid.SortOrderInfo("retainedSize", "desc");

            this.uiUpdateSnapshotDataSource();
        }
        Object.defineProperty(SnapshotDataView.prototype, "navigationContainer", {
            get: function () {
                return this._referenceViewContainer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotDataView.prototype, "navigationTarget", {
            get: function () {
                if (this._gridReference) {
                    return this._gridReference.getElement();
                }

                return null;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotDataView.getSortComparer = function (sortOrder, fieldNameToColumnMap) {
            var column = fieldNameToColumnMap[sortOrder.index], comparer = column.comparer, isAsc = sortOrder.order === "asc";

            return function (v1, v2) {
                var result = comparer(column, sortOrder.order, v1, v2);
                return isAsc ? result : -result;
            };
        };

        SnapshotDataView.columnComparerForStrings = function (column, order, rowA, rowB) {
            return SnapshotDataView.naturalSort(rowA[column.index], rowB[column.index]);
        };

        SnapshotDataView.naturalSort = function (a, b) {
            var regexSortGroup = /(\d+)|(\D+)/g;

            var aGroups = String(a).toLocaleLowerCase().match(regexSortGroup);
            var bGroups = String(b).toLocaleLowerCase().match(regexSortGroup);

            if (!aGroups) {
                if (!bGroups) {
                    return 0;
                } else {
                    return -1;
                }
            } else if (!bGroups) {
                return 1;
            }

            while (aGroups.length > 0 && bGroups.length > 0) {
                var aFront = aGroups.shift();
                var bFront = bGroups.shift();

                var aAsDigit = parseInt(aFront, 10);
                var bAsDigit = parseInt(bFront, 10);

                if (isNaN(aAsDigit) && isNaN(bAsDigit)) {
                    if (aFront !== bFront) {
                        return aFront.localeCompare(bFront) > 0 ? 1 : -1;
                    }
                } else if (isNaN(aAsDigit)) {
                    return 1;
                } else if (isNaN(bAsDigit)) {
                    return -1;
                } else {
                    if (aAsDigit !== bAsDigit) {
                        return (aAsDigit - bAsDigit);
                    }
                }
            }

            return aGroups.length - bGroups.length;
        };

        SnapshotDataView.columnComparerForNumbers = function (column, order, rowA, rowB) {
            var n1 = rowA[column.index] || 0, n2 = rowB[column.index] || 0;

            return n1 - n2;
        };

        SnapshotDataView.formatChildrenCount = function (dataIndex, columnIndex, columnOrder, dataSource, isForTooltip) {
            var originalItem = dataSource[dataIndex];
            if (originalItem.childrenCount) {
                return Common.FormattingHelpers.getDecimalLocaleString(originalItem.childrenCount, true);
            } else {
                return "";
            }
        };

        SnapshotDataView.formatSize = function (dataIndex, columnIndex, columnOrder, dataSource, isForTooltip) {
            var originalItem = dataSource[dataIndex];
            if (originalItem.size) {
                var text = MemoryAnalyzer.FormattingHelpers.getPrettyPrintSize(originalItem.size) + (originalItem.isSizeApproximate ? "*" : " ");

                if (isForTooltip && originalItem.isSizeApproximate) {
                    text = Plugin.Resources.getString("ApproximateSizeTooltip", text);
                }

                return text;
            } else {
                return "";
            }
        };

        SnapshotDataView.formatRetainedSize = function (dataIndex, columnIndex, columnOrder, dataSource, isForTooltip) {
            var namedHeapObject = dataSource[dataIndex];

            if (namedHeapObject.retainedSize) {
                return MemoryAnalyzer.FormattingHelpers.getPrettyPrintSize(namedHeapObject.retainedSize);
            } else {
                return "";
            }
        };

        SnapshotDataView.formatRetainedSizeDiff = function (dataIndex, columnIndex, columnOrder, dataSource, isForTooltip) {
            var namedHeapObject = dataSource[dataIndex];

            if (namedHeapObject.retainedSizeDiff) {
                return (namedHeapObject.retainedSizeDiff > 0 ? "+" : "-") + MemoryAnalyzer.FormattingHelpers.getPrettyPrintSize(Math.abs(namedHeapObject.retainedSizeDiff));
            } else {
                return "";
            }
        };

        SnapshotDataView.formatSizeDiff = function (dataIndex, columnIndex, columnOrder, dataSource, isForTooltip) {
            var namedHeapObject = dataSource[dataIndex];

            if (namedHeapObject.sizeDiff) {
                return (namedHeapObject.sizeDiff > 0 ? "+" : "-") + MemoryAnalyzer.FormattingHelpers.getPrettyPrintSize(Math.abs(namedHeapObject.sizeDiff));
            } else {
                return "";
            }
        };

        SnapshotDataView.prototype.populateFieldNameToColumnMap = function (isDiff) {
            var fieldNameToColumnMap = {};

            fieldNameToColumnMap["name"] = new Common.Controls.Legacy.Grid.ColumnInfo("name", Plugin.Resources.getString("Identifiers"), Plugin.Resources.getString("IdentifiersTooltip"), 350, true, null, isDiff ? this.getDiffNameCellCSSClass.bind(this) : null, SnapshotDataView.columnComparerForStrings, true);
            fieldNameToColumnMap["name"].cellDecorator = this.decorateNameCell.bind(this);
            fieldNameToColumnMap["name"].hasMoreColumn = true;

            fieldNameToColumnMap["type"] = new Common.Controls.Legacy.Grid.ColumnInfo("type", Plugin.Resources.getString("Type"), Plugin.Resources.getString("TypeTooltip"), 115, true, null, isDiff ? this.getDiffNameCellCSSClass.bind(this) : null, SnapshotDataView.columnComparerForStrings);

            fieldNameToColumnMap["size"] = new Common.Controls.Legacy.Grid.ColumnInfo("size", Plugin.Resources.getString("Size"), Plugin.Resources.getString("SizeTooltip"), 65, true, SnapshotDataView.formatSize, this.getNumericCellCSSClass.bind(this, isDiff), SnapshotDataView.columnComparerForNumbers);

            fieldNameToColumnMap["retainedSize"] = new Common.Controls.Legacy.Grid.ColumnInfo("retainedSize", Plugin.Resources.getString("RetainedSize"), Plugin.Resources.getString("RetainedSizeTooltip"), 80, true, SnapshotDataView.formatRetainedSize, this.getNumericCellCSSClass.bind(this, isDiff), SnapshotDataView.columnComparerForNumbers);

            fieldNameToColumnMap["childrenCount"] = new Common.Controls.Legacy.Grid.ColumnInfo("childrenCount", Plugin.Resources.getString("Count"), Plugin.Resources.getString("CountTooltip"), 50, true, SnapshotDataView.formatChildrenCount, this.getNumericCellCSSClass.bind(this, isDiff), SnapshotDataView.columnComparerForNumbers);

            fieldNameToColumnMap["sizeDiff"] = new Common.Controls.Legacy.Grid.ColumnInfo("sizeDiff", Plugin.Resources.getString("SizeDiff"), Plugin.Resources.getString("SizeDiffTooltip"), 65, true, SnapshotDataView.formatSizeDiff, this.getNumericCellCSSClass.bind(this, isDiff), SnapshotDataView.columnComparerForNumbers);

            fieldNameToColumnMap["retainedSizeDiff"] = new Common.Controls.Legacy.Grid.ColumnInfo("retainedSizeDiff", Plugin.Resources.getString("RetainedSizeDiff"), Plugin.Resources.getString("RetainedSizeDiffTooltip"), 105, true, SnapshotDataView.formatRetainedSizeDiff, this.getNumericCellCSSClass.bind(this, isDiff), SnapshotDataView.columnComparerForNumbers);

            fieldNameToColumnMap["containsDetachedDomNode"] = new Common.Controls.Legacy.Grid.ColumnInfo("containsDetachedDomNode", "", "", 0, true, null, null, SnapshotDataView.columnComparerForStrings);
            fieldNameToColumnMap["containsDetachedDomNode"].hidden = true;

            fieldNameToColumnMap["isDetachedDomNode"] = new Common.Controls.Legacy.Grid.ColumnInfo("isDetachedDomNode", "", "", 0, true, null, null, SnapshotDataView.columnComparerForStrings);
            fieldNameToColumnMap["isDetachedDomNode"].hidden = true;

            return fieldNameToColumnMap;
        };

        SnapshotDataView.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case "isDiff":
                case "showBuiltIns":
                case "showUnknownTypes":
                case "showUnknownSizes":
                case "scopeFilter":
                case "snapshotDataSource":
                case "filterString":
                case "displayCircularReferences":
                case "displayObjectIDs":
                case "showNonMatchingReferences":
                    this.uiUpdateSnapshotDataSource();
                    break;
                case "foldObjectsByDominator":
                    this.updateSortOrders();
                    this.uiUpdateSnapshotDataSource();
                    break;
            }
        };

        SnapshotDataView.prototype.refreshGrids = function () {
            if (this._grid) {
                this._grid.layout();
            }

            if (this._gridReference) {
                this._gridReference.layout();
            }
        };

        SnapshotDataView.prototype.setFocusOnGrid = function () {
            if (this._grid) {
                var currentSelection = this._grid.getSelectedRowIndex();
                if (typeof currentSelection !== "number" || currentSelection <= 0) {
                    this._grid.ensureSelectedIndex(0);
                }

                this._grid.setFocusToSelectedRow();
            }
        };

        SnapshotDataView.prototype.showPathToDominator = function (objectId, scopeFilter) {
            var _this = this;
            var path = this._dataViewModel.snapshotDataSource.snapshot.getPathToDominator(objectId, scopeFilter, this.getFilter());

            if (this._rootQueryPromise) {
                this._rootQueryPromise.done(function () {
                    return _this.navigateToObjectForPath(path);
                });
            }
        };

        SnapshotDataView.prototype.showPathToRoot = function (objectId, parentObjectId) {
            var _this = this;
            var path = this._dataViewModel.snapshotDataSource.snapshot.getPathToRoot(objectId, this.getFilter(), parentObjectId);

            if (this._rootQueryPromise) {
                this._rootQueryPromise.done(function () {
                    return _this.navigateToObjectForPath(path);
                });
            }
        };

        SnapshotDataView.prototype.sortBy = function (sortProperty, sortOrder) {
            this._sortOrder.index = sortProperty;
            this._sortOrder.order = sortOrder;

            this.updateTree();
        };

        SnapshotDataView.isShowInRootsViewCommandHidden = function () {
            return !SnapshotDataView.GridContextMenuData || !SnapshotDataView.GridContextMenuData.view || (SnapshotDataView.GridContextMenuData.view._dataViewModel.viewType === 1 /* roots */ && SnapshotDataView.GridContextMenuData.view._focusedGrid === SnapshotDataView.GridContextMenuData.view._grid);
        };

        SnapshotDataView.isViewSourceCommandDisabled = function () {
            return !(SnapshotDataView.GridContextMenuData && SnapshotDataView.GridContextMenuData.view && SnapshotDataView.GridContextMenuData.sourceInfo);
        };

        SnapshotDataView.onRequestViewSource = function (sourceInfo) {
            SnapshotDataView.viewSource(sourceInfo.source, sourceInfo.line, sourceInfo.column);
        };

        SnapshotDataView.onShowInRootsViewCommand = function () {
            if (SnapshotDataView.GridContextMenuData && SnapshotDataView.GridContextMenuData.view) {
                SnapshotDataView.GridContextMenuData.view._controller.showPathToRoot(SnapshotDataView.GridContextMenuData.objectId, SnapshotDataView.GridContextMenuData.parentObjectId);

                SnapshotDataView.GridContextMenuData = null;
            }
        };

        SnapshotDataView.onViewSourceCommand = function () {
            if (SnapshotDataView.GridContextMenuData && SnapshotDataView.GridContextMenuData.view && SnapshotDataView.GridContextMenuData.sourceInfo) {
                var sourceInfo = SnapshotDataView.GridContextMenuData.sourceInfo;

                window.setImmediate(function () {
                    SnapshotDataView.viewSource(sourceInfo.source, sourceInfo.line, sourceInfo.column);
                });
            }
        };

        SnapshotDataView.showSourceInfoTooltip = function (identifier, sourceInfo) {
            if (sourceInfo) {
                var tooltip = new Common.Controls.Legacy.SourceInfoTooltip(sourceInfo, identifier, "SourceInfoIdentifierLabel");
                var config = {
                    content: tooltip.html,
                    contentContainsHTML: true
                };
                Plugin.Tooltip.show(config);
            }
        };

        SnapshotDataView.viewSource = function (unshortenedUrl, line, column) {
            Plugin.Host.showDocument(unshortenedUrl, line, column).done(function () {
            }, function (err) {
                MemoryAnalyzer.Program.shell.hostShell.setStatusBarText(Plugin.Resources.getString("UnableToViewSource"), true);
            });
        };

        SnapshotDataView.onShowInDominatorsViewCommand = function () {
            if (SnapshotDataView.GridContextMenuData && SnapshotDataView.GridContextMenuData.view) {
                SnapshotDataView.GridContextMenuData.view._controller.showPathToDominator(SnapshotDataView.GridContextMenuData.objectId, SnapshotDataView.contextMenuScopeFilter());

                SnapshotDataView.GridContextMenuData = null;
            }
        };

        SnapshotDataView.isShowInDominatorsViewCommandHidden = function () {
            return !SnapshotDataView.GridContextMenuData || !SnapshotDataView.GridContextMenuData.view || (SnapshotDataView.GridContextMenuData.view._dataViewModel.viewType === 2 /* dominators */ && SnapshotDataView.GridContextMenuData.view._focusedGrid === SnapshotDataView.GridContextMenuData.view._grid);
        };

        SnapshotDataView.isObjectScopeConformed = function (obj, scope) {
            if (!obj.diffOperation && !obj.isFabricatedObject) {
                return false;
            }

            switch (scope) {
                case 1 /* ObjectsAddedBetweenSnapshots */:
                    return obj.isAdded;
                case 0 /* ObjectsLeftFromPreviousSnapshot */:
                    return !obj.isAdded && !obj.isBaseline;
                case 2 /* AllObjects */:
                default:
                    return true;
            }

            return false;
        };

        SnapshotDataView.contextMenuScopeFilter = function () {
            if (SnapshotDataView.GridContextMenuData && SnapshotDataView.GridContextMenuData.view && SnapshotDataView.GridContextMenuData.view._dataViewModel.isDiff) {
                return SnapshotDataView.GridContextMenuData.view._snapshotViewModel.scopeFilter;
            }

            return 2 /* AllObjects */;
        };

        SnapshotDataView.prototype.decorateNameCell = function (cell, dataItem) {
            var namedHeapObject = dataItem;
            var nameText = namedHeapObject.name;
            var tooltipText = namedHeapObject.name;
            var nameContainer = document.createElement("span");
            var tokens;

            if (SnapshotDataView.isObjectScopeConformed(namedHeapObject, this.getScopeFilter())) {
                if (SnapshotDataView.HTMLRegex.test(namedHeapObject.kind)) {
                    tokens = Common.TokenExtractor.getHtmlTokens(nameText);
                } else if ("String" === namedHeapObject.kind) {
                    tokens = Common.TokenExtractor.getStringTokens(nameText);
                } else if ("Number" === namedHeapObject.kind) {
                    tokens = Common.TokenExtractor.getNumberTokens(nameText);
                }
            }

            if (tokens && tokens.length > 0) {
                for (var i = 0; i < tokens.length; i++) {
                    var token = tokens[i];
                    var tokenSpan = document.createElement("span");
                    tokenSpan.className = Common.TokenExtractor.getCssClass(token.type);
                    tokenSpan.textContent = token.value;
                    nameContainer.appendChild(tokenSpan);
                }
            } else {
                nameContainer.textContent = nameText;
            }

            if (namedHeapObject.isCircularReference) {
                nameContainer.textContent += Plugin.Resources.getString("CircularReferenceMarker");
                tooltipText += Plugin.Resources.getString("CircularReferenceMarker") + " " + Plugin.Resources.getString("CircularReferenceMessage");
            }

            var sourceInfo = namedHeapObject.sourceInfo;

            if (sourceInfo) {
                nameContainer.className = "BPT-FileLink";
                nameContainer.onclick = SnapshotDataView.onRequestViewSource.bind(this, sourceInfo);

                cell.addEventListener("mouseover", SnapshotDataView.showSourceInfoTooltip.bind(this, tooltipText, sourceInfo));
            } else {
                cell.setAttribute("data-plugin-vs-tooltip", " " + tooltipText);
                cell.setAttribute("aria-label", namedHeapObject.name);
            }

            cell.appendChild(nameContainer);
        };

        SnapshotDataView.prototype.getWarningCss = function (dataIndex, dataSource) {
            var item = dataSource[dataIndex];
            if (item.isDetachedDomNode) {
                if (item instanceof MemoryAnalyzer.TypeDataObject) {
                    return "detachedDomNodeChildrenWarning";
                } else {
                    return "detachedDomNodeWarning";
                }
            } else if (item.hasDetachedDomNodeChildren && this._snapshotViewModel.foldObjectsByDominator) {
                return "detachedDomNodeChildrenWarning";
            }
        };

        SnapshotDataView.prototype.isShowInDominatorsViewCommandDisabled = function () {
            return !(SnapshotDataView.GridContextMenuData && SnapshotDataView.GridContextMenuData.view && SnapshotDataView.isObjectScopeConformed(SnapshotDataView.GridContextMenuData.object, SnapshotDataView.contextMenuScopeFilter()));
        };

        SnapshotDataView.prototype.navigateToObjectForPath = function (path) {
            var _this = this;
            if (path && path.length > 0 && this._grid) {
                var pathFromRoot = path.reverse();

                var dataSource = this._grid._dataSource;
                var expandStates = this._grid.getExpandStates();

                var dataSourceIndex = 0;
                for (var pathIndex = 0; pathIndex < pathFromRoot.length; pathIndex++) {
                    for (; dataSourceIndex < dataSource.length; dataSourceIndex++) {
                        if (dataSource[dataSourceIndex].objectId === pathFromRoot[pathIndex]) {
                            if (pathIndex === pathFromRoot.length - 1) {
                                this._grid.setSelectedDataIndex(dataSourceIndex);
                            } else {
                                if (expandStates[dataSourceIndex] < 0) {
                                    this._grid.expandNode(dataSourceIndex);
                                }

                                dataSourceIndex++;
                            }

                            break;
                        } else {
                            if (expandStates[dataSourceIndex] !== 0) {
                                dataSourceIndex += Math.abs(expandStates[dataSourceIndex]) - 1;
                            }
                        }
                    }
                }

                this._grid.layout();

                window.setImmediate(function () {
                    _this._grid.setFocusToSelectedRow();
                });
            }
        };

        SnapshotDataView.prototype.getDiffNameCellCSSClass = function (dataIndex, columnIndex, columnOrder, dataSource) {
            var item = dataSource[dataIndex];
            var scope = this.getScopeFilter();

            if (!item.diffOperation && !item.isFabricatedObject) {
                return null;
            }

            switch (scope) {
                case 1 /* ObjectsAddedBetweenSnapshots */:
                    if (item.isAdded) {
                        return null;
                    } else {
                        return "unmatchedScopeObject";
                    }

                    break;

                case 0 /* ObjectsLeftFromPreviousSnapshot */:
                    if (item.isChanged && !item.isBaseline) {
                        return null;
                    } else if (item.isAdded || item.isBaseline) {
                        return "unmatchedScopeObject";
                    }

                    break;

                case 2 /* AllObjects */:
                default:
                    return null;
                    break;
            }

            return null;
        };

        SnapshotDataView.prototype.getNumericCellCSSClass = function (isDiff, dataIndex, columnIndex, columnOrder, dataSource) {
            var className = "numeric-data";
            if (isDiff) {
                className += " " + this.getDiffNameCellCSSClass(dataIndex, columnIndex, columnOrder, dataSource);
            }

            return className;
        };

        SnapshotDataView.prototype.onGridContextMenu = function (grid, e) {
            this._focusedGrid = grid;

            var dataIndex = grid.getSelectedDataIndex();
            var foundRow = false;
            var menuX = e.pageX;
            var menuY = e.pageY;

            if (e.clientX === 0 && e.clientY === 0) {
                foundRow = (dataIndex > -1);

                var row = grid.getRowInfo(dataIndex).row;

                if (row) {
                    var rect = row.getBoundingClientRect();

                    menuX = Math.round(rect.left + (rect.width / 4));
                    menuY = Math.round(rect.top + (rect.height / 2));
                } else {
                    foundRow = false;
                }
            } else {
                var clickedElement = document.elementFromPoint(e.clientX, e.clientY);
                while (clickedElement) {
                    if (clickedElement && clickedElement.classList) {
                        if (clickedElement.classList.contains("grid-row")) {
                            foundRow = true;
                            break;
                        } else if (clickedElement.classList.contains("grid-canvas")) {
                            break;
                        }
                    }

                    clickedElement = clickedElement.parentElement;
                }
            }

            if (foundRow) {
                var objectId = -1;
                var item;
                if (typeof dataIndex === "number" && dataIndex >= 0) {
                    item = grid.getRowData(dataIndex);
                    if (!(item instanceof MemoryAnalyzer.TypeDataObject)) {
                        objectId = item.objectId;
                    }
                }

                if (objectId >= 0) {
                    if (SnapshotDataView.GridContextMenu) {
                        SnapshotDataView.GridContextMenuData = new GridContextMenuData(this, item);

                        SnapshotDataView.GridContextMenu.show(menuX, menuY);
                    }
                } else {
                    SnapshotDataView.GridContextMenuData = null;
                }
            }

            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        };

        SnapshotDataView.prototype.uiUpdateAll = function () {
            this.uiUpdateSnapshotDataSource();
        };

        SnapshotDataView.prototype.uiUpdateSnapshotDataSource = function () {
            if (this._dataViewModel.snapshotDataSource) {
                var isDiff = this._dataViewModel.snapshotDataSource.snapshot.isDiff;
                this._fieldNameToColumnMapMainGrid = this.populateFieldNameToColumnMap(isDiff);
                this._fieldNameToColumnMapReferenceGrid = this.populateFieldNameToColumnMap(isDiff);
            }

            this._referenceViewContainer.style.display = "none";
            this.updateTree();
        };

        SnapshotDataView.prototype.updateSortOrders = function () {
            if (!this._snapshotViewModel.foldObjectsByDominator) {
                if (this._sortOrder && this._sortOrder.index === "containsDetachedDomNode") {
                    this._sortOrder.index = "isDetachedDomNode";
                }

                if (this._sortOrderForReferences && this._sortOrderForReferences.index === "containsDetachedDomNode") {
                    this._sortOrderForReferences.index = "isDetachedDomNode";
                }
            } else {
                if (this._sortOrder && this._sortOrder.index === "isDetachedDomNode") {
                    this._sortOrder.index = "containsDetachedDomNode";
                }

                if (this._sortOrderForReferences && this._sortOrderForReferences.index === "isDetachedDomNode") {
                    this._sortOrderForReferences.index = "containsDetachedDomNode";
                }
            }
        };

        SnapshotDataView.prototype.getFilter = function () {
            return {
                displayObjectIDs: this._snapshotViewModel.displayObjectIDs,
                foldObjectsByDominator: this._snapshotViewModel.foldObjectsByDominator,
                showNonMatchingReferences: this._snapshotViewModel.showNonMatchingReferences,
                showBuiltIns: this._snapshotViewModel.showBuiltIns,
                showUnknownTypes: this._dataViewModel.showUnknownTypes,
                showUnknownSizes: this._dataViewModel.showUnknownSizes,
                filterString: this._dataViewModel.filterString
            };
        };

        SnapshotDataView.prototype.getScopeFilter = function () {
            if (!this._dataViewModel.isDiff) {
                return 2 /* AllObjects */;
            } else {
                if (isNaN(this._snapshotViewModel.scopeFilter)) {
                    return 1 /* ObjectsAddedBetweenSnapshots */;
                } else {
                    return this._snapshotViewModel.scopeFilter;
                }
            }
        };

        SnapshotDataView.prototype.getUpdatedSorter = function (sortOrder, fieldNameToColumnMapMainGrid) {
            return {
                sortProperty: sortOrder.index,
                sortOrder: sortOrder.order === "asc" ? 0 /* ascending */ : 1 /* descending */,
                sortComparer: SnapshotDataView.getSortComparer(sortOrder, fieldNameToColumnMapMainGrid)
            };
        };

        SnapshotDataView.prototype.getSorter = function () {
            return this.getUpdatedSorter(this._sortOrder, this._fieldNameToColumnMapMainGrid);
        };

        SnapshotDataView.prototype.getSorterForReferences = function () {
            return this.getUpdatedSorter(this._sortOrderForReferences, this._fieldNameToColumnMapReferenceGrid);
        };

        SnapshotDataView.prototype.markAllObjectsScopeConformed = function (dataSet) {
            var items = dataSet.items;
            for (var i = 0; i < items.length; i++) {
                items[i].isScopeConformed = true;
            }
        };

        SnapshotDataView.prototype.updateTree = function () {
            var _this = this;
            if (!this._dataViewModel.snapshotDataSource) {
                return;
            }

            if (this._rootQueryPromise) {
                MemoryAnalyzer.Program.traceWriter.raiseEvent(210 /* Memory_DisplayFirstLevelSnapshotData_Stop */);
                this._rootQueryPromise.cancel();
            }

            MemoryAnalyzer.Program.traceWriter.raiseEvent(210 /* Memory_DisplayFirstLevelSnapshotData_Stop */);

            this._rootQueryPromise = this._dataViewModel.snapshotDataSource.getRootHeapDataTreeItem(this.getFilter(), this.getSorter(), 0, SnapshotDataView.ROOTS_LOAD_CAP, this.getScopeFilter()).then(function (dataSet) {
                var roots = dataSet.items;
                var ariaDescription;

                if (dataSet.totalCount > dataSet.items.length) {
                    _this._reachedItemsCapMessageContainer.style.display = "block";
                    ariaDescription = Plugin.Resources.getString("ReachedItemsCapMessage", Common.FormattingHelpers.getDecimalLocaleString(dataSet.items.length, true), Common.FormattingHelpers.getDecimalLocaleString(dataSet.totalCount, true));
                    _this._reachedItemsCapMessageContainer.innerText = ariaDescription;
                } else {
                    _this._reachedItemsCapMessageContainer.style.display = "none";
                }

                var treeInfo = _this.getTreeInfo(roots, (function (item, expansionPath, startIndex, maxResult) {
                    var scopeFilter = _this.getScopeFilter();
                    var scopeConformed = false;
                    if (_this._snapshotViewModel.showNonMatchingReferences && (SnapshotDataView.isObjectScopeConformed(item, scopeFilter) || item.isScopeConformed)) {
                        scopeFilter = 2 /* AllObjects */;
                        scopeConformed = true;
                    }

                    var dataset = _this._dataViewModel.snapshotDataSource.getHeapDataTreeItem(_this.getFilter(), _this.getSorter(), item.id, expansionPath, startIndex, maxResult, scopeFilter);
                    if (scopeConformed) {
                        _this.markAllObjectsScopeConformed(dataset);
                    }

                    return dataset;
                }).bind(_this));

                var columns = _this.getColumnInfoForMainGrid(_this._dataViewModel.snapshotDataSource.getAvailableFields(_this._snapshotViewModel.foldObjectsByDominator));

                var gridOptions = new Common.Controls.Legacy.Grid.GridOptions(treeInfo.toggleFunction, treeInfo.loadMoreFunction, columns, [_this._sortOrder], null, _this.notifyRowSelected.bind(_this));
                gridOptions.disableRightClickSelection = false;

                var headerClickSortColumn;
                if (_this._snapshotViewModel.foldObjectsByDominator) {
                    headerClickSortColumn = _this._fieldNameToColumnMapMainGrid["containsDetachedDomNode"];
                } else {
                    headerClickSortColumn = _this._fieldNameToColumnMapMainGrid["isDetachedDomNode"];
                }

                if (!_this._grid) {
                    var gutterIcon = { cssClass: "", index: "", gutterIconCssCallback: _this.getWarningCss.bind(_this) };
                    gridOptions.gutter.backgroundColor = Plugin.Theme.getValue("plugin-background-color");
                    gridOptions.gutter.icon = gutterIcon;
                    gridOptions.gutter.headerClickSortColumn = headerClickSortColumn;
                    gridOptions.gutter.getTooltip = _this.detachedDomNodeTooltip.bind(_this);

                    _this._grid = _this.createGrid(treeInfo.gridData, treeInfo.expandStates, gridOptions, _this._snapshotGridContainer);
                    _this._grid.getElement().tabIndex = 4;
                    _this._grid.getElement().addEventListener("sort", _this.sortCompleted.bind(_this));
                    _this._grid.getElement().addEventListener("sortStarted", _this.sortStarted.bind(_this));
                    _this._grid.getElement().addEventListener("selectionchanged", _this.onGridSelectionChanged.bind(_this));
                    _this._grid.setAriaDescription(ariaDescription);
                } else {
                    _this._grid.setDataSource(treeInfo.gridData, treeInfo.expandStates, gridOptions.columns, gridOptions.sortOrders, -1);
                    _this._grid.setGutterHeaderClickSortColumn(headerClickSortColumn);
                    _this._grid.setAriaDescription(ariaDescription);
                }

                MemoryAnalyzer.Program.traceWriter.raiseEvent(210 /* Memory_DisplayFirstLevelSnapshotData_Stop */);
            });
        };

        SnapshotDataView.prototype.detachedDomNodeTooltip = function (dataIndex, dataSource) {
            var originalItem = dataSource[dataIndex];

            if (originalItem.isDetachedDomNode) {
                if (originalItem.isWinJsDisposable) {
                    return Plugin.Resources.getString("DetachedDomNodeDisposableTooltip");
                } else if (originalItem instanceof MemoryAnalyzer.TypeDataObject) {
                    return Plugin.Resources.getString("DetachedDomNodeTypeObjectTooltip");
                } else {
                    return Plugin.Resources.getString("DetachedDomNodeTooltip");
                }
            } else if (originalItem.hasDetachedDomNodeChildren && this._snapshotViewModel.foldObjectsByDominator) {
                if (originalItem instanceof MemoryAnalyzer.TypeDataObject) {
                    return Plugin.Resources.getString("DetachedDomNodeRetainingTypeObjectTooltip");
                } else {
                    return Plugin.Resources.getString("HasDetachedDomNodeChildrenTooltip");
                }
            } else {
                return null;
            }
        };

        SnapshotDataView.prototype.onGridSelectionChanged = function (args) {
            var item;

            var customArgs = args.customData[0];

            if (customArgs.selectedCount === 1) {
                var dataIndex = customArgs.selectedRows[customArgs.selectedIndex];
                if (typeof dataIndex !== "undefined") {
                    item = this._grid.getRowData(dataIndex);
                }
            }

            this.showReferences(item);
        };

        SnapshotDataView.prototype.notifyRowSelected = function () {
            Notifications.notify(MemoryAnalyzer.MemoryNotifications.DetailsViewRowSelected);
        };

        SnapshotDataView.prototype.showReferences = function (item) {
            var _this = this;
            var items;
            MemoryAnalyzer.Program.traceWriter.raiseEvent(215 /* Memory_UpdateObjectReferenceGraph_Start */);
            if (item && item.id && !isNaN(item.id)) {
                items = this._dataViewModel.snapshotDataSource.getReferenceTreeItems(item.id, item.id, 0, this.getSorterForReferences(), this._snapshotViewModel.displayObjectIDs, this._snapshotViewModel.displayCircularReferences, 0, -1).items;
            }

            if (!items || items.length === 0) {
                this._referenceViewContainer.style.display = "none";
                MemoryAnalyzer.Program.traceWriter.raiseEvent(216 /* Memory_UpdateObjectReferenceGraph_Stop */);
                return;
            }

            var rootItemId = item.id;
            var treeInfo = this.getTreeInfo(items, function (parentItem, expansionPath, startIndex, maxResult) {
                return _this._dataViewModel.snapshotDataSource.getReferenceTreeItems(rootItemId, parentItem.parentObjectId, parentItem.nodeId, _this.getSorterForReferences(), _this._snapshotViewModel.displayObjectIDs, _this._snapshotViewModel.displayCircularReferences, 0, -1);
            });

            var columns = this.getColumnInfoForReferenceGrid(this._dataViewModel.snapshotDataSource.getAvailableFieldsForReferenceTree(this._snapshotViewModel.foldObjectsByDominator));

            var gridOptions = new Common.Controls.Legacy.Grid.GridOptions(treeInfo.toggleFunction, treeInfo.loadMoreFunction, columns, [this._sortOrderForReferences], null, this.notifyRowSelected.bind(this));
            gridOptions.disableRightClickSelection = false;
            gridOptions.ariaTitle = Plugin.Resources.getString("ReferenceGraph");

            var headerClickSortColumn;
            if (this._snapshotViewModel.foldObjectsByDominator) {
                headerClickSortColumn = this._fieldNameToColumnMapMainGrid["containsDetachedDomNode"];
            } else {
                headerClickSortColumn = this._fieldNameToColumnMapMainGrid["isDetachedDomNode"];
            }

            if (!this._gridReference) {
                var gutterIcon = { cssClass: "", index: "", gutterIconCssCallback: this.getWarningCss.bind(this) };
                gridOptions.gutter.backgroundColor = Plugin.Theme.getValue("plugin-background-color");
                gridOptions.gutter.icon = gutterIcon;
                gridOptions.gutter.headerClickSortColumn = headerClickSortColumn;
                gridOptions.gutter.getTooltip = this.detachedDomNodeTooltip.bind(this);

                this._gridReference = this.createGrid(treeInfo.gridData, treeInfo.expandStates, gridOptions, this._referenceViewContainer);
                this._gridReference.getElement().tabIndex = 4;
                this._gridReference.getElement().addEventListener("sort", this.sortCompletedForReferences.bind(this));
            } else {
                this._gridReference.setDataSource(treeInfo.gridData, treeInfo.expandStates, gridOptions.columns, gridOptions.sortOrders, -1);
                this._gridReference.setGutterHeaderClickSortColumn(headerClickSortColumn);

                this._gridReference.updateGetChildDataCallback(treeInfo.toggleFunction);
            }

            this._referenceViewContainer.style.removeProperty("display");

            if (items.length === 1 && items[0].hasChildren) {
                this._gridReference.expandNode(0);
            }

            MemoryAnalyzer.Program.traceWriter.raiseEvent(216 /* Memory_UpdateObjectReferenceGraph_Stop */);
        };

        SnapshotDataView.prototype.getMoreText = function (totalLoaded, totalCount, capCount) {
            var hasMoreText;
            if (totalLoaded < totalCount) {
                var toLoadCount = Math.min(capCount, totalCount - totalLoaded);
                hasMoreText = Plugin.Resources.getString("ChildrenLoadNext", Common.FormattingHelpers.getDecimalLocaleString(toLoadCount, true));
            }

            return hasMoreText;
        };

        SnapshotDataView.prototype.getTreeInfo = function (roots, getChildren) {
            var _this = this;
            var rowsAndExpandStates = this.getPlaceholderRowsAndExpandStates(roots);

            var items = rowsAndExpandStates.itemsWithPlaceholders;
            var expandStates = rowsAndExpandStates.expandStates;

            var toggleFunction = function (parentTreeItem, expansionPath, complete) {
                var dataSet = getChildren(parentTreeItem, expansionPath, 0, SnapshotDataView.CHILDREN_LOAD_CAP);
                var hasMoreText = _this.getMoreText(dataSet.items.length, dataSet.totalCount, SnapshotDataView.CHILDREN_LOAD_CAP);
                if (hasMoreText) {
                    parentTreeItem.nextStartIndex = dataSet.items.length;
                }

                complete(_this.getPlaceholderRowsAndExpandStates(dataSet.items), hasMoreText);
            };

            var loadMoreFunction = function (parentTreeItem, expansionPath, complete) {
                var startIndex = parentTreeItem.nextStartIndex;
                if (!startIndex) {
                    return;
                }

                var dataSet = getChildren(parentTreeItem, expansionPath, startIndex, SnapshotDataView.CHILDREN_LOAD_CAP);
                var hasMoreText = _this.getMoreText(startIndex + dataSet.items.length, dataSet.totalCount, SnapshotDataView.CHILDREN_LOAD_CAP);
                if (hasMoreText) {
                    parentTreeItem.nextStartIndex = startIndex + dataSet.items.length;
                }

                complete(_this.getPlaceholderRowsAndExpandStates(dataSet.items), hasMoreText);
            };

            return new TreeInfo(items, expandStates, toggleFunction, loadMoreFunction);
        };

        SnapshotDataView.prototype.getPlaceholderRowsAndExpandStates = function (roots) {
            var items = [];
            var placeHolderRow = { name: "", value: "", isPlaceholder: true };
            var expandStates = [];
            for (var i = 0; roots && i < roots.length; i++) {
                items.push(roots[i]);
                if (roots[i].hasChildren) {
                    expandStates.push(-1);
                    items.push(placeHolderRow);
                    expandStates.push(0);
                } else {
                    expandStates.push(0);
                }
            }

            return {
                itemsWithPlaceholders: items,
                expandStates: expandStates
            };
        };

        SnapshotDataView.prototype.createGrid = function (gridData, expandStates, gridOptions, container) {
            container.innerHTML = "";

            var grid = new Common.Controls.Legacy.Grid.GridControl(container, gridOptions);
            grid.setDataSource(gridData, expandStates, gridOptions.columns, gridOptions.sortOrders, -1);

            container.addEventListener("contextmenu", this.onGridContextMenu.bind(this, grid));
            container.addEventListener("keydown", this.onKeyDown.bind(this, grid));

            return grid;
        };

        SnapshotDataView.prototype.getColumnInfo = function (fieldNames, fieldNamesToColumnInfo) {
            var columnInfo = [];
            for (var i = 0; i < fieldNames.length; i++) {
                if (fieldNamesToColumnInfo.hasOwnProperty(fieldNames[i])) {
                    columnInfo.push(fieldNamesToColumnInfo[fieldNames[i]]);
                } else {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1003"));
                }
            }

            return columnInfo;
        };

        SnapshotDataView.prototype.getColumnInfoForMainGrid = function (fieldNames) {
            return this.getColumnInfo(fieldNames, this._fieldNameToColumnMapMainGrid);
        };

        SnapshotDataView.prototype.getColumnInfoForReferenceGrid = function (fieldNames) {
            return this.getColumnInfo(fieldNames, this._fieldNameToColumnMapReferenceGrid);
        };

        SnapshotDataView.prototype.onKeyDown = function (grid, e) {
            this._focusedGrid = grid;

            if (e.keyCode === 121 /* F10 */ && !e.altKey && !e.ctrlKey && e.shiftKey) {
                var evt = document.createEvent("MouseEvent");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                this.onGridContextMenu(grid, evt);
            } else if (e.keyCode === 13 /* Enter */ && !e.altKey && !e.ctrlKey && !e.shiftKey) {
                this.tryViewSource();
            }
        };

        SnapshotDataView.prototype.sortCompleted = function (event) {
            var customData = event.customData[0];
            this._sortOrder = customData.sortOrder[0];

            MemoryAnalyzer.Program.onIdle();
            MemoryAnalyzer.Program.traceWriter.raiseEvent(208 /* Memory_GridSort_Stop */);
        };

        SnapshotDataView.prototype.sortStarted = function (event) {
            MemoryAnalyzer.Program.traceWriter.raiseEvent(207 /* Memory_GridSort_Start */);
        };

        SnapshotDataView.prototype.sortCompletedForReferences = function (event) {
            var customData = event.customData[0];
            this._sortOrderForReferences = customData.sortOrder[0];
        };

        SnapshotDataView.prototype.tryViewSource = function () {
            var dataIndex = this._grid.getSelectedDataIndex();

            if (dataIndex > -1) {
                var namedHeapObject = this._grid.getRowData(dataIndex);
                var sourceInfo = namedHeapObject.sourceInfo;

                if (sourceInfo) {
                    SnapshotDataView.onRequestViewSource(sourceInfo);
                }
            }
        };
        SnapshotDataView.ROOTS_LOAD_CAP = 2000;
        SnapshotDataView.CHILDREN_LOAD_CAP = 2000;

        SnapshotDataView.HTMLRegex = /HTML.*Element/;
        return SnapshotDataView;
    })(Common.Controls.Legacy.TemplateControl);
    MemoryAnalyzer.SnapshotDataView = SnapshotDataView;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotDataView.js.map

// snapshotDataViewTab.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SnapshotDataViewTab = (function (_super) {
        __extends(SnapshotDataViewTab, _super);
        function SnapshotDataViewTab(snapshotDataViewController) {
            _super.call(this);
            this._snapshotDataViewController = snapshotDataViewController;
            this.title = Plugin.Resources.getString(Common.Enum.GetName(MemoryAnalyzer.DataViewType, this._snapshotDataViewController.dataViewModel.viewType));
            this.tooltipString = Plugin.Resources.getString(Common.Enum.GetName(MemoryAnalyzer.DataViewType, this._snapshotDataViewController.dataViewModel.viewType) + "Tooltip");
            this.content = this._snapshotDataViewController.view;
        }
        Object.defineProperty(SnapshotDataViewTab.prototype, "controller", {
            get: function () {
                return this._snapshotDataViewController;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotDataViewTab.prototype.onActiveChanged = function () {
            var _this = this;
            if (this.active) {
                this._snapshotDataViewController.setSnapshotDataSource();

                window.setImmediate(function () {
                    var headerHasFocus = _this.header.rootElement === document.activeElement;
                    if (!headerHasFocus) {
                        _this._snapshotDataViewController.setFocusOnGrid();
                    }
                });
            }
        };
        return SnapshotDataViewTab;
    })(MemoryAnalyzer.Controls.TabItem);
    MemoryAnalyzer.SnapshotDataViewTab = SnapshotDataViewTab;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotDataViewTab.js.map

// snapshotDiffController.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SnapshotDiffController = (function () {
        function SnapshotDiffController(storageId, firstSnapshotId, lastSnapshotId) {
            this._storageId = storageId;
            this._firstSnapshotId = firstSnapshotId;
            this._lastSnapshotId = lastSnapshotId;
            this._navigationId = MemoryAnalyzer.NavigationHelpers.getNextId();
            this.model = new MemoryAnalyzer.SnapshotViewModel();
            this.model.progressText = Plugin.Resources.getString("GeneratingComparisonView");
            this.view = new MemoryAnalyzer.SnapshotView(this, this.model);
        }
        Object.defineProperty(SnapshotDiffController.prototype, "currentDataViewController", {
            get: function () {
                return this.view.currentDataViewController;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotDiffController.prototype, "navigationId", {
            get: function () {
                return this._navigationId;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotDiffController.prototype.getSnapshotDataViewController = function (viewType) {
            var controller = new MemoryAnalyzer.SnapshotDataViewController(viewType, this.model, this.view);
            return controller;
        };

        SnapshotDiffController.prototype.diffSnapshots = function (storageId, relativePaths, targetView, sortProperty) {
            var _this = this;
            this.setTargetView(targetView, sortProperty);

            var snapshotPaths = [];
            var traceEventKey = 0;
            for (var i = 0; i < relativePaths.length; i++) {
                var path = MemoryAnalyzer.Program.shell.getSnapshotFullPath(storageId, relativePaths[i]);
                snapshotPaths.push(path);
                traceEventKey += MemoryAnalyzer.SnapshotViewController.getHashKey(path);
            }

            MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(219 /* Memory_ProcessingDiffSnapshot_Start */, traceEventKey);
            MemoryAnalyzer.Program.memoryAnalyzerData.processSnapshotDiff(snapshotPaths).done(this.onDiffCompleted.bind(this, traceEventKey), this.onDiffFailed.bind(this, traceEventKey), function (progress) {
                _this.model.progressText = Plugin.Resources.getString(progress.stringId);
                _this.model.progressValue = progress.percentage;
            });
        };

        SnapshotDiffController.prototype.setTargetView = function (targetView, sortProperty) {
            this.model.targetView = targetView;
            this.model.sortProperty = sortProperty;
        };

        SnapshotDiffController.prototype.onDiffCompleted = function (traceEventKey, snapshotData) {
            var snapshot = new MemoryAnalyzer.Snapshot(snapshotData, true, this._firstSnapshotId, this._lastSnapshotId);
            this.model.snapshot = snapshot;
            MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(220 /* Memory_ProcessingDiffSnapshot_Stop */, traceEventKey);
            MemoryAnalyzer.Program.onIdle();
        };

        SnapshotDiffController.prototype.onDiffFailed = function (traceEventKey, error) {
            this.model.latestSnapshotError = error;
            MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(220 /* Memory_ProcessingDiffSnapshot_Stop */, traceEventKey);
            MemoryAnalyzer.Program.onIdle();
        };
        return SnapshotDiffController;
    })();
    MemoryAnalyzer.SnapshotDiffController = SnapshotDiffController;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotDiffController.js.map

// snapshotFile.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SnapshotFile = (function () {
        function SnapshotFile(storageId, relativePath) {
            this.storageId = storageId;
            this.relativePath = relativePath;
        }
        return SnapshotFile;
    })();
    MemoryAnalyzer.SnapshotFile = SnapshotFile;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotFile.js.map

// snapshotSummary.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SnapshotSummary = (function () {
        function SnapshotSummary(snapshotDataSummary, snapshotFile, timeTaken, id) {
            this.detachedDomNodeCount = snapshotDataSummary.detachedDomNodeCount;
            this.id = id;
            this.objectsCount = snapshotDataSummary.objectsCount;
            this.processPrivateBytes = snapshotDataSummary.privateBytes.toString();
            this.pointerSize = snapshotDataSummary.pointerSize;
            this.screenshotData = snapshotDataSummary.base64Image;
            this.snapshotFile = snapshotFile;
            this.statsAddedObjects = snapshotDataSummary.statsAddedObjects;
            this.statsDeletedObjects = snapshotDataSummary.statsDeletedObjects;
            this.taken = timeTaken;
            this.totalObjectSize = snapshotDataSummary.totalObjectSize;
        }
        Object.defineProperty(SnapshotSummary, "fileExtension", {
            get: function () {
                return ".snapshotsummary";
            },
            enumerable: true,
            configurable: true
        });

        SnapshotSummary.load = function (storageId, relativePath, completed, failed) {
            var stream;
            var snapshotSummary;

            Plugin.Storage.openFile(storageId + "\\" + relativePath, {
                access: 1 /* read */,
                encoding: "UTF-8",
                persistence: 1 /* temporary */,
                type: 1 /* text */
            }).then(function (file) {
                stream = file;
                return file.read();
            }).then(function (snapshotResultString) {
                snapshotSummary = JSON.parse(snapshotResultString);
                snapshotSummary.snapshotFile.storageId = storageId;
                return stream.close();
            }).done(function () {
                completed(snapshotSummary);
            }, function (error) {
                if (failed) {
                    failed(error);
                }
            });
        };

        SnapshotSummary.prototype.save = function (completed, failed) {
            var _this = this;
            var summaryRelativePath = this.snapshotFile.relativePath + SnapshotSummary.fileExtension;

            Plugin.Storage.createFile(this.snapshotFile.storageId + "\\" + summaryRelativePath, {
                access: 2 /* write */,
                encoding: "UTF-8",
                persistence: 1 /* temporary */,
                type: 1 /* text */
            }).done(function (file) {
                file.write(JSON.stringify(_this)).done(function () {
                    file.close();
                    completed();
                }, function (error) {
                    file.close();
                    if (failed) {
                        failed(error);
                    }
                });
            }, function (error) {
                if (failed) {
                    failed(error);
                }
            });
        };
        return SnapshotSummary;
    })();
    MemoryAnalyzer.SnapshotSummary = SnapshotSummary;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotSummary.js.map

// snapshotTab.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SnapshotTab = (function (_super) {
        __extends(SnapshotTab, _super);
        function SnapshotTab(controller) {
            _super.call(this);
            this._snapshotViewController = controller;
            this.content = controller.view;
        }
        SnapshotTab.prototype.onActiveChanged = function () {
            if (this.active) {
                var currentDataView = this._snapshotViewController.view.currentDataView;
                if (currentDataView) {
                    currentDataView.refreshGrids();
                }

                MemoryAnalyzer.NavigationHelpers.switchNavigationView(this._snapshotViewController.navigationId);
            }
        };
        return SnapshotTab;
    })(MemoryAnalyzer.Controls.TabItem);
    MemoryAnalyzer.SnapshotTab = SnapshotTab;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotTab.js.map

// snapshotTileView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SnapshotTileViewModel = (function () {
        function SnapshotTileViewModel(summary, snapshotSummaryCollection) {
            this._summary = summary;
            this._snapshotSummaryCollection = snapshotSummaryCollection;
        }
        Object.defineProperty(SnapshotTileViewModel.prototype, "summaryData", {
            get: function () {
                return this._summary;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "snapshotSummaryCollection", {
            get: function () {
                return this._snapshotSummaryCollection;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "timeTaken", {
            get: function () {
                var date = new Date(this._summary.taken);
                return "(" + date.toLocaleTimeString() + ")";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "detachedDomNodeCount", {
            get: function () {
                return this._summary.detachedDomNodeCount;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "processPrivateBytes", {
            get: function () {
                return MemoryAnalyzer.FormattingHelpers.getPrettyPrintSize(parseInt(this.summaryData.processPrivateBytes));
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "totalObjectSize", {
            get: function () {
                return MemoryAnalyzer.FormattingHelpers.getPrettyPrintSize(this.summaryData.totalObjectSize);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "objectsCount", {
            get: function () {
                return this.summaryData.objectsCount;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotTileViewModel.prototype.getComparableSnapshots = function () {
            var result = [];

            var currentSnapshotDate = this._summary.taken;
            for (var i = 0; i < this._snapshotSummaryCollection.length; i++) {
                var snapshot = this._snapshotSummaryCollection.getItem(i);
                if (snapshot.id !== this._summary.id) {
                    result.push(snapshot);
                }
            }

            result = result.sort(function (a, b) {
                return a.id - b.id;
            });
            return result;
        };
        return SnapshotTileViewModel;
    })();
    MemoryAnalyzer.SnapshotTileViewModel = SnapshotTileViewModel;

    var SnapshotTileView = (function (_super) {
        __extends(SnapshotTileView, _super);
        function SnapshotTileView(controller, model) {
            _super.call(this, "SnapshotTileTemplate");

            this._controller = controller;
            this._model = model;
            this._tileContextMenuItems = [];
            this._snapshotTile = this.findElement("snapshotTile");

            this._comparableSnapshots = this._model.getComparableSnapshots();
            this._tileHeader = this.findElement("snapshotTileHeader");
            this.findElement("snapshotTileTitle").innerText = Plugin.Resources.getString("SnapshotNumber", this._model.summaryData.id);

            var imgHolder = this.findElement("snapshotTileImage");

            if (this._model.summaryData.screenshotData) {
                imgHolder.src = "data:image/jpeg;base64," + this._model.summaryData.screenshotData.replace(/\r\n/g, "");
                imgHolder.alt = Plugin.Resources.getString("Screenshot");
            } else {
                imgHolder.style.display = "none";
            }

            var objectsCountText = Common.FormattingHelpers.getDecimalLocaleString(this._model.objectsCount, true);

            this.findElement("snapshotTakenDate").innerText = this._model.timeTaken;
            this.findElement("heapSizeLink").innerText = this._model.totalObjectSize;
            this.findElement("objectsCountLink").innerText = Plugin.Resources.getString("ObjectsCount", objectsCountText);
            this.findElement("heapSizeLink").setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("HeapSizeLinkTooltip"));
            this.findElement("objectsCountLink").setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("ObjectsCountLinkTooltip"));

            this.setupSizeDiff(this.findElement("heapDiffLink"), this.findElement("heapDiffIndicatorIcon"));
            this.setupCountDiff(this.findElement("objectsDiffLink"), this.findElement("objectDiffIndicatorIcon"));

            this.findElement("heapSizeLink").onclick = this.onSizeClick.bind(this);
            this.findElement("objectsCountLink").onclick = this.onObjectCountClick.bind(this);
            this.findElement("heapDiffLink").onclick = this.onDiffClick.bind(this);
            this.findElement("objectsDiffLink").onclick = this.onObjectDiffClick.bind(this);

            if (model.detachedDomNodeCount > 0) {
                var detachedDomNodeCount = this.findElement("snapshotTileDetachedDomNodeCount");
                detachedDomNodeCount.innerText = model.detachedDomNodeCount.toString();
                detachedDomNodeCount.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("PotentialIssuesTooltip", model.detachedDomNodeCount));
                detachedDomNodeCount.setAttribute("aria-label", Plugin.Resources.getString("PotentialIssuesTooltip", model.detachedDomNodeCount));
                detachedDomNodeCount.onclick = this.onDetachedDomNodesClick.bind(this);
                this.findElement("snapshotTileDetachedDomNodeInfo").style.visibility = "visible";
            }

            var links = this.findElementsByClassName("BPT-FileLink");
            for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
                var linkElement = links[linkIndex];
                (function (link) {
                    link.onkeydown = function (e) {
                        if ((e.keyCode === 13 /* Enter */ || e.keyCode === 32 /* Space */) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                            link.click();
                        }
                    };
                })(linkElement);
            }

            this.populateContextMenu();
            this._model.snapshotSummaryCollection.collectionChanged.addHandler(this.onCollectionChanged.bind(this));
        }
        Object.defineProperty(SnapshotTileView.prototype, "navigationElement", {
            get: function () {
                return this._tileHeader;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotTileView.prototype.setFocus = function () {
            this._tileHeader.focus();
        };

        SnapshotTileView.prototype.onCollectionChanged = function (eventArgs) {
            if (eventArgs.action === 0 /* Add */) {
                var newSummary = eventArgs.newItems[0];

                if (this._model.summaryData.id !== newSummary.id) {
                    var contextMenuItem = {
                        callback: this.diffTo.bind(this, newSummary.id),
                        label: Plugin.Resources.getString("SnapshotNumber", newSummary.id),
                        type: 1 /* command */
                    };

                    this._tileContextMenuItems.push(contextMenuItem);
                }

                this.createContextMenu();
            }
        };

        SnapshotTileView.prototype.createContextMenu = function () {
            if (this._tileContextMenu) {
                this._tileContextMenu.detach(this._snapshotTile);
            }

            if (this._tileContextMenuItems.length > 0) {
                var compareToMenuItem = {
                    callback: function () {
                    },
                    label: Plugin.Resources.getString("CompareTo"),
                    submenu: this._tileContextMenuItems,
                    type: 1 /* command */
                };

                this._tileContextMenu = Plugin.ContextMenu.create([compareToMenuItem]);
                this._tileContextMenu.attach(this._snapshotTile);
            }
        };

        SnapshotTileView.prototype.populateContextMenu = function () {
            this._comparableSnapshots = this._model.getComparableSnapshots();

            for (var i = 0; i < this._comparableSnapshots.length; i++) {
                var comparable = this._comparableSnapshots[i];
                var contextMenuItem = {
                    callback: this.diffTo.bind(this, comparable.id),
                    label: Plugin.Resources.getString("SnapshotNumber", comparable.id),
                    type: 1 /* command */
                };

                this._tileContextMenuItems.push(contextMenuItem);
            }

            this.createContextMenu();
        };

        SnapshotTileView.prototype.setupSizeDiff = function (element, iconElement) {
            var toSnapshot = this._comparableSnapshots[this._model.summaryData.id - 2];
            if (toSnapshot) {
                var size = (this._model.summaryData.totalObjectSize - toSnapshot.totalObjectSize);

                if (size > 0) {
                    iconElement.classList.add("heapIncreaseIcon");
                } else if (size < 0) {
                    iconElement.classList.add("heapDecreaseIcon");
                }

                if (size === 0) {
                    element.innerText = Plugin.Resources.getString("NoDiff");
                } else {
                    element.innerText = (size > 0 ? "+" : "-") + MemoryAnalyzer.FormattingHelpers.getPrettyPrintSize(Math.abs(size));
                }

                element.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("HeapSizeDiffLinkTooltip"));
            } else {
                element.classList.remove("BPT-FileLink");
                element.classList.add("baselineText");
                element.innerText = Plugin.Resources.getString("Baseline");
                element.tabIndex = -1;
            }
        };

        SnapshotTileView.prototype.setupCountDiff = function (element, iconElement) {
            if (this._comparableSnapshots.length >= 1) {
                var addedCount = this._model.summaryData.statsAddedObjects;
                var deletedCount = this._model.summaryData.statsDeletedObjects;
                var delta = addedCount - deletedCount;

                if (delta > 0) {
                    iconElement.classList.add("heapIncreaseIcon");
                } else if (delta < 0) {
                    iconElement.classList.add("heapDecreaseIcon");
                }

                if (addedCount === 0 && deletedCount === 0) {
                    element.innerText = Plugin.Resources.getString("NoDiff");
                } else {
                    var diffText;
                    diffText = "+" + Common.FormattingHelpers.getDecimalLocaleString(addedCount, true) + " / " + "-" + Common.FormattingHelpers.getDecimalLocaleString(deletedCount, true);

                    element.innerText = diffText;
                }

                element.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("ObjectsCountDiffLinkTooltip"));
            } else {
                element.classList.remove("BPT-FileLink");
                element.classList.add("baselineText");
                element.innerText = Plugin.Resources.getString("Baseline");
                element.tabIndex = -1;
            }
        };

        SnapshotTileView.prototype.onDetachedDomNodesClick = function (e) {
            this._controller.viewSnapshot(this._model.summaryData.id, "Types", "containsDetachedDomNode");
        };

        SnapshotTileView.prototype.onSizeClick = function (e) {
            this._controller.viewSnapshot(this._model.summaryData.id, "Types", "retainedSize");
        };

        SnapshotTileView.prototype.onObjectCountClick = function (e) {
            this._controller.viewSnapshot(this._model.summaryData.id, "Types", "childrenCount");
        };

        SnapshotTileView.prototype.diffTo = function (id) {
            this._controller.compareSnapshots(this._model.summaryData.id, id, "Types", "retainedSize");
        };

        SnapshotTileView.prototype.onDiffClick = function (e) {
            var toSnapshot = this._comparableSnapshots[this._model.summaryData.id - 2];
            if (toSnapshot) {
                this._controller.compareSnapshots(this._model.summaryData.id, toSnapshot.id, "Types", "retainedSizeDiff");
            }
        };

        SnapshotTileView.prototype.onObjectDiffClick = function (e, target) {
            var toSnapshot = this._comparableSnapshots[this._model.summaryData.id - 2];
            if (toSnapshot) {
                this._controller.compareSnapshots(this._model.summaryData.id, toSnapshot.id, "Types", "childrenCount");
            }
        };
        return SnapshotTileView;
    })(Common.Controls.Legacy.TemplateControl);
    MemoryAnalyzer.SnapshotTileView = SnapshotTileView;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotTileView.js.map

// snapshotView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SnapshotViewController = (function () {
        function SnapshotViewController(storageId) {
            this._storageId = storageId;
            this._navigationId = MemoryAnalyzer.NavigationHelpers.getNextId();

            this.model = new SnapshotViewModel();
            this.model.progressText = Plugin.Resources.getString("ProcessingSnapshot");
            this.view = new SnapshotView(this, this.model);
        }
        Object.defineProperty(SnapshotViewController.prototype, "currentDataViewController", {
            get: function () {
                return this.view.currentDataViewController;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotViewController.prototype, "navigationId", {
            get: function () {
                return this._navigationId;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotViewController.getHashKey = function (value) {
            var hash = 0;
            for (var index = 0; index < value.length; index++) {
                hash += value.charCodeAt(index);
            }

            return hash;
        };

        SnapshotViewController.prototype.getSnapshotDataViewController = function (viewType) {
            return new MemoryAnalyzer.SnapshotDataViewController(viewType, this.model, this.view);
        };

        SnapshotViewController.prototype.giveFeedback = function () {
            var _this = this;
            MemoryAnalyzer.Program.internalFeedback.isEnabled().done(function (enabled) {
                if (enabled) {
                    var viewTypeName = "";
                    if (_this.view.currentDataViewController) {
                        viewTypeName = Common.Enum.GetName(MemoryAnalyzer.DataViewType, _this.view.currentDataViewController.viewType);
                    }

                    MemoryAnalyzer.Program.shell.save(false).done(function (fileLocation) {
                        MemoryAnalyzer.Program.internalFeedback.sendData(true, "", "", viewTypeName, "", fileLocation);
                    });
                }
            });
        };

        SnapshotViewController.prototype.loadSnapshot = function (storageId, relativePaths, targetView, sortProperty) {
            if (!relativePaths || relativePaths.length !== 1) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1012"));
            }

            this.setTargetView(targetView, sortProperty);

            var snapshotPath = MemoryAnalyzer.Program.shell.getSnapshotFullPath(storageId, relativePaths[0]);
            var traceEventKey = SnapshotViewController.getHashKey(snapshotPath);

            MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(217 /* Memory_ProcessingSnapshot_Start */, traceEventKey);
            MemoryAnalyzer.Program.memoryAnalyzerData.processSnapshot(snapshotPath).done(this.onSnapshotProcessingCompleted.bind(this, traceEventKey), this.onSnapshotProcessingFailed.bind(this, traceEventKey));
        };

        SnapshotViewController.prototype.setTargetView = function (targetView, sortProperty) {
            this.model.targetView = targetView;
            this.model.sortProperty = sortProperty;
        };

        SnapshotViewController.prototype.onSnapshotProcessingCompleted = function (traceEventKey, snapshotData) {
            var snapshot = new MemoryAnalyzer.Snapshot(snapshotData, false, 0, 0);

            this.model.snapshot = snapshot;

            MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(218 /* Memory_ProcessingSnapshot_Stop */, traceEventKey);
            MemoryAnalyzer.Program.onIdle();
        };

        SnapshotViewController.prototype.onSnapshotProcessingFailed = function (traceEventKey, error) {
            if (!error) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1013"));
            }

            this.model.latestSnapshotError = error;

            MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(218 /* Memory_ProcessingSnapshot_Stop */, traceEventKey);
            MemoryAnalyzer.Program.onIdle();
        };

        SnapshotViewController.prototype.onSnapshotProgress = function (progress) {
            this.model.progressText = Plugin.Resources.getString(progress.stringId);
            this.model.progressValue = progress.percentage;
        };
        return SnapshotViewController;
    })();
    MemoryAnalyzer.SnapshotViewController = SnapshotViewController;

    var SnapshotViewModel = (function (_super) {
        __extends(SnapshotViewModel, _super);
        function SnapshotViewModel() {
            _super.call(this);
        }
        SnapshotViewModel.initialize = function () {
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.DataTabModelPropertyName, null);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.DisplayCircularReferencesPropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.DisplayObjectIDsPropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.FoldObjectsByDominatorPropertyName, true);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.IsDiffPropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.LatestSnapshotErrorPropertyName, null);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.ProgressTextPropertyName, "");
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.ProgressValuePropertyName, "");
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.ScopeFilterOptionsPropertyName, null);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.ScopeFilterPropertyName, 2 /* AllObjects */);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.ShowBuiltInsPropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.ShowNonMatchingReferencesPropertyName, false);
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.SnapshotPropertyName, null, function (obj) {
                return obj.onSnapshotChanged();
            });
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.SortPropertyPropertyName, "");
            Common.ObservableHelpers.defineProperty(SnapshotViewModel, SnapshotViewModel.TargetViewPropertyName, "");
        };

        SnapshotViewModel.prototype.onSnapshotChanged = function () {
            this.setScopeFilterOptions();
        };

        SnapshotViewModel.prototype.onFilterStringChanging = function () {
            MemoryAnalyzer.Program.traceWriter.raiseEvent(213 /* Memory_GridFilterResponse_Start */);
        };

        SnapshotViewModel.prototype.onFilterStringChanged = function () {
            MemoryAnalyzer.Program.traceWriter.raiseEvent(214 /* Memory_GridFilterResponse_Stop */);
        };

        SnapshotViewModel.prototype.setScopeFilterOptions = function () {
            if (this.snapshot) {
                var stats = this.snapshot.getSnapshotDiffStats();

                var scopeFilterOptions = [
                    {
                        value: 0 /* ObjectsLeftFromPreviousSnapshot */.toString(),
                        text: Plugin.Resources.getString("ScopeObjectsLeftFromPreviousSnapshot", this.snapshot.firstSnapshotId, Common.FormattingHelpers.getDecimalLocaleString(stats.leftOverObjectsCount, true))
                    },
                    {
                        value: 1 /* ObjectsAddedBetweenSnapshots */.toString(),
                        text: Plugin.Resources.getString("ScopeObjectsAddedBetweenSnapshots", this.snapshot.firstSnapshotId, this.snapshot.lastSnapshotId, Common.FormattingHelpers.getDecimalLocaleString(stats.addedObjectsCount, true))
                    },
                    {
                        value: 2 /* AllObjects */.toString(),
                        text: Plugin.Resources.getString("ScopeAllObjects", this.snapshot.lastSnapshotId, Common.FormattingHelpers.getDecimalLocaleString(stats.objectsCount, true))
                    }
                ];

                this.scopeFilterOptions = scopeFilterOptions;
                this.scopeFilter = 1 /* ObjectsAddedBetweenSnapshots */;
                this.isDiff = this.snapshot.isDiff;
            } else {
                this.scopeFilterOptions = [];
            }
        };
        SnapshotViewModel.DataTabModelPropertyName = "dataTabModel";
        SnapshotViewModel.DisplayCircularReferencesPropertyName = "displayCircularReferences";
        SnapshotViewModel.DisplayObjectIDsPropertyName = "displayObjectIDs";
        SnapshotViewModel.FoldObjectsByDominatorPropertyName = "foldObjectsByDominator";
        SnapshotViewModel.IsDiffPropertyName = "isDiff";
        SnapshotViewModel.LatestSnapshotErrorPropertyName = "latestSnapshotError";
        SnapshotViewModel.ProgressTextPropertyName = "progressText";
        SnapshotViewModel.ProgressValuePropertyName = "progressValue";
        SnapshotViewModel.ScopeFilterPropertyName = "scopeFilter";
        SnapshotViewModel.ScopeFilterOptionsPropertyName = "scopeFilterOptions";
        SnapshotViewModel.ShowBuiltInsPropertyName = "showBuiltIns";
        SnapshotViewModel.ShowNonMatchingReferencesPropertyName = "showNonMatchingReferences";
        SnapshotViewModel.SnapshotPropertyName = "snapshot";
        SnapshotViewModel.SortPropertyPropertyName = "sortProperty";
        SnapshotViewModel.TargetViewPropertyName = "targetView";
        return SnapshotViewModel;
    })(Common.Observable);
    MemoryAnalyzer.SnapshotViewModel = SnapshotViewModel;

    SnapshotViewModel.initialize();

    var SnapshotView = (function (_super) {
        __extends(SnapshotView, _super);
        function SnapshotView(controller, model) {
            _super.call(this, "SnapshotTabTemplate");

            this._controller = controller;
            this._model = model;

            this._snapshotAnalysisView = new SnapshotAnalysisView(this._controller, this._model);

            this._model.propertyChanged.addHandler(this.onPropertyChanged.bind(this));

            this._snapshotDataNavigation = new Common.Controls.Legacy.Control(this.findElement("snapshotDataNavigation"));
            this._snapshotProcessingProgressDiv = this.findElement("snapshotProcessingProgressDiv");
            this._progressText = this.findElement("progressText");
            this._progressBar = this.findElement("progressBar");
            this._snapshotProcessingError = this.findElement("snapshotProcessingError");
            this._snapshotProcessingErrorMsg = this.findElement("snapshotProcessingErrorMsg");

            this.findElement("snapshotProcessingErrorLabel").innerText = Plugin.Resources.getString("ErrorWhileProcessing");

            this.uiUpdateViews();
            this.updateProgress();
        }
        Object.defineProperty(SnapshotView.prototype, "currentDataView", {
            get: function () {
                var currentTab = this.currentDataViewTab;
                if (currentTab) {
                    return currentTab.content;
                }

                return null;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotView.prototype, "currentDataViewController", {
            get: function () {
                var currentTab = this.currentDataViewTab;
                if (currentTab) {
                    return currentTab.controller;
                }

                return null;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotView.prototype, "currentDataViewTab", {
            get: function () {
                if (this._tabControl && this._tabControl.selectedItem) {
                    return this._tabControl.selectedItem;
                }

                return null;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotView.prototype.switchToDataView = function (viewType) {
            var tab = this._tabControl.getTab(viewType);
            if (tab) {
                tab.controller.dataViewModel.filterString = "";
            }

            this._tabControl.selectedItem = tab;
        };

        SnapshotView.prototype.onPropertyChanged = function (propertyName) {
            var _this = this;
            switch (propertyName) {
                case SnapshotViewModel.LatestSnapshotErrorPropertyName:
                    this.updateSnapshotError();
                    break;
                case SnapshotViewModel.ProgressTextPropertyName:
                case SnapshotViewModel.ProgressValuePropertyName:
                    this.updateProgress();
                    break;
                case SnapshotViewModel.ShowBuiltInsPropertyName:
                    this.forEachTab(function (tab) {
                        tab.controller.snapshotViewModel.showBuiltIns = _this._model.showBuiltIns;
                    });
                    break;
                case SnapshotViewModel.SnapshotPropertyName:
                    this.uiUpdateViews();
                    break;
                case SnapshotViewModel.SortPropertyPropertyName:
                    this.updateSort();
                    break;
                case SnapshotViewModel.TargetViewPropertyName:
                    this.updateTargetView();
                    break;
            }
        };

        SnapshotView.prototype.forEachTab = function (action) {
            for (var i = 0; i < this._tabControl.length(); i++) {
                var tab = this._tabControl.getTab(i);
                action(tab);
            }
        };

        SnapshotView.prototype.updateProgress = function () {
            if (this._model.progressText) {
                this._progressText.innerText = this._model.progressText;
            }

            if (this._model.progressValue) {
                this._progressBar.value = this._model.progressValue;
            }
        };

        SnapshotView.prototype.updateTargetView = function () {
            if (this._tabControl) {
                var title = this._model.targetView;
                for (var i = 0; i < this._tabControl.length(); i++) {
                    var tabItem = this._tabControl.getTab(i);
                    if (tabItem.title === title) {
                        this._tabControl.selectedItem = tabItem;
                    }
                }
            }
        };

        SnapshotView.prototype.updateSort = function () {
            if (this.currentDataView) {
                this.currentDataView.sortBy(this._model.sortProperty, "desc");
            }
        };

        SnapshotView.prototype.updateSnapshotError = function () {
            var error = this._model.latestSnapshotError;
            if (error) {
                this.showProgress(false);

                this._snapshotProcessingErrorMsg.innerText = MemoryAnalyzer.ErrorFormatter.format(error);
                this._snapshotProcessingError.style.display = "block";
            } else {
                this._snapshotProcessingErrorMsg.innerText = "";
                this._snapshotProcessingError.style.display = "none";
            }
        };

        SnapshotView.prototype.getNewTab = function (dataViewType) {
            return new MemoryAnalyzer.SnapshotDataViewTab(this._controller.getSnapshotDataViewController(dataViewType));
        };

        SnapshotView.prototype.uiUpdateViews = function () {
            var _this = this;
            this.updateSnapshotError();

            if (this._tabControl) {
                for (var i = 0; i < this._tabControl.length(); i++) {
                    var tabToRemove = this._tabControl.getTab(i);
                }

                this._snapshotDataNavigation.removeChild(this._tabControl);
            }

            if (this._model.snapshot) {
                this._snapshotDataNavigation.rootElement.classList.remove("snapshotDataNavigationHidden");
                this.showProgress(false);

                this._tabControl = new MemoryAnalyzer.Controls.TabControl();
                this._tabControl.tabsLeftAligned = true;
                this._tabControl.afterBarContainer.appendChild(this._snapshotAnalysisView.rootElement);

                var dataViewTypes = Common.Enum.GetValues(MemoryAnalyzer.DataViewType);
                for (var i = 0; i < dataViewTypes.length; i++) {
                    var dataViewType = dataViewTypes[i];
                    var tabItem = this.getNewTab(dataViewType);
                    this._tabControl.addTab(tabItem);
                }

                this.updateTargetView();
                this.updateSort();
                this._snapshotAnalysisView.setupSettingsMenu();
                this._snapshotAnalysisView.onTabChanged();
                this._tabControl.selectedItemChanged = function () {
                    _this._model.targetView = _this._tabControl.selectedItem.title;
                    _this._snapshotAnalysisView.onTabChanged();
                    _this.updateNavigationFrames();
                };

                this._snapshotDataNavigation.appendChild(this._tabControl);

                Plugin.VS.Internal.CodeMarkers.fire(23589 /* perfBrowserTools_MemoryAnalyzerViewLoaded */);

                this.updateNavigationFrames();
            } else {
                this._snapshotDataNavigation.rootElement.classList.add("snapshotDataNavigationHidden");
                this.showProgress(true);

                MemoryAnalyzer.NavigationHelpers.updateAdditionalNavigationFrames(this._controller.navigationId);
            }
        };

        SnapshotView.prototype.showProgress = function (show) {
            if (show) {
                this._snapshotProcessingProgressDiv.classList.remove("snapshotProcessingProgressDivHidden");
            } else {
                this._snapshotProcessingProgressDiv.classList.add("snapshotProcessingProgressDivHidden");
            }
        };

        SnapshotView.prototype.updateNavigationFrames = function () {
            var _this = this;
            MemoryAnalyzer.NavigationHelpers.updateAdditionalNavigationFrames(this._controller.navigationId, [
                Common.NavigationUtilities.makeNavigationFrameFromTarget(this._tabControl.rootElement, this.currentDataViewTab.header.rootElement),
                Common.NavigationUtilities.makeNavigationFrameFromCallback(this.currentDataView.navigationContainer, function () {
                    if (_this.currentDataView.navigationContainer.style.display !== "none") {
                        return _this.currentDataView.navigationTarget;
                    }

                    return null;
                })
            ]);
        };
        return SnapshotView;
    })(Common.Controls.Legacy.TemplateControl);
    MemoryAnalyzer.SnapshotView = SnapshotView;

    var SnapshotAnalysisView = (function (_super) {
        __extends(SnapshotAnalysisView, _super);
        function SnapshotAnalysisView(controller, model) {
            _super.call(this, "MemoryAnalyzer.analysisBarTemplate");

            this._controller = controller;
            this.model = model;
            this.model.displayObjectIDs = MemoryAnalyzer.Program.userSettings.displayObjectIDs;
            this.model.foldObjectsByDominator = MemoryAnalyzer.Program.userSettings.foldObjectsByDominator;
            this.model.showBuiltIns = MemoryAnalyzer.Program.userSettings.showBuiltIns;
            this.model.showNonMatchingReferences = MemoryAnalyzer.Program.userSettings.showNonMatchingReferences;

            this._filterInput = this.getNamedControl("filterInput");
        }
        SnapshotAnalysisView.prototype.setupSettingsMenu = function () {
            if (this.model.snapshot && !this._settingsMenu) {
                var settingsMenuButton = this.getNamedControl("settingsMenuButton");

                this._settingsMenu = new Common.Controls.MenuControl();
                this._settingsMenu.menuItemsTemplateId = "MemoryAnalyzer.settingsDropDownMenu";
                this._settingsMenu.targetButtonElement = settingsMenuButton.rootElement;
                this._settingsMenu.dismissOnTargetButtonClick = true;

                this.model.isDiff = this.model.snapshot.isDiff;
                this._settingsMenu.model = this.model;

                this.rootElement.appendChild(this._settingsMenu.rootElement);
            }
        };

        SnapshotAnalysisView.prototype.onTabChanged = function () {
            var currentViewController = this._controller.currentDataViewController;
            if (currentViewController) {
                this.model.dataTabModel = currentViewController.dataViewModel;
            }
        };
        return SnapshotAnalysisView;
    })(Common.TemplateControl);
    MemoryAnalyzer.SnapshotAnalysisView = SnapshotAnalysisView;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/snapshotView.js.map

// summaryTab.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SummaryTab = (function (_super) {
        __extends(SummaryTab, _super);
        function SummaryTab(summaryViewController) {
            _super.call(this);

            this._summaryViewController = summaryViewController;

            this.title = Plugin.Resources.getString("Summary").toLocaleUpperCase();
            this.tooltipString = Plugin.Resources.getString("SummaryTabTooltip");
            this.content = summaryViewController.view;
        }
        SummaryTab.prototype.onActiveChanged = function () {
            if (this.active) {
                MemoryAnalyzer.NavigationHelpers.switchNavigationView(this._summaryViewController.navigationId);
            }
        };
        return SummaryTab;
    })(MemoryAnalyzer.Controls.TabItem);
    MemoryAnalyzer.SummaryTab = SummaryTab;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/summaryTab.js.map

// summaryView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var SummaryViewController = (function () {
        function SummaryViewController(memoryAnalyzer, storageId, isOffline) {
            this._screenshotHeight = 150;
            this._screenshotKeepAspectRatio = true;
            this._screenshotWidth = 200;
            this._memoryAnalyzer = memoryAnalyzer;
            this._storageId = storageId;
            this._navigationId = MemoryAnalyzer.NavigationHelpers.getNextId();

            this.model = new SummaryViewModel(isOffline);
            this.view = new SummaryView(this, this.model);
        }
        Object.defineProperty(SummaryViewController.prototype, "navigationId", {
            get: function () {
                return this._navigationId;
            },
            enumerable: true,
            configurable: true
        });

        SummaryViewController.prototype.giveFeedback = function () {
            MemoryAnalyzer.Program.internalFeedback.isEnabled().done(function (enabled) {
                if (enabled) {
                    MemoryAnalyzer.Program.shell.save(false).done(function (fileLocation) {
                        MemoryAnalyzer.Program.internalFeedback.sendData(true, "", "", "", "", fileLocation);
                    });
                }
            });
        };

        SummaryViewController.prototype.loadExistingSnapshots = function () {
            var _this = this;
            var fileExtension = ".snapjs" + MemoryAnalyzer.SnapshotSummary.fileExtension;

            var snapshotSummaries = [];
            var snapshotCount = 0;

            Plugin.Storage.getFileList(this._storageId, 1 /* temporary */).done(function (files) {
                files = files.filter(function (file) {
                    return file.slice(-fileExtension.length) === fileExtension;
                });

                for (var i = 0; i < files.length; i++) {
                    MemoryAnalyzer.SnapshotSummary.load(_this._storageId, files[i], function (snapshotNumber, snapshotSummary) {
                        snapshotSummaries.push(snapshotSummary);
                        snapshotCount++;

                        if (snapshotCount === files.length) {
                            snapshotSummaries = snapshotSummaries.sort(function (a, b) {
                                return a.id - b.id;
                            });
                            for (var snapshot = 0; snapshot < snapshotSummaries.length; snapshot++) {
                                this.model.snapshotSummaryCollection.push(snapshotSummaries[snapshot]);
                            }
                        }
                    }.bind(_this, i), _this.onSnapshotFailed.bind(_this));
                }

                Plugin.VS.Internal.CodeMarkers.fire(23589 /* perfBrowserTools_MemoryAnalyzerViewLoaded */);
                MemoryAnalyzer.Program.onIdle();
            }, this.onSnapshotFailed.bind(this));
        };

        SummaryViewController.prototype.save = function () {
            if (this.model.snapshotSummaryCollection.length > 0) {
                return MemoryAnalyzer.Program.shell.save(true);
            }

            return Plugin.Promise.as(null);
        };

        SummaryViewController.prototype.startGraphCollectorSession = function () {
            var _this = this;
            if (!MemoryAnalyzer.Program.shell.isGraphCollectionSupported) {
                return;
            }

            if (!this._graphCollectorSession) {
                this.model.isStarting = true;
                MemoryAnalyzer.Program.shell.startGraphCollection().done(function (newSession) {
                    _this._graphCollectorSession = newSession;
                    _this.model.graphCollectorSession = newSession;
                    _this.view.startGraph();
                    _this.model.isStarting = false;
                    _this.model.isOffline = false;
                }, function (err) {
                    _this.model.isStarting = false;
                    MemoryAnalyzer.Program.reportError(err, Plugin.Resources.getErrorString("JSPerf.1064"));
                });
            }
        };

        SummaryViewController.prototype.stopGraphCollectorSession = function () {
            var _this = this;
            if (this._graphCollectorSession) {
                this.model.isStopping = true;
                this.view.stopGraph();
                this._graphCollectorSession.stop().done(function () {
                    _this._graphCollectorSession = null;
                    if (_this.model.snapshotSummaryCollection.length === 0) {
                        _this.view.removeExistingGraph();
                    }

                    _this.model.isStopping = false;
                    _this.model.isOffline = true;
                }, function (err) {
                    _this.model.isStopping = false;
                });
            }
        };

        SummaryViewController.prototype.takeSnapshot = function () {
            var _this = this;
            if (!this.model.isTakeSnapshotEnabled) {
                return;
            }

            this.model.isTakingSnapshot = true;
            MemoryAnalyzer.Program.traceWriter.raiseEvent(201 /* Memory_TakeSnapshot_Start */);
            MemoryAnalyzer.Program.shell.createSnapshot().done(function (fileAndPath) {
                var args = [SummaryViewController._snapshotChunkSize, _this._screenshotWidth, _this._screenshotHeight, _this._screenshotKeepAspectRatio];
                var takeSnapshotCommand = new MemoryAnalyzer.TakeSnapshotCommand(args, fileAndPath.file);

                takeSnapshotCommand.completedHandler = function () {
                    var previousSnapshotPath;
                    if (_this.model.snapshotSummaryCollection.length > 0) {
                        var snapshotSummary = _this.model.snapshotSummaryCollection.getItem(_this.model.snapshotSummaryCollection.length - 1);
                        if (snapshotSummary) {
                            previousSnapshotPath = snapshotSummary.snapshotFile.relativePath;
                        }
                    }

                    return fileAndPath.file.close().done(function () {
                        return _this.onSnapshotResult(fileAndPath.relativePath, previousSnapshotPath);
                    });
                };

                takeSnapshotCommand.errorHandler = function (error) {
                    return fileAndPath.file.close().done(function () {
                        return _this.onSnapshotFailed(error);
                    });
                };

                _this._memoryAnalyzer.callProxy(takeSnapshotCommand);
            }, this.onSnapshotFailed.bind(this));
        };

        SummaryViewController.prototype.cancelPendingSnapshots = function () {
            if (this._snapshotSummaryPromise) {
                this._snapshotSummaryPromise.cancel();
                this._snapshotSummaryPromise = null;
            }
        };

        SummaryViewController.prototype.viewSnapshot = function (snapshotId, target, sortProperty) {
            var foundSnapshotSummary = this.getSnapshotSummary(snapshotId);

            if (foundSnapshotSummary) {
                MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(205 /* Memory_ViewSnapshot_Start */, snapshotId);
                this._memoryAnalyzer.showSnapshotTab(foundSnapshotSummary.snapshotFile.relativePath, target, Plugin.Resources.getString("SnapshotNumber", foundSnapshotSummary.id), sortProperty).done(function () {
                    MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(206 /* Memory_ViewSnapshot_Stop */, snapshotId);
                });
            }
        };

        SummaryViewController.prototype.compareSnapshots = function (lastSnapshotId, firstSnapshotId, target, sortProperty) {
            var traceEventKey = lastSnapshotId * 1000000 + firstSnapshotId;
            MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(203 /* Memory_CompareSnapshot_Start */, traceEventKey);
            if (lastSnapshotId < firstSnapshotId) {
                var tempId = lastSnapshotId;
                lastSnapshotId = firstSnapshotId;
                firstSnapshotId = tempId;
            }

            var snapshotsInfo = [];
            var lastSnapshotInfo = this.getSnapshotSummary(lastSnapshotId);
            var firstSnapshotInfo = this.getSnapshotSummary(firstSnapshotId);
            if (lastSnapshotInfo && firstSnapshotInfo) {
                for (var i = 0; i < this.model.snapshotSummaryCollection.length; i++) {
                    var s = this.model.snapshotSummaryCollection.getItem(i);
                    if (s.taken >= firstSnapshotInfo.taken && s.taken <= lastSnapshotInfo.taken) {
                        snapshotsInfo.push(s);
                    }
                }

                snapshotsInfo = snapshotsInfo.sort(function (a, b) {
                    return a.taken - b.taken;
                });
            }

            var snapshotFiles = [];
            for (var i = 0; i < snapshotsInfo.length; i++) {
                snapshotFiles.push(snapshotsInfo[i].snapshotFile.relativePath);
            }

            this._memoryAnalyzer.showDiffSnapshotTab(snapshotFiles, target, Plugin.Resources.getString("SnapshotNumberDiff", lastSnapshotId, firstSnapshotId), firstSnapshotId, lastSnapshotId, sortProperty).done(function () {
                MemoryAnalyzer.Program.traceWriter.raiseEventWithKey(204 /* Memory_CompareSnapshot_Stop */, traceEventKey);
            });
        };

        SummaryViewController.prototype.setScreenshotSize = function (targetWidth, targetHeight, keepAspectRatio) {
            this._screenshotWidth = targetWidth;
            this._screenshotHeight = targetHeight;
            this._screenshotKeepAspectRatio = keepAspectRatio;
        };

        SummaryViewController.prototype.createTileView = function (snapshotSummary) {
            var model = new MemoryAnalyzer.SnapshotTileViewModel(snapshotSummary, this.model.snapshotSummaryCollection);
            var view = new MemoryAnalyzer.SnapshotTileView(this, model);

            return view;
        };

        SummaryViewController.prototype.reset = function () {
            SummaryViewController._nextIdentifier = 0;
            this.model.snapshotSummaryCollection.clear();

            MemoryAnalyzer.Program.onIdle();
        };

        SummaryViewController.prototype.removeExistingGraph = function () {
            this.view.removeExistingGraph();
        };

        SummaryViewController.prototype.getSnapshotSummary = function (snapshotId) {
            var foundSnapshotSummary = null;
            for (var i = 0; i < this.model.snapshotSummaryCollection.length; i++) {
                var snapshotSummary = this.model.snapshotSummaryCollection.getItem(i);
                if (snapshotSummary.id === snapshotId) {
                    foundSnapshotSummary = snapshotSummary;
                    break;
                }
            }

            return foundSnapshotSummary;
        };

        SummaryViewController.prototype.onSnapshotResult = function (relativePath, prevSnapshotRelativePath) {
            var _this = this;
            var timeTaken = new Date().getTime();
            var snapshotPath = MemoryAnalyzer.Program.shell.getSnapshotFullPath(this._storageId, relativePath);
            var prevSnapshotPath;

            if (prevSnapshotRelativePath) {
                prevSnapshotPath = MemoryAnalyzer.Program.shell.getSnapshotFullPath(this._storageId, prevSnapshotRelativePath);
            }

            this._snapshotSummaryPromise = MemoryAnalyzer.Program.memoryAnalyzerData.processSnapshotSummary(snapshotPath, prevSnapshotPath).then(function (snapshotSummary) {
                _this._snapshotSummaryPromise = null;
                _this.onSnapshotCompleted(relativePath, snapshotSummary, timeTaken);
            }, function (err) {
                _this._snapshotSummaryPromise = null;
                _this.onSnapshotFailed(err);
            });
        };

        SummaryViewController.prototype.onSnapshotCompleted = function (relativePath, snapshotSummary, timeTaken) {
            if (!snapshotSummary) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1014"));
            }

            var id = ++SummaryViewController._nextIdentifier;
            var summary = new MemoryAnalyzer.SnapshotSummary(snapshotSummary, new MemoryAnalyzer.SnapshotFile(this._storageId, relativePath), timeTaken, id);

            this.model.snapshotSummaryCollection.push(summary);
            this.model.isTakingSnapshot = false;

            if (window.console && window.console.log) {
                window.console.log("Snapshot taken: " + summary.objectsCount + " objects.");
            }

            summary.save(function () {
                Notifications.notify(MemoryAnalyzer.MemoryNotifications.OnSnapshotProcessingCompleted, summary);
                Plugin.VS.Internal.CodeMarkers.fire(23590 /* perfBrowserTools_MemoryAnalyzerIdle */);
                MemoryAnalyzer.Program.traceWriter.raiseEvent(202 /* Memory_TakeSnapshot_Stop */);
            }, this.onSnapshotFailed.bind(this));
        };

        SummaryViewController.prototype.onSnapshotFailed = function (error) {
            if (!error) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1015"));
            }

            error.message = Plugin.Resources.getString("SnapshotCreationFailed", error.message);

            this.model.latestSnapshotError = error;
            this.model.isTakingSnapshot = false;

            MemoryAnalyzer.Program.onIdle();
        };
        SummaryViewController._nextIdentifier = 0;
        SummaryViewController._snapshotChunkSize = 32768;
        return SummaryViewController;
    })();
    MemoryAnalyzer.SummaryViewController = SummaryViewController;

    var SummaryViewModel = (function (_super) {
        __extends(SummaryViewModel, _super);
        function SummaryViewModel(isOffline) {
            _super.call(this);
            this.isOffline = isOffline;
            this._snapshotSummaryCollection = new Common.ObservableCollection();
            this._snapshotSummaryCollection.propertyChanged.addHandler(this.onPropertyChanged.bind(this));
            this.propertyChanged.addHandler(this.onPropertyChanged.bind(this));
        }
        Object.defineProperty(SummaryViewModel.prototype, "isOpenSessionEnabled", {
            get: function () {
                return MemoryAnalyzer.Program.packager !== null;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SummaryViewModel.prototype, "isSaveSessionEnabled", {
            get: function () {
                return this._snapshotSummaryCollection.length > 0 && MemoryAnalyzer.Program.packager !== null;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SummaryViewModel.prototype, "isStartEnabled", {
            get: function () {
                return !this.isStarting && this.isOffline && this.isTargetCompatible && this.isAttached && this.isRunning;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SummaryViewModel.prototype, "isStopEnabled", {
            get: function () {
                return !this.isStopping && !this.isOffline && this.isAttached && this.isRunning;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SummaryViewModel.prototype, "isTakeSnapshotEnabled", {
            get: function () {
                return !this.isOffline && this.isAttached && this.isRunning && !this.isTakingSnapshot && this.isTargetCompatible;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SummaryViewModel.prototype, "snapshotSummaryCollection", {
            get: function () {
                return this._snapshotSummaryCollection;
            },
            enumerable: true,
            configurable: true
        });

        SummaryViewModel.initialize = function () {
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.IsAttachedPropertyName, false);
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.IsOfflinePropertyName, true, function (obj) {
                obj.onIsOfflineChanged();
            });
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.IsRunningPropertyName, true);
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.IsStartingPropertyName, false);
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.IsStartProfilingPromptVisiblePropertyName, true);
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.IsStoppingPropertyName, false);
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.IsTakingSnapshotPropertyName, false);
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.IsTargetCompatiblePropertyName, true);
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.WarningMessagePropertyName, "");
            Common.ObservableHelpers.defineProperty(SummaryViewModel, SummaryViewModel.LatestSnapshotErrorPropertyName, null);
        };

        SummaryViewModel.prototype.getGraphUpdates = function (updateCallback) {
            this.graphCollectorSession.getGraphDataUpdate("Heap").done(function (data) {
                if (!data || data.length === 0) {
                    return;
                }

                var newPoints = [];
                var hubJsonTimestamp = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromNumber(data[0].timestamp);
                newPoints.push({
                    TimestampH: hubJsonTimestamp.jsonValue.h,
                    TimestampL: hubJsonTimestamp.jsonValue.l,
                    Value: data[0].value,
                    ToolTip: null,
                    CustomData: null
                });

                var updatedSeries = [{ DataSource: { CounterId: SummaryView.PrivateBytesCounterId }, NewPoints: newPoints }];
                var updateEventArgs = {
                    TimestampH: hubJsonTimestamp.jsonValue.h,
                    TimestampL: hubJsonTimestamp.jsonValue.l,
                    UpdatedSeries: updatedSeries
                };
                updateCallback(updateEventArgs);
            }, function (err) {
                MemoryAnalyzer.Program.reportError(err, Plugin.Resources.getErrorString("JSPerf.1062"));
            });

            this.graphCollectorSession.getGraphDataUpdate("performancemark").done(function (data) {
                if (!data || data.length === 0) {
                    return;
                }

                var newPoints = [];
                var maxTimestamp = data[0].timestamp;
                for (var i = 0; i < data.length; i++) {
                    maxTimestamp = Math.max(maxTimestamp, data[i].timestamp);
                    var hubJsonTimestamp = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromNumber(data[i].timestamp);
                    newPoints.push({
                        TimestampH: hubJsonTimestamp.jsonValue.h,
                        TimestampL: hubJsonTimestamp.jsonValue.l,
                        Value: data[i].value,
                        ToolTip: data[i].toolTip,
                        CustomData: null
                    });
                }

                var hubJsonMaxTimestamp = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromNumber(maxTimestamp);
                var updatedSeries = [{ DataSource: { CounterId: SummaryView.ProfilerMarkCounterId }, NewPoints: newPoints }];
                var updateEventArgs = {
                    TimestampH: hubJsonMaxTimestamp.jsonValue.h,
                    TimestampL: hubJsonMaxTimestamp.jsonValue.l,
                    UpdatedSeries: updatedSeries
                };
                updateCallback(updateEventArgs);
            }, function (err) {
                MemoryAnalyzer.Program.reportError(err, Plugin.Resources.getErrorString("JSPerf.1063"));
            });
        };

        SummaryViewModel.prototype.onIsOfflineChanged = function () {
            if (this.isOffline) {
                this.isTakingSnapshot = false;
            }
        };

        SummaryViewModel.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case SummaryViewModel.IsAttachedPropertyName:
                case SummaryViewModel.IsOfflinePropertyName:
                case SummaryViewModel.IsRunningPropertyName:
                case SummaryViewModel.IsStartingPropertyName:
                case SummaryViewModel.IsTargetCompatiblePropertyName:
                    this.propertyChanged.invoke(SummaryViewModel.StartProfilingEnabledPropertyName);
                    break;
            }

            switch (propertyName) {
                case SummaryViewModel.IsAttachedPropertyName:
                case SummaryViewModel.IsOfflinePropertyName:
                case SummaryViewModel.IsRunningPropertyName:
                case SummaryViewModel.IsStoppingPropertyName:
                    this.propertyChanged.invoke(SummaryViewModel.StopProfilingEnabledPropertyName);
                    break;
            }

            switch (propertyName) {
                case Common.ObservableCollection.LengthProperty:
                    this.propertyChanged.invoke(SummaryViewModel.SaveSessionEnabledPropertyName);
                    break;
            }

            switch (propertyName) {
                case SummaryViewModel.IsAttachedPropertyName:
                case SummaryViewModel.IsOfflinePropertyName:
                case SummaryViewModel.IsRunningPropertyName:
                case SummaryViewModel.IsTakingSnapshotPropertyName:
                case SummaryViewModel.IsTargetCompatiblePropertyName:
                    this.propertyChanged.invoke(SummaryViewModel.TakeSnapshotEnabledPropertyName);
                    break;
            }
        };
        SummaryViewModel.IsAttachedPropertyName = "isAttached";
        SummaryViewModel.IsOfflinePropertyName = "isOffline";
        SummaryViewModel.IsRunningPropertyName = "isRunning";
        SummaryViewModel.IsStartingPropertyName = "isStarting";
        SummaryViewModel.IsStartProfilingPromptVisiblePropertyName = "isStartProfilingPromptVisible";
        SummaryViewModel.IsStoppingPropertyName = "isStopping";
        SummaryViewModel.IsTakingSnapshotPropertyName = "isTakingSnapshot";
        SummaryViewModel.IsTargetCompatiblePropertyName = "isTargetCompatible";
        SummaryViewModel.LatestSnapshotErrorPropertyName = "latestSnapshotError";
        SummaryViewModel.OpenSessionEnabledPropertyName = "isOpenSessionEnabled";
        SummaryViewModel.SaveSessionEnabledPropertyName = "isSaveSessionEnabled";
        SummaryViewModel.StartProfilingEnabledPropertyName = "isStartEnabled";
        SummaryViewModel.StopProfilingEnabledPropertyName = "isStopEnabled";
        SummaryViewModel.TakeSnapshotEnabledPropertyName = "isTakeSnapshotEnabled";
        SummaryViewModel.WarningMessagePropertyName = "warningMessage";
        return SummaryViewModel;
    })(Common.Observable);
    MemoryAnalyzer.SummaryViewModel = SummaryViewModel;

    SummaryViewModel.initialize();

    var SummaryView = (function (_super) {
        __extends(SummaryView, _super);
        function SummaryView(controller, model) {
            var _this = this;
            _super.call(this, "SummaryTabTemplate");
            this._graphUpdateDelayMilliseconds = 100;
            this._screenshotWidth = 280;
            this._screenshotHeight = 160;
            this._screenshotKeepAspectRatio = true;

            this._controller = controller;
            this._model = model;

            this._model.propertyChanged.addHandler(this.onPropertyChanged.bind(this));
            this._model.snapshotSummaryCollection.collectionChanged.addHandler(this.onCollectionChanged.bind(this));

            this._heapGraphContainer = this.findElement("heapOverviewGraph");
            this._tilesContainer = this.findElement("tilesContainer");
            this._warningSection = this.findElement("warningSection");
            this._onSnapshotClickHandler = this.onSnapshotClick.bind(this);

            var giveFeedbackButton = this.findElement("giveFeedbackButton_Summary");
            giveFeedbackButton.classList.add("hidden");
            MemoryAnalyzer.Program.internalFeedback.isEnabled().done(function (isEnabled) {
                if (isEnabled) {
                    giveFeedbackButton.classList.remove("hidden");
                    giveFeedbackButton.addEventListener("click", _this.onGiveFeedbackClick.bind(_this));
                }
            });

            this._takeSnapshotTile = this.findElement("takeSnapshotTile");

            this._snapshotError = this.findElement("snapshotError");
            this._snapshotErrorMsg = this.findElement("snapshotErrorMsg");
            this._snapshotProgress = this.findElement("takeSnapshotProgress");
            this._snapshotTile = this.findElement("takeSnapshotButton");
            this._snapshotLabel = this.findElement("takeSnapshotLabel");
            this._snapshotIcon = this.findElement("takeSnapshotIcon");

            var snapshotLabel = Plugin.Resources.getString("TakeSnapshot");
            if (MemoryAnalyzer.Program.hostType === 1 /* F12 */) {
                snapshotLabel += "<br>" + Plugin.Resources.getString("TakeSnapshotShortcut");
            }

            this._snapshotLabel.innerHTML = snapshotLabel;
            this._snapshotProgress.innerText = Plugin.Resources.getString("Loading");

            this.toggleProgress(this._model.isTakingSnapshot);
            this.toggleAttached(this._model.isAttached);
            this.updateTakeSnapshotTile();
            this._snapshotTile.addEventListener("click", this._onSnapshotClickHandler);

            if (this._model.isOffline) {
                this._takeSnapshotTile.style.display = "none";
            } else {
                this.updateNavigationTarget(this._snapshotTile);
            }

            this._controller.setScreenshotSize(this._screenshotWidth, this._screenshotHeight, this._screenshotKeepAspectRatio);
        }
        SummaryView.prototype.refreshGraph = function () {
            if (this._graphRenderer) {
                this._graphRenderer.refresh();
            }
        };

        SummaryView.prototype.removeExistingGraph = function () {
            if (this._graphRenderer) {
                this._graphRenderer.deinitialize();
                this._graphRenderer = null;
            }

            this._heapGraphContainer.innerHTML = "";
            this._heapGraphContainer.style.display = "none";
        };

        SummaryView.prototype.startGraph = function () {
            var _this = this;
            var qpcStartTime = Plugin.F12.getQpcTime();
            var qpcFrequency = Plugin.F12.getQpcFrequency();

            this.removeExistingGraph();

            var jsonConfig = {
                Series: [{ SeriesType: "Line", Legend: Plugin.Resources.getString("HubGraphHeapLegend"), DataSource: { CounterId: SummaryView.PrivateBytesCounterId } }],
                MinValue: 0,
                MaxValue: 100,
                Unit: "",
                Units: [
                    { Unit: Plugin.Resources.getString("ByteUnits"), FromValue: Number.MIN_VALUE, ToValue: 1023, Divider: 1, Decimals: 1 },
                    { Unit: Plugin.Resources.getString("KilobyteUnits"), FromValue: Number.MIN_VALUE, ToValue: 1048575, Divider: 1024, Decimals: 1 },
                    { Unit: Plugin.Resources.getString("MegabyteUnits"), FromValue: Number.MIN_VALUE, ToValue: 1073741823, Divider: 1048576, Decimals: 1 },
                    { Unit: Plugin.Resources.getString("GigabyteUnits"), FromValue: Number.MIN_VALUE, ToValue: Number.MAX_VALUE, Divider: 1073741824, Decimals: 1 }],
                Axes: null
            };

            var markJsonConfig = {
                View: "Ruler",
                Series: [{ SeriesType: "Mark", MarkType: 2, Legend: "", DataSource: { CounterId: SummaryView.ProfilerMarkCounterId } }],
                MinValue: undefined,
                MaxValue: undefined,
                Unit: undefined,
                Units: undefined,
                Axes: undefined
            };

            var liveGraphConfig = {
                Title: Plugin.Resources.getString("GraphTitle"),
                Description: Plugin.Resources.getString("GraphTitle") + ", " + Plugin.Resources.getString("HubGraphHeapLegend"),
                JsonConfiguration: JSON.stringify(jsonConfig)
            };

            var markConfig = {
                JsonConfiguration: JSON.stringify(markJsonConfig)
            };

            var hubJsonCollectionStartTimestamp = Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromNumber(qpcStartTime);
            var liveConfig = {
                GraphConfigurations: [liveGraphConfig, markConfig],
                WindowsZoomLevel: { X: 1, Y: 1 },
                QpcTimeProperties: {
                    CollectionStartTimeH: hubJsonCollectionStartTimestamp.jsonValue.h,
                    CollectionStartTimeL: hubJsonCollectionStartTimestamp.jsonValue.l,
                    Frequency: qpcFrequency
                }
            };

            var dataManager = {
                getConfigurations: function (configCallback) {
                    configCallback(liveConfig);
                },
                dataUpdate: function (dataUpdateCallback) {
                    _this._graphUpdateIntervalId = window.setInterval(function () {
                        return _this._model.getGraphUpdates(dataUpdateCallback);
                    }, _this._graphUpdateDelayMilliseconds);
                }
            };

            var rendererArgs = {
                swimlane: {
                    leftScale: {
                        isVisible: true,
                        width: 40
                    },
                    rightScale: {
                        isVisible: true,
                        width: 40
                    },
                    graph: {
                        height: 88
                    },
                    minSelectionWidthInPixels: 10,
                    isSelectionEnabled: false,
                    isZoomEnabled: false
                },
                isToolbarRequired: false,
                dataManager: dataManager,
                containerId: this._heapGraphContainer.id
            };

            this._graphRenderer = new Microsoft.VisualStudio.DiagnosticsHub.LiveRenderer(rendererArgs);
            this._graphRenderer.execute();

            this._heapGraphContainer.style.display = "-ms-grid";
        };

        SummaryView.prototype.stopGraph = function () {
            window.clearInterval(this._graphUpdateIntervalId);
        };

        SummaryView.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case SummaryViewModel.WarningMessagePropertyName:
                    this.showWarningMessage(this._model.warningMessage);
                    break;

                case SummaryViewModel.LatestSnapshotErrorPropertyName:
                    this.showSnapshotError(this._model.latestSnapshotError);
                    break;

                case SummaryViewModel.IsTakingSnapshotPropertyName:
                    this.toggleProgress(this._model.isTakingSnapshot);
                    this.updateTakeSnapshotTile();
                    break;

                case SummaryViewModel.IsAttachedPropertyName:
                case SummaryViewModel.IsTargetCompatiblePropertyName:
                    this.toggleAttached(this._model.isAttached);
                    this.updateTakeSnapshotTile();
                    break;

                case SummaryViewModel.IsRunningPropertyName:
                    this.toggleRunning(this._model.isOffline, this._model.isAttached, this._model.isRunning);
                    this.updateTakeSnapshotTile();
                    break;

                case SummaryViewModel.IsOfflinePropertyName:
                    this.toggleOffline(this._model.isOffline, this._model.isAttached, this._model.isRunning);
                    this.updateTakeSnapshotTile();
                    break;
            }
        };

        SummaryView.prototype.onCollectionChanged = function (eventArgs) {
            switch (eventArgs.action) {
                case 0 /* Add */:
                    this.createTile(eventArgs.newItems[0]);
                    break;
                case 3 /* Clear */:
                    this.removeSnapshotTiles();
                    break;
            }
        };

        SummaryView.prototype.onGiveFeedbackClick = function (e) {
            this._controller.giveFeedback();
        };

        SummaryView.prototype.createTile = function (snapshotSummary) {
            var newTile = this._controller.createTileView(snapshotSummary);

            this._tilesContainer.insertBefore(newTile.rootElement, this._takeSnapshotTile);

            newTile.rootElement.scrollIntoView(true);
            newTile.setFocus();

            this.updateNavigationTarget(newTile.navigationElement);
        };

        SummaryView.prototype.removeSnapshotTiles = function () {
            while (this._tilesContainer.hasChildNodes()) {
                this._tilesContainer.removeChild(this._tilesContainer.firstChild);
            }

            this._tilesContainer.appendChild(this._takeSnapshotTile);

            this.updateNavigationTarget(this._snapshotTile);
        };

        SummaryView.prototype.toggleAttached = function (isAttached) {
            if (!isAttached) {
                this._controller.cancelPendingSnapshots();
            }
        };

        SummaryView.prototype.toggleOffline = function (isOffline, isAttached, isRunning) {
            this._takeSnapshotTile.style.display = isOffline ? "none" : "block";
        };

        SummaryView.prototype.toggleProgress = function (show) {
            if (this._snapshotProgress && this._snapshotError) {
                if (show) {
                    this._snapshotLabel.style.display = "none";
                    this._snapshotIcon.style.display = "none";
                    this._snapshotProgress.style.display = "block";
                    this._snapshotError.style.display = "none";
                    this._snapshotTile.setAttribute("aria-label", Plugin.Resources.getString("Loading"));
                } else {
                    this._snapshotLabel.style.display = "";
                    this._snapshotIcon.style.display = "";
                    this._snapshotProgress.style.display = "none";
                    this._snapshotTile.setAttribute("aria-label", Plugin.Resources.getString("TakeSnapshot"));
                }
            }
        };

        SummaryView.prototype.toggleRunning = function (isOffline, isAttached, isRunning) {
            if (!isOffline && isAttached && isRunning) {
                this._controller.startGraphCollectorSession();
            } else {
                this._controller.stopGraphCollectorSession();
            }
        };

        SummaryView.prototype.showSnapshotError = function (error) {
            if (this._snapshotErrorMsg && this._snapshotError) {
                if (error) {
                    this._snapshotErrorMsg.innerText = MemoryAnalyzer.ErrorFormatter.format(error);
                    this._snapshotError.style.display = "block";
                } else {
                    this._snapshotErrorMsg.innerText = "";
                    this._snapshotError.style.display = "none";
                }
            }
        };

        SummaryView.prototype.showWarningMessage = function (warning) {
            if (!this._warningSection) {
                return;
            }

            if (warning) {
                this._warningSection.innerHTML = warning;
                this._warningSection.style.display = "inline";
            } else {
                this._warningSection.innerHTML = "";
                this._warningSection.style.display = "none";
            }
        };

        SummaryView.prototype.onSnapshotClick = function (e) {
            this._controller.takeSnapshot();
        };

        SummaryView.prototype.updateTakeSnapshotTile = function () {
            if (this._snapshotTile) {
                if (this._model.isTakeSnapshotEnabled) {
                    this._snapshotTile.classList.remove("disabled");
                    this._snapshotTile.disabled = false;
                } else {
                    if (!this._model.isTakingSnapshot) {
                        this._snapshotTile.classList.add("disabled");
                    }

                    this._snapshotTile.disabled = true;
                }
            }
        };

        SummaryView.prototype.updateNavigationTarget = function (target) {
            var _this = this;
            MemoryAnalyzer.NavigationHelpers.updateAdditionalNavigationFrames(this._controller.navigationId, [
                Common.NavigationUtilities.makeNavigationFrameFromCallback(this._tilesContainer, function () {
                    if (target === _this._snapshotTile && _this._snapshotProgress.style.display !== "none") {
                        return null;
                    }

                    return target;
                })
            ]);
        };
        SummaryView.PrivateBytesCounterId = "PrivateBytes";
        SummaryView.ProfilerMarkCounterId = "performancemark";
        return SummaryView;
    })(Common.Controls.Legacy.TemplateControl);
    MemoryAnalyzer.SummaryView = SummaryView;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/js/summaryView.js.map

// CodeMarkerValues.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (CodeMarkerValues) {
        CodeMarkerValues[CodeMarkerValues["perfBrowserTools_MemoryAnalyzerViewLoaded"] = 23589] = "perfBrowserTools_MemoryAnalyzerViewLoaded";
        CodeMarkerValues[CodeMarkerValues["perfBrowserTools_MemoryAnalyzerIdle"] = 23590] = "perfBrowserTools_MemoryAnalyzerIdle";
        CodeMarkerValues[CodeMarkerValues["perfBrowserTools_MemoryAnalyzerWindowClose"] = 23591] = "perfBrowserTools_MemoryAnalyzerWindowClose";
        CodeMarkerValues[CodeMarkerValues["perfBrowserTools_MemoryAnalyzerSessionEnd"] = 23592] = "perfBrowserTools_MemoryAnalyzerSessionEnd";
    })(MemoryAnalyzer.CodeMarkerValues || (MemoryAnalyzer.CodeMarkerValues = {}));
    var CodeMarkerValues = MemoryAnalyzer.CodeMarkerValues;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/CodeMarkerValues.js.map

// memoryNotifications.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var MemoryNotifications = (function () {
        function MemoryNotifications() {
        }
        MemoryNotifications.DetailsViewRowSelected = "MemoryNotifications.DetailsViewRowSelected";
        MemoryNotifications.Idle = "MemoryNotifications.Idle";
        MemoryNotifications.OnSnapshotProcessingCompleted = "MemoryNotifications.OnSnapshotProcessingCompleted";
        MemoryNotifications.SessionEnd = "MemoryNotifications.SessionEnd";
        MemoryNotifications.SessionLoadCompleted = "MemoryNotifications.SessionLoadCompleted";
        MemoryNotifications.SessionSaveCompleted = "MemoryNotifications.SessionSaveCompleted";
        MemoryNotifications.SnapshotDataViewReady = "MemoryNotifications.SnapshotDataViewReady";
        MemoryNotifications.WindowClose = "MemoryNotifications.WindowClose";
        return MemoryNotifications;
    })();
    MemoryAnalyzer.MemoryNotifications = MemoryNotifications;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/memoryNotifications.js.map

// diagnosticsToolWindow.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var DiagnosticsToolWindowController = (function () {
        function DiagnosticsToolWindowController(isOffline, diagSession) {
            var _this = this;
            this._callbacks = {};
            this._pendingMessages = [];
            this._pendingTimeout = null;
            this._listeningToMessages = true;

            this._diagnosticSession = diagSession;

            if (!isOffline) {
                this.DiagnosticSession.addEventListener("break", this.onBreakCallback.bind(this));
                this.DiagnosticSession.addEventListener("run", this.onRunCallback.bind(this));
                this.DiagnosticSession.addEventListener("detach", this.onDetachCallback.bind(this));
                this.DiagnosticSession.addEventListener("connect", this.onConnectCallback.bind(this));
                this.DiagnosticSession.addEventListener("attach", this.onAttachCallback.bind(this));

                window.setImmediate(function () {
                    if (!_this._isAttached) {
                        _this.DiagnosticSession.isAttached().done(function (isAttached) {
                            if (isAttached) {
                                _this.onAttachCallback();
                            } else {
                                _this.showWarning(Plugin.Resources.getString("WarningNotAttached"));
                            }
                        }, function (err) {
                            _this.showWarning(Plugin.Resources.getString("WarningNotAttached"));
                        });
                    }
                });
            }
        }
        Object.defineProperty(DiagnosticsToolWindowController.prototype, "DiagnosticSession", {
            get: function () {
                return this._diagnosticSession;
            },
            enumerable: true,
            configurable: true
        });

        DiagnosticsToolWindowController.prototype.onAttach = function () {
        };
        DiagnosticsToolWindowController.prototype.onDetach = function () {
        };
        DiagnosticsToolWindowController.prototype.onBreak = function () {
        };
        DiagnosticsToolWindowController.prototype.onRun = function () {
        };
        DiagnosticsToolWindowController.prototype.onConnect = function (port) {
        };
        DiagnosticsToolWindowController.prototype.onMessage = function (data) {
        };
        DiagnosticsToolWindowController.prototype.onHandshake = function (connectionInfo) {
        };

        DiagnosticsToolWindowController.prototype.showWarning = function (message) {
        };

        DiagnosticsToolWindowController.prototype.callProxy = function (command) {
            var _this = this;
            var uidString = DiagnosticsToolWindowController.getUid();

            if (command.executedHandler) {
                this._callbacks[uidString] = { command: command, callback: command.executedHandler, deleteAfterCallback: true };
            }

            var newArgs = [];
            if (command.args) {
                for (var i = 0; i < command.args.length; i++) {
                    var arg = command.args[i];
                    newArgs.push(arg);
                }
            }

            if (command.dataReceivedHandler) {
                var callbackUid = DiagnosticsToolWindowController.getUid();
                this._callbacks[callbackUid] = { command: command, callback: command.dataReceivedHandler, deleteAfterCallback: false };
                newArgs.push({
                    uid: callbackUid,
                    type: "callback"
                });
            }

            var jsonObj = {
                uid: uidString,
                command: command.name,
                args: newArgs
            };

            var sendMessageToRemote = function (message) {
                if (_this._remotePort) {
                    _this._remotePort.postMessage(message);
                }
            };

            this._pendingMessages.push(jsonObj);
            if (!this._pendingTimeout) {
                this._pendingTimeout = window.setImmediate(function () {
                    var message = JSON.stringify(_this._pendingMessages);
                    _this._pendingMessages = [];
                    _this._pendingTimeout = null;
                    sendMessageToRemote(message);
                });
            }
        };

        DiagnosticsToolWindowController.prototype.startListeningToMessages = function () {
            this._listeningToMessages = true;
        };

        DiagnosticsToolWindowController.prototype.stopListeningToMessages = function () {
            this._listeningToMessages = false;
        };

        DiagnosticsToolWindowController.getUid = function () {
            return "uid" + (DiagnosticsToolWindowController._uid++).toString(36);
        };

        DiagnosticsToolWindowController.prototype.fireCallbacks = function (data) {
            var msgs = JSON.parse(data);
            for (var i = 0; i < msgs.length; i++) {
                var obj = msgs[i];
                var callback = this._callbacks[obj.uid];
                if (callback) {
                    if (obj.args !== undefined) {
                        callback.callback.apply(this, obj.args);
                    }

                    if (callback.deleteAfterCallback || callback.command.hasCompleted) {
                        delete this._callbacks[obj.uid];
                    }
                } else if (obj.uid === "scriptError") {
                    Plugin.Diagnostics.reportError(obj.args[0].message, obj.args[0].file, obj.args[0].line, obj.args[0].additionalInfo);
                }
            }
        };

        DiagnosticsToolWindowController.prototype.onAttachCallback = function () {
            if (!this._isAttached) {
                this._isAttached = true;
                this.showWarning(null);
                this.onAttach();
            }
        };

        DiagnosticsToolWindowController.prototype.onDetachCallback = function () {
            this._remotePort = null;
            this._callbacks = {};
            this._pendingMessages = [];
            this._pendingTimeout = null;
            this._isAttached = false;

            this.showWarning(Plugin.Resources.getString("WarningNotAttached"));

            this.onDetach();
        };

        DiagnosticsToolWindowController.prototype.onBreakCallback = function () {
            this.onBreak();
        };

        DiagnosticsToolWindowController.prototype.onRunCallback = function () {
            this.onRun();
        };

        DiagnosticsToolWindowController.prototype.onMessageCallback = function (args) {
            var _this = this;
            var data = args.data;
            var isHandshake = this.processHandshakeMessage(data);

            if (this._listeningToMessages) {
                if (data === "DocumentNotYetReady") {
                    window.setTimeout(function () {
                        _this._remotePort.postMessage("InitializeDocument");
                    }, 100);
                } else if (!isHandshake) {
                    this.fireCallbacks(data);
                }

                this.onMessage(data);
            }
        };

        DiagnosticsToolWindowController.prototype.onConnectCallback = function (port) {
            this._remotePort = port;
            this._remotePort.addEventListener("message", this.onMessageCallback.bind(this));

            this.onConnect(port);
        };

        DiagnosticsToolWindowController.prototype.processHandshakeMessage = function (data) {
            if (data.substr(0, 10) === "Handshake:") {
                var connectionInfo = JSON.parse(data.substring(10));
                this.onHandshake(connectionInfo);
                return true;
            }

            return false;
        };
        DiagnosticsToolWindowController._uid = 0;
        return DiagnosticsToolWindowController;
    })();
    MemoryAnalyzer.DiagnosticsToolWindowController = DiagnosticsToolWindowController;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/diagnosticsToolWindow.js.map

// memoryAnalyzer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

    var MemoryAnalyzerController = (function (_super) {
        __extends(MemoryAnalyzerController, _super);
        function MemoryAnalyzerController(sessionInfo, diagSession) {
            _super.call(this, sessionInfo.isOffline, diagSession);

            this.setSession(sessionInfo);
        }
        Object.defineProperty(MemoryAnalyzerController.prototype, "summaryViewController", {
            get: function () {
                return this._summaryViewController;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(MemoryAnalyzerController.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });

        MemoryAnalyzerController.prototype.clearSummaryTab = function () {
            this._summaryViewController.reset();
        };

        MemoryAnalyzerController.prototype.goOffline = function () {
            if (!this._summaryViewController.model.isOffline) {
                this.stopListeningToMessages();
                this._summaryViewController.stopGraphCollectorSession();
            }
        };

        MemoryAnalyzerController.prototype.goOnline = function () {
            if (this._summaryViewController.model.isOffline) {
                this.startListeningToMessages();
                this._summaryViewController.startGraphCollectorSession();
            }
        };

        MemoryAnalyzerController.prototype.removeExistingGraph = function () {
            this._summaryViewController.removeExistingGraph();
        };

        MemoryAnalyzerController.prototype.setSession = function (sessionInfo) {
            var isOffline = sessionInfo.isOffline;
            var isInitialSession = !!this._summaryViewController;

            var isAttached;
            var isRunning;
            var isTakingSnapshot;
            var isTargetCompatible;

            if (isInitialSession) {
                isAttached = this._summaryViewController.model.isAttached;
                isRunning = this._summaryViewController.model.isRunning;
                isTakingSnapshot = this._summaryViewController.model.isTakingSnapshot;
                isTargetCompatible = this._summaryViewController.model.isTargetCompatible;
            }

            this._summaryViewController = new MemoryAnalyzer.SummaryViewController(this, sessionInfo.storageId, isOffline);
            if (isOffline) {
                this._view = new MemoryAnalyzer.SummaryTab(this.summaryViewController);
                this.summaryViewController.loadExistingSnapshots();
            } else {
                this._view = new MemoryAnalyzerView(this);
                this.initCommands();
                var hubSession = DiagnosticsHub.getCurrentSession();
                if (hubSession) {
                    hubSession.addStateChangedEventListener(this.onDiagnosticsHubStateChanged.bind(this, hubSession));
                }
            }

            if (isInitialSession) {
                this._summaryViewController.model.isAttached = isAttached;
                this._summaryViewController.model.isRunning = isRunning;
                this._summaryViewController.model.isTakingSnapshot = isTakingSnapshot;
                this._summaryViewController.model.isTargetCompatible = isTargetCompatible;
            }
        };

        MemoryAnalyzerController.prototype.takeSnapshot = function () {
            this._summaryViewController.takeSnapshot();
        };

        MemoryAnalyzerController.prototype.showWarning = function (message) {
            if (this._summaryViewController) {
                this._summaryViewController.model.warningMessage = message;
            }
        };

        MemoryAnalyzerController.prototype.onAttach = function () {
            this.DiagnosticSession.loadScriptInProc("../Common/PerfRemoteHelpers.js");
            this.DiagnosticSession.loadScriptInProc("Remote.js");
        };

        MemoryAnalyzerController.prototype.onDetach = function () {
            this._summaryViewController.model.isAttached = false;
            this.goOffline();
        };

        MemoryAnalyzerController.prototype.onBreak = function () {
            this._summaryViewController.model.isRunning = false;
        };

        MemoryAnalyzerController.prototype.onRun = function () {
            this._summaryViewController.model.isRunning = true;
        };

        MemoryAnalyzerController.prototype.onHandshake = function (connectionInfo) {
            this._summaryViewController.model.isAttached = true;

            if (connectionInfo.docMode < Common.Constants.MINIMUM_REQUIRED_DOCUMENT_MODE) {
                if (!this._summaryViewController.model.isOffline) {
                    this.showWarning(MemoryAnalyzer.Program.shell.getHostSpecificString("WarningIncompatibleStandardsMode"));
                }

                this._summaryViewController.model.isTargetCompatible = false;
            } else {
                MemoryAnalyzer.Program.traceWriter.raiseEvent(211 /* Memory_ToolReady_Start */);
                if (!this._summaryViewController.model.isOffline) {
                    this.showWarning(null);
                }

                this._summaryViewController.model.isTargetCompatible = true;
                this._summaryViewController.model.isTakingSnapshot = false;

                if (!this._summaryViewController.model.isOffline) {
                    MemoryAnalyzer.Program.shell.closeAllSnapshots();
                    this._summaryViewController.reset();
                } else if (this._summaryViewController.model.snapshotSummaryCollection.length === 0) {
                    this._summaryViewController.reset();
                    MemoryAnalyzer.Program.shell.closeAllSnapshots();
                    MemoryAnalyzer.Program.shell.resetView();
                }

                var command = new MemoryAnalyzer.RegisterConsoleCallbacksCommand(this.consoleNotifyCallback);
                this.callProxy(command);

                MemoryAnalyzer.Program.traceWriter.raiseEvent(212 /* Memory_ToolReady_Stop */);
            }
        };

        MemoryAnalyzerController.prototype.showSnapshotTab = function (relativePath, targetView, tabName, sortProperty) {
            if (!relativePath) {
                return Plugin.Promise.as(null);
            }

            return MemoryAnalyzer.Program.shell.openSnapshot(relativePath, targetView, tabName, sortProperty);
        };

        MemoryAnalyzerController.prototype.showDiffSnapshotTab = function (snapshotNames, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty) {
            if (!snapshotNames || snapshotNames.length < 2) {
                return Plugin.Promise.as(null);
            }

            return MemoryAnalyzer.Program.shell.openSnapshotDiff(snapshotNames, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty);
        };

        MemoryAnalyzerController.prototype.updateCommandState = function () {
            if (Plugin.VS && Plugin.VS.Commands) {
                Plugin.VS.Commands.setStates({
                    command: this._takeSnapshotCommand,
                    enabled: this.canTakeSnapshot(),
                    visible: this.canShowTakeSnapshot()
                });
            }
        };

        MemoryAnalyzerController.prototype.consoleNotifyCallback = function (args) {
            if (!this.summaryViewController.model.isTargetCompatible) {
                return;
            }

            var functionId = args.notifyType;
            var data = args.message;

            if (functionId === "takeHeapSnapshot") {
                this.takeSnapshot();
            }
        };

        MemoryAnalyzerController.prototype.canTakeSnapshot = function () {
            var summaryModel = this._summaryViewController.model;
            return summaryModel.isAttached && summaryModel.isRunning && !summaryModel.isTakingSnapshot && !summaryModel.isOffline;
        };

        MemoryAnalyzerController.prototype.canShowTakeSnapshot = function () {
            var summaryModel = this._summaryViewController.model;
            return summaryModel.isAttached && summaryModel.isRunning && !summaryModel.isOffline;
        };

        MemoryAnalyzerController.prototype.initCommands = function () {
            if (Plugin.VS && Plugin.VS.Commands) {
                this._takeSnapshotCommand = Plugin.VS.Commands.bindCommand({
                    name: "takesnapshotcommand",
                    onexecute: this.onTakeSnapshotCommand.bind(this),
                    enabled: this.canTakeSnapshot(),
                    visible: this.canShowTakeSnapshot()
                });
            }
        };

        MemoryAnalyzerController.prototype.onDiagnosticsHubStateChanged = function (hubSession, args) {
            if (args.previousState === 300 /* CollectionStarted */ && args.currentState === 400 /* CollectionFinishing */) {
                hubSession.removeStateChangedEventListener(this.onDiagnosticsHubStateChanged.bind(this, hubSession));

                var eventCompleteDeferral = args.getDeferral();

                var onSaveCompleted = function () {
                    Notifications.notify(MemoryAnalyzer.MemoryNotifications.SessionEnd);
                    MemoryAnalyzer.Program.fireCodeMarker(23592 /* perfBrowserTools_MemoryAnalyzerSessionEnd */);
                    eventCompleteDeferral.complete();
                };

                this._summaryViewController.save().done(onSaveCompleted, onSaveCompleted);
            }
        };

        MemoryAnalyzerController.prototype.onTakeSnapshotCommand = function () {
            this.takeSnapshot();
        };
        return MemoryAnalyzerController;
    })(MemoryAnalyzer.DiagnosticsToolWindowController);
    MemoryAnalyzer.MemoryAnalyzerController = MemoryAnalyzerController;

    var MemoryAnalyzerView = (function (_super) {
        __extends(MemoryAnalyzerView, _super);
        function MemoryAnalyzerView(controller) {
            _super.call(this);
            this._controller = controller;

            this.title = Plugin.Resources.getString("Summary").toLocaleUpperCase();
            this.tooltipString = Plugin.Resources.getString("SummaryTabTooltip");
            this.content = new MemoryAnalyzer.SummaryTab(this._controller.summaryViewController);

            this._controller.summaryViewController.model.propertyChanged.addHandler(this.onPropertyChanged.bind(this));
        }
        MemoryAnalyzerView.prototype.onActiveChanged = function () {
            if (this.active) {
                var summaryView = this._controller.summaryViewController.view;
                if (summaryView) {
                    summaryView.refreshGraph();
                }

                MemoryAnalyzer.NavigationHelpers.switchNavigationView(this._controller.summaryViewController.navigationId);
            }
        };

        MemoryAnalyzerView.prototype.onPropertyChanged = function (propertyName) {
            var model = this._controller.summaryViewController.model;

            switch (propertyName) {
                case MemoryAnalyzer.SummaryViewModel.IsTakingSnapshotPropertyName:
                case MemoryAnalyzer.SummaryViewModel.IsAttachedPropertyName:
                case MemoryAnalyzer.SummaryViewModel.IsRunningPropertyName:
                case MemoryAnalyzer.SummaryViewModel.IsOfflinePropertyName:
                    this._controller.updateCommandState();
                    break;
            }
        };
        return MemoryAnalyzerView;
    })(MemoryAnalyzer.Controls.TabItem);
    MemoryAnalyzer.MemoryAnalyzerView = MemoryAnalyzerView;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/memoryAnalyzer.js.map

// memoryAnalyzerData.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    (function (Data) {
        "use strict";

        (function (ScopeFilter) {
            ScopeFilter[ScopeFilter["ObjectsLeftFromPreviousSnapshot"] = 0] = "ObjectsLeftFromPreviousSnapshot";
            ScopeFilter[ScopeFilter["ObjectsAddedBetweenSnapshots"] = 1] = "ObjectsAddedBetweenSnapshots";
            ScopeFilter[ScopeFilter["AllObjects"] = 2] = "AllObjects";
        })(Data.ScopeFilter || (Data.ScopeFilter = {}));
        var ScopeFilter = Data.ScopeFilter;

        var MemoryAnalyzerData = (function () {
            function MemoryAnalyzerData(memoryAnalyzerProxy) {
                this._proxy = memoryAnalyzerProxy;
                if (!this._proxy) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1065"));
                }
            }
            MemoryAnalyzerData.GetErrorFromHr = function (hr) {
                if (hr < 0) {
                    hr = 0xFFFFFFFF + hr + 1;
                }

                switch (hr) {
                    case 0x8007000E:
                    case 0x89790008:
                        return new Error(Plugin.Resources.getString("ERRoutOfMemory"));

                    case 0x89790001:
                        return new Error(Plugin.Resources.getString("ERRbadHexDigit"));
                    case 0x89790002:
                        return new Error(Plugin.Resources.getString("ERRbadNumber"));
                    case 0x89790003:
                        return new Error(Plugin.Resources.getString("ERRillegalChar"));
                    case 0x89790005:
                        return new Error(Plugin.Resources.getString("ERRnoColon"));
                    case 0x89790006:
                        return new Error(Plugin.Resources.getString("ERRnoRbrack"));
                    case 0x89790007:
                        return new Error(Plugin.Resources.getString("ERRnoRcurly"));
                    case 0x89790009:
                        return new Error(Plugin.Resources.getString("ERRnoStrEnd"));
                    case 0x8979000a:
                        return new Error(Plugin.Resources.getString("ERRsyntax"));
                    case 0x8979000c:
                        return new Error(Plugin.Resources.getString("ERRmissingObjectId"));
                    case 0x8979000d:
                        return new Error(Plugin.Resources.getString("ERRinvalidObjectID"));
                }

                return new Error(Plugin.Resources.getString("ERRunknownError", "0x" + hr.toString(16).toUpperCase()));
            };

            MemoryAnalyzerData.prototype.processSnapshotSummary = function (snapshotFile, prevSnapshotFile) {
                var _this = this;
                if (typeof prevSnapshotFile === "undefined") { prevSnapshotFile = ""; }
                return new Plugin.Promise(function (completed, error) {
                    _this._proxy.processSnapshotSummary(snapshotFile, prevSnapshotFile, function (localSnapshotSummary) {
                        completed(localSnapshotSummary);
                    }, function (hr) {
                        if (error) {
                            error(MemoryAnalyzerData.GetErrorFromHr(hr));
                        }
                    }, function () {
                    });
                });
            };

            MemoryAnalyzerData.prototype.processSnapshot = function (snapshotFile) {
                var _this = this;
                return new Plugin.Promise(function (completed, error, progress) {
                    _this._proxy.processSnapshot(snapshotFile, function (proxy) {
                        completed(new SnapshotData(proxy));
                    }, function (hr) {
                        if (error) {
                            error(MemoryAnalyzerData.GetErrorFromHr(hr));
                        }
                    }, function (progValue) {
                        if (progress) {
                            progress(progValue);
                        }
                    });
                });
            };

            MemoryAnalyzerData.prototype.processSnapshotDiff = function (snapshotFiles) {
                var _this = this;
                return new Plugin.Promise(function (completed, error, progress) {
                    _this._proxy.processSnapshotDiff(snapshotFiles, function (proxy) {
                        completed(new SnapshotData(proxy));
                    }, function (hr) {
                        if (error) {
                            error(MemoryAnalyzerData.GetErrorFromHr(hr));
                        }
                    }, function (progValue) {
                        if (progress) {
                            progress(progValue);
                        }
                    });
                });
            };
            return MemoryAnalyzerData;
        })();
        Data.MemoryAnalyzerData = MemoryAnalyzerData;

        var SnapshotData = (function () {
            function SnapshotData(proxy) {
                this._heapObjectCache = {};
                this._proxy = proxy;
                if (!this._proxy) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1066"));
                }
            }
            SnapshotData.prototype.getChildrenForObject = function (objectId, startIndex, maxResult, scopeFilter, isScopeRelated, filter) {
                if (typeof startIndex === "undefined") { startIndex = 0; }
                if (typeof maxResult === "undefined") { maxResult = -1; }
                if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
                filter = this.getFilter(filter);
                var dataSet = this._proxy.getChildrenForObject(objectId, startIndex, maxResult, scopeFilter, isScopeRelated, filter);
                this.performObjectCaching(dataSet);
                return dataSet;
            };

            SnapshotData.prototype.getDominators = function (startIndex, maxResult, textFilter, scopeFilter, filter) {
                var _this = this;
                if (typeof startIndex === "undefined") { startIndex = 0; }
                if (typeof maxResult === "undefined") { maxResult = -1; }
                if (typeof textFilter === "undefined") { textFilter = ""; }
                if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
                var requestId;
                return new Plugin.Promise(function (completed, error) {
                    requestId = _this._proxy.getDominators(startIndex, maxResult, textFilter, scopeFilter, filter, function (dataSetArg) {
                        _this.performObjectCaching(dataSetArg);
                        completed(dataSetArg);
                    }, function (hr) {
                        if (error) {
                            error(MemoryAnalyzerData.GetErrorFromHr(hr));
                        }
                    });
                }, function () {
                    if (typeof requestId !== "undefined") {
                        _this._proxy.cancelRequest(requestId);
                    }
                });
            };

            SnapshotData.prototype.getObjectsByType = function (type, startIndex, maxResult, scopeFilter, filter) {
                if (typeof startIndex === "undefined") { startIndex = 0; }
                if (typeof maxResult === "undefined") { maxResult = -1; }
                if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
                filter = this.getFilter(filter);
                var dataSet = this._proxy.getObjectsByType(type, startIndex, maxResult, scopeFilter, filter);
                this.performObjectCaching(dataSet);
                return dataSet;
            };

            SnapshotData.prototype.getPathToDominator = function (objectId, scopeFilter, filter) {
                if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
                filter = this.getFilter(filter);
                return this._proxy.getPathToDominator(objectId, scopeFilter, filter);
            };

            SnapshotData.prototype.getPathToRoot = function (objectId, parentObjectId, filter) {
                if (typeof parentObjectId === "undefined") { parentObjectId = 0; }
                filter = this.getFilter(filter);
                return this._proxy.getPathToRoot(objectId, parentObjectId, filter);
            };

            SnapshotData.prototype.getRootObjects = function (scopeFilter, filter) {
                filter = this.getFilter(filter);
                var dataSet = this._proxy.getRootObjects(scopeFilter, filter);
                this.performObjectCaching(dataSet);
                return dataSet;
            };

            SnapshotData.prototype.getTypes = function (textFilter, scopeFilter, filter) {
                var _this = this;
                if (typeof textFilter === "undefined") { textFilter = ""; }
                if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
                filter = this.getFilter(filter);
                var requestId;
                return new Plugin.Promise(function (completed, error) {
                    requestId = _this._proxy.getTypes(textFilter, scopeFilter, filter, function (typesArg) {
                        completed(typesArg);
                    }, function (hr) {
                        if (error) {
                            error(MemoryAnalyzerData.GetErrorFromHr(hr));
                        }
                    });
                }, function () {
                    if (typeof requestId !== "undefined") {
                        _this._proxy.cancelRequest(requestId);
                    }
                });
            };

            SnapshotData.prototype.getRetainedDescendants = function (objectId, startIndex, maxResult, scopeFilter, filter) {
                if (typeof startIndex === "undefined") { startIndex = 0; }
                if (typeof maxResult === "undefined") { maxResult = -1; }
                if (typeof scopeFilter === "undefined") { scopeFilter = 2 /* AllObjects */; }
                filter = this.getFilter(filter);
                var dataSet = this._proxy.getRetainedDescendants(objectId, startIndex, maxResult, scopeFilter, filter);
                this.performObjectCaching(dataSet);
                return dataSet;
            };

            SnapshotData.prototype.getReferenceTreeItems = function (rootObjectId, objectId, nodeId, includeCircularReferences) {
                var dataSet = this._proxy.getReferenceTreeItems(rootObjectId, objectId, nodeId || 0, includeCircularReferences);
                this.performObjectCaching(dataSet);
                return dataSet;
            };

            SnapshotData.prototype.hasDetachedDomNodes = function () {
                return this._proxy.hasDetachedDomNodes();
            };

            SnapshotData.prototype.getSnapshotDiffStats = function () {
                return this._proxy.getSnapshotDiffStats();
            };

            SnapshotData.prototype.getFilter = function (filter) {
                var newFilter = {};
                filter = filter || {};
                newFilter.foldObjectsByDominator = filter.foldObjectsByDominator || false;
                newFilter.showNonMatchingReferences = filter.showNonMatchingReferences || false;
                newFilter.showBuiltIns = filter.showBuiltIns || false;
                newFilter.showUnknownSizes = filter.showUnknownSizes || false;
                newFilter.showUnknownTypes = filter.showUnknownTypes || false;
                return newFilter;
            };

            SnapshotData.prototype.performObjectCaching = function (dataSet) {
                var nodes = dataSet.result;
                if (nodes && nodes.length > 0) {
                    for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        if (typeof node.object !== "undefined") {
                            var obj = node.object;
                            this._heapObjectCache[obj.objectId] = obj;
                        } else if (typeof node.objectId !== "undefined") {
                            node.object = this._heapObjectCache[node.objectId];
                        }
                    }
                }
            };
            return SnapshotData;
        })();
        Data.SnapshotData = SnapshotData;
    })(MemoryAnalyzer.Data || (MemoryAnalyzer.Data = {}));
    var Data = MemoryAnalyzer.Data;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/memoryAnalyzerData.js.map

// memoryAnalyzerShell.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var MemoryAnalyzerShell = (function () {
        function MemoryAnalyzerShell(session) {
            this.session = session;
        }
        MemoryAnalyzerShell.prototype.createSnapshot = function () {
            var _this = this;
            return new Plugin.Promise(function (completed, failed) {
                _this.session.getSessionInfo().then(function (sessionInfo) {
                    var relativePath = _this.session.getNewSnapshotRelativePath();
                    var filePath = sessionInfo.storageId + "\\" + relativePath;

                    return Plugin.Storage.openFile(filePath, {
                        access: 2 /* write */,
                        encoding: "UTF-8",
                        mode: 6 /* append */,
                        persistence: 1 /* temporary */,
                        type: 1 /* text */
                    }).then(function (file) {
                        completed({ file: file, relativePath: relativePath });
                    }, function (error) {
                        if (failed) {
                            failed(error);
                        }
                    });
                }, function (error) {
                    if (failed) {
                        failed(error);
                    }
                });
            });
        };

        MemoryAnalyzerShell.prototype.save = function (addToProject) {
            return this.session.save(addToProject);
        };
        return MemoryAnalyzerShell;
    })();
    MemoryAnalyzer.MemoryAnalyzerShell = MemoryAnalyzerShell;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/memoryAnalyzerShell.js.map

// memoryAnalyzerShell.vs.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var VsMemoryAnalyzerShell = (function (_super) {
        __extends(VsMemoryAnalyzerShell, _super);
        function VsMemoryAnalyzerShell(session, sessionInfo) {
            _super.call(this, session);

            this.session.addViewTypeEventListener(this.onViewTypeChange.bind(this));
            this._sessionInfo = sessionInfo;
            this._hostShell = new Common.Extensions.HostShellProxy();
        }
        Object.defineProperty(VsMemoryAnalyzerShell.prototype, "hostShell", {
            get: function () {
                return this._hostShell;
            },
            enumerable: true,
            configurable: true
        });

        VsMemoryAnalyzerShell.prototype.changeSession = function (newSession) {
        };

        VsMemoryAnalyzerShell.prototype.closeAllSnapshots = function () {
            return Plugin.Promise.as(null);
        };

        VsMemoryAnalyzerShell.prototype.getHostSpecificString = function (resourceId) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            return Plugin.Resources.getString(resourceId + "VS", args);
        };

        VsMemoryAnalyzerShell.prototype.getSnapshotFullPath = function (storageId, relativePath) {
            return "%temp%\\ScriptedHost\\" + storageId + "\\" + relativePath;
        };

        VsMemoryAnalyzerShell.prototype.initializeView = function () {
            switch (this._sessionInfo.sessionType) {
                case 0 /* session */:
                    var diagSession = new MemoryAnalyzer.Diagnostics.HubDiagnosticSession();
                    this._view = new VsMemoryAnalyzerShellSessionView(this._sessionInfo, diagSession);
                    break;

                case 1 /* snapshot */:
                    this._view = new VsMemoryAnalyzerShellSnapshotView(this._sessionInfo);
                    break;

                case 2 /* snapshotDiff */:
                    this._view = new VsMemoryAnalyzerShellSnapshotDiffView(this._sessionInfo);
                    break;

                default:
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1000"));
            }
        };

        VsMemoryAnalyzerShell.prototype.isGraphCollectionSupported = function () {
            return false;
        };

        VsMemoryAnalyzerShell.prototype.openSnapshot = function (relativePath, targetView, tabName, sortProperty) {
            return this.session.openSnapshotDetails(relativePath, targetView, tabName, sortProperty);
        };

        VsMemoryAnalyzerShell.prototype.openSnapshotDiff = function (relativePaths, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty) {
            return this.session.openSnapshotDiff(relativePaths, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty);
        };

        VsMemoryAnalyzerShell.prototype.resetView = function () {
        };

        VsMemoryAnalyzerShell.prototype.startGraphCollection = function () {
            MemoryAnalyzer.Program.reportError(new Error("not implemented"), "startGraphCollection is not implemented");
            return null;
        };

        VsMemoryAnalyzerShell.prototype.onViewTypeChange = function (args) {
            this._view.changeViewType(args.viewType, args.sortProperty);
        };
        return VsMemoryAnalyzerShell;
    })(MemoryAnalyzer.MemoryAnalyzerShell);
    MemoryAnalyzer.VsMemoryAnalyzerShell = VsMemoryAnalyzerShell;

    var VsMemoryAnalyzerShellSessionView = (function (_super) {
        __extends(VsMemoryAnalyzerShellSessionView, _super);
        function VsMemoryAnalyzerShellSessionView(sessionInfo, diagSession) {
            _super.call(this, document.getElementById("mainContainer"));

            this._controller = new MemoryAnalyzer.MemoryAnalyzerController(sessionInfo, diagSession);
            this.appendChild(this._controller.view);

            Plugin.addEventListener("close", this.onClose.bind(this));
        }
        VsMemoryAnalyzerShellSessionView.prototype.changeViewType = function (viewType) {
        };

        VsMemoryAnalyzerShellSessionView.prototype.onClose = function () {
            this._controller.goOffline();
        };
        return VsMemoryAnalyzerShellSessionView;
    })(Common.Controls.Legacy.Control);
    MemoryAnalyzer.VsMemoryAnalyzerShellSessionView = VsMemoryAnalyzerShellSessionView;

    var VsMemoryAnalyzerShellSnapshotView = (function (_super) {
        __extends(VsMemoryAnalyzerShellSnapshotView, _super);
        function VsMemoryAnalyzerShellSnapshotView(sessionInfo) {
            _super.call(this, document.getElementById("mainContainer"));

            var controller = new MemoryAnalyzer.SnapshotViewController(sessionInfo.storageId);
            controller.loadSnapshot(sessionInfo.storageId, sessionInfo.filePaths, sessionInfo.targetView, sessionInfo.sortProperty);

            this._controller = controller;
            this._snapshotTab = new MemoryAnalyzer.SnapshotTab(controller);
            this.appendChild(this._snapshotTab);
        }
        VsMemoryAnalyzerShellSnapshotView.prototype.changeViewType = function (viewType, sortProperty) {
            this._controller.setTargetView(viewType, sortProperty);
        };
        return VsMemoryAnalyzerShellSnapshotView;
    })(Common.Controls.Legacy.Control);
    MemoryAnalyzer.VsMemoryAnalyzerShellSnapshotView = VsMemoryAnalyzerShellSnapshotView;

    var VsMemoryAnalyzerShellSnapshotDiffView = (function (_super) {
        __extends(VsMemoryAnalyzerShellSnapshotDiffView, _super);
        function VsMemoryAnalyzerShellSnapshotDiffView(sessionInfo) {
            _super.call(this, document.getElementById("mainContainer"));

            var diffController = new MemoryAnalyzer.SnapshotDiffController(sessionInfo.storageId, sessionInfo.firstSnapshotId, sessionInfo.lastSnapshotId);
            diffController.diffSnapshots(sessionInfo.storageId, sessionInfo.filePaths, sessionInfo.targetView, sessionInfo.sortProperty);

            this._diffController = diffController;
            this._snapshotTab = new MemoryAnalyzer.SnapshotTab(diffController);
            this.appendChild(this._snapshotTab);
        }
        VsMemoryAnalyzerShellSnapshotDiffView.prototype.changeViewType = function (viewType, sortType) {
            this._diffController.setTargetView(viewType, sortType);
        };
        return VsMemoryAnalyzerShellSnapshotDiffView;
    })(Common.Controls.Legacy.Control);
    MemoryAnalyzer.VsMemoryAnalyzerShellSnapshotDiffView = VsMemoryAnalyzerShellSnapshotDiffView;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/memoryAnalyzerShell.vs.js.map

// memoryAnalyzerShell.f12.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var MemoryAnalyzerToolbarControl = (function (_super) {
        __extends(MemoryAnalyzerToolbarControl, _super);
        function MemoryAnalyzerToolbarControl(shellView) {
            _super.call(this);
            this.title = Plugin.Resources.getString("F12ToolTitle");
            this.panelTemplateId = "MemoryAnalyzer.toolbarButtonsPanel";
            this._shellView = shellView;

            this.addClickHandlerToButton("openSessionButton", this.onOpenSessionToolbarButtonClick.bind(this));
            this.addClickHandlerToButton("saveSessionButton", this.onSaveSessionToolbarButtonClick.bind(this));
            this.addClickHandlerToButton("startToolbarButton", this.onStartToolbarButtonClick.bind(this));
            this.addClickHandlerToButton("stopToolbarButton", this.onStopToolbarButtonClick.bind(this));
            this.addClickHandlerToButton("takeSnapshotToolbarButton", this.onTakeSnapshotToolbarButtonClick.bind(this));
        }
        MemoryAnalyzerToolbarControl.prototype.onOpenSessionToolbarButtonClick = function () {
            if (this._shellView) {
                this._shellView.openSession();
            }
        };

        MemoryAnalyzerToolbarControl.prototype.onSaveSessionToolbarButtonClick = function () {
            if (this._shellView) {
                this._shellView.saveSession();
            }
        };

        MemoryAnalyzerToolbarControl.prototype.onStartToolbarButtonClick = function () {
            if (this._shellView) {
                this._shellView.startProfiling();
            }
        };

        MemoryAnalyzerToolbarControl.prototype.onStopToolbarButtonClick = function () {
            if (this._shellView) {
                this._shellView.stopProfiling();
            }
        };

        MemoryAnalyzerToolbarControl.prototype.onTakeSnapshotToolbarButtonClick = function () {
            if (this._shellView) {
                this._shellView.takeSnapshot();
            }
        };
        return MemoryAnalyzerToolbarControl;
    })(Common.Controls.ToolbarControl);
    MemoryAnalyzer.MemoryAnalyzerToolbarControl = MemoryAnalyzerToolbarControl;

    var F12MemoryAnalyzerShell = (function (_super) {
        __extends(F12MemoryAnalyzerShell, _super);
        function F12MemoryAnalyzerShell(externalObj, session, sessionInfo) {
            var _this = this;
            _super.call(this, session);

            this._openedDocs = {};

            var diagSession = new MemoryAnalyzer.Diagnostics.F12DiagnosticsSession(externalObj);
            var controller = new MemoryAnalyzer.MemoryAnalyzerController(sessionInfo, diagSession);
            this._controller = controller;

            var external = window.external;

            external.addEventListener("closing", function () {
                _this.closeAllSnapshots();

                MemoryAnalyzer.Program.etwDataCollector.stopCollection();
            });

            this._hostShell = new Common.Extensions.LocalHostShell();
        }
        Object.defineProperty(F12MemoryAnalyzerShell.prototype, "hostShell", {
            get: function () {
                return this._hostShell;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(F12MemoryAnalyzerShell.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });

        F12MemoryAnalyzerShell.load = function () {
            Plugin.Storage.openFileDialog({
                name: "",
                extensions: ["diagsession"]
            }, {
                access: 1 /* read */,
                encoding: "BINARY",
                persistence: 1 /* temporary */,
                type: 0 /* binary */
            }).then(function (stream) {
                return F12MemoryAnalyzerShell.loadFromStream(stream);
            }).done(function (resourcePath) {
                var newSession = new MemoryAnalyzer.Extensions.LocalSession(resourcePath, true);
                MemoryAnalyzer.Program.changeSession(newSession);
            }, function (error) {
                if (error.number !== undefined && error.number === Common.Constants.E_ABORT) {
                    return;
                }

                Plugin.F12.ErrorDisplay.show(Plugin.Resources.getString("OpenSessionFailedMessage"));
            });
        };

        F12MemoryAnalyzerShell.loadFromStream = function (stream) {
            return new Plugin.Promise(function (completed, error) {
                try  {
                    MemoryAnalyzer.Program.packager.openPackage(stream.streamId);
                    var resourcePath = MemoryAnalyzer.Program.packager.getResourcePathsByType(Common.Constants.MEMORY_ANALYZER_SNAPSHOT_RESOURCE_TYPE);
                    if (resourcePath.length < 1 || resourcePath[0] === "") {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1075"));
                    }

                    var pathParts = resourcePath[0].split("\\");

                    var storageId = pathParts[pathParts.length - 2] + "\\" + pathParts[pathParts.length - 1];

                    if (completed) {
                        completed(storageId);
                    }
                } catch (e) {
                    if (error) {
                        error(e);
                    }
                } finally {
                    MemoryAnalyzer.Program.packager.closePackage();
                }
            });
        };

        F12MemoryAnalyzerShell.save = function () {
            Plugin.Storage.saveFileDialog({
                name: "",
                extensions: ["diagsession"]
            }, {
                access: 3 /* readWrite */,
                encoding: "BINARY",
                persistence: 1 /* temporary */,
                type: 0 /* binary */
            }).done(function (stream) {
                MemoryAnalyzer.Program.saveSession().done(function (tempPath) {
                    Plugin.F12.copyFileToStream(tempPath, stream.streamId);
                    stream.close();

                    Plugin.F12.deleteFile(tempPath);
                    Notifications.notify(MemoryAnalyzer.MemoryNotifications.SessionSaveCompleted);
                });
            }, function (error) {
                if (error.number !== undefined && error.number === Common.Constants.E_ABORT) {
                    return;
                }

                Plugin.F12.ErrorDisplay.show(Plugin.Resources.getString("SaveSessionFailedMessage"));
            });
        };

        F12MemoryAnalyzerShell.prototype.changeSession = function (newSession) {
            var _this = this;
            this.closeAllSnapshots();

            this.session = newSession;
            this.session.getSessionInfo().done(function (sessionInfo) {
                _this._controller.setSession(sessionInfo);

                var model = _this._controller.summaryViewController.model;

                _this._controller.summaryViewController.removeExistingGraph();

                if (_this._view) {
                    _this._view.closeView();
                    _this._view = null;
                }

                _this.initializeView();

                if (model.snapshotSummaryCollection) {
                    model.isStartProfilingPromptVisible = model.snapshotSummaryCollection.length === 0;
                }
            });
        };

        F12MemoryAnalyzerShell.prototype.closeAllSnapshots = function () {
            for (var tabName in this._openedDocs) {
                if (this._openedDocs.hasOwnProperty(tabName)) {
                    this._view.removeDoc(this._openedDocs[tabName]);
                }
            }

            this._openedDocs = {};
            var filesPaths = [];
            var summaries = this._controller.summaryViewController.model.snapshotSummaryCollection;

            for (var i = 0; i < summaries.length; ++i) {
                var summary = summaries.getItem(i);
                var snapshotFile = summary.snapshotFile;
                var filePath = this.getSnapshotFullPath(snapshotFile.storageId, snapshotFile.relativePath);

                filesPaths.push(filePath);
                filesPaths.push(filePath + MemoryAnalyzer.SnapshotSummary.fileExtension);
            }

            this._controller.clearSummaryTab();

            while (filesPaths.length > 0) {
                var filesPath = filesPaths.pop();

                Plugin.F12.deleteFile(filesPath);
            }

            return Plugin.Promise.as(null);
        };

        F12MemoryAnalyzerShell.prototype.getHostSpecificString = function (resourceId) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            return Plugin.Resources.getString(resourceId + "F12", args);
        };

        F12MemoryAnalyzerShell.prototype.getSnapshotFullPath = function (storageId, relativePath) {
            return Common.Constants.MEMORY_ANALYZER_SNAPSHOT_ROOT_PATH + storageId + "\\" + relativePath;
        };

        F12MemoryAnalyzerShell.prototype.initializeView = function () {
            if (this._view) {
                F12.Tools.Utility.Assert.fail("Tried to initialize a view when one already exists!");
            }

            this._view = new F12MemoryAnalyzerShellView(this._controller);
        };

        F12MemoryAnalyzerShell.prototype.isGraphCollectionSupported = function () {
            return true;
        };

        F12MemoryAnalyzerShell.prototype.openSnapshot = function (relativePath, targetView, tabName, sortProperty) {
            var _this = this;
            tabName = tabName.toLocaleUpperCase();
            return this.session.openSnapshotDetails(relativePath, targetView, tabName, sortProperty).then(function (newSessionInfo) {
                var doc = _this._openedDocs[tabName];
                if (!doc) {
                    var controller = new MemoryAnalyzer.SnapshotViewController(newSessionInfo.storageId);
                    controller.loadSnapshot(newSessionInfo.storageId, newSessionInfo.filePaths, newSessionInfo.targetView, newSessionInfo.sortProperty);

                    doc = {
                        controller: controller,
                        sessionInfo: newSessionInfo,
                        title: tabName,
                        view: new MemoryAnalyzer.SnapshotTab(controller)
                    };

                    doc.view.title = tabName;

                    _this._openedDocs[tabName] = doc;
                }

                doc.controller.setTargetView(newSessionInfo.targetView, newSessionInfo.sortProperty);
                _this._view.addOrActivateDoc(doc);

                return Plugin.Promise.as(null);
            });
        };

        F12MemoryAnalyzerShell.prototype.openSnapshotDiff = function (relativePaths, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty) {
            var _this = this;
            tabName = tabName.toLocaleUpperCase();
            return this.session.openSnapshotDiff(relativePaths, targetView, tabName, firstSnapshotId, lastSnapshotId, sortProperty).then(function (newSessionInfo) {
                var doc = _this._openedDocs[tabName];
                if (!doc) {
                    var diffController = new MemoryAnalyzer.SnapshotDiffController(newSessionInfo.storageId, firstSnapshotId, lastSnapshotId);
                    diffController.diffSnapshots(newSessionInfo.storageId, newSessionInfo.filePaths, newSessionInfo.targetView, newSessionInfo.sortProperty);

                    doc = {
                        controller: diffController,
                        sessionInfo: newSessionInfo,
                        title: tabName,
                        view: new MemoryAnalyzer.SnapshotTab(diffController)
                    };

                    doc.view.title = tabName;

                    _this._openedDocs[tabName] = doc;
                }

                doc.controller.setTargetView(newSessionInfo.targetView, newSessionInfo.sortProperty);
                _this._view.addOrActivateDoc(doc);

                return Plugin.Promise.as(null);
            });
        };

        F12MemoryAnalyzerShell.prototype.resetView = function () {
            this._view.resetView();
        };

        F12MemoryAnalyzerShell.prototype.startGraphCollection = function () {
            return MemoryAnalyzer.Program.etwDataCollector.startSession("JavaScriptCollectionAgent.dll", "{37012E99-CDE8-4D9F-B228-CF98BC27B424}");
        };
        return F12MemoryAnalyzerShell;
    })(MemoryAnalyzer.MemoryAnalyzerShell);
    MemoryAnalyzer.F12MemoryAnalyzerShell = F12MemoryAnalyzerShell;

    var F12MemoryAnalyzerShellView = (function (_super) {
        __extends(F12MemoryAnalyzerShellView, _super);
        function F12MemoryAnalyzerShellView(memAnalyzerController) {
            _super.call(this, "f12ViewTemplate");

            this._controller = memAnalyzerController;
            this._isProfiling = false;

            this._startProfilingLink = this.findElement("startProfilingMessage");
            this._startProfilingLink.innerText = Plugin.Resources.getString("F12StartProfilingMessage");
            this._startProfilingLink.addEventListener("click", this.onStartClick.bind(this));
            this._startProfilingLink.addEventListener("keydown", this.onStartClick.bind(this));

            this._model = memAnalyzerController.summaryViewController.model;
            this._model.propertyChanged.addHandler(this.onPropertyChanged.bind(this));
            this._model.isOffline = true;
            this._model.isRunning = !Plugin.F12.Debugger.getIsAtBreakpoint();

            this._toolbarControl = new MemoryAnalyzerToolbarControl(this);
            this._toolbarControl.model = this._model;
            this.findElement("toolbarContainer").appendChild(this._toolbarControl.rootElement);

            MemoryAnalyzer.NavigationHelpers.setToolbar(this._toolbarControl);
            MemoryAnalyzer.NavigationHelpers.updateAdditionalNavigationFrames(this._controller.summaryViewController.navigationId);
            MemoryAnalyzer.NavigationHelpers.switchNavigationView(this._controller.summaryViewController.navigationId);

            try  {
                Common.NavigationUtilities.registerFocusHandlers(Plugin.F12.PluginId.Memory);
            } catch (e) {
            }

            this._tabControl = new MemoryAnalyzer.Controls.TabControl();
            this._tabControl.tabsLeftAligned = true;
            this._tabControl.addTab(this._controller.view);

            this._startProfilingPrompt = this.findElement("startProfilingPrompt");

            this.updateStartProfilingPrompt();

            this.findElement("tabContainer").appendChild(this._tabControl.rootElement);

            this._parentContainer = document.getElementById("mainContainer");
            this._keyDownHandler = this.onKeyDown.bind(this);

            Plugin.F12.addEventListener("keydown", this._keyDownHandler);
            Plugin.F12.addEventListener("browsershortcut", this._keyDownHandler);
            document.addEventListener("keydown", this._keyDownHandler);
            this._parentContainer.appendChild(this.rootElement);
        }
        Object.defineProperty(F12MemoryAnalyzerShellView.prototype, "summaryViewModel", {
            get: function () {
                return this._model;
            },
            enumerable: true,
            configurable: true
        });

        F12MemoryAnalyzerShellView.prototype.addOrActivateDoc = function (doc) {
            if (!this._tabControl.containsTab(doc.view)) {
                this._tabControl.addTab(doc.view);
            }

            this._tabControl.selectedItem = doc.view;
        };

        F12MemoryAnalyzerShellView.prototype.closeView = function () {
            Plugin.F12.removeEventListener("keydown", this._keyDownHandler);
            Plugin.F12.removeEventListener("browsershortcut", this._keyDownHandler);
            document.removeEventListener("keydown", this._keyDownHandler);

            this._parentContainer.innerHTML = "";
        };

        F12MemoryAnalyzerShellView.prototype.removeDoc = function (doc) {
            this._tabControl.removeTab(doc.view);
        };

        F12MemoryAnalyzerShellView.prototype.resetView = function () {
            this._model.isStartProfilingPromptVisible = true;

            MemoryAnalyzer.NavigationHelpers.reset();
            MemoryAnalyzer.NavigationHelpers.updateAdditionalNavigationFrames(this._controller.summaryViewController.navigationId);
            MemoryAnalyzer.NavigationHelpers.switchNavigationView(this._controller.summaryViewController.navigationId);
        };

        F12MemoryAnalyzerShellView.prototype.startProfiling = function () {
            if (this._controller) {
                MemoryAnalyzer.Program.shell.closeAllSnapshots();

                F12.Tools.Utility.Assert.isTrue(this._model.isTargetCompatible);

                MemoryAnalyzer.Program.traceWriter.raiseEvent(211 /* Memory_ToolReady_Start */);
                Plugin.F12.Profiler.notifyOnStartProfiling();
                this._isProfiling = true;
                this._controller.goOnline();
                MemoryAnalyzer.Program.traceWriter.raiseEvent(212 /* Memory_ToolReady_Stop */);

                this._model.isStartProfilingPromptVisible = false;
                this.updateUIState();

                this._toolbarControl.getNamedControl("takeSnapshotToolbarButton").rootElement.focus();
            }
        };

        F12MemoryAnalyzerShellView.prototype.stopProfiling = function () {
            if (this._controller) {
                Plugin.F12.Profiler.notifyOnStopProfiling();
                this._isProfiling = false;
                this._controller.showWarning(null);
                this._controller.goOffline();

                if (this._model.snapshotSummaryCollection.length === 0) {
                    this.resetView();
                }

                this.updateUIState();
            }
        };

        F12MemoryAnalyzerShellView.prototype.openSession = function () {
            if (this._isProfiling) {
                this.stopProfiling();
            }

            F12MemoryAnalyzerShell.load();
        };

        F12MemoryAnalyzerShellView.prototype.saveSession = function () {
            F12MemoryAnalyzerShell.save();
        };

        F12MemoryAnalyzerShellView.prototype.takeSnapshot = function () {
            if (this._controller) {
                this._controller.takeSnapshot();
                this.updateUIState();
            }
        };

        F12MemoryAnalyzerShellView.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case MemoryAnalyzer.SummaryViewModel.StartProfilingEnabledPropertyName:
                case MemoryAnalyzer.SummaryViewModel.IsRunningPropertyName:
                    this.updateUIState();
                    break;
                case MemoryAnalyzer.SummaryViewModel.IsStartProfilingPromptVisiblePropertyName:
                    this.updateStartProfilingPrompt();
                    break;
                case MemoryAnalyzer.SummaryViewModel.IsTargetCompatiblePropertyName:
                    if (this._controller) {
                        if (this._model.isTargetCompatible) {
                            this._controller.showWarning(null);
                        } else {
                            this._controller.showWarning(MemoryAnalyzer.Program.shell.getHostSpecificString("WarningIncompatibleStandardsMode"));
                            this._model.isStartProfilingPromptVisible = false;
                        }
                    }

                    this.updateUIState();
                    break;
            }

            if (propertyName === MemoryAnalyzer.SummaryViewModel.IsOfflinePropertyName && this._model.isOffline && this._isProfiling) {
                Plugin.F12.Profiler.notifyOnStopProfiling();
                this._isProfiling = false;
            }
        };

        F12MemoryAnalyzerShellView.prototype.onStartClick = function (event) {
            if ((this._model.isOffline && Common.ButtonHelpers.isValidEvent(event)) || (event.keyCode === 32 /* Space */) || (event.keyCode === 13 /* Enter */)) {
                this.startProfiling();
            }
        };

        F12MemoryAnalyzerShellView.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case 69 /* E */:
                    if (event.ctrlKey && !event.altKey && !event.shiftKey) {
                        if (this._model.isOffline) {
                            if (this._model.isStartEnabled) {
                                this.startProfiling();
                            }
                        } else {
                            if (this._model.isStopEnabled) {
                                this.stopProfiling();
                            }
                        }
                    }

                    break;
                case 79 /* O */:
                    if (event.ctrlKey && !event.altKey && !event.shiftKey && this._model.isOpenSessionEnabled) {
                        this.openSession();
                    }

                    break;
                case 83 /* S */:
                    if (event.ctrlKey && !event.altKey && !event.shiftKey && this._model.isSaveSessionEnabled) {
                        this.saveSession();
                    }

                    break;
                case 84 /* T */:
                    if (event.ctrlKey && event.shiftKey && !event.altKey) {
                        this.takeSnapshot();
                    }

                    break;
                default:
                    break;
            }
        };

        F12MemoryAnalyzerShellView.prototype.updateStartProfilingPrompt = function () {
            this._startProfilingPrompt.style.display = this._model.isStartProfilingPromptVisible ? "" : "none";
            this._tabControl.rootElement.style.display = this._model.isStartProfilingPromptVisible ? "none" : "";

            if (this._model.isStartProfilingPromptVisible) {
                MemoryAnalyzer.NavigationHelpers.updateAdditionalNavigationFrames(this._controller.summaryViewController.navigationId);
            }
        };

        F12MemoryAnalyzerShellView.prototype.updateUIState = function () {
            this._startProfilingLink.style.display = this._model.isStartEnabled ? "" : "none";
            if (!this._model.isRunning) {
                Plugin.F12.ErrorDisplay.show(Plugin.Resources.getString("MemoryDisabledAtBreakpoint"));
            } else {
                Plugin.F12.ErrorDisplay.close();
            }
        };
        return F12MemoryAnalyzerShellView;
    })(Common.Controls.Legacy.TemplateControl);
    MemoryAnalyzer.F12MemoryAnalyzerShellView = F12MemoryAnalyzerShellView;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/memoryAnalyzerShell.f12.js.map

// Program.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (HostType) {
        HostType[HostType["VS"] = 0] = "VS";
        HostType[HostType["F12"] = 1] = "F12";
        HostType[HostType["Test"] = 2] = "Test";
    })(MemoryAnalyzer.HostType || (MemoryAnalyzer.HostType = {}));
    var HostType = MemoryAnalyzer.HostType;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/Program.js.map

// Program.main.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var ProgramMain = (function () {
        function ProgramMain() {
            this._traceWriter = new Common.DefaultTraceWriter();
        }
        Object.defineProperty(ProgramMain.prototype, "etwDataCollector", {
            get: function () {
                return this._etwDataCollector;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgramMain.prototype, "hostType", {
            get: function () {
                return this._hostType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgramMain.prototype, "internalFeedback", {
            get: function () {
                return this._internalFeedback;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgramMain.prototype, "memoryAnalyzerData", {
            get: function () {
                return this._memoryAnalyzerData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgramMain.prototype, "packager", {
            get: function () {
                return this._packager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgramMain.prototype, "shell", {
            get: function () {
                return this._shell;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgramMain.prototype, "traceWriter", {
            get: function () {
                return this._traceWriter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgramMain.prototype, "userSettings", {
            get: function () {
                return this._userSettings;
            },
            enumerable: true,
            configurable: true
        });

        ProgramMain.prototype.changeSession = function (newSession) {
            this._session = newSession;
            this._shell.changeSession(this._session);
            if (Plugin.F12) {
                Plugin.F12.TraceWriter.markToolReady();
            }

            this.onIdle();
        };

        ProgramMain.prototype.fireCodeMarker = function (codeMarker) {
            Plugin.VS.Internal.CodeMarkers.fire(codeMarker);
        };

        ProgramMain.prototype.main = function () {
            var _this = this;
            if (window.parent && window.parent.getExternalObj) {
                this._externalObj = window.parent.getExternalObj();
            } else if (window.external) {
                this._externalObj = window.external;
            }

            if (Plugin.F12) {
                this._hostType = 1 /* F12 */;
            } else {
                this._hostType = 0 /* VS */;
            }

            Plugin.addEventListener("pluginready", function () {
                var session;
                var diagSession;

                var memAnalyzerProxy;
                var perfTrace;

                Plugin.Tooltip.defaultTooltipContentToHTML = false;

                switch (_this.hostType) {
                    case 0 /* VS */:
                        session = new MemoryAnalyzer.Extensions.HostSessionProxy();
                        _this._internalFeedback = new MemoryAnalyzer.Extensions.InternalFeedbackProxy();
                        memAnalyzerProxy = Plugin.VS.Utilities.createExternalObject("MemoryAnalyzerExtension", "{81ACDD7F-96B1-46DC-8971-424AABD93C69}");
                        perfTrace = Plugin.VS.Utilities.createExternalObject("PerformanceTraceExtension", "{D76A409F-7234-4B71-9BFD-DEF3DC4CCCA6}");
                        break;
                    case 1 /* F12 */:
                        session = new MemoryAnalyzer.Extensions.LocalSession();
                        _this._internalFeedback = new MemoryAnalyzer.Extensions.NoOperationInternalFeedback();
                        _this._etwDataCollector = new Common.Data.F12EtwDataCollector(_this._externalObj.etwDataCollector);
                        try  {
                            _this._packager = new Common.Data.F12Packager(_this._externalObj.packager);
                        } catch (e) {
                            _this._packager = null;
                        }

                        memAnalyzerProxy = Plugin.F12.Utilities.createExternalObject("MemoryAnalyzerExtension", "{81ACDD7F-96B1-46DC-8971-424AABD93C69}");
                        perfTrace = Plugin.F12.TraceWriter;
                        break;
                    default:
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1027"));
                }

                if (perfTrace) {
                    _this._traceWriter = new Common.TraceWriter(perfTrace);
                }

                _this._memoryAnalyzerData = new MemoryAnalyzer.Data.MemoryAnalyzerData(memAnalyzerProxy);

                var userSettingsProxy = new MemoryAnalyzer.Extensions.UserSettingsProxy();
                userSettingsProxy.getUserSettings().then(function (userSettings) {
                    _this._userSettings = userSettings;
                    _this._session = session;

                    _this.initializeErrorReporting();

                    Plugin.addEventListener("close", _this.onClose);

                    session.getSessionInfo().done(function (sessionInfo) {
                        _this._shell = _this.getShell(session, sessionInfo);
                        _this._shell.initializeView();
                        if (Plugin.F12) {
                            Plugin.F12.TraceWriter.markToolReady();
                        }

                        _this.onIdle();
                    });
                });
            });
        };

        ProgramMain.prototype.initializeErrorReporting = function () {
            var _this = this;
            window.onerror = function (e, url, line) {
                var column;
                var additionalInfo;
                if (arguments && arguments[3] && typeof arguments[3] === "number") {
                    column = arguments[3];
                }

                if (arguments && arguments[4] && arguments[4] instanceof Error) {
                    additionalInfo = "Error number: " + arguments[4].number;
                    additionalInfo += "\r\nStack: " + arguments[4].stack;
                } else {
                    additionalInfo = "Unhandled Error";
                }

                _this.reportError(new Error(e), additionalInfo, url, line, column);
                return true;
            };
        };

        ProgramMain.prototype.onIdle = function () {
            Notifications.notify(MemoryAnalyzer.MemoryNotifications.Idle);
            Plugin.VS.Internal.CodeMarkers.fire(23590 /* perfBrowserTools_MemoryAnalyzerIdle */);
        };

        ProgramMain.prototype.reportError = function (error, additionalInfo, source, line, column) {
            var _this = this;
            if (!this.userSettings.disableWER) {
                var message = (error.message || error.description);
                var url = source || "MemoryAnalyzer";
                var lineNumber = line || 0;
                var columnNumber = column || 0;

                var errorInfo = "Error description:  " + message;

                if (error.number) {
                    errorInfo += "\r\nError number:  " + error.number;
                }

                if (source) {
                    errorInfo += "\r\nSource:  " + source;
                }

                if (error.stack) {
                    var stack = error.stack;
                    errorInfo += "\r\nError stack:  " + stack;

                    if (!message) {
                        var index = stack.indexOf("\n");
                        if (index > 0) {
                            index = Math.min(index, 50);
                            message = stack.substring(0, index);
                        }
                    }

                    if (typeof source === "undefined") {
                        var matchInfo = stack.match(/(file|res):?([^)]+)\)/);
                        if (matchInfo && matchInfo.length > 2) {
                            url = matchInfo[2];
                        }
                    }

                    if (typeof line === "undefined") {
                        matchInfo = stack.match(/line ?(\d+)/);
                        if (!matchInfo || matchInfo.length <= 1) {
                            matchInfo = stack.match(/js:?(\d+):/);
                        }

                        if (matchInfo && matchInfo.length > 1) {
                            lineNumber = parseInt(matchInfo[1]);
                        }
                    }
                }

                if (additionalInfo) {
                    errorInfo += "\r\nAdditional Info:  " + additionalInfo;
                }

                Plugin.Diagnostics.reportError(message, url, lineNumber, errorInfo, columnNumber);

                this.internalFeedback.isEnabled().done(function (enabled) {
                    if (enabled) {
                        _this._session.save(false).done(function (fileLocation) {
                            _this.internalFeedback.sendData(true, "", "", "", errorInfo, fileLocation);
                        });
                    }
                });
            }
        };

        ProgramMain.prototype.saveSession = function () {
            return this._session.save(false);
        };

        ProgramMain.prototype.getShell = function (session, sessionInfo) {
            switch (this.hostType) {
                case 0 /* VS */:
                    return new MemoryAnalyzer.VsMemoryAnalyzerShell(session, sessionInfo);
                case 1 /* F12 */:
                    return new MemoryAnalyzer.F12MemoryAnalyzerShell(this._externalObj, session, sessionInfo);
                default:
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1027"));
            }
        };

        ProgramMain.prototype.onClose = function () {
            Notifications.notify(MemoryAnalyzer.MemoryNotifications.WindowClose);
            Plugin.VS.Internal.CodeMarkers.fire(23591 /* perfBrowserTools_MemoryAnalyzerWindowClose */);
        };
        return ProgramMain;
    })();
    MemoryAnalyzer.ProgramMain = ProgramMain;

    MemoryAnalyzer.Program = new ProgramMain();
})(MemoryAnalyzer || (MemoryAnalyzer = {}));

MemoryAnalyzer.Program.main();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/Program.main.js.map

// RemoteCommands.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    var RegisterConsoleCallbacksCommand = (function () {
        function RegisterConsoleCallbacksCommand(callback) {
            this._dataReceivedHandler = callback;
        }
        Object.defineProperty(RegisterConsoleCallbacksCommand.prototype, "args", {
            get: function () {
                return [];
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(RegisterConsoleCallbacksCommand.prototype, "hasCompleted", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(RegisterConsoleCallbacksCommand.prototype, "name", {
            get: function () {
                return "registerConsoleCallbacks";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(RegisterConsoleCallbacksCommand.prototype, "dataReceivedHandler", {
            get: function () {
                return this._dataReceivedHandler;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(RegisterConsoleCallbacksCommand.prototype, "executedHandler", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return RegisterConsoleCallbacksCommand;
    })();
    MemoryAnalyzer.RegisterConsoleCallbacksCommand = RegisterConsoleCallbacksCommand;

    var MultipartResponseCommand = (function () {
        function MultipartResponseCommand(name, args) {
            this._name = name;
            this._args = args;
            this._hasCompleted = false;
            this._currentPartId = 0;
            this.actualPartCount = 0;
            this.expectedPartCount = -1;
            this._parts = {};
            this._processedPartCount = 0;
            this.executedHandler = this.onExecuted.bind(this);
            this.dataReceivedHandler = this.onDataReceived.bind(this);
        }
        Object.defineProperty(MultipartResponseCommand.prototype, "args", {
            get: function () {
                return this._args;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(MultipartResponseCommand.prototype, "hasCompleted", {
            get: function () {
                return this._hasCompleted;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(MultipartResponseCommand.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });

        MultipartResponseCommand.prototype.checkCompleted = function () {
            if (!this.hasCompleted && this.actualPartCount === this.expectedPartCount && this._processedPartCount === this.expectedPartCount) {
                this._hasCompleted = true;

                if (this.allPartsReceivedHandler) {
                    this.allPartsReceivedHandler(this._parts);
                }

                if (this.completedHandler) {
                    this.completedHandler(this);
                }
            }
        };

        MultipartResponseCommand.prototype.onDataReceived = function (part) {
            var _this = this;
            if (part.partId === -1) {
                if (this.errorHandler) {
                    var error;

                    if (part.data) {
                        error = new Error(part.data);
                    } else {
                        error = new Error(Plugin.Resources.getString("ERRoutOfMemory"));
                    }

                    this.errorHandler(error);
                }

                return;
            }

            ++this.actualPartCount;

            this._parts[part.partId] = part.data;

            if (this.partProcessingHandler) {
                while (typeof this._parts[this._currentPartId] !== "undefined") {
                    var currentPart = this._parts[this._currentPartId];

                    this.partProcessingHandler(currentPart).done(function () {
                        _this._processedPartCount++;
                        _this.checkCompleted();
                    }, function (err) {
                        if (_this.errorHandler) {
                            _this.errorHandler(err);
                        }
                    });

                    delete this._parts[this._currentPartId];
                    ++this._currentPartId;
                }
            } else {
                this._processedPartCount++;
            }

            this.checkCompleted();
        };

        MultipartResponseCommand.prototype.onExecuted = function (args) {
            if (typeof args !== "undefined") {
                this.expectedPartCount = args;
            } else {
                if (this.errorHandler) {
                    this.errorHandler(new Error(Plugin.Resources.getErrorString("JSPerf.1059")));
                }
            }
        };
        return MultipartResponseCommand;
    })();
    MemoryAnalyzer.MultipartResponseCommand = MultipartResponseCommand;

    var TakeSnapshotCommand = (function (_super) {
        __extends(TakeSnapshotCommand, _super);
        function TakeSnapshotCommand(args, file) {
            var _this = this;
            _super.call(this, "takeSnapshot", args);

            this._file = file;
            this.partProcessingHandler = function (data) {
                return _this._file.write(data);
            };
        }
        return TakeSnapshotCommand;
    })(MultipartResponseCommand);
    MemoryAnalyzer.TakeSnapshotCommand = TakeSnapshotCommand;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/memoryanalyzer.csproj_531102259/objr/x86/built/RemoteCommands.js.map


// SIG // Begin signature block
// SIG // MIIatwYJKoZIhvcNAQcCoIIaqDCCGqQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFHa5t3P16Nty
// SIG // PhIxK7Bkqcu4tHbSoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRDFTIuXTit
// SIG // /ODb/of8MQM05GkVCTBaBgorBgEEAYI3AgEMMUwwSqAw
// SIG // gC4ATQBlAG0AbwByAHkAQQBuAGEAbAB5AHoAZQByAE0A
// SIG // ZQByAGcAZQBkAC4AagBzoRaAFGh0dHA6Ly9taWNyb3Nv
// SIG // ZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAIlzJ8PeWOGQ
// SIG // ScEPUifx2krCdjTPtrrzjppO/dpOjzO3IGdODORuJ6xT
// SIG // 7J/vA0JP4EXizHyWPPreCTPGweocT8TVejutQ1K0YkMz
// SIG // W4r305uofE8n9u75IJFCowWZeatqXMMIY19y9EY8yUoq
// SIG // 3TS3+pyVN6d4V/cSaO0IEIYJwMWnp/y9U3dy5ktIZaKR
// SIG // 2irpGehtHm+mFlVVm2rnsKE020qgupUlZQtMmGxG7/sF
// SIG // fStHqPs89k5Ib4vyZWkV1pGxXodWJkeROwtJTBXRLukf
// SIG // vKh/LOsxFMfsnE5TSbH5etKyxUotbXagbNa7uyCFRAg+
// SIG // H/Tke/xeSc0a+gzDeqZfboWhggIoMIICJAYJKoZIhvcN
// SIG // AQkGMYICFTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBAhMzAAAATKHoTcy0dHs7AAAAAABMMAkGBSsO
// SIG // AwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcB
// SIG // MBwGCSqGSIb3DQEJBTEPFw0xNDExMDEwNzI2MDdaMCMG
// SIG // CSqGSIb3DQEJBDEWBBSiHtscvXShgeedElBBwHPaaMKl
// SIG // qTANBgkqhkiG9w0BAQUFAASCAQCmwZbnl4ueQTABUPyj
// SIG // IMP177w9zNP8nPxz/YJx9dOOBoI3FxgFBBzOgQ0biHZ3
// SIG // 3m3EV7SHatt9tX0LCTfTLWaZSNthzDhHlhftmdbjUaPw
// SIG // upQd2/v+Satf41/ExbOM1pg0M+fp/enFFnql35rAWOEZ
// SIG // LPo0ydr8zfVIAAip+6z9tTWh1u3/phHNyeR31LzKez22
// SIG // ZB38ZihhlxTJcimQlcw3cTBzvpcPkop2oHjmCN5VsXdJ
// SIG // aUgv82s8LW2AJYR3equaqncQnXbgipmHUvNR4zyDrV5y
// SIG // P1RrlxBj7QTmSLuE3eeNmB/olT35BcmAIPgDWv+HVqqy
// SIG // of11BPf1LBzXuVVs
// SIG // End signature block
