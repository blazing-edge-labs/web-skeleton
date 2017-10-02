const autoprefixer = require('autoprefixer');
const path = require('path');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      autoprefixer({ browsers: ['last 2 versions'] }),
    ],
  },
};

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
        use: [
          'babel-loader',
          'raw-loader',
          postcssLoader,
        ],
      }, {
        test: /\.scss$/,
        use: [
          'babel-loader',
          'raw-loader',
          postcssLoader,
          'resolve-url-loader',
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
          },
        ],
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
      },
    );

    return config;
  },
};
