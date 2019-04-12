import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from '@asl/components';

const Project = ({ isActionable, taskId }) => (
  <Fragment>
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
);

const mapStateToProps = ({ static: { isActionable, taskId } }) => ({ isActionable, taskId });

export default connect(mapStateToProps)(Project);
