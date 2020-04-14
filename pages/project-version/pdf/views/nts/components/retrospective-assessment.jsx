import React from 'react';
import RAContent from '@asl/projects/client/constants/retrospective-assessment';

export default function RetrospectiveAssessment({ project }) {
  return <p>{ project.retrospectiveAssessmentRequired ? RAContent.required : RAContent.notRequired }</p>;
}
