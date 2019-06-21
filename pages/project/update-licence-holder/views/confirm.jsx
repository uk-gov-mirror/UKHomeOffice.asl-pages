import React, { Fragment} from 'react';
import { StaticRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  Header,
  Snippet,
  ErrorSummary,
  ApplicationConfirm
} from '@asl/components';
import ReviewFields from '@asl/projects/client/components/review-fields';

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
      <dd>{`${proposedLicenceHolder.firstName} ${proposedLicenceHolder.lastName}`}</dd>
    </dl>
    <StaticRouter>
      <ReviewFields
        fields={fields}
        values={values}
        noComments
        onEdit={(e, field) => {
          e.preventDefault();
          window.location.href = window.location.href.replace('/confirm', `#${field}`);
        }}
      />
    </StaticRouter>
    <form method="POST">
      <input type="hidden" name="_csrf" value={csrfToken} />
      <ApplicationConfirm />
    </form>
  </Fragment>
);

const mapStateToProps = ({ static: { project, fields, values, proposedLicenceHolder, csrfToken } }) => ({ project, fields, values, proposedLicenceHolder, csrfToken });

export default connect(mapStateToProps)(Confirm);
