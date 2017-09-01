import { map, assoc, traverse } from 'ramda';
import { fromPromised, task, of } from 'folktale/concurrency/task';
import db from '../../api/pouchdb';

import { entriesForFeed } from './find';

export const updateDBEntry = fromPromised(entry => db.entries.put(entry));
export const updateCurrentEntry = entries => entry => task((resolver) => {
  const updated = entries.get().map(x => (x._id === entry._id ? entry : x));
  entries.set(updated);
  resolver.resolve(updated);
});

// Scope [Entry] -> Entry -> Task [PouchDBResult [Entry]]
export const updateEntry = entries => entry => (
  updateDBEntry(entry).and(updateCurrentEntry(entries)(entry)));

export const markAllAsRead = entries => feedName => entriesForFeed(feedName)
  .map(map(assoc('read', true)))
  .chain(traverse(of, updateEntry(entries)));

