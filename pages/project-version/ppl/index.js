const { Router } = require('express');
const filenamify = require('filenamify');
const { omit } = require('lodash');
const { NotFoundError } = require('@asl/service/errors');

function clean(data) {
  data.protocols = (data.protocols || [])
    .filter(Boolean)
    .filter(p => !p.deleted)
    .map(p => omit(p, 'conditions'));

  return omit(data, 'conditions', 'retrospectiveAssessment', 'retrospectiveAssessmentRequired');
}

module.exports = () => {
  const app = Router();

  app.get('/', (req, res, next) => {
    if (req.project.schemaVersion === 0) {
      return next(new NotFoundError());
    }

    const values = req.version.data || {};
    res.attachment(`${filenamify(values.title || 'Untitled project')} (template).ppl`);
    res.end(JSON.stringify(clean(values)));
  });

  return app;
};
