const autoprefixer = require('autoprefixer')
const path = require('path')

const localStyleCondition = [
  path.join(__dirname, 'containers'),
  path.join(__dirname, 'components'),
  path.join(__dirname, 'pages'),
]

function getStyleLoaders({ dev, mode, sass }) {
  const loaders = [
    'babel-loader',
    path.join(__dirname, 'next-style-loader'),
    {
      loader: 'css-loader',
      options: {
        modules: mode === 'local',
        minimize: !dev,
        localIdentName: dev
          ? '[local]__[hash:base64:5]'
          : '[hash:base64]',
        url: false,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          autoprefixer({ browsers: ['last 2 versions'] }),
        ],
      },
    },
    'resolve-url-loader',
  ]

  if (sass) {
    loaders.push(
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true, // needed by resolve-url-loader
          includePaths: [
            // path.join(__dirname, 'styles'),
            // path.join(__dirname, 'node_modules'),
          ],
        },
      }, {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, './styles/_variables.scss'),
          ],
        },
      }
    )
  }

  return loaders
}

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)$/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      }, {
        test: /\.css$/,
        exclude: localStyleCondition,
        use: getStyleLoaders({ dev, mode: 'global' }),
      }, {
        test: /\.scss$/,
        exclude: localStyleCondition,
        use: getStyleLoaders({ dev, mode: 'global', sass: true }),
      }, {
        test: /\.css$/,
        include: localStyleCondition,
        use: getStyleLoaders({ dev, mode: 'local' }),
      }, {
        test: /\.scss$/,
        include: localStyleCondition,
        use: getStyleLoaders({ dev, mode: 'local', sass: true }),
      }
      // }, {
      //   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      // }, {
      //   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      // }, {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      // }, {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file-loader',
      // }, {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      // },
    )

    if (!dev) {
      // eslint-disable-next-line
      config.plugins = config.plugins.filter(p =>
        p.constructor.name !== 'UglifyJsPlugin'
      )

      // eslint-disable-next-line
      const Uglify = require('uglifyjs-webpack-plugin')
      config.plugins.push(
        new Uglify({
          parallel: true,
          sourceMap: true,
        })
      )
    }

    return config
  },
}
