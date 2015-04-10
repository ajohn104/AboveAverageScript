// Exp3            ::= Exp4 ('?' Exp4 ':' Exp4)?
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index; 
        var indentedBefore = env.inIndented;
        var entity = new Exp3();
        debug("Starting on exp3. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        if(!at(env.Exp4)) {
            env.index = indexBefore; 
            env.inIndented = indentedBefore;
            return false;
        }
        entity.val = env.last;
        env.checkIndent();
        if(at('?')) {
            env.furtherExps = {};
            env.checkIndent();
            if(!at(env.Exp4)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            env.furtherExps.firstexp = env.last;
            env.checkIndent();
            if(!at(':')) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            env.checkIndent();
            if(!at(env.Exp4)) {
                env.index = indexBefore; 
                env.inIndented = indentedBefore;
                return false;
            }
            env.furtherExps.secondexp = env.last;
        }
        env.last = entity;
        debug("Finalizing exp3 success. env.index:" + env.index + ', lexeme: ' + env.parseTokens[env.index].lexeme);
        return true;
    }
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
};