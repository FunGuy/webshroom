//* Environment
var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes/main'),
    consolidate = require('consolidate');

var app;

function init(host, port) {
    //* Initialize web server
    app = express();

    app.engine('dust.html', consolidate.dust);

    app.configure(function() {
        app.set('port', port);
        app.set('host', host);
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


    //* Initialize web server routes
    app.get('/', routes.index());
}

function run() {
    //* Let's listen
    http.createServer(app).listen(app.get('port'), app.get('host'), function() {
      console.log("Express server listening on port " + app.get('port'));
    });
}


// * Exports
module.exports.init = init;
module.exports.run = run;
