const { Router } = require('express');
const csv = require('csv-stringify');
const { flatten } = require('lodash');
const { projectSpecies } = require('@ukhomeoffice/asl-constants');

const lookupSpecies = row => {
  const species = flatten(Object.values(projectSpecies)).find(s => s.value === row.species);
  return { ...row, species: (species ? species.label : row.species) };
};

const columns = [
  { key: 'ropId', header: 'return_id' },
  // from project
  { key: 'licenceNumber', header: 'project_licence_number' },
  { key: 'title', header: 'project_title' },
  { key: 'projectStatus', header: 'project_status' },
  // from licence holder
  { key: 'firstName', header: 'licence_holder_firstname' },
  { key: 'lastName', header: 'licence_holder_lastname' },
  { key: 'email', header: 'licence_holder_email' },
  // from rops
  { key: 'year', header: 'return_year' },
  { key: 'postnatal', header: 'postnatal' },
  { key: 'endangered', header: 'endangered' },
  { key: 'endangeredDetails', header: 'endangered_details' },
  { key: 'nmbas', header: 'nmbas' },
  { key: 'generalAnaesthesia', header: 'general_anaesthesia' },
  { key: 'generalAnaesthesiaDetails', header: 'general_anaesthesia_details' },
  { key: 'rodenticide', header: 'rodenticide' },
  { key: 'rodenticideDetails', header: 'rodenticide_details' },
  { key: 'productTesting', header: 'product_testing' },
  { key: 'productTestingTypes', header: 'product_testing_types' },
  // from procedures
  { key: 'procedureId', header: 'procedure_id' },
  { key: 'species', header: 'species' },
  { key: 'otherSpecies', header: 'other_species' },
  { key: 'severityNum', header: 'no_of_procedures' },
  { key: 'reuse', header: 'reuse' },
  { key: 'placesOfBirth', header: 'place_of_birth' },
  { key: 'nhpsOrigin', header: 'nhp_place_of_birth' },
  { key: 'nhpsColonyStatus', header: 'nhp_colony_status' },
  { key: 'nhpsGeneration', header: 'nhp_generation' },
  { key: 'ga', header: 'genetic_status' },
  { key: 'newGeneticLine', header: 'creation_of_new_genetic_line' },
  { key: 'purposes', header: 'purpose' },
  { key: 'subPurpose', header: 'sub_purpose' },
  { key: 'subPurposeOther', header: 'sub_purpose_other' },
  { key: 'regulatoryLegislation', header: 'testing_by_legislation' },
  { key: 'regulatoryLegislationOrigin', header: 'legislative_requirements' },
  { key: 'specialTechnique', header: 'technique_of_special_interest' },
  { key: 'severity', header: 'actual_severity' },
  { key: 'severityHoNote', header: 'comments_for_ho' },
  { key: 'severityPersonalNote', header: 'comments_for_personal_use' }
];

module.exports = settings => {
  const router = Router({ mergeParams: true });

  router.get('/', (req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/rops/download`, { query: { year: req.year } })
      .then(response => response.json.data)
      .then(rows => rows.map(lookupSpecies))
      .then(rows => {
        res.attachment(`returns-of-procedures-${req.year}.csv`);
        const stringifier = csv({ bom: true, header: true, columns });
        stringifier.pipe(res);
        rows.forEach(row => {
          stringifier.write(row);
        });
        stringifier.end();
      })
      .catch(next);
  });

  return router;
};
