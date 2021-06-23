(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // Ta funkcja jest wywoływana, gdy użytkownik przechodzi do tej strony. To
        // wypełnia elementy strona danymi aplikacji.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;
			if (WinJS.Utilities.isPhone)
			{
				document.getElementById("backButton").style.display = "none";
            }
			// TODO: Inicjuj stronę tutaj.
        }
    });
})();
