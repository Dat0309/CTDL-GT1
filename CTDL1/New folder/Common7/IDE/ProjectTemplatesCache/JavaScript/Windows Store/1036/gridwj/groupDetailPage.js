(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/groupDetail/groupDetail.html", {
        /// <field type="WinJS.Binding.List" />
        _items: null,

        // Cette fonction est appelée pour initialiser la page.
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

        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. 
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = this._pageTitle;
        },

        unload: function () {
            this._items.dispose();
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: répondez aux modifications de la disposition.
        },

        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/itemDetail/itemDetail.html", { item: Data.getItemReference(item) });
        }
    });
})();
