/* eslint implicit-dependencies/no-implicit: [2, { dev: true }] */

const path = require('path');
const { merge } = require('lodash');
const defaults = require('@asl/service/ui/webpack.config');

module.exports = merge(defaults([__dirname]), {
  output: {
    path: path.resolve(__dirname, './pages/common/dist/js')
  }
});
