import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Search,
  Datatable,
  FilterSummary,
  LinkFilter,
  Acronym,
  Snippet,
  Join,
  Link,
  Header
} from '@asl/components';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym>{data}</Acronym>;
};

export const formatters = {
  name: {
    format: (name, person) => <Link page="profile.view" profileId={person.id} label={ name } />
  },
  roles: {
    accessor: row => row.roles && row.roles.map(v => v.type),
    format: data => data && joinAcronyms(data.map(d => d.toUpperCase()))
  },
  pil: {
    format: data => data || '-'
  }
};

const People = ({
  establishment: { name },
  allowedActions,
  ...props
}) => (
  <Fragment>
    <Header
      title={<Snippet>pages.profile.list</Snippet>}
      subtitle={name}
    />
    <Search label={<Snippet>searchText</Snippet>} />
    <LinkFilter
      prop="roles"
      formatter={filter => <Acronym>{filter.toUpperCase()}</Acronym>}
      append={['pilh', 'pplh']}
    />
    <div className="table-heading">
      <FilterSummary />
      {
        allowedActions.includes('profile.invite') && (
          <Link page="profile.invite" label={<Snippet>invite</Snippet>} />
        )
      }
    </div>
    <Datatable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(People);
