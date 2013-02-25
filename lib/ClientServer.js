var Client = require('./Client');

var ClientServer = module.exports = function(portal, socketio) {
    console.log('ClientServer(portal, socketio)');
    this.portal = portal;
    this.socketio = socketio;
    this.socketio.sockets.on('connection', this.onConnection());
}

ClientServer.prototype.onConnection = function() {
    var server = this;
    return function(socket) {
        console.log('ClientServer.onConnection(socket.id):');
        console.log(socket.id);
        var client = new Client(server, socket);
    };
};
