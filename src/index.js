/**
 * Copyright 2018-present, company, Inc
 *
 * This source code is licensed under the MIT LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import 'assets/js/bridge'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import register from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
register()
