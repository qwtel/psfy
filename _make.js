#!/usr/bin/env node

require('isomorphic-fetch');

const net = require('net');
const { promisify } = require('util');
const { basename, resolve } = require('path');
const fs = require('fs');

const { Observable } = require('rxjs');

const pkg = require('./package.json');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const open = promisify(fs.open);

(async function() {
  try {
    const index = await fetch('https://nodejs.org/api/index.json').then(x => x.json());
    const writtenModules = await Observable.from(index.desc)
      .filter(({ type, text }) => type === 'text' && /\[.*?\]\(.*?\.html\)/i.test(text))
      .map(({ text }) => /\[(.*?)\]\((.*?).html\)/.exec(text))
      .map(([, title, token]) => ({ title, token, href: `https://nodejs.org/api/${token}.json` }))
      .mergeMap(({ title, token, href }) => fetch(href).then(x => x.json()).then(data => ({ title, token, href, data })))
      .concatMap(async ({ token, data: { modules }}) => {
        let uMethods = [];
        if (modules && modules[0] && modules[0].methods) {
          uMethods = await Observable.from(modules[0].methods)
            .distinct(a => a.name)
            .filter(m => m.signatures.some(s => s.params.some(p => p.name === 'callback')))
            .toArray()
            .toPromise();
          }

        let file;
        if (uMethods.length) {
          const lets = uMethods.length ? `let ${uMethods.map(m => m.name).join(', ')};` : '';

          const cases = uMethods
            .map(m => `case '${m.name}': if (!${m.name}) ${m.name} = promisify(target.${m.name}); return ${m.name};`)

          file = String.prototype.trim.call(`
const ${token} = require('${token}');
const promisify = require('util').promisify;
${lets}
module.exports = new Proxy(${token}, {
  get(target, name) {
    switch(name) {
      ${cases.join('\n      ')}
      default: return target[name];
    }
  },
});`);
        } else {
          file = String.prototype.trim.call(`
const ${token} = require('${token}');
module.exports = ${token};`);
        }

        return writeFile(resolve(`./${token}.js`), file, 'utf-8').then(() => token);
      })
      .toArray()
      .toPromise();

    pkg.files = writtenModules.map(x => `${x}.js`);
    return writeFile(resolve(`./package.json`), JSON.stringify(pkg, (k, v) => v, 2), 'utf-8');
  } catch (e) {
    console.error(e);
  }
}());
