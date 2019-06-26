import React, { Fragment } from 'react';
import { StaticRouter } from 'react-router';
import { connect } from 'react-redux';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { Link, StickyNavPage, StickyNavAnchor, Snippet, Diff, Field } from '@asl/components';
import Deadline from './deadline';
import WithdrawApplication from './withdraw-application';
import MakeDecision from './make-decision';
import ReviewFields from '@asl/projects/client/components/review-fields';
import { fields } from '../../../project/update-licence-holder/schema/experience-fields';
import { schema as projectSchema } from '../../../project/schema';

const declarationAnswer = val => val === 'yes' ? 'Yes' : 'Not yet';

const allDeclarationsConfirmed = task => {
  const taskMeta = task.data.meta;
  return taskMeta.authority === 'yes' && taskMeta.awerb === 'yes' && taskMeta.ready === 'yes';
};

const Project = ({ task, project, establishment, children, schema, formFields }) => {
  const submitted = get(task, 'data.data.version');
  const taskMeta = task.data.meta;

  const formatters = {
    licenceHolder: {
      format: licenceHolder => {
        return (
          <Fragment>
            <Link
              page="profile.view"
              establishmentId={establishment.id}
              profileId={licenceHolder.id}
              label={`${licenceHolder.firstName} ${licenceHolder.lastName}`}
            />
            <br />
            <a href={`mailto:${licenceHolder.email}`}>{licenceHolder.email}</a>
          </Fragment>
        );
      }
    }
  };

  return (
    <StickyNavPage>
      { children }
      {
        task.data.action === 'grant' && (
          <StickyNavAnchor id="submitted-version">
            <h2><Snippet>sticky-nav.submitted-version</Snippet></h2>
            <p><Snippet type={task.type}>versions.submitted.hint</Snippet></p>
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
              task.status === 'with-inspectorate' && (
                <Fragment>
                  <p><Snippet>declarations.pel-holder</Snippet></p>
                  <p><strong>{declarationAnswer(taskMeta.authority)}</strong></p>

                  <p><Snippet>declarations.awerb</Snippet></p>
                  <p><strong>{declarationAnswer(taskMeta.awerb)}</strong></p>

                  <p><Snippet>declarations.ready-for-inspector</Snippet></p>
                  <p><strong>{declarationAnswer(taskMeta.ready)}</strong></p>
                </Fragment>
              )
            }
          </StickyNavAnchor>
        )
      }

      {
        task.data.action === 'grant' && allDeclarationsConfirmed(task) &&
          <StickyNavAnchor id="deadline">
            <Deadline task={task} />
          </StickyNavAnchor>
      }

      {
        task.data.action === 'update' && (
          <StickyNavAnchor id="licence-holder">
            <h2><Snippet>sticky-nav.licence-holder</Snippet></h2>
            <Diff values={{ licenceHolder: task.data.licenceHolder }} model={project} schema={pick(projectSchema, 'licenceHolder')} formatters={formatters} />
          </StickyNavAnchor>
        )
      }

      {
        task.data.action === 'update' && (
          <StickyNavAnchor id="experience">
            <h2><Snippet>sticky-nav.experience</Snippet></h2>
            <StaticRouter>
              <ReviewFields
                fields={fields}
                values={task.data.meta}
                readonly={true}
                noComments
                altLabels
              />
            </StaticRouter>
          </StickyNavAnchor>
        )
      }

      {
        task.data.action === 'update' && (
          <StickyNavAnchor id="granted">
            <h2><Snippet>sticky-nav.granted</Snippet></h2>
            <p><Snippet>versions.granted.info</Snippet></p>
            <p>
              <Link
                page="project.version.read"
                className="govuk-button button-secondary"
                versionId={project.granted.id}
                establishmentId={establishment.id}
                projectId={project.id}
                label={<Snippet>versions.granted.label</Snippet>}
              />
            </p>
          </StickyNavAnchor>
        )
      }

      {
        task.data.meta.comments && (
          <StickyNavAnchor id="comments">
            <Field
              title={<Snippet>sticky-nav.comments</Snippet>}
              content={task.data.meta.comments}
            />
          </StickyNavAnchor>
        )
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
