import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../../actions';
import { scales } from '../../constants/theory';

const ScaleContainer = styled.div`display: flex;`;
const Mode = styled.div`
  border: 1px solid rgb(33, 37, 43);
  padding: 2px 13px;
  width: 50px;
  height: 33px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 0;
  border-bottom: 0;
  ${({ selected }) => selected ? 'color: rgb(41, 110, 215);' : 'rgb(141,152,169);'}
  background: rgb(33,37,43);
  transition: all 0.2s ease;
  justify-content: center;
  text-align: center;
  &:hover {
    background: rgb(33, 37, 43);
    color: white;
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 3px 3px 20px 1px #ccc;
  }
  &:active {
    color: rgb(33, 37, 43);
    width: 44px;
    transform: scale(1.4);
    height: 27px;
    border: 3px solid rgb(33, 37, 43);
    background: rgb(216, 0, 0);
  }
`;
const ModeName = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  font-family: sans-serif;
  color: rgba(141, 152, 169, 0.9);
  background: rgb(33,37,43);
  font-size: 13px;
`;
const Container = styled.div`
  border-bottom: 1px solid rgb(33, 37, 43);
  display: inline-block;
`;
const ModeRow = ({
  scale,
  selectedModes,
  onModeClick,
}) => {
  return (
    <ScaleContainer>
      <ModeName></ModeName>
      {scales[scale].modes.map((mode, idx) => (
        <Mode
          key={idx}
          selected={selectedModes[idx + 1]}
          onClick={() => onModeClick(scale, idx + 1)}>
          {mode}
          </Mode>
      ))}
    </ScaleContainer>
  );
};

export class ModeSelect extends React.Component {

  render() {
    return (
      <Container>
      {['major', 'harmonicMinor', 'melodicMinor'].map((scale, idx) => (
        <ModeRow
          key={idx}
          scale={scale}
          selectedModes={this.props.modeRows[scale]}
          onModeClick={this.props.onModeClick}
        />
      ))}
      </Container>
    );
  }
}

const mapStateToProps = ({ modeRows }) => ({
  modeRows,
});

const mapDispatchToProps = dispatch => ({
  onModeClick: (scale, mode) => dispatch(actions.TOGGLE_MODE({ scale, mode })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeSelect);