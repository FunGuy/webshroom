var Server = function(portal, socket) {
    this.portal = portal;
    this.socket = socket;
    this.services = [];

    portal.servers.push(this);
    this.socket.on('service-list', this.onServiceList);
    this.socket.on('disconnect', this.onDisconnect);
}

Server.prototype.onServiceList = function(data) {
    console.log('onServiceList(data)');
    console.log(data);
    this.services = data.services;
}; 

Server.prototype.onDisconnect = function() {
    this.portal.servers.splice(servers.indexOf(this));
    console.log('{this.portal.servers}:');
    console.log(this.portal.servers);
}

module.exports = Server;
