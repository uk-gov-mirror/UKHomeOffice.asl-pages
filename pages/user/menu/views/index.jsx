import React, { Fragment } from 'react';
import {
  Link,
  Snippet,
  Header
} from '@asl/components';
import RelatedTasks from '../../../task/list/views/related-tasks';

const Index = () => {
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
    <RelatedTasks />
  </Fragment>;
};

export default Index;
