import m from 'mithril';
import scope from 'kaleido';

import { removeFeed } from '../../logic/feeds';

export default function FeedListItem(vnode) {
  const { feed, index } = vnode.attrs;
  const selectedFeed = scope(['feeds', 'selected'], '');

  const isSelected = selectedFeed.get() === feed._id;

  const Actions = {
    removeFeed: () => {
      removeFeed(feed);
    },
    selectFeed: () => {
      selectedFeed.set(feed);
    },
  };

  const heading = '.feed-item__title';
  const unread = '.feed-item__unread';
  const deleteButton = '.feed-item__delete';
  const feedListItem = `.feed-list__item.feed-item.feed-item--${index}${isSelected ? '.feed-item--selected' : ''}`;

  return {
    view(vnode) {
      const { feed } = vnode.attrs;

      return m(feedListItem, [
        m(heading, {
          onclick: Actions.selectFeed,
        }, feed.name),
        m(unread, feed.unreadCount),
        m(deleteButton, {
          onclick: Actions.removeFeed,
        }, 'X'),
      ]);
    },
  };
}
