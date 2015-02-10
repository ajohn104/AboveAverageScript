Scanner = require('./scanner');
var scan = Scanner.scan;
var tokensToString = Scanner.tokensToString;

var test = function(file) {
    var scanResults = scan(file, function(tokens) {
        console.log(tokensToString(tokens));
    });
};

test(process.argv[2]);