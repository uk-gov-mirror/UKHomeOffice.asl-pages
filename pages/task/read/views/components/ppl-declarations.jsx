import React, { Fragment } from 'react';
import upperFirst from 'lodash/upperFirst';
import { Markdown, Snippet } from '@asl/components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';

export default function PplDeclarations({ task }) {
  if (task.data.model !== 'project') {
    return null;
  }

  const status = task.status;
  const declarations = task.data.meta;
  const isAmendment = task.type === 'amendment';

  // activity log for initial endorsement does not have the authority prop set in the 'event' (i.e. task) meta
  if (!declarations.authority && status === 'endorsed') {
    declarations.authority = 'Yes';
  }

  const legacyAwerbReviewDate = declarations['awerb-review-date'];
  const primaryAwerb = declarations['awerb-dates'] && declarations['awerb-dates'].filter(awerb => awerb.primary)[0];
  const aaAwerbs = (declarations['awerb-dates'] && declarations['awerb-dates'].filter(awerb => !awerb.primary)) || [];

  return (
    <div className="declarations">
      <dl className="inline-wide">
        <dt><Snippet>declarations.pel-holder.question</Snippet></dt>
        <dd>{declarations.authority || 'No'}</dd>
      </dl>

      {
        isAmendment
          ? <dl className="inline-wide">
            <dt><Snippet>declarations.awerb.question</Snippet></dt>
            <dd>{upperFirst(declarations.awerb)}</dd>
          </dl>
          : <dl className="inline-wide">
            <dt><Snippet>declarations.ready-for-inspector.question</Snippet></dt>
            <dd>{declarations.ready || 'No'}</dd>
          </dl>
      }
      {
        legacyAwerbReviewDate &&
          <dl className="inline-wide">
            <dt><Snippet>declarations.awerb.review-date</Snippet></dt>
            <dd>{declarations['awerb-review-date']}</dd>
          </dl>
      }
      {
        primaryAwerb &&
          <dl className="inline-wide">
            <dt>AWERB review date:</dt>
            <dd>{format(primaryAwerb.date, dateFormat.long)}</dd>
          </dl>
      }
      {
        aaAwerbs.length > 0 &&
          <Fragment>
            <dl className="inline-wide">
              <dt>Additonal availability at:</dt>
              <dd>{ aaAwerbs.map(awerb => <span key={awerb.id} className="aa-establishment">{awerb.name}</span>) }</dd>
            </dl>
            <dl className="inline-wide">
              {
                aaAwerbs.map(awerb => (
                  <Fragment key={awerb.id}>
                    <dt>{awerb.name} AWERB review date:</dt>
                    <dd>{format(awerb.date, dateFormat.long)}</dd>
                  </Fragment>
                ))
              }
            </dl>
          </Fragment>
      }
      {
        (declarations.awerb || '').toLowerCase() === 'no' &&
          <Fragment>
            <p><strong><Snippet>declarations.awerb.no-review-reason</Snippet></strong></p>
            <Markdown>{declarations['awerb-no-review-reason']}</Markdown>
          </Fragment>
      }
    </div>
  );
}
