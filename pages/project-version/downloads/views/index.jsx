import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Link, Snippet } from '@ukhomeoffice/asl-components';
import ProjectStatusBanner from '../../components/project-status-banner';

const ProjectDownloads = () => {
  const { project, version, basename } = useSelector(state => state.static);

  const thisVersionIsGranted = project.granted && project.granted.id === version.id;
  const licenceStatus = thisVersionIsGranted ? project.status : 'inactive';
  const title = get(version, 'data.title') || 'Untitled project';
  const isLegacy = project.schemaVersion === 0;

  return (
    <Fragment>

      <ProjectStatusBanner model={project} version={version} />

      <div className="document-header">
        <div className="page-title">
          <h1>{title}</h1>
        </div>

        <div className="back-to-licence">
          <a href={basename}><Snippet>{`licence.${licenceStatus}.back`}</Snippet></a>
        </div>
      </div>

      <div className="govuk-grid-row project-download-links">
        <div className="govuk-grid-column-two-thirds">

          <h1><Snippet>title</Snippet></h1>

          <h3><Snippet>{`licence.${licenceStatus}.heading`}</Snippet></h3>
          <p><Link page="projectVersion.pdf" label={<Snippet title={title}>{`licence.${licenceStatus}.link`}</Snippet>} /></p>
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
          <p><Link page="projectVersion.pdf" query={{ application: true }} label={<Snippet>application.pdf-link</Snippet>} /></p>
          <p className="govuk-hint"><Snippet>application.hint</Snippet></p>

          <h3><Snippet>nts.heading</Snippet></h3>
          <Fragment>
            <p><Link page="projectVersion.ntsPdf" label={<Snippet>nts.link</Snippet>} /></p>
            <p className="govuk-hint"><Snippet>nts.hint</Snippet></p>
          </Fragment>

          {
            !isLegacy && (
              <Fragment>
                <h3><Snippet>template.heading</Snippet></h3>
                <p><Link page="projectVersion.ppl" label={<Snippet>template.link</Snippet>} /></p>
                <p className="govuk-hint"><Snippet>template.hint</Snippet></p>
              </Fragment>
            )
          }

          {
            !isLegacy && (
              <Fragment>
                <h3><Snippet>protocols.heading</Snippet></h3>
                <p><Link page="projectVersion.protocolsPdf" label={<Snippet>protocols.link</Snippet>} /></p>
                <p className="govuk-hint"><Snippet>protocols.hint</Snippet></p>
              </Fragment>
            )
          }

        </div>
      </div>

    </Fragment>
  );
};

export default ProjectDownloads;
