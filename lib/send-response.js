module.exports = () => (req, res, next) => {
  if (res.template) {
    return res.render(res.template);
  }
  next();
};
