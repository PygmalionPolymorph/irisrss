import m from 'mithril';
import scope from 'kaleido';

import { findAllFeeds } from '../../logic/feeds';

import FeedListItem from '../components/feedListItem';
import FeedForm from '../modules/feedForm';
import AddButton from '../components/addButton';
import CancelButton from '../components/cancelButton';


export default function FeedList() {
  const feeds = scope(['feeds', 'list'], []);

  return {
    oninit: () => {
      findAllFeeds().map(feeds.set).run();
    },
    view: () => m('.feed-list', [
      feeds.get().map((f, i) => m(FeedListItem, { feed: f, index: i % 3 })),
      m(FeedForm),
      m(AddButton),
      m(CancelButton),
    ]),
  };
}
