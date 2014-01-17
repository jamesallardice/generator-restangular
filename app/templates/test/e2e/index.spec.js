describe("Main template", function () {

    "use strict";

    beforeEach(function () {
        browser.get("/");
    });

    it("should load the homepage", function () {
        expect(element(by.css("[data-ng-view]")).getInnerHtml()).toBe("");
    });
});
