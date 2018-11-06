const sinon = require('sinon');

module.exports = (req, res, next) => {
  res.locals.static.establishment = {
    name: 'University of Croydon'
  };
  req.profile = {};
  req.api = sinon.stub().resolves({
    json: {
      data: {
        pil: {
          id: 'PIL_ID'
        }
      }
    }
  });
  next();
};
