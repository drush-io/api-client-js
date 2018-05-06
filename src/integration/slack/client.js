'use strict';

let apiClient;

class DrushIOSlackIntegration {

  constructor(client, identifier, data = {}) {
    apiClient = client;
    this.identifier = identifier;
    this.data = data;
  }

  /**
   * De-authorizes this Slack Integration.
   *
   * @returns {Promise}
   */
  remove() {
    return new Promise((resolve, reject) => {
      apiClient.del(`/integrations/slack/${this.identifier}`).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

export default DrushIOSlackIntegration;
