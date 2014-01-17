"use strict";

module.exports.config = {
    baseUrl: "http://localhost:<%= testPort %>",
    rootElement: "html",
    specs: [
        "e2e/*.js"
    ]
};
