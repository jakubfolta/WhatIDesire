import * as actions from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  token: null,
  userId: null,
  error: null
}

const authStart = (state, action) => {
  return updateObject(state, {loading: true, error: null});
}

const authSuccess = (state, action) => {
  return updateObject(state, {loading: false, token: action.token, userId: action.userId})
}

const authFail = (state, action) => {
  return updateObject(state, {loading: false, error: action.error})
}

const authLogout = (state, action) => {
  return updateObject(state, {token: null, userId: null})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START: return authStart(state, action);
    case actions.AUTH_SUCCESS: return authSuccess(state, action);
    case actions.AUTH_FAIL: return authFail(state, action);
    case actions.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default reducer;