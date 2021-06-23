var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;
var Common;
(function (Common) {
    var TimeStamp = (function () {
        function TimeStamp(nsec) {
            if (typeof nsec === "undefined") { nsec = 0; }
            this._nsec = nsec;
        }
        Object.defineProperty(TimeStamp.prototype, "nsec", {
            get: function () {
                return this._nsec;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeStamp.prototype, "msec", {
            get: function () {
                return this._nsec / TimeStamp.nanoSecInMillSec;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeStamp.prototype, "sec", {
            get: function () {
                return this._nsec / TimeStamp.nanoSecInSec;
            },
            enumerable: true,
            configurable: true
        });

        TimeStamp.fromNanoseconds = function (nsec) {
            return new TimeStamp(nsec);
        };

        TimeStamp.fromMilliseconds = function (msec) {
            return new TimeStamp(msec * TimeStamp.nanoSecInMillSec);
        };

        TimeStamp.fromSeconds = function (sec) {
            return new TimeStamp(sec * TimeStamp.nanoSecInSec);
        };

        TimeStamp.prototype.equals = function (other) {
            return this._nsec === other.nsec;
        };
        TimeStamp.nanoSecInMillSec = 1000 * 1000;
        TimeStamp.nanoSecInSec = 1000 * 1000 * 1000;
        return TimeStamp;
    })();
    Common.TimeStamp = TimeStamp;

    var TimeSpan = (function () {
        function TimeSpan(begin, end) {
            if (typeof begin === "undefined") { begin = new TimeStamp(); }
            if (typeof end === "undefined") { end = new TimeStamp(); }
            this._begin = begin;
            this._end = end;

            if (this._begin.nsec > this._end.nsec) {
                throw new Error(Plugin.Resources.getErrorString("R2LControl.1024"));
            }
        }
        Object.defineProperty(TimeSpan.prototype, "begin", {
            get: function () {
                return this._begin;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "end", {
            get: function () {
                return this._end;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(TimeSpan.prototype, "elapsed", {
            get: function () {
                return new TimeStamp(this._end.nsec - this.begin.nsec);
            },
            enumerable: true,
            configurable: true
        });

        TimeSpan.prototype.equals = function (other) {
            return this.begin.equals(other.begin) && this.end.equals(other.end);
        };
        return TimeSpan;
    })();
    Common.TimeSpan = TimeSpan;
})(Common || (Common = {}));
var VisualProfiler;
(function (VisualProfiler) {
    (function (Graphs) {
        "use strict";

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

                this._maximumYValue = Math.max(this._options.minYHeight, this._maximumYValue);

                this._maximumYValue = Math.ceil(Math.floor(this._maximumYValue) / 100) * 100;

                var availableAxisHight = this._options.height - StackedBarChartPresenter.YAXIS_PIXEL_PADDING;
                if (availableAxisHight <= 0) {
                    availableAxisHight = this._options.height;
                }

                this._pixelVerticalValue = this._maximumYValue / availableAxisHight;

                this._maximumYValue = this._options.height * this._pixelVerticalValue;
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
                for (var i = dataItems.length - 1; i >= 0; i--) {
                    var dataItem = dataItems[i];
                    if (dataItem.height <= 0) {
                        continue;
                    }

                    var barHeight = Math.round(dataItem.height / this._pixelVerticalValue);
                    if (dataItem.height > 0 && barHeight < 1) {
                        barHeight = 1;
                    }

                    var startY = this._options.height - (barHeight + accumulatedHeight) - 1;

                    if (startY < 0) {
                        barHeight = this._options.height - accumulatedHeight;
                        startY = 0;
                        maxHeightExceeded = true;
                    }

                    accumulatedHeight += barHeight;

                    if (this._options.showStackGap && barHeight > 1) {
                        barHeight -= 1;
                        startY += 1;
                    }

                    var rectangle = {
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

                if ((this._options.minX === undefined || this._options.minX === null) || (this._options.maxX === undefined || this._options.maxX === null) || (this._options.minY === undefined || this._options.minY === null) || (this._options.minX > this._options.maxX) || (!this._options.height || !this._options.width || this._options.height < 0 || this._options.width < 0) || (!this._options.barWidth || this._options.barWidth < 0)) {
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
                this._selectedId = -1;
                this.rootElement = document.createElement("div");
                this.rootElement.style.width = this.rootElement.style.height = "100%";
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

            StackedBarChartView.prototype.convertPageXToChartAreaPercent = function (pageX) {
                var rect = this._chartAreaContainer.getBoundingClientRect();
                return (pageX - rect.left) / this._barGraphWidth * 100;
            };

            StackedBarChartView.prototype.createContainer = function () {
                if (!this._chartAreaContainer) {
                    this._chartAreaContainer = document.createElement("div");
                    this.rootElement.appendChild(this._chartAreaContainer);
                } else {
                    this._chartAreaContainer.innerHTML = "";
                }

                this._chartAreaContainer.style.width = this._options.width + "px";
                this._chartAreaContainer.style.height = this._options.height + "px";
                this._chartAreaContainer.classList.add("stackedBarChart");
                this._chartAreaContainer.style.display = "-ms-grid";
            };

            StackedBarChartView.prototype.createRect = function (x, y, height, width, className) {
                var rect = document.createElement("div");
                rect.id = StackedBarChartView._barIdPrefix + this._idCount;
                rect.tabIndex = -1;
                this._idCount++;
                rect.classList.add("bar");
                rect.classList.add(className);
                rect.style.left = x + "px";
                rect.style.bottom = (this._options.height - y - height) + "px";
                rect.style.height = height + "px";
                rect.style.width = width + "px";
                return rect;
            };

            StackedBarChartView.prototype.drawChart = function () {
                if (!this._viewData) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1049"));
                }

                this.createContainer();
                this.initializeBarGraph();
                this.renderViewData(this._barGraph, this._viewData);
                this._chartAreaContainer.appendChild(this._barGraph);
            };

            StackedBarChartView.prototype.initializeBarGraph = function () {
                var _this = this;
                this._selectedId = -1;
                this._idCount = 0;

                this._barGraph = document.createElement("div");
                this._barGraph.classList.add("barGraph");
                this._barGraph.tabIndex = 0;
                this._barGraph.style.height = this._options.height + "px";
                this._barGraph.style.width = this._barGraphWidth + "px";
                this._barGraph.addEventListener("keydown", this.onBarGraphKeydown.bind(this));
                this._barGraph.addEventListener("focus", function () {
                    _this._selectedId = -1;
                });

                if (this._options.ariaDescription) {
                    this._barGraph.setAttribute("aria-label", this._options.ariaDescription);
                }
            };

            StackedBarChartView.prototype.onBarBlur = function (event) {
                var bar = event.currentTarget;
                bar.classList.remove("focused");
                Plugin.Tooltip.dismiss();
            };

            StackedBarChartView.prototype.onBarFocus = function (chartItem, event) {
                var bar = event.currentTarget;

                bar.classList.add("focused");

                if (this._options.ariaLabelCallback) {
                    var ariaLabel = this._options.ariaLabelCallback(chartItem);
                    bar.setAttribute("aria-label", ariaLabel);
                }
            };

            StackedBarChartView.prototype.onBarGraphKeydown = function (event) {
                if (event.keyCode === 37 /* ArrowLeft */ || event.keyCode === 39 /* ArrowRight */) {
                    if (event.keyCode === 37 /* ArrowLeft */) {
                        if ((this._selectedId === 0) || (this._selectedId === -1)) {
                            this._selectedId = this._idCount;
                        }

                        this._selectedId--;
                    } else if (event.keyCode === 39 /* ArrowRight */) {
                        this._selectedId++;

                        if (this._selectedId === this._idCount) {
                            this._selectedId = 0;
                        }
                    }

                    var bar = document.getElementById(StackedBarChartView._barIdPrefix + this._selectedId);
                    bar.focus();

                    event.preventDefault();
                    event.stopPropagation();

                    return false;
                }

                return true;
            };

            StackedBarChartView.prototype.onBarKeydown = function (objectForTooltip, event) {
                if (event.keyCode === 13 /* Enter */) {
                    var element = event.currentTarget;

                    var offsetX = window.screenLeft + element.offsetLeft + element.clientWidth;
                    var offsetY = window.screenTop + element.offsetTop;

                    element = element.offsetParent;
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
                    rectangle.addEventListener("mouseover", this.showTooltip.bind(this, barInfo.chartItem));
                    rectangle.addEventListener("mouseout", function () {
                        return Plugin.Tooltip.dismiss();
                    });
                    rectangle.addEventListener("keydown", this.onBarKeydown.bind(this, barInfo.chartItem));
                    rectangle.addEventListener("focus", this.onBarFocus.bind(this, barInfo.chartItem));
                    rectangle.addEventListener("blur", this.onBarBlur.bind(this));
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
            StackedBarChartView._barIdPrefix = "bar";
            return StackedBarChartView;
        })();
        Graphs.StackedBarChartView = StackedBarChartView;
    })(VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
    var Graphs = VisualProfiler.Graphs;
})(VisualProfiler || (VisualProfiler = {}));
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
var VisualProfiler;
(function (VisualProfiler) {
    (function (Graphs) {
        "use strict";

        var Category = (function () {
            function Category() {
            }
            Category.parsingCategory = "Parsing_Category";
            Category.layoutCategory = "Layout_Category";
            Category.appCodeCategory = "AppCode_Category";
            Category.xamlOtherCategory = "XamlOther_Category";
            return Category;
        })();
        Graphs.Category = Category;

        var StackedBarGraph = (function () {
            function StackedBarGraph(config) {
                this._config = config;
                this._graphResources = new VisualProfiler.Graphs.GraphResources(this._config.resources);
                this._timeRange = this._config.timeRange || new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(0, 0), new DiagnosticsHub.BigNumber(0, 0));

                StackedBarGraph.validateConfiguration(this._config);

                this._dataSource = this._config.jsonConfig.Series[0].DataSource;

                if (config.pathToScriptFolder && config.loadCss) {
                    config.loadCss(config.pathToScriptFolder + "/../Css/StackedBarChartCustom.css");
                    config.loadCss(config.pathToScriptFolder + "/../Css/DataCategoryStyles.css");
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
                    ariaDescription: this._graphResources.getString("UiThreadActivityAriaLabel"),
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

                var presenter = new VisualProfiler.Graphs.StackedBarChartPresenter(presenterOptions);

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

            StackedBarGraph.prototype.render = function (fullRender) {
                if (!this._container) {
                    this.initializeGraphUi();
                }

                if (this._config.jsonConfig.GraphBehaviour == 2 /* PostMortem */) {
                    this.setData(this._timeRange);
                }
            };

            StackedBarGraph.prototype.resize = function (evt) {
                this._containerOffsetWidth = undefined;
                this.render();
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
                var tooltip = this._graphResources.getString(cpuUsage.series) + ": " + (Math.round(cpuUsage.height * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 }) + "%";
                return tooltip;
            };

            StackedBarGraph.prototype.createAriaLabel = function (cpuUsage) {
                var percentageUtilization = (Math.round(cpuUsage.height * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });
                var formattedTime = DiagnosticsHub.RulerUtilities.formatTime(DiagnosticsHub.BigNumber.convertFromNumber(cpuUsage.x), 1 /* fullName */);
                return this._graphResources.getString("UiThreadActivityBarAriaLabel", this._graphResources.getString(cpuUsage.series), percentageUtilization, formattedTime);
            };

            StackedBarGraph.prototype.initializeGraphUi = function () {
                this._container = document.getElementById(this._config.containerId);
                if (!this._container) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1073"));
                }
            };

            StackedBarGraph.jsonTimeToNanoseconds = function (bigNumber) {
                var l = bigNumber.l;
                var h = bigNumber.h;

                if (l < 0) {
                    l = l >>> 0;
                }

                if (h < 0) {
                    h = h >>> 0;
                }

                var nsec = h * 0x100000000 + l;
                return nsec;
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
                        return VisualProfiler.Graphs.DataUtilities.getFilteredResult(dataWarehouse, _this._dataSource.AnalyzerId, _this._dataSource.CounterId, timeRange, {
                            granularity: granuality.toString(),
                            task: "1"
                        });
                    } else {
                        return Plugin.Promise.wrap([]);
                    }
                }).then(function (cpuUsageResult) {
                    if (_this._chart) {
                        _this._container.removeChild(_this._chart.rootElement);
                        _this._chart = null;
                    }

                    if (cpuUsageResult) {
                        var chartItems = [];

                        for (var i = 0; i < cpuUsageResult.length; i++) {
                            var cpuUsagePoint = cpuUsageResult[i];

                            var parsingTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.ParsingTime);
                            var layoutTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.LayoutTime);
                            var appCodeTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.AppCodeTime);
                            var xamlOtherTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.XamlOther);
                            var unknownTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.Unknown);

                            var startTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.StartTime);
                            var endTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.EndTime);
                            var totalTime = endTime - startTime;

                            if (parsingTime > 0) {
                                chartItems.push({
                                    series: Category.parsingCategory,
                                    x: startTime,
                                    height: parsingTime * 100.0 / totalTime
                                });
                            }
                            if (layoutTime > 0) {
                                chartItems.push({
                                    series: Category.layoutCategory,
                                    x: startTime,
                                    height: layoutTime * 100.0 / totalTime
                                });
                            }
                            if (appCodeTime > 0) {
                                chartItems.push({
                                    series: Category.appCodeCategory,
                                    x: startTime,
                                    height: appCodeTime * 100.0 / totalTime
                                });
                            }
                            if (xamlOtherTime > 0) {
                                chartItems.push({
                                    series: Category.xamlOtherCategory,
                                    x: startTime,
                                    height: xamlOtherTime * 100.0 / totalTime
                                });
                            }
                        }

                        var dataPresenter = _this.getDataPresenter();
                        dataPresenter.addData(chartItems);

                        _this._chart = new VisualProfiler.Graphs.StackedBarChartView();
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
//# sourceMappingURL=HubGraphs.js.map

// SIG // Begin signature block
// SIG // MIIanQYJKoZIhvcNAQcCoIIajjCCGooCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFHUeSn/8ller
// SIG // xSR5cFkFSqQ39iIYoIIVejCCBLswggOjoAMCAQICEzMA
// SIG // AABZ1nPNUY7wIsUAAAAAAFkwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE0MDUyMzE3
// SIG // MTMxNVoXDTE1MDgyMzE3MTMxNVowgasxCzAJBgNVBAYT
// SIG // AlVTMQswCQYDVQQIEwJXQTEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MQ0wCwYDVQQLEwRNT1BSMScwJQYDVQQLEx5uQ2lwaGVy
// SIG // IERTRSBFU046RjUyOC0zNzc3LThBNzYxJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2UwggEi
// SIG // MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDGbE7P
// SIG // aFP974De6IvEsfB+B84ePOwMjDWHTOlROry2sJZ3Qvr/
// SIG // PM/h2uKJ+m5CAJlbFt0JZDjiUvvfjvqToz27h49uuIfJ
// SIG // 0GBPz5yCkW2RG3IQs9hDfFlKYF3GsFXQJ9vy9r3yIMYi
// SIG // LJ5riy1s6ngEyUvBcAnnth2vmowGP3hw+nbu0iQUdrKu
// SIG // ICiDHKnwSJI/ooX3g8rFUdCVIAN50le8E7VOuLRsVh9T
// SIG // HhW7zzA//TsBzV9yaPfK85lmM6hdIo8dbsraZdIrHCSs
// SIG // n3ypEIqF4m0uXEr9Sbl7QLFTxt9HubMjTiJHHNPBuUl2
// SIG // QnLOkIYOJPXCPLkJNj+oU1xW/l9hAgMBAAGjggEJMIIB
// SIG // BTAdBgNVHQ4EFgQUWygas811DWM9/Zn1mxUCSBrLpqww
// SIG // HwYDVR0jBBgwFoAUIzT42VJGcArtQPt2+7MrsMM1sw8w
// SIG // VAYDVR0fBE0wSzBJoEegRYZDaHR0cDovL2NybC5taWNy
// SIG // b3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljcm9z
// SIG // b2Z0VGltZVN0YW1wUENBLmNybDBYBggrBgEFBQcBAQRM
// SIG // MEowSAYIKwYBBQUHMAKGPGh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljcm9zb2Z0VGltZVN0
// SIG // YW1wUENBLmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDAN
// SIG // BgkqhkiG9w0BAQUFAAOCAQEAevAN9EVsNJYOd/DiwEIF
// SIG // YfeI03r9iNWn9fd/8gj21f3LynR82wmp39YVB5m/0D6H
// SIG // hGJ7wgaOyoto4j3fnlrFjLKpXP5ZYib11/l4tm60CpBl
// SIG // ZulRCPF8yaO3BDdGxeeCPihc709xpOexJVrlQ1QzCH+k
// SIG // sFUt0YJwSBEgDSaBDu8GJXSrhcPDjOIUX+gFVI+6homq
// SIG // lq6UYiX5r2mICgyxUcQJ77iAfFOQebvpj9BI8GLImfFl
// SIG // NDv3zrX7Zpi5olmZXT6VnxS/NbT7mHIkKQzzugR6gjn7
// SIG // Rs3x4LIWvH0g+Jw5FSWhJi3Wi4G9xr2wnVT+RwtfLU4q
// SIG // 9IfqtQ+1t+2SKTCCBOwwggPUoAMCAQICEzMAAADKbNUy
// SIG // EjXE4VUAAQAAAMowDQYJKoZIhvcNAQEFBQAweTELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EwHhcNMTQwNDIyMTczOTAw
// SIG // WhcNMTUwNzIyMTczOTAwWjCBgzELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjENMAsGA1UECxMETU9QUjEeMBwGA1UEAxMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMIIBIjANBgkqhkiG9w0B
// SIG // AQEFAAOCAQ8AMIIBCgKCAQEAlnFd7QZG+oTLnVu3Rsew
// SIG // 4bQROQOtsRVzYJzrp7ZuGjw//2XjNPGmpSFeVplsWOSS
// SIG // oQpcwtPcUi8MZZogYUBTMZxsjyF9uvn+E1BSYJU6W7lY
// SIG // pXRhQamU4K0mTkyhl3BJJ158Z8pPHnGERrwdS7biD8XG
// SIG // J8kH5noKpRcAGUxwRTgtgbRQqsVn0fp5vMXMoXKb9CU0
// SIG // mPhU3xI5OBIvpGulmn7HYtHcz+09NPi53zUwuux5Mqnh
// SIG // qaxVTUx/TFbDEwt28Qf5zEes+4jVUqUeKPo9Lc/PhJiG
// SIG // cWURz4XJCUSG4W/nsfysQESlqYsjP4JJndWWWVATWRhz
// SIG // /0MMrSvUfzBAZwIDAQABo4IBYDCCAVwwEwYDVR0lBAww
// SIG // CgYIKwYBBQUHAwMwHQYDVR0OBBYEFB9e4l1QjVaGvko8
// SIG // zwTop4e1y7+DMFEGA1UdEQRKMEikRjBEMQ0wCwYDVQQL
// SIG // EwRNT1BSMTMwMQYDVQQFEyozMTU5NStiNDIxOGYxMy02
// SIG // ZmNhLTQ5MGYtOWM0Ny0zZmM1NTdkZmM0NDAwHwYDVR0j
// SIG // BBgwFoAUyxHoytK0FlgByTcuMxYWuUyaCh8wVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljQ29kU2lnUENB
// SIG // XzA4LTMxLTIwMTAuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNDb2RTaWdQQ0FfMDgtMzEt
// SIG // MjAxMC5jcnQwDQYJKoZIhvcNAQEFBQADggEBAHdc69eR
// SIG // Pc29e4PZhamwQ51zfBfJD+0228e1LBte+1QFOoNxQIEJ
// SIG // ordxJl7WfbZsO8mqX10DGCodJ34H6cVlH7XPDbdUxyg4
// SIG // Wojne8EZtlYyuuLMy5Pbr24PXUT11LDvG9VOwa8O7yCb
// SIG // 8uH+J13oxf9h9hnSKAoind/NcIKeGHLYI8x6LEPu/+rA
// SIG // 4OYdqp6XMwBSbwe404hs3qQGNafCU4ZlEXcJjzVZudiG
// SIG // qAD++DF9LPSMBZ3AwdV3cmzpTVkmg/HCsohXkzUAfFAr
// SIG // vFn8/hwpOILT3lKXRSkYTpZbnbpfG6PxJ1DqB5XobTQN
// SIG // OFfcNyg1lTo4nNTtaoVdDiIRXnswggW8MIIDpKADAgEC
// SIG // AgphMyYaAAAAAAAxMA0GCSqGSIb3DQEBBQUAMF8xEzAR
// SIG // BgoJkiaJk/IsZAEZFgNjb20xGTAXBgoJkiaJk/IsZAEZ
// SIG // FgltaWNyb3NvZnQxLTArBgNVBAMTJE1pY3Jvc29mdCBS
// SIG // b290IENlcnRpZmljYXRlIEF1dGhvcml0eTAeFw0xMDA4
// SIG // MzEyMjE5MzJaFw0yMDA4MzEyMjI5MzJaMHkxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xIzAhBgNVBAMTGk1pY3Jvc29mdCBD
// SIG // b2RlIFNpZ25pbmcgUENBMIIBIjANBgkqhkiG9w0BAQEF
// SIG // AAOCAQ8AMIIBCgKCAQEAsnJZXBkwZL8dmmAgIEKZdlNs
// SIG // PhvWb8zL8epr/pcWEODfOnSDGrcvoDLs/97CQk4j1XIA
// SIG // 2zVXConKriBJ9PBorE1LjaW9eUtxm0cH2v0l3511iM+q
// SIG // c0R/14Hb873yNqTJXEXcr6094CholxqnpXJzVvEXlOT9
// SIG // NZRyoNZ2Xx53RYOFOBbQc1sFumdSjaWyaS/aGQv+knQp
// SIG // 4nYvVN0UMFn40o1i/cvJX0YxULknE+RAMM9yKRAoIsc3
// SIG // Tj2gMj2QzaE4BoVcTlaCKCoFMrdL109j59ItYvFFPees
// SIG // CAD2RqGe0VuMJlPoeqpK8kbPNzw4nrR3XKUXno3LEY9W
// SIG // PMGsCV8D0wIDAQABo4IBXjCCAVowDwYDVR0TAQH/BAUw
// SIG // AwEB/zAdBgNVHQ4EFgQUyxHoytK0FlgByTcuMxYWuUya
// SIG // Ch8wCwYDVR0PBAQDAgGGMBIGCSsGAQQBgjcVAQQFAgMB
// SIG // AAEwIwYJKwYBBAGCNxUCBBYEFP3RMU7TJoqV4ZhgO6gx
// SIG // b6Y8vNgtMBkGCSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBB
// SIG // MB8GA1UdIwQYMBaAFA6sgmBAVieX5SUT/CrhClOVWeSk
// SIG // MFAGA1UdHwRJMEcwRaBDoEGGP2h0dHA6Ly9jcmwubWlj
// SIG // cm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL21pY3Jv
// SIG // c29mdHJvb3RjZXJ0LmNybDBUBggrBgEFBQcBAQRIMEYw
// SIG // RAYIKwYBBQUHMAKGOGh0dHA6Ly93d3cubWljcm9zb2Z0
// SIG // LmNvbS9wa2kvY2VydHMvTWljcm9zb2Z0Um9vdENlcnQu
// SIG // Y3J0MA0GCSqGSIb3DQEBBQUAA4ICAQBZOT5/Jkav629A
// SIG // sTK1ausOL26oSffrX3XtTDst10OtC/7L6S0xoyPMfFCY
// SIG // gCFdrD0vTLqiqFac43C7uLT4ebVJcvc+6kF/yuEMF2nL
// SIG // pZwgLfoLUMRWzS3jStK8cOeoDaIDpVbguIpLV/KVQpzx
// SIG // 8+/u44YfNDy4VprwUyOFKqSCHJPilAcd8uJO+IyhyugT
// SIG // pZFOyBvSj3KVKnFtmxr4HPBT1mfMIv9cHc2ijL0nsnlj
// SIG // VkSiUc356aNYVt2bAkVEL1/02q7UgjJu/KSVE+Traeep
// SIG // oiy+yCsQDmWOmdv1ovoSJgllOJTxeh9Ku9HhVujQeJYY
// SIG // XMk1Fl/dkx1Jji2+rTREHO4QFRoAXd01WyHOmMcJ7oUO
// SIG // jE9tDhNOPXwpSJxy0fNsysHscKNXkld9lI2gG0gDWvfP
// SIG // o2cKdKU27S0vF8jmcjcS9G+xPGeC+VKyjTMWZR4Oit0Q
// SIG // 3mT0b85G1NMX6XnEBLTT+yzfH4qerAr7EydAreT54al/
// SIG // RrsHYEdlYEBOsELsTu2zdnnYCjQJbRyAMR/iDlTd5aH7
// SIG // 5UcQrWSY/1AWLny/BSF64pVBJ2nDk4+VyY3YmyGuDVyc
// SIG // 8KKuhmiDDGotu3ZrAB2WrfIWe/YWgyS5iM9qqEcxL5rc
// SIG // 43E91wB+YkfRzojJuBj6DnKNwaM9rwJAav9pm5biEKgQ
// SIG // tDdQCNbDPTCCBgcwggPvoAMCAQICCmEWaDQAAAAAABww
// SIG // DQYJKoZIhvcNAQEFBQAwXzETMBEGCgmSJomT8ixkARkW
// SIG // A2NvbTEZMBcGCgmSJomT8ixkARkWCW1pY3Jvc29mdDEt
// SIG // MCsGA1UEAxMkTWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNh
// SIG // dGUgQXV0aG9yaXR5MB4XDTA3MDQwMzEyNTMwOVoXDTIx
// SIG // MDQwMzEzMDMwOVowdzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEh
// SIG // MB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // n6Fssd/bSJIqfGsuGeG94uPFmVEjUK3O3RhOJA/u0afR
// SIG // TK10MCAR6wfVVJUVSZQbQpKumFwwJtoAa+h7veyJBw/3
// SIG // DgSY8InMH8szJIed8vRnHCz8e+eIHernTqOhwSNTyo36
// SIG // Rc8J0F6v0LBCBKL5pmyTZ9co3EZTsIbQ5ShGLieshk9V
// SIG // UgzkAyz7apCQMG6H81kwnfp+1pez6CGXfvjSE/MIt1Nt
// SIG // UrRFkJ9IAEpHZhEnKWaol+TTBoFKovmEpxFHFAmCn4Tt
// SIG // VXj+AZodUAiFABAwRu233iNGu8QtVJ+vHnhBMXfMm987
// SIG // g5OhYQK1HQ2x/PebsgHOIktU//kFw8IgCwIDAQABo4IB
// SIG // qzCCAacwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU
// SIG // IzT42VJGcArtQPt2+7MrsMM1sw8wCwYDVR0PBAQDAgGG
// SIG // MBAGCSsGAQQBgjcVAQQDAgEAMIGYBgNVHSMEgZAwgY2A
// SIG // FA6sgmBAVieX5SUT/CrhClOVWeSkoWOkYTBfMRMwEQYK
// SIG // CZImiZPyLGQBGRYDY29tMRkwFwYKCZImiZPyLGQBGRYJ
// SIG // bWljcm9zb2Z0MS0wKwYDVQQDEyRNaWNyb3NvZnQgUm9v
// SIG // dCBDZXJ0aWZpY2F0ZSBBdXRob3JpdHmCEHmtFqFKoKWt
// SIG // THNY9AcTLmUwUAYDVR0fBEkwRzBFoEOgQYY/aHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvbWljcm9zb2Z0cm9vdGNlcnQuY3JsMFQGCCsGAQUF
// SIG // BwEBBEgwRjBEBggrBgEFBQcwAoY4aHR0cDovL3d3dy5t
// SIG // aWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3NvZnRS
// SIG // b290Q2VydC5jcnQwEwYDVR0lBAwwCgYIKwYBBQUHAwgw
// SIG // DQYJKoZIhvcNAQEFBQADggIBABCXisNcA0Q23em0rXfb
// SIG // znlRTQGxLnRxW20ME6vOvnuPuC7UEqKMbWK4VwLLTiAT
// SIG // UJndekDiV7uvWJoc4R0Bhqy7ePKL0Ow7Ae7ivo8KBciN
// SIG // SOLwUxXdT6uS5OeNatWAweaU8gYvhQPpkSokInD79vzk
// SIG // eJkuDfcH4nC8GE6djmsKcpW4oTmcZy3FUQ7qYlw/FpiL
// SIG // ID/iBxoy+cwxSnYxPStyC8jqcD3/hQoT38IKYY7w17gX
// SIG // 606Lf8U1K16jv+u8fQtCe9RTciHuMMq7eGVcWwEXChQO
// SIG // 0toUmPU8uWZYsy0v5/mFhsxRVuidcJRsrDlM1PZ5v6oY
// SIG // emIp76KbKTQGdxpiyT0ebR+C8AvHLLvPQ7Pl+ex9teOk
// SIG // qHQ1uE7FcSMSJnYLPFKMcVpGQxS8s7OwTWfIn0L/gHkh
// SIG // gJ4VMGboQhJeGsieIiHQQ+kr6bv0SMws1NgygEwmKkgk
// SIG // X1rqVu+m3pmdyjpvvYEndAYR7nYhv5uCwSdUtrFqPYmh
// SIG // dmG0bqETpr+qR/ASb/2KMmyy/t9RyIwjyWa9nR2HEmQC
// SIG // PS2vWY+45CHltbDKY7R4VAXUQS5QrJSwpXirs6CWdRrZ
// SIG // kocTdSIvMqgIbqBbjCW/oO+EyiHW6x5PyZruSeD3AWVv
// SIG // iQt9yGnI5m7qp5fOMSn/DsVbXNhNG6HY+i+ePy5VFmvJ
// SIG // E6P9MYIEjzCCBIsCAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBqDAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUGemnWNTYsoISGexjIQUm
// SIG // F2WwM+swSAYKKwYBBAGCNwIBDDE6MDigHoAcAEgAdQBi
// SIG // AEcAcgBhAHAAaABzAF8AMgAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQBt
// SIG // cF6xWNA1YacmoteKVzbDQpLK997U6I51MzH3JsN2LwvS
// SIG // f2WvJUbfVC8CWr+HNgq+4pA0wc2YRMGJnsspZr1KwL8H
// SIG // CGmDeLyZBzTobin2s4gIWgbR0U7ayeJ6yokEinuBnmPp
// SIG // hIP6QChdzpzLSu3H4k5QgMkANCvSLuWeLI27N4vDN+h/
// SIG // G8Xdy/ed21DROqFGI9JZX3aUDBcN2ZcennJu3ZLVxRVa
// SIG // YJ1wQZR40eyZ+RpEPG5Dfsg/XCHDrouKvjJ3t3faLkIU
// SIG // IeOdauWB8c+X0N8Meoz+UvlYMoi3YmBcmNno0xLNd2Px
// SIG // Lh8f4rXmQuUn+P6n6Ul/C75xEXhVwFOgoYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAAFnWc81RjvAixQAAAAAA
// SIG // WTAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTQwNzIzMDkw
// SIG // NzUyWjAjBgkqhkiG9w0BCQQxFgQUhkJXgMxxfnKsQZk5
// SIG // Z4KW/79gX+swDQYJKoZIhvcNAQEFBQAEggEAM6L+LfXd
// SIG // /+81ds9+EBSyZrx9roElOE6DcgOdYQYo3ttDGiI7iHv1
// SIG // ycfkA6AqZEhXYCP0DOYLj06yV+kpUPARf0QE3TcGBiHc
// SIG // rrbDrbFZHX70KK7IuESR7lB83j2Z/FcGbFgQf7nfZaMP
// SIG // F+ECI8YnhBmDDnJhJum6/7JO4gS1dK6lgZEgCBvw39G2
// SIG // H0NnaAyg+DQJ0ociKBFqUNnwKK35PRIJ/ypCf8vLYsGu
// SIG // 6zRKQzBC7uDpRflRZZQ0S73lZGJN1ZHgSOOhjmmqKU8c
// SIG // 8rD3B5FIwptOCmBH/Y4uL0kz47gDuaqG9tYxmiqfUaCL
// SIG // mya58Kz7lk/I7VVpp4vlRjPcZg==
// SIG // End signature block
