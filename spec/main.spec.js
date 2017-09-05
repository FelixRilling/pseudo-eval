"use strict";

const {
    evalExpression
} = require("../dist/pseudoEval.common");

describe("Literals", function () {
    it("Simple test 1", () => {
        expect(evalExpression("1").val).toBe(1);
    });

    it("Simple test 2", () => {
        expect(evalExpression("'foo'").val).toBe("foo");
    });

    it("Simple test 3", () => {
        expect(evalExpression("a", {
            a: 1
        }).val).toBe(1);
    });

    it("Simple test 4", () => {
        expect(evalExpression("a.b", {
            a: {
                b: 2
            }
        }).val).toBe(2);
    });
});

describe("Comparison", function () {
    it("Simple test 1", () => {
        expect(evalExpression("1===1").val).toBe(true);
    });

    it("Simple test 2", () => {
        expect(evalExpression("1!==0").val).toBe(true);
    });

    it("Simple test 3", () => {
        expect(evalExpression("'a'==='a'", {
            a: 1
        }).val).toBe(true);
    });

    it("Simple test 4", () => {
        expect(evalExpression("true&&true").val).toBe(true);
    });
});

describe("Math", function () {
    it("Simple test 1", () => {
        expect(evalExpression("1+1").val).toBe(2);
    });

    it("Simple test 2", () => {
        expect(evalExpression("2-1").val).toBe(1);
    });

    it("Simple test 3", () => {
        expect(evalExpression("a*a", {
            a: 2
        }).val).toBe(4);
    });
});
