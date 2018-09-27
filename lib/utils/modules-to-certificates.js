const { pick, get } = require('lodash');
const crypto = require('crypto');

/* eslint-disable camelcase */
const createCertificateHash = ({certificate_number, accrediting_body, pass_date}) => {
  const hash = crypto.createHash('sha256');
  hash.update(certificate_number + accrediting_body + pass_date);
  return hash.digest('hex');
};
/* eslint-enable camelcase */

module.exports = function(modules) {
  const certificates = modules.reduce((certificates, module) => {
    const hash = createCertificateHash(module);
    const certProps = pick(module, 'pass_date', 'accrediting_body', 'certificate_number');
    const modules = get(certificates, `${hash}.modules`, []);
    const moduleProps = { id: module.id, name: module.module };

    return {
      ...certificates,
      [hash]: {
        hash,
        ...certProps,
        modules: [ ...modules, moduleProps ]
      }
    };
  }, {});

  return Object.values(certificates);
};
