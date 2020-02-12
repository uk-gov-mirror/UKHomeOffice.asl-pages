import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { LicenceStatusBanner, Snippet } from '@asl/components';

const ProjectDownloads = () => {
  const { project, basename } = useSelector(state => state.static);

  return (
    <Fragment>

      <LicenceStatusBanner licence={project} licenceType="ppl" />

      <div className="download-header">
        <div className="page-title">
          <h1>{project.title || 'Untitled project'}</h1>
        </div>

        <div className="back-to-licence">
          <a href={basename}>Back to licence</a>
        </div>
      </div>

      <div className="govuk-grid-row project-download-links">
        <div className="govuk-grid-column-two-thirds">

          <h1><Snippet>title</Snippet></h1>

          <h3><Snippet>{`licence.${project.status}.heading`}</Snippet></h3>
          <p><a href={`${basename}/pdf`}>{`${project.title} (.pdf)`}</a></p>
          <p className="govuk-hint"><Snippet>{`licence.${project.status}.hint`}</Snippet></p>

          <h3><Snippet>application.heading</Snippet></h3>
          <p><a href={`${basename}/docx`}><Snippet>application.link</Snippet></a></p>
          <p className="govuk-hint"><Snippet>application.hint</Snippet></p>

        </div>
      </div>

    </Fragment>
  );
};

export default ProjectDownloads;
