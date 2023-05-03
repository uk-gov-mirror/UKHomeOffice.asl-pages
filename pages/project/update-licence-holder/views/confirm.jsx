import React, { Fragment} from 'react';
import { StaticRouter } from 'react-router';
import { useSelector } from 'react-redux';
import {
  Header,
  Snippet,
  FormLayout,
  Link
} from '@ukhomeoffice/asl-components';
import ReviewFields from '@asl/projects/client/components/review-fields';

const editLink = <Link page="project.updateLicenceHolder" label="Edit" />;

export default function Confirm() {
  const { project, fields, values, proposedLicenceHolder } = useSelector(state => state.static);
  const model = useSelector(state => state.model);

  return (
    <FormLayout>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title || 'Untitled project'}
      />
      <dl>
        <dt>Current PPL holder</dt>
        <dd>{`${project.licenceHolder.firstName} ${project.licenceHolder.lastName}`}</dd>
        <dt>New PPL holder</dt>
        <dd>
          {`${proposedLicenceHolder.firstName} ${proposedLicenceHolder.lastName}`}<br />
          { editLink }
        </dd>
      </dl>
      <StaticRouter>
        <ReviewFields
          fields={fields}
          values={values}
          altLabels={true}
          noComments
          onEdit={(e, field) => {
            e.preventDefault();
            window.location.href = window.location.href.replace('/confirm', `#${field}`);
          }}
        />
      </StaticRouter>
      {
        project.status === 'active' && !project.isLegacyStub && (
          <Fragment>
            <h3><Snippet>fields.comments.label</Snippet></h3>
            <p>
              {
                model.comments || <em>No answer provided</em>
              }
            </p>
            <p>{ editLink }</p>
          </Fragment>
        )
      }
    </FormLayout>
  );
}
