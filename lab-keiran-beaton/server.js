'use strict';

const net = require('net');
var clientPool = require('lib/clientPool');

let server = net.createServer(function(socket) {
  clientPool.ee.on('register', function(user) {
    for(var i = 0; i <= clientPool.pool.length; i++) {
      if(!clientPool.pool.i || clientPool.pool.i === 'empty') {
        clientPool.pool.i = user;
        clientPool.pool.i.nickname = 'guest-' + i;
        return;
      }
    }
  });
  clientPool.ee.emit('register');
  console.log('connected');
  socket.write('Hello from the server\n');
  socket.pipe(process.stdout);
  socket.on('data', function(data) {
    clientPool.pool.forEach(function(client) {
      if(client !== socket) {
        client.write(data.toString());
      }
    });
    if(data.toString() === 'END\r\n') {
      socket.end();
    }
  });
  socket.on('end', function() {
    console.log('disconnected');
    for(var i = 0; i < clientPool.pool.length; i++) {
      if(clientPool.pool.i === socket) {
        clientPool.pool.i = 'empty';
      }
    }
  });
});
server.listen('3000', function() {
  console.log('server up');
});
