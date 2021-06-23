(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // This function is called to initialize the page.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // This function is called whenever a user navigates to this page.
        ready: function (element, options) {
        },

        // This function updates the page layout in response to layout changes.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
