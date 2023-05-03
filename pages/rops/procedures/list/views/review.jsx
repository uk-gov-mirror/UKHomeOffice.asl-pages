import React from 'react';
import { useSelector } from 'react-redux';
import {
  Snippet,
  Link,
  Datatable,
  Header,
  WidthContainer,
  OverflowWrapper
} from '@ukhomeoffice/asl-components';
import Confirm from '../../../update/views/components/confirm';
import formatters from '../formatters';

export default function Procedures() {
  const rop = useSelector(state => state.model);

  return (
    <div className="rop-procedures-list force-show-scrollbars">
      <Header
        title={<Snippet>pageTitle</Snippet>}
        subtitle={rop.project.title}
      />

      <WidthContainer>
        <Confirm isReview={true} />
      </WidthContainer>

      <h2><Snippet>procedures.title</Snippet></h2>

      <OverflowWrapper>
        <Datatable formatters={formatters(rop)} noDataWarning={<Snippet>noDataWarning</Snippet>} />
      </OverflowWrapper>

      <div className="control-panel">
        <Link page="rops.submit" className="govuk-button" label={<Snippet>submit.action</Snippet>} />
        <Link page="rops.procedures.list" label="Back" />
      </div>
    </div>
  );
}
