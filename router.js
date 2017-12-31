const Profile = require("./profile.js");
const renderer = require("./renderer.js");
const querystring = require("querystring");
const commonHeaders = {'Content-Type': 'text/html'};

function home(request, response) {

  if(request.url === "/") {
    if(request.method.toLowerCase() === "get") {

      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {

      request.on("data", function(postBody) {

        let query = querystring.parse(postBody.toString());

        response.writeHead(303, {"Location": "/" + query.username});
        response.end();
      });
    };
  };
};

function user(request, response) {

  let username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view("header", {}, response);

    let studentProfile = new Profile(username);

    studentProfile.on("end", function(profileJSON){

      let values = {
        logoUrl: profileJSON.current_observation.image.url,
        iconUrl: profileJSON.current_observation.icon_url,
        forecastUrl: profileJSON.current_observation.forecast_url,
        location: profileJSON.current_observation.display_location.full,
        temp: profileJSON.current_observation.temp_f,
        weather: profileJSON.current_observation.weather
      };

      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });

    studentProfile.on("error", function(error){

      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });

  };
};

module.exports.home = home;
module.exports.user = user;
