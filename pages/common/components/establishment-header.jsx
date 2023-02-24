import React, {Fragment} from 'react';

export default ({ establishment }) => {
  const isCorporate = establishment.corporateStatus === 'corporate';

  return (
    <Fragment>
      <span>{establishment.name} {isCorporate && <span className="govuk-tag">corporate</span>}</span>
    </Fragment>
  );
};
