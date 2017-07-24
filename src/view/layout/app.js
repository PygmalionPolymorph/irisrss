import m from 'mithril';

import FeedList from '../modules/feedList';
import EntryList from '../modules/entryList';
import FeedForm from '../modules/feedForm';

import AddButton from '../components/addButton';

function App() {
  const main = 'main.sans-serif.pa2';
  const h1 = 'h1.f1';

  return {
    view: () => (
      console.log('redraw') ||
      m(main, [
        m(h1, 'IrisRSS'),
        m(FeedList),
        m(EntryList),
        m(FeedForm),
        m(AddButton),
      ])
    ),
  };
}

export default App;
