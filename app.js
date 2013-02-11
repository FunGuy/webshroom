//* Load modules
var portal_web = require('./portal-web'),
    portal_socket = require('./portal-socket'),
    game_server = require('./game-server');


//* Run modules
portal_web.run();
portal_socket.run();
// game_server.run();