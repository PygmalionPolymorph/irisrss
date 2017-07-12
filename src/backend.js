import Hoodie from '@hoodie/client';
import Store from '@hoodie/store-client';
import PouchDB from 'pouchdb';

const hoodie = new Hoodie({
  url: 'http://192.168.69.69:8081',
  PouchDB,
});

function createStore(hoodieInstance, name) {
  hoodieInstance[name] = new Store(name, { // eslint-disable-line no-param-reassign
    PouchDB,
    remote: `http://localhost:5894/${name}`,
  });
}

['entries', 'feeds'].forEach((store) => {
  createStore(hoodie, store);
});


export function signIn(username, password) {
  return hoodie.account.signIn({ username, password })
    .then((attributes) => {
      hoodie.log.info(`Signed in as ${attributes.username}`);
    }).catch((error) => {
      hoodie.log.error(error);
    });
}

// Debug
window.h = hoodie;

export default hoodie;
