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

const pageFormatters = {
  name: {
    format: (name, place) => {
      return (
        <Fragment>
          <Link page="place.read" label={name} placeId={place.id} />
          {
            place.restrictions && <i className="icon icon-information" />
          }
        </Fragment>
      );
    }
  },
  nacwos: {
    format: nacwos => {
      return nacwos && nacwos.map(nacwo => (
        <p key={nacwo.profile.id} className="no-margins">
          <Link
            page="profile.read"
            profileId={nacwo.profile.id}
            label={`${nacwo.profile.firstName} ${nacwo.profile.lastName}`}
          />
        </p>
      ));
    }
  },
  nvssqps: {
    format: nvssqps => {
      return nvssqps && nvssqps.map(role => (
        <p key={role.profile.id} className="no-margins">
          <Link
            page="profile.read"
            profileId={role.profile.id}
            label={`${role.profile.firstName} ${role.profile.lastName}`}
          />
        </p>
      ));
    }
  }
};

function Places({ establishment, allowedActions }) {
  return (
    <Fragment>
      <LicenceStatusBanner licence={establishment} licenceType="pel" />
      <Header
        title={<Snippet>pages.place.list</Snippet>}
        subtitle={establishment.name}
      />
      <FilterTable
        formatters={Object.assign({}, formatters, pageFormatters)}
        createPath={allowedActions.includes('place.create') && 'place.create'}
        className="places-list"
      />
    </Fragment>
  );
}

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(Places);
