"use strict";

var util = require("util"),
    path = require("path"),
    yeoman = require("yeoman-generator");

var Generator = module.exports = function Generator() {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.packageName = require(path.join(process.cwd(), "bower.json")).name;
    this.moduleName = this._.capitalize(this._.camelize(this.packageName)) + "App";
};

util.inherits(Generator, yeoman.generators.NamedBase);
