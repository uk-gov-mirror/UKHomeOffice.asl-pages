import React, { Fragment } from 'react';
import { LicenceStatusBanner, Snippet, Link } from '@asl/components';

import format from 'date-fns/format';
import { dateFormat } from '../../../constants';

export default function StatusBanner({ model, versionId }) {
  if (model.status === 'active') {
    // viewing active version
    if (model.granted.id === versionId) {
      return null;
    }

    const version = model.versions.find(v => v.id === versionId);
    const superseded = model.granted.createdAt > version.createdAt;
    const versionIndex = model.versions.map(v => v.id).indexOf(versionId);
    const nextVersion = model.versions[versionIndex - 1];
    const isFirstVersion = versionIndex === model.versions.length - 1;

    return (
      <LicenceStatusBanner title={<Snippet>{`invalidLicence.status.${superseded ? 'superseded' : 'draft'}`}</Snippet>} licence={model} colour={superseded && 'red'}>
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

  return <LicenceStatusBanner licence={model} licenceType="ppl" version={versionId} />;
}
