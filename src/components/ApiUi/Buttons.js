import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../../actions';

const Button = styled.div`
  background: ${({ on }) => (on ? 'rgba(245, 43, 43, 0.9)' : 'white')};
  ${({ on }) =>
    on
      ? 'box-shadow: 0px 0px 14px 5px rgba(245, 43, 43, 0.4);'
      : 'box-shadow: 1px 1px 5px rgba(0,0,0,0.6);'} height: 29px;
  width: 106px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 2px;
  font-size: 15px;
  border: 1px solid #21252b;
  user-select: none;
  cursor: pointer;
  margin: 5px 0 5px 5px;
  transition: all 40ms ease-out;
  transition: background 200ms ease-out;
  &:active {
    font-size: 14px;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.9);
  }
`;

const Wrapper = styled.div`display: flex;`;

class Buttons extends React.Component {
  render() {
    return (
      <Wrapper>
        <Button
          on={this.props.autoVoicing}
          onClick={this.props.toggleAutoVoicing}
        >
          Auto Voicing
        </Button>
        <Button
          on={this.props.voicingDecorator === 'rootNote'}
          onClick={this.props.toggleRootNoteDecorator}
        >
          Root Note
        </Button>
        <Button
          on={this.props.voicingDecorator === 'bassNote'}
          onClick={this.props.toggleBassNoteDecorator}
        >
          Bass Note
        </Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ autoVoicing, voicingDecorator }) => ({
  autoVoicing,
  voicingDecorator,
});

const mapDispatchToProps = dispatch => ({
  toggleAutoVoicing: () => dispatch(actions.TOGGLE_AUTO_VOICING()),
  toggleRootNoteDecorator: () =>
    dispatch(actions.TOGGLE_VOICING_DECORATOR('rootNote')),
  toggleBassNoteDecorator: () =>
    dispatch(actions.TOGGLE_VOICING_DECORATOR('bassNote')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
