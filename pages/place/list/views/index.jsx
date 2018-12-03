import React, { Fragment } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import {
  FilterTable,
  Snippet,
  Link,
  Header
} from '@asl/components';
import formatters from '../../formatters';

import ExpandableRow from './row';

const pageFormatters = {
  name: {
    format: (val, row) => {
      return (
        <Fragment>
          {
            val
          }
          {
            row.restrictions && <i className="icon icon-information" />
          }
        </Fragment>
      );
    }
  },
  nacwo: {
    format: val => val && <Link page="profile.view" profileId={ get(val, 'profile.id') } label={ get(val, 'profile.name') } />
  }
};

const Places = ({
  establishment: { name },
  allowedActions,
  ...props
}) => {
  const expands = row => {
    if (!allowedActions.includes('place.update') && !row.restrictions) {
      return null;
    }
    return <ExpandableRow row={row} />;
  };

  return <Fragment>
    <Header
      title={<Snippet>pages.place.list</Snippet>}
      subtitle={name}
    />
    <FilterTable
      formatters={Object.assign({}, formatters, pageFormatters)}
      expands={expands}
      createPath={allowedActions.includes('place.create') && 'place.create.new'}
    />
  </Fragment>;
};

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(Places);
