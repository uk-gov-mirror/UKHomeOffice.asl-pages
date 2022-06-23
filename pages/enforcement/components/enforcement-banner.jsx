import React from 'react';
import classnames from 'classnames';
import { Snippet, Inset } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';
import addYears from 'date-fns/add_years';
import formatDate from 'date-fns/format';
import { dateFormat } from '../../../constants';
import content from '../../common/content';

function CaseDetails({ flag }) {
  const flagExpires = addYears(flag.createdAt, 5);
  const remedialActions = flag.remedialAction.map(a => content.enforcementBanner.remedialAction.actions[a]).join(', ');

  return (
    <details>
      <summary><Snippet>enforcementBanner.caseDetails</Snippet></summary>
      <Inset>
        <p><Snippet>enforcementBanner.remedialAction.applied</Snippet>{' '}<span>{remedialActions}</span></p>
        <p><Snippet>enforcementBanner.flagExpires</Snippet>{' '}<span>{formatDate(flagExpires, dateFormat.long)}</span></p>
        <p><Snippet>enforcementBanner.moreInfo</Snippet></p>
      </Inset>
    </details>
  );
}

function EnforcementBanner({ flag, modelType }) {
  if (!flag) {
    return null;
  }

  if (flag.modelType === 'establishment' && !flag.modelOptions.includes(modelType)) {
    return null;
  }

  const { status, subject } = flag;
  const enforcementCase = subject.enforcementCase;

  return (
    <Warning className={classnames('enforcement', status)}>
      <p><Snippet number={enforcementCase.caseNumber}>{`enforcementBanner.${modelType || flag.modelType}.${status}`}</Snippet></p>
      {
        status === 'open' && <p className="more-info"><Snippet>enforcementBanner.moreInfo</Snippet></p>
      }
      {
        status === 'closed' && <CaseDetails flag={flag} />
      }
    </Warning>
  );
}

export default EnforcementBanner;
