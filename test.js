"use strict";

const pseudoEval = require("./dist/pseudoEval.common");

const a = pseudoEval("1===1===true", {
    a: {
        c: (a, b) => a + b + 12
    }
});

console.log(a);
