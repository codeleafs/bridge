/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import './App.css'
import 'assets/css/common.scss'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store from './store'
import history from './store/history'
import routes from './routes'
import reportError from 'assets/js/error'
import Layout from 'layouts/Layout'

class App extends Component {
  state = {
    catchError: false
  }

  render = () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Layout />
          {routes}
        </div>
      </ConnectedRouter>
    </Provider>
  )

  componentDidCatch(error, errorInfo) {
    reportError(errorInfo, '', error)
    this.setState({ catchError: true })
  }
}

export default App
