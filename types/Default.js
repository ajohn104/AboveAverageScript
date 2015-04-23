// Default        ::= Newline 'default' ':' Indent Block Dedent
module.exports = function(env, at, next, debug) {
    var Newline, Indent, Block, Dedent;
    return {
        loadData: function() {
            Newline = env.Newline,
            Block = env.Block,
            Indent = env.Indent,
            Dedent = env.Dedent;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new Default();
            if(!at(Newline)) {
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

            if(!at(Indent)) {
                env.index = indexBefore;
                return false;
            }

            if(!at(Block)) {
                env.index = indexBefore;
                return false;
            }
            entity.block = env.last;

            if(!at(Dedent)) {
                env.index = indexBefore;
                return false;
            }

            env.last = entity;
            return true;
        }
    };
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