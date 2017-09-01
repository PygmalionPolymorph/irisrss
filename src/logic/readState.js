import { assoc, compose, length, filter, anyPass, propEq, complement, has } from 'ramda';

import { extractEntries, findAllEntries, filterByFeed } from './entries/find';

// [Entry] -> [Entry]
export const onlyUnread = filter(anyPass([propEq('read', false), complement(has('read'))]));

// [Entry] -> Int
export const unreadCount = compose(length, onlyUnread);

// Feed -> Task Feed
export const addUnreadCount = feed => findAllEntries()
  .map(extractEntries)
  .map(filterByFeed(feed))
  .map(unreadCount)
  .map(c => assoc('unreadCount', c, feed));

