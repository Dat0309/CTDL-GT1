(function () {
    "use strict";

    var ui = WinJS.UI;

    ui.Pages.define("/pages/items/items.html", {
        // Bu işlev sayfayı başlatmak için çağırılır.
        init: function (element, options) {
            this.itemInvoked = ui.eventHandler(this._itemInvoked.bind(this));
        },

        // Kullanıcının bu sayfaya her gidişinde bu işlev çağrılır.
        ready: function (element, options) {
        },

        // Bu işlev, sayfa düzenini yerleşim değişikliklerine karşılık olarak güncelleştirir.
        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Yerleşimdeki değişiklikleri yanıtla.
        },

        _itemInvoked: function (args) {
            var groupKey = Data.groups.getAt(args.detail.itemIndex).key;
            WinJS.Navigation.navigate("/pages/split/split.html", { groupKey: groupKey });
        }
    });
})();
