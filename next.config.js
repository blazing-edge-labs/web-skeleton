const runtimeDotenv = require('next-runtime-dotenv')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const autoprefixer = require('autoprefixer')
const path = require('path')

const withDotenv = runtimeDotenv({
  public: [
    'PORT',
    'API_URL',
  ],
  server: [
    // SSR only
  ],
})

const localStyleCondition = [
  path.join(__dirname, 'containers'),
  path.join(__dirname, 'components'),
  path.join(__dirname, 'pages'),
]

function getStyleLoaders(format, mode, config, { dev, isServer }) {
  return cssLoaderConfig(config, {
    extensions: [format],
    cssModules: mode === 'local',
    cssLoaderOptions: {
      // importLoaders: 2,
      // url: false,
    },
    dev,
    isServer,
    loaders: [
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            autoprefixer({ browsers: ['last 2 versions'] }),
          ],
        },
      },
      {
        loader: 'resolve-url-loader',
        options: {},
      },
      ...(format === 'scss' ? [
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true, // needed by resolve-url-loader
          },
        },
        {
          loader: 'sass-resources-loader',
          options: {
            sourceMap: true, // needed by resolve-url-loader
            resources: [
              path.resolve(__dirname, './styles/_variables.scss'),
            ],
          },
        },
      ] : []),
    ],
  })
}

module.exports = withDotenv({
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.css$/,
        exclude: localStyleCondition,
        use: getStyleLoaders('css', 'global', config, options),
      }, {
        test: /\.scss$/,
        exclude: localStyleCondition,
        use: getStyleLoaders('scss', 'global', config, options),
      }, {
        test: /\.css$/,
        include: localStyleCondition,
        use: getStyleLoaders('css', 'local', config, options),
      }, {
        test: /\.scss$/,
        include: localStyleCondition,
        use: getStyleLoaders('scss', 'local', config, options),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)(\?.*|$)/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: 'file-loader',
          publicPath: '/_next/static/fonts/',
          outputPath: 'static/fonts/',
          name: '[name]-[hash].[ext]',
        },
      },
    )

    // if (!dev) {
    //   // eslint-disable-next-line
    //   config.plugins = config.plugins.filter(
    //     p => p.constructor.name !== 'UglifyJsPlugin'
    //   )

    //   // eslint-disable-next-line
    //   const Uglify = require('uglifyjs-webpack-plugin')
    //   config.plugins.push(
    //     new Uglify({
    //       parallel: true,
    //       sourceMap: true,
    //     })
    //   )
    // }

    return config
  },
})
