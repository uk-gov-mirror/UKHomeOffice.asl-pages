import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';
import OpenTask from '../components/open-task';
import UserCannotEdit from '../components/user-cannot-edit';
import StartAmendment from '../components/start-amendment';
import ChangeLicenceHolder from '../components/change-licence-holder';
import AmendStub from '../components/amend-stub';
import RevokeLicence from '../components/revoke-licence';
import DiscardDraft from '../components/discard-draft';
import DiscardStub from '../components/discard-stub';

export default function Manage() {
  const { canUpdate, canRevoke, canManageAccess } = useSelector(state => state.static);

  if (!canUpdate && !canRevoke && !canManageAccess) {
    return <p><em><Snippet>manage.noPermissions</Snippet></em></p>;
  }

  return (
    <div className="manage">
      <OpenTask />
      <UserCannotEdit />
      <StartAmendment />
      <AmendStub />
      <ChangeLicenceHolder />
      <RevokeLicence />
      <DiscardDraft />
      <DiscardStub />
    </div>
  );
}
