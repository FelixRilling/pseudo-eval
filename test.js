"use strict";

const pseudoEval = require("./index");
/*const strings = ["a", "b", "a+b", "a*b", "b*b", "c(1)===c(2)"];
const ctx = {
    a: 1,
    b: 4,
    c: () => 2,
    d: (a) => a * 2
};

strings.forEach(string => {
    const ev = pseudoEval(string, ctx);

    console.log([string, ev]);
});*/

const a = pseudoEval.variable("a.b(1)", {
    a: {
        b:(c)=> 12
    }
}, true);

console.log(a);
