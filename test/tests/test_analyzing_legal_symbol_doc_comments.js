// This script licensed under the MIT.
// http://orgachem.mit-license.org


var doclink = require('../../doclink.js');

var should = require('should');

var path = require('path');
var fs = require('fs');
var esprima = require('esprima');

const LEGAL_DOC_COMMENTS_PATH = path.join(module.filename, '../../fixtures/legal_symbol_doc_comments.js');

describe('doclink', function() {
  describe('#analyze()', function() {
    var legal,
        ast,
        links;

    legal = fs.readFileSync(LEGAL_DOC_COMMENTS_PATH);
    ast = esprima.parse(legal, { comment: true, range: true });
    links = doclink.analyze(ast).links;

    it('should have 27 doc links by the fixture', function() {
      links.length.should.equal(27);
    });

    it('should get a doc link to a variable declaration', function() {
      var link = links[0];
      link.target.type.should.equal('VariableDeclaration');
      link.comment.value.should.equal('*varDecl');
      link.context.type.should.equal('Program');
    });

    it('should get a doc link to a constant declaration', function() {
      var link = links[1];
      link.target.type.should.equal('VariableDeclaration');
      link.comment.value.should.equal('*constDecl');
      link.context.type.should.equal('Program');
    });

    it('should get a doc link to a let declaration', function() {
      var link = links[2];
      link.target.type.should.equal('VariableDeclaration');
      link.comment.value.should.equal('*letDecl');
      link.context.type.should.equal('Program');
    });

    it('should get a doc link to a function declaration', function() {
      var link = links[3];
      link.target.type.should.equal('FunctionDeclaration');
      link.comment.value.should.equal('*funcDecl');
      link.context.type.should.equal('Program');
    });

    it('should get a doc link to a call expression', function() {
      var link = links[4];
      link.target.type.should.equal('CallExpression');
      link.comment.value.should.equal('*objDefProp');
      link.context.type.should.equal('ExpressionStatement');
    });

    it('should get a doc link to a member expression', function() {
      var link = links[5];
      link.target.type.should.equal('MemberExpression');
      link.comment.value.should.equal('*obj.memExpr');
      link.context.type.should.equal('ExpressionStatement');
    });

    it('should get a doc link to a variable declarator', function() {
      var link = links[6];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*varId');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to the first variable declarator', function() {
      var link = links[7];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*varId1');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to the second variable declarator', function() {
      var link = links[8];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*varId2');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to a constant declarator', function() {
      var link = links[9];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*constId');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to the first constant declarator', function() {
      var link = links[10];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*constId1');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to the second constant declarator', function() {
      var link = links[11];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*constId2');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to a let declarator', function() {
      var link = links[12];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*letId');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to the first let declarator', function() {
      var link = links[13];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*letId1');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to the second let declarator', function() {
      var link = links[14];
      link.target.type.should.equal('VariableDeclarator');
      link.comment.value.should.equal('*letId2');
      link.context.type.should.equal('VariableDeclaration');
    });

    it('should get a doc link to a function name identifier in a function declaration', function() {
      var link = links[15];
      link.target.type.should.equal('Identifier');
      link.comment.value.should.equal('*funcDeclId');
      link.context.type.should.equal('FunctionDeclaration');
    });

    it('should get a doc link to a function name identifier in a function expression', function() {
      var link = links[16];
      link.target.type.should.equal('Identifier');
      link.comment.value.should.equal('*funcExprId');
      link.context.type.should.equal('FunctionExpression');
    });

    it('should get a doc link to a argument name identifier', function() {
      var link = links[17];
      link.target.type.should.equal('Identifier');
      link.comment.value.should.equal('*argId');
      link.context.type.should.equal('FunctionExpression');
    });

    it('should get a doc link to the first argument name identifier', function() {
      var link = links[18];
      link.target.type.should.equal('Identifier');
      link.comment.value.should.equal('*argId1');
      link.context.type.should.equal('FunctionExpression');
    });

    it('should get a doc link to the second argument name identifier', function() {
      var link = links[19];
      link.target.type.should.equal('Identifier');
      link.comment.value.should.equal('*argId2');
      link.context.type.should.equal('FunctionExpression');
    });

    it('should get a doc link to a property', function() {
      var link = links[20];
      link.target.type.should.equal('Property');
      link.comment.value.should.equal('*propId');
      link.context.type.should.equal('ObjectExpression');
    });

    it('should get a doc link to the first property', function() {
      var link = links[21];
      link.target.type.should.equal('Property');
      link.comment.value.should.equal('*propId1');
      link.context.type.should.equal('ObjectExpression');
    });

    it('should get a doc link to the second property', function() {
      var link = links[22];
      link.target.type.should.equal('Property');
      link.comment.value.should.equal('*propId2');
      link.context.type.should.equal('ObjectExpression');
    });

    it('should get a doc link to a property', function() {
      var link = links[23];
      link.target.type.should.equal('Literal');
      link.comment.value.should.equal('*0');
      link.context.type.should.equal('ArrayExpression');
    });

    it('should get a doc link to the first property', function() {
      var link = links[24];
      link.target.type.should.equal('Literal');
      link.comment.value.should.equal('*0');
      link.context.type.should.equal('ArrayExpression');
    });

    it('should get a doc link to the second property', function() {
      var link = links[25];
      link.target.type.should.equal('Literal');
      link.comment.value.should.equal('*1');
      link.context.type.should.equal('ArrayExpression');
    });

    it('should get a doc link to a return statement', function() {
      var link = links[26];
      link.target.type.should.equal('ObjectExpression');
      link.comment.value.should.equal('*ret');
      link.context.type.should.equal('ReturnStatement');
    });
  });
});
