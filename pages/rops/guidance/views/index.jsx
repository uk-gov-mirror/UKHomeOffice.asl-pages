import React from 'react';
import { Snippet, Link, Header, WidthContainer } from '@asl/components';

export default function Guidance() {
  return (
    <WidthContainer>
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
