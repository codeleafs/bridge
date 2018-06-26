/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSEfound in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

export default new class {
  _login = false
  _accessToken = ''
  _refreshToken = ''

  constructor() {
    this._accessToken = window.utils.store('access_token')
    this._refreshToken = window.utils.store('refresh_token')
  }

  /**
   * Return the login status
   *
   * @readonly
   */
  get login() {
    return this._login
  }

  /**
   * Return the refresh token
   *
   * @readonly
   */
  get refreshToken() {
    return this._refreshToken
  }

  /**
   * set refresh token
   * 
   * @param {string} token
   */
  setRefreshToken(token) {
    this._refreshToken = token
    window.utils.store('refresh_token', token)
  }

  /**
   * Return the access token
   *
   * @readonly
   */
  get accessToken() {
    return this._accessToken
  }

  /**
   * set access token
   * @param {string} token
   */
  setAccessToken(token) {
    this._accessToken = token
    window.utils.store('access_token', token)
  }
}()
