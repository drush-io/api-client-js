'use strict';

import DrushIORun from '../job/run/client';

let apiClient;

class DrushIORuns {

  constructor(client, project) {
    apiClient = client;
    this.project = project;
  }

  list(params = {}) {
    return new Promise((resolve, reject) => {
      apiClient.get(`/projects/${this.project.identifier}/runs`, params).then((response) => {
        resolve(response.body.map((run) => {
          return new DrushIORun(apiClient, this.project, null, run.id, run);
        }));
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

export default DrushIORuns;
