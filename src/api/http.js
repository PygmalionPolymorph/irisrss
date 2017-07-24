import { compose } from 'ramda';
import { fromPromised } from 'folktale/concurrency/task';


export const httpGet = compose(
  fromPromised(window.fetch),
  url => `http://crossorigin.me/${url}`,
);

export const getText = compose(
  res => res.chain(fromPromised(body => body.text())),
  httpGet,
);

