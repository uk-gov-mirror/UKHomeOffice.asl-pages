import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from '@ukhomeoffice/react-components';
import {
  Search,
  FilterSummary,
  Datatable,
  Snippet,
  Header,
  Tabs,
  Link,
  LicenceStatusBanner,
  Details,
  Inset
} from '@asl/components';

import formatters from '../../formatters';

const tabs = [
  'active',
  'inactive-statuses',
  'inactive'
];

const Projects = ({
  establishment,
  status,
  allowedActions,
  adminListUrl
}) => (
  <Fragment>
    <LicenceStatusBanner licence={establishment} licenceType="pel" />

    <Header
      title={<Snippet>pages.project.list</Snippet>}
      subtitle={establishment.name}
    />

    {
      !allowedActions.includes('project.read.all') &&
        <Fragment>
          <Details
            className="margin-bottom"
            summary={<Snippet>details.summary</Snippet>}
          >
            <Inset>
              <Snippet adminListUrl={adminListUrl}>details.content</Snippet>
            </Inset>
          </Details>
        </Fragment>
    }

    {
      allowedActions.includes('project.import') && (
        <div className="control-panel projects-actions">
          <form method="POST" action="projects/create">
            <Button><Snippet>buttons.create</Snippet></Button>
          </form>
          <Link page="project.import" className="govuk-button button-secondary" label={<Snippet>buttons.upload</Snippet>} />
        </div>
      )
    }
    <Tabs active={tabs.indexOf(status)}>
      {
        tabs.map((tab, index) =>
          <a key={index} href={`?status=${tab}`}><Snippet fallback={`status.${tab}`}>{`tabs.${tab}`}</Snippet></a>
        )
      }
    </Tabs>
    <Search label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <Datatable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({
  static: {
    establishment,
    status,
    allowedActions,
    adminListUrl
  }
}) => ({ establishment, status, allowedActions, adminListUrl });

export default connect(mapStateToProps)(Projects);
