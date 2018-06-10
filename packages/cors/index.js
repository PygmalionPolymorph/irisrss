require('dotenv').config();
const CORS = require('cors-anywhere');

const {
  CORS_PORT, = 1337,
  CORS_HOST = 'localhost'
} = process.env;

CORS.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
}).listen(CORS_PORT, CORS_HOST, () => {
  console.info(`Running CORS Anywhere on ${CORS_HOST}:${CORS_PORT}`);
});
