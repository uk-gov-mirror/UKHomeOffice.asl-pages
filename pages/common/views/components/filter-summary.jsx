import React from 'react';

const FilterSummary = ({
  all,
  filtered
}) => (
  <h2 className="filter-summary">
    {
      filtered.length !== all.length
        ? `Showing ${filtered.length} of ${all.length} results`
        : `All ${all.length} results`
    }
  </h2>
);

export default FilterSummary;
