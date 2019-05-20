import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, LicenceStatusBanner } from '@asl/components';

const Project = ({ isActionable, taskId, project }) => {
  return (
    <Fragment>
      <LicenceStatusBanner licence={project} licenceType="ppl" />
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

const mapStateToProps = ({ static: { isActionable, taskId, project } }) => ({ isActionable, taskId, project });

export default connect(mapStateToProps)(Project);
