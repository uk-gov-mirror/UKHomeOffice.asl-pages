import React, { Fragment } from 'react';
import DataTable from '../containers/datatable';
import Filters from '../containers/filters';
import ExportLink from '../containers/export-link';
import FilterSummary from '../containers/filter-summary';

const FilterTable = ({
  formatters,
  expandable
}) => (
  <Fragment>
    <Filters formatters={ formatters }/>
    <FilterSummary />
    <DataTable formatters={ formatters } expandable={expandable} />
    <ExportLink />
  </Fragment>
);

export default FilterTable;
