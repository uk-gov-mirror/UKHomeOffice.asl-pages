import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Link from '../../common/views/containers/link';
import Snippet from '../../common/views/containers/snippet';

const Index = ({
  profile: {
    firstName,
    establishments
  }
}) => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet>pages.dashboard.greeting</Snippet> {firstName}</h1>
    </header>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ul className="dashboard">
          {
            establishments.map(est =>
              <li key={est}>
                <Link page="establishment.dashboard" establishment={ est.id } label={ est.name } />
                <Link page="profile.invite" establishment={ est.id } label={<Snippet>pages.dashboard.invite</Snippet>}/>
                <Link page="pil.apply" label={<Snippet>pages.pil.categories</Snippet>}/>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { profile } }) => ({ profile });
export default connect(mapStateToProps)(Index);
