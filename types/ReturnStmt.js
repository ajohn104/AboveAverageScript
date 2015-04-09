// ReturnStmt      ::= 'ret' Exp?
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;

        if(!at('ret')) {
            env.index = indexBefore;
            return false;
        }
        var entity = new ReturnStmt();
        var foundExp = at(env.Exp);
        if(foundExp) {
            entity.exp = env.last;
        }
        env.last = entity;
        return true;
    }
};

var ReturnStmt = function() {
    this.exp = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "return" + ((this.exp !== null)?(" " + this.exp.toString(0, indLvlHidden)):(""));
        return out;
    };
};