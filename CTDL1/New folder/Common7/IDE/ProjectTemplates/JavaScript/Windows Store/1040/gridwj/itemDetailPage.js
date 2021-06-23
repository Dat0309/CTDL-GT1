(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // La funzione viene chiamata quando un utente passa a questa pagina. Popola
        // gli elementi della pagina con i dati dell'applicazione.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;

            // TODO: inizializzare la pagina qui.
        }
    });
})();
