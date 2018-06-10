import m from 'mithril';
import scope from 'kaleido';

import { feeds } from 'irisrss-feedservice';

import FeedListItem from '../components/feedListItem';
import FeedForm from '../modules/feedForm';
import AddButton from '../components/addButton';
import CancelButton from '../components/cancelButton';

const { refreshFeeds } = feeds;

export default function FeedList() {
  const scopeFeeds = scope(['feeds', 'list'], []);

  return {
    oninit: () => {
      refreshFeeds(scopeFeeds).run();
    },
    view: () => m('.feed-list', [
      scopeFeeds.get().map((f, i) => m(FeedListItem, { key: f._id, feed: f, index: i % 3 })),
      m(FeedForm),
      m(AddButton),
      m(CancelButton),
    ]),
  };
}
