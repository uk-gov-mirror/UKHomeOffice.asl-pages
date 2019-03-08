import React from 'react';
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
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Header
          title={model.name}
          subtitle={establishment.name}
        />
        <Profile profile={model} establishment={establishment} allowedActions={allowedActions} isOwnProfile={isOwnProfile} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ static: { establishment, allowedActions, isOwnProfile }, model }) => ({ establishment, model, allowedActions, isOwnProfile });

export default connect(mapStateToProps)(Index);
