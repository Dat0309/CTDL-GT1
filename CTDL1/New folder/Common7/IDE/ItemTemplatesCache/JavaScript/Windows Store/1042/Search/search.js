// TODO: 검색 결과 페이지를 사용자 앱의 검색에 연결합니다.
// 검색 결과 페이지 템플릿에 대한 소개는 다음 설명서를 참조하십시오.
// http://go.microsoft.com/fwlink/?LinkId=232512
(function () {
    "use strict";

    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    WinJS.UI.Pages.define("/$wizardrelativeurl$.html", {
        _filters: [],
        _lastSearch: "",

        // 이 함수는 페이지를 초기화하기 위해 호출됩니다.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // 이 함수는 사용자가 이 페이지로 이동할 때마다 호출됩니다.
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            this._handleQuery(element, options);
            listView.element.focus();
        },

        // 이 함수는 레이아웃 변경 내용에 응답하여 페이지 레이아웃을 업데이트합니다.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: 레이아웃 변경 내용에 응답합니다.
        },

        // 이 함수는 지정한 필터를 사용하여 검색 데이터를 필터링합니다.
        _applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // 이 함수는 사용자의 새 필터 선택에 응답합니다. 선택 목록을
        // 업데이트하고 결과를 표시합니다.
        _filterChanged: function (element, filterIndex) {
            var filterBar = element.querySelector(".filterbar");
            var listView = element.querySelector(".resultslist").winControl;

            utils.removeClass(filterBar.querySelector(".highlight"), "highlight");
            utils.addClass(filterBar.childNodes[filterIndex], "highlight");

            listView.itemDataSource = this._filters[filterIndex].results.dataSource;
        },

        _generateFilters: function () {
            this._filters = [];
            this._filters.push({ results: null, text: "All", predicate: function (item) { return true; } });

            // TODO: 예제 필터를 바꾸거나 제거하십시오.
            this._filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this._filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        // 이 함수는 검색 수행에 필요한 각 단계를 실행합니다.
        _handleQuery: function (element, args) {
            var originalResults;
            this._lastSearch = args.queryText;
            WinJS.Namespace.define("$safeitemname$", { markText: WinJS.Binding.converter(this._markText.bind(this)) });
            this._initializeLayout(element);
            this._generateFilters();
            originalResults = this._searchData(args.queryText);
            if (originalResults.length === 0) {
                document.querySelector('.filterbar').style.display = "none";
            } else {
                document.querySelector('.resultsmessage').style.display = "none";
            }
            this._populateFilterBar(element, originalResults);
            this._applyFilter(this._filters[0], originalResults);
        },

        _initializeLayout: function (element) {
            // TODO: "앱 이름"을 앱의 이름으로 변경합니다.
            element.querySelector(".titlearea .pagetitle").textContent = "응용 프로그램 이름";
            element.querySelector(".titlearea .pagesubtitle").textContent = "다음에 대한 결과: “" + this._lastSearch + '”';
        },

        _itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: 호출된 항목을 탐색합니다.
            });
        },

        // 이 함수는 검색어에 색을 지정합니다. /$wizardrelativeurl$.html에서
        // ListView 항목 템플릿의 일부로 참조됩니다.
        _markText: function (text) {
            return text.replace(this._lastSearch, "<mark>" + this._lastSearch + "</mark>");
        },

        // 이 함수는 필터 선택 목록을 생성합니다.
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
            }
        },

        // 이 함수는 WinJS.Binding.List를 제공된 쿼리에 대한 검색 결과로
        // 채웁니다.
        _searchData: function (queryText) {
            var originalResults;
            // TODO: 데이터에 대해 적절한 검색을 수행합니다.
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
})();
