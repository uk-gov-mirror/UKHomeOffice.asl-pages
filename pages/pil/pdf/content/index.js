const { merge } = require('lodash');
const commonContent = require('../../../common/content');
const baseContent = require('../../content');
const standardConditions = require('./standard-conditions');
const { fields } = require('../../read/content');

module.exports = merge({}, commonContent, baseContent, {
  legalPreamble:
`A personal licence on its own does not authorise you to perform regulated procedures on protected animals. You
apply regulated procedures of the category or categories specified below to animals of the species or groups
specified below at places specified in authorised project licences subject to the restrictions and provisions
contained in the Act and the conditions and restrictions below.

You are required to keep a record of all regulated procedures that you have carried out, and to make this
record available to the Home Office upon request. If you cease to work at the establishment given as the primary
availability on your licence, or it ceases to be the place where you wish your licence to be primarily
available, you must notify the Home Office.

This licence shall be in force until it is revoked by the Home Office and shall be subject to periodic review.`,
  standardConditions,
  fields
});
