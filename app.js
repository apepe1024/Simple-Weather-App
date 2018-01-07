const router = require("./js/router.js");
const http = require('http');
require('dotenv').config();

var port = process.env.PORT || 8000;

http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(8000);
console.log('Server running at Port 8000');
