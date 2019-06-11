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
        <form method="POST" action="projects/create">
          <Button className="float-right button-secondary"><Snippet>buttons.create</Snippet></Button>
        </form>
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
