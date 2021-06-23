'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

// $loc_js_script_comment1$
$(document).ready(function () {
    getUserName();
});

// $loc_js_script_comment2$
function getUserName() {
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// $loc_js_script_comment3$
// $loc_js_script_comment4$
function onGetUserNameSuccess() {
    $('#message').text('Hello ' + user.get_title());
}

// $loc_js_script_comment5$
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}
