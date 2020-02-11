const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const schema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = {
      id: 'new-legacy-project'
    };
    next();
  });

  app.use(form({
    schema,
    process: (req, res, next) => {
      const day = req.body['issueDate-day'];
      const month = req.body['issueDate-month'];
      const year = req.body['issueDate-year'];

      Object.assign(req.form.values, {
        issueDate: `${year}-${month}-${day}`
      });
      next();
    }
  }));

  app.get('/', (req, res, next) => {
    res.sendResponse();
  });

  return app;
};
