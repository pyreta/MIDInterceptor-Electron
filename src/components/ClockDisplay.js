import React from 'react';

const ClockDisplay = props =>
  <div>
    <div style={{fontSize: '40px'}}>{`breathcontrollercoarse: ${props.state.breathcontrollercoarse}`}</div>
    <div style={{fontSize: '40px'}}>{`programchange: ${props.state.programchange}`}</div>
    <div style={{fontSize: '40px'}}>{`channelaftertouch: ${props.state.channelaftertouch}`}</div>
  </div>

export default ClockDisplay;
