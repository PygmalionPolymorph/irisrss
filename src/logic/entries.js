import { fromPromised, task } from 'folktale/concurrency/task';
import { path, compose, merge, map, filter, propEq, prop, anyPass, complement, has, length } from 'ramda';

import db from '../api/pouchdb';
import { dateId, forceId } from './ids';

export const updateDBEntry = fromPromised(entry => db.entries.put(entry));
export const updateCurrentEntry = entries => entry => task((resolver) => {
  const updated = entries.get().map(x => (x._id === entry._id ? entry : x));
  entries.set(updated);
  resolver.resolve(updated);
});

// Scope [Entry] -> Entry -> Task [PouchDBResult [Entry]]
export const updateEntry = entries => entry => (
  updateDBEntry(entry).and(updateCurrentEntry(entries)(entry)));

// String -> Task PouchDBResult
export const findAllEntries = fromPromised(() => (
  db.entries.allDocs({ include_docs: true, descending: true })));

export const findEntry = fromPromised(id => db.entries.get(id));

// PouchDBResult -> [Entry]
export const extractEntries = compose(map(prop('doc')), prop('rows'));

// String -> [Entry] -> [Entry]
export const filterByFeed = feedName => filter(propEq('feed', feedName));

// [Entry] -> [Entry]
export const onlyUnread = filter(anyPass([propEq('read', false), complement(has('read'))]));

// [Entry] -> Int
export const unreadCount = compose(length, onlyUnread);


// String -> [Entry] -> Task [PouchDBResult]
export const addEntries = feedName => fromPromised(compose(
  entries => db.entries.bulkDocs(entries),
  map(forceId(dateId)),
  map(merge({ feed: feedName })),
  path(['feed', 'entries']),
));
