import scope from 'kaleido';
import { ifElse, assoc, last, identity } from 'ramda';

import { updateUnreadCount, findFeed } from './feeds';
import { findEntry, updateEntry, onlyUnread, findAllEntries, extractEntries, filterByFeed } from './entries';

const unreadCount = (feed) => {
  const feeds = scope(['feeds', 'list']);

  updateUnreadCount(feeds)(feed)
    .run();
};

const updateEntryList = (feed) => {
  const entries = scope(['entries', 'list']);
  const selectedFeed = scope(['feeds', 'selected']);
  const showOnlyUnread = scope(['filters', 'onlyUnread']);

  const selected = (feed && feed.name) || (selectedFeed.get() && selectedFeed.get().name);

  findAllEntries()
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
    .chain(updateUnreadCount(feeds))
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

