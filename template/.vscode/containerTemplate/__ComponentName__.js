/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import './__ComponentName__.scss'
/* IF !class */
import React, { PureComponent } from 'react'

class __ComponentName__ extends PureComponent {

  componentDidMount() {
  }

  render() {
    return <section className="__ComponentName__">__ComponentName__</section>
  }
}
/* ENDIF */ 
/* IF class*/
import React, { Component } from 'react'

class __ComponentName__ extends Component {

  componentDidMount() {
  }

  render() {
    return <section className="__ComponentName__">__ComponentName__</section>
  }
}
/* ENDIF */

export default __ComponentName__
