import m from 'mithril';
import { compose } from 'ramda';
import scope from 'kaleido';

import { feeds } from 'irisrss-feedservice';

const { addFeed } = feeds;

export default function AddButton() {
  const addFeedModal = scope(['modal', 'addFeed'], false);
  const feedList = scope(['feeds', 'list']);
  const feedName = scope(['feeds', 'form', 'name'], '');
  const feedUrl = scope(['feeds', 'form', 'url'], '');

  const Actions = {
    openAddForm: () => { addFeedModal.set(true); },
    addFeed: () => {
      addFeed(feedList)({
        name: feedName.get(),
        url: feedUrl.get(),
      }).run();
    },
    closeModal: () => addFeedModal.set(false),
  };

  const button = 'button.button--add';

  return {
    view() {
      const label = addFeedModal.get() ? '✓' : '+';

      const onclick = addFeedModal.get()
        ? compose(Actions.closeModal, Actions.addFeed)
        : Actions.openAddForm;

      return m(button, { onclick }, label);
    },
  };
}
