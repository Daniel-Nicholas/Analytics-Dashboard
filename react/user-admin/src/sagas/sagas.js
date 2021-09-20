import { put, takeEvery, all, call } from 'redux-saga/effects';
import { api } from '../services';
import {
  ADD_USER,
  ADD_USER_REQUEST,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_REQUEST,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  RESET_NOTIFICATIONS,
} from '../store/actions/types';

// Example async delete saga
export function* deleteAsync(action) {
  try {
    const payload = action.payload;
    // blocking call to API service and yield
    yield call(api.deleteUser, payload);
    yield put({ type: RESET_NOTIFICATIONS });
    // delete user from store
    yield put({ type: DELETE_USER_REQUEST, payload });
    // dispatch action with SUCCESS result
    yield put({ type: DELETE_USER_SUCCESS });
    yield put({ type: RESET_NOTIFICATIONS });
  } catch (error) {
    // dispatch action with ERROR result
    yield put({ type: DELETE_USER_ERROR, error });
  }
}

// Example async add saga
export function* addAsync(action) {
  try {
    const payload = action.payload;
    // blocking call to API service and yield
    yield call(api.addUser, payload);
    yield put({ type: RESET_NOTIFICATIONS });
    // add user to store
    yield put({ type: ADD_USER_REQUEST, payload });
    // dispatch action with SUCCESS result
    yield put({ type: ADD_USER_SUCCESS });
    yield put({ type: RESET_NOTIFICATIONS });
  } catch (error) {
    // dispatch action with ERROR result
    yield put({ type: ADD_USER_ERROR, error });
  }
}

export function* watchAdd() {
  // Take every ADD_USER action
  yield takeEvery(ADD_USER, addAsync);
}

export function* watchDelete() {
  // Take every DELETE_USER action
  yield takeEvery(DELETE_USER, deleteAsync);
}

// root saga injected when application mounted
export default function* rootSaga() {
  yield all([watchDelete(), watchAdd()]);
}
