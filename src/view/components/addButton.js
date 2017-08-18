import m from 'mithril';
import { compose } from 'ramda';
import scope from 'kaleido';

export default function AddButton() {
  const addFeed = scope(['modal', 'addFeed'], false);
  const feedName = scope(['feeds', 'form', 'name'], '');
  const feedUrl = scope(['feeds', 'form', 'url'], '');

  const Actions = {
    openAddForm: () => { addFeed.set(true); },
    addFeed: () => {
      addFeed({
        name: feedName.get(),
        url: feedUrl.get(),
      }).run();
    },
    closeModal: () => addFeed.set(false),
  };

  const button = 'button.button--add';

  return {
    view() {
      const label = addFeed.get() ? '✓' : '+';

      const onclick = addFeed.get()
        ? compose(Actions.closeModal, Actions.addFeed)
        : Actions.openAddForm;

      return m(button, { onclick }, label);
    },
  };
}
