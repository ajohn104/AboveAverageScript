Scanner = require('./newscanner');
var scan = Scanner.scan;
var tokensToStringFull = Scanner.tokensToStringFull;
var tokensToStringPretty = Scanner.tokensToStringPretty;

var test = function(file) {
    var scanResults = scan(file, function(tokens) {
        console.log(tokensToStringFull(tokens));
    });
};

test(process.argv[2]);