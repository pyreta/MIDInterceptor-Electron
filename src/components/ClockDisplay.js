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

  bars() {
    const { channelaftertouch, programchange, breathcontrollercoarse } = this.props;
    const bars = channelaftertouch + ( 127 * (programchange - 1) ) + ( 16129 * (breathcontrollercoarse -1));
    return bars < 0 ? 0 : `${Math.floor(bars/64) + 1}.${Math.floor((bars % 64)/16)}`;
  }

  render() {
    return (
      <div style={{display:'flex'}}>
        <div style={{fontSize: '15px', flex: '100%'}}>{`breathcontrollercoarse: ${this.props.breathcontrollercoarse}`}</div>
        <div style={{fontSize: '15px', flex: '100%'}}>{`programchange: ${this.props.programchange}`}</div>
        <div style={{fontSize: '15px', flex: '100%'}}>{`channelaftertouch: ${this.props.channelaftertouch}`}</div>
      </div>
    )
  }
  //
  // render() {
  //   return (
  //     <div>
  //       <div style={{fontSize: '40px'}}>{`bars: ${this.bars()}`}</div>
  //     </div>
  //   )
  // }
}

export default ClockDisplay
