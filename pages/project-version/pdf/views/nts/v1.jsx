import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { concat, flatten, values } from 'lodash';
import RichText from '@asl/projects/client/components/editor';
import ReviewField from '@asl/projects/client/components/review-field';
import schemaV1 from '@asl/projects/client/schema/v1';
import { projectSpecies as SPECIES } from '@asl/constants';
import SpeciesTable from './components/species-table';
import RetrospectiveAssessment from './components/retrospective-assessment';

const getPermissiblePurposeOptions = () => {
  return schemaV1().introduction.subsections.introduction.fields.find(field => field.name === 'permissible-purpose').options;
};

const getFateOfAnimalsOptions = () => {
  return schemaV1().protocols.subsections['fate-of-animals'].fields.find(field => field.name === 'fate-of-animals').options;
};

const speciesLabels = flatten(values(SPECIES));

const getSpeciesLabel = speciesKey => {
  const species = speciesLabels.find(s => s.value === speciesKey);
  return species ? species.label : undefined;
};

const getSpeciesCount = (speciesKey, version) => version[`reduction-quantities-${speciesKey}`] || 'No answer provided';

function SpeciesCount({ version }) {
  const speciesUsed = concat([], version.species, version['species-other']).filter(Boolean);

  if (speciesUsed.length < 1) {
    return 'No data available';
  }

  return (
    <ul>
      {
        speciesUsed.map(species => (
          <li key={species}>
            {getSpeciesLabel(species)}: {getSpeciesCount(species, version)}
          </li>
        ))
      }
    </ul>
  );
}

