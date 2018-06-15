import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../common/views/containers/search';
import FilterSummary from '../../common/views/containers/filter-summary';
import LinkFilter from '../../common/views/containers/link-filter';
import DataTable from '../../common/views/containers/datatable';
import Acronym from '../../common/views/components/acronym';
import Join from '../../common/views/components/join';
import Snippet from '../../common/views/containers/snippet';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym>{data}</Acronym>;
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
    title: <Snippet>licenceType</Snippet>,
    format: (data, row) => licenceTypes(row)
  },
  pil: {
    title: <Snippet>licenceNumber</Snippet>
  }
};

const People = ({
  establishment: { name },
  ...props
}) => (
  <Fragment>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.people</Snippet></h1>
    </header>
    <SearchBar label={<Snippet>searchText</Snippet>} />
    <LinkFilter prop="roles" formatter={filter => <Acronym>{filter}</Acronym>} />
    <FilterSummary />
    <DataTable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(People);
