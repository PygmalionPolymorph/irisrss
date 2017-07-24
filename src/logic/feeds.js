import { map } from 'ramda';

import hoodie from '../api/hoodie';
import fetchFeed from '../api/rss';

import { addEntries } from './entries';

export const addFeed = hoodie.feeds.add;

export const removeFeed = hoodie.feeds.remove;

export const findAllFeeds = hoodie.feeds.findAll;

export const updateFeed = feed => fetchFeed(feed).map(addEntries(feed.name)).run();

export const updateAllFeeds = () => findAllFeeds().then(map(updateFeed));

window.updateAllFeeds = updateAllFeeds;
