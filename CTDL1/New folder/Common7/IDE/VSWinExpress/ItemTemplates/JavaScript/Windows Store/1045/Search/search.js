// TODO: Połącz stronę z wynikami wyszukiwania z funkcją wyszukiwania w aplikacji.
// Aby obejrzeć wprowadzenie do szablonu strony z wynikami wyszukiwania, zobacz następującą dokumentację:
// http://go.microsoft.com/fwlink/?LinkId=232512
(function () {
    "use strict";

    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    WinJS.UI.Pages.define("/$wizardrelativeurl$.html", {
        _filters: [],
        _lastSearch: "",

        // Funkcja wywoływana, aby zainicjować stronę.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Ta funkcja jest wywoływana, gdy użytkownik przechodzi do tej strony.
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            this._handleQuery(element, options);
            listView.element.focus();
        },

        // Ta funkcja aktualizuje układ strony w odpowiedzi na zmiany układu.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Odpowiedz na zmiany w układzie.
        },

        // Ta funkcja odfiltrowuje dane wyszukiwania przy użyciu określonego filtru.
        _applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // Ta funkcja odpowiada na wybranie nowego filtru przez użytkownika. Aktualizuje
        // listę zaznaczeń i wyświetlane wyniki.
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

            // TODO: Zamień lub usuń przykładowe filtry.
            this._filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this._filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        // Ta funkcja wykonuje każdy krok wymagany do przeprowadzenia wyszukiwania.
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
            // TODO: Zmień „App Name” na nazwę swojej aplikacji.
            element.querySelector(".titlearea .pagetitle").textContent = "Nazwa aplikacji";
            element.querySelector(".titlearea .pagesubtitle").textContent = "Wyniki dla “" + this._lastSearch + '”';
        },

        _itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: Przejdź do elementu, który został wywołany.
            });
        },

        // Ta funkcja koloruje szukany zwrot. Odwołano się do niej w /$wizardrelativeurl$.html
        // jako do części szablonu elementu ListView.
        _markText: function (text) {
            return text.replace(this._lastSearch, "<mark>" + this._lastSearch + "</mark>");
        },

        // Ta funkcja generuje listę zaznaczeń filtra.
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

        // Ta funkcja wypełnienia WinJS.Binding.List wynikami wyszukiwania dla
        // dostarczonego zapytania.
        _searchData: function (queryText) {
            var originalResults;
            // TODO: Przeprowadź odpowiednie wyszukiwanie na swoich danych.
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
