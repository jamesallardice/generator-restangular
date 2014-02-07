module.exports = function (config) {

    "use strict";

    config.set({
        basePath: "../",
        files: [

            // Dependencies
            "build/vendor/jquery/live/jquery.min.js",
            "build/vendor/jasmine-jquery/jasmine-jquery.js",
            "build/vendor/lodash/live/lodash.min.js",
            "build/vendor/angular/live/angular.min.js",
            "build/vendor/angular-route/live/angular-route.min.js",
            "build/vendor/restangular/live/restangular.min.js",
            "build/vendor/angular-mocks/angular-mocks.js",

            // App code
            "lib/js/app.js",
            "lib/js/filters/*.js",
            "lib/js/services/*.js",
            "lib/js/directives/*.js",
            "lib/js/controllers/*.js",

            // Partials
            "lib/partials/**/*.html",

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
            ],
            "lib/partials/**/*.html": [
                "ng-html2js"
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
        ngHtml2JsPreprocessor: {
            stripPrefix: "lib",
            moduleName: "partials"
        },
        browsers: [
            "PhantomJS"
        ],
        autoWatch: false,
        singleRun: true
    });
};
