// Arama Anlaşma şablonuna giriş için aşağıdaki belgelere bakın:
// http://go.microsoft.com/fwlink/?LinkId=232512

// TODO: Aşağıdaki betik etiketini başlangıç sayfasının başına ekle
// anlaşma olaylarını aramak için abone olun.
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

        // Kullanıcının bu sayfaya her gidişinde bu işlev çağrılır. İşlev
        // sayfa öğelerini uygulamanın verileri ile doldurur.
        ready: function (element, options) {
            var listView = element.querySelector(".resultslist").winControl;
            listView.itemTemplate = element.querySelector(".itemtemplate");
            listView.oniteminvoked = this._itemInvoked;
            this._handleQuery(element, options);
            listView.element.focus();
        },

        // Bu işlev, sayfa düzenini viewState değişikliklerine karşılık olarak güncelleştirir.
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

        // Bu işlev, belirtilen filtreyi kullanarak arama verilerine filtre uygular.
        _applyFilter: function (filter, originalResults) {
            if (filter.results === null) {
                filter.results = originalResults.createFiltered(filter.predicate);
            }
            return filter.results;
        },

        // Bu işlev, yeni bir filtre seçmek için kullanıcıya yanıt verir. Bu işlev, seçim listesini ve
        // görüntülenen sonuçları günceller.
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

            // TODO: Örnek filtreleri değiştirin ya da kaldırın.
            this._filters.push({ results: null, text: "Group 1", predicate: function (item) { return item.group.key === "group1"; } });
            this._filters.push({ results: null, text: "Group 2+", predicate: function (item) { return item.group.key !== "group1"; } });
        },

        // Bu işlev, bir arama gerçekleştirmek için gereken her adımı yürütür.
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

        // Bu işlev Liste Görünümünü yeni düzenlerle güncelleştirir
        _initializeLayout: function (listView, viewState) {
            /// <param name="listView" value="WinJS.UI.ListView.prototype" />

            if (viewState === appViewState.snapped) {
                listView.layout = new ui.ListLayout();
                document.querySelector(".titlearea .pagetitle").textContent = '“' + this._lastSearch + '”';
                document.querySelector(".titlearea .pagesubtitle").textContent = "";
            } else {
                listView.layout = new ui.GridLayout();

                // TODO: "Uygulama Adı"nı uygulamanızın adıyla değiştirin.
                document.querySelector(".titlearea .pagetitle").textContent = "Uygulama Adı";
                document.querySelector(".titlearea .pagesubtitle").textContent = "Şunun için sonuçlar: “" + this._lastSearch + '”';
            }
        },

        _itemInvoked: function (args) {
            args.detail.itemPromise.done(function itemInvoked(item) {
                // TODO: Çağrılmış öğeye gidin.
            });
        },

        // Bu işlev, arama terimini renklendirir. /$ Wizardrelativeurl$ .html içindeki ListView öğe şablonlarının
        // bir parçası olarak başvuruldu.
        _markText: function (text) {
            return text.replace(this._lastSearch, "<mark>" + this._lastSearch + "</mark>");
        },

        // Bu işlev filtre seçim listesini oluşturur.
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

        // Bu işlev, sağlanan sorgu için WinJS.Binding.List'i arama sonuçları
        // ile doldurur.
        _searchData: function (queryText) {
            var originalResults;
            // TODO: Verileriniz üzerinde uygun aramayı gerçekleştirin.
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
