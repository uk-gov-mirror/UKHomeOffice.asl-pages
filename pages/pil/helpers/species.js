const { pickBy, startsWith } = require('lodash');
const { normalise } = require('../../../lib/utils');

module.exports = req => {
  return (req.form.values.modules || []).reduce((speciesMap, module) => {
    const normalisedModule = normalise(module);

    return {
      ...speciesMap,
      [`module-${normalisedModule}-species`]: Object.values(pickBy(req.body, (value, key) => {
        return startsWith(key, `module-${normalisedModule}-species`);
      })).filter(s => s !== 'Other' && s !== '')
    };
  }, {});
};
