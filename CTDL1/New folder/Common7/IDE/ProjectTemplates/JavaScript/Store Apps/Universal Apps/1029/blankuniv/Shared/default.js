// Úvod do prázdné šablony najdete v následující dokumentaci:
// http://go.microsoft.com/fwlink/?LinkID=392286
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: Tato aplikace byla nově spuštěna. Inicializovat
                // zde aplikaci.
            } else {
                // TODO: Tato aplikace byla znovu aktivována z pozastavení.
                // Obnovit zde stav aplikace.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: Tato aplikace bude pozastavena. Uložte všechny stavy,
        // které je potřeba zachovat mezi pozastaveními. Můžete použít
        // objekt WinJS.Application.sessionState, který je automaticky
        // uložen a obnoven při pozastavení. Pokud je nutné provést
        // asynchronní operace předtím, než je aplikace pozastavena, zavolejte
        // args.setPromise().
    };

    app.start();
})();