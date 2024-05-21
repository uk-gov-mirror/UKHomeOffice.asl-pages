import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Header,
  Form,
  WidthContainer,
  ErrorSummary, Link
} from '@ukhomeoffice/asl-components';
import { Warning } from '../../../common/components/warning';
import { getTypeAdjustedWording, isAmendment } from './adjusted-wording';

const ConfirmHba = ({ establishment, licenceHolder: proposedLicenceHolder, hba, task }) => {
  let action = task.data.action;
  const uploadType = getTypeAdjustedWording(action, task.type);
  if (isAmendment(action, task.type)) {
    action = 'update';
  }
  const proposedEstablishment = task?.data?.meta?.establishment?.to || null;
  const currentEstablishment = task?.data?.meta?.establishment?.from || null;

  const currentLicenceHolder = task.data.profile;

  return (
    <WidthContainer>
      <ErrorSummary />
      <Form
        cancelLink={
          <Link
            page="task.read"
            taskId={task.id}
            label={<Snippet>actions.cancel</Snippet>}
          />
        }>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
        />
        {
          (uploadType === 'transfer' && proposedEstablishment?.name)
            ? <>
              <p>
                <strong>
                  <Snippet>fields.currentEstablishment.label</Snippet>
                </strong>
                <br />
                {currentEstablishment.name}
              </p>
              <p>
                <strong>
                  <Snippet>fields.proposedEstablishment.label</Snippet>
                </strong>
                <br />
                {proposedEstablishment.name}
              </p>
            </>
            : <p>
              <strong>
                <Snippet>fields.establishment.label</Snippet>
              </strong>
              <br />
              {establishment.name}
            </p>
        }
        {
          (uploadType === 'amendment' && proposedLicenceHolder && proposedLicenceHolder.id !== currentLicenceHolder.id)
            ? <>
              <p>
                <strong>
                  <Snippet>fields.currentPPLHolder.label</Snippet>
                </strong>
                <br />
                {currentLicenceHolder.name}
              </p>
              <p>
                <strong>
                  <Snippet>fields.proposedPPLHolder.label</Snippet>
                </strong>
                <br />
                {proposedLicenceHolder.name}
              </p>
            </>
            : <p>
              <strong>
                <Snippet>{`fields.${action === 'grant' ? 'applicant' : 'pplHolder'}.label`}</Snippet>
              </strong>
              <br />
              {currentLicenceHolder.name}
            </p>

        }

        <p>
          <strong>
            <Snippet>fields.hbaFilename.label</Snippet>
          </strong>
          <br />
          <a href={`/attachment/${hba.hbaToken}`} download={`${hba.hbaFilename}`}>{hba.hbaFilename}</a>{' '}
        </p>
        <Warning>
          <Snippet>{`warning.${uploadType}`}</Snippet>
        </Warning>
      </Form>
    </WidthContainer>
  );
};

const mapStateToProps = ({
  static: { task, establishment, licenceHolder, hba }
}) => ({
  task,
  establishment,
  licenceHolder,
  hba
});

export default connect(mapStateToProps)(ConfirmHba);
