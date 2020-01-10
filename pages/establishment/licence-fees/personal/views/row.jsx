import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import fetch from 'r2';
import { Inset, Snippet, Form } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';

function UpdatingForm({ id, billable, onCancelClick, formFields }) {
  return (
    <Fragment>
      {
        formFields
      }
      <input type="hidden" name="pilId" value={id} />
      <input type="hidden" name="billable" value={billable} />
      <p className="control-panel">
        <Button>Update billable status</Button>
        <a href="#" onClick={onCancelClick}>Cancel</a>
      </p>
    </Fragment>
  );
}

function PreviousUpdate({ task }) {
  const billable = task.data.data.billable;
  const changedBy = task.data.changedBy.name;
  const updatedAt = format(task.updatedAt, dateFormat.medium);
  const comments = task.data.meta.comments;
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-three-quarters">
        <p><strong>Marked {billable ? 'billable' : 'non-billable'} by: </strong>{changedBy}</p>
        <p>{comments}</p>
      </div>
      <div className="govuk-grid-column-one-quarters">{updatedAt}</div>
    </div>
  );
}

function SummaryPanel({ toggleUpdating, previousUpdates }) {
  return (
    <Fragment>
      <a href="#" onClick={toggleUpdating}><Snippet>change</Snippet></a>
      {
        !!previousUpdates.length && (
          <Fragment>
            <h2>Previous changes to this billing status</h2>
            {
              previousUpdates.map(previousUpdate => <PreviousUpdate key={previousUpdate.id} task={previousUpdate} />)
            }
          </Fragment>
        )
      }
    </Fragment>
  );
}

function UpdatingPanel({ billable, id, onCancelClick }) {

  function getBillableLabel(isBillable) {
    return isBillable ? 'Billable' : 'Non-billable';
  }

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <h3><Snippet>change</Snippet></h3>
        <table className="govuk-table">
          <thead>
            <tr>
              <th>Current status</th>
              <th>New status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ getBillableLabel(billable) }</td>
              <td><span className="highlight">{ getBillableLabel(!billable) }</span></td>
            </tr>
          </tbody>
        </table>
        <Form submit={false} detachFields>
          <UpdatingForm id={id} billable={billable} onCancelClick={onCancelClick} />
        </Form>
      </div>
    </div>
  );
}

export default function Row({ model }) {
  const [updating, setUpdating] = useState(false);
  const [previousUpdates, setPreviousUpdates] = useState([]);
  const url = useSelector(state => state.static.url);
  const { billable, id } = model;

  useEffect(() => {
    fetch(`${url}/billing-history/${id}`).response
      .then(response => response.json())
      .then(response => {
        setPreviousUpdates(response);
      });
  }, []);

  function toggleUpdating(e) {
    e.preventDefault();
    setUpdating(!updating);
  }

  function preventCollapse(e) {
    e.stopPropagation();
  }

  return (
    <Inset onClick={preventCollapse}>
      {
        updating
          ? <UpdatingPanel billable={billable} id={id} onCancelClick={toggleUpdating} />
          : <SummaryPanel id={id} toggleUpdating={toggleUpdating} previousUpdates={previousUpdates} />
      }
    </Inset>
  );
}
