import React from 'react';
import midiActions from '../../helpers/midiActions';
import { otherListenerTypes } from '../../constants';
import * as noteFilters from './noteFilters';

export class FilterManager extends React.Component {

  componentWillMount() {
    this.props.dispatch({ selectedFilters: [] });
    this.props.registeredListeners.push(this.connectListener.bind(this));
    [this.props.dawListener, this.props.midiDevice].forEach(this.connectListener.bind(this));
  }

  connectListener(device) {
    ['noteon', 'noteoff'].forEach(listenerType => {
        device.addListener(listenerType, 1, e => {
          const filteredEvents = this.props.selectedFilters.reduce((accum, filter) => filter(accum), {
            [e.note.number]: e
          });
          midiActions[listenerType](filteredEvents, this.props.outputDevice);
        })
      });
    otherListenerTypes.forEach(listenerType =>
        device.addListener(listenerType, 1, e => midiActions[listenerType](e, this.props.outputDevice))
      )
  }

  render() {
    const filters = this.props.selectedFilters || [];
    return (
        <div>
        { Object.keys(noteFilters).map((filter, idx) =>
            <div
              key={idx}
              onClick={() => {
                const filterFn = noteFilters[filter];
                const newFilters = (filters).includes(filterFn) ?
                  filters.filter(item => filterFn !== item) :
                  [...filters, filterFn]
                this.props.dispatch({selectedFilters: newFilters})
              }}
              style={{cursor: 'pointer', color: filters.includes(noteFilters[filter]) ? 'blue' : 'black'}}
            >
              {filter}
            </div>)}
        </div>
    )
  }
}

export default FilterManager
