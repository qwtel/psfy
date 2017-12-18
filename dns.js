const dns = require('dns');
const promisify = require('util').promisify;
let lookup, lookupService, resolve, resolve4, resolve6, resolveCname, resolveMx, resolveNaptr, resolveNs, resolvePtr, resolveSoa, resolveSrv, resolveTxt, resolveAny, reverse;
module.exports = new Proxy(dns, {
  get(target, name) {
    switch(name) {
      case 'lookup': if (!lookup) lookup = promisify(target.lookup); return lookup;
      case 'lookupService': if (!lookupService) lookupService = promisify(target.lookupService); return lookupService;
      case 'resolve': if (!resolve) resolve = promisify(target.resolve); return resolve;
      case 'resolve4': if (!resolve4) resolve4 = promisify(target.resolve4); return resolve4;
      case 'resolve6': if (!resolve6) resolve6 = promisify(target.resolve6); return resolve6;
      case 'resolveCname': if (!resolveCname) resolveCname = promisify(target.resolveCname); return resolveCname;
      case 'resolveMx': if (!resolveMx) resolveMx = promisify(target.resolveMx); return resolveMx;
      case 'resolveNaptr': if (!resolveNaptr) resolveNaptr = promisify(target.resolveNaptr); return resolveNaptr;
      case 'resolveNs': if (!resolveNs) resolveNs = promisify(target.resolveNs); return resolveNs;
      case 'resolvePtr': if (!resolvePtr) resolvePtr = promisify(target.resolvePtr); return resolvePtr;
      case 'resolveSoa': if (!resolveSoa) resolveSoa = promisify(target.resolveSoa); return resolveSoa;
      case 'resolveSrv': if (!resolveSrv) resolveSrv = promisify(target.resolveSrv); return resolveSrv;
      case 'resolveTxt': if (!resolveTxt) resolveTxt = promisify(target.resolveTxt); return resolveTxt;
      case 'resolveAny': if (!resolveAny) resolveAny = promisify(target.resolveAny); return resolveAny;
      case 'reverse': if (!reverse) reverse = promisify(target.reverse); return reverse;
      default: return target[name];
    }
  },
});