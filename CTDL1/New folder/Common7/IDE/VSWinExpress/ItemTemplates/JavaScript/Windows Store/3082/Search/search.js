// TODO: Conectar la Página de resultados de la búsqueda a la búsqueda en la aplicación.
// Para obtener una introducción a la plantilla Página de resultados de la búsqueda, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkId=232512
(function () {
    "use strict";

    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    WinJS.UI.Pages.define("/$wizardrelativeurl$.html", {
        _filters: [],
        _lastSearch: "",

        // Se llama a esta función para inicializar la página.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Se llama a esta función cuando un usuario navega a esta página.
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            this._handleQuery(element, options);
            listView.element.focus();
        },

        // Esta función actualiza el diseño de la página como respuesta a los cambios de diseño.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        },

        // Esta función filtra los datos de la búsqueda con el filtro especificado.
        _applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // Esta función responde a un usuario que selecciona un filtro nuevo. Actualiza la
        // lista de selección y los resultados que se muestran.
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

            // TODO: Reemplace o quite los filtros de ejemplo.
            this._filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this._filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        // Esta función ejecuta todos los pasos necesarios para realizar una búsqueda.
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
            // TODO: Cambiar "Nombre de la aplicación" por el nombre de la aplicación.
            element.querySelector(".titlearea .pagetitle").textContent = "Nombre de la aplicación";
            element.querySelector(".titlearea .pagesubtitle").textContent = "Resultados de “" + this._lastSearch + '”';
        },

        _itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: Navegue hasta el elemento que se invocó.
            });
        },

        // Esta función aplica color al término de búsqueda. Se le hace referencia en /$wizardrelativeurl$.html
        // como parte de las plantillas de elemento ListView.
        _markText: function (text) {
            return text.replace(this._lastSearch, "<mark>" + this._lastSearch + "</mark>");
        },

        // Esta función genera la lista de selección de filtros.
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

        // Esta función rellena un objeto WinJS.Binding.List con los resultados de la búsqueda de la
        // consulta proporcionada.
        _searchData: function (queryText) {
            var originalResults;
            // TODO: Realice la búsqueda adecuada en sus datos.
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
