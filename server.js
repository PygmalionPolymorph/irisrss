const fs = require('fs');

const options = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.crt')
};

require('http2').createServer(options, function(request, response) {
  response.end('Hello World');
}).listen(8080);
