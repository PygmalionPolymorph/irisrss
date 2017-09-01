import parser from 'rss-parser';
import { fromNodeback } from 'folktale/concurrency/task';
import { getText } from './http';

// Feed -> Task([Entry])
const fetchFeed = feed => getText(feed.url).chain(fromNodeback(parser.parseString));

window.getText = feed => getText(feed.url).orElse(console.l).map(console.l);
window.fetchFeed = feed => fetchFeed(feed).orElse(console.l).map(console.l);

export default fetchFeed;
