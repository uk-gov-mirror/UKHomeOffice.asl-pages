import React from 'react';
import { useSelector } from 'react-redux';
import OpenTask from '../components/open-task';
import StartAmendment from '../components/start-amendment';
import ManageAccess from '../components/manage-access';
import RevokeLicence from '../components/revoke-licence';
import DiscardDraft from '../components/discard-draft';

export default function Manage() {
  const project = useSelector(state => state.model);
  const { canUpdate, canRevoke, additionalAvailability } = useSelector(state => state.static);

  // project can be edited if it is active or a draft.
  const isEditable = project.status === 'inactive' || project.status === 'active';

  if (!project.isLegacyStub) {
    if ((!canUpdate && !canRevoke) || !isEditable) {
      return null;
    }
  }

  return (
    <div className="manage">
      { !additionalAvailability && <OpenTask /> }
      { canUpdate && !additionalAvailability && <StartAmendment /> }
      <ManageAccess />
      { canUpdate && !additionalAvailability && <RevokeLicence /> }
      { canUpdate && !additionalAvailability && <DiscardDraft /> }
    </div>
  );
}
