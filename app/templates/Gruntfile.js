module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: [
                "Gruntfile.js",
                "package.json",
                "bower.json",
                ".jscs.json",
                ".jshintrc",
                "{lib,test}/**/.jshintrc",
                "{lib,test}/**/*.{js,json}",
            ]
        },
        jscs: {
            src: [
                "{lib,test}/**/*.js",
                "Gruntfile.js"
            ]
        },
        express: {
            test: {
                options: {
                    script: "test/server.js"
                }
            }
        },
        karma: {
            unit: {
                configFile: "test/karma.conf.js"
            }
        },
        protractor: {
            options: {
                configFile: "test/protractor.conf.js",
                keepAlive: true
            },
            e2e: {}
        },
        clean: {
            build: [ "build" ],
            test: [ "./abrt_checker_*.log" ] // Selenium WebDriver logs
        },
        "sails-linker": {
            options: {
                appRoot: "build/",
                fileTmpl: "<script src=\"/%s\"></script>"
            },
            test: {
                options: {
                    startTag: "<!-- TEST SCRIPTS -->",
                    endTag: "<!-- TEST SCRIPTS END -->"
                },
                files: {
                    "build/index.html": [
                        "build/vendor/angular-mocks/angular-mocks.js",
                        "build/vendor/jasmine/lib/jasmine-core/jasmine.js",
                        "build/vendor/jasmine-jquery/jasmine-jquery.js"
                    ]
                }
            },
            live: {
                options: {
                    startTag: "<!-- APP SCRIPTS -->",
                    endTag: "<!-- APP SCRIPTS END -->"
                },
                files: {
                    "build/index.html": [
                        "build/vendor/jquery/live/jquery.min.js",
                        "build/vendor/lodash/live/lodash.min.js",
                        "build/vendor/angular/live/angular.min.js",
                        "build/vendor/angular-route/live/angular-route.min.js",
                        "build/vendor/restangular/live/restangular.min.js",
                        "build/assets/js/app.min.js"
                    ]
                }
            },
            dev: {
                options: {
                    startTag: "<!-- APP SCRIPTS -->",
                    endTag: "<!-- APP SCRIPTS END -->"
                },
                files: {
                    "build/index.html": [
                        "build/vendor/jquery/dev/jquery.js",
                        "build/vendor/lodash/dev/lodash.js",
                        "build/vendor/angular/dev/angular.js",
                        "build/vendor/angular-route/dev/angular-route.js",
                        "build/vendor/restangular/dev/restangular.js",
                        "build/assets/js/app.js"
                    ]
                }
            }
        },
        concat: {
            app: {
                src: [
                    "lib/js/app.js",
                    "lib/js/filters/*.js",
                    "lib/js/services/*.js",
                    "lib/js/directives/*.js",
                    "lib/js/controllers/*.js"
                ],
                dest: "build/assets/js/app.js"
            }
        },
        uglify: {
            app: {
                files: {
                    "build/assets/js/app.min.js": [
                        "build/assets/js/app.js"
                    ]
                }
            }
        },
        copy: {
            app: {
                files: [
                    {
                        src: "lib/index.html",
                        dest: "build/index.html"
                    },
                    {
                        src: "lib/styles/*",
                        dest: "build/assets/css/",
                        expand: true,
                        flatten: true
                    },
                    {
                        src: "lib/templates/*",
                        dest: "build/templates/",
                        expand: true,
                        flatten: true
                    },
                    {
                        src: "lib/partials/*",
                        dest: "build/partials/",
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: "./build/vendor",
                    layout: "byComponent",
                    cleanBowerDir: true
                }
            }
        },
        watch: {
            app: {
                files: [
                    "lib/**/*.{js,html,css}"
                ],
                tasks: [
                    "build:dev"
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-express-server");
    grunt.loadNpmTasks("grunt-protractor-runner");
    grunt.loadNpmTasks("grunt-sails-linker");
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks("grunt-bower-task");
    grunt.loadNpmTasks("grunt-karma");

    grunt.registerTask("default", [
        "jshint",
        "jscs",
        "build"
    ]);

    grunt.registerTask("test:unit", [
        "build",
        "karma:unit"
    ]);
    grunt.registerTask("test:unit:internal", [
        "karma:unit"
    ]);
    grunt.registerTask("test:e2e", [
        "build",
        "sails-linker:test",
        "test:e2e:internal"
    ]);
    grunt.registerTask("test:e2e:internal", [
        "express:test",
        "protractor",
        "clean:test"
    ]);

    grunt.registerTask("test", [
        "jshint",
        "jscs",
        "build",
        "test:unit:internal",
        "test:e2e:internal"
    ]);

    grunt.registerTask("build:internal", [
        "clean:build",
        "concat",
        "copy",
        "bower:install"
    ]);

    grunt.registerTask("build", [
        "build:internal",
        "uglify",
        "sails-linker:live"
    ]);

    grunt.registerTask("build:dev", [
        "build:internal",
        "sails-linker:dev"
    ]);
};
