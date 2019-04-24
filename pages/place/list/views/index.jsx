import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  FilterTable,
  Snippet,
  Link,
  Header,
  LicenceStatusBanner
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
    format: nacwo => nacwo && <Link page="profile.view" profileId={nacwo.id} label={`${nacwo.firstName} ${nacwo.lastName}`} />
  }
};

const Places = ({
  establishment,
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
    <LicenceStatusBanner licence={establishment} licenceType="pel" />

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
