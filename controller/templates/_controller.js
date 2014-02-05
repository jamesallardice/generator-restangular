angular

    .module("<%= moduleName %>")

    .controller("<%= name %>Ctrl", [

        "$scope",

        function ($scope) {

            "use strict";

            $scope.something = "Something interesting";

        }
    ])
;
