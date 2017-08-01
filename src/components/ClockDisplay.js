import React from 'react';

export class ClockDisplay extends React.Component {

  componentWillMount() {
    this.props.dispatch({
      channelaftertouch: 0,
      programchange: 0,
      breathcontrollercoarse: 0,
    })
    this.syncClock();
  }

  syncClock() {
    this.props.dawListener.addListener('programchange', 1, e => this.props.dispatch({ programchange: e.value }));
    this.props.dawListener.addListener('channelaftertouch', 1, e => this.props.dispatch({
      channelaftertouch: e.data[1],
      programchange: e.data[1] === 0 ? 0 : this.props.programchange,
      breathcontrollercoarse: e.data[1] === 0 ? 0 : this.props.breathcontrollercoarse,
    }, 'ignore'));
    this.props.dawListener.addListener('controlchange', 1, e => {
      e.controller.name === 'breathcontrollercoarse' && this.props.dispatch({ breathcontrollercoarse: e.value });
    });
  }

  render() {
    return (
      <div>
        <div style={{fontSize: '40px'}}>{`breathcontrollercoarse: ${this.props.breathcontrollercoarse}`}</div>
        <div style={{fontSize: '40px'}}>{`programchange: ${this.props.programchange}`}</div>
        <div style={{fontSize: '40px'}}>{`channelaftertouch: ${this.props.channelaftertouch}`}</div>
      </div>
    )
  }
}

export default ClockDisplay
