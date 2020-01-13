import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../views';
import SummaryTable from './summary-table';

export default function Overview() {
  const fees = useSelector(state => state.static.fees);
  const sections = [
    {
      title: 'fees.overview.establishment.title',
      rows: [
        {
          title: 'fees.overview.establishment.fee',
          value: fees.establishment,
          currency: true
        }
      ]
    },
    {
      title: 'fees.overview.personal.title',
      rows: [
        {
          title: 'fees.overview.personal.count',
          value: fees.numPils
        },
        {
          title: 'fees.overview.personal.fee',
          value: fees.fees.pil,
          currency: true
        },
        {
          title: 'fees.overview.personal.total',
          value: fees.personal,
          currency: true
        }
      ]
    },
    {
      title: 'fees.overview.total.title',
      rows: [
        {
          title: 'fees.overview.total.fee',
          value: fees.total,
          currency: true
        }
      ]
    }
  ];
  return (
    <Layout tab={0}>
      <SummaryTable sections={sections} />
    </Layout>
  );
}
