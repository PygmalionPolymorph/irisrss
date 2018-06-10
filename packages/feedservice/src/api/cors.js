const applyCorsProxy = url => `http://${process.env.CORS_HOST}:${process.env.CORS_PORT}/${url}`;

module.exports = applyCorsProxy;
