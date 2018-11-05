const pil = require('../../../../test/functional/fixtures/pil.json');
const profile = require('../../../../test/functional/fixtures/profile.json');

module.exports = (req, res, next) => {
  req.pil = pil;
  req.profile = profile;

  res.locals.static.establishment = {
    name: 'University of Croydon'
  };
  next();
}
