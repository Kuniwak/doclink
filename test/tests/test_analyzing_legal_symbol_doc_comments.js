// This script licensed under the MIT.
// http://orgachem.mit-license.org


var doclink = require('../../doclink.js');

var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var fs = require('fs');
var esprima = require('esprima');

const LEGAL_DOC_COMMENTS_PATH = path.resolve(module.filename, '../../fixtures/legal_symbol_doc_comments.js');

describe('doclink', function() {
  describe('#analyze()', function() {
    var legal,
        ast,
        links;

    legal = fs.readFileSync(LEGAL_DOC_COMMENTS_PATH);
    ast = esprima.parse(legal, { comment: true, range: true });
    links = doclink.analyze(ast).links;

    it('should get 27 doc links by the fixture', function() {
      expect(links).to.have.length(27);
    });

    it('should get a doc link to a variable declaration', function() {
      var link = links[0];
      expect(link).to.have.deep.property('target.type','VariableDeclaration');
      expect(link).to.have.deep.property('comment.value', '*varDecl');
      expect(link).to.have.deep.property('context.type', 'Program');
    });

    it('should get a doc link to a constant declaration', function() {
      var link = links[1];
      expect(link).to.have.deep.property('target.type', 'VariableDeclaration');
      expect(link).to.have.deep.property('comment.value', '*constDecl');
      expect(link).to.have.deep.property('context.type', 'Program');
    });

    it('should get a doc link to a let declaration', function() {
      var link = links[2];
      expect(link).to.have.deep.property('target.type', 'VariableDeclaration');
      expect(link).to.have.deep.property('comment.value', '*letDecl');
      expect(link).to.have.deep.property('context.type', 'Program');
    });

    it('should get a doc link to a function declaration', function() {
      var link = links[3];
      expect(link).to.have.deep.property('target.type', 'FunctionDeclaration');
      expect(link).to.have.deep.property('comment.value', '*funcDecl');
      expect(link).to.have.deep.property('context.type', 'Program');
    });

    it('should get a doc link to a call expression', function() {
      var link = links[4];
      expect(link).to.have.deep.property('target.type', 'CallExpression');
      expect(link).to.have.deep.property('comment.value', '*objDefProp');
      expect(link).to.have.deep.property('context.type', 'ExpressionStatement');
    });

    it('should get a doc link to a member expression', function() {
      var link = links[5];
      expect(link).to.have.deep.property('target.type', 'MemberExpression');
      expect(link).to.have.deep.property('comment.value', '*obj.memExpr');
      expect(link).to.have.deep.property('context.type', 'ExpressionStatement');
    });

    it('should get a doc link to a variable declarator', function() {
      var link = links[6];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*varId');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to the first variable declarator', function() {
      var link = links[7];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*varId1');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to the second variable declarator', function() {
      var link = links[8];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*varId2');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to a constant declarator', function() {
      var link = links[9];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*constId');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to the first constant declarator', function() {
      var link = links[10];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*constId1');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to the second constant declarator', function() {
      var link = links[11];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*constId2');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to a let declarator', function() {
      var link = links[12];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*letId');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to the first let declarator', function() {
      var link = links[13];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*letId1');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to the second let declarator', function() {
      var link = links[14];
      expect(link).to.have.deep.property('target.type', 'VariableDeclarator');
      expect(link).to.have.deep.property('comment.value', '*letId2');
      expect(link).to.have.deep.property('context.type', 'VariableDeclaration');
    });

    it('should get a doc link to a function name identifier in a function declaration', function() {
      var link = links[15];
      expect(link).to.have.deep.property('target.type', 'Identifier');
      expect(link).to.have.deep.property('comment.value', '*funcDeclId');
      expect(link).to.have.deep.property('context.type', 'FunctionDeclaration');
    });

    it('should get a doc link to a function name identifier in a function expression', function() {
      var link = links[16];
      expect(link).to.have.deep.property('target.type', 'Identifier');
      expect(link).to.have.deep.property('comment.value', '*funcExprId');
      expect(link).to.have.deep.property('context.type', 'FunctionExpression');
    });

    it('should get a doc link to a argument name identifier', function() {
      var link = links[17];
      expect(link).to.have.deep.property('target.type', 'Identifier');
      expect(link).to.have.deep.property('comment.value', '*argId');
      expect(link).to.have.deep.property('context.type', 'FunctionExpression');
    });

    it('should get a doc link to the first argument name identifier', function() {
      var link = links[18];
      expect(link).to.have.deep.property('target.type', 'Identifier');
      expect(link).to.have.deep.property('comment.value', '*argId1');
      expect(link).to.have.deep.property('context.type', 'FunctionExpression');
    });

    it('should get a doc link to the second argument name identifier', function() {
      var link = links[19];
      expect(link).to.have.deep.property('target.type', 'Identifier');
      expect(link).to.have.deep.property('comment.value', '*argId2');
      expect(link).to.have.deep.property('context.type', 'FunctionExpression');
    });

    it('should get a doc link to a property', function() {
      var link = links[20];
      expect(link).to.have.deep.property('target.type', 'Property');
      expect(link).to.have.deep.property('comment.value', '*propId');
      expect(link).to.have.deep.property('context.type', 'ObjectExpression');
    });

    it('should get a doc link to the first property', function() {
      var link = links[21];
      expect(link).to.have.deep.property('target.type', 'Property');
      expect(link).to.have.deep.property('comment.value', '*propId1');
      expect(link).to.have.deep.property('context.type', 'ObjectExpression');
    });

    it('should get a doc link to the second property', function() {
      var link = links[22];
      expect(link).to.have.deep.property('target.type', 'Property');
      expect(link).to.have.deep.property('comment.value', '*propId2');
      expect(link).to.have.deep.property('context.type', 'ObjectExpression');
    });

    it('should get a doc link to a property', function() {
      var link = links[23];
      expect(link).to.have.deep.property('target.type', 'Literal');
      expect(link).to.have.deep.property('comment.value', '*0');
      expect(link).to.have.deep.property('context.type', 'ArrayExpression');
    });

    it('should get a doc link to the first property', function() {
      var link = links[24];
      expect(link).to.have.deep.property('target.type', 'Literal');
      expect(link).to.have.deep.property('comment.value', '*0');
      expect(link).to.have.deep.property('context.type', 'ArrayExpression');
    });

    it('should get a doc link to the second property', function() {
      var link = links[25];
      expect(link).to.have.deep.property('target.type', 'Literal');
      expect(link).to.have.deep.property('comment.value', '*1');
      expect(link).to.have.deep.property('context.type', 'ArrayExpression');
    });

    it('should get a doc link to a return statement', function() {
      var link = links[26];
      expect(link).to.have.deep.property('target.type', 'ObjectExpression');
      expect(link).to.have.deep.property('comment.value', '*ret');
      expect(link).to.have.deep.property('context.type', 'ReturnStatement');
    });
  });
});
