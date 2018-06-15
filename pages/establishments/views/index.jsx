import React, { Fragment } from 'react';
import DataTable from '../../common/views/containers/datatable';
import SearchBar from '../../common/views/containers/search';
import ExportLink from '../../common/views/containers/export-link';
import FilterSummary from '../../common/views/containers/filter-summary';
import Snippet from '../../common/views/containers/snippet';

const formatters = {
  name: {
    format: (name, est) => {
      return <a href={`/establishment/${est.id}`}>{name}</a>;
    }
  }
};

const Index = props => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet>pages.establishments</Snippet></h1>
    </header>
    <SearchBar label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <DataTable formatters={formatters} />
    <ExportLink />
  </Fragment>
);

export default Index;
