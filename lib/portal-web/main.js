/**
 * FunGuy
 *  https://github.com/FunGuy
 */


var express = require('express'),
    path = require('path'),
    routes = require('./routes/main'),
    consolidate = require('consolidate');

/**
 * params: HTTPServer
 */
var WebServer = module.exports = function(portal, server) {
    this.portal = portal;
    this.server = server;
    var app = this.app = express();

    //* Config
    app.engine('dust.html', consolidate.dust);

    app.configure(function() {
        // app.set('port', port);
        // app.set('host', host);
        app.set('views', __dirname + '/static/views');
        app.set('view engine', 'dust.html');
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'static')));
    });

    app.configure('development', function() {
        app.use(express.errorHandler());
    });

    //* Web Routes
    app.get('/', routes.index());
    app.get('/testicle', function(req, res) {
        res.end('testicle HEHE');
    });

    //* Register Handler
    server.on('request', app);
}
