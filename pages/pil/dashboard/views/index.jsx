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
<<<<<<< HEAD
=======
// const dLink = 'pil.details';
>>>>>>> e76f919... Use combined data model and reset on submit

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

          {links.map(link => (
            <li key={link}>
<<<<<<< HEAD
              <Link page={link} establishment={ estId } pilid={ pilId } profile={profileId} label={<Snippet>{`${link}.title`}</Snippet>} />
=======
              <Link page={link} establishment={ estId } pilid={ pilId } label={<Snippet>{`${link}.title`}</Snippet>} />
>>>>>>> e76f919... Use combined data model and reset on submit
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, profile, pilApplication } }) => ({ establishment, profile, pilApplication });

export default connect(mapStateToProps)(Index);
