'use strict';

import DrushIOProject from '../project/client';

let apiClient;

class DrushIOProjects {

  constructor(client, data = {}) {
    apiClient = client;
    this.data = data;
  }

  /**
   * Creates a project, administered by the currently authenticated user.
   *
   * @param {Object} details
   * @param {String} details.name
   * @param {String} details.label
   * @returns {Promise}
   */
  create(details) {
    return new Promise((resolve, reject) => {
      apiClient.post('/projects', details).then((response) => {
        resolve(new DrushIOProject(apiClient, response.body.id, response.body));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  list(params = {}) {
    return new Promise((resolve, reject) => {
      apiClient.get('/projects').then((response) => {
        resolve(response.body.map((project) => {
          return new DrushIOProject(apiClient, project.id, project);
        }));
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

export default DrushIOProjects;
