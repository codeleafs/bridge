/**
 * Copyright 2018-present, company, Inc
 *
 * This source code is licensed under the MIT LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

export default [
  {
    key: '__ComponentName__',
    path: '/__ComponentName__',
    title: '__ComponentName__',
    allowAnonymous: false,
    loader: () => import('./wrapper')
  }
]
