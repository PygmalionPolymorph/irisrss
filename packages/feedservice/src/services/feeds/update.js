const { waitAll, fromPromised, task, of } = require('folktale/concurrency/task');
const { map, head, groupBy, prop, values, traverse } = require('ramda');

const fetchFeed = require('../../api/rss');
const db = require('../../api/pouchdb');

const { addEntries } = require('../entries');
const { findAllFeeds } = require('./find');
const { addUnreadCount } = require('../readState');


// Feed -> Task [PouchDBResult]
const updateFeedEntries = feed => console.log(feed) || fetchFeed(feed).chain(addEntries(feed.name));

// _ -> Task [PouchDBResult]
const updateAllFeedEntries = () => findAllFeeds()
  .map(map(updateFeedEntries))
  .map(tasks => tasks.map(task => task.run()));

// Feed -> Task PouchDBResult
const updateDBFeed = fromPromised(feed => db.feeds.put(feed));

// Scope [Feed] -> Feed -> Task
const updateCurrentFeed = feeds => feed => task((resolver) => {
  const current = map(head, groupBy(prop('_id'), feeds.get()));
  const updated = current;
  updated[feed._id] = Object.assign(current[feed._id] || {}, feed);
  const out = values(updated);

  feeds.set(out);
  resolver.resolve(out);
});

// Scope [Feed] -> Feed -> Task [PouchDBResult [Feed]]
const updateFeed = feeds => feed => (
  updateDBFeed(feed).and(updateCurrentFeed(feeds)(feed)));

// Scope Feeds -> Task [Feed]
const refreshFeeds = feeds => (
  findAllFeeds()
    .map((fs) => { feeds.set(fs); return fs; })
    .chain(traverse(of, addUnreadCount))
    .chain(traverse(of, updateFeed(feeds))));

module.exports = { updateFeedEntries, updateAllFeedEntries, updateFeed, refreshFeeds };

