const functions = require('firebase-functions');
const querystring = require('querystring');
var request = require('request');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
//const request = require('request');
const http = require('http');

const cors = require("cors");
const express = require("express");
const serveIpAndPortUrl = 'http://api.comroads.com:5611';
//public serveIpAndPortUrl = 'http://192.168.252.10:5611';
const getDataAnalyricUrl = this.serveIpAndPortUrl + '/api/all_data';
const getUsersUrl = this.serveIpAndPortUrl + '/api/users';
const getEventsPointsUrl = this.serveIpAndPortUrl + '/api/get_events_points';
const getTopDriversUrl = this.serveIpAndPortUrl + '/api/top_drivers';
const getStopSimulatorUrl = this.serveIpAndPortUrl + '/api/stop_simulator';
const getLastWeekDataUrl = this.serveIpAndPortUrl + '/api/last_week_data';
const getCurrentTripsReportsUrl = this.serveIpAndPortUrl + '/api/current_trips';
const postTripReports = this.serveIpAndPortUrl + '/api/report_of_trip';
const postTripOfEventUrl = this.serveIpAndPortUrl + '/api/get_trip_of_event';
const postSignedUrlForEventUrl = this.serveIpAndPortUrl + '/api/get_signed_url_for_event';
const postReportingBetweenPeriodUrl = this.serveIpAndPortUrl + '/api/reporting_between_period';
const postResultsSearchUrl = this.serveIpAndPortUrl + '/search';
//const postStartSimulatorUrl = this.serveIpAndPortUrl + '/api/simulate';
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const postReportBetweenPeriods = functions.https.onRequest((req, response) => {
    var requeste = require('request');
    requeste.post({
        headers: { 'content-type': 'application/json' },
        json: true,
        url: 'http://api.comroads.com:5611/api/reporting_between_period',
        body: req.body
    }
        , function (error, res, body) {

            response.send(body);
        });
});
const postSignedUrlOfEvent = functions.https.onRequest((req, response) => {
    var requeste = require('request');
    requeste.post({
        headers: { 'content-type': 'application/json' },
        json: true,
        url: 'http://api.comroads.com:5611/api/get_signed_url_for_event',
        body: req.body
    }
        , function (error, res, body) {

            response.send(body);
        });
});
const postSearch = functions.https.onRequest((req, response) => {
    var requeste = require('request');
    requeste.post({
        headers: { 'content-type': 'application/json' },
        json: true,
        url: 'http://api.comroads.com:5611/api/search',
        body: req.body//{"startIndex": 0, "endIndex": 5,"event": {"eventId": null, "eventFromPicker": null,"eventToPicker": null},"trip": {"tripId": "*","tripFromPicker": null, "tripToPicker": null},"user": {"user_id": null, "userMail": null}}
    }
        , function (error, res, body) {

            response.send(body);
        });
});
const postTripOfEvent = functions.https.onRequest((req, response) => {
    var requeste = require('request');
    requeste.post({
        headers: { 'content-type': 'application/json' },
        json: true,
        url: 'http://api.comroads.com:5611/api/get_trip_of_event',
        body: req.body
    }
        , function (error, res, body) {

            response.send(body);
        });
});
const get_events_points = functions.https.onRequest((request, response) => {
    var options = {
        host: 'api.comroads.com',
        port: 5611,
        path: '/api/get_events_points'
    };

    http.get(options, function (http_res) {
        // initialize the container for our data
        var data = "";

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            // you can use res.send instead of console.log to output via express
            response.send(JSON.parse(data));
        });
    });

});

const all_data = functions.https.onRequest((request, response) => {
    var options = {
        host: 'api.comroads.com',
        port: 5611,
        path: '/api/all_data'
    };

    http.get(options, function (http_res) {
        // initialize the container for our data
        var data = "";

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            // you can use res.send instead of console.log to output via express
            response.send(JSON.parse(data));
        });
    });

});

const report_of_trip = functions.https.onRequest((req, response) => {

    var requeste = require('request');
    requeste.post({
        headers: { 'content-type': 'application/json' },
        json: true,
        url: 'http://api.comroads.com:5611/api/report_of_trip',
        body: req.body
    }
        , function (error, res, body) {
            response.send(body);
        });
});
// Set the headers
var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
}


/* Express with CORS */
const app = express()
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({ origin: true }))
/*app.get("*", (request, response) => {
  response.send("Hello You")
});*/

/*
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://monitorfrontend.firebaseapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/
app.get("/users", (request, response) => {
    var options = {
        host: 'api.comroads.com',
        port: 5611,
        path: '/api/users'
    };

    http.get(options, function (http_res) {
        // initialize the container for our data
        var data = "";

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            // you can use res.send instead of console.log to output via express
            response.send(JSON.parse(data));
        });
    });
});


app.get("/current_trips", (request, response) => {
    var options = {
        host: 'api.comroads.com',
        port: 5611,
        path: '/api/current_trips',
        headers: { 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type, Accept", "Access-Control-Allow-Methods": "POST" }
    };

    http.get(options, function (http_res) {
        // initialize the container for our data
        var data = "";
        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });
        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            // you can use res.send instead of console.log to output via express
            response.send(JSON.parse(data));
        });
    });
});

app.get("/last_week_data", (request, response) => {
    var options = {
        host: 'api.comroads.com',
        port: 5611,
        path: '/api/last_week_data'
    };

    http.get(options, function (http_res) {
        // initialize the container for our data
        var data = "";

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            // you can use res.send instead of console.log to output via express
            response.send(JSON.parse(data));
        });
    });
});

app.get("/stop_simulator", (request, response) => {
    var options = {
        host: 'api.comroads.com',
        port: 5611,
        path: '/api/stop_simulator'
    };

    http.get(options, function (http_res) {
        // initialize the container for our data
        var data = "";

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            // you can use res.send instead of console.log to output via express
            response.send(JSON.parse(data));
        });
    });
});
app.get("/top_drivers", (request, response) => {
    var options = {
        host: 'api.comroads.com',
        port: 5611,
        path: '/api/top_drivers',
        headers: { 'Access-Control-Allow-Origin': 'http://localhost:4200' }
    };

    http.get(options, function (http_res) {
        // initialize the container for our data
        var data = "";
        // Website you wish to allow to connect
        // http_res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        /* // Request methods you wish to allow
         http_res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
         // Request headers you wish to allow
         http_res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
         // Set to true if you need the website to include cookies in the requests sent
         // to the API (e.g. in case you use sessions)
         http_res.setHeader('Access-Control-Allow-Credentials', true);*/

        // this event fires many times, each time collecting another piece of the response
        http_res.on("data", function (chunk) {
            // append this chunk to our growing `data` var
            data += chunk;
        });

        // this event fires *one* time, after all the `data` events/chunks have been gathered
        http_res.on("end", function () {
            // you can use res.send instead of console.log to output via express
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            response.send(JSON.parse(data));
        });
    });
});
app.get("/get_events_points", get_events_points);
app.get("/all_data", all_data);
app.post("/report_of_trip", report_of_trip);

app.post("/search", postSearch);
app.post("/get_trip_of_event", postTripOfEvent);
app.post("/get_signed_url_for_event", postSignedUrlOfEvent);
app.post("/reporting_between_period", postReportBetweenPeriods);

const api = functions.https.onRequest(app);
module.exports = {
    api
}














