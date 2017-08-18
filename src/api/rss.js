import parser from 'rss-parser';
import { fromNodeback } from 'folktale/concurrency/task';
import { getText } from './http';

// Feed -> Task([Entry])
const fetchFeed = feed => getText(feed.url).chain(fromNodeback(parser.parseString));

export default fetchFeed;
