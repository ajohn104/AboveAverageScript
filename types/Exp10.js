// Exp10           ::= Exp11 (CompareOp Exp11)*
module.exports = function(env, at, next, debug) {
    var Exp11, checkIndent, CompareOp;
    return {
        loadData: function() {
            Exp11 = env.Exp11,
            checkIndent = env.checkIndent,
            CompareOp = env.CompareOp;
        },
        is: function() {
            debug("Starting on exp10. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp10();
            if(!at(Exp11)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();
            var indexMid = env.index;
            while(at(CompareOp)) {
                var part = {operator: env.last};
                checkIndent();
                if(!at(Exp11)) {
                    env.index = indexMid;
                    break;
                }
                part.exp = env.last;
                entity.furtherExps.push(part);
                indexMid = env.index;
            }
            if(entity.furtherExps.length === 0) {
                entity = entity.val;
            }
            env.last = /*(entity.furtherExps.length === 0)?entity.val:*/entity;
            debug("Finalizing exp10 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp10 = function() {
    this.val = null;
    this.furtherExps = [];
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = "";
        for(var j = 0; j < this.furtherExps.length; j++) {
            out += "(";
        }
        out += this.val.toString(indentlevel, indLvlHidden);
        for(var i = 0; i < this.furtherExps.length; i++) {
            out += this.furtherExps[i].operator + this.furtherExps[i].exp.toString(0, indLvlHidden) + ")";
        }
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        var max = len(this.furtherExps)-1;
        for(var i = max; i >= 0; i--) {
            write('(');
        }
        this.val.compile(write, scope, 0, indentsHidden);
        for(var i = 0; i <= max; i++) {
            write(' ' + this.furtherExps[i].operator + ' ');
            this.furtherExps[i].exp.compile(write, scope, 0, indentsHidden);
            write(')');
        }
    };
};