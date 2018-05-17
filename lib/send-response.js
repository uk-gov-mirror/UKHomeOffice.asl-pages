module.exports = settings => (req, res, next) => {
  if (res.template) {
    return res.render(res.template);
  } else {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  }
};
