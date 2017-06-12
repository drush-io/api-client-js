'use strict';

import DrushIORun from '../run/client';

let apiClient;

class DrushIORuns {

  constructor(client, project, job) {
    apiClient = client;
    this.project = project;
    this.job = job;
  }

  create(params = {}, wait = false) {
    return new Promise((resolve, reject) => {
      apiClient.post(`/projects/${this.project.identifier}/jobs/${this.job.identifier}/runs`, params).then((response) => {
        let intervalTimer;

        if (wait) {
          intervalTimer = setInterval(() => {
            apiClient.get(`/projects/${this.project.identifier}/jobs/${this.job.identifier}/runs/${response.body.id}`).then((res) => {
              if (['error', 'complete'].indexOf(res.body.status) >= 0) {
                clearInterval(intervalTimer);
                resolve(new DrushIORun(apiClient, this.project, this.job, res.body.id, res.body))
              }
            }).catch((err) => {
              clearInterval(intervalTimer);
              reject(err);
            });
          }, 5000);
        }
        else {
          resolve(new DrushIORun(apiClient, this.project, this.job, response.body.id, response.body));
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

export default DrushIORuns;
