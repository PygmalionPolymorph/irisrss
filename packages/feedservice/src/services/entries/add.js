const { fromPromised } = require('folktale/concurrency/task');
const { compose, map, merge, pathOr } = require('ramda');

const db = require('../../api/pouchdb');
const { forceId, dateId } = require('../ids');

const transformEntry = entry => ({
  title: pathOr(entry.title, ['TITLE', 0], entry),
  content: pathOr(pathOr(entry.description, ['DESCRIPTION', 0], entry), ['CONTENT:ENCODED', 0], entry),
  pubDate: pathOr(pathOr(entry.pubDate, ['PUBDATE', 0], entry), ['PUBLISHED', 0], entry),
  link: pathOr(pathOr(entry.link, ['LINK', 0], entry), ['LINK', 0, '$', 'HREF'], entry),
  read: entry.read || false,
});

// String -> [Entry] -> Task [PouchDBResult]
const addEntries = feedName => fromPromised(compose(
  entries => db.entries.bulkDocs(entries),
  map(forceId(dateId)),
  map(merge({ feed: feedName })),
  map(transformEntry),
));

module.exports = { addEntries };

