import React from 'react';
import RAContent from '@asl/projects/client/constants/retrospective-assessment';

export default function RetrospectiveAssessment({ version }) {
  return <p>{ version.retrospectiveAssessment ? RAContent.required : RAContent.notRequired }</p>;
}
