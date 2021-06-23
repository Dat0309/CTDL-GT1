(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // Essa função é chamada sempre que um usuário navegar para essa página. Ela
        // preenche os elementos da página com os dados do aplicativo.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;

            // TODO: Inicialize a página aqui.
        }
    });
})();
