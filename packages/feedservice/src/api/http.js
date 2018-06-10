const { compose } = require('ramda');
const { fromPromised } = require('folktale/concurrency/task');

const applyCorsProxy = require('./cors');

const httpGet = compose(
  fromPromised(url => window.fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
    },
  })),
  applyCorsProxy,
);

const getText = compose(
  res => res.chain(fromPromised(body => body.text())),
  httpGet,
);

module.exports = { httpGet, getText };

