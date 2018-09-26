const { omit } = require('lodash');
const crypto = require('crypto');

const createCertificateHash = (number, accreditingBody, passDate) => {
  const hash = crypto.createHash('sha256');
  hash.update(number + accreditingBody + passDate);
  return hash.digest('hex');
};

module.exports = function(modules) {
  let certificates = [];

  modules.forEach(moduleData => {
    let moduleId = moduleData.id;
    let moduleName = moduleData.module;
    let certificateHash = createCertificateHash(
      moduleData.certificate_number,
      moduleData.accrediting_body,
      moduleData.pass_date
    );

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
