import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, LicenceStatusBanner } from '@asl/components';

const Project = ({ isActionable, taskId, project, isGrantedVersion }) => {

  const isExpired = project.expiryDate && project.expiryDate < new Date().toISOString();

  return (
    <Fragment>
      {(!isGrantedVersion || isExpired) && <LicenceStatusBanner licence={project} licenceType="ppl" />}
      <div id="ppl-drafting-tool"></div>
      {
        isActionable && (
          <Link
            className="govuk-button"
            page="task.read"
            taskId={taskId}
            label="Next steps"
          />
        )
      }
    </Fragment>
  )
  ;
};

const mapStateToProps = ({ static: { isActionable, taskId, project, isGrantedVersion } }) => ({ isActionable, taskId, project, isGrantedVersion });

export default connect(mapStateToProps)(Project);
