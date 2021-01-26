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
  issueDate: {
    format: date => format(date, dateFormat.medium)
  },
  reviewDate: {
    format: date => format(date, dateFormat.medium)
  },
  reviewStatus: {
    format: (status, model) => {
      if (model.reviewOverdue) {
        status = 'deadline passed';
      } else if (model.reviewDue) {
        status = 'deadline soon';
      }
      if (!status) {
        return null;
      }
      const className = classnames({ badge: true, rejected: model.reviewOverdue });
      return <span className={ className }>{ status }</span>;
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
      <FilterSummary resultType="personal licences" />
      <Link page="pils.list" label="Download CSV" query={queryWithCSV} className="float-right" />
      <Datatable formatters={formatters} />
    </Page>
  );
}
