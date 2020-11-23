import React from 'react';
import ReviewField from '@asl/projects/client/components/review-field';
import schemaV1 from '@asl/projects/client/schema/v1';

const getFateOfAnimalsOptions = () => {
  return schemaV1().nts.subsections['fate-of-animals'].fields.find(field => field.name === 'fate-of-animals').options;
};

export default function FateOfAnimals({ version }) {
  return (
    <ReviewField
      type="checkbox"
      value={version['fate-of-animals']}
      project={version}
      options={getFateOfAnimalsOptions()}
    />
  );
}
