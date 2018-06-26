/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSEfound in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import { injectReducer } from 'store'
import { toast } from 'store/global'

const MODULE_NAME = '__ComponentName__'

const __ComponentName__INIT = '__ComponentName__INIT'

const initialState = {}

export const mapStateToProps = ({ __ComponentName__ }) => {
  // const {} = __ComponentName__
  return {}
}

const ActionHandles = {
  [__ComponentName__INIT]: (state, action) =>
    Object.assign({}, state, action.payload)
}

export const mapActionsToProps = {
  toast,
  FuncName: value => ({
    type: __ComponentName__INIT,
    payload: value
  }),
  AsyncFuncName: () => {
    return dispatch => {
      setTimeout(() => {
        dispatch({
          type: __ComponentName__INIT,
          payload: ''
        })
      }, 50)
    }
  }
}

// inject Reducer when load this module
injectReducer(MODULE_NAME, initialState, ActionHandles)
