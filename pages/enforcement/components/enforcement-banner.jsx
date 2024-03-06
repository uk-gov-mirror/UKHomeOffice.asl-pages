import React from 'react';
import classnames from 'classnames';
import { Snippet, Inset } from '@ukhomeoffice/asl-components';
import { Warning } from '@ukhomeoffice/react-components';
import { addYears, format as formatDate } from 'date-fns';
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

function EnforcementBanner({ flag, modelType, useFlagModelType }) {
  if (!flag) {
    return null;
  }

  let displayModelType;
  if (flag.modelType === 'establishment') {
    if (!flag.modelOptions.includes(modelType)) {
      return null;
    }
    displayModelType = modelType;
  } else {
    displayModelType = useFlagModelType ? flag.modelType : modelType || flag.modelType;
  }

  const { status, subject } = flag;
  const enforcementCase = subject.enforcementCase;

  return (
    <Warning className={classnames('enforcement', status)}>
      <p><Snippet number={enforcementCase.caseNumber}>{`enforcementBanner.${displayModelType}.${status}`}</Snippet></p>
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
