import m from 'mithril';
import scope from 'kaleido';

export default function Modal(vnode) {
  const { targetScope } = vnode.attrs;
  const showModal = scope(['modal'].concat(targetScope), false);

  return {
    view: (vn) => {
      const show = showModal.get();
      const modal = `.modal${show ? '.modal--visible' : ''}`;

      return m(modal, vn.children);
    },
  };
}
