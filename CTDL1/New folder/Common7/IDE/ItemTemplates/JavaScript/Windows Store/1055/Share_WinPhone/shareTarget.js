// Paylaşım Anlaşma şablonuna giriş için aşağıdaki belgelere bakın:
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

        // TODO: 'paylaşım' var içinde depolanan paylaşılan verilerle bir şey gerçekleştir.

        share.reportCompleted();
    }

    // Bu işlev tüm uygulama etkinleştirmelerine yanıt verir.
    app.onactivated = function (args) {
        var thumbnail;

        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            document.querySelector(".submitbutton").onclick = onShareSubmit;
            share = args.detail.shareOperation;

            document.querySelector(".shared-title").textContent = share.data.properties.title;
            document.querySelector(".shared-description").textContent = share.data.properties.description;

            thumbnail = share.data.properties.thumbnail;
            if (thumbnail) {
                // Paylaşılan veri küçük resim içeriyorsa, görüntüleyin.
                args.setPromise(thumbnail.openReadAsync().done(function displayThumbnail(stream) {
                    document.querySelector(".shared-thumbnail").src = window.URL.createObjectURL(stream);
                }));
            } else {
                // Eğer küçük resim yoksa, açıklamayı ve
                // kullanılmayan boşlukları doldurmak için başlık öğelerini genişletin.
                document.querySelector("section[role=main] header").style.setProperty("-ms-grid-columns", "0px 0px 1fr");
                document.querySelector(".shared-thumbnail").style.visibility = "hidden";
            }
        }
    };

    app.start();
})();
