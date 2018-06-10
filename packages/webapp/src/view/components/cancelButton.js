import m from 'mithril';
import scope from 'kaleido';

export default function CancelButton() {
  const addFeed = scope(['modal', 'addFeed'], false);

  const Actions = {
    closeModal: () => addFeed.set(false),
  };

  const button = 'button.button--add';

  return {
    view() {
      if (!addFeed.get()) return m('');
      return m(button, { onclick: Actions.closeModal }, '❌');
    },
  };
}
