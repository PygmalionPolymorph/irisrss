import m from 'mithril';

function Entry() {
  return {
    view: (vnode) => {
      const { title, body } = vnode.attrs;

      return m('div', `${title} ---- ${body}`);
    },
  };
}

export default Entry;
