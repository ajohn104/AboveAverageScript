// Exp9            ::= Exp10 (EqualOp Exp10)*
module.exports = function(env, at, next, debug) {
    var Exp10, EqualOp, checkIndent;
    return {
        loadData: function() {
            Exp10 = env.Exp10,
            EqualOp = env.EqualOp,
            checkIndent = env.checkIndent;
        },
        is: function() {
            debug("Starting on exp9. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp9();
            if(!at(Exp10)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();
            var indexMid = env.index;
            while(at(EqualOp)) {
                var part = {operator: env.last};
                checkIndent();
                
                if(!at(Exp10)) {
                    env.index = indexMid;
                    break;
                }
                part.exp = env.last;
                entity.furtherExps.push(part);
                indexMid = env.index;
            }
            env.last = entity;
            debug("Finalizing exp9 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp9 = function() {
    this.val = null;
    this.furtherExps = [];  // {operator: op, exp: last}
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