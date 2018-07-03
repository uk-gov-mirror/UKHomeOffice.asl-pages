import React, { Fragment } from 'react';
import DataTable from '../../../common/views/containers/datatable';
import SearchBar from '../../../common/views/containers/search';
import ExportLink from '../../../common/views/containers/export-link';
import FilterSummary from '../../../common/views/containers/filter-summary';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';

const formatters = {
  name: {
    format: (name, est) => {
      return <Link page="establishment.dashboard" establishment={ est.id } label={name} />;
    }
  }
};

const Index = () => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet>pages.establishment.list</Snippet></h1>
    </header>
    <SearchBar label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <DataTable formatters={formatters} />
    <ExportLink />
  </Fragment>
);

export default Index;
