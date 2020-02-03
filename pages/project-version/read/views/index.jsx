import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from '@asl/components';
import LicenceStatusBanner from '../../../common/components/licence-status-banner';

const Project = ({ isActionable, taskId, project, version, establishment }) => {

  return (
    <Fragment>
      <LicenceStatusBanner licence={project} version={version} licenceType="ppl" />
      <div id="ppl-drafting-tool"></div>
      {
        isActionable && (
          <p className="next-steps">
            <Link
              className="govuk-button"
              page="task.read"
              taskId={taskId}
              label="Next steps"
            />
            <span className="status-message"></span>
          </p>
        )
      }
    </Fragment>
  )
  ;
};

const mapStateToProps = ({ static: { isActionable, taskId, project, version, establishment } }) => ({ isActionable, taskId, project, version, establishment });

export default connect(mapStateToProps)(Project);
