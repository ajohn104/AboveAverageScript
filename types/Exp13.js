// Exp13           ::= Exp14 (MulOp Exp14)*
module.exports = function(env, at, next, debug) {
    var Exp14, checkIndent, MulOp;
    return {
        loadData: function() {
            Exp14 = env.Exp14,
            checkIndent = env.checkIndent,
            MulOp = env.MulOp;
        },
        is: function() {
            debug("Starting on exp13. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp13();
            if(!at(Exp14)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();
            var indexMid = env.index;
            while(at(MulOp)) {
                var part = {operator: env.last};
                checkIndent();
                if(!at(Exp14)) {
                    env.index = indexMid;
                    break;
                }
                part.exp = env.last;
                entity.furtherExps.push(part);
                indexMid = env.index;
            }
            env.last = entity;
            debug("Finalizing exp13 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp13 = function() {
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