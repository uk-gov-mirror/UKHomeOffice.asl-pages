import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import some from 'lodash/some';
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
import EnforcementFlags from '../../../enforcement/components/enforcement-flags';
import EstablishmentHeader from '../../../common/components/establishment-header';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym>{data}</Acronym>;
};

const selectivelyUppercase = filter => {
  if (filter === 'named') {
    return 'All named people';
  }
  return filter === 'admin' ? 'Admin' : filter.toUpperCase();
};

export const peopleFormatters = {
  name: {
    format: (name, person) => <Link page="profile.read" profileId={person.id} label={`${person.firstName} ${person.lastName}`} />
  },
  roles: {
    accessor: row => row.roles && row.roles.map(v => v.type).sort(),
    format: data => data && joinAcronyms(data.map(selectivelyUppercase))
  },
  pilLicenceNumber: {
    format: (pil, row) => {
      if (!pil) {
        return '-';
      }
      if (row.pil && row.pil.status === 'active') {
        return pil;
      }
      if (some(row.trainingPils, trainingPil => trainingPil.status === 'active')) {
        return pil;
      }
      return '-';
    }
  },
  pilStatus: {
    format: (_, profile) => {
      const pil = profile.pil;

      if (!pil) {
        return '-';
      }

      const status = (pil.status === 'active' && pil.suspendedDate) ? 'suspended' : pil.status;
      const className = classnames({ badge: true, complete: status === 'active', rejected: ['revoked', 'suspended'].includes(status) });
      return <span className={ className }>{ status }</span>;
    }
  }
};

function Filters() {
  const { canDownload } = useSelector(state => state.static);

  return (
    <Fragment>
      <Search label={<Snippet>searchText</Snippet>} />

      <LinkFilter
        prop="roles"
        formatter={filter => <Acronym>{selectivelyUppercase(filter)}</Acronym>}
        append={['pilh', 'pplh', 'admin']}
        prepend={['named']}
        showAll={{ position: 'before', label: 'All people' }}
      />

      {
        canDownload &&
          <Link page="profile.list" label="Download all (CSV)" query={{ csv: true }} className="float-right" />
      }

      <div className="table-heading">
        <FilterSummary resultType="people" />
      </div>
    </Fragment>
  );
}

const Invite = ({ activeTab }) => (
  <Fragment>
    <Link className="float-right" page="profile.invite" label={<Snippet>invite</Snippet>} />
    <Tabs active={activeTab}>
      <Link page="profile.list" label={<Snippet>tabs.active</Snippet>} />
      <Link page="profile.invitations" label={<Snippet>tabs.invited</Snippet>} />
    </Tabs>
  </Fragment>
);

export default function PeopleList({ formatters = peopleFormatters, showFilters = true, activeTab = 0, Actions }) {
  const { establishment, allowedActions } = useSelector(state => state.static);

  return (
    <Fragment>
      <LicenceStatusBanner licence={establishment} licenceType="pel" />
      <EnforcementFlags model={establishment} modelType="roles" />

      <Header
        title={<Snippet>pages.profile.list</Snippet>}
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />
      {
        allowedActions.includes('profile.invite') && <Invite activeTab={activeTab} />
      }
      {
        showFilters && <Filters />
      }
      <Datatable formatters={formatters} Actions={Actions} />
    </Fragment>
  );
}
