"use strict";

var path = require("path"),
    helpers = require("yeoman-generator").test;


describe("restangular generator", function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, "temp"), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator("capita-angular:app", [
                "../../app"
            ]);
            done();
        }.bind(this));
    });

    it("creates expected files", function (done) {
        var expected = [
            ".editorconfig",
            ".gitignore",
            ".jscs.json",
            ".jshintrc",
            "Gruntfile.js",
            "bower.json",
            "nginx.conf",
            "package.json"
        ];

        helpers.mockPrompt(this.app, {
            "someOption": true
        });
        this.app.options["skip-install"] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
