import React, { Fragment } from 'react';
import flatten from 'lodash/flatten';
import format from 'date-fns/format';
import getSchema from '@asl/projects/client/schema';
import Field from './field';
import ReactMarkdown from 'react-markdown';
import { dateFormat } from '../../../../../constants';

export default function RaSummary({ project, fields }) {
  if (!project.grantedRa) {
    return null;
  }
  const schema = getSchema['RA']();
  const allFields = flatten(Object.values(schema.introduction.subsections).map(s => s.fields));

  return (
    <div className="ra-summary">
      <h3 className="grey">{project.title}</h3>
      <h2>Retrospective assessment summary</h2>
      <p>Published: {format(project.raGrantedDate, dateFormat.long)}</p>
      {
        fields.map((name, index) => {
          const field = allFields.find(f => f.name === name);
          return (
            <Fragment key={index}>
              <h3>{field.label}</h3>
              {
                field.hint && <ReactMarkdown className="grey">{field.hint}</ReactMarkdown>
              }
              <Field field={field} version={project.grantedRa} />
            </Fragment>
          );
        })
      }
    </div>
  );
}
