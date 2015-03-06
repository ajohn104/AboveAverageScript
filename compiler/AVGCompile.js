Scanner = require('./newscanner');
var scan = Scanner.scan;
var parseTokensToStringFull = Scanner.parseTokensToStringFull;
var parseTokensToStringPretty = Scanner.parseTokensToStringPretty;

var test = function(file) {
    var scanResults = scan(file, function(parseTokens) {
        console.log(parseTokensToStringFull(parseTokens));
    });
};

test(process.argv[2]);