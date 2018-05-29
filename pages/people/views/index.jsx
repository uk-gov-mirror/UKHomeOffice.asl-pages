import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import SearchBar from '../../common/views/containers/search';
import FilterSummary from '../../common/views/containers/filter-summary';
import LinkFilter from '../../common/views/containers/link-filter';
import DataTable from '../../common/views/containers/datatable';
import Acronym from '../../common/views/components/acronym';
import Join from '../../common/views/components/join';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym key={data}>{data}</Acronym>;
};

const licenceTypes = profile => {
  const types = [];
  if (profile.pil) {
    types.push('PIL');
  }
  if (profile.ppls && profile.ppls.length) {
    types.push('PPL');
  }
  return joinAcronyms(types);
};

export const formatters = {
  name: {
    format: (name, person) => <a href={`profile/${person.id}`}>{ name }</a>
  },
  roles: {
    format: data => joinAcronyms(data)
  },
  licence: {
    title: 'Licence type',
    format: (data, row) => licenceTypes(row)
  },
  pil: {
    title: 'Licence number'
  }
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
    <SearchBar label="Search by name or licence number" />
    <LinkFilter prop="roles" />
    <FilterSummary />
    <DataTable formatters={formatters} />
  </App>
);

const mapStateToProps = ({ establishment }) => ({ establishment });

export default connect(mapStateToProps)(People);
