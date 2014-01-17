module.exports = function (config) {

    "use strict";

    config.set({
        basePath: "../",
        files: [

            // Dependencies
            "build/vendor/jquery/js/jquery.min.js",
            "build/vendor/lodash/js/lodash.min.js",
            "build/vendor/angular/js/angular.min.js",
            "build/vendor/angular-route/js/angular-route.min.js",
            "build/vendor/restangular/js/restangular.min.js",
            "build/vendor/angular-mocks/angular-mocks.js",

            // App code
            "lib/js/app.js",
            "lib/js/filters/*.js",
            "lib/js/services/*.js",
            "lib/js/directives/*.js",
            "lib/js/controllers/*.js",

            // Test code
            "test/unit/**/*.js"
        ],
        frameworks: [
            "jasmine"
        ],
        reporters: [
            "progress",
            "coverage"
        ],
        preprocessors: {
            "lib/js/**/*.js": [
                "coverage"
            ]
        },
        coverageReporter: {
            reporters: [
                {
                    type: "text-summary"
                },
                {
                    type: "html",
                    dir: "coverage/"
                }
            ]
        },
        browsers: [
            "Chrome"
        ],
        autoWatch: false,
        singleRun: true
    });
};
