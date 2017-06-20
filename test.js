"use strict";

const pseudoEval = require("./index");
const strings = ["a", "b", "a+b", "a>=b"];
const ctx = {
    a: 1,
    b: 4
};

strings.forEach(string => {
    const ev = pseudoEval(string, ctx);

    console.log([string, ev]);
});
