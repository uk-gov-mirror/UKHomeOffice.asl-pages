const { Router } = require('express');
const { get } = require('lodash');
const { BadRequestError } = require('@asl/service/errors');

module.exports = () => {
  const app = Router();

  app.put('/transfer-draft', (req, res, next) => {
    const openTasks = get(req.project, 'openTasks');

    if (openTasks.length > 0) {
      throw new BadRequestError('cannot transfer a draft with an open task');
    }

    const params = {
      method: 'PUT',
      json: {
        data: {
          targetEstablishmentId: get(req.body, 'targetEstablishmentId')
        }
      }
    };

    console.log('sending params to api', params);

    req.api(`/establishment/${req.establishmentId}/projects/${req.projectId}/transfer-draft`, params)
      .then(response => {
        const project = response.json.data;
        const newProjectUrl = `/establishments/${project.establishmentId}/projects/${project.id}`;
        res.json({ url: newProjectUrl });
      })
      .catch(next);
  });

  return app;
};
