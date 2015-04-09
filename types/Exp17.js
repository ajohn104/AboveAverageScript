// Exp17           ::= Exp18 (ArrayCont | Call | '.' Exp17)*
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
        entity.val = env.last;
        var indexMid = env.index;
        while(next(env.ArrayCont) || next(env.Call) || next('.') || next(env.Indent) || (env.inIndented && next(env.Newline))) {
            if(env.inIndented && next(env.Newline)) {
                env.checkIndent();
            } else if(at(env.ArrayCont)) {
                entity.accessors.push(env.last);
            } else if(at(env.Call)) {
                entity.accessors.push(env.last);
            } else if(at('.')) {
                if(!at(env.Exp17)) {
                    entity.accessors.push(env.last);
                    env.index = indexMid;
                    break;
                }
                entity.accessors.push(new DotAccessor(env.last));
            } else if(next(env.Indent)) {
                env.checkIndent();
                if(!at('.')) {
                    env.index = indexMid;
                    env.inIndented = indentedBefore;
                    break;
                }
                if(!at(env.Exp17)) {
                    env.index = indexMid;
                    env.inIndented = indentedBefore;
                    break;
                }
                entity.accessors.push(new DotAccessor(env.last));
            }
        }
        env.last = entity;
        debug("Finalizing exp17 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
};

var Exp17 = function() {
    this.val = null;
    this.accessors = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.val.toString(0, indLvlHidden);
        for(var i = 0; i < this.accessors.length; i++) {
            out += "(" + this.accessors[i].toString(0, indLvlHidden) + ")";
        }
        return out;
    };
};

var DotAccessor = function(val) {
    this.val = val;
    this.toString = function(indentlevel, indLvlHidden) {
        return "." + val.toString(0, indLvlHidden);
    }
};