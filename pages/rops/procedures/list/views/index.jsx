import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Snippet,
  Details,
  WidthContainer,
  Link,
  Datatable,
  OverflowWrapper
} from '@ukhomeoffice/asl-components';
import { Button } from '@ukhomeoffice/react-components';
import RopHeader from '../../../components/header';
import ProceduresDownloadLink from '../../../components/procedures-download-link';
import Confirm from '../../../update/views/components/confirm';
import formatters from '../formatters';

function Actions({ model }) {
  return (
    <Fragment>
      <Link page="rops.procedures.update" query={{ rowNum: model.rowNum }} procedureId={model.id} label="Edit" />
    </Fragment>
  );
}

const Submission = () => {
  const { url, canSubmit } = useSelector(state => state.static, shallowEqual);
  const rop = useSelector(state => state.model);
  const hasProcedures = !!rop.procedures.length;
  const editable = rop.status === 'draft';

  if (!editable) {
    return <Fragment>
      <h2><Snippet>unsubmit.title</Snippet></h2>
      <p><Snippet>unsubmit.content</Snippet></p>
      <form action={`${url}/unsubmit`} method="POST">
        <Button><Snippet>unsubmit.action</Snippet></Button>
      </form>
    </Fragment>;
  }
  return hasProcedures && (
    <Fragment>
      <h2><Snippet>submit.title</Snippet></h2>
      {
        canSubmit
          ? (
            <Fragment>
              <p><Snippet>submit.content</Snippet></p>
              <p>
                <Link
                  page="rops.procedures.list"
                  suffix="review"
                  className="govuk-button"
                  label={<Snippet>submit.action</Snippet>}
                />
              </p>
            </Fragment>
          )
          : <p><Snippet>submit.cannot-submit</Snippet></p>
      }

    </Fragment>
  );
};

export default function Procedures() {
  const rop = useSelector(state => state.model);
  const hasProcedures = !!rop.procedures.length;
  const editable = rop.status === 'draft';

  return (
    <div className="rop-procedures-list force-show-scrollbars">
      <RopHeader />

      <h2><Snippet canEdit={editable}>change.title</Snippet></h2>
      <p><Snippet canEdit={editable}>change.content</Snippet></p>
      <Details summary={<Snippet>change.summary</Snippet>}>
        <WidthContainer>
          <Confirm />
        </WidthContainer>
      </Details>
      <br />

      { !editable && hasProcedures && <ProceduresDownloadLink className="float-right" /> }

      <h2><Snippet>procedures.title</Snippet></h2>
      {
        editable && (
          <Fragment>
            <p><Snippet>procedures.content</Snippet></p>
            { hasProcedures && <ProceduresDownloadLink className="float-right" /> }
            <Link
              className="govuk-button"
              page="rops.procedures.create"
              label={<Snippet>procedures.add</Snippet>}
            />
          </Fragment>
        )
      }
      <OverflowWrapper>
        <Datatable formatters={formatters(rop)} Actions={editable && Actions} noDataWarning={<Snippet>noDataWarning</Snippet>} />
      </OverflowWrapper>
      <Submission />
    </div>
  );
}
