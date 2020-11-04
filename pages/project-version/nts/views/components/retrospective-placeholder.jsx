import React from 'react';
import format from 'date-fns/format';
import { Markdown } from '@asl/components';
import { dateFormat } from '../../../../../constants';

export default function RetrospectivePlaceholder({ project, version, field }) {
  const raCompulsory = version.raCompulsory;
  const raRequired = !!version.retrospectiveAssessment;

  if (!raCompulsory && !raRequired) {
    return null;
  }

  const content = field.content.replace('{{raDate}}', format(project.raDate, dateFormat.long));

  return (
    <div className="retrospective-placeholder">
      <Markdown>{content}</Markdown>
    </div>
  );
}
