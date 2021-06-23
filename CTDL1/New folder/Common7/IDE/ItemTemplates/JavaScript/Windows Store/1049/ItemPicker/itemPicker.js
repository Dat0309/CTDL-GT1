// Основные сведения о шаблоне контракта средства выбора см. в следующей документации:
// http://go.microsoft.com/fwlink/?LinkId=232514
$wizardcomment$
(function () {
    "use strict";

    var app = WinJS.Application;
    var pickerUI;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    function fileRemovedFromPickerUI(args) {
        // TODO: Ответ на отмену выбора элемента в пользовательском интерфейсе средства выбора.
    }

    function getPickerDataSource() {
        if (window.Data) {
            return Data.items.dataSource;
        } else {
            return new WinJS.Binding.List().dataSource;
        }
    }

    function initializeLayout(listView) {
        /// <param name="listView" type="ui.ListView" />

        if (document.documentElement.offsetWidth < 500) {
            listView.layout = new ui.ListLayout();
        } else {
            listView.layout = new ui.GridLayout();
        }
    }

    function updatePickerUI(args) {
        // TODO: Ответ на выбор или отмену выбора элемента на странице.
    }

    app.onactivated = function activated(args) {
        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.fileOpenPicker) {
            pickerUI = args.detail.fileOpenPickerUI;
            pickerUI.onfileremoved = fileRemovedFromPickerUI;

            // Оптимизация загрузки приложений и выполнение запланированных задач с высоким приоритетом во время отображения экрана-заставки.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
                var mainSection = document.querySelector(".$safeitemname$");
                return ui.Animation.enterPage(mainSection);
            }).then(function () {
                var listView = document.querySelector(".pickerlist").winControl;
                listView.itemDataSource = getPickerDataSource();
                listView.itemTemplate = document.querySelector(".itemtemplate");
                listView.onselectionchanged = updatePickerUI;
                initializeLayout(listView);
                window.addEventListener("resize", function resized(args) {
                    initializeLayout(listView);
                });
                listView.element.focus();
            });
            args.setPromise(p);
        }
    };

    app.start();
})();