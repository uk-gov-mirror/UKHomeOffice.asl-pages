import React, { Fragment } from 'react';
import { Inset, Snippet } from '@ukhomeoffice/asl-components';

const Authorisations = ({ before, after, currentTitle, proposedTitle }) => {
  const currentKillingAuthorisations = (before.authorisations || []).filter(a => a.type === 'killing');
  const currentRehomeAuthorisations = (before.authorisations || []).filter(a => a.type === 'rehomes');
  const hasCurrentAuthorisations = currentKillingAuthorisations.length > 0 || currentRehomeAuthorisations.length > 0;

  const proposedKillingAuthorisations = (after.authorisations || []).filter(a => a.type === 'killing');
  const proposedRehomeAuthorisations = (after.authorisations || []).filter(a => a.type === 'rehomes');
  const hasProposedAuthorisations = proposedKillingAuthorisations.length > 0 || proposedRehomeAuthorisations.length > 0;

  return (
    <div>
      <h2>
        {
          currentTitle || <Snippet>authorisations.current.title</Snippet>
        }
      </h2>
      {
        !hasCurrentAuthorisations && <p><Snippet>authorisations.none</Snippet></p>
      }
      {
        currentKillingAuthorisations.length > 0 &&
          <Fragment>
            <h4><Snippet>fields.authorisationTypes.options.killing</Snippet></h4>
            <dl>
              {
                currentKillingAuthorisations.map((authorisation, index) =>
                  <Inset key={authorisation.id}>
                    <h4><Snippet number={index + 1}>authorisations.method-number</Snippet></h4>

                    <dt><Snippet>authorisations.method</Snippet></dt>
                    <dd>{authorisation.method}</dd>

                    <dt><Snippet>authorisations.description</Snippet></dt>
                    <dd>{authorisation.description}</dd>
                  </Inset>
                )
              }
            </dl>
          </Fragment>
      }
      {
        currentRehomeAuthorisations.length > 0 &&
          <Fragment>
            <h4><Snippet>fields.authorisationTypes.options.rehomes</Snippet></h4>
            <dl>
              {
                currentRehomeAuthorisations.map((authorisation, index) =>
                  <Inset key={authorisation.id}>
                    <h4><Snippet number={index + 1}>authorisations.method-number</Snippet></h4>

                    <dt><Snippet>authorisations.method</Snippet></dt>
                    <dd>{authorisation.method}</dd>

                    <dt><Snippet>authorisations.description</Snippet></dt>
                    <dd>{authorisation.description}</dd>
                  </Inset>
                )
              }
            </dl>
          </Fragment>
      }

      <h2>
        {
          proposedTitle || <Snippet>authorisations.proposed.title</Snippet>
        }
      </h2>
      {
        !hasProposedAuthorisations && <p><Snippet>authorisations.none</Snippet></p>
      }
      {
        proposedKillingAuthorisations.length > 0 &&
          <Fragment>
            <h4><Snippet>fields.authorisationTypes.options.killing</Snippet></h4>
            <dl>
              {
                proposedKillingAuthorisations.map((authorisation, index) =>
                  <Inset key={authorisation.id}>
                    <h4><Snippet number={index + 1}>authorisations.method-number</Snippet></h4>

                    <dt><Snippet>authorisations.method</Snippet></dt>
                    <dd>{authorisation.method}</dd>

                    <dt><Snippet>authorisations.description</Snippet></dt>
                    <dd>{authorisation.description}</dd>
                  </Inset>
                )
              }
            </dl>
          </Fragment>
      }
      {
        proposedRehomeAuthorisations.length > 0 &&
          <Fragment>
            <h4><Snippet>fields.authorisationTypes.options.rehomes</Snippet></h4>
            <dl>
              {
                proposedRehomeAuthorisations.map((authorisation, index) =>
                  <Inset key={authorisation.id}>
                    <h4><Snippet number={index + 1}>authorisations.method-number</Snippet></h4>

                    <dt><Snippet>authorisations.method</Snippet></dt>
                    <dd>{authorisation.method}</dd>

                    <dt><Snippet>authorisations.description</Snippet></dt>
                    <dd>{authorisation.description}</dd>
                  </Inset>
                )
              }
            </dl>
          </Fragment>
      }
    </div>

  );
};

export default Authorisations;
