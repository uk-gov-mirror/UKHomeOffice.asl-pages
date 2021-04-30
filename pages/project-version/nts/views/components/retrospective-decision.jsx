import React, { Fragment } from 'react';
import RAContent from '@asl/projects/client/constants/retrospective-assessment';
import RaReasons from '@asl/projects/client/components/ra-reasons';

export default function RetrospectiveDecision({ project, version }) {
  const raCompulsory = version.raCompulsory;
  const raRequired = !!version.retrospectiveAssessment;
  const isRequired = raCompulsory || raRequired || project.raDate;

  return (
    <div className="conditions retrospective-assessment">
      <div className="condition">
        <p className="condition-text">{isRequired ? RAContent.required : RAContent.notRequired}</p>
      </div>

      {
        isRequired && project.raReasons &&
          <Fragment>
            <h3>Reason for retrospective assessment</h3>
            <p>This may include reasons from previous versions of this licence.</p>
            <RaReasons reasons={project.raReasons} />
          </Fragment>
      }

    </div>
  );
}
