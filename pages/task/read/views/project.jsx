import React from 'react';
import { connect } from 'react-redux';
import { Link, StickyNavPage, StickyNavAnchor, Snippet } from '@asl/components';

const declarationAnswer = val => val === 'yes' ? 'Yes' : 'Not yet';

const Project = ({ task, formFields, project, establishment, children }) => {
  const submitted = project.versions.find(v => v.status === 'submitted');
  const taskMeta = task.data.meta;

  return (
    <StickyNavPage>
      { children }
      <StickyNavAnchor id="submitted-version">
        <h2><Snippet>sticky-nav.submitted-version</Snippet></h2>

        <p><Snippet>declarations.pel-holder</Snippet></p>
        <p><strong>{declarationAnswer(taskMeta.authority)}</strong></p>

        <p><Snippet>declarations.awerb</Snippet></p>
        <p><strong>{declarationAnswer(taskMeta.awerb)}</strong></p>

        <p><Snippet>declarations.ready-for-inspector</Snippet></p>
        <p><strong>{declarationAnswer(taskMeta.ready)}</strong></p>

        <p>
          <Link
            page="project.version"
            className="govuk-button button-secondary"
            versionId={submitted.id}
            establishmentId={establishment.id}
            projectId={project.id}
            label={<Snippet>versions.submitted</Snippet>}
          />
        </p>
      </StickyNavAnchor>
      {
        !!task.nextSteps.length && (
          <StickyNavAnchor id="status">
            <h2><Snippet>sticky-nav.status</Snippet></h2>
            {
              formFields
            }
          </StickyNavAnchor>
        )
      }
    </StickyNavPage>
  );
};

const mapStateToProps = ({ static: { project, establishment } }) => ({ project, establishment });

export default connect(mapStateToProps)(Project);
