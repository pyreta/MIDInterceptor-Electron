import React from 'react';

export class ProgressionManager extends React.Component {
  componentWillMount() {
    this.props.dispatch({
      progression: {
        1: { key: 'C', mode: 'aeolian' },
        17: { key: 'C', mode: 'harmonicMinor' }
      }
    });
    this.props.dawListener.addListener('channelaftertouch', 1, e => {
      if (this.props.progression[this.props.channelaftertouch]) {

        this.props.dispatch({
          currentKey: this.props.progression[this.props.channelaftertouch].key,
          mode: this.props.progression[this.props.channelaftertouch].mode
        });

        this.props.outputDevice.stopNote(Object.keys(this.props.filteredNotes).map(n=>parseInt(n,10)));

        this.props.setNotes({});
        // this.props.setNotes({}, 'filter');
        this.props.setFilteredNotes({});
      }
    });
  }

  render() {
    return <div>ProgressionManager</div>;
  }
}

export default ProgressionManager;
