import { compose } from 'ramda';
import { fromPromised } from 'folktale/concurrency/task';

import applyCorsProxy from './cors';

export const httpGet = compose(
  fromPromised(url => window.fetch(url, {
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
