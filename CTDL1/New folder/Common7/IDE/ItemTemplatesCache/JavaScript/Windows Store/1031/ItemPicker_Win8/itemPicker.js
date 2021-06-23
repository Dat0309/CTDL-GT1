// Eine Einführung zur Auswahlvertragsvorlage finden Sie in der folgenden Dokumentation:
// http://go.microsoft.com/fwlink/?LinkId=232514
$wizardcomment$
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var pickerUI;

    function fileRemovedFromPickerUI(args) {
        // TODO: Auf ein Element reagieren, dessen Auswahl in der Auswahl-UI aufgehoben wird.
    }

    function getPickerDataSource() {
        if (window.Data) {
            return Data.items.dataSource;
        } else {
            return new WinJS.Binding.List().dataSource;
        }
    }

    function updatePickerUI(args) {
        // TODO: Auf ein Element reagieren, das auf der Seite ausgewählt oder dessen Auswahl aufgehoben wird.
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