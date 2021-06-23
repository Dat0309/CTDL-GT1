//
// Copyright (C) Microsoft. All rights reserved.
//
// <!-- saved from url=(0016)http://localhost -->
// DataUtilities.ts
var VisualProfiler;
(function (VisualProfiler) {
    (function (Graphs) {
        "use strict";

        var DataUtilities = (function () {
            function DataUtilities() {
            }
            DataUtilities.getFilteredResult = function (dataWarehouse, analyzerId, counterId, timespan, customData) {
                var contextData = {
                    timeDomain: timespan,
                    customDomain: {
                        CounterId: counterId
                    }
                };

                if (customData) {
                    for (var key in customData) {
                        if (customData.hasOwnProperty(key)) {
                            contextData.customDomain[key] = customData[key];
                        }
                    }
                }

                return dataWarehouse.getFilteredData(contextData, analyzerId);
            };
            return DataUtilities;
        })();
        Graphs.DataUtilities = DataUtilities;
    })(VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
    var Graphs = VisualProfiler.Graphs;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/hubGraphs/DataUtilities.js.map

// GraphResources.ts
var VisualProfiler;
(function (VisualProfiler) {
    (function (Graphs) {
        "use strict";

        var GraphResources = (function () {
            function GraphResources(resources) {
                this._graphResources = resources;
            }
            GraphResources.prototype.getString = function (resourceId) {
                var args = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    args[_i] = arguments[_i + 1];
                }
                if (this._graphResources) {
                    var resourceString = this._graphResources[resourceId];
                    if (resourceString !== undefined) {
                        resourceString = GraphResources.format(resourceId, resourceString, args);
                        return resourceString;
                    }
                }

                try  {
                    return Plugin.Resources.getString.apply(Plugin.Resources, arguments);
                } catch (e) {
                }

                return resourceId;
            };

            GraphResources.format = function (resourceId, format, args) {
                return format.replace(GraphResources.FORMAT_REG_EXP, function (match, index) {
                    var replacer;
                    switch (match) {
                        case "{{":
                            replacer = "{";
                            break;

                        case "}}":
                            replacer = "}";
                            break;

                        case "{":
                        case "}":
                            throw new Error(Plugin.Resources.getErrorString("JSPlugin.3002"));

                        default:
                            var argsIndex = parseInt(index);
                            if (args && argsIndex < args.length) {
                                replacer = args[argsIndex];
                            } else {
                                throw new Error(Plugin.Resources.getErrorString("JSPlugin.3003") + " (resourceId = " + resourceId + ")");
                            }

                            break;
                    }

                    if (replacer === undefined || replacer === null) {
                        replacer = "";
                    }

                    if (typeof replacer !== "string") {
                        replacer = replacer.toString();
                    }

                    return replacer;
                });
            };
            GraphResources.FORMAT_REG_EXP = /\{{2}|\{(\d+)\}|\}{2}|\{|\}/g;
            return GraphResources;
        })();
        Graphs.GraphResources = GraphResources;
    })(VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
    var Graphs = VisualProfiler.Graphs;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/hubGraphs/GraphResources.js.map

// StackedBarChart.ts
var VisualProfiler;
(function (VisualProfiler) {
    (function (Graphs) {
        "use strict";

        var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

        var DataSeriesInfo = (function () {
            function DataSeriesInfo(name, cssClass, sortOrder) {
                if (!name || sortOrder === undefined || sortOrder === null) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1044"));
                }

                this._name = name;
                this._cssClass = cssClass;
                this._sortOrder = sortOrder;
            }
            Object.defineProperty(DataSeriesInfo.prototype, "cssClass", {
                get: function () {
                    return this._cssClass;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DataSeriesInfo.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DataSeriesInfo.prototype, "sortOrder", {
                get: function () {
                    return this._sortOrder;
                },
                enumerable: true,
                configurable: true
            });
            return DataSeriesInfo;
        })();
        Graphs.DataSeriesInfo = DataSeriesInfo;

        var StackedBarChartPresenter = (function () {
            function StackedBarChartPresenter(options) {
                this._data = [];
                this._dataSeriesInfo = {};
                this._maximumYValue = Number.NEGATIVE_INFINITY;
                this.viewModel = [];
                this._options = options;
                this.validateOptions();
                this._pixelHorizontalValue = this.xWidth / this._options.width;
            }
            Object.defineProperty(StackedBarChartPresenter.prototype, "maximumYValue", {
                get: function () {
                    return this._maximumYValue;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(StackedBarChartPresenter.prototype, "xWidth", {
                get: function () {
                    return this._options.maxX - this._options.minX;
                },
                enumerable: true,
                configurable: true
            });

            StackedBarChartPresenter.prototype.addData = function (chartData) {
                var _this = this;
                chartData.forEach(function (dataItem) {
                    if (_this._dataSeriesInfo.hasOwnProperty(dataItem.series)) {
                        _this._data.push(dataItem);
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1043"));
                    }
                });
                this.generateViewModel();
            };

            StackedBarChartPresenter.prototype.addSeries = function (seriesInfo) {
                for (var i = 0; i < seriesInfo.length; i++) {
                    var info = seriesInfo[i];
                    if (this._dataSeriesInfo.hasOwnProperty(info.name)) {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1045"));
                    }

                    this._dataSeriesInfo[info.name] = info;
                }
            };

            StackedBarChartPresenter.prototype.getViewOptions = function () {
                var viewOptions = {
                    ariaDescription: this._options.ariaDescription,
                    ariaLabelCallback: this._options.ariaLabelCallback,
                    height: this._options.height,
                    width: this._options.width,
                    tooltipCallback: this._options.tooltipCallback,
                    legendData: this._dataSeriesInfo
                };
                return viewOptions;
            };

            StackedBarChartPresenter.prototype.convertChartAreaPercentToDataValue = function (percent) {
                return Math.round(percent * this.xWidth / 100) + this._options.minX;
            };

            StackedBarChartPresenter.prototype.determineYAxisScale = function (allBars) {
                for (var i = 0; i < allBars.length; i++) {
                    var totalStackHeight = 0;
                    var currentBar = allBars[i];
                    for (var j = 0; j < currentBar.length; j++) {
                        var stackComponent = currentBar[j];
                        if (stackComponent.height > 0) {
                            totalStackHeight += stackComponent.height;
                        }
                    }

                    this._maximumYValue = Math.max(this._maximumYValue, totalStackHeight);
                }

                this._maximumYValue = Math.floor(Math.max(this._options.minYHeight, this._maximumYValue));

                var availableAxisHight = this._options.height - StackedBarChartPresenter.YAXIS_PIXEL_PADDING;
                if (availableAxisHight <= 0) {
                    availableAxisHight = this._options.height;
                }

                var proposedNewMax = Math.floor(this._maximumYValue / 100) * 100;
                var proposedPixelVerticalValue = proposedNewMax / availableAxisHight;
                proposedNewMax = this._options.height * proposedPixelVerticalValue;

                if (proposedNewMax < this._maximumYValue) {
                    proposedNewMax = Math.ceil(this._maximumYValue / 100) * 100;
                    proposedPixelVerticalValue = proposedNewMax / availableAxisHight;
                    proposedNewMax = this._options.height * proposedPixelVerticalValue;
                }

                this._pixelVerticalValue = proposedPixelVerticalValue;
                this._maximumYValue = proposedNewMax;
            };

            StackedBarChartPresenter.prototype.generateViewModel = function () {
                var allBars = [[]];
                var singleBar = [];

                var barWidthAndMargin = this._options.barWidth + this._options.barGap;

                var currentXValue = this._options.minX;
                var prevValue = Number.NEGATIVE_INFINITY;

                var x = 0;
                var i = 0;
                while (i < this._data.length) {
                    var dataItem = this._data[i];
                    if (dataItem.x < prevValue) {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1046"));
                    }

                    if (dataItem.x > this._options.maxX) {
                        break;
                    }

                    prevValue = dataItem.x;

                    var currentXValue = Math.floor(x * this._pixelHorizontalValue + this._options.minX);
                    var currentBarMinValue = currentXValue;
                    var currentBarMaxValue = currentXValue + Math.floor((this._options.barWidth + this._options.barGap) * this._pixelHorizontalValue);

                    if (dataItem.x < currentBarMinValue) {
                        i++;
                        continue;
                    }

                    if (dataItem.x < currentBarMaxValue) {
                        dataItem.x = x;
                        singleBar.push(dataItem);
                        i++;
                    } else {
                        allBars.push(singleBar);
                        singleBar = [];
                        x += barWidthAndMargin;
                    }
                }

                allBars.push(singleBar);
                this.determineYAxisScale(allBars);

                for (var i = 0; i < allBars.length; i++) {
                    this.generateViewModelForSingleStack(allBars[i]);
                }
            };

            StackedBarChartPresenter.prototype.generateViewModelForSingleStack = function (dataItems) {
                if (!dataItems || dataItems.length === 0) {
                    return;
                }

                dataItems.sort(this.sortBySeries.bind(this));
                var accumulatedHeight = 0;
                var maxHeightExceeded = false;
                var singleBarViewModel = [];
                var rectangle = null;

                for (var i = dataItems.length - 1; i >= 0; i--) {
                    var dataItem = dataItems[i];
                    if (dataItem.height <= 0) {
                        continue;
                    }

                    var barHeight = Math.round(dataItem.height / this._pixelVerticalValue);
                    if (dataItem.height > 0 && barHeight === 0) {
                        barHeight = 1;
                    }

                    var startY = this._options.height - accumulatedHeight - barHeight;

                    if (startY < 0) {
                        barHeight = this._options.height - accumulatedHeight;
                        startY = 0;
                        maxHeightExceeded = true;
                    }

                    accumulatedHeight += barHeight;

                    if (this._options.showStackGap && i !== dataItems.length - 1) {
                        if (barHeight > 1) {
                            barHeight -= 1;
                        } else {
                            if (rectangle && rectangle.height > 1) {
                                rectangle.height -= 1;
                                rectangle.y += 1;
                            }
                        }
                    }

                    rectangle = {
                        x: dataItem.x,
                        y: startY,
                        height: barHeight,
                        width: this._options.barWidth,
                        className: this._dataSeriesInfo[dataItem.series].cssClass,
                        chartItem: dataItem
                    };

                    this.viewModel.push(rectangle);
                    if (maxHeightExceeded) {
                        break;
                    }
                }
            };

            StackedBarChartPresenter.prototype.sortBySeries = function (chartItem1, chartItem2) {
                return this._dataSeriesInfo[chartItem2.series].sortOrder - this._dataSeriesInfo[chartItem1.series].sortOrder;
            };

            StackedBarChartPresenter.prototype.validateOptions = function () {
                if (!this._options) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1047"));
                }

                if ((this._options.minX === undefined || this._options.minX === null) || (this._options.maxX === undefined || this._options.maxX === null) || (this._options.minY === undefined || this._options.minY === null) || (this._options.minX > this._options.maxX) || !(this._options.height >= 0 && this._options.width >= 0) || (!this._options.barWidth || this._options.barWidth < 0)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1048"));
                }

                this._options.barGap = this._options.barGap || 0;
                this._options.showStackGap = this._options.showStackGap || false;
                this._options.minYHeight = this._options.minYHeight || this._options.minY;
            };
            StackedBarChartPresenter.YAXIS_PIXEL_PADDING = 10;
            return StackedBarChartPresenter;
        })();
        Graphs.StackedBarChartPresenter = StackedBarChartPresenter;

        var StackedBarChartView = (function () {
            function StackedBarChartView() {
                this._idCount = 0;
                this.rootElement = document.createElement("div");
                this.rootElement.style.width = this.rootElement.style.height = "100%";
                this._selectedId = null;
            }
            Object.defineProperty(StackedBarChartView.prototype, "presenter", {
                set: function (value) {
                    this._presenter = value;
                    this._viewData = this._presenter.viewModel;
                    this._options = value.getViewOptions();
                    this._barGraphWidth = this._options.width;
                    this.drawChart();
                },
                enumerable: true,
                configurable: true
            });

            StackedBarChartView.svgAddCssClass = function (element, className) {
                element.setAttribute("class", element.getAttribute("class") + " " + className);
            };

            StackedBarChartView.svgRemoveCssClass = function (element, className) {
                var classList = element.getAttribute("class");
                classList = classList.replace(className, "").trim();
                element.setAttribute("class", classList);
            };

            StackedBarChartView.prototype.convertPageXToChartAreaPercent = function (pageX) {
                var rect = this._chartAreaContainer.getBoundingClientRect();
                return (pageX - rect.left) / this._barGraphWidth * 100;
            };

            StackedBarChartView.prototype.createContainer = function () {
                var _this = this;
                if (!this._chartAreaContainer) {
                    this._chartAreaContainer = document.createElement("div");
                    this.rootElement.appendChild(this._chartAreaContainer);

                    this._chartAreaContainer.addEventListener("keydown", function (event) {
                        return _this.onBarGraphKeydown(event);
                    });
                    this._chartAreaContainer.addEventListener("focus", function (event) {
                        return _this.onGraphFocusIn(event);
                    });
                    this._chartAreaContainer.addEventListener("focusout", function (event) {
                        return _this.onGraphFocusOut(event);
                    });
                } else {
                    this._chartAreaContainer.innerHTML = "";
                }

                if (!this._barAriaLabel) {
                    this._barAriaLabel = document.createElement("div");
                } else {
                    this._barAriaLabel.innerHTML = "";
                }

                this._chartAreaContainer.style.width = this._options.width + "px";
                this._chartAreaContainer.style.height = this._options.height + "px";
                this._chartAreaContainer.classList.add("stackedBarChart");
                this._chartAreaContainer.style.display = "-ms-grid";
                this._chartAreaContainer.setAttribute("tabIndex", "0");

                this._barAriaLabel.setAttribute("aria-live", "assertive");
                this._barAriaLabel.style.display = "none";
            };

            StackedBarChartView.prototype.createRect = function (x, y, height, width, className) {
                var rect = document.createElementNS(StackedBarChartView.SVG_NAMESPACE, "rect");
                rect.id = StackedBarChartView.BAR_ID_PREFIX + this._idCount;
                this._idCount++;
                rect.setAttribute("focusable", "false");
                rect.setAttribute("x", x + "px");
                rect.setAttribute("y", y + "px");
                rect.setAttribute("class", "bar " + className);
                rect.setAttribute("height", height + "px");
                rect.setAttribute("width", width + "px");
                return rect;
            };

            StackedBarChartView.prototype.drawChart = function () {
                if (!this._viewData) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1049"));
                }

                this.createContainer();
                this.initializeBarGraph();
                this._barGraph.parentElement = this._chartAreaContainer;
                this.renderViewData(this._barGraph, this._viewData);
                this._chartAreaContainer.appendChild(this._barGraph);
                this._chartAreaContainer.appendChild(this._barAriaLabel);

                if (this._options.ariaDescription) {
                    this._chartAreaContainer.setAttribute("aria-label", this._options.ariaDescription);
                }
            };

            StackedBarChartView.prototype.initializeBarGraph = function () {
                this._selectedId = -1;
                this._idCount = 0;

                this._barGraph = document.createElementNS(StackedBarChartView.SVG_NAMESPACE, "svg");
                this._barGraph.setAttribute("class", "barGraph");
                this._barGraph.setAttribute("focusable", "false");
                this._barGraph.setAttribute("height", this._options.height + "px");
                this._barGraph.setAttribute("width", this._barGraphWidth + "px");
                this._barGraph.setAttribute("role", "img");
                if (this._options.ariaDescription) {
                    this._barGraph.setAttribute("aria-label", this._options.ariaDescription);
                }
            };

            StackedBarChartView.prototype.onGraphFocusIn = function (event) {
                if (this._selectedId === null || this._selectedId < 0) {
                    this._selectedId = -1;
                } else {
                    var bar = document.getElementById(StackedBarChartView.BAR_ID_PREFIX + this._selectedId);
                    if (bar) {
                        StackedBarChartView.svgAddCssClass(bar, StackedBarChartView.FOCUSED_CSS_CLASSNAME);
                    }
                }
            };

            StackedBarChartView.prototype.onGraphFocusOut = function (event) {
                var bar = document.getElementById(StackedBarChartView.BAR_ID_PREFIX + this._selectedId);

                if (bar) {
                    StackedBarChartView.svgRemoveCssClass(bar, StackedBarChartView.FOCUSED_CSS_CLASSNAME);
                }

                if (this._options.ariaDescription) {
                    this._chartAreaContainer.setAttribute("aria-label", this._options.ariaDescription);
                }

                Plugin.Tooltip.dismiss();
            };

            StackedBarChartView.prototype.onBarFocusIn = function (chartItem, bar) {
                StackedBarChartView.svgAddCssClass(bar, StackedBarChartView.FOCUSED_CSS_CLASSNAME);

                if (this._options.ariaLabelCallback) {
                    var ariaLabel = this._options.ariaLabelCallback(chartItem);
                    this._barAriaLabel.textContent = ariaLabel;
                }
            };

            StackedBarChartView.prototype.onBarFocusOut = function (chartItem, bar) {
                StackedBarChartView.svgRemoveCssClass(bar, StackedBarChartView.FOCUSED_CSS_CLASSNAME);
            };

            StackedBarChartView.prototype.onBarGraphKeydown = function (event) {
                Plugin.Tooltip.dismiss();

                var bar;

                if (this._selectedId !== -1) {
                    bar = document.getElementById(StackedBarChartView.BAR_ID_PREFIX + this._selectedId);
                }

                if (event.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowLeft || event.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowRight || event.keyCode === DiagnosticsHub.Common.KeyCodes.Escape) {
                    if (bar && bar.onlostfocus) {
                        bar.onlostfocus();
                    }

                    if (event.keyCode === DiagnosticsHub.Common.KeyCodes.Escape) {
                        this._selectedId = -1;
                    } else {
                        if (event.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowLeft) {
                            if ((this._selectedId === 0) || (this._selectedId === -1)) {
                                this._selectedId = this._idCount;
                            }

                            this._selectedId--;
                        } else if (event.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowRight) {
                            this._selectedId++;

                            if (this._selectedId === this._idCount) {
                                this._selectedId = 0;
                            }
                        }

                        bar = document.getElementById(StackedBarChartView.BAR_ID_PREFIX + this._selectedId);
                        if (bar && bar.ongotfocus) {
                            bar.ongotfocus();
                        }
                    }

                    event.preventDefault();
                    event.stopPropagation();

                    return false;
                } else if (bar && bar.onkeydown) {
                    return bar.onkeydown(event);
                }

                return true;
            };

            StackedBarChartView.prototype.onBarKeydown = function (objectForTooltip, event) {
                if (event.keyCode === DiagnosticsHub.Common.KeyCodes.Enter) {
                    var element = event.currentTarget;

                    var offsetX = objectForTooltip.x;
                    var offsetY = element.offsetHeight;

                    while (element) {
                        offsetX += element.offsetLeft;
                        offsetY += element.offsetTop;
                        element = element.offsetParent;
                    }

                    this.showTooltip(objectForTooltip, offsetX, offsetY);

                    event.preventDefault();
                    event.stopPropagation();

                    return false;
                }

                return true;
            };

            StackedBarChartView.prototype.renderViewData = function (container, viewData) {
                for (var i = 0; i < viewData.length; i++) {
                    var barInfo = viewData[i];
                    var rectangle = this.createRect(barInfo.x, barInfo.y, barInfo.height, barInfo.width, barInfo.className);
                    rectangle.onmouseover = this.showTooltip.bind(this, barInfo.chartItem);
                    rectangle.onmouseout = function (ev) {
                        Plugin.Tooltip.dismiss();
                    };
                    rectangle.onkeydown = this.onBarKeydown.bind(this, barInfo.chartItem);
                    rectangle.ongotfocus = this.onBarFocusIn.bind(this, barInfo.chartItem, rectangle);
                    rectangle.onlostfocus = this.onBarFocusOut.bind(this, barInfo.chartItem, rectangle);
                    rectangle.parentElement = container.parentElement;
                    container.appendChild(rectangle);
                }
            };

            StackedBarChartView.prototype.showTooltip = function (chartItem, x, y) {
                if (this._options.tooltipCallback) {
                    var toolTipContent = this._options.tooltipCallback(chartItem);
                    var config = { content: toolTipContent, delay: 0, x: x, y: y, contentContainsHTML: true };
                    Plugin.Tooltip.show(config);
                }
            };
            StackedBarChartView.BAR_ID_PREFIX = "bar";
            StackedBarChartView.FOCUSED_CSS_CLASSNAME = "focused";
            StackedBarChartView.SVG_NAMESPACE = "http://www.w3.org/2000/svg";
            return StackedBarChartView;
        })();
        Graphs.StackedBarChartView = StackedBarChartView;
    })(VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
    var Graphs = VisualProfiler.Graphs;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/hubGraphs/StackedBarChart.js.map

// StackedBarGraph.ts
var VisualProfiler;
(function (VisualProfiler) {
    (function (Graphs) {
        "use strict";

        var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

        var StackedBarGraph = (function () {
            function StackedBarGraph(config) {
                this._config = config;
                this._graphResources = new Graphs.GraphResources(this._config.resources);
                this._timeRange = this._config.timeRange || new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(0, 0), new DiagnosticsHub.BigNumber(0, 0));

                StackedBarGraph.validateConfiguration(this._config);

                this._dataSource = this._config.jsonConfig.Series[0].DataSource;

                if (config.pathToScriptFolder && config.loadCss) {
                    config.loadCss(config.pathToScriptFolder + "/js/hubGraphs/StackedBarChart.css");
                    config.loadCss(config.pathToScriptFolder + "/DataCategoryStyles.css");
                }

                this._config.scale = this._config.scale || {};
                this._config.scale.minimum = 0;
                this._config.scale.maximum = 120;
                this._config.scale.axes = [];
                for (var i = 1; i < 64; i++) {
                    this._config.scale.axes.push({
                        value: i * 100
                    });
                }

                this._config.legend = this._config.legend || {};
                this._config.legend.data = this._config.legend.data || [];

                var seriesCollection = this._config.jsonConfig.Series;
                for (var i = 0; i < seriesCollection.length; i++) {
                    var series = seriesCollection[i];

                    this._config.legend.data.push({
                        color: series.Color,
                        legendText: this._graphResources.getString(series.Legend),
                        legendTooltip: (series.LegendTooltip ? this._graphResources.getString(series.LegendTooltip) : null)
                    });
                }
            }
            Object.defineProperty(StackedBarGraph.prototype, "containerOffsetWidth", {
                get: function () {
                    if (this._containerOffsetWidth === undefined) {
                        if (!this._container) {
                            throw new Error(Plugin.Resources.getErrorString("JSPerf.1069"));
                        }

                        this._containerOffsetWidth = this._container.offsetWidth;
                    }

                    return this._containerOffsetWidth;
                },
                enumerable: true,
                configurable: true
            });

            StackedBarGraph.prototype.addSeriesData = function (counterId, points, fullRender, dropOldData) {
            };

            StackedBarGraph.prototype.deinitialize = function () {
            };

            StackedBarGraph.prototype.getDataPresenter = function () {
                var presenterOptions = {
                    ariaDescription: this._graphResources.getString("CPUGraphAriaLabel"),
                    height: this._config.height,
                    width: this.containerOffsetWidth,
                    minX: parseInt(this._timeRange.begin.value),
                    maxX: parseInt(this._timeRange.end.value),
                    minY: 0,
                    minYHeight: 100,
                    barWidth: this._config.jsonConfig.BarWidth,
                    barGap: this._config.jsonConfig.BarGap,
                    showStackGap: this._config.jsonConfig.ShowStackGap,
                    tooltipCallback: this.createTooltip.bind(this),
                    ariaLabelCallback: this.createAriaLabel.bind(this)
                };

                var presenter = new Graphs.StackedBarChartPresenter(presenterOptions);

                var dataSeriesInfo = [];
                var stackedDataSeries = this._config.jsonConfig.Series;
                for (var i = 0; i < stackedDataSeries.length; i++) {
                    var seriesItem = stackedDataSeries[i];
                    dataSeriesInfo.push({
                        cssClass: seriesItem.CssClass,
                        name: seriesItem.Category,
                        sortOrder: i + 1
                    });
                }

                presenter.addSeries(dataSeriesInfo);

                return presenter;
            };

            StackedBarGraph.prototype.getGranularity = function () {
                var bucketWidth = this._config.jsonConfig.BarGap + this._config.jsonConfig.BarWidth;
                var graphDuration = parseInt(this._timeRange.elapsed.value);
                if (graphDuration <= 0 || this.containerOffsetWidth <= 0) {
                    return 0;
                }

                return Math.floor(bucketWidth / this.containerOffsetWidth * graphDuration);
            };

            StackedBarGraph.prototype.getViewPortTimeRange = function () {
                return this._timeRange;
            };

            StackedBarGraph.prototype.getGraphConfiguration = function () {
                return this._config;
            };

            StackedBarGraph.prototype.removeInvalidPoints = function (base) {
            };

            StackedBarGraph.prototype.render = function (fullRender, refresh) {
                if (fullRender) {
                    this._containerOffsetWidth = undefined;
                }

                if (!this._container) {
                    this.initializeGraphUi();
                }

                if (this._config.jsonConfig.GraphBehaviour == DiagnosticsHub.GraphBehaviourType.PostMortem) {
                    this.setData(this._timeRange);
                }
            };

            StackedBarGraph.prototype.resize = function (evt) {
                this.render(true, false);
            };

            StackedBarGraph.prototype.setGraphState = function (graphState) {
            };

            StackedBarGraph.prototype.setViewPortTimeRange = function (viewPort) {
                this._timeRange = viewPort;
                this.render();
            };

            StackedBarGraph.validateConfiguration = function (config) {
                if (!config) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1070"));
                }

                var jsonObject = config.jsonConfig;
                if (!jsonObject) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1071"));
                }

                if (!jsonObject.Series || jsonObject.Series.length === 0) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1072"));
                }

                jsonObject.BarWidth = jsonObject.BarWidth || 4;
                jsonObject.BarGap = jsonObject.BarGap || 0;
                jsonObject.ShowStackGap = jsonObject.ShowStackGap || false;

                if ((!config.height || config.height < 0) || jsonObject.BarWidth < 0) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1048"));
                }
            };

            StackedBarGraph.prototype.createTooltip = function (cpuUsage) {
                var tooltip = this._graphResources.getString("CPUTooltipCategoryLabel") + ": " + this._graphResources.getString(cpuUsage.series) + "<br>";
                tooltip += this._graphResources.getString("CPUTooltipUtilizationLabel") + ": " + (Math.round(cpuUsage.height * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 }) + "%";
                return tooltip;
            };

            StackedBarGraph.prototype.createAriaLabel = function (cpuUsage) {
                var percentageUtilization = (Math.round(cpuUsage.height * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });
                var formattedTime = DiagnosticsHub.RulerUtilities.formatTime(DiagnosticsHub.BigNumber.convertFromNumber(cpuUsage.x), DiagnosticsHub.UnitFormat.fullName);
                return this._graphResources.getString("CPUBarAriaLabel", this._graphResources.getString(cpuUsage.series), percentageUtilization, formattedTime);
            };

            StackedBarGraph.prototype.initializeGraphUi = function () {
                this._container = document.getElementById(this._config.containerId);
                if (!this._container) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1073"));
                }
            };

            StackedBarGraph.prototype.setData = function (timeRange) {
                var _this = this;
                if (this._settingDataPromise) {
                    this._settingDataPromise.cancel();
                    this._settingDataPromise = null;
                }

                if (!this._dataSource || !this._dataSource.CounterId || !this._dataSource.AnalyzerId) {
                    return;
                }

                this._settingDataPromise = this.getDataWarehouse().then(function (dataWarehouse) {
                    var granuality = _this.getGranularity();
                    if (granuality > 0) {
                        return Graphs.DataUtilities.getFilteredResult(dataWarehouse, _this._dataSource.AnalyzerId, _this._dataSource.CounterId, timeRange, {
                            granularity: granuality.toString()
                        });
                    } else {
                        return Plugin.Promise.as({ p: [] });
                    }
                }).then(function (cpuUsageResult) {
                    if (_this._chart) {
                        _this._container.removeChild(_this._chart.rootElement);
                        _this._chart = null;
                    }

                    if (cpuUsageResult && cpuUsageResult.p) {
                        var chartItems = [];

                        for (var i = 0; i < cpuUsageResult.p.length; i++) {
                            var cpuUsagePoint = cpuUsageResult.p[i];
                            var time = cpuUsagePoint.t.h * 0x100000000 + cpuUsagePoint.t.l;
                            chartItems.push({
                                series: cpuUsagePoint.c,
                                x: time,
                                height: cpuUsagePoint.u
                            });
                        }

                        var dataPresenter = _this.getDataPresenter();
                        dataPresenter.addData(chartItems);

                        _this._chart = new Graphs.StackedBarChartView();
                        _this._chart.presenter = dataPresenter;

                        _this._config.invokeEventListener(DiagnosticsHub.GraphEvents.ScaleInfoChanged, {
                            minimum: 0,
                            maximum: dataPresenter.maximumYValue
                        });

                        _this._container.appendChild(_this._chart.rootElement);
                    }
                }).then(function () {
                    _this._settingDataPromise = null;
                });
            };

            StackedBarGraph.prototype.getDataWarehouse = function () {
                var _this = this;
                if (this._dataWarehouse) {
                    return Plugin.Promise.as(this._dataWarehouse);
                } else {
                    return DiagnosticsHub.DataWarehouse.loadDataWarehouse().then(function (dataWarehouse) {
                        _this._dataWarehouse = dataWarehouse;
                        return _this._dataWarehouse;
                    });
                }
            };
            return StackedBarGraph;
        })();
        Graphs.StackedBarGraph = StackedBarGraph;
    })(VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
    var Graphs = VisualProfiler.Graphs;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/hubGraphs/StackedBarGraph.js.map


// SIG // Begin signature block
// SIG // MIIaoQYJKoZIhvcNAQcCoIIakjCCGo4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFJvxIWBcdhxR
// SIG // hNI8B5TzI2jMLdAToIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggSLMIIEhwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAMps1TISNcThVQAB
// SIG // AAAAyjAJBgUrDgMCGgUAoIGkMBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBSp4ddarqT7
// SIG // EII7Cq3BxlCVfjmK2jBEBgorBgEEAYI3AgEMMTYwNKAa
// SIG // gBgASAB1AGIARwByAGEAcABoAHMALgBqAHOhFoAUaHR0
// SIG // cDovL21pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAE
// SIG // ggEAEaVAXHi8qbYepnq1ZeGLYonKPOEQVGyPUJsHpt/Q
// SIG // fNSH+ukty4+EkkaC/vbr5nutKZRJ6LCNLsyE4eqYO4T/
// SIG // bj3wmP41Io1T0imyNt8gAAxLOoNYSnYrzi7bttNdxb/0
// SIG // ndrGtDFleiUcR4Ppu2BlBV7OsuBDtxhbSIg31hiy+2aZ
// SIG // Crf4oUWhsGaKii3Xysi1fkpIdx1hcP59+ELvoyn12P6h
// SIG // R6cmwyy2tQPN/DZaATrhlJg78p1+PXGFQ1WJh/rXJu4Q
// SIG // PJqdQWLkL4xU1nT61iYxXIKauFxxa1Hq/U68V4QL0KXC
// SIG // 5ZwhhrO+CUDtD37IgFeb8MDK6sU9L3+riATHEKGCAigw
// SIG // ggIkBgkqhkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABMoehNzLR0ezsA
// SIG // AAAAAEwwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzEL
// SIG // BgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0MTEw
// SIG // MTA3MjYyNFowIwYJKoZIhvcNAQkEMRYEFALHwZ9ctgMV
// SIG // y7NNt6pdff92gLjvMA0GCSqGSIb3DQEBBQUABIIBAC8H
// SIG // 4rIewM8ILFXlyb+vpAqkRhuFhfKgwXrq2TeehzzD67eB
// SIG // KcSgZC8b1JBDJPhvENw3tXG3NKGMXnloV0IFz0Fnlt1J
// SIG // xYEuYRPFcO9JSUeOiJxKyytCjJ/McUQjuj+tYaq9ysdj
// SIG // kBC/WIgFRhsxEdh5/gv8maQYOlF0AWxdy6X170oj0s95
// SIG // yw4utY75kDo60kHVcqc4qYSntG57FOJYUhY0MeEXgIq5
// SIG // h7oLIY73NSCqbtpV7LuH6/0XVO0p8sBw7Z4FGlYgrxnp
// SIG // NEtP2F2vle11VWX5KogWZuqpW0ZpqWIynKRaEK8jDb+M
// SIG // X4gEqdqicjbQGn/lPTkPhioEBxD9vA4=
// SIG // End signature block
