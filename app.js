const router = require("./js/router.js");
const http = require('http');
require('dotenv').config();

var port = process.env.PORT || 3000

http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(3000);
console.log('Server running at Port 3000');
