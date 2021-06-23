// TODO: 将搜索结果页连接至应用程序内的搜索。
//有关“搜索结果页”模板的简介，请参阅以下文档: 
// http://go.microsoft.com/fwlink/?LinkId=232512
(function () {
    "use strict";

    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    WinJS.UI.Pages.define("/$wizardrelativeurl$.html", {
        _filters: [],
        _lastSearch: "",

        // 初始化该页面时将调用此函数。
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // 每当用户导航至该页面时都要调用此函数。
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            this._handleQuery(element, options);
            listView.element.focus();
        },

        // 此功能更新页面布局以响应布局更改。
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO:  响应布局的更改。
        },

        // 此功能使用指定的筛选器筛选搜索数据。
        _applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // 此功能响应选择新筛选器的用户。它更新
        // 选择列表和显示结果。
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

            // TODO:  替换或删除示例筛选器。
            this._filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this._filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        // 此功能执行在执行搜索时所需的每个步骤。
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
            // TODO:  将“应用程序名称”更改为您的应用程序的名称。
            element.querySelector(".titlearea .pagetitle").textContent = "应用程序名称";
            element.querySelector(".titlearea .pagesubtitle").textContent = "结果" + this._lastSearch + '”';
        },

        _itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO:  导航到已调用的项。
            });
        },

        // 此功能为搜索词着色。在 /$wizardrelativeurl$.html 中作为 ListView 项模板的一部分
        // 引用。
        _markText: function (text) {
            return text.replace(this._lastSearch, "<mark>" + this._lastSearch + "</mark>");
        },

        // 此功能将生成筛选器选择列表。
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

        // 此功能使用提供的查询的搜索结果
        // 填充 WinJS.Binding.List。
        _searchData: function (queryText) {
            var originalResults;
            // TODO:  对数据执行相应的搜索。
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
