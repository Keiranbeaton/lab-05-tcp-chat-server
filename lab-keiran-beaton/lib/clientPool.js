const clientPool = module.exports = exports = {};
const EE = require('events');

clientPool.ee = new EE();

clientPool.pool = {};
