import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet } from '@asl/components';
import Subsection from './subsection';

export default function Licence() {
  const project = useSelector(state => state.model);
  let versionId = (project.granted || project.versions[0]).id;

  if (project.isLegacyStub) {
    return null;
  }

  let labelKey = `${project.granted ? 'granted' : 'application'}.licence`;
  let labelKeyPdf = `${project.granted ? 'granted' : 'application'}.pdf`;

  const { additionalAvailability } = useSelector(state => state.static);
  const additionalAvailabilityRemoved = additionalAvailability && additionalAvailability.status === 'removed';

  if (additionalAvailabilityRemoved) {
    versionId = additionalAvailability.versionId;
    labelKey = 'granted.additional-availability-removed';
    labelKeyPdf = 'granted.additional-availability-removed.pdf';
  }

  return (
    <Subsection title="Licence" className="licence">
      <p>
        <Link
          page="projectVersion"
          versionId={versionId}
          label={<Snippet>{`actions.view.${labelKey}`}</Snippet>}
          className={project.granted ? '' : 'govuk-button'}
        />
      </p>

      <p>
        <Link
          page="projectVersion.pdf"
          versionId={versionId}
          label={<Snippet>{`actions.view.${labelKeyPdf}`}</Snippet>}
        />
      </p>

      <h3><Snippet>otherDocuments.heading</Snippet></h3>
      <ul className="other-documents">
        <li>
          <Link
            page="projectVersion.nts"
            versionId={versionId}
            label={<Snippet>otherDocuments.links.nts</Snippet>}
          />
        </li>
      </ul>
    </Subsection>
  );
}
