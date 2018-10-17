const { get } = require('lodash');

const replace = params => fragment => {
  return fragment[0] === ':' ? params[fragment.substr(1)] : fragment;
};

module.exports = () => (req, res, next) => {

  req.buildRoute = (page, params) => {
    const href = get(res.locals.static.urls, page);
    if (!href) {
      throw new Error(`Unknown route target: ${page}`);
    }
    const replacer = replace({ ...req, ...params });
    let url = href.split('/').map(replacer).join('/');
    return url;
  };
  next();
};
