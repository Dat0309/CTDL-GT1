//
// Copyright (C) Microsoft. All rights reserved.
//
// HeapGridViewer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TreeGridCommon = Common;

var MemoryProfiler;
(function (MemoryProfiler) {
    var HeapGridViewer = (function (_super) {
        __extends(HeapGridViewer, _super);
        function HeapGridViewer(dataArray, root, options, onlayout) {
            _super.call(this, dataArray, root, options);
            this._onLayout = onlayout;
            this._multiSelectHelper = new MemoryProfiler.MultiRowsCopyHelper(this);
        }
        HeapGridViewer.copySelectedRowsToClipboard = function (menuId, menuItem, targetId) {
            if (HeapGridViewer.dataForClipboard) {
                window.clipboardData.setData('Text', HeapGridViewer.dataForClipboard);
            }
        };

        HeapGridViewer.prototype.getSourceDescription = function (rowIndex) {
            return null;
        };

        HeapGridViewer.prototype._onContextMenu = function (e) {
            var _this = this;
            if (this._contextMenu) {
                var rowInfo;
                var xPos = 0;
                var yPos = 0;

                if (e.type === "contextmenu") {
                    rowInfo = this.getRowInfoFromEvent(e, ".grid-row");
                    xPos = e.clientX;
                    yPos = e.clientY;
                } else if (e.type === "keydown" && this.isActive()) {
                    var selectedIndex = this.getSelectedDataIndex();
                    rowInfo = this.getRowInfo(selectedIndex);
                }

                if (!rowInfo)
                    return;

                this._multiSelectHelper.cacheSelectedRows().done(function () {
                    _this._contextMenu.show(xPos, yPos);
                });
            }
        };

        HeapGridViewer.prototype.onCtrlC = function () {
            this._multiSelectHelper.cacheSelectedRows().done(function () {
                HeapGridViewer.copySelectedRowsToClipboard(null, null, null);
            });
        };

        HeapGridViewer.prototype.navigateToSelectedRowSource = function () {
            var sourceDescription = this.getSourceDescription(this.getSelectedRowIndex());
            if (sourceDescription && sourceDescription.fullTypeName) {
                MemoryProfiler.Common.MemoryProfilerViewHost.session.navigateToType(sourceDescription.fullTypeName);
            } else {
                alert(Plugin.Resources.getString("ContextMenuViewSourceError"));
            }
        };

        HeapGridViewer.prototype.layout = function () {
            _super.prototype.layout.call(this);

            if (this._onLayout) {
                this._onLayout();
            }
        };

        Object.defineProperty(HeapGridViewer.prototype, "viewer", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });

        HeapGridViewer.prototype.checkUpdateActive = function (rowInfo) {
            if (this.isActive()) {
                _super.prototype.checkUpdateActive.call(this, rowInfo);
            }
        };

        HeapGridViewer.prototype.expandNode = function (treePath) {
            var _this = this;
            this._dataArray.get(treePath.path, function (row, needUpdate) {
                _this.getExpandedPaths().expand(treePath, row.SubItemsCount);
                _this.updateCounts(row.SubItemsCount);
                _this.markRowDirty(treePath.path);

                if (row.SubItemsCount === 1) {
                    var childPath = new TreeGridCommon.Controls.DynamicGrid.TreePath([]);
                    for (var j = 0; j < treePath.path.length; j++) {
                        childPath.path.push(treePath.path[j]);
                    }
                    childPath.path.push(0);

                    _this.expandNode(childPath);
                } else if (needUpdate) {
                    _this.scheduleUpdate();
                }
            });
        };
        return HeapGridViewer;
    })(TreeGridCommon.Controls.DynamicGrid.DynamicGridViewer);
    MemoryProfiler.HeapGridViewer = HeapGridViewer;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=HeapGridViewer.js.map

// ManagedHeapViewer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    (function (RefGraphDirection) {
        RefGraphDirection[RefGraphDirection["Forward"] = 0] = "Forward";
        RefGraphDirection[RefGraphDirection["Backward"] = 1] = "Backward";
    })(MemoryProfiler.RefGraphDirection || (MemoryProfiler.RefGraphDirection = {}));
    var RefGraphDirection = MemoryProfiler.RefGraphDirection;
    ;

    (function (RefGraphTarget) {
        RefGraphTarget[RefGraphTarget["Types"] = 0] = "Types";
        RefGraphTarget[RefGraphTarget["Objects"] = 1] = "Objects";
    })(MemoryProfiler.RefGraphTarget || (MemoryProfiler.RefGraphTarget = {}));
    var RefGraphTarget = MemoryProfiler.RefGraphTarget;
    ;

    var ManagedHeapViewer = (function (_super) {
        __extends(ManagedHeapViewer, _super);
        function ManagedHeapViewer(viewModel) {
            var _this = this;
            _super.call(this, "ManagedHeapTemplate");
            this._typeRefsViewerCache = [null, null];
            this._objectRefsViewerCache = [null, null];
            this.rightAlignedColumnHeaderCss = "rightAlignedColumnHeader";

            this._isFirstJmc = true;
            this._openedInDetailsTab = false;

            ManagedHeapViewer.instance = this;

            this._detailsViewModel = viewModel;
            this._detailsViewModel.registerPropertyChanged(this);

            this._adaptor = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("MemoryProfiler.ManagedHeapAnalyzer", {}, true);

            this._refGraphDirection = 1 /* Backward */;
            this._refGraphTarget = 0 /* Types */;
            this._adaptor._call("ChangeGraphDirection", this._refGraphDirection);
            this.updateRefGraphDirectionUIElements(false);

            this._justMyCode = this._detailsViewModel.justMyCodeManaged;
            this._collapseSmallObjects = this._detailsViewModel.collapseSmallObjects;

            var NUMERIC_COLUMN_WIDTH = 150;
            var TAG_COLUMN_WIDTH = 500;
            var MODULE_COLUMN_WIDTH = 200;

            this._typeColumns = [
                new TreeGridCommon.Controls.Grid.ColumnInfo("TagName", Plugin.Resources.getString("Type"), Plugin.Resources.getString("TypeTooltip"), TAG_COLUMN_WIDTH, true, null, ManagedHeapViewer.gridCellCssClass),
                new TreeGridCommon.Controls.Grid.ColumnInfo("Count", Plugin.Resources.getString("Count"), Plugin.Resources.getString("CountTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"),
                new TreeGridCommon.Controls.Grid.ColumnInfo("TotalSize", Plugin.Resources.getString("Size"), Plugin.Resources.getString("SizeTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"),
                new TreeGridCommon.Controls.Grid.ColumnInfo("RetainedSize", Plugin.Resources.getString("RetainedSize"), Plugin.Resources.getString("RetainedSizeTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc")
            ];
            this._typeColumns[1].headerCss = this.rightAlignedColumnHeaderCss;
            this._typeColumns[2].headerCss = this.rightAlignedColumnHeaderCss;
            this._typeColumns[3].headerCss = this.rightAlignedColumnHeaderCss;

            this._typeBackwardRefGraphColumns = [
                new TreeGridCommon.Controls.Grid.ColumnInfo("Tag", Plugin.Resources.getString("Type"), Plugin.Resources.getString("TypeTooltip"), TAG_COLUMN_WIDTH, false, null, ManagedHeapViewer.gridCellCssClass),
                new TreeGridCommon.Controls.Grid.ColumnInfo("RetainedCount", Plugin.Resources.getString("TypeRefGraphRetainedCountColumn"), Plugin.Resources.getString("TypeRefGraphRetainedCountColumnTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc")
            ];
            this._typeBackwardRefGraphColumns[1].headerCss = this.rightAlignedColumnHeaderCss;

            this._objectBackwardGraphColumns = [
                new TreeGridCommon.Controls.Grid.ColumnInfo("Tag", Plugin.Resources.getString("Instance"), Plugin.Resources.getString("InstanceTooltip"), 3 * TAG_COLUMN_WIDTH, false)
            ];

            var typeTagColumnInfo = new TreeGridCommon.Controls.Grid.ColumnInfo("Tag", Plugin.Resources.getString("Type"), Plugin.Resources.getString("TypeTooltip"), TAG_COLUMN_WIDTH, false, null, ManagedHeapViewer.gridCellCssClass);

            typeTagColumnInfo.getHeaderCellContents = function () {
                return _this.drawForwardReferenceGraphHeaderCell("Type");
            };

            this._typeForwardRefGraphColumns = [
                typeTagColumnInfo,
                new TreeGridCommon.Controls.Grid.ColumnInfo("RefCount", Plugin.Resources.getString("TypeRefGraphRetainedCountColumn"), Plugin.Resources.getString("TypeRefGraphRetainedCountColumnTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"),
                new TreeGridCommon.Controls.Grid.ColumnInfo("TotalSize", Plugin.Resources.getString("Size"), Plugin.Resources.getString("SizeTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"),
                new TreeGridCommon.Controls.Grid.ColumnInfo("RetainedSize", Plugin.Resources.getString("RetainedSize"), Plugin.Resources.getString("RetainedSizeTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc")
            ];
            this._typeForwardRefGraphColumns[1].headerCss = this.rightAlignedColumnHeaderCss;
            this._typeForwardRefGraphColumns[2].headerCss = this.rightAlignedColumnHeaderCss;
            this._typeForwardRefGraphColumns[3].headerCss = this.rightAlignedColumnHeaderCss;

            var objectTagColumnInfo = new TreeGridCommon.Controls.Grid.ColumnInfo("Tag", Plugin.Resources.getString("Instance"), Plugin.Resources.getString("InstanceTooltip"), TAG_COLUMN_WIDTH, false, null, ManagedHeapViewer.gridCellCssClass);

            objectTagColumnInfo.getHeaderCellContents = function () {
                return _this.drawForwardReferenceGraphHeaderCell("Instance");
            };

            this._objectForwardGraphColumns = [
                objectTagColumnInfo,
                new TreeGridCommon.Controls.Grid.ColumnInfo("TotalSize", Plugin.Resources.getString("Size"), Plugin.Resources.getString("SizeTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"),
                new TreeGridCommon.Controls.Grid.ColumnInfo("RetainedSize", Plugin.Resources.getString("RetainedSize"), Plugin.Resources.getString("RetainedSizeTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc")
            ];
            this._objectForwardGraphColumns[1].headerCss = this.rightAlignedColumnHeaderCss;
            this._objectForwardGraphColumns[2].headerCss = this.rightAlignedColumnHeaderCss;

            this._typeColumns[0].alwaysEnableTooltip = true;
            this._typeBackwardRefGraphColumns[0].alwaysEnableTooltip = true;
            this._objectBackwardGraphColumns[0].alwaysEnableTooltip = true;
            this._typeForwardRefGraphColumns[0].alwaysEnableTooltip = true;
            this._objectForwardGraphColumns[0].alwaysEnableTooltip = true;

            this._adaptor._call("IsDiffView").done(function (result) {
                if (result) {
                    var COUNT_DIFF_COLUMN_INDEX = 2;
                    var TOTALSIZE_DIFF_COLUMN_INDEX = 4;
                    var RETAINEDSIZE_DIFF_COLUMN_INDEX = 6;

                    _this._typeColumns.splice(COUNT_DIFF_COLUMN_INDEX, 0, new TreeGridCommon.Controls.Grid.ColumnInfo("CountDiff", Plugin.Resources.getString("CountDiff"), Plugin.Resources.getString("CountDiffTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));

                    _this._typeColumns.splice(TOTALSIZE_DIFF_COLUMN_INDEX, 0, new TreeGridCommon.Controls.Grid.ColumnInfo("TotalSizeDiff", Plugin.Resources.getString("TotalSizeDiff"), Plugin.Resources.getString("TotalSizeDiffTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));

                    _this._typeColumns.splice(RETAINEDSIZE_DIFF_COLUMN_INDEX, 0, new TreeGridCommon.Controls.Grid.ColumnInfo("RetainedSizeDiff", Plugin.Resources.getString("RetainedSizeDiff"), Plugin.Resources.getString("RetainedSizeDiffTooltip"), NUMERIC_COLUMN_WIDTH + 11, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));

                    _this._typeColumns[COUNT_DIFF_COLUMN_INDEX].headerCss = _this.rightAlignedColumnHeaderCss;
                    _this._typeColumns[TOTALSIZE_DIFF_COLUMN_INDEX].headerCss = _this.rightAlignedColumnHeaderCss;
                    _this._typeColumns[RETAINEDSIZE_DIFF_COLUMN_INDEX].headerCss = _this.rightAlignedColumnHeaderCss;

                    _this._typeBackwardRefGraphColumns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("RetainedCountDiff", Plugin.Resources.getString("TypeRefGraphRetainedCountDiffColumn"), Plugin.Resources.getString("TypeRefGraphRetainedCountDiffColumnTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));

                    _this._typeBackwardRefGraphColumns[_this._typeBackwardRefGraphColumns.length - 1].headerCss = _this.rightAlignedColumnHeaderCss;

                    _this._typeForwardRefGraphColumns.splice(COUNT_DIFF_COLUMN_INDEX, 0, new TreeGridCommon.Controls.Grid.ColumnInfo("RefCountDiff", Plugin.Resources.getString("TypeRefGraphRetainedCountDiffColumn"), Plugin.Resources.getString("TypeRefGraphRetainedCountDiffColumnTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));

                    _this._typeForwardRefGraphColumns.splice(TOTALSIZE_DIFF_COLUMN_INDEX, 0, new TreeGridCommon.Controls.Grid.ColumnInfo("TotalSizeDiff", Plugin.Resources.getString("TotalSizeDiff"), Plugin.Resources.getString("TotalSizeDiffTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));

                    _this._typeForwardRefGraphColumns.splice(RETAINEDSIZE_DIFF_COLUMN_INDEX, 0, new TreeGridCommon.Controls.Grid.ColumnInfo("RetainedSizeDiff", Plugin.Resources.getString("RetainedSizeDiff"), Plugin.Resources.getString("RetainedSizeDiffTooltip"), NUMERIC_COLUMN_WIDTH, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));

                    _this._typeForwardRefGraphColumns[COUNT_DIFF_COLUMN_INDEX].headerCss = _this.rightAlignedColumnHeaderCss;
                    _this._typeForwardRefGraphColumns[TOTALSIZE_DIFF_COLUMN_INDEX].headerCss = _this.rightAlignedColumnHeaderCss;
                    _this._typeForwardRefGraphColumns[RETAINEDSIZE_DIFF_COLUMN_INDEX].headerCss = _this.rightAlignedColumnHeaderCss;
                }

                var allColumns = [_this._typeBackwardRefGraphColumns, _this._typeForwardRefGraphColumns, _this._objectBackwardGraphColumns, _this._objectForwardGraphColumns, _this._typeColumns];
                allColumns.forEach(function (columns) {
                    var canSortBy = columns === _this._typeColumns;
                    columns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("Module", Plugin.Resources.getString("Module"), Plugin.Resources.getString("ModuleTooltip"), MODULE_COLUMN_WIDTH, canSortBy, null, ManagedHeapViewer.gridCellCssClass));
                });
            });

            this.initializeContextMenus();
            this.initializeUIElementsAsync();
        }
        ManagedHeapViewer.prototype.onGridReady = function () {
            if (this._typesViewer && !this._typesViewer.waitingForUpdate) {
                if (this.refsViewer && this.refsViewer.waitingForUpdate === false) {
                    this._detailsViewModel.detailsViewReady = true;
                }
            }
        };

        Object.defineProperty(ManagedHeapViewer.prototype, "typeRefsViewer", {
            get: function () {
                return this._typeRefsViewer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ManagedHeapViewer.prototype, "refsViewer", {
            get: function () {
                if (this._refGraphTarget == 0 /* Types */) {
                    return this._typeRefsViewer;
                } else if (this._refGraphTarget == 1 /* Objects */) {
                    return this._objectRefsViewer;
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ManagedHeapViewer.prototype, "detailsViewModel", {
            get: function () {
                return this._detailsViewModel;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ManagedHeapViewer.prototype, "masterGridViewer", {
            get: function () {
                return this._typesViewer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ManagedHeapViewer.prototype, "refGraphTarget", {
            get: function () {
                return this._refGraphTarget;
            },
            set: function (v) {
                this._refGraphTarget = v;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ManagedHeapViewer.prototype, "refGraphDirection", {
            get: function () {
                return this._refGraphDirection;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ManagedHeapViewer.prototype, "refGraphViewersCache", {
            get: function () {
                if (this._refGraphTarget == 0 /* Types */) {
                    return this._typeRefsViewerCache;
                } else if (this._refGraphTarget == 1 /* Objects */) {
                    return this._objectRefsViewerCache;
                }
            },
            enumerable: true,
            configurable: true
        });

        ManagedHeapViewer.navigateToSource = function (menuId, menuItem, targetId) {
            var selectedGrid = MemoryProfiler.ManagedHeapGridViewerBase.getSelectedGrid();
            if (!selectedGrid) {
                alert(Plugin.Resources.getString("ContextMenuViewSourceError"));
                return;
            }

            selectedGrid.navigateToSelectedRowSource();
        };

        ManagedHeapViewer.gridCellCssClass = function (dataIndex, columnIndex, columnOrder, dataSource) {
            if (ManagedHeapViewer.viewSourceAvailable) {
                if (ManagedHeapViewer.viewSourceSelected) {
                    return "grid-cell-source-selected";
                } else {
                    return "grid-cell-source";
                }
            } else {
                return "";
            }
        };

        ManagedHeapViewer.prototype.toggleJustMyCodeAsync = function () {
            var _this = this;
            if (this._isFirstJmc) {
                this._isFirstJmc = false;
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27228 /* perfMP_SetJMCValueColdStart */, 27229 /* perfMP_SetJMCValueColdEnd */);
            } else {
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27226 /* perfMP_SetJMCValueWarmStart */, 27227 /* perfMP_SetJMCValueWarmEnd */);
            }

            this._justMyCode = !this._justMyCode;
            this.updateNotificationBar();
            this._adaptor._call("ApplyViewFilter", this._justMyCode, this._collapseSmallObjects).then(function () {
                return MemoryProfiler.Common.MemoryProfilerViewHost.session.updateDetailsViewSetting("justMyCodeManaged", _this._justMyCode);
            }).done(function () {
                _this._typesViewer.resetView();
                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarkers(27228 /* perfMP_SetJMCValueColdStart */, 27226 /* perfMP_SetJMCValueWarmStart */);
            });
        };

        ManagedHeapViewer.prototype.toggleCollapseSmallObjectsAsync = function () {
            var _this = this;
            this._collapseSmallObjects = !this._collapseSmallObjects;
            this.updateNotificationBar();
            this._adaptor._call("ApplyViewFilter", this._justMyCode, this._collapseSmallObjects).then(function () {
                return MemoryProfiler.Common.MemoryProfilerViewHost.session.updateDetailsViewSetting("collapseSmallObjects", _this._collapseSmallObjects);
            }).done(function () {
                _this._typesViewer.resetView();
            });
        };

        ManagedHeapViewer.prototype.updateNotificationBar = function () {
            if (this._justMyCode || this._collapseSmallObjects) {
                this._notificationBar.style.display = "block";

                var activeSettingName = "";

                if (this._justMyCode) {
                    activeSettingName = Plugin.Resources.getString("NotificationBarJMCEnabled");
                }

                if (this._collapseSmallObjects) {
                    if (this._justMyCode) {
                        activeSettingName = activeSettingName.concat(", ");
                    }

                    activeSettingName = activeSettingName.concat(Plugin.Resources.getString("NotificationBarCollapseSmallObjectsEnabled"));
                }

                this._notificationBarMessage.innerText = Plugin.Resources.getString("NotificationBarMessage").replace("{0}", activeSettingName);
            } else {
                this._notificationBar.style.display = "none";
            }
        };

        ManagedHeapViewer.prototype.initializeContextMenus = function () {
            this._gridContextMenuOptions = new Array();

            for (var i = 0; i < 3; i++) {
                var menuItems = new Array();

                menuItems[0] = {
                    id: "managedHeapCopyMenuItem" + i,
                    callback: MemoryProfiler.HeapGridViewer.copySelectedRowsToClipboard,
                    label: Plugin.Resources.getString("ContextMenuCopy"),
                    type: 1 /* command */,
                    iconEnabled: null,
                    iconDisabled: null,
                    accessKey: "Ctrl+C",
                    hidden: function () {
                        return false;
                    },
                    disabled: function () {
                        return false;
                    },
                    checked: function () {
                        return false;
                    },
                    cssClass: null,
                    submenu: null
                };

                menuItems[1] = {
                    id: "managedHeapGoToSourceMenuItem" + i,
                    callback: ManagedHeapViewer.navigateToSource,
                    label: Plugin.Resources.getString("ContextMenuViewSource"),
                    type: 1 /* command */,
                    iconEnabled: null,
                    iconDisabled: null,
                    accessKey: "F12",
                    hidden: function () {
                        return false;
                    },
                    disabled: ManagedHeapViewer.viewSourceMenuItemDisabled,
                    checked: function () {
                        return false;
                    },
                    cssClass: null,
                    submenu: null
                };

                this._gridContextMenuOptions[i] = menuItems;
            }
        };

        ManagedHeapViewer.viewSourceMenuItemDisabled = function () {
            var selectedGrid = MemoryProfiler.ManagedHeapGridViewerBase.getSelectedGrid();
            if (!selectedGrid || !selectedGrid.selectedRowHasSource()) {
                return true;
            }
        };

        ManagedHeapViewer.prototype.initializeUIElementsAsync = function () {
            var _this = this;
            this._notificationBar = this.findElement("notificationBar");
            this._notificationBarMessage = this.findElement("notificationBarMessage");
            this._viewOverlay = this.findElement("heapViewOverlay");
            this._progressBar = this.findElement("progressBar");

            this._adaptor._call("GetSnapshotId").done(function (result) {
                _this._snapshotId = result;
            });
        };

        ManagedHeapViewer.prototype.updateSortProperty = function () {
            if (this.masterGridViewer) {
                this.masterGridViewer.updateSort();
            }
        };

        ManagedHeapViewer.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case "managedFilterString":
                    this._typesViewer.setFilterAsync(this._detailsViewModel.managedFilterString);
                    break;
                case "justMyCodeManaged":
                    this.toggleJustMyCodeAsync();
                    break;
                case "collapseSmallObjects":
                    this.toggleCollapseSmallObjectsAsync();
                    break;
                case "targetView":
                    if (this.detailsViewModel.targetView === 0 /* managedHeap */) {
                        if (!this._openedInDetailsTab) {
                            this._openedInDetailsTab = true;
                            this.refreshUIAsync();
                        } else {
                            this.masterGridViewer.layout();
                        }
                    }
                    break;
                case "sortPropertyManaged":
                    this.updateSortProperty();
                    break;
            }
        };

        ManagedHeapViewer.prototype.drawForwardReferenceGraphHeaderCell = function (columnTitleResourceName) {
            var cellElement = document.createElement("div");
            cellElement.classList.add("title");

            if (this._justMyCode || this._collapseSmallObjects) {
                var infoIconHtml = "<span title='{0}' class='icon-information'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
                infoIconHtml = infoIconHtml.replace("{0}", Plugin.Resources.getString("ReferencesViewNoViewMessage"));
                cellElement.innerHTML = Plugin.Resources.getString(columnTitleResourceName) + infoIconHtml;
            } else {
                cellElement.innerText = Plugin.Resources.getString(columnTitleResourceName);
            }

            return cellElement;
        };

        ManagedHeapViewer.prototype.refreshUIAsync = function () {
            var _this = this;
            if (this._typesViewer) {
                this._typesViewer = null;
            }
            if (this._splitter) {
                this._splitter = null;
            }

            var div = this.findElement("ManagedHeapTypesViewerContainer");
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }

            if (this._typesDataSource) {
                this._typesDataSource.flushCache();
                this._typesDataSource = null;
            }

            this._typesDataSource = new TreeGridCommon.Controls.DynamicGrid.ProxyArray(this._adaptor, "TypeSummaries", ManagedHeapViewer.ProxyArrayCacheSize);

            this._adaptor._call("ApplyViewFilter", this._justMyCode, this._collapseSmallObjects).done(function (result) {
                _this.setRefGraphDirectionAsync(_this._refGraphDirection, _this._refGraphTarget).done(function () {
                    _this._typesDataSource.init(function () {
                        _this._typesViewer = new MemoryProfiler.ManagedHeapGridViewer(_this.findElement("ManagedHeapTypesViewerContainer"), _this, _this._typesDataSource, _this._gridContextMenuOptions[2], _this._typeColumns, function (showTypeRefGraph) {
                            if (showTypeRefGraph) {
                                _this.refsViewer.refresh();
                                _this.refsViewer.expandRoot();
                                _this.updateRefGraphDirectionUIElements(true);
                            }
                            _this.refsViewer.showGraph(showTypeRefGraph);
                        });

                        _this.updateNotificationBar();

                        _this._splitter = new TreeGridCommon.Controls.GridSplitterControl(_this.findElement("snapshotViewGridSplitter"), null, function () {
                            _this._typesViewer.scheduleUpdate();
                            _this.refsViewer.scheduleUpdate();
                        });
                    });
                });
            });
        };

        ManagedHeapViewer.prototype.setRefGraphDirectionAsync = function (direction, target) {
            var _this = this;
            return new Plugin.Promise(function (completed) {
                var directionChange = false;
                var targetChange = false;
                var refViewerGetter;

                _this._refGraphDirection = direction;
                _this._refGraphTarget = target;
                _this._adaptor._call("ChangeGraphDirection", _this._refGraphDirection).done(function () {
                    if (_this._refGraphTarget === 0 /* Types */) {
                        refViewerGetter = _this.getTypeRefViewer.bind(_this);
                    } else {
                        refViewerGetter = _this.getObjectRefViewer.bind(_this);
                    }

                    var div = _this.findElement("ManagedHeapViewerRefGraphNoData");
                    div.style.display = "none";
                    refViewerGetter().done(function (cachedGraphDirectionSwitch) {
                        if (cachedGraphDirectionSwitch) {
                            _this.updateRefGraphDirectionUIElements(true);
                            _this.refsViewer.refreshSortingOrder(function () {
                                if (_this._typesViewer && _this._currentSelectedIndexBeforeSwitchingGraphDirection !== _this._typesViewer.getSelectedRowIndex()) {
                                    _this._typesViewer.activateRow(_this._typesViewer.getSelectedRowIndex());
                                } else {
                                    _this.refsViewer.scheduleUpdate();
                                }

                                if (_this._typesViewer) {
                                    _this._currentSelectedIndexBeforeSwitchingGraphDirection = _this._typesViewer.getSelectedRowIndex();
                                }
                            });
                        } else {
                            _this._currentSelectedIndexBeforeSwitchingGraphDirection = _this._typesViewer ? _this._typesViewer.getSelectedRowIndex() : -1;
                        }
                    });

                    completed();
                });
            });
        };

        ManagedHeapViewer.prototype.getTypeRefViewer = function () {
            var _this = this;
            return new Plugin.Promise(function (completed) {
                var refGraphDom = _this.findElement(_this._refGraphDirection === 0 /* Forward */ ? "ManagedHeapViewerForwardTypeRefGraphContainer" : "ManagedHeapViewerBackwardTypeRefGraphContainer");
                var oppositeRefGraphDom = _this.findElement(_this._refGraphDirection === 1 /* Backward */ ? "ManagedHeapViewerForwardTypeRefGraphContainer" : "ManagedHeapViewerBackwardTypeRefGraphContainer");

                refGraphDom.style.display = "block";

                oppositeRefGraphDom.style.display = "none";
                if (_this._objectRefsViewer) {
                    _this._objectRefsViewer.showGraph(false);
                }
                if (_this._typeRefsViewerCache[_this._refGraphDirection]) {
                    _this._typeRefsViewer = _this._typeRefsViewerCache[_this._refGraphDirection];
                    completed(true);
                } else {
                    var typeRefGraphDataArray = new TreeGridCommon.Controls.DynamicGrid.ProxyArray(_this._adaptor, _this.getTypeRefGraphDataSource(), ManagedHeapViewer.ProxyArrayCacheSize);
                    typeRefGraphDataArray.init(function () {
                        _this._typeRefsViewerCache[_this._refGraphDirection] = _this._typeRefsViewer = new MemoryProfiler.ManagedHeapTypeRefGraphViewer(refGraphDom, typeRefGraphDataArray, _this._gridContextMenuOptions[1], _this.getTypeRefGraphColumns());

                        _this._typeRefsViewer.showGraph(true);

                        if (_this._typesViewer) {
                            var selectedIndex = _this._typesViewer.getSelectedRowIndex();
                            if (selectedIndex >= 0) {
                                _this._typesViewer.activateRow(selectedIndex);
                            }
                        }

                        completed(false);
                    });
                }
            });
        };

        ManagedHeapViewer.prototype.getObjectRefViewer = function () {
            var _this = this;
            return new Plugin.Promise(function (completed) {
                var refGraphDom = _this.findElement(_this._refGraphDirection === 0 /* Forward */ ? "ManagedHeapViewerForwardObjectRefGraphContainer" : "ManagedHeapViewerBackwardObjectRefGraphContainer");
                var oppositeRefGraphDom = _this.findElement(_this._refGraphDirection === 1 /* Backward */ ? "ManagedHeapViewerForwardObjectRefGraphContainer" : "ManagedHeapViewerBackwardObjectRefGraphContainer");

                refGraphDom.style.display = "block";

                oppositeRefGraphDom.style.display = "none";

                _this._typeRefsViewer.showGraph(false);
                if (_this._objectRefsViewerCache[_this.refGraphDirection]) {
                    _this._objectRefsViewer = _this._objectRefsViewerCache[_this.refGraphDirection];
                    completed(true);
                } else {
                    var objectRefGraphDataArray = new TreeGridCommon.Controls.DynamicGrid.ProxyArray(_this._adaptor, _this.getObjectRefGraphDataSource(), ManagedHeapViewer.ProxyArrayCacheSize);
                    objectRefGraphDataArray.init(function () {
                        _this._objectRefsViewerCache[_this._refGraphDirection] = _this._objectRefsViewer = new MemoryProfiler.ManagedHeapObjectRefGraphViewer(refGraphDom, objectRefGraphDataArray, _this._gridContextMenuOptions[0], _this.getObjectRefGraphColumns(), _this._refGraphDirection);

                        if (_this._typesViewer) {
                            var selectedIndex = _this._typesViewer.getSelectedRowIndex();

                            if (_this._typesViewer.findPathByRow(selectedIndex).length() === 2) {
                                _this._typesViewer.activateRow(selectedIndex);
                            }
                        }
                        completed(false);
                    });
                }
            });
        };

        ManagedHeapViewer.prototype.resetCurrentSelectedIndex = function () {
            this._currentSelectedIndexBeforeSwitchingGraphDirection = -1;
            this.updateRefGraphDirectionUIElements(false);
        };

        ManagedHeapViewer.prototype.updateRefGraphDirectionUIElements = function (showTabs) {
            var _this = this;
            var refGraphHeader = this.findElement("RefGraphHeader");
            var referencingGraph = this.findElement("ReferencingGraph");
            var referencedGraph = this.findElement("ReferencedGraph");

            if (!showTabs) {
                refGraphHeader.style.display = referencedGraph.style.display = "none";
            } else {
                refGraphHeader.style.display = referencedGraph.style.display = "block";

                referencingGraph.text = Plugin.Resources.getString("ReferencingGraph");
                if (this._refGraphTarget === 0 /* Types */) {
                    referencedGraph.text = Plugin.Resources.getString("ReferencedGraphLabelTypesView");
                    referencedGraph.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("ReferencedGraphLabelTypesViewTooltip"));
                    referencingGraph.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("PathsToRootLabelTypesViewTooltip"));
                } else {
                    referencedGraph.text = Plugin.Resources.getString("ReferencedGraphLabelObjectView");
                    referencedGraph.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("ReferencedGraphLabelObjectViewTooltip"));
                    referencingGraph.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("PathsToRootLabelObjectViewTooltip"));
                }

                var isBackward = this._refGraphDirection === 1 /* Backward */;
                if (isBackward) {
                    referencingGraph.className = "disabled";
                    referencedGraph.className = "enabled";

                    referencingGraph.onclick = undefined;
                    referencedGraph.onclick = function (e) {
                        _this.setRefGraphDirectionAsync(0 /* Forward */, _this._refGraphTarget);
                        if (_this._refGraphTarget === 0 /* Types */) {
                            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.ViewReferencedTypes, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.ManagedHeapView);
                        } else {
                            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.ViewReferencedObjects, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.ManagedHeapView);
                        }
                    };
                } else {
                    referencingGraph.className = "enabled";
                    referencedGraph.className = "disabled";
                    referencedGraph.onclick = undefined;
                    referencingGraph.onclick = function (e) {
                        _this.setRefGraphDirectionAsync(1 /* Backward */, _this._refGraphTarget);
                        MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.ViewPathsToRoot, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.ManagedHeapView);
                    };
                }
                referencingGraph.setAttribute("aria-selected", isBackward ? "true" : "false");
                referencedGraph.setAttribute("aria-selected", isBackward ? "false" : "true");
            }
        };

        ManagedHeapViewer.prototype.getTypeRefGraphColumns = function () {
            return this._refGraphDirection === 0 /* Forward */ ? this._typeForwardRefGraphColumns : this._typeBackwardRefGraphColumns;
        };

        ManagedHeapViewer.prototype.getObjectRefGraphColumns = function () {
            return this._refGraphDirection === 0 /* Forward */ ? this._objectForwardGraphColumns : this._objectBackwardGraphColumns;
        };

        ManagedHeapViewer.prototype.getTypeRefGraphDataSource = function () {
            return this._refGraphDirection === 0 /* Forward */ ? "TypeForwardRefGraph" : "TypeRefGraph";
        };

        ManagedHeapViewer.prototype.getObjectRefGraphDataSource = function () {
            return this._refGraphDirection === 0 /* Forward */ ? "ForwardRefGraph" : "RefGraph";
        };

        ManagedHeapViewer.prototype.getElementById = function (elementId) {
            return this.findElement(elementId);
        };

        ManagedHeapViewer.prototype.getActiveGrid = function () {
            if (this.masterGridViewer.isActive)
                return this.masterGridViewer;
            if (this.refsViewer.isActive)
                return this.refsViewer;
            return null;
        };

        ManagedHeapViewer.prototype.enableInProgressState = function () {
            this._viewOverlay.classList.add("heapContainerDisable");
            this._progressBar.style.display = "inline";
        };

        ManagedHeapViewer.prototype.disableInProgressState = function () {
            this._viewOverlay.classList.remove("heapContainerDisable");
            this._progressBar.style.display = "none";
        };

        ManagedHeapViewer.prototype.isViewDisabled = function () {
            return this._viewOverlay.classList.contains("heapContainerDisable");
        };
        ManagedHeapViewer.ProxyArrayCacheSize = 1000;
        ManagedHeapViewer.TooltipChunkingLength = 128;
        return ManagedHeapViewer;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.ManagedHeapViewer = ManagedHeapViewer;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ManagedHeapViewer.js.map

// ManagedHeapGridViewer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    var ManagedHeapGridViewerBase = (function (_super) {
        __extends(ManagedHeapGridViewerBase, _super);
        function ManagedHeapGridViewerBase(dataArray, root, options, columns) {
            var _this = this;
            columns[0].getCellContents = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
                return _this._drawViewSourceCell(rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder);
            };

            _super.call(this, dataArray, root, options);
        }
        Object.defineProperty(ManagedHeapGridViewerBase.prototype, "currentSelectedIndex", {
            get: function () {
                return this._currentSelectedIndex;
            },
            set: function (value) {
                this._currentSelectedIndex = value;
            },
            enumerable: true,
            configurable: true
        });


        ManagedHeapGridViewerBase.getSelectedGrid = function () {
            return ManagedHeapGridViewerBase.selectedGrid;
        };

        ManagedHeapGridViewerBase.setSelectedGrid = function (selectedGrid) {
            ManagedHeapGridViewerBase.selectedGrid = selectedGrid;
        };

        ManagedHeapGridViewerBase.prototype._drawViewSourceCell = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
            MemoryProfiler.ManagedHeapViewer.viewSourceAvailable = false;
            var sourceDescription = this.getSourceDescription(rowInfo.rowIndex);
            if (sourceDescription && sourceDescription.fullTypeName && sourceDescription.file && sourceDescription.line && sourceDescription.col) {
                MemoryProfiler.ManagedHeapViewer.viewSourceAvailable = true;
                MemoryProfiler.ManagedHeapViewer.viewSourceSelected = (this.getSelectedRows() && this.getSelectedRows().hasOwnProperty(rowInfo.rowIndex));
            }

            var cellElement = this._drawHeapGridCell(rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder);

            if (MemoryProfiler.ManagedHeapViewer.viewSourceAvailable) {
                var tooltip = ManagedHeapGridViewerBase.buildSourceDescriptionTooltip(sourceDescription);
                ManagedHeapGridViewerBase.setTooltip(cellElement, tooltip);
                this.addAnchorToCellText(cellElement);
            } else if (sourceDescription && sourceDescription.fullTypeName) {
                var tooltip = ManagedHeapGridViewerBase.chunkTooltipString(sourceDescription.fullTypeName);
                ManagedHeapGridViewerBase.setTooltip(cellElement, tooltip);
            }

            return cellElement;
        };

        ManagedHeapGridViewerBase.prototype._clearSelection = function () {
            var selectedRows = this.getSelectedRows();
            _super.prototype._clearSelection.call(this);
            for (var index in selectedRows) {
                this.updateRow(index, -1);
            }
        };

        ManagedHeapGridViewerBase.prototype._drawHeapGridCell = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
            return this._drawCell(rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder);
        };

        ManagedHeapGridViewerBase.prototype.addAnchorToCellText = function (cellElement) {
            var _this = this;
            var leafNode = cellElement.firstChild;
            while (leafNode && leafNode instanceof HTMLElement) {
                leafNode = leafNode.nextSibling;
            }
            if (leafNode) {
                var anchorTag = document.createElement("a");
                anchorTag.innerHTML = leafNode.textContent;
                cellElement.removeChild(leafNode);
                cellElement.appendChild(anchorTag);
                anchorTag.addEventListener("mousedown", (function (e) {
                    if (e.button === 0 && !e.altKey && !e.shiftKey && !e.ctrlKey) {
                        _this._onRowMouseDown(e);
                        _this.onF12();
                    }
                }).bind(anchorTag));
            }
        };

        ManagedHeapGridViewerBase.prototype.replaceClassOnce = function (oldClass, newClass) {
            var selectedElements = this.getElement().getElementsByClassName(oldClass);
            if (selectedElements && selectedElements.length > 0 && selectedElements[0] && selectedElements[0] instanceof HTMLElement) {
                var selectedElement = selectedElements[0];
                selectedElement.classList.remove(oldClass);
                selectedElement.classList.add(newClass);
            }
        };

        ManagedHeapGridViewerBase.prototype.redrawSelectionChangeRows = function (rowIndex) {
            this.updateRow(rowIndex, -1);
        };

        ManagedHeapGridViewerBase.prototype._getAriaLabelForRow = function (rowInfo) {
            if (!this._dataArray.isCached(this.findPathByRow(rowInfo.rowIndex).path)) {
                return;
            }
            var ariaLabel = _super.prototype._getAriaLabelForRow.call(this, rowInfo);
            if (ManagedHeapGridViewerBase.rowHasViewSourceAvailable(rowInfo)) {
                if (!ariaLabel) {
                    ariaLabel = "";
                }
                ariaLabel += Plugin.Resources.getString("RowViewSourceAriaLabelExtension");
            }
            return ariaLabel;
        };

        ManagedHeapGridViewerBase.prototype._onBlur = function (e) {
            this.replaceClassOnce("grid-cell-source-selected", "grid-cell-source-selected-blurred");
            _super.prototype._onBlur.call(this, e);
        };

        ManagedHeapGridViewerBase.prototype._onFocus = function (e) {
            this.replaceClassOnce("grid-cell-source-selected-blurred", "grid-cell-source-selected");
            _super.prototype._onFocus.call(this, e);
        };

        ManagedHeapGridViewerBase.prototype.onF12 = function () {
            if (!ManagedHeapGridViewerBase.selectedGrid || !ManagedHeapGridViewerBase.selectedGrid.selectedRowHasSource()) {
                alert(Plugin.Resources.getString("ContextMenuViewSourceError"));
                return;
            }

            this.navigateToSelectedRowSource();
        };

        ManagedHeapGridViewerBase.prototype.getSourceDescription = function (rowIndex) {
            var _this = this;
            var path = this.findPathByRow(rowIndex);
            var sourceDescription = null;

            if ((this instanceof MemoryProfiler.ManagedHeapRefGraphViewerBase) || (this instanceof ManagedHeapGridViewer) && path.length() === 1) {
                this._dataArray.get(path.path, function (value, needUpdate) {
                    var sourceDescriptionJSON = value["SourceDescription"];
                    if (sourceDescriptionJSON) {
                        sourceDescription = JSON.parse(sourceDescriptionJSON);
                        if (sourceDescription) {
                            sourceDescription.fullTypeName = _this.formatTypeName(value["FullTypeName"]);
                        }
                    } else {
                        sourceDescription = {
                            fullTypeName: _this.formatTypeName(value["FullTypeName"])
                        };
                    }
                });
            }
            return sourceDescription;
        };

        ManagedHeapGridViewerBase.prototype.formatTypeName = function (typeName) {
            return typeName;
        };

        ManagedHeapGridViewerBase.prototype.selectedRowHasSource = function () {
            var dataIndex = this.getSelectedDataIndex();
            if (dataIndex < 0) {
                return false;
            }

            var rowInfo = this.getRowInfo(dataIndex);
            if (!rowInfo) {
                return false;
            }

            return ManagedHeapGridViewerBase.rowHasViewSourceAvailable(rowInfo);
        };

        ManagedHeapGridViewerBase.rowHasViewSourceAvailable = function (rowInfo) {
            var row = rowInfo.row;
            if (!row || row.childNodes == null || row.childNodes.length < 1) {
                return false;
            }

            var childNode = row.childNodes[0];
            if (!childNode || !(childNode instanceof HTMLElement)) {
                return false;
            }

            var viewSourceCell = childNode;

            return viewSourceCell.classList.contains("grid-cell-source") || viewSourceCell.classList.contains("grid-cell-source-selected") || viewSourceCell.classList.contains("grid-cell-source-selected-blurred");
        };

        ManagedHeapGridViewerBase.setTooltip = function (element, tooltip) {
            var jsonTooltip = {
                content: tooltip,
                height: ManagedHeapGridViewerBase.RefCellTooltipHeight,
                contentContainsHTML: true
            };
            element.setAttribute("data-plugin-vs-tooltip", JSON.stringify(jsonTooltip));
        };

        ManagedHeapGridViewerBase.buildSourceDescriptionTooltip = function (sourceDescription) {
            if (!sourceDescription || !sourceDescription.fullTypeName || !sourceDescription.file || !sourceDescription.line || !sourceDescription.col) {
                return "";
            }

            var typeName = ManagedHeapGridViewerBase.chunkTooltipString(sourceDescription.fullTypeName);
            var splitTypeName = typeName.split("@");
            typeName = splitTypeName[0].trim();

            var column = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(sourceDescription.col, true);
            var line = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(sourceDescription.line, true);
            var filename = sourceDescription.file;
            filename = ManagedHeapGridViewerBase.chunkTooltipString(filename);

            var tooltip = MemoryProfiler.Common.FormattingHelpers.stringFormat(ManagedHeapGridViewerBase.TypeTooltipFormat, new Array(Plugin.Resources.getString("ViewSourceTooltipIdentifier"), typeName, Plugin.Resources.getString("ViewSourceTooltipFilename"), filename, Plugin.Resources.getString("ViewSourceTooltipLine"), line, Plugin.Resources.getString("ViewSourceTooltipCol"), column));

            return tooltip;
        };

        ManagedHeapGridViewerBase.chunkTooltipString = function (stringToChunk) {
            if (!stringToChunk) {
                return stringToChunk;
            }

            var sourceString = stringToChunk.replace(/[<>]/g, function ($0, $1, $2) {
                return ($0 === "<") ? "&lt;" : "&gt;";
            });

            var chunkedString = "";
            while (sourceString.length > ManagedHeapGridViewerBase.TypeTooltipChunkSize) {
                chunkedString += sourceString.substr(0, ManagedHeapGridViewerBase.TypeTooltipChunkSize) + "<br/>";
                sourceString = sourceString.substr(ManagedHeapGridViewerBase.TypeTooltipChunkSize, sourceString.length - ManagedHeapGridViewerBase.TypeTooltipChunkSize);
            }
            chunkedString += sourceString;
            return chunkedString;
        };
        ManagedHeapGridViewerBase.TypeTooltipChunkSize = 128;
        ManagedHeapGridViewerBase.RefCellTooltipHeight = 65;
        ManagedHeapGridViewerBase.TypeTooltipFormat = "<table border='0'>\
<tr style='vertical-align:top'><td>{0}:</td><td>{1}</td></tr>\
<tr style='vertical-align:top'><td>{2}:</td><td>{3}</td></tr>\
<tr><td>{4}:</td><td>{5}</td></tr>\
<tr><td>{6}:</td><td>{7}</td></tr>\
</table>";
        return ManagedHeapGridViewerBase;
    })(MemoryProfiler.HeapGridViewer);
    MemoryProfiler.ManagedHeapGridViewerBase = ManagedHeapGridViewerBase;

    var ManagedHeapGridViewer = (function (_super) {
        __extends(ManagedHeapGridViewer, _super);
        function ManagedHeapGridViewer(root, managedHeapViewer, dataArray, gridContextMenu, columns, refGraphCallback) {
            this._managedHeapViewer = managedHeapViewer;
            this.refGraphShow = refGraphCallback;
            this._setFilterAndSortOrderHandler = "TypeSummariesSetFilterAndSortOrder";

            var options = new TreeGridCommon.Controls.DynamicGrid.DynamicGridViewerOptions(gridContextMenu, null, columns, null, null, true);
            options.overflowColumn = true;

            this._refGraphNoDataElement = this._managedHeapViewer.getElementById("ManagedHeapViewerRefGraphNoData");
            this._refGraphNoDataElement.innerHTML = Plugin.Resources.getString("RefGraphNoData");

            _super.call(this, dataArray, root, options, columns);
            this.updateSort();
        }
        Object.defineProperty(ManagedHeapGridViewer.prototype, "waitingForUpdate", {
            get: function () {
                return this.IsWaitingForUpdate();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(ManagedHeapGridViewer.prototype, "viewer", {
            get: function () {
                return MemoryProfiler.ManagedHeapViewer.instance;
            },
            enumerable: true,
            configurable: true
        });

        ManagedHeapGridViewer.prototype.layout = function () {
            _super.prototype.layout.call(this);
            if (!this.waitingForUpdate) {
                MemoryProfiler.ManagedHeapViewer.instance.onGridReady();
                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarkers(27206 /* perfMP_ToggleManagedNativeSelectionStart */, 27208 /* perfMP_ManagedDetailsViewLoadStart */, 27210 /* perfMP_NativeDetailsViewLoadStart */);
            }
        };

        ManagedHeapGridViewer.prototype.resetView = function () {
            this.hideRefGraph();
            this._clearSelection();
            this.setSelectedRowIndex(-1);
            this.refresh();
        };

        ManagedHeapGridViewer.prototype.setSelectedRowIndex = function (selectedRowIndex) {
            this.currentSelectedIndex = -1;
            _super.prototype.setSelectedRowIndex.call(this, selectedRowIndex);
        };

        ManagedHeapGridViewer.prototype.setFilterAsync = function (filterString) {
            var _this = this;
            if (filterString !== this._filter) {
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27224 /* perfMP_SetSearchFilterStart */, 27225 /* perfMP_SetSearchFilterEnd */);
                this._filter = filterString;
                this.adaptor()._call(this._setFilterAndSortOrderHandler, this._filter, this._sortOrderIndex, this._sortOrderOrder).done(function (refresh) {
                    if (refresh) {
                        _this.resetView();
                    }

                    MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27224 /* perfMP_SetSearchFilterStart */);
                });
            }
        };

        ManagedHeapGridViewer.prototype.updateSort = function () {
            var sortProperty;
            this.getColumns().forEach(function (column) {
                if (column.index.indexOf(MemoryProfiler.ManagedHeapViewer.instance.detailsViewModel.sortPropertyManaged) == 0) {
                    sortProperty = column.index;
                }
            });

            if (!sortProperty) {
                sortProperty = "RetainedSize";
            } else if (sortProperty == this._sortOrderIndex) {
                return;
            }

            this.onSort([new TreeGridCommon.Controls.Grid.SortOrderInfo(sortProperty, "desc")], []);
        };

        ManagedHeapGridViewer.prototype._trySorting = function (sortOrder, sortColumns) {
            var _this = this;
            this._sortOrderIndex = sortOrder[0].index;
            this._sortOrderOrder = sortOrder[0].order;
            this.adaptor()._call(this._setFilterAndSortOrderHandler, this._filter, this._sortOrderIndex, this._sortOrderOrder).done(function () {
                _this.resetView();
            });
        };

        ManagedHeapGridViewer.prototype.translateColumn = function (row, index) {
            var retval = _super.prototype.translateColumn.call(this, row, index);
            if (!row) {
                if (index === "TagName") {
                    retval = Plugin.Resources.getString("LoadRowDataText");
                }
            } else {
                if (index === "Count") {
                    if (row.Count === -1) {
                        retval = "";
                    } else {
                        if (!retval)
                            retval = "1";
                        retval = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(parseInt(retval), true, false);
                    }
                } else if (index === "TotalSize" || index === "RetainedSize") {
                    if (row.Count === -1) {
                        retval = "";
                    } else {
                        if (!retval) {
                            retval = "0";
                        }
                        retval = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(parseInt(retval), true, false);
                    }
                } else if (index === "TagName" || index === "Module") {
                    retval = MemoryProfiler.Common.FormattingHelpers.getNativeDigitLocaleString(retval);
                } else {
                    if (row.Count === 0 && row.TotalSize !== 0 || row.Count === -1) {
                        retval = "";
                    } else {
                        if (!retval) {
                            retval = "0";
                        }
                        if (parseInt(retval)) {
                            retval = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(parseInt(retval), true, true);
                        }
                    }
                }
            }
            return retval;
        };

        ManagedHeapGridViewer.prototype.translateExternalPathColumn = function (treePath, index) {
            return index === "TagName" ? Plugin.Resources.getString("GridTrimLimit").replace("{0}", this.MaxRows.toString()) : "";
        };

        ManagedHeapGridViewer.prototype.onSelectRow = function (rowIndex) {
            ManagedHeapGridViewerBase.selectedGrid = this;

            if (!this._dataArray.isCached(this.findPathByRow(rowIndex).path)) {
                return;
            }

            this.redrawSelectionChangeRows(rowIndex);

            if (this.currentSelectedIndex === this.getSelectedRowIndex()) {
                return;
            }

            if (this.getSelectionCount() > 1 || !this.getSelectedRows().hasOwnProperty(rowIndex)) {
                this.hideRefGraph();
                return;
            }

            this.activateRow(rowIndex);
        };

        ManagedHeapGridViewer.prototype.activateRow = function (rowIndex) {
            var _this = this;
            var asyncEnd = false;

            MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27212 /* perfMP_MasterNodeSelectionChangeStart */, 27213 /* perfMP_MasterNodeSelectionChangeEnd */);

            this.currentSelectedIndex = this.getSelectedRowIndex();

            var path = this.findPathByRow(rowIndex);
            if (rowIndex === this.MaxRows - 1) {
                this.hideRefGraph();
            } else if (path.length() === 1) {
                this._dataArray.get(path.path, function (value, needUpdate) {
                    _this.adaptor()._call("OnSelectType", value["Tag"]).done(function (isOk) {
                        if (isOk) {
                            MemoryProfiler.ManagedHeapViewer.instance.refGraphTarget = 0 /* Types */;
                            _this._currentSelectedItemTagName = value["TagName"];
                            _this._refGraphNoDataElement.style.display = "none";
                            MemoryProfiler.ManagedHeapViewer.instance.getTypeRefViewer().done(function () {
                                MemoryProfiler.ManagedHeapViewer.instance.typeRefsViewer.refreshSortingOrder(function () {
                                    _this.refGraphShow(true);
                                });
                            });
                            asyncEnd = true;
                            MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27212 /* perfMP_MasterNodeSelectionChangeStart */);
                        }
                    });
                });
            } else if (path.length() === 2) {
                this._dataArray.get(path.path, function (value, needUpdate) {
                    if (value["TagName"] === "<noobject>") {
                        _this.hideRefGraph();
                    } else {
                        var objectTag = value["Tag"];
                        _this.adaptor()._call("OnSelectObject", objectTag).done(function (isOk) {
                            if (isOk) {
                                MemoryProfiler.ManagedHeapViewer.instance.refGraphTarget = 1 /* Objects */;
                                MemoryProfiler.ManagedHeapViewer.instance.getObjectRefViewer().done(function () {
                                    _this._currentSelectedItemTagName = value["TagName"];
                                    _this._refGraphNoDataElement.style.display = "none";
                                    _this.refGraphShow(true);
                                });

                                asyncEnd = true;
                                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27212 /* perfMP_MasterNodeSelectionChangeStart */);
                            }
                        });
                    }
                });
            } else {
                this.hideRefGraph();
            }

            if (!asyncEnd) {
                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(27212 /* perfMP_MasterNodeSelectionChangeStart */);
            }
        };

        ManagedHeapGridViewer.prototype.selectedTagName = function () {
            return this._currentSelectedItemTagName;
        };

        ManagedHeapGridViewer.prototype.hideRefGraph = function () {
            MemoryProfiler.ManagedHeapViewer.instance.resetCurrentSelectedIndex();
            this.refGraphShow(false);
            this._refGraphNoDataElement.style.display = "block";
        };
        return ManagedHeapGridViewer;
    })(ManagedHeapGridViewerBase);
    MemoryProfiler.ManagedHeapGridViewer = ManagedHeapGridViewer;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ManagedHeapGridViewer.js.map

// NativeHeapViewer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var NativeHeapViewer = (function (_super) {
        __extends(NativeHeapViewer, _super);
        function NativeHeapViewer(detailsViewModel) {
            _super.call(this, "NativeHeapTemplate");
            this._nativeHeapAllocationListViewer = null;
            this.rightAlignedColumnHeaderCss = "rightAlignedColumnHeader";

            this._isFirstJmc = true;
            this._isFirstViewCallers = true;
            this._isFirstViewCallees = true;

            this._detailsViewModel = detailsViewModel;
            this._detailsViewModel.registerPropertyChanged(this);
            this._justMyCode = this._detailsViewModel.justMyCodeNative;
            this._showTransientBytes = this._detailsViewModel.showTransientBytes;
            this._isAggregateByTop = this._detailsViewModel.nativeHeapAllocationsAggregationType === 0 /* top */;
            this._openedInDetailsTab = false;
            this._nativeAllocationsCommandLogged = false;
            this._adaptor = new MemoryProfiler.NativeHeapPublishedObjectAdaptor(this);

            this.initializeContextMenus();
            this.initializeUIElementsAsync();
        }
        NativeHeapViewer.prototype.toggleJustMyCodeAsync = function () {
            var _this = this;
            if (this._isFirstJmc) {
                this._isFirstJmc = false;
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27228 /* perfMP_SetJMCValueColdStart */, 27229 /* perfMP_SetJMCValueColdEnd */);
            } else {
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27226 /* perfMP_SetJMCValueWarmStart */, 27227 /* perfMP_SetJMCValueWarmEnd */);
            }

            this.enableInProgressState();
            this._justMyCode = !this._justMyCode;
            MemoryProfiler.Common.MemoryProfilerViewHost.session.updateDetailsViewSetting("justMyCodeNative", this._justMyCode).done(function () {
                _this.updateNotificationBar();
                _this.refreshUIAsync();
            });
        };

        NativeHeapViewer.prototype.toggleShowTransientBytesAsync = function () {
            var _this = this;
            this._showTransientBytes = !this._showTransientBytes;
            this.enableInProgressState();
            MemoryProfiler.Common.MemoryProfilerViewHost.session.updateDetailsViewSetting("includeFreedAllocations", this._showTransientBytes).done(function () {
                _this.updateNotificationBar();
                _this.refreshUIAsync();
            });
        };

        NativeHeapViewer.prototype.updateNotificationBar = function () {
            if (this._justMyCode || this._showTransientBytes) {
                this._notificationBar.style.display = "inline";

                var activeSettingName = "";

                if (this._justMyCode) {
                    activeSettingName = Plugin.Resources.getString("NotificationBarJMCEnabled");
                }

                if (this._showTransientBytes) {
                    if (this._justMyCode) {
                        activeSettingName = activeSettingName.concat(", ");
                    }

                    activeSettingName = activeSettingName.concat(Plugin.Resources.getString("NotificationBarShowTransientBytesEnabled"));
                }

                this._notificationBarMessage.innerText = Plugin.Resources.getString("NotificationBarMessage").replace("{0}", activeSettingName);
            } else {
                this._notificationBar.style.display = "none";
            }
        };

        NativeHeapViewer.prototype.initializeContextMenus = function () {
            this._gridContextMenuOptions = new Array();

            for (var i = 0; i < 2; i++) {
                var menuItems = new Array();

                menuItems[0] = {
                    id: "nativeHeapCopyMenuItem" + i,
                    callback: MemoryProfiler.HeapGridViewer.copySelectedRowsToClipboard,
                    label: Plugin.Resources.getString("ContextMenuCopy"),
                    type: 1 /* command */,
                    iconEnabled: null,
                    iconDisabled: null,
                    accessKey: "Ctrl+C",
                    hidden: function () {
                        return false;
                    },
                    disabled: function () {
                        return false;
                    },
                    checked: function () {
                        return false;
                    },
                    cssClass: null,
                    submenu: null
                };

                this._gridContextMenuOptions[i] = menuItems;
            }
        };

        NativeHeapViewer.prototype.toggleAllocationsAggregationType = function () {
            this._isAggregateByTop = this._detailsViewModel.nativeHeapAllocationsAggregationType === 0 /* top */;
            this.enableInProgressState();
            this.refreshUIAsync();
        };

        NativeHeapViewer.prototype.initializeUIElementsAsync = function () {
            this._notificationBar = this.findElement("notificationBar");
            this._notificationBarMessage = this.findElement("notificationBarMessage");
            this._aggregationToggle = this.createAggregationDirectionToggle();
            this._viewOverlay = this.findElement("heapViewOverlay");
            this._progressBar = this.findElement("progressBar");
            this.findElement("notificationArea").appendChild(this._aggregationToggle.rootElement);
        };

        NativeHeapViewer.prototype.createAggregationDirectionToggle = function () {
            var _this = this;
            return new MemoryProfiler.AggregationDirectionToggle(this._detailsViewModel, function () {
                return _this._detailsViewModel.nativeHeapAllocationsAggregationType;
            }, function (v) {
                _this._detailsViewModel.nativeHeapAllocationsAggregationType = v;
            }, "nativeHeapAllocationsAggregationType");
        };

        NativeHeapViewer.prototype.onGridReady = function () {
            if (this._nativeHeapMasterGridViewer && !this._nativeHeapMasterGridViewer.waitingForUpdate) {
                if (this._nativeHeapAllocationListViewer && !this._nativeHeapAllocationListViewer.waitingForUpdate) {
                    this.disableInProgressState();
                    this._detailsViewModel.detailsViewReady = true;

                    MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarkers(27206 /* perfMP_ToggleManagedNativeSelectionStart */, 27210 /* perfMP_NativeDetailsViewLoadStart */, 27216 /* perfMP_ViewIdentifierCallersColdStart */, 27218 /* perfMP_ViewIdentifierCallersWarmStart */, 27220 /* perfMP_ViewIdentifierCalleesColdStart */, 27222 /* perfMP_ViewIdentifierCalleesWarmStart */, 27228 /* perfMP_SetJMCValueColdStart */, 27226 /* perfMP_SetJMCValueWarmStart */, 27208 /* perfMP_ManagedDetailsViewLoadStart */);
                }
            }
        };

        Object.defineProperty(NativeHeapViewer.prototype, "detailsViewModel", {
            get: function () {
                return this._detailsViewModel;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapViewer.prototype, "masterGridViewer", {
            get: function () {
                return this._nativeHeapMasterGridViewer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapViewer.prototype, "findResultsCache", {
            get: function () {
                return this._findResultsCache;
            },
            set: function (v) {
                if (this._findResultsCache && this._findResultsCache.result) {
                    this._findResultsCache.result.dispose();
                }

                this._findResultsCache = v;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(NativeHeapViewer.prototype, "allocationListViewer", {
            get: function () {
                return this._nativeHeapAllocationListViewer;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapViewer.prototype, "isAggregateByTop", {
            get: function () {
                return this._isAggregateByTop;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapViewer.prototype, "justMyCode", {
            get: function () {
                return this._justMyCode;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapViewer.prototype, "findString", {
            get: function () {
                return this._detailsViewModel.nativeFilterString;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapViewer.prototype, "shouldShowTransientBytes", {
            get: function () {
                return this._showTransientBytes;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapViewer.prototype, "masterGridSortColumnIndex", {
            get: function () {
                return this._masterGridSortColumnIndex === undefined ? "OutstandingSize" : this._masterGridSortColumnIndex;
            },
            set: function (v) {
                if (this._masterGridSortColumnIndex !== v) {
                    this._masterGridSortColumnIndex = v;
                    if (this._nativeHeapAllocationListViewer) {
                        this._nativeHeapAllocationListViewer.showGraph(false);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(NativeHeapViewer.prototype, "masterGridSortColumnOrder", {
            get: function () {
                if (this._masterGridSortColumnOrder === undefined) {
                    return "desc";
                }

                return this._masterGridSortColumnOrder;
            },
            set: function (v) {
                if (this._masterGridSortColumnOrder !== v) {
                    this._masterGridSortColumnOrder = v;
                    if (this._nativeHeapAllocationListViewer) {
                        this._nativeHeapAllocationListViewer.showGraph(false);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(NativeHeapViewer.prototype, "feedbackSourceName", {
            get: function () {
                return MemoryProfiler.Common.FeedbackCommandSourceNames.NativeHeapView;
            },
            enumerable: true,
            configurable: true
        });

        NativeHeapViewer.prototype.updateSortProperty = function (sortProperty, sortOrder) {
            if (this.masterGridViewer) {
                this.masterGridViewer.updateSort(sortProperty, sortOrder);
            }
        };

        NativeHeapViewer.prototype.updateColumnConfiguration = function () {
            var isDiffView = this._detailsViewModel.isDiffView;

            this._nativeHeapViewColumns = [
                new TreeGridCommon.Controls.Grid.ColumnInfo("Id", Plugin.Resources.getString("Identifier"), Plugin.Resources.getString("IdentifierTooltip"), NativeHeapViewer.IDENTIFIER_COLUMN_WIDTH, true),
                new TreeGridCommon.Controls.Grid.ColumnInfo("OutstandingCount", Plugin.Resources.getString("Count"), Plugin.Resources.getString("OutstandingAllocationsCountTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"),
                new TreeGridCommon.Controls.Grid.ColumnInfo("OutstandingSize", Plugin.Resources.getString("Size"), Plugin.Resources.getString("OutstandingAllocationsSizeTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc")
            ];

            this._nativeHeapViewColumns[1].headerCss = this.rightAlignedColumnHeaderCss;
            this._nativeHeapViewColumns[2].headerCss = this.rightAlignedColumnHeaderCss;

            if (this._showTransientBytes) {
                this._nativeHeapViewColumns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("TotalCount", Plugin.Resources.getString("TotalCount"), Plugin.Resources.getString("TotalAllocationCountTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"));
                this._nativeHeapViewColumns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("TotalSize", Plugin.Resources.getString("TotalSize"), Plugin.Resources.getString("TotalAllocationSizeTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"));

                this._nativeHeapViewColumns[this._nativeHeapViewColumns.length - 2].headerCss = this.rightAlignedColumnHeaderCss;
                this._nativeHeapViewColumns[this._nativeHeapViewColumns.length - 1].headerCss = this.rightAlignedColumnHeaderCss;
            }

            if (isDiffView) {
                this._nativeHeapViewColumns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("OutstandingCountDiff", Plugin.Resources.getString("CountDiff"), Plugin.Resources.getString("OutstandingCountDiffTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"));
                this._nativeHeapViewColumns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("OutstandingSizeDiff", Plugin.Resources.getString("SizeDiff"), Plugin.Resources.getString("OutstandingSizeDiffTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"));

                this._nativeHeapViewColumns[this._nativeHeapViewColumns.length - 2].headerCss = this.rightAlignedColumnHeaderCss;
                this._nativeHeapViewColumns[this._nativeHeapViewColumns.length - 1].headerCss = this.rightAlignedColumnHeaderCss;

                if (this._showTransientBytes) {
                    this._nativeHeapViewColumns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("TotalCountDiff", Plugin.Resources.getString("TotalCountDiff"), Plugin.Resources.getString("TotalAllocationCountDiffTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));
                    this._nativeHeapViewColumns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("TotalSizeDiff", Plugin.Resources.getString("TotalSizeDiff"), Plugin.Resources.getString("TotalAllocationSizeDiffTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                        return "rightAlignedColumn";
                    }, null, "desc"));

                    this._nativeHeapViewColumns[this._nativeHeapViewColumns.length - 2].headerCss = this.rightAlignedColumnHeaderCss;
                    this._nativeHeapViewColumns[this._nativeHeapViewColumns.length - 1].headerCss = this.rightAlignedColumnHeaderCss;
                }
            }

            this._nativeHeapViewColumns.push(new TreeGridCommon.Controls.Grid.ColumnInfo("Module", Plugin.Resources.getString("Module"), Plugin.Resources.getString("ModuleTooltip"), NativeHeapViewer.MODULE_COLUMN_WIDTH, true));
        };

        NativeHeapViewer.prototype.refreshUIAsync = function () {
            var _this = this;
            this.findResultsCache = null;

            if (this._splitter)
                this._splitter = null;
            var div = this.findElement("NativeHeapMasterDetailContainer");
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }

            if (this._nativeHeapViewDataSource) {
                this._nativeHeapViewDataSource.flushCache();
                this._nativeHeapViewDataSource = null;
            }

            if (this._isAggregateByTop) {
                if (this._isFirstViewCallers) {
                    this._isFirstViewCallers = false;
                    MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27216 /* perfMP_ViewIdentifierCallersColdStart */, 27217 /* perfMP_ViewIdentifierCallersColdEnd */);
                } else {
                    MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27218 /* perfMP_ViewIdentifierCallersWarmStart */, 27219 /* perfMP_ViewIdentifierCallersWarmEnd */);
                }
            } else {
                if (this._isFirstViewCallees) {
                    this._isFirstViewCallees = false;
                    MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27220 /* perfMP_ViewIdentifierCalleesColdStart */, 27221 /* perfMP_ViewIdentifierCalleesColdEnd */);
                } else {
                    MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27222 /* perfMP_ViewIdentifierCalleesWarmStart */, 27223 /* perfMP_ViewIdentifierCalleesWarmEnd */);
                }
            }

            var dataSource = this.getMasterGridDataSourceName();
            this._nativeHeapViewDataSource = new TreeGridCommon.Controls.DynamicGrid.ProxyArray(this._adaptor, dataSource, NativeHeapViewer.ProxyArrayCacheSize);
            this.updateColumnConfiguration();

            this._nativeHeapViewDataSource.init(function () {
                _this._nativeHeapMasterGridViewer = new MemoryProfiler.NativeHeapGridViewer(_this.findElement("NativeHeapMasterDetailContainer"), _this, _this._nativeHeapViewDataSource, _this._gridContextMenuOptions[0], _this._nativeHeapViewColumns);

                _this._splitter = new TreeGridCommon.Controls.GridSplitterControl(_this.findElement("snapshotViewGridSplitter"), null, function () {
                    _this.masterGridViewer.scheduleUpdate();
                    _this.allocationListViewer.scheduleUpdate();
                });
                _this.updateSortProperty(_this._masterGridSortColumnIndex, _this._masterGridSortColumnOrder);
            });

            this.refreshAllocationListView();
            this.updateNotificationBar();
        };

        NativeHeapViewer.prototype.getMasterGridDataSourceName = function () {
            return "NativeHeapTopViewDataSource";
        };

        NativeHeapViewer.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case "justMyCodeNative":
                    this.toggleJustMyCodeAsync();
                    break;
                case "showTransientBytes":
                    this.toggleShowTransientBytesAsync();
                    break;
                case "nativeHeapAllocationsAggregationType":
                    this.toggleAllocationsAggregationType();
                    break;
                case "targetView":
                    if (this.detailsViewModel.targetView === 1 /* nativeHeap */) {
                        if (!this._openedInDetailsTab) {
                            this.enableInProgressState();
                            this.refreshUIAsync();
                            this._openedInDetailsTab = true;
                        } else {
                            this.masterGridViewer.layout();
                            this.allocationListViewer.layout();
                        }
                    }
                    break;
                case "sortPropertyNative":
                    this.updateSortProperty(this._detailsViewModel.sortPropertyNative, "desc");
                    break;

                case "nativeFilterString":
                    this.lookupString();
                    break;
            }
        };

        NativeHeapViewer.prototype.lookupString = function () {
            var _this = this;
            if (this.isViewDisabled()) {
                return;
            }

            if (this.findString === "") {
                this.findResultsCache = null;
                return;
            }

            if (this.findResultsCache && this.findString !== this.findResultsCache.findString) {
                this.findResultsCache = null;
            }

            if (!this.findResultsCache) {
                this.enableInProgressState();
                this._adaptor._call("FindString").then(function (results) {
                    _this.findResultsCache = {
                        "results": results,
                        "findString": _this.findString
                    };
                    _this.displayFindResult();
                });
            } else {
                this.enableInProgressState();
                this.displayFindResult();
            }
        };

        NativeHeapViewer.prototype.displayFindResult = function () {
            var _this = this;
            if (this.findResultsCache && this.findResultsCache.results) {
                this.findResultsCache.results.getResult(null).then(function (stackIndices) {
                    var dvm = _this.detailsViewModel;
                    dvm.LogSearchHeapViewCommand(MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(dvm.targetView));

                    if (stackIndices && stackIndices.length > 0) {
                        var correctedArray = [];
                        for (var i = 0; i < stackIndices.length; i++) {
                            correctedArray.push(+stackIndices[i]);
                        }

                        _this.masterGridViewer.goToFindResult(new TreeGridCommon.Controls.DynamicGrid.TreePath(correctedArray));
                    } else {
                        _this.findResultsCache = null;
                        _this.disableInProgressState();
                        alert(Plugin.Resources.getString("NativeFindNoResultsString"));
                    }
                });
            }
        };

        NativeHeapViewer.prototype.getElementById = function (elementId) {
            return this.findElement(elementId);
        };

        NativeHeapViewer.prototype.updateAllocationList = function (selectedRowPath) {
            this.LogViewNativeAllocationsCommand();
            this._adaptor.updateAllocationListDataSource(selectedRowPath);
            this._nativeHeapAllocationListViewer.setSelectedRowIndex(-1);
            this._nativeHeapAllocationListViewer.refresh();
            this._nativeHeapAllocationListViewer.showGraph(true);
        };

        NativeHeapViewer.prototype.LogViewNativeAllocationsCommand = function () {
            if (this._nativeAllocationsCommandLogged) {
                return;
            }
            this._nativeAllocationsCommandLogged = true;
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.ViewNativeAllocations, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, this.feedbackSourceName);
        };

        NativeHeapViewer.prototype.refreshAllocationListView = function () {
            var _this = this;
            this._nativeHeapAllocationListDataSource = new TreeGridCommon.Controls.DynamicGrid.ProxyArray(this._adaptor, "AllocationList", NativeHeapViewer.ProxyArrayCacheSize);
            var _allocationListColumns = [
                new TreeGridCommon.Controls.Grid.ColumnInfo("Identifier", Plugin.Resources.getString("Identifier"), Plugin.Resources.getString("IdentifierTooltip"), NativeHeapViewer.IDENTIFIER_COLUMN_WIDTH, true),
                new TreeGridCommon.Controls.Grid.ColumnInfo("Address", Plugin.Resources.getString("Address"), Plugin.Resources.getString("AddressTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true),
                new TreeGridCommon.Controls.Grid.ColumnInfo("Size", Plugin.Resources.getString("Size"), Plugin.Resources.getString("SizeTooltip"), NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"),
                new TreeGridCommon.Controls.Grid.ColumnInfo("Module", Plugin.Resources.getString("Module"), Plugin.Resources.getString("ModuleTooltip"), NativeHeapViewer.MODULE_COLUMN_WIDTH, true)
            ];

            _allocationListColumns[2].headerCss = this.rightAlignedColumnHeaderCss;

            this._nativeHeapAllocationListDataSource.init(function () {
                if (_this._nativeHeapAllocationListViewer == null) {
                    _this._nativeHeapAllocationListViewer = new MemoryProfiler.NativeHeapAllocationListViewer(_this.findElement("NativeHeapViewerAllocationListContainer"), _this._nativeHeapAllocationListDataSource, _this._gridContextMenuOptions[1], _allocationListColumns, _this);
                }
                _this._nativeHeapAllocationListViewer.showGraph(false);
            });
        };

        NativeHeapViewer.prototype.getActiveGrid = function () {
            if (this.masterGridViewer.isActive)
                return this.masterGridViewer;
            if (this.allocationListViewer.isActive)
                return this.allocationListViewer;
            return null;
        };

        NativeHeapViewer.prototype.enableInProgressState = function () {
            this._viewOverlay.classList.add("heapContainerDisable");
            this._progressBar.style.display = "inline";
        };

        NativeHeapViewer.prototype.disableInProgressState = function () {
            this._viewOverlay.classList.remove("heapContainerDisable");
            this._progressBar.style.display = "none";
        };

        NativeHeapViewer.prototype.isViewDisabled = function () {
            return this._viewOverlay.classList.contains("heapContainerDisable");
        };
        NativeHeapViewer.ProxyArrayCacheSize = 1000;
        NativeHeapViewer.MODULE_COLUMN_WIDTH = 200;
        NativeHeapViewer.IDENTIFIER_COLUMN_WIDTH = 500;
        NativeHeapViewer.NUMERIC_COLUMN_WIDTH = 150;
        return NativeHeapViewer;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.NativeHeapViewer = NativeHeapViewer;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=NativeHeapViewer.js.map

// AggregationDirectionToggle.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    (function (NativeHeapAllocationsAggregationType) {
        NativeHeapAllocationsAggregationType[NativeHeapAllocationsAggregationType["top"] = 0] = "top";
        NativeHeapAllocationsAggregationType[NativeHeapAllocationsAggregationType["bottom"] = 1] = "bottom";
    })(MemoryProfiler.NativeHeapAllocationsAggregationType || (MemoryProfiler.NativeHeapAllocationsAggregationType = {}));
    var NativeHeapAllocationsAggregationType = MemoryProfiler.NativeHeapAllocationsAggregationType;

    var AggregationDirectionToggle = (function (_super) {
        __extends(AggregationDirectionToggle, _super);
        function AggregationDirectionToggle(detailsViewModel, viewModelPropertyGetter, viewModelPropertySetter, viewModelPropertyName) {
            _super.call(this, "ToggleTabTemplate");

            this._detailsViewModel = detailsViewModel;
            this._viewModelPropertyGetter = viewModelPropertyGetter;
            this._viewModelPropertySetter = viewModelPropertySetter;
            this._viewModelPropertyName = viewModelPropertyName;
            this._detailsViewModel.registerPropertyChanged(this);

            this._aggregateTopButton = this.findElement("aggregationToggleTabTopButton");
            this._aggregateBottomButton = this.findElement("aggregationToggleTabBottomButton");

            this.findElement("aggregationToggleTabLabel").innerText = Plugin.Resources.getString("AggregationToggleTabLabel");

            this._aggregateTopButton.innerText = Plugin.Resources.getString("AggregationToggleTop");
            var callerAriaLabelText = Plugin.Resources.getString("CallersToggleButtonTooltip");
            this._aggregateTopButton.setAttribute("data-plugin-vs-tooltip", callerAriaLabelText);
            this._aggregateTopButton.setAttribute("aria-label", callerAriaLabelText);

            this._aggregateBottomButton.innerText = Plugin.Resources.getString("AggregationToggleBottom");
            var calleeAriaLabelText = Plugin.Resources.getString("CalleesToggleButtonTooltip");
            this._aggregateBottomButton.setAttribute("data-plugin-vs-tooltip", calleeAriaLabelText);
            this._aggregateBottomButton.setAttribute("aria-label", calleeAriaLabelText);

            this.rootElement.style.cssFloat = "right";
            this._aggregateBottomButton.onclick = this.setAggregateBottomToggleButtonSelected.bind(this);
            this._aggregateTopButton.onclick = this.setAggregateTopToggleButtonSelected.bind(this);

            var toggleButtons = this.findElementsByClassName("toggleTabButtonContainer");
            for (var buttomIndex = 0; buttomIndex < toggleButtons.length; buttomIndex++) {
                var buttonElement = toggleButtons[buttomIndex];
                buttonElement.onkeydown = this.onButtonElementKeyDown.bind(buttonElement);
            }

            this.updateUI();
        }
        AggregationDirectionToggle.prototype.onButtonElementKeyDown = function (e) {
            if ((e.keyCode === 13 /* ENTER */ || e.keyCode === 32 /* SPACE */) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                e.srcElement.click();
            }
        };

        AggregationDirectionToggle.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case this._viewModelPropertyName:
                    this.updateUI();
                    break;
            }
        };

        AggregationDirectionToggle.prototype.updateUI = function () {
            var isTopSelected = this._viewModelPropertyGetter() === 0 /* top */;
            if (isTopSelected) {
                this._aggregateTopButton.classList.add("toggleTabSelectedButtonOutline");
                this._aggregateBottomButton.classList.remove("toggleTabSelectedButtonOutline");
            } else if (this._viewModelPropertyGetter() === 1 /* bottom */) {
                this._aggregateBottomButton.classList.add("toggleTabSelectedButtonOutline");
                this._aggregateTopButton.classList.remove("toggleTabSelectedButtonOutline");
            }

            this._aggregateTopButton.setAttribute("aria-checked", isTopSelected ? "true" : "false");
            this._aggregateBottomButton.setAttribute("aria-checked", isTopSelected ? "false" : "true");
        };

        AggregationDirectionToggle.prototype.setAggregateTopToggleButtonSelected = function () {
            this._viewModelPropertySetter(0 /* top */);
        };

        AggregationDirectionToggle.prototype.setAggregateBottomToggleButtonSelected = function () {
            this._viewModelPropertySetter(1 /* bottom */);
        };
        return AggregationDirectionToggle;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.AggregationDirectionToggle = AggregationDirectionToggle;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=AggregationDirectionToggle.js.map

// ManagedHeapRefGridViewer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    var ManagedHeapRefGraphViewerBase = (function (_super) {
        __extends(ManagedHeapRefGraphViewerBase, _super);
        function ManagedHeapRefGraphViewerBase(root, dataArray, gridContextMenu, columns) {
            var options = new TreeGridCommon.Controls.DynamicGrid.DynamicGridViewerOptions(gridContextMenu, null, columns, null, null, true);
            options.overflowColumn = true;
            options.header = true;
            _super.call(this, dataArray, root, options, columns);

            this._graphDomElement = root;
            this.showGraph(false);

            this.onSort([new TreeGridCommon.Controls.Grid.SortOrderInfo(columns[columns.length - 2].index, "desc")], []);

            this.currentSelectedIndex = -1;
        }
        Object.defineProperty(ManagedHeapRefGraphViewerBase.prototype, "waitingForUpdate", {
            get: function () {
                return this.IsWaitingForUpdate();
            },
            enumerable: true,
            configurable: true
        });

        ManagedHeapRefGraphViewerBase.prototype.layout = function () {
            _super.prototype.layout.call(this);
            if (!this.waitingForUpdate) {
                MemoryProfiler.ManagedHeapViewer.instance.onGridReady();
            }
        };

        Object.defineProperty(ManagedHeapRefGraphViewerBase.prototype, "viewer", {
            get: function () {
                return MemoryProfiler.ManagedHeapViewer.instance;
            },
            enumerable: true,
            configurable: true
        });

        ManagedHeapRefGraphViewerBase.prototype.translateColumn = function (row, index) {
            var retval;
            if (!row) {
                if (index === "Tag") {
                    retval = Plugin.Resources.getString("LoadRowDataText");
                }
            } else {
                retval = row && row[index] !== undefined ? row[index] : "";

                if ((index === "RetainedCount" || index === "RefCount" || index === "RetainedSize" || index === "Count" || index === "TotalSize") && retval !== "") {
                    retval = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(parseInt(retval), true, false);
                }
                if (index.search("Diff") !== -1) {
                    if (row["RetainedCount"] !== undefined || row["RefCount"] !== undefined) {
                        retval = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(parseInt(retval), true, true);
                    } else
                        retval = "";
                }
            }
            return retval;
        };

        ManagedHeapRefGraphViewerBase.prototype.translateExternalPathColumn = function (treePath, index) {
            return index === "Tag" ? Plugin.Resources.getString("GridTrimLimit").replace("{0}", (this.getFirstLevelCount() - treePath.path[0]).toString()) : "";
        };

        ManagedHeapRefGraphViewerBase.prototype.showGraph = function (show) {
            if (show) {
                this._graphDomElement.style.display = "block";
                MemoryProfiler.ManagedHeapViewer.instance.detailsViewModel.isManagedHeapViewerRefGraphVisible = true;
                this.initializeDataSource();
                this.scheduleUpdate();
            } else {
                this._graphDomElement.style.display = "none";
                MemoryProfiler.ManagedHeapViewer.instance.detailsViewModel.isManagedHeapViewerRefGraphVisible = false;
            }
        };

        ManagedHeapRefGraphViewerBase.prototype.expandRoot = function () {
            this.expandNode(new TreeGridCommon.Controls.DynamicGrid.TreePath([0]));
        };

        ManagedHeapRefGraphViewerBase.prototype._trySorting = function (sortOrder, sortColumns) {
            var _this = this;
            this._sortOrderIndex = sortOrder[0].index;
            this._sortOrderOrder = sortOrder[0].order;
            this.refreshSortingOrder(function () {
                _this.refresh();
                _this.expandRoot();
            });
        };

        ManagedHeapRefGraphViewerBase.prototype.refreshSortingOrder = function (next) {
            if (typeof next === "undefined") { next = function () {
            }; }
        };

        ManagedHeapRefGraphViewerBase.prototype.onSelectRow = function (rowIndex) {
            this.redrawSelectionChangeRows(rowIndex);
            this.currentSelectedIndex = rowIndex;

            MemoryProfiler.ManagedHeapGridViewerBase.selectedGrid = this;
        };
        return ManagedHeapRefGraphViewerBase;
    })(MemoryProfiler.ManagedHeapGridViewerBase);
    MemoryProfiler.ManagedHeapRefGraphViewerBase = ManagedHeapRefGraphViewerBase;

    var ManagedHeapTypeRefGraphViewer = (function (_super) {
        __extends(ManagedHeapTypeRefGraphViewer, _super);
        function ManagedHeapTypeRefGraphViewer(root, dataArray, gridContextMenu, columns) {
            _super.call(this, root, dataArray, gridContextMenu, columns);
        }
        ManagedHeapTypeRefGraphViewer.prototype.refreshSortingOrder = function (next) {
            if (typeof next === "undefined") { next = function () {
            }; }
            this.adaptor()._call("TypeRefGraphSetSortOrder", this._sortOrderIndex, this._sortOrderOrder).done(function () {
                next();
            });
        };
        return ManagedHeapTypeRefGraphViewer;
    })(ManagedHeapRefGraphViewerBase);
    MemoryProfiler.ManagedHeapTypeRefGraphViewer = ManagedHeapTypeRefGraphViewer;

    var ManagedHeapObjectRefGraphViewer = (function (_super) {
        __extends(ManagedHeapObjectRefGraphViewer, _super);
        function ManagedHeapObjectRefGraphViewer(root, dataArray, gridContextMenu, columns, direction) {
            this._graphDirection = direction;

            this._refCellColumnRightMargin = 4;
            this._refCellIndentLevelWidth = 16;
            this._refCellIndentLeftMargin = -13;

            _super.call(this, root, dataArray, gridContextMenu, columns);
        }
        ManagedHeapObjectRefGraphViewer.prototype._drawHeapGridCell = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
            if (this._graphDirection === 1 /* Backward */) {
                return this._drawRefCell(rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder);
            }
            return _super.prototype._drawHeapGridCell.call(this, rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder);
        };

        ManagedHeapObjectRefGraphViewer.prototype._drawRefCell = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
            var cellElement = this.createElementWithClass("div", "grid-cell-ref");
            cellElement.style.width = (column.width) + "px";

            var value = this.getColumnText(dataIndex, column, columnOrder);

            TreeGridCommon.Controls.Grid.GridControl._setTooltip(cellElement, column.hasHTMLContent ? "" : value, MemoryProfiler.ManagedHeapGridViewerBase.RefCellTooltipHeight);

            if (value) {
                cellElement.innerText = value;
            } else {
                cellElement.innerHTML = "&nbsp;";
            }

            if (columnOrder === indentIndex && level > 0) {
                var indent = ((level * this._refCellIndentLevelWidth) + this._refCellIndentLeftMargin);
                column.indentOffset = indent;
                if (expandedState !== 0) {
                    var treeSign = this.createElementWithClass("div", "icon grid-tree-icon");
                    treeSign.style.left = indent + "px";
                    cellElement.appendChild(treeSign);
                    if (expandedState > 0) {
                        treeSign.classList.add("icon-tree-expanded");
                    } else {
                        treeSign.classList.add("icon-tree-collapsed");
                    }
                }

                cellElement.style.textIndent = (level * this._refCellIndentLevelWidth) + "px";
            }

            if (MemoryProfiler.ManagedHeapViewer.viewSourceAvailable) {
                if (MemoryProfiler.ManagedHeapViewer.viewSourceSelected) {
                    cellElement.classList.add("grid-cell-source-selected");
                } else {
                    cellElement.classList.add("grid-cell-source");
                }
            }

            return cellElement;
        };

        ManagedHeapObjectRefGraphViewer.prototype.formatTypeName = function (typeName) {
            if (!typeName) {
                return "";
            }

            var splitName = typeName.split('@');
            return splitName[0].trim();
        };

        ManagedHeapObjectRefGraphViewer.prototype.refreshSortingOrder = function (next) {
            if (typeof next === "undefined") { next = function () {
            }; }
            this.adaptor()._call("ForwardRefGraphSetSortOrder", this._sortOrderIndex, this._sortOrderOrder).done(function () {
                next();
            });
        };
        return ManagedHeapObjectRefGraphViewer;
    })(ManagedHeapRefGraphViewerBase);
    MemoryProfiler.ManagedHeapObjectRefGraphViewer = ManagedHeapObjectRefGraphViewer;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=ManagedHeapRefGridViewer.js.map

// NativeHeapAllocationListViewer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var NativeHeapAllocationListViewer = (function (_super) {
        __extends(NativeHeapAllocationListViewer, _super);
        function NativeHeapAllocationListViewer(root, dataArray, gridContextMenu, columns, viewer) {
            this._initialized = false;
            this._viewer = viewer;
            this._sortOrderIndex = "Size";
            this._sortOrderOrder = "desc";
            var options = new TreeGridCommon.Controls.DynamicGrid.DynamicGridViewerOptions(gridContextMenu, null, columns, null, null, true);
            options.overflowColumn = true;
            options.header = true;
            _super.call(this, dataArray, root, options);

            this._graphDomElement = root;
            this._idGraphNoDataElement = this._viewer.getElementById("NativeHeapViewerAllocationListNoData");
            this._idGraphNoDataElement.innerHTML = Plugin.Resources.getString("AllocationListNoData");
            this._allocationListHeader = this._viewer.getElementById("nativeHeapAllocationListHeader");
            this._allocationListTitle = this._viewer.getElementById("allocationsTree");
            this._allocationListTitle.innerHTML = Plugin.Resources.getString("AllocationListHeader");
            this._allocationListHeader.style.display = "none";
            this._allocationListTitle.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("AllocationListHeaderTooltip"));
            this._allocationListTitle.className = "disabled";
            this.onSort([new TreeGridCommon.Controls.Grid.SortOrderInfo(this._sortOrderIndex, this._sortOrderOrder)], []);
            this._initialized = true;
        }
        Object.defineProperty(NativeHeapAllocationListViewer.prototype, "waitingForUpdate", {
            get: function () {
                return this.IsWaitingForUpdate();
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(NativeHeapAllocationListViewer.prototype, "allocationListCount", {
            get: function () {
                return this._allocationListCount;
            },
            set: function (v) {
                this._allocationListCount = v;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapAllocationListViewer.prototype, "viewer", {
            get: function () {
                return this._viewer;
            },
            enumerable: true,
            configurable: true
        });

        NativeHeapAllocationListViewer.prototype.layout = function () {
            _super.prototype.layout.call(this);
            if (!this.waitingForUpdate) {
                this._viewer.onGridReady();
            }
        };

        Object.defineProperty(NativeHeapAllocationListViewer.prototype, "sortOrderIndex", {
            get: function () {
                return this._sortOrderIndex;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapAllocationListViewer.prototype, "sortOrderOrder", {
            get: function () {
                if (this._sortOrderOrder === undefined) {
                    return "desc";
                }

                return this._sortOrderOrder;
            },
            enumerable: true,
            configurable: true
        });

        NativeHeapAllocationListViewer.prototype.translateColumn = function (row, index) {
            var retval;
            if (!row) {
                if (index === "Identifier")
                    retval = Plugin.Resources.getString("LoadRowDataText");
            } else {
                retval = row && row[index] !== undefined ? row[index] : "";

                if (index === "Size") {
                    if (retval == null) {
                        return "";
                    }
                    var numericalValue = parseInt(retval);
                    retval = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(numericalValue, true, false);
                }
                if (index === "Address") {
                    if (retval == null) {
                        return "";
                    }
                    var numericalValue = parseInt(retval);
                    retval = "0x" + numericalValue.toString(16);
                }
            }
            return retval;
        };

        NativeHeapAllocationListViewer.prototype.translateExternalPathColumn = function (treePath, index) {
            return index === "Tag" ? Plugin.Resources.getString("GridTrimLimit").replace("{0}", (this.getFirstLevelCount() - treePath.path[0]).toString()) : "";
        };

        NativeHeapAllocationListViewer.prototype.showGraph = function (show) {
            if (show) {
                this._idGraphNoDataElement.style.display = "none";
                this._graphDomElement.style.display = "block";
                this._allocationListHeader.style.display = this._allocationListTitle.style.display = "block";
                this._viewer.detailsViewModel.isNativeHeapViewerAllocationListVisible = true;
            } else {
                this._idGraphNoDataElement.style.display = "block";
                this._graphDomElement.style.display = "none";
                this._allocationListHeader.style.display = this._allocationListTitle.style.display = "none";
                this._viewer.detailsViewModel.isNativeHeapViewerAllocationListVisible = false;
            }
        };

        NativeHeapAllocationListViewer.prototype._trySorting = function (sortOrder, sortColumns) {
            if (!this._initialized) {
                return;
            }

            this._sortOrderIndex = sortOrder[0].index;
            this._sortOrderOrder = sortOrder[0].order;
            this._viewer.updateAllocationList(this._viewer.masterGridViewer.selectedRowTreePath);
        };
        return NativeHeapAllocationListViewer;
    })(MemoryProfiler.HeapGridViewer);
    MemoryProfiler.NativeHeapAllocationListViewer = NativeHeapAllocationListViewer;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=NativeHeapAllocationListViewer.js.map

// NativeHeapPublishedObjectAdaptor.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var NativeHeapPublishedObjectAdaptor = (function () {
        function NativeHeapPublishedObjectAdaptor(viewer) {
            this._aggregateByTop = "caller";
            this._aggregateByBottom = "callee";
            this._viewer = viewer;
            this.initializePublishedObjectAdaptor();
        }
        NativeHeapPublishedObjectAdaptor.prototype.initializePublishedObjectAdaptor = function () {
            if (this._dwiPrmoise == undefined) {
                this._dwiPrmoise = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse();
            }
        };

        NativeHeapPublishedObjectAdaptor.prototype.createSummaryRowFromData = function (realRow) {
            return new SummaryRow(realRow.identifier, realRow.outstandingCount, realRow.outstandingSize, realRow.totalSize, realRow.totalCount, realRow.outstandingSizeDiff, realRow.totalSizeDiff, realRow.outstandingCountDiff, realRow.totalCountDiff, realRow.childCount, realRow.key);
        };

        NativeHeapPublishedObjectAdaptor.prototype.createAllocationRowFromData = function (realRow) {
            if (realRow.identifier === undefined) {
                return new AllocationInfo(realRow, null, null, 0);
            }
            return new AllocationInfo(realRow.identifier, realRow.address, realRow.size, realRow.childCount);
        };

        NativeHeapPublishedObjectAdaptor.prototype.getFilterStringList = function (params) {
            var request = {
                "fn": "find",
                "jmc": this._viewer.justMyCode ? "true" : "false",
                "aggDirection": this._viewer.isAggregateByTop ? this._aggregateByTop : this._aggregateByBottom,
                "transient": this._viewer.shouldShowTransientBytes ? "true" : "false",
                "findString": this._viewer.findString,
                "sort": this._viewer.masterGridSortColumnIndex,
                "sortDirection": this._viewer.masterGridSortColumnOrder
            };

            var ctxData = {
                timeDomain: this._viewer.detailsViewModel.targetTimespan,
                customDomain: request
            };

            return this._dwiPrmoise.then(function (dwi) {
                return dwi.getFilteredData(ctxData, MemoryProfiler.Constants.MEMORY_ANALYZER_CLASS_ID);
            }).then(function (result) {
                return result;
            });
        };

        NativeHeapPublishedObjectAdaptor.prototype.getNativeHeapTopView = function (params) {
            var _this = this;
            var stack = this.getCallStack(params, false);
            var timespan = this._viewer.detailsViewModel.targetTimespan;
            var request = {
                "fn": this._viewer.isAggregateByTop ? this._aggregateByTop : this._aggregateByBottom,
                "jmc": this._viewer.justMyCode ? "true" : "false",
                "transient": this._viewer.shouldShowTransientBytes ? "true" : "false",
                "sort": this._viewer.masterGridSortColumnIndex,
                "sortDirection": this._viewer.masterGridSortColumnOrder,
                "path": JSON.stringify(stack)
            };
            var ctxData = {
                timeDomain: timespan,
                customDomain: request
            };

            var summaryRows = [];
            var result;
            return this._dwiPrmoise.then(function (dwi) {
                return dwi.getFilteredData(ctxData, MemoryProfiler.Constants.MEMORY_ANALYZER_CLASS_ID);
            }).then(function (theResult) {
                result = theResult;
                var _startIndex = _this.getStartIndex(params);
                if (_startIndex.path) {
                    _startIndex = _startIndex.last();
                }
                var newRequest = {
                    "startIndex": _startIndex,
                    "cacheLength": Math.max(params.length, 1)
                };
                return result.getResult(newRequest);
            }, function (value) {
            }, MemoryProfiler.Common.SymbolProcessor.Create(this._dwiPrmoise)).then(function (realResult) {
                result.dispose();
                if (realResult) {
                    for (var i = 0; i < realResult.length; i++) {
                        summaryRows.push(_this.createSummaryRowFromData(realResult[i]));
                    }
                    return summaryRows;
                }
            });
        };

        NativeHeapPublishedObjectAdaptor.prototype.getStartIndex = function (params) {
            if (params && params[0]) {
                var i = 0;
                while (params[0][i] !== undefined) {
                    i++;
                }
                if (i > 0) {
                    return params[0][i - 1];
                }
                return params[0];
            }
            return 0;
        };

        NativeHeapPublishedObjectAdaptor.prototype.getCallStack = function (params, includeTopId) {
            var x = [];
            if (params && this._viewer.masterGridViewer) {
                if (params.length > 0 && params[0].length > 0 && params[0][0] == 0 && params[0].length == 2) {
                    x.push("0");
                    return x;
                }
                if (params.length > 0) {
                    var targetStack = [];
                    var targetParams = null;
                    if (params[0].path) {
                        targetParams = params[0].path;
                    } else if (params[0].length > 1) {
                        targetParams = params[0];
                    } else {
                        targetParams = params;
                    }
                    var end = includeTopId ? targetParams.length : targetParams.length - 1;

                    for (var i = 0; i < end; i++) {
                        targetStack[i] = targetParams[i];
                        var path = new TreeGridCommon.Controls.DynamicGrid.TreePath(targetStack);
                        this._viewer.masterGridViewer.getValue(path, function (value, needupdate) {
                            if (value) {
                                x.push(value.Key);
                            }
                        });
                    }
                }
            }
            return x;
        };

        NativeHeapPublishedObjectAdaptor.prototype.getAllocationInfoResult = function (currentCallStack) {
            if (currentCallStack === undefined || currentCallStack == null || currentCallStack.length == 0) {
                return Plugin.Promise.wrap(null);
            }

            var timespan = this._viewer.detailsViewModel.targetTimespan;
            var request = {
                timeDomain: timespan,
                customDomain: {
                    "fn": "allocations",
                    "aggDirection": this._viewer.isAggregateByTop ? this._aggregateByTop : this._aggregateByBottom,
                    "sort": this._viewer.allocationListViewer.sortOrderIndex,
                    "sortDirection": this._viewer.allocationListViewer.sortOrderOrder,
                    "jmc": this._viewer.detailsViewModel.justMyCodeNative ? "true" : "false",
                    "transient": this._viewer.shouldShowTransientBytes ? "true" : "false",
                    "path": JSON.stringify(currentCallStack)
                }
            };

            return this._dwiPrmoise.then(function (dwi) {
                return dwi.getFilteredData(request, MemoryProfiler.Constants.MEMORY_ANALYZER_CLASS_ID);
            });
        };

        NativeHeapPublishedObjectAdaptor.prototype.getAllocationList = function (params) {
            var _this = this;
            var allocationInfoRows = [];
            if (this._allocationInfoResultPromise === undefined) {
                return new Plugin.Promise(function (completed) {
                    completed(allocationInfoRows);
                });
            }
            return this._allocationInfoResultPromise.then(function (result) {
                var _startIndex = _this.getStartIndex(params);
                if (params && params[0] && params[0].length > 1) {
                    return result.getResult({
                        "fn": "stack",
                        "startIndex": _startIndex,
                        "cacheLength": Math.max(params.length, 1),
                        "index": params[0][0]
                    });
                }
                return result.getResult({
                    "fn": "top",
                    "startIndex": _startIndex,
                    "cacheLength": Math.max(params.length, 1)
                });
            }).then(function (realResult) {
                if (realResult) {
                    for (var i = 0; i < realResult.length; i++) {
                        allocationInfoRows.push(_this.createAllocationRowFromData(realResult[i]));
                    }
                }
                return allocationInfoRows;
            });
        };

        NativeHeapPublishedObjectAdaptor.prototype.getAllocationListCount = function () {
            var _this = this;
            return this._viewer.masterGridViewer.getSelectedRowAllocationCount().then(function (result) {
                if (_this._viewer.allocationListViewer) {
                    _this._viewer.allocationListViewer.allocationListCount = +result;
                }

                return +result;
            });
        };

        NativeHeapPublishedObjectAdaptor.prototype._call = function (func, params) {
            switch (func) {
                case "NativeHeapTopViewDataSourceCount":
                    return new Plugin.Promise(function (completed) {
                        completed(1);
                    });
                case "NativeHeapTopViewDataSource":
                    return this.getNativeHeapTopView(params);
                case "AllocationList":
                    return this.getAllocationList(params);
                case "AllocationListCount":
                    return this.getAllocationListCount();
                case "MemoryLeaksTopViewDataSource":
                    return this.getMemoryLeaksTopView(params);
                case "MemoryLeaksTopViewDataSourceCount":
                    return this.getMemoryLeaksCount();
                case "FindString":
                    return this.getFilterStringList(params);
                default:
                    return Plugin.Promise.as(null);
            }
        };

        NativeHeapPublishedObjectAdaptor.prototype.updateAllocationListDataSource = function (selectedRowPath) {
            var allocationListCurrentCallStack = this.getCallStack(selectedRowPath.path, true);
            if (this._allocationInfoResultPromise) {
                this._allocationInfoResultPromise.then(function (result) {
                    result.dispose();
                });
            }
            this._allocationInfoResultPromise = this.getAllocationInfoResult(allocationListCurrentCallStack);
        };

        NativeHeapPublishedObjectAdaptor.prototype.getMemoryLeaksCount = function () {
            return new Plugin.Promise(function () {
            });
        };

        NativeHeapPublishedObjectAdaptor.prototype.getMemoryLeaksTopView = function (params) {
            return new Plugin.Promise(function () {
            });
        };
        return NativeHeapPublishedObjectAdaptor;
    })();
    MemoryProfiler.NativeHeapPublishedObjectAdaptor = NativeHeapPublishedObjectAdaptor;

    var Navigable = (function () {
        function Navigable(id) {
            this.FileName = id.sourceFileName;
            this.LineNumber = id.sourceLineNumber;
        }
        return Navigable;
    })();
    MemoryProfiler.Navigable = Navigable;

    var AllocationInfo = (function (_super) {
        __extends(AllocationInfo, _super);
        function AllocationInfo(identifier, allocationString, size, childCount) {
            _super.call(this, identifier);
            this.Address = allocationString;
            this.Size = size;
            this.Identifier = identifier.functionName;
            this.Module = identifier.imageName;
            this.SubItemsCount = +childCount;
        }
        return AllocationInfo;
    })(Navigable);
    MemoryProfiler.AllocationInfo = AllocationInfo;

    var SummaryRow = (function (_super) {
        __extends(SummaryRow, _super);
        function SummaryRow(id, oc, os, ts, tc, osd, tsd, ocd, tcd, sic, key) {
            _super.call(this, id);
            this.Module = id.imageName;
            this.Id = id.functionName;
            this.LongId = id.functionName;
            this.OutstandingCount = oc;
            this.OutstandingSize = os;
            this.TotalSize = ts;
            this.TotalCount = tc;
            this.OutstandingSizeDiff = osd;
            this.TotalSizeDiff = tsd;
            this.OutstandingCountDiff = ocd;
            this.TotalCountDiff = tcd;
            this.SubItemsCount = +sic;
            this.Key = key;
        }
        return SummaryRow;
    })(Navigable);
    MemoryProfiler.SummaryRow = SummaryRow;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=NativeHeapPublishedObjectAdaptor.js.map

// NativeHeapGridViewer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var NativeHeapGridViewer = (function (_super) {
        __extends(NativeHeapGridViewer, _super);
        function NativeHeapGridViewer(root, nativeHeapViewer, dataArray, gridContextMenu, columns) {
            var _this = this;
            this._nativeHeapViewer = nativeHeapViewer;
            this._selectedRowIndex = -1;
            this._dataArray = dataArray;

            var options = new TreeGridCommon.Controls.DynamicGrid.DynamicGridViewerOptions(gridContextMenu, null, columns, null, null, true);
            columns[0].getCellContents = function (rowInfo, treePath, expandedState, level, column, indentIndex, columnOrder) {
                var ret = _this._drawCell(rowInfo, treePath, expandedState, level, column, indentIndex, columnOrder);

                var row = null;
                _this._dataArray.get(treePath.path, function (value, needUpdate) {
                    row = value;
                });
                var tooltip = _super.prototype.translateColumn.call(_this, row, "LongId");
                tooltip = MemoryProfiler.ManagedHeapGridViewerBase.chunkTooltipString(tooltip);
                MemoryProfiler.ManagedHeapGridViewerBase.setTooltip(ret, tooltip);
                return ret;
            };
            columns[0].alwaysEnableTooltip = true;

            options.overflowColumn = true;
            _super.call(this, dataArray, root, options);
        }
        Object.defineProperty(NativeHeapGridViewer.prototype, "waitingForUpdate", {
            get: function () {
                return this.IsWaitingForUpdate();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapGridViewer.prototype, "selectedRowTreePath", {
            get: function () {
                return this.findPathByRow(this._selectedRowIndex);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(NativeHeapGridViewer.prototype, "viewer", {
            get: function () {
                return this._nativeHeapViewer;
            },
            enumerable: true,
            configurable: true
        });

        NativeHeapGridViewer.prototype.getSelectedRowAllocationCount = function () {
            var _this = this;
            return new Plugin.Promise(function (completed) {
                if (_this._selectedRowIndex === -1) {
                    completed(0);
                } else {
                    _this.getValue(_this.selectedRowTreePath, function (value, needUpdate) {
                        if (_this._nativeHeapViewer.shouldShowTransientBytes) {
                            completed(value.TotalCount);
                        } else {
                            completed(value.OutstandingCount);
                        }
                    });
                }
            });
        };

        NativeHeapGridViewer.prototype.layout = function () {
            _super.prototype.layout.call(this);
            if (!this.waitingForUpdate) {
                if (this.getExpandedCount() > 0) {
                    this._nativeHeapViewer.onGridReady();
                }
            }
        };

        NativeHeapGridViewer.prototype.moveToRow = function (path) {
            if (this.getExpandedPaths()) {
                path.externalPath = true;
                var index = this.findRowIndexByTreePath(path);
                this.setSelectedRowIndex(index);
                this.getSelectedRowIntoViewCenter();
                this.getElement().focus();
                this._nativeHeapViewer.disableInProgressState();
            }
        };

        NativeHeapGridViewer.prototype.goToFindResult = function (treePath, localTreePath) {
            var _this = this;
            if (!localTreePath) {
                var localTreePath = new TreeGridCommon.Controls.DynamicGrid.TreePath([]);

                localTreePath.path.push(treePath.path[0]);
            }

            this._dataArray.get(localTreePath, function (row, needUpdate) {
                if (localTreePath.length() === treePath.length()) {
                    _this.moveToRow(treePath);
                    _this.scheduleUpdate();
                    return;
                }

                var expandedPaths = _this.getExpandedPaths();
                if (expandedPaths.expansionStatus(localTreePath) === -1) {
                    expandedPaths.expand(localTreePath, row.SubItemsCount);
                    _this.updateCounts(row.SubItemsCount);
                    _this.markRowDirty(localTreePath.path);
                }

                localTreePath.path.push(treePath.path[localTreePath.length()]);
                _this.goToFindResult(treePath, localTreePath);
            });
        };

        NativeHeapGridViewer.prototype._onKeyDown = function (e) {
            if (e.keyCode === 114 /* F3 */) {
                this._nativeHeapViewer.lookupString();
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            } else {
                return _super.prototype._onKeyDown.call(this, e);
            }
        };

        NativeHeapGridViewer.prototype.updateSort = function (sortProperty, sortOrder) {
            if (!sortProperty || !this.hasColumnIndex(sortProperty)) {
                sortProperty = this._nativeHeapViewer.detailsViewModel.sortPropertyNative;
                if (!sortProperty) {
                    sortProperty = "OutstandingSize";
                }

                sortOrder = "desc";
            }

            if (sortProperty === this._sortOrderIndex) {
                return;
            }

            this.onSort([new TreeGridCommon.Controls.Grid.SortOrderInfo(sortProperty, sortOrder)], []);
        };

        NativeHeapGridViewer.prototype.hasColumnIndex = function (columnIndex) {
            var result = false;
            this.getColumns().forEach(function (info) {
                if (info.index === columnIndex) {
                    result = true;
                    return;
                }
            });

            return result;
        };

        NativeHeapGridViewer.prototype.onSelectRow = function (rowIndex) {
            if (this._selectedRowIndex === rowIndex) {
                return;
            }
            this._selectedRowIndex = rowIndex;

            if (rowIndex === this.MaxRows - 1 || this.getSelectionCount() > 1 || !this.getSelectedRows().hasOwnProperty(rowIndex)) {
                this._nativeHeapViewer.allocationListViewer.showGraph(false);
            } else {
                this._nativeHeapViewer.updateAllocationList(this.findPathByRow(rowIndex));
            }
        };

        NativeHeapGridViewer.prototype.refreshAllocationListView = function () {
            this._nativeHeapViewer.refreshAllocationListView();
        };

        NativeHeapGridViewer.prototype.translateColumn = function (row, index) {
            var retval = _super.prototype.translateColumn.call(this, row, index);
            if (!row) {
                if (index === "Id") {
                    retval = Plugin.Resources.getString("LoadRowDataText");
                }
            } else {
                if (index === "OutstandingCount" || index === "OutstandingSize" || index === "TotalCount" || index === "TotalSize") {
                    if (row.Count === -1) {
                        retval = "";
                    } else {
                        if (!retval) {
                            retval = "0";
                        }
                        retval = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(parseInt(retval), true, false);
                    }
                } else if (index === "Id" || index === "Module") {
                    retval = MemoryProfiler.Common.FormattingHelpers.getNativeDigitLocaleString(retval);
                } else {
                    if (row.Count === 0 && row.TotalSize !== 0 || row.Count === -1) {
                        retval = "";
                    } else {
                        if (!retval) {
                            retval = "0";
                        }
                        if (parseInt(retval)) {
                            retval = MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(parseInt(retval), true, true);
                        }
                    }
                }
            }
            return retval;
        };

        NativeHeapGridViewer.prototype._trySorting = function (sortOrder, sortColumns) {
            this._nativeHeapViewer.enableInProgressState();
            this._nativeHeapViewer.masterGridSortColumnIndex = this._sortOrderIndex = sortOrder[0].index;
            this._nativeHeapViewer.masterGridSortColumnOrder = this._sortOrderOrder = sortOrder[0].order;
            this.refresh();
            this._nativeHeapViewer.findResultsCache = null;
            this._clearSelection();
            this.expandNode(new TreeGridCommon.Controls.DynamicGrid.TreePath([0]));
        };
        return NativeHeapGridViewer;
    })(MemoryProfiler.HeapGridViewer);
    MemoryProfiler.NativeHeapGridViewer = NativeHeapGridViewer;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=NativeHeapGridViewer.js.map

// DetailsViewTabItem.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var DetailsViewTabItem = (function (_super) {
        __extends(DetailsViewTabItem, _super);
        function DetailsViewTabItem(viewType, content) {
            _super.call(this);
            this._viewType = viewType;
            this.title = Plugin.Resources.getString(MemoryProfiler.Common.Enum.GetName(MemoryProfiler.DetailsViewType, this._viewType));
            this.tooltipString = Plugin.Resources.getString(MemoryProfiler.Common.Enum.GetName(MemoryProfiler.DetailsViewType, this._viewType) + "Tooltip");
            this.content = content;
        }
        Object.defineProperty(DetailsViewTabItem.prototype, "viewType", {
            get: function () {
                return this._viewType;
            },
            set: function (v) {
                if (this._viewType !== v) {
                    this._viewType = v;
                }
            },
            enumerable: true,
            configurable: true
        });
        return DetailsViewTabItem;
    })(MemoryProfiler.Common.Controls.TabItem);
    MemoryProfiler.DetailsViewTabItem = DetailsViewTabItem;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=DetailsViewTabItem.js.map

// DetailsView.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    (function (DetailsViewType) {
        DetailsViewType[DetailsViewType["managedHeap"] = 0] = "managedHeap";
        DetailsViewType[DetailsViewType["nativeHeap"] = 1] = "nativeHeap";
        DetailsViewType[DetailsViewType["memoryLeaks"] = 2] = "memoryLeaks";
    })(MemoryProfiler.DetailsViewType || (MemoryProfiler.DetailsViewType = {}));
    var DetailsViewType = MemoryProfiler.DetailsViewType;

    var DetailsViewController = (function () {
        function DetailsViewController(initializeView) {
            if (typeof initializeView === "undefined") { initializeView = true; }
            var _this = this;
            this.model = new DetailsViewModel();
            this.model.progressText = Plugin.Resources.getString("ProcessingSnapshot");
            if (initializeView) {
                this.view = new DetailsView(this, this.model);
            }

            MemoryProfiler.Common.MemoryProfilerViewHost.session.addViewTypeEventListener(function (args) {
                _this.setTargetView(MemoryProfiler.Common.Enum.Parse(DetailsViewType, args.viewType), args.sortProperty);
            });
        }
        DetailsViewController.prototype.loadSnapshot = function () {
            var _this = this;
            MemoryProfiler.Common.MemoryProfilerViewHost.session.addSnapshotProcessingEventListener(this.onSnapshotProcessingResult.bind(this));

            MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionInfo().done(function (sessionInfo) {
                if (sessionInfo.targetRuntime === 3 /* mixed */ || sessionInfo.targetRuntime === 2 /* managed */) {
                    MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27208 /* perfMP_ManagedDetailsViewLoadStart */, 27209 /* perfMP_ManagedDetailsViewLoadEnd */);
                }
                if (sessionInfo.targetRuntime === 3 /* mixed */ || sessionInfo.targetRuntime === 1 /* native */) {
                    MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27210 /* perfMP_NativeDetailsViewLoadStart */, 27211 /* perfMP_NativeDetailsViewLoadEnd */);
                }
            });

            MemoryProfiler.Common.MemoryProfilerViewHost.session.getSnapshotProcessingResults().then(function (result) {
                if (result) {
                    _this.onSnapshotProcessingResult(result);
                }
            });
        };

        DetailsViewController.prototype.onSnapshotProcessingResult = function (result) {
            if (result.succeeded) {
                this.onSnapshotProcessingCompleted();
            } else {
                this.onSnapshotProcessingFailed(new Error(Plugin.Resources.getString("ManagedSnapshotError")));
            }
        };

        DetailsViewController.prototype.setTargetView = function (targetView, sortProperty) {
            if (targetView === 0 /* managedHeap */) {
                this.model.sortPropertyManaged = sortProperty;
            } else if (targetView === 1 /* nativeHeap */) {
                this.model.sortPropertyNative = sortProperty;
            }

            this.model.targetView = targetView;
        };

        DetailsViewController.prototype.onSnapshotProcessingCompleted = function () {
            this.model.processingComplete = true;
        };

        DetailsViewController.prototype.onSnapshotProcessingFailed = function (error) {
            if (!error) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1013"));
            }

            this.model.latestSnapshotError = error;
        };

        DetailsViewController.prototype.onSnapshotProgress = function (progressMessage) {
            this.model.progressText = progressMessage;
        };

        Object.defineProperty(DetailsViewController.prototype, "activeViewer", {
            get: function () {
                return this.view.currentTabItem.content;
            },
            enumerable: true,
            configurable: true
        });
        return DetailsViewController;
    })();
    MemoryProfiler.DetailsViewController = DetailsViewController;

    var DetailsViewModel = (function (_super) {
        __extends(DetailsViewModel, _super);
        function DetailsViewModel() {
            _super.call(this);
            this._managedFilterString = "";
            this._nativeFilterString = "";
            this._latestSnapshotError = null;
            this._nativeHeapAggregationType = 1 /* bottom */;
            this._memoryLeaksAggregationType = 0 /* top */;
        }
        Object.defineProperty(DetailsViewModel.prototype, "isNativeHeapViewerAllocationListVisible", {
            get: function () {
                return this._isNativeHeapViewerAllocationListVisible;
            },
            set: function (v) {
                this._isNativeHeapViewerAllocationListVisible = v;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "isManagedHeapViewerRefGraphVisible", {
            get: function () {
                return this._isManagedHeapViewerRefGraphVisible;
            },
            set: function (v) {
                this._isManagedHeapViewerRefGraphVisible = v;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "shouldAddLeaksTab", {
            get: function () {
                return this._shouldAddLeaksTab;
            },
            set: function (v) {
                this._shouldAddLeaksTab = v;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "isDiffView", {
            get: function () {
                return !(this.targetTimespan.begin.equals(Microsoft.VisualStudio.DiagnosticsHub.BigNumber.zero));
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "targetTimespan", {
            get: function () {
                return this._targetTimespan;
            },
            set: function (value) {
                this._targetTimespan = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "targetRuntime", {
            get: function () {
                return this._targetRuntime;
            },
            set: function (value) {
                this._targetRuntime = value;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "collapseSmallObjects", {
            get: function () {
                return this._collapseSmallObjects;
            },
            set: function (v) {
                if (this._collapseSmallObjects !== v) {
                    this._collapseSmallObjects = v;
                    this.LogCollapseSmallObjectsCommand(v, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(this._targetView));
                    this.raisePropertyChanged("collapseSmallObjects");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "justMyCodeManaged", {
            get: function () {
                return this._justMyCodeManaged;
            },
            set: function (v) {
                if (this._justMyCodeManaged !== v) {
                    this._justMyCodeManaged = v;
                    this.LogJustMyCodeCommand(v, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(this._targetView));
                    this.raisePropertyChanged("justMyCodeManaged");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "justMyCodeNative", {
            get: function () {
                return this._justMyCodeNative;
            },
            set: function (v) {
                if (this._justMyCodeNative !== v) {
                    this._justMyCodeNative = v;
                    this.LogJustMyCodeCommand(v, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(this._targetView));
                    this.raisePropertyChanged("justMyCodeNative");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "justMyCodeLeaks", {
            get: function () {
                return this._justMyCodeLeaks;
            },
            set: function (v) {
                if (this._justMyCodeLeaks !== v) {
                    this._justMyCodeLeaks = v;
                    this.LogJustMyCodeCommand(v, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(this._targetView));
                    this.raisePropertyChanged("justMyCodeLeaks");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "showTransientBytes", {
            get: function () {
                return this._showTransientBytes;
            },
            set: function (v) {
                if (this._showTransientBytes !== v) {
                    this.LogShowTransientBytes(v, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(this._targetView));
                    this._showTransientBytes = v;
                    this.raisePropertyChanged("showTransientBytes");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "nativeHeapAllocationsAggregationType", {
            get: function () {
                return this._nativeHeapAggregationType;
            },
            set: function (v) {
                if (this._nativeHeapAggregationType !== v) {
                    this._nativeHeapAggregationType = v;
                    this.LogNativeHeapAllocationsAggregationType(v, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(this._targetView));
                    this.raisePropertyChanged("nativeHeapAllocationsAggregationType");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "memoryLeaksAllocationsAggregationType", {
            get: function () {
                return this._memoryLeaksAggregationType;
            },
            set: function (v) {
                if (this._memoryLeaksAggregationType !== v) {
                    this._memoryLeaksAggregationType = v;
                    this.LogNativeHeapAllocationsAggregationType(v, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(this._targetView));
                    this.raisePropertyChanged("memoryLeaksAllocationsAggregationType");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "managedFilterString", {
            get: function () {
                return this._managedFilterString;
            },
            set: function (v) {
                if (this._managedFilterString !== v) {
                    this._managedFilterString = v;
                    this.LogSearchHeapViewCommand(MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType(this._targetView));
                    this.raisePropertyChanged("managedFilterString");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "nativeFilterString", {
            get: function () {
                return this._nativeFilterString;
            },
            set: function (v) {
                this._nativeFilterString = v;
                this.raisePropertyChanged("nativeFilterString");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "latestSnapshotError", {
            get: function () {
                return this._latestSnapshotError;
            },
            set: function (v) {
                if (this._latestSnapshotError !== v) {
                    this._latestSnapshotError = v;
                    this.raisePropertyChanged("latestSnapshotError");

                    MemoryProfiler.Common.MemoryProfilerViewHost.reportError(v, "SnapshotProcessingFailure");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "progressText", {
            get: function () {
                return this._progressText;
            },
            set: function (v) {
                if (this._progressText !== v) {
                    this._progressText = v;
                    this.raisePropertyChanged("progressText");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "progressValue", {
            get: function () {
                return this._progressValue;
            },
            set: function (v) {
                if (this._progressValue !== v) {
                    this._progressValue = v;
                    this.raisePropertyChanged("progressValue");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "sortPropertyManaged", {
            get: function () {
                return this._sortPropertyManaged;
            },
            set: function (v) {
                this._sortPropertyManaged = v;

                this.raisePropertyChanged("sortPropertyManaged");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "sortPropertyNative", {
            get: function () {
                return this._sortPropertyNative;
            },
            set: function (v) {
                this._sortPropertyNative = v;

                this.raisePropertyChanged("sortPropertyNative");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "processingComplete", {
            get: function () {
                return this._processingComplete;
            },
            set: function (v) {
                this._processingComplete = v;

                this.raisePropertyChanged("processingComplete");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "targetView", {
            get: function () {
                return this._targetView;
            },
            set: function (v) {
                if (this._targetView !== v) {
                    this._targetView = v;
                    this.LogDefaultUserSettingsForTargetView();
                    this.raisePropertyChanged("targetView");
                }
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "detailsViewReady", {
            get: function () {
                return this._detailsViewReady;
            },
            set: function (v) {
                this._detailsViewReady = v;

                this.raisePropertyChanged("detailsViewReady");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(DetailsViewModel.prototype, "viewSettingsInitialized", {
            get: function () {
                return this._viewSettingsInitialized;
            },
            set: function (v) {
                this._viewSettingsInitialized = v;
            },
            enumerable: true,
            configurable: true
        });

        DetailsViewModel.prototype.LogDefaultUserSettingsForTargetView = function () {
            switch (this._targetView) {
                case 0 /* managedHeap */:
                    if (this._defaultUserSettingsForManagedHeapViewLogged)
                        break;
                    this._defaultUserSettingsForManagedHeapViewLogged = true;
                    this.LogJustMyCodeCommand(this.justMyCodeManaged, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Default, MemoryProfiler.Common.FeedbackCommandSourceNames.ManagedHeapView);
                    this.LogCollapseSmallObjectsCommand(this.collapseSmallObjects, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Default, MemoryProfiler.Common.FeedbackCommandSourceNames.ManagedHeapView);
                    break;
                case 1 /* nativeHeap */:
                    if (this._defaultUserSettingsForNativeHeapViewLogged)
                        break;
                    this._defaultUserSettingsForNativeHeapViewLogged = true;
                    this.LogJustMyCodeCommand(this.justMyCodeNative, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Default, MemoryProfiler.Common.FeedbackCommandSourceNames.NativeHeapView);
                    this.LogNativeHeapAllocationsAggregationType(this.nativeHeapAllocationsAggregationType, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Default, MemoryProfiler.Common.FeedbackCommandSourceNames.NativeHeapView);
                    this.LogShowTransientBytes(this.showTransientBytes, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Default, MemoryProfiler.Common.FeedbackCommandSourceNames.NativeHeapView);
                    break;
                case 2 /* memoryLeaks */:
                    if (this._defaultUserSettingsForMemoryLeaksViewLogged)
                        break;
                    this._defaultUserSettingsForMemoryLeaksViewLogged = true;
                    this.LogJustMyCodeCommand(this.justMyCodeLeaks, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Default, MemoryProfiler.Common.FeedbackCommandSourceNames.MemoryLeaksView);
                    this.LogNativeHeapAllocationsAggregationType(this.memoryLeaksAllocationsAggregationType, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Default, MemoryProfiler.Common.FeedbackCommandSourceNames.MemoryLeaksView);
                    break;
                default:
                    break;
            }
        };

        DetailsViewModel.prototype.LogSearchHeapViewCommand = function (invokeMethodName, commandSourceName) {
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.SearchHeapView, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, commandSourceName);
        };

        DetailsViewModel.prototype.LogCollapseSmallObjectsCommand = function (v, invokeMethodName, commandSourceName) {
            if (!this.viewSettingsInitialized)
                return;
            var feedbackCommandName;
            if (v) {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.EnableCollapseSmallObjects;
            } else {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.DisableCollapseSmallObjects;
            }
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(feedbackCommandName, invokeMethodName, commandSourceName);
        };

        DetailsViewModel.prototype.LogJustMyCodeCommand = function (v, invokeMethodName, commandSourceName) {
            if (!this.viewSettingsInitialized)
                return;
            var feedbackCommandName;
            if (v) {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.EnableJustMyCode;
            } else {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.DisableJustMyCode;
            }
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(feedbackCommandName, invokeMethodName, commandSourceName);
        };

        DetailsViewModel.prototype.LogShowTransientBytes = function (v, invokeMethodName, commandSourceName) {
            if (!this.viewSettingsInitialized)
                return;
            var feedbackCommandName;
            if (v) {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.EnableTransientBytes;
            } else {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.DisableTransientBytes;
            }
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(feedbackCommandName, invokeMethodName, commandSourceName);
        };

        DetailsViewModel.prototype.LogNativeHeapAllocationsAggregationType = function (v, invokeMethodName, commandSourceName) {
            if (!this.viewSettingsInitialized)
                return;
            var feedbackCommandName;
            if (v === 0 /* top */) {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.SelectTopAggregation;
            } else if (v === 1 /* bottom */) {
                feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.SelectBottomAggregation;
            } else
                (feedbackCommandName = MemoryProfiler.Common.FeedbackCommandNames.Unknown);
            MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(feedbackCommandName, invokeMethodName, commandSourceName);
        };

        DetailsViewModel.FeedbackCommandSourceNameFromDetailsViewType = function (detailsViewType) {
            switch (detailsViewType) {
                case 0 /* managedHeap */:
                    return MemoryProfiler.Common.FeedbackCommandSourceNames.ManagedHeapView;
                case 1 /* nativeHeap */:
                    return MemoryProfiler.Common.FeedbackCommandSourceNames.NativeHeapView;
                case 2 /* memoryLeaks */:
                    return MemoryProfiler.Common.FeedbackCommandSourceNames.MemoryLeaksView;
                default:
                    return MemoryProfiler.Common.FeedbackCommandSourceNames.Unknown;
            }
        };
        return DetailsViewModel;
    })(MemoryProfiler.Common.Controls.ObservableViewModel);
    MemoryProfiler.DetailsViewModel = DetailsViewModel;

    var DetailsView = (function (_super) {
        __extends(DetailsView, _super);
        function DetailsView(controller, model) {
            _super.call(this, "DetailsViewTemplate");

            this._controller = controller;
            this._model = model;

            this._settingsView = new SettingsView(this._model);

            this._model.registerPropertyChanged(this);

            this._tabControlHost = new MemoryProfiler.Common.Controls.Control(this.findElement("snapshotTab"));

            this._snapshotProcessingProgressDiv = this.findElement("snapshotProcessingProgressDiv");
            this._snapshotProcessingDiv = this.findElement("snapshotProcessing");
            this._progressText = this.findElement("progressText");
            this._progressBar = this.findElement("progressBar");
            this._snapshotProcessingError = this.findElement("snapshotProcessingError");
            this._snapshotProcessingErrorMsg = this.findElement("snapshotProcessingErrorMsg");

            this.findElement("snapshotProcessingErrorLabel").innerText = Plugin.Resources.getString("ErrorWhileProcessing");

            this.uiUpdateViews();
            this.updateProgress();
        }
        Object.defineProperty(DetailsView.prototype, "currentTabItem", {
            get: function () {
                if (this._tabControl && this._tabControl.selectedItem) {
                    return this._tabControl.selectedItem;
                }

                return null;
            },
            enumerable: true,
            configurable: true
        });

        DetailsView.prototype.switchToDataView = function (viewType) {
            this._tabControl.selectedItem = this._tabControl.getTab(viewType);
        };

        DetailsView.prototype.onPropertyChanged = function (propertyName) {
            var _this = this;
            switch (propertyName) {
                case "latestSnapshotError":
                    this.updateSnapshotError();
                    break;
                case "progressText":
                case "progressValue":
                    this.updateProgress();
                    break;
                case "processingComplete":
                    this._settingsView.initializeViewSettings().done(function () {
                        _this.uiUpdateViews();
                    });
                    break;
                case "targetView":
                    this.updateTargetView();
                    break;
            }
        };

        DetailsView.prototype.forEachTab = function (action) {
            for (var i = 0; i < this._tabControl.length(); i++) {
                var tab = this._tabControl.getTab(i);
                action(tab);
            }
        };

        DetailsView.prototype.updateProgress = function () {
            if (this._model.progressText) {
                this._progressText.innerText = this._model.progressText;
            }

            if (this._model.progressValue) {
                this._progressBar.value = this._model.progressValue;
            }
        };

        DetailsView.prototype.updateTargetView = function () {
            if (this._tabControl) {
                var viewType = this._model.targetView;
                for (var i = 0; i < this._tabControl.length(); i++) {
                    var tabItem = this._tabControl.getTab(i);
                    if (tabItem.viewType === viewType) {
                        this._tabControl.selectedItem = tabItem;
                    }
                }
            }
        };

        DetailsView.prototype.updateSnapshotError = function () {
            var error = this._model.latestSnapshotError;
            if (error) {
                this._snapshotProcessingErrorMsg.innerText = MemoryProfiler.Common.ErrorFormatter.format(error);
                this.toggleProcessingUI(true, false);
            } else {
                this._snapshotProcessingErrorMsg.innerText = "";
                this.toggleProcessingUI(false, false);
            }
        };

        DetailsView.prototype.getNewTab = function (dataViewType) {
            var tabContent;

            if (dataViewType === 0 /* managedHeap */) {
                tabContent = new MemoryProfiler.ManagedHeapViewer(this._model);
            } else if (dataViewType === 1 /* nativeHeap */) {
                tabContent = new MemoryProfiler.NativeHeapViewer(this._model);
            } else if (dataViewType === 2 /* memoryLeaks */) {
                tabContent = new MemoryProfiler.MemoryLeaksViewer(this._model);
            }

            return new MemoryProfiler.DetailsViewTabItem(dataViewType, tabContent);
        };

        DetailsView.prototype.shouldCreateTabForViewType = function (viewType) {
            return (viewType === 0 /* managedHeap */ && this._model.targetRuntime !== 1 /* native */) || (viewType === 1 /* nativeHeap */ && this._model.targetRuntime !== 2 /* managed */) || (viewType === 2 /* memoryLeaks */ && this._model.shouldAddLeaksTab);
        };

        DetailsView.prototype.populateTabs = function () {
            var dataViewTypes = MemoryProfiler.Common.Enum.GetValues(DetailsViewType);
            for (var i = 0; i < dataViewTypes.length; i++) {
                var dataViewType = dataViewTypes[i];
                if (this.shouldCreateTabForViewType(dataViewType)) {
                    var tabItem = this.getNewTab(dataViewType);
                    this._tabControl.addTab(tabItem);
                }
            }
        };

        DetailsView.prototype.uiUpdateViews = function () {
            var _this = this;
            this.updateSnapshotError();

            if (this._tabControl) {
                this._tabControlHost.removeChild(this._tabControl);
            }

            if (this._model.processingComplete) {
                this._tabControlHost.rootElement.classList.remove("dataViewersHidden");
                this.toggleProcessingUI(false, false);

                this._tabControl = new MemoryProfiler.Common.Controls.TabControl();
                this._tabControl.tabsLeftAligned = true;
                this._tabControl.afterBarContainer.appendChild(this._settingsView);

                MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionStartupTime().then(function (startTime) {
                    MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionInfo().done(function (sessionInfo) {
                        var beginTime = sessionInfo.targetTimespan.Item1 > 0 ? sessionInfo.targetTimespan.Item1 - startTime : sessionInfo.targetTimespan.Item1;
                        _this._controller.model.targetTimespan = new Microsoft.VisualStudio.DiagnosticsHub.JsonTimespan(Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromNumber(beginTime), Microsoft.VisualStudio.DiagnosticsHub.BigNumber.convertFromNumber(sessionInfo.targetTimespan.Item2 - startTime));

                        _this._controller.model.targetRuntime = sessionInfo.targetRuntime;
                        _this._controller.model.shouldAddLeaksTab = sessionInfo.shouldAddLeaksTab;

                        _this.populateTabs();
                        _this._controller.setTargetView(MemoryProfiler.Common.Enum.Parse(DetailsViewType, sessionInfo.targetView), sessionInfo.sortProperty);
                        _this.updateTargetView();
                        _this._settingsView.onTabChanged();
                        _this._tabControl.selectedItemChanged = function () {
                            MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(27206 /* perfMP_ToggleManagedNativeSelectionStart */, 27207 /* perfMP_ToggleManagedNativeSelectionEnd */);
                            _this._model.targetView = _this._tabControl.selectedItem.viewType;
                            _this._settingsView.onTabChanged();
                        };
                    });
                });

                this._tabControlHost.appendChild(this._tabControl);
            } else {
                this._tabControlHost.rootElement.classList.add("dataViewersHidden");
                this.toggleProcessingUI(false, true);
            }
        };

        DetailsView.prototype.toggleProcessingUI = function (showError, showProgress) {
            if (showError || showProgress) {
                this._snapshotProcessingDiv.style.display = "block";
                this._snapshotProcessingError.style.display = showError === true ? "block" : "none";
                this._snapshotProcessingProgressDiv.style.display = showProgress === true ? "block" : "none";
            } else {
                this._snapshotProcessingDiv.style.display = "none";
            }
        };
        return DetailsView;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.DetailsView = DetailsView;

    var SettingsView = (function (_super) {
        __extends(SettingsView, _super);
        function SettingsView(model) {
            var _this = this;
            _super.call(this, "SettingsTemplate");

            this._model = model;

            this._filterInput = this.findElement("filterInput");

            this._filterInput.onkeydown = function (e) {
                _this.handleFilterKeydownEvent(e);
            };

            this._filterInput.oninput = function (e) {
                if (_this._filterInput.value === "") {
                    _this.clearCurrentFilterString();
                }
            };
        }
        Object.defineProperty(SettingsView.prototype, "initialized", {
            get: function () {
                return this._initialized;
            },
            enumerable: true,
            configurable: true
        });

        SettingsView.prototype.clearCurrentFilterString = function () {
            if (this._model.targetView === 0 /* managedHeap */) {
                this._model.managedFilterString = "";
            } else if (this._model.targetView === 1 /* nativeHeap */) {
                this._model.nativeFilterString = "";
            }
        };

        SettingsView.prototype.initializeViewSettings = function () {
            var _this = this;
            return new Plugin.Promise(function (completed) {
                MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionInfo().done(function (info) {
                    _this._model.collapseSmallObjects = info.detailsViewSettings["collapseSmallObjects"];
                    _this._model.justMyCodeManaged = info.detailsViewSettings["justMyCodeManaged"];
                    _this._model.justMyCodeNative = info.detailsViewSettings["justMyCodeNative"];

                    _this._model.showTransientBytes = info.detailsViewSettings["includeFreedAllocations"];

                    var settingsMenuButton = _this.findElement("settingsMenuButton");
                    settingsMenuButton.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("SettingsMenuButtonTooltipText"));
                    settingsMenuButton.setAttribute("aria-label", Plugin.Resources.getString("SettingsMenuButtonTooltipText"));

                    _this._settingsMenu = new MemoryProfiler.Common.Controls.MenuControl(settingsMenuButton);
                    _this._settingsMenu.addToggleItem(Plugin.Resources.getString("ViewSettingsCollapseSmallObjectsMenuItem"), _this.toggleCollapseSmallObjects.bind(_this), _this._model.collapseSmallObjects, 3);
                    _this._settingsMenu.addToggleItem(Plugin.Resources.getString("ViewSettingsJustMyCodeMenuItem"), _this.toggleJustMyCodeManaged.bind(_this), _this._model.justMyCodeManaged, 3);
                    _this._settingsMenu.addToggleItem(Plugin.Resources.getString("ViewSettingsShowTransientBytesMenuItem"), _this.toggleShowTransientBytes.bind(_this), _this._model.showTransientBytes, 3);
                    _this._settingsMenu.addToggleItem(Plugin.Resources.getString("ViewSettingsJustMyCodeMenuItem"), _this.toggleJustMyCodeNative.bind(_this), _this._model.justMyCodeNative, 3);
                    _this._settingsMenu.addToggleItem(Plugin.Resources.getString("ViewSettingsJustMyCodeMenuItem"), _this.toggleJustMyCodeLeaks.bind(_this), _this._model.justMyCodeLeaks, 3);

                    _this._model.viewSettingsInitialized = true;

                    completed();
                });
            });
        };

        SettingsView.prototype.handleFilterKeydownEvent = function (e) {
            var keyCode = e.keyCode;

            if (keyCode === 27 /* ESCAPE */) {
                this._filterInput.value = "";
                this.clearCurrentFilterString();
            }

            if (this._model.targetView === 0 /* managedHeap */ && keyCode === 13 /* ENTER */) {
                this._model.managedFilterString = this._filterInput.value;
            } else if (this._model.targetView === 1 /* nativeHeap */ && (keyCode === 13 /* ENTER */ || keyCode === 114 /* F3 */)) {
                this._model.nativeFilterString = this._filterInput.value;
                if (keyCode === 114 /* F3 */) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        };

        SettingsView.prototype.onTabChanged = function () {
            if (this._model.targetView === 0 /* managedHeap */) {
                this._settingsMenu.getMenuItem(0).classList.remove("hidden");
                this._settingsMenu.getMenuItem(1).classList.remove("hidden");
                this._settingsMenu.getMenuItem(2).classList.add("hidden");
                this._settingsMenu.getMenuItem(3).classList.add("hidden");
                this._settingsMenu.getMenuItem(4).classList.add("hidden");

                this._filterInput.value = this._model.managedFilterString;
                this._filterInput.placeholder = Plugin.Resources.getString("Filter");
                this._filterInput.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("Filter"));
                this._filterInput.setAttribute("aria-label", Plugin.Resources.getString("Filter"));
            } else if (this._model.targetView === 1 /* nativeHeap */) {
                this._settingsMenu.getMenuItem(0).classList.add("hidden");
                this._settingsMenu.getMenuItem(1).classList.add("hidden");
                this._settingsMenu.getMenuItem(2).classList.remove("hidden");
                this._settingsMenu.getMenuItem(3).classList.remove("hidden");
                this._settingsMenu.getMenuItem(4).classList.add("hidden");

                this._filterInput.value = this._model.nativeFilterString;
                this._filterInput.placeholder = Plugin.Resources.getString("Find");
                this._filterInput.setAttribute("data-plugin-vs-tooltip", Plugin.Resources.getString("Find"));
                this._filterInput.setAttribute("aria-label", Plugin.Resources.getString("Find"));
            } else if (this._model.targetView === 2 /* memoryLeaks */) {
                this._settingsMenu.getMenuItem(0).classList.add("hidden");
                this._settingsMenu.getMenuItem(1).classList.add("hidden");
                this._settingsMenu.getMenuItem(2).classList.add("hidden");
                this._settingsMenu.getMenuItem(3).classList.add("hidden");
                this._settingsMenu.getMenuItem(4).classList.remove("hidden");
            }
        };

        SettingsView.prototype.toggleCollapseSmallObjects = function () {
            this._model.collapseSmallObjects = !this._model.collapseSmallObjects;
            return this._model.collapseSmallObjects;
        };

        SettingsView.prototype.toggleJustMyCodeManaged = function () {
            this._model.justMyCodeManaged = !this._model.justMyCodeManaged;
            return this._model.justMyCodeManaged;
        };

        SettingsView.prototype.toggleJustMyCodeNative = function () {
            this._model.justMyCodeNative = !this._model.justMyCodeNative;
            return this._model.justMyCodeNative;
        };

        SettingsView.prototype.toggleJustMyCodeLeaks = function () {
            this._model.justMyCodeLeaks = !this._model.justMyCodeLeaks;
            return this._model.justMyCodeLeaks;
        };

        SettingsView.prototype.toggleShowTransientBytes = function () {
            this._model.showTransientBytes = !this._model.showTransientBytes;
            return this._model.showTransientBytes;
        };
        return SettingsView;
    })(MemoryProfiler.Common.Controls.TemplateControl);
    MemoryProfiler.SettingsView = SettingsView;

    
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=DetailsView.js.map

// DetailsViewHost.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var DetailsViewHost = (function (_super) {
        __extends(DetailsViewHost, _super);
        function DetailsViewHost() {
            _super.call(this);
        }
        DetailsViewHost.prototype.initializeView = function (sessionInfo) {
            this.detailsViewController = new MemoryProfiler.DetailsViewController();
            document.getElementById('mainContainer').appendChild(this.detailsViewController.view.rootElement);

            this.detailsViewController.loadSnapshot();
        };
        return DetailsViewHost;
    })(MemoryProfiler.Common.MemoryProfilerViewHostBase);
    MemoryProfiler.DetailsViewHost = DetailsViewHost;

    MemoryProfiler.DetailsViewHostInstance = new DetailsViewHost();
})(MemoryProfiler || (MemoryProfiler = {}));

MemoryProfiler.DetailsViewHostInstance.loadView();
//# sourceMappingURL=DetailsViewHost.js.map

// MultiRowsCopyHelper.ts
var MemoryProfiler;
(function (MemoryProfiler) {
    var MultiRowsCopyHelper = (function () {
        function MultiRowsCopyHelper(grid) {
            this._grid = grid;
        }
        MultiRowsCopyHelper.prototype.initialize = function () {
            MemoryProfiler.HeapGridViewer.dataForClipboard = null;
            this._unloadedDataIndices = [];
            this._data = "";
            this._shallowestSelectedDepth = Number.MAX_VALUE;
            this._selectedDataIndicies = this._grid.getSelectedDataIndices();
            this._copiedRowsIterator = 0;
            this._prevRowIndex = null;

            var dataIndex;
            for (var p = 0; p < this._selectedDataIndicies.length; p++) {
                dataIndex = this._selectedDataIndicies[p];
                this._shallowestSelectedDepth = Math.min(dataIndex.length(), this._shallowestSelectedDepth);
                if (!this._grid._dataArray.isCached(dataIndex.path)) {
                    this._unloadedDataIndices.push(p);
                }
            }
        };

        MultiRowsCopyHelper.prototype.cacheSelectedRows = function () {
            var _this = this;
            this.initialize();

            return new Plugin.Promise(function (completed) {
                if (_this._unloadedDataIndices.length > 0) {
                    _this.blockViewer();
                    _this._grid._dataArray.toggleManualGarbageCollection(true);
                }

                var finalizer = function () {
                    while (this._copiedRowsIterator < this._selectedDataIndicies.length) {
                        this.addRowDataToGlobalSelection(this._selectedDataIndicies[this._copiedRowsIterator++]);
                    }

                    MemoryProfiler.HeapGridViewer.dataForClipboard = this.getColumnHeaderString(this._grid.options()) + this._data;

                    this._grid._dataArray.toggleManualGarbageCollection(false);

                    delete this._data;
                    delete this._unloadedDataIndices;

                    this.unblockViewer();
                    completed();
                }.bind(_this);

                _this.getSelectedRowsContents(finalizer);
            });
        };

        MultiRowsCopyHelper.prototype.getSelectedRowsContents = function (finalizer, index) {
            if (index === undefined) {
                index = 0;
            }

            var subArray = [];
            var end = Math.min(index + MultiRowsCopyHelper.MaxOneTimeCachableDataLength, this._unloadedDataIndices.length);

            if (end === 0) {
                return finalizer();
            }

            for (var k = index; k < end; k++) {
                subArray.push(this._selectedDataIndicies[this._unloadedDataIndices[k]].path);
            }

            this._grid._dataArray.cache(subArray, function (needUpdate) {
                var dataIndex;
                while (dataIndex !== this._selectedDataIndicies[this._unloadedDataIndices[end - 1]]) {
                    dataIndex = this._selectedDataIndicies[this._copiedRowsIterator++];
                    this.addRowDataToGlobalSelection(dataIndex);
                }

                if (this._unloadedDataIndices.length === 0 || index + MultiRowsCopyHelper.MaxOneTimeCachableDataLength > this._unloadedDataIndices.length) {
                    finalizer();
                } else {
                    return this.getSelectedRowsContents(finalizer, index + MultiRowsCopyHelper.MaxOneTimeCachableDataLength);
                }
            }.bind(this));
        };

        MultiRowsCopyHelper.prototype.addRowDataToGlobalSelection = function (dataIndex) {
            var rowText = this._grid.getRowTextString(dataIndex);

            var expandState = this._grid._getExpandState(dataIndex);
            if (expandState < 0) {
                rowText = " + " + rowText;
            } else if (expandState > 0) {
                rowText = " - " + rowText;
            } else {
                rowText = "   " + rowText;
            }

            var leftShift = "";
            for (var j = 0; j <= dataIndex.length(); j++) {
                if (j > this._shallowestSelectedDepth) {
                    leftShift += "  ";
                }
            }

            var currentRowIndex = this._grid.findRowIndexByTreePath(dataIndex);
            if (this._prevRowIndex !== null && Math.abs(this._prevRowIndex - currentRowIndex) !== 1) {
                rowText = "[...]\r\n" + rowText;
            }

            this._data += "\r\n" + leftShift + rowText;

            this._prevRowIndex = currentRowIndex;
        };

        MultiRowsCopyHelper.prototype.getColumnHeaderString = function (options) {
            var columnHeaderString = "";
            options.columns.forEach(function (column) {
                columnHeaderString += column.text + "\t";
            });

            return columnHeaderString;
        };

        MultiRowsCopyHelper.prototype.blockViewer = function () {
            if (this._grid.viewer) {
                this._grid.viewer.enableInProgressState();
            }
        };

        MultiRowsCopyHelper.prototype.unblockViewer = function () {
            if (this._grid.viewer && this._grid.viewer.isViewDisabled()) {
                this._grid.viewer.disableInProgressState();
            }
        };
        MultiRowsCopyHelper.MaxOneTimeCachableDataLength = 3500;
        return MultiRowsCopyHelper;
    })();
    MemoryProfiler.MultiRowsCopyHelper = MultiRowsCopyHelper;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=MultiRowsCopyHelper.js.map

// MemoryLeaksViewer.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MemoryProfiler;
(function (MemoryProfiler) {
    "use strict";

    var MemoryLeaksViewer = (function (_super) {
        __extends(MemoryLeaksViewer, _super);
        function MemoryLeaksViewer(model) {
            _super.call(this, model);
        }
        Object.defineProperty(MemoryLeaksViewer.prototype, "feedbackSourceName", {
            get: function () {
                return MemoryProfiler.Common.FeedbackCommandSourceNames.MemoryLeaksView;
            },
            enumerable: true,
            configurable: true
        });

        MemoryLeaksViewer.prototype.onPropertyChanged = function (propertyName) {
            switch (propertyName) {
                case "justMyCodeLeaks":
                    this.toggleJustMyCodeAsync();
                    break;
                case "memoryLeaksAllocationsAggregationType":
                    this.toggleAllocationsAggregationType();
                    break;
                case "targetView":
                    if (this.detailsViewModel.targetView === 2 /* memoryLeaks */ && !this._openedInDetailsTab) {
                        this._openedInDetailsTab = true;
                        this.refreshUIAsync();
                    }
                    break;

                case "nativeFilterString":
                    break;
            }
        };

        MemoryLeaksViewer.prototype.createAggregationDirectionToggle = function () {
            var _this = this;
            return new MemoryProfiler.AggregationDirectionToggle(this.detailsViewModel, function () {
                return _this.detailsViewModel.memoryLeaksAllocationsAggregationType;
            }, function (v) {
                _this.detailsViewModel.memoryLeaksAllocationsAggregationType = v;
            }, "memoryLeaksAllocationsAggregationType");
        };

        MemoryLeaksViewer.prototype.getMasterGridDataSourceName = function () {
            return "NativeHeapTopViewDataSource";
        };

        MemoryLeaksViewer.prototype.toggleAllocationsAggregationType = function () {
            this._isAggregateByTop = this.detailsViewModel.memoryLeaksAllocationsAggregationType === 0 /* top */;
            this.refreshUIAsync();
        };

        MemoryLeaksViewer.prototype.updateColumnConfiguration = function () {
            this._nativeHeapViewColumns = [
                new TreeGridCommon.Controls.Grid.ColumnInfo("Id", Plugin.Resources.getString("Identifier"), Plugin.Resources.getString("IdentifierTooltip"), MemoryProfiler.NativeHeapViewer.IDENTIFIER_COLUMN_WIDTH, true),
                new TreeGridCommon.Controls.Grid.ColumnInfo("OutstandingCount", Plugin.Resources.getString("Count"), Plugin.Resources.getString("MemoryLeaksCountTooltip"), MemoryProfiler.NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc"),
                new TreeGridCommon.Controls.Grid.ColumnInfo("OutstandingSize", Plugin.Resources.getString("Size"), Plugin.Resources.getString("MemoryLeaksSizeTooltip"), MemoryProfiler.NativeHeapViewer.NUMERIC_COLUMN_WIDTH, true, null, function () {
                    return "rightAlignedColumn";
                }, null, "desc")
            ];
        };
        return MemoryLeaksViewer;
    })(MemoryProfiler.NativeHeapViewer);
    MemoryProfiler.MemoryLeaksViewer = MemoryLeaksViewer;
})(MemoryProfiler || (MemoryProfiler = {}));
//# sourceMappingURL=MemoryLeaksViewer.js.map


// SIG // Begin signature block
// SIG // MIIasQYJKoZIhvcNAQcCoIIaojCCGp4CAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFGhA8cR1NYqk
// SIG // 6PmuT5kyBZXvPpSdoIIVgjCCBMMwggOroAMCAQICEzMA
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
// SIG // BgEEAYI3AgEVMCMGCSqGSIb3DQEJBDEWBBRZ3/iB1AXX
// SIG // Bl6SQb37r5jm3Py7ozBUBgorBgEEAYI3AgEMMUYwRKAq
// SIG // gCgARABlAHQAYQBpAGwAcwBWAGkAZQB3AE0AZQByAGcA
// SIG // ZQBkAC4AagBzoRaAFGh0dHA6Ly9taWNyb3NvZnQuY29t
// SIG // MA0GCSqGSIb3DQEBAQUABIIBAGUEABIOWipoc57D4Ade
// SIG // d+rECiceH4sKfdq5MasA3xrKKwG0uFVhdnW/YTMKJpJN
// SIG // on/N9+z/ymPYDg2oAP1IDiZxdLcWmFThp7H0TuB9mJEx
// SIG // Injy2KyifqqS6DBnL87QCCBFlpUrRLX+ge1TsQgq+ib1
// SIG // p4tmZiavgtodSVCL4E8z3JiQG5RViMSSLlioD7NLNtCg
// SIG // VleoVQeRrPtSMbCiJf50kZ+HU0iSx3CY0O3FdLAssyje
// SIG // dYZtKhQxsi+60TEkysBxhi3/5+nC3P5lLsGNIoP6SDRi
// SIG // UAn8HHYs22cL8efy0eih46b67eXMHySmEMTJpUQfhCjF
// SIG // HkP4aq23F/UHQuihggIoMIICJAYJKoZIhvcNAQkGMYIC
// SIG // FTCCAhECAQEwgY4wdzELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEh
// SIG // MB8GA1UEAxMYTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENB
// SIG // AhMzAAAAcbMuimuCqh9OAAAAAABxMAkGBSsOAwIaBQCg
// SIG // XTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqG
// SIG // SIb3DQEJBTEPFw0xNTA2MjkwNDMzNTRaMCMGCSqGSIb3
// SIG // DQEJBDEWBBR5h/V5ll+WMrmXuqKiX9W+WeNCxzANBgkq
// SIG // hkiG9w0BAQUFAASCAQCfxuA18isy02VlQpQhu7U6ap5W
// SIG // jvdPaMhY1+vK/ZljqG9mYYCN7K6a8lqqIzgKey2IHRtH
// SIG // DzW7xtfCAK9AaiQvEHoTRX0PQT/D/iVJsGULyK2QhQOh
// SIG // w6QyUOIu1zTCQ0naVSvz2Ez4yrH/8FjJ63Q54o8niYgs
// SIG // ZA7UVGZuiZ3qolIeM+MoQdwclF7c4kgf1/L56ctEOHD3
// SIG // PkWspVH+/kPHBZIEvaFXI4HB3mFjRWn3VA1+ir8daJzE
// SIG // scbig6OlMRzgndH1LyD4gu0fjTyHyuHmGVOSQ1sNAmnx
// SIG // nQ91A24u0bGFC1YYyxwiSjA19fjUszyw0Qe/X2ibSQYw
// SIG // Hez8Gzmo
// SIG // End signature block
