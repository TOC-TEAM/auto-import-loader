/* eslint-disable
  import/order,
  multiline-ternary,
  no-param-reassign,
*/
import path from 'path'
import webpack from 'webpack'
import del from 'del'
import MemoryFS from 'memory-fs'

const module = config => {
  return {
    rules: config.rules
      ? config.rules
      : config.loader
      ? [
          {
            test: config.loader && config.loader.test,
            use: {
              loader: path.resolve(__dirname, '../../src/loader'),
              options: (config.loader && config.loader.options) || {},
            },
          },
        ]
      : [],
  }
}

const plugins = config => [].concat(config.plugins || [])

const output = config => {
  return {
    path: path.resolve(
      __dirname,
      `../outputs/${config.output ? config.output : ''}`
    ),
    filename: '[name].bundle.js',
  }
}

export default function(fixture, config, options) {
  // webpack Config
  config = {
    mode: 'development',
    devtool: config.devtool || 'sourcemap',
    context: path.resolve(__dirname, '..', 'fixtures'),
    entry: `./${fixture}`,
    output: output(config),
    module: module(config),
    plugins: plugins(config),
    optimization: {
      runtimeChunk: true,
    },
  }

  // Compiler Options
  options = Object.assign({ output: false }, options)

  if (options.output) del.sync(config.output.path)

  const compiler = webpack(config)

  if (!options.output) compiler.outputFileSystem = new MemoryFS()

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) reject(err)

      resolve(stats)
    })
  )
}
