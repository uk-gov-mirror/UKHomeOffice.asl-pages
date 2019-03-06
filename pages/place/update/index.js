const { omit } = require('lodash');
const { page } = require('@asl/service/ui');
const confirm = require('../routers/confirm');
const amend = require('../routers/amend');
const success = require('../../common/routers/success');
const { schema } = require('../schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use('/', amend({
    schema: Object.assign({}, schema, {
      restrictions: {
        inputType: 'text',
        editable: false
      },
      changesToRestrictions: {
        inputType: 'textarea',
        conditionalReveal: true,
        detectChange: true,
        validate: ['required']
      },
      comments: {
        inputType: 'textarea'
      }
    })
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('place.update.confirm', { placeId: req.model.id }));
  });

  app.use('/confirm', confirm());

  app.post('/confirm', (req, res, next) => {
    const values = omit(
      req.session.form[req.model.id].values,
      ['declarations', 'conditional-reveal-changesToRestrictions']
    );
    const {
      changesToRestrictions,
      comments
    } = values;
    const params = {
      data: omit(values, ['changesToRestrictions', 'comments']),
      meta: {
        changesToRestrictions,
        comments
      }
    };

    const opts = {
      method: 'PUT',
      json: params
    };
    return req.api(`/establishment/${req.establishmentId}/place/${req.model.id}`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/confirm', (req, res, next) => {
    return res.redirect(req.buildRoute('place.update.success', { placeId: req.model.id }));
  });

  app.use('/success', success({
    model: 'place',
    licence: 'pel',
    type: 'amendment',
    status: 'resubmitted'
  }));

  return app;
};
