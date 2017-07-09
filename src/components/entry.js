import m from 'mithril';

const Entry = {
  view: (vnode) => {
    const { title, body } = vnode.attrs;

    return m('div', `${title} ---- ${body}`);
  }
};

export default Entry;
