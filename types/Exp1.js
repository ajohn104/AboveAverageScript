// Exp1            ::= Exp2 ('if' Exp2 ('else' Exp2)?)?
module.exports = function(env, at, next, debug) {
    var Exp2, checkIndent;
    return {
        loadData: function() {
            Exp2 = env.Exp2,
            checkIndent = env.checkIndent;
        },
        is: function() {
            var indexBefore = env.index;
            var indentedBefore = env.inIndented;
            debug("Starting on exp1. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            var entity = new Exp1();
            if(!at(Exp2)) {
                env.index = indexBefore;
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();
            if(at('if')) {
                checkIndent();
                if(!at(Exp2)) {
                    env.index = indexBefore;
                    env.inIndented = indentedBefore;
                    return false;
                }
                entity.condit = env.last;
                checkIndent();
                if(at('else')) {
                    checkIndent();
                    if(!at(Exp2)) {
                        env.index = indexBefore;
                        env.inIndented = indentedBefore;
                        return false;
                    }
                    entity.altval = env.last;
                }
            }
            env.last = entity;
            debug("Finalizing exp1 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp1 = function() {
    this.val = null;
    this.condit = null;
    this.altval = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.val.toString(indentlevel, indLvlHidden);
        if(this.condit !== null) {
            out += " if(" + this.condit.toString(0, indLvlHidden) +")";
            if(this.altval !== null) {
                out += "else(" + this.altval.toString(0, indLvlHidden) + ")";
            }
        }
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        if(this.condit !== null) {
            write('((');
            this.condit.compile(write, scope, 0, indentsHidden);
            write(')?(');
            this.val.compile(write, scope, 0, indentsHidden);
            write('):(');
            if(this.altval !== null) {
                this.altval.compile(write, scope, 0, indentsHidden);
            } else {
                write('undefined');
            }
            write('))');
        } else {
            this.val.compile(write, scope, 0, indentsHidden);
        }
    };
};