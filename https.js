const https = require('https');
const promisify = require('util').promisify;
let get, request;
module.exports = new Proxy(https, {
  get(target, name) {
    switch(name) {
      case 'get': if (!get) get = promisify(target.get); return get;
      case 'request': if (!request) request = promisify(target.request); return request;
      default: return target[name];
    }
  },
});