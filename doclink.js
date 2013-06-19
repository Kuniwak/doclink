// This script licensed under the MIT.
// http://orgachem.mit-license.org

/*
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(function (factory, global) {
  'use strict';

  function namespace(str, obj) {
    var i, iz, names, name;
    names = str.split('.');
    for (i = 0, iz = names.length; i < iz; ++i) {
      name = names[i];
      if (obj.hasOwnProperty(name)) {
        obj = obj[name];
      } else {
        obj = (obj[name] = {});
      }
    }
    return obj;
  }

  // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
  // and plain browser loading,
  if (typeof define === 'function' && define.amd) {
    define('doclink', ['exports', 'estraverse'], function (exports, estraverse) {
      factory(exports, global, estraverse);
    });
  } else if (typeof exports !== 'undefined') {
    factory(exports, global, require('estraverse'));
  } else {
    factory(namespace('doclink', global), global, global.estraverse);
  }
}(function (exports, global, estraverse) {
  'use strict';

  var LinkasbleSyntax,
      extra,
      isArray,
      BREAK,
      SKIP;


  /**
   * Linkable AST node type list.
   * @enum {boolean}
   * @exports
   */
  LinkasbleSyntax = {
    AssignmentExpression: true,
    CallExpression: true,
    FunctionDeclaration: true,
    FunctionExpression: true,
    Identifier: true,
    MemberExpression: true,
    ObjectExpression: true,
    Property: true,
    VariableDeclaration: true
  };


  /**
   * An object used by return value to break.
   * @type {Object}
   */
  BREAK = estraverse.VisitorOption.Break;


  /**
   * An object used by return value to skip.
   * @type {Object}
   */
  SKIP = estraverse.VisitorOption.Skip;


  /**
   * Returns true if the specified value is an array.
   * @type {function}
   */
  isArray = Array.isArray;
  if (!isArray) {
      isArray = function isArray(array) {
          return Object.prototype.toString.call(array) === '[object Array]';
      };
  }


  /**
   * Checks if the condition evaluates to true.
   * @param {*} cond The condition to check.
   * @param {string} text Error message in case of failure.
   */
  function assert(cond, text) {
    if (!cond) {
        throw new Error(text);
    }
  }


  /**
   * Default test function used by filtering comments.
   * @param {Comment} comment The comment to test.
   * @return {boolean} Whether the comment is a doc comment.
   */
  function isDocComment(comment) {
    return comment.type === 'Block' && comment.value[0] === '*';
  }


  /**
   * A class for doc links.
   * @constructor
   * @exports
   */
  function DocLink(comment, target, context) {
    this.comment = comment;
    this.target = target;
    this.context = context;
  };


  /**
   * Property name of the doc link in the link target when {@link DocLink#attach}
   * was called. In default:  {@code '__$doclink$__'}
   * @type {string}
   */
  DocLink.propName = '__$doclink$__';


  /**
   * A comment was linked to the symbol.
   * @type {Comment}
   */
  DocLink.prototype.comment;


  /**
   * A symbol as the link target.
   * @type {Comment}
   */
  DocLink.prototype.target;


  /**
   * Attaches the doc link to the link target. You can access the doc link from
   * AST node via {@link DocLink.propName}.
   */
  DocLink.prototype.attach = function attach() {
    if (this.target) {
      this.target[DocLink.propName] = this;
    }
  };


  /**
   * Detaches the doc link to the link target.
   */
  DocLink.prototype.detach = function detach() {
    if (this.target) {
      delete this.target[DocLink.propName];
    }
  };



  /**
   * A class for doc linkers.  The doc linker has doc links and attaching/detaching
   * method.
   * @constructor
   * @exports
   */
  function DocLinker() {
    this.links = [];
    this.attached = false;
  };


  /**
   * Makes doc link by the specified comment and AST node as the target.
   * @param {Comment} comment The comment to be linked.
   * @param {AstNode} target The link target.
   * @param {?AstNode} context The parent node of the target.
   */
  DocLinker.prototype.link = function link(comment, target, context) {
    this.links.push(new DocLink(comment, target, context));
  };


  /**
   * Attaches all doc link to each link target. You can access the doc link from
   * AST node via {@link DocLink.propName}.
   */
  DocLinker.prototype.attach = function attach() {
    var linkIdx, linksLen;
    for (linkIdx = 0, linksLen = this.links.length; linkIdx < linksLen; linkIdx++) {
      this.links[linkIdx].attach();
    }
    this.attached = true;
  };


  /**
   * Detaches all doc link from each link target.
   */
  DocLinker.prototype.detach = function detach() {
    var linkIdx, linksLen;
    for (linkIdx = 0, linksLen = this.links.length; linkIdx < linksLen; linkIdx++) {
      this.links[linkIdx].detach();
    }
    this.attached = false;
  };


  /**
   * Analyze the specified AST to make doc links.
   * @param {AstNode} root The AST node as the root.
   * @param {?Object=} opt Options.  Set {@code opt.fileDoc} if the code has a
   *     file doc comment.  You can change doc comment spec by set your test
   *     function as {@code opt.isDocComment}.  In default, {@link isDocComment}
   *     will be used.
   * @return {DocLinker} The doc linker has results. You can get doc links by
   *     {@link DocLinker#links}.
   * @exports
   */
  function analyze(root, opt) {
    assert(root.comments, 'comments should be exists');
    assert(Array.isArray(root.range), 'range should be exists');

    var linker,
        comments,
        commentsLen,
        currentComment,
        currentCommentIdx;


    linker = new DocLinker(root.comments);
    comments = root.comments.filter(opt && opt.isDocComment ? opt.isDocComment : isDocComment);
    commentsLen = comments.length;

    // Do nothing if no comments
    if (commentsLen <= 0) {
      return;
    }

    currentCommentIdx = 0;

    estraverse.traverse(root, {
      enter: function(currentNode, parentNode) {
        var currentNodeStart,
            currentNodeEnd,
            prevComment;

        currentNodeStart = currentNode.range[0];
        currentNodeEnd = currentNode.range[1];
        currentComment = comments[currentCommentIdx];

        // Check the AST node type can be linked.
        if (LinkasbleSyntax[currentNode.type] || parentNode && (parentNode.type === 'ArrayExpression' || parentNode.type === 'ReturnStatement')) {
          // The last doc comment should link to a symbol, the others should not
          // be linked.
          //
          // Example:
          //   /** It should NOT be linked. */
          //   /** It should be linked. */
          //   expr;
          while (currentComment && currentComment.range[1] <= currentNodeStart) {
            if (prevComment) {
              linker.link(prevComment, null, parentNode);
            }
            prevComment = currentComment;
            currentComment = comments[++currentCommentIdx];
          }

          // Assigned prevcomment means that some comment is put before the node.
          if (prevComment) {
            linker.link(prevComment, currentNode, parentNode);
          }

          // Do nothing if no comments to link
          if (!currentComment) {
            return BREAK;
          }
        }

        // Skip children of the node if any comment is not put in the node.
        if (currentNodeEnd < currentComment.range[0]) {
          return SKIP;
        }
      }
    });

    // Make first doc comment be file doc comment.
    if (opt && opt.fileDoc) {
      this.links[0].target = root;
    }

    return linker;
  }


  exports.LinkasbleSyntax = LinkasbleSyntax;
  exports.DocLink = DocLink;
  exports.DocLinker = DocLinker;
  exports.analyze = analyze;
}, this));
