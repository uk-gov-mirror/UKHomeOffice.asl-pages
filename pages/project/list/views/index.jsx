import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Search,
  FilterSummary,
  Datatable,
  Snippet,
  Link,
  ExpiryDate
} from '@asl/components';

export const formatters = {
  licenceHolder: {
    format: (name, project) => <Link page="profile.view" profile={project.licenceHolder.id} label={ name } />
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
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.project.list</Snippet></h1>
    </header>
    <Search label={<Snippet>searchText</Snippet>} />
    <FilterSummary />
    <Datatable formatters={formatters} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Projects);
