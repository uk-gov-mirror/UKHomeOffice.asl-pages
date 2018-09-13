import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Accordion from '../../../common/views/components/accordion';
import ExpandingPanel from '../../../common/views/components/expanding-panel';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';

const Index = ({
  establishment: {
    name,
    licenceNumber,
    address,
    authorisations,
    conditions,
    pelh,
    ...rest
  },
  url,
  ...props
}) => {
  return (
    <Fragment>
      <header>
        <h2>{ name }</h2>
        <h1><Snippet>pages.establishment.read</Snippet></h1>
      </header>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <dl>
            <dt><Snippet>licenceNumber</Snippet></dt>
            <dd>{ licenceNumber }</dd>

            <dt><Snippet>address</Snippet></dt>
            <dd>{ address }</dd>

            <dt><Snippet>licenceHolder</Snippet></dt>
            <dd><Link page="profile.view" profile={ pelh.id } label={ pelh.name } /></dd>

            <dt><Snippet>licenced.title</Snippet></dt>
            <dd>
              <ul>
                {
                  ['procedures', 'breeding', 'supplying'].filter(auth => rest[auth]).map(auth =>
                    <li key={auth}><Snippet>{`licenced.${auth}`}</Snippet></li>
                  )
                }
              </ul>
            </dd>
          </dl>
          <Accordion>
            <ExpandingPanel title={<Snippet>conditions.title</Snippet>}>
              { conditions
                ? (
                  <Fragment>
                    <p><Snippet>conditions.hasConditions</Snippet></p>
                    <p>{ conditions }</p>
                  </Fragment>
                )
                : <p><Snippet>conditions.noConditions</Snippet></p>
              }
            </ExpandingPanel>
            <ExpandingPanel title={<Snippet>authorisations.title</Snippet>}>
              <h2><Snippet>authorisations.killing.title</Snippet></h2>
              <dl>
                {
                  authorisations.filter(({ type }) => type === 'killing').map(({ method, description }, index) =>
                    <div key={index}>
                      <dt><Snippet>authorisations.killing.method</Snippet></dt>
                      <dd>{ method }</dd>

                      <dt><Snippet>authorisations.killing.applicableAnimals</Snippet></dt>
                      <dd>{ description }</dd>
                    </div>
                  )
                }
              </dl>
              <h2><Snippet>authorisations.rehoming.title</Snippet></h2>
              <dl>
                {
                  authorisations.filter(({ type }) => type === 'rehomes').map(({ method, description }, index) =>
                    <Fragment key={index}>
                      <dt><Snippet>authorisations.rehoming.circumstances</Snippet></dt>
                      <dd>{ method }</dd>

                      <dt><Snippet>authorisations.rehoming.applicableAnimals</Snippet></dt>
                      <dd>{ description }</dd>
                    </Fragment>
                  )
                }
              </dl>
            </ExpandingPanel>
          </Accordion>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Index);
