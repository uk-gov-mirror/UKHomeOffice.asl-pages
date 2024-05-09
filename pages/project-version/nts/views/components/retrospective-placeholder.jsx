import React from 'react';
import { format } from 'date-fns';
import { Markdown } from '@ukhomeoffice/asl-components';
import { dateFormat } from '../../../../../constants';
import { render } from 'mustache';

export default function RetrospectivePlaceholder({ project, version, field }) {
  const raCompulsory = version.raCompulsory;
  const raRequired = !!version.retrospectiveAssessment;
  const isRequired = raCompulsory || raRequired || project.raDate;

  if (!isRequired) {
    return null;
  }

  const hasRaDate = !!project.raDate;
  const raDate = hasRaDate ? format(project.raDate, dateFormat.long) : null;

  const content = render(field.content, { raDate, hasRaDate });

  return (
    <div className="retrospective-placeholder">
      <Markdown>{content}</Markdown>
    </div>
  );
}
