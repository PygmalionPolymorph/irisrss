import { compose } from 'ramda';
import { fromPromised } from 'folktale/concurrency/task';

import applyCorsProxy from './cors';
export const httpGetXML = (url) => {
  const request = new XMLHttpRequest();

  request.open('GET', applyCorsProxy(url));
  request.setRequestHeader('Content-Type', 'application/xml');
  request.addEventListener('load', () => {
    if (request.status >= 200 && request.status < 300) {
      console.log(request.responseText);
    } else {
      console.warn(request.statusText, request.responseText);
    }
  });
  request.send();
};

window.get = httpGetXML;

export const httpGet = compose(
  fromPromised((url) => window.fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
    },
  })),
  applyCorsProxy,
);


export const getText = compose(
  res => res.chain(fromPromised(body => body.text())),
  httpGet,
);
window.getText = getText;
