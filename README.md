# pseudo-eval

A library to evaluate simple expression strings without actually calling `eval()`

Supports evaluating:

- Comparison
- Math
- Literals
- Prop/Method access

## Introduction

pseudo-eval uses RegExp to staticaly evaluate restricted JS code strings. This makes it safe to use, as no harmful code can be executed by end-users (as long as the optional context doesnt have access to it).
Only very simple expressions are allowed.

Pro:
- Safe
- Faster
- Optimizable by Engine

Con:
- Very limited expressions
- Many edge-cases are not covered

## Examples

```js
const pseudoEval=require("pseudo-eval");

//pseudoEval("string",[ctx={}])
pseudoEval("4"); //=>4
pseudoEval("false"); //=>false
pseudoEval("'foo'"); //=>"foo"
pseudoEval("a",{a: 2}); //=>2
pseudoEval("getFoo()",{getFoo: ()=>"foo"}); //=>"foo"

pseudoEval("4===4"); //=>true
pseudoEval("4<2"); //=>false
pseudoEval("1+2<2"); //=>true
pseudoEval("foo.length>2",{foo: [1,2,3,4]}); //=>true
pseudoEval("getA(0)>=getB(2)",{getA: a=>a+2,getB: b=>a+1}); //=>false
```
