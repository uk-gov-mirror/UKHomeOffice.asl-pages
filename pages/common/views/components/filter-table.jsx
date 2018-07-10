import React, { Fragment } from 'react';
import DataTable from '../containers/datatable';
import Filters from '../containers/filters';
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
    <div className="table-heading">
      <FilterSummary />
      {
        editable && <Link label={<Snippet>addNew</Snippet>} path="create" />
      }
    </div>
    <DataTable formatters={ formatters } ExpandableRow={ExpandableRow} />
  </Fragment>
);

export default FilterTable;
