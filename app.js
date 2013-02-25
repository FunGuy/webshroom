/**
 * Fun Guy
 *  https://github.com/FunGuy
 */


//* Environment
var WWW_HOST = process.env.FUNGUY_WWW_HOST || '0.0.0.0';
var WWW_PORT = process.env.FUNGUY_WWW_PORT || 8000;
var CLIENT_SOCKET_HOST = process.env.FUNGUY_CLIENT_SOCKET_HOST || '0.0.0.0';
var CLIENT_SOCKET_PORT = process.env.FUNGUY_CLIENT_SOCKET_PORT || 8006;
var SERVER_SOCKET_HOST = process.env.FUNGUY_SOCKET_SERVERS_HOST || '0.0.0.0';
var SERVER_SOCKET_PORT = process.env.FUNGUY_SOCKET_SERVERS_PORT || 27015;


//* Dependencies
var net = require('net'),
    http = require('http'),
    socketio = require('socket.io'),
    WebServer = require('./lib/WebServer'),
    ClientServer = require('./lib/ClientServer'),
    ServerServer = require('./lib/ServerServer');


//* Go!
var httpServer = http.createServer();
var clientSocket = socketio.listen(CLIENT_SOCKET_PORT);
var serverSocket = net.createServer();

clientSocket.set('log level', 1);

var portal = new (function(httpServer, clientSocket, serverSocket) {
    this.foo = 'bar';
    this.httpServer = httpServer;
    this.clientSocket = clientSocket;
    this.serverSocket = serverSocket;
    this.clients = [];
    this.servers = [];
    this.webServer = new WebServer(this, httpServer);
    this.clientServer = new ClientServer(this, clientSocket);
    this.serverServer = new ServerServer(this, serverSocket);
})(httpServer, clientSocket, serverSocket);

httpServer.listen(WWW_PORT, WWW_HOST, function() {
  console.log("HTTP server listening on %s:%s.", WWW_HOST, WWW_PORT);
});

serverSocket.listen(SERVER_SOCKET_PORT, SERVER_SOCKET_HOST, function() {
  console.log("NET server listening on %s:%s.", SERVER_SOCKET_HOST,
      SERVER_SOCKET_PORT);
});
