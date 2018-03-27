import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../../actions';

// prettier-ignore
const Button = styled.div`
  background: ${({ on }) => (on ? 'rgba(245, 43, 43, 0.9)' : 'white')};
  ${({ on }) =>
    on
      ? 'box-shadow: 0px 0px 14px 5px rgba(245, 43, 43, 0.4);'
      : 'box-shadow: 1px 1px 5px rgba(0,0,0,0.6);'}
  height: 29px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 2px;
  font-size: 11px;
  border: 1px solid #21252b;
  user-select: none;
  cursor: pointer;
  margin: 0 0 4px 5px;
  transition: all 40ms ease-out;
  transition: background 100ms ease-out;
  flex: 1;
  &:active {
    font-size: 10px;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.9);
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-left: -5px;
`;

class Buttons extends React.Component {
  constructor() {
    super();
    this.toggleSeventh = this.toggleSeventh.bind(this);
    this.toggleSixth = this.toggleSixth.bind(this);
    this.toggleNinth = this.toggleNinth.bind(this);
  }

  toggleSeventh() {
    const notes = { 1: 0, 3: 0, 5: 0 };
    if (!(this.props.chordBody[7] === 0)) {
      notes[7] = 0;
    }
    this.props.addNotes(notes);
  }

  toggleNinth() {
    const notes = { 1: 0, 3: 0, 5: 0 };
    if (!(this.props.chordBody[9] === 0)) {
      notes[9] = 0;
    }
    this.props.addNotes(notes);
  }

  toggleSixth() {
    const notes = { 1: 0, 3: 0, 5: 0 };
    if (!(this.props.chordBody[6] === 0)) {
      notes[6] = 0;
    }
    this.props.addNotes(notes);
  }

  render() {
    return (
      <Wrapper>
        <Button on={this.props.chordBody[6] === 0} onClick={this.toggleSixth}>
          Sixth
        </Button>
        <Button on={this.props.chordBody[7] === 0} onClick={this.toggleSeventh}>
          Seventh
        </Button>
        <Button on={this.props.chordBody[9] === 0} onClick={this.toggleNinth}>
          Ninth
        </Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  autoVoicing,
  chordBody,
}) => ({
  autoVoicing,
  chordBody,
});

const mapDispatchToProps = dispatch => ({
  addNotes: notes => dispatch(actions.UPDATE_CHORD_BODY(notes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
