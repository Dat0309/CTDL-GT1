(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // この関数は、ユーザーがこのページに移動するたびに呼び出されます。
        // ページ要素にアプリケーションのデータを設定します。
        ready: function (element, options) {
            var item = Data.resolveItemReference(options.item);
            element.querySelector(".titlearea .pagetitle").textContent = item.title;

            // TODO: ここでページを初期化します。
        }
    });
})();
