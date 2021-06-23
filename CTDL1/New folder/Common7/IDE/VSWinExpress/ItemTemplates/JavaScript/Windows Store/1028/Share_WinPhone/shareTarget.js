// 如需共用合約範本的簡介，請參閱下列文件:
// http://go.microsoft.com/fwlink/?LinkId=232513
$wizardcomment$
(function () {
    "use strict";

    var app = WinJS.Application;
    var share;

    function onShareSubmit() {
        document.querySelector(".progressindicators").style.visibility = "visible";
        document.querySelector(".commentbox").disabled = true;
        document.querySelector(".submitbutton").disabled = true;

        // TODO: 使用儲存在 'share' var 中的共用資料進行一些作業。

        share.reportCompleted();
    }

    // 此函式會回應所有應用程式啟用作業。
    app.onactivated = function (args) {
        var thumbnail;

        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            document.querySelector(".submitbutton").onclick = onShareSubmit;
            share = args.detail.shareOperation;

            document.querySelector(".shared-title").textContent = share.data.properties.title;
            document.querySelector(".shared-description").textContent = share.data.properties.description;

            thumbnail = share.data.properties.thumbnail;
            if (thumbnail) {
                // 如果共用資料包含縮圖，即顯示縮圖。
                args.setPromise(thumbnail.openReadAsync().done(function displayThumbnail(stream) {
                    document.querySelector(".shared-thumbnail").src = window.URL.createObjectURL(stream);
                }));
            } else {
                // 如果縮圖不存在，即展開描述和
                // 標題項目以填滿未使用的空間。
                document.querySelector("section[role=main] header").style.setProperty("-ms-grid-columns", "0px 0px 1fr");
                document.querySelector(".shared-thumbnail").style.visibility = "hidden";
            }
        }
    };

    app.start();
})();
