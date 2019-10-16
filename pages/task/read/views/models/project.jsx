import React, { Fragment } from 'react';
import { StaticRouter } from 'react-router';
import { useSelector, shallowEqual } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import get from 'lodash/get';
import pick from 'lodash/pick';
import {
  Link,
  StickyNavAnchor,
  Snippet,
  Diff
} from '@asl/components';
import ReviewFields from '@asl/projects/client/components/review-fields';
import Deadline from '../components/deadline';
import { fields } from '../../../../project/update-licence-holder/schema/experience-fields';
import { schema as projectSchema } from '../../../../project/schema';

const selector = ({ static: { project, establishment } }) => ({ project, establishment });

// declarations can be 'Yes', 'No', or 'Not yet'
const declarationConfirmed = declaration => declaration && declaration.toLowerCase() === 'yes';

export default function Project({ task, schema }) {
  const { project, establishment } = useSelector(selector, shallowEqual);

  const submitted = get(task, 'data.data.version');
  const declarations = task.data.meta;
  const isAmendment = task.type === 'amendment';

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

  return [
    (
      task.data.action === 'grant' && (
        <StickyNavAnchor id="licence-holder" key="licence-holder">
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
    ),

    (
      task.data.action === 'grant' && (
        <StickyNavAnchor id="submitted-version" key="submitted-version">
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
                  declarationConfirmed(declarations.authority)
                    ? (
                      <Fragment>
                        <p>
                          <Snippet>declarations.pel-holder.name</Snippet> {declarations['authority-pelholder-name']}
                        </p>
                        <p>
                          <Snippet>declarations.pel-holder.endorsement-date</Snippet> {declarations['authority-endorsement-date']}
                        </p>
                      </Fragment>
                    )
                    : 'No answer provided'
                }

                <p><strong><Snippet>declarations.awerb.question</Snippet></strong></p>
                <p>{declarations.awerb}</p>
                {
                  declarationConfirmed(declarations.awerb) &&
                    <Fragment>
                      <p>
                        <Snippet>declarations.awerb.review-date</Snippet>
                      </p>
                      <ReactMarkdown>{declarations['awerb-review-date']}</ReactMarkdown>
                    </Fragment>
                }
                {
                  // we don't collect a reason for 'Not yet'
                  declarations.awerb.toLowerCase() === 'no' &&
                    <Fragment>
                      <p>
                        <strong><Snippet>declarations.awerb.no-review-reason</Snippet></strong>
                      </p>
                      <ReactMarkdown>{declarations['awerb-no-review-reason']}</ReactMarkdown>
                    </Fragment>
                }

                {
                  !isAmendment &&
                    <Fragment>
                      <p><strong><Snippet>declarations.ready-for-inspector.question</Snippet></strong></p>
                      <p>{declarations.ready}</p>
                    </Fragment>
                }
              </Fragment>
            )
          }
        </StickyNavAnchor>
      )
    ),

    (
      task.deadline && (
        <StickyNavAnchor id="deadline" key="deadline">
          <Deadline task={task} />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="licence-holder" key="licence-holder">
          <h2><Snippet>sticky-nav.licence-holder</Snippet></h2>
          <Diff values={{ licenceHolder: task.data.licenceHolder }} model={project} schema={pick(projectSchema, 'licenceHolder')} formatters={formatters} />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="experience" key="experience">
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
    ),

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="granted" key="granted">
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
    )
  ];
}
