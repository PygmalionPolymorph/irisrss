import m from 'mithril';
import scope from 'kaleido';

export default function AddButton() {
  const addFeed = scope(['modal', 'addFeed'], false);

  const Actions = {
    openAddForm: () => { addFeed.set(true); },
  };

  return {
    view() {
      const button = 'button';
      return m(button, {
        onclick: Actions.openAddForm,
      }, '+');
    },
  };
}
