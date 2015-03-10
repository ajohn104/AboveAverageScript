Scanner = require('./newscanner');
var scan = Scanner.scan;
var parseTokensToStringFull = Scanner.parseTokensToStringFull;
var parseTokensToStringPretty = Scanner.parseTokensToStringPretty;
var parseTokensToStringBest = Scanner.parseTokensToStringBest;
var parseTokensToStringSpacially = Scanner.parseTokensToStringSpacially;

var files = ["./examples/HelloIndents.avg", "./examples/UnpacksConsumersInlines.avg"];

var arguments = [];
for(var i = 2; i < process.argv.length; i++) {
    arguments.push(process.argv[i]);
}
var printFunction = parseTokensToStringBest;

// I'm adding this code so I can add more arguments
// in the future. Defaults to parseTokensToStringFull.
for(j in arguments) {
    switch(arguments[j]) {
        case "-p":
            printFunction = parseTokensToStringPretty;
            break;
        case "-f":
            printFunction = parseTokensToStringFull;
            break;
        case "-b":
            printFunction = parseTokensToStringBest;
            break;
        case "-s":
            printFunction = parseTokensToStringSpacially;
    }
}

var test = function(file) {
    scan(file, function(parseTokens) {
        console.log(printFunction(parseTokens));
    });
};

test(files[0]);
