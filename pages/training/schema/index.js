const certificateSchema = require('../certificate/schema');
const getModulesSchema = require('../modules/schema');
const typeSchema = require('../type/schema');
const speciesSchema = require('../species/schema');

module.exports = {
  ...certificateSchema,
  ...getModulesSchema(true),
  ...typeSchema,
  ...speciesSchema
};
