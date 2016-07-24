'use strict';

const net = require('net');
const clientPool = require(__dirname + '/lib/ClientPool');

var newPool = new clientPool();

var port = 3000;

var server = module.exports = net.createServer((socket) => {
  newPool.ee.emit('register', socket);
});
