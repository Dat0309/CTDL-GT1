(function () {
    "use strict";

    var binding = WinJS.Binding;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    ui.Pages.define("/pages/split/split.html", {

        _group: null,
        /// <field type="WinJS.Binding.List" />
        _items: null,
        _itemSelectionIndex: -1,
        _wasSingleColumn: false,

        // この関数は、ページを初期化するために呼び出されます。
        init: function (element, options) {
            // このページに表示するグループおよび選択に関する情報を格納
            // します。
            this._group = Data.resolveGroupReference(options.groupKey);
            this._items = Data.getItemsFromGroup(this._group);
            this._itemSelectionIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;
            this.itemDataSource = this._items.dataSource;
            this.selectionChanged = ui.eventHandler(this._selectionChanged.bind(this));
        },

        // この関数は、ユーザーがこのページに移動するたびに呼び出されます
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._group.title;

            this._updateVisibility(element);
            if (this._isSingleColumn()) {
                this._wasSingleColumn = true;
                if (this._itemSelectionIndex >= 0) {
                    // 単一列の詳細ビューの場合、アーティクルを読み込みます。
                    binding.processAll(element.querySelector(".articlesection"), this._items.getAt(this._itemSelectionIndex));
                }
            } else {
                // このページに selectionIndex がある場合、その選択を
                // ListView に表示します。
                var listView = element.querySelector(".itemlist").winControl;
                listView.selection.set(Math.max(this._itemSelectionIndex, 0));
            }
        },

        unload: function () {
            this._items.dispose();
        },

        updateLayout: function (element) {
            var isSingleColumn = this._isSingleColumn();
            if (this._wasSingleColumn === isSingleColumn) {
                return;
            }

            var listView = element.querySelector(".itemlist").winControl;
            var firstVisible = listView.indexOfFirstVisible;
            this._updateVisibility(element);

            var handler = function (e) {
                listView.removeEventListener("contentanimating", handler, false);
                e.preventDefault();
            }

            if (isSingleColumn) {
                listView.selection.clear();
                if (this._itemSelectionIndex >= 0) {
                    // アプリケーションが単一列の詳細ビューに位置合わせされている場合、
                    // 単一列のリスト ビューをバックスタックに追加します。
                    nav.history.current.state = {
                        groupKey: this._group.key,
                        selectedIndex: this._itemSelectionIndex
                    };
                    nav.history.backStack.push({
                        location: "/pages/split/split.html",
                        state: { groupKey: this._group.key }
                    });
                    element.querySelector(".articlesection").focus();
                } else {
                    listView.addEventListener("contentanimating", handler, false);
                    if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                        listView.indexOfFirstVisible = firstVisible;
                    }
                    listView.forceLayout();
                }
            } else {
                // アプリケーションが 2 列のビューに位置合わせ解除されている場合、
                // バックスタックに追加された splitPage インスタンスを削除します。
                if (nav.canGoBack && nav.history.backStack[nav.history.backStack.length - 1].location === "/pages/split/split.html") {
                    nav.history.backStack.pop();
                }

                listView.addEventListener("contentanimating", handler, false);
                if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                    listView.indexOfFirstVisible = firstVisible;
                }
                listView.forceLayout();
                listView.selection.set(this._itemSelectionIndex >= 0 ? this._itemSelectionIndex : Math.max(firstVisible, 0));
            }

            this._wasSingleColumn = isSingleColumn;
        },

        // この関数は、リストおよび詳細列を左右に並べて表示するのではなく、
        // 個別のページに表示するかどうかを確認します。
        _isSingleColumn: function () {
            return document.documentElement.offsetWidth <= 767;
        },

        _selectionChanged: function (args) {
            var listView = args.currentTarget.winControl;
            var details;
            // 既定では、選択は単一項目に制限されます。
            listView.selection.getItems().done(function updateDetails(items) {
                if (items.length > 0) {
                    this._itemSelectionIndex = items[0].index;
                    if (this._isSingleColumn()) {
                        // 位置合わせされているか縦方向の場合、選択した項目の詳細が格納された
                        // 新しいページに移動します。
                        setImmediate(function () {
                            nav.navigate("/pages/split/split.html", { groupKey: this._group.key, selectedIndex: this._itemSelectionIndex });
                        }.bind(this));
                    } else {
                        // 全画面表示またはページ幅に合わせた表示の場合、詳細列を新しいデータで更新します。
                        details = document.querySelector(".articlesection");
                        binding.processAll(details, items[0].data);
                        details.scrollTop = 0;
                    }
                }
            }.bind(this));
        },

        // この関数は、現在のビューステートおよび項目選択に基づいて 2 列の
        // 表示を切り替えます。
        _updateVisibility: function (element) {
            var splitPage = element.querySelector(".splitpage");
            if (this._isSingleColumn()) {
                if (this._itemSelectionIndex >= 0) {
                    utils.addClass(splitPage, "itemdetail");
                    element.querySelector(".articlesection").focus();
                } else {
                    utils.addClass(splitPage, "groupdetail");
                    element.querySelector(".itemlist").focus();
                }
            } else {
                utils.removeClass(splitPage, "groupdetail");
                utils.removeClass(splitPage, "itemdetail");
                element.querySelector(".itemlist").focus();
            }
        }
    });
})();
