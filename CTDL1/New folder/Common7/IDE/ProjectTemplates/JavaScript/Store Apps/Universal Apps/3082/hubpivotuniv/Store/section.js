(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/section/section.html", {
        /// <field type="WinJS.Binding.List" />
        _items: null,

        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // Se llama a esta función para inicializar la página.
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

        // Se llama a esta función cuando un usuario navega a esta página.
        ready: function (element, options) {
            element.querySelector("header[role=banner] .pagetitle").textContent = options.title;

            var listView = element.querySelector(".itemslist").winControl;
            listView.element.focus();
        },

        unload: function () {
            this._items.dispose();
        },

        // Esta función actualiza el diseño de la página como respuesta a los cambios de diseño.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Responder a los cambios en el diseño.
        },

        _itemInvoked: function (args) {
            var item = this._items.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/item/item.html", { item: Data.getItemReference(item) });
        }
    });
})();
