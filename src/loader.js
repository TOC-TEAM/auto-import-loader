const loaderUtils = require('loader-utils')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const { addSideEffect } = require('@babel/helper-module-imports')
const path = require('path')
const globby = require('globby')

module.exports = function autoImport(content) {
  const options = loaderUtils.getOptions(this)
  const entryDir = path.join(this.rootContext, options.entry)

  if (!this.resourcePath.includes(entryDir)) return content

  const entryBasename = path.basename(this.resourcePath)
  const assetPattern = path.join(
    this.rootContext,
    options.asset,
    path
      .dirname(this.resourcePath)
      .split('/')
      .slice(-1)[0],
    entryBasename.replace(/\.jsx?$/, ''),
    '*.js'
  )
  const modules = globby.sync(assetPattern)

  const cssPreprocessorPath = path.join(
    this.context,
    entryBasename.replace('js', options.cssPreprocessor || 'scss')
  )

  const ast = babelParser.parse(content, {
    sourceType: 'module',
  })

  traverse(ast, {
    Program: _path => {
      if (cssPreprocessorPath) {
        addSideEffect(_path, cssPreprocessorPath)
      }

      if (modules && modules.length > 0) {
        modules.forEach(m => addSideEffect(_path, m))
      }
    },
  })

  return generate(ast, {}, content).code
}
