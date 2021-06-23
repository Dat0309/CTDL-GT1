// 如需樞紐分析範本的簡介，請參閱下列文件:
// http://go.microsoft.com/fwlink/?LinkID=392284
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
                // TODO:  這個應用程式剛啟動。請在這裡初始化
                // 您的應用程式。
            } else {
                // TODO:  這個應用程式已經從擱置重新啟用。
                // 請在這裡還原應用程式狀態。
            }

            hookUpBackButtonGlobalEventHandlers();
            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // 將應用程式的負載最佳化，並在顯示啟動顯示畫面時執行高優先權的排程工作。
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
        // TODO:  這個應用程式即將暫停。請在這裡儲存任何
        // 需要在擱置間保存的狀態。如果必須 
        // 在應用程式擱置前完成非同步作業，
        // 請呼叫 args.setPromise()。
        app.sessionState.history = nav.history;
    };

    function hookUpBackButtonGlobalEventHandlers() {
        // 訂閱視窗物件的全域事件
        window.addEventListener('keyup', backButtonGlobalKeyUpHandler, false)
    }

    // 常數
    var KEY_LEFT = "Left";
    var KEY_BROWSER_BACK = "BrowserBack";
    var MOUSE_BACK_BUTTON = 3;

    function backButtonGlobalKeyUpHandler(event) {
        // 放開 (Alt + Left) 或 BrowserBack 鍵時，向後巡覽。
        if ((event.key === KEY_LEFT && event.altKey && !event.shiftKey && !event.ctrlKey) || (event.key === KEY_BROWSER_BACK)) {
            nav.back();
        }
    }

    app.start();
})();
