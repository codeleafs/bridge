/**
 * Copyright {{year}}-present, {{author}}, Inc
 * 
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 */

const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "style-resources-loader",
            options: {
              patterns: [
                path.join(__dirname, '../src/assets/css/normalize.css'),
                path.join(__dirname, '../src/assets/css/var.scss'),
                path.join(__dirname, '../src/assets/css/theme.scss'),
                path.join(__dirname, '../src/assets/css/common.scss')
              ]
            }
          }],
        include: path.resolve(__dirname, '../')
      }
    ]
  }
}