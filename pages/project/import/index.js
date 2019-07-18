const { omit, get } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = {
      id: 'new-project'
    };
    next();
  });

  app.use(form({
    schema,
    locals(req, res, next) {
      res.locals.static.establishment = req.establishment;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const buffer = get(req.files, 'upload[0].buffer');
    const data = JSON.parse(buffer.toString());

    const params = {
      method: 'POST',
      json: {
        data: {
          version: {
            data: omit(data, 'id', 'updated')
          }
        }
      }
    };

    req.api(`/establishments/${req.establishmentId}/projects`, params)
      .then(response => {
        const projectId = get(response, 'json.data.data.id');
        res.redirect(req.buildRoute('project.read', { projectId }));
      })
      .catch(next);
  });

  return app;
};
