import React, { Fragment } from 'react';
import content from './content';

export default function MandatoryTrainingRequirements({ role }) {

  const renderModuleContent = (content) => {
    return content.map((el, index) => (
      <Fragment key={index}>
        {el}
        <br />
      </Fragment>
    ));
  };

  const renderModuleTag = (tag) => (
    <>
      <br />
      <div style={{ backgroundColor: '#fff7bf', color: '#594d00', fontSize: '14px', textAlign: 'center' }}>
        {tag}
      </div>
    </>
  );

  const renderModules = (modules) => {
    return Object.entries(modules).map(([module, moduleDetails]) => {

      return (
        <tr key={module} className="govuk-table__row">
          <td className="govuk-table__cell">
            {module}
            {moduleDetails.tag && renderModuleTag(moduleDetails.tag)}
          </td>
          <td className="govuk-table__cell">{renderModuleContent(moduleDetails.content)}</td>
        </tr>
      );
    });
  };

  return (
    <div className="govuk-box embedded-content">
      <Fragment>
        <h2>{content.nacwo.title}</h2>
        <table className="govuk-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Module number and content</th>
            </tr>
          </thead>
          <tbody>
            {renderModules(content.nacwo.modules)}
            <tr>
              <td colSpan="2">
                <div className="govuk-heading-s">{content.nacwo.additional.title}</div>
              </td>
            </tr>
            {renderModules(content.nacwo.additional.modules)}
          </tbody>
        </table>
      </Fragment>
    </div>
  );
}
