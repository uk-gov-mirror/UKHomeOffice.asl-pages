const path = require('path');
const glob = require('glob');

module.exports = () => {
  const cwd = path.resolve(__dirname, '../../..');
  const opts = { ignore: ['./pages/common'], cwd };
  return glob.sync('./pages/**/views/index.jsx', opts)
    .map(page => path.resolve(page, '../..'))
    .reduce((paths, page) => {
      return Object.assign(paths, { [path.relative(cwd, page)]: require(page)() });
    }, {});
};
