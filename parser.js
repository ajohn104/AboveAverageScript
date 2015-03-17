var envir = {};
envir.Block = require('./types/Block');          
envir.Stmt = require("./types/Stmt");
envir.ObjIndentDecl = require("./types/ObjIndentDecl");
envir.ObjIndentAssign = require("./types/ObjIndentAssign");
envir.DeclareStmt = require("./types/DeclareStmt");
envir.SetStmt = require("./types/SetStmt");
envir.AssignStmt = require("./types/AssignStmt");
envir.ConsumeStmt = require("./types/ConsumeStmt");
envir.ReturnStmt = require("./types/ReturnStmt");
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
envir.Defaults = require("./types/Default");
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
envir.Property = require("./types/Property");
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
envir.ObjIndentPropAssign = require("./types/ObjIndentPropAssign");


var callback = undefined;
var error = undefined;
var debugMode = false;

var debug = null;

var parse = function(tkns, call, err, dbgMode) {
    debugMode = (typeof dbgMode !== "undefined")?(dbgMode):(false);
    debug = debugMode?(function(output){
        console.log(output);
        
    }):(function(output){});
    var parser = new tokenStreamParser(tkns, call, err);
    return parser.parseProgram();
};

var tokenStreamParser = function(tkns, call, err) {
    callback = call;
    error = err;

    var parseTokens = tkns;
    envir.index = 0;

    var at = function(type) {
        return type.is(at, parseTokens, envir, debug);
    };

    this.parseProgram = function() {
        if(!at(envir.Stmt)) {
            error(parseTokens[envir.index]);
            return false;
        }
        if(!at(envir.Block)) {
            error(parseTokens[envir.index]);
            return false;
        };
        debug("End of program block");
        
        if(!at(envir.EndOfFile)) {
            error(parseTokens[envir.index]);
            return false
        }
        return true;
    };
};

var Parser = {
    parse: parse
}

module.exports = Parser;