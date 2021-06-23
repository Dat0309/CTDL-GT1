//
// Copyright (C) Microsoft. All rights reserved.
//
// <!-- saved from url=(0016)http://localhost -->
// gridControl.ts
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    "use strict";

    (function (Controls) {
        (function (Legacy) {
            (function (Grid) {
                var Utility;
                (function (Utility) {
                    var TreeNodeSort = (function () {
                        function TreeNodeSort() {
                        }
                        TreeNodeSort.stableReverse = function (array, comparer) {
                            var result = [];

                            var reverseIndex = array.length - 1;
                            if (reverseIndex >= 0 && array[reverseIndex].data.hasMoreText) {
                                reverseIndex--;
                            }

                            for (; reverseIndex >= 0; reverseIndex--) {
                                var firstDiffIndex = reverseIndex - 1;
                                for (; firstDiffIndex >= 0; firstDiffIndex--) {
                                    if (0 !== comparer(array[firstDiffIndex], array[reverseIndex])) {
                                        break;
                                    }
                                }

                                for (var equalIndex = firstDiffIndex + 1; equalIndex <= reverseIndex; equalIndex++) {
                                    result.push(array[equalIndex]);
                                }

                                reverseIndex = firstDiffIndex + 1;
                            }

                            for (var index = 0; index < result.length; index++) {
                                array[index] = result[index];
                            }
                        };

                        TreeNodeSort.defaultComparer = function (column, order, rowA, rowB) {
                            var v1 = rowA[column.index], v2 = rowB[column.index];

                            if (typeof v1 === "undefined" || v1 === null) {
                                if (typeof v2 === "undefined" || v2 === null) {
                                    return 0;
                                } else {
                                    return -1;
                                }
                            }

                            return v1.toString().toLocaleUpperCase().localeCompare(v2.toString().toLocaleUpperCase());
                        };

                        TreeNodeSort.sortComparer = function (sortOrder, sortColumns, rowA, rowB) {
                            if (rowA.hasMoreText) {
                                return 1;
                            }

                            if (rowB.hasMoreText) {
                                return -1;
                            }

                            for (var i = 0; i < sortOrder.length; i++) {
                                var orderInfo = sortOrder[i];
                                var column = sortColumns[i];
                                var comparer = column.comparer || Utility.TreeNodeSort.defaultComparer;
                                var result = comparer(column, orderInfo.order, rowA, rowB);

                                if (result === 0) {
                                    continue;
                                } else if (orderInfo.order === "desc") {
                                    return -result;
                                } else {
                                    return result;
                                }
                            }

                            return 0;
                        };
                        return TreeNodeSort;
                    })();
                    Utility.TreeNodeSort = TreeNodeSort;
                })(Utility || (Utility = {}));

                var TreeInfo = (function () {
                    function TreeInfo(gridData, expandStates, toggleFunction) {
                        this.gridData = gridData;
                        this.expandStates = expandStates;
                        this.toggleFunction = toggleFunction;
                    }
                    return TreeInfo;
                })();
                Grid.TreeInfo = TreeInfo;

                var ColumnInfo = (function () {
                    function ColumnInfo(index, text, tooltip, width, canSortBy, getColumnValue, getCellCSSClass, comparer, variableWidth) {
                        this.index = index;
                        this.text = text;
                        this.tooltip = tooltip;
                        this.width = width;
                        this.canSortBy = canSortBy;
                        this.getColumnValue = getColumnValue;
                        this.getCellCSSClass = getCellCSSClass;
                        this.comparer = comparer;
                        this.hasHTMLContent = false;
                        this.variableWidth = variableWidth;
                    }
                    return ColumnInfo;
                })();
                Grid.ColumnInfo = ColumnInfo;

                var SortOrderInfo = (function () {
                    function SortOrderInfo(index, order) {
                        this.index = index;
                        this.order = order;
                    }
                    return SortOrderInfo;
                })();
                Grid.SortOrderInfo = SortOrderInfo;

                var TreeNode = (function () {
                    function TreeNode(data, expandState) {
                        this.data = data;
                        this.expandState = expandState;
                        this.children = [];
                    }
                    return TreeNode;
                })();
                Grid.TreeNode = TreeNode;

                var GutterOptions = (function () {
                    function GutterOptions(backgroundColor, icon, checkbox, headerClickSortColumn, getTooltip) {
                        this.backgroundColor = backgroundColor;
                        this.icon = icon;
                        this.checkbox = checkbox;
                        this.headerClickSortColumn = headerClickSortColumn;
                        this.getTooltip = getTooltip;
                    }
                    return GutterOptions;
                })();
                Grid.GutterOptions = GutterOptions;

                var GridOptions = (function () {
                    function GridOptions(childDataCallback, loadMoreChildDataCallback, columns, sortOrders, editCellCallback, rowSelectedCallback) {
                        this.childDataCallback = childDataCallback;
                        this.loadMoreChildDataCallback = loadMoreChildDataCallback;
                        this.columns = columns;
                        this.sortOrders = sortOrders;

                        this.allowMultiSelect = false;
                        this.allowSortOnMultiColumns = false;
                        this.ariaTitle = "";
                        this.asyncInit = true;
                        this.autoSort = true;
                        this.coreCssClass = "grid";
                        this.cssClass = "";
                        this.expandStates = [];
                        this.extendViewportBy = 3;
                        this.gutter = new GutterOptions();
                        this.header = true;
                        this.height = "100%";
                        this.initialSelection = false;
                        this.keepSelection = false;
                        this.payloadSize = 200;
                        this.source = null;
                        this.editCellCallback = editCellCallback;
                        this.rowSelectedCallback = rowSelectedCallback;
                        this.disableRightClickSelection = true;
                        this.isGridDisabled = false;
                        this.sizeColumns();
                    }
                    GridOptions.prototype.sizeColumns = function () {
                        if (this.columns) {
                            var maxWidth = document.documentElement.offsetWidth - 66;
                            var usedWidth = 0;
                            var variableWidthIndex = -1;
                            for (var i = 0; i < this.columns.length; i++) {
                                if (this.columns[i].variableWidth && variableWidthIndex === -1) {
                                    variableWidthIndex = i;
                                } else {
                                    usedWidth += this.columns[i].width;
                                }
                            }

                            if (variableWidthIndex >= 0) {
                                var targetWidth = maxWidth - usedWidth;
                                if (targetWidth > this.columns[variableWidthIndex].width) {
                                    this.columns[variableWidthIndex].width = targetWidth;
                                }
                            }
                        }
                    };
                    return GridOptions;
                })();
                Grid.GridOptions = GridOptions;

                var RowIndexInfo = (function () {
                    function RowIndexInfo(rowIndex, dataIndex) {
                        this.rowIndex = rowIndex;
                        this.dataIndex = dataIndex;
                    }
                    return RowIndexInfo;
                })();
                Grid.RowIndexInfo = RowIndexInfo;

                var Size = (function () {
                    function Size(width, height) {
                        this.width = width;
                        this.height = height;
                    }
                    return Size;
                })();

                var Range = (function () {
                    function Range(start, end) {
                        this.start = start;
                        this.end = end;
                    }
                    return Range;
                })();

                var ColumnSizing = (function () {
                    function ColumnSizing(active, index, originalWidth, origin) {
                        this.active = active;
                        this.index = index;
                        this.originalWidth = originalWidth;
                        this.origin = origin;
                    }
                    return ColumnSizing;
                })();

                var GridControl = (function (_super) {
                    __extends(GridControl, _super);
                    function GridControl(root, options) {
                        _super.call(this, root);

                        this._gridInstanceNumber = GridControl.GlobalGridInstanceNumber++;

                        this._options = options;

                        this._canvas = null;
                        this._contentSpacer = null;
                        this._element = null;
                        this._gutter = null;
                        this._gutterHeader = null;
                        this._header = null;
                        this._headerCanvas = null;

                        this._dataSource = [];
                        this._rows = {};
                        this._columns = [];
                        this._expandStates = null;
                        this._expandedCount = 0;
                        this._sortOrder = [];
                        this._rowInfoMap = {};
                        this._editCellCallback = null;

                        this._selectedRows = null;
                        this._selectionStart = -1;
                        this._selectionCount = 0;
                        this._selectedIndex = -1;
                        this._active = false;
                        this._activeAriaId = null;
                        this._getChildDataCallback = null;
                        this._getLoadMoreChildDataCallback = null;
                        this._rowSelectedCallback = null;

                        this._canvasHeight = 300;
                        this._canvasWidth = 300;
                        this._contentSize = null;
                        this._measurements = {};
                        this._count = 0;

                        this._indentIndex = 0;
                        this._indentLevels = null;
                        this._visibleRange = [];
                        this._columnSizing = null;
                        this._sizingElement = null;
                        this._copyInProgress = false;

                        this._resetScroll = false;
                        this._ignoreScroll = false;
                        this._scrollTop = 0;
                        this._scrollLeft = 0;
                        this._cancelable = null;

                        this._onAriaExpandedModifiedHandler = this.onAriaExpandedModified.bind(this);

                        this.initialize();
                    }
                    GridControl.prototype.getSelectionCount = function () {
                        return this._selectionCount;
                    };

                    GridControl.prototype.getElement = function () {
                        return this._element;
                    };

                    GridControl.prototype.setAriaDescription = function (description) {
                        this._ariaDescription = description;
                        this._updateGridAriaLabel();
                    };

                    GridControl.prototype.setGutterHeaderClickSortColumn = function (headerClickSortColumn) {
                        this._options.gutter.headerClickSortColumn = headerClickSortColumn;
                    };

                    GridControl.prototype.initializeDataSource = function () {
                        var canvas;
                        if (this._resetScroll) {
                            this._ignoreScroll = true;
                            try  {
                                canvas = this._canvas;
                                canvas.scrollTop = 0;
                                canvas.scrollLeft = 0;
                                this._scrollLeft = 0;
                                this._scrollTop = 0;
                                this._resetScroll = false;
                            } finally {
                                this._ignoreScroll = false;
                            }
                        }

                        this.setDataSource(this._options.source, this._options.expandStates, this._options.columns, this._options.sortOrders);

                        if (this._expandedCount > 0) {
                            if (this._options.keepSelection && this._selectedIndex >= 0) {
                                this._selectRow(Math.min(this._selectedIndex, this._expandedCount - 1));
                            } else {
                                this._selectRow(this._options.initialSelection !== false ? 0 : -1);
                            }
                        } else {
                            this.setSelectedRowIndex(-1);
                        }
                    };

                    GridControl.prototype.setDataSource = function (source, expandStates, columns, sortOrder, selectedIndex) {
                        var _this = this;
                        var i, l, count;

                        this._rowInfoMap = {};
                        this._dataSource = source || [];
                        this._count = count = this._dataSource.length;

                        if (expandStates) {
                            this._expandStates = expandStates;
                            this._indentLevels = GridControl.expand(expandStates);
                        } else {
                            this._indentLevels = null;
                            this._expandStates = null;
                        }

                        this._expandedCount = count;
                        this._updateRanges();

                        this._columns = [];

                        if (columns) {
                            var defaultGetCellContents = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
                                return _this._drawCell(rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder);
                            };
                            var defaultGetHeaderCellContents = function (column, columnOrder) {
                                return _this._drawHeaderCellValue(column, columnOrder);
                            };
                            var defaultGetColumnValue = function (dataIndex, columnIndex, columnOrder) {
                                return _this.getColumnValue(dataIndex, columnIndex, columnOrder);
                            };

                            for (i = 0, l = columns.length; i < l; i++) {
                                var column = columns[i];

                                column.index = typeof (column.index) !== "undefined" ? column.index : String(i);
                                column.canSortBy = column.canSortBy !== false;
                                column.canMove = column.canMove !== false;
                                column.width = typeof (column.width) !== "undefined" ? column.width : 100;

                                column.getCellContents = column.getCellContents || defaultGetCellContents;
                                column.getHeaderCellContents = column.getHeaderCellContents || defaultGetHeaderCellContents;
                                column.getColumnValue = column.getColumnValue || defaultGetColumnValue;
                                this._columns.push(column);
                            }
                        }

                        this._sortOrder = [];

                        if (sortOrder) {
                            for (i = 0, l = sortOrder.length; i < l; i++) {
                                var columnSortOrder = sortOrder[i];
                                if (columnSortOrder.order !== "desc") {
                                    columnSortOrder.order = "asc";
                                }

                                this._sortOrder.push(columnSortOrder);
                            }

                            this.setGutterHeaderSortOrder();
                        }

                        this._clearSelection();

                        this._determineIndentIndex();

                        if (this._options.asyncInit) {
                            window.setTimeout(function () {
                                return _this._layoutAfterSetDataSource(selectedIndex);
                            }, 0);
                        } else {
                            this._layoutAfterSetDataSource(selectedIndex);
                        }
                    };

                    GridControl.prototype.updateGetChildDataCallback = function (callback) {
                        this._getChildDataCallback = callback;
                    };

                    GridControl.prototype.getRowInfo = function (dataIndex) {
                        return this._rows[dataIndex];
                    };

                    GridControl.prototype.getRowData = function (dataIndex) {
                        return this._dataSource[dataIndex];
                    };

                    GridControl.prototype.getColumns = function () {
                        return this._columns || [];
                    };

                    GridControl.prototype.getSortOrder = function () {
                        return this._sortOrder || [];
                    };

                    GridControl.prototype.expandNode = function (dataIndex) {
                        var _this = this;
                        if (this._dataSource[dataIndex + 1].isPlaceholder) {
                            var expansionPath = this.getExpansionPath(dataIndex);
                            this._getChildDataCallback(this._dataSource[dataIndex], expansionPath, function (dynamicData, hasMoreText) {
                                if (dynamicData !== null) {
                                    var dummyChildPlaceholderIndex = dataIndex + 1;
                                    _this._adjustForDynamicData(dynamicData.itemsWithPlaceholders, dynamicData.expandStates, dataIndex, dummyChildPlaceholderIndex, hasMoreText);
                                }
                            });
                        }

                        if (this._expandStates) {
                            var state = this._expandStates[dataIndex];

                            if (state < 0) {
                                this._expandStates[dataIndex] = -state;
                                this._updateRanges();

                                var row = this._rows[dataIndex];
                                if (row) {
                                    row.isDirty = true;
                                }
                            }
                        }
                    };

                    GridControl.prototype.collapseNode = function (dataIndex) {
                        if (this._expandStates) {
                            var state = this._expandStates[dataIndex];

                            if (state > 0) {
                                this._expandStates[dataIndex] = -state;
                                this._updateRanges();

                                var row = this._rows[dataIndex];
                                if (row) {
                                    row.isDirty = true;
                                }
                            }
                        }
                    };

                    GridControl.prototype.expandAllNodes = function () {
                        var i = 0, l = this._count, states = this._expandStates, result = false, rows = this._rows;

                        if (states) {
                            while (i < l) {
                                var state = states[i];
                                if (state < 0) {
                                    states[i] = -state;
                                    result = true;

                                    var row = rows[i];
                                    if (row) {
                                        row.isDirty = true;
                                    }
                                }

                                i++;
                            }

                            if (result) {
                                this._updateRanges();
                            }
                        }

                        return result;
                    };

                    GridControl.prototype.collapseAllNodes = function () {
                        var i = 0, l = this._count, states = this._expandStates, result = false, rows = this._rows;

                        if (states) {
                            while (i < l) {
                                var state = states[i];
                                if (state > 0) {
                                    states[i] = -state;
                                    result = true;

                                    var row = rows[i];
                                    if (row) {
                                        row.isDirty = true;
                                    }
                                }

                                i++;
                            }

                            if (result) {
                                this._updateRanges();
                            }
                        }

                        return result;
                    };

                    GridControl.prototype.expandAll = function () {
                        var _this = this;
                        this._updateExpansionStateAndRedraw(function () {
                            return _this.expandAllNodes;
                        });
                    };

                    GridControl.prototype.collapseAll = function () {
                        var _this = this;
                        this._updateExpansionStateAndRedraw(function () {
                            return _this.collapseAllNodes;
                        });
                    };

                    GridControl.prototype.tryToggle = function (expand, shiftKey, rowDataIndex) {
                        var state;

                        if (!this._expandStates || this._selectedIndex < 0 || this._expandedCount <= 0) {
                            return false;
                        }

                        var dataIndex = typeof rowDataIndex !== "undefined" ? rowDataIndex : this._getDataIndex(this._selectedIndex);

                        var row = this._rows[dataIndex];

                        if (!row) {
                            return false;
                        }

                         {
                            state = this._expandStates[dataIndex];
                            if (state !== 0) {
                                if (expand) {
                                    if (state < 0) {
                                        this.expandNode(dataIndex);
                                    } else {
                                        return false;
                                    }
                                } else {
                                    if (state > 0) {
                                        this.collapseNode(dataIndex);
                                    } else {
                                        return false;
                                    }
                                }

                                this._clearSelection();
                                this._addSelection(this._getRowIndex(dataIndex));
                                this._layoutContentSpacer();
                                this._redraw();
                                return true;
                            }
                        }

                        return false;
                    };

                    GridControl.prototype.getSelectedRowIntoView = function (force) {
                        return this._getRowIntoView(this._selectedIndex, force);
                    };

                    GridControl.prototype.cacheRows = function (aboveRange, visibleRange, belowRange) {
                    };

                    GridControl.prototype.updateRow = function (rowIndex, dataIndex) {
                        var expandedState = 0, level = 0;

                        if (typeof dataIndex === "undefined" || dataIndex < 0) {
                            dataIndex = this._getDataIndex(rowIndex);
                        } else if (typeof rowIndex === "undefined" || rowIndex < 0) {
                            rowIndex = this._getRowIndex(dataIndex);
                        }

                        var rowInfo = this._rows[dataIndex];

                        if (rowInfo) {
                            if (this._expandStates) {
                                expandedState = this._expandStates[dataIndex];
                                level = this._indentLevels[dataIndex];
                            }

                            this._updateRow(rowInfo, rowIndex, dataIndex, expandedState, level);
                        }
                    };

                    GridControl.prototype.layout = function () {
                        this._measureCanvasSize();
                        this._cleanUpRows();
                        this._fixScrollPos();
                        this._layoutContentSpacer();
                        this._updateViewport();

                        this._layoutHeader();
                        this._drawHeader();
                    };

                    GridControl.prototype.redraw = function () {
                        this._fixScrollPos();
                        this._redraw(true);
                    };

                    GridControl.prototype.getColumnValue = function (dataIndex, columnIndex, columnOrder) {
                        return this._dataSource[dataIndex][columnIndex];
                    };

                    GridControl.prototype.getColumnText = function (dataIndex, column, columnOrder, isForTooltip) {
                        var text;

                        var value = column.getColumnValue(dataIndex, column.index, columnOrder, this._dataSource, isForTooltip);

                        if (typeof value !== "string") {
                            text = GridControl.convertValueToDisplayString(value, column.format);
                        } else {
                            text = value;
                        }

                        column.maxLength = Math.max(column.maxLength || 0, text.length);

                        return text;
                    };

                    GridControl.prototype.getSelectedRowIndex = function () {
                        if (this._selectionCount === 0) {
                            return -1;
                        }

                        return this._selectedIndex;
                    };

                    GridControl.prototype.setSelectedRowIndex = function (selectedRowIndex) {
                        this._clearSelection();
                        this._addSelection(selectedRowIndex);
                    };

                    GridControl.prototype.getSelectedDataIndex = function () {
                        return this._getDataIndex(this._selectedIndex);
                    };

                    GridControl.prototype.getSelectedDataIndices = function () {
                        var index, rows = this._selectedRows, indices = [];

                        if (rows) {
                            for (index in rows) {
                                indices[indices.length] = rows[index];
                            }
                        }

                        return indices;
                    };

                    GridControl.prototype.ensureDataIndexExpanded = function (dataIndex) {
                        var rowIndex = this._getRowIndex(dataIndex);
                        while (rowIndex < 0 || (dataIndex > 0 && rowIndex === 0)) {
                            this.expandNode(this._getDataIndex(-rowIndex));
                            rowIndex = this._getRowIndex(dataIndex);
                        }

                        return rowIndex;
                    };

                    GridControl.prototype.setSelectedDataIndex = function (dataIndex, expandNodes) {
                        var rowIndex = expandNodes ? this.ensureDataIndexExpanded(dataIndex) : this._getRowIndex(dataIndex);
                        this.setSelectedRowIndex(rowIndex);
                    };

                    GridControl.prototype.setFocusToSelectedRow = function () {
                        this._updateAriaAttribute();
                        this.getSelectedRowIntoView(true);
                    };

                    GridControl.prototype.selectionChanged = function (selectedIndex, selectedCount, selectedRows) {
                    };

                    GridControl.prototype.selectedIndexChanged = function (selectedRowIndex, selectedDataIndex) {
                    };

                    GridControl.prototype.onSort = function (sortOrder, sortColumns) {
                        this.fireCustomEvent(this._element, "sortStarted");
                        if (this._options.autoSort) {
                            this._trySorting(sortOrder, sortColumns);
                            this._sortOrder = sortOrder;
                            this.layout();
                        }

                        return true;
                    };

                    GridControl.prototype.getRowInfoFromEvent = function (e, selector) {
                        var element = this.findClosestElement(e.target, selector);
                        return this._rowInfoMap[element.uniqueID];
                    };

                    GridControl.prototype.getExpandStates = function () {
                        return this._expandStates;
                    };

                    GridControl.prototype.getExpansionPath = function (dataIndex) {
                        if (dataIndex < 0 || dataIndex >= this._expandStates.length) {
                            throw new Error("Item does not exist");
                        }

                        var path = [];
                        var currentIndex = 0;
                        while (currentIndex < dataIndex) {
                            var lastSubtreeElement = currentIndex + Math.abs(this._expandStates[currentIndex]);
                            if (dataIndex <= lastSubtreeElement) {
                                path.push(this._dataSource[currentIndex]);
                                currentIndex++;
                            } else {
                                currentIndex = lastSubtreeElement + 1;
                            }
                        }

                        if (currentIndex != dataIndex) {
                            throw new Error("Invalid expandStates format or incorrect assumption");
                        }

                        path.push(this._dataSource[dataIndex]);

                        return path;
                    };

                    GridControl.prototype.ensureSelectedIndex = function (index) {
                        this._ensureSelectedIndex(index, true);
                    };

                    GridControl.expand = function (states) {
                        var result = [];

                        if (states.length > 0) {
                            var stack = [];
                            var currState = { level: 1, origCount: states.length, remainingCount: states.length };
                            stack.push(currState);

                            var i = 0;
                            while (i < states.length) {
                                result.push(currState.level);
                                currState.remainingCount--;
                                while (currState.remainingCount === 0) {
                                    stack.pop();
                                    if (stack.length == 0) {
                                        if (i === (states.length - 1)) {
                                            break;
                                        } else {
                                            throw new Error("invalid descendant counts, nesting not possible");
                                        }
                                    }

                                    var newState = stack[stack.length - 1];
                                    newState.remainingCount -= currState.origCount;
                                    currState = newState;
                                    if (currState.remainingCount < 0) {
                                        throw new Error("invalid descendant counts, cannot convert to indentation levels");
                                    }
                                }

                                var nextCount = Math.abs(states[i]);

                                if (nextCount > 0) {
                                    var nextItem = { level: result[result.length - 1] + 1, origCount: nextCount, remainingCount: nextCount };
                                    stack.push(nextItem);
                                    currState = nextItem;
                                }

                                i++;
                            }

                            if (stack.length > 0) {
                                throw new Error("invalid descendant counts, more input expected");
                            }
                        }

                        return result;
                    };

                    GridControl.addItemsToTree = function (dataSource, expandStates, start, count, parentNode) {
                        var end = Math.min(start + count, dataSource.length);
                        for (var i = start; i < end; i++) {
                            var node = new TreeNode(dataSource[i], expandStates[i]);
                            var childrenCount = Math.abs(node.expandState);
                            if (childrenCount > 0) {
                                GridControl.addItemsToTree(dataSource, expandStates, i + 1, childrenCount, node);
                                i += childrenCount;
                            }

                            parentNode.children.push(node);
                        }
                    };

                    GridControl.walkTree = function (tree, visit) {
                        if (visit) {
                            visit(tree);
                            var numChildren = 0;
                            var children = tree.children;

                            if (children && (numChildren = children.length)) {
                                for (var i = 0; i < numChildren; i++) {
                                    var item = children[i];
                                    GridControl.walkTree(item, visit);
                                }
                            }
                        }
                    };

                    GridControl.makeElementUnselectable = function (element) {
                        element.setAttribute("unselectable", "on");

                        var elements = element.querySelectorAll("*");
                        for (var i = 0; i < elements.length; i++) {
                            var e = elements[i];
                            switch (e.tagName) {
                                case "IFRAME":
                                case "TEXTAREA":
                                case "INPUT":
                                case "SELECT":
                                    break;
                                default:
                                    e.setAttribute("unselectable", "on");
                            }
                        }
                    };

                    GridControl.toDecimalLocaleString = function (value, includeGroupSeparators, cultureInfo) {
                        var zeroPad = function (str, count, left) {
                            for (var l = str.length; l < count; l++) {
                                str = (left ? ("0" + str) : (str + "0"));
                            }

                            return str;
                        };

                        var exponent, nf, split, numberString = value.toString(), right = "";

                        if (cultureInfo) {
                            nf = cultureInfo.numberFormat;
                        } else {
                            nf = Plugin.Culture.NumberFormat;
                        }

                        split = numberString.split(/e/i);
                        numberString = split[0];
                        exponent = (split.length > 1 ? parseInt(split[1], 10) : 0);
                        split = numberString.split(".");
                        numberString = split[0];
                        right = split.length > 1 ? split[1] : "";

                        if (exponent > 0) {
                            right = zeroPad(right, exponent, false);
                            numberString += right.slice(0, exponent);
                            right = right.substr(exponent);
                        } else if (exponent < 0) {
                            exponent = -exponent;
                            numberString = zeroPad(numberString, exponent + 1, true);
                            right = numberString.slice(-exponent, numberString.length) + right;
                            numberString = numberString.slice(0, -exponent);
                        }

                        if (right.length > 0) {
                            right = nf.numberDecimalSeparator + right;
                        }

                        if (includeGroupSeparators === true) {
                            var groupSizes = nf.numberGroupSizes, sep = nf.numberGroupSeparator, curSize = groupSizes[0], curGroupIndex = 1, stringIndex = numberString.length - 1, ret = "";

                            while (stringIndex >= 0) {
                                if (curSize === 0 || curSize > stringIndex) {
                                    if (ret.length > 0) {
                                        return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                                    } else {
                                        return numberString.slice(0, stringIndex + 1) + right;
                                    }
                                }

                                if (ret.length > 0) {
                                    ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + sep + ret;
                                } else {
                                    ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1);
                                }

                                stringIndex -= curSize;
                                if (curGroupIndex < groupSizes.length) {
                                    curSize = groupSizes[curGroupIndex];
                                    curGroupIndex++;
                                }
                            }

                            return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                        } else {
                            return numberString + right;
                        }
                    };

                    GridControl.convertValueToDisplayString = function (value, format) {
                        if (value != null) {
                            if (typeof value === "string") {
                                return value;
                            } else if (value instanceof Date) {
                                return value.localeFormat(format || "G");
                            } else if (typeof value === "number") {
                                if (format) {
                                    return value.localeFormat(format);
                                } else {
                                    return GridControl.toDecimalLocaleString(value);
                                }
                            } else if (typeof value === "boolean") {
                                return value ? "True" : "False";
                            } else {
                                return value.toString();
                            }
                        }

                        return "";
                    };

                    GridControl._setTooltip = function (element, value, height) {
                        var content = value.trim();

                        if (content) {
                            var tooltip = { content: content, height: height };
                            element.setAttribute("data-plugin-vs-tooltip", JSON.stringify(tooltip));
                        }
                    };

                    GridControl.prototype.initialize = function () {
                        this._element = document.createElement("div");
                        this._element.className = this._options.coreCssClass;
                        this._element.style.height = this._options.height;
                        this.rootElement.appendChild(this._element);

                        this._buildDom();

                        this._contentSize = new Size(300, 400);
                        this._takeMeasurements();
                        this._getChildDataCallback = this._options.childDataCallback || null;
                        this._getLoadMoreChildDataCallback = this._options.loadMoreChildDataCallback || null;
                        this._editCellCallback = this._options.editCellCallback || null;
                        this._rowSelectedCallback = this._options.rowSelectedCallback || null;

                        if (this._options.asyncInit) {
                            window.setTimeout(function () {
                                this._attachEvents();
                            }.bind(this), 10);
                        } else {
                            this._attachEvents();
                        }

                        this.initializeDataSource();
                    };

                    GridControl.prototype.findClosestElement = function (element, selector) {
                        var stop = this._element.parentNode;

                        var closest = element;
                        while (closest && closest !== stop) {
                            if (closest.msMatchesSelector(selector)) {
                                return closest;
                            }

                            closest = closest.parentNode;
                        }

                        return closest;
                    };

                    GridControl.prototype.fireCustomEvent = function (element, eventName, args) {
                        var customEvent = document.createEvent("Event");
                        customEvent.initEvent(eventName, true, true);
                        customEvent.customData = args;

                        element.dispatchEvent(customEvent);
                    };

                    GridControl.prototype.onAriaExpandedModified = function (event) {
                        if (event.attrName === "aria-expanded") {
                            var rowInfo = this.getRowInfoFromEvent(event, ".grid-row");

                            if (rowInfo) {
                                this.tryToggle(event.newValue === "true", false, rowInfo.dataIndex);
                            }
                        }
                    };

                    GridControl.prototype.createElementWithClass = function (tagName, className) {
                        var element = document.createElement(tagName);

                        if (className) {
                            element.className = className;
                        }

                        return element;
                    };

                    GridControl.prototype._getId = function () {
                        return GridControl.TYPE_NAME + this._gridInstanceNumber;
                    };

                    GridControl.prototype._enhance = function (element) {
                        this._buildDom();
                    };

                    GridControl.prototype._buildDom = function () {
                        var fragment = document.createDocumentFragment();
                        var gutterOptions = this._options.gutter;
                        var gutterVisible = gutterOptions && (gutterOptions.icon || gutterOptions.checkbox);

                        this._canvas = document.createElement("div");
                        this._canvas.className = "grid-canvas";

                        this._contentSpacer = document.createElement("div");
                        this._contentSpacer.className = "grid-content-spacer";
                        this._canvas.appendChild(this._contentSpacer);

                        if (this._options.header) {
                            this._element.classList.add("has-header");

                            this._header = document.createElement("div");
                            this._header.className = "grid-header";

                            this._headerCanvas = document.createElement("div");
                            this._headerCanvas.className = "grid-header-canvas";
                            this._header.appendChild(this._headerCanvas);

                            fragment.appendChild(this._header);
                        }

                        if (gutterVisible) {
                            this._element.classList.add("has-gutter");

                            this._gutter = document.createElement("div");
                            this._gutter.className = "grid-gutter";
                            if (gutterOptions && gutterOptions.backgroundColor) {
                                this._gutter.style.backgroundColor = gutterOptions.backgroundColor;
                            }

                            this._canvas.appendChild(this._gutter);

                            if (this._header) {
                                this._gutterHeader = document.createElement("div");
                                this._gutterHeader.className = "grid-gutter-header";
                                this._gutterHeader.classList.add("grid-header-column");

                                this._header.appendChild(this._gutterHeader);
                                var sortElement = this.createElementWithClass("div", "sort-handle");
                                this._gutterHeader.appendChild(sortElement);
                                this.setGutterHeaderSortOrder();
                            }
                        }

                        fragment.appendChild(this._canvas);
                        this._element.appendChild(fragment);

                        this._ariaColumns = "";
                        for (var cIndex = 0; cIndex < this._options.columns.length; cIndex++) {
                            var columnInfo = this._options.columns[cIndex];
                            if (this._ariaColumns) {
                                this._ariaColumns += ", ";
                            }

                            this._ariaColumns += columnInfo.text;
                        }

                        this._updateGridAriaLabel();
                    };

                    GridControl.prototype._updateGridAriaLabel = function () {
                        var ariaLabel = "";

                        ariaLabel += this._options.ariaTitle || "";
                        if (ariaLabel) {
                            ariaLabel += ", ";
                        }

                        ariaLabel += this._ariaColumns || "";
                        if (ariaLabel) {
                            ariaLabel += ", ";
                        }

                        ariaLabel += this._ariaDescription || "";

                        this._element.setAttribute("aria-label", ariaLabel);
                    };

                    GridControl.prototype.setGutterHeaderSortOrder = function () {
                        if (!this._sortOrder || this._sortOrder.length === 0 || !this._options.gutter.headerClickSortColumn) {
                            return;
                        }

                        if (!this._options.allowSortOnMultiColumns) {
                            var currentSortOrder = this._sortOrder[0];
                            if (currentSortOrder.index === this._options.gutter.headerClickSortColumn.index) {
                                this._setSortOrderClass(this._gutterHeader, currentSortOrder.order);
                            } else {
                                this._setSortOrderClass(this._gutterHeader, "none");
                            }
                        } else {
                            var sortOrderFound = false;

                            for (var i = 0; i < this._sortOrder.length; i++) {
                                var currentSortOrder = this._sortOrder[i];
                                if (currentSortOrder.index === this._options.gutter.headerClickSortColumn.index) {
                                    sortOrderFound = true;
                                    this._setSortOrderClass(this._gutterHeader, currentSortOrder.order);
                                }
                            }

                            if (!sortOrderFound) {
                                this._setSortOrderClass(this._gutterHeader, "none");
                            }
                        }
                    };

                    GridControl.prototype._attachEvents = function () {
                        var _this = this;
                        window.addEventListener("resize", function (e) {
                            return _this._onContainerResize(e);
                        });

                        this._element.addEventListener("keydown", function (e) {
                            return _this._onKeyDown(e);
                        });

                        this._canvas.addEventListener("mousedown", function (e) {
                            return _this._onRowMouseDown(e);
                        });
                        this._canvas.addEventListener("dblclick", function (e) {
                            return _this._onEditCell(e);
                        });
                        this._canvas.addEventListener("scroll", function (e) {
                            return _this._onCanvasScroll(e);
                        });
                        this._canvas.addEventListener("selectstart", function () {
                            return false;
                        });
                        this._canvas.addEventListener("focusin", function (e) {
                            _this._canvasContainsFocus = true;
                        });
                        this._canvas.addEventListener("focusout", function (e) {
                            _this._canvasContainsFocus = false;
                        });

                        if (this._header) {
                            this._header.addEventListener("mousedown", function (e) {
                                return _this._onHeaderMouseDown(e);
                            });
                            this._header.addEventListener("mouseup", function (e) {
                                return _this._onHeaderMouseUp(e);
                            });
                            this._header.addEventListener("click", function (e) {
                                return _this._onHeaderClick(e);
                            });
                            this._header.addEventListener("dblclick", function (e) {
                                return _this._onHeaderDblClick(e);
                            });
                        }

                        if (this._gutter) {
                            if (this._gutterHeader) {
                                this._gutterHeader.addEventListener("click", function (e) {
                                    _this._sortBy(_this._options.gutter.headerClickSortColumn, false);
                                    _this.setGutterHeaderSortOrder();
                                });
                            }

                            this._gutter.addEventListener("click", function (e) {
                                return _this._onGutterClick(e);
                            });

                            this._gutter.addEventListener("mouseover", function (e) {
                                var row = this.findClosestElement(e.target, ".grid-gutter-row");
                                if (row) {
                                    row.classList.add("grid-gutter-row-hover");
                                }
                            }.bind(this));

                            this._gutter.addEventListener("mouseout", function (e) {
                                var row = this.findClosestElement(e.target, ".grid-gutter-row");
                                if (row) {
                                    row.classList.remove("grid-gutter-row-hover");
                                }
                            }.bind(this));
                        }
                    };

                    GridControl.prototype._mergeExpandStates = function (parentIndex, childPlaceholderIndex, oldExpandStates, newExpandStates) {
                        var netIncreaseInExpandStates = newExpandStates.length - 1;

                        oldExpandStates.splice(childPlaceholderIndex, 1);

                        for (var i = 0; i <= netIncreaseInExpandStates; i++) {
                            oldExpandStates.splice(childPlaceholderIndex + i, 0, newExpandStates[i]);
                        }

                        var countSinceLastParent = 0;
                        for (var i = parentIndex; i >= 0; i--) {
                            var origValue = oldExpandStates[i];

                            if (Math.abs(origValue) > countSinceLastParent) {
                                if (origValue < 0) {
                                    oldExpandStates[i] = origValue - netIncreaseInExpandStates;
                                } else {
                                    oldExpandStates[i] = origValue + netIncreaseInExpandStates;
                                }

                                countSinceLastParent = 0;
                            } else {
                                countSinceLastParent++;
                            }
                        }
                    };

                    GridControl.prototype._takeMeasurements = function () {
                        var cssClass = this._options.coreCssClass;
                        if (this._options.cssClass) {
                            cssClass += " " + this._options.cssClass;
                        }

                        var measurementContainer = this.createElementWithClass("div", cssClass);
                        measurementContainer.style.position = "absolute";
                        measurementContainer.style.left = "-5000px";
                        measurementContainer.style.top = "-5000px";
                        measurementContainer.style.width = "1000px";
                        measurementContainer.style.height = "500px";
                        document.body.appendChild(measurementContainer);

                        var row = this.createElementWithClass("div", "grid-row grid-row-normal");
                        measurementContainer.appendChild(row);

                        var cell = this.createElementWithClass("div", "grid-cell");
                        cell.style.width = "100px";
                        cell.innerText = "1";
                        row.appendChild(cell);

                        this._measurements.rowHeight = row.offsetHeight;
                        this._measurements.cellOffset = cell.offsetWidth - 100;

                        var textUnit = this.createElementWithClass("div");
                        textUnit.style.overflow = "hidden";
                        textUnit.style.width = "1em";
                        textUnit.style.height = "1ex";
                        cell.appendChild(textUnit);

                        this._measurements.unitEx = textUnit.offsetHeight;

                        var gutter = this.createElementWithClass("div", "grid-gutter");
                        gutter.appendChild(this.createElementWithClass("div", "grid-gutter-row"));
                        measurementContainer.appendChild(gutter);

                        if (this._gutter) {
                            this._measurements.gutterWidth = gutter.clientWidth;
                        } else {
                            this._measurements.gutterWidth = 0;
                        }

                        document.body.removeChild(measurementContainer);
                    };

                    GridControl.prototype._layoutAfterSetDataSource = function (selectedIndex) {
                        this.layout();
                        if (selectedIndex !== -1) {
                            this._ensureSelectedIndex(selectedIndex);
                        }
                    };

                    GridControl.prototype._adjustForDynamicData = function (newRows, newExpandStates, parentIndex, childPlaceholderIndex, hasMoreText) {
                        if (hasMoreText) {
                            var hasMoreItem = {
                                hasMoreText: hasMoreText
                            };
                            newRows.push(hasMoreItem);
                            newExpandStates.push(0);
                        }

                        this._dataSource.splice(childPlaceholderIndex, 1);

                        for (var i = 0; i < newRows.length; i++) {
                            this._dataSource.splice(childPlaceholderIndex + i, 0, newRows[i]);
                        }

                        this._mergeExpandStates(parentIndex, childPlaceholderIndex, this._expandStates, newExpandStates);

                        var count = this._dataSource.length;
                        this._count = count;

                        if (this._expandStates) {
                            this._indentLevels = GridControl.expand(this._expandStates);
                        } else {
                            this._indentLevels = null;
                        }

                        this._expandedCount = count;
                        this._updateRanges();

                        this._clearSelection();

                        this._determineIndentIndex();

                        this.layout();
                    };

                    GridControl.prototype._ensureSelectedIndex = function (index, forceSettingSelection) {
                        var oldSelectedIndex = this._selectedIndex;

                        if (typeof index === "number") {
                            this._selectedIndex = index;
                        }

                        if (this._selectedIndex >= 0) {
                            if (this._count <= this._selectedIndex) {
                                this._selectedIndex = this._count - 1;
                            }

                            if (this._selectedIndex !== oldSelectedIndex || forceSettingSelection) {
                                this._addSelection(this._selectedIndex);
                            }
                        }
                    };

                    GridControl.prototype._determineIndentIndex = function () {
                        var _columns = this._columns, i, l;
                        for (i = 0, l = _columns.length; i < l; i++) {
                            if (_columns[i].indent) {
                                this._indentIndex = i;
                                return;
                            }
                        }

                        this._indentIndex = 0;
                    };

                    GridControl.prototype._getDataIndex = function (visibleIndex) {
                        var i, l, lastIndex = -1;
                        var ranges = this._visibleRange;
                        var range;

                        if (visibleIndex < 0) {
                            return -1;
                        }

                        for (i = 0, l = ranges.length; i < l; i++) {
                            range = ranges[i];
                            lastIndex += range.end - range.start + 1;

                            if (visibleIndex <= lastIndex) {
                                return range.end - lastIndex + visibleIndex;
                            }
                        }

                        return visibleIndex;
                    };

                    GridControl.prototype._getRowIndex = function (dataIndex) {
                        var i, l, result = 0;
                        var ranges = this._visibleRange;
                        var range;

                        for (i = 0, l = ranges.length; i < l; i++) {
                            range = ranges[i];
                            if (dataIndex >= range.start) {
                                if (dataIndex <= range.end) {
                                    return result + dataIndex - range.start;
                                }
                            } else {
                                break;
                            }

                            result += range.end - range.start + 1;
                        }

                        return -Math.max(0, result - 1);
                    };

                    GridControl.prototype._updateRanges = function () {
                        var i = 0, first = 0, l = this._count, newRanges = [], count = 0;

                        if (this._expandStates) {
                            while (i < l) {
                                var state = this._expandStates[i];

                                if (state < 0) {
                                    newRanges[newRanges.length] = new Range(first, i);
                                    count += (i - first) + 1;
                                    i += 1 - state;
                                    first = i;
                                } else {
                                    i++;
                                }
                            }

                            if (first < l) {
                                newRanges[newRanges.length] = new Range(first, l - 1);
                                count += (l - first);
                            }
                        } else {
                            count = l;
                            newRanges[newRanges.length] = new Range(0, count);
                        }

                        this._expandedCount = count;
                        this._visibleRange = newRanges;
                    };

                    GridControl.prototype._updateExpansionStateAndRedraw = function (action) {
                        var dataIndex, oldSelectedIndex = this._selectedIndex;

                        if (oldSelectedIndex >= 0) {
                            dataIndex = this._getDataIndex(oldSelectedIndex);
                        }

                        action();

                        if (oldSelectedIndex >= 0) {
                            this._clearSelection();
                            this._addSelection(Math.abs(this._getRowIndex(dataIndex)));
                        }

                        this._layoutContentSpacer();
                        this._redraw();
                    };

                    GridControl.prototype._getVisibleRowIndices = function () {
                        var top = this._scrollTop, bottom = top + this._canvasHeight, count = this._expandedCount - 1, rh = this._measurements.rowHeight;

                        return {
                            first: Math.min(count, Math.max(0, Math.ceil(top / rh))),
                            last: Math.min(count, Math.floor(bottom / rh) - 1)
                        };
                    };

                    GridControl.prototype._getRowIntoView = function (rowIndex, force) {
                        if (force) {
                            this._canvas.scrollTop = Math.max(0, Math.min(rowIndex || 0, this._expandedCount - 1)) * this._measurements.rowHeight;

                            return true;
                        }

                        var visibleIndices = this._getVisibleRowIndices();
                        var firstIndex = visibleIndices.first;
                        var lastIndex = visibleIndices.last;

                        var count = lastIndex - firstIndex;

                        if (rowIndex < firstIndex || rowIndex > lastIndex) {
                            if (this._selectedIndex > firstIndex) {
                                firstIndex = Math.max(rowIndex - count, 0);
                            } else {
                                firstIndex = Math.max(0, Math.min(rowIndex + count, this._expandedCount - 1) - count);
                            }

                            this._canvas.scrollTop = firstIndex * this._measurements.rowHeight;

                            return true;
                        }

                        return false;
                    };

                    GridControl.prototype._updateViewport = function (includeNonDirtyRows) {
                        var resultCount = this._count, above = [], below = [], visible = [], states = this._expandStates || [], maxIndex = this._expandedCount - 1;

                        var visibleIndices = this._getVisibleRowIndices();
                        var firstIndex = visibleIndices.first;
                        var lastIndex = visibleIndices.last;

                        firstIndex = Math.max(0, firstIndex - this._options.extendViewportBy);
                        lastIndex = Math.min(maxIndex, lastIndex + this._options.extendViewportBy);

                        var cachingStart = Math.max(0, firstIndex - this._options.payloadSize);
                        var cachingEnd = Math.min(maxIndex, lastIndex + this._options.payloadSize);

                        var dataIndex = this._getDataIndex(cachingStart);
                        var lastVisible = firstIndex;

                        for (var i = cachingStart; i <= cachingEnd && dataIndex < resultCount; i++) {
                            if (i < firstIndex) {
                                above[above.length] = new RowIndexInfo(i, dataIndex);
                            } else if (i > lastIndex) {
                                below[below.length] = new RowIndexInfo(i, dataIndex);
                            } else {
                                visible[visible.length] = new RowIndexInfo(i, dataIndex);
                                lastVisible = i;
                            }

                            var nodeState = states[dataIndex];
                            if (nodeState < 0) {
                                dataIndex += (1 - nodeState);
                            } else {
                                dataIndex++;
                            }
                        }

                        this.cacheRows(above, visible, below);
                        this._drawRows(visible, includeNonDirtyRows);

                        if (this._updateAriaOnViewportUpdate) {
                            this._updateAriaOnViewportUpdate = false;
                            this._updateAriaAttribute();
                        }
                    };

                    GridControl.prototype._cleanUpRows = function () {
                        var rows = this._rows, gutterDiv = this._gutter;

                        for (var dataIndex in rows) {
                            var row = rows[dataIndex];
                            if (row.row.parentElement) {
                                row.row.parentElement.removeChild(row.row);
                            }

                            if (gutterDiv && row.gutterRow.parentElement) {
                                row.gutterRow.parentElement.removeChild(row.gutterRow);
                            }
                        }

                        this._rows = {};
                    };

                    GridControl.prototype._drawRows = function (visibleRange, includeNonDirtyRows) {
                        var states = this._expandStates, expandedState = 0, levels = this._indentLevels, level = 0, hasGutter = this._gutter, canvasDom = this._canvas, gutterCanvasDom, updateRow;

                        var fragment = document.createDocumentFragment();
                        var gutterFragment = null;
                        if (hasGutter) {
                            gutterCanvasDom = this._gutter;
                            gutterFragment = document.createDocumentFragment();
                        }

                        var existingRows = this._rows;
                        var newRows = {};
                        this._rows = newRows;

                        var visibleRowCount = visibleRange.length;
                        for (var i = 0; i < visibleRowCount; i++) {
                            var range = visibleRange[i];
                            var rowIndex = range.rowIndex;
                            var dataIndex = range.dataIndex;

                            var row = existingRows[dataIndex];
                            if (row) {
                                updateRow = (row.rowIndex !== rowIndex);
                                if (updateRow) {
                                    row.rowIndex = rowIndex;
                                } else {
                                    updateRow = row.isDirty;
                                    delete row.isDirty;
                                }

                                if (includeNonDirtyRows) {
                                    updateRow = true;
                                }

                                delete existingRows[dataIndex];
                            } else {
                                updateRow = true;
                                var rowElement = this.createElementWithClass("div", "grid-row grid-row-normal");
                                rowElement.id = "row_" + this._getId() + "_" + rowIndex;
                                fragment.appendChild(rowElement);

                                var rowInfo = { rowIndex: rowIndex, dataIndex: dataIndex, row: rowElement };

                                if (hasGutter) {
                                    var gutterRowElement = this.createElementWithClass("div", "grid-gutter-row");
                                    gutterFragment.appendChild(gutterRowElement);

                                    this._rowInfoMap[gutterRowElement.uniqueID] = rowInfo;

                                    rowInfo.gutterRow = gutterRowElement;
                                }

                                this._rowInfoMap[rowElement.uniqueID] = rowInfo;
                                row = rowInfo;

                                rowElement.onfocus = this._onFocus.bind(this);
                                rowElement.onblur = this._onBlur.bind(this);
                                rowElement.ondblclick = this._onToggle.bind(this, rowInfo);
                            }

                            newRows[dataIndex] = row;

                            if (updateRow) {
                                if (states) {
                                    expandedState = states[dataIndex];
                                    level = levels[dataIndex];
                                }

                                this._updateRow(row, rowIndex, dataIndex, expandedState, level);
                            }
                        }

                        for (var existingRowIdx in existingRows) {
                            row = existingRows[existingRowIdx];

                            if (hasGutter) {
                                delete this._rowInfoMap[row.gutterRow.uniqueID];
                                row.gutterRow.parentElement.removeChild(row.gutterRow);
                            }

                            delete this._rowInfoMap[row.row.uniqueID];
                            row.row.parentElement.removeChild(row.row);
                        }

                        canvasDom.appendChild(fragment);
                        if (hasGutter) {
                            gutterCanvasDom.appendChild(gutterFragment);
                        }
                    };

                    GridControl.prototype._setSortOrderClass = function (element, sortOrder) {
                        if (sortOrder === "asc") {
                            element.classList.remove("descending");
                            element.classList.add("ascending");
                        } else if (sortOrder === "desc") {
                            element.classList.remove("ascending");
                            element.classList.add("descending");
                        } else if (sortOrder === "none") {
                            element.classList.remove("ascending");
                            element.classList.remove("descending");
                        }
                    };

                    GridControl.prototype._updateRow = function (rowInfo, rowIndex, dataIndex, expandedState, level) {
                        var indentIndex = this._indentIndex;

                        if (this._gutter) {
                            var gutterOptions = this._options.gutter;

                            var gutterRowElem = rowInfo.gutterRow;
                            gutterRowElem.style.top = (rowIndex * this._measurements.rowHeight) + "px";
                            gutterRowElem.style.left = "0px";
                            gutterRowElem.style.width = (this._measurements.gutterWidth) + "px";
                            gutterRowElem.style.height = (this._measurements.rowHeight) + "px";

                            gutterRowElem.innerHTML = "";

                            if (gutterOptions.checkbox) {
                                var gutterCheckbox = this.createElementWithClass("input", "checkbox " + (gutterOptions.checkbox.cssClass || ""));
                                gutterCheckbox.setAttribute("type", "checkbox");
                                var gutterCheckboxCellElem = this.createElementWithClass("div", "grid-gutter-cell grid-gutter-checkbox");
                                gutterCheckboxCellElem.appendChild(gutterCheckbox[0]);
                                gutterRowElem.appendChild(gutterCheckboxCellElem);
                            }

                            if (gutterOptions.icon) {
                                var gutterIconCss = "grid-gutter-cell grid-gutter-icon ";

                                if (typeof gutterOptions.icon.cssClass !== "undefined") {
                                    gutterIconCss += gutterOptions.icon.cssClass + " ";
                                }

                                if (typeof gutterOptions.icon.index !== "undefined") {
                                    gutterIconCss += (this.getColumnValue(dataIndex, gutterOptions.icon.index, -1) || "") + " ";
                                }

                                if (gutterOptions.icon.gutterIconCssCallback) {
                                    gutterIconCss += (gutterOptions.icon.gutterIconCssCallback(dataIndex, this._dataSource) || "");
                                }

                                var gutterIconElem = this.createElementWithClass("div", gutterIconCss);

                                if (gutterOptions.getTooltip) {
                                    var toolTip = gutterOptions.getTooltip(dataIndex, this._dataSource);
                                    if (toolTip) {
                                        GridControl._setTooltip(gutterIconElem, toolTip, 16);
                                    }
                                }

                                gutterRowElem.appendChild(gutterIconElem);
                            }

                            this._drawGutterCell(rowInfo, rowIndex, dataIndex, expandedState, level);
                        }

                        var rowElement = rowInfo.row;
                        rowElement.innerHTML = "";
                        rowElement.style.top = (rowIndex * this._measurements.rowHeight) + "px";
                        rowElement.style.left = this._measurements.gutterWidth + "px";
                        rowElement.style.height = (this._measurements.rowHeight) + "px";
                        rowElement.style.width = isNaN(this._contentSize.width) ? "" : (this._contentSize.width + 2) + "px";

                        var columns = this._columns;

                        for (var i = 0, columnsLength = columns.length; i < columnsLength; i++) {
                            var column = columns[i];
                            if (column.hidden) {
                                continue;
                            }

                            var cellElement = column.getCellContents(rowInfo, dataIndex, expandedState, level, column, indentIndex, i);
                            if (cellElement) {
                                rowElement.appendChild(cellElement);
                            }
                        }

                        GridControl.makeElementUnselectable(rowElement);
                        if (this._gutter) {
                            GridControl.makeElementUnselectable(gutterRowElem);
                        }

                        this._updateRowSelectionStyle(rowInfo, this._selectedRows, this._selectedIndex);

                        rowElement.removeEventListener("DOMAttrModified", this._onAriaExpandedModifiedHandler);
                        if (expandedState !== 0) {
                            rowElement.setAttribute("aria-expanded", expandedState > 0 ? "true" : "false");
                            rowElement.addEventListener("DOMAttrModified", this._onAriaExpandedModifiedHandler);
                        }
                    };

                    GridControl.prototype._drawGutterCell = function (rowInfo, rowIndex, dataIndex, expandedState, level) {
                    };

                    GridControl.prototype._drawCell = function (rowInfo, dataIndex, expandedState, level, column, indentIndex, columnOrder) {
                        var width = column.width || 20, href, value;

                        var cellElement = this.createElementWithClass("div", "grid-cell");
                        cellElement.style.width = isNaN(width) ? String(width) : width + "px";

                        var item = this._dataSource[dataIndex];
                        var tooltip;
                        var hasMoreTextEnabled = !!(column.hasMoreColumn && item && item.hasMoreText);

                        if (column.cellDecorator && !hasMoreTextEnabled) {
                            var dataItem = this._dataSource[dataIndex];
                            column.cellDecorator(cellElement, dataItem);
                        } else {
                            if (hasMoreTextEnabled) {
                                href = this._onHasMoreClick.bind(this, item);
                                value = item.hasMoreText;
                            } else {
                                if (typeof column.hrefIndex !== "undefined") {
                                    href = this.getColumnValue(dataIndex, column.hrefIndex, -1);
                                }

                                value = this.getColumnText(dataIndex, column, columnOrder);
                                tooltip = this.getColumnText(dataIndex, column, columnOrder, true);
                            }

                            if (!column.hasHTMLContent) {
                                GridControl._setTooltip(cellElement, tooltip ? tooltip : value, 65);
                            }

                            if (href) {
                                var link = document.createElement("a");
                                if (typeof href === "function") {
                                    link.onclick = href;
                                } else {
                                    link.setAttribute("href", href);
                                }

                                link.textContent = value;
                                cellElement.appendChild(link);
                            } else {
                                if (value) {
                                    if (column.hasHTMLContent) {
                                        cellElement.innerHTML = value;
                                    } else {
                                        cellElement.textContent = value;
                                    }
                                } else {
                                    cellElement.innerHTML = "&nbsp;";
                                }
                            }
                        }

                        if (columnOrder === indentIndex && level > 0) {
                            var indent = ((level * 16) - 13);
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

                            cellElement.style.textIndent = (level * 16) + "px";
                        }

                        if (column.getCellCSSClass) {
                            var cellStyle = column.getCellCSSClass(dataIndex, column.index, columnOrder, this._dataSource);
                            if (cellStyle) {
                                var styles = cellStyle.trim().split(" ");
                                for (var index = 0; index < styles.length; index++) {
                                    cellElement.classList.add(styles[index]);
                                }
                            }
                        }

                        if (column.rowCss) {
                            cellElement.classList.add(column.rowCss);
                        }

                        return cellElement;
                    };

                    GridControl.prototype._drawHeader = function () {
                        var _this = this;
                        var columns = this._columns, sortOrder = this._sortOrder;

                        if (this._header) {
                            var fragment = document.createDocumentFragment();

                            for (var i = 0, l = columns.length; i < l; i++) {
                                var column = columns[i];
                                if (column.hidden) {
                                    continue;
                                }

                                var headerElement = this.createElementWithClass("div", "grid-header-column");

                                GridControl._setTooltip(headerElement, column.tooltip, 65);

                                headerElement.style.width = (column.width || 20) + "px";
                                headerElement._data = { columnIndex: i, header: true };

                                var seperatorElement = this.createElementWithClass("div", "separator");
                                if (column.fixed) {
                                    seperatorElement.style.cursor = "auto";
                                }

                                seperatorElement._data = { columnIndex: i, separator: true };
                                headerElement.appendChild(seperatorElement);

                                var headerCellElement = column.getHeaderCellContents(column, i);

                                if (column.headerCss) {
                                    headerCellElement.classList.add(column.headerCss);
                                }

                                if (column.tooltip) {
                                    GridControl._setTooltip(headerCellElement, column.tooltip, 65);
                                }

                                headerElement.appendChild(headerCellElement);

                                var sortElement = this.createElementWithClass("div", "sort-handle");

                                sortOrder.forEach(function (element, index, array) {
                                    if (element.index === column.index) {
                                        _this._setSortOrderClass(headerElement, element.order);

                                        return false;
                                    }
                                });

                                this.setGutterHeaderSortOrder();

                                headerElement.appendChild(sortElement);

                                fragment.appendChild(headerElement);
                            }

                            this._headerCanvas.innerHTML = "";
                            this._headerCanvas.appendChild(fragment);

                            GridControl.makeElementUnselectable(this._header);
                        }
                    };

                    GridControl.prototype._drawHeaderCellValue = function (column, columnOrder) {
                        var cellElement = document.createElement("div");
                        cellElement.classList.add("title");
                        cellElement.innerText = column.text || "";

                        if (columnOrder === this._indentIndex && !(typeof this._indentLevels === "undefined" || this._indentLevels === null)) {
                            cellElement.classList.add("indented-title");
                        }

                        return cellElement;
                    };

                    GridControl.prototype._layoutContentSpacer = function () {
                        var width = 0, columns = this._columns;

                        for (var i = 0, l = columns.length; i < l; i++) {
                            if (columns[i].hidden) {
                                continue;
                            }

                            width += (columns[i].width || 20) + this._measurements.cellOffset;
                        }

                        width = width + 2;
                        var height = Math.max(1, this._expandedCount * this._measurements.rowHeight);

                        this._contentSpacer.style.width = width + "px";
                        this._contentSpacer.style.height = height + "px";

                        if (this._gutter) {
                            this._gutter.style.height = height + "px";
                        }

                        this._ignoreScroll = true;
                        try  {
                            var scrollTop = Math.max(0, Math.min(this._scrollTop, height - this._canvasHeight));

                            if (scrollTop !== this._scrollTop) {
                                this._scrollTop = scrollTop;
                                this._canvas.scrollTop = scrollTop;
                            }

                            var scrollLeft = Math.max(0, Math.min(this._scrollLeft, width - this._canvasWidth));

                            if (scrollLeft !== this._scrollLeft) {
                                this._scrollLeft = scrollLeft;
                                this._canvas.scrollLeft = scrollLeft;
                            }
                        } finally {
                            this._ignoreScroll = false;
                        }

                        this._contentSize.width = width;
                        this._contentSize.height = height;
                    };

                    GridControl.prototype._layoutHeader = function () {
                        if (this._header) {
                            this._headerCanvas.style.left = this._measurements.gutterWidth - this._scrollLeft + "px";
                        }

                        if (this._gutter) {
                            this._gutter.style.left = this._scrollLeft + "px";
                        }
                    };

                    GridControl.prototype._fixScrollPos = function () {
                        var oldIgnoreScroll = this._ignoreScroll;
                        this._ignoreScroll = true;
                        try  {
                            this._canvas.scrollLeft = this._scrollLeft;
                            this._canvas.scrollTop = this._scrollTop;
                        } finally {
                            this._ignoreScroll = oldIgnoreScroll;
                        }
                    };

                    GridControl.prototype._redraw = function (includeNonDirtyRows) {
                        this._layoutHeader();
                        this._updateViewport(includeNonDirtyRows);
                    };

                    GridControl.prototype._getExpandState = function (dataIndex) {
                        var result = 0;
                        if (this._expandStates) {
                            if (typeof (this._expandStates[dataIndex]) === "number") {
                                result = this._expandStates[dataIndex];
                            }
                        }

                        return result;
                    };

                    GridControl.prototype._selectRow = function (rowIndex, dataIndex, options) {
                        var ctrl = options && options.ctrl, shift = options && options.shift, rightClick = options && options.rightClick;

                        if (ctrl) {
                            this._addSelection(rowIndex, dataIndex, { toggle: true });
                        } else if (shift) {
                            this._clearSelection();
                            this._addSelectionRange(rowIndex, dataIndex);
                        } else if (rightClick) {
                            if (!this._selectedRows || !(this._selectedRows.hasOwnProperty(rowIndex))) {
                                this._clearSelection();
                                this._addSelection(rowIndex, dataIndex);
                            } else {
                                this._selectedIndex = rowIndex;
                                this._updateAriaAttribute();
                            }
                        } else {
                            this._clearSelection();
                            this._addSelection(rowIndex, dataIndex);
                        }
                    };

                    GridControl.prototype._selectAll = function () {
                        if (this._count > 0 && this._options.allowMultiSelect !== false) {
                            this._clearSelection();
                            this._selectionStart = 0;

                            var prevIndex = Math.max(0, this._selectedIndex);
                            this._addSelectionRange(this._count - 1, undefined, { doNotFireEvent: true });

                            this._selectedIndex = prevIndex;

                            this._updateSelectionStyles();
                            this._selectionChanged();
                        }
                    };

                    GridControl.prototype._clearSelection = function () {
                        this._selectionCount = 0;
                        this._selectedRows = null;
                    };

                    GridControl.prototype._addSelection = function (rowIndex, dataIndex, options) {
                        var keepSelectionStart = options && options.keepSelectionStart, doNotFireEvent = options && options.doNotFireEvent, toggle = options && options.toggle;

                        if (this._options.allowMultiSelect === false) {
                            keepSelectionStart = false;
                            this._clearSelection();
                        }

                        if (!this._selectedRows) {
                            this._selectedRows = {};
                        }

                        if (rowIndex >= 0) {
                            var add = true;

                            if (!(this._selectedRows.hasOwnProperty(rowIndex))) {
                                this._selectionCount++;
                            } else if (toggle) {
                                add = false;
                                this._selectionCount = Math.max(0, this._selectionCount - 1);
                                delete this._selectedRows[rowIndex];
                            }

                            if (typeof (dataIndex) !== "number") {
                                dataIndex = this._getDataIndex(rowIndex);
                            }

                            if (add) {
                                this._selectedRows[rowIndex] = dataIndex;
                            }

                            this._selectedIndex = rowIndex;
                            this._updateAriaAttribute();

                            if (this._selectionStart < 0 || !keepSelectionStart) {
                                this._selectionStart = rowIndex;
                            }
                        } else {
                            dataIndex = -1;
                            this._selectedIndex = -1;
                        }

                        if (!doNotFireEvent) {
                            this._updateSelectionStyles();
                            this._selectionChanged();

                            this._selectedIndexChanged(this._selectedIndex, dataIndex);
                        }
                    };

                    GridControl.prototype._addSelectionRange = function (rowIndex, dataIndex, options) {
                        var doNotFireEvent = options && options.doNotFireEvent, prevSelectedDataIndex = -1, selectedDataIndex;

                        if (this._options.allowMultiSelect === false) {
                            this._addSelection(rowIndex, dataIndex);
                        } else {
                            if (this._selectedRows) {
                                prevSelectedDataIndex = this._selectedRows[this._selectedIndex];
                            }

                            if (this._selectionStart < 0) {
                                this._selectionStart = rowIndex;
                            }

                            var start = Math.min(this._selectionStart, rowIndex);
                            var end = Math.max(this._selectionStart, rowIndex);

                            if (typeof (dataIndex) !== "number" || start !== rowIndex) {
                                dataIndex = this._getDataIndex(start);
                            }

                            for (var i = start; i <= end; i++) {
                                this._addSelection(i, dataIndex, { keepSelectionStart: true, doNotFireEvent: true });
                                if (i === rowIndex) {
                                    selectedDataIndex = dataIndex;
                                }

                                var nodeState = this._getExpandState(dataIndex);
                                if (nodeState < 0) {
                                    dataIndex += (1 - nodeState);
                                } else {
                                    dataIndex++;
                                }
                            }

                            this._selectedIndex = rowIndex;
                            this._updateAriaAttribute();

                            if (!doNotFireEvent) {
                                this._updateSelectionStyles();
                                this._selectionChanged();

                                if (prevSelectedDataIndex !== selectedDataIndex) {
                                    this._selectedIndexChanged(this._selectedIndex, selectedDataIndex);
                                }
                            }
                        }
                    };

                    GridControl.prototype._updateAriaAttribute = function () {
                        var dataIndex = this._getDataIndex(this._selectedIndex);
                        if (dataIndex >= 0) {
                            var rowInfo = this.getRowInfo(dataIndex);
                            if (!rowInfo || !rowInfo.row) {
                                this._updateAriaOnViewportUpdate = true;
                            } else {
                                var id = rowInfo.row.getAttribute("id");
                                if (id !== this._activeAriaId) {
                                    var ariaLabel = this._getAriaLabelForRow(rowInfo);
                                    rowInfo.row.setAttribute("aria-label", ariaLabel);
                                    this._activeAriaId = id;
                                }

                                try  {
                                    if (this._canvasContainsFocus) {
                                        rowInfo.row.setActive();
                                    } else {
                                        rowInfo.row.focus();
                                    }
                                } catch (err) {
                                }
                            }
                        }
                    };

                    GridControl.prototype._getAriaLabelForRow = function (rowInfo) {
                        var ariaLabel = "";

                        var rowIndex = rowInfo.rowIndex;
                        var dataIndex = rowInfo.dataIndex;

                        var expandedState = 0, level = 0;
                        if (this._expandStates) {
                            expandedState = this._expandStates[dataIndex];
                            level = this._indentLevels[dataIndex];
                        }

                        if (this._gutter) {
                            var gutterOptions = this._options.gutter;
                            if (gutterOptions.getTooltip) {
                                var toolTip = gutterOptions.getTooltip(dataIndex, this._dataSource);
                                if (toolTip) {
                                    if (ariaLabel) {
                                        ariaLabel += ", ";
                                    }

                                    ariaLabel += toolTip;
                                }
                            }
                        }

                        var columns = this._columns;

                        for (var i = 0, l = columns.length; i < l; i++) {
                            var column = columns[i];
                            if (column.hidden) {
                                continue;
                            }

                            var cellText = this.getColumnText(dataIndex, column, i);

                            if (ariaLabel) {
                                ariaLabel += ", ";
                            }

                            ariaLabel += cellText;
                        }

                        return ariaLabel;
                    };

                    GridControl.prototype._updateSelectionStyles = function () {
                        var _this = this;
                        if (this._delayedUpdateCookie) {
                            window.clearTimeout(this._delayedUpdateCookie);
                        }

                        this._delayedUpdateCookie = window.setTimeout(function () {
                            var dataIndex, selectedRows = _this._selectedRows, focusIndex = _this._selectedIndex, rows = _this._rows;

                            for (dataIndex in rows) {
                                var rowInfo = rows[dataIndex];
                                _this._updateRowSelectionStyle(rowInfo, selectedRows, focusIndex);
                            }
                        }, 10);
                    };

                    GridControl.prototype._selectionChanged = function () {
                        this.selectionChanged(this._selectedIndex, this._selectionCount, this._selectedRows);

                        this.fireCustomEvent(this._element, "selectionchanged", [{ selectedIndex: this._selectedIndex, selectedCount: this._selectionCount, selectedRows: this._selectedRows }]);
                    };

                    GridControl.prototype._selectedIndexChanged = function (selectedRowIndex, selectedDataIndex) {
                        this.selectedIndexChanged(selectedRowIndex, selectedDataIndex);

                        this.fireCustomEvent(this._element, GridControl.EVENT_SELECTED_INDEX_CHANGED, [selectedRowIndex, selectedDataIndex]);
                    };

                    GridControl.prototype._updateRowSelectionStyle = function (rowInfo, selectedRows, focusIndex) {
                        var rowIndex = rowInfo.rowIndex;
                        var rowElement = rowInfo.row;
                        var gutterElement = rowInfo.gutterRow;

                        rowElement.classList.remove("grid-row-selected");
                        rowElement.classList.remove("grid-row-selected-blur");
                        rowElement.classList.remove("grid-row-current");
                        if (gutterElement) {
                            var checkbox = gutterElement.querySelector("input.checkbox");

                            if (checkbox) {
                                checkbox.setAttribute("checked", String(false));
                            }
                        }

                        if (selectedRows && selectedRows.hasOwnProperty(rowIndex)) {
                            if (gutterElement) {
                                var checkbox = gutterElement.querySelector("input.checkbox");

                                if (checkbox) {
                                    checkbox.setAttribute("checked", String(false));
                                }
                            }

                            if (this._active) {
                                rowElement.classList.add("grid-row-selected");
                            } else {
                                rowElement.classList.add("grid-row-selected-blur");
                            }
                        }

                        if (rowIndex === focusIndex) {
                            rowElement.classList.add("grid-row-current");
                            if (this._rowSelectedCallback) {
                                this._rowSelectedCallback();
                            }
                        }
                    };

                    GridControl.prototype._measureCanvasSize = function () {
                        this._canvasHeight = this._canvas.clientHeight;
                        this._canvasWidth = this._canvas.clientWidth;
                    };

                    GridControl.prototype._onContainerResize = function (e) {
                        this.layout();
                    };

                    GridControl.prototype._setupMoveEvents = function () {
                        var _this = this;
                        document.addEventListener("mousemove", function (e) {
                            return _this._onDocumentMouseMove(e);
                        });
                        document.addEventListener("mouseup", function (e) {
                            return _this._onDocumentMouseUp(e);
                        });
                    };

                    GridControl.prototype._clearMoveEvents = function () {
                        document.removeEventListener("mousemove", null, true);
                        document.removeEventListener("mouseup", null, true);
                    };

                    GridControl.prototype._onDocumentMouseMove = function (e) {
                        var columnSizing = this._columnSizing;

                        if (columnSizing && columnSizing.active === true) {
                            var delta = e.pageX - columnSizing.origin;
                            var newWidth = Math.max(15, columnSizing.originalWidth + delta);
                            var column = this._columns[columnSizing.index];
                            column.width = newWidth;

                            this._applyColumnSizing(columnSizing.index);
                            this._moveSizingElement(columnSizing.index);
                        }
                    };

                    GridControl.prototype._onDocumentMouseUp = function (e) {
                        var _this = this;
                        window.setTimeout(function () {
                            _this._tryFinishColumnSizing(false);
                        }, 0);

                        return false;
                    };

                    GridControl.prototype._onHeaderMouseDown = function (e) {
                        if (e.which !== 1) {
                            return true;
                        }

                        var separator = this.findClosestElement(e.target, ".separator");

                        if (separator && separator._data) {
                            var columnIndex = separator._data.columnIndex;
                            var column = this._columns[columnIndex];
                            if (!column.fixed) {
                                this._columnSizing = new ColumnSizing(true, columnIndex, column.width, e.pageX);
                                this._moveSizingElement(columnIndex);

                                this._setupMoveEvents();

                                e.stopImmediatePropagation();
                                e.preventDefault();
                                return false;
                            }
                        }
                    };

                    GridControl.prototype._onHeaderMouseUp = function (e) {
                        return false;
                    };

                    GridControl.prototype._onHeaderClick = function (e) {
                        var headerColumn = this.findClosestElement(e.target, ".grid-header-column");

                        if (headerColumn) {
                            if (!this._columnSizing) {
                                var separator = this.findClosestElement(e.target, ".separator");

                                if (separator && separator._data) {
                                    return false;
                                } else if (headerColumn._data) {
                                    var columnIndex = headerColumn._data.columnIndex;
                                    var column = this._columns[columnIndex];
                                    if (column.canSortBy && !column.fixed) {
                                        this._sortBy(column, e.shiftKey);
                                    }
                                }
                            }
                        }
                    };

                    GridControl.prototype._onHeaderDblClick = function (e) {
                        var separator = this.findClosestElement(e.target, ".separator");

                        if (separator && separator._data) {
                            this._tryFinishColumnSizing(true);

                            var columnIndex = separator._data.columnIndex;
                            var column = this._columns[columnIndex];

                            var maxLength = Math.max(column.maxLength || 0, 3);
                            var ratio = 1.1 + 0.7 * Math.exp(-maxLength / 20);
                            var originalWidth = column.width;
                            column.width = (column.indentOffset || 0) + Math.round(maxLength * ratio * this._measurements.unitEx);
                            this._applyColumnSizing(columnIndex, originalWidth, true);

                            return false;
                        }
                    };

                    GridControl.prototype._onHasMoreClick = function (hasMoreItem) {
                        var _this = this;
                        var parentItem;
                        var parentIndex;
                        var hasMoreIndex;

                        for (var i = 0; i < this._dataSource.length; i++) {
                            if (this._dataSource[i] === hasMoreItem) {
                                hasMoreIndex = i;
                                break;
                            }
                        }

                        if (typeof hasMoreIndex === "undefined") {
                            return;
                        }

                        if (hasMoreIndex < this._expandStates.length) {
                            for (var i = hasMoreIndex - 1; i >= 0; i--) {
                                var expandState = Math.abs(this._expandStates[i]);
                                if (expandState >= hasMoreIndex - i) {
                                    parentIndex = i;
                                    break;
                                }
                            }
                        }

                        if (typeof parentIndex === "undefined") {
                            return;
                        }

                        parentItem = this._dataSource[parentIndex];
                        var expansionPath = this.getExpansionPath(parentIndex);
                        this._getLoadMoreChildDataCallback(parentItem, expansionPath, function (dynamicData, hasMoreText) {
                            if (dynamicData !== null) {
                                _this._adjustForDynamicData(dynamicData.itemsWithPlaceholders, dynamicData.expandStates, parentIndex, hasMoreIndex, hasMoreText);
                            }
                        });
                    };

                    GridControl.prototype._moveSizingElement = function (columnIndex) {
                        var left = this._measurements.gutterWidth;

                        if (!this._sizingElement) {
                            if (columnIndex < 0) {
                                return;
                            }

                            this._sizingElement = this.createElementWithClass("div", "grid-column-sizing");
                            this._canvas.appendChild(this._sizingElement);
                        }

                        this._sizingElement.style.height = (this._canvas.clientHeight - 1) + "px";
                        this._sizingElement.style.top = this._scrollTop + "px";

                        if (columnIndex < 0) {
                            this._sizingElement.style.left = "-5000px";
                            this._sizingElement.style.top = "-5000px";
                            this._sizingElement.style.height = 0 + "px";
                        } else {
                            var i = 0;
                            while (i <= columnIndex) {
                                var column = this._columns[i++];
                                if (!column.hidden) {
                                    left += column.width;
                                }
                            }

                            this._sizingElement.style.left = (left - 1) + "px";
                        }
                    };

                    GridControl.prototype._getVisibleColumnIndex = function (columnIndex) {
                        var columnCounter = 0, visibleColumnIndex = 0, length = this._columns.length;

                        if (this._columns[columnIndex].hidden) {
                            return -1;
                        }

                        while (columnCounter < columnIndex) {
                            if (!this._columns[columnCounter].hidden) {
                                visibleColumnIndex++;
                            }

                            columnCounter++;
                        }

                        return visibleColumnIndex;
                    };

                    GridControl.prototype._applyColumnSizing = function (columnIndex, initialWidth, finish) {
                        var domColumnIndex = this._getVisibleColumnIndex(columnIndex) + 1, column = this._columns[columnIndex], columnSizeChanged = false;

                        initialWidth = initialWidth || -1;

                        if (column) {
                            columnSizeChanged = column.width !== initialWidth;

                            var columnDiv = this.rootElement.querySelector(".grid-header-canvas .grid-header-column:nth-child(" + domColumnIndex + ")");
                            columnDiv.style.width = column.width + "px";
                        }

                        if (finish === true) {
                            if (columnSizeChanged) {
                                this.layout();
                            }

                            this._onColumnResize(column);
                        }
                    };

                    GridControl.prototype._onColumnResize = function (column) {
                        this.fireCustomEvent(this._element, "columnresize", [column]);
                    };

                    GridControl.prototype._tryFinishColumnSizing = function (cancel) {
                        var columnSizing = this._columnSizing;
                        if (columnSizing) {
                            if (columnSizing.active === true) {
                                if (!cancel) {
                                    this._applyColumnSizing(columnSizing.index, columnSizing.originalWidth, true);
                                }

                                this._moveSizingElement(-1);
                            }

                            this._columnSizing = null;

                            this._clearMoveEvents();
                        }
                    };

                    GridControl.prototype._getSortColumns = function (sortOrder) {
                        var columns = this._columns, sortColumns = [];

                        for (var i = 0, l = sortOrder.length; i < l; i++) {
                            var c;
                            var sc = sortOrder[i];
                            columns.forEach(function (element, index, array) {
                                if (element.index === sc.index) {
                                    c = element;
                                    return false;
                                }
                            });

                            sortColumns.push(c);
                        }

                        return sortColumns;
                    };

                    GridControl.prototype._sortBy = function (column, add) {
                        var sortOrder = this._sortOrder.slice(0), found = false;

                        if (column) {
                            for (var i = 0, l = sortOrder.length; i < l; i++) {
                                var sc = sortOrder[i];
                                if (sc.index === column.index) {
                                    sortOrder.splice(i, 1);
                                    found = true;
                                    break;
                                }
                            }

                            var sc;
                            if (found) {
                                sc = new SortOrderInfo(sc.index, sc.order === "asc" ? "desc" : "asc");
                            } else {
                                sc = new SortOrderInfo(column.index, "asc");
                            }

                            if (add && this._options.allowSortOnMultiColumns) {
                                sortOrder.push(sc);
                            } else {
                                sortOrder = [sc];
                            }
                        }

                        var sortColumns = this._getSortColumns(sortOrder);

                        this._onSort(sortOrder, sortColumns);
                    };

                    GridControl.prototype._onSort = function (sortOrder, sortColumns) {
                        if (this.onSort(sortOrder, sortColumns) !== false) {
                            this.fireCustomEvent(this._element, "sort", [{ sortOrder: sortOrder, sortColumns: sortColumns }]);
                        }
                    };

                    GridControl.prototype._trySorting = function (sortOrder, sortColumns) {
                        var _this = this;
                        if (!sortColumns) {
                            sortColumns = this._getSortColumns(sortOrder);
                        }

                        var selectedDatas = [], sumOfSelectedRowIndices = 0;

                        for (var rowIndex in this._selectedRows) {
                            var dataIndex = this._selectedRows[rowIndex];
                            var data = this._dataSource[dataIndex];
                            if (data) {
                                selectedDatas.push(data);
                                sumOfSelectedRowIndices += parseInt(rowIndex);
                            }
                        }

                        var rootNode = new TreeNode(null, null);
                        GridControl.addItemsToTree(this._dataSource, this._expandStates, 0, this._dataSource.length, rootNode);

                        if (this._sortOrder && this._sortOrder.length === 1 && sortOrder.length === 1 && this._sortOrder[0] !== sortOrder[0] && this._sortOrder[0].index === sortOrder[0].index) {
                            if (this._sortOrder[0].order !== sortOrder[0].order) {
                                GridControl.walkTree(rootNode, function (node) {
                                    Utility.TreeNodeSort.stableReverse(node.children, function (v1, v2) {
                                        return Utility.TreeNodeSort.sortComparer(sortOrder, sortColumns, v1.data, v2.data);
                                    });
                                });
                            }
                        } else {
                            GridControl.walkTree(rootNode, function (node) {
                                node.children.sort(function (v1, v2) {
                                    return Utility.TreeNodeSort.sortComparer(sortOrder, sortColumns, v1.data, v2.data);
                                });
                            });
                        }

                        this._dataSource = [];
                        this._expandStates = [];
                        for (var i = 0; i < rootNode.children.length; i++) {
                            GridControl.walkTree(rootNode.children[i], function (node) {
                                _this._dataSource.push(node.data);
                                _this._expandStates.push(node.expandState);
                            });
                        }

                        this._indentLevels = GridControl.expand(this._expandStates);
                        this._updateRanges();

                        if (this._selectionCount > 0) {
                            this._clearSelection();

                            var sumOfNewSelectedRowIndices = 0;
                            for (var i = 0; i < selectedDatas.length; i++) {
                                var dataIndex = this._dataSource.indexOf(selectedDatas[i]);
                                if (dataIndex >= 0) {
                                    var dataRowIndex = this._getRowIndex(dataIndex);
                                    this._addSelection(dataRowIndex, dataIndex);
                                    sumOfNewSelectedRowIndices += dataRowIndex;
                                }
                            }

                            this._scrollTop += (sumOfNewSelectedRowIndices - sumOfSelectedRowIndices) / this._selectionCount * this._measurements.rowHeight;
                        }
                    };

                    GridControl.prototype._onCanvasScroll = function (e) {
                        var canvas = this._canvas;
                        this._resetScroll = true;
                        this._scrollLeft = canvas.scrollLeft;
                        this._scrollTop = canvas.scrollTop;

                        if (!this._ignoreScroll) {
                            this._redraw();
                        }

                        return false;
                    };

                    GridControl.prototype._getClickedCell = function (e) {
                        return this.findClosestElement(e.target, ".grid-cell");
                    };

                    GridControl.prototype._createEditCellBox = function (rowDataIndex, columnIndex, editElement, editCallback) {
                        var previousValue = editElement.innerText;
                        var editBox = this.createElementWithClass("input", "grid-edit-box");
                        editBox.setAttribute("type", "text");
                        editBox.setAttribute("value", previousValue);

                        function commitValue(e) {
                            var data = editBox.value;
                            editElement.innerText = data;

                            if (editCallback) {
                                editCallback(data, rowDataIndex, columnIndex);
                                e.stopPropagation();
                                e.preventDefault();
                                return false;
                            }
                        }

                        editBox.addEventListener("focusout", function (e) {
                            commitValue(e);
                        });

                        editBox.addEventListener("keydown", function (e) {
                            if (e.keyCode === 13 /* Enter */) {
                                commitValue(e);
                            } else if (e.keyCode === 27 /* Escape */) {
                                editElement.innerText = previousValue;

                                e.stopPropagation();
                                e.preventDefault();
                                return false;
                            }
                        });

                        editElement.innerHTML = "";

                        editElement.appendChild(editBox);

                        editBox.select();
                        editBox.focus();
                    };

                    GridControl.prototype._onEditCell = function (e) {
                        var targetElement = e.target;
                        if (!targetElement.classList.contains("grid-tree-icon")) {
                            var cellElement = this._getClickedCell(e);

                            if (cellElement && cellElement.classList.contains("grid-cell-editable")) {
                                var rowInfo = this.getRowInfoFromEvent(e, ".grid-row");
                                if (rowInfo) {
                                    var cells = rowInfo.row.children;
                                    var totalCells = cells.length;
                                    var columnIndex = -1;

                                    for (var index = 0; index < totalCells; index++) {
                                        if (cellElement === cells[index]) {
                                            columnIndex = index;
                                        }
                                    }

                                    this._createEditCellBox(rowInfo.dataIndex, columnIndex, cellElement, this._editCellCallback);
                                }
                            }
                        }
                    };

                    GridControl.prototype._onRowMouseDown = function (e) {
                        var rowInfo = this.getRowInfoFromEvent(e, ".grid-row");
                        if (rowInfo) {
                            var targetElement = e.target;

                            if (e.which === 1 && targetElement.classList.contains("grid-tree-icon")) {
                                this._onToggle(rowInfo);
                            } else if (!(e.which === 3 && this._options && this._options.disableRightClickSelection)) {
                                this._selectRow(rowInfo.rowIndex, rowInfo.dataIndex, {
                                    ctrl: e.ctrlKey,
                                    shift: e.shiftKey,
                                    rightClick: e.which === 3
                                });
                            }
                        }
                    };

                    GridControl.prototype._onGutterClick = function (e) {
                        var rowInfo = this.getRowInfoFromEvent(e, ".grid-gutter-row");
                        if (rowInfo) {
                            if (!this._selectedRows || typeof (this._selectedRows[rowInfo.rowIndex]) !== "number") {
                                this._selectRow(rowInfo.rowIndex, rowInfo.dataIndex);
                            }
                        }
                    };

                    GridControl.prototype._onBlur = function (e) {
                        var targetElement = e.target;
                        if (targetElement.classList.contains("grid-edit-box")) {
                            e.stopPropagation();
                            return;
                        }

                        this._active = false;
                        this._updateSelectionStyles();
                    };

                    GridControl.prototype._onFocus = function (e) {
                        var targetElement = e.target;
                        if (targetElement.classList.contains("grid-edit-box")) {
                            e.stopPropagation();
                            return;
                        }

                        this._active = true;
                        this._updateSelectionStyles();
                        this._updateAriaAttribute();
                    };

                    GridControl.prototype._onKeyDown = function (e) {
                        var bounds = { lo: -1, hi: -1 }, keyCode = Common.KeyCodes, canvas = this._canvas;

                        if (this._options.isGridDisabled) {
                            return false;
                        }

                        if (this._copyInProgress) {
                            if (e.keyCode === 27 /* Escape */) {
                                if (this._cancelable) {
                                    this._cancelable.cancel();
                                }
                            }

                            return false;
                        }

                        if (this._count > 0) {
                            bounds = { lo: 0, hi: this._expandedCount - 1 };
                        }

                        if (this._selectedIndex < 0) {
                            this._addSelection(bounds.lo);
                        }

                        var bubbleUp = false;
                        switch (e.keyCode) {
                            case 65 /* A */:
                                if (e.ctrlKey) {
                                    this._selectAll();
                                } else {
                                    return true;
                                }

                                break;

                            case 40 /* ArrowDown */:
                                this._clearSelection();
                                if (e.ctrlKey) {
                                    if (e.shiftKey) {
                                        this._addSelectionRange(bounds.hi);
                                    } else {
                                        this._addSelection(bounds.hi);
                                    }
                                } else {
                                    if (e.shiftKey) {
                                        this._addSelectionRange(Math.min(this._selectedIndex + 1, bounds.hi));
                                    } else {
                                        this._addSelection(Math.min(this._selectedIndex + 1, bounds.hi));
                                    }
                                }

                                break;

                            case 38 /* ArrowUp */:
                                this._clearSelection();
                                if (e.ctrlKey) {
                                    if (e.shiftKey) {
                                        this._addSelectionRange(bounds.lo);
                                    } else {
                                        this._addSelection(bounds.lo);
                                    }
                                } else {
                                    if (e.shiftKey) {
                                        this._addSelectionRange(Math.max(this._selectedIndex - 1, bounds.lo));
                                    } else {
                                        this._addSelection(Math.max(this._selectedIndex - 1, bounds.lo));
                                    }
                                }

                                break;

                            case 34 /* PageDown */:
                            case 33 /* PageUp */:
                                var span = canvas.clientHeight;
                                var rowsPerPage = Math.floor(span / this._measurements.rowHeight);

                                this._clearSelection();

                                if (e.keyCode === 34 /* PageDown */) {
                                    if (e.shiftKey) {
                                        this._addSelectionRange(Math.min(this._selectedIndex + rowsPerPage, bounds.hi));
                                    } else {
                                        this._addSelection(Math.min(this._selectedIndex + rowsPerPage, bounds.hi));
                                    }
                                } else {
                                    if (e.shiftKey) {
                                        this._addSelectionRange(Math.max(this._selectedIndex - rowsPerPage, bounds.lo));
                                    } else {
                                        this._addSelection(Math.max(this._selectedIndex - rowsPerPage, bounds.lo));
                                    }
                                }

                                break;

                            case 39 /* ArrowRight */:
                                if (!this.tryToggle(true, e.shiftKey) && this._expandStates[this._getDataIndex(this._selectedIndex)] !== 0) {
                                    this._addSelection(Math.min(this._selectedIndex + 1, bounds.hi));
                                } else {
                                    this._clearSelection();
                                    this._addSelection(this._selectedIndex);
                                }

                                break;

                            case 37 /* ArrowLeft */:
                                if (!this.tryToggle(false, e.shiftKey)) {
                                    var newSelection = this._selectedIndex;

                                    if (this._indentLevels !== null) {
                                        var currIndentLevel = this._indentLevels[this._getDataIndex(this._selectedIndex)];
                                        while (currIndentLevel > 1 && newSelection > bounds.lo && this._indentLevels[this._getDataIndex(newSelection)] >= currIndentLevel) {
                                            --newSelection;
                                        }
                                    }

                                    this._addSelection(Math.max(newSelection, bounds.lo));
                                } else {
                                    this._clearSelection();
                                    this._addSelection(this._selectedIndex);
                                }

                                break;

                            case 36 /* Home */:
                                this._clearSelection();
                                if (e.shiftKey) {
                                    this._addSelectionRange(bounds.lo);
                                } else {
                                    this._addSelection(bounds.lo);
                                }

                                break;

                            case 35 /* End */:
                                this._clearSelection();
                                if (e.shiftKey) {
                                    this._addSelectionRange(bounds.hi);
                                } else {
                                    this._addSelection(bounds.hi);
                                }

                                break;

                            case 9 /* Tab */:
                                if (document.activeElement !== this.getElement()) {
                                    this.getElement().setActive();
                                }

                                bubbleUp = true;
                                break;

                            default:
                                bubbleUp = true;
                        }

                        this.getSelectedRowIntoView();

                        if (!bubbleUp) {
                            e.preventDefault();
                        }

                        return false;
                    };

                    GridControl.prototype._onToggle = function (rowInfo) {
                        if (this._expandStates) {
                            var state = this._expandStates[rowInfo.dataIndex];

                            if (state !== 0) {
                                if (state > 0) {
                                    this.collapseNode(rowInfo.dataIndex);
                                } else if (state < 0) {
                                    this.expandNode(rowInfo.dataIndex);
                                }

                                this._clearSelection();
                                this._addSelection(Math.min(rowInfo.rowIndex, this._expandedCount - 1), rowInfo.dataIndex);
                                this._layoutContentSpacer();
                                this._redraw();
                            }
                        }
                    };
                    GridControl.TYPE_NAME = "GridControl";
                    GridControl.MAX_COPY_SIZE = 1000;
                    GridControl.PAYLOAD_SIZE = 200;
                    GridControl.EVENT_SELECTED_INDEX_CHANGED = "selectedIndexChanged";
                    GridControl.GlobalGridInstanceNumber = 0;
                    return GridControl;
                })(Legacy.Control);
                Grid.GridControl = GridControl;
            })(Legacy.Grid || (Legacy.Grid = {}));
            var Grid = Legacy.Grid;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/controls/gridControl.js.map

// SourceInfoTooltip.ts
var Common;
(function (Common) {
    (function (Controls) {
        (function (Legacy) {
            "use strict";

            var SourceInfoTooltip = (function () {
                function SourceInfoTooltip(sourceInfo, name, nameLabelResourceId) {
                    this._rootContainer = document.createElement("div");
                    this._rootContainer.className = "sourceInfoTooltip";

                    if (name && nameLabelResourceId) {
                        this.addDiv("sourceInfoNameLabel", Plugin.Resources.getString(nameLabelResourceId));
                        this.addDiv("sourceInfoName", name);
                    }

                    this.addDiv("sourceInfoFileLabel", Plugin.Resources.getString("SourceInfoFileLabel"));
                    this.addDiv("sourceInfoFile", sourceInfo.source);

                    this.addDiv("sourceInfoLineLabel", Plugin.Resources.getString("SourceInfoLineLabel"));
                    this.addDiv("sourceInfoLine", Common.FormattingHelpers.getDecimalLocaleString(sourceInfo.line, true));

                    this.addDiv("sourceInfoColumnLabel", Plugin.Resources.getString("SourceInfoColumnLabel"));
                    this.addDiv("sourceInfoColumn", Common.FormattingHelpers.getDecimalLocaleString(sourceInfo.column, true));
                }
                Object.defineProperty(SourceInfoTooltip.prototype, "html", {
                    get: function () {
                        return this._rootContainer.outerHTML;
                    },
                    enumerable: true,
                    configurable: true
                });

                SourceInfoTooltip.prototype.addDiv = function (className, textContent) {
                    var div = document.createElement("div");

                    div.className = className;
                    div.textContent = textContent;

                    this._rootContainer.appendChild(div);
                };
                return SourceInfoTooltip;
            })();
            Legacy.SourceInfoTooltip = SourceInfoTooltip;
        })(Controls.Legacy || (Controls.Legacy = {}));
        var Legacy = Controls.Legacy;
    })(Common.Controls || (Common.Controls = {}));
    var Controls = Common.Controls;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/controls/SourceInfoTooltip.js.map

// Diagnostics.ts
var MemoryAnalyzer;
(function (MemoryAnalyzer) {
    "use strict";

    (function (Diagnostics) {
        var HelperProxy = (function () {
            function HelperProxy() {
                this._proxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.VisualStudio.WebClient.Diagnostics.PerformanceToolHost.Package.Extensions.DiagnosticsHelper", {}, true);
            }
            HelperProxy.prototype.getFileContents = function (filePath) {
                return this._proxy._call("getFileContents", filePath);
            };
            return HelperProxy;
        })();
        Diagnostics.HelperProxy = HelperProxy;

        var HubDiagnosticSession = (function () {
            function HubDiagnosticSession() {
                this._agentGuid = "B9B36E3F-BC87-440C-901E-7FC364FC5BBB";
                this._eventManager = new Plugin.Utilities.EventManager();
                this._isAttached = false;
                this._privatePorts = {};
                this._helper = new HelperProxy();
                this._standardCollector = Microsoft.VisualStudio.DiagnosticsHub.Collectors.getStandardTransportService();

                if (this._standardCollector) {
                    this._standardCollector.addMessageListener(this._agentGuid, this.onMessageReceived.bind(this));
                }
            }
            HubDiagnosticSession.prototype.addEventListener = function (type, listener) {
                this._eventManager.addEventListener(type, listener);
            };

            HubDiagnosticSession.prototype.createPort = function (portName) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1028"));
            };

            HubDiagnosticSession.prototype.isAttached = function () {
                return Plugin.Promise.wrap(this._isAttached);
            };

            HubDiagnosticSession.prototype.loadScriptInProc = function (scriptFileName) {
                var _this = this;
                var baseDir = document.location.href.substring(0, document.location.href.lastIndexOf("/"));
                var filePath = baseDir + "/" + scriptFileName;
                var fileName = HubDiagnosticSession.getFileName(scriptFileName);

                this._helper.getFileContents(filePath).done(function (contents) {
                    var obj = {
                        commandName: "loadScriptInProc",
                        fileName: fileName,
                        script: contents
                    };
                    var message = JSON.stringify(obj);
                    _this.sendMessage(message);
                });
            };

            HubDiagnosticSession.prototype.removeEventListener = function (type, listener) {
                this._eventManager.removeEventListener(type, listener);
            };

            HubDiagnosticSession.getFileName = function (filePath) {
                var index = filePath.lastIndexOf("/");

                if (index == -1) {
                    index = filePath.lastIndexOf("\\");
                }

                if (index > -1) {
                    filePath = filePath.substring(index + 1);
                }

                return filePath;
            };

            HubDiagnosticSession.prototype.createPortInternal = function (portName) {
                var _this = this;
                if (this._privatePorts.hasOwnProperty(portName)) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1029"));
                }

                var internalData = {
                    isConnected: false,
                    eventManager: new Plugin.Utilities.EventManager()
                };

                var port = {
                    name: portName,
                    postMessage: function (data) {
                        if (internalData.isConnected) {
                            var obj = {
                                commandName: "message",
                                portName: portName,
                                jsonData: data
                            };

                            var message = JSON.stringify(obj);
                            _this.sendMessage(message);
                        } else {
                            throw new Error(Plugin.Resources.getErrorString("JSPerf.1030"));
                        }
                    },
                    addEventListener: internalData.eventManager.addEventListener.bind(internalData.eventManager),
                    removeEventListener: internalData.eventManager.removeEventListener.bind(internalData.eventManager)
                };

                var privatePort = { internalData: internalData, port: port };
                this._privatePorts[portName] = privatePort;
                return privatePort;
            };

            HubDiagnosticSession.prototype.onMessageReceived = function (message) {
                if (message) {
                    var obj = JSON.parse(message);
                    var args = null;
                    if (obj.eventName) {
                        switch (obj.eventName) {
                            case "attach":
                                this._isAttached = true;
                                this._eventManager.dispatchEvent(obj.eventName);
                                break;

                            case "connect":
                                var connectEvent = obj;

                                if (!connectEvent.portName) {
                                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1031"));
                                }

                                var privatePort = this.createPortInternal(connectEvent.portName);
                                privatePort.internalData.isConnected = true;
                                this._eventManager.dispatchEvent(obj.eventName, privatePort.port);
                                break;

                            case "detach":
                                this._isAttached = false;
                                this._eventManager.dispatchEvent(obj.eventName);
                                break;

                            case "message":
                                args = obj;

                                if (!args.portName) {
                                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1032"));
                                }

                                var privatePort = this._privatePorts[args.portName];
                                if (privatePort) {
                                    args = { data: args.jsonData };
                                    privatePort.internalData.eventManager.dispatchEvent("message", args);
                                }

                                break;
                            default:
                                this._eventManager.dispatchEvent(obj.eventName);
                                break;
                        }
                    }
                }
            };

            HubDiagnosticSession.prototype.sendMessage = function (message) {
                this._standardCollector.sendStringToCollectionAgent(this._agentGuid, message).done(function (response) {
                    if (response) {
                        var obj = JSON.parse(response);

                        if (!obj.succeeded) {
                            throw new Error(obj.errorMessage);
                        }
                    }
                });
            };
            return HubDiagnosticSession;
        })();
        Diagnostics.HubDiagnosticSession = HubDiagnosticSession;

        var F12DiagnosticsSession = (function () {
            function F12DiagnosticsSession(externalObj) {
                this._externalObj = externalObj;
            }
            F12DiagnosticsSession.prototype.addEventListener = function (type, listener) {
                this._externalObj.addEventListener(type, listener);
            };

            F12DiagnosticsSession.prototype.createPort = function (portName) {
                throw new Error(Plugin.Resources.getErrorString("JSPerf.1028"));
            };

            F12DiagnosticsSession.prototype.isAttached = function () {
                return Plugin.Promise.wrap(this._externalObj.isAttached);
            };

            F12DiagnosticsSession.prototype.loadScriptInProc = function (fileName) {
                this._externalObj.loadScriptInProc(fileName);
            };

            F12DiagnosticsSession.prototype.removeEventListener = function (type, listener) {
                this._externalObj.removeEventListener(type, listener);
            };
            return F12DiagnosticsSession;
        })();
        Diagnostics.F12DiagnosticsSession = F12DiagnosticsSession;
    })(MemoryAnalyzer.Diagnostics || (MemoryAnalyzer.Diagnostics = {}));
    var Diagnostics = MemoryAnalyzer.Diagnostics;
})(MemoryAnalyzer || (MemoryAnalyzer = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/Diagnostics.js.map

// enumHelper.ts
var Common;
(function (Common) {
    "use strict";

    var Enum = (function () {
        function Enum() {
        }
        Enum.GetName = function (enumType, value) {
            var result;

            if (enumType) {
                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var enumValue = enumType[enumKey];
                        if (enumValue === value) {
                            result = enumKey;
                            break;
                        }
                    }
                }
            }

            if (!result) {
                result = value.toString();
            }

            return result;
        };

        Enum.Parse = function (enumType, name, ignoreCase) {
            if (typeof ignoreCase === "undefined") { ignoreCase = true; }
            var result;

            if (enumType) {
                if (ignoreCase) {
                    name = name.toLowerCase();
                }

                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var compareAginst = enumKey.toString();
                        if (ignoreCase) {
                            compareAginst = compareAginst.toLowerCase();
                        }

                        if (name === compareAginst) {
                            result = enumType[enumKey];
                            break;
                        }
                    }
                }
            }

            return result;
        };

        Enum.GetValues = function (enumType) {
            var result = [];

            if (enumType) {
                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var enumValue = enumType[enumKey];
                        if (typeof enumValue === "number") {
                            result.push(enumValue);
                        }
                    }
                }
            }

            return result;
        };
        return Enum;
    })();
    Common.Enum = Enum;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/enumHelper.js.map

