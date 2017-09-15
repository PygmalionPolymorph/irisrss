import m from 'mithril';
import scope from 'kaleido';

import { removeFeed } from '../../logic/feeds/remove';

export default function FeedListItem(vnode) {
  const { feed, index } = vnode.attrs;
  const feeds = scope(['feeds', 'list']);
  const selectedFeed = scope(['feeds', 'selected'], '');

  const isSelected = selectedFeed.get() === feed._id;

  const Actions = {
    selectFeed: () => {
      selectedFeed.set(feed);
    },
    removeFeed: () => {
      removeFeed(feeds)(feed).run();
    },
  };

  const heading = '.feed-item__title';
  const unread = '.feed-item__unread';
  const deleteButton = '.feed-item__delete';
  const feedListItem = `.feed-list__item.feed-item.feed-item--${index}${isSelected ? '.feed-item--selected' : ''}`;

  return {
    view() {
      return m(feedListItem, {
        onclick: Actions.selectFeed,
      }, [
        m(heading, feed.name),
        m(unread, feed.unreadCount),
        m(deleteButton, { onclick: Actions.removeFeed }, 'X'),
      ]);
    },
  };
}
