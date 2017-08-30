"use strict";

const {
    evalExpression
} = require("../dist/pseudoEval.common");

describe("Literals", function () {
    it("Simple test 1", () => {
        expect(evalExpression("1")).toBe(1);
    });

    it("Simple test 2", () => {
        expect(evalExpression("'foo'")).toBe("foo");
    });

    it("Simple test 3", () => {
        expect(evalExpression("a", {
            a: 1
        })).toBe(1);
    });

    it("Simple test 4", () => {
        expect(evalExpression("a.b", {
            a: {
                b: 2
            }
        })).toBe(2);
    });
});

describe("Comparison", function () {
    it("Simple test 1", () => {
        expect(evalExpression("1===1")).toBe(true);
    });

    it("Simple test 2", () => {
        expect(evalExpression("1!==0")).toBe(true);
    });

    it("Simple test 3", () => {
        expect(evalExpression("'a'==='a'", {
            a: 1
        })).toBe(true);
    });

    it("Simple test 4", () => {
        expect(evalExpression("true&&true")).toBe(true);
    });
});

describe("Math", function () {
    it("Simple test 1", () => {
        expect(evalExpression("1+1")).toBe(2);
    });

    it("Simple test 2", () => {
        expect(evalExpression("2-1")).toBe(1);
    });

    it("Simple test 3", () => {
        expect(evalExpression("a*a", {
            a: 2
        })).toBe(4);
    });
});
