const { compose } = require('ramda');
const { rejected, fromPromised } = require('folktale/concurrency/task');

const applyCorsProxy = require('./cors');

const httpGet = compose(
  fromPromised(url => fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
      'X-Requested-With': ''
    },
  })),
  applyCorsProxy,
);

const getText = compose(
  res => res.chain(fromPromised(body => body.text())),
  httpGet,
);

module.exports = { httpGet, getText };

