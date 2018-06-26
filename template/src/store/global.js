/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import {
  GLOBAL_LOADING,
  GLOBAL_LOGIN,
  GLOBAL_LOGOUT,
  GLOBAL_ALERT,
  GLOBAL_TOAST
} from './actionTypes'

import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
  loading: false,
  authUser: null,
  title: '',
  alertConfig: null
}

const ActionHandles = {
  [GLOBAL_LOADING]: (state, action) =>
    Object.assign({}, state, { loading: action.payload }),
  [GLOBAL_LOGIN]: (state, action) =>
    Object.assign({}, state, { authUser: action.payload }),
  [GLOBAL_LOGOUT]: (state, action) =>
    Object.assign({}, state, { authUser: null }),
  [GLOBAL_ALERT]: (state, action) =>
    Object.assign({}, state, { alertConfig: action.payload }),
  [GLOBAL_TOAST]: (state, action) =>
    Object.assign({}, state, { toastConfig: action.payload }),
  [LOCATION_CHANGE]: (state, action) => {
    return Object.assign({}, state, action.payload, {
      loading: false,
      alertConfig: null
    })
  }
}

export default (state = initialState, action) => {
  const handler = ActionHandles[action.type]
  return handler ? handler(state, action) : state
}

export const alertMsg = (content, title, btnText, onClick) => {
  return dispatch => {
    dispatch({
      type: GLOBAL_ALERT,
      payload: {
        content,
        title,
        btnText,
        onClick
      }
    })
  }
}

export const closeAlert = () => ({
  type: GLOBAL_ALERT,
  payload: null
})

export const toast = (msg, duration = 2000) => {
  return dispatch => {
    dispatch({
      type: GLOBAL_TOAST,
      payload: { msg }
    })
    setTimeout(() => {
      dispatch({
        type: GLOBAL_TOAST,
        payload: null
      })
    }, duration)
  }
}

export const loading = (show = true) => {
  return dispatch => dispatch({ type: GLOBAL_LOADING, payload: show })
}
