import { fromPromised } from 'folktale/concurrency/task';
import { prop, map } from 'ramda';

import db from '../../api/pouchdb';

// _ -> Task [Feed]
export const findAllFeeds = () => fromPromised(() => db.feeds.allDocs({ include_docs: true }))()
  .map(prop('rows'))
  .map(map(prop('doc')));

// String -> Task Feed
export const findFeed = fromPromised(id => db.feeds.get(id));

