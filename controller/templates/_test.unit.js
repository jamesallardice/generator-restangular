describe("<%= moduleName %> <%= name %> controller", function () {

    "use strict";

    var $httpBackend,
        $rootScope,
        Ctrl;

    beforeEach(function () {
        jasmine.getJSONFixtures().fixturesPath = "base/test/fixtures";
        angular.mock.module("<%= moduleName %>");
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get("$httpBackend");
            $rootScope = $injector.get("$rootScope");
            Ctrl = $injector.get("$controller")("<%= name %>Ctrl", {
                $scope: $rootScope
            });
        });
    });

    it("should be created", function () {
        expect(Ctrl).toBeDefined();
    });
});
