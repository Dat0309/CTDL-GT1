var XAMLProfiler;
(function (XAMLProfiler) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.BaseStyleSheet = "XAMLProfiler.css";
        Constants.MinGranularitySupportedInNs = 1;
        return Constants;
    })();
    XAMLProfiler.Constants = Constants;
})(XAMLProfiler || (XAMLProfiler = {}));
var DataWarehouse = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse;
var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

var XAMLProfilerDataModel;
(function (XAMLProfilerDataModel) {
    (function (XAMLAnalyzerTasks) {
        XAMLAnalyzerTasks[XAMLAnalyzerTasks["GetUIThreadActivityData"] = 1] = "GetUIThreadActivityData";
        XAMLAnalyzerTasks[XAMLAnalyzerTasks["GetFrameRateData"] = 2] = "GetFrameRateData";
        XAMLAnalyzerTasks[XAMLAnalyzerTasks["GetXAMLParsingDataProvider"] = 3] = "GetXAMLParsingDataProvider";
        XAMLAnalyzerTasks[XAMLAnalyzerTasks["GetHotElementsDataProvider"] = 4] = "GetHotElementsDataProvider";
        XAMLAnalyzerTasks[XAMLAnalyzerTasks["GetSessionDuration"] = 5] = "GetSessionDuration";
    })(XAMLProfilerDataModel.XAMLAnalyzerTasks || (XAMLProfilerDataModel.XAMLAnalyzerTasks = {}));
    var XAMLAnalyzerTasks = XAMLProfilerDataModel.XAMLAnalyzerTasks;

    var XAMLThreadCategory = (function () {
        function XAMLThreadCategory() {
        }
        XAMLThreadCategory.DWMFrames = "DWMFrameRate";
        XAMLThreadCategory.UIFrames = "UIFrameRate";
        return XAMLThreadCategory;
    })();
    XAMLProfilerDataModel.XAMLThreadCategory = XAMLThreadCategory;

    var XAMLProfilerDataSource = (function () {
        function XAMLProfilerDataSource() {
            this._logger = Microsoft.VisualStudio.DiagnosticsHub.getLogger();
        }
        XAMLProfilerDataSource.prototype.Init = function () {
            var _this = this;
            return DataWarehouse.loadDataWarehouse().then(function (dw) {
                _this._datawareHouse = dw;

                var customData = {
                    task: 5 /* GetSessionDuration */.toString()
                };

                var contextData = {
                    customDomain: customData
                };

                return _this._datawareHouse.getFilteredData(contextData, XAMLProfilerDataSource.XAMLAnalyzerClsId);
            }).then(function (jsonTimeRange) {
                return new Common.TimeSpan(Common.TimestampConvertor.jsonToTimeStamp(jsonTimeRange.begin), Common.TimestampConvertor.jsonToTimeStamp(jsonTimeRange.end));
            }, function (error) {
                _this.logError("Initialization failed" + error.toString());
                throw error;
            });
        };

        XAMLProfilerDataSource.prototype.GetUIThreadActivityData = function (timeRange, granularity) {
            var _this = this;
            if (this._datawareHouse) {
                var jsonTimeRange = new DiagnosticsHub.JsonTimespan(Common.TimestampConvertor.timestampToJson(timeRange.begin), Common.TimestampConvertor.timestampToJson(timeRange.end));

                var customData = {
                    task: 1 /* GetUIThreadActivityData */.toString(),
                    granularity: granularity.toString()
                };

                var contextData = {
                    customDomain: customData,
                    timeDomain: jsonTimeRange
                };

                return this._datawareHouse.getFilteredData(contextData, XAMLProfilerDataSource.XAMLAnalyzerClsId).then(function (activities) {
                    return activities;
                }, function (error) {
                    _this.logError("GetUIThreadActivityData failed: " + error.toString());
                    throw error;
                });
            }

            this.logError("invalid state");
            return Common.PromiseHelper.getPromiseError(null);
        };

        XAMLProfilerDataSource.prototype.GetFrameRateData = function (timeRange, granularity) {
            var _this = this;
            if (this._datawareHouse) {
                var jsonTimeRange = new DiagnosticsHub.JsonTimespan(Common.TimestampConvertor.timestampToJson(timeRange.begin), Common.TimestampConvertor.timestampToJson(timeRange.end));

                var customData = {
                    task: 2 /* GetFrameRateData */.toString(),
                    CounterId: XAMLThreadCategory.DWMFrames,
                    Width: ((timeRange.end.nsec - timeRange.begin.nsec) / granularity).toString()
                };

                var contextData = {
                    customDomain: customData,
                    timeDomain: jsonTimeRange
                };

                var frameRate = {
                    DWMFrameRate: [],
                    UIFrameRate: []
                };

                return this._datawareHouse.getFilteredData(contextData, XAMLProfilerDataSource.XAMLAnalyzerClsId).then(function (dwmFrameRateData) {
                    frameRate.DWMFrameRate = dwmFrameRateData.p;
                    customData.CounterId = XAMLThreadCategory.UIFrames;
                    return _this._datawareHouse.getFilteredData(contextData, XAMLProfilerDataSource.XAMLAnalyzerClsId);
                }).then(function (uiFrameRateData) {
                    frameRate.UIFrameRate = uiFrameRateData.p;
                    return frameRate;
                }, function (error) {
                    _this.logError("GetFrameRateData for " + customData.CounterId + " failed: " + error.toString());
                    throw error;
                });
            }

            this.logError("invalid state");
            return Common.PromiseHelper.getPromiseError(null);
            ;
        };

        XAMLProfilerDataSource.prototype.GetXamlParsingDataProvider = function (timeRange, granularity, expandedEventIds) {
            var _this = this;
            var dataContext;

            if (this._datawareHouse) {
                var jsonTimeRange = new DiagnosticsHub.JsonTimespan(Common.TimestampConvertor.timestampToJson(timeRange.begin), Common.TimestampConvertor.timestampToJson(timeRange.end));

                var customData = {
                    task: 3 /* GetXAMLParsingDataProvider */.toString(),
                    expandedEventIds: JSON.stringify([])
                };

                var contextData = {
                    customDomain: customData,
                    timeDomain: jsonTimeRange
                };

                return this._datawareHouse.getFilteredData(contextData, XAMLProfilerDataSource.XAMLAnalyzerClsId).then(function (result) {
                    var queryResult = new Common.Data.EventQueryResult(result);
                    return queryResult;
                }, function (error) {
                    _this.logError("GetXamlParsingDataProvider failed" + error.toString());
                    throw error;
                });
            }

            this.logError("invalid state");
            return Common.PromiseHelper.getPromiseError(null);
        };

        XAMLProfilerDataSource.prototype.GetHotElementDataProvider = function (timeRange, granularity, expandedEventIds) {
            var _this = this;
            var dataContext;

            if (this._datawareHouse) {
                var jsonTimeRange = new DiagnosticsHub.JsonTimespan(Common.TimestampConvertor.timestampToJson(timeRange.begin), Common.TimestampConvertor.timestampToJson(timeRange.end));

                var customData = {
                    task: 4 /* GetHotElementsDataProvider */.toString(),
                    expandedEventIds: JSON.stringify([])
                };

                var contextData = {
                    customDomain: customData,
                    timeDomain: jsonTimeRange
                };

                return this._datawareHouse.getFilteredData(contextData, XAMLProfilerDataSource.XAMLAnalyzerClsId).then(function (result) {
                    var queryResult = new Common.Data.EventCostQueryResult(result);
                    return queryResult;
                }, function (error) {
                    _this.logError("GetHotElementDataProvider failed" + error.toString());
                    throw error;
                });
            }
            this.logError("invalid state");

            return Common.PromiseHelper.getPromiseError(null);
        };

        XAMLProfilerDataSource.prototype.logError = function (error) {
            this._logger.error(XAMLProfilerDataSource.LoggerPrefixText + error);
        };
        XAMLProfilerDataSource.XAMLAnalyzerClsId = "997028ba-9574-4713-9b39-5898fa850769";
        XAMLProfilerDataSource.LoggerPrefixText = "XAML Profiler: ";
        return XAMLProfilerDataSource;
    })();
    XAMLProfilerDataModel.XAMLProfilerDataSource = XAMLProfilerDataSource;
    ;

    
})(XAMLProfilerDataModel || (XAMLProfilerDataModel = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var XAMLProfiler;
(function (XAMLProfiler) {
    var View = (function (_super) {
        __extends(View, _super);
        function View(containerId) {
            _super.call(this, containerId);
        }
        View.prototype.render = function () {
        };

        View.prototype.onResize = function () {
        };
        return View;
    })(Common.Controls.TemplateControl);
    XAMLProfiler.View = View;
})(XAMLProfiler || (XAMLProfiler = {}));
var XAMLProfiler;
(function (XAMLProfiler) {
    (function (TabControls) {
        var ParsingTab = (function (_super) {
            __extends(ParsingTab, _super);
            function ParsingTab() {
                _super.call(this);
                this.title = Plugin.Resources.getString("ParsingTabTitle");
                this.tooltipString = Plugin.Resources.getString("ParsingTabTooltip");
            }
            ParsingTab.prototype.SetContent = function (view) {
                this.content = view;
            };
            ParsingTab.prototype.onActiveChanged = function () {
                Common.ProfilerCodeMarker.fire(26301 /* perfR2L_XAMLProfilerDetailsViewParseTabbed */);
                if (this.active && this.content) {
                    this.content.render();
                }
            };
            return ParsingTab;
        })(Common.Controls.TabItem);
        TabControls.ParsingTab = ParsingTab;
        ;

        var HotElements = (function (_super) {
            __extends(HotElements, _super);
            function HotElements() {
                _super.call(this);
                this.title = Plugin.Resources.getString("HotElementsTabTitle");
                this.tooltipString = Plugin.Resources.getString("HotElementsTabTooltip");
            }
            HotElements.prototype.SetContent = function (view) {
                this.content = view;
            };
            HotElements.prototype.onActiveChanged = function () {
                Common.ProfilerCodeMarker.fire(26303 /* perfR2L_XAMLProfilerDetailsViewHotElementsTabbed */);
                if (this.active && this.content) {
                    this.content.render();
                }
            };
            return HotElements;
        })(Common.Controls.TabItem);
        TabControls.HotElements = HotElements;
        ;
    })(XAMLProfiler.TabControls || (XAMLProfiler.TabControls = {}));
    var TabControls = XAMLProfiler.TabControls;
})(XAMLProfiler || (XAMLProfiler = {}));
var XAMLProfiler;
(function (XAMLProfiler) {
    var XamlParsingEventInterval = (function (_super) {
        __extends(XamlParsingEventInterval, _super);
        function XamlParsingEventInterval(intervalData) {
            _super.call(this, intervalData);
            this._intervalData = intervalData;
            this._durationInclusive = Common.TimestampConvertor.jsonToTimeStamp(intervalData.durationInclusive);
            this._durationExclusive = Common.TimestampConvertor.jsonToTimeStamp(intervalData.durationExclusive);
        }
        Object.defineProperty(XamlParsingEventInterval.prototype, "elementsInclusive", {
            get: function () {
                return this._intervalData.elementsInclusive;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(XamlParsingEventInterval.prototype, "elementsExclusive", {
            get: function () {
                return this._intervalData.elementsExclusive;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(XamlParsingEventInterval.prototype, "durationInclusive", {
            get: function () {
                return this._durationInclusive;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(XamlParsingEventInterval.prototype, "durationExclusive", {
            get: function () {
                return this._durationExclusive;
            },
            enumerable: true,
            configurable: true
        });

        XamlParsingEventInterval.getInstancesFor = function (intervalsData) {
            var intervals = [];
            if (intervalsData) {
                var intervalsDataLength = intervalsData.length;
                for (var i = 0; i < intervalsDataLength; i++) {
                    intervals.push(new XamlParsingEventInterval(intervalsData[i]));
                }
            }
            return intervals;
        };
        return XamlParsingEventInterval;
    })(Common.EventInterval);
    XAMLProfiler.XamlParsingEventInterval = XamlParsingEventInterval;

    var XAMLParsingEvent = (function (_super) {
        __extends(XAMLParsingEvent, _super);
        function XAMLParsingEvent(eventData) {
            _super.call(this, eventData, this._intervals = XamlParsingEventInterval.getInstancesFor(eventData.intervals));
            if (this._intervals.length != 1) {
                throw new Error(Plugin.Resources.getErrorString("R2LPerf.1008"));
            }
        }
        Object.defineProperty(XAMLParsingEvent.prototype, "elementsInclusive", {
            get: function () {
                return this._intervals[0].elementsInclusive;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(XAMLParsingEvent.prototype, "elementsExclusive", {
            get: function () {
                return this._intervals[0].elementsExclusive;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(XAMLParsingEvent.prototype, "durationInclusive", {
            get: function () {
                return this._intervals[0].durationInclusive;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(XAMLParsingEvent.prototype, "durationExclusive", {
            get: function () {
                return this._intervals[0].durationExclusive;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(XAMLParsingEvent.prototype, "timeSpan", {
            get: function () {
                return this._intervals[0].timespan;
            },
            enumerable: true,
            configurable: true
        });

        XAMLParsingEvent.prototype.getCssClass = function () {
            return "parsingBar";
        };
        XAMLParsingEvent.prototype.getDetails = function () {
            var result = [];
            result.push(this.createDetailInfo("Start", Common.FormattingHelpers.getPrettyPrintTime(this.timeSpan.begin), "StartTimeLabel", null));
            result.push(this.createDetailInfo("End", Common.FormattingHelpers.getPrettyPrintTime(this.timeSpan.end), "EndTimeLabel", null));
            result.push(this.createDetailInfo("Elements Inclusive", this.elementsInclusive, "ElementsInclusiveLabel", null));
            result.push(this.createDetailInfo("Elements Exclusive", this.elementsExclusive, "ElementsExclusiveLabel", null));
            result.push(this.createDetailInfo("Duration Inclusive", Common.FormattingHelpers.getPrettyPrintTime(this.durationInclusive), "DurationInclusiveLabel", null));
            result.push(this.createDetailInfo("Duration Exclusive", Common.FormattingHelpers.getPrettyPrintTime(this.durationExclusive), "DurationExclusiveLabel", null));
            return result;
        };
        return XAMLParsingEvent;
    })(Common.BaseEvent);
    XAMLProfiler.XAMLParsingEvent = XAMLParsingEvent;

    var XamlParsingEventFactory = (function () {
        function XamlParsingEventFactory() {
        }
        XamlParsingEventFactory.prototype.createEvent = function (event) {
            var category = event.category;

            switch (category) {
                case "XamlParsingData":
                    return new XAMLParsingEvent(event);
            }
            throw new Error(Plugin.Resources.getErrorString("R2LPerf.1007"));
        };
        return XamlParsingEventFactory;
    })();
    XAMLProfiler.XamlParsingEventFactory = XamlParsingEventFactory;

    var ParsingViewDataSession = (function () {
        function ParsingViewDataSession(dataSource) {
            this._dataSource = dataSource;
        }
        ParsingViewDataSession.prototype.queryEvents = function (fromTime, toTime, minDuration, sort, expandedEventIds) {
            return this._dataSource.GetXamlParsingDataProvider(new Common.TimeSpan(Common.TimeStamp.fromNanoseconds(fromTime), Common.TimeStamp.fromNanoseconds(toTime)), minDuration, expandedEventIds);
        };
        return ParsingViewDataSession;
    })();
    XAMLProfiler.ParsingViewDataSession = ParsingViewDataSession;

    var ParsingView = (function (_super) {
        __extends(ParsingView, _super);
        function ParsingView(traceInfo, dataSession) {
            _super.call(this, "parsingViewDataTemplate");

            var timelineContainer = this.findElement("parsingTimelineViewContainer");
            var parsingViewConfig = new Common.EventsTimelineViewConfig();
            parsingViewConfig.eventHeaderLabel = Plugin.Resources.getString("XAMLParsingViewEventHeaderLabel");
            this._parsingEventsTimelineView = new Common.EventsTimelineView(timelineContainer, parsingViewConfig);
            this._dataSession = dataSession;

            var eventsTimelineModel = new Common.EventsTimelineModel(this._dataSession, new XamlParsingEventFactory());
            this._parsingEventsTimelineViewModel = new Common.EventsTimelineViewModel(eventsTimelineModel, traceInfo, new Common.MarkerDataModel());
        }
        ParsingView.prototype.render = function () {
            this._parsingEventsTimelineView.viewModel = this._parsingEventsTimelineViewModel;
            this._parsingEventsTimelineView.render();
        };
        return ParsingView;
    })(XAMLProfiler.View);
    XAMLProfiler.ParsingView = ParsingView;
})(XAMLProfiler || (XAMLProfiler = {}));
var XAMLProfiler;
(function (XAMLProfiler) {
    var HotElementEventInterval = (function (_super) {
        __extends(HotElementEventInterval, _super);
        function HotElementEventInterval(intervalData) {
            _super.call(this, intervalData);
            this._intervalData = intervalData;
        }
        Object.defineProperty(HotElementEventInterval.prototype, "elementsInclusive", {
            get: function () {
                return this._intervalData.elementsInclusive;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HotElementEventInterval.prototype, "elementsExclusive", {
            get: function () {
                return this._intervalData.elementsExclusive;
            },
            enumerable: true,
            configurable: true
        });

        HotElementEventInterval.getInstancesFor = function (intervalsData) {
            var intervals = [];
            if (intervalsData) {
                var intervalsDataLength = intervalsData.length;
                for (var i = 0; i < intervalsDataLength; i++) {
                    intervals.push(new HotElementEventInterval(intervalsData[i]));
                }
            }
            return intervals;
        };
        return HotElementEventInterval;
    })(Common.EventInterval);
    XAMLProfiler.HotElementEventInterval = HotElementEventInterval;

    var HotElementEvent = (function (_super) {
        __extends(HotElementEvent, _super);
        function HotElementEvent(eventData) {
            _super.call(this, this._eventData = eventData, this._intervals = HotElementEventInterval.getInstancesFor(eventData.intervals));
            if (this._intervals.length != 1) {
                throw new Error(Plugin.Resources.getErrorString("R2LPerf.1008"));
            }

            if (eventData.fileName && eventData.fileName !== "") {
                this._xamlFileName = eventData.fileName.replace(/^.*[\\\/]/, '');
            }
        }
        Object.defineProperty(HotElementEvent.prototype, "name", {
            get: function () {
                return this.className;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HotElementEvent.prototype, "elementName", {
            get: function () {
                return this._eventData.name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HotElementEvent.prototype, "className", {
            get: function () {
                return this._eventData.className;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HotElementEvent.prototype, "xamlFileName", {
            get: function () {
                return this._xamlFileName;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HotElementEvent.prototype, "xamlFileNameWithPath", {
            get: function () {
                return this._eventData.fileName;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HotElementEvent.prototype, "templateName", {
            get: function () {
                switch (this._eventData.templateType) {
                    case "Inline":
                        return Plugin.Resources.getString("InlineTemplateNameLabel");
                    case "Implicit":
                        return Plugin.Resources.getString("DefaultTemplateNameLabel");
                    case "Key":
                    case "Style":
                        return this._eventData.templateName;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(HotElementEvent.prototype, "nameAndContext", {
            get: function () {
                return this.className;
            },
            enumerable: true,
            configurable: true
        });

        HotElementEvent.prototype.getCssClass = function () {
            return "layoutBar";
        };

        HotElementEvent.prototype.getDetails = function () {
            var result = [];
            result.push(this.createDetailInfo("Element Name", this.elementName, "ElementNameLabel", null));
            if (this.templateName) {
                result.push(this.createDetailInfo("Template Name", this.templateName, "TemplateNameLabel", null));
            }
            result.push(this.createDetailInfo("Element Count", this._intervals[0].elementsInclusive, "ElementCountLabel", null));
            if (this.xamlFileNameWithPath && this.xamlFileNameWithPath !== "") {
                result.push(this.createDetailInfo("XAML File Name", this.xamlFileName, "HotElementXAMLFileNameLabel", null, null, this.xamlFileNameWithPath));
            }
            return result;
        };
        return HotElementEvent;
    })(Common.BaseEvent);
    XAMLProfiler.HotElementEvent = HotElementEvent;

    var HotElementGroupEvent = (function (_super) {
        __extends(HotElementGroupEvent, _super);
        function HotElementGroupEvent(eventData) {
            _super.call(this, eventData);
        }
        Object.defineProperty(HotElementGroupEvent.prototype, "nameAndContext", {
            get: function () {
                return this.className + " (" + this.childrenCount + ")";
            },
            enumerable: true,
            configurable: true
        });
        return HotElementGroupEvent;
    })(HotElementEvent);
    XAMLProfiler.HotElementGroupEvent = HotElementGroupEvent;

    var HotElementsViewDataSession = (function () {
        function HotElementsViewDataSession(dataSource) {
            this._dataSource = dataSource;
        }
        HotElementsViewDataSession.prototype.queryEvents = function (fromTime, toTime, minDuration, sort, expandedEventIds) {
            return this._dataSource.GetHotElementDataProvider(new Common.TimeSpan(Common.TimeStamp.fromNanoseconds(fromTime), Common.TimeStamp.fromNanoseconds(toTime)), minDuration, expandedEventIds);
        };
        return HotElementsViewDataSession;
    })();
    XAMLProfiler.HotElementsViewDataSession = HotElementsViewDataSession;

    var HotElementsEventFactory = (function () {
        function HotElementsEventFactory() {
        }
        HotElementsEventFactory.prototype.createEvent = function (eventData) {
            var category = eventData.category;

            switch (category) {
                case "HotElementData":
                    return new HotElementEvent(eventData);
                case "HotElementDataGroup":
                    return new HotElementGroupEvent(eventData);
            }
            throw new Error(Plugin.Resources.getErrorString("R2LPerf.1007"));
        };
        return HotElementsEventFactory;
    })();
    XAMLProfiler.HotElementsEventFactory = HotElementsEventFactory;

    var HotElementsView = (function (_super) {
        __extends(HotElementsView, _super);
        function HotElementsView(traceInfo, dataSession) {
            _super.call(this, "hotElementsViewDataTemplate");

            var timelineContainer = this.findElement("hotElementsCostViewContainer");
            var viewConfig = new Common.EventsTimelineViewConfig();
            viewConfig.eventHeaderLabel = Plugin.Resources.getString("HotElementsViewEventHeaderLabel");
            this._hotElementsCostComparisonView = new Common.EventsCostComparisonView(timelineContainer, viewConfig);

            this._dataSession = dataSession;

            var eventsTimelineModel = new Common.EventsCostComparisonModel(this._dataSession, new HotElementsEventFactory());
            this._hotElementsCostComparisonViewModel = new Common.EventsCostComparisonViewModel(eventsTimelineModel, traceInfo);
        }
        HotElementsView.prototype.render = function () {
            this._hotElementsCostComparisonView.eventsCostComparisonViewModel = this._hotElementsCostComparisonViewModel;
            this._hotElementsCostComparisonView.viewModel = this._hotElementsCostComparisonViewModel;
            this._hotElementsCostComparisonView.render();
        };
        return HotElementsView;
    })(XAMLProfiler.View);
    XAMLProfiler.HotElementsView = HotElementsView;
})(XAMLProfiler || (XAMLProfiler = {}));
var XAMLProfiler;
(function (XAMLProfiler) {
    var DetailsView = (function (_super) {
        __extends(DetailsView, _super);
        function DetailsView(containerId, dataSource, traceInfo) {
            _super.call(this, "detailsViewDataTemplate");
            this._dataSource = dataSource;
            this._traceInfo = traceInfo;
            if (!containerId) {
                throw new Error("");
            }

            var parentcontainer = document.getElementById(containerId);
            parentcontainer.appendChild(this.rootElement);
        }
        DetailsView.prototype.render = function () {
            this._tabControl = new Common.Controls.TabControl();

            this.appendChild(this._tabControl);

            this._hotElementsView = new XAMLProfiler.HotElementsView(this._traceInfo, new XAMLProfiler.HotElementsViewDataSession(this._dataSource));
            this._parsingView = new XAMLProfiler.ParsingView(this._traceInfo, new XAMLProfiler.ParsingViewDataSession(this._dataSource));

            this._parsingTab = new XAMLProfiler.TabControls.ParsingTab();
            this._parsingTab.SetContent(this._parsingView);

            this._hotElementsTab = new XAMLProfiler.TabControls.HotElements();
            this._hotElementsTab.SetContent(this._hotElementsView);

            this._tabControl.addTab(this._hotElementsTab);
            this._tabControl.addTab(this._parsingTab);
        };
        return DetailsView;
    })(XAMLProfiler.View);
    XAMLProfiler.DetailsView = DetailsView;
    ;
})(XAMLProfiler || (XAMLProfiler = {}));

var XAMLProfiler;
(function (XAMLProfiler) {
    var XAMLProfilerController = (function () {
        function XAMLProfilerController() {
            Common.ProfilerCodeMarker.fire(26300 /* perfR2L_XAMLProfilerStarted */);
        }
        XAMLProfilerController.prototype.initializeDataSource = function () {
            var _this = this;
            if (!this._xamlDataSource) {
                this._xamlDataSource = new XAMLProfilerDataModel.XAMLProfilerDataSource();

                return this._xamlDataSource.Init().then(function (traceInfo) {
                    _this._view = new XamlProfilerView(_this._xamlDataSource, traceInfo);
                    _this._view.render();
                }, function (error) {
                    throw new Error(Plugin.Resources.getErrorString("R2LPerf.1001") + error.toString());
                });
            } else {
                return Common.PromiseHelper.getPromiseSuccess();
            }
        };
        return XAMLProfilerController;
    })();
    XAMLProfiler.XAMLProfilerController = XAMLProfilerController;
    ;

    var XamlProfilerView = (function (_super) {
        __extends(XamlProfilerView, _super);
        function XamlProfilerView(dataSource, traceInfo) {
            _super.call(this, "mainViewTemplate");
            this._dataSource = dataSource;
            this._traceInfo = traceInfo;

            this._mainContainer = new Common.Controls.Control(document.getElementById("mainContainer"));
            this._mainContainer.appendChild(this);

            this._detailsView = new XAMLProfiler.DetailsView(this.findElement("reportViewContainer").id, this._dataSource, this._traceInfo);
        }
        XamlProfilerView.prototype.render = function () {
            var _this = this;
            this._detailsView.render();

            var resizeTimerId;
            Common.Program.addEventListener(Common.ProgramEvents.Resize, function () {
                clearTimeout(resizeTimerId);
                resizeTimerId = setTimeout(function () {
                    _this._detailsView.onResize();
                }, XamlProfilerView._RenderResizeDelay);
            });
        };
        XamlProfilerView._RenderResizeDelay = 50;
        XamlProfilerView._MinZoomLevel = Common.TimeStamp.fromSeconds(1);
        return XamlProfilerView;
    })(XAMLProfiler.View);
    XAMLProfiler.XamlProfilerView = XamlProfilerView;
})(XAMLProfiler || (XAMLProfiler = {}));

var xamlProfilerController;

(function () {
    Plugin.addEventListener("pluginready", function () {
        xamlProfilerController = new XAMLProfiler.XAMLProfilerController();
        xamlProfilerController.initializeDataSource();
    });
})();
//# sourceMappingURL=XamlProfiler.js.map

// SIG // Begin signature block
// SIG // MIIanwYJKoZIhvcNAQcCoIIakDCCGowCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFHLSoh6+tWOw
// SIG // dLwco5+jVrneTbl4oIIVejCCBLswggOjoAMCAQICEzMA
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
// SIG // E6P9MYIEkTCCBI0CAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBqjAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUXvBzidMWR+mxWB/9luuh
// SIG // BNvz8HgwSgYKKwYBBAGCNwIBDDE8MDqgIIAeAFgAQQBN
// SIG // AEwAUAByAG8AZgBpAGwAZQByAC4AagBzoRaAFGh0dHA6
// SIG // Ly9taWNyb3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIB
// SIG // AGzKkPn6pNlgWWBaUi3wtVeVNIpP2nSWgXdKt2ofctDN
// SIG // 67UP3MYZQhH9PF06KxWJ8UTRrGbXHUK3Y/Zn8jk4aegX
// SIG // qTfGkOJSPensLh6LYjXM3C63IY+R9uXPhDjk14OJFj8g
// SIG // Pzbg7sJlCbS4fb3qLI7Q1yj8BhNIF4EcgrxHVmvY3m+9
// SIG // OrWQWefFxDvOVjPV2yPYIzynPi5RhPymYyLDvORGPBRk
// SIG // /y8tBE8K4orv3tnl/VxqHEK9jl75h4kMCVf1YwQXKNEP
// SIG // TINNUPrIbcnHR+8vl4B/YBLxrTQacfwk7+lVrCk+/5jo
// SIG // aAneOUPaIGbheCq+Bq4XsQ0nCqRLuI/98myhggIoMIIC
// SIG // JAYJKoZIhvcNAQkGMYICFTCCAhECAQEwgY4wdzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0
// SIG // IFRpbWUtU3RhbXAgUENBAhMzAAAAWdZzzVGO8CLFAAAA
// SIG // AABZMAkGBSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJ
// SIG // KoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xNDA3MjMw
// SIG // OTA3NTJaMCMGCSqGSIb3DQEJBDEWBBQ+dUj76j+LtuYJ
// SIG // yszRFmal0XQ6mTANBgkqhkiG9w0BAQUFAASCAQBrh3a2
// SIG // YNX97qhFOfDav8513XrDgfmRMmdxvcS+ODD2yBcr5d2l
// SIG // +ZfrGc9P31KYrHzrxq0g98Ey/8bNbbSK20E9cY0LnrGf
// SIG // m/XyrnXNq6nTy1rECVR+2qEff2bFgocW08UMjUEwLGGQ
// SIG // ojVNKpbNKjOEKhLV2YB2Cp0QkefXDroW/zdUR4TjNgOo
// SIG // elbmmybPDhMzIh/GdLFSSI33qT4oPicRF9z446Oev5PK
// SIG // /bcTYMAkB/D8vzZ5oNM9gcD1GczHzRKTvfBIMJUmYe6l
// SIG // WEiTzoJ+DuhCAwPTBMRlDaa7J5yvnRgg4dZP3/xrPKxV
// SIG // DBGnJm6MWN2SIPKm1fibhWFGYH2M
// SIG // End signature block
