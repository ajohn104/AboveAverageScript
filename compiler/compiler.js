Scanner = require('./newscanner');
var scan = Scanner.scan;
Parser = require('./parser');
var parse = Parser.parse;

var files = ["./examples/HelloIndents.avg", "./examples/UnpacksConsumersInlines.avg"];



var compile = function(file) {
    scan(file, scanCall);
};

var scanCall = function(tokens) {
    parse(tokens, parseCall, parseError);
};

var parseCall = function(stuff) {
    console.log(stuff);
};

var parseError = function(stuff) {
    console.error("Error token:");
    console.error(stuff);
}

compile(files[1]);