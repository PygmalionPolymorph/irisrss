import m from 'mithril';

import FeedList from '../modules/feedList';
import EntryList from '../modules/entryList';
import Header from '../modules/header';

import { bind } from '../../logic/reactions';

function App() {
  bind();

  return {
    view: () => (
      console.log('redraw') || [
        m(Header),
        m(FeedList),
        m(EntryList),
      ]),
  };
}

export default App;
