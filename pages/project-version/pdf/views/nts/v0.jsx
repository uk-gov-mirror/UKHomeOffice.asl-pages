import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ReviewField from '@asl/projects/client/components/review-field';
import RichText from '@asl/projects/client/components/editor';
import schemaV0 from '@asl/projects/client/schema/v0';

const getPurposeOptions = () => {
  return schemaV0().programmeOfWork.subsections.purpose.fields.find(field => field.name === 'purpose').options;
};

export default function SchemaV0() {
  const project = useSelector(state => state.application.project);
  const version = useSelector(state => state.project);

  return (
    <Fragment>
      <div className="logo"></div>
      <h3 className="licence">Non-technical Summary</h3>
      <h1 className="project-title">{project.title}</h1>

      <h3>Project duration</h3>
      <ReviewField
        type="duration"
        value={version['duration']}
      />

      <h3>Project purpose</h3>
      <ReviewField
        type="permissible-purpose"
        value={version['purpose']}
        project={version}
        options={getPurposeOptions()}
      />

      <h2>Objectives and benefits</h2>
      <h3>Description of the project’s objectives, for example the scientific unknowns or clinical or scientific needs it’s addressing.</h3>

      <h4>What is the aim of this project?</h4>
      <RichText value={version['nts-objectives']} readOnly={true} />

      <h3>
        Potential benefits likely to derive from the project, for example how science might be advanced or how humans,
        animals or the environment might benefit - these could be short-term benefits within the duration of the project
        or long-term benefits that accrue after the project has finished.
      </h3>

      <h4>What are the potential benefits that will derive from this project?</h4>
      <RichText value={version['nts-benefits']} readOnly={true} />

      <h3>Species and numbers of animals expected to be used</h3>

      <h4>What types and approximate numbers of animals will you use over the course of this project?</h4>
      <RichText value={version['nts-numbers']} readOnly={true} />

      <h2>Predicted harms</h2>
      <h3>
        Typical procedures done to animals, for example injections or surgical procedures, including duration of the
        experiment and number of procedures.
      </h3>

      <h4>
        In the context of what you propose to do to the animals, what are the expected adverse effects and the
        likely/expected level of severity? What will happen to the animals at the end?
      </h4>
      <RichText value={version['nts-adverse-effects']} readOnly={true} />

      <h2>Application of the three Rs</h2>
      <h3>1. Replacement</h3>
      <h4>State why you need to use animals and why you cannot use non-animal alternatives.</h4>
      <RichText value={version['nts-replacement']} readOnly={true} />

      <h3>2. Reduction</h3>
      <h4>Explain how you will assure the use of minimum numbers of animals.</h4>
      <RichText value={version['nts-reduction']} readOnly={true} />

      <h3>3. Refinement</h3>
      <h4>Explain the choice of species and why the animal model(s) you will use are the most refined, having regard to the objectives. Explain the general measures you will take to minimise welfare costs (harms) to the animals.</h4>
      <RichText value={version['nts-reduction']} readOnly={true} />

    </Fragment>
  );
}
