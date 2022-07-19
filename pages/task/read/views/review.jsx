import React from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet, Header, Link } from '@asl/components';
import RefusalNotice from './components/refusal-notice';

export default function Review() {
  const { task, inspector, refusalReason, editUrl, csrfToken } = useSelector(state => state.static);
  const licenceHolder = get(task, 'data.modelData.profile') || get(task, 'data.modelData.licenceHolder');

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Header
          title={<Snippet>page.heading</Snippet>}
          subtitle={<Snippet>{`tasks.${task.data.model}.${task.data.action}`}</Snippet>}
        />
        <p><Snippet>page.summary</Snippet></p>

        <hr />

        <RefusalNotice
          project={get(task, 'data.modelData')}
          licenceHolder={licenceHolder}
          inspector={inspector}
          refusalReason={refusalReason}
          editUrl={editUrl}
        />

        <hr />
        <form method="POST" noValidate>
          <input type="hidden" name="_csrf" value={csrfToken} />
          <div className="control-panel">
            <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
            <Link page="task.read" label={<Snippet>buttons.cancel</Snippet>} />
          </div>
        </form>
      </div>
    </div>
  );
}
