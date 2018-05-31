/**
 * Copyright 2018-present, company, Inc
 * 
 * This source code is licensed under the MIT LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 */

import './style.scss'
/* IF !class */
import React from 'react'
import PropTypes from 'prop-types'

const __ComponentName__ = () => (
  <div className="__ComponentName__">
    __ComponentName__
  </div>
)

__ComponentName__.propTypes = {

}
/* ENDIF */ 
/* IF class*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class __ComponentName__ extends Component {
  static propTypes = {

  }
  render = () => (
    <div className="__ComponentName__">
      __ComponentName__
    </div>
  )
}
/* ENDIF */

export default __ComponentName__
