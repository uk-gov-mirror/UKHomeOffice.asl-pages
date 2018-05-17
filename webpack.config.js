/* eslint implicit-dependencies/no-implicit: [2, { dev: true }] */

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const TEMPLATE_PATH = path.resolve(__dirname, './pages/common/assets/js/template.jsx');
const template = fs.readFileSync(TEMPLATE_PATH).toString();

const pages = fs.readdirSync(path.resolve(__dirname, './pages')).filter(f => !f.includes('.') && f !== 'common');

const entry = pages.reduce((entrypoints, page) => {
  const file = path.resolve(__dirname, `./pages/common/assets/.js/${page}.js`);
  fs.writeFileSync(file, template.replace(/{{page}}/g, page));
  return { ...entrypoints, [page]: file };
}, {});

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, './pages'),
    filename: './[name]/dist/js/index.js'
  },
  mode,
  devtool: mode === 'development' && 'inline-source-map',
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/common\/views\/app/, require.resolve('./pages/common/assets/js/stub.jsx'))
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common',
          chunks: 'initial',
          minChunks: pages.length
        }
      }
    }
  }
};
