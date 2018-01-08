const router = require("./js/router.js");
const http = require('http');
require('dotenv').config();

var port = process.env.PORT || 3000;
http.createServer(function (request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});


// var port = process.env.PORT || 8000;
//
// .listen(port);
// console.log('Server running at Port 8000');
