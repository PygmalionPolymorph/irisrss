import m from 'mithril';

import EntryList from '../modules/entryList';

function App() {
  const main = 'main.sans-serif.pa2';
  const h1 = 'h1.f1';

  return {
    view: () => (
      m(main, [
        m(h1, 'IrisRSSSSA'),
        m(EntryList),
      ])
    ),
  };
}

export default App;
