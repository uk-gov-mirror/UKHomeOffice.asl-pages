import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import {
  Link,
  Search,
  Snippet,
  FilterSummary,
  Datatable,
  Details,
  Inset
} from '@asl/components';
import Page from '../../components/page';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';

const formatters = {
  profile: {
    format: profile => <Link page="profile.read" profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} />
  },
  licenceNumber: {
    format: (licenceNumber, pil) => <Link page="pil.read" profileId={pil.profileId} pilId={pil.id} label={licenceNumber} />
  },
  status: {
    format: (_, pil) => {
      const status = pil.suspendedDate ? 'suspended' : pil.status;
      const className = classnames({ badge: true, complete: status === 'active', rejected: ['revoked', 'suspended'].includes(status) });
      return <span className={ className }>{ status }</span>;
    }
  },
  issueDate: {
    format: date => format(date, dateFormat.medium)
  },
  reviewDate: {
    format: date => format(date, dateFormat.medium)
  },
  reviewStatus: {
    format: (status, model) => {
      if (model.reviewOverdue) {
        status = 'Overdue';
      } else if (model.reviewDue) {
        status = 'Due soon';
      }
      if (!status) {
        return null;
      }
      return <span className={classnames({ overdue: model.reviewOverdue })}>{ status }</span>;
    }
  }
};

export default function PilList() {
  const query = useSelector(state => state.static.query);
  const queryWithCSV = { ...(query || {}), csv: true };
  return (
    <Page activeTab="list">
      <Details
        className="margin-bottom"
        summary={<Snippet>details.summary</Snippet>}
      >
        <Inset>
          <Snippet>details.content</Snippet>
        </Inset>
      </Details>
      <Search label={<Snippet>search</Snippet>} />
      <Link page="pils.list" label="Download table (CSV)" query={queryWithCSV} className="float-right" />
      <FilterSummary resultType="personal licences" />
      <Datatable formatters={formatters} />
    </Page>
  );
}
