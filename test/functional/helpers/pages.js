const path = require('path');
const glob = require('glob');

module.exports = () => {
  const cwd = path.resolve(__dirname, '../../..');
  const opts = { ignore: ['./pages/common/**'], cwd };
  return glob.sync('./pages/**/views/index.jsx', opts)
    .map(page => path.resolve(page, '../..'))
    .reduce((paths, page) => {
      let middleware = (req, res, next) => next();
      try {
        middleware = require(`${page}/tests/middleware`);
      } catch (e) {}
      return Object.assign(paths, {
        [path.relative(cwd, page)]: {
          router: require(page)(),
          middleware
        }
      });
    }, {});
};
