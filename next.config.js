const autoprefixer = require('autoprefixer');
const path = require('path');

const localStyleCondition = [
  path.join(__dirname, 'containers'),
  path.join(__dirname, 'components'),
];

function getStyleLoaders(options) {
  const loaders = [
    'babel-loader',
    path.join(__dirname, 'next-style-loader'),
    {
      loader: 'css-loader',
      options: {
        modules: options.mode === 'local',
        minimize: true,
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
  ];

  if (options.sass) {
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
    );
  }

  return loaders;
}

module.exports = {
  webpack: (config, { dev: _ }) => {
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
        use: getStyleLoaders({ mode: 'global' }),
      }, {
        test: /\.scss$/,
        exclude: localStyleCondition,
        use: getStyleLoaders({ mode: 'global', sass: true }),
      }, {
        test: /\.css$/,
        include: localStyleCondition,
        use: getStyleLoaders({ mode: 'local' }),
      }, {
        test: /\.scss$/,
        include: localStyleCondition,
        use: getStyleLoaders({ mode: 'local', sass: true }),
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
    );

    return config;
  },
};
