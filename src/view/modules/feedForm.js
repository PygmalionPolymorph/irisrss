import m from 'mithril';
import scope from 'kaleido';

import { compose, path } from 'ramda';

import { addFeed } from '../../logic/feeds';

export default function FeedForm() {
  const show = scope(['modal', 'addFeed'], undefined);
  const feedName = scope(['feeds', 'form', 'name'], '');
  const feedUrl = scope(['feeds', 'form', 'url'], '');

  const Actions = {
    addFeed: () => {
      addFeed({
        name: feedName.get(),
        url: feedUrl.get(),
      });
    },
    closeModal: () => show.set(false),
  };

  return {
    view() {
      const modal = 'div';
      const input = 'input';
      const button = 'button';

      if (!show.get()) return m('');

      return m(modal, [
        m(input, {
          placeholder: 'Name',
          onchange: compose(feedName.set, path(['target', 'value'])),
        }),
        m(input, {
          placeholder: 'URL',
          onchange: compose(feedUrl.set, path(['target', 'value'])),
        }),
        m(button, {
          onclick: compose(Actions.closeModal, Actions.addFeed),
        }, 'Add'),
      ]);
    },
  };
}
