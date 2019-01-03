import webpack from './helpers/compiler'

describe('when applied with option', () => {
  it('matches snapshot for `entry` and `asset`', async () => {
    const config = {
      loader: {
        test: /.jsx?$/,
        options: { entry: 'src/pages', asset: 'src/assets/js' },
      },
    }

    const stats = await webpack('src/pages/test/index.js', config)
    const [module] = stats.toJson().modules
    expect(module.source).toMatchSnapshot()
  })

  it('matches snapshot for `cssPreprocessor`', async () => {
    const config = {
      loader: {
        test: /.jsx?$/,
        options: {
          entry: 'src/pages',
          asset: 'src/assets/js',
          cssPreprocessor: 'stylus',
        },
      },
    }

    const stats = await webpack('src/pages/test/index.js', config)
    const [module] = stats.toJson().modules
    expect(module.source).toMatchSnapshot()
  })
})
