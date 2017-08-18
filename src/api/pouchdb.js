import PouchDB from 'pouchdb';
import { map, mapObjIndexed } from 'ramda';

const replicationTarget = 'http://localhost:5984';
const replicationOptions = {
  live: true,
};

const init = dbName => new PouchDB(dbName);
const sync = (db, name) => db.sync(`${replicationTarget}/${name}`, replicationOptions);

const db = map(init, { entries: 'entries', feeds: 'feeds' });
const syncs = mapObjIndexed(sync, db);

export default db;
window.db = db;
