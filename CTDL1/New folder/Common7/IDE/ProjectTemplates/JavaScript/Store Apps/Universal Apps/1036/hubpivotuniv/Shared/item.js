(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // Cette fonction est appelée chaque fois qu'un utilisateur accède à cette page. Elle
        // remplit les éléments de la page avec les données d'application.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;
			if (WinJS.Utilities.isPhone)
			{
				document.getElementById("backButton").style.display = "none";
            }
			// TODO: initialisez la page ici.
        }
    });
})();
