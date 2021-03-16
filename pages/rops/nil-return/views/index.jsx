import React from 'react';
import { useSelector } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import { Header, Snippet, FormLayout, Link } from '@asl/components';

export default function NilReturn() {
  const { project, rop } = useSelector(state => state.static);

  const noProcs = rop.proceduresCompleted === false;

  return (
    <FormLayout disabled={!!rop.procedures.length}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
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
            !isUndefined(rop.postnatal) && !isNull(rop.postnatal) && (
              <tr>
                <td><strong>{`Only 'protected' embryonic forms used?`}</strong></td>
                <td>{rop.postnatal ? 'No' : 'Yes'}</td>
                <td><Link page="rops.update" label="Change" step="postnatal" /></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </FormLayout>
  );
}
