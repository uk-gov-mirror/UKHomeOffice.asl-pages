import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  DocumentHeader,
  Snippet,
  Details,
  WidthContainer,
  Link,
  Datatable
} from '@asl/components';
import { getUrl } from '@asl/components/src/link';
import { Button } from '@ukhomeoffice/react-components';
import flatten from 'lodash/flatten';
import Confirm from '../../../update/views/components/confirm';
import { projectSpecies } from '@asl/constants';

const allSpecies = flatten(Object.values(projectSpecies));

function yn(v) {
  if (v) {
    return 'Yes';
  }
  if (v === false) {
    return 'No';
  }
  return '-';
}

const getRadioOption = field => v => {
  if (!v) {
    return '-';
  }
  return <Snippet fallback={`fields.${field}.options.${v}`}>{`fields.${field}.options.${v}.label`}</Snippet>;
};

const formatters = {
  species: {
    format: s => {
      const species = allSpecies.find(as => as.value === s);
      return species ? species.label : s;
    }
  },
  reuse: {
    format: yn
  },
  placesOfBirth: {
    format: getRadioOption('placesOfBirth')
  },
  nhpsOrigin: {
    format: getRadioOption('nhpsOrigin')
  },
  nhpsColonyStatus: {
    format: getRadioOption('nhpsColonyStatus')
  },
  nhpsGeneration: {
    format: getRadioOption('nhpsGeneration')
  },
  ga: {
    format: getRadioOption('ga')
  },
  newGeneticLine: {
    format: yn
  },
  purposes: {
    format: getRadioOption('purposes')
  },
  subpurpose: {
    format: (v, model) => {
      switch (model.purposes) {
        case 'basic':
          return getRadioOption('basicSubpurposes')(model.basicSubpurposes);
        case 'regulatory':
          return getRadioOption('regulatorySubpurposes')(model.regulatorySubpurposes);
        case 'translational':
          return getRadioOption('translationalSubpurposes')(model.translationalSubpurposes);
        default:
          return '-';
      }
    }
  },
  regulatoryLegislation: {
    format: getRadioOption('regulatoryLegislation')
  },
  severity: {
    format: getRadioOption('severity')
  }
};

function Actions({ model }) {
  const url = getUrl({ page: 'rops.procedures.update', procedureId: model.id });

  function onClick(e) {
    if (window.confirm('Are you sure you want to delete this procedure?')) {
      return true;
    }
    e.preventDefault();
  }

  return (
    <Fragment>
      <Link page="rops.procedures.update" procedureId={model.id} label="Edit" />
      <form method="POST" action={`${url}/delete`}>
        <button className="link" onClick={onClick}><span>Delete</span></button>
      </form>
    </Fragment>
  );
}

const Submission = () => {
  const url = useSelector(state => state.static.url);
  const hasProcedures = useSelector(state => !!state.static.rop.procedures.length);
  const editable = useSelector(state => state.static.rop.status === 'draft');

  if (!hasProcedures) {
    return null;
  }
  return editable
    ? <Fragment>
      <h2><Snippet>submit.title</Snippet></h2>
      <p><Snippet>submit.content</Snippet></p>
      <p>
        <Link
          page="rops.submit"
          className="govuk-button"
          label={<Snippet>submit.action</Snippet>}
        />
      </p>
    </Fragment>
    : <Fragment>
      <h2><Snippet>unsubmit.title</Snippet></h2>
      <p><Snippet>unsubmit.content</Snippet></p>
      <form action={`${url}/unsubmit`} method="POST">
        <Button><Snippet>unsubmit.action</Snippet></Button>
      </form>
    </Fragment>;
};

export default function Procedures() {
  const { project } = useSelector(state => state.static);
  const hasProcedures = useSelector(state => !!state.static.rop.procedures.length);
  const editable = useSelector(state => state.static.rop.status === 'draft');

  return (
    <Fragment>
      <DocumentHeader
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />

      <h2><Snippet canEdit={editable}>change.title</Snippet></h2>
      <p><Snippet canEdit={editable}>change.content</Snippet></p>
      <Details summary={<Snippet>change.summary</Snippet>}>
        <WidthContainer>
          <Confirm />
        </WidthContainer>
      </Details>
      <br />

      <h2><Snippet>procedures.title</Snippet></h2>
      {
        editable && (
          <Fragment>
            <p><Snippet>procedures.content</Snippet></p>
            <Link
              className="govuk-button"
              page="rops.procedures.create"
              label={<Snippet>procedures.add</Snippet>}
            />
          </Fragment>
        )
      }
      {
        hasProcedures
          ? (
            <div style={{ overflowX: 'scroll', maxWidth: '2000px' }}>
              <Datatable formatters={formatters} Actions={editable && Actions} />
            </div>
          )
          : <p><em>No procedures added</em></p>
      }
      <Submission />
    </Fragment>
  );
}
