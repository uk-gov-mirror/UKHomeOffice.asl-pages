import React, { Fragment } from 'react';
import {
  Datatable,
  Search,
  ExportLink,
  FilterSummary,
  Snippet,
  Link,
  Header
} from '@asl/components';

const formatters = {
  name: {
    format: (name, est) => {
      return <Link page="establishment.dashboard" establishmentId={ est.id } label={name} />;
    }
  }
};

const Index = () => (
  <Fragment>
    <Header title={<Snippet>pages.establishment.list</Snippet>} />
    <Search label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <Datatable formatters={formatters} />
    <ExportLink />
  </Fragment>
);

export default Index;
