// Exp17           ::= Exp18 (ArrayCont | Call | '.' Exp18)*
module.exports = function(env, at, next, debug) {
    var Exp18, ArrayCont, Call, Newline, Indent, checkIndent;
    return {
        loadData: function() {
            Exp18 = env.Exp18,
            ArrayCont = env.ArrayCont,
            Call = env.Call,
            Newline = env.Newline,
            Indent = env.Indent
            checkIndent = env.checkIndent;
        },
        is: function() {
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp17();
            debug("Starting on exp17. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            if(!at(Exp18)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.lastVal = env.last;
            var indexMid = env.index;
            while(next('[') || next('(') || next('.') || next(Indent) || (env.inIndented && next(Newline))) {
                if(env.inIndented && next(Newline)) {
                    checkIndent();
                } else if(at(ArrayCont)) {
                    indexMid = env.index;
                    var newest = new BracketAccessor(env.last, entity.lastVal);
                    entity.lastVal = newest;
                } else if(at(Call)) {
                    indexMid = env.index;
                    var newest = new FunctionCall(env.last, entity.lastVal);
                    entity.lastVal = newest;
                } else if(at('.')) {
                    if(!at(Exp18)) {
                        env.index = indexMid;
                        break;
                    }
                    indexMid = env.index;
                    var newest = new DotAccessor(env.last, entity.lastVal);
                    entity.lastVal = newest;
                } else if(next(Indent)) {
                    checkIndent();
                    if(!at('.')) {
                        env.index = indexMid;
                        env.inIndented = indentedBefore;
                        break;
                    }
                    if(!at(Exp18)) {
                        env.index = indexMid;
                        env.inIndented = indentedBefore;
                        break;
                    }
                    indexMid = env.index;
                    var newest = new DotAccessor(env.last, entity.lastVal);
                    entity.lastVal = newest;
                } else {
                    env.index = indexMid;
                    env.inIndented = indentedBefore;
                    break;
                }
            }
            env.last = entity.lastVal;      // This is more of a guess than the others.
            debug("Finalizing exp17 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp17 = function() {
    this.lastVal = null;
    this.toString = function(indentlevel, indLvlHidden) {
        return this.lastVal.toString(indentlevel, indLvlHidden);
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        this.lastVal.compile(write, scope, 0, indentsHidden);
    };
};

// DotAccessor = object.key
var DotAccessor = function(key, obj) {
    this.key = key;
    this.object = obj;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "(DotAccess -> ";
        out += "key: " + this.key.toString(0, indLvlHidden) + ", ";
        out += "object: " + this.object.toString(0, indLvlHidden) + ")";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        this.object.compile(write, scope, 0, indentsHidden);
        write('.');
        this.key.compile(write, scope, 0, indentsHidden);
    };
};

// BracketAccessor = object[keys]
var BracketAccessor = function(keys, obj) {
    this.keys = keys;
    this.object = obj;
    this.isBraceAccess = true;
    this.isSingular = function() { return this.keys.isSingular() && this.object.isSingular()};
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "(BracketAccess -> ";
        out += "keys: " + this.keys.toString(0, indLvlHidden) + ", ";
        out += "object: " + this.object.toString(0, indLvlHidden) + ")";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) { // DONE. WOW. MIGHT WORK.
        scope = scope.clone();

        if(this.isSingular()) {
            this.object.compile(write, scope, 0, indentsHidden);
            this.keys.compile(write, scope, 0, indentsHidden);
        } else {
            var objIsSingle = this.object.isSingular();
            var keysAreSingle = this.keys.isSingular();
            var dataVar = scope.randId();
            var objStore = scope.randId();
            var objVar = scope.randId();
            var keysStore = scope.randId();
            var keysVar = scope.randId();
            write('(function() {var ' + dataVar + ' = [];');
            write('var ' + objStore + ' = ');
            this.obj.compile(write, scope, 0, indentsHidden);
            write(';var ' + keysStore + ' = ');
            this.keys.compile(write, scope, 0, indentsHidden);
            write(';');
            if(objIsSingle) {
                write('var ' + objVar + ' = ' + objStore + ';');
            } else {
                write(objStore + '.forEach(function(' + objVar + ') {');
            }

            if(keysAreSingle) {
                write(dataVar + '.push(' + objVar + '[' + keysStore + '];');
            } else {
                write(keysStore + '.forEach(function(' + keysVar + ') {');
                write(dataVar + '.push(' + objVar + '[' + keysStore + '];');
                write('});')
            }
            if(!objIsSingle) {
                write('});');
            }
            write('return ' + dataVar + ';})()');
        }
    };
};

// FunctionCall = object Call
var FunctionCall = function(call, obj) {
    this.call = call;
    this.object = obj;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + this.call.toString(0, indLvlHidden) + ", ";
        out += "object: " + this.object.toString(0, indLvlHidden) + ")";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        //write('(');
        this.object.compile(write, scope, 0, indentsHidden);
        //write(')');
        this.call.compile(write, scope, 0, indentsHidden);  
    };
};