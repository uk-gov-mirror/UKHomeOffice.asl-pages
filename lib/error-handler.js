const path = require('path')

module.exports = () => {
  return (error, req, res, next) => {
    console.log(error);
    if (error.status) {
      res.status(error.status);
    }
    res.render(path.resolve(__dirname, '../pages/common/views/error'), { error });
  };
};
