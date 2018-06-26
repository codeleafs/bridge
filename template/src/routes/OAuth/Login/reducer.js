/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import { injectReducer } from 'store'
import { toast } from 'store/global'

const MODULE_NAME = 'Login'

const LoginINIT = 'LoginINIT'

const initialState = {}

export const mapStateToProps = ({ Login }) => {
  // const {} = Login
  return {}
}

const ActionHandles = {
  [LoginINIT]: (state, action) =>
    Object.assign({}, state, action.payload)
}

export const mapActionsToProps = {
  toast,
  FuncName: value => ({
    type: LoginINIT,
    payload: value
  }),
  AsyncFuncName: () => {
    return dispatch => {
      setTimeout(() => {
        dispatch({
          type: LoginINIT,
          payload: ''
        })
      }, 50)
    }
  }
}

// inject Reducer when load this module
injectReducer(MODULE_NAME, initialState, ActionHandles)
