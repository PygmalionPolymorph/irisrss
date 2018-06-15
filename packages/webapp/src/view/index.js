import m from 'mithril';

import FeedList from './modules/feedList';
import EntryList from './modules/entryList';
import Header from './modules/header';

import { bind } from '../reactions';

function App() {
  bind();

  return {
    view: () => m('.container', [
      m(Header),
      m(FeedList),
      m(EntryList),
    ]),
  };
}

export default App;
