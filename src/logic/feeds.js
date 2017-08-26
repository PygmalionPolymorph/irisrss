import { task, fromPromised, of } from 'folktale/concurrency/task';
import { map, prop, compose, assoc, groupBy, values, head, traverse } from 'ramda';

import db from '../api/pouchdb';
import fetchFeed from '../api/rss';
import { forceId, nameId } from './ids';
import { addEntries, extractEntries, filterByFeed, findAllEntries, unreadCount } from './entries';

// Feed -> Task PouchDBResult
export const addFeed = fromPromised(compose(feed => db.feeds.put(feed), forceId(nameId)));

export const removeFeed = db.feeds.remove;

// _ -> Task [Feed]
export const findAllFeeds = () => fromPromised(() => db.feeds.allDocs({ include_docs: true }))()
  .map(prop('rows'))
  .map(map(prop('doc')));

// String -> Task Feed
export const findFeed = fromPromised(id => db.feeds.get(id));

// Feed -> Task [PouchDBResult]
export const updateFeedEntries = feed => fetchFeed(feed).chain(addEntries(feed.name));

// _ -> Task [PouchDBResult]
export const updateAllFeedEntries = () => findAllFeeds().map(map(updateFeedEntries));

// Feed -> Task PouchDBResult
export const updateDBFeed = fromPromised(feed => db.feeds.put(feed));

// Scope [Feed] -> Feed -> Task
export const updateCurrentFeed = feeds => feed => task((resolver) => {
  const current = map(head, groupBy(prop('_id'), feeds.get()));
  const updated = current;
  updated[feed._id] = Object.assign(current[feed._id] || {}, feed);
  const out = values(updated);

  feeds.set(out);
  resolver.resolve(out);
});

// Scope [Feed] -> Feed -> Task [PouchDBResult [Feed]]
export const updateFeed = feeds => feed => (
  updateDBFeed(feed).and(updateCurrentFeed(feeds)(feed)));

// Feed -> Task Feed
export const addUnreadCount = feed => findAllEntries()
  .map(extractEntries)
  .map(filterByFeed(feed.name))
  .map(unreadCount)
  .map(c => assoc('unreadCount', c, feed));

// Scope Feeds -> Task [Feed]
export const refreshFeeds = feeds => (
  findAllFeeds()
    .map((fs) => { feeds.set(fs); return fs; })
    .chain(traverse(of, addUnreadCount))
    .chain(traverse(of, updateFeed(feeds))));
