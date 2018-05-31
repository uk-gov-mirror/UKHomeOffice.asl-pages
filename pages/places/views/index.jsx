import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import FilterTable from '../../common/views/components/filter-table';
import Acronym from '../../common/views/components/acronym';
import Join from '../../common/views/components/join';
import dict from '@asl/dictionary';
import Snippet from '../../common/views/containers/snippet';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym key={data}>{data}</Acronym>;
};

const defineValue = val => `${dict[val] || dict[val.toUpperCase()]} (${val})`;

export const formatters = {
  suitability: {
    title: <Snippet>suitability</Snippet>,
    format: joinAcronyms,
    formatFilterItems: defineValue
  },
  holding: {
    title: <Snippet>holding</Snippet>,
    format: joinAcronyms,
    formatFilterItems: defineValue
  },
  notes: {
    title: <Snippet>restrictions</Snippet>
  }
};

const Places = ({
  establishment: { name },
  ...props
}) => (
  <App {...props}>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.places</Snippet></h1>
    </header>
    <FilterTable formatters={formatters} expandable={true} />
  </App>
);

const mapStateToProps = ({ establishment }) => ({ establishment });

export default connect(mapStateToProps)(Places);
