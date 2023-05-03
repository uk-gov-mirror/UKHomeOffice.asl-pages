import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet } from '@ukhomeoffice/asl-components';
import get from 'lodash/get';
import { Button } from '@ukhomeoffice/react-components';
import { formatDate } from '../../../../../lib/utils';
import { dateFormat } from '../../../../../constants';
import Subsection from './subsection';

const getUngrantedVersion = project => {
  return ['draft', 'submitted'].includes(project.versions[0].status) ? project.versions[0] : null;
};

const confirmSubmission = message => e => {
  e.preventDefault();

  if (window.confirm(message)) {
    e.target.submit();
  }
};

export default function StartAmendment() {
  const project = useSelector(state => state.model);
  const { confirmMessage, url, openTask, editable, asruUser, canUpdate, canTransfer, canUpdateStub, additionalAvailability } = useSelector(state => state.static);

  let startAmendmentDescriptionKey = 'start';

  if (!editable || project.status !== 'active' || !canUpdate || additionalAvailability) {
    return null;
  }

  const ungrantedVersion = getUngrantedVersion(project);

  if (ungrantedVersion && (ungrantedVersion.asruVersion !== asruUser)) {
    return null;
  }

  if (project.isLegacyStub) {
    return null;
  }

  // task is a pending revocation or licence holder change
  if (openTask && openTask.data.action !== 'grant') {
    return null;
  }

  const firstAmendment = project.versions[project.versions.findIndex(v => v.status === 'granted') - 1];
  const amendmentStartDate = firstAmendment && formatDate(firstAmendment.createdAt, dateFormat.short);

  const amendmentInProgress = get(project, 'versions[0].status') !== 'granted';

  if (amendmentInProgress) {
    startAmendmentDescriptionKey = 'continue';
  } else if (canTransfer) {
    startAmendmentDescriptionKey = 'transfer';
  }

  const canChangeLicenceHolder = !amendmentInProgress && !openTask && canUpdate && project.status === 'active' && (!project.isLegacyStub || (project.isLegacyStub && canUpdateStub));

  return (
    <Subsection
      title="Amend licence"
      content={<Snippet amendmentStartDate={amendmentStartDate}>{`start-amendment.description.${startAmendmentDescriptionKey}`}</Snippet>}
    >
      <form method="POST">
        <Button className="button-secondary">
          <Snippet>{`actions.${amendmentInProgress ? 'continue' : 'amend'}`}</Snippet>
        </Button>
        {
          canChangeLicenceHolder &&
            <span style={{ 'lineHeight': '2' }}>
              &nbsp;or <Link page="project.updateLicenceHolder" label="change licence holder only" />
            </span>
        }
      </form>
      {
        amendmentInProgress && (
          <div className="margin-bottom">
            {
              openTask
                ? (
                  <Link
                    page="task.read"
                    taskId={openTask.id}
                    label={<Snippet>actions.discardTask</Snippet>}
                  />
                )
                : (
                  <form method="POST" action={`${url}/delete/amendment`} onSubmit={confirmSubmission(confirmMessage)}>
                    <button className="link">
                      <span><Snippet>actions.discard.amendment</Snippet></span>
                    </button>
                  </form>
                )
            }
          </div>
        )
      }
    </Subsection>
  );
}
