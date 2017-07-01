"use strict";

const pseudoEval = require("../dist/pseudoEval.common");

describe("Literals", function () {
    it("Simple test 1", () => {
        expect(pseudoEval("1")).toBe(1);
    });

    it("Simple test 2", () => {
        expect(pseudoEval("'foo'")).toBe("foo");
    });

    it("Simple test 3", () => {
        expect(pseudoEval("a", {
            a: 1
        })).toBe(1);
    });

    it("Simple test 4", () => {
        expect(pseudoEval("a.b", {
            a: {
                b: 2
            }
        })).toBe(2);
    });
});

describe("Comparison", function () {
    it("Simple test 1", () => {
        expect(pseudoEval("1===1")).toBe(true);
    });

    it("Simple test 2", () => {
        expect(pseudoEval("1!==0")).toBe(true);
    });

    it("Simple test 3", () => {
        expect(pseudoEval("'a'==='a'", {
            a: 1
        })).toBe(true);
    });

    it("Simple test 4", () => {
        expect(pseudoEval("true&&true")).toBe(true);
    });
});

describe("Math", function () {
    it("Simple test 1", () => {
        expect(pseudoEval("1+1")).toBe(2);
    });

    it("Simple test 2", () => {
        expect(pseudoEval("2-1")).toBe(1);
    });

    it("Simple test 3", () => {
        expect(pseudoEval("a*a", {
            a: 2
        })).toBe(4);
    });
});
