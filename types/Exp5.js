// Exp5            ::= Exp6 ('and' Exp6)*
module.exports = {
    is: function(at, next, env, debug) {
        debug("Starting on exp5. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        var indexBefore = env.index; 
        var indentedBefore = env.inIndented;
        var entity = new Exp5();
        if(!at(env.Exp6)) {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            return false;
        }
        entity.val = env.last;
        env.checkIndent();
        var indexMid = env.index;
        while(at('and')) {
            var part = {operator: env.last};
            env.checkIndent();
            if(!at(env.Exp6)) {
                env.index = indexMid;
                break;
            }
            part.exp = env.last;
            entity.furtherExps.push(part);
            indexMid = env.index;
        }
        env.last = entity;
        debug("Finalizing exp5 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
};

var Exp5 = function() {
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
};