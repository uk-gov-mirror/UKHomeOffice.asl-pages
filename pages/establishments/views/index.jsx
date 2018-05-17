import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import DataTable from '../../common/views/containers/datatable';
import SearchBar from '../../common/views/containers/search-bar';
import ExportLink from '../../common/views/containers/export-link';
import FilterSummary from '../../common/views/containers/filter-summary';

const formatters = {
  name: {
    format: (name, something, item) => {
      return <a href={`/establishment/${item.id}`}>{name}</a>
    }
  }
};

const Index = ({
  store,
  crumbs,
  url
}) => (
  <App
    store={store}
    crumbs={crumbs}
    url={url}
  >
    <header>
      <h2>&nbsp;</h2>
      <h1>Establishments</h1>
    </header>
    <SearchBar />
    <FilterSummary />
    <DataTable formatters={formatters} />
    <ExportLink />
  </App>
);

const mapStateToProps = ({ url }) => ({ url });

export default connect(mapStateToProps)(Index);
