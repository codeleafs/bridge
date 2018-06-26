/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

export default [
  {
    key: 'Login',
    path: '/Login',
    title: 'Login',
    allowAnonymous: false,
    loader: () => import('./wrapper')
  }
]
