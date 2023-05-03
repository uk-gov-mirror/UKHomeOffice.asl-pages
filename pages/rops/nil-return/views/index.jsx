import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import Header from '../../components/header';
import { Snippet, Link, WidthContainer } from '@ukhomeoffice/asl-components';
import CancelLink from '../../components/cancel-link';

export default function NilReturn() {
  const rop = useSelector(state => state.model);
  const project = rop.project;

  const noProcs = rop.proceduresCompleted === false;

  return (
    <Fragment>
      <Header />
      <WidthContainer>
        <h1><Snippet>subtitle</Snippet></h1>
        <p><Snippet noProcs={noProcs}>reason</Snippet></p>
        <table className="govuk-table">
          <tbody>
            <tr>
              <td><strong>Project licence holder</strong></td>
              <td>{`${project.licenceHolder.firstName} ${project.licenceHolder.lastName}`}</td>
              <td></td>
            </tr>
            <tr>
              <td><strong>Project licence number</strong></td>
              <td>{project.licenceNumber}</td>
              <td></td>
            </tr>
            <tr>
              <td><strong>Establishment</strong></td>
              <td>{project.establishment.name}</td>
              <td></td>
            </tr>
            <tr>
              <td><strong>Procedures carried out</strong></td>
              <td>{rop.proceduresCompleted ? 'Yes' : 'No'}</td>
              <td><Link page="rops.update" label="Change" step="procedures" /></td>
            </tr>
            {
              rop.proceduresCompleted && !isUndefined(rop.postnatal) && !isNull(rop.postnatal) && (
                <tr>
                  <td><strong>{`Postnatal or free feeding animals used`}</strong></td>
                  <td>{rop.postnatal ? 'Yes' : 'No'}</td>
                  <td><Link page="rops.update" label="Change" step="postnatal" /></td>
                </tr>
              )
            }
          </tbody>
        </table>
        {
          !rop.procedures.length
            ? (
              <div className="control-panel">
                <Link page="rops.submit" label={<Snippet>buttons.submit</Snippet>} className="govuk-button"/>
                <CancelLink />
              </div>
            )
            : (
              <Fragment>
                <em>Cannot submit NIL return as procedures have been added</em>
                <CancelLink />
              </Fragment>
            )
        }
      </WidthContainer>
    </Fragment>
  );
}
