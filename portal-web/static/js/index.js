$(function() {
    console.log('Herrow! o/');
    
    var socket = io.connect(':27016',{
        reconnect: true
    });

    socket.on('connect', function(data){
        console.log(data);
        socket.emit('list-services', {});
        socket.emit('status', {});
    });

    socket.on('list-services', function(data){
        update_available_services(data);
    });

    socket.on('status', function(data){
        console.log(data);
    });

    socket.on('disconnect', function(data){
        console.log(data);
    });

    /// dust.js stuff
    dust.onLoad = function(name, callback) {
        $.get(['views/', '.dust.html'].join(name), function(data) {
            callback(null, data);
        }, 'html').error(function() { console.log('Missing template "' + name + '".'); }); /// TODO ? call callback('error message', null);
    }
});

function update_available_services(services) {
    console.log(services);
    dust.render('services-available', services, function(err, out) {
        $('#services-available').replaceWith(err || out);
        $('#services-available .item').on('click', function() {
            //join_service();
            alert('cliiick!');
        });
    });
}

function join_service(service) {
}
