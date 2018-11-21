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
