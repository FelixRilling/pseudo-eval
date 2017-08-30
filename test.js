"use strict";
const {
    evalExpression
} = require("./dist/pseudoEval.common");

const a = evalExpression("1===1===true", {
    a: {
        c: (a, b) => a + b + 12
    }
});

console.log(a);
