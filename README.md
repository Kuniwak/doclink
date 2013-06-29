# Doclink [![Build Status](https://travis-ci.org/OrgaChem/doclink.png?branch=master)](https://travis-ci.org/OrgaChem/doclink) [![NPM version](https://badge.fury.io/js/doclink.png)](http://badge.fury.io/js/doclink)

## Abstract

Doclink is a JavaScript module provides to link doc comment to AST node as the link targets.

This module works on Node.js and a browser supported JavaScript 1.6 or later.

[Online demo](http://orgachem.github.io/doclink/) is available. Try it!

## How-to
Install doclink and esprima (or other AST parser).

```
npm install doclink esprima
```

And simple example is:

```
var ast = require('esprima').parse(code, { comment: true, range: true });
var doclinker = require('doclink').analyze(ast);

console.log(doclinker.links);
```

## Spec

### Exported methods
#### analyze(root, opt)
Analyze the specified AST to make doc links.
**NOTE**: Given AST should have comments and range.

##### Parameters
###### root: ```AstNode```
The AST node as the root.

###### opt: ```Object|null|undefined```
Options.  Set ```opt.fileDoc``` if the code has a file doc comment.  You can change doc comment spec by set your test function as ```opt.isDocComment```.  In default, a doc comment is a Block comment and has ```/**``` on the head.

##### Return
###### ```DocLinker```
The doc linker has results. You can get doc links by ```DocLinker#links```.

---

### DocLinker
A class for doc linkers.  The doc linker has doc links and attaching/detaching method.

### DocLinker#links: ```Array.<DocLink>```
The doc link array.

### DocLinker#attach()
Attaches all doc link to each link target.  You can access the doc link from AST node via ```'__$doclink$__'```.

### DocLinker#detach()
Detaches all doc links from link targets.

### DocLinker#link(comment, target, context)
Makes doc link by the specified comment and AST node as the target.

#### Parameters
##### comment: ```AstComment```
The comment to be linked.

##### target: ```AstNode```
The link target.

##### context: ```AstNode|null```
The parent node of the target.

---

### DocLink
A class for doc links.

### DocLink#comment: ```AstComment```
A comment was linked to the symbol.

### DocLink#target: ```AstNode```
A symbol as the link target.

### DocLink#context: ```AstNode```
A symbol as the context (equals as the parent node) of the link target.

### DocLink.propName: ```string```
Property name of the doc link in the link target when ```DocLink#attach``` was called. In default:  ```'__$doclink$__'```

---

## License
Doclink licensed under [MIT](http://orgachem.mit-license.org).
