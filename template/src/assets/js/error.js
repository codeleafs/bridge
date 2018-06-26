/**
 * Copyright {{year}}-present, {{author}}, Inc
 *
 * This source code is licensed under the {{license}} LICENSE found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * report error message
 *
 * @param {any} message
 * @param {any} source
 * @param {any} error
 */
const reportError = (message, source, error) => {
  const reportURL = 'https://company.com/report/error'
  try {
    const content = {
      refer: document.referrer,
      href: window.location.href,
      ua: navigator.userAgent,
      message,
      source,
      error: error && error.stack
    }
    new Image().src = `${reportURL}?log=${encodeURIComponent(
      JSON.stringify(content)
    )}`
  } catch (err) {}
}

export default reportError
