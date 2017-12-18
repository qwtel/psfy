#!/usr/bin/env node

require('isomorphic-fetch');

const net = require('net');
const { promisify } = require('util');
const { basename, resolve } = require('path');
const fs = require('fs');

const { Observable } = require('rxjs');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const open = promisify(fs.open);

(async function() {
  try {
    const index = await fetch('https://nodejs.org/api/index.json').then(x => x.json());
    await Observable.from(index.desc)
      .filter(({ type, text }) => type === 'text' && /\[.*?\]\(.*?\.html\)/i.test(text))
      .map(({ text }) => /\[(.*?)\]\((.*?).html\)/.exec(text))
      .map(([, title, token]) => ({ title, token, href: `https://nodejs.org/api/${token}.json` }))
      .mergeMap(({ title, token, href }) => fetch(href).then(x => x.json()).then(data => ({ title, token, href, data })))
      .map(({ title, token, data }) => {
        const mod = data.modules && data.modules[0];
        if (!mod) return null;
        return {
          name: mod.name,
          title,
          token,
          methods: mod.methods && mod.methods.filter(m => m.signatures.some(s => s.params.some(p => p.name === 'callback'))) || [],
        };
      })
      .filter(x => x && x.methods.length)
      .concatMap(async ({ token, methods }) => {
        const uMethods = await Observable.from(methods).distinct(a => a.name).toArray().toPromise();

        const cases = uMethods
          .map(m => `case '${m.name}': if (!${m.name}) ${m.name} = promisify(target.${m.name}); return ${m.name};`)

        const file = String.prototype.trim.call(`
const ${token} = require('${token}');
const promisify = require('util').promisify;

let ${uMethods.map(m => m.name).join(', ')};

module.exports = new Proxy(${token}, {
  get(target, name) {
    switch(name) {
      ${cases.join('\n      ')}
      default: return target[name];
    }
  },
});`);

        return writeFile(resolve(`./${token}.js`), file, 'utf-8');
      })
      .toPromise();
  } catch (e) {
    console.error(e);
  }
}());
