import React from 'react';
import * as filters from '../util/filters';

const FilterManager = ({ onFilterChange, currentFilter }) => (
  <div>
  { Object.keys(filters).map((filter, idx) =>
      <div
        key={idx}
        onClick={() => onFilterChange(filter)}
        style={{cursor: 'pointer', color: currentFilter === filters[filter] ? 'blue' : 'black'}}
      >
        {filter}
      </div>)}
  </div>
)

export default FilterManager;
