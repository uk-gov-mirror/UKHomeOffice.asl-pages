import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Tasklist,
  Link,
  Snippet
} from '@asl/components';

const Index = ({
  profile: {
    firstName,
    establishments
  },
  tasks
}) => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet name={firstName}>pages.dashboard.greeting</Snippet></h1>
    </header>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">

        <Tasklist tasks={tasks} />

        <ul className="dashboard">
          {
            establishments.map(est =>
              <li key={est.id}>
                <p>
                  <Link page="establishment.dashboard" establishmentId={ est.id } label={ est.name } />
                </p>
                <p>
                  <Link page="profile.invite" establishmentId={ est.id } label={<Snippet>pages.dashboard.invite</Snippet>}/>
                </p>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { profile, tasks } }) => ({ profile, tasks });
export default connect(mapStateToProps)(Index);
