import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';
import Layout from '../../views';
import { numberWithCommas } from '../../../../../lib/utils';

function SummarySection({ rows, title }) {
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
              <td className="pull-right">£{numberWithCommas(row.value)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default function Overview() {
  const fees = useSelector(state => state.static.fees);
  return (
    <Layout tab={0}>
      <h2><Snippet>title</Snippet></h2>
      <SummarySection
        title="fees.overview.establishment.title"
        rows={[
          {
            title: 'fees.overview.establishment.fee',
            value: fees.establishment
          }
        ]}
      />
      <SummarySection
        title="fees.overview.personal.title"
        rows={[
          {
            title: 'fees.overview.personal.count',
            value: fees.numPersonal
          },
          {
            title: 'fees.overview.personal.fee',
            value: fees.personalFee
          },
          {
            title: 'fees.overview.personal.total',
            value: fees.personal
          }
        ]}
      />
      <SummarySection
        title="fees.overview.total.title"
        rows={[
          {
            title: 'fees.overview.total.fee',
            value: fees.total
          }
        ]}
      />
    </Layout>
  );
}
