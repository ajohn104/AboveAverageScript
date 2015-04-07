var envir = {};
envir.Block = require('./types/Block');                             
envir.Stmt = require("./types/Stmt");
envir.DeclareStmt = require("./types/DeclareStmt");
envir.AssignStmt = require("./types/AssignStmt");
envir.ConsumeStmt = require("./types/ConsumeStmt");
envir.ReturnStmt = require("./types/ReturnStmt");
envir.ControlStmt = require("./types/ControlStmt");
envir.IfStmt = require("./types/IfStmt");
envir.Loop = require("./types/Loop");
envir.WhileLoop = require("./types/WhileLoop");
envir.DoWhile = require("./types/DoWhile");
envir.While = require("./types/While");
envir.ForLoop = require("./types/ForLoop");
envir.ForIn = require("./types/ForIn");
envir.ForColon = require("./types/ForColon");
envir.For = require("./types/For");
envir.SwitchStmt = require("./types/SwitchStmt");
envir.Case = require("./types/Case");
envir.Default = require("./types/Default");
envir.NativeStmt = require("./types/NativeStmt");
envir.Exp = require("./types/Exp");
envir.Exp1 = require("./types/Exp1");
envir.Exp2 = require("./types/Exp2");
envir.Exp3 = require("./types/Exp3");
envir.Exp4 = require("./types/Exp4");
envir.Exp5 = require("./types/Exp5");
envir.Exp6 = require("./types/Exp6");
envir.Exp7 = require("./types/Exp7");
envir.Exp8 = require("./types/Exp8");
envir.Exp9 = require("./types/Exp9");
envir.Exp10 = require("./types/Exp10");
envir.Exp11 = require("./types/Exp11");
envir.Exp12 = require("./types/Exp12");
envir.Exp13 = require("./types/Exp13");
envir.Exp14 = require("./types/Exp14");
envir.Exp15 = require("./types/Exp15");
envir.Exp16 = require("./types/Exp16");
envir.Exp17 = require("./types/Exp17");
envir.Exp18 = require("./types/Exp18");
envir.BoolLit = require("./types/BoolLit");
envir.IntLit = require("./types/IntLit");
envir.StringLit = require("./types/StringLit");
envir.Func = require("./types/Func");
envir.ObjectInline = require("./types/ObjectInline");
envir.Prop = require("./types/Prop");
envir.PropInd = require("./types/PropInd");
envir.ArrayLit = require("./types/ArrayLit");
envir.ArrayCont = require("./types/ArrayCont");
envir.AssignOp = require("./types/AssignOp");
envir.EqualOp = require("./types/EqualOp");
envir.CompareOp = require("./types/CompareOp");
envir.ShiftOp = require("./types/ShiftOp");
envir.AddOp = require("./types/AddOp");
envir.MulOp = require("./types/MulOp");
envir.PrefixOp = require("./types/PrefixOp");
envir.PostfixOp = require("./types/PostfixOp");
envir.Call = require("./types/Call");
envir.Id = require("./types/Id");
envir.This = require("./types/This");
envir.Newline = require("./types/Newline");
envir.Indent = require("./types/Indent");
envir.Dedent = require("./types/Dedent");
envir.RegExpLit = require("./types/RegExpLit");
envir.EndOfFile = require("./types/EndOfFile");
envir.ExpList = require("./types/ExpList");
envir.SetAssign = require("./types/SetAssign");
envir.SetEqual = require("./types/SetEqual");
envir.ObjInd = require("./types/ObjInd");

envir.Lexeme = require("./types/Lexeme")(envir);
envir.inIndented = false;
envir.indentedExp = [];

envir.last = null;
envir.indents = function(indents) {
    var str = "";
    for(var i = 0; i < indents; i++) {
        str += "  ";
    }
    return str;
};

var callback = undefined;
var error = undefined;
var debugMode = false;
var outputTree = false;

var debug = null;

var parse = function(tkns, call, err, dbgMode, tree) {
    debugMode = (typeof dbgMode !== "undefined")?(dbgMode):(false);
    debug = debugMode?(function(output){
        console.log(output);
    }):(function(output){});
    outputTree = tree;
    var parser = new tokenStreamParser(tkns, call, err);
    return parser.parseProgram();
};

var tokenStreamParser = function(tkns, call, err) {
    callback = call;
    error = err;
    envir.parseTokens = tkns;
    envir.index = 0;

    envir.checkIndent = function() {
        if(envir.inIndented) {
            at(envir.Newline);
        } else {
            envir.inIndented = at(envir.Indent);
            if(envir.inIndented) {
                at(envir.Newline);
            }
        }
    };

    // Array type check thanks to user113716 from StackOverflow
    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    envir.isArray = isArray;

    var at = function(expected) {
        if(isArray(expected)) {
            for(var i = 0; i < expected.length; i++) {
                if(at(expected[i])) return true;
            }
            return false;
        }
        if(typeof expected === 'string') {
            return envir.Lexeme(expected).is(at, next, envir, debug);
        }
        return expected.is(at, next, envir, debug);
    };

    var next = function(expected) {
        var indexBefore = envir.index;
        var found = at(expected);
        envir.index = indexBefore;
        return found;
    };

    this.parseProgram = function() {
        var entity = new Program();
        if(!at(envir.Stmt)) {
            error(envir.parseTokens[envir.index]);
            return false;
        }
        entity.stmt = envir.last;
        if(!at(envir.Block)) {
            error(envir.parseTokens[envir.index]);
            return false;
        };
        entity.block = envir.last;
        debug("End of program block");
        if(!at(envir.EndOfFile)) {
            error(envir.parseTokens[envir.index]);
            return false;
        }
        if(outputTree) {
            console.log(entity.toString(0, 0));
        }
        return true;
    };

    var Program = function() {
        this.stmt = null;
        this.block = null;
        this.toString = function(indentlevel, indLvlHidden) {
            indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
            var indents = envir.indents(indentlevel);
            var out = indents + "Program ->\n";
            out += this.stmt.toString(indentlevel + 1, indLvlHidden + 1);
            out += this.block.toString(indentlevel + 1, indLvlHidden + 1);
            return out;
        };
    };
};

var Parser = {
    parse: parse
}

module.exports = Parser;