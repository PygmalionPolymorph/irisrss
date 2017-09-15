import { fromPromised } from 'folktale/concurrency/task';
import { compose, map, merge, pathOr } from 'ramda';

import db from '../../api/pouchdb';
import { forceId, dateId } from '../ids';

const transformEntry = entry => ({
  title: pathOr(entry.title, ['TITLE', 0], entry),
  content: pathOr(pathOr(entry.description, ['DESCRIPTION', 0], entry), ['CONTENT:ENCODED', 0], entry),
  pubDate: pathOr(pathOr(entry.pubDate, ['PUBDATE', 0], entry), ['PUBLISHED', 0], entry),
  link: pathOr(pathOr(entry.link, ['LINK', 0], entry), ['LINK', 0, '$', 'HREF'], entry),
  read: entry.read || false,
});

// String -> [Entry] -> Task [PouchDBResult]
export const addEntries = feedName => fromPromised(compose(
  entries => db.entries.bulkDocs(entries),
  map(forceId(dateId)),
  map(merge({ feed: feedName })),
  map(transformEntry),
));
