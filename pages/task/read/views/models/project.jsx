import React, { Fragment } from 'react';
import { StaticRouter } from 'react-router';
import { useSelector, shallowEqual } from 'react-redux';
import uniqBy from 'lodash/uniqBy';
import pick from 'lodash/pick';
import get from 'lodash/get';
import { Link, StickyNavAnchor, Snippet, Diff } from '@asl/components';
import EstablishmentLinks from '../components/establishment-links';

// need unconnected ReviewFields component and not default
import { ReviewFields } from '@asl/projects/client/components/review-fields';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';
import PplDeclarations from '../components/ppl-declarations';
import experience from '../../../../project/update-licence-holder/schema/experience-fields';
import { schema as projectSchema } from '../../../../project/schema';

const selector = ({ static: { project, establishment, version, values, isAsru } }) => ({ project, establishment, version, values, isAsru });

function EstablishmentDiff({ task }) {
  const isComplete = !task.isOpen;
  const { to, from } = task.data.meta.establishment;
  return (
    <table className="govuk-table compare">
      <thead>
        <tr>
          <th>
            {
              isComplete
                ? <Snippet>establishment.previous</Snippet>
                : <Snippet>establishment.current</Snippet>
            }
          </th>
          <th>
            {
              isComplete
                ? <Snippet>establishment.new</Snippet>
                : <Snippet>establishment.proposed</Snippet>
            }
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{from.name}</td>
          <td><span className="highlight">{to.name}</span></td>
        </tr>
      </tbody>
    </table>
  );
}

export default function Project({ task }) {
  const { project, establishment, version, values, isAsru } = useSelector(selector, shallowEqual);
  const continuation = task.data.continuation;
  const continuationRTE = get(version, 'data.expiring-yes');

  const proposedAdditionalEstablishments = get(version, 'data.establishments', []).filter(e => e['establishment-id']);

  const additionalEstablishments = uniqBy([
    ...project.additionalEstablishments,
    ...proposedAdditionalEstablishments
  ], est => est['establishment-id'] || est.id);

  const isComplete = !task.isOpen;

  const formatters = {
    licenceHolder: {
      format: licenceHolder => {
        if (!licenceHolder) {
          return '-';
        }

        return (
          <Fragment>
            <Link
              page="profile.read"
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
              page="profile.read"
              establishmentId={establishment.id}
              profileId={project.licenceHolder.id}
              label={`${project.licenceHolder.firstName} ${project.licenceHolder.lastName}`}
            />
          </p>
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'transfer' && (
        <StickyNavAnchor id="establishment" key="establishment">
          <EstablishmentDiff task={task} />
        </StickyNavAnchor>
      )
    ),

    (
      (task.data.action === 'grant' || task.data.action === 'transfer') && (
        <StickyNavAnchor id="submitted-version" key="submitted-version">
          <h2><Snippet>sticky-nav.submitted-version</Snippet></h2>
          {
            task.status === 'with-inspectorate' && <PplDeclarations task={task} />
          }
          <p>
            {
              !!additionalEstablishments.length && (
                <Fragment>
                  <h3><Snippet>additional-establishments.title</Snippet></h3>
                  <p>
                    <Snippet>additional-establishments.content</Snippet>
                    {' '}
                    <EstablishmentLinks establishments={additionalEstablishments} showLink={isAsru} />
                  </p>
                </Fragment>
              )
            }
            <p><Snippet>versions.submitted.text</Snippet></p>
            <Link
              page="projectVersion"
              className="govuk-button button-secondary"
              versionId={version.id}
              establishmentId={project.establishmentId}
              projectId={project.id}
              label={<Snippet>versions.submitted.label</Snippet>}
            />
          </p>
        </StickyNavAnchor>
      )
    ),

    (
      continuation && (
        <StickyNavAnchor id="continuation" key="continuation">
          <h2><Snippet>continuation.title</Snippet></h2>
          {
            continuation.map((item, index) => (
              <dl className="inline continuation" key={index}>
                <dt><Snippet>continuation.licence</Snippet></dt>
                <dd>
                  {
                    item['licence-number']
                      ? item['licence-number']
                      : <em>No answer provided</em>
                  }
                </dd>
                <dt><Snippet>continuation.expiry</Snippet></dt>
                <dd>
                  {
                    item['expiry-date']
                      ? format(item['expiry-date'], dateFormat.long)
                      : <em>No answer provided</em>
                  }
                </dd>
              </dl>
            ))
          }
          {
            continuationRTE && (
              <Fragment>
                <h3><Snippet>continuation.rte</Snippet></h3>
                <label className="govuk-hint"><Snippet>continuation.label</Snippet></label>
                <ReviewFields
                  fields={[{
                    name: 'expiring-yes',
                    type: 'texteditor'
                  }]}
                  values={{
                    'expiring-yes': continuationRTE
                  }}
                  readonly={true}
                  noComments
                />
              </Fragment>
            )
          }
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="licence-holder" key="licence-holder">
          <h2><Snippet>sticky-nav.licence-holder</Snippet></h2>
          <Diff
            before={values}
            after={{ licenceHolder: task.data.licenceHolder }}
            schema={pick(projectSchema, 'licenceHolder')}
            formatters={formatters}
            currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
            proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
          />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="experience" key="experience">
          <h2><Snippet>sticky-nav.experience</Snippet></h2>
          <StaticRouter>
            <ReviewFields
              fields={experience(version, project.schemaVersion).fields}
              values={task.data.meta}
              project={version.data}
              readonly={true}
              noComments
              altLabels
            />
          </StaticRouter>
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update' && project.granted && (
        <StickyNavAnchor id="granted" key="granted">
          <h2><Snippet>sticky-nav.granted</Snippet></h2>
          <p><Snippet>versions.granted.info</Snippet></p>
          <p>
            <Link
              page="projectVersion"
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