export default function SchemaV1() {
  const project = useSelector(state => state.application.project);
  const version = useSelector(state => state.project);

  return (
    <Fragment>
      <div className="logo"></div>
      <h3 className="licence">Non-technical Summary</h3>
      <h1 className="project-title">{version.title}</h1>

      <div className="q-and-a">
        <h3>Project duration</h3>
        <ReviewField
          type="duration"
          value={version['duration']}
        />
      </div>

      <div className="q-and-a">
        <h3>Project purpose</h3>
        <ReviewField
          type="permissible-purpose"
          value={version['permissible-purpose']}
          project={version}
          options={getPermissiblePurposeOptions()}
        />
      </div>

      <div className="q-and-a">
        <h3>Key words</h3>
        <p>No answer provided.</p>
      </div>

      <SpeciesTable version={version} />

      <div className="q-and-a">
        <h2>Retrospective asessment</h2>
        <RetrospectiveAssessment project={project} />
      </div>

      <h2>Objectives and benefits</h2>
      <h3>Description of the project’s objectives, for example the scientific unknowns or clinical or scientific needs it’s addressing.</h3>

      <h4>What is the aim of this project?</h4>
      <RichText value={version['project-aim']} readOnly={true} />

      <h3>
        Potential benefits likely to derive from the project, for example how science might be advanced or how humans,
        animals or the environment might benefit - these could be short-term benefits within the duration of the project
        or long-term benefits that accrue after the project has finished.
      </h3>

      <div className="q-and-a">
        <h4>Why is it important to undertake this work?</h4>
        <RichText value={version['project-importance']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>What outputs do you think you will see at the end of this project?</h4>
        <RichText value={version['benefit-outputs']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>
          What will be the impact of this proposed work on humans / animals / the environment in the short-term (within the
          duration of the project), in the medium-term and the long-term (which may accrue after the project is finished)?
        </h4>
        <RichText value={version['benefit-who']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>How will you maximise the outputs of your work?</h4>
        <RichText value={version['benefit-maximise-outputs']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h3>Species and numbers of animals expected to be used</h3>
        <SpeciesCount version={version} />
      </div>

      <h2>Predicted harms</h2>
      <h3>
        Typical procedures done to animals, for example injections or surgical procedures, including duration of the
        experiment and number of procedures.
      </h3>

      <div className="q-and-a">
        <h4>
          Describe, in general terms, the procedures animals will undergo, eg injections, surgical procedures. Include the
          typical number of procedures individual animals will undergo and the likely duration of suffering.
        </h4>
        <RichText value={version['project-harms-summary']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h3>
          Expected impacts or adverse effects on the animals - for example, pain, weight loss, inactivity or lameness,
          stress, or abnormal behaviour - and how long those effects are expected to last.
        </h3>
        <RichText value={version['project-harms-effects']} readOnly={true} />
      </div>

      <h3>Expected severity categories and the proportion of animals in each category, per species.</h3>

      <div className="q-and-a">
        <h4>What are the expected severities and the proportion of animals in each category (per species)?</h4>
        <RichText value={version['project-harms-severity']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>What will happen to the animals at the end of the study?</h4>
        <ReviewField
          type="checkbox"
          value={version['fate-of-animals']}
          project={version}
          options={getFateOfAnimalsOptions()}
        />
      </div>

      <h2>Application of the three Rs</h2>
      <h3>1. Replacement</h3>
      <p>
        <em>
          State what non-animal alternatives are available in this field, which alternatives you have considered and why
          they cannot be used for this purpose.
        </em>
      </p>

      <div className="q-and-a">
        <h4>Why do you need to use animals to achieve the aim of your project?</h4>
        <RichText value={version['replacement-why']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>What was your strategy for searching for non-animal alternatives?</h4>
        <RichText value={version['replacement-alternatives']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>Why were they not suitable?</h4>
        <RichText value={version['replacement-justification']} readOnly={true} />
      </div>

      <h3>2. Reduction</h3>
      <p>
        <em>
          Explain how the numbers of animals for this project were determined. Describe steps that have been taken to
          reduce animal numbers, and principles used to design studies. Describe practices that are used throughout the
          project to minimise numbers consistent with scientific objectives, if any. These may include e.g. pilot
          studies, computer modelling, sharing of tissue and reuse.
        </em>
      </p>

      <div className="q-and-a">
        <h4>How have you estimated the numbers of animals you will use?</h4>
        <RichText value={version['reduction-estimation']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>What steps will you take to reduce animal numbers? Where applicable, what principles will you use to design experiments?</h4>
        <RichText value={version['reduction-steps']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>What other measures apart from good experimental design will you use to minimise numbers?</h4>
        <RichText value={version['reduction-review']} readOnly={true} />
      </div>

      <h3>3. Refinement</h3>
      <p>
        <em>
          Give examples of the specific measures (e.g., increased monitoring, post-operative care, pain management,
          training of animals) to be taken, in relation to the procedures, to minimise welfare costs (harms) to the
          animals. Describe the mechanisms in place to take up emerging refinement techniques during the lifetime of
          the project.
        </em>
      </p>

      <div className="q-and-a">
        <h4>
          Why are the animals, models and methods you will use the best to meet your objectives? Why will your approach
          cause the least pain, suffering, distress or lasting harm?
        </h4>
        <RichText value={version['refinement-models']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>
          Why can’t you use a less sentient animal, (for example at an immature stage, a less sentient species or using
          terminally anaesthetised animals)?
        </h4>
        <RichText value={version['refinement-less-sentient']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>
          What are you going to do to refine the procedures (for example increased monitoring, post-operative care, pain
          management, training of animals) to minimise the welfare costs (harms) to the animals?
        </h4>
        <RichText value={version['refinement-explaination']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>What published best practice guidance will be followed to ensure experiments are conducted in most refined way?</h4>
        <RichText value={version['refinement-published-guidance']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h4>How will you ensure you continue to use the most refined methods during the lifetime of this project?</h4>
        <RichText value={version['refinement-3rs-advances']} readOnly={true} />
      </div>

      <div className="q-and-a">
        <h3>Explain the choice of species and the related life stages</h3>
        <RichText value={version['project-harms-animals']} readOnly={true} />
      </div>

    </Fragment>
  );
}
