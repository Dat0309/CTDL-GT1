var visualization = (function () {
    'use strict';

    var visualization = {};

    // $loc_script_Visualization_Visualization_js_comment1$
    visualization.generateSampleData = function () {
        var sampleHeaders = [['$loc_script_Visualization_Visualization_js_comment2$', '$loc_script_Visualization_Visualization_js_comment3$']];
        var sampleRows = [
            ['$loc_script_Visualization_Visualization_js_comment4$', 79],
            ['$loc_script_Visualization_Visualization_js_comment5$', 95],
            ['$loc_script_Visualization_Visualization_js_comment6$', 86],
            ['$loc_script_Visualization_Visualization_js_comment7$', 93]];
        return new Office.TableData(sampleRows, sampleHeaders);
    }

    // $loc_script_Visualization_Visualization_js_comment8$
    //        $loc_script_Visualization_Visualization_js_comment9$
    //        $loc_script_Visualization_Visualization_js_comment10$
    //        $loc_script_Visualization_Visualization_js_comment11$
    visualization.display = function ($element, data, errorHandler) {
        if ((data.rows.length < 1) || (data.rows[0].length < 2)) {
            errorHandler('$loc_script_Visualization_Visualization_js_comment12$');
            return;
        }

        var maxBarWidthInPixels = 200;
        var $table = $('<table class="visualization" />');

        if (data.headers.length > 0) {
            var $headerRow = $('<tr />').appendTo($table);
            $('<th />').text(data.headers[0][0]).appendTo($headerRow);
            $('<th />').text(data.headers[0][1]).appendTo($headerRow);
        }

        for (var i = 0; i < data.rows.length; i++) {
            var $row = $('<tr />').appendTo($table);
            var $column1 = $('<td />').appendTo($row);
            var $column2 = $('<td />').appendTo($row);

            $column1.text(data.rows[i][0]);
            var value = data.rows[i][1];
            var width = (maxBarWidthInPixels * value / 100.0);
            var $visualizationBar = $('<div />').appendTo($column2);
            $visualizationBar.addClass('bar').width(width).text(value);
        }

        $element.html($table[0].outerHTML);
    };

    return visualization;
})();
