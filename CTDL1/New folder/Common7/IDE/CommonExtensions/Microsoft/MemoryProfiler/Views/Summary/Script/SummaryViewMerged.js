//
// Copyright (C) Microsoft. All rights reserved.
//
// snapshotTileView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var SnapshotTileViewModel = (function (_super) {
        __extends(SnapshotTileViewModel, _super);
        function SnapshotTileViewModel(summary, snapshotSummaryCollection) {
            _super.call(this);
            this._summary = summary;
            this._snapshotSummaryCollection = snapshotSummaryCollection;
        }
        Object.defineProperty(SnapshotTileViewModel.prototype, "summaryData", {
            get: function () {
                return this._summary;
            },
            set: function (v) {
                this._summary = v;
                this.raisePropertyChanged("summaryData");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "timeTaken", {
            get: function () {
                var date = new Date(this._summary.snapshot.timestamp);
                return "(" + date.toLocaleTimeString() + ")";
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSize", {
            get: function () {
                return this.summaryData.nativeTotalSize;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDisplayString", {
            get: function () {
                return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.nativeSize);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCount", {
            get: function () {
                return this.summaryData.nativeTotalCount;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDisplayString", {
            get: function () {
                return Plugin.Resources.getString("NativeCount", MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.nativeCount, true));
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDiff", {
            get: function () {
                var previousSnapshot = this.getPreviousSnapshot();
                if (previousSnapshot) {
                    return this._summary.nativeTotalSize - previousSnapshot.nativeTotalSize;
                }

                return 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDiffDisplayString", {
            get: function () {
                if (this.nativeSizeDiff === 0) {
                    return Plugin.Resources.getString("NoDiff");
                } else {
                    return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.nativeSizeDiff, true);
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDiff", {
            get: function () {
                var previousSnapshot = this.getPreviousSnapshot();
                if (previousSnapshot) {
                    return this._summary.nativeTotalCount - previousSnapshot.nativeTotalCount;
                }

                return 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDiffDisplayString", {
            get: function () {
                if (this.nativeCountDiff === 0) {
                    return Plugin.Resources.getString("NoDiff");
                } else {
                    return MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.nativeCountDiff, true, true);
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "managedSize", {
            get: function () {
                return this.summaryData.managedTotalSize;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDisplayString", {
            get: function () {
                return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.managedSize);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "managedCount", {
            get: function () {
                return this.summaryData.managedTotalCount;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDisplayString", {
            get: function () {
                return Plugin.Resources.getString("ManagedCount", MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.managedCount, true));
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDiff", {
            get: function () {
                var previousSnapshot = this.getPreviousSnapshot();
                if (previousSnapshot) {
                    return this._summary.managedTotalSize - previousSnapshot.managedTotalSize;
                }

                return 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDiffDisplayString", {
            get: function () {
                if (this.managedSizeDiff === 0) {
                    return Plugin.Resources.getString("NoDiff");
                } else {
                    return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.managedSizeDiff, true);
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDiff", {
            get: function () {
                var previousSnapshot = this.getPreviousSnapshot();
                if (previousSnapshot) {
                    return this._summary.managedTotalCount - previousSnapshot.managedTotalCount;
                }

                return 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDiffDisplayString", {
            get: function () {
                if (this.managedCountDiff === 0) {
                    return Plugin.Resources.getString("NoDiff");
                } else {
                    return MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.managedCountDiff, true, true);
                }
            },
            enumerable: true,
            configurable: true
        });

        SnapshotTileViewModel.prototype.getComparableSnapshots = function () {
            var result = [];

            for (var i = 0; i < this._snapshotSummaryCollection.length; i++) {
                var summary = this._snapshotSummaryCollection.getItem(i);
                if (summary.id !== this._summary.id) {
                    result.push(summary);
                }
            }

            return result;
        };

        Object.defineProperty(SnapshotTileViewModel.prototype, "isFirstSnapshot", {
            get: function () {
                return this.getPreviousSnapshot() === null;
            },
            enumerable: true,
            configurable: true
        });

        SnapshotTileViewModel.prototype.getPreviousSnapshot = function () {
            var previousId = this._summary.id - 1;
            if (previousId >= 0 && previousId < this._snapshotSummaryCollection.length) {
                return this._snapshotSummaryCollection.getItem(previousId);
            }
            return null;
        };
        return SnapshotTileViewModel;
    })(MemoryProfiler.Common.Controls.ObservableViewModel);
    MemoryProfiler.SnapshotTileViewModel = SnapshotTileViewModel;

    var SnapshotTileView = (function (_super) {
        __extends(SnapshotTileView, _super);
        function SnapshotTileView(controller, model) {
            _super.call(this, "SnapshotTileTemplate");

            this._controller = controller;
            this._model = model;
            this._controller.model.registerPropertyChanged(this);
            this._model.registerPropertyChanged(this);

            this._tileContextMenuItems = [];
            this._snapshotTile = this.findElement("snapshotTile");

            this._tileHeader = this.findElement("snapshotTileHeader");
            this.findElement("snapshotTileTitle").innerText = Plugin.Resources.getString("SnapshotNumber", this._model.summaryData.id + 1);

            this._screenshotHolder = this.findElement("snapshotTileImage");
            this._screenshotNotAvailableMessage = this.findElement("screenshotNotAvailableMessage");
            if (this._model.summaryData.snapshot.screenshotFile) {
                this._screenshotHolder.src = this._model.summaryData.snapshot.screenshotFile;
                this._screenshotNotAvailableMessage.style.display = "none";
            }

            this.findElement("snapshotTakenDate").innerText = this._model.timeTaken;
            this._screenshotNotAvailableMessage.innerText = Plugin.Resources.getString("ScreenshotNotAvailable");

            this._snapshotLoadingProgress = this.findElement("loadingSnapshotProgress");

            this.populateContextMenu();

            this.updateUI();
        }
        SnapshotTileView.prototype.updateUI = function () {
            this.populateWarningsSection();
            this.populateSummaryLinks();
            this.updateSnapshotDisplayType();
            this.updateLoadingProgress();
        };

        SnapshotTileView.prototype.populateWarningsSection = function () {
            var leakCount = this._model.summaryData.resourceLeakCount;
            if (leakCount && leakCount > 0) {
                var snapshotWarningsCount = this.findElement("snapshotTileWarningsCount");
                snapshotWarningsCount.innerText = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(leakCount, true);
                snapshotWarningsCount.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("SnapshotTileWarningsCountLinkTooltip"));
                snapshotWarningsCount.onclick = this.onLeaksCountClick.bind(this);
            } else {
                this.findElement("snapshotTileWarnings").style.visibility = "hidden";
            }
        };

        SnapshotTileView.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case "snapshotDisplayType":
                    this.updateSnapshotDisplayType();
                    break;

                case "summaryData":
                    this.updateUI();
                    break;
            }
        };

        SnapshotTileView.prototype.updateLoadingProgress = function () {
            if (this._model.summaryData.isProcessingCompleted) {
                this._screenshotHolder.style.visibility = "";
                this._screenshotNotAvailableMessage.style.visibility = "";
                this._snapshotLoadingProgress.style.visibility = "hidden";
                this.updateSnapshotDisplayType();
            } else {
                this._managedSummaryDiv.style.visibility = "hidden";
                this._nativeSummaryDiv.style.visibility = "hidden";
                this._screenshotHolder.style.visibility = "hidden";
                this._screenshotNotAvailableMessage.style.visibility = "hidden";
                this._snapshotLoadingProgress.style.visibility = "";
            }
        };

        SnapshotTileView.prototype.updateSnapshotDisplayType = function () {
            if (this._controller.model.snapshotDisplayType === 0 /* managed */) {
                this._managedSummaryDiv.style.visibility = this._model.summaryData.isProcessingCompleted ? "" : "hidden";
                this._nativeSummaryDiv.style.visibility = "hidden";
            } else if (this._controller.model.snapshotDisplayType === 1 /* native */) {
                this._managedSummaryDiv.style.visibility = "hidden";
                this._nativeSummaryDiv.style.visibility = this._model.summaryData.isProcessingCompleted ? "" : "hidden";
            }
        };

        SnapshotTileView.prototype.onCollectionChanged = function (eventArgs) {
            if (eventArgs.action === 0 /* Add */) {
                var newSummary = eventArgs.newItems[0];

                if (this._model.summaryData.id !== newSummary.id) {
                    var contextMenuItem = {
                        callback: this.onDiffToSnapshot.bind(this, newSummary.id),
                        disabled: this.shouldDisableCompareMenu.bind(this),
                        label: Plugin.Resources.getString("SnapshotNumber", newSummary.id + 1),
                        type: 1 /* command */
                    };

                    this._tileContextMenuItems.push(contextMenuItem);
                }

                this.createContextMenu();
            }
        };

        SnapshotTileView.prototype.setFocus = function () {
            this._tileHeader.focus();
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
                    disabled: this.shouldDisableCompareMenu.bind(this),
                    submenu: this._tileContextMenuItems,
                    type: 1 /* command */
                };

                this._tileContextMenu = Plugin.ContextMenu.create([compareToMenuItem]);
                this._tileContextMenu.attach(this._snapshotTile);
            }
        };

        SnapshotTileView.prototype.shouldDisableCompareMenu = function () {
            return this._controller.model.restoringSnapshots;
        };

        SnapshotTileView.prototype.populateContextMenu = function () {
            var comparableSnapshots = this._model.getComparableSnapshots();

            for (var i = 0; i < comparableSnapshots.length; i++) {
                var comparable = comparableSnapshots[i];
                var contextMenuItem = {
                    callback: this.onDiffToSnapshot.bind(this, comparable.id),
                    disabled: this.shouldDisableCompareMenu.bind(this),
                    label: Plugin.Resources.getString("SnapshotNumber", comparable.id + 1),
                    type: 1 /* command */
                };

                this._tileContextMenuItems.push(contextMenuItem);
            }

            this.createContextMenu();
        };

        SnapshotTileView.prototype.populateSummaryLinks = function () {
            this._managedSummaryDiv = this.findElement("managedSummaryData");

            var managedCountLink = this.findElement("managedCountLink");
            var managedSizeLink = this.findElement("managedSizeLink");
            var managedCountDiffLink = this.findElement("managedCountDiffLink");
            var managedCountDiffIndicatorIcon = this.findElement("managedCountDiffIndicatorIcon");
            var managedSizeDiffLink = this.findElement("managedSizeDiffLink");
            var managedSizeDiffIndicatorIcon = this.findElement("managedSizeDiffIndicatorIcon");

            managedCountLink.innerText = this._model.managedCountDisplayString;
            managedSizeLink.innerText = this._model.managedSizeDisplayString;
            managedSizeLink.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("ManagedSizeLinkTooltip"));
            managedCountLink.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("ManagedCountLinkTooltip"));

            managedSizeLink.onclick = this.onManagedSizeClick.bind(this);
            managedCountLink.onclick = this.onManagedCountClick.bind(this);

            if (!this._model.isFirstSnapshot) {
                managedSizeDiffLink.onclick = this.onManagedSizeDiffClick.bind(this);
                managedCountDiffLink.onclick = this.onManagedCountDiffClick.bind(this);
            }

            this.populateDiffLinks(managedSizeDiffLink, managedSizeDiffIndicatorIcon, this._model.managedSizeDiff, this._model.managedSizeDiffDisplayString, Plugin.Resources.getString("ManagedSizeDiffLinkTooltip"));
            this.populateDiffLinks(managedCountDiffLink, managedCountDiffIndicatorIcon, this._model.managedCountDiff, this._model.managedCountDiffDisplayString, Plugin.Resources.getString("ManagedCountDiffLinkTooltip"));

            this._nativeSummaryDiv = this.findElement("nativeSummaryData");

            var nativeCountLink = this.findElement("nativeCountLink");
            var nativeSizeLink = this.findElement("nativeSizeLink");
            var nativeCountDiffLink = this.findElement("nativeCountDiffLink");
            var nativeCountDiffIndicatorIcon = this.findElement("nativeCountDiffIndicatorIcon");
            var nativeSizeDiffLink = this.findElement("nativeSizeDiffLink");
            var nativeSizeDiffIndicatorIcon = this.findElement("nativeSizeDiffIndicatorIcon");

            nativeCountLink.innerText = this._model.nativeCountDisplayString;
            nativeSizeLink.innerText = this._model.nativeSizeDisplayString;
            nativeCountLink.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("NativeCountLinkTooltip"));
            nativeSizeLink.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("NativeSizeLinkTooltip"));

            nativeSizeLink.onclick = this.onNativeSizeClick.bind(this);
            nativeCountLink.onclick = this.onNativeCountClick.bind(this);

            if (!this._model.isFirstSnapshot) {
                nativeSizeDiffLink.onclick = this.onNativeSizeDiffClick.bind(this);
                nativeCountDiffLink.onclick = this.onNativeCountDiffClick.bind(this);
            }

            this.populateDiffLinks(nativeSizeDiffLink, nativeSizeDiffIndicatorIcon, this._model.nativeSizeDiff, this._model.nativeSizeDiffDisplayString, Plugin.Resources.getString("NativeSizeDiffLinkTooltip"));
            this.populateDiffLinks(nativeCountDiffLink, nativeCountDiffIndicatorIcon, this._model.nativeCountDiff, this._model.nativeCountDiffDisplayString, Plugin.Resources.getString("NativeCountDiffLinkTooltip"));

            var links = this.findElementsByClassName("BPT-FileLink");
            for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
                var linkElement = links[linkIndex];
                linkElement.onkeydown = this.onLinkElementKeyDown.bind(linkElement);
            }
        };

        SnapshotTileView.prototype.onLinkElementKeyDown = function (e) {
            if ((e.keyCode === 13 /* ENTER */ || e.keyCode === 32 /* SPACE */) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                e.srcElement.click();
            }
        };

        SnapshotTileView.prototype.populateDiffLinks = function (element, iconElement, delta, deltaDisplayString, deltaTooltip) {
            if (!this._model.isFirstSnapshot) {
                element.innerText = deltaDisplayString;
                element.setAttribute("data-plugin-vs-tooltip", deltaTooltip);

                if (delta > 0) {
                    iconElement.classList.add("increaseIcon");
                } else if (delta < 0) {
                    iconElement.classList.add("decreaseIcon");
                }
            } else {
                element.classList.remove("BPT-FileLink");
                element.classList.add("baselineText");
                element.innerText = Plugin.Resources.getString("Baseline");
                element.tabIndex = -1;
            }
        };

        SnapshotTileView.prototype.onManagedSizeClick = function (e) {
            this._controller.openManagedSizeDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onManagedCountClick = function (e) {
            this._controller.openManagedCountDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onManagedSizeDiffClick = function (e) {
            this._controller.openManagedSizeDiffDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onManagedCountDiffClick = function (e, target) {
            this._controller.openManagedCountDiffDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onNativeSizeClick = function (e) {
            this._controller.openNativeSizeDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onNativeCountClick = function (e) {
            this._controller.openNativeCountDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onNativeSizeDiffClick = function (e) {
            this._controller.openNativeSizeDiffDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onNativeCountDiffClick = function (e, target) {
            this._controller.openNativeCountDiffDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onLeaksCountClick = function (e) {
            this._controller.openResourceLeaksDetails(this._model.summaryData.id);
        };

        SnapshotTileView.prototype.onDiffToSnapshot = function (id) {
            if (this._controller.model.snapshotDisplayType == 0 /* managed */) {
                this._controller.openManagedSnapshotDiffDetails(this._model.summaryData.id, id);
            } else {
                this._controller.openNativeSnapshotDiffDetails(this._model.summaryData.id, id);
            }
        };
        return SnapshotTileView;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.SnapshotTileView = SnapshotTileView;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=snapshotTileView.js.map

// SummaryView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common = MemoryProfiler.Common;

var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var SummaryViewController = (function () {
        function SummaryViewController(sessionInfo) {
            this._pendingSnapshots = [];
            this._summaryAgents = [];
            MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27202 /* perfMP_ViewLoadStart */, 27203 /* perfMP_ViewLoadEnd */);
            this.model = new SummaryViewModel();
            this.view = new SummaryView(this, this.model);

            this._loadDataWarehousePromise = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse();
            this._loadDataWarehousePromise.then(function (dataWareHouse) {
                MemoryProfiler.Common.MemoryProfilerViewHost.session.setScriptedContextId(dataWareHouse.getConfiguration().sessionId);
            });

            if (sessionInfo.snapshots.length === 0) {
                this.model.warningMessage = Plugin.Resources.getString("NoSnapshotsTakenWarning");
                ;
                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27202 /* perfMP_ViewLoadStart */);
                return;
            }

            this.loadExistingSnapshots(sessionInfo);

            if (sessionInfo.targetRuntime === 3 /* mixed */) {
                this.view.initializeToggleBar();
            } else if (sessionInfo.targetRuntime === 1 /* native */) {
                this.model.snapshotDisplayType = 1 /* native */;
            }
        }
        SummaryViewController.prototype.loadExistingSnapshots = function (sessioninfo) {
            var _this = this;
            var snapshots = sessioninfo.snapshots;
            var snapshotAgents = [];

            MemoryProfiler.Common.MemoryProfilerViewHost.session.logBeginLoadSnapshots();

            snapshotAgents.push(new MemoryProfiler.Common.ScreenshotSnapshotAgent());

            if (sessioninfo.targetRuntime !== 1 /* native */) {
                snapshotAgents.push(new MemoryProfiler.Common.ClrSnapshotAgent());
                this._summaryAgents.push(new MemoryProfiler.Common.ManagedSummaryAgent());
            }

            if (sessioninfo.targetRuntime !== 2 /* managed */) {
                this._summaryAgents.push(new MemoryProfiler.Common.NativeSummaryAgent(this._loadDataWarehousePromise));
            }

            if (sessioninfo.isRLDEnabled === true) {
                this._summaryAgents.push(new MemoryProfiler.Common.MemoryLeaksSummaryAgent(this._loadDataWarehousePromise));
            }

            this.model.restoringSnapshots = true;
            this._pendingSnapshots = [];

            for (var i = 0; i < snapshots.length; i++) {
                var restoreEngine = new MemoryProfiler.Common.SnapshotRestoreEngine(i, snapshotAgents, snapshots[i]);
                restoreEngine.restore(function (snapshot) {
                    _this._pendingSnapshots.push(snapshot);
                    _this.model.snapshotSummaryCollection.add(new MemoryProfiler.Common.SnapshotSummary(snapshot));
                });
            }

            MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionStartupTime().then(function (sessionStartTime) {
                var promises = [];
                _this._summaryAgents.forEach(function (agent) {
                    promises.push(agent.initializeAnalyzerData(sessionStartTime, _this._pendingSnapshots));
                });
                return Plugin.Promise.join(promises);
            }).done(function () {
                _this._pendingSnapshots.reverse();
                _this.processNextSnapshotSummary();
            });
        };

        SummaryViewController.prototype.openManagedSizeDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenManagedHeapViewBySize, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.viewSnapshot(snapshotId, "ManagedHeap", "RetainedSize");
        };

        SummaryViewController.prototype.openManagedCountDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenManagedHeapViewByCount, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.viewSnapshot(snapshotId, "ManagedHeap", "Count");
        };

        SummaryViewController.prototype.openManagedSizeDiffDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenDiffManagedHeapViewBySize, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.compareSnapshots(snapshotId, snapshotId - 1, "ManagedHeap", "RetainedSizeDiff");
        };

        SummaryViewController.prototype.openManagedCountDiffDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenDiffManagedHeapViewByCount, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.compareSnapshots(snapshotId, snapshotId - 1, "ManagedHeap", "CountDiff");
        };

        SummaryViewController.prototype.openManagedSnapshotDiffDetails = function (snapshotId1, snapshotId2) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenDiffManagedHeapView, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Menu, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.compareSnapshots(Math.max(snapshotId1, snapshotId2), Math.min(snapshotId1, snapshotId2), "ManagedHeap", "RetainedSizeDiff");
        };

        SummaryViewController.prototype.openNativeSizeDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenNativeHeapViewBySize, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.viewSnapshot(snapshotId, "NativeHeap", "OutstandingSize");
        };

        SummaryViewController.prototype.openNativeCountDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenNativeHeapViewByCount, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.viewSnapshot(snapshotId, "NativeHeap", "OutstandingCount");
        };

        SummaryViewController.prototype.openResourceLeaksDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenMemoryLeaksView, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.viewSnapshot(snapshotId, "MemoryLeaks", "OutstandingSize");
        };

        SummaryViewController.prototype.openNativeSizeDiffDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenDiffNativeHeapViewBySize, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.compareSnapshots(snapshotId, snapshotId - 1, "NativeHeap", "OutstandingSizeDiff");
        };

        SummaryViewController.prototype.openNativeCountDiffDetails = function (snapshotId) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenDiffNativeHeapViewByCount, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.compareSnapshots(snapshotId, snapshotId - 1, "NativeHeap", "OutstandingCountDiff");
        };

        SummaryViewController.prototype.openNativeSnapshotDiffDetails = function (snapshotId1, snapshotId2) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.OpenDiffNativeHeapView, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Menu, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
            this.compareSnapshots(Math.max(snapshotId1, snapshotId2), Math.min(snapshotId1, snapshotId2), "NativeHeap", "OutstandingSizeDiff");
        };

        SummaryViewController.prototype.viewSnapshot = function (snapshotId, target, sortProperty) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.openSnapshotDetails(snapshotId, target, sortProperty, this.shouldAddMemoryLeaksTab(snapshotId));
        };

        SummaryViewController.prototype.shouldAddMemoryLeaksTab = function (snapshotId) {
            if (this.model.snapshotSummaryCollection.getItem(snapshotId).resourceLeakCount && this.model.snapshotSummaryCollection.getItem(snapshotId).resourceLeakCount > 0) {
                return true;
            }

            return false;
        };

        SummaryViewController.prototype.compareSnapshots = function (lastSnapshotId, firstSnapshotId, target, sortProperty) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.openSnapshotDiff(firstSnapshotId, lastSnapshotId, target, sortProperty);
        };

        SummaryViewController.prototype.reset = function () {
            this.model.snapshotSummaryCollection.clear();

            MemoryProfiler.Common.MemoryProfilerViewHost.onIdle();
        };

        SummaryViewController.prototype.processNextSnapshotSummary = function () {
            if (this._pendingSnapshots.length == 0) {
                this.summaryProcessCleanup();
            } else {
                var snapshot = this._pendingSnapshots.pop();
                this._summaryEngine = new MemoryProfiler.Common.SummaryEngine(snapshot, this._summaryAgents);
                this._summaryEngine.processSummary().done(this.onSummaryProcessComplete.bind(this), this.onSummaryProcessError.bind(this), this.onSummaryProcessProgress.bind(this));
            }
        };

        SummaryViewController.prototype.cancelSummaryProcessing = function () {
            if (this._summaryEngine) {
                this._summaryEngine.cancel();
                this.summaryProcessCleanup();
            }
        };

        SummaryViewController.prototype.onSummaryProcessComplete = function (summary) {
            for (var i = 0; i < this.model.snapshotSummaryCollection.length; i++) {
                if (this.model.snapshotSummaryCollection.getItem(i).id === summary.id) {
                    this.model.snapshotSummaryCollection.replace(i, summary);
                    break;
                }
            }
            this.processNextSnapshotSummary();
        };

        SummaryViewController.prototype.onSummaryProcessError = function (error) {
            this.summaryProcessCleanup();
        };

        SummaryViewController.prototype.onSummaryProcessProgress = function (progress) {
        };

        SummaryViewController.prototype.summaryProcessCleanup = function () {
            this._summaryEngine = null;
            this._summaryAgents = null;
            this._pendingSnapshots = [];
            this.model.restoringSnapshots = false;

            MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27202 /* perfMP_ViewLoadStart */);
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logEndLoadSnapshots();
        };
        return SummaryViewController;
    })();
    MemoryProfiler.SummaryViewController = SummaryViewController;

    var SummaryViewModel = (function (_super) {
        __extends(SummaryViewModel, _super);
        function SummaryViewModel() {
            _super.call(this);
            this._warningMessage = "";
            this._restoringSnapshots = false;
            this._snapshotDisplayType = 0 /* managed */;
            this._snapshotSummaryCollection = new MemoryProfiler.Common.Controls.ObservableCollection();

            this.LogSelectSnapshotViewCommand(this.snapshotDisplayType, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Default, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
        }
        Object.defineProperty(SummaryViewModel.prototype, "snapshotSummaryCollection", {
            get: function () {
                return this._snapshotSummaryCollection;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SummaryViewModel.prototype, "warningMessage", {
            get: function () {
                return this._warningMessage;
            },
            set: function (v) {
                if (this._warningMessage !== v) {
                    this._warningMessage = v;
                    this.raisePropertyChanged("warningMessage");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SummaryViewModel.prototype, "snapshotDisplayType", {
            get: function () {
                return this._snapshotDisplayType;
            },
            set: function (v) {
                if (this._snapshotDisplayType !== v) {
                    this._snapshotDisplayType = v;
                    this.LogSelectSnapshotViewCommand(v, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.SummaryView);
                    this.raisePropertyChanged("snapshotDisplayType");
                }
            },
            enumerable: true,
            configurable: true
        });

        SummaryViewModel.prototype.LogSelectSnapshotViewCommand = function (v, invokeMethodName, commandSourceName) {
            var feedbackCommandName;
            if (v === 0 /* managed */) {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.SelectManagedHeapSnapshotView;
            } else {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.SelectNativeHeapSnapshotView;
            }
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(feedbackCommandName, invokeMethodName, commandSourceName);
        };

        Object.defineProperty(SummaryViewModel.prototype, "restoringSnapshots", {
            get: function () {
                return this._restoringSnapshots;
            },
            set: function (v) {
                if (this._restoringSnapshots !== v) {
                    this._restoringSnapshots = v;
                    this.raisePropertyChanged("restoringSnapshots");
                    if (this._restoringSnapshots) {
                        MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27230 /* perfMP_SnapshotRestoreStart */, 27231 /* perfMP_SnapshotRestoreEnd */);
                    } else {
                        MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27230 /* perfMP_SnapshotRestoreStart */);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });

        return SummaryViewModel;
    })(MemoryProfiler.Common.Controls.ObservableViewModel);
    MemoryProfiler.SummaryViewModel = SummaryViewModel;

    var SummaryView = (function (_super) {
        __extends(SummaryView, _super);
        function SummaryView(controller, model) {
            _super.call(this, "SummaryViewTemplate");

            this._controller = controller;
            this._model = model;

            this._snapshotTileViewModelCollection = [];
            this._model.registerPropertyChanged(this);
            this._model.snapshotSummaryCollection.registerCollectionChanged(this);
            this._tilesContainer = this.findElement("tilesContainer");
            this._warningSection = this.findElement("warningSection");
        }
        Object.defineProperty(SummaryView.prototype, "snapshotTileViewModelCollection", {
            get: function () {
                return this._snapshotTileViewModelCollection;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SummaryView.prototype, "tilesContainer", {
            get: function () {
                return this._tilesContainer;
            },
            enumerable: true,
            configurable: true
        });

        SummaryView.prototype.initializeToggleBar = function () {
            this._snapshotToggleBar = this.findElement("toggleTabSection");
            var toggle = new MemoryProfiler.SnapshotHeapTypeToggle(this._model);
            this._snapshotToggleBar.appendChild(toggle.rootElement);
        };

        SummaryView.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case "warningMessage":
                    this.showWarningMessage(this._model.warningMessage);
                    break;
            }
        };

        SummaryView.prototype.onCollectionChanged = function (eventArgs) {
            switch (eventArgs.action) {
                case 0 /* Add */:
                    this.createTile(eventArgs.newItems[0]);
                    break;
                case 1 /* Reset */:
                    this.removeSnapshotTiles();
                    break;
                case 2 /* Replace */:
                    this.updateTile(eventArgs.newItems[0]);
                    break;
            }
        };

        SummaryView.prototype.updateTile = function (snapshotSummary) {
            for (var i = 0; i < this._snapshotTileViewModelCollection.length; i++) {
                if (this._snapshotTileViewModelCollection[i].summaryData.id === snapshotSummary.id) {
                    this._snapshotTileViewModelCollection[i].summaryData = snapshotSummary;
                    break;
                }
            }
        };

        SummaryView.prototype.createTile = function (snapshotSummary) {
            var model = new MemoryProfiler.SnapshotTileViewModel(snapshotSummary, this._model.snapshotSummaryCollection);
            var newTile = new MemoryProfiler.SnapshotTileView(this._controller, model);
            this._model.snapshotSummaryCollection.registerCollectionChanged(newTile);
            this._snapshotTileViewModelCollection.push(model);

            this._tilesContainer.insertBefore(newTile.rootElement, this._takeSnapshotTile);

            newTile.rootElement.scrollIntoView(true);
            newTile.setFocus();
        };

        SummaryView.prototype.removeSnapshotTiles = function () {
            while (this._tilesContainer.hasChildNodes()) {
                this._tilesContainer.removeChild(this._tilesContainer.firstChild);
            }

            this._snapshotTileViewModelCollection = [];
        };

        SummaryView.prototype.toggleProgress = function (show) {
            if (this._snapshotProgress && this._snapshotError) {
                if (show) {
                    this._snapshotLabel.style.display = "none";
                    this._snapshotIcon.style.display = "none";
                    this._snapshotProgress.style.display = "block";
                    this._snapshotError.style.display = "none";
                } else {
                    this._snapshotLabel.style.display = "";
                    this._snapshotIcon.style.display = "";
                    this._snapshotProgress.style.display = "none";
                }
            }
        };

        SummaryView.prototype.showSnapshotError = function (error) {
            if (this._snapshotErrorMsg && this._snapshotError) {
                if (error) {
                    this._snapshotErrorMsg.innerText = MemoryProfiler.Common.ErrorFormatter.format(error);
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
                this._warningSection.style.display = "-ms-grid";
            } else {
                this._warningSection.innerHTML = "";
                this._warningSection.style.display = "none";
            }
        };
        return SummaryView;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.SummaryView = SummaryView;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=SummaryView.js.map

// SummaryViewHost.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var SummaryViewHost = (function (_super) {
        __extends(SummaryViewHost, _super);
        function SummaryViewHost() {
            _super.call(this);
        }
        SummaryViewHost.prototype.initializeView = function (sessionInfo) {
            this.summaryViewController = new MemoryProfiler.SummaryViewController(sessionInfo);
            document.getElementById('mainContainer').appendChild(this.summaryViewController.view.rootElement);
        };
        return SummaryViewHost;
    })(MemoryProfiler.Common.MemoryProfilerViewHostBase);
    MemoryProfiler.SummaryViewHost = SummaryViewHost;

    MemoryProfiler.SummaryViewHostInstance = new SummaryViewHost();
})(MemoryProfiler || (MemoryProfiler = {}));

MemoryProfiler.SummaryViewHostInstance.loadView();
//# sourceMappingURL=SummaryViewHost.js.map

// snapshotHeapTypeToggle.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    (function (SnapshotDisplayType) {
        SnapshotDisplayType[SnapshotDisplayType["managed"] = 0] = "managed";
        SnapshotDisplayType[SnapshotDisplayType["native"] = 1] = "native";
    })(MemoryProfiler.SnapshotDisplayType || (MemoryProfiler.SnapshotDisplayType = {}));
    var SnapshotDisplayType = MemoryProfiler.SnapshotDisplayType;

    var SnapshotHeapTypeToggle = (function (_super) {
        __extends(SnapshotHeapTypeToggle, _super);
        function SnapshotHeapTypeToggle(viewModel) {
            _super.call(this, "SnapshotHeapTypeToggleTemplate");

            this._summaryViewModel = viewModel;
            this._summaryViewModel.registerPropertyChanged(this);

            this._managedHeapButton = this.findElement("snapshotToggleTabManagedButton");
            this._nativeHeapButton = this.findElement("snapshotToggleTabdNativeButton");

            this.findElement("snapshotToggleTabLabel").innerText = Plugin.Resources.getString("SnapshotToggleTabLabel");
            ;
            this._managedHeapButton.innerHTML = Plugin.Resources.getString("SnapshotToggleTabManagedButton");
            this._nativeHeapButton.innerText = Plugin.Resources.getString("SnapshotToggleTabNativeButton");

            this._managedHeapButton.onclick = this.setManagedHeapToggleButtonSelected.bind(this);
            this._nativeHeapButton.onclick = this.setNativeHeapToggleButtonSelected.bind(this);

            var toggleButtons = this.findElementsByClassName("toggleTabButtonContainer");
            for (var buttomIndex = 0; buttomIndex < toggleButtons.length; buttomIndex++) {
                var buttonElement = toggleButtons[buttomIndex];
                buttonElement.onkeydown = this.onButtonElementKeyDown.bind(buttonElement);
            }

            this.updateUI();
        }
        SnapshotHeapTypeToggle.prototype.onButtonElementKeyDown = function (e) {
            if ((e.keyCode === 13 /* ENTER */ || e.keyCode === 32 /* SPACE */) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                e.srcElement.click();
            }
        };

        SnapshotHeapTypeToggle.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case "snapshotDisplayType":
                    this.updateUI();
                    break;
            }
        };

        SnapshotHeapTypeToggle.prototype.updateUI = function () {
            var isManagedSelected = this._summaryViewModel.snapshotDisplayType === 0 /* managed */;
            if (isManagedSelected) {
                this._managedHeapButton.classList.add("toggleTabSelectedButtonOutline");
                this._nativeHeapButton.classList.remove("toggleTabSelectedButtonOutline");
            } else if (this._summaryViewModel.snapshotDisplayType === 1 /* native */) {
                this._nativeHeapButton.classList.add("toggleTabSelectedButtonOutline");
                this._managedHeapButton.classList.remove("toggleTabSelectedButtonOutline");
            }

            this._nativeHeapButton.setAttribute("aria-checked", isManagedSelected ? "false" : "true");
            this._managedHeapButton.setAttribute("aria-checked", isManagedSelected ? "true" : "false");
        };

        SnapshotHeapTypeToggle.prototype.setManagedHeapToggleButtonSelected = function () {
            this._summaryViewModel.snapshotDisplayType = 0 /* managed */;
        };

        SnapshotHeapTypeToggle.prototype.setNativeHeapToggleButtonSelected = function () {
            this._summaryViewModel.snapshotDisplayType = 1 /* native */;
        };
        return SnapshotHeapTypeToggle;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.SnapshotHeapTypeToggle = SnapshotHeapTypeToggle;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=snapshotHeapTypeToggle.js.map


// SIG // Begin signature block
// SIG // MIIasQYJKoZIhvcNAQcCoIIaojCCGp4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFBm8hOtcQ/Wc
// SIG // evpXOwJ2Q/QRRXDloIIVgjCCBMMwggOroAMCAQICEzMA
// SIG // AABxsy6Ka4KqH04AAAAAAHEwDQYJKoZIhvcNAQEFBQAw
// SIG // dzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEhMB8GA1UEAxMYTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgUENBMB4XDTE1MDMyMDE3
// SIG // MzIwM1oXDTE2MDYyMDE3MzIwM1owgbMxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xDTALBgNVBAsTBE1PUFIxJzAlBgNVBAsT
// SIG // Hm5DaXBoZXIgRFNFIEVTTjpCOEVDLTMwQTQtNzE0NDEl
// SIG // MCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2Vy
// SIG // dmljZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// SIG // ggEBAOqRvbKI/RRvITYoA2YzOmYI+1tLpKugKDRKQzII
// SIG // wIblyT3VJbx7PmKH1n3vD3RTo/GRY4h0f+gkzQNQxfHK
// SIG // ABZ7pTmwBhw8RH7568SygbwXI7r9ZTgZhX/KoCn99jrA
// SIG // Cy9o9OA0Tn1vF8Bumar6f2El0SZw0nR932FzXM5UKjlR
// SIG // AzMJ+FCteMeJCLbUhSo/19gfUerv/GhetcHnB2gyjS9y
// SIG // Uf4DMUdRxdLrcgevIJX42mr4d2fkYJpwTKtFy34Ir+WB
// SIG // 1FfPOswTdZ0mzaCiaVC8OoiU37BUON6JOc2GMqWQD36/
// SIG // 7cyUJaZBhmEmx903flwN6BfKN3/oJLZOtPgbI+sCAwEA
// SIG // AaOCAQkwggEFMB0GA1UdDgQWBBT4/SOHBZSAVs0zpUHC
// SIG // bMwINsiyojAfBgNVHSMEGDAWgBQjNPjZUkZwCu1A+3b7
// SIG // syuwwzWzDzBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNyb3NvZnRUaW1lU3RhbXBQQ0EuY3JsMFgGCCsG
// SIG // AQUFBwEBBEwwSjBIBggrBgEFBQcwAoY8aHR0cDovL3d3
// SIG // dy5taWNyb3NvZnQuY29tL3BraS9jZXJ0cy9NaWNyb3Nv
// SIG // ZnRUaW1lU3RhbXBQQ0EuY3J0MBMGA1UdJQQMMAoGCCsG
// SIG // AQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IBAQAtBLTKKQtZ
// SIG // /C7qoK9MTmgE+JLtKcJmzGtwyYfovof8XfTdT6Uab3iX
// SIG // rWsFOFFBcp055Bobw21x/HC208y2kFgEKD/WHu+DsxQY
// SIG // DJUL96URE5jGhVZe7jO0DDe1gOr1EmjZLnuGCHI7FHvU
// SIG // 2dAWT8AvCx8tyuUb0K7phLCPC11zuBaBQCNYLOphqv69
// SIG // f9ONWnD8ec1mlmVjtQUSduIqOyvtgqya7CdBp5cOIxaf
// SIG // QchObVMRQATMYJnamOwrrpf74H31uosA9CUXf2J6u1FX
// SIG // wfDwzZwbYXOtlYwrdiKoq3A4tAEofWZCU96f9Ad8WjAO
// SIG // ggNZ9oSGuRUlYrAL0s/x25ZFMIIE7DCCA9SgAwIBAgIT
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
// SIG // L54/LlUWa8kTo/0xggSbMIIElwIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAQosea7XeXumrAAB
// SIG // AAABCjAJBgUrDgMCGgUAoIG0MBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBQET1wBkfea
// SIG // vE0Ga4WD7vrte13f5jBUBgorBgEEAYI3AgEMMUYwRKAq
// SIG // gCgAUwB1AG0AbQBhAHIAeQBWAGkAZQB3AE0AZQByAGcA
// SIG // ZQBkAC4AagBzoRaAFGh0dHA6Ly9taWNyb3NvZnQuY29t
// SIG // MA0GCSqGSIb3DQEBAQUABIIBAI/icTEOEkYXWo93n0R7
// SIG // h5ytlxoShHT6IMjr787e4FLd7hlZj2jFK8rctyv5X7FL
// SIG // R5gUo08JMVtQKFjMjJJRgrG3LBROjV+4PCRLrvpl1e9B
// SIG // GFmPdFLFkpp8MPjGemNrRv7nT1iFNPJN9pM8WWVNJCTC
// SIG // 3fZc/NZ/cKpDE/pQHX45LBOGLx28BoPlixYWqBmngagz
// SIG // O35fuMcbOrLXheh8exw0J1/9+gGUTKd+pGmxMheSl++g
// SIG // zHf1sS7tX1ftQ6gFo9Atz2ZpGCVifhmXXdYnRwKBDsKq
// SIG // QMWHvwTwX86j380M5KEXOGul1/Xwz35CBiu/upXxK9qd
// SIG // GcYrFtbOiQsviX2hggIoMIICJAYJKoZIhvcNAQkGMYIC
// SIG // FTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEh
// SIG // MB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // AhMzAAAAcbMuimuCqh9OAAAAAABxMAkGBSsOAwIaBQCg
// SIG // XTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqG
// SIG // SIb3DQEJBTEPFw0xNTA2MjkwNDMzNTVaMCMGCSqGSIb3
// SIG // DQEJBDEWBBSIEj39lD77NdyfFMjg4zbPiA4q2TANBgkq
// SIG // hkiG9w0BAQUFAASCAQCT+5YDFinTJFOG0mB+jX/zS6fr
// SIG // BEa+SLit3HiEGLVe5Ke1qamSUUC/FiWqHs3Jk00h6Dni
// SIG // QhjZAS7ZUw9NwozE+AdspO7mjQn5v8WCsEwk0xxutoa9
// SIG // oAL5Oy4EC+6R3shSDF7rhnCT2uZwAi90YYQf28QBPMQ2
// SIG // 8LlXCS0VO+o44Q7zPrtgPS4ejmxGM5lRTe7RnTFvnsns
// SIG // LXHoDxiATOlitcZAHDlrCSS1obb68MbIt8UPewuWfe8m
// SIG // GkASV2SlrSE4CUZkuJy8aYupwYzp7mR3n9RrQ+eRhUif
// SIG // ROdpo+V9YFj/0R3kvN72AVSl+XgcGC4TzAvbABGXcw3o
// SIG // ezryhX0Z
// SIG // End signature block
