"use strict";

var Q = require("q"),
    util = require("util"),
    path = require("path"),
    bower = require("bower"),
    yeoman = require("yeoman-generator"),
    RestangularGenerator;

function bowerCommand(cmd) {
    var deferred = Q.defer(),
        args = [].slice.call(arguments, 1);
    bower.commands[cmd].apply(bower, args).on("end", function (res) {
        deferred.resolve(res);
    });
    return deferred.promise;
}


RestangularGenerator = module.exports = function RestangularGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on("end", function () {
        this.installDependencies({
            skipInstall: options["skip-install"],
            bower: false, // Bower dependencies will be installed by Grunt,
            callback: function () {
                this.spawnCommand("grunt", [
                    "build"
                ]);
                this.spawnCommand("node_modules/protractor/bin/webdriver-manager", [
                    "update"
                ]);
            }.bind(this)
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
};

util.inherits(RestangularGenerator, yeoman.generators.Base);

RestangularGenerator.prototype.askFor = function askFor() {
    var cb = this.async(),
        prompts = [
            {
                name: "appName",
                message: "What is the name of the app?"
            },
            {
                name: "testPort",
                message: "Which port should the test server listen on?",
                default: "7357"
            }
        ],
        bowerDeps = [
            "jquery",
            "restangular",
            "angular"
        ];

    Q.all(bowerDeps.map(function (dep) {
        return bowerCommand("info", dep);
    })).spread(function () {

        [].forEach.call(arguments, function (lib) {
            prompts.splice(1, 0, {
                name: lib.name + "Version",
                message: "Which version of " + lib.name + " should be used?",
                default: lib.latest.version
            });
        });

        console.log(this.yeoman);

        this.prompt(prompts, function (props) {

            // Copy configuration answers onto the generator
            Object.keys(props).forEach(function (key) {
                this[key] = props[key];
            }.bind(this));

            cb();

        }.bind(this));
    }.bind(this));
};

RestangularGenerator.prototype.app = function app() {

    // Create app directories
    this.mkdir("lib");
    this.mkdir("lib/js");
    this.mkdir("lib/js/filters");
    this.mkdir("lib/js/services");
    this.mkdir("lib/js/directives");
    this.mkdir("lib/js/controllers");

    this.mkdir("lib/templates");
    this.mkdir("lib/partials");
    this.mkdir("lib/styles");
    this.mkdir("lib/assets");

    // Create essential project files
    this.template("_package.json", "package.json");
    this.template("_bower.json", "bower.json");
    this.template("_README.md", "README.md");
    this.copy("Gruntfile.js");

    // Create a basic Angular app
    this.template("lib/_index.html", "lib/index.html");
    this.template("lib/js/_app.js", "lib/js/app.js");
    this.write("lib/templates/index.html", "");
};

RestangularGenerator.prototype.test = function test() {

    // Create test directories
    this.mkdir("test");
    this.mkdir("test/e2e");
    this.mkdir("test/unit");
    this.mkdir("test/fixtures");

    // Create test configuration files
    this.template("test/_protractor.conf.js", "test/protractor.conf.js");
    this.template("test/_server.js", "test/server.js");
    this.copy("test/karma.conf.js");
    this.copy("test/unit/jshintrc", "test/unit/.jshintrc");
    this.copy("test/e2e/jshintrc", "test/e2e/.jshintrc");

    // Create some basic tests
    this.copy("test/e2e/index.spec.js", "test/e2e/index.spec.js");
    this.template("test/unit/_routes.spec.js", "test/unit/routes.spec.js");
};

RestangularGenerator.prototype.dotfiles = function dotfiles() {

    // Create project meta files
    this.copy("lib/js/jshintrc", "lib/js/.jshintrc");
    this.copy("editorconfig", ".editorconfig");
    this.copy("gitignore", ".gitignore");
    this.copy("jscs.json", ".jscs.json");
    this.copy("jshintrc", ".jshintrc");
};
