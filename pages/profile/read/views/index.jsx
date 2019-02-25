import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const Index = ({
  allowedActions,
  model,
  establishment
}) => {

  return (
    <Profile establishment={establishment} profile={model} allowedActions={allowedActions} title={establishment.name}/>
  );
};

const mapStateToProps = ({ static: { establishment, profileRole, allowedActions }, model }) => ({ establishment, model, profileRole, allowedActions });

export default connect(mapStateToProps)(Index);
