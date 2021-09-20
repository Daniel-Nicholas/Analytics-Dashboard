// Reducer for store
import { usersState } from '../state/state.js';
import {
  ADD_USER,
  ADD_USER_REQUEST,
  ADD_USER_ERROR,
  ADD_USER_CANCELLED,
  ADD_USER_SUCCESS,
  UPDATE_USER,
  DELETE_USER,
  DELETE_USER_CANCELLED,
  DELETE_USER_REQUEST,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../actions/types';

function NotificationMessage(
  title = 'no_title',
  message = 'no_message',
  level = 'info',
) {
  return {
    title: title,
    message: message,
    level: level,
  };
}

export function usersReducer(state = usersState, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        notification: new NotificationMessage(
          'ADD_USER',
          'Processing add user request',
          'info',
        ),
      };
    case ADD_USER_REQUEST:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        notification: new NotificationMessage(
          'ADD_USER_SUCCESS',
          'User added to our records',
          'info',
        ),
      };
    case ADD_USER_ERROR:
    case ADD_USER_CANCELLED:
      return {
        ...state,
        notification: new NotificationMessage(
          'ADD_USER_CANCELLED',
          'Failed to add the user',
          'warning',
        ),
      };
    case UPDATE_USER:
      // Find user
      const index = state.users.findIndex(
        (user) => action.payload.index === user.index,
      );
      let updatedUsers = [...state.users];
      updatedUsers[index] = action.payload;
      return {
        ...state,
        users: updatedUsers,
      };
    case DELETE_USER:
      return {
        ...state,
        notification: new NotificationMessage(
          'DELETE_USER',
          'Processing delete user request',
          'info',
        ),
      };
    case DELETE_USER_REQUEST:
      const deleteIndex = state.users.findIndex(
        (user) => action.payload.index === user.index,
      );
      let usersLessRemoved = [...state.users];
      usersLessRemoved.splice(deleteIndex, 1);
      return {
        ...state,
        users: usersLessRemoved,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        notification: new NotificationMessage(
          'DELETE_USER_SUCCESS',
          'User deleted from our records',
          'info',
        ),
      };
    case DELETE_USER_ERROR:
    case DELETE_USER_CANCELLED:
      return {
        ...state,
        notification: new NotificationMessage(
          'DELETE_USER_CANCELLED',
          'Failed to delete the user',
          'warning',
        ),
      };
    case RESET_NOTIFICATIONS:
      return {
        ...state,
        notification: null,
      };

    default:
      return state;
  }
}
