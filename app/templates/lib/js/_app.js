angular

    .module("<%= _.capitalize(appName) %>App", [
        "ngRoute",
        "restangular"
    ])

    .config([

        "$routeProvider",
        "$locationProvider",
        "RestangularProvider",

        function ($routeProvider, $locationProvider, RestangularProvider) {

            "use strict";

            $locationProvider.html5Mode(true);

            RestangularProvider.setDefaultHttpFields({
                cache: true
            });

            $routeProvider
                .when("/", {
                    templateUrl: "/templates/index.html",
                    routeName: "index"
                })
                // Add further routes here
            ;
        }
    ])
;
