import React, { Fragment } from 'react';
import flatten from 'lodash/flatten';
import { format } from 'date-fns';
import getSchema from '@asl/projects/client/schema';
import Field from './field';
import { dateFormat } from '../../../../../constants';

export default function RaSummary({ project, fields, includeDraftRa = false, isPdf = false }) {
  const ra = includeDraftRa ? project.draftRa : project.grantedRa;

  if (!ra) {
    return null;
  }

  const schema = getSchema['RA']();
  const allFields = flatten(Object.values(schema.introduction.subsections).map(s => s.fields));

  return (
    <div className="ra-summary">
      { !isPdf && <h3 className="grey">{project.title}</h3> }

      {
        isPdf && project.draftRa && ra.id === project.draftRa.id &&
          <div className="draft-ra-banner">
            <p>DRAFT - This retrospective assessment is due by {format(project.raDate, dateFormat.long)}</p>
          </div>
      }

      <h2>Retrospective assessment</h2>
      { project.raGrantedDate && <p>Published: {format(project.raGrantedDate, dateFormat.long)}</p> }
      {
        fields.map((name, index) => {
          const field = allFields.find(f => f.name === name);
          return (
            <Fragment key={index}>
              <h3>{field.label}</h3>
              <Field field={field} version={ra.data || {}} />
            </Fragment>
          );
        })
      }
    </div>
  );
}
