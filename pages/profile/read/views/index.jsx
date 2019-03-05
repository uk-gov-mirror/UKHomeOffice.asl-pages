import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const Index = ({
  allowedActions,
  model,
  establishment,
  isOwnProfile
}) => {

  return (
    <Fragment>
      {model.name && <h1>{model.name}</h1>}
      <Profile profile={model} establishment={establishment} title={establishment.name} allowedActions={allowedActions} isOwnProfile={isOwnProfile} />
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment, allowedActions, isOwnProfile }, model }) => ({ establishment, model, allowedActions, isOwnProfile });

export default connect(mapStateToProps)(Index);
