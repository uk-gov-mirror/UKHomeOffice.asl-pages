import React, { Fragment } from 'react';
import { Snippet } from '@ukhomeoffice/asl-components';
import { numberWithCommas } from '../../../../../lib/utils';

function SummarySection({ rows, title, currency }) {
  return (
    <table className="govuk-table">
      <thead>
        <tr>
          <th colSpan={2}><Snippet>{title}</Snippet></th>
        </tr>
      </thead>
      <tbody>
        {
          rows.map((row, index) => (
            <tr key={index}>
              <td><Snippet>{row.title}</Snippet></td>
              <td className="pull-right">
                {row.currency && '£'}
                <span>{numberWithCommas(row.value)}</span>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default function SummaryTable({ sections }) {
  return (
    <Fragment>
      {
        sections.map((section, index) => (
          <SummarySection key={index} title={section.title} rows={section.rows} />
        ))
      }
    </Fragment>
  );
}
