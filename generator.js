require('./language/implattempts/native');
var fs = require('fs');

var generate = function(program, compileTarget, runFile, runArgs) {
    var compileDest;
    var doTest = defaults(runFile, false);
    var runArgs = !isUndef(runArgs)?runArgs: "";

    var initiateFile = function() {
        compileDest = compileTarget.match(/^.*(?=\.avg)/)[0] + '.js';
        if(compileDest.match(/^[^\/]*$/)) {
            compileDest = './' + compileDest;
        }
        fs.writeFileSync(compileDest, '');
    };

    var isOwned = false;
    var writeBuffer = [];

    var write = function(buffer) {
        if(!isOwned) {
            fs.appendFileSync(compileDest, buffer);
        } else {
            writeBuffer.push(buffer);
            writeBufferEmpty = false;
        }
        scope.checkCompletion();
    };

    var writeImmediately = function(buffer) {
        fs.appendFileSync(compileDest, buffer);
    };

    var testFile = function() {
        if(doTest) {
            //log(runArgs);
            var args = runArgs.split(' '); // <- This is wrong. It really should ignore escaped spaces and quoted ones. Basically,
            // it needs to behave just like node works. However, it would be a lot easier to just make a separate file to use
            // when we intend to compile files and run them. Just let this be the debugger. Alternately, I could just use exec to
            // run a script with the given arguments and let it give me back the arguments in an array. Probably terrible coding
            // technique, but it really wouldn't be too inefficient. Honestly. Yeah, it seems like the regex would suck. So screw it.
            // I'll just use the 'true' compiler for compilation.
            process.argv = ['node', compileDest].concat(args);
            require(compileDest);     // How to use exec with stdin??? -- Never mind, require is god child. Almost.
        }
    };

    var usedIds = [];
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var randIn = function(obj) {        
        return obj[rand(len(obj))];
    };

    var rand = function(max) {
        return Math.floor(Math.random()*max);
    };

    var nativeComplete = false;
    var writeBufferEmpty = false;

    var scope = {
        indent: "    ",
        clone: function() {
            var copy = Object.create(this);
            copy.nameMap = Object.create(this.nameMap);
            Object.keys(this.nameMap).forEach(function(key, index) {
                copy.nameMap[key] = this.nameMap[key];
            });
            return copy;
        },
        writeImmediately: writeImmediately,
        pause: function() {
            isOwned = true;
        },
        resume: function() {
            nativeComplete = true;
            for(var i = 0; i < writeBuffer.length; i++) {
                writeImmediately(writeBuffer[i]);
            }
            writeBufferEmpty = true;
            this.checkCompletion();
            //log('scope.nativeComplete = ' + nativeComplete);
            isOwned = false;
        },
        ind: function(indents) {
            var str = "";
            for(var i = 0; i < indents; i++) {
                str += this.indent;
            }
            return str;
        },
        nextId: function() {
            var id;
            while(usedIds.indexOf(id = this.randId()) >= 0);
            return id;
        },
        randId: function() {
            var id = "";
            // id += rand(10); :/ I wanted license plate variables, but I can't start them with numbers...
            for(var i = 0; i < 3; i++) {
                id += randIn(alphabet);
            }
            for(var j = 0; j < 3; j++) {
                id += rand(10);
            }
            return id;
        },
        allStatementsCompleted: false,
        checkCompletion: function() {
            if(this.allStatementsCompleted && writeBufferEmpty && nativeComplete) {
                testFile();
            }
        },
        nameMap: { },
        identify: function(target, newName) {
            if(isUndef(newName)) {
                return this.nameMap[target];
            }
            if(usedIds.indexOf(newName) < 0) {
                usedIds.push(newName);
            }
            this.nameMap[target] = newName;
        }
    };

    initiateFile();
    program.compile(write, scope, 0, 0);
};


var Generator = {
    generate: generate
};
module.exports = Generator;