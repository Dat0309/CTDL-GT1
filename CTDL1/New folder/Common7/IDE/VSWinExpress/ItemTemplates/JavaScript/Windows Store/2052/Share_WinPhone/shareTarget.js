// 有关“共享协定”模板的简介，请参阅以下文档:
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

        // TODO: 使用“share”变量中存储的共享数据执行一些操作。

        share.reportCompleted();
    }

    // 此功能响应所有应用程序激活。
    app.onactivated = function (args) {
        var thumbnail;

        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            document.querySelector(".submitbutton").onclick = onShareSubmit;
            share = args.detail.shareOperation;

            document.querySelector(".shared-title").textContent = share.data.properties.title;
            document.querySelector(".shared-description").textContent = share.data.properties.description;

            thumbnail = share.data.properties.thumbnail;
            if (thumbnail) {
                // 如果共享数据包含缩略图，则显示它。
                args.setPromise(thumbnail.openReadAsync().done(function displayThumbnail(stream) {
                    document.querySelector(".shared-thumbnail").src = window.URL.createObjectURL(stream);
                }));
            } else {
                // 如果未显示任何缩略图，则展开说明和
                // 标题元素以填充未使用的空间。
                document.querySelector("section[role=main] header").style.setProperty("-ms-grid-columns", "0px 0px 1fr");
                document.querySelector(".shared-thumbnail").style.visibility = "hidden";
            }
        }
    };

    app.start();
})();
