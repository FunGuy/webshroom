/**
 * TODO
 *  Should ClientServer handle adding and removing from portal.clients[]?
 */

var Client = module.exports = function(server, socket) {
    this.server = server;
    this.socket = socket;
    this.server.portal.clients.push(this);
    socket.on('serve-me', this.onServeMe());
    socket.on('disconnect', this.onDisconnect());
    socket.on('get-user-list', this.onGetUserList());
    this.sendAvailableServices();
};

Client.prototype.onDisconnect = function() {
    var client = this;
    return function() {
        console.log('Client.onDisconnect():');
        for (var i = 0; i < client.server.portal.clients.length; i++) {
            client.server.portal.clients.splice(i, 1);
        };
    };
};

Client.prototype.onGetUserList = function() {
    var client = this;
    return function(data) {
        var clients = client.server.portal.clients;
        var clientlist = [];
        console.log('Client.onGetUserList(data):');
        console.log(data);
        console.log(clients);
        for (var i = 0; i < client.server.portal.clients.length; i++) {
            clientlist.push(client.server.portal.clients[i].socket.id);
        };
        client.socket.emit('user-list', clientlist);
    };
};

Client.prototype.onServeMe = function() {
    var client = this;
    return function(data) {
        console.log('Client.onServeMe(data):');
        console.log(data);
    };
};

Client.prototype.sendAvailableServices = function() {
    this.socket.emit('service-list', this.server.portal.services);
};
