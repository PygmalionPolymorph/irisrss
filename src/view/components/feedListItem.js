import m from 'mithril';
import scope from 'kaleido';

import { fetchAllEntries } from '../../logic/entries';
import { removeFeed } from '../../logic/feeds';

export default function FeedListItem(vnode) {
  const { feed } = vnode.attrs;
  const selectedFeed = scope(['feeds', 'selected'], '');
  const entries = scope(['entries', 'list'], []);

  const Actions = {
    removeFeed: () => {
      removeFeed(feed);
    },
    selectFeed: () => {
      selectedFeed.set(feed.name);
      fetchAllEntries(feed.name).then(entries.set);
    },
  };

  const heading = '.b';
  const deleteButton = 'button';
  const feedListItem = 'div';

  return {
    view() {
      return m(feedListItem, [
        m(heading, {
          onclick: Actions.selectFeed,
        }, feed.name),
        m(deleteButton, {
          onclick: Actions.removeFeed,
        }, 'X'),
      ]);
    },
  };
}
