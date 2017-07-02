"use strict";

const pseudoEval = require("./dist/pseudoEval.common");

const a = pseudoEval.variable("a.c(1,2)", {
    a: {
        c: (a, b) => a + b + 12
    }
}, true);

console.log(a);
