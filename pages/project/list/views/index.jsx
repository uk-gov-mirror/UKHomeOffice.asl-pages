import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../../common/views/containers/search';
import FilterSummary from '../../../common/views/containers/filter-summary';
import DataTable from '../../../common/views/containers/datatable';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import ExpiryDate from '../../../common/views/components/expiry-date';

export const formatters = {
  licenceHolder: {
    format: (name, project) => <Link page="profile.view" profile={project.licenceHolder.id} label={ name } />
  },
  expiryDate: {
    format: date => <ExpiryDate date={date}/>
  }
};

const Projects = ({
  establishment: { name },
  ...props
}) => (
  <Fragment>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.project.list</Snippet></h1>
    </header>
    <SearchBar label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <DataTable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Projects);
