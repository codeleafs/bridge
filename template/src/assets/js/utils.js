/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

export default new class {

  /**
   * Return or cache the data for specify key
   *
   * @param {string} key
   * @param {string} value
   * @returns
   */
  cache(key, value) {
    if (value === undefined) {
      return sessionStorage.getItem(key)
    }
    sessionStorage.setItem(key, value)
  }

  /**
   * store value to localStorage
   *
   * @param {string} key
   * @param {string} value
   * @param {number} expired(s)
   * @returns
   */
  store(key, value, expired) {
    if (value === undefined) {
      const val = (localStorage.getItem(key) || '').split(';;expired=')
      return !val[1] || val[1] > Date.now() ? val[0] : ''
    }
    const timestamp = expired ? `;;expired=${Date.now() + expired * 1000}` : ''
    localStorage.setItem(key, value + timestamp)
  }

  /**
   * remove value from localStorage
   * @param {string} key
   */
  removeStore(key) {
    localStorage.removeItem(key)
  }

  /**
   * remove all from localStorage
   */
  clearStore() {
    localStorage.clear()
  }
}