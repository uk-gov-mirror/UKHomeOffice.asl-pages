import React, { Fragment } from 'react';
import DataTable from '../containers/datatable';
import Filters from '../containers/filters';
import FilterSummary from '../containers/filter-summary';
import Link from '../containers/link';
import Snippet from '../containers/snippet';

const FilterTable = ({
  formatters,
  ExpandableRow,
  createPath
}) => (
  <Fragment>
    <Filters formatters={ formatters }/>
    <div className="table-heading">
      <FilterSummary />
      {
        createPath && <Link label={<Snippet>addNew</Snippet>} page={createPath} />
      }
    </div>
    <DataTable formatters={ formatters } ExpandableRow={ExpandableRow} />
  </Fragment>
);

export default FilterTable;
