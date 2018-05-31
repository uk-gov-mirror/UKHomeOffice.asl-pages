import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import Accordion from '../../common/views/components/accordion';
import ExpandingPanel from '../../common/views/components/expanding-panel';
import Snippet from '../../common/views/containers/snippet';

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
}) => (
  <App url={url} {...props}>
    <header>
      <h2>{ name }</h2>
<<<<<<< Updated upstream
      <h1>Establishment details</h1>
=======
      <h1><Snippet>pages.details</Snippet></h1>
>>>>>>> Stashed changes
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <dl>
          <dt><Snippet>licenceNumber</Snippet></dt>
          <dd>{ licenceNumber }</dd>

          <dt><Snippet>address</Snippet></dt>
          <dd>{ address }</dd>

          <dt><Snippet>licenceHolder</Snippet></dt>
          <dd><a href={`profile/${pelh.id}`}>{ pelh.name }</a></dd>

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
                    <dt><Snippet>authorisations.rehoming.conditions</Snippet></dt>
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
  </App>
);

const mapStateToProps = ({ url, establishment }) => ({ url, establishment });

module.exports = connect(mapStateToProps)(Index);
