import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import differenceInMonths from 'date-fns/difference_in_months';
import format from 'date-fns/format';
import classnames from 'classnames';
import SearchBar from '../../../common/views/containers/search';
import FilterSummary from '../../../common/views/containers/filter-summary';
import DataTable from '../../../common/views/containers/datatable';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';

export const formatters = {
  licenceHolder: {
    format: (name, project) => <Link page="profile.view" profile={project.licenceHolder.id} label={ name } />
  },
  expiryDate: {
    format: date => <ExpiryDate date={date}/>
  }
};

const ExpiryDate = ({date}) => {
  const diff = differenceInMonths(date, new Date());
  const urgent = diff < 3;
  let contentKey = 'diff.standard';
  if (urgent) {
    contentKey = diff === 0 ? 'diff.singular' : 'diff.plural';
  }

  return <Fragment>
    { format(date, 'DD MMMM YYYY') }
    {
      diff < 12 && (
        <span className={classnames('notice', { urgent })}>
          <Snippet diff={diff + 1}>{contentKey}</Snippet>
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
      <h1><Snippet>pages.project.list</Snippet></h1>
    </header>
    <SearchBar label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <DataTable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Projects);
