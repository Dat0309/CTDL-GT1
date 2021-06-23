(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // Tato funkce je volána vždy, když uživatel přejde na tuto stránku.
        // Naplní prvky stránky daty aplikace.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;
			if (WinJS.Utilities.isPhone)
			{
				document.getElementById("backButton").style.display = "none";
            }
			// TODO: Inicializovat zde stránku
        }
    });
})();
