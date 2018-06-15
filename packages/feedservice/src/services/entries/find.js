const { fromPromised } = require('folktale/concurrency/task');
const { compose, map, filter, propEq, prop } = require('ramda');

const db = require('../../api/pouchdb');

// String -> Task PouchDBResult [Entry]
const findAllEntries = fromPromised(() => db.entries.allDocs({
  include_docs: true,
  descending: true,
}));

// Id -> Task PouchDBResult Entry
const findEntry = fromPromised(id => db.entries.get(id));

// PouchDBResult -> [Entry]
const extractEntries = compose(map(prop('doc')), prop('rows'));

// Feed -> [Entry] -> [Entry]
const filterByFeed = feed => filter(propEq('feed', feed.name));

// Feed -> [Entry]
const entriesForFeed = feed => findAllEntries()
  .map(extractEntries)
  .map(filterByFeed(feed));

module.exports = { extractEntries, filterByFeed, findAllEntries, findEntry, entriesForFeed };

