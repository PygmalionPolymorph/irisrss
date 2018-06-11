import m from 'mithril';

// todo: move htmlUnescape
const htmlUnescape = x => x;

function formatDate(date) {
  // todo: use dateFns to format date
  return date.toString();
}

function Entry() {
  return {
    view: (vnode) => {
      const { selected, read, link, title, content, feed, pubDate, onclick } = vnode.attrs;
      const isSimpleEntry = !content && !!link;

      const selClass = selected ? '.entry--selected' : '';
      const readClass = !selected && read ? '.entry--read' : '';
      const entry = `.entry-list__item.entry${selClass}${readClass}`;

      return m(entry, {
        onclick,
      }, [
        m('.entry__header', [
          link
            ? m('a.link.entry__link', { href: link }, m('.entry__title', title))
            : m('.entry__title', title),
          m('.entry__meta', [
            pubDate && m('span.entry__meta__item.entry__date', `posted ${formatDate(pubDate)}`),
            feed && m('span.entry__meta__item.entry__feed', `in ${feed}`),
          ]),
        ]),
        !isSimpleEntry && selected ? content && m('.entry__body', m.trust(htmlUnescape(content))) : '',
      ]);
    },
  };
}

export default Entry;
