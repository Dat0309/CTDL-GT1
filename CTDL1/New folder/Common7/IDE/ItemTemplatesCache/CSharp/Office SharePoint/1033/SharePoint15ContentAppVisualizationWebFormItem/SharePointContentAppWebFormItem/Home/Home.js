/// <reference path="../App.js" />
/// <reference path="../Visualization.js" />

(function () {
    'use strict';

    // $loc_script_Visualization_Home_js_comment1$
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();

            displayDataOrRedirect();
        });
    };

    // $loc_script_Visualization_Home_js_comment2$
    //        $loc_script_Visualization_Home_js_comment3$
    function displayDataOrRedirect() {
        Office.context.document.bindings.getByIdAsync(
            app.bindingID,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    var binding = result.value;
                    displayDataForBinding(binding);
                    binding.addHandlerAsync(
                        Office.EventType.BindingDataChanged,
                        function () { displayDataForBinding(binding); }
                    );
                } else {
                    window.location.href = '../DataBinding/DataBinding.html';
                }
            });
    }

    // $loc_script_Visualization_Home_js_comment4$
    function displayDataForBinding(binding) {
        binding.getDataAsync(
            {
                coercionType: Office.CoercionType.Table,
                valueFormat: Office.ValueFormat.Unformatted,
                filterType: Office.FilterType.OnlyVisible
            },
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    visualization.display($('#data-display'), result.value, showError);
                } else {
                    showError('$loc_script_Visualization_Home_js_comment5$');
                }
            }
        );

        function showError(message) {
            $('#data-display').html(
                '<div class="notice">' +
                '    <h3>$loc_script_Visualization_Home_js_comment6$</h3>' + $('<p/>', { text: message })[0].outerHTML +
                '    <a href="../DataBinding/DataBinding.html">' +
                '        <b>$loc_script_Visualization_Home_js_comment7$</b>' +
                '    </a>' +
                '</div>');
        }
    }

})();
