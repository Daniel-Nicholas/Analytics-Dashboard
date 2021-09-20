// Reducer for store
import { teamState } from '../state/state.js';
export function teamReducer(state = teamState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        team: {
          ...state.team,
          members: [...state.team.members, action.payload]
        }
      };
    case 'DELETE':
      const index = state.team.members.findIndex(element => {
        return element.name === action.payload;
      });
      if (index !== -1) {
        const updatedMembers = [...state.team.members];
        updatedMembers.splice(index, 1);
        return {
          ...state,
          team: {
            ...state.team,
            members: updatedMembers
          }
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
