(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // Essa função é chamada sempre que um usuário navegar para essa página. Ela
        // preenche os elementos da página com os dados do aplicativo.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;
			if (WinJS.Utilities.isPhone)
			{
				document.getElementById("backButton").style.display = "none";
            }
			// TODO: Inicialize a página aqui.
        }
    });
})();
