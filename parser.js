var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

var at = function(expected, previous) {
    if(isArray(expected)) {
        for(var i = 0; i < expected.length; i++) {
            if(at(expected[i])) return true;
        }
        return false;
    }
    if(typeof expected === 'string') {
        return env.Lexeme(expected).is(at, next, env, debug);
    }
    return expected.is(previous);
};

var next = function(expected) {
    var indexBefore = env.index;
    var found = at(expected);
    env.index = indexBefore;
    return found;
};

var debug = function() {};

var env = {
    inIndented: false,
    indentedExp: [],
    nativeSpecified: false,
    last: null,
    ind: "  ",
    indents: function(indents) {
        var str = "";
        for(var i = 0; i < indents; i++) {
            str += env.ind;
        }
        return str;
    },
    debug: debug,
    checkIndent: function() {
        if(env.inIndented) {
            at(env.Newline);
        } else {
            env.inIndented = at(env.Indent);
            if(env.inIndented) {
                at(env.Newline);
            }
        }
    },
    isArray: isArray
};

var entityNames = [
    "Block", "Stmt", "DeclareStmt", "AssignStmt", "ConsumeStmt", "ReturnStmt", 
    "ControlStmt", "IfStmt", "Loop", "WhileLoop", "DoWhile", "While", "ForLoop", 
    "ForIn", "ForColon", "For", "SwitchStmt", "Case", "Default", "NativeStmt", 
    "Exp", "Exp1", "Exp2", "Exp3", "Exp4", "Exp5", "Exp6", "Exp7", "Exp8", "Exp9", 
    "Exp10", "Exp11", "Exp12", "Exp13", "Exp14", "Exp15", "Exp16", "Exp17", "Exp18", 
    "BoolLit", "IntLit", "StringLit", "Func", "ObjectInline", "Prop", "PropInd", 
    "ArrayLit", "ArrayCont", "AssignOp", "EqualOp", "CompareOp", "ShiftOp", "AddOp", 
    "MulOp", "PrefixOp", "PostfixOp", "Call", "Id", "This", "Newline", "Indent", 
    "Dedent", "RegExpLit", "EndOfFile", "ExpList", "SetAssign", "SetEqual", "ObjInd"
];



var callback = undefined;
var error = undefined;
var debugMode = false;
var outputTree = false;

var parse = function(tkns, call, err, dbgMode, tree) {
    debugMode = (typeof dbgMode !== "undefined")?(dbgMode):(false);
    debug = debugMode?(function(output){
        console.log(output);
    }):debug;
    env.debug = debug;

    // I would have included Lexeme with the types above and below, but
    // it really isn't a part of the above group and behaves differently.
    env.Lexeme = require("./types/Lexeme")(env, at, next, debug);

    entityNames.forEach(function(name) {
        env[name] = require("./types/" + name)(env, at, next, debug);
    });

    entityNames.forEach(function(name) {
        env[name].loadData();
    });

    outputTree = tree;
    var parser = new tokenStreamParser(tkns, call, err);
    return parser.parseProgram();
};

var tokenStreamParser = function(tkns, call, err) {
    callback = call;
    error = err;
    env.parseTokens = tkns;
    env.index = 0;

    env.checkIndent = function() {
        if(env.inIndented) {
            at(env.Newline);
        } else {
            env.inIndented = at(env.Indent);
            if(env.inIndented) {
                at(env.Newline);
            }
        }
    };

    // Array type check thanks to user113716 from StackOverflow
    

    env.isArray = isArray;

    

    // Program         ::= Stmt (Newline Stmt?)* EOF
    // Yes, I'm aware I could use Block, which is what I had previously. But that would be implying (in my mind, at
    // the very least) that the first Stmt and the following Block are separate, which they aren't. The first Stmt
    // and any following Stmts are all in the same scope, so logically, they shouldn't be separated by an entity.
    this.parseProgram = function() {
        var entity = new Program();
        if(!at(env.Stmt)) {
            error(env.parseTokens[env.index]);
            return false;
        }
        entity.stmts.push(env.last);

        while(at(env.Newline)) {
            if(at(env.Stmt)) {
                debug("Program additional Stmt found.\n");
                entity.stmts.push(env.last);
            }
        }
        debug("Ending Program Newline/Stmt search. Looking for EOF. env.index:" + env.index + " \n");
        debug("Current token is now:");
        debug(env.parseTokens[env.index]);
        debug('\n');

        if(!at(env.EndOfFile)) {
            error(env.parseTokens[env.index]);
            return false;
        }
        if(outputTree) {
            console.log(entity.toString(0, 0));
        }
        entity.nativeSpecified = env.nativeSpecified;
        return entity;
    };

    var Program = function() {
        this.stmts = [];
        this.toString = function(indentlevel, indLvlHidden) {
            indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
            var indents = env.indents(indentlevel);
            var out = indents + "Program -> stmts: [\n";
            for(var i = 0; i < this.stmts.length; i++) {
                out += this.stmts[i].toString(indentlevel + 1, indLvlHidden + 1) + "\n";
            }
            out += indents + "]\n";
            return out;
        };
        this.compile = function(write, scope, indents, indentsHidden) {
            if(!this.nativeSpecified) {
                env.NativeStmt.compile(write, scope, indents, indentsHidden);
            }
            for(var i = 0; i < len(this.stmts); i++) {
                this.stmts[i].compile(write, scope, indents, indentsHidden);
                write(';\n');
            }
            scope.allStatementsCompleted = true;
        };
    };
};

var Parser = {
    parse: parse
}

module.exports = Parser;