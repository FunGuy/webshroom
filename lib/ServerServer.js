function ServerServer(portal, socketServer) {
    this.portal = portal;
    this.socketServer = socketServer;
    //console.log('ServerServer(portal, socketServer)');
    //console.log(portal);
    //console.log(socketServer);
    this.socketServer.on('connection', this.onConnection);
}

ServerServer.prototype.onConnection = function(socket) {
    console.log('SocketServer.onConnection(socket.id)');
    console.log(socket.id);
    //console.log('SocketServer.onConnection(socket)');
    //console.log(socket);
    var server = new Server(this.portal, socket);
    this.portal.servers.push(server);
}

module.exports = ServerServer;
