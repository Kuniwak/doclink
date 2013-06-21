// This script licensed under the MIT.
// http://orgachem.mit-license.org


var doclink = require('../../doclink.js');

var chai = require('chai');
var expect = chai.expect;

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

    it('should get 27 doc links by the fixture', function() {
      expect(links.length).to.equal(27);
    });

    it('should get a doc link to a variable declaration', function() {
      var link = links[0];
      expect(link.target.type).to.equal('VariableDeclaration');
      expect(link.comment.value).to.equal('*varDecl');
      expect(link.context.type).to.equal('Program');
    });

    it('should get a doc link to a constant declaration', function() {
      var link = links[1];
      expect(link.target.type).to.equal('VariableDeclaration');
      expect(link.comment.value).to.equal('*constDecl');
      expect(link.context.type).to.equal('Program');
    });

    it('should get a doc link to a let declaration', function() {
      var link = links[2];
      expect(link.target.type).to.equal('VariableDeclaration');
      expect(link.comment.value).to.equal('*letDecl');
      expect(link.context.type).to.equal('Program');
    });

    it('should get a doc link to a function declaration', function() {
      var link = links[3];
      expect(link.target.type).to.equal('FunctionDeclaration');
      expect(link.comment.value).to.equal('*funcDecl');
      expect(link.context.type).to.equal('Program');
    });

    it('should get a doc link to a call expression', function() {
      var link = links[4];
      expect(link.target.type).to.equal('CallExpression');
      expect(link.comment.value).to.equal('*objDefProp');
      expect(link.context.type).to.equal('ExpressionStatement');
    });

    it('should get a doc link to a member expression', function() {
      var link = links[5];
      expect(link.target.type).to.equal('MemberExpression');
      expect(link.comment.value).to.equal('*obj.memExpr');
      expect(link.context.type).to.equal('ExpressionStatement');
    });

    it('should get a doc link to a variable declarator', function() {
      var link = links[6];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*varId');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to the first variable declarator', function() {
      var link = links[7];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*varId1');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to the second variable declarator', function() {
      var link = links[8];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*varId2');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to a constant declarator', function() {
      var link = links[9];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*constId');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to the first constant declarator', function() {
      var link = links[10];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*constId1');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to the second constant declarator', function() {
      var link = links[11];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*constId2');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to a let declarator', function() {
      var link = links[12];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*letId');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to the first let declarator', function() {
      var link = links[13];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*letId1');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to the second let declarator', function() {
      var link = links[14];
      expect(link.target.type).to.equal('VariableDeclarator');
      expect(link.comment.value).to.equal('*letId2');
      expect(link.context.type).to.equal('VariableDeclaration');
    });

    it('should get a doc link to a function name identifier in a function declaration', function() {
      var link = links[15];
      expect(link.target.type).to.equal('Identifier');
      expect(link.comment.value).to.equal('*funcDeclId');
      expect(link.context.type).to.equal('FunctionDeclaration');
    });

    it('should get a doc link to a function name identifier in a function expression', function() {
      var link = links[16];
      expect(link.target.type).to.equal('Identifier');
      expect(link.comment.value).to.equal('*funcExprId');
      expect(link.context.type).to.equal('FunctionExpression');
    });

    it('should get a doc link to a argument name identifier', function() {
      var link = links[17];
      expect(link.target.type).to.equal('Identifier');
      expect(link.comment.value).to.equal('*argId');
      expect(link.context.type).to.equal('FunctionExpression');
    });

    it('should get a doc link to the first argument name identifier', function() {
      var link = links[18];
      expect(link.target.type).to.equal('Identifier');
      expect(link.comment.value).to.equal('*argId1');
      expect(link.context.type).to.equal('FunctionExpression');
    });

    it('should get a doc link to the second argument name identifier', function() {
      var link = links[19];
      expect(link.target.type).to.equal('Identifier');
      expect(link.comment.value).to.equal('*argId2');
      expect(link.context.type).to.equal('FunctionExpression');
    });

    it('should get a doc link to a property', function() {
      var link = links[20];
      expect(link.target.type).to.equal('Property');
      expect(link.comment.value).to.equal('*propId');
      expect(link.context.type).to.equal('ObjectExpression');
    });

    it('should get a doc link to the first property', function() {
      var link = links[21];
      expect(link.target.type).to.equal('Property');
      expect(link.comment.value).to.equal('*propId1');
      expect(link.context.type).to.equal('ObjectExpression');
    });

    it('should get a doc link to the second property', function() {
      var link = links[22];
      expect(link.target.type).to.equal('Property');
      expect(link.comment.value).to.equal('*propId2');
      expect(link.context.type).to.equal('ObjectExpression');
    });

    it('should get a doc link to a property', function() {
      var link = links[23];
      expect(link.target.type).to.equal('Literal');
      expect(link.comment.value).to.equal('*0');
      expect(link.context.type).to.equal('ArrayExpression');
    });

    it('should get a doc link to the first property', function() {
      var link = links[24];
      expect(link.target.type).to.equal('Literal');
      expect(link.comment.value).to.equal('*0');
      expect(link.context.type).to.equal('ArrayExpression');
    });

    it('should get a doc link to the second property', function() {
      var link = links[25];
      expect(link.target.type).to.equal('Literal');
      expect(link.comment.value).to.equal('*1');
      expect(link.context.type).to.equal('ArrayExpression');
    });

    it('should get a doc link to a return statement', function() {
      var link = links[26];
      expect(link.target.type).to.equal('ObjectExpression');
      expect(link.comment.value).to.equal('*ret');
      expect(link.context.type).to.equal('ReturnStatement');
    });
  });
});
