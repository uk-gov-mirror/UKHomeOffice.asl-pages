import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Snippet,
  Details,
  WidthContainer,
  Link,
  Datatable
} from '@asl/components';
import { getUrl } from '@asl/components/src/link';
import { Button } from '@ukhomeoffice/react-components';
import Header from '../../../components/header';
import ProceduresDownloadLink from '../../../components/procedures-download-link';
import Confirm from '../../../update/views/components/confirm';
import OverflowWrapper from '../../../../common/components/overflow-wrapper';
import formatters from '../formatters';

function Actions({ model }) {
  const url = getUrl({ page: 'rops.procedures.update', procedureId: model.id });

  function onClick(e) {
    if (window.confirm('Are you sure you want to delete this procedure?')) {
      return true;
    }
    e.preventDefault();
  }

  return (
    <Fragment>
      <Link page="rops.procedures.update" procedureId={model.id} label="Edit" />
      <form method="POST" action={`${url}/delete`}>
        <button className="link" onClick={onClick}><span>Delete</span></button>
      </form>
    </Fragment>
  );
}

const Submission = () => {
  const { url, canSubmit, rop } = useSelector(state => state.static, shallowEqual);
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
                  page="rops.submit"
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
  const rop = useSelector(state => state.static.rop);
  const hasProcedures = !!rop.procedures.length;
  const editable = rop.status === 'draft';

  return (
    <Fragment>
      <Header />

      <h2><Snippet canEdit={editable}>change.title</Snippet></h2>
      <p><Snippet canEdit={editable}>change.content</Snippet></p>
      <Details summary={<Snippet>change.summary</Snippet>}>
        <WidthContainer>
          <Confirm />
        </WidthContainer>
      </Details>
      <br />

      { !editable && <ProceduresDownloadLink className="float-right" /> }

      <h2><Snippet>procedures.title</Snippet></h2>
      {
        editable && (
          <Fragment>
            <p><Snippet>procedures.content</Snippet></p>
            <ProceduresDownloadLink className="float-right" />
            <Link
              className="govuk-button"
              page="rops.procedures.create"
              label={<Snippet>procedures.add</Snippet>}
            />
          </Fragment>
        )
      }
      {
        hasProcedures
          ? (
            <OverflowWrapper>
              <Datatable formatters={formatters(rop)} Actions={editable && Actions} />
            </OverflowWrapper>
          )
          : <p><em>No procedures added</em></p>
      }
      <Submission />
    </Fragment>
  );
}
