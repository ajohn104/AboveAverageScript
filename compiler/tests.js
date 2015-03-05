Scanner = require('./newscanner');
var scan = Scanner.scan;
var tokensToStringFull = Scanner.tokensToStringFull;
var tokensToStringPretty = Scanner.tokensToStringPretty;
var tokensToStringBest = Scanner.tokensToStringBest;
var tokensToStringSpacially = Scanner.tokensToStringSpacially;

var files = ["./examples/HelloIndents.avg", "./examples/UnpacksConsumersInlines.avg"];

var arguments = [];
for(var i = 2; i < process.argv.length; i++) {
    arguments.push(process.argv[i]);
}
var printFunction = tokensToStringBest;

// I'm adding this code so I can add more arguments
// in the future. Defaults to tokensToStringFull.
for(j in arguments) {
    switch(arguments[j]) {
        case "-p":
            printFunction = tokensToStringPretty;
            break;
        case "-f":
            printFunction = tokensToStringFull;
            break;
        case "-b":
            printFunction = tokensToStringBest;
            break;
        case "-s":
            printFunction = tokensToStringSpacially;
    }
}

var test = function(file) {
    var scanResults = scan(file, function(tokens) {
        console.log(printFunction(tokens));
    });
};

test(files[0]);
