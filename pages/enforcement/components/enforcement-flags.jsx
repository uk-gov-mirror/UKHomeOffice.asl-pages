import React from 'react';
import { useSelector } from 'react-redux';
import EnforcementBanner from './enforcement-banner';

function EnforcementFlags({ model, modelType }) {
  const { isAsruUser } = useSelector(state => state.static);

  if (!isAsruUser || !model || !model.enforcementFlags) {
    return null;
  }

  return (
    <div className="enforcement-flags">
      {
        model.enforcementFlags.map(flag =>
          <EnforcementBanner key={flag.id} flag={flag} modelType={modelType} />
        )
      }
    </div>
  );
}

export default EnforcementFlags;
