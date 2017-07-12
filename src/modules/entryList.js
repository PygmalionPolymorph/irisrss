import m from 'mithril';

import hoodie from '../backend';
import state from '../state';

import Entry from '../components/entry';

function EntryList() {
  const loadEntries = hoodie.entries.findAll()
    .then(state.entries)
    .then(m.redraw);

  const entryList = '.flex.flex-column.items-center.justify-start.w-100';
  const entries = state.entries().map(entry => m(Entry, entry));

  return {
    oninit: loadEntries,
    view: () => m(entryList, entries),
  };
}

export default EntryList;
