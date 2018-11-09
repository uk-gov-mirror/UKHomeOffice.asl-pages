import React, { Fragment } from 'react';
import {
  Datatable,
  Search,
  ExportLink,
  FilterSummary,
  Snippet,
  Link
} from '@asl/components';

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
    <Search label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <Datatable formatters={formatters} />
    <ExportLink />
  </Fragment>
);

export default Index;
