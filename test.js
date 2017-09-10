"use strict";

const {
    getPath,
    evalVariable
} = require("./dist/pseudoEval.common");


/*const a = evalExpression("!1", {
    a: {
        c: 12
    }
});*/

console.log(evalVariable("a.b", {
    a: {
        b: 1
    }
}));
