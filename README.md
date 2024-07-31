# @logicflow/dumi-theme-simple

[![NPM version](https://img.shields.io/npm/v/@logicflow/dumi-theme-simple.svg?style=flat)](https://npmjs.org/package/@logicflow/dumi-theme-simple)
[![NPM downloads](http://img.shields.io/npm/dm/@logicflow/dumi-theme-simple.svg?style=flat)](https://npmjs.org/package/@logicflow/dumi-theme-simple)

A theme package for the [dumi](https://next.d.umijs.org) framework.

## Usage

Install this theme into `devDependencies`:

```bash
$ npm i @logicflow/dumi-theme-simple -D
```

Configure it in dumi config file `.dumirc.ts`:

```ts
import { defineConfig } from 'dumi';

export defineConfig({
  themeConfig: {
    ...
  },
});
```

That's all, now you can execute `dumi dev` and enjoy this theme.

## Options

TODO

## Development

```bash
$ npm install
```

After the dependencies are installed, a symlink from `example/.dumi/theme` to `../../src` will be created automatically, the symlink makes dumi load our theme package as a local theme, so we can start the example directly, HMR is also available:

```bash
# build project
pnpm run build

# switch to example directory
$ cd example

# downloads the dependencies
npm install

# start dev server to preview
npm run dev
```

dumi theme development documentation: https://next.d.umijs.org/theme

## LICENSE

MIT
