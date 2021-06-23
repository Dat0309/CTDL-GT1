//
// Copyright (C) Microsoft. All rights reserved.
//
// SnapshotTileView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var SnapshotTileViewModel = (function () {
        function SnapshotTileViewModel(summary) {
            this._summary = summary;
        }
        Object.defineProperty(SnapshotTileViewModel.prototype, "summaryData", {
            get: function () {
                return this._summary;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SnapshotTileViewModel.prototype, "timeTaken", {
            get: function () {
                var date = new Date(this._summary.timestamp);
                return "(" + date.toLocaleTimeString() + ")";
            },
            enumerable: true,
            configurable: true
        });
        return SnapshotTileViewModel;
    })();
    MemoryProfiler.SnapshotTileViewModel = SnapshotTileViewModel;

    var SnapshotTileView = (function (_super) {
        __extends(SnapshotTileView, _super);
        function SnapshotTileView(model) {
            _super.call(this, "SnapshotTileTemplate");

            this._model = model;
            this._snapshotTile = this.findElement("snapshotTile");

            this._tileHeader = this.findElement("snapshotTileHeader");
            this._screenshotNotAvailableMessage = this.findElement("screenshotNotAvailableMessage");
            this.findElement("snapshotTileTitle").innerText = Plugin.Resources.getString("SnapshotNumber", this._model.summaryData.id);

            if (this._model.summaryData.screenshotFile) {
                var imgHolder = this.findElement("snapshotTileImage");
                imgHolder.src = this._model.summaryData.screenshotFile;
                this._screenshotNotAvailableMessage.style.display = "none";
            }

            this.findElement("snapshotTakenDate").innerText = this._model.timeTaken;
            this.findElement("stopToSeeSnapshotDetails").innerText = Plugin.Resources.getString("StopToSeeSnapshotMessage");
            this._screenshotNotAvailableMessage.innerText = Plugin.Resources.getString("ScreenshotNotAvailable");
        }
        SnapshotTileView.prototype.setFocus = function () {
            this._tileHeader.focus();
        };
        return SnapshotTileView;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.SnapshotTileView = SnapshotTileView;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=SnapshotTileView.js.map

// CollectionView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var CollectionViewController = (function () {
        function CollectionViewController(initializeView) {
            if (typeof initializeView === "undefined") { initializeView = true; }
            this._screenshotHeight = 150;
            this._screenshotKeepAspectRatio = true;
            this._screenshotWidth = 200;
            this._agentGuid = "2E8E6F4B-6107-4F46-8BEA-A920EA880452";
            this._activeCollectionAgentTasks = [];
            this.model = new CollectionViewModel();
            if (initializeView) {
                this.view = new CollectionView(this, this.model);
            }

            this._standardCollector = Microsoft.VisualStudio.DiagnosticsHub.Collectors.getStandardTransportService();
            if (this._standardCollector) {
                this._standardCollector.addMessageListener(this._agentGuid, this.onMessageReceived.bind(this));
            }

            this._takeSnapshotTask = new MemoryProfiler.TakeSnapshotTask(this);
            this._forceGcTask = new MemoryProfiler.ForceGcCollectionAgentTask(this);
        }
        Object.defineProperty(CollectionViewController.prototype, "isCollectionAgentTaskActive", {
            get: function () {
                return this._activeCollectionAgentTasks.length > 0;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(CollectionViewController.prototype, "updatedTargetRuntime", {
            get: function () {
                return this._updatedTargetRuntime;
            },
            set: function (v) {
                this._updatedTargetRuntime = v;
            },
            enumerable: true,
            configurable: true
        });


        CollectionViewController.prototype.takeSnapshot = function () {
            this._activeCollectionAgentTasks.push(this._takeSnapshotTask);
            return this._takeSnapshotTask.start();
        };

        CollectionViewController.prototype.forceGarbageCollection = function () {
            this._activeCollectionAgentTasks.push(this._forceGcTask);
            return this._forceGcTask.start();
        };

        CollectionViewController.prototype.setScreenshotSize = function (targetWidth, targetHeight, keepAspectRatio) {
            this._screenshotWidth = targetWidth;
            this._screenshotHeight = targetHeight;
            this._screenshotKeepAspectRatio = keepAspectRatio;
        };

        CollectionViewController.prototype.reset = function () {
            CollectionViewController._nextIdentifier = 1;
            this.model.snapshotSummaryCollection.clear();

            MemoryProfiler.Common.MemoryProfilerViewHost.onIdle();
        };

        CollectionViewController.prototype.sendStringToCollectionAgent = function (request) {
            return this._standardCollector.sendStringToCollectionAgent(this._agentGuid, request);
        };

        CollectionViewController.prototype.downloadFile = function (targetFilePath, localFilePath) {
            var transportService = Microsoft.VisualStudio.DiagnosticsHub.Collectors.getStandardTransportService();
            return transportService.downloadFile(targetFilePath, localFilePath);
        };

        CollectionViewController.prototype.getSnapshotSummary = function (snapshotId) {
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

        CollectionViewController.prototype.onMessageReceived = function (message) {
            if (message) {
                var obj = JSON.parse(message);
                if (obj.eventName) {
                    switch (obj.eventName) {
                        case "notifyTargetRuntime":
                            var newTargetRuntime = MemoryProfiler.Common.Enum.Parse(MemoryProfiler.Common.Extensions.TargetRuntime, obj.data);
                            if (newTargetRuntime === 1 /* native */) {
                                this.updatedTargetRuntime = newTargetRuntime;
                            } else if (newTargetRuntime === 2 /* managed */) {
                                MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionInfo().then(function (info) {
                                    if (info.targetRuntime === 2 /* managed */ || info.targetRuntime === 3 /* mixed */) {
                                        MemoryProfiler.CollectionViewHost.VsCommandChain.onTargetIsManaged();
                                    }
                                });
                            }
                            break;
                        default:
                            break;
                    }
                }
            }

            for (var i = this._activeCollectionAgentTasks.length - 1; i >= 0; i--) {
                if (this._activeCollectionAgentTasks[i].isCompleted(message)) {
                    this._activeCollectionAgentTasks.splice(i, 1);
                }
            }
        };

        CollectionViewController.prototype.sendMessage = function (message) {
            this._standardCollector.sendStringToCollectionAgent(this._agentGuid, message).done(function (response) {
                if (response) {
                    var obj = JSON.parse(response);
                    if (!obj.succeeded) {
                        throw new Error(obj.errorMessage);
                    }
                }
            });
        };
        CollectionViewController._snapshotChunkSize = 32768;
        CollectionViewController._nextIdentifier = 1;
        return CollectionViewController;
    })();
    MemoryProfiler.CollectionViewController = CollectionViewController;

    var CollectionViewModel = (function (_super) {
        __extends(CollectionViewModel, _super);
        function CollectionViewModel() {
            _super.call(this);
            this._warningMessage = "";
            this._latestSnapshotError = null;
            this._isTakingSnapshot = false;
            this._isForcingGarbageCollection = false;
            this._snapshotSummaryCollection = new MemoryProfiler.Common.Controls.ObservableCollection();
        }
        Object.defineProperty(CollectionViewModel.prototype, "snapshotSummaryCollection", {
            get: function () {
                return this._snapshotSummaryCollection;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(CollectionViewModel.prototype, "warningMessage", {
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

        Object.defineProperty(CollectionViewModel.prototype, "latestSnapshotError", {
            get: function () {
                return this._latestSnapshotError;
            },
            set: function (v) {
                if (this._latestSnapshotError !== v) {
                    this._latestSnapshotError = v;
                    this.raisePropertyChanged("latestSnapshotError");

                    MemoryProfiler.Common.MemoryProfilerViewHost.reportError(v, "SnapshotCapturingFailure");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(CollectionViewModel.prototype, "isTakingSnapshot", {
            get: function () {
                return this._isTakingSnapshot;
            },
            set: function (v) {
                if (this._isTakingSnapshot !== v) {
                    this._isTakingSnapshot = v;
                    this.raisePropertyChanged("isTakingSnapshot");
                    this.raisePropertyChanged("isViewBusy");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(CollectionViewModel.prototype, "isForcingGarbageCollection", {
            get: function () {
                return this._isForcingGarbageCollection;
            },
            set: function (v) {
                if (this._isForcingGarbageCollection !== v) {
                    this._isForcingGarbageCollection = v;
                    this.raisePropertyChanged("isForcingGarbageCollection");
                    this.raisePropertyChanged("isViewBusy");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(CollectionViewModel.prototype, "isViewBusy", {
            get: function () {
                return this._isForcingGarbageCollection || this._isTakingSnapshot;
            },
            enumerable: true,
            configurable: true
        });
        return CollectionViewModel;
    })(MemoryProfiler.Common.Controls.ObservableViewModel);
    MemoryProfiler.CollectionViewModel = CollectionViewModel;

    var CollectionView = (function (_super) {
        __extends(CollectionView, _super);
        function CollectionView(controller, model) {
            _super.call(this, "CollectionViewTemplate");
            this._screenshotWidth = 280;
            this._screenshotHeight = 160;
            this._screenshotKeepAspectRatio = true;

            this._controller = controller;
            this._model = model;

            this._model.registerPropertyChanged(this);
            this._model.snapshotSummaryCollection.registerCollectionChanged(this);

            this._snapshotTileViewModelCollection = [];

            this._tilesContainer = this.findElement("tilesContainer");
            this._warningSection = this.findElement("warningSection");
            this._onSnapshotClickHandler = this.onSnapshotClick.bind(this);

            this._takeSnapshotTile = this.findElement("takeSnapshotTile");

            this._snapshotError = this.findElement("snapshotError");
            this._snapshotErrorMsg = this.findElement("snapshotErrorMsg");
            this._snapshotProgress = this.findElement("takeSnapshotProgress");
            this._snapshotButton = this.findElement("takeSnapshotButton");
            this._snapshotLabel = this.findElement("takeSnapshotLabel");
            this._snapshotIcon = this.findElement("takeSnapshotIcon");

            this._snapshotLabel.innerText = Plugin.Resources.getString("TakeSnapshot");
            this._snapshotProgress.innerText = Plugin.Resources.getString("Loading");

            this.toggleProgress(this._model.isViewBusy);
            this.updateTakeSnapshotButton();
            this._snapshotButton.addEventListener("click", this._onSnapshotClickHandler);

            this._controller.setScreenshotSize(this._screenshotWidth, this._screenshotHeight, this._screenshotKeepAspectRatio);
        }
        Object.defineProperty(CollectionView.prototype, "snapshotTileViewModelCollection", {
            get: function () {
                return this._snapshotTileViewModelCollection;
            },
            enumerable: true,
            configurable: true
        });

        CollectionView.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case "warningMessage":
                    this.showWarningMessage(this._model.warningMessage);
                    break;

                case "latestSnapshotError":
                    this.showSnapshotError(this._model.latestSnapshotError);
                    break;

                case "isTakingSnapshot":
                    this.toggleProgress(this._model.isViewBusy);
                    this.updateTakeSnapshotButton();
                    break;

                case "isForcingGarbageCollection":
                    this.updateTakeSnapshotButton();
                    break;
            }
        };

        CollectionView.prototype.onCollectionChanged = function (eventArgs) {
            switch (eventArgs.action) {
                case 0 /* Add */:
                    this.createTile(eventArgs.newItems[0]);
                    break;
                case 1 /* Reset */:
                    this.removeSnapshotTiles();
                    break;
            }
        };

        CollectionView.prototype.createTile = function (snapshotSummary) {
            var model = new MemoryProfiler.SnapshotTileViewModel(snapshotSummary);
            var newTile = new MemoryProfiler.SnapshotTileView(model);
            this._snapshotTileViewModelCollection.push(model);

            this._tilesContainer.insertBefore(newTile.rootElement, this._takeSnapshotTile);

            newTile.rootElement.scrollIntoView(true);
            newTile.setFocus();
        };

        CollectionView.prototype.removeSnapshotTiles = function () {
            while (this._tilesContainer.hasChildNodes()) {
                this._tilesContainer.removeChild(this._tilesContainer.firstChild);
            }

            this._tilesContainer.appendChild(this._takeSnapshotTile);

            this._snapshotTileViewModelCollection = [];
        };

        CollectionView.prototype.toggleProgress = function (show) {
            if (this._snapshotProgress && this._snapshotError) {
                if (show) {
                    this._snapshotLabel.style.display = "none";
                    this._snapshotIcon.style.display = "none";
                    this._snapshotProgress.style.display = "block";
                    this._snapshotError.style.display = "none";
                    this._snapshotButton.setAttribute("aria-label", Plugin.Resources.getString("Loading"));
                } else {
                    this._snapshotLabel.style.display = "";
                    this._snapshotIcon.style.display = "";
                    this._snapshotProgress.style.display = "none";
                    this._snapshotButton.setAttribute("aria-label", Plugin.Resources.getString("TakeSnapshot"));
                }
            }
        };

        CollectionView.prototype.showSnapshotError = function (error) {
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

        CollectionView.prototype.showWarningMessage = function (warning) {
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

        CollectionView.prototype.onSnapshotClick = function (e) {
            this._controller.takeSnapshot();
        };

        CollectionView.prototype.updateTakeSnapshotButton = function () {
            if (this._snapshotButton) {
                if (!this._model.isViewBusy) {
                    this._snapshotButton.classList.remove("disabled");
                    this._snapshotButton.disabled = false;
                } else {
                    if (this._model.isForcingGarbageCollection)
                        this._snapshotButton.classList.add("disabled");
                    this._snapshotButton.disabled = true;
                }
            }
        };
        return CollectionView;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.CollectionView = CollectionView;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=CollectionView.js.map

// CollectionViewHost.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var CollectionViewHost = (function (_super) {
        __extends(CollectionViewHost, _super);
        function CollectionViewHost() {
            _super.call(this);
        }
        CollectionViewHost.prototype.sessionStateChanged = function (eventArgs) {
            var currentState = eventArgs.currentState;
            switch (currentState) {
                case 400 /* CollectionFinishing */:
                    CollectionViewHost.VsCommandChain.onCollectionFinishing();
                    break;
                case 500 /* CollectionFinished */:
                    Microsoft.VisualStudio.DiagnosticsHub.getCurrentSession().removeStateChangedEventListener(this.sessionStateChanged);

                    var eventCompleteDeferral = eventArgs.getDeferral();

                    var onSaveCompleted = function (success) {
                        eventCompleteDeferral.complete();
                    };

                    if (this.collectionViewController.updatedTargetRuntime !== undefined) {
                        this.session.updateTargetRuntime(this.collectionViewController.updatedTargetRuntime);
                    }

                    this.session.save().done(onSaveCompleted);
                    break;
            }
        };

        CollectionViewHost.prototype.onPropertyChanged = function (propertyName) {
            CollectionViewHost.VsCommandChain.onPropertyChanged(propertyName);
        };

        CollectionViewHost.prototype.initializeView = function (sessionInfo) {
            this.collectionViewController = new MemoryProfiler.CollectionViewController();
            document.getElementById('mainContainer').appendChild(this.collectionViewController.view.rootElement);

            this.collectionViewController.model.registerPropertyChanged(this);
            Microsoft.VisualStudio.DiagnosticsHub.getCurrentSession().addStateChangedEventListener(this.sessionStateChanged.bind(this));
            Plugin.addEventListener("close", function () {
                CollectionViewHost.VsCommandChain.onClose();
            });

            this.initCommands();
        };

        CollectionViewHost.prototype.initCommands = function () {
            if (Plugin.VS && Plugin.VS.Commands) {
                var takeSnapshotCommand = new MemoryProfiler.TakeSnapshotVsCommand(this);
                var forceGcCommand = new MemoryProfiler.ForceGcVsCommand(this);
                takeSnapshotCommand.setNext(forceGcCommand);
                CollectionViewHost.VsCommandChain = takeSnapshotCommand;
            }
        };
        return CollectionViewHost;
    })(MemoryProfiler.Common.MemoryProfilerViewHostBase);
    MemoryProfiler.CollectionViewHost = CollectionViewHost;

    MemoryProfiler.CollectionViewHostInstance = new CollectionViewHost();
})(MemoryProfiler || (MemoryProfiler = {}));

MemoryProfiler.CollectionViewHostInstance.loadView();
//# sourceMappingURL=CollectionViewHost.js.map

// VsPluginCommandHelper.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var DynamicVsPluginCommandBase = (function () {
        function DynamicVsPluginCommandBase(host, commandBinding) {
            this._commandBinding = commandBinding;
            this._host = host;
        }
        DynamicVsPluginCommandBase.prototype.setNext = function (nextCommand) {
            this._nextCommand = nextCommand;
        };

        DynamicVsPluginCommandBase.prototype.onCollectionFinishing = function () {
            this.updateCommandButton(false, this._commandBinding._visible);

            if (this._nextCommand) {
                this._nextCommand.onCollectionFinishing();
            }
        };

        DynamicVsPluginCommandBase.prototype.onTargetIsManaged = function () {
            if (this._nextCommand) {
                this._nextCommand.onTargetIsManaged();
            }
        };

        DynamicVsPluginCommandBase.prototype.onPropertyChanged = function (propertyName) {
            if (propertyName === "isViewBusy") {
                this.updateCommandButton(!this._host.collectionViewController.model.isViewBusy, this._commandBinding._visible);
            }

            if (this._nextCommand) {
                this._nextCommand.onPropertyChanged(propertyName);
            }
        };

        DynamicVsPluginCommandBase.prototype.onClose = function () {
            this.updateCommandButton(false, false);

            if (this._nextCommand) {
                this._nextCommand.onClose();
            }
        };

        DynamicVsPluginCommandBase.prototype.updateCommandButton = function (shouldEnable, shouldDisplay) {
            if (Plugin.VS && Plugin.VS.Commands) {
                Plugin.VS.Commands.setStates({
                    command: this._commandBinding,
                    enabled: shouldEnable,
                    visible: shouldDisplay
                });
            }
        };
        return DynamicVsPluginCommandBase;
    })();
    MemoryProfiler.DynamicVsPluginCommandBase = DynamicVsPluginCommandBase;

    var TakeSnapshotVsCommand = (function (_super) {
        __extends(TakeSnapshotVsCommand, _super);
        function TakeSnapshotVsCommand(host) {
            this._host = host;
            var takeSnapshotCommand = Plugin.VS.Commands.bindCommand({
                name: "takesnapshotcommand",
                onexecute: this.execute.bind(this),
                enabled: !host.collectionViewController.model.isViewBusy,
                visible: true
            });

            _super.call(this, host, takeSnapshotCommand);
        }
        TakeSnapshotVsCommand.prototype.execute = function () {
            this._host.collectionViewController.takeSnapshot();
        };
        return TakeSnapshotVsCommand;
    })(DynamicVsPluginCommandBase);
    MemoryProfiler.TakeSnapshotVsCommand = TakeSnapshotVsCommand;

    var ForceGcVsCommand = (function (_super) {
        __extends(ForceGcVsCommand, _super);
        function ForceGcVsCommand(host) {
            this._host = host;
            var forceGcCommand = Plugin.VS.Commands.bindCommand({
                name: "forcegccommand",
                onexecute: this.execute.bind(this),
                enabled: false,
                visible: false
            });

            _super.call(this, host, forceGcCommand);
        }
        ForceGcVsCommand.prototype.execute = function () {
            this._host.collectionViewController.forceGarbageCollection();
        };

        ForceGcVsCommand.prototype.onTargetIsManaged = function () {
            this.updateCommandButton(true, true);

            _super.prototype.onTargetIsManaged.call(this);
        };
        return ForceGcVsCommand;
    })(DynamicVsPluginCommandBase);
    MemoryProfiler.ForceGcVsCommand = ForceGcVsCommand;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=VsPluginCommandHelper.js.map

// CollectionAgentTask.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var TakeSnapshotTask = (function () {
        function TakeSnapshotTask(controller) {
            this._snapshotAgents = [];
            this._controller = controller;
            this._snapshotAgents.push(new MemoryProfiler.Common.ClrSnapshotAgent());
            this._snapshotAgents.push(new MemoryProfiler.Common.ScreenshotSnapshotAgent());
        }
        TakeSnapshotTask.prototype.start = function () {
            var _this = this;
            return new Plugin.Promise(function (completed, error) {
                if (!_this.takeSnapshotInternal()) {
                    if (error) {
                        error(new Error("Snapshot Not Currently Enabled"));
                    }
                } else {
                    _this._snapshotCompleted = completed;
                    _this._snapshotError = error;
                }
            });
        };

        TakeSnapshotTask.prototype.isCompleted = function (message) {
            if (message) {
                var obj = JSON.parse(message);
                if (obj.eventName) {
                    if (obj.eventName === "snapshotData") {
                        if (this._controller.model.isViewBusy) {
                            var snapshotData = obj;
                            if (this._activeSnapshot && snapshotData.id == this._activeSnapshot.id) {
                                this._activeSnapshot.processAgentData(snapshotData.data.agent, snapshotData.data.data);
                            }
                        }
                    }
                } else {
                    if (this._controller.model.isViewBusy) {
                        if (obj.snapshotResults) {
                            this.onSnapshotResult(obj);
                        } else {
                            var response = obj;
                            this.onSnapshotFailed(new Error(response.errorMessage));
                        }
                        return true;
                    }
                }
            }

            return false;
        };

        TakeSnapshotTask.prototype.takeSnapshotInternal = function () {
            if (this._controller.model.isViewBusy) {
                return false;
            }

            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.TakeSnapshot, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.CollectionView);
            MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27200 /* perfMP_TakeSnapshotStart */, 27201 /* perfMP_TakeSnapshotEnd */);

            this._controller.model.isTakingSnapshot = true;
            this._activeSnapshot = new MemoryProfiler.Common.SnapshotEngine(MemoryProfiler.CollectionViewController._nextIdentifier, this._snapshotAgents, this._controller);
            var message = "{ \"commandName\": \"takeSnapshot\", \"snapshotId\": \"" + MemoryProfiler.CollectionViewController._nextIdentifier + "\", \"agentMask\": \"65535\" }";
            this._controller.sendMessage(message);
            return true;
        };

        TakeSnapshotTask.prototype.onSnapshotResult = function (snapshotResult) {
            var _this = this;
            if (!snapshotResult) {
                throw new Error("<move to resources>: snapshotAsync ended with no response");
            }

            if (!this._activeSnapshot) {
                this._controller.model.isTakingSnapshot = false;
            } else {
                this._activeSnapshot.processSnapshotResults(snapshotResult.snapshotResults, function (snapshot) {
                    MemoryProfiler.Common.MemoryProfilerViewHost.session.addSnapshot(snapshot).then(function () {
                        _this.onSnapshotCompleted(_this._activeSnapshot.snapshot);
                    });
                }, this.onSnapshotFailed);
            }
        };

        TakeSnapshotTask.prototype.onSnapshotCompleted = function (snapshot) {
            if (this._snapshotCompleted) {
                this._snapshotCompleted(snapshot);
            }
            this._snapshotCompleted = null;
            this._snapshotError = null;

            if (!snapshot) {
                throw new Error(Plugin.Resources.getErrorString("MemProf.1014"));
            }

            MemoryProfiler.CollectionViewController._nextIdentifier++;
            this._controller.model.snapshotSummaryCollection.add(snapshot);
            this._controller.model.isTakingSnapshot = false;
            this._activeSnapshot = null;

            MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27200 /* perfMP_TakeSnapshotStart */);
        };

        TakeSnapshotTask.prototype.onSnapshotFailed = function (error) {
            if (!error) {
                throw new Error(Plugin.Resources.getErrorString("MemProf.1015"));
            }

            error.message = Plugin.Resources.getString("SnapshotCreationFailed", error.message);

            this._controller.model.latestSnapshotError = error;
            this._controller.model.isTakingSnapshot = false;
            this._activeSnapshot = null;

            if (this._snapshotError) {
                this._snapshotError(error);
            }
            this._snapshotCompleted = null;
            this._snapshotError = null;

            MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27200 /* perfMP_TakeSnapshotStart */);
            MemoryProfiler.Common.MemoryProfilerViewHost.onIdle();
        };
        return TakeSnapshotTask;
    })();
    MemoryProfiler.TakeSnapshotTask = TakeSnapshotTask;

    var ForceGcCollectionAgentTask = (function () {
        function ForceGcCollectionAgentTask(controller) {
            this._controller = controller;
        }
        ForceGcCollectionAgentTask.prototype.start = function () {
            var _this = this;
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.ForceGarbageCollection, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.CollectionView);
            MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27232 /* prefMP_ForceGarbageCollectionStart */, 27233 /* prefMP_ForceGarbageCollectionEnd */);

            return new Plugin.Promise(function (completed) {
                _this._controller.model.isForcingGarbageCollection = true;
                var message = "{ \"commandName\": \"forceGarbageCollection\"}";
                _this._controller.sendMessage(message);
                _this._forceGcCompleted = completed;
            });
        };

        ForceGcCollectionAgentTask.prototype.isCompleted = function (message) {
            var result = false;

            if (message) {
                var obj = JSON.parse(message);
                if (obj.eventName && obj.eventName === "forcedGarbageCollectionComplete") {
                    this._controller.model.isForcingGarbageCollection = false;
                    MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27232 /* prefMP_ForceGarbageCollectionStart */);
                    result = true;
                }
            }

            if (this._forceGcCompleted) {
                this._forceGcCompleted();
            }
            this._forceGcCompleted = null;

            return result;
        };
        return ForceGcCollectionAgentTask;
    })();
    MemoryProfiler.ForceGcCollectionAgentTask = ForceGcCollectionAgentTask;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=CollectionAgentTask.js.map


// SIG // Begin signature block
// SIG // MIIatwYJKoZIhvcNAQcCoIIaqDCCGqQCAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFJURC+58NvRz
// SIG // BiRVbtfturdWQSitoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // L54/LlUWa8kTo/0xggShMIIEnQIBATCBkDB5MQswCQYD
// SIG // VQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4G
// SIG // A1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
// SIG // IENvcnBvcmF0aW9uMSMwIQYDVQQDExpNaWNyb3NvZnQg
// SIG // Q29kZSBTaWduaW5nIFBDQQITMwAAAQosea7XeXumrAAB
// SIG // AAABCjAJBgUrDgMCGgUAoIG6MBkGCSqGSIb3DQEJAzEM
// SIG // BgorBgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgor
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRVkWX6ZoUA
// SIG // GAQzj7mQSebC6C+X8TBaBgorBgEEAYI3AgEMMUwwSqAw
// SIG // gC4AQwBvAGwAbABlAGMAdABpAG8AbgBWAGkAZQB3AE0A
// SIG // ZQByAGcAZQBkAC4AagBzoRaAFGh0dHA6Ly9taWNyb3Nv
// SIG // ZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAI/+B4XSWiXV
// SIG // jQ76gK13ki9WjyEOR5qPitHATVoxgkVFyeMKJqcuwvD2
// SIG // Hnqa0Ce6GQ1S+X0Sch1AqDgktLGZJLJpDNsxBM9qAmDz
// SIG // R2uQFh9xWEpMqFn8tHvmU9Lnv8PR/Ec6gL4O/6DVgNiS
// SIG // e8QC7mtR4f5CC23WNYUI6xu821fUXqyxGZ5ireUfQ5Bq
// SIG // qCRbPCDbpYE1QrLRHFd5shhOsVf6tdeMbCY+0f6utWYD
// SIG // hKmU6tNAaxUQaBtFNj23UmRge/H1xkMGb/cjgDojeen/
// SIG // Eaa35FEBc4qvGHuzAZUk7l4HsPWmcISGTI2iXv56Dv3i
// SIG // i8QrQ8uzTnZtFkaso763bh+hggIoMIICJAYJKoZIhvcN
// SIG // AQkGMYICFTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEhMB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBAhMzAAAAcbMuimuCqh9OAAAAAABxMAkGBSsO
// SIG // AwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcB
// SIG // MBwGCSqGSIb3DQEJBTEPFw0xNTA2MjkwNDMzNTFaMCMG
// SIG // CSqGSIb3DQEJBDEWBBQbrSJ7SoBnbVrdWup7Y6SdbwU7
// SIG // AzANBgkqhkiG9w0BAQUFAASCAQCql09B4Nl64C8ObBpk
// SIG // PxmzPjqcPWD+XkWlV9h5S8LxyvID4jjZpTyd1hmRBHfz
// SIG // wE1bV6C7CL9G9TFQboJaBspkOVoqMiIBLkkOYQZdyi/z
// SIG // xeGaZ54mimkRA4LK9/6ZylHDFDFqRkyfFdenKyLGtsSp
// SIG // ufHTo3QAlr89dh9nRaIScB9EydlJ0Ek8Py5qgRE5Wpc+
// SIG // SQbz3AD/XVYqTsjYHw1e8DcAfIjFClvm/mLv+BMe1N3g
// SIG // OMnfw+2kYMZb1HdkGIVV2/jMR6V3nioR8wukYOaouxrE
// SIG // qK2yYKCZPs0h98WefG206dmcP/uVcgxUp7mGY2GzqZhV
// SIG // OZh1QnrvUUP8ue9F
// SIG // End signature block
