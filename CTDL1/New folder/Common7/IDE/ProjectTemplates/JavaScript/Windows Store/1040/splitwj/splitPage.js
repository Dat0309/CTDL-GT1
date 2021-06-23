(function () {
    "use strict";

    var binding = WinJS.Binding;
    var nav = WinJS.Navigation;
    var ui = WinJS.UI;
    var utils = WinJS.Utilities;

    ui.Pages.define("/pages/split/split.html", {

        _group: null,
        /// <tipo campo="WinJS.Binding.List" />
        _items: null,
        _itemSelectionIndex: -1,
        _wasSingleColumn: false,

        // La funzione è chiamata per inizializzare la pagina.
        init: function (element, options) {
            // Archiviare le informazioni sul gruppo e sulla selezione che verranno visualizzate
            // nella pagina.
            this._group = Data.resolveGroupReference(options.groupKey);
            this._items = Data.getItemsFromGroup(this._group);
            this._itemSelectionIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;
            this.itemDataSource = this._items.dataSource;
            this.selectionChanged = ui.eventHandler(this._selectionChanged.bind(this));
        },

        // La funzione viene chiamata quando un utente passa a questa pagina.
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._group.title;

            this._updateVisibility(element);
            if (this._isSingleColumn()) {
                this._wasSingleColumn = true;
                if (this._itemSelectionIndex >= 0) {
                    // Per la visualizzazione dettagli a colonna singola, caricare l'articolo.
                    binding.processAll(element.querySelector(".articlesection"), this._items.getAt(this._itemSelectionIndex));
                }
            } else {
                // Se la pagina dispone di selectionIndex, fare in modo che la selezione
                // venga visualizzata in ListView.
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
                    // Se l'applicazione è bloccata in una visualizzazione dettagli a colonna singola,
                    // aggiungere la visualizzazione elenco a colonna singola al backstack.
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
                // Se l'applicazione è stata sbloccata nella visualizzazione a due colonne, rimuovere qualsiasi
                // istanza di splitPage che è stata aggiunta al backstack.
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

        // La funzione controlla se le colonne dei dettagli e degli elenchi devono essere visualizzate
        // in pagine separate anziché affiancate.
        _isSingleColumn: function () {
            return document.documentElement.offsetWidth <= 767;
        },

        _selectionChanged: function (args) {
            var listView = args.currentTarget.winControl;
            var details;
            // Per impostazione predefinita, la selezione è limitata a un singolo elemento.
            listView.selection.getItems().done(function updateDetails(items) {
                if (items.length > 0) {
                    this._itemSelectionIndex = items[0].index;
                    if (this._isSingleColumn()) {
                        // Se orizzontale o verticale, navigare a una pagina nuova contenente
                        // i dettagli dell'elemento selezionato.
                        setImmediate(function () {
                            nav.navigate("/pages/split/split.html", { groupKey: this._group.key, selectedIndex: this._itemSelectionIndex });
                        }.bind(this));
                    } else {
                        // Se fullscreen o riempito, aggiornare la colonna dei dettagli con i nuovi dati.
                        details = document.querySelector(".articlesection");
                        binding.processAll(details, items[0].data);
                        details.scrollTop = 0;
                    }
                }
            }.bind(this));
        },

        // La funzione attiva/disattiva la visibilità delle due colonne in base
        // alla selezione dell'elemento e dello stato di visualizzazione corrente.
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
