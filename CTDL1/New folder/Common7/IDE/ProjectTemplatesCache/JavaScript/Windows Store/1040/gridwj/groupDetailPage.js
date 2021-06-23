(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupDetail/groupDetail.html", {
        /// <tipo campo="WinJS.Binding.List" />
        _items: null,

        // La funzione è chiamata per inizializzare la pagina.
        init: function (element, options) {
            var group = Data.resolveGroupReference(options.groupKey);
            this._items = Data.getItemsFromGroup(group);
            this._pageTitle = group.title;
            var pageList = this._items.createGrouped(
                function groupKeySelector(item) { return group.key; },
                function groupDataSelector(item) { return group; }
            );
            this.groupDataSource = pageList.groups.dataSource;
            this.itemDataSource = pageList.dataSource;
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // La funzione viene chiamata quando un utente passa a questa pagina. 
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._pageTitle;
        },

        unload: function () {
            this._items.dispose();
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: rispondere alle modifiche nel layout.
        },

        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
        }
    });
})();
