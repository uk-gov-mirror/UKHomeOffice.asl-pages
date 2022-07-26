import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { LicenceStatusBanner, Snippet, Link } from '@asl/components';
import sortBy from 'lodash/sortBy';
import format from 'date-fns/format';
import { dateFormat } from '../../../constants';

export default function ProjectStatusBanner({ model = {}, version = {}, isPdf }) {
  const { canViewTransferredProject, additionalAvailability } = useSelector(state => state.static);
  const additionalAvailabilityRemoved = additionalAvailability && additionalAvailability.status === 'removed';

  if (model.status === 'transferred') {
    return (
      <LicenceStatusBanner title={<Snippet>invalidLicence.status.transferred</Snippet>} licence={model} licenceType="ppl" version={version.id} isPdf={isPdf} colour="red">
        <ul className="licence-dates">
          <li><strong>Granted: </strong> <span>{ format(model.issueDate, dateFormat.long) }</span></li>
          <li><strong>Transferred out: </strong><span>{ format(model.transferredOutDate, dateFormat.long) }</span></li>
        </ul>
        <p><Snippet>invalidLicence.summary.transferred</Snippet></p>
        {
          canViewTransferredProject && <Link page="project.read" projectId={model.transferProjectId} establishmentId={model.transferEstablishmentId} label={<Snippet>invalidLicence.viewTransferred</Snippet>} />
        }
      </LicenceStatusBanner>
    );
  }

  if (model.refusedAt) {
    return (
      <LicenceStatusBanner title={<Snippet>invalidLicence.status.refused</Snippet>} licence={model} colour="red" isPdf={isPdf}>
        <Fragment>
          <p><strong>Refused: <span>{format(model.refusedAt, dateFormat.long)}</span></strong></p>
          <p><Snippet>invalidLicence.summary.ppl</Snippet></p>
        </Fragment>
      </LicenceStatusBanner>
    );
  }

  if (model.status === 'active') {
    if (model.isLegacyStub) {
      return (
        <LicenceStatusBanner title={<Snippet>invalidLicence.status.stub</Snippet>} licence={model} licenceType="ppl" version={version.id} isPdf={isPdf}>
          <p><Snippet>invalidLicence.summary.stub</Snippet></p>
        </LicenceStatusBanner>
      );
    }

    // viewing active version
    if (model.granted && model.granted.id === version.id && !additionalAvailabilityRemoved) {
      return null;
    }

    model.versions = model.versions || [];

    const grantedVersions = sortBy(model.versions.filter(v => v.status === 'granted'), 'updatedAt');
    const superseded = version.status === 'granted' && model.granted.createdAt > version.createdAt;
    const versionIndex = grantedVersions.map(v => v.id).indexOf(version.id);
    const nextVersion = grantedVersions[versionIndex + 1];
    const isFirstVersion = versionIndex === 0;

    if (additionalAvailabilityRemoved) {
      return (
        <LicenceStatusBanner title={<Snippet>invalidLicence.status.additional-availability-removed</Snippet>} licence={model} colour="red" isPdf={isPdf}>
          <Fragment>
            <p><strong>{`Availability granted: ${format(additionalAvailability.issueDate, dateFormat.long)}, Removed: ${format(additionalAvailability.revokedDate, dateFormat.long)}`}</strong></p>
            <p><Snippet establishmentName={additionalAvailability.name}>{`invalidLicence.summary.additional-availability-removed`}</Snippet></p>
          </Fragment>
        </LicenceStatusBanner>
      );
    }

    return (
      <LicenceStatusBanner title={<Snippet>{`invalidLicence.status.${superseded ? 'superseded' : 'draft'}`}</Snippet>} licence={model} colour={superseded && 'red'} isPdf={isPdf}>
        <Fragment>
          {
            superseded && <p><strong>This version was valid from {format(isFirstVersion ? model.issueDate : version.updatedAt, dateFormat.long)} until {format(nextVersion.updatedAt, dateFormat.long)}</strong></p>
          }
          <p><Snippet>{`invalidLicence.summary.${superseded ? 'superseded' : 'ppl_active'}`}</Snippet></p>
          <p><Link page="projectVersion" versionId={model.granted.id} label={<Snippet>{'invalidLicence.view'}</Snippet>} /></p>
        </Fragment>
      </LicenceStatusBanner>
    );
  }

  return <LicenceStatusBanner licence={model} licenceType="ppl" version={version.id} isPdf={isPdf} />;
}
