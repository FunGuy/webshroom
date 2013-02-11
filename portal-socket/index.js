var io = require('socket.io');


function run() {
    io = io.listen(3001);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}

module.exports.run = run;