import React, { Fragment } from 'react';
import DataTable from '../containers/datatable';
import Filters from '../containers/filters';
import ExportLink from '../containers/export-link';
import FilterSummary from '../containers/filter-summary';

const FilterTable = ({
  formatters,
  ExpandableRow
}) => (
  <Fragment>
    <Filters formatters={ formatters }/>
    <FilterSummary />
    <DataTable formatters={ formatters } ExpandableRow={ExpandableRow} />
    <ExportLink />
  </Fragment>
);

export default FilterTable;
