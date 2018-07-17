import React, { Fragment } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import SearchBar from '../../../common/views/containers/search';
import FilterSummary from '../../../common/views/containers/filter-summary';
import LinkFilter from '../../../common/views/containers/link-filter';
import DataTable from '../../../common/views/containers/datatable';
import Acronym from '../../../common/views/components/acronym';
import Join from '../../../common/views/components/join';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym>{data}</Acronym>;
};

export const formatters = {
  name: {
    format: (name, person) => <Link page="profile.view" profile={person.id} label={ name } />
  },
  roles: {
    accessor: row => row.roles.map(v => v.type),
    format: data => joinAcronyms(data.map(d => d.toUpperCase()))
  },
  pil: {
    format: data => data || '-'
  }
};

const People = ({
  establishment: { name },
  ...props
}) => (
  <Fragment>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.profile.list</Snippet></h1>
    </header>
    <SearchBar label={<Snippet>searchText</Snippet>} />
    <LinkFilter
      prop="roles"
      formatter={filter => <Acronym>{filter.toUpperCase()}</Acronym>}
      append={['pilh', 'pplh']}
    />
    <FilterSummary />
    <DataTable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(People);
