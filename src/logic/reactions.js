import scope from 'kaleido';
import { of } from 'folktale/concurrency/task';
import { ifElse, assoc, last, identity } from 'ramda';

import { addUnreadCount, onlyUnread } from './readState';
import { findFeed } from './feeds/find';
import { updateAllFeedEntries, updateFeedEntries, updateFeed } from './feeds/update';
import { findEntry, findAllEntries, extractEntries, filterByFeed } from './entries/find';
import { updateEntry } from './entries/update';

const unreadCount = (feed) => {
  const feeds = scope(['feeds', 'list']);

  if (feed) {
    addUnreadCount(feed)
      .chain(updateFeed(feeds))
      .run();
  }
};

const updateEntryList = (feed) => {
  const entries = scope(['entries', 'list']);
  const selectedFeed = scope(['feeds', 'selected']);
  const showOnlyUnread = scope(['filters', 'onlyUnread']);

  const selected = feed || selectedFeed.get();

  const start = selected && feed ? updateFeedEntries(feed) : of(true);

  start
    .chain(findAllEntries)
    .map(extractEntries)
    .map(es => (selected ? filterByFeed(selected)(es) : es))
    .map(ifElse(showOnlyUnread.get, onlyUnread, identity))
    .map(entries.set)
    .run();
};

const markAsRead = (entry) => {
  const entries = scope(['entries', 'list']);
  const feeds = scope(['feeds', 'list']);

  findEntry(entry)
    .chain(e => (
      updateEntry(entries)(assoc('read', true, e))
        .and(findFeed(e.feed))))
    .map(last)
    .chain(addUnreadCount)
    .chain(updateFeed(feeds))
    .run();
};

export const bind = () => {
  const selectedFeed = scope(['feeds', 'selected']);
  const selectedEntry = scope(['entries', 'selected']);
  const showOnlyUnread = scope(['filters', 'onlyUnread'], '');

  showOnlyUnread.$.map(() => updateEntryList());
  selectedFeed.$.map(updateEntryList);
  selectedFeed.$.map(unreadCount);
  selectedEntry.$.map(markAsRead);
};

export const init = () => {
  updateAllFeedEntries()
    .map(tasks => tasks.map(task => task.run()))
    .run();
};
