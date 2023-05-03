import React from 'react';
import { Snippet, Link, Header, WidthContainer } from '@ukhomeoffice/asl-components';
import Sidebar from '../../components/guidance';

export default function Guidance() {
  return (
    <WidthContainer sidebar={<Sidebar />}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<Snippet>subtitle</Snippet>}
      />
      <div className="rops-guidance-content">
        <Snippet>content</Snippet>
      </div>
      <Link page="rops.update" step="procedures" className="govuk-button" label="Continue" />
    </WidthContainer>
  );
}