// eventHelper.ts
var Common;
(function (Common) {
    "use strict";

    

    var Publisher = (function () {
        function Publisher(events) {
            this._events = {};
            this._listeners = {};
            if (events && events.length > 0) {
                for (var i = 0; i < events.length; i++) {
                    var type = events[i];
                    if (type) {
                        this._events[type] = type;
                    }
                }
            } else {
                throw Error("Events are null or empty.");
            }
        }
        Publisher.prototype.addEventListener = function (eventType, func) {
            if (eventType && func) {
                var type = this._events[eventType];
                if (type) {
                    var callbacks = this._listeners[type] ? this._listeners[type] : this._listeners[type] = [];
                    callbacks.push(func);
                }
            }
        };

        Publisher.prototype.removeEventListener = function (eventType, func) {
            if (eventType && func) {
                var callbacks = this._listeners[eventType];
                if (callbacks) {
                    for (var i = 0; i < callbacks.length; i++) {
                        if (func === callbacks[i]) {
                            callbacks.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        };

        Publisher.prototype.invokeListener = function (args) {
            if (args.type) {
                var callbacks = this._listeners[args.type];
                if (callbacks) {
                    for (var i = 0; i < callbacks.length; i++) {
                        var func = callbacks[i];
                        if (func) {
                            func(args);
                        }
                    }
                }
            }
        };
        return Publisher;
    })();
    Common.Publisher = Publisher;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/eventHelper.js.map

// formattingHelpers.ts
var Common;
(function (Common) {
    "use strict";

    var FormattingHelpers = (function () {
        function FormattingHelpers() {
        }
        FormattingHelpers.getDecimalLocaleString = function (numberToConvert, includeGroupSeparators) {
            var numberString = Math.abs(numberToConvert).toString();

            var split = numberString.split(/e/i);
            numberString = split[0];
            var exponent = (split.length > 1 ? parseInt(split[1], 10) : 0);

            split = numberString.split(".");
            numberString = (numberToConvert < 0 ? "-" : "") + split[0];

            var right = split.length > 1 ? split[1] : "";

            if (exponent > 0) {
                right = FormattingHelpers.zeroPad(right, exponent, false);
                numberString += right.slice(0, exponent);
                right = right.substr(exponent);
            } else if (exponent < 0) {
                exponent = -exponent;
                numberString = FormattingHelpers.zeroPad(numberString, exponent + 1, true);
                right = numberString.slice(-exponent, numberString.length) + right;
                numberString = numberString.slice(0, -exponent);
            }

            var nf = Plugin.Culture.NumberFormat;
            if (!nf) {
                nf = { numberDecimalSeparator: ".", numberGroupSizes: [3], numberGroupSeparator: "," };
            }

            if (right.length > 0) {
                right = nf.numberDecimalSeparator + right;
            }

            if (includeGroupSeparators === true) {
                var groupSizes = nf.numberGroupSizes, sep = nf.numberGroupSeparator, curSize = groupSizes[0], curGroupIndex = 1, stringIndex = numberString.length - 1, ret = "";

                while (stringIndex >= 0) {
                    if (curSize === 0 || curSize > stringIndex) {
                        if (ret.length > 0) {
                            return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                        } else {
                            return numberString.slice(0, stringIndex + 1) + right;
                        }
                    }

                    if (ret.length > 0) {
                        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + sep + ret;
                    } else {
                        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1);
                    }

                    stringIndex -= curSize;
                    if (curGroupIndex < groupSizes.length) {
                        curSize = groupSizes[curGroupIndex];
                        curGroupIndex++;
                    }
                }

                return numberString.slice(0, stringIndex + 1) + sep + ret + right;
            } else {
                return numberString + right;
            }
        };

        FormattingHelpers.stripNewLine = function (text) {
            return text.replace(/[\r?\n]/g, "");
        };

        FormattingHelpers.zeroPad = function (stringToPad, newLength, padLeft) {
            var zeros = [];
            for (var i = stringToPad.length; i < newLength; i++) {
                zeros.push("0");
            }

            return (padLeft ? (zeros.join("") + stringToPad) : (stringToPad + zeros.join("")));
        };
        return FormattingHelpers;
    })();
    Common.FormattingHelpers = FormattingHelpers;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/formattingHelpers.js.map

// TokenExtractor.ts
var Common;
(function (Common) {
    "use strict";

    (function (TokenType) {
        TokenType[TokenType["General"] = 0] = "General";
        TokenType[TokenType["String"] = 1] = "String";
        TokenType[TokenType["Number"] = 2] = "Number";
        TokenType[TokenType["Html"] = 3] = "Html";
        TokenType[TokenType["HtmlTagName"] = 4] = "HtmlTagName";
        TokenType[TokenType["HtmlTagDelimiter"] = 5] = "HtmlTagDelimiter";
        TokenType[TokenType["HtmlAttributeName"] = 6] = "HtmlAttributeName";
        TokenType[TokenType["HtmlAttributeValue"] = 7] = "HtmlAttributeValue";
        TokenType[TokenType["EqualOperator"] = 8] = "EqualOperator";
    })(Common.TokenType || (Common.TokenType = {}));
    var TokenType = Common.TokenType;

    (function (HtmlRegexGroup) {
        HtmlRegexGroup[HtmlRegexGroup["PreHtmlString"] = 1] = "PreHtmlString";
        HtmlRegexGroup[HtmlRegexGroup["StartDelimiter"] = 2] = "StartDelimiter";
        HtmlRegexGroup[HtmlRegexGroup["TagName"] = 3] = "TagName";
        HtmlRegexGroup[HtmlRegexGroup["IdAttribute"] = 4] = "IdAttribute";
        HtmlRegexGroup[HtmlRegexGroup["IdEqualToToken"] = 5] = "IdEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["IdAttributeValue"] = 6] = "IdAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["ClassAttribute"] = 7] = "ClassAttribute";
        HtmlRegexGroup[HtmlRegexGroup["ClassEqualToToken"] = 8] = "ClassEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["ClassAttributeValue"] = 9] = "ClassAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["SrcAttribute"] = 10] = "SrcAttribute";
        HtmlRegexGroup[HtmlRegexGroup["SrcEqualToToken"] = 11] = "SrcEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["SrcAttributeValue"] = 12] = "SrcAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["EndDelimiter"] = 13] = "EndDelimiter";
        HtmlRegexGroup[HtmlRegexGroup["PostHtmlString"] = 14] = "PostHtmlString";
    })(Common.HtmlRegexGroup || (Common.HtmlRegexGroup = {}));
    var HtmlRegexGroup = Common.HtmlRegexGroup;

    (function (AssignmentRegexGroup) {
        AssignmentRegexGroup[AssignmentRegexGroup["LeftHandSide"] = 1] = "LeftHandSide";
        AssignmentRegexGroup[AssignmentRegexGroup["EqualToOperator"] = 2] = "EqualToOperator";
        AssignmentRegexGroup[AssignmentRegexGroup["RightHandSide"] = 3] = "RightHandSide";
        AssignmentRegexGroup[AssignmentRegexGroup["PostString"] = 4] = "PostString";
    })(Common.AssignmentRegexGroup || (Common.AssignmentRegexGroup = {}));
    var AssignmentRegexGroup = Common.AssignmentRegexGroup;

    var TokenExtractor = (function () {
        function TokenExtractor() {
        }
        TokenExtractor.getHtmlTokens = function (text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }

            var tokens = TokenExtractor.HTML_REGEX.exec(text);

            if (tokens) {
                if (tokens[1 /* PreHtmlString */]) {
                    tokenTypeMap.push({ type: 0 /* General */, value: tokens[1 /* PreHtmlString */].toString() });
                }

                if (tokens[2 /* StartDelimiter */]) {
                    tokenTypeMap.push({ type: 5 /* HtmlTagDelimiter */, value: tokens[2 /* StartDelimiter */].toString() });
                }

                if (tokens[3 /* TagName */]) {
                    tokenTypeMap.push({ type: 4 /* HtmlTagName */, value: tokens[3 /* TagName */].toString() });
                }

                if (tokens[4 /* IdAttribute */]) {
                    tokenTypeMap.push({ type: 6 /* HtmlAttributeName */, value: tokens[4 /* IdAttribute */].toString() });
                }

                if (tokens[5 /* IdEqualToToken */]) {
                    tokenTypeMap.push({ type: 8 /* EqualOperator */, value: tokens[5 /* IdEqualToToken */].toString() });
                }

                if (tokens[6 /* IdAttributeValue */] !== undefined) {
                    tokenTypeMap.push({ type: 7 /* HtmlAttributeValue */, value: tokens[6 /* IdAttributeValue */].toString() });
                }

                if (tokens[7 /* ClassAttribute */]) {
                    tokenTypeMap.push({ type: 6 /* HtmlAttributeName */, value: tokens[7 /* ClassAttribute */].toString() });
                }

                if (tokens[8 /* ClassEqualToToken */]) {
                    tokenTypeMap.push({ type: 8 /* EqualOperator */, value: tokens[8 /* ClassEqualToToken */].toString() });
                }

                if (tokens[9 /* ClassAttributeValue */] !== undefined) {
                    tokenTypeMap.push({ type: 7 /* HtmlAttributeValue */, value: tokens[9 /* ClassAttributeValue */].toString() });
                }

                if (tokens[10 /* SrcAttribute */]) {
                    tokenTypeMap.push({ type: 6 /* HtmlAttributeName */, value: tokens[10 /* SrcAttribute */].toString() });
                }

                if (tokens[11 /* SrcEqualToToken */]) {
                    tokenTypeMap.push({ type: 8 /* EqualOperator */, value: tokens[11 /* SrcEqualToToken */].toString() });
                }

                if (tokens[12 /* SrcAttributeValue */] !== undefined) {
                    tokenTypeMap.push({ type: 7 /* HtmlAttributeValue */, value: tokens[12 /* SrcAttributeValue */].toString() });
                }

                if (tokens[13 /* EndDelimiter */]) {
                    tokenTypeMap.push({ type: 5 /* HtmlTagDelimiter */, value: tokens[13 /* EndDelimiter */].toString() });
                }

                if (tokens[14 /* PostHtmlString */]) {
                    tokenTypeMap.push({ type: 0 /* General */, value: tokens[14 /* PostHtmlString */].toString() });
                }
            } else {
                tokenTypeMap.push({ type: 0 /* General */, value: text });
            }

            return tokenTypeMap;
        };

        TokenExtractor.getStringTokens = function (text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }

            var tokens = TokenExtractor.STRING_REGEX.exec(text);

            if (tokens) {
                if (tokens[1 /* LeftHandSide */]) {
                    tokenTypeMap.push({ type: 0 /* General */, value: tokens[1 /* LeftHandSide */].toString() });
                }

                if (tokens[2 /* EqualToOperator */]) {
                    tokenTypeMap.push({ type: 0 /* General */, value: tokens[2 /* EqualToOperator */].toString() });
                }

                if (tokens[3 /* RightHandSide */]) {
                    tokenTypeMap.push({ type: 1 /* String */, value: tokens[3 /* RightHandSide */].toString() });
                }

                if (tokens[4 /* PostString */]) {
                    tokenTypeMap.push({ type: 0 /* General */, value: tokens[4 /* PostString */].toString() });
                }
            } else {
                tokenTypeMap.push({ type: 0 /* General */, value: text });
            }

            return tokenTypeMap;
        };

        TokenExtractor.getNumberTokens = function (text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }

            var tokens = TokenExtractor.NUMBER_REGEX.exec(text);

            if (tokens) {
                if (tokens[1 /* LeftHandSide */]) {
                    tokenTypeMap.push({ type: 0 /* General */, value: tokens[1 /* LeftHandSide */].toString() });
                }

                if (tokens[2 /* EqualToOperator */]) {
                    tokenTypeMap.push({ type: 0 /* General */, value: tokens[2 /* EqualToOperator */].toString() });
                }

                if (tokens[3 /* RightHandSide */]) {
                    tokenTypeMap.push({ type: 2 /* Number */, value: tokens[3 /* RightHandSide */].toString() });
                }

                if (tokens[4 /* PostString */]) {
                    tokenTypeMap.push({ type: 0 /* General */, value: tokens[4 /* PostString */].toString() });
                }
            } else {
                tokenTypeMap.push({ type: 0 /* General */, value: text });
            }

            return tokenTypeMap;
        };

        TokenExtractor.getCssClass = function (tokenType) {
            switch (tokenType) {
                case 1 /* String */:
                    return "valueStringToken-String";
                case 2 /* Number */:
                    return "valueStringToken-Number";
                case 4 /* HtmlTagName */:
                    return "perftools-Html-Element-Tag";
                case 6 /* HtmlAttributeName */:
                    return "perftools-Html-Attribute";
                case 7 /* HtmlAttributeValue */:
                    return "perftools-Html-Value";
                case 5 /* HtmlTagDelimiter */:
                    return "perftools-Html-Tag";
                case 8 /* EqualOperator */:
                    return "perftools-Html-Operator";
                default:
                    return "";
            }
        };

        TokenExtractor.isHtmlExpression = function (text) {
            return TokenExtractor.GENERAL_HTML_REGEX.test(text);
        };

        TokenExtractor.isStringExpression = function (text) {
            return TokenExtractor.STRING_REGEX.test(text);
        };
        TokenExtractor.GENERAL_HTML_REGEX = /^<.*>/;
        TokenExtractor.HTML_REGEX = /(^.*)?(<)([^\s]+)(?:( id)(=)(\".*?\"))?(?:( class)(=)(\".*?\"))?(?:( src)(=)(\".*?\"))?(>)(.*$)?/;
        TokenExtractor.NUMBER_REGEX = /(.*)?(=)( ?-?\d+(?:.\d+)?)(.*$)?/;
        TokenExtractor.STRING_REGEX = /(^.*?)(=)( ?\".*\")(.*$)?/;
        return TokenExtractor;
    })();
    Common.TokenExtractor = TokenExtractor;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/TokenExtractor.js.map

// hostShell.ts
var Common;
(function (Common) {
    (function (Extensions) {
        "use strict";

        var HostShellProxy = (function () {
            function HostShellProxy() {
                this._hostShellProxy = Plugin.Utilities.JSONMarshaler.attachToPublishedObject("Microsoft.VisualStudio.WebClient.Diagnostics.PerformanceToolHost.Package.Extensions.Core.HostShell", {}, true);
            }
            HostShellProxy.prototype.setStatusBarText = function (text, highlight) {
                return this._hostShellProxy._call("setStatusBarText", text, highlight || false);
            };
            return HostShellProxy;
        })();
        Extensions.HostShellProxy = HostShellProxy;

        var LocalHostShell = (function () {
            function LocalHostShell() {
            }
            LocalHostShell.prototype.setStatusBarText = function (statusText, highlight) {
                return Plugin.Promise.as(null);
            };
            return LocalHostShell;
        })();
        Extensions.LocalHostShell = LocalHostShell;
    })(Common.Extensions || (Common.Extensions = {}));
    var Extensions = Common.Extensions;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/hostShell.js.map

// Notifications.ts
"use strict";
var Notifications = (function () {
    function Notifications() {
    }
    Object.defineProperty(Notifications, "isTestMode", {
        get: function () {
            return window["TestMode"];
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Notifications, "notifications", {
        get: function () {
            if (!Notifications._notifications) {
                Notifications._notifications = new Plugin.Utilities.EventManager();
            }

            return Notifications._notifications;
        },
        enumerable: true,
        configurable: true
    });

    Notifications.subscribe = function (type, listener) {
        if (Notifications.isTestMode) {
            Notifications.notifications.addEventListener(type, listener);
        }
    };

    Notifications.unsubscribe = function (type, listener) {
        if (Notifications.isTestMode) {
            Notifications.notifications.removeEventListener(type, listener);
        }
    };

    Notifications.subscribeOnce = function (type, listener) {
        if (Notifications.isTestMode) {
            function onNotify() {
                Notifications.unsubscribe(type, onNotify);
                listener.apply(this, arguments);
            }

            Notifications.subscribe(type, onNotify);
        }
    };

    Notifications.notify = function (type, details) {
        if (Notifications.isTestMode) {
            Notifications.notifications.dispatchEvent(type, details);
        }
    };
    return Notifications;
})();
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/Notifications.js.map

// Packager.ts
var Common;
(function (Common) {
    (function (Data) {
        "use strict";

        var F12Packager = (function () {
            function F12Packager(packagerProxy) {
                this._proxy = packagerProxy;
                if (!this._proxy) {
                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1074"));
                }
            }
            F12Packager.prototype.openPackage = function (streamId) {
                try  {
                    this._proxy.openPackage(streamId);
                } catch (e) {
                    if (console) {
                        console.log("failed openPackage call on packager. Message: " + e.message);
                    }

                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1077"));
                }
            };

            F12Packager.prototype.createPackage = function (toolId, packagePath) {
                if (!packagePath) {
                    packagePath = this.generateRandomName() + F12Packager.DIAGSESSION_EXTENSION;
                }

                try  {
                    this._proxy.createPackage(toolId, packagePath);
                } catch (e) {
                    if (console) {
                        console.log("failed createPackage call on packager. Message: " + e.message);
                    }

                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1077"));
                }

                return packagePath;
            };

            F12Packager.prototype.hasToolData = function (toolId) {
                try  {
                    return this._proxy.hasToolData(toolId);
                } catch (e) {
                    if (console) {
                        console.log("failed hadToolData call on packager. Message: " + e.message);
                    }

                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1077"));
                }
            };

            F12Packager.prototype.addResource = function (resourceType, path, resourceName) {
                try  {
                    this._proxy.addResourceToPackage(resourceType, path, resourceName);
                } catch (e) {
                    if (console) {
                        console.log("failed addResource call on packager. Message: " + e.message);
                    }

                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1077"));
                }
            };

            F12Packager.prototype.getResourcePathsByType = function (resourceType) {
                try  {
                    return this._proxy.getResourcePathsByType(resourceType);
                } catch (e) {
                    if (console) {
                        console.log("failed getResourcePathsByType call on packager. Message: " + e.message);
                    }

                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1077"));
                }
            };

            F12Packager.prototype.commit = function () {
                try  {
                    this._proxy.commitPackage();
                } catch (e) {
                    if (console) {
                        console.log("failed commit call on packager. Message: " + e.message);
                    }

                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1077"));
                }
            };

            F12Packager.prototype.closePackage = function () {
                try  {
                    this._proxy.closePackage();
                } catch (e) {
                    if (console) {
                        console.log("failed closePackage call on packager. Message: " + e.message);
                    }

                    throw new Error(Plugin.Resources.getErrorString("JSPerf.1077"));
                }
            };

            F12Packager.prototype.generateRandomName = function () {
                return Math.random().toString(36).substring(2);
            };
            F12Packager.DIAGSESSION_EXTENSION = ".diagsession";
            return F12Packager;
        })();
        Data.F12Packager = F12Packager;
    })(Common.Data || (Common.Data = {}));
    var Data = Common.Data;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/Packager.js.map

// Constants.ts
var Common;
(function (Common) {
    "use strict";

    var Constants = (function () {
        function Constants() {
        }
        Constants.E_ABORT = -2147467260;

        Constants.MINIMUM_REQUIRED_DOCUMENT_MODE = 10;

        Constants.MEMORY_ANALYZER_SNAPSHOT_RESOURCE_TYPE = "MemoryAnalyzer.Resource.Snapshot";

        Constants.MEMORY_ANALYZER_SNAPSHOT_ROOT_PATH = "%temp%\\Microsoft\\F12\\perftools\\memory\\";

        Constants.MEMORY_ANALYZER_TOOL_GUID = "BE2D5223-40F7-4428-A9A0-AF888725C1FB";

        Constants.UI_RESPONSIVENESS_TOOL_GUID = "{0615D892-30B0-4ADA-AFAB-93BFE13D9538}";
        return Constants;
    })();
    Common.Constants = Constants;
})(Common || (Common = {}));
//# sourceMappingURL=f:/binaries.x86ret/bin/i386/f12/perftools/Common/Constants.js.map


// SIG // Begin signature block
// SIG // MIIaowYJKoZIhvcNAQcCoIIalDCCGpACAQExCzAJBgUr
// SIG // DgMCGgUAMGcGCisGAQQBgjcCAQSgWTBXMDIGCisGAQQB
// SIG // gjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIBAAIB
// SIG // AAIBAAIBAAIBADAhMAkGBSsOAwIaBQAEFNtnAbCplOY5
// SIG // ZzA/8ihw0baUTLDroIIVejCCBLswggOjoAMCAQICEzMA
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
// SIG // E6P9MYIElTCCBJECAQEwgZAweTELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEjMCEGA1UEAxMaTWljcm9zb2Z0IENvZGUgU2ln
// SIG // bmluZyBQQ0ECEzMAAADKbNUyEjXE4VUAAQAAAMowCQYF
// SIG // Kw4DAhoFAKCBrjAZBgkqhkiG9w0BCQMxDAYKKwYBBAGC
// SIG // NwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIB
// SIG // FTAjBgkqhkiG9w0BCQQxFgQUNpiMr4laR/vX8sSZQvEY
// SIG // dKiBjOowTgYKKwYBBAGCNwIBDDFAMD6gJIAiAEMAbwBt
// SIG // AG0AbwBuAE0AZQByAGcAZQBkAF8AMwAuAGoAc6EWgBRo
// SIG // dHRwOi8vbWljcm9zb2Z0LmNvbTANBgkqhkiG9w0BAQEF
// SIG // AASCAQAWdrVR+/KxjF3Z4/wJL2zUdWHCMbqCnKhK2yWW
// SIG // M7bMOqb6JH9KeADwywci0lyBIloL1MkfaFHh8lBGE3NZ
// SIG // 21GHIDDTtvcSQERgXiWJCk2yrq9Pwy5mtRFDbqdJsRUL
// SIG // LSefzn8z99qtixdlM2TxQnhaWCybuRXrZPe2VTTGVzt3
// SIG // 779DD3c1xWsBhpeAe3Q5ltjhsLjUHOE+8qSTASAEmk44
// SIG // 0kH8oB5mA27oHWTeGHJSJbL9L7wv/Sdd8uiI0gUpZ8wq
// SIG // vKCd9SJkK9nDvS4P7LoDSSqlQ36BOr0Cv7viULr8sJ6P
// SIG // pQXgrKyU7dT/JKqxB+7abmEOcGms/YriR3fF9OuCoYIC
// SIG // KDCCAiQGCSqGSIb3DQEJBjGCAhUwggIRAgEBMIGOMHcx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xITAfBgNVBAMTGE1pY3Jv
// SIG // c29mdCBUaW1lLVN0YW1wIFBDQQITMwAAAFrtL/TkIJk/
// SIG // OgAAAAAAWjAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkD
// SIG // MQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTQx
// SIG // MTAxMDcyNTQ1WjAjBgkqhkiG9w0BCQQxFgQUc6xPVUpT
// SIG // j+/6ZIJbxPHtv40q9mwwDQYJKoZIhvcNAQEFBQAEggEA
// SIG // pEHJYUENfiw9OU7GvcBMsc/BsLkOKhwJKcDLXzsMm44p
// SIG // WVG3SLv3SZq/SIgfuASFMEpucG93nKgevZnR3YRnfhrE
// SIG // +ReSH1QesTrp2OhVrgidmeUr3hszdwDZi9M6ZXKY0d5x
// SIG // rJ47phwH9r3BsKYW4CKorO+PtrU/phTApUAQ/hg+eFQq
// SIG // c0fmG0vgDuS/HO5FViK+kviDUh5hfNi7UjkdkUI49MxU
// SIG // /tgsyAYE0AooBe84eIS9SqkGBR92tuoML/e3bL1PRXw9
// SIG // Xabq48o8wkV6psBbn+qtWt2+Q1U9Msy+sZkOjfAOLllc
// SIG // H9CkP+OPshFQmRKJ75psFRLMf67z0OVmfA==
// SIG // End signature block
