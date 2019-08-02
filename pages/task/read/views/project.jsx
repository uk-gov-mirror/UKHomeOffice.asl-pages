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

const completeAndCorrect = (task, project) => {
  if (task.data.action !== 'grant') {
    return false;
  }
  if (task.status === 'returned-to-applicant') {
    return false;
  }
  if (!allDeclarationsConfirmed(task, project)) {
    return false;
  }
  return true;
};

// declarations can be 'Yes', 'No', or 'Not yet'
const declarationConfirmed = declaration => declaration.toLowerCase() === 'yes';

const allDeclarationsConfirmed = (task, project) => {
  const { authority, awerb, ready } = task.data.meta;

  if (project.granted) {
    // amendment
    return declarationConfirmed(authority) && declarationConfirmed(awerb);
  } else {
    // new application
    return declarationConfirmed(authority) && declarationConfirmed(awerb) && declarationConfirmed(ready);
  }
};

const Project = ({ task, project, establishment, children, schema, formFields }) => {
  const submitted = get(task, 'data.data.version');
  const declarations = task.data.meta;

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
          <StickyNavAnchor id="licence-holder">
            <h2><Snippet>sticky-nav.licence-holder</Snippet></h2>
            <p>
              <Link
                page="profile.view"
                establishmentId={establishment.id}
                profileId={project.licenceHolder.id}
                label={`${project.licenceHolder.firstName} ${project.licenceHolder.lastName}`}
              />
            </p>
          </StickyNavAnchor>
        )
      }

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
                  <p><strong><Snippet>declarations.pel-holder.question</Snippet></strong></p>
                  <p>{declarations.authority}</p>
                  {
                    declarationConfirmed(declarations.authority) &&
                      <Fragment>
                        <p>
                          <Snippet>declarations.pel-holder.name</Snippet> {declarations['authority-pelholder-name']}
                        </p>
                        <p>
                          <Snippet>declarations.pel-holder.endorsement-date</Snippet> {declarations['authority-endorsement-date']}
                        </p>
                      </Fragment>
                  }

                  <p><strong><Snippet>declarations.awerb.question</Snippet></strong></p>
                  <p>{declarations.awerb}</p>
                  {
                    declarationConfirmed(declarations.awerb) &&
                      <Fragment>
                        <p>
                          <Snippet>declarations.awerb.review-date</Snippet> {declarations['awerb-review-date']}
                        </p>
                      </Fragment>
                  }
                  {
                    // we don't collect a reason for 'Not yet'
                    declarations.awerb.toLowerCase() === 'no' &&
                      <Fragment>
                        <p>
                          <Snippet>declarations.awerb.no-review-reason</Snippet> {declarations['awerb-no-review-reason']}
                        </p>
                      </Fragment>
                  }

                  <p><strong><Snippet>declarations.ready-for-inspector.question</Snippet></strong></p>
                  <p>{declarations.ready}</p>
                </Fragment>
              )
            }
          </StickyNavAnchor>
        )
      }

      {
        completeAndCorrect(task, project) &&
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
