const { fromPromised } = require('folktale/concurrency/task');
const { prop, map } = require('ramda');
const db = require('../../api/pouchdb');

// _ -> Task [Feed]
const findAllFeeds = () => fromPromised(() => db.feeds.allDocs({ include_docs: true }))()
  .map(prop('rows'))
  .map(map(prop('doc')));

// String -> Task Feed
const findFeed = id => fromPromised(() => db.feeds.get(id))();

module.exports = { findAllFeeds, findFeed };

