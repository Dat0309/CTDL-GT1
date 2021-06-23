(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // Diese Funktion wird immer aufgerufen, wenn ein Benutzer zu dieser Seite wechselt. Sie
        // füllt die Seitenelemente mit den Daten der App auf.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;

            // TODO: Die Seite hier initialisieren.
        }
    });
})();
