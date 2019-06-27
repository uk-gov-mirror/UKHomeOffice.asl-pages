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
  Header,
  Tabs,
  LicenceStatusBanner
} from '@asl/components';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym>{data}</Acronym>;
};

const selectivelyUppercase = filter => {
  return filter === 'admin' ? 'Admin' : filter.toUpperCase();
};

export const peopleFormatters = {
  name: {
    format: (name, person) => <Link page="profile.view" profileId={person.id} label={`${person.firstName} ${person.lastName}`} />
  },
  roles: {
    accessor: row => row.roles && row.roles.map(v => v.type),
    format: data => data && joinAcronyms(data.map(selectivelyUppercase))
  },
  pil: {
    format: (pil, row) => {
      return (pil && row.pil.status === 'active') ? pil : '-';
    }
  }
};

const Filters = () => (
  <Fragment>
    <Search label={<Snippet>searchText</Snippet>} />
    <LinkFilter
      prop="roles"
      formatter={filter => <Acronym>{selectivelyUppercase(filter)}</Acronym>}
      append={['pilh', 'pplh', 'admin']}
    />
    <div className="table-heading">
      <FilterSummary />
    </div>
  </Fragment>
);

const Invite = ({ activeTab }) => (
  <Fragment>
    <Link className="float-right" page="profile.invite" label={<Snippet>invite</Snippet>} />
    <Tabs active={activeTab}>
      <Link page="profile.list" label={<Snippet>tabs.active</Snippet>} />
      <Link page="profile.invitations" label={<Snippet>tabs.invited</Snippet>} />
    </Tabs>
  </Fragment>
);

const People = ({
  establishment,
  allowedActions,
  formatters = peopleFormatters,
  showFilters = true,
  activeTab = 0,
  ...props
}) => (
  <Fragment>
    <LicenceStatusBanner licence={establishment} licenceType="pel" />

    <Header
      title={<Snippet>pages.profile.list</Snippet>}
      subtitle={establishment.name}
    />
    {
      allowedActions.includes('profile.invite') && <Invite activeTab={activeTab} />
    }
    {
      showFilters && <Filters />
    }
    <Datatable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(People);
