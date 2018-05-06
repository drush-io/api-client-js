'use strict';

import DrushIOClient from '../../src/drush-io-client';
import AccountClient from '../../src/account/client';
import ApiTokenClient from '../../src/token/client';
import ApiTokensClient from '../../src/tokens/client';
import CredentialClient from '../../src/credential/client';
import CredentialsClient from '../../src/credentials/client';
import ProjectClient from '../../src/project/client';
import ProjectsClient from '../../src/projects/client';
import SlackIntegrationClient from '../../src/integration/slack/client';
import SlackIntegrationsClient from '../../src/integrations/slack/client';

describe('drush.io', () => {

  describe('API Client', () => {
    let client = new DrushIOClient();

    it('returns account client', () => {
      expect(client.account()).to.be.instanceOf(AccountClient);
    });

    it('returns token client', () => {
      expect(client.apiTokens()).to.be.instanceOf(ApiTokensClient);
    });

    it('returns token client (with identifier)', () => {
      let id = 'some-identifier',
          fixture = client.apiTokens(id);

      expect(fixture).to.be.instanceOf(ApiTokenClient);
      expect(fixture.identifier).to.equal(id);
    });

    it('returns credential client', () => {
      expect(client.credentials()).to.be.instanceOf(CredentialsClient);
    });

    it('returns credential client (with identifier)', () => {
      let id = 'some-identifier',
          fixture = client.credentials(id);

      expect(fixture).to.be.instanceOf(CredentialClient);
      expect(fixture.identifier).to.equal(id);
    });

    it('returns project client', () => {
      expect(client.projects()).to.be.instanceOf(ProjectsClient);
    });

    it('returns project client (with identifier)', () => {
      let id = 'some-identifier',
          fixture = client.projects(id);

      expect(fixture).to.be.instanceOf(ProjectClient);
      expect(fixture.identifier).to.equal(id);
    });

    it('returns slack integration client', () => {
      expect(client.integrations('slack')).to.be.instanceOf(SlackIntegrationsClient);
    });

    it('returns slack integration client (with identifier)', () => {
      let id = 1,
          fixture = client.integrations('slack', id);

      expect(fixture).to.be.instanceOf(SlackIntegrationClient);
      expect(fixture.identifier).to.equal(id);
    });

    it('throws an error for unknown integrations', () => {
      let integration = 'fakeService',
          fixture = client.integrations.bind(null, integration);

      expect(fixture).to.throw(Error, `Unknown integration ${integration}`);
    });

  });

});
