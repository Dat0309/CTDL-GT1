(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // Kullanıcının bu sayfaya her gidişinde bu fonksiyon çağrılır. Fonksiyon
        // sayfa öğelerini uygulamanın verileri ile doldurur.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;

            // TODO: Sayfayı burada başlat.
        }
    });
})();
