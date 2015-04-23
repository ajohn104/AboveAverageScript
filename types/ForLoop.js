// ForLoop         ::= (ForIn | ForColon | For) ':' Indent Block Dedent
module.exports = function(env, at, next, debug) {
    var ForIn, ForColon, For, Indent, Block, Dedent;
    return {
        loadData: function() {
            ForIn = env.ForIn,
            ForColon = env.ForColon,
            For = env.For,
            Indent = env.Indent,
            Block = env.Block,
            Dedent = env.Dedent;
        },
        is: function() {
            var indexBefore = env.index;
            var entity = new ForLoop();
            if(!at(ForIn) && !at(ForColon) && !at(For)) {
                env.index = indexBefore;
                return false;
            }
            entity.loop = env.last;
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

var ForLoop = function() {
    this.loop = null;
    this.block = null;
    this.toString = function(indentlevel, indLvlHidden) {
        indentlevel = (typeof indentlevel === "undefined")?0:indentlevel;
        var indents = env.indents(indentlevel);
        var out = indents + this.loop.toString(0, indLvlHidden) + "\n";
        out += this.block.toString(indentlevel+1, indLvlHidden+1);
        return out;
    };
    this.compile = function(write, scope, indents, indentsHidden) {
        scope = scope.clone();
        this.loop.compile(write, scope, indents, indentsHidden);
        this.block.compile(write, scope, indents+1, indentsHidden+1);
        write(scope.ind(indents) + '}' + (this.loop.doesntNeedParens?'':')'));
    };
};