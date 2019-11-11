const { pick } = require('lodash');

module.exports = () => (req, res, next) => {
  const fields = [
    'certificateNumber',
    'accreditingBody',
    'otherAccreditingBody',
    'passDate',
    'modules',
    'species'
  ];
  const values = pick(req.session.form[req.model.id].values, fields);

  const opts = {
    method: 'POST',
    json: {
      data: {
        ...values,
        modules: (values.modules || []).map(m => ({ module: m }))
      }
    }
  };

  return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/certificate`, opts)
    .then(() => {
      delete req.session.form[req.model.id];
      return next();
    })
    .catch(next);
};
