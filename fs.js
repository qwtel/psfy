const fs = require('fs');
const promisify = require('util').promisify;

let access, appendFile, chmod, chown, close, copyFile, exists, fchmod, fchown, fdatasync, fstat, fsync, ftruncate, futimes, lchmod, lchown, link, lstat, mkdir, mkdtemp, open, read, readdir, readFile, readlink, realpath, rename, rmdir, stat, symlink, truncate, unlink, utimes, write, writeFile;

module.exports = new Proxy(fs, {
  get(target, name) {
    switch(name) {
      case 'access': if (!access) access = promisify(target.access); return access;
      case 'appendFile': if (!appendFile) appendFile = promisify(target.appendFile); return appendFile;
      case 'chmod': if (!chmod) chmod = promisify(target.chmod); return chmod;
      case 'chown': if (!chown) chown = promisify(target.chown); return chown;
      case 'close': if (!close) close = promisify(target.close); return close;
      case 'copyFile': if (!copyFile) copyFile = promisify(target.copyFile); return copyFile;
      case 'exists': if (!exists) exists = promisify(target.exists); return exists;
      case 'fchmod': if (!fchmod) fchmod = promisify(target.fchmod); return fchmod;
      case 'fchown': if (!fchown) fchown = promisify(target.fchown); return fchown;
      case 'fdatasync': if (!fdatasync) fdatasync = promisify(target.fdatasync); return fdatasync;
      case 'fstat': if (!fstat) fstat = promisify(target.fstat); return fstat;
      case 'fsync': if (!fsync) fsync = promisify(target.fsync); return fsync;
      case 'ftruncate': if (!ftruncate) ftruncate = promisify(target.ftruncate); return ftruncate;
      case 'futimes': if (!futimes) futimes = promisify(target.futimes); return futimes;
      case 'lchmod': if (!lchmod) lchmod = promisify(target.lchmod); return lchmod;
      case 'lchown': if (!lchown) lchown = promisify(target.lchown); return lchown;
      case 'link': if (!link) link = promisify(target.link); return link;
      case 'lstat': if (!lstat) lstat = promisify(target.lstat); return lstat;
      case 'mkdir': if (!mkdir) mkdir = promisify(target.mkdir); return mkdir;
      case 'mkdtemp': if (!mkdtemp) mkdtemp = promisify(target.mkdtemp); return mkdtemp;
      case 'open': if (!open) open = promisify(target.open); return open;
      case 'read': if (!read) read = promisify(target.read); return read;
      case 'readdir': if (!readdir) readdir = promisify(target.readdir); return readdir;
      case 'readFile': if (!readFile) readFile = promisify(target.readFile); return readFile;
      case 'readlink': if (!readlink) readlink = promisify(target.readlink); return readlink;
      case 'realpath': if (!realpath) realpath = promisify(target.realpath); return realpath;
      case 'rename': if (!rename) rename = promisify(target.rename); return rename;
      case 'rmdir': if (!rmdir) rmdir = promisify(target.rmdir); return rmdir;
      case 'stat': if (!stat) stat = promisify(target.stat); return stat;
      case 'symlink': if (!symlink) symlink = promisify(target.symlink); return symlink;
      case 'truncate': if (!truncate) truncate = promisify(target.truncate); return truncate;
      case 'unlink': if (!unlink) unlink = promisify(target.unlink); return unlink;
      case 'utimes': if (!utimes) utimes = promisify(target.utimes); return utimes;
      case 'write': if (!write) write = promisify(target.write); return write;
      case 'writeFile': if (!writeFile) writeFile = promisify(target.writeFile); return writeFile;
      default: return target[name];
    }
  },
});