module.exports = url => {
  return (req, res, next) => {
    const id = req.establishment
      ? `/${req.establishment}`
      : '';
    let u = url
      ? `${url}${id}`
      : req.originalUrl;
    req.api(u)
      .then(response => {
        res.data = response.json.data;
        if (response.json.meta) {
          res.establishment = response.json.meta.establishment
        }
      })
      .then(() => next())
      .catch(e => next(e));
  }
}
