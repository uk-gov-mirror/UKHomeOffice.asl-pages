const { pickBy, startsWith } = require('lodash');

module.exports = req => {
  return req.form.values.modules.reduce((speciesMap, module) => {
    return {
      ...speciesMap,
      [`module-${module}-species`]: Object.values(pickBy(req.body, (value, key) => {
        return startsWith(key, `module-${module}-species`);
      })).filter(s => s !== '')
    };
  }, {});
};
