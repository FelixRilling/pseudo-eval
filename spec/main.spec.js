"use strict";

const lib = require("../index");

describe("Main tests", function () {
    it("Simple test", () => {
        expect(1 + 1).toBe(2);
    });

    it("Advanced test", () => {
        expect("fo" + "o").toBe("foo");
    });
});
