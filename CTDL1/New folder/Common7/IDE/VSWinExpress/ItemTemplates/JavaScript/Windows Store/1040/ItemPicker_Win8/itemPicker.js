// Per un'introduzione al modello di contratto selezione, vedere la seguente documentazione:
// http://go.microsoft.com/fwlink/?LinkId=232514
$wizardcomment$
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var pickerUI;

    function fileRemovedFromPickerUI(args) {
        // TODO: rispondere a un elemento che viene deselezionato nell'interfaccia utente selezione.
    }

    function getPickerDataSource() {
        if (window.Data) {
            return Data.items.dataSource;
        } else {
            return new WinJS.Binding.List().dataSource;
        }
    }

    function updatePickerUI(args) {
        // TODO: rispondere a un elemento che viene selezionato o deselezionato nella pagina.
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