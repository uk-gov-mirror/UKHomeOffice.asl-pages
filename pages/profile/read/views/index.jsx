import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const Index = ({
  allowedActions,
  model,
  establishment
}) => {

  return (
    <Profile title={model.name} profile={model} establishment={establishment} estName={establishment.name} allowedActions={allowedActions} />
  );
};

const mapStateToProps = ({ static: { establishment, allowedActions }, model }) => ({ establishment, model, allowedActions });

export default connect(mapStateToProps)(Index);
