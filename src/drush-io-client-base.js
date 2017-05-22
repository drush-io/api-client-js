'use strict';

const popsicle = require('popsicle');

let token,
    host,
    baseUrl;

class DrushIOBase {

  constructor(jwt, httpHost, basePath, version) {
    token = jwt;
    host = httpHost;
    baseUrl = `${host}${basePath}${version}`;
  }

  get(path) {
    return popsicle.request(this._buildRequest('GET', path))
      .use(popsicle.plugins.parse('json'))
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  post(path, data, csrf) {
    return popsicle.request(this._buildRequest('POST', path, data, csrf))
      .use(popsicle.plugins.parse('json'))
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  patch(path, data, csrf) {
    return popsicle.request(this._buildRequest('PATCH', path, data, csrf))
      .use(popsicle.plugins.parse('json'))
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  del(path, csrf) {
    return popsicle.request(this._buildRequest('DELETE', path, null, csrf))
      .use(popsicle.plugins.parse('json'))
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  _getCsrfToken() {
    return popsicle.get(`${host}/rest/session/token`)
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  _buildRequest(method, path, body, csrf) {
    let requestObject = {
      method: method.toUpperCase(),
      url: baseUrl + path,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json'
      }
    };

    // If this request method supports a body, add it.
    if (body && ['POST', 'PATCH', 'PUT'].indexOf(method.toUpperCase()) >= 0) {
      requestObject.body = body;
    }

    // If a CSRF token was provided, add it.
    if (csrf && ['POST', 'PATCH', 'PUT', 'DELETE'].indexOf(method.toUpperCase()) >= 0) {
      requestObject.headers['X-CSRF-Token'] = csrf;
    }

    // If this is a token-based path, drop the authorization header (@todo better way to support this)
    if (path.indexOf('/token') !== -1) {
      delete requestObject.headers.Authorization;
    }

    return requestObject;
  }

  _handleError(err) {
    let message;

    // Handle errors from popsicle.
    switch (err.code) {
      case 'EPARSE':
        message = 'Problem parsing response body.';
        break;
    }

    // Handle HTTP errors.
    switch (err.status) {
      case 400:
        message = 'Bad request.';
        break;

      case 403:
        message = 'Access denied.';
        break;

      case 409:
        message = 'Conflict.';
        break;

      case 500:
        message = 'Server error.';
        break;

      default:
        message = err.statusText;
    }

    return Promise.reject(new Error(message));
  }

  _handleResponse(response) {
    if (response.status > 299) {
      return Promise.reject(response);
    }
    else {
      return Promise.resolve(response);
    }
  }

}

export default DrushIOBase;
