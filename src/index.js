const globby = require('globby')
const fs = require('fs')
const path = require('path')

class AutoImportWebpackPlugin {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        cssPreprocessor: 'scss',
      },
      options
    )
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'AutoImportWebpackPlugin',
      (compilation, callback) => {
        compilation.hooks.optimizeChunkAssets.tapAsync(
          'AutoImportWebpackPlugin',
          (chunks, _callback) => {
            const k = chunks
          }
        )
        callback()
      }
    )
  }
}

module.exports = AutoImportWebpackPlugin
