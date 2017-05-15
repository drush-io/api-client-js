'use strict';

let apiClient;

class DrushIOAccount {

  constructor(client, data = {}) {
    apiClient = client;
    this.data = data;
  }

  /**
   * Retrieves account details for the currently authenticated user.
   * @return Promise
   */
  get() {
    return new Promise((resolve, reject) => {
      apiClient.get('/account').then((response) => {
        this.data = response.body;
        resolve(this)
      }).catch((err) => {
        reject(err);
      });
    });
  }

  update(details) {
    return new Promise((resolve, reject) => {
      apiClient.patch('/account', details).then((response) => {
        this.data = response.body;
        resolve(this)
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

export default DrushIOAccount;
