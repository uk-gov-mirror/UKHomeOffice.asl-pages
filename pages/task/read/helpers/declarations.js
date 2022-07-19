const { get } = require('lodash');
const { render } = require('mustache');
const content = require('../content/confirm');

const requiresDeclaration = (task, values) => {
  const model = task.data.model;
  let action = task.data.action;
  if (action === 'grant' && task.type === 'amendment') {
    action = 'update';
  }
  if (action === 'grant-ra') {
    return false;
  }
  return ['pil', 'trainingPil', 'project'].includes(model) && values.status === 'endorsed' && action !== 'review';
};

const trim = value => value.split('\n').map(s => s.trim()).join('\n').trim();

const getDeclarationText = (task, values) => {
  const declaration = get(content, `declaration.${values.status}.${task.data.model}`);
  const licenceHolder = get(task, 'data.modelData.profile') || get(task, 'data.modelData.licenceHolder');
  return trim(render(declaration, {
    name: `${get(licenceHolder, 'firstName')} ${get(licenceHolder, 'lastName')}`,
    type: task.type
  }));
};

module.exports = {
  requiresDeclaration,
  getDeclarationText
};
