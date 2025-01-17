import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import Subsection from '../components/subsection';

export default function Rops() {
  const { url, project } = useSelector(state => state.static);

  const draftRop = project.rops.find(rop => rop.status === 'draft');
  const submittedRop = project.rops.find(rop => rop.status === 'submitted');

  return (
    <Subsection
      title={<Snippet>rops.title</Snippet>}
      content={<Snippet year={(new Date()).getFullYear()}>{ submittedRop ? 'rops.submitted' : 'rops.content' }</Snippet>}
    >
      {
        submittedRop
          ? <Link
            className="govuk-button button-secondary"
            page="rops.procedures"
            ropId={submittedRop.id}
            label={<Snippet>rops.read</Snippet>}
          />
          : (
            <Fragment>
              <p><Snippet deadline="31 January 2022">rops.deadline</Snippet></p>
              {
                draftRop
                  ? <Link
                    className="govuk-button button-secondary"
                    page="rops.update"
                    step="confirm"
                    ropId={draftRop.id}
                    label={<Snippet>rops.action</Snippet>}
                  />
                  : (
                    <form method="POST" action={`${url}/rops`}>
                      <Button className="button-secondary">
                        <Snippet>rops.action</Snippet>
                      </Button>
                    </form>
                  )
              }
            </Fragment>
          )
      }
    </Subsection>
  );
}
