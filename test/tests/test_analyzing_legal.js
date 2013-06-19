// This script licensed under the MIT.
// http://orgachem.mit-license.org


var doclink = require('../../doclink.js');

var fs = require('fs');
var esprima = require('esprima');

module.exports = {
  'Test analyzing legal doc comments': function(test) {
    var legal = fs.readFileSync('../samples/legal.js');
    var ast = esprima.parse(legal, { comment: true, range: true });

    var target, i = 0;
    var links = doclink.analyze(ast).links;

    test.equals(links.length, 27);

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclaration');
    test.equals('*' + link.target.declarations[0].id.name, link.comment.value);
    test.equals(link.context.type, 'Program');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclaration');
    test.equals('*' + link.target.declarations[0].id.name, link.comment.value);
    test.equals(link.context.type, 'Program');

    link = links[i++];
    test.equals(link.target.type, 'VariableDeclaration');
    test.equals('*' + link.target.declarations[0].id.name, link.comment.value);
    test.equals(link.context.type, 'Program');

    link = links[i++];
    test.equals(link.target.type, 'FunctionDeclaration');
    test.equals('*' + link.target.id.name, link.comment.value);
    test.equals(link.context.type, 'Program');

    link = links[i++];
    test.equals(link.target.type, 'CallExpression');
    test.equals('*' + link.target.arguments[1].value, link.comment.value);
    test.equals(link.context.type, 'ExpressionStatement');

    link = links[i++];
    test.equals(link.target.type, 'MemberExpression');
    test.equals('*' + link.target.object.name + '.' + link.target.property.name, link.comment.value);
    test.equals(link.context.type, 'ExpressionStatement');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'VariableDeclarator');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'FunctionDeclaration');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'FunctionExpression');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'FunctionExpression');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'FunctionExpression');

    link = links[i++];
    test.equals(link.target.type, 'Identifier');
    test.equals('*' + link.target.name, link.comment.value);
    test.equals(link.context.type, 'FunctionExpression');

    link = links[i++];
    test.equals(link.target.type, 'Property');
    test.equals('*' + link.target.key.name, link.comment.value);
    test.equals(link.context.type, 'ObjectExpression');

    link = links[i++];
    test.equals(link.target.type, 'Property');
    test.equals('*' + link.target.key.name, link.comment.value);
    test.equals(link.context.type, 'ObjectExpression');

    link = links[i++];
    test.equals(link.target.type, 'Property');
    test.equals('*' + link.target.key.name, link.comment.value);
    test.equals(link.context.type, 'ObjectExpression');

    link = links[i++];
    test.equals(link.target.type, 'Literal');
    test.equals('*' + link.context.elements.indexOf(link.target), link.comment.value);
    test.equals(link.context.type, 'ArrayExpression');

    link = links[i++];
    test.equals(link.target.type, 'Literal');
    test.equals('*' + link.context.elements.indexOf(link.target), link.comment.value);
    test.equals(link.context.type, 'ArrayExpression');

    link = links[i++];
    test.equals(link.target.type, 'Literal');
    test.equals('*' + link.context.elements.indexOf(link.target), link.comment.value);
    test.equals(link.context.type, 'ArrayExpression');

    test.done();
  }
};
