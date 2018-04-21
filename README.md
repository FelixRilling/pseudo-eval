# pseudo-eval

**This is highly experimental and WIP, do not use this in any production software**

A library to evaluate simple expression strings without actually calling `eval()`, making it much safer.

Supports evaluating:

- Expression
- Comparison
- Math
- Literals
- Prop access

## Introduction

pseudo-eval uses RegExp to statically evaluate JS code string expressions. This makes it safer to use, as harmful code is harder to be executed by end-users (as long as the optional context doesn't have access to it).
Only simple expressions are supported.

Current problems:

- Many edge-cases are not covered

## Examples

```js
import { evalExpression } from "pseudo-eval";

//evalExpression("string",[ctx={}])
evalExpression("4"); //=>4
evalExpression("false"); //=>false
evalExpression("'foo'"); //=>"foo"
evalExpression("a", {a: 2}); //=>2

evalExpression("4===4"); //=>true
evalExpression("4<2"); //=>false
evalExpression("1+2<2"); //=>true
evalExpression("foo.length>2", {foo: [1, 2, 3, 4]}); //=>true
```

if you only want to evaluate a single type, for example only math, you can access that function on its own. Check out the documentation for details.
