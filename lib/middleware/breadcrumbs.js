module.exports = crumbs => (req, res, next) => {
  res.locals.crumbs = crumbs && crumbs.map(c => {
    const format = str =>
      str.replace(/{{(.*)}}/g, (match, prop) => res.establishment
        ? res.establishment[prop]
        : res.data[prop]
      );
    if (typeof c === 'string') {
      return format(c);
    }
    return {
      label: format(c.label),
      href: format(c.href)
    };
  });
  next();
};
