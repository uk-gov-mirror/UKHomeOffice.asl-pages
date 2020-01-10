import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  FilterTable,
  Snippet,
  Link,
  Header
} from '@asl/components';
import LicenceStatusBanner from '../../../common/components/licence-status-banner';
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
    format: nacwo => nacwo && <Link page="profile.read" profileId={nacwo.id} label={`${nacwo.firstName} ${nacwo.lastName}`} />
  }
};

function Places({
  establishment,
  establishment: { name },
  allowedActions,
  ...props
}) {
  return (
    <Fragment>
      <LicenceStatusBanner licence={establishment} licenceType="pel" />

      <Header
        title={<Snippet>pages.place.list</Snippet>}
        subtitle={name}
      />
      <FilterTable
        formatters={Object.assign({}, formatters, pageFormatters)}
        expands={row => allowedActions.includes('place.update') || row.restrictions}
        Expandable={ExpandableRow}
        createPath={allowedActions.includes('place.create') && 'place.create'}
        className="places-list"
      />
    </Fragment>
  );
}

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(Places);
