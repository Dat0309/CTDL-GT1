(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/section/section.html", {
        /// <field type="WinJS.Binding.List" />
        _items: null,

        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // Diese Funktion wird zum Initialisieren der Seite aufgerufen.
        init: function (element, options) {
            var group = Data.resolveGroupReference(options.groupKey);
            this._items = Data.getItemsFromGroup(group);
            var pageList = this._items.createGrouped(
                function groupKeySelector(item) { return group.key; },
                function groupDataSelector(item) { return group; }
            );
            this.groupDataSource = pageList.groups.dataSource;
            this.itemDataSource = pageList.dataSource;
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt.
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = options.title;

            var listView = element.querySelector(".itemslist").winControl;
            listView.element.focus();
        },

        unload: function () {
            this._items.dispose();
        },

        // Diese Funktion aktualisiert das Seitenlayout als Reaktion auf Layoutänderungen.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Auf Änderungen im Layout reagieren.
        },

        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/item/item.html", { item: Data.getItemReference(item) });
        }
    });
})();
