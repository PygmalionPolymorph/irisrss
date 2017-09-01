import scope from 'kaleido';
import m from 'mithril';

import { markAllAsRead } from '../../logic/entries/update';

export default function Header() {
  const selectedFeed = scope(['feeds', 'selected'], undefined);
  const onlyUnread = scope(['filters', 'onlyUnread'], false);
  const feeds = scope(['feeds', 'list']);
  const entries = scope(['entries', 'list']);

  const h1 = 'h1.header__headline';
  const controls = '.header__controls';
  const buttons = '.controls__buttons';
  const h2 = 'h2.header__selected-feed';

  const Actions = {
    toggleOnlyUnread: () => {
      onlyUnread.set(!onlyUnread.get());
    },
    markAllAsRead: () => {
      if (selectedFeed.get()) {
        markAllAsRead(feeds)(entries)(selectedFeed.get()).run();
      }
    },
  };


  return {
    view() {
      const selectedFeedName = selectedFeed.get() ? selectedFeed.get().name : '';

      const markAsReadButton = 'button.btn.fa.fa-2x.fa-envelope-open';
      const onlyUnreadButton = `button.btn.fa.fa-2x${onlyUnread.get() ? '.fa-eye' : '.fa-eye-slash'}`;

      return [
        m(h1, 'IrisRSS'),
        m(controls, [
          m(h2, selectedFeedName),
          m(buttons, [
            selectedFeed.get()
              ? m(markAsReadButton, { onclick: Actions.markAllAsRead })
              : '',
            m(onlyUnreadButton, {
              onclick: Actions.toggleOnlyUnread,
            }),
          ]),
        ]),
      ];
    },
  };
}
