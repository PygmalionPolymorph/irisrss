import Hoodie from '@hoodie/client';
import PouchDB from 'pouchdb';

const hoodie = new Hoodie({
  url: 'http://192.168.69.69:8081',
  PouchDB
});

export function signIn(username, password) {
  return hoodie.account.signIn({username, password})
  .then((attributes) => {
    hoodie.log.info(`Signed in as ${attributes.username}`);
  }).catch((error) => {
    hoodie.log.error(error);
  });
}

export default hoodie;
