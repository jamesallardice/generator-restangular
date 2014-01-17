describe("Router", function () {

    "use strict";

    beforeEach(angular.mock.module("<%= _.slugify(appName) %>"));

    it("should map routes to controllers and templates", angular.mock.inject(function ($route) {

        expect($route.routes["/"].templateUrl).toBe("/templates/index.html");
    }));
});
