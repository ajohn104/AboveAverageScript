// Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var indentedBefore = env.inIndented;
        debug("Starting on exp1. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        if(!at(env.Exp2)) {
            env.index = indexBefore;
            env.inIndented = indentedBefore;
            return false;
        }
        env.checkIndent();
        if(at('if')) {
            env.checkIndent();
            if(!at(env.Exp2)) {
                env.index = indexBefore;
                env.inIndented = indentedBefore;
                return false;
            }
            env.checkIndent();
            if(at('else')) {
                env.checkIndent();
                if(!at(env.Exp2)) {
                    env.index = indexBefore;
                    env.inIndented = indentedBefore;
                    return false;
                }
            }
        }
        debug("Finalizing exp1 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
};

var Exp1 = function() {
    this.val = null;
    this.ifexp = null;
    this.elseexp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.val.toString(indentlevel, indLvlHidden);
        if(this.ifexp !== null) {
            out += "if(" + this.ifexp.toString(0, indLvlHidden) +")";
            if(this.elseexp !== null) {
                out += "else(" + this.elseexp.toString(0, indLvlHidden) + ")";
            }
        }
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        if(this.ifexp !== null) {
            write('(');
            this.ifexp.compile(write, scope, 0, indentsHidden);
            write('?');
            this.val.compile(write, scope, 0, indentsHidden);
            write(':');
            if(this.elseexp !== null) {
                this.elseexp.compile(write, scope, 0, indentsHidden);
            } else {
                write('undefined');
            }
            write(')');
        } else {
            this.val.compile(write, scope, 0, indentsHidden);
        }
    };
};