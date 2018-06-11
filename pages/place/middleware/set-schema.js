const { merge } = require('lodash');
const getRoles = require('./get-roles');

module.exports = ({ schema }) => (req, res, next) => {
  getRoles(req)
    .then(roles => {
      const options = roles.filter(r => r.type === 'nacwo').map(({ id, profile: { name } }) => ({
        label: name,
        value: id
      }));
      req.form.schema = merge({}, schema, {
        nacwo: {
          options,
          validate: [
            'required',
            { definedValues: options.map(option => option.value) }
          ]
        }
      });
    })
    .then(() => next())
    .catch(next);
};
