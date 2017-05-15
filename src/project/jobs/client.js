'use strict';

import DrushIOJob from '../job/client';

let apiClient;

class DrushIOJobs {

  constructor(client, project) {
    apiClient = client;
    this.project = project;
  }

  /**
   * Creates a new drush.io job on the given project.
   *
   * @param {Object} details
   * @param {String} details.label
   * @param {String} details.name
   * @param {Object} details.commands
   * @param {String} details.rawCommands
   *
   * @returns {Promise}
   */
  create(details) {
    return new Promise((resolve, reject) => {
      apiClient.post(`/projects/${this.project.identifier}/jobs`, details).then((response) => {
        resolve(new DrushIOJob(apiClient, this.project, response.body.id, response.body));
      }).catch((err) => {
        reject(err);
      });
    });
  }

  list(params = {}) {
    return new Promise((resolve, reject) => {
      apiClient.get(`/projects/${this.project.identifier}/jobs`).then((response) => {
        resolve(response.body.map((job) => {
          return new DrushIOJob(apiClient, this.project, job.id, job);
        }));
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

export default DrushIOJobs;
