import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import Accordion from '@ukhomeoffice/asl-components/components/accordion';
import ExpandingPanel from '@ukhomeoffice/asl-components/components/accordion/expanding-panel';

const licencedToCarryOut = {
  procedure: 'Regulated procedures on protected animals',
  breeding: 'Breeding of relevant protected animals',
  supplying: 'Supply of relevant protected animals'
};

const Index = ({
  establishment: {
    name,
    licenceNumber,
    address,
    authorisations,
    conditions,
    licenceHolder: {
      profile: {
        name: elhName
      }
    },
    ...rest
  },
  ...props
}) => (
  <App {...props}>
    <header>
      <h2>{ name }</h2>
      <h1>Establishment Details</h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">

        <dl>
          <dt>Licence number</dt>
          <dd>{ licenceNumber }</dd>

          <dt>Address</dt>
          <dd>{ address }</dd>

          <dt>Licence holder</dt>
          <dd>{ elhName }</dd>

          <dt>Licensed to carry out</dt>
          <dd>
            <ul>
              {
                Object.keys(licencedToCarryOut).filter(auth => rest[auth]).map(auth =>
                  <li key={auth}>{licencedToCarryOut[auth]}</li>
                )
              }
            </ul>
          </dd>

        </dl>

        <Accordion>
          <ExpandingPanel title="Conditions">
            { conditions
              ? (
                <div>
                  <p>In addition to the <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/193124/Project_Licence_-_Standard_Conditions.pdf">standard conditions of Section 2C licences</a>, this establishment will also:</p>
                  <p>{ conditions }</p>
                </div>
              )
              : <p>The <a href="https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/193124/Project_Licence_-_Standard_Conditions.pdf">standard conditions of Section 2C licences</a> apply.</p>
            }
          </ExpandingPanel>
          <ExpandingPanel title="Authorisations">
            <h2>Methods of killing not mentioned in Schedule 1</h2>
            <dl>
              {
                authorisations.filter(({ type }) => type === 'killing').map(({ method, description }, index) =>
                  <div key={index}>
                    <dt>Method</dt>
                    <dd>{ method }</dd>

                    <dt>Applicable Animals</dt>
                    <dd>{ description }</dd>
                  </div>
                )
              }
            </dl>
            <h2>Setting free and re-homing of protected animals</h2>
            <dl>
              {
                authorisations.filter(({ type }) => type === 'rehomes').map(({ method, description }, index) =>
                  <Fragment key={index}>
                    <dt>Circumstances</dt>
                    <dd>{ method }</dd>

                    <dt>Applicable Animals</dt>
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

const mapStateToProps = ({ establishment }) => ({ establishment });

module.exports = connect(mapStateToProps)(Index);
