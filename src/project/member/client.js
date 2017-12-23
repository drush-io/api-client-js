'use strict';

let apiClient;

class DrushIOMember {

  constructor(client, project, identifier, data = {}) {
    apiClient = client;
    this.identifier = identifier;
    this.project = project;
    this.data = data;
  }

  /**
   * Updates the given membership with the provided details.
   *
   * @param {Object} details
   * @param {Object} details.role
   * @param {String} details.role.type
   *
   * @returns {Promise}
   */
  update(details) {
    return new Promise((resolve, reject) => {
      apiClient.patch(`/projects/${this.project.identifier}/members/${this.identifier}`, details).then((response) => {
        this.data = response.body;
        resolve(this);
      }).catch((err) => {
        reject(err);
      })
    });
  }

  remove() {
    return new Promise((resolve, reject) => {
      apiClient.del(`/projects/${this.project.identifier}/members/${this.identifier}`).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      })
    });
  }

  /**
   * Re-sends the invitation for the given membership.
   */
  invite() {
    return new Promise((resolve, reject) => {
      apiClient.post(`/projects/${this.project.identifier}/members/${this.identifier}/invite`).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      })
    });
  }

}

export default DrushIOMember;
