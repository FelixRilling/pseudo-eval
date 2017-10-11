"use strict";

const {
    evalVariable
} = require("./dist/pseudoEval.common");

const testObject = {
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

console.log(evalVariable("a", testObject));
console.log(evalVariable("c.a", testObject));
console.log(evalVariable("c.b.c.d", testObject));
console.log(evalVariable("d[1]", testObject));
console.log(evalVariable("d[1][0]", testObject));
console.log(evalVariable("e.b[2].a", testObject));
console.log(evalVariable("e.b['1'].a", testObject));
