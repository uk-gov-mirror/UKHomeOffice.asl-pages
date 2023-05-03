import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from '@ukhomeoffice/asl-components';

export default function RA() {
  const { isActionable, taskId } = useSelector(state => state.static);
  return (
    <Fragment>
      <div id="ppl-drafting-tool" />
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
  );
}
