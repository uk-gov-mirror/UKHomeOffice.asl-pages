import React from 'react';

const FilterSummary = ({
  all,
  filtered,
  filteredLabel = `Showing ${filtered.length} of ${all.length} results`,
  allShowingLabel = `All ${all.length} results`
}) => (
  <h2 className="filter-summary">
    {
      filtered.length !== all.length
        ? filteredLabel
        : allShowingLabel
    }
  </h2>
);

export default FilterSummary;
