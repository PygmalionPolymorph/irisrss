import { fromPromised } from 'folktale/concurrency/task';
import { compose } from 'ramda';

import { forceId, nameId } from '../ids';
import db from '../../api/pouchdb';

// Feed -> Task PouchDBResult
export const addFeed = fromPromised(compose(feed => db.feeds.put(feed), forceId(nameId)));
