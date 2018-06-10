const { ifElse, has, compose, prop, identity, converge, assoc } = require('ramda');

const parseDate = x => new Date(x);

const dateId = ifElse(
  has('pubDate'),
  compose(parseDate, prop('pubDate')),
  () => new Date(),
);

const nameId = ifElse(
  has('name'),
  prop('name'),
  () => new Date(),
);

const forceId = genId => ifElse(
  has('_id'),
  identity,
  converge(assoc('_id'), [genId, identity]),
);

module.exports= { dateId, nameId, forceId };

