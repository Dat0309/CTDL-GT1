(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/itemDetail/itemDetail.html", {
        // Эта функция вызывается каждый раз, когда пользователь переходит на данную страницу. Она
        // заполняет элементы страницы данными приложения.
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;

            // TODO: Инициализируйте страницу здесь.
        }
    });
})();
