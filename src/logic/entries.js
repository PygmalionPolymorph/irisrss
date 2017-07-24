import { compose, merge, map, filter, propEq } from 'ramda';
import hoodie from '../api/hoodie';

window.hoodie = hoodie;

export const fetchAllEntries = feed => hoodie.entries.findAll().then(filter(propEq('feed', feed)));

export const addEntries = feed => compose(hoodie.entries.updateOrAdd, map(merge({ feed })));
