'use strict';
const expect = require('chai').expect;
const net = require('net');

const testServer = require('../lib/test-server.js');

testServer.startServer();

describe('chat server', function() {
  it('should allow clients to message each other', function() {

    let client1 = net.connect({port: 3000, host: 'localhost'});

    client1.on('data', function(data) {
      expect(data.toString()).to.eql('Welcome to the server Guest');
      client1.end();
    });
  });
});
