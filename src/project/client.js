'use strict';

import RunsClient from './runs/client';
import MembersClient from './members/client';
import MemberClient from './member/client';
import JobsClient from './jobs/client';
import JobClient from './job/client';

let apiClient;

class DrushIOProject {

  constructor(client, identifier, data = {}) {
    apiClient = client;
    this.identifier = identifier;
    this.data = data;
  }

  /**
   * Retrieves project details for this project.
   * @return {Promise}
   */
  get() {
    return new Promise((resolve, reject) => {
      apiClient.get(`/projects/${this.identifier}`).then((response) => {
        this.data = response.body;
        resolve(this)
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
   * Updates this project's details.
   * @param {Object} details
   * @param {String} details.name
   * @param {String} details.label
   * @returns {Promise}
   */
  update(details) {
    return new Promise((resolve, reject) => {
      apiClient.patch(`/projects/${this.identifier}`, details).then((response) => {
        this.data = response.body;
        resolve(this);
      }).catch((err) => {
        reject(err);
      })
    });
  }

  jobs(identifier) {
    if (identifier) {
      return new JobClient(apiClient, this, identifier);
    }
    else {
      return new JobsClient(apiClient, this);
    }
  }

  members(identifier) {
    if (identifier) {
      return new MemberClient(apiClient, this, identifier);
    }
    else {
      return new MembersClient(apiClient, this);
    }
  }

  runs() {
    return new RunsClient(apiClient, this);
  }

}

export default DrushIOProject;
