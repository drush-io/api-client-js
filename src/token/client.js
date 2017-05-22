'use strict';

let apiClient;

class DrushIOApiToken {

  constructor(client, identifier, data = {}) {
    apiClient = client;
    this.identifier = identifier;
    this.data = data;
  }

  revoke() {
    return new Promise((resolve, reject) => {
      // First, retrieve a CSRF token.
      apiClient._getCsrfToken().then((response) => {
        return apiClient.del(`/tokens/${this.identifier}`, response.body);
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export default DrushIOApiToken;
