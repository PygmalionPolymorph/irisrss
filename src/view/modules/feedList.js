import m from 'mithril';
import scope from 'kaleido';

import { findAllFeeds } from '../../logic/feeds';

import FeedListItem from '../components/feedListItem';

export default function FeedList() {
  const feeds = scope(['feeds', 'list'], []);

  const feedList = '.flex.flex-column.items-center.justify-start.w-100';

  return {
    oninit: () => {
      findAllFeeds().then(feeds.set).then(m.redraw);
    },
    view: () => m(feedList, feeds.get().map(f => m(FeedListItem, { feed: f }))),
  };
}
