module.exports = () => {
  return (error, req, res, next) => {
    if (error.status) {
      res.status(error.status);
    }
    console.error(error);
    res.render('error', { error });
  };
};
