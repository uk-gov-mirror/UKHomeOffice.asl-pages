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
  LicenceStatusBanner
} from '@asl/components';

import formatters from '../../formatters';

const tabs = [
  'active',
  'expired',
  'revoked',
  'inactive'
];

const Projects = ({
  establishment,
  status,
  allowedActions
}) => (
  <Fragment>
    <LicenceStatusBanner licence={establishment} licenceType="pel" />

    <Header
      title={<Snippet>pages.project.list</Snippet>}
      subtitle={establishment.name}
    />
    {
      allowedActions.includes('project.apply') && (
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
          <a key={index} href={`?status=${tab}`}><Snippet>{ `status.${tab}` }</Snippet></a>
        )
      }
    </Tabs>
    <Search label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <Datatable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, status, allowedActions } }) => ({ establishment, status, allowedActions });

export default connect(mapStateToProps)(Projects);
