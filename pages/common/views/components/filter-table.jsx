import React, { Fragment } from 'react';
import DataTable from '../containers/datatable';
import Filters from '../containers/filters';
import ExportLink from '../containers/export-link';
import FilterSummary from '../containers/filter-summary';
import Link from '../containers/link';
import Snippet from '../containers/snippet';

const FilterTable = ({
  formatters,
  ExpandableRow,
  editable
}) => (
  <Fragment>
    <Filters formatters={ formatters }/>
    <FilterSummary />
    {
      editable && <Link label={<Snippet>addNew</Snippet>} path="create" />
    }
    <DataTable formatters={ formatters } ExpandableRow={ExpandableRow} />
    <ExportLink />
  </Fragment>
);

export default FilterTable;
