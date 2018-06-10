const { map, assoc, traverse } = require('ramda');
const { fromPromised, task, of } = require('folktale/concurrency/task');

const db = require('../../api/pouchdb');

const { entriesForFeed } = require('./find');

const updateDBEntry = fromPromised(entry => db.entries.put(entry));
const updateCurrentEntry = entries => entry => task((resolver) => {
  const updated = entries.get().map(x => (x._id === entry._id ? entry : x));
  entries.set(updated);
  resolver.resolve(updated);
});

// Scope [Entry] -> Entry -> Task [PouchDBResult [Entry]]
const updateEntry = entries => entry => (
  updateDBEntry(entry).and(updateCurrentEntry(entries)(entry)));

const markAllAsRead = entries => feedName => entriesForFeed(feedName)
  .map(map(assoc('read', true)))
  .chain(traverse(of, updateEntry(entries)));

module.exports = { updateEntry, markAllAsRead };

