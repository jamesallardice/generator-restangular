// A simple Node.js/Express server for providing an API to integration tests

"use strict";

var rewrite = require("connect-modrewrite"),
    express = require("express"),
    http = require("http"),
    path = require("path"),
    fs = require("fs"),
    app = express(),
    fixtures = {},
    fixturesPath = path.join(__dirname, "fixtures");

try {
    fs.readdirSync(fixturesPath).forEach(function (file) {
        var parts = file.split("-"),
            route = parts[0] + " /api/" + parts.slice(1).join("/"),
            fixture = path.join(__dirname, "fixtures", file);

        route = route.replace(".json", "");
        fixtures[route] = JSON.parse(fs.readFileSync(fixture, {
            encoding: "utf8"
        }));
    });
} catch (e) {}

// Setup Express app
app.set("port", "<%= testPort %>");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use("/vendor", express.static(path.join("build", "vendor")));
app.use("/templates", express.static(path.join("build", "templates")));
app.use("/assets", express.static(path.join("build", "assets")));
app.use(rewrite([
    "!^/api /"
]));
app.use(app.router);

// Routes
app.all("/api/*", function (req, res) {
    var route = req.method + " " + req.url,
        fixture = fixtures[route];
    if (!fixture) {
        return res.send(404, "Fixture not found. Have you named the file correctly?");
    }
    return res.json(fixture);
});

app.get("/", function (req, res) {
    res.sendfile(path.join("build", "index.html"));
});

// Start web server
http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
