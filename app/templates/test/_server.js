// A simple Node.js/Express server for providing an API to integration tests

"use strict";

var rewrite = require("connect-modrewrite"),
    express = require("express"),
    http = require("http"),
    path = require("path"),
    app = express();

// Setup Express app
app.set("port", "<%= testPort %>");
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use("/vendor", express.static(path.join("build", "vendor")));
app.use("/templates", express.static(path.join("build", "templates")));
app.use("/partials", express.static(path.join("build", "partials")));
app.use("/assets", express.static(path.join("build", "assets")));
app.use(rewrite([
    "!^/base /"
]));
app.use(app.router);

// Routes
app.all("/base/test/*", function (req, res) {
    res.sendfile(path.join("test", "fixtures", req.path.split("/").pop()));
});

app.get("/", function (req, res) {
    res.sendfile(path.join("build", "index.html"));
});

// Start web server
http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
