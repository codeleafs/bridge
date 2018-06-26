/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSEfound in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import Login from './Login'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { mapStateToProps, mapActionsToProps } from './reducer'

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(Login)
)
