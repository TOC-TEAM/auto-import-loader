# auto-import-loader

> A webpack loader to import modules automatically

[![Build Status](https://img.shields.io/travis/TOC-TEAM/auto-import-loader/master.svg)](https://travis-ci.org/TOC-TEAM/auto-import-loader)
[![Codecov branch](https://img.shields.io/codecov/c/github/TOC-TEAM/auto-import-loader/master.svg)](https://codecov.io/gh/TOC-TEAM/auto-import-loader)
[![NPM](https://img.shields.io/npm/v/auto-import-loader.svg)](https://www.npmjs.com/package/auto-import-loader)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install auto-import-loader -D
```

## Usage

webpack.config.js

```js
{
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'auto-import-loader',
            options: {
              entry: 'src/pages',
              asset: 'src/assets/js',
            },
          },
        ],
      },
    ],
  },
}
```

## Options

> 关于每个选项的描述可参考下面的[目录结构](#目录结构)

> 关于路径的配置，都是不需要配置完整的绝对路径的，在解析的时候，会自动基于 webpack loader 的[this.rootContext](https://webpack.js.org/api/loaders/#this-rootcontext)。

- entry: 配置入口模块的目录。比如功能模块全部放在`src/pages`下，那么`entry`的就是`src/pages`。配置该选项的目的是为了自动导入每个功能模块下的同名样式文件。

- asset: 配置每个页面的要加载的 js 资源。比如`home.html`页面要加载的资源放在`src/assets/js/account/home/`目录下， 那么该路径就是`src/assets/js`。因为 loader 会自动根据入口 js 所在的目录和文件名拼接成每个模块对应的资源目录。如入口文件放在`src/pages/position/index.js`，那么会自动导入`src/assets/js/position/index/*.js`。

- cssPreprocessor: 使用的 css 预处理器，如`scss`,`stylus`,`less`等，默认为`scss`。

## 目录结构

```
├── src
│   ├── assets
│   │   ├── font
│   │   ├── img
│   │   │   ├── banner.jpg
│   │   │   └── xxxxxMiss.gif
│   │   └── js
│   │       ├── account
│   │       └── position
│   │           ├── detail
│   │           │   └── show.js
│   │           ├── filter.js
│   │           └── index
│   │               └── animation.js
│   ├── pages
│   │   ├── account
│   │   │   ├── edit-name.html
│   │   │   ├── edit-name.js
│   │   │   ├── edit-name.scss
│   │   │   ├── home.html
│   │   │   ├── home.js
│   │   │   └── home.scss
│   │   └── position
│   │       ├── detail.html
│   │       ├── detail.js
│   │       ├── detail.scss
│   │       ├── index.html
│   │       ├── index.js
│   │       └── index.scss
│   └── widget
│       ├── base
│       │   └── base.html
│       ├── footer
│       │   └── footer.html
│       ├── header
│       │   └── header.html
│       └── layout
│           └── layout.html
```

## Licens

MIT © [TOC-TEAM](https://github.com/TOC-TEAM)
