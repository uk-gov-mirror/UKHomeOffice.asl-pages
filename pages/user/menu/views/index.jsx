import React, { Fragment } from 'react';
import {
  Link,
  Snippet,
  Header
} from '@asl/components';

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
        </ul>
      </div>
    </div>
  </Fragment>;
};

export default Index;
