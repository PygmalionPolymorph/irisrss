import { task, fromPromised } from 'folktale/concurrency/task';
import { map, prop, compose, assoc } from 'ramda';

import db from '../api/pouchdb';
import fetchFeed from '../api/rss';
import { forceId, nameId } from './ids';
import { addEntries, extractEntries, filterByFeed, findAllEntries, unreadCount } from './entries';

// Feed -> Task(PouchDBResult)
export const addFeed = fromPromised(compose(feed => db.feeds.put(feed), forceId(nameId)));

export const removeFeed = db.feeds.remove;

// _ -> Task([Feed])
export const findAllFeeds = () => fromPromised(() => db.feeds.allDocs({ include_docs: true }))()
  .map(prop('rows'))
  .map(map(prop('doc')));

export const findFeed = fromPromised(id => db.feeds.get(id));

// Feed -> Task([PouchDBResult])
export const updateFeedEntries = feed => fetchFeed(feed).chain(addEntries(feed.name));

// Feed -> Task([PouchDBResult])
export const updateDBFeed = fromPromised(feed => db.feeds.put(feed));

export const updateCurrentFeed = feeds => feed => task((resolver) => {
  const updated = feeds.get().map(x => (x._id === feed._id ? feed : x));
  feeds.set(updated);
  resolver.resolve(updated);
});

// Scope [Feed] -> Feed -> Task [PouchDBResult [Feed]]
export const updateFeed = feeds => feed => (
  updateDBFeed(feed).and(updateCurrentFeed(feeds)(feed)));

// Scope -> Feed -> Task([PouchDBResult])
export const updateUnreadCount = feeds => feed => findAllEntries()
  .map(extractEntries)
  .map(filterByFeed(feed.name))
  .map(unreadCount)
  .map(c => assoc('unreadCount', c, feed))
  .chain(updateFeed(feeds));

