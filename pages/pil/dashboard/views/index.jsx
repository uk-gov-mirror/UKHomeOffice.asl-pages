import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import { connect } from 'react-redux';

const links = [
  'pil.details',
  'pil.training',
  'pil.exemptions',
  'pil.procedures'
];
// const dLink = 'pil.details';

const Index = ({
  establishment: {
    id: estId
  },
  profile: {
    id: profileId
  },
  pilApplication: {
    id: pilId
  }
}) => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1>
        <Snippet>pil.title</Snippet>
      </h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <ul className="dashboard">

          {/* <li key={{dLink}}>
            <Link page={dLink + `/${profileId}`} label={<Snippet>{`${dLink}.title`}</Snippet>} />
          </li> */}

          {links.map(link => (
            <li key={link}>
              <Link page={link} establishment={ estId } pilid={ pilId } label={<Snippet>{`${link}.title`}</Snippet>} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, profile, pilApplication } }) => ({ establishment, profile, pilApplication });

export default connect(mapStateToProps)(Index);
