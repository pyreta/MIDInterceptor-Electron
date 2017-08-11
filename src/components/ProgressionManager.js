import React from 'react';

export class ProgressionManager extends React.Component {

  componentWillMount() {
    this.props.dispatch({ keys: { 1: 'C', 100: 'D' } })
  }

  shouldComponentUpdate({ channelaftertouch, programchange, breathcontrollercoarse } ) {
    // let bars = channelaftertouch + ( 127 * (programchange - 1) ) + ( 16129 * (breathcontrollercoarse -1));
    // bars = bars < 0 ? 0 : bars;
    // console.log(`bars:`, bars)

    // console.log(`channelaftertouch:`, channelaftertouch)
    // if (channelaftertouch === 100){
    //    this.props.dispatch({ currentKey: 'D#'})
    //  };
    return true;
  }

  render() {
    return <div>ProgressionManager</div>
  }
}

export default ProgressionManager;
