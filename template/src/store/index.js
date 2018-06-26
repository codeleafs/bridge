/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { GLOBAL_LOGOUT, GLOBAL_CACHE } from './actionTypes'
import global from './global'
import history from './history'
import initInterceptor from '../api'

const CACHE_NAME = '__INITIAL_STATE__'

// load the initial state from the sessionStorage
let cacheState = {}
try {
  const stateString = sessionStorage.getItem(CACHE_NAME)
  stateString && (cacheState = JSON.parse(stateString))
} catch (err) {
  sessionStorage.removeItem(CACHE_NAME)
}

// automatic cache data to sessionStorage
const cacheSession = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case GLOBAL_LOGOUT:
      sessionStorage.removeItem(CACHE_NAME)
      break
    case GLOBAL_CACHE:
      sessionStorage.setItem(
        CACHE_NAME,
        JSON.stringify(Object.assign(cacheState, getState()))
      )
      break
    default:
      break
  }
  return next(action)
}

// default reducer for first load
let reducers = {
  router: routerReducer,
  global
}

let composeEnhancers = compose
// enable the redux debug mode in the development environment
if (process.env.NODE_ENV === 'development') {
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    (composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
}

const initialState = {}

// constructor redux store
const store = createStore(
  combineReducers({ ...reducers }),
  initialState,
  composeEnhancers(
    applyMiddleware(cacheSession, thunk, routerMiddleware(history))
  )
)

// init ajax request interceptor
initInterceptor(history)

// export store
export default store

/**
 * inject reducer when switch route
 *
 * @param {any} key
 * @param {any} initialState
 * @param {any} actionHandles
 */
export const injectReducer = (key, initialState, actionHandles) => {
  // inject reducer only once
  if (reducers[key]) {
    return
  }

  Object.assign(reducers, {
    [key]: (state = Object.assign(initialState, cacheState[key]), action) => {
      const handler = actionHandles[action.type]
      return handler ? handler(state, action) : state
    }
  })

  // replace old reducer
  store.replaceReducer(combineReducers({ ...reducers }))
}
