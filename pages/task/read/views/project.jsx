import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Link, StickyNavPage, StickyNavAnchor, Snippet } from '@asl/components';
import Deadline from './deadline';
import WithdrawApplication from './withdraw-application';
import MakeDecision from './make-decision';

const declarationAnswer = val => val === 'yes' ? 'Yes' : 'Not yet';

const allDeclarationsConfirmed = task => {
  const taskMeta = task.data.meta;
  return taskMeta.authority === 'yes' && taskMeta.awerb === 'yes' && taskMeta.ready === 'yes';
};

const Project = ({ task, project, establishment, children, schema, formFields }) => {
  const submitted = get(task, 'data.data.version');
  const taskMeta = task.data.meta;

  return (
    <StickyNavPage>
      { children }
      <StickyNavAnchor id="submitted-version">
        <h2><Snippet>sticky-nav.submitted-version</Snippet></h2>
        <p><Snippet>versions.submitted.hint</Snippet></p>
        <p>
          <Link
            page="project.version.read"
            className="govuk-button button-secondary"
            versionId={submitted}
            establishmentId={establishment.id}
            projectId={project.id}
            label={<Snippet>versions.submitted.label</Snippet>}
          />
        </p>

        {
          task.status === 'with-inspectorate' &&
            <Fragment>
              <p><Snippet>declarations.pel-holder</Snippet></p>
              <p><strong>{declarationAnswer(taskMeta.authority)}</strong></p>

              <p><Snippet>declarations.awerb</Snippet></p>
              <p><strong>{declarationAnswer(taskMeta.awerb)}</strong></p>

              <p><Snippet>declarations.ready-for-inspector</Snippet></p>
              <p><strong>{declarationAnswer(taskMeta.ready)}</strong></p>
            </Fragment>
        }
      </StickyNavAnchor>

      {
        allDeclarationsConfirmed(task) &&
          <StickyNavAnchor id="deadline">
            <Deadline task={task} />
          </StickyNavAnchor>
      }

      {
        schema.status.options.length > 0 &&
          <StickyNavAnchor id="status">
            <h2><Snippet>sticky-nav.status</Snippet></h2>
            <p><Snippet>make-decision.hint</Snippet></p>
            <MakeDecision schema={schema} formFields={formFields} />
            {
              task.canBeWithdrawn && <WithdrawApplication type={task.type} showHeading />
            }
          </StickyNavAnchor>
      }

      {
        // if the only option is to withdraw, display the withdraw button
        schema.status.options.length === 0 && task.canBeWithdrawn && (
          <StickyNavAnchor id="withdraw">
            <h2><Snippet>sticky-nav.withdraw</Snippet></h2>
            <WithdrawApplication type={task.type} />
          </StickyNavAnchor>
        )
      }

    </StickyNavPage>
  );
};

const mapStateToProps = ({ static: { project, establishment, schema } }) => ({ project, establishment, schema });

export default connect(mapStateToProps)(Project);
