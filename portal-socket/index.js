var io = require('socket.io');

var _PORT;

var clients = [];

function init(port) {
    _PORT = port;
}

function run() {
    // TODO specify host
    io = io.listen(_PORT);
    io.set('log level', 1);
    io.sockets.on('connection', function (socket) {

        socket.emit('news', { hello: 'world' });

        socket.on('status', function (data) {
            console.log(data);
        });

        socket.on('list-services', function (data) {
            console.log(data);
            var services = {
                count: 2,
                services: [
                    { id: '1', name: 'service 1' },
                    { id: '2', name: 'service 2' }
                ]
            };
            socket.emit('list-services', services);
        });
    });
}


// * Exports
module.exports.init = init;
module.exports.run = run;
