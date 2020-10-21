import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
  Snippet,
  Header,
  TrainingSummary
} from '@asl/components';
import RelatedTasks from '../../../task/list/views/related-tasks';

export default function Index() {
  const { certificates } = useSelector(state => state.model);

  return <Fragment>
    <Header title={<Snippet>pages.account.title</Snippet>} />
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ul className="panel-list">
          <li>
            <Link page="account.update" label={ <Snippet>pages.account.update</Snippet> } />
          </li>
          <li>
            <Link page="account.updateEmail" label={ <Snippet>pages.account.updateEmail.base</Snippet> } />
          </li>
          <li>
            <Link page="account.updatePassword" label={ <Snippet>pages.account.updatePassword.base</Snippet> } />
          </li>
        </ul>
      </div>
    </div>
    <section className="profile-section">
      <h3><Snippet>training</Snippet></h3>
      <TrainingSummary certificates={certificates} />
      <Link page="ownTraining" label="Manage training" />
    </section>
    <RelatedTasks />
  </Fragment>;
}
