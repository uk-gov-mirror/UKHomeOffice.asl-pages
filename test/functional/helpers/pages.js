const { values, flatten } = require('lodash');
const path = require('path');
const pages = require('../pages');

module.exports = () => {
  const cwd = path.resolve(__dirname, '../../..');
  return flatten(values(pages).map(values))
    .map(page => path.resolve(cwd, `./${page}`))
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
