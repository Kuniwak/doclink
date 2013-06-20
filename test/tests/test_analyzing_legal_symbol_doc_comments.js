// This script licensed under the MIT.
// http://orgachem.mit-license.org


var doclink = require('../../doclink.js');

var path = require('path');
var fs = require('fs');
var esprima = require('esprima');

const LEGAL_DOC_COMMENTS_PATH = path.join(module.filename, '../../fixtures/legal_symbol_doc_comments.js');

module.exports = {
  'Test analyzing legal doc comments': function(test) {
    var legal = fs.readFileSync(LEGAL_DOC_COMMENTS_PATH);
    var ast = esprima.parse(legal, { comment: true, range: true });

    var target, i = 0;
    var links = doclink.analyze(ast).links;

    test.equals(links.length, 27);

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclaration');
    test.equals('*varDecl', link.comment.value);
    test.equals(link.context.type, 'Program');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclaration');
    test.equals('*constDecl', link.comment.value);
    test.equals(link.context.type, 'Program');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclaration');
    test.equals('*letDef', link.comment.value);
    test.equals(link.context.type, 'Program');

    link = links[i++];
    test.equals(link.target.type, 'FunctionDeclaration');
    test.equals('*funcDecl', link.comment.value);
    test.equals(link.context.type, 'Program');

    link = links[i++];
    test.equals(link.target.type, 'CallExpression');
    test.equals('*objDefProp', link.comment.value);
    test.equals(link.context.type, 'ExpressionStatement');

    link = links[i++];
    test.equals(link.target.type, 'MemberExpression');
    test.equals('*obj.memExpr', link.comment.value);
    test.equals(link.context.type, 'ExpressionStatement');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*varId', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*varId1', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*varId2', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*constId', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*constId1', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*constId2', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*letId', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*letId1', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclarator');
    test.equals('*letId2', link.comment.value);
    test.equals(link.context.type, 'VariableDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*funcDeclId', link.comment.value);
    test.equals(link.context.type, 'FunctionDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*funcExprId', link.comment.value);
    test.equals(link.context.type, 'FunctionExpression');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*argId', link.comment.value);
    test.equals(link.context.type, 'FunctionExpression');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*argId1', link.comment.value);
    test.equals(link.context.type, 'FunctionExpression');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*argId2', link.comment.value);
    test.equals(link.context.type, 'FunctionExpression');

    link = links[i++];
    test.equals(link.target.type, 'Property');
    test.equals('*propId', link.comment.value);
    test.equals(link.context.type, 'ObjectExpression');

    link = links[i++];
    test.equals(link.target.type, 'Property');
    test.equals('*propId1', link.comment.value);
    test.equals(link.context.type, 'ObjectExpression');

    link = links[i++];
    test.equals(link.target.type, 'Property');
    test.equals('*propId2', link.comment.value);
    test.equals(link.context.type, 'ObjectExpression');

    link = links[i++];
    test.equals(link.target.type, 'Literal');
    test.equals('*0', link.comment.value);
    test.equals(link.context.type, 'ArrayExpression');

    link = links[i++];
    test.equals(link.target.type, 'Literal');
    test.equals('*0', link.comment.value);
    test.equals(link.context.type, 'ArrayExpression');

    link = links[i++];
    test.equals(link.target.type, 'Literal');
    test.equals('*1', link.comment.value);
    test.equals(link.context.type, 'ArrayExpression');

    test.done();
  }
};
