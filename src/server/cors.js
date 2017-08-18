const CORS = require('cors-anywhere');

const host = '0.0.0.0';
const port = '1337';

CORS.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
}).listen(port, host, () => {
  console.log(`Running CORS Anywhere on ${host}:${port}`);
});
