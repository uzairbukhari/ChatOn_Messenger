var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    users = [];

server.listen(3000);

app.get('/', function(req , res) {
    res.sendfile('index.html');
});

io.sockets.on('connection', function(socket) {
    socket.on('new user', function (data , callback) {
        if (users.indexOf(data) != -1) {
            callback(false);
        } else {
            callback(true);
            socket.user = data;
            users.push(socket.user);
            updateUserList();
        }
    });

    socket.on('send message', function (data) {
        io.sockets.emit('new message', {
            name: socket.user,
            msg : data
        });
        //socket.broadcast.emit('new message', data); // send to everyone except me
    });

    socket.on('disconnect', function(data) {
        if (!socket.user) return;

        users.splice(users.indexOf(socket.user), 1);
        updateUserList();
    });

    function updateUserList() {
        io.sockets.emit('usernames', users);
    }
})