/**
 * Copyright 2018-present, company, Inc
 *
 * This source code is licensed under the MIT LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

const path = require('path')

module.exports = function override(options, env) {
  // add alias for resource reference
  Object.assign(options.resolve.alias, {
    '~': path.join(__dirname, 'public')
  })

  const cssRule = options.module.rules[1].oneOf.find(
    rule => rule.test && rule.test.source === '\\.css$'
  )
  const loaders = env === 'production' ? cssRule.loader : cssRule.use
  cssRule.test = /\.css|.scss$/
  loaders.push({
    loader: 'sass-loader'
  })
  loaders.push({
    loader: 'style-resources-loader',
    options: {
      patterns: [
        path.join(__dirname, 'src/assets/css/normalize.css'),
        path.join(__dirname, 'src/assets/css/var.scss'),
        path.join(__dirname, 'src/assets/css/theme.scss')
      ]
    }
  })


  return options
}
