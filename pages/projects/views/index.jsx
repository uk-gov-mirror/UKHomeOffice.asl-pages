import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classnames from 'classnames';
import SearchBar from '../../common/views/containers/search';
import FilterSummary from '../../common/views/containers/filter-summary';
import DataTable from '../../common/views/containers/datatable';
import Snippet from '../../common/views/containers/snippet';

export const formatters = {
  licenceHolder: {
    format: (name, row) => <a href={`profile/${row.licenceHolder.id}`}>{ name }</a>
  },
  expiryDate: {
    format: date => <ExpiryDate date={date}/>
  }
};

const ExpiryDate = ({date}) => {
  const now = moment();
  const expires = moment(date);
  const diff = expires.diff(now, 'months');
  const className = classnames('notice', {
    urgent: diff < 3,
    warning: diff >= 3 && diff < 6
  });

  return <Fragment>
    { expires.format('DD MMMM YYYY') }
    {
      diff < 12 && (
        <span className={className}>
          <Snippet diff={diff + 1}>{ diff === 0 ? 'diff.singular' : 'diff.plural' }</Snippet>
        </span>
      )
    }
  </Fragment>;
};

const Projects = ({
  establishment: { name },
  ...props
}) => (
  <Fragment>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.projects</Snippet></h1>
    </header>
    <SearchBar label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <DataTable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Projects);
