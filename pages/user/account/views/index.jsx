import React, { Fragment } from 'react';
import {
  Link,
  Snippet
} from '@asl/components';

const Index = () => {
  return <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet>pages.account.title</Snippet></h1>
    </header>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ul className="dashboard">
          <li>
            <Link page="account.edit" label={ <Snippet>pages.account.edit</Snippet> } />
          </li>
        </ul>
      </div>
    </div>
  </Fragment>;
};

export default Index;
