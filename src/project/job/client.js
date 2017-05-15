'use strict';

import DrushIORun from './run/client';
import DrushIORuns from './runs/client';

let apiClient;

class DrushIOJob {

  constructor(client, project, identifier, data = {}) {
    apiClient = client;
    this.project = project;
    this.identifier = identifier;
    this.data = data;
  }

  get() {
    return new Promise((resolve, reject) => {
      apiClient.get(`/projects/${this.project.identifier}/jobs/${this.identifier}`).then((response) => {
        this.data = response.body;
        resolve(this);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  update(details) {
    return new Promise((resolve, reject) => {
      apiClient.patch(`/projects/${this.project.identifier}/jobs/${this.identifier}`, details).then((response) => {
        this.data = response.body;
        resolve(this);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  remove() {
    return new Promise((resolve, reject) => {
      apiClient.del(`/projects/${this.project.identifier}/jobs/${this.identifier}`).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  runs(identifier) {
    if (identifier) {
      return new DrushIORun(apiClient, this.project, this, identifier);
    }
    else {
      return new DrushIORuns(apiClient, this.project, this);
    }
  }

}


export default DrushIOJob;
