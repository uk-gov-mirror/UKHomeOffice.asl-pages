module.exports = () => {
  return (error, req, res, next) => {
    if (error.status) {
      res.status(error.status);
    }
    console.log(error);
    res.render('error', { error });
  };
};
