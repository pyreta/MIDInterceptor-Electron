import React from 'react';
import { SortablePane, Pane } from './ResizablePane';

export class ProgressionManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chords: {
        1: {width: 50, note: 'B'},
        2: {width: 70, note: 'D#'},
        3: {width: 50, note: 'C'},
      }
    };
  }

  componentWillMount() {
    this.props.dispatch({
      resolution: 50,
      progression: {
        1: { key: 'C', mode: 'aeolian', length: 8 /*in 8th notes*/, chord: { name: 'A min'} },
        2: { key: 'C', mode: 'harmonicMinor', length: 4, chord: { name: 'D dim'} },
        3: { key: 'C', mode: 'harmonicMinor', length: 6, chord: { name: 'E7'} }
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
        this.props.setFilteredNotes({});
      }
    });
  }

  render() {
    return (
      <div style={{ height: '180px', background: 'transparent', overflowX: 'auto', overflowY: 'hidden', position: 'relative' }}>
        {
          //
          // <div onClick={() => this.setState({
          //     chords: {
          //       1: {width: 50, note: 'B'},
          //       2: {width: 70, note: 'D#'},
          //     }
          //   })}>Remove CHORD</div>
        }
        {

          // <div onClick={() => this.setState({
          //     chords: {
          //       0: {width: 100, note: 'A'},
          //       ...this.state.chords
          //     }
          //   })}>ADD CHORD</div>
        }
        <SortablePane
          grid={[15,0]}
          direction="horizontal"
          onOrderChange={(oldList, newList) => console.log(`oldList, newList:`, oldList, newList)}
          onResize={(e, id, panes, data) => {
            console.log('onResize', e, id, panes, data);
          }}
          onResizeStart={(e, id, panes) => {
            console.log('onResizeStart', e, id, panes);
          }}
          onResizeStop={(e, id, panes, data) => {
            console.log('onResizeStop', e, id, panes, data);
          }}
          >
          {Object.keys(this.props.progression || {}).map((id, idx) => {
            const section = this.props.progression[id];
            const width = section.length * this.props.resolution;
            return (
              <Pane key={idx} id={idx} width={width} height="40px" style={{border: '1px solid red'}}>
                <div style={{height: '100%', border: '1px solid blue'}}>{section.chord.name}</div>
                <div style={{height: '100%', border: '1px solid green'}}>{section.key}</div>
                <div style={{height: '100%', border: '1px solid yellow'}}>{section.mode}</div>
              </Pane>
            )}
          )}

        </SortablePane>
      </div>);
  }
}

export default ProgressionManager;
