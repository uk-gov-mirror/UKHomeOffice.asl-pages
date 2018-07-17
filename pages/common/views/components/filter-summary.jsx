import React from 'react';

const FilterSummary = ({
  total,
  filtered,
  filteredLabel = `Showing ${filtered} of ${total} results`,
  allShowingLabel = `All ${total} results`
}) => (
  <h2 className="filter-summary">
    {
      filtered !== total
        ? filteredLabel
        : allShowingLabel
    }
  </h2>
);

export default FilterSummary;
