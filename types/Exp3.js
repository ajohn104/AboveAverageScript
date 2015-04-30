// Exp3            ::= Exp4 ('?' Exp4 ':' Exp4)?
module.exports = function(env, at, next, debug) {
    var Exp4, checkIndent;
    return {
        loadData: function() {
            Exp4 = env.Exp4,
            checkIndent = env.checkIndent;
        },
        is: function() {
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp3();
            debug("Starting on exp3. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            if(!at(Exp4)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();
            if(at('?')) {
                entity.furtherExps = {};
                checkIndent();
                if(!at(Exp4)) {
                    env.index = indexBefore; 
                    env.inIndented = indentedBefore;
                    return false;
                }
                entity.furtherExps.firstexp = env.last;
                checkIndent();
                if(!at(':')) {
                    env.index = indexBefore; 
                    env.inIndented = indentedBefore;
                    return false;
                }
                checkIndent();
                if(!at(Exp4)) {
                    env.index = indexBefore; 
                    env.inIndented = indentedBefore;
                    return false;
                }
                entity.furtherExps.secondexp = env.last;
            }
            if(entity.furtherExps === null) {
                entity = entity.val;
            }
            env.last = /*(entity.furtherExps === null)?entity.val:*/entity;
            debug("Finalizing exp3 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp3 = function() {
    this.val = null;
    this.furtherExps = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = this.val.toString(indentlevel, indLvlHidden);
        if(this.furtherExps !== null) {
            out += "?" + this.furtherExps.firstexp.toString(0, indLvlHidden) + ":";
            out += this.furtherExps.secondexp.toString(0, indLvlHidden);
        }
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        if(this.furtherExps !== null) {
            write('(');
            this.val.compile(write, scope, 0, indentsHidden);
            write('?');
            this.furtherExps.firstexp.compile(write, scope, 0, indentsHidden);
            write(':');
            this.furtherExps.secondexp.compile(write, scope, 0, indentsHidden);
            write(')');
        } else {
            this.val.compile(write, scope, 0, indentsHidden);
        }
    };
};