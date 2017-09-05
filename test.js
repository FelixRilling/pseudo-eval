"use strict";

const {
    evalExpression
} = require("./dist/pseudoEval.common");


const a = evalExpression("10+2", {
    a: {
        c: 12
    }
});

console.log(a);
