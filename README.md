# pseudo-eval

**This is highly experimental and WIP!**

A library to evaluate simple expression strings without actually calling `eval()`

Supports evaluating:

- Expression
- Comparison
- Math
- Literals
- Prop access

## Introduction

pseudo-eval uses RegExp to staticaly evaluate restricted JS code string expressions. This makes it safer to use, as harmful code is harder to be executed by end-users (as long as the optional context doesnt have access to it).
Only very simple expressions are allowed.

Current problems:
- Only very limited expressions allowed
- Many edge-cases are not covered

## Examples

```js
const pseudoEval=require("pseudo-eval");

//pseudoEval("string",[ctx={}])
pseudoEval("4"); //=>4
pseudoEval("false"); //=>false
pseudoEval("'foo'"); //=>"foo"
pseudoEval("a",{a: 2}); //=>2

pseudoEval("4===4"); //=>true
pseudoEval("4<2"); //=>false
pseudoEval("1+2<2"); //=>true
pseudoEval("foo.length>2",{foo: [1,2,3,4]}); //=>true
```
