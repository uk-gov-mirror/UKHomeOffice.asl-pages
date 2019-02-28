import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const Index = ({
  allowedActions,
  model,
  establishment
}) => {

  return (
    <Fragment>
      {model.name && <h1>{model.name}</h1>}
      <Profile profile={model} establishment={establishment} title={establishment.name} allowedActions={allowedActions} />
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment, allowedActions }, model }) => ({ establishment, model, allowedActions });

export default connect(mapStateToProps)(Index);
