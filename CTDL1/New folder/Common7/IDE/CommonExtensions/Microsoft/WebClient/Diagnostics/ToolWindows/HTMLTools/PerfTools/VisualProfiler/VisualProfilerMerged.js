//
// Copyright (C) Microsoft. All rights reserved.
//
// <!-- saved from url=(0016)http://localhost -->
// VisualProfiler.templates.ts
var ControlTemplates;
(function (ControlTemplates) {
    var VisualProfiler = (function () {
        function VisualProfiler() {
        }
        VisualProfiler.toolbarButtonsPanel = "\
<div>\
  <div data-name=\"startToolbarButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:startToolbarButton,                                tooltip:F12StartButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:startProfilingEnabled\"></div>\
  <div data-name=\"stopToolbarButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:stopToolbarButton,                                tooltip:F12StopButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:stopProfilingEnabled\"></div>\
  <div data-name=\"openSessionButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:openSessionButton,                                tooltip:F12OpenSessionButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:openSessionEnabled\"></div>\
  <div data-name=\"saveSessionButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:saveSessionButton,                                tooltip:F12SaveSessionButtonTooltip; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:saveSessionEnabled\"></div>\
  <div data-name=\"zoomInButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:zoomInButton,                                tooltip:ToolbarButtonZoomIn; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:zoomInEnabled\"></div>\
  <div data-name=\"resetZoomButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:resetZoomButton,                                tooltip:ToolbarButtonResetZoom; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:resetZoomEnabled\"></div>\
  <div data-name=\"clearSelectionButton\" data-control=\"Common.Controls.Button\" data-control-templateid=\"Common.iconButton24x24\" data-options=\"className:clearSelectionButton,                                tooltip:ToolbarButtonClearSelection; converter=Common.CommonConverters.ResourceConverter\" data-binding=\"isEnabled:clearSelectionEnabled\"></div>\
</div>\
";
        VisualProfiler.filteringBarTemplate = "\
<div class=\"filteringBar\">\
  <div id=\"timelineSort\" class=\"timelineSort\">\
    <label class=\"timelineSortLabel\" for=\"timelineSortSelector\" data-options=\"textContent:TimelineSortLabel; converter=Common.CommonConverters.ResourceConverter\"></label>\
    <div id=\"timelineSortSelector\" data-control=\"Common.Controls.ComboBox\" data-binding=\"items:sortOptions,                                    selectedValue:sort; mode=twoway; converter=Common.CommonConverters.IntToStringConverter\" data-options=\"className:timelineSortSelector\"></div>\
  </div>\
  <div data-name=\"frameGroupingButton\" data-control=\"Common.Controls.ToggleButton\" data-control-templateid=\"Common.iconButton24x24\" data-binding=\"isChecked:displayFrames; mode=twoway\" data-options=\"className:frameGroupingButton,                                tabIndex:0,                                tooltip:FrameGroupingTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"filteringMenuButton\" data-control=\"Common.Controls.ToggleButton\" data-control-templateid=\"Common.labeledIconButton\" data-binding=\"isChecked:hasFilter\" data-options=\"className:labeledIconButton33x24 filteringMenuButton,                                content:FilterEvents; converter=Common.CommonConverters.ResourceConverter,                                tabIndex:0,                                toggleIsCheckedOnClick:false; converter=Common.CommonConverters.StringToBooleanConverter,                                tooltip:FilteringMenuButtonTooltipText; converter=Common.CommonConverters.ResourceConverter\"></div>\
</div>\
";
        VisualProfiler.filteringMenuDropDown = "\
<ul>\
  <div data-name=\"eventNameFilter\" data-control=\"Common.Controls.TextBoxMenuItem\" data-binding=\"content:eventNameFilter; mode=twoway\" data-options=\"className:eventNameFilter,                                placeholder:EventNameFilterPlaceholder; converter=Common.CommonConverters.ResourceConverter,                                tooltip:EventNameFilterTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <hr />\
  <div data-name=\"displayBackgroundActivities\" data-control=\"Common.Controls.CheckBoxMenuItem\" data-binding=\"isChecked:displayBackgroundActivities; mode=twoway\" data-options=\"content:FilterBackgroundActivities; converter=Common.CommonConverters.ResourceConverter,                                tooltip:BackgroundActivityFilterTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"displayNetworkActivities\" data-control=\"Common.Controls.CheckBoxMenuItem\" data-binding=\"isChecked:displayNetworkActivities; mode=twoway\" data-options=\"content:FilterNetworkActivities; converter=Common.CommonConverters.ResourceConverter,                                tooltip:NetworkTrafficFilterTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"displayUIActivities\" data-control=\"Common.Controls.CheckBoxMenuItem\" data-binding=\"isChecked:displayUIActivities; mode=twoway\" data-options=\"content:FilterUIActivities; converter=Common.CommonConverters.ResourceConverter,                                tooltip:UIActivityFilterTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <div data-name=\"displayMeasures\" data-control=\"Common.Controls.CheckBoxMenuItem\" data-binding=\"isChecked:displayMeasures; mode=twoway\" data-options=\"content:FilterMeasures; converter=Common.CommonConverters.ResourceConverter,                                tooltip:UserMeasuresFilterTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
  <hr />\
  <div data-name=\"durationFilter\" data-control=\"Common.Controls.ComboBoxMenuItem\" data-binding=\"items:durationFilterOptions,                                selectedValue:durationFilter; mode=twoway; converter=Common.CommonConverters.IntToStringConverter\" data-options=\"tooltip:DurationFilterTooltip; converter=Common.CommonConverters.ResourceConverter\"></div>\
</ul>\
";
        return VisualProfiler;
    })();
    ControlTemplates.VisualProfiler = VisualProfiler;
})(ControlTemplates || (ControlTemplates = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/VisualProfiler.templates.js.map

// GlobalRuler.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

    

    var GlobalRuler = (function () {
        function GlobalRuler(totalRange) {
            this._totalRange = totalRange;
            this._activeRange = this._selection = this._totalRange;
            this._selectionWasFinal = false;
            this._onViewSelectionChangedHandler = this.onViewSelectionChanged.bind(this);

            this._publisher = new Plugin.Utilities.EventManager();

            this._viewEventManager = DiagnosticsHub.getViewEventManager();
            this._viewEventManager.selectionChanged.addEventListener(this._onViewSelectionChangedHandler);
        }
        Object.defineProperty(GlobalRuler.prototype, "totalRange", {
            get: function () {
                return this._totalRange;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GlobalRuler.prototype, "selection", {
            get: function () {
                return this._selection;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GlobalRuler.prototype, "activeRange", {
            get: function () {
                return this._activeRange;
            },
            enumerable: true,
            configurable: true
        });

        GlobalRuler.prototype.deinitialize = function () {
            this._viewEventManager.selectionChanged.removeEventListener(this._onViewSelectionChangedHandler);
        };

        GlobalRuler.prototype.setSelection = function (newSelection, isIntermittent) {
            if (typeof isIntermittent === "undefined") { isIntermittent = false; }
            this.setSelectionInternal(newSelection, isIntermittent, false);
        };

        GlobalRuler.prototype.setActiveRange = function (newRange) {
            if (!this._activeRange.equals(newRange)) {
                this._activeRange = newRange;

                this._publisher.dispatchEvent(GlobalRuler.ActiveRangeChangedEventType);
            }
        };

        GlobalRuler.prototype.addEventListener = function (eventType, func) {
            this._publisher.addEventListener(eventType, func);
        };

        GlobalRuler.prototype.removeEventListener = function (eventType, func) {
            this._publisher.removeEventListener(eventType, func);
        };

        GlobalRuler.prototype.setSelectionInternal = function (newSelection, isIntermittent, viaHubSelection) {
            if (typeof isIntermittent === "undefined") { isIntermittent = false; }
            if (typeof viaHubSelection === "undefined") { viaHubSelection = false; }
            var selectionChanged = !this._selection.equals(newSelection);
            var selectionFinalChanged = this._selectionWasFinal !== !isIntermittent;
            this._selectionWasFinal = !isIntermittent;

            if (selectionChanged || (selectionFinalChanged && !isIntermittent)) {
                VisualProfiler.Program.traceWriter.raiseEvent(109 /* Timeline_UserSelectedTimeSlice_Start */);
                var begin = VisualProfiler.TimeStamp.fromNanoseconds(Math.max(newSelection.begin.nsec, this._activeRange.begin.nsec));
                var end = VisualProfiler.TimeStamp.fromNanoseconds(Math.min(newSelection.end.nsec, this._activeRange.end.nsec));

                this._selection = new VisualProfiler.TimeSpan(begin, end);

                if (!viaHubSelection) {
                    this._viewEventManager.selectionChanged.raiseEvent({
                        position: this._selection.toJsonTimespan(),
                        isIntermittent: isIntermittent
                    });
                }

                this._publisher.dispatchEvent(GlobalRuler.SelectionChangedEventType, {
                    data: {
                        isIntermittent: isIntermittent,
                        newSelection: newSelection
                    }
                });

                Notifications.notify(VisualProfiler.ResponsivenessNotifications.UserSelectedTimeslice);
                VisualProfiler.Program.traceWriter.raiseEvent(110 /* Timeline_UserSelectedTimeSlice_Stop */);
            }
        };

        GlobalRuler.prototype.onViewSelectionChanged = function (args) {
            var newSelection = VisualProfiler.TimeSpan.fromJsonTimespan(args.position);
            this.setSelectionInternal(newSelection, args.isIntermittent, true);
        };
        GlobalRuler.SelectionChangedEventType = "selectionChanged";
        GlobalRuler.ActiveRangeChangedEventType = "activeRangeChanged";
        return GlobalRuler;
    })();
    VisualProfiler.GlobalRuler = GlobalRuler;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/GlobalRuler.js.map

// userSettings.ts
var VisualProfiler;
(function (VisualProfiler) {
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

        Extensions.UserSettingsHelper = new UserSettingsProxy();
    })(VisualProfiler.Extensions || (VisualProfiler.Extensions = {}));
    var Extensions = VisualProfiler.Extensions;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/extensions/userSettings.js.map

// TimeSpan.ts
var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

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

        TimeStamp.fromBigNumber = function (bigNumber) {
            var l = bigNumber.jsonValue.l;
            var h = bigNumber.jsonValue.h;

            if (l < 0) {
                l = l >>> 0;
            }

            if (h < 0) {
                h = h >>> 0;
            }

            var nsec = h * 0x100000000 + l;
            return TimeStamp.fromNanoseconds(nsec);
        };

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

        TimeStamp.prototype.toBigNumber = function () {
            return DiagnosticsHub.BigNumber.convertFromNumber(this._nsec);
        };
        TimeStamp.nanoSecInMillSec = 1000 * 1000;
        TimeStamp.nanoSecInSec = 1000 * 1000 * 1000;
        return TimeStamp;
    })();
    VisualProfiler.TimeStamp = TimeStamp;

    var TimeSpan = (function () {
        function TimeSpan(begin, end) {
            if (typeof begin === "undefined") { begin = new TimeStamp(); }
            if (typeof end === "undefined") { end = new TimeStamp(); }
            this._begin = begin;
            this._end = end;

            if (this._begin.nsec > this._end.nsec) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1042"));
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

        TimeSpan.fromJsonTimespan = function (jsonTimespan) {
            var begin = TimeStamp.fromBigNumber(jsonTimespan.begin);
            var end = TimeStamp.fromBigNumber(jsonTimespan.end);
            return new TimeSpan(begin, end);
        };

        TimeSpan.prototype.equals = function (other) {
            return this.begin.equals(other.begin) && this.end.equals(other.end);
        };

        TimeSpan.prototype.toJsonTimespan = function () {
            return new DiagnosticsHub.JsonTimespan(this._begin.toBigNumber(), this._end.toBigNumber());
        };
        return TimeSpan;
    })();
    VisualProfiler.TimeSpan = TimeSpan;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/TimeSpan.js.map

// DragDirection.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    (function (DragDirection) {
        DragDirection[DragDirection["none"] = 0] = "none";
        DragDirection[DragDirection["left"] = 1] = "left";
        DragDirection[DragDirection["right"] = 2] = "right";
    })(VisualProfiler.DragDirection || (VisualProfiler.DragDirection = {}));
    var DragDirection = VisualProfiler.DragDirection;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/DragDirection.js.map

// DonutChart.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var DonutChart = (function () {
        function DonutChart(container, tooltipCallback, addSectorAriaLabelCallback, donutViewConfig) {
            this._totalValue = 0;
            this._container = container;
            this._sectBaseData = [];

            this._labelOffset = 8;
            this._pathOpacity = 1;

            this._renderTooltipCallback = tooltipCallback;
            this._addSectorAriaLabelCallback = addSectorAriaLabelCallback;

            var svgTextFontSize = Plugin.Theme.getValue("plugin-font-size");
            if (svgTextFontSize.indexOf("px") !== -1) {
                this._textFontPx = parseInt(svgTextFontSize.substring(0, svgTextFontSize.indexOf("px")));
            } else if (svgTextFontSize.indexOf("pt") !== -1) {
                this._textFontPx = Math.round(parseInt(svgTextFontSize.substring(0, svgTextFontSize.indexOf("pt"))) / 0.75);
            } else {
                this._textFontPx = 0;
            }

            this._config = donutViewConfig || { explosionFactor: 2, radius: 55, strokeWidth: 25, minDonutArcAngle: 10, containerWidth: 200, containerHeight: 200, clockwiseRotation: true };

            if (typeof this._config.containerWidth === "undefined" || typeof this._config.containerHeight === "undefined") {
                if ((container.style.width !== "" || container.getAttribute("width") !== null) && (container.style.height !== "" || container.getAttribute("height") !== null)) {
                    this._containerWidth = parseInt(container.getAttribute("width") !== null ? container.getAttribute("width") : container.style.width);
                    this._containerHeight = parseInt(container.getAttribute("height") !== null ? container.getAttribute("height") : container.style.height);
                } else {
                    this._containerWidth = 200;
                    this._containerHeight = 200;
                }
            } else {
                this._containerWidth = this._config.containerWidth;
                this._containerHeight = this._config.containerHeight;
            }

            this._centerX = this._config.containerWidth / 2;
            this._centerY = this._config.containerHeight / 2;
            this._div = this.createDivContainer();
            this._container.appendChild(this._div);
        }
        Object.defineProperty(DonutChart.prototype, "centerX", {
            get: function () {
                return this._centerX;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "centerY", {
            get: function () {
                return this._centerY;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "containerHeight", {
            get: function () {
                return this._config.containerHeight;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "containerWidth", {
            get: function () {
                return this._config.containerWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "clockwiseRotation", {
            get: function () {
                return this._config.clockwiseRotation;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "explosionFactor", {
            get: function () {
                return this._config.explosionFactor;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "radius", {
            get: function () {
                return this._config.radius;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "strokeWidth", {
            get: function () {
                return this._config.strokeWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChart.prototype, "sectors", {
            get: function () {
                return this._sectBaseData;
            },
            enumerable: true,
            configurable: true
        });

        DonutChart.prototype.addSector = function (sectorInfo) {
            this.addSectorToBaseSeries(sectorInfo);
        };

        DonutChart.prototype.addSectors = function (sectors) {
            for (var i = 0; i < sectors.length; i++) {
                this.addSector(sectors[i]);
            }
        };

        DonutChart.prototype.removeSector = function (sectorInfo) {
            var index = this.getSectorIndex(sectorInfo);
            if (index === -1) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1061"));
            } else {
                this._totalValue -= sectorInfo.value;
                this._sectBaseData.splice(index, 1);
            }
        };

        DonutChart.prototype.removeSectors = function (sectors) {
            for (var i = 0; i < sectors.length; i++) {
                this.removeSector(sectors[i]);
            }
        };

        DonutChart.prototype.render = function () {
            var donutSectorInfo = this.buildChartData(this._sectBaseData);
            var donutSectorPoints = this.calculatePoints(donutSectorInfo);
            this.draw(donutSectorPoints);
        };

        DonutChart.prototype.resetDonutChart = function () {
            this._totalValue = 0;
            this._sectBaseData = [];
            this._container.removeChild(this._svg);
            this._svg = this.createSVG();
            this._container.appendChild(this._svg);
        };

        DonutChart.prototype.addSectorToBaseSeries = function (sector) {
            this._totalValue += sector.value;
            this._sectBaseData.push(sector);
        };

        DonutChart.prototype.buildChartData = function (sectBaseData) {
            var sectDonutData = [];
            if (sectBaseData.length === 1) {
                sectDonutData.push({
                    startAngle: 0, endAngle: 360, percentValue: 100,
                    info: { name: sectBaseData[0].name, cssClass: sectBaseData[0].cssClass, value: sectBaseData[0].value }
                });
            } else {
                var currAngle = 0;
                var currValue = 0;
                var i = 0;
                var angleReductionFactor = this.getReductionFactor(sectBaseData);
                for (i = 0; i < sectBaseData.length - 1; i++) {
                    currValue = sectBaseData[i].value;
                    var arcAngle = Math.round(360 * currValue / this._totalValue);
                    var percentValue = parseFloat((100 * currValue / this._totalValue).toFixed(2));
                    arcAngle = (arcAngle < this._config.minDonutArcAngle) ? this._config.minDonutArcAngle : Math.round(angleReductionFactor * arcAngle);
                    sectDonutData.push({
                        startAngle: currAngle, endAngle: currAngle + arcAngle - this._config.explosionFactor, percentValue: percentValue,
                        info: { name: sectBaseData[i].name, cssClass: sectBaseData[i].cssClass, value: sectBaseData[i].value }
                    });
                    currAngle += arcAngle;
                    if (currAngle >= 360) {
                        break;
                    }
                }

                if (i === sectBaseData.length - 1 && currAngle < 360) {
                    currValue = sectBaseData[i].value;
                    var arcAngle = 360 - currAngle;
                    var percentValue = parseFloat((100 * currValue / this._totalValue).toFixed(2));
                    sectDonutData.push({
                        startAngle: currAngle, endAngle: currAngle + arcAngle - this._config.explosionFactor, percentValue: percentValue,
                        info: { name: sectBaseData[i].name, cssClass: sectBaseData[i].cssClass, value: sectBaseData[i].value }
                    });
                    currAngle += arcAngle;
                }
            }

            return sectDonutData;
        };

        DonutChart.prototype.calculatePoints = function (sectDonutData) {
            var radius = this._config.radius;
            var labelRadius = this._config.radius + (this._config.strokeWidth / 2) + this._labelOffset;
            var sectDonutPoints = [];
            var anchor;
            for (var i = 0; i < sectDonutData.length; i++) {
                var sAngle = sectDonutData[i].startAngle;
                var eAngle = sectDonutData[i].endAngle;
                var midAngle = (sectDonutData.length === 1) ? 0 : (sAngle + eAngle) / 2;
                var sx = radius * Math.sin(sAngle * Math.PI / 180);
                var sy = radius * Math.cos(sAngle * Math.PI / 180) * -1;
                var ex = radius * Math.sin(eAngle * Math.PI / 180);
                var ey = radius * Math.cos(eAngle * Math.PI / 180) * -1;
                if (midAngle < 180 && midAngle > 0) {
                    labelRadius = (sectDonutData[i].percentValue > 9) ? labelRadius + (this._textFontPx / 2) : labelRadius;
                    anchor = "start";
                } else if (midAngle > 180) {
                    anchor = "end";
                } else {
                    anchor = "middle";
                }

                var tx = labelRadius * Math.sin(midAngle * Math.PI / 180);
                var ty = labelRadius * Math.cos(midAngle * Math.PI / 180) * -1;
                var largeArcFlag = (eAngle - sAngle) > 180 ? 1 : 0;
                var sweepFlag = (this._config.clockwiseRotation) ? 1 : 0;
                sectDonutPoints.push({ startPoint: { x: sx, y: sy }, endPoint: { x: ex, y: ey }, label: { point: { x: tx, y: ty }, anchor: anchor }, percentValue: sectDonutData[i].percentValue, largeArc: largeArcFlag, sweepFlag: sweepFlag, info: sectDonutData[i].info });
            }

            return sectDonutPoints;
        };

        DonutChart.prototype.createDivContainer = function () {
            var div = document.createElement("div");
            div.style.width = "100%";
            div.style.height = "100%";
            return div;
        };

        DonutChart.prototype.createSVG = function () {
            var svg = document.createElementNS(DonutChart.SvgNS, "svg");
            svg.setAttribute("version", "1.1");
            svg.setAttribute("width", this._config.containerWidth + "px");
            svg.setAttribute("height", this._config.containerHeight + "px");
            svg.setAttribute("focusable", "false");
            return svg;
        };

        DonutChart.prototype.createSVGPath = function (cssClass, dAttribute, strokeWidth, sectorDonutPoint) {
            var _this = this;
            var path = document.createElementNS(DonutChart.SvgNS, "path");
            path.setAttribute("class", cssClass);
            path.setAttribute("d", dAttribute);
            path.setAttribute("stroke-width", strokeWidth.toString());
            if (this._renderTooltipCallback) {
                path.onmouseover = function () {
                    return _this.showToolTip(sectorDonutPoint.info, sectorDonutPoint.percentValue);
                };
                path.onmouseout = function (mouseEvent) {
                    return Plugin.Tooltip.dismiss();
                };
            }

            if (this._addSectorAriaLabelCallback) {
                this._addSectorAriaLabelCallback(sectorDonutPoint.info, sectorDonutPoint.percentValue);
            }

            return path;
        };

        DonutChart.prototype.createSVGText = function (xPosition, yPosition, anchor, percentValue) {
            var text = document.createElementNS(DonutChart.SvgNS, "text");
            text.setAttribute("x", xPosition.toString());
            text.setAttribute("y", yPosition.toString());
            text.setAttribute("text-anchor", anchor);
            text.setAttribute("class", "BPT-donutChartText");
            text.textContent = Plugin.Resources.getString("InclusiveTimeSVGLabelString", Math.floor(percentValue));
            return text;
        };

        DonutChart.prototype.draw = function (sectDonutPoints) {
            if (typeof this._svg !== "undefined") {
                this._div.removeChild(this._svg);
            }

            this._svg = this.createSVG();

            if (sectDonutPoints.length === 1) {
                var i = 0;
                var dPath = "M " + this._centerX + "," + this._centerY + " M " + (this._centerX + sectDonutPoints[i].startPoint.x) + ", " + (this._centerY + sectDonutPoints[i].startPoint.y) + " A " + this._config.radius + "," + this._config.radius + " 1 " + sectDonutPoints[i].largeArc + ", " + sectDonutPoints[i].sweepFlag + " " + (this._centerX + sectDonutPoints[i].startPoint.x) + "," + (this._centerY + sectDonutPoints[i].startPoint.y + this._config.radius * 2) + " A " + this._config.radius + "," + this._config.radius + " 1 " + sectDonutPoints[i].largeArc + ", " + sectDonutPoints[i].sweepFlag + " " + (this._centerX + sectDonutPoints[i].endPoint.x) + "," + (this._centerY + sectDonutPoints[i].endPoint.y);
                var arc = this.createSVGPath(sectDonutPoints[i].info.cssClass, dPath, this._config.strokeWidth, sectDonutPoints[i]);
                this._svg.appendChild(arc);
                var text = this.createSVGText(this._centerX + sectDonutPoints[i].label.point.x, this._centerY + sectDonutPoints[i].label.point.y, sectDonutPoints[i].label.anchor, sectDonutPoints[i].percentValue);
                this._svg.appendChild(text);
            } else if (sectDonutPoints.length > 1) {
                for (var i = 0; i < sectDonutPoints.length; i++) {
                    var dPath = "M " + this._centerX + "," + this._centerY + " M " + (this._centerX + sectDonutPoints[i].startPoint.x) + ", " + (this._centerY + sectDonutPoints[i].startPoint.y) + " A " + this._config.radius + "," + this._config.radius + " 1 " + sectDonutPoints[i].largeArc + ", " + sectDonutPoints[i].sweepFlag + " " + (this._centerX + sectDonutPoints[i].endPoint.x) + "," + (this._centerY + sectDonutPoints[i].endPoint.y);
                    var arc = this.createSVGPath(sectDonutPoints[i].info.cssClass, dPath, this._config.strokeWidth, sectDonutPoints[i]);
                    this._svg.appendChild(arc);
                    if (sectDonutPoints[i].percentValue > Math.round(this._config.minDonutArcAngle * 100 / 360)) {
                        var text = this.createSVGText(this._centerX + sectDonutPoints[i].label.point.x, this._centerY + sectDonutPoints[i].label.point.y, sectDonutPoints[i].label.anchor, sectDonutPoints[i].percentValue);
                        this._svg.appendChild(text);
                    }
                }
            }

            this._div.appendChild(this._svg);
        };

        DonutChart.prototype.getReductionFactor = function (sectBaseData) {
            var currAngle = 0;
            var i = 0;
            var angleDifference = 0;
            for (i = 0; i < sectBaseData.length; i++) {
                currAngle = Math.round(360 * sectBaseData[i].value / this._totalValue);
                angleDifference += (currAngle < this._config.minDonutArcAngle) ? this._config.minDonutArcAngle - currAngle : 0;
            }

            return (1 - angleDifference / 360);
        };

        DonutChart.prototype.getResizedRadius = function (dimension) {
            return dimension / DonutChart.RadiusResizeFactor;
        };

        DonutChart.prototype.getResizedWidth = function (dimension) {
            return dimension / DonutChart.WidthResizeFactor;
        };

        DonutChart.prototype.getSectorIndex = function (sector) {
            for (var i = 0; i < this._sectBaseData.length; i++) {
                if (this._sectBaseData[i] === sector || (this._sectBaseData[i].name === sector.name && this._sectBaseData[i].cssClass === sector.cssClass && this._sectBaseData[i].value === sector.value)) {
                    return i;
                }
            }

            return -1;
        };

        DonutChart.prototype.resizeDimensions = function () {
            var smallDimension = (this._config.containerHeight > this._config.containerWidth) ? this._config.containerWidth : this._config.containerHeight;
            this._config.radius = this.getResizedRadius(smallDimension);
            this._config.strokeWidth = this.getResizedWidth(this._config.radius);
        };

        DonutChart.prototype.showToolTip = function (sector, percentValue) {
            var toolTipContent = this._renderTooltipCallback(sector, percentValue);
            if (toolTipContent !== "" && toolTipContent !== null && typeof toolTipContent !== "undefined") {
                var config = {
                    content: toolTipContent
                };
                Plugin.Tooltip.show(config);
            }
        };
        DonutChart.SvgNS = "http://www.w3.org/2000/svg";
        DonutChart.RadiusResizeFactor = 4;
        DonutChart.WidthResizeFactor = 2.5;
        return DonutChart;
    })();
    VisualProfiler.DonutChart = DonutChart;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/controls/DonutChart.js.map

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

// FormattingHelpers.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var FormattingHelpers = (function () {
        function FormattingHelpers() {
        }
        FormattingHelpers.convertFormatString = function (originalFormat) {
            var newFormat = originalFormat;

            var i = 0;
            while (true) {
                var placeholder = "{" + i + "}";

                if (newFormat.indexOf(placeholder) === -1) {
                    break;
                }

                while (newFormat.indexOf(placeholder) >= 0) {
                    newFormat = newFormat.replace(placeholder, "%s");
                }

                i++;
            }

            return newFormat;
        };

        FormattingHelpers.getPrettyPrintTime = function (time) {
            var value;
            var unitAbbreviation;

            if (time.nsec === 0) {
                value = 0;
                unitAbbreviation = Plugin.Resources.getString("SecondsAbbreviation");
            } else if (time.nsec < (1000 * 1000)) {
                value = parseFloat(time.msec.toPrecision(2));
                unitAbbreviation = Plugin.Resources.getString("MillisecondsAbbreviation");
            } else if (time.nsec < (1000 * 1000 * 1000)) {
                value = time.msec;
                value = Math.floor(value * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("MillisecondsAbbreviation");
            } else {
                value = time.sec;
                value = Math.floor(value * 100) / 100;
                unitAbbreviation = Plugin.Resources.getString("SecondsAbbreviation");
            }

            return Common.FormattingHelpers.getDecimalLocaleString(value, true) + " " + unitAbbreviation;
        };
        return FormattingHelpers;
    })();
    VisualProfiler.FormattingHelpers = FormattingHelpers;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/FormattingHelpers.js.map

// RulerView.f12.ts
var VisualProfiler;
(function (VisualProfiler) {
    (function (F12) {
        "use strict";

        var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

        

        var RulerViewModel = (function () {
            function RulerViewModel(globalRuler, markEventModel) {
                this.leftPadding = 40;
                this.rightPadding = 40;
                this._globalRuler = globalRuler;
                this._markEventModel = markEventModel;
            }
            Object.defineProperty(RulerViewModel.prototype, "globalRuler", {
                get: function () {
                    return this._globalRuler;
                },
                enumerable: true,
                configurable: true
            });

            RulerViewModel.prototype.getMarks = function (category) {
                return this._markEventModel.getMarkEvents(this._globalRuler.totalRange, category);
            };

            RulerViewModel.prototype.getMarkTooltip = function (mark) {
                return this._markEventModel.getMarkTooltip(mark);
            };

            RulerViewModel.prototype.setSelectionRange = function (newSelection, isIntermittent) {
                if (typeof isIntermittent === "undefined") { isIntermittent = false; }
                this._globalRuler.setSelection(newSelection, isIntermittent);
            };

            RulerViewModel.prototype.setActiveRange = function (newRange) {
                this._globalRuler.setActiveRange(newRange);
            };
            return RulerViewModel;
        })();
        F12.RulerViewModel = RulerViewModel;

        var RulerView = (function () {
            function RulerView(containerId) {
                this._parentContainer = document.getElementById(containerId);
                if (!this._parentContainer) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1034"));
                }
            }
            Object.defineProperty(RulerView.prototype, "minSelectionWidthInPixels", {
                set: function (value) {
                    this._minSelectionWidthInPixels = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RulerView.prototype, "viewModel", {
                set: function (model) {
                    this.unregisterViewModelEvents();
                    this._viewModel = model;
                    this.registerViewModelEvents();
                },
                enumerable: true,
                configurable: true
            });

            RulerView.prototype.focus = function () {
                this._focusRequested = false;
                if (this._rulerControl) {
                    this._rulerControl.focus();
                } else {
                    this._focusRequested = true;
                }
            };

            RulerView.prototype.render = function () {
                var _this = this;
                if (this._gettingMarksPromise) {
                    this._gettingMarksPromise.cancel();
                    this._gettingMarksPromise = null;
                }

                this._parentContainer.innerHTML = "";

                if (this._rulerControl) {
                    this._rulerControl.deinitialize();
                }

                var rulerConfig = new DiagnosticsHub.RulerConfig(this._parentContainer.id);
                rulerConfig.doubleSlider.timeRange = this._viewModel.globalRuler.totalRange.toJsonTimespan();
                rulerConfig.doubleSlider.bar.left = this._viewModel.leftPadding;
                rulerConfig.doubleSlider.bar.right = this._viewModel.rightPadding;

                if (this._minSelectionWidthInPixels) {
                    rulerConfig.doubleSlider.minimumRangeInPixel = this._minSelectionWidthInPixels;
                }

                var lifecycleData = [];
                var userMarkData = [];

                var lifecycleMarksPromise = this._viewModel.getMarks(0).then(function (lifecycleMarks) {
                    lifecycleData = lifecycleMarks;
                });

                var userMarksPromise = this._viewModel.getMarks(1).then(function (userMarks) {
                    userMarkData = userMarks;
                });

                this._gettingMarksPromise = Plugin.Promise.join([lifecycleMarksPromise, userMarksPromise]).then(function () {
                    rulerConfig.doubleSlider.markSeries = [
                        { id: DiagnosticsHub.MarkType.UserMark, label: Plugin.Resources.getString("RulerUserMarkLabel"), tooltip: Plugin.Resources.getString("UserMarkTooltip"), data: userMarkData },
                        { id: DiagnosticsHub.MarkType.LifeCycleEvent, label: Plugin.Resources.getString("RulerLifecycleMarkLabel"), tooltip: Plugin.Resources.getString("LifecycleMarkTooltip"), data: lifecycleData }
                    ];

                    _this._rulerControl = new DiagnosticsHub.Ruler(rulerConfig);
                    _this._rulerControl.render();

                    if (_this._focusRequested) {
                        _this.focus();
                    }
                });

                this._gettingMarksPromise.done(function () {
                    _this._gettingMarksPromise = null;
                });
            };

            RulerView.prototype.unregisterViewModelEvents = function () {
                if (this._viewModel) {
                    this._viewModel.globalRuler.removeEventListener(VisualProfiler.GlobalRuler.SelectionChangedEventType, this.onGlobalRulerSelectionChanged.bind(this));
                    this._viewModel.globalRuler.removeEventListener(VisualProfiler.GlobalRuler.ActiveRangeChangedEventType, this.onGlobalRulerActiveRangeChange.bind(this));
                }
            };

            RulerView.prototype.registerViewModelEvents = function () {
                if (this._viewModel) {
                    this._viewModel.globalRuler.addEventListener(VisualProfiler.GlobalRuler.SelectionChangedEventType, this.onGlobalRulerSelectionChanged.bind(this));
                    this._viewModel.globalRuler.addEventListener(VisualProfiler.GlobalRuler.ActiveRangeChangedEventType, this.onGlobalRulerActiveRangeChange.bind(this));
                }
            };

            RulerView.prototype.adjustSelection = function (selection, isIntermittent) {
                if (typeof isIntermittent === "undefined") { isIntermittent = false; }
                if (this._viewModel) {
                    this._viewModel.setSelectionRange(selection, isIntermittent);
                }
            };

            RulerView.prototype.onGlobalRulerActiveRangeChange = function (args) {
                if (this._viewModel && this._rulerControl) {
                    this._rulerControl.zoom(this._viewModel.globalRuler.activeRange.toJsonTimespan(), this._viewModel.globalRuler.activeRange.toJsonTimespan());
                    this._rulerControl.setHandlePosition(this._viewModel.globalRuler.selection.toJsonTimespan());
                }
            };

            RulerView.prototype.onGlobalRulerSelectionChanged = function (args) {
                if (this._viewModel && this._rulerControl) {
                    this._rulerControl.setHandlePosition(this._viewModel.globalRuler.selection.toJsonTimespan());
                }
            };
            return RulerView;
        })();
        F12.RulerView = RulerView;
    })(VisualProfiler.F12 || (VisualProfiler.F12 = {}));
    var F12 = VisualProfiler.F12;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/RulerView.f12.js.map

// Divider.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var Divider = (function (_super) {
        __extends(Divider, _super);
        function Divider(container, initialOffsetX) {
            _super.call(this, "dividerTemplate");
            this._callbacks = [];

            this._container = container;

            this._backdrop = this.findElement("dividerBackdrop");
            this._divider = this.findElement("divider");

            this._divider.addEventListener("mousedown", this.onMouseDown.bind(this), true);

            this._container.appendChild(this._backdrop);
            this._container.appendChild(this._divider);

            this._minX = 0;
            this.offsetX = initialOffsetX;
            this._onMouseMoveHandler = this.onMouseMove.bind(this);
            this._onMouseUpHandler = this.onMouseUp.bind(this);
        }
        Object.defineProperty(Divider.prototype, "height", {
            set: function (value) {
                this._divider.style.height = value + "px";
                this._backdrop.style.height = value + "px";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Divider.prototype, "offsetX", {
            get: function () {
                if (this._divider.style.left) {
                    var leftValue = parseInt(this._divider.style.left);
                    if (!isNaN(leftValue)) {
                        return leftValue;
                    }
                }

                return this._divider.offsetLeft;
            },
            set: function (value) {
                var xPos = value;

                if (xPos < this._minX) {
                    xPos = this._minX;
                } else if (xPos > this._maxX) {
                    xPos = this._maxX;
                }

                this._divider.style.left = xPos + "px";
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Divider.prototype, "minX", {
            get: function () {
                return this._minX;
            },
            set: function (value) {
                this._minX = value;

                if (this.offsetX < this._minX) {
                    this.offsetX = this._minX;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Divider.prototype, "maxX", {
            get: function () {
                return this._maxX;
            },
            set: function (value) {
                this._maxX = value;

                if (this.offsetX > this._maxX) {
                    this.offsetX = this._maxX;
                }
            },
            enumerable: true,
            configurable: true
        });


        Divider.prototype.onMouseDown = function (e) {
            this._backdrop.style.zIndex = "1000";
            this._backdrop.appendChild(this._divider);
            this._backdrop.setCapture();

            this._backdrop.addEventListener("mousemove", this._onMouseMoveHandler, true);
            this._backdrop.addEventListener("mouseup", this._onMouseUpHandler, true);
        };

        Divider.prototype.onMouseMove = function (e) {
            if (this.updateOffsetX(e.offsetX)) {
                if (this.onMoved) {
                    this.onMoved(this._divider.offsetLeft);
                }
            }

            e.stopImmediatePropagation();
            e.preventDefault();
        };

        Divider.prototype.onMouseUp = function (e) {
            if (this._container.firstChild) {
                this._container.insertBefore(this._divider, this._container.firstChild);
            } else {
                this._container.appendChild(this._divider);
            }

            this._backdrop.releaseCapture();
            this._backdrop.style.zIndex = "-1";

            this._backdrop.removeEventListener("mousemove", this._onMouseMoveHandler, true);
            this._backdrop.removeEventListener("mouseup", this._onMouseUpHandler, true);

            if (this.updateOffsetX(e.offsetX)) {
                if (this.onMoved) {
                    this.onMoved(this._divider.offsetLeft);
                }
            }
        };

        Divider.prototype.updateOffsetX = function (x) {
            var isOutsideDivider = x < this._divider.offsetLeft || x > (this._divider.offsetLeft + this._divider.offsetWidth);
            if (isOutsideDivider) {
                this.offsetX = x;
                return true;
            }

            return false;
        };
        return Divider;
    })(Common.Controls.Legacy.TemplateControl);
    VisualProfiler.Divider = Divider;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/controls/Divider.js.map

// SwimlanesView.f12.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualProfiler;
(function (VisualProfiler) {
    (function (F12) {
        "use strict";

        var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

        

        var SwimlanesViewModel = (function () {
            function SwimlanesViewModel(globalRuler, markEventModel, session, leftPadding, rightPadding, toolbarViewModel) {
                this._globalRuler = globalRuler;
                this._graphConfigs = [];
                this._session = session;
                this.leftPadding = leftPadding;
                this.rightPadding = rightPadding;
                this.toolbarViewModel = toolbarViewModel;

                this._graphRulerViewModel = new F12.RulerViewModel(globalRuler, markEventModel);
                this._graphRulerViewModel.leftPadding = leftPadding;
                this._graphRulerViewModel.rightPadding = rightPadding;
            }
            Object.defineProperty(SwimlanesViewModel.prototype, "globalRuler", {
                get: function () {
                    return this._globalRuler;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SwimlanesViewModel.prototype, "graphConfigs", {
                get: function () {
                    return this._graphConfigs;
                },
                set: function (configs) {
                    this._graphConfigs = configs;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(SwimlanesViewModel.prototype, "graphRulerViewModel", {
                get: function () {
                    return this._graphRulerViewModel;
                },
                enumerable: true,
                configurable: true
            });

            SwimlanesViewModel.prototype.getSwimlaneConfigurationFromManagedConfig = function (config) {
                var swimlaneConfig = new DiagnosticsHub.SwimLaneConfiguration();

                if (config.JavaScriptClassName) {
                    swimlaneConfig.body.graph.registeredClass = DiagnosticsHub.RegisterNamespace.getRegisteredGraph(config.JavaScriptClassName);
                } else {
                    swimlaneConfig.body.graph.registeredClass = DiagnosticsHub.RegisterNamespace.getRegisteredGraph("Microsoft.VisualStudio.DiagnosticsHub.MultiLineGraph");
                }

                swimlaneConfig.body.graph.jsonConfig = config.JsonObject;
                swimlaneConfig.body.graph.jsonConfig.GraphBehaviour = DiagnosticsHub.GraphBehaviourType.PostMortem;
                swimlaneConfig.body.graph.resources = config.Resources;
                swimlaneConfig.body.graph.description = config.Description;
                swimlaneConfig.body.graph.height = config.JsonObject.Height;
                config.JsonObject.RefreshDataOnResizeAndZoom = config.JsonObject.RefreshDataOnResizeAndZoom || false;

                swimlaneConfig.body.leftScale.isVisible = true;
                swimlaneConfig.body.leftScale.width = this.leftPadding;
                swimlaneConfig.body.leftScale.minimum = config.JsonObject.MinValue;
                swimlaneConfig.body.leftScale.maximum = config.JsonObject.MaxValue;

                swimlaneConfig.body.rightScale.isVisible = true;
                swimlaneConfig.body.rightScale.width = this.rightPadding;
                swimlaneConfig.body.rightScale.minimum = config.JsonObject.MinValue;
                swimlaneConfig.body.rightScale.maximum = config.JsonObject.MaxValue;

                swimlaneConfig.timeRange = this.globalRuler.activeRange.toJsonTimespan();

                swimlaneConfig.header.title.titleText = config.Title;
                swimlaneConfig.header.legend.data = [];

                swimlaneConfig.header.title.isGraphCollapsible = true;

                swimlaneConfig.getVerticalRulerLinePositions = DiagnosticsHub.RulerUtilities.getVerticalLinePositions;

                swimlaneConfig.isSelectionEnabled = true;
                swimlaneConfig.isZoomEnabled = true;

                return swimlaneConfig;
            };
            return SwimlanesViewModel;
        })();
        F12.SwimlanesViewModel = SwimlanesViewModel;

        

        var SwimlanesView = (function (_super) {
            __extends(SwimlanesView, _super);
            function SwimlanesView(containerId) {
                _super.call(this, "swimLanesView");

                var parentContainer = document.getElementById(containerId);
                if (!containerId) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1034"));
                }

                parentContainer.appendChild(this.rootElement);

                this._swimlanes = [];
                this._swimlanesContainer = this.findElement("swimlanesContainer");

                this._graphRulerView = new F12.RulerView(this.findElement("graphRulerView").id);

                this._onGlobalRulerActiveRangeChange = this.onGlobalRulerActiveRangeChange.bind(this);
                this._onGlobalRulerSelectionChanged = this.onGlobalRulerSelectionChanged.bind(this);
                this._triggerResize = function () {
                    return VisualProfiler.Program.triggerResize();
                };
            }
            Object.defineProperty(SwimlanesView.prototype, "viewModel", {
                get: function () {
                    return this._viewModel;
                },
                set: function (value) {
                    this.unregisterViewModelEvents();
                    this.removeSwimlanes();

                    this._viewModel = value;

                    if (this._viewModel) {
                        this._graphRulerView.minSelectionWidthInPixels = this._viewModel.minSelectionWidthInPixel;
                        this._graphRulerView.viewModel = this._viewModel.graphRulerViewModel;

                        this.setupSwimlanes();
                    }

                    this.registerViewModelEvents();
                },
                enumerable: true,
                configurable: true
            });


            SwimlanesView.prototype.focusOnRuler = function () {
                this._graphRulerView.focus();
            };

            SwimlanesView.prototype.render = function () {
                this._graphRulerView.render();

                this._swimlanes.forEach(function (swimlane) {
                    swimlane.render();
                });
            };

            SwimlanesView.prototype.getNewSwimlaneContainer = function () {
                var swimlaneContainer = document.createElement("div");
                swimlaneContainer.id = SwimlanesView.SWIMLANE_CONTAINER_ID_PREFIX + this._swimlanesContainer.childElementCount.toString();
                this._swimlanesContainer.appendChild(swimlaneContainer);
                return swimlaneContainer;
            };

            SwimlanesView.prototype.getToolbarViewModel = function () {
                return this._viewModel && this._viewModel.toolbarViewModel;
            };

            SwimlanesView.prototype.registerViewModelEvents = function () {
                if (this._viewModel) {
                    this._viewModel.globalRuler.addEventListener(VisualProfiler.GlobalRuler.SelectionChangedEventType, this._onGlobalRulerSelectionChanged);
                    this._viewModel.globalRuler.addEventListener(VisualProfiler.GlobalRuler.ActiveRangeChangedEventType, this._onGlobalRulerActiveRangeChange);
                }
            };

            SwimlanesView.prototype.unregisterViewModelEvents = function () {
                if (this._viewModel) {
                    this._viewModel.globalRuler.removeEventListener(VisualProfiler.GlobalRuler.SelectionChangedEventType, this._onGlobalRulerSelectionChanged);
                    this._viewModel.globalRuler.removeEventListener(VisualProfiler.GlobalRuler.ActiveRangeChangedEventType, this._onGlobalRulerActiveRangeChange);
                }
            };

            SwimlanesView.prototype.removeSwimlanes = function () {
                while (this._swimlanes.length > 0) {
                    var swimlane = this._swimlanes.pop();
                    swimlane.removeEventListener(DiagnosticsHub.SwimlaneEvents.Visibility, this._triggerResize);
                    swimlane.deinitialize();
                }

                this._swimlanesContainer.innerHTML = "";
            };

            SwimlanesView.prototype.setupSwimlanes = function () {
                if (this._viewModel.graphConfigs) {
                    for (var i = 0; i < this._viewModel.graphConfigs.length; i++) {
                        var graphManagedConfig = this._viewModel.graphConfigs[i];

                        var swimlaneContainer = this.getNewSwimlaneContainer();
                        this.setupSelectionContextMenu(swimlaneContainer);

                        var swimlaneConfiguration = this._viewModel.getSwimlaneConfigurationFromManagedConfig(graphManagedConfig);
                        swimlaneConfiguration.minSelectionWidthInPixels = this._viewModel.minSelectionWidthInPixel;
                        swimlaneConfiguration.containerId = swimlaneContainer.id;

                        var swimlane = new DiagnosticsHub.SwimLane(swimlaneConfiguration);
                        swimlane.addEventListener(DiagnosticsHub.SwimlaneEvents.Visibility, this._triggerResize);

                        this._swimlanes.push(swimlane);
                    }
                }
            };

            SwimlanesView.prototype.setupSelectionContextMenu = function () {
                var _this = this;
                var elements = [];
                for (var _i = 0; _i < (arguments.length - 0); _i++) {
                    elements[_i] = arguments[_i + 0];
                }
                var iconNames = this.getSelectionContextMenuIconNames();

                var zoomInMenuItem = {
                    callback: function () {
                        if (_this.getToolbarViewModel()) {
                            _this.getToolbarViewModel().zoomIn();
                        }
                    },
                    disabled: function () {
                        return _this.getToolbarViewModel() ? !_this.getToolbarViewModel().zoomInEnabled : true;
                    },
                    iconEnabled: iconNames.zoomin.enabled,
                    iconDisabled: iconNames.zoomin.disabled,
                    label: Plugin.Resources.getString("ToolbarButtonZoomIn"),
                    type: 1 /* command */
                };

                var resetZoomMenuItem = {
                    callback: function () {
                        if (_this.getToolbarViewModel()) {
                            _this.getToolbarViewModel().resetZoom();
                        }
                    },
                    disabled: function () {
                        return _this.getToolbarViewModel() ? !_this.getToolbarViewModel().resetZoomEnabled : true;
                    },
                    iconEnabled: iconNames.resetZoom.enabled,
                    iconDisabled: iconNames.resetZoom.disabled,
                    label: Plugin.Resources.getString("ToolbarButtonResetZoom"),
                    type: 1 /* command */
                };

                var clearSelectionMenuItem = {
                    callback: function () {
                        if (_this.getToolbarViewModel()) {
                            _this.getToolbarViewModel().clearSelection();
                        }
                    },
                    disabled: function () {
                        return _this.getToolbarViewModel() ? !_this.getToolbarViewModel().clearSelectionEnabled : true;
                    },
                    iconEnabled: iconNames.clearSelection.enabled,
                    iconDisabled: iconNames.clearSelection.disabled,
                    label: Plugin.Resources.getString("ToolbarButtonClearSelection"),
                    type: 1 /* command */
                };

                this._selectionActionContextMenu = Plugin.ContextMenu.create([zoomInMenuItem, resetZoomMenuItem, clearSelectionMenuItem]);

                for (var index = 0; index < elements.length; index++) {
                    this._selectionActionContextMenu.attach(elements[index]);
                }
            };

            SwimlanesView.prototype.getSelectionContextMenuIconNames = function () {
                return {
                    zoomin: {
                        enabled: "f12-image-contextmenu-chartzoom-in",
                        disabled: "f12-image-contextmenu-chartzoom-in-disabled"
                    },
                    resetZoom: {
                        enabled: "f12-image-contextmenu-chartzoom-reset",
                        disabled: "f12-image-contextmenu-chartzoom-reset-disabled"
                    },
                    clearSelection: {
                        enabled: "f12-image-contextmenu-chartselection-clear",
                        disabled: "f12-image-contextmenu-chartselection-clear-disabled"
                    }
                };
            };

            SwimlanesView.prototype.onGlobalRulerActiveRangeChange = function (args) {
                var _this = this;
                if (this._viewModel) {
                    this._swimlanes.forEach(function (swimlane) {
                        swimlane.updateTimeRange(_this._viewModel.globalRuler.activeRange.toJsonTimespan());
                        swimlane.setSelection(_this._viewModel.globalRuler.selection.toJsonTimespan());
                    });
                }
            };

            SwimlanesView.prototype.onGlobalRulerSelectionChanged = function (args) {
                var _this = this;
                if (this._viewModel) {
                    this._swimlanes.forEach(function (swimlane) {
                        swimlane.setSelection(_this._viewModel.globalRuler.selection.toJsonTimespan());
                    });
                }
            };
            SwimlanesView.SWIMLANE_CONTAINER_ID_PREFIX = "swimlaneContainer_";
            return SwimlanesView;
        })(Common.Controls.Legacy.TemplateControl);
        F12.SwimlanesView = SwimlanesView;
    })(VisualProfiler.F12 || (VisualProfiler.F12 = {}));
    var F12 = VisualProfiler.F12;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/SwimlanesView.f12.js.map

// SwimlaneConfigurations.f12.ts
var VisualProfiler;
(function (VisualProfiler) {
    (function (F12) {
        "use strict";

        var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

        var SwimlaneConfigurations = (function () {
            function SwimlaneConfigurations() {
                this.configurations = [
                    SwimlaneConfigurations.getCpuUsageConfiguration(),
                    SwimlaneConfigurations.getVisualThroughputConfiguration()
                ];
            }
            SwimlaneConfigurations.getCpuUsageConfiguration = function () {
                var graphJsonConfigString = "\
               {\
                 \"View\": \"Graph\",\
                 \"GraphBehaviour\": 2,\
                 \"Series\": [{\
                     \"Legend\": \"Loading_Category\",\
                     \"LegendTooltip\": \"LoadingLegendTooltip\",\
                     \"Category\": \"Loading_Category\",\
                     \"Color\": \"#0072c6\",\
                     \"CssClass\": \"dataLoading\",\
                     \"DataSource\": {\
                         \"CounterId\": \"CPUUsage\",\
                         \"AnalyzerId\": \"3A649979-5A30-4542-A12F-1E0C09858804\"\
                     }\
                 }, {\
                     \"Legend\": \"Scripting_Category\",\
                     \"LegendTooltip\": \"ScriptingLegendTooltip\",\
                     \"Category\": \"Scripting_Category\",\
                     \"Color\": \"#dd5900\",\
                     \"CssClass\": \"dataScripting\"\
                 }, {\
                     \"Legend\": \"GC_Category\",\
                     \"LegendTooltip\": \"GCLegendTooltip\",\
                     \"Category\": \"GC_Category\",\
                     \"Color\": \"#f1ad00\",\
                     \"CssClass\": \"dataScriptingGc\"\
                 }, {\
                     \"Legend\": \"Styling_Category\",\
                     \"LegendTooltip\": \"StylingLegendTooltip\",\
                     \"Category\": \"Styling_Category\",\
                     \"Color\": \"#7fba00\",\
                     \"CssClass\": \"dataStyling\"\
                 }, {\
                     \"Legend\": \"Rendering_Category\",\
                     \"LegendTooltip\": \"RenderingLegendTooltip\",\
                     \"Category\": \"Rendering_Category\",\
                     \"Color\": \"#9b4f96\",\
                     \"CssClass\": \"dataRendering\"\
                 }, {\
                     \"Legend\": \"ImageDecoding_Category\",\
                     \"LegendTooltip\": \"ImageDecodingLegendTooltip\",\
                     \"Category\": \"ImageDecoding_Category\",\
                     \"Color\": \"#79d7f2\",\
                     \"CssClass\": \"dataImageDecoding\"\
                 }],\
                 \"BarWidth\": 4,\
                 \"BarGap\": 1,\
                 \"ShowStackGap\": true,\
                 \"Height\": 60\
               }";
                var graphJsonObject = JSON.parse(graphJsonConfigString);

                var managedConfig = {
                    Title: Plugin.Resources.getString("CPUChartTitle"),
                    Description: Plugin.Resources.getString("CPUGraphAriaLabel"),
                    JsonObject: graphJsonObject,
                    JsonConfiguration: graphJsonConfigString,
                    JavaScriptClassName: "VisualProfiler.Graphs.StackedBarGraph",
                    Resources: {
                        CPUBarAriaLabel: Plugin.Resources.getString("CPUBarAriaLabel"),
                        CPUGraphAriaLabel: Plugin.Resources.getString("CPUGraphAriaLabel"),
                        CPUTooltipCategoryLabel: Plugin.Resources.getString("CPUTooltipCategoryLabel"),
                        CPUTooltipUtilizationLabel: Plugin.Resources.getString("CPUTooltipUtilizationLabel"),
                        GC_Category: Plugin.Resources.getString("GC_Category"),
                        GCLegendTooltip: Plugin.Resources.getString("GCLegendTooltip"),
                        ImageDecoding_Category: Plugin.Resources.getString("ImageDecoding_Category"),
                        ImageDecodingLegendTooltip: Plugin.Resources.getString("ImageDecodingLegendTooltip"),
                        Loading_Category: Plugin.Resources.getString("Loading_Category"),
                        LoadingLegendTooltip: Plugin.Resources.getString("LoadingLegendTooltip"),
                        Rendering_Category: Plugin.Resources.getString("Rendering_Category"),
                        RenderingLegendTooltip: Plugin.Resources.getString("RenderingLegendTooltip"),
                        Scripting_Category: Plugin.Resources.getString("Scripting_Category"),
                        ScriptingLegendTooltip: Plugin.Resources.getString("ScriptingLegendTooltip"),
                        Styling_Category: Plugin.Resources.getString("Styling_Category"),
                        StylingLegendTooltip: Plugin.Resources.getString("StylingLegendTooltip"),
                        Unknown_Category: Plugin.Resources.getString("Unknown_Category"),
                        UnknownLegendTooltip: Plugin.Resources.getString("UnknownLegendTooltip")
                    }
                };

                DiagnosticsHub.RegisterNamespace.register("VisualProfiler.Graphs.StackedBarGraph");

                return managedConfig;
            };

            SwimlaneConfigurations.getVisualThroughputConfiguration = function () {
                var graphJsonConfigString = "\
              {\
                \"View\": \"Graph\",\
                \"GraphBehaviour\": 2,\
                \"Series\": [{\
                    \"SeriesType\": \"StepLine\",\
                    \"Legend\": \"AFG_Legend\",\
                    \"DataSource\": {\
                        \"CounterId\": \"frameRate\",\
                        \"AnalyzerId\": \"3A649979-5A30-4542-A12F-1E0C09858804\"\
                    }\
                }],\
                \"Axes\": [{ \"value\": 30 }, { \"value\": 60 }],\
                \"ScaleType\": 2,\
                \"MinValue\": 0,\
                \"MaxValue\": 70,\
                \"Unit\": \"AFG_Unit\",\
                \"Height\": 50\
              }";
                var graphJsonObject = JSON.parse(graphJsonConfigString);

                var managedConfig = {
                    Title: Plugin.Resources.getString("AFG_Title"),
                    Description: Plugin.Resources.getString("VisualThroughputGraphAriaLabel"),
                    JsonObject: graphJsonObject,
                    JsonConfiguration: graphJsonConfigString,
                    Resources: {
                        AFG_Legend: Plugin.Resources.getString("AFG_Legend"),
                        AFG_Unit: Plugin.Resources.getString("AFG_Unit")
                    }
                };

                return managedConfig;
            };
            return SwimlaneConfigurations;
        })();
        F12.SwimlaneConfigurations = SwimlaneConfigurations;
    })(VisualProfiler.F12 || (VisualProfiler.F12 = {}));
    var F12 = VisualProfiler.F12;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/SwimlaneConfigurations.f12.js.map

// EventsTimelineListControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    (function (EventCategory) {
        EventCategory[EventCategory["ImageDecoding"] = 0] = "ImageDecoding";
        EventCategory[EventCategory["GC"] = 1] = "GC";
        EventCategory[EventCategory["Loading"] = 2] = "Loading";
        EventCategory[EventCategory["Rendering"] = 3] = "Rendering";
        EventCategory[EventCategory["Scripting"] = 4] = "Scripting";
        EventCategory[EventCategory["Styling"] = 5] = "Styling";
        EventCategory[EventCategory["Measure"] = 6] = "Measure";
        EventCategory[EventCategory["Frame"] = 7] = "Frame";
        EventCategory[EventCategory["Idle"] = 8] = "Idle";
    })(VisualProfiler.EventCategory || (VisualProfiler.EventCategory = {}));
    var EventCategory = VisualProfiler.EventCategory;

    (function (TextFormat) {
        TextFormat[TextFormat["Html"] = 0] = "Html";
        TextFormat[TextFormat["String"] = 1] = "String";
    })(VisualProfiler.TextFormat || (VisualProfiler.TextFormat = {}));
    var TextFormat = VisualProfiler.TextFormat;

    var EventDataTooltip = (function (_super) {
        __extends(EventDataTooltip, _super);
        function EventDataTooltip(event) {
            _super.call(this, "eventDataTooltip");

            var durationExclusive = this.findElement("durationExc");
            var durationInclusive = this.findElement("durationInc");
            var startTime = this.findElement("startTime");

            durationExclusive.textContent = Plugin.Resources.getString("DurationLabelExclusive", VisualProfiler.FormattingHelpers.getPrettyPrintTime(event.exclusiveDuration));
            durationInclusive.textContent = Plugin.Resources.getString("DurationLabelInclusive", VisualProfiler.FormattingHelpers.getPrettyPrintTime(event.timeSpan.elapsed));
            startTime.textContent = Plugin.Resources.getString("StartTimeLabel", VisualProfiler.FormattingHelpers.getPrettyPrintTime(event.timeSpan.begin));
        }
        return EventDataTooltip;
    })(Common.Controls.Legacy.TemplateControl);
    VisualProfiler.EventDataTooltip = EventDataTooltip;

    var EventDataTemplate = (function (_super) {
        __extends(EventDataTemplate, _super);
        function EventDataTemplate() {
            var _this = this;
            _super.call(this, "eventDataTemplate");

            this._bar = this.findElement("bar");
            this._durationText = this.findElement("durationText");
            this._eventDataTemplateNameCell = this.findElement("eventDataTemplateNameCell");
            this._eventData = this.findElement("eventData");
            this._eventName = this.findElement("eventName");

            this._bar.addEventListener("mouseover", function (e) {
                return _this.showBarTooltip();
            });
            this._bar.addEventListener("mouseout", function (e) {
                return Plugin.Tooltip.dismiss();
            });

            this._eventName.addEventListener("mouseover", function (e) {
                return _this.showEventNameTooltip(e);
            });
            this._eventName.addEventListener("mouseout", function (e) {
                return Plugin.Tooltip.dismiss();
            });
        }
        Object.defineProperty(EventDataTemplate.prototype, "canViewSource", {
            get: function () {
                var sourceInfo = this._event.context ? this._event.context.sourceInfo : null;
                return EventDataTemplate.hasViewSourceInfo(sourceInfo);
            },
            enumerable: true,
            configurable: true
        });

        EventDataTemplate.addTokens = function (text, div, textFormat) {
            var tokens;
            switch (textFormat) {
                case 0 /* Html */:
                    tokens = Common.TokenExtractor.getHtmlTokens(text);
                    break;
                case 1 /* String */:
                    tokens = Common.TokenExtractor.getStringTokens(text);
                    break;
            }

            if (tokens && tokens.length > 0) {
                for (var i = 0; i < tokens.length; i++) {
                    var token = tokens[i];
                    var tokenSpan = document.createElement("span");
                    tokenSpan.className = Common.TokenExtractor.getCssClass(token.type);
                    tokenSpan.textContent = token.value;
                    div.appendChild(tokenSpan);
                }
            } else {
                div.textContent = text;
            }
        };

        EventDataTemplate.hasViewSourceInfo = function (sourceInfo) {
            return sourceInfo && sourceInfo.source !== "<DOM>";
        };

        EventDataTemplate.setViewSourceHandler = function (element, sourceInfo, keyboardNavigable, event) {
            element.addEventListener("mouseover", function (e) {
                return EventDataTemplate.showSourceInfoTooltip(e, sourceInfo, event);
            });
            element.addEventListener("mouseout", function (e) {
                return Plugin.Tooltip.dismiss();
            });
            element.onclick = EventDataTemplate.contextMouseHandler.bind(this, sourceInfo);

            if (keyboardNavigable) {
                element.tabIndex = 0;
                element.onkeydown = EventDataTemplate.contextKeyHandler.bind(this, sourceInfo);
            }
        };

        EventDataTemplate.showSourceInfoTooltip = function (mouseEvent, sourceInfo, event) {
            if (sourceInfo) {
                var tooltip = new Common.Controls.Legacy.SourceInfoTooltip(sourceInfo, event, "SourceInfoEventLabel");
                var config = {
                    content: tooltip.html,
                    contentContainsHTML: true
                };
                Plugin.Tooltip.show(config);

                mouseEvent.stopImmediatePropagation();
            }
        };

        EventDataTemplate.prototype.tryViewSource = function () {
            if (this.canViewSource) {
                var sourceInfo = this._event.context.sourceInfo;

                EventDataTemplate.viewSource(sourceInfo.source, sourceInfo.line, sourceInfo.column);
            }
        };

        EventDataTemplate.prototype.updateEvent = function (event, parentTimeSpan) {
            if (this._event !== event || !this._parentTimeSpan || !this._parentTimeSpan.equals(parentTimeSpan)) {
                this._event = event;
                this._parentTimeSpan = parentTimeSpan;
                this.updateData(event);
            }
        };

        EventDataTemplate.prototype.updateUiOverride = function (event) {
            _super.prototype.updateUiOverride.call(this, event);

            if (event.context) {
                this._eventName.textContent = "";

                var appendSpan = function (text, parent) {
                    if (text) {
                        var span = document.createElement("span");
                        span.textContent = text;
                        parent.appendChild(span);
                    }
                };

                appendSpan(event.fullName.substring(0, event.context.span.startIndex), this._eventName);

                var text = event.fullName.substring(event.context.span.startIndex, event.context.span.endIndex);
                var span = this.getContextSpan(event.name, text, event.context.sourceInfo);
                this._eventName.appendChild(span);

                appendSpan(event.fullName.substring(event.context.span.endIndex), this._eventName);
            } else if (event instanceof VisualProfiler.ProfilerEvent && Common.TokenExtractor.isHtmlExpression(event.fullName)) {
                this._eventName.textContent = "";

                EventDataTemplate.addTokens(event.fullName, this._eventName, 0 /* Html */);
            } else if (event instanceof VisualProfiler.ProfilerEvent && Common.TokenExtractor.isStringExpression(event.fullName)) {
                this._eventName.textContent = "";

                EventDataTemplate.addTokens(event.fullName, this._eventName, 1 /* String */);
            } else {
                this._eventName.textContent = event.fullName;
            }

            var left = (event.timeSpan.begin.nsec - this._parentTimeSpan.begin.nsec) / this._parentTimeSpan.elapsed.nsec * 100;
            var width = event.timeSpan.elapsed.nsec / this._parentTimeSpan.elapsed.nsec * 100;

            this._bar.style.marginLeft = left + "%";
            this._bar.style.width = width + "%";

            EventDataTemplate.setBarCss(this._bar, event);

            var durationText = VisualProfiler.FormattingHelpers.getPrettyPrintTime(event.timeSpan.elapsed);
            if (!event.exclusiveDuration.equals(event.timeSpan.elapsed)) {
                durationText += " (" + VisualProfiler.FormattingHelpers.getPrettyPrintTime(event.exclusiveDuration) + ")";
            }

            this._durationText.textContent = durationText;
        };

        EventDataTemplate.contextKeyHandler = function (sourceInfo, evt) {
            if ((evt.keyCode === 13 /* Enter */ || evt.keyCode === 32 /* Space */) && !evt.ctrlKey && !evt.altKey && !evt.shiftKey) {
                EventDataTemplate.viewSource(sourceInfo.source, sourceInfo.line, sourceInfo.column);
            }
        };

        EventDataTemplate.contextMouseHandler = function (sourceInfo) {
            window.setImmediate(function () {
                EventDataTemplate.viewSource(sourceInfo.source, sourceInfo.line, sourceInfo.column);
            });
        };

        EventDataTemplate.setBarCss = function (bar, event) {
            bar.className = "eventBar " + event.getCssClass();

            var barCssClass = event.getBarCssClass();

            if (barCssClass) {
                bar.classList.add(barCssClass);
            }
        };

        EventDataTemplate.viewSource = function (unshortenedUrl, line, column) {
            Plugin.Host.showDocument(unshortenedUrl, line, column).done(function () {
            }, function (err) {
                VisualProfiler.Program.hostShell.setStatusBarText(Plugin.Resources.getString("UnableToNavigateToSource"), true);
            });
        };

        EventDataTemplate.prototype.getContextSpan = function (eventName, linkText, sourceInfo) {
            var contextLink = document.createElement("span");
            contextLink.textContent = linkText;

            var sourceInfo = this._event.context ? this._event.context.sourceInfo : null;
            if (EventDataTemplate.hasViewSourceInfo(sourceInfo)) {
                contextLink.className = "BPT-FileLink";
                EventDataTemplate.setViewSourceHandler(contextLink, sourceInfo, false, eventName);
            }

            return contextLink;
        };

        EventDataTemplate.prototype.showBarTooltip = function () {
            if (this._event) {
                var toolTipControl = new EventDataTooltip(this._event);
                var config = {
                    content: toolTipControl.rootElement.innerHTML,
                    contentContainsHTML: true
                };
                Plugin.Tooltip.show(config);
            }
        };

        EventDataTemplate.prototype.showEventNameTooltip = function (mouseEvent) {
            if (this._event) {
                var eventDiv = mouseEvent.currentTarget;
                var tooltip = this._eventName.textContent;

                if (eventDiv.offsetWidth < eventDiv.scrollWidth) {
                    var config = {
                        content: tooltip
                    };
                    Plugin.Tooltip.show(config);
                }
            }
        };
        return EventDataTemplate;
    })(Common.Controls.Legacy.TreeItemDataTemplate);
    VisualProfiler.EventDataTemplate = EventDataTemplate;

    var EventsTimelineListControl = (function (_super) {
        __extends(EventsTimelineListControl, _super);
        function EventsTimelineListControl(rootElement) {
            var _this = this;
            _super.call(this, rootElement);

            this._columnsCssRule = this.getColumnsCssRule();

            this.ariaLabel = Plugin.Resources.getString("EventsTimelineAriaLabel");
            this.dataItemTemplateType = VisualProfiler.EventDataTemplate;
            this.onGetItemContainerAriaLabel = function (ic) {
                return _this.getItemContainerAriaLabel(ic);
            };
            this.onScrolled = function (e) {
                Notifications.notify(VisualProfiler.ResponsivenessNotifications.GridScrolled);
                VisualProfiler.Program.traceWriter.raiseEvent(107 /* Timeline_GridScrolled */);
            };

            VisualProfiler.Program.addEventListener(VisualProfiler.ProgramEvents.Resize, function () {
                _this._columnsCssRule = _this.getColumnsCssRule();
                _this.invalidateSizeCache();

                if (_this._viewModel) {
                    _this.setDividerBounds();
                    _this.resizeColumns(_this._divider.offsetX);
                }

                _this.onWindowResize();
            });

            this._divider = new VisualProfiler.Divider(this.panel.rootElement, this.eventNameColumnWidth);
            this._divider.minX = 90;
            this._divider.onMoved = function (offsetX) {
                _this.resizeColumns(offsetX);
                VisualProfiler.Program.triggerResize();
            };

            this.setDividerBounds();

            this._verticalRulerLineElementsFactory = Common.ElementRecyclerFactory.forDivWithClass(this.rootElement, "verticalRulerLine");

            this.invalidateSizeCache();
        }
        Object.defineProperty(EventsTimelineListControl.prototype, "dataColumnLeft", {
            get: function () {
                var columns = this._columnsCssRule.style.msGridColumns.split(" ");
                return parseInt(columns[0]) + parseInt(columns[1]);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "dataColumnWidth", {
            get: function () {
                if (this._dataColumnWidth === null) {
                    var panelScrollBarWidth = this.panel.rootElement.offsetWidth - this.panel.rootElement.clientWidth;
                    this._dataColumnWidth = this.rootElement.offsetWidth - this.dataColumnLeft - panelScrollBarWidth;
                }

                return this._dataColumnWidth;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "eventNameColumnWidth", {
            get: function () {
                var columns = this._columnsCssRule.style.msGridColumns.split(" ");
                return parseInt(columns[0]);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "rulerScale", {
            get: function () {
                return this._rulerScale;
            },
            set: function (rulerScale) {
                if (this._rulerScale !== rulerScale) {
                    this._rulerScale = rulerScale;
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(EventsTimelineListControl.prototype, "timeSpan", {
            set: function (value) {
                this._timeSpan = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineListControl.prototype, "viewModel", {
            set: function (value) {
                this._viewModel = value;
            },
            enumerable: true,
            configurable: true
        });

        EventsTimelineListControl.prototype.filterToEvent = function () {
            var _this = this;
            var selectedItemContainer = this.getSelectedItemContainer();

            if (selectedItemContainer) {
                selectedItemContainer.template.expand();

                var event = this.selectedItem;
                var filterTimeSpan = this.getFilterTimeSpan(event);
                var activeRange = this._viewModel.globalRuler.activeRange;

                if (!activeRange.equals(this._viewModel.globalRuler.totalRange)) {
                    var begin = (filterTimeSpan.begin.nsec < activeRange.begin.nsec) ? filterTimeSpan.begin : activeRange.begin;
                    var end = (filterTimeSpan.end.nsec > activeRange.end.nsec) ? filterTimeSpan.end : activeRange.end;
                    this._viewModel.globalRuler.setActiveRange(new VisualProfiler.TimeSpan(begin, end));
                }

                this._viewModel.timeSpan = filterTimeSpan;
                this._viewModel.globalRuler.setSelection(filterTimeSpan);

                window.setImmediate(function () {
                    var selectedItemContainer = _this.getSelectedItemContainer();
                    if (selectedItemContainer) {
                        selectedItemContainer.focus();
                    }
                });
            }
        };

        EventsTimelineListControl.prototype.invalidateSizeCache = function () {
            this._dataColumnWidth = null;

            _super.prototype.invalidateSizeCache.call(this);
        };

        EventsTimelineListControl.prototype.onInvalidated = function () {
            this.updateDividerHeight();
        };

        EventsTimelineListControl.prototype.onKeyDownOverride = function (event) {
            var handled = false;

            switch (event.keyCode) {
                case 13 /* Enter */:
                    this.onViewSource();
                    handled = true;
                    break;
            }

            if (!handled) {
                handled = _super.prototype.onKeyDownOverride.call(this, event);
            }

            return handled;
        };

        EventsTimelineListControl.prototype.onShowContextMenu = function () {
            var selectedItemContainer = this.getSelectedItemContainer();
            if (selectedItemContainer && this._contextMenu) {
                var rect = selectedItemContainer.template.rootElement.getBoundingClientRect();
                this._contextMenu.show(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width);
            }
        };

        EventsTimelineListControl.prototype.renderVerticalRulerLines = function () {
            var positions = this._viewModel.getVerticalRulerLinePositions(this.dataColumnWidth);

            this._verticalRulerLineElementsFactory.start();

            for (var i = 0; i < positions.length; ++i) {
                var line = this._verticalRulerLineElementsFactory.getNext();
                var x = this.dataColumnWidth * positions[i] / 100 + this.dataColumnLeft;
                this.positionVerticalRulerLine(line, x, this.panel.viewportHeight);
            }

            this._verticalRulerLineElementsFactory.stop();
        };

        EventsTimelineListControl.prototype.updateTemplateData = function (template, data) {
            template.updateEvent(data, this._timeSpan);

            if (!template.rootElement.getAttributeNode("data-plugin-contextmenu")) {
                this.setupEventContextMenu(template.rootElement);
            }
        };

        EventsTimelineListControl.prototype.positionVerticalRulerLine = function (line, x, height) {
            line.style.left = x + "px";
            line.style.height = height + "px";
            line.style.top = "0px";
        };

        EventsTimelineListControl.prototype.getColumnsCssRule = function () {
            return VisualProfiler.EventsTimelineView.getCssRule("VisualProfiler.css", ".eventDataTemplate");
        };

        EventsTimelineListControl.prototype.resizeColumns = function (offsetX) {
            this._dataColumnWidth = null;
            this.updateColumnWidth(offsetX);

            if (this.dataColumnWidthChanged) {
                this.dataColumnWidthChanged();
            }

            this.renderVerticalRulerLines();
        };

        EventsTimelineListControl.prototype.setupEventContextMenu = function () {
            var _this = this;
            var elements = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                elements[_i] = arguments[_i + 0];
            }
            if (!this._contextMenu) {
                var iconNames = this.getSelectionContextMenuIconNames();

                var filterToEventItem = {
                    callback: function () {
                        _this.filterToEvent();
                    },
                    label: Plugin.Resources.getString("FilterToEventContextMenu"),
                    type: 1 /* command */,
                    disabled: function () {
                        return false;
                    }
                };

                var clearSelection = {
                    callback: function () {
                        _this.clearSelection();
                    },
                    label: Plugin.Resources.getString("ToolbarButtonClearSelection"),
                    type: 1 /* command */,
                    iconEnabled: iconNames.clearSelection.enabled,
                    iconDisabled: iconNames.clearSelection.disabled,
                    disabled: function () {
                        return _this.isClearFilterDisabled();
                    }
                };

                var separatorMenuItem = {
                    type: 3 /* separator */
                };

                var viewSourceMenuItem = {
                    accessKey: Plugin.Resources.getString("EnterKey"),
                    callback: function () {
                        return window.setImmediate(_this.onViewSource.bind(_this));
                    },
                    disabled: this.isViewSourceCommandDisabled.bind(this),
                    label: Plugin.Resources.getString("ViewSourceLabel"),
                    type: 1 /* command */
                };

                this._contextMenu = Plugin.ContextMenu.create([filterToEventItem, clearSelection, separatorMenuItem, viewSourceMenuItem]);
            }

            for (var index = 0; index < elements.length; index++) {
                this._contextMenu.attach(elements[index]);
            }
        };

        EventsTimelineListControl.prototype.getSelectionContextMenuIconNames = function () {
            if (VisualProfiler.Program.hostType === 1 /* F12 */) {
                return {
                    zoomin: {
                        enabled: "f12-image-contextmenu-chartzoom-in",
                        disabled: "f12-image-contextmenu-chartzoom-in-disabled"
                    },
                    resetZoom: {
                        enabled: "f12-image-contextmenu-chartzoom-reset",
                        disabled: "f12-image-contextmenu-chartzoom-reset-disabled"
                    },
                    clearSelection: {
                        enabled: "f12-image-contextmenu-chartselection-clear",
                        disabled: "f12-image-contextmenu-chartselection-clear-disabled"
                    }
                };
            } else if (VisualProfiler.Program.hostType === 0 /* VS */) {
                return {
                    zoomin: {
                        enabled: "vs-image-contextmenu-chartzoom-in",
                        disabled: "vs-image-contextmenu-chartzoom-in-disabled"
                    },
                    resetZoom: {
                        enabled: "vs-image-contextmenu-chartzoom-reset",
                        disabled: "vs-image-contextmenu-chartzoom-reset-disabled"
                    },
                    clearSelection: {
                        enabled: "vs-image-contextmenu-chartselection-clear",
                        disabled: "vs-image-contextmenu-chartselection-clear-disabled"
                    }
                };
            }
        };

        EventsTimelineListControl.prototype.isClearFilterDisabled = function () {
            return this._viewModel.globalRuler.selection.equals(this._viewModel.globalRuler.activeRange);
        };

        EventsTimelineListControl.prototype.isViewSourceCommandDisabled = function () {
            var itemContainer = this.getSelectedItemContainer();

            if (!itemContainer) {
                return false;
            }

            var dataTemplate = itemContainer.template;

            return dataTemplate && !dataTemplate.canViewSource;
        };

        EventsTimelineListControl.prototype.getFilterTimeSpan = function (event) {
            var paddingPixels = 50;
            var eventTimeSpan = event.timeSpan;
            var sessionTimeSpan = this._viewModel.globalRuler.totalRange;
            var begin = Math.max(eventTimeSpan.begin.nsec, sessionTimeSpan.begin.nsec);
            var end = Math.min(eventTimeSpan.end.nsec, sessionTimeSpan.end.nsec);

            return new VisualProfiler.TimeSpan(new VisualProfiler.TimeStamp(begin), new VisualProfiler.TimeStamp(end));
        };

        EventsTimelineListControl.prototype.clearSelection = function () {
            var _this = this;
            var selectedItemContainer = this.getSelectedItemContainer();
            if (selectedItemContainer) {
                selectedItemContainer.template.collapse();
            }

            this._viewModel.globalRuler.setSelection(this._viewModel.globalRuler.activeRange);

            window.setImmediate(function () {
                var selectedItemContainer = _this.getSelectedItemContainer();
                if (selectedItemContainer) {
                    selectedItemContainer.focus();
                }
            });
        };

        EventsTimelineListControl.prototype.onViewSource = function () {
            var selectedItemContainer = this.getSelectedItemContainer();

            if (selectedItemContainer) {
                var dataTemplate = selectedItemContainer.template;

                if (dataTemplate) {
                    dataTemplate.tryViewSource();
                }
            }
        };

        EventsTimelineListControl.prototype.setDividerBounds = function () {
            var containerWidth = this.panel.rootElement.offsetWidth;
            if (containerWidth > 0) {
                this._divider.maxX = containerWidth / 2;
            }
        };

        EventsTimelineListControl.prototype.getItemContainerAriaLabel = function (itemContainer) {
            var ariaLabel;
            var event = itemContainer.item;

            if (event) {
                ariaLabel = event.name;
                ariaLabel += " , " + Plugin.Resources.getString("StartTimeLabel", VisualProfiler.FormattingHelpers.getPrettyPrintTime(event.timeSpan.begin));
                ariaLabel += " , " + Plugin.Resources.getString("DurationLabelInclusive", VisualProfiler.FormattingHelpers.getPrettyPrintTime(event.timeSpan.elapsed));
                if (!event.timeSpan.elapsed.equals(event.exclusiveDuration)) {
                    ariaLabel += " , " + Plugin.Resources.getString("DurationLabelExclusive", VisualProfiler.FormattingHelpers.getPrettyPrintTime(event.exclusiveDuration));
                }

                ariaLabel += " , " + Plugin.Resources.getString("ThreadContextLabel", event.contextThreadId || Plugin.Resources.getString("UIThreadContext"));

                var additionalInfo = this._viewModel.getEventDetails(event);
                for (var i = 0; i < additionalInfo.length; i++) {
                    ariaLabel += " , " + additionalInfo[i].localizedName + ": " + additionalInfo[i].localizedValue;
                }

                ariaLabel += " , " + event.getDescription();

                itemContainer.rootElement.setAttribute("aria-label", ariaLabel);
            } else {
                itemContainer.rootElement.removeAttribute("aria-label");
            }

            return ariaLabel;
        };

        EventsTimelineListControl.prototype.updateColumnWidth = function (offsetX) {
            if (offsetX === null || typeof offsetX === "undefined") {
                offsetX = this._divider.offsetX;
            }

            var columns = this._columnsCssRule.style.msGridColumns.split(" ");
            columns[0] = offsetX + "px";
            this._columnsCssRule.style.msGridColumns = columns.join(" ");
        };

        EventsTimelineListControl.prototype.updateDividerHeight = function () {
            var height = Math.max(this.panel.virtualHeight, this.panel.actualHeight);

            this._divider.height = height;
        };
        return EventsTimelineListControl;
    })(Common.Controls.Legacy.TreeListControl);
    VisualProfiler.EventsTimelineListControl = EventsTimelineListControl;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/EventsTimelineListControl.js.map

// EventsTimelineView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

    var ProfilerEvent = (function () {
        function ProfilerEvent(interval, category, uiThreadId) {
            this.details = [];
            this._interval = interval;
            this._category = category;
            this._contextThreadId = ProfilerEvent.getContextThreadId(interval, uiThreadId);
            this._timeSpan = new VisualProfiler.TimeSpan(VisualProfiler.TimeStamp.fromNanoseconds(interval.begin), VisualProfiler.TimeStamp.fromNanoseconds(interval.end));
            this._exclusiveTimeSpan = VisualProfiler.TimeStamp.fromNanoseconds(interval.exclusiveDuration);
        }
        Object.defineProperty(ProfilerEvent.prototype, "category", {
            get: function () {
                return this._category;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "childrenCount", {
            get: function () {
                return this._interval.childrenCount;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "context", {
            get: function () {
                return this._interval.context;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "contextThreadId", {
            get: function () {
                return this._contextThreadId;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "exclusiveDuration", {
            get: function () {
                return this._exclusiveTimeSpan;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "fullName", {
            get: function () {
                return this._interval.fullName;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "hasChildren", {
            get: function () {
                return this.childrenCount > 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "id", {
            get: function () {
                return this._interval.id;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "interval", {
            get: function () {
                return this._interval;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "isExpanded", {
            get: function () {
                return this._interval.isExpanded;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "level", {
            get: function () {
                return this._interval.level;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "name", {
            get: function () {
                if (typeof this._name === "undefined") {
                    this._name = this.createName();
                }

                return this._name;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "timeSpan", {
            get: function () {
                return this._timeSpan;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ProfilerEvent.prototype, "title", {
            get: function () {
                return this.name;
            },
            enumerable: true,
            configurable: true
        });

        ProfilerEvent.convertBooleanToYesNoLabel = function (value) {
            return value ? "YesLabel" : "NoLabel";
        };

        ProfilerEvent.convertPropagationStatus = function (propagationStatus) {
            var result = {
                preventDefaultCalled: (propagationStatus & 1) != 0,
                stopImmediatePropagationCalled: (propagationStatus & 2) != 0,
                stopPropagationCalled: (propagationStatus & 4) != 0
            };

            return result;
        };

        ProfilerEvent.createElementString = function (tag, id, cssClass) {
            var elementValue = "";
            var hasAnyElementInfo = false;
            if (tag !== "") {
                hasAnyElementInfo = true;
                elementValue += "<" + tag;
            } else {
                elementValue += "<" + Plugin.Resources.getString("UnknownElement");
            }

            if (id !== "") {
                hasAnyElementInfo = true;
                elementValue += " id=\"" + id + "\"";
            }

            if (cssClass !== "") {
                hasAnyElementInfo = true;
                elementValue += " class=\"" + cssClass + "\"";
            }

            elementValue += ">";

            if (hasAnyElementInfo === false) {
                elementValue = "";
            }

            return elementValue;
        };

        ProfilerEvent.createShortenedUrlTextWithQueryString = function (url) {
            if (!url || url.indexOf("data:image") === 0) {
                return url;
            }

            var urlParts = url.split("/");

            if (ProfilerEvent.isFile(url)) {
                return urlParts[urlParts.length - 1];
            }

            if (ProfilerEvent.isUrl(url) && urlParts.length > 3) {
                return "/" + urlParts.slice(3, urlParts.length).join("/");
            }

            return url;
        };

        ProfilerEvent.prototype.createDetailInfo = function (name, value, nameLocalizationKey, valueLocalizationKey, sourceInfo) {
            var localizedValue;
            if (valueLocalizationKey) {
                localizedValue = Plugin.Resources.getString(valueLocalizationKey);
            } else {
                localizedValue = value;
            }

            var localizedName;
            if (nameLocalizationKey) {
                localizedName = Plugin.Resources.getString(nameLocalizationKey);
            } else {
                localizedName = name;
            }

            var additionalInfo = {
                propertyName: name,
                propertyValue: value,
                localizedName: localizedName,
                localizedValue: localizedValue
            };

            if (sourceInfo) {
                additionalInfo.sourceInfo = sourceInfo;
            }

            return additionalInfo;
        };

        ProfilerEvent.prototype.createName = function () {
            return Plugin.Resources.getString(this._interval.name);
        };

        ProfilerEvent.prototype.getBarCssClass = function () {
            if (this._category === 6 /* Measure */) {
                return "bracket";
            }

            return null;
        };

        ProfilerEvent.prototype.getCssClass = function () {
            switch (this._category) {
                case 1 /* GC */:
                    return "dataScriptingGc";
                case 0 /* ImageDecoding */:
                    return "dataImageDecoding";
                case 2 /* Loading */:
                    return "dataLoading";
                case 3 /* Rendering */:
                    return "dataRendering";
                case 4 /* Scripting */:
                    return "dataScripting";
                case 5 /* Styling */:
                    return "dataStyling";
                case 6 /* Measure */:
                    return "dataMeasure";
                case 7 /* Frame */:
                    return "dataFrame";
                default:
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1033"));
            }
        };

        ProfilerEvent.prototype.getDescription = function () {
            return "";
        };

        ProfilerEvent.prototype.getDetails = function (sourceInfo) {
            return [];
        };

        ProfilerEvent.prototype.getEventDetailsRequestInformation = function () {
            return [];
        };

        ProfilerEvent.prototype.getThreadContext = function () {
            return this._contextThreadId === null ? "" : " [" + this._contextThreadId + "]";
        };

        ProfilerEvent.prototype.setSourceDetails = function (sourceInfo, additionalInfos) {
            var shortenedUrl = ProfilerEvent.createShortenedUrlText(sourceInfo.source);
            var additionalInfo = {
                propertyName: "CallbackFunction",
                propertyValue: sourceInfo.name,
                localizedName: Plugin.Resources.getString("CallbackFunction"),
                localizedValue: sourceInfo.name,
                sourceInfo: sourceInfo
            };

            additionalInfos.push(additionalInfo);
        };

        ProfilerEvent.getContextThreadId = function (interval, uiThreadId) {
            if (interval.beginThreadId !== uiThreadId) {
                return interval.beginThreadId;
            }

            if (interval.endThreadId !== uiThreadId) {
                return interval.endThreadId;
            }

            return null;
        };

        ProfilerEvent.createShortenedUrlText = function (url) {
            if (!ProfilerEvent.isUrl(url)) {
                return url;
            }

            return Common.ToolWindowHelpers.createShortenedUrlText(url);
        };

        ProfilerEvent.isFile = function (url) {
            return url.match(/^(file|res|ms-appx):/i) ? true : false;
        };

        ProfilerEvent.isUrl = function (url) {
            return url.match(/^(https?|file|res|ms-appx):/i) ? true : false;
        };
        return ProfilerEvent;
    })();
    VisualProfiler.ProfilerEvent = ProfilerEvent;

    var CssCalculationEvent = (function (_super) {
        __extends(CssCalculationEvent, _super);
        function CssCalculationEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        CssCalculationEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("CssCalculationEventDescription");
        };
        return CssCalculationEvent;
    })(ProfilerEvent);
    VisualProfiler.CssCalculationEvent = CssCalculationEvent;

    var CssParsingEvent = (function (_super) {
        __extends(CssParsingEvent, _super);
        function CssParsingEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        CssParsingEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("CssParsingEventDescription");
        };

        CssParsingEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];

            var styleUrl = this.getStyleUrl();
            if (styleUrl) {
                result.push(this.createDetailInfo("StylesheetUrl", styleUrl, "StylesheetUrlLabel", null, { name: ProfilerEvent.createShortenedUrlTextWithQueryString(styleUrl), line: 1, column: 1, source: styleUrl }));
            }

            return result;
        };

        CssParsingEvent.prototype.getStyleUrl = function () {
            var cssParsingInterval = this.interval;
            if (cssParsingInterval.url) {
                return cssParsingInterval.url;
            }

            return null;
        };

        CssParsingEvent.prototype.isStylesheetInline = function () {
            var cssParsingInterval = this.interval;
            return cssParsingInterval.isInline;
        };
        return CssParsingEvent;
    })(ProfilerEvent);
    VisualProfiler.CssParsingEvent = CssParsingEvent;

    var DomEvent = (function (_super) {
        __extends(DomEvent, _super);
        function DomEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        DomEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("DomEventDescription");
        };

        DomEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];
            result.push(this.createDetailInfo("EventName", this.getEventName(), "EventNameLabel", null));
            var domEventInterval = this.interval;

            var endingPropagation = { stopPropagationCalled: false, stopImmediatePropagationCalled: false, preventDefaultCalled: false };
            if (domEventInterval.endingPropagationStatus) {
                endingPropagation = ProfilerEvent.convertPropagationStatus(domEventInterval.endingPropagationStatus);
            }

            if (endingPropagation.preventDefaultCalled) {
                result.push(this.createDetailInfo("DefaultPrevented", domEventInterval.endingPropagationStatus, "DefaultPreventedLabel", ProfilerEvent.convertBooleanToYesNoLabel(endingPropagation.preventDefaultCalled)));
            }

            if (endingPropagation.stopImmediatePropagationCalled) {
                result.push(this.createDetailInfo("stopImmediatePropagation()", domEventInterval.endingPropagationStatus, "ImmediatePropagationStoppedLabel", ProfilerEvent.convertBooleanToYesNoLabel(endingPropagation.stopImmediatePropagationCalled)));
            }

            if (endingPropagation.stopPropagationCalled) {
                result.push(this.createDetailInfo("stopPropagation()", domEventInterval.endingPropagationStatus, "PropagationStoppedLabel", ProfilerEvent.convertBooleanToYesNoLabel(endingPropagation.stopPropagationCalled)));
            }

            return result;
        };

        DomEvent.prototype.getEventName = function () {
            var domEventInterval = this.interval;
            if (typeof domEventInterval.eventName !== "undefined") {
                return domEventInterval.eventName;
            }

            return null;
        };
        return DomEvent;
    })(ProfilerEvent);
    VisualProfiler.DomEvent = DomEvent;

    var EvaluatingScriptEvent = (function (_super) {
        __extends(EvaluatingScriptEvent, _super);
        function EvaluatingScriptEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        EvaluatingScriptEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("EvaluatingScriptEventDescription");
        };

        EvaluatingScriptEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];

            var scriptUrl = this.getScriptUrl();
            var scriptPreview = this.getScriptPreview();

            if (typeof scriptUrl !== "undefined") {
                var sourceInfo = { name: ProfilerEvent.createShortenedUrlTextWithQueryString(scriptUrl), line: 1, column: 1, source: scriptUrl };

                result.push(this.createDetailInfo("ScriptUrl", scriptUrl, "ScriptUrlLabel", null, sourceInfo));
            }

            if (typeof scriptPreview !== "undefined") {
                result.push(this.createDetailInfo("ContentPreview", scriptPreview, "ScriptContentPreviewLabel", null));
            }

            return result;
        };

        EvaluatingScriptEvent.prototype.getScriptUrl = function () {
            var scriptEventInterval = this.interval;
            return scriptEventInterval.url;
        };

        EvaluatingScriptEvent.prototype.getScriptPreview = function () {
            var scriptEventInterval = this.interval;
            var script = scriptEventInterval.inlineScript;
            if (script) {
                var oneLinePattern = /(\r\n|\r|\n)\s*/gm;
                script = script.replace(oneLinePattern, " ");
                script = script.trim();
            }

            return script;
        };
        return EvaluatingScriptEvent;
    })(ProfilerEvent);
    VisualProfiler.EvaluatingScriptEvent = EvaluatingScriptEvent;

    var EventHandlerEvent = (function (_super) {
        __extends(EventHandlerEvent, _super);
        function EventHandlerEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        EventHandlerEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("EventHandlerEventDescription");
        };

        EventHandlerEvent.prototype.getDetails = function (sourceInfo) {
            var eventHandlerInterval = this.interval;

            var result = [];

            if (sourceInfo) {
                this.setSourceDetails(sourceInfo, result);
            }

            var eventPhaseLabelKey;
            if (eventHandlerInterval.eventPhase) {
                switch (eventHandlerInterval.eventPhase) {
                    case 1:
                        eventPhaseLabelKey = "CapturingEventPhaseLabel";
                        break;
                    case 2:
                        eventPhaseLabelKey = "AtTargetEventPhaseLabel";
                        break;
                    case 3:
                        eventPhaseLabelKey = "BubblingEventPhaseLabel";
                        break;
                }

                result.push(this.createDetailInfo("EventPhase", eventHandlerInterval.eventPhase.toString(), "EventPhaseLabel", eventPhaseLabelKey));
            }

            var endingPropagation = { stopPropagationCalled: false, stopImmediatePropagationCalled: false, preventDefaultCalled: false };
            if (eventHandlerInterval.endingPropagationStatus) {
                endingPropagation = ProfilerEvent.convertPropagationStatus(eventHandlerInterval.endingPropagationStatus);
            }

            if (endingPropagation.preventDefaultCalled) {
                result.push(this.createDetailInfo("DefaultPrevented", eventHandlerInterval.endingPropagationStatus, "DefaultPreventedLabel", ProfilerEvent.convertBooleanToYesNoLabel(endingPropagation.preventDefaultCalled)));
            }

            if (endingPropagation.stopImmediatePropagationCalled) {
                result.push(this.createDetailInfo("stopImmediatePropagation()", eventHandlerInterval.endingPropagationStatus, "ImmediatePropagationStoppedLabel", ProfilerEvent.convertBooleanToYesNoLabel(endingPropagation.stopImmediatePropagationCalled)));
            }

            if (endingPropagation.stopPropagationCalled) {
                result.push(this.createDetailInfo("stopPropagation()", eventHandlerInterval.endingPropagationStatus, "PropagationStoppedLabel", ProfilerEvent.convertBooleanToYesNoLabel(endingPropagation.stopPropagationCalled)));
            }

            if (eventHandlerInterval.usesCapture) {
                result.push(this.createDetailInfo("ListenerUsesCapture", eventHandlerInterval.usesCapture, "ListenerUsesCaptureLabel", ProfilerEvent.convertBooleanToYesNoLabel(eventHandlerInterval.usesCapture)));
            }

            var elementValue = ProfilerEvent.createElementString(this.getDDTrackerElementTag(), this.getDDTrackerElementId(), this.getDDTrackerElementClass());

            if (elementValue !== "") {
                result.push(this.createDetailInfo("TargetElement", elementValue, "EventTargetLabel", null));
            }

            return result;
        };

        EventHandlerEvent.prototype.getEventDetailsRequestInformation = function () {
            var eventDetailsRequest = [];

            if (this.context && this.context.sourceInfo) {
                eventDetailsRequest.push({ sourceInfo: this.context.sourceInfo, isSourceRequest: true });
            }

            return eventDetailsRequest;
        };

        EventHandlerEvent.prototype.getDDTrackerElementTag = function () {
            if (typeof this._ddtrackerElementTag === "undefined") {
                this._ddtrackerElementTag = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.tag) {
                    this._ddtrackerElementTag = ddtrackerInterval.element.tag.toLowerCase();
                }
            }

            return this._ddtrackerElementTag;
        };

        EventHandlerEvent.prototype.getDDTrackerElementId = function () {
            if (typeof this._ddtrackerElementId === "undefined") {
                this._ddtrackerElementId = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.id) {
                    this._ddtrackerElementId = ddtrackerInterval.element.id;
                }
            }

            return this._ddtrackerElementId;
        };

        EventHandlerEvent.prototype.getDDTrackerElementClass = function () {
            if (typeof this._ddtrackerElementClass === "undefined") {
                this._ddtrackerElementClass = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.class) {
                    this._ddtrackerElementClass = ddtrackerInterval.element.class;
                }
            }

            return this._ddtrackerElementClass;
        };
        return EventHandlerEvent;
    })(ProfilerEvent);
    VisualProfiler.EventHandlerEvent = EventHandlerEvent;

    var GarbageCollectionEvent = (function (_super) {
        __extends(GarbageCollectionEvent, _super);
        function GarbageCollectionEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        GarbageCollectionEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("GarbageCollectionEventDescription");
        };
        return GarbageCollectionEvent;
    })(ProfilerEvent);
    VisualProfiler.GarbageCollectionEvent = GarbageCollectionEvent;

    var HtmlParsingEvent = (function (_super) {
        __extends(HtmlParsingEvent, _super);
        function HtmlParsingEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        HtmlParsingEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("HtmlParsingEventDescription");
        };
        return HtmlParsingEvent;
    })(ProfilerEvent);
    VisualProfiler.HtmlParsingEvent = HtmlParsingEvent;

    var HtmlSpeculativeDownloadingEvent = (function (_super) {
        __extends(HtmlSpeculativeDownloadingEvent, _super);
        function HtmlSpeculativeDownloadingEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        HtmlSpeculativeDownloadingEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("HtmlSpeculativeDownloadingEventDescription");
        };
        return HtmlSpeculativeDownloadingEvent;
    })(ProfilerEvent);
    VisualProfiler.HtmlSpeculativeDownloadingEvent = HtmlSpeculativeDownloadingEvent;

    var HttpRequestEvent = (function (_super) {
        __extends(HttpRequestEvent, _super);
        function HttpRequestEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        HttpRequestEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("HttpRequestEventDescription");
        };

        HttpRequestEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];

            var httpRequestEvent = this.interval;

            if (httpRequestEvent.url) {
                result.push(this.createDetailInfo("AddressName", httpRequestEvent.url, "AddressNameLabel", null));
            }

            if (httpRequestEvent.statusLine) {
                result.push(this.createDetailInfo("StatusCode", httpRequestEvent.statusLine, "StatusCodeLabel", null));
            }

            return result;
        };

        HttpRequestEvent.prototype.getEventDetailsRequestInformation = function () {
            var eventDetailsRequest = [];
            eventDetailsRequest.push({ isSourceRequest: false });
            return eventDetailsRequest;
        };
        return HttpRequestEvent;
    })(ProfilerEvent);
    VisualProfiler.HttpRequestEvent = HttpRequestEvent;

    var IdleEvent = (function (_super) {
        __extends(IdleEvent, _super);
        function IdleEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        return IdleEvent;
    })(ProfilerEvent);
    VisualProfiler.IdleEvent = IdleEvent;

    var ImageDecodedEvent = (function (_super) {
        __extends(ImageDecodedEvent, _super);
        function ImageDecodedEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        ImageDecodedEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("ImageDecodedEventDescription");
        };

        ImageDecodedEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];
            result.push(this.createDetailInfo("ImageUrl", this.getImageUrl(), "ImageUrlLabel", null));
            return result;
        };

        ImageDecodedEvent.prototype.getImageUrl = function () {
            var imageDecodeEventInterval = this.interval;

            if (typeof imageDecodeEventInterval.url !== "undefined") {
                return imageDecodeEventInterval.url;
            } else {
                return null;
            }
        };
        return ImageDecodedEvent;
    })(ProfilerEvent);
    VisualProfiler.ImageDecodedEvent = ImageDecodedEvent;

    var LayoutEvent = (function (_super) {
        __extends(LayoutEvent, _super);
        function LayoutEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        LayoutEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("LayoutEventDescription");
        };
        return LayoutEvent;
    })(ProfilerEvent);
    VisualProfiler.LayoutEvent = LayoutEvent;

    var MeasureEvent = (function (_super) {
        __extends(MeasureEvent, _super);
        function MeasureEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        MeasureEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("MeasureDescription");
        };

        MeasureEvent.prototype.getDetails = function (sourceInfo) {
            var measureEventInterval = this.interval;
            var result = [];

            if (measureEventInterval.measureName) {
                result.push(this.createDetailInfo("Name", measureEventInterval.measureName, "MeasureName", null));
            }

            if (measureEventInterval.startMarkName) {
                result.push(this.createDetailInfo("Start mark", measureEventInterval.startMarkName, "StartMarkName", null));
            }

            if (measureEventInterval.endMarkName) {
                result.push(this.createDetailInfo("End mark", measureEventInterval.endMarkName, "EndMarkName", null));
            }

            return result;
        };
        return MeasureEvent;
    })(ProfilerEvent);
    VisualProfiler.MeasureEvent = MeasureEvent;

    var MediaQueryListenerEvent = (function (_super) {
        __extends(MediaQueryListenerEvent, _super);
        function MediaQueryListenerEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        MediaQueryListenerEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("MediaQueryListenerEventDescription");
        };

        MediaQueryListenerEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];

            var listenerEvent = this.interval;

            if (sourceInfo) {
                this.setSourceDetails(sourceInfo, result);
            }

            if (listenerEvent.mediaQuery) {
                result.push(this.createDetailInfo("MediaQuery", listenerEvent.mediaQuery, "MediaQueryLabel", null));
            }

            return result;
        };

        MediaQueryListenerEvent.prototype.getEventDetailsRequestInformation = function () {
            var eventDetailsRequest = [];

            if (this.context && this.context.sourceInfo) {
                eventDetailsRequest.push({ sourceInfo: this.context.sourceInfo, isSourceRequest: true });
            }

            return eventDetailsRequest;
        };
        return MediaQueryListenerEvent;
    })(ProfilerEvent);
    VisualProfiler.MediaQueryListenerEvent = MediaQueryListenerEvent;

    var MutationObserverEvent = (function (_super) {
        __extends(MutationObserverEvent, _super);
        function MutationObserverEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        MutationObserverEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("MutationObserverEventDescription");
        };

        MutationObserverEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];

            if (sourceInfo) {
                this.setSourceDetails(sourceInfo, result);
            }

            return result;
        };

        MutationObserverEvent.prototype.getEventDetailsRequestInformation = function () {
            var eventDetailsRequest = [];

            if (this.context && this.context.sourceInfo) {
                eventDetailsRequest.push({ sourceInfo: this.context.sourceInfo, isSourceRequest: true });
            }

            return eventDetailsRequest;
        };
        return MutationObserverEvent;
    })(ProfilerEvent);
    VisualProfiler.MutationObserverEvent = MutationObserverEvent;

    var PaintRect = (function () {
        function PaintRect(paintRect) {
            this._paintRect = paintRect;
        }
        Object.defineProperty(PaintRect.prototype, "bottom", {
            get: function () {
                return this._paintRect.bottom;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PaintRect.prototype, "height", {
            get: function () {
                return this._paintRect.bottom - this._paintRect.top;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PaintRect.prototype, "left", {
            get: function () {
                return this._paintRect.left;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PaintRect.prototype, "right", {
            get: function () {
                return this._paintRect.right;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PaintRect.prototype, "top", {
            get: function () {
                return this._paintRect.top;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PaintRect.prototype, "width", {
            get: function () {
                return this._paintRect.right - this._paintRect.left;
            },
            enumerable: true,
            configurable: true
        });
        return PaintRect;
    })();
    VisualProfiler.PaintRect = PaintRect;

    var PaintRectEventBase = (function (_super) {
        __extends(PaintRectEventBase, _super);
        function PaintRectEventBase(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);

            this._paintRect = PaintRectEventBase.getPaintRect(interval);
        }
        Object.defineProperty(PaintRectEventBase.prototype, "paintRect", {
            get: function () {
                return this._paintRect;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(PaintRectEventBase.prototype, "widthByHeight", {
            get: function () {
                if (this._paintRect) {
                    return this._paintRect.width + "x" + this._paintRect.height;
                }

                return null;
            },
            enumerable: true,
            configurable: true
        });

        PaintRectEventBase.getPaintRect = function (interval) {
            var paintRectInterval = interval;

            if (typeof paintRectInterval.paintRect !== "undefined" && typeof paintRectInterval.paintRect.top !== "undefined" && typeof paintRectInterval.paintRect.left !== "undefined" && typeof paintRectInterval.paintRect.right !== "undefined" && typeof paintRectInterval.paintRect.bottom !== "undefined") {
                return new PaintRect(paintRectInterval.paintRect);
            }

            return null;
        };

        PaintRectEventBase.prototype.getDetails = function (sourceInfo) {
            var result = [];

            if (this._paintRect && this.widthByHeight && this.widthByHeight !== "0x0") {
                result.push(this.createDetailInfo("Origin", this._paintRect.left + ", " + this._paintRect.top, "OriginLabel", null));
                result.push(this.createDetailInfo("Dimensions", this.widthByHeight, "DimensionsLabel", null));
            }

            return result;
        };
        return PaintRectEventBase;
    })(ProfilerEvent);
    VisualProfiler.PaintRectEventBase = PaintRectEventBase;

    var PaintEvent = (function (_super) {
        __extends(PaintEvent, _super);
        function PaintEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        PaintEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("PaintEventDescription");
        };
        return PaintEvent;
    })(PaintRectEventBase);
    VisualProfiler.PaintEvent = PaintEvent;

    var RenderLayerEvent = (function (_super) {
        __extends(RenderLayerEvent, _super);
        function RenderLayerEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        Object.defineProperty(RenderLayerEvent.prototype, "title", {
            get: function () {
                return Plugin.Resources.getString("RenderLayer");
            },
            enumerable: true,
            configurable: true
        });

        RenderLayerEvent.prototype.createName = function () {
            var elementValue = ProfilerEvent.createElementString(this.getDDTrackerElementTag(), this.getDDTrackerElementId(), this.getDDTrackerElementClass());

            if (elementValue) {
                return elementValue;
            }

            return Plugin.Resources.getString("RenderLayer");
        };

        RenderLayerEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("RenderLayoutEventDescription");
        };

        RenderLayerEvent.prototype.getDetails = function () {
            var result = _super.prototype.getDetails.call(this);

            var elementValue = ProfilerEvent.createElementString(this.getDDTrackerElementTag(), this.getDDTrackerElementId(), this.getDDTrackerElementClass());
            if (elementValue) {
                result.push(this.createDetailInfo("Element", elementValue, "DDTrackerElementLabel", null));
            }

            return result;
        };

        RenderLayerEvent.prototype.getDDTrackerElementTag = function () {
            if (typeof this._ddtrackerElementTag === "undefined") {
                this._ddtrackerElementTag = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.tag) {
                    this._ddtrackerElementTag = ddtrackerInterval.element.tag.toLowerCase();
                }
            }

            return this._ddtrackerElementTag;
        };

        RenderLayerEvent.prototype.getDDTrackerElementId = function () {
            if (typeof this._ddtrackerElementId === "undefined") {
                this._ddtrackerElementId = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.id) {
                    this._ddtrackerElementId = ddtrackerInterval.element.id;
                }
            }

            return this._ddtrackerElementId;
        };

        RenderLayerEvent.prototype.getDDTrackerElementClass = function () {
            if (typeof this._ddtrackerElementClass === "undefined") {
                this._ddtrackerElementClass = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.class) {
                    this._ddtrackerElementClass = ddtrackerInterval.element.class;
                }
            }

            return this._ddtrackerElementClass;
        };
        return RenderLayerEvent;
    })(PaintRectEventBase);
    VisualProfiler.RenderLayerEvent = RenderLayerEvent;

    var TimerFiredEvent = (function (_super) {
        __extends(TimerFiredEvent, _super);
        function TimerFiredEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        TimerFiredEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("TimerFiredEventDescription");
        };

        TimerFiredEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];

            var timerFiredEventInterval = this.interval;

            if (sourceInfo) {
                this.setSourceDetails(sourceInfo, result);
            }

            var timerTypeValueLabel;
            switch (timerFiredEventInterval.timerType) {
                case 0:
                    timerTypeValueLabel = "TimeoutTimerTypeLabel";
                    break;
                case 1:
                    timerTypeValueLabel = "IntervalTimerTypeLabel";
                    break;
                case 2:
                    timerTypeValueLabel = "ImmediateTimerTypeLabel";
                    break;
                case 3:
                    timerTypeValueLabel = "AnimationFrameTimerTypeLabel";
            }

            if (timerFiredEventInterval.timerType !== 3) {
                result.push(this.createDetailInfo("TimerType", timerFiredEventInterval.timerType, "TimerTypeLabel", timerTypeValueLabel));
            }

            if ((timerFiredEventInterval.timerType === 0 || timerFiredEventInterval.timerType === 1) && typeof timerFiredEventInterval.timeoutValue === "number") {
                result.push(this.createDetailInfo("TimeoutValue", VisualProfiler.FormattingHelpers.getPrettyPrintTime(VisualProfiler.TimeStamp.fromMilliseconds(timerFiredEventInterval.timeoutValue)), "TimeoutLabel", null));
            }

            return result;
        };

        TimerFiredEvent.prototype.getEventDetailsRequestInformation = function () {
            var eventDetailsRequest = [];

            if (this.context && this.context.sourceInfo) {
                eventDetailsRequest.push({ sourceInfo: this.context.sourceInfo, isSourceRequest: true });
            }

            return eventDetailsRequest;
        };
        return TimerFiredEvent;
    })(ProfilerEvent);
    VisualProfiler.TimerFiredEvent = TimerFiredEvent;

    var AnimationFrameEvent = (function (_super) {
        __extends(AnimationFrameEvent, _super);
        function AnimationFrameEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        AnimationFrameEvent.prototype.createName = function () {
            return Plugin.Resources.getString("AnimationFrame");
        };

        AnimationFrameEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("AnimationFrameEventDescription");
        };
        return AnimationFrameEvent;
    })(TimerFiredEvent);
    VisualProfiler.AnimationFrameEvent = AnimationFrameEvent;

    var WindowsRuntimeEvent = (function (_super) {
        __extends(WindowsRuntimeEvent, _super);
        function WindowsRuntimeEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        WindowsRuntimeEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("WindowsRuntimeEventDescription");
        };

        WindowsRuntimeEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];
            result.push(this.createDetailInfo("EventName", this.getEventName(), "EventNameLabel", null));
            return result;
        };

        WindowsRuntimeEvent.prototype.getEventName = function () {
            var winRuntimeEventInterval = this.interval;
            if (typeof winRuntimeEventInterval.eventName !== "undefined") {
                return winRuntimeEventInterval.eventName;
            }

            return null;
        };
        return WindowsRuntimeEvent;
    })(ProfilerEvent);
    VisualProfiler.WindowsRuntimeEvent = WindowsRuntimeEvent;

    var WindowsRuntimeAsyncCallback = (function (_super) {
        __extends(WindowsRuntimeAsyncCallback, _super);
        function WindowsRuntimeAsyncCallback(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        WindowsRuntimeAsyncCallback.prototype.getDescription = function () {
            return Plugin.Resources.getString("WindowsRuntimeAsyncCallbackDescription");
        };
        return WindowsRuntimeAsyncCallback;
    })(ProfilerEvent);
    VisualProfiler.WindowsRuntimeAsyncCallback = WindowsRuntimeAsyncCallback;

    var DDTrackerEvent = (function (_super) {
        __extends(DDTrackerEvent, _super);
        function DDTrackerEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        DDTrackerEvent.prototype.createName = function () {
            var ddtrackerInterval = this.interval;

            if (ddtrackerInterval.ddtrackerBaseClass) {
                switch (ddtrackerInterval.ddtrackerBaseClass) {
                    case "DOM":
                        return Plugin.Resources.getString("DOMAccessEvent");

                    case "Layout":
                        return Plugin.Resources.getString("DDTrackerLayoutDetailHeader");

                    case "CSS":
                        if (ddtrackerInterval.ddtrackerTaskResource == "TASK_Fi") {
                            return Plugin.Resources.getString("CssCalculation");
                        }

                        return Plugin.Resources.getString("DDTrackerStyleComputationDetailHeader");
                }
            }

            return "";
        };

        DDTrackerEvent.prototype.getDetails = function (sourceInfo) {
            var result = [];

            var ddtrackerInterval = this.interval;

            if (ddtrackerInterval.ddtrackerBaseClass) {
                switch (ddtrackerInterval.ddtrackerBaseClass) {
                    case "DOM":
                        result.push(this.createDetailInfo("Access type", this.getDDTrackerTaskName(), "AccessTypeLabel", null));
                        break;
                    case "Layout":
                        var layoutMode = this.getDDTrackerTaskName();
                        if (layoutMode) {
                            result.push(this.createDetailInfo("Category", layoutMode, "LayoutModeLabel", null));
                        }

                        break;
                }
            }

            var elementValue = ProfilerEvent.createElementString(this.getDDTrackerElementTag(), this.getDDTrackerElementId(), this.getDDTrackerElementClass());
            if (elementValue !== "" && elementValue !== "<root>") {
                result.push(this.createDetailInfo("Element", elementValue, "DDTrackerElementLabel", null));
            }

            return result;
        };

        DDTrackerEvent.prototype.getDescription = function () {
            if (typeof this._description === "undefined") {
                this._description = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.ddtrackerBaseClass) {
                    switch (ddtrackerInterval.ddtrackerBaseClass) {
                        case "DOM":
                            this._description = Plugin.Resources.getString("DDTrackerDOMDescription");
                            break;
                        case "Layout":
                            this._description = Plugin.Resources.getString("DDTrackerLayoutDescription");
                            break;
                        case "CSS":
                            if (ddtrackerInterval.ddtrackerTaskResource == "TASK_Fi") {
                                this._description = Plugin.Resources.getString("CssCalculationEventDescription");
                            } else {
                                this._description = Plugin.Resources.getString("DDTrackerStyleChangeDescription");
                            }

                            break;
                    }
                }
            }

            return this._description;
        };

        DDTrackerEvent.prototype.getDDTrackerTaskName = function () {
            if (typeof this._ddtrackerTaskName === "undefined") {
                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.isSetStyle) {
                    var styleProp = Common.FormattingHelpers.stripNewLine(ddtrackerInterval.styleProperty);
                    var newValue = Common.FormattingHelpers.stripNewLine(ddtrackerInterval.newValue);

                    this._ddtrackerTaskName = Plugin.Resources.getString("DDTrackerSetStyleContextName", styleProp, newValue);
                } else {
                    this._ddtrackerTaskName = "";

                    if (ddtrackerInterval.ddtrackerBaseClass != "CSS") {
                        if (ddtrackerInterval.ddtrackerTaskString) {
                            this._ddtrackerTaskName = ddtrackerInterval.ddtrackerTaskString;
                        } else if (ddtrackerInterval.ddtrackerTaskResource) {
                            var resourceArgs = [ddtrackerInterval.ddtrackerTaskResource];
                            if (ddtrackerInterval.ddtrackerTaskResourceArgs) {
                                resourceArgs = resourceArgs.concat(ddtrackerInterval.ddtrackerTaskResourceArgs);
                            }

                            this._ddtrackerTaskName = Plugin.Resources.getString.apply(Plugin.Resources, resourceArgs);
                        }
                    }
                }
            }

            return this._ddtrackerTaskName;
        };

        DDTrackerEvent.prototype.getDDTrackerElementTag = function () {
            if (typeof this._ddtrackerElementTag === "undefined") {
                this._ddtrackerElementTag = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.tag) {
                    this._ddtrackerElementTag = ddtrackerInterval.element.tag.toLowerCase();
                }
            }

            return this._ddtrackerElementTag;
        };

        DDTrackerEvent.prototype.getDDTrackerElementId = function () {
            if (typeof this._ddtrackerElementId === "undefined") {
                this._ddtrackerElementId = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.id) {
                    this._ddtrackerElementId = ddtrackerInterval.element.id;
                }
            }

            return this._ddtrackerElementId;
        };

        DDTrackerEvent.prototype.getDDTrackerElementClass = function () {
            if (typeof this._ddtrackerElementClass === "undefined") {
                this._ddtrackerElementClass = "";

                var ddtrackerInterval = this.interval;

                if (ddtrackerInterval.element && ddtrackerInterval.element.class) {
                    this._ddtrackerElementClass = ddtrackerInterval.element.class;
                }
            }

            return this._ddtrackerElementClass;
        };
        return DDTrackerEvent;
    })(ProfilerEvent);
    VisualProfiler.DDTrackerEvent = DDTrackerEvent;

    var FrameEvent = (function (_super) {
        __extends(FrameEvent, _super);
        function FrameEvent(interval, category, uiThreadId) {
            _super.call(this, interval, category, uiThreadId);
        }
        FrameEvent.prototype.getDescription = function () {
            return Plugin.Resources.getString("PaintEventDescription");
        };
        return FrameEvent;
    })(ProfilerEvent);
    VisualProfiler.FrameEvent = FrameEvent;

    var EventFactory = (function () {
        function EventFactory() {
            this._nameToEventMap = {};
            this._nameToEventMap["CssCalculation"] = CssCalculationEvent;
            this._nameToEventMap["CssParsing"] = CssParsingEvent;
            this._nameToEventMap["DDTracker"] = DDTrackerEvent;
            this._nameToEventMap["DomEvent"] = DomEvent;
            this._nameToEventMap["EvaluatingScript"] = EvaluatingScriptEvent;
            this._nameToEventMap["EventHandler"] = EventHandlerEvent;
            this._nameToEventMap["Frame"] = FrameEvent;
            this._nameToEventMap["GarbageCollection"] = GarbageCollectionEvent;
            this._nameToEventMap["HtmlParsing"] = HtmlParsingEvent;
            this._nameToEventMap["HtmlSpeculativeDownloading"] = HtmlSpeculativeDownloadingEvent;
            this._nameToEventMap["HttpRequest"] = HttpRequestEvent;
            this._nameToEventMap["Idle"] = IdleEvent;
            this._nameToEventMap["ImageDecoded"] = ImageDecodedEvent;
            this._nameToEventMap["Layout"] = LayoutEvent;
            this._nameToEventMap["Measure"] = MeasureEvent;
            this._nameToEventMap["MediaQueryListener"] = MediaQueryListenerEvent;
            this._nameToEventMap["MutationObserver"] = MutationObserverEvent;
            this._nameToEventMap["Paint"] = PaintEvent;
            this._nameToEventMap["RenderLayer"] = RenderLayerEvent;
            this._nameToEventMap["TimerFired"] = TimerFiredEvent;
            this._nameToEventMap["WindowsRuntimeEvent"] = WindowsRuntimeEvent;
            this._nameToEventMap["WindowsRuntimeAsyncCallback"] = WindowsRuntimeAsyncCallback;
        }
        EventFactory.prototype.createEvent = function (interval, uiThreadId) {
            var category = (VisualProfiler.EventCategory[interval.category]);
            if (interval.name === "TimerFired") {
                var timerFiredEventInterval = interval;
                if (timerFiredEventInterval.timerType === 3) {
                    return new AnimationFrameEvent(timerFiredEventInterval, category, uiThreadId);
                }
            }

            var eventType = this._nameToEventMap[interval.name];
            if (eventType) {
                return new eventType(interval, category, uiThreadId);
            } else {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1040"));
            }
        };
        return EventFactory;
    })();
    VisualProfiler.EventFactory = EventFactory;

    var EventsTimelineDataSource = (function () {
        function EventsTimelineDataSource(queryResult, uiThreadId, lowestObservedDocumentMode, timeSpan, eventsFactory) {
            this._queryResult = queryResult;
            this._count = this._queryResult.getIntervalsCount();
            this._uiThreadId = uiThreadId;
            this._lowestObservedDocumentMode = lowestObservedDocumentMode;
            this._data = [];
            this._dataPrevious = [];
            this._eventsFactory = eventsFactory;
            this._currentIndex = null;
            this._timeSpan = timeSpan;
        }
        Object.defineProperty(EventsTimelineDataSource.prototype, "count", {
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineDataSource.prototype, "timeSpan", {
            get: function () {
                return this._timeSpan;
            },
            enumerable: true,
            configurable: true
        });

        EventsTimelineDataSource.prototype.collapseBranch = function (index) {
            this._queryResult.collapseIntervalBranch(index);
            this.resetData();
        };

        EventsTimelineDataSource.prototype.expandBranch = function (index) {
            this._queryResult.expandIntervalBranch(index);
            this.resetData();
        };

        EventsTimelineDataSource.prototype.expandFrameForEvent = function (eventId) {
            this._queryResult.expandFrameForEvent(eventId);
            this.resetData();
        };

        EventsTimelineDataSource.prototype.getNext = function (skip) {
            if (this._currentIndex === null) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1057"));
            }

            if (this._currentIndex >= this.count) {
                return null;
            }

            var event = this._data[this._currentIndex];
            if (!event) {
                if (!this.fetchFromPrevious(this._currentIndex, EventsTimelineDataSource._prefetchSize)) {
                    this.fetchData(this._currentIndex, EventsTimelineDataSource._prefetchSize);
                }

                event = this._data[this._currentIndex];
            }

            this._currentIndex++;
            if (!isNaN(skip)) {
                this._currentIndex += skip;
            }

            return event;
        };

        EventsTimelineDataSource.prototype.indexOfItem = function (eventId) {
            return this._queryResult.indexOfInterval(eventId);
        };

        EventsTimelineDataSource.prototype.indexOfParent = function (id) {
            return this._queryResult.indexOfParentInterval(id);
        };

        EventsTimelineDataSource.prototype.getAggregatedDescendantsForEvent = function (eventId) {
            return this._queryResult.getAggregatedDescendantsForEvent(eventId);
        };

        EventsTimelineDataSource.prototype.getSelectionSummary = function () {
            return this._queryResult.getSelectionSummary();
        };

        EventsTimelineDataSource.prototype.startAt = function (index) {
            if (this._currentIndex !== null) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1058"));
            }

            if (isNaN(index) || index < 0 || index >= this.count) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1036"));
            }

            this._currentIndex = index;
            this._data = [];
        };

        EventsTimelineDataSource.prototype.stop = function () {
            this._currentIndex = null;

            this._dataPrevious = this._data;
            this._data = null;
        };

        EventsTimelineDataSource.prototype.fetchData = function (index, max) {
            var fromIndex = Math.max(0, index - max);
            var toIndex = Math.min(this._count, index + max) - 1;
            var intervals = this._queryResult.getIntervals(fromIndex, toIndex);

            var dataIndex = fromIndex;
            for (var i = 0; i < intervals.length; i++, dataIndex++) {
                if (!this._data[dataIndex]) {
                    var interval = intervals[i];
                    this._data[dataIndex] = this._eventsFactory.createEvent(interval, this._uiThreadId);
                }
            }
        };

        EventsTimelineDataSource.prototype.fetchFromPrevious = function (index, max) {
            if (this._dataPrevious[index]) {
                var fromIndex = Math.max(0, index - max);
                var toIndex = Math.min(this._dataPrevious.length, index + max) - 1;
                for (var i = fromIndex; i <= toIndex; i++) {
                    var item = this._dataPrevious[i];
                    if (item) {
                        this._data[i] = item;
                    }
                }

                return true;
            }

            return false;
        };

        EventsTimelineDataSource.prototype.resetData = function () {
            this._dataPrevious = [];
            this._data = [];
            this._count = this._queryResult.getIntervalsCount();
        };
        EventsTimelineDataSource._prefetchSize = 30;
        return EventsTimelineDataSource;
    })();
    VisualProfiler.EventsTimelineDataSource = EventsTimelineDataSource;

    var EventsTimelineModel = (function () {
        function EventsTimelineModel(session) {
            this._eventFactory = new EventFactory();
            this._session = session;
        }
        EventsTimelineModel.prototype.getEvents = function (timeSpan, sort, filter) {
            var _this = this;
            return this._session.queryEventIntervals(timeSpan.begin.nsec, timeSpan.end.nsec, sort, filter).then(function (intervalsQuery) {
                var uiThreadId = _this._session.getUIThreadId();
                var lowestObservedDocumentMode = _this._session.getLowestObservedDocumentMode();

                return new EventsTimelineDataSource(intervalsQuery, uiThreadId, lowestObservedDocumentMode, timeSpan, _this._eventFactory);
            });
        };
        return EventsTimelineModel;
    })();
    VisualProfiler.EventsTimelineModel = EventsTimelineModel;

    var EventsTimelineViewModel = (function (_super) {
        __extends(EventsTimelineViewModel, _super);
        function EventsTimelineViewModel(model, globalRuler, markEventModel) {
            var _this = this;
            _super.call(this);

            this._model = model;
            this._globalRuler = globalRuler;
            this._markEventModel = markEventModel;
            this._globalRuler.addEventListener(VisualProfiler.GlobalRuler.SelectionChangedEventType, function (e) {
                return _this.onRulerSelectionChanged(e);
            });
            this.timeSpan = this._globalRuler.totalRange;

            var msAbbreviation = Plugin.Resources.getString("MillisecondsAbbreviation");
            this.durationFilterOptions = [
                { value: "0", text: Plugin.Resources.getString("DurationFilterAll"), tooltip: Plugin.Resources.getString("DurationFilterTooltip") },
                { value: EventsTimelineViewModel.ONE_MS_IN_NS.toString(), text: Plugin.Resources.getString("DurationFilterTimed", EventsTimelineViewModel.ONE_MS_IN_NS / 1000 / 1000 + msAbbreviation), tooltip: Plugin.Resources.getString("DurationFilterTooltip") }
            ];

            this.sortOptions = [
                { value: "0", text: Plugin.Resources.getString("TimelineSortStartTime"), tooltip: Plugin.Resources.getString("TimelineSortTooltip") },
                { value: "1", text: Plugin.Resources.getString("TimelineSortDuration"), tooltip: Plugin.Resources.getString("TimelineSortTooltip") }
            ];
        }
        Object.defineProperty(EventsTimelineViewModel.prototype, "globalRuler", {
            get: function () {
                return this._globalRuler;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineViewModel.prototype, "selectedEvent", {
            get: function () {
                return this._selectedEvent;
            },
            set: function (event) {
                if (this._selectedEvent !== event) {
                    this._selectedEvent = event;

                    if (this.selectedEventChanged) {
                        this.selectedEventChanged(this._selectedEvent);
                    }

                    Notifications.notify(VisualProfiler.ResponsivenessNotifications.GridRowSelected);
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(EventsTimelineViewModel.prototype, "timeSpan", {
            get: function () {
                return this._timeSpan;
            },
            set: function (value) {
                if ((value === undefined && this._timeSpan !== undefined) || (value !== undefined && this._timeSpan === undefined) || (value !== undefined && this._timeSpan !== undefined && !value.equals(this._timeSpan))) {
                    this._timeSpan = value;
                    this._isDataSourceInvalid = true;
                    if (this.timeSpanChanged) {
                        this.timeSpanChanged();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });


        EventsTimelineViewModel.initialize = function () {
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.DisplayBackgroundActivitiesPropertyName, false, function (obj) {
                return obj.onFilterChange();
            }, function (obj) {
                return obj.onFilterChanging();
            });
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.DisplayFramesPropertyName, false, function (obj) {
                return obj.onFilterChange();
            }, function (obj) {
                return obj.onFilterChanging();
            });
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.DisplayMeasuresPropertyName, true, function (obj) {
                return obj.onFilterChange();
            }, function (obj) {
                return obj.onFilterChanging();
            });
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.DisplayNetworkActivitiesPropertyName, true, function (obj) {
                return obj.onFilterChange();
            }, function (obj) {
                return obj.onFilterChanging();
            });
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.DisplayUIActivitiesPropertyName, true, function (obj) {
                return obj.onFilterChange();
            }, function (obj) {
                return obj.onFilterChanging();
            });
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.DurationFilterPropertyName, 0, function (obj) {
                return obj.onFilterChange();
            }, function (obj) {
                return obj.onFilterChanging();
            });
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.EventNameFilterPropertyName, "", function (obj) {
                return obj.onFilterChange();
            }, function (obj) {
                return obj.onFilterChanging();
            });
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.HasFilterPropertyName, true, null, null);
            Common.ObservableHelpers.defineProperty(EventsTimelineViewModel, EventsTimelineViewModel.SortPropertyName, 0, null, function (obj) {
                return obj.onFilterChanging();
            });
        };

        EventsTimelineViewModel.prototype.getEventDetails = function (event) {
            var detailsRequests = event.getEventDetailsRequestInformation();
            if (!detailsRequests || detailsRequests.length === 0) {
                return event.getDetails();
            }

            var result = [];
            for (var i = 0; i < detailsRequests.length; i++) {
                var detailRequest = detailsRequests[i];

                if (detailRequest.isSourceRequest) {
                    var sourceRequest = detailRequest;
                    try  {
                        var sourceDetails = sourceRequest.sourceInfo;
                        result = result.concat(event.getDetails(sourceDetails));
                    } catch (e) {
                    }
                } else {
                    result = result.concat(event.getDetails());
                }
            }

            return result;
        };

        EventsTimelineViewModel.prototype.getEvents = function () {
            var _this = this;
            if (this._gettingEventsPromise) {
                this._gettingEventsPromise.cancel();
                this._gettingEventsPromise = null;
            }

            if (this._isDataSourceInvalid) {
                var filter = {
                    eventNameFilter: this.eventNameFilter,
                    filterBackgroundActivities: !this.displayBackgroundActivities,
                    filterFrames: !this.displayFrames,
                    filterMeasures: !this.displayMeasures,
                    filterNegligibleUIActivities: this.durationFilter,
                    filterNetworkActivities: !this.displayNetworkActivities,
                    filterUIActivities: !this.displayUIActivities
                };

                this._gettingEventsPromise = this._model.getEvents(this._timeSpan, this.sort, filter).then(function (dataSource) {
                    _this._dataSource = dataSource;
                    _this._isDataSourceInvalid = false;
                    _this._gettingEventsPromise = null;

                    if (_this.displayFrames && _this._selectedEvent) {
                        _this._dataSource.expandFrameForEvent(_this._selectedEvent.id);
                    }

                    return _this._dataSource;
                });
                return this._gettingEventsPromise;
            }

            return Plugin.Promise.as(this._dataSource);
        };

        EventsTimelineViewModel.prototype.getMarks = function (category) {
            return this._markEventModel.getMarkEvents(this._globalRuler.totalRange, category);
        };

        EventsTimelineViewModel.prototype.getMarkTooltip = function (mark) {
            return this._markEventModel.getMarkTooltip(mark);
        };

        EventsTimelineViewModel.prototype.getVerticalRulerLinePositions = function (viewWidth) {
            return DiagnosticsHub.RulerUtilities.getVerticalLinePositions(this._timeSpan.toJsonTimespan(), viewWidth);
        };

        EventsTimelineViewModel.prototype.resetFilter = function () {
            this.displayBackgroundActivities = undefined;
            this.displayFrames = undefined;
            this.displayMeasures = undefined;
            this.displayNetworkActivities = undefined;
            this.displayUIActivities = undefined;
            this.durationFilter = undefined;
            this.eventNameFilter = undefined;
            this.hasFilter = undefined;
            this.sort = undefined;
        };

        EventsTimelineViewModel.prototype.onFilterChange = function () {
            this.hasFilter = !this.displayBackgroundActivities || !this.displayMeasures || !this.displayNetworkActivities || !this.displayUIActivities || this.durationFilter > 0 || !!this.eventNameFilter;
        };

        EventsTimelineViewModel.prototype.onFilterChanging = function () {
            this._isDataSourceInvalid = true;
        };

        EventsTimelineViewModel.prototype.onRulerSelectionChanged = function (args) {
            this.timeSpan = new VisualProfiler.TimeSpan(this._globalRuler.selection.begin, this._globalRuler.selection.end);
        };
        EventsTimelineViewModel.ONE_MS_IN_NS = 1 * 1000 * 1000;

        EventsTimelineViewModel.DisplayBackgroundActivitiesPropertyName = "displayBackgroundActivities";
        EventsTimelineViewModel.DisplayFramesPropertyName = "displayFrames";
        EventsTimelineViewModel.DisplayMeasuresPropertyName = "displayMeasures";
        EventsTimelineViewModel.DisplayNetworkActivitiesPropertyName = "displayNetworkActivities";
        EventsTimelineViewModel.DisplayUIActivitiesPropertyName = "displayUIActivities";
        EventsTimelineViewModel.DurationFilterPropertyName = "durationFilter";
        EventsTimelineViewModel.EventNameFilterPropertyName = "eventNameFilter";
        EventsTimelineViewModel.HasFilterPropertyName = "hasFilter";
        EventsTimelineViewModel.SortPropertyName = "sort";
        return EventsTimelineViewModel;
    })(Common.Observable);
    VisualProfiler.EventsTimelineViewModel = EventsTimelineViewModel;

    EventsTimelineViewModel.initialize();

    var EventDetailsView = (function (_super) {
        __extends(EventDetailsView, _super);
        function EventDetailsView(event, details, descendants, timeSpan) {
            var _this = this;
            _super.call(this, "eventDetailsTemplate");

            this.initializeEventGroup();

            this._imagePreviewSeparator = this.findElement("imagePreviewSeparator");
            this._imagePreviewContainer = this.findElement("imagePreviewContainer");

            this._aggregatedDescendants = descendants;

            if (event === null) {
                if (this._aggregatedDescendants) {
                    this.displaySelectionSummaryFields(timeSpan.elapsed, timeSpan.begin);
                    this.displayInclusiveTimeSummary(false);
                }
            } else {
                this._details = details;
                this._event = event;
                this.displayCommonFields();
                this.displayEventSpecificFields();
                this.displayInclusiveTimeSummary(true);

                if (this._event instanceof HttpRequestEvent || this._event instanceof ImageDecodedEvent) {
                    this.displayImagePreview();
                }

                var cells = this.findElementsByClassName("eventCell");
                for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
                    var cell = cells[cellIndex];
                    (function (value) {
                        if (cell.classList.contains("BPT-FileLink")) {
                            cell.addEventListener("mouseover", function (e) {
                                return VisualProfiler.EventDataTemplate.showSourceInfoTooltip(e, _this._event.context.sourceInfo);
                            });
                        } else {
                            cell.addEventListener("mouseover", function (e) {
                                return EventDetailsView.showCellTooltip(e, value);
                            });
                        }

                        cell.addEventListener("mouseout", function (e) {
                            return Plugin.Tooltip.dismiss();
                        });
                    })(cell.textContent);
                }
            }
        }
        EventDetailsView.getCssClass = function (category) {
            switch (category) {
                case "Loading":
                    return "dataLoading";
                case "Scripting":
                    return "dataScripting";
                case "GC":
                    return "dataScriptingGc";
                case "Styling":
                    return "dataStyling";
                case "Rendering":
                    return "dataRendering";
                case "ImageDecoding":
                    return "dataImageDecoding";
                case "Frame":
                    return "dataFrame";
                case "Idle":
                    return "dataIdle";
                case "Unknown":
                    return "dataOther";
                default:
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1033"));
            }
        };

        EventDetailsView.isValidImageUrl = function (url) {
            return (EventDetailsView.IMG_URL_REGEX.test(url) && navigator.onLine) || EventDetailsView.IMG_DATA_URI_REGEX.test(url) || EventDetailsView.MS_APP_IMG_REGEX.test(url);
        };

        EventDetailsView.showCellTooltip = function (mouseEvent, text) {
            var div = mouseEvent.currentTarget;

            if (div.offsetWidth < div.scrollWidth) {
                var config = {
                    content: text
                };
                Plugin.Tooltip.show(config);
            }
        };

        EventDetailsView.prototype.createDiv = function (value) {
            var classNames = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                classNames[_i] = arguments[_i + 1];
            }
            var div = document.createElement("div");

            if (Common.TokenExtractor.isHtmlExpression(value)) {
                VisualProfiler.EventDataTemplate.addTokens(value, div, 0 /* Html */);
            } else if (Common.TokenExtractor.isStringExpression(value)) {
                VisualProfiler.EventDataTemplate.addTokens(value, div, 1 /* String */);
            } else {
                div.textContent = value;
            }

            if (classNames) {
                for (var index = 0; index < classNames.length; index++) {
                    div.classList.add(classNames[index]);
                }
            }

            return div;
        };

        EventDetailsView.prototype.displayCommonFields = function () {
            var durationLabelExc = this.findElement("durationLabelExc");
            var durationValueExc = this.findElement("durationValueExc");
            var durationIncRow = this.findElement("durationIncRow");
            var durationLabelInc = this.findElement("durationLabelInc");
            var durationValueInc = this.findElement("durationValueInc");
            var startTimeLabel = this.findElement("startTimeLabel");
            var startTimeValue = this.findElement("startTimeValue");
            var threadContextRow = this.findElement("threadContextRow");
            var threadContextLabel = this.findElement("threadContextLabel");
            var threadContextValue = this.findElement("threadContextValue");
            var description = this.findElement("eventDetailsDescription");

            durationIncRow.classList.remove("BPT-hidden");
            durationLabelExc.textContent = Plugin.Resources.getString("DurationLabelExclusive", "");
            durationValueExc.textContent = VisualProfiler.FormattingHelpers.getPrettyPrintTime(this._event.exclusiveDuration);

            durationLabelInc.textContent = Plugin.Resources.getString("DurationLabelInclusive", "");
            durationValueInc.textContent = VisualProfiler.FormattingHelpers.getPrettyPrintTime(this._event.timeSpan.elapsed);

            startTimeLabel.textContent = Plugin.Resources.getString("StartTimeLabel", "");
            startTimeValue.textContent = VisualProfiler.FormattingHelpers.getPrettyPrintTime(this._event.timeSpan.begin);

            var threadContext = this.getThreadContext();

            if (threadContext !== "0") {
                threadContextRow.classList.remove("BPT-hidden");
                threadContextLabel.textContent = Plugin.Resources.getString("ThreadContextLabel", "");
                threadContextValue.textContent = threadContext;
            }

            description.classList.remove("BPT-hidden");
            description.textContent = this._event.getDescription();
        };

        EventDetailsView.prototype.displayImagePreview = function () {
            var _this = this;
            var url;
            for (var i = 0; i < this._details.length; i++) {
                if (this._details[i].localizedName === Plugin.Resources.getString("AddressNameLabel") || this._details[i].localizedName === Plugin.Resources.getString("ImageUrlLabel")) {
                    url = this._details[i].localizedValue;
                    break;
                }
            }

            if (this._event instanceof ImageDecodedEvent || EventDetailsView.isValidImageUrl(url)) {
                var img = this.findElement("imagePreview");
                img.onload = function (e) {
                    if (img.width > 1 && img.height > 1) {
                        var div = _this.findElement("imagePreviewHeader");
                        div.textContent = Plugin.Resources.getString("ImagePreviewHeader", img.width, img.height);

                        _this._imagePreviewSeparator.classList.remove("BPT-hidden");
                        _this._imagePreviewContainer.classList.remove("BPT-hidden");
                    }
                };

                if (EventDetailsView.MS_APP_IMG_REGEX.test(url)) {
                    Plugin.Host.getDocumentLocation(url).done(function (imgPath) {
                        img.src = imgPath;
                    });
                } else {
                    img.src = url;
                }
            }
        };

        EventDetailsView.prototype.displayInclusiveTimeSummary = function (isEventSelected) {
            var _this = this;
            var donutContainer = this.findElement("inclusiveTimeBreakDownDetails");

            if ((isEventSelected && this._aggregatedDescendants.length <= 1) || (!isEventSelected && this._aggregatedDescendants.length === 0)) {
                return;
            }

            if (typeof this._donutChartViewModel === "undefined") {
                this._donutChartViewModel = new VisualProfiler.DonutChartViewModel(donutContainer);
                this._donutChartViewModel.view.addSectorAriaLabel = function (sector, percent) {
                    var timeStamp = VisualProfiler.FormattingHelpers.getPrettyPrintTime(new VisualProfiler.TimeStamp(sector.value));
                    return Plugin.Resources.getString("DonutSectorAriaLabel", sector.name, percent, timeStamp);
                };
            }

            if (this._event) {
                this._donutChartViewModel.model.headerText = Plugin.Resources.getString("InclusiveTimeDetailsHeader");
            } else {
                this._donutChartViewModel.model.headerText = Plugin.Resources.getString("UIThreadSummaryHeader");
            }

            var sectors = this.createSectors(this._aggregatedDescendants);

            sectors.forEach(function (sector) {
                _this._donutChartViewModel.model.addSector(sector);
            });

            var sectorCount = this._donutChartViewModel.model.sectors.length;
            if ((isEventSelected && sectorCount > 1) || (!isEventSelected && sectorCount > 0)) {
                donutContainer.classList.remove("BPT-hidden");

                if (isEventSelected) {
                    var inclusiveSeparator = this.findElement("inclusiveTimeDetailSeparator");
                    inclusiveSeparator.classList.remove("BPT-hidden");
                }

                this._donutChartViewModel.view.render();
            }
        };

        EventDetailsView.prototype.createSectors = function (eventDatas) {
            var eventFactory = new EventFactory();
            var sectors = [];
            for (var i = 0; i < eventDatas.length; i++) {
                var eventData = eventDatas[i];
                var interval = {
                    begin: 0,
                    beginThreadId: 0,
                    category: eventData.category,
                    childrenCount: 0,
                    end: 0,
                    endThreadId: 0,
                    exclusiveDuration: 0,
                    fullName: undefined,
                    id: -1,
                    isExpanded: false,
                    level: -1,
                    name: eventData.name
                };

                if (eventData.name === "DDTracker" && typeof eventData.ddTrackerProp !== "undefined") {
                    var ddTrackerInterval = interval;
                    ddTrackerInterval.ddtrackerTaskString = eventData.ddTrackerProp.ddtrackerTaskString;
                    ddTrackerInterval.ddtrackerTaskResource = eventData.ddTrackerProp.ddtrackerTaskResource;
                    ddTrackerInterval.ddtrackerTaskResourceArgs = eventData.ddTrackerProp.ddtrackerTaskResourceArgs;
                    ddTrackerInterval.ddtrackerBaseClass = eventData.ddTrackerProp.ddtrackerBaseClass;
                }

                var event = eventFactory.createEvent(interval, 0);
                sectors.push({ name: event.name, cssClass: EventDetailsView.getCssClass(eventData.category), value: eventData.value });
            }

            return this.groupEventTypes(sectors);
        };

        EventDetailsView.prototype.initializeEventGroup = function () {
            this._eventGroupsMap = {};
            this._eventGroupsMap[Plugin.Resources.getString("DomEvent")] = Plugin.Resources.getString("DomEvent");
            this._eventGroupsMap[Plugin.Resources.getString("EventHandler")] = Plugin.Resources.getString("DomEvent");
            this._eventGroupsMap[Plugin.Resources.getString("Layout")] = Plugin.Resources.getString("Layout");
            this._eventGroupsMap[Plugin.Resources.getString("DDTrackerLayoutDetailHeader")] = Plugin.Resources.getString("Layout");
            this._eventGroupsMap[Plugin.Resources.getString("CssCalculation")] = Plugin.Resources.getString("CssCalculation");
            this._eventGroupsMap[Plugin.Resources.getString("DDTrackerStyleComputationDetailHeader")] = Plugin.Resources.getString("CssCalculation");
            this._eventGroupsMap[Plugin.Resources.getString("Paint")] = Plugin.Resources.getString("Paint");
            this._eventGroupsMap[Plugin.Resources.getString("RenderLayer")] = Plugin.Resources.getString("Paint");
        };

        EventDetailsView.prototype.groupEventTypes = function (sectors) {
            var group;

            var groupMap = {};

            for (var i = 0; i < sectors.length; i++) {
                var sector = sectors[i];
                var groupEventName = this._eventGroupsMap[sector.name];

                if (typeof groupEventName !== "undefined") {
                    group = groupMap[groupEventName];

                    if (typeof group === "undefined") {
                        groupMap[groupEventName] = sector;
                        groupMap[groupEventName].name = groupEventName;
                    } else {
                        if (sector.name === groupEventName) {
                            groupMap[groupEventName] = sector;
                            sector.value += group.value;
                        } else {
                            group.value += sector.value;
                        }
                    }
                } else {
                    groupMap[sector.name] = sector;
                }
            }

            var groupedSectors = [];
            for (var key in groupMap) {
                groupedSectors.push(groupMap[key]);
            }

            return groupedSectors;
        };

        EventDetailsView.prototype.displayEventSpecificFields = function () {
            if (!this._details) {
                return;
            }

            var additionalDetailsContainer = this.findElement("additionalDetails");

            for (var i = 0; i < this._details.length; i++) {
                var detail = this._details[i];

                if (detail.sourceInfo && detail.sourceInfo.source === "<DOM>") {
                    continue;
                }

                var nameDiv = this.createDiv(detail.localizedName + ":", "eventCell", "name");
                var valueDiv = this.createDiv(detail.localizedValue, "eventCell", "value");

                if (detail.sourceInfo) {
                    valueDiv.className += " BPT-FileLink";
                    valueDiv.setAttribute("role", "link");
                    VisualProfiler.EventDataTemplate.setViewSourceHandler(valueDiv, detail.sourceInfo, true);
                }

                var additionalDetailsLabelValuePair = this.createDiv("", "eventRow");
                additionalDetailsLabelValuePair.appendChild(nameDiv);
                additionalDetailsLabelValuePair.appendChild(valueDiv);
                additionalDetailsContainer.appendChild(additionalDetailsLabelValuePair);
            }
        };

        EventDetailsView.prototype.displaySelectionSummaryFields = function (duration, start) {
            var durationLabelExc = this.findElement("durationLabelExc");
            var durationValueExc = this.findElement("durationValueExc");
            var startTimeLabel = this.findElement("startTimeLabel");
            var startTimeValue = this.findElement("startTimeValue");

            durationLabelExc.textContent = Plugin.Resources.getString("SelectionDurationLabel", "");
            durationValueExc.textContent = VisualProfiler.FormattingHelpers.getPrettyPrintTime(duration);

            startTimeLabel.textContent = Plugin.Resources.getString("StartTimeLabel", "");
            startTimeValue.textContent = VisualProfiler.FormattingHelpers.getPrettyPrintTime(start);
        };

        EventDetailsView.prototype.getThreadContext = function () {
            var threadId = this._event.contextThreadId;
            if (threadId !== null) {
                if (this._event.category === 3 /* Rendering */) {
                    return Plugin.Resources.getString("RenderThread");
                } else if (this._event instanceof HttpRequestEvent) {
                    return Plugin.Resources.getString("DownloadThread");
                } else {
                    return threadId.toString();
                }
            }

            return Plugin.Resources.getString("UIThreadContext");
        };
        EventDetailsView.IMG_URL_REGEX = /^(http|https).*([.jpg]|[.jpeg]|[.gif]|[.png])$/i;
        EventDetailsView.IMG_DATA_URI_REGEX = /^(data:image\/).*$/i;
        EventDetailsView.MS_APP_IMG_REGEX = /^(ms-appx(-web)?:\/\/).*$/i;
        return EventDetailsView;
    })(Common.Controls.Legacy.TemplateControl);
    VisualProfiler.EventDetailsView = EventDetailsView;

    var EventsTimelineView = (function (_super) {
        __extends(EventsTimelineView, _super);
        function EventsTimelineView(parentContainerId) {
            var _this = this;
            _super.call(this, "timelineViewTemplate");

            this._parentContainer = document.getElementById(parentContainerId);

            if (!this._parentContainer) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1034"));
            }

            this._eventDetailsHeaderClass = "emptyHeader";
            this._eventDetailsTitle = this.findElement("eventDetailsTitle");
            this._timelineDetailsHeader = this.findElement("timelineDetailsHeader");
            this._timelineDetailsPaneContainer = this.findElement("timelineDetailsPaneContainer");
            this._timelineViewAndDetailsContainer = this.findElement("timelineViewAndDetails");
            this._timelineLabel = this.findElement("timelineLabel");
            this._timelineView = this.findElement("timelineView");

            this._timelineLabel.textContent = Plugin.Resources.getString("TimelineLabel");

            var sortFilterSection = this.findElement("sortFilterSection");
            this._filteringBar = new Common.TemplateControl("VisualProfiler.filteringBarTemplate");

            sortFilterSection.appendChild(this._filteringBar.rootElement);

            this._listControl = new VisualProfiler.EventsTimelineListControl(this._timelineView);
            this._listControl.dataColumnWidthChanged = this.onListControlDataColumnWidthChanged.bind(this);

            this._parentContainer.appendChild(this.rootElement);

            this._onResizeHandler = function () {
                _this._columnsCssRule = _this.getColumnsCssRule();
                _this._listControl.invalidateSizeCache();
                _this.updateDetailsDivider();

                _this.render();
            };

            this.registerResizeEvent();

            this._eventHeaderDivider = this.findElement("timelineEventHeaderDivider");
            this._eventHeaderDivider.style.left = this._listControl.eventNameColumnWidth + "px";

            this._eventHeaderLabel = this.findElement("timelineEventHeaderLabel");
            this._eventHeaderLabel.textContent = Plugin.Resources.getString("EventHeaderLabel");
            this._eventHeaderLabel.style.width = this._listControl.eventNameColumnWidth + "px";

            this._rulerContainer = this.findElement("timelineRuler");

            this._columnsCssRule = this.getColumnsCssRule();
            this._eventDetailsDivider = new VisualProfiler.Divider(this._timelineViewAndDetailsContainer, 0);
            this._eventDetailsDivider.onMoved = this.onResizeDetails.bind(this);

            this.createFilteringMenu();
        }
        Object.defineProperty(EventsTimelineView.prototype, "detailsView", {
            get: function () {
                return this._detailsView;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineView.prototype, "listControl", {
            get: function () {
                return this._listControl;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(EventsTimelineView.prototype, "viewModel", {
            get: function () {
                return this._viewModel;
            },
            set: function (value) {
                this.unregisterViewModelEvents();
                this._listControl.dataSource = null;

                this._viewModel = value;

                this._filteringBar.model = this._viewModel;
                this._filteringMenu.model = this._viewModel;

                this.createRuler();

                this.updateDetailsPane(null);
                this.updateDetailsDivider();
                this.registerViewModelEvents();
            },
            enumerable: true,
            configurable: true
        });


        EventsTimelineView.getCssRule = function (styleSheetName, selectorName) {
            var styleSheet = document.styleSheets[styleSheetName];

            if (styleSheet) {
                for (var i = 0; i < styleSheet.rules.length; ++i) {
                    var rule = styleSheet.rules[i];

                    if (rule && rule.selectorText === selectorName) {
                        return rule;
                    }
                }
            }

            return null;
        };

        EventsTimelineView.prototype.render = function () {
            var _this = this;
            if (this._viewModel) {
                this.unregisterResizeEvent();
                return this._viewModel.getEvents().then(function (dataSource) {
                    var timeSpan = _this._viewModel.timeSpan;

                    _this._listControl.dataSource = dataSource;
                    _this._listControl.timeSpan = timeSpan;
                    _this._listControl.viewModel = _this._viewModel;
                    _this._listControl.rulerScale = _this._rulerScale;
                    _this._listControl.selectedItemChanged = _this.onSelectedEventChanged.bind(_this);
                    _this._listControl.render();

                    _this.setRulerRect();
                    _this._rulerScale.setTimeRange(timeSpan.toJsonTimespan());
                    _this._rulerScale.render();

                    _this._listControl.renderVerticalRulerLines();

                    if (!_this._listControl.selectedItem) {
                        _this.updateDetailsPane(null);
                    }

                    _this.registerResizeEvent();
                }, function (err) {
                    _this.registerResizeEvent();
                });
            } else {
                return Plugin.Promise.as(null);
            }
        };

        EventsTimelineView.showTooltip = function (resourceId) {
            var config = {
                content: Plugin.Resources.getString(resourceId)
            };
            Plugin.Tooltip.show(config);
        };

        EventsTimelineView.prototype.createFilteringMenu = function () {
            var filteringMenuButton = this._filteringBar.getNamedControl("filteringMenuButton");

            this._filteringMenu = new Common.Controls.MenuControl();
            this._filteringMenu.menuItemsTemplateId = "VisualProfiler.filteringMenuDropDown";
            this._filteringMenu.targetButtonElement = filteringMenuButton.rootElement;
            this._filteringMenu.dismissOnMenuItemClick = true;
            this._filteringMenu.dismissOnTargetButtonClick = true;
            this.rootElement.appendChild(this._filteringMenu.rootElement);
        };

        EventsTimelineView.prototype.createRuler = function () {
            var _this = this;
            if (this._gettingMarksPromise) {
                this._gettingMarksPromise.cancel();
                this._gettingMarksPromise = null;
            }

            var lifecycleData = [];
            var userMarkData = [];

            if (this._rulerScale) {
                this._rulerScale.deinitialize();
            }

            this._rulerScale = new DiagnosticsHub.RulerScale({
                containerId: this._rulerContainer.id,
                timeRange: this._viewModel ? this._viewModel.timeSpan.toJsonTimespan() : new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(0, 0), new DiagnosticsHub.BigNumber(0, 0)),
                series: []
            });

            if (this._viewModel) {
                var lifecycleMarksPromise = this._viewModel.getMarks(0).then(function (lifecycleMarks) {
                    lifecycleData = lifecycleMarks;
                });

                var userMarksPromise = this._viewModel.getMarks(1).then(function (userMarks) {
                    userMarkData = userMarks;
                });

                this._gettingMarksPromise = Plugin.Promise.join([lifecycleMarksPromise, userMarksPromise]).then(function () {
                    _this._rulerScale = new DiagnosticsHub.RulerScale({
                        id: undefined,
                        className: undefined,
                        containerId: _this._rulerContainer.id,
                        timeRange: _this._viewModel.timeSpan.toJsonTimespan(),
                        imageTokenList: ["vs-image-graph-user-mark", "vs-image-graph-app-event"],
                        aggregatedImageToken: "vs-image-graph-aggregated-event",
                        series: [
                            { index: 0, id: DiagnosticsHub.MarkType.UserMark, label: Plugin.Resources.getString("RulerUserMarkLabel"), data: userMarkData },
                            { index: 1, id: DiagnosticsHub.MarkType.LifeCycleEvent, label: Plugin.Resources.getString("RulerLifecycleMarkLabel"), data: lifecycleData }
                        ]
                    });
                    _this._rulerScale.render();
                });

                this._gettingMarksPromise.done(function () {
                    _this._gettingMarksPromise = null;
                });
            } else {
                this._rulerScale.render();
            }
        };

        EventsTimelineView.prototype.getColumnsCssRule = function () {
            return EventsTimelineView.getCssRule("VisualProfiler.css", ".mainView .dataViewContainer .detailedViewsContainer .timelineViewContainer .timelineViewGroup .timelineViewAndDetails");
        };

        EventsTimelineView.prototype.onResizeDetails = function (offsetX) {
            this.updateColumnWidth(offsetX);

            VisualProfiler.Program.triggerResize();
        };

        EventsTimelineView.prototype.onSelectedEventChanged = function (event) {
            this._viewModel.selectedEvent = event;
        };

        EventsTimelineView.prototype.onListControlDataColumnWidthChanged = function () {
            this._eventHeaderDivider.style.left = this._listControl.eventNameColumnWidth + "px";
            this._eventHeaderLabel.style.width = this._listControl.eventNameColumnWidth + "px";
            this.setRulerRect();
            this._rulerScale.render();
        };

        EventsTimelineView.prototype.onSortChanged = function () {
            VisualProfiler.Program.traceWriter.raiseEvent(103 /* Timeline_GridSort_Start */);
            this.render().done(function () {
                Notifications.notify(VisualProfiler.ResponsivenessNotifications.SortFinishedOnGrid);
                VisualProfiler.Program.traceWriter.raiseEvent(104 /* Timeline_GridSort_Stop */);
            });
        };

        EventsTimelineView.prototype.onTimeSpanChanged = function () {
            this.render().done(function () {
                Notifications.notify(VisualProfiler.ResponsivenessNotifications.GridUpdatedForTimeSelection);
            });
        };

        EventsTimelineView.prototype.onToggleFilter = function (traceEventStart, traceEventStop) {
            if (traceEventStart !== undefined) {
                VisualProfiler.Program.traceWriter.raiseEvent(traceEventStart);
            }

            this.render().done(function () {
                if (traceEventStop !== undefined) {
                    VisualProfiler.Program.traceWriter.raiseEvent(traceEventStop);
                }
            });
        };

        EventsTimelineView.prototype.onEventNameFilterChange = function () {
            var _this = this;
            clearTimeout(this._eventNameFilterResponseTimeoutHandle);
            this._eventNameFilterResponseTimeoutHandle = setTimeout(function () {
                VisualProfiler.Program.traceWriter.raiseEvent(119 /* Timeline_GridUpdatedForFilterName_Start */);
                _this.render().done(function () {
                    VisualProfiler.Program.traceWriter.raiseEvent(120 /* Timeline_GridUpdatedForFilterName_Stop */);
                    Notifications.notify(VisualProfiler.ResponsivenessNotifications.GridUpdatedForFilter);
                });
            }, 200);
        };

        EventsTimelineView.prototype.onViewModelPropertyChanged = function (propName) {
            switch (propName) {
                case EventsTimelineViewModel.DisplayBackgroundActivitiesPropertyName:
                    this.onToggleFilter(111 /* Timeline_GridUpdatedForFilterBackground_Start */, 112 /* Timeline_GridUpdatedForFilterBackground_Stop */);
                    break;

                case EventsTimelineViewModel.DisplayFramesPropertyName:
                    this.onToggleFilter(117 /* Timeline_GridUpdatedForFilterFrames_Start */, 118 /* Timeline_GridUpdatedForFilterFrames_Stop */);
                    break;

                case EventsTimelineViewModel.DisplayMeasuresPropertyName:
                    this.onToggleFilter(115 /* Timeline_GridUpdatedForFilterMeasures_Start */, 116 /* Timeline_GridUpdatedForFilterMeasures_Stop */);
                    break;

                case EventsTimelineViewModel.DisplayNetworkActivitiesPropertyName:
                    this.onToggleFilter(113 /* Timeline_GridUpdatedForFilterNetwork_Start */, 114 /* Timeline_GridUpdatedForFilterNetwork_Stop */);
                    break;

                case EventsTimelineViewModel.DisplayUIActivitiesPropertyName:
                case EventsTimelineViewModel.DurationFilterPropertyName:
                    this.onToggleFilter();
                    break;

                case EventsTimelineViewModel.EventNameFilterPropertyName:
                    this.onEventNameFilterChange();
                    break;

                case EventsTimelineViewModel.SortPropertyName:
                    this.onSortChanged();
                    break;
            }
        };

        EventsTimelineView.prototype.onViewModelSelectionChanged = function (event) {
            this._listControl.selectedItem = event;
            this.updateDetailsPane(event);
        };

        EventsTimelineView.prototype.registerResizeEvent = function () {
            VisualProfiler.Program.addEventListener(VisualProfiler.ProgramEvents.Resize, this._onResizeHandler);
        };

        EventsTimelineView.prototype.registerViewModelEvents = function () {
            if (this._viewModel) {
                this._viewModelPropertyChangeEvtReg = this._viewModel.propertyChanged.addHandler(this.onViewModelPropertyChanged.bind(this));
                this._viewModel.timeSpanChanged = this.onTimeSpanChanged.bind(this);
                this._viewModel.selectedEventChanged = this.onViewModelSelectionChanged.bind(this);
            }
        };

        EventsTimelineView.prototype.setDetailsDividerBounds = function () {
            var containerWidth = this._timelineViewAndDetailsContainer.offsetWidth;
            this._eventDetailsDivider.minX = containerWidth / 2;
            this._eventDetailsDivider.maxX = containerWidth;
        };

        EventsTimelineView.prototype.setRulerRect = function () {
            var rulerMarginLeft = this._listControl.dataColumnLeft + "px";
            var rulerWidth = this._listControl.dataColumnWidth + "px";

            if (this._rulerContainer.style.marginLeft !== rulerMarginLeft || this._rulerContainer.style.width !== rulerWidth) {
                this._rulerContainer.style.marginLeft = rulerMarginLeft;
                this._rulerContainer.style.width = rulerWidth;

                if (this._rulerScale) {
                    this._rulerScale.invalidateSizeCache();
                }
            }
        };

        EventsTimelineView.prototype.updateDetailsPane = function (event) {
            var currentDataSource = this._listControl.dataSource;
            if (!currentDataSource) {
                return;
            }

            this._timelineDetailsHeader.classList.remove(this._eventDetailsHeaderClass);

            var sectorData;
            var timeSpan;

            if (event === null) {
                if (currentDataSource) {
                    this._eventDetailsTitle.textContent = "";
                    this._eventDetailsHeaderClass = "emptyHeader";
                    sectorData = currentDataSource.getSelectionSummary();
                    timeSpan = currentDataSource.timeSpan;
                }

                this._detailsView = new EventDetailsView(null, null, sectorData, timeSpan);
            } else {
                this._eventDetailsTitle.textContent = event.title;

                this._eventDetailsHeaderClass = event.getCssClass();

                var details = this._viewModel.getEventDetails(event);
                sectorData = currentDataSource.getAggregatedDescendantsForEvent(event.id);
                this._detailsView = new EventDetailsView(event, details, sectorData, timeSpan);
            }

            this._timelineDetailsHeader.classList.add(this._eventDetailsHeaderClass);
            this._timelineDetailsPaneContainer.innerHTML = "";
            this._timelineDetailsPaneContainer.appendChild(this._detailsView.rootElement);
            Notifications.notify(VisualProfiler.ResponsivenessNotifications.DetailsPaneLoaded);
        };

        EventsTimelineView.prototype.updateColumnWidth = function (offsetX) {
            if (offsetX === null || typeof offsetX === "undefined") {
                offsetX = this._eventDetailsDivider.offsetX;
            }

            var columns = this._columnsCssRule.style.msGridColumns.split(" ");
            columns[2] = (this._timelineViewAndDetailsContainer.clientWidth - offsetX) + "px";
            this._columnsCssRule.style.msGridColumns = columns.join(" ");
        };

        EventsTimelineView.prototype.updateDetailsDivider = function () {
            this.setDetailsDividerBounds();
            this._eventDetailsDivider.offsetX = this._timelineView.offsetWidth;

            this.updateColumnWidth(this._eventDetailsDivider.offsetX + 3);
        };

        EventsTimelineView.prototype.unregisterResizeEvent = function () {
            VisualProfiler.Program.removeEventListener(VisualProfiler.ProgramEvents.Resize, this._onResizeHandler);
        };

        EventsTimelineView.prototype.unregisterViewModelEvents = function () {
            if (this._viewModel) {
                this._viewModel.timeSpanChanged = null;
                this._viewModel.selectedEventChanged = null;
            }

            if (this._viewModelPropertyChangeEvtReg) {
                this._viewModelPropertyChangeEvtReg.unregister();
                this._viewModelPropertyChangeEvtReg = null;
            }
        };
        return EventsTimelineView;
    })(Common.Controls.Legacy.TemplateControl);
    VisualProfiler.EventsTimelineView = EventsTimelineView;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/EventsTimelineView.js.map

// ToolbarView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    (function (CollectionState) {
        CollectionState[CollectionState["None"] = 0] = "None";
        CollectionState[CollectionState["Profiling"] = 1] = "Profiling";
        CollectionState[CollectionState["Analyzing"] = 2] = "Analyzing";
        CollectionState[CollectionState["Interactive"] = 3] = "Interactive";
    })(VisualProfiler.CollectionState || (VisualProfiler.CollectionState = {}));
    var CollectionState = VisualProfiler.CollectionState;

    

    var ToolbarViewModel = (function (_super) {
        __extends(ToolbarViewModel, _super);
        function ToolbarViewModel(controller) {
            _super.call(this);

            this._controller = controller;
            this._eventManager = new Plugin.Utilities.EventManager();
            this._startProfilingEnabled = true;
        }
        Object.defineProperty(ToolbarViewModel.prototype, "startProfilingEnabled", {
            get: function () {
                return this._startProfilingEnabled && !this.isAtBreakpoint;
            },
            set: function (value) {
                if (value !== this._startProfilingEnabled) {
                    this._startProfilingEnabled = value;
                    this.propertyChanged.invoke(ToolbarViewModel.StartProfilingEnabledPropertyName);
                }
            },
            enumerable: true,
            configurable: true
        });

        ToolbarViewModel.initialize = function () {
            Common.ObservableHelpers.defineProperty(ToolbarViewModel, ToolbarViewModel.ClearSelectionEnabledPropertyName, false);
            Common.ObservableHelpers.defineProperty(ToolbarViewModel, ToolbarViewModel.CollectionStatePropertyName, 0 /* None */);
            Common.ObservableHelpers.defineProperty(ToolbarViewModel, ToolbarViewModel.IsAtBreakpointPropertyName, false, function (obj, oldValue, newValue) {
                return obj.onIsAtBreakpointChanged();
            });
            Common.ObservableHelpers.defineProperty(ToolbarViewModel, ToolbarViewModel.OpenSessionPropertyName, true);
            Common.ObservableHelpers.defineProperty(ToolbarViewModel, ToolbarViewModel.ResetZoomEnabledPropertyName, false);
            Common.ObservableHelpers.defineProperty(ToolbarViewModel, ToolbarViewModel.SaveSessionPropertyName, false);
            Common.ObservableHelpers.defineProperty(ToolbarViewModel, ToolbarViewModel.StopProfilingEnabledPropertyName, false);
            Common.ObservableHelpers.defineProperty(ToolbarViewModel, ToolbarViewModel.ZoomInEnabledPropertyName, false);
        };

        ToolbarViewModel.prototype.clearSelection = function () {
            if (this._globalRuler) {
                this._globalRuler.setSelection(this._globalRuler.activeRange);
            }
        };

        ToolbarViewModel.prototype.resetZoom = function () {
            if (this._globalRuler) {
                this._globalRuler.setActiveRange(this._globalRuler.totalRange);
                this._globalRuler.setSelection(this._lastZoomSelection);
                this.zoomInEnabled = true;
                this.clearSelectionEnabled = true;
            }

            Notifications.notify(VisualProfiler.ResponsivenessNotifications.ResetZoomFinished);
        };

        ToolbarViewModel.prototype.setGlobalRuler = function (globalRuler) {
            if (this._globalRuler) {
                this._globalRuler.removeEventListener(VisualProfiler.GlobalRuler.ActiveRangeChangedEventType, this.onActiveRangeChanged.bind(this));
                this._globalRuler.removeEventListener(VisualProfiler.GlobalRuler.SelectionChangedEventType, this.onSelectionChanged.bind(this));
            }

            this._globalRuler = globalRuler;

            if (this._globalRuler) {
                this._globalRuler.addEventListener(VisualProfiler.GlobalRuler.ActiveRangeChangedEventType, this.onActiveRangeChanged.bind(this));
                this._globalRuler.addEventListener(VisualProfiler.GlobalRuler.SelectionChangedEventType, this.onSelectionChanged.bind(this));
            }
        };

        ToolbarViewModel.prototype.openSession = function () {
            var _this = this;
            Plugin.Storage.openFileDialog({
                name: "",
                extensions: ["diagsession"]
            }, {
                access: 1 /* read */,
                encoding: "BINARY",
                persistence: 1 /* temporary */,
                type: 0 /* binary */
            }).then(function (stream) {
                return _this._controller.openSession(stream);
            }).done(function () {
            }, function (error) {
                if (error.number !== undefined && error.number === Common.Constants.E_ABORT) {
                    return;
                }

                Plugin.F12.ErrorDisplay.show(Plugin.Resources.getString("OpenSessionFailedMessage"));
            });
        };

        ToolbarViewModel.prototype.saveSession = function () {
            var _this = this;
            Plugin.Storage.saveFileDialog({
                name: "",
                extensions: ["diagsession"]
            }, {
                access: 3 /* readWrite */,
                encoding: "BINARY",
                persistence: 1 /* temporary */,
                type: 0 /* binary */
            }).then(function (stream) {
                _this._controller.saveSession(stream);
            }).done(function () {
                Notifications.notify(VisualProfiler.ResponsivenessNotifications.SaveSessionFinished);
            }, function (error) {
                if (error.number !== undefined && error.number === Common.Constants.E_ABORT) {
                    return;
                }

                Plugin.F12.ErrorDisplay.show(Plugin.Resources.getString("SaveSessionFailedMessage"));
            });
        };

        ToolbarViewModel.prototype.startProfiling = function () {
            var _this = this;
            this.clearSelectionEnabled = false;
            this.openSessionEnabled = false;
            this.resetZoomEnabled = false;
            this.saveSessionEnabled = false;
            this.startProfilingEnabled = false;
            this.stopProfilingEnabled = false;
            this.zoomInEnabled = false;
            this.collectionState = 0 /* None */;

            this._controller.startProfiling().done(function () {
                _this.stopProfilingEnabled = true;
                _this.collectionState = 1 /* Profiling */;
            }, function (err) {
                _this.startProfilingEnabled = true;
                _this.openSessionEnabled = VisualProfiler.Program.packager !== null;
                VisualProfiler.Program.reportError(err, Plugin.Resources.getErrorString("JSPerf.1067"));
            });
        };

        ToolbarViewModel.prototype.stopProfiling = function () {
            var _this = this;
            this.clearSelectionEnabled = false;
            this.openSessionEnabled = false;
            this.resetZoomEnabled = false;
            this.saveSessionEnabled = false;
            this.startProfilingEnabled = false;
            this.stopProfilingEnabled = false;
            this.zoomInEnabled = false;
            this.collectionState = 2 /* Analyzing */;

            this._controller.stopProfiling().done(function () {
                _this.openSessionEnabled = VisualProfiler.Program.packager !== null;
                _this.saveSessionEnabled = VisualProfiler.Program.packager !== null;
                _this.startProfilingEnabled = true;
                _this.collectionState = 3 /* Interactive */;
            }, function (err) {
                _this.startProfilingEnabled = true;
                _this.collectionState = 0 /* None */;
                VisualProfiler.Program.reportError(err, Plugin.Resources.getErrorString("JSPerf.1068"));
            });
        };

        ToolbarViewModel.prototype.zoomIn = function () {
            VisualProfiler.Program.traceWriter.raiseEvent(101 /* Timeline_Zoom_Start */);
            if (this._globalRuler) {
                this._lastZoomSelection = this._globalRuler.selection;
                this._globalRuler.setActiveRange(this._globalRuler.selection);
                this.clearSelection();
                this.zoomInEnabled = false;
                this.clearSelectionEnabled = false;
            }

            Notifications.notify(VisualProfiler.ResponsivenessNotifications.ZoomInFinished);
            VisualProfiler.Program.traceWriter.raiseEvent(102 /* Timeline_Zoom_Stop */);
        };

        ToolbarViewModel.prototype.onActiveRangeChanged = function (args) {
            this.resetZoomEnabled = !this._globalRuler.activeRange.equals(this._globalRuler.totalRange);
        };

        ToolbarViewModel.prototype.onSelectionChanged = function (args) {
            var clearSelectionAllowed = !args.data.newSelection.equals(this._globalRuler.activeRange);
            this.clearSelectionEnabled = clearSelectionAllowed;
            this.zoomInEnabled = clearSelectionAllowed && (args.data.newSelection.elapsed.nsec > ToolbarViewModel.MinimumZoomLevelInNs);
        };

        ToolbarViewModel.prototype.onIsAtBreakpointChanged = function () {
            this.propertyChanged.invoke(ToolbarViewModel.StartProfilingEnabledPropertyName);
        };
        ToolbarViewModel.MinimumZoomLevelInNs = 100000;
        ToolbarViewModel.ClearSelectionEnabledPropertyName = "clearSelectionEnabled";
        ToolbarViewModel.CollectionStatePropertyName = "collectionState";
        ToolbarViewModel.IsAtBreakpointPropertyName = "isAtBreakpoint";
        ToolbarViewModel.OpenSessionPropertyName = "openSessionEnabled";
        ToolbarViewModel.ResetZoomEnabledPropertyName = "resetZoomEnabled";
        ToolbarViewModel.SaveSessionPropertyName = "saveSessionEnabled";
        ToolbarViewModel.StartProfilingEnabledPropertyName = "startProfilingEnabled";
        ToolbarViewModel.StopProfilingEnabledPropertyName = "stopProfilingEnabled";
        ToolbarViewModel.ZoomInEnabledPropertyName = "zoomInEnabled";
        return ToolbarViewModel;
    })(Common.Observable);
    VisualProfiler.ToolbarViewModel = ToolbarViewModel;

    ToolbarViewModel.initialize();

    var VisualProfilerToolbarControl = (function (_super) {
        __extends(VisualProfilerToolbarControl, _super);
        function VisualProfilerToolbarControl() {
            _super.call(this);
            this.title = Plugin.Resources.getString("F12ToolTitle");
            this.panelTemplateId = "VisualProfiler.toolbarButtonsPanel";

            this.addClickHandlerToButton("startToolbarButton", this.onStartToolbarButtonClick.bind(this));
            this.addClickHandlerToButton("stopToolbarButton", this.onStopToolbarButtonClick.bind(this));
            this.addClickHandlerToButton("openSessionButton", this.onOpenSessionButtonClick.bind(this));
            this.addClickHandlerToButton("saveSessionButton", this.onSaveSessionButtonClick.bind(this));
            this.addClickHandlerToButton("zoomInButton", this.onZoomInButtonClick.bind(this));
            this.addClickHandlerToButton("resetZoomButton", this.onResetZoomButtonClick.bind(this));
            this.addClickHandlerToButton("clearSelectionButton", this.onClearSelectionButtonClick.bind(this));
        }
        VisualProfilerToolbarControl.prototype.onStartToolbarButtonClick = function () {
            if (this.model) {
                this.model.startProfiling();
            }
        };

        VisualProfilerToolbarControl.prototype.onStopToolbarButtonClick = function () {
            if (this.model) {
                this.model.stopProfiling();
            }
        };

        VisualProfilerToolbarControl.prototype.onOpenSessionButtonClick = function () {
            if (this.model) {
                this.model.openSession();
            }
        };

        VisualProfilerToolbarControl.prototype.onSaveSessionButtonClick = function () {
            if (this.model) {
                this.model.saveSession();
            }
        };

        VisualProfilerToolbarControl.prototype.onZoomInButtonClick = function () {
            if (this.model) {
                this.model.zoomIn();
            }
        };

        VisualProfilerToolbarControl.prototype.onResetZoomButtonClick = function () {
            if (this.model) {
                this.model.resetZoom();
            }
        };

        VisualProfilerToolbarControl.prototype.onClearSelectionButtonClick = function () {
            if (this.model) {
                this.model.clearSelection();
            }
        };
        return VisualProfilerToolbarControl;
    })(Common.Controls.ToolbarControl);
    VisualProfiler.VisualProfilerToolbarControl = VisualProfilerToolbarControl;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/ToolbarView.js.map

// DonutChartView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    

    var DonutChartModel = (function () {
        function DonutChartModel() {
            this._sectors = [];
        }
        Object.defineProperty(DonutChartModel.prototype, "headerText", {
            get: function () {
                return this._headerText;
            },
            set: function (value) {
                this._headerText = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(DonutChartModel.prototype, "sectors", {
            get: function () {
                return this._sectors;
            },
            enumerable: true,
            configurable: true
        });

        DonutChartModel.prototype.addSector = function (sector) {
            this._sectors.push(sector);
        };
        return DonutChartModel;
    })();
    VisualProfiler.DonutChartModel = DonutChartModel;

    var DonutChartViewModel = (function () {
        function DonutChartViewModel(container) {
            this._model = new DonutChartModel();
            this._view = new DonutChartView(container, this);
        }
        Object.defineProperty(DonutChartViewModel.prototype, "model", {
            get: function () {
                return this._model;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DonutChartViewModel.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });
        return DonutChartViewModel;
    })();
    VisualProfiler.DonutChartViewModel = DonutChartViewModel;

    var DonutChartView = (function (_super) {
        __extends(DonutChartView, _super);
        function DonutChartView(container, controller) {
            _super.call(this, container);
            this._controller = controller;
            this.rootElement.tabIndex = 0;
            var config = {
                explosionFactor: 2, radius: 45, strokeWidth: 20, minDonutArcAngle: 10, containerWidth: 210, containerHeight: 180, clockwiseRotation: true
            };
            this._donutChart = new VisualProfiler.DonutChart(this.rootElement, this.onRenderSectorTooltip.bind(this), this.onAddSectorAriaLabel.bind(this), config);
            this.rootElement.setAttribute("aria-label", Plugin.Resources.getString("InclusiveTimeAriaLabel"));
        }
        DonutChartView.prototype.render = function () {
            this.addHeaderElement();
            DonutChartView.sortEventsByValue(this._controller.model.sectors);
            this._donutChart.addSectors(this._controller.model.sectors);
            this._donutChart.render();
        };

        DonutChartView.sortEventsByValue = function (sectors) {
            sectors.sort(function (sector1, sector2) {
                return sector2.value - sector1.value;
            });
        };

        DonutChartView.prototype.addHeaderElement = function () {
            var div = document.createElement("div");
            var span = document.createElement("span");
            span.style.marginLeft = "10px";
            span.innerText = this._controller.model.headerText;
            div.appendChild(span);
            this.rootElement.insertBefore(div, this.rootElement.firstChild);
        };

        DonutChartView.prototype.onAddSectorAriaLabel = function (sector, percent) {
            if (this.addSectorAriaLabel) {
                var label = this.addSectorAriaLabel(sector, percent);
                if (label) {
                    var onAddSectorAriaLabel = this.rootElement.getAttribute("aria-label") + " " + label;
                    this.rootElement.setAttribute("aria-label", onAddSectorAriaLabel);
                }
            }
        };

        DonutChartView.prototype.onRenderSectorTooltip = function (sectorInfo, percent) {
            var timeStamp = VisualProfiler.FormattingHelpers.getPrettyPrintTime(new VisualProfiler.TimeStamp(sectorInfo.value));
            return Plugin.Resources.getString("SectorTooltipFormat", sectorInfo.name, Common.FormattingHelpers.getDecimalLocaleString(percent, false), timeStamp);
        };
        return DonutChartView;
    })(Common.Controls.Legacy.Control);
    VisualProfiler.DonutChartView = DonutChartView;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/DonutChartView.js.map

// AnalyzerDataSession.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

    var AnalyzerDataSession = (function () {
        function AnalyzerDataSession(dataWarehouse) {
            this._dataWarehouse = dataWarehouse;
            this._threadId = 0;
            this._lowestObservedDocumentMode = 0;
        }
        AnalyzerDataSession.prototype.initialize = function () {
            var _this = this;
            return this._dataWarehouse.getContextService().getGlobalContext().then(function (context) {
                return context.getTimeDomain();
            }).then(function (timespan) {
                _this._totalDuration = {
                    begin: parseInt(timespan.begin.value),
                    end: parseInt(timespan.end.value)
                };

                return _this.getFilteredResult(AnalyzerDataSession.GET_UITHREAD_ID_OPERATION);
            }).then(function (result) {
                _this._threadId = result.getResult();

                return _this.getFilteredResult(AnalyzerDataSession.GET_LOWEST_OBSERVED_DOCUMENT_MODE_OPERATION);
            }).then(function (result) {
                _this._lowestObservedDocumentMode = result.getResult();
            });
        };

        AnalyzerDataSession.prototype.close = function () {
            this._dataWarehouse.closeSynchronous();
        };

        AnalyzerDataSession.prototype.closeAsync = function () {
            return this._dataWarehouse.close();
        };

        AnalyzerDataSession.prototype.getTotalDuration = function () {
            return this._totalDuration;
        };

        AnalyzerDataSession.prototype.initializeResources = function (resources) {
            var duration = new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.convertFromNumber(0), DiagnosticsHub.BigNumber.convertFromNumber(this._totalDuration.end));

            return this.getFilteredResult(AnalyzerDataSession.INITIALIZE_RESOURCES_OPERATION, duration, resources);
        };

        AnalyzerDataSession.prototype.queryEventIntervals = function (fromTime, toTime, sort, filter) {
            var duration = new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.convertFromNumber(fromTime), DiagnosticsHub.BigNumber.convertFromNumber(toTime));

            var customData = {
                eventNameFilter: filter && filter.eventNameFilter,
                minDuration: filter && filter.filterNegligibleUIActivities ? filter.filterNegligibleUIActivities.toString() : "0",
                sort: sort.toString(),
                filterBackgroundActivities: filter && filter.filterBackgroundActivities ? "true" : "false",
                filterFrames: filter && filter.filterFrames ? "true" : "false",
                filterMeasures: filter && filter.filterMeasures ? "true" : "false",
                filterNetworkActivities: filter && filter.filterNetworkActivities ? "true" : "false",
                filterUIActivities: filter && filter.filterUIActivities ? "true" : "false"
            };

            return this.getFilteredResult(AnalyzerDataSession.QUERY_EVENT_INTERVALS, duration, customData);
        };

        AnalyzerDataSession.prototype.queryCPUUsage = function (fromTime, toTime, granularity) {
            var duration = new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.convertFromNumber(fromTime), DiagnosticsHub.BigNumber.convertFromNumber(toTime));

            var customData = {
                granularity: granularity.toString()
            };

            return VisualProfiler.Graphs.DataUtilities.getFilteredResult(this._dataWarehouse, AnalyzerDataSession.TIMELINE_ANALYZER_CLASSID, AnalyzerDataSession.CPU_USAGE_COUNTERID, duration, customData).then(function (data) {
                var cpuUsage;
                if (data && data.p) {
                    cpuUsage = data.p.map(function (cpuPoint) {
                        var time = new DiagnosticsHub.BigNumber(cpuPoint.t.h, cpuPoint.t.l);
                        return {
                            category: cpuPoint.c,
                            time: parseInt(time.value),
                            utilization: cpuPoint.u
                        };
                    });
                }

                return cpuUsage;
            });
        };

        AnalyzerDataSession.prototype.queryFrameRate = function (fromTime, toTime) {
            var duration = new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.convertFromNumber(fromTime), DiagnosticsHub.BigNumber.convertFromNumber(toTime));

            return VisualProfiler.Graphs.DataUtilities.getFilteredResult(this._dataWarehouse, AnalyzerDataSession.TIMELINE_ANALYZER_CLASSID, AnalyzerDataSession.FRAME_RATE_COUNTERID, duration).then(function (data) {
                var frameRate;
                if (data && data.p) {
                    frameRate = data.p.map(function (fpsPoint) {
                        var time = new DiagnosticsHub.BigNumber(fpsPoint.t.h, fpsPoint.t.l);
                        return {
                            fps: fpsPoint.v,
                            time: parseInt(time.value)
                        };
                    });
                }

                return frameRate;
            });
        };

        AnalyzerDataSession.prototype.queryMarkEvents = function (fromTime, toTime, category) {
            var duration = new DiagnosticsHub.JsonTimespan(DiagnosticsHub.BigNumber.convertFromNumber(fromTime), DiagnosticsHub.BigNumber.convertFromNumber(toTime));

            var counterId;
            if (category === 0) {
                counterId = AnalyzerDataSession.LIFE_CYCLE_MARKS_COUNTERID;
            } else {
                counterId = AnalyzerDataSession.USER_MARKS_COUNTERID;
            }

            return VisualProfiler.Graphs.DataUtilities.getFilteredResult(this._dataWarehouse, AnalyzerDataSession.TIMELINE_ANALYZER_CLASSID, counterId, duration).then(function (graphResult) {
                var markResult;
                if (graphResult && graphResult.p) {
                    markResult = [];
                    for (var i = 0; i < graphResult.p.length; i++) {
                        var graphPoint = graphResult.p[i];
                        markResult.push({
                            time: new DiagnosticsHub.BigNumber(graphPoint.t.h, graphPoint.t.l),
                            tooltip: graphPoint.tt
                        });
                    }
                }

                return markResult;
            });
        };

        AnalyzerDataSession.prototype.getUIThreadId = function () {
            return this._threadId;
        };

        AnalyzerDataSession.prototype.getLowestObservedDocumentMode = function () {
            return this._lowestObservedDocumentMode;
        };

        AnalyzerDataSession.prototype.getFilteredResult = function (operation, timespan, customData) {
            var contextData = {
                timeDomain: timespan,
                customDomain: {
                    operation: operation
                }
            };

            if (customData) {
                for (var key in customData) {
                    if (customData.hasOwnProperty(key)) {
                        contextData.customDomain[key] = customData[key];
                    }
                }
            }

            return this._dataWarehouse.getFilteredData(contextData, AnalyzerDataSession.TIMELINE_ANALYZER_CLASSID);
        };
        AnalyzerDataSession.GET_UITHREAD_ID_OPERATION = "getUIThreadId";
        AnalyzerDataSession.GET_LOWEST_OBSERVED_DOCUMENT_MODE_OPERATION = "getLowestObservedDocumentMode";
        AnalyzerDataSession.INITIALIZE_RESOURCES_OPERATION = "initializeResources";
        AnalyzerDataSession.QUERY_EVENT_INTERVALS = "queryEventIntervals";

        AnalyzerDataSession.TIMELINE_ANALYZER_CLASSID = "3A649979-5A30-4542-A12F-1E0C09858804";

        AnalyzerDataSession.CPU_USAGE_COUNTERID = "CPUUsage";
        AnalyzerDataSession.FRAME_RATE_COUNTERID = "frameRate";
        AnalyzerDataSession.LIFE_CYCLE_MARKS_COUNTERID = "lifeCycleMarks";
        AnalyzerDataSession.USER_MARKS_COUNTERID = "userMarks";
        return AnalyzerDataSession;
    })();
    VisualProfiler.AnalyzerDataSession = AnalyzerDataSession;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/AnalyzerDataSession.js.map

// MarkEventModel.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    

    var MarkEventModel = (function () {
        function MarkEventModel(session) {
            this._session = session;
        }
        MarkEventModel.prototype.getMarkEvents = function (timeRange, category) {
            return this._session.queryMarkEvents(timeRange.begin.nsec, timeRange.end.nsec, category);
        };

        MarkEventModel.prototype.getMarkTooltip = function (mark) {
            var tooltip = mark.toolTip;
            var time = parseInt(mark.timestamp.value);

            tooltip += Plugin.Resources.getString("RulerMarkTooltipLabel", VisualProfiler.FormattingHelpers.getPrettyPrintTime(VisualProfiler.TimeStamp.fromNanoseconds(time)));

            return tooltip;
        };
        return MarkEventModel;
    })();
    VisualProfiler.MarkEventModel = MarkEventModel;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/MarkEventModel.js.map

// ProfilingSource.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

    

    var DataWarehouseProfilerSource = (function () {
        function DataWarehouseProfilerSource(dataWarehouse) {
            this._dataWarehouse = dataWarehouse;
        }
        DataWarehouseProfilerSource.prototype.clean = function () {
        };

        DataWarehouseProfilerSource.prototype.getDataSession = function () {
            var analyzerDataSession = new VisualProfiler.AnalyzerDataSession(this._dataWarehouse);
            return analyzerDataSession.initialize().then(function () {
                return analyzerDataSession;
            });
        };
        return DataWarehouseProfilerSource;
    })();
    VisualProfiler.DataWarehouseProfilerSource = DataWarehouseProfilerSource;

    var EtlFileProfilingSource = (function () {
        function EtlFileProfilingSource(etlFilePath, isUserSpecifiedFile, analyzerDir) {
            this._etlFilePath = etlFilePath;
            this._isUserSpecifiedFile = isUserSpecifiedFile;

            if (analyzerDir) {
                this._analyzerDir = analyzerDir;
                if (this._analyzerDir.charAt(this._analyzerDir.length - 1) !== "\\") {
                    this._analyzerDir += "\\";
                }
            }
        }
        Object.defineProperty(EtlFileProfilingSource.prototype, "etlPath", {
            get: function () {
                return this._etlFilePath;
            },
            enumerable: true,
            configurable: true
        });

        EtlFileProfilingSource.prototype.clean = function () {
            if (this._dataWarehouseSource) {
                this._dataWarehouseSource.clean();
                this._dataWarehouseSource = null;
            }

            if (Plugin.F12 && this._etlFilePath && !this._isUserSpecifiedFile) {
                var files = this._etlFilePath.split("|");
                for (var i = 0; i < files.length; i++) {
                    var etlFile = files[i];
                    if (etlFile) {
                        Plugin.F12.deleteFile(etlFile);
                    }
                }

                this._etlFilePath = null;
            }
        };

        EtlFileProfilingSource.prototype.getDataSession = function () {
            var _this = this;
            var etwFileDataSourceInfo = {
                id: this._etlFilePath,
                identity: DiagnosticsHub.DataWarehouse.ResourceIdentity.EtlFile,
                type: 1 /* File */,
                path: this._etlFilePath
            };

            var timelineAnalyzerConfig = {
                type: 2 /* Custom */,
                localDllPath: this.getAnalyzerPath("timeline.dll"),
                clsid: VisualProfiler.AnalyzerDataSession.TIMELINE_ANALYZER_CLASSID
            };

            EtlFileProfilingSource._sessionId++;
            var dataWarehouseConfig = {
                sessionId: EtlFileProfilingSource.getSimpleGuid(EtlFileProfilingSource._sessionId),
                analyzers: [timelineAnalyzerConfig],
                dataSources: [etwFileDataSourceInfo],
                symbolCachePath: "",
                symbolStorePath: ""
            };

            var promise;
            return new Plugin.Promise(function (completed, error, progress) {
                promise = DiagnosticsHub.DataWarehouse.loadDataWarehouse(dataWarehouseConfig).then(function (dataWarehouse) {
                    _this._dataWarehouseSource = new DataWarehouseProfilerSource(dataWarehouse);
                    return dataWarehouse.initialize();
                }).then(function () {
                    return _this._dataWarehouseSource.getDataSession();
                }, error, function (value) {
                    if (progress) {
                        progress(value);
                    }
                }).then(function (dataSession) {
                    if (completed) {
                        completed(dataSession);
                    }
                });
            }, function () {
                promise.cancel();
            });
        };

        EtlFileProfilingSource.getSimpleGuid = function (val) {
            var emptyGuid = "00000000-0000-0000-0000-000000000000";
            var lastPart = (val % 0xffffffffffff).toString(16);
            return emptyGuid.substr(0, emptyGuid.length - lastPart.length) + lastPart;
        };

        EtlFileProfilingSource.prototype.getAnalyzerPath = function (file) {
            var path;
            if (this._analyzerDir) {
                path = this._analyzerDir + file;
            } else {
                path = file;
            }

            return path;
        };
        EtlFileProfilingSource._sessionId = 0;
        return EtlFileProfilingSource;
    })();
    VisualProfiler.EtlFileProfilingSource = EtlFileProfilingSource;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/js/ProfilingSource.js.map

// codeMarkerValues.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    (function (CodeMarkerValues) {
        CodeMarkerValues[CodeMarkerValues["perfBrowserTools_VisualProfilerResultsLoaded"] = 23573] = "perfBrowserTools_VisualProfilerResultsLoaded";
    })(VisualProfiler.CodeMarkerValues || (VisualProfiler.CodeMarkerValues = {}));
    var CodeMarkerValues = VisualProfiler.CodeMarkerValues;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/codeMarkerValues.js.map

// responsivenessNotifications.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var ResponsivenessNotifications = (function () {
        function ResponsivenessNotifications() {
        }
        ResponsivenessNotifications.DetailsPaneLoaded = "ResponsivenessNotifications.DetailsPaneLoaded";
        ResponsivenessNotifications.GraphCollapsed = "ResponsivenessNotifications.GraphCollapsed";
        ResponsivenessNotifications.GraphExpanded = "ResponsivenessNotifications.GraphExpanded";
        ResponsivenessNotifications.GridRowSelected = "ResponsivenessNotifications.GridRowSelected";
        ResponsivenessNotifications.GridScrolled = "ResponsivenessNotifications.GridScrolled";
        ResponsivenessNotifications.GridUpdatedForFilter = "ResponsivenessNotifications.GridUpdatedForFilter";
        ResponsivenessNotifications.GridUpdatedForTimeSelection = "ResponsivenessNotifications.GridUpdatedForTimeSelection";
        ResponsivenessNotifications.ResetZoomFinished = "ResponsivenessNotifications.ResetZoomFinished";
        ResponsivenessNotifications.ResultsLoaded = "ResponsivenessNotifications.ResultsLoaded";
        ResponsivenessNotifications.SaveSessionFinished = "ResponsivenessNotifications.SaveSessionFinished";
        ResponsivenessNotifications.SortFinishedOnGrid = "ResponsivenessNotifications.SortFinishedOnGrid";
        ResponsivenessNotifications.UserSelectedTimeslice = "ResponsivenessNotifications.UserSelectedTimeslice";
        ResponsivenessNotifications.ZoomInFinished = "ResponsivenessNotifications.ZoomInFinished";
        return ResponsivenessNotifications;
    })();
    VisualProfiler.ResponsivenessNotifications = ResponsivenessNotifications;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/responsivenessNotifications.js.map

// Program.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    (function (HostType) {
        HostType[HostType["VS"] = 0] = "VS";
        HostType[HostType["F12"] = 1] = "F12";
        HostType[HostType["Test"] = 2] = "Test";
    })(VisualProfiler.HostType || (VisualProfiler.HostType = {}));
    var HostType = VisualProfiler.HostType;

    var ProgramEvents = (function () {
        function ProgramEvents() {
        }
        ProgramEvents.Resize = "resize";
        ProgramEvents.Initialized = "initialized";
        return ProgramEvents;
    })();
    VisualProfiler.ProgramEvents = ProgramEvents;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/Program.js.map

// Program.main.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var ProgramMain = (function () {
        function ProgramMain() {
            this._eventManager = new Plugin.Utilities.EventManager();
            this._traceWriter = new Common.DefaultTraceWriter();
        }
        Object.defineProperty(ProgramMain.prototype, "controller", {
            get: function () {
                return this._visualProfilerController;
            },
            enumerable: true,
            configurable: true
        });
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
        Object.defineProperty(ProgramMain.prototype, "hostShell", {
            get: function () {
                return this._hostShell;
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

        ProgramMain.prototype.addEventListener = function (eventType, func) {
            if (eventType === VisualProfiler.ProgramEvents.Initialized && this._visualProfilerController) {
                var event = new Event();
                event.controller = this._visualProfilerController;
                func(event);
            } else {
                this._eventManager.addEventListener(eventType, func);
            }
        };

        ProgramMain.prototype.fireCodeMarker = function (codeMarker) {
            if (Plugin.VS && Plugin.VS.Internal && Plugin.VS.Internal.CodeMarkers) {
                Plugin.VS.Internal.CodeMarkers.fire(codeMarker);
            }
        };

        ProgramMain.prototype.getHostSpecificString = function (resourceId) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            var _resourceId = resourceId + Common.Enum.GetName(VisualProfiler.HostType, this._hostType);

            return Plugin.Resources.getString(_resourceId, args);
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
                Plugin.Tooltip.defaultTooltipContentToHTML = false;

                if (Plugin.VS && Plugin.VS.Keyboard) {
                    Plugin.VS.Keyboard.setZoomState(false);
                }

                var perfTrace;

                switch (_this.hostType) {
                    case 0 /* VS */:
                        _this._hostShell = new Common.Extensions.HostShellProxy();
                        perfTrace = Plugin.VS.Utilities.createExternalObject("PerformanceTraceExtension", "{D76A409F-7234-4B71-9BFD-DEF3DC4CCCA6}");
                        break;
                    case 1 /* F12 */:
                        _this._hostShell = new Common.Extensions.LocalHostShell();
                        _this._etwDataCollector = new Common.Data.F12EtwDataCollector(_this._externalObj.etwDataCollector);
                        try  {
                            _this._packager = new Common.Data.F12Packager(_this._externalObj.packager);
                        } catch (e) {
                            _this._packager = null;
                        }

                        perfTrace = Plugin.F12.TraceWriter;
                        break;
                    default:
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1056"));
                }

                if (perfTrace) {
                    _this._traceWriter = new Common.TraceWriter(perfTrace);
                }

                VisualProfiler.Extensions.UserSettingsHelper.getUserSettings().then(function (userSettings) {
                    _this._userSettings = userSettings;
                    _this.initializeErrorReporting();

                    window.addEventListener("resize", _this.triggerResize.bind(_this));

                    _this._visualProfilerController = new VisualProfiler.VisualProfilerController();
                    if (Plugin.F12) {
                        Plugin.F12.TraceWriter.markToolReady();
                    }

                    _this._eventManager.dispatchEvent(VisualProfiler.ProgramEvents.Initialized);
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

        ProgramMain.prototype.removeEventListener = function (eventType, func) {
            this._eventManager.removeEventListener(eventType, func);
        };

        ProgramMain.prototype.reportError = function (error, additionalInfo, source, line, column) {
            if (!this.userSettings.disableWER) {
                var message = (error.message || error.description);
                var url = source || "Visual Profiler";
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
            }
        };

        ProgramMain.prototype.triggerResize = function () {
            this._eventManager.dispatchEvent(VisualProfiler.ProgramEvents.Resize);
        };
        return ProgramMain;
    })();
    VisualProfiler.ProgramMain = ProgramMain;

    VisualProfiler.Program = new ProgramMain();
})(VisualProfiler || (VisualProfiler = {}));

VisualProfiler.Program.main();
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/Program.main.js.map

// VisualProfiler.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;

    var VisualProfilerController = (function () {
        function VisualProfilerController() {
            var _this = this;
            this._toolbarViewModel = new VisualProfiler.ToolbarViewModel(this);

            if (VisualProfiler.Program.hostType === 1 /* F12 */) {
                this._view = new VisualProfiler.F12.VisualProfilerView(this, this._toolbarViewModel);

                Plugin.F12.addEventListener("activated", function () {
                    return _this.onToolActivated();
                });
                this.onToolActivated();

                var external = window.external;
                external.addEventListener("detach", function () {
                    _this._toolbarViewModel.stopProfiling();
                });

                external.addEventListener("closing", function () {
                    if (_this._session) {
                        _this._session.close();
                        _this._session = null;
                    }

                    _this.deleteEtlFile();

                    VisualProfiler.Program.etwDataCollector.stopCollection();
                });
            } else {
                this._view = new VisualProfiler.VS.VisualProfilerView(this);

                DiagnosticsHub.DataWarehouse.loadDataWarehouse().done(function (dataWarehouse) {
                    _this._view.setSource(new VisualProfiler.DataWarehouseProfilerSource(dataWarehouse));
                });
            }
        }
        Object.defineProperty(VisualProfilerController.prototype, "globalRuler", {
            get: function () {
                return this._globalRuler;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(VisualProfilerController.prototype, "toolbarViewModel", {
            get: function () {
                return this._toolbarViewModel;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(VisualProfilerController.prototype, "view", {
            get: function () {
                return this._view;
            },
            enumerable: true,
            configurable: true
        });

        VisualProfilerController.prototype.initializeSession = function (source) {
            var _this = this;
            this._profilingSource = source;

            var promise;
            return new Plugin.Promise(function (completed, error, progress) {
                promise = _this._profilingSource.getDataSession().then(function (session) {
                    _this._session = session;
                    return _this.initializeResources();
                }, error, function (prog) {
                    if (progress) {
                        progress({
                            totalStages: prog.stageCount,
                            currentStage: prog.currentStage,
                            errCode: prog.result,
                            isCompleted: prog.finished,
                            max: prog.maxValue,
                            value: prog.progressValue
                        });
                    }
                }).then(function () {
                    if (_this._globalRuler) {
                        _this._globalRuler.deinitialize();
                    }

                    var totalDuration = _this._session.getTotalDuration();
                    _this._globalRuler = new VisualProfiler.GlobalRuler(new VisualProfiler.TimeSpan(VisualProfiler.TimeStamp.fromNanoseconds(totalDuration.begin), VisualProfiler.TimeStamp.fromNanoseconds(totalDuration.end)));

                    _this._toolbarViewModel.setGlobalRuler(_this._globalRuler);

                    var markEventModel = new VisualProfiler.MarkEventModel(_this._session);

                    var eventTimelineModel = new VisualProfiler.EventsTimelineModel(_this._session);
                    var eventTimelineViewModel = new VisualProfiler.EventsTimelineViewModel(eventTimelineModel, _this._globalRuler, markEventModel);

                    var lowestObservedDocumentMode = _this._session.getLowestObservedDocumentMode();

                    if (VisualProfiler.Program.hostType === 1 /* F12 */) {
                        var swimlanesViewModel = new VisualProfiler.F12.SwimlanesViewModel(_this._globalRuler, markEventModel, _this._session, VisualProfilerController.LEFT_RIGHT_PADDING, VisualProfilerController.LEFT_RIGHT_PADDING, _this._toolbarViewModel);

                        var swimlanesConfiguration = new VisualProfiler.F12.SwimlaneConfigurations();
                        swimlanesViewModel.graphConfigs = swimlanesConfiguration.configurations;

                        if (completed) {
                            completed({
                                eventsTimelineViewModel: eventTimelineViewModel,
                                globalRuler: _this._globalRuler,
                                swimlanesViewModel: swimlanesViewModel,
                                lowestObservedDocumentMode: lowestObservedDocumentMode
                            });
                        }
                    } else {
                        if (completed) {
                            completed({
                                eventsTimelineViewModel: eventTimelineViewModel,
                                globalRuler: _this._globalRuler,
                                lowestObservedDocumentMode: lowestObservedDocumentMode
                            });
                        }
                    }
                }, error);
            }, function () {
                promise.cancel();
            });
        };

        VisualProfilerController.prototype.startProfiling = function () {
            var _this = this;
            if (!this._collectionSession) {
                return this.closeSession().then(function () {
                    Plugin.F12.Profiler.notifyOnStartProfiling();
                    return VisualProfiler.Program.etwDataCollector.startSession("JavaScriptCollectionAgent.dll", "{8A4373D6-07CA-476E-876F-21E303CB7CF5}").then(function (s) {
                        _this._collectionSession = s;
                        _this._view.onProfilingStarted();
                    }, function (err) {
                        Plugin.F12.Profiler.notifyOnStopProfiling();
                        _this._view.onProfilingStartFailed(err);
                        throw err;
                    });
                });
            }

            return Plugin.Promise.as(null);
        };

        VisualProfilerController.prototype.stopProfiling = function () {
            var _this = this;
            if (this._collectionSession) {
                this._view.onProfilingStopping();
                return this._collectionSession.stop().then(function (file) {
                    Plugin.F12.Profiler.notifyOnStopProfiling();
                    _this._collectionSession = null;
                    return _this._view.setSource(new VisualProfiler.EtlFileProfilingSource(file, false));
                }, function (err) {
                    _this._collectionSession = null;
                    _this._view.onProfilingStopFailed(err);
                    throw err;
                });
            }

            return Plugin.Promise.as(null);
        };

        VisualProfilerController.prototype.openSession = function (stream) {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                try  {
                    VisualProfiler.Program.packager.openPackage(stream.streamId);
                    if (!VisualProfiler.Program.packager.hasToolData(Common.Constants.UI_RESPONSIVENESS_TOOL_GUID)) {
                        throw new Error(Plugin.Resources.getErrorString("JSPerf.1076"));
                    }

                    _this.closeSession().then(function () {
                        var resourcePath = VisualProfiler.Program.packager.getResourcePathsByType(VisualProfilerController.ETL_RESOURCE_TYPE);
                        VisualProfiler.Program.packager.closePackage();

                        _this._view.onProfilingStopping();
                        _this.toolbarViewModel.openSessionEnabled = true;
                        _this.toolbarViewModel.saveSessionEnabled = true;
                        _this.toolbarViewModel.startProfilingEnabled = true;
                        _this.toolbarViewModel.collectionState = 3 /* Interactive */;

                        _this._view.setSource(new VisualProfiler.EtlFileProfilingSource(resourcePath.join("|"), true));

                        if (completed) {
                            completed();
                        }
                    });
                } catch (e) {
                    VisualProfiler.Program.packager.closePackage();

                    if (error) {
                        error(e);
                    }
                }
            });
        };

        VisualProfilerController.prototype.saveSession = function (stream) {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                var pathsToEtl;

                if (_this._profilingSource instanceof VisualProfiler.EtlFileProfilingSource) {
                    pathsToEtl = _this._profilingSource.etlPath.split("|");
                } else {
                    throw new Error(Plugin.Resources.getString("WrongDataSource"));
                }

                try  {
                    var tempPath = VisualProfiler.Program.packager.createPackage(Common.Constants.UI_RESPONSIVENESS_TOOL_GUID);
                    for (var i = 0; i < pathsToEtl.length; ++i) {
                        VisualProfiler.Program.packager.addResource(VisualProfilerController.ETL_RESOURCE_TYPE, pathsToEtl[i], VisualProfilerController.ETL_SAVE_NAME + i + ".etl");
                    }

                    VisualProfiler.Program.packager.commit();

                    Plugin.F12.copyFileToStream(tempPath, stream.streamId);
                    return stream.close().then(function () {
                        try  {
                            Plugin.F12.deleteFile(tempPath);

                            if (completed) {
                                completed();
                            }
                        } catch (e) {
                            if (error) {
                                error(e);
                            }
                        }
                    });
                } catch (e) {
                    if (error) {
                        error(e);
                    }
                }
            });
        };

        VisualProfilerController.prototype.closeSession = function () {
            var _this = this;
            if (this._session) {
                this._view.resetSource();
                return this._session.closeAsync().then(function () {
                    _this._session = null;
                    _this.deleteEtlFile();
                }, function (error) {
                    _this._session = null;
                    throw error;
                });
            }

            return Plugin.Promise.as(null);
        };

        VisualProfilerController.prototype.deleteEtlFile = function () {
            if (this._profilingSource) {
                this._profilingSource.clean();
            }
        };

        VisualProfilerController.prototype.initializeResources = function () {
            var resources = {};
            var keys = [
                "AnimationFrame",
                "CssCalculation",
                "CssParsing",
                "DDTrackDomSet",
                "DDTrackerSetStyleContextName",
                "DomEvent",
                "EvaluatingScript",
                "EventHandler",
                "Frame",
                "GarbageCollection",
                "HtmlParsing",
                "HtmlSpeculativeDownloading",
                "HttpRequest",
                "Idle",
                "ImageDecoded",
                "InlineScriptLabel",
                "InlineStylesheetLabel",
                "Layout",
                "Measure",
                "MediaQueryListener",
                "MutationObserver",
                "Paint",
                "RenderLayer",
                "TASK_DocumentResize",
                "TASK_DoEnReNo",
                "TASK_DoInsElm",
                "TASK_Fi",
                "TASK_FiCmpFmt",
                "TASK_LineBox",
                "TASK_PageFrame",
                "TASK_TableBox",
                "TASK_TextBlock",
                "TimerFired",
                "UnknownElement",
                "WindowsRuntimeAsyncCallback",
                "WindowsRuntimeEvent"
            ];

            keys.forEach(function (key) {
                var value = Plugin.Resources.getString(key);
                value = VisualProfiler.FormattingHelpers.convertFormatString(value);
                resources[key] = value;
            });

            return this._session.initializeResources(resources);
        };

        VisualProfilerController.prototype.onToolActivated = function () {
            var isAtBreakpoint = Plugin.F12.Debugger.getIsAtBreakpoint();
            this._toolbarViewModel.isAtBreakpoint = isAtBreakpoint;
        };
        VisualProfilerController.LEFT_RIGHT_PADDING = 34;
        VisualProfilerController.ETL_RESOURCE_TYPE = "DiagnosticsHub.Resource.EtlFile";
        VisualProfilerController.ETL_SAVE_NAME = "Trace";
        return VisualProfilerController;
    })();
    VisualProfiler.VisualProfilerController = VisualProfilerController;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/VisualProfiler.js.map

// VisualProfilerView.ts
var VisualProfiler;
(function (VisualProfiler) {
    "use strict";

    var VisualProfilerView = (function () {
        function VisualProfilerView(mainViewTemplate, controller) {
            this.controller = controller;

            var container = document.getElementById("mainContainer");
            var mainContainer = new Common.Controls.Legacy.Control(container);

            this.mainView = new Common.Controls.Legacy.TemplateControl(mainViewTemplate);
            mainContainer.appendChild(this.mainView);

            this.dataViewContainer = this.mainView.findElement("dataViewContainer");
            this.detailedViewsContainer = this.mainView.findElement("detailedViewsContainer");

            this.eventsTimelineView = new VisualProfiler.EventsTimelineView(this.mainView.findElement("timelineViewContainer").id);

            this._warningView = this.mainView.findElement("warningView");
            this._warningView.style.display = "none";
            this._warningMessage = this.mainView.findElement("warningMessage");
        }
        VisualProfilerView.prototype.onProcessingStarting = function () {
        };

        VisualProfilerView.prototype.onProcessingCompleted = function () {
        };

        VisualProfilerView.prototype.onProcessingFailed = function (error) {
        };

        VisualProfilerView.prototype.onProcessingProgress = function (progress) {
        };

        VisualProfilerView.prototype.onProfilingStarted = function () {
        };

        VisualProfilerView.prototype.onProfilingStartFailed = function (err) {
        };

        VisualProfilerView.prototype.onProfilingStopping = function () {
        };

        VisualProfilerView.prototype.onProfilingStopFailed = function (err) {
        };

        VisualProfilerView.prototype.setSource = function (source) {
            var _this = this;
            VisualProfiler.Program.traceWriter.raiseEvent(105 /* Timeline_LoadGraphs_Start */);

            this.onProcessingStarting();
            this._warningView.style.display = "none";

            return this.controller.initializeSession(source).then(function (result) {
                _this.onProcessingCompleted();

                _this.detailedViewsContainer.style.display = "";

                if (result.lowestObservedDocumentMode < Common.Constants.MINIMUM_REQUIRED_DOCUMENT_MODE) {
                    _this._warningMessage.innerText = VisualProfiler.Program.getHostSpecificString("WarningIncompatibleStandardsMode");
                    _this._warningView.style.display = "block";
                }

                _this.setupAnalysisView(result);
            }, function (error) {
                _this.onProcessingFailed(error);

                _this.showError(new Error(Plugin.Resources.getString("GenericDataProcessingError", error.message)));
                VisualProfiler.Program.reportError(error, Plugin.Resources.getString("GenericDataProcessingError"));
            }, function (progress) {
                _this.onProcessingProgress(progress);
            });
        };

        VisualProfilerView.prototype.setupAnalysisView = function (result) {
            this.setupAnalysisViewOverride(result);

            this.eventsTimelineView.viewModel = result.eventsTimelineViewModel;
            this.eventsTimelineView.viewModel.resetFilter();
            this.eventsTimelineView.render().done(function () {
                VisualProfiler.Program.fireCodeMarker(23573 /* perfBrowserTools_VisualProfilerResultsLoaded */);
                Notifications.notify(VisualProfiler.ResponsivenessNotifications.ResultsLoaded);
                VisualProfiler.Program.traceWriter.raiseEvent(106 /* Timeline_LoadGraphs_Stop */);
            });
        };

        VisualProfilerView.prototype.setupAnalysisViewOverride = function (result) {
        };

        VisualProfilerView.prototype.showError = function (error, helpUrl) {
        };

        VisualProfilerView.prototype.resetSource = function () {
            this.eventsTimelineView.viewModel = null;
        };
        return VisualProfilerView;
    })();
    VisualProfiler.VisualProfilerView = VisualProfilerView;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/VisualProfilerView.js.map

// VisualProfilerView.f12.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualProfiler;
(function (VisualProfiler) {
    (function (F12) {
        "use strict";

        var VisualProfilerView = (function (_super) {
            __extends(VisualProfilerView, _super);
            function VisualProfilerView(controller, toolbarViewModel) {
                _super.call(this, "mainViewTemplateF12", controller);

                this.toolbarViewModel = toolbarViewModel;

                this.dataViewContainer.style.display = "none";
                this.detailedViewsContainer.style.display = "none";

                this._progress = this.mainView.findElement("progress");
                this._progressContainer = this.mainView.findElement("progressContainer");
                this._progressContainer.setAttribute("aria-label", Plugin.Resources.getString("AnalyzeDataStatus"));
                this._progressContainer.style.display = "none";
                this._profilingInProgress = false;
                this._profilingFailed = false;

                var progressText = this.mainView.findElement("progressText");
                progressText.innerText = Plugin.Resources.getString("AnalyzeDataStatus");

                this._toolbarControl = new VisualProfiler.VisualProfilerToolbarControl();
                this._toolbarControl.model = toolbarViewModel;
                this.mainView.findElement("toolbarViewContainer").appendChild(this._toolbarControl.rootElement);

                this._profilingPrompt = this.mainView.findElement("profilingPrompt");
                this._profilingLink = this.mainView.findElement("profilingLink");

                this._profilingProgress = this.mainView.findElement("profilingProgress");
                this._profilingProgress.style.display = "none";

                this.setProfilingLinkText(Plugin.Resources.getString("F12StartProfilingMessage"));

                var clickHandler = this.onProfilingLinkClick.bind(this);
                this._profilingLink.addEventListener("click", clickHandler);
                this._profilingLink.addEventListener("keydown", clickHandler);

                this._swimLanesView = new F12.SwimlanesView(this.mainView.findElement("swimLanesViewContainer").id);

                Plugin.F12.addEventListener("keydown", this.shortcutHandler.bind(this));
                document.addEventListener("keydown", this.shortcutHandler.bind(this));
                Plugin.F12.addEventListener("browsershortcut", this.shortcutHandler.bind(this));

                this._toolbarViewModel.openSessionEnabled = VisualProfiler.Program.packager !== null;

                this.updateNavigationFrames(true);

                Common.NavigationUtilities.registerFocusHandlers(Plugin.F12.PluginId.VisualProfiler);
            }
            Object.defineProperty(VisualProfilerView.prototype, "toolbarViewModel", {
                get: function () {
                    return this._toolbarViewModel;
                },
                set: function (model) {
                    this.unregisterToolbarViewModelEvents();
                    this._toolbarViewModel = model;
                    this.registerToolbarViewModelEvents();
                },
                enumerable: true,
                configurable: true
            });

            VisualProfilerView.prototype.onProcessingStarting = function () {
                this._progressSoFar = 0;
                this._progressStageNumber = 0;
                this._progress.value = 0;
                this._progress.max = 100;

                this.detailedViewsContainer.style.display = "none";
                this._progressContainer.style.display = "";
            };

            VisualProfilerView.prototype.onProcessingCompleted = function () {
                this._progressContainer.style.display = "none";
            };

            VisualProfilerView.prototype.onProcessingFailed = function (error) {
                this._progressContainer.style.display = "none";

                if (this._profilingPrompt) {
                    this._profilingPrompt.style.display = "";
                    this.setProfilingLinkText(Plugin.Resources.getString("F12StartProfilingMessage"));
                }
            };

            VisualProfilerView.prototype.onProcessingProgress = function (progress) {
                if (this._progressStageNumber !== progress.currentStage) {
                    this._progressStageNumber = progress.currentStage;
                    this._progressSoFar = this._progress.value;
                }

                var stagePercentage = (progress.value / progress.max) * 100;
                var stageTotalContribution = stagePercentage / progress.totalStages;
                this._progress.value = this._progressSoFar + stageTotalContribution;
            };

            VisualProfilerView.prototype.onProfilingStarted = function () {
                this._profilingFailed = false;
                this._profilingInProgress = true;

                this.dataViewContainer.style.display = "none";
                this._profilingPrompt.style.display = "";
                this.setProfilingLinkText(Plugin.Resources.getString("F12StopProfilingMessage"));

                this._profilingProgress.style.display = "";
            };

            VisualProfilerView.prototype.onProfilingStartFailed = function (err) {
                this._profilingFailed = true;
                this._profilingInProgress = false;
                this._profilingProgress.style.display = "none";

                this.dataViewContainer.style.display = "none";
                this._profilingPrompt.style.display = "";
                this.setProfilingLinkText(Plugin.Resources.getString("F12StartProfilingMessage"));

                var helpUrl = err.message === "-2147221164" ? "http://go.microsoft.com/fwlink/?LinkID=306020" : null;
                this.showError(new Error(Plugin.Resources.getString("GenericDataProcessingError", err.message)), helpUrl);
            };

            VisualProfilerView.prototype.onProfilingStopping = function () {
                this._profilingInProgress = false;
                this._profilingProgress.style.display = "none";

                this.dataViewContainer.style.display = "";
                this._profilingPrompt.style.display = "none";

                this.detailedViewsContainer.style.display = "none";

                this._progress.value = 0;
                this._progressContainer.style.display = "";
                this._progressContainer.focus();
            };

            VisualProfilerView.prototype.onProfilingStopFailed = function (err) {
                this._profilingFailed = true;
                this.dataViewContainer.style.display = "none";
                this._profilingPrompt.style.display = "";
                this.setProfilingLinkText(Plugin.Resources.getString("F12StartProfilingMessage"));

                this.showError(new Error(Plugin.Resources.getString("GenericDataProcessingError", err.message)));
                this.updateNavigationFrames(true);
            };

            VisualProfilerView.prototype.registerToolbarViewModelEvents = function () {
                if (this.toolbarViewModel) {
                    this._toolbarViewModelPropertyChangedEvtReg = this.toolbarViewModel.propertyChanged.addHandler(this.onToolbarViewModelPropertyChanged.bind(this));
                }
            };

            VisualProfilerView.prototype.setupAnalysisViewOverride = function (result) {
                var _this = this;
                this._swimLanesView.viewModel = result.swimlanesViewModel;
                this._swimLanesView.render();

                window.setImmediate(function () {
                    VisualProfiler.Program.triggerResize();
                    _this._swimLanesView.focusOnRuler();
                    _this.updateNavigationFrames(false);
                });
            };

            VisualProfilerView.prototype.showError = function (error, helpUrl) {
                Plugin.F12.ErrorDisplay.show(error.message, null, helpUrl);
            };

            VisualProfilerView.prototype.unregisterToolbarViewModelEvents = function () {
                if (this._toolbarViewModelPropertyChangedEvtReg) {
                    this._toolbarViewModelPropertyChangedEvtReg.unregister();
                    this._toolbarViewModelPropertyChangedEvtReg = null;
                }
            };

            VisualProfilerView.prototype.onProfilingLinkClick = function (event) {
                if (this.controller && (event.type === "click" || event.keyCode === 13 /* Enter */ || event.keyCode === 32 /* Space */)) {
                    this.toggleProfiling();
                }
            };

            VisualProfilerView.prototype.onToolbarViewModelPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case VisualProfiler.ToolbarViewModel.StartProfilingEnabledPropertyName:
                        if (!this._profilingInProgress) {
                            this.updateProfilingLinkState(!this.toolbarViewModel.isAtBreakpoint);
                        }

                        break;

                    case VisualProfiler.ToolbarViewModel.StopProfilingEnabledPropertyName:
                        if (this._profilingInProgress) {
                            this.updateProfilingLinkState(!this.toolbarViewModel.isAtBreakpoint);
                        }

                        break;
                }
            };

            VisualProfilerView.prototype.shortcutHandler = function (event) {
                if (event.ctrlKey && !event.shiftKey && !event.altKey) {
                    if (event.keyCode === 69 /* E */) {
                        this.toggleProfiling();
                    } else if (this.toolbarViewModel.saveSessionEnabled && event.keyCode === 83 /* S */) {
                        this.toolbarViewModel.saveSession();
                    } else if (this.toolbarViewModel.openSessionEnabled && event.keyCode === 79 /* O */) {
                        this.toolbarViewModel.openSession();
                    }
                }
            };

            VisualProfilerView.prototype.toggleProfiling = function () {
                if (this._profilingInProgress && this.toolbarViewModel.stopProfilingEnabled) {
                    this.toolbarViewModel.stopProfiling();
                } else if (this.toolbarViewModel.startProfilingEnabled) {
                    this._profilingFailed = false;
                    this.toolbarViewModel.startProfiling();
                    this.updateNavigationFrames(true);
                }
            };

            VisualProfilerView.prototype.setProfilingLinkText = function (linkText) {
                this._profilingLink.innerText = linkText;
                this._profilingLink.setAttribute("aria-label", linkText);
            };

            VisualProfilerView.prototype.updateProfilingLinkState = function (enabled) {
                if (enabled) {
                    this._profilingLink.style.display = "";

                    if (!this._profilingFailed) {
                        Plugin.F12.ErrorDisplay.close();
                    }
                } else {
                    this._profilingLink.style.display = "none";
                    Plugin.F12.ErrorDisplay.show(Plugin.Resources.getString("VisualProfilerDisabledAtBreakpoint"));
                }
            };

            VisualProfilerView.prototype.updateNavigationFrames = function (toolbarOnly) {
                var _this = this;
                var navigationFrames = [
                    Common.NavigationUtilities.makeNavigationFrameFromCallback(document.body, function () {
                        return _this._toolbarControl.getActiveElement();
                    })
                ];

                if (!toolbarOnly) {
                    navigationFrames.push(Common.NavigationUtilities.makeNavigationFrameFromCallback(this.mainView.findElement("timelineViewContainer"), function () {
                        return document.getElementById("timelineSortSelector");
                    }));
                }

                Common.NavigationUtilities.registerNavigationFrames(navigationFrames);
            };
            return VisualProfilerView;
        })(VisualProfiler.VisualProfilerView);
        F12.VisualProfilerView = VisualProfilerView;
    })(VisualProfiler.F12 || (VisualProfiler.F12 = {}));
    var F12 = VisualProfiler.F12;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/VisualProfilerView.f12.js.map

// VisualProfilerView.vs.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var VisualProfiler;
(function (VisualProfiler) {
    (function (VS) {
        "use strict";

        var VisualProfilerView = (function (_super) {
            __extends(VisualProfilerView, _super);
            function VisualProfilerView(controller) {
                _super.call(this, "mainViewTemplateVS", controller);
            }
            VisualProfilerView.prototype.setupAnalysisViewOverride = function (result) {
                VisualProfiler.Program.triggerResize();
            };

            VisualProfilerView.prototype.showError = function (error, helpUrl) {
                var errorView = new Common.Controls.Legacy.TemplateControl("errorViewTemplate");

                var errorMessageDiv = errorView.findElement("errorMessage");
                errorMessageDiv.innerText = error.message;

                this.mainView.rootElement.innerHTML = "";
                this.mainView.rootElement.appendChild(errorView.rootElement);
            };
            return VisualProfilerView;
        })(VisualProfiler.VisualProfilerView);
        VS.VisualProfilerView = VisualProfilerView;
    })(VisualProfiler.VS || (VisualProfiler.VS = {}));
    var VS = VisualProfiler.VS;
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=f:/binaries/Intermediate/bpt/visualprofiler.csproj__1814247319/objr/x86/built/VisualProfilerView.vs.js.map


// SIG // Begin signature block
// SIG // MIIatwYJKoZIhvcNAQcCoIIaqDCCGqQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFF2+clQTZLLt
// SIG // J9Xgfdw4rrMmE9oDoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBS73pFKhkNa
// SIG // nDifsNobRX9tt5FSujBaBgorBgEEAYI3AgEMMUwwSqAw
// SIG // gC4AVgBpAHMAdQBhAGwAUAByAG8AZgBpAGwAZQByAE0A
// SIG // ZQByAGcAZQBkAC4AagBzoRaAFGh0dHA6Ly9taWNyb3Nv
// SIG // ZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAFkW4E2Ox3J/
// SIG // qsU7uly2f3RZbCLUoDFIuT4O7xuaGviefCukFLmPNu89
// SIG // ePUgv6WlqTXsi87AJS6YFIhqqzf8ZBr1mm2RaHKUPbcz
// SIG // 5wLtcEesl8YLYOsY/xeRRyL6kdfyjswpK8Cjt0hX1STI
// SIG // kUou3AWbIP9whrup6aLIMDp+WaPaBIM8Y8k7RTjz6vmb
// SIG // XFmk7KfG7Y7UFqY7UXYEpWd0eza5ypDqw9z1on7eUrrn
// SIG // AdX7pqaLl3d57xOJlM0IAQ//r3mY9q+VrQgHB5a+uhfN
// SIG // c3gxdLt5DTzmLqy8oX8SN/SDkYArfr4Q+EwkAYPYMEB+
// SIG // WtZJAyiFtHv2w7I+uGcJCfOhggIoMIICJAYJKoZIhvcN
// SIG // AQkGMYICFTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBAhMzAAAATKHoTcy0dHs7AAAAAABMMAkGBSsO
// SIG // AwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcB
// SIG // MBwGCSqGSIb3DQEJBTEPFw0xNDExMDEwNzI2MjdaMCMG
// SIG // CSqGSIb3DQEJBDEWBBSf/X9oro8WmvMwtd9qofeGAgKN
// SIG // zjANBgkqhkiG9w0BAQUFAASCAQAcReBiKHRNAMxwp4n3
// SIG // 0tErX68Vc2/XOeu4nZJ2HtI4tU4pj0oow4oqsAuC3UNj
// SIG // H+07T8GpUqE2qV84D8LILq0jMFyGNVwgjeDsE85WTF/R
// SIG // UqWuUvUXDXZIJjqK0LlAtGCPwTjdXhAoCIR386dfxcIQ
// SIG // d636S8/l2MJpKQlEhURhjyqPgcYYsGhxDwRqBmkqr7uF
// SIG // iOAtaqZnu3faIWIKQIGbii4RfJA+wEx3D2YZsUmrRQ9l
// SIG // Kb+MGEjThFH+e5nkmu8BRDuh+QH9DnFgu88Fvru8J0xh
// SIG // J2ckBq06ZJdeIlBjzT+QNaBGZayJJNzj86N0jZ7rURkG
// SIG // FXggi7iS6/ro8neg
// SIG // End signature block
