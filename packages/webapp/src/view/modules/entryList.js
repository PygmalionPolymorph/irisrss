import m from 'mithril';
import scope from 'kaleido';
import { on } from 'flyd';
import { slice } from 'ramda';

import Entry from '../components/entry';

function EntryList() {
  const entries = scope(['entries', 'list'], []);
  const selectedEntry = scope(['entries', 'selected'], '');
  const selectedEntryElement = scope(['entries', 'selectedElement'], '');

  on((elm) => {
    if (!elm) return;
    setTimeout(() => {
      window.scrollTo({
        top: Math.max(0, elm.offsetTop - 20),
        behavior: 'smooth',
      });
    }, 100);
  }, selectedEntryElement.$);

  const Actions = {
    selectEntry: entry => (e) => {
      selectedEntry.set(entry._id);
      selectedEntryElement.set(e.target);
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
