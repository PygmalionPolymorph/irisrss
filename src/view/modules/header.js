import scope from 'kaleido';
import m from 'mithril';

import { updateFeed } from '../../logic/feeds/update';
import { markAllAsRead } from '../../logic/entries/update';

export default function Header() {
  const selectedFeed = scope(['feeds', 'selected'], undefined);
  const onlyUnread = scope(['filters', 'onlyUnread'], false);
  const entries = scope(['entries', 'list']);
  const feeds = scope(['feeds', 'list']);

  const h1 = 'h1.header__headline';
  const controls = '.header__controls';
  const buttons = '.controls__buttons';
  const h2 = 'h2.header__selected-feed';

  const Actions = {
    unselectFeed: () => {
      selectedFeed.set(null);
      selectedFeed.set(null);
    },
    toggleOnlyUnread: () => {
      onlyUnread.set(!onlyUnread.get());
    },
    markAllAsRead: () => {
      if (selectedFeed.get()) {
        markAllAsRead(entries)(selectedFeed.get())
          .chain(() => updateFeed(feeds)(Object.assign({}, selectedFeed.get(), { unreadCount: 0 })))
          .run();
      }
    },
  };


  return {
    view() {
      const selectedFeedName = selectedFeed.get() ? selectedFeed.get().name : '';

      const markAsReadButton = 'button.btn.fa.fa-2x.fa-envelope-open';
      const onlyUnreadButton = `button.btn.fa.fa-2x${onlyUnread.get() ? '.fa-eye' : '.fa-eye-slash'}`;

      return [
        m(h1, {
          onclick: Actions.unselectFeed
        }, 'IrisRSS'),
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
