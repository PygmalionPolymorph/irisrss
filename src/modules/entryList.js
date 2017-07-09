import m from 'mithril';
import { stream } from 'flyd';

import hoodie from '../backend';

import Entry from '../components/entry';

const state = {
  entries: stream([])
};

const EntryList = {
  oninit: (vnode) => {
    hoodie.entries.findAll()
      .then(state.entries)
      .then(m.redraw);
  },
  view: (vnode) => {
    return m('.flex.flex-column.items-center.justify-start.w-100',
      state.entries().map(entry => m(Entry, entry))
    )
  }
}

export default EntryList;
