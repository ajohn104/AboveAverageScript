// Default        ::= Newline 'default' ':' Indent Block Dedent
module.exports = {
    is: function(at, next, env, debug) {
        var indexBefore = env.index;
        var entity = new Default();
        if(!at(env.Newline)) {
            env.index = indexBefore;
            return false;
        }

        if(!at('default')) {
            env.index = indexBefore;
            return false;
        }

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

var Default = function() {
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + "DefaultCase ->\n";
        out += this.block.toString(indentlevel+1, indLvlHidden + 1);
        return out;
    };
};