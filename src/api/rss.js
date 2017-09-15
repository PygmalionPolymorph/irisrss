import { parseString } from 'xml2js';
import { pathOr } from 'ramda';
import { task } from 'folktale/concurrency/task';
import { getText } from './http';

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

export default fetchFeed;
