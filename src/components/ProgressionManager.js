import React from 'react';
import { SortablePane, Pane } from './ResizablePane';
import styled from 'styled-components';
import actions from '../actions';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  height: 180px;
  background: transparent;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
`;

const ProgressionManager = ({ progression, resolution, changeChordOrder, changeChords, deleteChord }) => (
  <StyledWrapper>
    <SortablePane
      grid={[15, 0]}
      direction="horizontal"
      onOrderChange={(oldList, newList) => {
        console.log(`oldList, newList:`, oldList, newList);
        changeChordOrder({ oldList, newList });
      }}
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
      {Object.keys(progression).map((id, idx) => {
        return (
        <Pane
          key={idx}
          id={id}
          width={progression[id].length * resolution}
          height="40px"
          style={{ border: '1px solid red' }}
        >
          <div style={{ height: '100%', border: '1px solid blue' }}>
            {progression[id].chord.name}
          </div>
          <div onClick={() => deleteChord(id)} style={{ height: '100%', border: '1px solid green' }}>
            {progression[id].key}
          </div>
          <div
            onClick={changeChords}
            style={{ height: '100%', border: '1px solid yellow' }}
          >
            {progression[id].mode}
          </div>
        </Pane>
      )})}
    </SortablePane>
  </StyledWrapper>
);

const mapStateToProps = ({ progression, resolution }) => ({
  progression,
  resolution
});

const mapDispatchToProps = dispatch => ({
  changeChordOrder: stuff => dispatch(actions.CHANGE_CHORD_ORDER(stuff)),
  changeChords: () => dispatch(actions.CHANGE_CHORDS()),
  deleteChord: id => dispatch(actions.DELETE_CHORD(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionManager);
