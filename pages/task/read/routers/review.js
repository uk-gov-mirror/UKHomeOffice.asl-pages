const { Router } = require('express');
const { get } = require('lodash');
const moment = require('moment');
const { render } = require('mustache');
const refusalNoticeContent = require('../content/refusal-notice');
const { dateFormat } = require('../../../../constants');

const trim = value => value.split('\n').map(s => s.trim()).join('\n').trim();

const getRefusalNoticeMarkdown = (task, inspector, refusalReason) => {
  const today = moment();
  const noticeDate = today.format(dateFormat.long);
  const respondByDate = today.add(28, 'days').format(dateFormat.long);
  const projectTitle = get(task, 'data.modelData.title');
  const licenceHolderName = `${get(task, 'data.licenceHolder.firstName')} ${get(task, 'data.licenceHolder.lastName')}`;
  const inspectorName = `${inspector.firstName} ${inspector.lastName}`;

  return trim(render(refusalNoticeContent.full, {
    noticeDate,
    respondByDate,
    projectTitle,
    refusalReason,
    licenceHolderName,
    inspectorName
  }));
};

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    const { values, meta } = get(req, `session.form[${req.task.id}]`, {});

    if (values.status !== 'intention-to-refuse') {
      return res.redirect(req.buildRoute('task.read'));
    }

    res.locals.static.task = req.task;
    res.locals.static.inspector = req.user.profile;
    res.locals.static.refusalReason = meta.comment;
    res.locals.static.editUrl = req.buildRoute('task.read.confirm');

    next();
  });

  app.post('/', (req, res, next) => {
    const { values, meta } = get(req, `session.form[${req.task.id}]`);

    meta.refusalNotice = {
      deadline: moment().add(28, 'days').format('YYYY-MM-DD'),
      markdown: getRefusalNoticeMarkdown(req.task, req.user.profile, meta.comment),
      inspectorId: req.user.profile.id
    };

    console.log({ values, meta });

    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      json: {
        data: values,
        meta
      }
    };

    return req.api(`/tasks/${req.task.id}/status`, opts)
      .then(response => {
        req.session.success = { taskId: get(response, 'json.data.id') };
        delete req.session.form[req.model.id];
        return res.redirect('success');
      })
      .catch(next);
  });

  return app;
};
