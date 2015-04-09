// While           ::= 'while' Exp ':' Indent Block Dedent
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new While();
        debug("Checking for while loop");
        if(!at('while')) {
            env.index = indexBefore;
            return false;
        }

        if(!at(env.Exp)) {
            env.index = indexBefore;
            return false;
        }
        entity.condition = env.last;

        if(!at(':')) {
            env.index = indexBefore;
            return false;
        }

        if(!at(env.Indent)) {
            env.index = indexBefore;
            return false;
        }

        if(!at(env.Block)) {
            env.index = indexBefore;
            return false;
        }
        entity.block = env.last;

        if(!at(env.Dedent)) {
            env.index = indexBefore;
            return false;
        }

        env.last = entity;
        return true;
    }
};

var While = function() {
    this.condition = null;
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "while ->\n";
        out += indents + "  condition:" + this.condition.toString(0, indLvlHidden) + "\n";
        out += this.block.toString(indentlevel+1, indLvlHidden+1);
        return out;
    };
};