Block = require('./types/Block');          
Stmt = require("./types/Stmt");
ObjIndentDecl = require("./types/ObjIndentDecl");
ObjIndentAssign = require("./types/ObjIndentAssign");
DeclareStmt = require("./types/DeclareStmt");
SetStmt = require("./types/SetStmt");
AssignStmt = require("./types/AssignStmt");
ConsumeStmt = require("./types/ConsumeStmt");
IfStmt = require("./types/IfStmt");
Loop = require("./types/Loop");
WhileLoop = require("./types/WhileLoop");
DoWhile = require("./types/DoWhile");
While = require("./types/While");
ForLoop = require("./types/ForLoop");
ForIn = require("./types/ForIn");
ForColon = require("./types/ForColon");
For = require("./types/For");
Assignable = require("./types/Assignable");
SwitchStmt = require("./types/SwitchStmt");
Case = require("./types/Case");
NativeStmt = require("./types/NativeStmt");
Exp = require("./types/Exp");
Exp1 = require("./types/Exp1");
Exp2 = require("./types/Exp2");
Exp3 = require("./types/Exp3");
Exp4 = require("./types/Exp4");
Exp5 = require("./types/Exp5");
Exp6 = require("./types/Exp6");
Exp7 = require("./types/Exp7");
Exp8 = require("./types/Exp8");
Exp9 = require("./types/Exp9");
Exp10 = require("./types/Exp10");
Exp11 = require("./types/Exp11");
Exp12 = require("./types/Exp12");
Exp13 = require("./types/Exp13");
Exp14 = require("./types/Exp14");
Exp15 = require("./types/Exp15");
Exp16 = require("./types/Exp16");
Exp17 = require("./types/Exp17");
Exp18 = require("./types/Exp18");
BoolLit = require("./types/BoolLit");
Intlit = require("./types/Intlit");
StringLit = require("./types/StringLit");
Func = require("./types/Func");
ObjectInline = require("./types/ObjectInline");
Property = require("./types/Property");
ArrayLit = require("./types/ArrayLit");
ArrayCont = require("./types/ArrayCont");
AssignOp = require("./types/AssignOp");
EqualOp = require("./types/EqualOp");
CompareOp = require("./types/CompareOp");
ShiftOp = require("./types/ShiftOp");
AddOp = require("./types/AddOp");
MulOp = require("./types/MulOp");
PrefixOp = require("./types/PrefixOp");
PostfixOp = require("./types/PostfixOp");
Call = require("./types/Call");
Id = require("./types/Id");
This = require("./types/This");
Newline = require("./types/Newline");
Indent = require("./types/Indent");
Dedent = require("./types/Dedent");


parseTokens = [];
index = 0;
parseCont = true;
expect = function(type) {
    return type.is();
};
check = function(isExpected) {
    if(isExpected) {
        parseCont = true;
    } else {
        error(parseTokens[index]);
        parseCont = false;
    }
};

callback = undefined;
error = undefined;

var parse = function(tokens, call, err) {
    var parser = new TokenStreamParser(tokens, call, err);
    return parser.parseProgram();
};

var TokenStreamParser = function(tkns, call, err) {
    parseTokens = tkns;
    callback = call;
    error = err;
    var parseProgram = function() {
        if(parseCont) check(expect(Stmt));
        if(parseCont) check(expect(Block));
        if(parseCont) check(expect(Newline));
        return parseCont;
    };
};



var Parser = {
    parse: parse,
    tokensToStringFull: tokensToStringFull,
    tokensToStringPretty: tokensToStringPretty,
    tokensToStringBest: tokensToStringBest,
    tokensToStringSpacially: tokensToStringSpacially
}

module.exports = Parser;