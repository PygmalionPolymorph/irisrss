import m from 'mithril';
import scope from 'kaleido';
import { compose } from 'ramda';

import Modal from '../modules/modal';

export default function ConfirmBox() {
  return {
    view: (vnode) => {
      const { text, targetScope, onconfirm, oncancel } = vnode.attrs;
      const visible = scope(['modal'].concat(targetScope));

      return m(Modal, {
        targetScope,
      }, [
        m('.confirm-box', [
          m('span.confirm-box__text', text),
          m('.confirm-box__buttons', [
            m('button.btn.btn--confirm', {
              onclick: compose(() => visible.set(false), onconfirm),
            }, 'Yes'),
            m('button.btn.btn--cancel', {
              onclick: compose(() => visible.set(false), oncancel),
            }, 'No'),
          ]),
        ]),
      ]);
    },
  };
}
