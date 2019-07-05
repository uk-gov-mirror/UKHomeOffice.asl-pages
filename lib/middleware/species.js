const { pickBy, startsWith } = require('lodash');

const process = () => (req, res, next) => {

  req.form.values.modules.map(m => {
    const specs = Object.values(pickBy(req.body, (value, key) => {
      return startsWith(key, `module-${m}-species`);
    })).filter(s => s !== '');
    req.form.values[`module-${m}-species`] = specs;
  });

  next();
};

module.exports = {
  process
};
