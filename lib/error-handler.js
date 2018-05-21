module.exports = () => {
  return (error, req, res, next) => {
    if (error.status) {
      res.status(error.status);
    }
    res.render('error', { error });
  };
};
