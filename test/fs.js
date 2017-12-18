const { resolve } = require('path');

const assert = require('assert');

describe('fs', () => {
  it('should exist', () => {
    assert(require('../fs'));
  });

  it('should return a promise', () => {
    const fs = require('../fs');
    const p = fs.readFile(resolve('./_make.js'), 'utf-8');
    assert(p instanceof Promise);
  });
});
