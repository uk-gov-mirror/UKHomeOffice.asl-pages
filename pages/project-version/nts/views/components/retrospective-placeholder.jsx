import React from 'react';
import format from 'date-fns/format';
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

  const content = render(field.content, { raDate: format(project.raDate, dateFormat.long), hasRaDate: !!project.raDate });

  return (
    <div className="retrospective-placeholder">
      <Markdown>{content}</Markdown>
    </div>
  );
}
