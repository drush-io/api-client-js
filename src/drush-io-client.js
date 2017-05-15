'use strict';

import ClientBase from './drush-io-client-base';
import AccountClient from './account/client';
import ApiTokenClient from './token/client';
import ApiTokensClient from './tokens/client';
import CredentialClient from './credential/client';
import CredentialsClient from './credentials/client';
import ProjectClient from './project/client';
import ProjectsClient from './projects/client';

class DrushIO extends ClientBase {

  /**
   * Instantiates a new drush.io API client.
   *
   * @param {String} token
   * @param {Object} options
   * @param {String} options.version
   * @param {String} options.host
   * @param {String} options.path
   */
  constructor(token, options = {}) {
    const version = options.version || 'v1',
          host = options.host || 'https://api.drush.io',
          basePath = options.basePath || '';

    super(token, host, basePath + '/', version);
  }

  /**
   * Returns a drush.io account API client.
   * @returns {DrushIOAccount}
   */
  account() {
    return new AccountClient(this);
  }

  /**
   * Returns a drush.io API token API client.
   *
   * Note: for security reasons, API tokens cannot be managed through the API,
   * you must be authenticated in the browser to use this client.
   *
   * @param {String} identifier
   * @returns {DrushIOApiToken|DrushIOApiTokens}
   */
  apiTokens(identifier) {
    if (identifier) {
      return new ApiTokenClient(this, identifier);
    }
    else {
      return new ApiTokensClient(this);
    }
  }

  /**
   * Returns a drush.io credential API client.
   * @param {String} identifier
   * @returns {DrushIOCredential|DrushIOCredentials}
   */
  credentials(identifier) {
    if (identifier) {
      return new CredentialClient(this, identifier);
    }
    else {
      return new CredentialsClient(this);
    }
  }

  /**
   * Returns a drush.io project API client.
   *
   * @param {String} identifier
   * @returns {DrushIOProject|DrushIOProjects}
   */
  projects(identifier) {
    if (identifier) {
      return new ProjectClient(this, identifier);
    }
    else {
      return new ProjectsClient(this);
    }
  }

}

export default DrushIO;
