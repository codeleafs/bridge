/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

import React from 'react'
import { shallow } from 'enzyme'
import Loading from './index'

test('render Loading', () => {
  shallow(<Loading />)
})
