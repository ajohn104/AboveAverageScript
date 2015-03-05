Scanner = require('./newscanner');
var scan = Scanner.scan;
Parser = require('./parser');
var parse = Parser.parse;

compile(files[0]);

var compile = function(file) {
    scan(file, scanCallback);
};

var scanCallback = function(tokens) {
    parse(tokens, parseCallback);
};

var parseCallback = function(stuff) {
    console.log(stuff);
};