/* eslint implicit-dependencies/no-implicit: [2, { dev: true }] */

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdir = require('mkdirp');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const TEMPLATE_PATH = path.resolve(__dirname, './pages/common/assets/js/template.jsx');
const template = fs.readFileSync(TEMPLATE_PATH).toString();

const pages = glob.sync('./pages/**/views/index.jsx', { ignore: ['./pages/common'] });

const entry = pages.reduce((entrypoints, page) => {
  const file = path.resolve(page, '../../dist/entry.js');
  mkdir.sync(path.dirname(file));
  const js = template
    .replace(/{{page}}/g, path.resolve(__dirname, page))
    .replace(/{{root}}/g, __dirname);
  fs.writeFileSync(file, js);
  return { ...entrypoints, [path.relative(__dirname, path.dirname(file))]: file };
}, {});

module.exports = {
  entry,
  output: {
    path: __dirname,
    filename: '[name]/index.js'
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
          name: 'pages/common/dist',
          chunks: 'initial',
          minChunks: pages.length
        }
      }
    }
  }
};
