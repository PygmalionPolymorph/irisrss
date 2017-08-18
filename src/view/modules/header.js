import scope from 'kaleido';
import m from 'mithril';

export default function Header() {
  const selectedFeed = scope(['feeds', 'selected'], undefined);
  const onlyUnread = scope(['filters', 'onlyUnread'], false);

  const h1 = 'h1.header__headline';
  const controls = '.header__controls';
  const h2 = 'h2.header__selected-feed';

  const Actions = {
    toggleOnlyUnread: () => {
      onlyUnread.set(!onlyUnread.get());
    },
  };

  return {
    view() {
      const selectedFeedName = selectedFeed.get() ? selectedFeed.get().name : '';

      return [
        m(h1, 'IrisRSS'),
        m(controls, [
          m(h2, selectedFeedName),
          m('button', {
            onclick: Actions.toggleOnlyUnread,
          }, 'Only Unread'),
        ]),
      ];
    },
  };
}
