"use strict";

const {
    evalVariable
} = require("./dist/pseudoEval.common");

const a = evalVariable("a.c(1,2)", {
    a: {
        c: (a, b) => a + b + 12
    }
});

console.log(a);
