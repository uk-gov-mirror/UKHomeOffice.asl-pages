import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import {
  Link,
  Search,
  Snippet,
  FilterSummary,
  Datatable,
  Header,
  Details,
  Inset
} from '@asl/components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../constants';

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
  const establishment = useSelector(state => state.static.establishment);
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={establishment.name}
      />
      <Details
        className="margin-bottom"
        summary={<Snippet>details.summary</Snippet>}
      >
        <Inset>
          <Snippet>details.content</Snippet>
        </Inset>
      </Details>
      <Search label={<Snippet>search</Snippet>} />
      <FilterSummary />
      <Datatable formatters={formatters} />
    </Fragment>
  );
}
