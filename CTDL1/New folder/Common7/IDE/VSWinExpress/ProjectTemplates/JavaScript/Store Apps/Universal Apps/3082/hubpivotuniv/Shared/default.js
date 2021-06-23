// Para obtener una introducción a la plantilla Hub/Pivot, consulte la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=392285
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
                // TODO: Esta aplicación se ha iniciado recientemente. Inicializar
                // la aplicación aquí.
            } else {
                // TODO: Esta aplicación se ha reactivado tras estar suspendida.
                // Restaurar el estado de la aplicación aquí.
            }

            hookUpBackButtonGlobalEventHandlers();
            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimizar la carga de la aplicación y, mientras se muestra la pantalla de presentación, ejecutar el trabajo programado con prioridad alta.
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
        // TODO: Esta aplicación está a punto de suspenderse. Guardar cualquier estado
        // que deba conservarse en las suspensiones. Si necesita 
        // completar una operación asincrónica antes de que se suspenda 
        // la aplicación, llame a args.setPromise().
        app.sessionState.history = nav.history;
    };

    function hookUpBackButtonGlobalEventHandlers() {
        // Se suscribe a los eventos globales en el objeto de ventana
        window.addEventListener('keyup', backButtonGlobalKeyUpHandler, false)
    }

    // CONSTANTES
    var KEY_LEFT = "Left";
    var KEY_BROWSER_BACK = "BrowserBack";
    var MOUSE_BACK_BUTTON = 3;

    function backButtonGlobalKeyUpHandler(event) {
        // Navega hacia atrás al liberar las teclas (alt + flecha izquierda) o Atrás en explorador.
        if ((event.key === KEY_LEFT && event.altKey && !event.shiftKey && !event.ctrlKey) || (event.key === KEY_BROWSER_BACK)) {
            nav.back();
        }
    }

    app.start();
})();
