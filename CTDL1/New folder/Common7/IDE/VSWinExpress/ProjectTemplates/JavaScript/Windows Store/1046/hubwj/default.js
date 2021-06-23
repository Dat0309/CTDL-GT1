// Confira a introdução ao template Hub na seguinte documentação:
// http://go.microsoft.com/fwlink/?LinkID=286574
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: Este aplicativo foi recém lançado. Inicializar
                // seu aplicativo aqui.
            } else {
                // TODO: Este aplicativo foi reativado da suspensão.
                // Restaurar estado do aplicativo aqui.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Otimize a carga do aplicativo e, enquanto a tela inicial é mostrada, execute o trabalho agendado de alta prioridade.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: Este aplicativo está prestes a ser suspenso. Salvar qualquer estado
        // que precisa persistir nas suspensões aqui. Se você precisar 
        // concluir uma operação assíncrona antes que o aplicativo seja 
        // suspenso, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();
