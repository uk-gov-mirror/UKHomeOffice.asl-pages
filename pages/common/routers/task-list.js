const moment = require('moment');

const datatable = require('./datatable');
const { dateFormat } = require('../../../constants');

module.exports = () => {

  const schema = {
    updatedAt: {
      show: true
    },
    establishment: {
      show: true,
      sortable: false
    },
    licence: {
      show: true,
      sortable: false
    },
    type: {
      show: true,
      sortable: false,
      accessor: 'action.label'
    }
  };

  const buildTask = (taskCase, req) => {
    const licence = taskCase.data.model;
    let action = {};

    switch (licence) {
      case 'pil':
        action = {
          label: 'PIL application',
          url: req.buildRoute('task.read', { taskId: taskCase.id }),
          details: taskCase.data.subject.name
        };
        break;
    }

    return {
      updatedAt: moment(taskCase.updatedAt).format(dateFormat.medium),
      establishment: taskCase.data.establishment.name,
      licence: licence.toUpperCase(),
      action
    };
  };

  const table = datatable({
    getValues: (req, res, next) => {
      req.datatable.data.rows = req.datatable.data.rows.map(taskCase => {
        return buildTask(taskCase, req);
      });
      next();
    }
  });

  return table({
    schema,
    apiPath: '/me/tasks'
  });

};
