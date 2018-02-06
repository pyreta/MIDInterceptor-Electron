import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import App from './components/App';
import ApiUi from './components/ApiUi';
import store from './store';
import './index.css';







// const initialState = {
//   resolution: 50,
//   chordIds: [11,21,31,41],
//   progression: {
//     11: {
//       key: 'F',
//       mode: 'aeolian',
//       length: 8 /*in 8th notes*/,
//       chord: { name: 'A min' }
//     },
//     21: {
//       key: 'F',
//       mode: 'harmonicMinor',
//       length: 4,
//       chord: { name: 'D dim' }
//     },
//     31: { key: 'F', mode: 'harmonicMinor', length: 6, chord: { name: 'E7' } },
//     41: { key: 'F', mode: 'harmonicMinor', length: 16, chord: { name: 'E7' } }
//   }
// };

// const rootReducer = (state, { type, payload }) => {
//   switch (type) {
//     // case 'CHANGE_CHORDS':
//     //   return {
//     //     resolution: 50,
//     //     progression: {
//     //       1: {
//     //         key: 'F',
//     //         mode: 'aeolian',
//     //         length: 8 /*in 8th notes*/,
//     //         chord: { name: 'A min' }
//     //       },
//     //       2: {
//     //         key: 'F',
//     //         mode: 'harmonicMinor',
//     //         length: 4,
//     //         chord: { name: 'D dim' }
//     //       },
//     //       3: {
//     //         key: 'F',
//     //         mode: 'harmonicMinor',
//     //         length: 6,
//     //         chord: { name: 'E7' }
//     //       },
//     //       4: {
//     //         key: 'F',
//     //         mode: 'harmonicMinor',
//     //         length: 16,
//     //         chord: { name: 'E7' }
//     //       }
//     //     }
//     //   };
//
//     case 'NEW_CHORDS':
//
//       return {
//         resolution: 50,
//         chordIds: [99, 98],
//         progression: {
//           99: {
//             key: 'A',
//             mode: 'Phrygian',
//             length: 5,
//             chord: { name: 'Bsharp9' }
//           },
//           98: {
//             key: 'A',
//             mode: 'Dorian',
//             length: 6,
//             chord: { name: 'Asharp9' }
//           }
//         }
//       };
//
//     case 'ADD_CHORD':
//       return {
//         ...state,
//         chordIds: [...state.chordIds, 44],
//         progression: {
//           ...state.progression,
//           44: {
//             key: 'G',
//             mode: 'MelodicMinor',
//             length: 4,
//             chord: { name: 'Fsharp7' }
//           }
//         }
//       };
//
//     case 'DELETE_CHORD':
//       return {
//         resolution: state.resolution,
//         chordIds: state.chordIds.reduce((accum, id) => {
//           return id === payload ? accum : [...accum, id]
//         }, []),
//         progression: Object.keys(state.progression).reduce((accum, id) => {
//           return id === payload ? accum : { ...accum, [id]: state.progression[id]}
//         }, {})
//       };
//     default:
//       return state;
//   }
// };




ReactDOM.render(
  <Provider store={store}>
    <div>
      <ApiUi />
    </div>
  </Provider>,
  document.getElementById('root')
);
