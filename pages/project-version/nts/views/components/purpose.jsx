import React from 'react';
import ReviewField from '@asl/projects/client/components/review-field';
import schemaV0 from '@asl/projects/client/schema/v0';
import schemaV1Purpose from '@asl/projects/client/schema/v1/permissible-purpose';

export default function Purpose({ version, schemaVersion }) {
  if (version['training-licence']) {
    return (
      <ul>
        <li>(f) Higher education and training</li>
      </ul>
    );
  }

  const purposeOptions = schemaVersion === 0
    ? schemaV0().programmeOfWork.subsections.purpose.fields.find(field => field.name === 'purpose').options
    : schemaV1Purpose.options;

  return <ReviewField
    type="permissible-purpose"
    value={schemaVersion === 0 ? version.purpose : version['permissible-purpose']}
    project={version}
    options={purposeOptions}
  />;
}
