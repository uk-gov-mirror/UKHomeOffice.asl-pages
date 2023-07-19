import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet } from '@ukhomeoffice/asl-components';
import Subsection from './subsection';

export default function CurrentVersion() {
  const project = useSelector((state) => state.model);
  const version = project.granted || project.versions[0];
  let versionId = version.id;

  if (project.status === 'transferred') {
    return null;
  }

  if (project.isLegacyStub) {
    return null;
  }
  const { additionalAvailability, canUpdate, asruUser, openTask, editable } =
    useSelector((state) => state.static);

  const showEditLink =
    project.status === 'inactive' && project.draft && canUpdate && !asruUser;
  const page = showEditLink ? 'projectVersion.update' : 'projectVersion';
  const returned = openTask && editable && canUpdate;

  let labelKey = project.granted
    ? `granted.licence`
    : `application.${returned ? 'returned' : version.status}`;

  let labelKeyPdf = `${project.granted ? 'granted' : 'application'}.pdf`;

  const additionalAvailabilityRemoved =
    additionalAvailability && additionalAvailability.status === 'removed';

  if (additionalAvailabilityRemoved) {
    versionId = additionalAvailability.versionId;
    labelKey = 'granted.additional-availability-removed';
    labelKeyPdf = 'granted.additional-availability-removed-pdf';
  }

  const subsectionTitle = (
    <Snippet>{`details.${
      project.granted ? 'granted' : 'application'
    }.subsectionTitle`}</Snippet>
  );

  return (
    <Subsection title={subsectionTitle} className="licence">
      <p>
        <Link
          page={page}
          versionId={versionId}
          label={<Snippet>{`actions.view.${labelKey}`}</Snippet>}
          className={project.granted ? '' : 'govuk-button'}
        />
      </p>

      <p>
        <Link
          page="projectVersion.pdf"
          query={project.granted ? null : { application: true }}
          versionId={versionId}
          label={<Snippet>{`actions.view.${labelKeyPdf}`}</Snippet>}
        />
      </p>

      <h3>
        <Snippet>otherDocuments.heading</Snippet>
      </h3>
      <p>
        <Link
          page="projectVersion.nts"
          versionId={versionId}
          label={
            <Snippet>{`otherDocuments.links.${
              project.grantedRa ? 'ra' : 'nts'
            }`}</Snippet>
          }
        />
      </p>
      {version.hbaToken && (
        <p>
          <a href={`/attachment/${version.hbaToken}`}>
            <Snippet>otherDocuments.links.hba</Snippet>
          </a>
        </p>
      )}
    </Subsection>
  );
}
