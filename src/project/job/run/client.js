'use strict';

import JobClient from '../client';

let apiClient;

class DrushIORun {

  constructor(client, project, job, identifier, data = {}) {
    apiClient = client;
    this.project = project;
    this.job = job || new JobClient(client, project, data.job.id);
    this.identifier = identifier;
    this.data = data;
  }

  /**
   * Retrieves run details for this job run.
   * @return {Promise}
   */
  get() {
    return new Promise((resolve, reject) => {
      apiClient.get(`/projects/${this.project.identifier}/${this.job.identifier}/run/${this.identifier}`).then((response) => {
        this.data = response.body;
        resolve(this)
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

export default DrushIORun;
