module.exports = () => {
  return (error, req, res, next) => {
    res.status(500);
    if (error.status) {
      res.status(error.status);
    }
    console.error(error);
    res.render('error', { error });
  };
};
