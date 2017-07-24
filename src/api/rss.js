import parse from 'xml-parser';
import { mergeAll, path, filter, propEq, compose, map, converge, objOf, prop } from 'ramda';

import { getText } from './http';

const extractRSS = compose(
  map(mergeAll),
  map(map(converge(objOf, [prop('name'), prop('content')]))),
  map(path(['children'])),
  filter(propEq('name', 'item')),
  path(['root', 'children', '0', 'children']),
);

const fetchFeed = feed => getText(feed.url)
  .map(parse)
  .map(extractRSS);

export default fetchFeed;
