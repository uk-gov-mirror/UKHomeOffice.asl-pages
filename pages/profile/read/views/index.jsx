import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const Index = ({
  isUser,
  profileRole,
  allowedActions,
  model,
  establishment
}) => {

  return (
    <Profile establishment={establishment} profile={model} allowedActions={allowedActions} />
  );
};

const mapStateToProps = ({ static: { establishment, isUser, profileRole, allowedActions }, model }) => ({ establishment, model, isUser, profileRole, allowedActions });

export default connect(mapStateToProps)(Index);
