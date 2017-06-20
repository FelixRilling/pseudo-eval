"use strict";

const pseudoEval = require("./index");
const strings = ["a", "b", "a+b", "a*b", "b*b","c()===c()"];
const ctx = {
    a: 1,
    b: 4,
    c: () => 2,
    d: (a) => a * 2
};

strings.forEach(string => {
    const ev = pseudoEval(string, ctx);

    console.log([string, ev]);
});
