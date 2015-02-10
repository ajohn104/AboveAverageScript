Scanner = require('./scanner');
var scan = Scanner.scan;
var tokensToString = Scanner.tokensToString;

var files = ["./examples/HelloWorld.avg"];



var test = function(file) {
    var scanResults = scan(file, function(tokens) {
        console.log(tokensToString(tokens));
    });
}

test(files[0]);