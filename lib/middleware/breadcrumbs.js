const { Router } = require('express');
const { render } = require('mustache');

module.exports = crumbs => {
  const router = Router();
  router.get('/', (req, res, next) => {
    res.locals.crumbs = crumbs && crumbs.map(c => {
      if (typeof c === 'string') {
        return render(c, res.store.getState());
      }
      return {
        label: render(c.label, res.store.getState()),
        href: render(c.href, res.store.getState())
      };
    });
    next();
  });
  return router;
};
