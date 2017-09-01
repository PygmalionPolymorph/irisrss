import { fromPromised } from 'folktale/concurrency/task';
import { compose, map, merge, path } from 'ramda';

import db from '../../api/pouchdb';
import { forceId, dateId } from '../ids';

// String -> [Entry] -> Task [PouchDBResult]
export const addEntries = feedName => fromPromised(compose(
  entries => db.entries.bulkDocs(entries),
  map(forceId(dateId)),
  map(merge({ feed: feedName })),
  path(['feed', 'entries']),
));
