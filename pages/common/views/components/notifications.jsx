import React from 'react';
import Snippet from '../containers/snippet';

const Notifications = ({
  notifications
}) => {
  if (!notifications || !notifications.length) {
    return null;
  }
  return (
    <div className="grid-row">
      <div className="column-two-thirds">
        <div className="notification-summary" role="alert" aria-labelledby="notification-summary-heading" tabIndex="-1">
          <h2 className="heading-medium notification-summary-heading" id="notification-summary-heading">
            {
              notifications.map(({ type, props }, index) =>
                <Snippet key={index} { ...props }>{`notifications.${type}`}</Snippet>
              )
            }
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
