import m from 'mithril';

import EntryList from '../modules/entryList';

const App = {
  view: () => {
    return m('main.sans-serif.pa2', [
      m('h1.f1', 'IrisRSSSSA'),
      m(EntryList)
    ]);
  }
}

export default App;
