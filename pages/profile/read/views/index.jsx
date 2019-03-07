import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Header } from '@asl/components';
import Profile from './profile';

const Index = ({
  allowedActions,
  model,
  establishment,
  isOwnProfile
}) => {

  return (
    <Fragment>
      <Header
        title={model.name}
        subtitle={establishment.name}
      />
      <hr />
      <Profile profile={model} establishment={establishment} allowedActions={allowedActions} isOwnProfile={isOwnProfile} />
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment, allowedActions, isOwnProfile }, model }) => ({ establishment, model, allowedActions, isOwnProfile });

export default connect(mapStateToProps)(Index);
