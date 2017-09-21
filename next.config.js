const fs = require('fs');
const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const styleBundleNamer = (getPath) => {
  const p = getPath('[name]');
  if (p.endsWith('.css')) {
    return p;
  }
  return p.replace(/\.js$/, '.css');
};

const ExtractStyle = new ExtractTextPlugin({ filename: styleBundleNamer, disable: false, allChunks: true });

module.exports = {
  webpack: async (config_, { dev: _ }) => {
    const config = config_;
    if (typeof config.entry === 'function') {
      config.entry = await config.entry();
    }
    // We also have tests for pages under the 'pages' folder.
    // To avoid building bundles for those, we have to remove such entryes.
    // This should only be a temporal work-around, since this will not update count
    // of pages already calculated for the 'common chunks' optimization.
    // if (!dev) {
    //   Object.keys(config.entry).forEach((key) => {
    //     if (/\Wtest\.js($|\?)/.test(config.entry[key][0])) {
    //       delete config.entry[key];
    //     }
    //   });
    // }

    // fs.writeFileSync('./____config.json', JSON.stringify(config, null, 2), 'utf-8');

    config.entry['bundles/main.css'] = path.join(__dirname, 'styles', 'main.scss');

    const commonStyleLoaders = [
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            autoprefixer({ browsers: ['last 2 versions'] }),
          ],
        },
      },
      'sass-loader',
    ];

    config.module.rules.push(
      {
        test: /\.local\.(css|scss)$/,
        use: ExtractStyle.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                // url: false,
                modules: true,
                importLoaders: 1,
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
              },
            },
            ...commonStyleLoaders,
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, './styles/_variables.scss'),
                ],
              },
            },
          ],
        }),
      }, {
        test: /^((?!\.local).)+\.(css|scss)$/,
        use: ExtractStyle.extract({
          use: [
            'css-loader',
            ...commonStyleLoaders,
          ],
        }),
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    );

    config.plugins.unshift(ExtractStyle);
    // config.plugins.push(ExtractStyle);

    return config;
  },
};
