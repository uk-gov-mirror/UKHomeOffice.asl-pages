import React, { Fragment } from 'react';
import { LicenceStatusBanner, Snippet, Link } from '@asl/components';
import sortBy from 'lodash/sortBy';
import format from 'date-fns/format';
import { dateFormat } from '../../../constants';

export default function ProjectStatusBanner({ model, versionId, isPdf }) {
  if (model.status === 'active') {
    if (model.isLegacyStub) {
      return (
        <LicenceStatusBanner title={<Snippet>invalidLicence.status.stub</Snippet>} licence={model} licenceType="ppl" version={versionId} isPdf={isPdf}>
          <p><Snippet>invalidLicence.summary.stub</Snippet></p>
        </LicenceStatusBanner>
      );
    }

    // viewing active version
    if (model.granted.id === versionId) {
      return null;
    }
    const version = model.versions.find(v => v.id === versionId);

    const grantedVersions = sortBy(model.versions.filter(v => v.status === 'granted'), 'updatedAt');
    const superseded = model.granted.createdAt > version.createdAt;
    const versionIndex = grantedVersions.map(v => v.id).indexOf(versionId);
    const nextVersion = grantedVersions[versionIndex + 1];
    const isFirstVersion = versionIndex === 0;

    return (
      <LicenceStatusBanner title={<Snippet>{`invalidLicence.status.${superseded ? 'superseded' : 'draft'}`}</Snippet>} licence={model} colour={superseded && 'red'} isPdf={isPdf}>
        <Fragment>
          {
            superseded && <p><strong>This version was valid from {format(isFirstVersion ? model.issueDate : version.updatedAt, dateFormat.medium)} until {format(nextVersion.updatedAt, dateFormat.medium)}</strong></p>
          }
          <p><Snippet>{`invalidLicence.summary.${superseded ? 'superseded' : 'ppl_active'}`}</Snippet></p>
          <p><Link page="projectVersion" versionId={model.granted.id} label={<Snippet>{'invalidLicence.view'}</Snippet>} /></p>
        </Fragment>
      </LicenceStatusBanner>
    );
  }

  return <LicenceStatusBanner licence={model} licenceType="ppl" version={versionId} isPdf={isPdf} />;
}
