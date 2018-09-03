import React from 'react';

export const Breadcrumb = ({
  crumb
}) => typeof crumb === 'string'
  ? <li className="govuk-breadcrumbs__list-item">{crumb}</li>
  : <li className="govuk-breadcrumbs__list-item">
    <a href={crumb.href} className="govuk-breadcrumbs__link">{crumb.label}</a>
  </li>;

const renderNull = crumbs => !crumbs || !crumbs.length || !Array.isArray(crumbs);

const Breadcrumbs = ({
  crumbs,
  homeLabel = 'Home'
}) => {
  if (renderNull(crumbs)) {
    return null;
  }
  crumbs = [ { label: homeLabel, href: '/' }, ...crumbs ];
  return (
    <div className="govuk-breadcrumbs">
      <ol className="govuk-breadcrumbs__list">
        {
          crumbs.map((crumb, index) =>
            <Breadcrumb key={index} crumb={crumb} />
          )
        }
      </ol>
    </div>
  );
};

export default Breadcrumbs;
