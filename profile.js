const EventEmitter = require("events").EventEmitter;
const https = require("https");
const http = require("http");
const util = require("util");
const api = require('./api.json');

function Profile(username) {

    EventEmitter.call(this);

    profileEmitter = this;

    let request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${username}.json`, function(response) {
        let body = "";

        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    let profile = JSON.parse(body);
                    profileEmitter.emit("end", profile);
                } catch (error) {
                    profileEmitter.emit("error", error);
                }
            }
        }).on("error", function(error){
            profileEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, EventEmitter );

module.exports = Profile;
