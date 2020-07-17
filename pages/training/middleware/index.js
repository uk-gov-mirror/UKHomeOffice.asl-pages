const { get } = require('lodash');

const submit = () => (req, res, next) => {
  const values = get(req.session, `form.${req.model.id}.values`);
  const isNewCert = req.certificateId === 'create';

  const params = {
    method: isNewCert ? 'POST' : 'PUT',
    json: {
      data: values
    }
  };

  req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/certificate/${isNewCert ? '' : req.certificateId}`, params)
    .then(() => {
      delete req.session.form[req.model.id];
      req.notification({ key: 'success' });
      res.redirect(req.buildRoute('training.dashboard'));
    })
    .catch(next);
};

module.exports = {
  submit
};
