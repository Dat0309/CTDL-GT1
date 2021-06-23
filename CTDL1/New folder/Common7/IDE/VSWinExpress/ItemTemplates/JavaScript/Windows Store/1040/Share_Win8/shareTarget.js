// Per un'introduzione al modello di condivisione contratto, vedere la seguente documentazione:
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

        // TODO: effettuare un'operazione sui dati condivisi archiviati nel var 'share'.

        share.reportCompleted();
    }

    // La funzione risponde alle attivazioni di tutte le applicazioni.
    app.onactivated = function (args) {
        var thumbnail;

        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.shareTarget) {
            document.querySelector(".submitbutton").onclick = onShareSubmit;
            share = args.detail.shareOperation;

            document.querySelector(".shared-title").textContent = share.data.properties.title;
            document.querySelector(".shared-description").textContent = share.data.properties.description;

            thumbnail = share.data.properties.thumbnail;
            if (thumbnail) {
                // Se i dati di condivisione includono un'anteprima, visualizzarli.
                args.setPromise(thumbnail.openReadAsync().done(function displayThumbnail(stream) {
                    document.querySelector(".shared-thumbnail").src = window.URL.createObjectURL(stream);
                }));
            } else {
                // Se non è presente alcuna anteprima, espandere gli elementi descrizione e
                // titolo per riempire lo spazio inutilizzato.
                document.querySelector("section[role=main] header").style.setProperty("-ms-grid-columns", "0px 0px 1fr");
                document.querySelector(".shared-thumbnail").style.visibility = "hidden";
            }
        }
    };

    app.start();
})();
