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
                "{lib,test}/**/*.js",
            ]
        },
        jscs: {
            src: [
                "{lib,test}/**/*.js",
                "Gruntfile.js"
            ]
        },
        shell: {
            test: {
                command: "node test/server",
                options: {
                    async: true
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
        uglify: {
            app: {
                files: {
                    "build/assets/js/app.min.js": [
                        "lib/js/app.js",
                        "lib/js/filters/*.js",
                        "lib/js/services/*.js",
                        "lib/js/directives/*.js",
                        "lib/js/controllers/*.js"
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
                    "build"
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-protractor-runner");
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks("grunt-shell-spawn");
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
        "test:e2e:internal"
    ]);
    grunt.registerTask("test:e2e:internal", [
        "shell:test",
        "protractor",
        "clean:test",
        "shell:test:kill"
    ]);

    grunt.registerTask("test", [
        "jshint",
        "jscs",
        "build",
        "test:unit:internal",
        "test:e2e:internal"
    ]);

    grunt.registerTask("build", [
        "clean:build",
        "uglify",
        "copy",
        "bower:install"
    ]);
};
