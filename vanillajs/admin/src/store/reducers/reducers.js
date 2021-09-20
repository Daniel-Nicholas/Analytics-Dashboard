// Reducer for store
import { usersState } from "../state/state.js";
export function usersReducer(state = usersState, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case "UPDATE":
      // Find user
      const index = state.users.findIndex(
        user => action.payload.index === user.index
      );
      let updatedUsers = [...state.users];
      updatedUsers[index] = action.payload;
      return {
        ...state,
        users: updatedUsers
      };
    case "DELETE":
      const deleteIndex = state.users.findIndex(
        user => action.payload.index === user.index
      );
      let usersLessRemoved = [...state.users];
      usersLessRemoved.splice(deleteIndex, 1);
      return {
        ...state,
        users: usersLessRemoved
      };

    default:
      return state;
  }
}
