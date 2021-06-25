const { page } = require('@asl/service/ui');
const { multiStep } = require('../../common/routers');
const config = require('./config');
const schema = require('./schema');

module.exports = () => {
  const app = page({ root: __dirname });

  app.use(multiStep({
    config,
    schema,
    root: 'rops.update',
    postData: (req, res, next) => {
      const params = {
        method: 'PUT',
        json: {
          data: req.multiStep.values
        }
      };
      req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rop/${req.ropId}`, params)
        .then(() => {
          delete req.session.form[req.model.id].values;
          next();
        })
        .catch(next);
    }
  }));

  return app;
};
