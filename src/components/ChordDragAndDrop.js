import React from 'react';
import styled from 'styled-components';
import { notes, noteColors } from '../constants';
import Resizable from 'react-resizable-box';

const chordsFixture = notes.map(note => ({note, width: 40, background: noteColors[note]}));

const Container = styled.div`
  border: 4px solid red;
  display: flex;
  border-right: 0;
  border-left: 0;
  height: 40px;
  width: ${props => props.width}px;
  background: ${props => props.background};
  color: black;
`;

const StyledBorder = styled.div`
  height: 40px;
  background: ${props => props.background};
  width: 4px;
  &:hover {cursor: col-resize;};
`;


// class Chord extends React.Component {
//
//     constructor(props) {
//       super(props);
//       this.state={
//         width: this.props.chord.width,
//       }
//     }
//
//     onMouseDown(e) {
//       console.log(e.clientX);
//       this.setState({ start: e.clientX, down: true });
//       this.props.onChordClick();
//     }
//
//     onMouseUp() {
//       this.setState({ down: false });
//       this.props.onChordRelease();
//     }
//
//     render() {
//       const { chord: { background, note }} = this.props;
//       return (
//         <Container background={background} width={this.state.width} onDragEnd={e=>console.log('dragging end', e.clientX)}>
//           <div style={{flex: '1'}}>{note}</div>
//           <StyledBorder onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} background="red" />
//         </Container>
//       )
//     }
//   }
 const Chord = props =>
   <Resizable
     className="item"
     width={50}
     style={{background: props.chord.background}}
     enable={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
     onResize={e=>console.log('DIVVVY', e)}
   >
     {props.chord.note}
   </Resizable>

export class ChordDragAndDrop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resolution: 5
    }
  }

  onMouseDown() {
    this.setState({ down: true });
  }

  onMouseUp() {
    this.setState({ down: false });
  }

  onMouseOver(e) {
    if (this.state.down) console.log(e.clientX);
  }

  render() {
    return (
      <div style={{
        overflowX: 'auto',
        display: 'flex'
      }}
      onMouseUp={this.onMouseUp.bind(this)}
      onMouseOver={this.onMouseOver.bind(this)}>
        {chordsFixture.map((chord, idx) =>
          <Chord chord={chord}
            onChordClick={this.onMouseDown.bind(this)}
            key={idx}
          />)}
      </div>
    )
  }
}


export default ChordDragAndDrop
