import React, { Fragment } from 'react';
import { Snippet, Details, Inset } from '@asl/components';

function PostnatalHint() {
  return (
    <Fragment>
      <p><Snippet className="govuk-hint">fields.postnatal.hint</Snippet></p>
      <Details summary={<Snippet>fields.postnatal.summary</Snippet>}>
        <Inset><Snippet>fields.postnatal.details</Snippet></Inset>
      </Details>
    </Fragment>
  );
}

function EndangeredHint() {
  return (
    <Fragment>
      <Details summary={<Snippet>fields.endangered.summary</Snippet>}>
        <Inset><Snippet>fields.endangered.details</Snippet></Inset>
      </Details>
    </Fragment>
  );
}

function ReuseHint() {
  return (
    <Fragment>
      <Details summary={<Snippet>fields.reuse.summary</Snippet>}>
        <Inset><Snippet>fields.reuse.details</Snippet></Inset>
      </Details>
    </Fragment>
  );
}

function GaHint() {
  return (
    <Fragment>
      <Details summary={<Snippet>fields.ga.summary</Snippet>}>
        <Inset><Snippet>fields.ga.details</Snippet></Inset>
      </Details>
    </Fragment>
  );
}

function NewGeneticLineHint() {
  return (
    <Fragment>
      <Details summary={<Snippet>fields.newGeneticLine.summary</Snippet>}>
        <Inset><Snippet>fields.newGeneticLine.details</Snippet></Inset>
      </Details>
    </Fragment>
  );
}

function ProductTestingHint() {
  return (
    <ul className="product-testing-hint">
      <li>
        <Snippet>fields.productTestingTypes.options.household</Snippet>
      </li>
      <li>
        <Snippet>fields.productTestingTypes.options.tobacco</Snippet><br />
        <span className="govuk-hint"><Snippet>fields.productTestingTypes.hints.tobacco</Snippet></span>
      </li>
      <li>
        <Snippet>fields.productTestingTypes.options.alcohol</Snippet><br />
        <span className="govuk-hint"><Snippet>fields.productTestingTypes.hints.alcohol</Snippet></span>
      </li>
      <li>
        <Snippet>fields.productTestingTypes.options.antibodies</Snippet><br />
        <span className="govuk-hint"><Snippet>fields.productTestingTypes.hints.antibodies</Snippet></span>
      </li>
    </ul>
  );
}

export default {
  postnatal: {
    formatHint: PostnatalHint
  },
  endangered: {
    formatHint: EndangeredHint
  },
  productTesting: {
    formatHint: ProductTestingHint
  },
  reuse: {
    formatHint: ReuseHint
  },
  ga: {
    formatHint: GaHint
  },
  newGeneticLine: {
    formatHint: NewGeneticLineHint
  }
};
