const tls = require('tls');
const promisify = require('util').promisify;
let connect;
module.exports = new Proxy(tls, {
  get(target, name) {
    switch(name) {
      case 'connect': if (!connect) connect = promisify(target.connect); return connect;
      default: return target[name];
    }
  },
});