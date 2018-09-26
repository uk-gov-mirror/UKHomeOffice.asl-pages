const { omit } = require('lodash');
const crypto = require('crypto');

/* eslint-disable camelcase */
const createCertificateHash = ({certificate_number, accrediting_body, pass_date}) => {
  const hash = crypto.createHash('sha256');
  hash.update(certificate_number + accrediting_body + pass_date);
  return hash.digest('hex');
};
/* eslint-enable camelcase */

module.exports = function(modules) {
  let certificates = [];

  modules.forEach(moduleData => {
    let moduleId = moduleData.id;
    let moduleName = moduleData.module;
    let certificateHash = createCertificateHash(moduleData);

    let certificateIndex = certificates.findIndex(certificate => {
      return certificate.hash === certificateHash;
    });

    if (certificateIndex !== -1) {
      certificates[certificateIndex].modules.push({ id: moduleId, name: moduleName });
      return;
    }

    let certificate = Object.assign({}, omit(moduleData, [
      'id', 'module', 'migrated_id', 'species', 'not_applicable', 'other_accrediting_body'
    ]));

    certificate.hash = certificateHash;
    certificate.modules = [{ id: moduleId, name: moduleName }];
    certificates.push(certificate);
  });

  return certificates;
};
