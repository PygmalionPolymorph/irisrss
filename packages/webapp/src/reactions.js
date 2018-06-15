import scope from 'kaleido';
import { of } from 'folktale/concurrency/task';
import { ifElse, assoc, last, identity, o, isNil } from 'ramda';

import { feeds, entries, readState } from 'irisrss-feedservice';

const { addUnreadCount, onlyUnread } = readState;
const { findFeed, updateAllFeedEntries, updateFeedEntries, updateFeed } = feeds;
const { findEntry, findAllEntries, extractEntries, filterByFeed, updateEntry } = entries;

const unreadCount = (feed) => {
  const scopeFeeds = scope(['feeds', 'list']);

  if (feed) {
    addUnreadCount(feed)
      .chain(updateFeed(scopeFeeds))
      .run();
  }
};

const updateEntryList = (feed) => {
  const scopeEntries = scope(['entries', 'list']);
  const selectedFeed = scope(['feeds', 'selected']);
  const showOnlyUnread = scope(['filters', 'onlyUnread']);

  const selected = feed || selectedFeed.get();

  const start = selected && feed ? updateFeedEntries(feed) : of(true);

  start
    .chain(findAllEntries)
    .map(extractEntries)
    .map(es => selected ? filterByFeed(selected)(es) : es)
    .map(ifElse(showOnlyUnread.get, onlyUnread, identity))
    .map(scopeEntries.set)
    .run();
};

const markAsRead = (entry) => {
  const scopeEntries = scope(['entries', 'list']);
  const scopeFeeds = scope(['feeds', 'list']);

  findEntry(entry)
    .chain(e => (
      updateEntry(scopeEntries)(assoc('read', true, e))
        .and(findFeed(e.feed))
    ))
    .map(last)
    .chain(addUnreadCount)
    .chain(updateFeed(scopeFeeds))
    .run();
};

export const bind = () => {
  const selectedFeed = scope(['feeds', 'selected']);
  const selectedEntry = scope(['entries', 'selected']);
  const showOnlyUnread = scope(['filters', 'onlyUnread'], '');

  showOnlyUnread.$.map(updateEntryList);
  selectedFeed.$.map(updateEntryList);
  selectedFeed.$.map(unreadCount);
  selectedEntry.$.map(markAsRead);
};

