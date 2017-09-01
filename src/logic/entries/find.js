import { fromPromised } from 'folktale/concurrency/task';
import { compose, map, filter, propEq, prop } from 'ramda';

import db from '../../api/pouchdb';

// String -> Task PouchDBResult [Entry]
export const findAllEntries = fromPromised(() => db.entries.allDocs({
  include_docs: true,
  descending: true,
}));

// Id -> Task PouchDBResult Entry
export const findEntry = fromPromised(id => db.entries.get(id));

// PouchDBResult -> [Entry]
export const extractEntries = compose(map(prop('doc')), prop('rows'));

// Feed -> [Entry] -> [Entry]
export const filterByFeed = feed => filter(propEq('feed', feed.name));

// Feed -> [Entry]
export const entriesForFeed = feed => findAllEntries()
  .map(extractEntries)
  .map(filterByFeed(feed));
