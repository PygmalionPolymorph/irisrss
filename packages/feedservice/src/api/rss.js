const { parseString } = require('xml2js');
const { pathOr } = require('ramda');
const { task } = require('folktale/concurrency/task');
const { getText } = require('./http');

const extractFeedEntries = data => pathOr([], ['FEED', 'ENTRY'], data)
  .concat(pathOr([], ['RSS', 'CHANNEL', 0, 'ITEM'], data));

const parseXML = xml => task((resolver) => {
  parseString(xml, { strict: false }, (err, result) => {
    if (err) resolver.reject(err);
    resolver.resolve(result);
  });
});

// Feed -> Task([Entry])
const fetchFeed = feed => getText(feed.url)
  .chain(parseXML)
  .map(extractFeedEntries);

module.exports = fetchFeed;
