﻿<%@ Page Language="VB" AutoEventWireup="true" CodeBehind="$fileinputname$.aspx.vb" Inherits="$rootnamespace$.$fileinputname$" %>

<!DOCTYPE html>

<html>
<head>
    <title></title>
    <script type="text/javascript">
        // $loc_client_web_part_page_script_comment_1$
        (function () {
            'use strict';

            var hostUrl = '';
            if (document.URL.indexOf('?') != -1) {
                var params = document.URL.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split('=')[1];
                        document.write('<link rel="stylesheet" href="' + hostUrl + '/_layouts/15/defaultcss.ashx" />');
                        break;
                    }
                }
            }
            if (hostUrl == '') {
                document.write('<link rel="stylesheet" href="/_layouts/15/1033/styles/themable/corev15.css" />');
            }
        })();
    </script>
</head>
<body>
</body>
</html>
