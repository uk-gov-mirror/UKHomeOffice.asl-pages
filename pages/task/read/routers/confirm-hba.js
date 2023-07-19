const { Router } = require('express');
const { form } = require('../../../common/routers');
const schema = require('../../schema/confirm-hba');
const { default: axios } = require('axios');
const { get } = require('lodash');

module.exports = (config) => {
  const app = Router({ mergeParams: true });

  app.get('/', async (req, res, next) => {
    const hbaTokenFromTask = req.task.data.meta.hbaToken;
    if (hbaTokenFromTask) {
      const { headers } = await axios.get(
        `${config.attachments}/${hbaTokenFromTask}`
      );
      const filename = headers["'x-original-filename"];

      res.locals.static.hba = {
        hbaToken: hbaTokenFromTask,
        hbaFilename: filename
      };
    } else {
      const { hbaToken, hbaFilename } = req.session.form[req.task.id].values;
      if (hbaToken && hbaFilename) {
        res.locals.static.hba = {
          hbaToken,
          hbaFilename
        };
      }
    }
    if (!res.locals.static.hba) {
      console.error('No HBA detected, redirecting back to task page');
      return res.redirect(req.buildRoute('task.read'));
    }
    next();
  });

  app.use(
    form({
      schema,
      locals(req, res, next) {
        res.locals.static.establishment = req.task.data.establishment;
        res.locals.static.licenceHolder = req.task.data.licenceHolder;
        res.locals.static.task = req.task;
        next();
      }
    })
  );

  app.post('/', (req, res, next) => {
    const { confirmHba } = req.form.values;
    if (confirmHba === 'no') {
      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
      };

      return req
        .api(`/tasks/${req.task.id}/hba`, opts)
        .then(() => {
          delete req.session.form[req.task.id].values.hbaFilename;
          delete req.session.form[req.task.id].values.hbaToken;
        })
        .then(() =>
          res.redirect(req.buildRoute('task.read', { suffix: 'upload-hba' }))
        )
        .catch(next);
    } else if (confirmHba === 'yes') {
      const { hbaToken } = req.session.form[req.task.id].values;

      if (!hbaToken) {
        return next(new Error('Missing HBA token'));
      }
      const opts = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        json: {
          data: {
            hbaToken
          }
        }
      };

      return req
        .api(`/tasks/${req.task.id}/hba`, opts)
        .then(() => next())
        .catch(next);
    } else {
      return next(new Error('Invalid choice'));
    }
  });

  app.post('/', (req, res, next) => {
    const daysSinceDeadline = get(req.task, 'data.deadline.daysSince');
    const hasDeadlinePassedReason = get(
      req.task,
      'data.meta.deadline-passed-reason'
    );
    const model = get(req.task, 'data.model');
    const action = get(req.task, 'data.action');
    const status = get(req.form, 'values.status');
    const isAsruUser = req.user.profile.asruUser;

    if (
      model === 'project' &&
      isAsruUser &&
      daysSinceDeadline > 0 &&
      !hasDeadlinePassedReason
    ) {
      return res.redirect(req.buildRoute('task.read.deadlinePassed'));
    }

    if (model === 'project' && action === 'grant-ra' && status === 'endorsed') {
      return res.redirect(req.buildRoute('task.read.raAwerb'));
    }

    if (
      model === 'project' &&
      ['grant', 'transfer', 'update'].includes(action) &&
      status === 'endorsed'
    ) {
      return res.redirect(req.buildRoute('task.read.endorse'));
    }

    return res.redirect(req.buildRoute('task.read', { suffix: 'confirm' }));
  });

  return app;
};
