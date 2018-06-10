import m from 'mithril';

import FeedList from './modules/feedList';
import EntryList from './modules/entryList';
import Header from './modules/header';

import { bind, init } from '../reactions';

function App() {
  init();
  bind();

  return {
    view: () => [
      m(Header),
      m(FeedList),
      m(EntryList),
    ],
  };
}

export default App;
