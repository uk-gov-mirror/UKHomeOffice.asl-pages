import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import fetch from 'r2';
import { Inset, Snippet, Form } from '@ukhomeoffice/asl-components';
import { Button } from '@ukhomeoffice/react-components';
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import { dateFormat } from '../../../../../constants';

const schema = {
  comment: {
    inputType: 'textarea'
  }
};

function UpdatingForm({ id, waived, onCancelClick, formFields }) {
  return (
    <Fragment>
      {
        formFields
      }
      <input type="hidden" name="profileId" value={id} />
      <input type="hidden" name="waived" value={!waived} />
      <p className="control-panel">
        <Button>Update billable status</Button>
        <a href="#" onClick={onCancelClick}>Cancel</a>
      </p>
    </Fragment>
  );
}

function Waiver({ waivedBy, updatedAt, comment }) {
  const timestamp = format(updatedAt, dateFormat.long);
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-three-quarters">
        <p><strong>Marked non-billable by: </strong>{waivedBy.firstName} {waivedBy.lastName}</p>
        <Markdown>{comment}</Markdown>
      </div>
      <div className="govuk-grid-column-one-quarters">{timestamp}</div>
    </div>
  );
}

function SummaryPanel({ toggleUpdating, waiver }) {
  return (
    <Fragment>
      {
        waiver && <Waiver {...waiver} />
      }
      <a href="#" onClick={toggleUpdating}><Snippet>change</Snippet></a>
    </Fragment>
  );
}

function UpdatingPanel({ waived, id, onCancelClick }) {

  function getBillableLabel(isWaived) {
    return isWaived ? 'Not billable' : 'Billable';
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
              <td>{ getBillableLabel(waived) }</td>
              <td><span className="highlight">{ getBillableLabel(!waived) }</span></td>
            </tr>
          </tbody>
        </table>
        <Form submit={false} schema={waived ? {} : schema} detachFields>
          <UpdatingForm id={id} waived={waived} onCancelClick={onCancelClick} />
        </Form>
      </div>
    </div>
  );
}

export default function Row({ model }) {
  const [updating, setUpdating] = useState(false);
  const [waiver, setWaiver] = useState(null);
  const url = useSelector(state => state.static.url);
  const { waived, profile } = model;

  useEffect(() => {
    if (!waived) {
      return;
    }
    fetch(`${url}/history?profileId=${profile.id}`).response
      .then(response => response.json())
      .then(response => {
        setWaiver(response);
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
          ? <UpdatingPanel waived={waived} id={profile.id} onCancelClick={toggleUpdating} />
          : <SummaryPanel id={profile.id} waiver={waiver} toggleUpdating={toggleUpdating} />
      }
    </Inset>
  );
}
