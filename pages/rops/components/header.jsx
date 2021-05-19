import React from 'react';
import { useSelector } from 'react-redux';
import { DocumentHeader, Link, Snippet } from '@asl/components';
import format from 'date-fns/format';
import { dateFormat } from '../../../constants';

export default function RopHeader() {
  const { project, establishment } = useSelector(state => state.static);
  return (
    <DocumentHeader
      title={<Snippet>title</Snippet>}
      subtitle={project.title}
      detailsLabel="details and downloads"
      backLink={<Link page="project.read" label="Go to project overview" />}
    >
      <dl>
        <dt>Establishment</dt>
        <dd>{ establishment.name }</dd>

        <dt>Project licence holder</dt>
        <dd>{ `${project.licenceHolder.firstName} ${project.licenceHolder.lastName}` }</dd>

        <dt>Project licence number</dt>
        <dd>{ project.licenceNumber }</dd>

        <dt>Expiry date</dt>
        <dd>{ format(project.expiryDate, dateFormat.long) }</dd>
      </dl>
    </DocumentHeader>
  );
}
