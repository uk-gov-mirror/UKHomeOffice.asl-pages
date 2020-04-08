import React from 'react';
import RAContent from '@asl/projects/client/constants/retrospective-assessment';
import raApplies from '@asl/projects/client/helpers/retrospective-assessment';

export default function RetrospectiveAssessment({ project }) {
  return <p>{ raApplies(project) ? RAContent.required : RAContent.notRequired }</p>;
}
