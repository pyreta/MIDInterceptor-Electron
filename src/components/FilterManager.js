import React from 'react';
import * as chainableNoteFilters from '../util/chainableNoteFilters';

const FilterManager = ({ state, dispatch }) => (
  <div>
  { Object.keys(chainableNoteFilters).map((filter, idx) =>
      <div
        key={idx}
        onClick={() => {
          const filterFn = chainableNoteFilters[filter];
          const newFilters = state.selectedFilters.includes(filterFn) ?
            state.selectedFilters.filter(item => filterFn !== item) :
            [...state.selectedFilters, filterFn]
          dispatch({selectedFilters: newFilters})
        }}
        style={{cursor: 'pointer', color: state.selectedFilters.includes(chainableNoteFilters[filter]) ? 'blue' : 'black'}}
      >
        {filter}
      </div>)}
  </div>
)

export default FilterManager;
