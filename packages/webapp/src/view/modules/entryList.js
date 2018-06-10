import m from 'mithril';
import scope from 'kaleido';
import { slice } from 'ramda';

import Entry from '../components/entry';

function EntryList() {
  const entries = scope(['entries', 'list'], []);
  const selectedEntry = scope(['entries', 'selected'], '');

  window.entries = entries;

  const Actions = {
    selectEntry: entry => () => {
      selectedEntry.set(entry._id);
    },
  };

  const entryList = '.entry-list';

  return {
    view: () => m(entryList,
      slice(0, 30, entries.get()).map(entry => m(Entry, Object.assign({}, entry, {
        key: entry._id,
        onclick: Actions.selectEntry(entry),
        selected: entry._id === selectedEntry.get(),
      }), selectedEntry.get())),
    ),
  };
}

export default EntryList;
