import React, { Fragment} from 'react';
import { StaticRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  Header,
  Snippet,
  ErrorSummary,
  ApplicationConfirm,
  Link
} from '@asl/components';
import ReviewFields from '@asl/projects/client/components/review-fields';

const editLink = <Link page="project.updateLicenceHolder" label="Edit" />;

const Confirm = ({ project, fields, values, proposedLicenceHolder, csrfToken }) => (
  <Fragment>
    <ErrorSummary />
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
      project.status === 'active' && (
        <Fragment>
          <h3><Snippet>fields.comments.label</Snippet></h3>
          <p>
            {
              values.comments || <em>No answer provided</em>
            }
          </p>
          <p>{ editLink }</p>
        </Fragment>
      )
    }
    <form method="POST">
      <input type="hidden" name="_csrf" value={csrfToken} />
      <ApplicationConfirm />
    </form>
  </Fragment>
);

const mapStateToProps = ({ static: { project, fields, values, proposedLicenceHolder, csrfToken } }) => ({ values, project, fields, proposedLicenceHolder, csrfToken });

export default connect(mapStateToProps)(Confirm);
