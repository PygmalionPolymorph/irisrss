import { ifElse, has, compose, prop, identity, converge, assoc } from 'ramda';

const parseDate = x => new Date(x);

export const dateId = ifElse(
  has('pubDate'),
  compose(parseDate, prop('pubDate')),
  () => new Date(),
);

export const nameId = ifElse(
  has('name'),
  prop('name'),
  () => new Date(),
);

export const forceId = genId => ifElse(
  has('_id'),
  identity,
  converge(assoc('_id'), [genId, identity]),
);
