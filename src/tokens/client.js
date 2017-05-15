'use strict';

import DrushIOApiToken from '../token/client';

let apiClient;

class DrushIOApiTokens {

  constructor(client, data = {}) {
    apiClient = client;
    this.data = data;
  }

  /**
   * Creates an API token for the currently authenticated user.
   *
   * @param {Object} details
   * @param {Object} details.name
   * @returns {Promise}
   */
  create(details) {
    return new Promise((resolve, reject) => {
      // First, retrieve a CSRF token.
      apiClient._getCsrfToken().then((response) => {
        return apiClient.post('/tokens', details, response.body);
      }).then((response) => {
        resolve(new DrushIOApiToken(apiClient, response.body.id, response.body));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  list(params = {}) {
    return new Promise((resolve, reject) => {
      apiClient.get('/tokens?_format=json').then((response) => {
        resolve(response.body.map((token) => {
          return new DrushIOApiToken(apiClient, token.id, token);
        }));
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

export default DrushIOApiTokens;
