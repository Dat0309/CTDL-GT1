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

        // Diese Funktion wird zum Initialisieren der Seite aufgerufen.
        init: function (element, options) {
            // Informationen zur Gruppe und Auswahl speichern, die von dieser Seite
            // angezeigt werden.
            this._group = Data.resolveGroupReference(options.groupKey);
            this._items = Data.getItemsFromGroup(this._group);
            this._itemSelectionIndex = (options && "selectedIndex" in options) ? options.selectedIndex : -1;
            this.itemDataSource = this._items.dataSource;
            this.selectionChanged = ui.eventHandler(this._selectionChanged.bind(this));
        },

        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt.
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._group.title;

            this._updateVisibility(element);
            if (this._isSingleColumn()) {
                this._wasSingleColumn = true;
                if (this._itemSelectionIndex >= 0) {
                    // Für eine detaillierte Einzelspaltenansicht den Artikel laden.
                    binding.processAll(element.querySelector(".articlesection"), this._items.getAt(this._itemSelectionIndex));
                }
            } else {
                // Wenn diese Seite über einen selectionIndex verfügt,
                // diese Auswahl in der ListView anzeigen.
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
                    // Wenn die App in die detaillierte Einzelspaltenansicht umgeschaltet wurde,
                    // die Einzelspalten-Listenansicht zum Backstack hinzufügen.
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
                // Wenn die App sich wieder in der zweispaltige Ansicht befindet, 
                // alle splitPage-Instanzen laden, die zum Backstack hinzugefügt wurden.
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

        // Diese Funktion überprüft, ob die Spalten "Liste" und "Details" auf getrennten Seiten
        // statt nebeneinander angezeigt werden sollen.
        _isSingleColumn: function () {
            return document.documentElement.offsetWidth <= 767;
        },

        _selectionChanged: function (args) {
            var listView = args.currentTarget.winControl;
            var details;
            // Standardmäßig ist die Auswahl auf ein einzelnes Element beschränkt.
            listView.selection.getItems().done(function updateDetails(items) {
                if (items.length > 0) {
                    this._itemSelectionIndex = items[0].index;
                    if (this._isSingleColumn()) {
                        // Wenn sich die Seite im angedockten Zustand oder Querformat befindet,
                        // zu einer neuen Seite mit den Details des ausgewählten Elements navigieren.
                        setImmediate(function () {
                            nav.navigate("/pages/split/split.html", { groupKey: this._group.key, selectedIndex: this._itemSelectionIndex });
                        }.bind(this));
                    } else {
                        // Wenn sich die Seite im Vollbildmodus oder der gefüllten Ansicht befindet, die Spalte "Details" mit neuen Daten auffüllen.
                        details = document.querySelector(".articlesection");
                        binding.processAll(details, items[0].data);
                        details.scrollTop = 0;
                    }
                }
            }.bind(this));
        },

        // Diese Funktion schaltet die Sichtbarkeit der beiden Spalten auf Grundlage des aktuellen
        // Ansichtszustand und der Elementauswahl um.
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
