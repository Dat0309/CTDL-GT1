// 検索コントラクト テンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232512

// TODO:  次のスクリプト タグをスタート ページの先頭に追加し、
// 検索コントラクト イベントを定期受信します。
//  
// <script src="/$wizardrelativeurl$.js"></script>
$wizardcomment$
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var appModel = Windows.ApplicationModel;
    var appViewState = Windows.UI.ViewManagement.ApplicationViewState;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;
    var searchPageURI = "/$wizardrelativeurl$.html";

    ui.Pages.define(searchPageURI, {
        _filters: [],
        _lastSearch: "",

        // この関数は、ユーザーがこのページに移動するたびに呼び出されます 。
        // ページ要素にアプリケーションのデータを設定します。
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this._itemInvoked;
            this._handleQuery(element, options);
            listView.element.focus();
        },

        // この関数は、viewState の変更に応じてページ レイアウトを更新します。
        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            var listView = element.querySelector(".resultslist").winControl;
            if (lastViewState !== viewState) {
                if (lastViewState === appViewState.snapped || viewState === appViewState.snapped) {
                    var handler = function (e) {
                        listView.removeEventListener("contentanimating", handler, false);
                        e.preventDefault();
                    }
                    listView.addEventListener("contentanimating", handler, false);
                    var firstVisible = listView.indexOfFirstVisible;
                    this._initializeLayout(listView, viewState);
                    if (firstVisible >= 0 && listView.itemDataSource.list.length > 0) {
                        listView.indexOfFirstVisible = firstVisible;
                    }
                }
            }
        },

        // この関数は、指定されたフィルターを使用して検索データをフィルター処理します。
        _applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // この関数は、ユーザーによる新しいフィルターの選択に対応します。次を更新します:
        // 選択一覧と表示結果を更新します。
        _filterChanged: function (element, filterIndex) {
            var filterBar = element.querySelector(".filterbar");
            var listView = element.querySelector(".resultslist").winControl;

            utils.removeClass(filterBar.querySelector(".highlight"), "highlight");
            utils.addClass(filterBar.childNodes[filterIndex], "highlight");

            element.querySelector(".filterselect").selectedIndex = filterIndex;

            listView.itemDataSource = this._filters[filterIndex].results.dataSource;
        },

        _generateFilters: function () {
            this._filters = [];
            this._filters.push({ results: null, text: "All", predicate: function (item) { return true; } });

            // TODO:  サンプル フィルターを置換または削除します。
            this._filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this._filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        // この関数は、検索の実行に必要な各手順を実行します。
        _handleQuery: function (element, args) {
            var originalResults;
            this._lastSearch = args.queryText;
            WinJS.Namespace.define("$safeitemname$", { markText: WinJS.Binding.converter(this._markText.bind(this)) });
            this._initializeLayout(element.querySelector(".resultslist").winControl, Windows.UI.ViewManagement.ApplicationView.value);
            this._generateFilters();
            originalResults = this._searchData(args.queryText);
            if (originalResults.length === 0) {
                document.querySelector('.filterarea').style.display = "none";
            } else {
                document.querySelector('.resultsmessage').style.display = "none";
            }
            this._populateFilterBar(element, originalResults);
            this._applyFilter(this._filters[0], originalResults);
        },

        // この関数は、新しいレイアウトで ListView を更新します
        _initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.layout = new ui.ListLayout();
                document.querySelector(".titlearea .pagetitle").textContent = '“' + this._lastSearch + '”';
                document.querySelector(".titlearea .pagesubtitle").textContent = "";
            } else {
                listView.layout = new ui.GridLayout();

                // TODO:  "アプリケーション名" をアプリケーションの名前に変更してください。
                document.querySelector(".titlearea .pagetitle").textContent = "アプリケーション名";
                document.querySelector(".titlearea .pagesubtitle").textContent = "次の結果:" + this._lastSearch + '”';
            }
        },

        _itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO:  呼び出された項目に移動します。
            });
        },

        // この関数は、検索用語に色を付けます。/$wizardrelativeurl$.html で
        // ListView 項目テンプレートの一部として参照されます。
        _markText: function (text) {
            return text.replace(this._lastSearch, "<mark>" + this._lastSearch + "</mark>");
        },

        // この関数は、フィルター選択一覧を生成します。
        _populateFilterBar: function (element, originalResults) {
            var filterBar = element.querySelector(".filterbar");
            var listView = element.querySelector(".resultslist").winControl;
            var li, option, filterIndex;

            filterBar.innerHTML = "";
            for (filterIndex = 0; filterIndex < this._filters.length; filterIndex++) {
                this._applyFilter(this._filters[filterIndex], originalResults);

                li = document.createElement("li");
                li.filterIndex = filterIndex;
                li.tabIndex = 0;
                li.textContent = this._filters[filterIndex].text + " (" + this._filters[filterIndex].results.length + ")";
                li.onclick = function (args) { this._filterChanged(element, args.target.filterIndex); }.bind(this);
                li.onkeyup = function (args) {
                    if (args.key === "Enter" || args.key === "Spacebar")
                        this._filterChanged(element, args.target.filterIndex);
                }.bind(this);
                utils.addClass(li, "win-type-interactive");
                utils.addClass(li, "win-type-x-large");
                filterBar.appendChild(li);

                if (filterIndex === 0) {
                    utils.addClass(li, "highlight");
                    listView.itemDataSource = this._filters[filterIndex].results.dataSource;
                }

                option = document.createElement("option");
                option.value = filterIndex;
                option.textContent = this._filters[filterIndex].text + " (" + this._filters[filterIndex].results.length + ")";
                element.querySelector(".filterselect").appendChild(option);
            }

            element.querySelector(".filterselect").onchange = function (args) { this._filterChanged(element, args.currentTarget.value); }.bind(this);
        },

        // この関数は、指定されたクエリの検索結果を WinJS.Binding.List に
        // 設定します。
        _searchData: function (queryText) {
            var originalResults;
            // TODO:  データの適切な検索を実行します。
            if (window.Data) {
                originalResults = Data.items.createFiltered(function (item) {
                    return (item.title.indexOf(queryText) >= 0 || item.subtitle.indexOf(queryText) >= 0 || item.description.indexOf(queryText) >= 0);
                });
            } else {
                originalResults = new WinJS.Binding.List();
            }
            return originalResults;
        }
    });

    WinJS.Application.addEventListener("activated", function (args) {
        if (args.detail.kind === appModel.Activation.ActivationKind.search) {
            args.setPromise(ui.processAll().then(function () {
                if (!nav.location) {
                    nav.history.current = { location: Application.navigator.home, initialState: {} };
                }

                return nav.navigate(searchPageURI, { queryText: args.detail.queryText });
            }));
        }
    });

    appModel.Search.SearchPane.getForCurrentView().onquerysubmitted = function (args) { nav.navigate(searchPageURI, args); };
})();
