import React from 'react';
import { useSelector } from 'react-redux';
import { DocumentHeader, Link, Snippet } from '@ukhomeoffice/asl-components';
import format from 'date-fns/format';
import { dateFormat } from '../../../constants';
import ProceduresDownloadLink from './procedures-download-link';

export default function RopHeader() {
  const project = useSelector(state => state.static.project);
  const establishment = project.establishment;

  return (
    <DocumentHeader
      title={<Snippet>ropHeader.title</Snippet>}
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

        <dt>Downloads</dt>
        <dd>
          <ul>
            <li><ProceduresDownloadLink /></li>
          </ul>
        </dd>
      </dl>
    </DocumentHeader>
  );
}
