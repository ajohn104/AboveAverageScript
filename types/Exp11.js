// Exp11           ::= Exp12 (ShiftOp Exp12)*
module.exports = {
    is: function(at, next, env, debug) {
        debug("Starting on exp11. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        var indexBefore = env.index; 
        var indentedBefore = env.inIndented;
        var entity = new Exp11();
        if(!at(env.Exp12)) {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            return false;
        }
        entity.val = env.last;
        env.checkIndent();
        var indexMid = env.index;
        while(at(env.ShiftOp)) {
            var part = {operator: env.last};
            env.checkIndent();
            if(!at(env.Exp12)) {
                env.index = indexMid;
                break;
            }
            part.exp = env.last;
            entity.furtherExps.push(part);
            indexMid = env.index;
        }
        env.last = entity;
        debug("Finalizing exp11 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
};

var Exp11 = function() {
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