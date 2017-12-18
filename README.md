# P(romi)s(i)fy
Drop-in replacement of the node standard library with pre-promisified callback functions.

Node 8 introduced the [`promisify`][promisify] utility function, which wraps nodeback functions to return promises.
Unfortunately, the standard library remains unchanged, which is why it's not uncommon to write:

```js
const { promisify } = require('util');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const rename = promisify(fs.rename);
const stat = promisify(fs.stat);
```

...when what you really want is:

```js
const { readdir, rename, stat } = require('psfy/fs');
```

## FAQ
### This must be slow
It promisifies functions on-demand using a [`Proxy`][proxy], and remembers the result.

### This must be incomplete
It is complete to the extent that node authors follow the `callback` naming convention in the official documentation, which is used to generate this library. See [`_make.js`](./_make.js).

**NOTE**: Currently only top-level functions are promisified.

**TODO**: Monkey-patch class methods that expect callbacks.

### This will be incomplete as soon as there's a new node release

**TODO**: Git hook, autobuild on new node release

[promisify]: https://nodejs.org/api/util.html#util_util_promisify_original
[proxy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
