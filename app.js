jQuery(function ($) {
    var socket = io.connect();
    var $msgForm = $('#sendMsg');
    var $msgBox = $('#chatDiv');
    var $msg = $('#txtMessage');

    $msgForm.submit(function (e) {
        e.preventDefault();
        socket.emit('send message', $msg.val());
        $msg.val('');
    });

    socket.on('new message', function (data) {
        var html = '<div class="chat-text"><b>Uzair : </b> ' + data + '</div>';
        $msgBox.append(html);
    });
});