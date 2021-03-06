var Scanner = require('./scanner');
var scan = Scanner.scan;
var Parser = require('./parser');
var parse = Parser.parse;
var Generator = require('./generator');
var generate = Generator.generate;

var files = ["./examples/HelloIndents.avg", "./examples/UnpacksConsumersInlines.avg", "./examples/arrow_sign.avg", "./examples/testCases.avg",
    "./examples/syntaxTests.avg", "./language/scratch/syntaxFix.avg"];

var file = files[1];  

var compile = function(fileName, finalCall) {
    scan(fileName, scanCall);
};

var debugParse = false;
var displayValid = false;
var displayTree = false;
var generateCode = false;
var runCode = false;
var runArgs = "";
var scanCall = function(tokens) {
    if(tokens) {
        var result = parse(tokens, debugParse, displayTree);
        var isValidProgram = typeof result === 'object';
        if(generateCode && isValidProgram) generate(result, file, runCode, runArgs);
        finalCallBack(isValidProgram);
    }
};

var readStdIn = function(args) {
    if(args.indexOf('-compile') < 0) {
        return;
    }
    
    var run = false;
    var arguments = [];
    for(var i = 2; i < args.length; i++) {
        arguments.push(args[i]);
    }
    var fileNames = [];
    for(i in arguments) {
        var argument = arguments[i];
        if(argument.search(/^-compile$/) >= 0) {
            run = true;
            continue;
        }
        if(argument.search(/^-valid$/) >= 0) {
            displayValid = true;
            continue;
        }
        if(argument.search(/^-build$/) >= 0) {
            generateCode = true;
            continue;
        }
        if(argument.search(/^\-run(\:.*)?$/) >= 0) {
            runArgs = argument.substring(5).split(' ');
            runCode = true;
            continue;
        }
        if(argument.search(/^\-file\:\d+$/) >= 0) {
            var index = argument.substring(6);
            file = files[index];
            continue;
        } else if(argument.search(/^\-file\:(\.{1,2}\/(\w+\/)*)?\w+\.\w+$/) >= 0) {
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
        if(argument.search(/^-parse(:\w+)?$/) >= 0) {
            var debug = argument.substring(7);
            if(debug === "debug") {
                debugParse = true;
            }
        }
        if(argument.search(/^-tree$/) >= 0) {
            displayTree = true;
        }
        
    }
    if(run) compile(file);
};

readStdIn(process.argv);

var finalCallBack = function(valid){
    if(displayValid) {
        console.log("file: " + file);
        console.log("IsValid: " + valid)
    }
};

module.exports = function(file, finalCall) {
    finalCallBack = (typeof finalCall !== "undefined")?finalCall:finalCallBack;
    compile(file);
};
