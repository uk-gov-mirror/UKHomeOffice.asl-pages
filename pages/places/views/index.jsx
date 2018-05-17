import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import FilterTable from '../../common/views/components/filter-table';
import Acronym from '../../common/views/components/acronym';
import Join from '../../common/views/components/join';
import dict from '@asl/dictionary';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym key={data}>{data}</Acronym>;
};

const defineValue = val => `${dict[val] || dict[val.toUpperCase()]} (${val})`;

export const formatters = {
  suitability: {
    title: 'Suitability',
    format: joinAcronyms,
    formatFilterItems: defineValue
  },
  holding: {
    title: 'Holding',
    format: joinAcronyms,
    formatFilterItems: defineValue
  }
};

const Places = ({
  establishment: { name },
  ...props
}) => (
  <App {...props}>
    <header>
      <h2>{name}</h2>
      <h1>Licensed premises</h1>
    </header>
    <FilterTable formatters={formatters} />
  </App>
);

const mapStateToProps = ({ establishment }) => ({ establishment });

export default connect(mapStateToProps)(Places);
