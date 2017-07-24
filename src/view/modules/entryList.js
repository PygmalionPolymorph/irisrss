import m from 'mithril';
import scope from 'kaleido';

import Entry from '../components/entry';

function EntryList() {
  const selectedFeed = scope(['feeds', 'selected'], '');
  const entries = scope(['entries', 'list'], []);

  window.selectedFeed = selectedFeed;

  const entryList = '.flex.flex-column.items-center.justify-start.w-100';

  return {
    oninit: () => {
    },
    view: () => m(entryList, [
      entries.get().map(entry => m(Entry, entry)),
    ]),
  };
}

export default EntryList;
