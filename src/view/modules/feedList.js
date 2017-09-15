import m from 'mithril';
import scope from 'kaleido';

import { refreshFeeds } from '../../logic/feeds/update';

import FeedListItem from '../components/feedListItem';
import FeedForm from '../modules/feedForm';
import AddButton from '../components/addButton';
import CancelButton from '../components/cancelButton';


export default function FeedList() {
  const feeds = scope(['feeds', 'list'], []);

  return {
    oninit: () => {
      refreshFeeds(feeds).run();
    },
    view: () => m('.feed-list', [
      feeds.get().map((f, i) => m(FeedListItem, { key: f._id, feed: f, index: i % 3 })),
      m(FeedForm),
      m(AddButton),
      m(CancelButton),
    ]),
  };
}
