import React from 'react';

export const Warning = ({ children }) => {
  return (
    <div className="govuk-warning-text">
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">{children}</strong>
    </div>
  );
};
