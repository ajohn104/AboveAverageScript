// Exp17           ::= Exp18 (ArrayCont | Call | '.' Exp18)*
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index; 
        var indentedBefore = env.inIndented;
        var entity = new Exp17();
        debug("Starting on exp17. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        if(!at(env.Exp18)) {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            return false;
        }
        entity.lastVal = env.last;
        var indexMid = env.index;
        while(next(env.ArrayCont) || next(env.Call) || next('.') || next(env.Indent) || (env.inIndented && next(env.Newline))) {
            if(env.inIndented && next(env.Newline)) {
                env.checkIndent();
            } else if(at(env.ArrayCont)) {
                var newest = new BracketAccessor(env.last, entity.lastVal);
                entity.lastVal = newest;
            } else if(at(env.Call)) {
                var newest = new Call(env.last, entity.lastVal);
                entity.lastVal = newest;
            } else if(at('.')) {
                if(!at(env.Exp18)) {
                    env.index = indexMid;
                    break;
                }
                var newest = new DotAccessor(env.last, entity.lastVal);
                entity.lastVal = newest;
            } else if(next(env.Indent)) {
                env.checkIndent();
                if(!at('.')) {
                    env.index = indexMid;
                    env.inIndented = indentedBefore;
                    break;
                }
                if(!at(env.Exp18)) {
                    env.index = indexMid;
                    env.inIndented = indentedBefore;
                    break;
                }
                var newest = new DotAccessor(env.last, entity.lastVal);
                entity.lastVal = newest;
            }
        }
        env.last = entity;
        debug("Finalizing exp17 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
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
        //write('(');
        
        //write(').')
        this.object.compile(write, scope, 0, indentsHidden);
        write('.');
        this.key.compile(write, scope, 0, indentsHidden);
    };
};

var BracketAccessor = function(keys, obj) {
    this.keys = keys;
    this.object = obj;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "(BracketAccess -> ";
        out += "keys: " + this.keys.toString(0, indLvlHidden) + ", ";
        out += "object: " + this.object.toString(0, indLvlHidden) + ")";
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        //write('(');
        this.object.compile(write, scope, 0, indentsHidden);
        //write(')');
        this.keys.compile(write, scope, 0, indentsHidden);
    };
};

var Call = function(call, obj) {
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