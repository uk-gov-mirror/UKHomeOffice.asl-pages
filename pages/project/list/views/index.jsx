import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Search,
  FilterSummary,
  Datatable,
  Snippet,
  Link,
  ExpiryDate,
  Header
} from '@asl/components';

export const formatters = {
  licenceHolder: {
    format: ({ id, firstName, lastName }) =>
      <Link page="profile.view" profileId={id} label={`${firstName} ${lastName}`} />
  },
  expiryDate: {
    format: date => <ExpiryDate date={date}/>
  }
};

const Projects = ({
  establishment: { name },
  ...props
}) => (
  <Fragment>
    <Header
      title={<Snippet>pages.project.list</Snippet>}
      subtitle={name}
    />
    <Search label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <Datatable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Projects);
