// Основные сведения о шаблоне контракта средства выбора см. в следующей документации:
// http://go.microsoft.com/fwlink/?LinkId=232514
$wizardcomment$
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var pickerUI;

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

    function updatePickerUI(args) {
        // TODO: Ответ на выбор или отмену выбора элемента на странице.
    }

    app.onactivated = function activated(args) {
        if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.fileOpenPicker) {
            pickerUI = args.detail.fileOpenPickerUI;
            pickerUI.onfileremoved = fileRemovedFromPickerUI;
            args.setPromise(WinJS.UI.processAll()
                .then(function () {
                    var listView = document.querySelector(".pickerlist").winControl;
                    listView.itemDataSource = getPickerDataSource();
                    listView.itemTemplate = document.querySelector(".itemtemplate");
                    listView.onselectionchanged = updatePickerUI;
                    listView.element.focus();
                }));
        }
    };

    app.start();
})();