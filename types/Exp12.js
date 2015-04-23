// Exp12           ::= Exp13 (AddOp Exp13)*
module.exports = function(env, at, next, debug) {
    var Exp13, checkIndent, AddOp;
    return {
        loadData: function() {
            Exp13 = env.Exp13,
            checkIndent = env.checkIndent,
            AddOp = env.AddOp;
        },
        is: function() {
            debug("Starting on exp12. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            var indexBefore = env.index; 
            var indentedBefore = env.inIndented;
            var entity = new Exp12();
            if(!at(Exp13)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();
            var indexMid = env.index;
            while(at(AddOp)) {
                var part = {operator: env.last};
                checkIndent();
                if(!at(Exp13)) {
                    env.index = indexMid;
                    break;
                }
                part.exp = env.last;
                entity.furtherExps.push(part);
                indexMid = env.index;
            }
            env.last = entity;
            debug("Finalizing exp12 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp12 = function() {
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