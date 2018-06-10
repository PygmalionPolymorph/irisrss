const { task } = require('folktale/concurrency/task');
const db = require('../../api/pouchdb');

const removeFeedFromState = feeds => feed => feeds.set(feeds.get().filter(f => f._id !== feed._id));

const removeFeedFromDb = feed => task((resolver) => {
  db.feeds.get(feed._id)
    .then(updated => db.feeds.remove(updated._id, updated._rev))
    .then(resolver.resolve)
    .catch(resolver.reject);
});

const removeFeed = feeds => feed => removeFeedFromDb(feed)
  .map(() => removeFeedFromState(feeds)(feed));

module.exports = { removeFeed };

