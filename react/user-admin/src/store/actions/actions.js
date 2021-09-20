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
} from './types';

// Actions
export const addUser = (payload) => {
  return {
    type: ADD_USER,
    payload,
  };
};

export const addUserRequest = (payload) => {
  return {
    type: ADD_USER_REQUEST,
    payload,
  };
};

export const addUserSuccess = () => {
  return {
    type: ADD_USER_SUCCESS,
  };
};

export const addUserCancelled = (payload) => {
  return {
    type: ADD_USER_CANCELLED,
    payload,
  };
};

export const addUserError = (payload) => {
  return {
    type: ADD_USER_ERROR,
    payload,
  };
};

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};

export const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};

export const deleteUserRequest = (payload) => {
  return {
    type: DELETE_USER_REQUEST,
    payload,
  };
};

export const deleteUserSuccess = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};

export const deleteUserCancelled = (payload) => {
  return {
    type: DELETE_USER_CANCELLED,
    payload,
  };
};

export const deleteUserError = (payload) => {
  return {
    type: DELETE_USER_ERROR,
    payload,
  };
};

export const resetNotifications = () => {
  return {
    type: RESET_NOTIFICATIONS,
  };
};
