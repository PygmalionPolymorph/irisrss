const { task, fromPromised } = require('folktale/concurrency/task');
const { compose } = require('ramda');

const { forceId, nameId } = require('../ids');
const db = require('../../api/pouchdb');

const feedburnerFormat = (feed) => {
  if (feed.url.match(/feedburner/)) {
    return Object.assign({}, feed, { url: `${feed.url.split('?')[0]}?format=xml` });
  }
  return feed;
};

const addFeedToDb = feed => fromPromised(f => db.feeds.put(f))(feed);
const addFeedToState = feeds => feed => feeds.set(feeds.get().concat([feed]));

const prepareFeedForSaving = compose(feedburnerFormat, forceId(nameId));

// State Feed -> Feed -> Task PouchDBResult
const addFeed = feeds => feed => compose(addFeedToDb, prepareFeedForSaving)(feed)
  .map(() => addFeedToState(feeds)(feed));

module.exports = { addFeed };

