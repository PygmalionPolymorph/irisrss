import m from 'mithril';
import scope from 'kaleido';

import { removeFeed } from '../../logic/feeds/remove';

import ConfirmBox from '../components/confirmBox';

export default function FeedListItem(vnode) {
  const { feed, index } = vnode.attrs;
  const feeds = scope(['feeds', 'list']);
  const selectedFeed = scope(['feeds', 'selected'], '');
  const showRemoveFeed = scope(['modal', 'removeFeed', feed.name], false);

  const isSelected = selectedFeed.get() === feed._id;

  const Actions = {
    selectFeed: () => {
      selectedFeed.set(feed);
    },
    showRemoveConfirm: () => {
      showRemoveFeed.set(true);
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
        m(deleteButton, { onclick: Actions.showRemoveConfirm }, 'X'),
        m(ConfirmBox, {
          targetScope: ['removeFeed', feed.name],
          text: `Do you really want to remove ${feed.name}?`,
          onconfirm: Actions.removeFeed,
          oncancel: () => {},
        }),
      ]);
    },
  };
}
