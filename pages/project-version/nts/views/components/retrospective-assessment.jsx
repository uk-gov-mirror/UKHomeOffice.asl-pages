import React from 'react';
import RAContent from '@asl/projects/client/constants/retrospective-assessment';

export default function RetrospectiveAssessment({ version }) {
  const raCompulsory = version.raCompulsory;
  const raRequired = !!version.retrospectiveAssessment;

  return (
    <div className="conditions retrospective-assessment">
      <div className="condition">
        <p className="condition-text">{raCompulsory || raRequired ? RAContent.required : RAContent.notRequired}</p>
      </div>
    </div>
  );
}
