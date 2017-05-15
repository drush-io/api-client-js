# drush.io API Client (JavaScript)

A JavaScript API client for drush.io. Client-side and server-side compatible.

[![Travis build status](http://img.shields.io/travis/drush-io/api-client-js.svg?style=flat)](https://travis-ci.org/drush-io/api-client-js)
[![Code Climate](https://codeclimate.com/github/drush-io/api-client-js/badges/gpa.svg)](https://codeclimate.com/github/drush-io/api-client-js)
[![Test Coverage](https://codeclimate.com/github/drush-io/api-client-js/badges/coverage.svg)](https://codeclimate.com/github/drush-io/api-client-js)
[![Dependency Status](https://david-dm.org/drush-io/api-client-js.svg)](https://david-dm.org/drush-io/api-client-js)
[![devDependency Status](https://david-dm.org/drush-io/api-client-js/dev-status.svg)](https://david-dm.org/drush-io/api-client-js#info=devDependencies)

## Installation
`npm install @drush-io/api-client --save`

## Usage

```javascript
// Instantiate the API client using an API token from an environment variable.
var DrushIOClient = require('@drush-io/api-client'),
    client = new DrushIOClient(process.env.DRUSHIO_API_TOKEN);

// Queue a run of the "backup-prod" job on the "my-corp" project.
var runQueued = client.projects('my-corp').jobs('backup-prod').runs().create();

// All actions return promises--you can react to them like this.
runQueued.then(function onceQueued(run) {
  console.log(run);
});
```
