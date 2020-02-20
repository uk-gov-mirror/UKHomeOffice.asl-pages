import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet } from '@asl/components';
import ProjectStatusBanner from '../../components/project-status-banner';

const ProjectDownloads = () => {
  const { project, version, basename } = useSelector(state => state.static);

  const thisVersionIsGranted = project.granted && project.granted.id === version.id;
  const licenceStatus = thisVersionIsGranted ? project.status : 'inactive';

  return (
    <Fragment>

      <ProjectStatusBanner model={project} versionId={version.id} />

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
          <p><Link page="projectVersion.pdf" label={<Snippet title={version.data.title}>{`licence.${licenceStatus}.link`}</Snippet>} /></p>
          <p className="govuk-hint"><Snippet>{`licence.${licenceStatus}.hint`}</Snippet></p>

          {
            project.status === 'active' && !thisVersionIsGranted &&
              <Fragment>
                <h3><Snippet>licence.granted.heading</Snippet></h3>
                <p><Link page="projectVersion.pdf" versionId={project.granted.id} label={<Snippet title={project.title}>licence.granted.link</Snippet>} /></p>
                <p className="govuk-hint"><Snippet>licence.granted.hint</Snippet></p>
              </Fragment>
          }

          <h3><Snippet>application.heading</Snippet></h3>
          <p><Link page="projectVersion.docx" label={<Snippet>application.link</Snippet>} /></p>
          <p className="govuk-hint"><Snippet>application.hint</Snippet></p>

        </div>
      </div>

    </Fragment>
  );
};

export default ProjectDownloads;
