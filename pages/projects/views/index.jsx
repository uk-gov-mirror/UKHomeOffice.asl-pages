import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import App from '../../common/views/app';
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
  return <Fragment>
    { expires.format('DD MMMM YYYY') }
    {
      diff < 3 && <span className="notice warning"><Snippet diff={3}>diff.urgent</Snippet></span>
    }
    {
      diff >= 3 && diff < 12 && <span className="notice"><Snippet diff={diff}>diff.default</Snippet></span>
    }
  </Fragment>;
};

const Projects = ({
  establishment: { name },
  ...props
}) => (
  <App {...props}>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.projects</Snippet></h1>
    </header>
    <SearchBar label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <DataTable formatters={formatters} />
  </App>
);

const mapStateToProps = ({ establishment }) => ({ establishment });

export default connect(mapStateToProps)(Projects);
