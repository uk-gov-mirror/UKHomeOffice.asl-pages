import React from 'react';
import formatDate from 'date-fns/format';
import addDays from 'date-fns/add_days';
import classnames from 'classnames';
import { Inset, Markdown, Snippet } from '@asl/components';
import { dateFormat } from '../../../../../constants';

export default function RefusalNotice({ project, licenceHolder, inspector, refusalReason, editUrl, dateOfNotice = new Date() }) {
  const respondBy = addDays(dateOfNotice, 28);
  const respondByDate = formatDate(respondBy, dateFormat.long);
  const noticeDate = formatDate(dateOfNotice, dateFormat.long);
  const licenceHolderName = `${licenceHolder.firstName} ${licenceHolder.lastName}`;
  const inspectorName = `${inspector.firstName} ${inspector.lastName}`;

  return (
    <div>
      <Snippet noticeDate={noticeDate} licenceHolderName={licenceHolderName} projectTitle={project.title}>
        refusalNotice.intro
      </Snippet>

      <Snippet linkTarget="_blank">refusalNotice.intent</Snippet>

      <Inset>
        <div className={classnames('refusal-reason', { highlight: !editUrl })}>
          {
            refusalReason
              ? <Markdown>{refusalReason}</Markdown>
              : '[Reason for refusal will appear here]'
          }
        </div>
        {
          editUrl && <p><a href={editUrl} className="govuk-button button-secondary">Edit</a></p>
        }
      </Inset>

      <Snippet respondByDate={respondByDate} linkTarget="_blank">refusalNotice.representations</Snippet>

      <Snippet inspectorName={inspectorName} linkTarget="_blank">refusalNotice.outro</Snippet>
    </div>
  );
}
