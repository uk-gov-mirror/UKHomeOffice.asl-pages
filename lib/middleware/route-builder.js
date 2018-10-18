const { get } = require('lodash');

const replace = params => fragment => {
  return fragment[0] === ':' ? params[fragment.substr(1)] : fragment;
};

module.exports = () => (req, res, next) => {

  req.buildRoute = (page, params) => {
    console.log(res.locals.static.urls);
    const href = get(res.locals.static.urls, page);
    console.log('PAGE ', page);
    console.log('HREF ', href);
    if (!href) {
      throw new Error(`Unknown route target: ${page}`);
    }
    const replacer = replace({ ...req, ...params });
    const url = href.split('/').map(replacer).join('/');
    console.log('URL ', url);
    return url;
  };
  next();
};
