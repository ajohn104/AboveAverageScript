Scanner = require('./newscanner');
var scan = Scanner.scan;
Parser = require('./parser');
var parse = Parser.parse;

var files = ["./examples/HelloIndents.avg", "./examples/UnpacksConsumersInlines.avg", "./examples/arrow_sign.avg"];

var file = files[1];

var compile = function(fileName) {
    scan(fileName, scanCall);
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

var readStdIn = function(args) {
    var arguments = [];
    for(var i = 2; i < args.length; i++) {
        arguments.push(args[i]);
    }
    var fileNames = [];
    for(i in arguments) {
        var argument = arguments[i];
        if(argument.search(/^\-file\:\d+$/) >= 0) {
            var index = argument.substring(6);
            file = files[index];
            continue;
        }
        if(argument.search(/^\-file\:(\.{1,2}\/(\w+\/)*)?\w+\.\w+$/) >= 0) {
            file = argument.substring(6);
            continue;
        }
        if(argument.search(/^-scan(:\w+)?$/) >= 0) {
            var call = argument.substring(6);
            var toStringFunction;
            switch(call) {
                case "p":
                    toStringFunction = Scanner.parseTokensToStringPretty;
                    break;
                case "f":
                    toStringFunction = Scanner.parseTokensToStringFull;
                    break;
                case "b":
                    toStringFunction = Scanner.parseTokensToStringBest;
                    break;
                case "s":
                    toStringFunction = Scanner.parseTokensToStringSpacially;
                    break;
                default:
                    toStringFunction = Scanner.parseTokensToStringBest;
            }
            scanCall = function(tokens) {
                console.log(toStringFunction(tokens));
            };
        }
    }
};



readStdIn(process.argv);
compile(file);





//compile(files[1]);