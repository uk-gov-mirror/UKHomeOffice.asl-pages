import React from 'react';
import classnames from 'classnames';

const StatusBanner = ({ licence, licenceType }) => {
  if (licence.status === 'active') {
    return null;
  }

  const statusMap = {
    inactive: 'Draft',
    pending: 'Draft',
    revoked: 'Revoked',
    expired: 'Expired'
  };

  const statusSummary = {
    pel: `This licence is not active. The establishment is not authorised to apply regulated procedures to protected
        animals, or to breed, supply, or keep protected animals in any approved area.`,
    pil: `This licence is not active. The licence holder or applicant is not authorised to carry out regulated
      procedures in the categories stated in this licence/application.`,
    ppl: `This licence is not active. The licence holder or applicant is not authorised to carry out the programme of
      work as stated in this licence/application.`
  };

  return (
    <div className={classnames('status-banner', licence.status)}>
      <p className="status">{statusMap[licence.status]}</p>
      <p className="summary">{statusSummary[licenceType]}</p>
    </div>
  );
};

export default StatusBanner;
