const expect = require('chai').expect;
const net = require('net');

describe('server', function() {
  it('should let users communicate via message', function() {

    let client1 = net.connect({port: 3000, host: 'localhost'});

    client1.on('data', function(data) {
      expect(data.toString()).to.eql('Hello from the server');
      client1.end();
    });
  });
});
