const { holdingCodes, suitabilityCodes } = require('../../../constants');
const { setSchema } = require('../../../lib/actions');
const getRoles = require('./get-roles');

module.exports = settings => (req, res, next) => {
  getRoles(req)
    .then(roles => res.store.dispatch(setSchema({
      site: {
        inputType: 'inputText'
      },
      area: {
        inputType: 'inputText'
      },
      name: {
        inputType: 'inputText'
      },
      suitability: {
        inputType: 'checkboxGroup',
        options: suitabilityCodes
      },
      holding: {
        inputType: 'checkboxGroup',
        options: holdingCodes
      },
      nacwo: {
        inputType: 'select',
        options: roles.filter(r => r.type === 'nacwo').map(({ id, profile: { name } }) => ({
          label: name,
          value: id
        }))
      }
    })))
    .then(() => next())
    .catch(next);
};
