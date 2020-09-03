import React, { Fragment } from 'react';
import { Markdown, Snippet } from '@asl/components';

// declarations can be 'Yes', 'No', or 'Not yet'
const declarationConfirmed = declaration => declaration && declaration.toLowerCase() === 'yes';

export default function PplDeclarations({ task }) {
  const declarations = task.data.meta;
  const isAmendment = task.type === 'amendment';

  // activity log for initial endorsement does not have the authority prop set in the 'event' (i.e. task) meta
  if (!declarations.authority && task.status === 'endorsed') {
    declarations.authority = 'Yes';
  }

  return (
    <div className="declarations">
      <p><strong><Snippet>declarations.pel-holder.question</Snippet></strong> {declarations.authority || 'No'}</p>
      <p><strong><Snippet>declarations.awerb.question</Snippet></strong> {declarations.awerb}</p>
      {
        declarationConfirmed(declarations.awerb) &&
          <Fragment>
            <p><strong><Snippet>declarations.awerb.review-date</Snippet></strong></p>
            <Markdown>{declarations['awerb-review-date']}</Markdown>
          </Fragment>
      }
      {
        // we don't collect a reason for 'Not yet'
        declarations.awerb && declarations.awerb.toLowerCase() === 'no' &&
          <Fragment>
            <p><strong><Snippet>declarations.awerb.no-review-reason</Snippet></strong></p>
            <Markdown>{declarations['awerb-no-review-reason']}</Markdown>
          </Fragment>
      }
      {
        !isAmendment &&
          <p><strong><Snippet>declarations.ready-for-inspector.question</Snippet></strong> {declarations.ready || 'No'}</p>
      }
    </div>
  );
}
