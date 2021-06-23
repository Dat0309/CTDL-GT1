var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (Common) {
                "use strict";
                (function (KeyCodes) {
                    KeyCodes._map = [];
                    KeyCodes.Tab = 9;
                    KeyCodes.Enter = 13;
                    KeyCodes.Escape = 27;
                    KeyCodes.Space = 32;
                    KeyCodes.PageUp = 33;
                    KeyCodes.PageDown = 34;
                    KeyCodes.End = 35;
                    KeyCodes.Home = 36;
                    KeyCodes.ArrowLeft = 37;
                    KeyCodes.ArrowFirst = 37;
                    KeyCodes.ArrowUp = 38;
                    KeyCodes.ArrowRight = 39;
                    KeyCodes.ArrowDown = 40;
                    KeyCodes.ArrowLast = 40;
                    KeyCodes.Delete = 46;
                    KeyCodes.B = 66;
                    KeyCodes.C = 67;
                    KeyCodes.Plus = 107;
                    KeyCodes.Minus = 109;
                    KeyCodes.F1 = 112;
                    KeyCodes.F2 = 113;
                    KeyCodes.F3 = 114;
                    KeyCodes.F4 = 115;
                    KeyCodes.F5 = 116;
                    KeyCodes.F6 = 117;
                    KeyCodes.F7 = 118;
                    KeyCodes.F8 = 119;
                    KeyCodes.F9 = 120;
                    KeyCodes.F10 = 121;
                    KeyCodes.F11 = 122;
                    KeyCodes.F12 = 123;
                })(Common.KeyCodes || (Common.KeyCodes = {}));
                var KeyCodes = Common.KeyCodes;
                (function (MouseCodes) {
                    MouseCodes._map = [];
                    MouseCodes.Left = 1;
                    MouseCodes.Right = 3;
                    MouseCodes.Middle = 2;
                })(Common.MouseCodes || (Common.MouseCodes = {}));
                var MouseCodes = Common.MouseCodes;
            })(DiagnosticsHub.Common || (DiagnosticsHub.Common = {}));
            var Common = DiagnosticsHub.Common;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var RegisterNamespace = (function () {
                function RegisterNamespace() { }
                RegisterNamespace.RegisteredGraphs = {
                };
                RegisterNamespace.register = function register(name) {
                    if(name) {
                        var main = window || this;
                        var arr = name.split(".");
                        var functionName = null;
                        for(var i = 0; i < arr.length; i++) {
                            functionName = main[arr[i]];
                            if(functionName) {
                                main = functionName;
                            } else {
                                throw new Error("Invalid class name.");
                            }
                        }
                        this.RegisteredGraphs[name] = functionName;
                    } else {
                        throw new Error("Invalid class name.");
                    }
                };
                RegisterNamespace.getRegisteredGraph = function getRegisteredGraph(name) {
                    return this.RegisteredGraphs[name];
                };
                return RegisterNamespace;
            })();
            DiagnosticsHub.RegisterNamespace = RegisterNamespace;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (Common) {
                "use strict";
                var QpcTimeProperties = (function () {
                    function QpcTimeProperties(collectionStartTime, frequency) {
                        this._collectionStartTime = collectionStartTime;
                        this._frequency = frequency;
                        this._nanosecondToQpcRatio = QpcTimeProperties.NanosecondsInASecond / this._frequency;
                        this._qpcToNanosecondRatio = this._frequency / QpcTimeProperties.NanosecondsInASecond;
                    }
                    QpcTimeProperties.NanosecondsInASecond = 1000000000;
                    QpcTimeProperties.prototype.getCollectionStartTime = function () {
                        return this._collectionStartTime;
                    };
                    QpcTimeProperties.prototype.getFrequency = function () {
                        return this._frequency;
                    };
                    QpcTimeProperties.prototype.convertQpcTimestampToNanoseconds = function (qpcValue) {
                        var qpcTicks = DiagnosticsHub.BigNumber.subtract(qpcValue, this._collectionStartTime);
                        var nanoseconds = DiagnosticsHub.BigNumber.multiplyNumber(qpcTicks, this._nanosecondToQpcRatio);
                        return nanoseconds;
                    };
                    QpcTimeProperties.prototype.convertNanosecondsToQpcTimestamp = function (nanoseconds) {
                        return DiagnosticsHub.BigNumber.multiplyNumber(nanoseconds, this._qpcToNanosecondRatio);
                    };
                    return QpcTimeProperties;
                })();
                Common.QpcTimeProperties = QpcTimeProperties;                
            })(DiagnosticsHub.Common || (DiagnosticsHub.Common = {}));
            var Common = DiagnosticsHub.Common;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var SeriesType = (function () {
                function SeriesType() { }
                Object.defineProperty(SeriesType, "Line", {
                    get: function () {
                        return "Line";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SeriesType, "StepLine", {
                    get: function () {
                        return "StepLine";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SeriesType, "Mark", {
                    get: function () {
                        return "Mark";
                    },
                    enumerable: true,
                    configurable: true
                });
                return SeriesType;
            })();
            DiagnosticsHub.SeriesType = SeriesType;            
            var ViewType = (function () {
                function ViewType() { }
                Object.defineProperty(ViewType, "Graph", {
                    get: function () {
                        return "Graph";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewType, "Ruler", {
                    get: function () {
                        return "Ruler";
                    },
                    enumerable: true,
                    configurable: true
                });
                return ViewType;
            })();
            DiagnosticsHub.ViewType = ViewType;            
            (function (GraphState) {
                GraphState._map = [];
                GraphState.None = 0;
                GraphState.Roll = 1;
                GraphState.Stop = 2;
            })(DiagnosticsHub.GraphState || (DiagnosticsHub.GraphState = {}));
            var GraphState = DiagnosticsHub.GraphState;
            (function (GraphBehaviourType) {
                GraphBehaviourType._map = [];
                GraphBehaviourType.None = 0;
                GraphBehaviourType.Live = 1;
                GraphBehaviourType.PostMortem = 2;
            })(DiagnosticsHub.GraphBehaviourType || (DiagnosticsHub.GraphBehaviourType = {}));
            var GraphBehaviourType = DiagnosticsHub.GraphBehaviourType;
            var SwimlaneEvents = (function () {
                function SwimlaneEvents() { }
                Object.defineProperty(SwimlaneEvents, "Graph", {
                    get: function () {
                        return "graphEvent";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SwimlaneEvents, "Visibility", {
                    get: function () {
                        return "graphVisibility";
                    },
                    enumerable: true,
                    configurable: true
                });
                return SwimlaneEvents;
            })();
            DiagnosticsHub.SwimlaneEvents = SwimlaneEvents;            
            var GraphEvents = (function () {
                function GraphEvents() { }
                Object.defineProperty(GraphEvents, "HeaderInfoChanged", {
                    get: function () {
                        return "headerInfoChange";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GraphEvents, "LegendInfoChanged", {
                    get: function () {
                        return "legendInfoChanged";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GraphEvents, "ScaleInfoChanged", {
                    get: function () {
                        return "scaleInfoChanged";
                    },
                    enumerable: true,
                    configurable: true
                });
                return GraphEvents;
            })();
            DiagnosticsHub.GraphEvents = GraphEvents;            
            (function (AxisPositionType) {
                AxisPositionType._map = [];
                AxisPositionType.top = 0;
                AxisPositionType.middle = 1;
                AxisPositionType.bottom = 2;
            })(DiagnosticsHub.AxisPositionType || (DiagnosticsHub.AxisPositionType = {}));
            var AxisPositionType = DiagnosticsHub.AxisPositionType;
            (function (ScaleType) {
                ScaleType._map = [];
                ScaleType.Left = 0;
                ScaleType.Right = 1;
            })(DiagnosticsHub.ScaleType || (DiagnosticsHub.ScaleType = {}));
            var ScaleType = DiagnosticsHub.ScaleType;
            (function (GraphType) {
                GraphType._map = [];
                GraphType.Unknown = 0;
                GraphType.Standard = 1;
                GraphType.Custom = 2;
            })(DiagnosticsHub.GraphType || (DiagnosticsHub.GraphType = {}));
            var GraphType = DiagnosticsHub.GraphType;
            var TitleEvents = (function () {
                function TitleEvents() { }
                Object.defineProperty(TitleEvents, "Click", {
                    get: function () {
                        return "click";
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TitleEvents, "KeyPress", {
                    get: function () {
                        return "keydown";
                    },
                    enumerable: true,
                    configurable: true
                });
                return TitleEvents;
            })();
            DiagnosticsHub.TitleEvents = TitleEvents;            
            (function (MarkType) {
                MarkType._map = [];
                MarkType.LifeCycleEvent = 1;
                MarkType.UserMark = 2;
                MarkType.Custom = 3;
            })(DiagnosticsHub.MarkType || (DiagnosticsHub.MarkType = {}));
            var MarkType = DiagnosticsHub.MarkType;
            (function (TickMarkType) {
                TickMarkType._map = [];
                TickMarkType.Big = 0;
                TickMarkType.Medium = 1;
                TickMarkType.Small = 2;
            })(DiagnosticsHub.TickMarkType || (DiagnosticsHub.TickMarkType = {}));
            var TickMarkType = DiagnosticsHub.TickMarkType;
            (function (UnitFormat) {
                UnitFormat._map = [];
                UnitFormat._map[0] = "italicizedAbbreviations";
                UnitFormat.italicizedAbbreviations = 0;
                UnitFormat._map[1] = "fullName";
                UnitFormat.fullName = 1;
            })(DiagnosticsHub.UnitFormat || (DiagnosticsHub.UnitFormat = {}));
            var UnitFormat = DiagnosticsHub.UnitFormat;
            (function (ControlsCodeMarkers) {
                ControlsCodeMarkers._map = [];
                ControlsCodeMarkers.perfDiagnosticsHub_ToolbarZoomBegin = 25225;
                ControlsCodeMarkers.perfDiagnosticsHub_ToolbarZoomEnd = 25226;
                ControlsCodeMarkers.perfDiagnosticsHub_SwimlaneFullRenderBegin = 25227;
                ControlsCodeMarkers.perfDiagnosticsHub_SwimlaneFullRenderEnd = 25228;
                ControlsCodeMarkers.perfDiagnosticsHub_GraphContentFullRenderBegin = 25229;
                ControlsCodeMarkers.perfDiagnosticsHub_GraphContentFullRenderEnd = 25230;
                ControlsCodeMarkers.perfDiagnosticsHub_GraphContentPartialRenderBegin = 25231;
                ControlsCodeMarkers.perfDiagnosticsHub_GraphContentPartialRenderEnd = 25232;
                ControlsCodeMarkers.perfDiagnosticsHub_SwimlaneSelectionHandlingBegin = 25233;
                ControlsCodeMarkers.perfDiagnosticsHub_SwimlaneSelectionHandlingEnd = 25234;
                ControlsCodeMarkers.perfDiagnosticsHub_RulerSelectionHandlingBegin = 25235;
                ControlsCodeMarkers.perfDiagnosticsHub_RulerSelectionHandlingEnd = 25236;
            })(DiagnosticsHub.ControlsCodeMarkers || (DiagnosticsHub.ControlsCodeMarkers = {}));
            var ControlsCodeMarkers = DiagnosticsHub.ControlsCodeMarkers;
            var Padding = (function () {
                function Padding(left, top, right, bottom) {
                    this.left = left;
                    this.top = top;
                    this.right = right;
                    this.bottom = bottom;
                }
                return Padding;
            })();
            DiagnosticsHub.Padding = Padding;            
            var RectangleDimension = (function (_super) {
                __extends(RectangleDimension, _super);
                function RectangleDimension(left, top, right, bottom) {
                                _super.call(this, left, top, right, bottom);
                    if(this.left > this.right || this.top > this.bottom) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                }
                Object.defineProperty(RectangleDimension.prototype, "width", {
                    get: function () {
                        return this.right - this.left;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RectangleDimension.prototype, "height", {
                    get: function () {
                        return this.bottom - this.top;
                    },
                    enumerable: true,
                    configurable: true
                });
                return RectangleDimension;
            })(Padding);
            DiagnosticsHub.RectangleDimension = RectangleDimension;            
            var MinMaxTime = (function () {
                function MinMaxTime(min, max) {
                    this.min = min;
                    this.max = max;
                }
                Object.defineProperty(MinMaxTime.prototype, "range", {
                    get: function () {
                        return DiagnosticsHub.BigNumber.subtract(this.max, this.min);
                    },
                    enumerable: true,
                    configurable: true
                });
                return MinMaxTime;
            })();
            DiagnosticsHub.MinMaxTime = MinMaxTime;            
            var MinMaxNumber = (function () {
                function MinMaxNumber(min, max) {
                    this.min = min;
                    this.max = max;
                }
                Object.defineProperty(MinMaxNumber.prototype, "range", {
                    get: function () {
                        if((this.min || this.min === 0) && (this.max || this.max === 0)) {
                            return this.max - this.min;
                        }
                        return null;
                    },
                    enumerable: true,
                    configurable: true
                });
                return MinMaxNumber;
            })();
            DiagnosticsHub.MinMaxNumber = MinMaxNumber;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var ChartColorScheme = (function () {
                function ChartColorScheme(lineColorString, lineFillColorString) {
                    this._lineColorString = "#FF0000";
                    this._lineFillColorString = "#FF0000";
                    this._lineColorString = lineColorString;
                    this._lineFillColorString = lineFillColorString;
                }
                Object.defineProperty(ChartColorScheme.prototype, "lineColor", {
                    get: function () {
                        return this._lineColorString;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ChartColorScheme.prototype, "lineFillColor", {
                    get: function () {
                        return this._lineFillColorString;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ChartColorScheme;
            })();
            DiagnosticsHub.ChartColorScheme = ChartColorScheme;            
            var MultiLineGraph = (function () {
                function MultiLineGraph(config) {
                    this._series = [];
                    this._graphContainerCss = "graphContainer";
                    this._isCursorEnabled = false;
                    this._index = 0;
                    this._tabFocusPointList = [];
                    this._graphState = DiagnosticsHub.GraphState.None;
                    this._oldGridX = new DiagnosticsHub.MinMaxTime(DiagnosticsHub.BigNumber.zero, DiagnosticsHub.BigNumber.zero);
                    this._oldValueMin = Number.MIN_VALUE;
                    this._oldValueMax = Number.MIN_VALUE;
                    this._dataWarehouse = null;
                    this._colorSchemes = [
                        new ChartColorScheme("rgb(118, 174, 200)", "rgba(118, 174, 200, 0.65)"), 
                        new ChartColorScheme("rgb(158, 202, 0)", "rgba(158, 202, 0, 0.65)"), 
                        new ChartColorScheme("rgb(198, 198, 198)", "rgba(198, 198, 198, 0.75)"), 
                        new ChartColorScheme("rgb(167, 148, 50)", "rgba(167, 148, 50, 0.25)")
                    ];
                    this.chartAxisCount = 5;
                    this.chartAxisIncreaseRatio = 1.1;
                    this.scaleForWhiteSpace = 0.05;
                    this.maxSeriesValue = Number.MIN_VALUE;
                    if(config) {
                        this._config = config;
                    } else {
                        throw new Error("Invalid configuration");
                    }
                    this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                    this.initialize();
                }
                Object.defineProperty(MultiLineGraph.prototype, "containerClientWidth", {
                    get: function () {
                        if(this._container && (this._containerClientWidth === null || typeof (this._containerClientWidth) === "undefined")) {
                            this._containerClientWidth = this._container.clientWidth;
                        }
                        return this._containerClientWidth;
                    },
                    set: function (value) {
                        this._containerClientWidth = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MultiLineGraph.prototype, "containerClientHeight", {
                    get: function () {
                        if(this._container && (this._containerClientHeight === null || typeof (this._containerClientHeight) === "undefined")) {
                            this._containerClientHeight = this._container.clientHeight;
                        }
                        return this._containerClientHeight;
                    },
                    set: function (value) {
                        this._containerClientHeight = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MultiLineGraph.prototype, "canvasClientWidth", {
                    get: function () {
                        if(this._canvasDiv && (this._canvasClientWidth === null || typeof (this._canvasClientWidth) === "undefined")) {
                            this._canvasClientWidth = this._canvasDiv.clientWidth;
                        }
                        return this._canvasClientWidth;
                    },
                    set: function (value) {
                        this._canvasClientWidth = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                MultiLineGraph.prototype.setGraphState = function (graphState) {
                    this._graphState = graphState;
                };
                MultiLineGraph.prototype.resize = function (evt) {
                    if(this._container) {
                        this.containerClientWidth = this._container.clientWidth;
                        this.containerClientHeight = this._container.clientHeight;
                    }
                    if(this._canvasDiv) {
                        this.canvasClientWidth = this._canvasDiv.clientWidth;
                    }
                    if(this.calculateChartSize()) {
                        this.removeFocus();
                        if(this._refreshDataOnResizeAndZoom && DiagnosticsHub.GraphBehaviourType.PostMortem === this._graphBehaviour) {
                            this.setData(this._config.timeRange);
                            this._logger.debug("function: resize. Set new data for post mortem graph.");
                        } else {
                            this.renderGraph();
                            this._logger.debug("function: resize. render only. graph behaviour type: " + this._graphBehaviour);
                        }
                    }
                };
                MultiLineGraph.prototype.removeInvalidPoints = function (base) {
                    for(var i = 0; i < this._series.length; i++) {
                        var series = this._series[i];
                        var finalPoints = series.data;
                        if(finalPoints && finalPoints.length > 0) {
                            var count = 0;
                            for(var j = 0; j <= finalPoints.length; j++) {
                                if(finalPoints[j].Timestamp.greaterOrEqual(base)) {
                                    break;
                                }
                                count++;
                            }
                            finalPoints.splice(0, count > 0 ? count - 1 : 0);
                        }
                    }
                };
                MultiLineGraph.prototype.deinitialize = function () {
                };
                MultiLineGraph.prototype.setViewPortTimeRange = function (viewPort) {
                    var viewPortHasChanged = false;
                    var gridX = new DiagnosticsHub.JsonTimespan(this._graphInfo.gridX.min, this._graphInfo.gridX.max);
                    if(!gridX.equals(viewPort)) {
                        viewPortHasChanged = true;
                        this._graphInfo.gridX.min = viewPort.begin;
                        this._graphInfo.gridX.max = viewPort.end;
                        this._config.timeRange = viewPort;
                        if(this.calculateChartSize()) {
                            this.removeFocus();
                            if(this._refreshDataOnResizeAndZoom && DiagnosticsHub.GraphBehaviourType.PostMortem === this._graphBehaviour) {
                                this.setData(this._config.timeRange);
                                this._logger.debug("function: setViewPortTimeRange. Set new data for post mortem graph.");
                            } else {
                                this.renderGraph(viewPortHasChanged);
                                this._logger.debug("function: setViewPortTimeRange. render only. graph behaviour type: " + this._graphBehaviour);
                            }
                        }
                    }
                };
                MultiLineGraph.prototype.getViewPortTimeRange = function () {
                    return new DiagnosticsHub.JsonTimespan(this._graphInfo.gridX.min, this._graphInfo.gridX.max);
                };
                MultiLineGraph.prototype.getGraphConfiguration = function () {
                    return this._config;
                };
                MultiLineGraph.prototype.addSeriesData = function (counterId, points, fullRender, dropOldData) {
                    if (typeof fullRender === "undefined") { fullRender = true; }
                    if (typeof dropOldData === "undefined") { dropOldData = false; }
                    if(counterId && points && points.length > 0) {
                        var series = null;
                        for(var i = 0; i < this._series.length; i++) {
                            series = this._series[i];
                            if(series.counterId === counterId) {
                                if(!series.data || dropOldData) {
                                    series.data = [];
                                }
                                var newPoints = [];
                                if(this._timeProperties && DiagnosticsHub.GraphBehaviourType.Live === this._graphBehaviour) {
                                    for(var j = 0; j < points.length; j++) {
                                        var toolTip = points[j].ToolTip;
                                        if((toolTip === null || typeof toolTip === "undefined") && this._unitConverter) {
                                            var formattedPoint = this.convertToUnits(points[j].Value);
                                            toolTip = formattedPoint ? formattedPoint.value + " " + formattedPoint.unit : undefined;
                                            var prependText = "";
                                            if(formattedPoint && this._series.length > 1) {
                                                prependText = (series.legendText || Plugin.Resources.getString("TooltipValueLabel") || "Value") + ": ";
                                            } else if(formattedPoint) {
                                                prependText = (Plugin.Resources.getString("TooltipValueLabel") || "Value") + ": ";
                                            }
                                            toolTip = prependText + toolTip;
                                        }
                                        newPoints.push({
                                            CustomData: points[j].CustomData,
                                            Timestamp: this._timeProperties.convertQpcTimestampToNanoseconds(points[j].Timestamp),
                                            ToolTip: toolTip,
                                            Value: points[j].Value
                                        });
                                    }
                                } else {
                                    newPoints = points;
                                }
                                series.data = series.data.concat(newPoints);
                                break;
                            }
                        }
                        if(series && series.data) {
                            var maxPoint = this.getMaxPoint(series.data);
                            this.maxSeriesValue = Math.max(maxPoint.Value, this.maxSeriesValue);
                            this.calculateYRange(maxPoint);
                            this.calculateYRange(this.getMinPoint(series.data));
                            if(this._oldValueMin !== this._graphInfo.gridY.min || this._oldValueMax !== this._graphInfo.gridY.max) {
                                this._oldValueMin = this._graphInfo.gridY.min;
                                this._oldValueMax = this._graphInfo.gridY.max;
                                var maxNumber = this.convertToUnits(this._graphInfo.gridY.max);
                                var minNumberValue = this.convertToUnits(this._graphInfo.gridY.min).value;
                                this._config.invokeEventListener(DiagnosticsHub.GraphEvents.ScaleInfoChanged, {
                                    minimum: minNumberValue,
                                    maximum: maxNumber.value,
                                    unit: maxNumber.unit
                                });
                                fullRender = true;
                            }
                            if(this._graphBehaviour === DiagnosticsHub.GraphBehaviourType.Live) {
                                this.renderGraph(fullRender);
                            }
                        }
                    }
                };
                MultiLineGraph.prototype.render = function (fullRender, refresh) {
                    if (typeof fullRender === "undefined") { fullRender = true; }
                    if (typeof refresh === "undefined") { refresh = false; }
                    if(this._container && refresh) {
                        this.containerClientWidth = this._container.clientWidth;
                        this.containerClientHeight = this._container.clientHeight;
                    }
                    this.renderGraph(fullRender);
                };
                MultiLineGraph.prototype.convertToUnitsProcessor = function (value, desiredUnit) {
                    var result = {
                        value: value.toString(),
                        unit: this._config.unit || ""
                    };
                    if(this._unitConverter) {
                        for(var i = 0; i < this._unitConverter.length; i++) {
                            var units = this._unitConverter[i];
                            var unit = null;
                            if(this._resource) {
                                unit = this._resource[units.Unit];
                            }
                            unit = unit || units.Unit;
                            if((!desiredUnit && units.FromValue <= value && value <= units.ToValue) || (desiredUnit === unit)) {
                                if(units.Divider !== 1) {
                                    value = value / units.Divider;
                                }
                                var decimals = Math.pow(10, units.Decimals);
                                value = Math.round(value * decimals) / (decimals);
                                result.value = value.toFixed(units.Decimals);
                                result.unit = unit;
                                break;
                            }
                        }
                    }
                    return result;
                };
                MultiLineGraph.prototype.initializeGraphStructure = function () {
                    var _this = this;
                    this._container = document.getElementById(this._config.containerId);
                    if(!this._container) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                    }
                    this._container.classList.add(this._graphContainerCss);
                    this._container.style.height = this._config.height + "px";
                    while(this._container.childNodes.length > 0) {
                        this._container.removeChild(this._container.firstChild);
                    }
                    this._canvasDiv = document.createElement("div");
                    this._canvasDiv.className = "graph-canvas-div";
                    this._container.appendChild(this._canvasDiv);
                    this._canvas = document.createElement("canvas");
                    this._canvas.tabIndex = 0;
                    this._canvas.setAttribute("aria-label", this._config.description);
                    if(this._keyPress) {
                        this._canvasDiv.addEventListener("keydown", this._keyPress, true);
                        this._canvasDiv.addEventListener("click", function (evt) {
                            _this._keyPress({
                                keyCode: DiagnosticsHub.Common.KeyCodes.ArrowLeft
                            });
                        }.bind(this));
                    }
                    this._canvasDiv.appendChild(this._canvas);
                    this._canvas.className = "graph-canvas";
                    this._canvas.addEventListener("mousemove", this.onMouseOver.bind(this));
                    this._canvas.addEventListener("mouseout", this.onMouseOut.bind(this));
                    if(!this._container.runtimeStyle.position || this._container.runtimeStyle.position === "static") {
                        this._container.style.position = "relative";
                    }
                    this._context = this._canvas.getContext("2d");
                    Plugin.Theme.addEventListener("themechanged", this.onThemeChanged.bind(this));
                };
                MultiLineGraph.prototype.initialize = function () {
                    if(this._config.resources) {
                        this._resource = this._config.resources;
                    }
                    var jsonObject = this._config.jsonConfig;
                    this._setScaleValueViaAnalyzer = jsonObject.SetScaleValueViaAnalyzer || false;
                    this._isScaleFixed = jsonObject.IsScaleFixed || false;
                    this._config.scale.axes = jsonObject.Axes || [];
                    this._graphInfo = {
                        gridX: new DiagnosticsHub.MinMaxTime(this._config.timeRange.begin, this._config.timeRange.end),
                        gridY: new DiagnosticsHub.MinMaxNumber(this._config.scale.minimum, this._config.scale.maximum),
                        chartDrawFill: true,
                        chartRect: null
                    };
                    this._oldGridX = new DiagnosticsHub.MinMaxTime(this._config.timeRange.begin, this._config.timeRange.end);
                    if(jsonObject.TimeProperties) {
                        this._timeProperties = jsonObject.TimeProperties;
                    }
                    if(jsonObject.GraphBehaviour) {
                        this._graphBehaviour = jsonObject.GraphBehaviour;
                    }
                    if(!this._config.legend) {
                        this._config.legend = {
                            data: []
                        };
                    }
                    var colorIndex = 0;
                    for(var i = 0; i < jsonObject.Series.length; i++) {
                        var series = jsonObject.Series[i];
                        if(this._resource && this._resource[series.Legend]) {
                            series.Legend = this._resource[series.Legend];
                        }
                        if(this._resource && this._resource[series.LegendTooltip]) {
                            series.LegendTooltip = this._resource[series.LegendTooltip];
                        }
                        var color = series.Color ? new ChartColorScheme(series.Color.Line, series.Color.Fill) : colorIndex < this._colorSchemes.length ? this._colorSchemes[colorIndex++] : this._colorSchemes[colorIndex % this._colorSchemes.length];
                        this.addSeries(series.Legend, series.DataSource.CounterId, series.SeriesType, color);
                        this._config.legend.data.push({
                            legendText: series.Legend,
                            color: this._series[i].colorScheme.lineColor,
                            legendTooltip: series.LegendTooltip
                        });
                    }
                    if(jsonObject.Unit && typeof jsonObject.Unit === "string") {
                        this._config.unit = jsonObject.Unit;
                        if(this._resource && this._resource[jsonObject.Unit]) {
                            this._config.unit = this._resource[jsonObject.Unit];
                        }
                    }
                    if(jsonObject.Units) {
                        this._unitConverter = jsonObject.Units;
                    }
                    if(jsonObject.RefreshDataOnResizeAndZoom) {
                        this._refreshDataOnResizeAndZoom = jsonObject.RefreshDataOnResizeAndZoom || false;
                    }
                    this._keyPress = this.onKeyPress.bind(this);
                    this._hideCursor = this.hideCursor.bind(this);
                    if(this._config.loadCss) {
                        this._config.loadCss("MultiLineGraph.css");
                    }
                };
                MultiLineGraph.prototype.renderGraph = function (fullRender) {
                    if (typeof fullRender === "undefined") { fullRender = true; }
                    if(fullRender) {
                        Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_GraphContentFullRenderBegin);
                    } else {
                        Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_GraphContentPartialRenderBegin);
                    }
                    if(!this._container) {
                        this.initializeGraphStructure();
                        if(this._config.jsonConfig.GraphBehaviour === DiagnosticsHub.GraphBehaviourType.PostMortem) {
                            this.setData(this._config.timeRange);
                        }
                    }
                    if(fullRender) {
                        this._container.style.backgroundColor = Plugin.Theme.getValue("plugin-background-color");
                        this.calculateChartSize();
                        if(0 <= this.containerClientWidth && 0 <= this._config.height) {
                            this._graphInfo.chartRect = new DiagnosticsHub.RectangleDimension(0, 0, this.containerClientWidth, this._config.height);
                            this.drawChartBackground();
                            this.renderSeries(fullRender);
                        }
                    } else {
                        this.renderSeries(fullRender);
                    }
                    this.createPointIndexInfoList(fullRender);
                    if(fullRender) {
                        Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_GraphContentFullRenderEnd);
                    } else {
                        Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_GraphContentPartialRenderEnd);
                    }
                };
                MultiLineGraph.prototype.setData = function (timeRange) {
                    var _this = this;
                    if(!this._config || !this._config.jsonConfig || !this._config.jsonConfig.Series) {
                        this._logger.warning("Configuration of current multiline graph is not initialized.");
                        return;
                    }
                    this._logger.info("setData(..) call");
                    this._logger.info("Collect configurations from json configuration for which we expect to load data from data warehouse.");
                    var dlConfiguration = [];
                    var jsonConfig = this._config.jsonConfig;
                    for(var i = 0; i < jsonConfig.Series.length; i++) {
                        var series = jsonConfig.Series[i];
                        if(series) {
                            var dataSource = series.DataSource;
                            if(dataSource && dataSource.CounterId && dataSource.AnalyzerId) {
                                var seriesConfig = {
                                    counterId: dataSource.CounterId,
                                    analyzerId: dataSource.AnalyzerId
                                };
                                if(dataSource.CustomDomain) {
                                    seriesConfig.customDomain = dataSource.CustomDomain;
                                }
                                dlConfiguration.push(seriesConfig);
                                this._logger.debug("Configuration for series: " + JSON.stringify(seriesConfig));
                            }
                        }
                    }
                    if(dlConfiguration.length === 0) {
                        this._logger.debug("Current multiline graph does not expect data from analyzers.");
                        return;
                    }
                    var dwLoadTask = null;
                    this._logger.info("Preloading data warehouse.");
                    if(!this._dataWarehouse) {
                        this._logger.debug("this._dataWarehouse is null, trying to load it first time on this view.");
                        dwLoadTask = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse().then(function (dw) {
                            this._dataWarehouse = dw;
                            return Plugin.Promise.wrap(this._dataWarehouse);
                        }.bind(this));
                    } else {
                        this._logger.debug("this._dataWarehouse is not null");
                        dwLoadTask = Plugin.Promise.wrap(this._dataWarehouse);
                    }
                    var convertToGraphDataPoints = function (counterId, dp) {
                        var arr = [];
                        var series = null;
                        for(var i = 0; i < _this._series.length; i++) {
                            series = _this._series[i];
                            if(series.counterId === counterId) {
                                for(var i = 0; i < dp.length; i++) {
                                    var toolTipValue = dp[i].tt;
                                    if(!toolTipValue && typeof dp[i].v === "number") {
                                        var formattedPoint = _this.convertToUnits(dp[i].v);
                                        toolTipValue = formattedPoint.value + " " + formattedPoint.unit;
                                        var prependText = "";
                                        if(_this._series.length > 1) {
                                            prependText = (series.legendText || Plugin.Resources.getString("TooltipValueLabel") || "Value") + ": ";
                                        } else {
                                            prependText = (Plugin.Resources.getString("TooltipValueLabel") || "Value") + ": ";
                                        }
                                        toolTipValue = prependText + toolTipValue;
                                    }
                                    arr.push({
                                        Timestamp: new DiagnosticsHub.BigNumber(dp[i].t.h, dp[i].t.l),
                                        Value: dp[i].v,
                                        ToolTip: dp[i].tt || toolTipValue
                                    });
                                }
                                break;
                            }
                        }
                        return arr;
                    }.bind(this);
                    dwLoadTask.then(function (dw) {
                        var _this = this;
                        this._logger.info("Data warehouse is loaded. Starting to load the data.");
                        var promises = [];
                        for(var i = 0; i < dlConfiguration.length; i++) {
                            this._logger.debug("Loading data for counter name '" + dlConfiguration[i].counterId + "' from analyzer '" + dlConfiguration[i].analyzerId + "'");
                            this._logger.debug("Graph height: " + JSON.stringify(this._config.height) + " Graph Width: " + this.containerClientWidth);
                            var contextData = {
                                customDomain: {
                                    CounterId: dlConfiguration[i].counterId,
                                    Height: this._config.height.toString(),
                                    Width: this.containerClientWidth.toString()
                                },
                                timeDomain: timeRange
                            };
                            this._logger.debug("Data Context: " + JSON.stringify(contextData));
                            if(dlConfiguration[i].customDomain) {
                                for(var propertyName in dlConfiguration[i].customDomain) {
                                    if(dlConfiguration[i].customDomain.hasOwnProperty(propertyName)) {
                                        var value = dlConfiguration[i].customDomain[propertyName];
                                        if(value !== null && typeof value !== "string") {
                                            this._logger.warning("Custom domain property '" + propertyName + "' is not a string, it will be converted to string");
                                            value = value.toString();
                                        }
                                        contextData.customDomain[propertyName] = value;
                                    }
                                }
                            }
                            var pushPromise = function (config, context) {
                                promises.push(dw.getFilteredData(context, config.analyzerId).then(function (data) {
                                    if(!data) {
                                        data = {
                                        };
                                    }
                                    data.counterId = config.counterId;
                                    return data;
                                }.bind(_this)));
                            }.bind(this);
                            pushPromise(dlConfiguration[i], contextData);
                        }
                        Plugin.Promise.join(promises).done(function (data) {
                            if(data && data.length > 0) {
                                for(var i = 0; i < data.length; i++) {
                                    if(data[i].p) {
                                        if(this._setScaleValueViaAnalyzer && (data[i].mn !== null && typeof data[i].mn !== "undefined") && (data[i].mx !== null && typeof data[i].mx !== "undefined")) {
                                            if((this._graphInfo.gridY.min === null || typeof this._graphInfo.gridY.min === "undefined") && (this._graphInfo.gridY.max === null || typeof this._graphInfo.gridY.max === "undefined")) {
                                                this._graphInfo.gridY.min = data[i].mn;
                                                this._graphInfo.gridY.max = data[i].mx;
                                            } else {
                                                this._graphInfo.gridY.min = Math.min(data[i].mn, this._graphInfo.gridY.min);
                                                this._graphInfo.gridY.max = Math.max(data[i].mx, this._graphInfo.gridY.max);
                                            }
                                            this._logger.debug("new scale min: " + this._graphInfo.gridY.min + " and max: " + this._graphInfo.gridY.max);
                                        }
                                        this.addSeriesData(data[i].counterId, convertToGraphDataPoints(data[i].counterId, data[i].p), true, true);
                                    }
                                }
                                this.renderGraph(true);
                            }
                        }.bind(this), function (err) {
                            this._logger.error("Could not load data points for counter :" + dlConfiguration[i].counterId + ", error: " + JSON.stringify(err));
                        }.bind(this));
                    }.bind(this), function (err) {
                        this._logger.error("Error on datawarehouse loading:" + JSON.stringify(err));
                        throw err;
                    }.bind(this));
                };
                MultiLineGraph.prototype.renderSeries = function (fullRender) {
                    for(var seriesIndex = 0; seriesIndex < this._series.length; seriesIndex++) {
                        var series = this._series[seriesIndex];
                        series.render(this._context, this._graphInfo, fullRender);
                    }
                };
                MultiLineGraph.prototype.convertToUnits = function (value) {
                    return this.convertToUnitsProcessor(value, this.graphUnitOverride);
                };
                MultiLineGraph.prototype.onThemeChanged = function (args) {
                    this._container.style.backgroundColor = Plugin.Theme.getValue("plugin-background-color");
                    this.renderGraph();
                };
                MultiLineGraph.prototype.calculateChartSize = function () {
                    var isCalculated = false;
                    if(this.containerClientWidth > 0 && this.containerClientHeight > 0) {
                        var canvasWidth = this.containerClientWidth;
                        var canvasHeight = this._config.height;
                        this._canvas.height = canvasHeight;
                        this._canvas.width = canvasWidth;
                        isCalculated = true;
                    }
                    return isCalculated;
                };
                MultiLineGraph.prototype.convertToChartAreaPercentage = function (event) {
                    var rect = this._canvas.getBoundingClientRect();
                    var mouseX = event.clientX - rect.left;
                    return (mouseX) / this.canvasClientWidth * 100;
                };
                MultiLineGraph.prototype.drawChartBackground = function () {
                    this._context.fillStyle = "rgba(0, 0, 0, 0)";
                    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
                };
                MultiLineGraph.prototype.convertChartAreaPercentToDataValue = function (percent) {
                    percent *= 100;
                    var gridXWidth = DiagnosticsHub.BigNumber.subtract(this._graphInfo.gridX.max, this._graphInfo.gridX.min);
                    var distanceFromLeft = DiagnosticsHub.BigNumber.multiplyNumber(gridXWidth, percent);
                    distanceFromLeft = DiagnosticsHub.BigNumber.divideNumber(distanceFromLeft, 10000);
                    return DiagnosticsHub.BigNumber.add(distanceFromLeft, this._graphInfo.gridX.min);
                };
                MultiLineGraph.prototype.calculateYRange = function (point) {
                    if(this._isScaleFixed) {
                        return;
                    }
                    if(point && !this._setScaleValueViaAnalyzer) {
                        if(this._graphInfo.gridY.min > point.Value) {
                            this._graphInfo.gridY.min = Math.floor((point.Value * this.chartAxisIncreaseRatio) / this.chartAxisCount) * this.chartAxisCount;
                        }
                        if(this._graphBehaviour === DiagnosticsHub.GraphBehaviourType.PostMortem) {
                            if(this._graphInfo.gridY.max < point.Value) {
                                this._graphInfo.gridY.max = Math.ceil((point.Value * this.chartAxisIncreaseRatio) / this.chartAxisCount) * this.chartAxisCount;
                            }
                        } else {
                            if(this._graphInfo.gridY.max < point.Value + Math.ceil(this._graphInfo.gridY.max * this.scaleForWhiteSpace)) {
                                this._graphInfo.gridY.max = Math.ceil((point.Value * this.chartAxisIncreaseRatio) / this.chartAxisCount) * this.chartAxisCount;
                            }
                        }
                    }
                };
                MultiLineGraph.prototype.addSeries = function (legendText, counterId, type, color) {
                    var newSeries;
                    if(type && type === DiagnosticsHub.SeriesType.StepLine) {
                        newSeries = new StepLineSeries(this._series.length, counterId, legendText, this._graphBehaviour, color);
                    } else {
                        newSeries = new LineSeries(this._series.length, counterId, legendText, this._graphBehaviour, color);
                    }
                    this._series.push(newSeries);
                    var filledLines = 0;
                    for(var i = 0; i < this._series.length; i++) {
                        filledLines++;
                        if(filledLines > 1) {
                            this._graphInfo.chartDrawFill = false;
                            break;
                        }
                    }
                };
                MultiLineGraph.prototype.createVerticalRulerLine = function (position) {
                    var x = this.containerClientWidth * position / 100;
                    x = Math.round(x) + 0.5;
                    this._context.save();
                    this._context.beginPath();
                    this._context.strokeStyle = Plugin.Theme.getValue("diagnostics-host-graph-line");
                    this._context.lineWidth = 1;
                    this._context.moveTo(x, 0);
                    this._context.lineTo(x, this._config.height);
                    this._context.closePath();
                    this._context.stroke();
                    this._context.restore();
                };
                MultiLineGraph.prototype.getMaxPoint = function (points) {
                    var max;
                    if(points) {
                        if(points.length > 0) {
                            max = points[0];
                        }
                        for(var i = 1; i < points.length; i++) {
                            if(points[i].Value > max.Value) {
                                max = points[i];
                            }
                        }
                    }
                    return max;
                };
                MultiLineGraph.prototype.getMinPoint = function (points) {
                    var min;
                    if(points) {
                        if(points.length > 0) {
                            min = points[0];
                        }
                        for(var i = 1; i < points.length; i++) {
                            if(points[i].Value < min.Value) {
                                min = points[i];
                            }
                        }
                    }
                    return min;
                };
                MultiLineGraph.prototype.drawToolTip = function (timestamp, points) {
                    if(!points || points.length === 0) {
                        return;
                    }
                    var pointsWithMessages = [];
                    for(var i = 0; i < points.length; i++) {
                        if(points[i].ToolTip !== null && typeof points[i].ToolTip !== "undefined" && points[i].ToolTip !== "undefined" && points[i].ToolTip !== "") {
                            pointsWithMessages.push(points[i].ToolTip);
                        }
                    }
                    if(pointsWithMessages.length > 0) {
                        var message = (Plugin.Resources.getString("TooltipTimeLabel") || "Time") + ": " + DiagnosticsHub.RulerUtilities.formatTime(timestamp) + "\n" + pointsWithMessages.join("\n");
                        var config = {
                            content: message,
                            delay: 0
                        };
                        Plugin.Tooltip.show(config);
                    }
                };
                MultiLineGraph.prototype.getMousePosition = function (evt) {
                    var rect = this._canvas.getBoundingClientRect();
                    var root = document.documentElement;
                    return {
                        MouseX: evt.clientX - rect.left,
                        MouseY: evt.clientY - rect.top
                    };
                };
                MultiLineGraph.prototype.onMouseOver = function (evt) {
                    var mousePos = this.getMousePosition(evt);
                    if((!this._oldMousePosition || this._oldMousePosition.MouseY !== mousePos.MouseY) && this.containerClientWidth - 2 > mousePos.MouseY && mousePos.MouseY <= this._config.height && mousePos.MouseY > 0) {
                        (Plugin).Tooltip.dismiss();
                        var foundPoints = this.getPointsBelowMousePointer(mousePos);
                        if(this._isCursorEnabled) {
                            this.drawCursor(mousePos);
                        }
                        if(foundPoints && foundPoints.length !== 0) {
                            var timeStamp = this.getTimestampForMouseCoordinates(mousePos);
                            this.drawToolTip(timeStamp, foundPoints);
                        }
                    }
                    this._oldMousePosition = mousePos;
                };
                MultiLineGraph.prototype.hideCursor = function () {
                    if(this._isCursorEnabled) {
                        var mdiv = MultiLineGraph.Cursor;
                        if(!mdiv) {
                            mdiv = MultiLineGraph.Cursor = document.getElementById("mDiv");
                        }
                        if(mdiv) {
                            mdiv.style.visibility = "hidden";
                        }
                    }
                    (Plugin).Tooltip.dismiss();
                };
                MultiLineGraph.prototype.onMouseOut = function (evt) {
                    var mousePos = this.getMousePosition(evt);
                    if(mousePos.MouseX > this.containerClientWidth - 2 || mousePos.MouseY > this._config.height || mousePos.MouseY < 0) {
                        this.hideCursor();
                    }
                };
                MultiLineGraph.prototype.drawCursor = function (point) {
                    var mdiv = MultiLineGraph.Cursor;
                    if(!mdiv) {
                        mdiv = MultiLineGraph.Cursor = document.getElementById("mDiv");
                    }
                    if(!mdiv) {
                        mdiv = document.createElement("div");
                        mdiv.className = "graph-cursor";
                        mdiv.id = "mDiv";
                        mdiv.style.left = point.MouseX.toString() + "px";
                        mdiv.style.top = "0px";
                        mdiv.style.height = (this._canvas.height).toString() + "px";
                        mdiv.style.visibility = "visible";
                        mdiv.style.zIndex = "2";
                        this._canvasDiv.appendChild(mdiv);
                    } else {
                        mdiv.style.left = point.MouseX.toString() + "px";
                        mdiv.style.top = "0px";
                        mdiv.style.visibility = "visible";
                    }
                };
                MultiLineGraph.prototype.getTimestampForMouseCoordinates = function (mousePosition) {
                    return this.convertChartAreaPercentToDataValue(100.0 * mousePosition.MouseX / this._canvas.width);
                };
                MultiLineGraph.prototype.getPointsBelowMousePointer = function (mousePosition) {
                    var cursorTimestamp = this.getTimestampForMouseCoordinates(mousePosition);
                    var foundPoints = [];
                    for(var i = 0; i < this._series.length; i++) {
                        var seriesData = this._series[i].data;
                        if(seriesData && seriesData.length > 0) {
                            for(var j = 1; j < seriesData.length; j++) {
                                var previousPoint = seriesData[j - 1];
                                var renderedPoint = seriesData[j];
                                if(typeof renderedPoint.xPx !== "undefined" && typeof previousPoint.xPx !== "undefined" && renderedPoint.Timestamp.greater(cursorTimestamp) && !previousPoint.Timestamp.greater(cursorTimestamp)) {
                                    foundPoints.push(previousPoint);
                                    break;
                                }
                            }
                        }
                    }
                    return foundPoints;
                };
                MultiLineGraph.prototype.onKeyPress = function (evt) {
                    if(this._series && (DiagnosticsHub.Common.KeyCodes.ArrowLeft === evt.keyCode || DiagnosticsHub.Common.KeyCodes.ArrowRight === evt.keyCode)) {
                        if(DiagnosticsHub.Common.KeyCodes.ArrowLeft === evt.keyCode) {
                            this._index--;
                            if(this._index < 0) {
                                this._index = this._tabFocusPointList.length - 1;
                            }
                        } else if(DiagnosticsHub.Common.KeyCodes.ArrowRight === evt.keyCode) {
                            this._index++;
                            if(this._index >= this._tabFocusPointList.length) {
                                this._index = 0;
                            }
                        }
                        this.focusPoint(this._tabFocusPointList[this._index]);
                    } else if(DiagnosticsHub.Common.KeyCodes.Tab === evt.keyCode) {
                        this.removeFocus();
                    }
                };
                MultiLineGraph.prototype.focusPoint = function (pointInfo) {
                    var isMoved = false;
                    var series = this._series[pointInfo.seriesIndex];
                    if(series && series.visiblePoints) {
                        var point = series.visiblePoints[pointInfo.pointIndex];
                        var divs = this._canvasDiv.getElementsByClassName("graph-focus");
                        while(divs.length > 0) {
                            this._canvasDiv.removeChild(divs[0]);
                        }
                        var focusDiv = document.createElement("div");
                        focusDiv.classList.add("graph-focus");
                        if(point.xPx <= 0) {
                            focusDiv.style.left = "2px";
                        } else if(point.xPx >= this.containerClientWidth) {
                            focusDiv.style.left = this.containerClientWidth - 2 + "px";
                        } else {
                            focusDiv.style.left = point.xPx + "px";
                        }
                        if(point.yPx <= 0) {
                            focusDiv.style.top = "2px";
                        } else if(point.yPx >= this._config.height) {
                            focusDiv.style.top = this._config.height - 2 + "px";
                        } else {
                            focusDiv.style.top = point.yPx + "px";
                        }
                        Plugin.Tooltip.dismiss();
                        var message = (Plugin.Resources.getString("TooltipTimeLabel") || "Time") + ": " + DiagnosticsHub.RulerUtilities.formatTime(point.Timestamp) + "\n" + point.ToolTip;
                        var config = {
                            content: message,
                            delay: 0
                        };
                        focusDiv.addEventListener("keydown", this.showTooltip.bind(this, config));
                        focusDiv.addEventListener("blur", function () {
                            Plugin.Tooltip.dismiss();
                        });
                        focusDiv.setAttribute("aria-label", message);
                        this._canvasDiv.appendChild(focusDiv);
                        focusDiv.focus();
                        isMoved = true;
                    }
                    return isMoved;
                };
                MultiLineGraph.prototype.showTooltip = function (config, event) {
                    if(event.keyCode === VisualStudio.DiagnosticsHub.Common.KeyCodes.Enter) {
                        var element = event.currentTarget;
                        config.x = window.screenLeft + element.offsetLeft + element.clientWidth + 4;
                        config.y = window.screenTop + element.offsetTop + 4;
                        Plugin.Tooltip.show(config);
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                    }
                    return true;
                };
                MultiLineGraph.prototype.createPointIndexInfoList = function (fullRender) {
                    if (typeof fullRender === "undefined") { fullRender = false; }
                    this._selectedTimeRange = new DiagnosticsHub.MinMaxTime(this._graphInfo.gridX.min, this._graphInfo.gridX.max);
                    this._tabFocusPointList = this.getPointIndexInfoList(new DiagnosticsHub.JsonTimespan(this._graphInfo.gridX.min, this._graphInfo.gridX.max));
                    if(fullRender) {
                        this._index = -1;
                    }
                };
                MultiLineGraph.prototype.getPointIndexInfoList = function (timespan) {
                    var lists = [];
                    if(this._series) {
                        for(var i = 0; i < this._series.length; i++) {
                            var series = this._series[i];
                            var seriesPoints = series.visiblePoints;
                            var list = [];
                            for(var j = 0; j < seriesPoints.length; j++) {
                                var seriesPoint = seriesPoints[j];
                                if(timespan.contains(seriesPoint.Timestamp)) {
                                    list.push({
                                        seriesIndex: i,
                                        pointIndex: j
                                    });
                                }
                                if(seriesPoint.Timestamp.greater(timespan.end)) {
                                    break;
                                }
                            }
                            lists.push(list);
                        }
                    }
                    return this.sortPointIndexInfoList(lists);
                };
                MultiLineGraph.prototype.sortPointIndexInfoList = function (lists) {
                    var finalList = [];
                    if(lists) {
                        while(!this.areAllListEmpty(lists)) {
                            var smallest = null;
                            var index = null;
                            for(var i = 0; i < lists.length; i++) {
                                var list = lists[i];
                                if(list.length > 0) {
                                    var smallestInList = list[0];
                                    if(smallestInList && (!smallest || this._series[smallest.seriesIndex].visiblePoints[smallest.pointIndex].Timestamp.greater(this._series[smallestInList.seriesIndex].visiblePoints[smallestInList.pointIndex].Timestamp))) {
                                        smallest = smallestInList;
                                        index = i;
                                    }
                                }
                            }
                            if(smallest) {
                                finalList.push(lists[index].shift());
                            }
                        }
                    }
                    return finalList;
                };
                MultiLineGraph.prototype.areAllListEmpty = function (lists) {
                    var allListEmpty = true;
                    if(lists) {
                        for(var i = 0; i < lists.length; i++) {
                            if(lists[i].length > 0) {
                                allListEmpty = false;
                                break;
                            }
                        }
                    }
                    return allListEmpty;
                };
                MultiLineGraph.prototype.removeFocus = function () {
                    this._index = -1;
                    var divs = this._canvasDiv.getElementsByClassName("graph-focus");
                    for(var i = 0; i < divs.length; i++) {
                        (divs[i]).classList.add("graph-unfocused");
                    }
                };
                return MultiLineGraph;
            })();
            DiagnosticsHub.MultiLineGraph = MultiLineGraph;            
            var ChartSeries = (function () {
                function ChartSeries(index, counterId, legendText, type, graphBehaviour, color) {
                    this.index = index;
                    this.data = [];
                    this.colorScheme = color;
                    this.counterId = counterId;
                    this.type = type;
                    this.legendText = legendText;
                    this.graphBehaviour = graphBehaviour;
                }
                ChartSeries.prototype.getVisiblePoints = function (chartRect) {
                    return this.getPointsToRender(chartRect, true);
                };
                ChartSeries.prototype.getPointsToRender = function (chartRect, fullRender) {
                    var renderedPoints = [];
                    var seriesPoints = this.data;
                    var seriesIndex = this.index;
                    if(seriesPoints.length > 0) {
                        var startIndex = fullRender ? 0 : seriesPoints.length - 1;
                        var endIndex = seriesPoints.length - 1;
                        var startX = this.info.gridX.min;
                        var rangeX = this.info.gridX.range;
                        var endX = this.info.gridX.max;
                        var scaleX = chartRect.width / parseInt(rangeX.value);
                        if(this.type === DiagnosticsHub.SeriesType.Line || this.type === DiagnosticsHub.SeriesType.StepLine) {
                            if(startIndex === 0) {
                                if(this.type === DiagnosticsHub.SeriesType.Line) {
                                    renderedPoints.push({
                                        Timestamp: this.info.gridX.min,
                                        Value: seriesPoints[startIndex].Value,
                                        ToolTip: seriesPoints[startIndex].ToolTip,
                                        CustomData: seriesPoints[startIndex].CustomData,
                                        isInView: false,
                                        seriesIndex: seriesIndex,
                                        xPx: 0,
                                        yPx: this.getYCoordinate(seriesPoints[startIndex].Value, chartRect.top, chartRect.height)
                                    });
                                } else if(this.type === DiagnosticsHub.SeriesType.StepLine) {
                                    renderedPoints.push({
                                        Timestamp: seriesPoints[startIndex].Timestamp,
                                        Value: this.info.gridY.min,
                                        ToolTip: seriesPoints[startIndex].ToolTip,
                                        CustomData: seriesPoints[startIndex].CustomData,
                                        isInView: false,
                                        seriesIndex: seriesIndex,
                                        xPx: chartRect.left + parseInt(DiagnosticsHub.BigNumber.subtract(seriesPoints[startIndex].Timestamp, startX).value) * scaleX,
                                        yPx: this.getYCoordinate(this.info.gridY.min, chartRect.top, chartRect.height)
                                    });
                                }
                            } else {
                                startIndex--;
                            }
                        }
                        var x = 0;
                        var y = 0;
                        var startPoint = seriesPoints[startIndex];
                        var hasMovedToStart = false;
                        for(var i = startIndex; i <= endIndex; i++) {
                            var point = seriesPoints[i];
                            var pointInView = point.Timestamp.greaterOrEqual(startX) && endX.greaterOrEqual(point.Timestamp);
                            var requiresDrawing = pointInView;
                            point.isInView = pointInView;
                            point.seriesIndex = seriesIndex;
                            if(!requiresDrawing) {
                                if((startX.greater(point.Timestamp) && i < endIndex && seriesPoints[i + 1].Timestamp.greater(startX)) || (point.Timestamp.greater(endX) && i > 0 && endX.greater(seriesPoints[i - 1].Timestamp))) {
                                    requiresDrawing = true;
                                }
                            }
                            if(requiresDrawing) {
                                x = chartRect.left + parseInt(DiagnosticsHub.BigNumber.subtract(point.Timestamp, startX).value) * scaleX;
                                y = this.getYCoordinate(point.Value, chartRect.top, chartRect.height);
                                point.xPx = Math.floor(x);
                                point.yPx = Math.floor(y);
                                renderedPoints.push(point);
                            }
                        }
                    }
                    return renderedPoints;
                };
                ChartSeries.prototype.getYCoordinate = function (y, top, height) {
                    return top + ((this.info.gridY.max - y) / this.info.gridY.range) * height;
                };
                return ChartSeries;
            })();
            DiagnosticsHub.ChartSeries = ChartSeries;            
            var StepLineSeries = (function (_super) {
                __extends(StepLineSeries, _super);
                function StepLineSeries(index, counterId, legendText, graphBehaviour, color) {
                                _super.call(this, index, counterId, legendText, DiagnosticsHub.SeriesType.StepLine, graphBehaviour, color);
                }
                StepLineSeries.prototype.render = function (context, info, fullRender) {
                    if(context && !this.context) {
                        this.context = context;
                    }
                    if(info) {
                        this.info = info;
                    }
                    if(this.graphBehaviour !== DiagnosticsHub.GraphBehaviourType.Live) {
                        this.visiblePoints = this.renderedPoints = this.getPointsToRender(this.info.chartRect, fullRender);
                    } else {
                        this.renderedPoints = this.getPointsToRender(this.info.chartRect, fullRender);
                        this.visiblePoints = this.getVisiblePoints(this.info.chartRect);
                    }
                    if(this.renderedPoints && this.renderedPoints.length > 0) {
                        this.drawLineFill(this.renderedPoints, fullRender);
                        this.drawLineSeries(this.renderedPoints, fullRender);
                    }
                };
                StepLineSeries.prototype.drawLineFill = function (renderedPoints, fullRender) {
                    if(this.info.chartDrawFill && renderedPoints.length > 0) {
                        var startIndex = 0;
                        var endIndex = renderedPoints.length - 1;
                        var startX = this.info.gridX.min;
                        var rangeX = this.info.gridX.range;
                        var endX = this.info.gridX.max;
                        var x = 0;
                        var y = 0;
                        var hasMovedToStart = false;
                        this.context.save();
                        this.context.beginPath();
                        var previousPoint = renderedPoints[0];
                        this.context.beginPath();
                        this.context.fillStyle = this.colorScheme.lineFillColor;
                        this.context.strokeStyle = this.colorScheme.lineColor;
                        for(var i = startIndex; i <= endIndex; i++) {
                            var point = renderedPoints[i];
                            if(!hasMovedToStart) {
                                this.context.moveTo(point.xPx, point.yPx);
                                hasMovedToStart = true;
                            } else {
                                this.context.lineTo(point.xPx, previousPoint.yPx);
                                this.context.lineTo(point.xPx, point.yPx);
                            }
                            previousPoint = point;
                        }
                        y = this.getYCoordinate(0, this.info.chartRect.top, this.info.chartRect.height);
                        this.context.lineTo(previousPoint.xPx, y);
                        this.context.lineTo(fullRender ? 0 : renderedPoints[0].xPx, y);
                        this.context.closePath();
                        this.context.fill();
                        this.context.restore();
                    }
                };
                StepLineSeries.prototype.drawLineSeries = function (renderedPoints, fullRender) {
                    if(renderedPoints.length > 0) {
                        this.context.save();
                        this.context.beginPath();
                        this.context.lineWidth = (this.info.chartRect.height < 100 ? 1 : 2);
                        this.context.fillStyle = this.colorScheme.lineFillColor;
                        this.context.strokeStyle = this.colorScheme.lineColor;
                        var previousPoint = null;
                        for(var i = 0; i < renderedPoints.length; i++) {
                            var rp = renderedPoints[i];
                            if(i === 0) {
                                this.context.moveTo(renderedPoints[i].xPx, renderedPoints[i].yPx - 0.5);
                            } else {
                                var yPos = this.context.canvas.height - 0.5;
                                if(previousPoint && previousPoint.yPx) {
                                    yPos = Math.round(previousPoint.yPx) - 0.5;
                                }
                                this.context.lineTo(rp.xPx, yPos);
                                this.context.lineTo(rp.xPx, Math.round(rp.yPx) - 0.5);
                            }
                            previousPoint = rp;
                        }
                        this.context.stroke();
                        this.context.restore();
                    }
                };
                return StepLineSeries;
            })(ChartSeries);
            DiagnosticsHub.StepLineSeries = StepLineSeries;            
            var LineSeries = (function (_super) {
                __extends(LineSeries, _super);
                function LineSeries(index, counterId, legendText, graphBehaviour, color) {
                                _super.call(this, index, counterId, legendText, DiagnosticsHub.SeriesType.Line, graphBehaviour, color);
                }
                LineSeries.prototype.render = function (context, info, fullRender) {
                    if(context && !this.context) {
                        this.context = context;
                    }
                    if(info) {
                        this.info = info;
                    }
                    if(this.graphBehaviour !== DiagnosticsHub.GraphBehaviourType.Live) {
                        this.visiblePoints = this.renderedPoints = this.getPointsToRender(this.info.chartRect, fullRender);
                    } else {
                        this.renderedPoints = this.getPointsToRender(this.info.chartRect, fullRender);
                        this.visiblePoints = this.getVisiblePoints(this.info.chartRect);
                    }
                    if(this.renderedPoints && this.renderedPoints.length > 0) {
                        this.drawLineFill(this.renderedPoints, fullRender);
                        this.drawLineSeries(this.renderedPoints, fullRender);
                    }
                };
                LineSeries.prototype.drawLineFill = function (renderedPoints, fullRender) {
                    if(renderedPoints.length > 0) {
                        var startIndex = 0;
                        var endIndex = renderedPoints.length - 1;
                        var startX = this.info.gridX.min;
                        var rangeX = this.info.gridX.range;
                        var endX = this.info.gridX.max;
                        var x = 0;
                        var y = 0;
                        var hasMovedToStart = false;
                        this.context.save();
                        this.context.beginPath();
                        var previousPoint = renderedPoints[0];
                        this.context.beginPath();
                        this.context.fillStyle = this.colorScheme.lineFillColor;
                        this.context.strokeStyle = this.colorScheme.lineColor;
                        for(var i = startIndex; i <= endIndex; i++) {
                            var point = renderedPoints[i];
                            if(!hasMovedToStart) {
                                this.context.moveTo(point.xPx, point.yPx);
                                hasMovedToStart = true;
                            } else {
                                this.context.lineTo(point.xPx, point.yPx);
                            }
                            previousPoint = point;
                        }
                        if(this.info.chartDrawFill) {
                            y = this.getYCoordinate(0, this.info.chartRect.top, this.info.chartRect.height);
                            this.context.lineTo(previousPoint.xPx, y);
                            this.context.lineTo(fullRender ? 0 : renderedPoints[0].xPx, y);
                            this.context.closePath();
                            this.context.fill();
                        } else {
                            this.context.stroke();
                        }
                        this.context.restore();
                    }
                };
                LineSeries.prototype.drawLineSeries = function (renderedPoints, fullRender) {
                    if(renderedPoints.length > 0) {
                        this.context.save();
                        if(this.info.chartDrawFill) {
                            this.context.beginPath();
                            this.context.lineWidth = (this.info.chartRect.height < 100 ? 1 : 2);
                            this.context.fillStyle = this.colorScheme.lineFillColor;
                            this.context.strokeStyle = this.colorScheme.lineColor;
                            for(var i = 0; i < renderedPoints.length; i++) {
                                var rp = renderedPoints[i];
                                if(i === 0) {
                                    this.context.moveTo(renderedPoints[i].xPx, renderedPoints[i].yPx - 0.5);
                                } else {
                                    this.context.lineTo(rp.xPx, Math.round(rp.yPx) - 0.5);
                                }
                            }
                            this.context.stroke();
                        }
                        this.context.restore();
                    }
                };
                return LineSeries;
            })(ChartSeries);
            DiagnosticsHub.LineSeries = LineSeries;            
            Microsoft.VisualStudio.DiagnosticsHub.RegisterNamespace.register("Microsoft.VisualStudio.DiagnosticsHub.MultiLineGraph");
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (Common) {
                var Helper = (function () {
                    function Helper() { }
                    Helper.doesObjectExist = function doesObjectExist(objectName, type, context) {
                        type = type || "object";
                        context = context || window;
                        if(typeof objectName !== "string" || objectName.length === 0 || typeof context === "undefined" || typeof context !== "object" || context === null) {
                            return false;
                        }
                        var names = objectName.split("."), length = names.length, obj = context, i = 0;
                        for(; i < length - 1; i++) {
                            obj = obj[names[i]];
                            if(typeof obj === "undefined" || typeof obj !== "object" || obj === null) {
                                return false;
                            }
                        }
                        obj = obj[names[i]];
                        if(typeof obj === type) {
                            return true;
                        }
                        return false;
                    };
                    return Helper;
                })();
                Common.Helper = Helper;                
            })(DiagnosticsHub.Common || (DiagnosticsHub.Common = {}));
            var Common = DiagnosticsHub.Common;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (Common) {
                (function (DependencyManagerStateType) {
                    DependencyManagerStateType._map = [];
                    DependencyManagerStateType.NotReady = -1;
                    DependencyManagerStateType.Ready = 0;
                    DependencyManagerStateType.Loading = 1;
                    DependencyManagerStateType.Done = 2;
                })(Common.DependencyManagerStateType || (Common.DependencyManagerStateType = {}));
                var DependencyManagerStateType = Common.DependencyManagerStateType;
                var DependencyManager = (function () {
                    function DependencyManager() {
                        this._deps = [];
                        this._loadedDeps = [];
                        this._notLoadedDeps = [];
                        this._totalDeps = 0;
                        this._state = DependencyManagerStateType.Ready;
                    }
                    DependencyManager.prototype.addDependencies = function (dependencyArray) {
                        if(this._state === DependencyManagerStateType.Loading) {
                            throw new Error("DependencyManager loading other dependency.");
                        } else if(dependencyArray && dependencyArray.length > 0) {
                            this._deps = this._deps.concat(dependencyArray);
                            this._totalDeps += dependencyArray.length;
                        }
                    };
                    DependencyManager.prototype.getState = function () {
                        return this._state;
                    };
                    DependencyManager.prototype.loadDependencies = function (callback, contextObject) {
                        if(this._state === DependencyManagerStateType.Loading) {
                            throw new Error("DependencyManager loading other dependency.");
                        } else {
                            this._callback = callback;
                            this._loadNextDependency((contextObject || document));
                        }
                    };
                    DependencyManager.prototype.loadCss = function (fullCssFilePath) {
                        if(typeof fullCssFilePath !== "string" && fullCssFilePath.lastIndexOf(".css") !== fullCssFilePath.length - 4) {
                            throw new Error("file name is null or undefined.");
                        }
                        var nameArr = fullCssFilePath.substring(fullCssFilePath.lastIndexOf("\\") + 1, fullCssFilePath.lastIndexOf(".css"));
                        var oldCss = document.getElementById(nameArr);
                        if(!oldCss) {
                            var link = document.createElement("link");
                            link.rel = "stylesheet";
                            link.type = "text/css";
                            link.href = fullCssFilePath;
                            link.media = "all";
                            link.id = nameArr;
                            document.getElementsByTagName("head")[0].appendChild(link);
                        }
                    };
                    DependencyManager.prototype._isDone = function () {
                        if(this._deps.length === 0 && (this._loadedDeps.length + this._notLoadedDeps.length) === this._totalDeps) {
                            this._state = DependencyManagerStateType.Done;
                            if(this._callback) {
                                this._callback.apply(this, [
                                    this._loadedDeps
                                ], [
                                    this._notLoadedDeps
                                ]);
                            }
                            return true;
                        } else {
                            return false;
                        }
                    };
                    DependencyManager.prototype._loadNextDependency = function (contextObject) {
                        if(!this._isDone() && this._deps.length !== 0) {
                            this._state = DependencyManagerStateType.Loading;
                            var dep = this._deps.shift();
                            if(dep.objType && Common.Helper.doesObjectExist(dep.objType, "function")) {
                                this._loadedDeps.push(dep);
                                this._loadNextDependency(contextObject);
                                return;
                            }
                            var scr = contextObject.createElement("script");
                            scr.type = "text/javascript";
                            scr.src = dep.url;
                            if(!dep.async) {
                                if(scr.readyState) {
                                    scr.onreadystatechange = function () {
                                        if(scr.readyState === "loaded" || scr.readyState === "complete") {
                                            scr.onreadystatechange = null;
                                            this._loadedDeps.push(dep);
                                            DiagnosticsHub.RegisterNamespace.register(dep.objType);
                                            this._loadNextDependency(contextObject);
                                        }
                                    }.bind(this);
                                } else {
                                    scr.onload = function () {
                                        this._loadedDeps.push(dep);
                                        DiagnosticsHub.RegisterNamespace.register(dep.objType);
                                        this._loadNextDependency(contextObject);
                                    }.bind(this);
                                    scr.onerror = function () {
                                        this._notLoadedDeps.push(dep);
                                        this._loadNextDependency(contextObject);
                                    }.bind(this);
                                }
                            } else {
                                if(scr.readyState) {
                                    scr.onreadystatechange = function () {
                                        if(scr.readyState === "loaded" || scr.readyState === "complete") {
                                            scr.onreadystatechange = null;
                                            this._loadedDeps.push(dep);
                                            DiagnosticsHub.RegisterNamespace.register(dep.objType);
                                            this._isDone();
                                        }
                                    }.bind(this);
                                } else {
                                    scr.onload = function () {
                                        this._loadedDeps.push(dep);
                                        DiagnosticsHub.RegisterNamespace.register(dep.objType);
                                        this._isDone();
                                    }.bind(this);
                                    scr.onerror = function () {
                                        this._notLoadedDeps.push(dep);
                                        this._isDone();
                                    }.bind(this);
                                }
                                this._loadNextDependency(contextObject);
                            }
                            contextObject.getElementsByTagName("head")[0].appendChild(scr);
                        }
                    };
                    return DependencyManager;
                })();
                Common.DependencyManager = DependencyManager;                
            })(DiagnosticsHub.Common || (DiagnosticsHub.Common = {}));
            var Common = DiagnosticsHub.Common;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var Toolbar = (function () {
                function Toolbar(config) {
                    this._containerCss = "toolbar-container";
                    this._buttonCss = "toolbar-button";
                    this._buttonDisabledCss = "toolbar-button-disabled";
                    this._zoomInButtonCss = "zoomin-button-image";
                    this._zoomOutButtonCss = "zoomout-button-image";
                    this._clearSelectionButtonCss = "clearselection-button-image";
                    this._zoomInButtonDisabledCss = "zoomin-button-image-disabled";
                    this._zoomOutButtonDisabledCss = "zoomout-button-image-disabled";
                    this._clearSelectionButtonDisabledCss = "clearselection-button-image-disabled";
                    this._buttonImageCss = "button-image";
                    this._buttonTextCss = "button-text";
                    this._buttonTextDisabledCss = "button-text-disabled";
                    this._focused = false;
                    if(!config) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    this._config = config;
                    this._zoomInClickHandler = this.zoomInHandler.bind(this);
                    this._zoomInKeyDownHandler = this.onZoomInKeyDown.bind(this);
                    this._zoomOutClickHandler = this.zoomOutHandler.bind(this);
                    this._zoomOutKeyDownHandler = this.onZoomOutKeyDown.bind(this);
                    this._clearSelectionClickHandler = this.selectionHandler.bind(this);
                    this._clearSelectionKeyDownHandler = this.onClearSelectionKeyDown.bind(this);
                    this._tabFocusHandler = this.onTabFocus.bind(this);
                    this._tabBlurHandler = this.onTabBlur.bind(this);
                }
                Toolbar.prototype.render = function () {
                    if(this._config && this._config.containerId) {
                        var parent = document.getElementById(this._config.containerId);
                        var container = document.createElement("div");
                        container.classList.add(this._containerCss);
                        parent.appendChild(container);
                        this._zoomIn = this.createButton(this._zoomInButtonDisabledCss, Plugin.Resources.getString("ToolbarZoomInButton"), this._zoomInClickHandler, this._zoomInKeyDownHandler, Plugin.Resources.getString("ToolbarZoomInAriaLabel"));
                        container.appendChild(this._zoomIn);
                        this._zoomReset = this.createButton(this._zoomOutButtonDisabledCss, Plugin.Resources.getString("ToolbarZoomOutButton"), this._zoomOutClickHandler, this._zoomOutKeyDownHandler, Plugin.Resources.getString("ToolbarZoomOutAriaLabel"));
                        container.appendChild(this._zoomReset);
                        this._clearSelection = this.createButton(this._clearSelectionButtonDisabledCss, Plugin.Resources.getString("ToolbarClearSelectionButton"), this._clearSelectionClickHandler, this._clearSelectionKeyDownHandler, Plugin.Resources.getString("ToolbarcClearSelectionAriaLabel"));
                        container.appendChild(this._clearSelection);
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                    }
                };
                Toolbar.prototype.addEventListener = function (element, clickHandler, keyboardHandler) {
                    element.addEventListener("click", clickHandler);
                    element.addEventListener("focus", this._tabFocusHandler);
                    element.addEventListener("blur", this._tabBlurHandler);
                    element.addEventListener("keydown", keyboardHandler);
                };
                Toolbar.prototype.removeEventListener = function (element, clickHandler, keyboardHandler) {
                    element.removeEventListener("click", clickHandler);
                    element.removeEventListener("focus", this._tabFocusHandler);
                    element.removeEventListener("blur", this._tabBlurHandler);
                    element.removeEventListener("keydown", keyboardHandler);
                };
                Toolbar.prototype.setButtonState = function (state) {
                    if(state) {
                        if(typeof state.isZoomInEnabled !== "undefined" && this._zoomIn) {
                            if(state.isZoomInEnabled && this._zoomIn.disabled) {
                                this._zoomIn.disabled = false;
                                var image = this._zoomIn.getElementsByClassName(this._buttonImageCss)[0];
                                image.classList.remove(this._zoomInButtonDisabledCss);
                                image.classList.add(this._zoomInButtonCss);
                                var text = this._zoomIn.getElementsByClassName(this._buttonTextCss)[0];
                                text.classList.remove(this._buttonTextDisabledCss);
                                this._zoomIn.tabIndex = 0;
                                this._zoomIn.classList.remove(this._buttonDisabledCss);
                                this._zoomIn.classList.add(this._buttonCss);
                                this.addEventListener(this._zoomIn, this._zoomInClickHandler, this._zoomInKeyDownHandler);
                            } else if(!state.isZoomInEnabled && !this._zoomIn.disabled) {
                                this._zoomIn.disabled = true;
                                var image = this._zoomIn.getElementsByClassName(this._buttonImageCss)[0];
                                image.classList.add(this._zoomInButtonDisabledCss);
                                image.classList.remove(this._zoomInButtonCss);
                                var text = this._zoomIn.getElementsByClassName(this._buttonTextCss)[0];
                                text.classList.add(this._buttonTextDisabledCss);
                                this._zoomIn.tabIndex = -1;
                                this._zoomIn.classList.add(this._buttonDisabledCss);
                                this._zoomIn.classList.remove(this._buttonCss);
                                this.removeEventListener(this._zoomIn, this._zoomInClickHandler, this._zoomInKeyDownHandler);
                            }
                        }
                        if(typeof state.isResetZoomEnabled !== "undefined" && this._zoomReset) {
                            if(state.isResetZoomEnabled && this._zoomReset.disabled) {
                                this._zoomReset.disabled = false;
                                var image = this._zoomReset.getElementsByClassName(this._buttonImageCss)[0];
                                image.classList.remove(this._zoomOutButtonDisabledCss);
                                image.classList.add(this._zoomOutButtonCss);
                                var text = this._zoomReset.getElementsByClassName(this._buttonTextCss)[0];
                                text.classList.remove(this._buttonTextDisabledCss);
                                this._zoomReset.tabIndex = 0;
                                this._zoomReset.classList.remove(this._buttonDisabledCss);
                                this._zoomReset.classList.add(this._buttonCss);
                                this.addEventListener(this._zoomReset, this._zoomOutClickHandler, this._zoomOutKeyDownHandler);
                            } else if(!state.isResetZoomEnabled && !this._zoomReset.disabled) {
                                this._zoomReset.disabled = true;
                                var image = this._zoomReset.getElementsByClassName(this._buttonImageCss)[0];
                                image.classList.add(this._zoomOutButtonDisabledCss);
                                image.classList.remove(this._zoomOutButtonCss);
                                var text = this._zoomReset.getElementsByClassName(this._buttonTextCss)[0];
                                text.classList.add(this._buttonTextDisabledCss);
                                this._zoomReset.tabIndex = -1;
                                this._zoomReset.classList.add(this._buttonDisabledCss);
                                this._zoomReset.classList.remove(this._buttonCss);
                                this.removeEventListener(this._zoomReset, this._zoomOutClickHandler, this._zoomOutKeyDownHandler);
                            }
                        }
                        if(typeof state.isClearSelectionEnabled !== "undefined" && this._clearSelection) {
                            if(state.isClearSelectionEnabled && this._clearSelection.disabled) {
                                this._clearSelection.disabled = false;
                                var image = this._clearSelection.getElementsByClassName(this._buttonImageCss)[0];
                                image.classList.remove(this._clearSelectionButtonDisabledCss);
                                image.classList.add(this._clearSelectionButtonCss);
                                var text = this._clearSelection.getElementsByClassName(this._buttonTextCss)[0];
                                text.classList.remove(this._buttonTextDisabledCss);
                                this._clearSelection.tabIndex = 0;
                                this._clearSelection.classList.remove(this._buttonDisabledCss);
                                this._clearSelection.classList.add(this._buttonCss);
                                this.addEventListener(this._clearSelection, this._clearSelectionClickHandler, this._clearSelectionKeyDownHandler);
                            } else if(!state.isClearSelectionEnabled && !this._clearSelection.disabled) {
                                this._clearSelection.disabled = true;
                                var image = this._clearSelection.getElementsByClassName(this._buttonImageCss)[0];
                                image.classList.add(this._clearSelectionButtonDisabledCss);
                                image.classList.remove(this._clearSelectionButtonCss);
                                var text = this._clearSelection.getElementsByClassName(this._buttonTextCss)[0];
                                text.classList.add(this._buttonTextDisabledCss);
                                this._clearSelection.tabIndex = -1;
                                this._clearSelection.classList.add(this._buttonDisabledCss);
                                this._clearSelection.classList.remove(this._buttonCss);
                                this.removeEventListener(this._clearSelection, this._clearSelectionClickHandler, this._clearSelectionKeyDownHandler);
                            }
                        }
                    }
                };
                Toolbar.prototype.zoomInHandler = function (evt) {
                    if(this._config.zoomInHandler) {
                        this._config.zoomInHandler();
                    }
                };
                Toolbar.prototype.selectionHandler = function (evt) {
                    if(this._config.selectionHandler) {
                        this._config.selectionHandler();
                    }
                };
                Toolbar.prototype.zoomOutHandler = function (evt) {
                    if(this._config.zoomOutHandler) {
                        this._config.zoomOutHandler();
                    }
                };
                Toolbar.prototype.onTabFocus = function (e) {
                    this._focused = true;
                };
                Toolbar.prototype.onTabBlur = function (e) {
                    this._focused = false;
                };
                Toolbar.prototype.onZoomInKeyDown = function (e) {
                    if(this._focused && DiagnosticsHub.Common.KeyCodes.Enter === e.keyCode) {
                        this.zoomInHandler(null);
                    }
                };
                Toolbar.prototype.onZoomOutKeyDown = function (e) {
                    if(this._focused && DiagnosticsHub.Common.KeyCodes.Enter === e.keyCode) {
                        this.zoomOutHandler(null);
                    }
                };
                Toolbar.prototype.onClearSelectionKeyDown = function (e) {
                    if(this._focused && DiagnosticsHub.Common.KeyCodes.Enter === e.keyCode) {
                        this.selectionHandler(null);
                    }
                };
                Toolbar.prototype.createButton = function (imageCss, text, clickHandler, keyboardHandler, ariaLabel) {
                    var element = document.createElement("div");
                    element.classList.add(this._buttonDisabledCss);
                    element.disabled = true;
                    var image = document.createElement("div");
                    image.classList.add(imageCss);
                    image.classList.add(this._buttonImageCss);
                    element.appendChild(image);
                    var textDiv = document.createElement("div");
                    textDiv.innerHTML = text;
                    textDiv.classList.add(this._buttonTextCss);
                    textDiv.classList.add(this._buttonTextDisabledCss);
                    element.appendChild(textDiv);
                    element.setAttribute("role", "button");
                    element.setAttribute("aria-label", ariaLabel);
                    return element;
                };
                return Toolbar;
            })();
            DiagnosticsHub.Toolbar = Toolbar;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (DragDirection) {
                DragDirection._map = [];
                DragDirection._map[0] = "None";
                DragDirection.None = 0;
                DragDirection._map[1] = "Left";
                DragDirection.Left = 1;
                DragDirection._map[2] = "Right";
                DragDirection.Right = 2;
            })(DiagnosticsHub.DragDirection || (DiagnosticsHub.DragDirection = {}));
            var DragDirection = DiagnosticsHub.DragDirection;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var SwimLane = (function () {
                function SwimLane(config) {
                    this._swimLaneHeaderCss = "swimlane-header";
                    this._swimLaneBodyCss = "swimlane-body";
                    this._graphDivCss = "graph-div";
                    this._verticalLineCss = "swimlane-vertical-line";
                    this._minSelectionWidthInPixels = 10;
                    this._minimumGraphHeight = 50;
                    this._maximumGraphHeight = 200;
                    this._graphDataSource = [];
                    this._thresholdLineTopMarginBuffer = 1.4;
                    this._isVisible = true;
                    if(config) {
                        this._config = config;
                    }
                    if(this._config.containerId) {
                        this._container = document.getElementById(this._config.containerId);
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1000"));
                    }
                    this.initialize();
                    this._sqmRuler = new DiagnosticsHub.Sqm.Ruler();
                }
                Object.defineProperty(SwimLane.prototype, "isVisible", {
                    get: function () {
                        return this._isVisible;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SwimLane.prototype, "graphContainerClientWidth", {
                    get: function () {
                        if(this._graphContainer && (this._graphContainerClientWidth === null || typeof this._graphContainerClientWidth === "undefined")) {
                            this._graphContainerClientWidth = this._graphContainer.clientWidth;
                        }
                        return this._graphContainerClientWidth;
                    },
                    set: function (value) {
                        this._graphContainerClientWidth = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                SwimLane.prototype.addEventListener = function (eventType, func) {
                    if(this._publisher) {
                        this._publisher.addEventListener(eventType, func);
                    }
                };
                SwimLane.prototype.removeEventListener = function (eventType, func) {
                    if(this._publisher) {
                        this._publisher.removeEventListener(eventType, func);
                    }
                };
                SwimLane.prototype.render = function () {
                    Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_SwimlaneFullRenderBegin);
                    while(this._container.hasChildNodes()) {
                        this._container.removeChild(this._container.firstChild);
                    }
                    this._graphConfig = this._graph.getGraphConfiguration();
                    this.renderHeader();
                    this.renderBody();
                    if(this._config.header.title.isBodyExpanded === null || typeof this._config.header.title.isBodyExpanded === "undefined" || this._config.header.title.isBodyExpanded) {
                        this._graph.render();
                    } else {
                        this.setGraphVisibility(false);
                    }
                    Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_SwimlaneFullRenderEnd);
                };
                SwimLane.prototype.zoom = function (current, selection) {
                    if(current) {
                        if(this._graph && this._graph.setViewPortTimeRange) {
                            this._graph.setViewPortTimeRange(current);
                            this._selectionTimeRange = current;
                            if(selection) {
                                this._selectionTimeRange = selection;
                            }
                            if(this._body.style.display !== "none") {
                                this.calculateHandlerPosition();
                                this.drawSelection();
                                this.drawVerticalLines();
                            }
                        } else {
                            throw new Error(Plugin.Resources.getErrorString("JSProfiler.1003"));
                        }
                    }
                };
                SwimLane.prototype.setSelection = function (selection) {
                    if(selection) {
                        this._selectionTimeRange = selection;
                        if(this._body.style.display !== "none") {
                            this.calculateHandlerPosition();
                            this.drawSelection();
                        }
                    }
                };
                SwimLane.prototype.getSelection = function () {
                    return this._selectionTimeRange;
                };
                SwimLane.prototype.addGraphSeriesData = function (counterId, points, fullRender) {
                    if(points) {
                        this._graph.addSeriesData(counterId, points, fullRender);
                    }
                };
                SwimLane.prototype.updateTimeRange = function (viewPort) {
                    if(viewPort) {
                        this._graph.setViewPortTimeRange(viewPort);
                        this.drawVerticalLines();
                    }
                };
                SwimLane.prototype.setGraphState = function (state) {
                    if(state && this._graph) {
                        this._graph.setGraphState(state);
                    }
                };
                SwimLane.prototype.removeInvalidPoints = function (base) {
                    if(this._graph && base) {
                        this._graph.removeInvalidPoints(base);
                    }
                };
                SwimLane.prototype.resize = function (e) {
                    if(this.graphContainerClientWidth === this._graphContainer.clientWidth) {
                        return;
                    }
                    if(this._graphContainer) {
                        this.graphContainerClientWidth = this._graphContainer.clientWidth;
                    }
                    if(this._config.isSelectionEnabled) {
                        var handlePosition = this._selectionTimeRange;
                        var current = this._graph.getViewPortTimeRange();
                        var lValue = this.convertTimestampToPixel(handlePosition.begin, current);
                        var rValue = this.convertTimestampToPixel(handlePosition.end, current);
                        var positionChanged = false;
                        if(rValue - lValue < this._minSelectionWidthInPixels) {
                            if(lValue + this._minSelectionWidthInPixels <= this.graphContainerClientWidth) {
                                rValue = lValue + this._minSelectionWidthInPixels;
                                positionChanged = true;
                            } else if(rValue - this._minSelectionWidthInPixels >= 0) {
                                lValue = rValue - this._minSelectionWidthInPixels;
                                positionChanged = true;
                            }
                        }
                        this._leftUnselectedRegion.style.width = lValue + "px";
                        this._rightUnselectedRegion.style.left = rValue + "px";
                        this._rightUnselectedRegion.style.width = Math.ceil(this.graphContainerClientWidth - rValue) + "px";
                        this._selectionPixelStartX = lValue;
                        this._selectionPixelWidth = rValue - lValue;
                        if(positionChanged) {
                            this.raiseSelectionChanged(false);
                        }
                    }
                    if(this._graph && this._graph.resize) {
                        this._graph.resize(e);
                    }
                    this.drawVerticalLines();
                };
                SwimLane.prototype.deinitialize = function () {
                    if(this._resizeHandler) {
                        window.removeEventListener("resize", this._resizeHandler);
                    }
                    if(this._graph) {
                        this._graph.deinitialize();
                    }
                };
                SwimLane.prototype.processThresholdValueChange = function () {
                    var multilineGraph = this._graph;
                    if(!multilineGraph) {
                        return;
                    }
                    var newGridYMaxValue = Math.max(this._thresholdValueSelector.currentThresholdValue * this._thresholdLineTopMarginBuffer, multilineGraph.maxSeriesValue * multilineGraph.chartAxisIncreaseRatio);
                    var newGridYMaxValueInUnits = multilineGraph.convertToUnitsProcessor(newGridYMaxValue);
                    var thresholdValueInGraphUnits = parseFloat(multilineGraph.convertToUnitsProcessor(this._thresholdValueSelector.currentThresholdValue, newGridYMaxValueInUnits.unit).value);
                    var newAxes = [
                        {
                            value: thresholdValueInGraphUnits,
                            isThresholdAxis: true
                        }
                    ];
                    if(this._leftScale) {
                        this._leftScale.config.maximum = parseFloat(newGridYMaxValueInUnits.value);
                        this._leftScale.config.axes = newAxes;
                        this._leftScale.render();
                    }
                    if(this._rightScale) {
                        this._rightScale.config.maximum = parseFloat(newGridYMaxValueInUnits.value);
                        this._rightScale.config.axes = newAxes;
                        this._rightScale.render();
                    }
                    if(this._axes) {
                        this._axes.config.axes = newAxes;
                        this._axes.render();
                    }
                    if(this._header) {
                        this._header.title.setUnit(newGridYMaxValueInUnits.unit);
                    }
                    multilineGraph._graphInfo.gridY.max = newGridYMaxValue;
                    multilineGraph.graphUnitOverride = newGridYMaxValueInUnits.unit;
                    multilineGraph.render(true);
                };
                SwimLane.getDragDirection = function getDragDirection(selectionWidth) {
                    if(selectionWidth > 0) {
                        return DiagnosticsHub.DragDirection.Right;
                    } else if(selectionWidth < 0) {
                        return DiagnosticsHub.DragDirection.Left;
                    }
                    return DiagnosticsHub.DragDirection.None;
                };
                SwimLane.prototype.initialize = function () {
                    if(this._config.isSelectionEnabled) {
                        this._mouseupHandler = this.stopSelection.bind(this);
                        this._dragHandler = this.drag.bind(this);
                        this._startSelection = this.startSelection.bind(this);
                        this._onDraggingAnimation = this.onDraggingAnimation.bind(this);
                    }
                    this._resizeHandler = this.resize.bind(this);
                    this._titleClickHandler = this.setBodyVisibility.bind(this);
                    window.addEventListener("resize", this._resizeHandler);
                    if(this._config.body.events) {
                        this._publisher = new DiagnosticsHub.Publisher(this._config.body.events);
                    }
                    if(this._config.minSelectionWidthInPixels) {
                        this._minSelectionWidthInPixels = this._config.minSelectionWidthInPixels;
                    }
                    if(this._config.getVerticalRulerLinePositions) {
                        this._getVerticalRulerLinePositions = this._config.getVerticalRulerLinePositions;
                    }
                    this._selectionTimeRange = this._config.timeRange;
                    this._graphId = this._config.containerId + "_graph";
                    if(this._config.body && this._config.body.graph) {
                        if(this._config.body.graph.height === null || typeof this._config.body.graph.height === "undefined" || this._config.body.graph.height < this._minimumGraphHeight) {
                            this._config.body.graph.height = this._minimumGraphHeight;
                        } else if(this._config.body.graph.height > this._maximumGraphHeight) {
                            this._config.body.graph.height = this._maximumGraphHeight;
                        }
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    var className = this._config.body.graph.registeredClass;
                    var args = {
                        timeRange: this._config.timeRange,
                        containerId: this._graphId,
                        events: [],
                        height: this._config.body.graph.height,
                        scale: {
                            minimum: this._config.body.leftScale.minimum || this._config.body.rightScale.minimum,
                            maximum: this._config.body.leftScale.maximum || this._config.body.rightScale.maximum,
                            axes: []
                        },
                        invokeEventListener: this.invokeGraphEventListener.bind(this),
                        loadCss: this._config.body.graph.loadCss,
                        jsonConfig: this._config.body.graph.jsonConfig,
                        legend: this._config.header.legend,
                        unit: "",
                        resources: this._config.body.graph.resources,
                        description: this._config.body.graph.description,
                        pathToScriptFolder: this._config.body.graph.pathToScriptFolder
                    };
                    this._graph = new className(args);
                    this._viewEventManager = Microsoft.VisualStudio.DiagnosticsHub.getViewEventManager();
                    this._viewEventManager.selectionChanged.addEventListener(this.setSelectionChanged.bind(this));
                };
                SwimLane.prototype.setSelectionChanged = function (args) {
                    Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_SwimlaneSelectionHandlingBegin);
                    if(args && args.invoker !== this._graphId && args.position && !args.position.equals(this._selectionTimeRange)) {
                        this.setSelection(args.position);
                    }
                    Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_SwimlaneSelectionHandlingEnd);
                };
                SwimLane.prototype.convertTimestampToPixel = function (time, currentTimeRange) {
                    var pixels = 0;
                    if(currentTimeRange.elapsed.greater(DiagnosticsHub.BigNumber.zero)) {
                        var timeFromRangeStart = parseInt(DiagnosticsHub.BigNumber.subtract(time, currentTimeRange.begin).value);
                        var range = parseInt(currentTimeRange.elapsed.value);
                        pixels = (timeFromRangeStart / range) * this.graphContainerClientWidth;
                    }
                    return pixels;
                };
                SwimLane.prototype.renderHeader = function () {
                    var headerDiv = document.createElement("div");
                    headerDiv.classList.add(this._swimLaneHeaderCss);
                    this._container.appendChild(headerDiv);
                    this._config.header.title.titleText = this._config.header.title.titleText;
                    this._config.header.title.unit = this._graphConfig.unit;
                    this._config.header.legend = this._graphConfig.legend;
                    this._header = new Header(this._config.header, headerDiv);
                    this._header.render();
                    this._header.title.registerCallback(DiagnosticsHub.TitleEvents.Click, this._titleClickHandler);
                    this._header.title.registerCallback(DiagnosticsHub.TitleEvents.KeyPress, this._titleClickHandler);
                };
                SwimLane.prototype.renderBody = function () {
                    if(this._config.body) {
                        if(!this._body) {
                            this._body = document.createElement("div");
                            this._body.classList.add(this._swimLaneBodyCss);
                            this._body.style.height = this._config.body.graph.height + "px";
                            this._container.appendChild(this._body);
                        } else {
                            while(this._body.hasChildNodes()) {
                                this._body.removeChild(this._body.firstChild);
                            }
                        }
                        var scale;
                        if(this._config.body.leftScale) {
                            this._config.body.leftScale.minimum = this._graphConfig.scale.minimum;
                            this._config.body.leftScale.maximum = this._graphConfig.scale.maximum;
                            this._config.body.leftScale.axes = this._graphConfig.scale.axes;
                            this._leftScale = new Scale(this._config.body.leftScale, this._body);
                            this._leftScale.render();
                            scale = this._config.body.leftScale;
                        }
                        if(this._config.body.rightScale) {
                            this._config.body.rightScale.minimum = this._graphConfig.scale.minimum;
                            this._config.body.rightScale.maximum = this._graphConfig.scale.maximum;
                            this._config.body.rightScale.axes = this._graphConfig.scale.axes;
                            this._rightScale = new Scale(this._config.body.rightScale, this._body);
                            this._rightScale.render();
                            scale = this._config.body.rightScale;
                        }
                        this._graphContainer = document.createElement("div");
                        this._graphContainer.classList.add(this._graphDivCss);
                        if(typeof this._config.body.graph.jsonConfig.GraphBehaviour === "number" && this._config.body.graph.jsonConfig.GraphBehaviour === DiagnosticsHub.GraphBehaviourType.PostMortem) {
                            this._graphContainer.addEventListener("mouseenter", this.addCursorStyle.bind(this));
                            this._graphContainer.addEventListener("mouseleave", this.removeCursorStyle.bind(this));
                        }
                        if(this._config.isSelectionEnabled) {
                            this._graphContainer.addEventListener("mousedown", this._startSelection);
                        }
                        this._body.appendChild(this._graphContainer);
                        var graph = document.createElement("div");
                        graph.id = this._graphId;
                        this._graphContainer.appendChild(graph);
                        this.drawVerticalLines();
                        if(scale) {
                            this._axes = new Axes(scale, this._graphContainer);
                            this._axes.render();
                        }
                        this.calculateHandlerPosition();
                        if(this._config.isSelectionEnabled) {
                            this.initializeUnselectedRegions();
                        }
                        if(this._config.body.graph.jsonConfig.ThresholdLines) {
                            this._thresholdValueSelector = new ThresholdValueSelector(this, this._config, this._header);
                            this._thresholdValueSelector.render();
                            this._header.title.registerCallback(VisualStudio.DiagnosticsHub.TitleEvents.Click, this._titleClickHandler);
                            this._header.title.registerCallback(VisualStudio.DiagnosticsHub.TitleEvents.KeyPress, this._titleClickHandler);
                        }
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                };
                SwimLane.prototype.addCursorStyle = function (evt) {
                    if(this._graphContainer) {
                        this._graphContainer.style.cursor = "pointer";
                    }
                };
                SwimLane.prototype.removeCursorStyle = function (evt) {
                    if(this._graphContainer) {
                        this._graphContainer.style.cursor = "auto";
                    }
                };
                SwimLane.prototype.drawVerticalLines = function () {
                    if(this._graphContainer) {
                        var children = this._graphContainer.getElementsByClassName(this._verticalLineCss);
                        while(children.length > 0) {
                            this._graphContainer.removeChild(children[0]);
                        }
                        var current = this._graph.getViewPortTimeRange();
                        var lines = this._config.getVerticalRulerLinePositions(current, this.graphContainerClientWidth);
                        for(var i = 0; i < lines.length; i++) {
                            var line = document.createElement("div");
                            line.classList.add(this._verticalLineCss);
                            line.style.left = lines[i] + "%";
                            this._graphContainer.appendChild(line);
                        }
                    }
                };
                SwimLane.prototype.calculateHandlerPosition = function () {
                    if(this._graph && this._graph.getViewPortTimeRange) {
                        var current = this._graph.getViewPortTimeRange();
                        var timeFromRangeStart = parseInt(DiagnosticsHub.BigNumber.subtract(this._selectionTimeRange.begin, current.begin).value);
                        this._selectionPixelStartX = (timeFromRangeStart / parseInt(current.elapsed.value)) * this.graphContainerClientWidth;
                        this._selectionPixelWidth = parseInt(this._selectionTimeRange.elapsed.value) / parseInt(current.elapsed.value) * this.graphContainerClientWidth;
                    }
                };
                SwimLane.prototype.getSelectionStartWidth = function (event) {
                    var mouseX = event.clientX - this._graphContainer.offsetLeft;
                    return mouseX;
                };
                SwimLane.prototype.drag = function (event) {
                    var xPixel = this.getSelectionStartWidth(event);
                    if(xPixel >= 0 && xPixel <= this.graphContainerClientWidth) {
                        this._dragDirection = SwimLane.getDragDirection(xPixel - this._initialSelectionPixelStartX);
                        this._selectionPixelWidth = Math.abs(xPixel - this._initialSelectionPixelStartX);
                        if(this._dragDirection === DiagnosticsHub.DragDirection.Left) {
                            this._selectionPixelStartX = this._initialSelectionPixelStartX - this._selectionPixelWidth;
                        }
                    }
                    event.stopPropagation();
                };
                SwimLane.prototype.drawSelection = function () {
                    this._leftUnselectedRegion.style.width = this._selectionPixelStartX + "px";
                    this._rightUnselectedRegion.style.left = (this._selectionPixelStartX + this._selectionPixelWidth) + "px";
                    this._rightUnselectedRegion.style.width = (this.graphContainerClientWidth - (this._selectionPixelStartX + this._selectionPixelWidth)) + "px";
                };
                SwimLane.prototype.ensureMinSelectionWidth = function () {
                    if(typeof this._selectionPixelStartX === "undefined") {
                        return;
                    }
                    if(Math.abs(this._selectionPixelWidth) < this._minSelectionWidthInPixels) {
                        this._selectionPixelWidth = this._minSelectionWidthInPixels;
                        switch(this._dragDirection) {
                            case DiagnosticsHub.DragDirection.Right:
                                if(this._selectionPixelStartX + this._selectionPixelWidth > this.graphContainerClientWidth) {
                                    this._selectionPixelStartX = this.graphContainerClientWidth - this._selectionPixelWidth;
                                }
                                break;
                            case DiagnosticsHub.DragDirection.Left:
                                if(this._selectionPixelStartX - this._selectionPixelWidth < 0) {
                                    this._selectionPixelStartX = 0;
                                } else if(this._selectionPixelStartX + this._selectionPixelWidth > this.graphContainerClientWidth) {
                                    this._selectionPixelStartX = this.graphContainerClientWidth - this._selectionPixelWidth;
                                } else {
                                    this._selectionPixelStartX = this._initialSelectionPixelStartX - this._selectionPixelWidth;
                                }
                                break;
                            default:
                                if(this._selectionPixelStartX + (this._selectionPixelWidth / 2) > this.graphContainerClientWidth) {
                                    this._selectionPixelStartX = this.graphContainerClientWidth - this._selectionPixelWidth;
                                } else if(this._selectionPixelStartX - (this._selectionPixelWidth / 2) < 0) {
                                    this._selectionPixelStartX = 0;
                                } else {
                                    this._selectionPixelStartX = this._selectionPixelStartX - (this._selectionPixelWidth / 2);
                                }
                                break;
                        }
                    }
                };
                SwimLane.prototype.convertChartAreaPercentToDataValue = function (pixel) {
                    var currentTimeRange = this._graph.getViewPortTimeRange();
                    return DiagnosticsHub.BigNumber.addNumber(currentTimeRange.begin, pixel * (parseInt(currentTimeRange.elapsed.value) / this._graphContainer.clientWidth));
                };
                SwimLane.prototype.initializeUnselectedRegions = function () {
                    this._leftUnselectedRegion = this.createUnselectedRegion(0, this._selectionPixelStartX);
                    this._rightUnselectedRegion = this.createUnselectedRegion(this._selectionPixelStartX + this._selectionPixelWidth, this.graphContainerClientWidth - this._selectionPixelStartX - this._selectionPixelWidth);
                    this._graphContainer.appendChild(this._leftUnselectedRegion);
                    this._graphContainer.appendChild(this._rightUnselectedRegion);
                };
                SwimLane.prototype.startSelection = function (event) {
                    if(event.which !== DiagnosticsHub.Common.MouseCodes.Left) {
                        return;
                    }
                    this._initialSelectionPixelStartX = this._selectionPixelStartX = this.getSelectionStartWidth(event);
                    this._selectionPixelWidth = 0;
                    this._dragDirection = SwimLane.getDragDirection(this._selectionPixelWidth);
                    this._graphContainer.addEventListener("mousemove", this._dragHandler);
                    this._graphContainer.addEventListener("mouseup", this._mouseupHandler);
                    this._graphContainer.setCapture(true);
                    this._animationFrameHandle = window.requestAnimationFrame(this._onDraggingAnimation);
                };
                SwimLane.prototype.stopSelection = function (event) {
                    this._graphContainer.removeEventListener("mousemove", this._dragHandler);
                    this._graphContainer.removeEventListener("mouseup", this._mouseupHandler);
                    this._graphContainer.releaseCapture();
                    window.cancelAnimationFrame(this._animationFrameHandle);
                    this._animationFrameHandle = null;
                    this.ensureMinSelectionWidth();
                    this.drawSelection();
                    this._dragDirection = DiagnosticsHub.DragDirection.None;
                    this.raiseSelectionChanged(false);
                    this._sqmRuler.selectionChanged(DiagnosticsHub.Sqm.SelectionChangeSource.SwimLane, this._selectionPixelWidth === this._minSelectionWidthInPixels);
                };
                SwimLane.prototype.onDraggingAnimation = function () {
                    this.drawSelection();
                    this.raiseSelectionChanged(true);
                    this._animationFrameHandle = window.requestAnimationFrame(this._onDraggingAnimation);
                };
                SwimLane.prototype.createUnselectedRegion = function (left, width) {
                    var rect = document.createElement("div");
                    rect.style.height = this._graphContainer.offsetHeight + "px";
                    rect.style.width = width + "px";
                    rect.style.left = left + "px";
                    rect.style.top = "0px";
                    rect.className = "unselected";
                    return rect;
                };
                SwimLane.prototype.raiseSelectionChanged = function (isIntermittent) {
                    if (typeof isIntermittent === "undefined") { isIntermittent = false; }
                    if(this._selectionPixelWidth >= this._minSelectionWidthInPixels) {
                        var minValue = this.convertChartAreaPercentToDataValue(this._selectionPixelStartX);
                        var maxValue = this.convertChartAreaPercentToDataValue(this._selectionPixelStartX + this._selectionPixelWidth);
                        if(this._selectionTimeRange && (!isIntermittent || !this._selectionTimeRange.begin.equals(minValue) || !this._selectionTimeRange.end.equals(maxValue))) {
                            this._selectionTimeRange = new DiagnosticsHub.JsonTimespan(minValue, maxValue);
                            var args = {
                                position: this._selectionTimeRange,
                                invoker: this._graphId,
                                isIntermittent: isIntermittent
                            };
                            if(this._viewEventManager) {
                                this._viewEventManager.selectionChanged.raiseEvent(args);
                            }
                        }
                    }
                };
                SwimLane.prototype.setBodyVisibility = function (arg) {
                    if(arg && arg.data && typeof arg.data.visible !== "undefined") {
                        this.setGraphVisibility(arg.data.visible);
                    }
                };
                SwimLane.prototype.setGraphVisibility = function (visible) {
                    this._body.style.display = visible ? "-ms-grid" : "none";
                    this._isVisible = visible;
                    if(visible && this._graph) {
                        this.graphContainerClientWidth = null;
                        if(this._config.isSelectionEnabled) {
                            this.calculateHandlerPosition();
                            this.drawSelection();
                        }
                        this.drawVerticalLines();
                        this._graph.render(true, true);
                    }
                    if(this._publisher) {
                        this._publisher.invokeListener(DiagnosticsHub.SwimlaneEvents.Visibility, {
                            data: {
                                visible: visible
                            }
                        });
                    }
                };
                SwimLane.prototype.invokeEventListener = function (type, data) {
                    switch(type) {
                        case DiagnosticsHub.GraphEvents.ScaleInfoChanged:
                            if(data) {
                                if(this._leftScale) {
                                    this._leftScale.config = data;
                                    this._leftScale.render();
                                }
                                if(this._rightScale) {
                                    this._rightScale.config.minimum = data.minimum;
                                    this._rightScale.render();
                                }
                                if(this._axes) {
                                    this._axes.config = data;
                                    this._axes.render();
                                }
                            }
                            break;
                        default:
                            if(this._publisher) {
                                this._publisher.invokeListener(type, {
                                    data: data
                                });
                            }
                    }
                };
                SwimLane.prototype.invokeGraphEventListener = function (type, data) {
                    if(type) {
                        if(data) {
                            switch(type) {
                                case DiagnosticsHub.GraphEvents.ScaleInfoChanged:
                                    if(this._leftScale) {
                                        this._leftScale.minimum = data.minimum;
                                        this._leftScale.maximum = data.maximum;
                                        this._leftScale.render();
                                    }
                                    if(this._rightScale) {
                                        this._rightScale.minimum = data.minimum;
                                        this._rightScale.maximum = data.maximum;
                                        this._rightScale.render();
                                    }
                                    if(this._axes) {
                                        this._axes.minimum = data.minimum;
                                        this._axes.maximum = data.maximum;
                                        this._axes.render();
                                    }
                                    if(this._header) {
                                        this._header.title.setUnit(data.unit);
                                    }
                                    if(this._thresholdValueSelector) {
                                        this.processThresholdValueChange();
                                    }
                                    break;
                            }
                        }
                    }
                };
                return SwimLane;
            })();
            DiagnosticsHub.SwimLane = SwimLane;            
            var SwimLaneConfiguration = (function () {
                function SwimLaneConfiguration() {
                    this.containerId = "";
                    this.header = {
                        title: {
                            isBodyExpanded: true,
                            titleText: "Graph",
                            unit: "unit",
                            isGraphCollapsible: true
                        },
                        legend: {
                            data: []
                        }
                    };
                    this.body = {
                        leftScale: {
                            width: 40,
                            isVisible: true,
                            type: DiagnosticsHub.ScaleType.Left,
                            borderWidth: 1,
                            axes: []
                        },
                        rightScale: {
                            width: 40,
                            isVisible: true,
                            type: DiagnosticsHub.ScaleType.Right,
                            borderWidth: 1,
                            axes: []
                        },
                        graph: {
                            height: 100,
                            registeredClass: null,
                            loadCss: null,
                            jsonConfig: {
                            },
                            description: null
                        },
                        events: [
                            DiagnosticsHub.SwimlaneEvents.Graph, 
                            DiagnosticsHub.SwimlaneEvents.Visibility
                        ]
                    };
                    this.minSelectionWidthInPixels = 10;
                    this.isSelectionEnabled = true;
                    this.isZoomEnabled = true;
                }
                return SwimLaneConfiguration;
            })();
            DiagnosticsHub.SwimLaneConfiguration = SwimLaneConfiguration;            
            var Header = (function () {
                function Header(config, container) {
                    this._legendContainerCss = "legend-container";
                    this._titleContainerCss = "title-container";
                    if(config) {
                        this._config = config;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    if(container) {
                        this._container = container;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1004"));
                    }
                }
                Object.defineProperty(Header.prototype, "container", {
                    get: function () {
                        return this._container;
                    },
                    enumerable: true,
                    configurable: true
                });
                Header.prototype.render = function () {
                    this.renderTitle();
                    this.renderLegend();
                };
                Header.prototype.renderTitle = function () {
                    var titleContainer = document.createElement("div");
                    titleContainer.className = this._titleContainerCss;
                    this._container.appendChild(titleContainer);
                    this.title = new Title(this._config.title, titleContainer);
                    this.title.render();
                };
                Header.prototype.renderLegend = function () {
                    var legendContainer = document.createElement("div");
                    legendContainer.className = this._legendContainerCss;
                    this._container.appendChild(legendContainer);
                    this.legend = new Legend(this._config.legend, legendContainer);
                    this.legend.render();
                };
                return Header;
            })();
            DiagnosticsHub.Header = Header;            
            var Legend = (function () {
                function Legend(config, container) {
                    this._legendDivCss = "legend-div";
                    this._legendTextDivCss = "legend-text-div";
                    this._legendColorCss = "legend-color";
                    this._legendColorDivCss = "legend-color-div";
                    this._thresholdLegendTextDivCss = "threshold-legend-text";
                    this._thresholdLegendColorCss = "threshold-legend-color";
                    if(config) {
                        this._config = config;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    if(container) {
                        this._container = container;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1004"));
                    }
                }
                Legend.prototype.render = function () {
                    if(this._config.data) {
                        for(var i = 0; i < this._config.data.length; i++) {
                            var legendColorDiv = document.createElement("div");
                            legendColorDiv.className = this._legendColorDivCss;
                            var colorDiv = document.createElement("div");
                            colorDiv.className = this._legendColorCss;
                            colorDiv.style.backgroundColor = (this._config.data[i]).color;
                            legendColorDiv.appendChild(colorDiv);
                            var legendTextDiv = document.createElement("div");
                            legendTextDiv.className = this._legendTextDivCss;
                            legendTextDiv.innerText = this._config.data[i].legendText;
                            if((this._config.data[i]).isThresholdLegend) {
                                colorDiv.classList.add(this._thresholdLegendColorCss);
                                legendTextDiv.classList.add(this._thresholdLegendTextDivCss);
                            }
                            var individualLegendBox = document.createElement("div");
                            individualLegendBox.className = this._legendDivCss;
                            individualLegendBox.appendChild(legendColorDiv);
                            individualLegendBox.appendChild(legendTextDiv);
                            individualLegendBox.addEventListener("mouseover", this.showTooltip.bind(this, [
                                this._config.data[i].legendTooltip
                            ]));
                            individualLegendBox.addEventListener("mouseout", this.hideTooltip.bind(this));
                            this._container.appendChild(individualLegendBox);
                        }
                    }
                };
                Legend.prototype.hideTooltip = function (evt) {
                    Plugin.Tooltip.dismiss();
                };
                Legend.prototype.showTooltip = function (args, evt) {
                    Plugin.Tooltip.dismiss();
                    if(args && args[0] !== null && typeof args[0] !== "undefined") {
                        var config = {
                            content: args[0],
                            delay: 0
                        };
                        Plugin.Tooltip.show(config);
                    }
                };
                return Legend;
            })();
            DiagnosticsHub.Legend = Legend;            
            var Title = (function () {
                function Title(config, container) {
                    this._callbackArr = [];
                    this._focused = false;
                    this._titleTextCss = "title-text";
                    this._titleExpandButtonCss = "title-expand-button";
                    this._titleCollapseButtonCss = "title-collapse-button";
                    this._titleButtonDisabledCss = "title-button-disabled";
                    if(config) {
                        this._config = config;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    if(container) {
                        this._container = container;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1004"));
                    }
                    this._publisher = new DiagnosticsHub.Publisher([
                        DiagnosticsHub.TitleEvents.Click, 
                        DiagnosticsHub.TitleEvents.KeyPress
                    ]);
                }
                Title.prototype.render = function () {
                    this.renderTitleCollapseExpandButton();
                    this.renderTitleText();
                };
                Title.prototype.registerCallback = function (evt, callback) {
                    this._publisher.addEventListener(evt, callback);
                };
                Title.prototype.setUnit = function (value) {
                    if(this._titleText) {
                        var text = this._config.titleText;
                        this._config.unit = value;
                        if(value) {
                            text += " (" + value + ")";
                        }
                        this._titleText.innerHTML = text;
                    }
                };
                Title.prototype.onTabFocus = function (e) {
                    this._focused = true;
                };
                Title.prototype.onTabBlur = function (e) {
                    this._focused = false;
                };
                Title.prototype.onKeyDown = function (e) {
                    if(this._focused && DiagnosticsHub.Common.KeyCodes.Enter === e.keyCode) {
                        this.setRegionState(DiagnosticsHub.TitleEvents.KeyPress);
                    }
                };
                Title.prototype.mouseClick = function (e) {
                    this.setRegionState(DiagnosticsHub.TitleEvents.Click);
                };
                Title.prototype.setRegionState = function (evt) {
                    this._config.isBodyExpanded = !this._config.isBodyExpanded;
                    this.setAraiLabelAndStylesheet();
                    this._publisher.invokeListener(evt, {
                        data: {
                            visible: this._config.isBodyExpanded
                        }
                    });
                };
                Title.prototype.setAraiLabelAndStylesheet = function () {
                    if(this._config.isBodyExpanded === null || typeof this._config.isBodyExpanded === "undefined" || this._config.isBodyExpanded) {
                        this._titleCollapseExpandButton.className = this._titleExpandButtonCss;
                        this._titleCollapseExpandButton.setAttribute("aria-label", Plugin.Resources.getString("SwimlaneCollapseAriaLabel"));
                    } else {
                        this._titleCollapseExpandButton.className = this._titleCollapseButtonCss;
                        this._titleCollapseExpandButton.setAttribute("aria-label", Plugin.Resources.getString("SwimlaneExpandAriaLabel"));
                    }
                };
                Title.prototype.renderTitleText = function () {
                    this._titleText = document.createElement("div");
                    this._titleText.className = this._titleTextCss;
                    var text = "";
                    if(this._config.titleText) {
                        text = this._config.titleText;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1005"));
                    }
                    if(this._config.unit) {
                        text += " (" + this._config.unit + ")";
                    }
                    this._titleText.innerHTML = text;
                    this._container.appendChild(this._titleText);
                };
                Title.prototype.renderTitleCollapseExpandButton = function () {
                    this._titleCollapseExpandButton = document.createElement("div");
                    if(this._config.isGraphCollapsible) {
                        this._titleCollapseExpandButton.setAttribute("role", "button");
                        this.setAraiLabelAndStylesheet();
                        this._titleCollapseExpandButton.addEventListener("click", this.mouseClick.bind(this));
                        this._titleCollapseExpandButton.tabIndex = 0;
                        this._titleCollapseExpandButton.addEventListener("focus", this.onTabFocus.bind(this));
                        this._titleCollapseExpandButton.addEventListener("blur", this.onTabBlur.bind(this));
                        this._titleCollapseExpandButton.addEventListener("keydown", this.onKeyDown.bind(this));
                    } else {
                        this._titleCollapseExpandButton.classList.add(this._titleButtonDisabledCss);
                    }
                    this._container.appendChild(this._titleCollapseExpandButton);
                };
                return Title;
            })();
            DiagnosticsHub.Title = Title;            
            var Scale = (function () {
                function Scale(config, container) {
                    this._scaleLeftCss = "graph-scale-left";
                    this._scaleRightCss = "graph-scale-right";
                    this._axisLeftCss = "graph-axis-left";
                    this._axisRightCss = "graph-axis-right";
                    if(config) {
                        this.config = config;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    if(container) {
                        this._container = container;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1004"));
                    }
                }
                Object.defineProperty(Scale.prototype, "minimum", {
                    get: function () {
                        var min;
                        if(this.config) {
                            min = this.config.minimum;
                        }
                        return min;
                    },
                    set: function (value) {
                        if(typeof value !== "undefined" && value !== null) {
                            this.config.minimum = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Scale.prototype, "maximum", {
                    get: function () {
                        var max;
                        if(this.config) {
                            max = this.config.maximum;
                        }
                        return max;
                    },
                    set: function (value) {
                        if(typeof value !== "undefined" && value !== null) {
                            this.config.maximum = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Scale.prototype.render = function () {
                    if(!this._graphScale) {
                        this._graphScale = document.createElement("div");
                        this._graphScale.className = this.config.type === DiagnosticsHub.ScaleType.Left ? this._scaleLeftCss : this._scaleRightCss;
                        this._graphScale.style.width = this.config.width + "px";
                        if(this.config.type === DiagnosticsHub.ScaleType.Left) {
                            this._graphScale.style.borderRightWidth = this.config.borderWidth + "px";
                        } else {
                            this._graphScale.style.borderLeftWidth = this.config.borderWidth + "px";
                        }
                        this._container.appendChild(this._graphScale);
                    } else {
                        while(this._graphScale.childNodes.length > 0) {
                            this._graphScale.removeChild(this._graphScale.firstChild);
                        }
                    }
                    if((this.config.isVisible || this.config.isVisible === null || typeof this.config.isVisible === "undefined") && this.config.width) {
                        if(this.config.minimum !== null && typeof this.config.minimum !== "undefined" && this.config.maximum !== null && typeof this.config.maximum !== "undefined") {
                            var hasThresholdAxis;
                            if(this.config.axes && this.config.axes.length > 0) {
                                for(var i = 0; i < this.config.axes.length; i++) {
                                    var axis = this.config.axes[i];
                                    this.drawAxisValue(DiagnosticsHub.AxisPositionType.middle, axis.value);
                                    if(axis.isThresholdAxis) {
                                        hasThresholdAxis = true;
                                    }
                                }
                            } else {
                                this.drawAxisValue(DiagnosticsHub.AxisPositionType.top, this.config.maximum);
                                this.drawAxisValue(DiagnosticsHub.AxisPositionType.bottom, this.config.minimum);
                            }
                            if(hasThresholdAxis) {
                                this.drawAxisValue(DiagnosticsHub.AxisPositionType.top, this.config.maximum);
                            }
                        }
                    }
                };
                Scale.prototype.drawAxisValue = function (position, value) {
                    var axisDiv = document.createElement("div");
                    axisDiv.className = this.config.type === DiagnosticsHub.ScaleType.Left ? this._axisLeftCss : this._axisRightCss;
                    axisDiv.innerHTML = value.toString();
                    this._graphScale.appendChild(axisDiv);
                    var top = 0;
                    switch(position) {
                        case DiagnosticsHub.AxisPositionType.top:
                            axisDiv.style.top = "0px";
                            break;
                        case DiagnosticsHub.AxisPositionType.middle:
                            var y = Math.floor(((this.config.maximum - value) / (this.config.maximum - this.config.minimum)) * this._container.offsetHeight);
                            axisDiv.style.top = y - (axisDiv.offsetHeight / 2) + "px";
                            break;
                        case DiagnosticsHub.AxisPositionType.bottom:
                            axisDiv.style.bottom = "0px";
                            break;
                    }
                };
                return Scale;
            })();
            DiagnosticsHub.Scale = Scale;            
            var Axes = (function () {
                function Axes(config, container) {
                    this._axisLineCss = "graph-axis-line";
                    this._thresholdAxisLineCss = "threshold-axis";
                    if(config) {
                        this.config = config;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    if(container) {
                        this._container = container;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1004"));
                    }
                }
                Object.defineProperty(Axes.prototype, "minimum", {
                    get: function () {
                        var min;
                        if(this.config) {
                            min = this.config.minimum;
                        }
                        return min;
                    },
                    set: function (value) {
                        if(typeof value !== "undefined" && value !== null) {
                            this.config.minimum = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Axes.prototype, "maximum", {
                    get: function () {
                        var max;
                        if(this.config) {
                            max = this.config.maximum;
                        }
                        return max;
                    },
                    set: function (value) {
                        if(typeof value !== "undefined" && value !== null) {
                            this.config.maximum = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Axes.prototype.render = function () {
                    var children = this._container.getElementsByClassName(this._axisLineCss);
                    if(children) {
                        while(children.length > 0) {
                            this._container.removeChild(children[children.length - 1]);
                        }
                    }
                    if(this.config.axes && this.config.axes.length > 0) {
                        for(var i = 0; i < this.config.axes.length; i++) {
                            var axis = this.config.axes[i];
                            this.drawAxisLine(axis.value, axis.isThresholdAxis);
                        }
                    }
                };
                Axes.prototype.drawAxisLine = function (value, isThresholdAxis) {
                    var axisLine = document.createElement("div");
                    axisLine.className = this._axisLineCss;
                    if(isThresholdAxis) {
                        axisLine.classList.add(this._thresholdAxisLineCss);
                    }
                    this._container.appendChild(axisLine);
                    var y = Math.floor(((this.config.maximum - value) / (this.config.maximum - this.config.minimum)) * this._container.offsetHeight);
                    axisLine.style.top = y - (axisLine.offsetHeight / 2) + "px";
                };
                return Axes;
            })();
            DiagnosticsHub.Axes = Axes;            
            var ThresholdValueSelector = (function () {
                function ThresholdValueSelector(swimlane, swimLaneConfig, header) {
                    this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                    this._thresholdSelectorCss = "threshold-selector";
                    var thresholdLines = swimLaneConfig.body.graph.jsonConfig.ThresholdLines;
                    if(thresholdLines && thresholdLines.length >= 1) {
                        this._thresholdConfig = thresholdLines[0];
                        if(thresholdLines.length > 1) {
                            this._logger.debug("Multiple threshold lines were defined in the config json. We will just pick the first one.");
                        }
                    }
                    this._swimlane = swimlane;
                    this._swimLaneConfig = swimLaneConfig;
                    this._header = header;
                    this._resources = swimLaneConfig.body.graph.resources;
                }
                Object.defineProperty(ThresholdValueSelector.prototype, "currentThresholdValue", {
                    get: function () {
                        if(this._select && this._select.childNodes.length > 0) {
                            var option = this._select.childNodes[this._select.selectedIndex];
                            if(option) {
                                var value = parseFloat(option.value);
                                if(!isNaN(value)) {
                                    return value;
                                }
                            }
                        }
                        return 0;
                    },
                    enumerable: true,
                    configurable: true
                });
                ThresholdValueSelector.prototype.render = function () {
                    if(!this._thresholdConfig) {
                        return;
                    }
                    var legendText = this.getResource(this._thresholdConfig.LegendText);
                    this._swimLaneConfig.header.legend.data.push({
                        legendText: legendText,
                        legendTooltip: this.getResource(this._thresholdConfig.LegendTooltip),
                        isThresholdLegend: true
                    });
                    this._header.render();
                    var legendDiv;
                    var legendItems = this._header.container.getElementsByClassName("legend-text-div");
                    for(var i = 0; i < legendItems.length; i++) {
                        if((legendItems[i]).innerText === legendText) {
                            legendDiv = (legendItems[i].parentNode);
                            break;
                        }
                    }
                    if(legendDiv) {
                        this._select = document.createElement("select");
                        this._select.className = this._thresholdSelectorCss;
                        var defaultValueIndex = 0;
                        for(var i = 0; i < this._thresholdConfig.Values.length; i++) {
                            var option = document.createElement("option");
                            option.value = this._thresholdConfig.Values[i].Value.toString();
                            option.innerText = this.getResource(this._thresholdConfig.Values[i].Text);
                            this._select.appendChild(option);
                            if(option.value === this._thresholdConfig.DefaultValue.toString()) {
                                defaultValueIndex = i;
                            }
                        }
                        this._select.selectedIndex = defaultValueIndex;
                        this._select.addEventListener("change", this.onThresholdSelectionChanged.bind(this));
                        legendDiv.appendChild(this._select);
                        this._swimlane.processThresholdValueChange();
                    }
                };
                ThresholdValueSelector.prototype.getResource = function (resource) {
                    if(!this._resources) {
                        return resource;
                    }
                    return this._resources[resource] || resource;
                };
                ThresholdValueSelector.prototype.onThresholdSelectionChanged = function (e) {
                    this._swimlane.processThresholdValueChange();
                };
                return ThresholdValueSelector;
            })();
            DiagnosticsHub.ThresholdValueSelector = ThresholdValueSelector;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            (function (Common) {
                var ElementRecyclerFactory = (function () {
                    function ElementRecyclerFactory(container, elementCreator) {
                        this._container = container;
                        this._elementCreator = elementCreator;
                        this._index = null;
                        this._elements = [];
                        this._recycledElements = [];
                    }
                    ElementRecyclerFactory.forDivWithClass = function forDivWithClass(container, className) {
                        return new ElementRecyclerFactory(container, function () {
                            var element = document.createElement("div");
                            element.className = className;
                            return element;
                        });
                    };
                    ElementRecyclerFactory.prototype.start = function () {
                        this._index = 0;
                    };
                    ElementRecyclerFactory.prototype.getNext = function () {
                        if(this._index === null) {
                            throw "";
                        }
                        var element = this._elements[this._index];
                        if(!element) {
                            if(this._recycledElements.length > 0) {
                                element = this._recycledElements.pop();
                            } else {
                                element = this._elementCreator();
                            }
                            this._elements.push(element);
                            this._container.appendChild(element);
                        }
                        this._index++;
                        return element;
                    };
                    ElementRecyclerFactory.prototype.stop = function () {
                        if(this._index === null) {
                            return;
                        }
                        for(var i = this._elements.length - 1; i >= this._index; --i) {
                            var element = this._elements.pop();
                            this._recycledElements.push(element);
                            this._container.removeChild(element);
                        }
                        this._index = null;
                    };
                    ElementRecyclerFactory.prototype.recycleAll = function () {
                        for(var i = this._elements.length - 1; i >= 0; --i) {
                            var element = this._elements.pop();
                            this._recycledElements.push(element);
                            this._container.removeChild(element);
                        }
                    };
                    ElementRecyclerFactory.prototype.removeAll = function () {
                        for(var i = this._elements.length - 1; i >= 0; --i) {
                            var element = this._elements.pop();
                            this._container.removeChild(element);
                        }
                        this._elements = [];
                        this._recycledElements = [];
                    };
                    return ElementRecyclerFactory;
                })();
                Common.ElementRecyclerFactory = ElementRecyclerFactory;                
            })(DiagnosticsHub.Common || (DiagnosticsHub.Common = {}));
            var Common = DiagnosticsHub.Common;
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var RulerConfig = (function () {
                function RulerConfig(containerId) {
                    this.containerId = "rulerContainer";
                    this.className = "ruler-container";
                    this.id = "";
                    this.doubleSlider = {
                        containerId: "sliderContainer",
                        className: "ruler-body",
                        id: "rulerBody",
                        height: 1.8,
                        leftSlider: {
                            left: 0,
                            width: 5,
                            className: "ruler-slider"
                        },
                        rightSlider: {
                            left: 0,
                            width: 5,
                            className: "ruler-slider"
                        },
                        bar: {
                            className: "ruler-bar",
                            id: "rulerBar",
                            left: 40,
                            right: 40
                        },
                        timeRange: new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.zero, DiagnosticsHub.BigNumber.zero),
                        step: 1,
                        markSeries: [],
                        minimumRangeInPixel: 10,
                        minimumZoomLevelMsec: 50,
                        isSelectionEnabled: true,
                        isZoomEnabled: true
                    };
                    this.header = {
                        containerId: "rulerHeaderContainer",
                        className: "ruler-header",
                        titleConfig: {
                            containerId: "rulerTitleContainer",
                            className: "ruler-title-container",
                            text: "Diagnostic Session",
                            isExpanded: true,
                            description: ""
                        },
                        legendConfig: {
                            containerId: "rulerLegendContainer",
                            className: "ruler-legend-container",
                            data: []
                        }
                    };
                    if(containerId) {
                        this.containerId = containerId;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                    }
                }
                return RulerConfig;
            })();
            DiagnosticsHub.RulerConfig = RulerConfig;            
            var Ruler = (function () {
                function Ruler(config) {
                    this._rulerAreaCss = "ruler-area";
                    this._aggregatedMarkImageToken = "vs-image-graph-aggregated-event";
                    this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                    if(config && config.containerId) {
                        this._parent = document.getElementById(config.containerId);
                        if(this._parent) {
                            this._config = config;
                            this._imageTokenList = this.getImageTokens();
                            this._themeChangedHandler = this.onThemeChanged.bind(this);
                            Plugin.Theme.addEventListener("themechanged", this._themeChangedHandler);
                            this.initialize(this._config);
                        } else {
                            throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                        }
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                }
                Object.defineProperty(Ruler.prototype, "series", {
                    get: function () {
                        return this._config.doubleSlider.markSeries;
                    },
                    enumerable: true,
                    configurable: true
                });
                Ruler.prototype.deinitialize = function () {
                    if(this._doubleSlider) {
                        this._doubleSlider.deinitialize();
                    }
                    if(this._themeChangedHandler) {
                        Plugin.Theme.removeEventListener("themechanged", this._themeChangedHandler);
                    }
                };
                Ruler.prototype.focus = function () {
                    this._doubleSlider.focus();
                };
                Ruler.prototype.zoom = function (current, selection) {
                    this._doubleSlider.zoom(current, selection);
                };
                Ruler.prototype.setHandlePosition = function (timeRange) {
                    if(!this._doubleSlider.sliderHandlePosition.equals(timeRange)) {
                        this._doubleSlider.sliderHandlePosition = timeRange;
                    }
                };
                Ruler.prototype.render = function () {
                    if(!this._container) {
                        this._container = document.createElement("div");
                        this._container.style.width = "100%";
                        this._container.style.height = "100%";
                        this._parent.appendChild(this._container);
                    }
                    while(this._container.hasChildNodes()) {
                        this._container.removeChild(this._container.firstChild);
                    }
                    this._container.classList.add(this._config.className);
                    this._headerDiv = document.createElement("div");
                    this._headerDiv.className = this._config.header.className;
                    this._headerDiv.id = this._config.header.containerId;
                    this._container.appendChild(this._headerDiv);
                    this._body = document.createElement("div");
                    this._body.id = this._config.doubleSlider.containerId;
                    this._body.style.height = this._config.doubleSlider.height + "em";
                    this._container.appendChild(this._body);
                    while(this._config.doubleSlider.markSeries.length > this._imageTokenList.length) {
                        this._logger.error("Series removed due to excess count: " + JSON.stringify(this._config.doubleSlider.markSeries.pop()));
                    }
                    for(var i = 0; i < this._imageTokenList.length && i < this._config.doubleSlider.markSeries.length; i++) {
                        var series = this._config.doubleSlider.markSeries[i];
                        if(series) {
                            series.index = i;
                            this._config.header.legendConfig.data.push({
                                text: series.label,
                                imageToken: this._imageTokenList[series.index],
                                tooltip: series.tooltip
                            });
                        }
                    }
                    for(var i = 0; i < this._config.doubleSlider.markSeries.length; i++) {
                        if(this._config.doubleSlider.markSeries[i].id === VisualStudio.DiagnosticsHub.MarkType.Custom) {
                            this._config.header.legendConfig.data.push({
                                text: Plugin.Resources.getString("RulerAggregatedMarks") || "Merged mark",
                                imageToken: this._aggregatedMarkImageToken,
                                tooltip: Plugin.Resources.getString("MergedMarkTooltip") || "Indicates there are marks of two or more types"
                            });
                            break;
                        }
                    }
                    this._config.doubleSlider.bar.scaleConfig = {
                        aggregatedImageToken: this._aggregatedMarkImageToken,
                        imageTokenList: this._imageTokenList
                    };
                    this._config.header.titleConfig.description = RulerUtilities.formatTotalTime(this._config.doubleSlider.timeRange.elapsed, DiagnosticsHub.UnitFormat.fullName);
                    this._header = new RulerHeader(this._config.header);
                    this._header.render();
                    this._doubleSlider = new DoubleSlider(this._config.doubleSlider);
                    this._doubleSlider.render();
                };
                Ruler.prototype.addMark = function (id, timeStamp, toolTip, shouldRender) {
                    if (typeof shouldRender === "undefined") { shouldRender = true; }
                    if(this._doubleSlider) {
                        var markData = new MarkData(timeStamp, toolTip);
                        this._doubleSlider.addMark(id, markData, shouldRender);
                    }
                };
                Ruler.prototype.getHandlePosition = function () {
                    return this._doubleSlider.sliderHandlePosition;
                };
                Ruler.prototype.updateTimeRange = function (viewPort, original) {
                    this._doubleSlider.updateTimeRange(viewPort);
                };
                Ruler.prototype.setDiagnosticsSessionTimeRange = function (range) {
                    if(this._header && range) {
                        this._header.setTitle(RulerUtilities.formatTotalTime(range, DiagnosticsHub.UnitFormat.fullName, true));
                    }
                };
                Ruler.prototype.setState = function (state) {
                    this._doubleSlider.setState(state);
                };
                Ruler.prototype.resize = function () {
                    this._doubleSlider.resize(null);
                };
                Ruler.prototype.onThemeChanged = function (args) {
                    this._doubleSlider.resize(null);
                    this._header.render();
                };
                Ruler.prototype.onSelectionChanged = function (args) {
                    if(args && args.position && args.position.elapsed) {
                        this._header.setTitle(RulerUtilities.formatTotalTime(this._config.doubleSlider.timeRange.elapsed, DiagnosticsHub.UnitFormat.fullName) + " (" + RulerUtilities.formatSelectionTime(args.position.elapsed) + ")");
                    }
                };
                Ruler.prototype.initialize = function (object) {
                    for(var property in object) {
                        if(object[property] && (property === "id" || property === "containerId")) {
                            object[property] += RulerUtilities.getRandomNumber();
                        } else if(typeof object[property] === "object" && property !== "data" && property !== "markSeries") {
                            this.initialize(object[property]);
                        }
                    }
                    this._viewEventManager = Microsoft.VisualStudio.DiagnosticsHub.getViewEventManager();
                    this._viewEventManager.selectionChanged.addEventListener(this.onSelectionChanged.bind(this));
                };
                Ruler.prototype.getImageTokens = function () {
                    return [
                        "vs-image-graph-user-mark", 
                        "vs-image-graph-app-event", 
                        "vs-image-graph-third-event", 
                        "vs-image-graph-fourth-event", 
                        "vs-image-graph-fifth-event", 
                        "vs-image-graph-sixth-event"
                    ];
                };
                return Ruler;
            })();
            DiagnosticsHub.Ruler = Ruler;            
            var DoubleSlider = (function () {
                function DoubleSlider(config) {
                    this._containerClientWidth = null;
                    this._focused = false;
                    this._rulerUnselectedCss = "ruler-unselected";
                    this._rulerBodyCss = "ruler-body";
                    this._isZoomed = false;
                    this._selectionPixelStartX = 0;
                    this._selectionPixelWidth = 0;
                    this._rulerState = DiagnosticsHub.GraphState.Roll;
                    this._onResizeHandler = this.resize.bind(this);
                    if(config && config.containerId) {
                        this._container = document.getElementById(config.containerId);
                        if(this._container) {
                            this._config = config;
                            this.initialize();
                        } else {
                            throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                        }
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    this._sqmRuler = new DiagnosticsHub.Sqm.Ruler();
                }
                Object.defineProperty(DoubleSlider.prototype, "sliderHandlePosition", {
                    get: function () {
                        return this._handlePosition;
                    },
                    set: function (position) {
                        if(position && this._config.isSelectionEnabled) {
                            this._handlePosition = position;
                            var lSliderLeft = this.convertToPixel(this._handlePosition.begin) + this._config.bar.left - this._config.leftSlider.width;
                            this._lSlider.style.left = lSliderLeft + "px";
                            this._config.leftSlider.left = lSliderLeft;
                            this._lUnselectedRegion.style.width = lSliderLeft - this._config.bar.left + this._config.leftSlider.width + "px";
                            this._lUnselectedRegion.style.left = this._config.bar.left + "px";
                            var rSliderLeft = this.convertToPixel(this._handlePosition.end) + this._config.bar.left;
                            this._rSlider.style.left = rSliderLeft + "px";
                            this._config.rightSlider.left = rSliderLeft;
                            this._rUnselectedRegion.style.width = Math.ceil(this.containerClientWidth - rSliderLeft - this._config.bar.right) + "px";
                            this._rUnselectedRegion.style.left = rSliderLeft + "px";
                            this.setAriaLabelForSliders();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DoubleSlider.prototype, "containerClientWidth", {
                    get: function () {
                        if(this._container && (this._containerClientWidth === null || typeof (this._containerClientWidth) === "undefined")) {
                            this._containerClientWidth = this._container.clientWidth;
                        }
                        return this._containerClientWidth;
                    },
                    set: function (value) {
                        this._containerClientWidth = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DoubleSlider.prototype, "barClientWidth", {
                    get: function () {
                        if(this._bar && (this._barClientWidth === null || typeof this._barClientWidth === "undefined")) {
                            this._barClientWidth = this._bar.clientWidth;
                        }
                        return this._barClientWidth;
                    },
                    set: function (value) {
                        this._barClientWidth = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                DoubleSlider.prototype.deinitialize = function () {
                    window.removeEventListener("resize", this._onResizeHandler);
                    if(this._scale) {
                        this._scale.deinitialize();
                    }
                };
                DoubleSlider.prototype.focus = function () {
                    this._container.focus();
                };
                DoubleSlider.prototype.zoom = function (current, selection) {
                    if(this._config.isZoomEnabled) {
                        this._currentTimeRange = current;
                        this.resetScale();
                        if(!selection) {
                            this.sliderHandlePosition = current;
                        } else {
                            this.sliderHandlePosition = selection;
                        }
                    }
                };
                DoubleSlider.prototype.invalidateSizeCache = function () {
                    if(this._container) {
                        this.containerClientWidth = this._container.clientWidth;
                    }
                    if(this._bar) {
                        this.barClientWidth = this._bar.clientWidth;
                    }
                    if(this._scale) {
                        this._scale.invalidateSizeCache();
                    }
                };
                DoubleSlider.prototype.render = function () {
                    while(this._container.hasChildNodes()) {
                        this._container.removeChild(this._container.firstChild);
                    }
                    this._container.className = this._config.className = this._rulerBodyCss;
                    this._containerWidth = this.containerClientWidth;
                    this._container.tabIndex = 0;
                    if(this._config.isSelectionEnabled) {
                        this.renderLeftSliderHandle();
                    }
                    this.renderRulerBar();
                    this.renderRulerScale();
                    if(this._config.isSelectionEnabled) {
                        this.renderRightSliderHandle();
                    }
                    this.setAriaLabelForRuler();
                };
                DoubleSlider.prototype.addMark = function (id, markData, shouldRender) {
                    if (typeof shouldRender === "undefined") { shouldRender = true; }
                    if(this._scale) {
                        this._scale.addMark(id, markData, shouldRender);
                    }
                };
                DoubleSlider.prototype.updateTimeRange = function (viewPort) {
                    if(viewPort && !this._currentTimeRange.equals(viewPort)) {
                        this._currentTimeRange = viewPort;
                        this._scale.setTimeRange(viewPort);
                        this._scale.render();
                    }
                };
                DoubleSlider.prototype.setState = function (state) {
                    if(state) {
                        this._rulerState = state;
                    }
                };
                DoubleSlider.prototype.resize = function (e) {
                    if(this.containerClientWidth === this._container.clientWidth) {
                        return;
                    }
                    this.invalidateSizeCache();
                    var newRulerBarWidth = this.containerClientWidth - this._config.bar.left - this._config.bar.right;
                    if(this._bar) {
                        this._bar.style.width = newRulerBarWidth + "px";
                        if(this._config.isSelectionEnabled) {
                            var lValue = this.convertToPixel(this._handlePosition.begin);
                            var rValue = this.convertToPixel(this._handlePosition.end);
                            var positionChanged = false;
                            if(rValue - lValue < this._config.minimumRangeInPixel) {
                                if(lValue + this._config.minimumRangeInPixel <= newRulerBarWidth) {
                                    rValue = lValue + this._config.minimumRangeInPixel;
                                    positionChanged = true;
                                } else if(rValue - this._config.minimumRangeInPixel >= 0) {
                                    lValue = rValue - this._config.minimumRangeInPixel;
                                    positionChanged = true;
                                }
                            }
                            var lSliderLeft = lValue - this._config.leftSlider.width + this._config.bar.left;
                            this._lSlider.style.left = lSliderLeft + "px";
                            this._config.leftSlider.left = lSliderLeft;
                            this._lUnselectedRegion.style.width = lValue + "px";
                            var rSliderLeft = rValue + this._config.bar.left;
                            this._rSlider.style.left = rSliderLeft + "px";
                            this._config.rightSlider.left = rSliderLeft;
                            this._rUnselectedRegion.style.left = rSliderLeft + "px";
                            this._rUnselectedRegion.style.width = Math.ceil(this.containerClientWidth - rSliderLeft - this._config.bar.right) + "px";
                            if(positionChanged) {
                                this._handlePosition = new DiagnosticsHub.JsonTimespan(this.convertToTime(lValue), this.convertToTime(rValue));
                                this.raiseSelectionTimeRangeChangedEvent(this._handlePosition, true);
                                this.setAriaLabelForSliders();
                            }
                        }
                        this._scale.resize();
                    }
                };
                DoubleSlider.getDragDirection = function getDragDirection(selectionWidth) {
                    if(selectionWidth > 0) {
                        return DiagnosticsHub.DragDirection.Right;
                    } else if(selectionWidth < 0) {
                        return DiagnosticsHub.DragDirection.Left;
                    }
                    return DiagnosticsHub.DragDirection.None;
                };
                DoubleSlider.prototype.initialize = function () {
                    window.addEventListener("resize", this._onResizeHandler);
                    this._currentTimeRange = this._config.timeRange;
                    this._handlePosition = this._currentTimeRange;
                    if(this._config.isSelectionEnabled) {
                        this._tabFocus = this.onTabFocus.bind(this);
                        this._tabBlur = this.onTabBlur.bind(this);
                        this._keyDown = this.onKeyDown.bind(this);
                        this._keyUp = this.onKeyUp.bind(this);
                        this._mouseMoveListener = this.onMouseMove.bind(this);
                        this._mouseUpListener = this.onMouseUp.bind(this);
                        this._startSelection = this.onStartSelection.bind(this);
                        this._onDrag = this.onDrag.bind(this);
                        this._onHandleAnimation = this.onHandleAnimation.bind(this);
                        this._onDraggingAnimation = this.onDraggingAnimation.bind(this);
                        this._container.addEventListener("mousedown", this._startSelection);
                    }
                    this._viewEventManager = Microsoft.VisualStudio.DiagnosticsHub.getViewEventManager();
                    this._viewEventManager.selectionChanged.addEventListener(this.setSelectionChanged.bind(this));
                };
                DoubleSlider.prototype.setSelectionChanged = function (args) {
                    Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_RulerSelectionHandlingBegin);
                    if(args && args.position && !args.position.equals(this.sliderHandlePosition)) {
                        this.sliderHandlePosition = args.position;
                    }
                    Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_RulerSelectionHandlingEnd);
                };
                DoubleSlider.prototype.raiseSelectionTimeRangeChangedEvent = function (position, isIntermittent) {
                    if (typeof isIntermittent === "undefined") { isIntermittent = false; }
                    var args = {
                        position: position,
                        isIntermittent: isIntermittent
                    };
                    if(this._viewEventManager) {
                        this._viewEventManager.selectionChanged.raiseEvent(args);
                    }
                };
                DoubleSlider.prototype.renderRulerBar = function () {
                    var leftBar = document.createElement("div");
                    leftBar.classList.add("ruler-bar-left-side");
                    leftBar.style.width = this._config.bar.left + "px";
                    leftBar.style.left = "0px";
                    this._container.appendChild(leftBar);
                    this._bar = document.createElement("div");
                    this._bar.id = this._config.bar.id;
                    this._bar.className = this._config.bar.className;
                    this._bar.style.left = (this._config.bar.left) + "px";
                    this._bar.style.width = (this.containerClientWidth - this._config.bar.left - this._config.bar.right) + "px";
                    this._container.appendChild(this._bar);
                    var rightBar = document.createElement("div");
                    rightBar.classList.add("ruler-bar-right-side");
                    rightBar.style.width = this._config.bar.right + "px";
                    rightBar.style.right = "0px";
                    this._container.appendChild(rightBar);
                };
                DoubleSlider.prototype.renderRulerScale = function () {
                    var config = {
                        timeRange: this._currentTimeRange,
                        containerId: this._bar.id,
                        series: this._config.markSeries,
                        imageTokenList: this._config.bar.scaleConfig.imageTokenList,
                        aggregatedImageToken: this._config.bar.scaleConfig.aggregatedImageToken
                    };
                    this._scale = new RulerScale(config);
                    this._scale.render();
                    this.setAriaLabelForRuler();
                    this.setAriaLabelForSliders();
                };
                DoubleSlider.prototype.renderLeftSliderHandle = function () {
                    this._lSlider = document.createElement("div");
                    this._lSlider.className = this._config.leftSlider.className;
                    this._lSlider.style.width = this._config.leftSlider.width + "px";
                    var sliderLeft = this._config.bar.left - this._config.leftSlider.width;
                    this._lSlider.style.left = sliderLeft + "px";
                    this._lSlider.tabIndex = 0;
                    this._container.appendChild(this._lSlider);
                    this._config.leftSlider.left = sliderLeft;
                    this._lSlider.addEventListener("mousedown", this.mouseDown.bind(this));
                    this._lSlider.addEventListener("focus", this._tabFocus);
                    this._lSlider.addEventListener("blur", this._tabBlur);
                    this.setAriaLabelForLeftSlider();
                    this._lUnselectedRegion = document.createElement("div");
                    this._lUnselectedRegion.className = this._rulerUnselectedCss;
                    this._lUnselectedRegion.style.width = "0px";
                    this._lUnselectedRegion.style.left = this._config.bar.left + "px";
                    this._container.appendChild(this._lUnselectedRegion);
                };
                DoubleSlider.prototype.setAriaLabelForLeftSlider = function () {
                    if(this._lSlider) {
                        this._lSlider.setAttribute("role", "slider");
                        this._lSlider.setAttribute("aria-label", Plugin.Resources.getString("RulerLeftSliderAriaLabel"));
                        var label = Plugin.Resources.getString("RulerSliderAriaValueText", RulerUtilities.formatTime(this._handlePosition.begin, DiagnosticsHub.UnitFormat.fullName), RulerUtilities.formatTime(this._currentTimeRange.begin, DiagnosticsHub.UnitFormat.fullName), RulerUtilities.formatTime(this._handlePosition.end, DiagnosticsHub.UnitFormat.fullName));
                        this._lSlider.setAttribute("aria-valuetext", label);
                        this._lSlider.setAttribute("aria-valuenow", RulerUtilities.formatTime(this._handlePosition.begin));
                        this._lSlider.setAttribute("aria-valuemin", RulerUtilities.formatTime(this._currentTimeRange.begin));
                        this._lSlider.setAttribute("aria-valuemax", RulerUtilities.formatTime(this._handlePosition.end));
                    }
                };
                DoubleSlider.prototype.setAriaLabelForRightSlider = function () {
                    if(this._rSlider) {
                        this._rSlider.setAttribute("role", "slider");
                        this._rSlider.setAttribute("aria-label", Plugin.Resources.getString("RulerRightSliderAriaLabel"));
                        var label = Plugin.Resources.getString("RulerSliderAriaValueText", RulerUtilities.formatTime(this._handlePosition.end, DiagnosticsHub.UnitFormat.fullName), RulerUtilities.formatTime(this._handlePosition.begin, DiagnosticsHub.UnitFormat.fullName), RulerUtilities.formatTime(this._currentTimeRange.end, DiagnosticsHub.UnitFormat.fullName));
                        this._rSlider.setAttribute("aria-valuetext", label);
                        this._rSlider.setAttribute("aria-valuenow", RulerUtilities.formatTime(this._handlePosition.end));
                        this._rSlider.setAttribute("aria-valuemin", RulerUtilities.formatTime(this._handlePosition.begin));
                        this._rSlider.setAttribute("aria-valuemax", RulerUtilities.formatTime(this._currentTimeRange.end));
                    }
                };
                DoubleSlider.prototype.setAriaLabelForSliders = function () {
                    this.setAriaLabelForLeftSlider();
                    this.setAriaLabelForRightSlider();
                };
                DoubleSlider.prototype.renderRightSliderHandle = function () {
                    this._rSlider = document.createElement("div");
                    this._rSlider.className = this._config.rightSlider.className;
                    this._rSlider.style.width = this._config.rightSlider.width + "px";
                    var sliderLeft = this.containerClientWidth - this._config.bar.right;
                    this._rSlider.style.left = sliderLeft + "px";
                    this._rSlider.tabIndex = 0;
                    this._container.appendChild(this._rSlider);
                    this._config.rightSlider.left = sliderLeft;
                    this._rSlider.addEventListener("mousedown", this.mouseDown.bind(this));
                    this._rSlider.addEventListener("focus", this._tabFocus);
                    this._rSlider.addEventListener("blur", this._tabBlur);
                    this.setAriaLabelForRightSlider();
                    this._rUnselectedRegion = document.createElement("div");
                    this._rUnselectedRegion.className = this._rulerUnselectedCss;
                    this._rUnselectedRegion.style.width = "0px";
                    this._rUnselectedRegion.style.left = sliderLeft + "px";
                    this._container.appendChild(this._rUnselectedRegion);
                };
                DoubleSlider.prototype.onTabFocus = function (e) {
                    if(e.srcElement === this._lSlider) {
                        this._currentSlider = this._lSlider;
                        this._lSlider.addEventListener("keydown", this._keyDown, false);
                        this._lSlider.addEventListener("keyup", this._keyUp, false);
                    } else if(e.srcElement === this._rSlider) {
                        this._currentSlider = this._rSlider;
                        this._rSlider.addEventListener("keydown", this._keyDown, false);
                        this._rSlider.addEventListener("keyup", this._keyUp, false);
                    }
                    this._focused = true;
                };
                DoubleSlider.prototype.onTabBlur = function (e) {
                    if(e.srcElement === this._lSlider) {
                        this._lSlider.removeEventListener("keydown", this._keyDown, false);
                        this._lSlider.removeEventListener("keyup", this._keyUp, false);
                    } else if(e.srcElement === this._rSlider) {
                        this._rSlider.removeEventListener("keydown", this._keyDown, false);
                        this._rSlider.removeEventListener("keyup", this._keyUp, false);
                    }
                    this._currentSlider = null;
                    this._focused = false;
                };
                DoubleSlider.prototype.onKeyDown = function (e) {
                    this.handleKeyEvent(e, true);
                };
                DoubleSlider.prototype.onKeyUp = function (e) {
                    this.handleKeyEvent(e, false);
                };
                DoubleSlider.prototype.handleKeyEvent = function (e, isDown) {
                    var isIntermittent = isDown;
                    if(this._focused && e.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowLeft) {
                        if(e.srcElement === this._lSlider) {
                            this.setHandlePosition(parseFloat(this._lSlider.style.left) - this._config.step, isIntermittent);
                        } else if(e.srcElement === this._rSlider) {
                            this.setHandlePosition(parseFloat(this._rSlider.style.left) - this._config.step, isIntermittent);
                        }
                    }
                    if(this._focused && e.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowRight) {
                        if(e.srcElement === this._lSlider) {
                            this.setHandlePosition(parseFloat(this._lSlider.style.left) + this._config.step, isIntermittent);
                        } else if(e.srcElement === this._rSlider) {
                            this.setHandlePosition(parseFloat(this._rSlider.style.left) + this._config.step, isIntermittent);
                        }
                    }
                };
                DoubleSlider.prototype.mouseDown = function (e) {
                    this._mousePos = e.clientX;
                    var rect = this._container.getBoundingClientRect();
                    var root = document.documentElement;
                    var x = e.clientX - rect.left - root.scrollLeft;
                    if(x >= parseFloat(this._lSlider.style.left) && x <= parseFloat(this._lSlider.style.left) + parseFloat(this._lSlider.style.width)) {
                        this._currentSlider = this._lSlider;
                    } else if(x >= parseFloat(this._rSlider.style.left) && x <= parseFloat(this._rSlider.style.left) + parseFloat(this._rSlider.style.width)) {
                        this._currentSlider = this._rSlider;
                    }
                    if(this._currentSlider) {
                        document.addEventListener("mousemove", this._mouseMoveListener, false);
                        document.addEventListener("mouseup", this._mouseUpListener, false);
                        this._animationFrameHandle = window.requestAnimationFrame(this._onHandleAnimation);
                    }
                    return false;
                };
                DoubleSlider.prototype.renderHandles = function (isIntermittent) {
                    if (typeof isIntermittent === "undefined") { isIntermittent = true; }
                    var rect = this._container.getBoundingClientRect();
                    var root = document.documentElement;
                    var mouseX = this._mousePos - rect.left - root.scrollLeft;
                    if(this._currentSlider && (!isIntermittent || mouseX < parseFloat(this._currentSlider.style.left) || mouseX > parseFloat(this._currentSlider.style.left) + parseFloat(this._currentSlider.style.width))) {
                        this.setHandlePosition(mouseX, isIntermittent);
                    }
                };
                DoubleSlider.prototype.onHandleAnimation = function () {
                    this.renderHandles();
                    this._animationFrameHandle = window.requestAnimationFrame(this._onHandleAnimation);
                };
                DoubleSlider.prototype.setHandlePosition = function (position, isIntermittent) {
                    if(this._currentSlider) {
                        var handle;
                        if(this._currentSlider === this._lSlider) {
                            var currentSlider = this._lSlider;
                            var oppositeSlider = this._rSlider;
                            var oppositeSliderLeftPosition = parseFloat(oppositeSlider.style.left);
                            var configLeftSlider = this._config.leftSlider;
                            var configLeftSliderWidth = configLeftSlider.width;
                            var configBar = this._config.bar;
                            var distanceBetweenSliders = oppositeSliderLeftPosition - position - configLeftSliderWidth;
                            if(distanceBetweenSliders < this._config.minimumRangeInPixel) {
                                var minPosition = position - (this._config.minimumRangeInPixel - distanceBetweenSliders);
                                if(minPosition < configBar.left) {
                                    return;
                                }
                                currentSlider.style.left = minPosition + "px";
                                this._lUnselectedRegion.style.width = minPosition - configBar.left + "px";
                                configLeftSlider.left = minPosition;
                                handle = new DiagnosticsHub.JsonTimespan(this.convertToTime(minPosition + configLeftSliderWidth - configBar.left), this._handlePosition.end);
                            } else if(position >= configBar.left - configLeftSliderWidth && position <= oppositeSliderLeftPosition - parseFloat(currentSlider.style.width)) {
                                currentSlider.style.left = position + "px";
                                this._lUnselectedRegion.style.width = position - configBar.left + "px";
                                configLeftSlider.left = position;
                                handle = new DiagnosticsHub.JsonTimespan(this.convertToTime(position + configLeftSliderWidth - configBar.left), this._handlePosition.end);
                            } else if(position < configBar.left) {
                                currentSlider.style.left = configBar.left - configLeftSliderWidth + "px";
                                this._lUnselectedRegion.style.width = "0px";
                                configLeftSlider.left = configBar.left - configLeftSliderWidth;
                                handle = new DiagnosticsHub.JsonTimespan(this._currentTimeRange.begin, this._handlePosition.end);
                            }
                        } else if(this._currentSlider === this._rSlider) {
                            var currentSlider = this._rSlider;
                            var oppositeSlider = this._lSlider;
                            var oppositeSliderLeftPosition = parseFloat(oppositeSlider.style.left);
                            var configLeftSlider = this._config.leftSlider;
                            var configLeftSliderWidth = configLeftSlider.width;
                            var configRightSlider = this._config.rightSlider;
                            var configBar = this._config.bar;
                            var distanceBetweenSliders = position - oppositeSliderLeftPosition - configLeftSliderWidth;
                            if(distanceBetweenSliders < this._config.minimumRangeInPixel) {
                                var maxPosition = position + (this._config.minimumRangeInPixel - distanceBetweenSliders);
                                if(maxPosition > (this._containerClientWidth - configBar.right)) {
                                    return;
                                }
                                currentSlider.style.left = maxPosition + "px";
                                this._rUnselectedRegion.style.left = maxPosition + "px";
                                this._rUnselectedRegion.style.width = Math.ceil(this.containerClientWidth - configBar.right - maxPosition) + "px";
                                configRightSlider.left = maxPosition;
                                handle = new DiagnosticsHub.JsonTimespan(this._handlePosition.begin, this.convertToTime(maxPosition - configBar.left));
                            } else if(position <= this.containerClientWidth - configBar.right && position >= oppositeSliderLeftPosition + parseFloat(oppositeSlider.style.width)) {
                                currentSlider.style.left = position + "px";
                                this._rUnselectedRegion.style.left = position + "px";
                                this._rUnselectedRegion.style.width = Math.ceil(this.containerClientWidth - configBar.right - position) + "px";
                                configRightSlider.left = position;
                                handle = new DiagnosticsHub.JsonTimespan(this._handlePosition.begin, this.convertToTime(position - configBar.left));
                            } else if(position > this.containerClientWidth - configBar.right) {
                                currentSlider.style.left = this.containerClientWidth - configBar.right + "px";
                                this._rUnselectedRegion.style.left = this.containerClientWidth - configBar.right + "px";
                                this._rUnselectedRegion.style.width = "0px";
                                configRightSlider.left = this.containerClientWidth - configBar.right;
                                handle = new DiagnosticsHub.JsonTimespan(this._handlePosition.begin, this._currentTimeRange.end);
                            }
                        }
                        if(handle) {
                            this._handlePosition = handle;
                            this.raiseSelectionTimeRangeChangedEvent(this._handlePosition, isIntermittent);
                        } else if(!isIntermittent && this._handlePosition) {
                            this.raiseSelectionTimeRangeChangedEvent(this._handlePosition, isIntermittent);
                        }
                        this.setAriaLabelForSliders();
                        if(!isIntermittent) {
                            this._sqmRuler.selectionChanged(DiagnosticsHub.Sqm.SelectionChangeSource.DoubleSliderHandles, distanceBetweenSliders <= this._config.minimumRangeInPixel);
                        }
                    }
                };
                DoubleSlider.prototype.convertToTime = function (pixels) {
                    if(this.containerClientWidth - this._config.bar.left - this._config.bar.right > 0) {
                        return DiagnosticsHub.BigNumber.addNumber(this._currentTimeRange.begin, parseInt(this._currentTimeRange.elapsed.value) * (pixels / (this.containerClientWidth - this._config.bar.left - this._config.bar.right)));
                    }
                    return DiagnosticsHub.BigNumber.zero;
                };
                DoubleSlider.prototype.onMouseMove = function (e) {
                    this._mousePos = e.clientX;
                    e.stopPropagation();
                };
                DoubleSlider.prototype.onMouseUp = function (e) {
                    window.cancelAnimationFrame(this._animationFrameHandle);
                    this._animationFrameHandle = null;
                    this._mousePos = e.clientX;
                    this.renderHandles(false);
                    document.removeEventListener("mousemove", this._mouseMoveListener, false);
                    document.removeEventListener("mouseup", this._mouseUpListener, false);
                    if(!this._focused) {
                        this._currentSlider = null;
                    }
                };
                DoubleSlider.prototype.checkIfMouseInsideValidSelectionArea = function (event) {
                    var isValid = false;
                    var rect = this._container.getBoundingClientRect();
                    var mouseX = event.clientX - rect.left - this._bar.offsetLeft;
                    if(mouseX >= 0 && mouseX <= this.barClientWidth) {
                        isValid = true;
                    }
                    return isValid;
                };
                DoubleSlider.prototype.getSelectionStartWidth = function (event) {
                    var rect = this._container.getBoundingClientRect();
                    var mouseX = event.clientX - rect.left - this._bar.offsetLeft;
                    return mouseX;
                };
                DoubleSlider.prototype.drawSelection = function () {
                    this._lUnselectedRegion.style.width = this._selectionPixelStartX + "px";
                    this._lSlider.style.left = this._selectionPixelStartX - this._config.leftSlider.width + this._bar.offsetLeft + "px";
                    this._config.leftSlider.left = this._selectionPixelStartX + this._bar.offsetLeft;
                    var left = this._selectionPixelStartX + this._selectionPixelWidth + this._bar.offsetLeft;
                    this._rUnselectedRegion.style.left = left + "px";
                    this._rUnselectedRegion.style.width = (this.barClientWidth - this._selectionPixelStartX - this._selectionPixelWidth) + "px";
                    this._config.rightSlider.left = left;
                    this._rSlider.style.left = left + "px";
                    if(this._dragDirection === DiagnosticsHub.DragDirection.Left) {
                        this._lSlider.focus();
                    } else {
                        this._rSlider.focus();
                    }
                    this._handlePosition = new DiagnosticsHub.JsonTimespan(this.convertToTime(this._selectionPixelStartX), this.convertToTime(this._selectionPixelStartX + this._selectionPixelWidth));
                };
                DoubleSlider.prototype.ensureMinSelectionWidth = function () {
                    if(typeof this._selectionPixelStartX === "undefined") {
                        return;
                    }
                    if(Math.abs(this._selectionPixelWidth) < this._config.minimumRangeInPixel) {
                        this._selectionPixelWidth = this._config.minimumRangeInPixel;
                        switch(this._dragDirection) {
                            case DiagnosticsHub.DragDirection.Right:
                                if(this._selectionPixelStartX + this._selectionPixelWidth > this.barClientWidth) {
                                    this._selectionPixelStartX = this.barClientWidth - this._selectionPixelWidth;
                                }
                                break;
                            case DiagnosticsHub.DragDirection.Left:
                                if(this._selectionPixelStartX - this._selectionPixelWidth < 0) {
                                    this._selectionPixelStartX = 0;
                                } else if(this._selectionPixelStartX + this._selectionPixelWidth > this.barClientWidth) {
                                    this._selectionPixelStartX = this.barClientWidth - this._selectionPixelWidth;
                                } else {
                                    this._selectionPixelStartX = this._initialSelectionPixelStartX - this._selectionPixelWidth;
                                }
                                break;
                            default:
                                if(this._selectionPixelStartX + (this._selectionPixelWidth / 2) > this.barClientWidth) {
                                    this._selectionPixelStartX = this.barClientWidth - this._selectionPixelWidth;
                                } else if(this._selectionPixelStartX - (this._selectionPixelWidth / 2) < 0) {
                                    this._selectionPixelStartX = 0;
                                } else {
                                    this._selectionPixelStartX = this._selectionPixelStartX - (this._selectionPixelWidth / 2);
                                }
                                break;
                        }
                    }
                };
                DoubleSlider.prototype.onStartSelection = function (event) {
                    if(event.which !== DiagnosticsHub.Common.MouseCodes.Left) {
                        return;
                    }
                    if((event.target !== this._lSlider && event.target !== this._rSlider) && this.checkIfMouseInsideValidSelectionArea(event)) {
                        this._initialSelectionPixelStartX = this._selectionPixelStartX = this.getSelectionStartWidth(event);
                        this._selectionPixelWidth = 0;
                        this._dragDirection = DoubleSlider.getDragDirection(this._selectionPixelWidth);
                        this._mouseupHandler = this.onStopSelection.bind(this);
                        this._container.addEventListener("mousemove", this._onDrag);
                        this._container.addEventListener("mouseup", this._mouseupHandler);
                        this._container.setCapture(true);
                        this._animationFrameHandle = window.requestAnimationFrame(this._onDraggingAnimation);
                    }
                    event.stopPropagation();
                };
                DoubleSlider.prototype.onStopSelection = function (event) {
                    this._container.removeEventListener("mousemove", this._onDrag);
                    this._container.removeEventListener("mouseup", this._mouseupHandler);
                    this._container.releaseCapture();
                    window.cancelAnimationFrame(this._animationFrameHandle);
                    this._animationFrameHandle = null;
                    this.ensureMinSelectionWidth();
                    this.drawSelection();
                    this.raiseSelectionTimeRangeChangedEvent(this._handlePosition);
                    this.setAriaLabelForSliders();
                    this._dragDirection = DiagnosticsHub.DragDirection.None;
                    this._sqmRuler.selectionChanged(DiagnosticsHub.Sqm.SelectionChangeSource.DoubleSlider, this._selectionPixelWidth === this._config.minimumRangeInPixel);
                };
                DoubleSlider.prototype.onDraggingAnimation = function () {
                    this.drawSelection();
                    this.raiseSelectionTimeRangeChangedEvent(this._handlePosition, true);
                    this._animationFrameHandle = window.requestAnimationFrame(this._onDraggingAnimation);
                };
                DoubleSlider.prototype.onDrag = function (event) {
                    if(this.checkIfMouseInsideValidSelectionArea(event)) {
                        var xPixels = this.getSelectionStartWidth(event);
                        this._dragDirection = DoubleSlider.getDragDirection(xPixels - this._initialSelectionPixelStartX);
                        this._selectionPixelWidth = Math.abs(xPixels - this._initialSelectionPixelStartX);
                        if(this._dragDirection === DiagnosticsHub.DragDirection.Left) {
                            this._selectionPixelStartX = this._initialSelectionPixelStartX - this._selectionPixelWidth;
                        }
                    }
                    event.stopPropagation();
                };
                DoubleSlider.prototype.resetHandlePosition = function () {
                    this._lSlider.style.left = (this._config.bar.left - this._config.leftSlider.width) + "px";
                    this._config.leftSlider.left = (this._config.bar.left - this._config.leftSlider.width);
                    this._lUnselectedRegion.style.width = "0px";
                    this._lUnselectedRegion.style.left = this._config.bar.left + "px";
                    var rSliderLeft = this.containerClientWidth - this._config.bar.right;
                    this._rSlider.style.left = rSliderLeft + "px";
                    this._config.rightSlider.left = rSliderLeft;
                    this._rUnselectedRegion.style.width = "0px";
                    this._rUnselectedRegion.style.left = rSliderLeft + "px";
                };
                DoubleSlider.prototype.resetScale = function () {
                    this._scale.setTimeRange(this._currentTimeRange);
                    this._scale.render();
                    this.setAriaLabelForRuler();
                    this.setAriaLabelForSliders();
                };
                DoubleSlider.prototype.convertToPixel = function (time) {
                    var pixels = 0;
                    if(this._currentTimeRange.elapsed.greater(DiagnosticsHub.BigNumber.zero)) {
                        var timeFromRangeStart = parseInt(DiagnosticsHub.BigNumber.subtract(time, this._currentTimeRange.begin).value);
                        var range = parseInt(this._currentTimeRange.elapsed.value);
                        pixels = (timeFromRangeStart / range) * (this.containerClientWidth - this._config.bar.left - this._config.bar.right);
                    }
                    return pixels;
                };
                DoubleSlider.prototype.setAriaLabelForRuler = function () {
                    if(this._container) {
                        var label = Plugin.Resources.getString("RulerAriaLabel", RulerUtilities.formatTime(this._currentTimeRange.begin, DiagnosticsHub.UnitFormat.fullName), RulerUtilities.formatTime(this._currentTimeRange.end, DiagnosticsHub.UnitFormat.fullName));
                        this._container.setAttribute("aria-label", label);
                    }
                };
                return DoubleSlider;
            })();
            DiagnosticsHub.DoubleSlider = DoubleSlider;            
            var MarkData = (function () {
                function MarkData(time, tooltip) {
                    this.time = time;
                    this.tooltip = tooltip;
                }
                return MarkData;
            })();
            DiagnosticsHub.MarkData = MarkData;            
            var AggregatedMarkData = (function () {
                function AggregatedMarkData() {
                    this._content = [];
                    this.marks = [];
                }
                AggregatedMarkData.prototype.getTooltipContent = function () {
                    this.updateData();
                    return this._content.join("\r\n");
                };
                AggregatedMarkData.prototype.getAriaContent = function () {
                    this.updateData();
                    return this._content.join(", ");
                };
                AggregatedMarkData.prototype.length = function () {
                    return this.marks.length;
                };
                AggregatedMarkData.prototype.push = function (mark) {
                    if(!this.time || this.time > mark.time) {
                        this.time = mark.time;
                    }
                    this.marks.push(mark);
                };
                AggregatedMarkData.prototype.updateData = function () {
                    if(this._content.length === this.marks.length) {
                        return;
                    }
                    this._content = [];
                    for(var i = 0; i < this.marks.length; i++) {
                        if(this.marks[i].tooltip !== null && typeof this.marks[i].tooltip !== "undefined") {
                            var mark = this.marks[i];
                            var tooltip = mark.tooltip;
                            tooltip += Plugin.Resources.getString("RulerMarkTooltipLabel", VisualStudio.DiagnosticsHub.RulerUtilities.formatTime(mark.time));
                            this._content.push(tooltip);
                        }
                    }
                };
                return AggregatedMarkData;
            })();
            DiagnosticsHub.AggregatedMarkData = AggregatedMarkData;            
            var RulerScale = (function () {
                function RulerScale(config) {
                    this._containerClientWidth = null;
                    this._scaleMainDivClientWidth = null;
                    this._scaleMarksImageWidth = 9;
                    this._rulerScaleTickmarkBigCss = "ruler-scale-tickmark-big";
                    this._rulerScaleTickmarkMediumCss = "ruler-scale-tickmark-medium";
                    this._rulerScaleTickmarkSmallCss = "ruler-scale-tickmark-small";
                    this._rulerScaleMarkImageEventCss = "ruler-scale-mark-image-event";
                    this._rulerScaleLabelTextCss = "ruler-scale-label-text";
                    this._rulerScaleMainCss = "ruler-scale-main";
                    this._rulerScaleTickmarksCss = "ruler-scale-tickmarks";
                    this._rulerScaleMarkImagePositionCss = "ruler-scale-mark-image-position";
                    this._minimumMarkDistance = 7;
                    this._onResizeHandler = this.resize.bind(this);
                    if(config && config.containerId && config.timeRange) {
                        this._timeRange = config.timeRange;
                        this._container = document.getElementById(config.containerId);
                        this._container.onresize = this._onResizeHandler;
                        this._seriesList = config.series;
                        this._imageTokenList = config.imageTokenList;
                        this._aggregatedMarkImageToken = config.aggregatedImageToken;
                        while(this._container.hasChildNodes()) {
                            this._container.removeChild(this._container.firstChild);
                        }
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                    }
                }
                Object.defineProperty(RulerScale.prototype, "containerClientWidth", {
                    get: function () {
                        if(this._container && (this._containerClientWidth === null || typeof (this._containerClientWidth) === "undefined")) {
                            this._containerClientWidth = this._container.clientWidth;
                        }
                        return this._containerClientWidth;
                    },
                    set: function (value) {
                        this._containerClientWidth = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RulerScale.prototype, "scaleMainDivClientWidth", {
                    get: function () {
                        if(this._scaleMainDiv && (this._scaleMainDivClientWidth === null || typeof this._scaleMainDivClientWidth === "undefined")) {
                            this._scaleMainDivClientWidth = this._scaleMainDiv.clientWidth;
                        }
                        return this._scaleMainDivClientWidth;
                    },
                    set: function (value) {
                        this._scaleMainDivClientWidth = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                RulerScale.prototype.setTimeRange = function (time) {
                    this._timeRange = time;
                };
                RulerScale.prototype.deinitialize = function () {
                    window.removeEventListener("resize", this._onResizeHandler);
                    if(this._container) {
                        this._container.onresize = null;
                    }
                };
                RulerScale.prototype.resize = function () {
                    if(this.containerClientWidth === this._container.clientWidth) {
                        return;
                    }
                    this.invalidateSizeCache();
                    this.render();
                };
                RulerScale.prototype.invalidateSizeCache = function () {
                    if(this._container) {
                        this.containerClientWidth = this._container.clientWidth;
                    }
                    if(this._scaleMainDiv) {
                        this._scaleMainDivClientWidth = this._scaleMainDiv.clientWidth;
                    }
                };
                RulerScale.prototype.getTimePerPixel = function (timeRangeOverride) {
                    var time = DiagnosticsHub.BigNumber.zero;
                    var timeRange = (timeRangeOverride) ? timeRangeOverride : this._timeRange;
                    if(this._containerClientWidth > 0) {
                        time = DiagnosticsHub.BigNumber.divideNumber(timeRange.elapsed, this._containerClientWidth);
                    }
                    return time;
                };
                RulerScale.prototype.render = function () {
                    var _this = this;
                    if(this._container) {
                        if(!this._scaleMainDiv) {
                            this._scaleMainDiv = document.createElement("div");
                            this._scaleMainDiv.className = this._rulerScaleMainCss;
                            window.addEventListener("resize", this._onResizeHandler);
                            this._container.appendChild(this._scaleMainDiv);
                        }
                        if(!this._scaleTickMarksDiv) {
                            this._scaleTickMarksDiv = document.createElement("div");
                            this._scaleTickMarksDiv.className = this._rulerScaleTickmarksCss;
                            this._scaleMainDiv.appendChild(this._scaleTickMarksDiv);
                            this._scaleBigTickMarkElementsFactory = DiagnosticsHub.Common.ElementRecyclerFactory.forDivWithClass(this._scaleTickMarksDiv, this._rulerScaleTickmarkBigCss);
                            this._scaleMediumTickMarkElementsFactory = DiagnosticsHub.Common.ElementRecyclerFactory.forDivWithClass(this._scaleTickMarksDiv, this._rulerScaleTickmarkMediumCss);
                            this._scaleSmallTickMarkElementsFactory = DiagnosticsHub.Common.ElementRecyclerFactory.forDivWithClass(this._scaleTickMarksDiv, this._rulerScaleTickmarkSmallCss);
                            this._scaleTickMarkLabelElementsFactory = DiagnosticsHub.Common.ElementRecyclerFactory.forDivWithClass(this._scaleTickMarksDiv, this._rulerScaleLabelTextCss);
                            this._scaleMarkElementsFactory = new DiagnosticsHub.Common.ElementRecyclerFactory(this._scaleTickMarksDiv, function () {
                                return _this.createMarkVisual(_this._rulerScaleMarkImageEventCss);
                            });
                        }
                        this._tickMarkList = RulerUtilities.getTickMarksPosition(this._timeRange, this.containerClientWidth);
                        this.renderTickMarks();
                    }
                };
                RulerScale.prototype.addMark = function (id, markData, shouldRender) {
                    if (typeof shouldRender === "undefined") { shouldRender = true; }
                    if(this._seriesList && id && markData && markData.time && this._timeRange.contains(markData.time)) {
                        var series;
                        for(var j = 0; j < this._seriesList.length; j++) {
                            if(this._seriesList[j].id === id) {
                                series = this._seriesList[j];
                                if(!series.data) {
                                    series.data = [];
                                }
                                series.data.push(markData);
                                break;
                            }
                        }
                        if(shouldRender) {
                            this.renderMarks();
                        }
                    }
                };
                RulerScale.prototype.renderTickMarks = function () {
                    this._scaleBigTickMarkElementsFactory.start();
                    this._scaleMediumTickMarkElementsFactory.start();
                    this._scaleSmallTickMarkElementsFactory.start();
                    this._scaleTickMarkLabelElementsFactory.start();
                    for(var i = 0; i < this._tickMarkList.length; i++) {
                        var tick;
                        switch(this._tickMarkList[i].type) {
                            case DiagnosticsHub.TickMarkType.Big:
                                tick = this._scaleBigTickMarkElementsFactory.getNext();
                                break;
                            case DiagnosticsHub.TickMarkType.Medium:
                                tick = this._scaleMediumTickMarkElementsFactory.getNext();
                                break;
                            case DiagnosticsHub.TickMarkType.Small:
                                tick = this._scaleSmallTickMarkElementsFactory.getNext();
                                break;
                        }
                        if(tick) {
                            tick.style.left = this.calculateElementPosition(this._tickMarkList[i].value) + "px";
                            if(DiagnosticsHub.TickMarkType.Big === this._tickMarkList[i].type) {
                                var label = this._scaleTickMarkLabelElementsFactory.getNext();
                                label.innerText = this._tickMarkList[i].label;
                                label.style.left = parseFloat(tick.style.left) + 1 + "px";
                            }
                        }
                    }
                    this._scaleBigTickMarkElementsFactory.stop();
                    this._scaleMediumTickMarkElementsFactory.stop();
                    this._scaleSmallTickMarkElementsFactory.stop();
                    this._scaleTickMarkLabelElementsFactory.stop();
                    this.renderMarks();
                };
                RulerScale.prototype.renderMarks = function () {
                    var _this = this;
                    if(this._scaleTickMarksDiv) {
                        this.createAggregateMarkList();
                        this._scaleMarkElementsFactory.start();
                        if(this._data) {
                            for(var j = 0; j < this._data.length; j++) {
                                var mark = this._data[j];
                                if(mark && mark.time && this._timeRange.contains(mark.time)) {
                                    (function (m) {
                                        var markDiv = _this._scaleMarkElementsFactory.getNext();
                                        if(m.glyphIndex === null || typeof m.glyphIndex === "undefined" || m.glyphIndex === -1 || !_this._imageTokenList[m.glyphIndex]) {
                                            markDiv.style.backgroundImage = "url(" + Plugin.Theme.getValue(_this._aggregatedMarkImageToken) + ")";
                                        } else {
                                            markDiv.style.backgroundImage = "url(" + Plugin.Theme.getValue(_this._imageTokenList[m.glyphIndex]) + ")";
                                        }
                                        markDiv.style.left = m.pixelPosition + "px";
                                        markDiv.onmouseover = function () {
                                            return _this.showMarkTooltip(m);
                                        };
                                        markDiv.onmouseout = (Plugin).Tooltip.dismiss;
                                        markDiv.onfocus = function () {
                                            markDiv.setAttribute("aria-label", Plugin.Resources.getString("RulerMarkLabel", m.getAriaContent()));
                                        };
                                    })(mark);
                                }
                            }
                        }
                        this._scaleMarkElementsFactory.stop();
                    }
                };
                RulerScale.prototype.createAggregateMarkList = function () {
                    this._data = [];
                    var seriesList = this._seriesList;
                    if(seriesList) {
                        for(var i = 0; i < seriesList.length; i++) {
                            var seriesData = seriesList[i].data;
                            if(!seriesData) {
                                continue;
                            }
                            var seriesIndex = seriesList[i].index;
                            for(var j = 0; j < seriesData.length; j++) {
                                var dataPoint = seriesData[j];
                                if(this._timeRange.contains(dataPoint.time)) {
                                    this.createAggregatedMark(dataPoint, seriesIndex);
                                }
                            }
                        }
                    }
                    this._data.sort(function (a, b) {
                        return a.time.compareTo(b.time);
                    });
                };
                RulerScale.prototype.createAggregatedMark = function (mark, markGlyphIndex) {
                    var markPosition = this.calculateElementPosition(mark.time) - (this._scaleMarksImageWidth / 2);
                    var isNewAggregatedMark = true;
                    for(var markIndex = 0; markIndex < this._data.length; ++markIndex) {
                        var currentAggregatedMark = this._data[markIndex];
                        if(Math.abs(currentAggregatedMark.pixelPosition - markPosition) <= this._minimumMarkDistance) {
                            currentAggregatedMark.push(mark);
                            if(currentAggregatedMark.glyphIndex !== markGlyphIndex) {
                                currentAggregatedMark.glyphIndex = (currentAggregatedMark.glyphIndex === 0 || currentAggregatedMark.glyphIndex === 1) && (markGlyphIndex === 0 || markGlyphIndex === 1) ? 0 : -1;
                            }
                            isNewAggregatedMark = false;
                            break;
                        }
                    }
                    if(isNewAggregatedMark) {
                        var newAggregatedMark = new AggregatedMarkData();
                        newAggregatedMark.push(mark);
                        newAggregatedMark.glyphIndex = markGlyphIndex;
                        newAggregatedMark.pixelPosition = markPosition;
                        this._data.push(newAggregatedMark);
                    }
                };
                RulerScale.prototype.showMarkTooltip = function (mark) {
                    var toolTipContent = mark.getTooltipContent();
                    if(toolTipContent) {
                        var config = {
                            content: toolTipContent
                        };
                        (Plugin).Tooltip.show(config);
                    }
                };
                RulerScale.prototype.createMarkVisual = function (className) {
                    var markDiv = document.createElement("div");
                    markDiv.tabIndex = 0;
                    markDiv.classList.add(className);
                    markDiv.classList.add(this._rulerScaleMarkImagePositionCss);
                    return markDiv;
                };
                RulerScale.prototype.calculateElementPosition = function (time) {
                    return Math.round((this.scaleMainDivClientWidth * parseInt(DiagnosticsHub.BigNumber.subtract(time, this._timeRange.begin).value) / parseInt(this._timeRange.elapsed.value)));
                };
                return RulerScale;
            })();
            DiagnosticsHub.RulerScale = RulerScale;            
            var RulerUtilities = (function () {
                function RulerUtilities() { }
                RulerUtilities.OneMillisecond = 1000000;
                RulerUtilities.OneSecond = 1000 * 1000000;
                RulerUtilities.OneMinute = 60 * 1000 * 1000000;
                RulerUtilities.Counter = 0;
                RulerUtilities.getRandomNumber = function getRandomNumber() {
                    return RulerUtilities.Counter++;
                };
                RulerUtilities.getTickMarksPosition = function getTickMarksPosition(timeRange, width) {
                    var range = timeRange.elapsed;
                    var rangeNum = parseInt(range.value);
                    var begin = timeRange.begin;
                    var tickMarkList = [];
                    var intervalDuration = Math.pow(10, Math.floor(Math.log(rangeNum) / Math.LN10));
                    var intervalWidth = (width / rangeNum) * intervalDuration;
                    if(intervalWidth < 100) {
                        if(intervalWidth < 25) {
                            intervalDuration *= 8;
                        } else if(intervalWidth < 50) {
                            intervalDuration *= 4;
                        } else if(intervalWidth < 100) {
                            intervalDuration *= 2;
                        }
                    } else if(intervalWidth > 250) {
                        if(intervalWidth < 400) {
                            intervalDuration /= 2;
                        } else if(intervalWidth < 800) {
                            intervalDuration /= 4;
                        } else if(intervalWidth < 1600) {
                            intervalDuration /= 8;
                        } else {
                            intervalDuration /= 10;
                        }
                    }
                    if(intervalDuration > 0) {
                        var smallTickDuration = intervalDuration / 10;
                        var mediumTickDuration = intervalDuration / 2;
                        intervalWidth = (width / rangeNum) * intervalDuration;
                        if(intervalWidth < 130) {
                            smallTickDuration = intervalDuration / 5;
                        }
                        tickMarkList = RulerUtilities.generateTickMarks(timeRange, DiagnosticsHub.BigNumber.subtract(begin, DiagnosticsHub.BigNumber.moduloNumber(begin, intervalDuration)), DiagnosticsHub.BigNumber.convertFromNumber(intervalDuration), DiagnosticsHub.BigNumber.convertFromNumber(mediumTickDuration), DiagnosticsHub.BigNumber.convertFromNumber(smallTickDuration));
                    }
                    return tickMarkList;
                };
                RulerUtilities.getVerticalLinePositions = function getVerticalLinePositions(timeRange, width) {
                    var positions = [];
                    var marks = RulerUtilities.getTickMarksPosition(timeRange, width);
                    for(var i = 0; i < marks.length; ++i) {
                        var mark = marks[i];
                        if(mark.type === DiagnosticsHub.TickMarkType.Big) {
                            var position = parseInt(DiagnosticsHub.BigNumber.subtract(mark.value, timeRange.begin).value) / parseInt(timeRange.elapsed.value) * 100;
                            positions.push(position);
                        }
                    }
                    return positions;
                };
                RulerUtilities.formatTime = function formatTime(value, unitFormat) {
                    if (typeof unitFormat === "undefined") { unitFormat = DiagnosticsHub.UnitFormat.italicizedAbbreviations; }
                    var splitTime = RulerUtilities.getSplittedTime(value);
                    var time = "0";
                    var nf = RulerUtilities.getNumberFormat();
                    if(parseInt(splitTime.minString)) {
                        if(!parseInt(splitTime.secString) && !parseInt(splitTime.msString) && !parseInt(splitTime.nsString)) {
                            time = splitTime.minString + ":00";
                        } else if(!parseInt(splitTime.msString) && !parseInt(splitTime.nsString)) {
                            time = splitTime.minString + ":" + splitTime.secString;
                        } else if(!parseInt(splitTime.nsString)) {
                            splitTime.msString = splitTime.msString.replace(/0*$/, "");
                            time = splitTime.minString + ":" + splitTime.secString + nf.numberDecimalSeparator + splitTime.msString;
                        } else {
                            splitTime.nsString = splitTime.nsString.replace(/0*$/, "");
                            time = splitTime.minString + ":" + splitTime.secString + nf.numberDecimalSeparator + splitTime.msString + splitTime.nsString;
                        }
                    } else if(parseInt(splitTime.secString)) {
                        if(!parseInt(splitTime.msString) && !parseInt(splitTime.nsString)) {
                            time = splitTime.secString;
                        } else if(!parseInt(splitTime.nsString)) {
                            splitTime.msString = splitTime.msString.replace(/0*$/, "");
                            time = splitTime.secString + nf.numberDecimalSeparator + splitTime.msString;
                        } else {
                            splitTime.nsString = splitTime.nsString.replace(/0*$/, "");
                            time = splitTime.secString + nf.numberDecimalSeparator + splitTime.msString + splitTime.nsString;
                        }
                    } else if(parseInt(splitTime.msString)) {
                        if(!parseInt(splitTime.nsString)) {
                            time = splitTime.msString;
                        } else {
                            splitTime.nsString = splitTime.nsString.replace(/0*$/, "");
                            time = splitTime.msString + nf.numberDecimalSeparator + splitTime.nsString;
                        }
                    } else if(parseInt(splitTime.nsString)) {
                        splitTime.nsString = splitTime.nsString.replace(/0*$/, "");
                        time = "0" + nf.numberDecimalSeparator + splitTime.nsString;
                    }
                    var unit = RulerUtilities.getUnit(parseInt(value.value), unitFormat);
                    return time + unit;
                };
                RulerUtilities.formatTitleTime = function formatTitleTime(value, unitFormat, isLive) {
                    if (typeof unitFormat === "undefined") { unitFormat = DiagnosticsHub.UnitFormat.fullName; }
                    if (typeof isLive === "undefined") { isLive = false; }
                    var splitTime = RulerUtilities.getSplittedTime(value);
                    var time = "0";
                    var nf = RulerUtilities.getNumberFormat();
                    if(isLive) {
                        splitTime.msString = "";
                        splitTime.nsString = "";
                    }
                    if(parseInt(splitTime.minString)) {
                        if(!parseInt(splitTime.secString)) {
                            time = splitTime.minString + ":00";
                        } else {
                            time = splitTime.minString + ":" + splitTime.secString;
                        }
                    } else if(parseInt(splitTime.secString)) {
                        if(!parseInt(splitTime.msString)) {
                            time = splitTime.secString;
                        } else {
                            splitTime.msString = splitTime.msString.replace(/0*$/, "");
                            time = splitTime.secString + nf.numberDecimalSeparator + splitTime.msString;
                        }
                    } else if(parseInt(splitTime.msString)) {
                        if(!parseInt(splitTime.nsString)) {
                            time = splitTime.msString;
                        } else {
                            splitTime.nsString = splitTime.nsString.replace(/0*$/, "");
                            time = splitTime.msString + nf.numberDecimalSeparator + splitTime.nsString;
                        }
                    } else if(parseInt(splitTime.nsString)) {
                        splitTime.nsString = splitTime.nsString.replace(/0*$/, "");
                        time = "0" + nf.numberDecimalSeparator + splitTime.nsString;
                    }
                    return time;
                };
                RulerUtilities.formatSelectionTime = function formatSelectionTime(value) {
                    var time = RulerUtilities.formatTitleTime(value, DiagnosticsHub.UnitFormat.fullName, false);
                    var unit = RulerUtilities.getSelectedUnit(parseInt(value.value));
                    return time + unit;
                };
                RulerUtilities.formatTotalTime = function formatTotalTime(value, unitFormat, isLive) {
                    if (typeof unitFormat === "undefined") { unitFormat = DiagnosticsHub.UnitFormat.fullName; }
                    if (typeof isLive === "undefined") { isLive = false; }
                    var time = RulerUtilities.formatTitleTime(value, unitFormat, isLive);
                    var unit = RulerUtilities.getUnit(parseInt(value.value), unitFormat, isLive);
                    return time + unit;
                };
                RulerUtilities.generateTickMarks = function generateTickMarks(timeRange, start, bigTick, mediumTick, step) {
                    var tickMarkList = [];
                    var beginNsec = timeRange.begin;
                    var endNsec = timeRange.end;
                    if(step.equals(DiagnosticsHub.BigNumber.zero)) {
                        step = new DiagnosticsHub.BigNumber(0, 1);
                    }
                    for(var i = start; endNsec.greater(i); i = DiagnosticsHub.BigNumber.add(i, step)) {
                        if(i.greater(beginNsec)) {
                            var tickMarkTime = i;
                            if(DiagnosticsHub.BigNumber.modulo(i, bigTick).equals(DiagnosticsHub.BigNumber.zero)) {
                                tickMarkList.push({
                                    type: DiagnosticsHub.TickMarkType.Big,
                                    value: tickMarkTime,
                                    label: RulerUtilities.formatTime(tickMarkTime)
                                });
                            } else if(DiagnosticsHub.BigNumber.modulo(i, mediumTick).equals(DiagnosticsHub.BigNumber.zero)) {
                                tickMarkList.push({
                                    type: DiagnosticsHub.TickMarkType.Medium,
                                    value: tickMarkTime,
                                    label: RulerUtilities.formatTime(tickMarkTime)
                                });
                            } else {
                                tickMarkList.push({
                                    type: DiagnosticsHub.TickMarkType.Small,
                                    value: tickMarkTime,
                                    label: RulerUtilities.formatTime(tickMarkTime)
                                });
                            }
                        }
                    }
                    return tickMarkList;
                };
                RulerUtilities.getSelectedUnit = function getSelectedUnit(valueNs) {
                    if(valueNs < RulerUtilities.OneSecond) {
                        return " " + Plugin.Resources.getString("MillisecondsSelectedLabel");
                    } else if(valueNs < RulerUtilities.OneMinute) {
                        return " " + Plugin.Resources.getString("SecondsSelectedLabel");
                    } else {
                        return " " + Plugin.Resources.getString("MinutesSelectedLabel");
                    }
                };
                RulerUtilities.getUnit = function getUnit(valueNs, unitFormat, isLive) {
                    if (typeof isLive === "undefined") { isLive = false; }
                    var units = this.getUnits(unitFormat);
                    var unit;
                    if(valueNs < RulerUtilities.OneSecond && !isLive) {
                        unit = units.milliseconds;
                    } else if(valueNs < RulerUtilities.OneMinute) {
                        unit = units.seconds;
                    } else {
                        unit = units.minutes;
                    }
                    return unit;
                };
                RulerUtilities.getUnits = function getUnits(unitFormat) {
                    var unitLabelFormat;
                    if(unitFormat === DiagnosticsHub.UnitFormat.fullName) {
                        unitLabelFormat = {
                            milliseconds: " " + Plugin.Resources.getString("MillisecondsLabel"),
                            seconds: " " + Plugin.Resources.getString("SecondsLabel"),
                            minutes: " " + Plugin.Resources.getString("MinutesLabel")
                        };
                    } else {
                        unitLabelFormat = {
                            milliseconds: Plugin.Resources.getString("MillisecondsAbbreviation"),
                            seconds: Plugin.Resources.getString("SecondsAbbreviation"),
                            minutes: Plugin.Resources.getString("MinutesAbbreviation")
                        };
                    }
                    return unitLabelFormat;
                };
                RulerUtilities.getSplittedTime = function getSplittedTime(value) {
                    var nanoseconds = DiagnosticsHub.BigNumber.moduloNumber(value, RulerUtilities.OneMillisecond);
                    var valueUnaccountedFor = DiagnosticsHub.BigNumber.subtract(value, nanoseconds);
                    var milliseconds = DiagnosticsHub.BigNumber.moduloNumber(valueUnaccountedFor, RulerUtilities.OneSecond);
                    valueUnaccountedFor = DiagnosticsHub.BigNumber.subtract(valueUnaccountedFor, milliseconds);
                    var seconds = DiagnosticsHub.BigNumber.moduloNumber(valueUnaccountedFor, RulerUtilities.OneMinute);
                    valueUnaccountedFor = DiagnosticsHub.BigNumber.subtract(valueUnaccountedFor, seconds);
                    var minutes = valueUnaccountedFor;
                    var nanosecondsNum = parseInt(nanoseconds.value);
                    var minutesNum = parseInt(minutes.value) / RulerUtilities.OneMinute;
                    var secondsNum = parseInt(seconds.value) / RulerUtilities.OneSecond;
                    var millisecondsNum = parseInt(milliseconds.value) / RulerUtilities.OneMillisecond;
                    var ns = "";
                    if(nanosecondsNum > 999) {
                        ns = nanosecondsNum.toString().substr(0, 3);
                    }
                    var ms = "";
                    if(ns || millisecondsNum) {
                        ms = millisecondsNum.toString();
                        if(secondsNum) {
                            while(ms.length < 3) {
                                ms = "0" + ms;
                            }
                        }
                    }
                    var sec = "";
                    if(ns || ms || secondsNum) {
                        sec = secondsNum.toString();
                        if(minutesNum) {
                            while(sec.length < 2) {
                                sec = "0" + sec;
                            }
                        }
                    }
                    var min = "";
                    if(minutesNum) {
                        min = minutesNum.toString();
                    }
                    return {
                        nsString: ns,
                        msString: ms,
                        secString: sec,
                        minString: min
                    };
                };
                RulerUtilities.getNumberFormat = function getNumberFormat() {
                    var nf = (Plugin).Culture.NumberFormat;
                    if(!nf || nf.length === 0) {
                        nf = {
                            numberDecimalSeparator: "."
                        };
                    }
                    return nf;
                };
                return RulerUtilities;
            })();
            DiagnosticsHub.RulerUtilities = RulerUtilities;            
            var RulerLegend = (function () {
                function RulerLegend(config) {
                    this._rulerLegendColorDivCss = "ruler-legend-color-div";
                    this._rulerLegendTextDivCss = "ruler-legend-text-div";
                    this._rulerLegendDivCss = "ruler-legend-div";
                    this._legendImageCss = "ruler-label-mark-image";
                    if(!config || !config.containerId) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                    }
                    this._config = config;
                }
                RulerLegend.prototype.render = function () {
                    for(var legendItemIndex = 0; legendItemIndex < this._config.data.length; legendItemIndex++) {
                        var legendItem = this._config.data[legendItemIndex];
                        this.renderLegendItem(legendItem);
                    }
                };
                RulerLegend.prototype.renderLegendItem = function (legendItemData) {
                    var legendColorDiv = document.createElement("div");
                    legendColorDiv.className = this._rulerLegendColorDivCss;
                    var colorDiv = document.createElement("div");
                    colorDiv.className = this._legendImageCss;
                    colorDiv.style.backgroundImage = "url(" + Plugin.Theme.getValue(legendItemData.imageToken) + ")";
                    legendColorDiv.appendChild(colorDiv);
                    var legendTextDiv = document.createElement("div");
                    legendTextDiv.className = this._rulerLegendTextDivCss;
                    legendTextDiv.innerHTML = legendItemData.text;
                    var individualLegendBox = document.createElement("div");
                    individualLegendBox.className = this._rulerLegendDivCss;
                    individualLegendBox.appendChild(legendColorDiv);
                    individualLegendBox.appendChild(legendTextDiv);
                    if(legendItemData.tooltip) {
                        individualLegendBox.setAttribute("data-plugin-vs-tooltip", legendItemData.tooltip);
                    }
                    var container = document.getElementById(this._config.containerId);
                    container.appendChild(individualLegendBox);
                };
                return RulerLegend;
            })();
            DiagnosticsHub.RulerLegend = RulerLegend;            
            var RulerHeader = (function () {
                function RulerHeader(config) {
                    this._rulerTitleTextCss = "ruler-title-text";
                    this._config = config;
                }
                RulerHeader.prototype.setTitle = function (value) {
                    if(this._titleText) {
                        var text = Plugin.Resources.getString("RulerTitle") || this._config.titleConfig.text || "";
                        if(this._config.titleConfig.description) {
                            text += ": " + value;
                        }
                        this._titleText.innerHTML = text;
                    }
                };
                RulerHeader.prototype.render = function () {
                    this._container = document.getElementById(this._config.containerId);
                    while(this._container.hasChildNodes()) {
                        this._container.removeChild(this._container.firstChild);
                    }
                    var titleContainer = document.createElement("div");
                    titleContainer.id = this._config.titleConfig.containerId;
                    titleContainer.className = this._config.titleConfig.className;
                    this._titleText = document.createElement("div");
                    this._titleText.className = this._rulerTitleTextCss;
                    var text = Plugin.Resources.getString("RulerTitle") || this._config.titleConfig.text || "";
                    if(this._config.titleConfig.description) {
                        text += ": " + this._config.titleConfig.description;
                    }
                    this._titleText.innerHTML = text;
                    titleContainer.appendChild(this._titleText);
                    var legendContainer = document.createElement("div");
                    legendContainer.id = this._config.legendConfig.containerId;
                    legendContainer.className = this._config.legendConfig.className;
                    this._container.appendChild(titleContainer);
                    this._container.appendChild(legendContainer);
                    this.legend = new RulerLegend(this._config.legendConfig);
                    this.legend.render();
                };
                return RulerHeader;
            })();
            DiagnosticsHub.RulerHeader = RulerHeader;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var DiagnosticsHubDataManager = (function () {
                function DiagnosticsHubDataManager() {
                    this._graphConfigurationMarshaler = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.DiagnosticsHub.VisualStudio.Presentation.JavaScriptModels.SwimLanesViewMarshaler", {
                    }, true);
                    if(!this._graphConfigurationMarshaler) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1007"));
                    }
                }
                DiagnosticsHubDataManager.prototype.getConfigurations = function (func) {
                    this._graphConfigurationMarshaler._call("getConfigurations").done(func);
                };
                DiagnosticsHubDataManager.prototype.dataUpdate = function (func) {
                    this._graphConfigurationMarshaler.addEventListener("dataUpdate", func);
                };
                return DiagnosticsHubDataManager;
            })();
            DiagnosticsHub.DiagnosticsHubDataManager = DiagnosticsHubDataManager;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var Renderer = (function () {
                function Renderer(config) {
                    this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                    this._swimLanes = [];
                    this._swimLaneContainers = [];
                    this._baseContainerId = "mainContainer";
                    this._rulerContainerId = "rulerContainer";
                    this._mainSwimlaneContainerId = "mainSwimlaneContainer";
                    this._mainSwimlaneMarginId = "mainSwimlaneMargin";
                    this._mainToolbarContainerId = "toolBarContainer";
                    this._mainInformationContainerId = "informationContainer";
                    this._mainSwimlaneContainerCss = "main-swimlane-container";
                    this._mainSwimlaneMarginCss = "main-swimlane-margin";
                    this._swimlaneDivCss = "swimlane-container";
                    this._swimlaneContainerIdPrefix = "swimlaneContainer";
                    this._mainContainerCss = "main-container";
                    this._mainRulerContainerCss = "main-ruler-container";
                    this._mainToolbarContainerCss = "main-toolbar-container";
                    this._mainInformationContainerCss = "main-information-container";
                    this._baseContainerCss = "base-container";
                    this._toolbarFloatContainerCss = "toolbar-float";
                    this._mainEmptyContainerCss = "main-empty";
                    this._divIndex = 0;
                    this._markSeriesConfig = [];
                    this._dataWarehouse = null;
                    this._maxHeight = 600;
                    this._minHeight = 200;
                    this._isToolbarFloating = false;
                    this._externalHyperlink = "http://go.microsoft.com/fwlink/p/?LinkId=391662";
                    this._defaultAnalyzerId = "89fb2d7a-1239-4952-811b-d77e2ee6f2aa";
                    this._minimumZoomWindow = DiagnosticsHub.BigNumber.convertFromNumber(10000);
                    if(!config) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    if(!config.swimlane) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    if(!config.dataManager) {
                        config.dataManager = new DiagnosticsHub.DiagnosticsHubDataManager();
                    }
                    this._eventAggregator = Microsoft.VisualStudio.DiagnosticsHub.getEventAggregator();
                    this._viewEventManager = Microsoft.VisualStudio.DiagnosticsHub.getViewEventManager();
                    this._config = config;
                    this._isToolbarFloating = this._config.isToolbarFloating;
                    window.addEventListener("resize", this.resizeEmptyRulerSpace.bind(this));
                    this._sqmRuler = new DiagnosticsHub.Sqm.Ruler();
                    this._sqmCollectedData = new DiagnosticsHub.Sqm.CollectedData();
                }
                Renderer.prototype.execute = function () {
                    this._config.dataManager.getConfigurations(this.getTotalTimeRange.bind(this));
                };
                Renderer.prototype.resizeEmptyRulerSpace = function (args) {
                    if(this._mainEmptyContainer) {
                        if(this._isToolbarFloating && this._toolbarFloat) {
                            this._mainEmptyContainer.style.height = this._toolbarFloat.clientHeight + "px";
                        } else {
                            this._mainEmptyContainer.style.height = "0px";
                        }
                    }
                    if(this._toolbarFloat) {
                        if(this._container && this._isToolbarFloating) {
                            this._toolbarFloat.style.width = this._container.clientWidth + "px";
                        } else {
                            this._toolbarFloat.style.width = "100%";
                        }
                    }
                    if(this._container && this._mainEmptyContainer) {
                        this.resizeHost();
                    }
                };
                Renderer.prototype.getTotalTimeRange = function (data) {
                    var _this = this;
                    return Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse().then(function (dw) {
                        _this._dataWarehouse = dw;
                        var contextService = dw.getContextService();
                        return contextService.getGlobalContext();
                    }.bind(this)).then(function (globalContext) {
                        return globalContext.getTimeDomain();
                    }.bind(this)).then(function (timeDomain) {
                        _this._logger.info("Got timespan, elapsed=" + timeDomain.elapsed.value);
                        _this._viewableTimeRange = _this._viewportTimeRange = timeDomain;
                        var args = {
                            position: _this._viewportTimeRange
                        };
                        _this._viewEventManager.selectionChanged.raiseEvent(args);
                        for(var i = 0; i < data.GraphConfigurations.length; i++) {
                            var config = data.GraphConfigurations[i];
                            config.JsonObject = JSON.parse(config.JsonConfiguration);
                        }
                        _this._graphsConfig = {
                            data: data.GraphConfigurations
                        };
                        _this.createContainers();
                        _this.getLostEvents();
                    }.bind(this), function (err) {
                        _this._logger.error("getTotalTimeRange failed: " + JSON.stringify(err));
                    }.bind(this));
                };
                Renderer.prototype.getLostEvents = function () {
                    if(this._dataWarehouse) {
                        this._dataWarehouse.getFilteredData({
                            customDomain: {
                                task: "get-total-lost-events"
                            }
                        }, this._defaultAnalyzerId).done(this.getTotalLostEventsComplete.bind(this), this.getTotalLostEventsErrorHandler.bind(this));
                    }
                };
                Renderer.prototype.getTotalLostEventsComplete = function (args) {
                    if(args && typeof args.lostEvents === "number" && args.lostEvents > 0) {
                        this._lostEvents = args.lostEvents;
                    }
                    this.loadScripts();
                };
                Renderer.prototype.getTotalLostEventsErrorHandler = function (err) {
                    this._logger.error("Could not get lost events, error: " + JSON.stringify(err));
                    this.loadScripts();
                };
                Renderer.prototype.createContainers = function () {
                    this._baseContainerId = this._config.containerId || this._baseContainerId;
                    this._container = document.getElementById(this._baseContainerId);
                    this._container.classList.add(this._baseContainerCss);
                    this._toolbarFloat = document.createElement("div");
                    this._toolbarFloat.classList.add(this._toolbarFloatContainerCss);
                    if(this._isToolbarFloating) {
                        this._toolbarFloat.style.position = "fixed";
                    }
                    this._container.appendChild(this._toolbarFloat);
                    this._mainContainer = document.createElement("div");
                    this._mainContainer.classList.add(this._mainContainerCss);
                    this._container.appendChild(this._mainContainer);
                    this._informationContainer = document.createElement("div");
                    this._informationContainer.id = this._mainInformationContainerId;
                    this._informationContainer.classList.add(this._mainInformationContainerCss);
                    this._informationContainer.style.display = "none";
                    this._toolbarFloat.appendChild(this._informationContainer);
                    this._toolbarContainer = document.createElement("div");
                    this._toolbarContainer.id = this._mainToolbarContainerId;
                    this._toolbarContainer.classList.add(this._mainToolbarContainerCss);
                    this._toolbarFloat.appendChild(this._toolbarContainer);
                    this._rulerContainer = document.createElement("div");
                    this._rulerContainer.id = this._rulerContainerId;
                    this._rulerContainer.classList.add(this._mainRulerContainerCss);
                    this._toolbarFloat.appendChild(this._rulerContainer);
                    this._mainEmptyContainer = document.createElement("div");
                    this._mainEmptyContainer.classList.add(this._mainEmptyContainerCss);
                    this._mainContainer.appendChild(this._mainEmptyContainer);
                    this._mainSwimlaneContainer = document.createElement("div");
                    this._mainSwimlaneContainer.id = this._mainSwimlaneContainerId;
                    this._mainContainer.appendChild(this._mainSwimlaneContainer);
                    this._mainSwimlaneMargin = document.createElement("div");
                    this._mainSwimlaneMargin.id = this._mainSwimlaneMarginId;
                    this._mainSwimlaneMargin.classList.add(this._mainSwimlaneMarginCss);
                    this._mainContainer.appendChild(this._mainSwimlaneMargin);
                };
                Renderer.prototype.loadScripts = function () {
                    var deps = [];
                    this._dependencyManager = new DiagnosticsHub.Common.DependencyManager();
                    for(var i = 0; i < this._graphsConfig.data.length; i++) {
                        if(this._graphsConfig.data[i].PathToScript) {
                            if(this._graphsConfig.data[i].PathToScript.lastIndexOf("\\") !== -1) {
                                this._graphsConfig.data[i].PathToScriptFolder = this._graphsConfig.data[i].PathToScript.substring(0, this._graphsConfig.data[i].PathToScript.lastIndexOf("\\"));
                            }
                            deps.push({
                                async: false,
                                objType: this._graphsConfig.data[i].JavaScriptClassName,
                                url: this._graphsConfig.data[i].PathToScript
                            });
                        }
                    }
                    this._dependencyManager.addDependencies(deps);
                    this._dependencyManager.loadDependencies(this.render.bind(this));
                };
                Renderer.prototype.initializeContextMenuCommands = function () {
                    var _this = this;
                    var commands = new Array();
                    commands[0] = {
                        id: "zoomin",
                        callback: function () {
                            if(this._toolbar) {
                                this._toolbar.zoomInHandler(null);
                            }
                        }.bind(this),
                        label: Plugin.Resources.getString("ToolbarZoomInButton"),
                        type: Plugin.ContextMenu.MenuItemType.command,
                        iconEnabled: null,
                        iconDisabled: null,
                        accessKey: null,
                        hidden: function () {
                            return false;
                        },
                        disabled: function () {
                            return !_this.getZoomInButtonState();
                        }.bind(this),
                        checked: function () {
                            return false;
                        },
                        cssClass: null,
                        submenu: null
                    };
                    commands[1] = {
                        id: "resetzoom",
                        callback: function () {
                            if(this._toolbar) {
                                this._toolbar.zoomOutHandler(null);
                            }
                        }.bind(this),
                        label: Plugin.Resources.getString("ToolbarZoomOutButton"),
                        type: Plugin.ContextMenu.MenuItemType.command,
                        iconEnabled: null,
                        iconDisabled: null,
                        accessKey: null,
                        hidden: function () {
                            return false;
                        },
                        disabled: function () {
                            return !_this.getResetZoomButtonState();
                        }.bind(this),
                        checked: function () {
                            return false;
                        },
                        cssClass: null,
                        submenu: null
                    };
                    commands[2] = {
                        id: "clearselection",
                        callback: function () {
                            if(this._toolbar) {
                                this._toolbar.selectionHandler(null);
                            }
                        }.bind(this),
                        label: Plugin.Resources.getString("ToolbarClearSelectionButton"),
                        type: Plugin.ContextMenu.MenuItemType.command,
                        iconEnabled: null,
                        iconDisabled: null,
                        accessKey: null,
                        hidden: function () {
                            return false;
                        },
                        disabled: function () {
                            return !_this.getClearSelectionButtonState();
                        }.bind(this),
                        checked: function () {
                            return false;
                        },
                        cssClass: null,
                        submenu: null
                    };
                    this._contextMenu = Plugin.ContextMenu.create(commands, null, null, null, function () {
                    });
                };
                Renderer.prototype.render = function () {
                    if(this._toolbarFloat) {
                        if(this._container && this._isToolbarFloating) {
                            this._toolbarFloat.style.width = this._container.clientWidth + "px";
                        } else {
                            this._toolbarFloat.style.width = "100%";
                        }
                    }
                    this.renderToolbar();
                    this.renderRuler(this._viewportTimeRange);
                    this.createSwimlaneContainers();
                    this.renderSwimlanes();
                    this.resizeHost();
                    this.initializeContextMenuCommands();
                    if(this._lostEvents) {
                        this.createInformationBar();
                        this._informationContainer.style.display = "";
                        this._sqmCollectedData.lostEvents(this._lostEvents);
                    }
                };
                Renderer.prototype.onRightClick = function (evt) {
                    if(this._contextMenu && evt.which === DiagnosticsHub.Common.MouseCodes.Right) {
                        var xPos = (evt).clientX;
                        var yPos = (evt).clientY;
                        this._contextMenu.show(xPos, yPos);
                        return false;
                    }
                    return true;
                };
                Renderer.prototype.resizeHost = function () {
                    if(this._eventAggregator) {
                        var height = Math.ceil(this._informationContainer.offsetHeight + this._toolbarContainer.offsetHeight + this._rulerContainer.offsetHeight + this._mainSwimlaneContainer.offsetHeight + this._mainSwimlaneMargin.offsetHeight);
                        var maxValue = height;
                        var minValue = Math.min(height, this._minHeight);
                        var value = Math.min(this._maxHeight, height);
                        this._eventAggregator.raiseEvent("Microsoft.DiagnosticsHub.SwimlaneResizeHeight", {
                            MinValue: minValue,
                            MaxValue: maxValue,
                            Value: value
                        });
                    }
                };
                Renderer.prototype.createInformationBar = function () {
                    if(this._informationContainer) {
                        var icon = document.createElement("div");
                        icon.classList.add("information-icon");
                        this._informationContainer.appendChild(icon);
                        var droppedEvents = document.createElement("div");
                        droppedEvents.classList.add("dropped-events");
                        droppedEvents.innerHTML = Plugin.Resources.getString("InformationDroppedEvents", this._lostEvents);
                        this._informationContainer.appendChild(droppedEvents);
                        var externalLinkDiv = document.createElement("div");
                        externalLinkDiv.classList.add("information-link");
                        this._informationContainer.appendChild(externalLinkDiv);
                        var externalLink = document.createElement("a");
                        externalLink.href = this._externalHyperlink;
                        externalLink.target = "blank";
                        externalLink.text = Plugin.Resources.getString("InformationLink");
                        externalLink.setAttribute("role", "link");
                        externalLink.setAttribute("aria-label", Plugin.Resources.getString("InformationLink"));
                        externalLinkDiv.appendChild(externalLink);
                        var closeDiv = document.createElement("div");
                        closeDiv.classList.add("information-close-div");
                        this._informationContainer.appendChild(closeDiv);
                        var close = document.createElement("div");
                        close.classList.add("information-close");
                        close.innerHTML = "r";
                        close.tabIndex = 0;
                        close.setAttribute("role", "button");
                        close.setAttribute("aria-label", Plugin.Resources.getString("InformationClose"));
                        close.addEventListener("mouseenter", function () {
                            var config = {
                                content: Plugin.Resources.getString("InformationClose"),
                                delay: 0
                            };
                            (Plugin).Tooltip.show(config);
                        }.bind(this));
                        close.addEventListener("mouseleave", function () {
                            (Plugin).Tooltip.dismiss();
                        }.bind(this));
                        close.addEventListener("focus", function () {
                            this._isInformationCloseFocused = true;
                        }.bind(this));
                        close.addEventListener("blur", function () {
                            this._isInformationCloseFocused = false;
                        }.bind(this));
                        close.addEventListener("keypress", function (evt) {
                            if(this._isInformationCloseFocused && DiagnosticsHub.Common.KeyCodes.Enter === evt.keyCode) {
                                this.collapseInformationBar();
                            }
                        }.bind(this));
                        close.addEventListener("click", function (evt) {
                            this.collapseInformationBar();
                        }.bind(this));
                        closeDiv.appendChild(close);
                    }
                };
                Renderer.prototype.collapseInformationBar = function () {
                    if(this._informationContainer) {
                        this._informationContainer.style.display = "none";
                        this.resizeHost();
                    }
                };
                Renderer.prototype.createSwimlaneContainers = function () {
                    if(this._mainEmptyContainer) {
                        if(this._isToolbarFloating && this._toolbarFloat) {
                            this._mainEmptyContainer.style.height = this._toolbarFloat.clientHeight + "px";
                        } else {
                            this._mainEmptyContainer.style.height = "0px";
                        }
                    }
                    var msGridRowsArr = [];
                    if(this._mainSwimlaneContainer) {
                        this._mainSwimlaneContainer.classList.add(this._mainSwimlaneContainerCss);
                        var swimLaneCount = 0;
                        for(var i = 0; i < this._graphsConfig.data.length; i++) {
                            if(!this._graphsConfig.data[i].JsonObject.View || this._graphsConfig.data[i].JsonObject.View === DiagnosticsHub.ViewType.Graph) {
                                var swimlaneDiv = document.createElement("div");
                                swimlaneDiv.id = this._swimlaneContainerIdPrefix + swimLaneCount;
                                swimlaneDiv.classList.add(this._swimlaneDivCss);
                                swimlaneDiv.style.msGridRow = (swimLaneCount + 1).toString();
                                this._swimLaneContainers.push(swimlaneDiv);
                                msGridRowsArr.push("auto");
                                swimLaneCount++;
                            }
                        }
                        this._mainSwimlaneContainer.style.msGridRows = msGridRowsArr.join(" ");
                        for(var j = 0; j < this._swimLaneContainers.length; j++) {
                            this._mainSwimlaneContainer.appendChild(this._swimLaneContainers[j]);
                        }
                        this._divIndex = 0;
                        this._mainSwimlaneContainer.addEventListener("mousedown", this.onRightClick.bind(this));
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                    }
                };
                Renderer.prototype.renderRuler = function (timeRange) {
                    var config = new DiagnosticsHub.RulerConfig(this._rulerContainerId);
                    config.doubleSlider.isSelectionEnabled = typeof this._config.swimlane.isSelectionEnabled !== "undefined" && this._config.swimlane.isSelectionEnabled !== null ? this._config.swimlane.isSelectionEnabled : config.doubleSlider.isSelectionEnabled;
                    config.doubleSlider.isZoomEnabled = typeof this._config.swimlane.isZoomEnabled !== "undefined" && this._config.swimlane.isZoomEnabled !== null ? this._config.swimlane.isZoomEnabled : config.doubleSlider.isZoomEnabled;
                    config.doubleSlider.timeRange = timeRange;
                    config.doubleSlider.markSeries = [];
                    config.doubleSlider.markSeries.push({
                        id: DiagnosticsHub.MarkType.UserMark,
                        label: Plugin.Resources.getString("RulerUserMarkLabel"),
                        tooltip: Plugin.Resources.getString("UserMarkTooltip")
                    });
                    config.doubleSlider.markSeries.push({
                        id: DiagnosticsHub.MarkType.LifeCycleEvent,
                        label: Plugin.Resources.getString("RulerLifecycleMarkLabel"),
                        tooltip: Plugin.Resources.getString("LifecycleMarkTooltip")
                    });
                    var markTypeIdCounter = 3;
                    var dictionary = {
                    };
                    var legendDictionary = {
                    };
                    for(var i = 0; i < this._graphsConfig.data.length; i++) {
                        if(this._graphsConfig.data[i].JsonObject.View && this._graphsConfig.data[i].JsonObject.View === DiagnosticsHub.ViewType.Ruler) {
                            for(var j = 0; j < this._graphsConfig.data[i].JsonObject.Series.length; j++) {
                                var series = this._graphsConfig.data[i].JsonObject.Series[j];
                                var cId = series.DataSource.CounterId || typeof series.DataSource.CounterId;
                                var aId = series.DataSource.AnalyzerId || typeof series.DataSource.AnalyzerId;
                                if(!dictionary[cId.toLowerCase() + "," + aId.toLowerCase()]) {
                                    dictionary[cId.toLowerCase() + "," + aId.toLowerCase()] = true;
                                    var id = 0;
                                    if(!series.MarkType || series.MarkType === DiagnosticsHub.MarkType.Custom) {
                                        id = markTypeIdCounter;
                                    } else {
                                        id = series.MarkType;
                                    }
                                    if(id !== DiagnosticsHub.MarkType.LifeCycleEvent && id !== DiagnosticsHub.MarkType.UserMark) {
                                        var legend = series.Legend;
                                        if(this._graphsConfig.data[i].Resources && this._graphsConfig.data[i].Resources[legend]) {
                                            legend = this._graphsConfig.data[i].Resources[legend];
                                        }
                                        var tooltip = series.LegendTooltip;
                                        if(this._graphsConfig.data[i].Resources && this._graphsConfig.data[i].Resources[tooltip]) {
                                            tooltip = this._graphsConfig.data[i].Resources[tooltip];
                                        }
                                        if(!legendDictionary[legend]) {
                                            legendDictionary[legend] = id;
                                            config.doubleSlider.markSeries.push({
                                                id: id,
                                                label: legend,
                                                tooltip: tooltip || ""
                                            });
                                            markTypeIdCounter++;
                                        } else {
                                            id = legendDictionary[legend];
                                        }
                                    }
                                    series.MarkTypeId = id;
                                    this._markSeriesConfig.push(series);
                                }
                            }
                        }
                    }
                    this._ruler = new DiagnosticsHub.Ruler(config);
                    this._ruler.render();
                    this.setData(this._viewableTimeRange, this._markSeriesConfig);
                    this._viewEventManager.selectionChanged.addEventListener(this.selectionChanged.bind(this));
                    this._rulerContainer.addEventListener("mousedown", this.onRightClick.bind(this));
                };
                Renderer.prototype.setData = function (timeRange, series) {
                    var _this = this;
                    var configuration = [];
                    for(var i = 0; i < series.length; i++) {
                        var currentSeries = series[i];
                        if(currentSeries) {
                            var dataSource = currentSeries.DataSource;
                            if(dataSource && dataSource.CounterId && dataSource.AnalyzerId) {
                                var seriesConfig = {
                                    counterId: dataSource.CounterId,
                                    analyzerId: dataSource.AnalyzerId,
                                    markTypeId: currentSeries.MarkTypeId
                                };
                                if(dataSource.CustomDomain) {
                                    seriesConfig.customDomain = dataSource.CustomDomain;
                                }
                                configuration.push(seriesConfig);
                                this._logger.debug("Configuration for series: " + JSON.stringify(seriesConfig));
                            }
                        }
                    }
                    if(configuration.length === 0) {
                        this._logger.debug("Ruler does not expect data from analyzers.");
                        return;
                    }
                    var dwLoadTask = null;
                    this._logger.info("Preloading data warehouse.");
                    if(this._dataWarehouse === null) {
                        this._logger.debug("this._dataWarehouse is null, trying to load it first time on this view.");
                        dwLoadTask = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse().then(function (dw) {
                            this._dataWarehouse = dw;
                            return Plugin.Promise.wrap(this._dataWarehouse);
                        }.bind(this));
                    } else {
                        this._logger.debug("this._dataWarehouse is not null");
                        dwLoadTask = Plugin.Promise.wrap(this._dataWarehouse);
                    }
                    var loadData = function (dw) {
                        var loadSeries = function (config) {
                            _this._logger.debug("Loading data for counter name '" + config.counterId + "' from analyzer '" + config.analyzerId + "'");
                            var contextData = {
                                customDomain: {
                                    CounterId: config.counterId
                                },
                                timeDomain: timeRange
                            };
                            if(config.customDomain) {
                                for(var propertyName in config.customDomain) {
                                    if(config.customDomain.hasOwnProperty(propertyName)) {
                                        var value = config.customDomain[propertyName];
                                        if(value !== null && typeof value !== "string") {
                                            _this._logger.warning("Custom domain property '" + propertyName + "' is not a string, it will be converted to string");
                                            value = value.toString();
                                        }
                                        contextData.customDomain[propertyName] = value;
                                    }
                                }
                            }
                            dw.getFilteredData(contextData, config.analyzerId).then(function (dataPoints) {
                                this._logger.info("Got data points from analyzer: " + config.analyzerId + " for counter " + config.counterId);
                                if(dataPoints && dataPoints.p) {
                                    var renderIndex = dataPoints.p.length - 1;
                                    for(var i = 0; i < dataPoints.p.length; i++) {
                                        this._ruler.addMark(config.markTypeId, new DiagnosticsHub.BigNumber(dataPoints.p[i].t.h, dataPoints.p[i].t.l), dataPoints.p[i].tt || ((Plugin.Resources.getString("TooltipTimeLabel") || "Time") + ": " + DiagnosticsHub.RulerUtilities.formatTime(new DiagnosticsHub.BigNumber(dataPoints.p[i].t.h, dataPoints.p[i].t.l), DiagnosticsHub.UnitFormat.italicizedAbbreviations)), (renderIndex === i));
                                    }
                                }
                            }.bind(_this), function (err) {
                                this._logger.error("Could not load data points for counter :" + config.counterId + ", error: " + JSON.stringify(err));
                            }.bind(_this));
                        }.bind(_this);
                        for(var i = 0; i < configuration.length; i++) {
                            loadSeries(configuration[i]);
                        }
                    }.bind(this);
                    dwLoadTask.then(function (dw) {
                        this._logger.info("Data warehouse is loaded. Starting to load the data.");
                        loadData(dw);
                    }.bind(this), function (err) {
                        this._logger.error("Error on datawarehouse loading:" + JSON.stringify(err));
                        throw err;
                    }.bind(this));
                };
                Renderer.prototype.renderToolbar = function () {
                    var config = {
                        containerId: this._mainToolbarContainerId,
                        selectionHandler: this.clearSelectionHandler.bind(this),
                        zoomInHandler: this.zoomInHandler.bind(this),
                        zoomOutHandler: this.zoomOutHandler.bind(this)
                    };
                    this._toolbar = new DiagnosticsHub.Toolbar(config);
                    this._toolbar.render();
                };
                Renderer.prototype.renderSwimlanes = function () {
                    for(var i = 0; i < this._graphsConfig.data.length; i++) {
                        if(!this._graphsConfig.data[i].JsonObject.View || this._graphsConfig.data[i].JsonObject.View === DiagnosticsHub.ViewType.Graph) {
                            var config = this._graphsConfig.data[i];
                            var swimLaneConfig = this.getSwimlaneConfiguration(config);
                            var swimLane = new DiagnosticsHub.SwimLane(swimLaneConfig);
                            swimLane.addEventListener(VisualStudio.DiagnosticsHub.SwimlaneEvents.Visibility, this.visibilityChanged.bind(this));
                            swimLane.render();
                            this._swimLanes.push({
                                swimLane: swimLane,
                                config: swimLaneConfig,
                                graphSeries: this._graphsConfig.data[i].JsonObject.Series
                            });
                        }
                    }
                };
                Renderer.prototype.visibilityChanged = function (args) {
                    this.resizeHost();
                };
                Renderer.prototype.getSwimlaneConfiguration = function (config) {
                    var swimlaneConfig = new DiagnosticsHub.SwimLaneConfiguration();
                    swimlaneConfig.containerId = this._swimlaneContainerIdPrefix + this._divIndex;
                    this._divIndex++;
                    if(config.JavaScriptClassName) {
                        swimlaneConfig.body.graph.registeredClass = DiagnosticsHub.RegisterNamespace.getRegisteredGraph(config.JavaScriptClassName);
                    } else {
                        swimlaneConfig.body.graph.registeredClass = DiagnosticsHub.RegisterNamespace.getRegisteredGraph("Microsoft.VisualStudio.DiagnosticsHub.MultiLineGraph");
                    }
                    swimlaneConfig.body.graph.jsonConfig = config.JsonObject;
                    swimlaneConfig.body.graph.jsonConfig.GraphBehaviour = DiagnosticsHub.GraphBehaviourType.PostMortem;
                    swimlaneConfig.body.graph.resources = config.Resources;
                    swimlaneConfig.body.graph.description = config.Description;
                    swimlaneConfig.body.graph.height = config.JsonObject.Height || this._config.swimlane.graph.height;
                    swimlaneConfig.body.graph.pathToScriptFolder = config.PathToScriptFolder;
                    config.JsonObject.RefreshDataOnResizeAndZoom = config.JsonObject.RefreshDataOnResizeAndZoom || false;
                    swimlaneConfig.body.leftScale.isVisible = this._config.swimlane.leftScale.isVisible;
                    swimlaneConfig.body.leftScale.width = this._config.swimlane.leftScale.width;
                    swimlaneConfig.body.leftScale.minimum = config.JsonObject.MinValue;
                    swimlaneConfig.body.leftScale.maximum = config.JsonObject.MaxValue;
                    swimlaneConfig.body.rightScale.isVisible = this._config.swimlane.rightScale.isVisible;
                    swimlaneConfig.body.rightScale.width = this._config.swimlane.rightScale.width;
                    swimlaneConfig.body.rightScale.minimum = config.JsonObject.MinValue;
                    swimlaneConfig.body.rightScale.maximum = config.JsonObject.MaxValue;
                    swimlaneConfig.minSelectionWidthInPixels = this._config.swimlane.minSelectionWidthInPixels;
                    swimlaneConfig.timeRange = this._viewportTimeRange;
                    swimlaneConfig.header.title.titleText = config.Title;
                    swimlaneConfig.header.legend.data = [];
                    swimlaneConfig.header.title.isGraphCollapsible = typeof this._config.swimlane.isGraphCollapsible !== "undefined" && this._config.swimlane.isGraphCollapsible !== null ? this._config.swimlane.isGraphCollapsible : swimlaneConfig.header.title.isGraphCollapsible;
                    swimlaneConfig.getVerticalRulerLinePositions = DiagnosticsHub.RulerUtilities.getVerticalLinePositions;
                    if(this._dependencyManager) {
                        swimlaneConfig.body.graph.loadCss = this._dependencyManager.loadCss.bind(this);
                    }
                    swimlaneConfig.isSelectionEnabled = typeof this._config.swimlane.isSelectionEnabled !== "undefined" && this._config.swimlane.isSelectionEnabled !== null ? this._config.swimlane.isSelectionEnabled : swimlaneConfig.isSelectionEnabled;
                    swimlaneConfig.isZoomEnabled = typeof this._config.swimlane.isZoomEnabled !== "undefined" && this._config.swimlane.isZoomEnabled !== null ? this._config.swimlane.isZoomEnabled : swimlaneConfig.isZoomEnabled;
                    return swimlaneConfig;
                };
                Renderer.prototype.selectionChanged = function (evt) {
                    var newSelectionTimeRange = evt.position;
                    if(!this._handlePosition || !this._handlePosition.equals(newSelectionTimeRange)) {
                        this._handlePosition = newSelectionTimeRange;
                        this._toolbar.setButtonState(this.getCommandsStatus());
                    }
                };
                Renderer.prototype.zoomInHandler = function () {
                    this._sqmRuler.zoomIn();
                    this.zoomHandler(this._handlePosition);
                };
                Renderer.prototype.zoomOutHandler = function () {
                    this._sqmRuler.resetZoom();
                    this.zoomHandler(this._viewableTimeRange, this._handlePosition);
                };
                Renderer.prototype.zoomHandler = function (current, selection) {
                    Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_ToolbarZoomBegin);
                    for(var i = 0; i < this._swimLanes.length; i++) {
                        var swimlane = this._swimLanes[i].swimLane;
                        swimlane.zoom(current, selection);
                    }
                    this._ruler.zoom(current, selection);
                    this._viewportTimeRange = current;
                    this._toolbar.setButtonState(this.getCommandsStatus());
                    Plugin.VS.Internal.CodeMarkers.fire(VisualStudio.DiagnosticsHub.ControlsCodeMarkers.perfDiagnosticsHub_ToolbarZoomEnd);
                };
                Renderer.prototype.clearSelectionHandler = function () {
                    this._sqmRuler.clearSelection();
                    for(var i = 0; i < this._swimLanes.length; i++) {
                        var swimlane = this._swimLanes[i].swimLane;
                        swimlane.setSelection(this._viewportTimeRange);
                    }
                    this._ruler.setHandlePosition(this._viewportTimeRange);
                    this._handlePosition = this._viewportTimeRange;
                    this._toolbar.setButtonState(this.getCommandsStatus());
                    this.raiseSelectionChangedEvent(this._viewportTimeRange);
                };
                Renderer.prototype.raiseSelectionChangedEvent = function (position) {
                    if(this._viewEventManager) {
                        var args = {
                            position: position
                        };
                        this._viewEventManager.selectionChanged.raiseEvent(args);
                    }
                };
                Renderer.prototype.getCommandsStatus = function () {
                    return {
                        isZoomInEnabled: this.getZoomInButtonState(),
                        isResetZoomEnabled: this.getResetZoomButtonState(),
                        isClearSelectionEnabled: this.getClearSelectionButtonState()
                    };
                };
                Renderer.prototype.getZoomInButtonState = function () {
                    var isEnabled = false;
                    if(this._handlePosition && !this._handlePosition.equals(this._viewportTimeRange) && !this._minimumZoomWindow.greater(this._handlePosition.elapsed)) {
                        isEnabled = true;
                    }
                    return isEnabled;
                };
                Renderer.prototype.getResetZoomButtonState = function () {
                    var isEnabled = false;
                    if(this._viewableTimeRange && !this._viewableTimeRange.equals(this._viewportTimeRange)) {
                        isEnabled = true;
                    }
                    return isEnabled;
                };
                Renderer.prototype.getClearSelectionButtonState = function () {
                    var isEnabled = false;
                    if(this._viewableTimeRange && this._handlePosition && !this._handlePosition.equals(this._viewportTimeRange)) {
                        isEnabled = true;
                    }
                    return isEnabled;
                };
                return Renderer;
            })();
            DiagnosticsHub.Renderer = Renderer;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var Scrollbar = (function () {
                function Scrollbar(config) {
                    this._parentCss = "scrollbar-container";
                    this._containerCss = "scrollbar";
                    this._containerId = "scrollbar";
                    this._scrollbarCalculatorId = "scrollbarWidthCalculator";
                    this._scrollbarCalculatorCss = "scrollbar-width-calculator";
                    this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                    this._ignoreEvent = false;
                    this._isScrollbarLive = true;
                    this._isScrollbarAutoVisible = true;
                    if(!config) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    this._config = config;
                }
                Scrollbar.prototype.render = function () {
                    if(this._config && this._config.containerId) {
                        var parent = document.getElementById(this._config.containerId);
                        parent.classList.add(this._parentCss);
                        this._container = document.createElement("div");
                        this._container.classList.add(this._containerCss);
                        this._container.id = this._containerId;
                        this._container.addEventListener("scroll", this.onScroll.bind(this));
                        parent.appendChild(this._container);
                        this._scrollbarCalculator = document.createElement("div");
                        this._scrollbarCalculator.classList.add(this._scrollbarCalculatorCss);
                        this._scrollbarCalculator.id = this._scrollbarCalculatorId;
                        this._container.appendChild(this._scrollbarCalculator);
                        this._scrollbarCalculator.style.left = this._container.offsetWidth - 1 + "px";
                        this._container.scrollLeft = this._container.scrollWidth - this._container.offsetWidth;
                    }
                };
                Scrollbar.prototype.updateScrollbar = function (viewport, viewable, force) {
                    if (typeof force === "undefined") { force = false; }
                    this.updateScrollbarInternal(viewport, viewable, force);
                };
                Scrollbar.prototype.updateScrollPosition = function (forceUpdate) {
                    if (typeof forceUpdate === "undefined") { forceUpdate = false; }
                    if(this._isScrollbarLive || forceUpdate) {
                        this._container.scrollLeft = this._container.scrollWidth - this._container.offsetWidth;
                        this._ignoreEvent = true;
                    }
                };
                Scrollbar.prototype.hide = function () {
                    this.hideInternal();
                    this._isScrollbarAutoVisible = false;
                };
                Scrollbar.prototype.autoshow = function () {
                    this._isScrollbarAutoVisible = true;
                };
                Scrollbar.prototype.onScroll = function (evt) {
                    if(this._config.scrollHandler && !this._ignoreEvent) {
                        this._config.scrollHandler(this._container.scrollLeft, this._container.scrollWidth);
                    }
                    this._ignoreEvent = false;
                };
                Scrollbar.prototype.updateScrollbarInternal = function (viewport, viewable, forcePosition) {
                    var viewportElapsedValue = parseInt(viewport.elapsed.value);
                    var viewableElapsedValue = parseInt(viewable.elapsed.value);
                    if(isNaN(viewableElapsedValue) || isNaN(viewportElapsedValue) || viewportElapsedValue === 0) {
                        var message = "Fatal issue in updateScrollbarInternal. ";
                        message += "viewportElapsedValue = " + viewportElapsedValue.toString();
                        message += ", viewableElapsedValue = " + viewableElapsedValue.toString();
                        this._logger.error(message);
                        return;
                    }
                    if(viewableElapsedValue > viewportElapsedValue) {
                        this.showInternal();
                    } else {
                        this.hideInternal();
                    }
                    var pixelsPerPage = this._container.offsetWidth;
                    var totalPages = viewableElapsedValue / viewportElapsedValue;
                    var totalPixels = pixelsPerPage * totalPages;
                    this._scrollbarCalculator.style.left = totalPixels + "px";
                    this.updateScrollPosition(forcePosition);
                };
                Scrollbar.prototype.showInternal = function () {
                    if(this._isScrollbarAutoVisible) {
                        this._container.style.display = "-ms-grid";
                    }
                };
                Scrollbar.prototype.hideInternal = function () {
                    this._container.style.display = "none";
                };
                return Scrollbar;
            })();
            DiagnosticsHub.Scrollbar = Scrollbar;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));
var Microsoft;
(function (Microsoft) {
    (function (VisualStudio) {
        (function (DiagnosticsHub) {
            "use strict";
            var LiveRenderer = (function () {
                function LiveRenderer(config) {
                    this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
                    this._swimLanes = [];
                    this._swimLaneContainers = [];
                    this._baseContainerId = "mainContainer";
                    this._rulerContainerId = "rulerContainer";
                    this._mainSwimlaneContainerId = "mainSwimlaneContainer";
                    this._mainSwimlaneMarginId = "mainSwimlaneMargin";
                    this._mainToolbarContainerId = "toolBarContainer";
                    this._mainScrollbarContainerId = "mainScrollContainer";
                    this._mainSwimlaneContainerCss = "main-swimlane-container";
                    this._mainSwimlaneMarginCss = "main-swimlane-margin";
                    this._swimlaneDivCss = "swimlane-container";
                    this._swimlaneContainerIdPrefix = "swimlaneContainer";
                    this._mainContainerCss = "main-container";
                    this._mainRulerContainerCss = "main-ruler-container";
                    this._mainToolbarContainerCss = "main-toolbar-container";
                    this._mainScrollbarContainerCss = "main-scrollbar";
                    this._baseContainerCss = "base-container";
                    this._toolbarFloatContainerCss = "toolbar-float";
                    this._mainEmptyContainerCss = "main-empty";
                    this._divIndex = 0;
                    this._isGraphRolling = true;
                    this._isInitialized = false;
                    this._diagnosticsSessionLatestTime = DiagnosticsHub.BigNumber.zero;
                    this._maxHeight = 600;
                    this._minHeight = 200;
                    this._isToolbarFloating = false;
                    this._markSeriesConfig = [];
                    this._oneHour = DiagnosticsHub.BigNumber.convertFromNumber(60 * 60 * 1000000000);
                    if(!config) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    if(!config.swimlane) {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1002"));
                    }
                    this._config = config;
                    this._isToolbarFloating = this._config.isToolbarFloating || false;
                    if(!this._config.dataManager) {
                        this._config.dataManager = new DiagnosticsHub.DiagnosticsHubDataManager();
                    }
                    this._resizeHandler = this.onResize.bind(this);
                }
                LiveRenderer.prototype.execute = function () {
                    this._config.dataManager.getConfigurations(this.getConfigurationsCallback.bind(this));
                };
                LiveRenderer.prototype.refresh = function () {
                    for(var i = 0; i < this._swimLanes.length; i++) {
                        this._swimLanes[i].swimLane.resize(null);
                    }
                    this.onResize(null);
                    this._ruler.resize();
                };
                LiveRenderer.prototype.deinitialize = function () {
                    if(this._ruler) {
                        this._ruler.deinitialize();
                    }
                    if(this._resizeHandler) {
                        window.removeEventListener("resize", this._resizeHandler);
                    }
                    for(var i = 0; i < this._swimLanes.length; i++) {
                        this._swimLanes[i].swimLane.deinitialize();
                    }
                };
                LiveRenderer.prototype.getConfigurationsCallback = function (data) {
                    var graphConfigurations = data.GraphConfigurations;
                    for(var i = 0; i < data.GraphConfigurations.length; i++) {
                        var config = data.GraphConfigurations[i];
                        config.JsonObject = JSON.parse(config.JsonConfiguration);
                    }
                    if(data.QpcTimeProperties) {
                        this._timeProperties = new DiagnosticsHub.Common.QpcTimeProperties(new DiagnosticsHub.BigNumber(data.QpcTimeProperties.CollectionStartTimeH, data.QpcTimeProperties.CollectionStartTimeL), data.QpcTimeProperties.Frequency);
                    } else {
                        this._timeProperties = new DiagnosticsHub.Common.QpcTimeProperties(DiagnosticsHub.BigNumber.zero, 1000);
                    }
                    this._graphsConfig = {
                        data: graphConfigurations
                    };
                    this.render();
                };
                LiveRenderer.prototype.onResize = function (e) {
                    this.createTime(this._viewportTimeRange.begin);
                    if(this._dataTimeRange) {
                        this.adjustTimeRange(this._dataTimeRange.end);
                    }
                    var isLatestPointWithinTimeRange = this._viewportTimeRange.contains(this._diagnosticsSessionLatestTime);
                    if(isLatestPointWithinTimeRange !== this._isGraphRolling) {
                        this._isGraphRolling = this._scrollbar._isScrollbarLive = isLatestPointWithinTimeRange;
                        this.setGraphState(this._isGraphRolling);
                    }
                    this.updateTimeRange();
                    this.setScrollPosition();
                    if(this._mainEmptyContainer) {
                        if(this._isToolbarFloating && this._toolbarFloat) {
                            this._mainEmptyContainer.style.height = this._toolbarFloat.clientHeight + "px";
                        } else {
                            this._mainEmptyContainer.style.height = "0px";
                        }
                    }
                    if(this._toolbarFloat) {
                        if(this._container && this._isToolbarFloating) {
                            this._toolbarFloat.style.width = this._container.clientWidth + "px";
                        } else {
                            this._toolbarFloat.style.width = "100%";
                        }
                    }
                    this.resizeHost();
                };
                LiveRenderer.prototype.render = function () {
                    this._baseContainerId = this._config.containerId || this._baseContainerId;
                    this._container = document.getElementById(this._baseContainerId);
                    this._container.classList.add(this._baseContainerCss);
                    this._toolbarFloat = document.createElement("div");
                    this._toolbarFloat.classList.add(this._toolbarFloatContainerCss);
                    if(this._isToolbarFloating) {
                        this._toolbarFloat.style.position = "fixed";
                    }
                    this._container.appendChild(this._toolbarFloat);
                    this._mainContainer = document.createElement("div");
                    this._mainContainer.classList.add(this._mainContainerCss);
                    this._container.appendChild(this._mainContainer);
                    this._toolbarContainer = document.createElement("div");
                    this._toolbarContainer.id = this._mainToolbarContainerId;
                    this._toolbarContainer.classList.add(this._mainToolbarContainerCss);
                    this._toolbarFloat.appendChild(this._toolbarContainer);
                    this._rulerContainer = document.createElement("div");
                    this._rulerContainer.id = this._rulerContainerId;
                    this._rulerContainer.classList.add(this._mainRulerContainerCss);
                    this._toolbarFloat.appendChild(this._rulerContainer);
                    this._mainEmptyContainer = document.createElement("div");
                    this._mainEmptyContainer.classList.add(this._mainEmptyContainerCss);
                    this._mainContainer.appendChild(this._mainEmptyContainer);
                    this._swimlaneContainer = document.createElement("div");
                    this._swimlaneContainer.id = this._mainSwimlaneContainerId;
                    this._mainContainer.appendChild(this._swimlaneContainer);
                    this._mainSwimlaneMargin = document.createElement("div");
                    this._mainSwimlaneMargin.id = this._mainSwimlaneMarginId;
                    this._mainSwimlaneMargin.classList.add(this._mainSwimlaneMarginCss);
                    this._mainContainer.appendChild(this._mainSwimlaneMargin);
                    this._mainScrollbarContainer = document.createElement("div");
                    this._mainScrollbarContainer.id = this._mainScrollbarContainerId;
                    this._mainScrollbarContainer.classList.add(this._mainScrollbarContainerCss);
                    this._mainContainer.appendChild(this._mainScrollbarContainer);
                    this.renderToolArea();
                    this._config.dataManager.dataUpdate(this.dataUpdateListener.bind(this));
                };
                LiveRenderer.prototype.dataUpdateListener = function (eventArgs) {
                    if(!this._isInitialized) {
                        this.renderToolArea();
                    }
                    if(this._isInitialized) {
                        if(eventArgs.TimestampL || eventArgs.TimestampH) {
                            eventArgs = eventArgs;
                            var nsTimeStamp = this._timeProperties.convertQpcTimestampToNanoseconds(new DiagnosticsHub.BigNumber(eventArgs.TimestampH, eventArgs.TimestampL));
                            if(this.adjustTimeRange(nsTimeStamp)) {
                                if(this._isGraphRolling) {
                                    this.updateTimeRange();
                                }
                                this.setScrollPosition();
                                this.resizeHost();
                            }
                        }
                        this.addSeriesData(eventArgs);
                        this.addMarkData(eventArgs);
                    }
                };
                LiveRenderer.prototype.renderToolArea = function () {
                    if(this._container.clientWidth > this._config.swimlane.leftScale.width + this._config.swimlane.rightScale.width + 2) {
                        this.createTime(DiagnosticsHub.BigNumber.zero);
                        window.addEventListener("resize", this._resizeHandler);
                        if(this._toolbarFloat) {
                            if(this._container && this._isToolbarFloating) {
                                this._toolbarFloat.style.width = this._container.clientWidth + "px";
                            } else {
                                this._toolbarFloat.style.width = "100%";
                            }
                        }
                        this.renderRuler();
                        this.createSwimlaneContainers();
                        this.renderSwimlanes();
                        this.renderScrollbar();
                        this._isInitialized = true;
                        if(this._config.isResizeHandlerRequired) {
                            this._eventAggregator = VisualStudio.DiagnosticsHub.getEventAggregator();
                            this.resizeHost();
                        }
                    }
                };
                LiveRenderer.prototype.createTime = function (start) {
                    if(this._container.clientWidth > this._config.swimlane.leftScale.width + this._config.swimlane.rightScale.width + 2) {
                        var width = this._container.clientWidth - this._config.swimlane.leftScale.width - this._config.swimlane.rightScale.width - 2;
                        this._viewportTimeRange = new DiagnosticsHub.JsonTimespan(start, DiagnosticsHub.BigNumber.addNumber(start, (width * 200000000)));
                        if(this._isGraphRolling) {
                            if(this._viewableTimeRange) {
                                this._viewableTimeRange = new DiagnosticsHub.JsonTimespan(this._viewableTimeRange.begin, this._viewportTimeRange.end);
                            } else {
                                this._viewableTimeRange = this._viewportTimeRange;
                            }
                        }
                    }
                };
                LiveRenderer.prototype.createSwimlaneContainers = function () {
                    if(this._mainEmptyContainer) {
                        if(this._isToolbarFloating && this._toolbarFloat) {
                            this._mainEmptyContainer.style.height = this._toolbarFloat.clientHeight + "px";
                        } else {
                            this._mainEmptyContainer.style.height = "0px";
                        }
                    }
                    this._mainSwimlaneContainer = document.getElementById(this._mainSwimlaneContainerId);
                    var msGridRowsArr = [];
                    if(this._mainSwimlaneContainer) {
                        this._mainSwimlaneContainer.classList.add(this._mainSwimlaneContainerCss);
                        var swimLaneCount = 0;
                        for(var i = 0; i < this._graphsConfig.data.length; i++) {
                            if(!this._graphsConfig.data[i].JsonObject.View || this._graphsConfig.data[i].JsonObject.View === DiagnosticsHub.ViewType.Graph) {
                                var swimlaneDiv = document.createElement("div");
                                swimlaneDiv.id = this._swimlaneContainerIdPrefix + swimLaneCount;
                                swimlaneDiv.classList.add(this._swimlaneDivCss);
                                swimlaneDiv.style.msGridRow = (swimLaneCount + 1).toString();
                                this._swimLaneContainers.push(swimlaneDiv);
                                msGridRowsArr.push("auto");
                                swimLaneCount++;
                            }
                        }
                        this._mainSwimlaneContainer.style.msGridRows = msGridRowsArr.join(" ");
                        for(var j = 0; j < this._swimLaneContainers.length; j++) {
                            this._mainSwimlaneContainer.appendChild(this._swimLaneContainers[j]);
                        }
                        this._divIndex = 0;
                    } else {
                        throw new Error(Plugin.Resources.getErrorString("JSProfiler.1001"));
                    }
                };
                LiveRenderer.prototype.renderRuler = function () {
                    var config = new DiagnosticsHub.RulerConfig(this._rulerContainerId);
                    config.doubleSlider.isSelectionEnabled = typeof this._config.swimlane.isSelectionEnabled !== "undefined" && this._config.swimlane.isSelectionEnabled !== null ? this._config.swimlane.isSelectionEnabled : config.doubleSlider.isSelectionEnabled;
                    config.doubleSlider.isZoomEnabled = typeof this._config.swimlane.isZoomEnabled !== "undefined" && this._config.swimlane.isZoomEnabled !== null ? this._config.swimlane.isZoomEnabled : config.doubleSlider.isZoomEnabled;
                    config.doubleSlider.timeRange = this._viewportTimeRange;
                    config.doubleSlider.markSeries = [
                        {
                            id: DiagnosticsHub.MarkType.UserMark,
                            label: Plugin.Resources.getString("RulerUserMarkLabel"),
                            tooltip: Plugin.Resources.getString("UserMarkTooltip")
                        }
                    ];
                    var markTypeIdCounter = 3;
                    var dictionary = {
                    };
                    var legendDictionary = {
                    };
                    for(var i = 0; i < this._graphsConfig.data.length; i++) {
                        if(this._graphsConfig.data[i].JsonObject.View && this._graphsConfig.data[i].JsonObject.View === DiagnosticsHub.ViewType.Ruler) {
                            for(var j = 0; j < this._graphsConfig.data[i].JsonObject.Series.length; j++) {
                                var series = this._graphsConfig.data[i].JsonObject.Series[j];
                                if(!dictionary[series.DataSource.CounterId + "," + series.DataSource.AnalyzerId]) {
                                    dictionary[series.DataSource.CounterId + "," + series.DataSource.AnalyzerId] = true;
                                    this._logger.debug(series.DataSource.CounterId + "," + series.DataSource.AnalyzerId);
                                    var id = 0;
                                    if(!series.MarkType || series.MarkType === DiagnosticsHub.MarkType.Custom) {
                                        id = markTypeIdCounter;
                                    } else {
                                        id = series.MarkType;
                                    }
                                    if(id !== DiagnosticsHub.MarkType.UserMark) {
                                        if(id === DiagnosticsHub.MarkType.LifeCycleEvent) {
                                            var appLegend = Plugin.Resources.getString("RulerLifecycleMarkLabel");
                                            if(!legendDictionary[appLegend]) {
                                                legendDictionary[appLegend] = id;
                                                config.doubleSlider.markSeries.push({
                                                    id: id,
                                                    label: appLegend,
                                                    tooltip: Plugin.Resources.getString("LifecycleMarkTooltip")
                                                });
                                            } else {
                                                id = legendDictionary[legend];
                                            }
                                        } else {
                                            var legend = series.Legend;
                                            if(this._graphsConfig.data[i].Resources && this._graphsConfig.data[i].Resources[legend]) {
                                                legend = this._graphsConfig.data[i].Resources[legend];
                                            }
                                            if(!legendDictionary[legend]) {
                                                legendDictionary[legend] = id;
                                                config.doubleSlider.markSeries.push({
                                                    id: id,
                                                    label: legend,
                                                    tooltip: ""
                                                });
                                                markTypeIdCounter++;
                                            } else {
                                                id = legendDictionary[legend];
                                            }
                                        }
                                    }
                                    series.MarkTypeId = id;
                                    this._markSeriesConfig.push(series);
                                }
                            }
                        }
                    }
                    this._ruler = new DiagnosticsHub.Ruler(config);
                    this._ruler.render();
                };
                LiveRenderer.prototype.renderSwimlanes = function () {
                    for(var i = 0; i < this._graphsConfig.data.length; i++) {
                        if(!this._graphsConfig.data[i].JsonObject.View || this._graphsConfig.data[i].JsonObject.View === DiagnosticsHub.ViewType.Graph) {
                            var config = this._graphsConfig.data[i];
                            var swimLaneConfig = this.getSwimlaneConfiguration(config);
                            var swimLane = new DiagnosticsHub.SwimLane(swimLaneConfig);
                            swimLane.addEventListener(VisualStudio.DiagnosticsHub.SwimlaneEvents.Visibility, this.visibilityChanged.bind(this));
                            swimLane.render();
                            this._swimLanes.push({
                                swimLane: swimLane,
                                config: swimLaneConfig,
                                graphSeries: this._graphsConfig.data[i].JsonObject.Series
                            });
                        }
                    }
                };
                LiveRenderer.prototype.resizeHost = function () {
                    if(this._eventAggregator) {
                        var height = Math.ceil(this._toolbarContainer.offsetHeight + this._rulerContainer.offsetHeight + this._swimlaneContainer.offsetHeight + this._mainSwimlaneMargin.offsetHeight + this._mainScrollbarContainer.offsetHeight);
                        var maxValue = height;
                        var minValue = Math.min(height, this._minHeight);
                        var value = Math.min(this._maxHeight, height);
                        this._eventAggregator.raiseEvent("Microsoft.DiagnosticsHub.SwimlaneResizeHeight", {
                            MinValue: minValue,
                            MaxValue: maxValue,
                            Value: value
                        });
                    }
                };
                LiveRenderer.prototype.renderScrollbar = function () {
                    var config = {
                        containerId: this._mainScrollbarContainerId,
                        scrollHandler: this.onScroll.bind(this)
                    };
                    this._scrollbar = new DiagnosticsHub.Scrollbar(config);
                    this._scrollbar.render();
                };
                LiveRenderer.prototype.convertDtoToIPoint = function (dto) {
                    var convertedPoint = {
                        Timestamp: new DiagnosticsHub.BigNumber(dto.TimestampH, dto.TimestampL),
                        Value: dto.Value,
                        ToolTip: dto.ToolTip,
                        CustomData: dto.CustomData
                    };
                    return convertedPoint;
                };
                LiveRenderer.prototype.addSeriesData = function (eventArgs) {
                    if(this._swimLanes && eventArgs.UpdatedSeries) {
                        for(var i = 0; i < this._swimLanes.length; i++) {
                            var swimlaneInfo = this._swimLanes[i];
                            for(var j = 0; j < swimlaneInfo.graphSeries.length; j++) {
                                var series = swimlaneInfo.graphSeries[j];
                                for(var k = 0; k < eventArgs.UpdatedSeries.length; k++) {
                                    var newSeries = eventArgs.UpdatedSeries[k];
                                    if(series.DataSource.CounterId === newSeries.DataSource.CounterId && newSeries.NewPoints) {
                                        for(var l = 0; l < newSeries.NewPoints.length; l++) {
                                            var convertedPoint = this.convertDtoToIPoint(newSeries.NewPoints[l]);
                                            swimlaneInfo.swimLane.addGraphSeriesData(newSeries.DataSource.CounterId, [
                                                convertedPoint
                                            ], false);
                                            var newRange = this._timeProperties.convertQpcTimestampToNanoseconds(convertedPoint.Timestamp);
                                            if(this._ruler && newRange.greater(this._diagnosticsSessionLatestTime)) {
                                                this._diagnosticsSessionLatestTime = newRange;
                                                this._ruler.setDiagnosticsSessionTimeRange(newRange);
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                };
                LiveRenderer.prototype.addMarkData = function (eventArgs) {
                    if(this._markSeriesConfig && eventArgs.UpdatedSeries) {
                        for(var i = 0; i < this._markSeriesConfig.length; i++) {
                            var series = this._markSeriesConfig[i];
                            for(var k = 0; k < eventArgs.UpdatedSeries.length; k++) {
                                var newSeries = eventArgs.UpdatedSeries[k];
                                if(series.DataSource.CounterId === newSeries.DataSource.CounterId && newSeries.NewPoints) {
                                    for(var l = 0; l < newSeries.NewPoints.length; l++) {
                                        var convertedPoint = this.convertDtoToIPoint(newSeries.NewPoints[l]);
                                        var newTimeStamp = this._timeProperties.convertQpcTimestampToNanoseconds(convertedPoint.Timestamp);
                                        this._ruler.addMark(series.MarkTypeId, newTimeStamp, newSeries.NewPoints[l].ToolTip || ((Plugin.Resources.getString("TooltipTimeLabel") || "Time") + ": " + DiagnosticsHub.RulerUtilities.formatTime(newTimeStamp, DiagnosticsHub.UnitFormat.italicizedAbbreviations)));
                                        if(this._ruler && newTimeStamp.greater(this._diagnosticsSessionLatestTime)) {
                                            this._diagnosticsSessionLatestTime = newTimeStamp;
                                            this._ruler.setDiagnosticsSessionTimeRange(newTimeStamp);
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                    }
                };
                LiveRenderer.prototype.adjustTimeRange = function (time) {
                    var isAdjusted = false;
                    if(time) {
                        while(time.greater(this._viewableTimeRange.end) || (time.greater(this._viewportTimeRange.end) && this._viewableTimeRange.end.greaterOrEqual(this._viewportTimeRange.end) && this._isGraphRolling)) {
                            if(this._isGraphRolling) {
                                var elapsed = DiagnosticsHub.BigNumber.divideNumber(this._viewportTimeRange.elapsed, 3);
                                this._viewableTimeRange = new DiagnosticsHub.JsonTimespan(this._viewableTimeRange.begin, DiagnosticsHub.BigNumber.add(this._viewportTimeRange.end, elapsed));
                                this._viewportTimeRange = new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.add(this._viewportTimeRange.begin, elapsed), DiagnosticsHub.BigNumber.add(this._viewportTimeRange.end, elapsed));
                            } else {
                                this._viewableTimeRange = new DiagnosticsHub.JsonTimespan(this._viewableTimeRange.begin, time);
                            }
                            isAdjusted = true;
                        }
                        if(!isAdjusted) {
                            this._dataTimeRange = new DiagnosticsHub.JsonTimespan(this._viewportTimeRange.begin, time);
                        }
                    }
                    return isAdjusted;
                };
                LiveRenderer.prototype.updateTimeRange = function () {
                    var pointRequiredToBeDropped = false;
                    if(this._diagnosticsSessionLatestTime && (DiagnosticsHub.BigNumber.subtract(this._diagnosticsSessionLatestTime, this._oneHour).greater(this._viewableTimeRange.begin))) {
                        this._viewableTimeRange = new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.subtract(this._diagnosticsSessionLatestTime, this._oneHour), this._viewableTimeRange.end);
                        if(this._viewableTimeRange.begin.greater(this._viewportTimeRange.begin)) {
                            this._viewportTimeRange = new DiagnosticsHub.JsonTimespan(this._viewableTimeRange.begin, this._viewportTimeRange.end);
                        }
                        pointRequiredToBeDropped = true;
                    }
                    for(var i = 0; i < this._swimLanes.length; i++) {
                        var swimlaneInfo = this._swimLanes[i];
                        for(var j = 0; j < swimlaneInfo.graphSeries.length; j++) {
                            var series = swimlaneInfo.graphSeries[j];
                            if(pointRequiredToBeDropped) {
                                swimlaneInfo.swimLane.removeInvalidPoints(this._viewableTimeRange.begin);
                            }
                            swimlaneInfo.swimLane.updateTimeRange(this._viewportTimeRange);
                        }
                    }
                    this._ruler.updateTimeRange(this._viewportTimeRange, this._viewableTimeRange);
                };
                LiveRenderer.prototype.setScrollPosition = function () {
                    if(this._scrollbar) {
                        this._scrollbar.updateScrollbar(this._viewportTimeRange, this._viewableTimeRange);
                    }
                };
                LiveRenderer.prototype.getSwimlaneConfiguration = function (config) {
                    var swimlaneConfig = new DiagnosticsHub.SwimLaneConfiguration();
                    swimlaneConfig.containerId = this._swimlaneContainerIdPrefix + this._divIndex;
                    this._divIndex++;
                    swimlaneConfig.body.graph.jsonConfig = config.JsonObject;
                    swimlaneConfig.body.graph.jsonConfig.GraphBehaviour = DiagnosticsHub.GraphBehaviourType.Live;
                    swimlaneConfig.body.graph.jsonConfig.TimeProperties = this._timeProperties;
                    swimlaneConfig.body.graph.registeredClass = DiagnosticsHub.RegisterNamespace.getRegisteredGraph("Microsoft.VisualStudio.DiagnosticsHub.MultiLineGraph");
                    swimlaneConfig.body.graph.resources = config.Resources;
                    swimlaneConfig.body.graph.description = config.Description;
                    swimlaneConfig.body.graph.height = config.JsonObject.Height || this._config.swimlane.graph.height;
                    swimlaneConfig.body.leftScale.isVisible = this._config.swimlane.leftScale.isVisible;
                    swimlaneConfig.body.leftScale.width = this._config.swimlane.leftScale.width;
                    swimlaneConfig.body.leftScale.minimum = config.JsonObject.MinValue;
                    swimlaneConfig.body.leftScale.maximum = config.JsonObject.MaxValue;
                    swimlaneConfig.body.rightScale.isVisible = this._config.swimlane.rightScale.isVisible;
                    swimlaneConfig.body.rightScale.width = this._config.swimlane.rightScale.width;
                    swimlaneConfig.body.rightScale.minimum = config.JsonObject.MinValue;
                    swimlaneConfig.body.rightScale.maximum = config.JsonObject.MaxValue;
                    swimlaneConfig.minSelectionWidthInPixels = this._config.swimlane.minSelectionWidthInPixels;
                    swimlaneConfig.timeRange = this._viewportTimeRange;
                    swimlaneConfig.header.title.titleText = config.Title;
                    swimlaneConfig.header.legend.data = [];
                    swimlaneConfig.header.title.isGraphCollapsible = typeof this._config.swimlane.isGraphCollapsible !== "undefined" && this._config.swimlane.isGraphCollapsible !== null ? this._config.swimlane.isGraphCollapsible : swimlaneConfig.header.title.isGraphCollapsible;
                    swimlaneConfig.getVerticalRulerLinePositions = DiagnosticsHub.RulerUtilities.getVerticalLinePositions;
                    if(this._dependencyManager) {
                        swimlaneConfig.body.graph.loadCss = this._dependencyManager.loadCss.bind(this);
                    }
                    swimlaneConfig.isSelectionEnabled = typeof this._config.swimlane.isSelectionEnabled !== "undefined" && this._config.swimlane.isSelectionEnabled !== null ? this._config.swimlane.isSelectionEnabled : swimlaneConfig.isSelectionEnabled;
                    swimlaneConfig.isZoomEnabled = typeof this._config.swimlane.isZoomEnabled !== "undefined" && this._config.swimlane.isZoomEnabled !== null ? this._config.swimlane.isZoomEnabled : swimlaneConfig.isZoomEnabled;
                    return swimlaneConfig;
                };
                LiveRenderer.prototype.onScroll = function (left, totalLength) {
                    var time = (parseInt(this._viewableTimeRange.elapsed.value) * left) / totalLength;
                    var originalRangePlusTime = DiagnosticsHub.BigNumber.addNumber(this._viewableTimeRange.begin, time);
                    this._viewportTimeRange = new DiagnosticsHub.JsonTimespan(originalRangePlusTime, DiagnosticsHub.BigNumber.add(originalRangePlusTime, this._viewportTimeRange.elapsed));
                    var isLatestPointWithinTimeRange = this._viewportTimeRange.contains(this._diagnosticsSessionLatestTime);
                    if(isLatestPointWithinTimeRange !== this._isGraphRolling) {
                        this._isGraphRolling = this._scrollbar._isScrollbarLive = isLatestPointWithinTimeRange;
                        this.setGraphState(this._isGraphRolling);
                    }
                    this.updateTimeRange();
                };
                LiveRenderer.prototype.setGraphState = function (isGraphRolling) {
                    for(var i = 0; i < this._swimLanes.length; i++) {
                        var swimlaneInfo = this._swimLanes[i];
                        for(var j = 0; j < swimlaneInfo.graphSeries.length; j++) {
                            var series = swimlaneInfo.graphSeries[j];
                            swimlaneInfo.swimLane.setGraphState(isGraphRolling ? DiagnosticsHub.GraphState.Roll : DiagnosticsHub.GraphState.Stop);
                        }
                    }
                    this._ruler.setState(isGraphRolling ? DiagnosticsHub.GraphState.Roll : DiagnosticsHub.GraphState.Stop);
                };
                LiveRenderer.prototype.visibilityChanged = function (args) {
                    if(args.data && typeof args.data.visible !== "undefined" && args.data.visible !== null) {
                        if(args.data.visible) {
                            this._scrollbar.autoshow();
                            this._scrollbar.updateScrollbar(this._viewportTimeRange, this._viewableTimeRange, true);
                        } else {
                            var hideScrollbar = true;
                            for(var i = 0; i < this._swimLanes.length; i++) {
                                if(this._swimLanes[i].swimLane.isVisible) {
                                    hideScrollbar = false;
                                    break;
                                }
                            }
                            if(hideScrollbar) {
                                this._scrollbar.hide();
                            }
                        }
                    }
                    this.resizeHost();
                };
                return LiveRenderer;
            })();
            DiagnosticsHub.LiveRenderer = LiveRenderer;            
        })(VisualStudio.DiagnosticsHub || (VisualStudio.DiagnosticsHub = {}));
        var DiagnosticsHub = VisualStudio.DiagnosticsHub;
    })(Microsoft.VisualStudio || (Microsoft.VisualStudio = {}));
    var VisualStudio = Microsoft.VisualStudio;
})(Microsoft || (Microsoft = {}));

// SIG // Begin signature block
// SIG // MIIanQYJKoZIhvcNAQcCoIIajjCCGooCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFAAMLRZtM4Ei
// SIG // XilbnENVtAeVWNZIoIIVejCCBLswggOjoAMCAQICEzMA
// SIG // AABa7S/05CCZPzoAAAAAAFowDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE0MDUyMzE3
// SIG // MTMxNVoXDTE1MDgyMzE3MTMxNVowgasxCzAJBgNVBAYT
// SIG // AlVTMQswCQYDVQQIEwJXQTEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MQ0wCwYDVQQLEwRNT1BSMScwJQYDVQQLEx5uQ2lwaGVy
// SIG // IERTRSBFU046QjhFQy0zMEE0LTcxNDQxJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2UwggEi
// SIG // MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCzISLf
// SIG // atC/+ynJ1Wx6iamNE7yUtel9KWXaf/Qfqwx5YWZUYZYH
// SIG // 8NRgSzGbCa99KG3QpXuHX3ah0sYpx5Y6o18XjHbgt5YH
// SIG // D8diYbS2qvZGFCkDLiawHUoI4H3TXDASppv2uQ49UxZp
// SIG // nbtlJ0LB6DI1Dvcp/95bIEy7L2iEJA+rkcTzzipeWEbt
// SIG // qUW0abZUJpESYv1vDuTP+dw/2ilpH0qu7sCCQuuCc+lR
// SIG // UxG/3asdb7IKUHgLg+8bCLMbZ2/TBX2hCZ/Cd4igo1jB
// SIG // T/9n897sx/Uz3IpFDpZGFCiHHGC39apaQExwtWnARsjU
// SIG // 6OLFkN4LZTXUVIDS6Z0gVq/U3825AgMBAAGjggEJMIIB
// SIG // BTAdBgNVHQ4EFgQUvmfgLgIbrwpyDTodf4ydayJmEfcw
// SIG // HwYDVR0jBBgwFoAUIzT42VJGcArtQPt2+7MrsMM1sw8w
// SIG // VAYDVR0fBE0wSzBJoEegRYZDaHR0cDovL2NybC5taWNy
// SIG // b3NvZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljcm9z
// SIG // b2Z0VGltZVN0YW1wUENBLmNybDBYBggrBgEFBQcBAQRM
// SIG // MEowSAYIKwYBBQUHMAKGPGh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljcm9zb2Z0VGltZVN0
// SIG // YW1wUENBLmNydDATBgNVHSUEDDAKBggrBgEFBQcDCDAN
// SIG // BgkqhkiG9w0BAQUFAAOCAQEAIFOCkK6mTU5+M0nIs63E
// SIG // w34V0BLyDyeKf1u/PlTqQelUAysput1UiLu599nOU+0Q
// SIG // Fj3JRnC0ANHyNF2noyIsqiLha6G/Dw2H0B4CG+94tokg
// SIG // 0CyrC3Q4LqYQ/9qRqyxAPCYVqqzews9KkwPNa+Kkspka
// SIG // XUdE8dyCH+ZItKZpmcEu6Ycj6gjSaeZi33Hx6yO/IWX5
// SIG // pFfEky3bFngVqj6i5IX8F77ATxXbqvCouhErrPorNRZu
// SIG // W3P+MND7q5Og3s1C2jY/kffgN4zZB607J7v/VCB3xv0R
// SIG // 6RrmabIzJ6sFrliPpql/XRIRaAwsozEWDb4hq5zwrhp8
// SIG // QNXWgxYV2Cj75TCCBOwwggPUoAMCAQICEzMAAADKbNUy
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
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUdIBLx0SrR23Q9eqngfKJ
// SIG // DXi4uHwwSAYKKwYBBAGCNwIBDDE6MDigHoAcAGgAdQBi
// SIG // AEMAbwBuAHQAcgBvAGwAcwAuAGoAc6EWgBRodHRwOi8v
// SIG // bWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEFAASCAQAK
// SIG // SoE8yeq6Iy7EKrErVmlhFUnJGAsegtJGnpKaSeJlPv5T
// SIG // fTLGmMl0JculCHFaMh1VTcDjqyue7CJ2opLXNNExQrHn
// SIG // DWav6+QK3EXpcMpeGFLpmxjm/5m6VWB2x34vuMQpLT4v
// SIG // oel0n8x77Iv2y2r6TpU4nGHlz3YxOKYlJJTgZ7qTYMFV
// SIG // flCIDtEmKYcucZS05B20JdEIR2IPnLyxFX9XnxdHu7Tt
// SIG // voAnIuaAiEqsArB7jgSvQNkxiE5zztZZUkiYnegx5a4R
// SIG // mXZuSxoqcxl90swAySg6Xiw5tjI2UstUl5sTOYCyw6y2
// SIG // TsZ4r1mGcE6KZ9YqNtC8i3suRKR9oH58oYICKDCCAiQG
// SIG // CSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQQITMwAAAFrtL/TkIJk/OgAAAAAA
// SIG // WjAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqG
// SIG // SIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTQxMTAxMDcy
// SIG // NTQ2WjAjBgkqhkiG9w0BCQQxFgQUd9XWhLrpZpJHiseM
// SIG // IOB3Mmf6Ai8wDQYJKoZIhvcNAQEFBQAEggEAkUMHi3j0
// SIG // OjQiUcyMAW8B0xKO1Tdo6amM9miEDkFVERec0ctCrAW8
// SIG // 7xJ475yDGurYDtOoR7+XP7PG4TVzf1xUhzLAG+WHMLI1
// SIG // vFlSHfGuf+CykuW5zJQS3sI1zXVugFbqecCNvvRa1m4G
// SIG // SHJZtuB8mlLc2BMGTNGzsvL/88cs4g4F2rh1crD+ZB76
// SIG // 9tXLU7tDNPlCHoGSA+370H2JCu3p7CVpXdnksii5CBo3
// SIG // PqAwLLfl+IhS8ZEM7umWNXkP8r8cfVt5I5CTddOSwf+m
// SIG // tO+YaoWv9j0DwlJQ1W25cvQdH5Z7YPy+S4SurDVMYE8U
// SIG // 6YdJAp1Vk4F2/XQJ15Z1fFkMGA==
// SIG // End signature block
