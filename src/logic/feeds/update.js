import { fromPromised, task, of } from 'folktale/concurrency/task';
import { map, head, groupBy, prop, values, traverse } from 'ramda';

import fetchFeed from '../../api/rss';
import db from '../../api/pouchdb';

import { addEntries } from '../entries/add';
import { findAllFeeds } from './find';
import { addUnreadCount } from '../readState';


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

// Scope Feeds -> Task [Feed]
export const refreshFeeds = feeds => (
  findAllFeeds()
    .map((fs) => { feeds.set(fs); return fs; })
    .chain(traverse(of, addUnreadCount))
    .chain(traverse(of, updateFeed(feeds))));
