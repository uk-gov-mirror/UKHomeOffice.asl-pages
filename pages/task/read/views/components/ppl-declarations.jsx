import React, { Fragment } from 'react';
import isUndefined from 'lodash/isUndefined';
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
      <p className="question"><Snippet>declarations.pel-holder.question</Snippet></p>
      <p>{declarations.authority || 'No'}</p>

      <p className="question"><Snippet>declarations.awerb.question</Snippet></p>
      <p>{declarations.awerb}</p>
      {
        declarationConfirmed(declarations.awerb) &&
          <Fragment>
            <p className="question"><Snippet>declarations.awerb.review-date</Snippet></p>
            <Markdown>{declarations['awerb-review-date']}</Markdown>
          </Fragment>
      }
      {
        // we don't collect a reason for 'Not yet'
        declarations.awerb && declarations.awerb.toLowerCase() === 'no' &&
          <Fragment>
            <p className="question"><Snippet>declarations.awerb.no-review-reason</Snippet></p>
            <Markdown>{declarations['awerb-no-review-reason']}</Markdown>
          </Fragment>
      }

      {
        !isAmendment && !isUndefined(declarations.ready) &&
          <Fragment>
            <p className="question"><Snippet>declarations.ready-for-inspector.question</Snippet></p>
            <p>{declarations.ready}</p>
          </Fragment>
      }
    </div>
  );
}
