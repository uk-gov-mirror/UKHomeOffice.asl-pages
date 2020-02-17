import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';
import LicenceStatusBanner from '../../components/status-banner';

const ProjectDownloads = () => {
  const { project, version, basename } = useSelector(state => state.static);

  const versionIsGranted = project.granted && project.granted.id === version.id;
  const licenceStatus = versionIsGranted ? project.status : 'inactive';

  return (
    <Fragment>

      <LicenceStatusBanner model={project} versionId={version.id} />

      <div className="download-header">
        <div className="page-title">
          <h1>{version.data.title || 'Untitled project'}</h1>
        </div>

        <div className="back-to-licence">
          <a href={basename}><Snippet>{`licence.${licenceStatus}.back`}</Snippet></a>
        </div>
      </div>

      <div className="govuk-grid-row project-download-links">
        <div className="govuk-grid-column-two-thirds">

          <h1><Snippet>title</Snippet></h1>

          <h3><Snippet>{`licence.${licenceStatus}.heading`}</Snippet></h3>
          <p><a href={`${basename}/pdf`}><Snippet title={version.data.title}>{`licence.${licenceStatus}.link`}</Snippet></a></p>
          <p className="govuk-hint"><Snippet>{`licence.${licenceStatus}.hint`}</Snippet></p>

          <h3><Snippet>application.heading</Snippet></h3>
          <p><a href={`${basename}/docx`}><Snippet>application.link</Snippet></a></p>
          <p className="govuk-hint"><Snippet>application.hint</Snippet></p>

        </div>
      </div>

    </Fragment>
  );
};

export default ProjectDownloads;
