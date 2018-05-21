import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import SearchBar from '../../common/views/containers/search-bar';
import FilterSummary from '../../common/views/containers/filter-summary';
import DataTable from '../../common/views/containers/datatable';
import Acronym from '../../common/views/components/acronym';
import Join from '../../common/views/components/join';
import dict from '@asl/dictionary';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym key={data}>{data}</Acronym>;
};

export const formatters = {
  name: {},
  roles: {
    format: data => joinAcronyms(data.map(role => role.type.toUpperCase()))
  },
  pil: {}
};

const People = ({
  establishment: { name },
  ...props
}) => (
  <App {...props}>
    <header>
      <h2>{name}</h2>
      <h1>Named people and licence holders</h1>
    </header>
    <SearchBar />
    <FilterSummary />
    <DataTable formatters={formatters} />
  </App>
);

const mapStateToProps = ({ establishment }) => ({ establishment });

export default connect(mapStateToProps)(People);
