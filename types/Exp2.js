// Exp2            ::= Exp3 ('in' Exp3)*
module.exports = function(env, at, next, debug) {
    var Exp3, checkIndent;
    return {
        loadData: function() {
            Exp3 = env.Exp3,
            checkIndent = env.checkIndent;
        },
        is: function() {
            var indexBefore = env.index;
            var indentedBefore = env.inIndented;
            var entity = new Exp2();
            debug("Starting on exp2. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);

            if(!at(Exp3)) {
                env.index = indexBefore;
                env.inIndented = indentedBefore;
                return false;
            }
            entity.val = env.last;
            checkIndent();
            var indexMid = env.index;
            while(at('in')) {
                var part = {};
                part.operator = env.last;
                checkIndent();
                if(!at(Exp3)) {
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
            debug("Finalizing exp2 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
            return true;
        }
    };
};

var Exp2 = function() {
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
        if(max >= 0) {
            write('(');
        }
        for(var i = max; i >= 0; i--) {
            write('(');
            this.furtherExps[i].exp.compile(write, scope, 0, indentsHidden);
            write('.indexOf(');
        }
        this.val.compile(write, scope, 0, indentsHidden);
        for(var j = max; j >= 0; j--) {
            write(') >= 0');
        }
        if(max >= 0) {
            write(')');
        }
    };
};