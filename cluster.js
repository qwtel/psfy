const cluster = require('cluster');
const promisify = require('util').promisify;
let disconnect;
module.exports = new Proxy(cluster, {
  get(target, name) {
    switch(name) {
      case 'disconnect': if (!disconnect) disconnect = promisify(target.disconnect); return disconnect;
      default: return target[name];
    }
  },
});