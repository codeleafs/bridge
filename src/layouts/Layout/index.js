/**
 * Copyright 2018-present, company, Inc
 *
 * This source code is licensed under the MIT LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import Layout from './Layout'
import { connect } from 'react-redux'
import { toast } from 'store/global'

export const mapStateToProps = ({ global }) => {
  return global
}

export const mapActionsToProps = {
  toast
}

export default connect(mapStateToProps, mapActionsToProps)(Layout)
