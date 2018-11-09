import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Link from '../../../common/views/containers/link';
import Snippet from '../../../common/views/containers/snippet';
import ErrorSummary from '../../../common/views/containers/error-summary';
import Pil from '../../../common/views/containers/pil';
import moment from 'moment'; // todo: switch for date-fns
import { dateFormat } from '../../../../constants';

const Index = ({ establishment, profile, pil, task }) => {

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <header>
        <h1><Snippet>pil.review.title</Snippet></h1>

        <div className="govuk-inset-text">
          <Snippet>pil.review.submittedBy</Snippet><span>&nbsp;</span>
          <Link page="profile.view" profileId={profile.id} label={profile.name} /><span>&nbsp;</span>
          <Snippet date={moment(pil.updatedAt).format(dateFormat.medium)}>pil.review.submittedOn</Snippet>
        </div>

        <h2><Snippet>pil.review.applicantName</Snippet></h2>
        <p>{profile.name}</p>
      </header>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <ul className="section-navigation">
            <li>Training and exemptions</li>
            <li>Procedure categories</li>
            <li>Endorse application</li>
          </ul>
        </div>

        <div className="govuk-grid-column-two-thirds">
          <Pil pil={pil} profile={profile} />

        </div>
      </div>

    </Fragment>
  );
};

const mapStateToProps = ({
  model,
  static: {
    establishment,
    profile,
    pil,
    task
  }
}) => ({ model, establishment, profile, pil, task });

export default connect(mapStateToProps)(Index);
