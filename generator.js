require('./language/implattempts/native');
var fs = require('fs');

var generate = function(program, compileTarget) {
    var compileDest;
    var doTest = false;

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
        }
    };

    var writeImmediately = function(buffer) {
        fs.appendFileSync(compileDest, buffer);
    };

    var testFile = function() {
        if(doTest) {
            require(compileDest);
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

    var scope = {
        indent: "    ",
        clone: function() {
            return Object.create(this);
        },
        writeImmediately: writeImmediately,
        pause: function() {
            isOwned = true;
        },
        resume: function() {
            for(var i = 0; i < writeBuffer.length; i++) {
                writeImmediately(writeBuffer[i]);
            }
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
        }
    };

    initiateFile();
    program.compile(write, scope, 0, 0);
    testFile();
};


var Generator = {
    generate: generate
};
module.exports = Generator;