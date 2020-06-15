import React, { Fragment } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Protocol } from '@asl/projects/client/pages/sections/granted/pdf-protocols';
import Review from '@asl/projects/client/components/review-field';
import Wrapper from '../../../common/views/pdf/wrapper';

function Step({ step, number }) {
  return (
    <Fragment>
      <thead>
        <tr>
          <th>{`Step ${number} (${step.optional ? 'optional' : 'mandatory'})`}</th>
          <th>Adverse effects</th>
          <th>Controls and limitations</th>
          <th>Humane endpoints</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Review value={step.title} type="texteditor" /></td>
          <td>
            {
              step.adverse
                ? <Review value={step['adverse-effects']} type="texteditor" />
                : <p>None</p>
            }
          </td>
          <td>{ step.adverse && <Review value={step['prevent-adverse-effects']} type="texteditor" /> }</td>
          <td>{ step.adverse && <Review value={step.endpoints} type="texteditor" /> }</td>
        </tr>
      </tbody>
    </Fragment>
  );
}

function Protocols() {
  const project = useSelector(state => state.project);
  const licenceNumber = useSelector(state => state.application.project.licenceNumber);
  const protocols = (project.protocols || []).filter(p => !p.deleted);

  let title = [project.title || 'Untitled project'];

  if (licenceNumber) {
    title.push(licenceNumber);
  }

  title.push('Protocol steps and adverse effects');

  return (
    <div className="adverse-effects">
      <h3>{ title.join(' - ') }</h3>
      {
        protocols.map((protocol, index) => (
          <Protocol
            key={index}
            protocol={protocol}
            number={index + 1}
            project={project}
            isLegacy={false}
            className="adverse-effects"
          >
            <div className="wrapper">
              <div className="questions-grid">
                <div>
                  <p><strong>Where this protocol can be carried out</strong></p>
                </div>
                <div>
                  <Review value={protocol.locations} type="location-selector" />
                </div>
                <div>
                  <p><strong>Typical experience or end-to-end scenario for an animal</strong></p>
                </div>
                <div>
                  <p><Review value={protocol['experience-summary']} type="texteditor" /></p>
                </div>
                <div>
                  <p><strong>General humane endpoints</strong></p>
                </div>
                <div>
                  <p><Review value={protocol['experience-endpoints']} type="texteditor" /></p>
                </div>
              </div>

              <h3>Protocol steps</h3>
            </div>
            {
              protocol.steps && protocol.steps.length
                ? (
                  <table>
                    {
                      protocol.steps.map((step, index) => <Step key={index} number={index + 1} step={step} />)
                    }
                  </table>
                )
                : <p>No steps added</p>
            }
          </Protocol>
        ))
      }
    </div>
  );
}

export default function ProtocolsPDF({ nonce, store }) {
  return (
    <Wrapper name="index" nonce={nonce}>
      <Provider store={store}>
        <Protocols />
      </Provider>
    </Wrapper>
  );
}
