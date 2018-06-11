const { assoc, compose, length, filter, anyPass, propEq, complement, has } = require('ramda');

const { entriesForFeed } = require('../entries');

// [Entry] -> [Entry]
const onlyUnread = filter(anyPass([propEq('read', false), complement(has('read'))]));

// [Entry] -> Int
const unreadCount = compose(length, onlyUnread);

// Feed -> Task Feed
const addUnreadCount = feed => entriesForFeed(feed)
  .map(unreadCount)
  .map(c => assoc('unreadCount', c, feed));

module.exports = { addUnreadCount, onlyUnread };

