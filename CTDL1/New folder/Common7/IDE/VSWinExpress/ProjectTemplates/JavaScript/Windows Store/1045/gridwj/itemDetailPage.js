(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // Ta funkcja jest wywoływana, gdy użytkownik przechodzi do tej strony. To
        // wypełnia elementy strona danymi aplikacji.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;

            // TODO: Inicjuj stronę tutaj.
        }
    });
})();
