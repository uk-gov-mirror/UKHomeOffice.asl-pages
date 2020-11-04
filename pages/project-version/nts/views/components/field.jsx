import React from 'react';
import RichText from '@asl/projects/client/components/editor';
import {
  Duration,
  FateOfAnimals,
  Keywords,
  Purpose,
  RetrospectiveDecision,
  RetrospectivePlaceholder,
  SpeciesCount,
  SpeciesTable
} from './index';

export default function Field({ field, version, schemaVersion, project }) {
  if (!field.name && !field.type) {
    return null;
  }

  switch (field.type) {
    case 'Duration':
      return <Duration version={version} />
    case 'SpeciesTable':
      return <SpeciesTable version={version} />
    case 'SpeciesCount':
      return <SpeciesCount version={version} />
    case 'FateOfAnimals':
      return <FateOfAnimals version={version} />
    case 'Purpose':
      return <Purpose version={version} schemaVersion={schemaVersion} />
    case 'Keywords':
      return <Keywords version={version} />
    case 'RetrospectiveDecision':
      return <RetrospectiveDecision version={version} />
    case 'RetrospectivePlaceholder':
      return <RetrospectivePlaceholder version={version} project={project} field={field} />
    default:
      return <RichText value={version[field.name]} readOnly={true} />
  }
}
