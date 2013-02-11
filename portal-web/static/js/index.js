$(function() {
    console.log('Herrow! o/');
    
    var socket = io.connect(':3001',{
        reconnect: true
    });

    socket.on('news', function(data){
        console.log(data);
    });
    socket.on('connect', function(){

    });
    socket.on('disconnect', function(){

    });

    socket.emit('my other event', { data: 'world' });
});