"use strict";

var util = require("util"),
    path = require("path"),
    ScriptBase = require("../script-base.js");

var ControllerGenerator = module.exports = function ControllerGenerator() {
    ScriptBase.apply(this, arguments);

    if (this.name.substr(-4).toLowerCase() === "ctrl") {
        this.name = this.name.slice(0, -4);
    }

    this.name = this._.capitalize(this.name);
};

util.inherits(ControllerGenerator, ScriptBase);

ControllerGenerator.prototype.files = function files() {
    this.template("_controller.js", path.join("lib", "js", "controllers", this.name + "Ctrl.js"));
    this.template("_test.unit.js", path.join("test", "unit", "controllers", this.name + "Ctrl.js"));
};
