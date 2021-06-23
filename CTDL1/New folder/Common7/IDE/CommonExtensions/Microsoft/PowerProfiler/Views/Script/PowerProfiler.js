var PowerProfiler;
(function (PowerProfiler) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.BaseStyleSheet = "PowerProfiler.css";
        Constants.MinGranularitySupportedInNs = 1;
        return Constants;
    })();
    PowerProfiler.Constants = Constants;
})(PowerProfiler || (PowerProfiler = {}));
var DataWarehouse = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse;
var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

var PowerDataModel;
(function (PowerDataModel) {
    (function (EnergyAnalyzerTasks) {
        EnergyAnalyzerTasks[EnergyAnalyzerTasks["GetDetailedPowerData"] = 1] = "GetDetailedPowerData";
        EnergyAnalyzerTasks[EnergyAnalyzerTasks["GetPowerSummaryData"] = 3] = "GetPowerSummaryData";
        EnergyAnalyzerTasks[EnergyAnalyzerTasks["GetSessionDuration"] = 4] = "GetSessionDuration";
        EnergyAnalyzerTasks[EnergyAnalyzerTasks["GetBatteryEnergy"] = 5] = "GetBatteryEnergy";
    })(PowerDataModel.EnergyAnalyzerTasks || (PowerDataModel.EnergyAnalyzerTasks = {}));
    var EnergyAnalyzerTasks = PowerDataModel.EnergyAnalyzerTasks;

    var PowerProfilerDataSource = (function () {
        function PowerProfilerDataSource() {
            this._logger = DiagnosticsHub.getLogger();
        }
        PowerProfilerDataSource.prototype.Init = function () {
            var _this = this;
            return DataWarehouse.loadDataWarehouse().then(function (dw) {
                _this._datawareHouse = dw;

                var customData = {
                    task: 4 /* GetSessionDuration */.toString()
                };
                var contextData = {
                    customDomain: customData
                };

                return _this._datawareHouse.getFilteredData(contextData, PowerProfilerDataSource.EnergyAnalyzerClsId);
            }).then(function (jsonTimeRange) {
                return new Common.TimeSpan(Common.TimestampConvertor.jsonToTimeStamp(jsonTimeRange.begin), Common.TimestampConvertor.jsonToTimeStamp(jsonTimeRange.end));
            }, function (error) {
                _this.logError("Initialization failed: " + error.toString());
                throw error;
            });
        };

        PowerProfilerDataSource.prototype.GetPowerSummaryData = function (timeRange, granularity) {
            var _this = this;
            if (this._datawareHouse) {
                var jsonTimeRange = new DiagnosticsHub.JsonTimespan(Common.TimestampConvertor.timestampToJson(timeRange.begin), Common.TimestampConvertor.timestampToJson(timeRange.end));

                var customData = {
                    task: 3 /* GetPowerSummaryData */.toString(),
                    granularity: granularity.toString()
                };
                var contextData = {
                    customDomain: customData,
                    timeDomain: jsonTimeRange
                };
                return this._datawareHouse.getFilteredData(contextData, PowerProfilerDataSource.EnergyAnalyzerClsId).then(function (data) {
                    return data;
                }, function (error) {
                    _this.logError("GetPowerData failed: " + error.toString());
                    throw error;
                });
            }

            this.logError("invalid state");
            return Common.PromiseHelper.getPromiseError(null);
        };

        PowerProfilerDataSource.prototype.GetDetailedPowerDataProvider = function (timeRange, granularity, expandedEventIds) {
            var _this = this;
            if (this._datawareHouse) {
                var jsonTimeRange = new DiagnosticsHub.JsonTimespan(Common.TimestampConvertor.timestampToJson(timeRange.begin), Common.TimestampConvertor.timestampToJson(timeRange.end));

                var customData = {
                    task: 1 /* GetDetailedPowerData */.toString(),
                    granularity: granularity.toString(),
                    expandedEventIds: JSON.stringify(expandedEventIds)
                };
                var contextData = {
                    customDomain: customData,
                    timeDomain: jsonTimeRange
                };
                return this._datawareHouse.getFilteredData(contextData, PowerProfilerDataSource.EnergyAnalyzerClsId).then(function (result) {
                    return new Common.Data.EventQueryResult(result);
                }, function (error) {
                    _this.logError("GetDetailedPowerDataProvider failed: " + error.toString());
                    throw error;
                });
            }

            this.logError("invalid state");
            return Common.PromiseHelper.getPromiseError(null);
        };

        PowerProfilerDataSource.prototype.GetBatteryEnergy = function () {
            var _this = this;
            if (this._datawareHouse) {
                var customData = {
                    task: 5 /* GetBatteryEnergy */.toString()
                };

                var contextData = {
                    customDomain: customData
                };

                return this._datawareHouse.getFilteredData(contextData, PowerProfilerDataSource.EnergyAnalyzerClsId).then(function (data) {
                    return data.batteryEnergy;
                }, function (error) {
                    _this.logError("GetBatteryEnergy failed: " + error.toString());
                    throw error;
                });
            }
            this.logError("invalid state");
            return Common.PromiseHelper.getPromiseError(null);
        };

        PowerProfilerDataSource.prototype.logError = function (error) {
            this._logger.error(PowerProfilerDataSource.LoggerPrefixText + error);
        };
        PowerProfilerDataSource.EnergyAnalyzerClsId = "5a25b010-7f99-4168-ad2b-7445cc9846e6";
        PowerProfilerDataSource.LoggerPrefixText = "Energy Profiler: ";
        return PowerProfilerDataSource;
    })();
    PowerDataModel.PowerProfilerDataSource = PowerProfilerDataSource;
    ;

    var PowerDatum = (function () {
        function PowerDatum() {
        }
        return PowerDatum;
    })();
    PowerDataModel.PowerDatum = PowerDatum;
    ;

    var PowerConsumption = (function () {
        function PowerConsumption() {
        }
        return PowerConsumption;
    })();
    PowerDataModel.PowerConsumption = PowerConsumption;
    ;
})(PowerDataModel || (PowerDataModel = {}));
var PowerProfiler;
(function (PowerProfiler) {
    var NetworkData = (function () {
        function NetworkData(bytes) {
            if (typeof bytes === "undefined") { bytes = 0; }
            this._bytes = bytes;
        }
        Object.defineProperty(NetworkData.prototype, "bytes", {
            get: function () {
                return this._bytes;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NetworkData.prototype, "kiloBytes", {
            get: function () {
                return this._bytes / NetworkData.OneKBInBytes;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NetworkData.prototype, "megaBytes", {
            get: function () {
                return this._bytes / NetworkData.OneMBInBytes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NetworkData.prototype, "gigaBytes", {
            get: function () {
                return this._bytes / NetworkData.OneGBInBytes;
            },
            enumerable: true,
            configurable: true
        });
        NetworkData.OneKBInBytes = 1024;
        NetworkData.OneMBInBytes = NetworkData.OneKBInBytes * 1024;
        NetworkData.OneGBInBytes = NetworkData.OneMBInBytes * 1024;
        return NetworkData;
    })();
    PowerProfiler.NetworkData = NetworkData;

    var Power = (function () {
        function Power(milliWatts) {
            this._milliWatts = milliWatts;
        }
        Object.defineProperty(Power.prototype, "milliWatts", {
            get: function () {
                return this._milliWatts;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Power.prototype, "watts", {
            get: function () {
                return this._milliWatts / Power.OneWattInMilliWatt;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Power.prototype, "kiloWatts", {
            get: function () {
                return this._milliWatts / Power.OneKiloWattInMilliWatt;
            },
            enumerable: true,
            configurable: true
        });

        Power.fromKiloWatt = function (kiloWatt) {
            return new Power(kiloWatt * Power.OneKiloWattInMilliWatt);
        };
        Power.fromWatt = function (watt) {
            return new Power(watt * Power.OneWattInMilliWatt);
        };
        Power.OneWattInMilliWatt = 1000;
        Power.OneKiloWattInMilliWatt = Power.OneWattInMilliWatt * 1000;
        return Power;
    })();
    PowerProfiler.Power = Power;

    var Energy = (function () {
        function Energy(milliWattHr) {
            this._milliWattHr = milliWattHr;
        }
        Object.defineProperty(Energy.prototype, "milliWattHr", {
            get: function () {
                return this._milliWattHr;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Energy.prototype, "wattHr", {
            get: function () {
                return this._milliWattHr / Energy.OneWattHrInMilliWattHr;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Energy.prototype, "kiloWattHr", {
            get: function () {
                return this._milliWattHr / Energy.OneKiloWattInMilliWattHr;
            },
            enumerable: true,
            configurable: true
        });

        Energy.fromPower = function (power, duration) {
            return new Energy(power.milliWatts * duration.sec / 3600);
        };
        Energy.OneWattHrInMilliWattHr = 1000;
        Energy.OneKiloWattInMilliWattHr = Energy.OneWattHrInMilliWattHr * 1000;
        return Energy;
    })();
    PowerProfiler.Energy = Energy;

    var FormattingHelpers = (function () {
        function FormattingHelpers() {
        }
        FormattingHelpers.getNetworkDataString = function (networkData) {
            var value;
            var unitAbbreviation;

            if (networkData.bytes < NetworkData.OneKBInBytes) {
                value = Math.round(networkData.bytes * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("BytesAbbreviation");
            } else if (networkData.bytes < NetworkData.OneMBInBytes) {
                value = Math.round(networkData.kiloBytes * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("KiloBytesAbbreviation");
            } else if (networkData.bytes < NetworkData.OneGBInBytes) {
                value = Math.round(networkData.megaBytes * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("MegaBytesAbbreviation");
            } else {
                value = Math.round(networkData.gigaBytes * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("GigaBytesAbbreviation");
            }

            return Common.FormattingHelpers.getDecimalLocaleString(value, true) + " " + unitAbbreviation;
        };

        FormattingHelpers.getEnergyDataString = function (energy) {
            var value = 0;
            var unitAbbreviation;
            if (energy.milliWattHr < 1) {
                value = Number(energy.milliWattHr.toPrecision(2));
                unitAbbreviation = Plugin.Resources.getString("MilliWattHrAbbreviation");
            } else {
                value = Math.round(energy.milliWattHr * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("MilliWattHrAbbreviation");
            }

            return Common.FormattingHelpers.getDecimalLocaleString(value, true) + " " + unitAbbreviation;
        };

        FormattingHelpers.getPowerDataString = function (power) {
            var value = Math.round(power.milliWatts);
            var unitAbbreviation = Plugin.Resources.getString("MilliWattsAbbreviation");

            return Common.FormattingHelpers.getDecimalLocaleString(value, true) + " " + unitAbbreviation;
        };
        return FormattingHelpers;
    })();
    PowerProfiler.FormattingHelpers = FormattingHelpers;
})(PowerProfiler || (PowerProfiler = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PowerProfiler;
(function (PowerProfiler) {
    var View = (function (_super) {
        __extends(View, _super);
        function View(containerId) {
            _super.call(this, containerId);
        }
        View.prototype.render = function () {
        };

        View.prototype.resize = function () {
        };
        return View;
    })(Common.Controls.TemplateControl);
    PowerProfiler.View = View;
})(PowerProfiler || (PowerProfiler = {}));
var PowerProfiler;
(function (PowerProfiler) {
    var EventIntervalsGenerator = (function () {
        function EventIntervalsGenerator() {
        }
        EventIntervalsGenerator.getInstancesFor = function (intervalType, intervalsData) {
            var intervals = [];
            if (intervalsData) {
                var intervalsDataLength = intervalsData.length;
                for (var i = 0; i < intervalsDataLength; i++) {
                    intervals.push(new intervalType(intervalsData[i]));
                }
            }
            return intervals;
        };
        return EventIntervalsGenerator;
    })();
    PowerProfiler.EventIntervalsGenerator = EventIntervalsGenerator;

    var NetworkTrafficEventInterval = (function (_super) {
        __extends(NetworkTrafficEventInterval, _super);
        function NetworkTrafficEventInterval(interval) {
            _super.call(this, interval);
            this._intervalData = interval;
        }
        Object.defineProperty(NetworkTrafficEventInterval.prototype, "downloadData", {
            get: function () {
                return new PowerProfiler.NetworkData(this._intervalData.DownloadData);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NetworkTrafficEventInterval.prototype, "uploadData", {
            get: function () {
                return new PowerProfiler.NetworkData(this._intervalData.UploadData);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NetworkTrafficEventInterval.prototype, "power", {
            get: function () {
                return new PowerProfiler.Power(this._intervalData.Power);
            },
            enumerable: true,
            configurable: true
        });
        return NetworkTrafficEventInterval;
    })(Common.EventInterval);
    PowerProfiler.NetworkTrafficEventInterval = NetworkTrafficEventInterval;

    var NetworkTrafficEvent = (function (_super) {
        __extends(NetworkTrafficEvent, _super);
        function NetworkTrafficEvent(event) {
            _super.call(this, this._eventData = event, this._intervals = EventIntervalsGenerator.getInstancesFor(NetworkTrafficEventInterval, event.intervals));
        }
        Object.defineProperty(NetworkTrafficEvent.prototype, "name", {
            get: function () {
                return Plugin.Resources.getString(this._eventData.name);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NetworkTrafficEvent.prototype, "nameAndContext", {
            get: function () {
                return Plugin.Resources.getString(this._eventData.name);
            },
            enumerable: true,
            configurable: true
        });

        NetworkTrafficEvent.prototype.getCssClass = function () {
            return "networkData";
        };

        NetworkTrafficEvent.prototype.getDetails = function () {
            var result = [];
            result.push(this.createDetailInfo("Type", "NetworkTrafficEvent", null, null));
            return result;
        };
        NetworkTrafficEvent.prototype.getTooltip = function (intervalPosition) {
            var powerUnit = Plugin.Resources.getString("PowerUnit");
            var downloadDataLabel = Plugin.Resources.getString("DownloadDataLabel");
            var uploadDataLabel = Plugin.Resources.getString("UploadDataLabel");
            var energyConsumedLabel = Plugin.Resources.getString("EnergyConsumedLabel");
            var precision = 2;
            var interval = this._intervals[intervalPosition];

            var tooltipControl = new Common.Controls.TemplateControl("networkDataTooltipTemplate");

            tooltipControl.findElement("downloadData").innerHTML = downloadDataLabel + " : " + PowerProfiler.FormattingHelpers.getNetworkDataString(interval.downloadData);

            tooltipControl.findElement("uploadData").innerHTML = uploadDataLabel + " : " + PowerProfiler.FormattingHelpers.getNetworkDataString(interval.uploadData);

            tooltipControl.findElement("energyConsumed").innerHTML = energyConsumedLabel + " : " + PowerProfiler.FormattingHelpers.getEnergyDataString(PowerProfiler.Energy.fromPower(interval.power, interval.timespan.elapsed));

            return tooltipControl;
        };
        return NetworkTrafficEvent;
    })(Common.BaseEvent);
    PowerProfiler.NetworkTrafficEvent = NetworkTrafficEvent;
    ;

    var NetworkInterfaceEventInterval = (function (_super) {
        __extends(NetworkInterfaceEventInterval, _super);
        function NetworkInterfaceEventInterval(intervalData) {
            _super.call(this, intervalData);
            this._intervalData = intervalData;
        }
        return NetworkInterfaceEventInterval;
    })(Common.EventInterval);
    PowerProfiler.NetworkInterfaceEventInterval = NetworkInterfaceEventInterval;
    var NetworkInterfaceEvent = (function (_super) {
        __extends(NetworkInterfaceEvent, _super);
        function NetworkInterfaceEvent(event) {
            _super.call(this, this._eventData = event, this._intervals = EventIntervalsGenerator.getInstancesFor(NetworkInterfaceEventInterval, event.intervals));
        }
        Object.defineProperty(NetworkInterfaceEvent.prototype, "name", {
            get: function () {
                return Plugin.Resources.getString(this._eventData.name);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NetworkInterfaceEvent.prototype, "nameAndContext", {
            get: function () {
                return Plugin.Resources.getString(this._eventData.name);
            },
            enumerable: true,
            configurable: true
        });

        NetworkInterfaceEvent.prototype.getCssClass = function () {
            return "networkInterface";
        };

        NetworkInterfaceEvent.prototype.getDetails = function () {
            var result = [];
            result.push(this.createDetailInfo("Type", "NetworkInterfaceEvent", null, null));
            return result;
        };
        return NetworkInterfaceEvent;
    })(Common.BaseEvent);
    PowerProfiler.NetworkInterfaceEvent = NetworkInterfaceEvent;
    ;

    var PowerEventFactory = (function () {
        function PowerEventFactory() {
        }
        PowerEventFactory.prototype.createEvent = function (interval) {
            var category = interval.category;

            switch (category) {
                case "NetworkInterface":
                    return new NetworkInterfaceEvent(interval);
                case "NetworkTraffic":
                    return new NetworkTrafficEvent(interval);
            }
            throw new Error(Plugin.Resources.getErrorString("R2LPerf.1007"));
        };
        return PowerEventFactory;
    })();
    PowerProfiler.PowerEventFactory = PowerEventFactory;
    ;

    var PowerViewDataSession = (function () {
        function PowerViewDataSession(dataSource) {
            this._dataSource = dataSource;
        }
        PowerViewDataSession.prototype.queryEvents = function (fromTime, toTime, minDuration, sort, expandedEventIds) {
            return this._dataSource.GetDetailedPowerDataProvider(new Common.TimeSpan(Common.TimeStamp.fromNanoseconds(fromTime), Common.TimeStamp.fromNanoseconds(toTime)), minDuration, expandedEventIds);
        };
        return PowerViewDataSession;
    })();
    PowerProfiler.PowerViewDataSession = PowerViewDataSession;
    ;

    var PowerTimelineView = (function () {
        function PowerTimelineView(container, sessionDuration, dataSession) {
            var powerTimelineViewConfig = new Common.EventsTimelineViewConfig();
            powerTimelineViewConfig.eventHeaderLabel = Plugin.Resources.getString("PowerTimelineViewEventHeaderLabel");
            powerTimelineViewConfig.showEventDetails = false;
            powerTimelineViewConfig.showDurationText = false;
            this._powerEventsTimelineView = new Common.EventsTimelineView(container, powerTimelineViewConfig);

            var eventsTimelineModel = new Common.EventsTimelineModel(dataSession, new PowerEventFactory());
            this._powerEventsTimelineViewModel = new Common.EventsTimelineViewModel(eventsTimelineModel, sessionDuration, new Common.MarkerDataModel(), true);
        }
        PowerTimelineView.prototype.render = function () {
            this._powerEventsTimelineView.viewModel = this._powerEventsTimelineViewModel;
            this._powerEventsTimelineView.render();
        };
        return PowerTimelineView;
    })();
    PowerProfiler.PowerTimelineView = PowerTimelineView;
    ;
})(PowerProfiler || (PowerProfiler = {}));
var PowerProfiler;
(function (PowerProfiler) {
    var DonutChartView = (function (_super) {
        __extends(DonutChartView, _super);
        function DonutChartView(container) {
            _super.call(this, container);
            this._donutChart = new Common.DonutChart(this.rootElement, this.toolTipCallback.bind(this), this.addSectorAriaLabel.bind(this), this.getDonutChartConfig());
            this.rootElement.setAttribute("aria-label", Plugin.Resources.getString("summaryGraphAriaLabel"));
        }
        DonutChartView.prototype.resetData = function (data, duration) {
            this._data = data;
            this._duration = duration;
        };

        DonutChartView.prototype.render = function () {
            if (this._donutChart.sectors.length > 0) {
                this._donutChart.removeAllSectors();
            }

            var sectors = [];
            this.addSector(sectors, DonutChartView.CPUName, this._data.CPU, this._duration, DonutChartView.CPUDataClassName);
            this.addSector(sectors, DonutChartView.NetworkName, this._data.Network_Total, this._duration, DonutChartView.NetworkDataClassName);
            this.addSector(sectors, DonutChartView.DisplayName, this._data.Display, this._duration, DonutChartView.DisplayDataClassName);

            this._donutChart.addSectors(sectors);
            this._donutChart.render();

            Common.ProfilerCodeMarker.fire(26401 /* perfR2L_PowerProfilerSummaryViewLoaded */);
        };

        DonutChartView.prototype.toolTipCallback = function (sectorInfo, percent) {
            return Plugin.Resources.getString("SectorToolTip", Plugin.Resources.getString(sectorInfo.name), Common.FormattingHelpers.getDecimalLocaleString(percent, true), PowerProfiler.FormattingHelpers.getEnergyDataString(new PowerProfiler.Energy(sectorInfo.value)));
        };

        DonutChartView.prototype.addSectorAriaLabel = function (sectorInfo, percent) {
            var onAddSectorAriaLabel = this.rootElement.getAttribute("aria-label");
            onAddSectorAriaLabel += " " + Plugin.Resources.getString("EnerguSummarySectorAriaLabel", sectorInfo.name, Common.FormattingHelpers.getDecimalLocaleString(percent, true), PowerProfiler.FormattingHelpers.getEnergyDataString(new PowerProfiler.Energy(sectorInfo.value)));
            this.rootElement.setAttribute("aria-label", onAddSectorAriaLabel);
        };

        DonutChartView.prototype.getDonutChartConfig = function () {
            var config = {
                clockwiseRotation: true,
                containerHeight: 200,
                containerWidth: 250,
                radius: 55,
                strokeWidth: 25,
                explosionFactor: 2,
                minDonutArcAngle: 10
            };
            return config;
        };

        DonutChartView.prototype.addSector = function (sectors, consumer, powerData, duration, className) {
            if (powerData && powerData.length == 1 && powerData[0].Power) {
                var energy = PowerProfiler.Energy.fromPower(new PowerProfiler.Power(powerData[0].Power), duration);

                sectors.push({
                    name: consumer,
                    cssClass: className,
                    value: energy.milliWattHr
                });
            } else if (powerData && powerData.length > 1) {
                throw new Error(Plugin.Resources.getErrorString("R2LPerf.1009"));
            }
        };
        DonutChartView.CPUDataClassName = "cpuData";
        DonutChartView.DisplayDataClassName = "displayData";
        DonutChartView.NetworkDataClassName = "networkData";
        DonutChartView.StyleSheetName = "PowerProfiler.css";

        DonutChartView.CPUName = "CPU_Category";
        DonutChartView.DisplayName = "Display_Category";
        DonutChartView.NetworkName = "Network_Category";
        return DonutChartView;
    })(Common.Controls.Control);
    PowerProfiler.DonutChartView = DonutChartView;
})(PowerProfiler || (PowerProfiler = {}));
var PowerProfiler;
(function (PowerProfiler) {
    var SummaryView = (function (_super) {
        __extends(SummaryView, _super);
        function SummaryView(container, sessionDuration, dataSource) {
            _super.call(this, "summaryDataTemplate");
            this._timeSpan = sessionDuration;
            this._sessionDuration = sessionDuration;
            this._dataSource = dataSource;

            this._summaryTitle = this.findElement("summaryTitle");
            this._summaryTitle.addEventListener("mouseover", this.showTitleTooltip.bind(this));
            this._summaryTitle.addEventListener("mouseout", function () {
                return Plugin.Tooltip.dismiss();
            });
            this._summaryDescription = this.findElement("summaryDecription");
            this._donutChartView = new PowerProfiler.DonutChartView(this.findElement("summaryGraphContainer"));
            this._viewEventManager = DiagnosticsHub.getViewEventManager();
            this._timeSpan = sessionDuration;
            this._viewEventManager.selectionChanged.addEventListener(this.onRulerSelectionChanged.bind(this));

            container.appendChild(this.rootElement);
        }
        SummaryView.prototype.showTitleTooltip = function () {
            if (this._summaryTitle.offsetWidth < this._summaryTitle.scrollWidth) {
                var config = {
                    content: this._summaryTitle.innerText
                };
                Plugin.Tooltip.show(config);
            }
        };

        SummaryView.prototype.render = function () {
            var _this = this;
            if (this._renderPromise) {
                this._renderPromise.cancel();
            }

            this._summaryTitle.innerText = Plugin.Resources.getString("SummaryTitle", Plugin.Resources.getString("MilliWattHrAbbreviation"));

            if (this._timeSpan) {
                var currentSelection = new Common.TimeSpan(Common.TimeStamp.fromNanoseconds(this._timeSpan.begin.nsec), Common.TimeStamp.fromNanoseconds(this._timeSpan.end.nsec));

                this._renderPromise = this._dataSource.GetPowerSummaryData(currentSelection, currentSelection.elapsed.nsec).then(function (data) {
                    _this._donutChartView.resetData(data, currentSelection.elapsed);
                    _this._donutChartView.render();

                    _this.resetSummaryDescription(data, currentSelection);
                }, function (errorCode) {
                    throw new Error(Plugin.Resources.getErrorString("R2LPerf.1003") + ": " + (errorCode ? errorCode.message : ""));
                });
            }
        };

        SummaryView.prototype.resetSummaryDescription = function (data, timeRange) {
            var _this = this;
            var duration = timeRange.elapsed;
            var promise;

            if (!this._batteryEnergy) {
                promise = this._dataSource.GetBatteryEnergy().then(function (energy) {
                    _this._batteryEnergy = new PowerProfiler.Energy(energy);
                });
            } else {
                promise = Plugin.Promise.wrap(null);
            }

            return promise.then(function () {
                if (data.Total && data.Total.length == 1 && data.Total[0].Power > 0) {
                    var totalEnergyConsumed = PowerProfiler.Energy.fromPower(new PowerProfiler.Power(data.Total[0].Power), duration);
                    var batteryDrainTimeInSec = (duration.sec * _this._batteryEnergy.kiloWattHr) / totalEnergyConsumed.kiloWattHr;

                    var summaryDescResourceString;
                    if (_this._sessionDuration.equals(timeRange)) {
                        summaryDescResourceString = "EnergySummaryDescriptionForSession";
                    } else {
                        summaryDescResourceString = "EnergySummaryDescriptionForSelection";
                    }

                    _this._summaryDescription.innerText = Plugin.Resources.getString(summaryDescResourceString, PowerProfiler.FormattingHelpers.getEnergyDataString(totalEnergyConsumed), Common.FormattingHelpers.getPrettyPrintTime(duration), Common.FormattingHelpers.getPrettyPrintTime(Common.TimeStamp.fromSeconds(batteryDrainTimeInSec)));
                } else {
                    if (data.Total && data.Total.length > 1) {
                        throw new Error(Plugin.Resources.getErrorString("R2LPerf.1009"));
                    }
                    _this._summaryDescription.innerText = "";
                }
            });
        };

        SummaryView.prototype.onRulerSelectionChanged = function (args) {
            if (!args.isIntermittent) {
                this._timeSpan = new Common.TimeSpan(new Common.TimeStamp(parseInt(args.position.begin.value)), new Common.TimeStamp(parseInt(args.position.end.value)));
                this.render();
            }
        };
        return SummaryView;
    })(PowerProfiler.View);
    PowerProfiler.SummaryView = SummaryView;
    ;
})(PowerProfiler || (PowerProfiler = {}));
var PowerProfiler;
(function (PowerProfiler) {
    ;

    var PowerProfilerController = (function () {
        function PowerProfilerController() {
            Common.ProfilerCodeMarker.fire(26400 /* perfR2L_PowerProfilerStarted */);

            this._powerDataSource = null;
            this._powerProfilerView = null;
        }
        PowerProfilerController.prototype.initializeDataSource = function () {
            var _this = this;
            if (!this._powerDataSource) {
                this._powerDataSource = new PowerDataModel.PowerProfilerDataSource();
                return this._powerDataSource.Init().then(function (traceInfo) {
                    _this._powerProfilerView = new PowerProfilerView(_this._powerDataSource, traceInfo);
                    _this._powerProfilerView.render();
                }, function (error) {
                    throw new Error(Plugin.Resources.getErrorString("R2LPerf.1001") + error.toString());
                });
            } else {
                return Common.PromiseHelper.getPromiseSuccess();
            }
        };
        return PowerProfilerController;
    })();
    PowerProfiler.PowerProfilerController = PowerProfilerController;
    ;

    var PowerProfilerView = (function (_super) {
        __extends(PowerProfilerView, _super);
        function PowerProfilerView(dataSource, traceInfo) {
            _super.call(this, "mainViewTemplate");
            this._dataSource = dataSource;
            this._traceInfo = traceInfo;

            this._mainContainer = new Common.Controls.Control(document.getElementById("mainContainer"));
            this._mainContainer.appendChild(this);

            this._powerTimelineView = new PowerProfiler.PowerTimelineView(this.findElement("powerTimelineViewContainer"), traceInfo, new PowerProfiler.PowerViewDataSession(dataSource));
            this._summaryView = new PowerProfiler.SummaryView(this.findElement("summaryViewContainer"), traceInfo, dataSource);
        }
        PowerProfilerView.prototype.render = function () {
            this._powerTimelineView.render();
            this._summaryView.render();
        };
        return PowerProfilerView;
    })(PowerProfiler.View);
    PowerProfiler.PowerProfilerView = PowerProfilerView;
})(PowerProfiler || (PowerProfiler = {}));

var powerProfilerController;

(function () {
    Plugin.addEventListener("pluginready", function () {
        powerProfilerController = new PowerProfiler.PowerProfilerController();
        powerProfilerController.initializeDataSource();
    });
})();
//# sourceMappingURL=PowerProfiler.js.map

// SIG // Begin signature block
// SIG // MIIaoQYJKoZIhvcNAQcCoIIakjCCGo4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFAmqCEJ5s7gQ
// SIG // AMWOKJkHALxasL9WoIIVejCCBLswggOjoAMCAQICEzMA
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
// SIG // E6P9MYIEkzCCBI8CAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBrDAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUy+k72lhDnXOZC62Lzojl
// SIG // 4CYBPbQwTAYKKwYBBAGCNwIBDDE+MDygIoAgAFAAbwB3
// SIG // AGUAcgBQAHIAbwBmAGkAbABlAHIALgBqAHOhFoAUaHR0
// SIG // cDovL21pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEBBQAE
// SIG // ggEAT+g65Zd2pgSfIA1sSEv+OM6RJHdDpmPAM932exaQ
// SIG // nK8HrAYnrl1IxGGt79U6qdREwkPlRJ6vkqnLBnsyKgp7
// SIG // 6H2ABphA4zA+0CE9/wqLpMhKeRco5cXyJDrVwIpu41Oc
// SIG // 1O+MgfJmU2osilmngjTn7BYFP0USziAoLEqJDGxKMQin
// SIG // er3Avehh+c1MiQPDcG7BKAirPzRXtd5AqXUztI6LuOID
// SIG // nAAQoeyQUN5ZJ2fC8YKXz0hxxtKOB91XvgKBZl8pfwyR
// SIG // mxMB6OE9S+mgC25UsepXUTnTqebZ4yuQslGjmLi4+O9m
// SIG // ADz+lfJo7csdtLK4pXpFQyTvnuTP8rrrw5d1gKGCAigw
// SIG // ggIkBgkqhkiG9w0BCQYxggIVMIICEQIBATCBjjB3MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSEwHwYDVQQDExhNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBQQ0ECEzMAAABZ1nPNUY7wIsUA
// SIG // AAAAAFkwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzEL
// SIG // BgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTE0MDcy
// SIG // MzA5MDc1MVowIwYJKoZIhvcNAQkEMRYEFMwnfnKBG13F
// SIG // FkMsOqbyP9rKQhrRMA0GCSqGSIb3DQEBBQUABIIBALje
// SIG // t0oJz+Zt5eyYR0CcHwmB/B2uo/rbt06DOZXv7dh2HK9p
// SIG // KCNGEPcM8kC0P2RBumPkwvZc/u7juO4QRiBXeD4EybMF
// SIG // pwOd+LWWgz1vcz1aqLwtq+ODiOw6PNnghOeL8LaMm+kf
// SIG // 6ifrqM6FLuE7RVHEhEMt8G1DuyyYzSMtMH3XrWhN4uyW
// SIG // /hJsmu9/kW1XI0uOnOrNYrKB/ErcdoV5oEuTvUtQrYUo
// SIG // uAa1cbv4ysbDRXjZLDR4S4X/ErmPr16nzV8VG8P7wXks
// SIG // gL3aXcH4laY0ijHfZWsopnbcDjkUa/xylXDUmXf8QoSI
// SIG // nUFIp84akeTEqUYmspAjdJcuumCvkZU=
// SIG // End signature block
