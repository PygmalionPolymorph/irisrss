const cron = require('node-cron');
const { feeds: { updateAllFeedEntries }} = require('irisrss-feedservice');

const { FEED_UPDATE_INTERVAL = 1 } = process.env;
window = { Promise: Promise };

//cron.schedule(`*/${parseInt(FEED_UPDATE_INTERVAL)} * * * *`, function(){
cron.schedule(`*/10 * * * * *`, function() {
  console.info('[CRON] Updating feeds...');
  updateAllFeedEntries()
    .map(res => console.log('[CRON]', res))
    .map(() => console.log('[CRON] Success!'))
    .orElse(err => console.error('[CRON] An error occurred while trying to update feeds: ', err))
    .run();
});

