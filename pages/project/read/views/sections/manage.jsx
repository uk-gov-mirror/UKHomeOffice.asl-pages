import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';
import OpenTask from '../components/open-task';
import UserCannotEdit from '../components/user-cannot-edit';
import StartAmendment from '../components/start-amendment';
import ChangeLicenceHolder from '../components/change-licence-holder';
import AmendStub from '../components/amend-stub';
import ManageAccess from '../components/manage-access';
import RevokeLicence from '../components/revoke-licence';
import DiscardDraft from '../components/discard-draft';
import DiscardStub from '../components/discard-stub';

export default function Manage() {
  const project = useSelector(state => state.model);
  const { canUpdate, canRevoke, canManageAccess } = useSelector(state => state.static);

  // project can be edited if it is active or a draft.
  const isEditable = project.status === 'inactive' || project.status === 'active';

  if (!project.isLegacyStub) {
    if ((!canUpdate && !canRevoke && !canManageAccess) || !isEditable) {
      return <p><em><Snippet>manage.noPermissions</Snippet></em></p>;
    }
  }

  return (
    <div className="manage">
      <OpenTask />
      <UserCannotEdit />
      <StartAmendment />
      <AmendStub />
      <ChangeLicenceHolder />
      <ManageAccess />
      <RevokeLicence />
      <DiscardDraft />
      <DiscardStub />
    </div>
  );
}
