import m from 'mithril';

import { htmlUnescape } from '../../logic/util';

function Entry() {
  return {
    view: (vnode) => {
      const { title, description } = vnode.attrs;

      const head = '.b';
      const body = 'div';
      const entry = 'div';

      return m(entry, [
        m(head, title),
        m(body, m.trust(htmlUnescape(description))),
      ]);
    },
  };
}

export default Entry;
