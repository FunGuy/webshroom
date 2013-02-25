/**
 * requires:
 *  feedback.js
 */


var funguy = {
    socket : null,

    init : function(p_socket) {
        feedback('init(p_socket):');
        feedback(p_socket);
        socket = p_socket;
        socket.on('connect', function(data) {
            feedback('socket connected');
        });

        socket.on('disconnect', function(data) {
            feedback('socket disconnected');
        });

        socket.on('served', function(data) {
            funguy.handleServed(data);
        });

        socket.on('service-list', function(data) {
            funguy.handleServiceList(data);
        });

        socket.on('user-list', function(data) {
            funguy.handleUserList(data);
        });
    },


    //* outgoing

    getServed : function(service) {
        socket.emit('get-served', { serviceId: service.id });
    },

    getUserList : function() {
        socket.emit('get-user-list');
    },


    //* incoming

    handleServed : function(data) {
        console.log('served! (%s)', JSON.stringify(data));
    },

    handleServiceList : function(data) {
        console.log('handleServiceList(data):');
        console.log(data);
        dust.render('services-available', data, function(err, out) {
            $('#services-available').replaceWith(err || out);
            $('#services-available .item').on('click', function(e) {
                console.log('======');
                console.log(e);
                console.log(this);
                console.log($(this));
                var service = { id: 0 };
                funguy.getServed(service);
                //join_service();
                alert('cliiick!');
            });
        });
    },

    handleUserList : function(data) {
        console.log('handleUserList(data)');
        console.log(data);
    }
};


$(function() {
    var socket = io.connect(':8006', { reconnect: true });
    funguy.init(socket);

    //* dust.js stuff
    //* TODO ? call callback('error message', null);
    dust.onLoad = function(name, callback) {
        $.get(['views/', '.dust.html'].join(name), function(data) {
            callback(null, data);
        }, 'html').error(function() {
            console.log('Missing template "' + name + '".');
        });
    };
});
