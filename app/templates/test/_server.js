// A simple Node.js/Express server for providing an API to integration tests

"use strict";

var express = require("express"),
    http = require("http"),
    path = require("path"),
    fs = require("fs"),
    app = express(),
    fixtures = {},
    fixturesPath = path.join(__dirname, "fixtures"),
    rRoute = /^\/\* *route: *((GET|POST|PATCH|PUT|DELETE) *([^ *]+)) *\*\/$/m;

fs.readdirSync(fixturesPath).forEach(function (file) {
    var fixture = path.join(__dirname, "fixtures", file),
        data = rRoute.exec(fs.readFileSync(fixture));
    if (data) {
        fixtures[data[1]] = require(fixture);
    }
});

// Setup Express app
app.set("port", "<%= testApiPort %>");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// Routes
app.all("*", function (req, res) {
    var route = req.method + " " + req.url,
        fixture = fixtures[route];
    if (!fixture) {
        return res.send(404, "Have you named your test fixture correctly? " + route);
    }
    return res.json(fixture);
});

// Start web server
http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
