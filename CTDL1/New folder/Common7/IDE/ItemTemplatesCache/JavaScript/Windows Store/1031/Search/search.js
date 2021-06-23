// TODO: Suchergebnisseite mit der In-App-Suche verbinden.
// Eine Einführung zur Vorlage für Suchergebnisseiten finden Sie in der folgenden Dokumentation:
// http://go.microsoft.com/fwlink/?LinkId=232512
(function () {
    "use strict";

    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    WinJS.UI.Pages.define("/$wizardrelativeurl$.html", {
        _filters: [],
        _lastSearch: "",

        // Diese Funktion wird zum Initialisieren der Seite aufgerufen.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt.
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            this._handleQuery(element, options);
            listView.element.focus();
        },

        // Diese Funktion aktualisiert das Seitenlayout als Reaktion auf Layoutänderungen.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Auf Änderungen im Layout reagieren.
        },

        // Diese Funktion filtert die Suchdaten mithilfe des angegebenen Filters.
        _applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // Diese Funktion reagiert auf die Auswahl eines neuen Filters durch einen Benutzer. Sie aktualisiert die
        // Auswahlliste und die angezeigten Ergebnisse.
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

            // TODO: Ersetzen oder Entfernen der Beispielfilter.
            this._filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this._filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        // Diese Funktion führt alle Schritte aus, die für das Ausführen einer Suche erforderlich sind.
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
            // TODO: "App-Name" in den Namen Ihrer App ändern.
            element.querySelector(".titlearea .pagetitle").textContent = "App-Name";
            element.querySelector(".titlearea .pagesubtitle").textContent = "Ergebnisse für “" + this._lastSearch + '”';
        },

        _itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: Navigieren zu dem Element, das aufgerufen wurde.
            });
        },

        // Diese Funktion hebt den Suchbegriff farbig hervor. Referenziert in /$wizardrelativeurl$.html
        // als Teil der ListView-Elementvorlagen.
        _markText: function (text) {
            return text.replace(this._lastSearch, "<mark>" + this._lastSearch + "</mark>");
        },

        // Diese Funktion erzeugt die Filterauswahlliste.
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

        // Diese Funktion füllt eine WinJS.Binding.List mit Suchergebnissen für die bereitgestellte
        // Anfrage auf.
        _searchData: function (queryText) {
            var originalResults;
            // TODO: Durchführen der geeigneten Suche für Ihre Daten
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
