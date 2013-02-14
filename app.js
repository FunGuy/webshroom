//* Environment
var WWW_HOST = process.env.WWW_HOST || '0.0.0.0';
var WWW_PORT = process.env.WWW_PORT || 27015;

var SOCKET_PORT = process.env.SOCKET_PORT || 27016;

//* Load services
var portal_web = require('./portal-web'),
    portal_socket = require('./portal-socket');

//* Init. services
portal_web.init(WWW_HOST, WWW_PORT);
portal_socket.init(SOCKET_PORT);

//* Run services
//* - portal-web
portal_web.run();

//* - portal-socket
portal_socket.run();
