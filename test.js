"use strict";

const {
    evalVariable
} = require("./dist/pseudoEval.common");

const testsObject = {
    a: 1,
    b: 4,
    c: {
        a: 1,
        b: {
            c: {
                d: 5
            }
        }
    },
    d: [1, 2, 3],
    e: {
        b: [{
            a: 1
        }, {
            a: 2
        }, {
            a: 3
        }]
    }
};

console.log(evalVariable("a.b", {
    a: {
        b: 1
    }
}));
